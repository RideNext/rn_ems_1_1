
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
public class DeviceNTFAttributes {
	@JsonProperty("notificationRecipientAddress")
	private String notificationRecipientAddress;

	public String getNotificationRecipientAddress() {
		return notificationRecipientAddress;
	}

	public void setNotificationRecipientAddress(String notificationRecipientAddress) {
		this.notificationRecipientAddress = notificationRecipientAddress;
	}

	public DeviceNTFAttributes(String notificationRecipientAddress) {
		super();
		this.notificationRecipientAddress = notificationRecipientAddress;
	}

	public DeviceNTFAttributes() {
		
	}

	@Override
	public String toString() {
		return "DeviceNTFAttributes [notificationRecipientAddress=" + notificationRecipientAddress + "]";
	}
	
	

}
