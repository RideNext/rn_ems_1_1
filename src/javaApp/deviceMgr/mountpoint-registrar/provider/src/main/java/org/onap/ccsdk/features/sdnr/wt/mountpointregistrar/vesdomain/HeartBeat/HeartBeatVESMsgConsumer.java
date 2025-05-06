/*
 * ============LICENSE_START========================================================================
 * Copyright (C) 2024 RideNext Software Solutions. Pvt Ltd.  All rights reserved
 * ============LICENSE_END==========================================================================
 */

 package org.onap.ccsdk.features.sdnr.wt.mountpointregistrar.vesdomain.HeartBeat;

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
import org.elasticsearch.client.RequestOptions;
import org.slf4j.Logger;
 import org.slf4j.LoggerFactory;
 import java.io.IOException;
import java.util.concurrent.TimeUnit;
import java.util.regex.Matcher;
 import java.util.regex.Pattern;
import java.io.OutputStream;
import java.time.Duration;
import java.time.Instant;
import java.util.Collections;
import java.util.Properties;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.net.InetAddress;
import java.net.NetworkInterface;
import java.util.concurrent.TimeUnit;
import java.net.InetSocketAddress;
import java.net.Socket;
import org.onap.ccsdk.features.sdnr.wt.common.database.requests.IndexRequest;
import org.onap.ccsdk.features.sdnr.wt.mountpointregistrar.config.GeneralConfig;
import org.onap.ccsdk.features.sdnr.wt.mountpointregistrar.impl.StrimziKafkaVESMsgConsumerImpl;
import org.apache.kafka.clients.admin.AdminClient;
 
 @SuppressWarnings("unused")
public class HeartBeatVESMsgConsumer extends StrimziKafkaVESMsgConsumerImpl {
 
     private static final Logger LOG = LoggerFactory.getLogger(HeartBeatVESMsgConsumer.class);
     private static final Logger SDNRLOG = LoggerFactory.getLogger("SDNR");

     private final ScheduledExecutorService scheduler;
     private static final ConcurrentHashMap<String, DeviceHeartbeat> deviceHeartbeats = new ConcurrentHashMap<>();
     private static int MAX_MISSED_HEARTBEATS = 3;
     private static int heartBeatscheduleTimer=10;
     private KafkaProducer<String, String> producer;
     String nmsKafkaip = "";
     String nmsKafkaport = "";
     private long skippedtime = 0;
     public HeartBeatVESMsgConsumer(GeneralConfig generalConfig) {
         super(generalConfig);
         LOG.info("HeartBeatVESMsgConsumer updateHeartBeatVESMsgConsumer started successfully");
	 scheduler = Executors.newScheduledThreadPool(1);
	 startHeartbeatChecker();
      if(System.getenv("NMS_KAFKA_IP") == null || System.getenv("NMS_KAFKA_IP").isEmpty() || System.getenv("NMS_KAFKA_IP") == null || System.getenv("NMS_KAFKA_IP").isEmpty() ){
           LOG.error("Kafka producer IP and port are not configured. Producer initialization skipped.");
           SDNRLOG.error("Kafka producer IP and port are not configured. Producer initialization skipped.");
         }
         else{
            if(isBrokerReachable()){
               
                establishConnection();  
            }
            else{
                 LOG.error("Kafka producer IP and port are not reachable. Producer initialization skipped.");
                SDNRLOG.error("Kafka producer IP and port are not reachable. Producer initialization skipped.");
            }
         }
     }

