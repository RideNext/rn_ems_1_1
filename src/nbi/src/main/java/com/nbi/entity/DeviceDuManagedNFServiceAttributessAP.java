
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
public class DeviceDuManagedNFServiceAttributessAP {
	@JsonProperty("host")
	private String host;
	@JsonProperty("port")
	private int port;
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
	public DeviceDuManagedNFServiceAttributessAP(String host, int port) {
		super();
		this.host = host;
		this.port = port;
	}
	public DeviceDuManagedNFServiceAttributessAP() {
		
	}
	@Override
	public String toString() {
		return "DeviceDuManagedNFServiceAttributessAP [host=" + host + ", port=" + port + "]";
	}
	
	
}
