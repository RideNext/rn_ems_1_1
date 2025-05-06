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

import org.springframework.data.elasticsearch.annotations.Field;

import com.nbi.enums.AlarmEnum.priority;
@Data
@NoArgsConstructor
@AllArgsConstructor

public class CommonEventHeader {
	@Field(name = "source-id")
	private String sourceId;
	@Field(name = "start-epoch-microsec")
	private long startEpochMicrosec;
	@Field(name = "event-id")
	private String eventId;
	@Field(name = "time-zone-offset")
	private String timeZoneOffset;
	@Field(name = "internal-header-fields")
	private InternalHeaderFields internalHeaderFields;
	@Field(name = "priority")
	private priority priority; 
	@Field(name = "version")
    private String version;
	@Field(name = "reporting-entity-name")
    private String reportingEntityName;
	@Field(name = "sequence")
    private long sequence;
	@Field(name = "domain")
    private String domain;
	@Field(name = "last-epoch-microsec")
    private long lastEpochMicrosec;
	@Field(name = "event-name")
    private String eventName;
	@Field(name = "ves-event-listener-version")
    private String vesEventListenerVersion;
	@Field(name = "source-name")
    private String sourceName;
}
