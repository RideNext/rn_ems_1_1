/**
 * ============LICENSE_START========================================================================
 * ONAP : ccsdk feature sdnr wt odlux
 *
 * =================================================================================================
 * Copyright (C) 2024 RideNext Software Solutions. Pvt Ltd.  All rights reserved
 * =================================================================================================
 */
import { useMemo, useRef, useState } from "react";
//import React from 'react';
import { useLocation } from "react-router-dom";
import axios from "axios";
import React, { useEffect } from "react";
import {
  AppBar,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Tab,
  Tabs,
  TextField,
  Tooltip,
  createTheme,
} from "@mui/material";
import { TreeItem, TreeView } from "@mui/lab";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
// import FormControl from '@mui/material/FormControl';
import Select from "@mui/material/Select";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import {
  ChevronLeft,
  ChevronRight,
  ExpandLess,
} from "@mui/icons-material";
import debounce from "lodash.debounce";
import SearchIcon from "@mui/icons-material/Search";
import Form from "@rjsf/core";
import { IChangeEvent } from "@rjsf/core";
import schemaa from "./jsonparsing";
import { RJSFSchema, ValidatorType } from "@rjsf/utils";
import { SetSelectedValue } from "actions/deviceActions";


const uiSchema = {
  priority: {
    "ui:widget": "updown",
  },
};
//const sortedproperties = [schemaa.properties]?.sort((a:any, b:any) => a.name.localeCompare(b.name));

//const properties  = schemaa.properties;

const sortedproperties = (Object as any).fromEntries(
  Object.entries(schemaa.properties).sort(([key1], [key2]) => key1.localeCompare(key2))
);


function sortObjectKeys(obj: any): any {
  if (typeof obj !== "object" || obj === null) return obj;

  return (Object as any).fromEntries(
    Object.entries(obj)
      .sort(([key1], [key2]) => key1.localeCompare(key2))
      .map(([key, value]) => [key, sortObjectKeys(value)]) // Recursively sort nested objects
  );
}

const sortedSchema = sortObjectKeys(schemaa.properties);
console.log("sortedSshema :" + sortedSchema);

//const propertiesorg =schemaa.properties;
const properties = sortedSchema;
let currentexpansion: any = [];
let changedFields: any = [];
let originalValues: any = [];
let textallNodeIds = "";

// const { XMLParser } = require("fast-xml-parser");

