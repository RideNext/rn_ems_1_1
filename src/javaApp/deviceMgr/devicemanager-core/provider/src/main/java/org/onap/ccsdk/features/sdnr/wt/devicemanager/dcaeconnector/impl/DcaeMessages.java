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
/**
        ecompProvider.sendProblemNotification(ownKeyName, notificationXml);
 * ECOMP Messages are generated an send to destination
 *
 * @author herbert
 */
package org.onap.ccsdk.features.sdnr.wt.devicemanager.dcaeconnector.impl;

import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLConnection;
import java.util.Optional;
import javax.net.ssl.HostnameVerifier;
import javax.net.ssl.HttpsURLConnection;
import javax.net.ssl.SSLContext;
import org.eclipse.jdt.annotation.Nullable;
import org.onap.ccsdk.features.sdnr.wt.dataprovider.model.NetconfTimeStamp;
import org.onap.ccsdk.features.sdnr.wt.dataprovider.model.types.NetconfTimeStampImpl;
import org.onap.ccsdk.features.sdnr.wt.devicemanager.impl.DeviceManagerImpl;
import org.onap.ccsdk.features.sdnr.wt.devicemanager.impl.util.InternalSeverity;
import org.onap.ccsdk.features.sdnr.wt.devicemanager.impl.xml.ProblemNotificationXml;
import org.onap.ccsdk.features.sdnr.wt.devicemanager.ne.service.InventoryProvider;
import org.onap.ccsdk.features.sdnr.wt.devicemanager.ne.service.NetworkElement;
import org.onap.ccsdk.features.sdnr.wt.devicemanager.types.InventoryInformationDcae;
import org.opendaylight.yang.gen.v1.urn.tbd.params.xml.ns.yang.network.topology.rev131021.NodeId;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class DcaeMessages {

    private static final Logger LOG = LoggerFactory.getLogger(DcaeSenderImpl.class);

    private static final String DCAE_NORMAL = "NORMAL";
    private static final String DCAE_MINOR = "MINOR";
    private static final String DCAE_WARNING = "WARNING";
    private static final String DCAE_CRITICAL = "CRITICAL";
    private static final String DCAE_MAJOR = "MAJOR";

    private static final String eventNamePrefix = "fault_Microwave_Radio_Alarms";
    private static final String eventType = "Microwave_Radio_Alarms";
    private static final String eventSourceType = "Microwave_Radio";

    private static final String charset = "UTF-8";

    private static final HostnameVerifier allHostsValid = (hostname, session) -> true;

    private static final String CONTENT_TYPE_APPJSON = "application/json";

    private static final NetconfTimeStamp NETCONFTIME_CONVERTER = NetconfTimeStampImpl.getConverter();

    //Configurable parameters
    private final DcaeSender dcaeSender;
    private final int heartbeatIntervallSeconds;
    private final String entityName;
    private final DeviceManagerImpl deviceManager;

    //Variables
    private int heartbeatsequence = 0;

    public DcaeMessages(DcaeSender ecompSender, String entityName, Integer heartbeatIntervallSeconds,
            DeviceManagerImpl deviceManager) {
        this.dcaeSender = ecompSender;
        this.entityName = entityName;
        this.deviceManager = deviceManager;
        this.heartbeatIntervallSeconds = heartbeatIntervallSeconds;
    }

    /**
     * Create a heartbeat message.
     *
     * @return Result string with answer from server
     */
    public String postHeartBeat() {
        String epochTimeMicrosecondsString = getEpochTimeMicroseconds();
        String body = assembleHeartbeatFromTemplate(null, epochTimeMicrosecondsString, heartbeatsequence++,
                NETCONFTIME_CONVERTER.getTimeStampAsNetconfString()).toString();
        return dcaeSender.sendDcaePost(body);
    }

    /**
     * ONF 1.2 Problem Notification
     *
     * @param mountPointName self-explaining
     * @param notification Notification input
     * @return String with answer
     */

    public String postNotification(NodeId nodeId, ProblemNotificationXml notification) {

        String problemName = notification.getProblem();
        String sequence = notification.getCounter();
        String objId = notification.getObjectId();
        String severity = convert(notification.getSeverity());
        String timeStamp = convert(notification.getTimeStamp());

        String body = assembleEventNotificationFromTemplate(null, timeStamp, sequence, nodeId, objId,
                problemName, severity, notification.getTimeStamp()).toString();

        return dcaeSender.sendDcaePost(body);
    }

    /**
     * Setup a connection to URL with authorisation header
     *
     * @param url e.g. "https://plan.fritz.box:9092/ux/#" or "
     * @param basicAuth authorisation header like "Basic SGVyYmVydDpIZXJiZXJ0"
     * @param insertContentHeader
     * @return Null in case of error or the URLConnection
     * @throws IOException
     * @throws MalformedURLException
     */
    static @Nullable HttpURLConnection openConnection(URL url, String basicAuth, boolean insertContentHeader,
            @Nullable SSLContext sc) throws MalformedURLException, IOException {

        //Prepare the connection
        HttpURLConnection newHttpConnection = null;
        {
            URLConnection newConnection = url.openConnection();
            if (newConnection instanceof HttpURLConnection) {
                LOG.debug("Setup connection to {} ", url.toString());

                newHttpConnection = (HttpURLConnection) newConnection;

                newHttpConnection.setDoOutput(true); // Triggers POST.
                newHttpConnection.setRequestProperty("Accept-Charset", charset);
                if (basicAuth != null) {
                    newHttpConnection.setRequestProperty("Authorization", basicAuth);
                }
                if (insertContentHeader) {
                    newHttpConnection.setRequestProperty("Content-Type", CONTENT_TYPE_APPJSON);
                }

                if (newHttpConnection instanceof HttpsURLConnection) {
                    LOG.debug("SSL connection setup with trust all.");
                    HttpsURLConnection newHttpsConnection = (HttpsURLConnection) newHttpConnection;
                    if (sc != null) {
                        newHttpsConnection.setSSLSocketFactory(sc.getSocketFactory());
                    } else {
                        LOG.warn("No SSL Contect available");
                    }
                    newHttpsConnection.setHostnameVerifier(allHostsValid);
                }
            } else {
                LOG.warn("URL not a HTTP protocol: {}", url);
            }
        }
        return newHttpConnection;
    }

    /* -----------------
     * Private function for message creation and with templates
     */

    /**
     * Get actual microseconds
     *
     * @return String
     */
    private String getEpochTimeMicroseconds() {
        long microseconds = System.nanoTime() / 1000;
        return String.valueOf(microseconds);
    }

    /**
     * Assemble heartbeat message
     *
     * @param sb StringBuffer to be used or null to allocate
     * @param epochTimeMicrosecondsString Text with time stamp
     * @param sequence integer sequence number
     * @param eventTimeValueNetconfFormatString like this: 2018-05-14T05:32:17.292Z
     * @return StringBuffer with result
     */
    private StringBuffer assembleHeartbeatFromTemplate(StringBuffer sb, String epochTimeMicrosecondsString,
            int sequence, String eventTimeValueNetconfFormatString) {

        if (sb == null) {
            sb = new StringBuffer();
        }
        // @formatter:off
        sb.append("{\n"
                + "    \"event\": {\n"
                + "        \"commonEventHeader\": {\n"
                + "            \"domain\": \"heartbeat\",\n"
                + "            \"eventId\": \"testpattern-ab305d54-85b4-a31b-7db2-fb6b9e546015\",\n"
                + "            \"eventName\": \"heartbeat_Controller\",\n"
                + "            \"eventType\": \"Controller\",\n"
                + "            \"priority\": \"Low\",\n"
                + "            \"reportingEntityId\": \"\",\n"
                + "            \"reportingEntityName\": \"" + entityName + "\",\n"
                + "            \"sequence\": " + String.valueOf(sequence) + ",\n"
                + "            \"sourceId\": \"\",\n"
                + "            \"sourceName\": \"" + entityName + "\",\n"
                + "            \"startEpochMicrosec\": " + epochTimeMicrosecondsString + ",\n"
                + "            \"lastEpochMicrosec\": " + epochTimeMicrosecondsString + ",\n"
                + "            \"version\": 3.0\n"
                + "        },\n"
                + "        \"heartbeatFields\": {\n"
                + "            \"additionalFields\": [\n"
                + "                 {\n"
                + "                   \"name\": \"eventTime\",\n"
                + "                   \"value\": \"" + eventTimeValueNetconfFormatString + "\"\n"
                + "                 }\n"
                + "            ],\n"
                + "            \"heartbeatFieldsVersion\": 1.0,\n"
                + "            \"heartbeatInterval\": " + heartbeatIntervallSeconds + "\n"
                + "        }\n"
                + "    }\n"
                + "}\n");
        // @formatter:on

        return sb;
    }

    /**
     * Assemble notification message
     *
     * @param sb StringBuffer to be used or null to allocate
     * @param epochTimeMicrosecondsString Text with time stamp
     * @param sequence integer sequence number
     * @param mountpointName
     * @param objId
     * @param problemName
     * @param severity
     * @return StringBuffer with result
     */

    private StringBuffer assembleEventNotificationFromTemplate(StringBuffer sb, String epochTimeMicrosecondsString,
            String sequence, NodeId nodeId, String objId, String problemName, String severity,
            String eventTimeValueNetconfFormatString) {

        if (sb == null) {
            sb = new StringBuffer();
        }

        NetworkElement optionalNe =
                deviceManager != null ? deviceManager.getConnectedNeByMountpoint(nodeId.getValue()) : null;
        InventoryInformationDcae neInventory = InventoryInformationDcae.getDefault();
        if (optionalNe != null) {
            Optional<InventoryProvider> inventoryProvider = optionalNe.getService(InventoryProvider.class);
            if (inventoryProvider.isPresent()) {
                neInventory = inventoryProvider.get().getInventoryInformation();
            }
        }

        // @formatter:off
        sb.append("{\n"
                + "    \"event\": {\n"
                + "        \"commonEventHeader\": {\n"
                + "            \"domain\": \"fault\",\n"
                + "            \"eventId\": \"" + nodeId.getValue() + "_" + objId + "_" + problemName + "\",\n"
                + "            \"eventName\": \"" + eventNamePrefix + "_" + problemName + "\",\n"
                + "            \"eventType\": \"" + eventType + "\",\n"
                + "            \"sequence\": " + sequence + ",\n"
                + "            \"priority\": \"High\",\n"
                + "            \"reportingEntityId\": \"\",\n"
                + "            \"reportingEntityName\": \"" + entityName + "\",\n"
                + "            \"sourceId\": \"\",\n"
                + "            \"sourceName\": \"" + nodeId.getValue() + "\",\n"
                + "            \"startEpochMicrosec\": " + epochTimeMicrosecondsString + ",\n"
                + "            \"lastEpochMicrosec\": " + epochTimeMicrosecondsString + ",\n"
                + "            \"version\": 3.0\n"
                + "        },\n"
                + "        \"faultFields\": {\n"
                + "            \"alarmAdditionalInformation\": [\n"
                + "                 {\n"
                + "                   \"name\": \"eventTime\",\n"
                + "                   \"value\": \"" + eventTimeValueNetconfFormatString + "\"\n"
                + "                 },\n"
                + "                 {\n"
                + "                   \"name\": \"equipType\",\n"
                + "                   \"value\": \"" + neInventory.getType() + "\"\n"
                + "                 },\n"
                + "                 {\n"
                + "                   \"name\": \"vendor\",\n"
                + "                   \"value\": \"" + neInventory.getVendor() + "\"\n"
                + "                 },\n" + "                 {\n"
                + "                   \"name\": \"model\",\n"
                + "                   \"value\": \"" + neInventory.getModel() + "\"\n"
                + "                 }\n"
                + "            ],\n"
                + "            \"faultFieldsVersion\":2.0,\n"
                + "            \"eventSourceType\": \"" + eventSourceType  + "\",\n"
                + "            \"alarmCondition\": \"" + problemName + "\",\n"
                + "            \"alarmInterfaceA\": \"" + objId + "\",\n"
                + "            \"specificProblem\": \"" + problemName + "\",\n"
                + "            \"eventSeverity\": \"" + severity + "\",\n"
                + "            \"vfStatus\": \"Active\"\n"
                + "        }\n"
                + "    }\n"
                + "}\n");
        // @formatter:on

        return sb;
    }

    /* -----------------
     * Convert internal type formats into the Ecomp format
     */

    private String convert(InternalSeverity severity) {
        switch (severity) {
            case NonAlarmed:
                break;
            case Warning:
                return DCAE_WARNING;
            case Minor:
                return DCAE_MINOR;
            case Major:
                return DCAE_MAJOR;
            case Critical:
                return DCAE_CRITICAL;
        }
        return DCAE_NORMAL;
    }


    /**
     * Time has to be converted into milliseconds
     *
     * @param timeAsString time as string
     * @return as string
     */
    private String convert(String timeAsString) {

        long microseconds = -1;
        try {
            microseconds = NETCONFTIME_CONVERTER.getTimeStampFromNetconfAsMilliseconds(timeAsString) * 1000;
        } catch (IllegalArgumentException e) {
            LOG.info("Can not convert timeAsString", e);
        }
        return String.valueOf(microseconds);
    }


}
