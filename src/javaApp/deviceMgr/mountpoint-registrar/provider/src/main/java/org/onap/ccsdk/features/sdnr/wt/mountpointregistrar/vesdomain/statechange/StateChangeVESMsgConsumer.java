/*
 * ============LICENSE_START========================================================================
 * Copyright (C) 2024 RideNext Software Solutions. Pvt Ltd.  All rights reserved
 * ============LICENSE_END==========================================================================
 */

 package org.onap.ccsdk.features.sdnr.wt.mountpointregistrar.vesdomain.statechange;

 import com.fasterxml.jackson.databind.JsonNode;
 import com.fasterxml.jackson.databind.ObjectMapper;
 
 import org.apache.http.HttpResponse;
 import org.apache.http.client.methods.HttpPost;
 import org.apache.http.entity.StringEntity;
 import org.apache.http.impl.client.CloseableHttpClient;
 import org.apache.http.impl.client.HttpClients;
import org.apache.kafka.clients.producer.KafkaProducer;
import org.apache.kafka.clients.producer.ProducerRecord;
import org.apache.kafka.clients.producer.RecordMetadata;
import org.apache.kafka.clients.admin.AdminClient;
import org.slf4j.Logger;
 import org.slf4j.LoggerFactory;
 import java.io.IOException;
import java.net.InetAddress;
import java.time.Instant;
import java.util.Properties;
import java.util.regex.Matcher;
 import java.util.regex.Pattern;
 import java.net.InetAddress;
 import java.net.NetworkInterface;
 import java.util.concurrent.TimeUnit;

 import org.onap.ccsdk.features.sdnr.wt.mountpointregistrar.config.GeneralConfig;
 import org.onap.ccsdk.features.sdnr.wt.mountpointregistrar.impl.StrimziKafkaVESMsgConsumerImpl;
 import java.net.InetSocketAddress;
