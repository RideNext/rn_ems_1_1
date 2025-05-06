/**
 * ============LICENSE_START========================================================================
 * ONAP : ccsdk feature sdnr wt odlux
 * =================================================================================================
 * Copyright (C) 2024 RideNext Software Solutions. Pvt Ltd.  All rights reserved
 * =================================================================================================
 */

import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { connect, IDispatcher, Connect } from '../../../../framework/src/flux/connect';
import { IApplicationStoreState } from '../../../../framework/src/store/applicationStore';
import { MaterialTable, MaterialTableCtorType, ColumnType } from '../../../../framework/src/components/material-table';
import { managedElementsRestServices } from '../services/managedElementsRestServices';
import { AppBar, Box, Button, Dialog, DialogActions, DialogContent, Tab, Tabs} from '@mui/material';
import { NetworkElementConnection } from '../models/networkElementConnection';
//import { testcreateConnectedNetworkElementsProperties, testcreateConnectedNetworkElementsActions } from '../../connectedNetworkElementsHandler';
//import { createConnectedNetworkElementsProperties, createConnectedNetworkElementsActions } from '../../../performanceApp/src/handlers/connectedNetworkElementsHandler';
import { testcreateConnectedNetworkElementsProperties, testcreateConnectedNetworkElementsActions } from '../../../managedElementsApp/src/handlers/connectedNetworkElementsHandler';
import { SystemConfig } from '../components/SystemConfig';
import IconButton from '@mui/material/IconButton';
import { AnyCnameRecord, AnyPtrRecord } from 'dns';
import axios from 'axios';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';
import CircularProgress from "@mui/material/CircularProgress";
import { ThreeCircles, RotatingLines } from 'react-loader-spinner';
import { Loader } from '../../../../framework/src/components/material-ui/loader';

const mapProps = (state: IApplicationStoreState) => ({
  connectedNetworkElementsProperties: testcreateConnectedNetworkElementsProperties(state),
});

const mapDispatch = (dispatcher: IDispatcher) => ({
  connectedNetworkElementsActions: testcreateConnectedNetworkElementsActions(dispatcher.dispatch),
});

const ConnectedElementTable = MaterialTable as MaterialTableCtorType<NetworkElementConnection>;
type NetworkElementSelectorComponentProps = RouteComponentProps & Connect<typeof mapProps, typeof mapDispatch>;
interface NetworkElementSelectorComponentState {
  currentTabIndex:any;
  saveSucesopen:Boolean;
  dataloading:Boolean;
  saveSucesMesg:any,
  MessageType:any,
 
  
}
let initialSorted = false;

let celldivdata:any;
let celldbdata:any;


class NetworkElementSelectorComponent extends React.Component<NetworkElementSelectorComponentProps,NetworkElementSelectorComponentState> {

  constructor(props: NetworkElementSelectorComponentProps) {
    super(props);

    this.state = {
      currentTabIndex: "NetworkElements",// Initialize with an empty array or appropriate default value
      saveSucesopen:false,
      dataloading:false,
      saveSucesMesg: "",
      MessageType: "OK",
    };
  }

   addPPData = (siteIdentification: string, siteDescription: string, environmentType: string, powerInterface: string) => ({
    id: siteIdentification.replace(" ", "_"),
    siteIdentification,
    siteDescription,
    environmentType,
    powerInterface
  });
 addPLMNInfo = ( MCC: string, MNC: string) => ({
    id: MCC+"_"+MNC,
    Name :  MCC+"_"+MNC,
    MCC,
    MNC
  });

  addRRMPolicyList = (id:string,PLMNInfo: string, SNSSAI: string) => ({
    id,
    Name :  PLMNInfo+"_"+SNSSAI,
    PLMNInfo,
    SNSSAI,
  });

  addEndpointInfo = ( EndPoint: string, LocalIPAddress: string, VLANId:string, RemoteIpAddress:string) => ({
    id: EndPoint,
    Name :  EndPoint,
    EndPoint,
    LocalIPAddress,
    VLANId,
    RemoteIpAddress
  });
  
   

  setBasicData = (basicdivdata:any,basicdatabaseData:any) => {
  let basicdata: any;
  if(basicdatabaseData)
  basicdata=basicdatabaseData
  let peerParameters :any;
  let PeerParameterList : any[] =[];
  let plmnInfo :any;
  let plmnInfoList: any[] =[];
  let rrmInfo :any;
  let RRMList :any[] =[];
  let CellLocalIdList: any[] =[];
  let NewRRMInfo: any[] =[];
  if(basicdata?.CellLocalId )
    CellLocalIdList=basicdata.CellLocalId;
  if(basicdivdata['_3gpp-nr-nrm-gnbdufunction:GNBDUFunction'][0]['_3gpp-nr-nrm-nrcelldu:NRCellDU']){
    
  basicdivdata['_3gpp-nr-nrm-gnbdufunction:GNBDUFunction'][0]['_3gpp-nr-nrm-nrcelldu:NRCellDU']?.map((ircItem: any) => {
   
    rrmInfo=ircItem.attributes.rRMPolicyMemberList;
    plmnInfo=  ircItem.attributes.pLMNInfoList;
    let NewplmnInfo: any[] =[];
      plmnInfo.map((row: any) => {
        return  NewplmnInfo.push(this.addPLMNInfo(row.mcc,row.mnc));
      });
      plmnInfoList=NewplmnInfo; 
      // rrmInfo.map((row: any) => {
      //   return NewRRMInfo.push(this.addRRMPolicyList(row.idx,row.mcc,row.sNSSAI));
      // });
    //let isexists=CellLocalIdList?.some((item:any) => item.CellLocalId===ircItem.attributes.cellLocalId.toString())
    let isexists= CellLocalIdList?.find((item) => item.CellLocalId == ircItem.attributes.cellLocalId)
    if(!isexists)
    {
      CellLocalIdList.push({'id': CellLocalIdList.length+1,'CellLocalId':ircItem.attributes.cellLocalId})
    }
  })  
}
 rrmInfo?.map((row: any) => {
        return NewRRMInfo.push(this.addRRMPolicyList(row.idx,row.mcc,row.sNSSAI));
      });
  peerParameters=basicdivdata['_3gpp-nr-nrm-gnbdufunction:GNBDUFunction'][0].attributes.peeParametersList;
  PeerParameterList.push(this.addPPData(peerParameters.siteIdentification, peerParameters.siteDescription, peerParameters.environmentType, peerParameters.powerInterface))

  RRMList=NewRRMInfo;
  
  basicdata.PriorityLabel=basicdivdata?.attributes?.priorityLabel;
  basicdata.DnPrefix=basicdivdata?.attributes?.dnPrefix;
  basicdata.PeerParameterList=PeerParameterList;
  basicdata.PLMNInfo=plmnInfoList;
  basicdata.RRMPolicyList=RRMList;
  basicdata.CellLocalId=CellLocalIdList;
  
  return basicdata;
  }

