
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
public class DeviceDuAttributesORANConfigMacConfigScellList {

	private int id;
	@JsonProperty("scell-deactivation-timer")
	private String scelldeactivationtimer;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getScelldeactivationtimer() {
		return scelldeactivationtimer;
	}
	public void setScelldeactivationtimer(String scelldeactivationtimer) {
		this.scelldeactivationtimer = scelldeactivationtimer;
	}
	public DeviceDuAttributesORANConfigMacConfigScellList(int id, String scelldeactivationtimer) {
		super();
		this.id = id;
		this.scelldeactivationtimer = scelldeactivationtimer;
	}
	public DeviceDuAttributesORANConfigMacConfigScellList() {
		
	}
	@Override
	public String toString() {
		return "DeviceDuAttributesORANConfigMacConfigScellList [id=" + id + ", scelldeactivationtimer="
				+ scelldeactivationtimer + "]";
	}
	
	
}
