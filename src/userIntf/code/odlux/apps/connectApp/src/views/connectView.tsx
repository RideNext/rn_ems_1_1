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

import { AppBar, Tab, Tabs } from '@mui/material';

import { useApplicationDispatch, useSelectApplicationState } from '../../../../framework/src/flux/connect';

import { findWebUrisForGuiCutThroughAsyncAction, setPanelAction } from '../actions/commonNetworkElementsActions';
import { ConnectionStatusLog } from '../components/connectionStatusLog';
import { NetworkElementsList } from '../components/networkElements';
import { connectionStatusLogReloadAction } from '../handlers/connectionStatusLogHandler';
import { networkElementsReloadAction } from '../handlers/networkElementsHandler';
import { NetworkElementConnection } from '../models/networkElementConnection';
import { PanelId } from '../models/panelId';
import { SystemConfig } from '../components/SystemConfig';

const ConnectApplicationComponent:  React.FC<{}> = () => {

  const panelId = useSelectApplicationState(state => state.connect.currentOpenPanel);
  const netWorkElements = useSelectApplicationState(state => state.connect.networkElements);

  const dispatch = useApplicationDispatch();
  const onLoadNetworkElements = () => dispatch(networkElementsReloadAction);
  const loadWebUris = (networkElements: NetworkElementConnection[]) => dispatch(findWebUrisForGuiCutThroughAsyncAction(networkElements.map((ne) => ne.id!)));
  const onLoadConnectionStatusLog = () => dispatch(connectionStatusLogReloadAction);
  const switchActivePanel = (panelId2: PanelId) => dispatch(setPanelAction(panelId2));

  const onTogglePanel = (panelId2: PanelId) => {
    const nextActivePanel = panelId2;
    switchActivePanel(nextActivePanel);

    switch (nextActivePanel) {
      case 'NetworkElements':
        onLoadNetworkElements();
        break;
      case 'ConnectionStatusLog':
        onLoadConnectionStatusLog();
        break;
      case null:
        // do nothing if all panels are closed
        break;
      default:
        console.warn('Unknown nextActivePanel [' + nextActivePanel + '] in connectView');
        break;
    }
  };

  const onHandleTabChange = (event: React.SyntheticEvent, newValue: PanelId) => {
    switchActivePanel(newValue);
  };

  React.useEffect(()=>{
    if (panelId === null) { //don't change tabs, if one is selected already
      onTogglePanel('NetworkElements');
    }
  }, []);

  React.useEffect(()=>{
    const networkElements = netWorkElements;

    if (networkElements.rows.length > 0) {
      // Search for weburi client for all netWorkElements in case of table data changes.
      // e.G: Pagination of the table data (there is no event)
      loadWebUris(networkElements.rows);
    }
  }, [netWorkElements]);

  return (
    <>
      <AppBar enableColorOnDark position="static" style={{ width: '50%' }}>
        <Tabs indicatorColor="secondary" textColor="inherit" value={panelId} onChange={onHandleTabChange} aria-label="connect-app-tabs">
          <Tab aria-label="network-elements-list-tab" label="NODES" value="NetworkElements" sx={{display: "flex", flex:1, color: '#000000de', backgroundColor: '#c6cbd1', border: '1px solid #ccc', borderRadius: '5px', marginRight: '2px',  marginBottom: '2px', "&.Mui-selected": { color: '#ffffff', backgroundColor: '#55679d' }  }} />
          <Tab aria-label="FTP-Config-tab" label="File Server Config" value="SystemConfig" sx={{display: "flex", flex:1, color: '#000000de', backgroundColor: '#c6cbd1',border: '1px solid #ccc', borderRadius: '5px', marginRight: '2px',  marginBottom: '2px', "&.Mui-selected": { color: '#ffffff', backgroundColor: '#55679d' }  }} />
          <Tab aria-label="connection-status-log-tab" label="Connection Status" value="ConnectionStatusLog" sx={{display: "flex", flex:1, color: '#000000de', backgroundColor: '#c6cbd1', border: '1px solid #ccc', borderRadius: '5px', marginRight: '2px', marginBottom: '2px',  "&.Mui-selected": { color: '#ffffff', backgroundColor: '#55679d' }  }} />
        </Tabs>
      </AppBar>
      {panelId === 'NetworkElements' ? <NetworkElementsList />
        : panelId === 'ConnectionStatusLog'? <ConnectionStatusLog />
        : panelId === 'SystemConfig'? <SystemConfig />
        : null
      }
    </>
  );
};

export const ConnectApplication = ConnectApplicationComponent;
export default ConnectApplication;
