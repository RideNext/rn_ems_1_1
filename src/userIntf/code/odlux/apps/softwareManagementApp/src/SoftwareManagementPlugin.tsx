
 /***
  * ################################################################################################
  * #                                                                                              #
  * #   Copyright (C)  [2019]  [RideNext Software Solutions Pvt Ltd]. All rights  reserved         #
  * #                                                                                              #
  * ################################################################################################
 ****/

// app configuration and main entry point for the app

import React from "react";
import { withRouter, RouteComponentProps, Route, Switch, Redirect } from 'react-router-dom';

import applicationManager from '../../../framework/src/services/applicationManager';

import { connect, Connect, IDispatcher } from '../../../framework/src/flux/connect';

import { softwaremanagementAppRootHandler } from './handlers/SoftwareManagementAppRootHandler';
import { avaliablesoftwaremanagementServersReloadAction } from "./handlers/avaliableSoftwareManagementServersReloadAction";

import { softwaremanagementServerSelection } from "./views/SoftwareManagementSelection";
//import { initializepreproviderServerAsyncActionCreator } from "./actions/preproviderServerActions";

const appIcons = require('./assets/icons/softwareupgrade.svg');  // select app icon


type AppProps = RouteComponentProps & Connect;

const App = (props: AppProps) => (
  <Switch>
    <Route exact path={ `${ props.match.path}/:${props.location.pathname.split('/')[2] }` } component={ softwaremanagementServerSelection  } />
    <Redirect to={ `${ props.match.path }` } />
   </Switch>
);

const FinalApp = withRouter(connect()(App));

export function register() {
  const applicationApi = applicationManager.registerApplication({
    name: "softwaremanagement",
    icon: appIcons,
    rootComponent: FinalApp,
    rootActionHandler: softwaremanagementAppRootHandler,
    menuEntry: "Software Management"
  });

  applicationApi.applicationStoreInitialized.then(applicationStore => {
    applicationStore.dispatch(avaliablesoftwaremanagementServersReloadAction)
  });
};
