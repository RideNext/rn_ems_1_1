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
import { Action } from '../../../../framework/src/flux/action';
import { Dispatch } from '../../../../framework/src/flux/store';
import { AddSnackbarNotification } from '../../../../framework/src/actions/snackbarActions';

import { systemdata } from '../models/systemServer';
import { avaliablesystemServersReloadAction } from '../handlers/avaliableSystemServersHandler';
import systemService from '../services/systemService';

/** Represents the base action. */
export class BaseAction extends Action { }

/** Represents an async thunk action that will add a server to the avaliable profile servers. */
export const addAvaliableprofileServerAsyncActionCreator = (server: systemdata) => (dispatch: Dispatch) => {
    systemService.insertprofileServer(server).then(_ => {
      window.setTimeout(() => {
        dispatch(avaliablesystemServersReloadAction);
        dispatch(new AddSnackbarNotification({ message: `Successfully added >>> 2 [${ server.container_name }]`, options: { variant: 'success' } }));
      }, 900);
    });
  };

  /** Represents an async thunk action that will add a server to the avaliable profile servers. */
export const updateAvaliableprofileServerAsyncActionCreator = (server: systemdata) => (dispatch: Dispatch) => {
  systemService.updateprofileServer(server).then(_ => {
    window.setTimeout(() => {
      dispatch(avaliablesystemServersReloadAction);
      dispatch(new AddSnackbarNotification({ message: `Successfully updated [${ server.container_name }]`, options: { variant: 'success' } }));
    }, 900);
  });
};
  
  /** Represents an async thunk action that will delete a server from the avaliable profile servers. */
  // export const removeAvaliableprofileServerAsyncActionCreator = (server: systemdata) => (dispatch: Dispatch) => {
  //   profileService.deleteprofileServer(server).then(_ => {
  //     window.setTimeout(() => {
  //       dispatch(avaliableprofileServersReloadAction);
  //       dispatch(new AddSnackbarNotification({ message: `Successfully removed [${ server.container_name }]`, options: { variant: 'success' } }));
  //     }, 900);
  //   });
  // };

  export const downloadFileAvaliableprofileServerAsyncActionCreator = (server:systemdata) => (dispatch: Dispatch) => {
    systemService.downloadprofileServer(server).then(_ => {
      window.setTimeout(() => {
        dispatch(avaliablesystemServersReloadAction);
        dispatch(new AddSnackbarNotification({ message: `Successfully downloaded [${ server.container_name }]`, options: { variant: 'success' } }));
      }, 900);
    });
  };
  