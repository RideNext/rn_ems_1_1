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
import React from 'react';

import AddIcon from '@mui/icons-material/Add';
import ComputerIcon from '@mui/icons-material/Computer';
import EditIcon from '@mui/icons-material/Edit';
import Info from '@mui/icons-material/Info';
import LinkIcon from '@mui/icons-material/Link';
import LinkOffIcon from '@mui/icons-material/LinkOff';
import Refresh from '@mui/icons-material/Refresh';
import RemoveIcon from '@mui/icons-material/RemoveCircleOutline';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, FormControl, FormHelperText, IconButton, InputLabel, MenuItem, Select, SelectChangeEvent, SvgIcon, TextField, Tooltip, Typography } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { WithStyles } from '@mui/styles';
import createStyles from '@mui/styles/createStyles';
import withStyles from '@mui/styles/withStyles';

import { NavigateToApplication } from '../../../../framework/src/actions/navigationActions';
import { ColumnType, MaterialTable, MaterialTableCtorType } from '../../../../framework/src/components/material-table';
import { connect, Connect, IDispatcher } from '../../../../framework/src/flux/connect';
import { IApplicationStoreState } from '../../../../framework/src/store/applicationStore';
import { getAccessPolicyByUrl } from '../../../../framework/src/services/restService';

import { loadAllInfoElementAsync, loadAllInfoElementFeaturesAsync } from '../actions/infoNetworkElementActions';
import { createNetworkElementsActions, createNetworkElementsProperties } from '../handlers/networkElementsHandler';
import { NetworkElementConnection } from '../models/networkElementConnection';
import { ModuleSet, TopologyNode } from '../models/topologyNetconf';
import { connectService } from '../services/connectService';

import EditNetworkElementDialog, { EditNetworkElementDialogMode } from './editNetworkElementDialog';
import InfoNetworkElementDialog, { InfoNetworkElementDialogMode } from './infoNetworkElementDialog';
import RefreshNetworkElementsDialog, { RefreshNetworkElementsDialogMode } from './refreshNetworkElementsDialog';
import axios from "axios";
import SystemUpdateIcon from '@mui/icons-material/SystemUpdate';
import SyncIcon from '@mui/icons-material/Sync';
import UploadFileIcon  from '@mui/icons-material/UploadFile';
import { ThreeCircles, RotatingLines } from 'react-loader-spinner';
import { Loader } from '../../../../framework/src/components/material-ui/loader';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';
const configIcon  = require('../assets/icons/configurationAppIcon.svg');
const FaultIcon = require('../assets/icons/faultAppIcon.svg')
const PerformanceIcon= require('../assets/icons/performanceHistoryAppIcon.svg')
const softwareupgrade = require('../assets/icons/softwareupgrade.svg')
const shutdownIcon  = require('../assets/icons/shutdownIcon.svg');
const ResetIcon  = require('../assets/icons/ResetIcon.svg');
const RebootIcon  = require('../assets/icons/RebootIcon.svg');
//let [cellStatusdata, setcellStatusdata] = React.useState<any[]>([]);
//let cellStatusdata:any;
let cellStatusdata: any [] = [];
let celldivdata:any;
const baseuri = window.location.origin;
const RRHdialogTitle="Upload RRH Logs";
const styles = (theme: Theme) => createStyles({
  connectionStatusConnected: {
    color: 'darkgreen',
  },
  connectionStatusConnecting: {
    color: 'blue',
  },
  connectionStatusDisconnected: {
    color: 'red',
  },
  button: {
    margin: 0,
    padding: '6px 6px',
    minWidth: 'unset',
  },
  spacer: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    display: 'inline',
  }
});


const LogTypeOptions = [
  { value: '', label: 'Select' },
  { value: 'GNB-LOG', label: 'GNB LOG' },
  { value: 'GNB-Config', label: 'GNB Config' },
  { value: 'GNB-ConfigLog', label: 'GNB ConfigLog' },

  { value: 'GNB-CU-LOG', label: 'GNB CU LOG' },
  { value: 'GNB-DU-LOG', label: 'GNB DU LOG' },
  { value: 'RRH-LOG', label: 'RRH LOG' },

  { value: 'O-RAN-RU-LOG', label: 'O RAN RU LOG' },
  { value: 'GNB-L1-LOG', label: 'GNB L1 LOG' },
 
];

 const RRHlogpartitiontype = [
  { value: '', label: 'Select' },
  { value: 'WORK_PARTITION_LOGS', label: 'WORK_PARTITION_LOGS' },
  { value: 'RECOVERY_PARTITION_LOGS', label: 'RECOVERY_PARTITION_LOGS' },
  { value: 'BOTH_PARTITION_LOGS', label: 'BOTH_PARTITION_LOGS' },
];
type GetStatelessComponentProps<T> = T extends (props: infer P & { children?: React.ReactNode }) => any ? P : any;
const MenuItemExt: React.FC<GetStatelessComponentProps<typeof MenuItem>> = (props) => {
  const [disabled, setDisabled] = React.useState(true);
  const onMouseDown = (ev: React.MouseEvent<HTMLElement>) => {
    if (ev.button === 1) {
      setDisabled(!disabled);
      ev.preventDefault();
    }
  };
  return (
    <div onMouseDown={onMouseDown} >
      <MenuItem {...{ ...props, disabled: props.disabled && disabled }} />
    </div>
  );
};



const mapProps = (state: IApplicationStoreState) => ({
  networkElementsProperties: createNetworkElementsProperties(state),
  applicationState: state,
});


const mapDispatch = (dispatcher: IDispatcher) => ({
  networkElementsActions: createNetworkElementsActions(dispatcher.dispatch),
  navigateToApplication: (applicationName: string, path?: string) => dispatcher.dispatch(new NavigateToApplication(applicationName, path)),
  networkElementInfo: async (nodeId: string) => dispatcher.dispatch(loadAllInfoElementAsync(nodeId)),
  networkElementFeaturesInfo: async (nodeId: string) => dispatcher.dispatch(loadAllInfoElementFeaturesAsync(nodeId)),
});

