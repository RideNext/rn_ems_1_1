
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
public class DeviceDU {
	
	private String id;
	@JsonProperty("_3gpp-nr-nrm-bwp:BWP")
	private List<DeviceDuBWP> bwp;
	
	@JsonProperty("_3gpp-nr-nrm-nrsectorcarrier:NRSectorCarrier")
	private List<DeviceDuNRSectorCarrier> nrsectorcarrier;
	
	@JsonProperty("o-ran-odu-fh-management:odu-fh-management")
	private DeviceDuFHManagement fhmanagement;
	private DeviceDuAttributes attributes;
	@JsonProperty("ManagedNFService")
	private List<DeviceDuManagedNFService>managedNFService;
	@JsonProperty("_3gpp-nr-nrm-nrcelldu:NRCellDU")
	private List<DeviceDuNRCellDu> nrcelldu;
	
	@JsonProperty("_3gpp-nr-nrm-ep:EP_F1C")
	private List<DeviceEP> epf1c;
	@JsonProperty("_3gpp-nr-nrm-ep:EP_F1U")
	private List<DeviceEP> epf1u;
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public List<DeviceDuBWP> getBwp() {
		return bwp;
	}
	public void setBwp(List<DeviceDuBWP> bwp) {
		this.bwp = bwp;
	}
	public List<DeviceDuNRSectorCarrier> getNrsectorcarrier() {
		return nrsectorcarrier;
	}
	public void setNrsectorcarrier(List<DeviceDuNRSectorCarrier> nrsectorcarrier) {
		this.nrsectorcarrier = nrsectorcarrier;
	}
	public DeviceDuFHManagement getFhmanagement() {
		return fhmanagement;
	}
	public void setFhmanagement(DeviceDuFHManagement fhmanagement) {
		this.fhmanagement = fhmanagement;
	}
	public DeviceDuAttributes getAttributes() {
		return attributes;
	}
	public void setAttributes(DeviceDuAttributes attributes) {
		this.attributes = attributes;
	}
	public List<DeviceDuManagedNFService> getManagedNFService() {
		return managedNFService;
	}
	public void setManagedNFService(List<DeviceDuManagedNFService> managedNFService) {
		this.managedNFService = managedNFService;
	}
	public List<DeviceDuNRCellDu> getNrcelldu() {
		return nrcelldu;
	}
	public void setNrcelldu(List<DeviceDuNRCellDu> nrcelldu) {
		this.nrcelldu = nrcelldu;
	}
	public List<DeviceEP> getEpf1c() {
		return epf1c;
	}
	public void setEpf1c(List<DeviceEP> epf1c) {
		this.epf1c = epf1c;
	}
	public List<DeviceEP> getEpf1u() {
		return epf1u;
	}
	public void setEpf1u(List<DeviceEP> epf1u) {
		this.epf1u = epf1u;
	}
	public DeviceDU(String id, List<DeviceDuBWP> bwp, List<DeviceDuNRSectorCarrier> nrsectorcarrier,
			DeviceDuFHManagement fhmanagement, DeviceDuAttributes attributes,
			List<DeviceDuManagedNFService> managedNFService, List<DeviceDuNRCellDu> nrcelldu, List<DeviceEP> epf1c,
			List<DeviceEP> epf1u) {
		super();
		this.id = id;
		this.bwp = bwp;
		this.nrsectorcarrier = nrsectorcarrier;
		this.fhmanagement = fhmanagement;
		this.attributes = attributes;
		this.managedNFService = managedNFService;
		this.nrcelldu = nrcelldu;
		this.epf1c = epf1c;
		this.epf1u = epf1u;
	}
	public DeviceDU() {
		
	}
	@Override
	public String toString() {
		return "DeviceDU [id=" + id + ", bwp=" + bwp + ", nrsectorcarrier=" + nrsectorcarrier + ", fhmanagement="
				+ fhmanagement + ", attributes=" + attributes + ", managedNFService=" + managedNFService + ", nrcelldu="
				+ nrcelldu + ", epf1c=" + epf1c + ", epf1u=" + epf1u + "]";
	}
	
	
	
	
	
	

}