  setCellData = (celldivdata:any,celldbdata:any) => {
    console.log("setCellData entered")
    let cellConfigdata: any [] = [];
   
  //   if(celldbdata[0])
  //    celldata=celldbdata[0];
  // else
     //celldata=celldbdata;

     celldivdata['_3gpp-nr-nrm-gnbdufunction:GNBDUFunction'][0]['_3gpp-nr-nrm-nrcelldu:NRCellDU'].sort((a:any,b:any) => {
      if (""+a["id"]<(""+b["id"])) return -1;
      if (""+a["id"]>(""+b["id"])) return 1;
      return 0;
  });
     celldivdata['_3gpp-nr-nrm-gnbdufunction:GNBDUFunction'][0]['_3gpp-nr-nrm-nrcelldu:NRCellDU']?.map((NRCellDU:any)=>{
      let celldata: any={} ;
      celldata.arfcnDL=NRCellDU.attributes.arfcnDL;
        celldata.arfcnUL=NRCellDU.attributes.arfcnUL;
        celldata.arfcnSUL=NRCellDU.attributes.arfcnSUL;
        celldata.bsChannelBwDL=NRCellDU.attributes.bSChannelBwDL;
        celldata.bsChannelBwUL=NRCellDU.attributes.bSChannelBwUL;
        celldata.ssbPeriodicity=NRCellDU.attributes.ssbPeriodicity;
        celldata.ssbOfset=NRCellDU.attributes.ssbOffset;
        celldata.ssbDuration=NRCellDU.attributes.ssbDuration;
        celldata.ssbFrequency=NRCellDU.attributes.ssbFrequency;
        celldata.ssbSubCarrierSpacing=NRCellDU.attributes.ssbSubCarrierSpacing;
       
        let cucell= celldivdata['_3gpp-nr-nrm-gnbcucpfunction:GNBCUCPFunction'][0]['_3gpp-nr-nrm-nrcellcu:NRCellCU'][0];
        let cuCellData = celldivdata['_3gpp-nr-nrm-gnbcucpfunction:GNBCUCPFunction'][0]['_3gpp-nr-nrm-nrcellcu:NRCellCU']?.find( (NRCellCU) => NRCellCU.id == NRCellDU.id)
        if(cuCellData)
        {cucell=cuCellData}
        celldata.PriorityLabel=cucell.attributes.priorityLabel;
        celldata.rsrpOffsetSSB=cucell['_3gpp-nr-nrm-nrfreqrelation:NRFreqRelation'][0].attributes['offsetMO'].rsrpOffsetSsb;
        celldata.sinrOffsetSSB=cucell['_3gpp-nr-nrm-nrfreqrelation:NRFreqRelation'][0].attributes['offsetMO'].sinrOffsetSsb;
        celldata.rsrqOffsetSSB=cucell['_3gpp-nr-nrm-nrfreqrelation:NRFreqRelation'][0].attributes['offsetMO'].rsrqOffsetSsb;
        celldata.rsrpOffsetCsiRs=cucell['_3gpp-nr-nrm-nrfreqrelation:NRFreqRelation'][0].attributes['offsetMO'].rsrpOffsetCsiRs;
        celldata.rsrqOffsetCsiRs=cucell['_3gpp-nr-nrm-nrfreqrelation:NRFreqRelation'][0].attributes['offsetMO'].rsrqOffsetCsiRs;
        celldata.sinrOffsetCsiRs=cucell['_3gpp-nr-nrm-nrfreqrelation:NRFreqRelation'][0].attributes['offsetMO'].sinrOffsetCsiRs;
        celldata.peeParameters=cucell['_3gpp-nr-nrm-nrfreqrelation:NRFreqRelation'][0].attributes['peeParametersList'].siteIdentification;
        celldata.CellReselectionPriority=cucell['_3gpp-nr-nrm-nrfreqrelation:NRFreqRelation'][0].attributes.cellReselectionPriority;
        celldata.CellReselectionSubPriority=cucell['_3gpp-nr-nrm-nrfreqrelation:NRFreqRelation'][0].attributes.cellReselectionSubPriority;
        celldata.pMax=cucell['_3gpp-nr-nrm-nrfreqrelation:NRFreqRelation'][0].attributes.pMax;
        celldata.qOffsetFrequency=cucell['_3gpp-nr-nrm-nrfreqrelation:NRFreqRelation'][0].attributes.qOffsetFreq;
        celldata.qQualMin=cucell['_3gpp-nr-nrm-nrfreqrelation:NRFreqRelation'][0].attributes.qQualMin;
        celldata.qRxLevMin=cucell['_3gpp-nr-nrm-nrfreqrelation:NRFreqRelation'][0].attributes.qRxLevMin;
        celldata.threshXHighP=cucell['_3gpp-nr-nrm-nrfreqrelation:NRFreqRelation'][0].attributes.threshXHighP;
        celldata.threshXHighQ=cucell['_3gpp-nr-nrm-nrfreqrelation:NRFreqRelation'][0].attributes.threshXHighQ;
        celldata.threshXLowP=cucell['_3gpp-nr-nrm-nrfreqrelation:NRFreqRelation'][0].attributes.threshXLowP;
        celldata.threshXLowQ=cucell['_3gpp-nr-nrm-nrfreqrelation:NRFreqRelation'][0].attributes.threshXLowQ;
        celldata.tReselectionNR=cucell['_3gpp-nr-nrm-nrfreqrelation:NRFreqRelation'][0].attributes.tReselectionNR;
        celldata.tReselectionNRSfHigh=cucell['_3gpp-nr-nrm-nrfreqrelation:NRFreqRelation'][0].attributes.tReselectionNRSfHigh;
        celldata.tReselectionNRSfMedium=cucell['_3gpp-nr-nrm-nrfreqrelation:NRFreqRelation'][0].attributes.tReselectionNRSfMedium;
        celldata.nRFrequencyref=cucell['_3gpp-nr-nrm-nrfreqrelation:NRFreqRelation'][0].attributes.nRFrequencyRef;
        
        celldata.cellId="cell"+NRCellDU.id
     //if(celldivdata['_3gpp-nr-nrm-gnbdufunction:GNBDUFunction'][0]['_3gpp-nr-nrm-nrcelldu:NRCellDU'])
      //{
        //let NRCellDU=celldivdata['_3gpp-nr-nrm-gnbdufunction:GNBDUFunction'][0]['_3gpp-nr-nrm-nrcelldu:NRCellDU'][0]
       
      //}
      cellConfigdata=[...cellConfigdata,celldata]
      //cellConfigdata.push(celldata)
    })
    //plmnInfo=  celldivdata['_3gpp-nr-nrm-gnbdufunction:GNBDUFunction'][0]['_3gpp-nr-nrm-nrcelldu:NRCellDU'][0].attributes.pLMNInfoList
    //cellConfigdata.PriorityLabel=celldivdata?.attributes?.priorityLabel;
    //cellConfigdata.DnPrefix=celldivdata?.attributes?.dnPrefix;
 
    return cellConfigdata;
    }

