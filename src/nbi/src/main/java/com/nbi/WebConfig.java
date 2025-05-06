
 /***
  * ################################################################################################
  * #                                                                                              #
  * #   Copyright (C)  [2019]  [RideNext Software Solutions Pvt Ltd]. All rights  reserved         #
  * #                                                                                              #
  * ################################################################################################
 ****/

package com.nbi;

import io.github.bucket4j.Bucket;

import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.nbi.RateLimitingFilter;

@Configuration
public class WebConfig {

    @Bean
    public FilterRegistrationBean<RateLimitingFilter> rateLimitingFilter(Bucket bucket) {
        FilterRegistrationBean<RateLimitingFilter> registrationBean = new FilterRegistrationBean<>();
        registrationBean.setFilter(new RateLimitingFilter(bucket));
        registrationBean.addUrlPatterns("/nbi"); // Apply filter to specific URL patterns
        return registrationBean;
    }
}

