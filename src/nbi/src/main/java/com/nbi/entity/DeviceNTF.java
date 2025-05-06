
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
public class DeviceNTF {
	private String id;
	@JsonProperty("attributes")
	private DeviceNTFAttributes attributes;
	@JsonProperty("HeartbeatControl")
	private List<DeviceNTFHeartbeatControl>heartbeatControl;
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public DeviceNTFAttributes getAttributes() {
		return attributes;
	}
	public void setAttributes(DeviceNTFAttributes attributes) {
		this.attributes = attributes;
	}
	public List<DeviceNTFHeartbeatControl> getHeartbeatControl() {
		return heartbeatControl;
	}
	public void setHeartbeatControl(List<DeviceNTFHeartbeatControl> heartbeatControl) {
		this.heartbeatControl = heartbeatControl;
	}
	public DeviceNTF(String id, DeviceNTFAttributes attributes, List<DeviceNTFHeartbeatControl> heartbeatControl) {
		super();
		this.id = id;
		this.attributes = attributes;
		this.heartbeatControl = heartbeatControl;
	}
	public DeviceNTF() {
		
	}
	@Override
	public String toString() {
		return "DeviceNTF [id=" + id + ", attributes=" + attributes + ", HeartbeatControl=" + heartbeatControl + "]";
	}
	
	
	
	
	

}
