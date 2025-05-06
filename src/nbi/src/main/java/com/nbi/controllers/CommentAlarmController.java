
 /***
  * ################################################################################################
  * #                                                                                              #
  * #   Copyright (C)  [2019]  [RideNext Software Solutions Pvt Ltd]. All rights  reserved         #
  * #                                                                                              #
  * ################################################################################################
 ****/

package com.nbi.controllers;

import java.util.List;

import com.nbi.entity.ResponseStructure;
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
import com.nbi.entity.Response;
import com.nbi.entity.CommentAlarm;
import com.nbi.services.CommentAlarmService;

import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/nbi/v1/alarmManagement/commentAlarm")
@Tag(name = "commentAlarm")
public class CommentAlarmController {
	
	@Autowired
    private CommentAlarmService CommentAlarmService;
	
    
	private static final Logger logger = LoggerFactory.getLogger(CommentAlarmController.class);

    @PostMapping
    public ResponseEntity<ResponseStructure> createcommentAlarm(@RequestBody CommentAlarm commentAlarm) {
    	try {
    		logger.debug("--------------------------");
    		logger.debug("Creating AckAlarm");
    		ResponseStructure res  = CommentAlarmService.createCommentAlarm(commentAlarm); // Save the initial state
                
            logger.debug("Successfully Created CommentAlarm");
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
