/***
  * ################################################################################################
  * #                                                                                              #
  * #   Copyright (C)  [2019]  [RideNext Software Solutions Pvt Ltd]. All rights  reserved         #
  * #                                                                                              #
  * ################################################################################################
 ****/

package com.nbi.entity;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Component;

import com.fasterxml.jackson.annotation.JsonProperty;

@Component
public class DeviceCUCPSecurityAttributes {
    @JsonProperty("integrityProtectAlgoPrio")
    private List<String> integrityProtectAlgoPrio;
    
    @JsonProperty("cipheringAlgoPrio")
    private List<String> cipheringAlgoPrio;

    // Returns an empty list if integrityProtectAlgoPrio is null
    public List<String> getIntegrityProtectAlgoPrio() {
        return integrityProtectAlgoPrio != null ? integrityProtectAlgoPrio : new ArrayList<>();
    }

    // Setter for integrityProtectAlgoPrio
    public void setIntegrityProtectAlgoPrio(List<String> integrityProtectAlgoPrio) {
        this.integrityProtectAlgoPrio = integrityProtectAlgoPrio;
    }

    // Returns an empty list if cipheringAlgoPrio is null
    public List<String> getCipheringAlgoPrio() {
        return cipheringAlgoPrio != null ? cipheringAlgoPrio : new ArrayList<>();
    }

    // Setter for cipheringAlgoPrio
    public void setCipheringAlgoPrio(List<String> cipheringAlgoPrio) {
        this.cipheringAlgoPrio = cipheringAlgoPrio;
    }

    // Constructor with parameters
    public DeviceCUCPSecurityAttributes(List<String> integrityProtectAlgoPrio, List<String> cipheringAlgoPrio) {
        super();
        this.integrityProtectAlgoPrio = integrityProtectAlgoPrio;
        this.cipheringAlgoPrio = cipheringAlgoPrio;
    }

    // Default constructor
    public DeviceCUCPSecurityAttributes() {}

    // toString method for logging
    @Override
    public String toString() {
        return "CUCPSecurityAttributes [integrityProtectAlgoPrio=" + integrityProtectAlgoPrio + 
               ", cipheringAlgoPrio=" + cipheringAlgoPrio + "]";
    }
}
