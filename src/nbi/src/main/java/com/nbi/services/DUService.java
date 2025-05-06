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
import com.nbi.entity.*;
import com.nbi.repository.CUUPRepository;
import com.nbi.repository.DURepository;
@Service
public class DUService {
	@Autowired
    private ESDUEP esepf1c;
	@Autowired
    private ESDUEP esepf1u;
	@Autowired
    private ESDU esdu;
	@Autowired
    private ESDUData esdudata;
	@Autowired
    private ESDUDataBwpList esdudatabwplist;
	@Autowired
    private ESDUDataDrxProfileIdInfoList esdrxprofileinfolist;
	
	@Autowired
    private ESDUDataManagedNFServiceList esmanagedservicelist;
	@Autowired
    private ESDUDataNRCellDUList esnrcelldulist;
	@Autowired
    private ESDUDataPrbDlInfoList esprbdlinfolist;
	@Autowired
    private ESDUDataScellDeactiveInfoList esscelldeactiveinfolist;
	@Autowired
    private ESDUDataSchedulingReqConfInfoList esschedulingreqinfolist;
	@Autowired
    private ESDUDataSectorCarrierList essectorcarrierlist;
	@Autowired
    private ESDUORANConfigMACConfigSRBList essrbinfo;
	@Autowired
    private ESDUODUWindowDataList esoduwindowlist;
	@Autowired
    private ESDUODUWindowDataListPrbUlInfolist esoduwindowprbulinfolist;
	@Autowired
    private ESDUODUWindowDataListPrbUlInfolist esoduwindowprbdlinfolist;
	@Autowired
    private ESDUPreconfRUProfileList espreconfrulist;
	@Autowired
	private ESDUORANConfigMACConfigQOSList qoslist;
	
	@Autowired
	private DURepository duprepository;
	
