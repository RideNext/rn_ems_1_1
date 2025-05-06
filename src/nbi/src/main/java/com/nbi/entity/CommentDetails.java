package com.nbi.entity;

import javax.validation.constraints.NotNull;

import org.springframework.stereotype.Component;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;
import lombok.NoArgsConstructor;
@Component

@Data
@NoArgsConstructor
public class CommentDetails {
	@JsonProperty("comment")
	private String comment;

}
