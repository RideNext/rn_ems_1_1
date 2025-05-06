
 /***
  * ################################################################################################
  * #                                                                                              #
  * #   Copyright (C)  [2019]  [RideNext Software Solutions Pvt Ltd]. All rights  reserved         #
  * #                                                                                              #
  * ################################################################################################
 ****/

import { Action } from '../../../../framework/src/flux/action';
import { Dispatch } from '../../../../framework/src/flux/store';
import preproviderService from '../services/preproviderService';
import { AddSnackbarNotification } from '../../../../framework/src/actions/snackbarActions';
import { NavigateToApplication } from '../../../../framework/src/actions/navigationActions';

/** Represents the base action. */
export class BaseAction extends Action { }

export class SetpreproviderServerBusy extends BaseAction {
  constructor(public isBusy: boolean) {
    super();
  }
}

export class SetpreproviderServerInfo extends BaseAction {
  /**
   * Initializes a new instance of this class.
   */
  constructor(public PNFID: string | null, public IP_ADDRESS: string | null, public PORT_NUMBER: string | null) {
    super();

  }
}

// export const initializepreproviderServerAsyncActionCreator = (serverId: string) => (dispatch: Dispatch) => {
//   dispatch(new SetpreproviderServerBusy(true));
//   preproviderService.getpreproviderServerById(serverId).then(providerServer => {
//     if (!providerServer) {
//       dispatch(new SetpreproviderServerBusy(false));
//       dispatch(new AddSnackbarNotification({ message: `Error loading preproviderApp server [${serverId}]`, options: { variant: 'error' } }));
//       dispatch(new NavigateToApplication("preprovider"));
//       return;
//     }
//     dispatch(new SetpreproviderServerInfo(providerServer.PNFID, providerServer.IP_ADDRESS, providerServer.PORT_NUMBER));
//   });
// };
