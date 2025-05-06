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
import * as React from "react";
import {
  IDispatcher,
  connect,
  Connect,
} from "../../../../framework/src/flux/connect";
import {
  addAvaliablesoftwaremanagementServerAsyncActionCreator,
  removeAvaliablesoftwaremanagementServerAsyncActionCreator,
  updateAvaliablesoftwaremanagementServerAsyncActionCreator
} from "../actions/avaliableSoftwareManagementServersActions";

import { softwareManagementData } from "../models/SoftwareManagementServer";
import { FormControl, InputLabel, Typography } from "@mui/material";
import SoftwaremanagementService from "../services/SoftwareManagementService";

const baseUri = `${window.location.origin}`;
//const MyCheckbox = <Checkbox />;

export enum EditsoftwaremanagementServerDialogMode {
  None = "none",
}

const mapDispatch = (dispatcher: IDispatcher) => ({
  addsoftwaremanagementServer: (element: softwareManagementData) => {
    dispatcher.dispatch(
      addAvaliablesoftwaremanagementServerAsyncActionCreator(element)
    );
  },
  updatesoftwaremanagementServer: (element: softwareManagementData) => {
    dispatcher.dispatch(
      updateAvaliablesoftwaremanagementServerAsyncActionCreator(element)
    );
  },
  removesoftwaremanagementServer: (element: softwareManagementData) => {
    dispatcher.dispatch(
      removeAvaliablesoftwaremanagementServerAsyncActionCreator(element)
    );
  }
});


type EditsoftwaremanagementServerDialogComponentProps = Connect<
  undefined,
  typeof mapDispatch
> & {
  mode: EditsoftwaremanagementServerDialogMode;
  softwaremanagement: softwareManagementData;
  onClose: () => void;
  rowdata: softwareManagementData;
};

const urlRegex = RegExp("^https?://");

type EditsoftwaremanagementServerDialogComponentState = softwareManagementData & {
  
};

class EditsoftwaremanagementServerDialogComponent extends React.Component<
  EditsoftwaremanagementServerDialogComponentProps,
  EditsoftwaremanagementServerDialogComponentState
> {
  constructor(props: EditsoftwaremanagementServerDialogComponentProps) {
    super(props);

    this.state = {
      id:0,
      deviceType:"",
      sectorID:"",
      Slot:"",
      Event:"",
      Status: "",
      Error:"",
      TimeStamp:"",
      Result:""
    };
    
  }
  
  componentDidUpdate(prevProps: EditsoftwaremanagementServerDialogComponentProps) {
    if (prevProps.rowdata !== this.props.rowdata) {
     
    }
  }

  render(): JSX.Element {
    
    //const isFieldsValid = this.areFieldsValid();

    return (
      <div></div>
    );
  }



  static getDerivedStateFromProps(
    props: EditsoftwaremanagementServerDialogComponentProps,
    state: EditsoftwaremanagementServerDialogComponentState & {
      _initialsoftwaremanagementServer: softwareManagementData;
    }
  ): EditsoftwaremanagementServerDialogComponentState & {
    _initialsoftwaremanagementServer: softwareManagementData;
  } {
    if (props.softwaremanagement !== state._initialsoftwaremanagementServer) {
      state = {
        ...state,
        ...props.softwaremanagement,
        _initialsoftwaremanagementServer: props.softwaremanagement,
      };
    }
    return state;
  }
}

export const EditsoftwaremanagementServerDialog = connect(
  undefined,
  mapDispatch
)(EditsoftwaremanagementServerDialogComponent);
export default EditsoftwaremanagementServerDialog;