export const RuConfig = () => {
  const dummyValidator: ValidatorType<any, RJSFSchema, any> = {
    toErrorList: () => [], // No errors
    isValid: () => true, // Always valid
    rawValidation: () => ({ errors: [], errorSchema: {} }), // No validation errors
    validateFormData: () => ({ errors: [], errorSchema: {} }), // No validation errors
  };

  let maindata = {};
  // Object.keys(schemaa.properties)
  //   .filter((key) => schemaa.properties[key].type !== "array")
  //   .forEach((key) => (maindata[key] = schemaa.properties[key]));

  Object.keys(properties)
    .filter((key) => properties[key]?.type !== "array")
    .forEach((key) => (maindata[key] = properties[key]));

  const [currentProperties, setCurrentProperties] = useState(maindata);
  const [currentStructure, setCurrentStructure] = useState("tabs");
  const [currentSelection, setCurrentSelection] = useState("");
  let [currentSelectiondata, setCurrentSelectiondata] = useState<any>([]);
  const [formattedEsdata, setformattedEsdata] = useState({});
  let [errors, setErrors] = useState<any>([]);
  // let [changedFields, setchangedFields] = useState<any>([]);
  const [showSubmitButton, setShowSubmitButton] = useState(true);
  const [isExpanded, setIsExpanded] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const [searchTxtValue, setSearchTxtValue] = useState("");
  // const [deviceId, setdeviceId] = useState("RU_123");
  const [deviceStatus, setdeviceStatus] = useState("Connected");
  const [isTreeExpandedAll, setisTreeExpandedAll] = useState(false);
  const [selectedTreeItem, setSelectedTreeItem] = useState("");
  const [ruData, setruData] = useState("");
  const [render, setrender] = useState(false);

  let expallNodeIds: any = [];

  let seldata = [];
  let selSchema = [];


  const inputRef = useRef();
  let deviceId = window?.location?.href?.split("/")[window.location.href.split("/")?.length - 1];


  const handleSubmit = async (data: IChangeEvent) => {
    const { formData } = data;
    if (errors?.length > 0) {
      console.log("Please provide valid inputs ...");
      alert("Please provide valid inputs ...!");
    } else {
      console.log("Form submitted with data:", formData);
      alert("Form submitted with data: " + JSON.stringify(formData));
    }
    // const formattedEsdata = {
    //   ...esdata,
    //   [currentSelection]: formData
    // };
    // const esResponse = await axios.post('http://192.168.129.70:9200/json_schema_validator/_doc/test', formattedEsdata );
    // setesdata(formattedEsdata)
    // console.log(esResponse)

  };

  const syncdevicedata = async (restResult1) => {
    let basicdata = {};
    let nonbasicdata = {};
    let restResult = { data: restResult1 };

    // Object.keys(restResult.data['_3gpp:moduleCapability'][0]).filter((data)=>{
    //Object.keys(restResult.data['_3gpp:moduleCapability'][0]).filter((data)=>{
    Object.keys(restResult.data).filter((key) => {
      //if(data.startsWith('_3gpp')){

      nonbasicdata[key] = restResult.data[key];
      // Debugging statements
    console.log("Key:", key);
    console.log("Value:", restResult.data[key]);
    console.log("NonBasicData Debug:", nonbasicdata);

      const newkey = Object.keys(nonbasicdata)[0];
      const fstnewkey = Object.keys(nonbasicdata[newkey])[0];
      var path = newkey + ">>" + fstnewkey;

      setCurrentSelection(
        path === "" ? path + newkey : path + ">>" + fstnewkey
      );
      //var selecteddata=nonbasicdata[newkey][fstnewkey];
      var selecteddata = nonbasicdata[newkey][fstnewkey];
      setCurrentSelectiondata(selecteddata);
      console.log("CurrentSelectionData:", selecteddata); 
      setCurrentProperties(
        properties[newkey]?.items?.properties[fstnewkey]?.properties
      );
      setShowSubmitButton(true);
      // setCurrentProperties(properties[newkey].items.properties.capabilities.properties[fstnewkey].properties);
      //setCurrentSelectiondata(selecteddata.length > 0 ? selecteddata[0].length > 0 ? selecteddata[0][0][`${keyname}`] : selecteddata[0] : selecteddata)

      //nonbasicdata[data.split(':')[1]] = restResult['_3gpp-common-managed-element:ManagedElement'][0]
      // }
      // else{
      // basicdata[data] = restResult.data['_3gpp:moduleCapability'][0][data]
      //  //basicdata[data] = restResult['_3gpp-common-managed-element:ManagedElement'][0]
      // }
    });
    console.log("Before updating formattedEsdata:", formattedEsdata);

    setformattedEsdata((prevFormattedEsdata) => {
      const updatedData = {
        ...prevFormattedEsdata,
        ...nonbasicdata,
      };
  
      console.log("Updated Formatted ES Data:", updatedData);
      return updatedData;
    });
  
    console.log("After updating formattedEsdata:", formattedEsdata);
  };
  // const fetchData = async () => {
  //   try {
  //     const username = "admin";
  //     const password = "admin";
      

    //   const xml = `
    // <data xmlns="urn:ietf:params:xml:ns:netconf:base:1.0">
    //   <hardware xmlns="urn:ietf:params:xml:ns:yang:ietf-hardware">
    //     <component>
    //       <contains-child/>
    //       <uri/>
    //       <label-content/>
    //     </component>
    //   </hardware>
    //   <interfaces xmlns="urn:ietf:params:xml:ns:yang:ietf-interfaces">
    //     <interface>
    //       <higher-layer-if/>
    //       <lower-layer-if/>
    //       <class-of-service>
    //         <enhanced-uplane-markings/>
    //       </class-of-service>
    //       <ipv4>
    //         <address/>
    //         <neighbor/>
    //         <diffserv-markings>
    //           <enhanced-uplane-markings/>
    //         </diffserv-markings>
    //       </ipv4>
    //       <ipv6>
    //         <address/>
    //         <neighbor/>
    //         <autoconf/>
    //         <diffserv-markings>
    //           <enhanced-uplane-markings/>
    //         </diffserv-markings>
    //       </ipv6>
    //       <port-reference/>
    //     </interface>
    //     <interface-grouping>
    //       <interfaces-groups/>
    //     </interface-grouping>
    //   </interfaces>
    //   <nacm xmlns="urn:ietf:params:xml:ns:yang:ietf-netconf-acm">
    //     <groups>
    //       <group>
    //         <name>fm-pm</name>
    //       </group>
    //       <group>
    //         <name>hybrid-odu</name>
    //       </group>
    //       <group>
    //         <name>nms</name>
    //       </group>
    //       <group>
    //         <name>smo</name>
    //       </group>
    //       <group>
    //         <name>sudo</name>
    //         <user-name>admin</user-name>
    //       </group>
    //       <group>
    //         <name>swm</name>
    //       </group>
    //     </groups>
    //     <rule-list>
    //       <name>sudo</name>
    //       <group>sudo</group>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>o-ran-supervision</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <access-operations>read, write, execute</access-operations>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>o-ran-hardware</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <access-operations>read, write, execute</access-operations>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>ietf-hardware</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <access-operations>read, write, execute</access-operations>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>iana-hardware</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <access-operations>read</access-operations>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>o-ran-usermgmt</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <access-operations>read, write, execute</access-operations>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>o-ran-fm</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <access-operations>read, execute</access-operations>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>o-ran-fan</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <access-operations>read</access-operations>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>o-ran-sync</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <access-operations>read, write, execute</access-operations>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>o-ran-delay</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <access-operations>write,read</access-operations>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>o-ran-module-cap</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <access-operations>write,read</access-operations>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>o-ran-udpecho</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <access-operations>write,read</access-operations>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>o-ran-operations</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <access-operations>read, write, execute</access-operations>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>o-ran-uplane-conf</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <access-operations>read, write, execute</access-operations>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>o-ran-beamforming</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <access-operations>read, execute</access-operations>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>o-ran-lbm</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <access-operations>write,read</access-operations>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>o-ran-software-management</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <access-operations>read, execute</access-operations>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>o-ran-file-management</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <access-operations>read, execute</access-operations>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>o-ran-message5</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <access-operations>read, execute</access-operations>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>o-ran-performance-management</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <access-operations>read, write, execute</access-operations>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>o-ran-transceiver</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <access-operations>write,read</access-operations>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>o-ran-externalio</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <access-operations>read, write, execute</access-operations>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>o-ran-ald-port</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <access-operations>read, write, execute</access-operations>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>o-ran-interfaces</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <access-operations>read, write, execute</access-operations>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>ietf-ip</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <access-operations>write,read</access-operations>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>ietf-interfaces</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <access-operations>write,read</access-operations>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>o-ran-processing-elements</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <access-operations>write,read</access-operations>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>o-ran-mplane-interfaces</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <access-operations>write,read</access-operations>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>o-ran-dhcp</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <access-operations>read</access-operations>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>o-ran-ald</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <access-operations>execute</access-operations>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>o-ran-troubleshooting</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <access-operations>read, execute</access-operations>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>o-ran-trace</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <access-operations>read, execute</access-operations>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>o-ran-laa</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <access-operations>write,read</access-operations>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>o-ran-laa-operations</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <access-operations>read, execute</access-operations>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>o-ran-antcal</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <access-operations>read, write, execute</access-operations>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>ietf-netconf-acm</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <access-operations>write,read</access-operations>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>ietf-yang-library</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <access-operations>read, execute</access-operations>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>ietf-netconf-monitoring</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <access-operations>read, execute</access-operations>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>ietf-netconf-notifications</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <access-operations>read, execute</access-operations>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>o-ran-shared-cell</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <access-operations>write,read</access-operations>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>o-ran-ethernet-fwd</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <access-operations>write,read</access-operations>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>ieee802-dot1x</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <access-operations>write,read</access-operations>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>ietf-system</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <access-operations>write,read</access-operations>
    //         <action>permitt</action>
    //       </rule>
    //     </rule-list>
    //     <rule-list>
    //       <name>nms</name>
    //       <group>nms</group>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>o-ran-supervision</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <access-operations/>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>o-ran-hardware</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <access-operations>write,read</access-operations>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>ietf-hardware</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <access-operations>read, write, execute</access-operations>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>iana-hardware</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <access-operations>read</access-operations>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>o-ran-usermgmt</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <access-operations/>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>o-ran-fm</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <access-operations>read, execute</access-operations>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>o-ran-fan</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <access-operations>read</access-operations>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>o-ran-sync</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <access-operations>read, write, execute</access-operations>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>o-ran-delay</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <access-operations>read</access-operations>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>o-ran-module-cap</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <access-operations>read</access-operations>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>o-ran-udpecho</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <access-operations>read</access-operations>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>o-ran-operations</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <access-operations>write,read</access-operations>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>o-ran-uplane-conf</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <access-operations>read, write, execute</access-operations>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>o-ran-beamforming</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <access-operations>read, execute</access-operations>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>o-ran-lbm</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <access-operations>write,read</access-operations>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>o-ran-software-management</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <access-operations>read, execute</access-operations>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>o-ran-file-management</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <access-operations>read, execute</access-operations>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>o-ran-message5</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <access-operations>read</access-operations>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>o-ran-performance-management</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <access-operations>read, write, execute</access-operations>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>o-ran-transceiver</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <access-operations>write,read</access-operations>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>o-ran-externalio</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <access-operations>read, write, execute</access-operations>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>o-ran-ald-port</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <access-operations>read, write, execute</access-operations>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>o-ran-interfaces</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <access-operations>read, write, execute</access-operations>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>ietf-ip</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <access-operations>write,read</access-operations>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>ietf-interfaces</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <access-operations>write,read</access-operations>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>o-ran-processing-elements</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <access-operations>write,read</access-operations>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>o-ran-mplane-interfaces</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <access-operations>write,read</access-operations>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>o-ran-dhcp</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <access-operations>read</access-operations>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>o-ran-ald</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <access-operations/>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>o-ran-troubleshooting</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <access-operations>read, execute</access-operations>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>o-ran-trace</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <access-operations>read, execute</access-operations>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>o-ran-laa</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <access-operations>write,read</access-operations>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>o-ran-antcal</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <access-operations>read</access-operations>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>ietf-netconf-acm</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <access-operations>read</access-operations>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>ietf-yang-library</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <access-operations>read, execute</access-operations>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>ietf-netconf-monitoring</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <access-operations>read, execute</access-operations>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>ietf-netconf-notifications</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <access-operations>read, execute</access-operations>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>o-ran-shared-cell</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <access-operations>write,read</access-operations>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>o-ran-ethernet-fwd</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <access-operations>write,read</access-operations>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>ieee802-dot1x</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <access-operations>write,read</access-operations>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>ietf-system</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <access-operations>write,read</access-operations>
    //         <action>permitt</action>
    //       </rule>
    //     </rule-list>
    //     <rule-list>
    //       <name>smo</name>
    //       <group>smo</group>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>o-ran-supervision</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <access-operations>read, write</access-operations>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>o-ran-hardware</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <access-operations>read, write, execute</access-operations>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>ietf-hardware</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <access-operations>read, write, execute</access-operations>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>iana-hardware</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <access-operations>read</access-operations>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>o-ran-usermgmt</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <access-operations>read, write, execute</access-operations>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>o-ran-fm</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <access-operations>read, execute</access-operations>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>o-ran-fan</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <access-operations>read</access-operations>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>o-ran-sync</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <access-operations>read, write, execute</access-operations>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>o-ran-delay</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <access-operations>read</access-operations>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>o-ran-module-cap</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <access-operations>read</access-operations>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>o-ran-udpecho</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <access-operations>write,read</access-operations>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>o-ran-operations</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <access-operations>read, write, execute</access-operations>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>o-ran-uplane-conf</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <access-operations>read</access-operations>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>o-ran-beamforming</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <access-operations>read</access-operations>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>o-ran-lbm</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <access-operations>write,read</access-operations>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>o-ran-software-management</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <access-operations>read, execute</access-operations>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>o-ran-file-management</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <access-operations>read, execute</access-operations>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>o-ran-message5</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <access-operations>read</access-operations>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>o-ran-performance-management</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <access-operations>read, write, execute</access-operations>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>o-ran-transceiver</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <access-operations>write,read</access-operations>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>o-ran-externalio</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <access-operations>read, write, execute</access-operations>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>o-ran-ald-port</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <access-operations>read, write, execute</access-operations>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>o-ran-interfaces</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <access-operations>read, write, execute</access-operations>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>ietf-ip</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <access-operations>write,read</access-operations>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>ietf-interfaces</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <access-operations>write,read</access-operations>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>o-ran-processing-elements</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <access-operations>write,read</access-operations>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>o-ran-mplane-interfaces</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <access-operations>write,read</access-operations>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>o-ran-dhcp</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <access-operations>read</access-operations>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>o-ran-ald</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <access-operations>execute</access-operations>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>o-ran-troubleshooting</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <access-operations>read, execute</access-operations>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>o-ran-trace</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <access-operations>read, execute</access-operations>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>o-ran-laa</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <access-operations>read</access-operations>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>o-ran-antcal</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <access-operations>read</access-operations>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>ietf-netconf-acm</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <access-operations>write,read</access-operations>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>ietf-yang-library</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <access-operations>read, execute</access-operations>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>ietf-netconf-monitoring</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <access-operations>read, execute</access-operations>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>ietf-netconf-notifications</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <access-operations>read, execute</access-operations>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>o-ran-shared-cell</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <access-operations>read</access-operations>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>o-ran-ethernet-fwd</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <access-operations>write,read</access-operations>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>ieee802-dot1x</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <access-operations>read, write</access-operations>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>ietf-system</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <access-operations>read, write</access-operations>
    //         <action>permitt</action>
    //       </rule>
    //     </rule-list>
    //     <rule-list>
    //       <name>swm</name>
    //       <group>swm</group>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>o-ran-supervision</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <access-operations/>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>o-ran-hardware</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <access-operations/>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>ietf-hardware</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <access-operations/>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>iana-hardware</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <access-operations/>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>o-ran-usermgmt</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <access-operations/>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>o-ran-fm</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <access-operations/>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>o-ran-fan</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <access-operations/>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>o-ran-sync</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <access-operations/>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>o-ran-delay</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <access-operations/>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>o-ran-module-cap</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <access-operations/>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>o-ran-udpecho</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <access-operations/>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>o-ran-operations</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <access-operations/>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>o-ran-uplane-conf</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <access-operations/>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>o-ran-beamforming</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <access-operations/>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>o-ran-lbm</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <access-operations/>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>o-ran-software-management</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <access-operations>read, execute</access-operations>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>o-ran-file-management</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <access-operations/>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>o-ran-message5</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <access-operations/>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>o-ran-performance-management</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <access-operations/>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>o-ran-transceiver</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <access-operations/>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>o-ran-externalio</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <access-operations/>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>o-ran-ald-port</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <access-operations/>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>o-ran-interfaces</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <access-operations/>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>ietf-ip</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <access-operations/>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>ietf-interfaces</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <access-operations/>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>o-ran-processing-elements</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <access-operations/>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>o-ran-mplane-interfaces</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <access-operations/>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>o-ran-dhcp</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <access-operations/>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>o-ran-ald</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <access-operations/>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>o-ran-troubleshooting</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <access-operations/>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>o-ran-trace</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <access-operations/>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>o-ran-laa</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <access-operations/>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>o-ran-antcal</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <access-operations/>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>ietf-netconf-acm</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <access-operations>read</access-operations>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>ietf-yang-library</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <access-operations>read, execute</access-operations>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>ietf-netconf-monitoring</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <access-operations>read, execute</access-operations>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>ietf-netconf-notifications</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <access-operations>read, execute</access-operations>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>o-ran-shared-cell</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <access-operations/>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>o-ran-ethernet-fwd</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <access-operations/>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>ieee802-dot1x</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <access-operations/>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>ietf-system</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <access-operations/>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <action>permitt</action>
    //       </rule>
    //     </rule-list>
    //     <rule-list>
    //       <name>fm-pm</name>
    //       <group>fm-pm</group>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>o-ran-supervision</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <access-operations/>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>o-ran-hardware</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <access-operations/>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>ietf-hardware</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <access-operations>read, execute</access-operations>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>iana-hardware</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <access-operations>read</access-operations>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>o-ran-usermgmt</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <access-operations/>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>o-ran-fm</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <access-operations>read, execute</access-operations>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>o-ran-fan</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <access-operations>read</access-operations>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>o-ran-sync</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <access-operations>read, write, execute</access-operations>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>o-ran-delay</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <access-operations>read</access-operations>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>o-ran-module-cap</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <access-operations>read</access-operations>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>o-ran-udpecho</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <access-operations/>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>o-ran-operations</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <access-operations>read</access-operations>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>o-ran-uplane-conf</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <access-operations>read</access-operations>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>o-ran-beamforming</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <access-operations>read</access-operations>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>o-ran-lbm</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <access-operations>read</access-operations>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>o-ran-software-management</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <access-operations>read</access-operations>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>o-ran-file-management</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <access-operations>read, execute</access-operations>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>o-ran-message5</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <access-operations>read</access-operations>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>o-ran-performance-management</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <access-operations>read, write, execute</access-operations>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>o-ran-transceiver</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <access-operations>read</access-operations>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>o-ran-externalio</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <access-operations/>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>o-ran-ald-port</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <access-operations/>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>o-ran-interfaces</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <access-operations>read</access-operations>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>ietf-ip</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <access-operations>read</access-operations>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>ietf-interfaces</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <access-operations>read</access-operations>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>o-ran-processing-elements</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <access-operations>read</access-operations>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>o-ran-mplane-interfaces</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <access-operations>read</access-operations>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>o-ran-dhcp</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <access-operations>read</access-operations>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>o-ran-ald</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <access-operations/>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>o-ran-troubleshooting</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <access-operations>read, execute</access-operations>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>o-ran-trace</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <access-operations>read, execute</access-operations>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>o-ran-laa</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <access-operations/>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>o-ran-antcal</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <access-operations/>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>ietf-netconf-acm</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <access-operations>read</access-operations>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>ietf-yang-library</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <access-operations>read, execute</access-operations>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>ietf-netconf-monitoring</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <access-operations>read, execute</access-operations>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>ietf-netconf-notifications</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <access-operations>read, execute</access-operations>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>o-ran-shared-cell</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <access-operations/>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>o-ran-ethernet-fwd</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <access-operations/>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>ieee802-dot1x</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <access-operations>read</access-operations>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>ietf-system</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <access-operations>read</access-operations>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <action>permitt</action>
    //       </rule>
    //     </rule-list>
    //     <rule-list>
    //       <name>hybrid-odu</name>
    //       <group>hybrid-odu</group>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>o-ran-supervision</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <access-operations>read, write, execute</access-operations>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>o-ran-hardware</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <access-operations>read</access-operations>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>ietf-hardware</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <access-operations>read,execute</access-operations>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>iana-hardware</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <access-operations>read</access-operations>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>o-ran-usermgmt</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <access-operations>read, write, execute</access-operations>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>o-ran-fm</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <access-operations>read, execute</access-operations>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>o-ran-fan</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <access-operations>read</access-operations>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>o-ran-sync</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <access-operations>read,execute</access-operations>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>o-ran-delay</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <access-operations>read, write</access-operations>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>o-ran-module-cap</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <access-operations>read, write</access-operations>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>o-ran-udpecho</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <access-operations>read</access-operations>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>o-ran-operations</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <access-operations>read, write, execute</access-operations>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>o-ran-uplane-conf</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <access-operations>read, write, execute</access-operations>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>o-ran-beamforming</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <access-operations>read,execute</access-operations>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>o-ran-lbm</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <access-operations>read</access-operations>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>o-ran-software-management</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <access-operations>read</access-operations>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>o-ran-file-management</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <access-operations/>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>o-ran-message5</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <access-operations>read, write</access-operations>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>o-ran-performance-management</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <access-operations>read,execute</access-operations>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>o-ran-transceiver</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <access-operations>read</access-operations>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>o-ran-externalio</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <access-operations>read</access-operations>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>o-ran-ald-port</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <access-operations>read, write, execute</access-operations>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>o-ran-interfaces</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <access-operations>read</access-operations>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>ietf-ip</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <access-operations>read</access-operations>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>ietf-interfaces</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <access-operations>read</access-operations>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>o-ran-processing-elements</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <access-operations>write,read</access-operations>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>o-ran-mplane-interfaces</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <access-operations>read</access-operations>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>o-ran-dhcp</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <access-operations>read</access-operations>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>o-ran-ald</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <access-operations>execute</access-operations>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>o-ran-troubleshooting</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <access-operations/>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>o-ran-trace</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <access-operations/>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>o-ran-laa</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <access-operations>write,read</access-operations>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>o-ran-antcal</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <access-operations>read, write, execute</access-operations>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>ietf-netconf-acm</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <access-operations>write,read</access-operations>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>ietf-yang-library</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <access-operations>read, execute</access-operations>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>ietf-netconf-monitoring</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <access-operations>read, execute</access-operations>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>ietf-netconf-notifications</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <access-operations>read, execute</access-operations>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>o-ran-shared-cell</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <access-operations>read, write</access-operations>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>o-ran-ethernet-fwd</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <access-operations>read</access-operations>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>ieee802-dot1x</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <access-operations>read</access-operations>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <action>permitt</action>
    //       </rule>
    //       <rule>
    //         <name>NULL</name>
    //         <module-name>ietf-system</module-name>
    //         <rpc-name>NULL</rpc-name>
    //         <notification-name>NULL</notification-name>
    //         <access-operations>read</access-operations>
    //         <comment>NULL</comment>
    //         <path>NULL</path>
    //         <action>permitt</action>
    //       </rule>
    //     </rule-list>
    //     <enable-nacm>True</enable-nacm>
    //     <read-default>NULL</read-default>
    //     <write-default>NULL</write-default>
    //     <execute-default>NULL</execute-default>
    //     <enable-external-groups>NULL</enable-external-groups>
    //     <denied-operations>NULL</denied-operations>
    //     <denied-data-writes>NULL</denied-data-writes>
    //     <denied-notifications>NULL</denied-notifications>
    //   </nacm>
    //   <netconf-state xmlns="urn:ietf:params:xml:ns:yang:ietf-netconf-monitoring">
    //     <capabilities>
    //       <capability>NULL</capability>
    //     </capabilities>
    //     <datastores>
    //       <datastore>
    //         <name>running</name>
    //         <locks>
    //           <lock-type>
    //             <global-lock>
    //               <global-lock>
    //                 <locked-by-session>NULL</locked-by-session>
    //                 <locked-time>NULL</locked-time>
    //               </global-lock>
    //             </global-lock>
    //             <partial-lock>
    //               <partial-lock>
    //                 <lock-id>NULL</lock-id>
    //                 <locked-by-session>NULL</locked-by-session>
    //                 <locked-time>NULL</locked-time>
    //                 <select>NULL</select>
    //                 <locked-node>NULL</locked-node>
    //               </partial-lock>
    //             </partial-lock>
    //           </lock-type>
    //         </locks>
    //       </datastore>
    //       <datastore>
    //         <name>candidate</name>
    //         <locks>
    //           <lock-type>
    //             <global-lock>
    //               <global-lock>
    //                 <locked-by-session>NULL</locked-by-session>
    //                 <locked-time>NULL</locked-time>
    //               </global-lock>
    //             </global-lock>
    //             <partial-lock>
    //               <partial-lock>
    //                 <lock-id>NULL</lock-id>
    //                 <locked-by-session>NULL</locked-by-session>
    //                 <locked-time>NULL</locked-time>
    //                 <select>NULL</select>
    //                 <locked-node>NULL</locked-node>
    //               </partial-lock>
    //             </partial-lock>
    //           </lock-type>
    //         </locks>
    //       </datastore>
    //       <datastore>
    //         <name>startup</name>
    //         <locks>
    //           <lock-type>
    //             <global-lock>
    //               <global-lock>
    //                 <locked-by-session>NULL</locked-by-session>
    //                 <locked-time>NULL</locked-time>
    //               </global-lock>
    //             </global-lock>
    //             <partial-lock>
    //               <partial-lock>
    //                 <lock-id>NULL</lock-id>
    //                 <locked-by-session>NULL</locked-by-session>
    //                 <locked-time>NULL</locked-time>
    //                 <select>NULL</select>
    //                 <locked-node>NULL</locked-node>
    //               </partial-lock>
    //             </partial-lock>
    //           </lock-type>
    //         </locks>
    //       </datastore>
    //     </datastores>
    //     <schemas>
    //       <schema>
    //         <identifier>o-ran-operations</identifier>
    //         <version>2022-08-15</version>
    //         <format>yang</format>
    //         <namespace>urn:o-ran:operations:1.0</namespace>
    //         <location>NETCONF</location>
    //       </schema>
    //       <schema>
    //         <identifier>o-ran-troubleshooting</identifier>
    //         <version>2022-08-15</version>
    //         <format>yang</format>
    //         <namespace>urn:o-ran:troubleshooting:1.0</namespace>
    //         <location>NETCONF</location>
    //       </schema>
    //       <schema>
    //         <identifier>o-ran-ald</identifier>
    //         <version>2021-12-01</version>
    //         <format>yang</format>
    //         <namespace>urn:o-ran:ald:1.0</namespace>
    //         <location>NETCONF</location>
    //       </schema>
    //       <schema>
    //         <identifier>o-ran-file-management</identifier>
    //         <version>2022-08-15</version>
    //         <format>yang</format>
    //         <namespace>urn:o-ran:file-management:1.0</namespace>
    //         <location>NETCONF</location>
    //       </schema>
    //       <schema>
    //         <identifier>o-ran-trace</identifier>
    //         <version>2022-08-15</version>
    //         <format>yang</format>
    //         <namespace>urn:o-ran:trace:1.0</namespace>
    //         <location>NETCONF</location>
    //       </schema>
    //       <schema>
    //         <identifier>o-ran-software-management</identifier>
    //         <version>2022-12-05</version>
    //         <format>yang</format>
    //         <namespace>urn:o-ran:software-management:1.0</namespace>
    //         <location>NETCONF</location>
    //       </schema>
    //       <schema>
    //         <identifier>o-ran-hardware</identifier>
    //         <version>2022-12-05</version>
    //         <format>yang</format>
    //         <namespace>urn:o-ran:hardware:1.0</namespace>
    //         <location>NETCONF</location>
    //       </schema>
    //       <schema>
    //         <identifier>o-ran-fm</identifier>
    //         <version>2022-08-15</version>
    //         <format>yang</format>
    //         <namespace>urn:o-ran:fm:1.0</namespace>
    //         <location>NETCONF</location>
    //       </schema>
    //       <schema>
    //         <identifier>o-ran-supervision</identifier>
    //         <version>2022-12-05</version>
    //         <format>yang</format>
    //         <namespace>urn:o-ran:supervision:1.0</namespace>
    //         <location>NETCONF</location>
    //       </schema>
    //       <schema>
    //         <identifier>o-ran-fan</identifier>
    //         <version>2021-12-01</version>
    //         <format>yang</format>
    //         <namespace>urn:o-ran:fan:1.0</namespace>
    //         <location>NETCONF</location>
    //       </schema>
    //       <schema>
    //         <identifier>o-ran-certificates</identifier>
    //         <version>2022-08-15</version>
    //         <format>yang</format>
    //         <namespace>urn:o-ran:certificates:1.0</namespace>
    //         <location>NETCONF</location>
    //       </schema>
    //       <schema>
    //         <identifier>o-ran-wg4-features</identifier>
    //         <version>2022-12-05</version>
    //         <format>yang</format>
    //         <namespace>urn:o-ran:wg4feat:1.0</namespace>
    //         <location>NETCONF</location>
    //       </schema>
    //       <schema>
    //         <identifier>o-ran-usermgmt</identifier>
    //         <version>2022-08-15</version>
    //         <format>yang</format>
    //         <namespace>urn:o-ran:user-mgmt:1.0</namespace>
    //         <location>NETCONF</location>
    //       </schema>
    //       <schema>
    //         <identifier>o-ran-ethernet-forwarding</identifier>
    //         <version>2021-12-01</version>
    //         <format>yang</format>
    //         <namespace>urn:o-ran:ethernet-fwd:1.0</namespace>
    //         <location>NETCONF</location>
    //       </schema>
    //       <schema>
    //         <identifier>o-ran-interfaces</identifier>
    //         <version>2021-12-01</version>
    //         <format>yang</format>
    //         <namespace>urn:o-ran:interfaces:1.0</namespace>
    //         <location>NETCONF</location>
    //       </schema>
    //       <schema>
    //         <identifier>o-ran-externalio</identifier>
    //         <version>2019-07-03</version>
    //         <format>yang</format>
    //         <namespace>urn:o-ran:external-io:1.0</namespace>
    //         <location>NETCONF</location>
    //       </schema>
    //       <schema>
    //         <identifier>o-ran-dhcp</identifier>
    //         <version>2022-08-15</version>
    //         <format>yang</format>
    //         <namespace>urn:o-ran:dhcp:1.0</namespace>
    //         <location>NETCONF</location>
    //       </schema>
    //       <schema>
    //         <identifier>o-ran-ald-port</identifier>
    //         <version>2021-12-01</version>
    //         <format>yang</format>
    //         <namespace>urn:o-ran:ald-port:1.0</namespace>
    //         <location>NETCONF</location>
    //       </schema>
    //       <schema>
    //         <identifier>o-ran-mplane-int</identifier>
    //         <version>2021-12-01</version>
    //         <format>yang</format>
    //         <namespace>urn:o-ran:mplane-interfaces:1.0</namespace>
    //         <location>NETCONF</location>
    //       </schema>
    //       <schema>
    //         <identifier>o-ran-transceiver</identifier>
    //         <version>2022-12-05</version>
    //         <format>yang</format>
    //         <namespace>urn:o-ran:transceiver:1.0</namespace>
    //         <location>NETCONF</location>
    //       </schema>
    //       <schema>
    //         <identifier>o-ran-sync</identifier>
    //         <version>2022-08-15</version>
    //         <format>yang</format>
    //         <namespace>urn:o-ran:sync:1.0</namespace>
    //         <location>NETCONF</location>
    //       </schema>
    //       <schema>
    //         <identifier>o-ran-common-yang-types</identifier>
    //         <version>2022-08-15</version>
    //         <format>yang</format>
    //         <namespace>urn:o-ran:common-yang-types:1.0</namespace>
    //         <location>NETCONF</location>
    //       </schema>
    //       <schema>
    //         <identifier>o-ran-common-identity-refs</identifier>
    //         <version>2022-08-15</version>
    //         <format>yang</format>
    //         <namespace>urn:o-ran:wg1identityref:1.0</namespace>
    //         <location>NETCONF</location>
    //       </schema>
    //       <schema>
    //         <identifier>ietf-restconf</identifier>
    //         <version>2017-01-26</version>
    //         <format>yang</format>
    //         <namespace>urn:ietf:params:xml:ns:yang:ietf-restconf</namespace>
    //         <location>NETCONF</location>
    //       </schema>
    //       <schema>
    //         <identifier>ieee802-dot1x</identifier>
    //         <version>2020-02-18</version>
    //         <format>yang</format>
    //         <namespace>urn:ieee:std:802.1X:yang:ieee802-dot1x</namespace>
    //         <location>NETCONF</location>
    //       </schema>
    //       <schema>
    //         <identifier>ieee802-types</identifier>
    //         <version>2020-06-04</version>
    //         <format>yang</format>
    //         <namespace>urn:ieee:std:802.1Q:yang:ieee802-types</namespace>
    //         <location>NETCONF</location>
    //       </schema>
    //       <schema>
    //         <identifier>ietf-netconf-notifications</identifier>
    //         <version>2012-02-06</version>
    //         <format>yang</format>
    //         <namespace>urn:ietf:params:xml:ns:yang:ietf-netconf-notifications</namespace>
    //         <location>NETCONF</location>
    //       </schema>
    //       <schema>
    //         <identifier>iana-hardware</identifier>
    //         <version>2018-03-13</version>
    //         <format>yang</format>
    //         <namespace>urn:ietf:params:xml:ns:yang:iana-hardware</namespace>
    //         <location>NETCONF</location>
    //       </schema>
    //       <schema>
    //         <identifier>ietf-netconf-with-defaults</identifier>
    //         <version>2010-06-09</version>
    //         <format>yang</format>
    //         <namespace>urn:ietf:params:xml:ns:yang:ietf-netconf-with-defaults</namespace>
    //         <location>NETCONF</location>
    //       </schema>
    //       <schema>
    //         <identifier>ietf-yang-types</identifier>
    //         <version>2013-07-15</version>
    //         <format>yang</format>
    //         <namespace>urn:ietf:params:xml:ns:yang:ietf-yang-types</namespace>
    //         <location>NETCONF</location>
    //       </schema>
    //       <schema>
    //         <identifier>iana-if-type</identifier>
    //         <version>2017-01-19</version>
    //         <format>yang</format>
    //         <namespace>urn:ietf:params:xml:ns:yang:iana-if-type</namespace>
    //         <location>NETCONF</location>
    //       </schema>
    //       <schema>
    //         <identifier>ietf-dhcpv6-common</identifier>
    //         <version>2021-01-29</version>
    //         <format>yang</format>
    //         <namespace>urn:ietf:params:xml:ns:yang:ietf-dhcpv6-common</namespace>
    //         <location>NETCONF</location>
    //       </schema>
    //       <schema>
    //         <identifier>iana-crypt-hash</identifier>
    //         <version>2014-08-06</version>
    //         <format>yang</format>
    //         <namespace>urn:ietf:params:xml:ns:yang:iana-crypt-hash</namespace>
    //         <location>NETCONF</location>
    //       </schema>
    //       <schema>
    //         <identifier>ietf-network-instance</identifier>
    //         <version>2019-01-21</version>
    //         <format>yang</format>
    //         <namespace>urn:ietf:params:xml:ns:yang:ietf-network-instance</namespace>
    //         <location>NETCONF</location>
    //       </schema>
    //       <schema>
    //         <identifier>ietf-crypto-types</identifier>
    //         <version>2019-04-29</version>
    //         <format>yang</format>
    //         <namespace>urn:ietf:params:xml:ns:yang:ietf-crypto-types</namespace>
    //         <location>NETCONF</location>
    //       </schema>
    //       <schema>
    //         <identifier>nc-notifications</identifier>
    //         <version>2008-07-14</version>
    //         <format>yang</format>
    //         <namespace>urn:ietf:params:xml:ns:netmod:notification</namespace>
    //         <location>NETCONF</location>
    //       </schema>
    //       <schema>
    //         <identifier>ietf-dhcpv6-types</identifier>
    //         <version>2018-09-04</version>
    //         <format>yang</format>
    //         <namespace>urn:ietf:params:xml:ns:yang:ietf-dhcpv6-types</namespace>
    //         <location>NETCONF</location>
    //       </schema>
    //       <schema>
    //         <identifier>ietf-datastores</identifier>
    //         <version>2018-02-14</version>
    //         <format>yang</format>
    //         <namespace>urn:ietf:params:xml:ns:yang:ietf-datastores</namespace>
    //         <location>NETCONF</location>
    //       </schema>
    //       <schema>
    //         <identifier>ietf-yang-metadata</identifier>
    //         <version>2015-09-17</version>
    //         <format>yang</format>
    //         <namespace>urn:ietf:params:xml:ns:yang:ietf-yang-metadata</namespace>
    //         <location>NETCONF</location>
    //       </schema>
    //       <schema>
    //         <identifier>ieee802-dot1x-types</identifier>
    //         <version>2020-02-18</version>
    //         <format>yang</format>
    //         <namespace>urn:ieee:std:802.1X:yang:ieee802-dot1x-types</namespace>
    //         <location>NETCONF</location>
    //       </schema>
    //       <schema>
    //         <identifier>ietf-system</identifier>
    //         <version>2014-08-06</version>
    //         <format>yang</format>
    //         <namespace>urn:ietf:params:xml:ns:yang:ietf-system</namespace>
    //         <location>NETCONF</location>
    //       </schema>
    //       <schema>
    //         <identifier>ietf-hardware</identifier>
    //         <version>2018-03-13</version>
    //         <format>yang</format>
    //         <namespace>urn:ietf:params:xml:ns:yang:ietf-hardware</namespace>
    //         <location>NETCONF</location>
    //       </schema>
    //       <schema>
    //         <identifier>ietf-x509-cert-to-name</identifier>
    //         <version>2014-12-10</version>
    //         <format>yang</format>
    //         <namespace>urn:ietf:params:xml:ns:yang:ietf-x509-cert-to-name</namespace>
    //         <location>NETCONF</location>
    //       </schema>
    //       <schema>
    //         <identifier>notifications</identifier>
    //         <version>2008-07-14</version>
    //         <format>yang</format>
    //         <namespace>urn:ietf:params:xml:ns:netconf:notification:1.0</namespace>
    //         <location>NETCONF</location>
    //       </schema>
    //       <schema>
    //         <identifier>ietf-inet-types</identifier>
    //         <version>2013-07-15</version>
    //         <format>yang</format>
    //         <namespace>urn:ietf:params:xml:ns:yang:ietf-inet-types</namespace>
    //         <location>NETCONF</location>
    //       </schema>
    //       <schema>
    //         <identifier>ietf-interfaces</identifier>
    //         <version>2018-02-20</version>
    //         <format>yang</format>
    //         <namespace>urn:ietf:params:xml:ns:yang:ietf-interfaces</namespace>
    //         <location>NETCONF</location>
    //       </schema>
    //       <schema>
    //         <identifier>ietf-netconf</identifier>
    //         <version>2011-06-01</version>
    //         <format>yang</format>
    //         <namespace>urn:ietf:params:xml:ns:netconf:base:1.0</namespace>
    //         <location>NETCONF</location>
    //       </schema>
    //       <schema>
    //         <identifier>ietf-netconf-monitoring</identifier>
    //         <version>2010-10-04</version>
    //         <format>yang</format>
    //         <namespace>urn:ietf:params:xml:ns:yang:ietf-netconf-monitoring</namespace>
    //         <location>NETCONF</location>
    //       </schema>
    //       <schema>
    //         <identifier>ietf-yang-library</identifier>
    //         <version>2019-01-04</version>
    //         <format>yang</format>
    //         <namespace>urn:ietf:params:xml:ns:yang:ietf-yang-library</namespace>
    //         <location>NETCONF</location>
    //       </schema>
    //       <schema>
    //         <identifier>ietf-ip</identifier>
    //         <version>2018-02-22</version>
    //         <format>yang</format>
    //         <namespace>urn:ietf:params:xml:ns:yang:ietf-ip</namespace>
    //         <location>NETCONF</location>
    //       </schema>
    //       <schema>
    //         <identifier>ietf-yang-schema-mount</identifier>
    //         <version>2019-01-14</version>
    //         <format>yang</format>
    //         <namespace>urn:ietf:params:xml:ns:yang:ietf-yang-schema-mount</namespace>
    //         <location>NETCONF</location>
    //       </schema>
    //       <schema>
    //         <identifier>ietf-subscribed-notifications</identifier>
    //         <version>2019-09-09</version>
    //         <format>yang</format>
    //         <namespace>urn:ietf:params:xml:ns:yang:ietf-subscribed-notifications</namespace>
    //         <location>NETCONF</location>
    //       </schema>
    //       <schema>
    //         <identifier>ietf-netconf-acm</identifier>
    //         <version>2018-02-14</version>
    //         <format>yang</format>
    //         <namespace>urn:ietf:params:xml:ns:yang:ietf-netconf-acm</namespace>
    //         <location>NETCONF</location>
    //       </schema>
    //       <schema>
    //         <identifier>o-ran-performance-management</identifier>
    //         <version>2022-08-15</version>
    //         <format>yang</format>
    //         <namespace>urn:o-ran:performance-management:1.0</namespace>
    //         <location>NETCONF</location>
    //       </schema>
    //       <schema>
    //         <identifier>o-ran-udp-echo</identifier>
    //         <version>2019-02-04</version>
    //         <format>yang</format>
    //         <namespace>urn:o-ran:udpecho:1.0</namespace>
    //         <location>NETCONF</location>
    //       </schema>
    //       <schema>
    //         <identifier>o-ran-uplane-conf</identifier>
    //         <version>2022-12-05</version>
    //         <format>yang</format>
    //         <namespace>urn:o-ran:uplane-conf:1.0</namespace>
    //         <location>NETCONF</location>
    //       </schema>
    //       <schema>
    //         <identifier>o-ran-lbm</identifier>
    //         <version>2021-12-01</version>
    //         <format>yang</format>
    //         <namespace>urn:o-ran:lbm:1.0</namespace>
    //         <location>NETCONF</location>
    //       </schema>
    //       <schema>
    //         <identifier>o-ran-ecpri-delay</identifier>
    //         <version>2021-12-01</version>
    //         <format>yang</format>
    //         <namespace>urn:o-ran:message5:1.0</namespace>
    //         <location>NETCONF</location>
    //       </schema>
    //       <schema>
    //         <identifier>o-ran-antenna-calibration</identifier>
    //         <version>2021-12-01</version>
    //         <format>yang</format>
    //         <namespace>urn:o-ran:antcal:1.0</namespace>
    //         <location>NETCONF</location>
    //       </schema>
    //       <schema>
    //         <identifier>o-ran-delay-management</identifier>
    //         <version>2022-08-15</version>
    //         <format>yang</format>
    //         <namespace>urn:o-ran:delay:1.0</namespace>
    //         <location>NETCONF</location>
    //       </schema>
    //       <schema>
    //         <identifier>o-ran-shared-cell</identifier>
    //         <version>2022-12-05</version>
    //         <format>yang</format>
    //         <namespace>urn:o-ran:shared-cell:1.0</namespace>
    //         <location>NETCONF</location>
    //       </schema>
    //       <schema>
    //         <identifier>o-ran-laa</identifier>
    //         <version>2022-08-15</version>
    //         <format>yang</format>
    //         <namespace>urn:o-ran:laa:1.0</namespace>
    //         <location>NETCONF</location>
    //       </schema>
    //       <schema>
    //         <identifier>o-ran-beamforming</identifier>
    //         <version>2022-12-05</version>
    //         <format>yang</format>
    //         <namespace>urn:o-ran:beamforming:1.0</namespace>
    //         <location>NETCONF</location>
    //       </schema>
    //       <schema>
    //         <identifier>o-ran-module-cap</identifier>
    //         <version>2022-12-05</version>
    //         <format>yang</format>
    //         <namespace>urn:o-ran:module-cap:1.0</namespace>
    //         <location>NETCONF</location>
    //       </schema>
    //       <schema>
    //         <identifier>o-ran-compression-factors</identifier>
    //         <version>2021-12-01</version>
    //         <format>yang</format>
    //         <namespace>urn:o-ran:compression-factors:1.0</namespace>
    //         <location>NETCONF</location>
    //       </schema>
    //       <schema>
    //         <identifier>o-ran-laa-operations</identifier>
    //         <version>2021-12-01</version>
    //         <format>yang</format>
    //         <namespace>urn:o-ran:laa-operations:1.0</namespace>
    //         <location>NETCONF</location>
    //       </schema>
    //       <schema>
    //         <identifier>o-ran-processing-element</identifier>
    //         <version>2022-08-15</version>
    //         <format>yang</format>
    //         <namespace>urn:o-ran:processing-element:1.0</namespace>
    //         <location>NETCONF</location>
    //       </schema>
    //     </schemas>
    //     <sessions>
    //       <session>
    //         <username>NULL</username>
    //         <source-host>NULL</source-host>
    //         <session-id>NULL</session-id>
    //         <transport>NULL</transport>
    //         <login-time>NULL</login-time>
    //         <in-rpcs>NULL</in-rpcs>
    //         <in-bad-rpcs>NULL</in-bad-rpcs>
    //         <out-rpc-errors>NULL</out-rpc-errors>
    //         <out-notifications>NULL</out-notifications>
    //       </session>
    //     </sessions>
    //     <statistics>
    //       <netconf-start-time>NULL</netconf-start-time>
    //       <in-bad-hellos>NULL</in-bad-hellos>
    //       <in-sessions>NULL</in-sessions>
    //       <dropped-sessions>NULL</dropped-sessions>
    //       <in-rpcs>NULL</in-rpcs>
    //       <in-bad-rpcs>NULL</in-bad-rpcs>
    //       <out-rpc-errors>NULL</out-rpc-errors>
    //       <out-notifications>NULL</out-notifications>
    //     </statistics>
    //   </netconf-state>
    //   <network-instances xmlns="urn:ietf:params:xml:ns:yang:ietf-network-instance">
    //     <network-instance>
    //     </network-instance>
    //   </network-instances>
    //   <streams xmlns="urn:ietf:params:xml:ns:yang:ietf-subscribed-notifications">
    //     <stream/>
    //   </streams>
    //   <yang-library xmlns="urn:ietf:params:xml:ns:yang:ietf-yang-library">
    //     <module-set>
    //       <module>
    //         <submodule/>
    //       </module>
    //       <import-only-module>
    //         <submodule/>
    //       </import-only-module>
    //     </module-set>
    //     <schema/>
    //     <datastore/>
    //   </yang-library>
    //   <schema-mounts xmlns="urn:ietf:params:xml:ns:yang:ietf-yang-schema-mount">
    //     <namespace/>
    //     <mount-point>
    //       <inline/>
    //       <shared-schema>
    //         <parent-reference/>
    //       </shared-schema>
    //     </mount-point>
    //   </schema-mounts>
    //   <ald-ports-io xmlns="urn:o-ran:ald-port:1.0">
    //     <ald-port/>
    //     <ald-port-dc-control/>
    //   </ald-ports-io>
    //   <delay-management xmlns="urn:o-ran:delay:1.0">
    //     <adaptive-delay-configuration>
    //       <bandwidth-scs-delay-state>
    //       </bandwidth-scs-delay-state>
    //     </adaptive-delay-configuration>
    //     <bandwidth-scs-delay-state>
    //       <subcarrier-spacing>30000</subcarrier-spacing>
    //       <ru-delay-profile>
    //         <t2a-min-up>90</t2a-min-up>
    //         <t2a-max-up>305</t2a-max-up>
    //         <t2a-min-cp-dl>215</t2a-min-cp-dl>
    //         <t2a-max-cp-dl>430</t2a-max-cp-dl>
    //         <tcp-adv-dl>125</tcp-adv-dl>
    //         <ta3-min>80</ta3-min>
    //         <ta3-max>125</ta3-max>
    //         <t2a-min-cp-ul>195</t2a-min-cp-ul>
    //         <t2a-max-cp-ul>455</t2a-max-cp-ul>
    //       </ru-delay-profile>
    //       <bandwidth>60000000</bandwidth>
    //     </bandwidth-scs-delay-state>
    //     <bandwidth-scs-delay-state>
    //       <subcarrier-spacing>30000</subcarrier-spacing>
    //       <ru-delay-profile>
    //         <t2a-min-up>90</t2a-min-up>
    //         <t2a-max-up>305</t2a-max-up>
    //         <t2a-min-cp-dl>215</t2a-min-cp-dl>
    //         <t2a-max-cp-dl>430</t2a-max-cp-dl>
    //         <tcp-adv-dl>125</tcp-adv-dl>
    //         <ta3-min>80</ta3-min>
    //         <ta3-max>125</ta3-max>
    //         <t2a-min-cp-ul>195</t2a-min-cp-ul>
    //         <t2a-max-cp-ul>455</t2a-max-cp-ul>
    //       </ru-delay-profile>
    //       <bandwidth>100000000</bandwidth>
    //     </bandwidth-scs-delay-state>
    //   </delay-management>
    //   <dhcp xmlns="urn:o-ran:dhcp:1.0">
    //     <interfaces>
    //       <interface>eth1.202</interface>
    //       <dhcpv4>
    //         <type-code>5</type-code>
    //         <dhcp-server-identifier>192.168.6.10</dhcp-server-identifier>
    //         <domain-name>b'www.tejasnetworks.com</domain-name>
    //         <domain-name-servers>8.8.8.8</domain-name-servers>
    //         <default-gateways>192.168.6.1</default-gateways>
    //         <netconf-clients>
    //           <client>192.168.6.30</client>
    //           <optional-port>4334</optional-port>
    //         </netconf-clients>
    //         <netconf-clients>
    //           <client>192.168.6.13</client>
    //           <optional-port>4334</optional-port>
    //         </netconf-clients>
    //         <ca-ra-servers/>
    //         <segw/>
    //         <event-collectors/>
    //       </dhcpv4>
    //       <dhcpv6>
    //         <domain-name-servers/>
    //         <netconf-clients/>
    //         <ca-ra-servers/>
    //         <segw/>
    //         <event-collectors/>
    //       </dhcpv6>
    //     </interfaces>
    //   </dhcp>
    //   <active-alarm-list xmlns="urn:o-ran:fm:1.0">
    //     <active-alarms>
    //       <fault-id>1</fault-id>
    //       <fault-source>Baseboard</fault-source>
    //       <affected-objects/>
    //       <fault-severity>MAJOR</fault-severity>
    //       <fault-text>Unit temperature is higher than expected.</fault-text>
    //       <proposed-repair-actions>NULL</proposed-repair-actions>
    //       <additional-information>
    //         <identifier>NULL</identifier>
    //         <information>NULL</information>
    //       </additional-information>
    //       <is-cleared>False</is-cleared>
    //       <event-time>NULL</event-time>
    //       <alarm-type>NULL</alarm-type>
    //     </active-alarms>
    //     <active-alarms>
    //       <fault-id>2</fault-id>
    //       <fault-source>Temp-sensor</fault-source>
    //       <fault-severity>CRITICAL</fault-severity>
    //       <fault-text>Unit temperature is dangerously high.</fault-text>
    //       <probable-cause>NULL</probable-cause>
    //       <specific-problem>NULL</specific-problem>
    //       <proposed-repair-actions>NULL</proposed-repair-actions>
    //       <additional-information>
    //         <identifier>NULL</identifier>
    //         <information>NULL</information>
    //       </additional-information>
    //       <is-cleared>True</is-cleared>
    //       <event-time>NULL</event-time>
    //       <alarm-type>NULL</alarm-type>
    //     </active-alarms>
    //     <active-alarms>
    //       <fault-id>4</fault-id>
    //       <fault-source>temp-module</fault-source>
    //       <fault-severity>MINOR</fault-severity>
    //       <fault-text>The temperature inside the module is too low.</fault-text>
    //       <probable-cause>NULL</probable-cause>
    //       <specific-problem>NULL</specific-problem>
    //       <proposed-repair-actions>NULL</proposed-repair-actions>
    //       <additional-information>
    //         <identifier>NULL</identifier>
    //         <information>NULL</information>
    //       </additional-information>
    //       <is-cleared>True</is-cleared>
    //       <event-time>NULL</event-time>
    //       <alarm-type>NULL</alarm-type>
    //     </active-alarms>
    //     <active-alarms>
    //       <fault-id>9</fault-id>
    //       <fault-source>Antenna line</fault-source>
    //       <fault-severity>MAJOR</fault-severity>
    //       <fault-text>The TX signal quality may be out of specification limit</fault-text>
    //       <probable-cause>NULL</probable-cause>
    //       <specific-problem>NULL</specific-problem>
    //       <proposed-repair-actions>NULL</proposed-repair-actions>
    //       <additional-information>
    //         <identifier>NULL</identifier>
    //         <information>NULL</information>
    //       </additional-information>
    //       <is-cleared>True</is-cleared>
    //       <event-time>NULL</event-time>
    //       <alarm-type>NULL</alarm-type>
    //     </active-alarms>
    //     <active-alarms>
    //       <fault-id>10</fault-id>
    //       <fault-source>RF-module</fault-source>
    //       <fault-severity>MINOR</fault-severity>
    //       <fault-text>Module's overvoltage protection is broken.</fault-text>
    //       <probable-cause>NULL</probable-cause>
    //       <specific-problem>NULL</specific-problem>
    //       <proposed-repair-actions>NULL</proposed-repair-actions>
    //       <additional-information>
    //         <identifier>NULL</identifier>
    //         <information>NULL</information>
    //       </additional-information>
    //       <is-cleared>True</is-cleared>
    //       <event-time>NULL</event-time>
    //       <alarm-type>NULL</alarm-type>
    //     </active-alarms>
    //     <active-alarms>
    //       <fault-id>11</fault-id>
    //       <fault-source>Module</fault-source>
    //       <fault-severity>CRITICAL</fault-severity>
    //       <fault-text>Configuration failed because of a HW or SW fault.</fault-text>
    //       <probable-cause>NULL</probable-cause>
    //       <specific-problem>NULL</specific-problem>
    //       <proposed-repair-actions>NULL</proposed-repair-actions>
    //       <additional-information>
    //         <identifier>NULL</identifier>
    //         <information>NULL</information>
    //       </additional-information>
    //       <is-cleared>True</is-cleared>
    //       <event-time>NULL</event-time>
    //       <alarm-type>NULL</alarm-type>
    //     </active-alarms>
    //     <active-alarms>
    //       <fault-id>12</fault-id>
    //       <fault-source>module</fault-source>
    //       <fault-severity>CRITICAL</fault-severity>
    //       <fault-text>Critical configuration file is missing.</fault-text>
    //       <probable-cause>NULL</probable-cause>
    //       <specific-problem>NULL</specific-problem>
    //       <proposed-repair-actions>NULL</proposed-repair-actions>
    //       <additional-information>
    //         <identifier>NULL</identifier>
    //         <information>NULL</information>
    //       </additional-information>
    //       <is-cleared>True</is-cleared>
    //       <event-time>NULL</event-time>
    //       <alarm-type>NULL</alarm-type>
    //     </active-alarms>
    //     <active-alarms>
    //       <fault-id>13</fault-id>
    //       <fault-source>radio_config_file</fault-source>
    //       <fault-severity>MAJOR</fault-severity>
    //       <fault-text>Non-critical configuration file is missing.</fault-text>
    //       <is-cleared>False</is-cleared>
    //       <event-time>
    //         <id>13</id>
    //         <ns_key>o-ran-fm</ns_key>
    //         <is_cleared>False</is_cleared>
    //         <fault_source>radio_config_file</fault_source>
    //       </event-time>
    //     </active-alarms>
    //     <active-alarms>
    //       <fault-id>14</fault-id>
    //       <fault-source>module/Anteena line</fault-source>
    //       <fault-severity>MAJOR</fault-severity>
    //       <fault-text>conflicting or corrupted configuration data detected.</fault-text>
    //       <probable-cause>NULL</probable-cause>
    //       <specific-problem>NULL</specific-problem>
    //       <proposed-repair-actions>NULL</proposed-repair-actions>
    //       <additional-information>
    //         <identifier>NULL</identifier>
    //         <information>NULL</information>
    //       </additional-information>
    //       <is-cleared>True</is-cleared>
    //       <event-time>NULL</event-time>
    //       <alarm-type>NULL</alarm-type>
    //     </active-alarms>
    //     <active-alarms>
    //       <fault-id>15</fault-id>
    //       <fault-source>Module</fault-source>
    //       <fault-severity>CRITICAL</fault-severity>
    //       <fault-text>The Unit is out of order because of a software or hardware fault.</fault-text>
    //       <probable-cause>NULL</probable-cause>
    //       <specific-problem>NULL</specific-problem>
    //       <proposed-repair-actions>NULL</proposed-repair-actions>
    //       <additional-information>
    //         <identifier>NULL</identifier>
    //         <information>NULL</information>
    //       </additional-information>
    //       <is-cleared>True</is-cleared>
    //       <event-time>NULL</event-time>
    //       <alarm-type>NULL</alarm-type>
    //     </active-alarms>
    //     <active-alarms>
    //       <fault-id>16</fault-id>
    //       <fault-source>Module</fault-source>
    //       <fault-severity>MAJOR</fault-severity>
    //       <fault-text>module product code or serial number is missing, or the module product code is unknown</fault-text>
    //       <probable-cause>NULL</probable-cause>
    //       <specific-problem>NULL</specific-problem>
    //       <proposed-repair-actions>NULL</proposed-repair-actions>
    //       <additional-information>
    //         <identifier>NULL</identifier>
    //         <information>NULL</information>
    //       </additional-information>
    //       <is-cleared>True</is-cleared>
    //       <event-time>NULL</event-time>
    //       <alarm-type>NULL</alarm-type>
    //     </active-alarms>
    //     <active-alarms>
    //       <fault-id>17</fault-id>
    //       <fault-source>Sync-module</fault-source>
    //       <fault-severity>MAJOR</fault-severity>
    //       <fault-text>The Unit lost lock to the incoming clock</fault-text>
    //       <probable-cause>NULL</probable-cause>
    //       <specific-problem>NULL</specific-problem>
    //       <proposed-repair-actions>NULL</proposed-repair-actions>
    //       <additional-information>
    //         <identifier>NULL</identifier>
    //         <information>NULL</information>
    //       </additional-information>
    //       <is-cleared>True</is-cleared>
    //       <event-time>NULL</event-time>
    //       <alarm-type>NULL</alarm-type>
    //     </active-alarms>
    //     <active-alarms>
    //       <fault-id>18</fault-id>
    //       <fault-source>Module/Antenna line(ptp)</fault-source>
    //       <fault-severity>CRITICAL</fault-severity>
    //       <fault-text>Unit is out of synchronization.</fault-text>
    //       <probable-cause>NULL</probable-cause>
    //       <specific-problem>NULL</specific-problem>
    //       <proposed-repair-actions>NULL</proposed-repair-actions>
    //       <additional-information>
    //         <identifier>NULL</identifier>
    //         <information>NULL</information>
    //       </additional-information>
    //       <is-cleared>True</is-cleared>
    //       <event-time>NULL</event-time>
    //       <alarm-type>NULL</alarm-type>
    //     </active-alarms>
    //     <active-alarms>
    //       <fault-id>19</fault-id>
    //       <fault-source>Antenna Line</fault-source>
    //       <fault-severity>CRITICAL</fault-severity>
    //       <fault-text>TX path is not usable.</fault-text>
    //       <probable-cause>NULL</probable-cause>
    //       <specific-problem>NULL</specific-problem>
    //       <proposed-repair-actions>NULL</proposed-repair-actions>
    //       <additional-information>
    //         <identifier>NULL</identifier>
    //         <information>NULL</information>
    //       </additional-information>
    //       <is-cleared>True</is-cleared>
    //       <event-time>NULL</event-time>
    //       <alarm-type>NULL</alarm-type>
    //     </active-alarms>
    //     <active-alarms>
    //       <fault-id>20</fault-id>
    //       <fault-source>Module</fault-source>
    //       <fault-severity>CRITICAL</fault-severity>
    //       <fault-text>RX path is not usable.</fault-text>
    //       <probable-cause>NULL</probable-cause>
    //       <specific-problem>NULL</specific-problem>
    //       <proposed-repair-actions>NULL</proposed-repair-actions>
    //       <additional-information>
    //         <identifier>NULL</identifier>
    //         <information>NULL</information>
    //       </additional-information>
    //       <is-cleared>True</is-cleared>
    //       <event-time>NULL</event-time>
    //       <alarm-type>NULL</alarm-type>
    //     </active-alarms>
    //     <active-alarms>
    //       <fault-id>21</fault-id>
    //       <fault-source>Module</fault-source>
    //       <fault-text>detected on the optical link which results in sporadical errors in downlink baseband processing.</fault-text>
    //       <probable-cause>NULL</probable-cause>
    //       <specific-problem>NULL</specific-problem>
    //       <proposed-repair-actions>NULL</proposed-repair-actions>
    //       <additional-information>
    //         <identifier>NULL</identifier>
    //         <information>NULL</information>
    //       </additional-information>
    //       <fault-severity>MAJORE</fault-severity>
    //       <is-cleared>True</is-cleared>
    //       <event-time>NULL</event-time>
    //       <alarm-type>NULL</alarm-type>
    //     </active-alarms>
    //     <active-alarms>
    //       <fault-id>22</fault-id>
    //       <fault-source>Module</fault-source>
    //       <fault-severity>CRITICAL</fault-severity>
    //       <fault-text>Power-on self test failed at start-up.</fault-text>
    //       <probable-cause>NULL</probable-cause>
    //       <specific-problem>NULL</specific-problem>
    //       <proposed-repair-actions>NULL</proposed-repair-actions>
    //       <additional-information>
    //         <identifier>NULL</identifier>
    //         <information>NULL</information>
    //       </additional-information>
    //       <is-cleared>True</is-cleared>
    //       <event-time>NULL</event-time>
    //       <alarm-type>NULL</alarm-type>
    //     </active-alarms>
    //     <active-alarms>
    //       <fault-id>23</fault-id>
    //       <fault-source>Module</fault-source>
    //       <fault-severity>MAJOR</fault-severity>
    //       <fault-text>The FPGA software update has failed.</fault-text>
    //       <probable-cause>NULL</probable-cause>
    //       <specific-problem>NULL</specific-problem>
    //       <proposed-repair-actions>NULL</proposed-repair-actions>
    //       <additional-information>
    //         <identifier>NULL</identifier>
    //         <information>NULL</information>
    //       </additional-information>
    //       <is-cleared>True</is-cleared>
    //       <event-time>NULL</event-time>
    //       <alarm-type>NULL</alarm-type>
    //     </active-alarms>
    //     <active-alarms>
    //       <fault-id>24</fault-id>
    //       <fault-source>Module</fault-source>
    //       <fault-severity>CRITICAL</fault-severity>
    //       <fault-text>Unit is blocked.</fault-text>
    //       <probable-cause>NULL</probable-cause>
    //       <specific-problem>NULL</specific-problem>
    //       <proposed-repair-actions>NULL</proposed-repair-actions>
    //       <additional-information>
    //         <identifier>NULL</identifier>
    //         <information>NULL</information>
    //       </additional-information>
    //       <is-cleared>True</is-cleared>
    //       <event-time>NULL</event-time>
    //       <alarm-type>NULL</alarm-type>
    //     </active-alarms>
    //     <active-alarms>
    //       <fault-id>25</fault-id>
    //       <fault-source>Module</fault-source>
    //       <fault-severity>CRITICAL</fault-severity>
    //       <fault-text>transient problem which significantly affects operation that requires a reset as a recovery.</fault-text>
    //       <probable-cause>NULL</probable-cause>
    //       <specific-problem>NULL</specific-problem>
    //       <proposed-repair-actions>NULL</proposed-repair-actions>
    //       <additional-information>
    //         <identifier>NULL</identifier>
    //         <information>NULL</information>
    //       </additional-information>
    //       <is-cleared>True</is-cleared>
    //       <event-time>NULL</event-time>
    //       <alarm-type>NULL</alarm-type>
    //     </active-alarms>
    //     <active-alarms>
    //       <fault-id>26</fault-id>
    //       <fault-source>Module</fault-source>
    //       <fault-severity>MINOR</fault-severity>
    //       <fault-text>Input power to module has fault, unstable or broken.</fault-text>
    //       <probable-cause>NULL</probable-cause>
    //       <specific-problem>NULL</specific-problem>
    //       <proposed-repair-actions>NULL</proposed-repair-actions>
    //       <additional-information>
    //         <identifier>NULL</identifier>
    //         <information>NULL</information>
    //       </additional-information>
    //       <is-cleared>True</is-cleared>
    //       <event-time>NULL</event-time>
    //       <alarm-type>NULL</alarm-type>
    //     </active-alarms>
    //     <active-alarms>
    //       <fault-id>27</fault-id>
    //       <fault-source>Tx-array and/or antenna line</fault-source>
    //       <fault-severity>MAJOR</fault-severity>
    //       <fault-text>One of power amplifiers in module has fault, unstable or broken</fault-text>
    //       <probable-cause>NULL</probable-cause>
    //       <specific-problem>NULL</specific-problem>
    //       <proposed-repair-actions>NULL</proposed-repair-actions>
    //       <additional-information>
    //         <identifier>NULL</identifier>
    //         <information>NULL</information>
    //       </additional-information>
    //       <is-cleared>True</is-cleared>
    //       <event-time>NULL</event-time>
    //       <alarm-type>NULL</alarm-type>
    //     </active-alarms>
    //     <active-alarms>
    //       <fault-id>28</fault-id>
    //       <fault-source>MINOR</fault-source>
    //       <fault-text>One of logical C/U-plane connection has fault, unstable or broken.</fault-text>
    //       <probable-cause>NULL</probable-cause>
    //       <specific-problem>NULL</specific-problem>
    //       <proposed-repair-actions>NULL</proposed-repair-actions>
    //       <additional-information>
    //         <identifier>NULL</identifier>
    //         <information>NULL</information>
    //       </additional-information>
    //       <fault-severity>low-level-tx-link and/or low-level-rx-link</fault-severity>
    //       <is-cleared>True</is-cleared>
    //       <event-time>NULL</event-time>
    //       <alarm-type>NULL</alarm-type>
    //     </active-alarms>
    //     <active-alarms>
    //       <fault-id>29</fault-id>
    //       <fault-source>Module</fault-source>
    //       <fault-severity>CRITICAL</fault-severity>
    //       <fault-text>Unit has detected a transceiver fault</fault-text>
    //       <probable-cause>NULL</probable-cause>
    //       <specific-problem>NULL</specific-problem>
    //       <proposed-repair-actions>NULL</proposed-repair-actions>
    //       <additional-information>
    //         <identifier>NULL</identifier>
    //         <information>NULL</information>
    //       </additional-information>
    //       <is-cleared>True</is-cleared>
    //       <event-time>NULL</event-time>
    //       <alarm-type>NULL</alarm-type>
    //     </active-alarms>
    //     <active-alarms>
    //       <fault-id>31</fault-id>
    //       <fault-source>Tx-link and/or Rx link</fault-source>
    //       <fault-severity>MAJOR</fault-severity>
    //       <fault-text>C/U-plane detects unexpected message content.</fault-text>
    //       <probable-cause>NULL</probable-cause>
    //       <specific-problem>NULL</specific-problem>
    //       <proposed-repair-actions>NULL</proposed-repair-actions>
    //       <additional-information>
    //         <identifier>NULL</identifier>
    //         <information>NULL</information>
    //       </additional-information>
    //       <is-cleared>True</is-cleared>
    //       <event-time>NULL</event-time>
    //       <alarm-type>NULL</alarm-type>
    //     </active-alarms>
    //   </active-alarm-list>
    //   <md-data-definitions xmlns="urn:o-ran:lbm:1.0">
    //     <maintenance-domain>
    //       <maintenance-association>
    //         <component-list>
    //           <vid/>
    //           <remote-meps/>
    //           <maintenance-association-end-point>
    //           </maintenance-association-end-point>
    //         </component-list>
    //       </maintenance-association>
    //     </maintenance-domain>
    //   </md-data-definitions>
    //   <module-capability xmlns="urn:o-ran:module-cap:1.0">
    //     <ru-capabilities>
    //       <ru-supported-category>CAT_A</ru-supported-category>
    //       <number-of-ru-ports>8</number-of-ru-ports>
    //       <number-of-ru-ports-ul>8</number-of-ru-ports-ul>
    //       <number-of-ru-ports-dl>8</number-of-ru-ports-dl>
    //       <number-of-spatial-streams>8</number-of-spatial-streams>
    //       <max-num-bands>1</max-num-bands>
    //       <max-power-per-pa-antenna>46.02</max-power-per-pa-antenna>
    //       <min-power-per-pa-antenna>0.0</min-power-per-pa-antenna>
    //       <fronthaul-split-option>7</fronthaul-split-option>
    //       <format-of-iq-sample>
    //         <dynamic-compression-supported>false</dynamic-compression-supported>
    //         <realtime-variable-bit-width-supported>false</realtime-variable-bit-width-supported>
    //         <compression-method-supported>
    //           <iq-bitwidth>16</iq-bitwidth>
    //           <compression-type>STATIC</compression-type>
    //           <bitwidth>16</bitwidth>
    //           <compression-method>NO_COMPRESSION</compression-method>
    //           <exponent>4</exponent>
    //           <active-beam-space-coeficient-mask/>
    //           <fs-offset/>
    //         </compression-method-supported>
    //         <compression-method-supported>
    //           <iq-bitwidth>16</iq-bitwidth>
    //           <compression-type>STATIC</compression-type>
    //           <bitwidth>9</bitwidth>
    //           <compression-method>BLOCK_FLOATING_POINT</compression-method>
    //           <exponent>4</exponent>
    //           <active-beam-space-coeficient-mask/>
    //           <fs-offset/>
    //         </compression-method-supported>
    //         <compression-method-supported>
    //           <iq-bitwidth>16</iq-bitwidth>
    //           <compression-type>STATIC</compression-type>
    //           <bitwidth>12</bitwidth>
    //           <compression-method>BLOCK_FLOATING_POINT</compression-method>
    //           <exponent>4</exponent>
    //           <active-beam-space-coeficient-mask/>
    //           <fs-offset/>
    //         </compression-method-supported>
    //         <compression-method-supported>
    //           <iq-bitwidth>16</iq-bitwidth>
    //           <compression-type>STATIC</compression-type>
    //           <bitwidth>14</bitwidth>
    //           <compression-method>BLOCK_FLOATING_POINT</compression-method>
    //           <exponent>4</exponent>
    //           <active-beam-space-coeficient-mask/>
    //           <fs-offset/>
    //         </compression-method-supported>
    //       </format-of-iq-sample>
    //       <energy-saving-by-transmission-blanks>false</energy-saving-by-transmission-blanks>
    //       <dynamic-transport-delay-management-supported>false</dynamic-transport-delay-management-supported>
    //       <support-only-unique-ecpri-seqid-per-eaxc>true</support-only-unique-ecpri-seqid-per-eaxc>
    //       <ud-comp-len-supported>true</ud-comp-len-supported>
    //       <nack-supported>true</nack-supported>
    //       <ul-mixed-num-required-guard-rbs/>
    //       <dl-mixed-num-required-guard-rbs/>
    //     </ru-capabilities>
    //     <band-capabilities>
    //       <band-number>78</band-number>
    //       <sub-band-info>
    //         <sub-band-frequency-ranges/>
    //       </sub-band-info>
    //       <max-supported-frequency-dl>3670000000</max-supported-frequency-dl>
    //       <min-supported-frequency-dl>3300000000</min-supported-frequency-dl>
    //       <max-supported-bandwidth-dl>370000000</max-supported-bandwidth-dl>
    //       <max-num-carriers-dl>2</max-num-carriers-dl>
    //       <max-carrier-bandwidth-dl>100000000</max-carrier-bandwidth-dl>
    //       <min-carrier-bandwidth-dl>10000000</min-carrier-bandwidth-dl>
    //       <supported-technology-dl>NR</supported-technology-dl>
    //       <max-supported-frequency-ul>3670000000</max-supported-frequency-ul>
    //       <min-supported-frequency-ul>3300000000</min-supported-frequency-ul>
    //       <max-supported-bandwidth-ul>370000000</max-supported-bandwidth-ul>
    //       <max-num-carriers-ul>2</max-num-carriers-ul>
    //       <max-carrier-bandwidth-ul>100000000</max-carrier-bandwidth-ul>
    //       <min-carrier-bandwidth-ul>10000000</min-carrier-bandwidth-ul>
    //       <supported-technology-ul>NR</supported-technology-ul>
    //       <max-num-component-carriers>2</max-num-component-carriers>
    //       <max-num-bands>1</max-num-bands>
    //       <max-power-per-antenna>46.02</max-power-per-antenna>
    //       <min-power-per-antenna>0.0</min-power-per-antenna>
    //     </band-capabilities>
    //   </module-capability>
    //   <mplane-info xmlns="urn:o-ran:mplane-interfaces:1.0">
    //     <m-plane-interfaces>          
    //       <m-plane-ssh-ports>
    //         <call-home-ssh-port>4334</call-home-ssh-port>
    //         <server-ssh-port>830</server-ssh-port>
    //       </m-plane-ssh-ports>
    //     </m-plane-interfaces>
    //     <searchable-mplane-access-vlans-info>             
    //          <vlan-range>
    //         <lowest-vlan-id>201</lowest-vlan-id>
    //         <highest-vlan-id>205</highest-vlan-id>
    //       </vlan-range>
    //     </searchable-mplane-access-vlans-info>
    //   </mplane-info>
    //   <operational-info xmlns="urn:o-ran:operations:1.0">
    //     <declarations>
    //       <ru-instance-id>1</ru-instance-id>
    //       <supported-mplane-version>11.0</supported-mplane-version>
    //       <supported-cusplane-version>8.0</supported-cusplane-version>
    //       <supported-header-mechanism>
    //         <protocol>ECPRI</protocol>
    //         <ecpri-concatenation-support>false</ecpri-concatenation-support>
    //         <protocol-version>1.0</protocol-version>
    //       </supported-header-mechanism>
    //     </declarations>
    //   </operational-info>
    //   <performance-measurement-objects xmlns="urn:o-ran:performance-management:1.0">
    //     <measurement-capabilitites>
    //       <transceiver-objects/>
    //       <rx-window-objects/>
    //       <tx-stats-objects/>
    //       <epe-stats-objects/>
    //       <symbol-rssi-stats-objects/>
    //     </measurement-capabilitites>
    //     <transceiver-measurement-interval>15</transceiver-measurement-interval>
    //     <epe-measurement-interval>15</epe-measurement-interval>
    //     <rx-window-measurement-interval>15</rx-window-measurement-interval>
    //     <tx-measurement-interval>15</tx-measurement-interval>
    //     <notification-interval>60</notification-interval>
    //     <file-upload-interval>60</file-upload-interval>
    //     <remote-SFTP-uploads>
    //       <password/>
    //       <server>
    //         <keys/>
    //       </server>
    //       <certificate/>
    //     </remote-SFTP-uploads>
    //     <remote-file-uploads>
    //       <password/>
    //       <server>
    //         <keys/>
    //       </server>
    //       <certificate/>
    //     </remote-file-uploads>
    //     <transceiver-measurement-objects>
    //       <transceiver-measurement-result>
    //         <frequency-bin-table/>
    //       </transceiver-measurement-result>
    //     </transceiver-measurement-objects>
    //     <rx-window-measurement-objects>
    //       <tr-measured-result/>
    //       <eaxc-measured-result/>
    //     </rx-window-measurement-objects>
    //     <tx-measurement-objects>
    //       <tr-measured-result/>
    //       <eaxc-measured-result/>
    //     </tx-measurement-objects>
    //     <epe-measurement-objects>
    //       <epe-measurement-result/>
    //     </epe-measurement-objects>
    //     <symbol-rssi-measurement-objects>
    //       <per-rx-array-carrier-configuration/>
    //       <symbol-rssi-measurement-result>
    //         <per-symbol-index-result>
    //           <frequency-bin-table/>
    //         </per-symbol-index-result>
    //       </symbol-rssi-measurement-result>
    //     </symbol-rssi-measurement-objects>
    //   </performance-measurement-objects>
    //   <processing-elements xmlns="urn:o-ran:processing-element:1.0">
    //     <enhanced-uplane-mapping>
    //       <uplane-mapping/>
    //     </enhanced-uplane-mapping>
    //     <ru-elements>
    //     </ru-elements>
    //     <additional-transport-session-type-elements>
    //       <enhanced-uplane-mapping>
    //         <uplane-mapping/>
    //       </enhanced-uplane-mapping>
    //       <ru-elements>
    //         <transport-flow>
    //           <aliasmac-flow/>
    //           <eth-flow/>
    //           <udpip-flow/>
    //         </transport-flow>
    //       </ru-elements>
    //     </additional-transport-session-type-elements>
    //   </processing-elements>
    //   <software-inventory xmlns="urn:o-ran:software-management:1.0">
    //     <software-slot>
    //       <files/>
    //     </software-slot>
    //   </software-inventory>
    //   <supervision xmlns="urn:o-ran:supervision:1.0">
    //     <cu-plane-monitoring/>
    //     <event-collector-monitoring>
    //       <heartbeat-recipient-id/>
    //     </event-collector-monitoring>
    //     <per-odu-monitoring>
    //       <odu-ids/>
    //       <sro-ids-and-odu-ids/>
    //     </per-odu-monitoring>
    //   </supervision>
    //   <sync xmlns="urn:o-ran:sync:1.0">
    //     <sync-status>
    //       <supported-reference-types/>
    //     </sync-status>
    //     <ptp-config>
    //       <g-8275-2-config>
    //         <master-ip-configuration/>
    //       </g-8275-2-config>
    //       <accepted-clock-classes/>
    //     </ptp-config>
    //     <ptp-status>
    //       <sources/>
    //     </ptp-status>
    //     <synce-config>
    //       <acceptance-list-of-ssm/>
    //     </synce-config>
    //     <synce-status>
    //       <sources/>
    //     </synce-status>
    //     <gnss-config>
    //       <satellite-constelation-list/>
    //     </gnss-config>
    //   </sync>
    //   <port-transceivers xmlns="urn:o-ran:transceiver:1.0">
    //     <port-transceiver-data>
    //       <interface-names/>
    //       <additional-multi-lane-reporting>
    //         <interface-names/>
    //       </additional-multi-lane-reporting>
    //     </port-transceiver-data>
    //   </port-transceivers>
    //   <user-plane-configuration xmlns="urn:o-ran:uplane-conf:1.0">
    //     <endpoint-types>
    //       <id>1</id>
    //       <supported-section-types>
    //         <section-type>1</section-type>
    //         <supported-section-extensions>1</supported-section-extensions>
    //         <supported-section-extensions>11</supported-section-extensions>
    //       </supported-section-types>
    //       <supported-section-types>
    //         <section-type>3</section-type>
    //         <supported-section-extensions>1</supported-section-extensions>
    //       </supported-section-types>
    //       <managed-delay-support>MANAGED</managed-delay-support>
    //       <multiple-numerology-supported>false</multiple-numerology-supported>
    //       <max-sections-per-symbol>8</max-sections-per-symbol>
    //       <max-beams-per-symbol>8</max-beams-per-symbol>
    //       <max-beams-per-slot>56</max-beams-per-slot>
    //       <max-prb-per-symbol>273</max-prb-per-symbol>
    //       <prb-capacity-allocation-granularity>1</prb-capacity-allocation-granularity>
    //       <max-numerologies-per-symbol>1</max-numerologies-per-symbol>
    //       <st4-supported-commands/>
    //       <st4-reception-mask/>
    //       <supported-frame-structures/>
    //       <transmission-buffering-capacity>
    //         <iq-bitwidth>16</iq-bitwidth>
    //         <compression-type>STATIC</compression-type>
    //         <bitwidth>16</bitwidth>
    //         <compression-method>NO_COMPRESSION</compression-method>
    //         <exponent>4</exponent>
    //         <active-beam-space-coeficient-mask/>
    //         <max-buffered-symbols>14</max-buffered-symbols>
    //       </transmission-buffering-capacity>
    //       <transmission-buffering-capacity>
    //         <iq-bitwidth>16</iq-bitwidth>
    //         <compression-type>STATIC</compression-type>
    //         <bitwidth>9</bitwidth>
    //         <compression-method>BLOCK_FLOATING_POINT</compression-method>
    //         <exponent>4</exponent>
    //         <active-beam-space-coeficient-mask/>
    //         <max-buffered-symbols>14</max-buffered-symbols>
    //       </transmission-buffering-capacity>
    //       <transmission-buffering-capacity>
    //         <iq-bitwidth>16</iq-bitwidth>
    //         <compression-type>STATIC</compression-type>
    //         <bitwidth>12</bitwidth>
    //         <compression-method>BLOCK_FLOATING_POINT</compression-method>
    //         <exponent>4</exponent>
    //         <active-beam-space-coeficient-mask/>
    //         <max-buffered-symbols>14</max-buffered-symbols>
    //       </transmission-buffering-capacity>
    //       <transmission-buffering-capacity>
    //         <iq-bitwidth>16</iq-bitwidth>
    //         <compression-type>STATIC</compression-type>
    //         <bitwidth>14</bitwidth>
    //         <compression-method>BLOCK_FLOATING_POINT</compression-method>
    //         <exponent>4</exponent>
    //         <active-beam-space-coeficient-mask/>
    //         <max-buffered-symbols>14</max-buffered-symbols>
    //       </transmission-buffering-capacity>
    //       <max-beams-per-cplane-message>8</max-beams-per-cplane-message>
    //     </endpoint-types>
    //     <endpoint-capacity-sharing-groups>
    //       <id>1</id>
    //       <max-control-sections-per-data-section>8</max-control-sections-per-data-section>
    //       <max-sections-per-symbol>8</max-sections-per-symbol>
    //       <max-sections-per-slot>4</max-sections-per-slot>
    //       <max-remasks-per-section-id>5</max-remasks-per-section-id>
    //       <max-beams-per-symbol>8</max-beams-p am-updates-per-slot>
    //       <max-beam-updates-per-symbol>8</max-beam-updates-per-symbol>
    //       <max-prb-per-symbol>273</max-prb-per-symbol>
    //       <max-numerologies-per-symbol>1</max-numerologies-per-symbol>
    //       <max-endpoints>8</max-endpoints>
    //       <max-managed-delay-endpoints>8</max-managed-delay-endpoints>
    //       <transmission-buffering-capacity>
    //         <iq-bitwidth>16</iq-bitwidth>
    //         <compression-type>STATIC</compression-type>
    //         <bitwidth>16</bitwidth>
    //         <compression-method>NO_COMPRESSION</compression-method>
    //         <exponent>4</exponent>
    //         <active-beam-space-coeficient-mask/>
    //         <max-buffered-symbols>14</max-buffered-symbols>
    //       </transmission-buffering-capacity>
    //       <transmission-buffering-capacity>
    //         <iq-bitwidth>16</iq-bitwidth>
    //         <compression-type>STATIC</compression-type>
    //         <bitwidth>9</bitwidth>
    //         <compression-method>BLOCK_FLOATING_POINT</compression-method>
    //         <exponent>4</exponent>
    //         <active-beam-space-coeficient-mask/>
    //         <max-buffered-symbols>14</max-buffered-symbols>
    //       </transmission-buffering-capacity>
    //       <transmission-buffering-capacity>
    //         <iq-bitwidth>16</iq-bitwidth>
    //         <compression-type>STATIC</compression-type>
    //         <bitwidth>12</bitwidth>
    //         <compression-method>BLOCK_FLOATING_POINT</compression-method>
    //         <exponent>4</exponent>
    //         <active-beam-space-coeficient-mask/>
    //         <max-buffered-symbols>14</max-buffered-symbols>
    //       </transmission-buffering-capacity>
    //       <transmission-buffering-capacity>
    //         <iq-bitwidth>16</iq-bitwidth>
    //         <compression-type>STATIC</compression-type>
    //         <bitwidth>14</bitwidth>
    //         <compression-method>BLOCK_FLOATING_POINT</compression-method>
    //         <exponent>4</exponent>
    //         <active-beam-space-coeficient-mask/>
    //         <max-buffered-symbols>14</max-buffered-symbols>
    //       </transmission-buffering-capacity>
    //       <max-beams-per-cplane-message>8</max-beams-per-cplane-message>
    //     </endpoint-capacity-sharing-groups>
    //     <endpoint-prach-group>
    //       <id>1</id>
    //       <supported-prach-preamble-formats>B4</supported-prach-preamble-formats>
    //     </endpoint-prach-group>
    //     <endpoint-prach-group>
    //       <id>2</id>
    //       <supported-prach-preamble-formats>C2</supported-prach-preamble-formats>
    //     </endpoint-prach-group>
    //     <static-low-level-tx-endpoints>
    //       <name>tx_ep_1</name>
    //       <restricted-interfaces>eth1</restricted-interfaces>
    //       <array>tx_array1</array>
    //       <endpoint-type>1</endpoint-type>
    //       <capacity-sharing-groups>1</capacity-sharing-groups>
    //       <supported-reference-level/>
    //     </static-low-level-tx-endpoints>
    //     <static-low-level-rx-endpoints>
    //       <name>rx_ep_1</name>
    //       <restricted-interfaces>eth1</restricted-interfaces>
    //       <array>rx_array1</array>
    //       <endpoint-type>1</endpoint-type>
    //       <capacity-sharing-groups>1</capacity-sharing-groups>
    //     </static-low-level-rx-endpoints>
    //     <tx-arrays>
    //       <name>tx_array1</name>
    //       <number-of-rows>1</number-of-rows>
    //       <number-of-columns>4</number-of-columns>
    //       <number-of-array-layers>1</number-of-array-layers>
    //       <horizontal-spacing>0.04285</horizontal-spacing>
    //       <normal-vector-direction>
    //         <azimuth-angle>0.0</azimuth-angle>
    //         <zenith-angle>90.0</zenith-angle>
    //       </normal-vector-direction>
    //       <leftmost-bottom-array-element-position>
    //         <x>0.0</x>
    //         <y>0.09</y>
    //         <z>0.9</z>
    //       </leftmost-bottom-array-element-position>
    //       <polarisations>
    //         <p>0</p>
    //         <polarisation>MINUS_45</polarisation>
    //       </polarisations>
    //       <polarisations>
    //         <p>1</p>
    //         <polarisation>PLUS_45</polarisation>
    //       </polarisations>
    //       <capabilities>
    //         <max-supported-frequency-dl>3670000000</max-supported-frequency-dl>
    //         <min-supported-frequency-dl>3300000000</min-supported-frequency-dl>
    //         <max-supported-bandwidth-dl>370000000</max-supported-bandwidth-dl>
    //         <max-num-carriers-dl>2</max-num-carriers-dl>
    //         <max-carrier-bandwidth-dl>100000000</max-carrier-bandwidth-dl>
    //         <min-carrier-bandwidth-dl>10000000</min-carrier-bandwidth-dl>
    //         <supported-technology-dl>NR</supported-technology-dl>
    //       </capabilities>
    //       <band-number>n78</band-number>
    //       <related-o-ru-connectors>
    //         <array-element-id/>
    //       </related-o-ru-connectors>
    //     </tx-arrays>
    //     <rx-arrays>
    //       <name>rx_array1</name>
    //       <number-of-rows>1</number-of-rows>
    //       <number-of-columns>4</number-of-columns>
    //       <number-of-array-layers>1</number-of-array-layers>
    //       <horizontal-spacing>0.04285</horizontal-spacing>
    //       <normal-vector-direction>
    //         <azimuth-angle>0.0</azimuth-angle>
    //         <zenith-angle>90.0</zenith-angle>
    //       </normal-vector-direction>
    //       <leftmost-bottom-array-element-position>
    //         <x>0.0</x>
    //         <y>0.0</y>
    //         <z>0.0</z>
    //       </leftmost-bottom-array-element-position>
    //       <polarisations>
    //         <p>0</p>
    //         <polarisation>MINUS_45</polarisation>
    //       </polarisations>
    //       <polarisations>
    //         <p>1</p>
    //         <polarisation>PLUS_45</polarisation>
    //       </polarisations>
    //       <capabilities>
    //         <max-supported-frequency-ul>3670000000</max-supported-frequency-ul>
    //         <min-supported-frequency-ul>3300000000</min-supported-frequency-ul>
    //         <max-supported-bandwidth-ul>370000000</max-supported-bandwidth-ul>
    //         <max-num-carriers-ul>2</max-num-carriers-ul>
    //         <max-carrier-bandwidth-ul>100000000</max-carrier-bandwidth-ul>
    //         <min-carrier-bandwidth-ul>10000000</min-carrier-bandwidth-ul>
    //         <supported-technology-ul>NR</supported-technology-ul>
    //       </capabilities>
    //       <band-number>n78</band-number>
    //       <related-o-ru-connectors>
    //         <array-element-id/>
    //       </related-o-ru-connectors>
    //     </rx-arrays>
    //     <eaxc-id-group-configuration>
    //       <tx-eaxc-id-group>
    //         <member-tx-eaxc-id/>
    //       </tx-eaxc-id-group>
    //       <rx-eaxc-id-group>
    //         <member-rx-eaxc-id/>
    //       </rx-eaxc-id-group>
    //     </eaxc-id-group-configuration>
    //     <low-level-tx-links/>
    //     <low-level-rx-links/>
    //     <transmission-window-schedules>
    //       <schedule/>
    //     </transmission-window-schedules>
    //     <supported-compression-method-sets>
    //       <compression-method-supported>
    //         <active-beam-space-coeficient-mask/>
    //         <fs-offset/>
    //       </compression-method-supported>
    //     </supported-compression-method-sets>
    //     <low-level-tx-endpoints>
    //       <compression>
    //         <active-beam-space-coeficient-mask/>
    //         <dynamic-compression-configuration/>
    //         <channel-information-compressions/>
    //         <bf-weights-compressions/>
    //       </compression>
    //       <number-of-prb-per-scs/>
    //       <channel-information-prb-group-configuration/>
    //     </low-level-tx-endpoints>
    //     <low-level-rx-endpoints>
    //       <compression>
    //         <active-beam-space-coeficient-mask/>
    //         <dynamic-compression-configuration/>
    //         <bf-weights-compressions/>
    //       </compression>
    //       <number-of-prb-per-scs/>
    //       <ul-fft-sampling-offsets/>
    //     </low-level-rx-endpoints>
    //     <tx-array-carriers>
    //       <laa-carrier-configuration>
    //         <max-cw-usage-counter/>
    //       </laa-carrier-configuration>
    //       <odu-ids/>
    //       <sro-ids-and-odu-ids/>
    //       <state>NULL</state>
    //     </tx-array-carriers>
    //     <rx-array-carriers>
    //       <odu-ids/>
    //       <sro-ids-and-odu-ids/>
    //       <state>NULL</state>
    //     </rx-array-carriers>
    //     <relations>
    //       <array1>
    //         <tx-array-name>tx_array1</tx-array-name>
    //         <rx-array-name>rx_array1</rx-array-name>
    //       </array1>
    //       <types>
    //         <relation-type>SHARED</relation-type>
    //         <pairs/>
    //       </types>
    //     </relations>
    //     <static-prach-configurations>
    //       <prach-patterns>
    //         <occasion-parameters/>
    //       </prach-patterns>
    //     </static-prach-configurations>
    //     <static-srs-configurations>
    //       <srs-patterns/>
    //     </static-srs-configurations>
    //     <configurable-tdd-patterns>
    //       <switching-points/>
    //     </configurable-tdd-patterns>
    //   </user-plane-configuration>
    //   <users xmlns="urn:o-ran:user-mgmt:1.0">
    //     <user>
    //       <name>root</name>
    //       <account-type>PASSWORD</account-type>
    //       <password>sloru@n78</password>
    //       <enabled>True</enabled>
    //       <sro-id>1</sro-id>
    //     </user>
    //     <user>
    //       <name>root</name>
    //       <account-type>PASSWORD</account-type>
    //       <password>sloru@n78</password>
    //       <enabled>True</enabled>
    //       <sro-id>1</sro-id>
    //     </user>
    //   </users>
    //   <historical-alarm-list>
    //     <historical-alarms>
    //       <affected-objects/>
    //       <additional-information/>
    //     </historical-alarms>
    //   </historical-alarm-list>
    //   <fan-tray xmlns="urn:o-ran:fan:1.0">
    //     <fan-state/>
    //   </fan-tray>
    //   <certificate-parameters xmlns="urn:o-ran:certificates:1.0">
    //     <cert-maps>
    //       <cert-to-name/>
    //     </cert-maps>
    //   </certificate-parameters>
    //   <ethernet-forwarding-table xmlns="urn:o-ran:ethernet-fwd:1.0">
    //     <filtering-entry>
    //       <port-map/>
    //     </filtering-entry>
    //   </ethernet-forwarding-table>
    //   <external-io xmlns="urn:o-ran:external-io:1.0">
    //     <input/>
    //     <output/>
    //     <output-setting/>
    //   </external-io>
    //   <nid-group xmlns="urn:ieee:std:802.1X:yang:ieee802-dot1x">
    //     <pae-nid-group/>
    //   </nid-group>
    //   <system xmlns="urn:ietf:params:xml:ns:yang:ietf-system">
    //     <clock/>
    //     <ntp>
    //       <server>
    //         <udp/>
    //       </server>
    //     </ntp>
    //     <dns-resolver>
    //       <search/>
    //       <server>
    //         <udp-and-tcp/>
    //       </server>
    //       <options/>
    //     </dns-resolver>
    //     <radius>
    //       <server>
    //         <udp/>
    //       </server>
    //       <options/>
    //     </radius>
    //     <authentication>
    //       <user-authentication-order/>
    //       <user>
    //         <authorized-key/>
    //       </user>
    //     </authentication>
    //   </system>
    //   <system-state>
    //     <platform/>
    //     <clock/>
    //   </system-state>
    //   <interfaces-state>
    //     <interface>
    //       <higher-layer-if/>
    //       <lower-layer-if/>
    //       <statistics/>
    //       <ipv4>
    //         <address/>
    //         <neighbor/>
    //       </ipv4>
    //       <ipv6>
    //         <address/>
    //         <neighbor/>
    //       </ipv6>
    //     </interface>
    //   </interfaces-state>
    //   <modules-state>
    //     <module>
    //       <deviation/>
    //       <submodule/>
    //     </module>
    //   </modules-state>
    //   <filters>
    //     <stream-filter/>
    //   </filters>
    //   <subscriptions>
    //     <subscription>
    //       <receivers>
    //         <receiver>
    //           <reset>
    //             <input/>
    //             <output/>
    //           </reset>
    //         </receiver>
    //       </receivers>
    //     </subscription>
    //   </subscriptions>
    //   <udp-echo xmlns="urn:o-ran:udpecho:1.0"/>
    //   <ecpri-delay-message xmlns="urn:o-ran:message5:1.0">
    //     <ru-compensation/>
    //     <message5-sessions>
    //       <session-parameters>
    //         <flow-state/>
    //       </session-parameters>
    //     </message5-sessions>
    //   </ecpri-delay-message>
    //   <antenna-calibration xmlns="urn:o-ran:antcal:1.0">
    //     <antenna-calibration-capabilities/>
    //     <self-calibration-policy/>
    //     <antenna-calibration-multiple-time-resource>
    //       <antenna-calibration-multiple-time-resource-list/>
    //     </antenna-calibration-multiple-time-resource>
    //   </antenna-calibration>
    //   <shared-cell xmlns="urn:o-ran:shared-cell:1.0">
    //     <shared-cell-module-cap>
    //       <eaxc-id-group-capabilities/>
    //       <compression-method-supported>
    //         <active-beam-space-coeficient-mask/>
    //       </compression-method-supported>
    //     </shared-cell-module-cap>
    //     <shared-cell-config>
    //       <shared-cell-copy-entities>
    //         <south-node-processing-elements/>
    //         <shared-cell-copy-uplane-config>
    //           <tx-eaxc-id/>
    //           <rx-eaxc-id/>
    //         </shared-cell-copy-uplane-config>
    //       </shared-cell-copy-entities>
    //       <shared-cell-combine-entities>
    //         <south-node-processing-elements/>
    //         <shared-cell-combine-uplane-config>
    //           <rx-eaxc-id>
    //             <cp-ul-section-type/>
    //             <comression-method>
    //               <active-beam-space-coeficient-mask/>
    //             </comression-method>
    //           </rx-eaxc-id>
    //         </shared-cell-combine-uplane-config>
    //       </shared-cell-combine-entities>
    //       <shared-cell-copy-entities-selective-beam-id>
    //         <south-node-processing-elements/>
    //         <mapping-table-for-selective-beam-id/>
    //         <shared-cell-copy-uplane-config>
    //           <tx-eaxc-id/>
    //           <rx-eaxc-id/>
    //         </shared-cell-copy-uplane-config>
    //       </shared-cell-copy-entities-selective-beam-id>
    //       <shared-cell-combine-entities-for-selective-beam-id>
    //         <south-node-processing-elements/>
    //         <shared-cell-combine-uplane-config>
    //           <rx-eaxc-id>
    //             <cp-ul-section-type/>
    //             <comression-method>
    //               <active-beam-space-coeficient-mask/>
    //             </comression-method>
    //           </rx-eaxc-id>
    //         </shared-cell-combine-uplane-config>
    //       </shared-cell-combine-entities-for-selective-beam-id>
    //       <rx-eaxc-id-group>
    //         <member-rx-eaxc-id/>
    //       </rx-eaxc-id-group>
    //     </shared-cell-config>
    //   </shared-cell>
    //   <laa-config xmlns="urn:o-ran:laa:1.0"/>
    //   <beamforming-config xmlns="urn:o-ran:beamforming:1.0">
    //     <per-band-config>
    //       <tx-array/>
    //       <rx-array/>
    //       <static-properties>
    //         <frequency-domain-beams>
    //           <active-beam-space-coeficient-mask/>
    //           <additional-compression-method-supported>
    //             <active-beam-space-coeficient-mask/>
    //           </additional-compression-method-supported>
    //         </frequency-domain-beams>
    //         <time-domain-beams>
    //           <active-beam-space-coeficient-mask/>
    //           <additional-compression-method-supported>
    //             <active-beam-space-coeficient-mask/>
    //           </additional-compression-method-supported>
    //         </time-domain-beams>
    //         <hybrid-beams>
    //           <active-beam-space-coeficient-mask/>
    //           <additional-compression-method-supported>
    //             <active-beam-space-coeficient-mask/>
    //           </additional-compression-method-supported>
    //         </hybrid-beams>
    //       </static-properties>
    //       <beam-information>
    //         <beamforming-properties>
    //           <beamforming-property>
    //             <coarse-fine-beam-relation/>
    //             <neighbour-beams/>
    //             <coarse-fine-beam-capability-based-relation/>
    //             <neighbour-beams-capability-based/>
    //           </beamforming-property>
    //         </beamforming-properties>
    //       </beam-information>
    //     </per-band-config>
    //     <capabilities-groups>
    //       <tx-array/>
    //       <rx-array/>
    //       <static-properties>
    //         <frequency-domain-beams>
    //           <active-beam-space-coeficient-mask/>
    //           <additional-compression-method-supported>
    //             <active-beam-space-coeficient-mask/>
    //           </additional-compression-method-supported>
    //         </frequency-domain-beams>
    //         <time-domain-beams>
    //           <active-beam-space-coeficient-mask/>
    //           <additional-compression-method-supported>
    //             <active-beam-space-coeficient-mask/>
    //           </additional-compression-method-supported>
    //         </time-domain-beams>
    //         <hybrid-beams>
    //           <active-beam-space-coeficient-mask/>
    //           <additional-compression-method-supported>
    //             <active-beam-space-coeficient-mask/>
    //           </additional-compression-method-supported>
    //         </hybrid-beams>
    //       </static-properties>
    //       <beam-information>
    //         <beamforming-properties>
    //           <beamforming-property>
    //             <coarse-fine-beam-relation/>
    //             <neighbour-beams/>
    //             <coarse-fine-beam-capability-based-relation/>
    //             <neighbour-beams-capability-based/>
    //           </beamforming-property>
    //         </beamforming-properties>
    //       </beam-information>
    //     </capabilities-groups>
    //     <ue-specific-beamforming>
    //       <channel-information-compression-method-supported/>
    //     </ue-specific-beamforming>
    //     <operational-properties/>
    //     <beam-tilt>
    //       <predefined-beam-tilt-offset-information/>
    //       <predefined-beam-tilt-state/>
    //     </beam-tilt>
    //   </beamforming-config>
    // </data>
    
    // >
    // `

  
  //   const parser = new XMLParser({
  //     ignoreAttributes: false,
  //     parseAttributeValue: true,
  //     parseNodeValue: true,
  //     parseValue: (value) => {
  //       if (!isNaN(value)) {
  //         if (value.includes('.') || value === '0.0') {
  //           return parseFloat(value).toFixed(1); // Ensures 0.0 remains 0.0
  //         }
  //         return Number(value); // Keeps integers as numbers
  //       }
  //       return value;
  //     },
  //   });
    
  //     const json = parser.parse(xml);
  //     // syncdevicedata(restResult)
  //     // Debugging statement
  //   console.log("Parsed JSON:", JSON.stringify(json, null, 2));
  //     syncdevicedata(json);
  //   } catch (error) {
  //     console.error("Error fetching data from Elasticsearch", error);
  //   }
  // };

  
// const json = parser.parse(xml);
//     // syncdevicedata(restResult)
//     // Debugging statement
//   console.log("Parsed JSON:", JSON.stringify(json, null, 2));
//     syncdevicedata(json);
//   } catch (error) {
//     console.error("Error fetching data from Elasticsearch", error);
//   }
// };

const fetchData = async () => {
  try {
        const username = "admin";
        const password = "admin";
      // JSON Data
      // const JsonData  = ( await connectService.getRUData("/ru_config/_search/"+nodeid));
        let ruData="";
        const baseUri = `${window.location.origin}`;
        const DbPath = baseUri + "/ru_config/_doc/" + deviceId;
        axios.get(DbPath).then((res: any) => {
        ruData = res.data._source.rudata;
        console.log("RuConfigdata",JSON.parse(ruData));
        setruData(ruData);
        // Debugging statement
      console.log("Parsed JSON:", JSON.stringify(ruData, null, 2));
      // Process the JSON data
      syncdevicedata(JSON.parse(ruData));
     })
      

  } catch (error) {
      console.error("Error fetching data", error);
  }
};


  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    loadTab("RUInfo");
  }, [render]);

  useEffect(() => {
    // console.log(formattedEsdata);
    loadTab("RUInfo");
  }, [formattedEsdata]);

  useEffect(() => {
    getItds(properties);
  }, []);

  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  const handleExpandClick = (event) => {
    textallNodeIds?.replace(/^,+/, "")
      .split(",")
      .map((id) => {
        expallNodeIds.push(id);
      });
    currentexpansion = expallNodeIds;
    setisTreeExpandedAll(true);
    setrender(prev => !prev);
    // debouncedHandleClick(event, true);
  };

  const handleCollapseClick = (event) => {
    //currentexpansion=[];
    debouncedHandleClick(event, false);
  };

  const setsearchTertm = (value, e) => {
    currentexpansion = [];
    // handleExpandClick(e);
    setSearchValue(value);
    if (value?.trim() === "") {
      setSearchTxtValue(value);
    }

  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      searchClick(event);
    }
  };

  const loadCurreneSegment = (path, key) => {
    //alert("Path :" + path+" Key:   "+key);
    let pArray = path.split(">>");
    // alert("pArray :" + pArray);
    // RUConfig>>Dhcp>>Interfaces>>Dhcpv4
    // properties['RUConfig'].items.properties.dhcp.properties.interfaces.properties.interface

    let selecteddata: any = [];
    let selecteddata1: any = [];
    let selectedShema1: any = [];
    selecteddata1.push(formattedEsdata[pArray[0]]);
    let shkeyArray = path.split(">>");
    selectedShema1.push(properties[shkeyArray[0]]);
    shkeyArray.splice(0, 1);
    //pArray.splice(pArray.length-1,1);

    let newPath = "";
    for (let p in pArray) {
      newPath = newPath == "" ? pArray[p] : newPath + ">>" + pArray[p];
      if (pArray[p] == key) {
        break;
      }
    }
    setSelectedTreeItem(newPath);
    //alert("NewPath : " + newPath);

    let res: any = [];
    let resShema: any = [];
    let pArray1 = newPath.split(">>");
    let shkeyArray1 = newPath.split(">>");
    res.push(getData(selecteddata1, pArray1, key));
    selSchema = [];
    resShema.push(getshema(selectedShema1, shkeyArray1, key));
    selecteddata = res;
    //selecteddata.push(formattedEsdata['RUConfig']['dhcp']['interfaces']);
    //let schema={"interface": properties['RUConfig'].items.properties.dhcp.properties.interfaces.properties.interface};
    let k = key;
    let filteredShema = {};

    Object.keys(resShema[0])?.map((innerdata) => {
      if (innerdata == key) {
        filteredShema = resShema[0][innerdata]?.properties;
      }
      else if (!resShema[0][innerdata]?.properties) {
        filteredShema[innerdata] = resShema[0][innerdata];
        //alert(ssdata);
      }
    });
    //setCurrentSelection("RUConfig>>dhcp>>interfaces>>dhcpv4");
    setCurrentSelection(newPath);
    if (
      selecteddata &&
      selecteddata[0] && filteredShema &&
      Object.keys(filteredShema)?.length > 0
    ) {
      let schema = filteredShema; //resShema[0][k]?.properties ? resShema[0][k].properties : resShema[0];
      setCurrentProperties(schema);
      let ss =
        selecteddata?.length > 0
          ? selecteddata[0]?.length > 0
            ? selecteddata[0][0][key]
            : selecteddata[0]
          : selecteddata;
      setCurrentSelectiondata(
        selecteddata?.length > 0
          ? selecteddata[0]?.length > 0
            ? selecteddata[0][0][k]
            : selecteddata[0]
          : selecteddata
      );
      setShowSubmitButton(true);
      // alert(selecteddata)
    } else {
      let schema = {};
      setCurrentProperties(schema);
      setShowSubmitButton(false);
    }
  };

  const getData = (data, dkeys, key) => {
    dkeys.forEach((innerkey) => {
      const index = dkeys.indexOf(innerkey);
      if (data) {
        seldata = data[0]
          ? data[0][innerkey]
            ? data[0][innerkey]
            : data[0]
          : data[innerkey];
      }
      dkeys.splice(index, 1);
      if (innerkey == key) {
        return seldata;
      } else {
        getData(seldata, dkeys, key);
        return "";
      }
    });
    return seldata;
  };

  const getshema = (schema, schemaKeys, key) => {
    schemaKeys.forEach((innerkey) => {
      const index = schemaKeys.indexOf(innerkey);
      if (schema && schema[0]) {
        if (schema[0] && schema[0]?.type && schema[0]?.type == "array") {
          selSchema = schema[0]?.items?.properties;
        } else if (
          schema[0] &&
          schema[0]?.type &&
          schema[0]?.type == "object"
        ) {
          selSchema = schema[0]?.properties;
        }
      } else if (selSchema) {
        if (schema && schema.type && schema.type == "array") {
          selSchema = schema?.items?.properties;
        } else if (schema && schema.type && schema.type == "object") {
          selSchema = schema.properties;
        } else if (schema) {
          selSchema = schema;
        } else {
          getshema(selSchema[innerkey], schemaKeys, key);
        }
      }
      schemaKeys.splice(index, 1);
      getshema(selSchema[innerkey], schemaKeys, key);
    });
    return selSchema;
  };

  const searchClick = (e) => {
    // handleExpandClick(e);
    if (searchValue.trim()) {
      
    //alert(`Searching for: ${searchValue}`);
      setSearchTxtValue(searchValue);
    } else {
      alert("Please enter a search value.");
    }
  };

  const CustomArrayFieldTemplate = (props) => {
    const [expandedRow, setExpandedRow] = React.useState(0);
    const [currentArraySelection, setCurrentArraySelection] =
      React.useState(null);
    const toggleRowExpansion = (index) => {
      setExpandedRow((prevState) => (prevState === index ? null : index));
    };
    const handleArrayTabChange = (event, newValue) => {
      setCurrentArraySelection(newValue);
    };
    return (
      <div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            height: "4vh",
            position: "sticky",
            marginBottom: "20px",
          }}
        >
          {props.items && (
            <h3 style={{ width: "90%" }}>{toPascalCase(props.items[0]?.children?.props?.name?.slice(0, -1))?.trim()}</h3>
          )}
          {/* <h3 style={{ width: "90%", }}>{toPascalCase(props.title)}</h3> */}
          {props.canAdd && (
            // <AddIcon
            //   onClick={props.onAddClick}
            //   style={{ height: "3vh", margin: "auto" }}
            // />
            <Tooltip title="Add new item">
              <AddIcon
                onClick={props.onAddClick}
                style={{
                  height: "30px",
                  width: "25px",
                  margin: "auto",
                  color: "green",
                }}
              />
            </Tooltip>
          )}
        </div>
        <AppBar
          position="static"
          style={{
            height: "4.85vh",
            zIndex: "1",
            backgroundColor: "white",
            color: "#36454F",
            display: "flex",
            flexDirection: "row",
            overflow: "hidden",
          }}
        >
          <Tabs
  indicatorColor="secondary"
  textColor="inherit"
  value={currentArraySelection}
  onChange={handleArrayTabChange}
  variant="scrollable"
  scrollButtons="auto" // ✅ Ensures scroll buttons appear when needed
  allowScrollButtonsMobile
  title="Move list"
  sx={{
    "& .MuiTabs-scroller": {
      display: "flex",
      overflowX: "auto", // ✅ Allows horizontal scrolling instead of hiding tabs
      justifyContent: "flex-start", // ✅ Prevents shifting of tabs when zooming
    },
    "& .MuiTabs-scrollButtons": {
      color: "#55679d",
      "&:hover": {
        color: "blue",
      },
    },
    "& .MuiSvgIcon-root": {
      fontSize: 40,
      marginBottom: "15px",
    },
    "& .MuiTabs-flexContainer": {
      minHeight: 40, // ✅ Increased to prevent shrinking when zooming
    },
    "& .MuiTab-root": {
      minHeight: 40, // ✅ Prevents tabs from being too small when zooming in
      height: "auto", // ✅ Allows flexibility instead of fixed height
      flexShrink: 0, // ✅ Prevents shrinking of tabs when zooming
    },
  }}
  aria-label="tabs"
  style={{
    height: "auto", // ✅ Changed from "3vh" to "auto" to prevent cut-off when zooming
    width: "100%", // ✅ Ensures all tabs are considered and don't get hidden
    display: "flex",
    alignItems: "center", // ✅ Ensures proper alignment instead of left alignment
    overflowX: "auto", // ✅ Ensures horizontal scrolling instead of cutting off tabs
  }}
