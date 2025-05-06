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
import React from "react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Autocomplete from '@mui/lab/Autocomplete';
import {
  connect,
  Connect,
  IDispatcher,
} from "../../../../framework/src/flux/connect";

import { removeWebUriAction } from "../actions/commonNetworkElementsActions";
import {
  mountNetworkElementAsyncActionCreator,
  unmountNetworkElementAsyncActionCreator,
} from "../actions/mountedNetworkElementsActions";
import {
  addNewNetworkElementAsyncActionCreator,
  editNetworkElementAsyncActionCreator,
  removeNetworkElementAsyncActionCreator,
} from "../actions/networkElementsActions";
import { loadAllTlsKeyListAsync } from "../actions/tlsKeyActions";
import {
  NetworkElementConnection,
  propertyOf,
  UpdateNetworkElement,
} from "../models/networkElementConnection";
import axios from "axios";
import { FormHelperText, IconButton } from "@mui/material";
import { WarningOutlined } from "@mui/icons-material";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
const baseUri= `${ window.location.origin }`;

export enum EditNetworkElementDialogMode {
  None = "none",
  EditNetworkElement = "editNetworkElement",
  RemoveNetworkElement = "removeNetworkElement",
  AddNewNetworkElement = "addNewNetworkElement",
  MountNetworkElement = "mountNetworkElement",
  UnmountNetworkElement = "unmountNetworkElement",
  UploadDevidceLogs = "uploaddevidcelogs",
}

const mapDispatch = (dispatcher: IDispatcher) => ({
  addNewNetworkElement: async (element: NetworkElementConnection) => {
    await dispatcher.dispatch(addNewNetworkElementAsyncActionCreator(element));
    await dispatcher.dispatch(mountNetworkElementAsyncActionCreator(element));
  },
  mountNetworkElement: (element: NetworkElementConnection) =>
    dispatcher.dispatch(mountNetworkElementAsyncActionCreator(element)),
  unmountNetworkElement: async (element: NetworkElementConnection) => {
    dispatcher.dispatch(
      unmountNetworkElementAsyncActionCreator(element && element.nodeId)
    );
   
    try{
      const updateResponse = await axios.post(`${baseUri}/cell_status/_update/${element.nodeId}`, {
        script: {
          source: `
            for (int i = 0; i < ctx._source.cellStatusdata.size(); i++) {
              ctx._source.cellStatusdata[i].cellstatus = 'unknown';
            }
          `,
          lang: 'painless'
        }
      });
    }catch(Error){}
 
  },
  editNetworkElement: async (
    element: UpdateNetworkElement,
    mountElement: NetworkElementConnection
  ) => {
    const values = Object.keys(element);
    //make sure properties are there in case they get renamed
    const idProperty = propertyOf<UpdateNetworkElement>("id");
    const isRequiredProperty = propertyOf<UpdateNetworkElement>("isRequired");
    if (
      values.length === 2 &&
      values.includes(idProperty as string) &&
      values.includes(isRequiredProperty as string)
    ) {
      // do not mount network element/node, if only isRequired is changed
      await dispatcher.dispatch(editNetworkElementAsyncActionCreator(element));
    } else if (
      !(values.length === 1 && values.includes(idProperty as string))
    ) {
      //do not edit or mount network element/node , if only id was saved into object (no changes made!)
      await dispatcher.dispatch(editNetworkElementAsyncActionCreator(element));
      await dispatcher.dispatch(
        mountNetworkElementAsyncActionCreator(mountElement)
      );
    }
  },
  removeNetworkElement: async (element: UpdateNetworkElement) => {
    await dispatcher.dispatch(removeNetworkElementAsyncActionCreator(element));
    dispatcher.dispatch(removeWebUriAction(element.id));
    try{
      const deleteResponse = await axios.delete(`${baseUri}/cell_status/_doc/${element.id}`);
    }catch(Error){}
  },
  // uploadDeviceLogs: async (element: UpdateNetworkElement) => {
  //   try{
  //     // input {
  //     //   "remote-file-path": "", //sftp://<username>@<host>[:port]/path"
  //     //   "password": {
  //     //           "password": ""
  //     //   },
  //     //   sector-id: "",
  //     //   transaction-id: "",
  //     //   log-type: "",
  //     //   RRH-log-partition-type: ""	
  //     // }
  //     const transactionId = Math.floor(1000+Math.random() * 9000)
  //     const baseUri = `${window.location.origin}`;
  //     const sectorId = element.sectorID? element.sectorID : 1
  //     const payload = {
  //            "o-ran-file-management:input" :
  //            { 
  //               "remote-file-path": element.sftpurl ,
  //               "password": {"password": element.ftpPassword  },
  //               "sector-id":   element.sectorID ,
  //               "transaction-id": transactionId ,
  //               "log-type": element.LogType ,
  //               "RRH-log-partition-type": element.rrhlogType 
  //             }
  //        }
  //     console.log("Upload RRH Logs payload  :   " + JSON.stringify(payload) )
  //     //alert("Upload Device Logs payload  :   " + JSON.stringify(payload));
  //     const uri = baseUri +`/rests/operations/network-topology:network-topology/topology=topology-netconf/node=${element.id}/yang-ext:mount/o-ran-file-management:file-upload`;
  //     try {
  //       const response = await axios.post(uri, payload, {
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //       });
  //       const result = await response;
  //      // const response = await axios.post(uri, payload);
  //       console.log(response?.data);
  //       return true;
  //     } catch (error) {
  //       console.log("Upload RRH Logs Error  :   " + error?.message)
  //       return false;
  //     }   
  //   }catch(Error){
  //     return false;
  //   }
  // },
  getAvailableTlsKeys: async () =>
    dispatcher.dispatch(loadAllTlsKeyListAsync()),
});

