 /***
  * ################################################################################################
  * #                                                                                              #
  * #   Copyright (C)  [2019]  [RideNext Software Solutions Pvt Ltd]. All rights  reserved         #
  * #                                                                                              #
  * ################################################################################################
 ****/
package com.nbi.entity;
import com.fasterxml.jackson.annotation.JsonProperty;
public class DeviceRRHcpriLoopback {
@JsonProperty("isLoopBackEnabled")
	private boolean loopBackEnabled;
	private int testTime;
	private int mode;
	public boolean isLoopBackEnabled() {
		return loopBackEnabled;
	}
	public void setLoopBackEnabled(boolean loopBackEnabled) {
		this.loopBackEnabled = loopBackEnabled;
	}
	public int getTestTime() {
		return testTime;
	}
	public void setTestTime(int testTime) {
		this.testTime = testTime;
	}
	public int getMode() {
		return mode;
	}
	public void setMode(int mode) {
		this.mode = mode;
	}
	public DeviceRRHcpriLoopback(boolean loopBackEnabled, int testTime, int mode) {
		super();
		this.loopBackEnabled = loopBackEnabled;
		this.testTime = testTime;
		this.mode = mode;
	}
	@Override
	public String toString() {
		return "DeviceRRHcpriLoopback [isLoopBackEnabled=" + loopBackEnabled + ", testTime=" + testTime + ", mode="
				+ mode + "]";
	}
	public DeviceRRHcpriLoopback() {
		super();
	}
	

}
