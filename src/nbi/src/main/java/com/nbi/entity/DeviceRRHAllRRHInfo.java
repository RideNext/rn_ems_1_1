 /***
  * ################################################################################################
  * #                                                                                              #
  * #   Copyright (C)  [2019]  [RideNext Software Solutions Pvt Ltd]. All rights  reserved         #
  * #                                                                                              #
  * ################################################################################################
 ****/
package com.nbi.entity;
import com.fasterxml.jackson.annotation.JsonProperty;
public class DeviceRRHAllRRHInfo {
	private int dlEarfcn;
 @JsonProperty("antennaConfig")
	private DeviceRRHantennaConfig antennaConfig;
	private int bandWidth;
	private int ulEarfcn;
	private String antennaType;
  @JsonProperty("cpriLoopback")
	private DeviceRRHcpriLoopback cpriLoopback;
	private int cpriRate;
	private int frequencyBand;
  @JsonProperty("delayParam")
	private DeviceRRHdelayParam delayParam;
	private String mimoMode;
	private String rrhModel;
	private boolean setRRHDate;
	private String duplexMode;
  @JsonProperty("isRetEnabled")
	private boolean retEnabled;
	public int getDlEarfcn() {
		return dlEarfcn;
	}
	public void setDlEarfcn(int dlEarfcn) {
		this.dlEarfcn = dlEarfcn;
	}
	public DeviceRRHantennaConfig getAntennaConfig() {
		return antennaConfig;
	}
	public void setAntennaConfig(DeviceRRHantennaConfig antennaConfig) {
		this.antennaConfig = antennaConfig;
	}
	public int getBandWidth() {
		return bandWidth;
	}
	public void setBandWidth(int bandWidth) {
		this.bandWidth = bandWidth;
	}
	public int getUlEarfcn() {
		return ulEarfcn;
	}
	public void setUlEarfcn(int ulEarfcn) {
		this.ulEarfcn = ulEarfcn;
	}
	public String getAntennaType() {
		return antennaType;
	}
	public void setAntennaType(String antennaType) {
		this.antennaType = antennaType;
	}
	public DeviceRRHcpriLoopback getCpriLoopback() {
		return cpriLoopback;
	}
	public void setCpriLoopback(DeviceRRHcpriLoopback cpriLoopback) {
		this.cpriLoopback = cpriLoopback;
	}
	public int getCpriRate() {
		return cpriRate;
	}
	public void setCpriRate(int cpriRate) {
		this.cpriRate = cpriRate;
	}
	public int getFrequencyBand() {
		return frequencyBand;
	}
	public void setFrequencyBand(int frequencyBand) {
		this.frequencyBand = frequencyBand;
	}
	public DeviceRRHdelayParam getDelayParam() {
		return delayParam;
	}
	public void setDelayParam(DeviceRRHdelayParam delayParam) {
		this.delayParam = delayParam;
	}
	public String getMimoMode() {
		return mimoMode;
	}
	public void setMimoMode(String mimoMode) {
		this.mimoMode = mimoMode;
	}
	public String getRrhModel() {
		return rrhModel;
	}
	public void setRrhModel(String rrhModel) {
		this.rrhModel = rrhModel;
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
	public boolean isRetEnabled() {
		return retEnabled;
	}
	public void setRetEnabled(boolean retEnabled) {
		this.retEnabled = retEnabled;
	}
	public DeviceRRHAllRRHInfo(int dlEarfcn, DeviceRRHantennaConfig antennaConfig, int bandWidth, int ulEarfcn,
			String antennaType, DeviceRRHcpriLoopback cpriLoopback, int cpriRate, int frequencyBand,
			DeviceRRHdelayParam delayParam, String mimoMode, String rrhModel, boolean setRRHDate, String duplexMode,
			boolean retEnabled) {
		super();
		this.dlEarfcn = dlEarfcn;
		this.antennaConfig = antennaConfig;
		this.bandWidth = bandWidth;
		this.ulEarfcn = ulEarfcn;
		this.antennaType = antennaType;
		this.cpriLoopback = cpriLoopback;
		this.cpriRate = cpriRate;
		this.frequencyBand = frequencyBand;
		this.delayParam = delayParam;
		this.mimoMode = mimoMode;
		this.rrhModel = rrhModel;
		this.setRRHDate = setRRHDate;
		this.duplexMode = duplexMode;
		this.retEnabled = retEnabled;
	}
	@Override
	public String toString() {
		return "DeviceRRHAllRRHInfo [dlEarfcn=" + dlEarfcn + ", bandWidth=" + bandWidth + ", ulEarfcn=" + ulEarfcn
				+ ", antennaType=" + antennaType + ", cpriRate=" + cpriRate + ", frequencyBand=" + frequencyBand
				+ ", mimoMode=" + mimoMode + ", rrhModel=" + rrhModel + ", setRRHDate=" + setRRHDate + ", duplexMode="
				+ duplexMode + ", isRetEnabled=" + retEnabled + "]";
	}
	public DeviceRRHAllRRHInfo() {
		super();
	}
	
	

}
