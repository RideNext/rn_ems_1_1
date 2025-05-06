
 /***
  * ################################################################################################
  * #                                                                                              #
  * #   Copyright (C)  [2019]  [RideNext Software Solutions Pvt Ltd]. All rights  reserved         #
  * #                                                                                              #
  * ################################################################################################
 ****/

package com.nbi.services;

import com.nbi.controllers.ClearAlarmController;
import com.nbi.entity.Alarm;
import com.nbi.entity.AlarmId;
import com.nbi.entity.ClearAlarm;
import com.nbi.entity.ClearEvent;
import com.nbi.entity.ClearFaultFields;
import com.nbi.entity.Event;
import com.nbi.entity.FaultFields;
import com.nbi.entity.PostClearAlarm;
import com.nbi.entity.Response;
import com.nbi.entity.ResponseStructure;
import com.nbi.entity.alarmAdditionalInformation;
import com.nbi.entity.clearalarmAdditionalInformation;
import com.nbi.repository.ClearAlarmRepository;
import java.lang.RuntimeException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.HttpServerErrorException;
import org.springframework.web.client.ResourceAccessException;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class ClearAlarmService {

    @Autowired
    private ClearAlarmRepository clearAlarmRepository;
	@Autowired
	private AlarmService AlarmService;
    @Value("${SIZE}")
   	private int allowedSize;
    private static final Logger logger = LoggerFactory.getLogger(ClearAlarmController.class);
    
    public ResponseStructure createClearAlarm(PostClearAlarm clearAlarm) {
    	try {
    		List<AlarmId> alarms = clearAlarm.getAlarms();
    		if(alarms.size() <= allowedSize && alarms.size() > 0 && clearAlarm.getClearDetails().getClearedBy() != "") {
        	List<Response> response=new ArrayList<>();
        	ResponseStructure responsestructure = new ResponseStructure();
        	for (AlarmId alarm:alarms) {
        		Response response1=new Response();
        		try {
        			
        			Alarm getalarm= AlarmService.retrieveAlarm(alarm.getId());
        			String commentstring = getalarm.getEvent().getFaultFields().getAlarmAdditionalInformation().getAlarmComment();
            		String newComment = (alarm.getComment() != null ? alarm.getComment() : clearAlarm.getClearDetails().getComment());
                        if (newComment != null && !newComment.isEmpty()) {
                        commentstring = (commentstring == null || commentstring.isEmpty())  ? newComment : commentstring + "," + newComment;
                        }
        			ClearAlarm clearalarm = new ClearAlarm();
        			clearalarmAdditionalInformation clearinfo = new clearalarmAdditionalInformation();
        			clearinfo.setAckedBy(getalarm.getEvent().getFaultFields().getAlarmAdditionalInformation().getAckedBy());
        			clearinfo.setAckUpdatedTime(getalarm.getEvent().getFaultFields().getAlarmAdditionalInformation().getAckUpdatedTime());
        			clearinfo.setAlarmAcked(getalarm.getEvent().getFaultFields().getAlarmAdditionalInformation().isAlarmAcked());
        			clearinfo.setAlarmAction(getalarm.getEvent().getFaultFields().getAlarmAdditionalInformation().getAlarmAction());
        			clearinfo.setAlarmComment(commentstring);
        			clearinfo.setAlarmId(getalarm.getEvent().getFaultFields().getAlarmAdditionalInformation().getAlarmId());
        			clearinfo.setClearedBy(clearAlarm.getClearDetails().getClearedBy());
        			clearinfo.setCounter(getalarm.getEvent().getFaultFields().getAlarmAdditionalInformation().getCounter());
        			clearinfo.setDeviceCleared(false);
        			clearinfo.setForwardingEpochMicrosec(getalarm.getEvent().getFaultFields().getAlarmAdditionalInformation().getForwardingEpochMicrosec());
        			clearinfo.setForwardingSystemId(getalarm.getEvent().getFaultFields().getAlarmAdditionalInformation().getForwardingSystemId());
        			clearinfo.setForwardingSystemName(getalarm.getEvent().getFaultFields().getAlarmAdditionalInformation().getForwardingSystemName());
        			clearinfo.setId(getalarm.getEvent().getFaultFields().getAlarmAdditionalInformation().getId());
        			ClearFaultFields clearfault = new ClearFaultFields();
        			clearfault.setAlarmCondition(getalarm.getEvent().getFaultFields().getAlarmCondition());
        			clearfault.setAlarmAdditionalInformation(clearinfo);
        			clearfault.setAlarmInterfaceA(getalarm.getEvent().getFaultFields().getAlarmInterfaceA());
        			clearfault.setEventSeverity(getalarm.getEvent().getFaultFields().getEventSeverity());
        			clearfault.setEventSourceType(getalarm.getEvent().getFaultFields().getEventSourceType());
        			clearfault.setFaultFieldsVersion(getalarm.getEvent().getFaultFields().getFaultFieldsVersion());
        			clearfault.setSpecificProblem(getalarm.getEvent().getFaultFields().getSpecificProblem());
        			clearfault.setVfStatus(getalarm.getEvent().getFaultFields().getVfStatus());
        			ClearEvent clearevent = new ClearEvent();
        			clearevent.setFaultFields(clearfault);
        			clearevent.setCommonEventHeader(getalarm.getEvent().getCommonEventHeader());
        			clearevent.getCommonEventHeader().setLastEpochMicrosec(System.currentTimeMillis()*1000);
        			clearalarm.setEvent(clearevent);
        			clearAlarmRepository.save(clearalarm);
        			AlarmService.deleteAlarm(alarm.getId());
        			response1.setId(alarm.getId());
                    response1.setMessage("successfully cleared");
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
    		else if(alarms.size() > allowedSize && clearAlarm.getClearDetails().getClearedBy() != "") {
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
            throw new RuntimeException("Internal server error");
        }
    }
    
    public Page<ClearAlarm> listClearAlarm(Pageable pageable) {
        try {
        	Page<ClearAlarm> listalarms= clearAlarmRepository.findAll(pageable);
        	logger.info("Connection to database successful");
        	return listalarms;
        }
        catch (HttpClientErrorException e) {
            if (e.getStatusCode() == HttpStatus.UNAUTHORIZED) {
                logger.error("Unauthorized: " + e.getMessage());
                throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Unauthorized access", e);
            } else if (e.getStatusCode() == HttpStatus.BAD_REQUEST) {
                logger.error("Bad Request: " + e.getMessage());
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Bad request", e);
            }else if(e.getStatusCode() == HttpStatus.NOT_FOUND) {
                logger.error("Not Found: " + e.getMessage());
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Not Found", e);
            } else {
                logger.error("Internal server error: " + e.getMessage());
                throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Server error", e);
            }
        } catch (HttpServerErrorException e) {
            logger.error("Internal server error: " + e.getMessage());
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Internal server error", e);
        } catch (ResourceAccessException e) {
            logger.error("Request timeout error: " + e.getMessage());
            throw new ResponseStatusException(HttpStatus.REQUEST_TIMEOUT, "Request timeout", e);
        }
        catch (ResponseStatusException e) {
         // Pass through any pre-existing ResponseStatusException without wrapping
            throw e;
 	}
  	catch (Exception e) { 
 		logger.error("Unexpected error: " + e.getMessage()); 	
 		throw new RuntimeException("Internal server error");
 	    } 
    }
    
}
