
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
public class DeviceDuBWPAttributes {
	@JsonProperty("cyclicPrefix")
	private String cyclicPrefix;
	@JsonProperty("priorityLabel")
	private int priorityLabel;
	@JsonProperty("subCarrierSpacing")
	private int subCarrierSpacing;
	@JsonProperty("numberOfRBs")
	private int numberOfRBs;
	@JsonProperty("isInitialBwp")
	private String isInitialBwp;
	@JsonProperty("bwpContext")
	private String bwpContext;
	@JsonProperty("startRB")
	private int startRB;
	public String getCyclicPrefix() {
		return cyclicPrefix;
	}
	public void setCyclicPrefix(String cyclicPrefix) {
		this.cyclicPrefix = cyclicPrefix;
	}
	public int getPriorityLabel() {
		return priorityLabel;
	}
	public void setPriorityLabel(int priorityLabel) {
		this.priorityLabel = priorityLabel;
	}
	public int getSubCarrierSpacing() {
		return subCarrierSpacing;
	}
	public void setSubCarrierSpacing(int subCarrierSpacing) {
		this.subCarrierSpacing = subCarrierSpacing;
	}
	public int getNumberOfRBs() {
		return numberOfRBs;
	}
	public void setNumberOfRBs(int numberOfRBs) {
		this.numberOfRBs = numberOfRBs;
	}
	public String getIsInitialBwp() {
		return isInitialBwp;
	}
	public void setIsInitialBwp(String isInitialBwp) {
		this.isInitialBwp = isInitialBwp;
	}
	public String getBwpContext() {
		return bwpContext;
	}
	public void setBwpContext(String bwpContext) {
		this.bwpContext = bwpContext;
	}
	public int getStartRB() {
		return startRB;
	}
	public void setStartRB(int startRB) {
		this.startRB = startRB;
	}
	public DeviceDuBWPAttributes(String cyclicPrefix, int priorityLabel, int subCarrierSpacing, int numberOfRBs,
			String isInitialBwp, String bwpContext, int startRB) {
		super();
		this.cyclicPrefix = cyclicPrefix;
		this.priorityLabel = priorityLabel;
		this.subCarrierSpacing = subCarrierSpacing;
		this.numberOfRBs = numberOfRBs;
		this.isInitialBwp = isInitialBwp;
		this.bwpContext = bwpContext;
		this.startRB = startRB;
	}
	@Override
	public String toString() {
		return "DeviceDuBWPAttributes [cyclicPrefix=" + cyclicPrefix + ", priorityLabel=" + priorityLabel
				+ ", subCarrierSpacing=" + subCarrierSpacing + ", numberOfRBs=" + numberOfRBs + ", isInitialBwp="
				+ isInitialBwp + ", bwpContext=" + bwpContext + ", startRB=" + startRB + "]";
	}
	public DeviceDuBWPAttributes() {
		
	}
	
	
}
