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
import * as $ from 'jquery';

import { requestRest, formEncode } from '../../../../framework/src/services/restService';
import { profilesdata  } from '../models/profileServer';
import { PostResponse, DeleteResponse, Result } from '../../../../framework/src/models';
import axios from "axios";
var elsclient = require('../../../../framework/src/elsconnection.js');
//export const profileServerResourcePath = "profilesApp-server";
export const profileServerResourcePath = "profilesAppTest-server";


type profileServerResponse<TData> = { code: number, data: TData };
type IndexableprofileServer = profilesdata & { [key: string]: any; };
var indexName = "profilemanagement";
var docType = "_doc";
var id ="randomNumber";
/** 
 * Represents a web api accessor service for all profile server actions.
 */
class ProfileService {
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
    
    let result = null;
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
 
   const baseUri = `${ window.location.origin }`;
      const response = await axios.post(baseUri+  '/proxyapi/upload', formData, {
            headers: { 'content-type': 'multipart/form-data' },
        }).then((response) => {      
        console.log(response.data);
        axios.post(baseUri+'/profilemanagement/_doc',
        {
          "id" : server.ProfileName,
          "FileName" : server.FileName,
          "ProfileName" : server.ProfileName,
          "DeviceType" : server.DeviceType
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
      const json = {
        filename: server.oldfilename
      }
      var parsedData = null;
      var filtereddata = null;
      const storedData = sessionStorage.getItem("profiledata");

      if (storedData) {
        parsedData = JSON.parse(storedData);

        filtereddata = parsedData
          .filter((profile: any) => profile.ProfileName !== server.ProfileName)
          .filter((profile: any) => profile.FileName === server.oldfilename);

        console.log(filtereddata);
      }

      //let uri3 =  (baseUri) + ('/' + '/proxyapi/performancedata').replace(/\/{2,}/i, '/');
      //   const uri2 =  (baseUri) + ('/' + '/proxyapi/getusers').replace(/\/{2,}/i, '/');
      if (filtereddata.length === 0) {
        try {
          await axios.post( baseUri + "/proxyapi/delete", json, {
            headers: { "content-type": "application/json" },
          });
        } catch (Error) {}
      }
      const response = await axios.post(baseUri+'/proxyapi/upload', formData, {
          headers: { 'content-type': 'multipart/form-data' },
      })
      console.log(response.data);
      await axios.post(baseUri+'/profilemanagement/_update_by_query',
        {
          "script" : {
            "source": "ctx._source['ProfileName']='"+server.ProfileName +"';" 
              +" ctx._source['FileName']='"+server.FileName +"';"
              +" ctx._source['id']='"+server.ProfileName +"';"
              +" ctx._source['DeviceType']='"+server.DeviceType +"';"
          },
          "query": {
              "term": {
                  "ProfileName.keyword":server.id
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
    else
    {
        axios.post(baseUri+'/profilemanagement/_update_by_query',
        {
          "script" : {
            "source": "ctx._source['ProfileName']='"+server.ProfileName +"';" 
              +" ctx._source['FileName']='"+server.FileName +"';"
              +" ctx._source['id']='"+server.ProfileName +"';"
              +" ctx._source['DeviceType']='"+server.DeviceType +"';"
          },
          "query": {
              "term": {
                  "ProfileName.keyword":server.id
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
  public async deleteprofileServer(server: profilesdata): Promise<DeleteResponse | null> {
    //alert('deleteprofileServer');
   // const path = `/restconf/operations/data-provider:delete-profile-server`;
   const baseUri = `${ window.location.origin }`;
   //var elsbaseurl = (window as any).configs.elsbaseurl;
    // let inputData = {
    //   "query": {
    //       "match": {
    //           "id":server.id
    //     }
    //   }
    // }
    let result = null;
    console.log(server)
    const json = {
      filename: server.FileName
    }
    var parsedData = null;
      var filtereddata = null;
      const storedData = sessionStorage.getItem("profiledata");

      if (storedData) {
        parsedData = JSON.parse(storedData);

        filtereddata = parsedData
          .filter((profile: any) => profile.ProfileName !== server.ProfileName)
          .filter((profile: any) => profile.FileName === server.oldfilename);

        console.log(filtereddata);
      }

      //let uri3 =  (baseUri) + ('/' + '/proxyapi/performancedata').replace(/\/{2,}/i, '/');
      //   const uri2 =  (baseUri) + ('/' + '/proxyapi/getusers').replace(/\/{2,}/i, '/');
      if (filtereddata.length === 0) {
        try {
          await axios.post( baseUri + "/proxyapi/delete", json, {
            headers: { "content-type": "application/json" },
          });
        } catch (Error) {}
      }
    await axios.post(baseUri+'/profilemanagement/_delete_by_query',
      {
        "query": {
          "term": {
              "ProfileName.keyword":server.ProfileName
        }
      }
      }).then(function (resp: any) {
    result=resp;
  }, function (err: { message: any; }) {
    result=err.message;
    console.log(err.message);
  }).catch((error: { message: any; }) => {
    console.error("Error delete profile: ", error);
    result=error.message;
    });
    return result || null;
  }

  public async getprofileServerById(serverId: string): Promise<profilesdata | null> {
    alert('getprofileServerById');
    const path = `/restconf/operations/data-provider:read-profile-server-list`;
    const data = { "filter": [{ "property": "id", "filtervalue": serverId }] }
    const result = await requestRest<Result<profilesdata>>(path, { method: "POST", body: JSON.stringify({ input: data }) });

    if (result && result["data-provider:output"].data[0]) {
      const firstResult = result["data-provider:output"].data[0];
      return {
        // FileID: firstResult.FileID,
        id: firstResult.id,
        File: firstResult.File,
        FileName:firstResult.FileName,
        ProfileName: firstResult.ProfileName,
        FilePath: firstResult.FilePath,
        PNFID: firstResult.PNFID,
        DeviceType: firstResult.DeviceType,
        oldfilename:firstResult.oldfilename
      }
    }
    else {
      return null;
    }
  }

  private async accassprofileServer<TData = {}>(profileServerId: string, task: string, data?: {}): Promise<profileServerResponse<TData> | null> {
    alert('accassprofileServer');
    const path = `ms/${profileServerId}/api/'?task=${task}`;
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

export const profileService = new ProfileService;
export default profileService;