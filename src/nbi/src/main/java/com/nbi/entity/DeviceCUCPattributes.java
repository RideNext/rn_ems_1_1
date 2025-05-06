
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
public class DeviceCUCPattributes {
	@JsonProperty("gNBIdLength")
	private int gNBIdLength;
	@JsonProperty("gNBId")
	private int gNBId;
	@JsonProperty("pLMNId")
	private List<DeviceCUCPattributespLMNId> pLMNId;
	@JsonProperty("rRMPolicyMemberList")
	private List<DeviceRRMPolicy> rRMPolicyMemberList;
	@JsonProperty("peeParametersList")
	private DeviceCUCPNRCellDUNRFreqRelationAttributespeeParametersList peeParametersList;
	@JsonProperty("priorityLabel")
	private int priorityLabel;
	@JsonProperty("userLabel")
	private String userLabel;
	@JsonProperty("resourceType")
	private String resourceType;
	@JsonProperty("gNBCUName")
	private String gNBCUName;
	public int getgNBIdLength() {
		return gNBIdLength;
	}
	public void setgNBIdLength(int gNBIdLength) {
		this.gNBIdLength = gNBIdLength;
	}
	public int getgNBId() {
		return gNBId;
	}
	public void setgNBId(int gNBId) {
		this.gNBId = gNBId;
	}
	public List<DeviceCUCPattributespLMNId> getpLMNId() {
		return pLMNId;
	}
	public void setpLMNId(List<DeviceCUCPattributespLMNId> pLMNId) {
		this.pLMNId = pLMNId;
	}
	public List<DeviceRRMPolicy> getrRMPolicyMemberList() {
		return rRMPolicyMemberList;
	}
	public void setrRMPolicyMemberList(List<DeviceRRMPolicy> rRMPolicyMemberList) {
		this.rRMPolicyMemberList = rRMPolicyMemberList;
	}
	public DeviceCUCPNRCellDUNRFreqRelationAttributespeeParametersList getPeeParametersList() {
		return peeParametersList;
	}
	public void setPeeParametersList(DeviceCUCPNRCellDUNRFreqRelationAttributespeeParametersList peeParametersList) {
		this.peeParametersList = peeParametersList;
	}
	public int getPriorityLabel() {
		return priorityLabel;
	}
	public void setPriorityLabel(int priorityLabel) {
		this.priorityLabel = priorityLabel;
	}
	public String getUserLabel() {
		return userLabel;
	}
	public void setUserLabel(String userLabel) {
		this.userLabel = userLabel;
	}
	public String getResourceType() {
		return resourceType;
	}
	public void setResourceType(String resourceType) {
		this.resourceType = resourceType;
	}
	public String getgNBCUName() {
		return gNBCUName;
	}
	public void setgNBCUName(String gNBCUName) {
		this.gNBCUName = gNBCUName;
	}
	@Override
	public String toString() {
		return "DeviceCUCPattributes [gNBIdLength=" + gNBIdLength + ", gNBId=" + gNBId + ", pLMNId=" + pLMNId
				+ ", rRMPolicyMemberList=" + rRMPolicyMemberList + ", peeParametersList=" + peeParametersList
				+ ", priorityLabel=" + priorityLabel + ", userLabel=" + userLabel + ", resourceType=" + resourceType
				+ ", gNBCUName=" + gNBCUName + "]";
	}
	public DeviceCUCPattributes(int gNBIdLength, int gNBId, List<DeviceCUCPattributespLMNId> pLMNId,
			List<DeviceRRMPolicy> rRMPolicyMemberList,
			DeviceCUCPNRCellDUNRFreqRelationAttributespeeParametersList peeParametersList, int priorityLabel,
			String userLabel, String resourceType, String gNBCUName) {
		super();
		this.gNBIdLength = gNBIdLength;
		this.gNBId = gNBId;
		this.pLMNId = pLMNId;
		this.rRMPolicyMemberList = rRMPolicyMemberList;
		this.peeParametersList = peeParametersList;
		this.priorityLabel = priorityLabel;
		this.userLabel = userLabel;
		this.resourceType = resourceType;
		this.gNBCUName = gNBCUName;
	}
	public DeviceCUCPattributes() {
		
	}
	
	
}
