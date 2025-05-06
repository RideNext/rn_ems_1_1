/***
  * ################################################################################################
  * #                                                                                              #
  * #   Copyright (C)  [2019]  [RideNext Software Solutions Pvt Ltd]. All rights  reserved         #
  * #                                                                                              #
  * ################################################################################################
 ****/

package com.nbi.entity;

import org.springframework.stereotype.Component;
import com.fasterxml.jackson.annotation.JsonProperty;

@Component
public class DeviceCUCPSecurityHandling {
    private String id;

    @JsonProperty("attributes")
    private DeviceCUCPSecurityAttributes attributes;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    // Return a new DeviceCUCPSecurityAttributes instance if attributes is null
    public DeviceCUCPSecurityAttributes getAttributes() {
        return attributes != null ? attributes : new DeviceCUCPSecurityAttributes();
    }

    public void setAttributes(DeviceCUCPSecurityAttributes attributes) {
        this.attributes = attributes;
    }

    // Constructor with parameters
    public DeviceCUCPSecurityHandling(String id, DeviceCUCPSecurityAttributes attributes) {
        super();
        this.id = id;
        this.attributes = attributes;
    }

    // Default constructor
    public DeviceCUCPSecurityHandling() {}

    // toString method for logging
    @Override
    public String toString() {
        return "CUCPSecurityHandling [id=" + id + ", attributes=" + attributes + "]";
    }
}
