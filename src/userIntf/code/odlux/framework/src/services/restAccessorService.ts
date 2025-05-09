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
import * as $ from 'jquery'; 
import { Action, IActionHandler } from '../flux/action';
import { MiddlewareArg } from '../flux/middleware';
import { Dispatch } from '../flux/store';

import { IApplicationStoreState } from '../store/applicationStore';
import { AddErrorInfoAction, ErrorInfo } from '../actions/errorActions';
import { PlainObject, AjaxParameter } from 'models/restService';

export const absoluteUri = /^(https?:\/\/|blob:)/i;
export const baseUrl = `${ window.location.origin }${ window.location.pathname }`;

class RestBaseAction extends Action { }

export const createRestApiAccessor = <TResult extends PlainObject>(urlOrPath: string, initialValue: TResult) => {
  const isLocalRequest = !absoluteUri.test(urlOrPath);
  const uri = isLocalRequest ? `${ baseUrl }/${ urlOrPath }`.replace(/\/{2,}/, '/') : urlOrPath ;
 
  class RestRequestAction extends RestBaseAction { constructor(public settings?: AjaxParameter) { super(); } }

  class RestResponseAction extends RestBaseAction { constructor(public result: TResult) { super(); } }

  class RestErrorAction extends RestBaseAction { constructor(public error?: Error | string) { super(); } }
  
  type RestAction = RestRequestAction | RestResponseAction | RestErrorAction;

  /** Represents our middleware to handle rest backend requests */
  const restMiddleware = (api: MiddlewareArg<IApplicationStoreState>) =>
    (next: Dispatch) => (action: RestAction): RestAction => {
      
      // pass all actions through by default
      next(action);
      // handle the RestRequestAction
      if (action instanceof RestRequestAction) {
        const state = api.getState();
        const authHeader = isLocalRequest && state && state.framework.authenticationState.user && state.framework.authenticationState.user.token
          ? { "Authentication": "Bearer " + state.framework.authenticationState.user.token } : { };
        $.ajax({
          url: uri,
          method: (action.settings && action.settings.method) || "GET",
          headers: { ...authHeader, ...(action.settings && action.settings.headers ? action.settings.headers : { }) },
        }).then((data: TResult) => {
           next(new RestResponseAction(data));
        }).catch((err: any) => {
          next(new RestErrorAction());
          next(new AddErrorInfoAction((err instanceof Error) ? { error: err } : { message: err.toString() }));
        });
      }
      // allways return action
      return action;
  };
  
  /** Represents our action handler to handle our actions */
  const restActionHandler: IActionHandler<TResult> = (state = initialValue, action) => {
    if (action instanceof RestRequestAction) {
      return {
        ...(state as any),
        busy: true
      };
    } else if (action instanceof RestResponseAction) {
      return action.result;
    } else if (action instanceof RestErrorAction) {
      return initialValue;
    }
    return state;
  };

  return {
    requestAction: RestRequestAction,
    actionHandler: restActionHandler,
    middleware: restMiddleware,
  };
}



