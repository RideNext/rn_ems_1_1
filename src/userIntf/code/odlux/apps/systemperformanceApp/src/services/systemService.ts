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
import * as $ from 'jquery';

import { requestRest, formEncode } from '../../../../framework/src/services/restService';
import { systemdata } from '../models/systemServer';
import { PostResponse, DeleteResponse, Result } from '../../../../framework/src/models';
import axios from "axios";
var elsclient = require('../../../../framework/src/elsconnection.js');
//export const profileServerResourcePath = "profilesApp-server";
export const systemServerResourcePath = "systemperformanceAppTest-server";


type systemServerResponse<TData> = { code: number, data: TData };
type IndexableprofileServer = systemdata & { [key: string]: any; };
var indexName = "rn_ems_perf_util";
var docType = "_doc";
var id ="randomNumber";
/** 
 * Represents a web api accessor service for all profile server actions.
 */
class SystemService {
  /**
    * Inserts data into the profiles table.
    */
   
  public async insertprofileServer(server: IndexableprofileServer): Promise<PostResponse | null> {
    //alert('insertprofileServer');
    const randomNumber = (min: number, max: number) => {
      return Math.floor(Math.random()
          * (max - min + 1)) + min;
    };
    let randomID=Math.floor((Math.random() * 10) + 1)*10
    
    let result :any = null;
  //   const payload = {
  //        "id" : randomNumber,
  //       "ProfileName" : server.ProfileName,
  //       "PNFID" : server.PNFID,
  //       "FileName" :server.FileName,
    
  // }
  let formData = new FormData();
    formData.append(
      "file",
      server.File
    );
    //var apibaseurl = (window as any).configs.apibaseurl;
   // var elsbaseurl = (window as any).configs.elsbaseurl;
   const baseUri = `${ window.location.origin }`;
      const response = await axios.post(baseUri+'/proxyapi/upload', formData, {
            headers: { 'content-type': 'multipart/form-data' },
        }).then((response) => {      
        console.log(response.data);
        axios.post(baseUri+'/profilemanagement/_doc',
        {
          "id" : randomID,
          "FileName" : server.FileName,
          "PNFID" : server.PNFID,
          "ProfileName" : server.ProfileName
        }).then((res) => {
          result=res;
        }).catch((error) => {
            console.error("Error save profile: ", error);
            result=error.message;
          })
      }).catch((error) => {
        console.error("Error uploading file: ", error);
        result=error.message;
      });
    return result || null;
  }

  /**
   * Downloads a file using its name.
   *    
   */

  public async downloadprofileServer(server: IndexableprofileServer): Promise<void> {
    const baseUri = `${window.location.origin}`;
    const downloadUrl = `${baseUri}/proxyapi/download?fileName=`+server.FileName.toString();

    try {
      const response = await axios.get(downloadUrl, {
        responseType: 'blob' // Set the response type to 'blob' to handle binary data
      });

      // Create a blob object from the response data
      const blob = new Blob([response.data], { type: response.headers['content-type'] });

      // Create a temporary URL for the blob object
      const url = window.URL.createObjectURL(blob);

      // Create a temporary anchor element to trigger the download
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', server.FileName);
      document.body.appendChild(link);

      // Trigger the download
      link.click();

      // Cleanup
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading file:', error);
      throw error; // Rethrow the error for handling in the calling code if necessary
    }
  }

