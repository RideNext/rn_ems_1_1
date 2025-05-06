
 /***
  * ################################################################################################
  * #                                                                                              #
  * #   Copyright (C)  [2019]  [RideNext Software Solutions Pvt Ltd]. All rights  reserved         #
  * #                                                                                              #
  * ################################################################################################
 ****/

// main state handler

import { combineActionHandler } from '../../../../framework/src/flux/middleware';
import { IAvaliablesoftwaremanagementServersState, avaliablesoftwaremanagementServersActionHandler } from './avaliableSoftwareManagementServersReloadAction' ;

export interface softwaremanagementAppStoreState {
  avaliablesoftwaremanagementServers: IAvaliablesoftwaremanagementServersState,
}

declare module '../../../../framework/src/store/applicationStore' {
  interface IApplicationStoreState {
    softwaremanagement: softwaremanagementAppStoreState
  }
}

const actionHandlers = {
  avaliablesoftwaremanagementServers: avaliablesoftwaremanagementServersActionHandler,
};

export const softwaremanagementAppRootHandler = combineActionHandler<softwaremanagementAppStoreState>(actionHandlers);
export default softwaremanagementAppRootHandler;
