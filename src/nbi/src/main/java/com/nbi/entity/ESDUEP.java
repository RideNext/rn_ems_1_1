
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
public class ESDUEP {
	
	private String EndPoint;
	private String LocalIPAddress;
	private int VLANID;
	private String RemoteIPAddress;
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
	public int getVLANID() {
		return VLANID;
	}
	public void setVLANID(int vLANID) {
		VLANID = vLANID;
	}
	public String getRemoteIPAddress() {
		return RemoteIPAddress;
	}
	public void setRemoteIPAddress(String remoteIPAddress) {
		RemoteIPAddress = remoteIPAddress;
	}
	public ESDUEP(String endPoint, String localIPAddress, int vLANID, String remoteIPAddress) {
		super();
		EndPoint = endPoint;
		LocalIPAddress = localIPAddress;
		VLANID = vLANID;
		RemoteIPAddress = remoteIPAddress;
	}
	public ESDUEP() {
		
	}
	@Override
	public String toString() {
		return "ESDUEP [EndPoint=" + EndPoint + ", LocalIPAddress=" + LocalIPAddress + ", VLANID=" + VLANID
				+ ", RemoteIPAddress=" + RemoteIPAddress + "]";
	}
	
	
	
}
