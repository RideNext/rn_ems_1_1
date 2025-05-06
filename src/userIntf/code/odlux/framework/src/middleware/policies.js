"use strict";
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
exports.__esModule = true;
var authenticationService_1 = require("../services/authenticationService");
var authentication_1 = require("../actions/authentication");
function updatePoliciesMiddleware() {
    return function (_a) {
        var dispatch = _a.dispatch, getState = _a.getState;
        return function (next) {
            return function (action) {
                var enablePolicy = (getState() || { framework: { applicationState: {} } }).framework.applicationState.enablePolicy;
                if (enablePolicy && action instanceof authentication_1.UpdateUser) {
                    next(action);
                    authenticationService_1["default"].getAccessPolicies().then(function (policies) { return dispatch(new authentication_1.UpdatePolicies(policies || undefined)); });
                    return action;
                }
                if (enablePolicy === false)
                    next(new authentication_1.UpdatePolicies());
                return next(action);
            };
        };
    };
}
exports.updatePolicies = updatePoliciesMiddleware();
exports["default"] = exports.updatePolicies;
