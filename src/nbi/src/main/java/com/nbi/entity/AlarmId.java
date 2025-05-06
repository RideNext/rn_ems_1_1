
 /***
  * ################################################################################################
  * #                                                                                              #
  * #   Copyright (C)  [2019]  [RideNext Software Solutions Pvt Ltd]. All rights  reserved         #
  * #                                                                                              #
  * ################################################################################################
 ****/

package com.nbi.entity;
import javax.validation.constraints.NotNull;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class AlarmId {
        @NotNull(message = "ID is mandatory")
	@JsonProperty("id")
        private String id;
	@JsonProperty("comment")
	private String comment;
	
	
}
