
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
public class DeviceDuNRCellDuAttributes {
	@JsonProperty("bSChannelBwUL")
	private int bSChannelBwUL;
	@JsonProperty("ssbSubCarrierSpacing")
	private int ssbSubCarrierSpacing;
	@JsonProperty("cellLocalId")
	private int cellLocalId;
	@JsonProperty("arfcnDL")
	private int arfcnDL;
	@JsonProperty("arfcnSUL")
	private int arfcnSUL;
	@JsonProperty("resourceType")
	private String resourceType;
	@JsonProperty("ssbOffset")
	private int ssbOffset;
	@JsonProperty("rRMPolicyMemberList")
	private List<DeviceRRMPolicy> rRMPolicyMemberList;
	@JsonProperty("bSChannelBwDL")
	private int bSChannelBwDL;
	@JsonProperty("pLMNInfoList")
	private List<DeviceCUCPNRCellDUAttributesPLMNInfo> pLMNInfoList;
	@JsonProperty("ssbDuration")
	private int ssbDuration;
	@JsonProperty("arfcnUL")
	private int arfcnUL;
	@JsonProperty("nRSectorCarrierRef")
	private List<String> nRSectorCarrierRef;
	@JsonProperty("nRPCI")
	private int nRPCI;
	@JsonProperty("nRTAC")
	private int nRTAC;
	@JsonProperty("ssbFrequency")
	private int ssbFrequency;
	@JsonProperty("ssbPeriodicity")
	private int ssbPeriodicity;
	@JsonProperty("priorityLabel")
	private int priorityLabel;
	public int getbSChannelBwUL() {
		return bSChannelBwUL;
	}
	public void setbSChannelBwUL(int bSChannelBwUL) {
		this.bSChannelBwUL = bSChannelBwUL;
	}
	public int getSsbSubCarrierSpacing() {
		return ssbSubCarrierSpacing;
	}
	public void setSsbSubCarrierSpacing(int ssbSubCarrierSpacing) {
		this.ssbSubCarrierSpacing = ssbSubCarrierSpacing;
	}
	public int getCellLocalId() {
		return cellLocalId;
	}
	public void setCellLocalId(int cellLocalId) {
		this.cellLocalId = cellLocalId;
	}
	public int getArfcnDL() {
		return arfcnDL;
	}
	public void setArfcnDL(int arfcnDL) {
		this.arfcnDL = arfcnDL;
	}
	public int getArfcnSUL() {
		return arfcnSUL;
	}
	public void setArfcnSUL(int arfcnSUL) {
		this.arfcnSUL = arfcnSUL;
	}
	public String getResourceType() {
		return resourceType;
	}
	public void setResourceType(String resourceType) {
		this.resourceType = resourceType;
	}
	public int getSsbOffset() {
		return ssbOffset;
	}
	public void setSsbOffset(int ssbOffset) {
		this.ssbOffset = ssbOffset;
	}
	public List<DeviceRRMPolicy> getrRMPolicyMemberList() {
		return rRMPolicyMemberList;
	}
	public void setrRMPolicyMemberList(List<DeviceRRMPolicy> rRMPolicyMemberList) {
		this.rRMPolicyMemberList = rRMPolicyMemberList;
	}
	public int getbSChannelBwDL() {
		return bSChannelBwDL;
	}
	public void setbSChannelBwDL(int bSChannelBwDL) {
		this.bSChannelBwDL = bSChannelBwDL;
	}
	public List<DeviceCUCPNRCellDUAttributesPLMNInfo> getpLMNInfoList() {
		return pLMNInfoList;
	}
	public void setpLMNInfoList(List<DeviceCUCPNRCellDUAttributesPLMNInfo> pLMNInfoList) {
		this.pLMNInfoList = pLMNInfoList;
	}
	public int getSsbDuration() {
		return ssbDuration;
	}
	public void setSsbDuration(int ssbDuration) {
		this.ssbDuration = ssbDuration;
	}
	public int getArfcnUL() {
		return arfcnUL;
	}
	public void setArfcnUL(int arfcnUL) {
		this.arfcnUL = arfcnUL;
	}
	public List<String> getnRSectorCarrierRef() {
		return nRSectorCarrierRef;
	}
	public void setnRSectorCarrierRef(List<String> nRSectorCarrierRef) {
		this.nRSectorCarrierRef = nRSectorCarrierRef;
	}
	public int getnRPCI() {
		return nRPCI;
	}
	public void setnRPCI(int nRPCI) {
		this.nRPCI = nRPCI;
	}
	public int getnRTAC() {
		return nRTAC;
	}
	public void setnRTAC(int nRTAC) {
		this.nRTAC = nRTAC;
	}
	public int getSsbFrequency() {
		return ssbFrequency;
	}
	public void setSsbFrequency(int ssbFrequency) {
		this.ssbFrequency = ssbFrequency;
	}
	public int getSsbPeriodicity() {
		return ssbPeriodicity;
	}
	public void setSsbPeriodicity(int ssbPeriodicity) {
		this.ssbPeriodicity = ssbPeriodicity;
	}
	public int getPriorityLabel() {
		return priorityLabel;
	}
	public void setPriorityLabel(int priorityLabel) {
		this.priorityLabel = priorityLabel;
	}
	public DeviceDuNRCellDuAttributes(int bSChannelBwUL, int ssbSubCarrierSpacing, int cellLocalId, int arfcnDL,
			int arfcnSUL, String resourceType, int ssbOffset, List<DeviceRRMPolicy> rRMPolicyMemberList,
			int bSChannelBwDL, List<DeviceCUCPNRCellDUAttributesPLMNInfo> pLMNInfoList, int ssbDuration, int arfcnUL,
			List<String> nRSectorCarrierRef, int nRPCI, int nRTAC, int ssbFrequency, int ssbPeriodicity,
			int priorityLabel) {
		super();
		this.bSChannelBwUL = bSChannelBwUL;
		this.ssbSubCarrierSpacing = ssbSubCarrierSpacing;
		this.cellLocalId = cellLocalId;
		this.arfcnDL = arfcnDL;
		this.arfcnSUL = arfcnSUL;
		this.resourceType = resourceType;
		this.ssbOffset = ssbOffset;
		this.rRMPolicyMemberList = rRMPolicyMemberList;
		this.bSChannelBwDL = bSChannelBwDL;
		this.pLMNInfoList = pLMNInfoList;
		this.ssbDuration = ssbDuration;
		this.arfcnUL = arfcnUL;
		this.nRSectorCarrierRef = nRSectorCarrierRef;
		this.nRPCI = nRPCI;
		this.nRTAC = nRTAC;
		this.ssbFrequency = ssbFrequency;
		this.ssbPeriodicity = ssbPeriodicity;
		this.priorityLabel = priorityLabel;
	}
	public DeviceDuNRCellDuAttributes() {
		
	}
	@Override
	public String toString() {
		return "DeviceDuNRCellDuAttributes [bSChannelBwUL=" + bSChannelBwUL + ", ssbSubCarrierSpacing="
				+ ssbSubCarrierSpacing + ", cellLocalId=" + cellLocalId + ", arfcnDL=" + arfcnDL + ", arfcnSUL="
				+ arfcnSUL + ", resourceType=" + resourceType + ", ssbOffset=" + ssbOffset + ", rRMPolicyMemberList="
				+ rRMPolicyMemberList + ", bSChannelBwDL=" + bSChannelBwDL + ", pLMNInfoList=" + pLMNInfoList
				+ ", ssbDuration=" + ssbDuration + ", arfcnUL=" + arfcnUL + ", nRSectorCarrierRef=" + nRSectorCarrierRef
				+ ", nRPCI=" + nRPCI + ", nRTAC=" + nRTAC + ", ssbFrequency=" + ssbFrequency + ", ssbPeriodicity="
				+ ssbPeriodicity + ", priorityLabel=" + priorityLabel + "]";
	}
	
	
	
	

}
