/*
 * ============LICENSE_START========================================================================
 * ONAP : ccsdk feature sdnr wt
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

package org.onap.ccsdk.features.sdnr.wt.mountpointregistrar.vesdomain.fault;
import java.time.Instant;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import org.onap.ccsdk.features.sdnr.wt.mountpointregistrar.impl.MessageClient;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import static org.onap.ccsdk.features.sdnr.wt.mountpointregistrar.impl.MessageClient.MessageType.*;
import static org.onap.ccsdk.features.sdnr.wt.mountpointregistrar.impl.MessageClient.SendMethod.*;


public class FaultNotificationClient extends MessageClient {
    private static final Logger LOG = LoggerFactory.getLogger(FaultNotificationClient.class);
    private static final String FAULT_NOTIFICATION_URI = "rests/operations/devicemanager:push-fault-notification";
    public static final String NODE_ID= "@node-id@",Problem= "@problem@",Severity= "@severity",EventId= "@event-id",COUNTER= "@counter@",TIMESTAMP = "@startEpochMicrosec@", EVENT_ID = "@eventId@", OBJECT_ID = "@alarmInterfaceA@", PROBLEM = "@specificProblem@", SEVERITY = "@eventSeverity@", EVENT_NAME = "@eventName@", PRIORITY = "@priority@", SOURCE_ID = "@sourceId@", ENTITY_NAME = "@reportingEntityName@",TIME_ZONE="@timeZoneOffset@", VES_VERSION="@vesEventListenerVersion@",SOURCE_TYPE="@eventSourceType@",VF_STATUS="@vfStatus@",ALARM_CONDITION="@alarmCondition@",LASTEPOCH= "@lastEpochMicrosec@",ALARM_ID="@alarmId@",ALARM_ACTION="@AlarmAction@",SEQUENCE="@sequence@",VERSION="@version@",DOMAIN="@domain@",SOURCE_NAME="@sourceName@",FAULT_VERSION="@faultFieldsVersion@",FORWARDTIME="@forwardingEpochMicrosec@";
    public static final List<String> REQUIRED_FIELDS = List.of(NODE_ID, COUNTER, TIMESTAMP, OBJECT_ID, PROBLEM, SEVERITY, EVENT_ID, EVENT_NAME, PRIORITY, SOURCE_ID, ENTITY_NAME,TIME_ZONE,VES_VERSION,SOURCE_TYPE,VF_STATUS,ALARM_CONDITION,LASTEPOCH,ALARM_ID,ALARM_ACTION,SEQUENCE,VERSION,DOMAIN,SOURCE_NAME,FAULT_VERSION,Problem,Severity,EventId,FORWARDTIME);
 
 private static final String FAULT_PAYLOAD = "{\r\n"
        + "    \"input\": {\r\n"
        + "        \"event\": {\r\n"
        + "            \"commonEventHeader\": {\r\n"
        + "                \"sourceId\": \"" + SOURCE_ID + "\",\r\n"
        + "                \"startEpochMicrosec\": \"" + TIMESTAMP + "\",\r\n"
        + "                \"eventId\": \"" + EVENT_ID + "\",\r\n"
        + "                \"timeZoneOffset\": \"" + TIME_ZONE + "\",\r\n"
        + "                \"internalHeaderFields\": {\r\n"
        + "                    \"collectorTimeStamp\": \"" + ZonedDateTime.now(ZoneId.of("UTC")).format(DateTimeFormatter.ofPattern("EEE, dd MM yyyy HH:mm:ss 'UTC'")) + "\"\r\n"
        + "                },\r\n"
        + "                \"priority\": \"" + PRIORITY + "\",\r\n"
        + "                \"version\": \"" + VERSION + "\",\r\n"
        + "                \"reportingEntityName\": \"" + ENTITY_NAME + "\",\r\n"
        + "                \"sequence\": \"" + SEQUENCE + "\",\r\n"
        + "                \"domain\": \"" + DOMAIN + "\",\r\n"
        + "                \"lastEpochMicrosec\": \"" + LASTEPOCH + "\",\r\n"
        + "                \"eventName\": \"" + EVENT_NAME + "\",\r\n"
        + "                \"vesEventListenerVersion\": \"" + VES_VERSION + "\",\r\n"
        + "                \"sourceName\": \"" + SOURCE_NAME + "\"\r\n"
        + "            },\r\n"
        + "            \"faultFields\": {\r\n"
        + "                \"eventSeverity\": \"" + SEVERITY + "\",\r\n"
        + "                \"alarmCondition\": \"" + ALARM_CONDITION + "\",\r\n"
        + "                \"faultFieldsVersion\": \"" + FAULT_VERSION + "\",\r\n"
        + "                \"specificProblem\": \"" + PROBLEM + "\",\r\n"
        + "                \"alarmInterfaceA\": \"" + OBJECT_ID + "\",\r\n"
        + "                \"alarmAdditionalInformation\": {\r\n"
        + "                    \"alarmId\": \"" + ALARM_ID + "\",\r\n"
        + "                    \"AlarmAction\": \"" + ALARM_ACTION + "\",\r\n"
        + "                    \"forwardingSystemName\": \"" + System.getenv("SYSTEM_NAME") + "\",\r\n"
        + "                    \"forwardingSystemId\": \"" + System.getenv("SYSTEM_ID") + "\",\r\n"
        + "                    \"forwardingEpochMicrosec\": \"" + FORWARDTIME + "\",\r\n"
        + "                    \"id\": \"" + SOURCE_NAME +"_"+EVENT_ID + "\",\r\n"
        + "                    \"counter\": \"" + 1 + "\",\r\n"
        + "                    \"isAlarmAcked\": \"" + false + "\",\r\n"
        + "                    \"alarmComment\": \"\", \r\n"
        + "                    \"ackedBy\": \"\", \r\n"
        + "                    \"ackUpdatedTime\": \"" + 0 + "\" \r\n"
        + "                },\r\n"
        + "                \"eventSourceType\": \"" + SOURCE_TYPE + "\",\r\n"
        + "                \"vfStatus\": \"" + VF_STATUS + "\" \r\n"
        + "            }\r\n"
        + "        }\r\n"
        + "    }\r\n"
        + "}";


 private static final String FAULT_PAYLOAD1 = "{\r\n"
        + "    \"input\": {\r\n"
        + "        \"event\": {\r\n"
        + "            \"commonEventHeader\": {\r\n"
        + "                \"sourceId\": \"" + SOURCE_ID + "\",\r\n"
        + "                \"startEpochMicrosec\": \"" + TIMESTAMP + "\",\r\n"
        + "                \"eventId\": \"" + EVENT_ID + "\",\r\n"
        + "                \"timeZoneOffset\": \"" + TIME_ZONE + "\",\r\n"
        + "                \"internalHeaderFields\": {\r\n"
        + "                    \"collectorTimeStamp\": \"" + ZonedDateTime.now(ZoneId.of("UTC")).format(DateTimeFormatter.ofPattern("EEE, dd MM yyyy HH:mm:ss 'UTC'")) + "\"\r\n"
        + "                },\r\n"
        + "                \"priority\": \"" + PRIORITY + "\",\r\n"
        + "                \"version\": \"" + VERSION + "\",\r\n"
        + "                \"reportingEntityName\": \"" + ENTITY_NAME + "\",\r\n"
        + "                \"sequence\": \"" + SEQUENCE + "\",\r\n"
        + "                \"domain\": \"" + DOMAIN + "\",\r\n"
        + "                \"lastEpochMicrosec\": \"" + LASTEPOCH + "\",\r\n"
        + "                \"eventName\": \"" + EVENT_NAME + "\",\r\n"
        + "                \"vesEventListenerVersion\": \"" + VES_VERSION + "\",\r\n"
        + "                \"sourceName\": \"" + SOURCE_NAME + "\"\r\n"
        + "            },\r\n"
        + "            \"faultFields\": {\r\n"
        + "                \"eventSeverity\": \"" + SEVERITY + "\",\r\n"
        + "                \"alarmCondition\": \"" + ALARM_CONDITION + "\",\r\n"
        + "                \"faultFieldsVersion\": \"" + FAULT_VERSION + "\",\r\n"
        + "                \"specificProblem\": \"" + PROBLEM + "\",\r\n"
        + "                \"alarmInterfaceA\": \"" + OBJECT_ID + "\",\r\n"
        + "                \"alarmAdditionalInformation\": {\r\n"
        + "                    \"alarmId\": \"" + ALARM_ID + "\",\r\n"
        + "                    \"AlarmAction\": \"" + ALARM_ACTION + "\",\r\n"
        + "                    \"forwardingSystemName\": \"" + System.getenv("SYSTEM_NAME") + "\",\r\n"
        + "                    \"forwardingSystemId\": \"" + System.getenv("SYSTEM_ID") + "\",\r\n"
        + "                    \"forwardingEpochMicrosec\": \"" + FORWARDTIME + "\",\r\n"
        + "                    \"id\": \"" + SOURCE_NAME +"_"+EVENT_ID + "\",\r\n"
        + "                    \"counter\": \"" + 1 + "\",\r\n"
        + "                    \"isAlarmAcked\": \"" + false + "\",\r\n"
        + "                    \"alarmComment\": \"\", \r\n"
        + "                    \"deviceCleared\": \"" + true + "\",\r\n"
        + "                    \"clearedBy\": \"\", \r\n"
        + "                    \"ackedBy\": \"\", \r\n"
        + "                    \"ackUpdatedTime\": \"" + 0 + "\" \r\n"
        + "                },\r\n"
        + "                \"eventSourceType\": \"" + SOURCE_TYPE + "\",\r\n"
        + "                \"vfStatus\": \"" + VF_STATUS + "\" \r\n"
        + "            }\r\n"
        + "        }\r\n"
        + "    }\r\n"
        + "}";



    public FaultNotificationClient(String baseUrl) {
        super(baseUrl, FAULT_NOTIFICATION_URI);
    }

    @Override
    public String prepareMessageFromPayloadMap(Map<String, String> notificationPayloadMap) {
        if(notificationPayloadMap.get(ALARM_ACTION).equals("CLEAR")){
        LOG.info("ifentered {}",notificationPayloadMap.get(ALARM_ACTION));
        LOG.info("time {} {} {} {}",System.nanoTime() / 1000,FAULT_PAYLOAD1,FAULT_PAYLOAD,FORWARDTIME);
        return super.prepareMessageFromPayloadMap(notificationPayloadMap, FAULT_PAYLOAD1, REQUIRED_FIELDS);
        }
        else{
        LOG.info("elseentered {}",notificationPayloadMap.get(ALARM_ACTION));
        return super.prepareMessageFromPayloadMap(notificationPayloadMap, FAULT_PAYLOAD, REQUIRED_FIELDS);
        }
    }

    @Override
    public boolean sendNotification(String message) {
        return super.sendNotification(message, POST, json);
    }

    public static Map<String, String> createFaultNotificationPayloadMap(String nodeId, String counter, String timestamp,
                                                                        String objectId, String problem, String severity, String eventId, String eventName, String priority, String sourceId, String entityName,String timeZone,String vesVersion,String sourceType, String vfStatus,String alarmCondition,String lastEpoch,String alarmId,String alarmAction,String sequence,String ver, String domain,String faultver,String forwardtime) {
        HashMap<String, String> map = new HashMap<>();
        map.put(NODE_ID, nodeId);
        map.put(COUNTER, counter);
        map.put(TIMESTAMP, timestamp);
        map.put(OBJECT_ID, objectId);
        map.put(PROBLEM, problem);
        map.put(SEVERITY, severity);
        map.put(EVENT_ID, eventId);
        map.put(EVENT_NAME, eventName);
        map.put(PRIORITY, priority);
        map.put(SOURCE_ID, sourceId);
        map.put(ENTITY_NAME, entityName);
        map.put(TIME_ZONE,timeZone);
        map.put(VES_VERSION,vesVersion);
        map.put(SOURCE_TYPE,sourceType);
        map.put(VF_STATUS,vfStatus);
        map.put(ALARM_CONDITION,alarmCondition);
        map.put(LASTEPOCH,lastEpoch);
        map.put(ALARM_ID,alarmId);
        map.put(ALARM_ACTION,alarmAction);
        map.put(SEQUENCE,sequence);
        map.put(VERSION,ver);
        map.put(DOMAIN,domain);
        map.put(FAULT_VERSION,faultver);
        map.put(SOURCE_NAME,nodeId);
        map.put(Problem,problem);
        map.put(EventId,eventId);
        map.put(Severity,severity);
        map.put(FORWARDTIME,forwardtime);
        return map;
    }
}
