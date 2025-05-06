 /***
  * ################################################################################################
  * #                                                                                              #
  * #   Copyright (C)  [2019]  [RideNext Software Solutions Pvt Ltd]. All rights  reserved         #
  * #                                                                                              #
  * ################################################################################################
 ****/
package com.nbi.entity;

public class DeviceRRHdelayParam {
	private String rxDelay;
	private String txDelay;
	public String getRxDelay() {
		return rxDelay;
	}
	public void setRxDelay(String rxDelay) {
		this.rxDelay = rxDelay;
	}
	public String getTxDelay() {
		return txDelay;
	}
	public void setTxDelay(String txDelay) {
		this.txDelay = txDelay;
	}
	public DeviceRRHdelayParam(String rxDelay, String txDelay) {
		super();
		this.rxDelay = rxDelay;
		this.txDelay = txDelay;
	}
	@Override
	public String toString() {
		return "DeviceRRHdelayParam [rxDelay=" + rxDelay + ", txDelay=" + txDelay + "]";
	}
	public DeviceRRHdelayParam() {
		super();
	}
	
	

}
