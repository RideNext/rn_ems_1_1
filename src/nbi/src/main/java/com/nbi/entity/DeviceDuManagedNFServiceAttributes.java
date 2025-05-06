
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
public class DeviceDuManagedNFServiceAttributes {
	@JsonProperty("sAP")
	private List<DeviceDuManagedNFServiceAttributessAP> sAP;
	@JsonProperty("operations")
	private List<DeviceDuManagedNFServiceAttributesoperations> operations;
	@JsonProperty("administrativeState")
	private String administrativeState;
	public List<DeviceDuManagedNFServiceAttributessAP> getsAP() {
		return sAP;
	}
	public void setsAP(List<DeviceDuManagedNFServiceAttributessAP> sAP) {
		this.sAP = sAP;
	}
	public List<DeviceDuManagedNFServiceAttributesoperations> getOperations() {
		return operations;
	}
	public void setOperations(List<DeviceDuManagedNFServiceAttributesoperations> operations) {
		this.operations = operations;
	}
	public String getAdministrativeState() {
		return administrativeState;
	}
	public void setAdministrativeState(String administrativeState) {
		this.administrativeState = administrativeState;
	}
	public DeviceDuManagedNFServiceAttributes(List<DeviceDuManagedNFServiceAttributessAP> sAP,
			List<DeviceDuManagedNFServiceAttributesoperations> operations, String administrativeState) {
		super();
		this.sAP = sAP;
		this.operations = operations;
		this.administrativeState = administrativeState;
	}
	public DeviceDuManagedNFServiceAttributes() {
		
	}
	@Override
	public String toString() {
		return "DeviceDuManagedNFServiceAttributes [sAP=" + sAP + ", operations=" + operations
				+ ", administrativeState=" + administrativeState + "]";
	}
	
	
	

}
