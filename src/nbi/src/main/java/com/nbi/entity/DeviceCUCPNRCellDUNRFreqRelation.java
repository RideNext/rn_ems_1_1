
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
public class DeviceCUCPNRCellDUNRFreqRelation {
	
	private String id;
	@JsonProperty("attributes")
	private DeviceCUCPNRCellDUNRFreqRelationAttributes attributes;
	
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public DeviceCUCPNRCellDUNRFreqRelationAttributes getAttributes() {
		return attributes;
	}
	public void setAttributes(DeviceCUCPNRCellDUNRFreqRelationAttributes attributes) {
		this.attributes = attributes;
	}
	public DeviceCUCPNRCellDUNRFreqRelation(String id, DeviceCUCPNRCellDUNRFreqRelationAttributes attributes) {
		super();
		this.id = id;
		this.attributes = attributes;
	}
	public DeviceCUCPNRCellDUNRFreqRelation() {
		
	}
	@Override
	public String toString() {
		return "DeviceCUCPNRCellDUNRFreqRelation [id=" + id + ", attributes=" + attributes + "]";
	}
	
	
	

}
