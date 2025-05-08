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
import * as React from 'react';
import * as $ from 'jquery';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


import { IDispatcher, connect, Connect } from '../../../../framework/src/flux/connect';

import { addAvaliableuserServerAsyncActionCreator, removeAvaliableuserServerAsyncActionCreator, updateAvaliableuserServerAsyncActionCreator, resetpasswordAvaliableuserServerAsyncActionCreator } from '../actions/avaliableuserServersActions';
import { userServer } from '../models/userServer';
import { Chip, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import { string } from 'prop-types';

export enum EdituserServerDialogMode {
  None = "none",
  AdduserServer = "adduserServer",
  EdituserServer = "edituserServer",
  ResetPasswordServer= "resetpasswordServer",
  RemoveuserServer = "removeuserServer",
}

const mapDispatch = (dispatcher: IDispatcher) => ({
  adduserServer: (element: userServer) => {
    dispatcher.dispatch(addAvaliableuserServerAsyncActionCreator(element));
  },
  updateuserServer: (element: userServer) => {
    dispatcher.dispatch(updateAvaliableuserServerAsyncActionCreator(element));
  },
  resetpasswordServer: (element: userServer) => {
    dispatcher.dispatch(resetpasswordAvaliableuserServerAsyncActionCreator(element));
  },
  removeuserServer: (element: userServer) => {
    dispatcher.dispatch(removeAvaliableuserServerAsyncActionCreator(element));
  },
});

type DialogSettings = {
  dialogTitle: string;
  dialogDescription: string;
  applyButtonText: string;
  cancelButtonText: string;
  readonly: boolean;
};

const settings: { [key: string]: DialogSettings } = {
  [EdituserServerDialogMode.None]: {
    dialogTitle: "",
    dialogDescription: "",
    applyButtonText: "",
    cancelButtonText: "",
    readonly: true,
  },
  [EdituserServerDialogMode.AdduserServer]: {
    dialogTitle: "Add Users",
    dialogDescription: "",
    applyButtonText: "Save >>",
    cancelButtonText: "Cancel",
    readonly: false,
  },
  [EdituserServerDialogMode.EdituserServer]: {
    dialogTitle: "Edit Users",
    dialogDescription: "",
    applyButtonText: "Update",
    cancelButtonText: "Cancel",
    readonly: false,
  },
   
  [EdituserServerDialogMode.ResetPasswordServer]: {
    dialogTitle: "Reset Password",
    dialogDescription: "",
    applyButtonText: "Reset",
    cancelButtonText: "Cancel",
    readonly: false,
  },

  [EdituserServerDialogMode.RemoveuserServer]: {
    dialogTitle: "Delete Users",
    dialogDescription: "",
    applyButtonText: "Delete",
    cancelButtonText: "Cancel",
    readonly: true,
  },
};

type EdituserServerDialogComponentProps = Connect<undefined, typeof mapDispatch> & {
  mode: EdituserServerDialogMode;
  userServer: userServer;
  onClose: () => void;
};

const urlRegex = RegExp("^https?://");

type EdituserServerDialogComponentState = userServer & { errorMessage: string[];availableRoles: string[]; selectedRoles: string[]; mappedRoles: string[];maproleid: string[]; avlroleid: string[]; roleIdAndRole: any[] ; AvailableroleIdAndRole:any[], edittype:String};

class EdituserServerDialogComponent extends React.Component<EdituserServerDialogComponentProps, EdituserServerDialogComponentState> {
  constructor(props: EdituserServerDialogComponentProps) {
    super(props);

    this.state = {
      ...this.props.userServer,
      errorMessage: [],
      availableRoles: [], 
      selectedRoles: [],
      mappedRoles: [],
      maproleid: [],
      avlroleid: [],
      roleIdAndRole:[],
      AvailableroleIdAndRole:[],
      edittype:""
    };
  }

  moveToMappedRoles = () => {
    const { selectedRoles } = this.state;
    if (selectedRoles.length > 0) {
      const newAvailableRoles = this.state.roleIdAndRole.filter(role => selectedRoles.includes(role.name));
      
      const newMappedRoles = [...this.state.mappedRoles, ...selectedRoles];
      const newAvlRoleIds = this.state.avlroleid.filter((_, index) => !selectedRoles.includes(this.state.availableRoles[index]));
      const newMapRoleIds = [...this.state.maproleid];
      selectedRoles.forEach(role => {
        const index = this.state.availableRoles.findIndex(r => r === role);
        if (index !== -1) {
          newMapRoleIds.push(this.state.avlroleid[index]);
        }
      });
      this.setState({
        availableRoles: newAvailableRoles,
        mappedRoles: newMappedRoles,
        selectedRoles: [], // Clear selected roles after moving them
        maproleid: newMapRoleIds,
        avlroleid: newAvlRoleIds,
        edittype: "mapped"
      });
    }
  };
  
  moveToAvailableRoles = () => {
    const { selectedRoles } = this.state;
    if (selectedRoles.length > 0) {
      const newMappedRoles = this.state.AvailableroleIdAndRole.filter(role => selectedRoles.includes(role.name));
      const newAvailableRoles = [...this.state.availableRoles, ...selectedRoles];
      const newMappedRoleIds = this.state.maproleid.filter((_, index) => !selectedRoles.includes(this.state.mappedRoles[index]));
      const newAvlRoleIds = [...this.state.avlroleid];
      selectedRoles.forEach(role => {
        const index = this.state.mappedRoles.findIndex(r => r === role);
        if (index !== -1) {
          newAvlRoleIds.push(this.state.maproleid[index]);
        }
      });
      this.setState({
        availableRoles: newAvailableRoles,
        mappedRoles: newMappedRoles,
        selectedRoles: [], // Clear selected roles after moving them
        avlroleid: newAvlRoleIds,
        maproleid: newMappedRoleIds,
        edittype: "available"
      });
    }
  };




  areFieldsValid = () => {
    return this.state.username.trim().length > 0 &&
    this.state.password === this.state.confirmPassword
  }

  createErrorMessages = () => {

    let messages = [];
    if (this.state.username.trim().length === 0) {
      messages.push("The User name and the url must not be empty.")
    }
    if (this.state.password !== this.state.confirmPassword) {
      messages.push("Password and Confirm Password don't match.");
    }
   
        // if (!urlRegex.test(this.state.url)) {
    //   if (messages.length > 0) {
    //     return messages.concat(["The server url must start with 'http(s)://'."])
    //   } else {
    //     return ["The server url must start with 'http(s)://'."]
    //   }
    // }

    return messages;
  }
  arePassword = () => {
    return this.state.username.trim().length > 0;
  }



  render(): JSX.Element {
    const setting = settings[this.props.mode];
    return (
      <Dialog open={this.props.mode !== EdituserServerDialogMode.None}>
        <DialogTitle id="form-dialog-title">{setting.dialogTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {setting.dialogDescription}
          </DialogContentText>
          {/* <TextField disabled spellCheck={false} autoFocus margin="dense" id="id" label="Id" type="text" fullWidth value={ this.state._id } onChange={(event)=>{ this.setState({_id: event.target.value}); } } /> */}
          {/* <TextField variant="standard" disabled={setting.readonly} spellCheck={false} margin="dense" id="ID" label="ID.." type="text" fullWidth value={this.state.id} onChange={(event) => { this.setState({ id: event.target.value }); }} /> */}
          <TextField variant="standard" disabled={this.props.mode === EdituserServerDialogMode.ResetPasswordServer || this.props.mode === EdituserServerDialogMode.EdituserServer || this.props.mode === EdituserServerDialogMode.RemoveuserServer} spellCheck={false} margin="dense" id="username" label="User Name" type="text" fullWidth value={this.state.username} onChange={(event) => { this.setState({ username: event.target.value }); }} />
          {!setting.readonly && this.props.mode !== EdituserServerDialogMode.ResetPasswordServer  && (
          <TextField variant="standard"  spellCheck={false} margin="dense" id="firstName" label="First Name" type="text" fullWidth value={this.state.firstName} onChange={(event) => { this.setState({ firstName: event.target.value }); }} /> 
          )}
          {!setting.readonly && this.props.mode !== EdituserServerDialogMode.ResetPasswordServer && (
          <TextField variant="standard"  spellCheck={false} margin="dense" id="lastName" label="Last Name" type="text" fullWidth value={this.state.lastName} onChange={(event) => { this.setState({ lastName: event.target.value }); }} />
          )}
          {!setting.readonly && this.props.mode !== EdituserServerDialogMode.ResetPasswordServer && (
          <TextField variant="standard"  spellCheck={false} margin="dense" id="email" label="Email" type="email" fullWidth value={this.state.email} onChange={(event) => { this.setState({ email: event.target.value }); }} />
          )}
          {!setting.readonly && this.props.mode !== EdituserServerDialogMode.RemoveuserServer && this.props.mode !== EdituserServerDialogMode.EdituserServer && (
          <TextField variant="standard" disabled={setting.readonly} spellCheck={false} margin="dense" id="password" label="password" type="password" fullWidth value={this.state.password} onChange={(event) => { this.setState({ password: event.target.value }); }} />
          )}
          {!setting.readonly && this.props.mode !== EdituserServerDialogMode.RemoveuserServer && this.props.mode !== EdituserServerDialogMode.EdituserServer && (
          <TextField variant="standard" disabled={setting.readonly} spellCheck={false} margin="dense" id="confirmPassword" label="confirmPassword" type="password" fullWidth value={this.state.confirmPassword} onChange={(event) => { this.setState({ confirmPassword: event.target.value }); }} />
          )}
          {/*this.props.mode === EdituserServerDialogMode.ResetPasswordServer && (
          <TextField variant="standard" disabled={setting.readonly} spellCheck={false} margin="dense" id="newPassword" label="newpassword" type="password" fullWidth value={this.state.newPassword} onChange={(event) => { this.setState({ newPassword: event.target.value }); }} />
          )*/} 
          {/* Available Roles */}
          
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* Left side: Available Roles */}
        <FormControl style={{ width: '42%' }}>
  <InputLabel id="available-roles-label">Available Roles</InputLabel>
  <Select
    labelId="available-roles-label"
    id="available-roles-select"
    multiple
    value={this.state.selectedRoles}
    onChange={(event) => { this.setState({ selectedRoles: event.target.value as string[] }) }}
    fullWidth
    renderValue={(selected) => (
      <div>
        {selected.map((role: string) => (
          <div key={role}>{role}</div>
        ))}
      </div>
    )}
  >
    {this.state.roleIdAndRole.map((role: any) => (
      <MenuItem key={role} value={role.name}>
        {role.name}
      </MenuItem>
    ))}
  </Select>
</FormControl>

 
<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginTop: '11px' }}>
  <Button onClick={this.moveToMappedRoles} style={{ backgroundColor: 'green', color: 'white', marginBottom: '10px' }}>&gt;</Button>
  <Button onClick={this.moveToAvailableRoles} style={{ backgroundColor: 'green', color: 'white' }}>&lt;</Button>
</div>


<FormControl style={{ width: '42%' }}>
  <InputLabel id="mapped-roles-label">Mapped Roles</InputLabel>
  <Select
    labelId="mapped-roles-label"
    id="mapped-roles-select"
    multiple
    value={this.state.selectedRoles}
    onChange={(event) => { this.setState({ selectedRoles: event.target.value as string[] }) }}
    fullWidth
    renderValue={(selected) => (
      <div>
        {selected.map((role: string) => (
          <div key={role}>{role}</div>
        ))}
      </div>
    )}
  >
    {this.state.mappedRoles.map((role: string) => (
      <MenuItem key={role} value={role}>
        {role}
      </MenuItem>
    ))}
  </Select>
</FormControl>
      </div>
      
      {/* Error messages */}

          <Typography id="errorMessage" component={"div"} color="error">{this.state.errorMessage.map((error, index) => <div key={index}>{error}</div>)}</Typography>

        </DialogContent>
        <DialogActions>
          <Button onClick={(event: { preventDefault: () => void; stopPropagation: () => void; }) => {

            if (this.areFieldsValid()) {
              this.setState({ errorMessage: [] });
              this.onApply({
                id: this.state.id,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                email: this.state.email,
                username: this.state.username,
                password: this.state.password,
                confirmPassword: this.state.confirmPassword,
                mappedRoles: this.state.mappedRoles,
                mappedGroups: this.state.mappedGroups,
                availableRoles: this.state.availableRoles,
                maproleid: this.state.maproleid,
                avlroleid: this.state.avlroleid,
                edittype:this.state.edittype
               // newPassword: this.state.newPassword
                
              } );
              
              
            }  else {
              const errorMessage = this.createErrorMessages()
              this.setState({ errorMessage: errorMessage })
            }

             
             
            

            event.preventDefault();
            event.stopPropagation();
          }} color="inherit" > {setting.applyButtonText} </Button>
          <Button onClick={(event: { preventDefault: () => void; stopPropagation: () => void; }) => {
            this.onCancel();
            this.setState({ errorMessage: [] });
            event.preventDefault();
            event.stopPropagation();
          }} color="secondary"> {setting.cancelButtonText} </Button>
        </DialogActions>
      </Dialog>
    )
  }

  private onApply = (element: userServer) => {

    this.props.onClose && this.props.onClose();
    switch (this.props.mode) {
      case EdituserServerDialogMode.AdduserServer:
        element && this.props.adduserServer(element);
        break;
      case EdituserServerDialogMode.EdituserServer:
        element && this.props.updateuserServer(element);
        break;

      case EdituserServerDialogMode.ResetPasswordServer:
          element && this.props.resetpasswordServer(element);
          break;
    
      case EdituserServerDialogMode.RemoveuserServer:
        element && this.props.removeuserServer(element);
        break;
    }
  };

  private onCancel = () => {
    this.props.onClose && this.props.onClose();
  }

  static getDerivedStateFromProps(props: EdituserServerDialogComponentProps, state: EdituserServerDialogComponentState & { _initialuserServer: userServer }): EdituserServerDialogComponentState & { _initialuserServer: userServer } {
    if (props.userServer !== state._initialuserServer) {
      state = {
        ...state,
        ...props.userServer,
        _initialuserServer: props.userServer,
      };
    }
    return state;
  }
}

export const EdituserServerDialog = connect(undefined, mapDispatch)(EdituserServerDialogComponent);
export default EdituserServerDialog;