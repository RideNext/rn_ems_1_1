
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
public class DeviceDuAttributedORANConfig {
	@JsonProperty("mac-configuration")
	private DeviceDuAttributesORANConfigMacConfig macconfig;

	public DeviceDuAttributesORANConfigMacConfig getMacconfig() {
		return macconfig;
	}

	public void setMacconfig(DeviceDuAttributesORANConfigMacConfig macconfig) {
		this.macconfig = macconfig;
	}

	public DeviceDuAttributedORANConfig(DeviceDuAttributesORANConfigMacConfig macconfig) {
		super();
		this.macconfig = macconfig;
	}

	public DeviceDuAttributedORANConfig() {
		
	}

	@Override
	public String toString() {
		return "DeviceDuAttributedORANConfig [macconfig=" + macconfig + "]";
	}
	
	
	
	

}
