
 /***
  * ################################################################################################
  * #                                                                                              #
  * #   Copyright (C)  [2019]  [RideNext Software Solutions Pvt Ltd]. All rights  reserved         #
  * #                                                                                              #
  * ################################################################################################
 ****/

package com.nbi.controllers;

import io.swagger.v3.oas.annotations.tags.Tag;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.nbi.entity.AckAlarm;
import com.nbi.entity.Response;
import com.nbi.entity.ResponseStructure;
import com.nbi.entity.UnAckAlarm;
import com.nbi.services.AckAlarmService;
import com.nbi.services.UnAckAlarmService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.UUID;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

@RestController
@RequestMapping("/nbi/v1/alarmManagement/unAckAlarm")
@Tag(name = "unackAlarm")
public class UnAckAlarmController {

    @Autowired
    private UnAckAlarmService UnAckAlarmService;
    
    
    private static final Logger logger = LoggerFactory.getLogger(UnAckAlarmController.class);
 
    
    @Autowired
    private ResponseStructure ResponseStructure;
    @Autowired
    private UnAckAlarm unackalarm;
    private final ObjectMapper objectMapper = new ObjectMapper();

    @PostMapping
    public ResponseEntity<ResponseStructure> createAckAlarm(@RequestBody UnAckAlarm ackAlarm) {
        try {
        	
        	logger.debug("--------------------------");
        	logger.debug("Acknowledging alarms");
        	logger.debug(objectMapper.writeValueAsString(ackAlarm));
        	ResponseStructure res = UnAckAlarmService.createUnAckAlarm(ackAlarm);
            int status = HttpStatus.OK.value();
             for (Response res1 : res.getAlarms()) {
                 if ("failed".equals(res1.getResult())) {
                     status = HttpStatus.MULTI_STATUS.value();
                     break;
                 }
             }
        	return ResponseEntity.status(status).body(res);            
        } catch (ResponseStatusException e) {
        	int statusCode = e.getRawStatusCode();
            if (statusCode == 404) {
            	 logger.error("Not Found: " + e.getMessage());
            	 throw e;
            } else if (statusCode == 400) {
            	 logger.error("Bad Request: " + e.getMessage());
            	 throw e;
            } else if (statusCode == 408) {
            	 logger.error("Request Timeout: " + e.getMessage());
            	 throw e;
            } else if (statusCode == 401) {
            	 logger.error("UnAuthorized: " + e.getMessage());
            	 throw e;
            } else {
            	 logger.error("Internal Server Error: " + e.getMessage());
            	 throw e;
            }
        }catch (Exception e) {
            logger.error("Unexpected error: " + e.getMessage());
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Unexpected error occurred", e);
        }
    }
    
}
