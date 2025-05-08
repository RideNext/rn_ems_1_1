/**
 * ============LICENSE_START========================================================================
 * onap : ccsdk feature sdnr wt odlux
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
import { userServer, userServerVersionInfo, userConfig, userServerDevice, userConfigResponse } from '../models/userServer';
import { PostResponse, DeleteResponse, Result } from '../../../../framework/src/models';
import axios from 'axios';
import { access } from 'fs';
import { group } from 'console';
import { post } from 'jquery/dist/jquery.slim';

//export const userServerResourcePath = "usersApp-server";
export const userServerResourcePath = "usersAppTest-server";

type userServerResponse<TData> = { code: number, data: TData };
type IndexableuserServer = userServer & { [key: string]: any; };
/* 
type UserData = userServer & {
  mappedRoles: string[];
  userIds: string[];
}; */
interface UpdateuserResponse {
  success: boolean;
  message: string;
}
  
/**/

// Now you can defin

/** 
 * Represents a web api accessor service for all user server actions.
 */
class UserService {
  /**
    * Inserts data into the user servers table.
    */
   
  public async insertuserServer(server: IndexableuserServer): Promise<PostResponse | null> {
    //alert('insertuserServer');
    const baseUri = `${ window.location.origin }`;
   
    let result = null;

    const insertdata = { 
    "firstName" : server.firstName,
    "lastName"   :server.lastName,
    "email"  : server.email,
    "username": server.username,
    //"password" : server.password,
    //"confirmPassword" : server.confirmPassword,
    "enabled": "true",
      "credentials": [
        {
          "type": "password",
          "value": server.password,
          "temporary": false
        }
      ]
    }
        
    const data2 = {
      client_id:'admin-cli',
      grant_type: 'password',
      username: "admin",
      password: 'Kp8bJ4SXszM0WXlhak3eHlcse2gAw84vaoGGmJvUy2U' 
    }

    const tokenHeaders = {
      'Authorization': 'Basic ' + btoa("admin"+ ':' + "admin"),
      'content-type': 'application/x-www-form-urlencoded',
      'accept': 'application/json'
  };
   
    const uri4 =  (baseUri) +  '/realms/master/protocol/openid-connect/token';
    const uri1 =  (baseUri) + '/admin/realms/onap/users';
    let respose :any;
    await axios.post(uri4, data2, {
        headers: tokenHeaders,
        }).then((res) => {
          //console.log(res);
          respose=res;
      }).catch((err) => {
          console.log(err);
      })

    await fetch(uri1, {
      method:"post",
      headers: {
            'content-type': 'application/json',
            'accept': 'application/json',
            'Authorization': 'bearer ' + respose.data.access_token
        },
        body: JSON.stringify(insertdata)
      }).then((res) => {
        //console.log(res);
        result=res;
    }).catch((err) => {
        console.log(err);
    })
  
    //const result = await requestRest<PostResponse>(path, { method: "GET", body: JSON.stringify({ input: insertdata }) });
    return result || null;
  }

  
   
  /**
    * Updates data into the user servers table.
    */
   
  

