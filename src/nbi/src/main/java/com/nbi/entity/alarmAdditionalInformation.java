
 /***
  * ################################################################################################
  * #                                                                                              #
  * #   Copyright (C)  [2019]  [RideNext Software Solutions Pvt Ltd]. All rights  reserved         #
  * #                                                                                              #
  * ################################################################################################
 ****/
 
package com.nbi.entity;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Field;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.nbi.enums.AlarmEnum.alarmAction;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import io.swagger.v3.oas.annotations.media.Schema;
import org.springframework.stereotype.Component;
@Component
@Data
@NoArgsConstructor
@AllArgsConstructor


public class alarmAdditionalInformation {
	@Field(name ="alarm-id")
	private String alarmId;
	@Field(name ="alarm-action")
	private alarmAction AlarmAction;
	@Field(name ="forwarding-system-name")
    private String forwardingSystemName;
	@Field(name ="forwarding-system-id")
    private String forwardingSystemId;

	@Field(name ="forwarding-epoch-microsec")
    private long forwardingEpochMicrosec;
	@Field(name ="id")
    private String id;
	@Field(name ="counter")
    private long counter;
	@Field(name ="is-alarm-acked")
  @JsonProperty("isAlarmAcked")
    private boolean isAlarmAcked;
    @Schema(description = "The comments for the alarm, displayed in separate lines.")
	@Field(name ="alarm-comment")
    private String alarmComment;
	@Field(name ="acked-by")
    private String ackedBy;
	@Field(name ="ack-updated-time")
    private long ackUpdatedTime;
}
