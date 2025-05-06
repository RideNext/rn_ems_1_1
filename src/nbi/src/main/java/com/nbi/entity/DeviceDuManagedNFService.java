
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
public class DeviceDuManagedNFService {

	private String id;
	@JsonProperty("attributes")
	private DeviceDuManagedNFServiceAttributes attributes;
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public DeviceDuManagedNFServiceAttributes getAttributes() {
		return attributes;
	}
	public void setAttributes(DeviceDuManagedNFServiceAttributes attributes) {
		this.attributes = attributes;
	}
	public DeviceDuManagedNFService(String id, DeviceDuManagedNFServiceAttributes attributes) {
		super();
		this.id = id;
		this.attributes = attributes;
	}
	public DeviceDuManagedNFService() {
		
	}
	@Override
	public String toString() {
		return "DeviceDuManagedNFService [id=" + id + ", attributes=" + attributes + "]";
	}
	
	
	
}
