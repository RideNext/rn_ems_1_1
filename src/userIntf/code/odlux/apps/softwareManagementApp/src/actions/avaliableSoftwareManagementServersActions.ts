
 /***
  * ################################################################################################
  * #                                                                                              #
  * #   Copyright (C)  [2019]  [RideNext Software Solutions Pvt Ltd]. All rights  reserved         #
  * #                                                                                              #
  * ################################################################################################
 ****/

import { Action } from '../../../../framework/src/flux/action';
import { Dispatch } from '../../../../framework/src/flux/store';
import { AddSnackbarNotification } from '../../../../framework/src/actions/snackbarActions';

import { softwareManagementData } from '../models/SoftwareManagementServer';
import { avaliablesoftwaremanagementServersReloadAction } from '../handlers/avaliableSoftwareManagementServersReloadAction';
import SoftwaremanagementService from '../services/SoftwareManagementService';

/** Represents the base action. */
export class BaseAction extends Action { }

/** Represents an async thunk action that will add a server to the avaliable preprovider servers. */
export const addAvaliablesoftwaremanagementServerAsyncActionCreator = (server: softwareManagementData) => (dispatch: Dispatch) => {
  SoftwaremanagementService.insertsoftwaremanagementServer(server).then(_ => {
      window.setTimeout(() => {
        dispatch(avaliablesoftwaremanagementServersReloadAction);
        dispatch(new AddSnackbarNotification({ message: `Successfully added >>> 2 [${ server.Slot }]`, options: { variant: 'success' } }));
      }, 900);
    });
  };

  /** Represents an async thunk action that will add a server to the avaliable preprovider servers. */
export const updateAvaliablesoftwaremanagementServerAsyncActionCreator = (server: softwareManagementData) => (dispatch: Dispatch) => {
  SoftwaremanagementService.updatesoftwaremanagementServer(server).then(_ => {
    window.setTimeout(() => {
      dispatch(avaliablesoftwaremanagementServersReloadAction);
      dispatch(new AddSnackbarNotification({ message: `Successfully updated [${ server.Slot }]`, options: { variant: 'success' } }));
    }, 900);
  });
};
  
  /** Represents an async thunk action that will delete a server from the avaliable preprovider servers. */
  export const removeAvaliablesoftwaremanagementServerAsyncActionCreator = (server: softwareManagementData) => (dispatch: Dispatch) => {
    SoftwaremanagementService.deletesoftwaremanagementServer(server).then(_ => {
      window.setTimeout(() => {
        dispatch(avaliablesoftwaremanagementServersReloadAction);
        dispatch(new AddSnackbarNotification({ message: `Successfully removed [${ server.Slot }]`, options: { variant: 'success' } }));
      }, 900);
    });
  };
  

