
 /***
  * ################################################################################################
  * #                                                                                              #
  * #   Copyright (C)  [2019]  [RideNext Software Solutions Pvt Ltd]. All rights  reserved         #
  * #                                                                                              #
  * ################################################################################################
 ****/


package com.nbi.entity;

import org.springframework.data.elasticsearch.annotations.Field;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class ClearEvent {
	@Field(name = "common-event-header")
	private CommonEventHeader commonEventHeader;
	@Field(name = "fault-fields")
    private ClearFaultFields faultFields;
	
	
}
