
 /***
  * ################################################################################################
  * #                                                                                              #
  * #   Copyright (C)  [2019]  [RideNext Software Solutions Pvt Ltd]. All rights  reserved         #
  * #                                                                                              #
  * ################################################################################################
 ****/

package com.nbi.entity;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

@Component
@Scope("prototype")
public class ESEP {
	
	private String EndPoint;
	private String LocalIPAddress;
	private int VLANId;
	private String RemoteIpAddress;
	
	public ESEP() {
		
	}
	public String getEndPoint() {
		return EndPoint;
	}
	public void setEndPoint(String endPoint) {
		EndPoint = endPoint;
	}
	public String getLocalIPAddress() {
		return LocalIPAddress;
	}
	public void setLocalIPAddress(String localIPAddress) {
		LocalIPAddress = localIPAddress;
	}
	public int getVLANId() {
		return VLANId;
	}
	public void setVLANId(int vLANId) {
		VLANId = vLANId;
	}
	public String getRemoteIpAddress() {
		return RemoteIpAddress;
	}
	public void setRemoteIpAddress(String remoteIpAddress) {
		RemoteIpAddress = remoteIpAddress;
	}
	public ESEP(String endPoint, String localIPAddress, int vLANId, String remoteIpAddress) {
		super();
		EndPoint = endPoint;
		LocalIPAddress = localIPAddress;
		VLANId = vLANId;
		RemoteIpAddress = remoteIpAddress;
	}
	
	

}
