/**
 * ============LICENSE_START========================================================================
 * ONAP : ccsdk feature sdnr wt odlux
 * =================================================================================================
 * Copyright (C) 2024 RideNext Software Solutions. Pvt Ltd.  All rights reserved
 * =================================================================================================
 * Copyright (C) 2019 highstreet technologies GmbH Intellectual Property. All rights reserved.
 * =================================================================================================
  
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

export const CuupConfig = () => {
  const [isFormValid, setIsFormValid] = useState(true);
  const [errors, setErrors] = useState({priorityLabelError: false, gNBIdError: false, localError: false, remoteError: false, vlanidError: false, });
  const [cuupdata, setcuupdata] = useState<any>();
  const [isEdit, setisEdit] = React.useState(false);
  const [selecteRow, setselecteRow] = React.useState({ id: "", EndPoint: "", LocalIPAddress: "", VLANId: "", RemoteIpAddress: "" });
  const [open, setOpen] = React.useState(false);
  const [SaveSucesopen, setSaveSucesopen] = React.useState(false);
  const [Sucessmsg, setSucessmsg] = React.useState("");
  const [dialogTitle, setdialogTitle] = React.useState("");
  const [savedialogTitle, setsavedialogTitle] = React.useState("");
  const [ddselectedValue, setddselectedValue] = React.useState("");
  const [endPointOptions] = useState([
    { label: 'EP_S1U', value: 'EP_S1U' }, { label: 'EP_NgU', value: 'EP_NgU' },
    { label: 'EP_X2U', value: 'EP_X2U' }, { label: 'EP_F1U', value: 'EP_F1U' } ]);

  const [resourceTypeOptions] = useState([
    { label: 'PRB', value: 'PRB' }, { label: 'RRC', value: 'RRC' }, { label: 'DRB', value: 'DRB' } ]);

  const handleError = (name: any, value: any) => {
    setErrors(prevErrors => ({
      ...prevErrors,
      [name]: value
    }));
  };

  const [rrmPolicyOptions, setRrmPolicyOptions] = React.useState<any[]>([]);
  const [selectedResourceType, setSelectedResourceType] = useState("");
  const [selectedEndPoint, setSelectedEndPoint] = useState("");
  const [selectedRrmPolicy, setSelectedRrmPolicy] = useState("");
  const location = useLocation();
  let nodeId = location.pathname.split('/')[2]
  
  useEffect(() => {
    nodeId = location.pathname.split('/')[2];
    fetchBasicConfigData(nodeId);
    fetchCuupConfigData(nodeId);

  }, [])
  useEffect(() => {
    setddselectedValue(ddselectedValue);
  }, [])

  useEffect(() => {
    setSelectedResourceType(cuupdata?.ResourceType || "");
    setSelectedRrmPolicy(cuupdata?.RRMPolicy || "");
  }, [cuupdata]);

  const fetchBasicConfigData = (nodeId: any) => {
    const baseUri = `${window.location.origin}`;
    const DbPath = baseUri + "/basic_config/_doc/" + nodeId;

    const newRRMPolicy = rrmPolicyOptions?.map(row => {
      return row;
    })
    axios.get(DbPath).then((res: any) => {
      var RRMPolicyList = res.data._source.basicdata.RRMPolicyList;
      RRMPolicyList?.map((row: any) => {
        return newRRMPolicy.push(addRRMPolicyList(row.Name, row.Name));
      });
      setRrmPolicyOptions(newRRMPolicy);

    }).catch((err: any) => {
      console.log(err);
    })
  }

  const fetchCuupConfigData = (nodeId: any) => {
    let cuupResdata: any;
    const baseUri = `${window.location.origin}`;
    const DbPath = baseUri + "/cuup_config/_doc/" + nodeId;

    const newEndpointRows = EndPointRows?.map(row => {
      return row;
    });

    axios.get(DbPath).then((res: any) => {
      cuupResdata = res.data._source.cuupdata;
      setcuupdata(cuupResdata);
      
      if (cuupResdata && cuupResdata?.EndPointList) {
        cuupResdata?.EndPointList?.map((row: any) => {
          return newEndpointRows.push(AddnewEndPointData(row.EndPoint, row.LocalIPAddress, row.VLANId, row.RemoteIpAddress));
        });
      } else {
        console.log("EndPointList is undefined or empty");
      }

      setRows(newEndpointRows);
      setddselectedValue(cuupdata?.RRMPolicy);
    }).catch((err: { response: { data: { error: { type: string; }; }; }; message: any; }) => {
      console.log(err);
      if (err.response && err.response.data && err.response.data.error && err.response.data.error.type == 'index_not_found_exception') {
        const uri4 = baseUri + '/cuup_config/';
        axios.put(uri4)
          .then((res: any) => {
            console.log(res);
          }).catch((err: any) => {
            console.log(err);
          });
      }
    });
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

  const AddnewEndPointData = (EndPoint: string, LocalIPAddress: string, VLANId: string, RemoteIpAddress: string) => ({
    id: EndPoint.replace(" ", "_"),
    EndPoint,
    LocalIPAddress,
    VLANId,
    RemoteIpAddress,
    isEditMode: true
  });

  let [EndPointRows, setRows] = React.useState<any[]>([]);
  const onDeleteRow = (id: any) => {
    const newRows = EndPointRows?.filter((item) => item.id !== id);
    setRows(newRows);
    cuupdata.EndPointList = newRows;
  };

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
      
      var isduplecate = newRows?.some(item =>(newrow.EndPoint == item.EndPoint && item.id != selecteRow.id));

      if(isduplecate==true)
        {
          setSaveSucesopen(true);
          setSucessmsg("End Point List row should be unique.");
          setsavedialogTitle("Warning");
          return ;
        }
      EndPointRows = EndPointRows?.map((row: any) => {
        if (row.id === selecteRow.id) {
          return { ...row, ['EndPoint']: selecteRow.EndPoint, ['LocalIPAddress']: selecteRow.LocalIPAddress, ['VLANId']: selecteRow.VLANId, ['RemoteIpAddress']: selecteRow.RemoteIpAddress };
        }
        return row;
      });
      setRows(EndPointRows);
      cuupdata.EndPointList = EndPointRows;
    }
    else {
      const newRows = EndPointRows?.map(row => {
        return row;
      });
      
      let newrow = AddnewEndPointData(selecteRow.EndPoint, selecteRow.LocalIPAddress, selecteRow.VLANId, selecteRow.RemoteIpAddress);
      
      var isduplecate = newRows?.some(item =>(newrow.EndPoint == item.EndPoint));

      if(isduplecate==true)
        {
          setSaveSucesopen(true);
          setSucessmsg("End Point List row should be unique.");
          setsavedialogTitle("Warning");
          return ;
        }
      else {
      newRows.push(AddnewEndPointData(selecteRow.EndPoint, selecteRow.LocalIPAddress, selecteRow.VLANId, selecteRow.RemoteIpAddress))
      setRows(newRows);
      cuupdata.EndPointList = newRows;
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

  const onTextChange = (e: any) => {
    const value = e.target.value;
    const name = e.target.id;
    let valid = true;
    const errors = {
      localError: false,
      vlanidError: false,
      remoteError: false
    };

    if (name == 'EndPoint') {
      setselecteRow({
        ...selecteRow,
        EndPoint: e.target.value,
      });
    }   
    if (name === 'LocalIPAddress') {
      setselecteRow((prev) => ({ ...prev, LocalIPAddress: value }));

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
      setselecteRow((prev) => ({ ...prev, RemoteIpAddress: value }));

      if (isValidRemoteIPAddress(value)) {
        handleError('remoteError',false);
      } else {
        handleError('remoteError',true);
        errors.remoteError = true;
      }
    }
    valid = !errors.localError && !errors.vlanidError && !errors.remoteError;
    setIsFormValid(valid);
  }

  const addNewRecord = () => {
    setErrors({priorityLabelError: false, gNBIdError: false, localError: false, remoteError: false, vlanidError: false, });
    setOpen(true);
    setisEdit(false);
    setdialogTitle("Add New Redord");
    setselecteRow({
      id: "",
      EndPoint: "",
      LocalIPAddress: "",
      VLANId: "",
      RemoteIpAddress: "",
    });

  };

  const handleEditOpen = (row: any) => {
    setErrors({priorityLabelError: false, gNBIdError: false, localError: false, remoteError: false, vlanidError: false, });
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
    console.log("endpoint", row.EndPoint);
    console.log("endpoint row",row);
  }

  const onCuupTextChange = (e: any) => {
    const value = e.target.value;
    const name = e.target.id;
    
    let errorsCopy = { ...errors };
    let valid = true;
  
    // Validate PriorityLabel
    if (name === 'PriorityLabel') {
      if (value === '' || value === null || value === undefined) {
        errorsCopy.priorityLabelError = true;
        valid = false;
      } else if (/^\d+$/.test(value) && Number(value) >= 0 && Number(value) <= 4294967295) {
        errorsCopy.priorityLabelError = false;
      } else {
        errorsCopy.priorityLabelError = true;
        valid = false;
      }
      setcuupdata({ ...cuupdata, [name]: value });
    } 
  
    // Validate gNBId
    if (name === 'gNBId') {
      if (value === '' || value === null || value === undefined) {
        errorsCopy.gNBIdError = true;
        valid = false;
      } else if (/^\d+$/.test(value) && Number(value) >= 22 && Number(value) <= 32) {
        errorsCopy.gNBIdError = false;
      } else {
        errorsCopy.gNBIdError = true;
        valid = false;
      }
      setcuupdata({ ...cuupdata, [name]: value });
    }
  
    // Update errors state
    setErrors(errorsCopy);
  
    // Update form validity based on errors
    valid = !errorsCopy.priorityLabelError && !errorsCopy.gNBIdError;
    setIsFormValid(valid);
  
    console.log("Valid:", valid);
  };

  const handleDropDownChange = (e: SelectChangeEvent<string>) => {
    const value = e.target.value;
    setselecteRow({ ...selecteRow, EndPoint: value });
  };
  // Inside ResourceTypeDropDownChange function
  const ResourceTypeDropDownChange = (e: SelectChangeEvent<string>) => {
    const value = e.target.value;
    setSelectedResourceType(value); // Update selected resource type
    setcuupdata({
      ...cuupdata,
      ResourceType: value,
    });
  };
  // Inside RRMPolicyDropDownChange function
  const RRMPolicyDropDownChange = (e: SelectChangeEvent<string>) => {
    const value = e.target.value;
    setSelectedRrmPolicy(value); // Update selected RRM policy
    setcuupdata({
      ...cuupdata,
      RRMPolicy: value,
    });
  };

  const addData = () => {
    // saveEndPointData();
    // setOpen(false);
    console.log("isFormValid",isFormValid)
    if (isFormValid) {
      saveEndPointData();
      setOpen(false);
    } else {
      setSaveSucesopen(true);
      setSucessmsg('Please verify all fields is valid or not. Cannot save data.');
      setsavedialogTitle("Validation Error");
    }
  };


  const saveData = () => {
    const isFormValidCheck = !errors.priorityLabelError && !errors.gNBIdError;
    //alert("Data Saving");
    if (isFormValid) {
    const baseUri = `${window.location.origin}`;
    axios.post(baseUri + '/cuup_config/_doc/'+nodeId,
      {
        cuupdata
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
    const ipPattern = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    return ipPattern.test(ip);
  }
  const isValidRemoteIPAddress = (ip: any) => {
    const ipPattern = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    return ipPattern.test(ip);
  }

  return (
    <div style={{ height: '430px', width: '97%', overflow: 'visible' }}>
        <div >
          <Dialog open={SaveSucesopen} onClose={handleSaveSecessClose}
            PaperProps={{ style: { minHeight: '12vh', minWidth: '23vw', border: '14px solid #38456a', borderRadius: '15px', backgroundColor: '#e8e8e8' } }} >
            <DialogContent style={{ alignContent: 'center', textAlign: "center" }}>
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

      <div>
        <Dialog open={open} onClose={handleClose} >
          <DialogTitle id="form-dialog-title" style={{ backgroundColor: '#b3b3ff', border: '1px solid #ccc', borderRadius: '3px', padding: 0 }}>{dialogTitle}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              <h4>EndPoint Parameters</h4>
            </DialogContentText>
            <div style={{ width: '80%', paddingLeft: '10%' }}>
              <FormControl variant="standard" margin="dense" fullWidth>
                <InputLabel id="EndPoint-label">EndPoint</InputLabel>
                <Select
                  labelId="EndPoint-label"
                  id="EndPoint"
                  value={selecteRow.EndPoint }
                  onChange={handleDropDownChange} // Use the correct handler
                  label="EndPoint"
                >
                  {endPointOptions?.map(option => (
                    <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                  ))}
                </Select>
                 </FormControl>
              <TextField variant="standard" spellCheck={false} margin="dense" id="LocalIPAddress" label="LocalIPAddress" type="text" fullWidth 
              value={selecteRow.LocalIPAddress} 
              onChange={(event) => { onTextChange(event) }} 
              error={errors.localError}
              helperText={errors.localError ? 'Invalid localIP address' : ''}
              />
              <TextField variant="standard" spellCheck={false} margin="dense" id="VLANId" label="VLANId" type="text" fullWidth 
              value={selecteRow.VLANId} onChange={(event) => { onTextChange(event) }}   
              error={errors.vlanidError}
              helperText={errors.vlanidError ? 'enter only numbers' : ''}
              />
 
              <TextField variant="standard" spellCheck={false} margin="dense" id="RemoteIpAddress" label="RemoteIpAddress" type="text" fullWidth 
              value={selecteRow.RemoteIpAddress} 
              onChange={(event) => { onTextChange(event) }} 
              error={errors.remoteError}
              helperText={errors.remoteError ? 'Invalid remoteIP address' : ''}
              />
            </div>
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
        <TextField variant="standard" spellCheck={false} autoFocus margin="dense" id="PriorityLabel" label="Priority Label" type="number" style={{ width: '20%', paddingRight: '2%' }} value={cuupdata?.PriorityLabel} onChange={(event) => { onCuupTextChange(event) }} InputLabelProps={{ shrink: true, sx: { left: "1rem", right: "1rem", } }} 
           onKeyDown={(event) => ["e", "E", "+", "-","."].includes(event.key) && event.preventDefault()}
           error={errors.priorityLabelError}
           helperText={errors.priorityLabelError ? 'please enter range from 0 to 4294967295' : ''}
          />
        <TextField variant="standard" spellCheck={false} autoFocus margin="dense" id="gNBId" label="gNBId" type="number" style={{ width: '20%', paddingRight: '2%' }} value={cuupdata?.gNBId} onChange={(event) => { onCuupTextChange(event) }} InputLabelProps={{ shrink: true, sx: { left: "1rem", right: "1rem", } }} 
          onKeyDown={(event) => ["e", "E", "+", "-","."].includes(event.key) && event.preventDefault()}
          error={errors.gNBIdError}
          helperText={errors.gNBIdError ? 'please enter range between 22 to 32' : ''}
          />
        <FormControl variant="standard" margin="dense" style={{ width: '20%', paddingRight: '2%' }} >
          <InputLabel id="ResourceType">ResourceType</InputLabel>
          <Select
            labelId="ResourceType"
            id="ResourceType"
            label="ResourceType"
            value={selectedResourceType}
            onChange={ResourceTypeDropDownChange}
          >
                  {resourceTypeOptions?.map(option => (
                    <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                  ))}
                </Select>
              </FormControl>

        <FormControl variant="standard" margin="dense" style={{ width: '20%', paddingRight: '2%' }}>
          <InputLabel id="RRMPolicy">RRM Policy List</InputLabel>
          <Select
            labelId="RRMPolicy"
            id="RRMPolicy"
            label="RRM Policy List"
            value={selectedRrmPolicy} 
            onChange={RRMPolicyDropDownChange}>
            {rrmPolicyOptions?.map(option => (
              <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
            ))}
          </Select>
        </FormControl>
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
        <Button variant="contained" style={{ color: '#ffffff', backgroundColor: '#53659c', width: '150px', marginLeft: '85%', marginBottom: '0px', marginTop: '0px', }} onClick={saveData}>Save</Button>
      </div>
    </div>


  )
}