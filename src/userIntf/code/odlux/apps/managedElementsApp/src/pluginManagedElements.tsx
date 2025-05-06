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

import React from 'react';
import { withRouter, RouteComponentProps, Route, Switch, Redirect } from 'react-router-dom';

import { connect, Connect, IDispatcher } from '../../../framework/src/flux/connect';
import applicationManager from '../../../framework/src/services/applicationManager';
import { managedElementsAppRootHandler } from './handlers/managedElementsAppRootHandler';
import { NetworkElementSelector } from './views/networkElementSelector';

import ElementConfig from './views/elementConfig';
import  {RuConfig} from './views/ruConfig';
const appIcon = require('./assets/icons/configurationAppIcon.svg');  // select app icon

let currentNodeId: string | null | undefined = undefined;
let currentVirtualPath: string | null | undefined = undefined;
let lastUrl: string | undefined = undefined;

const mapDispatch = (dispatcher: IDispatcher) => ({
 // updateNodeId: (nodeId: string) => dispatcher.dispatch(updateNodeIdAsyncActionCreator(nodeId)),
 // updateView: (vPath: string) => dispatcher.dispatch(updateViewActionAsyncCreator(vPath)),
});

const App = withRouter((props: RouteComponentProps) => (
  <Switch>
    <Route exact path={`${props.match.url}/ruconfig/:nodeId`} component={RuConfig} />
    <Route exact path={`${props.match.url}/:nodeId`} component={ElementConfig} />
    <Route path={`${props.match.url}`} component={NetworkElementSelector} />
    <Redirect to={`${props.match.url}`} />
  </Switch>
));

export function register() {
  applicationManager.registerApplication({
    name: 'managedelements',
    icon: appIcon,
    rootComponent: App,
    rootActionHandler: managedElementsAppRootHandler,
    menuEntry: 'Managed Elements',
  });
}
