
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
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.HttpServerErrorException;
import org.springframework.web.client.ResourceAccessException;
import org.springframework.web.server.ResponseStatusException;

import com.nbi.controllers.ConfigurationController;
import com.nbi.entity.DeviceCUCP;
import com.nbi.entity.DeviceCUCPNRCellDU;
import com.nbi.entity.DeviceCUUP;
import com.nbi.entity.ESCUCP;
import com.nbi.entity.ESCUCPData;
import com.nbi.entity.ESCUCPNRCellCU;
import com.nbi.entity.ESEP;
import com.nbi.repository.CUCPRepository;
import com.nbi.repository.CUUPRepository;

@Service
public class CUCPService {
	@Autowired 
	private ESCUCP escucp;
	
	@Autowired
	private ESCUCPData escucpdata;
	
	@Autowired
	private ESEP esepF1C;
	
	@Autowired
	private ESEP esepXnC;
	
	@Autowired
	private ESEP esepNgC;
	
	@Autowired
	private ESCUCPNRCellCU nrcellcu;
	
	@Autowired
	private ESEP esepX2C;
	
	@Autowired
	private CUCPRepository cucprepository;
	
	private static final Logger logger = LoggerFactory.getLogger(ConfigurationController.class);
	
	public void createcucp(DeviceCUCP devicecucp,String nodeid) {
		try {
			escucpdata.setPriorityLabel(devicecucp.getAttributes().getPriorityLabel());
			escucpdata.setResourceType(devicecucp.getAttributes().getResourceType());
			escucpdata.setRrmPolicyList(devicecucp.getNrcelldu().get(0).getAttributes().getpLMNInfoList().get(0).getMcc()+"_"+devicecucp.getNrcelldu().get(0).getAttributes().getpLMNInfoList().get(0).getsNssai());
			
			List<ESEP> EndPointList = new ArrayList<>();
			
			esepF1C.setEndPoint("EP_F1C");
			esepF1C.setLocalIPAddress(devicecucp.getEpF1C().get(0).getAttributes().getLocalAddress().get(0).getIpAddress());
			esepF1C.setRemoteIpAddress(devicecucp.getEpF1C().get(0).getAttributes().getRemoteAddress());
			esepF1C.setVLANId(devicecucp.getEpF1C().get(0).getAttributes().getLocalAddress().get(0).getVlanId());
			
			EndPointList.add(esepF1C);
			
			esepXnC.setEndPoint("EP_XnC");
			esepXnC.setLocalIPAddress(devicecucp.getEpXnC().get(0).getAttributes().getLocalAddress().get(0).getIpAddress());
			esepXnC.setRemoteIpAddress(devicecucp.getEpXnC().get(0).getAttributes().getRemoteAddress());
			esepXnC.setVLANId(devicecucp.getEpXnC().get(0).getAttributes().getLocalAddress().get(0).getVlanId());
			
			EndPointList.add(esepXnC);
			
			esepNgC.setEndPoint("EP_NgC");
			esepNgC.setLocalIPAddress(devicecucp.getEpNgC().get(0).getAttributes().getLocalAddress().get(0).getIpAddress());
			esepNgC.setRemoteIpAddress(devicecucp.getEpNgC().get(0).getAttributes().getRemoteAddress());
			esepNgC.setVLANId(devicecucp.getEpNgC().get(0).getAttributes().getLocalAddress().get(0).getVlanId());
			
			EndPointList.add(esepNgC);
			
			esepX2C.setEndPoint("EP_X2C");
			esepX2C.setLocalIPAddress(devicecucp.getEpX2C().get(0).getAttributes().getLocalAddress().get(0).getIpAddress());
			esepX2C.setRemoteIpAddress(devicecucp.getEpX2C().get(0).getAttributes().getRemoteAddress());
			esepX2C.setVLANId(devicecucp.getEpX2C().get(0).getAttributes().getLocalAddress().get(0).getVlanId());
			
			EndPointList.add(esepX2C);
			
			escucpdata.setEndPointList(EndPointList);
			escucpdata.setUserLabel(devicecucp.getNrcelldu().get(0).getNRFreqRelation().get(0).getAttributes().getUserLabel());
			escucpdata.setgNBCUName(devicecucp.getAttributes().getgNBCUName());
			escucpdata.setgNBIDLength(devicecucp.getAttributes().getgNBIdLength());
			escucpdata.setgNBID(devicecucp.getAttributes().getgNBId());
			escucpdata.setPeeParameters(devicecucp.getAttributes().getPeeParametersList().getSiteIdentification());
			escucpdata.setPlmnId(devicecucp.getAttributes().getpLMNId().get(0).getMcc()+"_"+devicecucp.getAttributes().getpLMNId().get(0).getMnc());
	        
			List<ESCUCPNRCellCU> nrcellcuList = new ArrayList<>();
			for(DeviceCUCPNRCellDU i : devicecucp.getNrcelldu()) {
				nrcellcu.setPrioritylabel(i.getAttributes().getPriorityLabel());
				nrcellcu.setCellLocalId(i.getAttributes().getCellLocalId());
				nrcellcu.setCellId("cell"+i.getId());
				nrcellcu.setPLMNId(devicecucp.getNrcelldu().get(0).getAttributes().getpLMNInfoList().get(0).getMcc()+"_"+devicecucp.getNrcelldu().get(0).getAttributes().getpLMNInfoList().get(0).getMnc());
				nrcellcuList.add(nrcellcu);
			}
			
			escucpdata.setNRCellCuList(nrcellcuList);
      escucpdata.setCipheringAlgoPrio(""); 
      escucpdata.setIntegrityProtectAlgoPrio("");
			escucp.setNodeId(nodeid);
			escucp.setCucpdata(escucpdata);
			
				cucprepository.save(escucp);
				logger.debug("CUCPConfig data saved successfully to database");
			
			
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
