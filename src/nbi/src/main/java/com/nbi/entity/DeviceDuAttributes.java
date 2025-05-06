
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
public class DeviceDuAttributes {
	@JsonProperty("rRMPolicyMemberList")
	private List<DeviceRRMPolicy> rRMPolicyMemberList;
	@JsonProperty("userLabel")
	private String userLabel;
	@JsonProperty("gNBDUId")
	private String gNBDUId;
	@JsonProperty("peeParametersList")
	private DeviceCUCPNRCellDUNRFreqRelationAttributespeeParametersList peeParametersList;
	@JsonProperty("priorityLabel")
	private int priorityLabel;
	@JsonProperty("resourceType")
	private String resourceType;
	@JsonProperty("gNBIdLength")
	private int gNBIdLength;
	@JsonProperty("o-ran_3gpp-nr-nrm-gnbdufunction:o-ran-configuration")
	private DeviceDuAttributedORANConfig oranconfig;
	public List<DeviceRRMPolicy> getrRMPolicyMemberList() {
		return rRMPolicyMemberList;
	}
	public void setrRMPolicyMemberList(List<DeviceRRMPolicy> rRMPolicyMemberList) {
		this.rRMPolicyMemberList = rRMPolicyMemberList;
	}
	public String getUserLabel() {
		return userLabel;
	}
	public void setUserLabel(String userLabel) {
		this.userLabel = userLabel;
	}
	public String getgNBDUId() {
		return gNBDUId;
	}
	public void setgNBDUId(String gNBDUId) {
		this.gNBDUId = gNBDUId;
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
	public String getResourceType() {
		return resourceType;
	}
	public void setResourceType(String resourceType) {
		this.resourceType = resourceType;
	}
	public int getgNBIdLength() {
		return gNBIdLength;
	}
	public void setgNBIdLength(int gNBIdLength) {
		this.gNBIdLength = gNBIdLength;
	}
	public DeviceDuAttributedORANConfig getOranconfig() {
		return oranconfig;
	}
	public void setOranconfig(DeviceDuAttributedORANConfig oranconfig) {
		this.oranconfig = oranconfig;
	}
	@Override
	public String toString() {
		return "DeviceDuAttributes [rRMPolicyMemberList=" + rRMPolicyMemberList + ", userLabel=" + userLabel
				+ ", gNBDUId=" + gNBDUId + ", peeParametersList=" + peeParametersList + ", priorityLabel="
				+ priorityLabel + ", resourceType=" + resourceType + ", gNBIdLength=" + gNBIdLength + ", oranconfig="
				+ oranconfig + "]";
	}
	public DeviceDuAttributes(List<DeviceRRMPolicy> rRMPolicyMemberList, String userLabel, String gNBDUId,
			DeviceCUCPNRCellDUNRFreqRelationAttributespeeParametersList peeParametersList, int priorityLabel,
			String resourceType, int gNBIdLength, DeviceDuAttributedORANConfig oranconfig) {
		super();
		this.rRMPolicyMemberList = rRMPolicyMemberList;
		this.userLabel = userLabel;
		this.gNBDUId = gNBDUId;
		this.peeParametersList = peeParametersList;
		this.priorityLabel = priorityLabel;
		this.resourceType = resourceType;
		this.gNBIdLength = gNBIdLength;
		this.oranconfig = oranconfig;
	}
	public DeviceDuAttributes() {
		
	}
	
	
	

}
