
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
public class DeviceEPLocalAddress {
	@JsonProperty("ipAddress")
	private String ipAddress;
	@JsonProperty("vlanId")
	private int vlanId;
	public String getIpAddress() {
		return ipAddress;
	}
	public void setIpAddress(String ipAddress) {
		this.ipAddress = ipAddress;
	}
	public int getVlanId() {
		return vlanId;
	}
	public void setVlanId(int vlanId) {
		this.vlanId = vlanId;
	}
	public DeviceEPLocalAddress() {
		
	}
	@Override
	public String toString() {
		return "DeviceEPLocalAddress [ipAddress=" + ipAddress + ", vlanId=" + vlanId + "]";
	}
	public DeviceEPLocalAddress(String ipAddress, int vlanId) {
		super();
		this.ipAddress = ipAddress;
		this.vlanId = vlanId;
	}
	

}
