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

import { Action } from '../../../../framework/src/flux/action';
import { Dispatch } from '../../../../framework/src/flux/store';

import { connectService } from '../services/connectService';
import { NetworkElementConnection } from '../models/networkElementConnection';
import { AddSnackbarNotification } from '../../../../framework/src/actions/snackbarActions';
import { updateCurrentViewAsyncAction } from './commonNetworkElementsActions';
import { configurationRestService } from '../../../configurationApp/src/services/configurationrestServices';
var ftpconfig = require('../../../../framework/src/config.js');
/** Represents the base action. */
export class BaseAction extends Action { }

/** Represents an action creator for a async thunk action to mount a network element/node. */
export const mountNetworkElementAsyncActionCreator = (networkElement: NetworkElementConnection) => (dispatch: Dispatch) => {
  return connectService.mountNetworkElement(networkElement).then((success) => {
    if (success) {
     // const nodeID=networkElement.id?networkElement.id:"0";
     // let yangdata:any;
     // let  yangdataArray: { id: string;  capability: string; }[]=[];
      // configurationRestService.getCapabilitiesByMountId(nodeID)
      //         .then(async (res: any) => {
      //           const nodedata=res;
      //            // const nodedata={id:nid.toString(), cndata:res};
      //             // confdata.push(nodedata)
      //             // for (let i = 0; i < nodedata.cndata.availableCapabilities.length; ++i) 
      //             // {
      //             //     const capRaw = nodedata.cndata.availableCapabilities[i];
      //             //    // const data =  await yangService.getCapability(capRaw.capability, nid, capRaw.version);
      //             //    // yangdata={nid, capability:capRaw.capability, ydata:data};
      //             //    // yangdataArray.push(yangdata)
      //             // }
                  
      //           }).catch((err: any) => {
      //             console.log(err);
      //         })
      ///Mohan
      // if(networkElement.Pfile)
      // {
      //   let fptpath=ftpconfig.ftpurl;
      //   let ftpurl=fptpath+networkElement.Pfile;
      //   let dataPath='/rests/operations/network-topology:network-topology/topology=topology-netconf/node='+nodeID+'/yang-ext:mount/ietf-netconf:edit-config';
      //   let jsonData = '{"default-operation": "merge", "test-option": "test-then-set", "error-option": "stop-on-error", "url": "'+ ftpurl + '", "target": {"candidate": "candidate"}}';
      //   let commitdataPath= '/rests/operations/network-topology:network-topology/topology=topology-netconf/node=192.168.128.77/yang-ext:mount/ietf-netconf:commit'
      //   let commitjsonData ='{"confirm-timeout":"600"}';
      //   console.log('before wait!');
      //   setTimeout(() => {
      //    connectService.executeRpc(dataPath, { [`ietf-netconf:input`]: JSON.parse(jsonData) || {} });
      //    setTimeout(() => {
      //     connectService.executeRpc(commitdataPath, { [`ietf-netconf:input`]: JSON.parse(commitjsonData) || {} });
      //   }, 2000);
      //    connectService.executeRpc(commitdataPath, { [`ietf-netconf:input`]: JSON.parse(commitjsonData) || {} });
      //     dispatch(updateCurrentViewAsyncAction());
      //     dispatch(new AddSnackbarNotification({ message: `Requesting mount [${networkElement.nodeId}]`, options: { variant: 'info' } }));
      //   }, 3000);
      // }
      // else   {
      
      setTimeout(() => {
            dispatch(updateCurrentViewAsyncAction());
            dispatch(new AddSnackbarNotification({ message: `Requesting Connect [${networkElement.nodeId}]`, options: { variant: 'info' } }));
          }, 2000);
     // dispatch(updateCurrentViewAsyncAction());
     // dispatch(new AddSnackbarNotification({ message: `Requesting mount [${networkElement.nodeId}]`, options: { variant: 'info' } }));
      //}
    } else {
      dispatch(new AddSnackbarNotification({ message: `Failed to Connect [${networkElement.nodeId}]`, options: { variant: 'warning' } }));
    }
  }).catch(error => {
    dispatch(new AddSnackbarNotification({ message: `Failed to Connect [${networkElement.nodeId}]`, options: { variant: 'error' } }));
    console.error(error);
  });
};

/** Represents an action creator for a async thunk action to unmount a network element/node. */
export const unmountNetworkElementAsyncActionCreator = (nodeId: string) => (dispatch: Dispatch) => {
  return connectService.unmountNetworkElement(nodeId).then((success) => {
    if (success) {
      dispatch(updateCurrentViewAsyncAction());
      dispatch(new AddSnackbarNotification({ message: `Requesting disconnect [${nodeId}]`, options: { variant: 'info' } }));
    } else {
      dispatch(new AddSnackbarNotification({ message: `Failed to disconnect [${nodeId}]`, options: { variant: 'warning' } }));
    }
  }).catch(error => {
    dispatch(new AddSnackbarNotification({ message: `Failed to disconnect [${nodeId}]`, options: { variant: 'error' } }));
    console.error(error);
  });
};


