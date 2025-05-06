
 /***
  * ################################################################################################
  * #                                                                                              #
  * #   Copyright (C)  [2019]  [RideNext Software Solutions Pvt Ltd]. All rights  reserved         #
  * #                                                                                              #
  * ################################################################################################
 ****/

package com.nbi.controllers;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.client.HttpStatusCodeException;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.server.ResponseStatusException;
import com.nbi.entity.DeviceDU;
import com.nbi.entity.DeviceData;
import com.nbi.entity.ESEP;
import com.nbi.entity.Inventory;
import com.nbi.services.BasicService;
import com.nbi.services.CUCPService;
import com.nbi.services.CUUPService;
import com.nbi.services.CellService;
import com.nbi.services.DUService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper; 
import org.apache.http.HttpResponse;
import org.apache.http.client.HttpResponseException;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.client.methods.HttpPut;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.nio.charset.StandardCharsets;
import java.util.Base64;
import org.springframework.beans.factory.annotation.Value;
import com.nbi.services.InventoryService;
@RestController
@RequestMapping("/nbi/v1/configuration")
@Tag(name = "Configuration")
public class ConfigurationController {
	@Autowired
    private DUService DUService;
	@Autowired
    private CUCPService CUCPService;
	@Autowired
    private CUUPService CUUPService;
	@Autowired
    private BasicService BasicService;
	@Autowired
    private CellService CellService;
  @Autowired
    private InventoryService InventoryService;
  
  @Autowired
  private CloseableHttpClient CloseableHttpClient;
    @Value("${SDNR_IP}")
  private String nbiIp;
	
	private static final Logger logger = LoggerFactory.getLogger(ConfigurationController.class);
	private final ObjectMapper objectMapper = new ObjectMapper();
	@PostMapping("/{NodeId}")
	public ResponseEntity<String> getDeviceConfig(@RequestBody DeviceData devicedata, @PathVariable String NodeId) {
	    try {
	        // Retrieve inventory for the specified NodeId
	        Inventory inventory = InventoryService.retrieveinventory(NodeId);
	        
	        if(inventory.getStatus().equalsIgnoreCase("Connected")) {
	        	

		        // Parsing CUCPData
		        logger.debug("Parsing CUCPData");
		        CUCPService.createcucp(devicedata.getManagedElement().get(0).getGNBCUCPFunction().get(0), NodeId);
		        logger.debug("Parsing CUCPData Successful");

		        // Parsing CUUPData
		        logger.debug("Parsing CUUPData");
		        CUUPService.createcuup(devicedata.getManagedElement().get(0).getGNBCUUPFunction().get(0), NodeId);
		        logger.debug("Parsing CUUPData Successful");

		        // Parsing DUData
		        logger.debug("Parsing DUData");
		        DUService.createdu(devicedata.getManagedElement().get(0).getGNBDUFunction(), NodeId);
		        logger.debug("Parsing DUData Successful");

		        // Parsing BasicData
		        logger.debug("Parsing BasicData");
		        BasicService.createbasic(devicedata, NodeId);
		        logger.debug("Parsing BasicData Successful");

		        // Parsing CellConfigData
		        logger.debug("Parsing CellConfigData");
		        CellService.createcellconfig(devicedata, NodeId);
		        logger.debug("Parsing CellConfigData Successful");

		        // Call the editconfig method and handle its response
		        String editConfigResponse = editconfig(devicedata, NodeId);
		        logger.debug("EditConfig Response: " + editConfigResponse);

		        return ResponseEntity.ok("Device data processed successfully");
	        }
	        else {
	        	 throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Not Found");
	        }
	    }   catch (ResponseStatusException e) {
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
    }
	    catch (Exception e) {
	        logger.error("Error while updating device data for NodeId " + NodeId, e);
	        throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Internal Server Error", e);
	    }
	}


// Make editconfig public so it can be called from getDeviceConfig

public String editconfig(DeviceData devicedata, String NodeId) {
    String url = "http://" + nbiIp + ":8181/rests/data/network-topology:network-topology/topology=topology-netconf/node=" 
                  + NodeId + "/yang-ext:mount/_3gpp-common-managed-element:ManagedElement=1";
    logger.debug("URL: " + url);

    String username = "admin"; // replace with your username
    String password = "admin"; // replace with your password

    // Encode credentials for Basic Authentication
    String auth = username + ":" + password;
    String authHeader = "Basic " + Base64.getEncoder().encodeToString(auth.getBytes(StandardCharsets.UTF_8));

    // Try-with-resources for CloseableHttpClient
    try  {
        // Create HttpPut request and set headers
        HttpPut httpPut = new HttpPut(url);
        httpPut.setHeader("Authorization", authHeader);
        httpPut.setHeader("Content-Type", "application/json");

        // Convert DeviceData to JSON and wrap in StringEntity
        String json = objectMapper.writeValueAsString(devicedata);
        logger.debug("Request Body: " + json);
        StringEntity entity = new StringEntity(json, StandardCharsets.UTF_8);
        httpPut.setEntity(entity);

        // Execute the request
        HttpResponse response = CloseableHttpClient.execute(httpPut);
        int statusCode = response.getStatusLine().getStatusCode();
        logger.debug("Response Code: " + statusCode);

        // Check if the response status is 204
        if (statusCode == 204) {
            return "Configuration update successful";
        } else {
            // Handle non-204 responses
            String responseBody = EntityUtils.toString(response.getEntity(), StandardCharsets.UTF_8);
            logger.error("Unexpected response: " + responseBody);
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, 
                    "Failed to update configuration: " + responseBody);
        }
    } catch (Exception e) {
        logger.error("Error while updating device data for NodeId " + NodeId, e);
        throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Internal Server Error", e);
    }

}
}
