
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
public class DeviceData {
	@JsonProperty("_3gpp-common-managed-element:ManagedElement")
	private List<DeviceDataManagedElement>managedElement;

	public List<DeviceDataManagedElement> getManagedElement() {
		return managedElement;
	}

	public void setManagedElement(List<DeviceDataManagedElement> managedElement) {
		this.managedElement = managedElement;
	}

	public DeviceData(List<DeviceDataManagedElement> managedElement) {
		this.managedElement = managedElement;
	}

	public DeviceData() {
		
	}

	@Override
	public String toString() {
		return "DeviceData [ManagedElement=" + managedElement + "]";
	}
	
	
	
	
	

}
