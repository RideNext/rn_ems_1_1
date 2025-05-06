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
import * as React from "react";
import * as $ from "jquery";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import {
  IDispatcher,
  connect,
  Connect,
} from "../../../../framework/src/flux/connect";

import {
  addAvaliableprofileServerAsyncActionCreator,
  removeAvaliableprofileServerAsyncActionCreator,
  updateAvaliableprofileServerAsyncActionCreator,
  downloadFileAvaliableprofileServerAsyncActionCreator,
} from "../actions/avaliableProfileServersActions";
import { profilesdata } from "../models/profileServer";
import {
  FormControl,
  IconButton,
  Input,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import axios from "axios";
import { WarningOutlined } from "@mui/icons-material";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
export enum EditprofileServerDialogMode {
  None = "none",
  AddprofileServer = "addprofileServer",
  EditprofileServer = "editprofileServer",
  RemoveprofileServer = "removeprofileServer",
  DownloadprofileServer = "downloadprofileServer",
}

const mapDispatch = (dispatcher: IDispatcher) => ({
  addprofileServer: (element: profilesdata) => {
    dispatcher.dispatch(addAvaliableprofileServerAsyncActionCreator(element));
  },
  updateprofileServer: (element: profilesdata) => {
    dispatcher.dispatch(
      updateAvaliableprofileServerAsyncActionCreator(element)
    );
  },
  removeprofileServer: (element: profilesdata) => {
    dispatcher.dispatch(
      removeAvaliableprofileServerAsyncActionCreator(element)
    );
  },
  downloadprofileServer: (element: profilesdata) => {
    dispatcher.dispatch(
      downloadFileAvaliableprofileServerAsyncActionCreator(element)
    );
  },
});

type DialogSettings = {
  dialogTitle: string;
  dialogDescription: string;
  applyButtonText: string;
  cancelButtonText: string;
  readonly: boolean;
  uploadvisible: boolean;
};

const settings: { [key: string]: DialogSettings } = {
  [EditprofileServerDialogMode.None]: {
    dialogTitle: "",
    dialogDescription: "",
    applyButtonText: "",
    cancelButtonText: "",
    readonly: true,
    uploadvisible: false,
  },
  [EditprofileServerDialogMode.AddprofileServer]: {
    dialogTitle: "Add profiles",
    dialogDescription: "",
    applyButtonText: "Save",
    cancelButtonText: "Cancel",
    readonly: false,
    uploadvisible: true,
  },
  [EditprofileServerDialogMode.EditprofileServer]: {
    dialogTitle: "Edit profiles",
    dialogDescription: "",
    applyButtonText: "Update",
    cancelButtonText: "Cancel",
    readonly: false,
    uploadvisible: true,
  },
  [EditprofileServerDialogMode.DownloadprofileServer]: {
    dialogTitle: "Download File",
    dialogDescription: "",
    applyButtonText: "Download",
    cancelButtonText: "Cancel",
    readonly: false,
    uploadvisible: true,
  },
  [EditprofileServerDialogMode.RemoveprofileServer]: {
    dialogTitle: "Delete profiles",
    dialogDescription: "Are you sure want to delete this Profile?",
    applyButtonText: "Delete",
    cancelButtonText: "Cancel",
    readonly: true,
    uploadvisible: false,
  },
};

type EditprofileServerDialogComponentProps = Connect<
  undefined,
  typeof mapDispatch
> & {
  mode: EditprofileServerDialogMode;
  profiles: profilesdata;
  onClose: () => void;
};

const urlRegex = RegExp("^https?://");

type EditprofileServerDialogComponentState = profilesdata & {
  fileerrorMessage: string;
  profileerrorMessage: string;
  SaveSucesopen: boolean;
  Sucessmsg: string;
  savedialogTitle: string;
  DeviceType: string;
  validdeviceType: boolean;
  oldfile:string;
  validprofile:boolean;
};

class EditprofileServerDialogComponent extends React.Component<
  EditprofileServerDialogComponentProps,
  EditprofileServerDialogComponentState
> {
  constructor(props: EditprofileServerDialogComponentProps) {
    super(props);

    this.state = {
      ...this.props.profiles,
      profileerrorMessage: "",
      fileerrorMessage: "",
      SaveSucesopen: false,
      Sucessmsg: "",
      savedialogTitle: "",
      DeviceType: "",
      validdeviceType:true,
      oldfile:"",
      validprofile:true
    };
  }

  areFieldsValid = () => {
    const profileName = this.state.ProfileName.trim();

    // Regular expression for validation
    const isValid = /^[a-zA-Z](?!.*[._-]{2})[a-zA-Z0-9._-]*[a-zA-Z0-9]$/.test(profileName);
    if(!isValid){
      this.setState({
       validprofile:false
      })
    }
    else{
      this.setState({
        validprofile:true
       })
    }
    return (
      this.state.ProfileName.trim().length > 0 &&
      this.state.ProfileName.trim().length > 0 && isValid &&
      this.state.FileName.trim().length > 0 && this.state.FileName.trim().endsWith('.xml') && this.state.DeviceType.trim().length > 0
    );
  };

  onFileChange = (event: any) => {
    // Update the state
    console.log("Selected" + event.target.files[0].name);
    const file = event.target.files[0].name
    this.setState({
      File: event.target.files[0],
      FileName: event.target.files[0].name,
    });
    if(!file.endsWith('.xml')){
      this.setState({fileerrorMessage : "Please select xml file"})
    }
  };
  public handleSaveSecessClose = (event: any, reason: string) => {
    event.preventDefault();
    event.stopPropagation();
    this.setState({ SaveSucesopen: false });
  };

  render(): JSX.Element {
    const setting = settings[this.props.mode];
    return (
      <>
        <Dialog
          open={this.props.mode !== EditprofileServerDialogMode.None}
          PaperProps={{
            style: {
              minHeight: "23vh",
              minWidth: "40vw",
              borderRadius: "5px",
              backgroundColor: "white",
            },
          }}
        >
          <DialogTitle id="form-dialog-title">
            {setting.dialogTitle}
          </DialogTitle>
          <DialogContent>
            {/* <TextField disabled spellCheck={false} autoFocus margin="dense" id="id" label="Id" type="text" fullWidth value={ this.state._id } onChange={(event)=>{ this.setState({_id: event.target.value}); } } /> */}
            {/* <TextField variant="standard" disabled={setting.readonly} spellCheck={false} margin="dense" id="ID" label="ID.." type="text" fullWidth value={this.state.id} onChange={(event) => { this.setState({ id: event.target.value }); }} /> */}
            {this.props.mode !==
              EditprofileServerDialogMode.DownloadprofileServer && (
<>
                <FormControl margin="dense" variant="standard" fullWidth>
              <InputLabel id="Device-type-label">
              Device Type *
              </InputLabel>
              <Select
                variant="standard"
                labelId="device-type-label"
                id="DeviceType"
                value={this.state.DeviceType}
                // onChange={this.handleChange}
                onChange={(event) => {
                  this.setState({ 
                    DeviceType: event.target.value,
                    validdeviceType: true
                  });    
                }}
                disabled={setting.readonly}
                error={!this.state.validdeviceType}
                sx={{ "&.MuiFormHelperText-root.Mui-error": { Color: "red" } }}
              >
                    <MenuItem value="gNodeB">gNodeB</MenuItem>
                    <MenuItem value="RRU">RRU</MenuItem>
              </Select>
              {this.state.validdeviceType ? null : (
                <Typography id="errorMessage" component={"div"} color="error">
                Please Select Device Type
              </Typography>
              )}
            </FormControl>
              <TextField
                variant="standard"
                disabled={setting.readonly}
                spellCheck={false}
                margin="dense"
                id="ProfileName"
                label="Profile Name *"
                type="text"
                fullWidth
                value={this.state.ProfileName}
                onChange={(event) => {
                  this.setState({ ProfileName: event.target.value });
                }}
              /></>
            )}
            {this.state.profileerrorMessage !== "" && (
              <Typography id="errorMessage" component={"div"} color="error">
                {this.state.profileerrorMessage}
              </Typography>
            )}
            {this.state.profileerrorMessage === "" && !this.state.validprofile && (
            <Typography id="errorMessage" component={"div"} color="error">
             "Invalid Profile Name. Only alphanumeric characters and '-', '_', '.' are allowed. Special characters cannot be at the start or end."
           
          </Typography>)}
            {/* <TextField variant="standard" disabled={setting.readonly} spellCheck={false} margin="dense" id="FilePath" label="File Path" type="text" fullWidth value={this.state.FilePath} onChange={(event) => { this.setState({ FilePath: event.target.value }); }} /> */}
            {/* <TextField variant="standard" disabled={setting.readonly} spellCheck={false} margin="dense" id="PNFID" label="PNFID" type="text" fullWidth value={this.state.PNFID} onChange={(event) => { this.setState({ PNFID: event.target.value }); }} /> */}
            {this.props.mode ===
              EditprofileServerDialogMode.DownloadprofileServer && (
              <TextField
                variant="standard"
                disabled={setting.readonly}
                spellCheck={false}
                margin="dense"
                id="FileName"
                label="File Name"
                type="text"
                fullWidth
                value={this.state.FileName}
                onChange={(event) => {
                  this.setState({ FileName: event.target.value });
                }}
              />
            )}
            {setting.uploadvisible &&
              this.props.mode !==
                EditprofileServerDialogMode.DownloadprofileServer && (
                <div>
                  <InputLabel
                    htmlFor="active"
                    style={{ marginTop: "2%", marginBottom: "2%" }}
                  >
                    Choose File *
                  </InputLabel>
                  <FormControl
                    variant="standard"
                    fullWidth
                    disabled={setting.readonly}
                  >
                    <input
                      type="file"
                      id="file"
                      onChange={(event) => {
                        this.onFileChange(event);
                      }}
                    />
                  </FormControl>
                </div>
              )}
            {this.state.fileerrorMessage !== "" && (
              <Typography id="errorMessage" component={"div"} color="error">
                {this.state.fileerrorMessage}
              </Typography>
            )}
          </DialogContent>
          <DialogActions>
            <Button
              onClick={(event) => {
                
                if (
                  this.props.mode ===
                  EditprofileServerDialogMode.DownloadprofileServer
                ) {
                this.state.FileName != "" &&  this.onDownload();
                }
                if (
                  this.props.mode ===
                  EditprofileServerDialogMode.AddprofileServer
                ) {
                  const storedData = sessionStorage.getItem("profiledata");
                  const ProfileName = this.state.ProfileName;

                  if (storedData) {
                    const parsedData = JSON.parse(storedData);
                    console.log(parsedData);

                    const duplicatenode = parsedData.find(
                      (node: any) => node.ProfileName === ProfileName
                    );
                    console.log(duplicatenode);

                    if (duplicatenode) {
                      this.setState({
                        SaveSucesopen: true,
                        Sucessmsg: "Duplicate Profile Name Found...",
                        savedialogTitle: "Warning",
                      });
                      this.onCancel();
                    } else if (this.areFieldsValid()) {
                      this.setState({
                        fileerrorMessage: "",
                        profileerrorMessage: "",
                        
                      });

                      // Call onApply with the current state data
                      this.onApply({
                        id: this.state.id,
                        File: this.state.File,
                        ProfileName: this.state.ProfileName,
                        FileName: this.state.FileName,
                        FilePath: this.state.FilePath,
                        PNFID: this.state.PNFID,
                        DeviceType: this.state.DeviceType,
                        oldfilename:""
                      });

                      // Clear form fields
                      this.setState({
                        File: "",
                        FileName: "",
                        ProfileName: "",
                        DeviceType:"",
                        validdeviceType: true,
                        validprofile:true
                      });
                    } else {
                      // Handle validation errors
                      let profileError =
                        this.state.ProfileName === ""
                          ? "Profile name is required."
                          : "";
                      let fileError =
                        this.state.FileName === ""
                          ? "Please choose a file to upload."
                          : this.state.FileName.endsWith('.xml') ? "" : "Please select xml file";

                      this.setState({
                        profileerrorMessage: profileError,
                        fileerrorMessage: fileError,
                        validdeviceType : this.state.DeviceType.trim().length > 0 ? true : false
                      });

                      if (profileError || fileError) {
                        console.log("Validation errors occurred.");
                      }
                    }
                  } else {
                    if(this.state.fileerrorMessage === "" && this.state.profileerrorMessage === "" && this.state.validdeviceType){
                      this.onApply({
                        id: this.state.id,
                        File: this.state.File,
                        ProfileName: this.state.ProfileName,
                        FileName: this.state.FileName,
                        FilePath: this.state.FilePath,
                        PNFID: this.state.PNFID,
                        DeviceType: this.state.DeviceType,
                        oldfilename:""
                      });
                    }
                  }
                } else {
                  if (
                    this.props.mode ===
                    EditprofileServerDialogMode.EditprofileServer
                  ) {
                    console.log(this.state.oldfilename, this.state.oldfile)
                    const storedData = sessionStorage.getItem("profiledata");
                    console.log(this.state.oldfile)
                    let profileError =
                        this.state.ProfileName === ""
                          ? "Profile name is required."
                          : "";
                      let fileError =
                        this.state.FileName === ""
                          ? "Please choose a file to upload."
                          : this.state.FileName.endsWith('.xml') ? "" : "Please select xml file";

                      this.setState({
                        profileerrorMessage: profileError,
                        fileerrorMessage: fileError,
                        validdeviceType : this.state.DeviceType.trim().length > 0 ? true : false
                      });
                    if (storedData) {
                      const parsedData = JSON.parse(storedData);
                      console.log(parsedData);
                      const duplicateprofile = parsedData.filter(
                        (mapped: any) =>
                          mapped.ProfileName === this.state.ProfileName
                      );
                      if (
                        duplicateprofile.length > 0 &&
                        this.state.id !== this.state.ProfileName
                      ) {
                        this.setState({ SaveSucesopen: true });
                        this.setState({
                          Sucessmsg: "Duplicate Profile Found",
                        });
                        this.setState({ savedialogTitle: "Warning" });
                        this.onCancel()
                      } else {
                        if(this.state.fileerrorMessage === "" && this.state.profileerrorMessage === "" && this.state.validdeviceType &&  this.areFieldsValid()){
                          this.onApply({
                            id: this.state.id,
                            File: this.state.File,
                            ProfileName: this.state.ProfileName,
                            FileName: this.state.FileName,
                            FilePath: this.state.FilePath,
                            PNFID: this.state.PNFID,
                            DeviceType: this.state.DeviceType,
                            oldfilename:this.state.oldfile
                          });
                        }
                      }
                    } else {
                      if(this.state.fileerrorMessage === "" && this.state.profileerrorMessage === "" && this.state.validdeviceType && this.areFieldsValid()){
                        this.onApply({
                          id: this.state.id,
                          File: this.state.File,
                          ProfileName: this.state.ProfileName,
                          FileName: this.state.FileName,
                          FilePath: this.state.FilePath,
                          PNFID: this.state.PNFID,
                          DeviceType: this.state.DeviceType,
                          oldfilename:this.state.oldfile
                        });
                      }
                    }
                  } else {
                    if(this.areFieldsValid()){
                    this.onApply({
                      id: this.state.id,
                      File: this.state.File,
                      ProfileName: this.state.ProfileName,
                      FileName: this.state.FileName,
                      FilePath: this.state.FilePath,
                      PNFID: this.state.PNFID,
                      DeviceType: this.state.DeviceType,
                      oldfilename:this.state.oldfile
                    });
                  }
                  }
                }

                event.preventDefault();
                event.stopPropagation();
                
              }}
              color="secondary"
            >
              {setting.applyButtonText}
            </Button>
            <Button
              onClick={(event) => {
                this.onCancel();
                this.setState({
                  fileerrorMessage: "",
                  profileerrorMessage: "",
                  DeviceType: "",
                  validdeviceType: true,
                  validprofile:true
                });
                event.preventDefault();
                event.stopPropagation();
              }}
              color="secondary"
            >
              {setting.cancelButtonText}
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={this.state.SaveSucesopen}
          onClose={this.handleSaveSecessClose}
          PaperProps={{
            style: {
              minHeight: "10vh",
              minWidth: "23vw",
              border: "14px solid #38456a",
              borderRadius: "15px",
              backgroundColor: "white",
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
                  <WarningOutlined style={{ color: "orange" }} />
                  <h6
                    style={{
                      marginLeft: "3px",
                      color: "orange",
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
              onClick={(event: any) => {
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
      </>
    );
  }

  
  public async componentDidUpdate(
    prevProps: EditprofileServerDialogComponentProps
  ) {
    // Check if rowdata has changed
    if(prevProps.profiles !== this.props.profiles){
      this.setState({
        oldfile: this.props.profiles ? this.props.profiles.FileName : ""
      });
      console.log("file names",this.props.profiles.FileName)
    }
  }


  private onApply = async (element: profilesdata) => {
    this.props.onClose && this.props.onClose();
    switch (this.props.mode) {
      case EditprofileServerDialogMode.AddprofileServer:
        element && this.props.addprofileServer(element);
        break;
      case EditprofileServerDialogMode.EditprofileServer:
        console.log("edit", element);
        element && this.props.updateprofileServer(element);
        break;
      case EditprofileServerDialogMode.RemoveprofileServer:
        element && this.props.removeprofileServer(element);
        break;
      
    }
  };

  private onCancel = () => {
    this.setState({
      ProfileName: "",
      File: "",
      FileName: "",
      fileerrorMessage: "",
      profileerrorMessage: "",
      DeviceType: "",
      validdeviceType: true,
      validprofile:true
    });
    this.props.onClose && this.props.onClose();
  };

  private onDownload = () => {
    // Perform the download action here
    this.props.downloadprofileServer({
      id: "",
      File: "",
      ProfileName: this.state.ProfileName,
      FileName: this.state.FileName,
      FilePath: "",
      PNFID: "",
      DeviceType: "",
      oldfilename:""
    });

    // Close the dialog after initiating the download
    this.props.onClose && this.props.onClose();
  };

  static getDerivedStateFromProps(
    props: EditprofileServerDialogComponentProps,
    state: EditprofileServerDialogComponentState & {
      _initialprofileServer: profilesdata;
    }
  ): EditprofileServerDialogComponentState & {
    _initialprofileServer: profilesdata;
  } {
    if (props.profiles !== state._initialprofileServer) {
      state = {
        ...state,
        ...props.profiles,
        _initialprofileServer: props.profiles,
      };
    }
    return state;
  }
}



export const EditprofileServerDialog = connect(
  undefined,
  mapDispatch
)(EditprofileServerDialogComponent);
export default EditprofileServerDialog;
