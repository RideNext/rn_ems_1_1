//package com.nbi.test;
//
//import static org.mockito.Mockito.*;
//import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
//
//
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.boot.test.mock.mockito.MockBean;
//import org.springframework.data.domain.Page;
//import org.springframework.data.domain.PageImpl;
//import org.springframework.data.domain.PageRequest;
//import org.springframework.data.domain.Pageable;
//import org.springframework.http.HttpStatus;
//import org.springframework.test.web.servlet.MockMvc;
//import org.springframework.web.server.ResponseStatusException;
//import com.nbi.services.AlarmService;
//import com.nbi.entity.Alarm;
//import com.nbi.repository.AlarmRepository;
//
//import java.util.Collections;
//import java.util.List;
//@SpringBootTest
//@AutoConfigureMockMvc
//public class AlarmTests {
//
//    @Autowired
//    private MockMvc mockMvc;
//
//    @MockBean
//    private AlarmService alarmService;
//    
//    @MockBean
//    private AlarmRepository alarmrepo;
//
//
//    @Test
//    void testListAlarms_OK() throws Exception {
//    	
//    	 Pageable pageable = PageRequest.of(0, 10);
//    	 Alarm alarm = new Alarm();
//        Page<Alarm> alarmPage = new PageImpl<>(List.of(alarm), pageable, 1);
//        when(alarmService.listAlarm(any(Pageable.class))).thenReturn(alarmPage);
//
//        mockMvc.perform(get("/nbi/v1/alarmManagement/alarms")
//                .param("pageno", "0")
//                .param("pagesize", "10"))
//                .andExpect(status().isOk());
//
//    }
//    @Test
//    void testListAlarms_NotFound() throws Exception {
//        Page<Alarm> emptyPage = new PageImpl<>(Collections.emptyList(), PageRequest.of(1, 10), 0);
//        when(alarmService.listAlarm(any(Pageable.class))).thenReturn(emptyPage);
//
//        mockMvc.perform(get("/nbi/v1/alarmManagement/alarms")
//                .param("pageno", "1")
//                .param("pagesize", "10"))
//                .andExpect(status().isNotFound());
//
//    }
//    @Test
//    void testListAlarms_Unauthorized() throws Exception {
//        when(alarmService.listAlarm(any(Pageable.class)))
//                .thenThrow(new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Unauthorized access"));
//
//        mockMvc.perform(get("/nbi/v1/alarmManagement/alarms")
//                .param("pageno", "0")
//                .param("pagesize", "10"))
//                .andExpect(status().isUnauthorized());
//
//    }
//    @Test
//    void testListAlarms_BadRequest() throws Exception {
//        when(alarmService.listAlarm(any(Pageable.class)))
//                .thenThrow(new ResponseStatusException(HttpStatus.BAD_REQUEST, "Bad request"));
//
//        mockMvc.perform(get("/nbi/v1/alarmManagement/alarms")
//                .param("pageno", "1")
//                .param("pagesize", "10"))
//                .andExpect(status().isBadRequest());
//
//    }
//    @Test
//    void testListAlarms_InternalServerError() throws Exception {
//        when(alarmService.listAlarm(any(Pageable.class)))
//                .thenThrow(new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Internal server error"));
//
//        mockMvc.perform(get("/nbi/v1/alarmManagement/alarms")
//                .param("pageno", "0")
//                .param("pagesize", "10"))
//                .andExpect(status().isInternalServerError());
//
//    }
//    @Test
//    void testListAlarms_InternalServerError_2() throws Exception {
//        when(alarmService.listAlarm(any(Pageable.class)))
//                .thenThrow(new RuntimeException("Internal server error"));
//
//        mockMvc.perform(get("/nbi/v1/alarmManagement/alarms")
//                .param("pageno", "0")
//                .param("pagesize", "10"))
//                .andExpect(status().isInternalServerError());
//    }
//
//    @Test
//    void testListAlarms_RequestTimeout() throws Exception {
//        when(alarmService.listAlarm(any(Pageable.class)))
//                .thenThrow(new ResponseStatusException(HttpStatus.REQUEST_TIMEOUT,"Request timeout"));
//
//        mockMvc.perform(get("/nbi/v1/alarmManagement/alarms")
//                .param("pageno", "0")
//                .param("pagesize", "10"))
//                .andExpect(status().isRequestTimeout());
//
//    }
//    
//    @Test
//    void testListAlarm_InternalServerError2() throws Exception {
//        when(alarmService.listAlarm(any(Pageable.class))).thenThrow( new RuntimeException("Internal server error"));
//
//        mockMvc.perform(get("/nbi"
//        		+ "/v1/alarmManagement/alarms"))
//        .andExpect(status().isInternalServerError());
//    }
//    
//    @Test
//    void testRetriveAlarm_NotFound() throws Exception {
//        when(alarmService.retrieveAlarm(any(String.class))).thenThrow(new ResponseStatusException(HttpStatus.NOT_FOUND,"Not Found"));
//
//        mockMvc.perform(get("/nbi/v1/alarmManagement/alarms/123"))
//        .andExpect(status().isNotFound());
//
//
//    }
//    
//    @Test
//    void testRetriveAlarm_Ok() throws Exception {
//    	Alarm alarm = new Alarm();
//        when(alarmService.retrieveAlarm(any(String.class))).thenReturn(alarm);
//
//        mockMvc.perform(get("/nbi"
//        		+ "/v1/alarmManagement/alarms/123"))
//        .andExpect(status().isOk());
//    }
//    
//    @Test
//    void testRetriveAlarm_RequestTimeOut() throws Exception {
//        when(alarmService.retrieveAlarm(any(String.class))).thenThrow(new ResponseStatusException(HttpStatus.REQUEST_TIMEOUT,"Request Timeout"));
//
//        mockMvc.perform(get("/nbi"
//        		+ "/v1/alarmManagement/alarms/123"))
//        .andExpect(status().isRequestTimeout());
//    }
//    
//    @Test
//    void testRetriveAlarm_BadRequest() throws Exception {
//        when(alarmService.retrieveAlarm(any(String.class))).thenThrow(new ResponseStatusException(HttpStatus.BAD_REQUEST,"Bad Request"));
//
//        mockMvc.perform(get("/nbi"
//        		+ "/v1/alarmManagement/alarms/123"))
//        .andExpect(status().isBadRequest());
//    }
//    
//    @Test
//    void testRetriveAlarm_Unauthorized() throws Exception {
//        when(alarmService.retrieveAlarm(any(String.class))).thenThrow(new ResponseStatusException(HttpStatus.UNAUTHORIZED,"UNAUTHORIZED"));
//
//        mockMvc.perform(get("/nbi"
//        		+ "/v1/alarmManagement/alarms/123"))
//        .andExpect(status().isUnauthorized());
//    }
//    
//    @Test
//    void testRetriveAlarm_InternalServerError() throws Exception {
//        when(alarmService.retrieveAlarm(any(String.class))).thenThrow(new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,"Internal Server Error"));
//
//        mockMvc.perform(get("/nbi"
//        		+ "/v1/alarmManagement/alarms/123"))
//        .andExpect(status().isInternalServerError());
//    }
//    
//    @Test
//    void testRetriveAlarm_Exception() throws Exception {
//        when(alarmService.retrieveAlarm(any(String.class))).thenThrow(new RuntimeException("Internal server error"));
//
//        mockMvc.perform(get("/nbi"
//        		+ "/v1/alarmManagement/alarms/123"))
//        .andExpect(status().isInternalServerError());
//    }
//    
//    @Test
//    void testRetriveAlarm_InternalServerError2() throws Exception {
//        when(alarmService.retrieveAlarm(any(String.class))).thenThrow( new RuntimeException("Internal server error"));
//
//        mockMvc.perform(get("/nbi"
//        		+ "/v1/alarmManagement/alarms/123"))
//        .andExpect(status().isInternalServerError());
//    }
//    
//
//}
//