    setCuupData = (cuupdivdata: any, cuupdbdata: any) => {
      console.log("setcuupData entered");
    
      let cuupdata: any = cuupdbdata;
      let NewEndpointInfo: any[] = [];
      cuupdata.PriorityLabel=cuupdivdata['_3gpp-nr-nrm-gnbcuupfunction:GNBCUUPFunction'][0].attributes.priorityLabel;
      cuupdata.gNBId=cuupdivdata['_3gpp-nr-nrm-gnbcuupfunction:GNBCUUPFunction'][0].attributes.gNBId;
      cuupdata.ResourceType=cuupdivdata['_3gpp-nr-nrm-gnbcuupfunction:GNBCUUPFunction'][0].attributes.resourceType;
      cuupdata.rrmPolicyList=cuupdivdata['_3gpp-nr-nrm-gnbcuupfunction:GNBCUUPFunction'][0].attributes.rRMPolicyMemberList[0].mnc +"_"+cuupdivdata['_3gpp-nr-nrm-gnbcuupfunction:GNBCUUPFunction'][0].attributes.rRMPolicyMemberList[0].sNSSAI;
      // Check if the key '_3gpp-nr-nrm-gnbcuupfunction:GNBCUUPFunction' exists in cuupdivdata
      if (cuupdivdata['_3gpp-nr-nrm-gnbcuupfunction:GNBCUUPFunction']) {
        // Iterate over each endpoint type ('_3gpp-nr-nrm-ep:EP_*') within the GNBCUUPFunction object
        Object.keys(cuupdivdata['_3gpp-nr-nrm-gnbcuupfunction:GNBCUUPFunction'][0]).forEach(key => {
          // Check if the key starts with '_3gpp-nr-nrm-ep'
          if (key.startsWith('_3gpp-nr-nrm-ep')) {
            let endpointinfo={
              EndPoint:key.split(':')[1],
              LocalIPAddress:cuupdivdata['_3gpp-nr-nrm-gnbcuupfunction:GNBCUUPFunction'][0][key][0].attributes.localAddress[0].ipAddress,
              VLANId:cuupdivdata['_3gpp-nr-nrm-gnbcuupfunction:GNBCUUPFunction'][0][key][0].attributes.localAddress[0].vlanId,
              RemoteIpAddress:cuupdivdata['_3gpp-nr-nrm-gnbcuupfunction:GNBCUUPFunction'][0][key][0].attributes.remoteAddress
            }
            NewEndpointInfo.push(endpointinfo)
          }
        });
      }
      // Assign NewEndpointInfo array to cuupdata.EndPointList
      cuupdata.EndPointList = NewEndpointInfo;
      return cuupdata;
    }
    setCucpData = (cucpdivdata: any, cucpdbdata: any) => {
      console.log("setcucpData entered");
      console.log(cucpdivdata)
      let cucpdata: any = cucpdbdata;
      let NewEndpointInfo: any[] = [];
      cucpdata.UserLabel=cucpdivdata['_3gpp-nr-nrm-gnbcucpfunction:GNBCUCPFunction'][0] .attributes.userLabel;
	    cucpdata.PriorityLabel=cucpdivdata['_3gpp-nr-nrm-gnbcucpfunction:GNBCUCPFunction'][0] .attributes.priorityLabel;
      cucpdata.ResourceType=cucpdivdata['_3gpp-nr-nrm-gnbcucpfunction:GNBCUCPFunction'][0] .attributes.resourceType;
      cucpdata.gNBCUName=cucpdivdata['_3gpp-nr-nrm-gnbcucpfunction:GNBCUCPFunction'][0] .attributes.gNBCUName;
      cucpdata.gNBIDLength=cucpdivdata['_3gpp-nr-nrm-gnbcucpfunction:GNBCUCPFunction'][0].attributes.gNBIdLength;
      cucpdata.gNBID=cucpdivdata['_3gpp-nr-nrm-gnbcucpfunction:GNBCUCPFunction'][0].attributes.gNBId;
      cucpdata.peeParameters=cucpdivdata['_3gpp-nr-nrm-gnbcucpfunction:GNBCUCPFunction'][0].attributes.peeParametersList.siteIdentification;
      cucpdata.plmnId=cucpdivdata['_3gpp-nr-nrm-gnbcucpfunction:GNBCUCPFunction'][0].attributes['pLMNId'][0].mcc +"_"+cucpdivdata['_3gpp-nr-nrm-gnbcucpfunction:GNBCUCPFunction'][0].attributes['pLMNId'][0].mnc;
      cucpdata.rrmPolicyList=cucpdivdata['_3gpp-nr-nrm-gnbcucpfunction:GNBCUCPFunction'][0].attributes.rRMPolicyMemberList[0].mnc +"_"+cucpdivdata['_3gpp-nr-nrm-gnbcucpfunction:GNBCUCPFunction'][0].attributes.rRMPolicyMemberList[0].sNSSAI;
      //cucpdata.cellLocalId=cucpdivdata['_3gpp-nr-nrm-gnbcucpfunction:GNBCUCPFunction'][0]['_3gpp-nr-nrm-nrcellcu:NRCellCU'][0].attributes.cellLocalId;
      if(cucpdivdata['_3gpp-nr-nrm-gnbcucpfunction:GNBCUCPFunction'][0]['_3gpp-nr-nrm-nrcellcu:NRCellCU'])
        {
          cucpdivdata['_3gpp-nr-nrm-gnbcucpfunction:GNBCUCPFunction'][0]['_3gpp-nr-nrm-nrcellcu:NRCellCU']?.sort((a:any,b:any) => {
            if (""+a["id"]<(""+b["id"])) return -1;
            if (""+a["id"]>(""+b["id"])) return 1;
            return 0;
          })
      let NRCellCU :any[]=[]
      cucpdivdata['_3gpp-nr-nrm-gnbcucpfunction:GNBCUCPFunction'][0]['_3gpp-nr-nrm-nrcellcu:NRCellCU']?.map((CuCell:any)=>{
            NRCellCU.push(
              {
              id : CuCell.id,
              PriorityLabel : CuCell.attributes.priorityLabel,
              CellLocalId : CuCell.attributes.cellLocalId,
              cellId : "cell"+CuCell.id,
              PLMNId : cucpdata.plmnId
              }
            )
          })
          cucpdata.NRCellCuList=NRCellCU;
      }
      if (cucpdivdata['_3gpp-nr-nrm-gnbcucpfunction:GNBCUCPFunction']) {
        Object.keys(cucpdivdata['_3gpp-nr-nrm-gnbcucpfunction:GNBCUCPFunction'][0]).forEach(key => {
          // Check if the key starts with '_3gpp-nr-nrm-ep'
          if (key.startsWith('_3gpp-nr-nrm-ep')) {
            let endpointinfo={
              EndPoint:key.split(':')[1],
              LocalIPAddress:cucpdivdata['_3gpp-nr-nrm-gnbcucpfunction:GNBCUCPFunction'][0][key][0].attributes.localAddress[0].ipAddress,
              VLANId:cucpdivdata['_3gpp-nr-nrm-gnbcucpfunction:GNBCUCPFunction'][0][key][0].attributes.localAddress[0].vlanId,
              RemoteIpAddress:cucpdivdata['_3gpp-nr-nrm-gnbcucpfunction:GNBCUCPFunction'][0][key][0].attributes.remoteAddress
            }
            console.log(endpointinfo)
            NewEndpointInfo.push(endpointinfo)
          }
        });
      }
      console.log(cucpdivdata['_3gpp-nr-nrm-gnbcucpfunction:GNBCUCPFunction'][0]['o-ran-cu-security-handling:SecurityHandling'][0].attributes.integrityProtectAlgoPrio[0])
      cucpdata.IntegrityProtectAlgoPrio=cucpdivdata['_3gpp-nr-nrm-gnbcucpfunction:GNBCUCPFunction'][0]['o-ran-cu-security-handling:SecurityHandling'][0].attributes.integrityProtectAlgoPrio[0];
      cucpdata.CipheringAlgoPrio=cucpdivdata['_3gpp-nr-nrm-gnbcucpfunction:GNBCUCPFunction'][0]['o-ran-cu-security-handling:SecurityHandling'][0].attributes.cipheringAlgoPrio[0];
      // Assign NewEndpointInfo array to cucpdata.EndPointList
      cucpdata.EndPointList = NewEndpointInfo;
      return cucpdata;
    }

