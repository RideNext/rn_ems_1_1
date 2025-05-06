package com.nbi.entity;

import org.springframework.stereotype.Component;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Component
public class UnackDetails {
	
	@JsonProperty("unackedBy")
	private String unackedBy;
	@JsonProperty("comment")
	private String comment;
	public String getUnackedBy() {
		return unackedBy;
	}
	public void setUnackedBy(String unackedBy) {
		this.unackedBy = unackedBy;
	}
	public String getComment() {
		return comment;
	}
	public void setComment(String comment) {
		this.comment = comment;
	}
	

}
