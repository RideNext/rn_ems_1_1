package com.nbi.test;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;


import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.HttpServerErrorException;
import org.springframework.web.client.ResourceAccessException;
import org.springframework.web.server.ResponseStatusException;
import com.nbi.controllers.AlarmController;
import com.nbi.services.AlarmService;
import com.nbi.entity.Alarm;
import com.nbi.repository.AlarmRepository;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import org.springframework.http.MediaType;
@SpringBootTest
@AutoConfigureMockMvc
public class AlarmServiceTests {

    @Autowired
    private MockMvc mockMvc;

    
    @MockBean
    private AlarmRepository alarmrepo;

    @Autowired
    private AlarmService alarmservice;
    
    private String json = "{\r\n"
    		+ "    \"event\": {\r\n"
    		+ "        \"commonEventHeader\": {\r\n"
    		+ "            \"domain\": \"fault\",\r\n"
    		+ "            \"version\": \"4.1\",\r\n"
    		+ "            \"eventId\": \"Fault110012\",\r\n"
    		+ "            \"eventName\": \"Fault_Communication Alarm\",\r\n"
    		+ "            \"sequence\": 3,\r\n"
    		+ "            \"priority\": \"High\",\r\n"
    		+ "            \"sourceId\": \"11002\",\r\n"
    		+ "            \"reportingEntityName\": \"OAM_vendorA_ORUAA100_FR19180101112\",\r\n"
    		+ "            \"timeZoneOffset\": \"UTC+05:30\",\r\n"
    		+ "            \"vesEventListenerVersion\": \"7.1.1\",\r\n"
    		+ "            \"sourceName\": \"Tejas-gNB-12302\",\r\n"
    		+ "            \"startEpochMicrosec\": 1705641634909741,\r\n"
    		+ "            \"lastEpochMicrosec\": 1731587523836000\r\n"
    		+ "        },\r\n"
    		+ "        \"faultFields\": {\r\n"
    		+ "            \"faultFieldsVersion\": \"4.0\",\r\n"
    		+ "            \"eventSourceType\": \"CellID : 1\",\r\n"
    		+ "            \"alarmInterfaceA\": \"OAM_vendorA_ORUAA100_FR1918010111\",\r\n"
    		+ "            \"eventSeverity\": \"MAJOR\",\r\n"
    		+ "            \"alarmAdditionalInformation\": {\r\n"
    		+ "                \"alarmId\": \"110012\",\r\n"
    		+ "                \"AlarmAction\": \"RAISE\"\r\n"
    		+ "            },\r\n"
    		+ "            \"vfStatus\": \"Active\",\r\n"
    		+ "            \"alarmCondition\": \"11001\",\r\n"
    		+ "            \"specificProblem\": \"EventType:Communication Alarm,ProbableCause:Connection Establishment Error,SpecificProblem:NGAP SCTP CONNECTION BREAK,\"\r\n"
    		+ "        }\r\n"
    		+ "    }\r\n"
    		+ "}";
    
    @Test
    void testListAlarms_Service_OK() throws Exception {
    	
    	 Pageable pageable = PageRequest.of(0, 10);
    	 Alarm alarm = new Alarm();
        Page<Alarm> alarmPage = new PageImpl<>(List.of(alarm), pageable, 1);
        when(alarmrepo.findAll(any(Pageable.class))).thenReturn(alarmPage);

        mockMvc.perform(get("/nbi/v1/alarmManagement/alarms")
                .param("pageno", "0")
                .param("pagesize", "10"))
                .andExpect(status().isOk());

    }
    @Test
    void testListAlarms_Service_NotFound() throws Exception {
        Page<Alarm> emptyPage = new PageImpl<>(Collections.emptyList(), PageRequest.of(1, 10), 0);
        when(alarmrepo.findAll(any(Pageable.class))).thenThrow(new HttpClientErrorException(HttpStatus.NOT_FOUND));

        mockMvc.perform(get("/nbi/v1/alarmManagement/alarms")
                .param("pageno", "1")
                .param("pagesize", "10"))
                .andExpect(status().isNotFound());

    }
    @Test
    void testListAlarms_Service_Unauthorized() throws Exception {
        when(alarmrepo.findAll(any(Pageable.class)))
                .thenThrow(new HttpClientErrorException(HttpStatus.UNAUTHORIZED));

        mockMvc.perform(get("/nbi/v1/alarmManagement/alarms")
                .param("pageno", "0")
                .param("pagesize", "10"))
                .andExpect(status().isUnauthorized());

    }
    @Test
    void testListAlarms_Service_BadRequest() throws Exception {
        when(alarmrepo.findAll(any(Pageable.class)))
                .thenThrow(new HttpClientErrorException(HttpStatus.BAD_REQUEST, "Bad request"));

        mockMvc.perform(get("/nbi/v1/alarmManagement/alarms")
                .param("pageno", "1")
                .param("pagesize", "10"))
                .andExpect(status().isBadRequest());

    }
    
    @Test
    void testListAlarms_Service_InternalServerError() throws Exception {
        when(alarmrepo.findAll(any(Pageable.class)))
                .thenThrow(new HttpServerErrorException(HttpStatus.INTERNAL_SERVER_ERROR, "Internal server error"));

        mockMvc.perform(get("/nbi/v1/alarmManagement/alarms")
                .param("pageno", "0")
                .param("pagesize", "10"))
                .andExpect(status().isInternalServerError());

    }
    @Test
    void testListAlarms_Service_InternalServerError_2() throws Exception {
        when(alarmrepo.findAll(any(Pageable.class)))
                .thenThrow(new RuntimeException("Internal server error"));

        mockMvc.perform(get("/nbi/v1/alarmManagement/alarms")
                .param("pageno", "0")
                .param("pagesize", "10"))
                .andExpect(status().isInternalServerError());
    }
    
