
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
public class DeviceDuAttributesORANConfigMacConfigQosListMacListULList {
	
	@JsonProperty("prioritised-bitrate")
	public String prioritisedbitrate;
	@JsonProperty("logical-channel-sr-delay-timer-applied")
	public String logicalchannelsrdelaytimerapplied;
	@JsonProperty("logical-channel-sr-mask")
	public String logicalchannelsrmask;
	@JsonProperty("max-ul-harq-tx")
	public int maxulharqtx;
	@JsonProperty("bucket-size-duration")
	public String bucketsizeduration;
	@JsonProperty("logical-channnel-group")
	public int logicalchannnelgroup;
	public String getPrioritisedbitrate() {
		return prioritisedbitrate;
	}
	public void setPrioritisedbitrate(String prioritisedbitrate) {
		this.prioritisedbitrate = prioritisedbitrate;
	}
	public String getLogicalchannelsrdelaytimerapplied() {
		return logicalchannelsrdelaytimerapplied;
	}
	public void setLogicalchannelsrdelaytimerapplied(String logicalchannelsrdelaytimerapplied) {
		this.logicalchannelsrdelaytimerapplied = logicalchannelsrdelaytimerapplied;
	}
	public String getLogicalchannelsrmask() {
		return logicalchannelsrmask;
	}
	public void setLogicalchannelsrmask(String logicalchannelsrmask) {
		this.logicalchannelsrmask = logicalchannelsrmask;
	}
	public int getMaxulharqtx() {
		return maxulharqtx;
	}
	public void setMaxulharqtx(int maxulharqtx) {
		this.maxulharqtx = maxulharqtx;
	}
	public String getBucketsizeduration() {
		return bucketsizeduration;
	}
	public void setBucketsizeduration(String bucketsizeduration) {
		this.bucketsizeduration = bucketsizeduration;
	}
	public int getLogicalchannnelgroup() {
		return logicalchannnelgroup;
	}
	public void setLogicalchannnelgroup(int logicalchannnelgroup) {
		this.logicalchannnelgroup = logicalchannnelgroup;
	}
	public DeviceDuAttributesORANConfigMacConfigQosListMacListULList(String prioritisedbitrate,
			String logicalchannelsrdelaytimerapplied, String logicalchannelsrmask, int maxulharqtx,
			String bucketsizeduration, int logicalchannnelgroup) {
		super();
		this.prioritisedbitrate = prioritisedbitrate;
		this.logicalchannelsrdelaytimerapplied = logicalchannelsrdelaytimerapplied;
		this.logicalchannelsrmask = logicalchannelsrmask;
		this.maxulharqtx = maxulharqtx;
		this.bucketsizeduration = bucketsizeduration;
		this.logicalchannnelgroup = logicalchannnelgroup;
	}
	public DeviceDuAttributesORANConfigMacConfigQosListMacListULList() {
		
	}
	@Override
	public String toString() {
		return "DeviceDuAttributesORANConfigMacConfigQosListMacListULList [prioritisedbitrate=" + prioritisedbitrate
				+ ", logicalchannelsrdelaytimerapplied=" + logicalchannelsrdelaytimerapplied + ", logicalchannelsrmask="
				+ logicalchannelsrmask + ", maxulharqtx=" + maxulharqtx + ", bucketsizeduration=" + bucketsizeduration
				+ ", logicalchannnelgroup=" + logicalchannnelgroup + "]";
	}
	
	

}
