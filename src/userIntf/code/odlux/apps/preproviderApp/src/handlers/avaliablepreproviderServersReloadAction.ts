
 /***
  * ################################################################################################
  * #                                                                                              #
  * #   Copyright (C)  [2019]  [RideNext Software Solutions Pvt Ltd]. All rights  reserved         #
  * #                                                                                              #
  * ################################################################################################
 ****/

import { createExternal,IExternalTableState } from '../../../../framework/src/components/material-table/utilities';
import { createSearchDataHandler } from '../../../../framework/src/utilities/elasticSearch';

import { providerdata } from '../models/preproviderServer';
import { preproviderServerResourcePath } from '../services/preproviderService';

export interface IAvaliablepreproviderServersState extends IExternalTableState<providerdata> { }

const avaliablepreproviderServersSearchHandler = createSearchDataHandler<providerdata>(preproviderServerResourcePath);

export const {
  actionHandler: avaliablepreproviderServersActionHandler,
  createActions: createAvaliablepreproviderServersActions,
  createProperties: createAvaliablepreproviderServersProperties,
  reloadAction: avaliablepreproviderServersReloadAction,

} = createExternal<providerdata>(avaliablepreproviderServersSearchHandler, appState => appState.preprovider.avaliablepreproviderServers);
