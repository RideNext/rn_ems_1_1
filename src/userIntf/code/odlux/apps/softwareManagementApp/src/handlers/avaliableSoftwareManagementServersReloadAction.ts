
 /***
  * ################################################################################################
  * #                                                                                              #
  * #   Copyright (C)  [2019]  [RideNext Software Solutions Pvt Ltd]. All rights  reserved         #
  * #                                                                                              #
  * ################################################################################################
 ****/

import { createExternal,IExternalTableState } from '../../../../framework/src/components/material-table/utilities';
import { createSearchDataHandler } from '../../../../framework/src/utilities/elasticSearch';

import { softwareManagementData } from '../models/SoftwareManagementServer';
import { softwaremanagementServerResourcePath } from '../services/SoftwareManagementService';

export interface IAvaliablesoftwaremanagementServersState extends IExternalTableState<softwareManagementData> { }

const avaliablesoftwaremanagementServersSearchHandler = createSearchDataHandler<softwareManagementData>(softwaremanagementServerResourcePath);

export const {
  actionHandler: avaliablesoftwaremanagementServersActionHandler,
  createActions: createAvaliablesoftwaremanagementServersActions,
  createProperties: createAvaliablesoftwaremanagementServersProperties,
  reloadAction: avaliablesoftwaremanagementServersReloadAction,

} = createExternal<softwareManagementData>(avaliablesoftwaremanagementServersSearchHandler, appState => appState.softwaremanagement.avaliablesoftwaremanagementServers);
