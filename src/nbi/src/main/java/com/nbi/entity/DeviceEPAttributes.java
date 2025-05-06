
 /***
  * ################################################################################################
  * #                                                                                              #
  * #   Copyright (C)  [2019]  [RideNext Software Solutions Pvt Ltd]. All rights  reserved         #
  * #                                                                                              #
  * ################################################################################################
 ****/

package com.nbi.entity;

import java.util.List;

import org.springframework.stereotype.Component;

import com.fasterxml.jackson.annotation.JsonProperty;

@Component
public class DeviceEPAttributes {
	@JsonProperty("localAddress")
	private List<DeviceEPLocalAddress> localAddress;
	@JsonProperty("remoteAddress")
	private String remoteAddress;
	public DeviceEPAttributes(List<DeviceEPLocalAddress> localAddress, String remoteAddress) {
		super();
		this.localAddress = localAddress;
		this.remoteAddress = remoteAddress;
	}
	
	public DeviceEPAttributes() {
		
	}
	@Override
	public String toString() {
		return "DeviceEPAttributes [localAddress=" + localAddress + ", remoteAddress=" + remoteAddress + "]";
	}
	public List<DeviceEPLocalAddress> getLocalAddress() {
		return localAddress;
	}
	public void setLocalAddress(List<DeviceEPLocalAddress> localAddress) {
		this.localAddress = localAddress;
	}
	public String getRemoteAddress() {
		return remoteAddress;
	}
	public void setRemoteAddress(String remoteAddress) {
		this.remoteAddress = remoteAddress;
	}
	
}
