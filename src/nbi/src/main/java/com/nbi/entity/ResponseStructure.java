package com.nbi.entity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;
import org.springframework.stereotype.Component;
@Component

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ResponseStructure {

	private List<Response> alarms;

		
}
