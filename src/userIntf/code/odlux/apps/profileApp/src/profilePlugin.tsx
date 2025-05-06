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

import { profileAppRootHandler } from './handlers/profileAppRootHandler';
import { avaliableprofileServersReloadAction } from "./handlers/avaliableProfileServersHandler";

import { profileServerSelection } from "./views/profileSelection";
import { initializeprofileServerAsyncActionCreator } from "./actions/profileServerActions";

const appIcon = require('./assets/icons/file.svg');  // select app icon

let currentprofileServerId: string | undefined = undefined;

const mapDisp = (dispatcher: IDispatcher) => ({
  loadprofileServer : (profileServerId: string) => dispatcher.dispatch(initializeprofileServerAsyncActionCreator(profileServerId)),
});

const profileServerRouteAdapter = connect(undefined, mapDisp)((props: RouteComponentProps<{ profileServerId: string }> & Connect<undefined, typeof mapDisp>) => {
  if (currentprofileServerId !== props.match.params.profileServerId) {
    // route parameter has changed
    currentprofileServerId = props.match.params.profileServerId || undefined;
    // Hint: This timeout is need, since it is not recommended to change the state while rendering is in progress !
    window.setTimeout(() => {
      if (currentprofileServerId) {
        props.loadprofileServer(currentprofileServerId);
      }
    });
  }
  return (
    null
    // <ProfileApplication/>
  )
});

type AppProps = RouteComponentProps & Connect;

const App = (props: AppProps) => (
  <Switch>
    <Route exact path={ `${ props.match.path }` } component={ profileServerSelection } />
    <Route path={ `${ props.match.path }/:profileServerId` } component={ profileServerRouteAdapter } />
    <Redirect to={ `${ props.match.path }` } />
   </Switch>
);

const FinalApp = withRouter(connect()(App));

export function register() {
  const applicationApi = applicationManager.registerApplication({
    name: "profiles",
    icon: appIcon,
    rootComponent: FinalApp,
    rootActionHandler: profileAppRootHandler,
    menuEntry: "NF Profiles"
  });

  // prefetch all available profile servers
  applicationApi.applicationStoreInitialized.then(applicationStore => {
    applicationStore.dispatch(avaliableprofileServersReloadAction)
  });
};
