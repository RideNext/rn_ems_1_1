/*
 * ============LICENSE_START========================================================================
 * ONAP : ccsdk feature sdnr wt
 * =================================================================================================
* Copyright (C) 2024 RideNext Software Solutions. Pvt Ltd.  All rights reserved
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
package org.onap.ccsdk.features.sdnr.wt.devicemanager.eventdatahandler;

import org.onap.ccsdk.features.sdnr.wt.mountpointregistrar.vesdomain.HeartBeat.HeartBeatVESMsgConsumer;
import java.net.InetAddress;
import java.time.Instant;
import java.util.Optional;
import java.util.Properties;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;

import org.apache.kafka.clients.producer.KafkaProducer;
import org.apache.kafka.clients.producer.ProducerRecord;
import org.apache.kafka.clients.producer.RecordMetadata;
import org.eclipse.jdt.annotation.NonNull;
import org.onap.ccsdk.features.sdnr.wt.dataprovider.model.DataProvider;
import org.onap.ccsdk.features.sdnr.wt.dataprovider.model.NetconfTimeStamp;
import org.onap.ccsdk.features.sdnr.wt.dataprovider.model.types.NetconfTimeStampImpl;
import org.onap.ccsdk.features.sdnr.wt.devicemanager.dcaeconnector.impl.DcaeForwarderInternal;
import org.onap.ccsdk.features.sdnr.wt.devicemanager.impl.util.InternalDateAndTime;
import org.onap.ccsdk.features.sdnr.wt.devicemanager.impl.util.InternalSeverity;
import org.onap.ccsdk.features.sdnr.wt.devicemanager.impl.util.NetworkElementConnectionEntitiyUtil;
import org.onap.ccsdk.features.sdnr.wt.devicemanager.impl.xml.ProblemNotificationXml;
import org.onap.ccsdk.features.sdnr.wt.devicemanager.impl.xml.WebSocketServiceClientInternal;
import org.onap.ccsdk.features.sdnr.wt.devicemanager.service.EventHandlingService;
import org.opendaylight.mdsal.binding.api.DataBroker;
import org.opendaylight.mdsal.binding.api.ReadTransaction;
import org.opendaylight.mdsal.common.api.LogicalDatastoreType;
import org.opendaylight.yang.gen.v1.urn.ietf.params.xml.ns.yang.ietf.yang.types.rev130715.DateAndTime;
import org.opendaylight.yang.gen.v1.urn.opendaylight.netconf.node.topology.rev150114.NetconfNode;
import org.opendaylight.yang.gen.v1.urn.opendaylight.netconf.node.topology.rev150114.NetconfNodeConnectionStatus.ConnectionStatus;
import org.opendaylight.yang.gen.v1.urn.opendaylight.netconf.node.topology.rev150114.network.topology.topology.topology.types.TopologyNetconf;
import org.opendaylight.yang.gen.v1.urn.opendaylight.params.xml.ns.yang.data.provider.rev201110.ConnectionLogStatus;
import org.opendaylight.yang.gen.v1.urn.opendaylight.params.xml.ns.yang.data.provider.rev201110.Connectionlog;
import org.opendaylight.yang.gen.v1.urn.opendaylight.params.xml.ns.yang.data.provider.rev201110.ConnectionlogBuilder;
import org.opendaylight.yang.gen.v1.urn.opendaylight.params.xml.ns.yang.data.provider.rev201110.EventlogBuilder;
import org.opendaylight.yang.gen.v1.urn.opendaylight.params.xml.ns.yang.data.provider.rev201110.NetworkElementConnectionEntity;
import org.opendaylight.yang.gen.v1.urn.opendaylight.params.xml.ns.yang.data.provider.rev201110.NetworkElementDeviceType;
import org.opendaylight.yang.gen.v1.urn.opendaylight.params.xml.ns.yang.data.provider.rev201110.SourceType;
import org.opendaylight.yang.gen.v1.urn.opendaylight.params.xml.ns.yang.devicemanager.rev190109.AttributeValueChangedNotification;
import org.opendaylight.yang.gen.v1.urn.opendaylight.params.xml.ns.yang.devicemanager.rev190109.AttributeValueChangedNotificationBuilder;
import org.opendaylight.yang.gen.v1.urn.opendaylight.params.xml.ns.yang.devicemanager.rev190109.ObjectCreationNotification;
import org.opendaylight.yang.gen.v1.urn.opendaylight.params.xml.ns.yang.devicemanager.rev190109.ObjectCreationNotificationBuilder;
import org.opendaylight.yang.gen.v1.urn.opendaylight.params.xml.ns.yang.devicemanager.rev190109.ObjectDeletionNotification;
import org.opendaylight.yang.gen.v1.urn.opendaylight.params.xml.ns.yang.devicemanager.rev190109.ObjectDeletionNotificationBuilder;
import org.opendaylight.yang.gen.v1.urn.opendaylight.params.xml.ns.yang.devicemanager.rev190109.ProblemNotification;
import org.opendaylight.yang.gen.v1.urn.opendaylight.params.xml.ns.yang.devicemanager.rev190109.ProblemNotificationBuilder;
import org.opendaylight.yang.gen.v1.urn.tbd.params.xml.ns.yang.network.topology.rev131021.NetworkTopology;
import org.opendaylight.yang.gen.v1.urn.tbd.params.xml.ns.yang.network.topology.rev131021.NodeId;
import org.opendaylight.yang.gen.v1.urn.tbd.params.xml.ns.yang.network.topology.rev131021.TopologyId;
import org.opendaylight.yang.gen.v1.urn.tbd.params.xml.ns.yang.network.topology.rev131021.network.topology.Topology;
import org.opendaylight.yang.gen.v1.urn.tbd.params.xml.ns.yang.network.topology.rev131021.network.topology.TopologyKey;
import org.opendaylight.yang.gen.v1.urn.tbd.params.xml.ns.yang.network.topology.rev131021.network.topology.topology.Node;
import org.opendaylight.yang.gen.v1.urn.tbd.params.xml.ns.yang.network.topology.rev131021.network.topology.topology.NodeKey;
import org.opendaylight.yangtools.yang.binding.InstanceIdentifier;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.net.InetAddress;
import java.net.NetworkInterface;
import org.apache.kafka.clients.admin.AdminClient;
import java.util.concurrent.TimeUnit;
import java.net.InetSocketAddress;
import java.net.Socket;

 import org.apache.http.client.methods.HttpGet;
 import org.apache.http.client.methods.HttpPost;
 import org.apache.http.entity.StringEntity;
 import org.apache.http.impl.client.BasicCredentialsProvider;
 import org.apache.http.impl.client.CloseableHttpClient;
 import org.apache.http.impl.client.HttpClients;
 import java.io.BufferedReader;
 import java.io.File;
 import java.io.FileInputStream;
 import java.io.IOException;
 import java.io.InputStreamReader;
 
 import org.apache.http.HttpEntity;
 import org.apache.http.HttpResponse;
  import org.json.JSONObject;

/**
 * Responsible class for documenting changes in the ODL itself. The occurence of such an event is documented in the
 * database and to clients. Specific example here is the registration or deregistration of a netconf device. This
 * service has an own eventcounter to apply to the ONF Coremodel netconf behaviour.
 *
 * Important: Websocket notification must be the last action.
 *
 * @author herbert
 */

