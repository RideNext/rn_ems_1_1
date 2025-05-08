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
import { XmlFileInfo, userConfig, BusySymbol, userConfigResponse, userServerDevice } from "../models/userServer";
import { IActionHandler } from "../../../../framework/src/flux/action";
import { SetuserServerVersion, SetuserServerInfo, SetAlluserServerConfigurations, SetuserServerBusy, SetuserServerSupportedDevices, SetuserServerReachable } from "../actions/userServerActions";
//import { SetuserBusyByName, UpdateuserConfig, AdduserConfig, RemoveuserConfig } from "../actions/userConfigActions";

export type userServerState = {
  busy: boolean;
  name: string | null;
  url: string | null;
  id: string | null;
  serverVersion: string | null;
  userVersion: string | null;
  nexmls: XmlFileInfo[];
  configurations: userConfigResponse[];
  supportedDevices: userServerDevice[];
  isReachable: boolean;
}

const userServerInit: userServerState = {
  busy: false,
  name: null,
  url: null,
  id: null,
  serverVersion: null,
  userVersion: null,
  nexmls: [],
  configurations: [],
  supportedDevices: [],
  isReachable: true
}

export const userServerHandler: IActionHandler<userServerState> = (state = userServerInit, action) => {
  if (action instanceof SetuserServerBusy) {
    state = {
      ...state,
      busy: action.isBusy
    };
  } else if (action instanceof SetuserServerInfo) {
    state = {
      ...state,
      name: action.name,
      url: action.url,
      id: action.id,
    };
  } else if (action instanceof SetuserServerVersion) {
    state = {
      ...state,
      serverVersion: action.versionInfo && action.versionInfo.server,
      userVersion: action.versionInfo && action.versionInfo.users,
      nexmls: action.versionInfo && [...action.versionInfo.nexmls] || [],
    };
  } else if (action instanceof SetAlluserServerConfigurations) {
    state = {
      ...state,
      configurations: action.allConfigurations && action.allConfigurations.map(config => ({ ...config, busy: false })) || [],
    };
  } else if (action instanceof SetuserServerSupportedDevices) {
    state = {
      ...state,
      supportedDevices: action.devices || [],
    };
  }  else if( action instanceof SetuserServerReachable){
    state = {...state, isReachable: action.isReachable}
  }
  return state;
} 