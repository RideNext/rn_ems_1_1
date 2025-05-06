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
import { Action } from '../../../../framework/src/flux/action';
import { Dispatch } from '../../../../framework/src/flux/store';
import { AddSnackbarNotification } from '../../../../framework/src/actions/snackbarActions';

import { profilesdata } from '../models/profileServer';
import { avaliableprofileServersReloadAction } from '../handlers/avaliableProfileServersHandler';
import profileService from '../services/profileService';
import axios from 'axios';

/** Represents the base action. */
export class BaseAction extends Action { }

/** Represents an async thunk action that will add a server to the avaliable profile servers. */
export const addAvaliableprofileServerAsyncActionCreator = (server: profilesdata) => (dispatch: Dispatch) => {
    profileService.insertprofileServer(server).then(_ => {
      window.setTimeout(() => {
        dispatch(avaliableprofileServersReloadAction);
        dispatch(new AddSnackbarNotification({ message: `Successfully added >>> 2 [${ server.ProfileName }]`, options: { variant: 'success' } }));
      }, 900);
    });
  };

  /** Represents an async thunk action that will add a server to the avaliable profile servers. */
export const updateAvaliableprofileServerAsyncActionCreator = (server: profilesdata) => (dispatch: Dispatch) => {
  profileService.updateprofileServer(server).then(_ => {
    window.setTimeout(() => {
      dispatch(avaliableprofileServersReloadAction);
      dispatch(new AddSnackbarNotification({ message: `Successfully updated [${ server.ProfileName }]`, options: { variant: 'success' } }));
    }, 900);
  });
};
  
  /** Represents an async thunk action that will delete a server from the avaliable profile servers. */
  export const removeAvaliableprofileServerAsyncActionCreator = (server: profilesdata) => (dispatch: Dispatch) => {
    profileService.deleteprofileServer(server).then(_ => {
      window.setTimeout(() => {
        const now = Date.now(); 
        const microseconds = Math.floor(performance.now() * 1000); 
        const currentTimeInMicrosec = now * 1000 + microseconds % 1000; 
        const baseUri = `${window.location.origin}`;
     axios.post(baseUri+"/proxyapi/SendMessageToNMS",
       {
         "message": {
            "sdnrNotification":{ 
              "nfProfileName": server.ProfileName ,
              "nfProfileId": server.id ,
              "status":"deleted",
              "type":"nf-profile-status",
              "eventTimeEpochMicrosec":currentTimeInMicrosec,
              "message":"NF Profile is successfully deleted."
             }
         },
         "topic": "5G_EMS_DEVICE_NOTIFICATION"
     }).then((res: any) => {
       console.log(res.data)
     });



        dispatch(avaliableprofileServersReloadAction);
        dispatch(new AddSnackbarNotification({ message: `Successfully removed [${ server.ProfileName }]`, options: { variant: 'success' } }));
      }, 900);
    });
  };

  export const downloadFileAvaliableprofileServerAsyncActionCreator = (server:profilesdata) => (dispatch: Dispatch) => {
    profileService.downloadprofileServer(server).then(_ => {
      window.setTimeout(() => {
        dispatch(avaliableprofileServersReloadAction);
        dispatch(new AddSnackbarNotification({ message: `Successfully downloaded [${ server.ProfileName }]`, options: { variant: 'success' } }));
      }, 900);
    });
  };
  