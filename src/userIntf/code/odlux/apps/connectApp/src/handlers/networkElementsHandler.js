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
var restService_1 = require("../../../../framework/src/services/restService");
var elasticSearch_1 = require("../../../../framework/src/utilities/elasticSearch");
var connectService_1 = require("../services/connectService");
// create eleactic search material data fetch handler
var networkElementsSearchHandler = elasticSearch_1.createSearchDataHandler('network-element-connection');
exports.networkElementsActionHandler = (_a = utilities_1.createExternal(networkElementsSearchHandler, function (appState) {
    var webUris = appState.connect.guiCutThrough.searchedElements;
    // add weburi links, if element is connected & weburi available
    if (appState.connect.networkElements.rows && webUris.length > 0) {
        appState.connect.networkElements.rows.forEach(function (element) {
            if (element.status === 'Connected') {
                var webUri = webUris.find(function (item) { return item.id === element.id; });
                if (webUri) {
                    element.weburi = webUri.weburi;
                    element.isWebUriUnreachable = false;
                }
                else {
                    element.isWebUriUnreachable = true;
                }
            }
        });
    }
    return appState.connect.networkElements;
}, function (ne) {
    if (!ne || !ne.id)
        return true;
    var neUrl = connectService_1.connectService.getNetworkElementUri(ne.id);
    var policy = restService_1.getAccessPolicyByUrl(neUrl);
    return !(policy.GET || policy.POST);
}), _a.actionHandler), exports.createNetworkElementsActions = _a.createActions, exports.createNetworkElementsProperties = _a.createProperties, exports.networkElementsReloadAction = _a.reloadAction;
