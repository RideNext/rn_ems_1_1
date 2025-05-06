"use strict";
/**
 * ============LICENSE_START========================================================================
 * ONAP : ccsdk feature sdnr wt odlux
 * =================================================================================================
 * Copyright (C) 2021 highstreet technologies GmbH Intellectual Property. All rights reserved.
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
var settingsAction_1 = require("../actions/settingsAction");
var authentication_1 = require("../actions/authentication");
var navigationActions_1 = require("../actions/navigationActions");
var authentication_2 = require("../models/authentication");
var channels = [];
var store = null;
exports.saveChannel = function (channel, channelName) {
    channels.push({ channel: channel, key: channelName });
};
var createSettingsBroadcastChannel = function () {
    var name = 'odlux_settings';
    var bc = new BroadcastChannel(name);
    channels.push({ channel: bc, key: name });
    bc.onmessage = function (eventMessage) {
        console.log(eventMessage);
        if (eventMessage.data.key === 'general') {
            if (store === null || store === void 0 ? void 0 : store.state.framework.authenticationState.user) {
                var data = eventMessage.data;
                if (store.state.framework.authenticationState.user.user === data.user) {
                    store === null || store === void 0 ? void 0 : store.dispatch(settingsAction_1.setGeneralSettingsAction(data.enableNotifications));
                }
            }
        }
    };
};
var createAuthBroadcastChannel = function () {
    var name = 'odlux_auth';
    var bc = new BroadcastChannel(name);
    channels.push({ channel: bc, key: name });
    bc.onmessage = function (eventMessage) {
        console.log(eventMessage);
        if (eventMessage.data.key === 'login') {
            if (!(store === null || store === void 0 ? void 0 : store.state.framework.authenticationState.user)) {
                var initialToken = localStorage.getItem('userToken');
                if (initialToken) {
                    store === null || store === void 0 ? void 0 : store.dispatch(authentication_1.loginUserAction(authentication_2.User.fromString(initialToken)));
                    store === null || store === void 0 ? void 0 : store.dispatch(new navigationActions_1.ReplaceAction('/'));
                }
            }
        }
        else if (eventMessage.data.key === 'logout') {
            if (store === null || store === void 0 ? void 0 : store.state.framework.authenticationState.user) {
                store === null || store === void 0 ? void 0 : store.dispatch(authentication_1.logoutUser());
                store === null || store === void 0 ? void 0 : store.dispatch(new navigationActions_1.ReplaceAction('/login'));
            }
        }
    };
};
exports.startBroadcastChannel = function (applicationStore) {
    store = applicationStore;
    // might decide to use one general broadcast channel with more keys in the future
    createAuthBroadcastChannel();
    createSettingsBroadcastChannel();
};
exports.getBroadcastChannel = function (channelName) {
    var foundChannel = channels.find(function (s) { return s.key === channelName; });
    return foundChannel === null || foundChannel === void 0 ? void 0 : foundChannel.channel;
};
exports.sendMessage = function (data, channel) {
    var foundChannel = channels.find(function (s) { return s.key === channel; });
    if (foundChannel) {
        foundChannel.channel.postMessage(data);
    }
};
