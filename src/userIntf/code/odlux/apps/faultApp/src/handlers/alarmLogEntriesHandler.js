"use strict";
var _a;
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
var utilities_1 = require("../../../../framework/src/components/material-table/utilities");
var elasticSearch_1 = require("../../../../framework/src/utilities/elasticSearch");
// create eleactic search data fetch handler
var alarmLogEntriesSearchHandler = elasticSearch_1.createSearchDataHandler('faultlog');
exports.alarmLogEntriesActionHandler = (_a = utilities_1.createExternal(alarmLogEntriesSearchHandler, function (appState) { return appState.fault.alarmLogEntries; }), _a.actionHandler), exports.createAlarmLogEntriesActions = _a.createActions, exports.createAlarmLogEntriesProperties = _a.createProperties, exports.alarmLogEntriesReloadAction = _a.reloadAction;
