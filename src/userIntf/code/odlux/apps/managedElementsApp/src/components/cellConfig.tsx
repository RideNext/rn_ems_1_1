
/**
 * ============LICENSE_START========================================================================
 * ONAP : ccsdk feature sdnr wt odlux
 *
 * =================================================================================================
 * Copyright (C) 2024 RideNext Software Solutions. Pvt Ltd.  All rights reserved
 * =================================================================================================
 */
import { useMemo, useRef, useState } from "react";
//import React from 'react';
import { useLocation } from "react-router-dom";
import axios from "axios";
import React, { useEffect } from "react";
import { AppBar, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, Input, Menu, Paper, Stack, Tab, Table, TableBody, TableCell, TableHead, TableRow, Tabs, TextField, Typography, colors, createStyles, listItemSecondaryActionClasses } from '@mui/material';
import { TreeItem, TreeView } from "@mui/lab";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import IconButton from '@mui/material/IconButton';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import HelpOutlineRoundedIcon from '@mui/icons-material/HelpOutlineRounded';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { makeStyles } from '@mui/styles';
import { ThemeProvider } from '@mui/material';
import { WarningOutlined } from "@mui/icons-material";
import { any, number } from "prop-types";
import { BorderColor, FormatColorFill } from "@mui/icons-material";


let nodeId = location.pathname.split("/")[2];

const useStyles = makeStyles({
  enabledButton: {
    background: 'white!important',
    borderColor :'#53659c',
    '&:disabled': {
      background: '#cfcfcf!important',
      borderColor: '#cfcfcf!important',
    },
    button: {
      /* Common button styles */
      padding: '10px 20px',
      border: 'none',
      cursor: 'pointer'
    },

  },
  navButton1: {
    height: '30px', width: '86px',
     borderRadius: '5%',
     margin: '5px 8px',
      alignItems: 'center',
       justifyContent: 'center',
        padding: '0px',
        minWidth: 'initial',
        textAlign:'center',
    backgroundColor: '#c6cbd1',
    '&:hover': {
      backgroundColor: '#b0bec5',
    },
  },
  activenavButton1: {
    backgroundColor: 'green',

  },
  inactivenavButton1: {
    backgroundColor: 'red',

  },
  undefinednavButton1: {
    backgroundColor: 'grey',

  },
});


