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
  let [ftpserver, setftpserver] = useState<string>("");
  let [ftppath, setftppath] = useState<string>("");
  let [username, setusername] = useState<string>("");
  let [password, setpassword] = useState<string>("");
  const [visibility, setVisibility] = useState<{ [key: string]: boolean }>({});
  const [dialogopen, setdialogopen] = useState<boolean>(false);
  let [editftpserver, seteditftpserver] = useState<string>("");
  let [editftppath, seteditftppath] = useState<string>("");
  let [editusername, seteditusername] = useState<string>("");
  let [editpassword, seteditpassword] = useState<string>("");
  let [oldftpserver, setoldftpserver] = useState<string>("");
  let [editvalidftpserver, seteditvalidftpserver] = useState<boolean>(true);
  let [editvalidftppath, seteditvalidftppath] = useState<boolean>(true);
  let [editvalidusername, seteditvalidusername] = useState<boolean>(true);
  let [editvalidpassword, seteditvalidpassowrd] = useState<boolean>(true);
  let [editvalidatedftpserver, seteditvalidatedftpserver] = useState<boolean>(true);
  const [Sucessmsg, setSucessmsg] = React.useState("");
  const [SaveSucesopen, setSaveSucesopen] = React.useState(false);
  const [savedialogTitle, setsavedialogTitle] = React.useState("");

  const handleVisibilityToggle = (rowId: string) => {
    console.log(rowId)
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
    FTP_SERVER_IP: string,
    FTP_FILE_PATH: string,
    USERNAME: string,
    PASSWORD: string
  ) => ({
    id: `${FTP_SERVER_IP}:${FTP_FILE_PATH.replace(/\//g, '-')}`,
    FTP_SERVER_IP,
    FTP_FILE_PATH,
    USERNAME,
    PASSWORD,
  });

  const fetchSystemConfigData = () => {
    nodeId = "node2";
    const baseUri = `${window.location.origin}`;
    const DbPath = baseUri + "/system_config/_search/";

    const newSystemConfigRows: any[] = [];
    axios
      .get(DbPath)
      .then((res: any) => {
        const systemconfigdata = res.data.hits.hits?.some((row: any) => {
          return row._source;
        });
        console.log(systemconfigdata);
        setsystemdata(systemdata);
        systemconfigdata?.map((row: any) => {
          return newSystemConfigRows.push(
            AddnewSystemConfigData(
              row.FTP_SERVER_IP,
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
            err.response.data.error.type &&
            err.response.data.error.type == "index_not_found_exception"
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
  const areFieldsValid = (
    ftpserver: string,
    ftppath: string,
    username: string,
    password: string
  ) => {
    setvalidftpserver(true);
    setvalidftppath(true);
    setvalidusername(true);
    setvalidpassowrd(true);
    if (ftpserver == "") {
      dialogopen ? seteditvalidftpserver(false) : setvalidftpserver(false)  ;
      return false;
    } else if (ftppath == "") {
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
    ftpserver: string,
    ftppath: string,
    username: string,
    password: string
  ) => {
    seteditvalidftpserver(true);
    seteditvalidftppath(true);
    seteditvalidusername(true);
    seteditvalidpassowrd(true);
    if (ftpserver == "") {
      seteditvalidftpserver(false);
      return false;
    } else if (ftppath == "") {
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
    if (areFieldsValid(ftpserver, ftppath, username, password)) {
      const baseUri = `${window.location.origin}`;
      const documentName = `${ftpserver}:${ftppath.replace(/\//g, '-')}`;
      axios
        .post(baseUri + `/system_config/_doc/${documentName}`, {
          FTP_SERVER_IP: ftpserver,
          FTP_FILE_PATH: ftppath,
          USERNAME: username,
          PASSWORD: password,
        })
        .then((res: any) => {

          setftppath("");
          setftpserver("");
          setusername("");
          setpassword("");
          setSaveSucesopen(true);
          setSucessmsg("Data saved successfully");
          setsavedialogTitle("Success");

        })
        .catch((error: any) => {
          alert(error);
        });
        
      fetchSystemConfigData();
    }
  };
  const resetData = () => {
    setftppath("");
    setftpserver("");
    setusername("");
    setpassword("");
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
    setdialogopen(false);
    fetchSystemConfigData();
  };
  
  const editsave=()=>{
    if (areFieldsValid(editftpserver, editftppath, editusername, editpassword)) {
      const baseUri = `${window.location.origin}`;
      axios
        .delete(baseUri + `/system_config/_doc/${oldftpserver}`)
        .then((res) => {
          axios
            .post(baseUri + `/system_config/_doc/${editftpserver}:${editftppath.replace(/\//g, '-')}`, {
              FTP_SERVER_IP: editftpserver,
              FTP_FILE_PATH: editftppath,
              USERNAME: editusername,
              PASSWORD: editpassword,
            })
            .then((res: any) => {

              seteditftppath("");
              seteditftpserver("");
              seteditusername("");
              seteditpassword("");

            })
            .catch((error: any) => {
              alert(error);
            });
        });
        
    fetchSystemConfigData();
    }
  }
  const editData = (row: any) => {
    setoldftpserver(`${row.FTP_SERVER_IP}:${row.FTP_FILE_PATH.replace(/\//g, '-')}`)
    setdialogopen(true)
    seteditftppath(row.FTP_FILE_PATH)
    seteditftpserver(row.FTP_SERVER_IP)
    seteditusername(row.USERNAME)
    seteditpassword(row.PASSWORD)
  };
  const deleteData = async (row: any) => {
    const baseuri = `${window.location.origin}`;
    await axios
      .delete(baseuri + `/system_config/_doc/${row.FTP_SERVER_IP}:${row.FTP_FILE_PATH.replace(/\//g, '-')}`)
      .then((res) => {
        setSaveSucesopen(true);
        setSucessmsg("Data Deleted successfully");
        setsavedialogTitle("Delete");
      });
    fetchSystemConfigData();
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

      <Dialog open={dialogopen} style={{overflowX:'auto'}}>
          <DialogTitle id="form-dialog-title">
            Edit File Server Config Data
          </DialogTitle>
          <DialogContent>
            <TextField
              variant="standard"
              placeholder="Enter FTP Server IP"
              spellCheck={false}
              autoFocus
              fullWidth
              margin="dense"
              id="FTP Server IP"
              label="FTP Server IP"
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
              sx={{ "&.MuiFormHelperText-root.Mui-error": { Color: "red" } }}
              helperText={
                editvalidftpserver
                  ? editvalidatedftpserver
                    ? ""
                    : "Invalid FTP IP Address"
                  : "Please Enter FTP IP Address"
              }
            /><br></br>

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
              sx={{ "&.MuiFormHelperText-root.Mui-error": { Color: "red" } }}
              helperText={editvalidftppath ? "" : "PLEASE ENTER FTP PATH"}
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
              sx={{ "&.MuiFormHelperText-root.Mui-error": { Color: "red" } }}
              helperText={editvalidusername ? "" : "PLEASE ENTER USERNAME"}
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
              helperText={editvalidpassword ? "" : "PLEASE ENTER PASSWORD"}
            /><br></br>
          </DialogContent>
          <DialogActions>
            <Button onClick={resetData} color="secondary">
              Cancel
            </Button>
            <Button
              onClick={() => {
                if (areeditFieldsValid(editftpserver, editftppath, editusername, editpassword)) {
                  editsave();
                }
              }}
              color="secondary"
            >
              Save
            </Button>
          </DialogActions>
        </Dialog>
      <div style={{ width: "100%", height: "200px", backgroundColor: "white" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "98%",
            paddingLeft: "1%",
            paddingRight:'1%',
            marginLeft: "0%",
            overflow: "hidden",
          }}
        >
          <TextField
            variant="standard"
            placeholder="Enter FTP Server IP"
            spellCheck={false}
            autoFocus
            margin="dense"
            id="Ftp Server IP"
            label="Ftp Server IP"
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
            sx={{ "&.MuiFormHelperText-root.Mui-error": { Color: "red" } }}
            helperText={
              validftpserver
                ? validatedftpserver
                  ? ""
                  : "Invalid FTP IP Address"
                : "Please Enter FTP IP Address"
            }
          />
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
            sx={{ "&.MuiFormHelperText-root.Mui-error": { Color: "red" } }}
            helperText={validftppath ? "" : "PLEASE ENTER FTP PATH"}
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
            sx={{ "&.MuiFormHelperText-root.Mui-error": { Color: "red" } }}
            helperText={validusername ? "" : "PLEASE ENTER USERNAME"}
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
            sx={{ "&.MuiFormHelperText-root.Mui-error": { Color: "red" } }}
            helperText={validpassword ? "" : "PLEASE ENTER PASSWORD"}
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
              height: "300px",
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
                height: "300px",
              }}
            >
              <div style={{ maxHeight: "300px", overflowY: "auto" }}>
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
                      <TableCell align="center" style={{ width: "20%" }}>
                        Ftp Server Ip
                      </TableCell>
                      <TableCell align="center" style={{ width: "20%" }}>
                        Ftp File Path{" "}
                      </TableCell>
                      <TableCell align="center" style={{ width: "20%" }}>
                        Username
                      </TableCell>
                      <TableCell align="center" style={{ width: "20%" }}>
                        Password
                      </TableCell>
                      <TableCell align="center">Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody style={{ zIndex: "0" }}>
                    {systemconfigrows?.map((row: any) => (
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
                        <CustomTableCell {...{ row, name: "FTP_SERVER_IP" }} />
                        <CustomTableCell {...{ row, name: "FTP_FILE_PATH" }} />
                        <CustomTableCell {...{ row, name: "USERNAME" }} />
                        <CustomTableCell {...{ row, name: "PASSWORD" }} />
                        <TableCell
                          align="center"
                          style={{ width: "20%", height: "10px" }}
                        >
                          <IconButton
                            aria-label="edit"
                            onClick={() => editData(row)}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            aria-label="delete"
                            onClick={() => deleteData(row)}
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
