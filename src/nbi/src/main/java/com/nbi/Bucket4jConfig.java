
 /***
  * ################################################################################################
  * #                                                                                              #
  * #   Copyright (C)  [2019]  [RideNext Software Solutions Pvt Ltd]. All rights  reserved         #
  * #                                                                                              #
  * ################################################################################################
 ****/

package com.nbi;

import io.github.bucket4j.Bucket;
import io.github.bucket4j.Bucket4j;
import io.github.bucket4j.Bandwidth;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.Duration;

@Configuration
public class Bucket4jConfig {

    @Value("${bucket4j.requests.limit}")
    private int requestLimit;

    @Value("${bucket4j.requests.duration}")
    private String requestDuration;

    @Bean
    public Bucket bucket() {
        Duration duration = Duration.parse("PT" + requestDuration.toUpperCase());
        Bandwidth limit = Bandwidth.simple(requestLimit, duration);
        return Bucket4j.builder()
                       .addLimit(limit)
                       .build();
    }
}
