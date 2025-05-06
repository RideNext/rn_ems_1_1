
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
public class DeviceDuAttributesORANConfigMacConfig {
	@JsonProperty("srb-config")
	private DeviceDuAttributesORANConfigMacConfigSRBConfig srbconfig;
	
	@JsonProperty("phr-config")
	private DeviceDuAttributesORANConfigMacConfigPHRConfig phrconfig;
	
	@JsonProperty("drx-config")
	private List<DeviceDuAttributesORANConfigMacConfigDRXConfig> drxconfig;
	
	@JsonProperty("bsr-config")
	private DeviceDuAttributesORANConfigMacConfigBSRConfig bsrconfig;
	
	@JsonProperty("scell-deactivation-timer-list")
	private List<DeviceDuAttributesORANConfigMacConfigScellList> scelltimerlist;
	
	@JsonProperty("qos-group-config-list")
	private List<DeviceDuAttributesORANConfigMacConfigQosList> qoslist;

	public DeviceDuAttributesORANConfigMacConfigSRBConfig getSrbconfig() {
		return srbconfig;
	}

	public void setSrbconfig(DeviceDuAttributesORANConfigMacConfigSRBConfig srbconfig) {
		this.srbconfig = srbconfig;
	}

	public DeviceDuAttributesORANConfigMacConfigPHRConfig getPhrconfig() {
		return phrconfig;
	}

	public void setPhrconfig(DeviceDuAttributesORANConfigMacConfigPHRConfig phrconfig) {
		this.phrconfig = phrconfig;
	}

	public List<DeviceDuAttributesORANConfigMacConfigDRXConfig> getDrxconfig() {
		return drxconfig;
	}

	public void setDrxconfig(List<DeviceDuAttributesORANConfigMacConfigDRXConfig> drxconfig) {
		this.drxconfig = drxconfig;
	}

	public DeviceDuAttributesORANConfigMacConfigBSRConfig getBsrconfig() {
		return bsrconfig;
	}

	public void setBsrconfig(DeviceDuAttributesORANConfigMacConfigBSRConfig bsrconfig) {
		this.bsrconfig = bsrconfig;
	}

	public List<DeviceDuAttributesORANConfigMacConfigScellList> getScelltimerlist() {
		return scelltimerlist;
	}

	public void setScelltimerlist(List<DeviceDuAttributesORANConfigMacConfigScellList> scelltimerlist) {
		this.scelltimerlist = scelltimerlist;
	}

	public List<DeviceDuAttributesORANConfigMacConfigQosList> getQoslist() {
		return qoslist;
	}

	public void setQoslist(List<DeviceDuAttributesORANConfigMacConfigQosList> qoslist) {
		this.qoslist = qoslist;
	}

	public DeviceDuAttributesORANConfigMacConfig(DeviceDuAttributesORANConfigMacConfigSRBConfig srbconfig,
			DeviceDuAttributesORANConfigMacConfigPHRConfig phrconfig,
			List<DeviceDuAttributesORANConfigMacConfigDRXConfig> drxconfig,
			DeviceDuAttributesORANConfigMacConfigBSRConfig bsrconfig,
			List<DeviceDuAttributesORANConfigMacConfigScellList> scelltimerlist,
			List<DeviceDuAttributesORANConfigMacConfigQosList> qoslist) {
		super();
		this.srbconfig = srbconfig;
		this.phrconfig = phrconfig;
		this.drxconfig = drxconfig;
		this.bsrconfig = bsrconfig;
		this.scelltimerlist = scelltimerlist;
		this.qoslist = qoslist;
	}

	public DeviceDuAttributesORANConfigMacConfig() {
		
	}

	@Override
	public String toString() {
		return "DeviceDuAttributesORANConfigMacConfig [srbconfig=" + srbconfig + ", phrconfig=" + phrconfig
				+ ", drxconfig=" + drxconfig + ", bsrconfig=" + bsrconfig + ", scelltimerlist=" + scelltimerlist
				+ ", qoslist=" + qoslist + "]";
	}
	
	

}
