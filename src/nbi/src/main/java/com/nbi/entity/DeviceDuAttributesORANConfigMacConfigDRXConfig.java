
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
public class DeviceDuAttributesORANConfigMacConfigDRXConfig {
	@JsonProperty("drx-profile-id")
	private int drxprofileid;
	@JsonProperty("scheduling-request-config")
	private List<DeviceDuAttributesORANConfigMacConfigDRXConfigSchedulingConfig> scheduleconfig;
	@JsonProperty("drx-inactivity-timer")
	private String drxinactivitytimer;
	@JsonProperty("drx-harq-rtt-timer-dl")
	private int drxharqrtttimerdl;
	@JsonProperty("drx-retransmission-timer-ul")
	private String drxretransmissiontimerul;
	@JsonProperty("drx-long-cycle")
    private String drxlongcycle;
	@JsonProperty("drx-retransmission-timer-dl")
	private String drxretransmissiontimerdl;
	@JsonProperty("drx-harq-rtt-timer-ul")
	private int drxharqrtttimerul;
	public int getDrxprofileid() {
		return drxprofileid;
	}
	public void setDrxprofileid(int drxprofileid) {
		this.drxprofileid = drxprofileid;
	}
	public List<DeviceDuAttributesORANConfigMacConfigDRXConfigSchedulingConfig> getScheduleconfig() {
		return scheduleconfig;
	}
	public void setScheduleconfig(List<DeviceDuAttributesORANConfigMacConfigDRXConfigSchedulingConfig> scheduleconfig) {
		this.scheduleconfig = scheduleconfig;
	}
	public String getDrxinactivitytimer() {
		return drxinactivitytimer;
	}
	public void setDrxinactivitytimer(String drxinactivitytimer) {
		this.drxinactivitytimer = drxinactivitytimer;
	}
	public int getDrxharqrtttimerdl() {
		return drxharqrtttimerdl;
	}
	public void setDrxharqrtttimerdl(int drxharqrtttimerdl) {
		this.drxharqrtttimerdl = drxharqrtttimerdl;
	}
	public String getDrxretransmissiontimerul() {
		return drxretransmissiontimerul;
	}
	public void setDrxretransmissiontimerul(String drxretransmissiontimerul) {
		this.drxretransmissiontimerul = drxretransmissiontimerul;
	}
	public String getDrxlongcycle() {
		return drxlongcycle;
	}
	public void setDrxlongcycle(String drxlongcycle) {
		this.drxlongcycle = drxlongcycle;
	}
	public String getDrxretransmissiontimerdl() {
		return drxretransmissiontimerdl;
	}
	public void setDrxretransmissiontimerdl(String drxretransmissiontimerdl) {
		this.drxretransmissiontimerdl = drxretransmissiontimerdl;
	}
	public int getDrxharqrtttimerul() {
		return drxharqrtttimerul;
	}
	public void setDrxharqrtttimerul(int drxharqrtttimerul) {
		this.drxharqrtttimerul = drxharqrtttimerul;
	}
	public DeviceDuAttributesORANConfigMacConfigDRXConfig(int drxprofileid,
			List<DeviceDuAttributesORANConfigMacConfigDRXConfigSchedulingConfig> scheduleconfig,
			String drxinactivitytimer, int drxharqrtttimerdl, String drxretransmissiontimerul, String drxlongcycle,
			String drxretransmissiontimerdl, int drxharqrtttimerul) {
		super();
		this.drxprofileid = drxprofileid;
		this.scheduleconfig = scheduleconfig;
		this.drxinactivitytimer = drxinactivitytimer;
		this.drxharqrtttimerdl = drxharqrtttimerdl;
		this.drxretransmissiontimerul = drxretransmissiontimerul;
		this.drxlongcycle = drxlongcycle;
		this.drxretransmissiontimerdl = drxretransmissiontimerdl;
		this.drxharqrtttimerul = drxharqrtttimerul;
	}
	public DeviceDuAttributesORANConfigMacConfigDRXConfig() {
		
	}
	@Override
	public String toString() {
		return "DeviceDuAttributesORANConfigMacConfigDRXConfig [drxprofileid=" + drxprofileid + ", scheduleconfig="
				+ scheduleconfig + ", drxinactivitytimer=" + drxinactivitytimer + ", drxharqrtttimerdl="
				+ drxharqrtttimerdl + ", drxretransmissiontimerul=" + drxretransmissiontimerul + ", drxlongcycle="
				+ drxlongcycle + ", drxretransmissiontimerdl=" + drxretransmissiontimerdl + ", drxharqrtttimerul="
				+ drxharqrtttimerul + "]";
	}
	
	
	
}
