
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
public class DeviceCUCPNRCellDUNRFreqRelationAttributesoffsetMO {
	@JsonProperty("sinrOffsetCsiRs")
	private int sinrOffsetCsiRs;
	@JsonProperty("rsrpOffsetSsb")
	private int rsrpOffsetSsb;
	@JsonProperty("sinrOffsetSsb")
	private int sinrOffsetSsb;
	@JsonProperty("rsrqOffsetCsiRs")
	private int rsrqOffsetCsiRs;
	@JsonProperty("rsrpOffsetCsiRs")
	private int rsrpOffsetCsiRs;
	@JsonProperty("rsrqOffsetSsb")
	private int rsrqOffsetSsb;
	
	public int getSinrOffsetCsiRs() {
		return sinrOffsetCsiRs;
	}
	public void setSinrOffsetCsiRs(int sinrOffsetCsiRs) {
		this.sinrOffsetCsiRs = sinrOffsetCsiRs;
	}
	public int getRsrpOffsetSsb() {
		return rsrpOffsetSsb;
	}
	public void setRsrpOffsetSsb(int rsrpOffsetSsb) {
		this.rsrpOffsetSsb = rsrpOffsetSsb;
	}
	public int getSinrOffsetSsb() {
		return sinrOffsetSsb;
	}
	public void setSinrOffsetSsb(int sinrOffsetSsb) {
		this.sinrOffsetSsb = sinrOffsetSsb;
	}
	public int getRsrqOffsetCsiRs() {
		return rsrqOffsetCsiRs;
	}
	public void setRsrqOffsetCsiRs(int rsrqOffsetCsiRs) {
		this.rsrqOffsetCsiRs = rsrqOffsetCsiRs;
	}
	public int getRsrpOffsetCsiRs() {
		return rsrpOffsetCsiRs;
	}
	public void setRsrpOffsetCsiRs(int rsrpOffsetCsiRs) {
		this.rsrpOffsetCsiRs = rsrpOffsetCsiRs;
	}
	public int getRsrqOffsetSsb() {
		return rsrqOffsetSsb;
	}
	public void setRsrqOffsetSsb(int rsrqOffsetSsb) {
		this.rsrqOffsetSsb = rsrqOffsetSsb;
	}
	@Override
	public String toString() {
		return "DeviceCUCPNRCellDUNRFreqRelationAttributesoffsetMO [sinrOffsetCsiRs=" + sinrOffsetCsiRs
				+ ", rsrpOffsetSsb=" + rsrpOffsetSsb + ", sinrOffsetSsb=" + sinrOffsetSsb + ", rsrqOffsetCsiRs="
				+ rsrqOffsetCsiRs + ", rsrpOffsetCsiRs=" + rsrpOffsetCsiRs + ", rsrqOffsetSsb=" + rsrqOffsetSsb + "]";
	}
	public DeviceCUCPNRCellDUNRFreqRelationAttributesoffsetMO(int sinrOffsetCsiRs, int rsrpOffsetSsb, int sinrOffsetSsb,
			int rsrqOffsetCsiRs, int rsrpOffsetCsiRs, int rsrqOffsetSsb) {
		super();
		this.sinrOffsetCsiRs = sinrOffsetCsiRs;
		this.rsrpOffsetSsb = rsrpOffsetSsb;
		this.sinrOffsetSsb = sinrOffsetSsb;
		this.rsrqOffsetCsiRs = rsrqOffsetCsiRs;
		this.rsrpOffsetCsiRs = rsrpOffsetCsiRs;
		this.rsrqOffsetSsb = rsrqOffsetSsb;
	}
	public DeviceCUCPNRCellDUNRFreqRelationAttributesoffsetMO() {
		
	}
	
	

}
