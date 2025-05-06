
 /***
  * ################################################################################################
  * #                                                                                              #
  * #   Copyright (C)  [2019]  [RideNext Software Solutions Pvt Ltd]. All rights  reserved         #
  * #                                                                                              #
  * ################################################################################################
 ****/

package com.nbi.entity;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.annotation.JsonProperty;

@Component
@Scope("prototype")
public class DeviceCUCPNRCellDUAttributesPLMNInfo {
	@JsonProperty("mcc")
	private String mcc;
	@JsonProperty("mnc")
	private String mnc;
	@JsonProperty("sNssai")
	private int sNssai;
	public String getMcc() {
		return mcc;
	}
	public void setMcc(String mcc) {
		this.mcc = mcc;
	}
	public String getMnc() {
		return mnc;
	}
	public void setMnc(String mnc) {
		this.mnc = mnc;
	}
	public int getsNssai() {
		return sNssai;
	}
	public void setsNssai(int sNssai) {
		this.sNssai = sNssai;
	}
	public DeviceCUCPNRCellDUAttributesPLMNInfo(String mcc, String mnc, int sNssai) {
		super();
		this.mcc = mcc;
		this.mnc = mnc;
		this.sNssai = sNssai;
	}
	
	public DeviceCUCPNRCellDUAttributesPLMNInfo() {
		
	}
	@Override
	public String toString() {
		return "DeviceCUCPNRCellDUAttributesPLMNInfo [mcc=" + mcc + ", mnc=" + mnc + ", sNssai=" + sNssai + "]";
	}
	
	

}
