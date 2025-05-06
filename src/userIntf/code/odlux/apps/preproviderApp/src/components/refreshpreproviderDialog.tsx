
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

import { avaliablepreproviderServersReloadAction } from '../handlers/avaliablepreproviderServersReloadAction';
import { IDispatcher, connect, Connect } from '../../../../framework/src/flux/connect';

import { providerdata } from '../models/preproviderServer';

export enum RefreshpreproviderDialogMode {
  None = "none",
  RefreshpreproviderTable = "RefreshpreproviderTable",
}

const mapDispatch = (dispatcher: IDispatcher) => ({
  refreshpreprovider: () => dispatcher.dispatch(avaliablepreproviderServersReloadAction)
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
  [RefreshpreproviderDialogMode.None]: {
    dialogTitle: "",
    dialogDescription: "",
    applyButtonText: "",
    cancelButtonText: "",
    enableMountIdEditor: false,
    enableprofilenameEditor: false,
    enableExtendedEditor: false,
  },
  [RefreshpreproviderDialogMode.RefreshpreproviderTable]: {
    dialogTitle: "Do you want to refresh the preprovider table?",
    dialogDescription: "",
    applyButtonText: "Yes",
    cancelButtonText: "Cancel",
    enableMountIdEditor: true,
    enableprofilenameEditor: true,
    enableExtendedEditor: true,
  }
}

type RefreshpreproviderDialogComponentProps = Connect<undefined, typeof mapDispatch> & {
  mode: RefreshpreproviderDialogMode;
  onClose: () => void;
};

type RefreshpreproviderDialogComponentState = providerdata & { isNameValid: boolean, isHostSet: boolean };

class RefreshpreproviderDialogComponent extends React.Component<RefreshpreproviderDialogComponentProps, RefreshpreproviderDialogComponentState> {
  constructor(props: RefreshpreproviderDialogComponentProps) {
    super(props);
  }

  render(): JSX.Element {
    const setting = settings[this.props.mode];
    return (
      <Dialog open={this.props.mode !== RefreshpreproviderDialogMode.None}>
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
    this.props.refreshpreprovider();
    this.props.onClose();
  };

  private onCancel = () => {
    this.props.onClose();
  }
}

export const RefreshpreproviderDialog = connect(undefined, mapDispatch)(RefreshpreproviderDialogComponent);
export default RefreshpreproviderDialog;
