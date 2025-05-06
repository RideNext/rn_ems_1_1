
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
public class DeviceDuFHManagement {
    @JsonProperty("du-sync-state")
	private DeviceDuFHManagementDUSyncState syncstate;
    //@JsonProperty("o-du-window")
    //private List<DeviceFHManagementODUWindow> oduwindow;

	@JsonProperty("window-determine-method")
	private DeviceHHODUWindowDetermineMethod windowdeterminemethod;

	public DeviceDuFHManagementDUSyncState getSyncstate() {
		return syncstate;
	}

	public void setSyncstate(DeviceDuFHManagementDUSyncState syncstate) {
		this.syncstate = syncstate;
	}


	public DeviceHHODUWindowDetermineMethod getWindowdeterminemethod() {
		return windowdeterminemethod;
	}

	public void setWindowdeterminemethod(DeviceHHODUWindowDetermineMethod windowdeterminemethod) {
		this.windowdeterminemethod = windowdeterminemethod;
	}

	public DeviceDuFHManagement(DeviceDuFHManagementDUSyncState syncstate, List<DeviceFHManagementODUWindow> oduwindow,
			DeviceHHODUWindowDetermineMethod windowdeterminemethod) {
		super();
		this.syncstate = syncstate;
		this.windowdeterminemethod = windowdeterminemethod;
	}

	public DeviceDuFHManagement() {
		
	}

	@Override
	public String toString() {
		return "DeviceDuFHManagement [syncstate=" + syncstate + ", windowdeterminemethod="
				+ windowdeterminemethod + "]";
	}
	
    
}
