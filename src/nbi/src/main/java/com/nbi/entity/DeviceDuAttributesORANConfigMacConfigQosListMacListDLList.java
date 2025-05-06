
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
public class DeviceDuAttributesORANConfigMacConfigQosListMacListDLList {
	
	@JsonProperty("max-dl-harq")
	private int maxdlharq;

	public int getMaxdlharq() {
		return maxdlharq;
	}

	public void setMaxdlharq(int maxdlharq) {
		this.maxdlharq = maxdlharq;
	}

	public DeviceDuAttributesORANConfigMacConfigQosListMacListDLList(int maxdlharq) {
		super();
		this.maxdlharq = maxdlharq;
	}

	public DeviceDuAttributesORANConfigMacConfigQosListMacListDLList() {
		
	}

	@Override
	public String toString() {
		return "DeviceDuAttributesORANConfigMacConfigQosListMacListDLList [maxdlharq=" + maxdlharq + "]";
	}
	
	

}
