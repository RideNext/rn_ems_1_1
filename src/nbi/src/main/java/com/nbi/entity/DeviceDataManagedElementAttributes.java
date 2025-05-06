
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
public class DeviceDataManagedElementAttributes {
	@JsonProperty("priorityLabel")
	private int priorityLabel;
	@JsonProperty("dnPrefix")
	private String dnPrefix;
	public int getPriorityLabel() {
		return priorityLabel;
	}
	public void setPriorityLabel(int priorityLabel) {
		this.priorityLabel = priorityLabel;
	}
	public String getDnPrefix() {
		return dnPrefix;
	}
	public void setDnPrefix(String dnPrefix) {
		this.dnPrefix = dnPrefix;
	}
	public DeviceDataManagedElementAttributes(int priorityLabel, String dnPrefix) {
		super();
		this.priorityLabel = priorityLabel;
		this.dnPrefix = dnPrefix;
	}
	public DeviceDataManagedElementAttributes() {
		
	}
	@Override
	public String toString() {
		return "DeviceDataManagedElementAttributes [priorityLabel=" + priorityLabel + ", dnPrefix=" + dnPrefix + "]";
	}
	
	
	

}