>

            {props?.items?.map((element, index) => (
              <Tab
                key={index}
                onClick={() => toggleRowExpansion(index)}
                label={
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      background:
                        expandedRow === index ? "#55679d" : "#c6cbd1",
                      padding: "0",
                      height: "3vh"
                    }}
                  >
                    {/* {element.children.props.title} */}
                    {element.children.props.name &&
                      toPascalCase(element.children.props.name)}
                    {/* {element.children.props.title.replace(/s([^s]*)$/, "$1")} */}
                    <Tooltip title="Remove item">
                      <RemoveIcon
                        onClick={() => element.onDropIndexClick(index)()}
                        style={{
                          width: "25px",
                          marginLeft: "3px",
                          color: "red",
                          marginTop: "15px"
                        }}
                      />
                    </Tooltip>
                  </div>
                }
                value={element.children.props.name}
                sx={{
                  color: "#000000de",
                  backgroundColor: "#c6cbd1",
                  "&.Mui-selected": {
                    color: "#ffffff",
                    backgroundColor: "#55679d",
                  },
                }}
                style={{
                  cursor: "pointer",
                  background: expandedRow === index ? "#55679d" : "#c6cbd1",
                  opacity: expandedRow === index ? "100" : "50",
                  color: expandedRow === index ? "#ffffff" : "#000",
                  border: "1px solid,rgb(27, 38, 50)",
                  height: "3vh",
                }}
              />
            ))}
          </Tabs>
        </AppBar>
        {props.items.map(
          (element, index) =>
            expandedRow === index && (
              <div
                key={index}
                style={{
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                  marginTop: "2px",
                }}
              >
                {element.children}
              </div>
            )
        )}
      </div>
    );
  };

  const buttonTemplates = {
    SubmitButton: (props) => {
      if (showSubmitButton) {
        return (
          // <Button
          //   variant="contained"
          //   style={{ backgroundColor: "#55679D", color:"white"margin: "20px" }}
          //   type="submit" {...props} >
          //     Submit
          // </Button>
          <div style={{ padding: "5%" }}>
            <Button type="submit" {...props} style={{ backgroundColor: "#55679D", color: "white", width: "100px" }} >
              Submit
            </Button>
          </div>
        );
      }
      return null;
    },
  };

  function loopThroughNestedObjects(data) {
    const paths: any = [];
    // Loop through each `newValue` in the `properties` object
    for (const newValue in data.properties) {
      const item = data?.properties[newValue]?.items?.properties;

      // Loop through keys inside `properties` (e.g., userList, anotherKey)
      for (const key in item) {
        const value = item[key];
        if (typeof value === "object" && !Array.isArray(value)) {
          // If the value is an object (and not an array), include its path
          paths.push(`properties?.${newValue}?.items?.properties?.${key}`);
        }
      }
    }

    return paths;
  }

  const loadTab = (newValue) => {
    //setCurrentTabIndex(newValue);
    // Object.keys(schemaa.properties).filter((key) => schemaa.properties[key].type == "array").forEach((key) => (maindata[key] = schemaa.properties[key]));
    // setCurrentSelection( newValue );
    // setCurrentProperties(properties[newValue]['items']['properties']);
    // setCurrentSelectiondata(formattedEsdata[newValue])
    setCurrentStructure("tree");
  };

  const debouncedHandleChange = useMemo(() => {
    return debounce((element, field, value, pattern, orgValue) => {
      //setErrors((prevItems) => prevItems.filter((error) => error !== field));
      console.log("<<<<<< org value   " + originalValues)
      console.log("<<<<<< changes value  " + value)

      // if(originalValues && originalValues[field]!==value)
      // {
      //   alert("<<<<<< org value   " + originalValues[field])
      // }

      if (originalValues && originalValues[field]?.toString() !== value) {
        if (!changedFields.includes(field))
          changedFields.push(field);
      }
      else {
        let filterchangedFields = changedFields?.filter((item) => item !== field);
        changedFields = filterchangedFields;
        //changedFields.pop(field);
      }


      if (errors.includes(field)) {
        errors.pop(field);
        setErrors(errors);
      }
      const isValid = pattern ? new RegExp(pattern).test(value) : true;

      if (!isValid) {
        if (!errors.includes(field)) {
          errors.push(field);
          setErrors(errors);
        }
      } else if (
        (element?.content?.props?.schema?.maxLen &&
          value?.length > element.content.props.schema.maxLen) ||
        (element?.content?.props?.schema?.minLen &&
          value?.length < element.content.props.schema.minLen)
      ) {
        if (!errors.includes(field)) {
          errors.push(field);
          setErrors(errors);
        }
      }
      element.content.props.onChange(value);
      const numberValue = Number(value);
      if (isNaN(numberValue)) {
        element.content.props.onChange(value);
      }
    }, 1);
  }, []);

  const debouncedHandleClick = useMemo(() => {
    return debounce((event, status) => {
      // textallNodeIds
      //   .replace(/^,+/, "")
      //   .split(",")
      //   .map((id) => {
      //      expallNodeIds.push(id);
      //     //  allNodeIds.map((id) => {
      //     // if (apiRef?.current && typeof apiRef.current.setItemExpansion === "function") {
      //     //   apiRef?.current?.setItemExpansion(event, id, status);
      //     // }
      //   });
      currentexpansion = [];
      setisTreeExpandedAll(status);
    }, 1);
  }, []);

  const handleTextChange = (element, field, value, pattern, idx, e, orgValue) => {
    debouncedHandleChange(element, field, value, pattern, orgValue);
  };

  let level = 0;
  let objectlevel = 0;
  let itlevel = 0;
  let itobjectlevel = 0;

  function toPascalCase(str) {
    return str?.replace(/[^a-zA-Z0-9]+/g, " ")
      .split(" ")
      .map(
        (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
      )
      .join(" ");
  }

  const setCurrentSeletetedData = (selecteddata, keyname) => {      
    setCurrentSelectiondata( selecteddata?.length > 0
          ? selecteddata[0]?.length > 0
            ? selecteddata[0][0][keyname]
            : selecteddata[0]
          : selecteddata
    );
  console.log("selecteddata", selecteddata?.length > 0
    ? selecteddata[0]?.length > 0
      ? selecteddata[0][0][keyname]
      : selecteddata[0]
    : selecteddata)
  };
  const searchInForm = (data, searchTerm, path = "") => {
    let matches: any = [];
    if (typeof data === "string" && data.toLowerCase().includes(searchTerm.toLowerCase()) ) {
      matches.push(path); // Store the path of the matching field
    } 
    else if (Array.isArray(data)) {
      data.forEach((item, index) => {
        matches.push(...searchInForm(item, searchTerm, `${path}[${index}]`));
      });
    } else if (typeof data === "object" && data !== null) {
      Object.keys(data).forEach((key) => {
        if (searchTerm.trim()!="" )
          {
           if(key.toLowerCase().includes(searchTerm.toLowerCase()))
            matches.push( path ? `${path}.${key}` : key)
        }
        matches.push(
          ...searchInForm(
            data[key],
            searchTerm,
            path ? `${path}.${key}` : key
          )
        );
      });
    }

    return matches;
  };
  const traverseobject = (
    searchval,
    name,
    keyname,
    data,
    path,
    selecteddata,
  ) => {
    try {
    objectlevel++;
    let iId = `${keyname}_${objectlevel}`;

    let traversedata = {};
    if (data.properties) {
      Object.keys(data.properties)?.forEach((innerkey) => {
        if (data.properties[innerkey]?.type !== "object") {
          traversedata[innerkey] = data.properties[innerkey];
        }
      });
    }
    if (data.items?.properties) {
      Object.keys(data.items.properties)?.forEach((innerkey) => {
        if (data.items.properties[innerkey]?.type !== "object") {
          traversedata[innerkey] = data.items.properties[innerkey];
        }
      });
    }
    if (keyname === "ru-delay-profile") {
      console.log(keyname);
    }
    var isnotLastKey = false;

    if (data.properties) {
      Object.keys(data.properties).forEach((titem) => {
        if (data.properties[titem]?.type === "object" ) {
          isnotLastKey = true
        }
      });
    }
    if (data.items?.properties) {
      Object.keys(data.items.properties)?.forEach((innerkey) => {
        if (data.items.properties[innerkey]?.type === "object" ) {
          isnotLastKey = true
        }
      });
    }
    let pathh = `${path === "" ? path + keyname : path + ">>" + keyname}`;


    const tobesearched = traversedata;

    const result = searchInForm(tobesearched, searchval);
    var isNewstyle = searchval !== "" && result?.length > 0;
    var currentTreeItem = pathh?.split('>>')[pathh?.split('>>').length - 1]

    // setUpdateStyle(isNewstyle);
    return (
      <div >
        <div style={{
          display: "flex", flexDirection: "row",
          backgroundColor: isNewstyle === true && currentTreeItem === keyname ? "#d4eafd" : "white",
          marginLeft: isNewstyle == false ? "-20px" : "0px",
          width: isNewstyle == false ? "110%" : "100%",
        }}>
          <TreeItem
            expandIcon={isnotLastKey ? <ChevronRight /> : <span style={{ display: "none" }} />} // Hide for last child
            collapseIcon={isnotLastKey ? <ExpandMore /> : <span style={{ display: "none" }} />} // Hide for last child
            key={pathh}
            itemID={pathh}
            label={toPascalCase(keyname)}
            nodeId={pathh}
            style={{
              marginLeft: isNewstyle == false ? "10px" : "-10px",
              width: isNewstyle == false ? "100%" : "110%"
            }}
            sx={{
              // "& .MuiTreeItem-label": {  
              //   backgroundColor: isNewstyle===true && currentTreeItem ===keyname ? "#d4eafd" : "white", 
              //   fontStyle: isNewstyle ===true ? "italic" : "normal",
              //   width: "100%", 
              //   marginTop: "2px",
              // },
              ".MuiTreeItem-content.Mui-selected .MuiTreeItem-label": { color: '#ffffff', backgroundColor: '#53659c' },
            }}

            onClick={() => {
              changedFields = [];
              setCurrentProperties(traversedata),
                setCurrentSelection(
                  path === "" ? path + keyname : path + ">>" + keyname
                );
              setCurrentSeletetedData(selecteddata, keyname);
              originalValues = selecteddata && selecteddata[0]?selecteddata[0]:null;
              setShowSubmitButton(Object.keys(traversedata)?.length > 0);

              if (!currentexpansion.includes(keyname)) {
                currentexpansion.push(keyname);
              }
              console.log(keyname)
              currentexpansion = currentexpansion?.includes(pathh) ? currentexpansion?.filter((node) => node !== pathh) : [...currentexpansion, pathh]
              console.log(currentexpansion)
              if (!isNewstyle)
                setrender(prev => !prev);

              // setCurrentSelectiondata(selecteddata.length > 0 ? selecteddata[0].length > 0 ? selecteddata[0][0][`${keyname}`] : selecteddata[0] : selecteddata)
            }}
          >
            {searchval != "" && result?.length > 0 ? (
              <>
                {pathh.split(">>")?.map((part, index, array) => {
                  const currentPath = array.slice(0, index + 1).join(">>");
                  if (!currentexpansion.includes(currentPath)) {
                    currentexpansion.push(currentPath);
                  }
                })}
              </>
            ) : null}
            {data.properties ?
              Object.keys(data.properties)?.map((innerdata, key: any = "") =>
                (data.properties[innerdata]?.type === "object") ?
               traverseobject(
                    searchval,
                    name,
                    innerdata,
                    data.properties[innerdata],
                    pathh,
                    Object.keys(selecteddata)?.filter((dataKey) => {
                        if (dataKey === "0") {
                          // Nested filter within selecteddata[0]
                          return Object.keys(selecteddata[0])?.some(
                            (innerdatakey) => {
                              key = innerdatakey;
                              return (
                                innerdatakey.split(":")[1] === innerdata || innerdatakey === innerdata
                              );
                            }
                          );
                        } else {
                          // Direct filter condition
                          return (
                            dataKey.split(":")[1] === innerdata || dataKey === innerdata
                          );
                        }
                      })
                      .map((filteredKey) => {
                        return (
                          selecteddata[filteredKey][key] || selecteddata[key] || selecteddata || null
                        );
                      })
                  )
                  : null
              ) :
              Object.keys(data?.items?.properties)?.map((innerdata, key: any = "") =>
               (data?.items?.properties[innerdata]?.type === "object" && selecteddata[innerdata]) 
                  ? traverseobject(
                    searchval,
                    name,
                    innerdata,
                    data?.items?.properties[innerdata],
                    pathh,
                    Object.keys(selecteddata)?.filter((dataKey) => {
                        if (dataKey === "0") {
                          // Nested filter within selecteddata[0]
                          return Object.keys(selecteddata[0])?.some(
                            (innerdatakey) => {
                              key = innerdatakey;
                              return (
                                innerdatakey.split(":")[1] === innerdata ||
                                innerdatakey === innerdata
                              );
                            }
                          );
                        } else {
                          // Direct filter condition
                          return (
                            dataKey.split(":")[1] === innerdata ||
                            dataKey === innerdata
                          );
                        }
                      })
                      .map((filteredKey) => {
                        return (
                          selecteddata[filteredKey][key] || selecteddata[key] || selecteddata || null
                        );
                      })
                  )
                  : null
              )
            }
          </TreeItem>
        </div>
      </div>
    );
  }
  catch(e)
  { 
    console.log("Error >>> " +e)
    return null;
  }
  };

  const traverseArrayobject = (name, keyname, data) => {
    itobjectlevel++;
    let itid = `${keyname}_${itobjectlevel}`;
    //textallNodeIds = textallNodeIds + "," + itid;
    textallNodeIds = textallNodeIds + "," + keyname;
    let traversedata = {};
    if (data.properties) {
      Object.keys(data.properties)?.forEach((innerkey) => {
        if (data.properties[innerkey]?.type !== "object") {
          traversedata[innerkey] = data.properties[innerkey];
        }
      });
      {
        Object.keys(data.properties)?.map((innerdata, key: any = "") =>
          data.properties[innerdata]?.type === "object"
            ? traverseArrayobject(name, innerdata, data.properties[innerdata])
            : null
        );
      }
    }
    else if (data.items.properties) {
      Object.keys(data.items.properties)?.forEach((innerkey) => {
        if (data.items.properties[innerkey]?.type !== "object") {
          traversedata[innerkey] = data.items.properties[innerkey];
        }
      });
      {
        Object.keys(data.items.properties)?.map((innerdata, key: any = "") =>
          data.items.properties[innerdata]?.type === "object"
            ? traverseArrayobject(name, innerdata, data.items.properties[innerdata])
            : null
        );
      }
    }

  };

  const recuArrayItems = (keyName, key) => {
    let treedata = {};
    let objectdata = {};
    itlevel++;
    //alert("level " +level);
    let itid = `${keyName}_${itlevel}`;
    expallNodeIds.push[itid];
    // textallNodeIds = textallNodeIds + "," + itid;
    textallNodeIds = textallNodeIds + "," + keyName;
    try {
      if(key.properties)
      {
        Object.keys(key?.properties)?.map((innerkey) => {
          if (key?.properties[innerkey]?.type !== "object")
          {
            treedata[innerkey] = key?.properties[innerkey];
          } else if (key?.properties[innerkey]?.type === "object") {
            objectdata[innerkey] = key?.properties[innerkey];
          }
        });
      }
      else
      if(key?.items?.properties)
      {
         Object.keys(key?.items?.properties)?.map((innerkey) => {
        if (key?.items?.properties[innerkey]?.type !== "object")
        {
          treedata[innerkey] = key?.items.properties[innerkey];
        }
         else if (key?.items?.properties[innerkey]?.type === "object") {
          objectdata[innerkey] = key?.items?.properties[innerkey];
        }
      });
    }
    } catch (e) {
      console.log("Error 2 >>> "+e);
    }
    Object.keys(objectdata).map((innerobject) =>
      traverseArrayobject(
        `Basic_${keyName}_${level}`,
        innerobject,
        objectdata[innerobject]
      )
    );
  };

  const getItds = (properties) => {
    {
      Object.keys(properties).map((key, index) =>
        properties[key]?.type === "array" ||  properties[key]?.type === "object"
          ? recuArrayItems(key, properties[key])
          : null
      );
    }
  };

  const convertToArray=(treedata:any, seldata:any) =>
    {
      Object.keys(treedata).map((key, index) => {
        if(treedata[Object.keys(treedata)[index]]?.items && ! Array.isArray(seldata[Object.keys(treedata)[index]]))
          {
            const toArray = [seldata[Object.keys(treedata)[index]]];
            seldata[Object.keys(treedata)[index]]=toArray;
            return seldata;
          }
      });
      
      return seldata 
    }
  const recuTreeItem = (
    searchVal,
    chemaPath,
    keyName,
    key,
    path,
    selecteddata
  ) => {
    let treedata = {};
    let objectdata = {};
    level++;
    let pathh = `${path === "" ? path + keyName : path + ">>" + keyName}`;

    if (keyName === "ru-delay-profile") {
      console.log(keyName);
    }

    var isnotLastKey = false;
    if (key.properties) {
      Object.keys(key.properties)?.forEach((titem) => {
        if (key.properties[titem]?.type === "object" ) {
          isnotLastKey = true
        }
      });
    }
    if (key.items?.properties) {
      Object.keys(key.items.properties)?.forEach((innerkey) => {
        if (key.items.properties[innerkey]?.type === "object" ) {
          isnotLastKey = true
        }
      });
    }
    try {
      if (key?.items?.properties) {
        Object.keys(key?.items?.properties)?.forEach((innerkey) => {
          if (
            key?.items?.properties[innerkey]?.type !== "object" && selecteddata[innerkey]
          ) {
            treedata[innerkey] = key?.items.properties[innerkey];
          } else if (key?.items?.properties[innerkey]?.type === "object") {
            objectdata[innerkey] = key?.items?.properties[innerkey];
          }
        });
      }
      else if (key?.properties) {
        Object.keys(key?.properties)?.forEach((innerkey) => {
          if (
            key?.properties[innerkey]?.type !== "object" && selecteddata[innerkey]
          ) {
            treedata[innerkey] = key?.properties[innerkey];
          } else if (key?.properties[innerkey]?.type === "object") {
            objectdata[innerkey] = key?.properties[innerkey];
          }
        });
      }
    } catch (e) {
      console.log(" Error 1 >>>>>  "+e);
    }

    const tobesearched = treedata;
    const result = searchInForm(tobesearched, searchVal);
    var isNewstyle = searchVal !== "" && result?.length > 0;
    // setUpdateStyle(isNewstyle);

    return (
      <div style={{
        display: "flex", flexDirection: "row"
      }}>
        <TreeItem
          expandIcon={isnotLastKey ? <ChevronRight /> : <span style={{ display: "none" }} />} // Hide for last child
          collapseIcon={isnotLastKey ? <ExpandMore /> : <span style={{ display: "none" }} />}
          key={pathh}
          itemID={pathh}
          label={toPascalCase(keyName)}
          nodeId={pathh}
          style={{
            width: "100%",
            backgroundColor: isNewstyle===true ? "#d4eafd" : "white",
            marginLeft: "10px"
          }}

          // sx={{ 
          //   ".MuiTreeItem-root": { 
          //     all: "unset", 
          //     backgroundColor: isNewstyle===true ? "#d4eafd  !important" : "white !important", 
          //     fontStyle: isNewstyle ===true? "italic !important" : "white !important",
          //     width: "100%", 
          //     marginTop: "2px",
          //     paddingLeft:"-10px"
          //   }
          // }}
          sx={{ ".MuiTreeItem-content.Mui-selected .MuiTreeItem-label": { color: '#ffffff', backgroundColor: '#53659c' } }}

          onClick={() => {
            changedFields = [];
            setCurrentSelection(
              path === "" ? path + keyName : path + ">>" + keyName
            );
            setCurrentProperties(treedata),
              setCurrentSeletetedData(convertToArray(treedata,selecteddata), keyName);
            originalValues =selecteddata && selecteddata[0]? selecteddata[0]:null;
            //  setCurrentProperties(null);
            //   setCurrentSelectiondata(null);
            setShowSubmitButton(Object.keys(treedata)?.length > 0);
            currentexpansion = currentexpansion.includes(pathh) ? currentexpansion.filter((node) => node !== pathh) : [...currentexpansion, pathh]
            console.log(currentexpansion
            )
            if (!isNewstyle)
              setrender(prev => !prev);
          }}
        >
          {Object.keys(objectdata).map((innerobject) =>
              (Object.keys(selecteddata).length > 0  &&  selecteddata[innerobject]) ?
            traverseobject(
              searchVal,
              `Basic_${keyName}_${level}`,
              innerobject,
              objectdata[innerobject],
              path === "" ? path + keyName : path + ">>" + keyName,
              Object.keys(selecteddata)
                .filter((dataKey) => {
                  if (dataKey === "0") {
                    return Object.keys(selecteddata[0]).some(
                      (innerdatakey) => {
                        if (innerdatakey === "0") {
                          return Object.keys(selecteddata[0][0]).some(
                            (innerdatakey) => {
                              return (
                                innerdatakey.split(":")[1] === innerobject ||
                                innerdatakey === innerobject
                              );
                            }
                          );
                        } else {
                          return Object.keys(selecteddata[0]).some(
                            (innerdatakey) => {
                              return (
                                innerdatakey.split(":")[1] === innerobject ||
                                innerdatakey === innerobject
                              );
                            }
                          );
                        }
                      }
                    );
                  } else {
                    return (
                      dataKey.split(":")[1] === innerobject ||
                      dataKey === innerobject
                    );
                  }
                })
                .map((filteredKey) => {
                  return (
                    selecteddata[filteredKey] === "" ||
                    selecteddata[filteredKey] ||
                    selecteddata[filteredKey][0] ||
                    selecteddata[filteredKey][innerobject] ||
                    selecteddata[filteredKey][0][innerobject]
                  );
                })
            ):null
          )}
          {/* </TreeItem> */}
          {/* {
            key?.items?.properties ?
              Object.keys(key?.items?.properties)?.map((innerkey) =>
                key?.items?.properties[innerkey]?.type === "array"  &&
                  recuTreeItem(
                    searchVal,
                    [...chemaPath, keyName],
                    innerkey,
                    key?.items?.properties[innerkey],
                    path === "" ? path + keyName : path + ">>" + keyName + "1",
                    Object.keys(selecteddata)
                      .filter((dataKey) => {
                        if (dataKey === "0") {
                          return Object.keys(selecteddata[0]).some(
                            (innerdatakey) => {
                              return (
                                innerdatakey.split(":")[1] === innerkey ||
                                innerdatakey === innerkey
                              );
                            }
                          );
                        } else {
                          return (
                            dataKey.split(":")[1] === innerkey ||
                            dataKey === innerkey
                          );
                        }
                      })?.map((filteredKey) => {
                        return (
                          selecteddata || selecteddata[filteredKey] ||
                          selecteddata[filteredKey][0] ||
                          selecteddata[filteredKey][innerkey] ||
                          selecteddata[filteredKey][0][innerkey]
                        );
                      })
                  )
              ) :
              Object.keys(key?.properties)?.map((innerkey) =>
                key?.properties[innerkey]?.type === "array"
                  ? recuTreeItem(
                    searchVal,
                    [...chemaPath, keyName],
                    innerkey,
                    key?.properties[innerkey],
                    path === "" ? path + keyName : path + ">>" + keyName + "1",
                    Object.keys(selecteddata)
                      .filter((dataKey) => {
                        if (dataKey === "0") {
                          return Object.keys(selecteddata[0])?.some(
                            (innerdatakey) => {
                              return (
                                innerdatakey.split(":")[1] === innerkey ||
                                innerdatakey === innerkey
                              );
                            }
                          );
                        } else {
                          return (
                            dataKey.split(":")[1] === innerkey ||
                            dataKey === innerkey
                          );
                        }
                      })
                      .map((filteredKey) => {
                        return (
                          selecteddata[filteredKey] ||
                          selecteddata[filteredKey][0] ||
                          selecteddata[filteredKey][innerkey] ||
                          selecteddata[filteredKey][0][innerkey]
                        );
                      })
                  )
                  : null
              )
          } */}
        </TreeItem>
      </div>
    );
  };

  const formTemplate = (props) => {
    const { schema } = props;
    const { selformData } = props;

    // Separate properties into text fields and tables
    const textFields: any = [];
    const tables: any = [];
    const objects: any = [];    
    props.properties.forEach((element, index) => {
      console.log("Element Key:", element.content.key);
      console.log("Element Value:", element.content.props?.formData);
      if (element.content.props?.schema?.type === "array") {
        tables.push(
          <div
            key={element.content.key}
            style={{
              marginBottom: "20px",
              padding: "10px",
              overflow: "auto",
              height: "280px",
              width: "auto",
            }}
          >
            {element.content}
          </div>
        );
      } else if (element.content.props?.schema?.type === "object") {
        objects.push(
          <div
            key={element.content.key}
            style={{
              marginBottom: "20px",
              width: "100%",
              border: "1px solid #ccc",
              borderRadius: "5px",
            }}
          >
            {element.content}
          </div>
        );
      } else {
        const valueToDisplay = element.content?.props?.formData !== undefined && element.content?.props?.formData !== null
          ? element.content?.props?.formData
          : (currentSelectiondata && currentSelectiondata[element.content.key]) !== undefined && currentSelectiondata[element.content.key] !== null
          ? currentSelectiondata[element.content.key]
          : "";
  
        console.log("Value to Display:", valueToDisplay);
        textFields.push(
          element.content.props?.schema?.enums && Object.keys(element.content.props?.schema?.enums)?.length ?
            (<div key={element.content.key} style={{ marginLeft: "15px" }}>
              {element?.content?.props?.schema?.displayType === "select" && (
                <div style={{
                  width: "280px",
                  gap: "20px",
                  padding: "10px",
                }}>
                  <InputLabel
                    id={toPascalCase(element.content.key)}
                    sx={{
                      fontSize: "13px",
                      color: searchValue !== "" && element?.content?.key?.includes(searchValue) ? "#55679D" : "grey",
                      fontWeight: searchValue !== "" && element?.content?.key?.includes(searchValue) ? "bold" : "normal",
                    }}
                  >
                    {toPascalCase(element.content.key)}
                  </InputLabel>
                  <Select
                    sx={{
                      fontSize: "13px",
                      marginTop: "10px",
                      width: "280px"
                    }}
                    variant="standard"
                    labelId={toPascalCase(element.content.key)}
                    id={element.content.key}
                    value={element.content.props.formData?.toString() || ""}
                    onChange={(e) =>
                      element.content.props.onChange(e.target.value)
                    }
                    label={toPascalCase(element.content.key)}>
                    {Object.keys(element.content?.props?.schema?.enums).map(
                      (option, index) => (
                        <MenuItem
                          key={index}
                          sx={{ fontSize: "14px" }}
                          value={element.content?.props?.schema?.enums[option]?.toString()}
                        >
                          {element.content?.props?.schema?.enums[option]?.toString()}
                        </MenuItem>
                      )
                    )}
                  </Select>
                </div>
              )}
              {element?.content?.props?.schema?.displayType === "radio" && (
                <div
                  style={{
                    width: "275px",
                    gap: "20px",
                    padding: "10px",
                  }}
                >
                  <FormLabel
                    sx={{
                      fontSize: "13px",
                      color: searchValue !== "" && element?.content?.key?.includes(searchValue) ? "#55679D" : "grey",
                      fontWeight: searchValue !== "" && element?.content?.key?.includes(searchValue) ? "bold" : "normal",
                      marginBottom: "5px",
                    }}
                  >
                    {toPascalCase(element.content.key)}
                  </FormLabel>
                  {/* <RadioGroup 
                                  row
                                  name={element.content.key}
                                  value={element.content.props?.formData?.toString() || ""}
                                  onChange={(e) => {
                                    console.log("Selected value:", e.target.value);
                                    if (element.content.props?.onChange) {
                                      element.content.props.onChange(e.target.value);
                                    }
                                  }}
                                >
                                  {element.content?.props?.schema?.enums?.map((option, index) => {
                                    console.log("Rendering option:", option);
                                    return (
                                      <FormControlLabel 
                                        key={option?.toString() || index} 
                                        value={option?.toString()} 
                                        control={<Radio />} 
                                        label={toPascalCase(option?.toString())} 
                                      />
                                    );
                                  }) || []}
                                </RadioGroup> */}
                  <div style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "10px",
                  }}>
                    {Object.keys(element.content?.props?.schema?.enums)?.map((option, index) => {
                      return (
                        <div style={{ fontFamily: "Roboto, Helvetica, Arial, sans-serif" }}>
                          <input
                            style={{ transform: "scale(1.4)", marginRight: "5px", color: "#36454F", accentColor: "#55679D", fontFamily: "Roboto, Helvetica, Arial, sans-serif", margin: "5px" }}
                            type="radio" id={element.content?.props?.schema?.enums[option]?.toString() || index} name={element.content.key}
                            value={element.content?.props?.schema?.enums[option]?.toString() || ""}
                            checked={element.content.props?.formData?.toString() === element.content?.props?.schema?.enums[option]?.toString()}
                            onChange={(e) => {
                              if (element.content.props?.onChange) {
                                element.content.props.onChange(e.target.value);
                              }
                            }}
                          />
                          <FormLabel
                            sx={{
                              fontSize: "14px",
                              color: "grey",
                            }}
                          >
                            {toPascalCase(element.content?.props?.schema?.enums[option]?.toString())}
                          </FormLabel>
                          {/* <label style={{ fontFamily: "Roboto, Helvetica, Arial, sans-serif" }}> {toPascalCase(option?.toString())} </label> */}
                        </div>
                      );
                    }) || []}
                  </div>
                </div>
              )}

              {element.content.props?.schema?.displayType === "checkbox" && (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "10px",
                    alignItems: "center",
                    justifyContent: "space-around",
                  }}
                >
                  <FormLabel
                    sx={{
                      fontSize: "14px",
                      color: searchValue !== "" && element?.content?.key?.includes(searchValue) ? "#55679D" : "grey",
                      fontWeight: searchValue !== "" && element?.content?.key?.includes(searchValue) ? "bold" : "normal",
                    }}
                  >
                    {" "}
                    {toPascalCase(element.content.key)}
                  </FormLabel>
                  <Checkbox
                    id={element.content.key}
                    checked={!!element.content.props?.formData}
                    onChange={(e) => {
                      element.content.props.onChange(e.target.checked);
                    }}
                  />
                </div>
              )}
            </div>
            ) : (
              <div style={{ marginLeft: "10px" }}>
                {/* <div style={{ marginBottom: "18px",width:"280px", gap:"20px", padding:"10px", pointerEvents: element.content.schemaa.readyOnly ? "none" : "auto",  }}>
                <div key={element?.content?.key}>
                  {React.cloneElement(element?.content, {
                    onChange: (event) =>  handleTextChange(element,element?.content?.key, event, element?.content?.schemaa.patterns),
                  })
                  }
                <div>
                {Boolean(errors.includes(element.content.key))}
                {errors.includes(element.content.key)? element.content.schemaa.helperText:null}
                </div>

                </div>
           </div> */}
                <TextField
                  style={{
                    zIndex: 0,
                    marginBottom: "18px",
                    width: "280px",
                    gap: "20px",
                    padding: "10px",
                    pointerEvents: element.content.props?.schema?.readyOnly
                      ? "none"
                      : "auto",
                  }}
                  inputRef={inputRef}
                  key={element.content.key}
                  id={element.content.key}
                  type={element.content.props?.schema?.type}
                  label={toPascalCase(element.content.key)}
                  variant="standard"
                  value={valueToDisplay}
                  sx={{
                    "& label": {
                      color: searchValue !== "" && element?.content?.key?.includes(searchValue) ? "#55679D" : "grey",
                      fontWeight: searchValue !== "" && element?.content?.key?.includes(searchValue) ? "bold" : "normal",
                      marginLeft: "12px"
                    },
                    "& label.Mui-focused": {
                      color: searchValue !== "" && element?.content?.key?.includes(searchValue) ? "#55679D" : "grey",
                      fontWeight: searchValue !== "" && element?.content?.key?.includes(searchValue) ? "bold" : "normal",
                      marginLeft: "12px"
                    },

                    input: {
                      color:
                        element.content.props.formData ===
                          element.content.props?.schema?.defaultvalues
                          ? "blue"
                          : "",
                      fontStyle: changedFields.includes(element.content.key) ? "italic" : "",
                      border: changedFields.includes(element.content.key) ? "2px solid green" : "0px none white",
                      marginLeft: "10px"
                    },
                  }}
                  title={
                    element.content.props?.formData ===
                      element.content.props?.schema?.defaultvalues
                      ? "Field with default Values ... "
                      : ""
                  }
                  onChange={(e) => {
                    //  element.content.props.onChange(e.target.value);
                    handleTextChange(
                      element,
                      element.content.key,
                      e.target.value,
                      element.content.props?.schema?.patterns,
                      index,
                      e,
                      element.content.props?.formData
                    );
                  }}
                  error={Boolean(errors.includes(element.content.key))}
                  helperText={
                    errors.includes(element.content.key)
                      ? element.content.props?.schema?.helperText
                      : null
                  }
                  fullWidth
                />
              </div>
            )
        );
      }
    });
    function toPascalCase(str) {
      return str?.replace(/[^a-zA-Z0-9]+/g, " ")
        .split(" ")
        .map(
          (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        )
        .join(" ");
    }

    return (
      <div style={{ width: "99%", marginRight: "5px", marginLeft: "5px" }}>
        {props.title && <h5>{toPascalCase(props.title)}</h5>}
        {/* {props.description && <p>{props.description}</p>} */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "3px",
            width: "100%",
            overflow: "auto",
          }}
        >
          {textFields}
        </div>

        {/* Render tables */}
        <div style={{ width: "100%", overflow: "auto", marginLeft: "10px" }}>
          {tables}
        </div>
        <div style={{ width: "100%" }}>{objects}</div>
      </div>
    );
  };

  return (
    <>
      <div
        style={{
          width: "100%",
          margin: "auto",
          overflowY: "auto",
          height: "100%",
          backgroundColor: "#ffffff",
        }}
      >
        <AppBar
          position="static"
          style={{
            height: "5px",
            zIndex: "1",
            display: "flex",
            flexDirection: "row",
          }}
        >
        </AppBar>
        <Container
          style={{
            display: "flex",
            flexDirection: "row",
            margin: "0px",
            padding: "0px",
            maxWidth: "100%",
            paddingTop: "1px",
            backgroundColor: "#EEEEEE",
            height: "95vh",
          }}
        >
          {currentStructure === "tree" ? (
            <div
              style={{
                display: "flex",
                backgroundColor: "white",
                color: "#36454F",
                minHeight: "5%",
                width: isExpanded ? "28%" : "33px",
              }}
            >
              <div
                style={{
                  alignItems: "center",
                  width: isExpanded ? "100%" : "0%",
                  marginTop: "3%",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    width: isExpanded ? "100%" : "0%",
                    marginTop: "2%",
                  }}
                >
                  <input
                    type="text"
                    value={searchValue}
                    onChange={(e) => setsearchTertm(e.target.value, e)}
                    onKeyDown={handleKeyDown}
                    style={{
                      backgroundColor: "white",
                      height: "35px",
                      width: "85%",
                      borderRadius: "5px",
                      border: "solid 2px",
                    }}
                  ></input>
                  <SearchIcon
                    fontSize="large"
                    onClick={searchClick}
                    style={{ color: "#36454F" }}
                  />
                </div>
                <div
                  style={{
                    height: "20px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: isExpanded ? "100%" : "0%",
                    marginTop: "3%",
                    marginLeft: "50%",
                    marginBottom: "3%",
                    paddingRight: "10%",
                  }}
                >
                  {isTreeExpandedAll ? (
                    // <ExpandMore
                    //   fontSize="large"
                    //   onClick={handleCollapseClick}
                    // />
                    <Tooltip title="Collapse Tree">
                      <RemoveIcon
                        onClick={handleCollapseClick}
                        style={{
                          marginRight: "20%",
                          color: "black",
                          height: "50px",
                          width: "30px"
                        }}
                      />
                    </Tooltip>
                  ) : (
                    // <ExpandLess
                    //   fontSize="large"
                    //   onClick={handleExpandClick}
                    // />
                    <Tooltip title="Expand Tree" >
                      <AddIcon
                        onClick={handleExpandClick}
                        style={{
                          marginRight: "20%",
                          color: "black",
                          height: "50px",
                          width: "30px"
                        }}
                      />
                    </Tooltip>
                  )}
                </div>
                <div
                  style={{
                    alignItems: "center",
                    width: isExpanded ? "100%" : "0%",
                    backgroundColor: "white"
                  }}
                >
                  <TreeView
                    // defaultCollapseIcon={<ExpandMore />}
                    // defaultExpandIcon={<ChevronRightIcon />}
                    selected={selectedTreeItem} // This highlights the item
                    onNodeSelect={(event, nodeId) => setSelectedTreeItem(nodeId)}
                    expanded={currentexpansion}
                    sx={{
                      width: isExpanded ? "100%" : "1%",
                      maxHeight: "75vh",
                      overflowY: "auto",
                      overflowX: 'hidden',
                      backgroundColor: "white"
                    }}
                  >
                  {Object.keys(properties)?.map((key, index) =>
                     ( properties[key]?.type === "array" ||  properties[key]?.type === "object" ) &&  (Object.keys(formattedEsdata).length > 0  &&  formattedEsdata[key]) ?
                    
                     recuTreeItem(
                          searchTxtValue,
                          [],
                          key,
                          properties[key],
                          "",
                          formattedEsdata[key] || formattedEsdata
                        )
                        : key=="clock" ? alert(key) :null
                    )}
                  </TreeView>
                </div>
              </div>
              <button
                onClick={toggleExpand}
                style={{
                  width: "30px",
                  alignItems: "center",
                  borderColor: "#55679d",
                  borderWidth: "1px",
                  padding: "1px",
                }}
              >
                {isExpanded ? (
                  <ChevronLeft fontSize="large" />
                ) : (
                  <ChevronRight fontSize="large" />
                )}
              </button>
            </div>
          ) : null}
          <div
            style={{
              width: isExpanded ? "80%" : "95%",
              margin: "auto",
              maxHeight: "96vh",
              overflowY: "auto",
              backgroundColor: "#ffffff",
              marginTop: "1vh",
              marginBottom: "1vh",
              borderRadius: "15px",
            }}
          >
            <div
              style={{
                display: "flex",
                fontSize: "16px",
                fontWeight: "bold",
                flexDirection: "row",
                width: "80%",
                overflow: "auto",
                marginLeft: "20px",
                marginTop: "3vh",
              }}
            >
              <span style={{ paddingRight: "5px" }}>Device ID: </span>
              {deviceId}
              <span style={{ marginLeft: "150px", paddingRight: "5px" }}>
                Netconf Device Status:{" "}
              </span>
              {deviceStatus}
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                width: "80%",
                overflow: "auto",
                margin: "20px",
              }}
            >
              {currentSelection.split(">>")?.map((segment, index) => (
                <div key={index}>
                  <Button
                    disabled={
                      index + 1 === currentSelection.split(">>")?.length
                    }
                    style={{
                      backgroundColor:
                        index + 1 === currentSelection.split(">>")?.length
                          ? "#55679d"
                          : "#c6cbd1",
                      clipPath:
                        "polygon(95% 0, 100% 50%, 95% 100%, 0 100%, 0 0)",
                      marginLeft: "3px",
                      color:
                        index + 1 === currentSelection.split(">>")?.length
                          ? "white"
                          : "#36454F",
                    }}
                    onClick={() =>
                      loadCurreneSegment(currentSelection, segment)
                    }
                  >
                    {toPascalCase(segment)}
                  </Button>
                </div>
              ))}
            </div>
            {currentProperties && Object.keys(currentProperties)?.length > 0 ? (

              <Form
                schema={{ properties: currentProperties }}
                uiSchema={uiSchema}
                validator={dummyValidator}
                formData={currentSelectiondata}
                onSubmit={handleSubmit}
                showErrorList={false}
                templates={{
                  ArrayFieldTemplate: CustomArrayFieldTemplate,
                  ObjectFieldTemplate: formTemplate,
                  ButtonTemplates: buttonTemplates,
                }}
              />
            ) : (
              <div> </div>
            )}
          </div>
        </Container>
      </div>
    </>
  );
};
