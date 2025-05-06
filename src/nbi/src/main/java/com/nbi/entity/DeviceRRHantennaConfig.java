 /***
  * ################################################################################################
  * #                                                                                              #
  * #   Copyright (C)  [2019]  [RideNext Software Solutions Pvt Ltd]. All rights  reserved         #
  * #                                                                                              #
  * ################################################################################################
 ****/
package com.nbi.entity;

public class DeviceRRHantennaConfig {
	private String txPower;
	private int antennaGain;
	private int antennaId;
	public String getTxPower() {
		return txPower;
	}
	public void setTxPower(String txPower) {
		this.txPower = txPower;
	}
	public int getAntennaGain() {
		return antennaGain;
	}
	public void setAntennaGain(int antennaGain) {
		this.antennaGain = antennaGain;
	}
	public int getAntennaId() {
		return antennaId;
	}
	public void setAntennaId(int antennaId) {
		this.antennaId = antennaId;
	}
	public DeviceRRHantennaConfig(String txPower, int antennaGain, int antennaId) {
		super();
		this.txPower = txPower;
		this.antennaGain = antennaGain;
		this.antennaId = antennaId;
	}
	@Override
	public String toString() {
		return "DeviceRRHantennaConfig [txPower=" + txPower + ", antennaGain=" + antennaGain + ", antennaId="
				+ antennaId + "]";
	}
	public DeviceRRHantennaConfig() {
		super();
	}
	

}
