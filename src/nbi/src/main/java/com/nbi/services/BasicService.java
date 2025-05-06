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
import com.nbi.entity.DeviceCUCPNRCellDUAttributesPLMNInfo;
import com.nbi.entity.DeviceCUCPNRCellDUNRFreqRelationAttributespeeParametersList;
import com.nbi.entity.DeviceCUUP;
import com.nbi.entity.DeviceData;
import com.nbi.entity.DeviceDuNRCellDu;
import com.nbi.entity.DeviceRRMPolicy;
import com.nbi.entity.ESBASIC;
import com.nbi.entity.ESBasicData;
import com.nbi.entity.ESBasicDataCellLocalId;
import com.nbi.entity.ESBasicDataPLMNInfo;
import com.nbi.entity.ESBasicDataPeerlist;
import com.nbi.entity.ESBasicDataRRMPolicyList;
import com.nbi.repository.BasicRepository;
import com.nbi.repository.DURepository;

@Service
public class BasicService {
	@Autowired 
	private ESBASIC esbasic;
	@Autowired
	private ESBasicData esbasicdata;
	@Autowired
	private ESBasicDataCellLocalId esbasiccelllocalid;
	@Autowired
	private ESBasicDataPeerlist esbasicpeerlist;
	@Autowired
	private ESBasicDataPLMNInfo ESBasicDataPLMNInfo;
	@Autowired
	private ESBasicDataRRMPolicyList esbasicrrmpolicy;
	@Autowired
	private BasicRepository basicrepository;
	
	private static final Logger logger = LoggerFactory.getLogger(ConfigurationController.class);
	
	public void createbasic(DeviceData devicedata,String nodeid) {
		try {
			esbasicdata.setDnPrefix(devicedata.getManagedElement().get(0).getAttributes().getDnPrefix());
			esbasicdata.setPriorityLabel(devicedata.getManagedElement().get(0).getAttributes().getPriorityLabel());
			List<ESBasicDataPeerlist> peerlist = new ArrayList<>();
			esbasicpeerlist.setSiteIdentification(devicedata.getManagedElement().get(0).getGNBDUFunction().get(0).getAttributes().getPeeParametersList().getSiteIdentification());
			esbasicpeerlist.setEnvironmentType(devicedata.getManagedElement().get(0).getGNBDUFunction().get(0).getAttributes().getPeeParametersList().getEnvironmentType());
			esbasicpeerlist.setPowerInterface(devicedata.getManagedElement().get(0).getGNBDUFunction().get(0).getAttributes().getPeeParametersList().getPowerInterface());
			esbasicpeerlist.setSiteDescription(devicedata.getManagedElement().get(0).getGNBDUFunction().get(0).getAttributes().getPeeParametersList().getSiteDescription());
			esbasicpeerlist.setId(devicedata.getManagedElement().get(0).getGNBDUFunction().get(0).getAttributes().getPeeParametersList().getSiteIdentification());
			peerlist.add(esbasicpeerlist);
			esbasicdata.setPeerParameterList(peerlist);
			List<ESBasicDataPLMNInfo> plmnlist = new ArrayList<>();
			for(DeviceCUCPNRCellDUAttributesPLMNInfo i : devicedata.getManagedElement().get(0).getGNBDUFunction().get(0).getNrcelldu().get(0).getAttributes().getpLMNInfoList()) {
				ESBasicDataPLMNInfo ESBasicDataPLMNInfo = new ESBasicDataPLMNInfo();
				ESBasicDataPLMNInfo.setId(i.getMcc()+"_"+i.getMnc());
				ESBasicDataPLMNInfo.setName(i.getMcc()+"_"+i.getMnc());
				ESBasicDataPLMNInfo.setMCC(i.getMcc());
				ESBasicDataPLMNInfo.setMNC(i.getMnc());
				plmnlist.add(ESBasicDataPLMNInfo);
			}
			esbasicdata.setPLMNInfo(plmnlist);
			List<ESBasicDataRRMPolicyList> rrmlist = new ArrayList<>();
			int index=0;
			for(DeviceRRMPolicy i : devicedata.getManagedElement().get(0).getGNBDUFunction().get(0).getNrcelldu().get(0).getAttributes().getrRMPolicyMemberList()) {
				ESBasicDataRRMPolicyList esbasicrrmpolicy = new ESBasicDataRRMPolicyList();
				esbasicrrmpolicy.setId(index);
				esbasicrrmpolicy.setName(i.getMcc()+"_"+i.getsNSSAI());
				esbasicrrmpolicy.setPLMNInfo(i.getMcc());
				esbasicrrmpolicy.setSNSSAI(i.getsNSSAI());
				rrmlist.add(esbasicrrmpolicy);
			}
			esbasicdata.setRRMPolicyList(rrmlist);
			List<ESBasicDataCellLocalId> celllocalid = new ArrayList<>();
			for(DeviceDuNRCellDu i : devicedata.getManagedElement().get(index).getGNBDUFunction().get(index).getNrcelldu()) {
				ESBasicDataCellLocalId cellid = new ESBasicDataCellLocalId();
				cellid.setCellLocalId(i.getAttributes().getCellLocalId());
				cellid.setId(i.getId());
				celllocalid.add(cellid);
			}
			esbasicdata.setCellLocalId(celllocalid);
			esbasicdata.setDefaultFileBasedGp(devicedata.getManagedElement().get(0).getMeasurementControl().get(0).getAttributes().getDefaultFileBasedGP());
			esbasicdata.setDefaultFileLocation(devicedata.getManagedElement().get(0).getMeasurementControl().get(0).getAttributes().getDefaultFileLocation());
			esbasicdata.setDefaultFileReportingPeriod(devicedata.getManagedElement().get(0).getMeasurementControl().get(0).getAttributes().getDefaultFileReportingPeriod());
			esbasicdata.setPmaAdministrativeState(devicedata.getManagedElement().get(0).getMeasurementControl().get(0).getAttributes().getpMAdministrativeState());
			esbasic.setNodeId(nodeid);
			esbasic.setBasicdata(esbasicdata);
			
	        	basicrepository.save(esbasic);
	        	logger.debug("Basic Config data saved successfully to database");
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
