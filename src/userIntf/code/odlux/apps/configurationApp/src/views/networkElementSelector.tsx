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
import { RouteComponentProps, withRouter } from 'react-router-dom';

import { connect, IDispatcher, Connect } from '../../../../framework/src/flux/connect';
import { IApplicationStoreState } from '../../../../framework/src/store/applicationStore';
import { MaterialTable, MaterialTableCtorType, ColumnType } from '../../../../framework/src/components/material-table';

import { NetworkElementConnection } from '../models/networkElementConnection';
import { createConnectedNetworkElementsProperties, createConnectedNetworkElementsActions } from '../../../configurationApp/src/handlers/connectedNetworkElementsHandler';
import { configurationRestService } from '../services/configurationrestServices';
import { ThreeCircles, RotatingLines } from 'react-loader-spinner';
import { yangService } from '../services/yangService';


const mapProps = (state: IApplicationStoreState) => ({
  connectedNetworkElementsProperties: createConnectedNetworkElementsProperties(state),
});

const mapDispatch = (dispatcher: IDispatcher) => ({
  connectedNetworkElementsActions: createConnectedNetworkElementsActions(dispatcher.dispatch),
});

const ConnectedElementTable = MaterialTable as MaterialTableCtorType<NetworkElementConnection>;

type NetworkElementSelectorComponentProps = RouteComponentProps & Connect<typeof mapProps, typeof mapDispatch>;

let initialSorted = false;

class NetworkElementSelectorComponent extends React.Component<NetworkElementSelectorComponentProps> {

  componentDidMount() {

    if (!initialSorted) {
      initialSorted = true;
      this.props.connectedNetworkElementsActions.onHandleRequestSort('node-id');
    } else
      {
        this.props.connectedNetworkElementsActions.onRefresh();
      }
  }

  render() {
    let listdata={...this.props.connectedNetworkElementsProperties};
      if(listdata.rows.length > 0)
      {
      let confdata: { id: string; cndata: { availableCapabilities: { capabilityOrigin: string; capability: string; version: string; }[] | null; unavailableCapabilities: { failureReason: string; capability: string; version: string; }[] | null; importOnlyModules: { name: string; revision: string; }[] | null; }; }[]  = []
      let nodedata:any;
      let yangdata:any;
     let  yangdataArray: { id: string;  capability: string; }[]=[];
        for(var i = 0; i < listdata.rows.length; i++){
         let nid:any;
         nid =  listdata.rows[i].id? listdata.rows[i].id:"0";
          configurationRestService.getCapabilitiesByMountId(nid)
          .then(async (res) => {
              localStorage.removeItem("configData");
              localStorage.removeItem("yangdataArray");
              nodedata={id:nid.toString(), cndata:res};
              for (let i = 0; i < nodedata.cndata.availableCapabilities.length; ++i) 
              {
                  const capRaw = nodedata.cndata.availableCapabilities[i];
                  const data =  await yangService.getCapability(capRaw.capability, nid, capRaw.version);
                  yangdata={nid, capability:capRaw.capability, ydata:data};
                  yangdataArray.push(yangdata)
              }
              confdata.push(nodedata)
              localStorage.setItem("yangdataArray",JSON.stringify(yangdataArray));
              localStorage.setItem("configData",JSON.stringify(confdata));
            }).catch((err) => {
              console.log(err);
          })
        }
      }
    return (
      <ConnectedElementTable stickyHeader title={"Configuration"} tableId="configurable-elements-table" onHandleClick={(e, row) => { this.props.history.push(`${this.props.match.path}/${row.nodeId}`); }} columns={[
        { property: 'nodeId', title: 'Node Name', type: ColumnType.text },
        { property: 'isRequired', title: 'Required', type: ColumnType.boolean },
        { property: 'host', title: 'Host', type: ColumnType.text },
        { property: 'port', title: 'Port', type: ColumnType.numeric },
        { property: 'coreModelCapability', title: 'Core Model', type: ColumnType.text },
        { property: 'deviceType', title: 'Type', type: ColumnType.text },
      ]} idProperty="id" {...this.props.connectedNetworkElementsActions} {...this.props.connectedNetworkElementsProperties} asynchronus >
      </ConnectedElementTable>
    );
  }
}

export const NetworkElementSelector = withRouter(connect(mapProps, mapDispatch)(NetworkElementSelectorComponent));
export default NetworkElementSelector;