export const CellConfig = () => {


  const location = useLocation();
  const classes = useStyles();
  let nodeId = location.pathname.split('/')[2]
  useEffect( () => {
    nodeId = location.pathname.split('/')[2];
    fetchBasicConfigData(nodeId);
   fetchCellConfigData(nodeId);
    fetchCellStatusData(nodeId,cellConfigdata);
    document?.getElementById('_omDiv')?.scrollTo(0,0);

  }, []);
  useEffect(()=>{
    setRRHList(RRHList)
 },[]);

  const [buttonCount, setButtonCount] = useState(0);
  let [cellConfigdata, setcellConfigdata] = React.useState<any[]>([]);
  let [cellStatusdata, setcellStatusdata] = React.useState<any[]>([]);
  const [SaveSucesopen, setSaveSucesopen] = React.useState(false);
  const [DeleteConfirmopen, setDeleteConfirmopen] = React.useState(false);
  const [currentTreeIndex, setCurrentTreeIndex] = useState(1);
  const [currentCell, setcurrentCell] = useState<string>("cell1");
  const [Sucessmsg, setSucessmsg] = React.useState("");
  const [dialogTitle, setdialogTitle] = React.useState("");
  const [savedialogTitle, setsavedialogTitle] = React.useState("");
  const [deletedialogTitle, setdeletedialogTitle] = React.useState("");
  const [value, setValue] = useState<number>();
  const [error, setError] = useState('');
  const [errorindex, setErrorIndex] = React.useState<{ [key: string]: 
    { rsrpOffsetSSB: string, sinrOffsetSSB: string,ssbDuration:string,ssbFrequency:string, cellReselectionPriority:string,ssbPeriodicity:string,
      sinrOffsetCsiRs:string, rsrpOffsetCsiRs:string, rsrqOffsetSSB:string, arfcnSUL:string, pMax:string, qQualMin:string,ssbSubCarrierSpacing:string,
      qRxLevMin :string, threshXHighP:string, threshXHighQ: string, threshXLowP:string, tReselectionNR: string, threshXLowQ:string,
      tReselectionNRSfHigh:string, tReselectionNRSfMedium:string, CellReselectionSubPriority: string, PriorityLabel: string,
      ArfcnDL:string, ArfcnUL: string, cpriRate:string, BsChannelBwUL: string, BsChannelBwDL:string, qOffsetFrequency:string,
      DlEarfcn:string, UlEarfcn:string, FrequencyBand:string, TxDelay: string, RxDelay:string, BandWidth:string, TestTime: string,
      AntennaId:string, AntennaGain : string, Mode:string,TxPower:string, nRFrequencyref: string, ssbOffset:string,rsrqOffsetCsiRs:string

    } }>({
    "cell1": {rsrpOffsetSSB: "", sinrOffsetSSB: "",ssbDuration:"",ssbFrequency:"", cellReselectionPriority:"",ssbPeriodicity:"",
      sinrOffsetCsiRs:"", rsrpOffsetCsiRs:"", rsrqOffsetSSB:"", arfcnSUL:"", pMax:"", qQualMin:"",ssbSubCarrierSpacing:"",
      qRxLevMin :"", threshXHighP:"", threshXHighQ: "", threshXLowP:"", tReselectionNR: "", threshXLowQ:"",
      tReselectionNRSfHigh:"", tReselectionNRSfMedium:"", CellReselectionSubPriority: "", PriorityLabel: "",
      ArfcnDL:"", ArfcnUL: "", cpriRate:"", BsChannelBwUL: "", BsChannelBwDL:"", qOffsetFrequency:"",
      DlEarfcn:"", UlEarfcn:"", FrequencyBand:"", TxDelay: "", RxDelay:"", BandWidth:"", TestTime: "",
      AntennaId:"", AntennaGain : "", Mode:"",TxPower:"", nRFrequencyref: "", ssbOffset:"", rsrqOffsetCsiRs:"" },
   });

   const [rrherrorindex, setRrhErrorIndex] = React.useState<{ [key: string]: 
    {  [key:number]:{cpriRate:string,DlEarfcn:string, UlEarfcn:string, FrequencyBand:string, TxDelay: string, RxDelay:string, TestTime: string,
      AntennaId:string, AntennaGain : string, Mode:string,TxPower:string, nRFrequencyref: string,BandWidth:string,}

    } }>({
    "cell1":{ 1:{ cpriRate:"", DlEarfcn:"", UlEarfcn:"", FrequencyBand:"", TxDelay: "", RxDelay:"",  TestTime: "",
      AntennaId:"", AntennaGain : "", Mode:"",TxPower:"", nRFrequencyref: "",BandWidth:"" }
    }
   });

  const [celldata, setcelldata] = useState<any>();
  const [selectedPeeParameters, setSelectedPeeParameters] = useState("");
  const [peeParametersOptions, setpeeParametersOptions] = React.useState<any[]>([]);
 // const [selectedssbPeriodicity, setSelectedssbPeriodicity] = useState("");
  //const [selectedssbSubCarrierSpacing, setSelectedssbSubCarrierSpacing] = useState("");
  // const [selectedtReselectionNRSfHigh, setSelectedtReselectionNRSfHigh] = useState("");
  // const [selectedtReselectionNRSfMedium, setSelectedtReselectionNRSfMedium] = useState("");
  //const [selectedCellReselectionSubPriority, setSelectedCellReselectionSubPriority] = useState("");
  const [selectedRet, setSelectedRet] = useState("");
  const [selectedLoopBack, setSelectedLoopBack] = useState("");
  const [selectedRetEnabled, setselectedRetEnabled] = useState("");
  const [selectedRRHDate, setSelectedRRHDate] = useState("");
  const [selectedRRHModel,setSelectedRRHModel] = useState("");
  const [selectedMIMOMode,setSelectedMIMOMode] = useState("");
  //const [selectedBandwidth,setSelectedBandwidth] = useState("");
  const [selectedDuplexMode,setSelectedDuplexMode] = useState("");
  const [selectedAntennaType,setSelectedAntennaType] = useState("");
  const [selectedRRHindex,setselectedRRHindex]=React.useState<any>(-1);
  let [RRHList, setRRHList] = React.useState<any[]>([]);
  const [currentRRH, setcurrentRRH] = useState(1);
  const [isFormValid, setIsFormValid] = useState(true);



  // const [ssbPeriodicityOptions, setssbPeriodicityOptions] = useState([
  //   { label: '5', value: '5' },
  //   { label: '10', value: '10' },
  //   { label: '20', value: '20' },
  //   { label: '40', value: '40' },
  //   { label: '80', value: '80' },
  //   { label: '160', value: '160' }
  // ]);
  // const [tReselectionNRSfHighOptions, settReselectionNRSfHighOptions] = useState([
  //   { label: '25', value: '25' },
  //   { label: '50', value: '50' },
  //   { label: '75', value: '75' },
  //   { label: '100', value: '100' },
  // ]);
  // const [tReselectionNRSfMediumOptions, settReselectionNRSfMediumOptions] = useState([
  //   { label: '25', value: '25' },
  //   { label: '50', value: '50' },
  //   { label: '75', value: '75' },
  //   { label: '100', value: '100' },
  // ]);
  // const [ssbSubCarrierSpacingOptions, setssbSubCarrierSpacingOptions] = useState([
  //   { label: '15', value: '15' },
  //   { label: '30', value: '30' },
  //   { label: '120', value: '120' },
  //   { label: '240', value: '240' },
  // ]);
  // const [CellReselectionSubPriorityOptions, setCellReselectionSubPriorityOptions] = useState([
  //   { label: '2', value: '2' },
  //   { label: '4', value: '4' },
  //   { label: '6', value: '6' },
  //   { label: '8', value: '8' },
  // ]);
  const [loopBackOptions, setloopBackOptionss] = useState([
    { label: 'True', value: 'true' },
    { label: 'False', value: 'false' },
  ]);
  const [retOptions, setretOptions] = useState([
    { label: 'True', value: 'true' },
    { label: 'False', value: 'false' },
  ]);
  const [RRHModelOptions] = useState([
    { label: 'TRB05002240', value: 'TRB05002240' },
    { label: 'TRB01004405', value: 'TRB01004405' },
    { label: 'TR42004410', value: 'TRB42004410' },
    { label: 'TRU-2320B', value: 'TRU-2320B' },
    { label: 'TRB08002240', value: 'TRB08002240' },
    { label: 'TRB08004440', value: 'TRB08004440' },
    { label: 'TRB01002240', value: 'TRB01002240' },
    { label: 'TRB03002240', value: 'TRB03002240' },
    { label: 'TRB39002240', value: 'TRB39002240' },
    { label: 'TRB39004440', value: 'TRB39004440' },
    { label: 'TRB40004440', value: 'TRB39004440' },
    { label: 'TRB42002240', value: 'TRB42002240' },
    { label: 'TRB28002240', value: 'TRB28002240' },
    { label: 'TRB28004440', value: 'TRB28004440' },
  ]);
  const [AntennaTypeOptions] = useState([
    { label: '2 Port', value: '2' },
    { label: '4 Port', value: '4' },
  ]);
  const [MIMOModeOptions] = useState([
    { label: '0', value: '0' },
    { label: '1', value: '1' },
  ]);
  const [DuplexModeOptions] = useState([
    { label: '1', value: '1' },
    { label: '2', value: '2' },
  ]);
  // const [BandwidthOptions] = useState([
  //   { label: '10', value: '10' },{ label: '15', value: '15' },
  //   { label: '20', value: '20' },{ label: '25', value: '25' },
  //   { label: '30', value: '30' },{ label: '40', value: '40' },
  //   { label: '50', value: '50' },{ label: '60', value: '60' },
  //   { label: '70', value: '70' },{ label: '80', value: '80' },
  //   { label: '90', value: '90' },{ label: '100', value: '100' },
  //   { label: '200', value: '200' },{ label: '400', value: '400' }
  // ]);


  useEffect(() => {
    setSelectedPeeParameters(celldata?.peeParameters || "");
    //setSelectedssbPeriodicity(celldata?.ssbPeriodicity || "");
    //setSelectedssbSubCarrierSpacing(celldata?.ssbSubCarrierSpacing || "");
    // setSelectedtReselectionNRSfHigh(celldata?.tReselectionNRSfHigh|| "");
    // setSelectedtReselectionNRSfMedium(celldata?.tReselectionNRSfMedium || "");
    // setSelectedRRHModel(celldata?.RRHModel || "");
    // setSelectedAntennaType(celldata?.antennaType || "");
    // setSelectedMIMOMode1(celldata?.mimoMode || "");
   // setSelectedCellReselectionSubPriority(celldata?.CellReselectionSubPriority || "");
    document?.getElementById('_omDiv')?.scrollTo(0,0);
  }, [celldata])
  useEffect(() => {
    console.log(rrherrorindex)
  }, [rrherrorindex])


  const fetchCellConfigData = (nodeId: any) => {
    const baseUri = `${window.location.origin}`;
    const DbPath = baseUri + "/cell_config/_doc/" + nodeId;
    axios.get(DbPath).then((res: any) => {
     var  cellConfigdata = res.data._source.cellConfigdata;
     console.log("cellConfigdata",cellConfigdata);
     const errorlist={}
     cellConfigdata?.map((celldata:any,index:number)=>{
      errorlist[celldata.cellId]={rsrpOffsetSSB: "", sinrOffsetSSB: "",ssbDuration:"",ssbFrequency:"", cellReselectionPriority:"",
        sinrOffsetCsiRs:"", rsrpOffsetCsiRs:"", rsrqOffsetSSB:"", arfcnSUL:"", pMax:"", qQualMin:"",ssbPeriodicity:"",ssbSubCarrierSpacing:"",
        qRxLevMin :"", threshXHighP:"", threshXHighQ: "", threshXLowP:"", tReselectionNR: "", threshXLowQ:"",
        tReselectionNRSfHigh:"", tReselectionNRSfMedium:"", CellReselectionSubPriority: "", PriorityLabel: "",
        ArfcnDL:"", ArfcnUL: "", cpriRate:"", BsChannelBwUL: "", BsChannelBwDL:"", qOffsetFrequency:"",
        DlEarfcn:"", UlEarfcn:"", FrequencyBand:"", TxDelay: "", RxDelay:"", BandWidth:"", TestTime: "",
        AntennaId:"", AntennaGain : "", Mode:"",TxPower:"", nRFrequencyref: "",ssbOffset: "", rsrqOffsetCsiRs:"" }
    })
    setErrorIndex(errorlist)
    console.log(errorlist)
     
      setcellConfigdata(cellConfigdata);
      let seletedCellData = cellConfigdata.find(function (celldata: any) {
        return celldata.cellId === currentCell;
      });
      setcelldata(seletedCellData);
      if(seletedCellData.RRHList)
      {setRRHList(seletedCellData.RRHList)
        const rrh={}
       
        cellConfigdata.map((cell:any)=>{
          const rrhlist={}
          cell.RRHList.map((rrh:any,index:number)=>{
             rrhlist[rrh.id]= { cpriRate:"", DlEarfcn:"", UlEarfcn:"", FrequencyBand:"", TxDelay: "", RxDelay:"",  TestTime: "",
               AntennaId:"", AntennaGain : "", Mode:"",TxPower:"", nRFrequencyref: "",BandWidth:"" }
            
         })
         rrh[cell.cellId]=rrhlist
         
        })
        console.log("rrh",rrh)
        setRrhErrorIndex(rrh)
      }
      // handCellClick(currentCell)

    }).catch((err: { response: { data: { error: { type: string; }; }; }; message: any; }) => {
      console.log(err);
      if (err.response.data.error.type && err.response.data.error.type == 'index_not_found_exception') {
        var uri4 = (baseUri) + '/cell_config/';
        axios.put(uri4)
          .then((res: any) => {
            console.log(res);
          }).catch((err: any) => {
            console.log(err);
          })
      }
    })
  }
  const fetchCellStatusData = (nodeId: any,cellconfigdata:any) => {
    const baseUri = `${window.location.origin}`;
    const DbPath = baseUri + "/cell_status/_doc/" + nodeId;
    axios.get(DbPath).then((res: any) => {
     var  dbresCellStatusdata = res.data._source.cellStatusdata;
     var resCellStatusdata:any[]=[];
     console.log("cellconfigdata", cellconfigdata);
     cellconfigdata?.map((data:any)=>{
      let dbCellStatuscheck = dbresCellStatusdata.find(function (celldata: any) {
        return celldata.cellId === data.cellId;
      })
      if(dbCellStatuscheck?.cellId){
        resCellStatusdata.push({...dbCellStatuscheck})
      }
      else{
        resCellStatusdata.push({cellId:data.cellId, cellstatus : "maintenance"})
      }
     })
     console.log("resCellStatusdata",resCellStatusdata);
     setcellStatusdata(resCellStatusdata)
     let seletedCellstatusdata = resCellStatusdata.find(function (celldata: any) {
      return celldata.cellId === currentCell;
    })
    if(!seletedCellstatusdata){
      const newCellStatusData = resCellStatusdata?.map((cellStatus :any) => {
        return cellStatus;
      })
      // let cellstatusid={cellId: currentCell,cellstatus:'unknown'};
      // newCellStatusData.push(cellstatusid);
     
      newCellStatusData.sort((a:any,b:any) => {
        if (""+a["cellId"]<(""+b["cellId"])) return -1;
        if (""+a["cellId"]>(""+b["cellId"])) return 1;
        return 0;
    });
    cellStatusdata=newCellStatusData;
    setcellStatusdata(newCellStatusData);
      // const DbPath1 = baseUri+"/cell_status/_doc/" + nodeId;
      // axios.post(DbPath1,
      //   {
      //     cellStatusdata
      // }).then(function (resp: any) {
      //   const result = resp;
      // }, function (err: { message: any; }) {
      //   const result = err.message;
      //   console.log(err.message);
      // })
     }
    
    }).catch((err: { response: { data: { error: { type: string; }; }; }; message: any; }) => {
      console.log(err);
      if (err.response.data.error.type && err.response.data.error.type == 'index_not_found_exception') {
        var uri4 = (baseUri) + '/cell_status/';
        axios.put(uri4)
          .then((res: any) => {
            console.log(res);
          }).catch((err: any) => {
            console.log(err);
          })
      }
    })
  }

  useEffect(() => {
    fetchCellStatusData(nodeId,cellConfigdata);
    console.log("fetchCellStatusData called when rendering the cell config page",cellConfigdata);
    const intervalId = setInterval(() => {
      fetchCellStatusData(nodeId,cellConfigdata);
     
      console.log("fetchCellStatusData called after 3 seconds",cellConfigdata);
      
    }, 3000); // 3000ms = 3 seconds

    return () => clearInterval(intervalId); 
  },[cellConfigdata]);

  const fetchBasicConfigData = (nodeId: any) => {
    // nodeId = "node2";
     const baseUri = `${window.location.origin}`;
     const DbPath = baseUri + "/basic_config/_doc/" + nodeId;
     const newPeeParameters: any[] = []
     axios.get(DbPath).then((res: any) => {
       var PeerParameterList = res.data._source.basicdata.PeerParameterList;
       PeerParameterList?.map((row: any) => {
         return newPeeParameters.push(addPeeParametersList(row.siteIdentification, row.siteIdentification));
       });
       setpeeParametersOptions(newPeeParameters);
     })
       .catch((err: any) => {
         console.log(err);
       })
   }

   const addPeeParametersList = (label: string, value: string) => ({
    label,
    value,
  });

  let handleTreeItemClick = (itenId: string,cellid:string ) => {
    document?.getElementById('_omDiv')?.scrollTo(0,0);
    setcurrentCell(cellid);
    let seletedCellData = cellConfigdata?.find(function (celldata: any) {
      return celldata?.cellId === cellid;
    });
    setcelldata(seletedCellData);
    if(itenId==="4"){
      setRRHList(seletedCellData.RRHList);
      setselectedRRHindex(0)
      setcurrentRRH(seletedCellData?.RRHList[0]?.id)
      if(seletedCellData?.RRHList && seletedCellData?.RRHList.length > 0 )
        {
      setSelectedLoopBack(seletedCellData?.RRHList[0]?.isLoopBackEnabled);
      setselectedRetEnabled(seletedCellData?.RRHList[0]?.isRetEnabled);
      setSelectedRRHDate(seletedCellData?.RRHList[0]?.setRRHDate);
      setSelectedMIMOMode(seletedCellData?.RRHList[0]?.mimoMode);
      setSelectedAntennaType(seletedCellData?.RRHList[0]?.antennaType);
      setSelectedDuplexMode(seletedCellData?.RRHList[0]?.duplexMode);
      //setSelectedBandwidth(seletedCellData?.RRHList[0]?.bandWidth);
        }
    }
    //alert(itenId);
    if (itenId) {
      //alert(parseInt(itenId));
      setCurrentTreeIndex(parseInt(itenId))
    } else {
      setCurrentTreeIndex(0)
    }
  }


  let handCellClick = (currentcell: string) => {
    setCurrentTreeIndex(1);
      setcurrentCell(currentcell)
      let seletedCellData = cellConfigdata?.find(function (celldata: any) {
        return celldata?.cellId === currentcell;
      });
      setcelldata(seletedCellData);
  }

  const handleError = (name: any, value: any) => {
    setErrorIndex(prevState => ({
      ...prevState,  // Spread the previous state
      [currentCell]: {  // Spread the existing values for the specific index
        ...prevState[currentCell],  // Preserve the other fields at this index
        [name]:value // Update only this specific field
      }
    }));
  };

  const onCellTextChange = (e: any) => {
    let value = e.target.value;
    let text = e.target.value;
    const regex = /^[0-9]*$/;
    const newValue = e.target.value;
    const newText = e.target.value;
    const numericValue = newValue.replace(/\D/g, '');
    const name = e.target.id;
    let valid = true;
    

    if (name === 'PriorityLabel') {
      const inputValue = e.target.value.trim();
      const newValue = Number(inputValue);
  
      const updatedCellConfigData = cellConfigdata.map((cell: any) => {
          if (cell.cellId === currentCell) {
              return {
                  ...cell,
                  PriorityLabel: value,
              };
          }
          return cell;
      });
  
      setcellConfigdata(updatedCellConfigData);
      let selectedCellData = updatedCellConfigData.find((celldata: any) => celldata.cellId === currentCell);
      setcelldata(selectedCellData);
  
      if (inputValue === '' || inputValue === null || inputValue === undefined) {
          handleError('PriorityLabel', 'PriorityLabel is a mandatory field');
          valid = false;
      } else {
          const positiveNumberRegex = /^\d+$/;
  
          if (!positiveNumberRegex.test(inputValue)) {
              handleError('PriorityLabel', 'Invalid input format. Please enter a  number.');
              valid = false;
          } else if (Number.isInteger(newValue) && newValue >= 0 && newValue <= 4294967295) {
              handleError('PriorityLabel', '');
              valid = true;
          } else {
              handleError('PriorityLabel', 'PriorityLabel should be an integer between 0 and 4,294,967,295');
              valid = false;
          }
      }
  }
  
    
    if (name === 'arfcnDL') {
      const inputValue = e.target.value;
       
      const isValidFormat = /^-?\d+$/.test(inputValue);
      
    
      const newValue = Number(inputValue);
      const updatedCellConfigData = cellConfigdata.map((cell: any) => {
        // Check if the current cell's ID matches the selectedCellId
        if (cell.cellId === currentCell) {
          // Update the PriorityLabel for the matched cell
          return {
            ...cell,
            arfcnDL: value,
          };
        }
        // Return the cell as is if no match
        return cell;
      });
      setcellConfigdata(updatedCellConfigData)
      let seletedCellData = updatedCellConfigData.find(function (celldata: any) {
        return celldata.cellId === currentCell;
      });
      setcelldata(seletedCellData);
      
      if (inputValue === '' || inputValue === null || inputValue === undefined) {
        handleError('ArfcnDL','arfcnDL is a mandatory field');
        valid = false;
      }    
      else if (!isValidFormat) {
        handleError('ArfcnDL','Invalid format, please enter a valid number');
        valid = false;
      }
      else if (newValue >= -2147483648 && newValue <= 2147483647) {
        handleError('ArfcnDL','');   
        valid = true;  
      } else {
        handleError('ArfcnDL','arfcnDL should be between 2147483648 and 2147483647');  // Range error
        valid = false;   
      }
    }
    


    if (name === 'arfcnUL') {
      const inputValue = e.target.value;
      const newValue = Number(inputValue);
      const updatedCellConfigData = cellConfigdata.map((cell: any) => {
          // Check if the current cell's ID matches the selectedCellId
          if (cell.cellId === currentCell) {
              // Update the arfcnUL for the matched cell
              return {
                  ...cell,
                  arfcnUL: value,
              };
          }
          // Return the cell as is if no match
          return cell;
      });
  
      setcellConfigdata(updatedCellConfigData);
  
      let seletedCellData = updatedCellConfigData.find((celldata: any) => celldata.cellId === currentCell);
      setcelldata(seletedCellData);
  
      // Check for valid integer format
      const integerRegex = /^-?\d+$/;
  
      if (inputValue !== '' && !integerRegex.test(inputValue)) {
          handleError('ArfcnUL', 'Invalid format, please enter a valid number');
          valid = false;
      } else if (inputValue !== '' && Number.isInteger(newValue)) {
          if (newValue >= -2147483648 && newValue <= 2147483647) {
              handleError('ArfcnUL', '');
              valid = true;
          } else {
              handleError('ArfcnUL', 'arfcnUL should be between -2147483648 and 2147483647');
              valid = false;
          }
      } else if (inputValue !== '') {
          handleError('ArfcnUL', 'arfcnUL should be a valid number');
          valid = false;
      } else {
          // No value provided and field is not mandatory, so clear error
          handleError('ArfcnUL', '');
          valid = true;
      }
  }
  
    
    
    
    
    
    


  if (name === 'cpriRate') {
    const inputValue = e.target.value.trim(); // Remove leading/trailing spaces
    const newValue = Number(inputValue); // Convert to number
    
    // Update cpriRate in the RRHList
    RRHList[selectedRRHindex].cpriRate = inputValue;
    
    // Update cellConfigdata with the modified RRHList
    const updatedCellConfigData = cellConfigdata.map((cell: any) => {
      if (cell.cellId === currentCell) {
        return {
          ...cell,
          RRHList: RRHList,
        };
      }
      return cell; // No change for non-matching cells
    });
    setcellConfigdata(updatedCellConfigData);
    
    // Find and set the selected cell data
    let selectedCellData = updatedCellConfigData.find((cellData: any) => cellData.cellId === currentCell);
    setcelldata(selectedCellData);
    
    // Validation: Handle empty input
    if (inputValue === '') {           
      handleError('cpriRate', '');
      setRrhErrorIndex(prevState => ({
        ...prevState,
        [currentCell]: {
          ...prevState[currentCell],
          [currentRRH]: {
            ...(prevState[currentCell]?.[currentRRH] || {}),
            cpriRate: '' // Set error for empty input
          }
        }
      }));
      valid = false;
      return;
    }
  
    // Validation: Check if the input is a valid number
    if (isNaN(newValue)) {
      handleError('cpriRate', 'Invalid format. cpriRate must be a number.'); // Set invalid format error
      setRrhErrorIndex(prevState => ({
        ...prevState,
        [currentCell]: {
          ...prevState[currentCell],
          [currentRRH]: {
            ...(prevState[currentCell]?.[currentRRH] || {}),
            cpriRate: 'Invalid format. cpriRate must be a number.' // Set specific error message for invalid format
          }
        }
      }));
      valid = false; // Mark as invalid
      return;
    }
  
    // Validation: Check if the input is within range
    if (newValue >= 0 && newValue <= 255) {
      handleError('cpriRate', ''); // Clear error for valid input
      setRrhErrorIndex(prevState => ({
        ...prevState,
        [currentCell]: {
          ...prevState[currentCell],
          [currentRRH]: {
            ...(prevState[currentCell]?.[currentRRH] || {}),
            cpriRate: '' // Clear specific error
          }
        }
      }));
      valid = true; // Mark as valid
    } else {
      handleError('cpriRate', 'cpriRate should be between 0 and 255'); // Set range error
      setRrhErrorIndex(prevState => ({
        ...prevState,
        [currentCell]: {
          ...prevState[currentCell],
          [currentRRH]: {
            ...(prevState[currentCell]?.[currentRRH] || {}),
            cpriRate: 'cpriRate should be between 0 and 255' // Set specific error message
          }
        }
      }));
      valid = false; // Mark as invalid
    }
  }
  
  
  
    
        
       
    // if (name == 'duplexMode') {
    //   RRHList[selectedRRHindex].duplexMode=e.target.value
    //   setcelldata({
    //     ...celldata,
    //     ["RRHList"]:RRHList
    //   });
    // }
       
    if (name === 'dlEarfcn') {
      const inputValue = e.target.value.trim();
      RRHList[selectedRRHindex].dlEarfcn = inputValue; // Update state immediately
  
      const updatedCellConfigData = cellConfigdata.map((cell: any) => {
          if (cell.cellId === currentCell) {
              return {
                  ...cell,
                  RRHList: RRHList,
              };
          }
          return cell;
      });
  
      setcellConfigdata(updatedCellConfigData);
      let selectedCellData = updatedCellConfigData.find((celldata: any) => celldata.cellId === currentCell);
      setcelldata(selectedCellData);
  
      if (inputValue === '') {
          handleError('DlEarfcn', '');
          setRrhErrorIndex(prevState => ({
              ...prevState,
              [currentCell]: {
                  ...prevState[currentCell],
                  [currentRRH]: {
                      ...(prevState[currentCell]?.[currentRRH] || {}),
                      DlEarfcn: ''
                  }
              }
          }));
          return;
      }
  
      const integerRegex = /^\d+$/;
      if (!integerRegex.test(inputValue)) {
          handleError('DlEarfcn', 'Invalid format. Please enter a valid number.');
          setRrhErrorIndex(prevState => ({
              ...prevState,
              [currentCell]: {
                  ...prevState[currentCell],
                  [currentRRH]: {
                      ...(prevState[currentCell]?.[currentRRH] || {}),
                      DlEarfcn: 'Invalid format. Please enter a valid number.'
                  }
              }
          }));
          valid = false;
      } else if (newValue >= 0 && newValue <= 4294967295) {
          handleError('DlEarfcn', '');
          setRrhErrorIndex(prevState => ({
              ...prevState,
              [currentCell]: {
                  ...prevState[currentCell],
                  [currentRRH]: {
                      ...(prevState[currentCell]?.[currentRRH] || {}),
                      DlEarfcn: ''
                  }
              }
          }));
          valid = true;
      } else {
          handleError('DlEarfcn', 'dlEarfcn should be between 0 and 4,294,967,295');
          setRrhErrorIndex(prevState => ({
              ...prevState,
              [currentCell]: {
                  ...prevState[currentCell],
                  [currentRRH]: {
                      ...(prevState[currentCell]?.[currentRRH] || {}),
                      DlEarfcn: 'dlEarfcn should be between 0 and 4,294,967,295'
                  }
              }
          }));
          valid = false;
      }
  }
  
  
  
    
    
    
  
  if (name === 'ulEarfcn') {
    const inputValue = e.target.value.trim();
    RRHList[selectedRRHindex].ulEarfcn = inputValue; // Update state immediately

    const updatedCellConfigData = cellConfigdata.map((cell: any) => {
        if (cell.cellId === currentCell) {
            return {
                ...cell,
                RRHList: RRHList,
            };
        }
        return cell;
    });

    setcellConfigdata(updatedCellConfigData);
    let selectedCellData = updatedCellConfigData.find((celldata: any) => celldata.cellId === currentCell);
    setcelldata(selectedCellData);

    if (inputValue === '') {
        handleError('UlEarfcn', '');
        setRrhErrorIndex(prevState => ({
            ...prevState,
            [currentCell]: {
                ...prevState[currentCell],
                [currentRRH]: {
                    ...(prevState[currentCell]?.[currentRRH] || {}),
                    UlEarfcn: ''
                }
            }
        }));
        return;
    }

    const integerRegex = /^\d+$/;
    const newValue = Number(inputValue);

    if (!integerRegex.test(inputValue)) {
        handleError('UlEarfcn', 'Invalid format. Please enter a valid number.');
        setRrhErrorIndex(prevState => ({
            ...prevState,
            [currentCell]: {
                ...prevState[currentCell],
                [currentRRH]: {
                    ...(prevState[currentCell]?.[currentRRH] || {}),
                    UlEarfcn: 'Invalid format. Please enter a valid number.'
                }
            }
        }));
        valid = false;
    } else if (newValue >= 0 && newValue <= 4294967295) {
        handleError('UlEarfcn', '');
        setRrhErrorIndex(prevState => ({
            ...prevState,
            [currentCell]: {
                ...prevState[currentCell],
                [currentRRH]: {
                    ...(prevState[currentCell]?.[currentRRH] || {}),
                    UlEarfcn: ''
                }
            }
        }));
        valid = true;
    } else {
        handleError('UlEarfcn', 'ulEarfcn should be between 0 and 4,294,967,295');
        setRrhErrorIndex(prevState => ({
            ...prevState,
            [currentCell]: {
                ...prevState[currentCell],
                [currentRRH]: {
                    ...(prevState[currentCell]?.[currentRRH] || {}),
                    UlEarfcn: 'ulEarfcn should be between 0 and 4,294,967,295'
                }
            }
        }));
        valid = false;
    }
}


  
  
if (name === 'frequencyBand') {
  const inputValue = e.target.value.trim();
  RRHList[selectedRRHindex].frequencyBand = inputValue; // Update state immediately

  const updatedCellConfigData = cellConfigdata.map((cell: any) => {
      if (cell.cellId === currentCell) {
          return {
              ...cell,
              RRHList: RRHList,
          };
      }
      return cell;
  });

  setcellConfigdata(updatedCellConfigData);
  let selectedCellData = updatedCellConfigData.find((celldata: any) => celldata.cellId === currentCell);
  setcelldata(selectedCellData);

  if (inputValue === '') {
      handleError('FrequencyBand', '');
      setRrhErrorIndex(prevState => ({
          ...prevState,
          [currentCell]: {
              ...prevState[currentCell],
              [currentRRH]: {
                  ...(prevState[currentCell]?.[currentRRH] || {}),
                  FrequencyBand: ''
              }
          }
      }));
      return;
  }

  const integerRegex = /^\d+$/;
  const newValue = Number(inputValue);

  if (!integerRegex.test(inputValue)) {
      handleError('FrequencyBand', 'Invalid format. Please enter a valid number.');
      setRrhErrorIndex(prevState => ({
          ...prevState,
          [currentCell]: {
              ...prevState[currentCell],
              [currentRRH]: {
                  ...(prevState[currentCell]?.[currentRRH] || {}),
                  FrequencyBand: 'Invalid format. Please enter a valid number.'
              }
          }
      }));
      valid = false;
  } else if (newValue >= 0 && newValue <= 43) {
      handleError('FrequencyBand', '');
      setRrhErrorIndex(prevState => ({
          ...prevState,
          [currentCell]: {
              ...prevState[currentCell],
              [currentRRH]: {
                  ...(prevState[currentCell]?.[currentRRH] || {}),
                  FrequencyBand: ''
              }
          }
      }));
      valid = true;
  } else {
      handleError('FrequencyBand', 'frequencyBand should be between 0 and 43');
      setRrhErrorIndex(prevState => ({
          ...prevState,
          [currentCell]: {
              ...prevState[currentCell],
              [currentRRH]: {
                  ...(prevState[currentCell]?.[currentRRH] || {}),
                  FrequencyBand: 'frequencyBand should be between 0 and 43'
              }
          }
      }));
      valid = false;
  }
}

  
if (name === 'bandWidth') {
  const inputValue = e.target.value.trim();
  const newValue = Number(inputValue);
  const validBandWidths = [10, 15, 20, 25, 30, 40, 50, 60, 70, 80, 90, 100, 200, 400]; // Valid bandWidth values
  
  RRHList[selectedRRHindex].bandWidth = inputValue; // Update state immediately

  const updatedCellConfigData = cellConfigdata.map((cell: any) => {
      if (cell.cellId === currentCell) {
          return {
              ...cell,
              RRHList: RRHList,
          };
      }
      return cell;
  });

  setcellConfigdata(updatedCellConfigData);
  let selectedCellData = updatedCellConfigData.find((celldata: any) => celldata.cellId === currentCell);
  setcelldata(selectedCellData);

  if (inputValue === '') {
      handleError('BandWidth', '');
      setRrhErrorIndex((prevState) => ({
          ...prevState,
          [currentCell]: {
              ...prevState[currentCell],
              [currentRRH]: {
                  ...(prevState[currentCell]?.[currentRRH] || {}),
                  BandWidth: '',
              },
          },
      }));
      return;
  }

  const integerRegex = /^\d+$/;

  if (!integerRegex.test(inputValue)) {
      handleError('BandWidth', 'Invalid format. Please enter a valid number.');
      setRrhErrorIndex((prevState) => ({
          ...prevState,
          [currentCell]: {
              ...prevState[currentCell],
              [currentRRH]: {
                  ...(prevState[currentCell]?.[currentRRH] || {}),
                  BandWidth: 'Invalid format. Please enter a valid number.',
              },
          },
      }));
      valid = false;
  } else if (validBandWidths.includes(newValue)) {
      handleError('BandWidth', '');
      setRrhErrorIndex((prevState) => ({
          ...prevState,
          [currentCell]: {
              ...prevState[currentCell],
              [currentRRH]: {
                  ...(prevState[currentCell]?.[currentRRH] || {}),
                  BandWidth: '',
              },
          },
      }));
      valid = true;
  } else {
      handleError('BandWidth', 'Invalid input range. Please select a value from the allowed range: [10, 15, 20, 25, 30, 40, 50, 60, 70, 80, 90, 100, 200, 400]');
      setRrhErrorIndex((prevState) => ({
          ...prevState,
          [currentCell]: {
              ...prevState[currentCell],
              [currentRRH]: {
                  ...(prevState[currentCell]?.[currentRRH] || {}),
                  BandWidth: 'Invalid input range. Please select a value from the allowed range: [10, 15, 20, 25, 30, 40, 50, 60, 70, 80, 90, 100, 200, 400]',
              },
          },
      }));
      valid = false;
  }
}

  

if (name === 'mode') {
  const inputValue = e.target.value.trim();
  const newValue = Number(inputValue);

  RRHList[selectedRRHindex].mode = inputValue;

  const updatedCellConfigData = cellConfigdata.map((cell: any) => {
      if (cell.cellId === currentCell) {
          return {
              ...cell,
              RRHList: RRHList,
          };
      }
      return cell;
  });

  setcellConfigdata(updatedCellConfigData);
  let selectedCellData = updatedCellConfigData.find(celldata => celldata.cellId === currentCell);
  setcelldata(selectedCellData);

  if (inputValue === '') {
      handleError('Mode', '');
      setRrhErrorIndex(prevState => ({
          ...prevState,
          [currentCell]: {
              ...prevState[currentCell],
              [currentRRH]: {
                  ...(prevState[currentCell]?.[currentRRH] || {}),
                  Mode: ''
              }
          }
      }));
      valid = true;
      return;
  }

  const positiveNumberRegex = /^\d+$/;

  if (!positiveNumberRegex.test(inputValue)) {
      handleError('Mode', 'Invalid input format. Please enter a number.');
      setRrhErrorIndex(prevState => ({
          ...prevState,
          [currentCell]: {
              ...prevState[currentCell],
              [currentRRH]: {
                  ...(prevState[currentCell]?.[currentRRH] || {}),
                  Mode: 'Invalid input format. Please enter a  number.'
              }
          }
      }));
      valid = false;
  } else if (newValue >= 0 && newValue <= 2) {
      handleError('Mode', '');
      setRrhErrorIndex(prevState => ({
          ...prevState,
          [currentCell]: {
              ...prevState[currentCell],
              [currentRRH]: {
                  ...(prevState[currentCell]?.[currentRRH] || {}),
                  Mode: ''
              }
          }
      }));
      valid = true;
  } else {
      handleError('Mode', 'Mode should be between 0 and 2');
      setRrhErrorIndex(prevState => ({
          ...prevState,
          [currentCell]: {
              ...prevState[currentCell],
              [currentRRH]: {
                  ...(prevState[currentCell]?.[currentRRH] || {}),
                  Mode: 'Mode should be between 0 and 2'
              }
          }
      }));
      valid = false;
  }
}



if (name === 'testTime') {
  const inputValue = e.target.value.trim();
  const newValue = Number(inputValue);

  RRHList[selectedRRHindex].testTime = inputValue;

  const updatedCellConfigData = cellConfigdata.map((cell: any) => {
      if (cell.cellId === currentCell) {
          return {
              ...cell,
              RRHList: RRHList,
          };
      }
      return cell;
  });

  setcellConfigdata(updatedCellConfigData);
  let selectedCellData = updatedCellConfigData.find((celldata: any) => celldata.cellId === currentCell);
  setcelldata(selectedCellData);

  if (inputValue === '') {
      handleError('TestTime', '');
      setRrhErrorIndex(prevState => ({
          ...prevState,
          [currentCell]: {
              ...prevState[currentCell],
              [currentRRH]: {
                  ...(prevState[currentCell]?.[currentRRH] || {}),
                  TestTime: ''
              }
          }
      }));
      valid = true;
      return;
  }

  const positiveNumberRegex = /^\d+$/;

  if (!positiveNumberRegex.test(inputValue)) {
      handleError('TestTime', 'Invalid input format. Please enter a  number.');
      setRrhErrorIndex(prevState => ({
          ...prevState,
          [currentCell]: {
              ...prevState[currentCell],
              [currentRRH]: {
                  ...(prevState[currentCell]?.[currentRRH] || {}),
                  TestTime: 'Invalid input format. Please enter a  number.'
              }
          }
      }));
      valid = false;
  } else if (newValue >= 0 && newValue <= 65535) {
      handleError('TestTime', '');
      setRrhErrorIndex(prevState => ({
          ...prevState,
          [currentCell]: {
              ...prevState[currentCell],
              [currentRRH]: {
                  ...(prevState[currentCell]?.[currentRRH] || {}),
                  TestTime: ''
              }
          }
      }));
      valid = true;
  } else {
      handleError('TestTime', 'testTime should be between 0 and 65535');
      setRrhErrorIndex(prevState => ({
          ...prevState,
          [currentCell]: {
              ...prevState[currentCell],
              [currentRRH]: {
                  ...(prevState[currentCell]?.[currentRRH] || {}),
                  TestTime: 'testTime should be between 0 and 65535'
              }
          }
      }));
      valid = false;
  }
}




if (name === 'antennaId') {
  const inputValue = e.target.value.trim();
  const newValue = Number(inputValue);

  RRHList[selectedRRHindex].antennaId = inputValue;

  const updatedCellConfigData = cellConfigdata.map((cell: any) => {
      if (cell.cellId === currentCell) {
          return {
              ...cell,
              RRHList: RRHList,
          };
      }
      return cell;
  });

  setcellConfigdata(updatedCellConfigData);
  let selectedCellData = updatedCellConfigData.find((celldata: any) => celldata.cellId === currentCell);
  setcelldata(selectedCellData);

  if (inputValue === '') {
      handleError('AntennaId', '');
      setRrhErrorIndex(prevState => ({
          ...prevState,
          [currentCell]: {
              ...prevState[currentCell],
              [currentRRH]: {
                  ...(prevState[currentCell]?.[currentRRH] || {}),
                  AntennaId: ''
              }
          }
      }));
      valid = true;
      return;
  }

  const positiveNumberRegex = /^\d+$/;

  if (!positiveNumberRegex.test(inputValue)) {
      handleError('AntennaId', 'Invalid input format. Please enter a  number.');
      setRrhErrorIndex(prevState => ({
          ...prevState,
          [currentCell]: {
              ...prevState[currentCell],
              [currentRRH]: {
                  ...(prevState[currentCell]?.[currentRRH] || {}),
                  AntennaId: 'Invalid input format. Please enter a  number.'
              }
          }
      }));
      valid = false;
  } else if (newValue >= 0 && newValue <= 3) {
      handleError('AntennaId', '');
      setRrhErrorIndex(prevState => ({
          ...prevState,
          [currentCell]: {
              ...prevState[currentCell],
              [currentRRH]: {
                  ...(prevState[currentCell]?.[currentRRH] || {}),
                  AntennaId: ''
              }
          }
      }));
      valid = true;
  } else {
      handleError('AntennaId', 'Antenna ID must be between 0 and 3');
      setRrhErrorIndex(prevState => ({
          ...prevState,
          [currentCell]: {
              ...prevState[currentCell],
              [currentRRH]: {
                  ...(prevState[currentCell]?.[currentRRH] || {}),
                  AntennaId: 'Antenna ID must be between 0 and 3'
              }
          }
      }));
      valid = false;
  }
}












    // if (name == 'antennaType') {
    //   RRHList[selectedRRHindex].antennaType=e.target.value
    //   const updatedCellConfigData = cellConfigdata.map((cell: any) => {
    //     // Check if the current cell's ID matches the selectedCellId
    //     if (cell.cellId === currentCell) {
    //       // Update the PriorityLabel for the matched cell
    //       return {
    //         ...cell,
    //         RRHList: RRHList,
    //       };
    //     }
    //     // Return the cell as is if no match
    //     return cell;
    //   });
    //   setcellConfigdata(updatedCellConfigData)
    //   let seletedCellData = updatedCellConfigData.find(function (celldata: any) {
    //     return celldata.cellId === currentCell;
    //   });
    //   setcelldata(seletedCellData);
      
    
    // }
        
    if (name === 'arfcnSUL') {
      const inputValue = e.target.value;
      const newValue = Number(inputValue);
    
      const updatedCellConfigData = cellConfigdata.map((cell: any) => {
        if (cell.cellId === currentCell) {
          return {
            ...cell,
            arfcnSUL: inputValue,
          };
        }
        return cell;
      });
    
      setcellConfigdata(updatedCellConfigData);
    
      let seletedCellData = updatedCellConfigData.find((celldata: any) => celldata.cellId === currentCell);
      setcelldata(seletedCellData);
    
      if (inputValue !== '' && !isNaN(newValue)) { 
        if (newValue >= -2147483648 && newValue <= 2147483647) {
          handleError('arfcnSUL', '');
          valid = true;
        } else {
          handleError('arfcnSUL', 'arfcnSUL should be between -2147483648 and 2147483647');
          valid = false;
        }
      } else if (inputValue !== '') {
        handleError('arfcnSUL', 'Invalid format. Please enter a valid number');
        valid = false;
      } else {
        handleError('arfcnSUL', '');
        valid = true;
      }
    }
    

    if (name === 'bsChannelBwDL') {
      const inputValue = e.target.value;
      const newValue = Number(inputValue);
      const updatedCellConfigData = cellConfigdata.map((cell: any) => {
          if (cell.cellId === currentCell) {
              return {
                  ...cell,
                  bsChannelBwDL: inputValue,
              };
          }
          return cell;
      });
  
      setcellConfigdata(updatedCellConfigData);
      let selectedCellData = updatedCellConfigData.find(function (celldata: any) {
          return celldata.cellId === currentCell;
      });
      setcelldata(selectedCellData);
  
      if (inputValue !== '') {
        const integerRegex = /^-?\d+$/;

        if (!integerRegex.test(inputValue)) {
            handleError('BsChannelBwDL', 'Invalid format. Please enter a valid number.');
            valid = false;
        } else if (!isNaN(newValue) && newValue >= -2147483648 && newValue <= 2147483647) {
            handleError('BsChannelBwDL', '');
            valid = true;
        } else {
            handleError('BsChannelBwDL', 'bsChannelBwDL should be between -2,147,483,648 and 2,147,483,647');
            valid = false;
        }
    } else {
        handleError('BsChannelBwDL', '');
        valid = true;
    }
  }
  
  
  
  
  
  if (name === 'bsChannelBwUL') {
    const inputValue = e.target.value;
    const newValue = Number(inputValue);
    const updatedCellConfigData = cellConfigdata.map((cell: any) => {
        if (cell.cellId === currentCell) {
            return {
                ...cell,
                bsChannelBwUL: inputValue,
            };
        }
        return cell;
    });

    setcellConfigdata(updatedCellConfigData);
    let selectedCellData = updatedCellConfigData.find(function (celldata: any) {
        return celldata.cellId === currentCell;
    });
    setcelldata(selectedCellData);

    if (inputValue !== '') {
        const integerRegex = /^-?\d+$/;

        if (!integerRegex.test(inputValue)) {
            handleError('BsChannelBwUL', 'Invalid format. Please enter a valid number.');
            valid = false;
        } else if (!isNaN(newValue) && newValue >= -2147483648 && newValue <= 2147483647) {
            handleError('BsChannelBwUL', '');
            valid = true;
        } else {
            handleError('BsChannelBwUL', 'bsChannelBwUL should be between -2,147,483,648 and 2,147,483,647');
            valid = false;
        }
    } else {
        handleError('BsChannelBwUL', '');
        valid = true;
    }
}




if (name === 'ssbPeriodicity') {
  const inputValue = e.target.value;

  const validValues = [5, 10, 20, 40, 80, 160];

  const updatedCellConfigData = cellConfigdata.map((cell: any) => {
    if (cell.cellId === currentCell) {
      return {
        ...cell,
        ssbPeriodicity: inputValue,
      };
    }
    return cell;
  });

  setcellConfigdata(updatedCellConfigData);

  let selectedCellData = updatedCellConfigData.find((celldata: any) => celldata.cellId === currentCell);
  setcelldata(selectedCellData);

  const newValue = Number(inputValue);

  if (inputValue === '') {
    handleError('ssbPeriodicity', 'ssbPeriodicity is a mandatory field.');
    valid = false;
  } else if (isNaN(newValue)) {
    handleError('ssbPeriodicity', 'Invalid format. Please enter a number.');
    valid = false;
  } else if (!validValues.includes(newValue)) {
    handleError('ssbPeriodicity', 'Please enter a value from 5, 10, 20, 40, 80, 160.');
    valid = false;
  } else {
    handleError('ssbPeriodicity', '');
    valid = true;
  }
}





  
  if (name === 'ssbOfset') {
    const inputValue = e.target.value;
    const newValue = Number(inputValue);
  
    const updatedCellConfigData = cellConfigdata.map((cell: any) => {
      // Check if the current cell's ID matches the selectedCellId
      if (cell.cellId === currentCell) {
        // Update the PriorityLabel for the matched cell
        return {
          ...cell,
          ssbOfset: inputValue,
        };
      }
      // Return the cell as is if no match
      return cell;
    });
    setcellConfigdata(updatedCellConfigData) 
    let seletedCellData = updatedCellConfigData.find(function (celldata: any) {
      return celldata.cellId === currentCell;
    });
    setcelldata(seletedCellData);
  
    if (inputValue === '' || inputValue === null || inputValue === undefined) {
      handleError('ssbOffset','ssbOfset is a mandatory field');
      valid = false;
    } else if (!isNaN(newValue)) {
      if (newValue >= 0 && newValue <= 159) {
        handleError('ssbOffset','');
        valid = true;
      } else {
        handleError('ssbOffset','ssbOfset should be between 0 and 159');
        valid = false;
      }
    } else {
      handleError('ssbOffset','ssbOfset should be a valid number');
      valid = false;
    }
  }  
  
  if (name === 'ssbDuration') {
    const inputValue = e.target.value;
    const newValue = Number(inputValue);
  
    const updatedCellConfigData = cellConfigdata.map((cell: any) => {
      // Check if the current cell's ID matches the selectedCellId
      if (cell.cellId === currentCell) {
        // Update the PriorityLabel for the matched cell
        return {
          ...cell,
          ssbDuration: inputValue,
        };
      }
      // Return the cell as is if no match
      return cell;
    });
    setcellConfigdata(updatedCellConfigData) 
    let seletedCellData = updatedCellConfigData.find(function (celldata: any) {
      return celldata.cellId === currentCell;
    });
    setcelldata(seletedCellData);
  
    if (inputValue === '' || inputValue === null || inputValue === undefined) {
      handleError('ssbDuration','ssbDuration is a mandatory field');
      valid = false;
    } else if (!isNaN(newValue)) {
      if (newValue >= 0 && newValue <= 5) {
        handleError('ssbDuration','');
        valid = true;
      } else {
        handleError('ssbDuration','Please enter a value between 0 and 5');
        valid = false;
      }
    } else {
      handleError('ssbDuration','ssbDuration should be a valid number');
      valid = false;
    }
  }  

  if (name === 'ssbFrequency') {
    const inputValue = e.target.value;
    const newValue = Number(inputValue);
  
    const updatedCellConfigData = cellConfigdata.map((cell: any) => {
      // Check if the current cell's ID matches the selectedCellId
      if (cell.cellId === currentCell) {
        // Update the PriorityLabel for the matched cell
        return {
          ...cell,
          ssbFrequency: inputValue,
        };
      }
      // Return the cell as is if no match
      return cell;
    });
    setcellConfigdata(updatedCellConfigData) 
    let seletedCellData = updatedCellConfigData.find(function (celldata: any) {
      return celldata.cellId === currentCell;
    });
    setcelldata(seletedCellData);
  
    if (inputValue === '' || inputValue === null || inputValue === undefined) {
      handleError('ssbFrequency','ssbFrequency is a mandatory field');
      valid = false;
    } else if (!isNaN(newValue)) {
      if (newValue >= 0 && newValue <= 3279165) {
        handleError('ssbFrequency','');
        valid = true;
      } else {
        handleError('ssbFrequency','Please enter a value between 0 to 3279165');
        valid = false;
      }
    } else {
      handleError('ssbFrequency','ssbFrequency should be a valid number');
      valid = false;
    }
  }    
  
  if (name === 'ssbSubCarrierSpacing') {
    const inputValue = e.target.value;
    
    const validValues = [15, 30, 120, 240];

    const updatedCellConfigData = cellConfigdata.map((cell: any) => {
      if (cell.cellId === currentCell) {
        return {
          ...cell,
          ssbSubCarrierSpacing: inputValue,
        };
      }
      return cell;
    });

    setcellConfigdata(updatedCellConfigData);

    let selectedCellData = updatedCellConfigData.find((celldata: any) => celldata.cellId === currentCell);
    setcelldata(selectedCellData);

    const newValue = Number(inputValue);

    if (
      inputValue === '' || 
      isNaN(newValue) ||    
      !validValues.includes(newValue) 
    ) {
        handleError('ssbSubCarrierSpacing', 'ssbSubCarrierSpacing is a mandatory field. Please enter a value from 15, 30, 120, or 240.');
        valid = false;
    } else {
        handleError('ssbSubCarrierSpacing', '');
    }
}

  
  
 
if (name === 'rsrpOffsetSSB') {
  const inputValue = e.target.value;
  const newValue = Number(inputValue);
  const updatedCellConfigData = cellConfigdata.map((cell: any) => {
      if (cell.cellId === currentCell) {
          return {
              ...cell,
              rsrpOffsetSSB: value,
          };
      }
      return cell;
  });

  setcellConfigdata(updatedCellConfigData);
  let selectedCellData = updatedCellConfigData.find((celldata: any) => celldata.cellId === currentCell);
  setcelldata(selectedCellData);

  const validValues = [-24, -22, -20, -18, -16, -14, -12, -10, -8, -6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24];

  // Check for valid integer format only if input is provided
  if (inputValue !== '') {
      const integerRegex = /^-?\d+$/;

      if (!integerRegex.test(inputValue)) {
          handleError('rsrpOffsetSSB', 'Invalid format. Please enter a valid number.');
          valid = false;
      } else if (!validValues.includes(newValue)) {
          handleError('rsrpOffsetSSB', `Invalid input range. Please select a value from the allowed range: ${validValues.join(', ')}.`);
          valid = false;
      } else {
          setValue(newValue);
          handleError('rsrpOffsetSSB', '');
          valid = true;
      }
  } else {
      handleError('rsrpOffsetSSB', '');
      valid = true;
  }
}



  
  if (name === 'sinrOffsetSSB') {
    const inputValue = e.target.value;
    const newValue = Number(inputValue);
    const updatedCellConfigData = cellConfigdata.map((cell: any) => {
        if (cell.cellId === currentCell) {
            return {
                ...cell,
                sinrOffsetSSB: value,
            };
        }
        return cell;
    });

    setcellConfigdata(updatedCellConfigData);
    let selectedCellData = updatedCellConfigData.find((celldata: any) => celldata.cellId === currentCell);
    setcelldata(selectedCellData);

    const validValues = [-24, -22, -20, -18, -16, -14, -12, -10, -8, -6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24];

    if (inputValue !== '') {
      const integerRegex = /^-?\d+$/;

      if (!integerRegex.test(inputValue)) {
          handleError('sinrOffsetSSB', 'Invalid format. Please enter a valid number.');
          valid = false;
      } else if (!validValues.includes(newValue)) {
          handleError('sinrOffsetSSB', `Invalid input range. Please select a value from the allowed range: ${validValues.join(', ')}.`);
          valid = false;
      } else {
          setValue(newValue);
          handleError('sinrOffsetSSB', '');
          valid = true;
      }
  } else {
      handleError('sinrOffsetSSB', '');
      valid = true;
  }
}

  
if (name === 'rsrqOffsetSSB') {
  const inputValue = e.target.value;
  const newValue = Number(inputValue);
  const updatedCellConfigData = cellConfigdata.map((cell: any) => {
      if (cell.cellId === currentCell) {
          return {
              ...cell,
              rsrqOffsetSSB: value,
          };
      }
      return cell;
  });

  setcellConfigdata(updatedCellConfigData);
  let selectedCellData = updatedCellConfigData.find((celldata: any) => celldata.cellId === currentCell);
  setcelldata(selectedCellData);

  const validValues = [-24, -22, -20, -18, -16, -14, -12, -10, -8, -6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24];

  // Check for valid integer format only if input is provided
  if (inputValue !== '') {
      const integerRegex = /^-?\d+$/;

      if (!integerRegex.test(inputValue)) {
          handleError('rsrqOffsetSSB', 'Invalid format. Please enter a valid number.');
          valid = false;
      } else if (!validValues.includes(newValue)) {
          handleError('rsrqOffsetSSB', `Invalid input range. Please select a value from the allowed range: ${validValues.join(', ')}.`);
          valid = false;
      } else {
          setValue(newValue);
          handleError('rsrqOffsetSSB', '');
          valid = true;
      }
  } else {
      handleError('rsrqOffsetSSB', '');
      valid = true;
  }
}

  

  if (name === 'rsrpOffsetCsiRs') {
    const inputValue = e.target.value;
    const newValue = Number(inputValue);
    const updatedCellConfigData = cellConfigdata.map((cell: any) => {
        if (cell.cellId === currentCell) {
            return {
                ...cell,
                rsrpOffsetCsiRs: value,
            };
        }
        return cell;
    });

    setcellConfigdata(updatedCellConfigData);
    let selectedCellData = updatedCellConfigData.find((celldata: any) => celldata.cellId === currentCell);
    setcelldata(selectedCellData);

    const validValues = [-24, -22, -20, -18, -16, -14, -12, -10, -8, -6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24];
    
    if (inputValue !== '') {
        const integerRegex = /^-?\d+$/;

        if (!integerRegex.test(inputValue)) {
            handleError('rsrpOffsetCsiRs', 'Invalid format. Please enter a valid number.');
            valid = false;
        } else if (!validValues.includes(newValue)) {
            handleError('rsrpOffsetCsiRs', `Invalid input range. Please select a value from the allowed range: ${validValues.join(', ')}.`);
            valid = false;
        } else {
            setValue(newValue);
            handleError('rsrpOffsetCsiRs', '');
            valid = true;
        }
    } else {
        handleError('rsrpOffsetCsiRs', '');
        valid = true;
    }
}

 
 
    if (name === 'rsrqOffsetCsiRs') {
      const inputValue = e.target.value;
      const newValue = Number(inputValue);
      const updatedCellConfigData = cellConfigdata.map((cell: any) => {
          if (cell.cellId === currentCell) {
              return {
                  ...cell,
                  rsrqOffsetCsiRs: value,
              };
          }
          return cell;
      });
  
      setcellConfigdata(updatedCellConfigData);
      let selectedCellData = updatedCellConfigData.find((celldata: any) => celldata.cellId === currentCell);
      setcelldata(selectedCellData);
  
      const validValues = [-24, -22, -20, -18, -16, -14, -12, -10, -8, -6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24];
      
      // Check for valid integer format only if input is provided
      if (inputValue !== '') {
          const integerRegex = /^-?\d+$/;
  
          if (!integerRegex.test(inputValue)) {
              handleError('rsrqOffsetCsiRs', 'Invalid format. Please enter a valid number.');
              valid = false;
          } else if (!validValues.includes(newValue)) {
              handleError('rsrqOffsetCsiRs', `Invalid input range. Please select a value from the allowed range: ${validValues.join(', ')}.`);
              valid = false;
          } else {
              setValue(newValue);
              handleError('rsrqOffsetCsiRs', '');
              valid = true;
          }
      } else {
          handleError('rsrqOffsetCsiRs', '');
          valid = true;
      }
  }    
    
          
    
  if (name === 'sinrOffsetCsiRs') {
    const inputValue = e.target.value;
    const newValue = Number(inputValue);
    const updatedCellConfigData = cellConfigdata.map((cell: any) => {
        if (cell.cellId === currentCell) {
            return {
                ...cell,
                sinrOffsetCsiRs: value,
            };
        }
        return cell;
    });

    setcellConfigdata(updatedCellConfigData);
    let selectedCellData = updatedCellConfigData.find((celldata: any) => celldata.cellId === currentCell);
    setcelldata(selectedCellData);

    const validValues = [-24, -22, -20, -18, -16, -14, -12, -10, -8, -6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24];

    // Check for valid integer format only if input is provided
    if (inputValue !== '') {
        const integerRegex = /^-?\d+$/;

        if (!integerRegex.test(inputValue)) {
            handleError('sinrOffsetCsiRs', 'Invalid format. Please enter a valid number.');
            valid = false;
        } else if (!validValues.includes(newValue)) {
            handleError('sinrOffsetCsiRs', `Invalid input range. Please select a value from the allowed range: ${validValues.join(', ')}.`);
            valid = false;
        } else {
            setValue(newValue);
            handleError('sinrOffsetCsiRs', '');
            valid = true;
        }
    } else {
        handleError('sinrOffsetCsiRs', '');
        valid = true;
    }
}

    
  if (name === 'CellReselectionPriority') {
    const inputValue = e.target.value;
    const newValue = Number(inputValue);
  
    const updatedCellConfigData = cellConfigdata.map((cell: any) => {
      // Check if the current cell's ID matches the selectedCellId
      if (cell.cellId === currentCell) {
        // Update the PriorityLabel for the matched cell
        return {
          ...cell,
          CellReselectionPriority: value,
        };
      }
      // Return the cell as is if no match
      return cell;
    });
    setcellConfigdata(updatedCellConfigData) 
    let seletedCellData = updatedCellConfigData.find(function (celldata: any) {
      return celldata.cellId === currentCell;
    });
    setcelldata(seletedCellData);
  
    if (inputValue === '' || inputValue === null || inputValue === undefined) {
      handleError('cellReselectionPriority','CellReselectionPriority is a mandatory field');
      valid = false;
    } else if (!isNaN(newValue)) {
      if (newValue >= 0 && newValue <= 7) {
        setValue(newValue);
        handleError('cellReselectionPriority','');
        valid = true;
      } else {
        handleError('cellReselectionPriority','Please enter a value between 0 and 7');
        valid = false;
      }
    }
  }
  

  if (name === 'CellReselectionSubPriority') {
    const inputValue = e.target.value;

    const validValues = [2, 4, 6, 8];

    const updatedCellConfigData = cellConfigdata.map((cell: any) => {
      if (cell.cellId === currentCell) {
        return {
          ...cell,
          CellReselectionSubPriority: inputValue,
        };
      }
      return cell;
    });

    setcellConfigdata(updatedCellConfigData);

    let selectedCellData = updatedCellConfigData.find((celldata: any) => celldata.cellId === currentCell);
    setcelldata(selectedCellData);

    const newValue = Number(inputValue);

    if (inputValue === '') {
        handleError('CellReselectionSubPriority', 'CellReselectionSubPriority is a mandatory field.');
        valid = false;
    } 
    else if (isNaN(newValue) || !validValues.includes(newValue)) {
        handleError('CellReselectionSubPriority', 'Please enter a valid number from 2, 4, 6, 8.');
        valid = false;
    } 
    else {
        handleError('CellReselectionSubPriority', '');
    }
}




if (name === 'pMax') {
  const inputValue = e.target.value;
  const newValue = Number(inputValue);
  const validFormat = /^-?\d+(\.\d+)?$/;

  const updatedCellConfigData = cellConfigdata.map((cell: any) => {
    if (cell.cellId === currentCell) {
      return {
        ...cell,
        pMax: value,
      };
    }
    return cell;
  });

  setcellConfigdata(updatedCellConfigData);

  let seletedCellData = updatedCellConfigData.find(function (celldata: any) {
    return celldata.cellId === currentCell;
  });
  setcelldata(seletedCellData);

  if (inputValue === '' || inputValue === null || inputValue === undefined) {
    handleError('pMax', 'pMax is a mandatory field');
    valid = false;
  } else if (!validFormat.test(inputValue)) {
    handleError('pMax', 'Invalid format, please enter a valid number');
    valid = false;
  } else if (!isNaN(newValue)) {
    if (newValue >= -30 && newValue <= 33) {
      setValue(newValue);
      handleError('pMax', '');
      valid = true;
    } else {
      handleError('pMax', 'Please enter a value between -30 and 33');
      valid = false;
    }
  }
}
    

    if (name === 'qOffsetFrequency') {
      const inputValue = e.target.value.trim();
    
      const updatedCellConfigData = cellConfigdata.map((cell: any) => {
        // Check if the current cell's ID matches the selectedCellId
        if (cell.cellId === currentCell) {
          // Update the PriorityLabel for the matched cell
          return {
            ...cell,
            qOffsetFrequency: value,
          };
        }
        // Return the cell as is if no match
        return cell;
      });
      setcellConfigdata(updatedCellConfigData) 
      let seletedCellData = updatedCellConfigData.find(function (celldata: any) {
        return celldata.cellId === currentCell;
      });
      setcelldata(seletedCellData);
    
      if (inputValue === '') {
        handleError('qOffsetFrequency','qOffsetFrequency is mandatory.');
        valid = false;
        return;
      }
    
      const isValidNumber = /^-?\d+$/.test(inputValue);
    
      if (isValidNumber) {
        const newValue = Number(inputValue);
    
        if (newValue >= -2147483648 && newValue <= 2147483647) {
          setValue(newValue);
          handleError('qOffsetFrequency','');
          valid = true;
        } else {
          handleError('qOffsetFrequency','Please enter a value between -2,147,483,648 and 2,147,483,647 (int32 range).');
          valid = false;
        }
      } else {
        handleError('qOffsetFrequency','Invalid input. Please enter a valid number.');
        valid = false;
      }
    }     
   
          
    
    if (name === 'qRxLevMin') {
      const inputValue = e.target.value;
      const validFormat = /^-?\d+$/; // Allows negative integers
      const updatedCellConfigData = cellConfigdata.map((cell: any) => {
        if (cell.cellId === currentCell) {
          return {
            ...cell,
            qRxLevMin: value,
          };
        }
        return cell;
      });
    
      setcellConfigdata(updatedCellConfigData);
    
      let seletedCellData = updatedCellConfigData.find(function (celldata: any) {
        return celldata.cellId === currentCell;
      });
      setcelldata(seletedCellData);
    
      const newValue = Number(inputValue);
    
      if (inputValue === '' || inputValue === null || inputValue === undefined) {
        handleError('qRxLevMin', 'qRxLevMin is a mandatory field');
        valid = false;
      } else if (!validFormat.test(inputValue)) {
        handleError('qRxLevMin', 'Invalid format, please enter a valid number');
        valid = false;
      } else if (!isNaN(newValue)) {
        if (newValue >= -140 && newValue <= -44) {
          setValue(newValue);
          handleError('qRxLevMin', '');
          valid = true;
        } else {
          handleError('qRxLevMin', 'Please enter a value between -140 and -44');
          valid = false;
        }
      }
    }
    
        
    if (name === 'qQualMin') {
      const inputValue = e.target.value;
      const newValue = Number(inputValue);
      const validFormat = /^-?\d+$/; // Allows negative and positive integers
    
      const updatedCellConfigData = cellConfigdata.map((cell: any) => {
        if (cell.cellId === currentCell) {
          return {
            ...cell,
            qQualMin: value,
          };
        }
        return cell;
      });
    
      setcellConfigdata(updatedCellConfigData);
      
      let seletedCellData = updatedCellConfigData.find(function (celldata: any) {
        return celldata.cellId === currentCell;
      });
      setcelldata(seletedCellData);
    
      if (inputValue === '' || inputValue === null || inputValue === undefined) {
        handleError('qQualMin', 'qQualMin is a mandatory field');
        valid = false;
      } else if (!validFormat.test(inputValue)) {
        handleError('qQualMin', 'Invalid format, please enter a valid integer');
        valid = false;
      } else if (!isNaN(newValue)) {
        if ((newValue >= -34 && newValue <= -3) || newValue === 0) {
          setValue(newValue);
          handleError('qQualMin', '');
          valid = true;
        } else {
          handleError('qQualMin', 'Please enter a value between -34 and -3 or 0');
          valid = false;
        }
      }
    }
    
    
    if (name === 'threshXHighP') {
      const inputValue = e.target.value;
      const newValue = Number(inputValue);
      const validFormat = /^\d+$/; // Allows only non-negative integers (0 and positive numbers)
    
      const updatedCellConfigData = cellConfigdata.map((cell: any) => {
        if (cell.cellId === currentCell) {
          return {
            ...cell,
            threshXHighP: value,
          };
        }
        return cell;
      });
    
      setcellConfigdata(updatedCellConfigData);
    
      let seletedCellData = updatedCellConfigData.find(function (celldata: any) {
        return celldata.cellId === currentCell;
      });
      setcelldata(seletedCellData);
    
      if (inputValue === '' || inputValue === null || inputValue === undefined) {
        handleError('threshXHighP', 'threshXHighP is a mandatory field');
        valid = false;
      } else if (!validFormat.test(inputValue)) {
        handleError('threshXHighP', 'Invalid format, please enter a valid number');
        valid = false;
      } else if (!isNaN(newValue)) {
        if (newValue >= 0 && newValue <= 62) {
          setValue(newValue);
          handleError('threshXHighP', '');
          valid = true;
        } else {
          handleError('threshXHighP', 'Please enter a value between 0 and 62');
          valid = false;
        }
      }
    }
    
    
    if (name === 'threshXHighQ') {
      const inputValue = e.target.value;
      const newValue = Number(inputValue);
      const regex = /^-?(?:0|[1-9]\d*)$/;
    
      const updatedCellConfigData = cellConfigdata.map((cell: any) => {
        // Check if the current cell's ID matches the selectedCellId
        if (cell.cellId === currentCell) {
          // Update the PriorityLabel for the matched cell
          return {
            ...cell,
            threshXHighQ: value,
          };
        }
        // Return the cell as is if no match
        return cell;
      });
      setcellConfigdata(updatedCellConfigData)
      let seletedCellData = updatedCellConfigData.find(function (celldata: any) {
        return celldata.cellId === currentCell;
      });
      setcelldata(seletedCellData);
    
      if (inputValue === '' || inputValue === null || inputValue === undefined) {
        handleError('threshXHighQ','threshXHighQ is a mandatory field');
        valid = false;
      } else if (!isNaN(newValue) && regex.test(inputValue)) {
        if (newValue >= 0 && newValue <= 31) {
          setValue(newValue);
          handleError('threshXHighQ','');
          valid = true;
        } else {
          handleError('threshXHighQ','Please enter a value between 0 and 31');
          valid = false;
        }
      } else {
        handleError('threshXHighQ','Invalid format');
        valid = false;
      }
    }
    
    if (name === 'threshXLowP') {
      const inputValue = e.target.value;
      const newValue = Number(inputValue);
      const validFormat = /^\d+$/; // Allows only non-negative integers (whole numbers)
    
      const updatedCellConfigData = cellConfigdata.map((cell: any) => {
        if (cell.cellId === currentCell) {
          return {
            ...cell,
            threshXLowP: value,
          };
        }
        return cell;
      });
    
      setcellConfigdata(updatedCellConfigData);
    
      let seletedCellData = updatedCellConfigData.find(function (celldata: any) {
        return celldata.cellId === currentCell;
      });
      setcelldata(seletedCellData);
    
      if (inputValue === '' || inputValue === null || inputValue === undefined) {
        handleError('threshXLowP', 'threshXLowP is a mandatory field');
        valid = false;
      } else if (!validFormat.test(inputValue)) {
        handleError('threshXLowP', 'Invalid format, please enter a valid number');
        valid = false;
      } else if (!isNaN(newValue)) {
        if (newValue >= 0 && newValue <= 62) {
          setValue(newValue);
          handleError('threshXLowP', '');
          valid = true;
        } else {
          handleError('threshXLowP', 'Please enter a value between 0 and 62');
          valid = false;
        }
      }
    }
    
    
    if (name === 'threshXLowQ') {
      const inputValue = e.target.value;
      const newValue = Number(inputValue);
      const validFormat = /^\d+$/; // Allows only non-negative integers (whole numbers)
    
      const updatedCellConfigData = cellConfigdata.map((cell: any) => {
        if (cell.cellId === currentCell) {
          return {
            ...cell,
            threshXLowQ: value,
          };
        }
        return cell;
      });
    
      setcellConfigdata(updatedCellConfigData);
    
      let seletedCellData = updatedCellConfigData.find(function (celldata: any) {
        return celldata.cellId === currentCell;
      });
      setcelldata(seletedCellData);
    
      if (inputValue === '' || inputValue === null || inputValue === undefined) {
        handleError('threshXLowQ', 'threshXLowQ is a mandatory field');
        valid = false;
      } else if (!validFormat.test(inputValue)) {
        handleError('threshXLowQ', 'Invalid format, please enter a valid number');
        valid = false;
      } else if (!isNaN(newValue)) {
        if (newValue >= 0 && newValue <= 31) {
          setValue(newValue);
          handleError('threshXLowQ', '');
          valid = true;
        } else {
          handleError('threshXLowQ', 'Please enter a value between 0 and 31');
          valid = false;
        }
      }
    }
    
    if (name === 'tReselectionNR') {
      const inputValue = e.target.value;
      const newValue = Number(inputValue);
      const validFormat = /^\d+$/; // Allows only non-negative integers (whole numbers)
    
      const updatedCellConfigData = cellConfigdata.map((cell: any) => {
        if (cell.cellId === currentCell) {
          return {
            ...cell,
            tReselectionNR: value,
          };
        }
        return cell;
      });
    
      setcellConfigdata(updatedCellConfigData);
    
      let seletedCellData = updatedCellConfigData.find(function (celldata: any) {
        return celldata.cellId === currentCell;
      });
      setcelldata(seletedCellData);
    
      if (inputValue === '' || inputValue === null || inputValue === undefined) {
        handleError('tReselectionNR', 'tReselectionNR is a mandatory field');
        valid = false;
      } else if (!validFormat.test(inputValue)) {
        handleError('tReselectionNR', 'Invalid format, please enter a valid number');
        valid = false;
      } else if (!isNaN(newValue)) {
        if (newValue >= 0 && newValue <= 7) {
          setValue(newValue);
          handleError('tReselectionNR', '');
          valid = true;
        } else {
          handleError('tReselectionNR', 'Please enter a value between 0 and 7');
          valid = false;
        }
      }
    }
    

    if (name === 'tReselectionNRSfMedium') {
      const inputValue = e.target.value;
      const validValues = [25, 50, 75, 100]; // Valid values for tReselectionNRSfMedium
    
      const updatedCellConfigData = cellConfigdata.map((cell: any) => {
        if (cell.cellId === currentCell) {
          return {
            ...cell,
            tReselectionNRSfMedium: inputValue,
          };
        }
        return cell;
      });
    
      setcellConfigdata(updatedCellConfigData);
      const selectedCellData = updatedCellConfigData.find((celldata: any) => celldata.cellId === currentCell);
      setcelldata(selectedCellData);
    
      const newValue = Number(inputValue);
    
      // Separate validation for format, mandatory, and valid values
      if (inputValue === '') {
        handleError('tReselectionNRSfMedium', 'tReselectionNRSfMedium is a mandatory field.');
        valid = false;
      } else if (isNaN(newValue)) {
        handleError('tReselectionNRSfMedium', 'Invalid format. Please enter a number.');
        valid = false;
      } else if (!validValues.includes(newValue)) {
        handleError('tReselectionNRSfMedium', 'Please enter a value from 25, 50, 75, or 100.');
        valid = false;
      } else {
        handleError('tReselectionNRSfMedium', ''); // No error
        valid = true;
      }
    }
  
    if (name === 'tReselectionNRSfHigh') {
      const inputValue = e.target.value;
      const validValues = [25, 50, 75, 100]; // Valid values for tReselectionNRSfHigh
    
      const updatedCellConfigData = cellConfigdata.map((cell: any) => {
        if (cell.cellId === currentCell) {
          return {
            ...cell,
            tReselectionNRSfHigh: inputValue,
          };
        }
        return cell;
      });
    
      setcellConfigdata(updatedCellConfigData);
      const selectedCellData = updatedCellConfigData.find((celldata: any) => celldata.cellId === currentCell);
      setcelldata(selectedCellData);
    
      const newValue = Number(inputValue);
    
      // Separate validation for format, mandatory, and valid values
      if (inputValue === '') {
        handleError('tReselectionNRSfHigh', 'tReselectionNRSfHigh is a mandatory field.');
        valid = false;
      } else if (isNaN(newValue)) {
        handleError('tReselectionNRSfHigh', 'Invalid format. Please enter a number.');
        valid = false;
      } else if (!validValues.includes(newValue)) {
        handleError('tReselectionNRSfHigh', 'Please enter a value from 25, 50, 75, or 100.');
        valid = false;
      } else {
        handleError('tReselectionNRSfHigh', ''); // No error
        valid = true;
      }
    }


    
     if (name === 'nRFrequencyref') {
      const inputValue = e.target.value.trim();          
      const ldapRegex = /^[a-zA-Z0-9-]+=(?:[^\\><;\"+, \x00-\x1F\x7F]|\\[\\><;\"+, \x00-\x1F])*$/;       
      const updatedCellConfigData = cellConfigdata.map((cell: any) => {
        // Check if the current cell's ID matches the selectedCellId
        if (cell.cellId === currentCell) {
          // Update the PriorityLabel for the matched cell
          return {
            ...cell,
            nRFrequencyref: value,
          };
        }
        // Return the cell as is if no match
        return cell;
      });
      setcellConfigdata(updatedCellConfigData)
      let seletedCellData = updatedCellConfigData.find(function (celldata: any) {
        return celldata.cellId === currentCell;
      });
      setcelldata(seletedCellData);
         
      if (!ldapRegex.test(inputValue)) {
        handleError('nRFrequencyref','Invalid format.');
          console.log("Invalid input:", inputValue);  
      } else {
        handleError('nRFrequencyref','');  
        
          console.log("Valid input:", inputValue);  
      }
  }    
    
    
    if (name == 'RRHModel') {
      const updatedCellConfigData = cellConfigdata.map((cell: any) => {
        // Check if the current cell's ID matches the selectedCellId
        if (cell.cellId === currentCell) {
          // Update the PriorityLabel for the matched cell
          return {
            ...cell,
            RRHModel: value,
          };
        }
        // Return the cell as is if no match
        return cell;
      });
      setcellConfigdata(updatedCellConfigData)
      let seletedCellData = updatedCellConfigData.find(function (celldata: any) {
        return celldata.cellId === currentCell;
      });
      setcelldata(seletedCellData);
    }
     
       
    
    if (name === 'txDelay') {
      const inputValue = e.target.value.trim();
      const decimalRegex = /^-?\d+\.\d+$/; // Ensure at least one digit before and after the decimal point
      
      RRHList[selectedRRHindex].txDelay = inputValue; // Update state immediately
  
      const updatedCellConfigData = cellConfigdata.map((cell: any) => {
          if (cell.cellId === currentCell) {
              return {
                  ...cell,
                  RRHList: RRHList,
              };
          }
          return cell;
      });
  
      setcellConfigdata(updatedCellConfigData);
      let selectedCellData = updatedCellConfigData.find((celldata: any) => celldata.cellId === currentCell);
      setcelldata(selectedCellData);
  
      if (inputValue === '') {
          handleError('TxDelay', '');
          setRrhErrorIndex(prevState => ({
              ...prevState,
              [currentCell]: {
                  ...prevState[currentCell],
                  [currentRRH]: {
                      ...(prevState[currentCell]?.[currentRRH] || {}),
                      TxDelay: ''
                  }
              }
          }));
          valid = true;
      } else if (decimalRegex.test(inputValue)) {
          const newValue = parseFloat(inputValue);
          if (newValue >= -999999999999.9999 && newValue <= 999999999999.9999) {
              handleError('TxDelay', '');
              setRrhErrorIndex(prevState => ({
                  ...prevState,
                  [currentCell]: {
                      ...prevState[currentCell],
                      [currentRRH]: {
                          ...(prevState[currentCell]?.[currentRRH] || {}),
                          TxDelay: ''
                      }
                  }
              }));
              valid = true;
          } else {
              handleError('TxDelay', 'txDelay should be between -999,999,999,999.9999 and 999,999,999,999.9999');
              setRrhErrorIndex(prevState => ({
                  ...prevState,
                  [currentCell]: {
                      ...prevState[currentCell],
                      [currentRRH]: {
                          ...(prevState[currentCell]?.[currentRRH] || {}),
                          TxDelay: 'txDelay should be between -999,999,999,999.9999 and 999,999,999,999.9999'
                      }
                  }
              }));
              valid = false;
          }
      } else {
          handleError('TxDelay', 'Invalid input for txDelay');
          setRrhErrorIndex(prevState => ({
              ...prevState,
              [currentCell]: {
                  ...prevState[currentCell],
                  [currentRRH]: {
                      ...(prevState[currentCell]?.[currentRRH] || {}),
                      TxDelay: 'Invalid input for txDelay'
                  }
              }
          }));
          valid = false;
      }
  }
  
  
    
    

    
  if (name === 'rxDelay') {
    const inputValue = e.target.value.trim();
    const decimalRegex = /^-?\d+\.\d+$/; // Ensure at least one digit before and after the decimal point
    
    RRHList[selectedRRHindex].rxDelay = inputValue; // Update state immediately

    const updatedCellConfigData = cellConfigdata.map((cell: any) => {
        if (cell.cellId === currentCell) {
            return {
                ...cell,
                RRHList: RRHList,
            };
        }
        return cell;
    });

    setcellConfigdata(updatedCellConfigData);
    let selectedCellData = updatedCellConfigData.find((celldata: any) => celldata.cellId === currentCell);
    setcelldata(selectedCellData);

    if (inputValue === '') {
        handleError('RxDelay', '');
        setRrhErrorIndex(prevState => ({
            ...prevState,
            [currentCell]: {
                ...prevState[currentCell],
                [currentRRH]: {
                    ...(prevState[currentCell]?.[currentRRH] || {}),
                    RxDelay: ''
                }
            }
        }));
        valid = true;
    } else if (decimalRegex.test(inputValue)) {
        const newValue = parseFloat(inputValue);
        if (newValue >= -999999999999.9999 && newValue <= 999999999999.9999) {
            handleError('RxDelay', '');
            setRrhErrorIndex(prevState => ({
                ...prevState,
                [currentCell]: {
                    ...prevState[currentCell],
                    [currentRRH]: {
                        ...(prevState[currentCell]?.[currentRRH] || {}),
                        RxDelay: ''
                    }
                }
            }));
            valid = true;
        } else {
            handleError('RxDelay', 'rxDelay should be between -999,999,999,999.9999 and 999,999,999,999.9999');
            setRrhErrorIndex(prevState => ({
                ...prevState,
                [currentCell]: {
                    ...prevState[currentCell],
                    [currentRRH]: {
                        ...(prevState[currentCell]?.[currentRRH] || {}),
                        RxDelay: 'rxDelay should be between -999,999,999,999.9999 and 999,999,999,999.9999'
                    }
                }
            }));
            valid = false;
        }
    } else {
        handleError('RxDelay', 'Invalid input for rxDelay');
        setRrhErrorIndex(prevState => ({
            ...prevState,
            [currentCell]: {
                ...prevState[currentCell],
                [currentRRH]: {
                    ...(prevState[currentCell]?.[currentRRH] || {}),
                    RxDelay: 'Invalid input for rxDelay'
                }
            }
        }));
        valid = false;
    }
}

    



    if (name == 'AntennaPort') {
      const updatedCellConfigData = cellConfigdata.map((cell: any) => {
        // Check if the current cell's ID matches the selectedCellId
        if (cell.cellId === currentCell) {
          // Update the PriorityLabel for the matched cell
          return {
            ...cell,
            AntennaPort: value,
          };
        }
        // Return the cell as is if no match
        return cell;
      });
      setcellConfigdata(updatedCellConfigData)
      let seletedCellData = updatedCellConfigData.find(function (celldata: any) {
        return celldata.cellId === currentCell;
      });
      setcelldata(seletedCellData);
    }
    if (name == 'Tilt') {
      RRHList[selectedRRHindex].Tilt=e.target.value;
      const updatedCellConfigData = cellConfigdata.map((cell: any) => {
        // Check if the current cell's ID matches the selectedCellId
        if (cell.cellId === currentCell) {
          // Update the PriorityLabel for the matched cell
          return {
            ...cell,
            RRHList: RRHList,
          };
        }
        // Return the cell as is if no match
        return cell;
      });
      setcellConfigdata(updatedCellConfigData)
      let seletedCellData = updatedCellConfigData.find(function (celldata: any) {
        return celldata.cellId === currentCell;
      });
      setcelldata(seletedCellData);
    }
  

   if (name === 'TXPower') {
    const inputValue = e.target.value.trim();
    const decimalRegex = /^-?\d+\.\d+$/; // Ensure at least one digit before and after the decimal point
    
    RRHList[selectedRRHindex].txPower = inputValue; // Update state immediately

    const updatedCellConfigData = cellConfigdata.map((cell: any) => {
        if (cell.cellId === currentCell) {
            return {
                ...cell,
                RRHList: RRHList,
            };
        }
        return cell;
    });

    setcellConfigdata(updatedCellConfigData);
    let selectedCellData = updatedCellConfigData.find((celldata: any) => celldata.cellId === currentCell);
    setcelldata(selectedCellData);

    if (inputValue === '') {
        handleError('TxPower', '');
        setRrhErrorIndex(prevState => ({
            ...prevState,
            [currentCell]: {
                ...prevState[currentCell],
                [currentRRH]: {
                    ...(prevState[currentCell]?.[currentRRH] || {}),
                    TxPower: ''
                }
            }
        }));
        valid = true;
    } else if (decimalRegex.test(inputValue)) {
        const newValue = parseFloat(inputValue);
        if (newValue >= -999999999999.9999 && newValue <= 999999999999.9999) {
            handleError('TxPower', '');
            setRrhErrorIndex(prevState => ({
                ...prevState,
                [currentCell]: {
                    ...prevState[currentCell],
                    [currentRRH]: {
                        ...(prevState[currentCell]?.[currentRRH] || {}),
                        TxPower: ''
                    }
                }
            }));
            valid = true;
        } else {
            handleError('TxPower', 'TXPower should be between -999,999,999,999.9999 and 999,999,999,999.9999');
            setRrhErrorIndex(prevState => ({
                ...prevState,
                [currentCell]: {
                    ...prevState[currentCell],
                    [currentRRH]: {
                        ...(prevState[currentCell]?.[currentRRH] || {}),
                        TxPower: 'TXPower should be between -999,999,999,999.9999 and 999,999,999,999.9999'
                    }
                }
            }));
            valid = false;
        }
    } else {
        handleError('TxPower', 'Invalid input for TXPower');
        setRrhErrorIndex(prevState => ({
            ...prevState,
            [currentCell]: {
                ...prevState[currentCell],
                [currentRRH]: {
                    ...(prevState[currentCell]?.[currentRRH] || {}),
                    TxPower: 'Invalid input for TXPower'
                }
            }
        }));
        valid = false;
    }
}

  
    
    
    if (name === 'antennaGain') {
      const inputValue = e.target.value;
      const newValue = Number(inputValue);    
      RRHList[selectedRRHindex].antennaGain = inputValue ;
      const updatedCellConfigData = cellConfigdata.map((cell: any) => {
        // Check if the current cell's ID matches the selectedCellId
        if (cell.cellId === currentCell) {
          // Update the PriorityLabel for the matched cell
          return {
            ...cell,
            RRHList: RRHList,
          };
        }
        // Return the cell as is if no match
        return cell;
      });
      setcellConfigdata(updatedCellConfigData)
      let seletedCellData = updatedCellConfigData.find(function (celldata: any) {
        return celldata.cellId === currentCell;
      });
      setcelldata(seletedCellData);
    
      if (inputValue === '') {
        handleError('AntennaGain','');
        setRrhErrorIndex(prevState => ({
          ...prevState,  // Spread the previous state
          [currentCell]: {
            ...prevState[currentCell],  // Spread existing values for the specific `currentCell`
            [currentRRH]: {
              ...(prevState[currentCell]?.[currentRRH] || {}),  // Preserve the other fields at this index
            AntennaGain: ''  // Update only this specific field
          }
        }
        }));
          valid = false;
          return;
      }
    
      if (!isNaN(newValue)) {
          if (newValue >= 0 && newValue <= 120) {
            handleError('AntennaGain','');
            setRrhErrorIndex(prevState => ({
              ...prevState,  // Spread the previous state
              [currentCell]: {
                ...prevState[currentCell],  // Spread existing values for the specific `currentCell`
                [currentRRH]: {
                  ...(prevState[currentCell]?.[currentRRH] || {}),  // Preserve the other fields at this index
                AntennaGain: ''  // Update only this specific field
              }
            }
            }));
              valid = true;
          } else {
            handleError('AntennaGain','Antenna Gain must be between 0 and 120');
            setRrhErrorIndex(prevState => ({
              ...prevState,  // Spread the previous state
              [currentCell]: {
                ...prevState[currentCell],  // Spread existing values for the specific `currentCell`
                [currentRRH]: {
                  ...(prevState[currentCell]?.[currentRRH] || {}), // Preserve the other fields at this index
                AntennaGain: 'Antenna Gain must be between 0 and 120' 
              }
            }
            }))
              valid = false;
          }
      } else {
        handleError('AntennaGain','Invalid format. Please enter a number.');
        setRrhErrorIndex(prevState => ({
          ...prevState,  // Spread the previous state
          [currentCell]: {
            ...prevState[currentCell],  // Spread existing values for the specific `currentCell`
            [currentRRH]: {
              ...(prevState[currentCell]?.[currentRRH] || {}),  // Preserve the other fields at this index
            AntennaGain: 'Invalid format. Please enter a number.' 
          }
        }
        }))
          valid = false;
      }
      
    }
    
    
    
  // valid = !setErrorDlEarfcn && !setErrorcpriRate && ! setErrorsinrOffsetCsiRs && ! setErrorrsrpOffsetCsiRs && ! setErrorrsrqOffsetCsiRs ;
    setIsFormValid(valid); 
  }
  const PeeParametersDropDownChange = (e: SelectChangeEvent<string>) => {
    const value = e.target.value;
    setSelectedPeeParameters(value); // Update selected peeParameters
    
    const updatedCellConfigData = cellConfigdata.map((cell: any) => {
      // Check if the current cell's ID matches the selectedCellId
      if (cell.cellId === currentCell) {
        // Update the PriorityLabel for the matched cell
        return {
          ...cell,
          peeParameters: value,
        };
      }
      // Return the cell as is if no match
      return cell;
    });
    setcellConfigdata(updatedCellConfigData)
    
  };
  // const ssbPeriodicityDropDownChange = (e: SelectChangeEvent<string>) => {
  //   const value = e.target.value;
  //   setSelectedssbPeriodicity(value); // Update selected  ssbSubCarrierSpacing
    
  //   const updatedCellConfigData = cellConfigdata.map((cell: any) => {
  //     // Check if the current cell's ID matches the selectedCellId
  //     if (cell.cellId === currentCell) {
  //       // Update the PriorityLabel for the matched cell
  //       return {
  //         ...cell,
  //         ssbPeriodicity: value,
  //       };
  //     }
  //     // Return the cell as is if no match
  //     return cell;
  //   });
  //   setcellConfigdata(updatedCellConfigData)
  //   let seletedCellData = updatedCellConfigData.find(function (celldata: any) {
  //     return celldata.cellId === currentCell;
  //   });
  //   setcelldata(seletedCellData);
  // };
 
  const minoModeDownChange = (e: SelectChangeEvent<string>) => {
    const value = e.target.value;
    setSelectedMIMOMode(value); 
    RRHList[selectedRRHindex].mimoMode=value
    const updatedCellConfigData = cellConfigdata.map((cell: any) => {
      // Check if the current cell's ID matches the selectedCellId
      if (cell.cellId === currentCell) {
        // Update the PriorityLabel for the matched cell
        return {
          ...cell,
          RRHList: RRHList,
        };
      }
      // Return the cell as is if no match
      return cell;
    });
    setcellConfigdata(updatedCellConfigData)
    let seletedCellData = updatedCellConfigData.find(function (celldata: any) {
      return celldata.cellId === currentCell;
    });
    setcelldata(seletedCellData);
   
  };
  // const BandwidthDropDownChange = (e: SelectChangeEvent<string>) => {
  //   const value = e.target.value;
  //   setSelectedBandwidth(value); 
  //   RRHList[selectedRRHindex].bandWidth=value
  //   const updatedCellConfigData = cellConfigdata.map((cell: any) => {
  //     // Check if the current cell's ID matches the selectedCellId
  //     if (cell.cellId === currentCell) {
  //       // Update the PriorityLabel for the matched cell
  //       return {
  //         ...cell,
  //         RRHList: RRHList,
  //       };
  //     }
  //     // Return the cell as is if no match
  //     return cell;
  //   });
  //   setcellConfigdata(updatedCellConfigData)
  //   let seletedCellData = updatedCellConfigData.find(function (celldata: any) {
  //     return celldata.cellId === currentCell;
  //   });
  //   setcelldata(seletedCellData);
   
  // };
  const DuplexModeDownChange = (e: SelectChangeEvent<string>) => {
    const value = e.target.value;
    setSelectedDuplexMode(value); 
    RRHList[selectedRRHindex].duplexMode=value
    const updatedCellConfigData = cellConfigdata.map((cell: any) => {
      // Check if the current cell's ID matches the selectedCellId
      if (cell.cellId === currentCell) {
        // Update the PriorityLabel for the matched cell
        return {
          ...cell,
          RRHList: RRHList,
        };
      }
      // Return the cell as is if no match
      return cell;
    });
    setcellConfigdata(updatedCellConfigData)
    let seletedCellData = updatedCellConfigData.find(function (celldata: any) {
      return celldata.cellId === currentCell;
    });
    setcelldata(seletedCellData);
   
  };

  const anatanaTypeDropDownChange = (e: SelectChangeEvent<string>) => {
    const value = e.target.value;
    setSelectedAntennaType(value); 
    RRHList[selectedRRHindex].antennaType=value
    const updatedCellConfigData = cellConfigdata.map((cell: any) => {
      // Check if the current cell's ID matches the selectedCellId
      if (cell.cellId === currentCell) {
        // Update the PriorityLabel for the matched cell
        return {
          ...cell,
          RRHList: RRHList,
        };
      }
      // Return the cell as is if no match
      return cell;
    });
    setcellConfigdata(updatedCellConfigData)
    let seletedCellData = updatedCellConfigData.find(function (celldata: any) {
      return celldata.cellId === currentCell;
    });
    setcelldata(seletedCellData);
   
  };
  const retEnabledDropDownChange = (e: SelectChangeEvent<string>) => {
    const value = e.target.value;
    setselectedRetEnabled(value); 
    RRHList[selectedRRHindex].isRetEnabled=value
    const updatedCellConfigData = cellConfigdata.map((cell: any) => {
      // Check if the current cell's ID matches the selectedCellId
      if (cell.cellId === currentCell) {
        // Update the PriorityLabel for the matched cell
        return {
          ...cell,
          RRHList: RRHList,
        };
      }
      // Return the cell as is if no match
      return cell;
    });
    setcellConfigdata(updatedCellConfigData)
    let seletedCellData = updatedCellConfigData.find(function (celldata: any) {
      return celldata.cellId === currentCell;
    });
    setcelldata(seletedCellData);
   
  };
  const RRHDateDropDownChange = (e: SelectChangeEvent<string>) => {
    const value = e.target.value.toString();
    setSelectedRRHDate(value); // Update selected  RRHDate
    RRHList[selectedRRHindex].setRRHDate=value
    const updatedCellConfigData = cellConfigdata.map((cell: any) => {
      // Check if the current cell's ID matches the selectedCellId
      if (cell.cellId === currentCell) {
        // Update the PriorityLabel for the matched cell
        return {
          ...cell,
          RRHList: RRHList,
        };
      }
      // Return the cell as is if no match
      return cell;
    });
    setcellConfigdata(updatedCellConfigData)
    let seletedCellData = updatedCellConfigData.find(function (celldata: any) {
      return celldata.cellId === currentCell;
    });
    setcelldata(seletedCellData);
  };
  const LoopBackEnabledDropDownChange = (e: SelectChangeEvent<string>) => {
    const value = e.target.value;
    setSelectedLoopBack(value); // Update selected  loopback
    RRHList[selectedRRHindex].isLoopBackEnabled=value
    const updatedCellConfigData = cellConfigdata.map((cell: any) => {
      // Check if the current cell's ID matches the selectedCellId
      if (cell.cellId === currentCell) {
        // Update the PriorityLabel for the matched cell
        return {
          ...cell,
          RRHList: RRHList,
        };
      }
      // Return the cell as is if no match
      return cell;
    });
    setcellConfigdata(updatedCellConfigData)
    let seletedCellData = updatedCellConfigData.find(function (celldata: any) {
      return celldata.cellId === currentCell;
    });
    setcelldata(seletedCellData);
   
  };
  // const tReselectionNRSfHighDropDownChange = (e: SelectChangeEvent<string>) => {
  //   const value = e.target.value;
  //   setSelectedtReselectionNRSfHigh(value); // Update selected  RET
    
  //   const updatedCellConfigData = cellConfigdata.map((cell: any) => {
  //     // Check if the current cell's ID matches the selectedCellId
  //     if (cell.cellId === currentCell) {
  //       // Update the PriorityLabel for the matched cell
  //       return {
  //         ...cell,
  //         tReselectionNRSfHigh: value,
  //       };
  //     }
  //     // Return the cell as is if no match
  //     return cell;
  //   });
  //   setcellConfigdata(updatedCellConfigData)
  //   let seletedCellData = updatedCellConfigData.find(function (celldata: any) {
  //     return celldata.cellId === currentCell;
  //   });
  //   setcelldata(seletedCellData);
  // };
  // const tReselectionNRSfMediumDropDownChange = (e: SelectChangeEvent<string>) => {
  //   const value = e.target.value;
  //   setSelectedtReselectionNRSfMedium(value); // Update selected  RET
   
  //   const updatedCellConfigData = cellConfigdata.map((cell: any) => {
  //     // Check if the current cell's ID matches the selectedCellId
  //     if (cell.cellId === currentCell) {
  //       // Update the PriorityLabel for the matched cell
  //       return {
  //         ...cell,
  //         tReselectionNRSfMedium: value,
  //       };
  //     }
  //     // Return the cell as is if no match
  //     return cell;
  //   });
  //   setcellConfigdata(updatedCellConfigData)
  //   let seletedCellData = updatedCellConfigData.find(function (celldata: any) {
  //     return celldata.cellId === currentCell;
  //   });
  //   setcelldata(seletedCellData);
  // };
  // const CellReselectionSubPriorityDropDownChange = (e: SelectChangeEvent<string>) => {
  //   const value = e.target.value;
  //   setSelectedCellReselectionSubPriority(value); // Update selected  RET
    
  //   const updatedCellConfigData = cellConfigdata.map((cell: any) => {
  //     // Check if the current cell's ID matches the selectedCellId
  //     if (cell.cellId === currentCell) {
  //       // Update the PriorityLabel for the matched cell
  //       return {
  //         ...cell,
  //         CellReselectionSubPriority: value,
  //       };
  //     }
  //     // Return the cell as is if no match
  //     return cell;
  //   });
  //   setcellConfigdata(updatedCellConfigData)
  //   let seletedCellData = updatedCellConfigData.find(function (celldata: any) {
  //     return celldata.cellId === currentCell;
  //   });
  //   setcelldata(seletedCellData);
  // };
  const RRHModelDropDownChange = (e: SelectChangeEvent<string>) => {
    const value = e.target.value;
    setSelectedRRHModel(value);
    RRHList[selectedRRHindex].RRHModel=value
    const updatedCellConfigData = cellConfigdata.map((cell: any) => {
      // Check if the current cell's ID matches the selectedCellId
      if (cell.cellId === currentCell) {
        // Update the PriorityLabel for the matched cell
        return {
          ...cell,
          RRHList: RRHList,
        };
      }
      // Return the cell as is if no match
      return cell;
    });
    setcellConfigdata(updatedCellConfigData)
    let seletedCellData = updatedCellConfigData.find(function (celldata: any) {
      return celldata.cellId === currentCell;
    });
    setcelldata(seletedCellData);
  };

  const AntennaTypeDropDownChange = (e: SelectChangeEvent<string>) => {
    const value = e.target.value;
    setSelectedAntennaType(value);
    RRHList[selectedRRHindex].AntennaType=value
    const updatedCellConfigData = cellConfigdata.map((cell: any) => {
      // Check if the current cell's ID matches the selectedCellId
      if (cell.cellId === currentCell) {
        // Update the PriorityLabel for the matched cell
        return {
          ...cell,
          RRHList: RRHList,
        };
      }
      // Return the cell as is if no match
      return cell;
    });
    setcellConfigdata(updatedCellConfigData)
    let seletedCellData = updatedCellConfigData.find(function (celldata: any) {
      return celldata.cellId === currentCell;
    });
    setcelldata(seletedCellData);
  };
  // const ssbSubCarrierSpacingDropDownChange = (e: SelectChangeEvent<string>) => {
  //   const value = e.target.value;
  //   setSelectedssbSubCarrierSpacing(value); // Update selected  ssbSubCarrierSpacing
    
  //   const updatedCellConfigData = cellConfigdata.map((cell: any) => {
  //     // Check if the current cell's ID matches the selectedCellId
  //     if (cell.cellId === currentCell) {
  //       // Update the PriorityLabel for the matched cell
  //       return {
  //         ...cell,
  //         ssbSubCarrierSpacing: value,
  //       };
  //     }
  //     // Return the cell as is if no match
  //     return cell;
  //   });
  //   setcellConfigdata(updatedCellConfigData)
  //   let seletedCellData = updatedCellConfigData.find(function (celldata: any) {
  //     return celldata.cellId === currentCell;
  //   });
  //   setcelldata(seletedCellData);
  // };

  const handleSaveSecessClose = (event: any, reason: string) => {
    event.preventDefault();
    event.stopPropagation();
    setSaveSucesopen(false);
  };

  const handleDeleteConfirmClose = (event: any, reason: string) => {
    event.preventDefault();
    event.stopPropagation();
    setDeleteConfirmopen(false);
  }

  const addNewCell = () => {
    const newCellConfgiData = cellConfigdata?.map((cell :any) => {
      return cell;
    })
    let newCellStatusData = cellStatusdata?.map((cellStatus :any) => {
      return cellStatus;
    })
    //let cellid = "cell"+ Math.floor(Math.random()*(999-100+1)+100);
    let cellid=""
    let isnotexits=false;
    let index;
    for(var i=0;i<=newCellConfgiData.length;i++)
      {
        if (!(newCellConfgiData?.filter(c => c.cellId === "cell"+(i+1)).length > 0)) {
          isnotexits=true;
          index=i+1;
        }

      }
   if(isnotexits)
    {
      cellid= "cell"+index;
      let celldata={cellId: cellid,"arfcnDL": "",
                            "arfcnUL": "",
                            "arfcnSUL": "",
                            "bsChannelBwDL": "",
                            "bsChannelBwUL": "",
                            "ssbPeriodicity": "",
                            "ssbOfset": "",
                            "ssbDuration": "",
                            "ssbFrequency": "",
                            "ssbSubCarrierSpacing": "",
                            "administrativeState": "",
                            "PriorityLabel": "",
                            "NrfID": "",
                            "rsrpOffsetSSB": "",
                            "sinrOffsetSSB": "",
                            "rsrqOffsetSSB": "",
                            "rsrpOffsetCsiRs": "",
                            "rsrqOffsetCsiRs": "",
                            "sinrOffsetCsiRs": "",
                            "peeParameters": "",
                            "CellReselectionPriority": "",
                            "CellReselectionSubPriority": "",
                            "pMax": "",
                            "qOffsetFrequency": "",
                            "qQualMin": "",
                            "qRxLevMin": "",
                            "threshXHighP": "",
                            "threshXHighQ": "",
                            "threshXLowP": "",
                            "threshXLowQ": "",
                            "tReselectionNR": "",
                            "tReselectionNRSfHigh": "",
                            "tReselectionNRSfMedium": "",
                            "nRFrequencyref": "",
                            "RRHList": [
                                {
                                    "id": index,
                                    "mimoMode": "",
                                    "antennaType": "",
                                    "isRetEnabled": "",
                                    "cpriRate": "",
                                    "setRRHDate": "",
                                    "duplexMode": "",
                                    "dlEarfcn": "",
                                    "ulEarfcn": "",
                                    "frequencyBand": "",
                                    "bandWidth": "",
                                    "txDelay": "",
                                    "rxDelay": "",
                                    "isLoopBackEnabled": "",
                                    "mode": "",
                                    "testTime": "",
                                    "antennaId": "",
                                    "antennaGain": "",
                                    "txPower": ""
                                }
                            ]
                          };
      newCellConfgiData.push(celldata);
      let cellstatusdata={cellId: cellid,cellstatus:'maintenance'};
      newCellStatusData.push(cellstatusdata);
      // if(!newCellStatusData)
      // {
      //   newCellStatusData = [];
      //   newCellStatusData.push(cellstatusdata);
      // }
      // else
      // {
      // newCellStatusData.push(cellstatusdata);
      // }
      setErrorIndex({
        ...errorindex,
        [cellid]: {rsrpOffsetSSB: "", sinrOffsetSSB: "",ssbDuration:"",ssbFrequency:"", cellReselectionPriority:"",
          sinrOffsetCsiRs:"", rsrpOffsetCsiRs:"", rsrqOffsetSSB:"", arfcnSUL:"", pMax:"", qQualMin:"",ssbPeriodicity:"",ssbSubCarrierSpacing:"",
          qRxLevMin :"", threshXHighP:"", threshXHighQ: "", threshXLowP:"", tReselectionNR: "", threshXLowQ:"",
          tReselectionNRSfHigh:"", tReselectionNRSfMedium:"", CellReselectionSubPriority: "", PriorityLabel: "",
          ArfcnDL:"", ArfcnUL: "", cpriRate:"", BsChannelBwUL: "", BsChannelBwDL:"", qOffsetFrequency:"",
          DlEarfcn:"", UlEarfcn:"", FrequencyBand:"", TxDelay: "", RxDelay:"", BandWidth:"", TestTime: "",
          AntennaId:"", AntennaGain : "", Mode:"",TxPower:"", nRFrequencyref: "", ssbOffset: "", rsrqOffsetCsiRs: "" },
      })
      setRrhErrorIndex(prevState => ({
        ...prevState,  // Spread the previous state
        [cellid]: {  // Spread the existing values for the specific index
          ...prevState[cellid],  // Preserve other RRH fields for the current cell // Preserve the other fields at this index
          [index]: { cpriRate:"", DlEarfcn:"", UlEarfcn:"", FrequencyBand:"", TxDelay: "", RxDelay:"",  TestTime: "",
            AntennaId:"", AntennaGain : "", Mode:"",TxPower:"", nRFrequencyref: "",BandWidth:"" }, // Update only this specific field
        }
      }));
      console.log(errorindex,"add")
      newCellConfgiData.sort((a:any,b:any) => {
        if (""+a["cellId"]<(""+b["cellId"])) return -1;
        if (""+a["cellId"]>(""+b["cellId"])) return 1;
        return 0;
    });
    newCellStatusData.sort((a:any,b:any) => {
      if (""+a["cellId"]<(""+b["cellId"])) return -1;
      if (""+a["cellId"]>(""+b["cellId"])) return 1;
      return 0;
  });


      setcellConfigdata(newCellConfgiData);
      console.log("newCellConfgiData",newCellConfgiData);
      
      setcellStatusdata(newCellStatusData);
      console.log("newCellStatusData",newCellStatusData);
    }
  }


  const deleteCell = () => {
    const newCellConfgiData = cellConfigdata?.filter((item:any) => item.cellId !== currentCell);
    const newCellStatusData = cellStatusdata?.filter((item:any) => item.cellId !== currentCell);
    cellConfigdata=newCellConfgiData;
    setcellConfigdata(newCellConfgiData);
    setcellStatusdata(newCellStatusData);
    cellStatusdata=newCellStatusData;
    setErrorIndex(prevState => {
      const { [currentCell]: _, ...rest } = prevState;  // Extract 'selqosid' and discard it
      return rest;  // Return the remaining object without 'selqosid'
    })
    setRrhErrorIndex(prevState => {
      const { [currentCell]: _, ...rest } = prevState;  // Extract 'selqosid' and discard it
      return rest;  // Return the remaining object without 'selqosid'
    })
    setcurrentRRH(0)
    console.log(errorindex,"delete")
    const baseUri = `${window.location.origin}`;
    const DbPath = baseUri+"/cell_config/_doc/" + nodeId;
    const DbPath1 = baseUri+"/cell_status/_doc/" + nodeId;
    axios.post(DbPath,
        {
        cellConfigdata
      }).then(function (resp: any) {
        const result = resp;
        setSaveSucesopen(true);
        setSucessmsg(currentCell +" is deleted successfully");
        setsavedialogTitle("Success");

        setCurrentTreeIndex(0);
        setcurrentCell('');
        setDeleteConfirmopen(false);
        axios.post(DbPath1,
          {
            cellStatusdata
            }).then(function (resp: any) {
             console.log(currentCell +" is deleted successfully");
            }, function (err: { message: any; }) {
              const result = err.message;
              console.log(err.message);
            })
      }, function (err: { message: any; }) {
        const result = err.message;
        console.log(err.message);
        setDeleteConfirmopen(false);
      })

  };

  const saveData = () => {
    let valid = false;
    // Check if all values in `errorindex` are empty strings
const isErrorIndexValid = Object.keys(errorindex).every((cellKey: string) => 
  Object.keys(errorindex[cellKey]).every((key) => errorindex[cellKey][key] === '')
);

// Check if all nested values in `rrherrorindex` are empty strings
const isRrhErrorIndexValid = Object.keys(rrherrorindex).every((cellKey: string) =>
  Object.keys(rrherrorindex[cellKey]).every((key) => 
    Object.keys(rrherrorindex[cellKey][key]).every((nestedKey) => rrherrorindex[cellKey][key][nestedKey] === '')
  )
);

// Final validation: both `errorindex` and `rrherrorindex` must be valid
 valid = isErrorIndexValid && isRrhErrorIndexValid;

    if (valid) {
    const newCellConfgiData = cellConfigdata?.map((cell :any) => {
      return cell;
    })
    var isCellFound = cellConfigdata?.some((item:any) => currentCell === item?.cellId);
    if(isCellFound)
      {
        const currentCellData = newCellConfgiData?.map((cell: any) => {
          if (cell.cellId === celldata.cellId) {
            //return { ...cell, ['celldata']: celldata  };
            cell=celldata;
          }
          return cell;
        });
        setcellConfigdata(currentCellData);
        cellConfigdata=currentCellData;
      }
      else{
        celldata.cellId=currentCell;
        cellConfigdata.push(celldata);
      }
      const updatedCellConfigData = cellConfigdata?.map((cell: any) => {
        return {
            ...cell,
            arfcnUL: cell?.arfcnUL === "" ? 0 : cell?.arfcnUL,
            arfcnSUL: cell?.arfcnSUL === "" ? 0 : cell?.arfcnSUL,
            bsChannelBwDL: cell?.bsChannelBwDL === "" ? 0 : cell?.bsChannelBwDL,
            bsChannelBwUL: cell?.bsChannelBwUL === "" ? 0 : cell?.bsChannelBwUL,
            rsrpOffsetCsiRs: cell?.rsrpOffsetCsiRs === "" ? 0 : cell?.rsrpOffsetCsiRs,
            rsrqOffsetSSB: cell?.rsrqOffsetSSB === "" ? 0 : cell?.rsrqOffsetSSB,
            sinrOffsetSSB: cell?.sinrOffsetSSB === "" ? 0 : cell?.sinrOffsetSSB,
            rsrpOffsetSSB: cell?.rsrpOffsetSSB === "" ? 0 : cell?.rsrpOffsetSSB,
            rsrqOffsetCsiRs: cell?.rsrqOffsetCsiRs === "" ? 0 : cell?.rsrqOffsetCsiRs,
            sinrOffsetCsiRs: cell?.sinrOffsetCsiRs === "" ? 0 : cell?.sinrOffsetCsiRs
        };
    });

    const updatedCellConfigData1 = updatedCellConfigData?.map((cell: any) => {
      if (cell && Array.isArray(cell.RRHList)) {
          return {
              ...cell,
              RRHList: cell.RRHList.map((rrh: any) => {
                  return {
                      ...rrh,  
                      cpriRate: rrh?.cpriRate === "" ? 0 : rrh?.cpriRate,
                      isRetEnabled: rrh?.isRetEnabled === "" ? true : rrh?.isRetEnabled,
                      setRRHDate: rrh?.setRRHDate === "" ? true : rrh?.setRRHDate,
                      dlEarfcn: rrh?.dlEarfcn === "" ? 0 : rrh?.dlEarfcn,
                      ulEarfcn: rrh?.ulEarfcn === "" ? 0 : rrh?.ulEarfcn,
                      frequencyBand: rrh?.frequencyBand === "" ? 0 : rrh?.frequencyBand,
                      bandWidth: rrh?.bandWidth === "" ? 0 : rrh?.bandWidth,
                      txDelay: rrh?.txDelay === "" ? "0.0" : rrh?.txDelay,
                      rxDelay: rrh?.rxDelay === "" ? "0.0" : rrh?.rxDelay,
                      isLoopBackEnabled: rrh?.isLoopBackEnabled === "" ? false : rrh?.isLoopBackEnabled,
                      mode: rrh?.mode === "" ? 0 : rrh?.mode,
                      testTime: rrh?.testTime === "" ? 0 : rrh?.testTime,
                      antennaId: rrh?.antennaId === "" ? 0 : rrh?.antennaId,
                      antennaGain: rrh?.antennaGain === "" ? 0 : rrh?.antennaGain,
                      txPower: rrh?.txPower === "" ? "0.0" : rrh?.txPower
                  };
              })
          };
      }
      return cell;  // Return cell as is if RRHList is not an array
  });
  
    cellConfigdata = updatedCellConfigData1;
    const baseUri = `${window.location.origin}`;
    const DbPath = baseUri+"/cell_config/_doc/" + nodeId;
    const DbPath1 = baseUri+"/cell_status/_doc/" + nodeId;
    axios.post(DbPath,
        {
        cellConfigdata
      }).then(function (resp: any) {
        const result = resp;
        axios.post(DbPath1,
          {
          cellStatusdata
        }).then(function (resp: any) {
          const result = resp;
        }, function (err: { message: any; }) {
          const result = err.message;
          console.log(err.message);
        })
        setSaveSucesopen(true);
        setSucessmsg("Data saved successfully");
        setsavedialogTitle("Success");
      }).catch( function (err: { message: any; }) {
        // const result = err.message;
        // console.log(err.message);
         setSaveSucesopen(true);
         setSucessmsg(err.message);
         setsavedialogTitle("Error");
       });
   } else {
     setSaveSucesopen(true);
     setSucessmsg('Please verify all fields is valid or not. Cannot save data.');
     setsavedialogTitle("Validation Error");
   }
 };

  const handleRRHTreeItemClick = (itenId: string, cellItem: any, RRHIndexId: any,rrhindex:any) => {
    document?.getElementById('_omDiv')?.scrollTo(0,0);
    setcurrentCell(cellItem.cellId);
    let seletedCellData = cellConfigdata?.find(function (celldata: any) {
      return celldata?.cellId === cellItem.cellId;
    });
    setcelldata(seletedCellData);
    if(itenId==="4"){
      console.log(rrherrorindex)
      setRRHList(seletedCellData.RRHList);
      setcurrentRRH(RRHIndexId);
      setselectedRRHindex(rrhindex);
      RRHList=cellItem?.RRHList;
      setRRHList(cellItem?.RRHList);
      setSelectedLoopBack(cellItem?.RRHList[rrhindex]?.isLoopBackEnabled);
      setselectedRetEnabled(cellItem?.RRHList[rrhindex]?.isRetEnabled);
      setSelectedRRHDate(cellItem?.RRHList[rrhindex]?.setRRHDate);
      setSelectedMIMOMode(cellItem?.RRHList[rrhindex]?.mimoMode);
      setSelectedAntennaType(cellItem?.RRHList[rrhindex]?.antennaType);
      setSelectedDuplexMode(cellItem?.RRHList[rrhindex]?.duplexMode);
      // setSelectedBandwidth(cellItem?.RRHList[rrhindex]?.bandWidth);
    }
    if (itenId) {
      setCurrentTreeIndex(parseInt(itenId))
    } 
  }

const changeCellStatus = (cellItem) => {
  //  alert(cellItem.cellstatus)
   var newCellstausData = cellStatusdata?.map(cell => {
    if (cell.cellId === cellItem.cellId) {
      return {
        ...cell,
        ['cellId']:cellItem.cellId,
        ['cellstatus']:cellItem.cellstatus =="outOfService"? "inService" :cellItem.cellstatus =="inService"? "outOfService" :"outOfService"
      };
    }
    return cell;
  });
  setcellStatusdata(newCellstausData)
  cellStatusdata=newCellstausData;
  const baseUri = `${window.location.origin}`
  const DbPath = baseUri+"/cell_status/_doc/" + nodeId;
  axios.put(DbPath,
    {
      cellStatusdata
    }).then(function (resp: any) {
      const result = resp;
    }), function (err: { message: any; }) {
      const result = err.message;
      console.log(err.message);
    }
  }
  const addRRH = () => {
    let RRHListNew : any[] = [];
    if(RRHList && RRHList?.length>0)
    {
     RRHListNew=RRHList?.map((rrhdata :any) => {
      return rrhdata;
    })
    console.log(RRHListNew)

    let id = 1;
    let isnotexits=false;
    let index = 1;
    for(var i=1;i <= RRHList?.length;i++)
      {
        if (!(RRHListNew?.filter(c => c.id === i)?.length > 0)) {
          isnotexits=true;
          index=i;
          break;
        }
      }
   if(isnotexits)
    {
      id= index;
    }else{
      id=RRHList?.length+1;
    }
    setRrhErrorIndex(prevState => ({
      ...prevState,  // Spread the previous state
      [currentCell]: {  // Spread the existing values for the specific index
        ...prevState[currentCell],  // Preserve other RRH fields for the current cell // Preserve the other fields at this index
        [id]: { cpriRate:"", DlEarfcn:"", UlEarfcn:"", FrequencyBand:"", TxDelay: "", RxDelay:"",  TestTime: "",
          AntennaId:"", AntennaGain : "", Mode:"",TxPower:"", nRFrequencyref: "",BandWidth:"" }, // Update only this specific field
      }
    }));
    console.log(rrherrorindex)
    RRHListNew?.push({id: id,mimoMode:"",antennaType: "", cpriRate: "", setRRHDate: "", duplexMode : "", dlEarfcn:"",ulEarfcn:"",frequencyBand:"",bandWidth:"",txDelay:"",rxDelay:"",isLoopBackEnabled:"",isRetEnabled: "",mode:"",antennaId:"",antennaGain:"",txPower:"",testTime:""})
    RRHListNew?.sort((a:any,b:any) => {
        if (""+a["id"]<(""+b["id"])) return -1;
        if (""+a["id"]>(""+b["id"])) return 1;
        return 0;
    });
  }
  else{
    //RRHListNew?.push({id: 1 })
    RRHListNew?.push({id: 1,mimoMode:"",antennaType: "", cpriRate: "", setRRHDate: "", duplexMode : "", dlEarfcn: "",ulEarfcn:"",frequencyBand:"",bandWidth:"",txDelay:"",rxDelay:"",isLoopBackEnabled:"",isRetEnabled: "",mode:"",antennaId:"",antennaGain:"",txPower:"",testTime:""})
    setRrhErrorIndex(prevState => ({
      ...prevState,  // Spread the previous state
      [currentCell]: {  // Spread the existing values for the specific index
        ...prevState[currentCell],  // Preserve other RRH fields for the current cell // Preserve the other fields at this index
        1: { cpriRate:"", DlEarfcn:"", UlEarfcn:"", FrequencyBand:"", TxDelay: "", RxDelay:"",  TestTime: "",
          AntennaId:"", AntennaGain : "", Mode:"",TxPower:"", nRFrequencyref: "",BandWidth:"" }, // Update only this specific field
      }
    }));
  }
    RRHList = RRHListNew
    setRRHList(RRHListNew);
    celldata.RRHList=RRHList;
    // setcelldata({
    //  ...celldata,
    //   ["RRHList"]:RRHList
    // });
  }    
  const deleteRRH = () => {
    const RRHListNew = RRHList?.filter((item) => item.id !== currentRRH);
    console.log(currentRRH)
    RRHList = RRHListNew;
    setRRHList(RRHListNew);
    setRrhErrorIndex((prevState) => {
      // Destructure to extract `currentCell` and its object from the previous state
      const { [currentCell]: currentCellObj, ...restCells } = prevState;
      
      if (currentCellObj) {
        // Destructure to extract `currentRRH` from the `currentCellObj`
        const { [currentRRH]: _, ...restRRHs } = currentCellObj; // Use `_` to discard `currentRRH`
        console.log(restCells,restRRHs)
        // Return the updated state with `currentRRH` removed from `currentCell`
        return {
          ...restCells, // Spread the previous state
          [currentCell]: restRRHs // Update the `currentCell` with remaining RRHs
        };
      }
    
      // If `currentCell` is not found, return the previous state unchanged
      return prevState;
    });
    
    
    setselectedRRHindex(null);
    // setcelldata({
    //   ...celldata,
    //   ["RRHList"]:RRHList
    // });
    celldata.RRHList=RRHList;
  }
//It displays duplicate cell Local Id's
  // const fetchDuConfigData = (nodeId: any) => {
  //   const baseUri = `${window.location.origin}`;
  //   const DbPath = baseUri + "/du_config/_search/";
  
  //   const query = {
  //     "_source": ["duConfigdata.NRCellDUList.CellLocalId"],
  //     "query": {
  //       "term": {
  //         "_id": nodeId
  //       }
  //     }
  //   };
  
  //   axios.post(DbPath, query)
  //     .then((res) => {
  //       // Access the first hit from the response
  //       const duConfigData = res.data.hits.hits[0]._source.duConfigdata;
        
  //       // Ensure that duConfigData is an array and has elements
  //       if (Array.isArray(duConfigData) && duConfigData.length > 0) {
  //         // Extract NRCellDUList from the first element
  //         const NRCellDUList = duConfigData[0].NRCellDUList;
  
  //         // Ensure NRCellDUList is an array before mapping
  //         if (Array.isArray(NRCellDUList)) {
  //           // Extract CellLocalId values
  //           const cellLocalIds = NRCellDUList.map((cell: any) => cell.CellLocalId);
  //           setCellLocalIds(cellLocalIds);
  //           console.log(cellLocalIds);  // Logs all CellLocalId values from NRCellDUList
  //         } else {
  //           console.log('NRCellDUList is not an array.');
  //         }
  //       } else {
  //         console.log('duConfigdata is not an array or is empty.');
  //       }
  //     })
  //     .catch((err: any) => {
  //       console.log(err);
  //     });
  // }
  

  //It displays distinct values
  // const fetchDuConfigData = (nodeId: any) => {
  //   const baseUri = `${window.location.origin}`;
  //   const DbPath = baseUri + "/du_config/_search/";
  
  //   const query = {
  //     "_source": ["duConfigdata.NRCellDUList.CellLocalId"],
  //     "query": {
  //       "term": {
  //         "_id": nodeId
  //       }
  //     }
  //   };
  
  //   axios.post(DbPath, query)
  //     .then((res) => {
  //       // Handle the response here
  //       const NRCellDUList = res.data.hits.hits[0]._source.duConfigdata[0].NRCellDUList;
        
  //       // Extract and deduplicate CellLocalId values
  //       const cellLocalIds: number[] = NRCellDUList.map((cell: any) => cell.CellLocalId);
  //       const uniqueCellLocalIds: number[] = Array.from(new Set(cellLocalIds));
  
  //       setCellLocalIds(uniqueCellLocalIds);
  //       console.log(uniqueCellLocalIds);  // This will log only unique CellLocalId values
        
  //     })
  //     .catch((err: any) => {
  //       console.log(err);
  //     });
  // }
  

//cellid and cellLocalId
  // const fetchDuConfigData = (nodeId: any) => {
  //   const baseUri = `${window.location.origin}`;
  //   const DbPath = baseUri + "/du_config/_search/";
  
  //   const query = {
  //     "_source": ["duConfigdata.NRCellDUList.CellLocalId", "duConfigdata.NRCellDUList.cellId"],
  //     "query": {
  //       "term": {
  //         "_id": nodeId
  //       }
  //     }
  //   };
  
  //   axios.post(DbPath, query)
  //     .then((res) => {
  //       // Handle the response here
  //       const NRCellDUList = res.data.hits.hits[0]._source.duConfigdata[0].NRCellDUList;
        
  //       // Create a mapping of CellLocalId to cellId values
  //       const cellIdMap: { [key: number]: string[] } = {};
        
  //       NRCellDUList.forEach((cell: any) => {
  //         const { CellLocalId, cellId } = cell;
  //         if (CellLocalId && cellId) {
  //           if (!cellIdMap[CellLocalId]) {
  //             cellIdMap[CellLocalId] = [];
  //           }
  //           cellIdMap[CellLocalId].push(cellId);
  //         }
  //       });
        
  //       // Display the mapping
  //       for (const [cellLocalId, cellIds] of Object.entries(cellIdMap)) {
  //         console.log(`${cellLocalId} --> ${cellIds.join(', ')}`);
  //       }
  
  //       // Optionally, you can set this mapping to a state or use it in other ways
  //       setCellLocalIdMap(cellIdMap);
  
  //     })
  //     .catch((err: any) => {
  //       console.log(err);
  //     });
  // }
  
  

  return (
    <div style={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'row' }}>
      <div >
      <Dialog open={DeleteConfirmopen} onClose={handleDeleteConfirmClose}
       PaperProps={{style: { minHeight: '12vh',  minWidth: '23vw',border: '14px solid #38456a',  borderRadius: '15px', backgroundColor: '#e8e8e8' } }} >
      {/* <DialogTitle id="form-sucdialog-title" > {savedialogTitle}</DialogTitle> */}
          <DialogContent style={{alignContent:'center',textAlign:"center"}}>
              <IconButton style={{ color : 'red', textAlign:"center" }}> <HelpOutlineRoundedIcon /> <h6 style={{ marginLeft:'3px', color : 'red', textAlign:"center" }}>Do you want delete {currentCell} Config</h6> </IconButton>
          </DialogContent>
        <DialogActions>
            <Button onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              deleteCell();
            }} style={{ backgroundColor: 'white', color: '#38761d', border: '1px solid #2986cc', borderRadius: '1px', padding: '3px 6px' }}>
            Yes
            </Button>
            <Button onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              setDeleteConfirmopen(false);
            }} style={{ backgroundColor: 'white', color: '#38761d', border: '1px solid #2986cc', borderRadius: '1px', padding: '3px 6px' }}>
              No
            </Button>
        </DialogActions>
      </Dialog>   <div >
      <Dialog open={SaveSucesopen} onClose={handleSaveSecessClose}
       PaperProps={{style: { minHeight: '12vh',  minWidth: '23vw',border: '14px solid #38456a',  borderRadius: '15px', backgroundColor: '#e8e8e8' } }} >
      {/* <DialogTitle id="form-sucdialog-title" > {savedialogTitle}</DialogTitle> */}
      <DialogContent style={{alignContent:'center',textAlign:"center"}}>
              {/* <IconButton style={{ color: savedialogTitle == "Success" ? '#008000' : 'orange', textAlign: "center" }}> <CheckCircleOutlineRoundedIcon /> <h6 style={{ marginLeft: '3px', color: savedialogTitle == "Success" ? '#008000' : 'orange', textAlign: "center" }}>{Sucessmsg}</h6> </IconButton> */}
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
      </div>
      <div style={{width:'99%', height:'99%', overflow: 'auto' }}>
      <div style={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'row' }}>
     <div style={{ width: '38%', padding: '1%' }}>
         <Box style={{ height: '84%', width: '99%', border: '1px solid #ccc', borderRadius: '2px', overflow: 'auto' }}>
            <TreeView defaultCollapseIcon={<ExpandMore />} style={{ width: '94%' }} defaultExpandIcon={<ChevronRightIcon />} defaultExpanded={['0']} >
            {cellConfigdata?.map((cellItem:any, index:number)  => (
             <div> 
               <TreeItem nodeId={((index*5)+0).toString()}  label= {cellItem?.cellId}  onClick={() => handCellClick(cellItem?.cellId)} sx={{ ".MuiTreeItem-content.Mui-selected .MuiTreeItem-label": { color: '#ffffff', backgroundColor: '#53659c' } }}>
                <TreeItem nodeId={((index*5)+1).toString()}  label="Basic config" onClick={() => handleTreeItemClick("1",cellItem?.cellId)} sx={{ ".MuiTreeItem-content.Mui-selected.Mui-focused": { color: '#ffffff', backgroundColor: '#53659c' } }} />
                <TreeItem nodeId={((index*5)+2).toString()} label="DuCell Parameter" onClick={() => handleTreeItemClick("2",cellItem?.cellId)} sx={{ ".MuiTreeItem-content.Mui-selected.Mui-focused": { color: '#ffffff', backgroundColor: '#53659c' } }} />
                <TreeItem nodeId={((index*5)+3).toString()} label="CuCell Parameter" onClick={() => handleTreeItemClick("3",cellItem?.cellId)} sx={{ ".MuiTreeItem-content.Mui-selected.Mui-focused": { color: '#ffffff', backgroundColor: '#53659c' } }} />
                {/* <TreeItem nodeId={((index*5)+4).toString()} label="RRH" onClick={() => handleTreeItemClick("4",cellItem?.cellId)} sx={{ ".MuiTreeItem-content.Mui-selected.Mui-focused": { color: '#ffffff', backgroundColor: '#53659c' } }} /> */}
                <TreeItem nodeId={((index*5)+4).toString()} label="RRH List" onClick={() => handleTreeItemClick("4", cellItem?.cellId,)} sx={{ ".MuiTreeItem-content.Mui-selected.Mui-focused": { color: '#ffffff', backgroundColor: '#53659c' } }} >
                { cellItem?.RRHList?.map((RRHItem:any, rrhindex:number)  => (
                   <TreeItem nodeId={((index*5)+(40+rrhindex)).toString()} label={("RRH-"+RRHItem?.id).toString()} onClick={() => {handleRRHTreeItemClick("4", cellItem, RRHItem?.id,rrhindex)}} sx={{ ".MuiTreeItem-content.Mui-selected.Mui-focused": { color: '#ffffff', backgroundColor: '#53659c' } }} />
                 ))} 
              </TreeItem>
              </TreeItem>
              </div>
               ))}
           </TreeView>
          </Box>
          {/* <Box style={{ height: '11%', width: '99%', border: '1px solid #ccc', borderRadius: '2px', overflow: 'auto' }}>
            <div style={{width: '97%', margin:'4px'}} >
              <Button variant="outlined" style={{border: '2px solid #53659c', color:'green',fontSize:'12px', width:'40%', marginRight:'3px'}} disabled={cellConfigdata.length >= 8} onClick={addNewCell}>Add Cell</Button>
             <Button disabled={currentCell==''?true:false} variant="outlined" className={classes.enabledButton} style={{border: '2px solid #53659c',color:'red',fontSize:'12px', width:'52%' }}  onClick={() => { setDeleteConfirmopen(true);}}>Remove Cell</Button>
             </div>
          </Box> */}
          <Box style={{ height: '11%', width: '99%', border: '1px solid #ccc', borderRadius: '2px',}}>
  <div style={{ width: '97%', margin: '4px', display: 'flex', justifyContent: 'space-between', height: '100%' }}>
    <Button 
      variant="outlined" 
      style={{ 
        border: '2px solid #53659c', 
        color: 'green', 
        fontSize: '12px', 
        flex: 1, 
        marginRight: '8px',
        height: '80%'
      }} 
      disabled={cellConfigdata.length >= 8} 
      onClick={addNewCell}
    >
      Add Cell
    </Button>
    <Button 
      disabled={currentCell === ''} 
      variant="outlined" 
      className={classes.enabledButton} 
      style={{ 
        border: '2px solid #53659c', 
        color: 'red', 
        fontSize: '12px', 
        flex: 1,
        height: '80%'
      }}  
      onClick={() => { setDeleteConfirmopen(true); }}
    >
      Remove Cell
    </Button>
  </div>
