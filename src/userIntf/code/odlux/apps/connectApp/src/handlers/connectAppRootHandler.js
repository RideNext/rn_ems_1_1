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
var middleware_1 = require("../../../../framework/src/flux/middleware");
var commonNetworkElementsActions_1 = require("../actions/commonNetworkElementsActions");
var connectionStatusLogHandler_1 = require("./connectionStatusLogHandler");
var infoNetworkElementHandler_1 = require("./infoNetworkElementHandler");
var networkElementsHandler_1 = require("./networkElementsHandler");
var tlsKeyHandler_1 = require("./tlsKeyHandler");
var currentOpenPanelHandler = function (state, action) {
    if (state === void 0) { state = null; }
    if (action instanceof commonNetworkElementsActions_1.SetPanelAction) {
        state = action.panelId;
    }
    return state;
};
var guiCutThroughHandler = function (state, action) {
    if (state === void 0) { state = { searchedElements: [], notSearchedElements: [], unsupportedElements: [] }; }
    if (action instanceof commonNetworkElementsActions_1.AddWebUriList) {
        var notSearchedElements_1;
        var searchedElements = void 0;
        var unsupportedElements = void 0;
        notSearchedElements_1 = state.notSearchedElements.concat(action.notSearchedElements);
        unsupportedElements = state.unsupportedElements.concat(action.unsupportedElements);
        //remove elements, which were just searched
        if (action.newlySearchedElements) {
            action.newlySearchedElements.forEach(function (item) {
                notSearchedElements_1 = notSearchedElements_1.filter(function (id) { return id !== item; });
            });
        }
        searchedElements = state.searchedElements.concat(action.searchedElements);
        state = { searchedElements: searchedElements, notSearchedElements: notSearchedElements_1, unsupportedElements: unsupportedElements };
    }
    else if (action instanceof commonNetworkElementsActions_1.RemoveWebUri) {
        var nodeId_1 = action.element;
        var webUris = state.searchedElements.filter(function (item) { return item.id !== nodeId_1; });
        var knownElements = state.notSearchedElements.filter(function (item) { return item !== nodeId_1; });
        var unsupportedElement = state.unsupportedElements.filter(function (item) { return item != nodeId_1; });
        state = { notSearchedElements: knownElements, searchedElements: webUris, unsupportedElements: unsupportedElement };
    }
    return state;
};
var actionHandlers = {
    networkElements: networkElementsHandler_1.networkElementsActionHandler,
    connectionStatusLog: connectionStatusLogHandler_1.connectionStatusLogActionHandler,
    currentOpenPanel: currentOpenPanelHandler,
    elementInfo: infoNetworkElementHandler_1.infoNetworkElementsActionHandler,
    elementFeatureInfo: infoNetworkElementHandler_1.infoNetworkElementFeaturesActionHandler,
    guiCutThrough: guiCutThroughHandler,
    availableTlsKeys: tlsKeyHandler_1.availableTlsKeysActionHandler
};
exports.connectAppRootHandler = middleware_1.combineActionHandler(actionHandlers);
exports["default"] = exports.connectAppRootHandler;
