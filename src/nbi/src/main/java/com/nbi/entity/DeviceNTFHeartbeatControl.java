
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
public class DeviceNTFHeartbeatControl {
	
	private String id;
	@JsonProperty("attributes")
	private DeviceNTFHeartbeatControlAttributes attributes;
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public DeviceNTFHeartbeatControlAttributes getAttributes() {
		return attributes;
	}
	public void setAttributes(DeviceNTFHeartbeatControlAttributes attributes) {
		this.attributes = attributes;
	}
	public DeviceNTFHeartbeatControl(String id, DeviceNTFHeartbeatControlAttributes attributes) {
		super();
		this.id = id;
		this.attributes = attributes;
	}
	public DeviceNTFHeartbeatControl() {
		
	}
	@Override
	public String toString() {
		return "DeviceNTFHeartbeatControl [id=" + id + ", attributes=" + attributes + "]";
	}
	
	

}
