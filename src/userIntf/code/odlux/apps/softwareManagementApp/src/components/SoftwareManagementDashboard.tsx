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
import { Theme, Tooltip } from "@mui/material";
import { useLocation } from "react-router-dom";
import { ReactSession } from "react-client-session";
import axios from "axios";
import React, { useEffect } from "react";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
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
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
// Icons
import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ExpandMore from "@mui/icons-material/ExpandMore";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import { SelectChangeEvent } from "@mui/material";
import { Doughnut } from "react-chartjs-2";
import { WarningOutlined } from "@mui/icons-material";
import { ChartData } from "chart.js";
let nodeId = location.pathname.split("/")[2];
let activeconnectionStatusDataLoad: number[] = [0, 0, 1];
let installconnectionStatusDataLoad: number[] = [0, 0, 1];
let downloadconnectionStatusDataLoad: number[] = [0, 0, 1];
let selectedslottt : string = "";
let selectedactiveslottt :string = "";
let selectedreleaseee:string = "";
let selectedftppp:string = "";
let installtriggerrr:boolean = false;
export const  clearglobal=()=>{
  selectedslottt = "";
selectedactiveslottt ="";
 selectedreleaseee="";
 selectedftppp="";
}
export const cleardb = async (documentId: any) => {

  const baseuri = `${window.location.origin}`;
   
  try {
    await axios.delete(
      `${baseuri}/software_management/_doc/${documentId}_sw_mgnt_active`
    );
  } catch (Error) {
    console.log(Error);
  }
  try {
    await axios.delete(
      `${baseuri}/software_management/_doc/${documentId}_sw_mgnt_install`
    );
  } catch (Error) {
    console.log(Error);
  }
  try {
    await axios.delete(
      `${baseuri}/software_management/_doc/${documentId}_sw_mgnt_download`
    );
  } catch (Error) {
    console.log(Error);
  }
};


