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

import com.nbi.services.UnAckAlarmService;
import com.nbi.entity.UnAckAlarm;
import com.nbi.entity.UnackDetails;
import com.nbi.entity.AlarmId;
import com.nbi.entity.ResponseStructure;
import com.nbi.entity.Response;

import java.util.ArrayList;
import java.util.List;

@SpringBootTest
@AutoConfigureMockMvc
public class UnAckAlarmTests {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UnAckAlarmService ununackAlarmService;

    @Autowired
    private ObjectMapper objectMapper; // Use Jackson's ObjectMapper provided by Spring Boot

    @Test
    void testCreateAckAlarm_Success() throws Exception {
        // Mock input
        UnAckAlarm unackAlarm = new UnAckAlarm();
        UnackDetails details = new UnackDetails();
        details.setUnackedBy("testuser");
        AlarmId id = new AlarmId();
        id.setId("123");
        List<AlarmId> ids= new ArrayList<>();
        ids.add(id);
        unackAlarm.setAlarms(ids);

        // Mock response
        ResponseStructure responseStructure = new ResponseStructure();
        Response response = new Response();
        response.setResult("success");
        responseStructure.setAlarms(List.of(response));

        // Mock service
        when(ununackAlarmService.createUnAckAlarm(any(UnAckAlarm.class))).thenReturn(responseStructure);

        // Perform request
        mockMvc.perform(post("/nbi/v1/alarmManagement/unAckAlarm")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(unackAlarm))) // Serialize unackAlarm to JSON
                .andExpect(status().isOk());
    }

    @Test
    void testCreateAckAlarm_PartialSuccess() throws Exception {
    	UnAckAlarm unackAlarm = new UnAckAlarm();
        UnackDetails details = new UnackDetails();
        details.setUnackedBy("testuser");
        AlarmId id = new AlarmId();
        id.setId("123");
        List<AlarmId> ids= new ArrayList<>();
        ids.add(id);
        unackAlarm.setAlarms(ids);
        // Mock response
        ResponseStructure responseStructure = new ResponseStructure();
        Response successResponse = new Response();
        successResponse.setResult("success");
        Response failedResponse = new Response();
        failedResponse.setResult("failed");
        responseStructure.setAlarms(List.of(successResponse, failedResponse));

        // Mock service
        when(ununackAlarmService.createUnAckAlarm(any(UnAckAlarm.class))).thenReturn(responseStructure);

        // Perform request
        mockMvc.perform(post("/nbi/v1/alarmManagement/unAckAlarm")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(unackAlarm))) // Serialize unackAlarm to JSON
                .andExpect(status().isMultiStatus());
    }
    
    @Test
    void testCreateAckAlarm_BadRequest() throws Exception {
    	UnAckAlarm unackAlarm = new UnAckAlarm();
        // Mock response
        ResponseStructure responseStructure = new ResponseStructure();
       

        // Mock service
        when(ununackAlarmService.createUnAckAlarm(any(UnAckAlarm.class))).thenThrow(new ResponseStatusException(HttpStatus.BAD_REQUEST, "Bad Request"));

        // Perform request
        mockMvc.perform(post("/nbi/v1/alarmManagement/unAckAlarm")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(unackAlarm))) // Serialize unackAlarm to JSON
                .andExpect(status().isBadRequest());
    }
    @Test
    void testCreateAckAlarm_NotFound() throws Exception {
    	UnAckAlarm unackAlarm = new UnAckAlarm();
        // Mock response
        ResponseStructure responseStructure = new ResponseStructure();
       

        // Mock service
        when(ununackAlarmService.createUnAckAlarm(any(UnAckAlarm.class))).thenThrow(new ResponseStatusException(HttpStatus.NOT_FOUND, "Not Found"));

        // Perform request
        mockMvc.perform(post("/nbi/v1/alarmManagement/unAckAlarm")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(unackAlarm))) // Serialize unackAlarm to JSON
                .andExpect(status().isNotFound());
    }
    @Test
    void testCreateAckAlarm_TimeOut() throws Exception {
    	UnAckAlarm unackAlarm = new UnAckAlarm();

        // Mock service
        when(ununackAlarmService.createUnAckAlarm(any(UnAckAlarm.class))).thenThrow(new ResponseStatusException(HttpStatus.REQUEST_TIMEOUT, "Request Timeout"));

        // Perform request
        mockMvc.perform(post("/nbi/v1/alarmManagement/unAckAlarm")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(unackAlarm))) // Serialize unackAlarm to JSON
                .andExpect(status().isRequestTimeout());
    }
    @Test
    void testCreateAckAlarm_InternalServerError() throws Exception {
    	UnAckAlarm unackAlarm = new UnAckAlarm();
      

        // Mock service
        when(ununackAlarmService.createUnAckAlarm(any(UnAckAlarm.class))).thenThrow(new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Internal Server Error"));

        // Perform request
        mockMvc.perform(post("/nbi/v1/alarmManagement/unAckAlarm")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(unackAlarm))) // Serialize unackAlarm to JSON
                .andExpect(status().isInternalServerError());
    }
    @Test
    void testCreateAckAlarm_Unauthorized() throws Exception {
    	UnAckAlarm unackAlarm = new UnAckAlarm();

        // Mock service
        when(ununackAlarmService.createUnAckAlarm(any(UnAckAlarm.class))).thenThrow(new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Unauthorized access"));

        // Perform request
        mockMvc.perform(post("/nbi/v1/alarmManagement/unAckAlarm")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(unackAlarm))) // Serialize unackAlarm to JSON
                .andExpect(status().isUnauthorized());
    }
    @Test
    void testCreateAckAlarm_UnexpectedError() throws Exception {
    	UnAckAlarm unackAlarm = new UnAckAlarm();
        // Mock service
        when(ununackAlarmService.createUnAckAlarm(any(UnAckAlarm.class))).thenThrow(new RuntimeException("Internal server error"));

        // Perform request
        mockMvc.perform(post("/nbi/v1/alarmManagement/unAckAlarm")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(unackAlarm))) // Serialize unackAlarm to JSON
                .andExpect(status().isInternalServerError());
    }
}
