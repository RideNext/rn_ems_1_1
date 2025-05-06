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
// app configuration and main entry point for the app

import React from "react";
import { withRouter, RouteComponentProps, Route, Switch, Redirect } from 'react-router-dom';


import applicationManager from '../../../framework/src/services/applicationManager';

import { connect, Connect, IDispatcher } from '../../../framework/src/flux/connect';

import { systemAppRootHandler } from './handlers/systemAppRootHandler';
import { avaliablesystemServersReloadAction } from "./handlers/avaliableSystemServersHandler";

import { systemViewSelection } from "./views/systemView";
import { initializesystemServerAsyncActionCreator } from "./actions/systemServerActions";
import  SystemHistory  from "./views/sytemHistory";
import systemService from "./services/systemService";
import SystemChart from "./views/systemCharts";

const appIcon = require('./assets/icons/operation.svg');  // select app icon
let currentcontainer_name: string | undefined = undefined;
const mapDisp = (dispatcher: IDispatcher) => ({
  loadsystemServer : (container_name: string) => dispatcher.dispatch(initializesystemServerAsyncActionCreator(container_name)),
});

const systemServerRouteAdapter = connect(undefined, mapDisp)((props: RouteComponentProps<{ container_name: string }> & Connect<undefined, typeof mapDisp>) => {
  
  React.useEffect(() => {
    return () => {
      currentcontainer_name = undefined;
    };
  }, []);
  if (currentcontainer_name !== props.match.params.container_name) {
    // route parameter has changed
    currentcontainer_name = props.match.params.container_name || undefined;
   // Hint: This timeout is need, since it is not recommended to change the state while rendering is in progress !
    window.setTimeout(() => {
      if (currentcontainer_name) {
        props.loadsystemServer(currentcontainer_name);
        systemService.getsysytemServerById(currentcontainer_name).then(historyData => {
          historyData=historyData
        })
        props.state
      }
    },1000);
  }
  return (
    <SystemHistory this={props}/> 
    // <SystemHistory(props)/>
  ) 
});

type AppProps = RouteComponentProps & Connect;

const App = (props: AppProps) => (
  <Switch>
    <Route path={`${props.match.url}/:container_name/historyCharts`} component={SystemChart} />
      <Route path={`${props.match.url}/:container_name`} component={systemServerRouteAdapter } /> 
    <Route exact path={ `${ props.match.path }` } component={ systemViewSelection } />
    <Redirect to={ `${ props.match.path }` } />
   </Switch>
);

const FinalApp = withRouter(connect()(App));

export function register() {
  const applicationApi = applicationManager.registerApplication({
    name: "systemperformance",
    icon: appIcon,
    rootComponent: FinalApp,
    rootActionHandler: systemAppRootHandler,
    menuEntry: "System Performance"
  });

  // prefetch all available profile servers
  applicationApi.applicationStoreInitialized.then(applicationStore => {
    applicationStore.dispatch(avaliablesystemServersReloadAction)
  });
};