@SuppressWarnings("deprecation")
public class ODLEventListenerHandler implements EventHandlingService, AutoCloseable {

    private static final Logger LOG = LoggerFactory.getLogger(ODLEventListenerHandler.class);
    private static final Logger SDNRLOG = LoggerFactory.getLogger("SDNR");
    private static final NetconfTimeStamp NETCONFTIME_CONVERTER = NetconfTimeStampImpl.getConverter();


    /**
     * if update NE failed delay before retrying to write data into database
     */
    private static final long DBWRITE_RETRY_DELAY_MS = 3000;

    private final String ownKeyName;
    private final WebSocketServiceClientInternal webSocketService;
    private final DataProvider databaseService;
    private final DcaeForwarderInternal aotsDcaeForwarder;
    private final DataBroker dataBroker;
    private final ExecutorService executor = Executors.newFixedThreadPool(5);
    private int eventNumber;
     String proxyApiUrl = "http://sdnc-web:3005";
    private String nmsbaseURL = "localost:8080";
    private String nmsEndpoint = "localost:8080";
    private String nmsUser = "admin";
    private  String nmsPasswd = "admin";
    private  String nodestatuTopic = "nodestatus";
    String deviceType="";
   private KafkaProducer<String, String> producer;
   String nmsKafkaip = "";
     String nmsKafkaport = "";
     private long skippedtime = 0;

    /*---------------------------------------------------------------
     * Construct
     */

