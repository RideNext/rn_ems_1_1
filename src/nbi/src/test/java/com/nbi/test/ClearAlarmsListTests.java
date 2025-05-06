package com.nbi.test;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import com.nbi.services.ClearAlarmService;
import com.nbi.entity.PostClearAlarm;
import com.nbi.entity.ClearDetails;
import com.nbi.entity.AlarmId;
import com.nbi.entity.ResponseStructure;
import com.nbi.entity.Response;
import com.nbi.entity.ClearAlarm;
import java.util.ArrayList;
import java.util.List;
import com.nbi.repository.ClearAlarmRepository;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.HttpServerErrorException;
import org.springframework.web.client.ResourceAccessException;
import org.springframework.web.server.ResponseStatusException;
import java.util.Collections;
@SpringBootTest
@AutoConfigureMockMvc
public class ClearAlarmsListTests {

    @Autowired
    private MockMvc mockMvc;
    @MockBean
    private ClearAlarmRepository alarmrepo;
    @Autowired
    private ObjectMapper objectMapper; // Use Jackson's ObjectMapper provided by Spring Boot
    @Test
    void testListClearAlarms_Service_OK() throws Exception {
    	
    	 Pageable pageable = PageRequest.of(0, 10);
    	 ClearAlarm alarm = new ClearAlarm();
        Page<ClearAlarm> alarmPage = new PageImpl<>(List.of(alarm), pageable, 1);
        when(alarmrepo.findAll(any(Pageable.class))).thenReturn(alarmPage);

        mockMvc.perform(get("/nbi/v1/alarmManagement/clearAlarm")
                .param("pageno", "0")
                .param("pagesize", "10"))
                .andExpect(status().isOk());

    }
    @Test
    void testListClearAlarms_Service_NotFound() throws Exception {
        Page<ClearAlarm> emptyPage = new PageImpl<>(Collections.emptyList(), PageRequest.of(1, 10), 0);
        when(alarmrepo.findAll(any(Pageable.class))).thenThrow(new HttpClientErrorException(HttpStatus.NOT_FOUND));

        mockMvc.perform(get("/nbi/v1/alarmManagement/clearAlarm")
                .param("pageno", "1")
                .param("pagesize", "10"))
                .andExpect(status().isNotFound());

    }
    @Test
    void testListClearAlarms_Service_Unauthorized() throws Exception {
        when(alarmrepo.findAll(any(Pageable.class)))
                .thenThrow(new HttpClientErrorException(HttpStatus.UNAUTHORIZED));

        mockMvc.perform(get("/nbi/v1/alarmManagement/clearAlarm")
                .param("pageno", "0")
                .param("pagesize", "10"))
                .andExpect(status().isUnauthorized());

    }
    @Test
    void testListClearAlarms_Service_BadRequest() throws Exception {
        when(alarmrepo.findAll(any(Pageable.class)))
                .thenThrow(new HttpClientErrorException(HttpStatus.BAD_REQUEST, "Bad request"));

        mockMvc.perform(get("/nbi/v1/alarmManagement/clearAlarm")
                .param("pageno", "1")
                .param("pagesize", "10"))
                .andExpect(status().isBadRequest());

    }
    
    @Test
    void testListClearAlarms_Service_InternalServerError() throws Exception {
        when(alarmrepo.findAll(any(Pageable.class)))
                .thenThrow(new HttpServerErrorException(HttpStatus.INTERNAL_SERVER_ERROR, "Internal server error"));

        mockMvc.perform(get("/nbi/v1/alarmManagement/clearAlarm")
                .param("pageno", "0")
                .param("pagesize", "10"))
                .andExpect(status().isInternalServerError());

    }
    @Test
    void testListClearAlarms_Service_InternalServerError_2() throws Exception {
        when(alarmrepo.findAll(any(Pageable.class)))
                .thenThrow(new RuntimeException("Internal server error"));

        mockMvc.perform(get("/nbi/v1/alarmManagement/clearAlarm")
                .param("pageno", "0")
                .param("pagesize", "10"))
                .andExpect(status().isInternalServerError());
    }
    
    @Test
    void testListClearAlarms_Service_InternalServerError_3() throws Exception {
        when(alarmrepo.findAll(any(Pageable.class)))
                .thenThrow(new HttpClientErrorException(HttpStatus.INTERNAL_SERVER_ERROR, "Internal Server Error"));

        mockMvc.perform(get("/nbi/v1/alarmManagement/clearAlarm")
                .param("pageno", "0")
                .param("pagesize", "10"))
                .andExpect(status().isInternalServerError());
    }
    

    @Test
    void testListClearAlarms_Service_RequestTimeout() throws Exception {
        when(alarmrepo.findAll(any(Pageable.class)))
                .thenThrow(new ResourceAccessException("Request timeout"));

        mockMvc.perform(get("/nbi/v1/alarmManagement/clearAlarm")
                .param("pageno", "0")
                .param("pagesize", "10"))
                .andExpect(status().isRequestTimeout());

    }
 
}