    setDuData = (dudivdata: any, dudbdata: any) => {
      console.log("setduData entered");
      let duConfigdata: any [] = [];
      let SectorconfigurationDataList:any [] =[];
      let ManagedNFServicelist:any[] = [];
      let NewEndpointInfo: any[] = [];
      let DrxProfileIdInfolist:any[] =[];
      //let SchedulingReqConfInfolist:any[]=[];
     // let MacParamInfolist:any[]=[];
     // let srDelayTimerInfolist:any[]=[];
      let qosUlInfolist:any[]=[];
      let qosDlInfolist:any[]=[];
      let ScellDeactiveInfolist:any[]=[];
      let SectorCarrierlist:any[]=[];
      let Bwplist:any[]=[];
      let NRCellDUList:any[]=[];
      let PreconfRUProfilelist:any[]=[];
      let ODUWindowDatalist:any[]=[];
      // let PrbUlInfolist:any[]=[];
      // let PrbDlInfolist:any[]=[];
      const dudata=dudbdata;
      dudivdata['_3gpp-nr-nrm-gnbdufunction:GNBDUFunction'].map((du:any)=>{
         dudata.userLabel=du.attributes.userLabel,
         dudata.gNBDUId=du.attributes.gNBDUId,
         dudata.gNBIdLength=du.attributes.gNBIdLength,
         dudata.peeParameters=du.attributes.peeParametersList.siteIdentification,
         dudata.rrmPolicyList=du.attributes.rRMPolicyMemberList[0].mnc+"_"+du.attributes.rRMPolicyMemberList[0].sNSSAI,
         dudata.resourceType=du.attributes.resourceType,
         dudata.priorityLabel=du.attributes.priorityLabel,
         du['ManagedNFService'].map((nfservice:any)=>{
          let ManagedMFServerInfo={
            id:nfservice.attributes.administrativeState,
            AdministrativeState:nfservice.attributes.administrativeState,
            saphost:nfservice.attributes.sAP[0].host,
            sapport:nfservice.attributes.sAP[0].port,
            operationsName:nfservice.attributes.operations[0].name,
            operationsAllowed:nfservice.attributes.operations[0].allowedNFTypes[0]
           }
           ManagedNFServicelist.push(ManagedMFServerInfo)
         })
          Object.keys(du).forEach(key => {
            if (key.startsWith('_3gpp-nr-nrm-ep')) {
              let endpointinfo={
                Id:du[key][0].id,
                EndPoint:key.split(':')[1],
                LocalIPAddress:du[key][0].attributes.localAddress[0].ipAddress,
                VLANID:du[key][0].attributes.localAddress[0].vlanId,
                RemoteIPAddress:du[key][0].attributes.remoteAddress
              }
              NewEndpointInfo.push(endpointinfo)
            }
          });
          du.attributes['o-ran_3gpp-nr-nrm-gnbdufunction:o-ran-configuration']['mac-configuration']['drx-config']?.map((drx:any)=>{
            let SchedulingReqConfInfolist:any[]=[];
            let sreqinfo={
              id:drx['scheduling-request-config'][0]['scheduling-request-id'],
              schedulingrequest:drx['scheduling-request-config'][0]['scheduling-request-id'],
              scprohibittimer:drx['scheduling-request-config'][0]['sr-prohibit-timer'],
              sctransmax:drx['scheduling-request-config'][0]['sr-trans-max'],
            }
            SchedulingReqConfInfolist.push(sreqinfo)

            let drxinfo={
              id:drx['drx-profile-id'],
              drxinactivitytimer:drx['drx-inactivity-timer'],
              drxharqrttdl:drx['drx-harq-rtt-timer-dl'],
              drxharqrttul:drx['drx-harq-rtt-timer-ul'],
              drxtransmisdl:drx['drx-retransmission-timer-dl'],
              drxtransmisul:drx['drx-retransmission-timer-ul'],
              drxlongcycle:drx['drx-long-cycle'],
              SchedulingReqConfInfolist:SchedulingReqConfInfolist
            }
            DrxProfileIdInfolist.push(drxinfo)
           
          })
         
          let macinfo={
            id:1,
            Priority:du.attributes['o-ran_3gpp-nr-nrm-gnbdufunction:o-ran-configuration']['mac-configuration']['srb-config']['common-configuration-mac-parameter-list'].priority,
            AllowedServCells:du.attributes['o-ran_3gpp-nr-nrm-gnbdufunction:o-ran-configuration']['mac-configuration']['srb-config']['common-configuration-mac-parameter-list']['allowed-serv-cells'],
            srdelaytimer: du.attributes['o-ran_3gpp-nr-nrm-gnbdufunction:o-ran-configuration']['mac-configuration']['srb-config']['ul-specific-parameters-list']['logical-channel-sr-delay-timer-applied'],
            maxpuschduration: du.attributes['o-ran_3gpp-nr-nrm-gnbdufunction:o-ran-configuration']['mac-configuration']['srb-config']['ul-specific-parameters-list']['max-pusch-duration'],
          }
          du.attributes['o-ran_3gpp-nr-nrm-gnbdufunction:o-ran-configuration']['mac-configuration']['qos-group-config-list']?.map((data:any)=>{
            let qosinfo={
             id:data['qos-group-index'],
             logicalchannel:data['common-configuration-mac-parameter-list']['ul-specific-parameters-list']['logical-channnel-group'],
             lgalchansrmask:data['common-configuration-mac-parameter-list']['ul-specific-parameters-list']['logical-channel-sr-mask'],
             prioritrizedbitrate:data['common-configuration-mac-parameter-list']['ul-specific-parameters-list']['prioritised-bitrate'],
             bucketsizedura:data['common-configuration-mac-parameter-list']['ul-specific-parameters-list']['bucket-size-duration'],
             lsclchansrdelay:`${data['common-configuration-mac-parameter-list']['ul-specific-parameters-list']['logical-channel-sr-delay-timer-applied']}`,
             maxulharqtx:data['common-configuration-mac-parameter-list']['ul-specific-parameters-list']['max-ul-harq-tx'],
             maxdlharqtx:data['common-configuration-mac-parameter-list']['dl-specific-parameters-list']['max-dl-harq'],
             maxpdschduration: data['common-configuration-mac-parameter-list']['dl-specific-parameters-list']['max-pdsch-duration'] ? data['common-configuration-mac-parameter-list']['dl-specific-parameters-list']['max-pdsch-duration'] : undefined
           
           }
            qosUlInfolist.push(qosinfo)
         })
          du.attributes['o-ran_3gpp-nr-nrm-gnbdufunction:o-ran-configuration']['mac-configuration']['scell-deactivation-timer-list']?.map((data:any)=>{
            let scellinfo={
              Index:data.id,
              DeactivationTimer:data['scell-deactivation-timer']
            }
            ScellDeactiveInfolist.push(scellinfo)
          })
          du['_3gpp-nr-nrm-nrsectorcarrier:NRSectorCarrier']?.map((sector:any)=>{
            let sectorinfo={
              id:`NRS-${sector.id}`,
              PriorityLabel:sector.attributes.priorityLabel,
              tXDirection:sector.attributes.txDirection,
              ConfigMaxTxPower:sector.attributes.configuredMaxTxPower,
              arfcnDL:sector.attributes.arfcnDL,
              arfcnUL:sector.attributes.arfcnUL,
              bSChannelBwDl:sector.attributes.bSChannelBwDL,
              bSChannelBwUl:sector.attributes.bSChannelBwUL
            }
            SectorCarrierlist.push(sectorinfo)
          })
          du['_3gpp-nr-nrm-bwp:BWP']?.map((bwp:any)=>{
            let bwpinfo={
              id:`BWP-${bwp.id}`,
              PriorityLabel:bwp.attributes.priorityLabel,
              bwpContext:bwp.attributes.bwpContext,
              SubCarrierSpacing:bwp.attributes.subCarrierSpacing,
              cyclePrefix:bwp.attributes.cyclicPrefix,
              startRB:bwp.attributes.startRB,
              NumberOfRBs:bwp.attributes.numberOfRBs,
              isInitiaLBwp:bwp.attributes.isInitialBwp
            }
            Bwplist.push(bwpinfo)
          })
          du['o-ran-odu-fh-management:odu-fh-management']['window-determine-method']['pre-configured-ru-profile']?.map((preru:any)=>{
            let prerulist={
              id:preru['ru-index'],
              RUIndex:preru['ru-index'],
              RUInstanceId:preru['ru-instance-id']
            }
            PreconfRUProfilelist.push(prerulist)
          })
 
          du['o-ran-odu-fh-management:odu-fh-management']['o-du-window']?.map((odu:any)=>{
      
            let PrbUlInfolist:any[]=[];
            let PrbDlInfolist:any[]=[];
            odu['prb-elem-ul'].map((prbelul:any,innerindex:number)=>{
              let prbeluldata={
                id:`${innerindex}`,
                ElemIndex:prbelul['elem-index'],
                RbStart:prbelul['rb-start'],
                RbSize:prbelul['rb-size'],
                StartSymbol:prbelul['start-symbol'],
                NumofSymbol:prbelul['number-of-symbol'],
                BeamIndex:prbelul['beam-index'],
                BfweightUpdate:prbelul['bf-weight-update'],
                CompMethod:prbelul['comp-method'],
                IqWidth:prbelul['iq-width'],
                BeamForming:prbelul['beam-forming-type'],
                ScaleFactor:prbelul['scale-factor'],
                Remask:prbelul['re-mask']
             }
             PrbUlInfolist.push(prbeluldata)
            })
             odu['prb-elem-dl'].map((prbeldl:any,innerindex:number)=>{
              let prbeldldata={
                id:`${innerindex}`,
                ElemIndex:prbeldl['elem-index'],
                RbStart:prbeldl['rb-start'],
                RbSize:prbeldl['rb-size'],
                StartSymbol:prbeldl['start-symbol'],
                NumofSymbol:prbeldl['number-of-symbol'],
                BeamIndex:prbeldl['beam-index'],
                BfweightUpdate:prbeldl['bf-weight-update'],
                CompMethod:prbeldl['comp-method'],
                IqWidth:prbeldl['iq-width'],
                BeamForming:prbeldl['beam-forming-type'],
                ScaleFactor:prbeldl['scale-factor'],
                Remask:prbeldl['re-mask']
             }
             PrbDlInfolist.push(prbeldldata);
            })
            let odulist={
              id:odu['ru-index-id'],
              RUIndexId:odu['ru-index-id'],
              RUInstanceId:odu['ru-instance-id'],
              Bandwidth:odu['bandwidth'],
              Subcarrierspacing:odu['subcarrier-spacing'],
              RUcpmacAddress:odu['ru-cpmac-address'],
              PrbUlInfolist:PrbUlInfolist,
              DUmacAddress:odu['du-mac-address'],
              RUupmacAddress:odu['ru-upmac-address'],
              CpvlanId:odu['cp-vlan-id'],
              UpvalnId:odu['up-vlan-id'],
              CompMethod:odu['comp-method'],
              PrbDlInfolist:PrbDlInfolist
            }
            ODUWindowDatalist.push(odulist)
          })
 
          // du['o-ran-odu-fh-management:odu-fh-management']['o-du-window']?.map((odu:any,index:number)=>{
          //    odu['prb-elem-ul'].map((prbelul:any,innerindex:number)=>{
          //     let prbelullist={
          //       id:`${index}_${innerindex}`,
          //       ElemIndex:prbelul['elem-index'],
          //       RbStart:prbelul['rb-start'],
          //       RbSize:prbelul['rb-size'],
          //       StartSymbol:prbelul['start-symbol'],
          //       NumofSymbol:prbelul['number-of-symbol'],
          //       BeamIndex:prbelul['beam-index'],
          //       BfweightUpdate:prbelul['bf-weight-update'],
          //       CompMethod:prbelul['comp-method'],
          //       IqWidth:prbelul['iq-width'],
          //       BeamForming:prbelul['beam-forming-type'],
          //       ScaleFactor:prbelul['scale-factor'],
          //       Remask:prbelul['re-mask']
          //    }
          //    PrbUlInfolist.push(prbelullist)
          //    })
          //    odu['prb-elem-dl'].map((prbeldl:any,innerindex:number)=>{
          //     let prbeldllist={
          //       id:`${index}_${innerindex}`,
          //       ElemIndex:prbeldl['elem-index'],
          //       RbStart:prbeldl['rb-start'],
          //       RbSize:prbeldl['rb-size'],
          //       StartSymbol:prbeldl['start-symbol'],
          //       NumofSymbol:prbeldl['number-of-symbol'],
          //       BeamIndex:prbeldl['beam-index'],
          //       BfweightUpdate:prbeldl['bf-weight-update'],
          //       CompMethod:prbeldl['comp-method'],
          //       IqWidth:prbeldl['iq-width'],
          //       BeamForming:prbeldl['beam-forming-type'],
          //       ScaleFactor:prbeldl['scale-factor'],
          //       Remask:prbeldl['re-mask']
          //    }
          //    PrbDlInfolist.push(prbeldllist)
             
          //    })
          // })

          dudata.DUIndex=du['o-ran-odu-fh-management:odu-fh-management']['du-sync-state']['du-index']
          dudata.SyncState=du['o-ran-odu-fh-management:odu-fh-management']['du-sync-state']['sync-state']
          dudata.gNBDUId=du['o-ran-odu-fh-management:odu-fh-management']['du-sync-state']['gNBDUId']
          dudata.Method=du['o-ran-odu-fh-management:odu-fh-management']['window-determine-method']['method']
          dudata.ConfigStatus=du['o-ran-odu-fh-management:odu-fh-management']['window-determine-method']['configuration-status']
          dudata.RUCount=du['o-ran-odu-fh-management:odu-fh-management']['window-determine-method']['ru-num']
          dudata.PreconfRUProfileList=PreconfRUProfilelist
          dudata.ODUWindowDataList=ODUWindowDatalist
          //dudata.PrbUlInfoList=PrbUlInfolist
         // dudata.PrbDlInfoList=PrbDlInfolist
          dudata.ta4Min=du['o-ran-odu-fh-management:odu-fh-management']['window-determine-method']['pre-configured-delay-profile']['ta4-min']
          dudata.ta4Max=du['o-ran-odu-fh-management:odu-fh-management']['window-determine-method']['pre-configured-delay-profile']['ta4-max']
          dudata.t1aMinCpDl=du['o-ran-odu-fh-management:odu-fh-management']['window-determine-method']['pre-configured-delay-profile']['t1a-min-cp-dl']
          dudata.t1aMinCpUl=du['o-ran-odu-fh-management:odu-fh-management']['window-determine-method']['pre-configured-delay-profile']['t1a-min-cp-ul']
          dudata.t1aMinUl=du['o-ran-odu-fh-management:odu-fh-management']['window-determine-method']['pre-configured-delay-profile']['t1a-min-up']
          dudata.t1aMaxCpDl=du['o-ran-odu-fh-management:odu-fh-management']['window-determine-method']['pre-configured-delay-profile']['t1a-max-cp-dl']
          dudata.t1aMaxCpUl=du['o-ran-odu-fh-management:odu-fh-management']['window-determine-method']['pre-configured-delay-profile']['t1a-max-cp-ul']
          dudata.t1aMaxUp=du['o-ran-odu-fh-management:odu-fh-management']['window-determine-method']['pre-configured-delay-profile']['t1a-max-up']
          dudata.t12Min=du['o-ran-odu-fh-management:odu-fh-management']['window-determine-method']['pre-configured-delay-profile']['t12-min']
          dudata.t12Max=du['o-ran-odu-fh-management:odu-fh-management']['window-determine-method']['pre-configured-delay-profile']['t12-max']
          dudata.t34Min=du['o-ran-odu-fh-management:odu-fh-management']['window-determine-method']['pre-configured-delay-profile']['t34-min']
          dudata.t34Max=du['o-ran-odu-fh-management:odu-fh-management']['window-determine-method']['pre-configured-delay-profile']['t34-max']
          dudata.t2aMinUp=du['o-ran-odu-fh-management:odu-fh-management']['window-determine-method']['pre-configured-delay-profile']['t2a-min-up']
          dudata.t2aMaxUp=du['o-ran-odu-fh-management:odu-fh-management']['window-determine-method']['pre-configured-delay-profile']['t2a-max-up']
          dudata.t2aMinCpDl=du['o-ran-odu-fh-management:odu-fh-management']['window-determine-method']['pre-configured-delay-profile']['t2a-min-cp-dl']
          dudata.t2aMinCpUl=du['o-ran-odu-fh-management:odu-fh-management']['window-determine-method']['pre-configured-delay-profile']['t2a-min-cp-ul']
          dudata.t2aMaxCpDl=du['o-ran-odu-fh-management:odu-fh-management']['window-determine-method']['pre-configured-delay-profile']['t2a-max-cp-dl']
          dudata.t2aMaxCpUl=du['o-ran-odu-fh-management:odu-fh-management']['window-determine-method']['pre-configured-delay-profile']['t2a-max-cp-ul']
          dudata.ta3Min=du['o-ran-odu-fh-management:odu-fh-management']['window-determine-method']['pre-configured-delay-profile']['ta3-min']
          dudata.ta3Max=du['o-ran-odu-fh-management:odu-fh-management']['window-determine-method']['pre-configured-delay-profile']['ta3-max']
          if(du['_3gpp-nr-nrm-nrcelldu:NRCellDU'])
            {
              du['_3gpp-nr-nrm-nrcelldu:NRCellDU']?.map((cell:any)=>{
                console.log(cell);
                let NRCellDU={
                  id:cell.id,
                  NRPCI:cell.attributes.nRPCI,
                  NRTAC:cell.attributes.nRTAC,
                  NRSectorCarrierReflistId:`NRS-${cell.attributes.nRSectorCarrierRef[0]}`,
                  CellLocalId:cell.attributes.cellLocalId,
                  cellId:"cell"+cell.id,
                  ResourceType:cell.attributes.resourceType,
                  //BwplistId:cell.attributes.
                  //NRSectorCarrierReflistId:
                }
                NRCellDUList.push(NRCellDU)
              })
            // dudata.NRPCI=du['_3gpp-nr-nrm-nrcelldu:NRCellDU'][0].attributes.nRPCI
            // dudata.NRTAC=du['_3gpp-nr-nrm-nrcelldu:NRCellDU'][0].attributes.nRTAC,
            // dudata.NRSectorCarrierRef=du['_3gpp-nr-nrm-nrcelldu:NRCellDU'][0].attributes.nRSectorCarrierRef[0]
            // dudata.cellLocalId=du['_3gpp-nr-nrm-nrcelldu:NRCellDU'][0].attributes.cellLocalId
            // dudata.cellId="cell"+du['_3gpp-nr-nrm-nrcelldu:NRCellDU'][0].id,
            // dudata.nrresourceType=du['_3gpp-nr-nrm-nrcelldu:NRCellDU'][0].attributes.resourceType
            }
          dudata.NRCellDUList=NRCellDUList;
          dudata.BwpList=Bwplist;
          dudata.SectorCarrierList=SectorCarrierlist;
          dudata.SectorconfigurationDataList=SectorCarrierlist;
          dudata.ScellDeactiveInfoList=ScellDeactiveInfolist;
          dudata.LogicalChannelSrdelayTimer=du.attributes['o-ran_3gpp-nr-nrm-gnbdufunction:o-ran-configuration']['mac-configuration']['bsr-config']['logical-channel-sr-delay-timer'];
          dudata.periodicityBsrTimer=du.attributes['o-ran_3gpp-nr-nrm-gnbdufunction:o-ran-configuration']['mac-configuration']['bsr-config']['periodicity-bsr-timer'];
          dudata.RctxBsrTimer=du.attributes['o-ran_3gpp-nr-nrm-gnbdufunction:o-ran-configuration']['mac-configuration']['bsr-config']['retx-bsr-timer'];
          dudata.phrPeriodicTimer=du.attributes['o-ran_3gpp-nr-nrm-gnbdufunction:o-ran-configuration']['mac-configuration']['phr-config']['phr-periodic-timer'];
          dudata.phrProhibitTimer=du.attributes['o-ran_3gpp-nr-nrm-gnbdufunction:o-ran-configuration']['mac-configuration']['phr-config']['phr-prohibit-timer'];
          dudata.PhrTxpowerFactorchange=du.attributes['o-ran_3gpp-nr-nrm-gnbdufunction:o-ran-configuration']['mac-configuration']['phr-config']['phr-tx-power-factor-change'];
          dudata.PhrModeOthercg=du.attributes['o-ran_3gpp-nr-nrm-gnbdufunction:o-ran-configuration']['mac-configuration']['phr-config']['phr-mode-other-cg'];
          dudata.PhrType2OtherCell=`${du.attributes['o-ran_3gpp-nr-nrm-gnbdufunction:o-ran-configuration']['mac-configuration']['phr-config']['phr-type2-othercell']}`;
          dudata.qoslist=qosUlInfolist;
          //dudata.srDelayTimerInfoList=srDelayTimerInfolist;
         dudata.srblist=macinfo;
         //dudata.SchedulingReqConfInfoList=SchedulingReqConfInfolist;
         dudata.DrxProfileIdInfoList=DrxProfileIdInfolist;
         dudata.EndPointList=NewEndpointInfo;
         dudata.ManagedNFServiceList=ManagedNFServicelist;
         dudata.Duid="DU "+du.id;
         duConfigdata.push(dudata)
      })
      return duConfigdata;
    }

saveCellData = async (nodeId:any,celldivdata:any, cellDbdata:any) => {
  //alert("Data Saving");
  if(cellDbdata!=null)
    {
     let cellConfigdata=this.setCellData(celldivdata,cellDbdata);
     await this.saveCellConfigData(nodeId,cellConfigdata)
    }
   else
   {
      let cellConfigdata={PriorityLabel: 'dummy'};
      await this.saveCellConfigData(nodeId,cellConfigdata);
      let  cellDbdata = ( await managedElementsRestServices.geCellData("/cell_config/_search/"+nodeId));
      let celldata=this.setCellData(celldivdata,cellDbdata);
      await this.saveCellConfigData(nodeId,celldata)
    }
 }

