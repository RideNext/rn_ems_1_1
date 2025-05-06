
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
public class DeviceDuFHManagementDUSyncState {
    @JsonProperty("du-index")
	private String duindex;
    @JsonProperty("gNBDUId")
    private String gNBDUId;
    @JsonProperty("sync-state")
    private String syncstate;
	public String getDuindex() {
		return duindex;
	}
	public void setDuindex(String duindex) {
		this.duindex = duindex;
	}
	public String getgNBDUId() {
		return gNBDUId;
	}
	public void setgNBDUId(String gNBDUId) {
		this.gNBDUId = gNBDUId;
	}
	public String getSyncstate() {
		return syncstate;
	}
	public void setSyncstate(String syncstate) {
		this.syncstate = syncstate;
	}
	public DeviceDuFHManagementDUSyncState(String duindex, String gNBDUId, String syncstate) {
		super();
		this.duindex = duindex;
		this.gNBDUId = gNBDUId;
		this.syncstate = syncstate;
	}
	public DeviceDuFHManagementDUSyncState() {
		
	}
	@Override
	public String toString() {
		return "DeviceDuFHManagementDUSyncState [duindex=" + duindex + ", gNBDUId=" + gNBDUId + ", syncstate="
				+ syncstate + "]";
	}
	
	
    
    
}
