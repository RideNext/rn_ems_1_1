
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
public class DeviceDuNRSectorCarrier {
	
	private String id;
	@JsonProperty("attributes")
	private DeviceDuNRSectorCarrierAttributes attributes;
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public DeviceDuNRSectorCarrierAttributes getAttributes() {
		return attributes;
	}
	public void setAttributes(DeviceDuNRSectorCarrierAttributes attributes) {
		this.attributes = attributes;
	}
	public DeviceDuNRSectorCarrier(String id, DeviceDuNRSectorCarrierAttributes attributes) {
		super();
		this.id = id;
		this.attributes = attributes;
	}
	public DeviceDuNRSectorCarrier() {
		
	}
	@Override
	public String toString() {
		return "DeviceDuNRSectorCarrier [id=" + id + ", attributes=" + attributes + "]";
	}
	
	
	

}
