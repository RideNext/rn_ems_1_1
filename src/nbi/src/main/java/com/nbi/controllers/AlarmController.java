
 /***
  * ################################################################################################
  * #                                                                                              #
  * #   Copyright (C)  [2019]  [RideNext Software Solutions Pvt Ltd]. All rights  reserved         #
  * #                                                                                              #
  * ################################################################################################
 ****/

package com.nbi.controllers;

import com.nbi.entity.Alarm;
import com.nbi.services.AlarmService;
import org.springframework.data.domain.Sort;
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
import org.springframework.http.HttpStatus;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.HttpServerErrorException;
import org.springframework.web.client.HttpStatusCodeException;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.client.ResourceAccessException;
import java.util.List;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpServletRequest;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import io.swagger.v3.oas.annotations.tags.Tag;
@RestController
@RequestMapping("/nbi/v1/alarmManagement/alarms")
@Tag(name = "Alarm")
public class AlarmController {

    @Autowired
    private AlarmService AlarmService;
    
    private static final Logger logger = LoggerFactory.getLogger(AlarmController.class);

    @PostMapping
    public ResponseEntity<Alarm> createAlarm(@RequestBody Alarm Alarm) {
       try {
    	   logger.debug("--------------------------");
       	   logger.debug("Creating Alarm");
    	   Alarm createdAlarm = AlarmService.createAlarm(Alarm);
    	   logger.debug("Alarm creation successfull.");
           return ResponseEntity.ok(createdAlarm);
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
public ResponseEntity<List<Alarm>> listAlarm(
        @RequestParam(name = "pageno", defaultValue = "0") int pageno,
        @RequestParam(name = "pagesize", defaultValue = "10") int pagesize,
        HttpServletResponse response,
        HttpServletRequest request) {

    try {
        logger.debug("--------------------------");
        Pageable pageable = PageRequest.of(pageno, pagesize,Sort.by(Sort.Order.asc("event.fault-fields.alarm-additional-information.forwarding-epoch-microsec")));
        Page<Alarm> alarms = AlarmService.listAlarm(pageable,request);
        Cookie[] cookies = request.getCookies();
        String lastVisitedTime = null;
        String lastVisitedId = null;
        String lastVisitedPage = null;
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if ("lastVisitedTime".equals(cookie.getName())) {
                    lastVisitedTime = cookie.getValue();  
                }
                if ("lastVisitedId".equals(cookie.getName())) {
                    lastVisitedId = cookie.getValue();  
                }
                if ("lastVisitedPage".equals(cookie.getName())) {
                    lastVisitedPage = cookie.getValue();  
                }
            }
        }
        if (pageno > alarms.getTotalPages()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Page not found");
        }
        List<Alarm> alarmList = alarms.getContent();
        Alarm lastAlarm = null;
        if (!alarmList.isEmpty()) {
            lastAlarm = alarmList.get(alarmList.size() - 1); 
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Page not found");
        }
        
        if(lastAlarm != null && ( pageno == 0 || Integer.parseInt(lastVisitedPage)+1 == pageno)){
        Cookie pageCookie = new Cookie("lastVisitedTime", String.valueOf(lastAlarm.getEvent().getFaultFields().getAlarmAdditionalInformation().getForwardingEpochMicrosec()));
        Cookie pageCookie1 = new Cookie("lastVisitedId", String.valueOf(lastAlarm.getEvent().getFaultFields().getAlarmAdditionalInformation().getId()));
        Cookie pageCookie2 = new Cookie("lastVisitedPage", String.valueOf(pageno));
        pageCookie.setHttpOnly(true); 
        pageCookie.setMaxAge(60 * 60 * 24); 
        pageCookie.setPath("/");      
        pageCookie1.setHttpOnly(true);  
        pageCookie1.setMaxAge(60 * 60 * 24); 
        pageCookie1.setPath("/");  
        pageCookie2.setHttpOnly(true);  
        pageCookie2.setMaxAge(60 * 60 * 24); 
        pageCookie2.setPath("/"); 
        response.addCookie(pageCookie);
        response.addCookie(pageCookie1);
        response.addCookie(pageCookie2);
        }

        logger.debug("Successfully listed all alarms");
        logger.debug("--------------------------");

        // Extract the content and return it
        return ResponseEntity.ok(alarms.getContent());

    } catch (ResponseStatusException e) {
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
    } catch (Exception e) {
        logger.error("Unexpected error: " + e.getMessage());
        throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Unexpected error occurred", e);
    }
}


}
