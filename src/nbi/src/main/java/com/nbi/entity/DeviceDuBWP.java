
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
public class DeviceDuBWP {
	
	private String id;
	@JsonProperty("attributes")
	private DeviceDuBWPAttributes attributes;
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public DeviceDuBWPAttributes getAttributes() {
		return attributes;
	}
	public void setAttributes(DeviceDuBWPAttributes attributes) {
		this.attributes = attributes;
	}
	public DeviceDuBWP(String id, DeviceDuBWPAttributes attributes) {
		super();
		this.id = id;
		this.attributes = attributes;
	}
	public DeviceDuBWP() {
		
	}
	@Override
	public String toString() {
		return "DeviceDuBWP [id=" + id + ", attributes=" + attributes + "]";
	}
	
	
	
	

}
