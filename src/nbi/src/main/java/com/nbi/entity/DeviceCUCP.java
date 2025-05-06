
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
public class DeviceCUCP {
	private int id;
	@JsonProperty("o-ran-cu-security-handling:SecurityHandling")
	private List<DeviceCUCPSecurityHandling> securityhandling;
	@JsonProperty("_3gpp-nr-nrm-nrcellcu:NRCellCU")
	private List<DeviceCUCPNRCellDU> nrcelldu;
	@JsonProperty("attributes")
	private DeviceCUCPattributes attributes;
	
	@JsonProperty("_3gpp-nr-nrm-ep:EP_F1C")
	private List<DeviceEP> epF1C;
	
	@JsonProperty("_3gpp-nr-nrm-ep:EP_XnC")
	private List<DeviceEP> epXnC;
	
	@JsonProperty("_3gpp-nr-nrm-ep:EP_NgC")
	private List<DeviceEP> epNgC;
	
	@JsonProperty("_3gpp-nr-nrm-ep:EP_X2C")
	private List<DeviceEP> epX2C;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public List<DeviceCUCPSecurityHandling> getSecurityhandling() {
		return securityhandling;
	}

	public void setSecurityhandling(List<DeviceCUCPSecurityHandling> securityhandling) {
		this.securityhandling = securityhandling;
	}

	public List<DeviceCUCPNRCellDU> getNrcelldu() {
		return nrcelldu;
	}

	public void setNrcelldu(List<DeviceCUCPNRCellDU> nrcelldu) {
		this.nrcelldu = nrcelldu;
	}

	public DeviceCUCPattributes getAttributes() {
		return attributes;
	}

	public void setAttributes(DeviceCUCPattributes attributes) {
		this.attributes = attributes;
	}

	public List<DeviceEP> getEpF1C() {
		return epF1C;
	}

	public void setEpF1C(List<DeviceEP> epF1C) {
		this.epF1C = epF1C;
	}

	public List<DeviceEP> getEpXnC() {
		return epXnC;
	}

	public void setEpXnC(List<DeviceEP> epXnC) {
		this.epXnC = epXnC;
	}

	public List<DeviceEP> getEpNgC() {
		return epNgC;
	}

	public void setEpNgC(List<DeviceEP> epNgC) {
		this.epNgC = epNgC;
	}

	public List<DeviceEP> getEpX2C() {
		return epX2C;
	}

	public void setEpX2C(List<DeviceEP> epX2C) {
		this.epX2C = epX2C;
	}

	@Override
	public String toString() {
		return "DeviceCUCP [id=" + id + ", securityhandling=" + securityhandling + ", nrcelldu=" + nrcelldu
				+ ", attributes=" + attributes + ", epF1C=" + epF1C + ", epXnC=" + epXnC + ", epNgC=" + epNgC
				+ ", epX2C=" + epX2C + "]";
	}

	public DeviceCUCP(int id, List<DeviceCUCPSecurityHandling> securityhandling, List<DeviceCUCPNRCellDU> nrcelldu,
			DeviceCUCPattributes attributes, List<DeviceEP> epF1C, List<DeviceEP> epXnC, List<DeviceEP> epNgC,
			List<DeviceEP> epX2C) {
		super();
		this.id = id;
		this.securityhandling = securityhandling;
		this.nrcelldu = nrcelldu;
		this.attributes = attributes;
		this.epF1C = epF1C;
		this.epXnC = epXnC;
		this.epNgC = epNgC;
		this.epX2C = epX2C;
	}

	public DeviceCUCP() {
		
	}
	
	
	
	
	
}
