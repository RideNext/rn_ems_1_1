
 /***
  * ################################################################################################
  * #                                                                                              #
  * #   Copyright (C)  [2019]  [RideNext Software Solutions Pvt Ltd]. All rights  reserved         #
  * #                                                                                              #
  * ################################################################################################
 ****/
package com.nbi.entity;
import com.fasterxml.jackson.annotation.JsonProperty;
public class DeviceRRH {
	
	private int id;
  @JsonProperty("AllRRHInfo")
	private DeviceRRHAllRRHInfo allRRHInfo;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public DeviceRRHAllRRHInfo getAllRRHInfo() {
		return allRRHInfo;
	}
	public void setAllRRHInfo(DeviceRRHAllRRHInfo allRRHInfo) {
		this.allRRHInfo = allRRHInfo;
	}
	public DeviceRRH(int id, DeviceRRHAllRRHInfo allRRHInfo) {
		super();
		this.id = id;
		this.allRRHInfo = allRRHInfo;
	}
	@Override
	public String toString() {
		return "DeviceRRH [id=" + id + "]";
	}
	public DeviceRRH() {
		super();
	}
	
	

}
