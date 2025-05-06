
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
public class DeviceDuAttributesORANConfigMacConfigPHRConfig {

	@JsonProperty("phr-periodic-timer")
	private String phrperiodictimer;
	@JsonProperty("phr-type2-othercell")
	private String phrtype2othercell;
	@JsonProperty("phr-mode-other-cg")
	private String phrmodeothercg;
	@JsonProperty("phr-prohibit-timer")
	private String phrprohibittimer;
	@JsonProperty("phr-tx-power-factor-change")
	private String phrtxpowerfactorchange;
	public String getPhrperiodictimer() {
		return phrperiodictimer;
	}
	public void setPhrperiodictimer(String phrperiodictimer) {
		this.phrperiodictimer = phrperiodictimer;
	}
	public String getPhrtype2othercell() {
		return phrtype2othercell;
	}
	public void setPhrtype2othercell(String phrtype2othercell) {
		this.phrtype2othercell = phrtype2othercell;
	}
	public String getPhrmodeothercg() {
		return phrmodeothercg;
	}
	public void setPhrmodeothercg(String phrmodeothercg) {
		this.phrmodeothercg = phrmodeothercg;
	}
	public String getPhrprohibittimer() {
		return phrprohibittimer;
	}
	public void setPhrprohibittimer(String phrprohibittimer) {
		this.phrprohibittimer = phrprohibittimer;
	}
	public String getPhrtxpowerfactorchange() {
		return phrtxpowerfactorchange;
	}
	public void setPhrtxpowerfactorchange(String phrtxpowerfactorchange) {
		this.phrtxpowerfactorchange = phrtxpowerfactorchange;
	}
	public DeviceDuAttributesORANConfigMacConfigPHRConfig(String phrperiodictimer, String phrtype2othercell,
			String phrmodeothercg, String phrprohibittimer, String phrtxpowerfactorchange) {
		super();
		this.phrperiodictimer = phrperiodictimer;
		this.phrtype2othercell = phrtype2othercell;
		this.phrmodeothercg = phrmodeothercg;
		this.phrprohibittimer = phrprohibittimer;
		this.phrtxpowerfactorchange = phrtxpowerfactorchange;
	}
	public DeviceDuAttributesORANConfigMacConfigPHRConfig() {
		
	}
	@Override
	public String toString() {
		return "DeviceDuAttributesORANConfigMacConfigPHRConfig [phrperiodictimer=" + phrperiodictimer
				+ ", phrtype2othercell=" + phrtype2othercell + ", phrmodeothercg=" + phrmodeothercg
				+ ", phrprohibittimer=" + phrprohibittimer + ", phrtxpowerfactorchange=" + phrtxpowerfactorchange + "]";
	}
	
	
}
