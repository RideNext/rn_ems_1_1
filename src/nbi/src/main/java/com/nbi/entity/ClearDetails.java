package com.nbi.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;
@Component

@Data
@NoArgsConstructor
public class ClearDetails {
	
	@JsonProperty("clearedBy")
	private String clearedBy;
	@JsonProperty("comment")
	private String comment;
	

}
