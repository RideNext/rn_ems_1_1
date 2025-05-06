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
import { useMemo, useRef, useState } from "react";
//import React from 'react';
import { useLocation } from "react-router-dom";
import { ReactSession } from "react-client-session";
import axios from "axios";
import React, { useEffect } from "react";
import {
  AppBar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  TextField,
  Typography,
  colors,
  createStyles,
  listItemSecondaryActionClasses,
  makeStyles,
} from "@mui/material";
import { Height, Padding } from "@mui/icons-material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

// Icons
import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ExpandMore from "@mui/icons-material/ExpandMore";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import { SelectChangeEvent } from "@mui/material";

let nodeId = location.pathname.split("/")[2];
export const SystemConfig = () => {
  const [ddselectedValue, setddselectedValue] = React.useState("");
  const [systemdata, setsystemdata] = useState<any>();
  let [systemconfigrows, setRows] = React.useState<any[]>([]);
  let [selectedValue, setselectedValue] = useState<string>("");
  let [validftpserver, setvalidftpserver] = useState<boolean>(true);
  let [validftppath, setvalidftppath] = useState<boolean>(true);
  let [validusername, setvalidusername] = useState<boolean>(true);
  let [validpassword, setvalidpassowrd] = useState<boolean>(true);
  let [validatedftpserver, setvalidatedftpserver] = useState<boolean>(true);
  let [validatedftpserverName, setvalidatedftpserverName] = useState<boolean>(true);
  let [validatedprotocoltype, setvalidatedprotocoltype] = useState<boolean>(true);
  let [validatedftpserverType, setvalidatedftpserverType] = useState<boolean>(true);
  let [ftpserver, setftpserver] = useState<string>("");
  let [ftpserverName, setftpserverName] = useState<string>("");
  let [protocoltype, setprotocoltype] = useState<string>("");
  let [ftpserverType, setftpserverType] = useState<string>("");
  let [ftppath, setftppath] = useState<string>("");
  let [username, setusername] = useState<string>("");
  let [password, setpassword] = useState<string>("");
  const [visibility, setVisibility] = useState<{ [key: string]: boolean }>({});
  const [dialogopen, setdialogopen] = useState<boolean>(false);
  const [deletedialogopen, setdeletedialogopen] = useState<boolean>(false);
  let [editprotocoltype, seteditprotocoltype] = useState<string>("");
  let [editftpserverName, seteditftpserverName] = useState<string>("");
  let [editftpId, seteditftpId] = useState<string>("");
  let [editftpserverType, seteditftpserverType] = useState<string>("");
  let [editftpserver, seteditftpserver] = useState<string>("");
  let [editftppath, seteditftppath] = useState<string>("");
  let [editusername, seteditusername] = useState<string>("");
  let [editpassword, seteditpassword] = useState<string>("");
  let [deleteftpserverName, setdeleteftpserverName] = useState<string>("");
  let [deleteprotocoltype, setdeleteprotocoltype] = useState<string>("");
  let [deleteftpserverType, setdeleteftpserverType] = useState<string>("");
  let [deleteftpserver, setdeleteftpserver] = useState<string>("");
  let [deleteftppath, setdeleteftppath] = useState<string>("");
  let [deleteusername, setdeleteusername] = useState<string>("");
  let [deletepassword, setdeletepassword] = useState<string>("");
  let [oldftpserver, setoldftpserver] = useState<string>("");
  let [editvalidftpserver, seteditvalidftpserver] = useState<boolean>(true);
  let [editvalidftpserverName, seteditvalidftpserverName] = useState<boolean>(true);
  let [editvalidprotocoltype, seteditvalidprotocoltype] = useState<boolean>(true);
  let [editvalidftpserverType, seteditvalidftpserverType] = useState<boolean>(true);
  let [editvalidftppath, seteditvalidftppath] = useState<boolean>(true);
  let [editvalidusername, seteditvalidusername] = useState<boolean>(true);
  let [editvalidpassword, seteditvalidpassowrd] = useState<boolean>(true);
  let [editvalidatedftpserver, seteditvalidatedftpserver] = useState<boolean>(true);
  const [Sucessmsg, setSucessmsg] = React.useState("");
  const [SaveSucesopen, setSaveSucesopen] = React.useState(false);
  const [savedialogTitle, setsavedialogTitle] = React.useState("");

  const handleVisibilityToggle = (rowId: string) => {
   // console.log(rowId)
    setVisibility((prevVisibility) => ({
      ...prevVisibility,
      [rowId]: !prevVisibility[rowId],
    }));
  };

  useEffect(() => {
    nodeId = location.pathname.split("/")[2];
    fetchSystemConfigData();
  }, []);
  useEffect(() => {
    setddselectedValue(ddselectedValue);
  }, []);

  const handleSaveSecessClose = (event: any, reason: string) => {
    
    fetchSystemConfigData();
    event.preventDefault();
    event.stopPropagation();
    setSaveSucesopen(false);
    
  };
  
  const FtpTypeOptions = [
    { value: '', label: 'Select' },
    { value: 'DeviceLogs', label: 'Device Logs' },
    { value: 'SwUpgrade', label: 'SW Upgrade' },
  ];

  const ProtocolTypeOptions = [
    { value: '', label: 'Select' },
    { value: 'ftp', label: 'FTP' },
    { value: 'sftp', label: 'SFTP' },
  ];


  const CustomTableCell = ({ row, name }: { row: any; name: any }) => {
    if (name == "PASSWORD") {
      return (
        <TableCell align="center" style={{ width: "110px", height: "10px" }}>
          {visibility[row.id] ? row[name] : "********"}
          <IconButton
            onClick={() => handleVisibilityToggle(row.id)}
            size="small"
          >
            {visibility[row.id] ? (
              <VisibilityIcon style={{ fontSize: "16px" }} />
            ) : (
              <VisibilityOffIcon style={{ fontSize: "16px" }} />
            )}
          </IconButton>
        </TableCell>
      );
    } else {
      return (
        <TableCell align="center" style={{ width: "110px", height: "10px" }}>
          {row[name]}
        </TableCell>
      );
    }
  };
  const AddnewSystemConfigData = (
    DOC_ID: string,
    FTP_SERVER_NAME: string,
    FTP_SERVER_TYPE: string,
    FTP_SERVER_IP: string,
    PROTOCOL_TYPE: string,
    FTP_FILE_PATH: string,
    USERNAME: string,
    PASSWORD: string
  ) => ({
    id: `${FTP_SERVER_IP}:${FTP_FILE_PATH.replace(/\//g, '-')}`,
    DOC_ID,
    FTP_SERVER_NAME,
    FTP_SERVER_TYPE,
    FTP_SERVER_IP,
    PROTOCOL_TYPE,
    FTP_FILE_PATH,
    USERNAME,
    PASSWORD,
  });

  const fetchSystemConfigData = () => {
    nodeId = "node2";
    const baseUri = `${window.location.origin}`;
    const DbPath = baseUri + "/system_config/_search/";
     const newSystemConfigRows: any[] = [];
    axios.get(DbPath)
      .then((res: any) => {
        const systemconfigdata = res.data.hits.hits.map((row: any) => {
          return row._source;
        });
        //console.log(systemconfigdata);
        setsystemdata(systemdata);
        systemconfigdata.map((row: any) => {
          return newSystemConfigRows.push(
            AddnewSystemConfigData(
              row._id,
              row.FTP_SERVER_NAME,
              row.FTP_SERVER_TYPE,
              row.FTP_SERVER_IP,
              row.PROTOCOL_TYPE,
              row.FTP_FILE_PATH,
              row.USERNAME,
              row.PASSWORD
            )
          );
        });
        setRows(newSystemConfigRows);
      })
      .catch(
        (err: {
          response: { data: { error: { type: string } } };
          message: any;
        }) => {
          console.log(err);
          if (
            err.response?.data?.error?.type &&
            err.response?.data?.error?.type == "index_not_found_exception"
          ) {
            const baseUri = `${window.location.origin}`;
            var uri4 = baseUri + "/system_config/";
            axios
              .put(uri4)
              .then((res: any) => {
                console.log(res);
              })
              .catch((err: any) => {
                console.log(err);
              });
          }
        }
      );
  };

  const handleChange = (e: SelectChangeEvent<string>) => {
    setselectedValue(e.target.value);
  };
  const handleFTPTypeChange = (e: SelectChangeEvent<string>) => {
    setvalidatedftpserverType(true);
    setftpserverType(e.target.value);
    if(e.target.value != "")
    {
      setvalidatedftpserverType(true);
    }
  };
  const handleProtocolChange = (e: SelectChangeEvent<string>) => {
    setvalidatedprotocoltype(true);
    setprotocoltype(e.target.value);
    if(e.target.value != "")
    {
      setvalidatedprotocoltype(true);
    }
  };

  const handleProtoColypeEditChange = (e: SelectChangeEvent<string>) => {
    seteditvalidprotocoltype(true);
    seteditprotocoltype(e.target.value);
    if(e.target.value != "")
    {
      seteditvalidprotocoltype(true);
    }
  };
  const handleFTPTypeEditChange = (e: SelectChangeEvent<string>) => {
    seteditvalidftpserverType(true);
    seteditftpserverType(e.target.value);
    if(e.target.value != "")
    {
      seteditvalidftpserverType(true);
    }
  };

  const areFieldsValid = (
    ftpservertype:string,
    ftpservername :string,
    ftpserver: string,
    protocoltype :string,
    ftppath: string,
    username: string,
    password: string
  ) => {
    setvalidftpserver(true);
    setvalidftppath(true);
    setvalidusername(true);
    setvalidpassowrd(true);
    setvalidatedftpserverType(true);
    setvalidatedftpserverName(true)
    setvalidatedprotocoltype(true)
    if (ftpservertype == "") {
       dialogopen? seteditvalidftpserverType(false) : setvalidatedftpserverType(false) ;
      return false;
    }
    else if (ftpservername == "") {
      dialogopen? seteditvalidftpserverName(false) : setvalidatedftpserverName(false) ;
      return false;
    }
    else if (protocoltype == "" ) {
      dialogopen ? seteditvalidprotocoltype(false) : setvalidatedprotocoltype(false)  ;
      return false;
    }  else if (ftpserver == "" ) {
      dialogopen ? seteditvalidftpserver(false) : setvalidftpserver(false)  ;
      return false;
    }
     else if (ftppath == "") {
      dialogopen ? seteditvalidftppath(false):setvalidftppath(false);
      return false;
    } else if (username == "") {
      dialogopen ? seteditvalidusername(false) : setvalidusername(false);
      return false;
    } else if (password == "") {
      dialogopen ? seteditvalidpassowrd(false) : setvalidpassowrd(false);
      return false;
    } else {
      if (validatedftpserver ) {
        return true;
      }
       else {
        return false;
      }
    }
  };

  const areeditFieldsValid = (
    ftpserverType:string,
    ftpserverName :string,
    ftpserver: string,
    protocoltype: string,
    ftppath: string,
    username: string,
    password: string
  ) => {
    seteditvalidftpserver(true);
    seteditvalidftppath(true);
    seteditvalidusername(true);
    seteditvalidpassowrd(true);
    seteditvalidftpserverType(true);
    seteditvalidftpserverName(true);
    seteditvalidprotocoltype(true);
    if (ftpserverType == "") {
      seteditvalidftpserverType(false);
      return false;
    }
    else if (ftpserverName == "") {
      seteditvalidftpserverName(false);
      return false;
    }
    else if (protocoltype == "") {
      seteditvalidprotocoltype(false);
      return false;
    }else if (ftpserver == "") {
      seteditvalidftpserver(false);
      return false;
    }
    else if (ftppath == "") {
       seteditvalidftppath(false);
      return false;
    } else if (username == "") {
       seteditvalidusername(false) ;
      return false;
    } else if (password == "") {
      seteditvalidpassowrd(false) ;
      return false;
    } else {
      if (editvalidatedftpserver ) {
        return true;
      }
       else {
        return false;
      }
    }
  };
  const ValidateIPaddress = (ipaddressField: any) => {
    const ipv4Regex =
      /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    if (ipv4Regex.test(ipaddressField)) {
      return true;
    } else {
      return false;
    }
  };
  const saveData = async () => {
    if (areFieldsValid(ftpserverType,ftpserverName,ftpserver,protocoltype, ftppath, username, password)) {
      const baseUri = `${window.location.origin}`;
      const documentName = ftpserver+":"+ftppath.replace(/\//g, '-');
      let found:boolean=false;
      let rowfound:boolean=false;
      try{
        await axios.get(baseUri +  "/system_config/_search/").then((res:any)=>{
          //console.log("data",res)
          res.data.hits.hits.map((row: any) => {
            if(ftpserverName==row._source.FTP_SERVER_NAME )
              {
                found=true;
              }
              else if(row._source.FTP_SERVER_IP === ftpserver && row._source.FTP_FILE_PATH === ftppath
                      && row._source.USERNAME === username && row._source.PASSWORD === password)
              {
                rowfound = true
              }
          });
          if(found) {
            setSaveSucesopen(true);
            setSucessmsg("Server Name already exist, Please try with deferent Name");
            setsavedialogTitle("Warning");
          }
          else if(rowfound) {
              setSaveSucesopen(true);
              setSucessmsg("Duplicate File Server Config Details Found");
              setsavedialogTitle("Warning");
            }
        else {
              axios.post(baseUri + `/system_config/_doc/${documentName}`, {
                FTP_SERVER_NAME:ftpserverName,
                FTP_SERVER_TYPE:ftpserverType,
                FTP_SERVER_IP: ftpserver,
                PROTOCOL_TYPE:protocoltype,
                FTP_FILE_PATH: ftppath,
                USERNAME: username,
                PASSWORD: password,
              }).then((res: any) => {
                resetData();
                setSaveSucesopen(true);
                setSucessmsg("Data saved successfully");
                setsavedialogTitle("Success");
                fetchSystemConfigData();
              })
              .catch((error: any) => {
                console.log(error)
              });
            }
        })
      }
      catch(Error){
         found = false;
      }
    }
  };
  const resetData = () => {
    setftpserverName("");
    setftpserverType("");
    setftppath("");
    setftpserver("");
    setusername("");
    setpassword("");
    setprotocoltype("")
    setvalidatedftpserver(true);
    setvalidftppath(true);
    setvalidftpserver(true);
    setvalidpassowrd(true);
    setvalidusername(true);
    seteditvalidatedftpserver(true);
    seteditvalidftppath(true);
    seteditvalidftpserver(true);
    seteditvalidpassowrd(true);
    seteditvalidusername(true);
    setvalidatedftpserverName(true);
    setvalidatedftpserverType(true);
    setvalidatedprotocoltype(true);
    seteditvalidprotocoltype(true);
    setdialogopen(false);
    fetchSystemConfigData();
  };
  
  const editsave=()=>{
    if (areFieldsValid(editftpserverType,editftpserverName,editftpserver,editprotocoltype, editftppath, editusername, editpassword)) {
      const baseUri = `${window.location.origin}`;
      const documentName = editftpserver+":"+editftppath.replace(/\//g, '-');
      let found:boolean=false;
      try{
         axios.get(baseUri +  "/system_config/_search/").then((res:any)=>{
          //console.log("data",res)
          res.data.hits.hits.map((row: any) => {
            if(editftpserverName==row._source.FTP_SERVER_NAME && editftpId !=row._id)
              {
                found=true;
              }
          });

          if(found)
          {
            setSaveSucesopen(true);
            setSucessmsg("Server Name already exist, Please try with deferent Name");
            setsavedialogTitle("Warning");
          }
          else
          {
            axios.delete(baseUri + `/system_config/_doc/${oldftpserver}`)
            .then((res) => {
              axios
                .post(baseUri + `/system_config/_doc/${editftpserver}:${editftppath.replace(/\//g, '-')}`, {
                  FTP_SERVER_NAME: editftpserverName,
                  FTP_SERVER_TYPE: editftpserverType,
                  FTP_SERVER_IP: editftpserver,
                  PROTOCOL_TYPE:editprotocoltype,
                  FTP_FILE_PATH: editftppath,
                  USERNAME: editusername,
                  PASSWORD: editpassword,
                })
                .then((res: any) => {
                  seteditftpserverName("");
                  seteditftpserverType("");
                  seteditftppath("");
                  seteditftpserver("");
                  seteditusername("");
                  seteditpassword("");
                  setftppath("");
                  setftpserver("");
                  setusername("");
                  setpassword("");
                  setdialogopen(false);
                  setSaveSucesopen(true);
                  setSucessmsg("Data Saved successfully");
                  setsavedialogTitle("Success");
                })
                .catch((error: any) => {
                  alert(error);
                });
            });
          }
       
        })
      }
      catch(Error){
         found = false;
      }

      //const baseUri = `${window.location.origin}`;
  
        
    }
  }
  const editData = (row: any) => {
    setoldftpserver(`${row.FTP_SERVER_IP}:${row.FTP_FILE_PATH.replace(/\//g, '-')}`)
    seteditftpId(row.id)
    setdialogopen(true)
    seteditftpserverName(row.FTP_SERVER_NAME ? row.FTP_SERVER_NAME:"")
    seteditftpserverType(row.FTP_SERVER_TYPE ? row.FTP_SERVER_TYPE :"")
    seteditftppath(row.FTP_FILE_PATH)
    seteditftpserver(row.FTP_SERVER_IP)
    seteditprotocoltype(row.PROTOCOL_TYPE)
    seteditusername(row.USERNAME)
    seteditpassword(row.PASSWORD)
  };
  const deleteData = async () => {
    const baseuri = `${window.location.origin}`;
    await axios
      .delete(baseuri + `/system_config/_doc/${deleteftpserver}:${deleteftppath.replace(/\//g, '-')}`)
      .then((res) => {
        setSaveSucesopen(true);
        setSucessmsg("Data Deleted successfully");
        setsavedialogTitle("Delete");
      });
    
  };
  const setdeletedata = (row: any) => {
    setdeletedialogopen(true)
    setdeleteftpserverName(row.FTP_SERVER_NAME)
    setdeleteftpserverType(row.FTP_SERVER_TYPE)
    setdeleteftppath(row.FTP_FILE_PATH)
    setdeleteftpserver(row.FTP_SERVER_IP)
    setdeleteprotocoltype(row.PROTOCOL_TYPE)
    setdeleteusername(row.USERNAME)
    setdeletepassword(row.PASSWORD)
  };

  return (
    <div
      style={{
        width: "100%",
        height: "500px",
        display: "flex",
        flexDirection: "column",
        marginTop: "20px",
        borderRadius: "15px",
      }}
    >
    

<div >
      <Dialog open={SaveSucesopen} onClose={handleSaveSecessClose}  
       PaperProps={{style: { minHeight: '12vh',  minWidth: '23vw',border: '14px solid #38456a',  borderRadius: '15px', backgroundColor: '#e8e8e8' } }} >
      {/* <DialogTitle id="form-sucdialog-title" > {savedialogTitle}</DialogTitle> */}
          <DialogContent style={{alignContent:'center',textAlign:"center"}}>
              <IconButton style={{ color : savedialogTitle=="Success"? '#008000':'orange', textAlign:"center" }}> <CheckCircleOutlineRoundedIcon /> <h6 style={{ marginLeft:'3px', color : savedialogTitle=="Success"? '#008000':'orange', textAlign:"center" }}>{Sucessmsg}</h6> </IconButton> 
          </DialogContent>
        <DialogActions>
            <Button onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              setSaveSucesopen(false);
              
              fetchSystemConfigData();
            }} style={{ backgroundColor: 'white', color: '#38761d', border: '1px solid #2986cc', borderRadius: '1px', padding: '3px 6px' }}>
              OK
            </Button>
        </DialogActions>
      </Dialog>
      </div>

      <Dialog open={deletedialogopen}  PaperProps={{
        style: {
          minHeight: '23vh',
          minWidth: '40vw',
          borderRadius: '5px',
          backgroundColor: 'white'
        }
      }}>
        <DialogTitle id="form-dialog-title">Delete Config Data</DialogTitle>
        <DialogContent>
        <FormControl variant="standard" sx={{ width: "98%", paddingRight: "2%" }}>
            <InputLabel id="ftpservertype">Server Type</InputLabel>
              <Select
                placeholder="Select Server Type"
                labelId="ftpservertype"
                id="ftpservertype"
                disabled
                onChange={handleFTPTypeChange}
                value={deleteftpserverType ? deleteftpserverType : ""}
                label="Server Type">
                {FtpTypeOptions?.map(option => (
                <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
              ))}
              </Select>
            </FormControl>
        <TextField
            variant="standard"
            placeholder="Enter Server Name"
            spellCheck={false}
            autoFocus
            margin="dense"
            id="Server Name"
            label="Server Name"
            type="text"
            style={{ width: "98%", paddingRight: "2%" }}
            InputLabelProps={{
              shrink: true,
              sx: { left: "1rem", right: "1rem" },
            }}
            value={deleteftpserverName ? deleteftpserverName : ""}
            onChange={(event) => {
              setftpserverName(event.target.value);
            }}
          />
            <br></br>
            <TextField
              variant="standard"
              placeholder="Enter Server IP"
              spellCheck={false}
              autoFocus
              fullWidth
              margin="dense"
              id="Server IP"
              label="Server IP"
              type="text"
              style={{ width: "98%", paddingRight: "2%" }}
              InputLabelProps={{
                shrink: true,
                sx: { left: "1rem", right: "1rem" },
              }}
              value={deleteftpserver ? deleteftpserver : ""}
              disabled={true}
            /><br></br>
        <FormControl variant="standard" sx={{ width: "98%", paddingRight: "2%" }}>
            <InputLabel id="protocoltype">Protocol Type</InputLabel>
              <Select
                placeholder="Select Protocol Type"
                labelId="protocoltype"
                id="protocoltype"
                value={deleteftpserverType ? deleteftpserverType : ""}
                label="protocoltype">
                {ProtocolTypeOptions?.map(option => (
                <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
              ))}
              </Select>
            </FormControl>
            <TextField
              variant="standard"
              placeholder="Enter File Path"
              spellCheck={false}
              autoFocus
              margin="dense"
              fullWidth
              id="File Path"
              label="File Path"
              type="text"
              style={{ width: "98%", paddingRight: "2%" }}
              InputLabelProps={{
                shrink: true,
                sx: { left: "1rem", right: "1rem" },
              }}
              value={deleteftppath ? deleteftppath : ""}
              disabled={true}
            /><br></br>
            <TextField
              variant="standard"
              placeholder="Enter Username"
              spellCheck={false}
              autoFocus
              margin="dense"
              fullWidth
              id="Username"
              label="Username"
              type="text"
              style={{ width: "98%", paddingRight: "2%" }}
              InputLabelProps={{
                shrink: true,
                sx: { left: "1rem", right: "1rem" },
              }}
              value={deleteusername ? deleteusername : ""}
              disabled={true}
            /><br></br>
            <TextField
              variant="standard"
              margin="dense"
              spellCheck={false}
              id="PASSWORD"
              label="Password"
              type="password"
              placeholder="Enter Password"
              required
              fullWidth
              style={{ width: "98%", paddingRight: "2%" }}
              InputLabelProps={{
                shrink: true,
                sx: { left: "1rem", right: "1rem" },
              }}
              value={deletepassword ? deletepassword : ""}
              disabled={true}
            /><br></br>
          </DialogContent>
          
        <DialogActions>
        <Button onClick={(event) => {
    deleteData();
    event.preventDefault();
    event.stopPropagation();
    setdeletedialogopen(false)
  }}  color="secondary">
    Delete
  </Button>
  <Button onClick={(event) => {
    setdeletedialogopen(false)
    event.preventDefault();
    event.stopPropagation();
  }} color="secondary">
    Cancel
  </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={dialogopen}  PaperProps={{
                  style: {
                    minHeight: '23vh',
                    minWidth: '40vw',
                    borderRadius: '5px',
                    backgroundColor: 'white'
                  }
                }}>
          <DialogTitle id="form-dialog-title">
            Edit Config Data
          </DialogTitle>
          <DialogContent>
          <FormControl variant="standard" sx={{ width: "98%", paddingRight: "2%"}}>
            <InputLabel id="ftpservertype">FTP Server Type</InputLabel>
              <Select
                placeholder="Select Server Type"
                labelId="ftpservertype"
                id="ftpservertype"
                onChange={handleFTPTypeEditChange}
                value={editftpserverType ? editftpserverType : ""}
                label="Server Type">
                {FtpTypeOptions?.map(option => (
                <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
              ))}
              </Select>
              <FormHelperText error  sx={{ "&.Mui-error": { color: "#d32f2f" } }} >{editvalidftpserverType ? "" : "Please Select the Server Type"}</FormHelperText>
            </FormControl>
          <TextField
            variant="standard"
            placeholder="Enter Server Name"
            spellCheck={false}
            autoFocus
            margin="dense"
            id="Server Name"
            label="Server Name"
            type="text"
            style={{ width: "98%", paddingRight: "2%" }}
            InputLabelProps={{
              shrink: true,
              sx: { left: "1rem", right: "1rem" },
            }}
            value={editftpserverName ? editftpserverName : ""}
            onChange={(event) => {
              seteditvalidftpserverName(true);
              seteditftpserverName(event.target.value);
            }}
            error={!editvalidftpserverName}
            sx={{ "&.MuiFormHelperText-root.Mui-error": { color: "red" } }}
            helperText={editvalidftpserverName ? "": "Please Enter the Server Name"
            }
          />
         
            <TextField
              variant="standard"
              placeholder="Enter Server IP"
              spellCheck={false}
              autoFocus
              fullWidth
              margin="dense"
              id="Server IP"
              label="Server IP"
              type="text"
              style={{ width: "98%", paddingRight: "2%" }}
              InputLabelProps={{
                shrink: true,
                sx: { left: "1rem", right: "1rem" },
              }}
              value={editftpserver ? editftpserver : ""}
              onChange={(event) => {
                seteditvalidatedftpserver(true);
                seteditftpserver(event.target.value);
                seteditvalidatedftpserver(true);
                if (!ValidateIPaddress(event.target.value)) {
                  seteditvalidatedftpserver(false);
                }
              }}
              error={!validftpserver}
              sx={{ "&.MuiFormHelperText-root.Mui-error": { color: "red" } }}
              helperText={
                editvalidftpserver
                  ? editvalidatedftpserver
                    ? ""
                    : "Invalid IP Address"
                  : "Please Enter IP Address"
              }
            /><br></br>
        <FormControl variant="standard" sx={{ width: "98%", paddingRight: "2%" }}>
            <InputLabel id="protocoltype">Protocol Type</InputLabel>
              <Select
                placeholder="Select Protocol Type"
                labelId="protocoltype"
                id="protocoltype"
                onChange={handleProtoColypeEditChange}
                value={editprotocoltype ? editprotocoltype : ""}
                label="protocoltype">
                {ProtocolTypeOptions?.map(option => (
                <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
              ))}
              </Select>
              <FormHelperText error  sx={{ "&.Mui-error": { color: "#d32f2f" } }} >{editvalidprotocoltype ? "" : "Please Select the Protocol Type"}</FormHelperText>
            </FormControl>
            <TextField
              variant="standard"
              placeholder="Enter File Path"
              spellCheck={false}
              autoFocus
              margin="dense"
              fullWidth
              id="File Path"
              label="File Path"
              type="text"
              style={{ width: "98%", paddingRight: "2%" }}
              InputLabelProps={{
                shrink: true,
                sx: { left: "1rem", right: "1rem" },
              }}
              value={editftppath ? editftppath : ""}
              onChange={(event: any) => {
                seteditftppath(event.target.value);
                seteditvalidftppath(true);
              }}
              error={!editvalidftppath}
              sx={{ "&.MuiFormHelperText-root.Mui-error": { color: "red" } }}
              helperText={editvalidftppath ? "" : "Please enter the Path"}
            /><br></br>
            <TextField
              variant="standard"
              placeholder="Enter Username"
              spellCheck={false}
              autoFocus
              margin="dense"
              fullWidth
              id="Username"
              label="Username"
              type="text"
              style={{ width: "98%", paddingRight: "2%" }}
              InputLabelProps={{
                shrink: true,
                sx: { left: "1rem", right: "1rem" },
              }}
              value={editusername ? editusername : ""}
              onChange={(event: any) => {
                seteditusername(event.target.value);
                seteditvalidusername(true);
              }}
              error={!editvalidusername}
              sx={{ "&.MuiFormHelperText-root.Mui-error": { color: "red" } }}
              helperText={editvalidusername ? "" : "Please Enter the UserName"}
            /><br></br>
            <TextField
              variant="standard"
              margin="dense"
              spellCheck={false}
              id="PASSWORD"
              label="Password"
              type="password"
              placeholder="Enter Password"
              required
              fullWidth
              style={{ width: "98%", paddingRight: "2%" }}
              InputLabelProps={{
                shrink: true,
                sx: { left: "1rem", right: "1rem" },
              }}
              value={editpassword ? editpassword : ""}
              onChange={(event: any) => {
                seteditpassword(event.target.value);
                seteditvalidpassowrd(true);
              }}
              error={!editvalidpassword}
              sx={{ "&.MuiFormHelperText-root.Mui-error": { Color: "red" } }}
              helperText={editvalidpassword ? "" : "Please Enter the Password"}
            /><br></br>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                if (areeditFieldsValid(editftpserverType,editftpserverName,editftpserver,editprotocoltype, editftppath, editusername, editpassword)) {
                  editsave();
                }
              }}
              color="secondary"
            >
              Update
            </Button>
            <Button
              onClick={() => {
                setdialogopen(false)
              }}
              color="secondary"
            >
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      <div style={{ width: "100%", height: "200px", backgroundColor: "white" }}>
      <Typography
           style={{
            marginTop: "1%",
            fontSize: "2.5vh",
            marginLeft:"1%",
            marginRight: "2%",
            marginBottom: "0.2%",
          }}
        >
          {/* System Config */}
           File Server Config
        </Typography>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "98%",
            paddingLeft: "1%",
            paddingRight:'1%',
            marginLeft: "0%",
            overflow: "hidden",
          }}
        >
           <FormControl variant="standard" sx={{width: "20%", paddingRight: "2%", marginTop:"10px"}}>
            <InputLabel id="ftpservertype">Server Type</InputLabel>
              <Select
                placeholder="Select Server Type"
                labelId="ftpservertype"
                id="ftpservertype"
                onChange={handleFTPTypeChange}
                value={ftpserverType ? ftpserverType : ""}
                label="Server Type">
                {FtpTypeOptions?.map(option => (
                <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
              ))}
              </Select>
              <FormHelperText error  sx={{ "&.Mui-error": { color: "#d32f2f" } }}>{validatedftpserverType ? "" : "Please Select the Server Type"}</FormHelperText>
            </FormControl>
        <TextField
            variant="standard"
            placeholder="Enter Server Name"
            spellCheck={false}
            autoFocus
            margin="dense"
            id="Server Name"
            label="Server Name"
            type="text"
            style={{ width: "20%", paddingRight: "2%" }}
            InputLabelProps={{
              shrink: true,
              sx: { left: "1rem", right: "1rem" },
            }}
            value={ftpserverName ? ftpserverName : ""}
            onChange={(event) => {
              setvalidatedftpserverName(true);
              setftpserverName(event.target.value);
                       }}
            error={!validatedftpserverName}
            sx={{ "&.MuiFormHelperText-root.Mui-error": { color: "red" } }}
            helperText={validatedftpserverName ? "":  "Please Enter Server Name"
            }
          />
           
          <TextField
            variant="standard"
            placeholder="Enter Server IP"
            spellCheck={false}
            autoFocus
            margin="dense"
            id="Server IP"
            label="Server IP"
            type="text"
            style={{ width: "20%", paddingRight: "2%" }}
            InputLabelProps={{
              shrink: true,
              sx: { left: "1rem", right: "1rem" },
            }}
            value={ftpserver ? ftpserver : ""}
            onChange={(event) => {
              setvalidatedftpserver(true);
              setftpserver(event.target.value);
              setvalidatedftpserver(true);

              if (!ValidateIPaddress(event.target.value)) {
                setvalidatedftpserver(false);
              }
            }}
            error={!validftpserver}
            sx={{ "&.MuiFormHelperText-root.Mui-error": { color: "red" } }}
            helperText={
              validftpserver
                ? validatedftpserver
                  ? ""
                  : "Invalid IP Address"
                : "Please Enter IP Address"
            }
          />
        <FormControl variant="standard" sx={{width: "20%", paddingRight: "2%", marginTop:"10px"}}>
            <InputLabel id="protocoltype">Protocol Type</InputLabel>
              <Select
                placeholder="Select Protocol Type"
                labelId="protocoltype"
                id="protocoltype"
                onChange={handleProtocolChange}
                value={protocoltype ? protocoltype : ""}
                label="Protocol Type">
                {ProtocolTypeOptions?.map(option => (
                <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
              ))}
              </Select>
              <FormHelperText error  sx={{ "&.Mui-error": { color: "#d32f2f" } }}>{validatedprotocoltype ? "" : "Please Select the Protocol Type"}</FormHelperText>
            </FormControl>  
          <TextField
            variant="standard"
            placeholder="Enter File Path"
            spellCheck={false}
            autoFocus
            margin="dense"
            id="File Path"
            label="File Path"
            type="text"
            style={{ width: "20%", paddingRight: "2%" }}
            InputLabelProps={{
              shrink: true,
              sx: { left: "1rem", right: "1rem" },
            }}
            value={ftppath ? ftppath : ""}
            onChange={(event: any) => {
              setftppath(event.target.value);
              setvalidftppath(true);
            }}
            error={!validftppath}
            sx={{ "&.MuiFormHelperText-root.Mui-error": { color: "red" } }}
            helperText={validftppath ? "" : "Please enter the Path"}
          />
          <TextField
            variant="standard"
            placeholder="Enter Username"
            spellCheck={false}
            autoFocus
            margin="dense"
            id="Username"
            label="Username"
            type="text"
            style={{ width: "20%", paddingRight: "2%" }}
            InputLabelProps={{
              shrink: true,
              sx: { left: "1rem", right: "1rem" },
            }}
            value={username ? username : ""}
            onChange={(event: any) => {
              setusername(event.target.value);
              setvalidusername(true);
            }}
            error={!validusername}
            sx={{ "&.MuiFormHelperText-root.Mui-error": { color: "red" } }}
            helperText={validusername ? "" : "Please enter the UserName"}
          />
          <TextField
            variant="standard"
            placeholder="Enter Password"
            spellCheck={false}
            autoFocus
            margin="dense"
            id="Password"
            label="Password"
            type="password"
            style={{ width: "20%", paddingRight: "2%" }}
            InputLabelProps={{
              shrink: true,
              sx: { left: "1rem", right: "1rem" },
            }}
            value={password ? password : ""}
            onChange={(event: any) => {
              setpassword(event.target.value);
              setvalidpassowrd(true);
            }}
            error={!validpassword}
            sx={{ "&.MuiFormHelperText-root.Mui-error": { color: "red" } }}
            helperText={validpassword ? "" : "Please enter the Psassword"}
          />
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            paddingTop: "2%",
            marginLeft: "0%",
            flexDirection: "row",
          }}
        >
          <div style={{ width: "30%", marginLeft: "70%" }}>
            <Button
              variant="contained"
              style={{
                color: "#ffffff",
                backgroundColor: "#53659c",
                width: "25%",
                marginRight: "20px",
                marginLeft:'25%'
              }}
              onClick={saveData}
            >
              Save
            </Button>
            <Button
              variant="contained"
              style={{
                color: "#ffffff",
                backgroundColor: "#53659c",
                width: "25%",
              }}
              onClick={resetData}
            >
              Reset
            </Button>
          </div>
        </div>
      </div>

      <div style={{ marginTop: "20px" }}>
        <Table>
          <TableCell
            style={{
              width: "100%",
              height: "240px",
              overflowY: "visible",
              overflowX: "hidden",
              padding: "0px",
            }}
          >
            <Paper
              style={{
                width: "100%",
                border: "2px solid #ccc",
                marginTop: "2px",
                height: "234px",
              }}
            >
              <div style={{ maxHeight: "234px", overflowY: "auto" }}>
                <Table style={{ minWidth: "100%" }} aria-label="EndPoint table">
                  <TableHead
                    sx={{
                      "& th": {
                        color: "#ffffff",
                        backgroundColor: "#53659c",
                        lineHeight: "1.1",
                        position: "sticky",
                        top: "0",
                        zIndex: "1",
                      },
                    }}
                  >
                    <TableRow sx={{ "& .MuiTableRow-root": { maxHeight: 20 } }}>
                    <TableCell align="center" style={{ width: "10%" }}>
                        Server Type
                      </TableCell>
                    <TableCell align="center" style={{ width: "12%" }}>
                        Server Name
                      </TableCell>
                      <TableCell align="center" style={{ width: "10%" }}>
                        Server Ip
                      </TableCell>
                      <TableCell align="center" style={{ width: "10%" }}>
                        Protocol Type
                      </TableCell>
                      <TableCell align="center" style={{ width: "15%" }}>
                        File Path{" "}
                      </TableCell>
                      <TableCell align="center" style={{ width: "12%" }}>
                        User Name
                      </TableCell>
                      <TableCell align="center" style={{ width: "9%" }}>
                        Password
                      </TableCell>
                      <TableCell align="center">Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody style={{ zIndex: "0" }}>
                    {systemconfigrows.map((row: any) => (
                      <TableRow
                        key={row.id}
                        sx={{
                          "&:nth-of-type(odd)": { backgroundColor: "#d7ecff" },
                          "& .MuiTableCell-root": {
                            height: "5px",
                            padding: "0",
                          },
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <CustomTableCell {...{ row, name: "FTP_SERVER_TYPE" }} />
                        <CustomTableCell {...{ row, name: "FTP_SERVER_NAME" }} />
                        <CustomTableCell {...{ row, name: "FTP_SERVER_IP" }} />
                        <CustomTableCell {...{ row, name: "PROTOCOL_TYPE" }} />
                        <CustomTableCell {...{ row, name: "FTP_FILE_PATH" }} />
                        <CustomTableCell {...{ row, name: "USERNAME" }} />
                        <CustomTableCell {...{ row, name: "PASSWORD" }} />
                        <TableCell
                          align="center"
                          style={{ width: "15%", height: "10px" }}
                        >
                          <IconButton
                            aria-label="edit"
                            onClick={() => editData(row)}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            aria-label="delete"
                            onClick={() => setdeletedata(row)}
                          >
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
  );
};
