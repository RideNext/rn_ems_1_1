
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
public class DeviceCUUPAttributes {
	@JsonProperty("priorityLabel")
	private int priorityLabel;
	@JsonProperty("rRMPolicyMemberList")
	private List<DeviceRRMPolicy> rRMPolicyMemberList;
	@JsonProperty("gNBId")
	private int gNBId;
	@JsonProperty("resourceType")
	private String resourceType;
	
	public DeviceCUUPAttributes(){
		
	}
	public int getPriorityLabel() {
		return priorityLabel;
	}
	public void setPriorityLabel(int priorityLabel) {
		this.priorityLabel = priorityLabel;
	}
	public List<DeviceRRMPolicy> getrRMPolicyMemberList() {
		return rRMPolicyMemberList;
	}
	public void setrRMPolicyMemberList(List<DeviceRRMPolicy> rRMPolicyMemberList) {
		this.rRMPolicyMemberList = rRMPolicyMemberList;
	}
	public int getgNBId() {
		return gNBId;
	}
	public void setgNBId(int gNBId) {
		this.gNBId = gNBId;
	}
	public String getResourceType() {
		return resourceType;
	}
	public void setResourceType(String resourceType) {
		this.resourceType = resourceType;
	}
	public DeviceCUUPAttributes(int priorityLabel, List<DeviceRRMPolicy> rRMPolicyMemberList, int gNBId,
			String resourceType) {
		super();
		this.priorityLabel = priorityLabel;
		this.rRMPolicyMemberList = rRMPolicyMemberList;
		this.gNBId = gNBId;
		this.resourceType = resourceType;
	}
	@Override
	public String toString() {
		return "DeviceCUUPAttributes [priorityLabel=" + priorityLabel + ", rRMPolicyMemberList=" + rRMPolicyMemberList
				+ ", gNBId=" + gNBId + ", resourceType=" + resourceType + "]";
	}
	
	
	
}
