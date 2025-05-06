
 /***
  * ################################################################################################
  * #                                                                                              #
  * #   Copyright (C)  [2019]  [RideNext Software Solutions Pvt Ltd]. All rights  reserved         #
  * #                                                                                              #
  * ################################################################################################
 ****/

package com.nbi;

import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.kafka.annotation.EnableKafka;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.web.client.RestTemplate;

@SpringBootApplication
@EnableAsync
@EnableKafka
public class AlarmApplication {

	public static void main(String[] args) {
		SpringApplication.run(AlarmApplication.class, args);
	}
	
	  @Bean
	    public CloseableHttpClient restTemplate() {
		  return HttpClients.createDefault();
	    }
          @Bean
    public RestTemplate restTemplatee() {
        return new RestTemplate();
    }

}
