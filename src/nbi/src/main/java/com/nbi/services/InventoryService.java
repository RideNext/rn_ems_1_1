
 /***
  * ################################################################################################
  * #                                                                                              #
  * #   Copyright (C)  [2019]  [RideNext Software Solutions Pvt Ltd]. All rights  reserved         #
  * #                                                                                              #
  * ################################################################################################
 ****/

package com.nbi.services;

import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.HttpServerErrorException;
import org.springframework.web.client.ResourceAccessException;
import org.springframework.web.server.ResponseStatusException;

import com.nbi.controllers.ClearAlarmController;
import com.nbi.controllers.InventoryController;
import com.nbi.entity.AckAlarm;
import com.nbi.entity.Inventory;
//import com.nbi.repository.AckAlarmRepository;
import com.nbi.repository.InventoryRepository;
import java.lang.RuntimeException;
@Service
public class InventoryService {

	@Autowired
    private InventoryRepository InventoryRepository;
  
	private static final Logger logger = LoggerFactory.getLogger(InventoryController.class);
	
	public Page<Inventory> listinventory(Pageable pageable) {
		
		try {
			Page<Inventory> invdata = InventoryRepository.findAll(pageable);
			logger.debug("Connection to database successful");
	        return invdata;
		}
		catch (HttpClientErrorException e) {
	           if (e.getStatusCode() == HttpStatus.UNAUTHORIZED) {
	               logger.error("Unauthorized: " + e.getMessage());
	               throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Unauthorized access", e);
	           } else if (e.getStatusCode() == HttpStatus.BAD_REQUEST) {
	               logger.error("Bad Request: " + e.getMessage());
	               throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Bad request", e);
	           }else if(e.getStatusCode() == HttpStatus.NOT_FOUND) {
	               logger.error("Not Found: " + e.getMessage());
	               throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Not Found", e);
	           } else {
	               logger.error("Internal server error: " + e.getMessage());
	               throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Server error", e);
	           }
	       } catch (HttpServerErrorException e) {
	           logger.error("Internal server error: " + e.getMessage());
	           throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Internal server error", e);
	       } catch (ResourceAccessException e) {
	           logger.error("Request timeout error: " + e.getMessage());
	           throw new ResponseStatusException(HttpStatus.REQUEST_TIMEOUT, "Request timeout", e);
	       }
	       catch (ResponseStatusException e) {
	        // Pass through any pre-existing ResponseStatusException without wrapping
	           throw e;
		}
	 	catch (Exception e) { 
			logger.error("Unexpected error: " + e.getMessage()); 	
			throw new RuntimeException("Internal server error");
		    } 
    }
	public Inventory retrieveinventory(String id) {
	    try {
	        return InventoryRepository.findById(id)
	            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Inventory with ID " + id + " not found"));
	    } catch (HttpClientErrorException e) {
	           if (e.getStatusCode() == HttpStatus.UNAUTHORIZED) {
	               logger.error("Unauthorized: " + e.getMessage());
	               throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Unauthorized access", e);
	           } else if (e.getStatusCode() == HttpStatus.BAD_REQUEST) {
	               logger.error("Bad Request: " + e.getMessage());
	               throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Bad request", e);
	           }else if(e.getStatusCode() == HttpStatus.NOT_FOUND) {
	               logger.error("Not Found: " + e.getMessage());
	               throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Not Found", e);
	           } else {
	               logger.error("Internal server error: " + e.getMessage());
	               throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Server error", e);
	           }
	       } catch (HttpServerErrorException e) {
	           logger.error("Internal server error: " + e.getMessage());
	           throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Internal server error", e);
	       } catch (ResourceAccessException e) {
	           logger.error("Request timeout error: " + e.getMessage());
	           throw new ResponseStatusException(HttpStatus.REQUEST_TIMEOUT, "Request timeout", e);
	       }
	       catch (ResponseStatusException e) {
	        // Pass through any pre-existing ResponseStatusException without wrapping
	           throw e;
		}
	 	catch (Exception e) { 
			logger.error("Unexpected error: " + e.getMessage()); 	
			throw new RuntimeException("Internal server error");
		    } 
	}

	
	public List<String>listinventoryids(Pageable pageable){
		
		try {
			Page<Inventory> allInventory = InventoryRepository.findAll(pageable);
			logger.debug("Connection to database successful");
	        System.out.println(allInventory);
	        List<String> ids = new ArrayList<>();

	        for (Inventory Inventory : allInventory.getContent()) {
	            ids.add(Inventory.getId());
	        }

	        return ids;
		}
		catch (HttpClientErrorException e) {
	           if (e.getStatusCode() == HttpStatus.UNAUTHORIZED) {
	               logger.error("Unauthorized: " + e.getMessage());
	               throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Unauthorized access", e);
	           } else if (e.getStatusCode() == HttpStatus.BAD_REQUEST) {
	               logger.error("Bad Request: " + e.getMessage());
	               throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Bad request", e);
	           }else if(e.getStatusCode() == HttpStatus.NOT_FOUND) {
	               logger.error("Not Found: " + e.getMessage());
	               throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Not Found", e);
	           } else {
	               logger.error("Internal server error: " + e.getMessage());
	               throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Server error", e);
	           }
	       } catch (HttpServerErrorException e) {
	           logger.error("Internal server error: " + e.getMessage());
	           throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Internal server error", e);
	       } catch (ResourceAccessException e) {
	           logger.error("Request timeout error: " + e.getMessage());
	           throw new ResponseStatusException(HttpStatus.REQUEST_TIMEOUT, "Request timeout", e);
	       }
	       catch (ResponseStatusException e) {
	        // Pass through any pre-existing ResponseStatusException without wrapping
	           throw e;
		}
	 	catch (Exception e) { 
			logger.error("Unexpected error: " + e.getMessage()); 	
			throw new RuntimeException("Internal server error");
		    } 
	}
}