type NetworkElementsListComponentProps = WithStyles<typeof styles> & Connect<typeof mapProps, typeof mapDispatch>;
type NetworkElementsListComponentState = {
  networkElementToEdit: NetworkElementConnection;
  networkElementEditorMode: EditNetworkElementDialogMode;
  refreshNetworkElementsEditorMode: RefreshNetworkElementsDialogMode;
  infoNetworkElementEditorMode: InfoNetworkElementDialogMode;
  elementInfo: TopologyNode | null;
  elementInfoFeature: ModuleSet | null;
  saveSucesopen:Boolean;
  dataloading:Boolean;
  saveSucesMesg:any,
  MessageType:any,
  forceSync:Boolean,
  currentprocess:string,
  currentnode:string,
  RRHupLoadDailog:boolean
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

const emptyRequireNetworkElement: NetworkElementConnection = { id: '', nodeId: '', host: '', port: 830, status: 'Disconnected', isRequired: true };
let initialSorted = false;
const NetworkElementTable = MaterialTable as MaterialTableCtorType<NetworkElementConnection>;

export class NetworkElementsListComponent extends React.Component<NetworkElementsListComponentProps, NetworkElementsListComponentState> {
  interval: NodeJS.Timeout;

  constructor(props: NetworkElementsListComponentProps) {
    super(props);

    this.state = {
      networkElementToEdit: emptyRequireNetworkElement,
      networkElementEditorMode: EditNetworkElementDialogMode.None,
      refreshNetworkElementsEditorMode: RefreshNetworkElementsDialogMode.None,
      elementInfo: null,
      elementInfoFeature: null,
      infoNetworkElementEditorMode: InfoNetworkElementDialogMode.None,
      saveSucesopen:false,
      dataloading:false,
      saveSucesMesg: "",
      MessageType: "OK",
      forceSync:false,
      currentprocess:"",
      currentnode:"",

      RRHupLoadDailog: false,
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
 
  



  getContextMenu(rowData: NetworkElementConnection): JSX.Element[] {
    console.log("entered  ",rowData.nodeId)
    console.log("entered status",rowData.status)
// if(rowData.status==="Connecting"){
//     const updateResponse =  axios.post(`${baseuri}/cell_status/_update/${rowData.nodeId}`, {
//       script: {
//         source: `
//           for (int i = 0; i < ctx._source.cellStatusdata.size(); i++) {
//             ctx._source.cellStatusdata[i].cellstatus = 'unknown';
//           }
//         `,
//         lang: 'painless'
//       }
//     });
//     updateResponse.then((res)=>console.log(res))
//   }

    
    const mountUri = rowData.id && connectService.getNetworkElementUri(rowData.id);
    const mountPolicy = mountUri && getAccessPolicyByUrl(mountUri);
    const canMount = mountPolicy && mountPolicy.POST || false;
    

    const { configuration } = this.props.applicationState as any;
    const buttonArray = [
      <MenuItemExt aria-label={'mount-button'} onClick={event => {this.onOpenMountdNetworkElementsDialog(event, rowData)}} disabled={!canMount} ><LinkIcon /><Typography>Connect</Typography></MenuItemExt>,
      <MenuItemExt aria-label={'unmount-button'} onClick={(event:any) => {this.onOpenUnmountdNetworkElementsDialog(event, rowData)}} disabled={!canMount} ><LinkOffIcon /><Typography>Disconnect</Typography></MenuItemExt>,
      <MenuItem aria-label={'reboot-button'} onClick={event=> {this.RebootDevice(event,rowData)}} disabled={rowData.status !== 'Connected'   }><img src={RebootIcon} width={19} height={19} style={{marginRight:'1px'}} /><Typography> Reboot</Typography></MenuItem>,
      // <MenuItem aria-label={'reset-button'} onClick={event => {this.ResetDevice(event, rowData)}} disabled={rowData.status === 'Connecting' || rowData.status === 'Disconnected' || !configuration}><img src={ResetIcon} width={18} height={18} style={{marginRight:'1px'}} /><Typography> Reset</Typography></MenuItem>,
      <MenuItem aria-label={'shutdown-button'} onClick={event => this.ShutdownDevice(event, rowData)} disabled={rowData.status !== 'Connected'   }><img src={shutdownIcon} width={15} height={15} style={{marginRight:'1px'}} /><Typography> Shutdown</Typography></MenuItem>,
      <MenuItemExt aria-label={'unmount-button'} onClick={event => this.SyncDBDataWithDevice(event, rowData)} disabled={rowData.status !== 'Connected'}><SyncIcon/><Typography>Sync Device Data</Typography></MenuItemExt>,
      <Divider />,
      <MenuItem aria-label={'info-button'} onClick={event => this.onOpenInfoNetworkElementDialog(event, rowData)} disabled={rowData.status !== 'Connected'} ><Info /><Typography>Info</Typography></MenuItem>,
      //<MenuItem aria-label={'edit-button'} onClick={event => this.onOpenEditNetworkElementDialog(event, rowData)}><EditIcon /><Typography>Edit</Typography></MenuItem>,
      <MenuItem aria-label={'remove-button'}  onClick={(event: any) => {this.onOpenRemoveNetworkElementDialog(event, rowData)}} 
      ><RemoveIcon /><Typography>Remove</Typography></MenuItem>,
      //<Divider />,
      //<MenuItem aria-label={'inventory-button'} onClick={() => this.props.navigateToApplication('inventory', rowData.nodeId)}><Typography>Inventory</Typography></MenuItem>,
      //<Divider />,
      <MenuItem aria-label={'configure-button'} onClick={event => this.onRedirectManagedElements(event, rowData)} disabled={rowData.status !== 'Connected'  || !configuration}> <img src={configIcon} width={25} height={25} style={{marginRight:'1px'}} /><Typography>Configure Node</Typography></MenuItem>,
      <MenuItem aria-label={'fault-button'} onClick={() => this.props.navigateToApplication('fault', rowData.nodeId)} disabled={rowData.status !== 'Connected'  || !configuration}> <img src={FaultIcon} width={20} height={20} style={{marginRight:'1px'}}  /><Typography>Fault</Typography></MenuItem>,
      // <MenuItem onClick={() => this.props.navigateToApplication('accounting', rowData.nodeId)} disabled={true}><Typography>Accounting</Typography></MenuItem>,
      <MenuItem aria-label={'performance-button'} onClick={() => this.props.navigateToApplication('performance', rowData.nodeId)} disabled={rowData.status !== 'Connected'  || !configuration}><img src={PerformanceIcon} width={20} height={20} style={{marginRight:'2px', marginBottom:'3px'}} /><Typography>Performance</Typography></MenuItem>,
      <MenuItem aria-label={'softwaremanagement-button'} onClick={() =>{
      this.props.navigateToApplication('softwaremanagement', rowData.nodeId)}} disabled={rowData.status !== 'Connected'  || !configuration}><img src={softwareupgrade} width={20} height={20} style={{marginRight:'2px', marginBottom:'3px'}} /><Typography>Software Management</Typography></MenuItem>,
      // <MenuItem onClick={() => this.props.navigateToApplication('security', rowData.nodeId)} disabled={true} ><Typography>Security</Typography></MenuItem>,
      <MenuItem aria-label={'devicelogs-button'}  onClick={(event: any) => {this.onOpenUploadDevicelogstDialog(event, rowData)}}><UploadFileIcon/><Typography>Upload RRH Logs</Typography></MenuItem>,
    ];
//Manish Changes Web URI is not needed

 //   if (rowData.weburi) {
      // add an icon for gui cuttrough, if weburi is available
   //   return [<MenuItem aria-label={'web-client-button'} onClick={() => window.open(rowData.weburi, '_blank')} ><ComputerIcon /><Typography>Web Client</Typography></MenuItem>].concat(buttonArray);
   // } else {
      return buttonArray;
   // }
  }

  //  private navigationCreator


  renderIcon = (rowData:any,index:number) => {
    return(
      <Tooltip title="Software Upgrade">
        <SystemUpdateIcon style={{ color: '#36A9E1' }} onClick={()=>{console.log("Software Upgrade clicked")}}/>
       
      </Tooltip>
    )
  }
  setSaveSucesClose = (rowData:any,e:any) => {
    this.setState({ saveSucesopen: false });
  }

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

    uploadDeviceLogs = async () => {
        try{
          // input {
          //   "remote-file-path": "", //sftp://<username>@<host>[:port]/path"
          //   "password": {
          //           "password": ""
          //   },
          //   sector-id: "",
          //   transaction-id: "",
          //   log-type: "",
          //   RRH-log-partition-type: ""	
          // }
          const transactionId = Math.floor(1000+Math.random() * 9000)
          const baseUri = `${window.location.origin}`;
          const sectorId = this.state.sectorID? this.state.sectorID : 1
          const payload = {
                 "o-ran-file-management:input" :
                 { 
                    "remote-file-path": this.state.sftpurl ,
                    "password": {"password": this.state.ftpPassword  },
                    "sector-id":   this.state.sectorID ,
                    "transaction-id": transactionId ,
                    "log-type": this.state.LogType ,
                    "RRH-log-partition-type": this.state.rrhlogType 
                  }
             }
          console.log("Upload RRH Logs payload  :   " + JSON.stringify(payload) )
          //alert("Upload Device Logs payload  :   " + JSON.stringify(payload));
          const uri = baseUri +`/rests/operations/network-topology:network-topology/topology=topology-netconf/node=${this.state.networkElementToEdit.nodeId}/yang-ext:mount/o-ran-file-management:file-upload`;
          try {
            const response = await axios.post(uri, payload, {
              headers: {
                'Content-Type': 'application/json',
              },
            });
           // const response = await axios.post(uri, payload);
           const result = await response;
            console.log(result);
            this.setState({saveSucesopen:true,saveSucesMesg:"Upload RRH Logs Initiated",MessageType:"OK"});
            this.setState({ 
              RRHupLoadDailog:false,
               sftpurl : "",
                rrhlogType: "",
                LogType:"",
                sectorID :"" ,
                ftpPassword:"",
                ftpServerName:"",
                validaterrhlogType: true,
                validateLogType:true,
                validatesectorID :true ,
                validateftpServerName:true
              })
           
          } catch (error) {
            this.setState({ 
              RRHupLoadDailog:false,
              sftpurl : "",
               rrhlogType: "",
               LogType:"",
               sectorID :"" ,
               ftpPassword:"",
               ftpServerName:"",
               validaterrhlogType: true,
               validateLogType:true,
               validatesectorID :true ,
               validateftpServerName:true
             })
            console.log("Upload RRH Logs Error  :   " + error?.message)
            this.setState({saveSucesopen:true,saveSucesMesg:"Upload RRH Logs Fail to Initiate", MessageType:"fail"})
          }   
        }catch(Error){
        
          this.setState({ 
            RRHupLoadDailog:false,
            sftpurl : "",
             rrhlogType: "",
             LogType:"",
             sectorID :"" ,
             ftpPassword:"",
             ftpServerName:"",
             validaterrhlogType: true,
             validateLogType:true,
             validatesectorID :true ,
             validateftpServerName:true
           })
          console.log("Upload RRH Logs Error  :   " + Error?.message)
            this.setState({saveSucesopen:true,saveSucesMesg:"Upload RRH Logs Fail to Initiate", MessageType:"fail"})
        }
      }
      areRequieredFieldsUploadLogsValid() {
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

  render(): JSX.Element {
    //const { classes } = this.props;
    const { networkElementToEdit } = this.state;
    let savedRadio = 'password';
    if (this.state.networkElementToEdit.password && this.state.networkElementToEdit.password.length > 0) {
      savedRadio = 'password';
    } else if (this.state.networkElementToEdit.tlsKey && this.state.networkElementToEdit.tlsKey.length > 0) {
      savedRadio = 'tlsKey';
    }

    // const mountUri = rowData.id && connectService.getNetworkElementUri(rowData.id);
    // const mountPolicy = mountUri && getAccessPolicyByUrl(mountUri);
    // const canAdd =  mountPolicy && mountPolicy.POST || false;
    const canAdd = true;

    const addRequireNetworkElementAction = {
      icon: AddIcon, tooltip: 'Add node', ariaLabel: 'add-element', onClick: () => {
        this.setState({
          networkElementEditorMode: EditNetworkElementDialogMode.AddNewNetworkElement,
          networkElementToEdit: emptyRequireNetworkElement,
        });
      },
    };

    const refreshNetworkElementsAction = {
      icon: Refresh, tooltip: 'Refresh table', ariaLabel: 'refresh', onClick: () => {
        this.setState({
          refreshNetworkElementsEditorMode: RefreshNetworkElementsDialogMode.RefreshNetworkElementsTable,
        });
      },
    };

  
    return <>
     <div >
      {this.state.dataloading  === true && (
        <div style={{position: 'fixed', background: 'white', opacity:'0.8', top:'0',left:'0', zIndex: '998', height: '100%',width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <div style={{ position:'absolute', top:'50%',left:'50%', transform:'translate(-50%, -50%)',color: 'white', background: 'white', opacity: '.8', zIndex: '1000'}}>
          <Loader />
          <ThreeCircles
              visible={true}
              height="100"
              width="100"
              color="#53659c" 
              ariaLabel="three-circles-loading"
              wrapperStyle={{}}
              wrapperClass=""
              />
              <h3>Data loading ...</h3>
        </div>
      </div>
      )}

    <Dialog open={this.state.RRHupLoadDailog}
          maxWidth="sm"
          fullWidth >
        <DialogTitle id="form-dialog-title"  aria-label={`${RRHdialogTitle.replace(/ /g, "-").toLowerCase()}-dialog`} >
         {RRHdialogTitle}
        </DialogTitle>
        <DialogContent sx={{margin:2}}> 
        {/* <DialogContentText>{setting.dialogDescription}</DialogContentText> */}
        <TextField  label="Node ID"  variant="standard"  fullWidth margin="dense" 
          value={this.state.networkElementToEdit.nodeId}
           disabled />
        <FormControl variant="standard" fullWidth >
        <InputLabel id="ftpserverlabel">FTP Server Name</InputLabel>
        <Select
          labelId="ftpserverlabel"
          id="ftpservername"
          value={ this.state.ftpServerName }
          onChange={this.handleFtpServerNamechange}
          label="FTP Server Name">
          { this.state.ftplogs?.map(option => (
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
          value= {this.state.sectorID}
          onChange={(event: any) => {
            this.handleSectorIDChange(event);
          }}
          margin="dense"
          label="Sector ID">
          {this.state.rrhIdlist?.map(id => (
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
          <Button aria-label="dialog-confirm-button"   
          onClick={(event: any) => {  
            if (this.areRequieredFieldsUploadLogsValid()) { 
               this.uploadDeviceLogs(); }
          }}  
           color="inherit"  >
           Upload Logs
          </Button>
          <Button  aria-label="dialog-cancel-button"
            onClick={(event) => {
              this.setState({ 
                RRHupLoadDailog:false,
                sftpurl : "",
                 rrhlogType: "",
                 LogType:"",
                 sectorID :"" ,
                 ftpPassword:"",
                 ftpServerName:"",
                 validaterrhlogType: true,
                 validateLogType:true,
                 validatesectorID :true ,
                 validateftpServerName:true
               })
              event.preventDefault();
              event.stopPropagation();
            }}
            color="secondary"
          >
           Cancel
          </Button>
        </DialogActions>
      </Dialog>




      <Dialog open={this.state.saveSucesopen==true} onClose={this.setSaveSucesClose}  
       PaperProps={{style: { minHeight: '12vh',  minWidth: '23vw',border: '14px solid #38456a',  borderRadius: '15px', backgroundColor: '#e8e8e8' } }} >
      {/* <DialogTitle id="form-sucdialog-title" > {savedialogTitle}</DialogTitle> */}
        <DialogContent style={{alignContent:'center',textAlign:"center"}}>
        <IconButton style={{ color :'#008000', textAlign:"center" }}> 
              {this.state.MessageType === "OK" ? (<CheckCircleOutlineRoundedIcon style={{ color: '#008000' }} />) 
              : (<WarningAmberRoundedIcon style={{ color: 'red' }} />)} <h6 style={{ marginLeft:'3px', color : this.state.MessageType=="OK"? '#008000':'orange', textAlign:"center" }}>{this.state.saveSucesMesg} </h6> </IconButton> 
        </DialogContent>
        <DialogActions>
            <Button onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              this.setState({ saveSucesopen: false });
              this.setState({ saveSucesMesg: "" });
              if(this.state.currentprocess === "Reboot"){
                const RebootStatus = 'Reboot';  
                this.DeviceReboot(RebootStatus);
                this.saveEventAuditLog("Reboot",this.state.currentnode,"");
              }
              if(this.state.currentprocess === "shutdown"){
                const shutdownStatus = 'shutdown';  
                this.DeviceShutdown(shutdownStatus);
                this.saveEventAuditLog("Shutdown",this.state.currentnode,"");
              }
            }} style={{ backgroundColor: 'white', color: '#38761d', border: '1px solid #2986cc', borderRadius: '1px', padding: '3px 6px' }}>
              OK
            </Button>
        </DialogActions>
      </Dialog>
      </div>
      <NetworkElementTable stickyHeader title={"Connect"} tableId="network-element-table" customActionButtons={[refreshNetworkElementsAction, ...(canAdd ? [addRequireNetworkElementAction] : [])]} columns={[
        { property: 'nodeId', title: 'Node ID', type: ColumnType.text , align:'left', width:'auto'},
        { property: 'status', title: 'Netconf Status', type: ColumnType.text, width:'auto' , align : 'left'},
        { property: 'HeartBeatStatus', title: 'VES Status', type: ColumnType.text ,width:'auto' , align : 'left'},
        { property: 'DeviceStatus', title: 'Device Status',type:ColumnType.text , width:'auto' , align : 'left'},
        { property: 'host', title: 'Host', type: ColumnType.text , align : 'left',width:'auto'},
        { property: 'port', title: 'Port', type: ColumnType.numeric , align : 'right',width:'auto'},
        //{ property: 'isRequired', title: 'Required', type: ColumnType.boolean },
        { property: 'deviceType', title: 'Type', type: ColumnType.text , align : 'left',width:'auto'},
        { property: "serialNumber", title: "Serial Number", type: ColumnType.text, align : 'left',width:'auto' },
        { property: 'softwareVersion', title: 'Software Version', type: ColumnType.text, width: 'auto' , align : 'left',},
        { property: 'vendorDetails', title: 'Vendor Details', type: ColumnType.text, width: 'auto' , align : 'left',},
        { property: 'modelNumber', title: 'Model Number', type: ColumnType.text, width: 'auto' , align : 'left',},
       // { property: "Action", title: "",  type: ColumnType.custom, customControl: this.renderIcon , align : 'left' ,width:'5%'},
      ]} idProperty="id" {...this.props.networkElementsActions} {...this.props.networkElementsProperties} asynchronus createContextMenu={rowData => {
        return this.getContextMenu(rowData);
      }} >
      </NetworkElementTable>
      <EditNetworkElementDialog 
        initialNetworkElement={networkElementToEdit}
        mode={this.state.networkElementEditorMode}
        onClose={this.onCloseEditNetworkElementDialog}
        radioChecked={savedRadio}
      />
      <RefreshNetworkElementsDialog
        mode={this.state.refreshNetworkElementsEditorMode}
        onClose={this.onCloseRefreshNetworkElementsDialog}
      />
      <InfoNetworkElementDialog
        initialNetworkElement={networkElementToEdit}
        mode={this.state.infoNetworkElementEditorMode}
        onClose={this.onCloseInfoNetworkElementDialog}
      />
    </>;
  }

  public componentDidMount() {
    if (!initialSorted) {
      initialSorted = true;
      this.props.networkElementsActions.onHandleRequestSort('nodeId');
    } else {
      this.props.networkElementsActions.onRefresh();
    }
    this.interval = setInterval(() => {
      this.props.networkElementsActions.onRefresh();// This function is called every 1 second
    }, 10000); 
  }
  componentWillUnmount() {
    clearInterval(this.interval); // Cleanup to avoid memory leaks
  }

  addPPData = (siteIdentification: string, siteDescription: string, environmentType: string, powerInterface: string) => ({
    id: siteIdentification.replace(" ", "_"),
    siteIdentification,
    siteDescription,
    environmentType,
    powerInterface
  });
 addPLMNInfo = ( MCC: string, MNC: string) => ({
    id: MCC+"_"+MNC,
    Name :  MCC+"_"+MNC,
    MCC,
    MNC
  });

  addRRMPolicyList = (id:string,MNC: string,MCC:string, SNSSAI: string) => ({
    id,
    Name : MCC+"_"+MNC+"_"+SNSSAI,
    PLMNInfo: MCC+"_"+MNC,
    MCC,
    SNSSAI: SNSSAI.toString(),
  });

  addEndpointInfo = ( EndPoint: string, LocalIPAddress: string, VLANId:string, RemoteIpAddress:string) => ({
    id: EndPoint,
    Name :  EndPoint,
    EndPoint,
    LocalIPAddress,
    VLANId,
    RemoteIpAddress
  });

  setBasicData = (basicdivdata:any,basicdatabaseData:any) => {
    let basicdata: any;
    if(basicdatabaseData)
    basicdata=basicdatabaseData
    let peerParameters :any;
    let PeerParameterList : any[] =[];
    let plmnInfo :any;
    let plmnInfoList: any[] =[];
    let rrmInfo :any;
    let RRMList :any[] =[];
    let CellLocalIdList: any[] =[];
    let NewRRMInfo: any[] =[];
    if(basicdata?.CellLocalId )
  //    CellLocalIdList=basicdata.CellLocalId;
    if(basicdivdata['_3gpp-nr-nrm-gnbdufunction:GNBDUFunction'][0]['_3gpp-nr-nrm-nrcelldu:NRCellDU']){
      
    basicdivdata['_3gpp-nr-nrm-gnbdufunction:GNBDUFunction'][0]['_3gpp-nr-nrm-nrcelldu:NRCellDU']?.map((ircItem: any) => {
      rrmInfo=ircItem.attributes.rRMPolicyMemberList;
      plmnInfo=  ircItem.attributes.pLMNInfoList;
      let NewplmnInfo: any[] =[];
        plmnInfo.map((row: any) => {
          return  NewplmnInfo.push(this.addPLMNInfo(row.mcc,row.mnc));
        });
        plmnInfoList=NewplmnInfo; 
        // rrmInfo.map((row: any) => {
        //   return NewRRMInfo.push(this.addRRMPolicyList(row.idx,row.mcc,row.sNSSAI));
        // });
      //let isexists=CellLocalIdList?.some((item:any) => item.CellLocalId===ircItem.attributes.cellLocalId.toString())
      let isexists= CellLocalIdList?.find((item) => item.CellLocalId == ircItem.attributes.cellLocalId)
      if(!isexists)
      {
        CellLocalIdList.push({'id': CellLocalIdList.length+1,'CellLocalId':ircItem.attributes.cellLocalId})
      }
    })  
  }
   rrmInfo?.map((row: any) => {
          return NewRRMInfo.push(this.addRRMPolicyList(row.idx,row.mnc,row.mcc,row.sNSSAI));
        });
    peerParameters=basicdivdata['_3gpp-nr-nrm-gnbdufunction:GNBDUFunction'][0].attributes.peeParametersList;
    PeerParameterList.push(this.addPPData(peerParameters.siteIdentification, peerParameters.siteDescription, peerParameters.environmentType, peerParameters.powerInterface))
  
    RRMList=NewRRMInfo;
    
    basicdata.PriorityLabel=basicdivdata?.attributes?.priorityLabel;
    basicdata.DnPrefix=basicdivdata?.attributes?.dnPrefix;
    basicdata.PeerParameterList=PeerParameterList;
    basicdata.PLMNInfo=plmnInfoList;
    basicdata.RRMPolicyList=RRMList;
    basicdata.CellLocalId=CellLocalIdList;
    
    return basicdata;
    }
  
  getRRHList=(rrhData: any, NRCellDUId: any)=>{
    let RRHList: any[]=[];
    let rrhitem = rrhData?.find( (RRHItem:any) => RRHItem.id == NRCellDUId)
    if(rrhData && rrhitem)
    {
    let rrhda={
                id : rrhitem.id,
                mimoMode : rrhitem['AllRRHInfo'].mimoMode,
                antennaType : rrhitem['AllRRHInfo'].antennaType,
                isRetEnabled : rrhitem['AllRRHInfo'].isRetEnabled,
                cpriRate : rrhitem['AllRRHInfo'].cpriRate,
                setRRHDate : rrhitem['AllRRHInfo'].setRRHDate,
                duplexMode : rrhitem['AllRRHInfo'].duplexMode,
                dlEarfcn :rrhitem['AllRRHInfo'].dlEarfcn,
                ulEarfcn : rrhitem['AllRRHInfo'].ulEarfcn,
                frequencyBand : rrhitem['AllRRHInfo'].frequencyBand,
                bandWidth : rrhitem['AllRRHInfo'].bandWidth,
                txDelay :  rrhitem['AllRRHInfo'].delayParam.txDelay,
                rxDelay : rrhitem['AllRRHInfo'].delayParam.rxDelay,
                isLoopBackEnabled : rrhitem['AllRRHInfo'].cpriLoopback.isLoopBackEnabled,
                mode : rrhitem['AllRRHInfo'].cpriLoopback.mode,
                testTime : rrhitem['AllRRHInfo'].cpriLoopback.testTime,
                antennaId : rrhitem['AllRRHInfo'].antennaConfig.antennaId,
                antennaGain : rrhitem['AllRRHInfo'].antennaConfig.antennaGain,
                txPower :  rrhitem['AllRRHInfo'].antennaConfig.txPower,
         }
         RRHList.push(rrhda)
        }
       return RRHList;
      
    }
    setCellData = (celldivdata:any,celldbdata:any,rrhdata:any) => {
     // console.log("setCellData entered")
      let cellConfigdata: any [] = [];
      let cStatusdata: any [] = [];
  
    //   if(celldbdata[0])
    //    celldata=celldbdata[0];
    // else
       //celldata=celldbdata;
  
       celldivdata['_3gpp-nr-nrm-gnbdufunction:GNBDUFunction'][0]['_3gpp-nr-nrm-nrcelldu:NRCellDU'].sort((a:any,b:any) => {
        if (""+a["id"]<(""+b["id"])) return -1;
        if (""+a["id"]>(""+b["id"])) return 1;
        return 0;
    });
       celldivdata['_3gpp-nr-nrm-gnbdufunction:GNBDUFunction'][0]['_3gpp-nr-nrm-nrcelldu:NRCellDU']?.map((NRCellDU:any)=>{
          let rrhList=this.getRRHList(rrhdata,NRCellDU.id);
          let celldata: any={} ;
          celldata.arfcnDL=NRCellDU.attributes.arfcnDL;
          celldata.arfcnUL=NRCellDU.attributes.arfcnUL;
          celldata.arfcnSUL=NRCellDU.attributes.arfcnSUL;
          celldata.bsChannelBwDL=NRCellDU.attributes.bSChannelBwDL;
          celldata.bsChannelBwUL=NRCellDU.attributes.bSChannelBwUL;
          celldata.ssbPeriodicity=NRCellDU.attributes.ssbPeriodicity;
          celldata.ssbOfset=NRCellDU.attributes.ssbOffset;
          celldata.ssbDuration=NRCellDU.attributes.ssbDuration;
          celldata.ssbFrequency=NRCellDU.attributes.ssbFrequency;
          celldata.ssbSubCarrierSpacing=NRCellDU.attributes.ssbSubCarrierSpacing;
          if(NRCellDU?.attributes.administrativeState)
          {
            celldata.administrativeState=NRCellDU.attributes.administrativeState;
          }
          let cucell= celldivdata['_3gpp-nr-nrm-gnbcucpfunction:GNBCUCPFunction'][0]['_3gpp-nr-nrm-nrcellcu:NRCellCU'][0];
          let cuCellData = celldivdata['_3gpp-nr-nrm-gnbcucpfunction:GNBCUCPFunction'][0]['_3gpp-nr-nrm-nrcellcu:NRCellCU']?.find( (NRCellCUItem:any) => NRCellCUItem.id == NRCellDU.id)
          if(cuCellData)
          {cucell=cuCellData}
          celldata.PriorityLabel=cucell?.attributes.priorityLabel;
          celldata.NrfID=cucell['_3gpp-nr-nrm-nrfreqrelation:NRFreqRelation'][0]?.id
          celldata.rsrpOffsetSSB=cucell['_3gpp-nr-nrm-nrfreqrelation:NRFreqRelation'][0].attributes['offsetMO'].rsrpOffsetSsb;
          celldata.sinrOffsetSSB=cucell['_3gpp-nr-nrm-nrfreqrelation:NRFreqRelation'][0].attributes['offsetMO'].sinrOffsetSsb;
          celldata.rsrqOffsetSSB=cucell['_3gpp-nr-nrm-nrfreqrelation:NRFreqRelation'][0].attributes['offsetMO'].rsrqOffsetSsb;
          celldata.rsrpOffsetCsiRs=cucell['_3gpp-nr-nrm-nrfreqrelation:NRFreqRelation'][0].attributes['offsetMO'].rsrpOffsetCsiRs;
          celldata.rsrqOffsetCsiRs=cucell['_3gpp-nr-nrm-nrfreqrelation:NRFreqRelation'][0].attributes['offsetMO'].rsrqOffsetCsiRs;
          celldata.sinrOffsetCsiRs=cucell['_3gpp-nr-nrm-nrfreqrelation:NRFreqRelation'][0].attributes['offsetMO'].sinrOffsetCsiRs;
          celldata.peeParameters=cucell['_3gpp-nr-nrm-nrfreqrelation:NRFreqRelation'][0].attributes['peeParametersList'].siteIdentification;
          celldata.CellReselectionPriority=cucell['_3gpp-nr-nrm-nrfreqrelation:NRFreqRelation'][0].attributes.cellReselectionPriority;
          celldata.CellReselectionSubPriority=cucell['_3gpp-nr-nrm-nrfreqrelation:NRFreqRelation'][0].attributes.cellReselectionSubPriority;
          celldata.pMax=cucell['_3gpp-nr-nrm-nrfreqrelation:NRFreqRelation'][0].attributes.pMax;
          celldata.qOffsetFrequency=cucell['_3gpp-nr-nrm-nrfreqrelation:NRFreqRelation'][0].attributes.qOffsetFreq;
          celldata.qQualMin=cucell['_3gpp-nr-nrm-nrfreqrelation:NRFreqRelation'][0].attributes.qQualMin;
          celldata.qRxLevMin=cucell['_3gpp-nr-nrm-nrfreqrelation:NRFreqRelation'][0].attributes.qRxLevMin;
          celldata.threshXHighP=cucell['_3gpp-nr-nrm-nrfreqrelation:NRFreqRelation'][0].attributes.threshXHighP;
          celldata.threshXHighQ=cucell['_3gpp-nr-nrm-nrfreqrelation:NRFreqRelation'][0].attributes.threshXHighQ;
          celldata.threshXLowP=cucell['_3gpp-nr-nrm-nrfreqrelation:NRFreqRelation'][0].attributes.threshXLowP;
          celldata.threshXLowQ=cucell['_3gpp-nr-nrm-nrfreqrelation:NRFreqRelation'][0].attributes.threshXLowQ;
          celldata.tReselectionNR=cucell['_3gpp-nr-nrm-nrfreqrelation:NRFreqRelation'][0].attributes.tReselectionNR;
          celldata.tReselectionNRSfHigh=cucell['_3gpp-nr-nrm-nrfreqrelation:NRFreqRelation'][0].attributes.tReselectionNRSfHigh;
          celldata.tReselectionNRSfMedium=cucell['_3gpp-nr-nrm-nrfreqrelation:NRFreqRelation'][0].attributes.tReselectionNRSfMedium;
          celldata.nRFrequencyref=cucell['_3gpp-nr-nrm-nrfreqrelation:NRFreqRelation'][0].attributes.nRFrequencyRef;

          celldata.cellId="cell"+NRCellDU.id
          let cellstatus={cellId:  celldata.cellId,cellstatus:'unknown'};
          if(rrhList && rrhList.length > 0)
          {
           celldata.RRHList=rrhList;
          }
         // cellStatusdata.push(cellstatus);
       //if(celldivdata['_3gpp-nr-nrm-gnbdufunction:GNBDUFunction'][0]['_3gpp-nr-nrm-nrcelldu:NRCellDU'])
        //{
          //let NRCellDU=celldivdata['_3gpp-nr-nrm-gnbdufunction:GNBDUFunction'][0]['_3gpp-nr-nrm-nrcelldu:NRCellDU'][0]
         
        //}
        cellConfigdata=[...cellConfigdata,celldata];
        cStatusdata=[...cStatusdata,cellstatus]
        //cellConfigdata.push(celldata)
      })
      //plmnInfo=  celldivdata['_3gpp-nr-nrm-gnbdufunction:GNBDUFunction'][0]['_3gpp-nr-nrm-nrcelldu:NRCellDU'][0].attributes.pLMNInfoList
      //cellConfigdata.PriorityLabel=celldivdata?.attributes?.priorityLabel;
      //cellConfigdata.DnPrefix=celldivdata?.attributes?.dnPrefix;
      //setcellStatusdata(cellStatusdata);
      cellStatusdata=cStatusdata;
      return cellConfigdata;
      }
  
      setCuupData = (cuupdivdata: any, cuupdbdata: any) => {
        //console.log("setcuupData entered");
        let cuupdata: any = cuupdbdata;
        let NewEndpointInfo: any[] = [];
        cuupdata.PriorityLabel=cuupdivdata['_3gpp-nr-nrm-gnbcuupfunction:GNBCUUPFunction'][0].attributes.priorityLabel;
        cuupdata.gNBId=cuupdivdata['_3gpp-nr-nrm-gnbcuupfunction:GNBCUUPFunction'][0].attributes.gNBId;
        cuupdata.ResourceType=cuupdivdata['_3gpp-nr-nrm-gnbcuupfunction:GNBCUUPFunction'][0].attributes.resourceType;
        cuupdata.RRMPolicy=cuupdivdata['_3gpp-nr-nrm-gnbcucpfunction:GNBCUCPFunction'][0].attributes.rRMPolicyMemberList[0].mcc +"_"+cuupdivdata['_3gpp-nr-nrm-gnbcucpfunction:GNBCUCPFunction'][0].attributes.rRMPolicyMemberList[0].mnc +"_"+cuupdivdata['_3gpp-nr-nrm-gnbcucpfunction:GNBCUCPFunction'][0].attributes.rRMPolicyMemberList[0].sNSSAI;
        // Check if the key '_3gpp-nr-nrm-gnbcuupfunction:GNBCUUPFunction' exists in cuupdivdata
        if (cuupdivdata['_3gpp-nr-nrm-gnbcuupfunction:GNBCUUPFunction']) {
          // Iterate over each endpoint type ('_3gpp-nr-nrm-ep:EP_*') within the GNBCUUPFunction object
          Object.keys(cuupdivdata['_3gpp-nr-nrm-gnbcuupfunction:GNBCUUPFunction'][0]).forEach(key => {
            // Check if the key starts with '_3gpp-nr-nrm-ep'
            if (key.startsWith('_3gpp-nr-nrm-ep')) {
              let endpointinfo={
                id:cuupdivdata['_3gpp-nr-nrm-gnbcuupfunction:GNBCUUPFunction'][0][key][0]?.id,
                EndPoint:key.split(':')[1],
                LocalIPAddress:cuupdivdata['_3gpp-nr-nrm-gnbcuupfunction:GNBCUUPFunction'][0][key][0].attributes.localAddress[0].ipAddress,
                VLANId:cuupdivdata['_3gpp-nr-nrm-gnbcuupfunction:GNBCUUPFunction'][0][key][0].attributes.localAddress[0].vlanId,
                RemoteIpAddress:cuupdivdata['_3gpp-nr-nrm-gnbcuupfunction:GNBCUUPFunction'][0][key][0].attributes.remoteAddress
              }
              NewEndpointInfo.push(endpointinfo)
            }
          });
        }
        // Assign NewEndpointInfo array to cuupdata.EndPointList
        cuupdata.EndPointList = NewEndpointInfo;
        return cuupdata;
      }
      setCucpData = (cucpdivdata: any, cucpdbdata: any) => {
        console.log("setcucpData entered");
       // console.log(cucpdivdata)
        let cucpdata: any = cucpdbdata;
        let NewEndpointInfo: any[] = [];
        cucpdata.UserLabel=cucpdivdata['_3gpp-nr-nrm-gnbcucpfunction:GNBCUCPFunction'][0] .attributes.userLabel;
        cucpdata.PriorityLabel=cucpdivdata['_3gpp-nr-nrm-gnbcucpfunction:GNBCUCPFunction'][0] .attributes.priorityLabel;
        cucpdata.ResourceType=cucpdivdata['_3gpp-nr-nrm-gnbcucpfunction:GNBCUCPFunction'][0] .attributes.resourceType;
        cucpdata.gNBCUName=cucpdivdata['_3gpp-nr-nrm-gnbcucpfunction:GNBCUCPFunction'][0] .attributes.gNBCUName;
        cucpdata.gNBIDLength=cucpdivdata['_3gpp-nr-nrm-gnbcucpfunction:GNBCUCPFunction'][0].attributes.gNBIdLength;
        cucpdata.gNBID=cucpdivdata['_3gpp-nr-nrm-gnbcucpfunction:GNBCUCPFunction'][0].attributes.gNBId;
        cucpdata.peeParameters=cucpdivdata['_3gpp-nr-nrm-gnbcucpfunction:GNBCUCPFunction'][0].attributes.peeParametersList.siteIdentification;
        cucpdata.plmnId=cucpdivdata['_3gpp-nr-nrm-gnbcucpfunction:GNBCUCPFunction'][0].attributes['pLMNId'][0].mcc +"_"+cucpdivdata['_3gpp-nr-nrm-gnbcucpfunction:GNBCUCPFunction'][0].attributes['pLMNId'][0].mnc;
        cucpdata.rrmPolicyList=cucpdivdata['_3gpp-nr-nrm-gnbcucpfunction:GNBCUCPFunction'][0].attributes.rRMPolicyMemberList[0].mcc +"_"+cucpdivdata['_3gpp-nr-nrm-gnbcucpfunction:GNBCUCPFunction'][0].attributes.rRMPolicyMemberList[0].mnc +"_"+cucpdivdata['_3gpp-nr-nrm-gnbcucpfunction:GNBCUCPFunction'][0].attributes.rRMPolicyMemberList[0].sNSSAI;
        //cucpdata.cellLocalId=cucpdivdata['_3gpp-nr-nrm-gnbcucpfunction:GNBCUCPFunction'][0]['_3gpp-nr-nrm-nrcellcu:NRCellCU'][0].attributes.cellLocalId;
        if(cucpdivdata['_3gpp-nr-nrm-gnbcucpfunction:GNBCUCPFunction'][0]['_3gpp-nr-nrm-nrcellcu:NRCellCU'])
          {
            cucpdivdata['_3gpp-nr-nrm-gnbcucpfunction:GNBCUCPFunction'][0]['_3gpp-nr-nrm-nrcellcu:NRCellCU']?.sort((a:any,b:any) => {
              if (""+a["id"]<(""+b["id"])) return -1;
              if (""+a["id"]>(""+b["id"])) return 1;
              return 0;
            })
        let NRCellCU :any[]=[]
        cucpdivdata['_3gpp-nr-nrm-gnbcucpfunction:GNBCUCPFunction'][0]['_3gpp-nr-nrm-nrcellcu:NRCellCU']?.map((CuCell:any)=>{
              NRCellCU.push(
                {
                id : CuCell.id,
                PriorityLabel : CuCell.attributes.priorityLabel,
                CellLocalId : CuCell.attributes.cellLocalId,
                cellId : "cell"+CuCell.id,
                PLMNId : cucpdata.plmnId
                }
              )
            })
            cucpdata.NRCellCuList=NRCellCU;
        }
        if (cucpdivdata['_3gpp-nr-nrm-gnbcucpfunction:GNBCUCPFunction']) {
          Object.keys(cucpdivdata['_3gpp-nr-nrm-gnbcucpfunction:GNBCUCPFunction'][0]).forEach(key => {
            // Check if the key starts with '_3gpp-nr-nrm-ep'
            if (key.startsWith('_3gpp-nr-nrm-ep')) {
              let endpointinfo={
                id:cucpdivdata['_3gpp-nr-nrm-gnbcucpfunction:GNBCUCPFunction'][0][key][0]?.id,
                EndPoint:key.split(':')[1],
                LocalIPAddress:cucpdivdata['_3gpp-nr-nrm-gnbcucpfunction:GNBCUCPFunction'][0][key][0]?.attributes.localAddress[0]?.ipAddress,
                VLANId:cucpdivdata['_3gpp-nr-nrm-gnbcucpfunction:GNBCUCPFunction'][0][key][0]?.attributes.localAddress[0]?.vlanId,
                RemoteIpAddress:cucpdivdata['_3gpp-nr-nrm-gnbcucpfunction:GNBCUCPFunction'][0][key][0]?.attributes.remoteAddress
              }
             // console.log(endpointinfo)
              NewEndpointInfo.push(endpointinfo)
            }
          });
        }
       // console.log(cucpdivdata['_3gpp-nr-nrm-gnbcucpfunction:GNBCUCPFunction'][0]['o-ran-cu-security-handling:SecurityHandling'][0]?.attributes?.integrityProtectAlgoPrio[0])
        cucpdata.secAlId=cucpdivdata['_3gpp-nr-nrm-gnbcucpfunction:GNBCUCPFunction'][0]['o-ran-cu-security-handling:SecurityHandling'][0]?.id
        cucpdata.IntegrityProtectAlgoPrio=cucpdivdata['_3gpp-nr-nrm-gnbcucpfunction:GNBCUCPFunction'][0]['o-ran-cu-security-handling:SecurityHandling'][0]?.attributes?.integrityProtectAlgoPrio[0];
        cucpdata.CipheringAlgoPrio=cucpdivdata['_3gpp-nr-nrm-gnbcucpfunction:GNBCUCPFunction'][0]['o-ran-cu-security-handling:SecurityHandling'][0]?.attributes?.cipheringAlgoPrio[0];
        // Assign NewEndpointInfo array to cucpdata.EndPointList
        cucpdata.EndPointList = NewEndpointInfo;
        return cucpdata;
      }
  
      setDuData = (dudivdata: any, dudbdata: any) => {
        console.log("setduData entered");
        let duConfigdata: any [] = [];
        let SectorconfigurationDataList:any [] =[];
        let ManagedNFServicelist:any[] = [];
        let NewEndpointInfo: any[] = [];
        let DrxProfileIdInfolist:any[] =[];
       // let SchedulingReqConfInfolist:any[]=[];
        //let MacParamInfolist:any[]=[];
       // let srDelayTimerInfolist:any[]=[];
        let qosUlInfolist:any[]=[];
        let qosDlInfolist:any[]=[];
        let ScellDeactiveInfolist:any[]=[];
        let SectorCarrierlist:any[]=[];
        let Bwplist:any[]=[];
        let NRCellDUList:any[]=[];
        let PreconfRUProfilelist:any[]=[];
        let ODUWindowDatalist:any[]=[];
        // let PrbUlInfolist:any[]=[];
        // let PrbDlInfolist:any[]=[];
        const dudata=dudbdata;
        dudivdata['_3gpp-nr-nrm-gnbdufunction:GNBDUFunction'].map((du:any)=>{
           dudata.userLabel=du.attributes.userLabel,
           dudata.gNBDUId=du.attributes.gNBDUId,
           dudata.gNBIdLength=du.attributes.gNBIdLength,
           dudata.peeParameters=du.attributes.peeParametersList.siteIdentification,
          // dudata.rrmPolicyList=du.attributes.rRMPolicyMemberList[0].mnc+"_"+du.attributes.rRMPolicyMemberList[0].sNSSAI,
          dudata.rrmPolicyList=du.attributes.rRMPolicyMemberList[0].mcc+"_"+du.attributes.rRMPolicyMemberList[0].mnc+"_"+du.attributes.rRMPolicyMemberList[0].sNSSAI,
          dudata.resourceType=du.attributes.resourceType,
           dudata.priorityLabel=du.attributes.priorityLabel,
           du['ManagedNFService'].map((nfservice:any)=>{
            let ManagedMFServerInfo={
              id:nfservice.attributes.administrativeState,
              AdministrativeState:nfservice.attributes.administrativeState,
              saphost:nfservice.attributes.sAP[0].host,
              sapport:nfservice.attributes.sAP[0].port,
              operationsName:nfservice.attributes.operations[0].name,
              operationsAllowed:nfservice.attributes.operations[0].allowedNFTypes[0]
             }
             ManagedNFServicelist.push(ManagedMFServerInfo)
           })
            Object.keys(du).forEach(key => {
              if (key.startsWith('_3gpp-nr-nrm-ep')) {
                let endpointinfo={
                  Id:du[key][0].id,
                  EndPoint:key.split(':')[1],
                  LocalIPAddress:du[key][0].attributes.localAddress[0].ipAddress,
                  VLANID:du[key][0].attributes.localAddress[0].vlanId,
                  RemoteIPAddress:du[key][0].attributes.remoteAddress
                }
                NewEndpointInfo.push(endpointinfo)
              }
            });
            du.attributes['o-ran_3gpp-nr-nrm-gnbdufunction:o-ran-configuration']['mac-configuration']['drx-config']?.map((drx:any)=>{
              let SchedulingReqConfInfoList:any[]=[];
              let sreqinfo={
                id:drx['scheduling-request-config'][0]['scheduling-request-id'],
                schedulingrequest:drx['scheduling-request-config'][0]['scheduling-request-id'],
                scprohibittimer:drx['scheduling-request-config'][0]['sr-prohibit-timer'],
                sctransmax:drx['scheduling-request-config'][0]['sr-trans-max'],
              }
              SchedulingReqConfInfoList.push(sreqinfo)

              let drxinfo={
                id:drx['drx-profile-id'],
                drxinactivitytimer:drx['drx-inactivity-timer'],
                drxharqrttdl:drx['drx-harq-rtt-timer-dl'],
                drxharqrttul:drx['drx-harq-rtt-timer-ul'],
                drxtransmisdl:drx['drx-retransmission-timer-dl'],
                drxtransmisul:drx['drx-retransmission-timer-ul'],
                drxlongcycle:drx['drx-long-cycle'],
                SchedulingReqConfInfoList:SchedulingReqConfInfoList
              }
           
              DrxProfileIdInfolist.push(drxinfo)
              
            })
           
            let srblistInfo={
              id:1,
              Priority:du.attributes['o-ran_3gpp-nr-nrm-gnbdufunction:o-ran-configuration']['mac-configuration']['srb-config']['common-configuration-mac-parameter-list'].priority,
              AllowedServCells:du.attributes['o-ran_3gpp-nr-nrm-gnbdufunction:o-ran-configuration']['mac-configuration']['srb-config']['common-configuration-mac-parameter-list']['allowed-serv-cells'],
              srdelaytimer:du.attributes['o-ran_3gpp-nr-nrm-gnbdufunction:o-ran-configuration']['mac-configuration']['srb-config']['ul-specific-parameters-list']['logical-channel-sr-delay-timer-applied'],
              maxpuschduration:du.attributes['o-ran_3gpp-nr-nrm-gnbdufunction:o-ran-configuration']['mac-configuration']['srb-config']['ul-specific-parameters-list']['max-pusch-duration']
            }
            du.attributes['o-ran_3gpp-nr-nrm-gnbdufunction:o-ran-configuration']['mac-configuration']['qos-group-config-list']?.map((data:any)=>{
               let qosinfo={
                id:data['qos-group-index'],
                logicalchannel:data['common-configuration-mac-parameter-list']['ul-specific-parameters-list']['logical-channnel-group'],
                lgalchansrmask:data['common-configuration-mac-parameter-list']['ul-specific-parameters-list']['logical-channel-sr-mask'],
                prioritrizedbitrate:data['common-configuration-mac-parameter-list']['ul-specific-parameters-list']['prioritised-bitrate'],
                bucketsizedura:data['common-configuration-mac-parameter-list']['ul-specific-parameters-list']['bucket-size-duration'],
                lsclchansrdelay:data['common-configuration-mac-parameter-list']['ul-specific-parameters-list']['logical-channel-sr-delay-timer-applied'],
                maxulharqtx:data['common-configuration-mac-parameter-list']['ul-specific-parameters-list']['max-ul-harq-tx'],
                maxdlharqtx:data['common-configuration-mac-parameter-list']['dl-specific-parameters-list']['max-dl-harq'],
                maxpdschduration:data['common-configuration-mac-parameter-list']['dl-specific-parameters-list']['max-pdsch-duration']
              }
               qosUlInfolist.push(qosinfo)
            })
            // du.attributes['o-ran_3gpp-nr-nrm-gnbdufunction:o-ran-configuration']['mac-configuration']['qos-group-config-list']?.map((data:any)=>{
            //   let qosdldata={
            //     id:data['common-configuration-mac-parameter-list']['dl-specific-parameters-list']['max-dl-harq'],

            //   }
            //   qosDlInfolist.push(qosdldata)
            // })
            du.attributes['o-ran_3gpp-nr-nrm-gnbdufunction:o-ran-configuration']['mac-configuration']['scell-deactivation-timer-list']?.map((data:any)=>{
              let scellinfo={
                Index:data.id,
                DeactivationTimer:data['scell-deactivation-timer']
              }
              ScellDeactiveInfolist.push(scellinfo)
            })
            du['_3gpp-nr-nrm-nrsectorcarrier:NRSectorCarrier']?.map((sector:any)=>{
              let sectorinfo={
                id:`NRS-${sector.id}`,
                PriorityLabel:sector.attributes.priorityLabel,
                tXDirection:sector.attributes.txDirection,
                ConfigMaxTxPower:sector.attributes.configuredMaxTxPower,
                arfcnDL:sector.attributes.arfcnDL,
                arfcnUL:sector.attributes.arfcnUL,
                bSChannelBwDl:sector.attributes.bSChannelBwDL,
                bSChannelBwUl:sector.attributes.bSChannelBwUL
              }
              SectorCarrierlist.push(sectorinfo)
            })
            du['_3gpp-nr-nrm-bwp:BWP']?.map((bwp:any)=>{
              let bwpinfo={
                id:`BWP-${bwp.id}`,
                PriorityLabel:bwp.attributes.priorityLabel,
                bwpContext:bwp.attributes.bwpContext,
                SubCarrierSpacing:bwp.attributes.subCarrierSpacing,
                cyclePrefix:bwp.attributes.cyclicPrefix,
                startRB:bwp.attributes.startRB,
                NumberOfRBs:bwp.attributes.numberOfRBs,
                isInitiaLBwp:bwp.attributes.isInitialBwp
              }
              Bwplist.push(bwpinfo)
            })
            du['o-ran-odu-fh-management:odu-fh-management']['window-determine-method']['pre-configured-ru-profile']?.map((preru:any)=>{
              let prerulist={
                id:preru['ru-index'],
                RUIndex:preru['ru-index'],
                RUInstanceId:preru['ru-instance-id']
              }
              PreconfRUProfilelist.push(prerulist)
            })
   
            du['o-ran-odu-fh-management:odu-fh-management']['o-du-window']?.map((odu:any)=>{
        
              let PrbUlInfolist:any[]=[];
              let PrbDlInfolist:any[]=[];
              odu['prb-elem-ul'].map((prbelul:any,innerindex:number)=>{
                let prbeluldata={
                  id:`${innerindex}`,
                  ElemIndex:prbelul['elem-index'],
                  RbStart:prbelul['rb-start'],
                  RbSize:prbelul['rb-size'],
                  StartSymbol:prbelul['start-symbol'],
                  NumofSymbol:prbelul['number-of-symbol'],
                  BeamIndex:prbelul['beam-index'],
                  BfweightUpdate:prbelul['bf-weight-update'],
                  CompMethod:prbelul['comp-method'],
                  IqWidth:prbelul['iq-width'],
                  BeamForming:prbelul['beam-forming-type'],
                  ScaleFactor:prbelul['scale-factor'],
                  Remask:prbelul['re-mask']
               }
               PrbUlInfolist.push(prbeluldata)
              })
               odu['prb-elem-dl'].map((prbeldl:any,innerindex:number)=>{
                let prbeldldata={
                  id:`${innerindex}`,
                  ElemIndex:prbeldl['elem-index'],
                  RbStart:prbeldl['rb-start'],
                  RbSize:prbeldl['rb-size'],
                  StartSymbol:prbeldl['start-symbol'],
                  NumofSymbol:prbeldl['number-of-symbol'],
                  BeamIndex:prbeldl['beam-index'],
                  BfweightUpdate:prbeldl['bf-weight-update'],
                  CompMethod:prbeldl['comp-method'],
                  IqWidth:prbeldl['iq-width'],
                  BeamForming:prbeldl['beam-forming-type'],
                  ScaleFactor:prbeldl['scale-factor'],
                  Remask:prbeldl['re-mask']
               }
               PrbDlInfolist.push(prbeldldata);
              })
              let odulist={
                id:odu['ru-index-id'],
                RUIndexId:odu['ru-index-id'],
                RUInstanceId:odu['ru-instance-id'],
                Bandwidth:odu['bandwidth'],
                Subcarrierspacing:odu['subcarrier-spacing'],
                RUcpmacAddress:odu['ru-cpmac-address'],
                PrbUlInfolist:PrbUlInfolist,
                DUmacAddress:odu['du-mac-address'],
                RUupmacAddress:odu['ru-upmac-address'],
                CpvlanId:odu['cp-vlan-id'],
                UpvalnId:odu['up-vlan-id'],
                CompMethod:odu['comp-method'],
                PrbDlInfolist:PrbDlInfolist
              }
              ODUWindowDatalist.push(odulist)
            })
   
            // du['o-ran-odu-fh-management:odu-fh-management']['o-du-window']?.map((odu:any,index:number)=>{
            //    odu['prb-elem-ul'].map((prbelul:any,innerindex:number)=>{
            //     let prbelullist={
            //       id:`${index}_${innerindex}`,
            //       ElemIndex:prbelul['elem-index'],
            //       RbStart:prbelul['rb-start'],
            //       RbSize:prbelul['rb-size'],
            //       StartSymbol:prbelul['start-symbol'],
            //       NumofSymbol:prbelul['number-of-symbol'],
            //       BeamIndex:prbelul['beam-index'],
            //       BfweightUpdate:prbelul['bf-weight-update'],
            //       CompMethod:prbelul['comp-method'],
            //       IqWidth:prbelul['iq-width'],
            //       BeamForming:prbelul['beam-forming-type'],
            //       ScaleFactor:prbelul['scale-factor'],
            //       Remask:prbelul['re-mask']
            //    }
            //    PrbUlInfolist.push(prbelullist)
            //    })
            //    odu['prb-elem-dl'].map((prbeldl:any,innerindex:number)=>{
            //     let prbeldllist={
            //       id:`${index}_${innerindex}`,
            //       ElemIndex:prbeldl['elem-index'],
            //       RbStart:prbeldl['rb-start'],
            //       RbSize:prbeldl['rb-size'],
            //       StartSymbol:prbeldl['start-symbol'],
            //       NumofSymbol:prbeldl['number-of-symbol'],
            //       BeamIndex:prbeldl['beam-index'],
            //       BfweightUpdate:prbeldl['bf-weight-update'],
            //       CompMethod:prbeldl['comp-method'],
            //       IqWidth:prbeldl['iq-width'],
            //       BeamForming:prbeldl['beam-forming-type'],
            //       ScaleFactor:prbeldl['scale-factor'],
            //       Remask:prbeldl['re-mask']
            //    }
            //    PrbDlInfolist.push(prbeldllist)
               
            //    })
            // })
  
            dudata.DUIndex=du['o-ran-odu-fh-management:odu-fh-management']['du-sync-state']['du-index']
            dudata.SyncState=du['o-ran-odu-fh-management:odu-fh-management']['du-sync-state']['sync-state']
            dudata.gNBDUId=du['o-ran-odu-fh-management:odu-fh-management']['du-sync-state']['gNBDUId']
            dudata.Method=du['o-ran-odu-fh-management:odu-fh-management']['window-determine-method']['method']
            dudata.ConfigStatus=du['o-ran-odu-fh-management:odu-fh-management']['window-determine-method']['configuration-status']
            dudata.RUCount=du['o-ran-odu-fh-management:odu-fh-management']['window-determine-method']['ru-num']
            dudata.PreconfRUProfileList=PreconfRUProfilelist
            dudata.ODUWindowDataList=ODUWindowDatalist
            //dudata.PrbUlInfoList=PrbUlInfolist
           // dudata.PrbDlInfoList=PrbDlInfolist
            dudata.ta4Min=du['o-ran-odu-fh-management:odu-fh-management']['window-determine-method']['pre-configured-delay-profile']['ta4-min']
            dudata.ta4Max=du['o-ran-odu-fh-management:odu-fh-management']['window-determine-method']['pre-configured-delay-profile']['ta4-max']
            dudata.t1aMinCpDl=du['o-ran-odu-fh-management:odu-fh-management']['window-determine-method']['pre-configured-delay-profile']['t1a-min-cp-dl']
            dudata.t1aMinCpUl=du['o-ran-odu-fh-management:odu-fh-management']['window-determine-method']['pre-configured-delay-profile']['t1a-min-cp-ul']
            dudata.t1aMinUl=du['o-ran-odu-fh-management:odu-fh-management']['window-determine-method']['pre-configured-delay-profile']['t1a-min-up']
            dudata.t1aMaxCpDl=du['o-ran-odu-fh-management:odu-fh-management']['window-determine-method']['pre-configured-delay-profile']['t1a-max-cp-dl']
            dudata.t1aMaxCpUl=du['o-ran-odu-fh-management:odu-fh-management']['window-determine-method']['pre-configured-delay-profile']['t1a-max-cp-ul']
            dudata.t1aMaxUp=du['o-ran-odu-fh-management:odu-fh-management']['window-determine-method']['pre-configured-delay-profile']['t1a-max-up']
            dudata.t12Min=du['o-ran-odu-fh-management:odu-fh-management']['window-determine-method']['pre-configured-delay-profile']['t12-min']
            dudata.t12Max=du['o-ran-odu-fh-management:odu-fh-management']['window-determine-method']['pre-configured-delay-profile']['t12-max']
            dudata.t34Min=du['o-ran-odu-fh-management:odu-fh-management']['window-determine-method']['pre-configured-delay-profile']['t34-min']
            dudata.t34Max=du['o-ran-odu-fh-management:odu-fh-management']['window-determine-method']['pre-configured-delay-profile']['t34-max']
            dudata.t2aMinUp=du['o-ran-odu-fh-management:odu-fh-management']['window-determine-method']['pre-configured-delay-profile']['t2a-min-up']
            dudata.t2aMaxUp=du['o-ran-odu-fh-management:odu-fh-management']['window-determine-method']['pre-configured-delay-profile']['t2a-max-up']
            dudata.t2aMinCpDl=du['o-ran-odu-fh-management:odu-fh-management']['window-determine-method']['pre-configured-delay-profile']['t2a-min-cp-dl']
            dudata.t2aMinCpUl=du['o-ran-odu-fh-management:odu-fh-management']['window-determine-method']['pre-configured-delay-profile']['t2a-min-cp-ul']
            dudata.t2aMaxCpDl=du['o-ran-odu-fh-management:odu-fh-management']['window-determine-method']['pre-configured-delay-profile']['t2a-max-cp-dl']
            dudata.t2aMaxCpUl=du['o-ran-odu-fh-management:odu-fh-management']['window-determine-method']['pre-configured-delay-profile']['t2a-max-cp-ul']
            dudata.ta3Min=du['o-ran-odu-fh-management:odu-fh-management']['window-determine-method']['pre-configured-delay-profile']['ta3-min']
            dudata.ta3Max=du['o-ran-odu-fh-management:odu-fh-management']['window-determine-method']['pre-configured-delay-profile']['ta3-max']
            if(du['_3gpp-nr-nrm-nrcelldu:NRCellDU'])
              {
                du['_3gpp-nr-nrm-nrcelldu:NRCellDU']?.map((cell:any)=>{
                 // console.log(cell);
                  let NRCellDU={
                    id:cell.id,
                    NRPCI:cell.attributes.nRPCI,
                    NRTAC:cell.attributes.nRTAC,
                    NRSectorCarrierReflistId:`NRS-${cell.attributes.nRSectorCarrierRef[0]}`,
                    CellLocalId:cell.attributes.cellLocalId,
                    cellId:"cell"+cell.id,
                    ResourceType:cell.attributes.resourceType,
                    BwplistId:"BWP-1",
                    //BwplistId:cell.attributes.
                    //NRSectorCarrierReflistId:
                  }
                  NRCellDUList.push(NRCellDU)
                })
              // dudata.NRPCI=du['_3gpp-nr-nrm-nrcelldu:NRCellDU'][0].attributes.nRPCI
              // dudata.NRTAC=du['_3gpp-nr-nrm-nrcelldu:NRCellDU'][0].attributes.nRTAC,
              // dudata.NRSectorCarrierRef=du['_3gpp-nr-nrm-nrcelldu:NRCellDU'][0].attributes.nRSectorCarrierRef[0]
              // dudata.cellLocalId=du['_3gpp-nr-nrm-nrcelldu:NRCellDU'][0].attributes.cellLocalId
              // dudata.cellId="cell"+du['_3gpp-nr-nrm-nrcelldu:NRCellDU'][0].id,
              // dudata.nrresourceType=du['_3gpp-nr-nrm-nrcelldu:NRCellDU'][0].attributes.resourceType
              }
            dudata.NRCellDUList=NRCellDUList;
            dudata.BwpList=Bwplist;
            dudata.SectorCarrierList=SectorCarrierlist;
            // dudata.SectorconfigurationDataList=SectorCarrierlist;
            dudata.ScellDeactiveInfoList=ScellDeactiveInfolist;
            dudata.LogicalChannelSrdelayTimer=du.attributes['o-ran_3gpp-nr-nrm-gnbdufunction:o-ran-configuration']['mac-configuration']['bsr-config']['logical-channel-sr-delay-timer'];
            dudata.periodicityBsrTimer=du.attributes['o-ran_3gpp-nr-nrm-gnbdufunction:o-ran-configuration']['mac-configuration']['bsr-config']['periodicity-bsr-timer'];
            dudata.RctxBsrTimer=du.attributes['o-ran_3gpp-nr-nrm-gnbdufunction:o-ran-configuration']['mac-configuration']['bsr-config']['retx-bsr-timer'];
            dudata.phrPeriodicTimer=du.attributes['o-ran_3gpp-nr-nrm-gnbdufunction:o-ran-configuration']['mac-configuration']['phr-config']['phr-periodic-timer'];
            dudata.phrProhibitTimer=du.attributes['o-ran_3gpp-nr-nrm-gnbdufunction:o-ran-configuration']['mac-configuration']['phr-config']['phr-prohibit-timer'];
            dudata.PhrTxpowerFactorchange=du.attributes['o-ran_3gpp-nr-nrm-gnbdufunction:o-ran-configuration']['mac-configuration']['phr-config']['phr-tx-power-factor-change'];
            dudata.PhrModeOthercg=du.attributes['o-ran_3gpp-nr-nrm-gnbdufunction:o-ran-configuration']['mac-configuration']['phr-config']['phr-mode-other-cg'];
            dudata.PhrType2OtherCell=`${du.attributes['o-ran_3gpp-nr-nrm-gnbdufunction:o-ran-configuration']['mac-configuration']['phr-config']['phr-type2-othercell']}`;
 
           dudata.qoslist=qosUlInfolist;
           dudata.srblist=srblistInfo;
           dudata.DrxProfileIdInfoList=DrxProfileIdInfolist;
           dudata.EndPointList=NewEndpointInfo;
           dudata.ManagedNFServiceList=ManagedNFServicelist;
           dudata.Duid="DU "+du.id;
           duConfigdata.push(dudata)
        })
        return duConfigdata;
      }
  

  
    fetchCellStatusData = (nodeId: any) => {
    const baseUri = `${window.location.origin}`;
    const DbPath = baseUri + "/cell_status/_doc/" + nodeId;
    axios.get(DbPath).then((res: any) => {
     var  resCellStatusdata = res.data._source.cellStatusdata;
     resCellStatusdata.sort((a:any,b:any) => {
      if (""+a["cellId"]<(""+b["cellId"])) return -1;
      if (""+a["cellId"]>(""+b["cellId"])) return 1;
      return 0;
    });
    cellStatusdata=resCellStatusdata;
     //setcellStatusdata(resCellStatusdata);
    }) 
    .catch((err: { response: { data: { error: { type: string; }; }; }; message: any; }) => {
      console.log(err);
      if ( err?.response?.data?.error?.type &&  err?.response?.data?.error?.type == 'index_not_found_exception') {
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
    saveBasicConfigData = async (nodeId: any,basicdata:any) => {
      await axios.post(`${window.location.origin}` + "/basic_config/_doc/" + nodeId,
        {
          basicdata
        }).then(function (resp: any) {
          const result = resp;
        }, function (err: {
          response: any; message: any; 
        }) {
          console.log(err.message);
          if (
            err?.response?.data?.error?.type  &&      
            err?.response?.data?.error?.type == "index_not_found_exception"
          ) {
            const baseUri = `${window.location.origin}`;
            var uri4 = baseUri + "/basic_config/";
            axios
              .put(uri4)
              .then(async (res: any) => {
               // console.log(res);
                await axios.post(`${window.location.origin}` + "/basic_config/_doc/" + nodeId,
                  {
                    basicdata
                  }).then(function (resp: any) {
                    const result = resp;
                  })
              })
              .catch((err: any) => {
                console.log(err);
              });
          }
        })
    }
    saveCellConfigData = async (nodeId: any,cellConfigdata:any) => {
      await axios.post(`${window.location.origin}` + "/cell_config/_doc/" + nodeId,
        {
          cellConfigdata
        }).then(function (resp: any) {
          const result = resp;
        }, function (err: { response: any; }) {
          console.log(err.response);
          if (
            err?.response?.data?.error?.type &&
            err?.response?.data?.error?.type== "index_not_found_exception"
          ) {
            const baseUri = `${window.location.origin}`;
            var uri4 = baseUri + "/cell_config/";
            axios
              .put(uri4)
              .then(async (res: any) => {
                console.log(res);
                await axios.post(`${window.location.origin}` + "/cell_config/_doc/" + nodeId,
                  {
                    cellConfigdata
                  }).then(function (resp: any) {
                    const result = resp;
                  })
              })
              .catch((err: any) => {
                console.log(err);
              });
          }
        })
    }
    saveCellstatusData = async (nodeId: any,cellStatusdata:any) => {
      const baseUri = `${window.location.origin}`;
      const DbPath = baseUri + "/cell_status/_doc/" + nodeId;
      axios.get(DbPath).then(async (res: any) => {
        var  resCellStatusdata = res.data._source.cellStatusdata;
        for (var i=0; i < cellStatusdata.length; i++) { 
          for (var j=0; j < resCellStatusdata.length; j++) { 
             if(cellStatusdata[i].cellId==resCellStatusdata[j].cellId)
             {
              cellStatusdata[i].cellstatus = resCellStatusdata[j].cellstatus;
             }
          }
        }
        await axios.post(baseUri + "/cell_status/_doc/" + nodeId,
          {
            cellStatusdata
          }).catch((err: any) => {
            console.log(err);
          });
       }
      ).catch(async (err: any) => {
          console.log(err.message);
          if (
            err?.message?.data?.error?.type &&
            err?.message?.data?.error?.type == "index_not_found_exception"
          ) {
            var uri4 = baseUri + "/cell_status/";
            axios
              .put(uri4)
              .then(async (res: any) => {
                //console.log(res);
                await axios.post(baseUri + "/cell_status/_doc/" + nodeId,
                  {
                    cellStatusdata
                  }).then(function (resp: any) {
                    const result = resp;
                  })
              })
              .catch((err: any) => {
                console.log(err);
              });
          }
          else
          {
            await axios.post(baseUri + "/cell_status/_doc/" + nodeId,
              {
                cellStatusdata
              }).catch((err: any) => {
                console.log(err);
              });
          }
        })
    }
    saveCuupConfigData = async (nodeId: any,cuupdata:any) => {
      console.log("saveCuupConfigData eneterd")
      await axios.post(`${window.location.origin}` + "/cuup_config/_doc/" + nodeId,
        {
          cuupdata
        }).then(function (resp: any) {
          const result = resp;
        }, function (err: {
          response: any; message: any; 
        }) {
          console.log(err.message);
          if (
            err?.response?.data?.error?.type &&
            err?.response?.data?.error?.type == "index_not_found_exception"
          ) {
            const baseUri = `${window.location.origin}`;
            var uri4 = baseUri + "/cuup_config/";
            axios
              .put(uri4)
              .then(async (res: any) => {
                //console.log(res);
                await axios.post(`${window.location.origin}` + "/cuup_config/_doc/" + nodeId,
                  {
                    cuupdata
                  }).then(function (resp: any) {
                    const result = resp;
                  })
              })
              .catch((err: any) => {
                console.log(err);
              });
          }
        })
    }
    saveCucpConfigData = async (nodeId: any,cucpdata:any) => {
      console.log("saveCucpConfigData eneterd")
      await axios.post(`${window.location.origin}` + "/cucp_config/_doc/" + nodeId,
        {
          cucpdata
        }).then(function (resp: any) {
          const result = resp;
        }, function (err: {
          response: any; message: any; 
        }) {
          console.log(err.message);
          if (
            err?.response?.data?.error?.type && 
            err?.response?.data?.error?.type  == "index_not_found_exception"
          ) {
            const baseUri = `${window.location.origin}`;
            var uri4 = baseUri + "/cucp_config/";
            axios.put(uri4)
              .then(async (res: any) => {
                console.log(res);
                await axios.post(`${window.location.origin}` + "/cucp_config/_doc/" + nodeId,
                  {
                    cucpdata
                  }).then(function (resp: any) {
                    const result = resp;
                  })
              }).catch((err: any) => {
                console.log(err);
              });
          }
        })
    }
    saveDuConfigData = async (nodeId: any,duConfigdata:any) => {
      console.log("saveduConfigData eneterd")
      await axios.post(`${window.location.origin}` + "/du_config/_doc/" + nodeId,
        {
          duConfigdata
        }).then(function (resp: any) {
          const result = resp;
        }, function (err: {
          response: any; message: any; 
        }) {
          console.log(err.message);
          if (
            err?.response?.data?.error?.type && 
            err?.response?.data?.error?.type  == "index_not_found_exception"
          ) {
            const baseUri = `${window.location.origin}`;
            var uri4 = baseUri + "/du_config/";
            axios
              .put(uri4)
              .then(async (res: any) => {
                //console.log(res);
                await axios.post(`${window.location.origin}` + "/du_config/_doc/" + nodeId,
                  {
                    duConfigdata
                  }).then(function (resp: any) {
                    const result = resp;
                  })
              })
              .catch((err: any) => {
                console.log(err);
              });
          }
          
        })
    }
  
    saveCuupData = async (nodeId:any,cuupdivdata:any,cucpDbdata:any) => {
      console.log("saveCuupData eneterd")
    //alert("Data Saving");
   if(cucpDbdata!=null)
    {
      let cuupdata=this.setCuupData(cuupdivdata,cucpDbdata);
      await this.saveCuupConfigData(nodeId,cuupdata)
    }
   else
   {
    let cuupDummydata={PriorityLabel: 1};
      await this.saveCuupConfigData(nodeId,cuupDummydata);    
      let cuupDBData = ( await connectService.getCuupData("/cuup_config/_search/"+nodeId));
      let cuupUpdatedata=this.setCuupData(cuupdivdata,cuupDBData);
      await this.saveCuupConfigData(nodeId,cuupUpdatedata)
    }
   }
  

  
   saveBasicData = async (nodeId:any,basicdivdata:any,basicEsdata:any) => {
    //alert("Data Saving");
   if(basicEsdata)
    {
     let  basicdata=this.setBasicData(basicdivdata,basicEsdata);
      await this.saveBasicConfigData(nodeId,basicdata)
    }
   else
   {
      let basicDummydata={DnPrefix: 'dummy'};
      await this.saveBasicConfigData(nodeId,basicDummydata);
      setTimeout(async () => {
        let  basicEsdata = ( await connectService.getBasicData("/basic_config/_search/"+nodeId));
        let basicUpdateddata=this.setBasicData(basicdivdata,basicEsdata?.data);
        await this.saveBasicConfigData(nodeId,basicUpdateddata)
      }, 2000);
    }
   }

   saveCellData = async (nodeId:any,celldivdata:any, cellDbdata:any,rrhdata:any) => {
    //alert("Data Saving");
    if(cellDbdata!=null)
      {
       let cellConfigdata=this.setCellData(celldivdata,cellDbdata,rrhdata);
       await this.saveCellConfigData(nodeId,cellConfigdata);
       await this.saveCellstatusData(nodeId,cellStatusdata);
      }
     else
     {
        let cellConfigdata={PriorityLabel: 'dummy'};
        await this.saveCellConfigData(nodeId,cellConfigdata);
        setTimeout(async () => {
          let  cellDbdata = ( await connectService.geCellData("/cell_config/_search/"+nodeId));
        let cellUpdateddata=this.setCellData(celldivdata,cellDbdata,rrhdata);
        await this.saveCellConfigData(nodeId,cellUpdateddata);
        await this.saveCellstatusData(nodeId,cellStatusdata);
        }, 1000);
      }
   }
   saveCucpData = async (nodeId:any,cucpdivdata:any,cucpDbdata:any) => {
    console.log("saveCucpData eneterd")
  //alert("Data Saving");
  if(cucpDbdata!=null)
  {
    let cucpdata=this.setCucpData(cucpdivdata,cucpDbdata);
    await this.saveCucpConfigData(nodeId,cucpdata)
  }
  else
  {
  let cucpDummydata={DnPrefix: 'dummy'};
    await this.saveCucpConfigData(nodeId,cucpDummydata);
    setTimeout(async () => {
      let cucpDBData = ( await connectService.getCuupData("/cucp_config/_search/"+nodeId));
      let cucpUpdateddata=this.setCucpData(cucpdivdata,cucpDBData);
      await this.saveCucpConfigData(nodeId,cucpUpdateddata)
    }, 1000);
  }
  }
  
  saveDuData = async (nodeId:any,dudivdata:any,duDbdata:any) => {
    console.log("saveDuData eneterd")
  //alert("Data Saving");
  if(duDbdata!=null)
  {
    let dudata=this.setDuData(dudivdata,duDbdata);
    await this.saveDuConfigData(nodeId,dudata)
  }
  else
  {
    let duDummydata={"userLabel" : '5G gNB-DU'};
    await this.saveDuConfigData(nodeId,duDummydata);
    setTimeout(async () => {
      let duDBData = ( await connectService.getCuupData("/du_config/_search/"+nodeId));
    let duUpdateddata=this.setDuData(dudivdata,duDBData);
    await this.saveDuConfigData(nodeId,duUpdateddata)
    }, 1000);
  }
  }

  SyncDeviceData= async (rowData: any) => {
   
    this.setState({ dataloading: true });
    let nodeid: any;
    nodeid=rowData?.rowData?.id?rowData?.rowData?.id:nodeid=rowData?.id;
  
    let dataPath='/rests/data/network-topology:network-topology/topology=topology-netconf/node='+nodeid+'/yang-ext:mount?=&fields=_3gpp-common-managed-element:ManagedElement';
    let basicDbdata :any | undefined;
    let cellDbdata :any | undefined;
    let cuupDbdata :any | undefined;
    let cucpDbdata :any | undefined;
    let duDbdata :any | undefined;
    try
    {
    const basicDBData = ( await connectService.getBasicData("/basic_config/_search/"+nodeid));
    const cellDBData = ( await connectService.geCellData("/cell_config/_search/"+nodeid));
    const cuupDBData = ( await connectService.getCuupData("/cuup_config/_search/"+nodeid));
    const cucpDBData = ( await connectService.getCucpData("/cuup_config/_search/"+nodeid));
    const duDBData = ( await connectService.getDuData("/cuup_config/_search/"+nodeid));
    const restResult = ( await connectService.getConfigData(dataPath));
    basicDbdata = basicDBData.data;
    cellDbdata=cellDBData.data;
    cuupDbdata=cuupDBData.data;
    cucpDbdata= cucpDBData.data; 
    duDbdata= duDBData.data;  
    if (restResult?.data && restResult?.data['_3gpp-common-managed-element:ManagedElement']) {
     var meData=restResult?.data['_3gpp-common-managed-element:ManagedElement'][0]
     var devRRHData=restResult?.data['_3gpp-common-managed-element:ManagedElement'][0]['proprietary_gNodeB_RRH_Data_Model:RRHList'];
     await this.saveBasicData(nodeid,meData,basicDbdata);
     await this.saveCellData(nodeid,meData,cellDbdata,devRRHData);
     await this.saveCuupData(nodeid,meData,cuupDbdata);
     await this.saveCucpData(nodeid,meData,cucpDbdata);
     await this.saveDuData(nodeid,meData,duDbdata)
      //alert('values = '+ values);
      if(this.state.forceSync){
        this.setState({ dataloading: false });
       this.setState({ saveSucesopen: true });
      this.setState({ saveSucesMesg: "Sync device data successfull" });
      this.setState({ MessageType:"OK"});
      }
     else {
      setTimeout(() => {
        this.setState({ dataloading: false });
        this.props.navigateToApplication('managedelements', rowData.nodeId)
      }, 3000);
      }
    }
    else
    {
      this.setState({ dataloading: false });
      this.setState({ MessageType:"error"});
      console.log ("No Device Data")
      this.setState({ saveSucesopen: true });
      this.setState({ saveSucesMesg: "No Device Data" });
    }
  }
  catch(e)
  {
    this.setState({ MessageType:"error"});
    console.log (console.log ("Error in Sync Device Data " +e))
    this.setState({ dataloading: false });
    this.setState({ saveSucesopen: true });
    this.setState({ saveSucesMesg: "Error in Sync Device Data " +e});
  }
  };
  
  convertKeysToCamelCase(obj: any): any {
    if (Array.isArray(obj)) {
      return obj.map((item) => this.convertKeysToCamelCase(item));
    } else if (obj !== null && typeof obj === "object") {
      return Object.keys(obj).reduce((acc, key) => {
        const camelKey = key.split(":")[1]? key.split(":")[1]: key 
       // const camelKey = key.split(":")[1]? key.split(":")[1].replace(/-([a-z])/g, (g) => g[1].toUpperCase()): key.replace(/-([a-z])/g, (g) => g[1].toUpperCase()) // Convert key to camelCase
        acc[camelKey] = this.convertKeysToCamelCase(obj[key]); // Recursively process nested objects
        return acc;
      }, {} as any);
    }
    return obj;
  }

  setRUData = (rudivdata:any,rudatabaseData:any) => {
    
    //const parser = new XMLParser();
   // const json = parser.parse(rudivdata);
    const json = JSON.stringify(rudivdata)
       // syncdevicedata(restResult)
       let restResult={"rudata":json};
       console.log(json);
       return restResult;
    }
    saveRUConfigData = async (nodeId: any,rudata:any) => {
      const ruconverteddata= this.convertKeysToCamelCase(rudata);
      let ruUpdateddata= JSON.stringify(ruconverteddata.output?.data)
      await axios.post(`${window.location.origin}` + "/ru_config/_doc/" + nodeId,
        {
          //rudata : ruconverteddata?.rudata
          rudata : ruUpdateddata
        }).then(function (resp: any) {
          const result = resp;
        }, function (err: {
          response: any; message: any; 
        }) {
          console.log(err.message);
          if (
            err?.response?.data?.error?.type  &&      
            err?.response?.data?.error?.type == "index_not_found_exception"
          ) {
            const baseUri = `${window.location.origin}`;
            var uri4 = baseUri + "/ru_config/";
            axios.put(uri4).then(async (res: any) => {
                console.log(res);
                await axios.post(`${window.location.origin}` + "/ru_config/_doc/" + nodeId,
                  {
                    rudata : ruUpdateddata
                  }).then(function (resp: any) {
                    const result = resp;
                  })
              })
              .catch((err: any) => {
                console.log(err);
              });
          }
        })
    }

  saveRUData = async (nodeId:any,rudivdata:any,ruEsdata:any) => {
    //alert("Data Saving");
   if(ruEsdata)
    {
     let  rudata=this.setRUData(rudivdata,ruEsdata);
      await this.saveRUConfigData(nodeId,rudata)
    }
   else
   {
      let ruDummydata={DnPrefix: 'dummy'};
      await this.saveRUConfigData(nodeId,ruDummydata);
      setTimeout(async () => {
        let  ruEsdata = ( await connectService.getRUData("/ru_config/_search/"+nodeId));
        let ruUpdateddata=this.setRUData(rudivdata,ruEsdata?.data);
        await this.saveRUConfigData(nodeId,ruUpdateddata)
      }, 2000);
    }
   }
  
   SyncDeviceRUData= async (rowData: any) => {
   
    this.setState({ dataloading: true });
    let nodeid: any;
    nodeid=rowData?.rowData?.id?rowData?.rowData?.id:nodeid=rowData?.id;
  
    //let dataPath='/rests/data/network-topology:network-topology/topology=topology-netconf/node='+nodeid+'/yang-ext:mount';
    let dataPath='/rests/operations/network-topology:network-topology/topology=topology-netconf/node='+nodeid+'/yang-ext:mount/ietf-netconf:get-config'
    let ruDbdata :any | undefined;
    try
    {
    // const ruDBData = ( await connectService.getRUData("/ru_config/_search/"+nodeid));
    //const restResult = ( await connectService.getConfigData(dataPath));
    ruDbdata = {};
   // ruDbdata=restResult;
   const restResult = await axios.post(dataPath,
    {
        "input": {
            "source": {
              "running": null
            }
        }
    }
   ).then((res) => {
    ruDbdata = res//res;
      }).catch((err) => {
        console.log(err);
      });
    if (ruDbdata?.data && ruDbdata?.data) {
     var meData=ruDbdata?.data
//var meData = ruDbdata?.data['ietf-netconf:output']?.data;
     await this.saveRUConfigData(nodeid,meData)
      //alert('values = '+ values);
      if(this.state.forceSync){
        this.setState({ dataloading: false });
       this.setState({ saveSucesopen: true });
      this.setState({ saveSucesMesg: "Sync device data successfull" });
      this.setState({ MessageType:"OK"});
      }
     else {
      setTimeout(() => {
        this.setState({ dataloading: false });
        if(rowData.deviceType === "gNodeB"){
        this.props.navigateToApplication('managedelements', rowData.nodeId)
        }
        else{
          this.props.navigateToApplication('managedelements','ruconfig/'+ rowData.nodeId)
        }
      }, 3000);
      }
    }
    else
    {
      this.setState({ dataloading: false });
      this.setState({ MessageType:"error"});
      console.log ("No Device Data")
      this.setState({ saveSucesopen: true });
      this.setState({ saveSucesMesg: "No Device Data" });
    }
  }
  catch(e)
  {
    this.setState({ MessageType:"error"});
    console.log (console.log ("Error in Sync Device Data " +e))
    this.setState({ dataloading: false });
    this.setState({ saveSucesopen: true });
    this.setState({ saveSucesMesg: "Error in Sync Device Data " +e});
  }
  };



  private onOpenAddNetworkElementDialog = (event: React.MouseEvent<HTMLElement>, element: NetworkElementConnection) => {
    this.setState({
      networkElementToEdit: element,
      networkElementEditorMode: EditNetworkElementDialogMode.AddNewNetworkElement,
    });
  };

  private onOpenRemoveNetworkElementDialog = (event: React.MouseEvent<HTMLElement>, element: NetworkElementConnection) => {
    this.setState({
      networkElementToEdit: element,
      networkElementEditorMode: EditNetworkElementDialogMode.RemoveNetworkElement,
    });
  };

  private onOpenUploadDevicelogstDialog = (event: React.MouseEvent<HTMLElement>, element: NetworkElementConnection) => {
    this.fetchCellConfigData(element.nodeId);
    this.fetchFTPConfigData();
    this.setState({
      networkElementToEdit: element,
      RRHupLoadDailog: true,
     // networkElementEditorMode: EditNetworkElementDialogMode.UploadDevidceLogs,
    });
  };


   private onOpenEditNetworkElementDialog = async (event: React.MouseEvent<HTMLElement>, element: NetworkElementConnection) => {
      //console.log("pnfid--> ",element.nodeId);
      const baseUri=`${window.location.origin}`
          try {
          const response = await axios.get(`${baseUri}/pre_provider/_doc/${element.nodeId}`);
          //console.log(response);
          const preproviderConf = response.data._source.PREPROVIDER_CONF;
          console.log(preproviderConf)
          //console.log("preprovider conf file--> ",preproviderConf);
          this.setState({
              networkElementToEdit: {
                  nodeId: element.nodeId,
                  isRequired: element.isRequired,
                  host: element.host,
                  port: element.port,
                  username: element.username,
                  password: element.password,
                  tlsKey: element.tlsKey,
                  Pfile: preproviderConf,
              },
              networkElementEditorMode: EditNetworkElementDialogMode.EditNetworkElement,
          });
   
      } catch (error) {
          console.error('Error fetching data from Elasticsearch', error);
      }
  };

  private onOpenUnmountdNetworkElementsDialog = (event: React.MouseEvent<HTMLElement>, element: NetworkElementConnection) => {
    this.setState({
      networkElementToEdit: element,
      networkElementEditorMode: EditNetworkElementDialogMode.UnmountNetworkElement,
    });
    
  };

  private SyncDBDataWithDevice = (event: React.MouseEvent<HTMLElement>, element: NetworkElementConnection) => {
    //alert("SyncDeviceData");
    this.setState({ forceSync: true });
    if(element.deviceType === "gNodeB"){
      this.SyncDeviceData(element)
      this.saveEventAuditLog("Sync gNodeB DeviceData",element.nodeId,element.username);
    }
    else{
      this.SyncDeviceRUData(element)
      this.saveEventAuditLog("Sync Ru DeviceData",element.nodeId,element.username);
    }
    };
//   private ResetDevice = (event: React.MouseEvent<HTMLElement>, element: NetworkElementConnection) => {
//     this.setState({ MessageType:"error"});
//     this.setState({ saveSucesopen: true });
//     this.setState({ saveSucesMesg: "Do you want Reset the Device" });
//     this.saveEventAuditLog(event,element.nodeId,element.username);
//  };
 private RebootDevice = (event: React.MouseEvent<HTMLElement>, element: NetworkElementConnection) => {
       this.setState({ MessageType:"error"});
    this.setState({ saveSucesopen: true });
    this.setState({ saveSucesMesg: "Do you want Reboot  Device" });
    this.setState({currentprocess: "Reboot"})
    
    this.setState({currentnode:element.nodeId})
   }  
  private ShutdownDevice = (event: React.MouseEvent<HTMLElement>, element: NetworkElementConnection) => {
     this.setState({ MessageType:"error"});
    this.setState({ saveSucesopen: true });
    this.setState({ saveSucesMesg: "Do you want Shutdown  Device" });
    this.setState({currentprocess: "Reboot"})
    this.setState({currentnode:element.nodeId})
   
     };

     private onRedirectManagedElements = async (event: React.MouseEvent<HTMLElement>, element: NetworkElementConnection) => {
      //alert("SyncDeviceData");
      if(element.deviceType === "gNodeB"){
        const basicDBData = connectService.getBasicData("/basic_config/_search/"+element?.nodeId);
        if(!(await basicDBData)?.data){
          this.SyncDeviceData(element)
          this.setState({ forceSync: false });
          //this.props.navigateToApplication('managedelements', element.nodeId)
        }
        else{
          this.props.navigateToApplication('managedelements', element.nodeId)
        }
      }
      else{
          const ruDBData = connectService.getRUData("/ru_config/_search/"+element?.nodeId);
           if(!(await ruDBData)?.data){
           this.SyncDeviceRUData(element)
           this.setState({ forceSync: false });
          }
          else
          {
            this.props.navigateToApplication('managedelements','ruconfig/'+ element.nodeId)
          }
     
      }
            
      };
    
  private onOpenMountdNetworkElementsDialog = (event: React.MouseEvent<HTMLElement>, element: NetworkElementConnection) => {
    
    this.setState({
      networkElementToEdit: element,
      networkElementEditorMode: EditNetworkElementDialogMode.MountNetworkElement,
    });
  };

private saveEventAuditLog = (evt: any, nodeId: any, userName: any) => {
  const userToken = localStorage.getItem('userToken') || '';

  let parsedToken;
  try {
    parsedToken = userToken ? JSON.parse(userToken) : null;
  } catch (error) {
    console.error("Invalid token format:", error);
  }

  const usernameFromToken = parsedToken && parsedToken.username ? parsedToken.username : userName;

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
DeviceShutdown = async (Shutdown:string) => {
  const baseuri = `${window.location.origin}`;
  let nodeId = `${window.location.hash.split("/")[2]}`;
  const uri = `${baseuri}/rests/operations/network-topology:network-topology/topology=topology-netconf/node=${nodeId}/yang-ext:mount/ietf-system:system-shutdown`;
  const payload = {   };

  try {
    await axios.post(uri, payload);
    console.log('Shutdown request was successful');
  } catch (error) {
    console.error('Error shutting down device:', error);
  }
};
DeviceReboot = async (Reboot:string) => {
  const baseuri = `${window.location.origin}`;
  let nodeId = `${window.location.hash.split("/")[2]}`;
  //const uri = `${baseuri}/rests/data/network-topology:network-topology/topology=topology-netconf/node=O-DU-1122/yang-ext:mount/proprietary_Tejas_config:general_params`;
  const uri = `${baseuri}/rests/operations/network-topology:network-topology/topology=topology-netconf/node=${nodeId}/yang-ext:mount/ietf-system:system-restart`;
  const payload = {};

  try {
    const userToken = localStorage.getItem("userToken") || "";

                      let parsedToken;
                      try {
                        parsedToken = userToken ? JSON.parse(userToken) : null;
                      } catch (error) {
                        console.error("Invalid token format:", error);
                      }

                      const usernameFromToken =
                        parsedToken && parsedToken.access_token
                          ? parsedToken.access_token
                          : "";
                        console.log(usernameFromToken)
    await axios.post(uri, {}, {
      headers: {
          'Authorization': `Basic ${usernameFromToken}`
      }
  });
    console.log('Reboot request was successful');
  } catch (error) {
    console.error('Error Reboot down device:', error);
  }
};

  private onOpenInfoNetworkElementDialog = (event: React.MouseEvent<HTMLElement>, element: NetworkElementConnection) => {
    this.props.networkElementInfo(element.nodeId);
    this.props.networkElementFeaturesInfo(element.nodeId);
    this.setState({
      networkElementToEdit: element,
      infoNetworkElementEditorMode: InfoNetworkElementDialogMode.InfoNetworkElement,
    });
  };

  private onCloseEditNetworkElementDialog = () => {
    this.setState({
      networkElementEditorMode: EditNetworkElementDialogMode.None,
      networkElementToEdit: emptyRequireNetworkElement,
    });
  };

  private onCloseInfoNetworkElementDialog = () => {
    this.setState({
      infoNetworkElementEditorMode: InfoNetworkElementDialogMode.None,
      networkElementToEdit: emptyRequireNetworkElement,
    });
  };

  private onCloseRefreshNetworkElementsDialog = () => {
    this.setState({
      refreshNetworkElementsEditorMode: RefreshNetworkElementsDialogMode.None,
    });
  };
}
export const NetworkElementsList = withStyles(styles)(connect(mapProps, mapDispatch)(NetworkElementsListComponent));