 saveBasicData = async (nodeId:any,basicdivdata:any,basicEsdata:any) => {
  //alert("Data Saving");
 if(basicEsdata)
  {
   let  basicdata=this.setBasicData(basicdivdata,basicEsdata);
    await this.saveBasicConfigData(nodeId,basicdata)
  }
 else
 {
    let basicdata={DnPrefix: 'dummy'};
    await this.saveBasicConfigData(nodeId,basicdata);
    let  basicEsdata = ( await managedElementsRestServices.getBasicData("/basic_config/_search/"+nodeId));
    basicdata=this.setBasicData(basicdivdata,basicEsdata);
    await this.saveBasicConfigData(nodeId,basicdata)
  }
 }

  saveBasicConfigData = async (nodeId: any,basicdata:any) => {
    await axios.post(`${window.location.origin}` + "/basic_config/_doc/" + nodeId,
      {
        basicdata
      }).then(function (resp: any) {
        const result = resp;
      }, function (err: { message: any; }) {
        console.log(err.message);
      })
  }

  saveCellConfigData = async (nodeId: any,cellConfigdata:any) => {
    await axios.post(`${window.location.origin}` + "/cell_config/_doc/" + nodeId,
      {
        cellConfigdata
      }).then(function (resp: any) {
        const result = resp;
      }, function (err: { message: any; }) {
        console.log(err.message);
      })
  }

