
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
public class DeviceHHODUWindowDetermineMethodRUProfile {
	@JsonProperty("ru-index")
	private int ruindex;
	@JsonProperty("ru-instance-id")
	private String ruinstanceid;
	public int getRuindex() {
		return ruindex;
	}
	public void setRuindex(int ruindex) {
		this.ruindex = ruindex;
	}
	public String getRuinstanceid() {
		return ruinstanceid;
	}
	public void setRuinstanceid(String ruinstanceid) {
		this.ruinstanceid = ruinstanceid;
	}
	public DeviceHHODUWindowDetermineMethodRUProfile(int ruindex, String ruinstanceid) {
		super();
		this.ruindex = ruindex;
		this.ruinstanceid = ruinstanceid;
	}
	public DeviceHHODUWindowDetermineMethodRUProfile() {
		
	}
	@Override
	public String toString() {
		return "DeviceHHODUWindowDetermineMethodRUProfile [ruindex=" + ruindex + ", ruinstanceid=" + ruinstanceid + "]";
	}
	
	
}
