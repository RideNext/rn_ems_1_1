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

import { userServer } from '../models/userServer';
import { avaliableuserServersReloadAction } from '../handlers/avaliableuserServersHandler';
import userService from '../services/userService';
import { Server } from 'http';

/** Represents the base action. */
export class BaseAction extends Action { }

/** Represents an async thunk action that will add a server to the avaliable user servers. */
export const addAvaliableuserServerAsyncActionCreator = (server: userServer) => (dispatch: Dispatch) => {
    userService.insertuserServer(server).then(_ => {
      window.setTimeout(() => {
        dispatch(avaliableuserServersReloadAction);
        dispatch(new AddSnackbarNotification({ message: `Successfully added >>> 2 [${ server.id }]`, options: { variant: 'success' } }));
      }, 900);
    });
  };

  /** Represents an async thunk action that will add a server to the avaliable user servers. */
export const updateAvaliableuserServerAsyncActionCreator = (server: userServer) => (dispatch: Dispatch) => {
  userService.updateuserServer(server).then(_ => {
    window.setTimeout(() => {
      dispatch(avaliableuserServersReloadAction);
      dispatch(new AddSnackbarNotification({ message: `Successfully updated [${ server.id }]`, options: { variant: 'success' } }));
    }, 900);
  });
};

export const resetpasswordAvaliableuserServerAsyncActionCreator = (server:userServer) => (dispatch: Dispatch) => {
  userService.resetPasswordServer(server).then(_ => {
    window.setTimeout(() => {
      dispatch(avaliableuserServersReloadAction);
      dispatch(new AddSnackbarNotification({ message: `Successfully ResetPassword [${ server.id }]`, options: { variant: 'success' } }));
    }, 900);
  });
};
  
  /** Represents an async thunk action that will delete a server from the avaliable user servers. */
  export const removeAvaliableuserServerAsyncActionCreator = (server: userServer) => (dispatch: Dispatch) => {
    userService.deleteuserServer(server).then(_ => {
      window.setTimeout(() => {
        dispatch(avaliableuserServersReloadAction);
        dispatch(new AddSnackbarNotification({ message: `Successfully removed [${ server.id }]`, options: { variant: 'success' } }));
      }, 900);
    });
  };
  