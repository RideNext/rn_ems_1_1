
 /***
  * ################################################################################################
  * #                                                                                              #
  * #   Copyright (C)  [2019]  [RideNext Software Solutions Pvt Ltd]. All rights  reserved         #
  * #                                                                                              #
  * ################################################################################################
 ****/

package com.nbi.entity;

import java.util.List;
import com.nbi.entity.DeviceRRH;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonAlias;

@Component
public class DeviceDataManagedElement {
    private int id;

    @JsonProperty("_3gpp-nr-nrm-gnbcuupfunction:GNBCUUPFunction")
    private List<DeviceCUUP>gnbcuupfunction;

    @JsonProperty("_3gpp-nr-nrm-gnbcucpfunction:GNBCUCPFunction")
    private List<DeviceCUCP> gnbcucpfunction; // Use consistent camelCase

    @JsonProperty("_3gpp-nr-nrm-gnbdufunction:GNBDUFunction")
    private List<DeviceDU> gnbdufunction;

    @JsonProperty("_3gpp-common-subscription-control:NtfSubscriptionControl")
    private List<DeviceNTF> ntfSubscriptionControl;
    
    @JsonProperty("proprietary_gNodeB_RRH_Data_Model:RRHList")
    private List<DeviceRRH> rrh;
    @JsonProperty("MeasurementControl")
    private List<DeviceMeasurementControl>measurementControl;

    public List<DeviceRRH> getRrh() {
		return rrh;
	}

	public void setRrh(List<DeviceRRH> rrh) {
		this.rrh = rrh;
	}

	private DeviceDataManagedElementAttributes attributes;

    // Getters and setters
    public int getId() {
        return id;
    }

    public List<DeviceMeasurementControl> getMeasurementControl() {
		return measurementControl;
	}

	public void setMeasurementControl(List<DeviceMeasurementControl> measurementControl) {
		this.measurementControl = measurementControl;
	}

	public void setId(int id) {
        this.id = id;
    }

    public List<DeviceCUUP> getGNBCUUPFunction() {
        return gnbcuupfunction;
    }

    public void setGNBCUUPFunction(List<DeviceCUUP> gnbcuupfunction) {
        this.gnbcuupfunction = gnbcuupfunction;
    }

    public List<DeviceCUCP> getGNBCUCPFunction() {
        return gnbcucpfunction;
    }

    public void setGNBCUCPFunction(List<DeviceCUCP> gnbcucpfunction) {
        this.gnbcucpfunction = gnbcucpfunction;
    }

    public List<DeviceDU> getGNBDUFunction() {
        return gnbdufunction;
    }

    public void setGNBDUFunction(List<DeviceDU> gnbdufunction) {
        this.gnbdufunction = gnbdufunction;
    }

    public List<DeviceNTF> getNtfSubscriptionControl() {
        return ntfSubscriptionControl;
    }

    public void setNtfSubscriptionControl(List<DeviceNTF> ntfSubscriptionControl) {
        this.ntfSubscriptionControl = ntfSubscriptionControl;
    }

    public DeviceDataManagedElementAttributes getAttributes() {
        return attributes;
    }

    public void setAttributes(DeviceDataManagedElementAttributes attributes) {
        this.attributes = attributes;
    }

	public DeviceDataManagedElement(int id, List<DeviceCUUP> gnbcuupfunction, List<DeviceCUCP> gnbcucpfunction,
			List<DeviceDU> gnbdufunction, List<DeviceNTF> ntfSubscriptionControl, List<DeviceRRH> rrh,
			List<DeviceMeasurementControl> measurementControl, DeviceDataManagedElementAttributes attributes) {
		super();
		this.id = id;
		this.gnbcuupfunction = gnbcuupfunction;
		this.gnbcucpfunction = gnbcucpfunction;
		this.gnbdufunction = gnbdufunction;
		this.ntfSubscriptionControl = ntfSubscriptionControl;
		this.rrh = rrh;
		this.measurementControl = measurementControl;
		this.attributes = attributes;
	}

	@Override
	public String toString() {
		return "DeviceDataManagedElement [id=" + id + ", gnbcuupfunction=" + gnbcuupfunction + ", gnbcucpfunction="
				+ gnbcucpfunction + ", gnbdufunction=" + gnbdufunction + ", ntfSubscriptionControl="
				+ ntfSubscriptionControl + ", rrh=" + rrh + ", attributes=" + attributes + "]";
	}

	public DeviceDataManagedElement() {
		super();
	}


    
}
