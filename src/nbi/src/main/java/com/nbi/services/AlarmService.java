
 /***
  * ################################################################################################
  * #                                                                                              #
  * #   Copyright (C)  [2019]  [RideNext Software Solutions Pvt Ltd]. All rights  reserved         #
  * #                                                                                              #
  * ################################################################################################
 ****/

package com.nbi.services;

import com.nbi.controllers.AlarmController;
import com.nbi.entity.AckAlarm;
import com.nbi.entity.Alarm;
import com.nbi.entity.CommonEventHeader;
import com.nbi.entity.Event;
import com.nbi.entity.FaultFields;
import com.nbi.entity.InternalHeaderFields;
import com.nbi.entity.alarmAdditionalInformation;
import com.nbi.repository.AlarmRepository;
import java.lang.RuntimeException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.HttpServerErrorException;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.client.ResourceAccessException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import java.util.Arrays;
import java.util.stream.Collectors;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpServletRequest;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.client.RestTemplate;
import org.springframework.data.domain.PageImpl;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.Iterator;
import com.nbi.enums.AlarmEnum.alarmAction;
import com.nbi.enums.AlarmEnum.priority;
import com.nbi.enums.AlarmEnum.severity;
import com.nbi.enums.AlarmEnum.VfStatus;
@Service
public class AlarmService {
    @Autowired
    private AlarmRepository AlarmRepository;
    @Autowired
    private RestTemplate restTemplate;
    @Autowired
    private ObjectMapper objectMapper;
    @Value("${SDNR_IP}")
    private String nbiIp;

    private static final Logger logger = LoggerFactory.getLogger(AlarmController.class);
    public Alarm createAlarm(Alarm Alarm) {
        try {
        	Alarm savedAlarm= AlarmRepository.save(Alarm);
        	logger.debug("Connection to database successful");
        	return savedAlarm;
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
        } catch (Exception e) {
            logger.error("Unexpected error: " + e.getMessage());
            throw new RuntimeException("Internal server error");
        }
    }

