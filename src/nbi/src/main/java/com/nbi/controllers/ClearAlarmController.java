
 /***
  * ################################################################################################
  * #                                                                                              #
  * #   Copyright (C)  [2019]  [RideNext Software Solutions Pvt Ltd]. All rights  reserved         #
  * #                                                                                              #
  * ################################################################################################
 ****/

package com.nbi.controllers;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.nbi.entity.ClearAlarm;
import com.nbi.entity.PostClearAlarm;
import com.nbi.entity.Response;
import com.nbi.entity.ResponseStructure;
import com.nbi.repository.ClearAlarmRepository;
import com.nbi.services.ClearAlarmService;

import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/nbi/v1/alarmManagement/clearAlarm")
@Tag(name = "clearAlarm")
public class ClearAlarmController {
	
	@Autowired
    private ClearAlarmService ClearAlarmService;
	
	@Autowired
    private ClearAlarmRepository ClearAlarmRepository;
    
	private static final Logger logger = LoggerFactory.getLogger(ClearAlarmController.class);
	
    @PostMapping
    public ResponseEntity<ResponseStructure> createclearAlarm(@RequestBody PostClearAlarm clearAlarm) {
    	   try {
    		   logger.debug("--------------------------");
        	   logger.debug("Creating Clear Alarm");
        	   ResponseStructure res= ClearAlarmService.createClearAlarm(clearAlarm); // Save the initial state
                logger.debug("Successfully created Clear Alarm");
                logger.debug("--------------------------");
                int status = HttpStatus.OK.value();
                for (Response res1 : res.getAlarms()) {
                    if ("failed".equals(res1.getResult())) {
                        status = HttpStatus.MULTI_STATUS.value();
                        break;
                    }
                }
           	return ResponseEntity.status(status).body(res);
    	   }
    	   catch (ResponseStatusException e) {
    	    	int statusCode = e.getRawStatusCode();
    	        if (statusCode == 404) {
    	        	 logger.error("Not Found: " + e.getMessage());
    	        	 throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Not Found", e);
    	        } else if (statusCode == 400) {
    	        	 logger.error("Bad Request: " + e.getMessage());
    	        	 throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Bad Request", e);
    	        } else if (statusCode == 408) {
    	        	 logger.error("Request Timeout: " + e.getMessage());
    	        	 throw new ResponseStatusException(HttpStatus.REQUEST_TIMEOUT, "Request Time out", e);
    	        } else if (statusCode == 401) {
    	        	 logger.error("UnAuthorized: " + e.getMessage());
    	        	 throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Service Unavailable", e);
    	        } else {
    	        	 logger.error("Internal Server Error: " + e.getMessage());
    	        	 throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Internal Server Error", e);
    	        }
    	    }catch (Exception e) {
    	        logger.error("Unexpected error: " + e.getMessage());
    	        throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Unexpected error occurred", e);
    	    }
    }

    @GetMapping
    public ResponseEntity<List<ClearAlarm>> listClearAlarm(
            @RequestParam(name = "pageno", defaultValue = "0") int pageno,
            @RequestParam(name = "pagesize", defaultValue = "10") int pagesize) {

        try {
        	logger.debug("--------------------------");
     	    logger.debug("Listing Clear Alarm");
        	Pageable pageable = PageRequest.of(pageno, pagesize);
            Page<ClearAlarm> clearalarms = ClearAlarmService.listClearAlarm(pageable);
           
     	   logger.debug("Clear Alarms listed successfully");
     	   logger.debug("--------------------------");
            return ResponseEntity.ok(clearalarms.getContent());
        }
        catch (ResponseStatusException e) {
        	int statusCode = e.getRawStatusCode();
            if (statusCode == 404) {
            	 logger.error("Not Found: " + e.getMessage());
            	 throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Not Found", e);
            } else if (statusCode == 400) {
            	 logger.error("Bad Request: " + e.getMessage());
            	 throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Bad Request", e);
            } else if (statusCode == 408) {
            	 logger.error("Request Timeout: " + e.getMessage());
            	 throw new ResponseStatusException(HttpStatus.REQUEST_TIMEOUT, "Request Time out", e);
            } else if (statusCode == 401) {
            	 logger.error("UnAuthorized: " + e.getMessage());
            	 throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Service Unavailable", e);
            } else {
            	 logger.error("Internal Server Error: " + e.getMessage());
            	 throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Internal Server Error", e);
            }
        }catch (Exception e) {
            logger.error("Unexpected error: " + e.getMessage());
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Unexpected error occurred", e);
        }
    }
    
}