  public async updateuserServer(server: IndexableuserServer): Promise<PostResponse | null> {
    const baseUri = window.location.origin;
    let result: PostResponse | null = null;
    const updateData = { 
        "firstName": server.firstName,
        "lastName": server.lastName,
        "email": server.email,
        "username": server.username,
       // "mappedRoles": server.mappedRoles,
       // "availableRoles": server.availableRoles
    };
   const updateroleData = {
      "mappedRoles": server.mappedRoles,
      "availableRoles ": server.availableRoles,
      "maproleid"  : server.maproleid,
      "avlroleid" : server.avlroleid,
      "editype": server.edittype
    } 

    try {
        // Step 1: Get access token
        const tokenResponse = await axios.post(`${baseUri}/realms/master/protocol/openid-connect/token`, {
            client_id: 'admin-cli',
            grant_type: 'password',
            username: 'admin',
            password: 'Kp8bJ4SXszM0WXlhak3eHlcse2gAw84vaoGGmJvUy2U'
        }, {
            headers: {
                'Authorization': 'Basic ' + btoa("admin" + ':' + "admin"),
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'
            }
        });
        
        const accessToken = tokenResponse.data.access_token;

        // Step 2: Update user details
        const updateUserResponse = await fetch(`${baseUri}/admin/realms/onap/users/${server.id}`, {
            method: "PUT",
            headers: {
                'Authorization': 'Bearer ' + accessToken,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(updateData)
        });

         // Step 3: Prepare role mappings payload
          
           console.log("updateroleData",updateroleData)

if(updateroleData.editype=="mapped"){

        updateroleData['availableRoles '].map(async (data:any)=>{
          
           // Step 3: Update role mappings
        const updateRoleMappingsResponse = await fetch(`${baseUri}/admin/realms/onap/users/${server.id}/role-mappings/realm`, {
          method: "POST",
          headers: {
              'Authorization': 'Bearer ' + accessToken,
              'Content-Type': 'application/json',
              'Accept': 'application/json'
          },
          body: JSON.stringify([{"id":data.id,"name":data.name,"description":"xyz","composite":false,"clientRole":false,"containerId":"onap"}])
      });

        

        // Check if all requests were successful
        if (updateUserResponse.ok && updateRoleMappingsResponse.ok) {
            result = {
                _index: '', // Add appropriate values here
                _type: '', // Add appropriate values here
                _id: '', // Add appropriate values here
                _shards: { total: 0, successful: 0, failed: 0 }, // Add appropriate values here
                created: true,
                message: 'Success'
            };
        } else {
            console.error("Failed to update user or role mappings");
            result = {
                _index: '', // Add appropriate values here
                _type: '', // Add appropriate values here
                _id: '', // Add appropriate values here
                _shards: { total: 0, successful: 0, failed: 0 }, // Add appropriate values here
                created: false,
                message: 'Failed to update user or role mappings'
            };
        }
      })}
      else if(updateroleData.editype=="available"){

        updateroleData['mappedRoles'].map(async (data:any)=>{
          
          // Step 3: Update role mappings
       const updateRoleMappingsResponse = await fetch(`${baseUri}/admin/realms/onap/users/${server.id}/role-mappings/realm`, {
         method: "DELETE",
         headers: {
             'Authorization': 'Bearer ' + accessToken,
             'Content-Type': 'application/json',
             'Accept': 'application/json'
         },
         body: JSON.stringify([{"id":data.id,"name":data.name,"description":"xyz","composite":false,"clientRole":false,"containerId":"onap"}])
     });

       

       // Check if all requests were successful
       if (updateUserResponse.ok && updateRoleMappingsResponse.ok) {
           result = {
               _index: '', // Add appropriate values here
               _type: '', // Add appropriate values here
               _id: '', // Add appropriate values here
               _shards: { total: 0, successful: 0, failed: 0 }, // Add appropriate values here
               created: true,
               message: 'Success'
           };
       } else {
           console.error("Failed to update user or role mappings");
           result = {
               _index: '', // Add appropriate values here
               _type: '', // Add appropriate values here
               _id: '', // Add appropriate values here
               _shards: { total: 0, successful: 0, failed: 0 }, // Add appropriate values here
               created: false,
               message: 'Failed to update user or role mappings'
           };
       }
     })}
        
      
    } catch (error) {
        console.error("Error occurred:", error);
    }

    return result;
         
}


  /**
    * Reset  data into the user servers table.
    */
  public async resetPasswordServer(server: IndexableuserServer): Promise<PostResponse | null> {
    const baseUri = `${window.location.origin}`;
    let result = null;

    const updatedata = {
        "password": server.password,
    };

    const authData = {
        client_id: 'admin-cli',
        grant_type: 'password',
        username: 'admin',
        password: 'Kp8bJ4SXszM0WXlhak3eHlcse2gAw84vaoGGmJvUy2U'
    };

    const tokenHeaders = {
        'Authorization': 'Basic ' + btoa('admin' + ':' + 'admin'),
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
    };

    const tokenUri = `${baseUri}/realms/master/protocol/openid-connect/token`;
    const userUri = `${baseUri}/admin/realms/onap/users/${server.id}`;

    try {
        const tokenResponse = await axios.post(tokenUri, authData, { headers: tokenHeaders });
        const accessToken = tokenResponse.data.access_token;

        const userHeaders = {
            'Authorization': 'Bearer ' + accessToken,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        };

        const passwordResetData = {
            type: 'password',
            value: server.password,
            temporary: false
        };

        const passwordResetUri = `${baseUri}/admin/realms/onap/users/${server.id}/reset-password`;

        const updateUserResponse = await fetch(passwordResetUri, {
            method: 'PUT',
            headers: userHeaders,
            body: JSON.stringify(passwordResetData)
        });

        if (updateUserResponse.status === 204) {
            console.log('Password reset successful');
            return null; // No content, returning null
        } else {
            console.error('Error updating user:', updateUserResponse.statusText);
            const responseBody = await updateUserResponse.text(); // Retrieve response body as text
            console.log('Response body:', responseBody); // Log response body for debugging
            return null; // Handling error case, returning null
        }
    } catch (error) {
        console.error('Error resetting password and updating user data:', error);
        return null; // Handling error case, returning null
    }
}


 
   
  /**
    * Deletes data from the user servers table.
    */
  public async deleteuserServer(server: userServer): Promise<DeleteResponse | null> {
   // alert('deleteuserServer');
    
    const baseUri = `${ window.location.origin }`;
    let result = null;
    const data2 = {
      client_id:'admin-cli',
      grant_type: 'password',
      username: "admin",
      password: 'Kp8bJ4SXszM0WXlhak3eHlcse2gAw84vaoGGmJvUy2U' 
    }

    const tokenHeaders = {
      'Authorization': 'Basic ' + btoa("admin"+ ':' + "admin"),
      'content-type': 'application/x-www-form-urlencoded',
      'accept': 'application/json'
    };
  
    const uri1 =  (baseUri) + '/realms/master/protocol/openid-connect/token';
    const uri2 =  (baseUri) + '/admin/realms/onap/users/'+ server.id;
    let respose :any;
    await axios.post(uri1, data2, {
        headers: tokenHeaders,
        }).then((res) => {
          //console.log(res);
          respose=res;
      }).catch((err) => {
          console.log(err);
      })

    await fetch(uri2, {
      method:"delete",
      headers: {
            'content-type': 'application/json',
            'accept': 'application/json',
            'Authorization': 'bearer ' + respose.data.access_token
        }
      }).then((res) => {
        //console.log(res);
        result=res;
    }).catch((err) => {
        console.log(err);
    })

    //const result = await requestRest<DeleteResponse>(path, { method: "POST", body: JSON.stringify({ input: data }) });
    return result || null;
  }

  public async getuserServerById(serverId: string): Promise<userServer | null> {
    alert('getuserServerById');
    const path = `/restconf/operations/data-provider:read-user-server-list`;

    const data = { "filter": [{ "property": "id", "filtervalue": serverId }] }


    const result = await requestRest<Result<userServer>>(path, { method: "POST", body: JSON.stringify({ input: data }) });

    if (result && result["data-provider:output"].data[0]) {
      const firstResult = result["data-provider:output"].data[0];

      return {
        id: firstResult.id,
        firstName: firstResult.firstName,
        lastName: firstResult.lastName,
        email: firstResult.email,
        username: firstResult.username,
        password: firstResult.password,
        confirmPassword: firstResult.confirmPassword,
        mappedRoles: firstResult.mappedRoles,
        mappedGroups: firstResult.mappedGroups,
        availableRoles: firstResult.availableRoles,
        maproleid: firstResult.maproleid,
        avlroleid: firstResult.avlroleid,
        edittype:firstResult.edittype
        //userId: firstResult.userId,
       // newPassword: firstResult.newPassword
      }
    }
    else {
      return null;
    }
  }

  private async accassuserServer<TData = {}>(userServerId: string, task: string, data?: {}): Promise<userServerResponse<TData> | null> {
    alert('accassuserServer');
    const path = `ms/${userServerId}/api/'?task=${task}`;
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

export const userService = new UserService;
export default userService;