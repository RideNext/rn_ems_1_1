
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
public class DeviceDuAttributesORANConfigMacConfigDRXConfigSchedulingConfig {
 
	@JsonProperty("scheduling-request-id")
	private int schedulingrequestid;
	@JsonProperty("sr-prohibit-timer")
	private String srprohibittimer;
	@JsonProperty("sr-trans-max")
	private String srtransmax;
	public int getSchedulingrequestid() {
		return schedulingrequestid;
	}
	public void setSchedulingrequestid(int schedulingrequestid) {
		this.schedulingrequestid = schedulingrequestid;
	}
	public String getSrprohibittimer() {
		return srprohibittimer;
	}
	public void setSrprohibittimer(String srprohibittimer) {
		this.srprohibittimer = srprohibittimer;
	}
	public String getSrtransmax() {
		return srtransmax;
	}
	public void setSrtransmax(String srtransmax) {
		this.srtransmax = srtransmax;
	}
	public DeviceDuAttributesORANConfigMacConfigDRXConfigSchedulingConfig(int schedulingrequestid,
			String srprohibittimer, String srtransmax) {
		super();
		this.schedulingrequestid = schedulingrequestid;
		this.srprohibittimer = srprohibittimer;
		this.srtransmax = srtransmax;
	}
	public DeviceDuAttributesORANConfigMacConfigDRXConfigSchedulingConfig() {
	
	}
	@Override
	public String toString() {
		return "DeviceDuAttributesORANConfigMacConfigDRXConfigSchedulingConfig [schedulingrequestid="
				+ schedulingrequestid + ", srprohibittimer=" + srprohibittimer + ", srtransmax=" + srtransmax + "]";
	}
	
	
}
