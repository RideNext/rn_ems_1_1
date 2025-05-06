/*
 * ============LICENSE_START========================================================================
 * ONAP : ccsdk feature sdnr wt
 * =================================================================================================
 * Copyright (C) 2019 highstreet technologies GmbH Intellectual Property. All rights reserved.
 * =================================================================================================
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License
 * is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
 * or implied. See the License for the specific language governing permissions and limitations under
 * the License.
 * ============LICENSE_END==========================================================================
 */

 package org.onap.ccsdk.features.sdnr.wt.devicemanager.impl;

 import java.io.BufferedReader;
 import java.io.File;
 import java.io.FileInputStream;
 import java.io.IOException;
 import java.io.InputStreamReader;
import java.net.InetAddress;
import java.time.Instant;
 import java.util.List;
 import java.util.Objects;
 import java.util.Optional;
 import java.util.Properties;
 import java.util.concurrent.ConcurrentHashMap;
 import javax.annotation.concurrent.GuardedBy;
 import org.eclipse.jdt.annotation.NonNull;
 import org.eclipse.jdt.annotation.Nullable;
 import org.json.JSONObject;
 import org.onap.ccsdk.features.sdnr.wt.devicemanager.devicemonitor.impl.DeviceMonitor;
 import org.onap.ccsdk.features.sdnr.wt.devicemanager.eventdatahandler.ODLEventListenerHandler;
 import org.onap.ccsdk.features.sdnr.wt.devicemanager.ne.factory.NetworkElementFactory;
 import org.onap.ccsdk.features.sdnr.wt.devicemanager.ne.service.NetworkElement;
 import org.onap.ccsdk.features.sdnr.wt.devicemanager.service.DeviceManagerServiceProvider;
 import org.onap.ccsdk.features.sdnr.wt.netconfnodestateservice.NetconfAccessor;
 import org.onap.ccsdk.features.sdnr.wt.netconfnodestateservice.NetconfNodeConnectListener;
 import org.onap.ccsdk.features.sdnr.wt.netconfnodestateservice.NetconfNodeStateService;
 import org.opendaylight.mdsal.singleton.common.api.ClusterSingletonServiceProvider;
 import org.opendaylight.yang.gen.v1.urn.opendaylight.netconf.node.topology.rev150114.NetconfNode;
 import org.opendaylight.yang.gen.v1.urn.opendaylight.netconf.node.topology.rev150114.NetconfNodeConnectionStatus.ConnectionStatus;
 import org.opendaylight.yang.gen.v1.urn.tbd.params.xml.ns.yang.network.topology.rev131021.NodeId;
 import org.opendaylight.yangtools.concepts.ListenerRegistration;
 import org.slf4j.Logger;
 import org.slf4j.LoggerFactory;
 
 import org.apache.http.HttpEntity;
 import org.apache.http.HttpResponse;
 import org.apache.http.auth.AuthScope;
 import org.apache.http.auth.UsernamePasswordCredentials;
 import org.apache.http.client.ClientProtocolException;
 import org.apache.http.client.CredentialsProvider;
 import org.apache.http.client.methods.HttpGet;
 import org.apache.http.client.methods.HttpPost;
 import org.apache.http.entity.StringEntity;
 import org.apache.http.impl.client.BasicCredentialsProvider;
 import org.apache.http.impl.client.CloseableHttpClient;
 import org.apache.http.impl.client.HttpClients;
import java.util.concurrent.TimeUnit;

 import org.apache.kafka.clients.producer.KafkaProducer;
 import org.apache.kafka.clients.producer.ProducerRecord;
 import org.apache.kafka.clients.producer.RecordMetadata;
 import java.net.InetAddress;
