"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
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
var action_1 = require("../flux/action");
var errorActions_1 = require("../actions/errorActions");
var baseUrl = "" + window.location.origin + window.location.pathname;
var ApiAction = /** @class */ (function (_super) {
    __extends(ApiAction, _super);
    function ApiAction(endpoint, successAction, authenticate) {
        if (authenticate === void 0) { authenticate = false; }
        var _this = _super.call(this) || this;
        _this.endpoint = endpoint;
        _this.successAction = successAction;
        _this.authenticate = authenticate;
        return _this;
    }
    return ApiAction;
}(action_1.Action));
exports.ApiAction = ApiAction;
exports.apiMiddleware = function (store) { return function (next) { return function (action) {
    // So the middleware doesn't get applied to every single action
    if (action instanceof ApiAction) {
        var user = store && store.getState().framework.authenticationState.user;
        var token = user && user.token || null;
        var config = { headers: {} };
        if (action.authenticate) {
            if (token) {
                config = __assign(__assign({}, config), { headers: __assign(__assign({}, config.headers), { 
                        // 'Authorization': `Bearer ${ token }`
                        authorization: "Basic YWRtaW46YWRtaW4=" }) });
            }
            else {
                return next(new errorActions_1.AddErrorInfoAction({ message: 'Please login to continue.' }));
            }
        }
        fetch(baseUrl + action.endpoint.replace(/\/{2,}/, '/'), config)
            .then(function (response) {
            return response.json().then(function (data) { return ({ data: data, response: response }); });
        })
            .then(function (result) {
            next(new action.successAction(result.data));
        })["catch"](function (error) {
            next(new errorActions_1.AddErrorInfoAction((error instanceof Error) ? { error: error } : { message: error.toString() }));
        });
    }
    // let all actions pass
    return next(action);
}; }; };
exports["default"] = exports.apiMiddleware;
