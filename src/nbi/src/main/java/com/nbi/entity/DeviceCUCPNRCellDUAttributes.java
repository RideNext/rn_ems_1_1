
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
public class DeviceCUCPNRCellDUAttributes {
	@JsonProperty("cellLocalId")
	private int cellLocalId;
	@JsonProperty("pLMNInfoList")
	private List<DeviceCUCPNRCellDUAttributesPLMNInfo> pLMNInfoList;
	@JsonProperty("priorityLabel")
	private int priorityLabel;
	
	public int getCellLocalId() {
		return cellLocalId;
	}
	public void setCellLocalId(int cellLocalId) {
		this.cellLocalId = cellLocalId;
	}
	public List<DeviceCUCPNRCellDUAttributesPLMNInfo> getpLMNInfoList() {
		return pLMNInfoList;
	}
	public void setpLMNInfoList(List<DeviceCUCPNRCellDUAttributesPLMNInfo> pLMNInfoList) {
		this.pLMNInfoList = pLMNInfoList;
	}
	public int getPriorityLabel() {
		return priorityLabel;
	}
	public void setPriorityLabel(int priorityLabel) {
		this.priorityLabel = priorityLabel;
	}
	public DeviceCUCPNRCellDUAttributes(int cellLocalId, List<DeviceCUCPNRCellDUAttributesPLMNInfo> pLMNInfoList,
			int priorityLabel) {
		super();
		this.cellLocalId = cellLocalId;
		this.pLMNInfoList = pLMNInfoList;
		this.priorityLabel = priorityLabel;
	}
	public DeviceCUCPNRCellDUAttributes() {
		
	}
	@Override
	public String toString() {
		return "DeviceCUCPNRCellDUAttributes [cellLocalId=" + cellLocalId + ", pLMNInfoList=" + pLMNInfoList
				+ ", priorityLabel=" + priorityLabel + "]";
	}
	
}
