
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

@Component
@Scope("prototype")
public class ESDUDataBwpList {
	
	private String id;
	private int PriorityLabel;
	private String bwpContext;
	private int SubCarrierSpacing;
	private String cyclePrefix;
	private int startRB;
	private int NumberOfRBs;
	private String isInitiaLBwp;
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public int getPriorityLabel() {
		return PriorityLabel;
	}
	public void setPriorityLabel(int priorityLabel) {
		PriorityLabel = priorityLabel;
	}
	public String getBwpContext() {
		return bwpContext;
	}
	public void setBwpContext(String bwpContext) {
		this.bwpContext = bwpContext;
	}
	public int getSubCarrierSpacing() {
		return SubCarrierSpacing;
	}
	public void setSubCarrierSpacing(int subCarrierSpacing) {
		SubCarrierSpacing = subCarrierSpacing;
	}
	public String getCyclePrefix() {
		return cyclePrefix;
	}
	public void setCyclePrefix(String cyclePrefix) {
		this.cyclePrefix = cyclePrefix;
	}
	public int getStartRB() {
		return startRB;
	}
	public void setStartRB(int startRB) {
		this.startRB = startRB;
	}
	public int getNumberOfRBs() {
		return NumberOfRBs;
	}
	public void setNumberOfRBs(int numberOfRBs) {
		NumberOfRBs = numberOfRBs;
	}
	public String getIsInitiaLBwp() {
		return isInitiaLBwp;
	}
	public void setIsInitiaLBwp(String isInitiaLBwp) {
		this.isInitiaLBwp = isInitiaLBwp;
	}
	public ESDUDataBwpList(String id, int priorityLabel, String bwpContext, int subCarrierSpacing, String cyclePrefix,
			int startRB, int numberOfRBs, String isInitiaLBwp) {
		super();
		this.id = id;
		PriorityLabel = priorityLabel;
		this.bwpContext = bwpContext;
		SubCarrierSpacing = subCarrierSpacing;
		this.cyclePrefix = cyclePrefix;
		this.startRB = startRB;
		NumberOfRBs = numberOfRBs;
		this.isInitiaLBwp = isInitiaLBwp;
	}
	public ESDUDataBwpList() {
		
	}
	@Override
	public String toString() {
		return "ESDUDataBwpList [id=" + id + ", PriorityLabel=" + PriorityLabel + ", bwpContext=" + bwpContext
				+ ", SubCarrierSpacing=" + SubCarrierSpacing + ", cyclePrefix=" + cyclePrefix + ", startRB=" + startRB
				+ ", NumberOfRBs=" + NumberOfRBs + ", isInitiaLBwp=" + isInitiaLBwp + "]";
	}
	
	

}
