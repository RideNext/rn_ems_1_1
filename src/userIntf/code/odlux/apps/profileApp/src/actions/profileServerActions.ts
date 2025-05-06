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
import { Action } from '../../../../framework/src/flux/action';
import { Dispatch } from '../../../../framework/src/flux/store';
import profileService from '../services/profileService';
import { AddSnackbarNotification } from '../../../../framework/src/actions/snackbarActions';
import { NavigateToApplication } from '../../../../framework/src/actions/navigationActions';
import { IApplicationStoreState } from '../../../../framework/src/store/applicationStore';

/** Represents the base action. */
export class BaseAction extends Action { }

export class SetprofileServerBusy extends BaseAction {
  constructor(public isBusy: boolean) {
    super();
  }
}

export class SetprofileServerInfo extends BaseAction {
  /**
   * Initializes a new instance of this class.
   */
  constructor(public id: string | null, public name: string | null, public url: string | null) {
    super();

  }
}

export const initializeprofileServerAsyncActionCreator = (serverId: string) => (dispatch: Dispatch) => {
  dispatch(new SetprofileServerBusy(true));
  profileService.getprofileServerById(serverId).then(profileServer => {
    if (!profileServer) {
      dispatch(new SetprofileServerBusy(false));
      dispatch(new AddSnackbarNotification({ message: `Error loading profilesApp server [${serverId}]`, options: { variant: 'error' } }));
      dispatch(new NavigateToApplication("profiles"));
      return;
    }
    dispatch(new SetprofileServerInfo(profileServer.FileName, profileServer.PNFID, profileServer.FilePath));
  });
};

