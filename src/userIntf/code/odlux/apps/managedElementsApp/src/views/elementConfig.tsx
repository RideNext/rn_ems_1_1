/**********
 *  # ====================================================================================
 *  #Copyright (C) 2024 RideNext Software Solutions. Pvt Ltd.  All rights reserved
 *  #=================================================================================================
*********/

import { useMemo, useRef, useState } from "react";
//import React from 'react';
import { useLocation } from "react-router-dom";
import { ReactSession } from "react-client-session";
import axios from "axios";
import React, { useEffect } from "react";
import { AppBar, Box, Button, Dialog, DialogActions,SelectChangeEvent, DialogContent, DialogContentText, DialogTitle, Icon, InputLabel,FormControl,Select, MenuItem, Paper, Stack, Tab, Table, TableBody, TableCell, TableHead, TableRow, Tabs, TextField, Typography, colors, createStyles, listItemSecondaryActionClasses, makeStyles } from '@mui/material';
import { Height, LegendToggleOutlined, Padding } from "@mui/icons-material";
import { TreeItem, TreeView } from "@mui/lab";
// Icons
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';
import { DuConfig } from '../components/duConfig';
import { CellConfig } from '../components/cellConfig';
import { CucpConfig } from '../components/cucpConfig';
import { CuupConfig } from '../components/cuupConfig';
import { Summary } from '../components/summary';



ReactSession.setStoreType("localStorage");

let nodeId = location.pathname.split("/")[2];


