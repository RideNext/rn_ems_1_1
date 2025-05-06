 /***
  * ################################################################################################
  * #                                                                                              #
  * #   Copyright (C)  [2019]  [RideNext Software Solutions Pvt Ltd]. All rights  reserved         #
  * #                                                                                              #
  * ################################################################################################
 ****/
package com.nbi.entity;

public class DeviceMeasurementControlAttributes {
	
	private int defaultFileBasedGP;
	private String defaultFileLocation;
	private String pMAdministrativeState;
	private int defaultFileReportingPeriod;
	public int getDefaultFileBasedGP() {
		return defaultFileBasedGP;
	}
	public void setDefaultFileBasedGP(int defaultFileBasedGP) {
		this.defaultFileBasedGP = defaultFileBasedGP;
	}
	public String getDefaultFileLocation() {
		return defaultFileLocation;
	}
	public void setDefaultFileLocation(String defaultFileLocation) {
		this.defaultFileLocation = defaultFileLocation;
	}
	public String getpMAdministrativeState() {
		return pMAdministrativeState;
	}
	public void setpMAdministrativeState(String pMAdministrativeState) {
		this.pMAdministrativeState = pMAdministrativeState;
	}
	public int getDefaultFileReportingPeriod() {
		return defaultFileReportingPeriod;
	}
	public void setDefaultFileReportingPeriod(int defaultFileReportingPeriod) {
		this.defaultFileReportingPeriod = defaultFileReportingPeriod;
	}
	public DeviceMeasurementControlAttributes(int defaultFileBasedGP, String defaultFileLocation,
			String pMAdministrativeState, int defaultFileReportingPeriod) {
		super();
		this.defaultFileBasedGP = defaultFileBasedGP;
		this.defaultFileLocation = defaultFileLocation;
		this.pMAdministrativeState = pMAdministrativeState;
		this.defaultFileReportingPeriod = defaultFileReportingPeriod;
	}
	public DeviceMeasurementControlAttributes() {
		super();
	}
	@Override
	public String toString() {
		return "DeviceMeasurementControlAttributes [defaultFileBasedGP=" + defaultFileBasedGP + ", defaultFileLocation="
				+ defaultFileLocation + ", pMAdministrativeState=" + pMAdministrativeState
				+ ", defaultFileReportingPeriod=" + defaultFileReportingPeriod + "]";
	}
	

}
