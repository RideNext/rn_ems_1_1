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

import { Result, ResultTopology, ResultUsers } from '../models';
import { DataCallback } from '../components/material-table';

import { requestRest } from '../services/restService';

import { convertPropertyNames, convertPropertyValues, replaceUpperCase, replaceHyphen } from './yangHelper';
import { ListItemButton } from '@mui/material';
import { AnyCnameRecord } from 'dns';
var elasticsearch = require('elasticsearch');
type propType = string | number | null | undefined | (string | number)[];
type dataType = { [prop: string]: propType };

/** Represents a fabric for the searchDataHandler used by the internal data api.
 *  @param typeName The name of the entry type to create a searchDataHandler for.
 *  @param additionalFilters Filterproperties and their values to add permanently.
 *  @returns The searchDataHandler callback to be used with the material table.
*/
function transformKeysToCamelCase(obj: any): any {
  return Object.keys(obj).reduce((acc:any, key) => {
    const camelCaseKey = key.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
    acc[camelCaseKey] = obj[key];
    return acc;
  }, {});
}

function convertKeysToSnakeCase (obj: any): any {
  return Object.keys(obj).reduce((acc:any, key) => {
    const snakeCaseKey = key.replace(/[A-Z]/g, (letter) => `_${letter?.toLowerCase()}`);
    acc[snakeCaseKey] = obj[key];
    return acc;
  }, {});
};
export function createSearchDataHandler<TResult extends {}>(typeName: (() => string) | string, connectToTopologyServer?: boolean, additionalFilters?: {} | null | undefined): DataCallback<(TResult)> {
  const fetchData: DataCallback<(TResult)> = async (pageIndex, rowsPerPage, orderBy, order, filter) => {

    const topologyUrl = `/topology/network/read-${typeof typeName === "function" ? typeName() : typeName}-list`;
    var dataProviderUrl = '';
    if (typeName == 'usersAppTest-server') {
      var apibaseurl = (window as any).configs.apibaseurl;
      //alert(apibaseurl);
      //const baseurl='http://192.168.129.70:3005';
      dataProviderUrl = apibaseurl + '/proxyapi/getusers';
    }
    else {
      dataProviderUrl = `/rests/operations/data-provider:read-${typeof typeName === "function" ? typeName() : typeName}-list`;
    }
    const url = connectToTopologyServer ? topologyUrl : dataProviderUrl;

    filter = { ...filter, ...additionalFilters };

    const filterKeys = filter && Object.keys(filter) || [];

    const input = {
      filter: filterKeys.filter(f => filter![f] != null && filter![f] !== "").map(property => ({ property, filtervalue: filter![property] })),
      sortorder: orderBy ? [{ property: orderBy, sortorder: order === "desc" ? "descending" : "ascending" }] : [],
      pagination: { size: rowsPerPage, page: (pageIndex != null && pageIndex > 0 && pageIndex || 0) + 1 }
    }

    if (url.includes('profilesApp')) {
      const profileData = await requestRest<ResultUsers<TResult>>(url, {
        method: "POST",       // *GET, POST, PUT, DELETE, etc.
        mode: "same-origin",  // no-cors, cors, *same-origin
        cache: "no-cache",    // *default, no-cache, reload, force-cache, only-if-cached
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input), // body data type must match "Content-Type" header
      });

      if (profileData) {
        let filtereddata: any = profileData;
        let profileRows: TResult[] = [];
        if (profileData && Array.isArray(profileData)) {
          if(input?.filter[0]?.filtervalue)
            {
              let providerFilterData:any[]=[]
             // providerFilterData=providerData?.filter(obj =>obj[input.filter[0].property]?..startsWith(input?.filter[0]?.filtervalue.replace('*',''))).map((obj: any) => obj);
              input.filter.map((innerfilter:any)=>{
              const filtered=filtereddata.filter((obj:any)=>{
                console.log(innerfilter.property,innerfilter.filtervalue)
                return obj[innerfilter.property]?.startsWith(innerfilter.filtervalue.split("*")[0])
              })
              filtereddata=filtered
            })
              profileRows = filtereddata?.map((obj: any) => obj) || []
            }
          else
          {
            profileRows = profileData.map(obj => obj) || []
          }
          if (input?.sortorder?.[0] && profileRows.length > 0) {
            const sortProperty = input.sortorder[0].property;
            const isAscending = input.sortorder[0].sortorder === "ascending";
          
            profileRows = profileRows?.sort((a: any, b: any) => {
              const valA = a[sortProperty];
              const valB = b[sortProperty];
          
              // Check if values are numbers
              const isNumeric = !isNaN(valA) && !isNaN(valB);
          
              if (isNumeric) {
                return isAscending ? valA - valB : valB - valA;
              }
          
              // If not numbers, sort as strings
              return isAscending
                ? valA?.localeCompare(valB, undefined, { numeric: true })
                : valB?.localeCompare(valA, undefined, { numeric: true });
            });
          }
          
        }
        const page = input.pagination?.page || 0;
        const size = input.pagination?.size || 10;
        const startIndex = (page - 1) * size + 1;
        const endIndex = startIndex + size -1;
        const paginatedRows = profileRows.slice(startIndex - 1, endIndex);

        var data = {
          page: input.pagination.page-1, total: profileRows ? profileRows?.length : 0, rows: paginatedRows
        };
        return data;
      }
    }
    else if (url.includes('connection-list')) {
      const connectionData = await requestRest<ResultUsers<TResult>>(url, {
        method: "POST",       // *GET, POST, PUT, DELETE, etc.
        mode: "same-origin",  // no-cors, cors, *same-origin
        cache: "no-cache",    // *default, no-cache, reload, force-cache, only-if-cached
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input), // body data type must match "Content-Type" header
      });

      if (connectionData) {
        let filtereddata: any = connectionData;
        let connectionRows: TResult[] = [];
        if (connectionData && Array.isArray(connectionData)) {
          if(input?.filter[0]?.filtervalue)
            {
              let providerFilterData:any[]=[]
             // providerFilterData=providerData?.filter(obj =>obj[input.filter[0].property]?..startsWith(input?.filter[0]?.filtervalue.replace('*',''))).map((obj: any) => obj);
              input.filter.map((innerfilter:any)=>{
              const filtered=filtereddata.filter((obj:any)=>{
                console.log(innerfilter.property,innerfilter.filtervalue)
                return String(obj[innerfilter.property])?.toLowerCase()?.startsWith(innerfilter.filtervalue.split("*")[0]?.toLowerCase())
              })
              filtereddata=filtered
            })
            connectionRows = filtereddata?.map((obj: any) => obj) || []
            connectionRows=connectionRows.map(transformKeysToCamelCase)
            }
          else
          {
            connectionRows = connectionData.map(obj => obj) || []
            connectionRows=connectionData.map(transformKeysToCamelCase)
          }
          if(input?.sortorder[0] && connectionRows.length > 0)
            {
              const camelcase = transformKeysToCamelCase(input?.sortorder[0])
              const sortProperty = camelcase.property;
            const isAscending = camelcase.sortorder === "ascending";
          
            connectionRows = connectionRows?.sort((a: any, b: any) => {
              const valA = a[sortProperty];
              const valB = b[sortProperty];
              console.log(valA,valB,camelcase)
              // Check if values are numbers
              const isNumeric = !isNaN(valA) && !isNaN(valB);
          
              if (isNumeric) {
                return isAscending ? valA - valB : valB - valA;
              }
          
              // If not numbers, sort as strings
              return isAscending
                ? valA?.localeCompare(valB, undefined, { numeric: true })
                : valB?.localeCompare(valA, undefined, { numeric: true });
            });
            }
        }
        const page = input.pagination?.page || 0;
        const size = input.pagination?.size || 10;
        const startIndex = (page - 1) * size + 1;
        const endIndex = startIndex + size -1;
        const paginatedRows = connectionRows.slice(startIndex - 1, endIndex);

        var data = {
          page: input.pagination.page-1, total: connectionRows ? connectionRows?.length : 0, rows: paginatedRows
        };
        return data;
      }
    }
    else if (url.includes('connectionlog-list')) {
      const connectionLogData = await requestRest<ResultUsers<TResult>>(url, {
        method: "POST",       // *GET, POST, PUT, DELETE, etc.
        mode: "same-origin",  // no-cors, cors, *same-origin
        cache: "no-cache",    // *default, no-cache, reload, force-cache, only-if-cached
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input), // body data type must match "Content-Type" header
      });

      if (connectionLogData) {
        let filtereddata: any = connectionLogData;
        let connectionLogRows: TResult[] = [];
        if (connectionLogData && Array.isArray(connectionLogData)) {
          if(input?.filter[0]?.filtervalue)
            {
               input.filter.map((innerfilter:any)=>{
              const filtered=filtereddata.filter((obj:any)=>{
                return String(obj[innerfilter.property])?.toLowerCase()?.startsWith(innerfilter.filtervalue.split("*")[0]?.toLowerCase())
              })
              filtereddata=filtered
            })
            connectionLogRows = filtereddata?.map((obj: any) => obj) || []
            connectionLogRows=connectionLogRows.map(transformKeysToCamelCase)
            }
          else
          {
            connectionLogRows = connectionLogData.map(obj => obj) || []
            connectionLogRows=connectionLogData.map(transformKeysToCamelCase)
          }
          if(input?.sortorder[0] && connectionLogRows.length > 0)
            {
              const sortProperty = input.sortorder[0].property;
            const isAscending = input.sortorder[0].sortorder === "ascending";
          
            connectionLogRows = connectionLogRows?.sort((a: any, b: any) => {
              const valA = a[sortProperty];
              const valB = b[sortProperty];
          
              // Check if values are numbers
              const isNumeric = !isNaN(valA) && !isNaN(valB);
          
              if (isNumeric) {
                return isAscending ? valA - valB : valB - valA;
              }
          
              // If not numbers, sort as strings
              return isAscending
                ? valA?.localeCompare(valB, undefined, { numeric: true })
                : valB?.localeCompare(valA, undefined, { numeric: true });
            });
            }
        }
        const page = input.pagination?.page || 0;
        const size = input.pagination?.size || 10;
        const startIndex = (page - 1) * size + 1;
        const endIndex = startIndex + size -1;
        const paginatedRows = connectionLogRows.slice(startIndex - 1, endIndex);

        var data = {
          page: input.pagination.page-1, total: connectionLogRows ? connectionLogRows?.length : 0, rows: paginatedRows
        };
        return data;
      }
    }
    else if (url.includes('faultcurrent-list')) {
      const FaultData = await requestRest<ResultUsers<TResult>>(url, {
        method: "POST",       // *GET, POST, PUT, DELETE, etc.
        mode: "same-origin",  // no-cors, cors, *same-origin
        cache: "no-cache",    // *default, no-cache, reload, force-cache, only-if-cached
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input), // body data type must match "Content-Type" header
      });

      if (FaultData) {
        let filtereddata: any = FaultData;
        let FaultRows: TResult[] = [];
        if (FaultData && Array.isArray(FaultData)) {
          if(input?.filter[0]?.filtervalue)
            {
              let providerFilterData:any[]=[]
              
             // providerFilterData=providerData?.filter(obj =>obj[input.filter[0].property]?..startsWith(input?.filter[0]?.filtervalue.replace('*',''))).map((obj: any) => obj);
              input.filter.map((innerfilter:any)=>{
                const key = filtereddata.map(transformKeysToCamelCase);
              const filtered=key.filter((obj:any)=>{
                
                return String(obj[innerfilter.property])?.toLowerCase()?.startsWith(innerfilter.filtervalue.split("*")[0]?.toLowerCase())
              })
              filtereddata=filtered
            })
            FaultRows = filtereddata?.map((obj: any) => obj) || []
            //FaultRows=FaultRows.map(transformKeysToCamelCase)
            }
          else
          {
            FaultRows = FaultData.map(obj => obj) || []
            FaultRows=FaultData.map(transformKeysToCamelCase)
          }
          if(input?.sortorder[0] && FaultRows.length > 0)
            {
              const sortProperty = input.sortorder[0].property;
            const isAscending = input.sortorder[0].sortorder === "ascending";
          
            FaultRows = FaultRows?.sort((a: any, b: any) => {
              const valA = a[sortProperty];
              const valB = b[sortProperty];
          
              // Check if values are numbers
              const isNumeric = !isNaN(valA) && !isNaN(valB);
          
              if (isNumeric) {
                return isAscending ? valA - valB : valB - valA;
              }
          
              // If not numbers, sort as strings
              return isAscending
                ? valA?.localeCompare(valB, undefined, { numeric: true })
                : valB?.localeCompare(valA, undefined, { numeric: true });
            });
            }
        }
        const page = input.pagination?.page || 0;
        const size = input.pagination?.size || 10;
        const startIndex = (page - 1) * size + 1;
        const endIndex = startIndex + size -1;
        const paginatedRows = FaultRows.slice(startIndex - 1, endIndex);

        var data = {
          page: input.pagination.page-1, total: FaultRows ? FaultRows?.length : 0, rows: paginatedRows
        };
        return data;
      }
    }
    else if (url.includes('faultlog-list')) {
      const FaultLogData = await requestRest<ResultUsers<TResult>>(url, {
        method: "POST",       // *GET, POST, PUT, DELETE, etc.
        mode: "same-origin",  // no-cors, cors, *same-origin
        cache: "no-cache",    // *default, no-cache, reload, force-cache, only-if-cached
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input), // body data type must match "Content-Type" header
      });

      if (FaultLogData) {
        let filtereddata: any = FaultLogData;
        let FaultLogRows: TResult[] = [];
        if (FaultLogData && Array.isArray(FaultLogData)) {
          if(input?.filter[0]?.filtervalue)
            {
              input.filter.map((innerfilter:any)=>{
                const key = filtereddata.map(transformKeysToCamelCase);
              const filtered=key.filter((obj:any)=>{
                
                return String(obj[innerfilter.property])?.toLowerCase()?.startsWith(innerfilter.filtervalue.split("*")[0]?.toLowerCase())
              })
              filtereddata=filtered
            })
            FaultLogRows = filtereddata?.map((obj: any) => obj) || []
            //FaultLogRows=FaultLogRows.map(transformKeysToCamelCase)
            }
          else
          {
            FaultLogRows = FaultLogData.map(obj => obj) || []
            FaultLogRows=FaultLogData.map(transformKeysToCamelCase)
          }
          if(input?.sortorder[0] && FaultLogRows.length > 0)
            {
              const sortProperty = input.sortorder[0].property;
            const isAscending = input.sortorder[0].sortorder === "ascending";
          
            FaultLogRows = FaultLogRows?.sort((a: any, b: any) => {
              const valA = a[sortProperty];
              const valB = b[sortProperty];
          
              // Check if values are numbers
              const isNumeric = !isNaN(valA) && !isNaN(valB);
          
              if (isNumeric) {
                return isAscending ? valA - valB : valB - valA;
              }
          
              // If not numbers, sort as strings
              return isAscending
                ? valA?.localeCompare(valB, undefined, { numeric: true })
                : valB?.localeCompare(valA, undefined, { numeric: true });
            });
            }
        }
        const page = input.pagination?.page || 0;
        const size = input.pagination?.size || 10;
        const startIndex = (page - 1) * size + 1;
        const endIndex = startIndex + size -1;
        const paginatedRows = FaultLogRows.slice(startIndex - 1, endIndex);

        var data = {
          page: input.pagination.page-1, total: FaultLogRows ? FaultLogRows?.length : 0, rows: paginatedRows
        };
        return data;
      }
    }
    else if (url.includes('providerApp')) {
      const providerData = await requestRest<ResultUsers<TResult>>(url, {
        method: "POST",       // *GET, POST, PUT, DELETE, etc.
        mode: "same-origin",  // no-cors, cors, *same-origin
        cache: "no-cache",    // *default, no-cache, reload, force-cache, only-if-cached
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input), // body data type must match "Content-Type" header
      });

      if (providerData) {
        let provideRows: TResult[] = [];
        let filtereddata: any = providerData;
        if (providerData && Array.isArray(providerData)) {
          if(input?.filter[0]?.filtervalue)
            {
              let providerFilterData:any[]=[]
             // providerFilterData=providerData?.filter(obj =>obj[input.filter[0].property]?..startsWith(input?.filter[0]?.filtervalue.replace('*',''))).map((obj: any) => obj);
              input.filter.map((innerfilter:any)=>{
              const filtered=filtereddata.filter((obj:any)=>{
                console.log(innerfilter.property,innerfilter.filtervalue)
                return obj[innerfilter.property]?.toLowerCase()?.startsWith(innerfilter.filtervalue.split("*")[0]?.toLowerCase())
              })
              filtereddata=filtered
            })
            provideRows = filtereddata?.map((obj: any) => obj) || []
            }
            else
            {
              provideRows = providerData?.map((obj: any) => obj) || []
            }
            if(input?.sortorder[0] && provideRows.length > 0)
              {
                const sortProperty = input.sortorder[0].property;
              const isAscending = input.sortorder[0].sortorder === "ascending";
            
              provideRows = provideRows?.sort((a: any, b: any) => {
                const valA = a[sortProperty];
                const valB = b[sortProperty];
            
                // Check if values are numbers
                const isNumeric = !isNaN(valA) && !isNaN(valB);
            
                if (isNumeric) {
                  return isAscending ? valA - valB : valB - valA;
                }
            
                // If not numbers, sort as strings
                return isAscending
                  ? valA?.localeCompare(valB, undefined, { numeric: true })
                  : valB?.localeCompare(valA, undefined, { numeric: true });
              });
              }
        }
        const page = input.pagination?.page || 0;
        const size = input.pagination?.size || 10;
        const startIndex = (page - 1) * size + 1;
        const endIndex = startIndex + size -1;
        const paginatedRows = provideRows.slice(startIndex - 1, endIndex);

        var data = {
          page: input.pagination.page-1, total: provideRows ? provideRows?.length : 0, rows: paginatedRows
        };
        return data;
      }
    }
    else if (url.includes('systemperformance')) {
      const queryUser = {
        "input": input
      };
      const systemData = await requestRest<ResultUsers<TResult>>(url, {
        method: "POST",       // *GET, POST, PUT, DELETE, etc.
        mode: "same-origin",  // no-cors, cors, *same-origin
        cache: "no-cache",    // *default, no-cache, reload, force-cache, only-if-cached
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(queryUser), // body data type must match "Content-Type" header
      });
      const emsTimeZone = (window as any).configs.REACT_APP_EMS_TIME_ZONE;
      console.log(emsTimeZone);
      if (systemData) {
        let systemRows: TResult[] = [];
        let filtereddata: any = systemData;
        var Sysarray:any []=[];
        if (systemData && Array.isArray(systemData)) {
          if(input?.filter[0]?.filtervalue)
            {
              let providerFilterData:any[]=[]
             // providerFilterData=providerData?.filter(obj =>obj[input.filter[0].property]?..startsWith(input?.filter[0]?.filtervalue.replace('*',''))).map((obj: any) => obj);
              input.filter.map((innerfilter:any)=>{
              const filtered=filtereddata.filter((obj:any)=>{
                console.log(innerfilter.property,innerfilter.filtervalue)
                return obj[innerfilter.property]?.startsWith(innerfilter.filtervalue.split("*")[0])
              })
              filtereddata=filtered
            })
            Sysarray = filtereddata?.map((obj: any) => obj) || []
            }
           else{
            Sysarray = systemData.map((obj: any) => obj);
           }
          for (var i = 0; i < Sysarray.length; i++) {
            try {
              systemRows.push({
                ...Sysarray[i].data[Sysarray[i].data.length - 1],
                time:new Date(
                  Sysarray[i].data[Sysarray[i].data.length - 1].time / 1000
                )
                  .toLocaleString("en-GB", { timeZone: emsTimeZone, hour12: false })
                  .replace(",", "")
                  .replace(/\//g, "-"),
                status: Sysarray[i].status
              });
            }
	    catch (e) {
              console.log(e);
            }                  }
            if(input?.sortorder[0] && systemRows.length > 0)
              {
                const sortProperty = input.sortorder[0].property;
              const isAscending = input.sortorder[0].sortorder === "ascending";
            
              systemRows = systemRows?.sort((a: any, b: any) => {
                const valA = a[sortProperty];
                const valB = b[sortProperty];
            
                // Check if values are numbers
                const isNumeric = !isNaN(valA) && !isNaN(valB);
            
                if (isNumeric) {
                  return isAscending ? valA - valB : valB - valA;
                }
            
                // If not numbers, sort as strings
                return isAscending
                  ? valA?.localeCompare(valB, undefined, { numeric: true })
                  : valB?.localeCompare(valA, undefined, { numeric: true });
              });
              }
          // systemRows = systemData.map(obj => obj) || []
        }
        const page = input.pagination?.page || 0;
        const size = input.pagination?.size || 10;
        const startIndex = (page - 1) * size + 1;
        const endIndex = startIndex + size -1;
        const paginatedRows = systemRows.slice(startIndex - 1, endIndex);
 
        var data = {
          page: input.pagination.page-1, total: systemRows ? systemRows?.length : 0, rows: paginatedRows
        };
        return data;
      }
    }
    else if (url.includes('systemHistory')) {
      const queryUser = {
        "input": input
      };
      const systemData = await requestRest<ResultUsers<TResult>>(url, {
        method: "POST",       // *GET, POST, PUT, DELETE, etc.
        mode: "same-origin",  // no-cors, cors, *same-origin
        cache: "no-cache",    // *default, no-cache, reload, force-cache, only-if-cached
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(queryUser), // body data type must match "Content-Type" header
      });
      const emsTimeZone = (window as any).configs.REACT_APP_EMS_TIME_ZONE;
      console.log(emsTimeZone);
      if (systemData) {
        let systemRows: TResult[] = [];
        if (systemData && Array.isArray(systemData)) {
          var Sysarray = systemData.map(obj => obj);
          var tenparr = [];
          for (var i = 0; i < Sysarray.length - 1; i++) {
            try {
              systemRows.push({
                ...Sysarray[i].data[0],
                time:new Date(
                  Sysarray[i].data[0].time / 1000
                )
                  .toLocaleString("en-GB", { timeZone: emsTimeZone, hour12: false })
                  .replace(",", "")
                  .replace(/\//g, "-"),
                status: Sysarray[i].status
              });
            }
            catch (e) {
              console.log(e);
            }
          }
          // systemRows = systemData.map(obj => obj) || []
        }
        const page = input.pagination?.page || 0;
        const size = input.pagination?.size || 10;
        const startIndex = (page - 1) * size + 1;
        const endIndex = startIndex + size -1;
        const paginatedRows = systemRows.slice(startIndex - 1, endIndex);
 
        var data = {
          page: input.pagination.page-1, total: systemRows ? systemRows?.length : 0, rows: paginatedRows
        };
        return data;
      }
    }
    else if (url.includes('softwaremanagement')) {
      const softwaremanagementData = await requestRest<ResultUsers<TResult>>(url, {
        method: "POST",       // *GET, POST, PUT, DELETE, etc.
        mode: "same-origin",  // no-cors, cors, *same-origin
        cache: "no-cache",    // *default, no-cache, reload, force-cache, only-if-cached
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input), // body data type must match "Content-Type" header
      });
 
      if (softwaremanagementData) {
        let filtereddata: any = softwaremanagementData;
        let softwaremanagementRows: TResult[] = [];
        if (softwaremanagementData && Array.isArray(softwaremanagementData)) {
          if(input?.filter[0]?.filtervalue)
            {
             // providerFilterData=providerData?.filter(obj =>obj[input.filter[0].property]?..startsWith(input?.filter[0]?.filtervalue.replace('*',''))).map((obj: any) => obj);
              input.filter?.map((innerfilter:any)=>{
              const filtered=filtereddata?.filter((obj:any)=>{
                console.log(innerfilter?.property,innerfilter?.filtervalue)
                return obj[innerfilter.property]?.toLocaleString()?.startsWith(innerfilter?.filtervalue?.split("*")[0])
              })
              filtereddata=filtered
            })
            softwaremanagementRows = filtereddata?.map((obj: any) => obj) || []
            }
          else{
                 softwaremanagementRows = softwaremanagementData.map(obj => obj) || []
          }
          if(input?.sortorder[0] && softwaremanagementRows.length > 0)
            {
              const sortProperty = input.sortorder[0].property;
            const isAscending = input.sortorder[0].sortorder === "ascending";
          
            softwaremanagementRows = softwaremanagementRows?.sort((a: any, b: any) => {
              const valA = a[sortProperty];
              const valB = b[sortProperty];
          
              // Check if values are numbers
              const isNumeric = !isNaN(valA) && !isNaN(valB);
          
              if (isNumeric) {
                return isAscending ? valA - valB : valB - valA;
              }
          
              // If not numbers, sort as strings
              return isAscending
                ? valA?.localeCompare(valB, undefined, { numeric: true })
                : valB?.localeCompare(valA, undefined, { numeric: true });
            });
            }
        }
        const page = input.pagination?.page || 0;
        const size = input.pagination?.size || 10;
        const startIndex = (page - 1) * size + 1;
        const endIndex = startIndex + size -1;
        const paginatedRows = softwaremanagementRows.slice(startIndex - 1, endIndex);
 
        var data = {
          page: input.pagination.page-1, total: softwaremanagementRows ? softwaremanagementRows?.length : 0, rows: paginatedRows
        };
        return data;
      }
    }
    else if (url.includes('auditlog')) {
      // const queryUser = {
      //   "input": input
      // };
      const auditlogData  = await requestRest<ResultUsers<TResult>>(url, {
        method: "POST",       
        mode: "same-origin",  
        cache: "no-cache",    
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input), 
      });

      if (auditlogData ) {
        let auditlogRows: TResult[] = [];
        let filtereddata: any = auditlogData;
        if (auditlogData  && Array.isArray(auditlogData )) {
          // if (input?.filter[0]?.filtervalue) {
          //   let auditlogFilterData: any[] = [];
          //   auditlogFilterData = auditlogData.filter(obj =>
          //     obj[input.filter[0].property]
          //       ?..startsWith(input?.filter[0]?.filtervalue.replace('*', ''))
          //   ).map((obj: any) => obj);
          //   auditlogRows = auditlogFilterData?.map((obj: any) => obj) || [];
          // }
          if(input?.filter[0]?.filtervalue)
            {
              let providerFilterData:any[]=[]
             // providerFilterData=providerData?.filter(obj =>obj[input.filter[0].property]?..startsWith(input?.filter[0]?.filtervalue.replace('*',''))).map((obj: any) => obj);
              input.filter.map((innerfilter:any)=>{
              const filtered=filtereddata.filter((obj:any)=>{
                console.log(innerfilter.property,innerfilter.filtervalue)
                return obj[innerfilter.property]?.toLowerCase()?.startsWith(innerfilter.filtervalue.split("*")[0]?.toLowerCase())
              })
              filtereddata=filtered
            })
            auditlogRows = filtereddata?.map((obj: any) => obj) || []
            }
            else
            {
              auditlogRows = auditlogData .map(obj => obj) || []
            }
            if(input?.sortorder[0] && auditlogRows.length > 0)
              {
                const sortProperty = input.sortorder[0].property;
              const isAscending = input.sortorder[0].sortorder === "ascending";
            
              auditlogRows = auditlogRows?.sort((a: any, b: any) => {
                const valA = a[sortProperty];
                const valB = b[sortProperty];
            
                // Check if values are numbers
                const isNumeric = !isNaN(valA) && !isNaN(valB);
            
                if (isNumeric) {
                  return isAscending ? valA - valB : valB - valA;
                }
            
                // If not numbers, sort as strings
                return isAscending
                  ? valA?.localeCompare(valB, undefined, { numeric: true })
                  : valB?.localeCompare(valA, undefined, { numeric: true });
              });
              }
        }

        const page = input.pagination?.page || 0;
        const size = input.pagination?.size || 10;
        const startIndex = (page - 1) * size + 1;
        const endIndex = startIndex + size -1;
        const paginatedRows = auditlogRows.slice(startIndex - 1, endIndex);

        const data = {
          page: input.pagination.page-1, total: auditlogRows ? auditlogRows?.length : 0, rows: paginatedRows
        };
        return data;
      }
    }
    else if (url.includes('data-provider')) {
      console.log("url", url);
      const query = {
        "data-provider:input": input
      };

      const result = await requestRest<Result<TResult>>(url, {
        method: "POST",       // *GET, POST, PUT, DELETE, etc.
        mode: "same-origin",  // no-cors, cors, *same-origin
        cache: "no-cache",    // *default, no-cache, reload, force-cache, only-if-cached
        headers: {
          "Content-Type": "application/json",
          // "Content-Type": "application/x-www-form-urlencoded",
        },
        body: JSON.stringify(convertPropertyValues(query, replaceUpperCase)), // body data type must match "Content-Type" header
      });
      if (result) {
        let configdata: any = result;

        let rows: TResult[] = [];

        if (result && result["data-provider:output"] && result["data-provider:output"].data) {
          rows = result["data-provider:output"].data.map(obj => convertPropertyNames(obj, replaceHyphen)) || []
        }

        const data = {
          page: +(result["data-provider:output"] && result["data-provider:output"].pagination && result["data-provider:output"].pagination.page != null && result["data-provider:output"].pagination.page - 1 || 0), total: +(result["data-provider:output"].pagination && result["data-provider:output"].pagination.total || 0), rows: rows
        };
        return data;
      }
    } 
    else if (url.includes('topology')) {
      const queryTopology = {
        "input": input
      };
      const resultTopology = await requestRest<ResultTopology<TResult>>(url, {
        method: "POST",       // *GET, POST, PUT, DELETE, etc.
        mode: "same-origin",  // no-cors, cors, *same-origin
        cache: "no-cache",    // *default, no-cache, reload, force-cache, only-if-cached
        headers: {
          "Content-Type": "application/json",
          // "Content-Type": "application/x-www-form-urlencoded",
        },
        body: JSON.stringify(queryTopology), // body data type must match "Content-Type" header
      });
      if (resultTopology) {
        let rows: TResult[] = [];

        if (resultTopology && resultTopology.output && resultTopology.output.data) {
          rows = resultTopology.output.data.map(obj => obj) || []
        }

        const data = {
          page: +(resultTopology.output.pagination && resultTopology.output.pagination.page != null && resultTopology.output.pagination.page - 1 || 0), total: +(resultTopology.output.pagination && resultTopology.output.pagination.total || 0), rows: rows
        };
        return data;
      }
    }
    else if (url.includes('proxyapi')) {
      const queryUser = {
        "input": input
      };

      const userData = await requestRest<ResultUsers<TResult>>('http://localhost:8181/auth/v1/users', {
        method: "POST",       // *GET, POST, PUT, DELETE, etc.
        mode: "same-origin",  // no-cors, cors, *same-origin
        cache: "no-cache",    // *default, no-cache, reload, force-cache, only-if-cached
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(queryUser), // body data type must match "Content-Type" header
      });
      if (userData) {
        let userRows: TResult[] = [];
        if (userData && Array.isArray(userData)) {
          
          if(input?.filter[0]?.filtervalue)
            {
              let userFilterData :any[]=[];
              userFilterData= userData.filter(obj =>obj[input.filter[0].property]?.toLowerCase().includes(input?.filter[0]?.filtervalue?.toLowerCase().replace('*',''))).map((obj: any) => obj);
              userRows = userFilterData.map((obj:any) => obj) || [];
            }
            else
            {
              userRows = userData.map(obj => obj) || []
            }
          //userRows = userData.map(obj => obj) || []
        }
        var data = {
          page: 0, total: userRows ? userRows.length : 0, rows: userRows
        };
        return data;
      }
    }
    return { page: 1, total: 0, rows: [] };
  };

  return fetchData;
}

