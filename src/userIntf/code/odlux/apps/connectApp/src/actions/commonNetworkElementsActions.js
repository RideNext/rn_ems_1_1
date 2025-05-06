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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
/**
 * Create an update action that can distinguish whether one or the other view is currently active and update it.
 * This action is then used for each update in the other actions and when notifications arrive.
 * create an update action that can distinguish whether one or the other view is currently active and update it.
 * This action is then used for each update in the other actions and when notifications arrive.
 */
var action_1 = require("../../../../framework/src/flux/action");
var connectionStatusLogHandler_1 = require("../handlers/connectionStatusLogHandler");
var networkElementsHandler_1 = require("../handlers/networkElementsHandler");
var connectService_1 = require("../services/connectService");
var SetPanelAction = /** @class */ (function (_super) {
    __extends(SetPanelAction, _super);
    function SetPanelAction(panelId) {
        var _this = _super.call(this) || this;
        _this.panelId = panelId;
        return _this;
    }
    return SetPanelAction;
}(action_1.Action));
exports.SetPanelAction = SetPanelAction;
var AddWebUriList = /** @class */ (function (_super) {
    __extends(AddWebUriList, _super);
    function AddWebUriList(searchedElements, notSearchedElements, unsupportedElements, newlySearchedElements) {
        var _this = _super.call(this) || this;
        _this.searchedElements = searchedElements;
        _this.notSearchedElements = notSearchedElements;
        _this.unsupportedElements = unsupportedElements;
        _this.newlySearchedElements = newlySearchedElements;
        return _this;
    }
    return AddWebUriList;
}(action_1.Action));
exports.AddWebUriList = AddWebUriList;
var RemoveWebUri = /** @class */ (function (_super) {
    __extends(RemoveWebUri, _super);
    function RemoveWebUri(element) {
        var _this = _super.call(this) || this;
        _this.element = element;
        return _this;
    }
    return RemoveWebUri;
}(action_1.Action));
exports.RemoveWebUri = RemoveWebUri;
exports.removeWebUriAction = function (nodeId) {
    return new RemoveWebUri(nodeId);
};
var SetWeburiSearchBusy = /** @class */ (function (_super) {
    __extends(SetWeburiSearchBusy, _super);
    function SetWeburiSearchBusy(isbusy) {
        var _this = _super.call(this) || this;
        _this.isbusy = isbusy;
        return _this;
    }
    return SetWeburiSearchBusy;
}(action_1.Action));
exports.SetWeburiSearchBusy = SetWeburiSearchBusy;
var isBusy = false;
exports.findWebUrisForGuiCutThroughAsyncAction = function (networkElementIds) { return function (dispatcher, getState) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, guiCutThrough2, networkElements, notConnectedElements, elementsToSearch, prevFoundElements, unsupportedElements, result;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                // keep method from executing simultanously; state not used because change of iu isn't needed
                if (isBusy)
                    return [2 /*return*/];
                isBusy = true;
                _a = getState().connect, guiCutThrough2 = _a.guiCutThrough, networkElements = _a.networkElements;
                notConnectedElements = [];
                elementsToSearch = [];
                prevFoundElements = [];
                unsupportedElements = [];
                networkElementIds.forEach(function (id) {
                    var item = networkElements.rows.find(function (ne) { return ne.id === id; });
                    if (item) {
                        if (item.status === 'Connected') {
                            // if (item.coreModelCapability !== "Unsupported") {
                            // element is connected and is added to search list, if it doesn't exist already
                            var exists = guiCutThrough2.searchedElements.filter(function (element) { return element.id === id; }).length > 0;
                            if (!exists) {
                                elementsToSearch.push(id);
                                //element was found previously, but wasn't connected
                                if (guiCutThrough2.notSearchedElements.length > 0 && guiCutThrough2.notSearchedElements.includes(id)) {
                                    prevFoundElements.push(id);
                                }
                            }
                            // } else {
                            //   // element does not support core model and must not be searched for a weburi  
                            //   const id = item.id as string;
                            //   const exists = guiCutThrough.unsupportedElements.filter(element => element === id).length > 0;
                            //   if (!exists) {
                            //     unsupportedElements.push(id);
                            //     //element was found previously, but wasn't connected
                            //     if (guiCutThrough.notSearchedElements.length > 0 && guiCutThrough.notSearchedElements.includes(id)) {
                            //       prevFoundElements.push(id);
                            //     }
                            //   }
                            // }
                        }
                        else {
                            // element isn't connected and cannot be searched for a weburi
                            if (!guiCutThrough2.notSearchedElements.includes(id)) {
                                notConnectedElements.push(item.id);
                            }
                        }
                    }
                });
                if (!(elementsToSearch.length > 0 || notConnectedElements.length > 0 || unsupportedElements.length > 0)) return [3 /*break*/, 2];
                return [4 /*yield*/, connectService_1.connectService.getAllWebUriExtensionsForNetworkElementListAsync(elementsToSearch)];
            case 1:
                result = _b.sent();
                dispatcher(new AddWebUriList(result, notConnectedElements, unsupportedElements, prevFoundElements));
                _b.label = 2;
            case 2:
                isBusy = false;
                return [2 /*return*/];
        }
    });
}); }; };
exports.setPanelAction = function (panelId) {
    return new SetPanelAction(panelId);
};
exports.updateCurrentViewAsyncAction = function () { return function (dispatch, getState) {
    var currentOpenPanel = getState().connect.currentOpenPanel;
    if (currentOpenPanel === 'NetworkElements') {
        return dispatch(networkElementsHandler_1.networkElementsReloadAction);
    }
    else {
        return dispatch(connectionStatusLogHandler_1.connectionStatusLogReloadAction);
    }
}; };
