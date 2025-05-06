/**
 * ============LICENSE_START========================================================================
 * ONAP : ccsdk feature sdnr wt odlux
 * =================================================================================================
 * Copyright (C) 2024 RideNext Software Solutions. Pvt Ltd.  All rights reserved
 * =================================================================================================
 * Copyright (C) 2019 highstreet technologies GmbH Intellectual Property. All rights reserved.
 * =================================================================================================
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License
 * is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
 * or implied. See the License for the specific language governing permissions and limitations under
 * the License.
 * ============LICENSE_END==========================================================================
 */
import { useState } from "react";
//import React from 'react';
import { useLocation } from "react-router-dom";
import axios from "axios";
import React, { useEffect } from "react";
import { AppBar, Card, CardContent, Button, Paper, Table, TableBody, TableCell, TableHead, TableRow, Dialog, DialogActions, DialogContent, Typography, Tooltip } from '@mui/material';
// Icons
import IconButton from '@mui/material/IconButton';
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';
import ArrowDropUpRoundedIcon from '@mui/icons-material/ArrowDropUpRounded';
import { ArrowLeftRounded, ArrowRightRounded } from "@mui/icons-material";
import "../components/managedElements.css";
import { managedElementsRestServices } from '../services/managedElementsRestServices';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';
import { any } from "prop-types";
import { makeStyles } from '@mui/styles';
import ReactJsonViewCompare from 'react-json-view-compare';
import ReactDiffViewer from "react-diff-viewer";
import { DuConfig } from "./duConfig";

const useStyles = makeStyles({
  navButton: {
    height: '15px', width: '22px', borderRadius: '26%', margin: '0 5px', padding: 0, minWidth: 'initial',
    backgroundColor: '#c6cbd1',
    '&:hover': {
      backgroundColor: '#b0bec5',
    },
  },
  navButton1: {
    height: '19px', width: '86px', borderRadius: '5%', margin: '5px 8px', alignItems: 'center', justifyContent: 'center', padding: '0px', minWidth: 'initial', textAlign: 'center',
    backgroundColor: '#c6cbd1',
    '&:hover': {
      backgroundColor: '#b0bec5',
    },
  },
  activeNavButton: {
    backgroundColor: '#55679d',
    '&:hover': {
      backgroundColor: '#55679d',
    },
  },

});