     @Override
     public void processMsg(String msg) throws Exception {
         String nodeId;
         int timeout;
         String vesDomain;
         String sourceName;
         ObjectMapper oMapper = new ObjectMapper();
         JsonNode sKafkaMessageRootNode;
         LOG.info("VES Message is - {}", msg);
         try {
             sKafkaMessageRootNode = oMapper.readTree(msg);
             LOG.info("HeartBeatVESMsgConsumer sKafkaMessageRootNode : {} ", sKafkaMessageRootNode);
          
             vesDomain = sKafkaMessageRootNode.at("/event/commonEventHeader/domain").textValue();
             if (!vesDomain.equalsIgnoreCase("HeartBeat")) {
                 LOG.error("Received {} domain VES Message in Kafka not HeartBeat topic, ignoring it", vesDomain);
                 return;
             }
	     sourceName = sKafkaMessageRootNode.at("/event/commonEventHeader/sourceName").textValue();
	     if (sourceName.equalsIgnoreCase("localhost.localdomain")) {
                 LOG.error("SDNR generated HB, Ignoring it");
                 return;
             }
             nodeId = sKafkaMessageRootNode.at("/event/commonEventHeader/sourceName").textValue();
             timeout = sKafkaMessageRootNode.at("/event/heartbeatFields/heartbeatInterval").asInt();
             
             timeout = MAX_MISSED_HEARTBEATS * timeout;
             updateDeviceHeartbeat(nodeId,timeout);
 
         } catch (IOException e) {
             LOG.info("Cannot parse json object, ignoring the received HB VES Message. Reason: {}",
                     e.getMessage());
         }
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
        System.out.println("Kafka broker at " + kafkaIp + ":" + kafkaPort + " is reachable.");
        return true;
    } catch (Exception e) {
        LOG.error("Kafka broker at " + kafkaIp + ":" + kafkaPort + " is not reachable: " + e.getMessage());
        return false;
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
 
 
    // Set update HeatBeat status
  private  void updateHeartBeatStatus(String  nodeId, String status) { 
	  LOG.error("<<<< updateHeartBeatStatus Called");
      SDNRLOG.info("IN updateHeartBeatStatus()  ");
        String nID = nodeId;
        String heartBeatStatus=status;
        String  proxyApiUrl = "http://sdnc-web:3005";
        // Define the REST endpoint URL
        String url = proxyApiUrl+"/proxyapi/updateHeartBeatStatus/";
        // Create an HttpPost object
        HttpPost httpPost= new HttpPost(url);
        CloseableHttpClient httpClient = HttpClients.createDefault();
        HttpResponse httpResponse;
        try {
            // Set the JSON payload
            httpPost.setHeader("Accept", "application/json");
            httpPost.setHeader("Content-type", "application/json");

            String jsonPayload = "{\"heartBeatStatus\":\""+heartBeatStatus+"\",\"nodeId\":"+"\""+nID+"\"}";
            LOG.info("<<<< setStartupConfigStatus : jsonPayload : {}", jsonPayload);
            StringEntity entity = new StringEntity(jsonPayload);
            
            entity.setContentType("application/json");
            httpPost.setEntity(entity);

            // Execute the POST request
            httpResponse = httpClient.execute(httpPost);
             
            LOG.info("<<<< updateHeartBeatStatus: Response status code : {}", httpResponse.getStatusLine().getStatusCode());
         
            SDNRLOG.info("OUTupdateHeartBeatStatus()  ");
        } catch (Exception e) {
            LOG.error("<<<< updateHeartBeatStatus Error {}", e.getLocalizedMessage());
            SDNRLOG.error("updateHeartBeatStatus Error {}", e.getLocalizedMessage());
        } finally {
            try {
                // Close the HttpClient
                httpClient.close();
            } catch (Exception e) {
                LOG.error("<<<< updateHeartBeatStatus Error {}", e.getLocalizedMessage());
                SDNRLOG.error("updateHeartBeatStatus Error {}", e.getLocalizedMessage());
            }
        }
    }
      public void shutdown() {
        if (producer != null) {
            producer.close();
            LOG.info("Kafka producer closed.");
        }
    }

public void startHeartbeatChecker() {
	LOG.error("startHeartbeatChecker Called");
    if(System.getenv("VES_HEARTBEAT_SCHEDULE_TIMER") !=null && System.getenv("VES_HB_MISSED_COUNT")!= null)
    {
        heartBeatscheduleTimer = Integer.parseInt(System.getenv("VES_HEARTBEAT_SCHEDULE_TIMER"));
        MAX_MISSED_HEARTBEATS = Integer.parseInt(System.getenv("VES_HB_MISSED_COUNT"));
    }
    LOG.debug("heartBeatscheduleTimer MAX_MISSED_HEARTBEATS {} {}",heartBeatscheduleTimer,MAX_MISSED_HEARTBEATS);
   scheduler.scheduleAtFixedRate(() -> {
            deviceHeartbeats.forEach((deviceId, heartbeat) -> {
	LOG.error("Schedular is Called for {}",deviceId);
                if (heartbeat.updateMissedCount() <= 0) {
                    generateAlarm(deviceId);
                    updateHeartBeatStatus(deviceId, "Down");
                    long epochMicros = Instant.now().toEpochMilli() * 1000 + (System.nanoTime() % 1000000) / 1000;
                    String Message="O1 VES Heartbeat between device and ves collector is down.";
                    String status="down";
                    String jsonHBPayload= "{\"sdnrNotification\": { \"nodeId\":"+ '"'+ deviceId + '"'+  '"'+",\"status\":"+'"'+ status +'"'+ ",\"type\":\"o1-ves-status\" ,\"eventTimeEpochMicrosec\":"+ epochMicros+  ",\"message\":"+ '"'+Message+'"'+ "}}";
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
                SendMessageToNMS(jsonHBPayload);
            }
                                
                
           }
		            deviceHeartbeats.remove(deviceId);
                }
            });
        }, 0, heartBeatscheduleTimer, TimeUnit.SECONDS); 
}

 public static void removeDeviceFromTracker(String deviceId) {
        LOG.info("removing device {} from heartbeat tracker",deviceId);
        deviceHeartbeats.remove(deviceId);
    }

