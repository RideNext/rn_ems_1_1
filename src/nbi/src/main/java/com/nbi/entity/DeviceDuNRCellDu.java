
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
public class DeviceDuNRCellDu {
	
	private int id;
	@JsonProperty("attributes")
	private DeviceDuNRCellDuAttributes attributes;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public DeviceDuNRCellDuAttributes getAttributes() {
		return attributes;
	}
	public void setAttributes(DeviceDuNRCellDuAttributes attributes) {
		this.attributes = attributes;
	}
	public DeviceDuNRCellDu(int id, DeviceDuNRCellDuAttributes attributes) {
		super();
		this.id = id;
		this.attributes = attributes;
	}
	public DeviceDuNRCellDu() {
		
	}
	@Override
	public String toString() {
		return "DeviceDuNRCellDu [id=" + id + ", attributes=" + attributes + "]";
	}
	
	
	

}
