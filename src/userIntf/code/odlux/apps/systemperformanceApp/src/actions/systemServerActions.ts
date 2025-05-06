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
import { Action } from '../../../../framework/src/flux/action';
import { Dispatch } from '../../../../framework/src/flux/store';
import systemService from '../services/systemService';
import { AddSnackbarNotification } from '../../../../framework/src/actions/snackbarActions';
import { NavigateToApplication } from '../../../../framework/src/actions/navigationActions';
import { IApplicationStoreState } from '../../../../framework/src/store/applicationStore';

/** Represents the base action. */
export class BaseAction extends Action { }

export class SetsystemServerBusy extends BaseAction {
  constructor(public isBusy: boolean) {
    super();
  }
}

export class SetsystemServerInfo extends BaseAction {
  /**
   * Initializes a new instance of this class.
   */
  // constructor(public container_name: string | null, public cpu_utilization: string | null,public memory_limit: string | null,public file_descriptor_count: string | null,public memory_percentage: string | null,public memory_usage: string | null,public time: string | null) {
  //   super();
  // }
  constructor(public historyData: any ) {
    super();
  }
}

export const initializesystemServerAsyncActionCreator = (container_name: string) => (dispatch: Dispatch) => {
  dispatch(new SetsystemServerBusy(true));
  systemService.getsysytemServerById(container_name).then(histiryData => {
    if (!histiryData) {
      dispatch(new SetsystemServerBusy(false));
      dispatch(new AddSnackbarNotification({ message: `Error loading systemperformanceApp  [${container_name}]`, options: { variant: 'error' } }));
      //dispatch(new NavigateToApplication("systemperformance"));
      return;
    }
    dispatch(new SetsystemServerInfo(histiryData));
  });

  

  // systemService.getsysytemHistoryById(container_name).then(systemHistory => {
  //   if (!systemHistory) {
  //     dispatch(new SetsystemServerBusy(false));
  //     dispatch(new AddSnackbarNotification({ message: `Error loading systemperformanceApp  [${container_name}]`, options: { variant: 'error' } }));
  //     dispatch(new NavigateToApplication("systemHistory"));
  //     return;
  //   }
  //   dispatch(new SetsystemServerInfo(systemHistory.container_name, systemHistory.cpu_utilization,systemHistory.memory_limit,systemHistory.file_descriptor_count,systemHistory.memory_percentage,systemHistory.memory_usage,systemHistory.time));
  // });
};

