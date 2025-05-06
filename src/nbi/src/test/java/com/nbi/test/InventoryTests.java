package com.nbi.test;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.nbi.services.InventoryService;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.HttpServerErrorException;
import org.springframework.web.client.ResourceAccessException;

import com.nbi.entity.Alarm;
import com.nbi.entity.Inventory;
import com.nbi.repository.InventoryRepository;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@SpringBootTest
@AutoConfigureMockMvc
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class InventoryTests {

    @Autowired
    private MockMvc mockMvc;
    
    @Autowired
    private InventoryService invservice; 
    @MockBean
    private InventoryRepository inventoryRepository;

    private String inventoryId = "valid-id";

    @Test
    void testListInventory_Service_OK() throws Exception {
    	Pageable pageable = PageRequest.of(0, 10);
        when(inventoryRepository.findAll(pageable)).thenReturn(Page.empty());

        mockMvc.perform(get("/nbi/v1/getInventory")
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());

    }
    @Test
    void testListInventory_Service_NotFound() throws Exception {
        when(inventoryRepository.findAll(any(Pageable.class))).thenThrow(new HttpClientErrorException(HttpStatus.NOT_FOUND));;

        mockMvc.perform(get("/nbi/v1/getInventory"))
                .andExpect(status().isNotFound());

    }
    @Test
    void testListInventory_Service_Unauthorized() throws Exception {
        when(inventoryRepository.findAll(any(Pageable.class)))
                .thenThrow(new HttpClientErrorException(HttpStatus.UNAUTHORIZED));

        mockMvc.perform(get("/nbi/v1/getInventory"))
                .andExpect(status().isUnauthorized());

    }
    @Test
    void testListInventory_Service_BadRequest() throws Exception {
        when(inventoryRepository.findAll(any(Pageable.class)))
                .thenThrow(new HttpClientErrorException(HttpStatus.BAD_REQUEST, "Bad request"));

        mockMvc.perform(get("/nbi/v1/getInventory"))
                .andExpect(status().isBadRequest());

    }
    
    @Test
    void testListInventory_Service_InternalServerError() throws Exception {
        Pageable pageable = PageRequest.of(0, 10);
        when(inventoryRepository.findAll(pageable)).thenThrow(new HttpServerErrorException(HttpStatus.INTERNAL_SERVER_ERROR, "Internal server error"));

        mockMvc.perform(get("/nbi/v1/getInventory")
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isInternalServerError());

    }
    @Test
    void testListInventory_Service_InternalServerError_2() throws Exception {
    	Pageable pageable = PageRequest.of(0, 10);
        when(inventoryRepository.findAll(pageable)).thenThrow(new RuntimeException("Database connection error"));

        mockMvc.perform(get("/nbi/v1/getInventory")
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isInternalServerError());
    }
    
    @Test
    void testListInventory_Service_InternalServerError_3() throws Exception {
        when(inventoryRepository.findAll(any(Pageable.class)))
                .thenThrow(new HttpClientErrorException(HttpStatus.INTERNAL_SERVER_ERROR, "Internal Server Error"));

        mockMvc.perform(get("/nbi/v1/getInventory"))
                .andExpect(status().isInternalServerError());
    }

    @Test
    void testListInventory_Service_RequestTimeout() throws Exception {
        when(inventoryRepository.findAll(any(Pageable.class)))
                .thenThrow(new ResourceAccessException("Request timeout"));

        mockMvc.perform(get("/nbi/v1/getInventory"))
                .andExpect(status().isRequestTimeout());

    }
    
    
    @Test
    void testRetriveInventory_Service_OK() throws Exception {
    	 when(inventoryRepository.findById(any(String.class))).thenReturn(java.util.Optional.of(new Inventory()));

        mockMvc.perform(get("/nbi/v1/getInventory/invalid-id"))
                .andExpect(status().isOk());

    }
    @Test
    void testRetriveInventory_Service_NotFound() throws Exception {
        when(inventoryRepository.findById(any(String.class))).thenThrow(new HttpClientErrorException(HttpStatus.NOT_FOUND));;

        mockMvc.perform(get("/nbi/v1/getInventory/invalid-id"))
                .andExpect(status().isNotFound());

    }
    @Test
    void testRetriveInventory_Service_Unauthorized() throws Exception {
        when(inventoryRepository.findById(any(String.class)))
                .thenThrow(new HttpClientErrorException(HttpStatus.UNAUTHORIZED));

        mockMvc.perform(get("/nbi/v1/getInventory/invalid-id"))
                .andExpect(status().isUnauthorized());

    }
    @Test
    void testRetriveInventory_Service_BadRequest() throws Exception {
        when(inventoryRepository.findById(any(String.class)))
                .thenThrow(new HttpClientErrorException(HttpStatus.BAD_REQUEST, "Bad request"));

        mockMvc.perform(get("/nbi/v1/getInventory/invalid-id"))
                .andExpect(status().isBadRequest());

    }
    
    @Test
    void testRetriveInventory_Service_InternalServerError() throws Exception {
        when(inventoryRepository.findById(any(String.class)))
                .thenThrow(new HttpServerErrorException(HttpStatus.INTERNAL_SERVER_ERROR, "Internal server error"));

        mockMvc.perform(get("/nbi/v1/getInventory/invalid-id"))
                .andExpect(status().isInternalServerError());

    }
    @Test
    void testRetriveInventory_Service_InternalServerError_2() throws Exception {
        when(inventoryRepository.findById(any(String.class)))
                .thenThrow(new RuntimeException("Internal server error"));

        mockMvc.perform(get("/nbi/v1/getInventory/invalid-id"))
                .andExpect(status().isInternalServerError());
    }
    
    @Test
    void testRetriveInventory_Service_InternalServerError_3() throws Exception {
        when(inventoryRepository.findById(any(String.class)))
                .thenThrow(new HttpClientErrorException(HttpStatus.INTERNAL_SERVER_ERROR, "Internal Server Error"));

        mockMvc.perform(get("/nbi/v1/getInventory/invalid-id"))
                .andExpect(status().isInternalServerError());
    }

    @Test
    void testRetriveInventory_Service_RequestTimeout() throws Exception {
        when(inventoryRepository.findById(any(String.class)))
                .thenThrow(new ResourceAccessException("Request timeout"));

        mockMvc.perform(get("/nbi/v1/getInventory/invalid-id"))
                .andExpect(status().isRequestTimeout());

    }
    
    @Test
    void testRetriveInventory_Service_NotFoundException() throws Exception {

        mockMvc.perform(get("/nbi/v1/getInventory/invalid-id"))
                .andExpect(status().isNotFound());

    }

    
    @Test
    void testListInventoryIds_Service_OK() throws Exception {
    	
    	 Pageable pageable = PageRequest.of(0, 10);
    	 Inventory inv = new Inventory();
        Page<Inventory> invPage = new PageImpl<>(List.of(inv), pageable, 1);
        when(inventoryRepository.findAll(any(Pageable.class))).thenReturn(invPage);

        mockMvc.perform(get("/nbi/v1/getInventory/getallIds")
                .param("pageno", "0")
                .param("pagesize", "10"))
                .andExpect(status().isOk());

    }
    @Test
    void testListInventoryIds_Service_NotFound() throws Exception {
        Page<Alarm> emptyPage = new PageImpl<>(Collections.emptyList(), PageRequest.of(1, 10), 0);
        when(inventoryRepository.findAll(any(Pageable.class))).thenThrow(new HttpClientErrorException(HttpStatus.NOT_FOUND));

        mockMvc.perform(get("/nbi/v1/getInventory/getallIds")
                .param("pageno", "1")
                .param("pagesize", "10"))
                .andExpect(status().isNotFound());

    }
    @Test
    void testListInventoryIds_Service_Unauthorized() throws Exception {
        when(inventoryRepository.findAll(any(Pageable.class)))
                .thenThrow(new HttpClientErrorException(HttpStatus.UNAUTHORIZED));

        mockMvc.perform(get("/nbi/v1/getInventory/getallIds")
                .param("pageno", "0")
                .param("pagesize", "10"))
                .andExpect(status().isUnauthorized());

    }
    @Test
    void testListInventoryIds_Service_BadRequest() throws Exception {
        when(inventoryRepository.findAll(any(Pageable.class)))
                .thenThrow(new HttpClientErrorException(HttpStatus.BAD_REQUEST, "Bad request"));

        mockMvc.perform(get("/nbi/v1/getInventory/getallIds")
                .param("pageno", "1")
                .param("pagesize", "10"))
                .andExpect(status().isBadRequest());

    }
    
    @Test
    void testListInventoryIds_Service_InternalServerError() throws Exception {
        when(inventoryRepository.findAll(any(Pageable.class)))
                .thenThrow(new HttpServerErrorException(HttpStatus.INTERNAL_SERVER_ERROR, "Internal server error"));

        mockMvc.perform(get("/nbi/v1/getInventory/getallIds")
                .param("pageno", "0")
                .param("pagesize", "10"))
                .andExpect(status().isInternalServerError());

    }
    @Test
    void testListInventoryIds_Service_InternalServerError_2() throws Exception {
        when(inventoryRepository.findAll(any(Pageable.class)))
                .thenThrow(new RuntimeException("Internal server error"));

        mockMvc.perform(get("/nbi/v1/getInventory/getallIds")
                .param("pageno", "0")
                .param("pagesize", "10"))
                .andExpect(status().isInternalServerError());
    }
    
    @Test
    void testListInventoryIds_Service_InternalServerError_3() throws Exception {
        when(inventoryRepository.findAll(any(Pageable.class)))
                .thenThrow(new HttpClientErrorException(HttpStatus.INTERNAL_SERVER_ERROR, "Internal Server Error"));

        mockMvc.perform(get("/nbi/v1/getInventory/getallIds")
                .param("pageno", "0")
                .param("pagesize", "10"))
                .andExpect(status().isInternalServerError());
    }

    @Test
    void testListInventoryIds_Service_RequestTimeout() throws Exception {
        when(inventoryRepository.findAll(any(Pageable.class)))
                .thenThrow(new ResourceAccessException("Request timeout"));

        mockMvc.perform(get("/nbi/v1/getInventory/getallIds")
                .param("pageno", "0")
                .param("pagesize", "10"))
                .andExpect(status().isRequestTimeout());

    }


}