import java.net.Socket;
 
 public class StateChangeVESMsgConsumer extends StrimziKafkaVESMsgConsumerImpl {
 
     private static final Logger LOG = LoggerFactory.getLogger(StateChangeVESMsgConsumer.class);
     private static final Logger SDNRLOG = LoggerFactory.getLogger("SDNR");
     private KafkaProducer<String, String> producer;
     String nmsKafkaip = "";
     String nmsKafkaport = "";
      private long skippedtime = 0;
     public StateChangeVESMsgConsumer(GeneralConfig generalConfig) {
         super(generalConfig);
         LOG.info("StateChangeVESMsgConsumer started successfully");
         if(System.getenv("NMS_KAFKA_IP") == null || System.getenv("NMS_KAFKA_IP").isEmpty() || System.getenv("NMS_KAFKA_IP") == null || System.getenv("NMS_KAFKA_IP").isEmpty() ){
           LOG.error("Kafka producer IP and port are not configured. Producer initialization skipped.");
           SDNRLOG.error("Kafka producer IP and port are not configured. Producer initialization skipped.");
         }
         else{
            if(isBrokerReachable()){
                establishConnection();  
            }
         }
     }

     ///  SendMessageToNMS
  private void SendMessageToNMS( String Message) {
   
    SDNRLOG.info("IN SendMessageToNMS()  ");
    String jsonPayload = Message;
    try {

        ProducerRecord<String, String> record = new ProducerRecord<>("5G_EMS_DEVICE_NOTIFICATION", jsonPayload);
        RecordMetadata metadata = producer.send(record).get();
        System.out.printf("Message sent to topic %s partition %d with offset %d%n",  metadata.topic(), metadata.partition(), metadata.offset());
       
        SDNRLOG.info("Message sent to topic {} partition {} with offset{} {}",  metadata.topic(), metadata.partition(), metadata.offset());
   } catch (Exception ex) {
       SDNRLOG.error("Exception SendMessageToNMS  {} ", ex.getMessage());
       if (skippedtime == 0) {
                skippedtime = System.currentTimeMillis() * 1000;
            } else if (skippedtime != 0 && System.currentTimeMillis() * 1000 - skippedtime > Long.parseLong(System.getenv("WAIT_TIME")) * 60 * 1000000) {
                skippedtime = 0;
                shutdown();
                establishConnection();
                LOG.info("else else if entered");
            }
            LOG.error("Error while processing Kafka message: {}", ex.getMessage(), ex);
   }
   SDNRLOG.info("OUT SendMessageToNMS()  ");
  
}

public boolean isBrokerReachable() {
    String kafkaIp = System.getenv("NMS_KAFKA_IP");
    String kafkaPort = System.getenv("NMS_KAFKA_PORT");

    if (kafkaIp == null || kafkaIp.isEmpty() || kafkaPort == null || kafkaPort.isEmpty()) {
        LOG.error("Kafka IP or Port is not set.");
        return false;
    }

    int port;
    try {
        port = Integer.parseInt(kafkaPort);
    } catch (NumberFormatException e) {
        LOG.error("Invalid Kafka port: " + kafkaPort);
        return false;
    }

    try (Socket socket = new Socket()) {
        socket.connect(new InetSocketAddress(kafkaIp, port), 100); // Timeout set to 100ms
       LOG.info("Kafka broker at " + kafkaIp + ":" + kafkaPort + " is reachable.");
        return true;
    } catch (Exception e) {
        LOG.error("Kafka broker at " + kafkaIp + ":" + kafkaPort + " is not reachable: " + e.getMessage());
        return false;
    }
}

private void establishConnection(){
        nmsKafkaip = System.getenv("NMS_KAFKA_IP");
        nmsKafkaport = System.getenv("NMS_KAFKA_PORT");
        String endPoint = nmsKafkaip+":"+nmsKafkaport;
        Properties props = new Properties();
        props.put("bootstrap.servers",endPoint );
        props.put("key.serializer", "org.apache.kafka.common.serialization.StringSerializer");
        props.put("value.serializer", "org.apache.kafka.common.serialization.StringSerializer");
        producer = new KafkaProducer<>(props);
    }
   public void shutdown() {
        if (producer != null) {
            producer.close();
            LOG.info("Kafka producer closed.");
        }
    }
 
     @Override
     public void processMsg(String msg) throws Exception {
         String nodeId;
         String cellId;
         String oldState;
         String newState;
         String vesDomain;
         String reportingEntityName;
         ObjectMapper oMapper = new ObjectMapper();
         JsonNode sKafkaMessageRootNode;
         String proxyApiUrl = "http://sdnc-web:3005";
         String stateChangeUrl = proxyApiUrl + "/proxyapi/statechange/";
         String networkElementUrl = proxyApiUrl + "/proxyapi/networkelement/";
 
         LOG.info("StateChangeVESMsgConsumer VES Message is - {}", msg);
         SDNRLOG.info("StateChangeVESMsgConsumer VES Message is - {}", msg);
        
         try {
             sKafkaMessageRootNode = oMapper.readTree(msg);
             LOG.info("sKafkaMessageRootNode : {} ", sKafkaMessageRootNode);
             reportingEntityName = sKafkaMessageRootNode.at("/event/commonEventHeader/reportingEntityName").textValue();
             if (reportingEntityName.equals("ONAP SDN-R")) {
                 LOG.info("VES StateChangeVESMsgConsumer message generated by SDNR, hence no need to process any further; Ignoring the received message");
                 return;
             }
             vesDomain = sKafkaMessageRootNode.at("/event/commonEventHeader/domain").textValue();
             if (!vesDomain.equalsIgnoreCase("stateChange")) {
                 LOG.warn("Received {} domain VES Message in Kafka not stateChange topic, ignoring it", vesDomain);
                 return;
             }
             nodeId = sKafkaMessageRootNode.at("/event/commonEventHeader/sourceName").textValue();
             cellId = sKafkaMessageRootNode.at("/event/stateChangeFields/stateInterface").textValue();
             oldState = sKafkaMessageRootNode.at("/event/stateChangeFields/oldState").textValue();
             newState = sKafkaMessageRootNode.at("/event/stateChangeFields/newState").textValue();
             try {
                 
                  if(cellId.contains("_3gpp-nr-nrm-nrcelldu:NRCellDU")){
                // Extract number from cellId and format
                String cellIdNumber = extractCellIdNumber(cellId);
                cellId = "cell" + cellIdNumber;
                oldState = sKafkaMessageRootNode.at("/event/stateChangeFields/oldState").textValue();
                newState = sKafkaMessageRootNode.at("/event/stateChangeFields/newState").textValue();
                String jsonPayload = "{\"nodeId\":\"" + nodeId + "\",\"cellId\":\"" + cellId + "\",\"newState\":\"" + newState + "\",\"oldState\":\"" + oldState + "\"}";
                LOG.info("<<<< StateChangeVESMsgConsumer : jsonPayload : {}", jsonPayload);
                sendHttpRequest(stateChangeUrl, jsonPayload,"StateChangeVESMsgConsumer");  
                 SDNRLOG.info("StateChangeVESMsgConsumer  newState  : "+ newState);

                 if(newState.equals("inService")){
                    newState="in-service";
                 } 
                 else{
                    newState="out-service";
                 }
                 long epochMicros = Instant.now().toEpochMilli() * 1000 + (System.nanoTime() % 1000000) / 1000;
                 String Message="gNode device cell up notification processed in sdnr.";
                 String jsonCellPayload= "{\"sdnrNotification\": { \"nodeId\":"+ '"'+ nodeId + '"'+  ",\"cellId\":"+ '"'+ cellIdNumber + '"'+",\"status\":"+'"'+ newState +'"'+ ",\"type\":\"device-cell-status\" ,\"eventTimeEpochMicrosec\":"+ epochMicros+  ",\"message\":"+ '"'+Message+'"'+ "}}";
                 SDNRLOG.info("jsonCellPayload  : "+jsonCellPayload);
                 if (producer == null ) {
            LOG.info("skippedtime check: "+ skippedtime);
            if (skippedtime == 0) {
                LOG.info("skippedtime before: "+ skippedtime);
                skippedtime = System.currentTimeMillis() * 1000;
                LOG.info("skippedtime after: "+ skippedtime);
            } else if (skippedtime != 0 && System.currentTimeMillis() * 1000 - skippedtime > Long.parseLong(System.getenv("WAIT_TIME")) * 60 * 1000000) {
                skippedtime = 0;
                shutdown();
                establishConnection();
                LOG.info("else if entered");
            }
            LOG.error("Producer is not initialized. Message cannot be forwarded.");
            
        }
        else{
            if(producer != null){
                                    if(!isBrokerReachable()){
                if (skippedtime == 0) {
                    skippedtime = System.currentTimeMillis() * 1000;
                } else if (skippedtime != 0 && System.currentTimeMillis() * 1000 - skippedtime > Long.parseLong(System.getenv("WAIT_TIME")) * 60 * 1000000) {
                    skippedtime = 0;
                    shutdown();
                    establishConnection();
                    LOG.info("else else if entered");
                }
            }
                                    else{
                                        SendMessageToNMS(jsonCellPayload);
                                    }
                                }
                
        }
                 
             }
             // Send the data to the networkelement endpoint
             else {
                if(cellId.contains("ManagedNFServiceGrp/operations/operationalState")){
                    newState = sKafkaMessageRootNode.at("/event/stateChangeFields/newState").textValue();
                    String jsonPayload = "{\"nodeId\":\"" + nodeId + "\",\"newState\":\"" + newState + "\"}";
                    LOG.info("<<<< DeviceStatusVESMsgConsumer : jsonPayload : {}", jsonPayload);
                    sendHttpRequest(networkElementUrl, jsonPayload,"DeviceStatusVESMsgConsumer");
                    long epochMicros = Instant.now().toEpochMilli() * 1000 + (System.nanoTime() % 1000000) / 1000;
                 String Message="gNode device status notification processed in sdnr.";
                 String jsonDevicePayload= "{\"sdnrNotification\": { \"nodeId\":"+ '"'+ nodeId + '"'+ ",\"status\":"+'"'+ newState +'"'+ ",\"type\":\"device-status\" ,\"eventTimeEpochMicrosec\":"+ epochMicros+  ",\"message\":"+ '"'+Message+'"'+ "}}";
                 SDNRLOG.info("jsonDevicePayload  : "+jsonDevicePayload);
                 if (producer == null ) {
            LOG.info("skippedtime check: "+ skippedtime);
            if (skippedtime == 0) {
                LOG.info("skippedtime before: "+ skippedtime);
                skippedtime = System.currentTimeMillis() * 1000;
                LOG.info("skippedtime after: "+ skippedtime);
            } else if (skippedtime != 0 && System.currentTimeMillis() * 1000 - skippedtime > Long.parseLong(System.getenv("WAIT_TIME")) * 60 * 1000000) {
                skippedtime = 0;
                shutdown();
                establishConnection();
                LOG.info("else if entered");
            }
            LOG.error("Producer is not initialized. Message cannot be forwarded.");
            
        }
        else{
            if(producer != null){
             if(!isBrokerReachable()){
                if (skippedtime == 0) {
                    skippedtime = System.currentTimeMillis() * 1000;
                } else if (skippedtime != 0 && System.currentTimeMillis() * 1000 - skippedtime > Long.parseLong(System.getenv("WAIT_TIME")) * 60 * 1000000) {
                    skippedtime = 0;
                    shutdown();
                    establishConnection();
                    LOG.info("else else if entered");
                }
            }
                else{
                    SendMessageToNMS(jsonDevicePayload);
                }
            }
                
        }
                }
             }

             } catch (Exception e) {
                 LOG.error("<<<< StateChangeVESMsgConsumer Error {}", e.getLocalizedMessage());
                 SDNRLOG.error("StateChangeVESMsgConsumer Error {}", e.getLocalizedMessage());
             }
         } catch (IOException e) {
             LOG.info("Cannot parse json object, ignoring the received PNF Registration VES Message. Reason: {}",
                     e.getMessage());
            SDNRLOG.error("StateChangeVESMsgConsumer Error {}", e.getLocalizedMessage());
         }
     }
 
private void sendHttpRequest(String url, String jsonPayload, String type) {
        CloseableHttpClient httpClient = HttpClients.createDefault();
        try {
            HttpPost httpPost = new HttpPost(url);
            httpPost.setHeader("Accept", "application/json");
            httpPost.setHeader("Content-type", "application/json");
   
            StringEntity entity = new StringEntity(jsonPayload);
            httpPost.setEntity(entity);
   
            HttpResponse httpResponse = httpClient.execute(httpPost);
            LOG.info(" {} Response status code: {}", type, httpResponse.getStatusLine().getStatusCode());
        } catch (Exception e) {
            LOG.error("Error during HTTP request: {}", e.getLocalizedMessage());
        } finally {
            try {
                httpClient.close();
            } catch (IOException e) {
                LOG.error("Error closing HTTP client: {}", e.getLocalizedMessage());
            }
        }
    }
 
 public String extractCellIdNumber(String cellId) {
    // Regular expression to match the NRCellDU ID inside the stateInterface property
    String regex = "NRCellDU\\[id=?'?(\\d+)'?\\]";
    Pattern pattern = Pattern.compile(regex);
    Matcher matcher = pattern.matcher(cellId);
   
    if (matcher.find()) {
        // Return the captured ID number from the NRCellDU section
        return matcher.group(1);
    }
    return "";
  }
}
 
