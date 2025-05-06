
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
public class DeviceDuAttributesORANConfigMacConfigSRBConfigMACList {

	@JsonProperty("allowed-serv-cells")
	private String allowedservcells;
	@JsonProperty("priority")
	private int priority;
	public String getAllowedservcells() {
		return allowedservcells;
	}
	public void setAllowedservcells(String allowedservcells) {
		this.allowedservcells = allowedservcells;
	}
	public int getPriority() {
		return priority;
	}
	public void setPriority(int priority) {
		this.priority = priority;
	}
	public DeviceDuAttributesORANConfigMacConfigSRBConfigMACList(String allowedservcells, int priority) {
		super();
		this.allowedservcells = allowedservcells;
		this.priority = priority;
	}
	public DeviceDuAttributesORANConfigMacConfigSRBConfigMACList() {
		
	}
	@Override
	public String toString() {
		return "DeviceDuAttributesORANConfigMacConfigSRBConfigMACList [allowedservcells=" + allowedservcells
				+ ", priority=" + priority + "]";
	}
	
	
}