</Box>

      </div>
       <div style={{width:'98%', height:'99%', overflow: 'auto' }}><br></br>
       <ThemeProvider
      theme={{
        palette: {
          primary: {
            main: '#c6cbd1'
          },
        },
      }}
    >
   <Box sx={{ height: '9%', width: '96%',ml:'7px',marginTop:'1px',alignContent:'center', border: '3px solid #53659c', borderRadius: '10px', overflow: 'auto' }}>
       <div style={{display: 'flex', justifyContent: 'flex-start',height:'2.2'}}>
       <Typography variant="h6" style={{height: '4%', width: '15%',marginLeft:"8px",alignContent:'center',  overflow: 'auto'}}>Cells Status : </Typography>
        {cellStatusdata?.map((cellItem, index) => (
          <button style={{fontSize:'16px',margin:'4px',marginLeft:'10px',display: 'flex',textAlign:'center',marginTop:"4px",textTransform:'capitalize', justifyContent: 'flex-start',height:'5%',width:'6%',borderRadius:'10px', backgroundColor: cellItem?.cellstatus == 'inService' ?'#90EE90' : cellItem?.cellstatus == 'outOfService'?'#F9593D' :  '#E1E5E5'}}
            key={index} >
            {cellItem?.cellId}
          </button>
        ))}
      </div>
      </Box>
      </ThemeProvider>
        <div style={{marginLeft:'8px'}}><Typography variant="h6">Selected Cell : {currentCell}</Typography></div>
          {currentTreeIndex === 1 ?
            (<div style={{ width: '95%', border: '1px solid #ccc', borderRadius: '3px', margin: '1%', padding: '1%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center',height:'70%', overflow: 'auto' }}>
            <div style={{ width: '95%', marginLeft: '2%', marginTop: '1%', padding: '1%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', overflow: 'auto' }}>
            <div style={{ marginTop: '1%' }}><b>General config</b></div>
            <FormControl variant="standard" margin="dense" style={{ width: '21%', paddingRight: '2%' }}>
                <InputLabel id="PeeParameters">peeParameters List</InputLabel>
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
             <TextField variant="standard" placeholder="Enter Priority Label" spellCheck={false} autoFocus margin="dense" id="PriorityLabel" label="Priority Label" type="text" style={{ width: '20%', paddingRight: '2%' }} value={celldata?.PriorityLabel? celldata?.PriorityLabel : ''} inputProps={{ min: 0, max:4294967295}} error={errorindex[currentCell]?.PriorityLabel != ""}  helperText={errorindex[currentCell]?.PriorityLabel} onChange={(event) => { onCellTextChange(event) }} onKeyDown={(event) => ["e", "E", "+", "-","."].includes(event.key) && event.preventDefault()}
              InputLabelProps={{ shrink: true,sx: { left: "1rem", right: "1rem", } }}/>
            <br></br>
            </div>
            <div style={{ marginLeft: '80%', marginTop: '10%' }}>
            <Button variant="contained" style={{ color: '#ffffff', backgroundColor: '#53659c', width: '120px', marginBottom: '3px' }} onClick={saveData}>Save</Button>
            </div>
            </div>)
          : currentTreeIndex === 2 ?
            (<div style={{  margin:"dense", width: '95%', border: '1px solid #ccc', borderRadius: '3px', marginBottom:'1%', padding: '1%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height:'70%', overflow: 'auto' }}>
            <div style={{ margin:"dense", width: '95%', padding: '1%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', overflow: 'auto' }}>
            <div style={{ marginTop:'1%' }}><b>DU Cell Parameter</b></div>
            <TextField variant="standard" spellCheck={false} autoFocus margin="dense" id="arfcnDL" label="arfcnDL" type="text" style={{ width: '20%', paddingRight: '2%' }} value={celldata?.arfcnDL? celldata?.arfcnDL :''} onChange={(event) => { onCellTextChange(event) }}  error={errorindex[currentCell]?.ArfcnDL != ""}  helperText={errorindex[currentCell]?.ArfcnDL} InputLabelProps={{ shrink: true,sx: { left: "1rem", right: "1rem", } }} onKeyDown={(event) => ["e", "E", "+","."].includes(event.key) && event.preventDefault()}/>
            <TextField variant="standard" spellCheck={false} autoFocus margin="dense" id="arfcnUL" label="arfcnUL" type="text" style={{ width: '20%', paddingRight: '2%' }} value={celldata?.arfcnUL? celldata?.arfcnUL :''} onChange={(event) => { onCellTextChange(event) }} error={errorindex[currentCell]?.ArfcnUL != ""}  helperText={errorindex[currentCell]?.ArfcnUL} InputLabelProps={{ shrink: true,sx: { left: "1rem", right: "1rem", } }} onKeyDown={(event) => ["e", "E", "+","." ].includes(event.key) && event.preventDefault()}/>
            <TextField variant="standard" spellCheck={false} autoFocus margin="dense" id="arfcnSUL" label="arfcnSUL" type="text"  style={{ width: '20%', paddingRight: '2%' }}value={celldata?.arfcnSUL? celldata?.arfcnSUL :''}   inputProps={{ min: -2147483648  , max: 2147483647 }} error={errorindex[currentCell]?.arfcnSUL != ""}  helperText={errorindex[currentCell]?.arfcnSUL} onChange={(event) => { onCellTextChange(event) }} onKeyDown={(event) => ["e", "E", "+","."].includes(event.key) && event.preventDefault()}InputLabelProps={{ shrink: true,sx: { left: "1rem", right: "1rem", } }}/>
            <TextField variant="standard" spellCheck={false} autoFocus margin="dense" id="bsChannelBwDL" label="bsChannelBwDL(MHz)" type="text" style={{ width: '25%', paddingRight: '2%' }} value={celldata?.bsChannelBwDL? celldata?.bsChannelBwDL:''} onChange={(event) => { onCellTextChange(event) }} error={errorindex[currentCell]?.BsChannelBwDL !=""}  helperText={errorindex[currentCell]?.BsChannelBwDL} onKeyDown={(event) => ["e", "E", "+","."].includes(event.key) && event.preventDefault()}InputLabelProps={{ shrink: true,sx: { left: "1rem", right: "1rem", } }}/>
            <br></br>
            <TextField variant="standard" spellCheck={false} autoFocus margin="dense" id="bsChannelBwUL" label="bsChannelBwUL(MHz)" type="text" style={{ width: '25%', paddingRight: '2%' }} value={celldata?.bsChannelBwUL? celldata?.bsChannelBwUL:'' } onChange={(event) => { onCellTextChange(event) }} error={errorindex[currentCell]?.BsChannelBwUL != ""}  helperText={errorindex[currentCell]?.BsChannelBwUL}  onKeyDown={(event) => ["e", "E", "+","."].includes(event.key) && event.preventDefault()} InputLabelProps={{ shrink: true,sx: { left: "1rem", right: "1rem", } }}/>
            <TextField variant="standard" spellCheck={false} autoFocus margin="dense" id="ssbPeriodicity" label="ssbPeriodicity(ms)" type="text" style={{ width: '25%', paddingRight: '2%' }} value={celldata?.ssbPeriodicity? celldata?.ssbPeriodicity:'' } onChange={(event) => { onCellTextChange(event) }} error={errorindex[currentCell]?.ssbPeriodicity != ""}  helperText={errorindex[currentCell]?.ssbPeriodicity}  onKeyDown={(event) => ["e", "E", "+",".","-"].includes(event.key) && event.preventDefault()} InputLabelProps={{ shrink: true,sx: { left: "1rem", right: "1rem", } }}/>

            {/* <FormControl variant="standard" margin="dense" style={{ width: '20%', paddingRight: '2%' }} >
                <InputLabel id="ssbPeriodicity">ssbPeriodicity(ms)</InputLabel>
                <Select
                  labelId="ssbPeriodicity"
                  id="ssbPeriodicity"
                  label="ssbPeriodicity"
                  value={selectedssbPeriodicity} // Use selectedResourceType instead of cuupdata.resourceType
                  onChange={ssbPeriodicityDropDownChange}
                >
                  {ssbPeriodicityOptions?.map(option => (
                    <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                  ))}
                </Select>
              </FormControl> */}
              
            <TextField variant="standard" spellCheck={false} autoFocus margin="dense" id="ssbOfset" label="ssbOfset(ms)" type="text" style={{ width: '20%', paddingRight: '2%' }} value={celldata?.ssbOfset} inputProps={{ min: 0, max: 159 }}   onChange={(event) => { onCellTextChange(event) }}   onKeyDown={(event) => ["e", "E", "+", "-","."].includes(event.key) && event.preventDefault()} error={errorindex[currentCell]?.ssbOffset != ""}  helperText={errorindex[currentCell]?.ssbOffset} InputLabelProps={{ shrink: true,sx: { left: "1rem", right: "1rem", } }}/>
            <TextField variant="standard" spellCheck={false} autoFocus margin="dense" id="ssbDuration" label="ssbDuration(ms)" type="text" style={{ width: '20%', paddingRight: '2%' }}value={celldata?.ssbDuration? celldata?.ssbDuration:''}inputProps={{ min: 0, max:5}} onChange={(event) => { onCellTextChange(event) }} onKeyDown={(event) => ["e", "E", "+", "-","."].includes(event.key) && event.preventDefault()} error={errorindex[currentCell]?.ssbDuration != ""}  helperText={errorindex[currentCell]?.ssbDuration}  InputLabelProps={{ shrink: true,sx: { left: "1rem", right: "1rem", } }}/>
            <br></br> 
            <TextField variant="standard" spellCheck={false} autoFocus margin="dense" id="ssbFrequency" label="ssbFrequency" type="text" style={{ width: '20%', paddingRight: '2%' }} value={celldata?.ssbFrequency? celldata?.ssbFrequency:'' } onKeyDown={(event) => ["e", "E", "+", "-","."].includes(event.key) && event.preventDefault()} inputProps={{ min: 0, max:3279165}} onChange={(event) => { onCellTextChange(event) }} error={errorindex[currentCell]?.ssbFrequency != ""}  helperText={errorindex[currentCell]?.ssbFrequency}InputLabelProps={{ shrink: true,sx: { left: "1rem", right: "1rem", } }}/>
            <TextField variant="standard" spellCheck={false} autoFocus margin="dense" id="ssbSubCarrierSpacing" label="ssbSubCarrierSpacing(KHz)" type="text" style={{ width: '20%', paddingRight: '2%' }} value={celldata?.ssbSubCarrierSpacing? celldata?.ssbSubCarrierSpacing:'' } onKeyDown={(event) => ["e", "E", "+", "-","."].includes(event.key) && event.preventDefault()} inputProps={{ min: 0, max:3279165}} onChange={(event) => { onCellTextChange(event) }} error={errorindex[currentCell]?.ssbSubCarrierSpacing != ""}  helperText={errorindex[currentCell]?.ssbSubCarrierSpacing} InputLabelProps={{ shrink: true,sx: { left: "1rem", right: "1rem", } }}/>
            {/* <FormControl variant="standard" margin="dense" style={{ width: '25%', paddingRight: '2%' }} >
                <InputLabel id="ssbSubCarrierSpacing">ssbSubCarrierSpacing(KHz)</InputLabel>
                <Select
                  labelId="ssbSubCarrierSpacing"
                  id="ssbSubCarrierSpacing"
                  label="ssbSubCarrierSpacing"
                  value={selectedssbSubCarrierSpacing}
                  onChange={ssbSubCarrierSpacingDropDownChange}>
                  {ssbSubCarrierSpacingOptions?.map(option => (
                    <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                  ))}
                </Select>
              </FormControl> */}
            <br></br>
            </div>
            <div style={{ marginLeft: '80%', marginTop: '3%' }}>
            <Button variant="contained" style={{ color: '#ffffff', backgroundColor: '#53659c', width: '150px', marginBottom: '3px' }} onClick={saveData}>Save</Button>
            </div>
            </div>)
          : currentTreeIndex === 3 ?
            (<div style={{  margin:"dense", width: '95%', border: '1px solid #ccc', borderRadius: '3px', marginBottom:'1%', padding: '1%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height:'70%', overflow: 'auto' }}>
            <div style={{ height: '100%', overflow: 'auto' }}>
          <div style={{ margin:"dense", width: '95%', padding: '0.5%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
            <div style={{  margin:"dense", width: '95%',overflow: 'auto' }}>
            <div style={{ marginTop: '0.5%' }} ><b>CU Cell Parameter</b></div>
               <TextField variant="standard" spellCheck={false} autoFocus margin="dense" id="rsrpOffsetSSB" label="rsrpOffsetSSB(db)" type="text" defaultValue="0" style={{ width: '23%', paddingRight: '2%' }} value={celldata?.rsrpOffsetSSB?celldata?.rsrpOffsetSSB:''}  error={errorindex[currentCell]?.rsrpOffsetSSB != ""} helperText={errorindex[currentCell]?.rsrpOffsetSSB} inputProps={{ min: -24, max: 24 }} onChange={(event) => { onCellTextChange(event) }}onKeyDown={(event) => ["e", "E", "+","."].includes(event.key) && event.preventDefault()}  InputLabelProps={{ shrink: true,sx: { left: "1rem", right: "1rem", } }}/> 
              {/* <FormControl variant="standard" margin="dense" style={{ width: '25%', paddingRight: '2%' }} >
                <InputLabel id="rsrpOffsetSSB">rsrpOffsetSSB(db)</InputLabel>
                <Select
                  labelId="rsrpOffsetSSB"
                  id="rsrpOffsetSSB"
                  label="rsrpOffsetSSB"
                  value={selectedrsrpOffsetSSB}
                  onChange={rsrpOffsetSSBDropDownChange}  MenuProps={{ PaperProps: { style: { maxHeight: 200 } } }}>
                  {rsrpOffsetSSBOptions?.map(option => (
                    <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl variant="standard" margin="dense" style={{ width: '25%', paddingRight: '2%' }} >
                <InputLabel id="sinrOffsetSSB">sinrOffsetSSB(db)</InputLabel>
                <Select
                  labelId="sinrOffsetSSB"
                  id="sinrOffsetSSB"
                  label="sinrOffsetSSB"
                  value={selectedsinrOffsetSSB}
                  onChange={sinrOffsetSSBDropDownChange}  MenuProps={{ PaperProps: { style: { maxHeight: 200 } } }}>
                  {sinrOffsetSSBOptions?.map(option => (
                    <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl variant="standard" margin="dense" style={{ width: '25%', paddingRight: '2%' }} >
                <InputLabel id="rsrqOffsetSSB">rsrqOffsetSSB(db)</InputLabel>
                <Select
                  labelId="rsrqOffsetSSB"
                  id="rsrqOffsetSSB"
                  label="rsrqOffsetSSB"
                  value={selectedrsrqOffsetSSB}
                  onChange={rsrqOffsetSSBDropDownChange}  MenuProps={{ PaperProps: { style: { maxHeight: 200 } } }}>
                  {rsrqOffsetSSBOptions?.map(option => (
                    <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                  ))}
                </Select>
              </FormControl> */}
               <TextField variant="standard" spellCheck={false} autoFocus margin="dense" id="sinrOffsetSSB" label="sinrOffsetSSB(db)" type= "text" defaultValue="0" style={{ width: '23%', paddingRight: '2%' }}value={celldata?.sinrOffsetSSB? celldata?.sinrOffsetSSB:''}  error={errorindex[currentCell]?.sinrOffsetSSB != ""}  helperText={errorindex[currentCell]?.sinrOffsetSSB} inputProps={{ min: -24, max: 24}}onChange={(event) => { onCellTextChange(event) }} onKeyDown={(event) => ["e", "E", "+","."].includes(event.key) && event.preventDefault()} InputLabelProps={{ shrink: true,sx: { left: "1rem", right: "1rem", } }}/>
              <TextField variant="standard" spellCheck={false} autoFocus margin="dense" id="rsrqOffsetSSB" label="rsrqOffsetSSB(db)" type="text" defaultValue="0" style={{ width: '23%',paddingRight: '2%' }}value={celldata?.rsrqOffsetSSB? celldata?.rsrqOffsetSSB:''}inputProps={{ min: -24, max: 24,step:2 }}   error={errorindex[currentCell]?.rsrqOffsetSSB != ""}  helperText={errorindex[currentCell]?.rsrqOffsetSSB}onChange={(event) => { onCellTextChange(event) }} onKeyDown={(event) => ["e", "E", "+","."].includes(event.key) && event.preventDefault()} InputLabelProps={{ shrink: true,sx: { left: "1rem", right: "1rem", } }}/> 
              <br></br>
              {/* <FormControl variant="standard" margin="dense" style={{ width: '25%', paddingRight: '2%' }} >
                <InputLabel id="rsrpOffsetCsiRs">rsrpOffsetCsiRs(db)</InputLabel>
                <Select
                  labelId="rsrpOffsetCsiRs"
                  id="rsrpOffsetCsiRs"
                  label="rsrpOffsetCsiRs"
                  value={selectedrsrpOffsetCsiRs}
                  onChange={rsrpOffsetCsiRsDropDownChange}  MenuProps={{ PaperProps: { style: { maxHeight: 200 } } }}>
                  {rsrpOffsetCsiRsOptions?.map(option => (
                    <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl variant="standard" margin="dense" style={{ width: '25%', paddingRight: '2%' }} >
                <InputLabel id="rsrqOffsetCsiRs">rsrqOffsetCsiRs(db)</InputLabel>
                <Select
                  labelId="rsrqOffsetCsiRs"
                  id="rsrqOffsetCsiRs"
                  label="rsrqOffsetCsiRs"
                  value={selectedrsrqOffsetCsiRs}
                  onChange={rsrqOffsetCsiRsDropDownChange}  MenuProps={{ PaperProps: { style: { maxHeight: 200 } } }}>
                  {rsrqOffsetCsiRsOptions?.map(option => (
                    <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl variant="standard" margin="dense" style={{ width: '25%', paddingRight: '2%' }} >
                <InputLabel id="sinrOffsetCsiRs">sinrOffsetCsiRs(db)</InputLabel>
                <Select
                  labelId="sinrOffsetCsiRs"
                  id="sinrOffsetCsiRs"
                  label="sinrOffsetCsiRs"
                  value={selectedsinrOffsetCsiRs}
                  onChange={sinrOffsetCsiRsDropDownChange}  MenuProps={{ PaperProps: { style: { maxHeight: 200 } } }}>
                  {sinrOffsetCsiRsOptions?.map(option => (
                    <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                  ))}
                </Select>
              </FormControl> */}
               <TextField variant="standard" spellCheck={false} autoFocus margin="dense" id="rsrpOffsetCsiRs" label="rsrpOffsetCsiRs(db)" type="text" defaultValue="0" style={{ width: '23%', paddingRight: '2%' }}value={celldata?.rsrpOffsetCsiRs ? celldata?.rsrpOffsetCsiRs: ''}inputProps={{ min: -24, max: 24,step:2 }} error={errorindex[currentCell]?.rsrpOffsetCsiRs != ""}  helperText={errorindex[currentCell]?.rsrpOffsetCsiRs} onChange={(event) => { onCellTextChange(event) }} onKeyDown={(event) => ["e", "E", "+","."].includes(event.key) && event.preventDefault()} InputLabelProps={{ shrink: true,sx: { left: "1rem", right: "1rem", } }}/>
              <TextField variant="standard" spellCheck={false} autoFocus margin="dense" id="rsrqOffsetCsiRs" label="rsrqOffsetCsiRs(db)" type="text" defaultValue="0" style={{ width: '23%', paddingRight: '2%' }}value={celldata?.rsrqOffsetCsiRs? celldata?.rsrqOffsetCsiRs:''}inputProps={{ min: -24, max: 24,step:2 }}  error={errorindex[currentCell]?.rsrqOffsetCsiRs != ""}  helperText={errorindex[currentCell]?.rsrqOffsetCsiRs} onChange={(event) => { onCellTextChange(event) }}onKeyDown={(event) => ["e", "E", "+","."].includes(event.key) && event.preventDefault()}  InputLabelProps={{ shrink: true,sx: { left: "1rem", right: "1rem", } }}/>
              <TextField variant="standard" spellCheck={false} autoFocus margin="dense" id="sinrOffsetCsiRs" label="sinrOffsetCsiRs(db)" type="text" defaultValue="0" style={{ width: '23%', paddingRight: '2%' }} value={celldata?.sinrOffsetCsiRs? celldata?.sinrOffsetCsiRs:''}  error={errorindex[currentCell]?.sinrOffsetCsiRs != ""}  helperText={errorindex[currentCell]?.sinrOffsetCsiRs} inputProps={{ min: -24, max: 24 }} onChange={(event) => { onCellTextChange(event) }} onKeyDown={(event) => ["e", "E", "+","."].includes(event.key) && event.preventDefault()} InputLabelProps={{ shrink: true,sx: { left: "1rem", right: "1rem", } }}/> 
            </div>
            <div style={{ border: '1px solid #ccc',width: '95%', borderRadius: '3px', padding: '0.5%', marginTop: '1%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center',overflow:'auto' , height:'300px'}}>
              <div style={{ marginTop: '1%' }} ><b>Cell Reselection</b></div>
              <TextField variant="standard" spellCheck={false} autoFocus margin="dense" id="CellReselectionPriority" label="CellReselectionPriority" type="text" style={{ width: '23%', paddingRight: '2%' }} value={celldata?.CellReselectionPriority? celldata?.CellReselectionPriority:''} error={errorindex[currentCell]?.cellReselectionPriority != ""}  helperText={errorindex[currentCell]?.cellReselectionPriority} inputProps={{ min: 0, max: 7 }} onChange={(event) => { onCellTextChange(event) }} onKeyDown={(event) => ["e", "E", "+", "-","."].includes(event.key) && event.preventDefault()}  InputLabelProps={{ shrink: true,sx: { left: "1rem", right: "1rem", } }}/>
              <TextField variant="standard" spellCheck={false} autoFocus margin="dense" id="CellReselectionSubPriority" label="CellReselectionSubPriority" type="text" style={{ width: '23%', paddingRight: '2%' }} value={celldata?.CellReselectionSubPriority? celldata?.CellReselectionSubPriority:''} error={errorindex[currentCell]?.CellReselectionSubPriority != ""}  helperText={errorindex[currentCell]?.CellReselectionSubPriority} inputProps={{ min: 0, max: 7 }} onChange={(event) => { onCellTextChange(event) }} onKeyDown={(event) => ["e", "E", "+", "-","."].includes(event.key) && event.preventDefault()}  InputLabelProps={{ shrink: true,sx: { left: "1rem", right: "1rem", } }}/> 

              {/* <FormControl variant="standard" margin="dense" style={{ width: '25%', paddingRight: '2%' }} >
                <InputLabel id="CellReselectionSubPriority">CellReselectionSubPriority</InputLabel>
                <Select
                  labelId="CellReselectionSubPriority"
                  id="CellReselectionSubPriority"
                  label="CellReselectionSubPriority"
                  value={selectedCellReselectionSubPriority}
                  onChange={CellReselectionSubPriorityDropDownChange}>
                  {CellReselectionSubPriorityOptions?.map(option => (
                    <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                  ))}
                </Select>
              </FormControl> */}
              <br></br>
              <TextField variant="standard" spellCheck={false} autoFocus margin="dense" id="pMax" label="pMax(dBm)" type="text" style={{ width: '23%', paddingRight: '2%' }} value={celldata?.pMax? celldata?.pMax:''} onChange={(event) => { onCellTextChange(event) }} inputProps={{ min: -33, max: 33 }}onKeyDown={(event) => ["e", "E", "+","."].includes(event.key) && event.preventDefault()} error={errorindex[currentCell]?.pMax != ""}  helperText={errorindex[currentCell]?.pMax} InputLabelProps={{ shrink: true,sx: { left: "1rem", right: "1rem", } }}/>
              <TextField variant="standard" spellCheck={false} autoFocus margin="dense" id="qOffsetFrequency" label="qOffsetFrequency" type="text" defaultValue="0"  style={{ width: '23%', paddingRight: '2%' }} value={celldata?.qOffsetFrequency? celldata?.qOffsetFrequency:''} inputProps={{ min: -24, max: 24 }}  onChange={(event) => { onCellTextChange(event) }} onKeyDown={(event) => ["e", "E", "+","."].includes(event.key) && event.preventDefault()}  error={errorindex[currentCell]?.qOffsetFrequency != ""}  helperText={errorindex[currentCell]?.qOffsetFrequency} InputLabelProps={{ shrink: true,sx: { left: "1rem", right: "1rem", } }}/>
              <TextField variant="standard" spellCheck={false} autoFocus margin="dense" id="qQualMin" label="qQualMin(dB)" type="text" style={{ width: '23%', paddingRight: '2%' }}value={celldata?.qQualMin? celldata?.qQualMin:''} inputProps={{ min: -34, max: -3 }} onChange={(event) => { onCellTextChange(event) }} onKeyDown={(event) => ["e", "E", "+","."].includes(event.key) && event.preventDefault()} error={errorindex[currentCell]?.qQualMin != ""}  helperText={errorindex[currentCell]?.qQualMin}   InputLabelProps={{ shrink: true,sx: { left: "1rem", right: "1rem", } }}/>
              <TextField variant="standard" spellCheck={false} autoFocus margin="dense" id="qRxLevMin" label="qRxLevMin(dBm)" type="text" style={{ width: '23%', paddingRight: '2%' }}value={celldata?.qRxLevMin? celldata?.qRxLevMin:''} inputProps={{ min: -140, max: -44 }} onChange={(event) => { onCellTextChange(event) }}onKeyDown={(event) => ["e", "E", "+", "."].includes(event.key) && event.preventDefault()}  error={errorindex[currentCell]?.qRxLevMin != ""}  helperText={errorindex[currentCell]?.qRxLevMin}  InputLabelProps={{ shrink: true,sx: { left: "1rem", right: "1rem", } }}/>
              <br></br>
              <TextField variant="standard" spellCheck={false} autoFocus margin="dense" id="threshXHighP" label="threshXHighP(dB)" type="text" style={{ width: '23%', paddingRight: '2%' }}value={celldata?.threshXHighP? celldata?.threshXHighP:''} inputProps={{ min: 0, max:62}} onKeyDown={(event) => ["e", "E", "+", "-","."].includes(event.key) && event.preventDefault()} onChange={(event) => { onCellTextChange(event) }}  error={errorindex[currentCell]?.threshXHighP != ""}  helperText={errorindex[currentCell]?.threshXHighP}   InputLabelProps={{ shrink: true,sx: { left: "1rem", right: "1rem", } }}/>
              <TextField variant="standard" spellCheck={false} autoFocus margin="dense" id="threshXHighQ" label="threshXHighQ(dB)" type="text" style={{ width: '23%', paddingRight: '2%' }}value={celldata?.threshXHighQ? celldata?.threshXHighQ:''}inputProps={{ min: 0, max:31}} onChange={(event) => { onCellTextChange(event) }}onKeyDown={(event) => ["e", "E", "+", "-","."].includes(event.key) && event.preventDefault()}  error={errorindex[currentCell]?.threshXHighQ != ""}  helperText={errorindex[currentCell]?.threshXHighQ}   InputLabelProps={{ shrink: true,sx: { left: "1rem", right: "1rem", } }}/>
              <TextField variant="standard" spellCheck={false} autoFocus margin="dense" id="threshXLowP" label="threshXLowP(dB)" type="text" style={{ width: '23%', paddingRight: '2%' }} value={celldata?.threshXLowP? celldata?.threshXLowP:''}inputProps={{ min: 0, max:62}} onChange={(event) => { onCellTextChange(event) }}  onKeyDown={(event) => ["e", "E", "+", "-","."].includes(event.key) && event.preventDefault()}  error={errorindex[currentCell]?.threshXLowP != ""}  helperText={errorindex[currentCell]?.threshXLowP}  InputLabelProps={{ shrink: true,sx: { left: "1rem", right: "1rem", } }}/>
              <TextField variant="standard" spellCheck={false} autoFocus margin="dense" id="threshXLowQ" label="threshXLowQ(dB)" type="text" style={{ width: '23%', paddingRight: '2%' }}value={celldata?.threshXLowQ? celldata?.threshXLowQ:''}inputProps={{ min: 0, max:31}} onChange={(event) => { onCellTextChange(event) }} onKeyDown={(event) => ["e", "E", "+", "-","."].includes(event.key) && event.preventDefault()}   error={errorindex[currentCell]?.threshXLowQ != ""}  helperText={errorindex[currentCell]?.threshXLowQ}  InputLabelProps={{ shrink: true,sx: { left: "1rem", right: "1rem", } }}/>
              <br></br>
              <TextField variant="standard" spellCheck={false} autoFocus margin="dense" id="tReselectionNR" label="tReselectionNR(s)" type="text" style={{ width: '23%', paddingRight: '2%' }}value={celldata?.tReselectionNR? celldata?.tReselectionNR:''}inputProps={{ min: 0, max:7}} onChange={(event) => { onCellTextChange(event) }} onKeyDown={(event) => ["e", "E", "+", "-","."].includes(event.key) && event.preventDefault()} error={errorindex[currentCell]?.tReselectionNR != ""}  helperText={errorindex[currentCell]?.tReselectionNR}  InputLabelProps={{ shrink: true,sx: { left: "1rem", right: "1rem", } }}/>
              <TextField variant="standard" spellCheck={false} autoFocus margin="dense" id="tReselectionNRSfHigh" label="tReselectionNRSfHigh(%)" type="text" style={{ width: '23%', paddingRight: '2%' }}value={celldata?.tReselectionNRSfHigh? celldata?.tReselectionNRSfHigh:''}inputProps={{ min: 0, max:7}} onChange={(event) => { onCellTextChange(event) }} onKeyDown={(event) => ["e", "E", "+", "-","."].includes(event.key) && event.preventDefault()} error={errorindex[currentCell]?.tReselectionNRSfHigh != ""}  helperText={errorindex[currentCell]?.tReselectionNRSfHigh}  InputLabelProps={{ shrink: true,sx: { left: "1rem", right: "1rem", } }}/>
              <TextField variant="standard" spellCheck={false} autoFocus margin="dense" id="tReselectionNRSfMedium" label="tReselectionNRSfMedium(%)" type="text" style={{ width: '23%', paddingRight: '2%' }}value={celldata?.tReselectionNRSfMedium? celldata?.tReselectionNRSfMedium:''}inputProps={{ min: 0, max:7}} onChange={(event) => { onCellTextChange(event) }} onKeyDown={(event) => ["e", "E", "+", "-","."].includes(event.key) && event.preventDefault()} error={errorindex[currentCell]?.tReselectionNRSfMedium != ""}  helperText={errorindex[currentCell]?.tReselectionNRSfMedium}  InputLabelProps={{ shrink: true,sx: { left: "1rem", right: "1rem", } }}/>
              {/* <FormControl variant="standard" margin="dense" style={{ width: '23%', paddingRight: '2%' }} >
                <InputLabel id="tReselectionNRSfHigh">tReselectionNRSfHigh(%)</InputLabel>
                <Select
                  labelId="tReselectionNRSfHigh"
                  id="tReselectionNRSfHigh"
                  label="tReselectionNRSfHigh"
                  value={selectedtReselectionNRSfHigh}
                  onChange={tReselectionNRSfHighDropDownChange}>
                  {tReselectionNRSfHighOptions?.map(option => (
                    <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl variant="standard" margin="dense" style={{ width: '25%', paddingRight: '2%' }} >
                <InputLabel variant="standard" margin="dense" id="tReselectionNRSfMedium">tReselectionNRSfMedium(%)</InputLabel>
                <Select
                  labelId="tReselectionNRSfMedium"
                  id="tReselectionNRSfMedium"
                  value={selectedtReselectionNRSfMedium}
                  onChange={tReselectionNRSfMediumDropDownChange}>
                  {tReselectionNRSfMediumOptions?.map(option => (
                    <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                  ))}
                </Select>
              </FormControl> */}
             <TextField variant="standard" spellCheck={false} autoFocus margin="dense" id="nRFrequencyref" label="nRFrequencyref" type="text" style={{ width: '23%', paddingRight: '2%' }}value={celldata?.nRFrequencyref? celldata?.nRFrequencyref:''} onChange={(event) => { onCellTextChange(event) }}  error={errorindex[currentCell].nRFrequencyref != ""}  helperText={errorindex[currentCell].nRFrequencyref}  InputLabelProps={{ shrink: true,sx: { left: "1rem", right: "1rem", } }}/>
            </div>
            <div style={{ marginLeft: '70%',marginTop: '1%' }}>
              <Button variant="contained" style={{ color: '#ffffff', backgroundColor: '#53659c', width: '150px', marginBottom: '3px' }} onClick={saveData}>Save</Button>
            </div>
            </div>
            </div>
            </div>)
          : currentTreeIndex === 4 ?
           (<div style={{ width: '96%', border: '1px solid #ccc', borderRadius: '3px', padding: '1%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center',height:'70%', overflow: 'auto' }}>
            <div style={{ margin:"dense", width: '96%', padding: '0.5%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', overflow: 'auto' ,height:'95%' }}>
              <div style={{display:'flex', flexDirection: 'row',marginRight:'3px'}}>
                <div style={{ display: 'flex', alignItems: 'center', width: '90%' }}>
                {RRHList?.length >0 && selectedRRHindex != null ? <Typography fontSize={16} variant="h5">Current RRH :RRH-{currentRRH}</Typography>:null}
                </div>
                {/* <Button variant="contained" disabled={RRHList?.length >= 6 ? true : false} style={{color: '#ffffff', backgroundColor: RRHList?.length >= 6 ? 'grey' : '#53659c', width: '120px', marginLeft: '6%', marginBottom: '0px', marginTop: '1px',padding: '0%' }} */}
                <Button variant="contained" disabled style={{color: '#ffffff', backgroundColor: RRHList?.length >= 6 ? 'grey' : '#53659c', width: '120px', marginLeft: '6%', marginBottom: '0px', marginTop: '1px',padding: '0%' }}
               onClick={addRRH}>Add RRH</Button>
                {/* <Button variant="contained"  disabled={ RRHList?.length > 0 ? false : true}style={{ color: '#ffffff', backgroundColor:RRHList?.length > 0  ? '#53659c' : 'grey', width: '130px', marginLeft: '4%', marginBottom: '0px', marginTop: '0px',padding: '0%' }} */}
                <Button variant="contained"  disabled style={{ color: '#ffffff', backgroundColor:RRHList?.length > 0  ? '#53659c' : 'grey', width: '130px', marginLeft: '4%', marginBottom: '0px', marginTop: '0px',padding: '0%' }}
                onClick={deleteRRH}>Delete RRH</Button>
              </div>
              {RRHList?.length > 0 && selectedRRHindex != null ?
              (
              <div style={{ margin:"dense", width: '95%', padding: '0.5%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', overflow: 'auto' }}>
               <FormControl variant="standard" margin="dense" style={{ width: '18%', paddingRight: '2%' }} >
               <InputLabel id="minoMode">MIMO Mode</InputLabel>
                <Select
                  labelId="minoMode"
                  id="minoMode"
                  label="minoMode"
                  value={selectedMIMOMode}
                  onChange={minoModeDownChange}>
                  {MIMOModeOptions?.map(option1 => (
                    <MenuItem key={option1.value} value={option1.value}>{option1.label}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl variant="standard" margin="dense" style={{ width: '18%', paddingRight: '2%' }} >
               <InputLabel id="antennaType">Antenna Type</InputLabel>
                <Select
                  labelId="antennaType"
                  id="antennaType"
                  label="antennaType"
                  value={selectedAntennaType}
                  onChange={anatanaTypeDropDownChange}>
                  {AntennaTypeOptions?.map(option2 => (
                    <MenuItem key={option2.value} value={option2.value}>{option2.label}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              {/* <TextField variant="standard" spellCheck={false} autoFocus margin="dense" id="mimoMode" label="MIMO Mode" type="number" style={{ width: '20%', paddingRight: '2%' }} value={RRHList? RRHList[selectedRRHindex]?.mimoMode? RRHList[selectedRRHindex]?.mimoMode:'':''} onChange={(event) => { onCellTextChange(event) }}  InputLabelProps={{ shrink: true,sx: { left: "1rem", right: "1rem", } }}/>
              <TextField variant="standard" spellCheck={false} autoFocus margin="dense" id="antennaType" label="Antenna Type" type="number" style={{ width: '20%', paddingRight: '2%' }} value={RRHList? RRHList[selectedRRHindex]?.antennaType? RRHList[selectedRRHindex]?.antennaType:'':''} onChange={(event) => { onCellTextChange(event) }}  InputLabelProps={{ shrink: true,sx: { left: "1rem", right: "1rem", } }}/> */}
              <FormControl variant="standard" margin="dense" style={{ width: '18%', paddingRight: '2%' }} >
               <InputLabel id="ret">RET Enabled</InputLabel>
                <Select
                  labelId="isRetEnabled"
                  id="isRetEnabled"
                  label="isRetEnabled"
                  value={selectedRetEnabled}
                  onChange={retEnabledDropDownChange}>
                  {retOptions?.map(option => (
                    <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField variant="standard" spellCheck={false} autoFocus margin="dense" id="cpriRate" label="CPRI Rate" type="text" style={{ width: '20%', paddingRight: '2%' }} value={RRHList[selectedRRHindex]?.cpriRate } onChange={(event) => { onCellTextChange(event) }}  error={rrherrorindex[currentCell][currentRRH]?.cpriRate != ""}  helperText={rrherrorindex[currentCell][currentRRH]?.cpriRate} inputProps={{ min: 0, max: 255 }} onKeyDown={(event) => ["e", "E", "+", "-","."].includes(event.key) && event.preventDefault()} InputLabelProps={{ shrink: true,sx: { left: "1rem", right: "1rem", } }}/>
                <br></br>
              <FormControl variant="standard" margin="dense" style={{ width: '18%', paddingRight: '2%' }} >
                <InputLabel id="ret">RRH Date</InputLabel>
                <Select
                  labelId="setRRHDate"
                  id="setRRHDate"
                  label="setRRHDate"
                  value={selectedRRHDate}
                  onChange={RRHDateDropDownChange}>
                  {retOptions?.map(option => (
                    <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              {/* <TextField variant="standard" spellCheck={false} autoFocus margin="dense" id="duplexMode" label="Duplex Mode" type="number" defaultValue="0" style={{ width: '18%', paddingRight: '2%' }} value={RRHList? RRHList[selectedRRHindex]?.duplexMode? RRHList[selectedRRHindex]?.duplexMode:0:0} onChange={(event) => { onCellTextChange(event) }}  InputLabelProps={{ shrink: true,sx: { left: "1rem", right: "1rem", } }}/> */}
              <FormControl variant="standard" margin="dense" style={{ width: '18%', paddingRight: '2%' }} >
               <InputLabel id="duplexMode">Duplex Mode</InputLabel>
                <Select
                  labelId="duplexMode"
                  id="duplexMode"
                  label="duplexMode"
                  value={selectedDuplexMode}
                  onChange={DuplexModeDownChange}>
                  {DuplexModeOptions?.map(option1 => (
                    <MenuItem key={option1.value} value={option1.value}>{option1.label}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField variant="standard" spellCheck={false} autoFocus margin="dense" id="dlEarfcn" label="Dl Earfcn" type="text" defaultValue="0"  style={{ width: '18%', paddingRight: '2%' }} value={RRHList[selectedRRHindex]?.dlEarfcn} onChange={(event) => { onCellTextChange(event) }} error={rrherrorindex[currentCell][currentRRH]?.DlEarfcn != ""}  helperText={rrherrorindex[currentCell][currentRRH]?.DlEarfcn} onKeyDown={(event) => ["e", "E", "+", "-"].includes(event.key) && event.preventDefault()}  inputProps={{ min: 0, max: 4294967295 }} InputLabelProps={{ shrink: true,sx: { left: "1rem", right: "1rem", } }}/>
              <TextField variant="standard" spellCheck={false} autoFocus margin="dense" id="ulEarfcn" label="Ul Earfcn" type="text" defaultValue="0" style={{ width: '18%', paddingRight: '2%' }} value={RRHList[selectedRRHindex]?.ulEarfcn} onChange={(event) => { onCellTextChange(event) }} error={rrherrorindex[currentCell][currentRRH]?.UlEarfcn != ""}  helperText={rrherrorindex[currentCell][currentRRH]?.UlEarfcn} onKeyDown={(event) => ["e", "E", "+", "-"].includes(event.key) && event.preventDefault()} inputProps={{ min: 0, max: 4294967295 }} InputLabelProps={{ shrink: true,sx: { left: "1rem", right: "1rem", } }}/>
              <TextField variant="standard" spellCheck={false} autoFocus margin="dense" id="frequencyBand" label="Frequency Band" type="text" defaultValue="0" style={{ width: '18%', paddingRight: '2%' }} value={RRHList[selectedRRHindex]?.frequencyBand} onChange={(event) => { onCellTextChange(event) }} error={rrherrorindex[currentCell][currentRRH]?.FrequencyBand != ""}  helperText={rrherrorindex[currentCell][currentRRH]?.FrequencyBand} onKeyDown={(event) => ["e", "E", "+", "-","."].includes(event.key) && event.preventDefault()}  InputLabelProps={{ shrink: true,sx: { left: "1rem", right: "1rem", } }}/>
              <TextField variant="standard" spellCheck={false} autoFocus margin="dense" id="bandWidth" label="BandWidth" type="text" defaultValue="0" style={{ width: '18%', paddingRight: '2%' }} value={RRHList[selectedRRHindex]?.bandWidth} onChange={(event) => { onCellTextChange(event) }} error={rrherrorindex[currentCell][currentRRH]?.BandWidth != ""}  helperText={rrherrorindex[currentCell][currentRRH]?.BandWidth} InputLabelProps={{ shrink: true,sx: { left: "1rem", right: "1rem", } }} onKeyDown={(event) => ["e", "E", "+", "-","."].includes(event.key) && event.preventDefault()}/>
              {/* <FormControl variant="standard" margin="dense" style={{ width: '18%', paddingRight: '2%' }} >
               <InputLabel id="bandWidth">Bandwidth(MHz)</InputLabel>
                <Select
                  labelId="bandWidth"
                  id="bandWidth"
                  label="bandWidth"
                  value={selectedBandwidth}
                  onChange={BandwidthDropDownChange}  MenuProps={{ PaperProps: { style: { maxHeight: 200 } } }}>
                  {BandwidthOptions?.map(option1 => (
                    <MenuItem key={option1.value} value={option1.value}>{option1.label}</MenuItem>
                  ))}
                </Select>
              </FormControl> */}
              <div style={{ border: '1px solid #ccc', borderRadius: '3px', padding: '1%', marginTop: '1%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', overflow: 'auto' }}>
               <div style={{ marginTop: '0.1%' }} ><b>Delay Param</b></div>
              <TextField variant="standard" spellCheck={false} autoFocus margin="dense" id="txDelay" label="Tx Delay" type="text" defaultValue="0.0" style={{ width: '18%', paddingRight: '2%' }} value={  RRHList[selectedRRHindex]?.txDelay   } onChange={(event) => { onCellTextChange(event) }} error={rrherrorindex[currentCell][currentRRH]?.TxDelay != ""}  helperText={rrherrorindex[currentCell][currentRRH]?.TxDelay} onKeyDown={(event) => ["e", "E", "+"].includes(event.key) && event.preventDefault()} inputProps={{ step: "any" }}  InputLabelProps={{ shrink: true,sx: { left: "1rem", right: "1rem", } }}/>
              <TextField variant="standard" spellCheck={false} autoFocus margin="dense" id="rxDelay" label="RX Delay" type="text"  defaultValue="0.0" style={{ width: '18%' }} value={RRHList[selectedRRHindex]?.rxDelay  }onChange={(event) => { onCellTextChange(event) }} error={rrherrorindex[currentCell][currentRRH]?.RxDelay != ""}  helperText={rrherrorindex[currentCell][currentRRH]?.RxDelay} onKeyDown={(event) => ["e", "E", "+"].includes(event.key) && event.preventDefault()}  InputLabelProps={{ shrink: true,sx: { left: "1rem", right: "1rem", } }}/> 
              </div>
              <div style={{ border: '1px solid #ccc', borderRadius: '3px', padding: '1%', marginTop: '1%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', overflow: 'auto' }}>
               <div style={{ marginTop: '0.1%' }} ><b>CPRI Loopback</b></div>
               <FormControl variant="standard" margin="dense" style={{ width: '20%', paddingRight: '2%' }} >
                <InputLabel id="ret">LoopBackEnabled</InputLabel>
                <Select
                  labelId="isLoopBackEnabled"
                  id="isLoopBackEnabled"
                  label="isLoopBackEnabled"
                  value={selectedLoopBack}
                  onChange={LoopBackEnabledDropDownChange}>
                  {loopBackOptions?.map(option => (
                    <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField variant="standard" spellCheck={false} autoFocus margin="dense" defaultValue="0" id="mode" label="Mode" type="text" style={{ width: '18%', paddingRight: '2%' }} value={ RRHList[selectedRRHindex]?.mode} onChange={(event) => { onCellTextChange(event) }} error={rrherrorindex[currentCell][currentRRH]?.Mode != ""}  helperText={rrherrorindex[currentCell][currentRRH]?.Mode} onKeyDown={(event) => ["e", "E", "+", "-","."].includes(event.key) && event.preventDefault()}  inputProps={{ min: 0, max: 2 }}  InputLabelProps={{ shrink: true,sx: { left: "1rem", right: "1rem", } }}/>
              <TextField variant="standard" spellCheck={false} autoFocus margin="dense" defaultValue="0" id="testTime" label="Test Time" type="text" style={{ width: '18%', paddingRight: '2%' }} value={ RRHList[selectedRRHindex]?.testTime} onChange={(event) => { onCellTextChange(event) }} error={rrherrorindex[currentCell][currentRRH]?.TestTime != ""}  helperText={rrherrorindex[currentCell][currentRRH]?.TestTime} onKeyDown={(event) => ["e", "E", "+", "-","."].includes(event.key) && event.preventDefault()}  inputProps={{ min: 0, max: 3 }}  InputLabelProps={{ shrink: true,sx: { left: "1rem", right: "1rem", } }}/>
               {/* <TextField variant="standard" spellCheck={false} autoFocus margin="dense" id="txDelay" label="Tx Delay" type="number" style={{ width: '20%', paddingRight: '2%' }} value={celldata?.txDelay? celldata?.txDelay:''} onChange={(event) => { onCellTextChange(event) }}  InputLabelProps={{ shrink: true,sx: { left: "1rem", right: "1rem", } }}/>
              <TextField variant="standard" spellCheck={false} autoFocus margin="dense" id="rxDelay" label="RX Delay" type="number" style={{ width: '20%' }} value={celldata?.rxDelay? celldata?.rxDelay:''} onChange={(event) => { onCellTextChange(event) }} InputLabelProps={{ shrink: true,sx: { left: "1rem", right: "1rem", } }}/>   */}
              </div>
              <div style={{ border: '1px solid #ccc', borderRadius: '3px', padding: '1%', marginTop: '1%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', overflow: 'auto' }}>
                <div style={{ marginTop: '0.1%' }} ><b>RRH Antenna Config</b></div>
               <TextField variant="standard" spellCheck={false} autoFocus margin="dense" id="antennaId" label="Antenna Id" type="text" defaultValue="0" style={{ width: '18%', paddingRight: '2%' }} value={RRHList[selectedRRHindex]?.antennaId} onChange={(event) => { onCellTextChange(event) }} error={rrherrorindex[currentCell][currentRRH]?.AntennaId != ""}  helperText={rrherrorindex[currentCell][currentRRH]?.AntennaId} onKeyDown={(event) => ["e", "E", "+", "-","."].includes(event.key) && event.preventDefault()} InputLabelProps={{ shrink: true,sx: { left: "1rem", right: "1rem", } }}/>
                {/* <TextField variant="standard" spellCheck={false} autoFocus margin="dense" id="AntennaPort" label="Antenna Port" type="number" style={{ width: '20%', paddingRight: '2%' }} value={celldata?.AntennaPort? celldata?.AntennaPort:''} onChange={(event) => { onCellTextChange(event) }} /> */}
                {/* <TextField variant="standard" spellCheck={false} autoFocus margin="dense" id="Tilt" label="Tilt" type="number" style={{ width: '20%', paddingRight: '2%' }} value={celldata?.Tilt? celldata?.Tilt:''} onChange={(event) => { onCellTextChange(event) }} /> */}
                <TextField variant="standard" spellCheck={false} autoFocus margin="dense" id="antennaGain" label="Antenna Gain" type="text" defaultValue="0" style={{ width: '18%', paddingRight: '2%' }} value={RRHList[selectedRRHindex]?.antennaGain} onChange={(event) => { onCellTextChange(event) }} error={rrherrorindex[currentCell][currentRRH]?.AntennaGain != ""}  helperText={rrherrorindex[currentCell][currentRRH]?.AntennaGain} onKeyDown={(event) => ["e", "E", "+", "-","."].includes(event.key) && event.preventDefault()}  inputProps={{ min: 0, max: 120 }}  />
                <TextField variant="standard" spellCheck={false} autoFocus  margin="dense" id="TXPower" label="TX Power" type="text" defaultValue="0.0"style={{ width: '18%', paddingRight: '2%' }} value={RRHList[selectedRRHindex]?.txPower} onChange={(event) => { onCellTextChange(event) }} error={rrherrorindex[currentCell][currentRRH]?.TxPower != ""} helperText={rrherrorindex[currentCell][currentRRH]?.TxPower} onKeyDown={(event) => ["e", "E", "+"].includes(event.key) && event.preventDefault()} InputLabelProps={{ shrink: true, sx: { left: "1rem", right: "1rem" }  }}/> 
              </div>
              </div> )
              : null
              }
              <div style={{ marginLeft: '79%', marginTop: '1%' }}>
                <Button variant="contained" style={{ color: '#ffffff', backgroundColor: '#53659c', width: '150px', marginBottom: '2px' }}onClick={saveData}>Save</Button>
              </div>
              </div>
            </div>)
          : null
        }
      </div>
    </div>
    </div>
    </div>
  )
}
