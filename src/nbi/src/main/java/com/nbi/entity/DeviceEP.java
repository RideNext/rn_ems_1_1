
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
public class DeviceEP {
	private int id;
	@JsonProperty("attributes")
	private DeviceEPAttributes attributes;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public DeviceEPAttributes getAttributes() {
		return attributes;
	}
	public void setAttributes(DeviceEPAttributes attributes) {
		this.attributes = attributes;
	}
	
	public DeviceEP() {
		
	}
	@Override
	public String toString() {
		return "DeviceEP [id=" + id + ", attributes=" + attributes + "]";
	}
	public DeviceEP(int id, DeviceEPAttributes attributes) {
		super();
		this.id = id;
		this.attributes = attributes;
	}
	
}