type DialogSettings = {
  dialogTitle: string;
  dialogDescription: string;
  applyButtonText: string;
  cancelButtonText: string;
  enableMountIdEditor: boolean;
  enableUsernameEditor: boolean;
  enableExtendedEditor: boolean;
};

const settings: { [key: string]: DialogSettings } = {
  [EditNetworkElementDialogMode.None]: {
    dialogTitle: "",
    dialogDescription: "",
    applyButtonText: "",
    cancelButtonText: "",
    enableMountIdEditor: false,
    enableUsernameEditor: false,
    enableExtendedEditor: false,
  },

  [EditNetworkElementDialogMode.AddNewNetworkElement]: {
    dialogTitle: "Add New Node",
    dialogDescription: "Add this new node:",
    applyButtonText: "Add node",
    cancelButtonText: "Cancel",
    enableMountIdEditor: true,
    enableUsernameEditor: true,
    enableExtendedEditor: true,
  },
  [EditNetworkElementDialogMode.MountNetworkElement]: {
    dialogTitle: "Connect Node",
    dialogDescription: "Connect this node:",
    applyButtonText: "Connect node",
    cancelButtonText: "Cancel",
    enableMountIdEditor: false,
    enableUsernameEditor: false,
    enableExtendedEditor: false,
  },
  [EditNetworkElementDialogMode.UnmountNetworkElement]: {
    dialogTitle: "Disconnect Node",
    dialogDescription: "Disconnect this node:",
    applyButtonText: "Disconnect node",
    cancelButtonText: "Cancel",
    enableMountIdEditor: false,
    enableUsernameEditor: false,
    enableExtendedEditor: false,
  },
  [EditNetworkElementDialogMode.EditNetworkElement]: {
    dialogTitle: "Modify Node",
    dialogDescription: "Modify this node",
    applyButtonText: "Modify",
    cancelButtonText: "Cancel",
    enableMountIdEditor: false,
    enableUsernameEditor: true,
    enableExtendedEditor: false,
  },
  [EditNetworkElementDialogMode.RemoveNetworkElement]: {
    dialogTitle: "Remove Node",
    dialogDescription: "Do you really want to remove this node?",
    applyButtonText: "Remove node",
    cancelButtonText: "Cancel",
    enableMountIdEditor: false,
    enableUsernameEditor: false,
    enableExtendedEditor: false,
  },
  [EditNetworkElementDialogMode.UploadDevidceLogs]: {
    dialogTitle: "Upload RRH Logs",
    dialogDescription: "",
    applyButtonText: "Upload Logs",
    cancelButtonText: "Cancel",
    enableMountIdEditor: false,
    enableUsernameEditor: false, 
    enableExtendedEditor: false,
  },
};

type EditNetworkElementDialogComponentProps = Connect<
  undefined,
  typeof mapDispatch
> & {
  mode: EditNetworkElementDialogMode;
  initialNetworkElement: NetworkElementConnection;
  onClose: () => void;
  radioChecked: string;
};

type EditNetworkElementDialogComponentState = NetworkElementConnection & {
  isNameValid: boolean;
  isHostSet: boolean;
  isPasswordSelected: boolean;
  isTlsSelected: boolean;
  radioSelected: string;
  showPasswordTextField: boolean;
  showTlsDropdown: boolean;
  pfiles: string | undefined;

  pnfid: string[];
  ip_address: string[];
  port_number: number[];
  preprovider_files: string[];
  username:string|undefined ;
  password:string|undefined;
  uname:string|undefined;
  pwd:string|undefined;
  SaveSucesopen: boolean;
  Sucessmsg: any;
  savedialogTitle: any;
  duplicatenode:boolean;
  ftplogs: any[]; 
  rrhIdlist: any[];  
  sftpurl :any; 
  rrhlogType: any;
  LogType:any;
  sectorID :any ;
  ftpPassword:any;
  ftpServerName:any;

  validaterrhlogType: boolean;
  validateLogType:boolean;
  validatesectorID :boolean ;
  validateftpServerName:boolean;


};

