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

import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import LockResetIcon from '@mui/icons-material/LockReset';
import DeleteIcon from '@mui/icons-material/Delete';
import Refresh from '@mui/icons-material/Refresh';
//import { ReactComponent as ButtonIcon } from './assets\icons\PasswordReset.svg';

import { IApplicationStoreState } from '../../../../framework/src/store/applicationStore';
import { connect, IDispatcher, Connect } from '../../../../framework/src/flux/connect';
import MaterialTable, { MaterialTableCtorType, ColumnType } from '../../../../framework/src/components/material-table';

import { createAvaliableuserServersProperties, createAvaliableuserServersActions } from '../handlers/avaliableuserServersHandler';

import { userServer } from '../models/userServer';
import EdituserServerDialog, { EdituserServerDialogMode } from '../components/edituserServerDialog';
import RefreshuserDialog, { RefreshuserDialogMode } from '../components/refreshuserDialog';
import { NavigateToApplication } from '../../../../framework/src/actions/navigationActions';

const UserServersTable = MaterialTable as MaterialTableCtorType<userServer>;

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
  userServersProperties: createAvaliableuserServersProperties(state),
});

const mapDispatch = (dispatcher: IDispatcher) => ({
  userServersActions: createAvaliableuserServersActions(dispatcher.dispatch),
  selectuserServer: (userServerId: string) => userServerId && dispatcher.dispatch(new NavigateToApplication("user", userServerId)),
});

const emptyuserServer: userServer = {
  id: "",
  firstName: "",
  lastName: "",
  email: "",
  username: "",
  password: "",
  confirmPassword: "",
  mappedRoles:[""],
  availableRoles: [""],
  maproleid: [""],
  avlroleid: [""],
  //userId: "",
  mappedGroups: "",
  edittype:""
 // newPassword: "",
};

type userServerSelectionComponentProps = Connect<typeof mapProps, typeof mapDispatch> & WithStyles<typeof styles>;

type userServerSelectionComponentState = {
  userServerToEdit: userServer,
  userServerEditorMode: EdituserServerDialogMode,
  refreshuserEditorMode: RefreshuserDialogMode
}

let initialSorted = false;

class userServerSelectionComponent extends React.Component<userServerSelectionComponentProps, userServerSelectionComponentState> {

  constructor(props: userServerSelectionComponentProps) {
    super(props);

    this.state = {
      userServerEditorMode: EdituserServerDialogMode.None,
      userServerToEdit: emptyuserServer,
      refreshuserEditorMode: RefreshuserDialogMode.None
    }
  }

  render() {
    const { classes } = this.props;
    const refreshuserAction = {
      icon: Refresh, tooltip: 'Refresh user Server Table', ariaLabel:'refresh', onClick: () => {
        this.setState({
          refreshuserEditorMode: RefreshuserDialogMode.RefreshuserTable
        });
      }
    };

    const adduserServerActionButton = {
      icon: AddIcon, tooltip: 'Add New Users', ariaLabel:'add-element', onClick: () => {
        this.setState({
          userServerEditorMode: EdituserServerDialogMode.AdduserServer,
          userServerToEdit: emptyuserServer,
        });
      }
    };
    return <>
      <UserServersTable stickyHeader title={"Users"} tableId={null} customActionButtons={[refreshuserAction, adduserServerActionButton]} idProperty={"id"}
        {...this.props.userServersActions} {...this.props.userServersProperties} columns={[
        
          // { property: "id", title: "ID", type: ColumnType.text },
          { property: "username", title: "User Name", type: ColumnType.text },
          { property: "firstName", title: "First Name", type: ColumnType.text },
          { property: "lastName", title: "Last Name", type: ColumnType.text },
          { property: "email", title: "Email", type: ColumnType.text },
          { property: "mappedRoles", title: "Role", type: ColumnType.text },
          { property: "mappedGroups", title: "Group", type: ColumnType.text },
          { property: "availableRoles", title: "availableRoles", type: ColumnType.text },
          {
            property: "actions", title: "Actions", type: ColumnType.custom, customControl: ({ rowData }) => (

              
              
              <div className={classes.spacer}>
               

                 
                <Tooltip disableInteractive title={"Edit"} ><IconButton
                  className={classes.button}
                  onClick={event => { this.onEdituserServer(event, rowData); }}
                  size="large"><EditIcon /></IconButton></Tooltip>  

                <Tooltip disableInteractive title={"Reset Password"} ><IconButton
                  className={classes.button}
                  onClick={event => { this.onResetPassword(event, rowData); }}
                  size="large"><LockResetIcon /></IconButton></Tooltip>  

                <Tooltip disableInteractive title={"Remove"} ><IconButton
                  className={classes.button}
                  onClick={event => { this.onRemoveuserServer(event, rowData); }}
                  size="large"><DeleteIcon /></IconButton></Tooltip>
                  
              </div>
          )
          }
        ]} onHandleClick={this.onSelectuserServer} />
      <EdituserServerDialog
        userServer={this.state.userServerToEdit}
        mode={this.state.userServerEditorMode}
        onClose={this.onCloseEdituserServerDialog} />
      <RefreshuserDialog
        mode={this.state.refreshuserEditorMode}
        onClose={this.onCloseRefreshuserDialog}
      />
    </>;
  }

  public componentDidMount() {

    if (!initialSorted) {
      initialSorted = true;
      this.props.userServersActions.onHandleRequestSort("name");
    } else {
      this.props.userServersActions.onRefresh();
    }
  }

  private onSelectuserServer = (event: React.MouseEvent<HTMLElement>, server: userServer) => {
    event.preventDefault();
    event.stopPropagation();
    this.props.selectuserServer(server && server.id);

  }

  private onEdituserServer = (event: React.MouseEvent<HTMLElement>, server: userServer) => {
    event.preventDefault();
    event.stopPropagation();
    
    this.setState({
      userServerEditorMode: EdituserServerDialogMode.EdituserServer,
      userServerToEdit: server,
    });
  }

  private onResetPassword = (event: React.MouseEvent<HTMLElement>, server: userServer) => {
    event.preventDefault();
    event.stopPropagation();
    this.setState({
      userServerEditorMode: EdituserServerDialogMode.ResetPasswordServer,
      userServerToEdit: server,
    });
  }

  private onRemoveuserServer = (event: React.MouseEvent<HTMLElement>, server: userServer) => {
    event.preventDefault();
    event.stopPropagation();
    this.setState({
      userServerEditorMode: EdituserServerDialogMode.RemoveuserServer,
      userServerToEdit: server,
    });
  }

  private onCloseEdituserServerDialog = () => {
    this.setState({
      userServerEditorMode: EdituserServerDialogMode.None,
      userServerToEdit: emptyuserServer,
    });
  }
  private onCloseRefreshuserDialog = () => {
    this.setState({
      refreshuserEditorMode: RefreshuserDialogMode.None
    });
  }
}


export const userServerSelection = withStyles(styles)(connect(mapProps, mapDispatch)(userServerSelectionComponent));
export default userServerSelection;