export const SoftwaremanagementDashboard = () => {
  
  let [selectedValue, setselectedValue] = useState<string>("");
  let [selectedslot, setselectedslot] = useState<string>("");
  let [ips, setips] = React.useState<any[]>([]);
  let [slot, setslot] = React.useState<any[]>([]);
  let [compatible, setcompatible] = useState<boolean>(false);
  let [Releases, setReleases] = React.useState<any[]>([]);
  let [selectedRelease, setselectedRelease] = useState<string>("");
  let [activedisplaydatastatus, setactivedisplaydatastatus] =
    useState<string>("");
  let [activedisplaydataresult, setactivedisplaydataresult] =
    useState<string>("");
  let [activedisplaydata, setactivedisplaydata] = useState<string>("");

  let [installdisplaydatastatus, setinstalldisplaydatastatus] =
    useState<string>("");
  let [installdisplaydataresult, setinstalldisplaydataresult] =
    useState<string>("");
  let [installdisplaydata, setinstalldisplaydata] = useState<string>("");

  let [downloaddisplaydatastatus, setdownloaddisplaydatastatus] =
    useState<string>("");
  let [downloaddisplaydataresult, setdownloaddisplaydataresult] =
    useState<string>("");
  let [downloaddisplaydata, setdownloaddisplaydata] = useState<string>("");

  let [Sucessmsg, setSaveSucessmsg] = useState<String>("");
  let [SaveSucesopen, setSaveSucesopen] = React.useState(false);
  let [savedialogTitle, setsavedialogTitle] = React.useState("");
  let [installtrigger, setinstalltrigger] = React.useState(false);

  let [smdata, setsmdata] = React.useState<any[]>([]);
  //let [activePanelId, setactivePanelId] = useState<string>("SMDashboard");
  let [activedslot, setactivedslot] = useState<string>("");
  let [nodeid, setnodeid] = useState<string>("");
  let [clear,setclear] =useState<string>("");
  let [current, setcurrent] = useState<string>("");
  let [RRHID, setRRHID] = useState<string>("RRH-1");
  useEffect(() => {
    nodeId = window.location.hash.split("/")[2];
    setnodeid(nodeId);
    setselectedRelease(selectedreleaseee);
    setselectedslot(selectedslottt);
    setselectedValue(selectedftppp);
    fetchsoftwaremanagementdata();
  }, []);

  useEffect(() => {
    nodeId = window.location.hash.split("/")[2];
    const interval = setInterval(() => {
      fetchData();
    }, 3000); // 3000 milliseconds = 3 seconds

    // Cleanup the interval on component unmount
    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (activedisplaydata != "") {
      if (
        activedisplaydatastatus === "STARTED" &&
        activedisplaydataresult === "SUCCESS"
      ) {
        activeconnectionStatusDataLoad = [1, 0, 0];
        if (current === "active") {
          setSaveSucesopen(true);
          setSaveSucessmsg("Software Activation Started Successfully");
          setsavedialogTitle("Success");
          setTimeout(() => {
            setSaveSucesopen(false);
          }, 1000);
          posthistory(selectedactiveslottt, activedisplaydatastatus, activedisplaydataresult, "Activate" )
        }
      } else if (
        activedisplaydatastatus === "STARTED" &&
        activedisplaydataresult === "FAILURE"
      ) {
        activeconnectionStatusDataLoad = [0, 1, 0];
        if (current === "active") {
          setSaveSucesopen(true);
          setSaveSucessmsg("Software Activation Start Failed");
          setsavedialogTitle("Warning");
          setTimeout(() => {
            setSaveSucesopen(false);
          }, 1000);
          posthistory(selectedactiveslottt, activedisplaydatastatus, activedisplaydataresult,"Activate" )
        }
      } else if (
        activedisplaydatastatus === "COMPLETED" &&
        activedisplaydataresult === "SUCCESS"
      ) {
        activeconnectionStatusDataLoad = [1, 0, 0];
        if (current === "active") {
          setSaveSucesopen(true);
          setSaveSucessmsg("Software Activated Successfully");
          setsavedialogTitle("Success");
          setTimeout(() => {
            setSaveSucesopen(false);
          }, 1000);
          posthistory(selectedactiveslottt, activedisplaydatastatus, activedisplaydataresult,"Activate" )
          fetchsoftwaremanagementdata();
        }
      } else if (
        activedisplaydatastatus === "COMPLETED" &&
        activedisplaydataresult === "FAILURE"
      ) {
        activeconnectionStatusDataLoad = [0, 1, 0];
        if (current === "active") {
          setSaveSucesopen(true);
          setSaveSucessmsg("Software Activation Failed");
          setsavedialogTitle("Warning");
          setTimeout(() => {
            setSaveSucesopen(false);
          }, 1000);
          posthistory(selectedactiveslottt, activedisplaydatastatus, activedisplaydataresult,"Activate" )
        }
      }
    } else {
      activeconnectionStatusDataLoad = [0, 0, 1];
    }

    if (installdisplaydata != "") {
      if (
        installdisplaydatastatus === "STARTED" &&
        installdisplaydataresult === "SUCCESS"
      ) {
        installconnectionStatusDataLoad = [1, 0, 0];
        if (current === "install") {
          setSaveSucesopen(true);
          setSaveSucessmsg("Software Installation Started Successfully");
          setsavedialogTitle("Success");
          setTimeout(() => {
            setSaveSucesopen(false);
          }, 1000);
          posthistory(selectedslot, installdisplaydatastatus, installdisplaydataresult,"Install" )
          
        }
      } else if (
        installdisplaydatastatus === "STARTED" &&
        installdisplaydataresult === "FAILURE"
      ) {
        installconnectionStatusDataLoad = [0, 1, 0];
        if (current === "install") {
          setSaveSucesopen(true);
          setSaveSucessmsg("Software Installation Started Failed");
          setsavedialogTitle("Warning");
          setTimeout(() => {
            setSaveSucesopen(false);
          }, 1000);
          posthistory(selectedslot, installdisplaydatastatus, installdisplaydataresult,"Install" )
        }
      } else if (
        installdisplaydatastatus === "COMPLETED" &&
        installdisplaydataresult === "SUCCESS"
      ) {
        installconnectionStatusDataLoad = [1, 0, 0];
        if (current === "install") {
          setSaveSucesopen(true);
          setSaveSucessmsg("Software Installation Completed Successfully");
          setsavedialogTitle("Success");
          setTimeout(() => {
            setSaveSucesopen(false);
          }, 1000);
          posthistory(selectedslot, installdisplaydatastatus, installdisplaydataresult,"Install" )
          fetchsoftwaremanagementdata();
        }
      } else if (
        installdisplaydatastatus === "COMPLETED" &&
        installdisplaydataresult === "FAILURE"
      ) {
        installconnectionStatusDataLoad = [0, 1, 0];
        if (current === "install") {
          setSaveSucesopen(true);
          setSaveSucessmsg("Software Installation Failed");
          setsavedialogTitle("Warning");
          setTimeout(() => {
            setSaveSucesopen(false);
          }, 1000);
          posthistory(selectedslot, installdisplaydatastatus, installdisplaydataresult,"Install" )
        }
      }
    } else {
      installconnectionStatusDataLoad = [0, 0, 1];
    }

    if (downloaddisplaydata != "") {
      if (
        downloaddisplaydatastatus === "STARTED" &&
        downloaddisplaydataresult === "SUCCESS"
      ) {
        downloadconnectionStatusDataLoad = [1, 0, 0];
        if (current === "download") {
          setSaveSucesopen(true);
          setSaveSucessmsg("Software Download Started Successfully");
          setsavedialogTitle("Success");
          setTimeout(() => {
            setSaveSucesopen(false);
          }, 1000);
          posthistory(selectedslot, downloaddisplaydatastatus, downloaddisplaydataresult, "Download" )
        }
      } else if (
        downloaddisplaydatastatus === "STARTED" &&
        downloaddisplaydataresult === "FAILURE"
      ) {
        downloadconnectionStatusDataLoad = [0, 1, 0];
        if (current === "download") {
          setSaveSucesopen(true);
          setSaveSucessmsg("Software Download Started Failed");
          setsavedialogTitle("Warning");
          setTimeout(() => {
            setSaveSucesopen(false);
          }, 1000);
          posthistory(selectedslot, downloaddisplaydatastatus, downloaddisplaydataresult,"Download" )
        }
      } else if (
        downloaddisplaydatastatus === "COMPLETED" &&
        downloaddisplaydataresult === "SUCCESS"
      ) {
        downloadconnectionStatusDataLoad = [1, 0, 0];
        if (selectedslot && selectedValue && !installtriggerrr) {
          setcurrent("install");
          install(selectedslot, selectedValue);
        }
        if (current === "download") {
          setSaveSucesopen(true);
          setSaveSucessmsg("Software Download Completed");
          setsavedialogTitle("Success");
          setTimeout(() => {
            setSaveSucesopen(false);
          }, 1000);
          posthistory(selectedslot, downloaddisplaydatastatus, downloaddisplaydataresult,"Download" )
        }
      } else if (
        downloaddisplaydatastatus === "COMPLETED" &&
        downloaddisplaydataresult === "FAILURE"
      ) {
        downloadconnectionStatusDataLoad = [0, 1, 0];
        if (current === "download") {
          setSaveSucesopen(true);
          setSaveSucessmsg("Software Download Failed");
          setsavedialogTitle("Warning");
          setTimeout(() => {
            setSaveSucesopen(false);
          }, 1000);
          posthistory(selectedslot, downloaddisplaydatastatus, downloaddisplaydataresult,"Download" )
        }
      }
    } else {
      downloadconnectionStatusDataLoad = [0, 0, 1];
    }
  }, [
    downloaddisplaydatastatus,
    installdisplaydatastatus,
    activedisplaydatastatus,
    downloaddisplaydataresult,
    activedisplaydataresult,
    installdisplaydataresult,
    clear
  ]);

  const posthistory = async(slot:string,status:string,result:string,event:string) =>{
    const baseuri = window.location.origin;
    let msg;
    if(event === 'Download'){
       msg = "Software " + event +" " + selectedRelease + " " + status ;
     
    }
    else if (event === 'Install'){
      const prevversion:any = smdata.filter((data:any)=>{
        if( data.name === selectedslottt)
        {
          return data
        }
      })
       msg = "Software " + event + " from " + prevversion[0]["build-version"] + " to " + selectedreleaseee.split('.')[0] + " " + status ;
     
    }
    else{
      const prevversion:any = smdata.filter((data:any)=>{
        if( data.status === 'VALID' && data.active && data.running)
        {
          return data
        }
      })
      const curversion:any = smdata.filter((data:any)=>{
        if( data.name === selectedactiveslottt)
        {
          return data
        }
      })
       msg = "Software " + event + " from " + prevversion[0]["build-version"] + " to " + curversion[0]["build-version"] + " " + status ;
     
    }
    axios.post(`${baseuri}/sm_history/_update/${nodeId}`, {
      script: {
        source: `
            if (ctx._source.history == null) {
              ctx._source.history = [];
            }
              ctx._source.history.add(params.data);
            
          `,
        lang: "painless",
        params: {
          data: {
            Slot: slot,
            Event: "Software " + event ,
            TimeStamp: new Date(),
            Status:status,
            Result:result,
            Error: msg,
          },
        },
      },
      upsert: {
        history: [
          {
            Slot: slot,
            Event: "Software " + event ,
            TimeStamp: new Date(),
            Status:status,
            Result:result,
            Error: msg,
          },
        ],
      },
    });
  }
  

  const fetchsoftwaremanagementdata = async () => {
    const baseuri = `${window.location.origin}`;
    const response = await axios.get(baseuri + "/system_config/_search");

    const ip = response.data.hits.hits.map((ip: any) => {
      return `sftp://${ip._source.USERNAME}:${ip._source.PASSWORD}@${ip._source.FTP_SERVER_IP}:${ip._source.FTP_FILE_PATH}`;
    });
    setips(ip);
    if(selectedftppp != ""){
      const username = selectedftppp.split("//")[1].split("@")[0].split(":")[0];
    const password = selectedftppp.split("//")[1].split("@")[0].split(":")[1];
    const host = selectedftppp.split("@")[1].split(":")[0];
    const path = selectedftppp.split("@")[1].split(":")[1];
    const json = {
      host: host,
      username: username,
      password: password,
      path: path,
    };
    axios
      .post(baseuri+"/proxyapi/listfiles", json)
      .then((res: any) => {
        var release = res.data.map((innerres: any) => {
          return innerres.name;
        }).filter((filter:string)=>{
          return filter.endsWith("tar.gz")
        });
        setReleases(release);
      });
    }
      setselectedValue(selectedftppp);
      setselectedRelease(selectedreleaseee);
      setselectedslot(selectedslottt);
    const documentId = window.location.hash.split("/")[2];
    const fetchDataFromUrl = async (url: any) => {
      try {
        const responsee = await axios.get(url);
        return responsee.data._source;
      } catch (error) {
        return null;
      }
    };

    const uri = `${baseuri}/rests/data/network-topology:network-topology/topology=topology-netconf/node=${documentId}/yang-ext:mount/o-ran-software-management:software-inventory`;
    try {
      const response1 = await axios.get(uri);
      if (response1) {
        setsmdata(
          response1.data["o-ran-software-management:software-inventory"]?.[
            "software-slot"
          ]
        );
        const slots = response1.data[
          "o-ran-software-management:software-inventory"
        ]?.["software-slot"]
          .filter((slot: any) => {
            return slot.status === "VALID" && !slot.active && !slot.running;
          })
          .map((slot: any) => {
            return slot.name;
          })
        setslot(slots);
      }
    } catch (Error) {
      console.log(Error);
    }

    try {
      const [activeData, installData, downloadData] = await Promise.all([
        fetchDataFromUrl(
          `${baseuri}/software_management/_doc/${documentId}_sw_mgnt_active`
        ),
        fetchDataFromUrl(
          `${baseuri}/software_management/_doc/${documentId}_sw_mgnt_install`
        ),
        fetchDataFromUrl(
          `${baseuri}/software_management/_doc/${documentId}_sw_mgnt_download`
        ),
      ]);

      if (activeData) {
        setactivedisplaydata(activeData);
        setactivedisplaydatastatus(activeData.Status);
        setactivedisplaydataresult(activeData.Result);
      }

      if (installData) {
        setinstalldisplaydata(installData);
        setinstalldisplaydatastatus(installData.Status);
        setinstalldisplaydataresult(installData.Result);
      }

      if (downloadData) {
        setdownloaddisplaydata(downloadData);
        setdownloaddisplaydatastatus(downloadData.Status);
        setdownloaddisplaydataresult(downloadData.Result);
      }
    } catch (error) {}
  };

  const fetchData = async () => {
    const baseuri = `${window.location.origin}`;
    const documentId = window.location.hash.split("/")[2];

    const fetchDataFromUrl = async (url: any) => {
      try {
        const response = await axios.get(url);
        return response.data._source;
      } catch (error) {
        return null;
      }
    };

    try {
      const [activeData, installData, downloadData] = await Promise.all([
        fetchDataFromUrl(
          `${baseuri}/software_management/_doc/${documentId}_sw_mgnt_active`
        ),
        fetchDataFromUrl(
          `${baseuri}/software_management/_doc/${documentId}_sw_mgnt_install`
        ),
        fetchDataFromUrl(
          `${baseuri}/software_management/_doc/${documentId}_sw_mgnt_download`
        ),
      ]);

      if (activeData) {
        setactivedisplaydata(activeData);
        if (activedisplaydatastatus != activeData.Status) {
          setactivedisplaydatastatus(activeData.Status);
        }
        if (activedisplaydataresult != activeData.Result) {
          setactivedisplaydataresult(activeData.Result);
        }
      }
      else{
        setactivedisplaydata("");
      }

      if (installData) {
        setinstalldisplaydata(installData);
        if (installdisplaydatastatus != installData.Status) {
          setinstalldisplaydatastatus(installData.Status);
        }
        if (installdisplaydataresult != installData.Result) {
          setinstalldisplaydataresult(installData.Result);
        }
      }
      else{
        setinstalldisplaydata("");
      }

      if (downloadData) {
        setdownloaddisplaydata(downloadData);
        if (downloaddisplaydatastatus != downloadData.Status) {
          setdownloaddisplaydatastatus(downloadData.Status);
        }
        if (downloaddisplaydataresult != downloadData.Result) {
          setdownloaddisplaydataresult(downloadData.Result);
        }
      }
      else{
        setdownloaddisplaydata("");
      }
    } catch (error) {}
  };
  const handleChange = (e: SelectChangeEvent<string>) => {
    selectedftppp=e.target.value
    selectedreleaseee = ""
    selectedslottt = ""
    setselectedValue(e.target.value);
    setReleases([]);
    setcompatible(false);
    setselectedRelease("")
    cleardb(window.location.hash.split('/')[2])
    setactivedisplaydata("");
    setinstalldisplaydata("");
    setdownloaddisplaydata("");
    setclear("ftp change");
    
    const baseuri = `${window.location.origin}`;
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
    axios
      .post(baseuri+"/proxyapi/listfiles", json)
      .then((res: any) => {
        var release = res.data.map((innerres: any) => {
          return innerres.name;
        }).filter((filter:string)=>{
          return filter.endsWith("tar.gz")
        });
        setReleases(release);
      });
  };

  const handleSaveSecessClose = (event: any, reason: string) => {
    event.preventDefault();
    event.stopPropagation();
    setSaveSucesopen(false);
  };

  const handleReleasesChange = (e: SelectChangeEvent<string>) => {
    selectedreleaseee=e.target.value
    selectedslottt = ""
    setselectedRelease(e.target.value);
    setcompatible(false);
    cleardb(window.location.hash.split('/')[2])
    setactivedisplaydata("");
    setinstalldisplaydata("");
    setdownloaddisplaydata("");
    setclear("release");
    
  };

  const handleslotChange = (e: SelectChangeEvent<string>) => {
    selectedslottt=e.target.value;
    setselectedslot(e.target.value);
    setcompatible(false);
    cleardb(window.location.hash.split('/')[2])
    
    setactivedisplaydata("");
    setinstalldisplaydata("");
    setdownloaddisplaydata("");
    setclear("slot");
  };

  const download = async (slotname: string, ftppath: string) => {
    const baseuri = `${window.location.origin}`;
    let nodeId = `${window.location.hash.split("/")[2]}`;
    const uri =
      baseuri +
      `/rests/operations/network-topology:network-topology/topology=topology-netconf/node=${nodeId}/yang-ext:mount/o-ran-software-management:software-download`;
    const payload = {
      "o-ran-software-management:input": {
        "remote-file-path": ftppath + "/" + selectedRelease,
      },
    };
    selectedslottt = slotname
    setinstalltrigger(false);
    installtriggerrr=false;
    setcurrent("download");
    try {
      const response = await axios.post(uri, payload);
      
    } catch (error) {}
  };

  const activeconnectionStatusData = {
    labels: ["Success", "Failure", "No Data"],
    datasets: [
      {
        labels: ["Success", "Failure", "No Data"],
        data: activeconnectionStatusDataLoad,
        backgroundColor: [
          "rgb(0, 153, 51)", // Green color for success
          "rgb(255, 102, 0)",
          "rgb(191, 191, 191)",
        ],
      },
    ],
  };

  const installconnectionStatusData = {
    labels: ["Success", "Failure", "No Data"],
    datasets: [
      {
        labels: ["Success", "Failure", "No Data"],
        data: installconnectionStatusDataLoad,
        backgroundColor: [
          "rgb(0, 153, 51)", // Green color for success
          "rgb(255, 102, 0)",
          "rgb(191, 191, 191)",
        ],
      },
    ],
  };

  const downloadconnectionStatusData = {
    labels: ["Success", "Failure", "No Data"],
    datasets: [
      {
        labels: ["Success", "Failure", "No Data"],
        data: downloadconnectionStatusDataLoad,
        backgroundColor: [
          "rgb(0, 153, 51)", // Green color for success
          "rgb(255, 102, 0)",
          "rgb(191, 191, 191)",
        ],
      },
    ],
  };

  const install = async (slotname: string, ftppath: string) => {
    const baseuri = `${window.location.origin}`;
    let nodeId = `${window.location.hash.split("/")[2]}`;
    const uri2 =
      baseuri +
      `/rests/operations/network-topology:network-topology/topology=topology-netconf/node=${nodeId}/yang-ext:mount/o-ran-software-management:software-install`;
    const payload2 = {
      "o-ran-software-management:input": {
        "slot-name": slotname,
        "file-names": [ftppath + "/" + selectedRelease],
      },
    };
    setinstalltrigger(true);
    installtriggerrr=true;
    try {
      const response = await axios.post(uri2, payload2);
      
    } catch (error) {}
  };

  const activate = async (slotname: string) => {
    const baseuri = `${window.location.origin}`;
    setactivedslot(slotname);
    let nodeId = `${window.location.hash.split("/")[2]}`;
    const uri =
      baseuri +
      `/rests/operations/network-topology:network-topology/topology=topology-netconf/node=${nodeId}/yang-ext:mount/o-ran-software-management:software-activate`;
    const payload = {
      "o-ran-software-management:input": { "slot-name": slotname },
    };
    setcurrent("active");
    selectedactiveslottt = slotname;
    try {
      const prevversion:any = smdata.filter((data:any)=>{
        if( data.name === slotname)
        {
          return data
        }
      })
      console.log(prevversion);
      !prevversion[0].active &&
      !prevversion[0].running &&
      prevversion[0].status === "VALID"
        ? await axios.post(uri, payload)
        : setSaveSucesopen(true);
      setSaveSucessmsg(
        "Software is not Installed yet... !!! Kindly install to activate"
      );
      setsavedialogTitle("Warning");
    } catch (error) {}
  };

  const resetData = async () => {
    const baseuri = `${window.location.origin}`;
    let nodeId = `${window.location.hash.split("/")[2]}`;
    const uri =
      baseuri +
      `/rests/operations/network-topology:network-topology/topology=topology-netconf/node=${nodeId}/yang-ext:mount/o-ran-software-management:software-reset`;
    const payload = {
      "o-ran-software-management:input": { "reset-enable": true },
    };

    try {
      const response = await axios.post(uri, payload);
      
    } catch (error) {}
  };

  
  return (
    <>
     
      <div
        style={{
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          border: "1px solid #ddd",
          backgroundColor: "white",
          marginTop: "1%",
          width: "100%",
        }}
      >
        <Dialog
          open={SaveSucesopen}
          onClose={handleSaveSecessClose}
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
              {savedialogTitle === "Success" ? (
                <>
                  <CheckCircleOutlineRoundedIcon style={{ color: "#008000" }} />
                  <h6
                    style={{
                      marginLeft: "3px",
                      color: "#008000",
                      textAlign: "center",
                    }}
                  >
                    {Sucessmsg}
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
                    {Sucessmsg}
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
                setSaveSucesopen(false);
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
        <Typography
          style={{
            marginTop: "2%",
            fontSize: "3vh",
            marginLeft: "2%",
            marginRight: "2%",
          }}
        >
          Software Management - {window.location.hash.split("/")[2]}-{RRHID}
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
              style={{ width: "50%", paddingRight: "2%" }}
            >
              <InputLabel id="resourceType">Select FTP IP</InputLabel>
              <Select
                labelId="Ftp Server Ip"
                id="FtpServerIp"
                label="FtpServerIp"
                value={selectedftppp}
                onChange={handleChange}
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
                {ips.length > 0 &&
                  ips.map((option: any) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>

            <FormControl
              variant="standard"
              margin="dense"
              style={{ width: "20%", paddingRight: "2%" }}
            >
              <InputLabel id="resourceType">Releases</InputLabel>
              <Select
                labelId="Select Release"
                id="Releases"
                label="Releases"
                value={selectedreleaseee}
                onChange={handleReleasesChange}
                MenuProps={{
                  PaperProps: { style: { overflow: "auto", maxHeight: 200 } },
                }}
              >
                {Releases.length > 0 &&
                  Releases.map((option: any) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>

            <FormControl
              variant="standard"
              margin="dense"
              style={{ width: "20%", paddingRight: "2%" }}
            >
              <InputLabel id="resourceType">Select Slot</InputLabel>
              <Select
                labelId="Select Slot"
                id="slot"
                label="Slot"
                value={selectedslottt}
                onChange={handleslotChange}
              >
                {slot.length > 0 &&
                  slot.map((option: any) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </div>

          <div style={{ width: "30%", display: "flex", flexDirection: "row" }}>
            <Button
              variant="contained"
              style={{
                color: "#ffffff",
                backgroundColor: "#53659c",
                width: "200px",
                marginRight: "20px",
              }}
              onClick={() => {
                cleardb(window.location.hash.split('/')[2]);
                setclear("validate")
                setactivedisplaydata("");
    setinstalldisplaydata("");
    setdownloaddisplaydata("");
                selectedRelease === ""
                  ? setcompatible(false)
                  : setcompatible(true);
              }}
            >
              Validate
            </Button>
            <Button
              variant="contained"
              style={{
                color: "#ffffff",
                backgroundColor: !compatible ? "grey" : "#53659c",
                width: "150px",
                marginRight: "20px",
              }}
              disabled={!compatible}
              onClick={() => {
                selectedslot != "" && selectedValue != ""
                  ? download(selectedslot, selectedValue)
                  : null;
              }}
            >
              Install
            </Button>
            <Button
              variant="contained"
              style={{
                color: "#ffffff",
                backgroundColor: "#53659c",
                width: "150px",
              }}
              onClick={resetData}
            >
              Reset
            </Button>
          </div>
        </div>

        <Table
          style={{
            maxHeight: "200px",

            borderRadius: "10px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            border: "1px solid #ddd",
            marginLeft: "2%",
            marginRight: "2%",
            width: "96%",
          }}
        >
          <TableCell
            style={{
              width: "100%",
              height: "200px",
              overflowY: "auto",
              overflowX: "hidden",
              padding: "0px",
            }}
          >
            <Paper
              style={{
                width: "100%",
                marginTop: "2px",
                height: "200px",
              }}
            >
              <div
                style={{
                  maxHeight: "200px",
                  overflowY: "auto",
                  borderRadius: "10px",
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
                      <TableCell align="center" style={{ width: "7%" }}>
                        Name
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
                      <TableCell align="center" style={{ width: "15%" }}>
                        Software Status
                      </TableCell>
                      <TableCell align="center" style={{ width: "15%" }}>
                        Product Code
                      </TableCell>
                      <TableCell align="center" style={{ width: "15%" }}>
                        Vendor Code
                      </TableCell>
                      <TableCell align="center" style={{ width: "15%" }}>
                        Build Version
                      </TableCell>
                      <TableCell align="center" style={{ width: "10%" }}>
                        Actions
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody style={{ zIndex: "0" }}>
                    {smdata.length > 0 &&
                      smdata.map((row: any) => (
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
                          }}
                        >
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
                              row.status == "VALID" ? (
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
                                      backgroundColor: "green",
                                      color: "white",
                                    }}
                                    onClick={(event) => {
                                      activate(row.name);
                                    }}
                                    size="small"
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
        <div
          style={{
            width: "96%",
            display: "flex",
            flexDirection: "row",
            height: "180px",
            marginTop: "1%",
            backgroundColor: "#ffffff",
            padding: "1% 2%",
            gap: "5%",
          }}
        >
          <div
            style={{
              width: "30%",
              display: "flex",
              flexDirection: "column",
              padding: "1.5% 0%",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "10px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              border: "1px solid #ddd",
              backgroundColor: "#ffffff",
              color: "black",
            }}
          >
            <Typography>
              Download Status : {"  "}
              {downloaddisplaydata !== ""
                ? `${selectedslottt} ${downloaddisplaydatastatus}`
                : "No Data"}
            </Typography>
            <Doughnut
              data={downloadconnectionStatusData}
              options={{
                maintainAspectRatio: false,
                responsive: true,
                plugins: {
                  legend: {
                    display: true,
                    position: "right", // Adjust the position of the legend as needed
                  },
                },
                cutout: "80%",
                radius: "80%",
              }} // Add the custom plugin to the chart
            />
          </div>

          <div
            style={{
              width: "30%",
              borderRadius: "10px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              border: "1px solid #ddd",
              display: "flex",
              padding: "1.5% 0%",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#ffffff",
              color: "black",
            }}
          >
            <Typography>
              Install Status :{" "}
              {installdisplaydata != "" 
                ? `${selectedslottt} ${installdisplaydatastatus}`
                : "No Data"}
            </Typography>
            <Doughnut
              data={installconnectionStatusData}
              options={{
                maintainAspectRatio: false,
                responsive: true,
                plugins: {
                  legend: {
                    display: true,
                    position: "right", // Hide the legend
                  },
                },
                cutout: "80%",
                radius: "80%",
              }}
            />
          </div>

          <div
            style={{
              width: "30%",
              borderRadius: "10px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              border: "1px solid #ddd",
              display: "flex",
              padding: "1.5% 0%",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#ffffff",
              color: "black",
            }}
          >
            <Typography>
              Active Status :{" "}
              {activedisplaydata != "" 
                ? `${selectedactiveslottt} ${activedisplaydatastatus}`
                : "No Data"}
            </Typography>
            <Doughnut
              data={activeconnectionStatusData}
              options={{
                maintainAspectRatio: false,
                responsive: true,
                plugins: {
                  legend: {
                    display: true,
                    position: "right", // Hide the legend
                  },
                },
                cutout: "80%",
                radius: "80%",
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};
