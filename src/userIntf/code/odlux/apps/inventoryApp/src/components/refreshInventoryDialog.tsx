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

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { connect, Connect, IDispatcher } from '../../../../framework/src/flux/connect';
import { inventoryElementsReloadAction } from '../handlers/inventoryElementsHandler';

import { InventoryType } from '../models/inventory';

export enum RefreshInventoryDialogMode {
  None = 'none',
  RefreshInventoryTable = 'RefreshInventoryTable',
}

const mapDispatch = (dispatcher: IDispatcher) => ({
  refreshInventory: () => dispatcher.dispatch(inventoryElementsReloadAction),
});

type DialogSettings = {
  dialogTitle: string;
  dialogDescription: string;
  applyButtonText: string;
  cancelButtonText: string;
  enableMountIdEditor: boolean;
  enableUsernameEditor: boolean;
  enableExtendedEditor: boolean;
};

const settings: { [key: string]: DialogSettings } = {
  [RefreshInventoryDialogMode.None]: {
    dialogTitle: '',
    dialogDescription: '',
    applyButtonText: '',
    cancelButtonText: '',
    enableMountIdEditor: false,
    enableUsernameEditor: false,
    enableExtendedEditor: false,
  },
  [RefreshInventoryDialogMode.RefreshInventoryTable]: {
    dialogTitle: 'Do you want to refresh the Inventory table?',
    dialogDescription: '',
    applyButtonText: 'Yes',
    cancelButtonText: 'Cancel',
    enableMountIdEditor: true,
    enableUsernameEditor: true,
    enableExtendedEditor: true,
  },
};

type RefreshInventoryDialogComponentProps = Connect<undefined, typeof mapDispatch> & {
  mode: RefreshInventoryDialogMode;
  onClose: () => void;
};

type RefreshInventoryDialogComponentState = InventoryType & { isNameValid: boolean; isHostSet: boolean };

class RefreshInventoryDialogComponent extends React.Component<RefreshInventoryDialogComponentProps, RefreshInventoryDialogComponentState> {
  render(): JSX.Element {
    const setting = settings[this.props.mode];
    return (
      <Dialog open={this.props.mode !== RefreshInventoryDialogMode.None}>
        <DialogTitle id="form-dialog-title" aria-label={`${setting.dialogTitle.replace(/ /g, '-').toLowerCase()}-dialog`}>{setting.dialogTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {setting.dialogDescription}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button aria-label="dialog-confirm-button" onClick={() => {
            this.onRefresh();
          }} color="inherit" > {setting.applyButtonText} </Button>
          <Button aria-label="dialog-cancel-button" onClick={() => {
            this.onCancel();
          }} color="secondary"> {setting.cancelButtonText} </Button>
        </DialogActions>
      </Dialog>
    );
  }

  private onRefresh = () => {
    this.props.refreshInventory();
    this.props.onClose();
  };

  private onCancel = () => {
    this.props.onClose();
  };
}

export const RefreshInventoryDialog = connect(undefined, mapDispatch)(RefreshInventoryDialogComponent);
export default RefreshInventoryDialog;