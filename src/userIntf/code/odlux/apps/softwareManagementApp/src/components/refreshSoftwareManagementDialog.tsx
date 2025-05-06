
 /***
  * ################################################################################################
  * #                                                                                              #
  * #   Copyright (C)  [2019]  [RideNext Software Solutions Pvt Ltd]. All rights  reserved         #
  * #                                                                                              #
  * ################################################################################################
 ****/

import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { avaliablesoftwaremanagementServersReloadAction } from '../handlers/avaliableSoftwareManagementServersReloadAction';
import { IDispatcher, connect, Connect } from '../../../../framework/src/flux/connect';

import { softwareManagementData } from '../models/SoftwareManagementServer';

export enum RefreshsoftwaremanagementDialogMode {
  None = "none",
  RefreshsoftwaremanagementTable = "RefreshsoftwaremanagementTable",
}

const mapDispatch = (dispatcher: IDispatcher) => ({
  refreshsoftwaremanagement: () => dispatcher.dispatch(avaliablesoftwaremanagementServersReloadAction)
});

type DialogSettings = {
  dialogTitle: string,
  dialogDescription: string,
  applyButtonText: string,
  cancelButtonText: string,
  enableMountIdEditor: boolean,
  enableprofilenameEditor: boolean,
  enableExtendedEditor: boolean,
}

const settings: { [key: string]: DialogSettings } = {
  [RefreshsoftwaremanagementDialogMode.None]: {
    dialogTitle: "",
    dialogDescription: "",
    applyButtonText: "",
    cancelButtonText: "",
    enableMountIdEditor: false,
    enableprofilenameEditor: false,
    enableExtendedEditor: false,
  },
  [RefreshsoftwaremanagementDialogMode.RefreshsoftwaremanagementTable]: {
    dialogTitle: "Do you want to refresh the softwaremanagement table?",
    dialogDescription: "",
    applyButtonText: "Yes",
    cancelButtonText: "Cancel",
    enableMountIdEditor: true,
    enableprofilenameEditor: true,
    enableExtendedEditor: true,
  }
}

type RefreshsoftwaremanagementDialogComponentProps = Connect<undefined, typeof mapDispatch> & {
  mode: RefreshsoftwaremanagementDialogMode;
  onClose: () => void;
};

type RefreshsoftwaremanagementDialogComponentState = softwareManagementData & { isNameValid: boolean, isHostSet: boolean };

class RefreshsoftwaremanagementDialogComponent extends React.Component<RefreshsoftwaremanagementDialogComponentProps, RefreshsoftwaremanagementDialogComponentState> {
  constructor(props: RefreshsoftwaremanagementDialogComponentProps) {
    super(props);
  }

  render(): JSX.Element {
    const setting = settings[this.props.mode];
    return (
      <Dialog open={this.props.mode !== RefreshsoftwaremanagementDialogMode.None}>
        <DialogTitle id="form-dialog-title" aria-label={`${setting.dialogTitle.replace(/ /g, "-").toLowerCase()}-dialog`}>{setting.dialogTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {setting.dialogDescription}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button aria-label="dialog-confirm-button" onClick={(event) => {
            this.onRefresh();
          }} color="inherit" > {setting.applyButtonText} </Button>
          <Button aria-label="dialog-cancel-button" onClick={(event) => {
            this.onCancel();
          }} color="secondary"> {setting.cancelButtonText} </Button>
        </DialogActions>
      </Dialog>
    );
  }

  private onRefresh = () => {
    this.props.refreshsoftwaremanagement();
    this.props.onClose();
  };

  private onCancel = () => {
    this.props.onClose();
  }
}

export const RefreshsoftwaremanagementDialog = connect(undefined, mapDispatch)(RefreshsoftwaremanagementDialogComponent);
export default RefreshsoftwaremanagementDialog;
