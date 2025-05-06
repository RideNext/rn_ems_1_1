
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
public class DeviceDuAttributesORANConfigMacConfigQosListMacList {

	@JsonProperty("dl-specific-parameters-list")
	private DeviceDuAttributesORANConfigMacConfigQosListMacListDLList dllist;
	@JsonProperty("ul-specific-parameters-list")
	private DeviceDuAttributesORANConfigMacConfigQosListMacListULList ulist;
	public DeviceDuAttributesORANConfigMacConfigQosListMacListDLList getDllist() {
		return dllist;
	}
	public void setDllist(DeviceDuAttributesORANConfigMacConfigQosListMacListDLList dllist) {
		this.dllist = dllist;
	}
	public DeviceDuAttributesORANConfigMacConfigQosListMacListULList getUlist() {
		return ulist;
	}
	public void setUlist(DeviceDuAttributesORANConfigMacConfigQosListMacListULList ulist) {
		this.ulist = ulist;
	}
	public DeviceDuAttributesORANConfigMacConfigQosListMacList(
			DeviceDuAttributesORANConfigMacConfigQosListMacListDLList dllist,
			DeviceDuAttributesORANConfigMacConfigQosListMacListULList ulist) {
		super();
		this.dllist = dllist;
		this.ulist = ulist;
	}
	public DeviceDuAttributesORANConfigMacConfigQosListMacList() {
		
	}
	@Override
	public String toString() {
		return "DeviceDuAttributesORANConfigMacConfigQosListMacList [dllist=" + dllist + ", ulist=" + ulist + "]";
	}
	
	
}
