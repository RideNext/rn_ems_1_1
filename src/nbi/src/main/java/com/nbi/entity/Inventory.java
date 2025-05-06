
 /***
  * ################################################################################################
  * #                                                                                              #
  * #   Copyright (C)  [2019]  [RideNext Software Solutions Pvt Ltd]. All rights  reserved         #
  * #                                                                                              #
  * ################################################################################################
 ****/

package com.nbi.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;

import com.fasterxml.jackson.annotation.JsonProperty;

@Document(indexName = "networkelement-connection-v7")
public class Inventory {
	@Id
    private String id;

    private String status;
    private String host;
    private int port;
    @Field(name = "device-type", type = FieldType.Text)
    private String type;
    @Field(name = "serial-number", type = FieldType.Text)
    private String SerialNumber;
    @Field(name = "software-version", type = FieldType.Text)
    private String SoftwareVersion;
    @Field(name = "vendor-details", type = FieldType.Text)
    private String VendorDetails;
    @Field(name = "model-number", type = FieldType.Text)
    private String modelNumber;
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getHost() {
		return host;
	}
	public void setHost(String host) {
		this.host = host;
	}
	public int getPort() {
		return port;
	}
	public void setPort(int port) {
		this.port = port;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public String getSerialNumber() {
		return SerialNumber;
	}
	public void setSerialNumber(String serialNumber) {
		SerialNumber = serialNumber;
	}
	public String getSoftwareVersion() {
		return SoftwareVersion;
	}
	public void setSoftwareVersion(String softwareVersion) {
		SoftwareVersion = softwareVersion;
	}
	public String getVendorDetails() {
		return VendorDetails;
	}
	public void setVendorDetails(String vendorDetails) {
		VendorDetails = vendorDetails;
	}
	public String getModelNumber() {
		return modelNumber;
	}
	public void setModelNumber(String modelNumber) {
		this.modelNumber = modelNumber;
	}
	public Inventory() {
		
	}
	@Override
	public String toString() {
		return "Inventory [id=" + id + ", status=" + status + ", host=" + host + ", port=" + port + ", type=" + type
				+ ", SerialNumber=" + SerialNumber + ", SoftwareVersion=" + SoftwareVersion + ", VendorDetails="
				+ VendorDetails + ", modelNumber=" + modelNumber + "]";
	}
	
	
    
}