    /**
     * Create a Service to document events to clients and within a database
     *
     * @param ownKeyName The name of this service, that is used in the database as identification key.
     * @param webSocketService service to direct messages to clients
     * @param databaseService service to write to the database
     * @param dcaeForwarder to deliver problems to external service
     */
    public ODLEventListenerHandler(String ownKeyName, WebSocketServiceClientInternal webSocketService,
            DataProvider databaseService, DcaeForwarderInternal dcaeForwarder, DataBroker dataBroker) {
        super();

        this.ownKeyName = ownKeyName;
        this.webSocketService = webSocketService;

        this.databaseService = databaseService;
        this.aotsDcaeForwarder = dcaeForwarder;
        this.dataBroker = dataBroker;

        this.eventNumber = 0;
        getNMSendPointConfigs();
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

    /*---------------------------------------------------------------
     * Handling of ODL Controller events
     */

    /**
     * (NonConnected) A registration after creation of a mountpoint occured
     *
     * @param registrationName of device (mountpoint name)
     * @param nNode with mountpoint data
     */

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

    @Override
    public void registration(NodeId nodeId, NetconfNode nNode) {

        LOG.info(" <<<< registration");
        SDNRLOG.info("IN registration() ");
        String deviceType="";
        DateAndTime ts = NETCONFTIME_CONVERTER.getTimeStamp();
        String  devicedetailRes= getDeviceDetailsFromPreProvider(nodeId.getValue()) ;
                 if(devicedetailRes!=null)
                 {
                    try{
                        JSONObject devicedetailjson = new JSONObject(devicedetailRes);
                        deviceType =(String) devicedetailjson.get("DeviceType");
                        LOG.info(">>>>> deviceType {} ",deviceType);
                    }
                    catch(Exception e){

                    }
                 }
        ObjectCreationNotification notification = new ObjectCreationNotificationBuilder().setDeviceType(deviceType)
                .setObjectIdRef(nodeId.getValue()).setCounter(popEvntNumber()).setTimeStamp( Instant.parse(new DateAndTime(ts).getValue()).toEpochMilli()*1000).build();
        Connectionlog log = new ConnectionlogBuilder().setNodeId(nodeId.getValue())
                .setStatus(ConnectionLogStatus.Mounted).setTimestamp(Instant.parse(new DateAndTime(ts).getValue()).toEpochMilli()*1000).build();

        NetworkElementConnectionEntity e = NetworkElementConnectionEntitiyUtil.getNetworkConnection(nodeId.getValue(),
                nNode, getNnodeConfig(nodeId),deviceType);
                
        LOG.debug("<<<< registration networkelement-connection for {} with status {}", nodeId.getValue(), e.getStatus());
        SDNRLOG.debug("registration networkelement-connection for {} with status {}", nodeId.getValue(), e.getStatus());
       
        long epochMicros = Instant.now().toEpochMilli() * 1000 + (System.nanoTime() % 1000000) / 1000;
        String Message="";
        if(e.getStatus().getName() !="UnableToConnect")
        {
            String jsonPayload= CreatJosonPayLoad(nodeId.getValue().toString(),e.getStatus().getName(),Message);
            SDNRLOG.debug(" In registration  jsonPayload With Status {}", jsonPayload);
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
                
            }else{
                SendMessageToNMS(jsonPayload);
            }
            }
        }
        
