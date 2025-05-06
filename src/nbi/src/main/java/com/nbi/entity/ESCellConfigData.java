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

@Component
public class ESCellConfigData {
	
	private int arfcnDL;
	private int arfcnUL;
	private int arfcnSUL;
	private int bsChannelBwDL;
	private int bsChannelBwUL;
	private int ssbPeriodicity;
	private int ssbOfset;
	private int ssbDuration;
	private int ssbFrequency;
	private int ssbSubCarrierSpacing;
	private int PriorityLabel;
	private int rsrpOffsetSSB;
	private int sinrOffsetSSB;
	private int rsrqOffsetSSB;
	private int rsrpOffsetCsiRs;
	private int rsrqOffsetCsiRs;
	private int sinrOffsetCsiRs;
	private String peeParameters;
	private int CellReselectionPriority;
	private int CellReselectionSubPriority;
	private int pMax;
	private int qOffsetFrequency;
	private int qQualMin;
	private int qRxLevMin;
	private int threshXHighP;
	private int threshXHighQ;
	private int threshXLowP;
	private int threshXLowQ;
	private int tReselectionNR;
	private int tReselectionNRSfHigh;
	private int tReselectionNRSfMedium;
	private String nRFrequencyref;
	private String cellId;
	private List<ESCellConfigRRH> RRHList;
	public ESCellConfigData(int arfcnDL, int arfcnUL, int arfcnSUL, int bsChannelBwDL, int bsChannelBwUL,
			int ssbPeriodicity, int ssbOfset, int ssbDuration, int ssbFrequency, int ssbSubCarrierSpacing,
			int priorityLabel, int rsrpOffsetSSB, int sinrOffsetSSB, int rsrqOffsetSSB, int rsrpOffsetCsiRs,
			int rsrqOffsetCsiRs, int sinrOffsetCsiRs, String peeParameters, int cellReselectionPriority,
			int cellReselectionSubPriority, int pMax, int qOffsetFrequency, int qQualMin, int qRxLevMin,
			int threshXHighP, int threshXHighQ, int threshXLowP, int threshXLowQ, int tReselectionNR,
			int tReselectionNRSfHigh, int tReselectionNRSfMedium, String nRFrequencyref, String cellId,
			List<ESCellConfigRRH> rRHList) {
		super();
		this.arfcnDL = arfcnDL;
		this.arfcnUL = arfcnUL;
		this.arfcnSUL = arfcnSUL;
		this.bsChannelBwDL = bsChannelBwDL;
		this.bsChannelBwUL = bsChannelBwUL;
		this.ssbPeriodicity = ssbPeriodicity;
		this.ssbOfset = ssbOfset;
		this.ssbDuration = ssbDuration;
		this.ssbFrequency = ssbFrequency;
		this.ssbSubCarrierSpacing = ssbSubCarrierSpacing;
		PriorityLabel = priorityLabel;
		this.rsrpOffsetSSB = rsrpOffsetSSB;
		this.sinrOffsetSSB = sinrOffsetSSB;
		this.rsrqOffsetSSB = rsrqOffsetSSB;
		this.rsrpOffsetCsiRs = rsrpOffsetCsiRs;
		this.rsrqOffsetCsiRs = rsrqOffsetCsiRs;
		this.sinrOffsetCsiRs = sinrOffsetCsiRs;
		this.peeParameters = peeParameters;
		CellReselectionPriority = cellReselectionPriority;
		CellReselectionSubPriority = cellReselectionSubPriority;
		this.pMax = pMax;
		this.qOffsetFrequency = qOffsetFrequency;
		this.qQualMin = qQualMin;
		this.qRxLevMin = qRxLevMin;
		this.threshXHighP = threshXHighP;
		this.threshXHighQ = threshXHighQ;
		this.threshXLowP = threshXLowP;
		this.threshXLowQ = threshXLowQ;
		this.tReselectionNR = tReselectionNR;
		this.tReselectionNRSfHigh = tReselectionNRSfHigh;
		this.tReselectionNRSfMedium = tReselectionNRSfMedium;
		this.nRFrequencyref = nRFrequencyref;
		this.cellId = cellId;
		RRHList = rRHList;
	}
	public List<ESCellConfigRRH> getRRHList() {
		return RRHList;
	}
	public void setRRHList(List<ESCellConfigRRH> rRHList) {
		RRHList = rRHList;
	}
	public int getArfcnDL() {
		return arfcnDL;
	}
	public void setArfcnDL(int arfcnDL) {
		this.arfcnDL = arfcnDL;
	}
	public int getArfcnUL() {
		return arfcnUL;
	}
	public void setArfcnUL(int arfcnUL) {
		this.arfcnUL = arfcnUL;
	}
	public int getArfcnSUL() {
		return arfcnSUL;
	}
	public void setArfcnSUL(int arfcnSUL) {
		this.arfcnSUL = arfcnSUL;
	}
	public int getBsChannelBwDL() {
		return bsChannelBwDL;
	}
	public void setBsChannelBwDL(int bsChannelBwDL) {
		this.bsChannelBwDL = bsChannelBwDL;
	}
	public int getBsChannelBwUL() {
		return bsChannelBwUL;
	}
	public void setBsChannelBwUL(int bsChannelBwUL) {
		this.bsChannelBwUL = bsChannelBwUL;
	}
	public int getSsbPeriodicity() {
		return ssbPeriodicity;
	}
	public void setSsbPeriodicity(int ssbPeriodicity) {
		this.ssbPeriodicity = ssbPeriodicity;
	}
	public int getSsbOfset() {
		return ssbOfset;
	}
	public void setSsbOfset(int ssbOfset) {
		this.ssbOfset = ssbOfset;
	}
	public int getSsbDuration() {
		return ssbDuration;
	}
	public void setSsbDuration(int ssbDuration) {
		this.ssbDuration = ssbDuration;
	}
	public int getSsbFrequency() {
		return ssbFrequency;
	}
	public void setSsbFrequency(int ssbFrequency) {
		this.ssbFrequency = ssbFrequency;
	}
	public int getSsbSubCarrierSpacing() {
		return ssbSubCarrierSpacing;
	}
	public void setSsbSubCarrierSpacing(int ssbSubCarrierSpacing) {
		this.ssbSubCarrierSpacing = ssbSubCarrierSpacing;
	}
	public int getPriorityLabel() {
		return PriorityLabel;
	}
	public void setPriorityLabel(int priorityLabel) {
		PriorityLabel = priorityLabel;
	}
	public int getRsrpOffsetSSB() {
		return rsrpOffsetSSB;
	}
	public void setRsrpOffsetSSB(int rsrpOffsetSSB) {
		this.rsrpOffsetSSB = rsrpOffsetSSB;
	}
	public int getSinrOffsetSSB() {
		return sinrOffsetSSB;
	}
	public void setSinrOffsetSSB(int sinrOffsetSSB) {
		this.sinrOffsetSSB = sinrOffsetSSB;
	}
	public int getRsrqOffsetSSB() {
		return rsrqOffsetSSB;
	}
	public void setRsrqOffsetSSB(int rsrqOffsetSSB) {
		this.rsrqOffsetSSB = rsrqOffsetSSB;
	}
	public int getRsrpOffsetCsiRs() {
		return rsrpOffsetCsiRs;
	}
	public void setRsrpOffsetCsiRs(int rsrpOffsetCsiRs) {
		this.rsrpOffsetCsiRs = rsrpOffsetCsiRs;
	}
	public int getRsrqOffsetCsiRs() {
		return rsrqOffsetCsiRs;
	}
	public void setRsrqOffsetCsiRs(int rsrqOffsetCsiRs) {
		this.rsrqOffsetCsiRs = rsrqOffsetCsiRs;
	}
	public int getSinrOffsetCsiRs() {
		return sinrOffsetCsiRs;
	}
	public void setSinrOffsetCsiRs(int sinrOffsetCsiRs) {
		this.sinrOffsetCsiRs = sinrOffsetCsiRs;
	}
	public String getPeeParameters() {
		return peeParameters;
	}
	public void setPeeParameters(String peeParameters) {
		this.peeParameters = peeParameters;
	}
	public int getCellReselectionPriority() {
		return CellReselectionPriority;
	}
	public void setCellReselectionPriority(int cellReselectionPriority) {
		CellReselectionPriority = cellReselectionPriority;
	}
	public int getCellReselectionSubPriority() {
		return CellReselectionSubPriority;
	}
	public void setCellReselectionSubPriority(int cellReselectionSubPriority) {
		CellReselectionSubPriority = cellReselectionSubPriority;
	}
	public int getpMax() {
		return pMax;
	}
	public void setpMax(int pMax) {
		this.pMax = pMax;
	}
	public int getqOffsetFrequency() {
		return qOffsetFrequency;
	}
	public void setqOffsetFrequency(int qOffsetFrequency) {
		this.qOffsetFrequency = qOffsetFrequency;
	}
	public int getqQualMin() {
		return qQualMin;
	}
	public void setqQualMin(int qQualMin) {
		this.qQualMin = qQualMin;
	}
	public int getqRxLevMin() {
		return qRxLevMin;
	}
	public void setqRxLevMin(int qRxLevMin) {
		this.qRxLevMin = qRxLevMin;
	}
	public int getThreshXHighP() {
		return threshXHighP;
	}
	public void setThreshXHighP(int threshXHighP) {
		this.threshXHighP = threshXHighP;
	}
	public int getThreshXHighQ() {
		return threshXHighQ;
	}
	public void setThreshXHighQ(int threshXHighQ) {
		this.threshXHighQ = threshXHighQ;
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
	public int gettReselectionNRSfMedium() {
		return tReselectionNRSfMedium;
	}
	public void settReselectionNRSfMedium(int tReselectionNRSfMedium) {
		this.tReselectionNRSfMedium = tReselectionNRSfMedium;
	}
	public String getnRFrequencyref() {
		return nRFrequencyref;
	}
	public void setnRFrequencyref(String nRFrequencyref) {
		this.nRFrequencyref = nRFrequencyref;
	}
	public String getCellId() {
		return cellId;
	}
	public void setCellId(String cellId) {
		this.cellId = cellId;
	}
	@Override
	public String toString() {
		return "ESCellConfigData [arfcnDL=" + arfcnDL + ", arfcnUL=" + arfcnUL + ", arfcnSUL=" + arfcnSUL
				+ ", bsChannelBwDL=" + bsChannelBwDL + ", bsChannelBwUL=" + bsChannelBwUL + ", ssbPeriodicity="
				+ ssbPeriodicity + ", ssbOfset=" + ssbOfset + ", ssbDuration=" + ssbDuration + ", ssbFrequency="
				+ ssbFrequency + ", ssbSubCarrierSpacing=" + ssbSubCarrierSpacing + ", PriorityLabel=" + PriorityLabel
				+ ", rsrpOffsetSSB=" + rsrpOffsetSSB + ", sinrOffsetSSB=" + sinrOffsetSSB + ", rsrqOffsetSSB="
				+ rsrqOffsetSSB + ", rsrpOffsetCsiRs=" + rsrpOffsetCsiRs + ", rsrqOffsetCsiRs=" + rsrqOffsetCsiRs
				+ ", sinrOffsetCsiRs=" + sinrOffsetCsiRs + ", peeParameters=" + peeParameters
				+ ", CellReselectionPriority=" + CellReselectionPriority + ", CellReselectionSubPriority="
				+ CellReselectionSubPriority + ", pMax=" + pMax + ", qOffsetFrequency=" + qOffsetFrequency
				+ ", qQualMin=" + qQualMin + ", qRxLevMin=" + qRxLevMin + ", threshXHighP=" + threshXHighP
				+ ", threshXHighQ=" + threshXHighQ + ", threshXLowP=" + threshXLowP + ", threshXLowQ=" + threshXLowQ
				+ ", tReselectionNR=" + tReselectionNR + ", tReselectionNRSfHigh=" + tReselectionNRSfHigh
				+ ", tReselectionNRSfMedium=" + tReselectionNRSfMedium + ", nRFrequencyref=" + nRFrequencyref
				+ ", cellId=" + cellId + ", getArfcnDL()=" + getArfcnDL() + ", getArfcnUL()=" + getArfcnUL()
				+ ", getArfcnSUL()=" + getArfcnSUL() + ", getBsChannelBwDL()=" + getBsChannelBwDL()
				+ ", getBsChannelBwUL()=" + getBsChannelBwUL() + ", getSsbPeriodicity()=" + getSsbPeriodicity()
				+ ", getSsbOfset()=" + getSsbOfset() + ", getSsbDuration()=" + getSsbDuration() + ", getSsbFrequency()="
				+ getSsbFrequency() + ", getSsbSubCarrierSpacing()=" + getSsbSubCarrierSpacing()
				+ ", getPriorityLabel()=" + getPriorityLabel() + ", getRsrpOffsetSSB()=" + getRsrpOffsetSSB()
				+ ", getSinrOffsetSSB()=" + getSinrOffsetSSB() + ", getRsrqOffsetSSB()=" + getRsrqOffsetSSB()
				+ ", getRsrpOffsetCsiRs()=" + getRsrpOffsetCsiRs() + ", getRsrqOffsetCsiRs()=" + getRsrqOffsetCsiRs()
				+ ", getSinrOffsetCsiRs()=" + getSinrOffsetCsiRs() + ", getPeeParameters()=" + getPeeParameters()
				+ ", getCellReselectionPriority()=" + getCellReselectionPriority()
				+ ", getCellReselectionSubPriority()=" + getCellReselectionSubPriority() + ", getpMax()=" + getpMax()
				+ ", getqOffsetFrequency()=" + getqOffsetFrequency() + ", getqQualMin()=" + getqQualMin()
				+ ", getqRxLevMin()=" + getqRxLevMin() + ", getThreshXHighP()=" + getThreshXHighP()
				+ ", getThreshXHighQ()=" + getThreshXHighQ() + ", getThreshXLowP()=" + getThreshXLowP()
				+ ", getThreshXLowQ()=" + getThreshXLowQ() + ", gettReselectionNR()=" + gettReselectionNR()
				+ ", gettReselectionNRSfHigh()=" + gettReselectionNRSfHigh() + ", gettReselectionNRSfMedium()="
				+ gettReselectionNRSfMedium() + ", getnRFrequencyref()=" + getnRFrequencyref() + ", getCellId()="
				+ getCellId() + ", getClass()=" + getClass() + ", hashCode()=" + hashCode() + ", toString()="
				+ super.toString() + "]";
	}
	public ESCellConfigData() {
		super();
	}
	
	
	
	
	

}