    public Page<Alarm> listAlarm(Pageable pageable, HttpServletRequest request) {
    try {
        Cookie[] cookies = request.getCookies();
        String lastVisitedTime = null;
        String lastVisitedId = null;
        String lastVisitedPage = null;
        Page<Alarm> alarms = null;
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
        if (lastVisitedTime != null && lastVisitedId != null && lastVisitedPage != null && Integer.parseInt(lastVisitedPage)+1 == pageable.getPageNumber()) {
            logger.debug("Last visited page from cookie: " + lastVisitedTime + "  " + lastVisitedId + " " + lastVisitedPage);
             String jsonPayload = String.format("{\n" +
            "  \"size\": %d,\n" +
            "  \"query\": {\n" +
            "    \"match_all\": {}\n" +
            "  },\n" +
            "  \"sort\": [\n" +
            "    {\n" +
            "      \"event.fault-fields.alarm-additional-information.forwarding-epoch-microsec\": {\n" +
            "        \"order\": \"asc\"\n" +
            "      }\n" +
            "    },\n" +
            "    {\n" +
            "      \"_id\": {\n" +
            "        \"order\": \"asc\"\n" +
            "      }\n" +
            "    }\n" +
            "  ],\n" +
            "  \"search_after\": [%d,\"%s\"]\n" +
            "}", pageable.getPageSize(), Long.parseLong(lastVisitedTime), lastVisitedId);
        logger.debug("payload"+jsonPayload);
        HttpHeaders headers = new HttpHeaders();
        headers.set("Content-Type", "application/json");
        HttpEntity<String> entity = new HttpEntity<>(jsonPayload, headers);
        String url="http://"+nbiIp+":9200/faultcurrent-v7/_search?filter_path=hits.hits._source";
        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.POST, entity, String.class);
        String responseBody = response.getBody();
        List<Alarm> alarmss= new ArrayList<>();
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode rootNode = objectMapper.readTree(responseBody);
            
        JsonNode hitsNode = rootNode.path("hits").path("hits");
            
        Iterator<JsonNode> elements = hitsNode.elements();
        while (elements.hasNext()) {
            Alarm alarm = new Alarm();
            Event event = new Event();
            CommonEventHeader ceh = new CommonEventHeader();
            FaultFields ff = new FaultFields();
            alarmAdditionalInformation aai = new alarmAdditionalInformation();
            InternalHeaderFields ihf = new InternalHeaderFields();
            JsonNode hitNode = elements.next();
            
            JsonNode sourceNode = hitNode.path("_source");
            JsonNode eventNode = sourceNode.path("event");
            JsonNode faultFieldsNode = eventNode.path("fault-fields");
            JsonNode additionalInfoNode = faultFieldsNode.path("alarm-additional-information");
            JsonNode commonInfoNode = eventNode.path("common-event-header");
            JsonNode internal = commonInfoNode.path("internal-header-fields");
            aai.setAlarmId(additionalInfoNode.path("alarm-id").asText());
            aai.setAlarmAction(alarmAction.fromValue(additionalInfoNode.path("alarm-action").asText()));
            aai.setForwardingSystemName(additionalInfoNode.path("forwarding-system-name").asText());
            aai.setForwardingSystemId(additionalInfoNode.path("forwarding-system-id").asText());
            aai.setForwardingEpochMicrosec(additionalInfoNode.path("forwarding-epoch-microsec").asLong());
            aai.setId(additionalInfoNode.path("id").asText());
            aai.setCounter(additionalInfoNode.path("counter").asInt());
            aai.setAlarmAcked(additionalInfoNode.path("is-alarm-acked").asBoolean());
            aai.setAlarmComment(additionalInfoNode.path("alarm-comment").asText());
            aai.setAckedBy(additionalInfoNode.path("acked-by").asText());
            aai.setAckUpdatedTime(additionalInfoNode.path("ack-updated-time").asLong()); 
            ff.setAlarmAdditionalInformation(aai);
            ff.setAlarmCondition(faultFieldsNode.path("alarm-condition").asText());
            ff.setAlarmInterfaceA(faultFieldsNode.path("alarm-interface-a").asText());
            ff.setEventSeverity(severity.fromValue(faultFieldsNode.path("event-severity").asText()));
            ff.setEventSourceType(faultFieldsNode.path("event-source-type").asText());
            ff.setFaultFieldsVersion(faultFieldsNode.path("fault-fields-version").asText());
            ff.setSpecificProblem(faultFieldsNode.path("specific-problem").asText());
            ff.setVfStatus(VfStatus.fromValue(faultFieldsNode.path("vf-status").asText()));
            event.setFaultFields(ff);
            ceh.setDomain(commonInfoNode.path("domain").asText());
            ceh.setEventId(commonInfoNode.path("event-id").asText());
            ceh.setEventName(commonInfoNode.path("event-name").asText());
            ceh.setLastEpochMicrosec(commonInfoNode.path("last-epoch-microsec").asLong());
            ceh.setPriority(priority.fromValue(commonInfoNode.path("priority").asText()));
            ceh.setReportingEntityName(commonInfoNode.path("reporting-entity-name").asText());
            ceh.setSequence(commonInfoNode.path("sequence").asLong());
            ceh.setSourceId(commonInfoNode.path("source-id").asText());
            ceh.setSourceName(commonInfoNode.path("source-name").asText());
            ceh.setStartEpochMicrosec(commonInfoNode.path("start-epoch-microsec").asLong());
            ceh.setTimeZoneOffset(commonInfoNode.path("time-zone-offset").asText());
            ceh.setVersion(commonInfoNode.path("version").asText());
            ceh.setVesEventListenerVersion(commonInfoNode.path("ves-event-listener-version").asText());
            ihf.setCollectorTimeStamp(internal.path("collector-time-stamp").asText());
            ceh.setInternalHeaderFields(ihf);
            event.setCommonEventHeader(ceh);
            alarm.setEvent(event);
            alarmss.add(alarm);
        }
        return new PageImpl<>( alarmss, pageable,alarmss.size());
       } 
         else { 
            logger.debug("Connection to database successful");
            logger.debug("No last visited page found in cookies");
             alarms = AlarmRepository.findAll(pageable);
             return alarms;
        }
          
    } catch (HttpClientErrorException e) {
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
    } catch (Exception e) {
        logger.error("Unexpected error: " + e.getMessage());
        throw new RuntimeException("Internal server error");
    }
}

    public Alarm retrieveAlarm(String id) {
       try {
    	   Alarm Alarm=  AlarmRepository.findById(id).orElseThrow(() -> 
           new ResponseStatusException(HttpStatus.NOT_FOUND, "Alarm with ID " + id + " not found"));
	        
       logger.debug("Connection to database successful");
    	   return Alarm;
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

    public Alarm deleteAlarm(String id) {
    	try {
    		Optional<Alarm> alarm = AlarmRepository.findById(id);
            if (alarm.isPresent()) {
                AlarmRepository.deleteById(id);
                logger.debug("Connection to database successful");
                return alarm.get();
            }
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Not Found");
    	}
    	catch(Error e) {
    		logger.error("Error Connecting to Alarm database "+e );
    		throw new RuntimeException("Internal server error");
    	}
    }
    
}
