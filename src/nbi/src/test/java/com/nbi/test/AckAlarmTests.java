package com.nbi.test;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

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

import com.nbi.services.AckAlarmService;
import com.nbi.entity.AckAlarm;
import com.nbi.entity.AckDetails;
import com.nbi.entity.AlarmId;
import com.nbi.entity.ResponseStructure;
import com.nbi.entity.Response;

import java.util.ArrayList;
import java.util.List;

@SpringBootTest
@AutoConfigureMockMvc
public class AckAlarmTests {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private AckAlarmService ackAlarmService;

    @Autowired
    private ObjectMapper objectMapper; // Use Jackson's ObjectMapper provided by Spring Boot

    @Test
    void testCreateAckAlarm_Success() throws Exception {
        // Mock input
        AckAlarm ackAlarm = new AckAlarm();
        AckDetails details = new AckDetails();
        details.setAckedBy("testuser");
        AlarmId id = new AlarmId();
        id.setId("123");
        List<AlarmId> ids= new ArrayList<>();
        ids.add(id);
        ackAlarm.setAlarms(ids);

        // Mock response
        ResponseStructure responseStructure = new ResponseStructure();
        Response response = new Response();
        response.setResult("success");
        responseStructure.setAlarms(List.of(response));

        // Mock service
        when(ackAlarmService.createAckAlarm(any(AckAlarm.class))).thenReturn(responseStructure);

        // Perform request
        mockMvc.perform(post("/nbi/v1/alarmManagement/ackAlarm")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(ackAlarm))) // Serialize ackAlarm to JSON
                .andExpect(status().isOk());
    }

    @Test
    void testCreateAckAlarm_PartialSuccess() throws Exception {
    	AckAlarm ackAlarm = new AckAlarm();
        AckDetails details = new AckDetails();
        details.setAckedBy("testuser");
        AlarmId id = new AlarmId();
        id.setId("123");
        List<AlarmId> ids= new ArrayList<>();
        ids.add(id);
        ackAlarm.setAlarms(ids);
        // Mock response
        ResponseStructure responseStructure = new ResponseStructure();
        Response successResponse = new Response();
        successResponse.setResult("success");
        Response failedResponse = new Response();
        failedResponse.setResult("failed");
        responseStructure.setAlarms(List.of(successResponse, failedResponse));

        // Mock service
        when(ackAlarmService.createAckAlarm(any(AckAlarm.class))).thenReturn(responseStructure);

        // Perform request
        mockMvc.perform(post("/nbi/v1/alarmManagement/ackAlarm")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(ackAlarm))) // Serialize ackAlarm to JSON
                .andExpect(status().isMultiStatus());
    }
    
    @Test
    void testCreateAckAlarm_BadRequest() throws Exception {
    	AckAlarm ackAlarm = new AckAlarm();
        // Mock response
        ResponseStructure responseStructure = new ResponseStructure();
       

        // Mock service
        when(ackAlarmService.createAckAlarm(any(AckAlarm.class))).thenThrow(new ResponseStatusException(HttpStatus.BAD_REQUEST, "Bad Request"));

        // Perform request
        mockMvc.perform(post("/nbi/v1/alarmManagement/ackAlarm")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(ackAlarm))) // Serialize ackAlarm to JSON
                .andExpect(status().isBadRequest());
    }
    @Test
    void testCreateAckAlarm_NotFound() throws Exception {
    	AckAlarm ackAlarm = new AckAlarm();
        // Mock response
        ResponseStructure responseStructure = new ResponseStructure();
       

        // Mock service
        when(ackAlarmService.createAckAlarm(any(AckAlarm.class))).thenThrow(new ResponseStatusException(HttpStatus.NOT_FOUND, "Not Found"));

        // Perform request
        mockMvc.perform(post("/nbi/v1/alarmManagement/ackAlarm")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(ackAlarm))) // Serialize ackAlarm to JSON
                .andExpect(status().isNotFound());
    }
    @Test
    void testCreateAckAlarm_TimeOut() throws Exception {
    	AckAlarm ackAlarm = new AckAlarm();

        // Mock service
        when(ackAlarmService.createAckAlarm(any(AckAlarm.class))).thenThrow(new ResponseStatusException(HttpStatus.REQUEST_TIMEOUT, "Request Timeout"));

        // Perform request
        mockMvc.perform(post("/nbi/v1/alarmManagement/ackAlarm")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(ackAlarm))) // Serialize ackAlarm to JSON
                .andExpect(status().isRequestTimeout());
    }
    @Test
    void testCreateAckAlarm_InternalServerError() throws Exception {
    	AckAlarm ackAlarm = new AckAlarm();
      

        // Mock service
        when(ackAlarmService.createAckAlarm(any(AckAlarm.class))).thenThrow(new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Internal Server Error"));

        // Perform request
        mockMvc.perform(post("/nbi/v1/alarmManagement/ackAlarm")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(ackAlarm))) // Serialize ackAlarm to JSON
                .andExpect(status().isInternalServerError());
    }
    @Test
    void testCreateAckAlarm_Unauthorized() throws Exception {
    	AckAlarm ackAlarm = new AckAlarm();

        // Mock service
        when(ackAlarmService.createAckAlarm(any(AckAlarm.class))).thenThrow(new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Unauthorized access"));

        // Perform request
        mockMvc.perform(post("/nbi/v1/alarmManagement/ackAlarm")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(ackAlarm))) // Serialize ackAlarm to JSON
                .andExpect(status().isUnauthorized());
    }
    @Test
    void testCreateAckAlarm_UnexpectedError() throws Exception {
    	AckAlarm ackAlarm = new AckAlarm();
        // Mock service
        when(ackAlarmService.createAckAlarm(any(AckAlarm.class))).thenThrow(new RuntimeException("Internal server error"));

        // Perform request
        mockMvc.perform(post("/nbi/v1/alarmManagement/ackAlarm")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(ackAlarm))) // Serialize ackAlarm to JSON
                .andExpect(status().isInternalServerError());
    }
}
