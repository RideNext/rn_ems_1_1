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
import com.nbi.entity.DeviceData;
import com.nbi.entity.DeviceDuNRCellDu;
import com.nbi.entity.DeviceRRH;
import com.nbi.entity.ESBASIC;
import com.nbi.entity.ESBasicData;
import com.nbi.entity.ESCellConfig;
import com.nbi.entity.ESCellConfigData;
import com.nbi.entity.ESCellConfigRRH;
import com.nbi.repository.CUUPRepository;
import com.nbi.repository.CellRepository;

@Service
public class CellService {

	@Autowired 
	private ESCellConfig escellconfig;
	@Autowired
	private ESCellConfigData escellconfigdata;
	private static final Logger logger = LoggerFactory.getLogger(ConfigurationController.class);
	@Autowired
	private CellRepository cellrepository;
	public void createcellconfig(DeviceData devicedata,String nodeid) {
		try {

			List<ESCellConfigData> celldata = new ArrayList<>();
			for(DeviceDuNRCellDu i : devicedata.getManagedElement().get(0).getGNBDUFunction().get(0).getNrcelldu()) {
				ESCellConfigData escellconfigdata = new ESCellConfigData();
				escellconfigdata.setArfcnDL(i.getAttributes().getArfcnDL());
				escellconfigdata.setArfcnSUL(i.getAttributes().getArfcnSUL());
				escellconfigdata.setArfcnUL(i.getAttributes().getArfcnUL());
				escellconfigdata.setBsChannelBwDL(i.getAttributes().getbSChannelBwDL());
				escellconfigdata.setBsChannelBwUL(i.getAttributes().getbSChannelBwUL());
				escellconfigdata.setSsbPeriodicity(i.getAttributes().getSsbPeriodicity());
				escellconfigdata.setSsbOfset(i.getAttributes().getSsbOffset());
				escellconfigdata.setSsbDuration(i.getAttributes().getSsbDuration());
				escellconfigdata.setSsbFrequency(i.getAttributes().getSsbFrequency());
				escellconfigdata.setSsbSubCarrierSpacing(i.getAttributes().getSsbSubCarrierSpacing());
				escellconfigdata.setPriorityLabel(devicedata.getManagedElement().get(0).getGNBCUCPFunction().get(0).getNrcelldu().get(0).getAttributes().getPriorityLabel());
				escellconfigdata.setRsrpOffsetSSB(devicedata.getManagedElement().get(0).getGNBCUCPFunction().get(0).getNrcelldu().get(0).getNRFreqRelation().get(0).getAttributes().getOffsetMO().getRsrpOffsetSsb());
				escellconfigdata.setSinrOffsetSSB(devicedata.getManagedElement().get(0).getGNBCUCPFunction().get(0).getNrcelldu().get(0).getNRFreqRelation().get(0).getAttributes().getOffsetMO().getSinrOffsetSsb());
				escellconfigdata.setRsrqOffsetSSB(devicedata.getManagedElement().get(0).getGNBCUCPFunction().get(0).getNrcelldu().get(0).getNRFreqRelation().get(0).getAttributes().getOffsetMO().getRsrqOffsetSsb());
				escellconfigdata.setRsrpOffsetCsiRs(devicedata.getManagedElement().get(0).getGNBCUCPFunction().get(0).getNrcelldu().get(0).getNRFreqRelation().get(0).getAttributes().getOffsetMO().getRsrpOffsetCsiRs());
				escellconfigdata.setRsrqOffsetCsiRs(devicedata.getManagedElement().get(0).getGNBCUCPFunction().get(0).getNrcelldu().get(0).getNRFreqRelation().get(0).getAttributes().getOffsetMO().getRsrqOffsetCsiRs());
				escellconfigdata.setSinrOffsetCsiRs(devicedata.getManagedElement().get(0).getGNBCUCPFunction().get(0).getNrcelldu().get(0).getNRFreqRelation().get(0).getAttributes().getOffsetMO().getSinrOffsetCsiRs());
				escellconfigdata.setPeeParameters(devicedata.getManagedElement().get(0).getGNBCUCPFunction().get(0).getAttributes().getPeeParametersList().getSiteIdentification());
				escellconfigdata.setCellReselectionPriority(devicedata.getManagedElement().get(0).getGNBCUCPFunction().get(0).getNrcelldu().get(0).getNRFreqRelation().get(0).getAttributes().getCellReselectionPriority());
				escellconfigdata.setCellReselectionPriority(devicedata.getManagedElement().get(0).getGNBCUCPFunction().get(0).getNrcelldu().get(0).getNRFreqRelation().get(0).getAttributes().getCellReselectionPriority());
				escellconfigdata.setCellReselectionSubPriority(devicedata.getManagedElement().get(0).getGNBCUCPFunction().get(0).getNrcelldu().get(0).getNRFreqRelation().get(0).getAttributes().getCellReselectionSubPriority());
				escellconfigdata.setpMax(devicedata.getManagedElement().get(0).getGNBCUCPFunction().get(0).getNrcelldu().get(0).getNRFreqRelation().get(0).getAttributes().getpMax());
				escellconfigdata.setqOffsetFrequency(devicedata.getManagedElement().get(0).getGNBCUCPFunction().get(0).getNrcelldu().get(0).getNRFreqRelation().get(0).getAttributes().getqOffsetFreq());
				escellconfigdata.setqQualMin(devicedata.getManagedElement().get(0).getGNBCUCPFunction().get(0).getNrcelldu().get(0).getNRFreqRelation().get(0).getAttributes().getqQualMin());
				escellconfigdata.setqRxLevMin(devicedata.getManagedElement().get(0).getGNBCUCPFunction().get(0).getNrcelldu().get(0).getNRFreqRelation().get(0).getAttributes().getqQualMin());
				escellconfigdata.setThreshXHighP(devicedata.getManagedElement().get(0).getGNBCUCPFunction().get(0).getNrcelldu().get(0).getNRFreqRelation().get(0).getAttributes().getThreshXHighP());
				escellconfigdata.setThreshXHighQ(devicedata.getManagedElement().get(0).getGNBCUCPFunction().get(0).getNrcelldu().get(0).getNRFreqRelation().get(0).getAttributes().getThreshXHighQ());
				escellconfigdata.setThreshXLowP(devicedata.getManagedElement().get(0).getGNBCUCPFunction().get(0).getNrcelldu().get(0).getNRFreqRelation().get(0).getAttributes().getThreshXLowP());
				escellconfigdata.setThreshXLowQ(devicedata.getManagedElement().get(0).getGNBCUCPFunction().get(0).getNrcelldu().get(0).getNRFreqRelation().get(0).getAttributes().getThreshXLowQ());
				escellconfigdata.settReselectionNR(devicedata.getManagedElement().get(0).getGNBCUCPFunction().get(0).getNrcelldu().get(0).getNRFreqRelation().get(0).getAttributes().gettReselectionNR());
				escellconfigdata.settReselectionNRSfHigh(devicedata.getManagedElement().get(0).getGNBCUCPFunction().get(0).getNrcelldu().get(0).getNRFreqRelation().get(0).getAttributes().gettReselectionNRSfHigh());
				escellconfigdata.settReselectionNRSfMedium(devicedata.getManagedElement().get(0).getGNBCUCPFunction().get(0).getNrcelldu().get(0).getNRFreqRelation().get(0).getAttributes().gettReselectionNRSfMedium());
				escellconfigdata.setnRFrequencyref(devicedata.getManagedElement().get(0).getGNBCUCPFunction().get(0).getNrcelldu().get(0).getNRFreqRelation().get(0).getAttributes().getnRFrequencyRef());
				escellconfigdata.setCellId("cell"+i.getId());
				List<ESCellConfigRRH> rrhdata = new ArrayList<>();
				for(DeviceRRH j : devicedata.getManagedElement().get(0).getRrh()) {
					ESCellConfigRRH ESCellConfigRRH = new ESCellConfigRRH();
					ESCellConfigRRH.setId(j.getId());
					ESCellConfigRRH.setMimoMode(j.getAllRRHInfo().getMimoMode());
					ESCellConfigRRH.setAntennaType(j.getAllRRHInfo().getAntennaType());
					ESCellConfigRRH.setRetEnabled(j.getAllRRHInfo().isRetEnabled());
					ESCellConfigRRH.setCpriRate(j.getAllRRHInfo().getCpriRate());
					ESCellConfigRRH.setSetRRHDate(j.getAllRRHInfo().isSetRRHDate());
					ESCellConfigRRH.setDuplexMode(j.getAllRRHInfo().getDuplexMode());
					ESCellConfigRRH.setDlEarfcn(j.getAllRRHInfo().getDlEarfcn());
					ESCellConfigRRH.setUlEarfcn(j.getAllRRHInfo().getUlEarfcn());
					ESCellConfigRRH.setFrequencyBand(j.getAllRRHInfo().getFrequencyBand());
					ESCellConfigRRH.setBandWidth(j.getAllRRHInfo().getBandWidth());
					ESCellConfigRRH.setTxDelay(j.getAllRRHInfo().getDelayParam().getTxDelay());
					ESCellConfigRRH.setRxDelay(j.getAllRRHInfo().getDelayParam().getRxDelay());
					ESCellConfigRRH.setLoopBackEnabled(j.getAllRRHInfo().getCpriLoopback().isLoopBackEnabled());
					ESCellConfigRRH.setMode(j.getAllRRHInfo().getCpriLoopback().getMode());
					ESCellConfigRRH.setTestTime(j.getAllRRHInfo().getCpriLoopback().getTestTime());
					ESCellConfigRRH.setAntennaId(j.getAllRRHInfo().getAntennaConfig().getAntennaId());
					ESCellConfigRRH.setAntennaGain(j.getAllRRHInfo().getAntennaConfig().getAntennaGain());
					ESCellConfigRRH.setTxPower(j.getAllRRHInfo().getAntennaConfig().getTxPower());
					rrhdata.add(ESCellConfigRRH);
				}
				escellconfigdata.setRRHList(rrhdata);
				celldata.add(escellconfigdata);
			}
			escellconfig.setNodeId(nodeid);
			escellconfig.setCellConfigdata(celldata);
			
			cellrepository.save(escellconfig);
			logger.debug("CellConfig data saved successfully to database");
		

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
