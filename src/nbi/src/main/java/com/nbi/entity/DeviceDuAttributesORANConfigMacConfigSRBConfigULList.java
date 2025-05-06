
 /***
  * ################################################################################################
  * #                                                                                              #
  * #   Copyright (C)  [2019]  [RideNext Software Solutions Pvt Ltd]. All rights  reserved         #
  * #                                                                                              #
  * ################################################################################################
 ****/

package com.nbi.entity;

import org.springframework.stereotype.Component;

import com.fasterxml.jackson.annotation.JsonProperty;

@Component
public class DeviceDuAttributesORANConfigMacConfigSRBConfigULList {
	
	@JsonProperty("logical-channel-sr-delay-timer-applied")
	private String logicalchannelsrdelaytimerapplied;

	public String getLogicalchannelsrdelaytimerapplied() {
		return logicalchannelsrdelaytimerapplied;
	}

	public void setLogicalchannelsrdelaytimerapplied(String logicalchannelsrdelaytimerapplied) {
		this.logicalchannelsrdelaytimerapplied = logicalchannelsrdelaytimerapplied;
	}

	public DeviceDuAttributesORANConfigMacConfigSRBConfigULList(String logicalchannelsrdelaytimerapplied) {
		super();
		this.logicalchannelsrdelaytimerapplied = logicalchannelsrdelaytimerapplied;
	}

	public DeviceDuAttributesORANConfigMacConfigSRBConfigULList() {
		
	}

	@Override
	public String toString() {
		return "DeviceDuAttributesORANConfigMacConfigSRBConfigULList [logicalchannelsrdelaytimerapplied="
				+ logicalchannelsrdelaytimerapplied + "]";
	}
	
	

}