class EditNetworkElementDialogComponent extends React.Component<EditNetworkElementDialogComponentProps,EditNetworkElementDialogComponentState> {
  constructor(props: EditNetworkElementDialogComponentProps) {
    super(props);
    this.handleRadioChange = this.handleRadioChange.bind(this);
    //this.handlePfileChange = this.handlePfileChange.bind(this);
    // Initialization of state is partly overwritten by update via react getDerivedStateFromProps() below.
    // Change initialization values in parent "networkElements.tsx" in "const emptyRequireNetworkElement"
    this.state = {
      nodeId: this.props.initialNetworkElement.nodeId,
      isRequired: this.props.initialNetworkElement.isRequired,
      host: this.props.initialNetworkElement.host,
      port: this.props.initialNetworkElement.port,

      isNameValid: true,
      isHostSet: true,
      isPasswordSelected: true,
      isTlsSelected: false,
      radioSelected: "",
      showPasswordTextField: true,
      showTlsDropdown: false,
      pfiles:this.props.initialNetworkElement.Pfile || "",
      pnfid: [],
      ip_address: [],
      port_number: [],
      preprovider_files: [],
       username:"",
      password:"",
      uname:"",
      pwd:"",
      SaveSucesopen: false,
      Sucessmsg: "",
      savedialogTitle: "",
      duplicatenode:false,
      ftplogs: [],
      rrhIdlist:[],
      sftpurl : "",
      rrhlogType: "",
      LogType:"",
      sectorID :"" ,
      ftpPassword:"",
      ftpServerName:"",

      validaterrhlogType: true,
      validateLogType:true,
      validatesectorID :true ,
      validateftpServerName:true,
    };
  }

  private saveEventAuditLog = (evt: any, nodeId: any, userName: any) => {
    const userToken = localStorage.getItem('userToken') || '';
  
    let parsedToken;
    try {
      parsedToken = userToken ? JSON.parse(userToken) : null;
    } catch (error) {
      console.error("Invalid token format:", error);
    }
  
    const usernameFromToken = parsedToken && parsedToken.username ? parsedToken.username : userName;
    const baseuri = window.location.origin;
    axios.post(baseuri + "/auditlog/_doc", {
      "nodeId": nodeId,
      "user": usernameFromToken,
      "event": evt,
      "timestamp": new Date().toISOString(),
       
    })
    .then(response => {
      console.log("Audit log saved successfully:", response.data);
    })
    .catch(error => {
      console.error("Error saving audit log:", error);
    });
  };

  public handleRadioChange = (event: any) => {
    this.setState({
      radioSelected: event.target.value,
      showPasswordTextField: event.target.value === "password",
      showTlsDropdown: event.target.value === "tlsKey",
    });
  };
  handleSaveSecessClose = (event: any, reason: string) => {
    event.preventDefault();
    event.stopPropagation();
    this.setState({ SaveSucesopen: false });
  };
   AddnewSystemConfigData = (
    FTP_SERVER_NAME: string,
    FTP_SERVER_TYPE: string,
    FTP_SERVER_IP: string,
    PROTOCOL_TYPE: string,
    FTP_FILE_PATH: string,
    USERNAME: string,
    PASSWORD: string
  ) => ({
    id: `${FTP_SERVER_IP}:${FTP_FILE_PATH.replace(/\//g, '-')}`,
    FTP_SERVER_NAME,
    FTP_SERVER_TYPE,
    FTP_SERVER_IP,
    PROTOCOL_TYPE,
    FTP_FILE_PATH,
    USERNAME,
    PASSWORD,
  });

