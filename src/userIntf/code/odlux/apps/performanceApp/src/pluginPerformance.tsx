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

import { performanceAppRootHandler } from './handlers/performanceAppRootHandler';
import { NetworkElementSelector } from './views/networkElementSelector';

import PerformanceApplication from './views/performanceKPISelector';
import LineChart from './views/performanceKPICharts';
import HistoryData from './views/performanceHistoryData';

import { updateNodeIdAsyncActionCreator, updateViewActionAsyncCreator } from './actions/deviceActions';
import { DisplayModeType } from './handlers/viewDescriptionHandler';
import { ViewSpecification } from './models/uiModels';

const appIcon = require('./assets/icons/performanceHistoryAppIcon.svg');  // select app icon

let currentNodeId: string | null | undefined = undefined;
let currentVirtualPath: string | null | undefined = undefined;
let lastUrl: string | undefined = undefined;

const mapDispatch = (dispatcher: IDispatcher) => ({
 // updateNodeId: (nodeId: string) => dispatcher.dispatch(updateNodeIdAsyncActionCreator(nodeId)),
 // updateView: (vPath: string) => dispatcher.dispatch(updateViewActionAsyncCreator(vPath)),
});

// eslint-disable-next-line @typescript-eslint/naming-convention
const performanceApplicationRouteAdapter = connect(undefined, mapDispatch)((props: RouteComponentProps<{ nodeId?: string; 0: string }> & Connect<undefined, typeof mapDispatch>) => {
  React.useEffect(() => {
    return () => {
      lastUrl = undefined;
      currentNodeId = undefined;
      currentVirtualPath = undefined;
    };
  }, []);
  if (props.location.pathname !== lastUrl) {
    // ensure the asynchronous update will only be called once per path
    lastUrl = props.location.pathname;
    window.setTimeout(async () => {

      // check if the nodeId has changed
      let enableDump = false;
      if (currentNodeId !== props.match.params.nodeId) {
        currentNodeId = props.match.params.nodeId || undefined;
        if (currentNodeId && currentNodeId.endsWith('|dump')) {
          enableDump = true;
          currentNodeId = currentNodeId.replace(/\|dump$/i, '');
        }
        currentVirtualPath = null;
        // if (currentNodeId) {
        //   await props.updateNodeId(currentNodeId);
        // }
      }

      if (currentVirtualPath !== props.match.params[0]) {
        currentVirtualPath = props.match.params[0];
        if (currentVirtualPath && currentVirtualPath.endsWith('|dump')) {
          enableDump = true;
          currentVirtualPath = currentVirtualPath.replace(/\|dump$/i, '');
        }
        //await props.updateView(currentVirtualPath);
      }

      if (enableDump) {
        const device = props.state.performance.deviceDescription;
        const ds = props.state.performance.viewDescription.displaySpecification;

        const createDump = (view: ViewSpecification | null, level: number = 0) => {
          if (view === null) return 'Empty';
          const indention = Array(level * 4).fill(' ').join('');
          let result = '';

          if (!view) debugger;
          // result += `${indention}  [${view.canEdit ? 'rw' : 'ro'}] ${view.ns}:${view.name} ${ds.displayMode === DisplayModeType.displayAsList ? '[LIST]' : ''}\r\n`;
          result += Object.keys(view.elements).reduce((acc, cur) => {
            const elm = view.elements[cur];
            acc += `${indention}  [${elm.uiType === 'rpc' ? 'x' : elm.config ? 'rw' : 'ro'}:${elm.id}] (${elm.module}:${elm.label}) {${elm.uiType}} ${elm.uiType === 'object' && elm.isList ? `as LIST with KEY [${elm.key}]` : ''}\r\n`;
            // acc += `${indention}    +${elm.mandatory ? "mandatory" : "none"} - ${elm.path} \r\n`;
            
            switch (elm.uiType) {
              case 'object':
                acc += createDump(device.views[(elm as any).viewId], level + 1);
                break;
              default:
            }
            return acc;
          }, '');
          return `${result}`;
        };

        const dump = createDump(ds.displayMode === DisplayModeType.displayAsObject || ds.displayMode === DisplayModeType.displayAsList ? ds.viewSpecification : null, 0);
        const element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(dump));
        element.setAttribute('download', currentNodeId + '.txt');

        element.style.display = 'none';
        document.body.appendChild(element);

        element.click();

        document.body.removeChild(element);
      }

    });
  }
  return (
    <PerformanceApplication/> 
  );
});
// const performanceApplicationRouteAdapter2 = connect(undefined, mapDispatch)((props: RouteComponentProps<{ nodeId?: string; 0: string }> & Connect<undefined, typeof mapDispatch>) => {
//   React.useEffect(() => {
//     return () => {
//       lastUrl = undefined;
//       currentNodeId = undefined;
//       currentVirtualPath = undefined;
//     };
//   }, []);
//   if (props.location.pathname !== lastUrl) {
//     // ensure the asynchronous update will only be called once per path
//     lastUrl = props.location.pathname;
//     window.setTimeout(async () => {