  /**
    * Updates data into the profiles table.
    */
  public async updateprofileServer(server: IndexableprofileServer): Promise<PostResponse | null> {
    // alert('updateprofileServer');
   // const path = `/restconf/operations/data-provider:updateprofileServer`;
   // var apibaseurl = (window as any).configs.apibaseurl;
   // var elsbaseurl = (window as any).configs.elsbaseurl;
    const baseUri = `${ window.location.origin }`;
    let result = null;
      // let inputData = {
      //   "script" : {
      //     "source": "ctx._source['PNFID']='"+server.PNFID +"';" 
      //       +" ctx._source['FileName']='"+server.FileName +"'"
      //   },
      //   "query": {
      //       "match": {
      //           "ProfileName":server.ProfileName
      //     }
      //   }
      // }
      if(server.File){
      let formData = new FormData();
      formData.append(
        "file",
        server.File
      );
      
      //let uri3 =  (baseUri) + ('/' + '/proxyapi/performancedata').replace(/\/{2,}/i, '/');
      //   const uri2 =  (baseUri) + ('/' + '/proxyapi/getusers').replace(/\/{2,}/i, '/');

      const response = await axios.post(baseUri+'/proxyapi/upload', formData, {
          headers: { 'content-type': 'multipart/form-data' },
      }).then((response) => {
      console.log(response.data);
      axios.post(baseUri+'/profilemanagement/_update_by_query',
        {
          "script" : {
            "source": "ctx._source['PNFID']='"+server.PNFID +"';" 
              +" ctx._source['FileName']='"+server.FileName +"'"
          },
          "query": {
              "match": {
                  "id":server.id
            }
          }
        }).then(function (resp: any) {
          result=resp;
        }, function (err: { message: any; }) {
          result=err.message;
          console.log(err.message);
        })
        .catch((error: { message: any; }) => {
        console.error("Error uploading file: ", error);
        result=error.message;
        });
      })
      .catch((error) => {
        console.error("Error uploading file: ", error);
        result=error.message;
      });
    }
    else
    {
        axios.post(baseUri+'/profilemanagement/_update_by_query',
        {
          "script" : {
            "source": "ctx._source['PNFID']='"+server.PNFID +"';" 
              +" ctx._source['FileName']='"+server.FileName +"'"
          },
          "query": {
              "match": {
                  "id":server.id
            }
          }
        }).then(function (resp: any) {
          result=resp;
        }, function (err: { message: any; }) {
          result=err.message;
          console.log(err.message);
        })
        .catch((error: { message: any; }) => {
        console.error("Error uploading file: ", error);
        result=error.message;
        });
         
    }
    // const profile = await response.json();
    //const result = await requestRest<PostResponse>(path, { method: "PUT", body: JSON.stringify({ input: updatedata }) });
    return result || null;
  }
  /**
    * Deletes data from the profiles table.
    */
  // public async deleteprofileServer(server: sytemdata): Promise<DeleteResponse | null> {
  //   //alert('deleteprofileServer');
  //  // const path = `/restconf/operations/data-provider:delete-profile-server`;
  //  const baseUri = `${ window.location.origin }`;
  //  //var elsbaseurl = (window as any).configs.elsbaseurl;
  //   // let inputData = {
  //   //   "query": {
  //   //       "match": {
  //   //           "id":server.id
  //   //     }
  //   //   }
  //   // }
  //   let result = null;
  //   axios.post(baseUri+'/profilemanagement/_delete_by_query',
  //       {
  //         "query": {
  //           "match": {
  //               "id":server.id
  //         }
  //       }
  //       }).then(function (resp: any) {
  //     result=resp;
  //   }, function (err: { message: any; }) {
  //     result=err.message;
  //     console.log(err.message);
  //   })
  //   .catch((error: { message: any; }) => {
  //   console.error("Error delete profile: ", error);
  //   result=error.message;
  //   });
  //   //const result = await requestRest<DeleteResponse>(path, { method: "POST", body: JSON.stringify({ input: data }) });
  //   return result || null;
  // }

  public async getsysytemServerById(container_name: string): Promise<any | null> {
    
    const path = `systemHistory`;
    const data = { "filter": [{ "property": "id", "filtervalue": container_name }] }
    //const result = await requestRest<Result<systemdata>>(path, { method: "POST", body: JSON.stringify({ input: data }) });

    const baseUri = `${ window.location.origin }`;
    let respose :any;
    let path2 = 'rn_ems_perf_util/_search';
    const uri3 =  baseUri + '/' + path2;
    const fetchResult  = await axios.get(uri3)
    .then((res) => {
        console.log(res);
        respose=res//res;
        return respose;
    }).catch((err) => {
        console.log(err);
        return {
          status: 404,
          message: err && err.message || String(err),
          data: undefined,
        };
    })  ;
    
    if (fetchResult ) {
      return fetchResult
    }
    else {
      return null;
    }
  }

  public async getsysytemHistoryById(container_name: string): Promise<systemdata | null> {
    
    const path = `/restconf/operations/data-provider:read-system-server-list`;
    const data = { "filter": [{ "property": "id", "filtervalue": container_name }] }
    const result = await requestRest<Result<systemdata>>(path, { method: "POST", body: JSON.stringify({ input: data }) });

    if (result && result["data-provider:output"].data[0]) {
      const firstResult = result["data-provider:output"].data[0];
      return {
        // 
        id:firstResult.id,
        container_name:firstResult.container_name,
        cpu_utilization:firstResult.cpu_utilization,
        memory_limit:firstResult.memory_limit,
        memory_percentage:firstResult.memory_percentage,
        memory_usage:firstResult.memory_usage,
        time:firstResult.time,
        file_descriptor_count:firstResult.file_descriptor_count,
        status:firstResult.status,
        Type:firstResult.Type
      }
    }
    else {
      return null;
    }
  }


  private async accasssystemServer<TData = {}>(container_name: string, task: string, data?: {}): Promise<systemServerResponse<TData> | null> {
    alert('accasssystemServer');
    const path = `ms/${container_name}/api/'?task=${task}`;
    const result = (await requestRest<string>(path, {
      method: data ? "POST" : "GET",
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: data ? formEncode({
        ...data,
        ...{ task: task }
      }) : null
    }, true)) || null;

    return result ? JSON.parse(result) as { code: number, data: TData } : null;
  }
}

export const systemService = new SystemService;
export default systemService;