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
public class ClearAlarmTests {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ClearAlarmService clearAlarmService;
    @MockBean
    private ClearAlarmRepository alarmrepo;
    @Autowired
    private ObjectMapper objectMapper; // Use Jackson's ObjectMapper provided by Spring Boot

    @Test
    void testCreateClearAlarm_Success() throws Exception {
        // Mock input
    	PostClearAlarm clearAlarm = new PostClearAlarm();
        ClearDetails details = new ClearDetails();
        AlarmId id = new AlarmId();
        id.setId("123");
        List<AlarmId> ids= new ArrayList<>();
        ids.add(id);
        clearAlarm.setAlarms(ids);

        // Mock response
        ResponseStructure responseStructure = new ResponseStructure();
        Response response = new Response();
        response.setResult("success");
        responseStructure.setAlarms(List.of(response));

        // Mock service
        when(clearAlarmService.createClearAlarm(any(PostClearAlarm.class))).thenReturn(responseStructure);

        // Perform request
        mockMvc.perform(post("/nbi/v1/alarmManagement/clearAlarm")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(clearAlarm))) // Serialize clearAlarm to JSON
                .andExpect(status().isOk());
    }

    @Test
    void testCreateClearAlarm_PartialSuccess() throws Exception {
    	PostClearAlarm clearAlarm = new PostClearAlarm();
        ClearDetails details = new ClearDetails();
        
        AlarmId id = new AlarmId();
        id.setId("123");
        List<AlarmId> ids= new ArrayList<>();
        ids.add(id);
        clearAlarm.setAlarms(ids);
        // Mock response
        ResponseStructure responseStructure = new ResponseStructure();
        Response successResponse = new Response();
        successResponse.setResult("success");
        Response failedResponse = new Response();
        failedResponse.setResult("failed");
        responseStructure.setAlarms(List.of(successResponse, failedResponse));

        // Mock service
        when(clearAlarmService.createClearAlarm(any(PostClearAlarm.class))).thenReturn(responseStructure);

        // Perform request
        mockMvc.perform(post("/nbi/v1/alarmManagement/clearAlarm")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(clearAlarm))) // Serialize clearAlarm to JSON
                .andExpect(status().isMultiStatus());
    }
    
    @Test
    void testCreateClearAlarm_BadRequest() throws Exception {
    	PostClearAlarm clearAlarm = new PostClearAlarm();
        // Mock response
        ResponseStructure responseStructure = new ResponseStructure();
       

        // Mock service
        when(clearAlarmService.createClearAlarm(any(PostClearAlarm.class))).thenThrow(new ResponseStatusException(HttpStatus.BAD_REQUEST, "Bad Request"));

        // Perform request
        mockMvc.perform(post("/nbi/v1/alarmManagement/clearAlarm")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(clearAlarm))) // Serialize clearAlarm to JSON
                .andExpect(status().isBadRequest());
    }
    @Test
    void testCreateClearAlarm_NotFound() throws Exception {
    	PostClearAlarm clearAlarm = new PostClearAlarm();
        // Mock response
        ResponseStructure responseStructure = new ResponseStructure();
       

        // Mock service
        when(clearAlarmService.createClearAlarm(any(PostClearAlarm.class))).thenThrow(new ResponseStatusException(HttpStatus.NOT_FOUND, "Not Found"));

        // Perform request
        mockMvc.perform(post("/nbi/v1/alarmManagement/clearAlarm")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(clearAlarm))) // Serialize clearAlarm to JSON
                .andExpect(status().isNotFound());
    }
    @Test
    void testCreateClearAlarm_TimeOut() throws Exception {
    	PostClearAlarm clearAlarm = new PostClearAlarm();

        // Mock service
        when(clearAlarmService.createClearAlarm(any(PostClearAlarm.class))).thenThrow(new ResponseStatusException(HttpStatus.REQUEST_TIMEOUT, "Request Timeout"));

        // Perform request
        mockMvc.perform(post("/nbi/v1/alarmManagement/clearAlarm")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(clearAlarm))) // Serialize clearAlarm to JSON
                .andExpect(status().isRequestTimeout());
    }
    @Test
    void testCreateClearAlarm_InternalServerError() throws Exception {
    	PostClearAlarm clearAlarm = new PostClearAlarm();
      

        // Mock service
        when(clearAlarmService.createClearAlarm(any(PostClearAlarm.class))).thenThrow(new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Internal Server Error"));

        // Perform request
        mockMvc.perform(post("/nbi/v1/alarmManagement/clearAlarm")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(clearAlarm))) // Serialize clearAlarm to JSON
                .andExpect(status().isInternalServerError());
    }
    @Test
    void testCreateClearAlarm_Unauthorized() throws Exception {
    	PostClearAlarm clearAlarm = new PostClearAlarm();

        // Mock service
        when(clearAlarmService.createClearAlarm(any(PostClearAlarm.class))).thenThrow(new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Unauthorized access"));

        // Perform request
        mockMvc.perform(post("/nbi/v1/alarmManagement/clearAlarm")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(clearAlarm))) // Serialize clearAlarm to JSON
                .andExpect(status().isUnauthorized());
    }
    @Test
    void testCreateClearAlarm_UnexpectedError() throws Exception {
    	PostClearAlarm clearAlarm = new PostClearAlarm();
        // Mock service
        when(clearAlarmService.createClearAlarm(any(PostClearAlarm.class))).thenThrow(new RuntimeException("Internal server error"));

        // Perform request
        mockMvc.perform(post("/nbi/v1/alarmManagement/clearAlarm")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(clearAlarm))) // Serialize clearAlarm to JSON
                .andExpect(status().isInternalServerError());
    }
    
}
