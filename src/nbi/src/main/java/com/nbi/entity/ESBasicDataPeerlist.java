
 /***
  * ################################################################################################
  * #                                                                                              #
  * #   Copyright (C)  [2019]  [RideNext Software Solutions Pvt Ltd]. All rights  reserved         #
  * #                                                                                              #
  * ################################################################################################
 ****/

package com.nbi.entity;

import org.springframework.stereotype.Component;

@Component
public class ESBasicDataPeerlist {
	private String id;
	private String siteIdentification;
	private String siteDescription;
	private String environmentType;
	private String powerInterface;
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getSiteIdentification() {
		return siteIdentification;
	}
	public void setSiteIdentification(String siteIdentification) {
		this.siteIdentification = siteIdentification;
	}
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
	public String getPowerInterface() {
		return powerInterface;
	}
	public void setPowerInterface(String powerInterface) {
		this.powerInterface = powerInterface;
	}
	public ESBasicDataPeerlist(String id, String siteIdentification, String siteDescription, String environmentType,
			String powerInterface) {
		super();
		this.id = id;
		this.siteIdentification = siteIdentification;
		this.siteDescription = siteDescription;
		this.environmentType = environmentType;
		this.powerInterface = powerInterface;
	}
	public ESBasicDataPeerlist() {
		
	}
	@Override
	public String toString() {
		return "ESBasicDataPeerlist [id=" + id + ", siteIdentification=" + siteIdentification + ", siteDescription="
				+ siteDescription + ", environmentType=" + environmentType + ", powerInterface=" + powerInterface + "]";
	}
	
	
	

}
