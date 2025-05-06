 /***
  * ################################################################################################
  * #                                                                                              #
  * #   Copyright (C)  [2019]  [RideNext Software Solutions Pvt Ltd]. All rights  reserved         #
  * #                                                                                              #
  * ################################################################################################
 ****/


package com.nbi.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import com.nbi.enums.AlarmEnum.severity;

import org.springframework.data.elasticsearch.annotations.Field;

import com.nbi.enums.AlarmEnum.VfStatus;
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ClearFaultFields {
	@Field(name ="event-severity")
	private severity eventSeverity;
	@Field(name ="alarm-condition")
	private String alarmCondition;
	@Field(name ="fault-fields-version")
	private String faultFieldsVersion;
	@Field(name ="specific-problem")
	private String specificProblem;
	@Field(name ="alarm-interface-a")
	private String alarmInterfaceA;
	@Field(name ="alarm-additional-information")
	private clearalarmAdditionalInformation alarmAdditionalInformation;
	@Field(name ="event-source-type")
	private String eventSourceType;
	@Field(name ="vf-status")
	private VfStatus vfStatus;
		
}