    @Test
    void testListAlarms_Service_InternalServerError_3() throws Exception {
        when(alarmrepo.findAll(any(Pageable.class)))
                .thenThrow(new HttpClientErrorException(HttpStatus.INTERNAL_SERVER_ERROR, "Internal Server Error"));

        mockMvc.perform(get("/nbi/v1/alarmManagement/alarms")
                .param("pageno", "0")
                .param("pagesize", "10"))
                .andExpect(status().isInternalServerError());
    }
    
    @Test
    void testListAlarms_Service_NotFound_2() throws Exception {
    	Pageable pageable = PageRequest.of(0, 10);
   	 Alarm alarm = new Alarm();
       Page<Alarm> alarmPage = new PageImpl<>(List.of(alarm), pageable, 0);
        when(alarmrepo.findAll(any(Pageable.class))).thenReturn(alarmPage);

        mockMvc.perform(get("/nbi/v1/alarmManagement/alarms")
                .param("pageno", "10")
                .param("pagesize", "10"))
                .andExpect(status().isNotFound());
    }

    @Test
    void testListAlarms_Service_RequestTimeout() throws Exception {
        when(alarmrepo.findAll(any(Pageable.class)))
                .thenThrow(new ResourceAccessException("Request timeout"));

        mockMvc.perform(get("/nbi/v1/alarmManagement/alarms")
                .param("pageno", "0")
                .param("pagesize", "10"))
                .andExpect(status().isRequestTimeout());

    }
    
    
    
    @Test
    void testCreateAlarms_Service_OK() throws Exception {
    	
    	 Alarm alarm = new Alarm();
    	 when(alarmrepo.save(any(Alarm.class))).thenReturn(alarm);

        mockMvc.perform(post("/nbi/v1/alarmManagement/alarms")
        .contentType(MediaType.APPLICATION_JSON)
        .content(json))
        .andExpect(status().isOk());

    }
    @Test
    void testCreateAlarms_Service_NotFound() throws Exception {
        when(alarmrepo.save(any(Alarm.class))).thenThrow(new HttpClientErrorException(HttpStatus.NOT_FOUND));;

        mockMvc.perform(post("/nbi/v1/alarmManagement/alarms")
        		.contentType(MediaType.APPLICATION_JSON)
                .content(json))
                .andExpect(status().isNotFound());

    }
    @Test
    void testCreateAlarms_Service_Unauthorized() throws Exception {
        when(alarmrepo.save(any(Alarm.class)))
                .thenThrow(new HttpClientErrorException(HttpStatus.UNAUTHORIZED));

        mockMvc.perform(post("/nbi/v1/alarmManagement/alarms")
        		.contentType(MediaType.APPLICATION_JSON)
                .content(json))
                .andExpect(status().isUnauthorized());

    }
    @Test
    void testCreateAlarms_Service_BadRequest() throws Exception {
        when(alarmrepo.save(any(Alarm.class)))
                .thenThrow(new HttpClientErrorException(HttpStatus.BAD_REQUEST, "Bad request"));

        mockMvc.perform(post("/nbi/v1/alarmManagement/alarms")
        		.contentType(MediaType.APPLICATION_JSON)
                .content(json))
                .andExpect(status().isBadRequest());

    }
    
    @Test
    void testCreateAlarms_Service_InternalServerError() throws Exception {
        when(alarmrepo.save(any(Alarm.class)))
                .thenThrow(new HttpServerErrorException(HttpStatus.INTERNAL_SERVER_ERROR, "Internal server error"));

        mockMvc.perform(post("/nbi/v1/alarmManagement/alarms")
        		.contentType(MediaType.APPLICATION_JSON)
                .content(json))
                .andExpect(status().isInternalServerError());

    }
    @Test
    void testCreateAlarms_Service_InternalServerError_2() throws Exception {
        when(alarmrepo.save(any(Alarm.class)))
                .thenThrow(new RuntimeException("Internal server error"));

        mockMvc.perform(post("/nbi/v1/alarmManagement/alarms")
        		.contentType(MediaType.APPLICATION_JSON)
                .content(json))
                .andExpect(status().isInternalServerError());
    }
    
    @Test
    void testCreateAlarms_Service_InternalServerError_3() throws Exception {
        when(alarmrepo.save(any(Alarm.class)))
                .thenThrow(new HttpClientErrorException(HttpStatus.INTERNAL_SERVER_ERROR, "Internal Server Error"));

        mockMvc.perform(post("/nbi/v1/alarmManagement/alarms")
        		.contentType(MediaType.APPLICATION_JSON)
                .content(json))
                .andExpect(status().isInternalServerError());
    }

    @Test
    void testCreateAlarms_Service_RequestTimeout() throws Exception {
        when(alarmrepo.save(any(Alarm.class)))
                .thenThrow(new ResourceAccessException("Request timeout"));

        mockMvc.perform(post("/nbi/v1/alarmManagement/alarms")
        		.contentType(MediaType.APPLICATION_JSON)
                .content(json))
                .andExpect(status().isRequestTimeout());

    }
       
}


