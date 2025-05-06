/***
 * ################################################################################################
 * #                                                                                              #
 * #   Copyright (C)  [2019]  [RideNext Software Solutions Pvt Ltd]. All rights  reserved         #
 * #                                                                                              #
 * ################################################################################################
 ****/

import React from "react";
import {
  TableHead,
  TextField,
  Theme,
  Tooltip,
  Table,
  TableCell,
  TableRow,
  TableBody,
  Typography,
  Paper,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { WithStyles } from "@mui/styles";
import withStyles from "@mui/styles/withStyles";
import createStyles from "@mui/styles/createStyles";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import {
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  Button,
} from "@mui/material";
import { IApplicationStoreState } from "../../../../framework/src/store/applicationStore";
import {
  connect,
  IDispatcher,
  Connect,
} from "../../../../framework/src/flux/connect";
import MaterialTable, {
  MaterialTableCtorType,
  ColumnType,
} from "../../../../framework/src/components/material-table";
import { AppBar, Tab, Tabs } from "@mui/material";
import {
  createAvaliablesoftwaremanagementServersProperties,
  createAvaliablesoftwaremanagementServersActions,
} from "../handlers/avaliableSoftwareManagementServersReloadAction";
import AddIcon from "@mui/icons-material/Add";
import Refresh from "@mui/icons-material/Refresh";
import { softwareManagementData } from "../models/SoftwareManagementServer";
import IconButton from "@mui/material/IconButton";
import { SelectChangeEvent } from "@mui/material";
import SystemUpdateIcon from "@mui/icons-material/SystemUpdate";
import axios from "axios";
import { Doughnut } from "react-chartjs-2";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import { SignalCellularNull, WarningOutlined } from "@mui/icons-material";
import {
  SoftwaremanagementDashboard,
  cleardb,
  clearglobal,
} from "../components/SoftwareManagementDashboard";
import { RefreshsoftwaremanagementDialogMode } from "../components/refreshSoftwareManagementDialog";
import { string } from "prop-types";
const styles = (theme: Theme) =>
  createStyles({
    button: {
      margin: 0,
      padding: "6px 6px",
      minWidth: "unset",
    },
    spacer: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      display: "inline",
    },
  });
let nodeId: string;
const emsTimeZone = (window as any).configs.REACT_APP_EMS_TIME_ZONE



const deviceTypeOptions = [
  { value: '', label: 'Select' },
  { value: 'gNodeB', label: 'gNodeB' },
  { value: 'RRH', label: 'RRH' },
];

console.log(emsTimeZone);
const mapProps = (state: IApplicationStoreState) => ({
  softwaremanagementServersProperties:
    createAvaliablesoftwaremanagementServersProperties(state),
});

const mapDispatch = (dispatcher: IDispatcher) => ({
  softwaremanagementServersActions:
    createAvaliablesoftwaremanagementServersActions(dispatcher.dispatch),
});

const SoftwareManagementTable = MaterialTable as MaterialTableCtorType<softwareManagementData>;

type softwaremanagementServerSelectionComponentProps = Connect<
  typeof mapProps,
  typeof mapDispatch
> &
  WithStyles<typeof styles>;

type softwaremanagementServerSelectionComponentState = {
  activePanelId: String;
  refreshsoftwaremanagementDialogMode: RefreshsoftwaremanagementDialogMode;
  selectedValue: string;
  selectedslot: string;
  ips: any[];
  slot: any[];
  compatible: boolean;
  Releases: any[];
  selectedRelease: string;
  Sucessmsg: string;
  SaveSucesopen: boolean;
  savedialogTitle: string;
  smdata: any[];
  clear: string;
  current: string;
  installtrigger:boolean;
  selectedactiveslot: string,
  popupDisplayed:boolean;
  installstatus: boolean;
  currentprocess:string;
  button:string;
  manualtrigger:boolean;
  inventoryfetched:boolean;
  abortopen:boolean;
  currenttime:number;
  supportedformats:any[];
  RRHId:string;
  rrhIdlist:any[]
  deviceType: string;
  sectorId: string;
  passiveSlot: string;
};

let initialSorted = false;

class softwaremanagementServerSelectionComponent extends React.Component<
  softwaremanagementServerSelectionComponentProps,
  softwaremanagementServerSelectionComponentState
