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
// main state handler
exports.__esModule = true;
var middleware_1 = require("../../../../framework/src/flux/middleware");
var panelChangeActions_1 = require("../actions/panelChangeActions");
var alarmLogEntriesHandler_1 = require("./alarmLogEntriesHandler");
var currentAlarmsHandler_1 = require("./currentAlarmsHandler");
var faultStatusHandler_1 = require("./faultStatusHandler");
var notificationsHandler_1 = require("./notificationsHandler");
var currentOpenPanelHandler = function (state, action) {
    if (state === void 0) { state = null; }
    if (action instanceof panelChangeActions_1.SetPanelAction) {
        state = action.panelId;
    }
    return state;
};
var actionHandlers = {
    currentAlarms: currentAlarmsHandler_1.currentAlarmsActionHandler,
    faultNotifications: notificationsHandler_1.faultNotificationsHandler,
    alarmLogEntries: alarmLogEntriesHandler_1.alarmLogEntriesActionHandler,
    currentOpenPanel: currentOpenPanelHandler,
    faultStatus: faultStatusHandler_1.faultStatusHandler
};
exports.faultAppRootHandler = middleware_1.combineActionHandler(actionHandlers);
exports["default"] = exports.faultAppRootHandler;
