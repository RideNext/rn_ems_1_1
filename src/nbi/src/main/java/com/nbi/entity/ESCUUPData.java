
 /***
  * ################################################################################################
  * #                                                                                              #
  * #   Copyright (C)  [2019]  [RideNext Software Solutions Pvt Ltd]. All rights  reserved         #
  * #                                                                                              #
  * ################################################################################################
 ****/

package com.nbi.entity;

import java.util.List;

import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;
import org.springframework.stereotype.Component;

@Component
public class ESCUUPData {
	
	private int PriorityLabel;
	private int gNBId;
	private String ResourceType;
	private String RRMPolicy;
	@Field(type = FieldType.Nested)
	private List<ESEP> EndPointList;
	
	public ESCUUPData() {
    }
	
	public int getPriorityLabel() {
		return PriorityLabel;
	}
	public void setPriorityLabel(int priorityLabel) {
		PriorityLabel = priorityLabel;
	}
	public int getgNBId() {
		return gNBId;
	}
	public void setgNBId(int gNBId) {
		this.gNBId = gNBId;
	}
	public String getResourceType() {
		return ResourceType;
	}
	public void setResourceType(String resourceType) {
		ResourceType = resourceType;
	}
	public String getRRMPolicy() {
		return RRMPolicy;
	}
	public void setRRMPolicy(String rRMPolicy) {
		RRMPolicy = rRMPolicy;
	}
	public List<ESEP> getEndPointList() {
		return EndPointList;
	}
	public void setEndPointList(List<ESEP> endPointList) {
		EndPointList = endPointList;
	}
	public ESCUUPData(int priorityLabel, int gNBId, String resourceType, String rRMPolicy, List<ESEP> endPointList) {
		super();
		PriorityLabel = priorityLabel;
		this.gNBId = gNBId;
		ResourceType = resourceType;
		RRMPolicy = rRMPolicy;
		EndPointList = endPointList;
	}
	
	

}
