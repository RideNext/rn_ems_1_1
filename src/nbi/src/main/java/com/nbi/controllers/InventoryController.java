
 /***
  * ################################################################################################
  * #                                                                                              #
  * #   Copyright (C)  [2019]  [RideNext Software Solutions Pvt Ltd]. All rights  reserved         #
  * #                                                                                              #
  * ################################################################################################
 ****/

package com.nbi.controllers;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.nbi.entity.Inventory;
import com.nbi.repository.InventoryRepository;
import com.nbi.services.InventoryService;

import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/nbi/v1/getInventory")
@Tag(name = "Inventory")
public class InventoryController {
	@Autowired
    private InventoryService InventoryService;
	
	private static final Logger logger = LoggerFactory.getLogger(InventoryController.class);
    
    @Autowired
    private InventoryRepository InventoryRepository;
	 @GetMapping
	    public ResponseEntity<Page<Inventory>> listInventory(
	            @RequestParam(name = "offset", defaultValue = "0") int offset,
	            @RequestParam(name = "limit", defaultValue = "10") int limit) {

	    	    try {
	    	    	Pageable pageable = PageRequest.of(offset, limit);
		    	    logger.debug("-------------------");
			        Page<Inventory> inventory = InventoryService.listinventory(pageable);
			        logger.debug("Successsfully listed all inventory details");
			        return ResponseEntity.ok(inventory);
	    	    }
	    	    catch (ResponseStatusException e) {
	            	int statusCode = e.getRawStatusCode();
	                if (statusCode == 404) {
	                	 logger.error("Not Found: " + e.getMessage());
	                	 throw e;
	                } else if (statusCode == 400) {
	                	 logger.error("Bad Request: " + e.getMessage());
	                	 throw e;
	                } else if (statusCode == 408) {
	                	 logger.error("Request Timeout: " + e.getMessage());
	                	 throw e;
	                } else if (statusCode == 401) {
	                	 logger.error("UnAuthorized: " + e.getMessage());
	                	 throw e;
	                } else {
	                	 logger.error("Internal Server Error: " + e.getMessage());
	                	 throw e;
	                }
	            }catch (Exception e) {
	                logger.error("Unexpected error: " + e.getMessage());
	                throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Unexpected error occurred", e);
	            }
	      
	    }
	 @GetMapping("/{id}")
	 public ResponseEntity<Inventory> retrieveinventory(@PathVariable String id) {
	     try {
	         logger.debug("Attempting to retrieve inventory for id: " + id);
	         Inventory inventory = InventoryService.retrieveinventory(id);
	         logger.debug("Successfully retrieved inventory details for id " + id);
	         return ResponseEntity.ok(inventory);
	     }  catch (ResponseStatusException e) {
	        	int statusCode = e.getRawStatusCode();
	            if (statusCode == 404) {
	            	 logger.error("Not Found: " + e.getMessage());
	            	 throw e;
	            } else if (statusCode == 400) {
	            	 logger.error("Bad Request: " + e.getMessage());
	            	 throw e;
	            } else if (statusCode == 408) {
	            	 logger.error("Request Timeout: " + e.getMessage());
	            	 throw e;
	            } else if (statusCode == 401) {
	            	 logger.error("UnAuthorized: " + e.getMessage());
	            	 throw e;
	            } else {
	            	 logger.error("Internal Server Error: " + e.getMessage());
	            	 throw e;
	            }
	        }catch (Exception e) {
	            logger.error("Unexpected error: " + e.getMessage());
	            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Unexpected error occurred", e);
	        }
	 }

	 
	 @GetMapping("/getallIds")
	    public ResponseEntity<List<String>> listinventoryids(
	            @RequestParam(name = "offset", defaultValue = "0") int offset,
	            @RequestParam(name = "limit", defaultValue = "10") int limit) {
		 try {
	    		logger.debug("-------------------");
	    		Pageable pageable = PageRequest.of(offset, limit);
		    	List<String> inventory = InventoryService.listinventoryids(pageable);

		    	 logger.debug("Successsfully listed all inventory ID's");
		        return ResponseEntity.ok(inventory);
	 }
		 catch (ResponseStatusException e) {
	        	int statusCode = e.getRawStatusCode();
	            if (statusCode == 404) {
	            	 logger.error("Not Found: " + e.getMessage());
	            	 throw e;
	            } else if (statusCode == 400) {
	            	 logger.error("Bad Request: " + e.getMessage());
	            	 throw e;
	            } else if (statusCode == 408) {
	            	 logger.error("Request Timeout: " + e.getMessage());
	            	 throw e;
	            } else if (statusCode == 401) {
	            	 logger.error("UnAuthorized: " + e.getMessage());
	            	 throw e;
	            } else {
	            	 logger.error("Internal Server Error: " + e.getMessage());
	            	 throw e;
	            }
	        }catch (Exception e) {
	            logger.error("Unexpected error: " + e.getMessage());
	            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Unexpected error occurred", e);
	        }
	    	
	    }
}