//       // check if the nodeId has changed
//       let enableDump = false;
//       if (currentNodeId !== props.match.params.nodeId) {
//         currentNodeId = props.match.params.nodeId || undefined;
//         if (currentNodeId && currentNodeId.endsWith('|dump')) {
//           enableDump = true;
//           currentNodeId = currentNodeId.replace(/\|dump$/i, '');
//         }
//         currentVirtualPath = null;
//         if (currentNodeId) {
//           await props.updateNodeId(currentNodeId);
//         }
//       }

//       if (currentVirtualPath !== props.match.params[0]) {
//         currentVirtualPath = props.match.params[0];
//         if (currentVirtualPath && currentVirtualPath.endsWith('|dump')) {
//           enableDump = true;
//           currentVirtualPath = currentVirtualPath.replace(/\|dump$/i, '');
//         }
//         await props.updateView(currentVirtualPath);
//       }

//       if (enableDump) {
//         const device = props.state.performance.deviceDescription;
//         const ds = props.state.performance.viewDescription.displaySpecification;

//         const createDump = (view: ViewSpecification | null, level: number = 0) => {
//           if (view === null) return 'Empty';
//           const indention = Array(level * 4).fill(' ').join('');
//           let result = '';

//           if (!view) debugger;
//           // result += `${indention}  [${view.canEdit ? 'rw' : 'ro'}] ${view.ns}:${view.name} ${ds.displayMode === DisplayModeType.displayAsList ? '[LIST]' : ''}\r\n`;
//           result += Object.keys(view.elements).reduce((acc, cur) => {
//             const elm = view.elements[cur];
//             acc += `${indention}  [${elm.uiType === 'rpc' ? 'x' : elm.config ? 'rw' : 'ro'}:${elm.id}] (${elm.module}:${elm.label}) {${elm.uiType}} ${elm.uiType === 'object' && elm.isList ? `as LIST with KEY [${elm.key}]` : ''}\r\n`;
//             // acc += `${indention}    +${elm.mandatory ? "mandatory" : "none"} - ${elm.path} \r\n`;
            
//             switch (elm.uiType) {
//               case 'object':
//                 acc += createDump(device.views[(elm as any).viewId], level + 1);
//                 break;
//               default:
//             }
//             return acc;
//           }, '');
//           return `${result}`;
//         };

//         const dump = createDump(ds.displayMode === DisplayModeType.displayAsObject || ds.displayMode === DisplayModeType.displayAsList ? ds.viewSpecification : null, 0);
//         const element = document.createElement('a');
//         element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(dump));
//         element.setAttribute('download', currentNodeId + '.txt');

//         element.style.display = 'none';
//         document.body.appendChild(element);

//         element.click();

//         document.body.removeChild(element);
//       }

//     });
//   }
//   return(
//       <div  style={{backgroundColor: 'darkgrey', }} >
//       <h1 style={{margin: '1% 0% 0% 0%', alignSelf:"center", }}>Sample Charts</h1>
//       <div  style={{margin: '1% 0% 0% 0%', alignSelf:"center", width:'auto', height:'10%', borderWidth:'10', borderStyle:"double" }}>
//         {/* <BarChart data={this.state.elsdata} /> ; */}
//         <LineChart/> ;
//       </div>
//       </div>
//     )
// });

const KPIchartRouteAdapter = ((ChartData: any) => {
   return(
      <div style={{alignSelf:"center", width:'99%', height:'99%' }}>
        <div>
        <LineChart data={ChartData}/> 
        </div>
    </div>
  );
});

const App = withRouter((props: RouteComponentProps) => (
  <Switch>
    {/* <Route path={`${props.match.url}/:nodeId/*`} component={performanceApplicationRouteAdapter} /> */}
    <Route path={`${props.match.url}/:nodeId/KPIcharts`} component={LineChart} />
    <Route path={`${props.match.url}/:nodeId/Historydata`} component={HistoryData} />
    
    <Route path={`${props.match.url}/:nodeId`} component={performanceApplicationRouteAdapter} />
    
    <Route path={`${props.match.url}`} component={NetworkElementSelector} />
    {/* <Route exact path={`${ props.match.path}/charts/chart` } component={LineChart} /> */}
    {/* <Route path={`${props.match.url}/:LineChart`} component={LineChart} /> */}
    {/* <Route path={`${props.match.url}/:nodeId`} component={performanceApplicationRouteAdapter2} /> */}
    <Redirect to={`${props.match.url}`} />
  </Switch>
));

export function register() {
  applicationManager.registerApplication({
    name: 'performance',
    icon: appIcon,
    rootComponent: App,
    rootActionHandler: performanceAppRootHandler,
    menuEntry: 'Performance',
  });
}
