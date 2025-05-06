package com.nbi.entity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;
@Component

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Response {
	
	private String id;
	private String result;
	private String message;
		

}
