
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

import { preproviderAppRootHandler } from './handlers/preproviderAppRootHandler';
import { avaliablepreproviderServersReloadAction } from "./handlers/avaliablepreproviderServersReloadAction";

import { preproviderServerSelection } from "./views/preproviderSelection";
//import { initializepreproviderServerAsyncActionCreator } from "./actions/preproviderServerActions";

const appIcons = require('./assets/icons/preproviderfile.svg');  // select app icon

let currentpreproviderServerId: string | undefined = undefined;

// const mapDisp = (dispatcher: IDispatcher) => ({
//   loadpreproviderServer : (preproviderServerId: string) => dispatcher.dispatch(initializepreproviderServerAsyncActionCreator(preproviderServerId)),
// });

// const preproviderServerRouteAdapter = connect(undefined, mapDisp)((props: RouteComponentProps<{ preproviderServerId: string }> & Connect<undefined, typeof mapDisp>) => {
//   if (currentpreproviderServerId !== props.match.params.preproviderServerId) {
//     currentpreproviderServerId = props.match.params.preproviderServerId || undefined;
//     window.setTimeout(() => {
//       if (currentpreproviderServerId) {
//         props.loadpreproviderServer(currentpreproviderServerId);
//       }
//     });
//   }
//   return (
//     null
//   )
// });

type AppProps = RouteComponentProps & Connect;

const App = (props: AppProps) => (
  <Switch>
    <Route exact path={ `${ props.match.path }` } component={ preproviderServerSelection } />
    <Redirect to={ `${ props.match.path }` } />
   </Switch>
);

const FinalApp = withRouter(connect()(App));

export function register() {
  const applicationApi = applicationManager.registerApplication({
    name: "preprovider",
    icon: appIcons,
    rootComponent: FinalApp,
    rootActionHandler: preproviderAppRootHandler,
    menuEntry: "NF Provisioning"
  });

  applicationApi.applicationStoreInitialized.then(applicationStore => {
    applicationStore.dispatch(avaliablepreproviderServersReloadAction)
  });
};
