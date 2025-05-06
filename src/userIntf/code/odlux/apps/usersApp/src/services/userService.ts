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

import { requestRest, formEncode } from '../../../../framework/src/services/restService';
import { userServer, userServerVersionInfo, userConfig, userServerDevice, userConfigResponse } from '../models/userServer';
import { PostResponse, DeleteResponse, Result } from '../../../../framework/src/models';
import axios from 'axios';

//export const userServerResourcePath = "usersApp-server";
export const userServerResourcePath = "usersAppTest-server";

type userServerResponse<TData> = { code: number, data: TData };
type IndexableuserServer = userServer & { [key: string]: any; };

  
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
        }).then((res: any) => {
          //console.log(res);
          respose=res;
      }).catch((err: any) => {
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
    //alert('updateuserServer');
    const baseUri = `${ window.location.origin }`;
    let result = null;
    const updatedata = { 
    "firstName" : server.firstName,
    "lastName"   :server.lastName,
    "email"  : server.email,
    "username": server.username,
    //"password": server.password,
   // "confirmPassword": server.confirmPassword
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
  
    const uri4 =  (baseUri) + '/realms/master/protocol/openid-connect/token';
    const uri1 =  (baseUri) +  '/admin/realms/onap/users/'+server.id;
    let respose :any;
    await axios.post(uri4, data2, {
        headers: tokenHeaders,
        }).then((res: any) => {
          //console.log(res);
          respose=res;
      }).catch((err: any) => {
          console.log(err);
      })

    await fetch(uri1, {
      method:"put",
      headers: {
            'content-type': 'application/json',
            'accept': 'application/json',
            'Authorization': 'bearer ' + respose.data.access_token
        },
        body: JSON.stringify(updatedata)
      }).then((res) => {
        //console.log(res);
        result=res;
    }).catch((err) => {
        console.log(err);
    })

    //const result = await requestRest<PostResponse>(path, { method: "POST", body: JSON.stringify({ input: data }) });
    return result || null;
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
        }).then((res: any) => {
          //console.log(res);
          respose=res;
      }).catch((err: any) => {
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
