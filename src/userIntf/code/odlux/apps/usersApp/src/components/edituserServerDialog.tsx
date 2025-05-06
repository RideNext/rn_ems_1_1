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
import { Typography } from '@mui/material';

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
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regex for email validation

type EdituserServerDialogComponentState = userServer & { errorMessage: string[] };

class EdituserServerDialogComponent extends React.Component<EdituserServerDialogComponentProps, EdituserServerDialogComponentState> {
  constructor(props: EdituserServerDialogComponentProps) {
    super(props);

    this.state = {
      ...this.props.userServer,
      errorMessage: []
    };
  }

  areFieldsValid = () => {
    // Check if all required fields are valid
    return (
      this.state.username.trim().length > 0 &&
      this.state.password === this.state.confirmPassword &&
      emailRegex.test(this.state.email) // Ensure email matches the regex pattern
    );
  }

  createErrorMessages = () => {

    let messages = [];
    if (this.state.username.trim().length === 0) {
      messages.push("The User name and the url must not be empty.")
    }
    if (this.state.password !== this.state.confirmPassword) {
      messages.push("Password and Confirm Password don't match.");
    }
    if (!emailRegex.test(this.state.email)) {
      messages.push("Please enter a valid email address.");
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
        <DialogTitle id="form-dialog-title"style={{backgroundColor: '#6a7baf',border: '0px solid #ccc', borderRadius: '3px',padding: 0,paddingLeft: '24px'}}>{setting.dialogTitle}</DialogTitle>
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
          <TextField variant="standard"  spellCheck={false} margin="dense" id="email" label="Email" type="Email" fullWidth value={this.state.email} onChange={(event) => { this.setState({ email: event.target.value }); }} />
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
          <Typography id="errorMessage" component={"div"} color="error">{this.state.errorMessage.map((error, index) => <div key={index}>{error}</div>)}</Typography>

        </DialogContent>
        <DialogActions>
          <Button onClick={(event) => {

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
               // newPassword: this.state.newPassword
                
              } );
              
              
            }  else {
              const errorMessage = this.createErrorMessages()
              this.setState({ errorMessage: errorMessage })
            }

             
             
            

            event.preventDefault();
            event.stopPropagation();
          }} style={{ backgroundColor: 'white', color: 'blue', border: '1px solid blue', borderRadius: '1px', padding: '3px 6px' }} > {setting.applyButtonText} </Button>
          <Button onClick={(event) => {
            this.onCancel();
            this.setState({ errorMessage: [] });
            event.preventDefault();
            event.stopPropagation();
          }} style={{ backgroundColor: 'white', color: 'red', border: '1px solid red', borderRadius: '1px', padding: '3px 6px' }}> {setting.cancelButtonText}</Button>
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