	private static final Logger logger = LoggerFactory.getLogger(ConfigurationController.class);
	public void createdu(List<DeviceDU> devicedata,String nodeid) {
		try {
			List<ESDUData> esdudataa = new ArrayList<>();
			for(DeviceDU devicedu: devicedata ) {
				ESDUData	esdudata= new ESDUData();
			esdudata.setDuid("DU "+devicedu.getId());
			esdudata.setUserLabel(devicedu.getAttributes().getUserLabel());
			esdudata.setgNBDUId(devicedu.getAttributes().getgNBDUId());
			esdudata.setgNBIdLength(devicedu.getAttributes().getgNBIdLength());
			esdudata.setPeeParameters(devicedu.getAttributes().getPeeParametersList().getSiteIdentification());
			esdudata.setRrmPolicyList(devicedu.getAttributes().getrRMPolicyMemberList().get(0).getMcc()+"_"+devicedu.getAttributes().getrRMPolicyMemberList().get(0).getsNSSAI());
			esdudata.setResourceType(devicedu.getAttributes().getResourceType());
			esdudata.setPriorityLabel(devicedu.getAttributes().getPriorityLabel());
			List<ESDUDataManagedNFServiceList> esmanagednflist = new ArrayList<>();
			for(DeviceDuManagedNFService i : devicedu.getManagedNFService()) {
				ESDUDataManagedNFServiceList esmanagedservicelist =new ESDUDataManagedNFServiceList();
				esmanagedservicelist.setId(i.getId());
				esmanagedservicelist.setSaphost(i.getAttributes().getsAP().get(0).getHost());
				esmanagedservicelist.setSapport(i.getAttributes().getsAP().get(0).getPort());
				esmanagedservicelist.setOperationsName(i.getAttributes().getOperations().get(0).getName());
				esmanagedservicelist.setOperationsAllowed(i.getAttributes().getOperations().get(0).getAllowedNFTypes().get(0));
				esmanagedservicelist.setAdministrativeState(i.getAttributes().getAdministrativeState());
				esmanagednflist.add(esmanagedservicelist);
			}
			esdudata.setManagedNFServiceList(esmanagednflist);
			List<ESDUEP> eseplist = new ArrayList<>();
			esepf1c.setEndPoint("EP_F1C");
			esepf1c.setLocalIPAddress(devicedu.getEpf1c().get(0).getAttributes().getLocalAddress().get(0).getIpAddress());
			esepf1c.setRemoteIPAddress(devicedu.getEpf1c().get(0).getAttributes().getRemoteAddress());
			esepf1c.setVLANID(devicedu.getEpf1c().get(0).getAttributes().getLocalAddress().get(0).getVlanId());
			eseplist.add(esepf1c);
			
			esepf1u.setEndPoint("EP_F1U");
			esepf1u.setLocalIPAddress(devicedu.getEpf1u().get(0).getAttributes().getLocalAddress().get(0).getIpAddress());
			esepf1u.setRemoteIPAddress(devicedu.getEpf1u().get(0).getAttributes().getRemoteAddress());
			esepf1u.setVLANID(devicedu.getEpf1u().get(0).getAttributes().getLocalAddress().get(0).getVlanId());
			eseplist.add(esepf1u);
			esdudata.setEndPointList(eseplist);
			
			esdudata.setDUIndex(devicedu.getFhmanagement().getSyncstate().getDuindex());
			esdudata.setSyncState(devicedu.getFhmanagement().getSyncstate().getSyncstate());
			esdudata.setMethod(devicedu.getFhmanagement().getWindowdeterminemethod().getMethod());
			esdudata.setConfigStatus(devicedu.getFhmanagement().getWindowdeterminemethod().getConfigurationstatus());
			esdudata.setRUCount(devicedu.getFhmanagement().getWindowdeterminemethod().getRunum());
			
			List<ESDUPreconfRUProfileList> profilelist = new ArrayList<>();
			
			for(DeviceHHODUWindowDetermineMethodRUProfile i : devicedu.getFhmanagement().getWindowdeterminemethod().getRuprofile()) {
				ESDUPreconfRUProfileList espreconfrulist = new ESDUPreconfRUProfileList();
				espreconfrulist.setId(i.getRuindex());
				espreconfrulist.setRUIndex(i.getRuindex());
				espreconfrulist.setRUInstanceId(i.getRuinstanceid());
				profilelist.add(espreconfrulist);
			}
			esdudata.setPreconfRUProfileList(profilelist);
//			List<ESDUODUWindowDataList> odulist = new ArrayList<>();
//			for(DeviceFHManagementODUWindow i : devicedu.getFhmanagement().getOduwindow()) {
//				ESDUODUWindowDataList esoduwindowlist = new ESDUODUWindowDataList();
//				List<ESDUODUWindowDataListPrbUlInfolist> prbullist = new ArrayList<>();
//				List<ESDUODUWindowDataListPrbUlInfolist> prbdllist = new ArrayList<>();
//				
//				esoduwindowlist.setId(i.getRuindexid());
//				esoduwindowlist.setRUIndexId(i.getRuindexid());
//				esoduwindowlist.setRUInstanceId(i.getRuinstanceid());
//				esoduwindowlist.setBandwidth(i.getBandwidth());
//				esoduwindowlist.setSubcarrierspacing(i.getSubcarrierspacing());
//				esoduwindowlist.setRUcpmacAddress(i.getRucpmacaddress());
//				esoduwindowlist.setDUmacAddress(i.getDumacaddress());
//				esoduwindowlist.setRUupmacAddress(i.getRuupmacaddress());
//				esoduwindowlist.setCpvlanId(i.getCpvlanid());
//				esoduwindowlist.setUpvalnId(i.getUpvlanid());
//				esoduwindowlist.setCompMethod(i.getCompmethod());
//				int index = 0;
//				for(DeviceFHODUWindowPrbElemUl j : i.getPrbelemul()) {
//					
//					ESDUODUWindowDataListPrbUlInfolist esoduwindowprbulinfolist = new ESDUODUWindowDataListPrbUlInfolist();
//					esoduwindowprbulinfolist.setId(index);
//					esoduwindowprbulinfolist.setElemIndex(j.getElemindex());
//					esoduwindowprbulinfolist.setRbStart(j.getRbstart());
//					esoduwindowprbulinfolist.setRbSize(j.getRbsize());
//					esoduwindowprbulinfolist.setStartSymbol(j.getStartsymbol());
//					esoduwindowprbulinfolist.setNumofSymbol(j.getNumberofsymbol());
//					esoduwindowprbulinfolist.setBeamIndex(j.getBeamindex());
//					esoduwindowprbulinfolist.setBfweightUpdate(j.getBfweightupdate());
//					esoduwindowprbulinfolist.setCompMethod(j.getCompmethod());
//					esoduwindowprbulinfolist.setIqWidth(j.getIdwidth());
//					esoduwindowprbulinfolist.setBeamForming(j.getBeamformingtype());
//					esoduwindowprbulinfolist.setScaleFactor(j.getScalefactor());
//					esoduwindowprbulinfolist.setRemask(j.getRemask());
//					prbullist.add(esoduwindowprbulinfolist);
//					index+=1;
//				}
//				
//				esoduwindowlist.setPrbUlInfolist(prbullist);
//				
//				index = 0;
//				for(DeviceFHODUWindowPrbElemUl j : i.getPrbelemdl()) {
//					ESDUODUWindowDataListPrbUlInfolist esoduwindowprbdlinfolist = new ESDUODUWindowDataListPrbUlInfolist();
//					esoduwindowprbdlinfolist.setId(index);
//					esoduwindowprbdlinfolist.setElemIndex(j.getElemindex());
//					esoduwindowprbdlinfolist.setRbStart(j.getRbstart());
//					esoduwindowprbdlinfolist.setRbSize(j.getRbsize());
//					esoduwindowprbdlinfolist.setStartSymbol(j.getStartsymbol());
//					esoduwindowprbdlinfolist.setNumofSymbol(j.getNumberofsymbol());
//					esoduwindowprbdlinfolist.setBeamIndex(j.getBeamindex());
//					esoduwindowprbdlinfolist.setBfweightUpdate(j.getBfweightupdate());
//					esoduwindowprbdlinfolist.setCompMethod(j.getCompmethod());
//					esoduwindowprbdlinfolist.setIqWidth(j.getIdwidth());
//					esoduwindowprbdlinfolist.setBeamForming(j.getBeamformingtype());
//					esoduwindowprbdlinfolist.setScaleFactor(j.getScalefactor());
//					esoduwindowprbdlinfolist.setRemask(j.getRemask());
//					prbdllist.add(esoduwindowprbdlinfolist);
//					index+=1;
//				}
//				esoduwindowlist.setPrbDlInfolist(prbdllist);
//				odulist.add(esoduwindowlist);
//			}
//			
//			esdudata.setODUWindowDataList(odulist);
			esdudata.setTa4Min(devicedu.getFhmanagement().getWindowdeterminemethod().getDelayprofile().getTa4min());
			esdudata.setT12Max(devicedu.getFhmanagement().getWindowdeterminemethod().getDelayprofile().getT12max());
			esdudata.setT12Min(devicedu.getFhmanagement().getWindowdeterminemethod().getDelayprofile().getT12min());
			esdudata.setTa4Max(devicedu.getFhmanagement().getWindowdeterminemethod().getDelayprofile().getTa4max());
			esdudata.setT1aMinCpDl(devicedu.getFhmanagement().getWindowdeterminemethod().getDelayprofile().getT1amincpdl());
			esdudata.setT1aMinCpUl(devicedu.getFhmanagement().getWindowdeterminemethod().getDelayprofile().getT1amincpul());
			esdudata.setT1aMinUl(devicedu.getFhmanagement().getWindowdeterminemethod().getDelayprofile().getT1aminup());
			esdudata.setT1aMaxCpDl(devicedu.getFhmanagement().getWindowdeterminemethod().getDelayprofile().getT1amaxcpdl());
			esdudata.setT1aMaxCpUl(devicedu.getFhmanagement().getWindowdeterminemethod().getDelayprofile().getT1amaxcpul());
			esdudata.setT1aMaxUp(devicedu.getFhmanagement().getWindowdeterminemethod().getDelayprofile().getT1amaxup());
			esdudata.setT34Min(devicedu.getFhmanagement().getWindowdeterminemethod().getDelayprofile().getT34min());
			esdudata.setT34Max(devicedu.getFhmanagement().getWindowdeterminemethod().getDelayprofile().getT34max());
			esdudata.setT2aMinUp(devicedu.getFhmanagement().getWindowdeterminemethod().getDelayprofile().getT2aminup());
			esdudata.setT2aMaxUp(devicedu.getFhmanagement().getWindowdeterminemethod().getDelayprofile().getT2amaxup());
			esdudata.setT2aMinCpDl(devicedu.getFhmanagement().getWindowdeterminemethod().getDelayprofile().getT2amincpdl());
			esdudata.setT2aMinCpUl(devicedu.getFhmanagement().getWindowdeterminemethod().getDelayprofile().getT2amincpul());
			esdudata.setT2aMaxCpDl(devicedu.getFhmanagement().getWindowdeterminemethod().getDelayprofile().getT2amaxcpdl());
			esdudata.setT2aMaxCpUl(devicedu.getFhmanagement().getWindowdeterminemethod().getDelayprofile().getT2amaxcpul());
			esdudata.setTa3Min(devicedu.getFhmanagement().getWindowdeterminemethod().getDelayprofile().getTa3min());
			esdudata.setTa3Max(devicedu.getFhmanagement().getWindowdeterminemethod().getDelayprofile().getTa3max());
			
			List<ESDUDataNRCellDUList> nrcelldu = new ArrayList<>();
			for(DeviceDuNRCellDu i: devicedu.getNrcelldu()){
				ESDUDataNRCellDUList esnrcelldulist = new ESDUDataNRCellDUList();
				esnrcelldulist.setId(i.getId());
				esnrcelldulist.setNRPCI(i.getAttributes().getnRPCI());
				esnrcelldulist.setCellLocalId(i.getAttributes().getCellLocalId());
				esnrcelldulist.setNRSectorCarrierReflistId(i.getAttributes().getnRSectorCarrierRef().get(0));
				esnrcelldulist.setNRTAC(i.getAttributes().getnRTAC());
				esnrcelldulist.setResourceType(i.getAttributes().getResourceType());
				esnrcelldulist.setCellId("cell"+i.getId());
				nrcelldu.add(esnrcelldulist);
			}
			esdudata.setNRCellDUList(nrcelldu);
			
			List<ESDUDataBwpList> bwplist = new ArrayList<>();
			for(DeviceDuBWP i : devicedu.getBwp()) {
				ESDUDataBwpList esdudatabwplist = new ESDUDataBwpList();
				esdudatabwplist.setId("BWP "+i.getId());
				esdudatabwplist.setBwpContext(i.getAttributes().getBwpContext());
				esdudatabwplist.setCyclePrefix(i.getAttributes().getCyclicPrefix());
				esdudatabwplist.setIsInitiaLBwp(i.getAttributes().getIsInitialBwp());
				esdudatabwplist.setNumberOfRBs(i.getAttributes().getNumberOfRBs());
				esdudatabwplist.setPriorityLabel(i.getAttributes().getPriorityLabel());
				esdudatabwplist.setStartRB(i.getAttributes().getStartRB());
				esdudatabwplist.setSubCarrierSpacing(i.getAttributes().getSubCarrierSpacing());
				bwplist.add(esdudatabwplist);
			}
			esdudata.setBwpList(bwplist);
			
			List<ESDUDataSectorCarrierList> sectorcarrierlist = new ArrayList<>();
			for(DeviceDuNRSectorCarrier i : devicedu.getNrsectorcarrier()) {
				ESDUDataSectorCarrierList essectorcarrierlist = new ESDUDataSectorCarrierList();
				essectorcarrierlist.setArfcnDL(i.getAttributes().getArfcnDL());
				essectorcarrierlist.setId("NRS "+i.getId());
				essectorcarrierlist.setArfcnUL(i.getAttributes().getArfcnUL());
				essectorcarrierlist.setbSChannelBwDl(i.getAttributes().getbSChannelBwDL());
				essectorcarrierlist.setbSChannelBwUl(i.getAttributes().getbSChannelBwUL());
				essectorcarrierlist.setConfigMaxTxPower(i.getAttributes().getConfiguredMaxTxPower());
				essectorcarrierlist.setPriorityLabel(i.getAttributes().getPriorityLabel());
				essectorcarrierlist.settXDirection(i.getAttributes().getTxDirection());
				sectorcarrierlist.add(essectorcarrierlist);
				
			}
			esdudata.setSectorCarrierList(sectorcarrierlist);
			esdudata.setSectorconfigurationDataList(sectorcarrierlist);
			List<ESDUDataScellDeactiveInfoList> infolist = new ArrayList<>();
			
			for(DeviceDuAttributesORANConfigMacConfigScellList i : devicedu.getAttributes().getOranconfig().getMacconfig().getScelltimerlist()) {
				ESDUDataScellDeactiveInfoList esscelldeactiveinfolist = new ESDUDataScellDeactiveInfoList();
				esscelldeactiveinfolist.setIndex(i.getId());
				esscelldeactiveinfolist.setDeactivationTimer(i.getScelldeactivationtimer());
				infolist.add(esscelldeactiveinfolist);
			}
			esdudata.setScellDeactiveInfoList(infolist);
			esdudata.setLogicalChannelSrdelayTimer(devicedu.getAttributes().getOranconfig().getMacconfig().getBsrconfig().getLogicalchannelsrdelaytimer());
	        esdudata.setPeriodicityBsrTimer(devicedu.getAttributes().getOranconfig().getMacconfig().getBsrconfig().getPeriodicitybsrtimer());
	        esdudata.setRctxBsrTimer(devicedu.getAttributes().getOranconfig().getMacconfig().getBsrconfig().getRetxbsrtimer());
	        esdudata.setPhrPeriodicTimer(devicedu.getAttributes().getOranconfig().getMacconfig().getPhrconfig().getPhrperiodictimer());
	        esdudata.setPhrProhibitTimer(devicedu.getAttributes().getOranconfig().getMacconfig().getPhrconfig().getPhrprohibittimer());
	        esdudata.setPhrTxpowerFactorchange(devicedu.getAttributes().getOranconfig().getMacconfig().getPhrconfig().getPhrtxpowerfactorchange());
	        esdudata.setPhrModeOthercg(devicedu.getAttributes().getOranconfig().getMacconfig().getPhrconfig().getPhrmodeothercg());
	        esdudata.setPhrType2OtherCell(devicedu.getAttributes().getOranconfig().getMacconfig().getPhrconfig().getPhrtype2othercell());
	        
	        List<ESDUORANConfigMACConfigQOSList> qoslistt = new ArrayList<>();
	        
	        for(DeviceDuAttributesORANConfigMacConfigQosList i : devicedu.getAttributes().getOranconfig().getMacconfig().getQoslist()) {
	        	ESDUORANConfigMACConfigQOSList qoslist = new ESDUORANConfigMACConfigQOSList ();
	        	qoslist.setId(i.getQosgroupindex());
	        	qoslist.setMaxdlharqtx(i.getMaclist().getDllist().getMaxdlharq()); 
	        	System.out.println(i.getMaclist().getDllist().getMaxdlharq());
	        	qoslist.setBucketsizedura(i.getMaclist().getUlist().getBucketsizeduration());
	        	qoslist.setLgalchansrmask( i.getMaclist().getUlist().getLogicalchannelsrmask());
	        	qoslist.setLogicalchannel(i.getMaclist().getUlist().getLogicalchannnelgroup());
	        	qoslist.setLsclchansrdelay(i.getMaclist().getUlist().getLogicalchannelsrdelaytimerapplied());
	        	qoslist.setMaxulharqtx(i.getMaclist().getUlist().getMaxulharqtx());
	        	qoslist.setPrioritrizedbitrate(i.getMaclist().getUlist().getPrioritisedbitrate());
	        	qoslistt.add(qoslist);
	        }
	        esdudata.setQoslist(qoslistt);
	        essrbinfo.setAllowedServCells(devicedu.getAttributes().getOranconfig().getMacconfig().getSrbconfig().getMaclist().getAllowedservcells());
	        essrbinfo.setMaxpuschduration(null);
	        essrbinfo.setPriority(devicedu.getAttributes().getOranconfig().getMacconfig().getSrbconfig().getMaclist().getPriority());
	        essrbinfo.setSrdelaytimer(devicedu.getAttributes().getOranconfig().getMacconfig().getSrbconfig().getUllist().getLogicalchannelsrdelaytimerapplied());
	        esdudata.setSrblist(essrbinfo);
	        
	        int index=0;
	        List<ESDUDataDrxProfileIdInfoList> drxlistt = new ArrayList<>();
	        for(DeviceDuAttributesORANConfigMacConfigDRXConfig i : devicedu.getAttributes().getOranconfig().getMacconfig().getDrxconfig()) {
	        	ESDUDataDrxProfileIdInfoList esdrxprofileinfolist = new ESDUDataDrxProfileIdInfoList();
	        	esdrxprofileinfolist.setId(i.getDrxprofileid());
	        	esdrxprofileinfolist.setDrxharqrttdl(i.getDrxharqrtttimerdl());
	        	esdrxprofileinfolist.setDrxharqrttul(i.getDrxharqrtttimerul());
	        	esdrxprofileinfolist.setDrxinactivitytimer(i.getDrxinactivitytimer());
	        	esdrxprofileinfolist.setDrxlongcycle(i.getDrxlongcycle());
	        	esdrxprofileinfolist.setDrxtransmisdl(i.getDrxretransmissiontimerdl());
	        	esdrxprofileinfolist.setDrxtransmisul(i.getDrxretransmissiontimerul());
	        	List<ESDUDataSchedulingReqConfInfoList> schedulelist = new ArrayList<>();
	        	int innerindex=0;
	        	for(DeviceDuAttributesORANConfigMacConfigDRXConfigSchedulingConfig j : i.getScheduleconfig()) {
	        		ESDUDataSchedulingReqConfInfoList esschedulingreqinfolist = new ESDUDataSchedulingReqConfInfoList();
	        		esschedulingreqinfolist.setSchedulingrequest(j.getSchedulingrequestid());
	        		esschedulingreqinfolist.setScprohibittimer(j.getSrprohibittimer());
	        		esschedulingreqinfolist.setSctransmax(j.getSrtransmax());
	        		esschedulingreqinfolist.setId(j.getSchedulingrequestid());
	        		innerindex+=1;
	        		schedulelist.add(esschedulingreqinfolist);
	        	}
	        	
	        	esdrxprofileinfolist.setSchedulingReqConfInfoList(schedulelist);
	        	drxlistt.add(esdrxprofileinfolist);
	        }
	        esdudata.setDrxProfileIdInfoList(drxlistt);
	        
	        esdudataa.add(esdudata);
			}
	        esdu.setDuConfigdata(esdudataa);
	        esdu.setNodeId(nodeid);
	        	duprepository.save(esdu);
	        	logger.debug("DuConfig data saved successfully to database");
			
	       
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
