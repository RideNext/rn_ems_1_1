
 /***
  * ################################################################################################
  * #                                                                                              #
  * #   Copyright (C)  [2019]  [RideNext Software Solutions Pvt Ltd]. All rights  reserved         #
  * #                                                                                              #
  * ################################################################################################
 ****/

package com.nbi.services;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.HttpServerErrorException;
import org.springframework.web.client.ResourceAccessException;
import org.springframework.web.server.ResponseStatusException;

import com.nbi.controllers.ConfigurationController;
import com.nbi.entity.Alarm;
import com.nbi.entity.DeviceCUUP;
import com.nbi.entity.ESCUUP;
import com.nbi.entity.ESCUUPData;
import com.nbi.entity.ESEP;
import com.nbi.repository.CUUPRepository;

@Service
public class CUUPService {
	
	@Autowired
    private ESEP esepS1U;

    @Autowired
    private ESEP esepNgU; 

    @Autowired
    private ESEP esepX2U;

    @Autowired
    private ESEP esepF1U; 
    
    @Autowired
    private ESCUUP escuup; 
	
	@Autowired
    private ESCUUPData escuupdata;
	
	@Autowired
	private CUUPRepository cuuprepository;
	
	private static final Logger logger = LoggerFactory.getLogger(ConfigurationController.class);
	
	public void createcuup(DeviceCUUP devicecuup,String nodeid) {
		try {
			List<ESEP> eseplist = new ArrayList<>();
			escuupdata.setPriorityLabel(devicecuup.getAttributes().getPriorityLabel()); 
			escuupdata.setgNBId(devicecuup.getAttributes().getgNBId()); 
			escuupdata.setRRMPolicy(devicecuup.getAttributes().getrRMPolicyMemberList().get(0).getMcc()+"_"+devicecuup.getAttributes().getrRMPolicyMemberList().get(0).getsNSSAI());  
			escuupdata.setResourceType(devicecuup.getAttributes().getResourceType()); 
			
			esepS1U.setEndPoint("EP_S1U");
			esepS1U.setLocalIPAddress(devicecuup.getEpS1U().get(0).getAttributes().getLocalAddress().get(0).getIpAddress()); 
			esepS1U.setVLANId(devicecuup.getEpS1U().get(0).getAttributes().getLocalAddress().get(0).getVlanId()); 
			esepS1U.setRemoteIpAddress(devicecuup.getEpS1U().get(0).getAttributes().getRemoteAddress()); 
			eseplist.add(esepS1U);
			
			esepNgU.setEndPoint("EP_NgU");
			esepNgU.setLocalIPAddress(devicecuup.getEpNgU().get(0).getAttributes().getLocalAddress().get(0).getIpAddress()); 
			esepNgU.setVLANId(devicecuup.getEpNgU().get(0).getAttributes().getLocalAddress().get(0).getVlanId()); 
			esepNgU.setRemoteIpAddress(devicecuup.getEpNgU().get(0).getAttributes().getRemoteAddress());
			eseplist.add(esepNgU);
			
			esepX2U.setEndPoint("EP_X2U");
			esepX2U.setLocalIPAddress(devicecuup.getEpX2U().get(0).getAttributes().getLocalAddress().get(0).getIpAddress()); 
			esepX2U.setVLANId(devicecuup.getEpX2U().get(0).getAttributes().getLocalAddress().get(0).getVlanId()); 
			esepX2U.setRemoteIpAddress(devicecuup.getEpX2U().get(0).getAttributes().getRemoteAddress());
			eseplist.add(esepX2U);
			
			esepF1U.setEndPoint("EP_F1U");
			esepF1U.setLocalIPAddress(devicecuup.getEpF1U().get(0).getAttributes().getLocalAddress().get(0).getIpAddress()); 
			esepF1U.setVLANId(devicecuup.getEpF1U().get(0).getAttributes().getLocalAddress().get(0).getVlanId()); 
			esepF1U.setRemoteIpAddress(devicecuup.getEpF1U().get(0).getAttributes().getRemoteAddress());
			eseplist.add(esepF1U);
			escuupdata.setEndPointList(eseplist);
			
			escuup.setNodeId(nodeid);
			escuup.setCuupdata(escuupdata);
			
				cuuprepository.save(escuup);
				logger.debug("CUUPConfig data saved successfully to database");
			
			
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
	 		throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Unexpected error occurred", e);
	 	    } 
    }
}