       // Write first to prevent missing entries
        databaseService.updateNetworkConnection22(e, nodeId.getValue());
        databaseService.writeConnectionLog(log);
        webSocketService.sendViaWebsockets(new NodeId(ownKeyName), notification, ObjectCreationNotification.QNAME,
                 Instant.parse(new DateAndTime(NETCONFTIME_CONVERTER.getTimeStamp()).getValue()).toEpochMilli()*1000);
        HeartBeatVESMsgConsumer.removeDeviceFromTracker(nodeId.getValue());
        SDNRLOG.info("OUT registration() ");
    }

    private Optional<NetconfNode> getNnodeConfig(NodeId nodeId) {
        if (this.dataBroker != null) {

            InstanceIdentifier<NetconfNode> iif = InstanceIdentifier.create(NetworkTopology.class)
                    .child(Topology.class, new TopologyKey(new TopologyId(TopologyNetconf.QNAME.getLocalName())))
                    .child(Node.class, new NodeKey(nodeId)).augmentation(NetconfNode.class);

            //Implicit close of try with resource is not handled correctly by underlying opendaylight NETCONF service
            @NonNull
            ReadTransaction readTransaction = this.dataBroker.newReadOnlyTransaction();
            try {
                return readTransaction.read(LogicalDatastoreType.CONFIGURATION, iif).get();
            } catch (InterruptedException e) {
                LOG.warn("InterruptedException occurred - problem requesting netconfnode again:", e);
                Thread.currentThread().interrupt();
            } catch (ExecutionException e) {
                LOG.warn("ExecutionException occurred - problem requesting netconfnode again:", e);
            }
        }
        return Optional.empty();
    }

    /**
     * (Connected) mountpoint state moves to connected
     *
     * @param mountpointNodeName uuid that is nodeId or mountpointId
     * @param deviceType according to assessement
     */
    @Override
    public void connectIndication(NodeId nNodeId, String deviceType ,String modelNumber,String softwareVersion ,String serialNumber ,String vendorDetails) {
       
        SDNRLOG.info("IN connectIndication() ");
        // Write first to prevent missing entries
        LOG.debug("<<<<  updating networkelement-connection devicetype for {} with {}", nNodeId.getValue(), deviceType);
        SDNRLOG.debug(" updating networkelement-connection devicetype for {} with {}", nNodeId.getValue(), deviceType);
        NetworkElementConnectionEntity e =
                NetworkElementConnectionEntitiyUtil.getNetworkConnectionDeviceDetails(deviceType,modelNumber, softwareVersion, serialNumber, vendorDetails,"None");
        //if updating db entry for ne connection fails retry later on (due elasticsearch max script executions error)
        if (!databaseService.updateNetworkConnectionDeviceType(e, nNodeId.getValue())) {
            this.updateNeConnectionRetryWithDelay(e, nNodeId.getValue());
        }
        DateAndTime ts = NETCONFTIME_CONVERTER.getTimeStamp();
        AttributeValueChangedNotification notification = new AttributeValueChangedNotificationBuilder()
                .setCounter(popEvntNumber()).setTimeStamp( Instant.parse(new DateAndTime(ts).getValue()).toEpochMilli()*1000).setObjectIdRef(nNodeId.getValue())
                .setAttributeName("deviceType").setNewValue(deviceType).build();
        webSocketService.sendViaWebsockets(new NodeId(ownKeyName), notification,
                AttributeValueChangedNotification.QNAME,  Instant.parse(new DateAndTime(ts).getValue()).toEpochMilli()*1000);

        SDNRLOG.info("OUT connectIndication() ");
        // Write first to prevent missing entries
                
    }

    /**
     * (Connected) mountpoint state moves to connected
     *
     * @param mountpointNodeName uuid that is nodeId or mountpointId
     * @param isStartUpdone according to assessement
     */
    @Override
    public void startUpXmlIndication(String NodeId, String isStartUpdone) {

        // Write first to prevent missing entries
        SDNRLOG.info("IN  startUpXmlIndication() ");

        LOG.debug("<<<<  updating networkelement-connection isStartUpdone for {} with {}", NodeId, isStartUpdone);

        SDNRLOG.debug("Updating networkelement-connection isStartUpdone for {} with {}", NodeId, isStartUpdone);
        NetworkElementConnectionEntity e = NetworkElementConnectionEntitiyUtil.startUpXMLStatusUpdate(isStartUpdone);
        this.updateNeConnectionRetryWithDelay(e, NodeId);

        SDNRLOG.info("OUT startUpXmlIndication() ");
    }
    /**
     * (NonConnected) mountpoint state changed.
     *
     * @param mountpointNodeName nodeid
     * @param netconfNode node
     */
    public void onStateChangeIndication(NodeId nodeId, NetconfNode netconfNode) {

        SDNRLOG.info("IN onStateChangeIndication() ");

        LOG.debug("<<<<  mountpoint state changed indication for {}", nodeId.getValue());

        SDNRLOG.debug(" mountpoint state changed indication for {}", nodeId.getValue());
        ConnectionStatus csts = netconfNode.getConnectionStatus();
        this.updateRegistration(nodeId, ConnectionStatus.class.getSimpleName(), csts != null ? csts.getName() : "null",
                netconfNode);
        SDNRLOG.info("OUT onStateChangeIndication() ");
    }

    /**
     * (NonConnected) A deregistration after removal of a mountpoint occured.
     *
     * @param registrationName Name of the event that is used as key in the database.
     */
    @SuppressWarnings("null")
    @Override
    public void deRegistration(NodeId nodeId) {

        LOG.debug("<<<< deRegistration");

        SDNRLOG.info("IN  deRegistration() ");
        DateAndTime ts = NETCONFTIME_CONVERTER.getTimeStamp();
        String deviceType="";
        String  devicedetailRes= getDeviceDetailsFromPreProvider(nodeId.getValue()) ;
                 if(devicedetailRes!=null)
                 {
                    try{
                        JSONObject devicedetailjson = new JSONObject(devicedetailRes);
                     deviceType =(String) devicedetailjson.get("DeviceType");
                     LOG.info(">>>>>>>>>>> deviceType {} ",deviceType);
                    }
                    catch(Exception e){

                    }
                 }
        ObjectDeletionNotification notification = new ObjectDeletionNotificationBuilder().setCounter(popEvntNumber()).setDeviceType(deviceType)
                .setTimeStamp(Instant.parse(new DateAndTime(ts).getValue()).toEpochMilli()*1000).setObjectIdRef(nodeId.getValue()).build();
        Connectionlog log = new ConnectionlogBuilder().setNodeId(nodeId.getValue())
                .setStatus(ConnectionLogStatus.Unmounted).setTimestamp( Instant.parse(new DateAndTime(ts).getValue()).toEpochMilli()*1000).build();

        // Write first to prevent missing entries
        databaseService.removeNetworkConnection(nodeId.getValue());
        databaseService.writeConnectionLog(log);
        webSocketService.sendViaWebsockets(new NodeId(ownKeyName), notification,
                ObjectDeletionNotification.QNAME,  Instant.parse(new DateAndTime(ts).getValue()).toEpochMilli()*1000);
           HeartBeatVESMsgConsumer.removeDeviceFromTracker(nodeId.getValue());
           SDNRLOG.info("OUT deRegistration() ");

    }


