"use strict";
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
var jwt = require("jsonwebtoken");
var history_1 = require("history");
var authentication_1 = require("../models/authentication");
var navigationActions_1 = require("../actions/navigationActions");
var navigationActions_2 = require("../actions/navigationActions");
var applicationManager_1 = require("../services/applicationManager");
var authentication_2 = require("../actions/authentication");
exports.history = history_1.createHashHistory();
var applicationStore = null;
var routerMiddlewareCreator = function (historyParam) { return function () { return function (next) { return function (action) {
    if (action instanceof navigationActions_1.NavigateToApplication) {
        var application = applicationManager_1.applicationManager.applications && applicationManager_1.applicationManager.applications[action.applicationName];
        if (application) {
            var href = ("/" + (application.path || application.name) + (action.href ? '/' + action.href : '')).replace(/\/{2,}/i, '/');
            if (action.replace) {
                historyParam.replace(href, action.state);
            }
            else {
                historyParam.push(href, action.state);
            }
        }
    }
    else if (action instanceof navigationActions_2.PushAction) {
        historyParam.push(action.href, action.state);
    }
    else if (action instanceof navigationActions_2.ReplaceAction) {
        historyParam.replace(action.href, action.state);
    }
    else if (action instanceof navigationActions_2.GoAction) {
        historyParam.go(action.index);
    }
    else if (action instanceof navigationActions_2.GoBackAction) {
        historyParam.goBack();
    }
    else if (action instanceof navigationActions_2.GoForwardeAction) {
        historyParam.goForward();
    }
    else if (action instanceof navigationActions_1.LocationChanged) {
        // ensure user is logged in and token is valid
        if (action.pathname.startsWith('/oauth') && (action.search.startsWith('?token='))) {
            var ind = action.search.lastIndexOf('token=');
            var tokenStr = ind > -1 ? action.search.substring(ind + 6) : null;
            var token = tokenStr && jwt.decode(tokenStr);
            if (tokenStr && token) {
                // @ts-ignore
                var user = new authentication_1.User({ username: token.name, access_token: tokenStr, token_type: 'Bearer', expires: token.exp, issued: token.iat }) || undefined;
                applicationStore === null || applicationStore === void 0 ? void 0 : applicationStore.dispatch(authentication_2.loginUserAction(user));
            }
        }
        if (!action.pathname.startsWith('/login') && applicationStore && (!applicationStore.state.framework.authenticationState.user || !applicationStore.state.framework.authenticationState.user.isValid)) {
            historyParam.replace("/login?returnTo=" + action.pathname);
            applicationStore.dispatch(authentication_2.logoutUser());
        }
        else if (action.pathname.startsWith('/login') && applicationStore && (applicationStore.state.framework.authenticationState.user && applicationStore.state.framework.authenticationState.user.isValid)) {
            historyParam.replace('/');
        }
        else {
            return next(action);
        }
    }
    else {
        return next(action);
    }
    return action;
}; }; }; };
var startListener = function (historyParam, store) {
    store.dispatch(new navigationActions_1.LocationChanged(historyParam.location.pathname, historyParam.location.search, historyParam.location.hash));
    historyParam.listen(function (location) {
        store.dispatch(new navigationActions_1.LocationChanged(location.pathname, location.search, location.hash));
    });
};
exports.startHistoryListener = function (store) {
    applicationStore = store;
    startListener(exports.history, store);
};
exports.routerMiddleware = routerMiddlewareCreator(exports.history);
exports["default"] = exports.routerMiddleware;