public void updateDeviceHeartbeat(String deviceId,int timerVal) {
    deviceHeartbeats.compute(deviceId, (id, heartbeat) -> {
        if (heartbeat == null) {
            LOG.info("updateDeviceHeartbeat if entered");
            DeviceHeartbeat objheartbeat = new DeviceHeartbeat();
            objheartbeat.resetMissedCount(timerVal);
            updateHeartBeatStatus(deviceId,"UP");
            long epochMicros = Instant.now().toEpochMilli() * 1000 + (System.nanoTime() % 1000000) / 1000;
            String Message="O1 VES Heartbeat between device and ves collector is restored.";
            String status="up";
            String jsonHBPayload= "{\"sdnrNotification\": { \"nodeId\":"+ '"'+ deviceId + '"'+  '"'+",\"status\":"+'"'+ status +'"'+ ",\"Type\":\"o1-ves-status\" ,\"eventTimeEpochMicrosec\":"+ epochMicros+  ",\"Message\":"+ '"'+Message+'"'+ "}}";
           // String jsonHBPayload= "{\"sdnrNotification\": { \"nodeId\":"+ '"'+ deviceId + '"'+ ",\"status\":\"up\""+ ",\"Type\":\"o1-ves-status\" ,\"eventTimeEpochMicrosec\":"+ epochMicros+  ",\"Message\":"+ '"'+Message+'"'+ "}}";
            SDNRLOG.info("jsonHBPayload  : "+jsonHBPayload);
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
                    LOG.info("updateDeviceHeartbeat else entered");
                    SendMessageToNMS(jsonHBPayload);
                }
            }
	    return objheartbeat;
        } else {
            LOG.info("updateDeviceHeartbeat else entered");
            heartbeat.resetMissedCount(timerVal);
            return heartbeat;
        }
    });
}

private void generateAlarm(String deviceId) {
    System.out.println("ALARM: Heartbeat missed 3 times for device " + deviceId + "!");
    // Trigger your alarm logic here
}


static class DeviceHeartbeat {
    private int missedCount = 0;

    public int updateMissedCount() {
        missedCount-=heartBeatscheduleTimer;
        return missedCount;
    }

    public void resetMissedCount(int HBtimerVal) {
        missedCount = HBtimerVal;
    }

    public int getMissedCount() {
        return missedCount;
    }
  }
}
