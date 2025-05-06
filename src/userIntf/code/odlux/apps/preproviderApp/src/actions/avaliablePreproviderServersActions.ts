
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

import { providerdata } from '../models/preproviderServer';
import { avaliablepreproviderServersReloadAction } from '../handlers/avaliablepreproviderServersReloadAction';
import preproviderService from '../services/preproviderService';
import axios from 'axios';

/** Represents the base action. */
export class BaseAction extends Action { }


/** Represents an async thunk action that will add a server to the avaliable preprovider servers. */
export const addAvaliablepreproviderServerAsyncActionCreator = (server: providerdata) => (dispatch: Dispatch) => {
  preproviderService.insertpreproviderServer(server).then(_ => {
      window.setTimeout(() => {
        dispatch(avaliablepreproviderServersReloadAction);
        dispatch(new AddSnackbarNotification({ message: `Successfully added >>> 2 [${ server.PNFID }]`, options: { variant: 'success' } }));
      }, 900);
    });
  };

  /** Represents an async thunk action that will add a server to the avaliable preprovider servers. */
export const updateAvaliablepreproviderServerAsyncActionCreator = (server: providerdata) => (dispatch: Dispatch) => {
  preproviderService.updatepreproviderServer(server).then(_ => {
    window.setTimeout(() => {
      dispatch(avaliablepreproviderServersReloadAction);
      dispatch(new AddSnackbarNotification({ message: `Successfully updated [${ server.PNFID }]`, options: { variant: 'success' } }));
    }, 900);
  });
};
  
  /** Represents an async thunk action that will delete a server from the avaliable preprovider servers. */
  export const removeAvaliablepreproviderServerAsyncActionCreator = (server: providerdata) => (dispatch: Dispatch) => {
    preproviderService.deletepreproviderServer(server).then(_ => {
      window.setTimeout(() => {
        const now = Date.now(); 
           const microseconds = Math.floor(performance.now() * 1000); 
           const currentTimeInMicrosec = now * 1000 + microseconds % 1000; 
           const baseUri = `${window.location.origin}`;
        axios.post(baseUri+"/proxyapi/SendMessageToNMS",
          {
            "message": {
               "sdnrNotification":{ 
                "nodeId": server.PNFID ,
                "nfProfileName": server.PREPROVIDER_CONF ,		
                "status":"deleted",
                "type":"nf-provisioning-status",
                "eventTimeEpochMicrosec":currentTimeInMicrosec,
                "message":"NF Provisioning is successfully deleted."
                }
            },
            "topic": "5G_EMS_DEVICE_NOTIFICATION"
        }).then((res: any) => {
          console.log(res.data)
        });

        dispatch(avaliablepreproviderServersReloadAction);
        dispatch(new AddSnackbarNotification({ message: `Successfully removed [${ server.PNFID }]`, options: { variant: 'success' } }));
      }, 900);
    });
  };
  
  export const importpreproviderServerAsyncActionCreator = (server: providerdata) => (dispatch: Dispatch) => {
    preproviderService.importpreproviderServer(server).then(_ => {
        window.setTimeout(() => {
          dispatch(avaliablepreproviderServersReloadAction);
          dispatch(new AddSnackbarNotification({ message: `Successfully imported csv`, options: { variant: 'success' } }));
        }, 900);
      });
    };
