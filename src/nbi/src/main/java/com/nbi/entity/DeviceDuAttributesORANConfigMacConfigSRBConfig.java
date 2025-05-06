
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
public class DeviceDuAttributesORANConfigMacConfigSRBConfig {
	@JsonProperty("common-configuration-mac-parameter-list")
	private DeviceDuAttributesORANConfigMacConfigSRBConfigMACList maclist;
	@JsonProperty("ul-specific-parameters-list")
	private DeviceDuAttributesORANConfigMacConfigSRBConfigULList ullist;
	public DeviceDuAttributesORANConfigMacConfigSRBConfigMACList getMaclist() {
		return maclist;
	}
	public void setMaclist(DeviceDuAttributesORANConfigMacConfigSRBConfigMACList maclist) {
		this.maclist = maclist;
	}
	public DeviceDuAttributesORANConfigMacConfigSRBConfigULList getUllist() {
		return ullist;
	}
	public void setUllist(DeviceDuAttributesORANConfigMacConfigSRBConfigULList ullist) {
		this.ullist = ullist;
	}
	public DeviceDuAttributesORANConfigMacConfigSRBConfig(DeviceDuAttributesORANConfigMacConfigSRBConfigMACList maclist,
			DeviceDuAttributesORANConfigMacConfigSRBConfigULList ullist) {
		super();
		this.maclist = maclist;
		this.ullist = ullist;
	}
	public DeviceDuAttributesORANConfigMacConfigSRBConfig() {
		
	}
	@Override
	public String toString() {
		return "DeviceDuAttributesORANConfigMacConfigSRBConfig [maclist=" + maclist + ", ullist=" + ullist + "]";
	}
	
	
	
	

}
