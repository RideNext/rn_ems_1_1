
 /***
  * ################################################################################################
  * #                                                                                              #
  * #   Copyright (C)  [2019]  [RideNext Software Solutions Pvt Ltd]. All rights  reserved         #
  * #                                                                                              #
  * ################################################################################################
 ****/

package com.nbi.services;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.nbi.controllers.AckAlarmController;
import com.nbi.entity.AckAlarm;
import com.nbi.entity.AlarmId;
import com.nbi.repository.AlarmRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import com.nbi.entity.Alarm;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.nbi.entity.Event;
import com.nbi.entity.Response;
import com.nbi.entity.ResponseStructure;
import com.nbi.entity.CommonEventHeader;
import com.nbi.entity.FaultFields;
import com.nbi.entity.alarmAdditionalInformation;
import com.nbi.entity.AlarmId;
import com.nbi.entity.AckDetails;
@Service
public class AckAlarmService {
	@Autowired
	private AlarmService AlarmService;
	@Autowired
	private AlarmRepository AlarmRepository;
	 @Value("${SIZE}")
	private int allowedSize;
	private final ObjectMapper objectMapper = new ObjectMapper();
    private static final Logger logger = LoggerFactory.getLogger(AckAlarmController.class);
    public ResponseStructure createAckAlarm(AckAlarm ackAlarm) {
    	try {
    		List<AlarmId> alarms = ackAlarm.getAlarms();
    		if(alarms.size() <= allowedSize && alarms.size() > 0 && ackAlarm.getAckDetails().getAckedBy() != "") {
        	List<Response> response=new ArrayList<>();
        	ResponseStructure responsestructure = new ResponseStructure();
        	for (AlarmId alarm:alarms) {
        		Response response1=new Response();
        		try {
        			Alarm getalarm= AlarmService.retrieveAlarm(alarm.getId());
        			Event event = getalarm.getEvent();
            		FaultFields faultfields = event.getFaultFields();
            		alarmAdditionalInformation alarmadditionalinfo = faultfields.getAlarmAdditionalInformation();
            		alarmadditionalinfo.setAckedBy(ackAlarm.getAckDetails().getAckedBy());
            		alarmadditionalinfo.setAckUpdatedTime(System.currentTimeMillis()*1000);
            		String commentstring = getalarm.getEvent().getFaultFields().getAlarmAdditionalInformation().getAlarmComment();
            		String newComment = (alarm.getComment() != null ? alarm.getComment() : ackAlarm.getAckDetails().getComment());
                        if (newComment != null && !newComment.isEmpty()) {
                        commentstring = (commentstring == null || commentstring.isEmpty())  ? newComment : commentstring + "," + newComment;
                        }
            		alarmadditionalinfo.setAlarmComment(commentstring);
			alarmadditionalinfo.setAlarmAcked(true);
            		faultfields.setAlarmAdditionalInformation(alarmadditionalinfo);
            		event.setFaultFields(faultfields);
            		getalarm.setEvent(event);
            		AlarmService.createAlarm(getalarm);
            		response1.setId(alarm.getId());
                    response1.setMessage("successfully acked");
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
    		else if(alarms.size() > allowedSize && ackAlarm.getAckDetails().getAckedBy() != "") {
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
                response1.setMessage("Missing parameters {ackedBy} {id}");
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
