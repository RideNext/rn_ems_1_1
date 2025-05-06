 /***
  * ################################################################################################
  * #                                                                                              #
  * #   Copyright (C)  [2019]  [RideNext Software Solutions Pvt Ltd]. All rights  reserved         #
  * #                                                                                              #
  * ################################################################################################
 ****/
package com.nbi.entity;

public class DeviceMeasurementControl {
	
	private int id;
	private DeviceMeasurementControlAttributes attributes;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public DeviceMeasurementControlAttributes getAttributes() {
		return attributes;
	}
	public void setAttributes(DeviceMeasurementControlAttributes attributes) {
		this.attributes = attributes;
	}
	public DeviceMeasurementControl(int id, DeviceMeasurementControlAttributes attributes) {
		super();
		this.id = id;
		this.attributes = attributes;
	}
	public DeviceMeasurementControl() {
		super();
	}
	@Override
	public String toString() {
		return "DeviceMeasurementControl [id=" + id + "]";
	}

}