  saveCuupConfigData = async (nodeId: any,cuupdata:any) => {
    console.log("saveCuupConfigData eneterd")
    await axios.post(`${window.location.origin}` + "/cuup_config/_doc/" + nodeId,
      {
        cuupdata
      }).then(function (resp: any) {
        const result = resp;
      }, function (err: { message: any; }) {
        console.log(err.message);
      })
  }
  saveCucpConfigData = async (nodeId: any,cucpdata:any) => {
    console.log("saveCucpConfigData eneterd")
    await axios.post(`${window.location.origin}` + "/cucp_config/_doc/" + nodeId,
      {
        cucpdata
      }).then(function (resp: any) {
        const result = resp;
      }, function (err: { message: any; }) {
        console.log(err.message);
      })
  }

  saveDuConfigData = async (nodeId: any,duConfigdata:any) => {
    console.log("saveduConfigData eneterd")
    await axios.post(`${window.location.origin}` + "/du_config/_doc/" + nodeId,
      {
        duConfigdata
      }).then(function (resp: any) {
        const result = resp;
      }, function (err: { message: any; }) {
        console.log(err.message);
      })
  }

  saveCuupData = async (nodeId:any,cuupdivdata:any,cucpDbdata:any) => {
    console.log("saveCuupData eneterd")
  //alert("Data Saving");
 if(cucpDbdata!=null)
  {
    let cuupdata=this.setCuupData(cuupdivdata,cucpDbdata);
    await this.saveCuupConfigData(nodeId,cuupdata)
  }
 else
 {
  let cuupdata={PriorityLabel: 1};
    await this.saveCuupConfigData(nodeId,cuupdata);    
    let cuupDBData = ( await managedElementsRestServices.getCuupData("/cuup_config/_search/"+nodeId));
    let celldata=this.setCuupData(celldivdata,cuupDBData);
    await this.saveCuupConfigData(nodeId,cuupDBData)
  }
 }

