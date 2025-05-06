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
var event_1 = require("../common/event");
var broadcastService_1 = require("./broadcastService");
var resolveApplicationStoreInitialized;
var applicationStore = null;
var applicationStoreInitialized = new Promise(function (resolve) { return resolveApplicationStoreInitialized = resolve; });
var loginEvent = new event_1.Event();
var logoutEvent = new event_1.Event();
var authChannelName = 'odlux_auth';
exports.onLogin = function () {
    var message = { key: 'login', data: {} };
    broadcastService_1.sendMessage(message, authChannelName);
    loginEvent.invoke();
};
exports.onLogout = function () {
    document.cookie = 'JSESSIONID=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    var message = { key: 'logout', data: {} };
    broadcastService_1.sendMessage(message, authChannelName);
    logoutEvent.invoke();
};
exports.setApplicationStore = function (store) {
    if (!applicationStore && store) {
        applicationStore = store;
        resolveApplicationStoreInitialized(store);
    }
};
exports.applicationApi = {
    get applicationStore() {
        return applicationStore;
    },
    get applicationStoreInitialized() {
        return applicationStoreInitialized;
    },
    get loginEvent() {
        return loginEvent;
    },
    get logoutEvent() {
        return logoutEvent;
    }
};
exports["default"] = exports.applicationApi;
