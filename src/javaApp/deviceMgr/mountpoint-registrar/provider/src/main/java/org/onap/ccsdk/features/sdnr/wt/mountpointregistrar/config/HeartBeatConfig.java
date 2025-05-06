/*
 * ============LICENSE_START========================================================================
* Copyright (C) 2024 RideNext Software Solutions. Pvt Ltd.  All rights reserved
 * ============LICENSE_END==========================================================================
 */

package org.onap.ccsdk.features.sdnr.wt.mountpointregistrar.config;

import org.onap.ccsdk.features.sdnr.wt.common.configuration.ConfigurationFileRepresentation;

public class HeartBeatConfig extends MessageConfig {

	private static final String SECTION_MARKER = "heartbeat";
        private static final String DEFAULT_VALUE_CONSUMER_TOPIC = "unauthenticated.SEC_HEARTBEAT_OUTPUT";
    
	public HeartBeatConfig(ConfigurationFileRepresentation configuration) {
		super(configuration);
        sectionMarker = SECTION_MARKER;
        super.configuration.addSection(SECTION_MARKER);
        super.configuration.setPropertyIfNotAvailable(SECTION_MARKER, PROPERTY_KEY_CONSUMER_TOPIC,
                DEFAULT_VALUE_CONSUMER_TOPIC);
        defaults();
	}
}
