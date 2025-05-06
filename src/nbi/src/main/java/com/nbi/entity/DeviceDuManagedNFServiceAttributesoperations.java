
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
public class DeviceDuManagedNFServiceAttributesoperations {
	@JsonProperty("name")
	private String name;
	@JsonProperty("allowedNFTypes")
	private List<String>allowedNFTypes;
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public List<String> getAllowedNFTypes() {
		return allowedNFTypes;
	}
	public void setAllowedNFTypes(List<String> allowedNFTypes) {
		this.allowedNFTypes = allowedNFTypes;
	}
	public DeviceDuManagedNFServiceAttributesoperations(String name, List<String> allowedNFTypes) {
		super();
		this.name = name;
		this.allowedNFTypes = allowedNFTypes;
	}
	public DeviceDuManagedNFServiceAttributesoperations() {
		
	}
	@Override
	public String toString() {
		return "DeviceDuManagedNFServiceAttributesoperations [name=" + name + ", allowedNFTypes=" + allowedNFTypes
				+ "]";
	}
	
	
}
