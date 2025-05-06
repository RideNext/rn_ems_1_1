
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
@Data
@NoArgsConstructor
@AllArgsConstructor
public class emsAdditionalInformation {
  @Field(name ="counter")
	private int counter;
  @Field(name ="is-alarm-acked")
	private boolean isAlarmAcked;
  @Field(name ="alarm-comment")
	private String alarmComment;
  @Field(name ="acked-by")
	private String ackedBy;
  @Field(name ="ack-time")
	private long ackUpdatedTime;
 	@Field(name ="forwarding-time")
	private long forwardingTime;
	@Field(name ="forwarding-system")
	private String forwardingSystem;
}

