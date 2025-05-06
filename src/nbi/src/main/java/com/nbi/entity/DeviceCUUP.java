
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
public class DeviceCUUP {
	
	private int id;
	private DeviceCUUPAttributes attributes;
	@JsonProperty("_3gpp-nr-nrm-ep:EP_S1U")
    private List<DeviceEP> epS1U;
	
	@JsonProperty("_3gpp-nr-nrm-ep:EP_NgU")
    private List<DeviceEP> epNgU;
	
	@JsonProperty("_3gpp-nr-nrm-ep:EP_X2U")
    private List<DeviceEP> epX2U;
	
	@JsonProperty("_3gpp-nr-nrm-ep:EP_F1U")
    private List<DeviceEP> epF1U;
	
	public DeviceCUUP() {
    }

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public DeviceCUUPAttributes getAttributes() {
		return attributes;
	}

	public void setAttributes(DeviceCUUPAttributes attributes) {
		this.attributes = attributes;
	}

	public List<DeviceEP> getEpS1U() {
		return epS1U;
	}

	public void setEpS1U(List<DeviceEP> epS1U) {
		this.epS1U = epS1U;
	}

	public List<DeviceEP> getEpNgU() {
		return epNgU;
	}

	public void setEpNgU(List<DeviceEP> epNgU) {
		this.epNgU = epNgU;
	}

	public List<DeviceEP> getEpX2U() {
		return epX2U;
	}

	public void setEpX2U(List<DeviceEP> epX2U) {
		this.epX2U = epX2U;
	}

	public List<DeviceEP> getEpF1U() {
		return epF1U;
	}

	public void setEpF1U(List<DeviceEP> epF1U) {
		this.epF1U = epF1U;
	}

	public DeviceCUUP(int id, DeviceCUUPAttributes attributes, List<DeviceEP> epS1U, List<DeviceEP> epNgU, List<DeviceEP> epX2U,
			List<DeviceEP> epF1U) {
		super();
		this.id = id;
		this.attributes = attributes;
		this.epS1U = epS1U;
		this.epNgU = epNgU;
		this.epX2U = epX2U;
		this.epF1U = epF1U;
	}

	@Override
	public String toString() {
		return "DeviceCUUP [id=" + id + ", attributes=" + attributes + ", epS1U=" + epS1U + ", epNgU=" + epNgU
				+ ", epX2U=" + epX2U + ", epF1U=" + epF1U + "]";
	}
	
	

}
