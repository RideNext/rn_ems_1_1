
 /***
  * ################################################################################################
  * #                                                                                              #
  * #   Copyright (C)  [2019]  [RideNext Software Solutions Pvt Ltd]. All rights  reserved         #
  * #                                                                                              #
  * ################################################################################################
 ****/


package com.nbi.services;
import org.apache.kafka.clients.admin.AdminClient;
import org.apache.kafka.clients.admin.NewTopic;
import java.util.Collections;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.apache.kafka.clients.producer.KafkaProducer;
import org.apache.kafka.clients.producer.ProducerConfig;
import org.apache.kafka.clients.producer.ProducerRecord;
import org.apache.kafka.clients.producer.RecordMetadata;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.server.ResponseStatusException;
import org.apache.kafka.clients.producer.KafkaProducer;
import org.apache.kafka.clients.producer.ProducerConfig;
import org.apache.kafka.clients.producer.ProducerRecord;
 import org.apache.kafka.clients.producer.RecordMetadata;
import org.springframework.kafka.support.serializer.JsonSerializer;
import org.apache.kafka.common.serialization.StringSerializer;
import javax.annotation.PostConstruct;
import javax.annotation.PreDestroy;
import java.util.Properties;

@Service
public class KafkaConsumerService {

    private static final Logger logger = LoggerFactory.getLogger(KafkaConsumerService.class);
    private static final String TOPIC_NAME = "unauthenticated.5G_EMS_FAULT_OUTPUT";

    @Value("${ENTITY_NAME}")
    private String entity;

    @Value("${SYSTEM_ID}")
    private String id;

    @Value("${PRODUCER_PORT}")
    private String producerPort;

    @Value("${PRODUCER_IP}")
    private String producerIp;

    @Value("${WAIT_TIME}")
    private String waittime;

    private long skippedtime = 0;
    private KafkaProducer<String, String> producer;

    private final ObjectMapper objectMapper = new ObjectMapper();

    @PostConstruct
    public void init() {
        if (StringUtils.isEmpty(producerIp) || StringUtils.isEmpty(producerPort) || producerIp == null || producerPort == null) {
            logger.error("Kafka producer IP and port are not configured. Producer initialization skipped.");
        } else {
            establishConnection();
        }
    }

    @PreDestroy
    public void shutdown() {
        if (producer != null) {
            producer.close();
            logger.info("Kafka producer closed.");
        }
    }

    public void establishConnection() {
       
         if (StringUtils.isEmpty(producerIp) || StringUtils.isEmpty(producerPort) || producerIp == null || producerPort == null) {
            logger.error("Kafka producer IP and port are not configured. Producer initialization skipped.");
        }
        else{
         try {
            ensureTopicExists(TOPIC_NAME);
        } catch (Exception e) {
            logger.error("Error while ensuring topic existence: {}", e.getMessage(), e);
        }
        Properties props = new Properties();
        props.put(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG, producerIp + ":" + producerPort);
        props.put(ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG, StringSerializer.class.getName());
        props.put(ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG, StringSerializer.class.getName());
        producer = new KafkaProducer<>(props);
        logger.info("Kafka producer initialized successfully.");
        }
    }

