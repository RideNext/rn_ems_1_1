/**
 * ============LICENSE_START========================================================================
 * ONAP : ccsdk feature sdnr wt odlux
 * =================================================================================================
 * Copyright (C) 2024 RideNext Software Solutions. Pvt Ltd.  All rights reserved
 * =================================================================================================
 * Copyright (C) 2019 highstreet technologies GmbH Intellectual Property. All rights reserved.
 * =================================================================================================
 * 
 * ============LICENSE_END==========================================================================
 */
import { useMemo, useRef, useState } from "react";
//import React from 'react';
import { useLocation } from "react-router-dom";
import { ReactSession } from "react-client-session";
import axios from "axios";
import React, { useEffect } from "react";
import { AppBar, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, Input, InputLabel, MenuItem, Paper, Select, Stack, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tabs, TextField, Typography, colors, createStyles, listItemSecondaryActionClasses, makeStyles } from '@mui/material';
import { Height, Padding } from "@mui/icons-material";

// Icons
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandMore from '@mui/icons-material/ExpandMore';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import { WarningOutlined } from "@mui/icons-material";
import { SelectChangeEvent } from '@mui/material';

let nodeId = location.pathname.split("/")[2];
export const CucpConfig = () => {
  const [errors, setErrors] = useState({ priorityLabelError1: false, priorityLabelError2: false, gNBIdError: false, gNBIDLengthError: false, gNBCUNameError: false, localError: false, remoteError: false, vlanidError: false, NRPCIError: false, NRTACError: false, });
  const [isFormValid, setIsFormValid] = useState(true);
  const [cucpdata, setcucpdata] = useState<any>();
  const [isEdit, setisEdit] = React.useState(false);
  const [selecteRow, setselecteRow] = React.useState({ id: "", EndPoint: "", LocalIPAddress: "", VLANId: "", RemoteIpAddress: "" });
  const [NRCellCuRow, setNRCellCuRow] = React.useState({ id: "", PriorityLabel: "", CellLocalId: "", cellId: "", PLMNId: "" });
  const [open, setOpen] = React.useState(false);
  const [SaveSucesopen, setSaveSucesopen] = React.useState(false);
  const [Sucessmsg, setSucessmsg] = React.useState("");
  const [dialogTitle, setdialogTitle] = React.useState("");
  const [savedialogTitle, setsavedialogTitle] = React.useState("");
  const [ddselectedValue, setddselectedValue] = React.useState("");
  let [NRCellCurows, setNRCellCurows] = React.useState<any[]>([]);
  const [listName, setlistName] = React.useState("");
  const [listTitle, setlistTitle] = React.useState("");
  const [endPointOptions] = useState([
    { label: 'EP_F1C', value: 'EP_F1C' },
    { label: 'EP_NgC', value: 'EP_NgC' },
    { label: 'EP_XnC', value: 'EP_XnC' },
    { label: 'EP_X2C', value: 'EP_X2C' }
  ]);
  const [resourceTypeOptions] = useState([
    { label: 'PRB', value: 'PRB' },
    { label: 'RRC', value: 'RRC' },
    { label: 'DRB', value: 'DRB' }
  ]);
  const cipheringAlgoOptions = [
    { value: 'NEA0', label: 'NEA0' },
    { value: 'NEA1', label: 'NEA1' },
    { value: 'NEA2', label: 'NEA2' },
    { value: 'NEA3', label: 'NEA3' },
  ];
  const integrityProtectAlgoOptions = [
    { value: 'N1A1', label: 'NIA1' },
    { value: 'N1A2', label: 'NIA2' },
    { value: 'N1A3', label: 'NIA3' },
  ];
  const [peeParametersOptions, setpeeParametersOptions] = React.useState<any[]>([]);
  const [plmnIdOptions, setplmnIdOptions] = React.useState<any[]>([]);
  const [cellLocalIdOptions, setcellLocalIdOptions] = React.useState<any[]>([]);
  const [rrmPolicyListOptions, setrrmPolicyListOptions] = React.useState<any[]>([]);
  const [cellIdOptions, setcellIdOptions] = React.useState<any[]>([]);

  // Add state variables for selected options
  const [selectedCipheringAlgoPrioType, setSelectedCipheringAlgoPrioType] = useState("");
  const [selectedIntegrityAlgoPrioType, setSelectedIntegrityAlgoPrioType] = useState("");
  const [selectedResourceType, setSelectedResourceType] = useState("");
  const [selectedCellLocalId, setSelectedCellLocalId] = useState("");
  const [selectedRrmPolicyList, setSelectedRrmPolicyList] = useState("");
  const [selectedCellId, setSelectedCellId] = useState("");
  const [selectedPeeParameters, setSelectedPeeParameters] = useState("");
  const [selectedPlmnId, setSelectedPlmnId] = useState("");

  const handleError = (name: any, value: any) => {
    setErrors(prevErrors => ({
      ...prevErrors,
      [name]: value
    }));
  };

  const location = useLocation();
  let nodeId = location.pathname.split('/')[2]
  useEffect(() => {
    nodeId = location.pathname.split('/')[2];
    fetchCucpConfigData(nodeId);
    fetchBasicConfigData(nodeId);
    fetchCellConfigData(nodeId);
    //fetchCellConfigData(nodeId);
  }, [])
  useEffect(() => {
    setddselectedValue(ddselectedValue);
  }, [])

  useEffect(() => {

    setSelectedPeeParameters(cucpdata?.peeParameters || "");
    setSelectedPlmnId(cucpdata?.plmnId || "");
    setSelectedCellLocalId(cucpdata?.cellLocalId || "");
    setSelectedRrmPolicyList(cucpdata?.rrmPolicyList || "");
    setSelectedCellId(cucpdata?.cellId || "");
    setSelectedResourceType(cucpdata?.ResourceType || "");
    setSelectedIntegrityAlgoPrioType(cucpdata?.IntegrityProtectAlgoPrio || "");
    setSelectedCipheringAlgoPrioType(cucpdata?.CipheringAlgoPrio || "");
  }, [cucpdata]);

  const fetchCucpConfigData = (nodeId: any) => {
    let cucpResdata: any;
    const baseUri = `${window.location.origin}`;
    const DbPath = `${baseUri}/cucp_config/_doc/${nodeId}`;

    const newEndpointRows = [...EndPointRows]; // Copy the existing EndPointRows
    const newNRCellCurows = [...NRCellCurows];
    axios.get(DbPath).then((res: any) => {
      cucpResdata = res.data._source.cucpdata;
      setcucpdata(cucpResdata);
      if (cucpResdata && Array.isArray(cucpResdata.EndPointList)) {
        cucpResdata.EndPointList.forEach((row: any) => {
          newEndpointRows.push(AddnewEndPointData(row.EndPoint, row.LocalIPAddress, row.VLANId, row.RemoteIpAddress));
          setRows(newEndpointRows);
        });
      }
      else {
        console.warn("EndPointList is undefined or not an array");
      }
      if (cucpResdata && Array.isArray(cucpResdata.NRCellCuList)) {
        cucpResdata.NRCellCuList.forEach((row: any) => {
          newNRCellCurows.push(AddnewNRCelltData(row.id, row.PriorityLabel, row.CellLocalId, row.cellId, row.PLMNId));
        });
        setNRCellCurows(newNRCellCurows);
      } else {
        console.warn("NRCellCuList is undefined or not an array");
      }
      setddselectedValue(cucpResdata?.RRMPolicy); // Use cucpResdata instead of cucpdata
    }).catch((err: any) => {
      console.error(err);
      if (err.response?.data?.error?.type === 'index_not_found_exception') {
        const uri4 = `${baseUri}/cucp_config/`;
        axios.put(uri4)
          .then((res: any) => {
            console.log(res);
          }).catch((err: any) => {
            console.error(err);
          });
      }
    });
  }

  const fetchCellConfigData = (nodeId: any) => {
    const baseUri = `${window.location.origin}`;
    const DbPath = `${baseUri}/cell_config/_doc/${nodeId}`;
    const query = {
      "_source": ["cellConfigdata.cellId"],
      "query": {
        "term": {
          "_id": nodeId
        }
      }
    };
    setcellIdOptions([]);
    axios.get(DbPath).then((res: any) => {
      if (res.data && res.data._source && res.data._source.cellConfigdata) {
        const CellIdList = res.data._source.cellConfigdata;
        console.log("cell id list", CellIdList);
        const newCellIdList = cellIdOptions?.map(row => row);
        CellIdList.forEach((row: any) => {
          newCellIdList.push(addCellIdList(row.cellId, row.cellId));
        });
        setcellIdOptions(newCellIdList);
      } else {
        console.log('Invalid response structure.');
      }
    }).catch((err: any) => {
      console.log(err);
    });
  }

  const fetchBasicConfigData = (nodeId: any) => {
    const baseUri = `${window.location.origin}`;
    const DbPath = baseUri + "/basic_config/_doc/" + nodeId;

    const newPeeParameters = peeParametersOptions?.map(row => {
      return row;
    })

    const newRRMPolicyList = rrmPolicyListOptions?.map(row => {
      return row;
    })

    const newPLMNInfoList = plmnIdOptions?.map(row => {
      return row;
    })
    const newCellLocalIdList = cellLocalIdOptions?.map(row => {
      return row;
    })

    axios.get(DbPath).then((res: any) => {
      var PeerParameterList = res.data._source.basicdata.PeerParameterList;

      PeerParameterList?.map((row: any) => {
        return newPeeParameters.push(addPeeParametersList(row.siteIdentification, row.siteIdentification));
      });
      setpeeParametersOptions(newPeeParameters);

      var RRMPolicyList = res.data._source.basicdata.RRMPolicyList;
      RRMPolicyList?.map((row: any) => {
        return newRRMPolicyList.push(addRRMPolicyList(row.Name, row.Name));
      });
      setrrmPolicyListOptions(newRRMPolicyList);

      var PLMNInfoList = res.data._source.basicdata.PLMNInfo;
      PLMNInfoList?.map((row: any) => {
        return newPLMNInfoList.push(addPLMNInfoList(row.Name, row.Name));
      });
      console.log(newPLMNInfoList)
      setplmnIdOptions(newPLMNInfoList);

      var CellLocalIdList = res.data._source.basicdata.CellLocalId;

      CellLocalIdList?.map((row: any) => {
        return newCellLocalIdList.push(addCellLocalIdList(row.CellLocalId, row.CellLocalId));
      });
      setcellLocalIdOptions(newCellLocalIdList);

    })

      .catch((err: any) => {
        console.log(err);
      })
  }


  const CustomTableCell = ({ row, name }: { row: any, name: any }) => {
    return (
      <TableCell align="center" style={{ width: '110px', height: '10px' }}>
        {row[name]}
      </TableCell>
    );
  };

  const addRRMPolicyList = (label: string, value: string) => ({
    label,
    value,
  });

  const addPeeParametersList = (label: string, value: string) => ({
    label,
    value,
  });

  const addPLMNInfoList = (label: string, value: string) => ({
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

  const AddnewEndPointData = (EndPoint: string, LocalIPAddress: string, VLANId: string, RemoteIpAddress: string) => ({
    id: EndPoint.replace(" ", "_"),
    EndPoint,
    LocalIPAddress,
    VLANId,
    RemoteIpAddress,
  });

  const AddnewNRCelltData = (id: string, PriorityLabel: string, CellLocalId: string, cellId: string, PLMNId: string) => ({
    id,
    PriorityLabel,
    CellLocalId,
    cellId,
    PLMNId
  });

  let [EndPointRows, setRows] = React.useState<any[]>([]);
  const onDeleteRow = (id: any) => {
    const newRows = EndPointRows?.filter((item) => item.id !== id);
    setRows(newRows);
    cucpdata.EndPointList = newRows;
  };

  const onDeleteDellRow = (id: any) => {
    const newNRCRows = NRCellCurows?.filter((item) => item.id !== id);
    console.log("newNRCRows--> ", newNRCRows);
    setNRCellCurows(newNRCRows);
    cucpdata.NRCellCuList = newNRCRows;
  };

  const saveNRCellData = () => {
    setSaveSucesopen(false);
    const areFieldsFilled = NRCellCuRow.PriorityLabel && NRCellCuRow.CellLocalId && NRCellCuRow.cellId && selectedPlmnId

    if (!areFieldsFilled) {
        setSaveSucesopen(true);
        setSucessmsg("All fields must be filled.");
        setsavedialogTitle("Warning");
        return; // Exit the function if validation fails
    }
    if (isEdit) {
      const NewNECellRowss = NRCellCurows?.map(row => {
        return row;
      });
	  let newrow = AddnewNRCelltData(NRCellCuRow.id,NRCellCuRow.PriorityLabel, NRCellCuRow.CellLocalId, NRCellCuRow.cellId, selectedPlmnId);
      
      var isduplecate = NewNECellRowss?.some(item =>(newrow.cellId==item.cellId && item.id != NRCellCuRow.id ))

      if(isduplecate==true)
        {
          setSaveSucesopen(true);
          setSucessmsg("NR Cell CU List row should be unique.");
          setsavedialogTitle("Warning");
          return ;
        }
      let NewNECellRows = NRCellCurows?.map(row => {
        if (row.id === NRCellCuRow.id) {
          return { ...row, ['PriorityLabel']: NRCellCuRow.PriorityLabel, ['CellLocalId']: NRCellCuRow.CellLocalId, ['PLMNId']: selectedPlmnId, ['cellId']: NRCellCuRow.cellId };
        }
        return row;
      });
      setNRCellCurows(NewNECellRows);
      cucpdata.NRCellCuList = NewNECellRows;
    }
    else {
      const NewNECellRows = NRCellCurows?.map(row => {
        return row;
      });
	  let newrow = AddnewNRCelltData(NRCellCuRow.id,NRCellCuRow.PriorityLabel, NRCellCuRow.CellLocalId, NRCellCuRow.cellId, selectedPlmnId);
      
      var isduplecate = NewNECellRows?.some(item =>(newrow.cellId==item.cellId ))

      if(isduplecate==true)
        {
          setSaveSucesopen(true);
          setSucessmsg("NR Cell CU List row should be unique.");
          setsavedialogTitle("Warning");
          return ;
        }
      else {
      NewNECellRows.push(AddnewNRCelltData(NRCellCurows?.length?.toString(), NRCellCuRow.PriorityLabel, NRCellCuRow.CellLocalId, NRCellCuRow.cellId, selectedPlmnId));
      setNRCellCurows(NewNECellRows);
      cucpdata.NRCellCuList = NewNECellRows;
    }
  }
    setNRCellCuRow({
      id: "",
      PriorityLabel: "",
      CellLocalId: "",
      PLMNId: "",
      cellId: ""
    });
  }

  const saveEndPointData = () => {
    setSaveSucesopen(false);
    const areFieldsFilled = selecteRow.EndPoint && selecteRow.LocalIPAddress && selecteRow.VLANId && selecteRow.RemoteIpAddress;

    if (!areFieldsFilled) {
        setSaveSucesopen(true);
        setSucessmsg("All fields must be filled.");
        setsavedialogTitle("Warning");
        return; // Exit the function if validation fails
    }
    if (isEdit) {
      const newRows = EndPointRows?.map(row => {
        return row;
      });
      let newrow = AddnewEndPointData(selecteRow.EndPoint, selecteRow.LocalIPAddress, selecteRow.VLANId, selecteRow.RemoteIpAddress);
      
      var isduplecate = newRows?.some(item =>(newrow.EndPoint == item.EndPoint && item.id != selecteRow.id ))

      if(isduplecate==true)
        {
          setSaveSucesopen(true);
          setSucessmsg("End Point List row should be unique.");
          setsavedialogTitle("Warning");
          return ;
        }
      EndPointRows = EndPointRows?.map(row => {
        if (row.id === selecteRow.id) {
          return { ...row, ['EndPoint']: selecteRow.EndPoint, ['LocalIPAddress']: selecteRow.LocalIPAddress, ['VLANId']: selecteRow.VLANId, ['RemoteIpAddress']: selecteRow.RemoteIpAddress };
        }
        return row;
      });
      setRows(EndPointRows);
      cucpdata.EndPointList = EndPointRows;
    }
    else {
      const newRows = EndPointRows?.map(row => {
        return row;
      });
      let newrow = AddnewEndPointData(selecteRow.EndPoint, selecteRow.LocalIPAddress, selecteRow.VLANId, selecteRow.RemoteIpAddress);
      
      var isduplecate = newRows?.some(item =>(newrow.EndPoint == item.EndPoint ))

      if(isduplecate==true)
        {
          setSaveSucesopen(true);
          setSucessmsg("End Point List row should be unique.");
          setsavedialogTitle("Warning");
          return ;
        }
      else {
        newRows.push(newrow)
        setRows(newRows);
        cucpdata.EndPointList = newRows;
          }
    }
    setselecteRow({
      id: "row.id",
      EndPoint: "",
      LocalIPAddress: "",
      VLANId: "",
      RemoteIpAddress: "",
    });
  }

  const handleClose = (event: any, reason: string) => {
    if (reason != "backdropClick" && reason != "escapeKeyDown") {
      setOpen(false);
    }
  };

  // const onTextChange = (e: any) => {
  //   const value = e.target.value;
  //   const name = e.target.id;

  //   if (name == 'EndPoint') {
  //     setselecteRow({
  //       ...selecteRow,
  //       EndPoint: e.target.value,
  //     });
  //   }
  //   if (name === 'LocalIPAddress') {
  //     setselecteRow((prev) => ({ ...prev, LocalIPAddress: value }));

  //     if (isValidLocalIPAddress(value)) {
  //       handleError('localError', false);
  //     } else {
  //       handleError('localError', true);
  //     }
  //   }
  //   // if (name === 'VLANId') {
  //   //   //within range of 0 to 65535
  //   //   if (/^\d+$/.test(value) && Number(value) >= 0 && Number(value) <= 65535) {
  //   //     setselecteRow({
  //   //       ...selecteRow,
  //   //       [name]: value,
  //   //     });
  //   //     handleError('vlanidError',false);
  //   //   } else {
  //   //     handleError('vlanidError',true);
  //   //   }
  //   // }
  //   let valid = true;

  //   if (name === 'VLANId') {
  //     if (value === '' || value === null || value === undefined) {
  //       setselecteRow({
  //         ...selecteRow,
  //         [name]: '', 
  //       });
  //       handleError('vlanidError', false);
  //       valid = false;
  //     } else if (/^\d+$/.test(value) && Number(value) >= 0 && Number(value) <= 65535) {
  //       setselecteRow({
  //         ...selecteRow,
  //         [name]: value,
  //       });
  //       handleError('vlanidError', false); 
  //     } else {
  //       setselecteRow({
  //         ...selecteRow,
  //         [name]: value, 
  //       });
  //       handleError('vlanidError', true); 
  //       valid = false;
  //     }
  //   } 
  //   setIsFormValid(valid);

  //   if (name === 'RemoteIpAddress') {
  //     setselecteRow((prev) => ({ ...prev, RemoteIpAddress: value }));

  //     if (isValidRemoteIPAddress(value)) {
  //       handleError('remoteError',false);
  //     } else {
  //       handleError('remoteError',true);
  //     }
  //   }
  // }

  const onTextChange = (e: any) => {
    const value = e.target.value;
    const name = e.target.id;

    let valid = true;
    const errors = {
      localError: false,
      vlanidError: false,
      remoteError: false
    };

    if (name === 'EndPoint') {
      setselecteRow(prev => ({ ...prev, EndPoint: value }));
    }

    if (name === 'LocalIPAddress') {
      setselecteRow(prev => ({ ...prev, LocalIPAddress: value }));
      if (isValidLocalIPAddress(value)) {
        handleError('localError', false);
      } else {
        handleError('localError', true);
        errors.localError = true;
      }
    }

    if (name === 'VLANId') {
      if (value === '' || value === null || value === undefined) {
        setselecteRow(prev => ({ ...prev, VLANId: '' }));
        handleError('vlanidError', false);
        errors.vlanidError = true;
        valid = false;
      } else if (/^\d+$/.test(value) && Number(value) >= 0 && Number(value) <= 65535) {
        setselecteRow(prev => ({ ...prev, VLANId: value }));
        handleError('vlanidError', false);
      } else {
        setselecteRow(prev => ({ ...prev, VLANId: value }));
        handleError('vlanidError', true);
        errors.vlanidError = true;
        valid = false;
      }
    }

    if (name === 'RemoteIpAddress') {
      setselecteRow(prev => ({ ...prev, RemoteIpAddress: value }));
      if (isValidRemoteIPAddress(value)) {
        handleError('remoteError', false);
      } else {
        handleError('remoteError', true);
        errors.remoteError = true;
      }
    }

    valid = !errors.localError && !errors.vlanidError && !errors.remoteError;
    setIsFormValid(valid);
  };


  const handleDropDownChange = (e: SelectChangeEvent<string>) => {
    const value = e.target.value;
    setselecteRow({ ...selecteRow, EndPoint: value });
  };

  // Inside PeeParametersDropDownChange function
  const PeeParametersDropDownChange = (e: SelectChangeEvent<string>) => {
    const value = e.target.value;
    setSelectedPeeParameters(value); // Update selected peeParameters
    setcucpdata({
      ...cucpdata,
      peeParameters: value,
    });
  };


  // Inside PlmnIdDropDownChange function
  const PLMNIdDropDownChange = (e: SelectChangeEvent<string>) => {
    const value = e.target.value;
    setSelectedPlmnId(value); // Update selected PLMN ID
    setcucpdata({
      ...cucpdata,
      plmnId: value,
    });
  };




  // Inside RrmPolicyListDropDownChange function
  const RRMPolicyListDropDownChange = (e: SelectChangeEvent<string>) => {
    const value = e.target.value;
    setSelectedRrmPolicyList(value); // Update selected RRM Policy List
    setcucpdata({
      ...cucpdata,
      rrmPolicyList: value,
    });
  };


  const CuCellIdDropDownChange = (e: SelectChangeEvent<string>) => {
    const value = e.target.value;
    setNRCellCuRow({
      ...NRCellCuRow,
      cellId: value
    });
  };

  const CuLocalCellIdDropDownChange = (e: SelectChangeEvent<string>) => {
    const value = e.target.value;
    setNRCellCuRow({
      ...NRCellCuRow,
      CellLocalId: value,
    });
  };

  const CuCellRRMPolicyListDropDownChange = (e: SelectChangeEvent<string>) => {
    const value = e.target.value;
    setNRCellCuRow({
      ...NRCellCuRow,
      PLMNId: value,
    });
  };

  const addNewRecord = () => {
    setErrors({ priorityLabelError1: false, priorityLabelError2: false, gNBIdError: false, gNBIDLengthError: false, gNBCUNameError: false, localError: false, remoteError: false, vlanidError: false, NRPCIError: false, NRTACError: false, })
    setlistName("EndPointList");
    setlistTitle("End Point List");
    setOpen(true);
    setisEdit(false);
    setdialogTitle("Add New Record");
    setselecteRow({
      id: "",
      EndPoint: "",
      LocalIPAddress: "",
      VLANId: "",
      RemoteIpAddress: "",
    });

  };
  const addNewCellRecord = () => {
    setErrors({ priorityLabelError1: false, priorityLabelError2: false, gNBIdError: false, gNBIDLengthError: false, gNBCUNameError: false, localError: false, remoteError: false, vlanidError: false, NRPCIError: false, NRTACError: false, })
    setlistName("NRCellList");
    setlistTitle("NRCell List");
    setOpen(true);
    setisEdit(false);
    setdialogTitle("Add New Record");
    setNRCellCuRow({
      id: "",
      PriorityLabel: "",
      CellLocalId: "",
      PLMNId: "",
      cellId: ""
    });

  };

  const handleCellEditOpen = (row: any) => {
    setErrors({ priorityLabelError1: false, priorityLabelError2: false, gNBIdError: false, gNBIDLengthError: false, gNBCUNameError: false, localError: false, remoteError: false, vlanidError: false, NRPCIError: false, NRTACError: false, })
    setlistName("NRCellList");
    setlistTitle("NRCell List")
    setOpen(true);
    setisEdit(true);
    setdialogTitle("Edit Redord");
    setNRCellCuRow({
      id: row.id,
      PriorityLabel: row.PriorityLabel,
      CellLocalId: row.CellLocalId,
      cellId: row.cellId,
      PLMNId: row.PLMNId
    });
  }

  const handleEditOpen = (row: any) => {
    setErrors({ priorityLabelError1: false, priorityLabelError2: false, gNBIdError: false, gNBIDLengthError: false, gNBCUNameError: false, localError: false, remoteError: false, vlanidError: false, NRPCIError: false, NRTACError: false, })
    setlistName("EndPointList");
    setlistTitle("EndPoint ist");
    setOpen(true);
    setisEdit(true);
    setdialogTitle("Edit Redord");
    setselecteRow({
      id: row.id,
      EndPoint: row.EndPoint,
      LocalIPAddress: row.LocalIPAddress,
      VLANId: row.VLANId,
      RemoteIpAddress: row.RemoteIpAddress,

    });
  }
  const onCucpTextChange = (e: any) => {
    const value = e.target.value;
    const name = e.target.id;
    
    let errorsCopy = { ...errors };
    let isValid = true;
  
    if (name === 'UserLabel') {
      setcucpdata({ ...cucpdata, UserLabel: value });
    }
  
    if (name === 'PriorityLabel') {
      if (value === '' || value === null || value === undefined) {
        errorsCopy.priorityLabelError1 = true;
        isValid = false;
      } else if (/^\d+$/.test(value) && Number(value) >= 0 && Number(value) <= 4294967295) {
        errorsCopy.priorityLabelError1 = false;
      } else {
        errorsCopy.priorityLabelError1 = true;
        isValid = false;
      }
      setcucpdata({ ...cucpdata, [name]: value });
    }
  
    if (name === 'ResourceType') {
      setcucpdata({ ...cucpdata, ResourceType: value });
    }
  
    if (name === 'gNBId') {
      if (value === '' || value === null || value === undefined) {
        errorsCopy.gNBIdError = true;
        isValid = false;
      } else if (/^\d+$/.test(value) && Number(value) >= 0 && Number(value) <= 4294967295) {
        errorsCopy.gNBIdError = false;
      } else {
        errorsCopy.gNBIdError = true;
        isValid = false;
      }
      setcucpdata({ ...cucpdata, [name]: value });
    }
  
    if (name === 'gNBIDLength') {
      if (value === '' || value === null || value === undefined) {
        errorsCopy.gNBIDLengthError = true;
        isValid = false;
      } else if (/^\d+$/.test(value) && Number(value) >= 22 && Number(value) <= 32) {
        errorsCopy.gNBIDLengthError = false;
      } else {
        errorsCopy.gNBIDLengthError = true;
        isValid = false;
      }
      setcucpdata({ ...cucpdata, [name]: value });
    }
  
    if (name === 'gNBCUName') {
      if (value === '' || value === null || value === undefined) {
        errorsCopy.gNBCUNameError = true;
        isValid = false;
      } else if (value.length >= 1 && value.length <= 150) {
        errorsCopy.gNBCUNameError = false;
      } else {
        errorsCopy.gNBCUNameError = true;
        isValid = false;
      }
      setcucpdata({ ...cucpdata, [name]: value });
    }
  
    setErrors(errorsCopy);
  
    isValid = !errorsCopy.priorityLabelError1 && !errorsCopy.gNBCUNameError &&
              !errorsCopy.gNBIDLengthError && !errorsCopy.gNBIdError;
  
    setIsFormValid(isValid);
    console.log("Form is valid:", isValid);
  };
  



  const addData = () => {
    // saveEndPointData();
    // setOpen(false);
    setSaveSucesopen(false);
    if (isFormValid) {
      if (listName === "EndPointList") {
        saveEndPointData();
        setOpen(false);
      }
      else if (listName === "NRCellList") {
        saveNRCellData();
        setOpen(false);
      }
    } else {
      setSaveSucesopen(true);
      setSucessmsg('Please verify all fields is valid or not. Cannot save data.');
      setsavedialogTitle("Validation Error");
    }
  };

  const saveData = () => {
    const isFormValidCheck = !errors.priorityLabelError1 &&  !errors.gNBCUNameError && !errors.gNBIDLengthError &&  !errors.gNBIdError    ;
    if (isFormValid) {
      const baseUri = `${window.location.origin}`;
      axios.post(baseUri + '/cucp_config/_doc/' + nodeId, {
        cucpdata
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

  const handleSaveSecessClose = (event: any, reason: string) => {
    event.preventDefault();
    event.stopPropagation();
    setSaveSucesopen(false);
  };

  const isValidLocalIPAddress = (ip: any) => {
    const ipPattern = /^(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])$/;
    return ipPattern.test(ip);
  }
  const isValidRemoteIPAddress = (ip: any) => {
    const ipPattern = /^(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])$/;
    return ipPattern.test(ip);
  }
  const ResourceTypeDropDownChange = (e: SelectChangeEvent<string>) => {
    const value = e.target.value;
    setSelectedResourceType(value);
    setcucpdata({
      ...cucpdata,
      ResourceType: value,
    });
  };

  const onNRCellCuTextChange = (e: any) => {
    const value = e.target.value;
    const name = e.target.id;
    if (name == 'PriorityLabel') {
      // if (/^\d*$/.test(value) && Number(value) >= 1 && Number(value) <= 3279165) {
      setNRCellCuRow({
        ...NRCellCuRow, [name]: value,
      });
    }

    if (name == 'CellLocalId') {
      setNRCellCuRow({
        ...NRCellCuRow,
        CellLocalId: e.target.value,
      });
    }

  }
  const CipheringAlgoPrioDropDownChange = (e: SelectChangeEvent<string>) => {
    const value = e.target.value;
    setSelectedCipheringAlgoPrioType(value);
    setcucpdata({
      ...cucpdata,
      CipheringAlgoPrio: value,
    });
  };
  const IntegrityProtectAlgoPrioDropDownChange = (e: SelectChangeEvent<string>) => {
    const value = e.target.value;
    setSelectedIntegrityAlgoPrioType(value);
    setcucpdata({
      ...cucpdata,
      IntegrityProtectAlgoPrio: value,
    });
  };
  return (
    <div style={{ height: '480px', width: '97%', overflow: 'visible' }}>
      <div >
        <Dialog open={SaveSucesopen} onClose={handleSaveSecessClose}
          PaperProps={{ style: { minHeight: '10vh', minWidth: '23vw', border: '14px solid #38456a', borderRadius: '15px', backgroundColor: '#e8e8e8' } }} >
          <DialogContent style={{ alignContent: 'center', textAlign: "center" }}>
            {/* <IconButton style={{ color: savedialogTitle == "Success" ? '#008000' : 'red', textAlign: "center" }}> <CheckCircleOutlineRoundedIcon /> <h6 style={{ marginLeft: '3px', color: savedialogTitle == "Success" ? '#008000' : 'red', textAlign: "center" }}>{Sucessmsg}</h6> </IconButton> */}
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
      <div>
        <Dialog open={open} onClose={handleClose} >
          <DialogTitle id="form-dialog-title" style={{ backgroundColor: '#b3b3ff', border: '1px solid #ccc', borderRadius: '3px', padding: 0 }}>{dialogTitle}</DialogTitle>
          <DialogContent>
            <DialogContentText>
            <Typography>{listTitle}</Typography>
            </DialogContentText>
            {listName == "EndPointList" ?
              <div style={{ width: '80%', paddingLeft: '10%' }}>
                <FormControl variant="standard" margin="dense" fullWidth>
                  <InputLabel id="EndPoint-label">EndPoint</InputLabel>
                  <Select
                    labelId="EndPoint-label"
                    id="EndPoint"
                    value={selecteRow.EndPoint}
                    onChange={handleDropDownChange}
                    label="EndPoint"
                  >
                    {endPointOptions?.map(option => (
                      <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <TextField variant="standard" spellCheck={false} margin="dense" id="LocalIPAddress" label="LocalIPAddress" type="text" fullWidth value={selecteRow.LocalIPAddress}
                  onChange={(event) => { onTextChange(event) }} error={errors.localError} onKeyDown={(event) => ["e", "E", "+", "-"].includes(event.key) && event.preventDefault()}
                  helperText={errors.localError ? 'Invalid localIP address' : ''} />
                <TextField variant="standard" spellCheck={false} margin="dense" id="VLANId" label="VLANId" type="text" fullWidth value={selecteRow.VLANId}onKeyDown={(event) => ["e", "E", "+", "-"].includes(event.key) && event.preventDefault()}
                  onChange={(event) => { onTextChange(event) }} error={errors.vlanidError} helperText={errors.vlanidError ? 'enter only numbers' : ''} />
                <TextField variant="standard" spellCheck={false} margin="dense" id="RemoteIpAddress" label="RemoteIpAddress" type="text" fullWidth
                  value={selecteRow.RemoteIpAddress}
                  onChange={(event) => { onTextChange(event) }}
                  error={errors.remoteError} onKeyDown={(event) => ["e", "E", "+", "-"].includes(event.key) && event.preventDefault()}
                  helperText={errors.remoteError ? 'Invalid remoteIP address' : ''} />
              </div> : listName == "NRCellList" ?
                <div style={{ width: '80%', paddingLeft: '10%' }}>
                  <TextField variant="standard" spellCheck={false} margin="dense" id="PriorityLabel" label="PriorityLabel" type="number" fullWidth value={NRCellCuRow.PriorityLabel} onKeyDown={(event) => ["e", "E", "+", "-"].includes(event.key) && event.preventDefault()} onChange={(event) => { onNRCellCuTextChange(event) }} />
                  {/* <TextField variant="standard" spellCheck={false} margin="dense" id="NRSectorCarrierRef" label="NRSectorCarrierRef" type="number" fullWidth value={NRCellDuRow.NRSectorCarrierRef} onChange={(event) => { onNRCellDuTextChange(event) }}  /> */}
                  <FormControl variant="standard" margin="dense" fullWidth >
                    <InputLabel id="CellLocalId">Cell LocalId</InputLabel>
                    <Select
                      labelId="cellLocalId"
                      id="cellLocalId"
                      label="Cell Local ID"
                      value={NRCellCuRow?.CellLocalId}
                      onChange={CuLocalCellIdDropDownChange}>
                      {cellLocalIdOptions?.map(option => (
                        <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl variant="standard" margin="dense" fullWidth>
                    <TextField variant="standard" spellCheck={false} autoFocus margin="dense" id="NrPLMNList" label="PLMN List Id" type="text" fullWidth style={{ paddingRight: '4%' }} value={selectedPlmnId} disabled />
                  </FormControl>
                  <FormControl variant="standard" margin="dense" fullWidth>
                    <InputLabel id="cellId">Cell Id</InputLabel>
                    <Select
                      labelId="cellId"
                      id="cellId"
                      label="Cell ID"
                      value={NRCellCuRow.cellId}
                      onChange={CuCellIdDropDownChange}>
                      {cellIdOptions?.map(option => (
                        <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div> : null
            }
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

      <div style={{ borderBottom: '2px solid #ccc', marginBottom: '20px', padding: '10px' }}>
        <div ><b>General Config</b></div>
        <TextField variant="standard" spellCheck={false} autoFocus margin="dense" id="UserLabel" label="UserLabel" type="text" style={{ width: '20%', paddingRight: '2%' }} value={cucpdata?.UserLabel} onChange={(event) => { onCucpTextChange(event) }} InputLabelProps={{ shrink: true, sx: { left: "1rem", right: "1rem", } }} />
        <TextField variant="standard" spellCheck={false} autoFocus margin="dense" id="PriorityLabel" label="PriorityLabel" type="text" style={{ width: '20%', paddingRight: '2%' }} value={cucpdata?.PriorityLabel} onChange={(event) => { onCucpTextChange(event) }} onKeyDown={(event) => ["e", "E", "+", "-","."].includes(event.key) && event.preventDefault()} InputLabelProps={{ shrink: true, sx: { left: "1rem", right: "1rem", } }}
          error={errors.priorityLabelError1} 
          helperText={errors.priorityLabelError1 ? 'please enter range from 0 to 4294967295' : ''}
        />
        <FormControl variant="standard" margin="dense" style={{ width: '20%', paddingRight: '2%' }} >
          <InputLabel id="ResourceType">Resource Type</InputLabel>
          <Select
            labelId="ResourceType"
            id="ResourceType"
            label="ResourceType"
            value={selectedResourceType}
            onChange={ResourceTypeDropDownChange}>
            {resourceTypeOptions?.map(option => (
              <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField variant="standard" spellCheck={false} autoFocus margin="dense" id="gNBId" label="gNBId" type="text" style={{ width: '20%', paddingRight: '2%' }} value={cucpdata?.gNBId} onChange={(event) => { onCucpTextChange(event) }} InputLabelProps={{ shrink: true, sx: { left: "1rem", right: "1rem", } }}
          error={errors.gNBIdError} onKeyDown={(event) => ["e", "E", "+", "-","."].includes(event.key) && event.preventDefault()}
          helperText={errors.gNBIdError ? 'please enter range from 0 to 4294967295' : ''} />
        <TextField variant="standard" spellCheck={false} autoFocus margin="dense" id="gNBIDLength" label="gNBIDLength" type="text" style={{ width: '20%', paddingRight: '2%' }} value={cucpdata?.gNBIDLength} onChange={(event) => { onCucpTextChange(event) }} InputLabelProps={{ shrink: true, sx: { left: "1rem", right: "1rem", } }}
          error={errors.gNBIDLengthError} onKeyDown={(event) => ["e", "E", "+", "-","."].includes(event.key) && event.preventDefault()}
          helperText={errors.gNBIDLengthError ? 'please enter range from 22 to 32' : ''}
        />
        <TextField variant="standard" spellCheck={false} autoFocus margin="dense" id="gNBCUName" label="gNBCUName" type="text" style={{ width: '20%', paddingRight: '2%' }} value={cucpdata?.gNBCUName} onChange={(event) => { onCucpTextChange(event) }} InputLabelProps={{ shrink: true, sx: { left: "1rem", right: "1rem", } }}
          error={errors.gNBCUNameError} onKeyDown={(event) => [  "+"].includes(event.key) && event.preventDefault()}
          helperText={errors.gNBCUNameError ? 'please enter character range from 1 to 150' : ''} />
        <FormControl variant="standard" margin="dense" style={{ width: '20%', paddingRight: '2%' }}>
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
          <InputLabel id="PLMNID">PLMN ID</InputLabel>
          <Select
            labelId="PLMNID"
            id="PLMNID"
            label="PLMN ID"
            value={selectedPlmnId} // Use selectedPlmnId instead of cuupdata.plmnId
            onChange={PLMNIdDropDownChange}>
            {plmnIdOptions?.map(option => (
              <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl variant="standard" margin="dense" style={{ width: '20%', paddingRight: '2%' }}>
          <InputLabel id="RRMPolicyList">RRM Policy List</InputLabel>
          <Select
            labelId="rrmPolicyList"
            id="rrmPolicyList"
            label="RRM Policy List"
            value={selectedRrmPolicyList}
            onChange={RRMPolicyListDropDownChange}>
            {rrmPolicyListOptions?.map(option => (
              <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div style={{ borderBottom: '2px solid #ccc', marginBottom: '20px', padding: '10px' }}>
        <div><b>Security Handling</b></div>
        <FormControl variant="standard" margin="dense" style={{ width: '35%', paddingRight: '4%' }}>
          <InputLabel id="cipheringAlgoLabel">Ciphering Algo Prio</InputLabel>
          <Select
            labelId="cipheringAlgoLabel"
            id="CipheringAlgoPrio"
            value={selectedCipheringAlgoPrioType}
            onChange={CipheringAlgoPrioDropDownChange}
            autoFocus
            margin="dense"
            label="Ciphering Algo Prio">
            {cipheringAlgoOptions?.map(option => (
              <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl variant="standard" margin="dense" style={{ width: '35%', paddingRight: '4%' }}>
          <InputLabel id="integrityProtectAlgoLabel">Integrity Protect Algo Prio</InputLabel>
          <Select
            labelId="integrityProtectAlgoLabel"
            id="IntegrityProtectAlgoPrio"
            value={selectedIntegrityAlgoPrioType}
            onChange={IntegrityProtectAlgoPrioDropDownChange}
            autoFocus
            margin="dense"
            label="Integrity Protect Algo Prio"
          >
            {integrityProtectAlgoOptions?.map(option => (
              <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div style={{ borderBottom: '2px solid #ccc', marginBottom: '5px' }}>
        {/* NR CELL CU List  ....*/}
        <div style={{ width: '100%', height: '250px' }}>
          <></>
          <Table id="tblNRCellDurows" style={{ minWidth: "100%", height: '180px', borderCollapse: 'collapse', tableLayout: 'fixed' }}>
            <TableCell style={{ width: "100%", height: '20px' }}>
              <Paper style={{ width: "99.5%", border: '2px solid #ccc', marginTop: '2px' }}>
                <div style={{ color: 'black', backgroundColor: '#c6cbd1', height: '20px' }} ><b>NR Cell CU List</b></div>
                <IconButton aria-label="add-element" style={{ marginLeft: '90%', height: '30px' }}>
                  <AddIcon onClick={() => addNewCellRecord()} />
                </IconButton>
                <div style={{ overflow: "auto", height: '150px' }}>
                  <Table style={{ minWidth: "99.5%", }} aria-label="NRCellDuTable">
                    <TableHead sx={{ "& th": { color: '#ffffff', backgroundColor: '#53659c', lineHeight: '1.1', position: "sticky", top: "0", zIndex: '1' } }}>
                      <TableRow sx={{ "& .MuiTableRow-root": { maxHeight: 20 } }}>
                        <TableCell align="center" style={{ width: 130 }}>Priority Label</TableCell>
                        <TableCell align="center" style={{ width: 130 }}>CellLocal ID</TableCell>
                        <TableCell align="center" style={{ width: 130 }}>PLMN List</TableCell>
                        <TableCell align="center" style={{ width: 130 }}>Cell ID</TableCell>
                        <TableCell align="center" >Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody style={{ zIndex: '0' }}>
                      {NRCellCurows?.map(row => (
                        <TableRow key={row.id} sx={{ '&:nth-of-type(odd)': { backgroundColor: '#d7ecff' }, '& .MuiTableCell-root': { height: '12px', padding: '0' }, '&:last-child td, &:last-child th': { border: 0 } }} >
                          <CustomTableCell {...{ row, name: "PriorityLabel" }} />
                          <CustomTableCell {...{ row, name: "CellLocalId" }} />
                          <CustomTableCell {...{ row, name: "PLMNId" }} />
                          <CustomTableCell {...{ row, name: "cellId" }} />
                          <TableCell align="center" style={{ width: 120, height: '10px' }}>
                            <IconButton aria-label="edit" onClick={() => handleCellEditOpen(row)} >
                              <EditIcon />
                            </IconButton>
                            <IconButton aria-label="delete" onClick={() => onDeleteDellRow(row.id)} >
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
      </div>
      <div>
        <div>
          <div>  {/* div tag for Managed NF Service table */}
            <Table >
              <TableCell style={{ width: "60%", height: "20px", overflowY: "visible" }}>
                <Paper style={{ width: "99.5%", border: '2px solid #ccc', marginTop: '2px' }}>
                  <div style={{ color: 'black', backgroundColor: '#c6cbd1', height: '20px' }} ><b>End Point List</b></div>
                  <IconButton aria-label="add-element" style={{ marginLeft: '90%', height: '30px' }}>
                    <AddIcon onClick={() => addNewRecord()} />
                  </IconButton>
                  <div style={{ maxHeight: "180px", overflowY: "auto" }}>
                    <Table style={{ minWidth: "99.5%", }} aria-label="EndPoint table">
                      <TableHead sx={{ "& th": { color: '#ffffff', backgroundColor: '#53659c', lineHeight: '1.1', position: "sticky", top: "0", zIndex: '1' } }}>
                        <TableRow sx={{ "& .MuiTableRow-root": { maxHeight: 20 } }}>
                          <TableCell align="center" style={{ width: 120 }}>EndPoint</TableCell>
                          <TableCell align="center" style={{ width: 115 }}>LocalIPAddress </TableCell>
                          <TableCell align="center" style={{ width: 130 }}>VLANId</TableCell>
                          <TableCell align="center" style={{ width: 120 }}>RemoteIpAddress</TableCell>
                          <TableCell align="center" style={{ width: 120 }}>Action</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody style={{ zIndex: '0' }}>
                        {EndPointRows?.map(row => (
                          <TableRow key={row.id} sx={{ '&:nth-of-type(odd)': { backgroundColor: '#d7ecff' }, '& .MuiTableCell-root': { height: '12px', padding: '0' }, '&:last-child td, &:last-child th': { border: 0 } }} >
                            <CustomTableCell {...{ row, name: "EndPoint" }} />
                            <CustomTableCell {...{ row, name: "LocalIPAddress" }} />
                            <CustomTableCell {...{ row, name: "VLANId" }} />
                            <CustomTableCell {...{ row, name: "RemoteIpAddress" }} />
                            <TableCell align="center" style={{ width: 120, height: '10px' }}>
                              <IconButton aria-label="edit" onClick={() => handleEditOpen(row)} >
                                <EditIcon />
                              </IconButton>
                              <IconButton aria-label="delete" onClick={() => onDeleteRow(row.id)} >
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
        </div>
      </div>
      <div>
        <Button variant="contained" style={{ color: '#ffffff', backgroundColor: '#53659c', width: '150px', marginLeft: '85%', marginBottom: '3px' }} onClick={saveData}>Save</Button>
      </div>
    </div>
  )
}