 saveCucpData = async (nodeId:any,cucpdivdata:any,cucpDbdata:any) => {
  console.log("saveCucpData eneterd")
//alert("Data Saving");
if(cucpDbdata!=null)
{
  let cucpdata=this.setCucpData(cucpdivdata,cucpDbdata);
  await this.saveCucpConfigData(nodeId,cucpdata)
}
else
{
let cucpdata={DnPrefix: 'dummy'};
  await this.saveCucpConfigData(nodeId,cucpdata);
  let cucpDBData = ( await managedElementsRestServices.getCuupData("/cucp_config/_search/"+nodeId));
  let celldata=this.setCucpData(celldivdata,cucpDBData);
  await this.saveCucpConfigData(nodeId,cucpdata)
}
}

saveDuData = async (nodeId:any,dudivdata:any,duDbdata:any) => {
  console.log("saveDuData eneterd")
//alert("Data Saving");
if(duDbdata!=null)
{
  let dudata=this.setDuData(dudivdata,duDbdata);
  await this.saveDuConfigData(nodeId,dudata)
}
else
{
  let dudata={"userLabel" : '5G gNB-DU'};
  await this.saveDuConfigData(nodeId,dudata);
  let duDBData = ( await managedElementsRestServices.getCuupData("/du_config/_search/"+nodeId));
  let celldata=this.setDuData(celldivdata,duDBData);
  await this.saveDuConfigData(nodeId,duDBData)
}
}

  componentDidMount() {
    if (!initialSorted) {
      initialSorted = true;
      this.props.connectedNetworkElementsActions.onHandleRequestSort('node-id');
    } else
      this.props.connectedNetworkElementsActions.onRefresh();
  }
  handleTabChange = (e: any, tabIndex: React.SetStateAction<number>) => {
    this.setState({ currentTabIndex: tabIndex });
  };

