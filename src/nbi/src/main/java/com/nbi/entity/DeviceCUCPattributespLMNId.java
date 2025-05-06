
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
public class DeviceCUCPattributespLMNId {
	@JsonProperty("mcc")
	private String mcc;
	@JsonProperty("mnc")
	private String mnc;
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
	@Override
	public String toString() {
		return "DeviceCUCPattributespLMNId [mcc=" + mcc + ", mnc=" + mnc + "]";
	}
	public DeviceCUCPattributespLMNId(String mcc, String mnc) {
		super();
		this.mcc = mcc;
		this.mnc = mnc;
	}
	public DeviceCUCPattributespLMNId() {
		
	}
	

}
