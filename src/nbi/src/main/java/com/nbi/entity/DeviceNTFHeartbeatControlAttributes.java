
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
public class DeviceNTFHeartbeatControlAttributes {
	@JsonProperty("heartbeatNtfPeriod")
	private String heartbeatNtfPeriod;

	public String getHeartbeatNtfPeriod() {
		return heartbeatNtfPeriod;
	}

	public void setHeartbeatNtfPeriod(String heartbeatNtfPeriod) {
		this.heartbeatNtfPeriod = heartbeatNtfPeriod;
	}

	public DeviceNTFHeartbeatControlAttributes(String heartbeatNtfPeriod) {
		super();
		this.heartbeatNtfPeriod = heartbeatNtfPeriod;
	}

	public DeviceNTFHeartbeatControlAttributes() {
		
	}

	@Override
	public String toString() {
		return "DeviceNTFHeartbeatControlAttributes [heartbeatNtfPeriod=" + heartbeatNtfPeriod + "]";
	}
	
	

}