  SyncDeviceData= async (rowData: any) => {
   
    this.setState({ dataloading: true });
    let nodeid: any;
    nodeid=rowData?.rowData?.id?rowData?.rowData?.id:nodeid=rowData?.id;

    let dataPath='/rests/data/network-topology:network-topology/topology=topology-netconf/node='+nodeid+'/yang-ext:mount?=&fields=_3gpp-common-managed-element:ManagedElement';
    let basicDbdata :any | undefined;
    let cellDbdata :any | undefined;
    let cuupDbdata :any | undefined;
    let cucpDbdata :any | undefined;
    let duDbdata :any | undefined;
    try
    {
    const basicDBData = ( await managedElementsRestServices.getBasicData("/basic_config/_search/"+nodeid));
    const cellDBData = ( await managedElementsRestServices.geCellData("/cell_config/_search/"+nodeid));
    const cuupDBData = ( await managedElementsRestServices.getCuupData("/cuup_config/_search/"+nodeid));
    const cucpDBData = ( await managedElementsRestServices.getCucpData("/cuup_config/_search/"+nodeid));
    const duDBData = ( await managedElementsRestServices.getDuData("/cuup_config/_search/"+nodeid));
    const restResult = ( await managedElementsRestServices.getConfigData(dataPath));
    basicDbdata = basicDBData.data;
    cellDbdata=cellDBData.data;
    cuupDbdata=cuupDBData.data;
    cucpDbdata= cucpDBData.data; 
    duDbdata= duDBData.data;  
    if (restResult?.data && restResult?.data['_3gpp-common-managed-element:ManagedElement']) {
     var meData=restResult?.data['_3gpp-common-managed-element:ManagedElement'][0]
     await this.saveBasicData(nodeid,meData,basicDbdata);
     await this.saveCellData(nodeid,meData,cellDbdata);
     await this.saveCuupData(nodeid,meData,cuupDbdata);
     await this.saveCucpData(nodeid,meData,cucpDbdata);
     await this.saveDuData(nodeid,meData,duDbdata)
      //alert('values = '+ values);
      this.setState({ dataloading: false });
      if(rowData?.rowData?.id)
      this.setState({ saveSucesopen: true });
      this.setState({ saveSucesMesg: "Sync device data successfull" });
      this.setState({ MessageType:"OK"});
      if(nodeid=rowData?.id)
      {
        this.props.history.push(`${this.props.match.path}/${nodeid}`)
      }
    }
    else
    {
      this.setState({ MessageType:"error"});
      console.log ("No Divice Data")
      this.setState({ saveSucesopen: true });
      this.setState({ saveSucesMesg: "No Divice Data" });
    }
  }
  catch(e)
  {
    this.setState({ MessageType:"error"});
    console.log (console.log ("Error in Sync Device Data " +e))
    this.setState({ dataloading: false });
    this.setState({ saveSucesopen: true });
    this.setState({ saveSucesMesg: "Error in Sync Device Data " +e});
  }
  };

  setSaveSucesClose = (rowData:any,e:any) => {
    this.setState({ saveSucesopen: false });
  }

  syncDataButtonByRowClick =async (_e:any, rowData:any) => {
    const basicDBData = (await managedElementsRestServices.getBasicData("/basic_config/_search/"+rowData?.id));
    if(!basicDBData?.data)
    this.SyncDeviceData(rowData);
  else
    this.props.history.push(`${this.props.match.path}/${rowData?.id}`)
  }

  public syncDataButton = (rowData:any,e:any) => {
    //console.log(rowData)
    return <span style={{}} onClick={(event)=>{
      if (e.defaultPrevented) return
      console.log(rowData);
    }}> <Button variant="contained" style={{ color: '#ffffff', backgroundColor: '#53659c'}} onClick={(event)=>{
      event.preventDefault();
      event.stopPropagation();
      this.SyncDeviceData(rowData);
      //console.log(rowData);
      }} >Sync Device Data</Button></span>;
  }
  render() {
    return (
      <div>
      <div >
      {this.state.dataloading  === true && (
        <div style={{position: 'fixed', background: 'white', opacity:'0.8', top:'0',left:'0', zIndex: '998', height: '100%',width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <div style={{ position:'absolute', top:'50%',left:'50%', transform:'translate(-50%, -50%)',color: 'white', background: 'white', opacity: '.8', zIndex: '1000'}}>
          <Loader />
          <ThreeCircles
              visible={true}
              height="100"
              width="100"
              color="#53659c" 
              ariaLabel="three-circles-loading"
              wrapperStyle={{}}
              wrapperClass=""
              />
              <h3>Data loading ...</h3>
        </div>
      </div>
      )}
      <Dialog open={this.state.saveSucesopen==true} onClose={this.setSaveSucesClose}  
       PaperProps={{style: { minHeight: '12vh',  minWidth: '23vw',border: '14px solid #38456a',  borderRadius: '15px', backgroundColor: '#e8e8e8' } }} >
      {/* <DialogTitle id="form-sucdialog-title" > {savedialogTitle}</DialogTitle> */}
        <DialogContent style={{alignContent:'center',textAlign:"center"}}>
        <IconButton style={{ color :'#008000', textAlign:"center" }}> 
              {this.state.MessageType === "OK" ? (<CheckCircleOutlineRoundedIcon style={{ color: '#008000' }} />) 
              : (<WarningAmberRoundedIcon style={{ color: 'red' }} />)} <h6 style={{ marginLeft:'3px', color : this.state.MessageType=="OK"? '#008000':'orange', textAlign:"center" }}>{this.state.saveSucesMesg} </h6> </IconButton> 
        </DialogContent>
        <DialogActions>
            <Button onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              this.setState({ saveSucesopen: false });
              this.setState({ saveSucesMesg: "" });
            }} style={{ backgroundColor: 'white', color: '#38761d', border: '1px solid #2986cc', borderRadius: '1px', padding: '3px 6px' }}>
              OK
            </Button>
        </DialogActions>
      </Dialog>
      </div>
    <AppBar enableColorOnDark position="static">
  <Tabs indicatorColor="secondary" textColor="inherit" value={this.state.currentTabIndex} onChange={this.handleTabChange} aria-label="connect-app-tabs">
    <Tab aria-label="Node-Config" label="Node Config" value="NetworkElements" sx={{color: '#000000de', backgroundColor: '#c6cbd1',  "&.Mui-selected": { color: '#ffffff', backgroundColor: '#55679d' }  }} />
    <Tab aria-label="FTP-Config" label="File Server Config" value="SystemConfig" sx={{color: '#000000de', backgroundColor: '#c6cbd1',  "&.Mui-selected": { color: '#ffffff', backgroundColor: '#55679d' }  }} />
  </Tabs>
</AppBar>
    {this.state.currentTabIndex === 'NetworkElements'
      ?  <ConnectedElementTable stickyHeader  title={"Configuration"} tableId="configurable-elements-table" onHandleClick={ this.syncDataButtonByRowClick } columns={[
        { property: 'nodeId', title: 'Node Name', type: ColumnType.text },
        { property: 'host', title: 'Host', type: ColumnType.text },
        { property: 'deviceType', title: 'Type', type: ColumnType.text },
        { property: "Action", title: "", type: ColumnType.custom, customControl: this.syncDataButton },
      ]} idProperty="id" {...this.props.connectedNetworkElementsActions} {...this.props.connectedNetworkElementsProperties} asynchronus >
      </ConnectedElementTable>
      : <SystemConfig/>
    }
</div>
    )
  }
}

export const NetworkElementSelector = withRouter(connect(mapProps, mapDispatch)(NetworkElementSelectorComponent));
export default NetworkElementSelector;

function res(value: void): void | PromiseLike<void> {
  throw new Error('Function not implemented.');
}

