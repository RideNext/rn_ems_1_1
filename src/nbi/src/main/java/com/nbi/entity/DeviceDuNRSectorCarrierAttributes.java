
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
public class DeviceDuNRSectorCarrierAttributes {
	@JsonProperty("txDirection")
	private String txDirection;
	@JsonProperty("configuredMaxTxPower")
	private int configuredMaxTxPower;
	@JsonProperty("bSChannelBwDL")
	private int bSChannelBwDL;
	@JsonProperty("arfcnDL")
	private int arfcnDL;
	@JsonProperty("arfcnUL")
	private int arfcnUL;
	@JsonProperty("bSChannelBwUL")
	private int bSChannelBwUL;
	@JsonProperty("priorityLabel")
	private int priorityLabel;
	public String getTxDirection() {
		return txDirection;
	}
	public void setTxDirection(String txDirection) {
		this.txDirection = txDirection;
	}
	public int getConfiguredMaxTxPower() {
		return configuredMaxTxPower;
	}
	public void setConfiguredMaxTxPower(int configuredMaxTxPower) {
		this.configuredMaxTxPower = configuredMaxTxPower;
	}
	public int getbSChannelBwDL() {
		return bSChannelBwDL;
	}
	public void setbSChannelBwDL(int bSChannelBwDL) {
		this.bSChannelBwDL = bSChannelBwDL;
	}
	public int getArfcnDL() {
		return arfcnDL;
	}
	public void setArfcnDL(int arfcnDL) {
		this.arfcnDL = arfcnDL;
	}
	public int getArfcnUL() {
		return arfcnUL;
	}
	public void setArfcnUL(int arfcnUL) {
		this.arfcnUL = arfcnUL;
	}
	public int getbSChannelBwUL() {
		return bSChannelBwUL;
	}
	public void setbSChannelBwUL(int bSChannelBwUL) {
		this.bSChannelBwUL = bSChannelBwUL;
	}
	public int getPriorityLabel() {
		return priorityLabel;
	}
	public void setPriorityLabel(int priorityLabel) {
		this.priorityLabel = priorityLabel;
	}
	public DeviceDuNRSectorCarrierAttributes(String txDirection, int configuredMaxTxPower, int bSChannelBwDL,
			int arfcnDL, int arfcnUL, int bSChannelBwUL, int priorityLabel) {
		super();
		this.txDirection = txDirection;
		this.configuredMaxTxPower = configuredMaxTxPower;
		this.bSChannelBwDL = bSChannelBwDL;
		this.arfcnDL = arfcnDL;
		this.arfcnUL = arfcnUL;
		this.bSChannelBwUL = bSChannelBwUL;
		this.priorityLabel = priorityLabel;
	}
	public DeviceDuNRSectorCarrierAttributes() {
		
	}
	@Override
	public String toString() {
		return "DeviceDuNRSectorCarrierAttributes [txDirection=" + txDirection + ", configuredMaxTxPower="
				+ configuredMaxTxPower + ", bSChannelBwDL=" + bSChannelBwDL + ", arfcnDL=" + arfcnDL + ", arfcnUL="
				+ arfcnUL + ", bSChannelBwUL=" + bSChannelBwUL + ", priorityLabel=" + priorityLabel + "]";
	}
	
	
	

}
