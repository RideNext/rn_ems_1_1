
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
public class DeviceHHODUWindowDetermineMethod {
	@JsonProperty("method")
	private String method;
	@JsonProperty("configuration-status")
	private String configurationstatus;
	@JsonProperty("ru-num")
	private int runum;
	@JsonProperty("pre-configured-ru-profile")
	private List<DeviceHHODUWindowDetermineMethodRUProfile> ruprofile;
	@JsonProperty("pre-configured-delay-profile")
	private DeviceHHODUWindowDetermineMethodDelayProfile delayprofile;
	public String getMethod() {
		return method;
	}
	public void setMethod(String method) {
		this.method = method;
	}
	public String getConfigurationstatus() {
		return configurationstatus;
	}
	public void setConfigurationstatus(String configurationstatus) {
		this.configurationstatus = configurationstatus;
	}
	public int getRunum() {
		return runum;
	}
	public void setRunum(int runum) {
		this.runum = runum;
	}
	public List<DeviceHHODUWindowDetermineMethodRUProfile> getRuprofile() {
		return ruprofile;
	}
	public void setRuprofile(List<DeviceHHODUWindowDetermineMethodRUProfile> ruprofile) {
		this.ruprofile = ruprofile;
	}
	public DeviceHHODUWindowDetermineMethodDelayProfile getDelayprofile() {
		return delayprofile;
	}
	public void setDelayprofile(DeviceHHODUWindowDetermineMethodDelayProfile delayprofile) {
		this.delayprofile = delayprofile;
	}
	public DeviceHHODUWindowDetermineMethod(String method, String configurationstatus, int runum,
			List<DeviceHHODUWindowDetermineMethodRUProfile> ruprofile,
			DeviceHHODUWindowDetermineMethodDelayProfile delayprofile) {
		super();
		this.method = method;
		this.configurationstatus = configurationstatus;
		this.runum = runum;
		this.ruprofile = ruprofile;
		this.delayprofile = delayprofile;
	}
	public DeviceHHODUWindowDetermineMethod() {
		
	}
	@Override
	public String toString() {
		return "DeviceHHODUWindowDetermineMethod [method=" + method + ", configurationstatus=" + configurationstatus
				+ ", runum=" + runum + ", ruprofile=" + ruprofile + ", delayprofile=" + delayprofile + "]";
	}
	
	
}
