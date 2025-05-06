
 /***
  * ################################################################################################
  * #                                                                                              #
  * #   Copyright (C)  [2019]  [RideNext Software Solutions Pvt Ltd]. All rights  reserved         #
  * #                                                                                              #
  * ################################################################################################
 ****/

// main state handler

import { combineActionHandler } from '../../../../framework/src/flux/middleware';
import { IAvaliablepreproviderServersState, avaliablepreproviderServersActionHandler } from './avaliablepreproviderServersReloadAction' ;

export interface preproviderAppStoreState {
  avaliablepreproviderServers: IAvaliablepreproviderServersState,
}

declare module '../../../../framework/src/store/applicationStore' {
  interface IApplicationStoreState {
    preprovider: preproviderAppStoreState
  }
}

const actionHandlers = {
  avaliablepreproviderServers: avaliablepreproviderServersActionHandler,
};

export const preproviderAppRootHandler = combineActionHandler<preproviderAppStoreState>(actionHandlers);
export default preproviderAppRootHandler;
