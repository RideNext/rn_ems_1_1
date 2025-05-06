
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
public class DeviceCUCPNRCellDU {
	private int id;
	@JsonProperty("attributes")
	private DeviceCUCPNRCellDUAttributes attributes;
	@JsonProperty("_3gpp-nr-nrm-nrfreqrelation:NRFreqRelation")
	private List<DeviceCUCPNRCellDUNRFreqRelation> nrfreqRelation;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public DeviceCUCPNRCellDUAttributes getAttributes() {
		return attributes;
	}
	public void setAttributes(DeviceCUCPNRCellDUAttributes attributes) {
		this.attributes = attributes;
	}
	public List<DeviceCUCPNRCellDUNRFreqRelation> getNRFreqRelation() {
		return nrfreqRelation;
	}
	public void setNRFreqRelation(List<DeviceCUCPNRCellDUNRFreqRelation> nrfreqRelation) {
		this.nrfreqRelation = nrfreqRelation;
	}
	public DeviceCUCPNRCellDU(int id, DeviceCUCPNRCellDUAttributes attributes,
			List<DeviceCUCPNRCellDUNRFreqRelation> nrfreqRelation) {
		this.id = id;
		this.attributes = attributes;
		this.nrfreqRelation = nrfreqRelation;
	}
	public DeviceCUCPNRCellDU() {
		
	}
	@Override
	public String toString() {
		return "DeviceCUCPNRCellDU [id=" + id + ", attributes=" + attributes + ", nrfreqRelation=" + nrfreqRelation
				+ "]";
	}
	
	
	
	

}