import java.net.NetworkInterface;
import org.apache.kafka.clients.admin.AdminClient;
import java.net.InetSocketAddress;
import java.net.Socket;
 
 public class DeviceManagerNetconfConnectHandler extends DeviceManagerNetconfNotConnectHandler
         implements NetconfNodeConnectListener {
 
     private static final Logger LOG = LoggerFactory.getLogger(DeviceManagerNetconfConnectHandler.class);
     private static final Logger SDNRLOG = LoggerFactory.getLogger("SDNR");
 
     private final Object networkelementLock;
     // String proxyApiUrl = "http://localhost:3005";
     String proxyApiUrl = "http://sdnc-web:3005";
     String baseUrl = "";
     String sdnrUser = "";
     String sdnrPasswd = "";
     String sftpPath = "";
     String nmsKafkaip = "";
     String nmsKafkaport = "";
     private long skippedtime = 0;
     private KafkaProducer<String, String> producer;
 
     /** Contains all connected devices */
     @GuardedBy("networkelementLock")
     private final ConcurrentHashMap<String, NetworkElement> connectedNetworkElementRepresentations;
 
     private final @NonNull ListenerRegistration<DeviceManagerNetconfConnectHandler> registerNetconfNodeConnectListener;
 
     public DeviceManagerNetconfConnectHandler(@NonNull NetconfNodeStateService netconfNodeStateService,
             @NonNull ClusterSingletonServiceProvider clusterSingletonServiceProvider,
             @NonNull ODLEventListenerHandler odlEventListenerHandler, @NonNull DeviceMonitor deviceMonitor,
             @NonNull DeviceManagerServiceProvider serviceProvider, @NonNull List<NetworkElementFactory> factoryList) {
 
         super(netconfNodeStateService, clusterSingletonServiceProvider, odlEventListenerHandler, deviceMonitor,
                 serviceProvider, factoryList);
 
         this.networkelementLock = new Object();
         this.connectedNetworkElementRepresentations = new ConcurrentHashMap<>();
 
         this.registerNetconfNodeConnectListener = netconfNodeStateService.registerNetconfNodeConnectListener(this);
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

     public void shutdown() {
        if (producer != null) {
            producer.close();
            LOG.info("Kafka producer closed.");
        }
    }
 
     
 ///  CreatJosonPayLoad
 private String CreatJosonPayLoad(String nodeId,String Status,String Message ) {
   
      SDNRLOG.info("IN CreatJosonPayLoad()  ");
     String jsonPayload= "";
     try {
         long epochMicros = Instant.now().toEpochMilli() * 1000 + (System.nanoTime() % 1000000) / 1000;
         jsonPayload= "{\"sdnrNotification\": { \"nodeId\":"+ '"'+ nodeId + '"'+ ",\"status\":"+'"'+ Status +'"'+ ",\"type\":\"configuration-status\" ,\"eventTimeEpochMicrosec\":"+ epochMicros+  ",\"message\":"+ '"'+Message+'"'+ "}}";
      
         SDNRLOG.debug("jsonPayload  " + jsonPayload);
         
     } catch (Exception ex) {
         SDNRLOG.error("Exception CreatJosonPayLoad  {} ", ex.getMessage());
     }
     SDNRLOG.info("OUT CreatJosonPayLoad()  ");
     return jsonPayload;
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
 
     @Override
     public void onEnterConnected(@NonNull NetconfAccessor acessor) {
          SDNRLOG.info("IN  onEnterConnected Method");
         String mountPointNodeName = acessor.getNodeId().getValue();
         String  iStartUpdoneStatus = "";
         LOG.debug("onEnterConnected - starting Event listener on Netconf for mountpoint {}", mountPointNodeName);
         SDNRLOG.debug("onEnterConnected - starting Event listener on Netconf for mountpoint {}", mountPointNodeName);
 
         // It is master for mountpoint and all data are available.
         // Make sure that specific mountPointNodeName is handled only once.
         // be aware that startListenerOnNodeForConnectedState could be called multiple
         // times for same mountPointNodeName.
         // networkElementRepresentations contains handled NEs at master node.
         if (isInNetworkElementRepresentations(mountPointNodeName)) {
             LOG.warn("Mountpoint {} already registered. Leave startup procedure.", mountPointNodeName);
             SDNRLOG.warn("Mountpoint {} already registered. Leave startup procedure.", mountPointNodeName);
             return;
         }
         // update db with connect status
         NetconfNode netconfNode = acessor.getNetconfNode();
         LOG.info("<<<<< onEnterConnected NodeId {}", acessor.getNodeId());
         SDNRLOG.debug("onEnterConnected NodeId {}", acessor.getNodeId());
 
         sendUpdateNotification(acessor.getNodeId(), netconfNode.getConnectionStatus(), netconfNode);
         for (NetworkElementFactory f : getFactoryList()) {
             Optional<NetworkElement> optionalNe = f.create(acessor, getServiceProvider());
 
             if (optionalNe.isPresent()) {
                  //sendUpdateNotification(mountPointNodeName, nNode.getConnectionStatus(), nNode);
                // NetworkElement Ne = optionalNe.get();
                // iStartUpdoneStatus=Ne.getSoftwareVersion();
                 LOG.debug("<<<<< iStartUpdoneStatus {}", iStartUpdoneStatus);
                 SDNRLOG.debug("iStartUpdoneStatus {}", iStartUpdoneStatus);
                 handleNeStartup(acessor.getNodeId(), optionalNe.get());
                 break; // Use the first provided
             }
         }
         getMountPointConfigs();
         String Message="";
         String jsonPayload="";
         LOG.debug("<<<<< onEnterConnected ConnectionStatus {}", netconfNode.getConnectionStatus());
         SDNRLOG.debug("onEnterConnected ConnectionStatus {}", netconfNode.getConnectionStatus());
         String startupConfigFile = getStartupConfigFile(acessor.getNodeId());
         LOG.debug("<<<<<  startupConfigFile Name {}", startupConfigFile);
         SDNRLOG.debug("startupConfigFile Name {}", startupConfigFile);
         if (startupConfigFile != null && startupConfigFile != "") {
             
             String startUPXMLStatus = getStartupConfigStatus(acessor.getNodeId());
             LOG.debug("<<<<<  startUPXMLStatus {}", iStartUpdoneStatus);
             SDNRLOG.debug("startUPXMLStatus {}", iStartUpdoneStatus);
             if (startUPXMLStatus.contains("no")) {
                 LOG.debug("<<<<< before Lock Request");
                 SDNRLOG.debug(" before Lock Request");
                 int lockResponseCode = lockDevice(mountPointNodeName, "candidate");
                 LOG.debug("<<<<< lockDevice Request response Code " + lockResponseCode);
                 SDNRLOG.debug(" lockDevice Request response Code " + lockResponseCode);
                 if (lockResponseCode >= 200 && lockResponseCode < 210) {
                     try {
                         LOG.debug("<<<<< before applyStartupConfig Request");
                         SDNRLOG.debug(" before applyStartupConfig Request");
                         int applyStartupResCode = applyStartupConfig(mountPointNodeName, startupConfigFile);
                         LOG.info("<<<<< applyStartupResCode Request response Code " + applyStartupResCode);
                         SDNRLOG.debug(" applyStartupResCode Request response Code " + applyStartupResCode);
                         if (applyStartupResCode >= 200 && applyStartupResCode < 210) {
                             try {
                                Message="Successfully configuration applied ";
                                jsonPayload= CreatJosonPayLoad(mountPointNodeName,"configuration-applied",Message );
                                SDNRLOG.debug("JsonPayload For Connect Status {}", jsonPayload);
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
                                        SendMessageToNMS(jsonPayload); 
                                    }
                                    
                                }
                                 LOG.debug("<<<<< before commitConfig Request");
                                 SDNRLOG.debug("Before commitConfig Request");
                                 int commitResponseCode = commitConfig(mountPointNodeName);
                                 LOG.info("<<<<< commitResponseCode Request response Code " + commitResponseCode);
                                 SDNRLOG.debug("CommitResponseCode Request response Code " + commitResponseCode);
                                 if (commitResponseCode >= 200 && commitResponseCode < 210) {
                                     try {
                                         // Set Startup Config Status to yes
                                         //setStartupConfigStatus(nodeId);
                                         getOdlEventListenerHandler().startUpXmlIndication(mountPointNodeName, "yes");
                                         LOG.info("<<<<< before unLockDevice Request");
                                         SDNRLOG.debug("Before unLockDevice Request");
                                         unLockDevice(mountPointNodeName, "candidate");
                                         // Copy Config running to startup
                                         LOG.debug("<<<<< before copyConfig Request");
                                         SDNRLOG.debug("Before copyConfig Request");
                                        copyConfig(mountPointNodeName, "running", "startup");
                                     } catch (Exception e) {
                                        Message = "configuration failed With exception "+  e.getLocalizedMessage();
                                        jsonPayload= CreatJosonPayLoad(mountPointNodeName,"configuration-failed",Message );
                                        SDNRLOG.debug("JsonPayload For Connect Status {}", jsonPayload);
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
                                        SendMessageToNMS(jsonPayload); 
                                    }
                                         }
                                         LOG.error("<<<< applyStartupConfig copyConfig Error {}", e.getLocalizedMessage());
                                         SDNRLOG.error("applyStartupConfig copyConfig Error {}",
                                         e.getLocalizedMessage());
                                         unLockDevice(mountPointNodeName, "candidate");
                                     }
                                 }
                                 else{
                                    Message= "configuration failed With response code "+ commitResponseCode;
                                    jsonPayload= CreatJosonPayLoad(mountPointNodeName,"configuration-failed",Message );
                                    SDNRLOG.debug("JsonPayload For Connect Status {}", jsonPayload);
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
                                        SendMessageToNMS(jsonPayload); 
                                    }
                                    }
                                    unLockDevice(mountPointNodeName, "candidate");
                                 }
                             } catch (Exception e) {
                                Message= "configuration failed With exception "+  e.getLocalizedMessage();
                                 LOG.error("<<<< applyStartupConfig Commit Error {}", e.getLocalizedMessage());
                                 SDNRLOG.error("ApplyStartupConfig Commit Error {}", e.getLocalizedMessage());
                                 jsonPayload= CreatJosonPayLoad(mountPointNodeName,"configuration-failed", Message);
                                 SDNRLOG.debug("JsonPayload For Connect Status {}", jsonPayload);
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
                                        SendMessageToNMS(jsonPayload); 
                                    }
                                    }
                                 unLockDevice(mountPointNodeName, "candidate");
                             }
                         }
                         else {

                             Message="configuration failed with respose code  "+applyStartupResCode;
                             jsonPayload= CreatJosonPayLoad(mountPointNodeName,"configuration-failed",Message );
                             SDNRLOG.debug("JsonPayload For Connect Status {}", jsonPayload);
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
                                        SendMessageToNMS(jsonPayload); 
                                    }
                                    }
                             LOG.debug("<<<<< For Unsuccessfull Response:  unLockDevice Request");
                             unLockDevice(mountPointNodeName, "candidate");
                             SDNRLOG.debug("For Unsuccessfull Response:  unLockDevice Request");
                             
                         }
                     } catch (Exception e) {
                         LOG.error("<<<< Lock device Error {}", e.getLocalizedMessage());
                         SDNRLOG.error("Lock device Error {}", e.getLocalizedMessage());
                         unLockDevice(mountPointNodeName, "candidate");
                     }
                 }
             } else {
                 /// Copy config startup to candidate
                 copyConfig(mountPointNodeName, "startup", "candidate");
                 
             }
         }
         SDNRLOG.info("OUT onEnterConnected Method");
     }
 
     @Override
     public void onLeaveConnected(@NonNull NodeId nNodeId, @NonNull Optional<NetconfNode> optionalNetconfNode) {
 
          SDNRLOG.info("IN onLeaveConnected Method");
         LOG.debug("<<<<<< onLeaveConnected {}", nNodeId);
         SDNRLOG.debug("onLeaveConnected {}", nNodeId);
  
         
         String mountPointNodeName = nNodeId.getValue();
 
         if (optionalNetconfNode.isPresent()) {
             NetconfNode nNode = optionalNetconfNode.get();
             ConnectionStatus csts = nNode.getConnectionStatus();
             sendUpdateNotification(nNodeId, csts, nNode);
         }
 
         // Handling if mountpoint exist. connected -> connecting/UnableToConnect
         stopListenerOnNodeForConnectedState(mountPointNodeName);
         if (isDeviceMonitorEnabled()) {
             getDeviceMonitor().deviceDisconnectIndication(mountPointNodeName);
         }
         SDNRLOG.info("OUT onLeaveConnected ()");
     }
 
     @Override
     public void close() {
         if (Objects.nonNull(registerNetconfNodeConnectListener)) {
             registerNetconfNodeConnectListener.close();
         }
         super.close();
     }
 
     public @Nullable NetworkElement getConnectedNeByMountpoint(String mountpoint) {
         return this.connectedNetworkElementRepresentations.get(mountpoint);
     }
 
     /*--------------------------------------------
      * Private functions
      */
 
     /**
      * Do all tasks necessary to move from mountpoint state connected -> connecting
      *
      * @param mountPointNodeName provided
      */
     private void stopListenerOnNodeForConnectedState(String mountPointNodeName) {
         NetworkElement ne = connectedNetworkElementRepresentations.remove(mountPointNodeName);
         if (ne != null) {
             ne.deregister();
         }
     }
 
     private boolean isInNetworkElementRepresentations(String mountPointNodeName) {
         synchronized (networkelementLock) {
             return connectedNetworkElementRepresentations.contains(mountPointNodeName);
         }
     }
 
     private void handleNeStartup(NodeId nodeId, NetworkElement inNe) {
 
         SDNRLOG.info("IN handleNeStartup()");
 
         LOG.debug("<<<<< NE Management for {} with {}", nodeId.getValue(), inNe.getClass().getName());
         SDNRLOG.debug("NE Management for {} with {}", nodeId.getValue(), inNe.getClass().getName());
         NetworkElement result;
         synchronized (networkelementLock) {
             result = connectedNetworkElementRepresentations.put(nodeId.getValue(), inNe);
         }
         if (result != null) {
             LOG.warn("NE list was not empty as expected, but contained {} ", result.getNodeId());
         } else {
             LOG.debug("refresh necon entry for {} with type {}", nodeId.getValue(), inNe.getDeviceType());
             SDNRLOG.debug("refresh necon entry for {} with type {}", nodeId.getValue(), inNe.getDeviceType());
                // if (isOdlEventListenerHandlerEnabled()) {
                 String modelNumber = "";
                 String softwareVersion = "";
                 String serialNumber = "";
                 String vendorDetails ="";
                 String deviceType ="";
                 String  devicedetailRes= getDeviceDetailsFromPreProvider(nodeId.getValue()) ;
                 SDNRLOG.debug("devicedetailRes {}", devicedetailRes.toString());
		 if(devicedetailRes!=null)
                 {
                   try{
                     JSONObject devicedetailjson = new JSONObject(devicedetailRes);
                     LOG.debug("<<<<<  Software Version Details {}", devicedetailjson);
                     SDNRLOG.debug("Software Version Details {}", devicedetailjson);
                     modelNumber = devicedetailjson.optString("model-number", "");
                     softwareVersion = devicedetailjson.optString("software-version", "");
                     serialNumber = devicedetailjson.optString("serial-number", "");
                     vendorDetails = devicedetailjson.optString("vendor-details", "");
                     deviceType = devicedetailjson.optString("DeviceType", "");
}
                  catch(Exception e){LOG.error(e.getMessage());}
                 }

             getOdlEventListenerHandler().connectIndication(nodeId, deviceType,modelNumber, softwareVersion, serialNumber, vendorDetails);
         // }
         }
         if (isDeviceMonitorEnabled()) {
             getDeviceMonitor().deviceConnectMasterIndication(nodeId.getValue(), inNe);
         }
         inNe.register();
         SDNRLOG.info("OUT handleNeStartup()");
     }
 
     private void sendUpdateNotification(NodeId nodeId, ConnectionStatus csts, NetconfNode nNode) {
 
        SDNRLOG.info("IN sendUpdateNotification()");
 
         LOG.debug("update ConnectedState for device :: Name : {} ConnectionStatus {}", nodeId.getValue(), csts);
         SDNRLOG.debug("update ConnectedState for device :: Name : {} ConnectionStatus {}", nodeId.getValue(), csts);
         if (isOdlEventListenerHandlerEnabled()) {
             getOdlEventListenerHandler().updateRegistration(nodeId, ConnectionStatus.class.getSimpleName(),
                     csts != null ? csts.getName() : "null", nNode);
         }
         SDNRLOG.info("OUT sendUpdateNotification Method");
     }
 
     /// Apply the start up config xml
     private int applyStartupConfig(String nodeId, String startUPConfigFile) {
 
         LOG.info("<<<< applyStartupConfig Started ");
         SDNRLOG.info("IN  applyStartupConfig()  ");
 
         String username = sdnrUser;// "admin";
         String password = sdnrPasswd;// "admin";
         int responseCode = 0;
         // Create a HttpClient instance
         CredentialsProvider credentialsProvider = new BasicCredentialsProvider();
         credentialsProvider.setCredentials(AuthScope.ANY, new UsernamePasswordCredentials(username, password));
         CloseableHttpClient httpClient = HttpClients.custom().setDefaultCredentialsProvider(credentialsProvider)
                 .build();
 
         // Define the REST endpoint URL
         String url = baseUrl + "/rests/operations/network-topology:network-topology/topology=topology-netconf/node="
                 + nodeId + "/yang-ext:mount/ietf-netconf:edit-config";
         // String startUPConfigFile=fileName;//"l1_startup.xml";

         String sftpUrl = sftpPath + "/" + startUPConfigFile;
         sftpUrl = sftpUrl.replaceAll("\"", "");
         LOG.info("<<<< after replace applyStartupConfig : sftpUrl : {}", sftpUrl);
         SDNRLOG.debug("After replace applyStartupConfig : sftpUrl : {}", sftpUrl);
         sftpUrl = "\"" + sftpUrl + "\"";
         // Define the JSON payload for the POST request
         // String jsonPayload = "{\"key1\":\"value1\",\"key2\":\"value2\"}";
         String jsonPayload = "{\"ietf-netconf:input\":{\"default-operation\":\"merge\",\"test-option\":\"test-then-set\",\"error-option\":\"stop-on-error\",\"url\":"
                 + sftpUrl + ",\"target\":{\"candidate\":\"candidate\"}}}";
         LOG.info("<<<< applyStartupConfig : jsonPayload : {}", jsonPayload);
         SDNRLOG.debug(" applyStartupConfig : jsonPayload : {}", jsonPayload);
         // Create an HttpPost object
         HttpPost httpPost = new HttpPost(url);
 
         try {
             // Set the JSON payload
             StringEntity entity = new StringEntity(jsonPayload);
 
             entity.setContentType("application/json");
             httpPost.setEntity(entity);
             httpPost.setHeader("Accept", "application/json");
             httpPost.setHeader("Content-type", "application/json");
 
             // Execute the POST request
             HttpResponse response = httpClient.execute(httpPost);
             String Message="Configuration initiated ";
             jsonPayload= CreatJosonPayLoad(nodeId,"configuration-initiated",Message );
             SDNRLOG.debug("JsonPayload For Connect Status {}", jsonPayload);
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
                 SendMessageToNMS(jsonPayload);
            }
                
        }
             
 
             // Get the response entity
             HttpEntity responseEntity = response.getEntity();
 
             // Print the response status code
             LOG.info("<<<< applyStartupConfig : Response status code : {}", response.getStatusLine().getStatusCode());
             SDNRLOG.debug(" applyStartupConfig : Response status code : {}", response.getStatusLine().getStatusCode());
             // Print the response body, if any
             if (responseEntity != null) {
                 // String responseBody = EntityUtils.toString(responseEntity);
                 LOG.info("<<<< applyStartupConfig: Response body {}", responseEntity);
                 SDNRLOG.debug(" applyStartupConfig: Response body {}", responseEntity);
             }
             responseCode = response.getStatusLine().getStatusCode();
 
         } catch (Exception e) {

             String Message="configuration failed with exception " + e.getLocalizedMessage();
             jsonPayload= CreatJosonPayLoad(nodeId,"configuration-failed",Message );
             SDNRLOG.debug("JsonPayload For Connect Status {}", jsonPayload);
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
                SendMessageToNMS(jsonPayload);
            }
             }
             LOG.error("<<<< applyStartupConfig Error {}", e.getLocalizedMessage());
             unLockDevice(nodeId, "candidate");
             SDNRLOG.error("applyStartupConfig Error {}", e.getLocalizedMessage());
             unLockDevice(nodeId, "candidate");
         } finally {
             try {
                 // Close the HttpClient
                 httpClient.close();
             } catch (Exception e) {
                 LOG.error("<<<< applyStartupConfig Error {}", e.getLocalizedMessage());
                 SDNRLOG.error("applyStartupConfig Error {}", e.getLocalizedMessage());
             }
         }
         SDNRLOG.info("OUT applyStartupConfig()  ");
         return responseCode;
     }
 
     //// copy Config
     private int copyConfig(String nodeId, String source, String target) {
         LOG.info("<<<< copyConfig Started ");
          SDNRLOG.info("IN copyConfig()  ");
         int responseCode = 0;
         String username = sdnrUser;// "admin";
         String password = sdnrPasswd;// "admin";
 
         // Create a HttpClient instance
         CredentialsProvider credentialsProvider = new BasicCredentialsProvider();
         credentialsProvider.setCredentials(AuthScope.ANY, new UsernamePasswordCredentials(username, password));
         CloseableHttpClient httpClient = HttpClients.custom().setDefaultCredentialsProvider(credentialsProvider)
                 .build();
         String nID = nodeId;
         source = "\"" + source + "\"";
         target = "\"" + target + "\"";
         // Define the REST endpoint URL
         String url = baseUrl + "/rests/operations/network-topology:network-topology/topology=topology-netconf/node="
                 + nID + "/yang-ext:mount/ietf-netconf:copy-config";
         // Define the JSON payload for the POST request
         String jsonPayload = "{\"ietf-netconf:input\":{\"target\":{" + target + ":" + target + "},\"source\":{" + source
                 + ":" + source + "}}}";
         LOG.info("<<<< copyConfig : jsonPayload : {}", jsonPayload);
         SDNRLOG.debug(" copyConfig : jsonPayload : {}", jsonPayload);
         // Create an HttpPost object
         HttpPost httpPost = new HttpPost(url);
 
         try {
             // Set the JSON payload
             StringEntity entity = new StringEntity(jsonPayload);
 
             entity.setContentType("application/json");
             httpPost.setEntity(entity);
             httpPost.setHeader("Accept", "application/json");
             httpPost.setHeader("Content-type", "application/json");
 
             // Execute the POST request
             HttpResponse copyResponse = httpClient.execute(httpPost);
 
             // Print the response status code
             LOG.info("<<<< copyConfig : Response status code : {}", copyResponse.getStatusLine().getStatusCode());
             SDNRLOG.debug("copyConfig : Response status code : {}", copyResponse.getStatusLine().getStatusCode());
             responseCode = copyResponse.getStatusLine().getStatusCode();
 
         } catch (Exception e) {
             LOG.error("<<<< copyConfig Error {}", e.getLocalizedMessage());
             SDNRLOG.error("copyConfig Error {}", e.getLocalizedMessage());
             // e.printStackTrace();
         } finally {
             try {
                 // Close the HttpClient
                 httpClient.close();
             } catch (Exception e) {
                 LOG.error("<<<< copyConfig Error {}", e.getLocalizedMessage());
                 SDNRLOG.error("copyConfig Error {}", e.getLocalizedMessage());
             }
         }
         return responseCode;
     }
 
     /// Get Startup XML File
     private String getStartupConfigFile(NodeId nodeId) {
         
         SDNRLOG.info(" Started getStartupConfigFile Method  ");
         String nID = nodeId.getValue();
         // Define the REST endpoint URL
         String url = proxyApiUrl + "/proxyapi/getprofilemappingfile/" + nID;
         // Create an HttpPost object
         HttpGet httpGet = new HttpGet(url);
         CloseableHttpClient httpGetClient = HttpClients.createDefault();
         HttpResponse httpResponse;
         StringBuffer response = new StringBuffer();
         try {
             // Set the JSON payload
             httpGet.setHeader("Accept", "application/json");
             httpGet.setHeader("Content-type", "application/json");
             // Execute the GET request
             httpResponse = httpGetClient.execute(httpGet);
 
             // Get the response string
             BufferedReader reader = new BufferedReader(new InputStreamReader(httpResponse.getEntity().getContent()));
             String inputLine;
             while ((inputLine = reader.readLine()) != null) {
                 response.append(inputLine);
             }
             reader.close();
             LOG.info("<<<< getStartupConfigFile : Response  : {}", response);
             SDNRLOG.debug("getStartupConfigFile : Response  : {}", response);
 
         } catch (Exception e) {
             LOG.error("<<<< getStartupConfigFile Error {}", e.getLocalizedMessage());
             SDNRLOG.error(" getStartupConfigFile Error {}", e.getLocalizedMessage());
         } finally {
             try {
                 // Close the HttpClient
                 httpGetClient.close();
             } catch (Exception e) {
                 LOG.error("<<<< getStartupConfigFile Error {}", e.getLocalizedMessage());
                 SDNRLOG.error("getStartupConfigFile Error {}", e.getLocalizedMessage());
             }
         }
         SDNRLOG.info("OUT getStartupConfigFile Method  ");
         return response.toString();
     }
 
     /// Get Startup XML status
     private String getStartupConfigStatus(NodeId nodeId) {
         LOG.info("<<<< getStartupConfigStatus Started ");
         SDNRLOG.info(" Started getStartupConfigStatus End ");
         String nID = nodeId.getValue();
         // Define the REST endpoint URL
         String url = proxyApiUrl + "/proxyapi/getStartupConfigStatus/" + nID;
         // Create an HttpPost object
         HttpGet httpGet = new HttpGet(url);
         CloseableHttpClient httpGetClient = HttpClients.createDefault();
         HttpResponse httpResponse;
         StringBuffer response = new StringBuffer();
         try {
             // Set the JSON payload
             httpGet.setHeader("Accept", "application/json");
             httpGet.setHeader("Content-type", "application/json");
             // Execute the GET request
             httpResponse = httpGetClient.execute(httpGet);
             // Get the response string
             BufferedReader reader = new BufferedReader(new InputStreamReader(httpResponse.getEntity().getContent()));
             String inputLine;
             while ((inputLine = reader.readLine()) != null) {
                 response.append(inputLine);
             }
             reader.close();
             LOG.info("<<<< getStartupConfigStatus : Response  : {}", response);
             SDNRLOG.debug(" getStartupConfigStatus : Response  : {}", response);
 
         } catch (Exception e) {
             LOG.error("<<<< getStartupConfigStatus Error {}", e.getLocalizedMessage());
             SDNRLOG.error("getStartupConfigStatus Error {}", e.getLocalizedMessage());
         } finally {
             try {
                 // Close the HttpClient
                 httpGetClient.close();
             } catch (Exception e) {
                 LOG.error("<<<< getStartupConfigStatus Error {}", e.getLocalizedMessage());
                 SDNRLOG.error("getStartupConfigStatus Error {}", e.getLocalizedMessage());
             }
         }
         SDNRLOG.info("OUT getStartupConfigStatus End ");
         return response.toString();
     }
 
     
  
  private String getDeviceDetailsFromPreProvider(String nodeId) {
 
     LOG.info("Started getDeviceDetailsFromPreProvider ()  ");
     SDNRLOG.info("IN getDeviceDetailsFromPreProvider ()  ");
     String url = proxyApiUrl + "/proxyapi/getDeviceDetailsFromPreProvider/" + nodeId;
     // Create an HttpPost object
     HttpGet httpGet = new HttpGet(url);
     CloseableHttpClient httpGetClient = HttpClients.createDefault();
     HttpResponse httpResponse;
     StringBuffer response = new StringBuffer();
     try {
         // Set the JSON payload
         httpGet.setHeader("Accept", "application/json");
         httpGet.setHeader("Content-type", "application/json");
         // Execute the GET request
         httpResponse = httpGetClient.execute(httpGet);
         // Get the response string
         BufferedReader reader = new BufferedReader(new InputStreamReader(httpResponse.getEntity().getContent()));
         String inputLine;
         while ((inputLine = reader.readLine()) != null) {
             response.append(inputLine);
         }
         reader.close();
         LOG.debug("<<<< getDeviceDetailsFromPreProvider : Response  : {}", response);
         SDNRLOG.debug("getDeviceDetailsFromPreProvider : Response  : {}", response);
 
     } catch (Exception e) {
         LOG.error("<<<< getDeviceDetailsFromPreProvider Error {}", e.getLocalizedMessage());
         SDNRLOG.error("getDeviceDetailsFromPreProvider Error {}", e.getLocalizedMessage());
     } finally {
         try {
             // Close the HttpClient
             httpGetClient.close();
         } catch (Exception e) {
             LOG.error("<<<< getDeviceDetailsFromPreProvider Error {}", e.getLocalizedMessage());
             SDNRLOG.error(" getDeviceDetailsFromPreProvider Error {}", e.getLocalizedMessage());
         }
     }
     LOG.info("End getDeviceDetailsFromPreProvider ()  ");
     return response.toString();
 }
 
     
 
     /// Set get mount Point properties
     private void getMountPointConfigs() {
         LOG.info("<<<< getMountPointConfigs Started ");
          SDNRLOG.info("IN getMountPointConfigs ()  ");
         // String s = System.getProperty("user.dir");
         try {
             // LOG.info(s + "/etc/mountpoint-registrar.properties");
             // File file = new File(s + "/etc/mountpoint-registrar.properties");
             // LOG.info(" File exits : {} ", file.exists());
             // LOG.info(" File Can read : {} ", file.canRead());
             // Properties pro = new Properties();
             // FileInputStream fin = new FileInputStream(file);
             // pro.load(fin);
             baseUrl = System.getenv("SDNR_URL");
             sdnrUser = System.getenv("ADMIN_USERNAME");
             sdnrPasswd = System.getenv("ADMIN_PASSWORD");
             sftpPath = System.getenv("CONFIG_FILE_PATH");

             nmsKafkaip = System.getenv("NMS_KAFKA_IP");
             nmsKafkaport = System.getenv("NMS_KAFKA_PORT");
 
             LOG.debug("RN-EMS:Mount Point Configs:  baseUrl : {} ,sdnrUser : {}, sdnrPasswd : {}  , sftpPath : {} ",
                     baseUrl, sdnrUser,
                     sdnrPasswd, sftpPath);
             SDNRLOG.debug("RN-EMS:Mount Point Configs:  baseUrl : {} ,sdnrUser : {}, sdnrPasswd : {}  , sftpPath : {} ",
             baseUrl, sdnrUser,
             sdnrPasswd, sftpPath);
         } catch (Exception ex) {
             LOG.error("Exception in General Properties read  {} ", ex.getMessage());
             SDNRLOG.error("Exception in General Properties read  {} ", ex.getMessage());
         }
         SDNRLOG.info("OUT getMountPointConfigs ()  ");
 
     }
 
     //// commit Config
     private int commitConfig(String nodeId) {
          SDNRLOG.info("IN commitConfig ()  ");
         int responseCode = 0;
         String username = sdnrUser;// "admin";
         String password = sdnrPasswd;// "admin";
         CredentialsProvider credentialsProvider = new BasicCredentialsProvider();
         credentialsProvider.setCredentials(AuthScope.ANY, new UsernamePasswordCredentials(username, password));
         CloseableHttpClient httpClient = HttpClients.custom().setDefaultCredentialsProvider(credentialsProvider)
                 .build();
 
         try {
             String commiturl = baseUrl
                     + "/rests/operations/network-topology:network-topology/topology=topology-netconf/node=" + nodeId
                     + "/yang-ext:mount/ietf-netconf:commit";
             LOG.info("<<<< applyStartupConfig : commiturl : {}", commiturl);
             SDNRLOG.info("applyStartupConfig : commiturl : {}", commiturl);
 
             String jsonPayloadCommit = "{\"ietf-netconf:input\":{\"confirm-timeout\":\"600\"}}";
             LOG.info("<<<< applyStartupConfig : jsonPayload : {}", jsonPayloadCommit);
             SDNRLOG.debug("applyStartupConfig : jsonPayload : {}", jsonPayloadCommit);
             HttpPost httpPost = new HttpPost(commiturl);
             StringEntity entityCommit = new StringEntity(jsonPayloadCommit);
 
             entityCommit.setContentType("application/json");
             httpPost.setEntity(entityCommit);
             httpPost.setHeader("Accept", "application/json");
             httpPost.setHeader("Content-type", "application/json");
             HttpResponse responseCommit = httpClient.execute(httpPost);
 
             LOG.debug("<<<< applyStartupConfig : Response status code commit : {}",
                     responseCommit.getStatusLine().getStatusCode());
             SDNRLOG.debug("applyStartupConfig : Response status code commit : {}",
                     responseCommit.getStatusLine().getStatusCode());
             responseCode = responseCommit.getStatusLine().getStatusCode();
         } catch (Exception e) {
             LOG.error("<<<< commitConfig Error {}", e.getLocalizedMessage());
             SDNRLOG.error(" commitConfig Error {}", e.getLocalizedMessage());
            
         } finally {
             try {
                 // Close the HttpClient
                 httpClient.close();
             } catch (Exception e) {
                 SDNRLOG.error("commitConfig Error {}", e.getLocalizedMessage());
             }
         }
         SDNRLOG.info("OUT commitConfig ()  ");
         return responseCode;
     }
 
     //// lock Device
     private int lockDevice(String nodeId, String dbName) {
          SDNRLOG.info("IN lockDevice ()  ");
         int resposeCode = 0;
         // String nodeId = NId.getValue();
         String username = sdnrUser;// "admin";
         String password = sdnrPasswd;// "admin";
         CredentialsProvider credentialsProvider = new BasicCredentialsProvider();
         credentialsProvider.setCredentials(AuthScope.ANY, new UsernamePasswordCredentials(username, password));
         CloseableHttpClient httpClient = HttpClients.custom().setDefaultCredentialsProvider(credentialsProvider)
                 .build();
 
         try {
             String Lockurl = baseUrl
                     + "/rests/operations/network-topology:network-topology/topology=topology-netconf/node=" + nodeId
                     + "/yang-ext:mount/ietf-netconf:lock";
             LOG.info("<<<< applying Lock : Lockurl : {}", Lockurl);
             SDNRLOG.info("applying Lock : Lockurl : {}", Lockurl);
 
             var target = "{" + '"' + dbName + '"' + ":" + '"'+ dbName +'"'+ "}";
             String jsonPayloadlock = "{\"ietf-netconf:input\":{\"target\":" + target + "}}";
             LOG.info("<<<< applyStartupConfig Lock : jsonPayload : {}", jsonPayloadlock);
             SDNRLOG.debug(" applyStartupConfig Lock : jsonPayload : {}", jsonPayloadlock);
 
           
             HttpPost httpPost = new HttpPost(Lockurl);
             StringEntity entitylock = new StringEntity(jsonPayloadlock);
 
             entitylock.setContentType("application/json");
             httpPost.setEntity(entitylock);
             httpPost.setHeader("Accept", "application/json");
             httpPost.setHeader("Content-type", "application/json");
             HttpResponse responseLock = httpClient.execute(httpPost);
 
             LOG.info("<<<< applyStartupConfig : Response status code Lock : {}",
                     responseLock.getStatusLine().getStatusCode());
             SDNRLOG.debug("applyStartupConfig : Response status code Lock : {}",
                     responseLock.getStatusLine().getStatusCode());
             resposeCode = responseLock.getStatusLine().getStatusCode();
 
         } catch (Exception e) {
             LOG.error("<<<< Lock device Error {}", e.getLocalizedMessage());
             SDNRLOG.error("Lock device Error {}", e.getLocalizedMessage());
         } finally {
             try {
                 // Close the HttpClient
                 httpClient.close();
             } catch (Exception e) {
                 LOG.error("<<<< Lock device Error Error {}", e.getLocalizedMessage());
                 SDNRLOG.error("Lock device Error Error {}", e.getLocalizedMessage());
             }
         }
         SDNRLOG.info("OUT lockDevice ()  ");
         return resposeCode;
     }
 
     //// unlock Device
     private void unLockDevice(String nodeId, String dbName) {
          SDNRLOG.info("IN unLockDevice ()  ");
         String username = sdnrUser;// "admin";
         String password = sdnrPasswd;// "admin";
         CredentialsProvider credentialsProvider = new BasicCredentialsProvider();
         credentialsProvider.setCredentials(AuthScope.ANY, new UsernamePasswordCredentials(username, password));
         CloseableHttpClient httpClient = HttpClients.custom().setDefaultCredentialsProvider(credentialsProvider)
                 .build();
 
         try {
             String unLockurl = baseUrl
                     + "/rests/operations/network-topology:network-topology/topology=topology-netconf/node=" + nodeId
                     + "/yang-ext:mount/ietf-netconf:unlock";
             LOG.info("<<<< applying unLock : unLockurl : {}", unLockurl);
             SDNRLOG.debug("applying unLock : unLockurl : {}", unLockurl);
            // var target = "{\\" + dbName + "\\:\\" + dbName + "\\}";
            var target = "{" + '"' + dbName + '"' + ":" + '"'+ dbName +'"'+ "}";
             // String jsonPayloadUnlock =
             // "{\"ietf-netconf:input\":{\"target\":{\"candidate\":\"candidate\"}}}";
             String jsonPayloadUnlock = "{\"ietf-netconf:input\":{\"target\":" + target + "}}";
             LOG.info("<<<< applyStartupConfig unlock: jsonPayload : {}", jsonPayloadUnlock);
             SDNRLOG.debug("applyStartupConfig unlock: jsonPayload : {}", jsonPayloadUnlock);
 
             HttpPost httpPost = new HttpPost(unLockurl);
             StringEntity entityunlock = new StringEntity(jsonPayloadUnlock);
 
             entityunlock.setContentType("application/json");
             httpPost.setEntity(entityunlock);
             httpPost.setHeader("Accept", "application/json");
             httpPost.setHeader("Content-type", "application/json");
             HttpResponse responseunLock = httpClient.execute(httpPost);
 
             LOG.debug("<<<< applyStartupConfig : Response status code unLock : {}",
                     responseunLock.getStatusLine().getStatusCode());
             SDNRLOG.debug("applyStartupConfig : Response status code unLock : {}",
                     responseunLock.getStatusLine().getStatusCode());
         } catch (Exception e) {
             LOG.error("<<<< unLockDevice Error {}", e.getLocalizedMessage());
             SDNRLOG.error("unLockDevice Error {}", e.getLocalizedMessage());
         } finally {
             try {
                 // Close the HttpClient
                 httpClient.close();
             } catch (Exception e) {
                 LOG.error("<<<< unLockDevice Error {}", e.getLocalizedMessage());
                 SDNRLOG.error("unLockDevice Error {}", e.getLocalizedMessage());
             }
         }
         SDNRLOG.info("OUT UnlockDevice ()  ");
     }
 
 
 
 }
 
