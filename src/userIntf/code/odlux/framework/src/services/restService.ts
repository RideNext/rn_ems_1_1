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

import { ReplaceAction } from '../actions/navigationActions';
import { AddErrorInfoAction } from '../actions/errorActions';

import { storeService } from './storeService';
import axios, { AxiosRequestConfig } from 'axios';
import https from 'https';
const baseUri = `${window.location.origin}`;
const absUrlPattern = /^https?:\/\//;


export const formEncode = (params: { [key: string]: string | number }) => Object.keys(params).map((key) => {
  return encodeURIComponent(key) + '=' + encodeURIComponent(params[key].toString());
}).join('&');

const wildcardToRegexp = (pattern: string) => {
  return new RegExp('^' + pattern.split(/\*\*/).map((p) => p.split(/\*+/).map((i) => i.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&')).join('^[/]')).join('.*') + '$');
};
var elseclient = require('.././elsconnection.js');
var indexName = "profilemanagement";
var docType = "_doc";
export const getAccessPolicyByUrl = (url: string) => {
  const result = {
    GET: false,
    POST: false,
    PUT: false,
    PATCH: false,
    DELETE: false,
  };

  if (!storeService.applicationStore) return result;

  const { state: { framework: { applicationState: { enablePolicy }, authenticationState: { policies } } } } = storeService.applicationStore!;

  result.GET = true;
  result.POST = true;
  result.PUT = true;
  result.PATCH = true;
  result.DELETE = true;

  if (!enablePolicy || !policies || policies.length === 0) return result;

  policies.forEach(p => {
    const re = wildcardToRegexp(p.path);
    if (re.test(url)) {
      result.GET = p.methods.get != null ? p.methods.get : result.GET;
      result.POST = p.methods.post != null ? p.methods.post : result.POST;
      result.PUT = p.methods.put != null ? p.methods.put : result.PUT;
      result.PATCH = p.methods.patch != null ? p.methods.patch : result.PATCH;
      result.DELETE = p.methods.delete != null ? p.methods.delete : result.DELETE;
    }
  });
  return result;
};

/** Sends a rest request to the given path and reports the server state. 
 *  @returns An object with the server state, a message and the data or undefined in case of a json parse error.
 */
export async function requestRestExt<TData>(path: string = '', initParam: RequestInit = {}, authenticate: boolean = true, isResource: boolean = false): Promise<{ status: number; message?: string; data: TData | null | undefined }> {

  const result: { status: number; message?: string; data: TData | null } = {
    status: -1,
    data: null,
  };
  const isAbsUrl = absUrlPattern.test(path);
  const uri = isAbsUrl ? path : isResource ? path.replace(/\/{2,}/i, '/') : (baseUri) + ('/' + path).replace(/\/{2,}/i, '/');
  const init = {
    'method': 'GET',
    ...initParam,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...initParam.headers,
    } as HeadersInit,
  };
  if (!isAbsUrl && authenticate && storeService.applicationStore) {
    const { state: { framework: { authenticationState: { user } } } } = storeService.applicationStore;
    // do not request if the user is not valid

    if (!user || !user.isValid || !user.token || !user.tokenType) {
      return {
        ...result,
        message: 'User is not valid or not logged in.',
      };
    }
    (init.headers = {
      ...init.headers,
      'Authorization': `${user.tokenType} ${user.token}`,
      //'Authorization': 'Basic YWRtaW46YWRtaW4='
    });
  }
  var fetchResult
  if (uri.includes('users')) { //Get User Data
    var apibaseurl = (window as any).configs.apibaseurl;

    const data2 = {
      client_id: 'admin-cli',
      grant_type: 'password',
      username: "admin",
      password: 'Kp8bJ4SXszM0WXlhak3eHlcse2gAw84vaoGGmJvUy2U'
    }

    const customHeaders = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    };
    const tokenHeaders = {
      'Authorization': 'Basic ' + btoa("admin" + ':' + "admin"),
      'content-type': 'application/x-www-form-urlencoded',
      'accept': 'application/json'
    };
    const uri4 = (baseUri) + '/realms/master/protocol/openid-connect/token';
    const uri1 = (baseUri) + '/admin/realms/onap/users';
    let respose: any;
    await axios.post(uri4, data2, {
      headers: tokenHeaders,
    }).then((res: any) => {
      //console.log(res);
      respose = res;
    }).catch((err: { message: any; }) => {
      console.log(err);
      return {
        ...result,
        status: 404,
        message: err && err.message || String(err),
        data: undefined,
      };
    })

    try {
      fetchResult = await fetch(uri1, {
        headers: {
          'content-type': 'application/json',
          'accept': 'application/json',
          'Authorization': 'bearer ' + respose.data.access_token
        }
      })

      const contentType = fetchResult.headers.get('Content-Type') || fetchResult.headers.get('content-type');
      const data = await fetchResult.json() as TData;
      return {
        ...result,
        status: fetchResult.status,
        message: fetchResult.statusText,
        data: data,
      };
    } catch (error) {
      return {
        ...result,
        status: fetchResult ? fetchResult.status : 404,
        message: error && error.message || String(error),
        data: undefined,
      };
    }
  }

  else if (uri.includes('basic_config')) { //Get system performance
    let respose: any;
    const url = baseUri + '/basic_config/_search'
    const instance = axios.create({
      httpsAgent: new https.Agent({
        rejectUnauthorized: false,
        requestCert: false
      })
    });
    const len=uri.split('/');
    const nodeid = uri.split('/')[len.length-1];
    fetchResult = await axios.post(url,
      { 
        "query": {
        "match": {
           "_id":nodeid
        }
      }
    }
   ).then((res) => {
        respose = res//res;
      }).catch((err) => {
        console.log(err);
        if (
          err.response.data.error.type &&
          err.response.data.error.type == "index_not_found_exception"
        ) {
          const baseUri = `${window.location.origin}`;
          var uri4 = baseUri + "basic_config/";
          axios
            .put(uri4)
            .then((res: any) => {
              console.log(res);
            })
            .catch((err: any) => {
              console.log(err);
            });
        }
        return {
          ...result,
          status: 404,
          message: err && err.message || String(err),
          data: undefined,
        };
      });
    try {
      const data = await respose.data.hits.hits.map((hit: { _source: any; }) => hit._source)[0]['basicdata'] as unknown as TData;
      return {
        ...result,
        status: 200,
        message: "Sucess",
        data: data,
      };
    } catch (error) {
      return {
        ...result,
        // status: fetchResult.status,
        message: error && error.message || String(error),
        data: undefined,
      };
    }
  }

  else if (uri.includes('ru_config')) { //Get system performance
    let respose: any;
    const url = baseUri + '/ru_config/_search'
    const instance = axios.create({
      httpsAgent: new https.Agent({
        rejectUnauthorized: false,
        requestCert: false
      })
    });
    const len=uri.split('/');
    const nodeid = uri.split('/')[len.length-1];
    fetchResult = await axios.post(url,
      { 
        "query": {
        "match": {
           "_id":nodeid
        }
      }
    }
   ).then((res) => {
        respose = res//res;
      }).catch((err) => {
        console.log(err);
        if (
          err.response.data.error.type &&
          err.response.data.error.type == "index_not_found_exception"
        ) {
          const baseUri = `${window.location.origin}`;
          var uri4 = baseUri + "ru_config/";
          axios
            .put(uri4)
            .then((res: any) => {
              console.log(res);
            })
            .catch((err: any) => {
              console.log(err);
            });
        }
        return {
          ...result,
          status: 404,
          message: err && err.message || String(err),
          data: undefined,
        };
      });
    try {
      const data = await respose.data.hits.hits.map((hit: { _source: any; }) => hit._source)[0]['rudata'] as unknown as TData;
      return {
        ...result,
        status: 200,
        message: "Sucess",
        data: data,
      };
    } catch (error) {
      return {
        ...result,
        // status: fetchResult.status,
        message: error && error.message || String(error),
        data: undefined,
      };
    }
  }

  else if (uri.includes('cell_config')) { //Get system performance
    let respose: any;
    const url = baseUri + '/cell_config/_search'
    const instance = axios.create({
      httpsAgent: new https.Agent({
        rejectUnauthorized: false,
        requestCert: false
      })
    });
    const len=uri.split('/');
    const nodeid = uri.split('/')[len.length-1];
    fetchResult = await axios.post(url,
      { 
        "query": {
        "match": {
           "_id":nodeid
        }
      }
    }
   ).then((res) => {
        respose = res//res;
      }).catch((err) => {
        console.log(err);
        if (
          err.response.data.error.type &&
          err.response.data.error.type == "index_not_found_exception"
        ) {
          const baseUri = `${window.location.origin}`;
          var uri4 = baseUri + "/cell_config/";
          axios
            .put(uri4)
            .then((res: any) => {
              console.log(res);
            })
            .catch((err: any) => {
              console.log(err);
            });
        }
        return {
          ...result,
          status: 404,
          message: err && err.message || String(err),
          data: undefined,
        };
      });
    try {
      const data = await respose.data.hits.hits.map((hit: { _source: any; }) => hit._source)[0]['cellConfigdata'] as unknown as TData;
      return {
        ...result,
        status: 200,
        message: "Sucess",
        data: data,
      };
    } catch (error) {
      return {
        ...result,
        // status: fetchResult.status,
        message: error && error.message || String(error),
        data: undefined,
      };
    }
  }
  else if (uri.includes('cuup_config')) { //Get system performance
    let respose: any;
    const url = baseUri + '/cuup_config/_search'
    const instance = axios.create({
      httpsAgent: new https.Agent({
        rejectUnauthorized: false,
        requestCert: false
      })
    });
    const len=uri.split('/');
    const nodeid = uri.split('/')[len.length-1];
    fetchResult = await axios.post(url,
      { 
        "query": {
        "match": {
           "_id":nodeid
        }
      }
    }
   ).then((res) => {
        respose = res//res;
      }).catch((err) => {

        console.log(err);
        if (
          err.response.data.error.type &&
          err.response.data.error.type == "index_not_found_exception"
        ) {
          const baseUri = `${window.location.origin}`;
          var uri4 = baseUri + "/cuup_config/";
          axios
            .put(uri4)
            .then((res: any) => {
              console.log(res);
            })
            .catch((err: any) => {
              console.log(err);
            });
        }
        return {
          ...result,
          status: 404,
          message: err && err.message || String(err),
          data: undefined,
        };
      });
    try {
      const data = await respose.data.hits.hits.map((hit: { _source: any; }) => hit._source)[0]['cuupdata'] as unknown as TData;
      return {
        ...result,
        status: 200,
        message: "Sucess",
        data: data,
      };
    } catch (error) {
      return {
        ...result,
        // status: fetchResult.status,
        message: error && error.message || String(error),
        data: undefined,
      };
    }
  }
  else if (uri.includes('cucp_config')) { //Get system performance
    let respose: any;
    const url = baseUri + '/cucp_config/_search'
    const instance = axios.create({
      httpsAgent: new https.Agent({
        rejectUnauthorized: false,
        requestCert: false
      })
    });
    const len=uri.split('/');
    const nodeid = uri.split('/')[len.length-1];
    fetchResult = await axios.post(url,
      { 
        "query": {
        "match": {
           "_id":nodeid
        }
      }
    }
   ).then((res) => {
        respose = res//res;
      }).catch((err) => {
        console.log(err);
        if (
          err.response.data.error.type &&
          err.response.data.error.type == "index_not_found_exception"
        ) {
          const baseUri = `${window.location.origin}`;
          var uri4 = baseUri + "/cucp_config/";
          axios
            .put(uri4)
            .then((res: any) => {
              console.log(res);
            })
            .catch((err: any) => {
              console.log(err);
            });
        }
        return {
          ...result,
          status: 404,
          message: err && err.message || String(err),
          data: undefined,
        };
      });
    try {
      const data = await respose.data.hits.hits.map((hit: { _source: any; }) => hit._source)[0]['cucpdata'] as unknown as TData;
      return {
        ...result,
        status: 200,
        message: "Sucess",
        data: data,
      };
    } catch (error) {
      return {
        ...result,
        // status: fetchResult.status,
        message: error && error.message || String(error),
        data: undefined,
      };
    }
  }

  else if (uri.includes('du_config')) { //Get system performance
    let respose: any;
    const url = baseUri + '/du_config/_search'
    const instance = axios.create({
      httpsAgent: new https.Agent({
        rejectUnauthorized: false,
        requestCert: false
      })
    });
    const len=uri.split('/');
    const nodeid = uri.split('/')[len.length-1];
    fetchResult = await axios.post(url,
      { 
        "query": {
        "match": {
           "_id":nodeid
        }
      }
    }
   ).then((res) => {
        respose = res//res;
      }).catch((err) => {
        console.log(err);
        if (
          err.response.data.error.type &&
          err.response.data.error.type == "index_not_found_exception"
        ) {
          const baseUri = `${window.location.origin}`;
          var uri4 = baseUri + "du_config/";
          axios
            .put(uri4)
            .then((res: any) => {
              console.log(res);
            })
            .catch((err: any) => {
              console.log(err);
            });
        }
        return {
          ...result,
          status: 404,
          message: err && err.message || String(err),
          data: undefined,
        };
      });
    try {
      const data = await respose.data.hits.hits.map((hit: { _source: any; }) => hit._source)[0]['duConfigdata'] as unknown as TData;
      return {
        ...result,
        status: 200,
        message: "Sucess",
        data: data,
      };
    } catch (error) {
      return {
        ...result,
        // status: fetchResult.status,
        message: error && error.message || String(error),
        data: undefined,
      };
    }
  }
  else if (uri.includes('systemperformance')) { //Get system performance
    let respose: any;
    let size:number=10;
    const countUri = baseUri + '/rn_ems_perf_util/_count';
    try{
      const countResponse = await axios.get(countUri);
      size = countResponse.data.count;
    }catch(countError){
      console.error("Error fetching document count :", countError);
      return{
        ...result,status: 500, message: "Error fetching document count", data: undefined,
      };
    }
    const uri = baseUri + '/rn_ems_perf_util/_search?size='+size;
    const instance = axios.create({
      httpsAgent: new https.Agent({
        rejectUnauthorized: false,
        requestCert: false
      })
    });

    fetchResult = await axios.get(uri)
      .then((res) => {
        respose = res//res;
      }).catch((err) => {
        console.log(err);
        return {
          ...result,
          status: 404,
          message: err && err.message || String(err),
          data: undefined,
        };
      });
    try {
      const data = await respose.data.hits.hits.map((hit: { _source: any; }) => hit._source) as unknown as TData;
      return {
        ...result,
        status: 200,
        message: "Sucess",
        data: data,
      };
    } catch (error) {
      return {
        ...result,
        // status: fetchResult.status,
        message: error && error.message || String(error),
        data: undefined,
      };
    }
  }

  else if (uri.includes('systemHistory')) { //Get system performance
    let respose: any;
   
    const uri = baseUri + '/rn_ems_perf_util/_search';
    const instance = axios.create({
      httpsAgent: new https.Agent({
        rejectUnauthorized: false,
        requestCert: false
      })
    });

    fetchResult = await axios.get(uri)
      .then((res) => {
        respose = res//res;
      }).catch((err) => {
        console.log(err);
        return {
          ...result,
          status: 404,
          message: err && err.message || String(err),
          data: undefined,
        };
      });
    try {
      const data = await respose.data.hits.hits.map((hit: { _source: any; }) => hit._source) as unknown as TData;
      return {
        ...result,
        status: 200,
        message: "Sucess",
        data: data,
      };
    } catch (error) {
      return {
        ...result,
        // status: fetchResult.status,
        message: error && error.message || String(error),
        data: undefined,
      };
    }
  }
  else if (uri.includes('profiles')) { //Get Profile Data
    let respose: any;
    let size:number;
    const instance = axios.create({
      httpsAgent: new https.Agent({
        rejectUnauthorized: false,
        requestCert: false
      })
    });
    const countUri = baseUri + '/profilemanagement/_count';
    try{
      const countResponse = await axios.get(countUri);
      size = countResponse.data.count;
    }catch(countError){
      console.error("Error fetching document count :", countError);
      return{
        ...result,status: 500, message: "Error fetching document count", data: undefined,
      };
    }
    const uri = `${baseUri}/profilemanagement/_search?size=${size}`;
    fetchResult = await axios.get(uri)
      .then((res: any) => {
        respose = res;
      }).catch((err: { response: { data: { error: { type: string; }; }; }; message: any; }) => {
        console.log(err);
        if (err.response.data.error.type && err.response.data.error.type == 'index_not_found_exception') {
          var uri4 = (baseUri) + '/profilemanagement/';
          axios.put(uri4)
            .then((res: any) => {
              console.log(res);
              respose = res;
            }).catch((err: any) => {
              console.log(err);
            })
        }
        return {
          ...result,
          status: 404,
          message: err && err.message || String(err),
          data: undefined,
        };
      })

    try {
      const data = await respose.data.hits.hits.map((hit: { _source: any; }) => hit._source) as unknown as TData;
      // const data = await fetchResult.json() as TData;
      sessionStorage.setItem('profiledata', JSON.stringify(data));
      return {
        ...result,
        status: 200,
        message: "Sucess",
        data: data,
      };
    } catch (error) {
      return {
        ...result,
        // status: fetchResult.status,
        message: error && error.message || String(error),
        data: undefined,
      };
    }
  }
  //Get preprovider Data
  else if (uri.includes('providerApp')) {
    let respose: any;
    let size:number;
    const instance = axios.create({
      httpsAgent: new https.Agent({
        rejectUnauthorized: false,
        requestCert: false
      })
    });
    const countUri = baseUri + '/pre_provider/_count';
    try{
      const countResponse = await axios.get(countUri);
      size = countResponse.data.count;
    }catch(countError){
      console.error("Error fetching document count :", countError);
      return{
        ...result,status: 500, message: "Error fetching document count", data: undefined,
      };
    }
    const uri = `${baseUri}/pre_provider/_search?size=${size}`;
    fetchResult = await axios.get(uri)
      .then((res: any) => {
        respose = res;
      }).catch((err: { response: { data: { error: { type: string; }; }; }; message: any; }) => {
        console.log(err);
        if (err.response.data.error.type && err.response.data.error.type == 'index_not_found_exception') {
          var uri4 = (baseUri) + '/pre_provider/';
          axios.put(uri4)
            .then((res: any) => {
              console.log(res);
              respose = res;
            }).catch((err: any) => {
              console.log(err);
            })
        }
        return {
          ...result,
          status: 404,
          message: err && err.message || String(err),
          data: undefined,
        };
      })
    try {
      const data = await respose.data.hits.hits.map((hit: { _source: any; }) => hit._source) as unknown as TData;
      
      sessionStorage.setItem('providerdata', JSON.stringify(data));
      return {
        ...result,
        status: 200,
        message: "Sucess",
        data: data,
      };
    } catch (error) {
      return {
        ...result,
        // status: fetchResult.status,
        message: error && error.message || String(error),
        data: undefined,
      };
    }
  }

   //get auditlog event data
   else if (uri.includes('auditlog')) { 
    let respose: any;
    let size:number;
   
    const instance = axios.create({
      httpsAgent: new https.Agent({
        rejectUnauthorized: false,
        requestCert: false
      })
    });

    const countUri = baseUri + '/auditlog/_count';
    try{
      const countResponse = await axios.get(countUri);
      size = countResponse.data.count;
    }catch(countError){
      console.error("Error fetching document count :", countError);
      return{
        ...result,status: 500, message: "Error fetching document count", data: undefined,
      };
    }

    const uri = `${baseUri}/auditlog/_search?size=${size}`;
    fetchResult = await axios.get(uri)
      .then((res: any) => {
        respose = res;
      }).catch((err: { response: { data: { error: { type: string; }; }; }; message: any; }) => {
        console.log(err);
        if (err.response.data.error.type && err.response.data.error.type == 'index_not_found_exception') {
          var uri4 = (baseUri) + '/auditlog/';
          axios.put(uri4)
            .then((res: any) => {
              console.log(res);
              respose = res;
            }).catch((err: any) => {
              console.log(err);
            })
        }
        return {
          ...result,
          status: 404,
          message: err && err.message || String(err),
          data: undefined,
        };
      })

    try {
      const data = await respose.data.hits.hits.map((hit: { _source: any; }) => hit._source) as unknown as TData;
      // const data = await fetchResult.json() as TData;
      return {
        ...result,
        status: 200,
        message: "Sucess",
        data: data,
      };
    } catch (error) {
      return {
        ...result,
        // status: fetchResult.status,
        message: error && error.message || String(error),
        data: undefined,
      };
    }
  }
  else if (uri.includes('softwaremanagement')) {
    
    let respose: any;
    let size:number;
    const currentnodeId = `${window.location.hash.split("/")[2]}`;
    const baseUri = `${window.location.origin}`
    const instance = axios.create({
      httpsAgent: new https.Agent({
        rejectUnauthorized: false,
        requestCert: false
      })
    });
    const countUri = baseUri + '/sm_history/_count';
    try{
      const countResponse = await axios.get(countUri);
      size = countResponse.data.count;
    }catch(countError){
      console.error("Error fetching document count :", countError);
      return{
        ...result,status: 500, message: "Error fetching document count", data: undefined,
      };
    }
    const uri = `${baseUri}/sm_history/_search?size=${size}`;
    fetchResult = null;
    try{
      fetchResult = await axios.post(uri,{
        "query": {
            "match": {
                "_id": currentnodeId
            }
        }}
    )
    }
    catch(Error){
      console.log(Error)
    }
    try {
      const data = await fetchResult?.data?.hits?.hits[0]?._source?.history?.reverse().map((hit:any) => ({
        ...hit,
        TimeStamp: new Date(hit.TimeStamp / 1000).toLocaleString('en-GB', { timeZone: "Asia/Kolkata", hour12: false }).replace(',', '').replace(/\//g, '-'),
        sectorID: hit.sectorID === -1 ? "NA" : hit.sectorID

      })) as unknown as TData;
      sessionStorage.setItem('smhistory-data', JSON.stringify(data));
      return {
        ...result,
        status: 200,
        message: "Sucess",
        data: data,
      };
    } catch (error) {
      return {
        ...result,
        // status: fetchResult.status,
        //message: error && error.message || String(error),
        data: null,
      };
    }
  }
  else if (uri.includes('connection-list')) { 
    console.log("Entered connection list");
    let respose: any;
    let size:number;
    const instance = axios.create({
      httpsAgent: new https.Agent({
        rejectUnauthorized: false,
        requestCert: false
      })
    });
 
    fetchResult =  await axios.get( baseUri + '/proxyapi/getconnectionlistdata').then(async (res) => {
      respose = res;
      }).catch((err) => {
        console.log(err);
        return {
          ...result,
          status: 404,
          message: err && err.message || String(err),
          data: undefined,
        };
      });
    try {
          const data = await respose.data.hits.hits.map((hit: { _source: any; }) =>
        ({
          ...hit._source,
          DeviceStatus: hit._source.DeviceStatus === 'inService' ? 'Online' : hit._source.DeviceStatus === 'outOfService' ? 'Offline' : 'Unknown',
          HeartBeatStatus: hit._source.HeartBeatStatus === 'UP' ? 'Online' : hit._source.HeartBeatStatus === 'Down' ? 'Offline' : 'Unknown',
          nodeId: hit._source["node-id"],
          softwareVersion:hit._source["software-version"],
          serialNumber:hit._source["serial-number"],
          vendorDetails:hit._source["vendor-details"],
          modelNumber:hit._source["model-number"],
          status:hit._source["status"],
          host:hit._source["host"],
          deviceType:hit._source["device-type"]
        })) as unknown as TData;
      return {
        ...result,
        status: 200,
        message: "Sucess",
        data: data,
      };
    } catch (error) {
      return {
        ...result,
        message: error && error.message || String(error),
        data: undefined,
      };
    }
  }
  else if (uri.includes('connectionlog-list')) { 
    console.log("Entered connectionlog-list-v7");
    let respose: any;
    let size:number;
    const instance = axios.create({
      httpsAgent: new https.Agent({
        rejectUnauthorized: false,
        requestCert: false
      })
    });
 
    fetchResult =  await axios.get(baseUri + '/proxyapi/getconnectionloglistdata').then(async (res) => {
      respose = res;
      }).catch((err) => {
        console.log(err);
        return {
          ...result,
          status: 404,
          message: err && err.message || String(err),
          data: undefined,
        };
      });
    try {
      const emsTimeZone = (window as any).configs.REACT_APP_EMS_TIME_ZONE;
      console.log(emsTimeZone);

      const data = await respose.data.hits.hits.map((hit: { _source: any; }) => ({
        ...hit._source,
        timestamp: new Date(hit._source.timestamp / 1000).toLocaleString('en-GB', { timeZone: emsTimeZone, hour12: false }).replace(',', '').replace(/\//g, '-')
      })) as unknown as TData;
      return {
        ...result,
        status: 200,
        message: "Sucess",
        data: data,
      };
    } catch (error) {
      return {
        ...result,
        message: error && error.message || String(error),
        data: undefined,
      };
    }
  }
  else if (uri.includes('faultcurrent-list')) {
    let respose: any;
    let size:number;
    const instance = axios.create({
      httpsAgent: new https.Agent({
        rejectUnauthorized: false,
        requestCert: false
      })
    });
    const countUri = baseUri + '/faultcurrent-v7/_count';
    try{
      const countResponse = await axios.get(countUri);
      size = countResponse.data.count;
    }catch(countError){
      console.error("Error fetching document count :", countError);
      return{
        ...result,status: 500, message: "Error fetching document count", data: undefined,
      };
    }
    
    const query = {
      "size": 10000,
      "sort": [
        {
          "event.common-event-header.last-epoch-microsec": {
            "order": "desc"
          }
        }
      ],
      "query": {
        "bool": {
          "should": [
            { "exists": { "field": "event.common-event-header.last-epoch-microsec" } }
          ]
        }
      }
    }
    const url = `${baseUri}/faultcurrent-v7/_search?size=${size}`;
    fetchResult = await axios.post(url,query)
      .then((res: any) => {
        respose = res;
      }).catch((err: { response: { data: { error: { type: string; }; }; }; message: any; }) => {
        console.log(err);
        if (err.response.data.error.type && err.response.data.error.type == 'index_not_found_exception') {
          var uri4 = (baseUri) + '/faultcurrent-v7/';
          axios.put(uri4)
            .then((res: any) => {
              console.log(res);
              respose = res;
            }).catch((err: any) => {
              console.log(err);
            })
        }
        return {
          ...result,
          status: 404,
          message: err && err.message || String(err),
          data: undefined,
        };
      })

    try {
      const emsTimeZone = (window as any).configs.REACT_APP_EMS_TIME_ZONE;
      console.log(emsTimeZone);
      const data = await respose.data.hits.hits.map((hit: { _source: any }) => {
        const faultFields = hit._source.event["fault-fields"];
        const { "alarm-additional-information": alarmAdditionalInfo, ...rest } = faultFields;
      
        return {
          ...hit._source.event["common-event-header"],
          lastEpochMicrosec: new Date(
            hit._source.event["common-event-header"]["last-epoch-microsec"] / 1000
          )
            .toLocaleString("en-GB", { timeZone: emsTimeZone, hour12: false })
            .replace(",", "")
            .replace(/\//g, "-"),
          ...rest,
          ...alarmAdditionalInfo,
          isAlarmAcked: alarmAdditionalInfo["is-alarm-acked"] ? alarmAdditionalInfo["is-alarm-acked"].toString() : "",
        };
      }) as unknown as TData;
      
      // const data = await fetchResult.json() as TData;
      //sessionStorage.setItem('faultcurrent-list', JSON.stringify(data));
      return {
        ...result,
        status: 200,
        message: "Sucess",
        data: data,
      };
    } catch (error) {
      return {
        ...result,
        // status: fetchResult.status,
        message: error && error.message || String(error),
        data: undefined,
      };
    }
  }
  else if (uri.includes('faultlog-list')) {
    let respose: any;
    let size:number;
    const instance = axios.create({
      httpsAgent: new https.Agent({
        rejectUnauthorized: false,
        requestCert: false
      })
    });
    const countUri = baseUri + '/faultlog-v7/_count';
    try{
      const countResponse = await axios.get(countUri);
      size = countResponse.data.count;
    }catch(countError){
      console.error("Error fetching document count :", countError);
      return{
        ...result,status: 500, message: "Error fetching document count", data: undefined,
      };
    }
    const uri = `${baseUri}/faultlog-v7/_search`;
    const query = {
      "size": 10000,
      "sort": [
        {
          "event.common-event-header.last-epoch-microsec": {
            "order": "desc"
          }
        }
      ],
      "query": {
        "bool": {
          "should": [
            { "exists": { "field": "event.common-event-header.last-epoch-microsec" } }
          ]
        }
      }
    }
    
    fetchResult = await axios.post(uri,query)
      .then((res: any) => {
        respose = res;
      }).catch((err: { response: { data: { error: { type: string; }; }; }; message: any; }) => {
        console.log(err);
        if (err.response.data.error.type && err.response.data.error.type == 'index_not_found_exception') {
          var uri4 = (baseUri) + '/faultlog-v7/';
          axios.put(uri4)
            .then((res: any) => {
              console.log(res);
              respose = res;
            }).catch((err: any) => {
              console.log(err);
            })
        }
        return {
          ...result,
          status: 404,
          message: err && err.message || String(err),
          data: undefined,
        };
      })

    try {
      const emsTimeZone = (window as any).configs.REACT_APP_EMS_TIME_ZONE;
      console.log(emsTimeZone);

        const data = await respose.data.hits.hits.map((hit: any) => {
        const faultFields = hit._source.event["fault-fields"];
        const { "alarm-additional-information": alarmAdditionalInfo, ...rest } = faultFields;
      
        return {
          ...hit._source.event["common-event-header"],
          lastEpochMicrosec: new Date(
            hit._source.event["common-event-header"]["last-epoch-microsec"] / 1000
          )
            .toLocaleString("en-GB", { timeZone: emsTimeZone, hour12: false })
            .replace(",", "")
            .replace(/\//g, "-"),
          ...rest,
          ...alarmAdditionalInfo,
          uniqueId:hit._id
        };
      }) as unknown as TData;
      // const data = await fetchResult.json() as TData;
      //sessionStorage.setItem('faultlog-list', JSON.stringify(data));
      return {
        ...result,
        status: 200,
        message: "Sucess",
        data: data,
      };
    } catch (error) {
      return {
        ...result,
        // status: fetchResult.status,
        message: error && error.message || String(error),
        data: undefined,
      };
    }
  }
  else {
    
    fetchResult = await fetch(uri, init);
    if (fetchResult?.status >= 200 && fetchResult?.status < 300) {
      if (uri.includes('ietf-netconf:commit')) {
        init.body = '{"ietf-netconf:input":{"target":{"running":"running"},"source":{"startup":"startup"}}}';
        var commituri = "/rests/operations/network-topology:network-topology/topology=topology-netconf/node=" + fetchResult.url.split('=')[2].split('/')[0] + "/yang-ext:mount/ietf-netconf:edit-config"
        fetchResult = await fetch(commituri, init);
      }
    }
    if (fetchResult.status === 309) {
      const redirectUrl = fetchResult.headers.get('Location');
      if (!redirectUrl) {
        throw new Error('Status code 309 requires header "Location"');
      }
      localStorage.removeItem('userToken');
      window.location.href = redirectUrl;
      return {
        ...result,
        status: fetchResult.status,
        message: 'Redirecting to new URL.',
      };
    } else if (fetchResult.status === 403) {
      if (storeService.applicationStore) {
        storeService.applicationStore.dispatch(new AddErrorInfoAction({ title: 'Forbidden', message: 'Status: [403], access denied.' }));
      }
      return {
        ...result,
        status: 403,
        message: 'Forbidden.',
      };
    } else if (fetchResult.status === 401) {
      if (storeService.applicationStore) {
        storeService.applicationStore.dispatch(new ReplaceAction(`/login?returnTo=${storeService.applicationStore.state.framework.navigationState.pathname}`));
      }
      return {
        ...result,
        status: 401,
        message: 'Authentication requested by server.',
        data: undefined,

      };
    }
    else if (fetchResult.status === 500) {
      console.info('response with 500 .... for url.. ' + uri);
      // if(uri.includes("connection-list"))
      // {
      //   window.location.reload();
      //   //fetchResult = await fetch(uri, init);
      // }
     
    }
  }
  const contentType = fetchResult.headers.get('Content-Type') || fetchResult.headers.get('content-type');
  const isJson = contentType && (contentType.toLowerCase().startsWith('application/json') || contentType.toLowerCase().startsWith('application/yang-data+json'));
  try {
    const data = (isJson ? await fetchResult.json() : await fetchResult.text()) as TData;
    return {
      ...result,
      status: fetchResult.status,
      message: fetchResult.statusText,
      data: data,
    };
  } catch (error) {
   
      return {
        ...result,
        status: fetchResult.status,
        message: error && error.message || String(error),
        data: undefined,
      };
    }
  
}



/** Sends a rest request to the given path. 
 * @returns The data, or null it there was any error
 */
export async function requestRest<TData>(path: string = '', init: RequestInit = {}, authenticate: boolean = true, isResource: boolean = false): Promise<TData | null | undefined> {
  const res = await requestRestExt<TData>(path, init, authenticate, isResource);
  if (res && res.status >= 200 && res.status < 300) {
    return res.data;
  } else if (res && res.status === 401) {
    return res.data;
  } else {
    return null;
  }
}