   fetchFTPConfigData = () => {
      const baseUri = `${window.location.origin}`;
      const DbPath = baseUri + "/system_config/_search/";
      const query = {
        "query": {
          "match": {
            "FTP_SERVER_TYPE": "DeviceLogs",
          }
        }
      }

      
  const ftpConfigRows: any[] = [];
     axios.post(DbPath,query)
        .then((res: any) => {
          const systemconfigdata = res.data.hits.hits.map((row: any) => {
            return row._source;
          });
          //console.log(systemconfigdata);
         // setsystemdata(systemdata);
          systemconfigdata.map((row: any) => {
            return ftpConfigRows.push(
              this.AddnewSystemConfigData(
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
          this.setState({ftplogs : ftpConfigRows});
          const port =  ftpConfigRows[0].PROTOCOL_TYPE=="ftp" ? "21/":"22/"
          if(ftpConfigRows.length == 1)
          {
            this.setState({ftpServerName : ftpConfigRows[0].FTP_SERVER_NAME})
           // const ftpurl="sftp://"+ ftpConfigRows[0].USERNAME+"@"+ ftpConfigRows[0].FTP_SERVER_IP+":22/"+ ftpConfigRows[0].FTP_FILE_PATH;
           const ftpurl=ftpConfigRows[0].PROTOCOL_TYPE+"://"+ ftpConfigRows[0].USERNAME+"@"+ ftpConfigRows[0].FTP_SERVER_IP+":"+ port+ ftpConfigRows[0].FTP_FILE_PATH;
           this.setState({ftpPassword: ftpConfigRows[0].PASSWORD})
            this.setState({sftpurl:ftpurl})
          }

        })
        .catch(
          (err: {
            response: { data: { error: { type: string } } };
            message: any;
          }) => {
            console.log(err);
          }
        );
    };


     fetchCellConfigData = (nodeId: any) => {
      const baseUri = `${window.location.origin}`;
      const DbPath = baseUri + "/cell_config/_doc/" + nodeId;
      axios.get(DbPath).then((res: any) => {
       var  cellConfigdata = res.data._source.cellConfigdata;
       //console.log("cellConfigdata",cellConfigdata);
        //setcellConfigdata(cellConfigdata);
        var rrhlist :any=[];
        cellConfigdata.map((cell:any,index:number)=>{
          rrhlist.push(cell.RRHList[0]?.id)
      })
      this.setState({rrhIdlist : rrhlist})
      }).catch((err: { response: { data: { error: { type: string; }; }; }; message: any; }) => {
        console.log(err);
      })
    }
  // public handlePfileChange = (event: any) => {
  //   this.setState({
  //     Pfile: event.target.value,
  //   });
  // };

  public handleNodeIDChange = async(event: any) => {
    const selectedNodeId = event;
    const baseuri = window.location.origin
    try{
      const response = await axios.get(baseuri+'/networkelement-connection-v7/_doc/'+selectedNodeId)
      
      if(response?.data){
        this.setState({duplicatenode:true})
      }
      
      else{
        this.setState({duplicatenode:false})
      }
    }
    catch(Error){
       this.setState({duplicatenode:false})
    }
    // Find the corresponding host and port based on the selected Node ID
    const { pnfid, ip_address, port_number, preprovider_files ,uname,pwd} = this.state;
    const selectedIndex = pnfid.indexOf(selectedNodeId);
    const selectedHost = selectedIndex !== -1 ? ip_address[selectedIndex] : "";
    const selectedPort = selectedIndex !== -1 ? port_number[selectedIndex] : 0;
   // const selectedPreprovider_files = selectedIndex !== -1 ? preprovider_files[selectedIndex] : "";
     const selectedPreprovider_files =
      selectedIndex !== -1 ? preprovider_files[selectedIndex] : "";
      
    const selectedusername=selectedIndex !==-1 ? uname && uname[selectedIndex] : "";
    const selectedpassword=selectedIndex !==-1 ? pwd && pwd[selectedIndex] : "";
    this.setState({
      nodeId: selectedNodeId,
      host: selectedHost,
      port: selectedPort,
      //pfiles: [selectedPreprovider_files],
      pfiles: selectedPreprovider_files,
      username:selectedusername,
      password: selectedpassword
    });
  };
  
  handleFtpServerNamechange = (e: SelectChangeEvent<string>) => {
    const value = e.target.value;
    this.setState({ftpServerName:value})
    const FtpServers=this.state.ftplogs;
    const FtpServer =FtpServers.find(item => item.FTP_SERVER_NAME===value);
    const port =FtpServer.PROTOCOL_TYPE=="ftp"? "21/":"22/"
    const ftpurl=FtpServer.PROTOCOL_TYPE+"://"+FtpServer.USERNAME+"@"+FtpServer.FTP_SERVER_IP+":"+port+FtpServer.FTP_FILE_PATH;
    // sftp://<username>@<host>[:port]/path";
    this.setState({ftpPassword:FtpServer.PASSWORD})
    this.setState({sftpurl:ftpurl})
    if( e.target.value!="")
      this.setState({validateftpServerName:true})
    //alert("FtpServer.PASSWORD : " +FtpServer.PASSWORD);
  };
  rrhlogTypeChange = (e: SelectChangeEvent<string>) => {
    const value = e.target.value;
    this.setState({rrhlogType:value})
    if( e.target.value!="")
      this.setState({validaterrhlogType:true})
  };

  handleLogTypeChange = (e: SelectChangeEvent<string>) => {
    const value = e.target.value;
    this.setState({LogType:value})
    if( e.target.value!="")
      this.setState({validateLogType:true})
  };

  handleSectorIDChange = (e : any) => {
    const value = e.target.value;
    this.setState({sectorID:value})
    if( e.target.value!="")
    this.setState({validatesectorID:true})
  };

  handleDropdownOpen = async() => {
    const baseuri = window.location.origin;
    this.setState({
      pnfid:[],
      ip_address:[],
      port_number:[],
      preprovider_files:[],
      uname:"",
      pwd:""
    });
    let count = 10;
    try{
      await axios.get(baseuri+'/pre_provider/_count').then((res:any)=>{
        count = res.data.count;
      })
    }catch(Error){}
    try{
      const response = await axios.get(baseuri + '/pre_provider/_search?size='+count)
      
          // Separate the fields into arrays for each state field
          const pnfid =response.data.hits.hits.map((item: any) => item._source.PNFID);
          const ip_address = response.data.hits.hits.map((item: any) => item._source.IP_ADDRESS);
          const port_number = response.data.hits.hits.map((item: any) => item._source.PORT_NUMBER);
          const username = response.data.hits.hits.map((item: any) => item._source.USERNAME);
          const password = response.data.hits.hits.map((item: any) => item._source.PASSWORD);
          const preprovider_files = response.data.hits.hits.map((item: any) => item._source.PREPROVIDER_CONF);
          
          // Set the state with the extracted arrays
          this.setState({
            pnfid,
            ip_address,
            port_number,
            preprovider_files,
            uname:username,
            pwd:password
          });
      
          
    }catch(Error){

    }

  };

  render(): JSX.Element {
    
    const setting = settings[this.props.mode];
    const { pnfid, ip_address, port_number, preprovider_files } = this.state;
    let { showPasswordTextField, showTlsDropdown, radioSelected } = this.state;
    // this.fetchCellConfigData(this.state.id);
    //  const FtpServerNames=this.state.ftplogs;
    //  const SectorIdList=this.state.rrhIdlist;

    // const LogTypeOptions = [
    //   { value: '', label: 'Select' },
    //   { value: 'GNB-LOG', label: 'GNB LOG' },
    //   { value: 'GNB-Config', label: 'GNB Config' },
    //   { value: 'GNB-ConfigLog', label: 'GNB ConfigLog' },

    //   { value: 'GNB-CU-LOG', label: 'GNB CU LOG' },
    //   { value: 'GNB-DU-LOG', label: 'GNB DU LOG' },
    //   { value: 'RRH-LOG', label: 'RRH LOG' },

    //   { value: 'O-RAN-RU-LOG', label: 'O RAN RU LOG' },
    //   { value: 'GNB-L1-LOG', label: 'GNB L1 LOG' },
     
    // ];

    // const RRHlogpartitiontype = [
    //   { value: '', label: 'Select' },
    //   { value: 'WORK_PARTITION_LOGS', label: 'WORK_PARTITION_LOGS' },
    //   { value: 'RECOVERY_PARTITION_LOGS', label: 'RECOVERY_PARTITION_LOGS' },
    //   { value: 'BOTH_PARTITION_LOGS', label: 'BOTH_PARTITION_LOGS' },
    // ];

    radioSelected =
      this.state.radioSelected.length > 0
        ? this.state.radioSelected
        : this.props.radioChecked;

    if (radioSelected === "password") {
      radioSelected = "password";
      showPasswordTextField = true;
      showTlsDropdown = false;
    } else if (radioSelected === "tlsKey") {
      radioSelected = "tlsKey";
      showPasswordTextField = false;
      showTlsDropdown = true;
    }

    let tlsKeysList = this.props.state.connect.availableTlsKeys
      ? this.props.state.connect.availableTlsKeys.tlsKeysList
        ? this.props.state.connect.availableTlsKeys.tlsKeysList
        : []
      : [];
    let pfileList = [];
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
      <Dialog open={this.props.mode !== EditNetworkElementDialogMode.None && this.props.mode !== EditNetworkElementDialogMode.UploadDevidceLogs}>
        <DialogTitle
          id="form-dialog-title"
          aria-label={`${setting.dialogTitle
            .replace(/ /g, "-")
            .toLowerCase()}-dialog`}
        >
          {setting.dialogTitle}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>{setting.dialogDescription}</DialogContentText>
          <FormControl
            variant="standard"
            disabled={!setting.enableMountIdEditor}
            fullWidth
            margin="dense"
          >
            <InputLabel id="node-id-label"></InputLabel>
        <Autocomplete
          id="node-id-select"
          options={pnfid}
          getOptionLabel={(option) => option}
          value={this.state.nodeId}
          onChange={(event, newValue) => this.handleNodeIDChange(newValue)}
          onOpen={this.handleDropdownOpen}
          disabled={this.props.mode === EditNetworkElementDialogMode.AddNewNetworkElement ? false : true}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Node ID"
              variant="standard"
              fullWidth
            />
          )}
        />
          </FormControl>
          <TextField
            variant="standard"
            disabled={!setting.enableMountIdEditor}
            fullWidth
            margin="dense"
            id="host"
            label="Host/IP Address"
            value={this.state.host}
            InputProps={{
              readOnly: false,
            }}
          />
          <TextField
            variant="standard"
            disabled={!setting.enableMountIdEditor}
            spellCheck={false}
            id="port"
            margin="dense"
            label="NETCONF Port"
            fullWidth
            value={this.state.port}
            InputProps={{
              readOnly: false,
            }}
          />

          {(setting.enableUsernameEditor && (
            <TextField
              variant="standard"
              disabled={!setting.enableUsernameEditor}
              spellCheck={false}
              margin="dense"
              id="username"
              label="Username"
              aria-label="username"
              type="text"
              fullWidth
              value={this.state.username}
            />
          )) ||
            null}

          {(setting.enableUsernameEditor && (
            <RadioGroup
              row
              aria-label="password-tls-key"
              name="password-tls-key"
              value={radioSelected}
              onChange={this.handleRadioChange}
            >
              <FormControlLabel
                aria-label="passwordSelection"
                value="password"
                control={<Radio color="secondary" />}
                label="Password"
                onChange={this.onRadioSelect}
              />
              <FormControlLabel
                aria-label="tlsKeySelection"
                value="tlsKey"
                control={<Radio color="secondary" />}
                label="TlsKey"
                onChange={this.onRadioSelect}
              />
            </RadioGroup>
          )) ||
            null}

          {(setting.enableUsernameEditor && showPasswordTextField && (
            <TextField
              variant="standard"
              disabled={!setting.enableUsernameEditor || !showPasswordTextField}
              spellCheck={false}
              margin="dense"
              id="password"
              aria-label="password"
              type="password"
              fullWidth
              value={this.state.password}
            />
          )) ||
            null}

          <FormControl
            variant="standard"
            fullWidth
            disabled={!setting.enableUsernameEditor}
          >
            {setting.enableUsernameEditor && showTlsDropdown && (
              <div>
                <InputLabel htmlFor="pass">--Select tls-key--</InputLabel>
                <Select
                  variant="standard"
                  disabled={!setting.enableUsernameEditor || !showTlsDropdown}
                  id="tlsKey"
                  aria-label="tlsKey"
                  value={this.state.tlsKey}
                  fullWidth // displayEmpty
                  onChange={(event) => {
                    this.setState({ tlsKey: event.target.value as any });
                  }}
                  inputProps={{ name: "tlsKey", id: "tlsKey" }}
                >
                  <MenuItem value={""} disabled>
                    --Select tls-key--
                  </MenuItem>
                  {tlsKeysList.map((tlsKey) => (
                    <MenuItem
                      value={tlsKey.key}
                      key={tlsKey.key}
                      aria-label={tlsKey.key}
                    >
                      {tlsKey.key}
                    </MenuItem>
                  ))}
                </Select>
              </div>
            )}
          </FormControl>

          <TextField
            variant="standard"
            disabled={!setting.enableMountIdEditor}
            spellCheck={false}
            id="preprovider-conf"
            label="Config Profile"
            fullWidth
            //value={Array.isArray(this.state.pfiles) ? this.state.pfiles.join(", ") : ""}
            value={this.state.pfiles}
            margin="dense"            
            InputProps={{
              readOnly: false,
            }}
          />
         
        </DialogContent>
        <DialogActions>
          <Button
            aria-label="dialog-confirm-button"
            onClick={(event: any) => {       
              this.saveEventAuditLog(setting.applyButtonText,this.state.nodeId,"");      
              if (this.areRequieredFieldsValid()) {
                if(this.state.duplicatenode){
                  
                  this.setState({SaveSucesopen:true,Sucessmsg:"Duplicate Node Found",savedialogTitle:"Warning"})
                }else{
                this.onApply({
                  isRequired: this.state.isRequired,
                  id: this.state.nodeId,
                  nodeId: this.state.nodeId,
                  host: this.state.host,
                  port: this.state.port,
                  username: this.state.username,
                  password: this.state.password,
                  tlsKey: this.state.tlsKey,
                  //Pfile: this.state.Pfile,
                });
                this.setState({SaveSucesopen:false,Sucessmsg:"",savedialogTitle:"",duplicatenode:false})
              }
                this.setState({
                  id: "",
                  nodeId: "",
                  host: "",
                  username: "",
                  password: "",
                  tlsKey: "",
                  Pfile: "",
                  pfiles:"",
                  port:0
                })
              }
              event.preventDefault();
              event.stopPropagation();
            }}
            color="inherit"
          >
            {" "}
            {setting.applyButtonText}{" "}
          </Button>
          <Button
            aria-label="dialog-cancel-button"
            onClick={(event) => {
              this.setState({
                id: "",
                nodeId: "",
                host: "",
                username: "",
                password: "",
                tlsKey: "",
                Pfile: "",
                pfiles:"",
                port:0
              })
              this.onCancel();
              event.preventDefault();
              event.stopPropagation();
            }}
            color="secondary"
          >
            {" "}
            {setting.cancelButtonText}{" "}
          </Button>
        </DialogActions>
      </Dialog>

      {/* UploadDevidceLogs Dialog */}
      {/* <Dialog open={this.props.mode === EditNetworkElementDialogMode.UploadDevidceLogs}
          maxWidth="sm"
          fullWidth >
        <DialogTitle
          id="form-dialog-title"
          aria-label={`${setting.dialogTitle
            .replace(/ /g, "-")
            .toLowerCase()}-dialog`}
        >
          {setting.dialogTitle}
        </DialogTitle>
        <DialogContent sx={{margin:2}}> 
        <DialogContentText>{setting.dialogDescription}</DialogContentText>
        <TextField  label="Node ID"  variant="standard"  fullWidth margin="dense"  value={this.state.nodeId}  disabled />
        <FormControl variant="standard" fullWidth >
        <InputLabel id="ftpserverlabel">FTP Server Name</InputLabel>
        <Select
          labelId="ftpserverlabel"
          id="ftpservername"
          value={ this.state.ftpServerName }
          onChange={this.handleFtpServerNamechange}
          label="FTP Server Name">
          {FtpServerNames?.map(option => (
          <MenuItem key={option.FTP_SERVER_NAME} value={option.FTP_SERVER_NAME}>{option.FTP_SERVER_NAME}</MenuItem>
        ))}
        </Select>
        <FormHelperText error  sx={{ "&.Mui-error": { color: "#d32f2f" } }}>{this.state.validateftpServerName ? "" : "Please Select the FTP Server Name"}</FormHelperText>
       </FormControl>

        <FormControl variant="standard" fullWidth >
        <InputLabel id="sectoridlabel">Sector ID</InputLabel>
        <Select
          labelId="sectoridlabel"
          id="sectoridlabel"
          onChange={(event: any) => {
            this.handleSectorIDChange(event);
          }}
          margin="dense"
          label="Sector ID">
          {SectorIdList?.map(id => (
         <MenuItem key={id} value={id}>{id}</MenuItem>
        ))}
        </Select>
        <FormHelperText error  sx={{ "&.Mui-error": { color: "#d32f2f" } }}>{this.state.validatesectorID ? "" : "Please Select the Sector ID"}</FormHelperText>
        </FormControl>

        <FormControl variant="standard" fullWidth >
        <InputLabel id="logtypelabel">Log Type</InputLabel>
        <Select
          labelId="logtypelabel"
          id="logtypelabel"
          onChange={this.handleLogTypeChange}
          margin="dense"
          label="Log Type">
          {LogTypeOptions?.map(option => (
          <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
        ))}
        </Select>
        <FormHelperText error  sx={{ "&.Mui-error": { color: "#d32f2f" } }}>{this.state.validateLogType ? "" : "Please Select the Log Type"}</FormHelperText>
        </FormControl>
        <FormControl variant="standard" fullWidth >
        <InputLabel id="rrhlogtypelabel">RRH Log Partition Type</InputLabel>
        <Select
          labelId="rrhlogtypelabel"
          id="rrhlogtypelabel"
          onChange={this.rrhlogTypeChange}
          margin="dense"
          label="RRH Log Partition Type">
          {RRHlogpartitiontype?.map(option => (
          <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
        ))}
        </Select>
        <FormHelperText error  sx={{ "&.Mui-error": { color: "#d32f2f" } }}>{this.state.validaterrhlogType ? "" : "Please Select the RRH Log Partition Type"}</FormHelperText>
        </FormControl>

        </DialogContent>
        <DialogActions>
          <Button
            aria-label="dialog-confirm-button"
            onClick={(event: any) => {       
              this.saveEventAuditLog(setting.applyButtonText,this.state.nodeId,"");      
              if (this.areRequieredFieldsUploadLogsValid()) {
                this.onApply({
                  isRequired: this.state.isRequired,
                  id: this.state.nodeId,
                  nodeId: this.state.nodeId,
                  host: this.state.host,
                  port: this.state.port,
                  username: this.state.username,
                  password: this.state.password,
                  tlsKey: this.state.tlsKey,
                  //Pfile: this.state.Pfile,
                });
                this.setState({SaveSucesopen:false,Sucessmsg:"",savedialogTitle:"",duplicatenode:false})
              
                this.setState({
                  id: "",
                  nodeId: "",
                  host: "",
                  username: "",
                  password: "",
                  tlsKey: "",
                  Pfile: "",
                  pfiles:"",
                  port:0
                })
              }
              event.preventDefault();
              event.stopPropagation();
            }}
            color="inherit"
          >
            {" "}
            {setting.applyButtonText}{" "}
          </Button>
          <Button
            aria-label="dialog-cancel-button"
            onClick={(event) => {
              this.setState({
                id: "",
                nodeId: "",
                host: "",
                username: "",
                password: "",
                tlsKey: "",
                Pfile: "",
                pfiles:"",
                port:0
              })
              this.onCancel();
              event.preventDefault();
              event.stopPropagation();
            }}
            color="secondary"
          >
            {" "}
            {setting.cancelButtonText}{" "}
          </Button>
        </DialogActions>
      </Dialog> */}
      </>
    );
  }

  public renderTlsKeys = () => {
    try {
      this.props.getAvailableTlsKeys();
    } catch (err) {
      console.log(err);
    }
  };

  // public renderpFiles = () => {
  //   var fetchResult;
  //   const baseUri = `${window.location.origin}`;
  //   const uri = baseUri + "/profilemanagement/_search";
  //   fetchResult = axios
  //     .get(uri)
  //     .then((res) => {
  //       console.log(res);
  //       this.setState({
  //         pfiles: res.data.hits.hits,
  //       });
  //       //respose=res;
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       return {
  //         status: 404,
  //         message: (err && err.message) || String(err),
  //         data: undefined,
  //       };
  //     });
  // };

  async componentDidMount() {
    this.renderTlsKeys();
    this.fetchFTPConfigData();
   // this.fetchCellConfigData(this.state.nodeId);
    
   // this.renderpFiles();
    // const { pnfid, ip_address, port_number, preprovider_files,uname,pwd  } =
    //   await this.fetchPNFIDsAndIPAndPortFromElasticsearch();
    // this.setState({ pnfid, ip_address, port_number,preprovider_files,uname,pwd  });
  }

  // async fetchPNFIDsAndIPAndPortFromElasticsearch(): Promise<{
  //   pnfid: string[];
  //   ip_address: string[];
  //   port_number: number[];
  //   preprovider_files:string[];
  //    uname:string;
  //   pwd:string;
  // }> {
  //   let count = 10;
  //   try{
  //     const response1 = await axios.get(`${baseUri}/pre_provider/_count`);
  //     count = response1.data.count;
  //   }
  //   catch(Error){

  //   }
  //   try {
       
  //     const response = await axios.get(`${baseUri}/pre_provider/_search?size=`+count);
  //     const hits = response.data.hits.hits;
  //     const pnfid = hits.map((hit: any) => hit._source.PNFID);
  //     const ip_address = hits.map((hit: any) => hit._source.IP_ADDRESS);
  //     const port_number = hits.map((hit: any) => hit._source.PORT_NUMBER);
  //     const preprovider_files = hits.map((hit: any) => hit._source.PREPROVIDER_CONF);
  //     const uname=hits.map((hit:any)=>hit._source.USERNAME);
  //     const pwd=hits.map((hit:any)=>hit._source.PASSWORD);

  //     return { pnfid, ip_address, port_number, preprovider_files,uname,pwd };
  //   } catch (error) {
  //     console.error("Error fetching data from Elasticsearch:", error);
  //     return { pnfid: [], ip_address: [], port_number: [], preprovider_files: [],uname:'',pwd: '' }; // Return empty arrays on error
  //   }
  // }

  public onRadioSelect = (e: any) => {
    if (e.target.value == "password") {
      this.setState({ isPasswordSelected: true, isTlsSelected: false });
    } else if (e.target.value == "tlsKey") {
      this.setState({ isPasswordSelected: false, isTlsSelected: true });
    }
  };

  private onApply = async(element: NetworkElementConnection) => {
    if (this.props.onClose) this.props.onClose();
    let updateElement: UpdateNetworkElement = {
      id: this.state.nodeId,
    };
    if (this.state.isPasswordSelected) {
      element.tlsKey = "";
    } else if (this.state.isTlsSelected) {
      //check here
      element.password = "";
    }

    switch (this.props.mode) {
      case EditNetworkElementDialogMode.AddNewNetworkElement:
        if (element) this.props.addNewNetworkElement(element);
        break;
      case EditNetworkElementDialogMode.MountNetworkElement:
        if (element) this.props.mountNetworkElement(element);
        break;
      case EditNetworkElementDialogMode.UnmountNetworkElement:
        if (element) this.props.unmountNetworkElement(element);
        break;
      case EditNetworkElementDialogMode.EditNetworkElement:
        if (
          this.props.initialNetworkElement.isRequired !== this.state.isRequired
        )
          updateElement.isRequired = this.state.isRequired;
        if (this.props.initialNetworkElement.username !== this.state.username)
          updateElement.username = this.state.username;
        if (
          this.props.initialNetworkElement.password !== this.state.password &&
          this.state.isPasswordSelected
        ) {
          updateElement.password = this.state.password;
          updateElement.tlsKey = "";
        }
        if (
          this.props.initialNetworkElement.tlsKey !== this.state.tlsKey &&
          this.state.isTlsSelected
        ) {
          updateElement.tlsKey = this.state.tlsKey;
          updateElement.password = "";
        }
        if (element) this.props.editNetworkElement(updateElement, element);
        this.setState({
          radioSelected: "",
        });
        break;
      case EditNetworkElementDialogMode.RemoveNetworkElement:
        if (element) this.props.removeNetworkElement(updateElement);
        break;
    //  case EditNetworkElementDialogMode.UploadDevidceLogs:
    //       if (element) 
    //         {
    //           if(this.state.LogType !="" &&  this.state.sftpurl !="" && this.state.rrhlogType !="" && this.state.ftpPassword !=""&& this.state.sectorID!="")
    //          { 
    //             updateElement.LogType=this.state.LogType;
    //             updateElement.sftpurl=this.state.sftpurl;
    //             updateElement.rrhlogType=this.state.rrhlogType;
    //             updateElement.ftpPassword=this.state.ftpPassword;
    //             updateElement.sectorID = this.state.sectorID;

    //             var res = this.props.uploadDeviceLogs(updateElement);
    //             const result = await res;
    //             console.log("UploadDevidceLogs Res : " + result);
    //             if(result)
    //             {
    //               this.setState({SaveSucesopen:true,Sucessmsg:"Upload RRH Logs Initiated",savedialogTitle:"Success"})
    //               this.setState({ftpServerName : ""})
    //             }
    //             else
    //             {
    //               this.setState({SaveSucesopen:true,Sucessmsg:"Upload RRH Logs Fail to Initiate",savedialogTitle:"Warning"})
    //               this.setState({ftpServerName : ""})
    //             }
    //         }
    //          // alert( "UploadDevidceLogs Res : " + result);
    //         }
    //       break;
    }

    this.setState({ password: "", username: "", tlsKey: "" });
    this.resetRequieredFields();
  };

  private onCancel = () => {
    if (this.props.onClose) this.props.onClose();
    this.setState({
      password: "",
      username: "",
      tlsKey: "",
      radioSelected: "",
    });
    this.resetRequieredFields();
  };

  private resetRequieredFields() {
    this.setState({ isNameValid: true, isHostSet: true });
  }

  private areRequieredFieldsValid() {
    this.setState({savedialogTitle:false,Sucessmsg:"",SaveSucesopen:false, duplicatenode:false})
    let areFieldsValid = true;

    if (
      this.state.nodeId == undefined ||
      this.state.nodeId.trim().length === 0
    ) {
      this.setState({ isNameValid: false });
      areFieldsValid = false;
    } else {
      this.setState({ isNameValid: true });
    }

    if (this.state.host == undefined || this.state.host.trim().length === 0) {
      this.setState({ isHostSet: false });
      areFieldsValid = false;
    } else {
      this.setState({ isHostSet: true });
    }

    return areFieldsValid;
  }

  private areRequieredFieldsUploadLogsValid() {
      if(this.state.sftpurl ==="" )
      {
        this.setState({validateftpServerName :false})
         return false;     
      }
      if(this.state.sectorID ==="" )
      {
        this.setState({validatesectorID :false})
        return false;     
      }
    if(this.state.LogType ==="" )
    {
      this.setState({validateLogType :false})
      return false;     
    }
    return true;
  }


  static getDerivedStateFromProps(
    props: EditNetworkElementDialogComponentProps,
    state: EditNetworkElementDialogComponentState & {
      initialNetworkElement: NetworkElementConnection;
    }
  ): EditNetworkElementDialogComponentState & {
    initialNetworkElement: NetworkElementConnection;
  } {
    let returnState = state;
    if (props.initialNetworkElement !== state.initialNetworkElement) {
      returnState = {
        ...state,
        ...props.initialNetworkElement,
        initialNetworkElement: props.initialNetworkElement,
      };
    }
    return returnState;
  }
}

export const EditNetworkElementDialog = connect(
  undefined,
  mapDispatch
)(EditNetworkElementDialogComponent);
export default EditNetworkElementDialog;
