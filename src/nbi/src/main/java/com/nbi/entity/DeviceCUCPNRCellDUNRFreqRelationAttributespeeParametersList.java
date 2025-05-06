
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
public class DeviceCUCPNRCellDUNRFreqRelationAttributespeeParametersList {
	@JsonProperty("siteDescription")
	private String siteDescription;
	@JsonProperty("environmentType")
	private String environmentType;
	@JsonProperty("equipmentType")
	private String equipmentType;
	@JsonProperty("powerInterface")
	private String powerInterface;
	@JsonProperty("siteIdentification")
	private String siteIdentification;
	public String getSiteDescription() {
		return siteDescription;
	}
	public void setSiteDescription(String siteDescription) {
		this.siteDescription = siteDescription;
	}
	public String getEnvironmentType() {
		return environmentType;
	}
	public void setEnvironmentType(String environmentType) {
		this.environmentType = environmentType;
	}
	public String getEquipmentType() {
		return equipmentType;
	}
	public void setEquipmentType(String equipmentType) {
		this.equipmentType = equipmentType;
	}
	public String getPowerInterface() {
		return powerInterface;
	}
	public void setPowerInterface(String powerInterface) {
		this.powerInterface = powerInterface;
	}
	public String getSiteIdentification() {
		return siteIdentification;
	}
	public void setSiteIdentification(String siteIdentification) {
		this.siteIdentification = siteIdentification;
	}
	@Override
	public String toString() {
		return "DeviceCUCPNRCellDUNRFreqRelationAttributespeeParametersList [siteDescription=" + siteDescription
				+ ", environmentType=" + environmentType + ", equipmentType=" + equipmentType + ", powerInterface="
				+ powerInterface + ", siteIdentification=" + siteIdentification + "]";
	}
	public DeviceCUCPNRCellDUNRFreqRelationAttributespeeParametersList(String siteDescription, String environmentType,
			String equipmentType, String powerInterface, String siteIdentification) {
		super();
		this.siteDescription = siteDescription;
		this.environmentType = environmentType;
		this.equipmentType = equipmentType;
		this.powerInterface = powerInterface;
		this.siteIdentification = siteIdentification;
	}
	public DeviceCUCPNRCellDUNRFreqRelationAttributespeeParametersList() {
		
	}
	
	

}
