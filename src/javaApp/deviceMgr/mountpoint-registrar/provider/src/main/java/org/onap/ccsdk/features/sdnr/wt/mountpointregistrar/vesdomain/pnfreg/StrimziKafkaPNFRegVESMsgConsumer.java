/*
 * ============LICENSE_START========================================================================
 * ONAP : ccsdk feature sdnr wt mountpoint-registrar
 * =================================================================================================
* Copyright (C) 2024 RideNext Software Solutions. Pvt Ltd.  All rights reserved
* =================================================================================================
 * Copyright (C) 2019 highstreet technologies GmbH Intellectual Property. All rights reserved.
 * Copyright (C) 2021 Samsung Electronics Intellectual Property. All rights reserved.
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

package org.onap.ccsdk.features.sdnr.wt.mountpointregistrar.vesdomain.pnfreg;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.Map;
import org.eclipse.jdt.annotation.Nullable;
import org.onap.ccsdk.features.sdnr.wt.mountpointregistrar.config.GeneralConfig;
import org.onap.ccsdk.features.sdnr.wt.mountpointregistrar.impl.StrimziKafkaVESMsgConsumerImpl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.*;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.Properties;

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
import org.apache.http.util.EntityUtils;

public class StrimziKafkaPNFRegVESMsgConsumer extends StrimziKafkaVESMsgConsumerImpl {

    private static final Logger LOG = LoggerFactory.getLogger(StrimziKafkaPNFRegVESMsgConsumer.class);
    private static final String DEFAULT_PROTOCOL = "SSH";
    private static final String DEFAULT_PORT = "17830";
    private static final String DEFAULT_USERNAME = "netconf";
    private static final String DEFAULT_PASSWORD = "netconf";
    String  proxyApiUrl = "http://sdnc-web:3005/proxyapi";

    public StrimziKafkaPNFRegVESMsgConsumer(GeneralConfig generalConfig) {
        super(generalConfig);
    }

     private boolean  isNodeWhiteListed(String  reportingEntityName) {

            /**
             * RNext
             * Starting of PNF ID Verification from registered devices
             */

            LOG.info( "RN_EMS:SDNC-WEB VES PNF Registration message Recived From::: [{}]", reportingEntityName.toString());
	    String url = proxyApiUrl+"/isNodeWhitelisted/"+reportingEntityName;
            LOG.info( "VES PNF Elastic REQ URL: {}", url);
	    HttpGet httpGet= new HttpGet(url);
            HttpResponse httpResponse;

            StringBuffer response = new StringBuffer();
	    try {
	           httpGet.setHeader("Accept", "application/json");
                   httpGet.setHeader("Content-type", "application/json");
                   CloseableHttpClient httpClient = HttpClients.createDefault();
		   
		    // Execute the GET request
                   httpResponse = httpClient.execute(httpGet);
                   LOG.info( "URL: HTTP RESPONSE {}", httpResponse.getStatusLine().getReasonPhrase());
                   LOG.info( "URL: HTTP RESPONSE {}", httpResponse.getStatusLine().getStatusCode());
                   String responseString = EntityUtils.toString(httpResponse.getEntity());
		   //responseString.replace("\"","");
		   responseString.trim();
		   //reportingEntityName.replace("\"","");
		   reportingEntityName.trim();
		   String tmpStr = "\""+reportingEntityName+"\"";

                   LOG.info("Response string [{}]  ReportingEntity Name [{}]  tmpStr[{}]", responseString,reportingEntityName,tmpStr);
                   LOG.info("httpResponse === {}", httpResponse);
		   // Get the response string
		   boolean res = true;
		   int rescode = httpResponse.getStatusLine().getStatusCode();
                   if(responseString.equalsIgnoreCase(tmpStr) ){
                      LOG.info("::::: Reporting  STRING ID  {}  IS white listed:: ", tmpStr );
                        return true;
		    }
                   //if(responseString.equalsIgnoreCase (reportingEntityName.toString())){
		   else if(responseString.toString().equalsIgnoreCase(reportingEntityName.toString()) ){
                      LOG.info("***** : Reporting ID  {}  IS white listed:: ", reportingEntityName );
                      return true;
                   }
                   else{
		        if ( responseString == "null") {
                            LOG.info("***** :  reportingEntityName {}  HTTPResp {} Not  White listed ", reportingEntityName, responseString );
		           }
		         else{
                            LOG.info("* ::: Unable to Found whitelist query {} Http Resp {} ",reportingEntityName,responseString);
                            LOG.info("* :::: HTTP RESP:GET {} ",responseString);
		         }
		      return false;
		   }

	    }
	    catch (Exception e) {
               LOG.error(" Failed to Get the Pre-Provider list {} ", e.getLocalizedMessage());
	       return false;
            } 

            /*
             * End of PNF ID - Verification
             */

    }


    @Override
    public void processMsg(String msg) {
        LOG.debug("Message from Kafka topic is - {} ", msg);
        String pnfId;
        String softWareVersion;
        String serialNumber;
        String pnfIPAddress;
        String vendorDetails;
        String modelNumber;
        @Nullable
        String pnfCommProtocol;
        @Nullable
        String pnfCommPort;
        @Nullable
        String pnfKeyId = null;
        @Nullable
        String pnfUsername;
        @Nullable
        String pnfPasswd = null;
        String reportingEntityName;
        ObjectMapper oMapper = new ObjectMapper();
        JsonNode sKafkaMessageRootNode;
        try {
            sKafkaMessageRootNode = oMapper.readTree(msg);
            reportingEntityName = sKafkaMessageRootNode.at("/event/commonEventHeader/reportingEntityName").textValue();
           // if (reportingEntityName.equals("ONAP SDN-R")) {
            //    LOG.info(
              //          "VES PNF Registration message generated by SDNR, hence no need to process any further; Ignoring the received message");
               // return;
            //}
            
            if ((reportingEntityName.equals("ONAP SDN-R")) ||(!isNodeWhiteListed(reportingEntityName))) {
              if(!reportingEntityName.equals("ONAP SDN-R")){
		   LOG.info( "VES White List Not Found; Hence Return: {}",reportingEntityName);
                   return;
	      }
             }
            LOG.info( " Reporting Entity Name {}  Proceed For Registration",reportingEntityName);

            pnfId = sKafkaMessageRootNode.at("/event/commonEventHeader/sourceName").textValue();
            softWareVersion = sKafkaMessageRootNode.at("/event/pnfRegistrationFields/softwareVersion").textValue();
            serialNumber = sKafkaMessageRootNode.at("/event/pnfRegistrationFields/serialNumber").textValue();
            vendorDetails = sKafkaMessageRootNode.at("/event/pnfRegistrationFields/vendorName").textValue();
            modelNumber = sKafkaMessageRootNode.at("/event/pnfRegistrationFields/modelNumber").textValue();
            pnfIPAddress = getPNFIPAddress(sKafkaMessageRootNode);
            pnfCommProtocol =
                    sKafkaMessageRootNode.at("/event/pnfRegistrationFields/additionalFields/protocol").textValue();
            pnfCommPort = sKafkaMessageRootNode.at("/event/pnfRegistrationFields/additionalFields/oamPort").textValue();
            if (reportingEntityName.equals("ONAP SDN-R")) {
                updateDeviceDetailsToPreProvider( pnfId,  softWareVersion, serialNumber,vendorDetails, modelNumber);
                LOG.info(
                        "VES PNF Registration message generated by SDNR, hence no need to process any further; Ignoring the received message");
                return;
            }
            if (pnfCommProtocol != null) {
                if (pnfCommProtocol.equalsIgnoreCase("TLS")) {
                    // Read username and keyId
                    pnfKeyId =
                            sKafkaMessageRootNode.at("/event/pnfRegistrationFields/additionalFields/keyId").textValue();
                    pnfUsername = sKafkaMessageRootNode.at("/event/pnfRegistrationFields/additionalFields/username")
                            .textValue();
                } else if (pnfCommProtocol.equalsIgnoreCase("SSH")) {
                    // Read username and password
                    pnfUsername = sKafkaMessageRootNode.at("/event/pnfRegistrationFields/additionalFields/username")
                            .textValue();
                    pnfPasswd = sKafkaMessageRootNode.at("/event/pnfRegistrationFields/additionalFields/password")
                            .textValue();
                } else {
                    // log warning - Unknown protocol
                    LOG.warn("Only SSH and TLS protocols supported. Protocol specified in VES message is - {}",
                            pnfCommProtocol, ". Defaulting to SSH");
                    pnfCommProtocol = DEFAULT_PROTOCOL;
                    pnfCommPort = DEFAULT_PORT;
                    pnfUsername = DEFAULT_USERNAME;
                    pnfPasswd = DEFAULT_PASSWORD;
                }
            } else {
                LOG.warn("Protocol not specified in VES message, Defaulting to SSH");
                pnfCommProtocol = DEFAULT_PROTOCOL;
                pnfCommPort = DEFAULT_PORT;
                pnfUsername = DEFAULT_USERNAME;
                pnfPasswd = DEFAULT_PASSWORD;
            }
            LOG.debug(
                    "PNF Fields - ID - {} : IP Address - {} : Protocol - {} : TLS Key ID - {} : User - {} : Port - {}",
                    pnfId, pnfIPAddress, pnfCommProtocol, pnfKeyId, pnfUsername, pnfCommPort);

            String baseUrl = getBaseUrl();
            String sdnrUser = getSDNRUser();
            String sdnrPasswd = getSDNRPasswd();

            if (hasNullInRequiredField(pnfId, pnfIPAddress, pnfCommPort, pnfCommProtocol, pnfUsername)) {
                LOG.warn("One of the mandatory fields has a null value - pnfId = {} : pnfIPAddress = {} : " +
                         "pnfCommProtocol = {} : pnfUsername {} : pnfCommPort {} - not invoking mountpoint creation",
                          pnfId, pnfIPAddress, pnfCommProtocol, pnfUsername, pnfCommPort);
                return;
            }


            Map<String, String> payloadMap = PNFMountPointClient.createPNFNotificationPayloadMap(pnfId, pnfIPAddress,
                    pnfCommPort, pnfCommProtocol, pnfUsername, pnfPasswd, pnfKeyId);

            PNFMountPointClient mountPointClient = new PNFMountPointClient(baseUrl);
            LOG.debug("Setting RESTConf Authorization values - {} : {}", sdnrUser, sdnrPasswd);
            mountPointClient.setAuthorization(sdnrUser, sdnrPasswd);
            String message = mountPointClient.prepareMessageFromPayloadMap(payloadMap);
            boolean status= mountPointClient.sendNotification(message);
            updateDeviceDetailsToPreProvider( pnfId,  softWareVersion, serialNumber,vendorDetails, modelNumber);

        } catch (IOException e) {
            LOG.info("Cannot parse json object, ignoring the received PNF Registration VES Message. Reason: {}",
                    e.getMessage());
        }
    }

     private void updateDeviceDetailsToPreProvider(String  nodeId, String softwareVer,String SerialNum,String vendorDetails, String modelNumber) { 
         String nID = nodeId;
         String softwareVersion = softwareVer;
         String serialNumber = SerialNum;
         String  proxyApiUrl = "http://sdnc-web:3005";
         // Define the REST endpoint URL
         String url = proxyApiUrl+"/proxyapi/updateDeviceDetailsToPreProvider/";
         // Create an HttpPost object
         HttpPost httpPost= new HttpPost(url);
         CloseableHttpClient httpClient = HttpClients.createDefault();
         HttpResponse httpResponse;
         try {
             // Set the JSON payload
             httpPost.setHeader("Accept", "application/json");
             httpPost.setHeader("Content-type", "application/json");
 
             String jsonPayload = "{\"softwareVersion\":\""+softwareVersion+"\",\"serialNumber\":"+"\""+serialNumber+"\",\"vendorDetails\":\""+vendorDetails+"\",\"modelNumber\":\""+modelNumber+"\",\"nodeId\":"+"\""+nID+"\"}";
             LOG.info("<<<< setStartupConfigStatus : jsonPayload : {}", jsonPayload);
             StringEntity entity = new StringEntity(jsonPayload);
             
             entity.setContentType("application/json");
             httpPost.setEntity(entity);
 
             // Execute the POST request
             httpResponse = httpClient.execute(httpPost);
              
             LOG.info("<<<< updateDeviceDetailsToPreProvider : Response status code : {}", httpResponse.getStatusLine().getStatusCode());
            
         } catch (Exception e) {
             LOG.error("<<<< updateDeviceDetailsToPreProvider Error {}", e.getLocalizedMessage());
         } finally {
             try {
                 // Close the HttpClient
                 httpClient.close();
             } catch (Exception e) {
                 LOG.error("<<<< updateDeviceDetailsToPreProvider Error {}", e.getLocalizedMessage());
             }
         }
 
     }
 

    private boolean hasNullInRequiredField(String pnfId, String pnfIPAddress, String pnfCommPort,
                                           String pnfCommProtocol, String pnfUsername) {

        return pnfId == null || pnfIPAddress == null || pnfCommProtocol == null ||
                pnfCommPort == null || pnfUsername == null;
    }

    private String getPNFIPAddress(JsonNode sKafkaMessageRootNode) {
        String ipAddress = sKafkaMessageRootNode.at("/event/pnfRegistrationFields/oamV6IpAddress").textValue();
        if (ipAddress != null && ipAddress != "")
            return ipAddress;

        ipAddress = sKafkaMessageRootNode.at("/event/pnfRegistrationFields/oamV4IpAddress").textValue();
        if (ipAddress != null && ipAddress != "")
            return ipAddress;

        return null;
    }

}
