/**
 * ============LICENSE_START========================================================================
 * ONAP : ccsdk feature sdnr wt odlux
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
import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { MenuItem, SelectChangeEvent } from "@mui/material";
import Select from "@mui/material/Select";
import axios from "axios";
import {
  IDispatcher,
  connect,
  Connect,
} from "../../../../framework/src/flux/connect";
import {
  addAvaliablepreproviderServerAsyncActionCreator,
  removeAvaliablepreproviderServerAsyncActionCreator,
  updateAvaliablepreproviderServerAsyncActionCreator,
  importpreproviderServerAsyncActionCreator,
} from "../actions/avaliablePreproviderServersActions";

import { providerdata } from "../models/preproviderServer";
import { FormControl, InputLabel, Typography } from "@mui/material";
import preproviderService from "../services/preproviderService";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import { WarningOutlined } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
const baseUri = `${window.location.origin}`;
//const MyCheckbox = <Checkbox />;

export enum EditpreproviderServerDialogMode {
  None = "none",
  AddpreproviderServer = "addpreproviderServer",
  EditpreproviderServer = "editpreproviderServer",
  RemovepreproviderServer = "removepreproviderServer",
  ImportpreproviderServer = "importpreproviderServer",
}

const mapDispatch = (dispatcher: IDispatcher) => ({
  addpreproviderServer: async(element: providerdata) => {
    dispatcher.dispatch(
      addAvaliablepreproviderServerAsyncActionCreator(element)
    );
    let result = null;
    if (element.DeviceType === 'RRU') {
      console.log('DeviceType is RRU, making call to Netconf Call Home server.');
      const netconfBaseUri = `${baseUri}/rests/data/odl-netconf-callhome-server:netconf-callhome-server/allowed-devices/device=${element.PNFID}`;
      try {
        const userToken = localStorage.getItem("userToken") || "";
        let parsedToken;
        try {
          parsedToken = userToken ? JSON.parse(userToken) : null;
        } catch (error) {
          console.error("Invalid token format:", error);
        }
        const usernameFromToken = parsedToken && parsedToken.access_token ? parsedToken.access_token : "";
        console.log(usernameFromToken)
 
          const netconfResponse = await axios.put(netconfBaseUri, {
              "device": {
                  "unique-id": element.PNFID,
                  "ssh-client-params": {
                      "credentials": {
                          "username": element.USERNAME,
                          "passwords": [element.PASSWORD]
                      },
                      "host-key": element.SSHKey
                  }
              }
          }, {
              headers: {
                'Authorization': `Basic ${usernameFromToken}`,
                  // 'Content-Type': 'application/json',
                  // 'Accept': 'application/json',
              },
          });
          result = netconfResponse.data;
          console.log("Netconf response result:", result);
      } catch (error) {
          console.error('Error posting to Netconf Call Home:', error.message);
          result = null;
      }
  }
  },
  updatepreproviderServer: async (element: providerdata) => {
    dispatcher.dispatch(
      updateAvaliablepreproviderServerAsyncActionCreator(element)
    );
    let result = null;
    if (element.DeviceType === 'RRU') {
      console.log('DeviceType is RRU, making call to Netconf Call Home server.');
      const netconfBaseUri = `${baseUri}/rests/data/odl-netconf-callhome-server:netconf-callhome-server/allowed-devices/device=${element.PNFID}`;
      try {
        const userToken = localStorage.getItem("userToken") || "";
        let parsedToken;
        try {
          parsedToken = userToken ? JSON.parse(userToken) : null;
        } catch (error) {
          console.error("Invalid token format:", error);
        }
        const usernameFromToken = parsedToken && parsedToken.access_token ? parsedToken.access_token : "";
        console.log(usernameFromToken)
 
          const netconfResponse = await axios.put(netconfBaseUri, {
              "device": {
                  "unique-id": element.PNFID,
                  "ssh-client-params": {
                      "credentials": {
                          "username": element.USERNAME,
                          "passwords": [element.PASSWORD]
                      },
                      "host-key": element.SSHKey
                  }
              }
          }, {
              headers: {
                'Authorization': `Basic ${usernameFromToken}`,
                  // 'Content-Type': 'application/json',
                  // 'Accept': 'application/json',
              },
          });
          result = netconfResponse.data;
          console.log("Netconf response result:", result);
      } catch (error) {
          console.error('Error posting to Netconf Call Home:', error.message);
          result = null;
      }
  }
  },
 
  removepreproviderServer: (element: providerdata) => {
    dispatcher.dispatch(
      removeAvaliablepreproviderServerAsyncActionCreator(element)
    );
  },
  importpreproviderServer: (element: providerdata) => {
    dispatcher.dispatch(importpreproviderServerAsyncActionCreator(element));
  },
});

type DialogSettings = {
  dialogTitle: string;
  dialogDescription: string;
  applyButtonText: string;
  saveButtonText?: string;
  updateButtonText?: string;
  deleteButtonText?: string;
  cancelButtonText: string;
  readonly: boolean;
  uploadvisible: boolean;
  importButtonText: string;
};

const settings: { [key: string]: DialogSettings } = {
  [EditpreproviderServerDialogMode.None]: {
    dialogTitle: "",
    dialogDescription: "",
    applyButtonText: "",
    cancelButtonText: "",
    readonly: true,
    uploadvisible: false,
    importButtonText: "",
  },
  [EditpreproviderServerDialogMode.AddpreproviderServer]: {
    dialogTitle: "Add preprovider",
    dialogDescription: "",
    applyButtonText: "",
    cancelButtonText: "Cancel",
    saveButtonText: "Save",
    readonly: false,
    uploadvisible: true,
    importButtonText: "",
  },
  [EditpreproviderServerDialogMode.EditpreproviderServer]: {
    dialogTitle: "Edit preprovider",
    dialogDescription: "",
    applyButtonText: "",
    cancelButtonText: "Cancel",
    updateButtonText: "Update",
    readonly: false,
    uploadvisible: true,
    importButtonText: "",
  },
  [EditpreproviderServerDialogMode.RemovepreproviderServer]: {
    dialogTitle: "Delete preprovider",
    dialogDescription: "Are you sure want to delete this Preprovider?",
    applyButtonText: "",
    cancelButtonText: "Cancel",
    deleteButtonText: "Delete",
    readonly: true,
    uploadvisible: false,
    importButtonText: "",
  },
  [EditpreproviderServerDialogMode.ImportpreproviderServer]: {
    dialogTitle: "Import preprovider",
    dialogDescription: "Are you sure want to Import this Preprovider?",
    applyButtonText: "",
    cancelButtonText: "Cancel",
    importButtonText: "Import",
    readonly: true,
    uploadvisible: false,
  },
};

type EditpreproviderServerDialogComponentProps = Connect<
  undefined,
  typeof mapDispatch
> & {
  mode: EditpreproviderServerDialogMode;
  preprovider: providerdata;
  onClose: () => void;
  rowdata: providerdata;
};

const urlRegex = RegExp("^https?://");

type EditpreproviderServerDialogComponentState = providerdata & {
  errorMessage: string[];
  oldPNFID: any;
  ProfileName: string[];
  oldip: string;
  oldport: string;
  NEW_PNFID: string;
  validIP_ADDRESS: boolean;
  validPORT_NUMBER: boolean;
  validDeviceType: boolean;
  validPNFID: boolean;
  validUSERNAME: boolean;
  validPASSWORD: boolean;
  validPREPROVIDERCONF: boolean;
  validatedIP_ADDRESS: boolean;
  validatedPORT_NUMBER: boolean;
  nodes: any;
  SaveSucesopen: boolean;
  Sucessmsg: any;
  savedialogTitle: any;
  updateExecuted: boolean;
  SSHKey: string;
  validSSH: boolean;
};

class EditpreproviderServerDialogComponent extends React.Component<
  EditpreproviderServerDialogComponentProps,
  EditpreproviderServerDialogComponentState
> {
  constructor(props: EditpreproviderServerDialogComponentProps) {
    super(props);

    this.state = {
      DeviceType: "",
      PNFID: "",
      IP_ADDRESS: "",
      PORT_NUMBER: "",
      USERNAME: "",
      PASSWORD: "",
      PREPROVIDER_CONF: "",
      FILENAME: "",
      errorMessage: [],
      oldPNFID: "",
      oldip: "",
      oldport: "",
      ProfileName: [],
      NEW_PNFID: "",
      SSHKey: "",
      validIP_ADDRESS: true,
      validPORT_NUMBER: true,
      validDeviceType: true,
      validPNFID: true,
      validUSERNAME: true,
      validPASSWORD: true,
      validPREPROVIDERCONF: true,
      validatedIP_ADDRESS: true,
      validatedPORT_NUMBER: true,
      nodes: null,
      SaveSucesopen: false,
      Sucessmsg: "",
      savedialogTitle: "",
      updateExecuted: true,
      validSSH: true,
    };
    this.fetchFileNames();
    this.fetchpreprovider();
  }
  fetchFileNames = async () => {
    let count = 10;
    try {
      await axios
        .get(baseUri + "/profilemanagement/_count")
        .then((res: any) => {
          count = res.data.count;
        });
    } catch (Error) {}
    try {
      const response = await axios.get(
        `${baseUri}/profilemanagement/_search?size=` + count
      );

      const ProfileName = response.data.hits.hits.map((hit: any) => ({
        ProfileName: hit._source.ProfileName,
        FileName: hit._source.FileName,
      }));
      this.setState({ ProfileName });
    } catch (error) {
      console.error("Error fetching file names:", error);
    }
  };
  fetchpreprovider = async () => {
    let count = 10;
    try {
      await axios.get(baseUri + "/pre_provider/_count").then((res: any) => {
        count = res.data.count;
      });
    } catch (Error) {}
    try {
      const response = await axios.get(
        `${baseUri}/pre_provider/_search?size=` + count
      );

      const nodes = response.data.hits.hits.map((hit: any) => ({
        DeviceType: hit._source.DeviceType,
        PNFID: hit._source.PNFID,
        IP_ADDRESS: hit._source.IP_ADDRESS,
        PORT_NUMBER: hit._source.PORT_NUMBER,
        USERNAME: hit._source.USERNAME,
        PASSWORD: hit._source.PASSWORD,
        PREPROVIDER_CONF: hit._source.PREPROVIDER_CONF,
        FILENAME: hit._source.FILENAME,
      }));

      this.setState({ nodes: nodes });
    } catch (error) {
      console.error("Error fetching Nodes:", error);
    }
  };

  handleChange = (event: SelectChangeEvent<string>) => {
    const selectedfile: any = this.state.ProfileName.filter((profile: any) => {
      return profile.ProfileName == event.target.value;
    });
    this.setState({
      PREPROVIDER_CONF: event.target.value,
      FILENAME: selectedfile[0].FileName,
      validPREPROVIDERCONF: true,
    });
  };
  ValidateIPaddress = (ipaddressField: any) => {
    const ipv4Regex =
      /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    if (ipv4Regex.test(ipaddressField)) {
      return true;
    } else {
      return false;
    }
  };

  ValidateportNumber = (portnumber: any) => {
    if (portnumber <= 65535 && portnumber >= 0) {
      return true;
    } else {
      return false;
    }
  };
  handleSaveSecessClose = (event: any, reason: string) => {
    event.preventDefault();
    event.stopPropagation();
    this.setState({ SaveSucesopen: false });
  };

  areFieldsValid = () => {
    const {
      DeviceType,
      PNFID,
      IP_ADDRESS,
      PORT_NUMBER,
      USERNAME,
      PASSWORD,
      PREPROVIDER_CONF,
    } = this.state;
    const storedData = sessionStorage.getItem("providerdata");
    if (storedData) {
      this.setState({ nodes: JSON.parse(storedData) });
    } else {
      this.setState({ nodes: [] });
    }
    const duplicatenode = this.state.nodes.find(function (node: any) {
      return node.PNFID === PNFID;
    });

    const duplicaterow = this.state.nodes.find(function (node: any) {
      return node.IP_ADDRESS === IP_ADDRESS && node.PORT_NUMBER === PORT_NUMBER;
    });

    
    if (
      this.props.mode === EditpreproviderServerDialogMode.AddpreproviderServer
    ) {
      if (duplicatenode) {
        this.setState({ SaveSucesopen: true });
        this.setState({
          Sucessmsg: "Duplicate PNFID not allowed",
        });
        this.setState({ savedialogTitle: "Warning" });
        this.onCancel();
        return false;
      } else if (duplicaterow) {
        this.setState({ SaveSucesopen: true });
        this.setState({
          Sucessmsg: "Duplicate IP Address and Port Number not allowed",
        });
        this.setState({ savedialogTitle: "Warning" });
        this.onCancel();
        return false;
      } else {
        if (PNFID == "") {
          this.setState({ validPNFID: false });
          return false;
        } else if (DeviceType == "") {
          this.setState({ validDeviceType: false });
          return false;
        } else if (DeviceType === "gNodeB" && IP_ADDRESS == "") {
          this.setState({ validIP_ADDRESS: false });
          return false;
        } else if (PORT_NUMBER == "") {
          this.setState({ validPORT_NUMBER: false });
          return false;
        } else if ( USERNAME == "") {
          this.setState({ validUSERNAME: false });
          return false;
        } else if (  PASSWORD == "") {
          this.setState({ validPASSWORD: false });
          return false;
        }else if (DeviceType === "RRU" &&  this.state.SSHKey == "" ) {
          this.setState({ validSSH: false });
          return false;
        } else if (PREPROVIDER_CONF == "") {
          this.setState({ validPREPROVIDERCONF: false });
          return false;
        }   else {
          if (
            this.state.validatedIP_ADDRESS &&
            this.state.validatedPORT_NUMBER
          ) {
            return true;
          } else {
            return false;
          }
        }
      }
    } else {
      console.log(this.props.rowdata);
      console.log(
        this.state.oldip !== IP_ADDRESS || this.state.oldport !== PORT_NUMBER
      );
      if (duplicatenode && this.state.oldPNFID !== PNFID) {
        this.setState({ SaveSucesopen: true });
        this.setState({
          Sucessmsg: "Duplicate PNFID not allowed",
        });
        this.setState({ savedialogTitle: "Warning" });
        this.onCancel();
        return false;
      } else if (
        duplicaterow &&
        (this.state.oldip !== IP_ADDRESS || this.state.oldport !== PORT_NUMBER)
      ) {
        this.setState({ SaveSucesopen: true });
        this.setState({
          Sucessmsg: "Duplicate IP Address and Port Number not allowed",
        });
        this.setState({ savedialogTitle: "Warning" });
        this.onCancel();
        return false;
      }  else {
        if (PNFID == "") {
          this.setState({ validPNFID: false });
          return false;
        } else if (DeviceType == "") {
          this.setState({ validDeviceType: false });
          return false;
        } else if (DeviceType === "gNodeB" && IP_ADDRESS == "") {
          this.setState({ validIP_ADDRESS: false });
          return false;
        } else if (PORT_NUMBER == "") {
          this.setState({ validPORT_NUMBER: false });
          return false;
        } else if (USERNAME == "") {
          this.setState({ validUSERNAME: false });
          return false;
        } else if ( PASSWORD == "") {
          this.setState({ validPASSWORD: false });
          return false;
        }else if (DeviceType === "RRU" && this.state.SSHKey == "" ) {
          this.setState({ validSSH: false });
          return false;
        } else if (PREPROVIDER_CONF == "") {
          this.setState({ validPREPROVIDERCONF: false });
          return false;
        }   else {
          if (
            this.state.validatedIP_ADDRESS &&
            this.state.validatedPORT_NUMBER
          ) {
            return true;
          } else {
            return false;
          }
        }
      }
        
      
    }
  };

  handleDropdownOpen = async () => {
    const storedData = sessionStorage.getItem("profiledata");
    if (storedData) {
      this.setState({ ProfileName: JSON.parse(storedData) });
    } else {
      this.setState({ ProfileName: [] });
    }
  };

  private onCancel = () => {
    this.setState({
      DeviceType: "",
      IP_ADDRESS: "",
      PNFID: "",
      PASSWORD: "",
      PORT_NUMBER: "",
      PREPROVIDER_CONF: "",
      USERNAME: "",
      SSHKey: "",
      validatedIP_ADDRESS:true,
      validatedPORT_NUMBER:true,
      validDeviceType: true,
      validIP_ADDRESS:true,
      validPASSWORD:true,
      validPNFID:true,
      validPORT_NUMBER:true,
      validPREPROVIDERCONF:true,
      validSSH:true
    });
    this.props.onClose();
  };

  public async componentDidUpdate(
    prevProps: EditpreproviderServerDialogComponentProps
  ) {
    // Check if rowdata has changed
    if (prevProps.rowdata !== this.props.rowdata) {
      this.setState({
        oldPNFID: this.props.rowdata ? this.props.rowdata.PNFID : "",
        oldip: this.props.rowdata ? this.props.rowdata.IP_ADDRESS : "",
        oldport: this.props.rowdata ? this.props.rowdata.PORT_NUMBER : "",
      });
    }
  }

  render(): JSX.Element {
    const { PREPROVIDER_CONF, ProfileName } = this.state;
    const setting = settings[this.props.mode];
    //const isFieldsValid = this.areFieldsValid();

    return (
      <>
        <Dialog
          open={this.state.SaveSucesopen}
          onClose={this.handleSaveSecessClose}
          PaperProps={{
            style: {
              minHeight: "10vh",
              minWidth: "23vw",
              border: "14px solid #38456a",
              borderRadius: "15px",
              backgroundColor: "#e8e8e8",
            },
          }}
        >
          <DialogContent
            style={{ alignContent: "center", textAlign: "center" }}
          >
            {/* <IconButton style={{ color: savedialogTitle == "Success" ? '#008000' : 'red', textAlign: "center" }}> <CheckCircleOutlineRoundedIcon /> <h6 style={{ marginLeft: '3px', color: savedialogTitle == "Success" ? '#008000' : 'red', textAlign: "center" }}>{Sucessmsg}</h6> </IconButton> */}
            <IconButton style={{ textAlign: "center" }}>
              {this.state.savedialogTitle === "Success" ? (
                <>
                  <CheckCircleOutlineRoundedIcon style={{ color: "#008000" }} />
                  <h6
                    style={{
                      marginLeft: "3px",
                      color: "#008000",
                      textAlign: "center",
                    }}
                  >
                    {this.state.Sucessmsg}
                  </h6>
                </>
              ) : (
                <>
                  <WarningOutlined style={{ color: "red" }} />
                  <h6
                    style={{
                      marginLeft: "3px",
                      color: "red",
                      textAlign: "center",
                    }}
                  >
                    {this.state.Sucessmsg}
                  </h6>
                </>
              )}
            </IconButton>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                this.setState({ SaveSucesopen: false });
              }}
              style={{
                backgroundColor: "white",
                color: "#38761d",
                border: "1px solid #2986cc",
                borderRadius: "1px",
                padding: "3px 6px",
              }}
            >
              OK
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={
            this.props.mode !== EditpreproviderServerDialogMode.None &&
            this.props.mode !==
              EditpreproviderServerDialogMode.ImportpreproviderServer
          }
        >
          <DialogTitle id="form-dialog-title">
            {setting.dialogTitle}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>{setting.dialogDescription}</DialogContentText>
            <FormControl margin="dense" variant="standard" fullWidth>
              <InputLabel id="Device-type-label">Device Type *</InputLabel>
              <Select
                variant="standard"
                labelId="device-type-label"
                id="DeviceType"
                value={this.state.DeviceType}
                // onChange={this.handleChange}
                onChange={(event) => {
                  this.setState({
                    DeviceType: event.target.value,
                    validDeviceType: true,
                    PREPROVIDER_CONF:""
                  });
                }}
                disabled={setting.readonly}
                error={!this.state.validDeviceType}
                sx={{ "&.MuiFormHelperText-root.Mui-error": { Color: "red" } }}
              >
                <MenuItem value="gNodeB">gNodeB</MenuItem>
                <MenuItem value="RRU">RRU</MenuItem>
              </Select>
              {this.state.validDeviceType ? null : (
                <p style={{ color: "red" }}>Please Select Device Type</p>
              )}
            </FormControl>

            <TextField
              variant="standard"
              disabled={setting.readonly}
              spellCheck={false}
              margin="dense"
              id="PNFID"
              label="PNF Id *"
              type="text"
              fullWidth
              value={this.state.PNFID}
              onChange={(event) => {
                this.setState({
                  PNFID: event.target.value,
                  validPNFID: true,
                });
              }}
              error={!this.state.validPNFID}
              sx={{ "&.MuiFormHelperText-root.Mui-error": { Color: "red" } }}
              helperText={this.state.validPNFID ? "" : "PLEASE ENTER PNFID"}
            />
            {this.state.DeviceType === "RRU" ? (
              <TextField
                multiline
                variant="standard"
                value={this.state.SSHKey}
                onChange={(event) => {
                  this.setState({
                    SSHKey: event.target.value,
                    validSSH: true,
                  });
                }}
                spellCheck={false}
                id="SSHKey"
                margin="dense"
                rows={5} // Always displays 5 rows
                label={"SSH Key *"}
                fullWidth
                type="text"
                placeholder="Type here..."
                inputProps={{
                  style: {
                    height: "auto", // Ensures height adapts to rows
                    lineHeight: "1.5", // Adjusts spacing between lines
                  },
                }}
                style={{
                  width: "100%",
                  resize: "none", // Prevents manual resizing
                }}
                error={!this.state.validSSH}
                sx={{
                  "& .MuiFormHelperText-root.Mui-error": { color: "red" },
                }}
                helperText={this.state.validSSH ? "" : "PLEASE ENTER SSHKey"}
              />
            ) : null}

            <TextField
              variant="standard"
              disabled={setting.readonly}
              spellCheck={false}
              margin="dense"
              id="IP_ADDRESS"
              label= {this.state.DeviceType == "RRU" ? "Ip Address" : "Ip Address *"}
              type="text"
              fullWidth
              value={this.state.IP_ADDRESS}
              onChange={(event) => {
                this.setState({
                  validIP_ADDRESS: true,
                  IP_ADDRESS: event.target.value,
                  validatedIP_ADDRESS: true,
                });

                if (!this.ValidateIPaddress(event.target.value)) {
                  this.setState({ validatedIP_ADDRESS: false });
                }
              }}
              error={
                !this.state.validIP_ADDRESS || !this.state.validatedIP_ADDRESS
              }
              sx={{ "&.MuiFormHelperText-root.Mui-error": { Color: "red" } }}
              helperText={
                this.state.validIP_ADDRESS
                  ? this.state.validatedIP_ADDRESS
                    ? ""
                    : "Invalid IP Address"
                  : "Please Enter IP Address"
              }
              FormHelperTextProps={{
                sx: { color: "red" }, // This will make the helper text red
              }}
            />
            <TextField
              variant="standard"
              disabled={setting.readonly}
              spellCheck={false}
              margin="dense"
              id="PORT_NUMBER"
              label="Port Number *"
              type="text"
              fullWidth
              value={this.state.PORT_NUMBER}
              onChange={(event) => {
                this.setState({
                  validPORT_NUMBER: true,
                  PORT_NUMBER: event.target.value,
                  validatedPORT_NUMBER: true,
                });

                if (!this.ValidateportNumber(event.target.value)) {
                  this.setState({ validatedPORT_NUMBER: false });
                }
              }}
              error={
                !this.state.validPORT_NUMBER || !this.state.validatedPORT_NUMBER
              }
              helperText={
                this.state.validPORT_NUMBER
                  ? this.state.validatedPORT_NUMBER
                    ? ""
                    : "Invalid PORT Number"
                  : "Please Enter PORT Number"
              }
              FormHelperTextProps={{
                sx: { color: "red" }, // This will make the helper text red
              }}
            />

            <TextField
              variant="standard"
              disabled={setting.readonly}
              spellCheck={false}
              margin="dense"
              
              id="USERNAME"
              label={ "Username *" }
              type="text"
              fullWidth
              value={this.state.USERNAME}
              onChange={(event) => {
                this.setState({
                  USERNAME: event.target.value,
                  validUSERNAME: true,
                });
              }}
              error={!this.state.validUSERNAME}
              sx={{ "&.MuiFormHelperText-root.Mui-error": { Color: "red" } }}
              helperText={
                this.state.validUSERNAME ? "" : "Please Enter Username"
              }
            />
            <TextField
              variant="standard"
              margin="dense"
              disabled={setting.readonly}
              spellCheck={false}
              id="PASSWORD"
              label={ "Password *"}
              type="password"
              
              fullWidth
              value={this.state.PASSWORD}
              onChange={(event) => {
                this.setState({
                  PASSWORD: event.target.value,
                  validPASSWORD: true,
                });
              }}
              error={!this.state.validPASSWORD}
              sx={{ "&.MuiFormHelperText-root.Mui-error": { Color: "red" } }}
              helperText={
                this.state.validPASSWORD ? "" : "Please Enter Password"
              }
            />
            <FormControl margin="dense" variant="standard" fullWidth>
              <InputLabel id="PREPROVIDER_CONF-label">NF Profiles *</InputLabel>
              <Select
                variant="standard"
                labelId="PREPROVIDER_CONF-label"
                id="PREPROVIDER_CONF"
                value={PREPROVIDER_CONF}
                onChange={this.handleChange}
                onOpen={this.handleDropdownOpen}
                disabled={setting.readonly}
                error={!this.state.validPASSWORD}
                sx={{ "& .MuiFormHelperText-root.Mui-error": { color: "red" } }}
              >
                {ProfileName.filter(
                  (profile: any, index: any) =>
                    profile.DeviceType === this.state.DeviceType
                ).map((profile: any) => (
                  <MenuItem
                    key={profile.ProfileName}
                    value={profile.ProfileName}
                  >
                    {profile.ProfileName}
                  </MenuItem>
                ))}
              </Select>

              {this.state.validPREPROVIDERCONF ? null : (
                <p style={{ color: "red" }}>Please Select NF Profile</p>
              )}
            </FormControl>
            <Typography id="errorMessage" component={"div"} color="error">
              {this.state.errorMessage.map((error, index) => (
                <div key={index}>{error}</div>
              ))}
            </Typography>
          </DialogContent>
          <DialogActions>
            {this.props.mode ===
              EditpreproviderServerDialogMode.AddpreproviderServer && (
              <Button
                onClick={() => {
                  this.setState({ nodes: this.state.nodes });
                  
                  if (
                    this.areFieldsValid() 
                  ) {
                    this.setState({validPREPROVIDERCONF:true,validatedIP_ADDRESS:true,validatedPORT_NUMBER:true,
                      validDeviceType:true,validIP_ADDRESS:true,validPASSWORD:true,validPNFID:true,validPORT_NUMBER:true,validSSH:true
                      ,validUSERNAME:true
                    })
                    preproviderService.insertpreproviderServer;
                    this.onApply({
                      DeviceType: this.state.DeviceType,
                      PNFID: this.state.PNFID,
                      IP_ADDRESS: this.state.IP_ADDRESS,
                      PORT_NUMBER: this.state.PORT_NUMBER,
                      USERNAME: this.state.USERNAME,
                      PASSWORD: this.state.PASSWORD,
                      PREPROVIDER_CONF: this.state.PREPROVIDER_CONF,
                      FILENAME: this.state.FILENAME,
                      oldPNFID: this.state.oldPNFID,
                      oldip: this.state.oldip,
                      oldport: this.state.oldport,
                      SSHKey: this.state.SSHKey,
                    });

                    const rows = this.state.nodes.map((row: any) => {
                      return row;
                    });
                    rows.push({
                      DeviceType: this.state.DeviceType,
                      PNFID: this.state.PNFID,
                      IP_ADDRESS: this.state.IP_ADDRESS,
                      PORT_NUMBER: this.state.PORT_NUMBER,
                      USERNAME: this.state.USERNAME,
                      PASSWORD: this.state.PASSWORD,
                      PREPROVIDER_CONF: this.state.PREPROVIDER_CONF,
                      FILENAME: this.state.FILENAME,
                    });
                    this.setState({ nodes: rows });
                    this.setState({
                      DeviceType: "",
                      PNFID: "",
                      IP_ADDRESS: "",
                      PORT_NUMBER: "",
                      USERNAME: "",
                      PASSWORD: "",
                      PREPROVIDER_CONF: "",
                      FILENAME: "",
                      SSHKey: "",
                    });
                  }
                }}
                color="secondary"
              >
                {setting.saveButtonText}
              </Button>
            )}

            {this.props.mode ===
              EditpreproviderServerDialogMode.RemovepreproviderServer && (
              <Button
                onClick={() => {
                  preproviderService.deletepreproviderServer;
                  this.onApply({
                    DeviceType: this.state.DeviceType,
                    PNFID: this.state.PNFID,
                    IP_ADDRESS: this.state.IP_ADDRESS,
                    PORT_NUMBER: this.state.PORT_NUMBER,
                    USERNAME: this.state.USERNAME,
                    PASSWORD: this.state.PASSWORD,
                    PREPROVIDER_CONF: this.state.PREPROVIDER_CONF,
                    FILENAME: this.state.FILENAME,
                    oldPNFID: this.state.oldPNFID,
                    oldip: this.state.oldip,
                    oldport: this.state.oldport,
                    SSHKey: this.state.SSHKey,
                  });
                  const filtered = this.state.nodes.filter((item: any) => {
                    return item.PNFID != this.state.PNFID;
                  });
                  this.setState({ nodes: filtered });
                }}
                color="secondary"
              >
                {setting.deleteButtonText}
              </Button>
            )}

            {this.props.mode ===
              EditpreproviderServerDialogMode.EditpreproviderServer && (
              <Button
                onClick={() => {
                  if (this.areFieldsValid()) {
                    this.setState({validPREPROVIDERCONF:true,validatedIP_ADDRESS:true,validatedPORT_NUMBER:true,
                      validDeviceType:true,validIP_ADDRESS:true,validPASSWORD:true,validPNFID:true,validPORT_NUMBER:true,validSSH:true
                      ,validUSERNAME:true
                    })
                    console.log("if eneterd")
                    preproviderService.updatepreproviderServer;
                    this.onApply({
                      DeviceType: this.state.DeviceType,
                      PNFID: this.state.PNFID,
                      IP_ADDRESS: this.state.IP_ADDRESS,
                      PORT_NUMBER: this.state.PORT_NUMBER,
                      USERNAME: this.state.USERNAME,
                      PASSWORD: this.state.PASSWORD,
                      PREPROVIDER_CONF: this.state.PREPROVIDER_CONF,
                      FILENAME: this.state.FILENAME,
                      oldPNFID: this.state.oldPNFID,
                      oldip: this.state.oldip,
                      oldport: this.state.oldport,
                      SSHKey: this.state.SSHKey,
                    });
                    const filtered = this.state.nodes.map((row: any) => {
                      if (row.PNFID === this.state.PNFID) {
                        return {
                          ...row,
                          ["DeviceType"]: this.state.DeviceType,
                          ["PNFID"]: this.state.PNFID,
                          ["IP_ADDRESS"]: this.state.IP_ADDRESS,
                          ["PORT_NUMBER"]: this.state.PORT_NUMBER,
                          ["USERNAME"]: this.state.USERNAME,
                          ["PASSWORD"]: this.state.PASSWORD,
                          ["PREPROVIDER_CONF"]: this.state.PREPROVIDER_CONF,
                          ["FILENAME"]: this.state.FILENAME,
                        };
                      }
                      return row;
                    });
                    this.setState({ nodes: filtered });
                  } 
                }}
                color="secondary"
              >
                {setting.updateButtonText}
              </Button>
            )}
            <Button onClick={this.onCancel} color="secondary">
              {setting.cancelButtonText}
            </Button>
            {this.props.mode ===
              EditpreproviderServerDialogMode.ImportpreproviderServer &&
              (preproviderService.importpreproviderServer,
              this.onApply({
                DeviceType: this.state.DeviceType,
                PNFID: this.state.PNFID,
                IP_ADDRESS: this.state.IP_ADDRESS,
                PORT_NUMBER: this.state.PORT_NUMBER,
                USERNAME: this.state.USERNAME,
                PASSWORD: this.state.PASSWORD,
                PREPROVIDER_CONF: this.state.PREPROVIDER_CONF,
                FILENAME: this.state.FILENAME,
                oldPNFID: this.state.oldPNFID,
                oldip: this.state.oldip,
                oldport: this.state.oldport,
                SSHKey: this.state.SSHKey,
              }))}
          </DialogActions>
        </Dialog>
      </>
    );
  }

  private onApply = (element: providerdata) => {
    this.props.onClose && this.props.onClose();
    switch (this.props.mode) {
      case EditpreproviderServerDialogMode.AddpreproviderServer:
        element && this.props.addpreproviderServer(element);
        break;
      case EditpreproviderServerDialogMode.EditpreproviderServer:
        element && this.props.updatepreproviderServer(element);
        break;
      case EditpreproviderServerDialogMode.RemovepreproviderServer:
        element && this.props.removepreproviderServer(element);
        break;
      case EditpreproviderServerDialogMode.ImportpreproviderServer:
        element && this.props.importpreproviderServer(element);
        break;
    }
  };

  static getDerivedStateFromProps(
    props: EditpreproviderServerDialogComponentProps,
    state: EditpreproviderServerDialogComponentState & {
      _initialpreproviderServer: providerdata;
    }
  ): EditpreproviderServerDialogComponentState & {
    _initialpreproviderServer: providerdata;
  } {
    if (props.preprovider !== state._initialpreproviderServer) {
      state = {
        ...state,
        ...props.preprovider,
        _initialpreproviderServer: props.preprovider,
      };
    }
    return state;
  }
}

export const EditpreproviderServerDialog = connect(
  undefined,
  mapDispatch
)(EditpreproviderServerDialogComponent);
export default EditpreproviderServerDialog;