    @Async
    @KafkaListener(topics = "unauthenticated.SEC_FAULT_OUTPUT", groupId = "myG")
    public String listen(String message) {
        try{
        
        if (producer == null || !isBrokerReachable()) {
            logger.info("skippedtime check: "+ skippedtime);
            if (skippedtime == 0) {
                logger.info("skippedtime before: "+ skippedtime);
                skippedtime = System.currentTimeMillis() * 1000;
                logger.info("skippedtime after: "+ skippedtime);
            } else if (skippedtime != 0 && System.currentTimeMillis() * 1000 - skippedtime > Long.parseLong(waittime) * 60 * 1000000) {
                skippedtime = 0;
                shutdown();
                establishConnection();
                logger.info("else if entered");
            }
            logger.error("Producer is not initialized. Message cannot be forwarded.");
            return "";
        }
        else{
          try {
            if (skippedtime == 0) {
                String modifiedMessage = modifyMessage(message);
                logger.debug("Modified message: {}", modifiedMessage);

                ProducerRecord<String, String> record = new ProducerRecord<>(TOPIC_NAME, modifiedMessage);
                RecordMetadata metadata = producer.send(record).get();
                logger.debug("Message sent successfully to topic: {}, partition: {}, offset: {}",
                        metadata.topic(), metadata.partition(), metadata.offset());
                return modifiedMessage;
            } else {
                logger.debug("Wait time is not completed. Message cannot be forwarded");
                return "";
            }
          }
        
         catch (Exception e) {
            if (skippedtime == 0) {
                skippedtime = System.currentTimeMillis() * 1000;
            } else if (skippedtime != 0 && System.currentTimeMillis() * 1000 - skippedtime > Long.parseLong(waittime) * 60 * 1000000) {
                skippedtime = 0;
                shutdown();
                establishConnection();
                logger.info("else else if entered");
            }
            logger.error("Error while processing Kafka message: {}", e.getMessage(), e);
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Kafka Error", e);
            }
          }
        } 
        catch (Exception e) {
            
            logger.error("Error while processing Kafka message: {}", e.getMessage(), e);
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Kafka Error", e);
        }
        
    }

    public boolean isBrokerReachable() {
    Properties adminProps = new Properties();
    adminProps.put("bootstrap.servers", producerIp + ":" + producerPort);
    
    try (AdminClient adminClient = AdminClient.create(adminProps)) {
        // Check if the admin client can list topics (which requires connection to the broker)
        adminClient.listTopics().names().get(); // This will throw an exception if not connected
        return true; // Broker is reachable
    } catch (Exception e) {
        logger.error("Kafka broker at {} is not reachable: {}", producerIp + ":" + producerPort, e.getMessage());
        return false; // Broker is unreachable
    }
}


    public void ensureTopicExists(String topicName) {
        Properties adminProps = new Properties();
        adminProps.put("bootstrap.servers", producerIp + ":" + producerPort);

        try (AdminClient adminClient = AdminClient.create(adminProps)) {
            if (!adminClient.listTopics().names().get().contains(topicName)) {
                logger.debug("Topic does not exist. Creating topic: " + topicName);
                NewTopic newTopic = new NewTopic(topicName, 1, (short) 1); // 1 partition, replication factor 1
                adminClient.createTopics(Collections.singleton(newTopic)).all().get();
                logger.debug("Topic created successfully.");
            } else {
                logger.debug("Topic already exists: " + topicName);
            }
        } catch (Exception e) {
            logger.error("Error creating topic: {}", e.getMessage(), e);
        }
    }

    private String modifyMessage(String message) throws Exception {
        JsonNode jsonNode = objectMapper.readTree(message);

        JsonNode commonEventHeader = jsonNode.at("/event/commonEventHeader");

        if (commonEventHeader != null && commonEventHeader.isObject()) {
            ObjectNode commonEventHeaderNode = (ObjectNode) commonEventHeader;
            String nodeId = commonEventHeaderNode.path("sourceName").asText();
            String eventId = commonEventHeaderNode.path("eventId").asText();
            commonEventHeaderNode.put("reportingEntityName", entity);
            commonEventHeaderNode.put("sourceName", entity);

            JsonNode additional = jsonNode.at("/event/faultFields/alarmAdditionalInformation");
            if (additional != null && additional.isObject()) {
                ObjectNode additionalNode = (ObjectNode) additional;
                additionalNode.put("forwardingSystemName", entity);
                additionalNode.put("forwardingSystemId", id);
                additionalNode.put("forwardingEpochMicrosec", System.currentTimeMillis() * 1000);
                additionalNode.put("id", nodeId + "_" + eventId);
                additionalNode.put("counter", 1);
                additionalNode.put("isAlarmAcked", false);
                additionalNode.put("alarmComment", "");
                additionalNode.put("ackedBy", "");
                additionalNode.put("ackUpdatedTime", 0);
            }
        }

        return objectMapper.writeValueAsString(jsonNode);
        
    }
}