> {
  intervalId: NodeJS.Timeout | null = null;
  constructor(props: softwaremanagementServerSelectionComponentProps) {
    super(props);

    this.state = {
      activePanelId: "SMDashboard",
      refreshsoftwaremanagementDialogMode:
        RefreshsoftwaremanagementDialogMode.None,
      selectedValue: "",
      selectedslot: "",
      selectedactiveslot: "",
      ips: [],
      slot: [],
      compatible: false,
      Releases: [],
      selectedRelease: "",
      Sucessmsg: "",
      SaveSucesopen: false,
      savedialogTitle: "",
      smdata: [],
      clear: "",
      current: "",
      installtrigger:false,
      popupDisplayed:false,
      installstatus:false, 
      currentprocess:"",
      button:"Download",
      manualtrigger:false,
      inventoryfetched:false,
      abortopen:false,
      currenttime:0,
      supportedformats:[],
      RRHId:"",
      rrhIdlist:[],
      deviceType : "",
      sectorId:"",
      passiveSlot:""
       };
  }

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

  private onHandleTabChange = (
    event: React.SyntheticEvent,
    newValue: String
  ) => {
    this.setState({ activePanelId: newValue });
    this.props.softwaremanagementServersActions.onRefresh();
  };

    extractVersion = (selectedRelease: string): string | null => {
      const versionPattern = /rel\d+\.\d+/i; 
      const match = selectedRelease.match(versionPattern);
      return match ? match[0] : null; 
    };

    handleValidate = async (isDisplaySucessMsg: boolean) => {
    if(this.state.deviceType === "RRH")
      {return true}
      const baseuri = `${window.location.origin}`;
      const DbPath  = baseuri +"/pre_provider/_search";
      const PNFID = window.location.hash.split("/")[2]
      let DeviceType ="";
      try {
        const response = await axios.post(
          DbPath,
          {
              "query": {
                "match": { "PNFID": PNFID }
              }
          },
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        DeviceType=response?.data?.hits.hits[0]?._source?.DeviceType
      } catch (error) {
        console.error("pre_provider search:", error);
      }

      const { smdata, selectedslot, selectedRelease } = this.state;

    //  const resp = await axios.get("http://localhost:3005/proxyapi/getsoftwareversionsdata")
    const resp = await axios.get(baseuri+ "/proxyapi/getsoftwareversionsdata")
    
      const selectedSlotData = smdata.find(slot => slot.name === selectedslot);
      if (selectedSlotData) {
      const buildVersion = selectedSlotData['build-version'];
      const softwareversionConfig = resp.data[0]?.software_version_Config?.filter((config: { deviceType: string; })=>config.deviceType== DeviceType)
      const enableValidation=softwareversionConfig[0].enable_software_version_check;
      
      //const coreVersion = this.extractVersion(selectedRelease);
      if (enableValidation==="true") {
        const selectedVersion = softwareversionConfig[0]?.versions?.find(
          (release: any) => release.version === buildVersion
        );
      if (selectedVersion) {
          const compatibleVersions = selectedVersion.compatibleReleases;
        if((compatibleVersions.includes("*") && compatibleVersions.length>1) || compatibleVersions?.length=== 0 || compatibleVersions==="" )
          {
            this.setState({SaveSucesopen:true});
            this.setState({Sucessmsg:`Invalid configuration for current build version ${buildVersion}`});
            this.setState({savedialogTitle:"Warning"});
          }
        else if (compatibleVersions.includes("*")) {
            console.log(`Selected release version ${selectedRelease} is compatable with any version.`);
            this.setState({compatible:true})
            this.setState({SaveSucesopen:true});
            this.setState({Sucessmsg:`Selected release version ${selectedRelease} is compatable with any version.`});
            this.setState({savedialogTitle:"Success"});
            return true;
          }
     //if (compatibleVersions.includes(coreVersion)) {
      else if (compatibleVersions.includes(selectedRelease)) {
        if(isDisplaySucessMsg)
        {
        this.setState({SaveSucesopen:true});
        this.setState({Sucessmsg:`The selected release version ${selectedRelease} is compatible with current build version ${buildVersion}.`});
        this.setState({savedialogTitle:"Success"});
        }
        this.setState({compatible:true})
        return true;
      }else {
        this.setState({SaveSucesopen:true});
        this.setState({Sucessmsg:`The selected release version ${selectedRelease} is not compatible with current build version ${buildVersion}`});
        this.setState({savedialogTitle:"Warning"});
        return false;
      }
    }else {
            this.setState({SaveSucesopen:true});
              this.setState({Sucessmsg:`selected release version ${selectedRelease} not found in the list.`});
              this.setState({savedialogTitle:"Warning"});
              return false;
          }
      }else {
            console.log(`Selected release version ${selectedRelease} is compatable with any version.`);
 	          this.setState({compatible:true})
             this.setState({SaveSucesopen:true});
             this.setState({Sucessmsg:`Selected release version ${selectedRelease} is compatable with any version.`});
             this.setState({savedialogTitle:"Success"});
             return true;
          }
    }else {
          this.setState({SaveSucesopen:true});
          this.setState({Sucessmsg:"Selected slot not found."});
          this.setState({savedialogTitle:"Warning"});
          return false;
      }
      return false;
    };


  render() {
    const refreshsoftwareLogAction = {
      icon: Refresh,
      tooltip: "Software History log",
      ariaLabel: "refresh",
      onClick: () => {
        this.props.softwaremanagementServersActions.onRefresh();
      },
    };

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
                this.setState({SaveSucesopen:false});
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
          open={this.state.abortopen}
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
  style={{ textAlign: "center", padding: "20px" }}
>
  <p style={{ fontWeight: "bold", fontSize: "16px" }}>Software Upgrade in Progress</p>
  <p>
    The process started at: 
    <span style={{ fontWeight: "bold" }}>
      {new Date(this.state.currenttime / 1000)
        .toLocaleString('en-GB', { timeZone: emsTimeZone, hour12: false })
        .replace(',', '')
        .replace(/\//g, '-')}
    </span>
  </p>
  <p>
    You may wait until: 
    <span style={{ fontWeight: "bold" }}>
      {console.log(this.state.currenttime, (this.state.currenttime + (window as any).configs.SOFTWARE_NOTIFICATION_WAIT_LIMIT * 60 * 1000000), new Date((this.state.currenttime + (window as any).configs.SOFTWARE_NOTIFICATION_WAIT_LIMIT * 60 * 1000000) / 1000)
        .toLocaleString('en-GB', { timeZone: emsTimeZone, hour12: false })
        .replace(',', '')
        .replace(/\//g, '-') )}
      {new Date((this.state.currenttime + (window as any).configs.SOFTWARE_NOTIFICATION_WAIT_LIMIT * 60 * 1000000) / 1000)
        .toLocaleString('en-GB', { timeZone: emsTimeZone, hour12: false })
        .replace(',', '')
        .replace(/\//g, '-')} 
    </span>
     &nbsp;<span style={{ fontWeight: "bold" }}>({(window as any).configs.SOFTWARE_NOTIFICATION_WAIT_LIMIT} min)</span> for it to complete.
  </p>
  <p>To Abort the process click<span style={{ fontWeight: "bold" }}> OK..</span></p>
</DialogContent>
          <DialogActions>
            <Button
              onClick={()=>this.abortData()}
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
            <Button
              onClick={()=>{
                this.setState({
                  abortopen:false
                })
              }}
              style={{
                backgroundColor: "white",
                color: "#38761d",
                border: "1px solid #2986cc",
                borderRadius: "1px",
                padding: "3px 6px",
              }}
            >
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
<div
        style={{
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          border: "1px solid #ddd",
          backgroundColor: "white",
          marginTop: "1%",
          width: "100%",
          height:'600px'
        }}
      >
        <Typography
           style={{
            marginTop: "1%",
            fontSize: "2.5vh",
            marginLeft:"1%",
            marginRight: "2%",
            marginBottom: "0.2%",
          }}
        >
          Software Management - {window.location.hash.split("/")[2]}{this.state.RRHId ? "-" +this.state.RRHId :""} {this.state.installstatus ? <span style={{color:'green',fontSize:'4vh'}}> - {this.state.currentprocess} In Progress......</span> : null }
        </Typography>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            height: "50px",
            marginTop: "1%",
            marginBottom: "2%",
            marginLeft: "2%",
            marginRight: "2%",
          }}
        >
          <div style={{ width: "70%" }}>
          <FormControl
              variant="standard"
              margin="dense"
              style={{ width: "20%", paddingRight: "1.5%" }}>
              <InputLabel id="deviceType">Device Type</InputLabel>
              <Select
                labelId="device Type"
                id="deviceType"
                label="deviceType"
                value={this.state.deviceType}
                onChange={this.handleDeviceTypeChange}
                MenuProps={{
                  PaperProps: {
                    style: {
                      minWidth: "10%",
                      maxWidth: "11%",
                      overflow: "auto",
                      maxHeight: 200,
                    },
                  },
                }}
              >
                {
                 deviceTypeOptions.map((option: any) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))
                }
              </Select>
            </FormControl>
          {this.state.deviceType=="RRH" &&  <FormControl
              variant="standard"
              margin="dense"
              style={{ width: "17%", paddingRight: "1.5%" }} >
              <InputLabel id="sectorId">Sector ID</InputLabel>
              <Select
                labelId="sectorId"
                id="sectorId"
                label="sectorId"
                value={this.state.sectorId}
                onChange={this.handleSectorIdChange}
                disabled={this.state.installstatus}
                MenuProps={{
                  PaperProps: {
                    style: {
                      minWidth: "10%",
                      maxWidth: "10%",
                      overflow: "auto",
                      maxHeight: 200,
                    },
                  },
                }}
              >
                {this.state.rrhIdlist?.length > 0 &&
                  this.state.rrhIdlist.map((option: any) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
        }

            <FormControl
              variant="standard"
              margin="dense"
              style={{ width: "25%", paddingRight: "1.5%" }} >
              <InputLabel id="resourceType">File Server</InputLabel>
              <Select
                labelId="Ftp Server Ip"
                id="FtpServerIp"
                label="FtpServerIp"
                value={this.state.selectedValue}
                onChange={this.handleChange}
                disabled={this.state.installstatus}
                MenuProps={{
                  PaperProps: {
                    style: {
                      minWidth: "30%",
                      maxWidth: "30%",
                      overflow: "auto",
                      maxHeight: 200,
                    },
                  },
                }}
              >
                {this.state.ips.length > 0 &&
                  this.state.ips.map((option: any) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>

            <FormControl
              variant="standard"
              margin="dense"
              style={{ width: "14%", paddingRight: "1.5%" }} >
              <InputLabel id="resourceType">Releases</InputLabel>
              <Select
                labelId="Select Release"
                id="Releases"
                label="Releases"
                value={this.state.selectedRelease}
                onChange={this.handleReleasesChange}
                disabled={this.state.installstatus}
                MenuProps={{
                  PaperProps: { style: { overflow: "auto", maxHeight: 200 } },
                }}
              >
                {this.state.Releases.length > 0 &&
                  this.state.Releases.map((option: any) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
            {this.state.deviceType !=="RRH" &&  <FormControl
              variant="standard"
              margin="dense"
              style={{ width: "14%", paddingRight: "1%" }} >
              <InputLabel id="resourceType"> Slot</InputLabel>
              <Select
                labelId="Select Slot"
                id="slot"
                label="Slot"
                value={this.state.selectedslot}
                disabled={this.state.installstatus}
                onChange={this.handleslotChange} >
                {this.state.slot.length > 0 &&
                  this.state.slot.map((option: any) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
            }
          </div>
            <div style={{ width: "30%", display: "flex", flexDirection: "row" }}>
            {this.state.deviceType !="RRH" &&  <Button
              variant="contained"
              style={{
                color: "#ffffff",
                backgroundColor: this.state.installstatus ? "grey" : "#53659c",
                width: "170px",
                marginRight: "10px",
              }}
              onClick={() => {
                this.setState({clear:"validate"});
                 this.state.selectedRelease === "" || (this.state.selectedslot === ""&& this.state.deviceType !="RRH")  || this.state.installstatus
                  ? this.setState({compatible:false}) 
                  : this.handleValidate(true)
                  // : this.setState({compatible:true})
              }}>
              Validate
            </Button>
              }
            <Button
              variant="contained"
              style={{
                color: "#ffffff",
                backgroundColor: !this.state.compatible || this.state.installstatus ? "grey" : "#53659c",
                width: "185px",
                marginRight: "10px",
              }}
              disabled={!this.state.compatible || this.state.installstatus}
              onClick={() => {
                this.state.selectedslot != "" && this.state.selectedValue != "" && this.state.button === 'Download'
                  ? this.download(this.state.selectedslot, this.state.selectedValue)
                  : this.state.selectedslot != "" && this.state.selectedValue != "" && this.state.button === 'Install' ? this.install(this.state.selectedslot, this.state.selectedValue) : this.state.button === 'Activate' ? this.activate(this.state.selectedslot) : null;
              }} >
              {this.state.button}
            </Button>
            
            <Button
              variant="contained"
              style={{
                color: "#ffffff",
                backgroundColor: this.state.installstatus?"grey":"#53659c",
                width: "150px",
                marginRight: "10px",
              }}
              disabled={this.state.installstatus}
              onClick={this.resetData} >
              Reset
            </Button>
            <Button
              variant="contained"
              style={{
                color: "#ffffff",
                backgroundColor: "#53659c",
                width: "150px",
              }}
              onClick={()=>{
                const aborttime = new Date().getTime()*1000
                var epochMicroseconds= null;
                const storedData = sessionStorage.getItem("smhistory-data");
                if (storedData) {
                  console.log(JSON.parse(storedData)[0]["TimeStamp"])
                  if(JSON.parse(storedData)[0]["Status"] === "STARTED" && JSON.parse(storedData)[0]["Result"] === "SUCCESS"){
                  const [day, month, yearAndTime] = JSON.parse(storedData)[0]["TimeStamp"].split("-");
                  const [year, time] = yearAndTime.split(" ");
                  const fullDateString = `${year}-${month}-${day}T${time}`;
                  const date = new Date(fullDateString);
                   epochMicroseconds = date.getTime() * 1000; // Convert milliseconds to microseconds
                  console.log(epochMicroseconds);
                  this.setState({currenttime:epochMicroseconds})
                  }
                  else{
                    this.abortData();
                  }
                } else {
                  this.abortData();
                }
                console.log(aborttime, this.state.currenttime, aborttime - this.state.currenttime)
                if( epochMicroseconds && aborttime - epochMicroseconds < (window as any).configs.SOFTWARE_NOTIFICATION_WAIT_LIMIT  * 60 * 1000000){
                  this.setState({
                    abortopen:true
                  })
                  console.log("if enetered")
                }
                else{
                  this.abortData();
                  console.log("else enetered")
                }
              }} >
              Abort
            </Button>
          </div>
          
        </div>
        
        {this.state.deviceType !="RRH" &&
        <Table
          style={{
            maxHeight: "150px",
            borderRadius: "10px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            border: "1px solid #ddd",
            width: "100%",
          }}
        >
          <TableCell
            style={{
              width: "100%",
              height: "150px",
              overflowY: "auto",
              overflowX: "hidden",
              padding: "0px",
            }}
          >
            <Paper
              style={{
                width: "100%",
                marginTop: "2px",
                height: "150px",
              }}
            >
              <div
                style={{
                  maxHeight: "150px",
                  overflowY: "auto",
                }}
              >
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
                    {/* <TableCell align="center" style={{ width: "10%" }}>
                        Device Type
                      </TableCell>
                      <TableCell align="center" style={{ width: "10%" }}>
                       Sector ID
                      </TableCell> */}
                      <TableCell align="center" style={{ width: "7%" }}>
                        Slot
                      </TableCell>
                      <TableCell align="center" style={{ width: "7%" }}>
                        Status
                      </TableCell>
                      <TableCell align="center" style={{ width: "7%" }}>
                        Active
                      </TableCell>
                      <TableCell align="center" style={{ width: "7%" }}>
                        Running
                      </TableCell>
                      <TableCell align="center" style={{ width: "12%" }}>
                        Software Status
                      </TableCell>
                      <TableCell align="center" style={{ width: "10%" }}>
                        Product Code
                      </TableCell>
                      <TableCell align="center" style={{ width: "10%" }}>
                        Vendor Code
                      </TableCell>
                      <TableCell align="center" style={{ width: "16%" }}>
                        Build Version
                      </TableCell>
                      <TableCell align="center" style={{ width: "10%" }}>
                        Actions
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody style={{ zIndex: "0" }}>
                    {this.state.smdata.length > 0 &&
                      this.state.smdata.map((row: any) => (
                        <TableRow
                          key={row.id}
                          sx={{
                            "&:nth-of-type(odd)": {
                              backgroundColor: "#d7ecff",
                            },
                            "& .MuiTableCell-root": {
                              height: "5px",
                              padding: "0",
                            },
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}  >
                          {/* <TableCell
                            align="center"
                            style={{ width: "8%", height: "40px" }}>
                            {this.state.deviceType}
                          </TableCell>

                          <TableCell
                            align="center"
                            style={{ width: "8%", height: "40px" }}>
                            {this.state.deviceType === "RRH" ? this.state.sectorId : "N/A"}
                          </TableCell> */}
                          <TableCell
                            align="center"
                            style={{ width: "7%", height: "40px" }}
                          >
                            {row.name}
                          </TableCell>
                          <TableCell
                            align="center"
                            style={{ width: "7%", height: "40px" }}
                          >
                            {row.status}
                          </TableCell>
                          <TableCell
                            align="center"
                            style={{ width: "7%", height: "40px" }}
                          >
                            <div>
                              {row.active ? (
                                <Tooltip title="Active">
                                  <DoneIcon style={{ color: "green" }} />
                                </Tooltip>
                              ) : (
                                <Tooltip title="Not Active">
                                  <CloseIcon style={{ color: "red" }} />
                                </Tooltip>
                              )}
                            </div>
                          </TableCell>
                          <TableCell
                            align="center"
                            style={{ width: "7%", height: "40px" }}
                          >
                            <div>
                              {row.running ? (
                                <Tooltip title="Active">
                                  <DoneIcon style={{ color: "green" }} />
                                </Tooltip>
                              ) : (
                                <Tooltip title="Not Active">
                                  <CloseIcon style={{ color: "red" }} />
                                </Tooltip>
                              )}
                            </div>
                          </TableCell>
                          <TableCell
                            align="center"
                            style={{ width: "15%", height: "40px" }}
                          >
                            <div>
                              {row.active &&
                              row.running &&
                              row.status == "VALID" ? (
                                <span>Active</span>
                              ) : (
                                <span>Passive</span>
                              )}
                            </div>
                          </TableCell>
                          <TableCell
                            align="center"
                            style={{ width: "15%", height: "40px" }}
                          >
                            {row["product-code"]}
                          </TableCell>
                          <TableCell
                            align="center"
                            style={{ width: "15%", height: "40px" }}
                          >
                            {row["vendor-code"]}
                          </TableCell>
                          <TableCell
                            align="center"
                            style={{ width: "15%", height: "40px" }}
                          >
                            {row["build-version"]}
                          </TableCell>
                          <TableCell
                            align="center"
                            style={{ width: "10%", height: "40px" }}
                          >
                            <div>
                              {row.active &&
                              row.running &&
                              row.status == "VALID"  ? (
                                <Tooltip disableInteractive title={"disabled"}>
                                  <Button
                                    variant="contained"
                                    style={{
                                      backgroundColor: "grey",
                                      color: "white",
                                    }}
                                    size="small"
                                    disabled={true}
                                    startIcon={
                                      <CheckCircleOutlineIcon
                                        style={{ color: "white" }}
                                      />
                                    }
                                  >
                                    Activate
                                  </Button>
                                </Tooltip>
                              ) : (
                                <Tooltip disableInteractive title={"Activate"}>
                                  <Button
                                    variant="contained"
                                    style={{
                                      backgroundColor: this.state.installstatus?"grey": "green",
                                      color: "white",
                                    }}
                                    onClick={(event) => {
                                      this.activate(row.name);
                                    }}
                                    size="small"
                                    disabled={this.state.installstatus}
                                    startIcon={
                                      <CheckCircleOutlineIcon
                                        style={{ color: "white" }}
                                      />
                                    }
                                  >
                                    Activate
                                  </Button>
                                </Tooltip>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            </Paper>
          </TableCell>
        </Table>
        }
        <SoftwareManagementTable
            stickyHeader
            title={"Events"}
            tableId={this.state.deviceType}
            idProperty={"id"}
          
            customActionButtons={[refreshsoftwareLogAction]}
            {...this.props.softwaremanagementServersActions}
            {...this.props.softwaremanagementServersProperties}
            columns={
              [
              {
                property: "deviceType",
                title: "Device Type",
                type: ColumnType.text,
                width: "12%",
                align: "left",
              },
              {
                property: "sectorID",
                title: "Sector ID",
                type: ColumnType.text,
                width: "10%",
                align: "left",
              },
              {
                property: "Slot",
                title: "Slot",
                type: ColumnType.text,
                width: "8%",
                align: "left",
              },
              {
                property: "Event",
                title: "Event",
                type: ColumnType.text,
                width: "auto",
                align: "left",
              },
              {
                property: "TimeStamp",
                title: "TimeStamp",
                width: "auto",
                type: ColumnType.text,
                align: "left",
              },
              {
                property: "Status",
                title: "Status",
                type: ColumnType.text,
                align: "left",
                width: "10%",
              },
              {
                property: "Result",
                title: "Result",
                type: ColumnType.text,
                align: "left",
                width: "10%",
              },
              {
                property: "Error",
                title: "Details",
                type: ColumnType.text,
                width: "auto",
                align: "left",
              },
            ]}
          />
      </div>
      </>
    );
  }

  public async componentDidMount() {
    this.fetchsoftwaremanagementdata();
    if (!initialSorted) {
      initialSorted = true;
      this.props.softwaremanagementServersActions.onHandleExplicitRequestSort("TimeStamp","desc");
    } else {
      this.props.softwaremanagementServersActions.onRefresh();
    }
    nodeId = window.location.hash.split("/")[2];
    this.intervalId = setInterval(() => {
      this.fetchData();
    }, 3000);
    const baseuri = window.location.origin;
    const resp = await axios.get(baseuri+ "/proxyapi/getsoftwareversionsdata")
    this.setState({supportedformats : resp?.data[0]?.supported_formats})
  }

  componentDidUpdate(prevProps:any, prevState:any) {
    const {
      current,
      selectedslot,
      selectedValue,
      installtrigger
    } = this.state;
    
    
  }
  
  public  fetchsoftwaremanagementdata = async () => {
    const baseuri = `${window.location.origin}`;
    //const response = await axios.get(baseuri + "/system_config/_search");

    const DbPath = baseuri + "/system_config/_search/";
    const query = {
      "query": {
        "match": {
          "FTP_SERVER_TYPE": "SwUpgrade",
        }
      }
    }

    const response = await axios.post(DbPath,query);

    const ip = response.data.hits.hits.map((ip: any) => {
      return `${ip._source.PROTOCOL_TYPE}://${ip._source.USERNAME}:${ip._source.PASSWORD}@${ip._source.FTP_SERVER_IP}:${ip._source.FTP_FILE_PATH}`;
    });
    this.setState({ips:ip});
    const documentId = window.location.hash.split("/")[2];
  
    const uri = `${baseuri}/rests/data/network-topology:network-topology/topology=topology-netconf/node=${documentId}/yang-ext:mount/o-ran-software-management:software-inventory`;
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
      const response1 = await axios.get(uri, {
        headers: {
            'Authorization': `Basic ${usernameFromToken}`
        }
    });
    console.log(response1)
      if (response1) {
        this.setState({smdata:
          response1.data["o-ran-software-management:software-inventory"]?.[
            "software-slot"
          ]
      });
    
        const slots = response1.data[
          "o-ran-software-management:software-inventory"
        ]?.["software-slot"]
          .filter((slot: any) => {
            return slot.status === "VALID" && !slot.active && !slot.running;
          })
          .map((slot: any) => {
            return slot.name;
          })
        this.setState({slot:slots});

        const passiveslot = response1.data[
          "o-ran-software-management:software-inventory"
        ]?.["software-slot"]
          .filter((slot: any) => {
            return slot.active==false;
          })
          .map((slot: any) => {
            return slot.name;
          })
        this.setState({passiveSlot:passiveslot[0]});
      }
    } catch (Error) {
      console.log(Error);
    }
  };

  public abortData = async () => {
    const baseuri = window.location.origin;
    try {
      // Update the status field for the download document
      await axios.post(`${baseuri}/software_management/_update/${nodeId}_download_${this.state.sectorId}`, {
        doc: {
          status: "completed",
        },
      });
  
      // Update the status field for the activate document
      await axios.post(`${baseuri}/software_management/_update/${nodeId}_activate_${this.state.sectorId}`, {
        doc: {
          status: "completed",
        },
      });
    } catch (error) {
      console.error("Error updating status in Abort:", error);
      this.setState({SaveSucesopen:true});
      this.setState({Sucessmsg:"Software Abort Failed"});
      this.setState({savedialogTitle:"Warning"});

    }

    const userToken = localStorage.getItem('userToken') || '';

    let parsedToken;
    try {
      parsedToken = userToken ? JSON.parse(userToken) : null;
    } catch (error) {
      console.error("Invalid token format:", error);
    }
  
    const usernameFromToken = parsedToken && parsedToken.username ? parsedToken.username : "";
        await axios.post(baseuri + "/auditlog/_doc",{
          "nodeId" : nodeId,
          "user" : usernameFromToken,
          "event" : "Software Upgrade aborted",
          "timestamp" : new Date()
        })
        this.setState({
          abortopen:false
        })
      }
  

  public fetchData = async () => {
    this.props.softwaremanagementServersActions.onRefresh();
    const baseuri = window.location.origin;
    let progress:boolean=false;
    try{
       await axios.get(baseuri+"/software_management/_doc/"+nodeId+"_download_"+this.state.sectorId).then(async (innerdata:any)=>{
        const part = innerdata.data._source.slot;
        const partdata = innerdata.data._source[part];
        console.log(part,partdata)

        // if( this.state.deviceType==="RRH" ){
        //   this.setState({button:"Download",compatible:true})
        // }
        if(innerdata.data._source.status === "inprogress" && partdata[0].Event === "sw_mgnt_download" && partdata[0].Status === "STARTED" && partdata[0].Result === "SUCCESS"){
          progress = true
          this.setState({currentprocess:"Download"})
        }
        else if(this.state.deviceType !=="RRH" && this.state.deviceType ===innerdata.data._source.deviceType  && partdata[0].Event === "sw_mgnt_download"  && innerdata.data._source.slot === this.state.selectedslot && innerdata.data._source.release === this.state.selectedRelease && innerdata.data._source.ftp === this.state.selectedValue && partdata[0].Status === "COMPLETED" && partdata[0].Result === "SUCCESS"){
          this.setState({button:"Install",compatible:true})
        }
        else if(this.state.deviceType ==="RRH" && this.state.deviceType ===innerdata.data._source.deviceType && this.state.sectorId== innerdata.data._source.sectorID && partdata[0].Event === "sw_mgnt_download"  && innerdata.data._source.slot === this.state.selectedslot && innerdata.data._source.release === this.state.selectedRelease && innerdata.data._source.ftp === this.state.selectedValue && partdata[0].Status === "COMPLETED" && partdata[0].Result === "SUCCESS"){
          this.setState({button:"Install",compatible:true})
        }
       else  if(this.state.deviceType ===innerdata.data._source.deviceType && this.state.deviceType==="RRH" && this.state.sectorId== innerdata.data._source.sectorID &&partdata[0].Event === "sw_mgnt_install"  && innerdata.data._source.slot === this.state.selectedslot && innerdata.data._source.release === this.state.selectedRelease && innerdata.data._source.ftp === this.state.selectedValue && partdata[0].Status === "COMPLETED" && partdata[0].Result === "SUCCESS"){
       var  res =   await axios.get(baseuri+"/software_management/_doc/"+nodeId+"_activate_"+this.state.sectorId).then(async (activatedata:any)=>{
            if( this.state.deviceType==="RRH" && this.state.sectorId== activatedata?.data?._source?.sectorID && activatedata?.data?._source[part][0]?.Event === "sw_mgnt_activate"  && activatedata?.data?._source?.slot === this.state.selectedslot && innerdata?.data?._source.release === this.state.selectedRelease && innerdata?.data?._source.ftp === this.state.selectedValue && activatedata?.data?._source[part][0]?.Status === "COMPLETED" && activatedata?.data?._source[part][0]?.Result === "SUCCESS"){
              this.setState({button:"Download",compatible:true})
            }
            else
            {
              this.setState({button:"Activate",compatible:true})
            }
          }).catch(error => {
            console.error('Error fetching data:', error);
            this.setState({button:"Activate",compatible:true})
            // Handle error
          })
          
        }
        var name="";
          if(((partdata[0].Status === 'COMPLETED' && partdata[0].Result === 'SUCCESS' && innerdata.data._source.status === "inprogress") || (partdata[0].Result === 'FAILED' && innerdata.data._source.status === "inprogress"))){
            if( partdata[0].Event.split('_')[2] === 'download' || partdata[0].Event.split('_')[2] === 'install' ){
              name = "download"
            }
            else{
              name = "activate"
            }
           await axios.post(baseuri + "/software_management/_update_by_query?conflicts=proceed", {
             script: {
                 source: "ctx._source.status = params.value",
                 lang: "painless",
                 params: {
                     value: "completed"
                 }
               },
             query: {
                 bool: {
                 must: [
                       { match: { _id: nodeId + "_" + name} }, // Ensures you update only the document with the specific ID
                       { match: { status: "inprogress" } } // Ensures you update only documents with status 'inprogress'
                     ]
                   }
                 }
           });
 
         } 
        else if(innerdata.data._source.status === "inprogress" && partdata[0].Event === "sw_mgnt_install" && partdata[0].Status === "STARTED" && partdata[0].Result === "SUCCESS"){
          progress = true
          
          this.setState({currentprocess:"Installation",inventoryfetched:false})
        }
        else if(innerdata.data._source.status === "completed" && partdata[0].Event === "sw_mgnt_install" && !this.state.inventoryfetched){
          this.fetchsoftwaremanagementdata();
          this.setState({inventoryfetched:true})
        }
        else if(innerdata.data._source.status === "completed" && partdata[0].Event === "sw_mgnt_download"  ){
          const baseuri = `${window.location.origin}`;
    const username = innerdata.data._source.ftp.split("//")[1].split("@")[0].split(":")[0];
    const password = innerdata.data._source.ftp.split("//")[1].split("@")[0].split(":")[1];
    const host = innerdata.data._source.ftp.split("@")[1].split(":")[0];
    const path = innerdata.data._source.ftp.split("@")[1].split(":")[1];
    const json = {
      host: host,
      username: username,
      password: password,
      path: path,
    };
    const selectedip = this.state.ips.find((ip:any)=>{
      return ip === innerdata.data._source.ftp
    })
    if(selectedip){
      try{
        !this.state.manualtrigger && axios
        .post( baseuri+"/proxyapi/listfiles", json)
        .then((res: any) => {
          var release = res.data.map((innerres: any) => {
            return innerres.name;
          }).filter((filter:string)=>{
            return this.state.supportedformats.some((format: any) => filter.endsWith(format))
          });
          this.setState({Releases:release});
        });
      }
      catch(Error){
        this.setState({Releases:[]})
      }
      if(this.state.deviceType ===innerdata.data._source.deviceType  && this.state.deviceType !=="RRH" && this.state.selectedValue === innerdata.data._source.ftp && this.state.selectedRelease === innerdata.data._source.release && this.state.selectedslot === innerdata.data._source.slot && partdata[0].Status === "COMPLETED" && partdata[0].Result === "SUCCESS"){
        this.setState({button:'Install',compatible:true})
      }
      if(!this.state.manualtrigger ){
        this.setState({selectedValue: innerdata.data._source.ftp, selectedslot: innerdata.data._source.slot, selectedRelease : innerdata.data._source.release})
      }
    }   
    }
    })
       
    }
    catch(Error){
    console.log(Error);
    }
    try{
      await axios.get(baseuri+"/software_management/_doc/"+nodeId+"_activate_"+this.state.sectorId).then(async(innerdata:any)=>{
        const part = innerdata.data._source.slot;
        const partdata = innerdata.data._source[part]

        if( this.state.deviceType==="RRH" && this.state.sectorId== innerdata.data._source.sectorID && partdata[0].Event === "sw_mgnt_activate"  && innerdata.data._source.slot === this.state.selectedslot  && partdata[0].Status === "COMPLETED" && partdata[0].Result === "SUCCESS"){
          this.setState({button:"Download",compatible:true})
        }
        var name=""
        if(((partdata[0].Status === 'COMPLETED' && partdata[0].Result === 'SUCCESS' && innerdata.data._source.status === "inprogress") || (partdata[0].Result === 'FAILED' && innerdata.data._source.status === "inprogress"))){
          if( partdata[0].Event.split('_')[2] === 'download' || partdata[0].Event.split('_')[2] === 'install' ){
            name = "download"
          }
          else{
            name = "activate"
          }
         await axios.post(baseuri + "/software_management/_update_by_query?conflicts=proceed", {
           script: {
               source: "ctx._source.status = params.value",
               lang: "painless",
               params: {
                   value: "completed"
               }
             },
           query: {
               bool: {
               must: [
                     { match: { _id: nodeId + "_" + name} }, // Ensures you update only the document with the specific ID
                     { match: { status: "inprogress" } } // Ensures you update only documents with status 'inprogress'
                   ]
                 }
               }
         });

       } 
        if(innerdata.data._source.status === "inprogress"){
          progress = true
          this.setState({currentprocess:"Activation"})
        }
       })
    }
    catch(Error){}
    console.log("progress",progress)
    this.setState({installstatus:progress})
  };

  public handleDeviceTypeChange = async(e: SelectChangeEvent<string>) => {
    this.setState({deviceType : e.target.value})
    this.setState({compatible:false});
    this.setState({selectedValue:""});
    this.setState({selectedRelease:""});
    this.setState({selectedslot:""});
    if(e.target.value=="RRH")
    { 
       this.fetchCellConfigData(nodeId);
      // this.setState({compatible:true})
    }
    else{
      this.setState({sectorId:"0"})
    }
    try{
      const baseuri = window.location.origin;
      await axios.get(baseuri+"/software_management/_doc/"+nodeId+"_download_"+this.state.sectorId).then((innerdata:any)=>{
        const part = innerdata.data._source.slot;
        const partdata = innerdata.data._source[part];
        if(( this.state.deviceType !=="RRH" && partdata[0].Event === "sw_mgnt_download" && innerdata.data._source.slot === this.state.selectedslot  && innerdata.data._source.release === e.target.value && innerdata.data._source.ftp === this.state.selectedValue && partdata[0].Status === "COMPLETED" && partdata[0].Result === "SUCCESS")  ){
          this.setState({button:"Install",compatible:true})
        }
        else if(this.state.deviceType==="RRH" && this.state.sectorId== innerdata.data._source.sectorID && partdata[0].Event === "sw_mgnt_install" && innerdata.data._source.slot === this.state.selectedslot  && innerdata.data._source.release === this.state.selectedRelease && innerdata.data._source.ftp === e.target.value && partdata[0].Status ==="COMPLETED" && partdata[0].Result === "SUCCESS") {
          this.setState({button:"Activate",compatible:true})
        }
        else{
          this.setState({button:"Download"})
        }
      })
    }
    catch(Error){
    }
    // else{
    //   this.setState({compatible:false})
    // }
  }

  public handleSectorIdChange = async(e: SelectChangeEvent<string>) => {
    this.setState({sectorId:e.target.value});
    try{
      const baseuri = window.location.origin;
      await axios.get(baseuri+"/software_management/_doc/"+nodeId+"_download_"+e.target.value).then((innerdata:any)=>{
        const part = innerdata.data._source.slot;
        const partdata = innerdata.data._source[part];
        if(( this.state.deviceType ==="RRH" && e.target.value== innerdata.data._source.sectorID && partdata[0].Event === "sw_mgnt_download" && innerdata.data._source.slot === this.state.selectedslot  && innerdata.data._source.release === this.state.selectedRelease && innerdata.data._source.ftp === this.state.selectedValue && partdata[0].Status === "COMPLETED" && partdata[0].Result === "SUCCESS")  ){
          this.setState({button:"Install",compatible:true})
        }
        else if(this.state.deviceType === "RRH" && e.target.value== innerdata.data._source.sectorID && partdata[0].Event === "sw_mgnt_install" && innerdata.data._source.slot === this.state.selectedslot  && innerdata.data._source.release === this.state.selectedRelease && innerdata.data._source.ftp === this.state.selectedValue && partdata[0].Status ==="COMPLETED" && partdata[0].Result === "SUCCESS") {
          this.setState({button:"Activate",compatible:true})
        }
        else{
          this.setState({button:"Download"})
        }
      }).catch(error => {
        console.error('Error fetching data:', error);
        this.setState({button:"Download"})
        // Handle error
      })
    }
    catch(Error){
    }
    //this.fetchData();
  }

  public handleChange = async(e: SelectChangeEvent<string>) => {
    this.setState({selectedValue:e.target.value});
    this.setState({Releases:[]});

    this.setState({selectedRelease:""});
    this.setState({manualtrigger:true});
    const baseuri = window.location.origin
    // try{
    //    await axios.get(baseuri+"/software_management/_doc/"+nodeId+"_download").then((innerdata:any)=>{
    //      if(innerdata.data._source.slot === this.state.selectedslot && innerdata.data._source.ftp === this.state.selectedValue && innerdata.data._source.release === this.state.selectedRelease && innerdata.data._source[innerdata.data._source.slot].Status === "COMPLETED" && innerdata.data._source[innerdata.data._source.slot].Result === "SUCCESS"){
    //       this.setState({button:'Install',compatible:true})
    //      }
    //   })}
    // catch(Error){
    // }
    try{
      await axios.get(baseuri+"/software_management/_doc/"+nodeId+"_download_"+this.state.sectorId).then((innerdata:any)=>{
        const part = innerdata.data._source.slot;
        const partdata = innerdata.data._source[part];
        if((this.state.deviceType !=="RRH" && partdata[0].Event === "sw_mgnt_download" && innerdata.data._source.slot === this.state.selectedslot  && innerdata.data._source.release === this.state.selectedRelease && innerdata.data._source.ftp === e.target.value && partdata[0].Status ==="COMPLETED" && partdata[0].Result === "SUCCESS") ){
          this.setState({button:"Install",compatible:true})
        }
        if(this.state.deviceType==="RRH" && this.state.sectorId== innerdata.data._source.sectorID && partdata[0].Event === "sw_mgnt_install" && innerdata.data._source.slot === this.state.selectedslot  && innerdata.data._source.release === this.state.selectedRelease && innerdata.data._source.ftp === e.target.value && partdata[0].Status ==="COMPLETED" && partdata[0].Result === "SUCCESS") {
          this.setState({button:"Activate",compatible:true})
        }
        else{
          this.setState({button:"Download"})
        }
      })
    }
    catch(Error){

    }
    const username = e.target.value.split("//")[1].split("@")[0].split(":")[0];
    const password = e.target.value.split("//")[1].split("@")[0].split(":")[1];
    const host = e.target.value.split("@")[1].split(":")[0];
    const path = e.target.value.split("@")[1].split(":")[1];
    const json = {
      host: host,
      username: username,
      password: password,
      path: path,
    };
    try{
      await axios
      .post(  baseuri+"/proxyapi/listfiles", json)
      .then((res: any) => {
        var release = res.data.map((innerres: any) => {
          return innerres.name;
        })
        .filter((filter:string)=>{
          return this.state.supportedformats.some((format: any) => filter.endsWith(format))
        });
        this.setState({Releases:release});
      }).catch(()=>{
        this.setState({Releases:[]})
      })
    }
    catch(Error){
      
    }
  };

  public handleSaveSecessClose = (event: any, reason: string) => {
    event.preventDefault();
    event.stopPropagation();
    this.setState({SaveSucesopen:false});
  };

  public handleReleasesChange = async(e: SelectChangeEvent<string>) => {
    this.setState({selectedRelease:e.target.value});
    if(this.state.deviceType != "RRH")
    {
      this.setState({compatible:false});
    }
    else
    {
      this.setState({compatible : true});
       const pSlot=this.state.passiveSlot;
      this.setState({selectedslot:pSlot});
    }
    this.setState({clear:"release"});
    this.setState({manualtrigger:true});
    const baseuri = window.location.origin
    // try{
    //   await axios.get(baseuri+"/software_management/_doc/"+nodeId+"_download").then((innerdata:any)=>{
    //     if(innerdata.data._source.slot === this.state.selectedslot && innerdata.data._source.ftp === this.state.selectedValue && innerdata.data._source.release === this.state.selectedRelease && innerdata.data._source.release === this.state.selectedRelease && innerdata.data._source[innerdata.data._source.slot].Status === "COMPLETED" && innerdata.data._source[innerdata.data._source.slot].Result === "SUCCESS"){
    //      this.setState({button:'Install',compatible:true})
    //     }
    //  })}catch(Error){

    //  }
    try{
      await axios.get(baseuri+"/software_management/_doc/"+nodeId+"_download_"+this.state.sectorId).then((innerdata:any)=>{
        const part = innerdata.data._source.slot;
        const partdata = innerdata.data._source[part];
        if((this.state.deviceType ===innerdata.data._source.deviceType && this.state.deviceType !=="RRH" && partdata[0].Event === "sw_mgnt_download" && innerdata.data._source.slot === this.state.selectedslot  && innerdata.data._source.release === e.target.value && innerdata.data._source.ftp === this.state.selectedValue && partdata[0].Status === "COMPLETED" && partdata[0].Result === "SUCCESS")  ){
          this.setState({button:"Install",compatible:true})
        }
        else if(this.state.deviceType ===innerdata.data._source.deviceType && this.state.deviceType==="RRH" && this.state.sectorId== innerdata.data._source.sectorID && partdata[0].Event === "sw_mgnt_install" && innerdata.data._source.slot === this.state.selectedslot  && innerdata.data._source.release === this.state.selectedRelease && innerdata.data._source.ftp === e.target.value && partdata[0].Status ==="COMPLETED" && partdata[0].Result === "SUCCESS") {
          this.setState({button:"Activate",compatible:true})
        }
        else{
          this.setState({button:"Download"})
        }
      })
    }
    catch(Error){
    }
    
  };

  public handleslotChange = async (e: SelectChangeEvent<string>) => {
    this.setState({selectedslot:e.target.value});
    this.setState({compatible:false});
    this.setState({clear:"slot"});
    this.setState({manualtrigger:true});
    const baseuri = window.location.origin;
    try{
      await axios.get(baseuri+"/software_management/_doc/"+nodeId+"_download_"+this.state.sectorId).then((innerdata:any)=>{
        if(this.state.deviceType !=="RRH" && innerdata.data._source.slot === this.state.selectedslot && innerdata.data._source.ftp === this.state.selectedValue && innerdata.data._source.release === this.state.selectedRelease && innerdata.data._source.release === this.state.selectedRelease && innerdata.data._source[innerdata.data._source.slot].Status === "COMPLETED" && innerdata.data._source[innerdata.data._source.slot].Result === "SUCCESS"){
         this.setState({button:'Install',compatible:true})
        }
     })}catch(Error){
      
     }
    try{
      await axios.get(baseuri+"/software_management/_doc/"+nodeId+"_download_"+this.state.sectorId).then((innerdata:any)=>{
        const part = innerdata.data._source.slot;
        const partdata = innerdata.data._source[part];
        if((this.state.deviceType ===innerdata.data._source.deviceType && this.state.deviceType !=="RRH" && partdata[0].Event === "sw_mgnt_download"  && innerdata.data._source.slot === e.target.value && innerdata.data._source.release === this.state.selectedRelease && innerdata.data._source.ftp === this.state.selectedValue && partdata[0].Status === "COMPLETED" && partdata[0].Result === "SUCCESS")){
          this.setState({button:"Install",compatible:true})
        }
        else if(this.state.deviceType ===innerdata.data._source.deviceType && this.state.deviceType==="RRH" && this.state.sectorId== innerdata.data._source.sectorID && partdata[0].Event === "sw_mgnt_install" && innerdata.data._source.slot === this.state.selectedslot  && innerdata.data._source.release === this.state.selectedRelease && innerdata.data._source.ftp === e.target.value && partdata[0].Status ==="COMPLETED" && partdata[0].Result === "SUCCESS") {
          this.setState({button:"Activate",compatible:true})
        }
        else{
          this.setState({button:"Download"})
        }
      })
    }
    catch(Error){
    }
    
  };

  public download = async (slotname: string, ftppath: string) => {
    if( await this.handleValidate(false))
    {
      const transactionId = Math.floor(1000+Math.random() * 9000)
    const baseuri = `${window.location.origin}`;
    let nodeId = `${window.location.hash.split("/")[2]}`;
    const username = ftppath.split("//")[1].split("@")[0].split(":")[0];
    const password = ftppath.split("//")[1].split("@")[0].split(":")[1];
    const host_ip = ftppath.split("@")[1].split(":")[0];
    const ftp_dir = ftppath.split("@")[1].split(":")[1];
    const protocolType =  ftppath.split(':')[0];
    const ftp_path = protocolType+"://"+username+"@"+host_ip+':'+ftp_dir
    const uri = baseuri + `/rests/operations/network-topology:network-topology/topology=topology-netconf/node=${nodeId}/yang-ext:mount/o-ran-software-management:software-download`;
    const gNBpayload = {
      "o-ran-software-management:input": {
        "remote-file-path": ftp_path + "/" + this.state.selectedRelease,
        "password": {
          "password":password
        }
      },
    };

    const RRHpayload = {
      "o-ran-software-management:input" : { 
         "remote-file-path": ftp_path + "/" + this.state.selectedRelease,
         "password": {"password":password },
         "sector-id":  this.state.sectorId ,
         "transaction-id": transactionId ,
         "device-type": this.state.deviceType 
       }
     }

     const payload = this.state.deviceType=="RRH"? RRHpayload :gNBpayload

    const prevversion:any = this.state.smdata.filter((data:any)=>{
      if( data.status === "VALID" && data.running && data.active)
      {
        return data
      }
    })
    try{
      const pSlot=this.state.passiveSlot;
      await axios.post(baseuri + "/software_management/_doc/" + nodeId+"_download_"+this.state.sectorId,{
        deviceType : this.state.deviceType,
        sectorID : this.state.sectorId,
        ftp: ftppath,
        release : this.state.selectedRelease,
        slot: this.state.deviceType !="RRH" ? slotname :pSlot,
        curversion:this.state.selectedRelease && this.state.selectedRelease.split('.')[0]? this.state.selectedRelease.split('.')[0]:"",
        prevversion: prevversion[0] && prevversion[0]["build-version"]? prevversion[0]["build-version"] :"",
        status : "inprogress",
      })

      try {
            let response:any;
            response = await axios.post(uri, payload);
            
          } catch (error) {
            console.log(">>>> 1"+error);

            this.setState({SaveSucesopen:true});
            this.setState({Sucessmsg:"Software Download Failed"});
            this.setState({savedialogTitle:"Warning"});

          }
          const userToken = localStorage.getItem('userToken') || '';
          let parsedToken;
          try {
            parsedToken = userToken ? JSON.parse(userToken) : null;
          } catch (error) {
            console.error("Invalid token format:", error);
          }
          const usernameFromToken = parsedToken && parsedToken.username ? parsedToken.username : "";
              await axios.post(baseuri + "/auditlog/_doc",{
                "nodeId" : nodeId,
                "user" : usernameFromToken,
                "event" : "Software Download",
                "timestamp" : new Date()
              })
        }
        catch(error){
          console.log(">>>> 2"+error);
        }
      }
      };

  public install = async (slotname: string, ftppath: string) => {
    const baseuri = `${window.location.origin}`;
    let nodeId = `${window.location.hash.split("/")[2]}`;
    const transactionId = Math.floor(1000+Math.random() * 9000)
    const uri2 =
      baseuri +
      `/rests/operations/network-topology:network-topology/topology=topology-netconf/node=${nodeId}/yang-ext:mount/o-ran-software-management:software-install`;
    const gNBpayload = {
      "o-ran-software-management:input": {
        "slot-name": slotname,
        "file-names": [this.state.selectedRelease],
      },
    };
    const RRHpayload = {
      "o-ran-software-management:input" : { 
        "slot-name": slotname,
        "file-names": [this.state.selectedRelease],
         "sector-id":  this.state.sectorId ,
         "transaction-id": transactionId ,
         "device-type": this.state.deviceType 
       }
     }

    const payload = this.state.deviceType=="RRH"? RRHpayload :gNBpayload

    this.setState({installtrigger:true,current:"install"});
    await axios.post(`${baseuri}/software_management/_update/${nodeId}_download_${this.state.sectorId}`, {
      script: {
          source: `
              ctx._source.status = params.status;
          `,
          lang: 'painless',
          params: {
              status: "inprogress"
          }
      }
    });
    const userToken = localStorage.getItem('userToken') || '';
  
    let parsedToken;
    try {
      parsedToken = userToken ? JSON.parse(userToken) : null;
    } catch (error) {
      console.error("Invalid token format:", error);
    }
  
    const usernameFromToken = parsedToken && parsedToken.username ? parsedToken.username : "";
    await axios.post(baseuri + "/auditlog/_doc",{
      "nodeId" : nodeId,
      "user" : usernameFromToken,
      "event" : "Software Install",
      "timestamp" : new Date()
    })
      try {
        const response = await axios.post(uri2, payload);
        
      } catch (error) {
        console.log("<<< Install failed"+ error)
        this.setState({SaveSucesopen:true});
        this.setState({Sucessmsg:"Software Install Failed"});
        this.setState({savedialogTitle:"Warning"});
      }
    };

  public activate = async (slotname: string) => {
    const baseuri = `${window.location.origin}`;
    this.setState({selectedactiveslot:slotname});
    let nodeId = `${window.location.hash.split("/")[2]}`;
    const transactionId = Math.floor(1000+Math.random() * 9000)
    const uri =
      baseuri +
      `/rests/operations/network-topology:network-topology/topology=topology-netconf/node=${nodeId}/yang-ext:mount/o-ran-software-management:software-activate`;
    const gNBpayload = {
      "o-ran-software-management:input": { "slot-name": slotname },
    };

    const RRHpayload = {
      "o-ran-software-management:input" : { 
        "slot-name": slotname,
         "sector-id":  this.state.sectorId ,
         "transaction-id": transactionId ,
         "device-type": this.state.deviceType 
       }
     }

    const payload = this.state.deviceType=="RRH"? RRHpayload :gNBpayload

    const prevversion:any = this.state.smdata.filter((data:any)=>{
      if( data.status === 'VALID' && data.active && data.running)
      {
        return data
      }
    })
    const curversion:any = this.state.smdata.filter((data:any)=>{
      if( data.name === slotname)
      {
        return data
      }
    })
    try{
      const userToken = localStorage.getItem('userToken') || '';

      let parsedToken;
      try {
        parsedToken = userToken ? JSON.parse(userToken) : null;
      } catch (error) {
        console.error("Invalid token format:", error);
      }
    
      const usernameFromToken = parsedToken && parsedToken.username ? parsedToken.username : "";
          await axios.post(baseuri + "/auditlog/_doc",{
            "nodeId" : nodeId,
            "user" : usernameFromToken,
            "event" : "Software Activate",
            "timestamp" : new Date()
          })
      await axios.post(baseuri + "/software_management/_doc/" + nodeId+"_activate_"+this.state.sectorId,{
        deviceType : this.state.deviceType,
        sectorID : this.state.sectorId,
        slot: slotname,
        curversion:this.state.deviceType !="RRH"? curversion[0]["build-version"]: "",
        prevversion:this.state.deviceType !="RRH"? prevversion[0]["build-version"]: "",
        status : "inprogress",
      }).then(async ()=>{
        try {
          const prevversion:any = this.state.smdata.filter((data:any)=>{
            if( data.name === slotname)
            {
              return data
            }
          })
          if(this.state.deviceType !="RRH")
          {
            !prevversion[0].active &&
            !prevversion[0].running &&
            prevversion[0].status === "VALID"
              ? await axios.post(uri, payload)
              : this.setState({SaveSucesopen:true});
              this.setState({Sucessmsg:"Software is not Installed yet... !!! Kindly install to activate"});
              this.setState({savedialogTitle:"Warning"});
          } 
          else
          {
          var res =  await axios.post(uri, payload)
          console.log("RRH SW Active  " + res);
          }
        }
      catch (error) {
        console.log("<<< activate failed"+ error)
        this.setState({SaveSucesopen:true});
        this.setState({Sucessmsg:"Software Activate Failed"});
        this.setState({savedialogTitle:"Warning"});
      }
      })
    }
    catch(error){
      console.log(error)
    }
  };

  public resetData = async () => {
    const baseuri = `${window.location.origin}`;
    let nodeId = `${window.location.hash.split("/")[2]}`;
    const transactionId = Math.floor(1000+Math.random() * 9000)
    const uri =
      baseuri +
      `/rests/operations/network-topology:network-topology/topology=topology-netconf/node=${nodeId}/yang-ext:mount/o-ran-software-management:software-reset`;
    const gNBpayload = {
      "o-ran-software-management:input": { "reset-enable": true },
    };

    const RRHpayload = {
      "o-ran-software-management:input": { "reset-enable": true },
      "sector-id":  this.state.sectorId ,
      "transaction-id": transactionId ,
      "device-type": this.state.deviceType
    };

    const payload = this.state.deviceType=="RRH"? RRHpayload :gNBpayload
    try {
      const response = await axios.post(uri, payload);
      
    } catch (error) {
      console.log("<<< Reset failed"+ error)
      this.setState({SaveSucesopen:true});
      this.setState({Sucessmsg:"Software Reset Failed"});
      this.setState({savedialogTitle:"Warning"});
    }
  };

  public async componentWillUnmount() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}

export const softwaremanagementServerSelection = withStyles(styles)(
  connect(mapProps, mapDispatch)(softwaremanagementServerSelectionComponent)
);
export default softwaremanagementServerSelection;
