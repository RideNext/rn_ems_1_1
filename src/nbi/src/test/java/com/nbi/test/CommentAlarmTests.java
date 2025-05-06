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

import com.nbi.services.CommentAlarmService;
import com.nbi.entity.CommentAlarm;
import com.nbi.entity.CommentDetails;
import com.nbi.entity.AlarmId;
import com.nbi.entity.ResponseStructure;
import com.nbi.entity.Response;

import java.util.ArrayList;
import java.util.List;

@SpringBootTest
@AutoConfigureMockMvc
public class CommentAlarmTests {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private CommentAlarmService commentAlarmService;

    @Autowired
    private ObjectMapper objectMapper; // Use Jackson's ObjectMapper provided by Spring Boot

    @Test
    void testCreateCommentAlarm_Success() throws Exception {
        // Mock input
        CommentAlarm commentAlarm = new CommentAlarm();
        CommentDetails details = new CommentDetails();
        AlarmId id = new AlarmId();
        id.setId("123");
        List<AlarmId> ids= new ArrayList<>();
        ids.add(id);
        commentAlarm.setAlarms(ids);

        // Mock response
        ResponseStructure responseStructure = new ResponseStructure();
        Response response = new Response();
        response.setResult("success");
        responseStructure.setAlarms(List.of(response));

        // Mock service
        when(commentAlarmService.createCommentAlarm(any(CommentAlarm.class))).thenReturn(responseStructure);

        // Perform request
        mockMvc.perform(post("/nbi/v1/alarmManagement/commentAlarm")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(commentAlarm))) // Serialize commentAlarm to JSON
                .andExpect(status().isOk());
    }

    @Test
    void testCreateCommentAlarm_PartialSuccess() throws Exception {
    	CommentAlarm commentAlarm = new CommentAlarm();
        CommentDetails details = new CommentDetails();
        
        AlarmId id = new AlarmId();
        id.setId("123");
        List<AlarmId> ids= new ArrayList<>();
        ids.add(id);
        commentAlarm.setAlarms(ids);
        // Mock response
        ResponseStructure responseStructure = new ResponseStructure();
        Response successResponse = new Response();
        successResponse.setResult("success");
        Response failedResponse = new Response();
        failedResponse.setResult("failed");
        responseStructure.setAlarms(List.of(successResponse, failedResponse));

        // Mock service
        when(commentAlarmService.createCommentAlarm(any(CommentAlarm.class))).thenReturn(responseStructure);

        // Perform request
        mockMvc.perform(post("/nbi/v1/alarmManagement/commentAlarm")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(commentAlarm))) // Serialize commentAlarm to JSON
                .andExpect(status().isMultiStatus());
    }
    
    @Test
    void testCreateCommentAlarm_BadRequest() throws Exception {
    	CommentAlarm commentAlarm = new CommentAlarm();
        // Mock response
        ResponseStructure responseStructure = new ResponseStructure();
       

        // Mock service
        when(commentAlarmService.createCommentAlarm(any(CommentAlarm.class))).thenThrow(new ResponseStatusException(HttpStatus.BAD_REQUEST, "Bad Request"));

        // Perform request
        mockMvc.perform(post("/nbi/v1/alarmManagement/commentAlarm")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(commentAlarm))) // Serialize commentAlarm to JSON
                .andExpect(status().isBadRequest());
    }
    @Test
    void testCreateCommentAlarm_NotFound() throws Exception {
    	CommentAlarm commentAlarm = new CommentAlarm();
        // Mock response
        ResponseStructure responseStructure = new ResponseStructure();
       

        // Mock service
        when(commentAlarmService.createCommentAlarm(any(CommentAlarm.class))).thenThrow(new ResponseStatusException(HttpStatus.NOT_FOUND, "Not Found"));

        // Perform request
        mockMvc.perform(post("/nbi/v1/alarmManagement/commentAlarm")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(commentAlarm))) // Serialize commentAlarm to JSON
                .andExpect(status().isNotFound());
    }
    @Test
    void testCreateCommentAlarm_TimeOut() throws Exception {
    	CommentAlarm commentAlarm = new CommentAlarm();

        // Mock service
        when(commentAlarmService.createCommentAlarm(any(CommentAlarm.class))).thenThrow(new ResponseStatusException(HttpStatus.REQUEST_TIMEOUT, "Request Timeout"));

        // Perform request
        mockMvc.perform(post("/nbi/v1/alarmManagement/commentAlarm")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(commentAlarm))) // Serialize commentAlarm to JSON
                .andExpect(status().isRequestTimeout());
    }
    @Test
    void testCreateCommentAlarm_InternalServerError() throws Exception {
    	CommentAlarm commentAlarm = new CommentAlarm();
      

        // Mock service
        when(commentAlarmService.createCommentAlarm(any(CommentAlarm.class))).thenThrow(new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Internal Server Error"));

        // Perform request
        mockMvc.perform(post("/nbi/v1/alarmManagement/commentAlarm")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(commentAlarm))) // Serialize commentAlarm to JSON
                .andExpect(status().isInternalServerError());
    }
    @Test
    void testCreateCommentAlarm_Unauthorized() throws Exception {
    	CommentAlarm commentAlarm = new CommentAlarm();

        // Mock service
        when(commentAlarmService.createCommentAlarm(any(CommentAlarm.class))).thenThrow(new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Unauthorized access"));

        // Perform request
        mockMvc.perform(post("/nbi/v1/alarmManagement/commentAlarm")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(commentAlarm))) // Serialize commentAlarm to JSON
                .andExpect(status().isUnauthorized());
    }
    @Test
    void testCreateCommentAlarm_UnexpectedError() throws Exception {
    	CommentAlarm commentAlarm = new CommentAlarm();
        // Mock service
        when(commentAlarmService.createCommentAlarm(any(CommentAlarm.class))).thenThrow(new RuntimeException("Internal server error"));

        // Perform request
        mockMvc.perform(post("/nbi/v1/alarmManagement/commentAlarm")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(commentAlarm))) // Serialize commentAlarm to JSON
                .andExpect(status().isInternalServerError());
    }
}
