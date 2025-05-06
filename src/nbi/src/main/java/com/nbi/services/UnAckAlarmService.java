
 /***
  * ################################################################################################
  * #                                                                                              #
  * #   Copyright (C)  [2019]  [RideNext Software Solutions Pvt Ltd]. All rights  reserved         #
  * #                                                                                              #
  * ################################################################################################
 ****/

package com.nbi.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.nbi.controllers.AckAlarmController;
import com.nbi.controllers.UnAckAlarmController;
import com.nbi.entity.AckAlarm;
import com.nbi.entity.Alarm;
import com.nbi.entity.AlarmId;
import com.nbi.entity.Event;
import com.nbi.entity.FaultFields;
import com.nbi.entity.Response;
import com.nbi.entity.ResponseStructure;
import com.nbi.entity.UnAckAlarm;
import com.nbi.entity.alarmAdditionalInformation;


@Service
public class UnAckAlarmService {
	@Value("${SIZE}")
	private int allowedSize;
	 @Autowired
	 private AlarmService AlarmService;
	 
	    private static final Logger logger = LoggerFactory.getLogger(UnAckAlarmController.class);
	 
	    public Page<UnAckAlarm> listUnAckAlarm(Pageable pageable) {
	        return null;
	    }
	    public ResponseStructure createUnAckAlarm(UnAckAlarm ackAlarm) {
	    	try {
	    		List<AlarmId> alarms = ackAlarm.getAlarms();
	    		if(alarms.size() <= allowedSize && alarms.size() > 0 && ackAlarm.getUnackDetails().getUnackedBy() != "") {
	        	List<Response> response=new ArrayList<>();
	        	ResponseStructure responsestructure = new ResponseStructure();
	        	for (AlarmId alarm:alarms) {
	        		Response response1=new Response();
	        		try {
	        			Alarm getalarm= AlarmService.retrieveAlarm(alarm.getId());
	        			Event event = getalarm.getEvent();
	            		FaultFields faultfields = event.getFaultFields();
	            		alarmAdditionalInformation alarmadditionalinfo = faultfields.getAlarmAdditionalInformation();
	            		alarmadditionalinfo.setAckedBy(ackAlarm.getUnackDetails().getUnackedBy());
	            		alarmadditionalinfo.setAckUpdatedTime(System.currentTimeMillis()*1000);
	            		String commentstring = getalarm.getEvent().getFaultFields().getAlarmAdditionalInformation().getAlarmComment();
	            		String newComment = (alarm.getComment() != null ? alarm.getComment() : ackAlarm.getUnackDetails().getComment());
	                        if (newComment != null && !newComment.isEmpty()) {
	                        commentstring = (commentstring == null || commentstring.isEmpty())  ? newComment : commentstring + "," + newComment;
	                        }
	            		alarmadditionalinfo.setAlarmComment(commentstring);
				alarmadditionalinfo.setAlarmAcked(false);
	            		faultfields.setAlarmAdditionalInformation(alarmadditionalinfo);
	            		event.setFaultFields(faultfields);
	            		getalarm.setEvent(event);
	            		AlarmService.createAlarm(getalarm);
	            		response1.setId(alarm.getId());
	                    response1.setMessage("successfully unacked");
	                    response1.setResult("success");
	                    response.add(response1);
	        		}
	        		catch(Exception e){
	        			response1.setId(alarm.getId());
	                    response1.setMessage("Alarm is not active. It was cleared by device.");
	                    response1.setResult("failed");
	                    response.add(response1);
	        		}
	        	}
	responsestructure.setAlarms(response);
	        	
	        	return responsestructure;
	        		
	        	}
	    		else if(alarms.size() > allowedSize && ackAlarm.getUnackDetails().getUnackedBy() != "") {
	    			Response response1=new Response();
	    			ResponseStructure responsestructure = new ResponseStructure();
	    			List<Response> response=new ArrayList<>();
	    			response1.setId("");
	                response1.setMessage("Input Number of Alarms should be less than "+ allowedSize);
	                response1.setResult("failed");
	                response.add(response1);
	                responsestructure.setAlarms(response);
	                return responsestructure;
	    		}
	    		
	    		else{
	    			Response response1=new Response();
	    			ResponseStructure responsestructure = new ResponseStructure();
	    			List<Response> response=new ArrayList<>();
	    			response1.setId("");
	                response1.setMessage("Missing parameters {unackedBy} {id}");
	                response1.setResult("failed");
	                response.add(response1);
	                responsestructure.setAlarms(response);
	                return responsestructure;
	    		}
	        	
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