// const useStyles = makeStyles(() =>
//   createStyles({
//   root: {
//     width: "100%",
//    // marginTop: theme.spacing(3),
//     overflowX: "auto"
//   },
//   table: {
//     minWidth: 650
//   },
//   selectTableCell: {
//     width: 60
//   },
//   tableCell: {
//     width: 130,
//     height: 40
//   },
//   input: {
//     width: 130,
//     height: 40
//   }
// })
// )
export default function ElementConfig(this: any) {
  const location = useLocation();
  let nodeId = location.pathname.split('/')[2]
  

  const [errors, setErrors] = useState({
    mccError: false, mncError: false, CellLocalIdError: false, DnPrefixError: false,priorityLabelError: false,DefaultFileReportingPeriodError:false, SNSSAIError: false , DefaultFileBasedGpError: false 
  });
  const [isFormValid, setIsFormValid] = useState(true);
  const [basicdata, setbasicdata] = useState<any>();
  const [open, setOpen] = React.useState(false);
  const [SaveSucesopen, setSaveSucesopen] = React.useState(false);
  const [Sucessmsg, setSucessmsg] = React.useState("");
  const [dialogTitle, setdialogTitle] = React.useState("");
  const [savedialogTitle, setsavedialogTitle] = React.useState("");
  const [isEdit, setisEdit] = React.useState(false);
  const [listName, setlistName] = React.useState("");
  const [listTitle, setlistTitle] = React.useState("");
  const [selectePPRow, setselectePPRow] = React.useState({ id: "", siteIdentification: "", siteDescription: "", environmentType: "", powerInterface: "" });
  const [selectePLMNRow, setselectePLMNRow] = React.useState({ id: "", Name: "", MCC: "", MNC: "" });
  const [selecteRRMPolicyListRow, setselecteRRMPolicyListRow] = React.useState({ id: "", Name: "", PLMNInfo: "", SNSSAI: "" });
  const [selecteCellLocalIdRow, setselecteCellLocalIdRow] = React.useState({ id: "", CellLocalId: "" });
  const [selectGenericParametersRow, setSelectGenericParametersRow] = React.useState({ id: "",DnPrefix: "", PriorityLabel: "", DefaultFileLocation: "", DefaultFileReportingPeriod: "", DefaultFileBasedGp: "", PmaAdministrativeState: ""})
  const [selectedplmnInfo, setSelectedplmnInfo] = useState("");
  

  let [PProws, setPPRows] = React.useState<any[]>([]);
  let [plmnrows, setplmnrows] = React.useState<any[]>([]);
  let [RRMPolicyListrows, setRRMPolicyList] = React.useState<any[]>([]);
  let [CellLocalIdrows, setCellLocalIdrows] = React.useState<any[]>([]);
  //let [plmnInfoOptions, setplmnInfoOptions] = React.useState<any[]>([]);
  const PmaAdministartiveStateOptions = [
    { value: 'LOCKED', label: 'LOCKED' },
    { value: 'UNLOCKED', label: 'UNLOCKED' },
    { value: 'SHUTTING DOWN', label: 'SHUTTING DOWN' },
  ];
  
  const [EnvironmentTypeOptions] = useState([
    { label: 'Indoor', value: 'Indoor' },
    { label: 'Outdoor', value: 'Outdoor' },
  ]);
  const [powerInterfaceOptions] = useState([
    { label: 'AC', value: 'AC' },
    { label: 'DC', value: 'DC' },
  ]);
  // Add state variables for selected options
  const [selectedPmaAdministrativeStateType, setSelectedPmaAdministrativeStateType] = useState("");
  
  const addPLMNInfo = (label: string, value: string) => ({
    label,
    value,
  });

  const fetchBasicConfigData = (nodeId: any) => {
    let basicResdata: any;
    const baseUri = `${window.location.origin}`;
    const DbPath = baseUri + "/basic_config/_doc/" + nodeId;
    setPPRows([])
    setplmnrows([])
    setRRMPolicyList([])
    setCellLocalIdrows([])
    

    axios.get(DbPath).then((res: any) => {
      basicResdata = res.data._source.basicdata;
      setbasicdata(basicResdata);
    
      const newPPRows : any[] = []
      //PPlist
      basicResdata?.PeerParameterList?.map((row: any) => {
        return newPPRows.push(row);
      });
      setPPRows(newPPRows);
      
      //PLMNInfo
      const newRowsplmn : any[] = []
      basicResdata?.PLMNInfo?.map((row: any) => {
        return newRowsplmn.push(createPLMNInfo(row.Name, row.MCC, row.MNC));
      });
      setplmnrows(newRowsplmn);


      //RRMPolicyList
      const NewRRMPolicyListrows  : any[] = []
      basicResdata?.RRMPolicyList?.map((row: any) => {
        return NewRRMPolicyListrows.push({ id: (row.PLMNInfo).split("_")[0]+row.SNSSAI, Name: row.PLMNInfo+"_"+ row.SNSSAI, PLMNInfo:row.PLMNInfo, SNSSAI:row.SNSSAI });
       // id: selectedplmnInfo+SNSSAI, Name: PLMNInfo+"_"+SNSSAI, PLMNInfo, SNSSAI,
        //return NewRRMPolicyListrows.push(createRRMPolicyList(row.Name, row.newPLMNInfo, row.SNSSAI));
      });

      setRRMPolicyList(NewRRMPolicyListrows);

     


      //CellLocalId
      const NewCellLocalIdrows : any[] = []
      basicResdata?.CellLocalId?.map((row: any) => {
        return NewCellLocalIdrows.push(createcellLocalIdt(NewCellLocalIdrows.length+1,row.CellLocalId));
      });
      setCellLocalIdrows(NewCellLocalIdrows);

    }).catch((err: { response: { data: { error: { type: string; }; }; }; message: any; }) => {
      console.log(err);
      if(err.response.data.error.type && err.response.data.error.type=='index_not_found_exception')
      {
        var uri4=(baseUri) + '/basic_config/';
        axios.put(uri4)
        .then((res: any) => {
            console.log(res);
        }).catch((err: any) => {
            console.log(err);
          })
      }
  })
  }

  const AddnewPPData = (siteIdentification: string, siteDescription: string, environmentType: string, powerInterface: string) => ({
    id: siteIdentification.replace(" ", "_"),
    siteIdentification,
    siteDescription,
    environmentType,
    powerInterface
  });

  const createPLMNInfo = (Name: string, MCC: string, MNC: string) => ({ id: MCC+MNC,  Name: MCC+"_"+MNC, MCC, MNC });
  const createRRMPolicyList = (Name: string, PLMNInfo: string, SNSSAI: string) => ({ id: selectedplmnInfo+SNSSAI, Name: PLMNInfo+"_"+SNSSAI, PLMNInfo, SNSSAI, });
    // ({ id: Name.replace(" ", "_"), Name, PLMNInfo, SNSSAI, });
  const createcellLocalIdt = (id:number,CellLocalId: string) => ({
     id: id, 
     CellLocalId 
    });

  const CustomTableCell = ({ row, name }: { row: any, name: any }) => {
    return (
      <TableCell align="center" style={{ width: '100px', height: '5px' }}>
        {row[name]}
      </TableCell>
    );
  };

  const handleError = (name: any, value: any) => {
    setErrors(prevErrors => ({
      ...prevErrors,
      [name]: value
    }));
  };

  const onRRMPolicyListTextChange = (e: any) => {
    const value = e.target.value;
    const name = e.target.id;
    let valid = true;
    setSucessmsg("")
    // if (name == 'PLMNInfo') {
    //   setselecteRRMPolicyListRow({
    //     ...selecteRRMPolicyListRow,
    //     PLMNInfo: e.target.value,
    //   });
    // }
    if (name === 'SNSSAI') {
      const value = e.target.value;
      const numericValue = Number(value);
    
      // Check if the value is a valid number and within the range [0, 255]
      if (/^\d+$/.test(value) && numericValue >= 0 && numericValue <= 255) {
        setselecteRRMPolicyListRow({
          ...selecteRRMPolicyListRow,
          [name]: value,
        });
        handleError('SNSSAIError', false);
      } else {
        setselecteRRMPolicyListRow({
          ...selecteRRMPolicyListRow,
          [name]: value,
        });
        handleError('SNSSAIError', true);
        valid = false;
      }
    }
    
    if (name == 'Name') {
      setselecteRRMPolicyListRow({
        ...selecteRRMPolicyListRow,
        Name: e.target.value,
      });
    }
    setIsFormValid(valid);
  }

  const onCellLocalIdTextChange = (e: any) => {
    const value = e.target.value;
    const name = e.target.id;
    let valid = true;
    setSucessmsg("")
    if (name === 'CellLocalId') {
      if (value === '' || value === null || value === undefined) {
        setselecteCellLocalIdRow({
          ...selecteCellLocalIdRow,
          [name]: '', 
        });
        handleError('CellLocalIdError', false);
        valid = false; 
      } else if (/^\d+$/.test(value) && Number(value) >= 0 && Number(value) <= 16383) {
        setselecteCellLocalIdRow({
          ...selecteCellLocalIdRow,
          [name]: value,
        });
        handleError('CellLocalIdError', false);
      } else {
        setselecteCellLocalIdRow({
          ...selecteCellLocalIdRow,
          [name]: value, 
        });
        handleError('CellLocalIdError', true); 
        valid = false;
      }
    } 
    setIsFormValid(valid);
  }

  const isCountryCodePattern = (countryCode: any) => {
    const countryCodePattern = /^(0[0-9]|[1-7][0-9])[0-9]$/; // Matches valid MCC patterns
    return countryCodePattern.test(countryCode);
  }
  
  const isNetworkCodePattern = (networkCode: any) => {
    const networkCodePattern = /^[0-9]{2,3}$/; // Matches 2 or 3 digit MNC
    return networkCodePattern.test(networkCode);
  }
  
  const onPLMNTextChange = (e: any) => {
    const value = e.target.value;
    const name = e.target.id;
    let valid = true;
    const errors = {
      mccError: false,
      mncError: false,
    };  
    setSucessmsg("")
    if (name === 'mcc') {
      setselectePLMNRow((prev) => ({ ...prev, MCC: value }));
      if (isCountryCodePattern(value)) {
        handleError('mccError', false);  
      } else {
        handleError('mccError', true);  
        errors.mccError = true;
        valid = false;  
      }
    }  
     
    if (name === 'mnc') {
      setselectePLMNRow((prev) => ({ ...prev, MNC: value }));
      if (isNetworkCodePattern(value)) {
        handleError('mncError', false);  
      } else {
        handleError('mncError', true);  
        errors.mncError = true;
        valid = false;  
      }
    }  
    
    if (name === 'Name') {
      setselectePLMNRow((prev) => ({
        ...prev,
        Name: e.target.value,
      }));
    }  
     
    setIsFormValid(valid); 
  }
  

  const onTextChange = (e: any) => {
    const value = e.target.value;
    const name = e.target.id;
    setSucessmsg("")
    if (name == 'siteIdentification') {
      setselectePPRow({
        ...selectePPRow,
        siteIdentification: e.target.value,
      });
    }
    if (name == 'siteDescription') {
      setselectePPRow({
        ...selectePPRow,
        siteDescription: e.target.value,
      });
    }
    if (name == 'environmentType') {
      setselectePPRow({
        ...selectePPRow,
        environmentType: e.target.value,
      });
    }
    if (name == 'powerInterface') {
      setselectePPRow({
        ...selectePPRow,
        powerInterface: e.target.value,
      });
    } 
  }

  useEffect(() => {
    //setSelectedplmnInfo(basicdata?.PLMNInfo || "");
    setSelectedPmaAdministrativeStateType(basicdata?.PmaAdministrativeState || "");
  }, [basicdata]);

  const PmaAdministrativeStateDropDownChange = (e: SelectChangeEvent<string>) => {
    const value = e.target.value;
    setSelectedPmaAdministrativeStateType(value);
    setbasicdata({
      ...basicdata,
      PmaAdministrativeState: value,
    });
  };

  const onBasicTextChange = (e: any) => {
    const value = e.target.value;
    const name = e.target.id;
    let valid = true;

    if (name === 'DnPrefix') {
      const alphanumericHyphenRegex = /^[a-zA-Z0-9-]*$/;
    
      if (value === '' || value === null || value === undefined) {
        setbasicdata({
          ...basicdata,
          [name]: '', 
        });
        handleError('DnPrefixError', false); 
        valid = false;
      } else if (alphanumericHyphenRegex.test(value)) {
        setbasicdata({
          ...basicdata,
          [name]: value,
        });
        handleError('DnPrefixError', false); 
      } else {
        setbasicdata({
          ...basicdata,
          [name]: value, 
        });
        handleError('DnPrefixError', true); 
        valid = false;
      }
    }  
    if (name === 'PriorityLabel') {
      if (value === '' || value === null || value === undefined) {
        setbasicdata({
          ...basicdata,
          [name]: '', 
        });
        handleError('priorityLabelError', true);
        valid = false;
      } else if (/^\d+$/.test(value) && Number(value) >= 0 && Number(value) <= 4294967295) {
        setbasicdata({
          ...basicdata,
          [name]: value,
        });
        handleError('priorityLabelError', false);
      } else {
        setbasicdata({
          ...basicdata,
          [name]: value, 
        });
        handleError('priorityLabelError', true);
        valid = false;
      }
    }
    
    
    if (name == 'DefaultFileLocation') {
      setbasicdata({
        ...basicdata,
        DefaultFileLocation: e.target.value,
      });
    }
    if (name === 'DefaultFileReportingPeriod') {
      if (value === '' || value === null || value === undefined) {
        setbasicdata({
          ...basicdata,
          [name]: '', 
        });
        handleError('DefaultFileReportingPeriodError', true);
        valid = false;
      } else if (/^\d+$/.test(value) && Number(value) >= 0 && Number(value) <= 4294967295) {
        setbasicdata({
          ...basicdata,
          [name]: value,
        });
        handleError('DefaultFileReportingPeriodError', false);
      } else {
        setbasicdata({
          ...basicdata,
          [name]: value,
        });
        handleError('DefaultFileReportingPeriodError', true);
        valid = false;
      }
    }
    
    

    if (name === 'DefaultFileBasedGp') {
      if (value === '' || value === null || value === undefined) {
        setbasicdata({
          ...basicdata,
          DefaultFileBasedGp: '', 
        });
        handleError('DefaultFileBasedGpError', true);  
        valid = false;
      } else if (/^\d+$/.test(value) && Number(value) >= 0 && Number(value) <= 4294967295) {
        setbasicdata({
          ...basicdata,
          DefaultFileBasedGp: value,
        });
        handleError('DefaultFileBasedGpError', false);  
      } else {
        setbasicdata({
          ...basicdata,
          DefaultFileBasedGp: value,
        });
        handleError('DefaultFileBasedGpError', true);  
        valid = false;
      }
    }
    
    
    if (name == 'PmaAdministrativeState') {
      setbasicdata({
        ...basicdata,
        PmaAdministrativeState: e.target.value,
      });
    }
    valid = !errors.DefaultFileBasedGpError &&  !errors.DefaultFileReportingPeriodError && ! errors.priorityLabelError && ! errors.DnPrefixError ;
    setIsFormValid(valid);  
  }


  const onChange = (e: any) => {
    const value = e.target.value;
    const name = e.target.name;
  };


  const addNewRecord = (listName: any, listTitle: any) => {
    setErrors({ mccError: false, mncError: false, CellLocalIdError: false, DnPrefixError: false,priorityLabelError: false,DefaultFileReportingPeriodError:false, SNSSAIError: false ,DefaultFileBasedGpError:false});
    setSucessmsg("");
    setOpen(true);
    setdialogTitle("Add New Redord");
    setisEdit(false)
    setlistName(listName)
    setlistTitle(listTitle)
    setselectePPRow({ id: "", siteIdentification: "",  siteDescription: "",  environmentType: "", powerInterface: "", });
    setselectePLMNRow({ id: "", Name: "", MCC: "", MNC: "", });
    setselecteRRMPolicyListRow({ id: "",  Name: "",  PLMNInfo: "", SNSSAI: "", });
    setselecteCellLocalIdRow({ id: "", CellLocalId: "" });
    setSelectedplmnInfo("");
  };

  const [currentTabIndex, setCurrentTabIndex] = useState(0);
  useEffect(() => {
    nodeId = location.pathname.split('/')[2];
    if(currentTabIndex === 0){
      fetchBasicConfigData(nodeId);
      
    }
  }, [currentTabIndex])
  const handleTabChange = (e: any, tabIndex: React.SetStateAction<number>) => {
    console.log(tabIndex);
    setCurrentTabIndex(tabIndex);
  };

  const onDeleteRow = (listName: any, row: any) => {
    setSaveSucesopen(false);
    setSucessmsg("");
    setsavedialogTitle("");

    if (listName === "PeeParametersRecord") {
      const newRows = PProws?.filter((item: any) => item.id !== row?.id);
      setPPRows(newRows);
      basicdata.PeerParameterList = newRows;
    }
    else if (listName === "PLMNInfo") {
      var isExist = RRMPolicyListrows?.some(rrmitem => rrmitem.PLMNInfo === row?.Name);
      if(!isExist)
      {
      const newRows = plmnrows?.filter((item) => item.id !== row?.id);
      setplmnrows(newRows);
      basicdata.PLMNInfo = newRows;
      }
      else{
        setSaveSucesopen(true);
        setSucessmsg("Select PLMNInfo Reffered in RRMPolicyList, so delete not allowed..");
        setsavedialogTitle("Warning");
      }
    }
    else if (listName === "RRMPolicyList") {
      const newRows = RRMPolicyListrows?.filter((item) => item.id !== row?.id);
      setRRMPolicyList(newRows);
      basicdata.RRMPolicyList = newRows;
    }
    else if (listName === "CellLocalId") {
      const newRows = CellLocalIdrows?.filter((item) => item.id !== row?.id);
      setCellLocalIdrows(newRows);
      basicdata.CellLocalId = newRows;
    }
  };

  React.useEffect(() => {
    setPPRows(PProws);
  }, [PProws]);

  React.useEffect(() => {
    setplmnrows(plmnrows);
  }, [plmnrows]);

  React.useEffect(() => {
    setRRMPolicyList(RRMPolicyListrows);
  }, [RRMPolicyListrows]);

  React.useEffect(() => {
    setCellLocalIdrows(CellLocalIdrows);
  }, [CellLocalIdrows]);


  const handleEditOpen = (listName: any, listTitle: any, row: any) => {
    setErrors({ mccError: false, mncError: false, CellLocalIdError: false, DnPrefixError: false,priorityLabelError: false,DefaultFileReportingPeriodError:false, SNSSAIError: false, DefaultFileBasedGpError:false });
    setSaveSucesopen(false);
    setSucessmsg("");
    setsavedialogTitle("");
    setOpen(true);
    setdialogTitle("Edit Record");
    setisEdit(true);
    setlistName(listName);
    setlistTitle(listTitle);
    if (listName === "PeeParametersRecord") {
      setselectePPRow({
        id: row.id,
        siteIdentification: row.siteIdentification,
        siteDescription: row.siteDescription,
        environmentType: row.environmentType,
        powerInterface: row.powerInterface,
      });
    }
    else if (listName === "PLMNInfo") {
      setselectePLMNRow({
        id: row.id,
        Name: row.Name,
        MCC: row.MCC,
        MNC: row.MNC,
      });
    }
    else if (listName === "RRMPolicyList") {
      setselecteRRMPolicyListRow({
        id: row.id,
        Name: row.Name,
        PLMNInfo: row.PLMNInfo,
        SNSSAI: row.SNSSAI,
      });
      setSelectedplmnInfo(row?.PLMNInfo);
    }
    else if (listName === "CellLocalId") {
      setselecteCellLocalIdRow({
        id: row.id,
        CellLocalId: row.CellLocalId
      });
    }
  };

  const handleClose = (event: any, reason: string) => {
    event.preventDefault();
    event.stopPropagation();
    if (reason != "backdropClick" && reason != "escapeKeyDown") {
      setOpen(false);
    }
  };

  const handleSaveSecessClose = (event: any, reason: string) => {
    event.preventDefault();
    event.stopPropagation();
    setSaveSucesopen(false);
  };

  const savePeeParametersData = () => {
    // Validate that all fields are filled
    const areFieldsFilled = selectePPRow.siteIdentification && selectePPRow.siteDescription && selectePPRow.environmentType && selectePPRow.powerInterface;
    
    if (!areFieldsFilled) {
        setSucessmsg("All fields must be filled.");
        setsavedialogTitle("Warning");
        setSaveSucesopen(true); // Keep the dialog open to show the warning message
        setOpen(false);
        return; // Exit the function if validation fails
    }
    if (isEdit) {
      const newRows = PProws?.map((row: any) => {
        return row;
      });

      var isduplecate = newRows?.some(item => selectePPRow.siteIdentification === item.siteIdentification);

      if(isduplecate==true)
        {
          setSucessmsg("site Identification should be unique.");
          setsavedialogTitle("Warning");
          setSaveSucesopen(true);
          setOpen(false);
          return ;
        }
      PProws = PProws?.map((row: any) => {
        if (row.id === selectePPRow.id) {
          return { ...row, ['siteIdentification']: selectePPRow.siteIdentification, ['siteDescription']: selectePPRow.siteDescription, ['environmentType']: selectePPRow.environmentType, ['powerInterface']: selectePPRow.powerInterface };
        }
        return row;
      });
      setPPRows(PProws);
      basicdata.PeerParameterList = PProws;
      setOpen(false);
    }
    else {
      const newRows = PProws?.map((row: any) => {
        return row;
      });

      var isduplecate = newRows?.some(item => selectePPRow.siteIdentification === item.siteIdentification);

      if(isduplecate==true)
        {
          setSucessmsg("site Identification should be unique.");
          setsavedialogTitle("Warning");
          setSaveSucesopen(true);
          setOpen(false);
          return ;
        }
      else {
        newRows.push(AddnewPPData(selectePPRow.siteIdentification, selectePPRow.siteDescription, selectePPRow.environmentType, selectePPRow.powerInterface))
        setPPRows(newRows);
        basicdata.PeerParameterList = newRows; 
        setSucessmsg("");
        setOpen(false);
      }
    }

    setselectePPRow({
      id: "row.id",
      siteIdentification: "",
      siteDescription: "",
      environmentType: "",
      powerInterface: "",
    });
  }

  const savePLMNInfoData = () => {    
    const areFieldsFilled = selectePLMNRow.MCC && selectePLMNRow.MNC;    
    if (!areFieldsFilled) {
        setSucessmsg("All fields must be filled.");
        setsavedialogTitle("Warning");
        setSaveSucesopen(true);
        setOpen(false);
        return;  
    }  

    if (isEdit) {
        var id = selectePLMNRow.id;        
        var isDuplicate = plmnrows?.some(item => 
            item.id !== id && `${selectePLMNRow.MCC}_${selectePLMNRow.MNC}` === `${item.MCC}_${item.MNC}`
        );  

        if (isDuplicate) {
            setSucessmsg("MCC and MNC pair should be unique.");
            setsavedialogTitle("Warning");
            setSaveSucesopen(true);
            setOpen(false);
            return;  
        } else {
            plmnrows = plmnrows?.map(row => {
                if (row.id === selectePLMNRow.id) {
                    return { 
                        ...row, 
                        Name: `${selectePLMNRow.MCC}_${selectePLMNRow.MNC}`,  
                        MCC: selectePLMNRow.MCC, 
                        MNC: selectePLMNRow.MNC 
                    };
                }
                return row;
            });

            setplmnrows(plmnrows);
            basicdata.PLMNInfo = plmnrows;
            setSucessmsg("");     
            setOpen(false);       
        }
    } else {
        const newRows = [...plmnrows];          
        var isDuplicate = newRows?.some(item => 
            item.Name === `${selectePLMNRow.MCC}_${selectePLMNRow.MNC}`
        );

        if (!isDuplicate) {
            var id = `${selectePLMNRow.MCC}_${selectePLMNRow.MNC}`;
            isDuplicate = newRows?.some(item => id === item.id);
        }  

        if (isDuplicate) {
            setSucessmsg("MCC and MNC pair should be unique.");
            setsavedialogTitle("Warning");
            setSaveSucesopen(true);
            setOpen(false);
            return;  
        } else {
            newRows.push({ 
                id: `${selectePLMNRow.MCC}_${selectePLMNRow.MNC}`, 
                Name: `${selectePLMNRow.MCC}_${selectePLMNRow.MNC}`, 
                MCC: selectePLMNRow.MCC, 
                MNC: selectePLMNRow.MNC 
            });
            
            setplmnrows(newRows);
            basicdata.PLMNInfo = newRows;
            setSucessmsg("");     
            setOpen(false);       
        }
    }     
  
    setselectePLMNRow({
        id: "",
        Name: "",
        MCC: "",
        MNC: "",
    });
}

  

  const saveRRMPolicyListData = () => {
    
    const areFieldsFilled = selectedplmnInfo && selecteRRMPolicyListRow.SNSSAI;
    if (!areFieldsFilled) {
      setSucessmsg("All fields must be filled.");
      setsavedialogTitle("Warning");
      setSaveSucesopen(true);
      setOpen(false);
      return;  
    }
  
    if (isEdit) {
      var id = selecteRRMPolicyListRow.id;
      
         var isDuplicate = RRMPolicyListrows?.some(item => item.id !== id && selectedplmnInfo + "_" + selecteRRMPolicyListRow.SNSSAI === item.PLMNInfo + "_" + item.SNSSAI );
      
      if (isDuplicate) {
        setSucessmsg("PLMNInfo and SNSSAI pair should be unique.");
        setsavedialogTitle("Warning");
        setSaveSucesopen(true);
        setOpen(false);
        return;  
      } else {
            RRMPolicyListrows = RRMPolicyListrows?.map(row => {
          if (row.id === selecteRRMPolicyListRow.id) {
            return { 
              ...row, 
              Name: selectedplmnInfo + "_" + selecteRRMPolicyListRow.SNSSAI,   
              PLMNInfo: selectedplmnInfo,                                      
              SNSSAI: selecteRRMPolicyListRow.SNSSAI                           
            };
          }
          return row;
        });
  
        setRRMPolicyList(RRMPolicyListrows);
        basicdata.RRMPolicyList = RRMPolicyListrows;
        setSucessmsg("");     
        setOpen(false);      
      }
    } else {
      const newRows = [...RRMPolicyListrows];  
  
       
      var isDuplicate = newRows?.some(item => item.Name === selectedplmnInfo + "_" + selecteRRMPolicyListRow.SNSSAI);
      
      if (!isDuplicate) {
         
        var id = selectedplmnInfo + selecteRRMPolicyListRow.SNSSAI;
        isDuplicate = newRows?.some(item => id === item.id);
      }
  
      if (isDuplicate) {
        setSucessmsg("PLMNInfo and SNSSAI pair should be unique.");
        setsavedialogTitle("Warning");
        setSaveSucesopen(true);
        setOpen(false);
        return;  
      } else {
               newRows.push({ 
          id: selectedplmnInfo.split("_")[0] + selecteRRMPolicyListRow.SNSSAI, 
          Name: selectedplmnInfo + "_" + selecteRRMPolicyListRow.SNSSAI, 
          PLMNInfo: selectedplmnInfo, 
          SNSSAI: selecteRRMPolicyListRow.SNSSAI 
        });
        
        setRRMPolicyList(newRows);
        basicdata.RRMPolicyList = newRows;
        setSucessmsg("");     
        setOpen(false);       
      }
    }
       
    setselecteRRMPolicyListRow({
      id: "",
      Name: "",
      PLMNInfo: "",
      SNSSAI: "",
    });
  } 
  
  
  const saveCellLocalIdData = () => {

    const areFieldsFilled = selecteCellLocalIdRow.CellLocalId;
        if (!areFieldsFilled) {
        setSucessmsg("All fields must be filled.");
        setsavedialogTitle("Warning");
        setSaveSucesopen(true);
        setOpen(false); // Keep the dialog open to show the warning message
        return; // Exit the function if validation fails
    }
    if (isEdit) {
      var isduplecate = CellLocalIdrows?.some(item => selecteCellLocalIdRow.CellLocalId.toString() === item.CellLocalId.toString() );
      if(isduplecate==true)
        {
          setSaveSucesopen(true);
          setSucessmsg("Cell Local Id should be unique.");
          setsavedialogTitle("Warning");
          setOpen(false);
          return ;
        }
        else{
        CellLocalIdrows = CellLocalIdrows?.map(row => {
          if (row.id === selecteCellLocalIdRow.id) {
            return { ...row, ['CellLocalId']: selecteCellLocalIdRow.CellLocalId };
          }
          return row;
        });
        setCellLocalIdrows(CellLocalIdrows);
        basicdata.CellLocalId = CellLocalIdrows;
      }
    }
    else {
      const newRows = CellLocalIdrows?.map(row => {
        return row;
      });

      var isduplecate = newRows?.some(item => selecteCellLocalIdRow.CellLocalId.toString() === item.CellLocalId.toString());
      if(isduplecate==true)
        {
          setSaveSucesopen(true);
          setSucessmsg("Cell Local Id should be unique.");
          setsavedialogTitle("Warning");
          setOpen(false);
          return ;
        }
      else {
        newRows.push(createcellLocalIdt(newRows.length+1, selecteCellLocalIdRow.CellLocalId))
        setCellLocalIdrows(newRows);
        basicdata.CellLocalId = newRows;
          setSucessmsg("");
          setOpen(false);
        }
 
    }
    setselecteCellLocalIdRow({
      id: "",
      CellLocalId: "",
    });
  }

  const AddData = () => {    
    setSaveSucesopen(false);
    setSucessmsg("");
    setsavedialogTitle("");  
    if (listName === "PeeParametersRecord") {
      if (isFormValid) {
        savePeeParametersData();
      }
    }
    else if (listName === "PLMNInfo") {
      if (isFormValid) {
        savePLMNInfoData();
      }
    }
    else if (listName === "RRMPolicyList") {
      if (isFormValid) {
        saveRRMPolicyListData();
      }
    }
    else if (listName === "CellLocalId") {
      if (isFormValid) {
        saveCellLocalIdData();
      }
    } 
  
  };

  const saveData = () => {
    //alert("Data Saving");
    if (isFormValid) {
    const baseUri = `${window.location.origin}`;
    axios.post(baseUri + '/basic_config/_doc/'+nodeId,
      {
        basicdata
      }).then(function (resp: any) {
        const result = resp;
        setSaveSucesopen(true);
        setSucessmsg("Data saved successfully");
        setsavedialogTitle("Success");
      }).catch(function (err: { message: any; }) {
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
  const PlmnDropDownChange = (e: SelectChangeEvent<string>) => {
    const value = e.target.value;
    setSelectedplmnInfo(value); // Update selected peeParameters
   
  };
  const handleEnvironmentTypeDropDownChange = (e: SelectChangeEvent<string>) => {
    const value = e.target.value;
    setselectePPRow({ ...selectePPRow, environmentType: value });
  };
  const handlepowerInterfaceDropDownChange = (e: SelectChangeEvent<string>) => {
    const value = e.target.value;
    setselectePPRow({ ...selectePPRow, powerInterface: value });
  };

  return (
      <div>
          <Typography
          style={{
            marginTop: "0.1%",
            fontSize: "2.5vh",
            marginLeft:"0.1%",
            marginRight: "2%",
            marginBottom: "0.2%",
          }}
        >
          Managed Element - {window.location.hash.split("/")[2]}
        </Typography>
      <div >
      <Dialog open={SaveSucesopen} onClose={handleSaveSecessClose}  
       PaperProps={{style: { minHeight: '12vh',  minWidth: '23vw',border: '14px solid #38456a',  borderRadius: '15px', backgroundColor: '#e8e8e8' } }} >
        <DialogContent style={{alignContent:'center',textAlign:"center"}}>
            {/* <IconButton style={{ color : savedialogTitle=="Success"? '#008000':'orange', textAlign:"center" }}> {savedialogTitle=="Success"? <CheckCircleOutlineRoundedIcon />:<WarningAmberRoundedIcon/>} <h6 style={{ marginLeft:'3px', color : savedialogTitle=="Success"? '#008000':'orange', textAlign:"center" }}>{Sucessmsg}</h6> </IconButton>  */}
            <IconButton style={{ textAlign: "center" }}>
            {savedialogTitle === "Success" ? (
              <>
                <CheckCircleOutlineRoundedIcon style={{ color: '#008000' }} />
                <h6 style={{ marginLeft: '3px', color: '#008000', textAlign: "center" }}>{Sucessmsg}</h6>
              </>
            ) : (
              <>
              <WarningAmberRoundedIcon style={{ color: 'red' }} />
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
      <div style={{ width: '100%', alignSelf: 'center', overflow: 'auto', height: '101%' }}>
        <Dialog open={open} onClose={handleClose} >
          <DialogTitle id="form-dialog-title" style={{ backgroundColor: '#b3b3ff', border: '1px solid #ccc', borderRadius: '3px', padding: 0 }}> {dialogTitle}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {listTitle}
            </DialogContentText>
            {listName == "PeeParametersRecord" ?
              <div style={{ width: '80%', paddingLeft: '10%' }}>
                <TextField variant="standard" disabled={isEdit} spellCheck={false} margin="dense" id="siteIdentification" label="Site Identification" type="text" fullWidth value={selectePPRow.siteIdentification} onChange={(event) => { onTextChange(event) }}  /> 
                <TextField variant="standard" spellCheck={false} margin="dense" id="siteDescription" label="Site Description" type="text" fullWidth value={selectePPRow.siteDescription} onChange={(event) => { onTextChange(event) }}  /> 
                {/* <TextField variant="standard" spellCheck={false} margin="dense" id="environmentType" label="Environment Type" type="text" fullWidth value={selectePPRow.environmentType} onChange={(event) => { onTextChange(event) }}   /> */}
                <FormControl variant="standard" margin="dense" fullWidth>
                    <InputLabel id="environmentType">EnvironmentType</InputLabel>
                    <Select labelId="environmentType" id="environmentType" value={selectePPRow.environmentType} onChange={handleEnvironmentTypeDropDownChange} label="environmentType">
                      {EnvironmentTypeOptions?.map(option => (<MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>))}
                    </Select>
                  </FormControl>
                {/* <TextField variant="standard" spellCheck={false} margin="dense" id="powerInterface" label="Power Interface" type="number" fullWidth value={selectePPRow.powerInterface} onChange={(event) => { onTextChange(event) }} onKeyDown={(event) => ["e", "E", "+", "-"].includes(event.key) && event.preventDefault()} />  */}
                <FormControl variant="standard" margin="dense" fullWidth>
                    <InputLabel id="powerInterface">powerInterface</InputLabel>
                    <Select labelId="powerInterface" id="powerInterface" value={selectePPRow.powerInterface} onChange={handlepowerInterfaceDropDownChange} label="powerInterface">
                      {powerInterfaceOptions?.map(option => (<MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>))}
                    </Select>
                  </FormControl>
              </div> : listName == "PLMNInfo" ?
                <div style={{ width: '80%', paddingLeft: '10%' }}>
                 {isEdit ? ( <TextField variant="standard" disabled={isEdit} spellCheck={false} margin="dense" id="Name" label="Name" type="text" fullWidth value={selectePLMNRow.Name}  onChange={(event) => { onPLMNTextChange(event)}} onKeyDown={(event) => ["e", "E", "+", "-"].includes(event.key) && event.preventDefault()} />
                 ): null}
                  <TextField variant="standard" spellCheck={false} margin="dense" id="mcc" label="MCC" type="text" fullWidth value={selectePLMNRow.MCC} onChange={(event) => { onPLMNTextChange(event) }} onKeyDown={(event) => ["e", "E", "+", "-"].includes(event.key) && event.preventDefault()} error={errors.mccError} helperText={errors.mccError ? 'Please enter only 3 digit country code'  : ''} />
                  <TextField variant="standard" spellCheck={false} margin="dense" id="mnc" label="MNC" type="text" fullWidth value={selectePLMNRow.MNC} onChange={(event) => { onPLMNTextChange(event) }} onKeyDown={(event) => ["e", "E", "+", "-"].includes(event.key) && event.preventDefault()} error={errors.mncError} helperText={errors.mncError ? 'Please enter only 2 or 3 digit network code' : ''} />
                </div> : listName == "RRMPolicyList" ?
                  <div style={{ width: '80%', paddingLeft: '10%' }}>
                    {isEdit ? ( <TextField variant="standard" disabled={isEdit} spellCheck={false} margin="dense" id="Name" label="Name" type="text" fullWidth value={selecteRRMPolicyListRow.Name} onChange={(event) => { onRRMPolicyListTextChange(event) }} /> ) : null}
                    {/* <TextField variant="standard" spellCheck={false} margin="dense" id="PLMNInfo" label="PLMN Info" type="text" fullWidth value={selecteRRMPolicyListRow.PLMNInfo} onChange={(event) => { onRRMPolicyListTextChange(event) }} /> */}
                    <FormControl variant="standard" margin="dense" style={{ width: '100%', paddingRight: '2%' }}>
                <InputLabel id="PLMNInfo">PLMN Info</InputLabel>
                <Select
                  labelId="PLMNInfo"
                  id="PLMNInfo"
                  label="PLMN Info"
                  value={selectedplmnInfo} // Use selectedPeeParameters instead of cuupdata.peeParameters
                  onChange={PlmnDropDownChange} >
                  {plmnrows?.map(option => (
                    <MenuItem key={option.Name} value={option.Name}>{option.Name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
                    <TextField variant="standard" spellCheck={false} margin="dense" id="SNSSAI" label="SNSSAI" type="text" fullWidth value={selecteRRMPolicyListRow.SNSSAI} onChange={(event) => { onRRMPolicyListTextChange(event) }} onKeyDown={(event) => ["e", "E", "+", "-"].includes(event.key) && event.preventDefault()} error={errors.SNSSAIError} helperText={errors.SNSSAIError ? 'Please enter range from 0 to 255' : '' }/>
                  </div> :
                  listName == "CellLocalId" ?
                    <div style={{ width: '80%', paddingLeft: '10%' }}>
                      <TextField variant="standard" spellCheck={false} margin="dense" id="CellLocalId" label="Cell Local Id" type="text" fullWidth value={selecteCellLocalIdRow.CellLocalId} onChange={(event) => { onCellLocalIdTextChange(event) }} onKeyDown={(event) => ["e", "E", "+", "-"].includes(event.key) && event.preventDefault()}error={errors.CellLocalIdError} helperText={errors.CellLocalIdError ? 'Please enter range from 0 to 16383' : '' }/>
                    </div> :
                    null
            }
            
          </DialogContent>
          <DialogActions>
            <Button onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              AddData();
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
        <AppBar enableColorOnDark position="static" style={{ width: '100%' }}>
          <Tabs indicatorColor="secondary" textColor="inherit" value={currentTabIndex} onChange={handleTabChange}  >
            <Tab aria-label="volunteer dashboard tabs" label="Basic Config" sx={{flex: 1, color: '#000000de', backgroundColor: '#c6cbd1', width: '15%', border: '1px solid #ccc', borderRadius: '5px', marginRight: '2px', marginBottom: '2px', "&.Mui-selected": { color: '#ffffff', backgroundColor: '#53659c' } }} />
            <Tab aria-label="Cell-Config-tab" label="Cell Config" sx={{flex: 1, color: '#000000de', backgroundColor: '#c6cbd1', width: '15%', border: '1px solid #ccc', marginRight: '2px', borderRadius: '5px', marginBottom: '2px', "&.Mui-selected": { color: '#ffffff', backgroundColor: '#53659c' } }} />
            <Tab aria-label="CUCP-Config-tab" label="CUCP Config" sx={{flex: 1, color: '#000000de', backgroundColor: '#c6cbd1', width: '15%', marginRight: '2px',border: '1px solid #ccc', borderRadius: '5px', marginBottom: '2px', "&.Mui-selected": { color: '#ffffff', backgroundColor: '#53659c' } }} />
            <Tab aria-label="CUUP-Config-tab" label="CUUP Config" sx={{flex: 1, color: '#000000de', backgroundColor: '#c6cbd1', width: '15%', marginBottom: '2px', border: '1px solid #ccc', borderRadius: '5px', marginRight: '2px', "&.Mui-selected": { color: '#ffffff', backgroundColor: '#53659c' } }} />
            <Tab aria-label="DU-Config-tab" label="DU Config" sx={{flex: 1, color: '#000000de', backgroundColor: '#c6cbd1', width: '15%', marginBottom: '2px',border: '1px solid #ccc', borderRadius: '5px', marginRight: '2px', "&.Mui-selected": { color: '#ffffff', backgroundColor: '#53659c' } }} />
            <Tab aria-label="Summary-tab" label="Summary" sx={{flex: 1, color: '#000000de', backgroundColor: '#c6cbd1', width: '15%', marginBottom: '2px', border: '1px solid #ccc', borderRadius: '5px', "&.Mui-selected": { color: '#ffffff', backgroundColor: '#53659c' } }} />
          </Tabs>
        </AppBar>
        <div style={{ width: '99.8%', border: '1px solid #ccc', borderRadius: '3px', marginTop: '1%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', overflow: 'auto' }}>
          {currentTabIndex === 0 ?
            (
              <div style={{ height: '525px', overflow: 'visible' }}>
                <div style={{ marginLeft: '1%' }}>
                  <div >
                    <div ><b>Generic Parameters</b></div>
                    <TextField variant="standard" spellCheck={false} autoFocus margin="dense"  id="DnPrefix" label="Dn Prefix" type="text" style={{ width: '20%', paddingRight: '2%' }} value={basicdata?.DnPrefix} onChange={(event) => { onBasicTextChange(event) }}   error={errors.DnPrefixError}  sx={{'&.MuiFormHelperText-root.Mui-error': { Color: 'red'} }} helperText={errors.DnPrefixError ? 'Please enter only alphanumeric and hypen' : '' }  InputLabelProps={{ shrink: true,sx: { left: "1rem", right: "1rem", } }}/>
                    <TextField variant="standard" spellCheck={false} autoFocus margin="dense"  id="PriorityLabel" label="Priority Label" type="text" style={{ width: '20%', paddingRight: '2%' }} value={basicdata?.PriorityLabel} onChange={(event) => { onBasicTextChange(event) }} onKeyDown={(event) => ["e", "E", "+", "-","."].includes(event.key) && event.preventDefault()} InputLabelProps={{ shrink: true,sx: { left: "1rem", right: "1rem", } }} error={errors.priorityLabelError} 
                      helperText={errors.priorityLabelError ? 'Please enter a value between 0 and 4,294,967,295.' : ''}/>
                  </div>
                  <div >
                    <div style={{ marginTop: '0.5%' }}><b>Measurement Control</b></div>
                    <TextField variant="standard" spellCheck={false} autoFocus margin="dense"  id="DefaultFileLocation" label="Default FileLocation" type="text" style={{ width: '20%', paddingRight: '2%' }} value={basicdata?.DefaultFileLocation} onChange={(event) => { onBasicTextChange(event) }}  InputLabelProps={{ shrink: true,sx: { left: "1rem", right: "1rem", } }}/>
                    <TextField variant="standard" spellCheck={false} autoFocus margin="dense"  id="DefaultFileReportingPeriod" label="Default FileReporting Period(Minute)" type="number" style={{ width: '23%', paddingRight: '3%' }} value={basicdata?.DefaultFileReportingPeriod} onChange={(event) => { onBasicTextChange(event) }} onKeyDown={(event) => ["e", "E", "+", "-","."].includes(event.key) && event.preventDefault()} InputLabelProps={{ shrink: true,sx: { left: "1rem", right: "1rem", } }} error={errors.DefaultFileReportingPeriodError}
                      helperText={errors.DefaultFileReportingPeriodError ? 'Please enter range from 0 and 4,294,967,295' : ''}/>
                    <TextField variant="standard" spellCheck={false} autoFocus margin="dense"  id="DefaultFileBasedGp" label="DefaultFile Based GP" type="number" style={{ width: '20%', paddingRight: '2%' }} value={basicdata?.DefaultFileBasedGp} onChange={(event) => { onBasicTextChange(event) }} onKeyDown={(event) => ["e", "E", "+", "-","."].includes(event.key) && event.preventDefault()} error={errors.DefaultFileBasedGpError} helperText={errors.DefaultFileBasedGpError ? 'Please enter range from 0 and 4,294,967,295' : '' }  InputLabelProps={{ shrink: true,sx: { left: "1rem", right: "1rem", } }}/>
                    {/* <TextField variant="standard" spellCheck={false} autoFocus margin="dense"  id="PMAAdministrativeState" label="PMA dministrative State" type="text" style={{ width: '20%', paddingRight: '2%' }} value={basicdata?.PMAAdministrativeState} onChange={(event) => { onBasicTextChange(event) }}  InputLabelProps={{ shrink: true,sx: { left: "1rem", right: "1rem", } }}/> */}
                    <FormControl variant="standard" margin="dense" style={{ width: '20%', paddingRight: '2%' }}>
                    <InputLabel id="pmaAdministrativeStateLabel">PMA Administrative State</InputLabel>
                    <Select
                      labelId="pmaAdministrativeStateLabel"
                      id="pmaAdministrativeStateLabel"
                      value={selectedPmaAdministrativeStateType}
                      onChange={PmaAdministrativeStateDropDownChange}
                      autoFocus
                      margin="dense"
                      label="PMA Administrative State">
                      {PmaAdministartiveStateOptions?.map(option => (
                      <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                      ))}
                    </Select>
                    </FormControl>
                  </div>
                </div>
                <Table >
                  <TableCell style={{ width: "60%", height: "20px", overflowY: "visible" }}>
                    <Paper style={{ width: "99%", border: '2px solid #ccc', marginTop: '2px' }}>
                      <div style={{ color: 'black', backgroundColor: '#c6cbd1', height: '20px' }} ><b>Pee Parameters List</b></div>
                      <IconButton aria-label="add-element" style={{ marginLeft: '90%', height: '30px' }}>
                        <AddIcon onClick={() => addNewRecord("PeeParametersRecord", "Pee Parameters List")} />
                      </IconButton>
                      <div style={{ maxHeight: "180px", overflowY: "auto" }}>
                        <Table style={{ minWidth: "99%", }} aria-label="PeeParameters table">
                        <TableHead sx={{ "& th": { color: '#ffffff', backgroundColor: '#53659c', lineHeight: '1.1', position: "sticky", top: "0", zIndex: '1' } }}>
                        <TableRow sx={{ "& .MuiTableRow-root": { maxHeight: 20 } }}>
                              <TableCell align="center" style={{ width: 120 }}>Site Identification</TableCell>
                              <TableCell align="center" style={{ width: 115 }}>Site Description </TableCell>
                              <TableCell align="center" style={{ width: 130 }}>Environment Type</TableCell>
                              <TableCell align="center" style={{ width: 120 }}>Power Interface</TableCell>
                              <TableCell align="center">Action</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody style={{ zIndex: '0' }}>
                            {PProws?.map((row: any) => (
                              <TableRow key={row.id} sx={{'&:nth-of-type(odd)': { backgroundColor: '#d7ecff'} , '& .MuiTableCell-root': { height: '12px', padding: '0'}, '&:last-child td, &:last-child th': { border: 0 }}} >
                                <CustomTableCell {...{ row, name: "siteIdentification" }} />
                                <CustomTableCell {...{ row, name: "siteDescription" }} />
                                <CustomTableCell {...{ row, name: "environmentType" }} />
                                <CustomTableCell {...{ row, name: "powerInterface" }} />
                                <TableCell align="center" style={{ width: 105, height: '5px' }}>
                                    <IconButton aria-label="edit" onClick={() => handleEditOpen("PeeParametersRecord", "Pee Parameters List", row)} >
                                      <EditIcon />
                                    </IconButton>
                                    <IconButton aria-label="delete" onClick={() => onDeleteRow("PeeParametersRecord", row)} >
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
                  <TableCell style={{ width: "40%", overflowX: "auto" }}>
                    <Paper style={{ width: "99%", overflowX: "auto", border: '2px solid #ccc', marginTop: '2px' }}>
                      <div style={{ color: 'black', backgroundColor: '#c6cbd1', height: '20px' }}><b>PLMN Info</b></div>
                      <IconButton aria-label="add-element" style={{ marginLeft: '85%', height: '30px' }}>
                        <AddIcon onClick={() => addNewRecord("PLMNInfo", "PLMN Info")} />
                      </IconButton>
                      <div style={{ maxHeight: "180px", overflowY: "auto" }}>
                        <Table style={{ minWidth: "99%" }} aria-label="PLMN table">
                        <TableHead sx={{ "& th": { color: '#ffffff', backgroundColor: '#53659c', lineHeight: '1.1', position: "sticky", top: "0", zIndex: '1' } }}>
                        <TableRow sx={{ "& .MuiTableRow-root": { maxHeight: 20 } }}>
                              <TableCell align="center" color="white"  style={{ width: 100 }}>Name</TableCell>
                              <TableCell align="center" color="white" >MCC</TableCell>
                              <TableCell align="center" color="white" >MNC </TableCell>
                              <TableCell align="center" style={{ width: 160 }} >Action</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody style={{ zIndex: '0' }}>
                            {plmnrows?.map(row => (
                              <TableRow key={row.id} sx={{'&:nth-of-type(odd)': { backgroundColor: '#d7ecff'} , '& .MuiTableCell-root': { height: '12px', padding: '0'}, '&:last-child td, &:last-child th': { border: 0 }}}>
                                <CustomTableCell {...{ row, name: "Name", onChange } } />
                                <CustomTableCell {...{ row, name: "MCC", onChange }} />
                                <CustomTableCell {...{ row, name: "MNC", onChange }} />
                                <TableCell align="center" style={{ width: 160}}>
                                    <IconButton aria-label="edit" onClick={() => handleEditOpen("PLMNInfo", "PLMN Info", row)} >
                                      <EditIcon />
                                    </IconButton>
                                    <IconButton aria-label="delete" onClick={() => onDeleteRow("PLMNInfo", row)} >
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
                <Table>
                  <TableCell style={{ width: "60%", overflowX: "auto" }}>
                    <Paper style={{ width: "99.5%", overflowX: "auto", border: '2px solid #ccc', marginTop: '2px' }}>
                      <div style={{ color: 'black', backgroundColor: '#c6cbd1', height: '20px' }} ><b> RRM Policy List</b></div>
                      <IconButton aria-label="add-element" style={{ marginLeft: '90%', height: '30px' }}>
                        <AddIcon onClick={() => addNewRecord("RRMPolicyList", "PLMN InfoRRM Policy List")} />
                      </IconButton>
                      <div style={{ maxHeight: "180px", overflowY: "auto" }}>
                        <Table style={{ minWidth: "99%" }} aria-label="RRM Policy List table">
                        <TableHead sx={{ "& th": { color: '#ffffff', backgroundColor: '#53659c', lineHeight: '1.1', position: "sticky", top: "0", zIndex: '1' } }}>
                        <TableRow sx={{ "& .MuiTableRow-root": { maxHeight: 20 } }}>
                              <TableCell align="center">Name</TableCell>
                              <TableCell align="center">PLMN Info</TableCell>
                              <TableCell align="center">SNSSAI </TableCell>
                              <TableCell align="center">Action </TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody style={{ zIndex: '0' }}>
                            {RRMPolicyListrows?.map(row => (
                              <TableRow key={row.id} sx={{'&:nth-of-type(odd)': { backgroundColor: '#d7ecff'} , '& .MuiTableCell-root': { height: '12px', padding: '0'}, '&:last-child td, &:last-child th': { border: 0 }}}>
                                <CustomTableCell {...{ row, name: "Name", onChange }} />
                                <CustomTableCell {...{ row, name: "PLMNInfo", onChange }} />
                                <CustomTableCell {...{ row, name: "SNSSAI", onChange }} />
                                <TableCell align="center" style={{ width: 90,alignContent :'center' }}>
                                    <IconButton aria-label="edit" onClick={() => handleEditOpen("RRMPolicyList", "RRM Policy List", row)} >
                                      <EditIcon />
                                    </IconButton>
                                    <IconButton aria-label="delete" onClick={() => onDeleteRow("RRMPolicyList", row)} >
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
                  <TableCell style={{ width: "39.5%", overflowX: "auto" }}>
                    <Paper style={{ width: "99%", overflowX: "auto", border: '2px solid #ccc', marginTop: '2px' }}>
                      <div style={{ color: 'black', backgroundColor: '#c6cbd1', height: '20px' }} ><b>Cell LocalId</b></div>
                      <IconButton aria-label="add-element" style={{ marginLeft: '90%', height: '30px' }}>
                        <AddIcon onClick={() => addNewRecord("CellLocalId", "Cell LocalId")} />
                      </IconButton>
                      <div style={{ maxHeight: "180px", overflowY: "auto" }}>
                        <Table style={{ minWidth: "99%" }} aria-label="Cell LocalId table">
                        <TableHead sx={{ "& th": { color: '#ffffff', backgroundColor: '#53659c', lineHeight: '1.1', position: "sticky", top: "0", zIndex: '1' } }}>
                        <TableRow sx={{ "& .MuiTableRow-root": { maxHeight: 20 } }}>
                              <TableCell align="center">Cell Local Id</TableCell>
                              <TableCell align="center">Action</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody style={{ zIndex: '0' }}>
                            {CellLocalIdrows?.map(row => (
                              <TableRow key={row.id} sx={{'&:nth-of-type(odd)': { backgroundColor: '#d7ecff'} , '& .MuiTableCell-root': { height: '12px', padding: '0'}, '&:last-child td, &:last-child th': { border: 0 }}}>
                                <CustomTableCell {...{ row, name: "CellLocalId", onChange }} />
                                <TableCell align="center" style={{ width: 90}}>
                                    <IconButton aria-label="edit" onClick={() => handleEditOpen("CellLocalId", "Cell LocalId", row)} >
                                      <EditIcon />
                                    </IconButton>
                                    <IconButton aria-label="delete" onClick={() => onDeleteRow("CellLocalId", row)} >
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
                <Button variant="contained" style={{ color: '#ffffff', backgroundColor: '#53659c', width: '150px', marginLeft: '85%', marginBottom: '3px' }} onClick={saveData}>Save</Button>
              </div>)
            : currentTabIndex === 1
              ? (
                 <div style={{ height: '470px', width: '98%', overflow: 'visible', display: 'flex', flexDirection: 'row' }}>
                <CellConfig />
                </div>
              ) : currentTabIndex === 2 ?
                (<div><CucpConfig/></div>) :
                currentTabIndex === 3 ?
                  (<div><CuupConfig /></div>) :
                  currentTabIndex === 4 ?
                    (<div><DuConfig /></div>) :
                    currentTabIndex === 5 ?
                      (<div><Summary /></div>) :
                      null
          }
        </div>
      </div>
    </div>
  );
}
