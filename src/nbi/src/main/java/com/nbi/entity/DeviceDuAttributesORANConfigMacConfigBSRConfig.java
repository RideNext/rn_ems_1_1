
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
public class DeviceDuAttributesORANConfigMacConfigBSRConfig {
	@JsonProperty("periodicity-bsr-timer")
	private String periodicitybsrtimer;
	@JsonProperty("retx-bsr-timer")
	private String retxbsrtimer;
	@JsonProperty("logical-channel-sr-delay-timer")
	private String logicalchannelsrdelaytimer;
	public String getPeriodicitybsrtimer() {
		return periodicitybsrtimer;
	}
	public void setPeriodicitybsrtimer(String periodicitybsrtimer) {
		this.periodicitybsrtimer = periodicitybsrtimer;
	}
	public String getRetxbsrtimer() {
		return retxbsrtimer;
	}
	public void setRetxbsrtimer(String retxbsrtimer) {
		this.retxbsrtimer = retxbsrtimer;
	}
	public String getLogicalchannelsrdelaytimer() {
		return logicalchannelsrdelaytimer;
	}
	public void setLogicalchannelsrdelaytimer(String logicalchannelsrdelaytimer) {
		this.logicalchannelsrdelaytimer = logicalchannelsrdelaytimer;
	}
	public DeviceDuAttributesORANConfigMacConfigBSRConfig(String periodicitybsrtimer, String retxbsrtimer,
			String logicalchannelsrdelaytimer) {
		super();
		this.periodicitybsrtimer = periodicitybsrtimer;
		this.retxbsrtimer = retxbsrtimer;
		this.logicalchannelsrdelaytimer = logicalchannelsrdelaytimer;
	}
	public DeviceDuAttributesORANConfigMacConfigBSRConfig() {
		
	}
	@Override
	public String toString() {
		return "DeviceDuAttributesORANConfigMacConfigBSRConfig [periodicitybsrtimer=" + periodicitybsrtimer
				+ ", retxbsrtimer=" + retxbsrtimer + ", logicalchannelsrdelaytimer=" + logicalchannelsrdelaytimer + "]";
	}
	

}
