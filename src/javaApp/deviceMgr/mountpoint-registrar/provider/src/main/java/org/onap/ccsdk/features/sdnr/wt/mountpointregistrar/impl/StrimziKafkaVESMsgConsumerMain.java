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

package org.onap.ccsdk.features.sdnr.wt.mountpointregistrar.impl;

import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Properties;
import org.onap.ccsdk.features.sdnr.wt.mountpointregistrar.config.FaultConfig;
import org.onap.ccsdk.features.sdnr.wt.mountpointregistrar.config.FileReadyConfig;
import org.onap.ccsdk.features.sdnr.wt.mountpointregistrar.config.StateChangeConfig;
import org.onap.ccsdk.features.sdnr.wt.mountpointregistrar.config.NotificationConfig;
import org.onap.ccsdk.features.sdnr.wt.mountpointregistrar.config.GeneralConfig;
import org.onap.ccsdk.features.sdnr.wt.mountpointregistrar.config.MessageConfig;
import org.onap.ccsdk.features.sdnr.wt.mountpointregistrar.config.PNFRegistrationConfig;
import org.onap.ccsdk.features.sdnr.wt.mountpointregistrar.config.ProvisioningConfig;
import org.onap.ccsdk.features.sdnr.wt.mountpointregistrar.config.StndDefinedFaultConfig;
import org.onap.ccsdk.features.sdnr.wt.mountpointregistrar.config.StrimziKafkaConfig;
import org.onap.ccsdk.features.sdnr.wt.mountpointregistrar.vesdomain.HeartBeat.HeartBeatVESMsgConsumer;
import org.onap.ccsdk.features.sdnr.wt.mountpointregistrar.vesdomain.cm.StrimziKafkaCMVESMsgConsumer;
import org.onap.ccsdk.features.sdnr.wt.mountpointregistrar.vesdomain.fault.StrimziKafkaFaultVESMsgConsumer;
import org.onap.ccsdk.features.sdnr.wt.mountpointregistrar.vesdomain.fileready.FileReadyVESMsgConsumer;
import org.onap.ccsdk.features.sdnr.wt.mountpointregistrar.vesdomain.statechange.StateChangeVESMsgConsumer;
import org.onap.ccsdk.features.sdnr.wt.mountpointregistrar.vesdomain.notification.NotificationVESMsgConsumer;
import org.onap.ccsdk.features.sdnr.wt.mountpointregistrar.vesdomain.pnfreg.StrimziKafkaPNFRegVESMsgConsumer;
import org.onap.ccsdk.features.sdnr.wt.mountpointregistrar.vesdomain.stnddefined.StrimziKafkaStndDefinedFaultVESMsgConsumer;
import org.onap.ccsdk.features.sdnr.wt.mountpointregistrar.config.HeartBeatConfig;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class StrimziKafkaVESMsgConsumerMain implements Runnable {

    private static final Logger LOG = LoggerFactory.getLogger(StrimziKafkaVESMsgConsumerMain.class);
    Properties strimziKafkaProperties = new Properties();
    private static final String _PNFREG_CLASS =
            "org.onap.ccsdk.features.sdnr.wt.mountpointregistrar.impl.DMaaPPNFRegVESMsgConsumer";
    private static final String _FAULT_CLASS =
            "org.onap.ccsdk.features.sdnr.wt.mountpointregistrar.impl.DMaaPFaultVESMsgConsumer";
    private static final String _CM_CLASS =
            "org.onap.ccsdk.features.sdnr.wt.mountpointregistrar.impl.DMaaPCMVESMsgConsumer";
    private static final String _STNDDEFINED_FAULT_CLASS =
            "org.onap.ccsdk.features.sdnr.wt.mountpointregistrar.impl.DMaaPStndDefinedFaultVESMsgConsumer";
    private static final String _FILERADY_CLASS =
            "org.onap.ccsdk.features.sdnr.wt.mountpointregistrar.impl.DMaaPFileReadyVESMsgConsumer";        
    private static final String _STATE_CHANGE_CLASS =
            "org.onap.ccsdk.features.sdnr.wt.mountpointregistrar.impl.DMaaPStateChangeVESMsgConsumer";        
    private static final String _NOTIFICATION_CLASS =
            "org.onap.ccsdk.features.sdnr.wt.mountpointregistrar.impl.DMaaPNotificationVESMsgConsumer"; 
            private static final String _HEARTBEAT_CLASS =
            "org.onap.ccsdk.features.sdnr.wt.mountpointregistrar.impl.DMaaUpdateHeartBeatVESMsgConsumer";               
    private static final String _PNFREG_DOMAIN = "pnfRegistration";
    private static final String _FAULT_DOMAIN = "fault";
    private static final String _CM_DOMAIN = "provisioning";
    private static final String _STNDDEFINED_FAULT_DOMAIN = "stndDefinedFault";
    private static final String _FILE_READY_DOMAIN = "fileready";
    private static final String _STATE_CHANGE_DOMAIN = "stateChange";
    private static final String _HEART_BEAT_DOMAIN = "heartbeat";
    private static final String _NOTIFICATION_DOMAIN = "notification";

    boolean threadsRunning = false;
    List<StrimziKafkaVESMsgConsumer> consumers = new LinkedList<>();
    private PNFRegistrationConfig pnfRegistrationConfig;
    private FaultConfig faultConfig;
    private GeneralConfig generalConfig;
    private ProvisioningConfig provisioningConfig;
    private StndDefinedFaultConfig stndDefinedFaultConfig;
    private StrimziKafkaConfig strimziKafkaConfig;
    private FileReadyConfig fileReadyConfig;
    private StateChangeConfig stateChangeConfig;
    private HeartBeatConfig heartBeatConfig;
    private NotificationConfig notificationConfig;

    public StrimziKafkaVESMsgConsumerMain(Map<String, MessageConfig> configMap, GeneralConfig generalConfig) {
        this.generalConfig = generalConfig;
        configMap.forEach(this::initialize);
    }

    public StrimziKafkaVESMsgConsumerMain(Map<String, MessageConfig> configMap, GeneralConfig generalConfig,
            StrimziKafkaConfig strimziKafkaConfig) {
        this.generalConfig = generalConfig;
        this.strimziKafkaConfig = strimziKafkaConfig;
        configMap.forEach(this::initialize);
    }

    public void initialize(String domain, MessageConfig domainConfig) {
        LOG.debug("In initialize method : Domain = {} and domainConfig = {}", domain, domainConfig);
        String consumerClass;
        Properties consumerProperties = new Properties();
        if (domain.equalsIgnoreCase(_PNFREG_DOMAIN)) {
            this.pnfRegistrationConfig = (PNFRegistrationConfig) domainConfig;
            consumerClass = _PNFREG_CLASS;
            LOG.debug("Consumer class = {}", consumerClass);

            consumerProperties.put(PNFRegistrationConfig.PROPERTY_KEY_CONSUMER_GROUP,
                    pnfRegistrationConfig.getConsumerGroup());
            consumerProperties.put(PNFRegistrationConfig.PROPERTY_KEY_CONSUMER_ID,
                    pnfRegistrationConfig.getConsumerId());
            consumerProperties.put(PNFRegistrationConfig.PROPERTY_KEY_CONSUMER_TOPIC, pnfRegistrationConfig.getTopic());
            consumerProperties.put(PNFRegistrationConfig.PROPERTY_KEY_CONSUMER_TIMEOUT,
                    pnfRegistrationConfig.getTimeout());
            consumerProperties.put(PNFRegistrationConfig.PROPERTY_KEY_CONSUMER_LIMIT, pnfRegistrationConfig.getLimit());
            consumerProperties.put(PNFRegistrationConfig.PROPERTY_KEY_CONSUMER_FETCHPAUSE,
                    pnfRegistrationConfig.getFetchPause());

            threadsRunning =
                    createConsumer(_PNFREG_DOMAIN, consumerProperties, getStrimziKafkaProps(strimziKafkaConfig));
        } else if (domain.equalsIgnoreCase(_FAULT_DOMAIN)) {
            this.faultConfig = (FaultConfig) domainConfig;
            consumerClass = _FAULT_CLASS;
            LOG.debug("Consumer class = {}", consumerClass);
            consumerProperties.put(FaultConfig.PROPERTY_KEY_CONSUMER_GROUP, faultConfig.getConsumerGroup());
            consumerProperties.put(FaultConfig.PROPERTY_KEY_CONSUMER_ID, faultConfig.getConsumerId());
            consumerProperties.put(FaultConfig.PROPERTY_KEY_CONSUMER_TOPIC, faultConfig.getTopic());
            consumerProperties.put(FaultConfig.PROPERTY_KEY_CONSUMER_TIMEOUT, faultConfig.getTimeout());
            consumerProperties.put(FaultConfig.PROPERTY_KEY_CONSUMER_LIMIT, faultConfig.getLimit());
            consumerProperties.put(FaultConfig.PROPERTY_KEY_CONSUMER_FETCHPAUSE, faultConfig.getFetchPause());

            threadsRunning =
                    createConsumer(_FAULT_DOMAIN, consumerProperties, getStrimziKafkaProps(strimziKafkaConfig));
        } else if (domain.equalsIgnoreCase(_CM_DOMAIN)) {
            this.provisioningConfig = (ProvisioningConfig) domainConfig;
            consumerClass = _CM_CLASS;
            LOG.debug("Consumer class = {}", consumerClass);
            consumerProperties.put(ProvisioningConfig.PROPERTY_KEY_CONSUMER_GROUP,
                    provisioningConfig.getConsumerGroup());
            consumerProperties.put(ProvisioningConfig.PROPERTY_KEY_CONSUMER_ID, provisioningConfig.getConsumerId());
            consumerProperties.put(ProvisioningConfig.PROPERTY_KEY_CONSUMER_TOPIC, provisioningConfig.getTopic());
            consumerProperties.put(ProvisioningConfig.PROPERTY_KEY_CONSUMER_TIMEOUT, provisioningConfig.getTimeout());
            consumerProperties.put(ProvisioningConfig.PROPERTY_KEY_CONSUMER_LIMIT, provisioningConfig.getLimit());
            consumerProperties.put(ProvisioningConfig.PROPERTY_KEY_CONSUMER_FETCHPAUSE,
                    provisioningConfig.getFetchPause());

            threadsRunning = createConsumer(_CM_DOMAIN, consumerProperties, getStrimziKafkaProps(strimziKafkaConfig));
        } else if (domain.equalsIgnoreCase(_STNDDEFINED_FAULT_DOMAIN)) {
            this.stndDefinedFaultConfig = (StndDefinedFaultConfig) domainConfig;
            consumerClass = _STNDDEFINED_FAULT_CLASS;
            LOG.debug("Consumer class = {}", consumerClass);
            consumerProperties.put(StndDefinedFaultConfig.PROPERTY_KEY_CONSUMER_GROUP,
                    stndDefinedFaultConfig.getConsumerGroup());
            consumerProperties.put(StndDefinedFaultConfig.PROPERTY_KEY_CONSUMER_ID,
                    stndDefinedFaultConfig.getConsumerId());
            consumerProperties.put(StndDefinedFaultConfig.PROPERTY_KEY_CONSUMER_TOPIC,
                    stndDefinedFaultConfig.getTopic());
            consumerProperties.put(StndDefinedFaultConfig.PROPERTY_KEY_CONSUMER_TIMEOUT,
                    stndDefinedFaultConfig.getTimeout());
            consumerProperties.put(StndDefinedFaultConfig.PROPERTY_KEY_CONSUMER_LIMIT,
                    stndDefinedFaultConfig.getLimit());
            consumerProperties.put(StndDefinedFaultConfig.PROPERTY_KEY_CONSUMER_FETCHPAUSE,
                    stndDefinedFaultConfig.getFetchPause());

            threadsRunning = createConsumer(_STNDDEFINED_FAULT_DOMAIN, consumerProperties,
                    getStrimziKafkaProps(strimziKafkaConfig));
        }

        else if (domain.equalsIgnoreCase(_FILE_READY_DOMAIN)) {
            LOG.debug("Consumer class _FILE_READY_DOMAIN = {}", _FILE_READY_DOMAIN);
            this.fileReadyConfig = (FileReadyConfig) domainConfig;
            LOG.debug("Consumer class this.fileReadyConfig = {}", this.fileReadyConfig);
            consumerClass = _FILERADY_CLASS;
            LOG.debug("Consumer class = {}", consumerClass);
            consumerProperties.put(FileReadyConfig.PROPERTY_KEY_CONSUMER_GROUP,
                    fileReadyConfig.getConsumerGroup());
            consumerProperties.put(FileReadyConfig.PROPERTY_KEY_CONSUMER_ID,
                    fileReadyConfig.getConsumerId());
            consumerProperties.put(FileReadyConfig.PROPERTY_KEY_CONSUMER_TOPIC,
                    fileReadyConfig.getTopic());
            consumerProperties.put(FileReadyConfig.PROPERTY_KEY_CONSUMER_TIMEOUT,
                    fileReadyConfig.getTimeout());
            consumerProperties.put(FileReadyConfig.PROPERTY_KEY_CONSUMER_LIMIT,
                    fileReadyConfig.getLimit());
            consumerProperties.put(FileReadyConfig.PROPERTY_KEY_CONSUMER_FETCHPAUSE,
            fileReadyConfig.getFetchPause());
	    /* PM Handling is moved to new Microservice
            threadsRunning = createConsumer(_FILE_READY_DOMAIN, consumerProperties,
                    getStrimziKafkaProps(strimziKafkaConfig));
		    */
        }
        else if (domain.equalsIgnoreCase(_STATE_CHANGE_DOMAIN)) {
            LOG.debug("Consumer class _STATE_CHANGE_DOMAIN = {}", _STATE_CHANGE_DOMAIN);
            this.stateChangeConfig = (StateChangeConfig) domainConfig;
            LOG.debug("Consumer class this.stateChangeConfig = {}", this.stateChangeConfig);
            consumerClass = _STATE_CHANGE_DOMAIN;
            LOG.debug("Consumer class = {}", consumerClass);
            consumerProperties.put(StateChangeConfig.PROPERTY_KEY_CONSUMER_GROUP,
                    stateChangeConfig.getConsumerGroup());
            consumerProperties.put(StateChangeConfig.PROPERTY_KEY_CONSUMER_ID,
                    stateChangeConfig.getConsumerId());
            consumerProperties.put(StateChangeConfig.PROPERTY_KEY_CONSUMER_TOPIC,
                    stateChangeConfig.getTopic());
            consumerProperties.put(StateChangeConfig.PROPERTY_KEY_CONSUMER_TIMEOUT,
                    stateChangeConfig.getTimeout());
            consumerProperties.put(StateChangeConfig.PROPERTY_KEY_CONSUMER_LIMIT,
                    stateChangeConfig.getLimit());
            consumerProperties.put(StateChangeConfig.PROPERTY_KEY_CONSUMER_FETCHPAUSE,
            stateChangeConfig.getFetchPause());

            threadsRunning = createConsumer(_STATE_CHANGE_DOMAIN, consumerProperties,
                    getStrimziKafkaProps(strimziKafkaConfig));
        }
        else if (domain.equalsIgnoreCase(_HEART_BEAT_DOMAIN)) {
                LOG.debug("Consumer class _HEART_BEAT_DOMAIN = {}", _HEART_BEAT_DOMAIN);
                this.heartBeatConfig = (HeartBeatConfig) domainConfig;
                LOG.debug("Consumer class this.HeartBeatConfig = {}", this.heartBeatConfig);
                consumerClass = _HEARTBEAT_CLASS;
                LOG.debug("Consumer class = {}", consumerClass);
                consumerProperties.put(HeartBeatConfig.PROPERTY_KEY_CONSUMER_GROUP,
                heartBeatConfig.getConsumerGroup());
                consumerProperties.put(HeartBeatConfig.PROPERTY_KEY_CONSUMER_ID,
                heartBeatConfig.getConsumerId());
                consumerProperties.put(HeartBeatConfig.PROPERTY_KEY_CONSUMER_TOPIC,
                heartBeatConfig.getTopic());
                consumerProperties.put(HeartBeatConfig.PROPERTY_KEY_CONSUMER_TIMEOUT,
                heartBeatConfig.getTimeout());
                consumerProperties.put(HeartBeatConfig.PROPERTY_KEY_CONSUMER_LIMIT,
                heartBeatConfig.getLimit());
                consumerProperties.put(HeartBeatConfig.PROPERTY_KEY_CONSUMER_FETCHPAUSE,
                heartBeatConfig.getFetchPause());
    
                threadsRunning = createConsumer(_HEART_BEAT_DOMAIN, consumerProperties,
                        getStrimziKafkaProps(strimziKafkaConfig));
            }
        else if (domain.equalsIgnoreCase(_NOTIFICATION_DOMAIN)) {
            LOG.debug("Consumer class _NOTIFICATION_DOMAIN = {}", _NOTIFICATION_DOMAIN);
            this.notificationConfig = (NotificationConfig) domainConfig;
            LOG.debug("Consumer class this.stateChangeConfig = {}", this.notificationConfig);
            consumerClass = _NOTIFICATION_CLASS;
            LOG.debug("Consumer class = {}", consumerClass);
            consumerProperties.put(FileReadyConfig.PROPERTY_KEY_CONSUMER_GROUP,
                    notificationConfig.getConsumerGroup());
            consumerProperties.put(FileReadyConfig.PROPERTY_KEY_CONSUMER_ID,
                    notificationConfig.getConsumerId());
            consumerProperties.put(FileReadyConfig.PROPERTY_KEY_CONSUMER_TOPIC,
                    notificationConfig.getTopic());
            consumerProperties.put(FileReadyConfig.PROPERTY_KEY_CONSUMER_TIMEOUT,
                    notificationConfig.getTimeout());
            consumerProperties.put(FileReadyConfig.PROPERTY_KEY_CONSUMER_LIMIT,
                    notificationConfig.getLimit());
            consumerProperties.put(FileReadyConfig.PROPERTY_KEY_CONSUMER_FETCHPAUSE,
            notificationConfig.getFetchPause());

            threadsRunning = createConsumer(_NOTIFICATION_DOMAIN, consumerProperties,
                    getStrimziKafkaProps(strimziKafkaConfig));
        }
    }

    private Properties getStrimziKafkaProps(StrimziKafkaConfig strimziKafkaConfig) {
        if (strimziKafkaProperties.size() == 0) {
            strimziKafkaProperties.put("bootstrapServers", strimziKafkaConfig.getBootstrapServers());
            strimziKafkaProperties.put("securityProtocol", strimziKafkaConfig.getSecurityProtocol());
            strimziKafkaProperties.put("saslMechanism", strimziKafkaConfig.getSaslMechanism());
            strimziKafkaProperties.put("saslJaasConfig", strimziKafkaConfig.getSaslJaasConfig());
        }
        return strimziKafkaProperties;
    }

    private boolean updateThreadState(List<StrimziKafkaVESMsgConsumer> consumers) {
        boolean threadsRunning = false;
        for (StrimziKafkaVESMsgConsumer consumer : consumers) {
            if (consumer.isRunning()) {
                threadsRunning = true;
            }
        }
        return threadsRunning;
    }

    public boolean createConsumer(String consumerType, Properties consumerProperties, Properties strimziKafkaProps) {
        StrimziKafkaVESMsgConsumerImpl consumer = null;

        if (consumerType.equalsIgnoreCase(_PNFREG_DOMAIN))
            consumer = new StrimziKafkaPNFRegVESMsgConsumer(generalConfig);
        else if (consumerType.equalsIgnoreCase(_FAULT_DOMAIN))
            consumer = new StrimziKafkaFaultVESMsgConsumer(generalConfig);
        else if (consumerType.equalsIgnoreCase(_CM_DOMAIN))
            consumer = new StrimziKafkaCMVESMsgConsumer(generalConfig);
        else if (consumerType.equals(_STNDDEFINED_FAULT_DOMAIN))
            consumer = new StrimziKafkaStndDefinedFaultVESMsgConsumer(generalConfig);
        else if (consumerType.equals(_FILE_READY_DOMAIN))
            consumer = new FileReadyVESMsgConsumer(generalConfig);
        else if (consumerType.equals(_STATE_CHANGE_DOMAIN))
            consumer = new StateChangeVESMsgConsumer(generalConfig);
            else if (consumerType.equals(_HEART_BEAT_DOMAIN))
            consumer = new HeartBeatVESMsgConsumer(generalConfig);
        else if (consumerType.equals(_NOTIFICATION_DOMAIN))
            consumer = new NotificationVESMsgConsumer(generalConfig);

        handleConsumer(consumer, consumerProperties, strimziKafkaProps, consumers);
        return !consumers.isEmpty();
    }

    private boolean handleConsumer(StrimziKafkaVESMsgConsumer consumer, Properties consumerProperties,
            Properties strimziKafkaProps, List<StrimziKafkaVESMsgConsumer> consumers) {
        if (consumer != null) {
            consumer.init(strimziKafkaProps, consumerProperties);
            if (consumer.isReady()) {
                Thread consumerThread = new Thread(consumer);
                consumerThread.start();
                consumers.add(consumer);

                LOG.info("Started consumer thread ({} : {})", consumer.getClass().getSimpleName(), consumerProperties);
                return true;
            } else {
                LOG.debug("Consumer {} is not ready", consumer.getClass().getSimpleName());
            }
        }
        return false;
    }

    @Override
    public void run() {

        while (threadsRunning) {
            threadsRunning = updateThreadState(consumers);
            if (!threadsRunning) {
                break;
            }

            try {
                Thread.sleep(10000);
            } catch (InterruptedException e) {
                LOG.error(e.getLocalizedMessage(), e);
                Thread.currentThread().interrupt();
            }
        }

        LOG.info("No listener threads running - exiting");
    }

    public List<StrimziKafkaVESMsgConsumer> getConsumers() {
        return consumers;
    }

}
