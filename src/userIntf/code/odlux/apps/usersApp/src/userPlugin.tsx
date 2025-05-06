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
// app configuration and main entry point for the app

import React from "react";
import { withRouter, RouteComponentProps, Route, Switch, Redirect } from 'react-router-dom';

import applicationManager from '../../../framework/src/services/applicationManager';

import { connect, Connect, IDispatcher } from '../../../framework/src/flux/connect';

import { userAppRootHandler } from './handlers/userAppRootHandler';
import { avaliableuserServersReloadAction } from "./handlers/avaliableuserServersHandler";

//import { UserApplication } from "./views/userApplication";
import { userServerSelection } from "./views/userSelection";
import { initializeuserServerAsyncActionCreator } from "./actions/userServerActions";

const appIcon = require('./assets/icons/user-management.svg');  // select app icon

let currentuserServerId: string | undefined = undefined;

const mapDisp = (dispatcher: IDispatcher) => ({
  loaduserServer : (userServerId: string) => dispatcher.dispatch(initializeuserServerAsyncActionCreator(userServerId)),
});

const userServerRouteAdapter = connect(undefined, mapDisp)((props: RouteComponentProps<{ userServerId: string }> & Connect<undefined, typeof mapDisp>) => {
  if (currentuserServerId !== props.match.params.userServerId) {
    // route parameter has changed
    currentuserServerId = props.match.params.userServerId || undefined;
    // Hint: This timeout is need, since it is not recommended to change the state while rendering is in progress !
    window.setTimeout(() => {
      if (currentuserServerId) {
        props.loaduserServer(currentuserServerId);
      }
    });
  }
  return (
    null
   // <UserApplication/>
  )
});

type AppProps = RouteComponentProps & Connect;

const App = (props: AppProps) => (
  <Switch>
    <Route exact path={ `${ props.match.path }` } component={ userServerSelection } />
    <Route path={ `${ props.match.path }/:userServerId` } component={ userServerRouteAdapter } />
    <Redirect to={ `${ props.match.path }` } />
   </Switch>
);

const FinalApp = withRouter(connect()(App));

export function register() {
  const applicationApi = applicationManager.registerApplication({
    name: "users",
    icon: appIcon,
    rootComponent: FinalApp,
    rootActionHandler: userAppRootHandler,
    menuEntry: "Users"
  });

  // prefetch all available user servers
  applicationApi.applicationStoreInitialized.then(applicationStore => {
    applicationStore.dispatch(avaliableuserServersReloadAction)
  });
};