/// Set get getNMSendPointConfigs
private void getNMSendPointConfigs() {

    LOG.info("<<<< getMountPointConfigs Started ");
    SDNRLOG.info("IN  getNMSendPointConfigs Method ");
    // String s = System.getProperty("user.dir");
    try {
       
        if(System.getenv("NMS_BASEURL") !=null && System.getenv("NMS_BASEURL")!="")
        {
            nmsbaseURL = System.getenv("NMS_BASEURL");;
        }
        if(System.getenv("NMS_ENDPOINT") !=null && System.getenv("NMS_ENDPOINT")!="")
        {
            nmsEndpoint = System.getenv("NMS_ENDPOINT");;
        }
        if(System.getenv("NMS_USERNAME") !=null && System.getenv("NMS_USERNAME")!="")
        {
            nmsUser = System.getenv("NMS_USERNAME");
        }
        if(System.getenv("NMS_PASSWORD") !=null && System.getenv("NMS_PASSWORD")!="")
        {
            nmsPasswd= System.getenv("NMS_PASSWORD");
        }
        if(System.getenv("NODESTATUS_TOPIC") !=null && System.getenv("NODESTATUS_TOPIC")!="")
        {
            nodestatuTopic= System.getenv("NODESTATUS_TOPIC");
        }

        LOG.info("NMS Configs: nmsBaseURL : {} ,  Enpoint : {} ,nmsUser : {}, nmsPasswd : {}, nmsPasswd : {}",
        nmsbaseURL,nmsEndpoint, nmsUser,nmsPasswd,nodestatuTopic );

        SDNRLOG.info("NMS Configs: nmsBaseURL : {} ,  Enpoint : {} ,nmsUser : {}, nmsPasswd : {}, nmsPasswd : {}",
        nmsbaseURL,nmsEndpoint, nmsUser,nmsPasswd,nodestatuTopic );
        
    } catch (Exception ex) {
        LOG.error("Exception in General Properties read  {} ", ex.getMessage());
        SDNRLOG.error("Exception in General Properties read  {} ", ex.getMessage());
    }
    SDNRLOG.info("OUT getNMSendPointConfigs Method ");

}


 ///  CreatJosonPayLoad
 private String CreatJosonPayLoad(String nodeId,String Status,String Message ) {
   
    SDNRLOG.info("IN CreatJosonPayLoad()  ");
   String jsonPayload= "";
   try {
        
        if(Status=="Connecting")
        {
            Message="Attempting to connect with device.";
        }
        if(Status=="Connected")
        {
            Message="Successfully connected with device.";
        }
       long epochMicros = Instant.now().toEpochMilli() * 1000 + (System.nanoTime() % 1000000) / 1000;
      
       jsonPayload= "{\"sdnrNotification\": { \"nodeId\":"+ '"'+ nodeId + '"'+ ",\"status\":"+'"'+ Status +'"'+ ",\"type\":\"connection-status\" ,\"eventTimeEpochMicrosec\":"+ epochMicros+  ",\"message\":"+ '"'+Message+'"'+ "}}";
    
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
        System.out.println("Kafka broker at " + kafkaIp + ":" + kafkaPort + " is reachable.");
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
  public void shutdown() {
        if (producer != null) {
            producer.close();
            LOG.info("Kafka producer closed.");
        }
    }

 

    /**
     * Mountpoint state changed .. from connected -> connecting or unable-to-connect or vis-e-versa.
     *
     * @param registrationName Name of the event that is used as key in the database.
     */
    @Override
    public void updateRegistration(NodeId nodeId, String attribute, String attributeNewValue, NetconfNode nNode) {
        LOG.debug("<<<< updateRegistration");
   SDNRLOG.info("IN updateRegistration() ");
        DateAndTime ts = NETCONFTIME_CONVERTER.getTimeStamp();
        
        String  devicedetailRes= getDeviceDetailsFromPreProvider(nodeId.getValue()) ;
                 if(devicedetailRes!=null)
                 {
                    try{
                        JSONObject devicedetailjson = new JSONObject(devicedetailRes);
                     deviceType =(String) devicedetailjson.get("DeviceType");
                     LOG.info(">>>>>>>>>>> deviceType {} ",deviceType);
                    }
                    catch(Exception e){

                    }
                 }
        AttributeValueChangedNotification notification = new AttributeValueChangedNotificationBuilder().setDeviceType(deviceType)
                .setCounter(popEvntNumber()).setTimeStamp(Instant.parse(new DateAndTime(ts).getValue()).toEpochMilli()*1000).setObjectIdRef(nodeId.getValue())
                .setAttributeName(attribute).setNewValue(attributeNewValue).build();
        Connectionlog log = new ConnectionlogBuilder().setNodeId(nodeId.getValue())
                .setStatus(getStatus(attributeNewValue)).setTimestamp( Instant.parse(new DateAndTime(ts).getValue()).toEpochMilli()*1000).build();
        NetworkElementConnectionEntity e = NetworkElementConnectionEntitiyUtil.getNetworkConnection(nodeId.getValue(),
                nNode, getNnodeConfig(nodeId),deviceType);

        LOG.debug("<<<< updating networkelement-connection for {} with status {}", nodeId.getValue(), e.getStatus());
        SDNRLOG.debug(" Updating networkelement-connection for {} with status {}", nodeId.getValue(), e.getStatus());
        
        if(e.getStatus().getName() !="UnableToConnect")
        {
             String Message="";
            String jsonPayload= CreatJosonPayLoad(nodeId.getValue(),e.getStatus().getName(),Message);
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
            SDNRLOG.debug("In updateRegistration  jsonPayload With Status {}", jsonPayload);
        }
        
        //if updating db entry for ne connection fails retry later on (due elasticsearch max script executions error)
        if (!databaseService.updateNetworkConnection22(e, nodeId.getValue())) {
            this.updateNeConnectionRetryWithDelay(nNode, nodeId.getValue());
        }
        databaseService.writeConnectionLog(log);
        webSocketService.sendViaWebsockets(new NodeId(ownKeyName), notification,
                AttributeValueChangedNotification.QNAME, Instant.parse(new DateAndTime(ts).getValue()).toEpochMilli()*1000);
                
        SDNRLOG.info("OUT updateRegistration() ");
    }


    private void updateNeConnectionRetryWithDelay(NetconfNode nNode, String registrationName) {
        LOG.debug("try to rewrite networkelement-connection in {} for node {}", DBWRITE_RETRY_DELAY_MS,
                registrationName);
        executor.execute(new DelayedThread(DBWRITE_RETRY_DELAY_MS) {
            @Override
            public void run() {
                super.run();
                databaseService.updateNetworkConnection22(
                        NetworkElementConnectionEntitiyUtil.getNetworkConnection(registrationName, nNode, deviceType),
                        registrationName);
            }
        });
    }

    private void updateNeConnectionRetryWithDelay(NetworkElementConnectionEntity e, String registrationName) {
        LOG.debug("try to rewrite networkelement-connection in {} for node {}", DBWRITE_RETRY_DELAY_MS,
                registrationName);
        executor.execute(new DelayedThread(DBWRITE_RETRY_DELAY_MS) {
            @Override
            public void run() {
                super.run();
                databaseService.updateNetworkConnection22(e, registrationName);
            }
        });
    }

    /**
     * At a mountpoint a problem situation is indicated
     *
     * @param registrationName indicating object within SDN controller, normally the mountpointName
     * @param problemName that changed
     * @param problemSeverity of the problem according to NETCONF/YANG
     */

    public void onProblemNotification(String registrationName, String problemName, InternalSeverity problemSeverity) {
        LOG.debug("Got event of {} {} {}", registrationName, problemName, problemSeverity);
        // notification

        ProblemNotificationXml notificationXml =
                new ProblemNotificationXml(ownKeyName, registrationName, problemName, problemSeverity,
                        // popEvntNumberAsString(), InternalDateAndTime.TESTPATTERN );
                        popEvntNumber(), Instant.parse(new DateAndTime(NETCONFTIME_CONVERTER.getTimeStamp()).getValue()).toEpochMilli()*1000);
        DateAndTime ts = NETCONFTIME_CONVERTER.getTimeStamp();
        ProblemNotification notification =
                new ProblemNotificationBuilder().setObjectIdRef(registrationName).setCounter(popEvntNumber())
                        .setProblem(problemName).setSeverity(InternalSeverity.toYang(problemSeverity)).build();
        databaseService.writeFaultLog(notificationXml.getFaultlog(SourceType.Controller));
        databaseService.updateFaultCurrent(notificationXml.getFaultcurrent());

        aotsDcaeForwarder.sendProblemNotificationUsingMaintenanceFilter(new NodeId(ownKeyName), notificationXml);

        webSocketService.sendViaWebsockets(new NodeId(ownKeyName), notification, ProblemNotification.QNAME, Instant.parse(new DateAndTime(ts).getValue()).toEpochMilli()*1000);
    }

    @Override
    public void writeEventLog(String objectId, String msg, String value) {

        LOG.debug("Got startComplete");
        EventlogBuilder eventlogBuilder = new EventlogBuilder();
        eventlogBuilder.setNodeId(ownKeyName).setTimestamp(Instant.parse(new DateAndTime(NETCONFTIME_CONVERTER.getTimeStamp()).getValue()).toEpochMilli()*1000)
                .setObjectId(objectId).setAttributeName(msg).setNewValue(value).setCounter(popEvntNumber())
                .setSourceType(SourceType.Controller);
        databaseService.writeEventLog(eventlogBuilder.build());

    }

    /*---------------------------------------------
     * Handling of ODL Controller events
     */

    /**
     * Called on exit to remove everything for a node from the current list.
     *
     * @param nodeName to remove all problems for
     * @return Number of deleted objects
     */
    public int removeAllCurrentProblemsOfNode(String nodeName) {
        return databaseService.clearFaultsCurrentOfNodeWithObjectId(ownKeyName, nodeName);
    }

    /*---------------------------------------------------------------
     * Get/Set
     */

    /**
     * @return the ownKeyName
     */
    public String getOwnKeyName() {
        return ownKeyName;
    }

    @Override
    public void close() throws Exception {
        executor.shutdown();
        executor.awaitTermination(DBWRITE_RETRY_DELAY_MS * 3, TimeUnit.SECONDS);
    }

    /*---------------------------------------------------------------
     * Private
     */
    private Integer popEvntNumber() {
        return eventNumber++;
    }

    private static ConnectionLogStatus getStatus(String newValue) {

        if (newValue.equals(ConnectionStatus.Connected.getName())) {
            return ConnectionLogStatus.Connected;

        } else if (newValue.equals(ConnectionStatus.Connecting.getName())) {
            return ConnectionLogStatus.Connecting;

        } else if (newValue.equals(ConnectionStatus.UnableToConnect.getName())) {
            return ConnectionLogStatus.UnableToConnect;

        }
        return ConnectionLogStatus.Undefined;
    }

    private class DelayedThread extends Thread {
        private final long delay;

        public DelayedThread(long delayms) {
            this.delay = delayms;
        }

        @Override
        public void run() {
            try {
                Thread.sleep(this.delay);
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        }
    }
}
