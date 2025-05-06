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
import React from 'react';
import { Theme, Tooltip } from '@mui/material';

import { WithStyles } from '@mui/styles';
import withStyles from '@mui/styles/withStyles';
import createStyles from '@mui/styles/createStyles';

import Refresh from '@mui/icons-material/Refresh';
import { IApplicationStoreState } from '../../../../framework/src/store/applicationStore';
import { connect, IDispatcher, Connect } from '../../../../framework/src/flux/connect';
import MaterialTable, { MaterialTableCtorType, ColumnType } from '../../../../framework/src/components/material-table';
import { createAvaliablesystemServersProperties, createAvaliablesystemServersActions } from '../handlers/avaliableSystemServersHandler';
import { systemdata } from '../models/systemServer';
import { NavigateToApplication } from '../../../../framework/src/actions/navigationActions';
import { history } from '../../../../framework/src/middleware/navigation';
import { BrowserRouter, Route, RouteComponentProps, useHistory } from 'react-router-dom';
import RefreshprofileDialog, { RefreshprofileDialogMode } from '../components/refreshprofileDialog';
const SystemServersTable = MaterialTable as MaterialTableCtorType<systemdata>;

const styles = (theme: Theme) => createStyles({
  button: {
    margin: 0,
    padding: "6px 6px",
    minWidth: 'unset',
  },
  spacer: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    display: "inline",
  },
});

const mapProps = (state: IApplicationStoreState) => ({
  systemServersProperties: createAvaliablesystemServersProperties(state),
});

const mapDispatch = (dispatcher: IDispatcher) => ({
  systemServersActions: createAvaliablesystemServersActions(dispatcher.dispatch),
  selectsystemServer: (container_name: string) => container_name && dispatcher.dispatch(new NavigateToApplication("systemperformance", container_name)),
});

type systemServerSelectionComponentProps = Connect<typeof mapProps, typeof mapDispatch> & WithStyles<typeof styles> & RouteComponentProps;

type systemViewSelectionComponentState = {

  test1: boolean
  refreshAuditLogEditorMode: RefreshprofileDialogMode;
}
let initialSorted = false;

class systemViewSelectionComponent extends React.Component<systemServerSelectionComponentProps, systemViewSelectionComponentState> {
  intervalId: NodeJS.Timeout;

  constructor(props: systemServerSelectionComponentProps) {
    super(props);
    this.state = {
      test1: false,
      refreshAuditLogEditorMode: RefreshprofileDialogMode.None
    }
    this.OpenHistory = this.OpenHistory.bind(this);
  }

  render() {
    const { classes } = this.props;
    const refreshprofileAction = {
      icon: Refresh, tooltip: 'Refresh System Performance Server Table', ariaLabel: 'refresh', onClick: () => {
        this.setState({
          refreshAuditLogEditorMode: RefreshprofileDialogMode.RefreshprofileTable
        });
      }
    };

    return <>
      <SystemServersTable stickyHeader title={"System Performance"} tableId={null} customActionButtons={[refreshprofileAction]} idProperty={"container_name"}
        {...this.props.systemServersActions} {...this.props.systemServersProperties} onHandleClick={(e, row) => { this.props.history.push(`${this.props.match.path}/${row.container_name}`); }} columns={[
          { property: "container_name", title: "Container Name ", type: ColumnType.text, width:'15%' },
          { property: "status", title: "Container Status ", type: ColumnType.text,width:'5%' },
          { property: "time", title: " Time", type: ColumnType.text,width:'15%' },
          { property: "Type", title: "Container Type ", type: ColumnType.text,width:'15%' },
          { property: "cpu_utilization", title: " Cpu Utilization", type: ColumnType.text, width:'15%' },
          { property: "memory_limit", title: " Allocated Memory", type: ColumnType.text,width:'15%' },
          { property: "memory_usage", title: " Used Memory", type: ColumnType.text,width:'15%' },
          { property: "memory_percentage", title: " Used Percentage", type: ColumnType.text, width:'15%' },
          
        ]}
      />
      <RefreshprofileDialog
          mode={this.state.refreshAuditLogEditorMode}
          onClose={this.onCloseRefreshAuditLogDialog}
        />
    </>;
  }
  private onCloseRefreshAuditLogDialog = () => {
    this.setState({
      refreshAuditLogEditorMode: RefreshprofileDialogMode.None
    });
  }

  private OpenHistory(e: any, row: any) {
    history.push({
      pathname: `${location.href}/${row.container_name}`
    });
  }

  public componentDidMount() {
    if (!initialSorted) {
      initialSorted = true;
       this.props.systemServersActions.onHandleExplicitRequestSort("Type","desc");
    } else {
      this.props.systemServersActions.onRefresh();
    }
    this.intervalId = setInterval(() => {
      this.props.systemServersActions.onRefresh();
    }, 10000); // 60000 milliseconds = 1 minute
  
  }
  componentWillUnmount() {
    // Clear the interval to prevent memory leaks
    clearInterval(this.intervalId);
  }

  private onSelectsystemServer = (event: React.MouseEvent<HTMLElement>, server: systemdata) => {
    event.preventDefault();
    event.stopPropagation();
    this.props.selectsystemServer(server && server.container_name);
  }
}
export const systemViewSelection = withStyles(styles)(connect(mapProps, mapDispatch)(systemViewSelectionComponent));
export default systemViewSelection;