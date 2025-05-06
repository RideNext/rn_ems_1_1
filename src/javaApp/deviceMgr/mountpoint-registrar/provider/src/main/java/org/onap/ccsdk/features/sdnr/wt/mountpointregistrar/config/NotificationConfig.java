/*
 * ============LICENSE_START========================================================================
* Copyright (C) 2024 RideNext Software Solutions. Pvt Ltd.  All rights reserved
 * ============LICENSE_END==========================================================================
 */

package org.onap.ccsdk.features.sdnr.wt.mountpointregistrar.config;

import org.onap.ccsdk.features.sdnr.wt.common.configuration.ConfigurationFileRepresentation;

public class NotificationConfig extends MessageConfig {

	private static final String SECTION_MARKER = "notification";
        private static final String DEFAULT_VALUE_CONSUMER_TOPIC = "unauthenticated.VES_NOTIFICATION_OUTPUT";
    
	public NotificationConfig(ConfigurationFileRepresentation configuration) {
		super(configuration);
        sectionMarker = SECTION_MARKER;
        super.configuration.addSection(SECTION_MARKER);
        super.configuration.setPropertyIfNotAvailable(SECTION_MARKER, PROPERTY_KEY_CONSUMER_TOPIC,
                DEFAULT_VALUE_CONSUMER_TOPIC);
        defaults();
	}

}
