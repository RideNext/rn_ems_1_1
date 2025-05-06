
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
public class DeviceFHManagementODUWindow {
	@JsonProperty("ru-index-id")
	private int ruindexid;
	
	@JsonProperty("ru-instance-id")
	private String ruinstanceid;
	
	private int bandwidth;
	@JsonProperty("subcarrier-spacing")
	private int subcarrierspacing;
	@JsonProperty("comp-method")
	private int compmethod;
	@JsonProperty("ru-cpmac-address")
	private String rucpmacaddress;
	@JsonProperty("prb-elem-ul")
	private List<DeviceFHODUWindowPrbElemUl> prbelemul;
	@JsonProperty("du-mac-address")
	private String dumacaddress;
	@JsonProperty("ru-upmac-address")
	private String ruupmacaddress;
	@JsonProperty("up-vlan-id")
	private int upvlanid;
	@JsonProperty("cp-vlan-id")
	private int cpvlanid;
	@JsonProperty("prb-elem-dl")
	private List<DeviceFHODUWindowPrbElemUl> prbelemdl;
	public int getRuindexid() {
		return ruindexid;
	}
	public void setRuindexid(int ruindexid) {
		this.ruindexid = ruindexid;
	}
	public String getRuinstanceid() {
		return ruinstanceid;
	}
	public void setRuinstanceid(String ruinstanceid) {
		this.ruinstanceid = ruinstanceid;
	}
	public int getBandwidth() {
		return bandwidth;
	}
	public void setBandwidth(int bandwidth) {
		this.bandwidth = bandwidth;
	}
	public int getSubcarrierspacing() {
		return subcarrierspacing;
	}
	public void setSubcarrierspacing(int subcarrierspacing) {
		this.subcarrierspacing = subcarrierspacing;
	}
	public int getCompmethod() {
		return compmethod;
	}
	public void setCompmethod(int compmethod) {
		this.compmethod = compmethod;
	}
	public String getRucpmacaddress() {
		return rucpmacaddress;
	}
	public void setRucpmacaddress(String rucpmacaddress) {
		this.rucpmacaddress = rucpmacaddress;
	}
	public List<DeviceFHODUWindowPrbElemUl> getPrbelemul() {
		return prbelemul;
	}
	public void setPrbelemul(List<DeviceFHODUWindowPrbElemUl> prbelemul) {
		this.prbelemul = prbelemul;
	}
	public String getDumacaddress() {
		return dumacaddress;
	}
	public void setDumacaddress(String dumacaddress) {
		this.dumacaddress = dumacaddress;
	}
	public String getRuupmacaddress() {
		return ruupmacaddress;
	}
	public void setRuupmacaddress(String ruupmacaddress) {
		this.ruupmacaddress = ruupmacaddress;
	}
	public int getUpvlanid() {
		return upvlanid;
	}
	public void setUpvlanid(int upvlanid) {
		this.upvlanid = upvlanid;
	}
	public int getCpvlanid() {
		return cpvlanid;
	}
	public void setCpvlanid(int cpvlanid) {
		this.cpvlanid = cpvlanid;
	}
	public List<DeviceFHODUWindowPrbElemUl> getPrbelemdl() {
		return prbelemdl;
	}
	public void setPrbelemdl(List<DeviceFHODUWindowPrbElemUl> prbelemdl) {
		this.prbelemdl = prbelemdl;
	}
	public DeviceFHManagementODUWindow(int ruindexid, String ruinstanceid, int bandwidth, int subcarrierspacing,
			int compmethod, String rucpmacaddress, List<DeviceFHODUWindowPrbElemUl> prbelemul, String dumacaddress,
			String ruupmacaddress, int upvlanid, int cpvlanid, List<DeviceFHODUWindowPrbElemUl> prbelemdl
			) {
		super();
		this.ruindexid = ruindexid;
		this.ruinstanceid = ruinstanceid;
		this.bandwidth = bandwidth;
		this.subcarrierspacing = subcarrierspacing;
		this.compmethod = compmethod;
		this.rucpmacaddress = rucpmacaddress;
		this.prbelemul = prbelemul;
		this.dumacaddress = dumacaddress;
		this.ruupmacaddress = ruupmacaddress;
		this.upvlanid = upvlanid;
		this.cpvlanid = cpvlanid;
		this.prbelemdl = prbelemdl;
	}
	public DeviceFHManagementODUWindow() {
		
	}
	@Override
	public String toString() {
		return "DeviceFHManagementODUWindow [ruindexid=" + ruindexid + ", ruinstanceid=" + ruinstanceid + ", bandwidth="
				+ bandwidth + ", subcarrierspacing=" + subcarrierspacing + ", compmethod=" + compmethod
				+ ", rucpmacaddress=" + rucpmacaddress + ", prbelemul=" + prbelemul + ", dumacaddress=" + dumacaddress
				+ ", ruupmacaddress=" + ruupmacaddress + ", upvlanid=" + upvlanid + ", cpvlanid=" + cpvlanid
				+ ", prbelemdl=" + prbelemdl + "]";
	}
	

}
