/***
  * ################################################################################################
  * #                                                                                              #
  * #   Copyright (C)  [2019]  [RideNext Software Solutions Pvt Ltd]. All rights  reserved         #
  * #                                                                                              #
  * ################################################################################################
 ****/
package com.nbi.entity;

public class ESCellConfigRRH {
	private int id;
	private String mimoMode;
	private String antennaType;
	private boolean isRetEnabled;
	private int cpriRate;
	private boolean setRRHDate;
	private String duplexMode;
	private int dlEarfcn;
	private int ulEarfcn;
	private int frequencyBand;
	private int bandWidth;
	private String txDelay;
	private String rxDelay;
	private int mode;
	private boolean isLoopBackEnabled;
	private int testTime;
	private int antennaId;
	private int antennaGain;
	private String txPower;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getMimoMode() {
		return mimoMode;
	}
	public void setMimoMode(String mimoMode) {
		this.mimoMode = mimoMode;
	}
	public String getAntennaType() {
		return antennaType;
	}
	public void setAntennaType(String antennaType) {
		this.antennaType = antennaType;
	}
	public boolean isRetEnabled() {
		return isRetEnabled;
	}
	public void setRetEnabled(boolean isRetEnabled) {
		this.isRetEnabled = isRetEnabled;
	}
	public int getCpriRate() {
		return cpriRate;
	}
	public void setCpriRate(int cpriRate) {
		this.cpriRate = cpriRate;
	}
	public boolean isSetRRHDate() {
		return setRRHDate;
	}
	public void setSetRRHDate(boolean setRRHDate) {
		this.setRRHDate = setRRHDate;
	}
	public String getDuplexMode() {
		return duplexMode;
	}
	public void setDuplexMode(String duplexMode) {
		this.duplexMode = duplexMode;
	}
	public int getDlEarfcn() {
		return dlEarfcn;
	}
	public void setDlEarfcn(int dlEarfcn) {
		this.dlEarfcn = dlEarfcn;
	}
	public int getUlEarfcn() {
		return ulEarfcn;
	}
	public void setUlEarfcn(int ulEarfcn) {
		this.ulEarfcn = ulEarfcn;
	}
	public int getFrequencyBand() {
		return frequencyBand;
	}
	public void setFrequencyBand(int frequencyBand) {
		this.frequencyBand = frequencyBand;
	}
	public int getBandWidth() {
		return bandWidth;
	}
	public void setBandWidth(int bandWidth) {
		this.bandWidth = bandWidth;
	}
	public String getTxDelay() {
		return txDelay;
	}
	public void setTxDelay(String txDelay) {
		this.txDelay = txDelay;
	}
	public String getRxDelay() {
		return rxDelay;
	}
	public void setRxDelay(String rxDelay) {
		this.rxDelay = rxDelay;
	}
	public int getMode() {
		return mode;
	}
	public void setMode(int mode) {
		this.mode = mode;
	}
	public boolean isLoopBackEnabled() {
		return isLoopBackEnabled;
	}
	public void setLoopBackEnabled(boolean isLoopBackEnabled) {
		this.isLoopBackEnabled = isLoopBackEnabled;
	}
	public int getTestTime() {
		return testTime;
	}
	public void setTestTime(int testTime) {
		this.testTime = testTime;
	}
	public int getAntennaId() {
		return antennaId;
	}
	public void setAntennaId(int antennaId) {
		this.antennaId = antennaId;
	}
	public int getAntennaGain() {
		return antennaGain;
	}
	public void setAntennaGain(int antennaGain) {
		this.antennaGain = antennaGain;
	}
	public String getTxPower() {
		return txPower;
	}
	public void setTxPower(String txPower) {
		this.txPower = txPower;
	}
	public ESCellConfigRRH(int id, String mimoMode, String antennaType, boolean isRetEnabled, int cpriRate,
			boolean setRRHDate, String duplexMode, int dlEarfcn, int ulEarfcn, int frequencyBand, int bandWidth,
			String txDelay, String rxDelay, int mode, boolean isLoopBackEnabled, int testTime, int antennaId, int antennaGain,
			String txPower) {
		super();
		this.id = id;
		this.mimoMode = mimoMode;
		this.antennaType = antennaType;
		this.isRetEnabled = isRetEnabled;
		this.cpriRate = cpriRate;
		this.setRRHDate = setRRHDate;
		this.duplexMode = duplexMode;
		this.dlEarfcn = dlEarfcn;
		this.ulEarfcn = ulEarfcn;
		this.frequencyBand = frequencyBand;
		this.bandWidth = bandWidth;
		this.txDelay = txDelay;
		this.rxDelay = rxDelay;
		this.mode = mode;
		this.isLoopBackEnabled = isLoopBackEnabled;
		this.testTime = testTime;
		this.antennaId = antennaId;
		this.antennaGain = antennaGain;
		this.txPower = txPower;
	}
	@Override
	public String toString() {
		return "ESCellConfigRRH [id=" + id + ", mimoMode=" + mimoMode + ", antennaType=" + antennaType
				+ ", isRetEnabled=" + isRetEnabled + ", cpriRate=" + cpriRate + ", setRRHDate=" + setRRHDate
				+ ", duplexMode=" + duplexMode + ", dlEarfcn=" + dlEarfcn + ", ulEarfcn=" + ulEarfcn
				+ ", frequencyBand=" + frequencyBand + ", bandWidth=" + bandWidth + ", txDelay=" + txDelay
				+ ", rxDelay=" + rxDelay + ", mode=" + mode + ", isLoopBackEnabled=" + isLoopBackEnabled + ", testTime="
				+ testTime + ", antennaId=" + antennaId + ", antennaGain=" + antennaGain + ", txPower=" + txPower + "]";
	}
	public ESCellConfigRRH() {
		super();
	}
	
	
	

}
