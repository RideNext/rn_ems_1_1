
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
public class DeviceRRMPolicy {
	@JsonProperty("idx")
	private int idx;
	@JsonProperty("mcc")
	private String mcc;
	@JsonProperty("sNSSAI")
	private int sNSSAI;
	@JsonProperty("mnc")
	private String mnc;
	
	public DeviceRRMPolicy() {
		
	}
	public int getIdx() {
		return idx;
	}
	public void setIdx(int idx) {
		this.idx = idx;
	}
	public String getMcc() {
		return mcc;
	}
	public void setMcc(String mcc) {
		this.mcc = mcc;
	}
	public int getsNSSAI() {
		return sNSSAI;
	}
	public void setsNSSAI(int sNSSAI) {
		this.sNSSAI = sNSSAI;
	}
	public String getMnc() {
		return mnc;
	}
	public void setMnc(String mnc) {
		this.mnc = mnc;
	}
	public DeviceRRMPolicy(int idx, String mcc, int sNSSAI, String mnc) {
		super();
		this.idx = idx;
		this.mcc = mcc;
		this.sNSSAI = sNSSAI;
		this.mnc = mnc;
	}
	@Override
	public String toString() {
		return "DeviceRRMPolicy [idx=" + idx + ", mcc=" + mcc + ", sNSSAI=" + sNSSAI + ", mnc=" + mnc + "]";
	}
	
	

}
