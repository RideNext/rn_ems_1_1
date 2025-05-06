 /***
  * ################################################################################################
  * #                                                                                              #
  * #   Copyright (C)  [2019]  [RideNext Software Solutions Pvt Ltd]. All rights  reserved         #
  * #                                                                                              #
  * ################################################################################################
 ****/

package com.nbi;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.servers.Server;
import java.util.Collections;

@Configuration
public class SwaggerConfig {
         
	@Value("${swagger.server-url}")private String serverUrl;
    @Bean
	public OpenAPI customOpenAPI() {
                
        	return new OpenAPI()
            		.servers(Collections.singletonList(
                	new Server().url(serverUrl)
            	));
    	}
}
