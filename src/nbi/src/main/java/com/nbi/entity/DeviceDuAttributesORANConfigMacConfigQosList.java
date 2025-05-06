
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
public class DeviceDuAttributesORANConfigMacConfigQosList {
	
	@JsonProperty("qos-group-index")
	private int qosgroupindex;
	@JsonProperty("common-configuration-mac-parameter-list")
	private DeviceDuAttributesORANConfigMacConfigQosListMacList maclist;
	public int getQosgroupindex() {
		return qosgroupindex;
	}
	public void setQosgroupindex(int qosgroupindex) {
		this.qosgroupindex = qosgroupindex;
	}
	public DeviceDuAttributesORANConfigMacConfigQosListMacList getMaclist() {
		return maclist;
	}
	public void setMaclist(DeviceDuAttributesORANConfigMacConfigQosListMacList maclist) {
		this.maclist = maclist;
	}
	public DeviceDuAttributesORANConfigMacConfigQosList(int qosgroupindex,
			DeviceDuAttributesORANConfigMacConfigQosListMacList maclist) {
		super();
		this.qosgroupindex = qosgroupindex;
		this.maclist = maclist;
	}
	public DeviceDuAttributesORANConfigMacConfigQosList() {
		
	}
	@Override
	public String toString() {
		return "DeviceDuAttributesORANConfigMacConfigQosList [qosgroupindex=" + qosgroupindex + ", maclist=" + maclist
				+ "]";
	}
	
	

}