export const Summary = () => {
  const classes = useStyles();
  const [cellConfigCurrentPage, setCellConfigCurrentPage] = useState(0);
  const CellConfigMaxPage = 4;
  const [duConfigCurrentPage, setDuConfigCurrentPage] = useState(0);
  const [duODUCurrentPage, setduODUCurrentPage] = useState(0);
  const DuConfigMaxPage = 17;

  const [isBasicExpanded, setIsBasicExpanded] = useState(true);
  const [isCellExpanded, setIsCellExpanded] = useState(false);
  const [isCUUPExpanded, setIsCUUPExpanded] = useState(false);
  const [isCUCPExpanded, setIsCUCPExpanded] = useState(false);
  const [isDUExpanded, setIsDuExpanded] = useState(false);
  const [expandedRowId, setexpandedRowId] = useState<string | null>(null);
  const [expandedDuRowId, setexpandedDURowId] = useState<string | null>(null);
  const [basicdata, setbasicdata] = useState<any>();
  const [cellConfigdata, setcelldata] = useState<any>();
  const [cuupdata, setcuupdata] = useState<any>();
  const [cucpdata, setcucpdata] = useState<any>();
  const [dudata, setdudata] = useState<any>();
  const location = useLocation();
  const [devicedata, setdevicedata] = useState<any>();
  const [saveSucesopen, setsaveSucesopen] = useState(false);
  const [SucessMessage, setSucessMessage] = useState("false");
  let [MessageType, setMessageType] = useState("OK");
  let [CurrentDevicedata, setCurrentDevicedata] = useState<any>();
  const [compareOpen, setcompareOpen] = useState(false);
  let [compareOpened, setcompareOpened] = useState(false);
  // const [duItem, setduItem] = useState<any>();
  let nodeId = location.pathname.split('/')[2]
  let [comdevicedata, setcomdevicedata] = useState<any>();
  let [comdeviceCurrentdata, setcomdeviceCurrentdata] = useState<any>();
  const [isCompareDiff, setisCompareDiff] = useState(false);
  let [operationType, setoperationType] = useState("");
  let [CurrentDuODUdata, setCurrentDuODUdata] = useState<any>();
  let [CurrentDudrxdata, setCurrentDudrxdata] = useState<any>();
  let [CurrentDuqosdata, setCurrentDuqosdata] = useState<any>();
  let [CurrentRRHListdata, setCurrentRRHListdata] = useState<any>();
  const userToken = localStorage.getItem('userToken') || '';
  let parsedToken;
  try {
    parsedToken = userToken ? JSON.parse(userToken) : null;
  } catch (error) {
    console.error("Invalid token format:", error);
  }

  const userName = parsedToken && parsedToken.username ? parsedToken.username : null;

  const baseUri = `${window.location.origin}`;
  const test2 = JSON.stringify(
    [
      {
        description: "The date time range for data displayed.",
        inputType: "dateRangePicker",
        name: "dateRangeInput1",
        title: "Date Time Range1",
        value: {
          startDate: "2022-06-09",
          endDate: "2022-06-16"
        },
        test: ["got here"],
        test2: ["got here"],
        test3: ["got here"],
        test4: ["got here"]
      }
    ],
    null,
    2
  );

  const newCode = test2;

  useEffect(() => {
    nodeId = location.pathname.split('/')[2];
    fetchBasicConfigData(nodeId);
    fetchCellConfigData(nodeId);
    fetchCucpConfigData(nodeId);
    fetchCuupConfigData(nodeId);
    fetchDuConfigData(nodeId);
    getDeviceData();

  }, [])

  const toggleIsExpanded = (() => {
    setIsCellExpanded(false);
    setIsCUUPExpanded(false);
    setIsCUCPExpanded(false);
    setIsDuExpanded(false);
    setIsBasicExpanded((isBasicExpanded) => !isBasicExpanded);
  })
  const toggleIsExpandedCellConfig = (() => {
    setIsBasicExpanded(false);
    setIsCUUPExpanded(false);
    setIsCUCPExpanded(false);
    setIsDuExpanded(false);
    setIsCellExpanded((isCellExpanded) => !isCellExpanded);
  })

  const toggleIsExpandedCUUPConfig = (() => {
    setIsBasicExpanded(false);
    setIsCellExpanded(false);
    setIsCUCPExpanded(false);
    setIsDuExpanded(false);
    setIsCUUPExpanded((isCUUPExpanded) => !isCUUPExpanded);
  })

  const toggleIsExpandedCUCPConfig = (() => {
    setIsBasicExpanded(false);
    setIsCellExpanded(false);
    setIsCUUPExpanded(false);
    setIsDuExpanded(false);
    setIsCUCPExpanded((isCUCPExpanded) => !isCUCPExpanded);
  })
  const toggleIsExpandedDUConfig = (() => {
    setIsBasicExpanded(false);
    setIsCellExpanded(false);
    setIsCUUPExpanded(false);
    setIsCUCPExpanded(false);
    setIsDuExpanded((isDUExpanded) => !isDUExpanded);
  })

  const toggleIsChildExpandedCellConfig = (row: any) => {
    if (expandedRowId === row?.cellId) {
      setexpandedRowId(null); // Collapse the current child
    } else {
      setexpandedRowId(row?.cellId); // Expand the clicked child
    }
  };
  const toggleIsChildExpandedDuConfig = (row: any) => {
    if (expandedDuRowId === row?.Duid) {
      setexpandedDURowId(null); // Collapse the current child
    } else {
      setexpandedDURowId(row?.Duid); // Expand the clicked child
    }
  };

  const fetchBasicConfigData = (nodeId: any) => {
    let basicResdata: any;
    const baseUri = `${window.location.origin}`;
    const DbPath = baseUri + "/basic_config/_doc/" + nodeId;
    axios.get(DbPath).then((res: any) => {
      basicResdata = res.data._source.basicdata;
      setbasicdata(basicResdata);
    }).catch((err: any) => {
      console.log(err);
    })
  }

  const fetchCellConfigData = (nodeId: any) => {
    let cellResdata: any;
    const baseUri = `${window.location.origin}`;
    const DbPath = baseUri + '/cell_config/_doc/' + nodeId;
    axios.get(DbPath).then((res: any) => {
      cellResdata = res.data._source.cellConfigdata;

      cellResdata[0]?.RRHList?.sort((a: any, b: any) => {
        if ("" + a["RUIndexId"] < ("" + b["RUIndexId"])) return -1;
        if ("" + a["RUIndexId"] > ("" + b["RUIndexId"])) return 1;
        return 0;
      });
      setcelldata(cellResdata);
      if(cellResdata[0]?.RRHList && cellResdata[0]?.RRHList.length>0)
      {
        setcCurrentRRHListdata(cellResdata[0]?.RRHList[0]);
      }
    }).catch((err: any) => {
      console.log(err);
    })
  }

  const fetchCucpConfigData = (nodeId: any) => {
    let cucpResdata: any;
    const baseUri = `${window.location.origin}`;
    const DbPath = baseUri + "/cucp_config/_doc/" + nodeId;
    axios.get(DbPath).then((res: any) => {
      cucpResdata = res.data._source.cucpdata;
      setcucpdata(cucpResdata);
    }).catch((err: any) => {
      console.log(err);
    })
  }

  const fetchCuupConfigData = (nodeId: any) => {
    let cuupResdata: any;
    const baseUri = `${window.location.origin}`;
    const DbPath = baseUri + "/cuup_config/_doc/" + nodeId;
    axios.get(DbPath).then((res: any) => {
      cuupResdata = res.data._source.cuupdata;
      setcuupdata(cuupResdata);
    }).catch((err: any) => {
      console.log(err);
    })
  }
  const fetchDuConfigData = (nodeId: any) => {
    let duResdata: any;
    const baseUri = `${window.location.origin}`;
    const DbPath = baseUri + "/du_config/_doc/" + nodeId;
    axios.get(DbPath).then((res: any) => {
      duResdata = res.data._source.duConfigdata;
      duResdata[0]?.ODUWindowDataList.sort((a: any, b: any) => {
        if ("" + a["RUIndexId"] < ("" + b["RUIndexId"])) return -1;
        if ("" + a["RUIndexId"] > ("" + b["RUIndexId"])) return 1;
        return 0;
      });
      setdudata(duResdata);
      fetcCurrentDuODUdata(duResdata[0]?.ODUWindowDataList[0]);

      duResdata[0]?.DrxProfileIdInfoList.sort((a: any, b: any) => {
        if ("" + a["id"] < ("" + b["id"])) return -1;
        if ("" + a["id"] > ("" + b["id"])) return 1;
        return 0;
      });
      setdudata(duResdata);
      fetcCurrentDudrxdata(duResdata[0]?.DrxProfileIdInfoList[0]);

      duResdata[0]?.qoslist.sort((a: any, b: any) => {
        if ("" + a["id"] < ("" + b["id"])) return -1;
        if ("" + a["id"] > ("" + b["id"])) return 1;
        return 0;
      });
      setdudata(duResdata);
      fetcCurrentDuqosdata(duResdata[0]?.qoslist[0]);

    }).catch((err: any) => {
      console.log(err);
    })
  }

  const fetcCurrentDuODUdata = (Item: any) => {
    //  let odudata = duItem?.ODUWindowDataListfind((item) => item.id == Id);
    setCurrentDuODUdata(Item)
  }
  const fetcCurrentDudrxdata = (Item: any) => {
    setCurrentDudrxdata(Item)
  }
  const fetcCurrentDuqosdata = (Item: any) => {
    setCurrentDuqosdata(Item)
  }
  const setcCurrentRRHListdata = (Item: any) => {
    setCurrentRRHListdata(Item)
    console.log("RRH Item --> ", Item);
  }


  const setNRSectorCarrier = (duItem: any) => {
    var NRSectorCarrier: any[] = [];
    duItem?.SectorCarrierList?.map((item: any, index: any) => {
      {
        NRSectorCarrier.push(
          {
            "id": item.id.split('-')[1]?.toString(),
            "attributes": {
              "txDirection": item.tXDirection,
              "configuredMaxTxPower": item.ConfigMaxTxPower,
              "bSChannelBwDL": item.bSChannelBwDl,
              "arfcnDL": item.arfcnDL,
              "arfcnUL": item.arfcnUL,
              "bSChannelBwUL": item.bSChannelBwUl,
              "priorityLabel": item.PriorityLabel,
            }
          }
        )
      }
    })
    return NRSectorCarrier;
  }
  const setprbelemdlList = (PrbDlInfolist: any) => {
    var prbelemdlList: any[] = [];
    PrbDlInfolist?.map((item: any, index: any) => {
      {
        prbelemdlList.push(
          {
            "elem-index": item.ElemIndex,
            "beam-forming-type": item.BeamForming,
            "bf-weight-update": item.BfweightUpdate,
            "comp-method": item.CompMethod,
            "rb-size": item.RbSize,
            "beam-index": item.BeamIndex,
            "start-symbol": item.StartSymbol,
            "re-mask": item.Remask,
            "rb-start": item.RbStart,
            "scale-factor": item.ScaleFactor,
            "number-of-symbol": item.NumofSymbol,
            "iq-width": item.IqWidth,
          }
        )
      }
    })
    return prbelemdlList;
  }
  const setdupeeParametersList = (duItem: any) => {
    let dupeeParametersList: any[] = []
    basicdata?.PeerParameterList?.map((item: any) => {
      if (item.id == duItem.peeParameters) {
        dupeeParametersList.push({
          siteIdentification: item.siteIdentification,
          equipmentType: item.environmentType,
          powerInterface: item.powerInterface,
          environmentType: item.environmentType,
          siteDescription: item.siteDescription
        })
      }
    })
    return dupeeParametersList;
  }
  const setprbelemulList = (PrbUlInfolist: any) => {
    var prbelemulList: any[] = [];
    PrbUlInfolist?.map((item: any, index: any) => {
      {
        prbelemulList.push(
          {
            "elem-index": item.ElemIndex,
            "beam-forming-type": item.BeamForming,
            "bf-weight-update": item.BfweightUpdate,
            "comp-method": item.CompMethod,
            "rb-size": item.RbSize,
            "beam-index": item.BeamIndex,
            "start-symbol": item.StartSymbol,
            "re-mask": item.Remask,
            "rb-start": item.RbStart,
            "scale-factor": item.ScaleFactor,
            "number-of-symbol": item.NumofSymbol,
            "iq-width": item.IqWidth,
          }
        )
      }
    })
    return prbelemulList;
  }
  const setoduwindowList = (duItem: any) => {

    var oduwindowList: any[] = [];
    //   duItem?.ODUWindowDataList.sort((a:any,b:any) => {
    //     if (""+a["RUIndexId"]<(""+b["RUIndexId"])) return -1;
    //     if (""+a["RUIndexId"]>(""+b["RUIndexId"])) return 1;
    //     return 0;
    // });
    duItem?.ODUWindowDataList?.map((item: any, index: any) => {
      {
        let prbelemdlList = setprbelemdlList(item?.PrbDlInfolist);
        let prbelemulList = setprbelemulList(item?.PrbUlInfolist);
        oduwindowList.push(
          {
            "ru-index-id": item.RUIndexId,
            "ru-instance-id": item.RUInstanceId,
            "bandwidth": item.Bandwidth,
            "subcarrier-spacing": item.Subcarrierspacing,
            "comp-method": item.CompMethod,
            "ru-cpmac-address": item.RUcpmacAddress,
            "prb-elem-ul": prbelemulList,
            "du-mac-address": item.DUmacAddress,
            "ru-upmac-address": item.RUupmacAddress,
            "up-vlan-id": item.UpvalnId,
            "cp-vlan-id": item.CpvlanId,
            "prb-elem-dl": prbelemdlList
          }
        )
      }
    })
    return oduwindowList;
  }
  const setduRRMPolicyMemberList = (duItem: any) => {
    let duRRMPolicyMemberList: any[] = [];
    basicdata?.RRMPolicyList?.map((item: any) => {
      if (item.Name == duItem.rrmPolicyList) {
        const plmnObject =  basicdata?.PLMNInfo.find( plmn  => plmn.Name === item.PLMNInfo);
        duRRMPolicyMemberList.push({ idx: parseInt(item.id), mcc: plmnObject.MCC, sNSSAI: item.SNSSAI, mnc: plmnObject.MNC })
       // duRRMPolicyMemberList.push({ idx: item.id, mcc: item.MCC, sNSSAI: item.SNSSAI, mnc: item.PLMNInfo })
      }
    })
    return duRRMPolicyMemberList;
  }
  const setpreconfiguredruprofile = (duItem: any) => {
    var preconfiguredruprofile: any[] = [];
    duItem?.PreconfRUProfileList?.map((item: any, index: any) => {
      {
        preconfiguredruprofile.push(
          {
            "ru-index": item.RUIndex,
            "ru-instance-id": item.RUInstanceId
          }
        )
      }
    })
    return preconfiguredruprofile;
  }
  const setBWPlist = (duItem: any) => {
    var BWPlist: any[] = [];
    duItem?.BwpList?.map((item: any, index: any) => {
      {
        BWPlist.push(
          {
            id: item.id.split('-')[1]?.toString(),
            "attributes": {
              "cyclicPrefix": item.cyclePrefix,
              "priorityLabel": item.PriorityLabel,
              "subCarrierSpacing": item.SubCarrierSpacing,
              "numberOfRBs": item.NumberOfRBs,
              "isInitialBwp": item.isInitiaLBwp,
              "bwpContext": item.bwpContext,
              "startRB": item.startRB
            }
          }
        )
      }
    })
    return BWPlist;
  }

  const getDrxconfig = (duItem: any) => {
    var drxconfig: any[] = [];
    duItem?.DrxProfileIdInfoList?.map((drxitem: any, index: any) => {
      {
        var schedulingrequestconfig: any[] = [];
        drxitem?.SchedulingReqConfInfoList?.map((item: any, index: any) => {
          {
            schedulingrequestconfig.push(
              {
                "scheduling-request-id": item.schedulingrequest,
                "sr-prohibit-timer": item.scprohibittimer,
                "sr-trans-max": item.sctransmax
              }
            )
          }
        })
        drxconfig.push(
          {
            "drx-profile-id": drxitem.id,
            "scheduling-request-config": schedulingrequestconfig,
            "drx-inactivity-timer": drxitem.drxinactivitytimer,
            "drx-harq-rtt-timer-dl": drxitem.drxharqrttdl,
            "drx-retransmission-timer-ul": drxitem.drxtransmisul,
            "drx-long-cycle": drxitem.drxlongcycle,
            "drx-retransmission-timer-dl": drxitem.drxtransmisdl,
            "drx-harq-rtt-timer-ul": drxitem.drxharqrttul
          }
        )
      }
    })
    return drxconfig;
  }
  const getqosList = (duItem: any) => {
    var qoList: any[] = [];
    duItem?.qoslist?.map((qoitem: any, index: number) => {
      qoList.push({
        "qos-group-index": index + 1,
        "common-configuration-mac-parameter-list": {
          "dl-specific-parameters-list": {
           // "maxpdschduration": qoitem. maxpdschduration
            "max-dl-harq": qoitem.maxdlharqtx
          },
          "ul-specific-parameters-list": {
            "prioritised-bitrate": qoitem.prioritrizedbitrate,
            "logical-channel-sr-delay-timer-applied": qoitem.lsclchansrdelay,
            "logical-channel-sr-mask": qoitem.lgalchansrmask,
            "max-ul-harq-tx": qoitem.maxulharqtx,
            "bucket-size-duration": qoitem.bucketsizedura,
            "logical-channnel-group": qoitem.logicalchannel
          }
        }
      })
    })
    return qoList;
  }

  const getDeviceData = async () => {
    let dataPath = '/rests/data/network-topology:network-topology/topology=topology-netconf/node=' + nodeId + '/yang-ext:mount?=&fields=_3gpp-common-managed-element:ManagedElement';
    const restResult = (await managedElementsRestServices.getConfigData(dataPath));
    if (restResult?.data && restResult?.data['_3gpp-common-managed-element:ManagedElement']) {
      var deviceData = restResult?.data;
      setdevicedata(deviceData);
    }
    else {
      console.log("No Device Data")
    }
  }
  const updateDeviceData = async () => {
    try {
      let peeParametersList: any[] = []
      basicdata?.PeerParameterList?.map((item: any) => {
        if (item.id == cucpdata.peeParameters) {
          peeParametersList.push({
            siteDescription: item.siteDescription,
            environmentType: item.environmentType,
            equipmentType: item.environmentType,
            powerInterface: item.powerInterface,
            siteIdentification: item.siteIdentification,

          })
        }
      })

      let cuPeeParametersList: any[] = []
      basicdata?.PeerParameterList?.map((item: any) => {
        if (item.id == cucpdata.peeParameters) {
          cuPeeParametersList.push({
            siteIdentification: item.siteIdentification,
            equipmentType: item.environmentType,
            powerInterface: item.powerInterface,
            siteDescription: item.siteDescription,
            environmentType: item.environmentType,
          })
        }
      })

      let RRMPolicyMemberList: any[] = [];
      let snssaidata:any;
      basicdata?.RRMPolicyList?.map((item: any) => {
        if (item.Name == cucpdata.rrmPolicyList) {
          snssaidata = item.SNSSAI 
          const plmnObject =  basicdata?.PLMNInfo.find( plmn  => plmn.Name === item.PLMNInfo);
          RRMPolicyMemberList.push({ idx: parseInt(item.id), mcc: plmnObject.MCC, sNSSAI: item.SNSSAI, mnc: plmnObject.MNC })
          //RRMPolicyMemberList.push({ idx: item.id, mcc: item.MCC, sNSSAI: item.SNSSAI, mnc: item.PLMNInfo }) }
      }})

      //Mohan  To Do Need to Look  sNssai data
      let plmnlist: { mcc: any; mnc: any; sNssai: any }[] = []
      basicdata?.PLMNInfo?.map((item: any) => {
        if (item.Name == cucpdata.plmnId) { plmnlist.push({ mcc: item.MCC, mnc: item.MNC, sNssai: snssaidata }) }
      })

      let plmnID: { mcc: any; mnc: any }[] = []
      basicdata?.PLMNInfo?.map((item: any) => {
        if (item.Name == cucpdata.plmnId) { plmnID.push({ mcc: item.MCC, mnc: item.MNC }) }
      })

      var EP_F1C: any[] = [];
      var EP_XnC: any[] = [];
      var EP_NgC: any[] = [];
      var EP_X2C: any[] = [];

      var EP_S1U: any[] = [];
      var EP_NgU: any[] = [];
      var EP_X2U: any[] = [];
      var EP_F1U: any[] = [];

      cucpdata?.EndPointList?.map((item: any, index: any) => {
        if (item.EndPoint == "EP_F1C") {
          EP_F1C.push({
            id: item.id,
            attributes: {
              localAddress: [
                {
                  ipAddress: item.LocalIPAddress,
                  vlanId: item.VLANId
                }
              ],
              remoteAddress: item.RemoteIpAddress
            }
          })
        }
        else if (item.EndPoint == "EP_NgC") {
          EP_NgC.push({
            id: item.id,
            attributes: {
              localAddress: [
                {
                  ipAddress: item.LocalIPAddress,
                  vlanId: item.VLANId
                }
              ],
              remoteAddress: item.RemoteIpAddress
            }
          })
        }
        else if (item.EndPoint == "EP_X2C") {
          EP_X2C.push({
            id: item.id,
            attributes: {
              localAddress: [
                {
                  ipAddress: item.LocalIPAddress,
                  vlanId: item.VLANId
                }
              ],
              remoteAddress: item.RemoteIpAddress
            }
          })
        }
        else if (item.EndPoint == "EP_XnC") {
          EP_XnC.push({
            id: item.id,
            attributes: {
              localAddress: [
                {
                  ipAddress: item.LocalIPAddress,
                  vlanId: item.VLANId
                }
              ],
              remoteAddress: item.RemoteIpAddress
            }
          })
        }
        if (item.EndPoint == "EP_F1U") {
          EP_F1U.push({
            id: item.id,
            attributes: {
              localAddress: [
                {
                  ipAddress: item.LocalIPAddress,
                  vlanId: item.VLANId
                }
              ],
              remoteAddress: item.RemoteIpAddress
            }
          })
        }
        else if (item.EndPoint == "EP_NgU") {
          EP_NgU.push({
            id: item.id,
            attributes: {
              localAddress: [
                {
                  ipAddress: item.LocalIPAddress,
                  vlanId: item.VLANId
                }
              ],
              remoteAddress: item.RemoteIpAddress
            }
          })
        }
        else if (item.EndPoint == "EP_X2U") {
          EP_X2U.push({
            id: item.id,
            attributes: {
              localAddress: [
                {
                  ipAddress: item.LocalIPAddress,
                  vlanId: item.VLANId
                }
              ],
              remoteAddress: item.RemoteIpAddress
            }
          })
        }
        else if (item.EndPoint == "EP_S1U") {
          EP_S1U.push({
            id: item.id,
            attributes: {
              localAddress: [
                {
                  ipAddress: item.LocalIPAddress,
                  vlanId: item.VLANId
                }
              ],
              remoteAddress: item.RemoteIpAddress
            }
          })
        }

      })

      cuupdata?.EndPointList?.map((item: any, index: any) => {
        
        if (item.EndPoint == "EP_F1U") {
          EP_F1U.push({
            id: item.id,
            attributes: {
              localAddress: [
                {
                  ipAddress: item.LocalIPAddress,
                  vlanId: item.VLANId
                }
              ],
              remoteAddress: item.RemoteIpAddress
            }
          })
        }
        else if (item.EndPoint == "EP_NgU") {
          EP_NgU.push({
            id: item.id,
            attributes: {
              localAddress: [
                {
                  ipAddress: item.LocalIPAddress,
                  vlanId: item.VLANId
                }
              ],
              remoteAddress: item.RemoteIpAddress
            }
          })
        }
        else if (item.EndPoint == "EP_X2U") {
          EP_X2U.push({
            id: item.id,
            attributes: {
              localAddress: [
                {
                  ipAddress: item.LocalIPAddress,
                  vlanId: item.VLANId
                }
              ],
              remoteAddress: item.RemoteIpAddress
            }
          })
        }
        else if (item.EndPoint == "EP_S1U") {
          EP_S1U.push({
            id: item.id,
            attributes: {
              localAddress: [
                {
                  ipAddress: item.LocalIPAddress,
                  vlanId: item.VLANId
                }
              ],
              remoteAddress: item.RemoteIpAddress
            }
          })
        }

      })

      let upRRMPolicyMemberList: any[] = [];
      basicdata?.RRMPolicyList?.map((item: any) => {
        if (item.Name == cuupdata.RRMPolicy) {
          const plmnObject =  basicdata?.PLMNInfo.find( plmn  => plmn.Name === item.PLMNInfo);
          upRRMPolicyMemberList.push({ idx: parseInt(item.id), mcc: plmnObject.MCC, sNSSAI: item.SNSSAI, mnc: plmnObject.MNC })
        }
      })

      var cucpSecurityHandling: any[] = [{
        id: cucpdata.secAlId,
      }];

      if(cucpdata?.IntegrityProtectAlgoPrio)
      {
        cucpSecurityHandling.push( {attributes: {
          integrityProtectAlgoPrio: [cucpdata.IntegrityProtectAlgoPrio ? cucpdata.IntegrityProtectAlgoPrio : "N1A1"],
          cipheringAlgoPrio: [cucpdata.CipheringAlgoPrio ? cucpdata.CipheringAlgoPrio : "NEA0"]
        }})
      }

      var du_Config: any[] = [];
      var RRHList: any[] = [];

      dudata?.map((item: any, index: any) => {
        {
          var DUEP_F1U: any[] = [];
          var DUEP_F1C: any[] = [];
          item?.EndPointList?.map((epitem: any, index: any) => {
            if (epitem.EndPoint == "EP_F1C") {
              DUEP_F1C.push({
                id: epitem.Id,
                attributes: {
                  localAddress: [
                    {
                      ipAddress: epitem.LocalIPAddress,
                      vlanId: epitem.VLANID
                    }
                  ],
                  remoteAddress: epitem.RemoteIPAddress
                }
              })
            }
            if (epitem.EndPoint == "EP_F1U") {
              DUEP_F1U.push({
                id: epitem.Id,
                attributes: {
                  localAddress: [
                    {
                      ipAddress: epitem.LocalIPAddress,
                      vlanId: epitem.VLANID
                    }
                  ],
                  remoteAddress: epitem.RemoteIPAddress
                }
              })
            }
          })

          // let ducelldata: any
          // cellConfigdata?.map((cellitem: any) => {
          //   if (item.cellId == cellitem.cellId) {
          //     ducelldata = cellitem;
          //   }
          // })
          let ducelldata: any[] = [];
          cellConfigdata?.map((cellitem: any) => {
            item?.NRCellDUList?.map((Listitem: any) => {
              if (cellitem.cellId == Listitem.cellId) {
                ducelldata.push(cellitem);
              }
            })

          })
          var ManagedNFService: any[] = [];
          item?.ManagedNFServiceList?.map((mitem: any, index: any) => {
            {
              ManagedNFService.push(
                {
                  "id": "1",
                  "attributes": {
                    "sAP": [
                      {
                        "host": mitem.saphost,
                        "port": mitem.sapport
                      }
                    ],
                    "operations": [
                      {
                        "name": mitem.operationsName,
                        "allowedNFTypes": [
                          mitem.operationsAllowed
                        ]
                      }
                    ],
                    "administrativeState": mitem.AdministrativeState?.toUpperCase()
                  }
                }
              )
            }
          })
          let NRSectorCarrierlist = setNRSectorCarrier(item);
          let duRRMPolicyMemberList = setduRRMPolicyMemberList(item);
          let dupeeParametersList = setdupeeParametersList(item);
          var NRCellDU: any[] = [];

          ducelldata?.map((ducellitem: any, index: number) => {
            NRCellDU.push(
              {
                "id": parseInt(ducellitem?.cellId?.split("cell")[1]),
                "attributes": {
                  "bSChannelBwUL": ducellitem.bsChannelBwUL,
                  "ssbSubCarrierSpacing": ducellitem.ssbSubCarrierSpacing,
                  "cellLocalId": item.NRCellDUList[index].CellLocalId,
                  "arfcnDL": ducellitem.arfcnDL,
                  "arfcnSUL": ducellitem.arfcnSUL,
                  "resourceType": item.ResourceType? item.ResourceType:item.resourceType,
                  "ssbOffset": ducellitem.ssbOfset,
                  "rRMPolicyMemberList": duRRMPolicyMemberList,
                  "bSChannelBwDL": ducellitem.bsChannelBwDL,
                  "administrativeState":ducellitem?.administrativeState?ducellitem?.administrativeState:"UNLOCKED",
                  "pLMNInfoList": plmnlist,
                  "ssbDuration": ducellitem.ssbDuration,
                  "arfcnUL": ducellitem.arfcnUL,
                  "nRSectorCarrierRef": [item.NRCellDUList[index].NRSectorCarrierReflistId.split('-')[1]?.toString()],
                  "nRPCI": item.NRCellDUList[index].NRPCI,
                  "nRTAC": item.NRCellDUList[index].NRTAC,
                  "ssbFrequency": ducellitem.ssbFrequency,
                  "ssbPeriodicity": ducellitem.ssbPeriodicity, 
                  "priorityLabel": ducellitem.PriorityLabel,
                  
                }
              }
            )
          })

          var scelldeactivationtimerlist: any[] = [];
          item?.ScellDeactiveInfoList?.map((item: any, index: any) => {
            {
              scelldeactivationtimerlist.push(
                {
                  "id": item?.Index,
                  "scell-deactivation-timer": item.DeactivationTimer
                }
              )
            }
          })

          let BWPlist = setBWPlist(item);
          let preconfiguredruprofile = setpreconfiguredruprofile(item);
          let oduwindowList = setoduwindowList(item);

          let DrxconfigList = getDrxconfig(item);
          let qosList = getqosList(item);

          du_Config.push(
            {
              "id": "1",
              "_3gpp-nr-nrm-bwp:BWP": BWPlist,
              "_3gpp-nr-nrm-nrsectorcarrier:NRSectorCarrier": NRSectorCarrierlist,
              "o-ran-odu-fh-management:odu-fh-management": {
                "du-sync-state": {
                  "du-index": item.DUIndex,
                  "gNBDUId": item.gNBDUId,
                  "sync-state": item.SyncState
                },
                "o-du-window": oduwindowList,
                "window-determine-method": {
                  "method": item.Method,
                  "configuration-status": item.ConfigStatus,
                  "ru-num": item.RUCount,
                  // "pre-configured-ru-profile": preconfiguredruprofile,
                  "pre-configured-ru-profile": devicedata['_3gpp-common-managed-element:ManagedElement'][0]['_3gpp-nr-nrm-gnbdufunction:GNBDUFunction'][0]['o-ran-odu-fh-management:odu-fh-management']['window-determine-method']['pre-configured-ru-profile'],
                  "pre-configured-delay-profile": {
                    "ta4-max": item.ta4Max,
                    "t12-min": item.t12Min,
                    "t1a-max-up": item.t1aMaxUp,
                    "t2a-max-cp-ul": item.t2aMaxCpUl,//item.t1aMaxCpUl,
                    "t2a-min-cp-ul": item.t2aMinCpUl,
                    "t1a-max-cp-dl": item.t1aMaxCpDl,
                    "t2a-min-up": item.t2aMinUp,
                    "t2a-max-up": item.t2aMaxUp,
                    "t1a-min-cp-dl": item.t1aMinCpDl,
                    "t12-max": item.t12Max,
                    "t1a-max-cp-ul": item.t1aMaxCpUl,
                    "t2a-min-cp-dl": item.t2aMinCpDl,
                    "ta4-min": item.ta4Min,
                    "t2a-max-cp-dl": item.t2aMaxCpDl,
                    "t1a-min-cp-ul": item.t1aMinCpUl,
                    "t34-max": item.t34Max,
                    "ta3-max": item.ta3Max,
                    "t34-min": item.t34Min,
                    "ta3-min": item.ta3Min,
                    "t1a-min-up": item.t1aMinUl
                  }
                }
              },
              "attributes": {
                "rRMPolicyMemberList": duRRMPolicyMemberList,
                "userLabel": item.userLabel,
                "gNBDUId": item.gNBDUId,
                "peeParametersList": dupeeParametersList[0],
                "priorityLabel": item.priorityLabel,
                "resourceType": item.ResourceType?item.ResourceType:item.resourceType,
                "gNBIdLength": item.gNBIdLength,
                "o-ran_3gpp-nr-nrm-gnbdufunction:o-ran-configuration": {
                  "mac-configuration": {
                    "srb-config": {
                      "common-configuration-mac-parameter-list": {
                        "allowed-serv-cells": item.srblist?.AllowedServCells,
                        "priority": item.srblist?.Priority
                      },
                      "ul-specific-parameters-list": {
                        "logical-channel-sr-delay-timer-applied": item.srblist?.srdelaytimer
                        //"maxpuschduration": item.srDelayTimerInfoList[0].maxpuschduration
                      }
                    },
                    "phr-config": {
                      "phr-periodic-timer": item.phrPeriodicTimer,
                      "phr-type2-othercell": item.PhrType2OtherCell == "false" ? false : true,
                      "phr-mode-other-cg": item.PhrModeOthercg,
                      "phr-prohibit-timer": item.phrProhibitTimer,
                      "phr-tx-power-factor-change": item.PhrTxpowerFactorchange
                    },
                    "drx-config": DrxconfigList,
                    "bsr-config": {
                      "periodicity-bsr-timer": item.periodicityBsrTimer,
                      "retx-bsr-timer": item.RctxBsrTimer,
                      "logical-channel-sr-delay-timer": item.LogicalChannelSrdelayTimer
                    },
                    "scell-deactivation-timer-list": scelldeactivationtimerlist,
                    "qos-group-config-list": qosList,
                  }
                }
              },
              "ManagedNFService": ManagedNFService,
              "_3gpp-nr-nrm-nrcelldu:NRCellDU": NRCellDU,
              "_3gpp-nr-nrm-ep:EP_F1C": DUEP_F1C,
              "_3gpp-nr-nrm-ep:EP_F1U": DUEP_F1U
            })

        }
      })

      var NRCellCU: any[] = [];

      cucpdata?.NRCellCuList?.map((nRCitem: any) => {
        let celldata = cellConfigdata?.find((item) => item.cellId == nRCitem.cellId);
        if(celldata.RRHList && celldata.RRHList.length>0)
        {
        var rrhItem=celldata.RRHList[0];
        RRHList.push(
          {
           "id": rrhItem.id,
            "AllRRHInfo": {
              "dlEarfcn": rrhItem.dlEarfcn,
              "antennaConfig": {
                "txPower": rrhItem.txPower,
                "antennaGain":rrhItem.antennaGain,
                "antennaId": rrhItem.antennaId
              },
              "bandWidth": rrhItem.bandWidth,
              "ulEarfcn": rrhItem.ulEarfcn,
              "antennaType": rrhItem.antennaType,
              "cpriLoopback": {
                "isLoopBackEnabled": rrhItem.isLoopBackEnabled,
                "testTime": rrhItem.testTime,
                "mode": rrhItem.mode
              },
              "cpriRate": rrhItem.cpriRate,
              "frequencyBand": rrhItem.frequencyBand,
              "delayParam": {
                "rxDelay": rrhItem.rxDelay,
                "txDelay": rrhItem.txDelay
              },
              "mimoMode": rrhItem.mimoMode,
              "rrhModel": "DEFAULT_RRH_MODEL",
              "setRRHDate": rrhItem.setRRHDate,
              "duplexMode": rrhItem.duplexMode,
              "isRetEnabled": rrhItem.isRetEnabled
            }
          }
        )
      }
        NRCellCU.push(
          {
            "id": parseInt(nRCitem.cellId?.split("cell")[1]),
            "attributes": {
              "cellLocalId": nRCitem.CellLocalId,
              "pLMNInfoList": plmnlist,
              "priorityLabel": 1
            },
            "_3gpp-nr-nrm-nrfreqrelation:NRFreqRelation": [
              {
               // "id": (parseInt(item.cellId?.split("cell")[1])-1).toString(),
               "id": celldata?.NrfID,
                "attributes": {
                  "peeParametersList": peeParametersList[0],
                  "threshXLowP": celldata?.threshXLowP,
                  "threshXLowQ": celldata?.threshXLowQ,
                  "qQualMin": celldata?.qQualMin,
                  "cellReselectionPriority": celldata?.CellReselectionPriority,
                  "offsetMO": {
                    "sinrOffsetCsiRs": celldata?.sinrOffsetCsiRs,
                    "rsrpOffsetSsb": celldata?.rsrpOffsetSSB,
                    "sinrOffsetSsb": celldata?.sinrOffsetSSB,
                    "rsrqOffsetCsiRs": celldata?.rsrqOffsetCsiRs,
                    "rsrpOffsetCsiRs": celldata?.rsrpOffsetCsiRs,
                    "rsrqOffsetSsb": celldata?.rsrqOffsetSSB,
                  },
                  "cellReselectionSubPriority": celldata?.CellReselectionSubPriority,
                  "qRxLevMin": celldata?.qRxLevMin,
                  "pMax": celldata?.pMax,
                  "priorityLabel": celldata?.PriorityLabel,
                  "userLabel": cucpdata?.UserLabel,
                  "threshXHighQ": celldata?.threshXHighQ,
                  "qOffsetFreq": celldata?.qOffsetFrequency,
                  "threshXHighP": celldata?.threshXHighP,
                  "tReselectionNRSfMedium": celldata?.tReselectionNRSfMedium,
                  "tReselectionNR": celldata?.tReselectionNR,
                  // "tReselectionNRSfHigh": 75,
                  "tReselectionNRSfHigh": celldata?.tReselectionNRSfHigh,
                  "nRFrequencyRef": celldata?.nRFrequencyref
                }
              }
            ]
          }
        )
      })

      NRCellCU.sort((a: any, b: any) => {
        if ("" + a["id"] < ("" + b["id"])) return -1;
        if ("" + a["id"] > ("" + b["id"])) return 1;
        return 0;
      })
      devicedata['_3gpp-common-managed-element:ManagedElement'][0].attributes.dnPrefix = basicdata?.DnPrefix
      devicedata['_3gpp-common-managed-element:ManagedElement'][0].attributes.priorityLabel = basicdata?.PriorityLabel
      devicedata['_3gpp-common-managed-element:ManagedElement'][0]['_3gpp-nr-nrm-gnbcucpfunction:GNBCUCPFunction'][0].attributes.gNBIdLength = parseInt(cucpdata?.gNBIDLength);
      devicedata['_3gpp-common-managed-element:ManagedElement'][0]['_3gpp-nr-nrm-gnbcucpfunction:GNBCUCPFunction'][0].attributes.gNBId = cucpdata?.gNBID?.toString();
      devicedata['_3gpp-common-managed-element:ManagedElement'][0]['_3gpp-nr-nrm-gnbcucpfunction:GNBCUCPFunction'][0].attributes.priorityLabel = cucpdata.PriorityLabel;
      devicedata['_3gpp-common-managed-element:ManagedElement'][0]['_3gpp-nr-nrm-gnbcucpfunction:GNBCUCPFunction'][0].attributes.userLabel = cucpdata.UserLabel;
      if (cucpdata.ResourceType)
        devicedata['_3gpp-common-managed-element:ManagedElement'][0]['_3gpp-nr-nrm-gnbcucpfunction:GNBCUCPFunction'][0].attributes.resourceType = cucpdata.ResourceType;
      devicedata['_3gpp-common-managed-element:ManagedElement'][0]['_3gpp-nr-nrm-gnbcucpfunction:GNBCUCPFunction'][0].attributes.gNBCUName = cucpdata.gNBCUName;
     if(devicedata['_3gpp-common-managed-element:ManagedElement'][0]['_3gpp-nr-nrm-gnbcucpfunction:GNBCUCPFunction'][0]['o-ran-cu-security-handling:SecurityHandling'])
     { devicedata['_3gpp-common-managed-element:ManagedElement'][0]['_3gpp-nr-nrm-gnbcucpfunction:GNBCUCPFunction'][0]['o-ran-cu-security-handling:SecurityHandling'] = cucpSecurityHandling;}
      if (NRCellCU.length > 0)
        devicedata['_3gpp-common-managed-element:ManagedElement'][0]['_3gpp-nr-nrm-gnbcucpfunction:GNBCUCPFunction'][0]['_3gpp-nr-nrm-nrcellcu:NRCellCU'] = NRCellCU;
      if (plmnID.length > 0)
        devicedata['_3gpp-common-managed-element:ManagedElement'][0]['_3gpp-nr-nrm-gnbcucpfunction:GNBCUCPFunction'][0].attributes.pLMNId = plmnID;
      if (RRMPolicyMemberList.length > 0)
        devicedata['_3gpp-common-managed-element:ManagedElement'][0]['_3gpp-nr-nrm-gnbcucpfunction:GNBCUCPFunction'][0].attributes.rRMPolicyMemberList = RRMPolicyMemberList;
      if (peeParametersList[0])
        devicedata['_3gpp-common-managed-element:ManagedElement'][0]['_3gpp-nr-nrm-gnbcucpfunction:GNBCUCPFunction'][0].attributes.peeParametersList = cuPeeParametersList[0];
      if (EP_F1C.length > 0)
        devicedata['_3gpp-common-managed-element:ManagedElement'][0]['_3gpp-nr-nrm-gnbcucpfunction:GNBCUCPFunction'][0]['_3gpp-nr-nrm-ep:EP_F1C'] = EP_F1C;
      if (EP_XnC.length > 0)
        devicedata['_3gpp-common-managed-element:ManagedElement'][0]['_3gpp-nr-nrm-gnbcucpfunction:GNBCUCPFunction'][0]['_3gpp-nr-nrm-ep:EP_XnC'] = EP_XnC;
      if (EP_NgC.length > 0)
        devicedata['_3gpp-common-managed-element:ManagedElement'][0]['_3gpp-nr-nrm-gnbcucpfunction:GNBCUCPFunction'][0]['_3gpp-nr-nrm-ep:EP_NgC'] = EP_NgC;
      if (EP_X2C.length > 0)
        devicedata['_3gpp-common-managed-element:ManagedElement'][0]['_3gpp-nr-nrm-gnbcucpfunction:GNBCUCPFunction'][0]['_3gpp-nr-nrm-ep:EP_X2C'] = EP_X2C;
      if (cuupdata.PriorityLabel)
        devicedata['_3gpp-common-managed-element:ManagedElement'][0]['_3gpp-nr-nrm-gnbcuupfunction:GNBCUUPFunction'][0].attributes.priorityLabel = cuupdata.PriorityLabel;
      if (cuupdata.gNBId)
        devicedata['_3gpp-common-managed-element:ManagedElement'][0]['_3gpp-nr-nrm-gnbcuupfunction:GNBCUUPFunction'][0].attributes.gNBId = cuupdata.gNBId;
      if (cuupdata.ResourceType)
        devicedata['_3gpp-common-managed-element:ManagedElement'][0]['_3gpp-nr-nrm-gnbcuupfunction:GNBCUUPFunction'][0].attributes.resourceType = cuupdata.ResourceType;
      if (upRRMPolicyMemberList.length > 0)
        devicedata['_3gpp-common-managed-element:ManagedElement'][0]['_3gpp-nr-nrm-gnbcuupfunction:GNBCUUPFunction'][0].attributes.rRMPolicyMemberList = upRRMPolicyMemberList;
      if (EP_S1U.length > 0)
        devicedata['_3gpp-common-managed-element:ManagedElement'][0]['_3gpp-nr-nrm-gnbcuupfunction:GNBCUUPFunction'][0]['_3gpp-nr-nrm-ep:EP_S1U'] = EP_S1U;
      if (EP_NgU.length > 0)
        devicedata['_3gpp-common-managed-element:ManagedElement'][0]['_3gpp-nr-nrm-gnbcuupfunction:GNBCUUPFunction'][0]['_3gpp-nr-nrm-ep:EP_NgU'] = EP_NgU;
      if (EP_X2U.length > 0)
        devicedata['_3gpp-common-managed-element:ManagedElement'][0]['_3gpp-nr-nrm-gnbcuupfunction:GNBCUUPFunction'][0]['_3gpp-nr-nrm-ep:EP_X2U'] = EP_X2U;
      if (EP_F1U.length > 0)
        devicedata['_3gpp-common-managed-element:ManagedElement'][0]['_3gpp-nr-nrm-gnbcuupfunction:GNBCUUPFunction'][0]['_3gpp-nr-nrm-ep:EP_F1U'] = EP_F1U;
      devicedata['_3gpp-common-managed-element:ManagedElement'][0]['_3gpp-nr-nrm-gnbdufunction:GNBDUFunction'] = du_Config;
     if(devicedata['_3gpp-common-managed-element:ManagedElement'][0]['proprietary_gNodeB_RRH_Data_Model:RRHList'])
     {
      devicedata['_3gpp-common-managed-element:ManagedElement'][0]['proprietary_gNodeB_RRH_Data_Model:RRHList'] = RRHList;
     }
     setdevicedata(devicedata);

      if (compareOpened) {
        CurrentDevicedata['_3gpp-common-managed-element:ManagedElement'][0]['_3gpp-nr-nrm-gnbdufunction:GNBDUFunction'][0]['o-ran-odu-fh-management:odu-fh-management']['o-du-window']?.sort((a: any, b: any) => {
          if ("" + a["ru-index-id"] < ("" + b["ru-index-id"])) return -1;
          if ("" + a["ru-index-id"] > ("" + b["ru-index-id"])) return 1;
          return 0;
        })

        CurrentDevicedata['_3gpp-common-managed-element:ManagedElement'][0]['_3gpp-nr-nrm-gnbdufunction:GNBDUFunction'][0]['_3gpp-nr-nrm-nrcelldu:NRCellDU']?.sort((a: any, b: any) => {
          if ("" + a["id"] < ("" + b["id"])) return -1;
          if ("" + a["id"] > ("" + b["id"])) return 1;
          return 0;
        })
        CurrentDevicedata['_3gpp-common-managed-element:ManagedElement'][0]['_3gpp-nr-nrm-gnbcucpfunction:GNBCUCPFunction'][0]['_3gpp-nr-nrm-nrcellcu:NRCellCU']?.sort((a: any, b: any) => {
          if ("" + a["id"] < ("" + b["id"])) return -1;
          if ("" + a["id"] > ("" + b["id"])) return 1;
          return 0;
        })

        comdevicedata = JSON.stringify([devicedata], null, 2);
        setcomdevicedata(JSON.stringify([devicedata], null, 2));

        setcomdeviceCurrentdata(JSON.stringify([CurrentDevicedata], null, 2));
        comdeviceCurrentdata = JSON.stringify([CurrentDevicedata], null, 2);
        setcompareOpen(true);
        if (comdevicedata === comdeviceCurrentdata) {
          setisCompareDiff(true);
          //alert(" No diffeerence between Device and DB")
        }
        else {
          setisCompareDiff(false);
        }
        axios.post(baseUri + "/auditlog/_doc", {
          "nodeId": nodeId,
          "user": userName,
          "event": "Compare",
          "DeviceData": comdeviceCurrentdata,
          "DeviceDBData": comdevicedata,
          "timestamp": new Date().toISOString()
        }).then(function (resp: any) {
          console.log("auditlog Added for Compare");
        }).catch((err: any) => {
          console.log(err);
        })
      }
    }
    catch (ex) {
      MessageType = "error";
      setMessageType("error");
      console.log(" Error In  " + operationType + "... " + + ex);
      setsaveSucesopen(true);
      setSucessMessage(" Error in " + operationType + "...  " + ex);
    }
  }

  const CompareData = async () => {
    setMessageType("OK");
    operationType = "Device Data Compare";
    setoperationType("Device Data Compare");
    compareOpened = true;
    setcompareOpened(true);

    let dataPath = '/rests/data/network-topology:network-topology/topology=topology-netconf/node=' + nodeId + '/yang-ext:mount?=&fields=_3gpp-common-managed-element:ManagedElement';
    const restResult = (await managedElementsRestServices.getConfigData(dataPath));
    if (restResult?.data && restResult?.data['_3gpp-common-managed-element:ManagedElement']) {
      try {
        var curdevicedata = restResult?.data;
        CurrentDevicedata = curdevicedata;
        setCurrentDevicedata(curdevicedata);
        updateDeviceData();
      }
      catch (e) {
        setMessageType("error");
        console.log(" Error In Compare " + e);
        setsaveSucesopen(true);
        setSucessMessage(" Error in Compare " + e);
      }
    }
    else {
      console.log("No Device Data")
      setMessageType("error");
      setsaveSucesopen(true);
      setSucessMessage("No Device Data... Try Later");
    }
  }

  const submitDeviceData = async () => {
    setMessageType("OK");
    operationType = "Device config update";
    setoperationType("Device config update");
    try {
      let data ;
      if(devicedata)
      {
       data = devicedata['_3gpp-common-managed-element:ManagedElement'][0];
      }
      else
      {
        getDeviceData();
        data = devicedata['_3gpp-common-managed-element:ManagedElement'][0];
        if(data == null ){
          console.log("No Device Data")
      setMessageType("error");
      setsaveSucesopen(true);
      setSucessMessage("No Device Data");
        }
      }
      let id = data?.id
      let dataPath = '/rests/data/network-topology:network-topology/topology=topology-netconf/node=' + nodeId + '/yang-ext:mount/_3gpp-common-managed-element:ManagedElement=' + id;
      updateDeviceData();

       axios.post(baseUri + "/auditlog/_doc", {
        "nodeId": nodeId,
        "user": userName,
        "event": "Edit Config",
        "ConfigData": devicedata,
        "timestamp": new Date().toISOString()
      }).then(function (resp: any) {
        console.log("auditlog Added for Edit Config");
      }).catch((err: any) => {
        console.log(err);
      })
      if(data){
      if (MessageType != "error") {
        const restRes = (await managedElementsRestServices.setConfigData(dataPath, devicedata));
      
        if (restRes && restRes.status && (restRes.status >= 200 && restRes.status <= 300)) {
           ///Success message for kafka topic
           const now = Date.now(); 
           const microseconds = Math.floor(performance.now() * 1000); 
           const currentTimeInMicrosec = now * 1000 + microseconds % 1000; 

          console.log(restRes.status);
          setsaveSucesopen(true);
          setSucessMessage(" Device config update successfully ");
          setMessageType("OK");
          axios.post(baseUri+"/proxyapi/SendMessageToNMS",
            {
              "message": {
                 "sdnrNotification":{ "nodeId": nodeId ,
                  "status":"configuration-applied",
                  "type":"device-edit-status",
                  "eventTimeEpochMicrosec":currentTimeInMicrosec,
                  "message":"Successfully configuration applied"
                  }
              },
              "topic": "5G_EMS_DEVICE_NOTIFICATION"
          }).then((res: any) => {
            console.log(res.data)
          });

        }
        else {
          setMessageType("error");
          console.log(" Device config update fail " + restRes.message + "... " + restRes?.data?.errors?.error[0]['error-message']);
          setsaveSucesopen(true);
          setSucessMessage(" Device config update fail .." + restRes?.data?.errors?.error[0]['error-message']);
        }
      }
    }else{
      setMessageType("error");
      console.log(" Device config update fail " );
      setsaveSucesopen(true);
      setSucessMessage(" Device config update fail .." );
    }
  }
    catch (e) {
      setMessageType("error");
      console.log(" Device config update fail " + e);
      setsaveSucesopen(true);
      setSucessMessage(" Device config update fail .." + e);
    }
  };

  const CustomTableCell = ({ row, name }: { row: any, name: any }) => {
    return (
      <TableCell align="center" style={{ width: '100px', height: '5px' }}>
        {row[name]}
      </TableCell>
    );
  };

  const handleNext = () => {
    setCellConfigCurrentPage((prevPage) => Math.min(prevPage + 1, CellConfigMaxPage));
    setDuConfigCurrentPage((prevPage) => Math.min(prevPage + 1, DuConfigMaxPage));

  };

  const handlePrevious = () => {
    setCellConfigCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
    setDuConfigCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
  };

  const SaveSucesClose = () => {
    setsaveSucesopen(false);
  }
  const CompareClose = () => {
    setcompareOpen(false);
  }

  const tooltipTitles = [
    'General Configuration', 'DU Cell Parameter', 'CU Cell Parameter', 'Cell Reselection', 'RRH Configuration', 'RRH Antenna'
  ];
  const DUtooltipTitles = [
    'General Configuration', 'Managed NF Service List', 'End Point List', 'Drx Profile Id List',
    'srb info', 'QOS Ul & DL Specific Parameters List', 'Bsr Configuration', 'Phr Configuration', 'SCell Deactivation Timer List', 'NR Sector Carrier List',
    'Bwp List', 'NR Cell DU', 'DU Sync State', 'ODU Window Method', 'Pre Configured RU Profile List', 'Pre Configured Delay Profile', 'ODU Window List'
  ];

  return (
    <div style={{ width: '100%', height: '510px' }}>
      <Dialog open={compareOpen == true} onClose={CompareClose}
        PaperProps={{ style: { minHeight: '23vh', minWidth: '70vw', border: '4px solid #38456a', borderRadius: '5px', backgroundColor: '#e8e8e8' } }} >
        <DialogContent style={{ alignContent: 'center', textAlign: "center" }}>
          <div><Typography>Device Data Vs DataBase</Typography></div>
          {isCompareDiff == true && <div><Typography>No difference available</Typography></div>}
          <div>
            {/* <ReactJsonViewCompare oldData={deviceCurrentdata} newData={devicedata}  splitView={true} /> */}
            <ReactDiffViewer oldValue={comdeviceCurrentdata} newValue={comdevicedata} splitView={true} leftTitle={"Data from Device"} rightTitle={" Data from Database "} extraLinesSurroundingDiff={5} />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            setcompareOpen(false);
            setcompareOpened(false);
            setisCompareDiff(false);
          }} style={{ backgroundColor: 'white', color: '#38761d', border: '1px solid #2986cc', borderRadius: '4px', padding: '3px 6px', marginRight: '5%' }}>
            OK
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={saveSucesopen == true} onClose={SaveSucesClose}
        PaperProps={{ style: { minHeight: '12vh', minWidth: '23vw', border: '14px solid #38456a', borderRadius: '15px', backgroundColor: '#e8e8e8' } }} >
        {/* <DialogTitle id="form-sucdialog-title" > {savedialogTitle}</DialogTitle> */}
        <DialogContent style={{ alignContent: 'center', textAlign: "center" }}>
          <IconButton style={{ color: '#008000', textAlign: "center" }}>
            {MessageType === "OK" ? (<CheckCircleOutlineRoundedIcon style={{ color: '#008000' }} />)
              : (<WarningAmberRoundedIcon style={{ color: 'red' }} />)}
            <h6 style={{ marginLeft: '3px', color: MessageType == "OK" ? '#008000' : 'orange', }}>{SucessMessage}</h6> </IconButton>
        </DialogContent>
        <DialogActions>
          <Button onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            setsaveSucesopen(false);
          }} style={{ backgroundColor: 'white', color: '#38761d', border: '1px solid #2986cc', borderRadius: '4px', padding: '3px 6px' }}>
            OK
          </Button>
        </DialogActions>
      </Dialog>
      <b> Summary</b>
      <Paper style={{ color: '#ffffff', backgroundColor: '#55679d', width: "99%", verticalAlign: 'middle', height: '30px', marginTop: '2px', marginLeft: '4px', border: '2px solid #ccc', cursor: 'pointer' }} onClick={toggleIsExpanded}>
        <label style={{ paddingTop: '7px', fontWeight: 'bold', verticalAlign: 'middle', display: 'table-cell' }}
          onClick={(e) => {
            e.stopPropagation();
            toggleIsExpanded();
          }} >  Basic Config</label>
        <IconButton style={{ marginLeft: '95%', marginTop: '-3.2%', border: '3px solid #ccc', height: '25px', width: '25px' }}>
          {isBasicExpanded ? <ArrowDropDownRoundedIcon className="expnd_icon" /> : < ArrowDropUpRoundedIcon className="expnd_icon" />}
        </IconButton>
      </Paper>
      <div className='collapse' style={{ height: isBasicExpanded ? '260px' : '0px', width: '99%', border: '2px solid #ccc', backgroundColor: '#ffffff', marginLeft: '4px' }}>

        <div style={{ border: '1px solid #c6cbd1', borderRadius: '3px', margin: '0.5%', padding: '1%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
          <Card style={{ backgroundColor: '#c6cbd1', height: '25px' }}>
            <CardContent>
              <b style={{ fontSize: '14px', marginBottom: '10px', position: 'relative', top: '-12px' }}>Generic Parameters</b>
            </CardContent>
          </Card>
          <Paper elevation={2} style={{ padding: '1px' }}>
            <table><tbody><tr>
              <td style={{ width: '300px', padding: '5px 0' }}><label style={{ padding: '5px', fontSize: '14px' }}> Dn Prefix : <b style={{ fontSize: '14px' }}>{basicdata?.DnPrefix}</b></label></td>
              <td style={{ width: '300px', padding: '5px 0' }}><label style={{ padding: '5px', fontSize: '14px' }}> Priority Label :<b style={{ fontSize: '14px' }}> {basicdata?.PriorityLabel}</b></label></td>
            </tr></tbody></table>
          </Paper>
        </div>

        <div style={{ border: '1px solid #c6cbd1', borderRadius: '3px', margin: '0.5%', padding: '1%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
          <Card style={{ backgroundColor: '#c6cbd1', height: '25px' }}>
            <CardContent>
              <b style={{ fontSize: '14px', marginBottom: '10px', position: 'relative', top: '-12px' }}>Measurement Control</b>
            </CardContent>
          </Card>
          <Paper elevation={2} style={{ padding: '1px' }}>
            <table><tbody><tr>
              <td style={{ width: '300px', padding: '5px 0' }}><label style={{ padding: '5px', fontSize: '14px' }}>  Default File Location : <b>{basicdata?.DefaultFileLocation}</b></label></td>
              <td style={{ width: '300px', padding: '5px 0' }}><label style={{ padding: '5px', fontSize: '14px' }}> Default File Reporting Period : <b>{basicdata?.DefaultFileReportingPeriod}</b></label></td>
              <td style={{ width: '300px', padding: '5px 0' }}><label style={{ padding: '5px', fontSize: '14px' }}> Default File BasedGp :  <b>{basicdata?.DefaultFileBasedGp}</b></label></td>
              <td style={{ width: '300px', padding: '5px 0' }}><label style={{ padding: '5px', fontSize: '14px' }}> PMA Administrative State : <b>{basicdata?.PmaAdministrativeState}</b> </label></td>
            </tr></tbody></table>
          </Paper>
        </div>

        <Table >
          <TableCell style={{ width: "60%", height: "19px", overflowY: "visible" }}>
            <div style={{ color: 'black', backgroundColor: '#c6cbd1', height: '20px' }} ><b>Pee Parameters List</b></div>
            <div style={{ maxHeight: "79px", overflowY: "auto", border: '2px solid #ccc' }}>
              <Table style={{ minWidth: "99%", }} aria-label="PeeParameters table">
                <TableHead sx={{ "& th": { color: '#ffffff', backgroundColor: '#53659c', lineHeight: '0.6', position: "sticky", top: "0", zIndex: '1' } }}>
                  <TableRow sx={{ "& .MuiTableRow-root": { maxHeight: 20 } }}>
                    <TableCell align="center" style={{ width: 120 }}>Site Identification</TableCell>
                    <TableCell align="center" style={{ width: 115 }}>Site Description </TableCell>
                    <TableCell align="center" style={{ width: 130 }}>Environment Type</TableCell>
                    <TableCell align="center" style={{ width: 120 }}>Power Interface</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody style={{ zIndex: '0' }}>
                  {basicdata?.PeerParameterList?.map((row: any) => (
                    <TableRow key={row.id} sx={{ '&:nth-of-type(odd)': { backgroundColor: '#d7ecff' }, '& .MuiTableCell-root': { height: '12px', padding: '0' }, '&:last-child td, &:last-child th': { border: 0 } }} >
                      <CustomTableCell {...{ row, name: "siteIdentification" }} />
                      <CustomTableCell {...{ row, name: "siteDescription" }} />
                      <CustomTableCell {...{ row, name: "environmentType" }} />
                      <CustomTableCell {...{ row, name: "powerInterface" }} />
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TableCell>
          <TableCell style={{ width: "40%", overflowX: "auto" }}>
            <div style={{ color: 'black', backgroundColor: '#c6cbd1', height: '20px' }}><b>PLMN Info</b></div>
            <div style={{ maxHeight: "79px", overflowY: "auto", border: '2px solid #ccc' }}>
              <Table style={{ minWidth: "99%" }} aria-label="PLMN table">
                <TableHead sx={{ "& th": { color: '#ffffff', backgroundColor: '#53659c', lineHeight: '0.6', position: "sticky", top: "0", zIndex: '1' } }}>
                  <TableRow sx={{ "& .MuiTableRow-root": { maxHeight: 18 } }}>
                    <TableCell align="center" color="white" style={{ width: 100 }}>Name</TableCell>
                    <TableCell align="center" color="white" >MCC</TableCell>
                    <TableCell align="center" color="white" >MNC </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody style={{ zIndex: '0' }}>
                  {basicdata?.PLMNInfo?.map((row: any) => (
                    <TableRow key={row.id} sx={{ '&:nth-of-type(odd)': { backgroundColor: '#d7ecff' }, '& .MuiTableCell-root': { height: '12px', padding: '0' }, '&:last-child td, &:last-child th': { border: 0 } }}>
                      <CustomTableCell {...{ row, name: "Name" }} />
                      <CustomTableCell {...{ row, name: "MCC" }} />
                      <CustomTableCell {...{ row, name: "MNC" }} />
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TableCell>
        </Table>
        <Table>
          <TableCell style={{ width: "60%", overflowX: "auto" }}>
            <div style={{ color: 'black', backgroundColor: '#c6cbd1', height: '20px' }} ><b> RRM Policy List</b></div>
            <div style={{ maxHeight: "79px", overflowY: "auto", border: '2px solid #ccc' }}>
              <Table style={{ minWidth: "99%" }} aria-label="RRM Policy List table">
                <TableHead sx={{ "& th": { color: '#ffffff', backgroundColor: '#53659c', lineHeight: '0.6', position: "sticky", top: "0", zIndex: '1' } }}>
                  <TableRow sx={{ "& .MuiTableRow-root": { maxHeight: 18 } }}>
                    <TableCell align="center">Name</TableCell>
                    <TableCell align="center">PLMN Info</TableCell>
                    <TableCell align="center">SNSSAI </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody style={{ zIndex: '0' }}>
                  {basicdata?.RRMPolicyList?.map((row: any) => (
                    <TableRow key={row.id} sx={{ '&:nth-of-type(odd)': { backgroundColor: '#d7ecff' }, '& .MuiTableCell-root': { height: '12px', padding: '0' }, '&:last-child td, &:last-child th': { border: 0 } }}>
                      <CustomTableCell {...{ row, name: "Name" }} />
                      <CustomTableCell {...{ row, name: "PLMNInfo" }} />
                      <CustomTableCell {...{ row, name: "SNSSAI" }} />
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TableCell>
          <TableCell style={{ width: "39.5%", overflowX: "auto" }}>
            <div style={{ color: 'black', backgroundColor: '#c6cbd1', height: '20px' }} ><b>Cell LocalId</b></div>
            <div style={{ maxHeight: "79px", overflowY: "auto", border: '2px solid #ccc' }}>
              <Table style={{ minWidth: "99%" }} aria-label="Cell LocalId table">
                <TableHead sx={{ "& th": { color: '#ffffff', backgroundColor: '#53659c', lineHeight: '0.6', position: "sticky", top: "0", zIndex: '1' } }}>
                  <TableRow sx={{ "& .MuiTableRow-root": { maxHeight: 18 } }}>
                    <TableCell align="center">Cell Local Id</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody style={{ zIndex: '0' }}>
                  {basicdata?.CellLocalId?.map((row: any) => (
                    <TableRow key={row.id} sx={{ '&:nth-of-type(odd)': { backgroundColor: '#d7ecff' }, '& .MuiTableCell-root': { height: '12px', padding: '0' }, '&:last-child td, &:last-child th': { border: 0 } }}>
                      <CustomTableCell {...{ row, name: "CellLocalId" }} />
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TableCell>
        </Table>
      </div>


      <Paper style={{ color: '#ffffff', backgroundColor: '#55679d', width: "99%", verticalAlign: 'middle', height: '30px', marginTop: '2px', marginLeft: '4px', border: '2px solid #ccc', cursor: 'pointer' }}
        onClick={(e) => {
          e.stopPropagation();
          toggleIsExpandedCellConfig();
        }}>
        <label style={{ paddingTop: '7px', fontWeight: 'bold', verticalAlign: 'middle', display: 'table-cell' }}>Cell Config</label>
        <IconButton style={{ marginLeft: '95%', marginTop: '-3.2%', border: '3px solid #ccc', height: '25px', width: '25px' }}>
          {isCellExpanded ? <ArrowDropDownRoundedIcon className="expnd_icon" /> : < ArrowDropUpRoundedIcon className="expnd_icon" />}
        </IconButton>
      </Paper>
      <div className='collapse' style={{ height: isCellExpanded ? 'auto' : '0px', width: '99%', border: '2px solid #ccc', backgroundColor: '#ffffff', marginLeft: '4px' }}>
        {cellConfigdata?.map((row: any) => (
          <div>
            <Paper style={{ color: '#55679d', backgroundColor: '#d7ecff', width: "99%", verticalAlign: 'middle', height: '25px', marginTop: '1px', border: '2px solid #ccc', marginLeft: '2px', cursor: 'pointer' }} onClick={() => toggleIsChildExpandedCellConfig(row)}>
              <label style={{ paddingTop: '6px', paddingLeft: '2px', fontWeight: 'bold', verticalAlign: 'middle', display: 'table-cell' }}>{row?.cellId}</label>
              <IconButton style={{ marginLeft: '95%', marginTop: '-3.8%', border: '3px solid #55679d', height: '20px', width: '20px' }} >
                {expandedRowId == row.cellId ? <ArrowDropDownRoundedIcon className="expnd_child_icon" /> : < ArrowDropUpRoundedIcon className="expnd_child_icon" />}
              </IconButton>
            </Paper>
            {expandedRowId === row.cellId && (
              <div className='collapse' id={row.cellId} style={{ height: '250px', width: '99%', border: '2px solid #ccc', backgroundColor: '#ffffff' }}>

                <div style={{ display: 'flex', flexDirection: 'row', marginTop: '6px', height: '25px' }}>
                  {/*<div style={{ border: '1px solid #c6cbd1', borderRadius: '3px', margin: '0.5%', padding: '1%', flexDirection: 'row', display: 'flex' }}>*/}

                  <div style={{ display: 'flex', justifyContent: 'flex-start', margin: '6px' }}>
                    {/* {[0, 1, 2, 3, 4, 5].map((index) => ( */}
                    {Array.from({ length: CellConfigMaxPage + 1 }, (_, index) => (
                      <Tooltip title={tooltipTitles[index]}>
                        <Button key={index}
                          className={`${classes.navButton} ${cellConfigCurrentPage === index ? classes.activeNavButton : ''}`}
                          onClick={() => {setCellConfigCurrentPage(index), setcCurrentRRHListdata(row.RRHList[0])}}
                        >
                          &nbsp;
                        </Button>
                      </Tooltip>
                    ))}
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'right', marginTop: '6px', marginLeft: '53%', marginBottom: '6px', marginRight: '6px' }}>
                    <IconButton onClick={handlePrevious} disabled={cellConfigCurrentPage === 0} style={{ height: '20px', width: '20px', color: '#ffffff', backgroundColor: '#55679d' }}><ArrowLeftRounded /> </IconButton>
                    <Button variant="contained" color="primary" onClick={handlePrevious} disabled={cellConfigCurrentPage === 0}
                      style={{
                        width: '120px', marginRight: '2%', height: '20px', padding: '10px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#55679d', fontSize: '10px'
                      }}> Previous Cell  </Button>
                    <Button variant="contained" color="primary" onClick={handleNext} disabled={cellConfigCurrentPage === CellConfigMaxPage}
                      style={{
                        width: '120px', height: '20px', padding: '10px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#55679d', fontSize: '10px'
                      }}> Next Cell  </Button>

                    <IconButton onClick={handleNext} disabled={cellConfigCurrentPage === CellConfigMaxPage} style={{ height: '20px', width: '20px', color: '#ffffff', backgroundColor: '#55679d', marginRight: '2%' }}><ArrowRightRounded /> </IconButton>
                  </div>
                </div>

                {cellConfigCurrentPage === 0 && (
                  <div style={{ border: '1px solid #c6cbd1', borderRadius: '3px', margin: '0.5%', padding: '1%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <Card style={{ backgroundColor: '#c6cbd1', height: '25px' }}>
                      <CardContent>
                        <b style={{ fontSize: '14px', marginBottom: '10px', position: 'relative', top: '-12px' }}>General Configuration</b>
                      </CardContent>
                    </Card>
                    <Paper elevation={2} style={{ padding: '1px' }}>
                      <table><tbody><tr>
                        <td style={{ width: '300px', padding: '5px 0' }}><label style={{ padding: '5px', fontSize: '14px' }}>Pee Parameters : <b style={{ fontSize: '14px' }}>{row?.peeParameters} </b> </label></td>
                        <td style={{ width: '300px', padding: '5px 0' }}><label style={{ padding: '5px', fontSize: '14px' }}>Priority Label : <b style={{ fontSize: '14px' }}>{row?.PriorityLabel} </b> </label></td>
                      </tr></tbody></table>
                    </Paper>
                  </div>
                )}
                {cellConfigCurrentPage === 1 && (
                  <div style={{ border: '1px solid #c6cbd1', borderRadius: '3px', margin: '0.5%', padding: '1%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <Card style={{ backgroundColor: '#c6cbd1', height: '25px' }}>
                      <CardContent>
                        <b style={{ fontSize: '14px', marginBottom: '10px', position: 'relative', top: '-12px' }}>DU Cell Parameter</b>
                      </CardContent>
                    </Card>
                    <Paper elevation={2} style={{ padding: '1px' }}>
                      <table><tbody><tr>
                        <td style={{ width: '300px', padding: '5px 0' }}><label style={{ padding: '5px', fontSize: '14px' }}>ArfcnDL : <b style={{ fontSize: '14px' }}>{row?.arfcnDL} </b> </label></td>
                        <td style={{ width: '300px', padding: '5px 0' }}><label style={{ padding: '5px', fontSize: '14px' }}>ArfcnUL : <b style={{ fontSize: '14px' }}>{row?.arfcnUL} </b></label></td>
                        <td style={{ width: '300px', padding: '5px 0' }}><label style={{ padding: '5px', fontSize: '14px' }}>ArfcnSUL : <b style={{ fontSize: '14px' }}>{row?.arfcnSUL} </b> </label></td>
                        <td style={{ width: '300px', padding: '5px 0' }}><label style={{ padding: '5px', fontSize: '14px' }}>BsChannelBwDL : <b style={{ fontSize: '14px' }}>{row?.bsChannelBwDL} </b> </label></td>

                      </tr>
                        <tr>
                        <td style={{ width: '300px', padding: '5px 0' }}><label style={{ padding: '5px', fontSize: '14px' }}>BsChannelBwUL : <b style={{ fontSize: '14px' }}>{row?.bsChannelBwUL} </b> </label></td>
                          <td style={{ width: '300px', padding: '5px 0' }}><label style={{ padding: '5px', fontSize: '14px' }}>SsbPeriodicity : <b style={{ fontSize: '14px' }}>{row?.ssbPeriodicity} </b> </label></td>
                          <td style={{ width: '300px', padding: '5px 0' }}><label style={{ padding: '5px', fontSize: '14px' }}>Ssb Ofset : <b style={{ fontSize: '14px' }}>{row?.ssbOfset} </b> </label></td>
                          <td style={{ width: '300px', padding: '5px 0' }}><label style={{ padding: '5px', fontSize: '14px' }}>Ssb Duration : <b style={{ fontSize: '14px' }}>{row?.ssbDuration} </b> </label></td>
                          
                        </tr>
                        <tr>
                        <td style={{ width: '300px', padding: '5px 0' }}><label style={{ padding: '5px', fontSize: '14px' }}>Ssb Frequency : <b style={{ fontSize: '14px' }}>{row?.ssbFrequency} </b> </label></td>
                          <td style={{ width: '300px', padding: '5px 0' }}><label style={{ padding: '5px', fontSize: '14px' }}>Ssb SubCarrier Spacing : <b style={{ fontSize: '14px' }}>{row?.ssbSubCarrierSpacing} </b> </label></td>
                        </tr></tbody></table>
                    </Paper>
                  </div>
                )}
                {cellConfigCurrentPage === 2 && (
                  <div style={{ border: '1px solid #c6cbd1', borderRadius: '3px', margin: '0.5%', padding: '1%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <Card style={{ backgroundColor: '#c6cbd1', height: '25px' }}>
                      <CardContent>
                        <b style={{ fontSize: '14px', marginBottom: '10px', position: 'relative', top: '-12px' }}>CU Cell Parameter</b>
                      </CardContent>
                    </Card>
                    <Paper elevation={2} style={{ padding: '1px' }}>
                      <table><tbody><tr>
                        <td style={{ width: '300px', padding: '5px 0' }}><label style={{ padding: '5px', fontSize: '14px' }}>RsrpOffsetSSB : <b style={{ fontSize: '14px' }}>{row?.rsrpOffsetSSB} </b> </label></td>
                        <td style={{ width: '300px', padding: '5px 0' }}><label style={{ padding: '5px', fontSize: '14px' }}>SinrOffsetSSB : <b style={{ fontSize: '14px' }}>{row?.sinrOffsetSSB} </b> </label></td>
                        <td style={{ width: '300px', padding: '5px 0' }}><label style={{ padding: '5px', fontSize: '14px' }}>RsrqOffsetSSB : <b style={{ fontSize: '14px' }}>{row?.rsrqOffsetSSB} </b> </label></td> 
                        <td style={{ width: '300px', padding: '5px 0' }}><label style={{ padding: '5px', fontSize: '14px' }}>RsrpOffsetCsiRs : <b style={{ fontSize: '14px' }}>{row?.rsrpOffsetCsiRs} </b> </label></td>
                        <td style={{ width: '300px', padding: '5px 0' }}><label style={{ padding: '5px', fontSize: '14px' }}>RsrqOffsetCsiRs : <b style={{ fontSize: '14px' }}>{row?.rsrqOffsetCsiRs} </b> </label></td>
                      </tr>
                        <tr>
                          <td style={{ width: '300px', padding: '5px 0' }}><label style={{ padding: '5px', fontSize: '14px' }}>SinrOffsetCsiRs : <b style={{ fontSize: '14px' }}>{row?.sinrOffsetCsiRs} </b> </label></td>
                        </tr></tbody></table>
                    </Paper>
                  </div>
                )}
                {cellConfigCurrentPage === 3 && (
                  <div style={{ border: '1px solid #c6cbd1', borderRadius: '3px', margin: '0.5%', padding: '1%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <Card style={{ backgroundColor: '#c6cbd1', height: '25px' }}>
                      <CardContent>
                        <b style={{ fontSize: '14px', marginBottom: '10px', position: 'relative', top: '-12px' }}>Cell Reselection</b>
                      </CardContent>
                    </Card>
                    <Paper elevation={2} style={{ padding: '1px' }}>
                      <table><tbody>
                        <tr>
                          <td style={{ width: '300px', padding: '5px 0' }}><label style={{ padding: '5px', fontSize: '14px' }}>CellReselectionPriority : <b style={{ fontSize: '14px' }}>{row?.CellReselectionPriority} </b> </label></td>
                          <td style={{ width: '300px', padding: '5px 0' }}><label style={{ padding: '5px', fontSize: '14px' }}>CellReselectionSubPriority : <b style={{ fontSize: '14px' }}>{row?.CellReselectionSubPriority} </b> </label></td>
                          <td style={{ width: '300px', padding: '5px 0' }}><label style={{ padding: '5px', fontSize: '14px' }}>PMax : <b style={{ fontSize: '14px' }}>{row?.pMax} </b> </label></td>
                          <td style={{ width: '300px', padding: '5px 0' }}><label style={{ padding: '5px', fontSize: '14px' }}>QOffsetFrequency : <b style={{ fontSize: '14px' }}>{row?.qOffsetFrequency} </b> </label></td>                          
                        </tr>
                        <tr>
                           <td style={{ width: '300px', padding: '5px 0' }}><label style={{ padding: '5px', fontSize: '14px' }}>QQualMin : <b style={{ fontSize: '14px' }}>{row?.qQualMin} </b> </label></td>
                          <td style={{ width: '300px', padding: '5px 0' }}><label style={{ padding: '5px', fontSize: '14px' }}>QRxLevMin : <b style={{ fontSize: '14px' }}>{row?.qRxLevMin} </b> </label></td>
                          <td style={{ width: '300px', padding: '5px 0' }}><label style={{ padding: '5px', fontSize: '14px' }}>ThreshXHighPe : <b style={{ fontSize: '14px' }}>{row?.threshXHighP} </b> </label></td>
                          <td style={{ width: '300px', padding: '5px 0' }}><label style={{ padding: '5px', fontSize: '14px' }}>ThreshXHighQ : <b style={{ fontSize: '14px' }}>{row?.threshXHighQ} </b> </label></td>                           
                        </tr>
                        <tr>
                          <td style={{ width: '300px', padding: '5px 0' }}><label style={{ padding: '5px', fontSize: '14px' }}>ThreshXLowP : <b style={{ fontSize: '14px' }}>{row?.threshXLowP} </b> </label></td>
                          <td style={{ width: '300px', padding: '5px 0' }}><label style={{ padding: '5px', fontSize: '14px' }}>ThreshXLowQ : <b style={{ fontSize: '14px' }}>{row?.threshXLowQ} </b> </label> </td>
                          <td style={{ width: '300px', padding: '5px 0' }}><label style={{ padding: '5px', fontSize: '14px' }}>TReselectionNR : <b style={{ fontSize: '14px' }}>{row?.tReselectionNR} </b> </label></td>
                          <td style={{ width: '300px', padding: '5px 0' }}><label style={{ padding: '5px', fontSize: '14px' }}>TReselectionNRSfHigh : <b style={{ fontSize: '14px' }}>{row?.tReselectionNRSfHigh} </b> </label></td>                          
                        </tr>
                        <tr>
                        <td style={{ width: '300px', padding: '5px 0' }}><label style={{ padding: '5px', fontSize: '14px' }}>TReselectionNRSfMedium : <b style={{ fontSize: '14px' }}>{row?.tReselectionNRSfMedium} </b> </label></td>
                          <td style={{ width: '300px', padding: '5px 0' }}><label style={{ padding: '5px', fontSize: '14px' }}>NRFrequencyref : <b style={{ fontSize: '14px' }}>{row?.nRFrequencyref} </b> </label></td>
                        </tr>
                      </tbody></table>
                    </Paper>
                  </div>
                )}
                {cellConfigCurrentPage === 4 && row?.RRHList &&(
                  <div>
                    <div style={{ display: 'flex', flexDirection: 'row', marginTop: '6px', marginBottom: '1%', height: '25px' }} >

                      <div style={{ display: 'flex', flexDirection: 'row', marginTop: '6px', marginBottom: '1%', height: '25px' }} >
                        {
                          row?.RRHList?.map((item: any, index) => (
                            <div style={{ display: 'flex', justifyContent: 'flex-start', margin: '6px' }}>
                              <Tooltip title={"RRH Instance_" + item.id}>
                                <Button  style={{ width: '89px'}} key={index}
                                  className={`${classes.navButton1} ${cellConfigCurrentPage === index ? classes.activeNavButton : ''}`}
                                  onClick={() => {
                                    setcCurrentRRHListdata(item)
                                    console.log("item", item)
                                  }
                                  }>
                                  &nbsp;
                                  <span style={{ fontSize: '9px', color: '#55679d' }}>
                                    {"RRH Instance_" + item.id}
                                  </span>
                                </Button>
                              </Tooltip>
                            </div>
                          ))
                        }
                      </div>
                    </div>
                    <div>
                      { row?.RRHList && row?.RRHList.length > 0  &&(
                      <Card >
                        <CardContent>
                          <Paper elevation={2} style={{ padding: '10px' }}>
                            <table>
                              <tbody>
                                <tr >
                                  <td colSpan={6} style={{ backgroundColor: '#c6cbd1', padding: '5px', textAlign: 'left' }}>
                                    <b style={{ fontSize: '13px' }}>RRH Information</b>
                                  </td>
                                </tr>
                                <tr>
                                  {/* <td style={{ width: '500px', padding: '5px 0' }}><label style={{ padding: '5px', fontSize: '13px' }}>RRHModel : <b style={{ fontSize: '13px' }}>{CurrentRRHListdata?.mimoMode} </b> </label></td> */}
                                  <td style={{ width: '300px', padding: '5px 0' }}><label style={{ padding: '5px', fontSize: '13px' }}>MIMO Mode : <b style={{ fontSize: '13px' }}>{CurrentRRHListdata?.mimoMode} </b> </label></td>
                                  <td style={{ width: '300px', padding: '5px 0' }}><label style={{ padding: '5px', fontSize: '13px' }}>AntennaType : <b style={{ fontSize: '13px' }}>{CurrentRRHListdata?.antennaType} </b> </label></td>
                                  <td style={{ width: '300px', padding: '5px 0' }}><label style={{ padding: '5px', fontSize: '13px' }}>Ret Enabled : <b style={{ fontSize: '13px' }}>{CurrentRRHListdata?.isRetEnabled.toString()}</b> </label></td>
                                  <td style={{ width: '300px', padding: '5px 0' }}><label style={{ padding: '5px', fontSize: '13px' }}>cpriRate : <b style={{ fontSize: '13px' }}>{CurrentRRHListdata?.cpriRate} </b> </label></td>
                                </tr>
                                <tr>
                                  <td style={{ width: '300px', padding: '5px 0' }}><label style={{ padding: '5px', fontSize: '13px' }}>RRHDate : <b style={{ fontSize: '13px' }}>{CurrentRRHListdata?.setRRHDate.toString()} </b> </label></td>
                                  <td style={{ width: '300px', padding: '5px 0' }}><label style={{ padding: '5px', fontSize: '13px' }}>DuplexMode : <b style={{ fontSize: '13px' }}>{CurrentRRHListdata?.duplexMode} </b> </label></td>
                                  <td style={{ width: '300px', padding: '5px 0' }}><label style={{ padding: '5px', fontSize: '13px' }}>DlEarfcn : <b style={{ fontSize: '13px' }}>{CurrentRRHListdata?.dlEarfcn} </b> </label></td>
                                  <td style={{ width: '300px', padding: '5px 0' }}><label style={{ padding: '5px', fontSize: '13px' }}>UlEarfcn : <b style={{ fontSize: '13px' }}>{CurrentRRHListdata?.ulEarfcn} </b> </label></td>
                                  <td style={{ width: '300px', padding: '5px 0' }}><label style={{ padding: '5px', fontSize: '13px' }}>Frequency Band : <b style={{ fontSize: '13px' }}>{CurrentRRHListdata?.frequencyBand} </b> </label></td>
                                  <td style={{ width: '300px', padding: '5px 0' }}><label style={{ padding: '5px', fontSize: '13px' }}>Band Width : <b style={{ fontSize: '13px' }}>{CurrentRRHListdata?.bandWidth} </b> </label></td>
                                </tr>
                                <tr style={{ height: '5px' }}>
                                  <td colSpan={6} style={{ backgroundColor: '#c6cbd1', padding: '5px', textAlign: 'left' }}>
                                    <b style={{ fontSize: '13px' }}>Delay Param</b>
                                  </td>
                                </tr>
                                <tr>
                                  <td style={{ width: '300px', padding: '5px 0' }}><label style={{ padding: '5px', fontSize: '13px' }}>TxDelay : <b style={{ fontSize: '13px' }}>{CurrentRRHListdata?.txDelay} </b> </label></td>
                                  <td style={{ width: '300px', padding: '5px 0' }}><label style={{ padding: '5px', fontSize: '13px' }}>RxDelay : <b style={{ fontSize: '13px' }}>{CurrentRRHListdata?.rxDelay} </b> </label></td>
                                </tr>
                                <tr style={{ height: '5px' }}>
                                  <td colSpan={6} style={{ backgroundColor: '#c6cbd1', padding: '5px', textAlign: 'left' }}>
                                    <b style={{ fontSize: '13px' }}>CPRI Loop Back</b>
                                  </td>
                                </tr>
                                <tr>
                                  <td style={{ width: '300px', padding: '5px 0' }}><label style={{ padding: '5px', fontSize: '13px' }}>LoopBack Enabled : <b style={{ fontSize: '13px' }}>{CurrentRRHListdata?.isLoopBackEnabled.toString()} </b> </label></td>
                                  <td style={{ width: '300px', padding: '5px 0' }}><label style={{ padding: '5px', fontSize: '13px' }}>Mode : <b style={{ fontSize: '13px' }}>{CurrentRRHListdata?.mode} </b> </label></td>
                                  <td style={{ width: '300px', padding: '5px 0' }}><label style={{ padding: '5px', fontSize: '13px' }}>Test Time : <b style={{ fontSize: '13px' }}>{CurrentRRHListdata?.testTime} </b> </label></td>
                                </tr>
                                <tr style={{ height: '5px' }}>
                                  <td colSpan={6} style={{ backgroundColor: '#c6cbd1', padding: '5px', textAlign: 'left' }}>
                                    <b style={{ fontSize: '13px' }}>Antenna Configuration</b>
                                  </td>
                                </tr>
                                <tr>
                                  <td style={{ width: '300px', padding: '5px 0' }}><label style={{ padding: '5px', fontSize: '13px' }}>Antenna Id : <b style={{ fontSize: '13px' }}>{CurrentRRHListdata?.antennaId} </b> </label></td>
                                  <td style={{ width: '300px', padding: '5px 0' }}><label style={{ padding: '5px', fontSize: '13px' }}>Antenna Gain : <b style={{ fontSize: '13px' }}>{CurrentRRHListdata?.antennaGain} </b> </label></td>
                                  <td style={{ width: '300px', padding: '5px 0' }}><label style={{ padding: '5px', fontSize: '13px' }}>txPower : <b style={{ fontSize: '13px' }}>{CurrentRRHListdata?.txPower} </b> </label></td>
                                </tr>
                              </tbody>
                            </table>
                          </Paper>
                        </CardContent>
                      </Card>
                      )}
                    </div>
                  </div>
                )}
                {/* {cellConfigCurrentPage === 4 && (
              <div style={{ border: '1px solid #c6cbd1', borderRadius: '3px', margin: '0.5%', padding: '1%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <Card style={{ backgroundColor: '#c6cbd1', height: '25px' }}>
                  <CardContent>
                    <b style={{ fontSize: '14px', marginBottom: '10px', position: 'relative', top: '-12px' }}>RRH Configuration</b>
                  </CardContent>
                </Card>
                <Paper elevation={2} style={{ padding: '1px' }}>
                  <table><tbody>
                    <tr>
                      <td style={{ width: '300px', padding: '5px 0' }}><label style={{ padding: '5px', fontSize: '14px' }}>RRHModel : <b style={{ fontSize: '14px' }}>{row?.RRHModel} </b> </label></td>
                      <td style={{ width: '300px', padding: '5px 0' }}><label style={{ padding: '5px', fontSize: '14px' }}>AntennaType : <b style={{ fontSize: '14px' }}>{row?.AntennaType} </b> </label></td>
                      <td style={{ width: '300px', padding: '5px 0' }}><label style={{ padding: '5px', fontSize: '14px' }}>MIMO Mode : <b style={{ fontSize: '14px' }}>{row?.MIMOMode} </b> </label></td>
                      <td style={{ width: '300px', padding: '5px 0' }}><label style={{ padding: '5px', fontSize: '14px' }}>RET : <b style={{ fontSize: '14px' }}>{row?.ret} </b> </label></td>
                    </tr>
                    <tr>
                      <td style={{ width: '300px', padding: '5px 0' }}><label style={{ padding: '5px', fontSize: '14px' }}>TxDelay : <b style={{ fontSize: '14px' }}>{row?.TxDelay} </b> </label></td>
                      <td style={{ width: '300px', padding: '5px 0' }}><label style={{ padding: '5px', fontSize: '14px' }}>RxDelay : <b style={{ fontSize: '14px' }}>{row?.RxDelay} </b> </label></td>
                    </tr>
                  </tbody></table>
                </Paper>
              </div>
              )}
              {cellConfigCurrentPage === 5 && (
              <div style={{ border: '1px solid #c6cbd1', borderRadius: '3px', margin: '0.5%', padding: '1%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <Card style={{ backgroundColor: '#c6cbd1', height: '25px' }}>
                  <CardContent>
                    <b style={{ fontSize: '14px', marginBottom: '10px', position: 'relative', top: '-12px' }}>RRH Antenna</b>
                  </CardContent>
                </Card>
                <Paper elevation={2} style={{ padding: '1px' }}>
                  <table><tbody>
                    <tr>
                      <td style={{ width: '300px', padding: '5px 0' }}><label style={{ padding: '5px', fontSize: '14px' }}>AntennaPort : <b style={{ fontSize: '14px' }}>{row?.AntennaPort} </b> </label></td>
                      <td style={{ width: '300px', padding: '5px 0' }}><label style={{ padding: '5px', fontSize: '14px' }}>Tilt : <b style={{ fontSize: '14px' }}>{row?.Tilt} </b> </label></td>
                      <td style={{ width: '300px', padding: '5px 0' }}><label style={{ padding: '5px', fontSize: '14px' }}>RXGain : <b style={{ fontSize: '14px' }}>{row?.RXGain} </b> </label></td>
                      <td style={{ width: '300px', padding: '5px 0' }}><label style={{ padding: '5px', fontSize: '14px' }}>TXPower : <b style={{ fontSize: '14px' }}>{row?.TXPower} </b> </label></td>
                    </tr>
                  </tbody></table>
                </Paper>
              </div>
              )} */}

              </div>
            )}
          </div>
        )
        )}
      </div>

      <Paper style={{ color: '#ffffff', backgroundColor: '#55679d', width: "99%", verticalAlign: 'middle', height: '30px', marginTop: '2px', marginLeft: '4px', border: '2px solid #ccc', cursor: 'pointer' }} onClick={toggleIsExpandedCUCPConfig}>
        <label style={{ paddingTop: '7px', fontWeight: 'bold', verticalAlign: 'middle', display: 'table-cell' }}
          onClick={(e) => {
            e.stopPropagation();
            toggleIsExpandedCUCPConfig();
          }} >CUCP Config</label>
        <IconButton style={{ marginLeft: '95%', marginTop: '-3.2%', border: '3px solid #ccc', height: '25px', width: '25px' }}>
          {isCUCPExpanded ? <ArrowDropDownRoundedIcon className="expnd_icon" /> : < ArrowDropUpRoundedIcon className="expnd_icon" />}
        </IconButton>
      </Paper>
      <div className='collapse' style={{ height: isCUCPExpanded ? '300px' : '0px', width: '99%', border: '2px solid #ccc', backgroundColor: '#ffffff', marginLeft: '4px' }}>
        <div style={{ border: '1px solid #c6cbd1', borderRadius: '3px', margin: '0.5%', padding: '1%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
          <Card style={{ backgroundColor: '#c6cbd1', height: '25px' }}>
            <CardContent>
              <b style={{ fontSize: '14px', marginBottom: '10px', position: 'relative', top: '-12px' }}>General Configuration</b>
            </CardContent>
          </Card>
          <Paper elevation={2} style={{ padding: '1px' }}>
            <table><tbody><tr>
              <td style={{ width: '300px', padding: '5px 0' }}><label style={{ padding: '5px', fontSize: '14px' }}> User Label : <b style={{ fontSize: '14px' }}>{cucpdata?.UserLabel}</b></label></td>
              <td style={{ width: '300px', padding: '5px 0' }}><label style={{ padding: '5px', fontSize: '14px' }}> Priority Label : <b style={{ fontSize: '14px' }}>{cucpdata?.PriorityLabel}</b></label></td>
              <td style={{ width: '300px', padding: '5px 0' }}><label style={{ padding: '5px', fontSize: '14px' }}> Resource Type : <b style={{ fontSize: '14px' }}>{cucpdata?.ResourceType}</b></label></td>
              <td style={{ width: '300px', padding: '5px 0' }}><label style={{ padding: '5px', fontSize: '14px' }}>gNB ID : <b style={{ fontSize: '14px' }}>{cucpdata?.gNBId}</b></label></td>
            </tr><tr>
                <td style={{ width: '300px', padding: '5px 0' }}><label style={{ padding: '5px', fontSize: '14px' }}> gNBID Length : <b style={{ fontSize: '14px' }}>{cucpdata?.gNBIDLength}</b></label></td>
                <td style={{ width: '300px', padding: '5px 0' }}><label style={{ padding: '5px', fontSize: '14px' }}> gNB CU Name : <b style={{ fontSize: '14px' }}>{cucpdata?.gNBCUName}</b></label></td>
                <td style={{ width: '300px', padding: '5px 0' }}><label style={{ padding: '5px', fontSize: '14px' }}>  Pee Parameter : <b style={{ fontSize: '14px' }}>{cucpdata?.peeParameters}</b></label></td>
                <td style={{ width: '300px', padding: '5px 0' }}><label style={{ padding: '5px', fontSize: '14px' }}> PLMNID : <b style={{ fontSize: '14px' }}>{cucpdata?.plmnId}</b></label></td>
              </tr><tr>
                <td style={{ width: '300px', padding: '5px 0' }}><label style={{ padding: '5px', fontSize: '14px' }}> RRMPolicy : <b style={{ fontSize: '14px' }}>{cucpdata?.RRMPolicy}</b></label></td>
              </tr></tbody></table>
          </Paper>
        </div>
        <div style={{ border: '1px solid #c6cbd1', borderRadius: '3px', margin: '0.5%', padding: '1%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
          <Card style={{ backgroundColor: '#c6cbd1', height: '25px' }}>
            <CardContent>
              <b style={{ fontSize: '14px', marginBottom: '10px', position: 'relative', top: '-12px' }}>Security Handling</b>
            </CardContent>
          </Card>
          <Paper elevation={2} style={{ padding: '1px' }}>
            <table><tbody><tr>
              <td style={{ width: '300px', padding: '5px 0' }}><label style={{ padding: '5px', fontSize: '14px' }}> Ciphering Algo Prio : <b style={{ fontSize: '14px' }}>{cucpdata?.CipheringAlgoPrio}</b></label></td>
              <td style={{ width: '300px', padding: '5px 0' }}><label style={{ padding: '5px', fontSize: '14px' }}> Integrity Protect Algo Prio : <b style={{ fontSize: '14px' }}>{cucpdata?.IntegrityProtectAlgoPrio}</b></label></td>
            </tr></tbody></table>
          </Paper>
        </div>
        <div style={{ borderBottom: '2px solid #ccc', marginBottom: '5px' }}>
          {/* NR CELL CU List  ....*/}
          <div style={{ width: '100%', height: '250px' }}>
            <></>
            <Table id="tblNRCellDurows" style={{ minWidth: "100%", height: '180px', borderCollapse: 'collapse', tableLayout: 'fixed' }}>
              <TableCell style={{ width: "100%", height: '20px' }}>
                <Paper style={{ width: "99.5%", border: '2px solid #ccc', marginTop: '2px' }}>
                  <div style={{ color: 'black', backgroundColor: '#c6cbd1', height: '20px' }} ><b>NR Cell CU List</b></div>
                  <div style={{ overflow: "auto", height: '150px' }}>
                    <Table style={{ minWidth: "99.5%", }} aria-label="NRCellDuTable">
                      <TableHead sx={{ "& th": { color: '#ffffff', backgroundColor: '#53659c', lineHeight: '0.6', position: "sticky", top: "0", zIndex: '1' } }}>
                        <TableRow sx={{ "& .MuiTableRow-root": { maxHeight: 20 } }}>
                          <TableCell align="center" style={{ width: 130 }}>Priority Label</TableCell>
                          <TableCell align="center" style={{ width: 130 }}>CellLocal ID</TableCell>
                          <TableCell align="center" style={{ width: 130 }}>PLMN List</TableCell>
                          <TableCell align="center" style={{ width: 130 }}>Cell ID</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody style={{ zIndex: '0' }}>
                        {cucpdata?.NRCellCuList?.map(row => (
                          <TableRow key={row.id} sx={{ '&:nth-of-type(odd)': { backgroundColor: '#d7ecff' }, '& .MuiTableCell-root': { height: '12px', padding: '0' }, '&:last-child td, &:last-child th': { border: 0 } }} >
                            <CustomTableCell {...{ row, name: "PriorityLabel" }} />
                            <CustomTableCell {...{ row, name: "CellLocalId" }} />
                            <CustomTableCell {...{ row, name: "PLMNId" }} />
                            <CustomTableCell {...{ row, name: "cellId" }} />
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                    <></>
                  </div>
                </Paper>
              </TableCell>
            </Table>
          </div>
        </div>
        <div>
          <Table >
            <TableCell style={{ width: "60%", height: "20px", overflowY: "visible" }}>
              <Paper style={{ width: "99%", border: '2px solid #ccc', }}>
                <div style={{ color: 'black', backgroundColor: '#c6cbd1', height: '20px' }} ><b>End Point List</b></div>
                <div style={{ maxHeight: "180px", overflowY: "auto" }}>
                  <Table style={{ minWidth: "99%", }} aria-label="EndPoint table">
                    <TableHead sx={{ "& th": { color: '#ffffff', backgroundColor: '#53659c', lineHeight: '0.6', position: "sticky", top: "0", zIndex: '1' } }}>
                      <TableRow sx={{ "& .MuiTableRow-root": { maxHeight: 18 } }}>
                        <TableCell align="center" style={{ width: 120 }}>End Point</TableCell>
                        <TableCell align="center" style={{ width: 115 }}>Local IP Address </TableCell>
                        <TableCell align="center" style={{ width: 130 }}>VLAN Id</TableCell>
                        <TableCell align="center" style={{ width: 120 }}>Remote Ip Address</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody style={{ zIndex: '0' }}>
                      {cucpdata?.EndPointList.map((row: any) => (
                        <TableRow key={row.id} sx={{ '&:nth-of-type(odd)': { backgroundColor: '#d7ecff' }, '& .MuiTableCell-root': { height: '12px', padding: '0' }, '&:last-child td, &:last-child th': { border: 0 } }} >
                          <CustomTableCell {...{ row, name: "EndPoint" }} />
                          <CustomTableCell {...{ row, name: "LocalIPAddress" }} />
                          <CustomTableCell {...{ row, name: "VLANId" }} />
                          <CustomTableCell {...{ row, name: "RemoteIpAddress" }} />
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </Paper>
            </TableCell>
          </Table>
        </div>
      </div>
      <Paper style={{ color: '#ffffff', backgroundColor: '#55679d', width: "99%", verticalAlign: 'middle', height: '30px', marginTop: '2px', marginLeft: '4px', border: '2px solid #ccc', cursor: 'pointer' }} onClick={toggleIsExpandedCUUPConfig}>
        <label style={{ paddingTop: '7px', fontWeight: 'bold', verticalAlign: 'middle', display: 'table-cell' }}
          onClick={(e) => {
            e.stopPropagation();
            toggleIsExpandedCUUPConfig();
          }} >CUUP Config</label>
        <IconButton style={{ marginLeft: '95%', marginTop: '-3.2%', border: '3px solid #ccc', height: '25px', width: '25px' }}>
          {isCUUPExpanded ? <ArrowDropDownRoundedIcon className="expnd_icon" /> : < ArrowDropUpRoundedIcon className="expnd_icon" />}
        </IconButton>
      </Paper>
      <div className='collapse' style={{ height: isCUUPExpanded ? 'auto' : '0px', width: '99%', border: '2px solid #ccc', backgroundColor: '#ffffff', marginLeft: '4px' }}>
        <div style={{ border: '1px solid #c6cbd1', borderRadius: '3px', margin: '0.5%', padding: '1%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
          <Card style={{ backgroundColor: '#c6cbd1', height: '25px' }}>
            <CardContent>
              <b style={{ fontSize: '14px', marginBottom: '10px', position: 'relative', top: '-12px' }}>General Configuration</b>
            </CardContent>
          </Card>
          <Paper elevation={2} style={{ padding: '1px' }}>
            <table><tbody><tr>
              <td style={{ width: '300px', padding: '5px 0' }}><label style={{ padding: '5px', fontSize: '14px' }}> Priority Label : <b style={{ fontSize: '14px' }}>{cuupdata?.PriorityLabel}</b></label></td>
              <td style={{ width: '300px', padding: '5px 0' }}><label style={{ padding: '5px', fontSize: '14px' }}>  gNB ID : <b style={{ fontSize: '14px' }}>{cuupdata?.gNBId}</b></label></td>
              <td style={{ width: '300px', padding: '5px 0' }}><label style={{ padding: '5px', fontSize: '14px' }}>  Resource Type : <b style={{ fontSize: '14px' }}>{cuupdata?.ResourceType}</b></label></td>
              <td style={{ width: '300px', padding: '5px 0' }}><label style={{ padding: '5px', fontSize: '14px' }}>  RRM Policy : <b style={{ fontSize: '14px' }}>{cuupdata?.RRMPolicy}</b></label></td>
            </tr></tbody></table>
          </Paper>
        </div>
        <div>
          <Table>
            <TableCell style={{ width: "60%", height: "20px", overflowY: "visible" }}>
              <div style={{ color: 'black', backgroundColor: '#c6cbd1', height: '20px' }} ><b>End Point List</b></div>
              <Table style={{ minWidth: "99%", }} aria-label="EndPoint table">
                <TableHead sx={{ "& th": { color: '#ffffff', backgroundColor: '#53659c', lineHeight: '.6', position: "sticky", top: "0", zIndex: '1' } }}>
                  <TableRow sx={{ "& .MuiTableRow-root": { maxHeight: 20 } }}>
                    <TableCell align="center" style={{ width: 120 }}>EndPoint</TableCell>
                    <TableCell align="center" style={{ width: 115 }}>LocalIPAddress </TableCell>
                    <TableCell align="center" style={{ width: 130 }}>VLANId</TableCell>
                    <TableCell align="center" style={{ width: 120 }}>RemoteIpAddress</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody style={{ zIndex: '0' }}>
                  {cuupdata?.EndPointList?.map((row: any) => (
                    <TableRow key={row.id} sx={{ '&:nth-of-type(odd)': { backgroundColor: '#d7ecff' }, '& .MuiTableCell-root': { height: '12px', padding: '0' }, '&:last-child td, &:last-child th': { border: 0 } }} >
                      <CustomTableCell {...{ row, name: "EndPoint" }} />
                      <CustomTableCell {...{ row, name: "LocalIPAddress" }} />
                      <CustomTableCell {...{ row, name: "VLANId" }} />
                      <CustomTableCell {...{ row, name: "RemoteIpAddress" }} />
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableCell>
          </Table>
        </div>
      </div>
      <Paper style={{ color: '#ffffff', backgroundColor: '#55679d', width: "99%", verticalAlign: 'middle', height: '30px', marginTop: '2px', marginLeft: '4px', border: '2px solid #ccc', cursor: 'pointer' }}
        onClick={(e) => {
          e.stopPropagation();
          toggleIsExpandedDUConfig();
        }} >
        <label style={{ paddingTop: '7px', fontWeight: 'bold', verticalAlign: 'middle', display: 'table-cell' }}>DU Config</label>
        <IconButton style={{ marginLeft: '95%', marginTop: '-3.2%', border: '3px solid #ccc', height: '25px', width: '25px' }}>
          {isDUExpanded ? <ArrowDropDownRoundedIcon className="expnd_icon" /> : < ArrowDropUpRoundedIcon className="expnd_icon" />}
        </IconButton>
      </Paper>
      <div className='collapse' style={{ height: isDUExpanded ? 'auto' : '0px', width: '99%', border: '2px solid #ccc', backgroundColor: '#ffffff', marginLeft: '4px' }}>
        {dudata?.map((row: any) => (
          <div>
            <Paper style={{ color: '#55679d', backgroundColor: '#d7ecff', width: "99%", verticalAlign: 'middle', height: '25px', marginTop: '1px', border: '2px solid #ccc', marginLeft: '2px', cursor: 'pointer' }} onClick={() => toggleIsChildExpandedDuConfig(row)}>
              <label style={{ paddingTop: '6px', paddingLeft: '2px', fontWeight: 'bold', verticalAlign: 'middle', display: 'table-cell' }}>{row?.Duid}</label>
              <IconButton style={{ marginLeft: '95%', marginTop: '-3.8%', border: '3px solid #55679d', height: '20px', width: '20px' }} >
                {expandedDuRowId == row.Duid ? <ArrowDropDownRoundedIcon className="expnd_child_icon" /> : < ArrowDropUpRoundedIcon className="expnd_child_icon" />}
              </IconButton>
            </Paper>
            {expandedDuRowId === row.Duid && (
              <div className='collapse' id={row?.Duid} style={{ height: '260px', width: '99%', border: '2px solid #ccc', backgroundColor: '#ffffff' }}>
                <div style={{ display: 'flex', flexDirection: 'row', marginTop: '6px', height: '25px' }}>
                  <div style={{ display: 'flex', justifyContent: 'flex-start', margin: '6px' }}>
                    {Array.from({ length: DuConfigMaxPage + 1 }, (_, index) => (
                      <Tooltip title={DUtooltipTitles[index]}>
                        <Button key={index}
                          className={`${classes.navButton} ${duConfigCurrentPage === index ? classes.activeNavButton : ''}`}
                          onClick={() => setDuConfigCurrentPage(index)}
                        >
                          &nbsp;
                        </Button>
                      </Tooltip>
                    ))}
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'right', marginTop: '6px', marginLeft: '3%', marginBottom: '6px', marginRight: '6px' }}>
                    <IconButton onClick={handlePrevious} disabled={duConfigCurrentPage === 0} style={{ height: '20px', width: '20px', color: '#ffffff', backgroundColor: '#55679d', }}><ArrowLeftRounded /> </IconButton>
                    <Button variant="contained" color="primary" onClick={handlePrevious} disabled={duConfigCurrentPage === 0}
                      style={{
                        width: '120px', marginRight: '2%', height: '20px', padding: '10px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#55679d', fontSize: '10px'
                      }}> Previous Cell  </Button>
                    <Button variant="contained" color="primary" onClick={handleNext} disabled={duConfigCurrentPage === DuConfigMaxPage}
                      style={{
                        width: '120px', height: '20px', padding: '10px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#55679d', fontSize: '10px'
                      }}> Next Cell  </Button>
                    <IconButton onClick={handleNext} disabled={duConfigCurrentPage === DuConfigMaxPage} style={{ height: '20px', width: '20px', color: '#ffffff', backgroundColor: '#55679d', }}><ArrowRightRounded /> </IconButton>
                  </div>
                </div>
                {duConfigCurrentPage === 0 && (
                  <div style={{ border: '1px solid #c6cbd1', borderRadius: '3px', margin: '0.5%', padding: '1%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <Card style={{ backgroundColor: '#c6cbd1', height: '25px' }}>
                      <CardContent>
                        <b style={{ fontSize: '14px', marginBottom: '10px', position: 'relative', top: '-12px' }}>General Configuration</b>
                      </CardContent>
                    </Card>
                    <Paper elevation={2} style={{ padding: '1px' }}>
                      <table><tbody><tr>
                        <td style={{ width: '300px', padding: '5px 0' }}><label style={{ padding: '5px', fontSize: '14px' }}>  User Label : <b style={{ fontSize: '14px' }}>{row?.userLabel}</b></label></td>
                        <td style={{ width: '300px', padding: '5px 0' }}><label style={{ padding: '5px', fontSize: '14px' }}>  gNBDU Id : <b style={{ fontSize: '14px' }}>{row?.gNBDUId}</b></label></td>
                        <td style={{ width: '300px', padding: '5px 0' }}><label style={{ padding: '5px', fontSize: '14px' }}>  gNBId Length : <b style={{ fontSize: '14px' }}>{row?.gNBIdLength}</b></label></td>
                        <td style={{ width: '300px', padding: '5px 0' }}><label style={{ padding: '5px', fontSize: '14px' }}>  PeeParameters List : <b style={{ fontSize: '14px' }}>{row?.peeParameters}</b></label></td>
                      </tr><tr>
                          <td style={{ width: '300px', padding: '5px 0' }}><label style={{ padding: '5px', fontSize: '14px' }}> RRM Policy  : <b style={{ fontSize: '14px' }}>{row?.rrmPolicyList}</b></label></td>
                          <td style={{ width: '300px', padding: '5px 0' }}><label style={{ padding: '5px', fontSize: '14px' }}>  Resource Type : <b style={{ fontSize: '14px' }}>{row?.resourceType}</b></label></td>
                          <td style={{ width: '300px', padding: '5px 0' }}><label style={{ padding: '5px', fontSize: '14px' }}>  Priority Label : <b style={{ fontSize: '14px' }}>{row?.priorityLabel}</b></label></td>
                        </tr></tbody></table>
                    </Paper>
                  </div>
                )}
                {/* 1. Sector Configuration List Table */}
                {/* {duConfigCurrentPage === 1 && (
                  <div>
                    <Table >
                      <TableCell style={{ width: "60%", height: "20px", overflowY: "visible" }}>
                        <Paper style={{ width: "99%", border: '2px solid #ccc', }}>
                          <div style={{ color: 'black', backgroundColor: '#c6cbd1', height: '20px' }} ><b>Sector Configuration List</b></div>
                          <div style={{ maxHeight: "180px", overflowY: "auto" }}>
                            <Table style={{ minWidth: "99%", }} aria-label="SectorConfigurationTable">
                              <TableHead sx={{ "& th": { color: '#ffffff', backgroundColor: '#53659c', lineHeight: '1.1', position: "sticky", top: "0", zIndex: '1' } }}>
                                <TableRow sx={{ "& .MuiTableRow-root": { maxHeight: 20 } }}>
                                  <TableCell align="center" style={{ width: 115 }}>Priority Label</TableCell>
                                  <TableCell align="center" style={{ width: 115 }}>Tx Direction </TableCell>
                                  <TableCell align="center" style={{ width: 115 }}>Config Max Tx Power</TableCell>
                                  <TableCell align="center" style={{ width: 115 }}>Arfcn DL</TableCell>
                                  <TableCell align="center" style={{ width: 115 }}>Arfcn UL </TableCell>
                                  <TableCell align="center" style={{ width: 115 }}>BS Channel BwDl</TableCell>
                                  <TableCell align="center" style={{ width: 115 }}>BS Channel BwUl</TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody style={{ zIndex: '0' }}>
                                {row?.SectorconfigurationDataList?.map((row: any) => (
                                  <TableRow key={row.id} sx={{ '&:nth-of-type(odd)': { backgroundColor: '#d7ecff' }, '& .MuiTableCell-root': { height: '12px', padding: '0' }, '&:last-child td, &:last-child th': { border: 0 } }} >
                                    <CustomTableCell {...{ row, name: "PriorityLabel" }} />
                                    <CustomTableCell {...{ row, name: "tXDirection" }} />
                                    <CustomTableCell {...{ row, name: "ConfigMaxTxPower" }} />
                                    <CustomTableCell {...{ row, name: "arfcnDL" }} />
                                    <CustomTableCell {...{ row, name: "arfcnUL" }} />
                                    <CustomTableCell {...{ row, name: "bSChannelBwDl" }} />
                                    <CustomTableCell {...{ row, name: "bSChannelBwUl" }} />
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </div>
                        </Paper>
                      </TableCell>
                    </Table>
                  </div>
                )} */}
                {/* 2. Managed NF service List Table */}
                {duConfigCurrentPage === 1 && (
                  <div>
                    <Table >
                      <TableCell style={{ width: "60%", height: "20px", overflowY: "visible" }}>
                        <Paper style={{ width: "99%", border: '2px solid #ccc', }}>
                          <div style={{ color: 'black', backgroundColor: '#c6cbd1', height: '20px' }} ><b>Managed NF Service List</b></div>
                          <div style={{ maxHeight: "180px", overflowY: "auto" }}>
                            <Table style={{ minWidth: "99%", }} aria-label="ManagedNFServiceTable">
                              <TableHead sx={{ "& th": { color: '#ffffff', backgroundColor: '#53659c', lineHeight: '1.1', position: "sticky", top: "0", zIndex: '1' } }}>
                                <TableRow sx={{ "& .MuiTableRow-root": { maxHeight: 18 } }}>
                                  <TableCell align="center" style={{ width: 115 }}>Administrative State</TableCell>
                                  <TableCell align="center" style={{ width: 115 }}>Sap Host </TableCell>
                                  <TableCell align="center" style={{ width: 115 }}>Sap Port </TableCell>
                                  <TableCell align="center" style={{ width: 115 }}>Operations Name</TableCell>
                                  <TableCell align="center" style={{ width: 115 }}>Operations Allowed</TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody style={{ zIndex: '0' }}>
                                {row?.ManagedNFServiceList?.map((row: any) => (
                                  <TableRow key={row?.id} sx={{ '&:nth-of-type(odd)': { backgroundColor: '#d7ecff' }, '& .MuiTableCell-root': { height: '12px', padding: '0' }, '&:last-child td, &:last-child th': { border: 0 } }} >
                                    <CustomTableCell {...{ row, name: "AdministrativeState" }} />
                                    <CustomTableCell {...{ row, name: "saphost" }} />
                                    <CustomTableCell {...{ row, name: "sapport" }} />
                                    <CustomTableCell {...{ row, name: "operationsName" }} />
                                    <CustomTableCell {...{ row, name: "operationsAllowed" }} />
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </div>
                        </Paper>
                      </TableCell>
                    </Table>
                  </div>
                )}
                {/* 3. End Point List Table */}
                {duConfigCurrentPage === 2 && (
                  <div>
                    <Table >
                      <TableCell style={{ width: "60%", height: "20px", overflowY: "visible" }}>
                        <Paper style={{ width: "99%", border: '2px solid #ccc', }}>
                          <div style={{ color: 'black', backgroundColor: '#c6cbd1', height: '20px' }} ><b>End Point List</b></div>
                          <div style={{ maxHeight: "180px", overflowY: "auto" }}>
                            <Table style={{ minWidth: "99%", }} aria-label="EndPointTable">
                              <TableHead sx={{ "& th": { color: '#ffffff', backgroundColor: '#53659c', lineHeight: '0.6', position: "sticky", top: "0", zIndex: '1' } }}>
                                <TableRow sx={{ "& .MuiTableRow-root": { maxHeight: 18 } }}>
                                  <TableCell align="center" style={{ width: 115 }}>End Point</TableCell>
                                  <TableCell align="center" style={{ width: 115 }}>Local IP Address </TableCell>
                                  <TableCell align="center" style={{ width: 115 }}>VLAN Id </TableCell>
                                  <TableCell align="center" style={{ width: 115 }}>RemoteIP Address</TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody style={{ zIndex: '0' }}>
                                {row?.EndPointList?.map((row: any) => (
                                  <TableRow key={row.id} sx={{ '&:nth-of-type(odd)': { backgroundColor: '#d7ecff' }, '& .MuiTableCell-root': { height: '12px', padding: '0' }, '&:last-child td, &:last-child th': { border: 0 } }} >
                                    <CustomTableCell {...{ row, name: "EndPoint" }} />
                                    <CustomTableCell {...{ row, name: "LocalIPAddress" }} />
                                    <CustomTableCell {...{ row, name: "VLANID" }} />
                                    <CustomTableCell {...{ row, name: "RemoteIPAddress" }} />
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </div>
                        </Paper>
                      </TableCell>
                    </Table>
                  </div>
                )}
                {/* 4. Drx Profile Id List Table */}
                {duConfigCurrentPage === 3 && (
                  <div>
                    <div style={{ display: 'flex', flexDirection: 'row', marginTop: '6px', marginBottom: '1%', height: '25px' }} >
                      {
                        row?.DrxProfileIdInfoList?.map((item: any, index) => (
                          <div style={{ display: 'flex', justifyContent: 'flex-start', margin: '6px' }}>
                            <Tooltip title={"DRX Instance_" + item.id}>
                              <Button style={{ width: '89px'}} key={index}
                                className={`${classes.navButton1} ${duConfigCurrentPage === index ? classes.activeNavButton : ''}`}
                                onClick={() => {
                                  fetcCurrentDudrxdata(item)
                                  console.log("item", item)
                                }
                                }>
                                &nbsp;
                                <span style={{ fontSize: '9px', color: '#55679d' }}>
                                  {"DRX Instance_" + item.id}
                                </span>
                              </Button>
                            </Tooltip>
                          </div>
                        ))
                      }
                    </div>
                    <div style={{ border: '1px solid #c6cbd1', borderRadius: '3px', margin: '0.5%', padding: '1%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                      <Card style={{ backgroundColor: '#c6cbd1', height: '25px' }}>
                        <CardContent>
                          <b style={{ fontSize: '14px', marginBottom: '10px', position: 'relative', top: '-12px' }}>Drx Profile Id List</b>
                        </CardContent>
                      </Card>
                      <Paper elevation={2} style={{ padding: '1px' }}>
                        <table><tbody><tr>
                          <td style={{ width: '300px', padding: '5px 0' }}><label style={{ padding: '5px', fontSize: '14px' }}>  DrxinactivityTimer : <b style={{ fontSize: '14px' }}>{CurrentDudrxdata?.drxinactivitytimer}</b></label></td>
                          <td style={{ width: '300px', padding: '5px 0' }}><label style={{ padding: '5px', fontSize: '14px' }}>  Drxharqrttdl : <b style={{ fontSize: '14px' }}>{CurrentDudrxdata?.drxharqrttdl}</b></label></td>
                          <td style={{ width: '300px', padding: '5px 0' }}><label style={{ padding: '5px', fontSize: '14px' }}>  Drxharqrttul : <b style={{ fontSize: '14px' }}>{CurrentDudrxdata?.drxharqrttul}</b></label></td>
                        </tr>
                          <tr>
                            <td style={{ width: '300px', padding: '5px 0' }}><label style={{ padding: '5px', fontSize: '14px' }}>  Drxtransmisdl : <b style={{ fontSize: '14px' }}>{CurrentDudrxdata?.drxtransmisdl}</b></label></td>
                            <td style={{ width: '300px', padding: '5px 0' }}><label style={{ padding: '5px', fontSize: '14px' }}>  Drxtransmisul : <b style={{ fontSize: '14px' }}>{CurrentDudrxdata?.drxtransmisul}</b></label></td>
                            <td style={{ width: '300px', padding: '5px 0' }}><label style={{ padding: '5px', fontSize: '14px' }}>  Drxlongcycle : <b style={{ fontSize: '14px' }}>{CurrentDudrxdata?.drxlongcycle}</b></label></td>
                          </tr>

                        </tbody>
                        </table>
                      </Paper>
                    </div>
                    <div>
                      <Table >
                        <TableCell style={{ width: "60%", height: "20px", overflowY: "visible" }}>
                          <Paper style={{ width: "99%", border: '2px solid #ccc', }}>
                            <div style={{ color: 'black', backgroundColor: '#c6cbd1', height: '20px' }} ><b> Scheduling Request Configuration List </b></div>
                            <div style={{ maxHeight: "180px", overflowY: "auto" }}>
                              <Table style={{ minWidth: "99%", }} aria-label="SchedulingRequestConfigurationTable">
                                <TableHead sx={{ "& th": { color: '#ffffff', backgroundColor: '#53659c', lineHeight: '0.6', position: "sticky", top: "0", zIndex: '1' } }}>
                                  <TableRow sx={{ "& .MuiTableRow-root": { maxHeight: 18 } }}>
                                    <TableCell align="center" style={{ width: 115 }}>Scheduling Request</TableCell>
                                    <TableCell align="center" style={{ width: 115 }}>Scprohibit Timer </TableCell>
                                    <TableCell align="center" style={{ width: 115 }}>SctransMax </TableCell>
                                  </TableRow>
                                </TableHead>
                                <TableBody style={{ zIndex: '0' }}>
                                  {console.log("CurrentDudrxdata?.DrxProfileIdInfoList", CurrentDudrxdata)}
                                  {console.log("CurrentDudrxdata?.DrxProfileIdInfoList", CurrentDudrxdata?.SchedulingReqConfInfoList)}
                                  {CurrentDudrxdata?.SchedulingReqConfInfoList?.map((row: any) => (
                                    <TableRow key={row.id} sx={{ '&:nth-of-type(odd)': { backgroundColor: '#d7ecff' }, '& .MuiTableCell-root': { height: '12px', padding: '0' }, '&:last-child td, &:last-child th': { border: 0 } }} >
                                      <CustomTableCell {...{ row, name: "schedulingrequest" }} />
                                      <CustomTableCell {...{ row, name: "scprohibittimer" }} />
                                      <CustomTableCell {...{ row, name: "sctransmax" }} />
                                    </TableRow>
                                  ))}
                                </TableBody>
                              </Table>
                            </div>
                          </Paper>
                        </TableCell>
                      </Table>
                    </div>
                  </div>
                )}

                {/* 5. Common Configuration Mac Parameters List Table */}
                {duConfigCurrentPage === 4 && (

                  <div style={{ border: '1px solid #c6cbd1', borderRadius: '3px', margin: '0.5%', padding: '1%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <Card style={{ backgroundColor: '#c6cbd1', height: '25px' }}>
                      <CardContent>
                        <b style={{ fontSize: '14px', marginBottom: '10px', position: 'relative', top: '-12px' }}>srb info</b>
                      </CardContent>
                    </Card>
                    <Paper elevation={2} style={{ padding: '1px' }}>
                      <table><tbody><tr>
                        <td style={{ width: '300px', padding: '5px 0' }}><label style={{ padding: '5px', fontSize: '14px' }}>Priority : <b style={{ fontSize: '14px' }}>{row.srblist?.Priority}</b></label></td>
                        <td style={{ width: '300px', padding: '5px 0' }}><label style={{ padding: '5px', fontSize: '14px' }}>Allowed Serv Cells : <b style={{ fontSize: '14px' }}>{row.srblist?.AllowedServCells}</b></label></td>
                      </tr>
                        <tr>
                          <td style={{ width: '300px', padding: '5px 0' }}><label style={{ padding: '5px', fontSize: '14px' }}>Logical Channel Sr Delay Timer : <b style={{ fontSize: '14px' }}>{row.srblist?.srdelaytimer.toString()}</b></label></td>
                          <td style={{ width: '300px', padding: '5px 0' }}><label style={{ padding: '5px', fontSize: '14px' }}>Max Pusch Duration : <b style={{ fontSize: '14px' }}>{row.srblist?.maxpuschduration}</b></label></td>
                        </tr></tbody></table>
                    </Paper>
                  </div>
                )}

                {/* 6. Ul Specific Parameters List Table */}
                {duConfigCurrentPage === 5 && (

                  <div>
                    <div style={{ display: 'flex', flexDirection: 'row', marginTop: '6px', marginBottom: '1%', height: '25px' }} >
                      {
                        row?.qoslist?.map((item: any, index) => (
                          <div style={{ display: 'flex', justifyContent: 'flex-start', margin: '6px' }}>
                            <Tooltip title={"QOS Instance_" + item.id}>
                              <Button style={{ width: '89px'}} key={index}
                                className={`${classes.navButton1} ${duConfigCurrentPage === index ? classes.activeNavButton : ''}`}
                                onClick={() =>
                                  fetcCurrentDuqosdata(item)
                                }>
                                &nbsp;
                                <span style={{ fontSize: '9px', color: '#55679d' }}>
                                  {"QOS Instance_" + item.id}
                                </span>
                              </Button>
                            </Tooltip>
                          </div>
                        ))
                      }
                    </div>

                    <div>
                      <div style={{ border: '1px solid #c6cbd1', borderRadius: '3px', margin: '1%', padding: '1%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <Card style={{ backgroundColor: '#c6cbd1', height: '25px' }}>
                          <CardContent>
                            <b style={{ fontSize: '14px', marginBottom: '10px', position: 'relative', top: '-12px' }}>QOS Ul Specific Parameters List</b>
                          </CardContent>
                        </Card>
                        <Paper elevation={2} style={{ padding: '1px' }}>
                          <table><tbody><tr>

                            <td style={{ width: '300px', padding: '5px 0' }}><label style={{ padding: '5px', fontSize: '14px' }}>Logical Channel : <b style={{ fontSize: '14px' }}>{CurrentDuqosdata?.logicalchannel}</b></label></td>
                            <td style={{ width: '300px', padding: '5px 0' }}><label style={{ padding: '5px', fontSize: '14px' }}>Logical ChanSrMask : <b style={{ fontSize: '14px' }}>{CurrentDuqosdata?.lgalchansrmask.toString()}</b></label></td>
                            <td style={{ width: '300px', padding: '5px 0' }}><label style={{ padding: '5px', fontSize: '14px' }}>Prioritrised Bitrate : <b style={{ fontSize: '14px' }}>{CurrentDuqosdata?.prioritrizedbitrate}</b></label></td>
                          </tr><tr>
                              <td style={{ width: '300px', padding: '5px 0' }}><label style={{ padding: '5px', fontSize: '14px' }}>Bucket SizeDura : <b style={{ fontSize: '14px' }}>{CurrentDuqosdata?.bucketsizedura}</b></label></td>
                              <td style={{ width: '300px', padding: '5px 0' }}><label style={{ padding: '5px', fontSize: '14px' }}>Maxulharqtx : <b style={{ fontSize: '14px' }}>{CurrentDuqosdata?.maxulharqtx}</b></label></td>
                              <td style={{ width: '300px', padding: '5px 0' }}><label style={{ padding: '5px', fontSize: '14px' }}> Lscl ChanSrdelay : <b style={{ fontSize: '14px' }}>{CurrentDuqosdata?.lsclchansrdelay.toString()}</b></label></td></tr><tr>

                            </tr></tbody></table>
                        </Paper>
                      </div>

                      <div style={{ border: '1px solid #c6cbd1', borderRadius: '3px', margin: '1%', padding: '1%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <Card style={{ backgroundColor: '#c6cbd1', height: '25px' }}>
                          <CardContent>
                            <b style={{ fontSize: '14px', marginBottom: '10px', position: 'relative', top: '-12px' }}>QOS Dl Specific Parameters List</b>
                          </CardContent>
                        </Card>
                        <Paper elevation={2} style={{ padding: '1px' }}>
                          <table><tbody><tr>
                          <td style={{ width: '400px', padding: '5px 0' }}><label style={{ padding: '5px', fontSize: '14px' }}>Maxpdschduration : <b style={{ fontSize: '14px' }}>{CurrentDuqosdata?.maxpdschduration}</b></label></td>
                            <td style={{ width: '400px', padding: '5px 0' }}><label style={{ padding: '5px', fontSize: '14px' }}>Maxdlharqtx : <b style={{ fontSize: '14px' }}>{CurrentDuqosdata?.maxdlharqtx}</b></label></td>
                          </tr></tbody></table>
                        </Paper>
                      </div>
                      {/* ))} */}
                    </div>
                  </div>
                )}

                {duConfigCurrentPage === 6 && (
                  <div style={{ border: '1px solid #c6cbd1', borderRadius: '3px', margin: '0.5%', padding: '1%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <Card style={{ backgroundColor: '#c6cbd1', height: '25px' }}>
                      <CardContent>
                        <b style={{ fontSize: '14px', marginBottom: '10px', position: 'relative', top: '-12px' }}>Bsr Configuration</b>
                      </CardContent>
                    </Card>
                    <Paper elevation={2} style={{ padding: '1px' }}>
                      <table><tbody><tr>
                        <td style={{ width: '300px', padding: '5px 0' }}><label style={{ padding: '5px', fontSize: '14px' }}>  Logical Channel Sr Delay Timer : <b style={{ fontSize: '14px' }}>{row?.LogicalChannelSrdelayTimer}</b></label></td>
                        <td style={{ width: '300px', padding: '5px 0' }}><label style={{ padding: '5px', fontSize: '14px' }}>  Periodicity Bsr Timer : <b style={{ fontSize: '14px' }}>{row?.periodicityBsrTimer}</b></label></td>
                        <td style={{ width: '300px', padding: '5px 0' }}><label style={{ padding: '5px', fontSize: '14px' }}>  Rctx Bsr Timer : <b style={{ fontSize: '14px' }}>{row?.RctxBsrTimer}</b></label></td>
                      </tr></tbody></table>
                    </Paper>
                  </div>
                )}
                {duConfigCurrentPage === 7 && (
                  <div style={{ border: '1px solid #c6cbd1', borderRadius: '3px', margin: '0.5%', padding: '1%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <Card style={{ backgroundColor: '#c6cbd1', height: '25px' }}>
                      <CardContent>
                        <b style={{ fontSize: '14px', marginBottom: '10px', position: 'relative', top: '-12px' }}>Phr Configuration</b>
                      </CardContent>
                    </Card>

                    <Paper elevation={2} style={{ padding: '1px' }}>
                      <table>
                        <tbody>
                          <tr>
                            <td style={{ width: '300px', padding: '5px 0' }}><label style={{ padding: '5px', fontSize: '14px' }}>  Phr Periodic Timer : <b style={{ fontSize: '14px' }}>{row?.phrPeriodicTimer}</b></label></td>
                            <td style={{ width: '300px', padding: '5px 0' }}><label style={{ padding: '5px', fontSize: '14px' }}>  Periodicity Bsr Timer : <b style={{ fontSize: '14px' }}>{row?.phrProhibitTimer}</b></label></td>
                            <td style={{ width: '300px', padding: '5px 0' }}><label style={{ padding: '5px', fontSize: '14px' }}>  Phr Tx Power Factor Change : <b style={{ fontSize: '14px' }}>{row?.PhrTxpowerFactorchange}</b></label> </td>
                          </tr>  <tr>
                            <td style={{ width: '300px', padding: '5px 0' }}><label style={{ padding: '5px', fontSize: '14px' }}>  Phr Type2 Other Cell : <b style={{ fontSize: '14px' }}>{row?.PhrType2OtherCell}</b></label></td>
                            <td style={{ width: '300px', padding: '5px 0' }}><label style={{ padding: '5px', fontSize: '14px' }}>  Phr Mode Othercg : <b style={{ fontSize: '14px' }}>{row?.PhrModeOthercg}</b></label></td>
                          </tr>
                        </tbody>
                      </table>
                    </Paper>
                  </div>
                )}
                {/* 10. SCell Deactivation Timer List Table */}
                {duConfigCurrentPage === 8 && (
                  <div>
                    <Table >
                      <TableCell style={{ width: "60%", height: "20px", overflowY: "visible" }}>
                        <Paper style={{ width: "99%", border: '2px solid #ccc', }}>
                          <div style={{ color: 'black', backgroundColor: '#c6cbd1', height: '20px' }} ><b>SCell Deactivation Timer List</b></div>
                          <div style={{ maxHeight: "180px", overflowY: "auto" }}>
                            <Table style={{ minWidth: "99%", }} aria-label="SCellDeactivationTimerTable">
                              <TableHead sx={{ "& th": { color: '#ffffff', backgroundColor: '#53659c', lineHeight: '0.6', position: "sticky", top: "0", zIndex: '1' } }}>
                                <TableRow sx={{ "& .MuiTableRow-root": { maxHeight: 18 } }}>
                                  <TableCell align="center" style={{ width: 115 }}>Index</TableCell>
                                  <TableCell align="center" style={{ width: 115 }}>DeactivationTimer </TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody style={{ zIndex: '0' }}>
                                {row?.ScellDeactiveInfoList?.map((row: any) => (
                                  <TableRow key={row.id} sx={{ '&:nth-of-type(odd)': { backgroundColor: '#d7ecff' }, '& .MuiTableCell-root': { height: '12px', padding: '0' }, '&:last-child td, &:last-child th': { border: 0 } }} >
                                    <CustomTableCell {...{ row, name: "Index" }} />
                                    <CustomTableCell {...{ row, name: "DeactivationTimer" }} />
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </div>
                        </Paper>
                      </TableCell>
                    </Table>
                  </div>
                )}
                {/* 11. NR Sector Carrier List Table */}
                {duConfigCurrentPage === 9 && (
                  <div>
                    <Table >
                      <TableCell style={{ width: "60%", height: "20px", overflowY: "visible" }}>
                        <Paper style={{ width: "99%", border: '2px solid #ccc', }}>
                          <div style={{ color: 'black', backgroundColor: '#c6cbd1', height: '20px' }} ><b>NR Sector Carrier List</b></div>
                          <div style={{ maxHeight: "180px", overflowY: "auto" }}>
                            <Table style={{ minWidth: "99%", }} aria-label="NRSectorCarrierTable">
                              <TableHead sx={{ "& th": { color: '#ffffff', backgroundColor: '#53659c', lineHeight: '1.1', position: "sticky", top: "0", zIndex: '1' } }}>
                                <TableRow sx={{ "& .MuiTableRow-root": { maxHeight: 20 } }}>
                                  <TableCell align="center" style={{ width: 115 }}>Priority Label</TableCell>
                                  <TableCell align="center" style={{ width: 115 }}>Tx Direction </TableCell>
                                  <TableCell align="center" style={{ width: 115 }}>Config Max Tx Power</TableCell>
                                  <TableCell align="center" style={{ width: 115 }}>Arfcn DL</TableCell>
                                  <TableCell align="center" style={{ width: 115 }}>Arfcn UL </TableCell>
                                  <TableCell align="center" style={{ width: 115 }}>BS Channel BwDl</TableCell>
                                  <TableCell align="center" style={{ width: 115 }}>BS Channel BwUl</TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody style={{ zIndex: '0' }}>
                                {row?.SectorCarrierList?.map((row: any) => (
                                  <TableRow key={row.id} sx={{ '&:nth-of-type(odd)': { backgroundColor: '#d7ecff' }, '& .MuiTableCell-root': { height: '12px', padding: '0' }, '&:last-child td, &:last-child th': { border: 0 } }} >
                                    <CustomTableCell {...{ row, name: "PriorityLabel" }} />
                                    <CustomTableCell {...{ row, name: "tXDirection" }} />
                                    <CustomTableCell {...{ row, name: "ConfigMaxTxPower" }} />
                                    <CustomTableCell {...{ row, name: "arfcnDL" }} />
                                    <CustomTableCell {...{ row, name: "arfcnUL" }} />
                                    <CustomTableCell {...{ row, name: "bSChannelBwDl" }} />
                                    <CustomTableCell {...{ row, name: "bSChannelBwUl" }} />
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </div>
                        </Paper>
                      </TableCell>
                    </Table>
                  </div>
                )}
                {/* 12. Bwp List table */}
                {duConfigCurrentPage === 10 && (
                  <div>
                    <Table >
                      <TableCell style={{ width: "60%", height: "20px", overflowY: "visible" }}>
                        <Paper style={{ width: "99%", border: '2px solid #ccc', }}>
                          <div style={{ color: 'black', backgroundColor: '#c6cbd1', height: '20px' }} ><b>Bwp List</b></div>
                          <div style={{ maxHeight: "180px", overflowY: "auto" }}>
                            <Table style={{ minWidth: "99%", }} aria-label="Bwpable">
                              <TableHead sx={{ "& th": { color: '#ffffff', backgroundColor: '#53659c', lineHeight: '1.1', position: "sticky", top: "0", zIndex: '1' } }}>
                                <TableRow sx={{ "& .MuiTableRow-root": { maxHeight: 20 } }}>
                                  <TableCell align="center" style={{ width: 115 }}>Priority Label</TableCell>
                                  <TableCell align="center" style={{ width: 115 }}>Bwp Context </TableCell>
                                  <TableCell align="center" style={{ width: 115 }}>Sub Carrier Spacing</TableCell>
                                  <TableCell align="center" style={{ width: 115 }}>Cycle Prefix</TableCell>
                                  <TableCell align="center" style={{ width: 115 }}>Start RB </TableCell>
                                  <TableCell align="center" style={{ width: 115 }}>Number Of RBs</TableCell>
                                  <TableCell align="center" style={{ width: 115 }}>Isinitial Bwp</TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody style={{ zIndex: '0' }}>
                                {row?.BwpList?.map((row: any) => (
                                  <TableRow key={row.id} sx={{ '&:nth-of-type(odd)': { backgroundColor: '#d7ecff' }, '& .MuiTableCell-root': { height: '12px', padding: '0' }, '&:last-child td, &:last-child th': { border: 0 } }} >
                                    <CustomTableCell {...{ row, name: "PriorityLabel" }} />
                                    <CustomTableCell {...{ row, name: "bwpContext" }} />
                                    <CustomTableCell {...{ row, name: "SubCarrierSpacing" }} />
                                    <CustomTableCell {...{ row, name: "cyclePrefix" }} />
                                    <CustomTableCell {...{ row, name: "startRB" }} />
                                    <CustomTableCell {...{ row, name: "NumberOfRBs" }} />
                                    <CustomTableCell {...{ row, name: "isInitiaLBwp" }} />
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </div>
                        </Paper>
                      </TableCell>
                    </Table>
                  </div>
                )}
                {duConfigCurrentPage === 11 && (
                  <div>
                    <Table >
                      <TableCell style={{ width: "60%", height: "20px", overflowY: "visible" }}>
                        <Paper style={{ width: "99%", border: '2px solid #ccc', }}>
                          <div style={{ color: 'black', backgroundColor: '#c6cbd1', height: '20px' }} ><b>NR Cell DU</b></div>
                          <div style={{ maxHeight: "180px", overflowY: "auto" }}>
                            <Table style={{ minWidth: "99%", }} aria-label="Bwpable">
                              <TableHead sx={{ "& th": { color: '#ffffff', backgroundColor: '#53659c', lineHeight: '1.1', position: "sticky", top: "0", zIndex: '1' } }}>
                                <TableRow sx={{ "& .MuiTableRow-root": { maxHeight: 20 } }}>
                                  <TableCell align="center" style={{ width: 115 }}>NRPCI</TableCell>
                                  <TableCell align="center" style={{ width: 115 }}>NRTAC</TableCell>
                                  <TableCell align="center" style={{ width: 115 }}>Resource Type </TableCell>
                                  <TableCell align="center" style={{ width: 115 }}>Cell LocalId</TableCell>
                                  <TableCell align="center" style={{ width: 115 }}>Cell Id</TableCell>
                                  <TableCell align="center" style={{ width: 115 }}>Bwp List Id</TableCell>
                                  <TableCell align="center" style={{ width: 115 }}>NR SectorCarrierRef List Id</TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody style={{ zIndex: '0' }}>
                                {row?.NRCellDUList?.map((row: any) => (
                                  <TableRow key={row.id} sx={{ '&:nth-of-type(odd)': { backgroundColor: '#d7ecff' }, '& .MuiTableCell-root': { height: '12px', padding: '0' }, '&:last-child td, &:last-child th': { border: 0 } }} >
                                    <CustomTableCell {...{ row, name: "NRPCI" }} />
                                    <CustomTableCell {...{ row, name: "NRTAC" }} />
                                    <CustomTableCell {...{ row, name: "ResourceType" }} />
                                    <CustomTableCell {...{ row, name: "CellLocalId" }} />
                                    <CustomTableCell {...{ row, name: "cellId" }} />
                                    <CustomTableCell {...{ row, name: "BwplistId" }} />
                                    <CustomTableCell {...{ row, name: "NRSectorCarrierReflistId" }} />
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </div>
                        </Paper>
                      </TableCell>
                    </Table>
                  </div>
                )}
                {duConfigCurrentPage === 12 && (
                  <div style={{ border: '1px solid #c6cbd1', borderRadius: '3px', margin: '0.5%', padding: '1%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <Card style={{ backgroundColor: '#c6cbd1', height: '25px' }}>
                      <CardContent>
                        <b style={{ fontSize: '14px', marginBottom: '10px', position: 'relative', top: '-10px' }}>DU Sync State</b>
                      </CardContent>
                    </Card>
                    <Paper elevation={2} style={{ padding: '1px' }}>
                      <table>
                        <tbody>
                          <tr>
                            <td style={{ width: '300px', padding: '5px 0' }}><label style={{ padding: '5px', fontSize: '14px' }}>DU Index : <b style={{ fontSize: '14px' }}>{row?.DUIndex}</b></label></td>
                            <td style={{ width: '300px', padding: '5px 0' }}><label style={{ padding: '5px', fontSize: '14px' }}>gNBDU Id : <b style={{ fontSize: '14px' }}>{row?.gNBDUId}</b></label></td>
                            <td style={{ width: '300px', padding: '5px 0' }}><label style={{ padding: '5px', fontSize: '14px' }}>Sync State : <b style={{ fontSize: '14px' }}>{row?.SyncState}</b></label></td>
                          </tr>
                        </tbody>
                      </table></Paper>
                  </div>
                )}
                {duConfigCurrentPage === 13 && (
                  <div style={{ border: '1px solid #c6cbd1', borderRadius: '3px', margin: '0.5%', padding: '1%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <Card style={{ backgroundColor: '#c6cbd1', height: '25px' }}>
                      <CardContent>
                        <b style={{ fontSize: '14px', marginBottom: '10px', position: 'relative', top: '-10px' }}>ODU Window Method</b>
                      </CardContent>
                    </Card>
                    <Paper elevation={2} style={{ padding: '1px' }}>
                      <table>
                        <tbody>
                          <tr>
                            <td style={{ width: '300px', padding: '5px 0' }}><label style={{ padding: '5px', fontSize: '14px' }}>  Method : <b style={{ fontSize: '14px' }}>{row?.Method}</b></label></td>
                            <td style={{ width: '300px', padding: '5px 0' }}><label style={{ padding: '5px', fontSize: '14px' }}>  Configuration Status : <b style={{ fontSize: '14px' }}>{row?.ConfigStatus}</b></label></td>
                            <td style={{ width: '300px', padding: '5px 0' }}><label style={{ padding: '5px', fontSize: '14px' }}>  RU Count : <b style={{ fontSize: '14px' }}>{row?.RUCount}</b></label></td>
                          </tr>
                        </tbody>
                      </table>
                    </Paper>
                  </div>
                )}
                {/* 13. Pre Configured RU Profile List Table */}
                {duConfigCurrentPage === 14 && (
                  <div>
                    <Table >
                      <TableCell style={{ width: "60%", height: "20px", overflowY: "visible" }}>
                        <Paper style={{ width: "99%", border: '2px solid #ccc', }}>
                          <div style={{ color: 'black', backgroundColor: '#c6cbd1', height: '20px' }} ><b>Pre Configured RU Profile List</b></div>
                          <div style={{ maxHeight: "180px", overflowY: "auto" }}>
                            <Table style={{ minWidth: "99%", }} aria-label="PreConfiguredRUProfile">
                              <TableHead sx={{ "& th": { color: '#ffffff', backgroundColor: '#53659c', lineHeight: '0.6', position: "sticky", top: "0", zIndex: '1' } }}>
                                <TableRow sx={{ "& .MuiTableRow-root": { maxHeight: 18 } }}>
                                  <TableCell align="center" style={{ width: 115 }}>RU Index</TableCell>
                                  <TableCell align="center" style={{ width: 115 }}>RU Instance Id </TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody style={{ zIndex: '0' }}>
                                {row?.PreconfRUProfileList?.map((row: any) => (
                                  <TableRow key={row.id} sx={{ '&:nth-of-type(odd)': { backgroundColor: '#d7ecff' }, '& .MuiTableCell-root': { height: '12px', padding: '0' }, '&:last-child td, &:last-child th': { border: 0 } }} >
                                    <CustomTableCell {...{ row, name: "RUIndex" }} />
                                    <CustomTableCell {...{ row, name: "RUInstanceId" }} />
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </div>
                        </Paper>
                      </TableCell>
                    </Table>
                  </div>
                )}
                {duConfigCurrentPage === 15 && (
                  <div style={{ border: '1px solid #c6cbd1', borderRadius: '3px', margin: '0.5%', padding: '1%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <Card style={{ backgroundColor: '#c6cbd1', height: '25px' }}>
                      <CardContent>
                        <b style={{ fontSize: '14px', marginBottom: '10px', position: 'relative', top: '-12px' }}>Pre Configured Delay Profile</b>
                      </CardContent>
                    </Card>
                    <Paper elevation={2} style={{ padding: '2px' }}>
                      <table>
                        <tbody>
                          <tr>
                            <td style={{ width: '300px', padding: '5px 0' }}><label style={{ padding: '5px', fontSize: '14px' }}>Ta4 Min : <b style={{ fontSize: '14px' }}>{row?.ta4Min}</b></label></td>
                            <td style={{ width: '300px', padding: '5px 0' }}><label style={{ padding: '5px', fontSize: '14px' }}>Ta4 Max : <b style={{ fontSize: '14px' }}>{row?.ta4Max}</b></label></td>
                            <td style={{ width: '300px', padding: '5px 0' }}><label style={{ padding: '5px', fontSize: '14px' }}>T1a Min Cp Dl : <b style={{ fontSize: '14px' }}>{row?.t1aMinCpDl}</b></label></td>
                            <td style={{ width: '300px', padding: '5px 0' }}><label style={{ padding: '5px', fontSize: '14px' }}>T1a Min Cp Ul : <b style={{ fontSize: '14px' }}>{row?.t1aMinCpUl}</b></label></td>
                          </tr>
                          <tr>
                            <td style={{ width: '300px', padding: '5px 0' }}><label style={{ padding: '5px', fontSize: '14px' }}>T1a Min Ul : <b style={{ fontSize: '14px' }}>{row?.t1aMinUl}</b></label></td>
                            <td style={{ width: '300px', padding: '5px 0' }}><label style={{ padding: '5px', fontSize: '14px' }}>T1a Max Cp Dl : <b style={{ fontSize: '14px' }}>{row?.t1aMaxCpDl}</b></label></td>
                            <td style={{ width: '300px', padding: '5px 0' }}><label style={{ padding: '5px', fontSize: '14px' }}>T1a Max Cp Ul : <b style={{ fontSize: '14px' }}>{row?.t1aMaxCpUl}</b></label></td>
                            <td style={{ width: '300px', padding: '5px 0' }}><label style={{ padding: '5px', fontSize: '14px' }}>T1a Max Up : <b style={{ fontSize: '14px' }}>{row?.t1aMaxUp}</b></label></td>
                          </tr>
                          <tr>
                            <td style={{ width: '300px', padding: '5px 0' }}><label style={{ padding: '5px', fontSize: '14px' }}>T12 Min : <b style={{ fontSize: '14px' }}>{row?.t12Min}</b></label></td>
                            <td style={{ width: '300px', padding: '5px 0' }}><label style={{ padding: '5px', fontSize: '14px' }}>T12 Max : <b style={{ fontSize: '14px' }}>{row?.t12Max}</b></label></td>
                            <td style={{ width: '300px', padding: '5px 0' }}><label style={{ padding: '5px', fontSize: '14px' }}>T34 Min : <b style={{ fontSize: '14px' }}>{row?.t34Min}</b></label></td>
                            <td style={{ width: '300px', padding: '5px 0' }}><label style={{ padding: '5px', fontSize: '14px' }}>T34 Max : <b style={{ fontSize: '14px' }}>{row?.t34Max}</b></label></td>
                          </tr>
                          <tr>
                            <td style={{ width: '300px', padding: '5px 0' }}><label style={{ padding: '5px', fontSize: '14px' }}>T2a Min Up : <b style={{ fontSize: '14px' }}>{row?.t2aMinUp}</b></label></td>
                            <td style={{ width: '300px', padding: '5px 0' }}><label style={{ padding: '5px', fontSize: '14px' }}>T2a Max Up : <b style={{ fontSize: '14px' }}>{row?.t2aMaxUp}</b></label></td>
                            <td style={{ width: '300px', padding: '5px 0' }}><label style={{ padding: '5px', fontSize: '14px' }}>T2a Min Cp Dl : <b style={{ fontSize: '14px' }}>{row?.t2aMinCpDl}</b></label></td>
                            <td style={{ width: '300px', padding: '5px 0' }}><label style={{ padding: '5px', fontSize: '14px' }}>T2a Min Cp Ul : <b style={{ fontSize: '14px' }}>{row?.t2aMinCpUl}</b></label></td>
                          </tr>
                          <tr>
                            <td style={{ width: '300px', padding: '5px 0' }}><label style={{ padding: '5px', fontSize: '14px' }}>T2a Max Cp Dl : <b style={{ fontSize: '14px' }}>{row?.t2aMaxCpDl}</b></label></td>
                            <td style={{ width: '300px', padding: '5px 0' }}><label style={{ padding: '5px', fontSize: '14px' }}>T2a Max Cp Ul : <b style={{ fontSize: '14px' }}>{row?.t2aMaxCpUl}</b></label></td>
                            <td style={{ width: '300px', padding: '5px 0' }}><label style={{ padding: '5px', fontSize: '14px' }}>Ta3 Min : <b style={{ fontSize: '14px' }}>{row?.ta3Min}</b></label></td>
                            <td style={{ width: '300px', padding: '5px 0' }}><label style={{ padding: '5px', fontSize: '14px' }}>Ta3 Max : <b style={{ fontSize: '14px' }}>{row?.ta3Max}</b></label></td>
                          </tr>
                        </tbody>
                      </table>
                    </Paper>
                  </div>
                )}
                {/* 14. ODU Window List Table */}
                {duConfigCurrentPage === 16 && (
                  <div>
                    <div style={{ display: 'flex', flexDirection: 'row', marginTop: '6px', height: '25px' }} >
                      {
                        row?.ODUWindowDataList?.map((item: any, index) => (
                          <div style={{ display: 'flex', justifyContent: 'flex-start', margin: '6px' }}>
                            <Tooltip title={"RU Instance_" + item.id}>
                              <Button key={index}
                                className={`${classes.navButton1} ${duConfigCurrentPage === index ? classes.activeNavButton : ''}`}
                                onClick={() =>
                                  fetcCurrentDuODUdata(item)
                                }>
                                &nbsp;
                                <span style={{ fontSize: '9px', color: '#55679d' }}>
                                  {"RU Instance_" + item.id}
                                </span>
                              </Button>
                            </Tooltip>
                          </div>
                        ))
                      }
                    </div><br></br>
                    {duODUCurrentPage === 0 && (
                      <div>
                        {/* <div>
                <Table >
                  <TableCell style={{ width: "60%", height: "20px", overflowY: "visible" }}>
                    <Paper style={{ width: "99%", border: '2px solid #ccc', }}>
                      <div style={{ color: 'black', backgroundColor: '#c6cbd1', height: '20px' }} ><b> ODU Window List </b></div>
                      <div style={{ maxHeight: "180px", overflowY: "auto" }}>
                        <Table style={{ minWidth: "99%", }} aria-label="SchedulingRequestConfigurationTable">
                          <TableHead sx={{ "& th": { color: '#ffffff', backgroundColor: '#53659c', lineHeight: '1.1', position: "sticky", top: "0", zIndex: '1' } }}>
                            <TableRow sx={{ "& .MuiTableRow-root": { maxHeight: 20 } }}>
                              <TableCell align="center" style={{ width: 115 }}>RU Index Id</TableCell>
                              <TableCell align="center" style={{ width: 115 }}>RU Instance Id </TableCell>
                              <TableCell align="center" style={{ width: 115 }}>Bandwidth </TableCell>
                              <TableCell align="center" style={{ width: 115 }}>Sub Carrier Spacing</TableCell>
                              <TableCell align="center" style={{ width: 115 }}>DU Mac Address</TableCell>
                              <TableCell align="center" style={{ width: 115 }}>RUcp Mac Address</TableCell>
                              <TableCell align="center" style={{ width: 115 }}>Sap RUup Mac Address Host </TableCell>
                              <TableCell align="center" style={{ width: 115 }}>Cp Vlan Id </TableCell>
                              <TableCell align="center" style={{ width: 115 }}>Up Valn Id</TableCell>
                              <TableCell align="center" style={{ width: 115 }}>Comp Method</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody style={{ zIndex: '0' }}>
                            {row?.ODUWindowDataList?.map((row: any) => (
                              <TableRow key={row.id} sx={{ '&:nth-of-type(odd)': { backgroundColor: '#d7ecff' }, '& .MuiTableCell-root': { height: '12px', padding: '0' }, '&:last-child td, &:last-child th': { border: 0 } }} >
                                <CustomTableCell {...{ row, name: "RUIndexId" }} />
                                <CustomTableCell {...{ row, name: "RUInstanceId" }} />
                                <CustomTableCell {...{ row, name: "Bandwidth" }} />
                                <CustomTableCell {...{ row, name: "Subcarrierspacing" }} />
                                <CustomTableCell {...{ row, name: "DUmacAddress" }} />
                                <CustomTableCell {...{ row, name: "RUcpmacAddress" }} />
                                <CustomTableCell {...{ row, name: "RUupmacAddress" }} />
                                <CustomTableCell {...{ row, name: "CpvlanId" }} />
                                <CustomTableCell {...{ row, name: "UpvalnId" }} />
                                <CustomTableCell {...{ row, name: "CompMethod" }} />
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </Paper>
                  </TableCell>
                </Table>
              </div> */}
                        <div style={{ border: '1px solid #c6cbd1', borderRadius: '3px', margin: '0.5%', padding: '1%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                          <Card style={{ backgroundColor: '#c6cbd1', height: '25px' }}>
                            <CardContent>
                              <b style={{ fontSize: '14px', marginBottom: '10px', position: 'relative', top: '-12px' }}>ODU Window List</b>
                            </CardContent>
                          </Card>
                          <Paper elevation={2} style={{ padding: '1px' }}>
                            <table><tbody><tr>
                              <td style={{ width: '200px', padding: '5px 0' }}><label style={{ padding: '5px', fontSize: '14px' }}>RU Index Id : <b style={{ fontSize: '14px' }}>{CurrentDuODUdata?.RUIndexId}</b></label></td>
                              <td style={{ width: '300px', padding: '5px 0' }}><label style={{ padding: '5px', fontSize: '14px' }}>RU Instance Id : <b style={{ fontSize: '14px' }}>{CurrentDuODUdata?.RUInstanceId}</b></label></td>
                              <td style={{ width: '300px', padding: '5px 0' }}><label style={{ padding: '5px', fontSize: '14px' }}>Bandwidth : <b style={{ fontSize: '14px' }}>{CurrentDuODUdata?.Bandwidth}</b></label></td>
                              <td style={{ width: '300px', padding: '5px 0' }}><label style={{ padding: '5px', fontSize: '14px' }}>Sub Carrier Spacing : <b style={{ fontSize: '14px' }}>{CurrentDuODUdata?.Subcarrierspacing}</b></label></td>
                              <td style={{ width: '300px', padding: '5px 0' }}><label style={{ padding: '5px', fontSize: '14px' }}> DU Mac Address : <b style={{ fontSize: '14px' }}>{CurrentDuODUdata?.DUmacAddress}</b></label></td></tr><tr>
                                <td style={{ width: '400px', padding: '5px 0' }}><label style={{ padding: '5px', fontSize: '14px' }}> RUcp Mac Address : <b style={{ fontSize: '14px' }}>{CurrentDuODUdata?.RUcpmacAddress}</b></label></td>
                                <td style={{ width: '400px', padding: '5px 0' }}><label style={{ padding: '5px', fontSize: '14px' }}>Sap RUup Mac Address Host : <b style={{ fontSize: '14px' }}>{CurrentDuODUdata?.RUupmacAddress}</b></label></td>
                                <td style={{ width: '300px', padding: '5px 0' }}><label style={{ padding: '5px', fontSize: '14px' }}>Cp Vlan Id : <b style={{ fontSize: '14px' }}>{CurrentDuODUdata?.CpvlanId}</b></label></td>
                                <td style={{ width: '300px', padding: '5px 0' }}><label style={{ padding: '5px', fontSize: '14px' }}> Up Valn Id : <b style={{ fontSize: '14px' }}>{CurrentDuODUdata?.UpvalnId}</b></label></td>
                                <td style={{ width: '300px', padding: '5px 0' }}><label style={{ padding: '5px', fontSize: '14px' }}> Comp Method : <b style={{ fontSize: '14px' }}>{CurrentDuODUdata?.CompMethod}</b></label></td>
                              </tr></tbody></table>
                          </Paper>
                        </div>
                        <div >
                          <Table >
                            <TableCell style={{ width: "60%", height: "20px", overflowY: "visible" }}>
                              <Paper style={{ width: "99%", border: '2px solid #ccc', }}>
                                <div style={{ color: 'black', backgroundColor: '#c6cbd1', height: '20px' }} ><b>Prb Elem Dl List</b></div>
                                <div style={{ maxHeight: "180px", overflowY: "auto" }}>
                                  <Table style={{ minWidth: "99%", }} aria-label="PrbElemUlTable">
                                    <TableHead sx={{ "& th": { color: '#ffffff', backgroundColor: '#53659c', lineHeight: '1.1', position: "sticky", top: "0", zIndex: '1' } }}>
                                      <TableRow sx={{ "& .MuiTableRow-root": { maxHeight: 20 } }}>
                                        <TableCell align="center" style={{ width: 115 }}>Elem Index </TableCell>
                                        <TableCell align="center" style={{ width: 115 }}>Rb Start </TableCell>
                                        <TableCell align="center" style={{ width: 115 }}>Rb Size</TableCell>
                                        <TableCell align="center" style={{ width: 115 }}>Start Symbol</TableCell>
                                        <TableCell align="center" style={{ width: 115 }}>Num Of Symbol</TableCell>
                                        <TableCell align="center" style={{ width: 115 }}>Beam Index </TableCell>
                                        <TableCell align="center" style={{ width: 115 }}>Bf Weight Update </TableCell>
                                        <TableCell align="center" style={{ width: 115 }}>Comp Method</TableCell>
                                        <TableCell align="center" style={{ width: 115 }}>IWidth</TableCell>
                                        <TableCell align="center" style={{ width: 115 }}>Beam Forming</TableCell>
                                        <TableCell align="center" style={{ width: 115 }}>Scale Factor</TableCell>
                                        <TableCell align="center" style={{ width: 115 }}>Remask</TableCell>
                                      </TableRow>
                                    </TableHead>
                                    <TableBody style={{ zIndex: '0' }}>
                                      {CurrentDuODUdata?.PrbDlInfolist?.map((row: any) => (
                                        <TableRow key={row.id} sx={{ '&:nth-of-type(odd)': { backgroundColor: '#d7ecff' }, '& .MuiTableCell-root': { height: '12px', padding: '0' }, '&:last-child td, &:last-child th': { border: 0 } }} >
                                          <CustomTableCell {...{ row, name: "ElemIndex" }} />
                                          <CustomTableCell {...{ row, name: "RbStart" }} />
                                          <CustomTableCell {...{ row, name: "RbSize" }} />
                                          <CustomTableCell {...{ row, name: "StartSymbol" }} />
                                          <CustomTableCell {...{ row, name: "NumofSymbol" }} />
                                          <CustomTableCell {...{ row, name: "BeamIndex" }} />
                                          <CustomTableCell {...{ row, name: "BfweightUpdate" }} />
                                          <CustomTableCell {...{ row, name: "CompMethod" }} />
                                          <CustomTableCell {...{ row, name: "IqWidth" }} />
                                          <CustomTableCell {...{ row, name: "BeamForming" }} />
                                          <CustomTableCell {...{ row, name: "ScaleFactor" }} />
                                          <CustomTableCell {...{ row, name: "Remask" }} />
                                        </TableRow>
                                      ))}
                                    </TableBody>
                                  </Table>
                                </div>
                              </Paper>
                            </TableCell>
                          </Table>
                        </div>
                        <div>
                          <Table >
                            <TableCell style={{ width: "60%", height: "20px", overflowY: "visible" }}>
                              <Paper style={{ width: "99%", border: '2px solid #ccc', }}>
                                <div style={{ color: 'black', backgroundColor: '#c6cbd1', height: '20px' }} ><b>Prb Elem Ul List</b></div>
                                <div style={{ maxHeight: "180px", overflowY: "auto" }}>
                                  <Table style={{ minWidth: "99%", }} aria-label="PrbElemUlTable">
                                    <TableHead sx={{ "& th": { color: '#ffffff', backgroundColor: '#53659c', lineHeight: '1.1', position: "sticky", top: "0", zIndex: '1' } }}>
                                      <TableRow sx={{ "& .MuiTableRow-root": { maxHeight: 20 } }}>
                                        <TableCell align="center" style={{ width: 115 }}>Elem Index</TableCell>
                                        <TableCell align="center" style={{ width: 115 }}>Rb Start </TableCell>
                                        <TableCell align="center" style={{ width: 115 }}>Rb Size</TableCell>
                                        <TableCell align="center" style={{ width: 115 }}>Start Symbol</TableCell>
                                        <TableCell align="center" style={{ width: 115 }}>Number Of Symbol</TableCell>
                                        <TableCell align="center" style={{ width: 115 }}>Beam Index </TableCell>
                                        <TableCell align="center" style={{ width: 115 }}>Bf Weight Update</TableCell>
                                        <TableCell align="center" style={{ width: 115 }}>Comp Method</TableCell>
                                        <TableCell align="center" style={{ width: 115 }}>Iq Width</TableCell>
                                        <TableCell align="center" style={{ width: 115 }}>Beam Forming </TableCell>
                                        <TableCell align="center" style={{ width: 115 }}>Scale Factor</TableCell>
                                        <TableCell align="center" style={{ width: 115 }}>Remask</TableCell>
                                      </TableRow>
                                    </TableHead>
                                    <TableBody style={{ zIndex: '0' }}>
                                      {CurrentDuODUdata?.PrbUlInfolist?.map((row: any) => (
                                        <TableRow key={row.id} sx={{ '&:nth-of-type(odd)': { backgroundColor: '#d7ecff' }, '& .MuiTableCell-root': { height: '12px', padding: '0' }, '&:last-child td, &:last-child th': { border: 0 } }} >
                                          <CustomTableCell {...{ row, name: "ElemIndex" }} />
                                          <CustomTableCell {...{ row, name: "RbStart" }} />
                                          <CustomTableCell {...{ row, name: "RbSize" }} />
                                          <CustomTableCell {...{ row, name: "StartSymbol" }} />
                                          <CustomTableCell {...{ row, name: "NumofSymbol" }} />
                                          <CustomTableCell {...{ row, name: "BeamIndex" }} />
                                          <CustomTableCell {...{ row, name: "BfweightUpdate" }} />
                                          <CustomTableCell {...{ row, name: "CompMethod" }} />
                                          <CustomTableCell {...{ row, name: "IqWidth" }} />
                                          <CustomTableCell {...{ row, name: "BeamForming" }} />
                                          <CustomTableCell {...{ row, name: "ScaleFactor" }} />
                                          <CustomTableCell {...{ row, name: "Remask" }} />
                                        </TableRow>
                                      ))}
                                    </TableBody>
                                  </Table>
                                </div>
                              </Paper>
                            </TableCell>
                          </Table>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', marginTop: '2px' }}>
        <Button variant="contained" style={{ color: '#ffffff', backgroundColor: '#53659c', width: '130px', marginLeft: '75%' }}
          onClick={CompareData}
        >Compare</Button>
        <Button variant="contained" style={{ color: '#ffffff', backgroundColor: '#53659c', width: '125px', marginLeft: '2%' }}
          onClick={submitDeviceData}
        >Submit</Button>
      </div>
    </div>
  )
}
