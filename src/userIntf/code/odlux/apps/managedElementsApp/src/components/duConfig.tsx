/**
 * ============LICENSE_START========================================================================
 * ONAP : ccsdk feature sdnr wt odlux
 * =================================================================================================
 * Copyright (C) 2024 RideNext Software Solutions. Pvt Ltd.  All rights reserved
 * =================================================================================================
.
 * ============LICENSE_END==========================================================================
 */
import { useMemo, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { ReactSession } from "react-client-session";
import axios from "axios";
import React, { useEffect, ChangeEvent } from "react";
import { AppBar, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Input, Paper, Stack, Tab, Table, TableBody, TableCell, TableHead, TableRow, Tabs, TextField, Typography, colors, createStyles, listItemSecondaryActionClasses, makeStyles } from '@mui/material';
import { Height, Padding } from "@mui/icons-material";
import { TreeItem, TreeView } from "@mui/lab";
// Icons
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import { WarningOutlined } from "@mui/icons-material";
import { FormControl, Select, InputLabel, MenuItem } from "@mui/material";
import { SelectChangeEvent } from "@mui/material";
import { TableContainer } from '@mui/material';
import { any } from "prop-types";
import { grey } from "@mui/material/colors";
import { Console } from "console";
let nodeId = location.pathname.split("/")[2];
export const DuConfig = () => {
  const [currentTreeIndex, setCurrentTreeIndex] = useState(2);
  let [dudata, setdudata] = useState<any>();
  const [open, setOpen] = React.useState(false);
  const [errors, setErrors] = useState({
    priorityLabelError: false, gNBDUIdError: false, gNBIdLengthError: false, localError: false, remoteError: false,arfcnULError:false,arfcnDLError:false,sapportError:false,ConfigMaxTxPowerError:false,RUIndexIdError:false,
    vlanidError: false, drxharqrttdlError: false, drxharqrttulError: false, logicalchannelError: false, maxulharqtxError: false, maxdlharqtxError: false, IndexError: false,schedulingrequestError:false,RUIndexError:false,
    startRBError: false, NumberOfRBsError: false, NRPCIError: false, NRTACError: false, ta4MinError: false, ta4MaxError: false, t1aMinCpDlError: false, t1aMinCpUlError: false,  SAPHostError:false,RUupmacError: false,
    t1aMinUlError: false, t1aMaxCpDlError: false, t1aMaxCpUlError: false, t1aMaxUpError: false, t12MinError: false, t12MaxError: false, t34MinError: false, t34MaxError: false, RUCountError: false,fhgNBDUIdError: false,RUcpmacError: false,
    t2aMinUpError: false, t2aMaxUpError: false, t2aMinCpDlError: false, t2aMinCpUlError: false, t2aMaxCpDlError: false, t2aMaxCpUlError: false, ta3MinError: false, ta3MaxError: false,macError: false,BandwidthError:false,PriorityError: false,
    CompMethodError: false, UpvalnIdError: false, CpvlanIdError: false, ULElemIndexError: false, ULRbStartError: false, ULRbSizeError: false, ULStartSymbolError: false, ULNumofSymbolError: false, ULBeamIndexError: false,DUIndexError:false,
    ULBfweightUpdateError: false, ULCompMethodError: false, ULIqWidthError: false, ULBeamFormingError: false, ULScaleFactorError: false, ULRemaskError: false, DLElemIndexError: false, DLRbStartError: false, DLRbSizeError: false, 
    DLStartSymbolError: false, DLNumofSymbolError: false, DLBeamIndexError: false, DLBfweightUpdateError: false, DLCompMethodError: false, DLIqWidthError: false, DLBeamFormingError: false, DLScaleFactorError: false, DLRemaskError: false
  });

  const [isEdit, setisEdit] = React.useState(false);
  const [qoserrorindex, setQosErrorIndex] = React.useState<{ [key: number]: { maxulharqtxError: boolean, maxdlharqtxError: boolean,logicalchannel:boolean } }>({
    0: { maxulharqtxError: false, maxdlharqtxError: false,logicalchannel:false },
   });
  const [drxerrorindex, setDrxErrorIndex] = React.useState<{ [key: number]: { drxharqrttulError: boolean, drxharqrttdlError: boolean} }>({
    0: { drxharqrttulError: false, drxharqrttdlError: false },
  });
  const [oduwindowerrorindex, setOduwindowErrorIndex] = React.useState<{ [key: number]: { RUIndexIdError: boolean, RUupmacError: boolean,RUcpmacError: boolean,UpvalnIdError: boolean,CpvlanIdError: boolean,CompMethodError: boolean,macError: boolean} }>({
    0: { RUIndexIdError: false, RUupmacError: false,RUcpmacError: false,UpvalnIdError: false,CpvlanIdError: false,CompMethodError:false, macError: false },
  });
   const [listName, setlistName] = React.useState("");
  const [listTitle, setlistTitle] = React.useState("");
  const [SaveSucesopen, setSaveSucesopen] = React.useState(false);
  const [Sucessmsg, setSucessmsg] = React.useState("");
  const [dialogTitle, setdialogTitle] = React.useState("");
  const [savedialogTitle, setsavedialogTitle] = React.useState("");
  const [ddselectedValue, setddselectedValue] = React.useState("");
  const [sectorConfRow, setSectorConfRow] = React.useState({ id: "", PriorityLabel: "", tXDirection: "", ConfigMaxTxPower: "", arfcnDL: "", arfcnUL: "", bSChannelBwDl: "", bSChannelBwUl: "" });
  const [managedNFServiceRow, setManagedNFServiceRow] = React.useState({ id: "", AdministrativeState: "", saphost: "", sapport: "", operationsName: "", operationsAllowed: "" });
  const [endPointRow, setEndPointRow] = React.useState({ id: "", EndPoint: "", LocalIPAddress: "", VLANID: "", RemoteIPAddress: "" });
  const [drxProfileIdRow, setDrxProfileIdRow] = React.useState({ id: "", drxinactivitytimer: "", drxharqrttdl: "", drxharqrttul: "", drxtransmisdl: "", drxtransmisul: "", drxlongcycle: "" });
  const [schedulingReqConfRow, setSchedulingReqConfRow] = React.useState({ id: "", schedulingrequest: "", scprohibittimer: "", sctransmax: "" });
  const [macParamRow, setMacParamRow] = React.useState({ id: "", Priority: "", AllowedServCells: "" })
  const [SrDelayTimerRow, setSrDelayTimerRow] = React.useState({ id: "",maxpuschduration:"", srdelaytimer: "" });
  const [qosUlRow, setQosUlRow] = React.useState({ id: "", logicalchannel: "", lgalchansrmask: "", prioritrizedbitrate: "", bucketsizedura: "", lsclchansrdelay: "", maxulharqtx: "" });
  const [qosDlRow, setQosDlRow] = React.useState({ id: "",maxpdschduration:"", maxdlharqtx: "" });
  const [scellDeactiveRow, setscellDeactiveRow] = React.useState({ id: "", Index: "", DeactivationTimer: "" })
  const [sectorCarrierRow, setSectorCarrierRow] = React.useState({ id: "", PriorityLabel: "", tXDirection: "", ConfigMaxTxPower: "", arfcnDL: "", arfcnUL: "", bSChannelBwDl: "", bSChannelBwUl: "" });
  const [bwpRow, setBwpRow] = React.useState({ id: "",PriorityLabel: "", bwpContext: "", SubCarrierSpacing: "", cyclePrefix: "", startRB: "", NumberOfRBs: "", isInitiaLBwp: "" });
  const [NRCellDuRow, setNRCellDuRow] = React.useState({ id: "", NRPCI: "", NRTAC: "", ResourceType: "", CellLocalId: "", cellId: "", BwplistId: "", NRSectorCarrierReflistId: "" });
  const[selectedoduwindowdata,setselectedoduwindowdata] = React.useState({
    id: "", RUIndexId: "", RUInstanceId: "", Bandwidth: "", Subcarrierspacing: "", DUmacAddress: "", RUcpmacAddress
      : "", RUupmacAddress: "", CpvlanId: "", UpvalnId: "", CompMethod: ""
  });
   
  const [selectePrbDlRow, setselectePrbDlRow] = React.useState({
    id: "", ElemIndex: "", RbStart: "", RbSize: "", StartSymbol: "", NumofSymbol: "", BeamIndex
      : "", BfweightUpdate: "", CompMethod: "", IqWidth: "", BeamForming: "", ScaleFactor: "", Remask: ""
  });
  const [selectePrbUlRow, setselectePrbUlRow] = React.useState({
    id: "", ElemIndex: "", RbStart: "", RbSize: "", StartSymbol: "", NumofSymbol: "", BeamIndex
      : "", BfweightUpdate: "", CompMethod: "", IqWidth: "", BeamForming: "", ScaleFactor: "", Remask: ""
  });
  const [isFormValid, setIsFormValid] = useState(true);
  const [selectePreconfRURow, setselectePreconfRURow] = React.useState({ id: "", RUIndex: "", RUInstanceId: "" });
  const [currentDu, setcurrentDu] = useState("DU 1");
  const [currentRUI, setcurrentRUI] = useState("RU Instance-1");
  let [ODUWindowDataList, setODUWindowDataList] = React.useState<any[]>([]);
  const [currentqosid, setcurrentqosid] = useState("qos Instance-1");
  let [qoslist, setqoslist] = React.useState<any[]>([]);
  let [srblist, setsrblist] = React.useState<any[]>([]);
  const [currentdrx, setcurrentdrx] = useState("DRX Instance-1");
  let [DrxProfileIdInfoList, setDrxProfileIdInfoList] = React.useState<any[]>([]);
  let [AllowedServCells, setAllowedServCells] = React.useState("");
  let [srdelaytimer, setsrdelaytimer] = React.useState("");
  let [maxpuschduration, setmaxpuschduration] = React.useState("");
  let [ruindexoptions, setruindexoptions] = React.useState<any[]>([]);

  
  const [endPointOptions] = useState([
    { label: 'EP_F1C', value: 'EP_F1C' },
    { label: 'EP_F1U', value: 'EP_F1U' }
    // { label: 'EP_X2U_CUUP', value: 'EP_X2U_CUUP' },
    // { label: 'EP_S1U_CUUP', value: 'EP_S1U_CUUP' }
  ]);
  const [AdministrativeStateOptions] = useState([
    { label: 'LOCKED', value: 'LOCKED' },
    { label: 'UNLOCKED', value: 'UNLOCKED' },
    { label: 'SHUTTINGDOWN', value: 'SHUTTINGDOWN' }
  ]);

  const [txDirectionOptions] = useState([
    { label: 'DL', value: 'DL' },
    { label: 'UL', value: 'UL' },
    { label: 'DL_AND_UL', value: 'DL_AND_UL' }
  ]);
  const [SrDelayTimerOptions] = useState([
    { label: 'true', value: 'true' },
    { label: 'false', value: 'false' },
  ]);
  
  const [Phrtype2OtherCellOptions] = useState([
    { label: 'true', value: 'true' },
    { label: 'false', value: 'false' },
  ]);
  
  const [bSChannelBwDlOptions, setbSChannelBwDlOptions] = useState([
    { label: '5', value: '5' }, { label: '10', value: '10' },
    { label: '15', value: '15' }, { label: '20', value: '20' }, 
    { label: '30', value: '30' },  { label: '40', value: '40' },
    { label: '50', value: '50' }, { label: '60', value: '60' }, 
    { label: '70', value: '70' }, { label: '80', value: '80' },
     { label: '90', value: '90' }, { label: '100', value: '100' }
  ]);
  const [bSChannelBwUlOptions, setbSChannelBwUlOptions] = useState([
    { label: '5', value: '5' }, { label: '10', value: '10' },
    { label: '15', value: '15' }, { label: '20', value: '20' }, 
    { label: '30', value: '30' },  { label: '40', value: '40' },
    { label: '50', value: '50' }, { label: '60', value: '60' }, 
    { label: '70', value: '70' }, { label: '80', value: '80' },
     { label: '90', value: '90' }, { label: '100', value: '100' }
  ]);
  const [DrxInactivityTimerOptions] = useState([
    { label: 'ms0', value: 'ms0' }, { label: 'ms1', value: 'ms1' },
    { label: 'ms2', value: 'ms2' }, { label: 'ms3', value: 'ms3' },
    { label: 'ms4', value: 'ms4' }, { label: 'ms5', value: 'ms5' },
    { label: 'ms6', value: 'ms6' }, { label: 'ms8', value: 'ms8' },
    { label: 'ms10', value: 'ms10' }, { label: 'ms20', value: 'ms20' },
    { label: 'ms30', value: 'ms30' }, { label: 'ms40', value: 'ms40' },
    { label: 'ms50', value: 'ms50' }, { label: 'ms60', value: 'ms60' },
    { label: 'ms80', value: 'ms80' }, { label: 'ms100', value: 'ms100' },
    { label: 'ms200', value: 'ms200' }, { label: 'ms300', value: 'ms300' },
    { label: 'ms500', value: 'ms500' }, { label: 'ms750', value: 'ms750' },
    { label: 'ms1280', value: 'ms1280' }, { label: 'ms1920', value: 'ms1920' },
    { label: 'ms2560', value: 'ms2560' },
  ]);
  const [DrxRetransmissionTimerDLOptions] = useState([
    { label: 'sl0', value: 'sl0' }, { label: 'sl1', value: 'sl1' },
    { label: 'sl2', value: 'sl2' }, { label: 'sl4', value: 'sl4' },
    { label: 'sl6', value: 'sl6' }, { label: 'sl8', value: 'sl8' },
    { label: 'sl16', value: 'sl16' }, { label: 'sl24', value: 'sl24' },
    { label: 'sl28', value: 'sl28' }, { label: 'sl33', value: 'sl33' },
    { label: 'sl40', value: 'sl40' }, { label: 'sl60', value: 'sl60' },
    { label: 'sl64', value: 'sl64' }, { label: 'sl80', value: 'sl80' },
    { label: 'sl96', value: 'sl96' }, { label: 'sl112', value: 'sl112' },
    { label: 'sl320', value: 'sl320' }
  ]);
  const [DrxRetransmissionTimerULOptions] = useState([
    { label: 'sl0', value: 'sl0' }, { label: 'sl1', value: 'sl1' },
    { label: 'sl2', value: 'sl2' }, { label: 'sl4', value: 'sl4' },
    { label: 'sl6', value: 'sl6' }, { label: 'sl8', value: 'sl8' },
    { label: 'sl16', value: 'sl16' }, { label: 'sl24', value: 'sl24' },
    { label: 'sl28', value: 'sl28' }, { label: 'sl33', value: 'sl33' },
     { label: 'sl40', value: 'sl40' },{ label: 'sl60', value: 'sl60' },
    { label: 'sl64', value: 'sl64' }, { label: 'sl80', value: 'sl80' },
    { label: 'sl96', value: 'sl96' }, { label: 'sl112', value: 'sl112' },
    { label: 'sl320', value: 'sl320' }
  ]);

  const [DrxLongCycleOptions] = useState([
    { label: 'ms10', value: 'ms10' }, { label: 'ms20', value: 'ms20' },
    { label: 'ms32', value: 'ms32' }, { label: 'ms40', value: 'ms40' },
    { label: 'ms60', value: 'ms60' }, { label: 'ms64', value: 'ms64' },
    { label: 'ms70', value: 'ms70' }, { label: 'ms80', value: 'ms80' },
    { label: 'ms128', value: 'ms128' }, { label: 'ms160', value: 'ms160' },
    { label: 'ms256', value: 'ms256' }, { label: 'ms320', value: 'ms320' },
    { label: 'ms512', value: 'ms512' }, { label: 'ms640', value: 'ms640' },
    { label: 'ms1024', value: 'ms1024' }, { label: 'ms1280', value: 'ms1280' },
    { label: 'ms2048', value: 'ms2048' }, { label: 'ms2560', value: 'ms2560' },
    { label: 'ms5120', value: 'ms5120' }, { label: 'ms10240', value: 'ms10240' }
     
  ]);
  const [scprohibittimerOption] = useState([
    { label: 'ms0', value: 'ms0' }, { label: 'ms1', value: 'ms1' },
    { label: 'ms2', value: 'ms2' }, { label: 'ms4', value: 'ms4' },
    { label: 'ms8', value: 'ms8' }, { label: 'ms16', value: 'ms16' },
    { label: 'ms32', value: 'ms32' }, { label: 'ms64', value: 'ms64' },
    { label: 'ms128', value: 'ms128' } 
  ]);
  const [sctransmaxOption] = useState([
    { label: 'n4', value: 'n4' }, { label: 'n8', value: 'n8' },
    { label: 'n16', value: 'n16' }, { label: 'n32', value: 'n32' },
    { label: 'n64', value: 'n64' } 
  ]);

  const [AllowedServeCellOptions] = useState([
    { label: 'spcellonly', value: 'spcellonly' },
    { label: 'spcell_Largescell', value: 'spcell_Largescell' },
    { label: 'spcell_largescell_mediumscell', value: 'spcell_largescell_mediumscell' },
    { label: 'spcell_largescell_mediumscell_smallscell', value: 'spcell_largescell_mediumscell_smallscell' },
    { label: 'spcell_largescell_mediumscell_smallscell_4', value: 'spcell_largescell_mediumscell_smallscell_4' },
    { label: 'spcell_largescell_mediumscell_smallscell_5', value: 'spcell_largescell_mediumscell_smallscell_5' },
    { label: 'spcell_largescell_mediumscell_smallscell_6', value: 'spcell_largescell_mediumscell_smallscell_6' },
    { label: 'spcell_largescell_mediumscell_smallscell_7', value: 'spcell_largescell_mediumscell_smallscell_7' }
  ]);

  const [PrioritisedBitrateOptions] = useState([
    { label: 'kBps0', value: 'kBps0' }, { label: 'kBps8', value: 'kBps8' },
    { label: 'kBps16', value: 'kBps16' }, { label: 'kBps32', value: 'kBps32' },
    { label: 'kBps64', value: 'kBps64' }, { label: 'kBps128', value: 'kBps128' },
    { label: 'kBps256', value: 'kBps256' }, { label: 'kBps512', value: 'kBps512' },
    { label: 'kBps1024', value: 'kBps1024' }, { label: 'kBps2048', value: 'kBps2048' },
    { label: 'kBps4096', value: 'kBps4096' }, { label: 'kBps8192', value: 'kBps8192' },
    { label: 'kBps16384', value: 'kBps16384' }, { label: 'kBps32768', value: 'kBps32768' },
    { label: 'kBps65536', value: 'kBps65536' },{ label: 'infinity', value: 'infinity' }
  ]);

  const [BucketSizeDurationOption] = useState([
    { label: 'ms5', value: 'ms5' }, { label: 'ms10', value: 'ms10' },
    { label: 'ms15', value: 'ms15' }, { label: 'ms20', value: 'ms20' },
    { label: 'ms50', value: 'ms50' }, { label: 'ms100', value: 'ms100' },
    { label: 'ms150', value: 'ms150' }, { label: 'ms300', value: 'ms300' },
    { label: 'ms500', value: 'ms500' }, { label: 'ms1000', value: 'ms1000' },
  ]);

  const [LogicalChannelSrDelayTimerOptions] = useState([
    { label: 'sf20', value: 'sf20' }, { label: 'sf40', value: 'sf40' },
    { label: 'sf64', value: 'sf64' }, { label: 'sf128', value: 'sf128' },
    { label: 'sf512', value: 'sf512' }, { label: 'sf1024', value: 'sf1024' },
    { label: 'sf2560', value: 'sf2560' }
  ]);
  const [PeriodicityBsrTimerOptions] = useState([
    { label: 'sf1', value: 'sf1' }, { label: 'sf5', value: 'sf5' },
    { label: 'sf10', value: 'sf10' }, { label: 'sf16', value: 'sf16' },
    { label: 'sf20', value: 'sf20' }, { label: 'sf32', value: 'sf32' },
    { label: 'sf40', value: 'sf40' }, { label: 'sf64', value: 'sf64' },
    { label: 'sf80', value: 'sf80' }, { label: 'sf128', value: 'sf128' },
    { label: 'sf160', value: 'sf160' }, { label: 'sf320', value: 'sf320' },
    { label: 'sf640', value: 'sf640' }, { label: 'sf1280', value: 'sf1280' },
    { label: 'sf2560', value: 'sf2560' }, { label: 'infinity', value: 'infinity' }
  ]);
  const [RetxBsrTimerOptions] = useState([
    { label: 'sf10', value: 'sf10' }, { label: 'sf20', value: 'sf20' },
    { label: 'sf40', value: 'sf40' }, { label: 'sf80', value: 'sf80' },
    { label: 'sf160', value: 'sf160' }, { label: 'sf320', value: 'sf320' },
    { label: 'sf640', value: 'sf640' }, { label: 'sf1280', value: 'sf1280' },
    { label: 'sf2560', value: 'sf2560' }, { label: 'sf5120', value: '5120' },
    { label: 'sf10240', value: 'sf10240' }
  ]);
  const [PhrPeriodicTimerOptions] = useState([
    { label: 'sf10', value: 'sf10' }, { label: 'sf20', value: 'sf20' },
    { label: 'sf50', value: 'sf50' }, { label: 'sf100', value: 'sf100' },
    { label: 'sf200', value: 'sf200' }, { label: 'sf500', value: 'sf500' },
    { label: 'sf1000', value: 'sf1000' }, { label: 'infinity', value: 'infinity' }
  ]);
  const [PhrProhibitTimerOptions] = useState([
    { label: 'sf0', value: 'sf0' }, { label: 'sf10', value: 'sf10' },
    { label: 'sf20', value: 'sf20' }, { label: 'sf50', value: 'sf50' },
    { label: 'sf100', value: 'sf100' }, { label: 'sf200', value: 'sf200' },
    { label: 'sf500', value: 'sf500' }, { label: 'sf1000', value: 'sf1000' }
  ]);
  const [PhrTxPowerFactorChangeOptions] = useState([
    { label: 'db1', value: 'db1' }, { label: 'db3', value: 'db3' },
    { label: 'db6', value: 'db6' }, { label: 'infinity', value: 'infinity' },
  ]);
  const [PhrModeOtherCgOptions] = useState([
    { label: 'real', value: 'real' }, { label: 'virtual', value: 'virtual' }
  ]);
  const [scellDeactivationTimerOption] = useState([
    { label: 'ms20', value: 'ms20' }, { label: 'ms40', value: 'ms40' },
    { label: 'ms80', value: 'ms80' }, { label: 'ms160', value: 'ms160' },
    { label: 'ms200', value: 'ms200' }, { label: 'ms240', value: 'ms240' },
    { label: 'ms320', value: 'ms320' }, { label: 'ms400', value: 'ms400' },
    { label: 'ms480', value: 'ms480' }, { label: 'ms520', value: 'ms520' },
    { label: 'ms640', value: 'ms640' }, { label: 'ms720', value: 'ms720' },
    { label: 'ms840', value: 'ms840' }, { label: 'ms1280', value: 'ms1280' },
    { label: 'infinity', value: 'infinity' }
  ]);
  const [MaxpuschdurationOptions] = useState([
    { label: 'ms0p02', value: 'ms0p02' }, { label: 'ms0p04', value: 'ms0p04' },
    { label: 'ms0p0625', value: 'ms0p0625' }, { label: 'ms0p125', value: 'bms0p125' },
    { label: 'ms0p25', value: 'ms0p25' }, { label: 'ms0p5', value: 'ms0p5' }
  ]);
  const [MaxpdschdurationOptions] = useState([
    { label: 'ms0p02', value: 'ms0p02' }, { label: 'ms0p04', value: 'ms0p04' },
    { label: 'ms0p0625', value: 'ms0p0625' }, { label: 'ms0p125', value: 'ms0p125' },
    { label: 'ms0p25', value: 'ms0p25' }, { label: 'ms0p5', value: 'ms0p5' }
  ]);
  const [bwpContextOptions] = useState([
    { label: 'DL', value: 'DL' }, { label: 'UL', value: 'UL' },
    { label: 'SUL', value: 'SUL' }
  ]);
  const [subCarrierSpacingOptions] = useState([
    { label: '15', value: '15' }, { label: '30', value: '30' },
    { label: '60', value: '60' }, { label: '120', value: '120' }
  ]);
  const [BandwidthOptions] = useState([
    { label: '200', value: '200' }, { label: '1400', value: '1400' },
    { label: '3000', value: '3000' }, { label: '5000', value: '5000' },
    { label: '10000', value: '10000' }, { label: '15000', value: '15000' },
    { label: '20000', value: '20000' }, { label: '25000', value: '25000' },
    { label: '30000', value: '30000' }, { label: '40000', value: '40000' },
    { label: '50000', value: '50000' }, { label: '60000', value: '60000' },
    { label: '70000', value: '70000' }, { label: '80000', value: '80000' },
    { label: '90000', value: '90000' }, { label: '100000', value: '100000' },
    { label: '200000', value: '200000' }, { label: '400000', value: '400000' }
  ]);
  const [CyclePrefixOptions] = useState([
    { label: 'NORMAL', value: 'NORMAL' }, { label: 'EXTENDED', value: 'EXTENDED' }
  ]);
  const [IsInitialBwpOptions] = useState([
    { label: 'INITIAL', value: 'INITIAL' }, { label: 'OTHER', value: 'OTHER' }
  ]);
  const [peeParametersOptions, setpeeParametersOptions] = React.useState<any[]>([]);
  const [cellLocalIdOptions, setcellLocalIdOptions] = React.useState<any[]>([]);
  const [rrmPolicyListOptions, setrrmPolicyListOptions] = React.useState<any[]>([]);
  const [cellIdOptions, setcellIdOptions] = React.useState<any[]>([]);
  const [bwpIdOptions, setbwpIdOptions] = React.useState<any[]>([]);
  const [NRSectorCarrierlistIdOptions, setNRSectorCarrierlistIdOptions] = React.useState<any[]>([]);
  const [selectedoduwindowindex,setselectedoduwindowindex]=React.useState<any>(0);
  const[selectedodulength,setselectedodulength]=React.useState<any>(0);
  const [selectedqosindex,setselectedqosindex]=React.useState<any>(0);
  const [selecteddrxindex,setselectedrxindex]=React.useState<any>(0);
  let [duConfigdata, setduConfigdata] = React.useState<any[]>([]);

  const [resourceTypeOptions, setResourceTypeOptions] = useState([
    { label: 'PRB', value: 'PRB' },
    { label: 'RRC', value: 'RRC' },
    { label: 'DRB', value: 'DRB' }
  ]);
  const [NRresourceTypeOptions, setNRResourceTypeOptions] = useState([
    { label: 'PRB', value: 'PRB' },
    { label: 'RRC', value: 'RRC' },
    { label: 'DRB', value: 'DRB' }
  ]);
  const [MethodOptions, setMethodOptions] = useState([
    { label: 'HARDCODED', value: 'HARDCODED' },
    { label: 'CONFIGURED', value: 'CONFIGURED' },
  ]);
  const [SyncStateOptions, setSyncStateOptions] = useState([
    { label: 'LOCKED', value: 'LOCKED' },
    { label: 'HOLDOVER', value: 'HOLDOVER' },
    { label: 'FREERUN', value: 'FREERUN' },
  ]);
  const [ConfigStatusOptions, setConfigStatusOptions] = useState([
    { label: 'CONFIGURED', value: 'CONFIGURED' },
    { label: 'NOT_CONFIGURED', value: 'NOT_CONFIGURED' },
  ]);

  let handCellClick = (currentdu: string) => {
    setCurrentTreeIndex(2);
    setcurrentDu(currentdu)
    let seletedduData = duConfigdata?.find(function (dudata: any) {
      return dudata.DuId === currentdu;
    });
    setdudata(seletedduData);
  }

  const [selectedResourceType, setSelectedResourceType] = useState("");
  const [selectedPeeParameters, setSelectedPeeParameters] = useState("");
  // Add state variables for selected options
  const [selectedCellLocalId, setSelectedCellLocalId] = useState("");
  const [selectedRrmPolicyList, setSelectedRrmPolicyList] = useState("");
  const [selectedCellId, setSelectedCellId] = useState("");
  const [selectedConfigStatus, setSelectedConfigStatus] = useState("");
  const [selectedMethod, setSelectedMethod] = useState("");
  const [selectedSyncState, setSelectedSyncState] = useState("");
  const [selectedPeriodicityBsrTimer, setselectedPeriodicityBsrTimer] = useState("");
  const [selectedLogicalChannelSrdelayTimer, setselectedLogicalChannelSrdelayTimer] = useState("");
  const [selectedRctxBsrTimer, setselectedRctxBsrTimer] = useState("");
  const [selectedPhrPeriodicTimer, setselectedPhrPeriodicTimer] = useState("");
  const [selectedPhrProhibitTimer, setselectedPhrProhibitTimer] = useState("");
  const [selectedPhrTxpowerFactorchange, setselectedPhrTxpowerFactorchange] = useState("");
  const [selectedPhrModeOthercg, setselectedPhrModeOthercg] = useState("");
  const [selectedPhrType2OtherCell, setselectedPhrType2OtherCell ] = useState("");
  const [selectedNRResourceType, setSelectedNRResourceType] = useState("");
  // const [selectedODUSubcarrierspacing, setSelectedODUSubcarrierspacing] = useState("");
  // const [selectedbSChannelBwDl, setselectedbSChannelBwDl] = useState("");
  // const [selectedbSChannelBwUl, setselectedbSChannelBwUl] = useState("");

  useEffect(() => {
    setddselectedValue(ddselectedValue);
  }, [])
  useEffect(()=>{
    setqoslist(qoslist)
 },[qoslist]);
 useEffect(()=>{
  setsrblist(srblist)
},[srblist]);
useEffect(()=>{
  setDrxProfileIdInfoList(DrxProfileIdInfoList)
},[DrxProfileIdInfoList]);
  useEffect(()=>{
     setODUWindowDataList(ODUWindowDataList)
  },[ODUWindowDataList]);
  useEffect(() => {
    setSelectedResourceType(dudata?.resourceType || "");
    setSelectedPeeParameters(dudata?.peeParameters || "");
    //setSelectedCellLocalId(dudata?.cellLocalId || "");
    setSelectedRrmPolicyList(dudata?.rrmPolicyList || "");
    //setSelectedCellId(dudata?.cellId || "");
    setSelectedMethod(dudata?.Method || "");
    setSelectedConfigStatus(dudata?.ConfigStatus || "");
    setSelectedSyncState(dudata?.SyncState || "");
    setselectedPeriodicityBsrTimer(dudata?.periodicityBsrTimer || "");
    setselectedLogicalChannelSrdelayTimer(dudata?.LogicalChannelSrdelayTimer || "");
    setselectedRctxBsrTimer(dudata?.RctxBsrTimer || "");
    setselectedPhrTxpowerFactorchange(dudata?.PhrTxpowerFactorchange || "");
    setselectedPhrModeOthercg(dudata?.PhrModeOthercg || "");
    setselectedPhrPeriodicTimer(dudata?.phrPeriodicTimer || "");
    setselectedPhrProhibitTimer(dudata?.phrProhibitTimer || "");
    setselectedPhrType2OtherCell(dudata?.PhrType2OtherCell || "");
    setSelectedNRResourceType(dudata?.nrresourceType || "");
    // setSelectedODUSubcarrierspacing(dudata?.Subcarrierspacing || "");
  }, [dudata]);

  const location = useLocation();
  let nodeId = location.pathname.split('/')[2]
  useEffect(() => {
    nodeId = location.pathname.split('/')[2];
    //alert(container_name);
    fetchDuConfigData(nodeId);
    fetchBasicConfigData(nodeId);
    fetchCellConfigData(nodeId);
  }, [currentDu])


  const fetchBasicConfigData = (nodeId: any) => {
   // nodeId = "node2";
    const baseUri = `${window.location.origin}`;
    const DbPath = baseUri + "/basic_config/_doc/" + nodeId;
    const newPeeParameters: any[] = []
    const newRRMPolicyList: any[] = []
    const newCellLocalIdList: any[] = []
    axios.get(DbPath).then((res: any) => {
      var PeerParameterList = res.data._source.basicdata.PeerParameterList;

      PeerParameterList.map((row: any) => {
        return newPeeParameters.push(addPeeParametersList(row.siteIdentification, row.siteIdentification));
      });
      setpeeParametersOptions(newPeeParameters);

      var RRMPolicyList = res.data._source.basicdata.RRMPolicyList;
      // RRMPolicyList.map((row: any) => {
      //   return newRRMPolicyList.push(addRRMPolicyList(row.Name, row.Name));
      // });
      setrrmPolicyListOptions(RRMPolicyList);

      var CellLocalIdList = res.data._source.basicdata.CellLocalId;

      CellLocalIdList.map((row: any) => {
        return newCellLocalIdList.push(addCellLocalIdList(row.CellLocalId, row.CellLocalId));
      });
      setcellLocalIdOptions(newCellLocalIdList);
    }).catch((err: any) => {
        console.log(err);
      })
  }

  const fetchCellConfigData = (nodeId: any) => {
  //  nodeId = "node2";
  const baseUri = `${window.location.origin}`;
    const DbPath =  baseUri+"/cell_config/_search/";
    const query = {
      "_source": ["cellConfigdata.cellId"],
      "query": {
        "term": {
          "_id": nodeId
        }
      }

    }

    setcellIdOptions([])

    axios.post(DbPath, query).then((res) => {
      const newCellIdList = cellIdOptions.map(row => {
        return row;
      })
      var CellIdList = res.data.hits.hits[0]._source.cellConfigdata;

      CellIdList.map((row: any) => {
        return newCellIdList.push(addCellIdList(row.cellId, row.cellId));
      });
      setcellIdOptions(newCellIdList);
    })
      .catch((err: any) => {
        console.log(err);
      })

  }

  // const addRRMPolicyList = (label: string, value: string) => ({
  //   label,
  //   value,
  // });

  const addPeeParametersList = (label: string, value: string) => ({
    label,
    value,
  });

  const addCellLocalIdList = (label: string, value: string) => ({
    label,
    value,
  });

  const addCellIdList = (label: string, value: string) => ({
    label,
    value,
  });

  const fetchDuConfigData = (nodeId: any) => {
    let duResdata: any;
    //nodeId = "node2";
    const baseUri = `${window.location.origin}`;
    const DbPath = baseUri + "/du_config/_doc/" + nodeId;

    const newsectorconfigurationrows: any[] = []

    axios.get(DbPath).then((res: any) => {
      console.log(res)
      let Resdata = res.data._source.duConfigdata;
      setduConfigdata(Resdata);
      let duResdata = Resdata.find(function (dudata: any) {
        return dudata.Duid === currentDu;
      });

      //sectorconfigurationList
      if (duResdata) {
        setdudata(duResdata);
        console.log(duResdata)
        // if (duResdata.SectorconfigurationDataList) {
        //   duResdata.SectorconfigurationDataList.map((row: any) => {
        //     return newsectorconfigurationrows.push(AddnewSectorConfigurationData(row.PriorityLabel, row.tXDirection, row.ConfigMaxTxPower, row.arfcnDL, row.arfcnUL, row.bSChannelBwDl, row.bSChannelBwUl));
        //   });
        //   setsectorconfigurationrows(newsectorconfigurationrows);
        // }
        // else {
        //   setsectorconfigurationrows([]);
        // }
        //PlmnInfo

        if (duResdata.ManagedNFServiceList) {
          const newManagedNFServiceRows: any[] = []
          duResdata.ManagedNFServiceList.map((row: any,index:number) => {
            return newManagedNFServiceRows.push(createManagedNFServiceInfo(index.toString(),row.AdministrativeState, row.saphost, row.sapport, row.operationsName, row.operationsAllowed));
          });
          setManagedNFServicerows(newManagedNFServiceRows);
        }
        else {
          setManagedNFServicerows([]);
        }

        if (duResdata.EndPointList) {
          const newEndpointRows: any[] = []
          duResdata.EndPointList.map((row: any) => {
            return newEndpointRows.push(createEndPointInfo(row.EndPoint, row.LocalIPAddress, row.VLANID, row.RemoteIPAddress));
          });
          setendpointrows(newEndpointRows);
        }
        else {
          setendpointrows([]);
        }
        if (duResdata.srDelayTimerInfoList) {
          const newsrdelaytimerRows: any[] = []
          duResdata.srDelayTimerInfoList.map((row: any) => {
            return newsrdelaytimerRows.push(createSrDelayTimerInfo(row.maxpuschduration,row.srdelaytimer));
          });
          setsrdelaytimerrows(newsrdelaytimerRows);

        }
        else {
          setsrdelaytimerrows([])
        }

        if (duResdata.ScellDeactiveInfoList) {
          const newScelldeactiveRows: any[] = []
          duResdata.ScellDeactiveInfoList.map((row: any,index:number) => {
            return newScelldeactiveRows.push(createScellDeactiveInfo(index.toString(),row.Index, row.DeactivationTimer));
          });
          setScelldeactiverows(newScelldeactiveRows);

        }
        else {
          setScelldeactiverows([]);
        }
        if (duResdata.SectorCarrierList) {
          const newssectorcarrierRows: any[] = []
          const newssectorcarrierRowslist: any[] = []
          duResdata.SectorCarrierList.map((row: any) => {
            newssectorcarrierRowslist.push(row.id)
            return newssectorcarrierRows.push(AddnewSectorCarrierData(row.id, row.PriorityLabel, row.tXDirection, row.ConfigMaxTxPower, row.arfcnDL, row.arfcnUL, row.bSChannelBwDl, row.bSChannelBwUl));
          });
          console.log(newssectorcarrierRowslist)
          setsectorcarrierrows(newssectorcarrierRows);
          setNRSectorCarrierlistIdOptions(newssectorcarrierRowslist);
        }
        else {
          setsectorcarrierrows([]);
          setNRSectorCarrierlistIdOptions([]);
        }
        if (duResdata.BwpList) {
          const newsbwpRows: any[] = []
          const newsbwpRowslist: any[] = []
          duResdata.BwpList.map((row: any) => {
            newsbwpRowslist.push(row.id)
            return newsbwpRows.push(AddBwpData(row.id, row.PriorityLabel, row.bwpContext, row.SubCarrierSpacing, row.cyclePrefix, row.startRB, row.NumberOfRBs, row.isInitiaLBwp));
          });
          console.log(newsbwpRowslist)
          setbwprows(newsbwpRows);
          setbwpIdOptions(newsbwpRowslist);

        }
        else {
          setbwprows([]);
          setbwpIdOptions([]);
        }
        if (duResdata.NRCellDUList) {
          const newsNRCellDuRows: any[] = []
          duResdata.NRCellDUList.map((row: any,index:number) => {
            return newsNRCellDuRows.push(AddNRCellDuData(index.toString(),row.NRPCI, row.NRTAC, row.ResourceType, row.CellLocalId, row.cellId, row.BwplistId, row.NRSectorCarrierReflistId));
          });
          setNRCellDurows(newsNRCellDuRows);

        }
        else {
          setNRCellDurows([]);
        }
        if (duResdata.PreconfRUProfileList) {
          const newPreconfRUrows: any[] = []
          duResdata.PreconfRUProfileList.map((row: any) => {
            return newPreconfRUrows.push(createPreconfRUProfile(row.RUIndex, row.RUInstanceId));
          });
          console.log(newPreconfRUrows)
          setPreconfRUrows(newPreconfRUrows);
          setruindexoptions(newPreconfRUrows)
        }
        else {
          setPreconfRUrows([])
          setruindexoptions([])
        }
        setDrxProfileIdInfoList(duResdata?.DrxProfileIdInfoList);
        console.log("DrxProfileIdInfoList du resdata", duResdata?.DrxProfileIdInfoList);
        const drxerrorlist={}
        duResdata?.DrxProfileIdInfoList.map((drx:any,index:number)=>{
          drxerrorlist[drx.id]={drxharqrttulError:false,drxharqrttdlError:false}
        })
        console.log(drxerrorlist)
        setDrxErrorIndex(drxerrorlist)
        setsrblist(duResdata?.srblist);
        console.log("duresdata of MacParamInfoList", duResdata?.srblist);
        setqoslist(duResdata?.qoslist);
        console.log("duresdata of qos list", duResdata?.qoslist.length);
        const qoserrorlist={}
        duResdata?.qoslist.map((qos:any,index:number)=>{
          qoserrorlist[qos.id]={maxdlharqtxError:false,maxulharqtxError:false,logicalchannel:false}
        })
        console.log(qoserrorlist)
        setQosErrorIndex(qoserrorlist)

        setODUWindowDataList(duResdata?.ODUWindowDataList);
        console.log("duresdata of odu list", duResdata?.ODUWindowDataList);        
        duResdata?.ODUWindowDataList?.length > 0 ? setselectedoduwindowdata(duResdata?.ODUWindowDataList[0]) : null
        const oduwindowerrorlist={}
        duResdata?.ODUWindowDataList.map((odu:any,index:number)=>{
          oduwindowerrorlist[odu.id]={RUIndexIdError: false, RUupmacError: false,RUcpmacError: false,UpvalnIdError: false,CpvlanIdError: false,CompMethodError:false, macError: false }
        })
        console.log(oduwindowerrorlist)
        setOduwindowErrorIndex(oduwindowerrorlist)
      }
      else {
        setdudata({});
        console.log(duResdata)
        setsectorconfigurationrows([]);
        setManagedNFServicerows([]);
        setendpointrows([]);
        setdrxprofileidrows([]);
        setschedulingreqconfrows([]);
        setmacparamrows([]);
        setsrdelaytimerrows([]);
        setqosulrows([]);
        setqosdlrows([]);
        setScelldeactiverows([]);
        setsectorcarrierrows([]);
        setbwprows([]);
        setNRCellDurows([]);
        setODUWindowRows([]);
        setPrbDlrows([]);
        setPrbUlrows([]);
        setPreconfRUrows([]);
        setruindexoptions([])
      }

    }).catch((err: { response: { data: { error: { type: string; }; }; }; message: any; }) => {
      console.log(err);
      if (err.response.data.error.type && err.response.data.error.type == 'index_not_found_exception') {
        var uri4 = (baseUri) + '/du_config/';
        axios.put(uri4)
          .then((res: any) => {
            console.log(res);
          }).catch((err: any) => {
            console.log(err);
          })
      }
    })
  }


  const AddnewSectorConfigurationData = (PriorityLabel: string, tXDirection: string, ConfigMaxTxPower: string, arfcnDL: string, arfcnUL: string, bSChannelBwDl: string, bSChannelBwUl: string) => ({
    id: PriorityLabel,
    PriorityLabel,
    tXDirection,
    ConfigMaxTxPower,
    arfcnDL,
    arfcnUL,
    bSChannelBwDl,
    bSChannelBwUl,
    // isEditMode: true
  });

  const createManagedNFServiceInfo = (id:string,AdministrativeState: string, saphost: string, sapport: string, operationsName: string, operationsAllowed: string) => ({
    id: id,
    AdministrativeState,
    saphost,
    sapport,
    operationsName,
    operationsAllowed
  });

  const createEndPointInfo = (EndPoint: string, LocalIPAddress: string, VLANID: string, RemoteIPAddress: string) => ({
    id: EndPoint.replace(" ", "_"),
    EndPoint,
    LocalIPAddress,
    VLANID,
    RemoteIPAddress,
  });



  const createSchedulingReqConfInfo = (id:string,schedulingrequest: string, scprohibittimer: string, sctransmax: string) => ({
    id: id,
    schedulingrequest,
    scprohibittimer,
    sctransmax,
  });

  const createMacParamInfo = (Priority: string, AllowedServCells: string) => ({
    id: Priority,
    Priority,
    AllowedServCells,
  });

  const createSrDelayTimerInfo = (maxpuschduration:string,srdelaytimer: string) => ({
    id: srdelaytimer,
    maxpuschduration,
    srdelaytimer,
    
  });

  const createScellDeactiveInfo = (id:string,Index: string, DeactivationTimer: string) => ({
    id: id,
    Index,
    DeactivationTimer,
  });

  const AddnewSectorCarrierData = (id: string, PriorityLabel: string, tXDirection: string, ConfigMaxTxPower: string, arfcnDL: string, arfcnUL: string, bSChannelBwDl: string, bSChannelBwUl: string) => ({
    id: id,
    PriorityLabel,
    tXDirection,
    ConfigMaxTxPower,
    arfcnDL,
    arfcnUL,
    bSChannelBwDl,
    bSChannelBwUl,
  });

  const AddBwpData = (id: string, PriorityLabel: string, bwpContext: string, SubCarrierSpacing: string, cyclePrefix: string, startRB: string, NumberOfRBs: string, isInitiaLBwp: string) => ({
    id: id,
    PriorityLabel,
    bwpContext,
    SubCarrierSpacing,
    cyclePrefix,
    startRB,
    NumberOfRBs,
    isInitiaLBwp,
  });

  const AddNRCellDuData = (id:string,NRPCI: string, NRTAC: string, ResourceType: string, CellLocalId: string, cellId: string, BwplistId: string, NRSectorCarrierReflistId: string) => ({
    id: id,
    NRPCI,
    NRTAC,
    ResourceType,
    CellLocalId,
    cellId,
    BwplistId,
    NRSectorCarrierReflistId,
  });

  const createPrbDlInfo = (id:string,ElemIndex: string, RbStart: string, RbSize: string, StartSymbol: string, NumofSymbol: string, BeamIndex: string,
    BfweightUpdate: string, CompMethod: string, IqWidth: string, BeamForming: string, ScaleFactor: string, Remask: string) => ({
      id,
      ElemIndex,
      RbStart,
      RbSize,
      StartSymbol,
      NumofSymbol,
      BeamIndex,
      BfweightUpdate,
      CompMethod,
      IqWidth,
      BeamForming,
      ScaleFactor,
      Remask,
    });

  const createPrbUlInfo = (id:string,ElemIndex: string, RbStart: string, RbSize: string, StartSymbol: string, NumofSymbol: string, BeamIndex
    : string, BfweightUpdate: string, CompMethod: string, IqWidth: string, BeamForming: string, ScaleFactor: string, Remask: string) => ({
      id,
      ElemIndex,
      RbStart,
      RbSize,
      StartSymbol,
      NumofSymbol,
      BeamIndex,
      BfweightUpdate,
      CompMethod,
      IqWidth,
      BeamForming,
      ScaleFactor,
      Remask,
    });

  const createPreconfRUProfile = (RUIndex: string, RUInstanceId: string) => ({
    id: RUIndex,
    RUIndex,
    RUInstanceId,
  });

  const CustomTableCell = ({ row, name }: { row: any, name: any }) => {
    return (
      <TableCell align="center" style={{ width: '110px', height: '10px' }}>
        {row[name]}
      </TableCell>
    );
  };

  let [sectorconfigurationrows, setsectorconfigurationrows] = React.useState<any[]>([]);
  let [ManagedNFServicerows, setManagedNFServicerows] = React.useState<any[]>([]);
  let [endpointrows, setendpointrows] = React.useState<any[]>([]);
  let [drxprofileidrows, setdrxprofileidrows] = React.useState<any[]>([]);
  let [schedulingreqconfrows, setschedulingreqconfrows] = React.useState<any[]>([]);
  let [macparamrows, setmacparamrows] = React.useState<any[]>([]);
  let [srdelaytimerrows, setsrdelaytimerrows] = React.useState<any[]>([]);
  let [qosulrows, setqosulrows] = React.useState<any[]>([]);
  let [qosdlrows, setqosdlrows] = React.useState<any[]>([]);
  let [Scelldeactiverows, setScelldeactiverows] = React.useState<any[]>([]);
  let [sectorcarrierrows, setsectorcarrierrows] = React.useState<any[]>([]);
  let [bwprows, setbwprows] = React.useState<any[]>([]);
  let [NRCellDurows, setNRCellDurows] = React.useState<any[]>([]);
  let [ODUWindowrows, setODUWindowRows] = React.useState<any[]>([]);
  let [ODUWindowrow, setODUWindowRow] = React.useState<any[]>([]);
  let [PrbDlrows, setPrbDlrows] = React.useState<any[]>([]);
  let [PrbUlrows, setPrbUlrows] = React.useState<any[]>([]);
  let [PreconfRUrows, setPreconfRUrows] = React.useState<any[]>([]);
  let [qosrow, setqosRow] = React.useState<any[]>([]);
  let [DrxProfileIdInfoListrow, setDrxProfileIdInfoListRow] = React.useState<any[]>([]);;

  const handleError = (name: any, value: any) => {
    setErrors(prevErrors => ({
      ...prevErrors,
      [name]: value
    }));
  };
  const isValidMacAddress = (mac:any) => {
    const macRegex = /^[0-9a-fA-F]{2}(:[0-9a-fA-F]{2}){5}$/;
    return macRegex.test(mac);
  };
  const isValidLocalIPAddress = (ip: any) => {
    const ipPattern = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    return ipPattern.test(ip);
  }
  const isValidRemoteIPAddress = (ip: any) => {
    const ipPattern = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    return ipPattern.test(ip);
  }
  const isValidSAPHost = (ip: any) => {
    const ipPattern = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    return ipPattern.test(ip);
  }

  const ongeneralconfigTextChange = (e: any) => {
    const value = e.target.value;
    const name = e.target.id;
    let valid = true
    if (name == 'userLabel') {
      setdudata({
        ...dudata,
        userLabel: e.target.value,
      });
    }
    if (name === 'gNBDUId') {
      const inputValue = value; // Assuming value is the input from the event
    
      // Allow the input to be empty for manual deletion
      setdudata({
        ...dudata,
        [name]: inputValue,
      });
    
      // Check for mandatory field
      if (inputValue.trim() === '') {
        handleError('gNBDUIdError', true); // Field is mandatory
      } else if (/^\d*$/.test(inputValue) && Number(inputValue) >= 0 && Number(inputValue) <= 68719476735) {
        handleError('gNBDUIdError', false); // No error
      } else {
        handleError('gNBDUIdError', true); // Validation error
      }
    }
    

    if (name === 'gNBIdLength') {
      const inputValue = e.target.value;      
      // Allow the input to be empty for manual deletion
      setdudata({
        ...dudata,
        gNBIdLength: inputValue,
      });    
      const newValue = Number(inputValue);    
      // Check for mandatory field
      if (inputValue.trim() === '') {
        handleError('gNBIdLengthError', true); // Field is mandatory
      } else if (!isNaN(newValue)) {
        if (newValue >= 22 && newValue <= 32) {
          setdudata({
            ...dudata,
            gNBIdLength: newValue,
          });
          handleError('gNBIdLengthError', false); // No error
        } else {
          handleError('gNBIdLengthError', true); // Validation error
        }
      } 
    }
    
    
    if (name === 'priorityLabel') {
      // Allow the input to be empty for manual deletion
      setdudata({
        ...dudata,
        [name]: value,
      });
  
      if (value.trim() === '') {
        handleError('priorityLabelError', true); // Field is mandatory
      } else if (/^\d*$/.test(value) && Number(value) >= 0 && Number(value) <= 4294967295) {
        handleError('priorityLabelError', false); // No error
      } else {
        handleError('priorityLabelError', true); // Validation error
      }
    
  };
    
    valid = !errors.priorityLabelError && !errors.gNBIdLengthError && !errors.gNBDUIdError  ;
    setIsFormValid(valid);
  }

  const onSectorConfigurationTextChange = (e: any) => {
    const value = e.target.value;
    const name = e.target.id;
     let valid = true;

    if (name === 'PriorityLabel') {
      if (/^\d*$/.test(value) && Number(value) >= 0 && Number(value) <= 4294967295)  {
        setSectorConfRow({
          ...sectorConfRow,
          [name]: value,
        });
        handleError('priorityLabelError', false);

      } else {
        handleError('priorityLabelError', true);
      }
         
    }
    if (name == 'tXDirection') {
      setSectorConfRow({
        ...sectorConfRow,
        tXDirection: e.target.value,
      });
    }
    if (name == 'ConfigMaxTxPower') {
      if (/^\d*$/.test(value) && Number(value) >= -2147483648 && Number(value) <= 2147483647)  {
            setSectorConfRow({
          ...sectorConfRow,
          [name]: value,
        });
        handleError('ConfigMaxTxPowerError', false);
      } else {
        handleError('ConfigMaxTxPowerError', true);
      }
    }
    if (name == 'arfcnDL') {
      if (/^\d*$/.test(value) && Number(value) >= 0 && Number(value) <=3279165)  {
               setSectorConfRow({
          ...sectorConfRow,
          [name]: value,
        });
        handleError('arfcnDLError', false);
      } else {
        handleError('arfcnDLError', true);
      }
    }
    if (name == 'arfcnUL') {
      if (/^\d*$/.test(value) && Number(value) >= 0 && Number(value) <=3279165)  {
        setSectorConfRow({
          ...sectorConfRow,
          [name]: value,
        });
        handleError('arfcnULError', false);
      } else {
        handleError('arfcnULError', true);
      }
    }
    if (name == 'bSChannelBwDl') {
      setSectorConfRow({
        ...sectorConfRow,
        bSChannelBwDl: e.target.value,
      });
    }
    if (name == 'bSChannelBwUl') {
      setSectorConfRow({
        ...sectorConfRow,
        bSChannelBwUl: e.target.value,
      });
    }
    valid = !errors.priorityLabelError && !errors.ConfigMaxTxPowerError && !errors.arfcnDLError && !errors.arfcnULError ;
    setIsFormValid(valid);
  }
  const onManagedNFServiceTextChange = (e: any) => {
    const value = e.target.value;
    const name = e.target.id;
    let valid = true;
    if (name == 'AdministrativeState') {
      setManagedNFServiceRow({
        ...managedNFServiceRow,
        AdministrativeState: e.target.value,
      });
    }
    if (name == 'saphost') {
      setManagedNFServiceRow((prev) => ({ ...prev, saphost: value }));

      if (isValidSAPHost(value)) {
        handleError('SAPHostError', false);
      } else {
        handleError('SAPHostError', true);
      }
    }
    if (name == 'sapport') {
      if (/^\d*$/.test(value) && Number(value) >=-2147483648 && Number(value) <=2147483647 )  {
        setManagedNFServiceRow({
          ...managedNFServiceRow,
          [name]: value,
        });
        handleError('sapportError', false);
      } else {
        handleError('sapportError', true);
      }
    }
         
    if (name == 'operationsName') {
      setManagedNFServiceRow({
        ...managedNFServiceRow,
        operationsName: e.target.value,
      });
    }
    if (name == 'operationsAllowed') {
      setManagedNFServiceRow({
        ...managedNFServiceRow,
        operationsAllowed: e.target.value,
      });
    }
    valid = !errors.sapportError && !errors.SAPHostError  ;
    setIsFormValid(valid);
  }
  const onEndPointTextChange = (e: any) => {
    const value = e.target.value;
    const name = e.target.id;
     let valid = true;
    if (name == 'EndPoint') {
      setEndPointRow({
        ...endPointRow,
        EndPoint: e.target.value,
      });
    }
    if (name === 'LocalIPAddress') {
      setEndPointRow((prev) => ({ ...prev, LocalIPAddress: value }));

      if (isValidLocalIPAddress(value)) {
        handleError('localError', false);
      } else {
        handleError('localError', true);
      }
    }
    if (name === 'VLANID') {
      //unsigned integer 16 bits within range of 0 to 65535
      if (/^\d*$/.test(value) && Number(value) >= 0 && Number(value) <= 65535) {
        setEndPointRow({
          ...endPointRow,
          [name]: value,
        });
        handleError('vlanidError', false);
      } else {
        handleError('vlanidError', true);
      }
    }

    if (name === 'RemoteIPAddress') {
      setEndPointRow((prev) => ({ ...prev, RemoteIPAddress: value }));

      if (isValidRemoteIPAddress(value)) {
        handleError('remoteError', false);
      } else {
        handleError('remoteError', true);
      }
    }
    valid = !errors.localError && !errors.vlanidError && !errors.remoteError  ;
    setIsFormValid(valid);
  }

  const onDrxProfileIdTextChange = (e: any) => {
    const value = e.target.value;
    const name = e.target.id;

    // if (name == 'drxinactivitytimer') {
    //   DrxProfileIdInfoList[selecteddrxindex].drxinactivitytimer=value
    //   setDrxProfileIdInfoList(DrxProfileIdInfoList)

    // }
    if (name === 'drxharqrttdl') {
      const newValue = value;
      const updatedList = [...DrxProfileIdInfoList];
      updatedList[selecteddrxindex].drxharqrttdl = newValue;
    
      // Check if the field is mandatory (non-empty) and within the valid range
      if (newValue !== "" && /^\d*$/.test(newValue) && Number(newValue) >= 0 && Number(newValue) <= 56) {
        
        setDrxProfileIdInfoList(updatedList);
        handleError('drxharqrttdlError', false);
        setDrxErrorIndex(prevState => ({
          ...prevState,  // Spread the previous state
          [updatedList[selecteddrxindex].id]: {  // Spread the existing values for the specific index
            ...prevState[updatedList[selecteddrxindex].id],  // Preserve the other fields at this index
            drxharqrttdlError: false  // Update only this specific field
          }
        }));
    
      } else {
        // Trigger error for invalid input or empty value
        handleError('drxharqrttdlError', true);
        setDrxErrorIndex(prevState => ({
          ...prevState,  // Spread the previous state
          [updatedList[selecteddrxindex].id]: {  // Spread the existing values for the specific index
            ...prevState[updatedList[selecteddrxindex].id],  // Preserve the other fields at this index
            drxharqrttdlError: true  // Update only this specific field
          }
        }));
      }
    }
    
    if (name === 'drxharqrttul') {
      const newValue = value;  
      const updatedList = [...DrxProfileIdInfoList];
      updatedList[selecteddrxindex].drxharqrttul = newValue;
    
      // Ensure the field is mandatory and the value is within the valid range
      if (newValue !== "" && /^\d*$/.test(newValue) && Number(newValue) >= 0 && Number(newValue) <= 56) {
    
        setDrxProfileIdInfoList(updatedList);
        handleError('drxharqrttulError', false);
    
        setDrxErrorIndex(prevState => ({
          ...prevState,  // Spread the previous state
          [updatedList[selecteddrxindex].id]: {  // Spread the existing values for the specific index
            ...prevState[updatedList[selecteddrxindex].id],  // Preserve the other fields at this index
            drxharqrttulError: false  // Update only this specific field
          }
        }));
      } else {
        // Trigger error for invalid or empty input
        handleError('drxharqrttulError', true);
        setDrxErrorIndex(prevState => ({
          ...prevState,  // Spread the previous state
          [updatedList[selecteddrxindex].id]: {  // Spread the existing values for the specific index
            ...prevState[updatedList[selecteddrxindex].id],  // Preserve the other fields at this index
            drxharqrttulError: true  // Update only this specific field
          }
        }));
      }
    }
    
    
    if(DrxProfileIdInfoList[selecteddrxindex])
    {
    if (name == 'drxtransmisdl') {
      DrxProfileIdInfoList[selecteddrxindex].drxtransmisdl=value
        setDrxProfileIdInfoList(DrxProfileIdInfoList)
    }
    if (name == 'drxtransmisul') {
      DrxProfileIdInfoList[selecteddrxindex].drxtransmisul=value
        setDrxProfileIdInfoList(DrxProfileIdInfoList)
    }
    if (name == 'drxlongcycle') {
      DrxProfileIdInfoList[selecteddrxindex].drxlongcycle=value
        setDrxProfileIdInfoList(DrxProfileIdInfoList)
    }
  }
    setdudata({
      ...dudata,
      ["DrxProfileIdInfoList"]:DrxProfileIdInfoList,
    })
  }
  const onSchedulingReqConfTextChange = (e: any) => {
    const value = e.target.value;
    const name = e.target.id;
    let valid = true;
    if (name == 'schedulingrequest') {
      if (/^\d*$/.test(value) && Number(value) >= 0 && Number(value) <= 7) {
      setSchedulingReqConfRow({
        ...schedulingReqConfRow,
        [name]: value,
      });
      handleError('schedulingrequestError', false);

    } else {
      handleError('schedulingrequestError', true);
    }
  }
    if (name == 'scprohibittimer') {
      
      setSchedulingReqConfRow({
        ...schedulingReqConfRow,
        scprohibittimer: e.target.value,
      });
    }   
    if (name == 'sctransmax') {
       
      setSchedulingReqConfRow({
        ...schedulingReqConfRow,
          sctransmax:e.target.value,
      });
    }  
    valid = !errors.schedulingrequestError   ;
    setIsFormValid(valid);
}
const onMacParamTextChange = (e: any) => {
  const value = e.target.value;
  const name = e.target.id;

  if (name === 'Priority') {
    const newValue = value; // Get the new value from the input
  
    // Allow user to edit the field, including clearing the input
    if (newValue === '') {
      // Keep the field editable but show the error for mandatory field
      const updatedSrblist = {
        ...srblist,
        [name]: '', 
      };
  
      setsrblist(updatedSrblist);
      handleError('PriorityError', true); // Trigger error for empty input
  
      // Update dudata to reflect the current state
      setdudata({
        ...dudata,
        srblist: updatedSrblist,
      });
      return; // Exit early
    }
  
    // Validation logic for numeric input
    if (/^\d*$/.test(newValue) && Number(newValue) >= 1 && Number(newValue) <= 16) {
      const updatedSrblist = {
        ...srblist,
        [name]: newValue,
      };
  
      setsrblist(updatedSrblist);
      handleError('PriorityError', false); // Clear error when valid input
  
      // Update dudata with the latest srblist
      setdudata({
        ...dudata,
        srblist: updatedSrblist,
      });
    } else {
      handleError('PriorityError', true); // Trigger error for invalid input
    }
  }
  
}
  


  const onqosUlTextChange = (e: any) => {
    const value = e.target.value;
    const name = e.target.id;

    if (name == 'logicalchannel') {
      qoslist[selectedqosindex].logicalchannel=value
      if (/^\d*$/.test(value) && Number(value) >= 1 && Number(value) <= 7){
        
        setqoslist(qoslist)
        handleError('logicalchannelError', false);
        setQosErrorIndex(prevState => ({
          ...prevState,  // Spread the previous state
          [qoslist[selectedqosindex].id]: {  // Spread the existing values for the specific index
            ...prevState[qoslist[selectedqosindex].id],  // Preserve the other fields at this index
            logicalchannel: false  // Update only this specific field
          }
        }));
        

      } else {
        handleError('logicalchannelError', true);
        setQosErrorIndex(prevState => ({
          ...prevState,  // Spread the previous state
          [qoslist[selectedqosindex].id]: {  // Spread the existing values for the specific index
            ...prevState[qoslist[selectedqosindex].id],  // Preserve the other fields at this index
            logicalchannel: true  // Update only this specific field
          }
        }));
        
      }
    }
    if (name == 'maxulharqtx') {
      qoslist[selectedqosindex].maxulharqtx=value
      if (/^\d*$/.test(value) && Number(value) >= 1 && Number(value) <= 8){
        
        setqoslist(qoslist)
        // setQosUlRow({
        //   ...qosUlRow,
        //   [name]: value,
        // });
        handleError('maxulharqtxError', false);
        setQosErrorIndex(prevState => ({
          ...prevState,  // Spread the previous state
          [qoslist[selectedqosindex].id]: {  // Spread the existing values for the specific index
            ...prevState[qoslist[selectedqosindex].id],  // Preserve the other fields at this index
            maxulharqtxError: false  // Update only this specific field
          }
        }));
        

      } else {
        handleError('maxulharqtxError', true);
        setQosErrorIndex(prevState => ({
          ...prevState,  // Spread the previous state
          [qoslist[selectedqosindex].id]: {  // Spread the existing values for the specific index
            ...prevState[qoslist[selectedqosindex].id],  // Preserve the other fields at this index
            maxulharqtxError: true  // Update only this specific field
          }
        }));
        
      }
    }
    setdudata({
      ...dudata,
      ["qoslist"]:qoslist,
    })
  }

  const onqosDlTextChange = (e: any) => {
    const value = e.target.value;
    const name = e.target.id;

    if (name == 'maxdlharqtx') {
      qoslist[selectedqosindex].maxdlharqtx=value
      if (/^\d*$/.test(value) && Number(value) >= 1 && Number(value) <= 8){
        
        setqoslist(qoslist)
        handleError('maxdlharqtxError', false);
        setQosErrorIndex(prevState => ({
          ...prevState,  // Spread the previous state
          [qoslist[selectedqosindex].id]: {  // Spread the existing values for the specific index
            ...prevState[qoslist[selectedqosindex].id],  // Preserve the other fields at this index
            maxdlharqtxError: false  // Update only this specific field
          }
        }));
        
      } else {
        handleError('maxdlharqtxError', true);
        setQosErrorIndex(prevState => ({
          ...prevState,  // Spread the previous state
          [qoslist[selectedqosindex].id]: {  // Spread the existing values for the specific index
            ...prevState[qoslist[selectedqosindex].id],  // Preserve the other fields at this index
            maxdlharqtxError: true  // Update only this specific field
          }
        }));
        
      }
    }
    setdudata({
      ...dudata,
      ["qoslist"]:qoslist,
    })
  }


  const onScellDeactiveTextChange = (e: any) => {
    const value = e.target.value;
    const name = e.target.id;
    let valid = true;

    if (name === 'Index') {
      if (/^\d*$/.test(value) && (!value || (Number(value) >= 1 && Number(value) <= 4))) {
        setscellDeactiveRow({
          ...scellDeactiveRow,
          [name]: value,
        });
        handleError('IndexError', false);
      } else {
        handleError('IndexError', true);
      }
    }
    
    if (name == 'DeactivationTimer') {
      setscellDeactiveRow({
        ...scellDeactiveRow,
        DeactivationTimer: e.target.value,
      });
    }
    valid = !errors.IndexError   ;
    setIsFormValid(valid);
  }
  const onSectorCarrierTextChange = (e: any) => {
    const value = e.target.value;
    const name = e.target.id;
     let valid =true;
    if (name == 'PriorityLabel') {
      if (/^\d*$/.test(value) && Number(value) >= 0 && Number(value) <= 4294967295) {
      setSectorCarrierRow({
        ...sectorCarrierRow,
        [name]: value,
      });
      handleError('priorityLabelError',false);
      } else {
        handleError('priorityLabelError',true);
      }
    }
    if (name == 'tXDirection') {
      setSectorCarrierRow({
        ...sectorCarrierRow,
        tXDirection: e.target.value,
      });
    }
    if (name == 'ConfigMaxTxPower') {
      if (/^\d*$/.test(value) && Number(value) >=-2147483648 && Number(value) <= 2147483647) {
      setSectorCarrierRow({
        ...sectorCarrierRow,
        [name]: value,
      });
      handleError('ConfigMaxTxPowerError',false);
      } else {
        handleError('ConfigMaxTxPowerError',true);
      }
    }
    if (name == 'arfcnDL') {
      if (/^\d*$/.test(value) && Number(value) >= 0 && Number(value) <=3279165) {
         setSectorCarrierRow({
        ...sectorCarrierRow,
        [name]: value,
      });
      handleError('arfcnDLError',false);
      } else {
        handleError('arfcnDLError',true);
      }
    }
    if (name == 'arfcnUL') {
      if (/^\d*$/.test(value) && Number(value) >= 0 && Number(value) <=3279165) {
      setSectorCarrierRow({
        ...sectorCarrierRow,
        [name]: value,
        });
        handleError('arfcnULError',false);
        } else {
          handleError('arfcnULError',true);
        }
    }
    if (name == 'bSChannelBwDl') {
      setSectorCarrierRow({
        ...sectorCarrierRow,
        bSChannelBwDl: e.target.value,
      });
    }
    if (name == 'bSChannelBwUl') {
      setSectorCarrierRow({
        ...sectorCarrierRow,
        bSChannelBwUl: e.target.value,
      });
    }
    valid = !errors.priorityLabelError && !errors.ConfigMaxTxPowerError && !errors.arfcnDLError && !errors.arfcnULError   ;
    setIsFormValid(valid);
  }
  const onBwpTextChange = (e: any) => {
    const value = e.target.value;
    const name = e.target.id;
     let valid =true;
    if (name == 'PriorityLabel') {
      if (/^\d*$/.test(value) && Number(value) >= 0 && Number(value) <= 4294967295) {
      setBwpRow({
        ...bwpRow,
        [name]: value,
      });
      handleError('priorityLabelError',false);
      } else {
        handleError('priorityLabelError',true);
      }
    }
    if (name == 'bwpContext') {
      setBwpRow({
        ...bwpRow,
        bwpContext: e.target.value,
      });
    }
    if (name == 'SubCarrierSpacing') {
      setBwpRow({
        ...bwpRow,
        SubCarrierSpacing: e.target.value,
      });
    }
    if (name == 'cyclePrefix') {
      setBwpRow({
        ...bwpRow,
        cyclePrefix: e.target.value,
      });
    }
    if (name == 'startRB') {
      if (/^\d*$/.test(value) && Number(value) >= 0 && Number(value) <= 4294967295) {
        setBwpRow({
          ...bwpRow,
          [name]: value,
        });
        handleError('startRBError', false);

      } else {
        handleError('startRBError', true);
      }
    }
    if (name == 'NumberOfRBs') {
      if (/^\d*$/.test(value) && Number(value) >= 0 && Number(value) <= 4294967295) {
        setBwpRow({
          ...bwpRow,
          [name]: value,
        });
        handleError('NumberOfRBsError', false);

      } else {
        handleError('NumberOfRBsError', true);
      }
    }
    if (name == 'isInitiaLBwp') {
      setBwpRow({
        ...bwpRow,
        isInitiaLBwp: e.target.value,
      });
    }
    valid = !errors.priorityLabelError && !errors.startRBError && !errors.NumberOfRBsError    ;
    setIsFormValid(valid);
    console.log(bwpRow)
  }

  const onNRCellDuTextChange = async(e: any) => {
    const value = e.target.value;
    const name = e.target.id;
    let valid =true ;
    if (name == 'NRPCI') {
      setNRCellDuRow({
        ...NRCellDuRow,
        [name]: value,
      });
      if (/^\d*$/.test(value) && Number(value) >= 0 && Number(value) <=1007) {
        
        await handleError('NRPCIError', false);

      } else {
        await handleError('NRPCIError', true);
      }
    }
    if (name === 'NRTAC') {
      setNRCellDuRow({
        ...NRCellDuRow,
        [name]: value,  // Update the value regardless of current length
      });
      if (/^\d*$/.test(value) && Number(value) >= 0 && Number(value) <= 16777215) {
          await handleError('NRTACError', false);  // Set error if invalid
        } else {
          await handleError('NRTACError', true);  // Set error if less than 3 characters
        }
      } 

    if (name == 'ResourceType') {
      setNRCellDuRow({
        ...NRCellDuRow,
        ResourceType: e.target.value,
      });
    }
    if (name == 'CellLocalId') {
      setNRCellDuRow({
        ...NRCellDuRow,
        CellLocalId: e.target.value,
      });
    }
    console.log(errors.NRPCIError,errors.NRTACError)
    valid = errors.NRPCIError && errors.NRTACError;
    console.log("valid",valid)
    setIsFormValid(valid);

  }

  const onDUSyncStateTextChange = (e: any) => {
    const value = e.target.value;
    const name = e.target.id;

    if (name == 'DUIndex') {
      if (/^\d*$/.test(value) && Number(value) >= 0 && Number(value) <= 68719476735) {
        setdudata({
          ...dudata,
          [name]: value,
        });
        handleError('DUIndexError', false);
      } else {
        handleError('DUIndexError', true);
      }
    }

    if (name === 'gNBDUId') {
      if (/^\d*$/.test(value)) {
        setdudata({
          ...dudata,
          [name]: value,
        });
    
        const numericValue = value === '' ? undefined : Number(value);
        if (numericValue !== undefined && (numericValue < 0 || numericValue > 68719476735)) {
          handleError('fhgNBDUIdError', true);
        } else {
          handleError('fhgNBDUIdError', false);
        }
      } else {
        handleError('fhgNBDUIdError', true);
      }
    }
    
    
    
    

  }

  const onODUWindowMethodTextChange = (e: any) => {
    const value = e.target.value;
    const name = e.target.id;

    if (name === 'RUCount') {
      setdudata({
        ...dudata,
        [name]: value,
      });
      if (value === '' || /^\d*$/.test(value)) {
        if (value === '' || (Number(value) >= 1 && Number(value) <= 3279165)) {
          
          handleError('RUCountError', false);
          
        } else {
          handleError('RUCountError', true);
           
        }
      } else {
        handleError('RUCountError', true);
         
      }
    }
    
    
  }

  const onPreconfRUTextChange = (e: any) => {
    const value = e.target.value;
    const name = e.target.id;
    let valid = true;
    if (name == 'RUIndex') {
      if (/^\d*$/.test(value) && Number(value) >= 0 && Number(value) <= 127) {
      setselectePreconfRURow({
        ...selectePreconfRURow,
        [name]: value,
      });
      handleError('RUIndexError', false);

    } else {
      handleError('RUIndexError', true);
    }
  }
    if (name == 'RUInstanceId') {
      setselectePreconfRURow({
        ...selectePreconfRURow,
        RUInstanceId: e.target.value,
      });
    }
    valid = !errors.RUIndexError   ;
    setIsFormValid(valid);

    
  }

  const onPreConfiguredDelayTextChange = (e: any) => {
    const value = e.target.value;
    const name = e.target.id;
    let valid = true;
    if (name == 'ta4Min') {
      if (/^\d*$/.test(value) && Number(value) >= 0 && Number(value) <= 4294967295) {
        setdudata({
          ...dudata,
          [name]: value,
        });
        handleError('ta4MinError', false);
      } else {
        handleError('ta4MinError', true);
      }
    }
    if (name == 'ta4Max') {
      if (/^\d*$/.test(value) && Number(value) >= 0 && Number(value) <= 4294967295) {
        setdudata({
          ...dudata,
          [name]: value,
        });
        handleError('ta4MaxError', false);
      } else {
        handleError('ta4MaxError', true);
      }
    }
    if (name == 't1aMinCpDl') {
      if (/^\d*$/.test(value) && Number(value) >= 0 && Number(value) <= 4294967295) {
        setdudata({
          ...dudata,
          [name]: value,
        });
        handleError('t1aMinCpDlError', false);
      } else {
        handleError('t1aMinCpDlError', true);
      }
    }
    if (name == 't1aMinCpUl') {
      if (/^\d*$/.test(value) && Number(value) >= 0 && Number(value) <= 4294967295) {
        setdudata({
          ...dudata,
          [name]: value,
        });
        handleError('t1aMinCpUlError', false);
      } else {
        handleError('t1aMinCpUlError', true);
      }
    }
    if (name == 't1aMinUl') {
      if (/^\d*$/.test(value) && Number(value) >= 0 && Number(value) <= 4294967295) {
        setdudata({
          ...dudata,
          [name]: value,
        });
        handleError('t1aMinUlError', false);
      } else {
        handleError('t1aMinUlError', true);
      }
    }
    if (name == 't1aMaxCpDl') {
      if (/^\d*$/.test(value) && Number(value) >= 0 && Number(value) <= 4294967295) {
        setdudata({
          ...dudata,
          [name]: value,
        });
        handleError('t1aMaxCpDlError', false);
      } else {
        handleError('t1aMaxCpDlError', true);
      }
    }
    if (name == 't1aMaxCpUl') {
      if (/^\d*$/.test(value) && Number(value) >= 0 && Number(value) <= 4294967295) {
        setdudata({
          ...dudata,
          [name]: value,
        });
        handleError('t1aMaxCpUlError', false);
      } else {
        handleError('t1aMaxCpUlError', true);
      }
    }
    if (name == 't1aMaxUp') {
      if (/^\d*$/.test(value) && Number(value) >= 0 && Number(value) <= 4294967295) {
        setdudata({
          ...dudata,
          [name]: value,
        });
        handleError('t1aMaxUpError', false);
      } else {
        handleError('t1aMaxUpError', true);
      }
    }
    if (name == 't12Min') {
      if (/^\d*$/.test(value) && Number(value) >= 0 && Number(value) <= 4294967295) {
        setdudata({
          ...dudata,
          [name]: value,
        });
        handleError('t12MinError', false);
      } else {
        handleError('t12MinError', true);
      }
    }
    if (name == 't12Max') {
      if (/^\d*$/.test(value) && Number(value) >= 0 && Number(value) <= 4294967295) {
        setdudata({
          ...dudata,
          [name]: value,
        });
        handleError('t12MaxError', false);
      } else {
        handleError('t12MaxError', true);
      }
    }
    if (name == 't34Min') {
      if (/^\d*$/.test(value) && Number(value) >= 0 && Number(value) <= 4294967295) {
        setdudata({
          ...dudata,
          [name]: value,
        });
        handleError('t34MinError', false);
      } else {
        handleError('t34MinError', true);
      }
    }
    if (name == 't34Max') {
      if (/^\d*$/.test(value) && Number(value) >= 0 && Number(value) <= 4294967295) {
        setdudata({
          ...dudata,
          [name]: value,
        });
        handleError('t34MaxError', false);
      } else {
        handleError('t34MaxError', true);
      }
    }
    if (name == 't2aMinUp') {
      if (/^\d*$/.test(value) && Number(value) >= 0 && Number(value) <=4294967295) {
        setdudata({
          ...dudata,
          [name]: value,
        });
        handleError('t2aMinUpError', false);
      } else {
        handleError('t2aMinUpError', true);
      }
    }
    if (name == 't2aMaxUp') {
      if (/^\d*$/.test(value) && Number(value) >= 0 && Number(value) <= 4294967295) {
        setdudata({
          ...dudata,
          [name]: value,
        });
        handleError('t2aMaxUpError', false);
      } else {
        handleError('t2aMaxUpError', true);
      }
    }
    if (name == 't2aMinCpDl') {
      if (/^\d*$/.test(value) && Number(value) >= 0 && Number(value) <= 4294967295) {
        setdudata({
          ...dudata,
          [name]: value,
        });
        handleError('t2aMinCpDlError', false);
      } else {
        handleError('t2aMinCpDlError', true);
      }
    }
    if (name == 't2aMinCpUl') {
      if (/^\d*$/.test(value) && Number(value) >= 0 && Number(value) <= 4294967295) {
        setdudata({
          ...dudata,
          [name]: value,
        });
        handleError('t2aMinCpUlError', false);
      } else {
        handleError('t2aMinCpUlError', true);
      }
    }
    if (name == 't2aMaxCpDl') {
      if (/^\d*$/.test(value) && Number(value) >= 0 && Number(value) <= 4294967295) {
        setdudata({
          ...dudata,
          [name]: value,
        });
        handleError('t2aMaxCpDlError', false);
      } else {
        handleError('t2aMaxCpDlError', true);
      }
    }
    if (name == 't2aMaxCpUl') {
      if (/^\d*$/.test(value) && Number(value) >= 0 && Number(value) <= 4294967295) {
        setdudata({
          ...dudata,
          [name]: value,
        });
        handleError('t2aMaxCpUlError', false);
      } else {
        handleError('t2aMaxCpUlError', true);
      }
    }
    if (name == 'ta3Min') {
      if (/^\d*$/.test(value) && Number(value) >= 0 && Number(value) <=4294967295) {
        setdudata({
          ...dudata,
          [name]: value,
        });
        handleError('ta3MinError', false);
      } else {
        handleError('ta3MinError', true);
      }
    }

    if (name == 'ta3Max') {
      if (/^\d*$/.test(value) && Number(value) >= 0 && Number(value) <= 4294967295) {
        setdudata({
          ...dudata,
          [name]: value,
        });
        handleError('ta3MaxError', false);
      } else {
        handleError('ta3MaxError', true);
      }
    }
     
  }

  const onPrbUlTextChange = (e: any) => {
    const value = e.target.value;
    const name = e.target.id;
    let valid =true;
    if (name == 'ElemIndex') {
      if (/^\d*$/.test(value) && Number(value) >= 0 && Number(value) <= 255) {
        setselectePrbUlRow({
          ...selectePrbUlRow,
          [name]: value,
        });
        handleError('ULElemIndexError', false);
      } else {
        handleError('ULElemIndexError', true);
      }
    }
    if (name == 'RbStart') {
      if (/^\d*$/.test(value) && Number(value) >= 0 && Number(value) <= 65535) {
        setselectePrbUlRow({
          ...selectePrbUlRow,
          [name]: value,
        });
        handleError('ULRbStartError', false);
      } else {
        handleError('ULRbStartError', true);
      }
    }
    if (name == 'RbSize') {
      if (/^\d*$/.test(value) && Number(value) >= 0 && Number(value) <= 65535) {
        setselectePrbUlRow({
          ...selectePrbUlRow,
          [name]: value,
        });
        handleError('ULRbSizeError', false);
      } else {
        handleError('ULRbSizeError', true);
      }
    }
    if (name == 'StartSymbol') {
      if (/^\d*$/.test(value) && Number(value) >= 0 && Number(value) <= 255) {
        setselectePrbUlRow({
          ...selectePrbUlRow,
          [name]: value,
        });
        handleError('ULStartSymbolError', false);
      } else {
        handleError('ULStartSymbolError', true);
      }
    }

    if (name == 'NumofSymbol') {
      if (/^\d*$/.test(value) && Number(value) >= 0 && Number(value) <= 255) {
        setselectePrbUlRow({
          ...selectePrbUlRow,
          [name]: value,
        });
        handleError('ULNumofSymbolError', false);
      } else {
        handleError('ULNumofSymbolError', true);
      }
    }
    if (name == 'BeamIndex') {
      if (/^\d*$/.test(value) && Number(value) >= 0 && Number(value) <= 255) {
        setselectePrbUlRow({
          ...selectePrbUlRow,
          [name]: value,
        });
        handleError('ULBeamIndexError', false);
      } else {
        handleError('ULBeamIndexError', true);
      }
    }
    if (name == 'BfweightUpdate') {
      if (/^\d*$/.test(value) && Number(value) >= 0 && Number(value) <= 255) {
        setselectePrbUlRow({
          ...selectePrbUlRow,
          [name]: value,
        });
        handleError('ULBfweightUpdateError', false);
      } else {
        handleError('ULBfweightUpdateError', true);
      }
    }
    if (name == 'CompMethod') {
      if (/^\d*$/.test(value) && Number(value) >= 0 && Number(value) <= 255) {
        setselectePrbUlRow({
          ...selectePrbUlRow,
          [name]: value,
        });
        handleError('ULCompMethodError', false);
      } else {
        handleError('ULCompMethodError', true);
      }
    }

    if (name == 'IqWidth') {
      if (/^\d*$/.test(value) && Number(value) >= 0 && Number(value) <= 255) {
        setselectePrbUlRow({
          ...selectePrbUlRow,
          [name]: value,
        });
        handleError('ULIqWidthError', false);
      } else {
        handleError('ULIqWidthError', true);
      }
    }
    if (name == 'BeamForming') {
      if (/^\d*$/.test(value) && Number(value) >= 0 && Number(value) <= 255) {
        setselectePrbUlRow({
          ...selectePrbUlRow,
          [name]: value,
        });
        handleError('ULBeamFormingError', false);
      } else {
        handleError('ULBeamFormingError', true);
      }
    }

    if (name == 'ScaleFactor') {
      if (/^\d*$/.test(value) && Number(value) >= 0 && Number(value) <= 255) {
        setselectePrbUlRow({
          ...selectePrbUlRow,
          [name]: value,
        });
        handleError('ULScaleFactorError', false);
      } else {
        handleError('ULScaleFactorError', true);
      }
    }
    if (name == 'Remask') {
      if (/^\d*$/.test(value) && Number(value) >= 0 && Number(value) <= 255) {
        setselectePrbUlRow({
          ...selectePrbUlRow,
          [name]: value,
        });
        handleError('ULRemaskError', false);
      } else {
        handleError('ULRemaskError', true);
      }
    }
    valid = !errors.ULElemIndexError && !errors.ULRbStartError && !errors.ULRbSizeError && !errors.ULStartSymbolError && !errors.ULNumofSymbolError && !errors.ULBeamIndexError && !errors.ULBfweightUpdateError 
    && !errors.ULCompMethodError && !errors.ULIqWidthError && !errors.ULBeamFormingError && !errors.ULScaleFactorError && !errors.ULRemaskError;
    setIsFormValid(valid);
  }
  const onPrbDlTextChange = (e: any) => {
    const value = e.target.value;
    const name = e.target.id;
    let valid =true;
    if (name == 'ElemIndex') {
      if (/^\d*$/.test(value) && Number(value) >= 0 && Number(value) <= 255) {
        setselectePrbDlRow({
          ...selectePrbDlRow,
          [name]: value,
        });
        handleError('DLElemIndexError', false);
      } else {
        handleError('DLElemIndexError', true);
      }
    }
    if (name == 'RbStart') {
      if (/^\d*$/.test(value) && Number(value) >= 0 && Number(value) <= 65535) {
        setselectePrbDlRow({
          ...selectePrbDlRow,
          [name]: value,
        });
        handleError('DLRbStartError', false);
      } else {
        handleError('DLRbStartError', true);
      }
    }
    if (name == 'RbSize') {
      if (/^\d*$/.test(value) && Number(value) >= 0 && Number(value) <= 65535) {
        setselectePrbDlRow({
          ...selectePrbDlRow,
          [name]: value,
        });
        handleError('DLRbSizeError', false);
      } else {
        handleError('DLRbSizeError', true);
      }
    }
    if (name == 'StartSymbol') {
      if (/^\d*$/.test(value) && Number(value) >= 0 && Number(value) <= 255) {
        setselectePrbDlRow({
          ...selectePrbDlRow,
          [name]: value,
        });
        handleError('DLStartSymbolError', false);
      } else {
        handleError('DLStartSymbolError', true);
      }
    }

    if (name == 'NumofSymbol') {
      if (/^\d*$/.test(value) && Number(value) >= 0 && Number(value) <= 255) {
        setselectePrbDlRow({
          ...selectePrbDlRow,
          [name]: value,
        });
        handleError('DLNumofSymbolError', false);
      } else {
        handleError('DLNumofSymbolError', true);
      }
    }
    if (name == 'BeamIndex') {
      if (/^\d*$/.test(value) && Number(value) >= 0 && Number(value) <= 255) {
        setselectePrbDlRow({
          ...selectePrbDlRow,
          [name]: value,
        });
        handleError('DLBeamIndexError', false);
      } else {
        handleError('DLBeamIndexError', true);
      }
    }
    if (name == 'BfweightUpdate') {
      if (/^\d*$/.test(value) && Number(value) >= 0 && Number(value) <= 255) {
        setselectePrbDlRow({
          ...selectePrbDlRow,
          [name]: value,
        });
        handleError('DLBfweightUpdateError', false);
      } else {
        handleError('DLBfweightUpdateError', true);
      }
    }
    if (name == 'CompMethod') {
      if (/^\d*$/.test(value) && Number(value) >= 0 && Number(value) <= 255) {
        setselectePrbDlRow({
          ...selectePrbDlRow,
          [name]: value,
        });
        handleError('DLCompMethodError', false);
      } else {
        handleError('DLCompMethodError', true);
      }
    }

    if (name == 'IqWidth') {
      if (/^\d*$/.test(value) && Number(value) >= 0 && Number(value) <= 255) {
        setselectePrbDlRow({
          ...selectePrbDlRow,
          [name]: value,
        });
        handleError('DLIqWidthError', false);
      } else {
        handleError('DLIqWidthError', true);
      }
    }
    if (name == 'BeamForming') {
      if (/^\d*$/.test(value) && Number(value) >= 0 && Number(value) <= 255) {
        setselectePrbDlRow({
          ...selectePrbDlRow,
          [name]: value,
        });
        handleError('DLBeamFormingError', false);
      } else {
        handleError('DLBeamFormingError', true);
      }
    }
    if (name == 'ScaleFactor') {
      if (/^\d*$/.test(value) && Number(value) >= 0 && Number(value) <= 255) {
        setselectePrbDlRow({
          ...selectePrbDlRow,
          [name]: value,
        });
        handleError('DLScaleFactorError', false);
      } else {
        handleError('DLScaleFactorError', true);
      }
    }
    if (name == 'Remask') {
      if (/^\d*$/.test(value) && Number(value) >= 0 && Number(value) <= 255) {
        setselectePrbDlRow({
          ...selectePrbDlRow,
          [name]: value,
        });
        handleError('DLRemaskError', false);
      } else {
        handleError('DLRemaskError', true);
      }
    }
    valid = !errors.ULElemIndexError && !errors.ULRbStartError && !errors.ULRbSizeError && !errors.ULStartSymbolError && !errors.ULNumofSymbolError && !errors.ULBeamIndexError && !errors.ULBfweightUpdateError 
    && !errors.ULCompMethodError && !errors.ULIqWidthError && !errors.ULBeamFormingError && !errors.ULScaleFactorError && !errors.ULRemaskError;
    setIsFormValid(valid);
  }

  const onODUWindowTextChange = (e: any) => {
    const value = e.target.value;
    const name = e.target.id;
    if(ODUWindowDataList[selectedoduwindowindex])
    {
    if (name == 'RUIndexId') {
      ODUWindowDataList[selectedoduwindowindex].RUIndexId = value
      if (/^\d*$/.test(value) && Number(value) >= 0 && Number(value) <= 127) {
        
        setODUWindowDataList(ODUWindowDataList)
        handleError('RUIndexIdError', false);
        setOduwindowErrorIndex(prevState => ({
          ...prevState,  
          [ODUWindowDataList[selectedoduwindowindex].id]: {   
            ...prevState[ODUWindowDataList[selectedoduwindowindex].id],   
            RUIndexIdError: false   
          }
        }));
      } else {
        handleError('RUIndexIdError', true);
        setOduwindowErrorIndex(prevState => ({
          ...prevState,   
          [ODUWindowDataList[selectedoduwindowindex].id]: { 
            ...prevState[ODUWindowDataList[selectedoduwindowindex].id],  
            RUIndexIdError: true  
          }
        }));
      }
    }
    if (name == 'RUInstanceId') {
      console.log('RUInstanceId')
      ODUWindowDataList[selectedoduwindowindex].RUInstanceId=value
      setODUWindowDataList(ODUWindowDataList)
    }
    if (name == 'Bandwidth') {
      if (/^\d*$/.test(value) && Number(value) >= 0 && Number(value) <= 65535) {
        ODUWindowDataList[selectedoduwindowindex].Bandwidth = value
        setODUWindowDataList(ODUWindowDataList)
        handleError('BandwidthError', false);
        setOduwindowErrorIndex(prevState => ({
          ...prevState,  
          [ODUWindowDataList[selectedoduwindowindex].id]: {  
            ...prevState[ODUWindowDataList[selectedoduwindowindex].id],  
            BandwidthError: false  
          }
        }));
      } else {
        handleError('BandwidthError', true);
        setOduwindowErrorIndex(prevState => ({
          ...prevState,  
          [ODUWindowDataList[selectedoduwindowindex].id]: {  
            ...prevState[ODUWindowDataList[selectedoduwindowindex].id],   
            BandwidthError: true   
          }
        }));
      }
    }
  }
  
    if (name == 'Subcarrierspacing') {
      ODUWindowDataList[selectedoduwindowindex].Subcarrierspacing = value
      setODUWindowDataList(ODUWindowDataList)
    }
    if (name == 'DUmacAddress') {
       
      ODUWindowDataList[selectedoduwindowindex].DUmacAddress=value
      setODUWindowDataList(ODUWindowDataList)
      if (isValidMacAddress(value)) {
        handleError('macError', false);
        setOduwindowErrorIndex(prevState => ({
          ...prevState,   
          [ODUWindowDataList[selectedoduwindowindex].id]: {   
            ...prevState[ODUWindowDataList[selectedoduwindowindex].id],   
            macError: false   
          }
        }));
       } else {
         handleError('macError', true);
         setOduwindowErrorIndex(prevState => ({
          ...prevState,   
          [ODUWindowDataList[selectedoduwindowindex].id]: {   
            ...prevState[ODUWindowDataList[selectedoduwindowindex].id],  
            macError: true   
          }
        }));
       }
    }
    if (name == 'RUcpmacAddress') {
      ODUWindowDataList[selectedoduwindowindex].RUcpmacAddress=value
      setODUWindowDataList(ODUWindowDataList)  
      if (isValidMacAddress(value)) {     
        handleError('RUcpmacError', false);
        setOduwindowErrorIndex(prevState => ({
          ...prevState,   
          [ODUWindowDataList[selectedoduwindowindex].id]: {   
            ...prevState[ODUWindowDataList[selectedoduwindowindex].id],   
            RUcpmacError: false   
          }
        }));
      } else {
        handleError('RUcpmacError', true);
        setOduwindowErrorIndex(prevState => ({
          ...prevState,   
          [ODUWindowDataList[selectedoduwindowindex].id]: { 
            ...prevState[ODUWindowDataList[selectedoduwindowindex].id],   
            RUcpmacError: true   
          }
        }));
      }
    }
    if (name == 'RUupmacAddress') {
      ODUWindowDataList[selectedoduwindowindex].RUupmacAddress=value
      setODUWindowDataList(ODUWindowDataList) 
      if (isValidMacAddress(value)) {      
      handleError('RUupmacError', false);
      setOduwindowErrorIndex(prevState => ({
        ...prevState,   
        [ODUWindowDataList[selectedoduwindowindex].id]: {   
          ...prevState[ODUWindowDataList[selectedoduwindowindex].id],   
          RUupmacError: false   
        }
      }));
      } else {
        handleError('RUupmacError', true);
        setOduwindowErrorIndex(prevState => ({
          ...prevState,   
          [ODUWindowDataList[selectedoduwindowindex].id]: {   
            ...prevState[ODUWindowDataList[selectedoduwindowindex].id],   
            RUupmacError: true   
          }
        }));
      }
    }
    if (name === 'CpvlanId') {
      ODUWindowDataList[selectedoduwindowindex].CpvlanId = value;
      setODUWindowDataList([...ODUWindowDataList]);
  
      if (value === '') {
          handleError('CpvlanIdError', false);
          setOduwindowErrorIndex(prevState => ({
            ...prevState,   
            [ODUWindowDataList[selectedoduwindowindex].id]: {   
              ...prevState[ODUWindowDataList[selectedoduwindowindex].id],   
              CpvlanIdError: false   
            }
          }));
      } else if (/^\d*$/.test(value) && Number(value) >= 1 && Number(value) <= 4094) {
          handleError('CpvlanIdError', false);
          setOduwindowErrorIndex(prevState => ({
            ...prevState,   
            [ODUWindowDataList[selectedoduwindowindex].id]: {   
              ...prevState[ODUWindowDataList[selectedoduwindowindex].id],   
              CpvlanIdError: false   
            }
          }));
      } else {
          handleError('CpvlanIdError', true);
          setOduwindowErrorIndex(prevState => ({
            ...prevState,   
            [ODUWindowDataList[selectedoduwindowindex].id]: {   
              ...prevState[ODUWindowDataList[selectedoduwindowindex].id],   
              CpvlanIdError: true   
            }
          }));
      }
  }
  if (name === 'UpvalnId') {
    ODUWindowDataList[selectedoduwindowindex].UpvalnId = value;
    setODUWindowDataList([...ODUWindowDataList]);

    if (value === '') {
        handleError('UpvalnIdError', false);
        setOduwindowErrorIndex(prevState => ({
          ...prevState,   
          [ODUWindowDataList[selectedoduwindowindex].id]: {   
            ...prevState[ODUWindowDataList[selectedoduwindowindex].id],   
            UpvalnIdError: false   
          }
        }));
    } else if (/^\d*$/.test(value) && Number(value) >= 1 && Number(value) <= 4094) {
        handleError('UpvalnIdError', false);
        setOduwindowErrorIndex(prevState => ({
          ...prevState,  
          [ODUWindowDataList[selectedoduwindowindex].id]: {   
            ...prevState[ODUWindowDataList[selectedoduwindowindex].id],   
            UpvalnIdError: false   
          }
        }));
    } else {
        handleError('UpvalnIdError', true);
        setOduwindowErrorIndex(prevState => ({
          ...prevState,   
          [ODUWindowDataList[selectedoduwindowindex].id]: {   
            ...prevState[ODUWindowDataList[selectedoduwindowindex].id],  
            UpvalnIdError: true  
          }
        }));
    }
}

    if (name == 'CompMethod') {
      ODUWindowDataList[selectedoduwindowindex].CompMethod = value
      if (/^\d*$/.test(value) && Number(value) >= 0 && Number(value) <= 65535) {
        
        setODUWindowDataList(ODUWindowDataList)
        handleError('CompMethodError', false);
        setOduwindowErrorIndex(prevState => ({
          ...prevState,   
          [ODUWindowDataList[selectedoduwindowindex].id]: {   
            ...prevState[ODUWindowDataList[selectedoduwindowindex].id],   
            CompMethodError: false 
          }
        }));
      } else {
        handleError('CompMethodError', true);
        setOduwindowErrorIndex(prevState => ({
          ...prevState,   
          [ODUWindowDataList[selectedoduwindowindex].id]: {   
            ...prevState[ODUWindowDataList[selectedoduwindowindex].id],   
            CompMethodError: true   
          }
        }));
      }
    }
    setdudata({
      ...dudata,
      ["ODUWindowDataList"]:ODUWindowDataList
    })
  }

  const addNewRecord = (listName: any, listTitle: any) => {
    setOpen(true);
    setdialogTitle("Add New Record");
    setisEdit(false)
    setlistName(listName)
    setlistTitle(listTitle)
    // const currentId = typeof sectorCarrierRow.id === 'number' ? sectorCarrierRow.id : 0;
    const getId = (row: any) => typeof row.id === 'number' ? row.id : 0;
    const currentId = Math.max(getId(sectorCarrierRow), getId(bwpRow));
    const newId = currentId + 1;
    setErrors ({
      priorityLabelError: false, gNBDUIdError: false, gNBIdLengthError: false, localError: false, remoteError: false,arfcnULError:false,arfcnDLError:false,sapportError:false,ConfigMaxTxPowerError:false,RUIndexIdError:false,
      vlanidError: false, drxharqrttdlError: false, drxharqrttulError: false, logicalchannelError: false, maxulharqtxError: false, maxdlharqtxError: false, IndexError: false,schedulingrequestError:false,RUIndexError:false,
      startRBError: false, NumberOfRBsError: false, NRPCIError: false, NRTACError: false, ta4MinError: false, ta4MaxError: false, t1aMinCpDlError: false, t1aMinCpUlError: false,  SAPHostError:false,RUupmacError: false,
      t1aMinUlError: false, t1aMaxCpDlError: false, t1aMaxCpUlError: false, t1aMaxUpError: false, t12MinError: false, t12MaxError: false, t34MinError: false, t34MaxError: false, RUCountError: false,fhgNBDUIdError: false,RUcpmacError: false,
      t2aMinUpError: false, t2aMaxUpError: false, t2aMinCpDlError: false, t2aMinCpUlError: false, t2aMaxCpDlError: false, t2aMaxCpUlError: false, ta3MinError: false, ta3MaxError: false,macError: false,BandwidthError:false,PriorityError: false,
      CompMethodError: false, UpvalnIdError: false, CpvlanIdError: false, ULElemIndexError: false, ULRbStartError: false, ULRbSizeError: false, ULStartSymbolError: false, ULNumofSymbolError: false, ULBeamIndexError: false,DUIndexError:false,
      ULBfweightUpdateError: false, ULCompMethodError: false, ULIqWidthError: false, ULBeamFormingError: false, ULScaleFactorError: false, ULRemaskError: false, DLElemIndexError: false, DLRbStartError: false, DLRbSizeError: false, 
      DLStartSymbolError: false, DLNumofSymbolError: false, DLBeamIndexError: false, DLBfweightUpdateError: false, DLCompMethodError: false, DLIqWidthError: false, DLBeamFormingError: false, DLScaleFactorError: false, DLRemaskError: false
    });
    setSectorConfRow({
      id: "",
      PriorityLabel: "",
      tXDirection: "",
      ConfigMaxTxPower: "",
      arfcnDL: "",
      arfcnUL: "",
      bSChannelBwDl: "",
      bSChannelBwUl: "",
    });
    let id = 0;
      let isnotexits=false;
      let index = 0;
    if(listName === "ManagedNFServiceTable"){
      
      for(var i=0;i <= ManagedNFServicerows.length;i++)
        {
          if (!(ManagedNFServicerows?.filter(c => c.id.toString() === i.toString()).length > 0)) {
            isnotexits=true;
            index=i;
          }
        }
     if(isnotexits)
      {
        id= index;
      }
    }
    setManagedNFServiceRow({
      id: index.toString(),
      AdministrativeState: "",
      saphost: "",
      sapport: "",
      operationsName: "",
      operationsAllowed: "",
    });
    setEndPointRow({
      id: "",
      EndPoint: "",
      LocalIPAddress: "",
      VLANID: "",
      RemoteIPAddress: "",
    });
    if(listName === "SchedulingReqConfTable"){
      
      for(var i=0;i <= DrxProfileIdInfoList[selecteddrxindex]?.SchedulingReqConfInfoList?.length;i++)
        {
          if (!(DrxProfileIdInfoList[selecteddrxindex]?.SchedulingReqConfInfoList?.filter(c => c.schedulingrequest.toString() === i.toString()).length > 0)) {
            isnotexits=true;
            index=i;
          }
        }
     if(isnotexits)
      {
        id= index;
      }
    }
    if(id <= 7){
      setSchedulingReqConfRow({
        id: index.toString(),
        schedulingrequest: index.toString(),
        scprohibittimer: "",
        sctransmax: "",
      });
    }
    else{
      setSaveSucesopen(true);
      setSucessmsg("schedulingrequest index allowed range is 0-7");
      setsavedialogTitle("Warning");
      setOpen(false);
    }
    if(listName === "ScellDeactiveTable"){
      
      for(var i=1;i <= Scelldeactiverows.length+1;i++)
        {
          if (!(Scelldeactiverows?.filter(c => c.Index.toString() === i.toString()).length > 0)) {
            isnotexits=true;
            index=i;
          }
        }
     if(isnotexits)
      {
        id= index;
      }
    }
    if(id <=4){
      setscellDeactiveRow({
        id: index.toString(),
        Index: index.toString(),
        DeactivationTimer: "",
      });
  
    }
    else{
      setSaveSucesopen(true);
      setSucessmsg("Index allowed range is 1-4");
      setsavedialogTitle("Warning");
      setOpen(false);
    }
    setSectorCarrierRow({
      id: `NRS-${newId}`,
      PriorityLabel: "",
      tXDirection: "",
      ConfigMaxTxPower: "",
      arfcnDL: "",
      arfcnUL: "",
      bSChannelBwDl: "",
      bSChannelBwUl: "",
    });
    setBwpRow({
      id: `BWP-${newId}`,
      PriorityLabel: "",
      bwpContext: "",
      SubCarrierSpacing: "",
      cyclePrefix: "",
      startRB: "",
      NumberOfRBs: "",
      isInitiaLBwp: "",
    });
    if(listName === "NRCellDuTable"){
      
      for(var i=0;i <= NRCellDurows.length;i++)
        {
          if (!(NRCellDurows?.filter(c => c.id.toString() === i.toString()).length > 0)) {
            isnotexits=true;
            index=i;
          }
        }
     if(isnotexits)
      {
        id= index;
      }
    }
    setNRCellDuRow({
      id: index.toString(),
      NRPCI: "",
      NRTAC: "",
      ResourceType: "",
      CellLocalId: "",
      cellId: "",
      BwplistId: "",
      NRSectorCarrierReflistId: "",
    });
    if(listName === "PrbDlTable"){
      
      for(var i=0;i <= ODUWindowDataList[selectedoduwindowindex]?.PrbDlInfolist?.length;i++)
        {
          if (!(ODUWindowDataList[selectedoduwindowindex]?.PrbDlInfolist?.filter(c => c.ElemIndex.toString() === i.toString()).length > 0)) {
            isnotexits=true;
            index=i;
          }
        }
     if(isnotexits)
      {
        id= index;
      }
    }
    setselectePrbDlRow({
      id: index.toString(),
      ElemIndex: index.toString(),
      RbStart: "",
      RbSize: "",
      StartSymbol: "",
      NumofSymbol: "",
      BeamIndex: "",
      BfweightUpdate: "",
      CompMethod: "",
      IqWidth: "",
      BeamForming: "",
      ScaleFactor: "",
      Remask: "",
    });
    if(listName === "PrbUlTable"){
      
      for(var i=0;i <= ODUWindowDataList[selectedoduwindowindex]?.PrbUlInfolist?.length;i++)
        {
          if (!(ODUWindowDataList[selectedoduwindowindex]?.PrbUlInfolist?.filter(c => c.ElemIndex.toString() === i.toString()).length > 0)) {
            isnotexits=true;
            index=i;
          }
        }
     if(isnotexits)
      {
        id= index;
      }
    }
    setselectePrbUlRow({
      id: index.toString(),
      ElemIndex: index.toString(),
      RbStart: "",
      RbSize: "",
      StartSymbol: "",
      NumofSymbol: "",
      BeamIndex: "",
      BfweightUpdate: "",
      CompMethod: "",
      IqWidth: "",
      BeamForming: "",
      ScaleFactor: "",
      Remask: "",
    });
    if(listName === "PreconfRUProfileTable"){
      
      for(var i=0;i <= PreconfRUrows.length;i++)
        {
          if (!(PreconfRUrows?.filter(c => c.RUIndex.toString() === i.toString()).length > 0)) {
            isnotexits=true;
            index=i;
          }
        }
     if(isnotexits)
      {
        id= index;
      }
    }
    if(id <=127){
      setselectePreconfRURow({
        id: index.toString(),
        RUIndex: index.toString(),
        RUInstanceId: "",
      });
    }
    else{
      setSaveSucesopen(true);
      setSucessmsg("RUIndex allowed range is 0-127");
      setsavedialogTitle("Warning");
      setOpen(false);
    } 
  };

  const [currentTabIndex, setCurrentTabIndex] = useState(0);

  const handleTreeItemClick = (itemId: string, duid: string) => {
    document?.getElementById('_omDiv')?.scrollTo(0, 0);
    //setdudata(null);
    setcurrentDu(duid);
    let seletedduData = duConfigdata?.find(function (dudata: any) {
      return dudata.Duid === duid;
    });
    dudata=seletedduData;
    setdudata(seletedduData);
    if(itemId=="42")
    {  setcurrentRUI("RU Instance-1")
      setODUWindowDataList(dudata?.ODUWindowDataList);
    }
    if(itemId=="61")
    {  setcurrentqosid("QOS Instance-1")
        setqoslist(dudata?.qoslist);
    }
    if(itemId=="100")
    {  setcurrentdrx("DRX Instance-1")
      setDrxProfileIdInfoList(dudata?.DrxProfileIdInfoList);
    }
    if(itemId=="5")
    { 
      setAllowedServCells(dudata?.srblist?.AllowedServCells);
      setsrdelaytimer(dudata?.srblist?.srdelaytimer);
      setmaxpuschduration(dudata?.srblist?.maxpuschduration);
    }

    if (itemId) {
      setCurrentTreeIndex(parseInt(itemId))
    } else {
      setCurrentTreeIndex(0)
    }
  }

  const handleOUWTreeItemClick = (itenId: string, duid: string,  ouwid: number) => {
    document?.getElementById('_omDiv')?.scrollTo(0, 0);
    setcurrentDu(duid);

    let seletedduData = duConfigdata?.find(function (dudata: any) {
      return dudata.Duid === duid;
    });
    
    setcurrentRUI(`RU Instance - ${ouwid}`);

    
    seletedduData?.ODUWindowDataList?.sort((a:any,b:any) => {
      if (""+a["id"]<(""+b["id"])) return -1;
      if (""+a["id"]>(""+b["id"])) return 1;
      return 0;
  });

  setdudata(seletedduData);
   // let newRow = seletedduData?.ODUWindowDataList?.find((item) => item.id == ouwid);
   let newRow = ODUWindowDataList?.find((item) => item.id == ouwid);
    let newrows: any=[];
    newrows.push(newRow)
    ODUWindowrow=newrows;
    setODUWindowRow(ODUWindowrow);
    if(ODUWindowrow && ODUWindowrow?.length>0)
    {
    setPrbDlrows(ODUWindowrow[0]?.PrbUlInfolist)
    setPrbUlrows(ODUWindowrow[0]?.PrbUlInfolist)
    }
   
    if (itenId) {
      setCurrentTreeIndex(parseInt(itenId))
    } else {
      setCurrentTreeIndex(0)
    }
  }
  const handleQOSListTreeItemClick = (itenId: string, duid: string, qosid:number,index:number) => {
    document?.getElementById('_omDiv')?.scrollTo(0, 0);
    setcurrentDu(duid);
    let seletedduData = duConfigdata?.find(function (dudata: any) {
      return dudata.Duid === duid;
    });
    setselectedqosindex(index)
    setcurrentqosid("QOS instance-"+qosid)

    seletedduData?.qoslist?.sort((a:any,b:any) => {
      if (""+a["id"]<(""+b["id"])) return -1;
      if (""+a["id"]>(""+b["id"])) return 1;
      return 0;
  });

  setdudata(seletedduData);
  let newRow = qoslist?.find((item) => item.id == qosid);
    let newrows: any=[];
    newrows.push(newRow)
    qosrow=newrows;
    setqosRow(qosrow);

    if (itenId) {
      setCurrentTreeIndex(parseInt(itenId))
    } else {
      setCurrentTreeIndex(0)
    }
  }

  const handleDRXListTreeItemClick = (itenId: string, duid: string, drxid:number,index:number) => {
    document?.getElementById('_omDiv')?.scrollTo(0, 0);
    setcurrentDu(duid);
    let seletedduData = duConfigdata?.find(function (dudata: any) {
      return dudata.Duid === duid;
    });
    setselectedrxindex(index)
    setcurrentdrx("DRX Instance-"+drxid)

    seletedduData?.DrxProfileIdInfoList?.sort((a:any,b:any) => {
      if (""+a["id"]<(""+b["id"])) return -1;
      if (""+a["id"]>(""+b["id"])) return 1;
      return 0;
  });
  dudata=seletedduData; 
  setdudata(seletedduData);
  let newRow = seletedduData?.DrxProfileIdInfoList?.find((item) => item.id == drxid);
    let newrows: any=[];
    newrows.push(newRow)
    DrxProfileIdInfoListrow=newrows;
    setDrxProfileIdInfoListRow(DrxProfileIdInfoListrow);

    if (itenId) {
      setCurrentTreeIndex(parseInt(itenId))
    } else {
      setCurrentTreeIndex(0)
    }
  }

  const onDeleteRow = (listName: any, id: any) => {
    if (listName === "SectorConfigurationTable") {
      const newRows = sectorconfigurationrows?.filter((item) => item.id !== id);
      console.log("newRows--> ", newRows);
      setsectorconfigurationrows(newRows);
      dudata.SectorconfigurationDataList = newRows;
    }
    else if (listName === "ManagedNFServiceTable") {
      const newRows = ManagedNFServicerows?.filter((item) => item.id !== id);
      setManagedNFServicerows(newRows);
      dudata.ManagedNFServiceList = newRows;
    }
    else if (listName === "EndPointTable") {
      const newRows = endpointrows?.filter((item) => item.id !== id);
      setendpointrows(newRows);
      dudata.EndPointList = newRows;
    }
    else if (listName === "DrxProfileIdTable") {
      const newRows = drxprofileidrows?.filter((item) => item.id !== id);
      setdrxprofileidrows(newRows);
      if( dudata.DrxProfileIdInfoList)
      dudata.DrxProfileIdInfoList = newRows;
    }
    if (listName === "SchedulingReqConfTable") {
      const selectedIndex = selecteddrxindex;
      if (DrxProfileIdInfoList && DrxProfileIdInfoList[selectedIndex] && DrxProfileIdInfoList[selectedIndex]?.SchedulingReqConfInfoList) {
         
          const newRows = DrxProfileIdInfoList[selectedIndex]?.SchedulingReqConfInfoList?.filter((item) => item.id !== id);
         
          const updatedDrxProfileIdInfoList = [...DrxProfileIdInfoList];
          updatedDrxProfileIdInfoList[selectedIndex] = {
              ...updatedDrxProfileIdInfoList[selectedIndex],
              SchedulingReqConfInfoList: newRows
          };
          setDrxProfileIdInfoList(updatedDrxProfileIdInfoList);
         if( dudata.DrxProfileIdInfoList)
          dudata.DrxProfileIdInfoList = updatedDrxProfileIdInfoList;
      }
  }
    else if (listName === "MacParamTable") {
      const newRows = macparamrows?.filter((item) => item.id !== id);
      setmacparamrows(newRows);
      dudata.MacParamInfoList = newRows;
    }
    else if (listName === "SrDelayTimerTable") {
      const newRows = srdelaytimerrows?.filter((item) => item.id !== id);
      setsrdelaytimerrows(newRows);
      dudata.srDelayTimerInfoList = newRows;
    }
    else if (listName === "ScellDeactiveTable") {
      const newSDRows = Scelldeactiverows?.filter((item) => item.id !== id);
      setScelldeactiverows(newSDRows);
      dudata.ScellDeactiveInfoList = newSDRows;
    }
    else if (listName === "SectorCarrierTable") {
      const newSCRows = sectorcarrierrows?.filter((item) => item.id !== id);
      console.log("newSCRows--> ", newSCRows);
      setsectorcarrierrows(newSCRows);
      dudata.SectorCarrierList = newSCRows;
    }
    else if (listName === "BwpTable") {
      const newBwpRows = bwprows?.filter((item) => item.id !== id);
      setbwprows(newBwpRows);
      dudata.BwpList = newBwpRows;
    }
    else if (listName === "NRCellDuTable") {
      const newNRCRows = NRCellDurows?.filter((item) => item.id !== id);
      console.log("newNRCRows--> ", newNRCRows);
      setNRCellDurows(newNRCRows);
      dudata.NRCellDUList = newNRCRows;
    }
    else if (listName === "PrbDlTable") {
      if (ODUWindowDataList && ODUWindowDataList[selectedoduwindowindex] && ODUWindowDataList[selectedoduwindowindex]?.PrbDlInfolist) {
        const modifiedRows = ODUWindowDataList[selectedoduwindowindex]?.PrbDlInfolist?.filter((item: { id: any; }) => item.id !== id);
    
        const updatedODUWindowDataList = [...ODUWindowDataList];
        updatedODUWindowDataList[selectedoduwindowindex] = {
          ...updatedODUWindowDataList[selectedoduwindowindex],
          PrbDlInfolist: modifiedRows
        };
        setODUWindowDataList(updatedODUWindowDataList);
        dudata.ODUWindowDataList = updatedODUWindowDataList;
    }
  }
    else if (listName === "PrbUlTable") {
      if (ODUWindowDataList && ODUWindowDataList[selectedoduwindowindex] && ODUWindowDataList[selectedoduwindowindex]?.PrbUlInfolist) {
        const modifiedRows = ODUWindowDataList[selectedoduwindowindex]?.PrbUlInfolist?.filter((item: { id: any; }) => item.id !== id);
    
        const updatedODUWindowDataList = [...ODUWindowDataList];
        updatedODUWindowDataList[selectedoduwindowindex] = {
          ...updatedODUWindowDataList[selectedoduwindowindex],
          PrbUlInfolist: modifiedRows
        };
        setODUWindowDataList(updatedODUWindowDataList);
        dudata.ODUWindowDataList = updatedODUWindowDataList;
    }
    }
    else if (listName === "PreconfRUProfileTable") {
      const newPRERows = PreconfRUrows?.filter((item) => item.id !== id);
      setPreconfRUrows(newPRERows);
      setruindexoptions(newPRERows)
      dudata.PreconfRUProfileList = newPRERows;
    }
  };

  React.useEffect(() => {
    setsectorconfigurationrows(sectorconfigurationrows);
  }, [sectorconfigurationrows]);

  React.useEffect(() => {
    setManagedNFServicerows(ManagedNFServicerows);
  }, [ManagedNFServicerows]);

  React.useEffect(() => {
    setendpointrows(endpointrows);
  }, [endpointrows]);

  React.useEffect(() => {
    setdrxprofileidrows(drxprofileidrows);
  }, [drxprofileidrows]);

  React.useEffect(() => {
    setschedulingreqconfrows(schedulingreqconfrows);
  }, [schedulingreqconfrows]);

  React.useEffect(() => {
    setmacparamrows(macparamrows);
  }, [macparamrows]);

  React.useEffect(() => {
    setsrdelaytimerrows(srdelaytimerrows);
  }, [srdelaytimerrows]);

  React.useEffect(() => {
    setqosulrows(qosulrows);
  }, [qosulrows]);

  React.useEffect(() => {
    setqosdlrows(qosdlrows);
  }, [qosdlrows]);

  React.useEffect(() => {
    setScelldeactiverows(Scelldeactiverows);
  }, [Scelldeactiverows]);

  React.useEffect(() => {
    setsectorcarrierrows(sectorcarrierrows);
  }, [sectorcarrierrows]);

  React.useEffect(() => {
    setbwprows(bwprows);
  }, [bwprows]);
  
  React.useEffect(() => {
    setNRCellDurows(NRCellDurows);
  }, [NRCellDurows]);


  React.useEffect(() => {
    setODUWindowRows(ODUWindowrows);
  }, [ODUWindowrows]);

  React.useEffect(() => {
    setqosRow(qosrow);
  }, [qosrow]);

  React.useEffect(() => {
    setDrxProfileIdInfoListRow(DrxProfileIdInfoListrow);
  }, [DrxProfileIdInfoListrow]);

  React.useEffect(() => {
    setPrbDlrows(PrbDlrows);
  }, [PrbDlrows]);

  React.useEffect(() => {
    setPrbUlrows(PrbUlrows);
  }, [PrbUlrows]);

  React.useEffect(() => {
    setPreconfRUrows(PreconfRUrows);
    setruindexoptions(PreconfRUrows);
  }, [PreconfRUrows]);

  const handleEditOpen = (listName: any, listTitle: any, row: any) => {
    setOpen(true);
    setdialogTitle("Edit Record");
    setisEdit(true);
    setlistName(listName);
    setlistTitle(listTitle);
    setErrors({
      priorityLabelError: false, gNBDUIdError: false, gNBIdLengthError: false, localError: false, remoteError: false,arfcnULError:false,arfcnDLError:false,sapportError:false,ConfigMaxTxPowerError:false,RUIndexIdError:false,
      vlanidError: false, drxharqrttdlError: false, drxharqrttulError: false, logicalchannelError: false, maxulharqtxError: false, maxdlharqtxError: false, IndexError: false,schedulingrequestError:false,RUIndexError:false,
      startRBError: false, NumberOfRBsError: false, NRPCIError: false, NRTACError: false, ta4MinError: false, ta4MaxError: false, t1aMinCpDlError: false, t1aMinCpUlError: false,  SAPHostError:false,RUupmacError: false,
      t1aMinUlError: false, t1aMaxCpDlError: false, t1aMaxCpUlError: false, t1aMaxUpError: false, t12MinError: false, t12MaxError: false, t34MinError: false, t34MaxError: false, RUCountError: false,fhgNBDUIdError: false,RUcpmacError: false,
      t2aMinUpError: false, t2aMaxUpError: false, t2aMinCpDlError: false, t2aMinCpUlError: false, t2aMaxCpDlError: false, t2aMaxCpUlError: false, ta3MinError: false, ta3MaxError: false,macError: false,BandwidthError:false,PriorityError: false,
      CompMethodError: false, UpvalnIdError: false, CpvlanIdError: false, ULElemIndexError: false, ULRbStartError: false, ULRbSizeError: false, ULStartSymbolError: false, ULNumofSymbolError: false, ULBeamIndexError: false,DUIndexError:false,
      ULBfweightUpdateError: false, ULCompMethodError: false, ULIqWidthError: false, ULBeamFormingError: false, ULScaleFactorError: false, ULRemaskError: false, DLElemIndexError: false, DLRbStartError: false, DLRbSizeError: false, 
      DLStartSymbolError: false, DLNumofSymbolError: false, DLBeamIndexError: false, DLBfweightUpdateError: false, DLCompMethodError: false, DLIqWidthError: false, DLBeamFormingError: false, DLScaleFactorError: false, DLRemaskError: false
    });
    if (listName === "SectorConfigurationTable") {
      setSectorConfRow({
        id: row.id,
        PriorityLabel: row.PriorityLabel,
        tXDirection: row.tXDirection,
        ConfigMaxTxPower: row.ConfigMaxTxPower,
        arfcnDL: row.arfcnDL,
        arfcnUL: row.arfcnUL,
        bSChannelBwDl: row.bSChannelBwDl,
        bSChannelBwUl: row.bSChannelBwUl,
      });
    }
    else if (listName === "ManagedNFServiceTable") {
      setManagedNFServiceRow({
        id: row.id,
        AdministrativeState: row.AdministrativeState,
        saphost: row.saphost,
        sapport: row.sapport,
        operationsName: row.operationsName,
        operationsAllowed: row.operationsAllowed,
      });
    }
    else if (listName === "EndPointTable") {
      setEndPointRow({
        id: row.id,
        EndPoint: row.EndPoint,
        LocalIPAddress: row.LocalIPAddress,
        VLANID: row.VLANID,
        RemoteIPAddress: row.RemoteIPAddress,
      });
    }
    else if (listName === "SchedulingReqConfTable") {
      setSchedulingReqConfRow({
        id: row.id,
        schedulingrequest: row.schedulingrequest,
        scprohibittimer: row.scprohibittimer,
        sctransmax: row.sctransmax,
      });
    }
    
    else if (listName === "ScellDeactiveTable") {
      setscellDeactiveRow({
        id: row.id,
        Index: row.Index,
        DeactivationTimer: row.DeactivationTimer,
      });
    }
    else if (listName === "SectorCarrierTable") {
      setSectorCarrierRow({
        id: row.id,
        PriorityLabel: row.PriorityLabel,
        tXDirection: row.tXDirection,
        ConfigMaxTxPower: row.ConfigMaxTxPower,
        arfcnDL: row.arfcnDL,
        arfcnUL: row.arfcnUL,
        bSChannelBwDl: row.bSChannelBwDl,
        bSChannelBwUl: row.bSChannelBwUl,
      });
    }
    else if (listName === "BwpTable") {
      setBwpRow({
        id: row.id,
        PriorityLabel: row.PriorityLabel,
        bwpContext: row.bwpContext,
        SubCarrierSpacing: row.SubCarrierSpacing,
        cyclePrefix: row.cyclePrefix,
        startRB: row.startRB,
        NumberOfRBs: row.NumberOfRBs,
        isInitiaLBwp: row.isInitiaLBwp,
      });
    }
    else if (listName === "NRCellDuTable") {
      setNRCellDuRow({
        id: row.id,
        NRPCI: row.NRPCI,
        NRTAC: row.NRTAC,
        ResourceType: row.ResourceType,
        CellLocalId: row.CellLocalId,
        cellId: row.cellId,
        BwplistId: row.BwplistId,
        NRSectorCarrierReflistId: row.NRSectorCarrierReflistId,
      });
    }
    else if (listName === "PrbDlTable") {
      setselectePrbDlRow({
        id: row.id,
        ElemIndex: row.ElemIndex,
        RbStart: row.RbStart,
        RbSize: row.RbSize,
        StartSymbol: row.StartSymbol,
        NumofSymbol: row.NumofSymbol,
        BeamIndex: row.BeamIndex,
        BfweightUpdate: row.BfweightUpdate,
        CompMethod: row.CompMethod,
        IqWidth: row.IqWidth,
        BeamForming: row.BeamForming,
        ScaleFactor: row.ScaleFactor,
        Remask: row.Remask
      });
    }
    else if (listName === "PrbUlTable") {
      setselectePrbUlRow({
        id: row.id,
        ElemIndex: row.ElemIndex,
        RbStart: row.RbStart,
        RbSize: row.RbSize,
        StartSymbol: row.StartSymbol,
        NumofSymbol: row.NumofSymbol,
        BeamIndex: row.BeamIndex,
        BfweightUpdate: row.BfweightUpdate,
        CompMethod: row.CompMethod,
        IqWidth: row.IqWidth,
        BeamForming: row.BeamForming,
        ScaleFactor: row.ScaleFactor,
        Remask: row.Remask
      });
    }

    else if (listName === "PreconfRUProfileTable") {
      setselectePreconfRURow({
        id: row.id,
        RUIndex: row.RUIndex,
        RUInstanceId: row.RUInstanceId,
      });
    }

  };
  const handleClose = (_event: any, reason: string) => {
    if (reason != "backdropClick" && reason != "escapeKeyDown") {
      setOpen(false);
    }
  };
  const saveSectorConfigurationData = () => {
    setSaveSucesopen(false);
    const areFieldsFilled = sectorConfRow.PriorityLabel && sectorConfRow.tXDirection && sectorConfRow.ConfigMaxTxPower && sectorConfRow.arfcnDL
	  && sectorConfRow.arfcnUL && sectorConfRow.bSChannelBwDl && sectorConfRow.bSChannelBwUl;

    if (!areFieldsFilled) {
        setSaveSucesopen(true);
        setSucessmsg("All fields must be filled.");
        setsavedialogTitle("Warning");
        return; // Exit the function if validation fails
    }
    if (isEdit) {
      sectorconfigurationrows = sectorconfigurationrows?.map(row => {
        if (row.id === sectorConfRow.id) {
          return {
            ...row,
            ['PriorityLabel']: sectorConfRow.PriorityLabel,
            ['tXDirection']: sectorConfRow.tXDirection,
            ['ConfigMaxTxPower']: sectorConfRow.ConfigMaxTxPower,
            ['arfcnDL']: sectorConfRow.arfcnDL,
            ['arfcnUL']: sectorConfRow.arfcnUL,
            ['bSChannelBwDl']: sectorConfRow.bSChannelBwDl,
            ['bSChannelBwUl']: sectorConfRow.bSChannelBwUl,
          };

        }
        return row;
      });
      setsectorconfigurationrows(sectorconfigurationrows);
      dudata.SectorconfigurationDataList = sectorconfigurationrows;
    }
    else {
      const newRows = sectorconfigurationrows?.map(row => {
        return row;
      });
	  let newrow = AddnewSectorConfigurationData(sectorConfRow.PriorityLabel, sectorConfRow.tXDirection, sectorConfRow.ConfigMaxTxPower, sectorConfRow.arfcnDL
	  ,sectorConfRow.arfcnUL, sectorConfRow.bSChannelBwDl, sectorConfRow.bSChannelBwUl);
      
      var isduplecate = newRows?.some(item =>(newrow.PriorityLabel == item.PriorityLabel && newrow.tXDirection==item.tXDirection && newrow.ConfigMaxTxPower==item.ConfigMaxTxPower && newrow.arfcnDL==item.arfcnDL 
        && newrow.arfcnUL == item.arfcnUL && newrow.bSChannelBwDl==item.bSChannelBwDl && newrow.bSChannelBwUl==item.bSChannelBwUl  ));

      if(isduplecate==true)
        {
          setSaveSucesopen(true);
          setSucessmsg("SectorConfiguration List row should be unique.");
          setsavedialogTitle("Warning");
          return ;
        }
      else {
      newRows.push(AddnewSectorConfigurationData
        (sectorConfRow.PriorityLabel,
          sectorConfRow.tXDirection,
          sectorConfRow.ConfigMaxTxPower,
          sectorConfRow.arfcnDL,
          sectorConfRow.arfcnUL,
          sectorConfRow.bSChannelBwDl,
          sectorConfRow.bSChannelBwUl,
        ))
      setsectorconfigurationrows(newRows);
      dudata.SectorconfigurationDataList = newRows;
    }
	}
    setSectorConfRow({
      id: "",
      PriorityLabel: "",
      tXDirection: "",
      ConfigMaxTxPower: "",
      arfcnDL: "",
      arfcnUL: "",
      bSChannelBwDl: "",
      bSChannelBwUl: "",
    });
  }
  const saveManagedNFServiceData = () => {
    setSaveSucesopen(false);
    const areFieldsFilled = managedNFServiceRow.AdministrativeState && managedNFServiceRow.saphost && managedNFServiceRow.sapport&& managedNFServiceRow.operationsName && managedNFServiceRow.operationsAllowed;

    if (!areFieldsFilled) {
        setSaveSucesopen(true);
        setSucessmsg("All fields must be filled.");
        setsavedialogTitle("Warning");
        return; // Exit the function if validation fails
    }
    if (isEdit) {
      const newRows = ManagedNFServicerows?.map(row => {
        return row;
      });
	  let newrow = createManagedNFServiceInfo(managedNFServiceRow.id,managedNFServiceRow.AdministrativeState, managedNFServiceRow.saphost, managedNFServiceRow.sapport, managedNFServiceRow.operationsName , managedNFServiceRow.operationsAllowed);
      
      var isduplecate = newRows?.some(item =>(newrow.AdministrativeState == item.AdministrativeState && newrow.saphost==item.saphost && newrow.sapport==item.sapport && newrow.operationsName==item.operationsName && newrow.operationsAllowed==item.operationsAllowed && item.id != newrow.id ));

      if(isduplecate==true)
        {
          setSaveSucesopen(true);
          setSucessmsg("Managed NF Service List row should be unique.");
          setsavedialogTitle("Warning");
          return ;
        }
      else{
        ManagedNFServicerows = ManagedNFServicerows?.map(row => {
          if (row.id === managedNFServiceRow.id) {
            return {
              ...row,
              ['AdministrativeState']: managedNFServiceRow.AdministrativeState,
              ['saphost']: managedNFServiceRow.saphost,
              ['sapport']: managedNFServiceRow.sapport,
              ['operationsName']: managedNFServiceRow.operationsName,
              ['operationsAllowed']: managedNFServiceRow.operationsAllowed,
            };
          }
          return row;
        });
        setManagedNFServicerows(ManagedNFServicerows);
        dudata.ManagedNFServiceList = ManagedNFServicerows;
      }
    }
    else {
      const newRows = ManagedNFServicerows?.map(row => {
        return row;
      });
	  let newrow = createManagedNFServiceInfo(managedNFServiceRow.id,managedNFServiceRow.AdministrativeState, managedNFServiceRow.saphost, managedNFServiceRow.sapport, managedNFServiceRow.operationsName , managedNFServiceRow.operationsAllowed);
      
      var isduplecate = newRows?.some(item =>(newrow.AdministrativeState == item.AdministrativeState && newrow.saphost==item.saphost && newrow.sapport==item.sapport && newrow.operationsName==item.operationsName && newrow.operationsAllowed==item.operationsAllowed ));

      if(isduplecate==true)
        {
          setSaveSucesopen(true);
          setSucessmsg("Managed NF Service List row should be unique.");
          setsavedialogTitle("Warning");
          return ;
        }
      else {
      newRows.push(createManagedNFServiceInfo
        (managedNFServiceRow.id,managedNFServiceRow.AdministrativeState,
          managedNFServiceRow.saphost,
          managedNFServiceRow.sapport,
          managedNFServiceRow.operationsName,
          managedNFServiceRow.operationsAllowed,
        ))
      setManagedNFServicerows(newRows);
      dudata.ManagedNFServiceList = newRows;
    }
    }
    setManagedNFServiceRow({
      id: "",
      AdministrativeState: "",
      saphost: "",
      sapport: "",
      operationsName: "",
      operationsAllowed: "",
    });
  }
  const saveEndPointData = () => {
    setSaveSucesopen(false);
    const areFieldsFilled = endPointRow.EndPoint && endPointRow.LocalIPAddress && endPointRow.VLANID && endPointRow.RemoteIPAddress;

    if (!areFieldsFilled) {
        setSaveSucesopen(true);
        setSucessmsg("All fields must be filled.");
        setsavedialogTitle("Warning");
        return; // Exit the function if validation fails
    }
      if (isEdit) {
        const newRows = endpointrows?.map(row => {
          return row;
        });
      let newrow = createEndPointInfo(endPointRow.EndPoint, endPointRow.LocalIPAddress, endPointRow.VLANID, endPointRow.RemoteIPAddress);
        
        var isduplecate = newRows?.some(item =>(newrow.EndPoint == item.EndPoint && item.id != endPointRow.id  ));
  
        if(isduplecate==true)
          {
            setSaveSucesopen(true);
            setSucessmsg("End Point List row should be unique.");
            setsavedialogTitle("Warning");
            return ;
          }
        else{
          endpointrows = endpointrows?.map(row => {
            if (row.id === endPointRow.id) {
              return {
                ...row,
                ['EndPoint']: endPointRow.EndPoint,
                ['LocalIPAddress']: endPointRow.LocalIPAddress,
                ['VLANID']: endPointRow.VLANID,
                ['RemoteIPAddress']: endPointRow.RemoteIPAddress,
              };
            }
            return row;
          });
          setendpointrows(endpointrows);
          dudata.EndPointList = endpointrows;
        }
      }
      else {
        const newRows = endpointrows?.map(row => {
          return row;
        });
      let newrow = createEndPointInfo(endPointRow.EndPoint, endPointRow.LocalIPAddress, endPointRow.VLANID, endPointRow.RemoteIPAddress);
        
        var isduplecate = newRows?.some(item =>(newrow.EndPoint == item.EndPoint  ));
  
        if(isduplecate==true)
          {
            setSaveSucesopen(true);
            setSucessmsg("End Point List row should be unique.");
            setsavedialogTitle("Warning");
            return ;
          }
        else {
        newRows.push(createEndPointInfo
          (endPointRow.EndPoint,
            endPointRow.LocalIPAddress,
            endPointRow.VLANID,
            endPointRow.RemoteIPAddress
          ))
        setendpointrows(newRows);
        dudata.EndPointList = newRows;
      }
    }
      setEndPointRow({
        id: "",
        EndPoint: "",
        LocalIPAddress: "",
        VLANID: "",
        RemoteIPAddress: "",
      });
    }
    const saveSchedulingReqConfData = () => {
      setSaveSucesopen(false);
      const areFieldsFilled = schedulingReqConfRow.schedulingrequest &&
                              schedulingReqConfRow.scprohibittimer &&
                               schedulingReqConfRow.sctransmax;

    if (!areFieldsFilled) {
        setSaveSucesopen(true);
        setSucessmsg("All fields must be filled.");
        setsavedialogTitle("Warning");
        return; // Exit the function if validation fails
    }
      const updatedDrxProfileIdInfoList = [...DrxProfileIdInfoList];
      const selectedIndex = selecteddrxindex ;
      if (DrxProfileIdInfoList && updatedDrxProfileIdInfoList[selectedIndex] && updatedDrxProfileIdInfoList[selectedIndex].SchedulingReqConfInfoList) {
          if (isEdit) {
            const newItem = createSchedulingReqConfInfo(
              schedulingReqConfRow.id,
              schedulingReqConfRow.schedulingrequest,
              schedulingReqConfRow.scprohibittimer,
              schedulingReqConfRow.sctransmax
          );
          console.log("newitem",newItem)
          console.log ("log",updatedDrxProfileIdInfoList[selectedIndex]?.SchedulingReqConfInfoList)
          console.log(updatedDrxProfileIdInfoList)
          const isDuplicate = updatedDrxProfileIdInfoList[selectedIndex]?.SchedulingReqConfInfoList?.some(item => 
              parseInt(item.schedulingrequest )=== parseInt(newItem.schedulingrequest) &&
              item.scprohibittimer === newItem.scprohibittimer &&
              item.sctransmax === newItem.sctransmax
              && item.id != newItem.id
          );

          if (isDuplicate) {
              setSaveSucesopen(true);
              setSucessmsg("Scheduling Request Configuration Row should be unique.");
              setsavedialogTitle("Warning");
              return;
          }
              updatedDrxProfileIdInfoList[selectedIndex].SchedulingReqConfInfoList = updatedDrxProfileIdInfoList[selectedIndex]?.SchedulingReqConfInfoList?.map((row) => {
                  if (row.id === schedulingReqConfRow.id) {
                      return {
                          ...row,
                          schedulingrequest: schedulingReqConfRow.schedulingrequest,
                          scprohibittimer: schedulingReqConfRow.scprohibittimer,
                          sctransmax: schedulingReqConfRow.sctransmax,
                      };
                  }
                  return row;
              });
              console.log(updatedDrxProfileIdInfoList)
              setDrxProfileIdInfoList(updatedDrxProfileIdInfoList);
              if( dudata.DrxProfileIdInfoList)
              dudata.DrxProfileIdInfoList = updatedDrxProfileIdInfoList;
          } else {
              const newItem = createSchedulingReqConfInfo(
                  schedulingReqConfRow.id,
                  schedulingReqConfRow.schedulingrequest,
                  schedulingReqConfRow.scprohibittimer,
                  schedulingReqConfRow.sctransmax
              );
              console.log("newitem",newItem)
              console.log ("log",updatedDrxProfileIdInfoList[selectedIndex]?.SchedulingReqConfInfoList)
              console.log(updatedDrxProfileIdInfoList)
              const isDuplicate = updatedDrxProfileIdInfoList[selectedIndex]?.SchedulingReqConfInfoList?.some(item => 
                  parseInt(item.schedulingrequest )=== parseInt(newItem.schedulingrequest) &&
                  item.scprohibittimer === newItem.scprohibittimer &&
                  item.sctransmax === newItem.sctransmax
              );
    
              if (isDuplicate) {
                  setSaveSucesopen(true);
                  setSucessmsg("Scheduling Request Configuration Row should be unique.");
                  setsavedialogTitle("Warning");
                  return;
              }
              updatedDrxProfileIdInfoList[selectedIndex].SchedulingReqConfInfoList.push(newItem);
              setDrxProfileIdInfoList(updatedDrxProfileIdInfoList);
              if( dudata.DrxProfileIdInfoList)
              dudata.DrxProfileIdInfoList = updatedDrxProfileIdInfoList;
          }
          setSchedulingReqConfRow({
              id: "",
              schedulingrequest: "",
              scprohibittimer: "",
              sctransmax: "",
          });
      } else {
          console.error("The selected index or SchedulingReqConfInfoList is undefined.");
      }
    };
    const saveMacParamData = () => {
      if (isEdit) {
        const updatedList = srblist?.map(row => {
          if (row.id === macParamRow.id) {
            return {
              ...row,
              ['Priority']: macParamRow.Priority,
              ['AllowedServCells']: macParamRow.AllowedServCells,
            };
          }
          return row;
        });
  
        setsrblist(updatedList);
        //dudata.srblist = srblist;
        setdudata({ srblist: updatedList });
      }
      else {
        const newRows = srblist?.map(row => {
          return row;
        });
        newRows.push(createMacParamInfo
          (macParamRow.Priority, macParamRow.AllowedServCells,))
        // setsrblist(newRows);
        // dudata.srblist = newRows;
        setsrblist(newRows);
        setdudata({ srblist: newRows });
      }
      setMacParamRow({
        id: "",
        Priority: "",
        AllowedServCells: "",
      });
    }
    const saveSrDelayTimerData = () => {
      if (isEdit) {
        srblist = srblist?.map(row => {
          if (row.id === SrDelayTimerRow.id) {
            return {
              ...row,
              ['maxpuschduration']: SrDelayTimerRow.maxpuschduration,
              ['srdelaytimer']: SrDelayTimerRow.srdelaytimer,
  
            };
          }
          return row;
        });
        setsrblist(srblist);
        dudata.srblist = srblist;
      }
      else {
        const newRows = srblist?.map(row => {
          return row;
        });
        newRows.push(createSrDelayTimerInfo
          (
            SrDelayTimerRow.maxpuschduration,
            SrDelayTimerRow.srdelaytimer,
  
          ))
        setsrblist(newRows);
        dudata.srblist = newRows;
      }
      setSrDelayTimerRow({
        id: "",
        maxpuschduration: "",
        srdelaytimer: "",
      });
    }

  const saveScellDeactiveData = () => {
    setSaveSucesopen(false);
    const areFieldsFilled = scellDeactiveRow.Index && scellDeactiveRow.DeactivationTimer;

    if (!areFieldsFilled) {
        setSaveSucesopen(true);
        setSucessmsg("All fields must be filled.");
        setsavedialogTitle("Warning");
        return; // Exit the function if validation fails
    }
     if (isEdit) {
      const newRows = Scelldeactiverows?.map(row => {
        return row;
      });
    let newrow = createScellDeactiveInfo(scellDeactiveRow.id,scellDeactiveRow.Index, scellDeactiveRow.DeactivationTimer);
      
      var isduplecate = newRows?.some(item =>( newrow.Index === item.Index  ));
       console.log("value",isduplecate)
      if(isduplecate==true)
        {
          setSaveSucesopen(true);
          setSucessmsg("Scell Deactivation Timer List row should be unique.");
          setsavedialogTitle("Warning");
          return ;
        }
       Scelldeactiverows = Scelldeactiverows?.map(row => {
         if (row.id === scellDeactiveRow.id) {
           return {
             ...row,
             ['Index']: scellDeactiveRow.Index,
             ['DeactivationTimer']: scellDeactiveRow.DeactivationTimer,
           };
         }
         return row;
       });
       setScelldeactiverows(Scelldeactiverows);
       dudata.ScellDeactiveInfoList = Scelldeactiverows;
     }
     else {
       const newRows = Scelldeactiverows?.map(row => {
         return row;
       });
     let newrow = createScellDeactiveInfo(scellDeactiveRow.id,scellDeactiveRow.Index, scellDeactiveRow.DeactivationTimer);
       
       var isduplecate = newRows?.some(item =>( newrow.Index == item.Index  ));
        console.log("value",isduplecate)
       if(isduplecate==true)
         {
           setSaveSucesopen(true);
           setSucessmsg("Scell Deactivation Timer List row should be unique.");
           setsavedialogTitle("Warning");
           return ;
         }
       else {
       newRows.push(createScellDeactiveInfo
         (scellDeactiveRow.id,scellDeactiveRow.Index, scellDeactiveRow.DeactivationTimer,))
       setScelldeactiverows(newRows);
       dudata.ScellDeactiveInfoList = newRows;
     }
    }
     setscellDeactiveRow({
       id: "",
       Index: "",
       DeactivationTimer: "",
     });
   }
   const saveSectorCarrierData = () => {
    setSaveSucesopen(false);
    const areFieldsFilled = sectorCarrierRow.PriorityLabel && sectorCarrierRow.tXDirection && sectorCarrierRow.ConfigMaxTxPower && sectorCarrierRow.arfcnDL
                            && sectorCarrierRow.arfcnUL && sectorCarrierRow.bSChannelBwDl && sectorCarrierRow.bSChannelBwUl;         
    if (!areFieldsFilled) {
        setSaveSucesopen(true);
        setSucessmsg("All fields must be filled.");
        setsavedialogTitle("Warning");
        return; // Exit the function if validation fails
    }
     if (isEdit) {
       sectorcarrierrows = sectorcarrierrows?.map(row => {
         if (row.id === sectorCarrierRow.id) {
           return {
             ...row,
             ['id']: sectorCarrierRow.id,
             ['PriorityLabel']: sectorCarrierRow.PriorityLabel,
             ['tXDirection']: sectorCarrierRow.tXDirection,
             ['ConfigMaxTxPower']: sectorCarrierRow.ConfigMaxTxPower,
             ['arfcnDL']: sectorCarrierRow.arfcnDL,
             ['arfcnUL']: sectorCarrierRow.arfcnUL,
             ['bSChannelBwDl']: sectorCarrierRow.bSChannelBwDl,
             ['bSChannelBwUl']: sectorCarrierRow.bSChannelBwUl,
           };
         }
         return row;
       });
       setsectorcarrierrows(sectorcarrierrows);
       dudata.SectorCarrierList = sectorcarrierrows;
     } else {
       const newId = sectorcarrierrows.length > 0 ? parseInt(sectorcarrierrows[sectorcarrierrows.length - 1].id.split('NRS-')[1]) + 1 : 0;
       const newRows = sectorcarrierrows?.map(row => {
         return row;
       });
      
       newRows.push(AddnewSectorCarrierData(
         `NRS-${newId}`,// Automatically incremented count
         sectorCarrierRow.PriorityLabel,
         sectorCarrierRow.tXDirection,
         sectorCarrierRow.ConfigMaxTxPower,
         sectorCarrierRow.arfcnDL,
         sectorCarrierRow.arfcnUL,
         sectorCarrierRow.bSChannelBwDl,
         sectorCarrierRow.bSChannelBwUl
       ));
       setsectorcarrierrows(newRows);
       dudata.SectorCarrierList = newRows;
     
     }
     setSectorCarrierRow({
       id: "NR0",
       PriorityLabel: "",
       tXDirection: "",
       ConfigMaxTxPower: "",
       arfcnDL: "",
       arfcnUL: "",
       bSChannelBwDl: "",
       bSChannelBwUl: "",
     });
   };

   const saveBwpData = () => {
    setSaveSucesopen(false);
    const areFieldsFilled = bwpRow.PriorityLabel && bwpRow.bwpContext && bwpRow.SubCarrierSpacing && bwpRow.cyclePrefix 
                            &&bwpRow.startRB && bwpRow.NumberOfRBs && bwpRow.isInitiaLBwp;             
    if (!areFieldsFilled) {
        setSaveSucesopen(true);
        setSucessmsg("All fields must be filled.");
        setsavedialogTitle("Warning");
        return; // Exit the function if validation fails
    }

    if (isEdit) {
      bwprows = bwprows?.map(row => {
        if (row.id === bwpRow.id) {
          return {
            ...row,
            ['id']: bwpRow.id,
            ['PriorityLabel']: bwpRow.PriorityLabel,
            ['bwpContext']: bwpRow.bwpContext,
            ['SubCarrierSpacing']: bwpRow.SubCarrierSpacing,
            ['cyclePrefix']: bwpRow.cyclePrefix,
            ['startRB']: bwpRow.startRB,
            ['NumberOfRBs']: bwpRow.NumberOfRBs,
            ['isInitiaLBwp']: bwpRow.isInitiaLBwp,
          };

        }
        return row;
      });
      setbwprows(bwprows);
      dudata.BwpList = bwprows;
    }
    else {

      const newId = bwprows.length > 0 ? parseInt(bwprows[bwprows.length - 1].id.split('BWP-')[1]) + 1 : 0;
      const newRows = bwprows?.map(row => {
        return row;

      });
	  let newrow = AddBwpData(bwpRow.id,bwpRow.PriorityLabel,
          bwpRow.bwpContext,
          bwpRow.SubCarrierSpacing,
          bwpRow.cyclePrefix,
          bwpRow.startRB,
          bwpRow.NumberOfRBs,
          bwpRow.isInitiaLBwp,);
      
      newRows.push(AddBwpData
        (`BWP-${newId}`,// Automatically incremented count
          bwpRow.PriorityLabel,
          bwpRow.bwpContext,
          bwpRow.SubCarrierSpacing,
          bwpRow.cyclePrefix,
          bwpRow.startRB,
          bwpRow.NumberOfRBs,
          bwpRow.isInitiaLBwp,
        ))
      setbwprows(newRows);
      dudata.BwpList = newRows;
    
  }
    setBwpRow({
      id:  "Bwp0",
      PriorityLabel: "",
      bwpContext: "",
      SubCarrierSpacing: "",
      cyclePrefix: "",
      startRB: "",
      NumberOfRBs: "",
      isInitiaLBwp: "",
    });
  };
  const saveNRCellDuData = () => {
    setSaveSucesopen(false);
    const areFieldsFilled = NRCellDuRow.NRPCI && NRCellDuRow.NRTAC && NRCellDuRow.ResourceType && NRCellDuRow.CellLocalId && NRCellDuRow.cellId && NRCellDuRow.BwplistId && NRCellDuRow.NRSectorCarrierReflistId;
    if (!areFieldsFilled) {
        setSaveSucesopen(true);
        setSucessmsg("All fields must be filled.");
        setsavedialogTitle("Warning");
        return; // Exit the function if validation fails
    }
    if (isEdit) {
      const newRows = NRCellDurows?.map(row => {
        return row;
      });
      console.log("newrows",newRows)
	  let newrow = AddNRCellDuData(NRCellDuRow.id,NRCellDuRow.NRPCI,
          NRCellDuRow.NRTAC,
          NRCellDuRow.ResourceType,
          NRCellDuRow.CellLocalId,
          NRCellDuRow.cellId,
          NRCellDuRow.BwplistId,
          NRCellDuRow.NRSectorCarrierReflistId);
      console.log("newrow",newrow)
      var isduplecate = newRows?.some(item =>( newrow.cellId.toString() == item.cellId.toString() && item.id != newrow.id));
         console.log("Duplicate=",isduplecate)
      if(isduplecate==true)
        {
          setSaveSucesopen(true);
          setSucessmsg("NR Cell DU List row should be unique.");
          setsavedialogTitle("Warning");
          return ;
        }
      NRCellDurows = NRCellDurows?.map(row => {
        if (row.id === NRCellDuRow.id) {
          return {
            ...row,
            ['id']: NRCellDuRow.id,
            ['NRPCI']: NRCellDuRow.NRPCI,
            ['NRTAC']: NRCellDuRow.NRTAC,
            ['ResourceType']: NRCellDuRow.ResourceType,
            ['CellLocalId']: NRCellDuRow.CellLocalId,
            ['cellId']: NRCellDuRow.cellId,
            ['BwplistId']: NRCellDuRow.BwplistId,
            ['NRSectorCarrierReflistId']: NRCellDuRow.NRSectorCarrierReflistId,
          };

        }
        return row;
      });
      setNRCellDurows(NRCellDurows);
      dudata.NRCellDUList = NRCellDurows;
    }
    else {

      const newRows = NRCellDurows?.map(row => {
        return row;
      });
      console.log("newrows",newRows)
	  let newrow = AddNRCellDuData(NRCellDuRow.id,NRCellDuRow.NRPCI,
          NRCellDuRow.NRTAC,
          NRCellDuRow.ResourceType,
          NRCellDuRow.CellLocalId,
          NRCellDuRow.cellId,
          NRCellDuRow.BwplistId,
          NRCellDuRow.NRSectorCarrierReflistId,);
      console.log("newrow",newrow)
      var isduplecate = newRows?.some(item =>( newrow.cellId.toString() == item.cellId.toString() ));
         console.log("Duplicate=",isduplecate)
      if(isduplecate==true)
        {
          setSaveSucesopen(true);
          setSucessmsg("NR Cell DU List row should be unique.");
          setsavedialogTitle("Warning");
          return ;
        }
      else {
      newRows.push(AddNRCellDuData
        (
          NRCellDuRow.id,
          NRCellDuRow.NRPCI,
          NRCellDuRow.NRTAC,
          NRCellDuRow.ResourceType,
          NRCellDuRow.CellLocalId,
          NRCellDuRow.cellId,
          NRCellDuRow.BwplistId,
          NRCellDuRow.NRSectorCarrierReflistId,
        ))
      setNRCellDurows(newRows);
      dudata.NRCellDUList = newRows;
    }
	}
    setNRCellDuRow({
      id: "",
      NRPCI: "",
      NRTAC: "",
      ResourceType: "",
      CellLocalId: "",
      cellId: "",
      BwplistId: "",
      NRSectorCarrierReflistId: "",
    });
  }
  const savePrbDlData = () => {
    setSaveSucesopen(false);
    const areFieldsFilled = selectePrbDlRow.ElemIndex && selectePrbDlRow.RbStart && selectePrbDlRow.RbSize && selectePrbDlRow.StartSymbol && selectePrbDlRow.NumofSymbol && selectePrbDlRow.BeamIndex && selectePrbDlRow.BfweightUpdate && selectePrbDlRow.CompMethod &&
                            selectePrbDlRow.IqWidth && selectePrbDlRow.BeamForming && selectePrbDlRow.ScaleFactor && selectePrbDlRow.Remask;

    if (!areFieldsFilled) {
        setSaveSucesopen(true);
        setSucessmsg("All fields must be filled.");
        setsavedialogTitle("Warning");
        return; // Exit the function if validation fails
    }
     if (isEdit) {
      let newrow = createPrbDlInfo(selectePrbDlRow.id,selectePrbDlRow.ElemIndex, selectePrbDlRow.RbStart, selectePrbDlRow.RbSize, selectePrbDlRow.StartSymbol, selectePrbDlRow.NumofSymbol, selectePrbDlRow.BeamIndex, selectePrbDlRow.BfweightUpdate, selectePrbDlRow.CompMethod,
        selectePrbDlRow.IqWidth, selectePrbDlRow.BeamForming, selectePrbDlRow.ScaleFactor, selectePrbDlRow.Remask);
        console.log(newrow,ODUWindowDataList[selectedoduwindowindex]["PrbDlInfolist"])
    var isduplecate = ODUWindowDataList[selectedoduwindowindex]["PrbDlInfolist"]?.some(item =>(newrow.ElemIndex == item.ElemIndex));
    if(isduplecate==true)
        {
          setSaveSucesopen(true);
          setSucessmsg("PrbDlInfolist row shoDld be unique.");
          setsavedialogTitle("Warning");
          return ;
        }
       PrbDlrows = ODUWindowDataList[selectedoduwindowindex]?.PrbDlInfolist?.map((row: any) => {
         if (row.id === selectePrbDlRow.id) {
           return {
             ...row, ['ElemIndex']: selectePrbDlRow.ElemIndex, ['RbStart']: selectePrbDlRow.RbStart, ['RbSize']: selectePrbDlRow.RbSize, ['StartSymbol']: selectePrbDlRow.StartSymbol,
             ['NumofSymbol']: selectePrbDlRow.NumofSymbol, ['BeamIndex']: selectePrbDlRow.BeamIndex, ['BfweightUpdate']: selectePrbDlRow.BfweightUpdate, ['CompMethod']: selectePrbDlRow.CompMethod,
             ['IqWidth']: selectePrbDlRow.IqWidth, ['BeamForming']: selectePrbDlRow.BeamForming, ['ScaleFactor']: selectePrbDlRow.ScaleFactor, ['Remask']: selectePrbDlRow.Remask
           };
         }
         return row;
       });
       ODUWindowDataList[selectedoduwindowindex].PrbDlInfolist = PrbDlrows
       setODUWindowDataList(ODUWindowDataList)
       dudata.ODUWindowDataList=ODUWindowDataList
     }
     else {
       let newrow = createPrbDlInfo(selectePrbDlRow.id,selectePrbDlRow.ElemIndex, selectePrbDlRow.RbStart, selectePrbDlRow.RbSize, selectePrbDlRow.StartSymbol, selectePrbDlRow.NumofSymbol, selectePrbDlRow.BeamIndex, selectePrbDlRow.BfweightUpdate, selectePrbDlRow.CompMethod,
         selectePrbDlRow.IqWidth, selectePrbDlRow.BeamForming, selectePrbDlRow.ScaleFactor, selectePrbDlRow.Remask);
     var isduplecate = ODUWindowDataList[selectedoduwindowindex]["PrbDlInfolist"]?.some(item =>(newrow.ElemIndex == item.ElemIndex ));
     if(isduplecate==true)
         {
           setSaveSucesopen(true);
           setSucessmsg("PrbDlInfolist row shoDld be unique.");
           setsavedialogTitle("Warning");
           return ;
         }
     else{
       ODUWindowDataList[selectedoduwindowindex]["PrbDlInfolist"].push(newrow)
       setODUWindowDataList(ODUWindowDataList)
       dudata.ODUWindowDataList=ODUWindowDataList;
     }
     
     }
   
     setselectePrbDlRow({
       id: "",
       ElemIndex: "",
       RbStart: "",
       RbSize: "",
       StartSymbol: "",
       NumofSymbol: "",
       BeamIndex: "",
       BfweightUpdate: "",
       CompMethod: "",
       IqWidth: "",
       BeamForming: "",
       ScaleFactor: "",
       Remask: "",
     });
   }
  const savePrbUlData = () => {
    setSaveSucesopen(false);
     
    const areFieldsFilled = selectePrbUlRow.ElemIndex && selectePrbUlRow.RbStart && selectePrbUlRow.RbSize && selectePrbUlRow.StartSymbol && selectePrbUlRow.NumofSymbol && selectePrbUlRow.BeamIndex && selectePrbUlRow.BfweightUpdate && selectePrbUlRow.CompMethod &&
                          selectePrbUlRow.IqWidth && selectePrbUlRow.BeamForming && selectePrbUlRow.ScaleFactor && selectePrbUlRow.Remask;

    if (!areFieldsFilled) {
        setSaveSucesopen(true);
        setSucessmsg("All fields must be filled.");
        setsavedialogTitle("Warning");
        return; // Exit the function if validation fails
    }
     if (isEdit) {
      let newrow = createPrbUlInfo(selectePrbUlRow.id,selectePrbUlRow.ElemIndex, selectePrbUlRow.RbStart, selectePrbUlRow.RbSize, selectePrbUlRow.StartSymbol, selectePrbUlRow.NumofSymbol, selectePrbUlRow.BeamIndex, selectePrbUlRow.BfweightUpdate, selectePrbUlRow.CompMethod,
        selectePrbUlRow.IqWidth, selectePrbUlRow.BeamForming, selectePrbUlRow.ScaleFactor, selectePrbUlRow.Remask);
    var isduplecate = ODUWindowDataList[selectedoduwindowindex]["PrbUlInfolist"]?.some(item =>(newrow.ElemIndex == item.ElemIndex));
    if(isduplecate==true)
        {
          setSaveSucesopen(true);
          setSucessmsg("PrbUlInfolist row should be unique.");
          setsavedialogTitle("Warning");
          return ;
        }
       PrbUlrows = ODUWindowDataList[selectedoduwindowindex]?.PrbUlInfolist?.map((row: any) => {
         if (row.id === selectePrbUlRow.id) {
           return {
             ...row, ['ElemIndex']: selectePrbUlRow.ElemIndex, ['RbStart']: selectePrbUlRow.RbStart, ['RbSize']: selectePrbUlRow.RbSize, ['StartSymbol']: selectePrbUlRow.StartSymbol,
             ['NumofSymbol']: selectePrbUlRow.NumofSymbol, ['BeamIndex']: selectePrbUlRow.BeamIndex, ['BfweightUpdate']: selectePrbUlRow.BfweightUpdate, ['CompMethod']: selectePrbUlRow.CompMethod,
             ['IqWidth']: selectePrbUlRow.IqWidth, ['BeamForming']: selectePrbUlRow.BeamForming, ['ScaleFactor']: selectePrbUlRow.ScaleFactor, ['Remask']: selectePrbUlRow.Remask
           };
         }
         return row;
       });
       ODUWindowDataList[selectedoduwindowindex].PrbUlInfolist = PrbUlrows
       setODUWindowDataList(ODUWindowDataList)
       dudata.ODUWindowDataList=ODUWindowDataList
     }
     else {
       let newrow = createPrbUlInfo(selectePrbUlRow.id,selectePrbUlRow.ElemIndex, selectePrbUlRow.RbStart, selectePrbUlRow.RbSize, selectePrbUlRow.StartSymbol, selectePrbUlRow.NumofSymbol, selectePrbUlRow.BeamIndex, selectePrbUlRow.BfweightUpdate, selectePrbUlRow.CompMethod,
         selectePrbUlRow.IqWidth, selectePrbUlRow.BeamForming, selectePrbUlRow.ScaleFactor, selectePrbUlRow.Remask);
     var isduplecate = ODUWindowDataList[selectedoduwindowindex]["PrbUlInfolist"]?.some(item =>(newrow.ElemIndex == item.ElemIndex));
     if(isduplecate==true)
         {
           setSaveSucesopen(true);
           setSucessmsg("PrbUlInfolist row should be unique.");
           setsavedialogTitle("Warning");
           return ;
         }
     else{
       ODUWindowDataList[selectedoduwindowindex]["PrbUlInfolist"].push(newrow)
       setODUWindowDataList(ODUWindowDataList)
       dudata.ODUWindowDataList=ODUWindowDataList;
     }
     
     }
   
     setselectePrbUlRow({
       id: "",
       ElemIndex: "",
       RbStart: "",
       RbSize: "",
       StartSymbol: "",
       NumofSymbol: "",
       BeamIndex: "",
       BfweightUpdate: "",
       CompMethod: "",
       IqWidth: "",
       BeamForming: "",
       ScaleFactor: "",
       Remask: "",
     });
   }
  const savePreconfRUData = () => {
    setSaveSucesopen(false);
    const areFieldsFilled = selectePreconfRURow.RUIndex && selectePreconfRURow.RUInstanceId;
    if (!areFieldsFilled) {
        setSaveSucesopen(true);
        setSucessmsg("All fields must be filled.");
        setsavedialogTitle("Warning");
        return; // Exit the function if validation fails
    }
    if (isEdit) {
      const newRows = PreconfRUrows?.map(row => {
        return row;
      });
	  
	  let newrow = createPreconfRUProfile(selectePreconfRURow.RUIndex, selectePreconfRURow.RUInstanceId);
      
      var isduplecate = newRows?.some(item =>(newrow.RUInstanceId==item.RUInstanceId && item.id != newrow.id  )) || newRows?.some(item =>(parseInt(newrow.RUIndex) == parseInt (item.RUIndex ) && item.id != newrow.id ));

      if(isduplecate==true)
        {
          setSaveSucesopen(true);
          setSucessmsg("Pre Configured RUProfile List row should be unique.");
          setsavedialogTitle("Warning");
          return ;
        }
      PreconfRUrows = PreconfRUrows?.map((row: any) => {
        if (row.id === selectePreconfRURow.id) {
          return { ...row, ['RUIndex']: selectePreconfRURow.RUIndex, ['RUInstanceId']: selectePreconfRURow.RUInstanceId };
        }
        return row;
      });
      setPreconfRUrows(PreconfRUrows);
      setruindexoptions(PreconfRUrows)
      dudata.PreconfRUProfileList = PreconfRUrows;
    }
    else {
      const newRows = PreconfRUrows?.map(row => {
        return row;
      });
	  
	  let newrow = createPreconfRUProfile(selectePreconfRURow.RUIndex, selectePreconfRURow.RUInstanceId);
      
      var isduplecate = newRows?.some(item =>(newrow.RUInstanceId==item.RUInstanceId  )) || newRows?.some(item =>(parseInt(newrow.RUIndex) == parseInt (item.RUIndex ) ));

      if(isduplecate==true)
        {
          setSaveSucesopen(true);
          setSucessmsg("Pre Configured RUProfile List row should be unique.");
          setsavedialogTitle("Warning");
          return ;
        }
      else {
      newRows.push(createPreconfRUProfile(selectePreconfRURow.RUIndex, selectePreconfRURow.RUInstanceId))

      setPreconfRUrows(newRows);
      setruindexoptions(newRows)
      dudata.PreconfRUProfileList = newRows;
    }
	}
    setselectePreconfRURow({
      id: "",
      RUIndex: "",
      RUInstanceId: "",
    });
  }

  const handleDropDownChange = (e: SelectChangeEvent<string>) => {
    const value = e.target.value;
    setEndPointRow({ ...endPointRow, EndPoint: value });
  };
  const handlebSChannelBwDlOptionsDropDownChange = (e: SelectChangeEvent<string>) => {
    const value = e.target.value;
    setSectorConfRow({ ...sectorConfRow, bSChannelBwDl: value });
  };
  const handlebSChannelBwUlOptionsDropDownChange = (e: SelectChangeEvent<string>) => {
    const value = e.target.value;
    setSectorConfRow({ ...sectorConfRow, bSChannelBwUl: value });
  };
  const handletxDirectionDropDownChange = (e: SelectChangeEvent<string>) => {
    const value = e.target.value;
    setSectorConfRow({ ...sectorConfRow, tXDirection: value });
  };
  const handleAdministarativeDropDownChange = (e: SelectChangeEvent<string>) => {
    const value = e.target.value;
    setManagedNFServiceRow({ ...managedNFServiceRow, AdministrativeState: value });
  };
  const handleDrxInactivityTimerDropDownChange = (e: SelectChangeEvent<string>) => {
    const value = e.target.value;
    DrxProfileIdInfoList[selecteddrxindex].drxinactivitytimer=value
    setdudata({
      ...dudata,
      ["DrxProfileIdInfoList"]:DrxProfileIdInfoList
    })
  };
  const handleDrxRetransmissionTimerDlDropDownChange = (e: SelectChangeEvent<string>) => {
    const value = e.target.value;
    DrxProfileIdInfoList[selecteddrxindex].drxtransmisdl=value
    setdudata({
      ...dudata,
      ["DrxProfileIdInfoList"]:DrxProfileIdInfoList
    })
  };
  const handleDrxRetransmissionTimerUlDropDownChange = (e: SelectChangeEvent<string>) => {
    const value = e.target.value;
    DrxProfileIdInfoList[selecteddrxindex].drxtransmisul=value
    setdudata({
      ...dudata,
      ["DrxProfileIdInfoList"]:DrxProfileIdInfoList
    })
  };
  const handleDrxLongCycleDropDownChange = (e: SelectChangeEvent<string>) => {
    const value = e.target.value;
    DrxProfileIdInfoList[selecteddrxindex].drxlongcycle=value
    setdudata({
      ...dudata,
      ["DrxProfileIdInfoList"]:DrxProfileIdInfoList
    })
  };
  const handleSrProhibitTimerDropDownChange = (e: SelectChangeEvent<string>) => {
    const value = e.target.value;
    setSchedulingReqConfRow({ ...schedulingReqConfRow, scprohibittimer: value });
  };
  const handleSrTransMaxDropDownChange = (e: SelectChangeEvent<string>) => {
    const value = e.target.value;
    setSchedulingReqConfRow({ ...schedulingReqConfRow, sctransmax: value });
  };
 
  const handleSrMaskDropDownChange = (e: SelectChangeEvent<string>) => {
    const value = e.target.value;
    qoslist[selectedqosindex].lgalchansrmask=value;
    setdudata({
      ...dudata,
      ["qoslist"]:qoslist
    })
  };
  const handlelsChannelDelayTimerDropDownChange = (e: SelectChangeEvent<string>) => {
    const value = e.target.value;
    qoslist[selectedqosindex].lsclchansrdelay=value;
    setdudata({
      ...dudata,
      ["qoslist"]:qoslist
    })
  };
  const handleAllowedServCellsDropDownChange = (e: SelectChangeEvent<string>) => {
    const value = e.target.value;
    setAllowedServCells(value);
    dudata.srblist.AllowedServCells=value
    setdudata(dudata);
  };
  const handleSrDelayTimerDropDownChange = (e: SelectChangeEvent<string>) => {
    const value = e.target.value;
    setsrdelaytimer(value);
    dudata.srblist.srdelaytimer=value
    setdudata(dudata);
  };
  const handleMaxpuschdurationDropDownChange = (e: SelectChangeEvent<string>) => {
    const value = e.target.value;
    setmaxpuschduration(value);
    dudata.srblist.maxpuschduration=value;
    setdudata(dudata);
  };

  const handlePrioritisedBitrateDropDownChange = (e: SelectChangeEvent<string>) => {
    const value = e.target.value;
    qoslist[selectedqosindex].prioritrizedbitrate=value;
    setdudata({
      ...dudata,
      ["qoslist"]:qoslist
    })
  };
  const handleBucketSizeDurationrDropDownChange = (e: SelectChangeEvent<string>) => {
    const value = e.target.value;
    qoslist[selectedqosindex].bucketsizedura=value;
    setdudata({
      ...dudata,
      ["qoslist"]:qoslist
    })
  };
  const handleMaxpdschdurationDropDownChange = (e: SelectChangeEvent<string>) => {
    const value = e.target.value;
    qoslist[selectedqosindex].maxpdschduration=value;
    setdudata({
      ...dudata,
      ["qoslist"]:qoslist
    })
  };

  const handleScellDeactiveDropDownChange = (e: SelectChangeEvent<string>) => {
    const value = e.target.value;
    setscellDeactiveRow({ ...scellDeactiveRow, DeactivationTimer: value });
  };
  const handleBWPContextDropDownChange = (e: SelectChangeEvent<string>) => {
    const value = e.target.value;
    setBwpRow({ ...bwpRow, bwpContext: value });
  };
  const handleSubCarrierSpacingDropDownChange = (e: SelectChangeEvent<string>) => {
    const value = e.target.value;
    setBwpRow({ ...bwpRow, SubCarrierSpacing: value });
  };
  const handleCyclePrefixDropDownChange = (e: SelectChangeEvent<string>) => {
    const value = e.target.value;
    setBwpRow({ ...bwpRow, cyclePrefix: value });
  };

  const handleIsInitiaLBwpDropDownChange = (e: SelectChangeEvent<string>) => {
    const value = e.target.value;
    setBwpRow({ ...bwpRow, isInitiaLBwp: value });
  };
  const NRResourceTypeDropDownChange = (e: SelectChangeEvent<string>) => {
    const value = e.target.value;
    setNRCellDuRow({ ...NRCellDuRow, ResourceType: value }); // Update selected resource type
  };
  const CellLocalIdDropDownChange = (e: SelectChangeEvent<string>) => {
    const value = e.target.value;
    setNRCellDuRow({ ...NRCellDuRow, CellLocalId: value }); // Update selected Cell Local ID
  };
  // Inside CellIdDropDownChange function
  const CellIdDropDownChange = (e: SelectChangeEvent<string>) => {
    const value = e.target.value;
    setNRCellDuRow({ ...NRCellDuRow, cellId: value }); // Update selected Cell ID
  };
  const handleNRCellDuBwpIdDropDownChange = (e: SelectChangeEvent<string>) => {
    const value = e.target.value;
    setNRCellDuRow({ ...NRCellDuRow, BwplistId: value });
  };
  const handleNRSectorCarrierlistIdDropDownChange = (e: SelectChangeEvent<string>) => {
    const value = e.target.value;
    setNRCellDuRow({ ...NRCellDuRow, NRSectorCarrierReflistId: value });
  };

  const handleODUsubCarrierSpacingDownChange = (e: SelectChangeEvent<string>) => {
    const value = e.target.value;
    ODUWindowDataList[selectedoduwindowindex].Subcarrierspacing=value 
    setdudata({
      ...dudata,
      ["ODUWindowDataList"]:ODUWindowDataList
    })
  };
  const handleODUBandwidthDownChange = (e: SelectChangeEvent<string>) => {
    const value = e.target.value;
    ODUWindowDataList[selectedoduwindowindex].Bandwidth=value 
    setdudata({
      ...dudata,
      ["ODUWindowDataList"]:ODUWindowDataList
    })
  };

  const handleRUIndexIdChange = (e: SelectChangeEvent<string>) => {
    const value = e.target.value;
    console.log(ruindexoptions)
    const res:any= ruindexoptions.filter((ruindex:any)=>{
      return ruindex.RUIndex === value
    })
    console.log(res)
    ODUWindowDataList[selectedoduwindowindex].RUIndexId = value 
    ODUWindowDataList[selectedoduwindowindex].RUInstanceId= res[0].RUInstanceId
    setdudata({
      ...dudata,
      ["ODUWindowDataList"]:ODUWindowDataList
    })
  };
  const handleNRtxDirectionDropDownChange = (e: SelectChangeEvent<string>) => {
    const value = e.target.value;
    setSectorCarrierRow({ ...sectorCarrierRow, tXDirection: value });
  };
  const handleNRbSChannelBwDlOptionsDropDownChange = (e: SelectChangeEvent<string>) => {
    const value = e.target.value;
    setSectorCarrierRow({ ...sectorCarrierRow, bSChannelBwDl: value });
  };
  const handleNRbSChannelBwUlOptionsDropDownChange = (e: SelectChangeEvent<string>) => {
    const value = e.target.value;
    setSectorCarrierRow({ ...sectorCarrierRow, bSChannelBwUl: value });
  };

   
  // Inside PeeParametersDropDownChange function
  const PeeParametersDropDownChange = (e: SelectChangeEvent<string>) => {
    const value = e.target.value;
    setSelectedPeeParameters(value); // Update selected peeParameters
    setdudata({
      ...dudata,
      peeParameters: value,
    });
  };
  // Inside ResourceTypeDropDownChange function
  const ResourceTypeDropDownChange = (e: SelectChangeEvent<string>) => {
    const value = e.target.value;
    setSelectedResourceType(value); // Update selected resource type
    setdudata({
      ...dudata,
      resourceType: value,
    });
  };
  // Inside RrmPolicyListDropDownChange function
  const RRMPolicyListDropDownChange = (e: SelectChangeEvent<string>) => {
    const value = e.target.value;
    setSelectedRrmPolicyList(value); // Update selected RRM Policy List
    setdudata({
      ...dudata,
      rrmPolicyList: value,
    });
  };
  // Inside MethodListDropDownChange function
  const MethodListDropDownChange = (e: SelectChangeEvent<string>) => {
    const value = e.target.value;
    setSelectedMethod(value); // Update selected RRM Policy List
    setdudata({
      ...dudata,
      Method: value,
    });
  };
  // Inside ConfigStateListDropDownChange function
  const ConfigStateListDropDownChange = (e: SelectChangeEvent<string>) => {
    const value = e.target.value;
    setSelectedConfigStatus(value); // Update selected RRM Policy List
    setdudata({
      ...dudata,
      ConfigStatus: value,
    });
  };
  // Inside SyncStateListDropDownChange function
  const SyncStateListDropDownChange = (e: SelectChangeEvent<string>) => {
    const value = e.target.value;
    setSelectedSyncState(value); // Update selected RRM Policy List
    setdudata({
      ...dudata,
      SyncState: value,
    });
  };
  const handleLogicalChannelSrDelayTimerDropDownChange = (e: SelectChangeEvent<string>) => {
    const value = e.target.value;
    setselectedPeriodicityBsrTimer(value);
    setdudata({
      ...dudata,
      LogicalChannelSrdelayTimer: value,
    });
  };
  const handlePeriodicityBsrTimerDropDownChange = (e: SelectChangeEvent<string>) => {
    const value = e.target.value;
    setselectedPeriodicityBsrTimer(value);
    setdudata({
      ...dudata,
      periodicityBsrTimer: value,
    });
  };
  const handleRctxBsrTimerDropDownChange = (e: SelectChangeEvent<string>) => {
    const value = e.target.value;
    setselectedRctxBsrTimer(value);
    setdudata({
      ...dudata,
      RctxBsrTimer: value,
    });
  };
  const handlePhrPeriodicTimerDropDownChange = (e: SelectChangeEvent<string>) => {
    const value = e.target.value;
    setselectedPhrPeriodicTimer(value);
    setdudata({
      ...dudata,
      phrPeriodicTimer: value,
    });
  };
  const handlePhrProhibitTimerDropDownChange = (e: SelectChangeEvent<string>) => {
    const value = e.target.value;
    setselectedPhrProhibitTimer(value);
    setdudata({
      ...dudata,
      phrProhibitTimer: value,
    });
  };
  const handlePhrType2OtherCellDropDownChange  = (e: SelectChangeEvent<string>) => {
    const value = e.target.value;
    setselectedPhrPeriodicTimer(value);
    setdudata({
      ...dudata,
      PhrType2OtherCell: value,
    });
  };
  const handlePhrTxpowerFactorchangeDropDownChange = (e: SelectChangeEvent<string>) => {
    const value = e.target.value;
    setselectedPhrTxpowerFactorchange(value);
    setdudata({
      ...dudata,
      PhrTxpowerFactorchange: value,
    });
  };

  const handlePhrModeOthercgDropDownChange = (e: SelectChangeEvent<string>) => {
    const value = e.target.value;
    setselectedPhrModeOthercg(value);
    setdudata({
      ...dudata,
      PhrModeOthercg: value,
    });
  };
  const addData = () => {
    setSaveSucesopen(false);
    let valid = false;
    valid=  !Object.values(errors)?.some(value => value === true);
    if (valid) {
    if (listName === "SectorConfigurationTable") {
      saveSectorConfigurationData();
    }
    else if (listName === "ManagedNFServiceTable") {
      saveManagedNFServiceData();
    }
    else if (listName === "EndPointTable") {
      saveEndPointData();
    }
    else if (listName === "SchedulingReqConfTable") {
      saveSchedulingReqConfData();
    }
    else if (listName === "MacParamTable") {
      saveMacParamData();
    }
    else if (listName === "SrDelayTimerTable") {
      saveSrDelayTimerData();
    }
    else if (listName === "ScellDeactiveTable") {
      saveScellDeactiveData();
    }
    else if (listName === "SectorCarrierTable") {
      saveSectorCarrierData();
    }
    else if (listName === "BwpTable") {
      saveBwpData();
    }
    else if (listName === "NRCellDuTable") {
      saveNRCellDuData();
    }
    else if (listName === "PrbDlTable") {
      savePrbDlData();
    }
    else if (listName === "PrbUlTable") {
      savePrbUlData();
    }
    else if (listName === "PreconfRUProfileTable") {
      savePreconfRUData();
    }
    setOpen(false);
  } else {
    console.log("else enetered")
    setSaveSucesopen(true);
      setSucessmsg('Please verify all fields is valid or not. Cannot save data.');
      setsavedialogTitle("Validation Error");
  }
}

  const addRUI = () => {
  
    const ODUWindowDataListNew=ODUWindowDataList?.map((odudata :any) => {
      return odudata;
    })
    console.log(ODUWindowDataListNew)

    let id = 0;
    let isnotexits=false;
    let index = 0;
    for(var i=0;i <= ODUWindowDataList.length;i++)
      {
        if (!(ODUWindowDataListNew?.filter(c => c.id === i).length > 0)) {
          isnotexits=true;
          index=i;
        }
      }
 
   if(isnotexits)
    {
      id= index;
    }
     
    ODUWindowDataListNew?.push({id: id,RUIndexId:"",RUInstanceId: "",Bandwidth: "", Subcarrierspacing: "", DUmacAddress: "", RUcpmacAddress
      : "", RUupmacAddress: "", CpvlanId: "", UpvalnId: "", CompMethod: "",PrbUlInfolist:[],PrbDlInfolist:[]})
      ODUWindowDataListNew?.sort((a:any,b:any) => {
        if (""+a["id"]<(""+b["id"])) return -1;
        if (""+a["id"]>(""+b["id"])) return 1;
        return 0;
    });
    setOduwindowErrorIndex({
      ...oduwindowerrorindex,
      [id]: { RUIndexIdError: false, RUupmacError: false,RUcpmacError: false,UpvalnIdError: false,CpvlanIdError: false,CompMethodError:false, macError: false  },
    })
    console.log("oduwindowerrorindex add",oduwindowerrorindex)
    ODUWindowDataList = ODUWindowDataListNew
    //setselectedodulength(id)
    setODUWindowDataList(ODUWindowDataListNew);
    dudata.ODUWindowDataList=ODUWindowDataList;
  }
  const deleteRUI = () => {
    var seloduid = parseInt(currentRUI.split('-')[0]);
    const ODUWindowDataListNew = ODUWindowDataList?.filter((item) => item.id !== ODUWindowrow[0]?.id);
    console.log("oduwindowerrorindex",oduwindowerrorindex)
    console.log("seloduid",seloduid)
    setOduwindowErrorIndex(prevState => {
      const { [seloduid]: _, ...rest } = prevState; 
      console.log("rest",rest)  
      return rest;   
    })
    ODUWindowDataList = ODUWindowDataListNew;
    setODUWindowDataList(ODUWindowDataListNew);
    setselectedoduwindowindex(null);
    setselectedodulength(ODUWindowDataList.length-1)
    dudata.ODUWindowDataList=ODUWindowDataList
    setselectedoduwindowdata({id: "", RUIndexId: "", RUInstanceId: "", Bandwidth: "", Subcarrierspacing: "", DUmacAddress: "", RUcpmacAddress
      : "", RUupmacAddress: "", CpvlanId: "", UpvalnId: "", CompMethod: ""
  })
  }
  const addQOS = () => {
    
    const QOSListNew = qoslist?.map((odudata: any) => {
      return odudata;
    });
    console.log(QOSListNew);

    let id = 1;
    let isnotexits = false;
    let index = 1;

    for (var i = 1; i <= qoslist?.length; i++) {
      if (!(QOSListNew?.filter(c => c.id === i).length > 0)) {
        isnotexits = true;
        index = i;
        break; 
      }
    }

    if (isnotexits) {
      id = index;
    } else {
      id = qoslist?.length + 1;
    }

    QOSListNew.push({
      id: id,
      logicalchannel: id,
      lgalchansrmask: "",
      prioritrizedbitrate: "",
      bucketsizedura: "",
      lsclchansrdelay: "",
      maxulharqtx: "",
      maxpdschduration: "",
      maxdlharqtx: ""
    });
      QOSListNew?.sort((a:any,b:any) => {
        if (""+a["id"]<(""+b["id"])) return -1;
        if (""+a["id"]>(""+b["id"])) return 1;
        return 0;
    });
    setQosErrorIndex({
      ...qoserrorindex,
      [id]: { maxulharqtxError: false, maxdlharqtxError: false,logicalchannel:false },
    })
    console.log("qoserrorindex add",qoserrorindex)
    qoslist = QOSListNew
    setqoslist(QOSListNew);
    dudata.qoslist=qoslist;
  }
  const deleteQOS = () => {
    var selqosid = parseInt(currentqosid.split('-')[1]);
    const QOSListNew = qoslist?.filter((item) => item.id !== selqosid);
    console.log("qoserrorindex",qoserrorindex)
    console.log("selqosid",selqosid)
    setQosErrorIndex(prevState => {
      const { [selqosid]: _, ...rest } = prevState; 
      console.log("rest",rest) // Extract 'selqosid' and discard it
      return rest;  // Return the remaining object without 'selqosid'
    })
    console.log(QOSListNew)
    qoslist = QOSListNew;
    setqoslist(QOSListNew);
    setselectedqosindex(null)
    console.log("qoserrorindex after",qoserrorindex)
    dudata.qoslist=qoslist
  }
  const addDRX = () => {

    const DrxProfileIdInfoListNew=DrxProfileIdInfoList?.map((drxdata :any) => {
      return drxdata;
    })
    console.log(DrxProfileIdInfoListNew)

    let id = 1;
    let isnotexits=false;
    let index = 1;
    for(var i=1;i <= DrxProfileIdInfoList.length;i++)
      {
        if (!(DrxProfileIdInfoListNew?.filter(c => c.id === i).length > 0)) {
          isnotexits=true;
          index=i;
          break;
        }
      }

   if(isnotexits)
    {
      id= index;
    }else{
      id=DrxProfileIdInfoList.length+1;
    }

    DrxProfileIdInfoListNew?.push({id: id,drxinactivitytimer:"",drxharqrttdl:"",drxharqrttul: "", drxtransmisdl: "", drxtransmisul: "", drxlongcycle : "", SchedulingReqConfInfoList:[]})
      DrxProfileIdInfoListNew?.sort((a:any,b:any) => {
        if (""+a["id"]<(""+b["id"])) return -1;
        if (""+a["id"]>(""+b["id"])) return 1;
        return 0;
    });
    setDrxErrorIndex({
      ...drxerrorindex,
      [id]: { drxharqrttdlError: false, drxharqrttulError: false},
    })

    DrxProfileIdInfoList = DrxProfileIdInfoListNew
    setDrxProfileIdInfoList(DrxProfileIdInfoListNew);
    dudata.DrxProfileIdInfoList=DrxProfileIdInfoList;
  }    
  const deleteDRX = () => {
    var seldrxId=parseInt(currentdrx.split('-')[1]);
    const DrxProfileIdInfoListNew = DrxProfileIdInfoList?.filter((item) => item.id !== seldrxId);
    setDrxErrorIndex(prevState => {
      const { [seldrxId]: _, ...rest } = prevState; 
      console.log("rest",rest) // Extract 'selqosid' and discard it
      return rest;  // Return the remaining object without 'selqosid'
    })
    DrxProfileIdInfoList = DrxProfileIdInfoListNew;
    setDrxProfileIdInfoList(DrxProfileIdInfoListNew);
    setselectedrxindex(null);
    dudata.DrxProfileIdInfoList=DrxProfileIdInfoList
  }
   


  const saveData = async() => {
    let valid = false;
    const iserrorvalid = Object.keys(errors)?.every((errorKey: string) => !errors[errorKey]);
    const isdrxerrorvalid = Object.keys(drxerrorindex)?.every((drxerror: string) =>
      Object.keys(drxerrorindex[drxerror]).every((key) => !drxerrorindex[drxerror][key]));
    const isoduerrorvalid = Object.keys(oduwindowerrorindex)?.every((value:string) =>  
      Object.keys(oduwindowerrorindex[value])?.every((key) => !oduwindowerrorindex[value][key]));
    valid = iserrorvalid && isdrxerrorvalid && isoduerrorvalid
    if(valid){
    const newduConfgiData = duConfigdata?.map((du: any) => {
      return du;
    })
    console.log(newduConfgiData)
    var isduFound = duConfigdata?.some((item: any) => currentDu === item?.Duid);
    if (isduFound) {
      console.log(dudata)
      const currentduData = newduConfgiData?.map((du: any) => {
        if (du.Duid === dudata.Duid) {
          du = dudata;
        }
        return du;
      });
      
      setdudata(currentduData[0]);
      dudata=currentduData[0];
      
      setduConfigdata(currentduData);
      duConfigdata = currentduData;
    }
    else {
      console.log(dudata)
      dudata.Duid = currentDu;
      console.log(dudata)
      duConfigdata.push(dudata);
    }
    console.log(duConfigdata)
    // nodeId = "node2";
    nodeId = location.pathname.split('/')[2];
    const baseUri = `${window.location.origin}`;
    const DbPath = baseUri+ "/du_config/_doc/" + nodeId;
    //alert("Data Saving");

    await axios.post(DbPath,
      {
        duConfigdata
      }).then(function (resp: any) {
        const result = resp;
        setSaveSucesopen(true);
        setSucessmsg("Data saved successfully");
        setsavedialogTitle("Success");
      }, function (err: { message: any; }) {
        const result = err.message;
        console.log(err.message);
      })
      fetchDuConfigData(nodeId);
    }else{
      console.log("else enetered")
    setSaveSucesopen(true);
      setSucessmsg('Please verify all fields is valid or not. Cannot save data.');
      setsavedialogTitle("Validation Error");
    }
  };

  const handleSaveSecessClose = (event: any, _reason: string) => {
    event.preventDefault();
    event.stopPropagation();
    setSaveSucesopen(false);
  };

  return (
    <div style={{ height: '480px', width: '97%', overflow: 'visible', display: 'flex', flexDirection: 'row' }}>
      <div style={{ width: '30%', overflow: 'auto', border: '1px solid #ccc', borderRadius: '2px', padding: '1%', margin: '1%', }}>
        <Box style={{ width: '92%', height: '470px', }}>
          <b>DU Function</b>
          <TreeView defaultCollapseIcon={<ExpandMore />} defaultExpandIcon={<ChevronRightIcon />} defaultExpanded={['1', '3']} >
            <TreeItem nodeId="1" label="DU 1" onClick={() =>handleTreeItemClick("2", "DU 1")}>
              <TreeItem nodeId="2" label="General Config" onClick={() => handleTreeItemClick("2", "DU 1")} sx={{ ".MuiTreeItem-content.Mui-selected": { color: '#ffffff', backgroundColor: '#53659c' } }} >
              </TreeItem>
              <TreeItem nodeId="3" label="MAC-Configuration">
               {/* <TreeItem nodeId="4" label="drx-config" onClick={() => handleTreeItemClick("4", "DU 1")} sx={{ ".MuiTreeItem-content.Mui-selected": { color: '#ffffff', backgroundColor: '#53659c' } }} /> */}
               <TreeItem nodeId="100" label="drx-config" onClick={() => handleDRXListTreeItemClick("100", "DU 1",1,0)} sx={{ ".MuiTreeItem-content.Mui-selected.Mui-focused": { color: '#ffffff', backgroundColor: '#53659c' } }} >
                { DrxProfileIdInfoList?.map((DRXItem:any, index:number)  => (
                   <TreeItem nodeId={(101+index).toString()}  label={("DRX Instance-"+ DRXItem?.id).toString()} onClick={() => {handleDRXListTreeItemClick("100", "DU 1", DRXItem?.id,index), setselectedrxindex(index)}} sx={{ ".MuiTreeItem-content.Mui-selected.Mui-focused": { color: '#ffffff', backgroundColor: '#53659c' } }} />
                 ))}
              </TreeItem> 
              <TreeItem nodeId="5" label="srb-config" onClick={() => handleTreeItemClick("5", "DU 1")} sx={{ ".MuiTreeItem-content.Mui-selected.Mui-focused": { color: '#ffffff', backgroundColor: '#53659c' } }} />
              <TreeItem nodeId="61" label="qos-group-config-list" onClick={() => handleQOSListTreeItemClick("61", "DU 1",1,0)} sx={{ ".MuiTreeItem-content.Mui-selected.Mui-focused": { color: '#ffffff', backgroundColor: '#53659c' } }} >
                { qoslist?.map((qoslistItem:any, index:number)  => (
                   <TreeItem nodeId={(62+index).toString()}  label={("QOS Instance-" + qoslistItem?.id).toString()} onClick={() => {handleQOSListTreeItemClick("61", "DU 1" , qoslistItem?.id,index),setselectedqosindex(index)}} sx={{ ".MuiTreeItem-content.Mui-selected.Mui-focused": { color: '#ffffff', backgroundColor: '#53659c' } }} />
                 ))}
                </TreeItem>
                <TreeItem nodeId="7" label="bsr-config" onClick={() => handleTreeItemClick("7", "DU 1")} sx={{ ".MuiTreeItem-content.Mui-selected.Mui-focused": { color: '#ffffff', backgroundColor: '#53659c' } }} />
                <TreeItem nodeId="8" label="phr-config" onClick={() => handleTreeItemClick("8", "DU 1")} sx={{ ".MuiTreeItem-content.Mui-selected.Mui-focused": { color: '#ffffff', backgroundColor: '#53659c' } }} />
                <TreeItem nodeId="9" label="scell-deactivation-timer-list" onClick={() => handleTreeItemClick("9", "DU 1")} sx={{ ".MuiTreeItem-content.Mui-selected.Mui-focused": { color: '#ffffff', backgroundColor: '#53659c' } }} />
              </TreeItem>
              <TreeItem nodeId="10" label="NRSectorCarrier" onClick={() => handleTreeItemClick("10", "DU 1")} sx={{ ".MuiTreeItem-content.Mui-selected.Mui-focused": { color: '#ffffff', backgroundColor: '#53659c' } }} />
              <TreeItem nodeId="13" label="BWP" onClick={() => handleTreeItemClick("13", "DU 1")} sx={{ ".MuiTreeItem-content.Mui-selected.Mui-focused": { color: '#ffffff', backgroundColor: '#53659c' } }} />
              <TreeItem nodeId="14" label="NRCellDU" onClick={() => handleTreeItemClick("14", "DU 1")} sx={{ ".MuiTreeItem-content.Mui-selected.Mui-focused": { color: '#ffffff', backgroundColor: '#53659c' } }} />
              <TreeItem nodeId="40" label="Fronthaul Management">
                <TreeItem nodeId="41" label="DU Sync state" onClick={() => handleTreeItemClick("41", "DU 1")} sx={{ ".MuiTreeItem-content.Mui-selected": { color: '#ffffff', backgroundColor: '#53659c' } }} />
                <TreeItem nodeId="42" label="O-DU window" onClick={() => handleOUWTreeItemClick("42", "DU 1",0)} sx={{ ".MuiTreeItem-content.Mui-selected.Mui-focused": { color: '#ffffff', backgroundColor: '#53659c' } }} >
                {ODUWindowDataList?.map((ODUWindowItem: any, index: number) => (
  <TreeItem
    nodeId={(43 + index).toString()}
    label={`RU Instance - ${ODUWindowDataList[index]?.id}`}
    onClick={() => {
      handleOUWTreeItemClick("42", "DU 1", ODUWindowDataList[index]?.id);
      setselectedoduwindowindex(index);
      setselectedoduwindowdata(ODUWindowItem);
    }}
    sx={{
      ".MuiTreeItem-content.Mui-selected.Mui-focused": {
        color: '#ffffff',
        backgroundColor: '#53659c',
      },
    }}
  />
))}

              </TreeItem>
              </TreeItem>
            </TreeItem>
          </TreeView>
        </Box>
      </div>

      <div >
        <div >
          <Dialog open={SaveSucesopen} onClose={handleSaveSecessClose}
            PaperProps={{ style: { minHeight: '12vh', minWidth: '23vw', border: '14px solid #38456a', borderRadius: '15px', backgroundColor: '#e8e8e8' } }} >
            <DialogContent style={{ alignContent: 'center', textAlign: "center" }}>
            <IconButton style={{ textAlign: "center" }}>
            {savedialogTitle === "Success" ? (
              <>
                <CheckCircleOutlineRoundedIcon style={{ color: '#008000' }} />
                <h6 style={{ marginLeft: '3px', color: '#008000', textAlign: "center" }}>{Sucessmsg}</h6>
              </>
            ) : (
              <>
              <WarningOutlined style={{ color: 'red' }} />
              <h6 style={{ marginLeft: '3px', color: 'red', textAlign: "center" }}>{Sucessmsg}</h6>
              </>
              )}
            </IconButton>
            </DialogContent>
            <DialogActions>
              <Button onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                setSaveSucesopen(false);
              }} style={{ backgroundColor: 'white', color: '#38761d', border: '1px solid #2986cc', borderRadius: '1px', padding: '3px 6px' }}>
                OK
              </Button>
            </DialogActions>
          </Dialog>
        </div>
        <div style={{ width: '100%', alignSelf: 'center', overflow: 'auto' }}>
          <Dialog open={open} onClose={handleClose} >
            <DialogTitle id="form-dialog-title" style={{ backgroundColor: '#b3b3ff', border: '1px solid #ccc', borderRadius: '3px', padding: 0 }}> {dialogTitle}</DialogTitle>
            <DialogContent>
              <DialogContentText>
                {listTitle}
              </DialogContentText>
              { listName == "ManagedNFServiceTable" ?
                  <div style={{ width: '80%', paddingLeft: '10%' }}>
                    {/* <TextField variant="standard" spellCheck={false} margin="dense" id="AdministrativeState" label="AdministrativeState" type="text" fullWidth value={managedNFServiceRow.AdministrativeState} onChange={(event) => { onManagedNFServiceTextChange(event) }} /> */}
                    <FormControl variant="standard" margin="dense" fullWidth>
                    <InputLabel id="AdministrativeState">administrativeState</InputLabel>
                    <Select labelId="AdministrativeState" id="AdministrativeState" value={managedNFServiceRow.AdministrativeState} onChange={handleAdministarativeDropDownChange} label="txDirection">
                      {AdministrativeStateOptions?.map(option => (<MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>))}
                    </Select>
                  </FormControl>
                    <TextField variant="standard" spellCheck={false} margin="dense" id="saphost" label="saphost" type="text" fullWidth value={managedNFServiceRow.saphost} onChange={(event) => { onManagedNFServiceTextChange(event) }} error={errors.SAPHostError} helperText={errors.SAPHostError ? 'Invalid SAPHostIP address' : ''} />
                    <TextField variant="standard" spellCheck={false} margin="dense" id="sapport" label="sapport" type="number" fullWidth value={managedNFServiceRow.sapport} onChange={(event) => { onManagedNFServiceTextChange(event) }} error={errors.sapportError} helperText={errors.sapportError ? 'please enter  range from -2,147,483,648 to 2,147,483,647' : ''} onKeyDown={(event) => ["e", "E", "+","."].includes(event.key) && event.preventDefault()}/>
                    <TextField variant="standard" spellCheck={false} margin="dense" id="operationsName" label="operationsName" type="text" fullWidth value={managedNFServiceRow.operationsName} onChange={(event) => { onManagedNFServiceTextChange(event) }} />
                    <TextField variant="standard" spellCheck={false} margin="dense" id="operationsAllowed" label="operationsAllowed" type="text" fullWidth value={managedNFServiceRow.operationsAllowed} onChange={(event) => { onManagedNFServiceTextChange(event) }} />
                  </div> : listName == "EndPointTable" ?
                    <div style={{ width: '80%', paddingLeft: '10%' }}>
                      {/* <TextField variant="standard" spellCheck={false} margin="dense" id="EndPoint" label="EndPoint" type="text" fullWidth value={endPointRow.EndPoint}  onChange={(event) => { onEndPointTextChange(event)}} /> */}
                      <FormControl variant="standard" margin="dense" fullWidth>
                        <InputLabel id="EndPoint-label">EndPoint</InputLabel>
                        <Select labelId="EndPoint-label" id="EndPoint" value={endPointRow.EndPoint} onChange={handleDropDownChange} label="EndPoint">
                          {endPointOptions?.map(option => (<MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>))}
                        </Select>
                      </FormControl>
                      <TextField variant="standard" spellCheck={false} margin="dense" id="LocalIPAddress" label="LocalIPAddress" type="text" fullWidth value={endPointRow.LocalIPAddress} onChange={(event) => { onEndPointTextChange(event) }} error={errors.localError} helperText={errors.localError ? 'Invalid localIP address' : ''} />
                      <TextField variant="standard" spellCheck={false} margin="dense" id="VLANID" label="VLANID" type="text" fullWidth value={endPointRow.VLANID} onChange={(event) => { onEndPointTextChange(event) }} error={errors.vlanidError} helperText={errors.vlanidError ? 'please enter  range from 0 to 65535' : ''} onKeyDown={(event) => ["e", "E", "+", "-","."].includes(event.key) && event.preventDefault()} />
                      <TextField variant="standard" spellCheck={false} margin="dense" id="RemoteIPAddress" label="RemoteIPAddress" type="text" fullWidth value={endPointRow.RemoteIPAddress} onChange={(event) => { onEndPointTextChange(event) }} error={errors.remoteError} helperText={errors.remoteError ? 'Invalid remoteIP address' : ''} />
                    </div> : listName == "SchedulingReqConfTable" ?
                        <div style={{ width: '80%', paddingLeft: '10%' }}>
                          <TextField variant="standard" spellCheck={false} margin="dense" id="schedulingrequest" label="schedulingrequest" type="text" disabled fullWidth value={schedulingReqConfRow.schedulingrequest} onChange={(event) => { onSchedulingReqConfTextChange(event) }} error={errors.schedulingrequestError} helperText={errors.schedulingrequestError ? 'please enter  range from 0 to 7 ' : ''} onKeyDown={(event) => ["e", "E", "+", "-","."].includes(event.key) && event.preventDefault()} />
                          {/* <TextField variant="standard" spellCheck={false} margin="dense" id="scprohibittimer" label="scprohibittimer" type="number" fullWidth value={schedulingReqConfRow.scprohibittimer} onChange={(event) => { onSchedulingReqConfTextChange(event) }} /> */}
                          <FormControl variant="standard" margin="dense" fullWidth>
                          <InputLabel id="scprohibittimer">scProhibitTimer</InputLabel>
                          <Select labelId="scprohibittimer" id="scprohibittimer" value={schedulingReqConfRow.scprohibittimer} onChange={handleSrProhibitTimerDropDownChange} label="scprohibittimer"
                          MenuProps={{ PaperProps: { style: { maxHeight: 200 } } }}>
                            {scprohibittimerOption?.map(option => (<MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>))}
                          </Select>
                        </FormControl>
                          {/* <TextField variant="standard" spellCheck={false} margin="dense" id="sctransmax" label="sctransmax" type="number" fullWidth value={schedulingReqConfRow.sctransmax} onChange={(event) => { onSchedulingReqConfTextChange(event) }} PriorityError', false /> */}
                          <FormControl variant="standard" margin="dense" fullWidth>
                          <InputLabel id="sctransmax">scTransMax</InputLabel>
                          <Select labelId="sctransmax" id="sctransmax" value={schedulingReqConfRow.sctransmax} onChange={handleSrTransMaxDropDownChange} label="sctransmax"
                          MenuProps={{ PaperProps: { style: { maxHeight: 200 } } }}>
                            {sctransmaxOption?.map(option => (<MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>))}
                          </Select>
                        </FormControl>
                        </div> : listName == "ScellDeactiveTable" ?
                                  <div style={{ width: '80%', paddingLeft: '10%' }}>
                                    <TextField variant="standard" spellCheck={false} margin="dense" id="Index" label="Index" disabled type="number" fullWidth value={scellDeactiveRow.Index} onChange={(event) => { onScellDeactiveTextChange(event) }} error={errors.IndexError} helperText={errors.IndexError ? 'please enter  range from 1 to 4' : ''} onKeyDown={(event) => ["e", "E", "+", "-","."].includes(event.key) && event.preventDefault()} />
                                    {/* <TextField variant="standard" spellCheck={false} margin="dense" id="DeactivationTimer" label="DeactivationTimer" type="text" fullWidth value={scellDeactiveRow.DeactivationTimer} onChange={(event) => { onScellDeactiveTextChange(event) }} /> */}
                                    <FormControl variant="standard" margin="dense" fullWidth>
                                      <InputLabel id="DeactivationTimer">ScellDeactivationTimer</InputLabel>
                                      <Select labelId="DeactivationTimer" id="DeactivationTimer" value={scellDeactiveRow.DeactivationTimer} onChange={handleScellDeactiveDropDownChange} label="DeactivationTimer"
                                       MenuProps={{ PaperProps: { style: { maxHeight: 200 } } }}>
                                        {scellDeactivationTimerOption?.map(option => (<MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>))}
                                      </Select>
                                    </FormControl>
                                  </div> : listName == "SectorCarrierTable" ?
                                    <div style={{ width: '80%', paddingLeft: '10%' }}>
                                      {isEdit ?
                                        <TextField variant="standard" spellCheck={false} margin="dense" id="id" label="Id" type="text" fullWidth value={sectorCarrierRow.id} onChange={(event) => { onSectorCarrierTextChange(event) }} disabled    />
                                        : null}
                                      <TextField variant="standard" spellCheck={false} margin="dense" id="PriorityLabel" label="PriorityLabel" type="number" fullWidth value={sectorCarrierRow.PriorityLabel} onChange={(event) => { onSectorCarrierTextChange(event) }} error={errors.priorityLabelError} helperText={errors.priorityLabelError ? 'please enter  range from 0 to 4294967295' : ''} onKeyDown={(event) => ["e", "E", "+", "-","."].includes(event.key) && event.preventDefault()}/>
                                      {/* <TextField variant="standard" spellCheck={false} margin="dense" id="tXDirection" label="tXDirection" type="text" fullWidth value={sectorCarrierRow.tXDirection} onChange={(event) => { onSectorCarrierTextChange(event) }} /> */}
                                      <FormControl variant="standard" margin="dense" fullWidth>
                                          <InputLabel id="txDirection">txDirection</InputLabel>
                                           <Select labelId="txDirection" id="txDirection" value={sectorCarrierRow.tXDirection} onChange={handleNRtxDirectionDropDownChange} label="txDirection">
                                          {txDirectionOptions?.map(option => (<MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>))}
                                          </Select>
                                      </FormControl>
                                      <TextField variant="standard" spellCheck={false} margin="dense" id="ConfigMaxTxPower" label="ConfigMaxTxPower" type="number" fullWidth value={sectorCarrierRow.ConfigMaxTxPower} onChange={(event) => { onSectorCarrierTextChange(event) }} error={errors.ConfigMaxTxPowerError} helperText={errors.ConfigMaxTxPowerError ? 'please enter  range from -2,147,483,648 to 2,147,483,647' : ''}onKeyDown={(event) => ["e", "E", "+","."].includes(event.key) && event.preventDefault()}/>
                                      <TextField variant="standard" spellCheck={false} margin="dense" id="arfcnDL" label="arfcnDL" type="number" fullWidth value={sectorCarrierRow.arfcnDL} onChange={(event) => { onSectorCarrierTextChange(event) }} error={errors.arfcnDLError} helperText={errors.arfcnDLError ? 'please enter  range from 0 to 3279165 ' : ''} onKeyDown={(event) => ["e", "E", "+", "-","."].includes(event.key) && event.preventDefault()} />
                                      <TextField variant="standard" spellCheck={false} margin="dense" id="arfcnUL" label="arfcnUL" type="number" fullWidth value={sectorCarrierRow.arfcnUL} onChange={(event) => { onSectorCarrierTextChange(event) }}error={errors.arfcnULError} helperText={errors.arfcnULError ? 'please enter  range from 0 to 3279165' : ''} onKeyDown={(event) => ["e", "E", "+", "-","."].includes(event.key) && event.preventDefault()}/>
                                      {/* <TextField variant="standard" spellCheck={false} margin="dense" id="bSChannelBwDl" label="bSChannelBwDl" type="text" fullWidth value={sectorCarrierRow.bSChannelBwDl} onChange={(event) => { onSectorCarrierTextChange(event) }} /> */}
                                      <FormControl variant="standard" margin="dense" fullWidth>
                                             <InputLabel id="bSChannelBwDl">BSChannelBwDl</InputLabel>
                                             <Select labelId="bSChannelBwDl" id="bSChannelBwDl"  
                                            value={sectorCarrierRow.bSChannelBwDl} onChange={handleNRbSChannelBwDlOptionsDropDownChange} label="bSChannelBwDl" 
                                            MenuProps={{ PaperProps: { style: { maxHeight: 200 } } }} >                        
                                            {bSChannelBwDlOptions?.map(option => (<MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>))}
                                            </Select>
                                       </FormControl>
                                      {/* <TextField variant="standard" spellCheck={false} margin="dense" id="bSChannelBwUl" label="bSChannelBwUl" type="text" fullWidth value={sectorCarrierRow.bSChannelBwUl} onChange={(event) => { onSectorCarrierTextChange(event) }} /> */}
                                     <FormControl variant="standard" margin="dense" fullWidth>
                                         <InputLabel id="bSChannelBwUl">BSChannelBwUl</InputLabel>
                                          <Select labelId="bSChannelBwUl" id="bSChannelBwUl" value={sectorCarrierRow.bSChannelBwUl} onChange={handleNRbSChannelBwUlOptionsDropDownChange} label="bSChannelBwUl"
                                          MenuProps={{ PaperProps: { style: { maxHeight: 200 } } }} >                                                 
                                          {bSChannelBwUlOptions?.map(option => (<MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>))}
                                         </Select>
                                       </FormControl>
                                    </div> : listName == "BwpTable" ?
                                      <div style={{ width: '80%', paddingLeft: '10%' }}>
                                        {isEdit ?
                                          <TextField variant="standard" spellCheck={false} margin="dense" id="id" label="Id" type="text" fullWidth value={bwpRow.id} onChange={(event) => { onBwpTextChange(event) }} disabled />
                                          : null}
                                        <TextField variant="standard" spellCheck={false} margin="dense" id="PriorityLabel" label="PriorityLabel" type="number" fullWidth value={bwpRow.PriorityLabel} onChange={(event) => { onBwpTextChange(event) }} error={errors.priorityLabelError} helperText={errors.priorityLabelError ? 'please enter  range from 0 to 4294967295' : ''} onKeyDown={(event) => ["e", "E", "+", "-","."].includes(event.key) && event.preventDefault()}/>
                                        {/* <TextField variant="standard" spellCheck={false} margin="dense" id="bwpContext" label="bwpContext" type="text" fullWidth value={bwpRow.bwpContext} onChange={(event) => { onBwpTextChange(event) }} /> */}
                                        <FormControl variant="standard" margin="dense" fullWidth>
                                          <InputLabel id="bwpContext">BwpContext</InputLabel>
                                          <Select labelId="bwpContext" id="bwpContext" value={bwpRow.bwpContext} onChange={handleBWPContextDropDownChange} label="bwpContext">
                                            {bwpContextOptions?.map(option => (<MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>))}
                                          </Select>
                                        </FormControl>
                                        {/* <TextField variant="standard" spellCheck={false} margin="dense" id="SubCarrierSpacing" label="SubCarrierSpacing" type="text" fullWidth value={bwpRow.SubCarrierSpacing} onChange={(event) => { onBwpTextChange(event) }} /> */}
                                        <FormControl variant="standard" margin="dense" fullWidth>
                                          <InputLabel id="SubCarrierSpacing">SubCarrierSpacing</InputLabel>
                                          <Select labelId="SubCarrierSpacing" id="SubCarrierSpacing" value={bwpRow.SubCarrierSpacing} onChange={handleSubCarrierSpacingDropDownChange} label="SubCarrierSpacing"
                                          MenuProps={{ PaperProps: { style: { maxHeight: 200 } } }}>
                                            {subCarrierSpacingOptions?.map(option => (<MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>))}
                                          </Select>
                                        </FormControl>
                                        {/* <TextField variant="standard" spellCheck={false} margin="dense" id="cyclePrefix" label="cyclePrefix" type="text" fullWidth value={bwpRow.cyclePrefix} onChange={(event) => { onBwpTextChange(event) }} /> */}
                                        <FormControl variant="standard" margin="dense" fullWidth>
                                          <InputLabel id="cyclePrefix">CyclePrefix</InputLabel>
                                          <Select labelId="cyclePrefix" id="cyclePrefix" value={bwpRow.cyclePrefix} onChange={handleCyclePrefixDropDownChange} label="cyclePrefix">
                                            {CyclePrefixOptions?.map(option => (<MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>))}
                                          </Select>
                                        </FormControl>
                                        <TextField variant="standard" spellCheck={false} margin="dense" id="startRB" label="startRB" type="text" fullWidth value={bwpRow.startRB} onChange={(event) => { onBwpTextChange(event) }} error={errors.startRBError} helperText={errors.startRBError ? 'please enter  range from 0 to 4294967295' : ''} onKeyDown={(event) => ["e", "E", "+", "-","."].includes(event.key) && event.preventDefault()} />
                                        <TextField variant="standard" spellCheck={false} margin="dense" id="NumberOfRBs" label="NumberOfRBs" type="text" fullWidth value={bwpRow.NumberOfRBs} onChange={(event) => { onBwpTextChange(event) }} error={errors.NumberOfRBsError} helperText={errors.NumberOfRBsError ? 'please enter  range from 0 to 4294967295' : ''} onKeyDown={(event) => ["e", "E", "+", "-","."].includes(event.key) && event.preventDefault()} />
                                        {/* <TextField variant="standard" spellCheck={false} margin="dense" id="isInitiaLBwp" label="isInitiaLBwp" type="text" fullWidth value={bwpRow.isInitiaLBwp} onChange={(event) => { onBwpTextChange(event) }} /> */}
                                        <FormControl variant="standard" margin="dense" fullWidth>
                                          <InputLabel id="isInitiaLBwp">IsInitialBwp</InputLabel>
                                          <Select labelId="isInitiaLBwp" id="isInitiaLBwp" value={bwpRow.isInitiaLBwp} onChange={handleIsInitiaLBwpDropDownChange} label="isInitiaLBwp">
                                            {IsInitialBwpOptions?.map(option => (<MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>))}
                                          </Select>
                                        </FormControl>
                                        </div> : listName == "NRCellDuTable" ?
                                        <div style={{ width: '80%', paddingLeft: '10%' }}>
                                          <TextField variant="standard" spellCheck={false} margin="dense" id="NRPCI" label="NRPCI" type="number" fullWidth value={NRCellDuRow.NRPCI} onChange={(event) => { onNRCellDuTextChange(event) }} error={errors.NRPCIError} helperText={errors.NRPCIError ? 'please enter  range from 0 to 1007 ' : ''} onKeyDown={(event) => ["e", "E", "+", "-","."].includes(event.key) && event.preventDefault()} />
                                          <TextField variant="standard" spellCheck={false} margin="dense" id="NRTAC" label="NRTAC" type="text" fullWidth value={NRCellDuRow.NRTAC} onChange={(event) => { onNRCellDuTextChange(event) }} error={errors.NRTACError} helperText={errors.NRTACError ? 'Please enter a value between 0 to 16777215 ' : ''} onKeyDown={(event) => ["e", "E", "+", "-","."].includes(event.key) && event.preventDefault()} />
                                          {/* <TextField variant="standard" spellCheck={false} margin="dense" id="NRSectorCarrierRef" label="NRSectorCarrierRef" type="number" fullWidth value={NRCellDuRow.NRSectorCarrierRef} onChange={(event) => { onNRCellDuTextChange(event) }}  /> */}
                                          <FormControl variant="standard" margin="dense" fullWidth>
                                            <InputLabel id="ResourceType">ResourceType</InputLabel>
                                            <Select labelId="ResourceType" id="ResourceType" value={NRCellDuRow.ResourceType} onChange={NRResourceTypeDropDownChange} label="ResourceType">
                                              {NRresourceTypeOptions?.map(option => (<MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>))}
                                            </Select>
                                          </FormControl>

                                          <FormControl variant="standard" margin="dense" fullWidth >
                                            <InputLabel id="CellLocalId">Cell LocalId</InputLabel>
                                            <Select
                                              labelId="cellLocalId"
                                              id="cellLocalId"
                                              label="Cell Local ID"
                                              value={NRCellDuRow.CellLocalId}
                                              onChange={CellLocalIdDropDownChange}>
                                              {cellLocalIdOptions?.map(option => (
                                                <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                                              ))}
                                            </Select>
                                          </FormControl>

                                          <FormControl variant="standard" margin="dense" fullWidth>
                                            <InputLabel id="cellId">Cell Id</InputLabel>
                                            <Select
                                              labelId="cellId"
                                              id="cellId"
                                              label="Cell ID"

                                              value={NRCellDuRow.cellId}
                                              onChange={CellIdDropDownChange}>
                                              {cellIdOptions.map(option => (
                                                <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                                              ))}
                                            </Select>
                                          </FormControl>
                                          <FormControl variant="standard" margin="dense" fullWidth>
                                            <InputLabel id="BwplistId">BwplistId</InputLabel>
                                            <Select labelId="BwplistId" id="BwplistId" value={NRCellDuRow.BwplistId} onChange={handleNRCellDuBwpIdDropDownChange} label="BwplistId">
                                              {bwpIdOptions?.map(option => (<MenuItem key={option} value={option}>{option}</MenuItem>))}
                                            </Select>
                                          </FormControl>
                                          <FormControl variant="standard" margin="dense" fullWidth>
                                            <InputLabel id="NRSectorCarrierlistId">NRSectorCarrierlistId</InputLabel>
                                            <Select labelId="NRSectorCarrierlistId" id="NRSectorCarrierlistId" value={NRCellDuRow.NRSectorCarrierReflistId} onChange={handleNRSectorCarrierlistIdDropDownChange} label="NRSectorCarrierlistId">
                                              {NRSectorCarrierlistIdOptions?.map(option => (<MenuItem key={option} value={option}>{option}</MenuItem>))}
                                            </Select>
                                          </FormControl>
                                      </div> : listName == "PreconfRUProfileTable" ?
                                        <div style={{ width: '80%', paddingLeft: '10%' }}>
                                          <TextField variant="standard" spellCheck={false} margin="dense" id="RUIndex" disabled label="RUIndex" type="number" fullWidth value={selectePreconfRURow.RUIndex} onChange={(event) => { onPreconfRUTextChange(event) }} error={errors.RUIndexError}helperText={errors.RUIndexError ?  'please enter  range from 0 to 127 '  : ''} onKeyDown={(event) => ["e", "E", "+", "-","."].includes(event.key) && event.preventDefault()}/>
                                          <TextField variant="standard" spellCheck={false} margin="dense" id="RUInstanceId" label="RUInstanceId" type="text" fullWidth value={selectePreconfRURow.RUInstanceId} onChange={(event) => { onPreconfRUTextChange(event) }}  />
                                         </div> : listName == "PrbDlTable" ?
                                            <div style={{ width: '80%', paddingLeft: '10%' }}>
                                              <TextField variant="standard" spellCheck={false} margin="dense" id="ElemIndex" label="Element Index" disabled type="number" fullWidth value={selectePrbDlRow.ElemIndex} onChange={(event) => { onPrbDlTextChange(event) }} error={errors.DLElemIndexError} helperText={errors.DLElemIndexError ? 'please enter  range from 0 to 255' : ''} onKeyDown={(event) => ["e", "E", "+", "-","."].includes(event.key) && event.preventDefault()}/>
                                              <TextField variant="standard" spellCheck={false} margin="dense" id="RbStart" label="RbStart" type="number" fullWidth value={selectePrbDlRow.RbStart} onChange={(event) => { onPrbDlTextChange(event) }} error={errors.DLRbStartError} helperText={errors.DLRbStartError ? 'please enter  range from 0 to 65,535' : ''} onKeyDown={(event) => ["e", "E", "+", "-","."].includes(event.key) && event.preventDefault()}/>
                                              <TextField variant="standard" spellCheck={false} margin="dense" id="RbSize" label="RbSize" type="number" fullWidth value={selectePrbDlRow.RbSize} onChange={(event) => { onPrbDlTextChange(event) }} error={errors.DLRbSizeError} helperText={errors.DLRbSizeError ? 'please enter  range from 0 to 65,535' : ''} onKeyDown={(event) => ["e", "E", "+", "-","."].includes(event.key) && event.preventDefault()}/>
                                              <TextField variant="standard" spellCheck={false} margin="dense" id="StartSymbol" label="StartSymbol" type="number" fullWidth value={selectePrbDlRow.StartSymbol} onChange={(event) => { onPrbDlTextChange(event) }} error={errors.DLStartSymbolError} helperText={errors.DLStartSymbolError ? 'please enter  range from 0 to 255' : ''} onKeyDown={(event) => ["e", "E", "+", "-","."].includes(event.key) && event.preventDefault()}/>
                                              <TextField variant="standard" spellCheck={false} margin="dense" id="NumofSymbol" label="NumofSymbol" type="number" fullWidth value={selectePrbDlRow.NumofSymbol} onChange={(event) => { onPrbDlTextChange(event) }} error={errors.DLNumofSymbolError} helperText={errors.DLNumofSymbolError ? 'please enter  range from 0 to 255' : ''} onKeyDown={(event) => ["e", "E", "+", "-","."].includes(event.key) && event.preventDefault()}/>
                                              <TextField variant="standard" spellCheck={false} margin="dense" id="BeamIndex" label="BeamIndex" type="number" fullWidth value={selectePrbDlRow.BeamIndex} onChange={(event) => { onPrbDlTextChange(event) }} error={errors.DLBeamIndexError} helperText={errors.DLBeamIndexError ? 'please enter  range from 0 to 255' : ''} onKeyDown={(event) => ["e", "E", "+", "-","."].includes(event.key) && event.preventDefault()}/>
                                              <TextField variant="standard" spellCheck={false} margin="dense" id="BfweightUpdate" label="BfweightUpdate" type="number" fullWidth value={selectePrbDlRow.BfweightUpdate} onChange={(event) => { onPrbDlTextChange(event) }} error={errors.DLBfweightUpdateError} helperText={errors.DLBfweightUpdateError ? 'please enter  range from 0 to 255' : ''} onKeyDown={(event) => ["e", "E", "+", "-","."].includes(event.key) && event.preventDefault()}/>
                                              <TextField variant="standard" spellCheck={false} margin="dense" id="CompMethod" label="CompMethod" type="number" fullWidth value={selectePrbDlRow.CompMethod} onChange={(event) => { onPrbDlTextChange(event) }} error={errors.DLCompMethodError} helperText={errors.DLCompMethodError ? 'please enter  range from 0 to 255' : ''}onKeyDown={(event) => ["e", "E", "+", "-","."].includes(event.key) && event.preventDefault()} />
                                              <TextField variant="standard" spellCheck={false} margin="dense" id="IqWidth" label="IqWidth" type="number" fullWidth value={selectePrbDlRow.IqWidth} onChange={(event) => { onPrbDlTextChange(event) }} error={errors.DLIqWidthError} helperText={errors.DLIqWidthError ? 'please enter  range from 0 to 255' : ''} onKeyDown={(event) => ["e", "E", "+", "-","."].includes(event.key) && event.preventDefault()}/>
                                              <TextField variant="standard" spellCheck={false} margin="dense" id="BeamForming" label="BeamForming" type="number" fullWidth value={selectePrbDlRow.BeamForming} onChange={(event) => { onPrbDlTextChange(event) }} error={errors.DLBeamFormingError} helperText={errors.DLBeamFormingError ? 'please enter  range from 0 to 255' : ''} onKeyDown={(event) => ["e", "E", "+", "-","."].includes(event.key) && event.preventDefault()}/>
                                              <TextField variant="standard" spellCheck={false} margin="dense" id="ScaleFactor" label="ScaleFactor" type="number" fullWidth value={selectePrbDlRow.ScaleFactor} onChange={(event) => { onPrbDlTextChange(event) }} error={errors.DLScaleFactorError} helperText={errors.DLScaleFactorError ? 'please enter  range from 0 to 255' : ''} onKeyDown={(event) => ["e", "E", "+", "-","."].includes(event.key) && event.preventDefault()}/>
                                              <TextField variant="standard" spellCheck={false} margin="dense" id="Remask" label="Remask" type="number" fullWidth value={selectePrbDlRow.Remask} onChange={(event) => { onPrbDlTextChange(event) }} error={errors.DLRemaskError} helperText={errors.DLRemaskError ? 'please enter  range from 0 to 255' : ''} onKeyDown={(event) => ["e", "E", "+", "-","."].includes(event.key) && event.preventDefault()}/>
                                            </div> : listName == "PrbUlTable" ?
                                              <div style={{ width: '80%', paddingLeft: '10%' }}>
                                                <TextField variant="standard" spellCheck={false} margin="dense" disabled id="ElemIndex" label="Element Index" type="number" fullWidth value={selectePrbUlRow.ElemIndex} onChange={(event) => { onPrbUlTextChange(event) }} error={errors.ULElemIndexError} helperText={errors.ULElemIndexError ? 'please enter  range from 0 to 255' : ''} onKeyDown={(event) => ["e", "E", "+", "-","."].includes(event.key) && event.preventDefault()} />
                                                <TextField variant="standard" spellCheck={false} margin="dense" id="RbStart" label="RbStart" type="number" fullWidth value={selectePrbUlRow.RbStart} onChange={(event) => { onPrbUlTextChange(event) }} error={errors.ULRbStartError} helperText={errors.ULRbStartError ? 'please enter  range from 0 to 65,535' : ''} onKeyDown={(event) => ["e", "E", "+", "-","."].includes(event.key) && event.preventDefault()}/>
                                                <TextField variant="standard" spellCheck={false} margin="dense" id="RbSize" label="RbSize" type="number" fullWidth value={selectePrbUlRow.RbSize} onChange={(event) => { onPrbUlTextChange(event) }} error={errors.ULRbSizeError} helperText={errors.ULRbSizeError ? 'please enter  range from 0 to 65,535' : ''} onKeyDown={(event) => ["e", "E", "+", "-","."].includes(event.key) && event.preventDefault()} />
                                                <TextField variant="standard" spellCheck={false} margin="dense" id="StartSymbol" label="StartSymbol" type="number" fullWidth value={selectePrbUlRow.StartSymbol} onChange={(event) => { onPrbUlTextChange(event) }} error={errors.ULStartSymbolError} helperText={errors.ULStartSymbolError ? 'please enter  range from 0 to 255' : ''} onKeyDown={(event) => ["e", "E", "+", "-","."].includes(event.key) && event.preventDefault()}/>
                                                <TextField variant="standard" spellCheck={false} margin="dense" id="NumofSymbol" label="NumofSymbol" type="number" fullWidth value={selectePrbUlRow.NumofSymbol} onChange={(event) => { onPrbUlTextChange(event) }} error={errors.ULNumofSymbolError} helperText={errors.ULNumofSymbolError ? 'please enter  range from 0 to 255' : ''} onKeyDown={(event) => ["e", "E", "+", "-","."].includes(event.key) && event.preventDefault()}/>
                                                <TextField variant="standard" spellCheck={false} margin="dense" id="BeamIndex" label="BeamIndex" type="number" fullWidth value={selectePrbUlRow.BeamIndex} onChange={(event) => { onPrbUlTextChange(event) }} error={errors.ULBeamIndexError} helperText={errors.ULBeamIndexError ? 'please enter  range from 0 to 255' : ''} onKeyDown={(event) => ["e", "E", "+", "-","."].includes(event.key) && event.preventDefault()}/>
                                                <TextField variant="standard" spellCheck={false} margin="dense" id="BfweightUpdate" label="BfweightUpdate" type="number" fullWidth value={selectePrbUlRow.BfweightUpdate} onChange={(event) => { onPrbUlTextChange(event) }} error={errors.ULBfweightUpdateError} helperText={errors.ULBfweightUpdateError ? 'please enter  range from 0 to 255' : ''} onKeyDown={(event) => ["e", "E", "+", "-","."].includes(event.key) && event.preventDefault()}/>
                                                <TextField variant="standard" spellCheck={false} margin="dense" id="CompMethod" label="CompMethod" type="number" fullWidth value={selectePrbUlRow.CompMethod} onChange={(event) => { onPrbUlTextChange(event) }} error={errors.ULCompMethodError} helperText={errors.ULCompMethodError ? 'please enter  range from 0 to 255' : ''} onKeyDown={(event) => ["e", "E", "+", "-","."].includes(event.key) && event.preventDefault()}/>
                                                <TextField variant="standard" spellCheck={false} margin="dense" id="IqWidth" label="IqWidth" type="number" fullWidth value={selectePrbUlRow.IqWidth} onChange={(event) => { onPrbUlTextChange(event) }} error={errors.ULIqWidthError} helperText={errors.ULIqWidthError ? 'please enter  range from 0 to 255' : ''} onKeyDown={(event) => ["e", "E", "+", "-","."].includes(event.key) && event.preventDefault()}/>
                                                <TextField variant="standard" spellCheck={false} margin="dense" id="BeamForming" label="BeamForming" type="number" fullWidth value={selectePrbUlRow.BeamForming} onChange={(event) => { onPrbUlTextChange(event) }} error={errors.ULBeamFormingError} helperText={errors.ULBeamFormingError ? 'please enter  range from 0 to 255' : ''}onKeyDown={(event) => ["e", "E", "+", "-","."].includes(event.key) && event.preventDefault()} />
                                                <TextField variant="standard" spellCheck={false} margin="dense" id="ScaleFactor" label="ScaleFactor" type="number" fullWidth value={selectePrbUlRow.ScaleFactor} onChange={(event) => { onPrbUlTextChange(event) }} error={errors.ULScaleFactorError} helperText={errors.ULScaleFactorError ? 'please enter  range from 0 to 255' : ''} onKeyDown={(event) => ["e", "E", "+", "-","."].includes(event.key) && event.preventDefault()}/>
                                                <TextField variant="standard" spellCheck={false} margin="dense" id="Remask" label="Remask" type="number" fullWidth value={selectePrbUlRow.Remask} onChange={(event) => { onPrbUlTextChange(event) }} error={errors.ULRemaskError} helperText={errors.ULRemaskError ? 'please enter  range from 0 to 255' : ''} onKeyDown={(event) => ["e", "E", "+", "-","."].includes(event.key) && event.preventDefault()}/>
                                              </div> :
                                              null
              }
              <Typography id="errorMessage" component={"div"} color="error"></Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                addData();
              }} style={{ backgroundColor: 'white', color: 'blue', border: '1px solid blue', borderRadius: '1px', padding: '3px 6px' }} >
                Save
              </Button>
              <Button onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                setOpen(false);
              }} style={{ backgroundColor: 'white', color: 'red', border: '1px solid red', borderRadius: '1px', padding: '3px 6px' }}>
                Cancel
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>

      {currentTreeIndex === 2 ?
        (
          <div style={{ width: '99%', border: '1px solid #ccc', borderRadius: '3px', marginLeft: '2%', marginTop: '1%', marginBottom: '1%', padding: '1%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', overflow: 'auto' }}>
            <div><Typography variant="h6">Current DU : {currentDu}</Typography></div>
            {/* TEXTFIELDS AND DROPDOWNS COMPLETED*/}

            <div style={{ border: '1px solid #ccc', borderRadius: '3px', margin: '1%', padding: '1%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ marginTop: '1%' }}><b>ID</b></div>
              <TextField variant="standard" spellCheck={false} autoFocus margin="dense" id="userLabel" label="UserLabel" type="text" style={{ width: '20%', paddingRight: '2%' }} value={dudata ? dudata.userLabel : ""} onChange={(event) => { ongeneralconfigTextChange(event) }} InputLabelProps={{ shrink: true, sx: { left: "1rem", right: "1rem", } }} />
              <TextField variant="standard" spellCheck={false} autoFocus margin="dense" id="gNBDUId" label="gNBDUId" type="number" style={{ width: '20%', paddingRight: '2%' }} value={dudata ? dudata.gNBDUId : ""} onChange={(event) => { ongeneralconfigTextChange(event) }} InputLabelProps={{ shrink: true, sx: { left: "1rem", right: "1rem", } }} error={errors.gNBDUIdError} helperText={errors.gNBDUIdError ? 'please enter  range from 0 to 68719476735 '  : ''} onKeyDown={(event) => ["e", "E", "+", "-","."].includes(event.key) && event.preventDefault()}/>
              <TextField variant="standard" spellCheck={false} autoFocus margin="dense" id="gNBIdLength" label="gNBIdLength" type="number" style={{ width: '20%', paddingRight: '2%' }} value={dudata ? dudata.gNBIdLength : ""} onChange={(event) => { ongeneralconfigTextChange(event) }} InputLabelProps={{ shrink: true, sx: { left: "1rem", right: "1rem", } }} error={errors.gNBIdLengthError} helperText={errors.gNBIdLengthError ? 'please enter  range from 22 to 32 ' : ''} onKeyDown={(event) => ["e", "E", "+", "-","."].includes(event.key) && event.preventDefault()}/>

              <FormControl variant="standard" margin="dense" style={{ width: '21%', paddingRight: '2%' }}>
                <InputLabel id="PeeParameters">PeeParameters List</InputLabel>
                <Select
                  labelId="peeParameters"
                  id="peeParameters"
                  label="Pee Parameters"
                  value={selectedPeeParameters} // Use selectedPeeParameters instead of cuupdata.peeParameters
                  onChange={PeeParametersDropDownChange} >
                  {peeParametersOptions?.map(option => (
                    <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl variant="standard" margin="dense" style={{ width: '20%', paddingRight: '2%' }}>
                <InputLabel id=" RRMPolicyList">RRMPolicy List</InputLabel>
                <Select
                  labelId="rrmPolicyList"
                  id="rrmPolicyList"
                  label="RRM Policy List"
                  value={selectedRrmPolicyList}
                  onChange={RRMPolicyListDropDownChange}>
                  {rrmPolicyListOptions?.map(option => (
                    <MenuItem key={option.Name} value={option.Name}>{option.Name}</MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl variant="standard" margin="dense" style={{ width: '20%', paddingRight: '2%' }} >
                <InputLabel id="resourceType">Resource Type</InputLabel>
                <Select
                  labelId="resourceType"
                  id="resourcetype"
                  label="Resource Type"
                  value={selectedResourceType} // Use selectedResourceType instead of cuupdata.resourceType
                  onChange={ResourceTypeDropDownChange}
                >
                  {resourceTypeOptions?.map(option => (
                    <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField variant="standard" spellCheck={false} autoFocus margin="dense" id="priorityLabel" label="PriorityLabel" type="number" style={{ width: '20%', paddingRight: '2%' }} value={dudata ? dudata.priorityLabel : ""} onChange={(event) => { ongeneralconfigTextChange(event) }} InputLabelProps={{ shrink: true, sx: { left: "1rem", right: "1rem", } }} error={errors.priorityLabelError} helperText={errors.priorityLabelError ? 'please enter range from 0 to 4294967295 ' : ''} onKeyDown={(event) => ["e", "E", "+", "-","."].includes(event.key) && event.preventDefault()} />
            </div>

            {/* 1. SECTOR CONFIGURATION TABLE ... */}
            {/* 2. MANAGED NF SERVICE TABLE  ... */}
            {/* 3. END POINT TABLE  ... */}

            {/* 1. SECTOR CONFIGURATION TABLE NOW COMPLETED ... */}

            {/* <div style={{ width: '100%', height: '250px' }}>
              <Table style={{ minWidth: "100%", height: '180px', borderCollapse: 'collapse', tableLayout: 'fixed' }}>
                <TableCell style={{ width: "100%", height: '20px' }}>
                  <Paper style={{ width: "99.5%", border: '2px solid #ccc', marginTop: '2px' }}>
                    <div style={{ color: 'black', backgroundColor: '#c6cbd1', height: '20px' }} ><b>Sector Configuration List</b></div>
                    <IconButton aria-label="add-element" style={{ marginLeft: '90%', height: '30px' }}>
                      <AddIcon onClick={() => addNewRecord("SectorConfigurationTable", "SectorConfigurationTable")} />
                    </IconButton>
                    <div style={{ overflow: "auto", height: '150px' }}>
                      <Table style={{ minWidth: "99.5%", }} aria-label="SectorConfigurationTable">
                        <TableHead sx={{ "& th": { color: '#ffffff', backgroundColor: '#53659c', lineHeight: '1.1', position: "sticky", top: "0" ,zIndex: '1'} }}>
                          <TableRow sx={{ "& .MuiTableRow-root": { maxHeight: 20 } }}>
                            <TableCell align="center" style={{ width: 115 }}>Priority Label</TableCell>
                            <TableCell align="center" style={{ width: 115 }}>TxDirection </TableCell>
                            <TableCell align="center" style={{ width: 115 }}>ConfigMax TxPower(mW)</TableCell>
                            <TableCell align="center" style={{ width: 115 }}>ArfcnDL</TableCell>
                            <TableCell align="center" style={{ width: 115 }}>ArfcnUL </TableCell>
                            <TableCell align="center" style={{ width: 115 }}>BSChannel BwDl(MHz)</TableCell>
                            <TableCell align="center" style={{ width: 115 }}>BSChannel BwUl(MHz)</TableCell>
                            <TableCell align="center">Actions</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody style={{ zIndex: '0' }}>
                          {sectorconfigurationrows?.map(row => (
                            <TableRow key={row.id} sx={{ '&:nth-of-type(odd)': { backgroundColor: '#d7ecff' }, '& .MuiTableCell-root': { height: '12px', padding: '0' }, '&:last-child td, &:last-child th': { border: 0 } }} >
                              <CustomTableCell {...{ row, name: "PriorityLabel" }} />
                              <CustomTableCell {...{ row, name: "tXDirection" }} />
                              <CustomTableCell {...{ row, name: "ConfigMaxTxPower" }} />
                              <CustomTableCell {...{ row, name: "arfcnDL" }} />
                              <CustomTableCell {...{ row, name: "arfcnUL" }} />
                              <CustomTableCell {...{ row, name: "bSChannelBwDl" }} />
                              <CustomTableCell {...{ row, name: "bSChannelBwUl" }} />
                              <TableCell align='center' style={{ width: 105, height: '40px', display: 'flex', flexDirection: 'row' }}>
                                  <IconButton aria-label="edit" onClick={() => handleEditOpen("SectorConfigurationTable", "SectorConfigurationTable", row)} >
                                    <EditIcon />
                                  </IconButton>
                                  <IconButton aria-label="delete" onClick={() => onDeleteRow("SectorConfigurationTable", row.id)} >
                                    <DeleteIcon />
                                  </IconButton>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </Paper>
                </TableCell>
              </Table>
            </div> */}
            {/* 2. MANAGED NF SERVICE TABLE COMPLETED ... */}
            <div style={{ width: '100%', height: '250px' }}>
              <Table style={{ minWidth: "100%", height: '180px', borderCollapse: 'collapse', tableLayout: 'fixed' }}>
                <TableCell style={{ width: "100%", height: '20px' }}>
                  <Paper style={{ width: "99.5%", border: '2px solid #ccc', marginTop: '2px' }}>
                    <div style={{ color: 'black', backgroundColor: '#c6cbd1', height: '20px' }} ><b>Managed NF Service List</b></div>
                    <IconButton aria-label="add-element" style={{ marginLeft: '90%', height: '30px' }}>
                      <AddIcon onClick={() => addNewRecord("ManagedNFServiceTable", "ManagedNFServiceTable")} />
                    </IconButton>
                    <div style={{ overflow: "auto", height: '150px' }}>
                      <Table style={{ minWidth: "99.5%", }} aria-label="ManagedNFServiceTable">
                        <TableHead sx={{ "& th": { color: '#ffffff', backgroundColor: '#53659c', lineHeight: '1.1', position: "sticky", top: "0",zIndex: '1'} }}>
                          <TableRow sx={{ "& .MuiTableRow-root": { maxHeight: 20 } }}>
                            <TableCell align="center" style={{ width: 115 }}>AdministrativeState</TableCell>
                            <TableCell align="center" style={{ width: 115 }}>Sap Host </TableCell>
                            <TableCell align="center" style={{ width: 115 }}>Sap Port </TableCell>
                            <TableCell align="center" style={{ width: 115 }}>OperationsName</TableCell>
                            <TableCell align="center" style={{ width: 115 }}>OperationsAllowed</TableCell>
                            <TableCell align="center" >Actions</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody style={{ zIndex: '0' }}>
                          {ManagedNFServicerows?.map(row => (
                            <TableRow key={row.id} sx={{ '&:nth-of-type(odd)': { backgroundColor: '#d7ecff' }, '& .MuiTableCell-root': { height: '12px', padding: '0' }, '&:last-child td, &:last-child th': { border: 0 } }} >
                              <CustomTableCell {...{ row, name: "AdministrativeState" }} />
                              <CustomTableCell {...{ row, name: "saphost" }} />
                              <CustomTableCell {...{ row, name: "sapport" }} />
                              <CustomTableCell {...{ row, name: "operationsName" }} />
                              <CustomTableCell {...{ row, name: "operationsAllowed" }} />
                              <TableCell align='center' style={{ width: 105, height: '10px', }}>
                                <>
                                  <IconButton aria-label="edit" onClick={() => handleEditOpen("ManagedNFServiceTable", "ManagedNFServiceTable", row)} >
                                    <EditIcon />
                                  </IconButton>
                                  <IconButton aria-label="delete" onClick={() => onDeleteRow("ManagedNFServiceTable", row.id)} >
                                    <DeleteIcon />
                                  </IconButton>
                                </>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </Paper>
                </TableCell>
              </Table>
            </div>

            {/* 3. END POINT TABLE COMPLETED ... */}

            <div style={{ width: '100%', height: '250px' }}>
              <Table style={{ minWidth: "100%", height: '180px', borderCollapse: 'collapse', tableLayout: 'fixed' }}>
                <TableCell style={{ width: "100%", height: '20px' }}>
                  <Paper style={{ width: "99.5%", border: '2px solid #ccc', marginTop: '2px' }}>
                    <div style={{ color: 'black', backgroundColor: '#c6cbd1', height: '20px' }} ><b>End Point List</b></div>
                    <IconButton aria-label="add-element" style={{ marginLeft: '90%', height: '30px' }}>
                      <AddIcon onClick={() => addNewRecord("EndPointTable", "EndPointTable")} />
                    </IconButton>
                    <div style={{ overflow: "auto", height: '150px' }}>
                      <Table style={{ minWidth: "99.5%", }} aria-label="EndPointTable">
                        <TableHead sx={{ "& th": { color: '#ffffff', backgroundColor: '#53659c', lineHeight: '1.1', position: "sticky", top: "0" ,zIndex: '1'} }}>
                          <TableRow sx={{ "& .MuiTableRow-root": { maxHeight: 20 } }}>
                            <TableCell align="center" style={{ width: 115 }}>EndPoint</TableCell>
                            <TableCell align="center" style={{ width: 115 }}>LocalIP Address </TableCell>
                            <TableCell align="center" style={{ width: 115 }}>Vlan Id </TableCell>
                            <TableCell align="center" style={{ width: 115 }}>RemoteIP Address</TableCell>
                            <TableCell align="center" >Actions</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody style={{ zIndex: '0' }}>
                          {endpointrows?.map(row => (
                            <TableRow key={row.id} sx={{ '&:nth-of-type(odd)': { backgroundColor: '#d7ecff' }, '& .MuiTableCell-root': { height: '12px', padding: '0' }, '&:last-child td, &:last-child th': { border: 0 } }} >
                              <CustomTableCell {...{ row, name: "EndPoint" }} />
                              <CustomTableCell {...{ row, name: "LocalIPAddress" }} />
                              <CustomTableCell {...{ row, name: "VLANID" }} />
                              <CustomTableCell {...{ row, name: "RemoteIPAddress" }} />
                              <TableCell align='center' style={{ width: 105, height: '10px', }}>
                                <>
                                  <IconButton aria-label="edit" onClick={() => handleEditOpen("EndPointTable", "EndPointTable", row)} >
                                    <EditIcon />
                                  </IconButton>
                                  <IconButton aria-label="delete" onClick={() => onDeleteRow("EndPointTable", row.id)} >
                                    <DeleteIcon />
                                  </IconButton>
                                </>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </Paper>
                </TableCell>
              </Table>
            </div>

            <Button variant="contained" style={{ color: '#ffffff', backgroundColor: '#53659c', width: '150px', marginLeft: '80%', marginBottom: '0px', marginTop: '0px', }} onClick={saveData}>Save</Button>

            </div>) : currentTreeIndex === 100  ?
          (
          <div style={{ width: '99%', border: '1px solid #ccc', borderRadius: '3px', marginLeft: '2%', marginTop: '1%', marginBottom: '1%', padding: '1%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', overflow: 'auto' }}>
            {/* MACCONFIGURATION --> DRX CONFIG  */}
            {/* 4. DRX PROFILE ID TABLE  ... */}
            {/* 5. SCHEDULING REQUEST CONFIGURATION TABLE  ... */}
            {/* <div><Typography variant="h6">Current DU : {currentDu}</Typography></div> */}

        <div style={{display:'flex', flexDirection: 'row'}}>
        <div style={{ display: 'flex', alignItems: 'center', width: '90%' }}>
        <Typography variant="h5" style={{marginRight: '4%'}}>Current DU : {currentDu}</Typography>
        <Typography fontSize={16} variant="h5">Current DRX : {currentdrx}</Typography>
        </div>
        <Button variant="contained" disabled={DrxProfileIdInfoList?.length >= 6  ? true : false} style={{color: '#ffffff', backgroundColor: DrxProfileIdInfoList?.length >= 6 ? 'grey' : '#53659c', width: '120px', marginLeft: '6%', marginBottom: '0px', marginTop: '1px',padding: '0%' }}
        onClick={addDRX}>Add DRX</Button>
        <Button variant="contained"  disabled={DrxProfileIdInfoList?.length <= 1 || DrxProfileIdInfoList?.length === 0 ? true : false}style={{ color: '#ffffff', backgroundColor:DrxProfileIdInfoList?.length <= 1 || DrxProfileIdInfoList?.length === 0 ? 'grey' :  '#53659c', width: '130px', marginLeft: '3%', marginBottom: '0px', marginTop: '0px',padding: '0%' }}
        onClick={deleteDRX}>Delete DRX</Button>
      </div>

      {/* 4. DRX PROFILE ID TABLE  ... */}

      {/* <div style={{ width: '100%', height: '250px' }}> */}
      {DrxProfileIdInfoList &&  selecteddrxindex != null && DrxProfileIdInfoList?.length > 0 ?
      (
      <div style={{ border: '1px solid #ccc', borderRadius: '3px', margin: '1%', padding: '1%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
        <FormControl variant="standard" margin="dense" style={{ width: '20%', paddingRight: '2%' }} >
                  <InputLabel id="drxinactivitytimer">DrxInactivityTimer</InputLabel>
                  <Select labelId="drxinactivitytimer" id="drxinactivitytimer" value={DrxProfileIdInfoList[selecteddrxindex]?.drxinactivitytimer} onChange={handleDrxInactivityTimerDropDownChange} label="drxinactivitytimer"
                  MenuProps={{ PaperProps: { style: { maxHeight: 200 } } }}>
                    {DrxInactivityTimerOptions?.map(option => (<MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>))}
                  </Select>
                </FormControl>
                <TextField variant="standard" spellCheck={false} margin="dense" id="drxharqrttdl" label="drxharqrttdl" type="number" style={{ width: '20%', paddingRight: '2%' }} value={DrxProfileIdInfoList[selecteddrxindex]?.drxharqrttdl != null ? DrxProfileIdInfoList[selecteddrxindex]?.drxharqrttdl : 0} onChange={(event) => { onDrxProfileIdTextChange(event) }} error={drxerrorindex[DrxProfileIdInfoList[selecteddrxindex]?.id].drxharqrttdlError} helperText={drxerrorindex[DrxProfileIdInfoList[selecteddrxindex]?.id].drxharqrttdlError ? 'please enter  range from 0 to 56' : ''} InputLabelProps={{ shrink: true, sx: { left: "1rem", right: "1rem", } }} onKeyDown={(event) => ["e", "E", "+", "-","."].includes(event.key) && event.preventDefault()} />
                <TextField variant="standard" spellCheck={false} margin="dense" id="drxharqrttul" label="drxharqrttul" type="number" style={{ width: '20%', paddingRight: '2%' }} value={DrxProfileIdInfoList[selecteddrxindex]?.drxharqrttul != null ? DrxProfileIdInfoList[selecteddrxindex]?.drxharqrttul : 0} onChange={(event) => { onDrxProfileIdTextChange(event) }} error={drxerrorindex[DrxProfileIdInfoList[selecteddrxindex]?.id].drxharqrttulError} helperText={drxerrorindex[DrxProfileIdInfoList[selecteddrxindex]?.id].drxharqrttulError ? 'please enter  range from 0 to 56 ' : ''} InputLabelProps={{ shrink: true, sx: { left: "1rem", right: "1rem", } }} onKeyDown={(event) => ["e", "E", "+", "-","."].includes(event.key) && event.preventDefault()} />
              <FormControl variant="standard" margin="dense" style={{ width: '20%', paddingRight: '2%' }} >
                  <InputLabel id="drxtransmisdl">DrxRetransmissionDl</InputLabel>
                  <Select labelId="drxtransmisdl" id="drxtransmisdl" value={DrxProfileIdInfoList[selecteddrxindex]?.drxtransmisdl} onChange={handleDrxRetransmissionTimerDlDropDownChange} label="drxtransmisdl"
                  MenuProps={{ PaperProps: { style: { maxHeight: 200 } } }}>
                    {DrxRetransmissionTimerDLOptions?.map(option => (<MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>))}
                  </Select>
                </FormControl>
                <FormControl variant="standard" margin="dense" style={{ width: '20%', paddingRight: '2%' }} >
                  <InputLabel id="drxtransmisul">DrxRetransmissionUl</InputLabel>
                  <Select labelId="drxtransmisul" id="drxtransmisul" value={DrxProfileIdInfoList[selecteddrxindex]?.drxtransmisul} onChange={handleDrxRetransmissionTimerUlDropDownChange} label="drxtransmisul"
                  MenuProps={{ PaperProps: { style: { maxHeight: 200 } } }}>
                    {DrxRetransmissionTimerULOptions?.map(option => (<MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>))}
                  </Select>
                </FormControl>
                {/*<TextField variant="standard" spellCheck={false} autoFocus margin="dense" id="maxulharqtx" label="maxulharqtx" type="number" style={{ width: '20%', paddingRight: '2%' }} value={dudata.qoslist[selectedqosindex].maxulharqtx} onChange={(event) => { onqosDlTextChange(event) }} InputLabelProps={{ shrink: true, sx: { left: "1rem", right: "1rem", } }} />*/}
                <FormControl variant="standard" margin="dense" style={{ width: '26%', paddingRight: '2%' }} >
                  <InputLabel id="drxlongcycle">DrxlongCycle</InputLabel>
                  <Select labelId="drxlongcycle" id="drxlongcycle" value={DrxProfileIdInfoList[selecteddrxindex]?.drxlongcycle} onChange={handleDrxLongCycleDropDownChange} label="drxlongcycle"
                  MenuProps={{ PaperProps: { style: { maxHeight: 200 } } }}>
                    {DrxLongCycleOptions?.map(option => (<MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>))}
                  </Select>
                </FormControl> 

      </div>
      ):null}

      {/* 5. SCHEDULING REQUEST CONFIGURATION TABLE  ...  */}

      <div style={{ width: '100%', height: '250px' }}>
        <Table style={{ minWidth: "100%", height: '180px', borderCollapse: 'collapse', tableLayout: 'fixed' }}>
          <TableCell style={{ width: "100%", height: '20px' }}>
            <Paper style={{ width: "99.5%", border: '2px solid #ccc', marginTop: '2px' }}>
              <div style={{ color: 'black', backgroundColor: '#c6cbd1', height: '20px' }} ><b>scheduling Request Configuration List</b></div>
              <IconButton aria-label="add-element" style={{ marginLeft: '90%', height: '30px' }}>
                <AddIcon onClick={() => addNewRecord("SchedulingReqConfTable", "SchedulingReqConfTable")} />
              </IconButton>
              <div style={{ overflow: "auto", height: '150px' }}>
                <Table style={{ minWidth: "99.5%", }} aria-label="SchedulingReqConfTable">
                  <TableHead sx={{ "& th": { color: '#ffffff', backgroundColor: '#53659c', lineHeight: '1.1', position: "sticky", top: "0" ,zIndex: '1'} }}>
                    <TableRow sx={{ "& .MuiTableRow-root": { maxHeight: 20 } }}>

                      <TableCell align="center" style={{ width: 115 }}>Scheduling Request</TableCell>
                      <TableCell align="center" style={{ width: 115 }}>Scprohibit Timer </TableCell>
                      <TableCell align="center" style={{ width: 115 }}>SctransMax </TableCell>
                      <TableCell align="center" >Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody style={{ zIndex: '0' }}>
                  {DrxProfileIdInfoList[selecteddrxindex] && DrxProfileIdInfoList[selecteddrxindex]["SchedulingReqConfInfoList"]?.map((row) => (
                      <TableRow key={row.id} sx={{ '&:nth-of-type(odd)': { backgroundColor: '#d7ecff' }, '& .MuiTableCell-root': { height: '12px', padding: '0' }, '&:last-child td, &:last-child th': { border: 0 } }} >
                        <CustomTableCell {...{ row, name: "schedulingrequest" }} />
                        <CustomTableCell {...{ row, name: "scprohibittimer" }} />
                        <CustomTableCell {...{ row, name: "sctransmax" }} />
                        <TableCell align='center' style={{ width: 105, height: '10px' }}>
                          <>
                            <IconButton aria-label="edit" onClick={() => handleEditOpen("SchedulingReqConfTable", "SchedulingReqConfTable", row)} >
                              <EditIcon />
                            </IconButton>
                            <IconButton aria-label="delete" onClick={() => onDeleteRow("SchedulingReqConfTable", row.id)} >
                              <DeleteIcon />
                            </IconButton>
                          </>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </Paper>
          </TableCell>
        </Table>
      </div>
<Button variant="contained" style={{ color: '#ffffff', backgroundColor: '#53659c', width: '150px', marginLeft: '80%', marginBottom: '0px', marginTop: '0px', }} onClick={saveData}>Save</Button>

</div>) : currentTreeIndex === 5 ?
    (
      <div style={{ width: '99%', border: '1px solid #ccc', borderRadius: '3px', marginLeft: '2%', marginBottom: '1%', marginTop: '1%', padding: '1%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', overflow: 'auto' }}>

        {/* SRB CONGIG */}
        {/* 6. COMMON-CONFIGURATION MAC-PARAMETERS-LIST TABLE  ... */}
        <div><Typography variant="h6">Current DU : {currentDu}</Typography></div>
        
        <div style={{ border: '1px solid #ccc', borderRadius: '3px', margin: '1%', padding: '1%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ marginTop: '1%' }}><b>Srb Configuration</b></div>
        <TextField variant="standard" spellCheck={false} autoFocus margin="dense" id="Priority" label="Priority" type="number" style={{ width: '20%', paddingRight: '2%' }} value={dudata?.srblist?.Priority} onChange={(event) => { onMacParamTextChange(event) }} error={errors.PriorityError} helperText={errors.PriorityError ? 'please enter  range from 1 to 16 ' : ''} InputLabelProps={{ shrink: true, sx: { left: "1rem", right: "1rem", } }} />
        <FormControl variant="standard" margin="dense" style={{ width: '20%', paddingRight: '2%' }} >
                      <InputLabel id="AllowedServCells">AllowedServCells</InputLabel>
                      <Select labelId="AllowedServCells" id="AllowedServCells" value={AllowedServCells} onChange={handleAllowedServCellsDropDownChange} label="AllowedServCells"
                        MenuProps={{ PaperProps: { style: { maxHeight: 200 } } }}>
                        {AllowedServeCellOptions?.map(option => (<MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>))}
                      </Select>
      </FormControl>
      <FormControl variant="standard" margin="dense" style={{ width: '20%', paddingRight: '2%' }} >
                      <InputLabel id="maxpuschduration">Maxpuschduration</InputLabel>
                      <Select labelId="maxpuschduration" id="maxpuschduration" value={maxpuschduration} onChange={handleMaxpuschdurationDropDownChange} label="maxpuschduration"
                        MenuProps={{ PaperProps: { style: { maxHeight: 200 } } }}>
                    {MaxpuschdurationOptions?.map(option => (<MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>))}
                    </Select>
      </FormControl>
      <FormControl variant="standard" margin="dense" style={{ width: '20%', paddingRight: '2%' }} >
                      <InputLabel id="srdelaytimer">SrDelaytimer</InputLabel>
                      <Select labelId="srdelaytimer" id="srdelaytimer" value={srdelaytimer} onChange={handleSrDelayTimerDropDownChange} label="srdelaytimer">
                        {SrDelayTimerOptions?.map(option => (<MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>))}
                    </Select>
      </FormControl>
    </div>
   <Button variant="contained" style={{ color: '#ffffff', backgroundColor: '#53659c', width: '150px', marginLeft: '80%', marginBottom: '0px', marginTop: '0px', }} onClick={saveData}>Save</Button>
  </div>) : currentTreeIndex === 61 ?
   (
    <div style={{ width: '99%', border: '1px solid #ccc', borderRadius: '3px', marginLeft: '2%', marginTop: '1%', marginBottom: '1%', padding: '1%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', overflow: 'auto' }}>
    
<div style={{display:'flex', flexDirection: 'row'}}>
      <div style={{ display: 'flex', alignItems: 'center', width: '90%' }}>
      <Typography variant="h5" style={{marginRight: '4%'}}>Current DU : {currentDu}</Typography>
      <Typography fontSize={16} variant="h5">Current QOS : {currentqosid}</Typography>
      </div>
      <Button variant="contained" disabled={qoslist?.length >= 6 ? true : false} style={{color: '#ffffff', backgroundColor: qoslist?.length >= 6 ? 'grey' : '#53659c', width: '120px', marginLeft: '6%', marginBottom: '0px', marginTop: '1px',padding: '0%' }}
      onClick={addQOS}>Add QOS</Button>
      <Button variant="contained"  disabled={qoslist?.length <= 1 || qoslist?.length === 0 ? true : false}style={{ color: '#ffffff', backgroundColor:qoslist?.length <= 1 || qoslist?.length === 0 ? 'grey' :  '#53659c', width: '130px', marginLeft: '3%', marginBottom: '0px', marginTop: '0px',padding: '0%' }}
      onClick={deleteQOS}>Delete QOS</Button>
      </div>

      {/* QOS-GROUP-CONFIG-LIST */}
      {/* 8. UL SPECIFIC PARAMETERS LIST TABLE  ... */}
      {/* 9. DL SPECIFIC PARAMETERS LIST TABLE  ... */}

      {/* 8. UL SPECIFIC PARAMETER LIST TABLE  ... */}
    { selectedqosindex != null && qoslist.length > 0 ? (<>
    <div style={{ border: '1px solid #ccc', borderRadius: '3px', margin: '1%', padding: '1%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
    <div style={{ marginTop: '1%' }}><b>UL Specific Parameters List</b></div>
                {console.log(selectedqosindex)}
                {console.log("qos  -->",qoslist) }

                {console.log("qos list ",qoslist[selectedqosindex]?.lgalchansrmask)}
                <TextField variant="standard" spellCheck={false} autoFocus margin="dense" id="logicalchannel" label="Logical Channel" type="number" style={{ width: '20%', paddingRight: '2%' }} value={qoslist[selectedqosindex]?.logicalchannel ? qoslist[selectedqosindex]?.logicalchannel : ""} onChange={(event) => { onqosUlTextChange(event) }} InputLabelProps={{ shrink: true, sx: { left: "1rem", right: "1rem", } }} onKeyDown={(event) => ["e", "E", "+", "-","."].includes(event.key) && event.preventDefault()} />
              <FormControl variant="standard" margin="dense" style={{ width: '20%', paddingRight: '2%' }} >
                                  <InputLabel id="lgalchansrmask">lgalChanSrMask</InputLabel>
                                  <Select labelId="lgalchansrmask" id="lgalchansrmask" value={qoslist[selectedqosindex]?.lgalchansrmask} onChange={handleSrMaskDropDownChange} label="lgalchansrmask">
                                    {SrDelayTimerOptions?.map(option => (<MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>))}
                                  </Select>
                </FormControl>
                <FormControl variant="standard" margin="dense" style={{ width: '20%', paddingRight: '2%' }} >
                                  <InputLabel id="prioritrizedbitrate">PrioritrizedBitrate</InputLabel>
                                  <Select labelId="prioritrizedbitrate" id="prioritrizedbitrate" value={qoslist[selectedqosindex]?.prioritrizedbitrate} onChange={handlePrioritisedBitrateDropDownChange} label="prioritrizedbitrate"
                                   MenuProps={{ PaperProps: { style: { maxHeight: 200 } } }}>
                                    {PrioritisedBitrateOptions?.map(option => (<MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>))}
                                  </Select>
                </FormControl>
                <FormControl variant="standard" margin="dense" style={{ width: '20%', paddingRight: '2%' }} >
                                  <InputLabel id="bucketsizedura">BucketSizeDura</InputLabel>
                                  <Select labelId="bucketsizedura" id="bucketsizedura" value={qoslist[selectedqosindex]?.bucketsizedura} onChange={handleBucketSizeDurationrDropDownChange} label="bucketsizedura"
                                   MenuProps={{ PaperProps: { style: { maxHeight: 200 } } }}>
                                    {BucketSizeDurationOption?.map(option => (<MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>))}
                                  </Select>
                  </FormControl>
                <FormControl variant="standard" margin="dense" style={{ width: '20%', paddingRight: '2%' }} >
                                  <InputLabel id="lsclchansrdelay">logicalChannelSrDelayTimer</InputLabel>
                                  <Select labelId="lsclchansrdelay" id="lsclchansrdelay" value={qoslist[selectedqosindex]?.lsclchansrdelay} onChange={handlelsChannelDelayTimerDropDownChange} label="lsclchansrdelay"
                                   MenuProps={{ PaperProps: { style: { maxHeight: 200 } } }}>
                                    {SrDelayTimerOptions?.map(option => (<MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>))}
                                  </Select>
                                </FormControl>
                                <TextField variant="standard" spellCheck={false} autoFocus margin="dense" id="maxulharqtx" label="maxulharqtx" type="number" style={{ width: '20%', paddingRight: '2%' }} value={qoslist[selectedqosindex]?.maxulharqtx} onChange={(event) => { onqosUlTextChange(event) }} error={qoserrorindex[qoslist[selectedqosindex]?.id].maxulharqtxError} helperText={qoserrorindex[qoslist[selectedqosindex]?.id].maxulharqtxError ? 'please enter  range from 1 to 8 ' : ''} InputLabelProps={{ shrink: true, sx: { left: "1rem", right: "1rem", } }} />
                               
    </div>
    <div style={{ border: '1px solid #ccc', borderRadius: '3px', margin: '1%', padding: '1%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
    <div style={{ marginTop: '1%' }}><b>DL Specific Parameters List</b></div>
                
                {/* <TextField variant="standard" spellCheck={false} autoFocus margin="dense" id="MaxpuschDuration" label="Max pusch Duration" type="text" style={{ width: '20%', paddingRight: '2%' }} value={dudata.qoslist[selectedqosindex].maxpdschduration} onChange={(event) => { onqosDlTextChange(event) }} InputLabelProps={{ shrink: true, sx: { left: "1rem", right: "1rem", } }} /> */}
                <FormControl variant="standard" margin="dense" style={{ width: '20%', paddingRight: '2%' }} >
                                  <InputLabel id="maxpdschduration">maxpdschduration</InputLabel>
                                  <Select labelId="maxpdschduration" id="maxpdschduration" value={qoslist[selectedqosindex]?.maxpdschduration} onChange={handleMaxpdschdurationDropDownChange} label="maxpdschduration"
                                   MenuProps={{ PaperProps: { style: { maxHeight: 200 } } }}>
                                    {MaxpdschdurationOptions?.map(option => (<MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>))}
                                  </Select>
                  </FormControl>
              
                  <TextField variant="standard" spellCheck={false} autoFocus margin="dense" id="maxdlharqtx" label="maxdlharqtx" type="number" style={{ width: '20%', paddingRight: '2%' }} value={qoslist[selectedqosindex]?.maxdlharqtx} onChange={(event) => { onqosDlTextChange(event) }} error={qoserrorindex[qoslist[selectedqosindex]?.id].maxdlharqtxError} helperText={qoserrorindex[qoslist[selectedqosindex]?.id].maxdlharqtxError ? 'please enter  range from 1 to 8 ' : ''}  InputLabelProps={{ shrink: true, sx: { left: "1rem", right: "1rem", } }} />
    </div> </>) : null}
      <Button variant="contained" style={{ color: '#ffffff', backgroundColor: '#53659c', width: '150px', marginLeft: '80%', marginBottom: '0px', marginTop: '0px', }} onClick={saveData}>Save</Button>
    </div>) : currentTreeIndex === 7 ?
                (
                  <div style={{ width: '99%', border: '1px solid #ccc', borderRadius: '3px', marginLeft: '2%', marginTop: '1%', marginBottom: '1%', padding: '1%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', overflow: 'auto' }}>
                    {/* TEXTFIELDS AND LABELS  */}
                    {/* BSR CONFIGURATION TEXTFIELDS AND LABELS  ... */}


                    {/* TEXTFIELDS AND DROPDOWNS COMPLETED*/}

                    <div><Typography variant="h6">Current DU : {currentDu}</Typography></div>
                    <div style={{ border: '1px solid #ccc', borderRadius: '3px', margin: '1%', padding: '1%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                      <div style={{ marginTop: '1%' }}><b>Bsr Configuration</b></div>
                      {/* <TextField variant="standard" spellCheck={false} autoFocus margin="dense" id="LogicalChannelSrdelayTimer" label="Logicalchannel SrdelayTimer" type="text" style={{ width: '20%', paddingRight: '2%' }} value={dudata? dudata.LogicalChannelSrdelayTimer : ""} onChange={(event) => { onBsrConfigurationTextChange(event) }} InputLabelProps={{ shrink: true, sx: { left: "1rem", right: "1rem", } }} /> */}
                      <FormControl variant="standard" margin="dense" style={{ width: '26%', paddingRight: '2%' }} >
                        <InputLabel id="LogicalChannelSrdelayTimer">Logical Channel SrDelay Timer List</InputLabel>
                        <Select
                          labelId="LogicalChannelSrdelayTimer"
                          id="LogicalChannelSrdelayTimer"
                          label="LogicalChannelSrdelayTimer"
                          value={selectedLogicalChannelSrdelayTimer} // Use selectedResourceType instead of cuupdata.resourceType
                          onChange={handleLogicalChannelSrDelayTimerDropDownChange} MenuProps={{ PaperProps: { style: { maxHeight: 200 } } }}>
                          {LogicalChannelSrDelayTimerOptions?.map(option => (
                            <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                      {/* <TextField variant="standard" spellCheck={false} autoFocus margin="dense" id="periodicityBsrTimer" label="Periodicity BsrTimer" type="text" style={{ width: '20%', paddingRight: '2%' }} value={dudata? dudata.periodicityBsrTimer : ""} onChange={(event) => { onBsrConfigurationTextChange(event) }} InputLabelProps={{ shrink: true, sx: { left: "1rem", right: "1rem", } }} /> */}
                      <FormControl variant="standard" margin="dense" style={{ width: '24%', paddingRight: '2%' }} >
                        <InputLabel id="periodicityBsrTimer">Periodicity BsrTimer</InputLabel>
                        <Select
                          labelId="periodicityBsrTimer"
                          id="periodicityBsrTimer"
                          label="periodicityBsrTimer"
                          value={selectedPeriodicityBsrTimer} // Use selectedResourceType instead of cuupdata.resourceType
                          onChange={handlePeriodicityBsrTimerDropDownChange} MenuProps={{ PaperProps: { style: { maxHeight: 200 } } }}>
                          {PeriodicityBsrTimerOptions?.map(option => (
                            <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                      {/* <TextField variant="standard" spellCheck={false} autoFocus margin="dense" id="RctxBsrTimer" label="RctxBsrTimer" type="text" style={{ width: '20%', paddingRight: '2%' }} value={dudata? dudata.RctxBsrTimer : ""} onChange={(event) => { onBsrConfigurationTextChange(event) }} InputLabelProps={{ shrink: true, sx: { left: "1rem", right: "1rem", } }} /> */}
                      <FormControl variant="standard" margin="dense" style={{ width: '24%', paddingRight: '2%' }} >
                        <InputLabel id="RctxBsrTimer">Rctx Bsr Timer</InputLabel>
                        <Select
                          labelId="RctxBsrTimer"
                          id="RctxBsrTimer"
                          label="RctxBsrTimer"
                          value={selectedRctxBsrTimer} // Use selectedResourceType instead of cuupdata.resourceType
                          onChange={handleRctxBsrTimerDropDownChange} MenuProps={{ PaperProps: { style: { maxHeight: 200 } } }}>
                          {RetxBsrTimerOptions?.map(option => (
                            <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </div>

                    <Button variant="contained" style={{ color: '#ffffff', backgroundColor: '#53659c', width: '150px', marginLeft: '81%', marginBottom: '0px', marginTop: '0px', }} onClick={saveData}>Save</Button>
                  </div>) : currentTreeIndex === 8 ?
                  (
                    <div style={{ width: '99%', border: '1px solid #ccc', borderRadius: '3px', marginLeft: '2%', marginTop: '1%', marginBottom: '1%', padding: '1%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', overflow: 'auto' }}>
                      <div><Typography variant="h6">Current DU : {currentDu}</Typography></div>
                      {/* TEXTFIELDS AND LABELS  */}
                      {/* PHR CONFIGURATION TEXTFIELDS AND LABELS PENDING ... */}
                      <div style={{ border: '1px solid #ccc', borderRadius: '3px', margin: '1%', padding: '1%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <div style={{ marginTop: '1%' }}><b>Phr Configuration</b></div>
                        {/* <TextField variant="standard" spellCheck={false} autoFocus margin="dense" id="phrPeriodicTimer" label="PhrPeriodic Timer" type="text" style={{ width: '25%', paddingRight: '2%' }} value={dudata? dudata.phrPeriodicTimer : ""} onChange={(event) => { onPhrConfigurationTextChange(event) }} InputLabelProps={{ shrink: true, sx: { left: "1rem", right: "1rem", } }} /> */}
                        <FormControl variant="standard" margin="dense" style={{ width: '21%', paddingRight: '2%' }} >
                          <InputLabel id="phrPeriodicTimer">Phr Periodic Timer</InputLabel>
                          <Select
                            labelId="phrPeriodicTimer"
                            id="phrPeriodicTimer"
                            label="phrPeriodicTimer"
                            value={selectedPhrPeriodicTimer} // Use selectedResourceType instead of cuupdata.resourceType
                            onChange={handlePhrPeriodicTimerDropDownChange} MenuProps={{ PaperProps: { style: { maxHeight: 200 } } }}>
                            {PhrPeriodicTimerOptions?.map(option => (
                              <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                        {/* <TextField variant="standard" spellCheck={false} autoFocus margin="dense" id="phrProhibitTimer" label="PhrProhibit Timer" type="text" style={{ width: '25%', paddingRight: '2%' }} value={dudata? dudata.phrProhibitTimer : ""} onChange={(event) => { onPhrConfigurationTextChange(event) }} InputLabelProps={{ shrink: true, sx: { left: "1rem", right: "1rem", } }} /> */}
                        <FormControl variant="standard" margin="dense" style={{ width: '21%', paddingRight: '2%' }} >
                          <InputLabel id="phrProhibitTimer">Phr Prohibit Timer</InputLabel>
                          <Select
                            labelId="phrProhibitTimer"
                            id="phrProhibitTimer"
                            label="phrProhibitTimer"
                            value={selectedPhrProhibitTimer} // Use selectedResourceType instead of cuupdata.resourceType
                            onChange={handlePhrProhibitTimerDropDownChange}MenuProps={{ PaperProps: { style: { maxHeight: 200 } } }}>
                            {PhrProhibitTimerOptions?.map(option => (
                              <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                        {/* <TextField variant="standard" spellCheck={false} autoFocus margin="dense" id="PhrTxpowerFactorchange" label="PhrTxpower Factorchange" type="text" style={{ width: '20%', paddingRight: '2%' }} value={dudata? dudata.PhrTxpowerFactorchange : ""} onChange={(event) => { onPhrConfigurationTextChange(event) }} InputLabelProps={{ shrink: true, sx: { left: "1rem", right: "1rem", } }} /> */}
                        <FormControl variant="standard" margin="dense" style={{ width: '21%', paddingRight: '2%' }} >
                          <InputLabel id="PhrTxpowerFactorchange">Phr Tx power Factor Change</InputLabel>
                          <Select
                            labelId="PhrTxpowerFactorchange"
                            id="PhrTxpowerFactorchange"
                            label="PhrTxpowerFactorchange"
                            value={selectedPhrTxpowerFactorchange} // Use selectedResourceType instead of cuupdata.resourceType
                            onChange={handlePhrTxpowerFactorchangeDropDownChange}MenuProps={{ PaperProps: { style: { maxHeight: 200 } } }}>
                            {PhrTxPowerFactorChangeOptions?.map(option => (
                              <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                        {/* <TextField variant="standard" spellCheck={false} autoFocus margin="dense" id="PhrType2OtherCell2" label="PhrType2 OtherCell2" type="text" style={{ width: '20%', paddingRight: '2%' }} value={dudata ? dudata.PhrType2OtherCell2 : ""} onChange={(event) => { onPhrConfigurationTextChange(event) }} InputLabelProps={{ shrink: true, sx: { left: "1rem", right: "1rem", } }} /> */}
                          <FormControl variant="standard" margin="dense" style={{ width: '21%', paddingRight: '2%' }} >
                           <InputLabel id="PhrType2OtherCell">Phr Type2 Other Cell</InputLabel>
                           <Select
                            labelId="PhrType2OtherCell"
                            id="PhrType2OtherCell"
                            label="PhrType2OtherCell"
                            value={selectedPhrType2OtherCell} // Use selectedResourceType instead of cuupdata.resourceType
                            onChange={handlePhrType2OtherCellDropDownChange}MenuProps={{ PaperProps: { style: { maxHeight: 200 } } }}>
                            {Phrtype2OtherCellOptions?.map(option => (
                              <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                        {/* <TextField variant="standard" spellCheck={false} autoFocus margin="dense" id="PhrModeOthercg" label="PhrModeOthercg" type="text" style={{ width: '20%', paddingRight: '2%' }} value={dudata? dudata.PhrModeOthercg : ""} onChange={(event) => { onPhrConfigurationTextChange(event) }} InputLabelProps={{ shrink: true, sx: { left: "1rem", right: "1rem", } }} /> */}
                        <FormControl variant="standard" margin="dense" style={{ width: '21%', paddingRight: '2%' }} >
                          <InputLabel id="PhrModeOthercg">Phr Mode Othercg</InputLabel>
                          <Select
                            labelId="PhrModeOthercg"
                            id="PhrModeOthercg"
                            label="PhrModeOthercg"
                            value={selectedPhrModeOthercg} // Use selectedResourceType instead of cuupdata.resourceType
                            onChange={handlePhrModeOthercgDropDownChange}MenuProps={{ PaperProps: { style: { maxHeight: 200 } } }}>
                            {PhrModeOtherCgOptions?.map(option => (
                              <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                            ))}
                          </Select>
                        </FormControl>

                      </div>
                      <Button variant="contained" style={{ color: '#ffffff', backgroundColor: '#53659c', width: '150px', marginLeft: '81%', marginBottom: '0px', marginTop: '0px', }} onClick={saveData}>Save</Button>

                    </div>) : currentTreeIndex === 9 ?
                    (

                      <div style={{ width: '100%', border: '1px solid #ccc', borderRadius: '3px', marginLeft: '2%', marginTop: '1%', marginBottom: '1%', padding: '1%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', overflowY: 'auto', overflowX: 'hidden' }}>

                        <div><Typography variant="h6">Current DU : {currentDu}</Typography></div>
                        {/* 10. SCELL DEACTIVATION TIMER LIST TABLE PENDING ... */}

                        <div style={{ width: '100%', }}>
                          <Table style={{ minWidth: "100%", borderCollapse: 'collapse', tableLayout: 'fixed' }}>
                            <TableCell style={{ width: "100%", height: "20px", overflowY: "visible" }}>
                              <Paper style={{ width: "99.5%", border: '2px solid #ccc', marginTop: '2px' }}>
                                <div style={{ color: 'black', backgroundColor: '#c6cbd1', height: '20px' }} ><b>Scell Deactivation Timer List</b></div>
                                <IconButton aria-label="add-element" style={{ marginLeft: '90%', height: '30px' }}>
                                  <AddIcon onClick={() => addNewRecord("ScellDeactiveTable", "ScellDeactiveTable")} />
                                </IconButton>
                                <div style={{ maxHeight: "300px", overflowY: "auto" }}>
                                  <Table style={{ minWidth: "99.5%", }} aria-label="ScellDeactiveTable">
                                    <TableHead sx={{ "& th": { color: '#ffffff', backgroundColor: '#53659c', lineHeight: '1.1', position: "sticky", top: "0" ,zIndex: '1'} }}>
                                      <TableRow sx={{ "& .MuiTableRow-root": { maxHeight: 20 } }}>
                                        <TableCell align="center" style={{ width: 115 }}>Index</TableCell>
                                        <TableCell align="center" style={{ width: 115 }}>Deactivation Timer </TableCell>
                                        <TableCell align="center">Actions</TableCell>
                                      </TableRow>
                                    </TableHead>
                                    <TableBody style={{ zIndex: '0' }}>
                                      {Scelldeactiverows?.map(row => (
                                        <TableRow key={row.id} sx={{ '&:nth-of-type(odd)': { backgroundColor: '#d7ecff' }, '& .MuiTableCell-root': { height: '12px', padding: '0' }, '&:last-child td, &:last-child th': { border: 0 } }} >
                                          <CustomTableCell {...{ row, name: "Index" }} />
                                          <CustomTableCell {...{ row, name: "DeactivationTimer" }} />
                                          <TableCell align="center" style={{ width: 105, height: '10px' }}>
                                              <IconButton aria-label="edit" onClick={() => handleEditOpen("ScellDeactiveTable", "ScellDeactiveTable", row)} >
                                                <EditIcon />
                                              </IconButton>
                                              <IconButton aria-label="delete" onClick={() => onDeleteRow("ScellDeactiveTable", row.id)} >
                                                <DeleteIcon />
                                              </IconButton>
                                          </TableCell>
                                        </TableRow>
                                      ))}
                                    </TableBody>
                                  </Table>
                                </div>
                              </Paper>
                            </TableCell>
                          </Table>
                        </div>
                        <Button variant="contained" style={{ color: '#ffffff', backgroundColor: '#53659c', width: '150px', marginLeft: '81%', marginBottom: '0px', marginTop: '0px', }} onClick={saveData}>Save</Button>
                      </div>) : currentTreeIndex === 10 ?
                      (
                        <div style={{ width: '100%', border: '1px solid #ccc', borderRadius: '3px', marginLeft: '2%', marginTop: '1%', marginBottom: '1%', padding: '1%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', overflowY: 'auto', overflowX: 'hidden' }}>
                          <div><Typography variant="h6">Current DU : {currentDu}</Typography></div>
                          {/* 11. NR SECTOR CARRIER TABLE  ... */}
                          {/* 11. NR SECTOR CARRIER TABLE NOW COMPLETED ... */}

                          <div style={{ width: '100%', }}>
                            <Table style={{ minWidth: "100%", borderCollapse: 'collapse', tableLayout: 'fixed' }}>
                              <TableCell style={{ width: "100%", height: "20px", overflowY: "visible" }}>
                                <Paper style={{ width: "99.5%", border: '2px solid #ccc', marginTop: '2px' }}>
                                  <div style={{ color: 'black', backgroundColor: '#c6cbd1', height: '20px' }} ><b>NR Sector Carrier List</b></div>
                                  <IconButton aria-label="add-element" style={{ marginLeft: '90%', height: '30px' }}>
                                    <AddIcon onClick={() => addNewRecord("SectorCarrierTable", "SectorCarrierTable")} />
                                  </IconButton>
                                  <div style={{ maxHeight: "300px", overflowY: "auto" }}>
                                    <Table style={{ minWidth: "99.5%", }} aria-label="SectorCarrierTable">
                                      <TableHead sx={{ "& th": { color: '#ffffff', backgroundColor: '#53659c', lineHeight: '1.1', position: "sticky", top: "0" ,zIndex: '1'} }}>
                                        <TableRow sx={{ "& .MuiTableRow-root": { maxHeight: 20 } }}>
                                        <TableCell align="center" style={{ width: 115 }}>NRId</TableCell>
                                          <TableCell align="center" style={{ width: 115 }}>Priority Label</TableCell>
                                          <TableCell align="center" style={{ width: 115 }}>TxDirection </TableCell>
                                          <TableCell align="center" style={{ width: 115 }}>ConfigMax TxPower</TableCell>
                                          <TableCell align="center" style={{ width: 115 }}>Arfcndl</TableCell>
                                          <TableCell align="center" style={{ width: 115 }}>Arfcnul </TableCell>
                                          <TableCell align="center" style={{ width: 115 }}>BSChannel Bwdl</TableCell>
                                          <TableCell align="center" style={{ width: 115 }}>BSChannel Bwul</TableCell>
                                          <TableCell align="center">Actions</TableCell>
                                        </TableRow>
                                      </TableHead>
                                      <TableBody style={{ zIndex: '0' }}>
                                        {sectorcarrierrows?.map(row => (
                                          <TableRow key={row.id} sx={{ '&:nth-of-type(odd)': { backgroundColor: '#d7ecff' }, '& .MuiTableCell-root': { height: '12px', padding: '0' }, '&:last-child td, &:last-child th': { border: 0 } }} >
                                             <CustomTableCell {...{ row, name: "id" }} />
                                            <CustomTableCell {...{ row, name: "PriorityLabel" }} />
                                            <CustomTableCell {...{ row, name: "tXDirection" }} />
                                            <CustomTableCell {...{ row, name: "ConfigMaxTxPower" }} />
                                            <CustomTableCell {...{ row, name: "arfcnDL" }} />
                                            <CustomTableCell {...{ row, name: "arfcnUL" }} />
                                            <CustomTableCell {...{ row, name: "bSChannelBwDl" }} />
                                            <CustomTableCell {...{ row, name: "bSChannelBwUl" }} />
                                            <TableCell style={{ width: 105, height: '40px', display: 'flex', flexDirection: 'row' }}>
                                                <IconButton aria-label="edit" onClick={() => handleEditOpen("SectorCarrierTable", "SectorCarrierTable", row)} >
                                                  <EditIcon />
                                                </IconButton>
                                                <IconButton aria-label="delete" onClick={() => onDeleteRow("SectorCarrierTable", row.id)} >
                                                  <DeleteIcon />
                                                </IconButton>
                                            </TableCell>
                                          </TableRow>
                                        ))}
                                      </TableBody>
                                    </Table>
                                  </div>
                                </Paper>
                              </TableCell>
                            </Table>
                          </div>
                          <Button variant="contained" style={{ color: '#ffffff', backgroundColor: '#53659c', width: '150px', marginLeft: '81%', marginBottom: '0px', marginTop: '0px', }} onClick={saveData}>Save</Button>
                        </div>) : currentTreeIndex === 13 ?
                        (
                          <div style={{ width: '100%', border: '1px solid #ccc', borderRadius: '3px', marginLeft: '2%', marginTop: '1%', marginBottom: '1%', padding: '1%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', overflowY: 'auto', overflowX: 'hidden' }}>
                            <div><Typography variant="h6">Current DU : {currentDu}</Typography></div>
                            {/* 12. BWP TABLE  ... */}

                            {/* 12. BWP TABLE NOW COMPLETED ... */}
                            <div style={{ width: '100%', }}>
                              <Table id="tblbwprows" style={{ minWidth: "100%", borderCollapse: 'collapse', tableLayout: 'fixed' }}>
                                <TableCell style={{ width: "100%", height: "20px", overflowY: "visible" }}>
                                  <Paper style={{ width: "99.5%", border: '2px solid #ccc', marginTop: '2px' }}>
                                    <div style={{ color: 'black', backgroundColor: '#c6cbd1', height: '20px' }} ><b>BWP List</b></div>
                                    <IconButton aria-label="add-element" style={{ marginLeft: '90%', height: '30px' }}>
                                      <AddIcon onClick={() => addNewRecord("BwpTable", "BwpTable")} />
                                    </IconButton>
                                    <div style={{ maxHeight: "300px", overflowY: "auto" }}>
                                      <></>
                                      <Table style={{ minWidth: "99.5%", }} aria-label="BwpTable">
                                        <TableHead sx={{ "& th": { color: '#ffffff', backgroundColor: '#53659c', lineHeight: '1.1', position: "sticky", top: "0",zIndex: '1'  } }}>
                                          <TableRow sx={{ "& .MuiTableRow-root": { maxHeight: 20 } }}>
                                            <TableCell align="center" style={{ width: 115 }}>BwpId</TableCell>
                                            <TableCell align="center" style={{ width: 115 }}>Priority Label</TableCell>
                                            <TableCell align="center" style={{ width: 115 }}>Bwp Context </TableCell>
                                            <TableCell align="center" style={{ width: 115 }}>SubCarrier Spacing(KHz)</TableCell>
                                            <TableCell align="center" style={{ width: 115 }}>Cycle Prefix</TableCell>
                                            <TableCell align="center" style={{ width: 115 }}>Start RB </TableCell>
                                            <TableCell align="center" style={{ width: 115 }}>Number Of RBs</TableCell>
                                            <TableCell align="center" style={{ width: 115 }}>Isinitial Bwp</TableCell>
                                            <TableCell align="center">Actions</TableCell>
                                          </TableRow>
                                        </TableHead>
                                        <TableBody style={{ zIndex: '0' }}>
                                          {bwprows?.map(row => (
                                            <TableRow key={row.id} sx={{ '&:nth-of-type(odd)': { backgroundColor: '#d7ecff' }, '& .MuiTableCell-root': { height: '12px', padding: '0' }, '&:last-child td, &:last-child th': { border: 0 } }} >
                                              <CustomTableCell {...{ row, name: "id" }} />
                                              <CustomTableCell {...{ row, name: "PriorityLabel" }} />
                                              <CustomTableCell {...{ row, name: "bwpContext" }} />
                                              <CustomTableCell {...{ row, name: "SubCarrierSpacing" }} />
                                              <CustomTableCell {...{ row, name: "cyclePrefix" }} />
                                              <CustomTableCell {...{ row, name: "startRB" }} />
                                              <CustomTableCell {...{ row, name: "NumberOfRBs" }} />
                                              <CustomTableCell {...{ row, name: "isInitiaLBwp" }} />
                                              <TableCell style={{ width: 105, height: '40px', display: 'flex', flexDirection: 'row' }}>
                                                  <IconButton aria-label="edit" onClick={() => handleEditOpen("BwpTable", "BwpTable", row)} >
                                                    <EditIcon />
                                                  </IconButton>
                                                  <IconButton aria-label="delete" onClick={() => onDeleteRow("BwpTable", row.id)} >
                                                    <DeleteIcon />
                                                  </IconButton>
                                              </TableCell>
                                            </TableRow>
                                          ))}
                                        </TableBody>
                                      </Table>
                                    </div>
                                  </Paper>
                                </TableCell>
                              </Table>
                            </div>
                            <Button variant="contained" style={{ color: '#ffffff', backgroundColor: '#53659c', width: '150px', marginLeft: '81%', marginBottom: '0px', marginTop: '0px', }} onClick={saveData}>Save</Button>
                          </div>) : currentTreeIndex === 14 ?
                          (
                            <div style={{ width: '99%', border: '1px solid #ccc', borderRadius: '3px', marginLeft: '2%', marginTop: '1%', marginBottom: '1%', padding: '1%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', overflow: 'auto' }}>
                              <div><Typography variant="h6">Current DU : {currentDu}</Typography></div>

                             {/* NR CELL DU List  ....*/}
                             <div style={{ width: '100%', height: '250px' }}>
                              <></>
                                <Table id="tblNRCellDurows" style={{ minWidth: "100%", height: '180px', borderCollapse: 'collapse', tableLayout: 'fixed' }}>
                                  <TableCell style={{ width: "100%", height: '20px' }}>
                                    <Paper style={{ width: "99.5%", border: '2px solid #ccc', marginTop: '2px' }}>
                                      <div style={{ color: 'black', backgroundColor: '#c6cbd1', height: '20px' }} ><b>NR Cell DU List</b></div>
                                      <IconButton aria-label="add-element" style={{ marginLeft: '90%', height: '30px' }}>
                                        <AddIcon onClick={() => addNewRecord("NRCellDuTable", "NRCellDuTable")} />
                                      </IconButton>
                                      <div style={{ overflow: "auto", height: '150px' }}>
                                        <Table style={{ minWidth: "99.5%", }} aria-label="NRCellDuTable">
                                          <TableHead sx={{ "& th": { color: '#ffffff', backgroundColor: '#53659c', lineHeight: '1.1', position: "sticky", top: "0", zIndex: '1' } }}>
                                            <TableRow sx={{ "& .MuiTableRow-root": { maxHeight: 20 } }}>
                                              <TableCell align="center" style={{ width: 115 }}>NRPCI</TableCell>
                                              <TableCell align="center" style={{ width: 115 }}>NRTAC</TableCell>
                                              <TableCell align="center" style={{ width: 115 }}>ResourceType</TableCell>
                                              <TableCell align="center" style={{ width: 115 }}>CellLocalId</TableCell>
                                              <TableCell align="center" style={{ width: 115 }}>cellId</TableCell>
                                              <TableCell align="center" style={{ width: 115 }}>BwpId</TableCell>
                                              <TableCell align="center" style={{ width: 115 }}>NRSectorCarrierRefId</TableCell>
                                              <TableCell align="center" >Actions</TableCell>
                                            </TableRow>
                                          </TableHead>
                                          <TableBody style={{ zIndex: '0' }}>
                                            {NRCellDurows?.map(row => (
                                              <TableRow key={row.id} sx={{ '&:nth-of-type(odd)': { backgroundColor: '#d7ecff' }, '& .MuiTableCell-root': { height: '12px', padding: '0' }, '&:last-child td, &:last-child th': { border: 0 } }} >
                                                <CustomTableCell {...{ row, name: "NRPCI" }} />
                                                <CustomTableCell {...{ row, name: "NRTAC" }} />
                                                <CustomTableCell {...{ row, name: "ResourceType" }} />
                                                <CustomTableCell {...{ row, name: "CellLocalId" }} />
                                                <CustomTableCell {...{ row, name: "cellId" }} />
                                                <CustomTableCell {...{ row, name: "BwplistId" }} />
                                                <CustomTableCell {...{ row, name: "NRSectorCarrierReflistId" }} />
                                                <TableCell align='center' style={{ width: 105, height: '40px', display: 'flex', flexDirection: 'row' }}>
                                                    <IconButton aria-label="edit" onClick={() => handleEditOpen("NRCellDuTable", "NRCellDuTable", row)} >
                                                      <EditIcon />
                                                    </IconButton>
                                                    <IconButton aria-label="delete" onClick={() => onDeleteRow("NRCellDuTable", row.id)} >
                                                      <DeleteIcon />
                                                    </IconButton>
                                                </TableCell>
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
                              <Button variant="contained" style={{ color: '#ffffff', backgroundColor: '#53659c', width: '150px', marginLeft: '81%', marginBottom: '0px', marginTop: '0px', }} onClick={saveData}>Save</Button>
                            </div>) : currentTreeIndex === 41 ?
                            (
                              <div style={{ width: '99%', border: '1px solid #ccc', borderRadius: '3px', marginLeft: '2%', marginTop: '0%', marginBottom: '1%', padding: '1%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', overflowY: 'auto', overflowX: 'hidden' }}>
                                <div><Typography variant="h6">Current DU : {currentDu}</Typography></div>
                                <div style={{ borderBottom: '2px solid #ccc', marginBottom: '2px', padding: '10px' }}>
                                  <div style={{ marginTop: '1%' }}><b>DU SyncState</b></div>
                                  <TextField variant="standard" spellCheck={false} autoFocus margin="dense" id="DUIndex" label="DUIndex" type="number" style={{ width: '20%', paddingRight: '2%' }} value={dudata ? dudata.DUIndex : ""} onChange={(event) => { onDUSyncStateTextChange(event) }} InputLabelProps={{ shrink: true, sx: { left: "1rem", right: "1rem", } }} error={errors.DUIndexError} helperText={errors.DUIndexError ? 'please enter  range from 0 to 68719476735' : ''}  onKeyDown={(event) => ["e", "E", "+", "-","."].includes(event.key) && event.preventDefault()}/>                                  
                                   <TextField variant="standard" spellCheck={false} autoFocus margin="dense" id="gNBDUId" label="gNBDUId" type="number" style={{ width: '20%', paddingRight: '2%' }} value={dudata ? dudata.gNBDUId : ""}   onChange={(event) => { onDUSyncStateTextChange(event) }} InputLabelProps={{ shrink: true, sx: { left: "1rem", right: "1rem", } }} error={errors.fhgNBDUIdError} helperText={errors.fhgNBDUIdError ? 'please enter  range from 0 to 68719476735' : ''} onKeyDown={(event) => ["e", "E", "+", "-","."].includes(event.key) && event.preventDefault()} /> 
                                  <FormControl variant="standard" margin="dense" style={{ width: '20%', paddingRight: '2%' }}>
                                    <InputLabel id="Sync-state">SyncState</InputLabel>
                                    <Select
                                      labelId="SyncState"
                                      id="SyncState"
                                      label="SyncState"
                                      value={selectedSyncState}
                                      onChange={SyncStateListDropDownChange}  disabled >
                                      {SyncStateOptions?.map(option => (
                                        <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                                      ))}
                                    </Select>
                                  </FormControl>
                                </div>
                                <div style={{ borderBottom: '2px solid #ccc', marginBottom: '10px', padding: '10px' }}>
                                  <div style={{ marginTop: '1%' }}><b>Window Determine Method</b></div>
                                  <FormControl variant="standard" margin="dense" style={{ width: '20%', paddingRight: '2%' }}>
                                    <InputLabel id="Method">Method</InputLabel>
                                    <Select
                                      labelId="Method"
                                      id="Method"
                                      label="Method"
                                      value={selectedMethod}
                                      onChange={MethodListDropDownChange}>
                                      {MethodOptions?.map(option => (
                                        <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                                      ))}
                                    </Select>
                                  </FormControl>
                                  <FormControl variant="standard" margin="dense" style={{ width: '20%', paddingRight: '2%' }}>
                                    <InputLabel id="Configuration-status">ConfigurationStatus</InputLabel>
                                    <Select
                                      labelId="ConfiguStatus"
                                      id="ConfigStatus"
                                      label="ConfigStatus"
                                      value={selectedConfigStatus}
                                      onChange={ConfigStateListDropDownChange}>
                                      {ConfigStatusOptions?.map(option => (
                                        <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                                      ))}
                                    </Select>
                                  </FormControl>
                                  <TextField variant="standard" spellCheck={false} autoFocus margin="dense" id="RUCount" label="RUCount" type="text" style={{ width: '20%', paddingRight: '2%' }} value={dudata?.RUCount} onChange={(event) => { onODUWindowMethodTextChange(event) }} InputLabelProps={{ shrink: true, sx: { left: "1rem", right: "1rem", } }} error={errors.RUCountError} helperText={errors.RUCountError? 'please enter  range from 0 to 3279165' : ''} onKeyDown={(event) => ["e", "E", "+", "-","."].includes(event.key) && event.preventDefault()}/>
                                </div>
                                {/* 13. PreconfRUProfileTable Table */}
                                <div style={{ width: '100%', height: '240px' }}>
                                  <Table style={{ minWidth: "100%", height: '180px', borderCollapse: 'collapse', tableLayout: 'fixed' }}>
                                    <TableCell style={{ width: "100%", height: "20px" }}>
                                      <Paper style={{ width: "99.5%", border: '2px solid #ccc', marginTop: '2px' }}><div style={{ color: 'black', backgroundColor: '#c6cbd1', height: '20px' }} ><b>Pre Configured RU Profile List</b></div>
                                        <IconButton aria-label="add-element" style={{ marginLeft: '90%', height: '30px' }}>
                                          <AddIcon onClick={() => addNewRecord("PreconfRUProfileTable", "PreconfRUProfileTable")} />
                                        </IconButton>
                                        <div style={{ overflow: "auto", height: '150px' }}>
                                          <Table style={{ minWidth: "99.5%", }} aria-label="PreconfRUProfileTable">
                                            <TableHead sx={{ "& th": { color: '#ffffff', backgroundColor: '#53659c', lineHeight: '1.1', position: "sticky", top: "0" ,zIndex: '1' } }}>
                                              <TableRow sx={{ "& .MuiTableRow-root": { maxHeight: 20 } }}>
                                                <TableCell align="center" style={{ width: 115 }}>RU Index</TableCell>
                                                <TableCell align="center" style={{ width: 115 }}>RU Instance Id </TableCell>
                                                <TableCell align="center" >Actions</TableCell>
                                              </TableRow>
                                            </TableHead>
                                            <TableBody style={{ zIndex: '0' }}>
                                              {PreconfRUrows?.map(row => (
                                                <TableRow key={row.id} sx={{ '&:nth-of-type(odd)': { backgroundColor: '#d7ecff' }, '& .MuiTableCell-root': { height: '12px', padding: '0' }, '&:last-child td, &:last-child th': { border: 0 } }} >
                                                  <CustomTableCell {...{ row, name: "RUIndex" }} />
                                                  <CustomTableCell {...{ row, name: "RUInstanceId" }} />
                                                  <TableCell align="center" style={{ width: 105, height: '40px' }}>
                                                      <IconButton aria-label="edit" onClick={() => handleEditOpen("PreconfRUProfileTable", "PreconfRUProfileTable", row)} >
                                                        <EditIcon />
                                                      </IconButton>
                                                      <IconButton aria-label="delete" onClick={() => onDeleteRow("PreconfRUProfileTable", row.id)} >
                                                        <DeleteIcon />
                                                      </IconButton>
                                                  </TableCell>
                                                </TableRow>
                                              ))}
                                            </TableBody>
                                          </Table>
                                        </div>
                                      </Paper>
                                    </TableCell>
                                  </Table>
                                </div>
                                {/* TEXTFIELDS AND LABELS */}
                                <div style={{ borderBottom: '2px solid #ccc', padding: '10px'}}>
                                  <div style={{ marginTop: '1%' }}><b>Pre Configured Delay Profile</b></div>
                                  <TextField variant="standard" spellCheck={false} autoFocus margin="dense" id="ta4Min" label="Ta4 Min(ns)" type="number" style={{ width: '20%', paddingRight: '2%' }} value={dudata ? dudata.ta4Min : ""} onChange={(event) => { onPreConfiguredDelayTextChange(event) }} InputLabelProps={{ shrink: true, sx: { left: "1rem", right: "1rem", } }} error={errors.ta4MinError} helperText={errors.ta4MinError ? 'please enter  range from 0 to 4294967295' : ''} onKeyDown={(event) => ["e", "E", "+", "-","."].includes(event.key) && event.preventDefault()}/>
                                  <TextField variant="standard" spellCheck={false} autoFocus margin="dense" id="ta4Max" label="Ta4 Max(ns)" type="number" style={{ width: '20%', paddingRight: '2%' }} value={dudata ? dudata.ta4Max : ""} onChange={(event) => { onPreConfiguredDelayTextChange(event) }} InputLabelProps={{ shrink: true, sx: { left: "1rem", right: "1rem", } }} error={errors.ta4MaxError} helperText={errors.ta4MaxError ? 'please enter  range from 0 to 4294967295' : ''} onKeyDown={(event) => ["e", "E", "+", "-","."].includes(event.key) && event.preventDefault()}/>
                                  <TextField variant="standard" spellCheck={false} autoFocus margin="dense" id="t1aMinCpDl" label="T1a Min Cp Dl(ns)" type="number" style={{ width: '20%', paddingRight: '2%' }} value={dudata ? dudata.t1aMinCpDl : ""} onChange={(event) => { onPreConfiguredDelayTextChange(event) }} InputLabelProps={{ shrink: true, sx: { left: "1rem", right: "1rem", } }} error={errors.t1aMinCpDlError} helperText={errors.t1aMinCpDlError ? 'please enter  range from 0 to 4294967295' : ''} onKeyDown={(event) => ["e", "E", "+", "-","."].includes(event.key) && event.preventDefault()}/>
                                  <TextField variant="standard" spellCheck={false} autoFocus margin="dense" id="t1aMinCpUl" label="T1a Min Cp Ul(ns)" type="number" style={{ width: '20%', paddingRight: '2%' }} value={dudata ? dudata.t1aMinCpUl : ""} onChange={(event) => { onPreConfiguredDelayTextChange(event) }} InputLabelProps={{ shrink: true, sx: { left: "1rem", right: "1rem", } }} error={errors.t1aMinCpUlError} helperText={errors.t1aMinCpUlError ? 'please enter  range from 0 to 4294967295' : ''} onKeyDown={(event) => ["e", "E", "+", "-","."].includes(event.key) && event.preventDefault()}/>
                                  <TextField variant="standard" spellCheck={false} autoFocus margin="dense" id="t1aMinUl" label="T1a Min Ul(ns)" type="number" style={{ width: '20%', paddingRight: '2%' }} value={dudata ? dudata.t1aMinUl : ""} onChange={(event) => { onPreConfiguredDelayTextChange(event) }} InputLabelProps={{ shrink: true, sx: { left: "1rem", right: "1rem", } }} error={errors.t1aMinUlError} helperText={errors.t1aMinUlError ? 'please enter  range from 0 to 4294967295' : ''} onKeyDown={(event) => ["e", "E", "+", "-","."].includes(event.key) && event.preventDefault()}/>
                                  <TextField variant="standard" spellCheck={false} autoFocus margin="dense" id="t1aMaxCpDl" label="T1a Max Cp Dl(ns)" type="number" style={{ width: '20%', paddingRight: '2%' }} value={dudata ? dudata.t1aMaxCpDl : ""} onChange={(event) => { onPreConfiguredDelayTextChange(event) }} InputLabelProps={{ shrink: true, sx: { left: "1rem", right: "1rem", } }} error={errors.t1aMaxCpDlError} helperText={errors.t1aMaxCpDlError ? 'please enter  range from 0 to 4294967295' : ''} onKeyDown={(event) => ["e", "E", "+", "-","."].includes(event.key) && event.preventDefault()}/>
                                  <TextField variant="standard" spellCheck={false} autoFocus margin="dense" id="t1aMaxCpUl" label="T1a Max Cp Ul(ns)" type="number" style={{ width: '20%', paddingRight: '2%' }} value={dudata ? dudata.t1aMaxCpUl : ""} onChange={(event) => { onPreConfiguredDelayTextChange(event) }} InputLabelProps={{ shrink: true, sx: { left: "1rem", right: "1rem", } }} error={errors.t1aMaxCpUlError} helperText={errors.t1aMaxCpUlError ? 'please enter  range from 0 to 4294967295' : ''} onKeyDown={(event) => ["e", "E", "+", "-","."].includes(event.key) && event.preventDefault()}/>
                                  <TextField variant="standard" spellCheck={false} autoFocus margin="dense" id="t1aMaxUp" label="T1a Max Up(ns)" type="number" style={{ width: '20%', paddingRight: '2%' }} value={dudata ? dudata.t1aMaxUp : ""} onChange={(event) => { onPreConfiguredDelayTextChange(event) }} InputLabelProps={{ shrink: true, sx: { left: "1rem", right: "1rem", } }} error={errors.t1aMaxUpError} helperText={errors.t1aMaxUpError ? 'please enter  range from 0 to 4294967295' : ''}onKeyDown={(event) => ["e", "E", "+", "-","."].includes(event.key) && event.preventDefault()} />
                                  <TextField variant="standard" spellCheck={false} autoFocus margin="dense" id="t12Min" label="T12 Min(ns)" type="number" style={{ width: '20%', paddingRight: '2%' }} value={dudata ? dudata.t12Min : ""} onChange={(event) => { onPreConfiguredDelayTextChange(event) }} InputLabelProps={{ shrink: true, sx: { left: "1rem", right: "1rem", } }} error={errors.t12MinError} helperText={errors.t12MinError ? 'please enter  range from 0 to 4294967295' : ''} onKeyDown={(event) => ["e", "E", "+", "-","."].includes(event.key) && event.preventDefault()}/>
                                  <TextField variant="standard" spellCheck={false} autoFocus margin="dense" id="t12Max" label="T12 Max(ns)" type="number" style={{ width: '20%', paddingRight: '2%' }} value={dudata ? dudata.t12Max : ""} onChange={(event) => { onPreConfiguredDelayTextChange(event) }} InputLabelProps={{ shrink: true, sx: { left: "1rem", right: "1rem", } }} error={errors.t12MaxError} helperText={errors.t12MaxError ? 'please enter  range from 0 to 4294967295' : ''} onKeyDown={(event) => ["e", "E", "+", "-","."].includes(event.key) && event.preventDefault()} />
                                  <TextField variant="standard" spellCheck={false} autoFocus margin="dense" id="t34Min" label="T34 Min(ns)" type="number" style={{ width: '20%', paddingRight: '2%' }} value={dudata ? dudata.t34Min : ""} onChange={(event) => { onPreConfiguredDelayTextChange(event) }} InputLabelProps={{ shrink: true, sx: { left: "1rem", right: "1rem", } }} error={errors.t34MinError} helperText={errors.t34MinError ? 'please enter  range from 0 to 4294967295' : ''}onKeyDown={(event) => ["e", "E", "+", "-","."].includes(event.key) && event.preventDefault()} />
                                  <TextField variant="standard" spellCheck={false} autoFocus margin="dense" id="t34Max" label="T34 Max(ns)" type="number" style={{ width: '20%', paddingRight: '2%' }} value={dudata ? dudata.t34Max : ""} onChange={(event) => { onPreConfiguredDelayTextChange(event) }} InputLabelProps={{ shrink: true, sx: { left: "1rem", right: "1rem", } }} error={errors.t34MaxError} helperText={errors.t34MaxError ? 'please enter  range from 0 to 4294967295' : ''} onKeyDown={(event) => ["e", "E", "+", "-","."].includes(event.key) && event.preventDefault()}/>
                                  <TextField variant="standard" spellCheck={false} autoFocus margin="dense" id="t2aMinUp" label="T2a Min Up(ns)" type="number" style={{ width: '20%', paddingRight: '2%' }} value={dudata ? dudata.t2aMinUp : ""} onChange={(event) => { onPreConfiguredDelayTextChange(event) }} InputLabelProps={{ shrink: true, sx: { left: "1rem", right: "1rem", } }} error={errors.t2aMinUpError} helperText={errors.t2aMinUpError ? 'please enter  range from 0 to 4294967295' : ''} onKeyDown={(event) => ["e", "E", "+", "-","."].includes(event.key) && event.preventDefault()}/>
                                  <TextField variant="standard" spellCheck={false} autoFocus margin="dense" id="t2aMaxUp" label="T2a Max Up(ns)" type="number" style={{ width: '20%', paddingRight: '2%' }} value={dudata ? dudata.t2aMaxUp : ""} onChange={(event) => { onPreConfiguredDelayTextChange(event) }} InputLabelProps={{ shrink: true, sx: { left: "1rem", right: "1rem", } }} error={errors.t2aMaxUpError} helperText={errors.t2aMaxUpError ? 'please enter  range from 0 to 4294967295' : ''} onKeyDown={(event) => ["e", "E", "+", "-","."].includes(event.key) && event.preventDefault()}/>
                                  <TextField variant="standard" spellCheck={false} autoFocus margin="dense" id="t2aMinCpDl" label="T2a Min Cp Dl(ns)" type="number" style={{ width: '20%', paddingRight: '2%' }} value={dudata ? dudata.t2aMinCpDl : ""} onChange={(event) => { onPreConfiguredDelayTextChange(event) }} InputLabelProps={{ shrink: true, sx: { left: "1rem", right: "1rem", } }} error={errors.t2aMinCpDlError} helperText={errors.t2aMinCpDlError ? 'please enter  range from 0 to 4294967295' : ''} onKeyDown={(event) => ["e", "E", "+", "-","."].includes(event.key) && event.preventDefault()}/>
                                  <TextField variant="standard" spellCheck={false} autoFocus margin="dense" id="t2aMinCpUl" label="T2a Min Cp Ul(ns)" type="number" style={{ width: '20%', paddingRight: '2%' }} value={dudata ? dudata.t2aMinCpUl : ""} onChange={(event) => { onPreConfiguredDelayTextChange(event) }} InputLabelProps={{ shrink: true, sx: { left: "1rem", right: "1rem", } }} error={errors.t2aMinCpUlError} helperText={errors.t2aMinCpUlError ? 'please enter  range from 0 to 4294967295' : ''} onKeyDown={(event) => ["e", "E", "+", "-","."].includes(event.key) && event.preventDefault()}/>
                                  <TextField variant="standard" spellCheck={false} autoFocus margin="dense" id="t2aMaxCpDl" label="T2a Max Cp Dl(ns)" type="number" style={{ width: '20%', paddingRight: '2%' }} value={dudata ? dudata.t2aMaxCpDl : ""} onChange={(event) => { onPreConfiguredDelayTextChange(event) }} InputLabelProps={{ shrink: true, sx: { left: "1rem", right: "1rem", } }} error={errors.t2aMaxCpDlError} helperText={errors.t2aMaxCpDlError ? 'please enter  range from 0 to 4294967295' : ''} onKeyDown={(event) => ["e", "E", "+", "-","."].includes(event.key) && event.preventDefault()}/>
                                  <TextField variant="standard" spellCheck={false} autoFocus margin="dense" id="t2aMaxCpUl" label="T2a Max Cp Ul(ns)" type="number" style={{ width: '20%', paddingRight: '2%' }} value={dudata ? dudata.t2aMaxCpUl : ""} onChange={(event) => { onPreConfiguredDelayTextChange(event) }} InputLabelProps={{ shrink: true, sx: { left: "1rem", right: "1rem", } }} error={errors.t2aMaxCpUlError} helperText={errors.t2aMaxCpUlError ? 'please enter  range from 0 to 4294967295' : ''} onKeyDown={(event) => ["e", "E", "+", "-","."].includes(event.key) && event.preventDefault()}/>
                                  <TextField variant="standard" spellCheck={false} autoFocus margin="dense" id="ta3Min" label="Ta3 Min(ns)" type="number" style={{ width: '20%', paddingRight: '2%' }} value={dudata ? dudata.ta3Min : ""} onChange={(event) => { onPreConfiguredDelayTextChange(event) }} InputLabelProps={{ shrink: true, sx: { left: "1rem", right: "1rem", } }} error={errors.ta3MinError} helperText={errors.ta3MinError ? 'please enter  range from 0 to 4294967295' : ''} onKeyDown={(event) => ["e", "E", "+", "-","."].includes(event.key) && event.preventDefault()}/>
                                  <TextField variant="standard" spellCheck={false} autoFocus margin="dense" id="ta3Max" label="Ta3 Max(ns)" type="number" style={{ width: '20%', paddingRight: '2%' }} value={dudata ? dudata.ta3Max : ""} onChange={(event) => { onPreConfiguredDelayTextChange(event) }} InputLabelProps={{ shrink: true, sx: { left: "1rem", right: "1rem", } }} error={errors.ta3MaxError} helperText={errors.ta3MaxError ? 'please enter  range from 0 to 4294967295' : ''} onKeyDown={(event) => ["e", "E", "+", "-","."].includes(event.key) && event.preventDefault()}/>
                                </div>
                                <div>
                                  <Button variant="contained" style={{ color: '#ffffff', backgroundColor: '#53659c', width: '150px', marginLeft: '81%', marginBottom: '0px', marginTop: '6px', }} onClick={saveData}>Save</Button>
                                </div>
                              </div>) : currentTreeIndex === 42  ?
                              (
                                <div style={{ width: '99%', border: '1px solid #ccc', borderRadius: '3px', marginLeft: '2%', marginTop: '1%', marginBottom: '1%', padding: '1%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', overflowY: 'auto', overflowX: 'hidden' }}>
                                 <div style={{    marginLeft: '1%', marginTop: '1%', marginBottom: '1%', padding: '0%',  display:'flex' ,flexDirection: 'row',alignItems: 'center', justifyContent: 'left'   }}>
                                 <Typography style={{marginLeft: '1%'}} variant="h6"  >Current DU : {currentDu}</Typography> <Typography fontSize={16} variant="h6"style={{marginLeft: '3%'}} >Current RU : {currentRUI}</Typography> 
                                 <Button variant="contained" disabled={ODUWindowDataList.length >= 3 ? true : false}  style={{color: '#ffffff', backgroundColor: ODUWindowDataList.length >= 3 ? 'grey' : '#53659c', width: '110px', marginLeft: '20%', marginBottom: '0px', marginTop: '1px',padding: '0%' }} onClick={addRUI}>Add New RUI</Button> <Button  disabled={ODUWindowDataList.length === 1 || ODUWindowDataList.length === 0  ? true : false} variant="contained" style={{ color: '#ffffff', backgroundColor: ODUWindowDataList.length === 1 || ODUWindowDataList.length === 0 ? 'grey' : '#53659c', width: '103px', marginLeft: '3%', marginBottom: '0px', marginTop: '0px',padding: '0%' }} onClick={deleteRUI}>Delete RUI</Button> </div>
                                  {/* 14. ODUWindowTable TABLE COMPLETED ... */}
                                  {selectedoduwindowindex != null && ODUWindowDataList.length > 0 ? (<>
                                  <div style={{ border: '1px solid #ccc', borderRadius: '3px', margin: '1%', padding: '1%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                  <div style={{ marginTop: '1%' }}><b>ODU Window</b></div>
                                  <FormControl variant="standard" margin="dense" style={{ width: '21%', paddingRight: '2%' }} >
                                    <InputLabel id="Bandwidth">RUIndexId</InputLabel>
                                    <Select
                                    labelId="RUIndexId"
                                     id="RUIndexId"
                                    label="RUIndexId"
                                    value={ODUWindowDataList[selectedoduwindowindex]?.RUIndexId} // Use selectedResourceType instead of cuupdata.resourceType
                                    onChange={handleRUIndexIdChange} MenuProps={{ PaperProps: { style: { maxHeight: 200 } } }}>
                                   {ruindexoptions?.map(option => (
                                  <MenuItem key={option.RUIndex} value={option.RUIndex}>{option.RUIndex}</MenuItem>
                                  ))}
                                  </Select>
                                 </FormControl>
                                  <TextField variant="standard" spellCheck={false} autoFocus margin="dense" id="RUInstanceId" label="RUInstanceId" type="text" style={{ width: '20%', paddingRight: '2%' }} value={ODUWindowDataList[selectedoduwindowindex]?.RUInstanceId? ODUWindowDataList[selectedoduwindowindex]?.RUInstanceId : ""} onChange={(event) => { onODUWindowTextChange(event) }} InputLabelProps={{ shrink: true, sx: { left: "1rem", right: "1rem", } }}   disabled/>
                                  {/* <TextField variant="standard" spellCheck={false} autoFocus margin="dense" id="Bandwidth" label="Bandwidth" type="number" style={{ width: '20%', paddingRight: '2%' }} value={dudata?.ODUWindowDataList[selectedoduwindowindex].Bandwidth ? dudata?.ODUWindowDataList[selectedoduwindowindex].Bandwidth : ""} onChange={(event) => { onODUWindowTextChange(event) }} InputLabelProps={{ shrink: true, sx: { left: "1rem", right: "1rem", } }} error={errors.BandwidthError}  helperText={errors.BandwidthError ? 'please enter  range from 0 to 65535 ' : ''} onKeyDown={(event) => ["e", "E", "+", "-"].includes(event.key) && event.preventDefault()}/> */}
                                  <FormControl variant="standard" margin="dense" style={{ width: '21%', paddingRight: '2%' }} >
                                    <InputLabel id="Bandwidth">Bandwidth(KHz)</InputLabel>
                                    <Select
                                    labelId="Bandwidth"
                                     id="Bandwidth"
                                    label="Bandwidth"
                                    value={ODUWindowDataList[selectedoduwindowindex]?.Bandwidth} // Use selectedResourceType instead of cuupdata.resourceType
                                    onChange={handleODUBandwidthDownChange} MenuProps={{ PaperProps: { style: { maxHeight: 200 } } }}>
                                   {BandwidthOptions?.map(option => (
                                  <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                                  ))}
                                  </Select>
                                 </FormControl>

                                  {/* <TextField variant="standard" spellCheck={false} autoFocus margin="dense" id="Subcarrierspacing" label="Subcarrierspacing" type="text" style={{ width: '20%', paddingRight: '2%' }} value={selecteODUWindowRow ? selecteODUWindowRow.userLabel : ""} onChange={(event) => { onODUWindowTextChange(event) }} InputLabelProps={{ shrink: true, sx: { left: "1rem", right: "1rem", } }} /> */}
                                  <FormControl variant="standard" margin="dense" style={{ width: '21%', paddingRight: '2%' }} >
                                    <InputLabel id="Subcarrierspacing">Subcarrierspacing</InputLabel>
                                    <Select
                                    labelId="Subcarrierspacing"
                                     id="Subcarrierspacing"
                            label="Subcarrierspacing"
                            value={ODUWindowDataList[selectedoduwindowindex]?.Subcarrierspacing} // Use selectedResourceType instead of cuupdata.resourceType
                            onChange={handleODUsubCarrierSpacingDownChange} MenuProps={{ PaperProps: { style: { maxHeight: 200 } } }}>
                            {subCarrierSpacingOptions?.map(option => (
                              <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                                 <TextField variant="standard" spellCheck={false} autoFocus margin="dense" id="DUmacAddress" label="DUmacAddress" type="text" style={{ width: '20%', paddingRight: '2%' }} value={ODUWindowDataList[selectedoduwindowindex]?.DUmacAddress? ODUWindowDataList[selectedoduwindowindex]?.DUmacAddress : ""} onChange={(event) => { onODUWindowTextChange(event) }} InputLabelProps={{ shrink: true, sx: { left: "1rem", right: "1rem", } }} error={oduwindowerrorindex[ODUWindowDataList[selectedoduwindowindex]?.id].macError} helperText={oduwindowerrorindex[ODUWindowDataList[selectedoduwindowindex]?.id].macError ? 'Invalid MAC address format' : ''}  />
                                 <TextField variant="standard" spellCheck={false} autoFocus margin="dense" id="RUcpmacAddress" label="RUcpmacAddress" type="text" style={{ width: '20%', paddingRight: '2%' }} value={ODUWindowDataList[selectedoduwindowindex]?.RUcpmacAddress ? ODUWindowDataList[selectedoduwindowindex]?.RUcpmacAddress : ""} onChange={(event) => { onODUWindowTextChange(event) }} InputLabelProps={{ shrink: true, sx: { left: "1rem", right: "1rem", } }} error={oduwindowerrorindex[ODUWindowDataList[selectedoduwindowindex]?.id].RUcpmacError}  helperText={oduwindowerrorindex[ODUWindowDataList[selectedoduwindowindex]?.id].RUcpmacError ? 'Invalid MAC address format' : ''}  />
                                 <TextField variant="standard" spellCheck={false} autoFocus margin="dense" id="RUupmacAddress" label="RUupmacAddress" type="text" style={{ width: '20%', paddingRight: '2%' }} value={ODUWindowDataList[selectedoduwindowindex]?.RUupmacAddress ? ODUWindowDataList[selectedoduwindowindex]?.RUupmacAddress : ""} onChange={(event) => { onODUWindowTextChange(event) }} InputLabelProps={{ shrink: true, sx: { left: "1rem", right: "1rem", } }} error={oduwindowerrorindex[ODUWindowDataList[selectedoduwindowindex]?.id].RUupmacError} helperText={oduwindowerrorindex[ODUWindowDataList[selectedoduwindowindex]?.id].RUupmacError ? 'Invalid MAC address format' : ''}  />
                                 <TextField variant="standard" spellCheck={false} autoFocus margin="dense" id="CpvlanId" label="CpvlanId" type="number" style={{ width: '20%', paddingRight: '2%' }} value={ODUWindowDataList[selectedoduwindowindex]?.CpvlanId ?ODUWindowDataList[selectedoduwindowindex]?.CpvlanId : ""} onChange={(event) => { onODUWindowTextChange(event) }} InputLabelProps={{ shrink: true, sx: { left: "1rem", right: "1rem", } }} error={oduwindowerrorindex[ODUWindowDataList[selectedoduwindowindex]?.id].CpvlanIdError} helperText={oduwindowerrorindex[ODUWindowDataList[selectedoduwindowindex]?.id].CpvlanIdError ? 'please enter  range from 1 to 4094'  : ''} onKeyDown={(event) => ["e", "E", "+", "-","."].includes(event.key) && event.preventDefault()}/>
                                 <TextField variant="standard" spellCheck={false} autoFocus margin="dense" id="UpvalnId" label="UpvalnId" type="number" style={{ width: '20%', paddingRight: '2%' }} value={ODUWindowDataList[selectedoduwindowindex]?.UpvalnId ? ODUWindowDataList[selectedoduwindowindex]?.UpvalnId : ""} onChange={(event) => { onODUWindowTextChange(event) }} InputLabelProps={{ shrink: true, sx: { left: "1rem", right: "1rem", } }} error={oduwindowerrorindex[ODUWindowDataList[selectedoduwindowindex]?.id].UpvalnIdError} helperText={oduwindowerrorindex[ODUWindowDataList[selectedoduwindowindex]?.id].UpvalnIdError ? 'please enter  range from 1 to 4094'  : ''} onKeyDown={(event) => ["e", "E", "+", "-","."].includes(event.key) && event.preventDefault()}/>
                                 <TextField variant="standard" spellCheck={false} autoFocus margin="dense" id="CompMethod" label="CompMethod" type="number" style={{ width: '20%', paddingRight: '2%' }} value={ODUWindowDataList[selectedoduwindowindex]?.CompMethod ? ODUWindowDataList[selectedoduwindowindex]?.CompMethod : ""} onChange={(event) => { onODUWindowTextChange(event) }} InputLabelProps={{ shrink: true, sx: { left: "1rem", right: "1rem", } }}  error={oduwindowerrorindex[ODUWindowDataList[selectedoduwindowindex]?.id].CompMethodError} helperText={oduwindowerrorindex[ODUWindowDataList[selectedoduwindowindex]?.id].CompMethodError ? 'please enter  range from 0 to 65535' : ''} onKeyDown={(event) => ["e", "E", "+", "-","."].includes(event.key) && event.preventDefault()} />
                                  </div>
                                  <div style={{ width: '100%', height: '230px' }}>
                                    <Table style={{ minWidth: "100%", height: '180px', borderCollapse: 'collapse', tableLayout: 'fixed' }}>
                                      <TableCell style={{ width: "100%", height: "20px", overflowY: "visible", overflowX: "visible" }}>
                                        <Paper style={{ width: "99.5%", border: '2px solid #ccc', marginTop: '2px' }}>
                                          <div style={{ color: 'black', backgroundColor: '#c6cbd1', height: '20px' }} ><b>Prb Element Dl List</b></div>
                                          <IconButton aria-label="add-element" style={{ marginLeft: '90%', height: '30px' }}>
                                            <AddIcon onClick={() => addNewRecord("PrbDlTable", "PrbDlTable")} />
                                          </IconButton>
                                          <div style={{ maxHeight: "150px", overflowY: "auto" }}>
                                            <Table style={{ minWidth: "99.5%", }} aria-label="PrbDlTable">
                                              <TableHead sx={{ "& th": { color: '#ffffff', backgroundColor: '#53659c', lineHeight: '1.1', position: "sticky", top: "0" ,zIndex: '1'} }}>
                                                <TableRow sx={{ "& .MuiTableRow-root": { maxHeight: 20 } }}>
                                                  <TableCell align="center" style={{ width: 115 }}>Elem Index </TableCell>
                                                  <TableCell align="center" style={{ width: 115 }}>Rb Start </TableCell>
                                                  <TableCell align="center" style={{ width: 115 }}>Rb Size</TableCell>
                                                  <TableCell align="center" style={{ width: 115 }}>Start Symbol</TableCell>
                                                  <TableCell align="center" style={{ width: 115 }}>Numof Symbol</TableCell>
                                                  <TableCell align="center" style={{ width: 115 }}>Beam Index </TableCell>
                                                  <TableCell align="center" style={{ width: 115 }}>Bfweight Update </TableCell>
                                                  <TableCell align="center" style={{ width: 115 }}>Comp Method</TableCell>
                                                  <TableCell align="center" style={{ width: 115 }}>Iq Width</TableCell>
                                                  <TableCell align="center" style={{ width: 115 }}>Beam Forming</TableCell>
                                                  <TableCell align="center" style={{ width: 115 }}>Scale Factor</TableCell>
                                                  <TableCell align="center" style={{ width: 115 }}>Remask</TableCell>
                                                  <TableCell align="center" >Actions</TableCell>
                                                </TableRow>
                                              </TableHead>
                                              <TableBody style={{ zIndex: '0' }}>
                                                {ODUWindowDataList[selectedoduwindowindex] && ODUWindowDataList[selectedoduwindowindex]["PrbDlInfolist"]?.map((row:any) => (
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
                                                    <TableCell style={{ width: 105, height: '40px', display: 'flex', flexDirection: 'row' }}>
                                                        <IconButton aria-label="edit" onClick={() => handleEditOpen("PrbDlTable", "PrbDlTable", row)} >
                                                          <EditIcon />
                                                        </IconButton>
                                                        <IconButton aria-label="delete" onClick={() => onDeleteRow("PrbDlTable", row.id)} >
                                                          <DeleteIcon />
                                                        </IconButton>
                                                    </TableCell>
                                                  </TableRow>
                                                ))}
                                              </TableBody>
                                            </Table>
                                          </div>
                                        </Paper>
                                      </TableCell>
                                    </Table>
                                  </div>

                                  <div style={{ width: '100%', height: '240px' }}>
                                    <Table style={{ minWidth: "100%", height: '180px', borderCollapse: 'collapse', tableLayout: 'fixed' }}>
                                      <TableCell style={{ width: "70%", height: "10%", overflowY: "visible" }}>
                                        <Paper style={{ width: "99.5%", border: '2px solid #ccc', marginTop: '2px' }}>
                                          <div style={{ color: 'black', backgroundColor: '#c6cbd1', height: '20px' }} ><b>Prb Element Ul List</b></div>
                                          <IconButton aria-label="add-element" style={{ marginLeft: '90%', height: '30px' }}>
                                            <AddIcon onClick={() => addNewRecord("PrbUlTable", "PrbUlTable")} />
                                          </IconButton>
                                          <div style={{ maxHeight: "150px", overflowY: "auto" }}>
                                            <Table style={{ minWidth: "99.5%", }} aria-label="PrbUlTable">
                                              <TableHead sx={{ "& th": { color: '#ffffff', backgroundColor: '#53659c', lineHeight: '1.1', position: "sticky", top: "0",zIndex: '1' } }}>
                                                <TableRow sx={{ "& .MuiTableRow-root": { maxHeight: 20 } }}>
                                                  <TableCell align="center" style={{ width: 115 }}>Elem Index</TableCell>
                                                  <TableCell align="center" style={{ width: 115 }}>Rb Start </TableCell>
                                                  <TableCell align="center" style={{ width: 115 }}>Rb Size</TableCell>
                                                  <TableCell align="center" style={{ width: 115 }}>Start Symbol</TableCell>
                                                  <TableCell align="center" style={{ width: 115 }}>Numberof Symbol</TableCell>
                                                  <TableCell align="center" style={{ width: 115 }}>Beam Index </TableCell>
                                                  <TableCell align="center" style={{ width: 115 }}>Bfweight Update</TableCell>
                                                  <TableCell align="center" style={{ width: 115 }}>Comp Method</TableCell>
                                                  <TableCell align="center" style={{ width: 115 }}>Iq Width</TableCell>
                                                  <TableCell align="center" style={{ width: 115 }}>Beam Forming </TableCell>
                                                  <TableCell align="center" style={{ width: 115 }}>Scale Factor</TableCell>
                                                  <TableCell align="center" style={{ width: 115 }}>Remask</TableCell>
                                                  <TableCell align="center" >Actions</TableCell>
                                                </TableRow>
                                              </TableHead>
                                              <TableBody style={{ zIndex: '0' }}>
                                                {ODUWindowDataList[selectedoduwindowindex] && ODUWindowDataList[selectedoduwindowindex]["PrbUlInfolist"]?.map((row:any) => (
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
                                                    <TableCell style={{ width: 105, height: '40px', display: 'flex', flexDirection: 'row' }}>
                                                        <IconButton aria-label="edit" onClick={() => handleEditOpen("PrbUlTable", "PrbUlTable", row)} >
                                                          <EditIcon />
                                                        </IconButton>
                                                        <IconButton aria-label="delete" onClick={() => onDeleteRow("PrbUlTable", row.id)} >
                                                          <DeleteIcon />
                                                        </IconButton>
                                                    </TableCell>
                                                  </TableRow>
                                                ))}
                                              </TableBody>
                                            </Table>
                                          </div>
                                        </Paper>
                                      </TableCell>
                                    </Table>
                                  </div> </>) : null
                                  }
                                  <Button variant="contained" style={{ color: '#ffffff', backgroundColor: '#53659c', width: '150px', marginLeft: '80%', marginBottom: '0px', marginTop: '2px', }} onClick={saveData}>Save</Button>
                                </div>) :
                              null
      }
    </div>
  )
}



