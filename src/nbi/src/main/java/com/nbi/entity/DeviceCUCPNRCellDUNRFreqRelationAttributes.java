
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
public class DeviceCUCPNRCellDUNRFreqRelationAttributes {
	@JsonProperty("peeParametersList")
	private DeviceCUCPNRCellDUNRFreqRelationAttributespeeParametersList peeParametersList;
	@JsonProperty("threshXLowP")
	private int threshXLowP;
	@JsonProperty("threshXLowQ")
	private int threshXLowQ;
	@JsonProperty("qQualMin")
	private int qQualMin;
	@JsonProperty("cellReselectionPriority")
	private int cellReselectionPriority;
	@JsonProperty("offsetMO")
	private DeviceCUCPNRCellDUNRFreqRelationAttributesoffsetMO offsetMO;
	@JsonProperty("cellReselectionSubPriority")
	private int cellReselectionSubPriority;
	@JsonProperty("qRxLevMin")
	private int qRxLevMin;
	@JsonProperty("pMax")
	private int pMax;
	@JsonProperty("priorityLabel")
	private int priorityLabel;
	@JsonProperty("userLabel")
	private String userLabel;
	@JsonProperty("threshXHighQ")
	private int threshXHighQ;
	@JsonProperty("qOffsetFreq")
	private int qOffsetFreq;
	@JsonProperty("threshXHighP")
	private int threshXHighP;
	@JsonProperty("tReselectionNRSfMedium")
	private int tReselectionNRSfMedium;
	@JsonProperty("tReselectionNR")
	private int tReselectionNR;
	@JsonProperty("tReselectionNRSfHigh")
	private int tReselectionNRSfHigh;
	@JsonProperty("nRFrequencyRef")
	private String nRFrequencyRef;
	public DeviceCUCPNRCellDUNRFreqRelationAttributespeeParametersList getPeeParametersList() {
		return peeParametersList;
	}
	public void setPeeParametersList(DeviceCUCPNRCellDUNRFreqRelationAttributespeeParametersList peeParametersList) {
		this.peeParametersList = peeParametersList;
	}
	public int getThreshXLowP() {
		return threshXLowP;
	}
	public void setThreshXLowP(int threshXLowP) {
		this.threshXLowP = threshXLowP;
	}
	public int getThreshXLowQ() {
		return threshXLowQ;
	}
	public void setThreshXLowQ(int threshXLowQ) {
		this.threshXLowQ = threshXLowQ;
	}
	public int getqQualMin() {
		return qQualMin;
	}
	public void setqQualMin(int qQualMin) {
		this.qQualMin = qQualMin;
	}
	public int getCellReselectionPriority() {
		return cellReselectionPriority;
	}
	public void setCellReselectionPriority(int cellReselectionPriority) {
		this.cellReselectionPriority = cellReselectionPriority;
	}
	public DeviceCUCPNRCellDUNRFreqRelationAttributesoffsetMO getOffsetMO() {
		return offsetMO;
	}
	public void setOffsetMO(DeviceCUCPNRCellDUNRFreqRelationAttributesoffsetMO offsetMO) {
		this.offsetMO = offsetMO;
	}
	public int getCellReselectionSubPriority() {
		return cellReselectionSubPriority;
	}
	public void setCellReselectionSubPriority(int cellReselectionSubPriority) {
		this.cellReselectionSubPriority = cellReselectionSubPriority;
	}
	public int getqRxLevMin() {
		return qRxLevMin;
	}
	public void setqRxLevMin(int qRxLevMin) {
		this.qRxLevMin = qRxLevMin;
	}
	public int getpMax() {
		return pMax;
	}
	public void setpMax(int pMax) {
		this.pMax = pMax;
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
	public int getThreshXHighQ() {
		return threshXHighQ;
	}
	public void setThreshXHighQ(int threshXHighQ) {
		this.threshXHighQ = threshXHighQ;
	}
	public int getqOffsetFreq() {
		return qOffsetFreq;
	}
	public void setqOffsetFreq(int qOffsetFreq) {
		this.qOffsetFreq = qOffsetFreq;
	}
	public int getThreshXHighP() {
		return threshXHighP;
	}
	public void setThreshXHighP(int threshXHighP) {
		this.threshXHighP = threshXHighP;
	}
	public int gettReselectionNRSfMedium() {
		return tReselectionNRSfMedium;
	}
	public void settReselectionNRSfMedium(int tReselectionNRSfMedium) {
		this.tReselectionNRSfMedium = tReselectionNRSfMedium;
	}
	public int gettReselectionNR() {
		return tReselectionNR;
	}
	public void settReselectionNR(int tReselectionNR) {
		this.tReselectionNR = tReselectionNR;
	}
	public int gettReselectionNRSfHigh() {
		return tReselectionNRSfHigh;
	}
	public void settReselectionNRSfHigh(int tReselectionNRSfHigh) {
		this.tReselectionNRSfHigh = tReselectionNRSfHigh;
	}
	public String getnRFrequencyRef() {
		return nRFrequencyRef;
	}
	public void setnRFrequencyRef(String nRFrequencyRef) {
		this.nRFrequencyRef = nRFrequencyRef;
	}
	public DeviceCUCPNRCellDUNRFreqRelationAttributes(
			DeviceCUCPNRCellDUNRFreqRelationAttributespeeParametersList peeParametersList, int threshXLowP,
			int threshXLowQ, int qQualMin, int cellReselectionPriority,
			DeviceCUCPNRCellDUNRFreqRelationAttributesoffsetMO offsetMO, int cellReselectionSubPriority, int qRxLevMin,
			int pMax, int priorityLabel, String userLabel, int threshXHighQ, int qOffsetFreq, int threshXHighP,
			int tReselectionNRSfMedium, int tReselectionNR, int tReselectionNRSfHigh, String nRFrequencyRef) {
		super();
		this.peeParametersList = peeParametersList;
		this.threshXLowP = threshXLowP;
		this.threshXLowQ = threshXLowQ;
		this.qQualMin = qQualMin;
		this.cellReselectionPriority = cellReselectionPriority;
		this.offsetMO = offsetMO;
		this.cellReselectionSubPriority = cellReselectionSubPriority;
		this.qRxLevMin = qRxLevMin;
		this.pMax = pMax;
		this.priorityLabel = priorityLabel;
		this.userLabel = userLabel;
		this.threshXHighQ = threshXHighQ;
		this.qOffsetFreq = qOffsetFreq;
		this.threshXHighP = threshXHighP;
		this.tReselectionNRSfMedium = tReselectionNRSfMedium;
		this.tReselectionNR = tReselectionNR;
		this.tReselectionNRSfHigh = tReselectionNRSfHigh;
		this.nRFrequencyRef = nRFrequencyRef;
	}
	public DeviceCUCPNRCellDUNRFreqRelationAttributes() {
		
	}
	@Override
	public String toString() {
		return "DeviceCUCPNRCellDUNRFreqRelationAttributes [peeParametersList=" + peeParametersList + ", threshXLowP="
				+ threshXLowP + ", threshXLowQ=" + threshXLowQ + ", qQualMin=" + qQualMin + ", cellReselectionPriority="
				+ cellReselectionPriority + ", offsetMO=" + offsetMO + ", cellReselectionSubPriority="
				+ cellReselectionSubPriority + ", qRxLevMin=" + qRxLevMin + ", pMax=" + pMax + ", priorityLabel="
				+ priorityLabel + ", userLabel=" + userLabel + ", threshXHighQ=" + threshXHighQ + ", qOffsetFreq="
				+ qOffsetFreq + ", threshXHighP=" + threshXHighP + ", tReselectionNRSfMedium=" + tReselectionNRSfMedium
				+ ", tReselectionNR=" + tReselectionNR + ", tReselectionNRSfHigh=" + tReselectionNRSfHigh
				+ ", nRFrequencyRef=" + nRFrequencyRef + "]";
	}
	
	
	

}
