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
var action_1 = require("../../../../framework/src/flux/action");
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
var RememberCurrentPanelAction = /** @class */ (function (_super) {
    __extends(RememberCurrentPanelAction, _super);
    function RememberCurrentPanelAction(panelId) {
        var _this = _super.call(this) || this;
        _this.panelId = panelId;
        return _this;
    }
    return RememberCurrentPanelAction;
}(action_1.Action));
exports.RememberCurrentPanelAction = RememberCurrentPanelAction;
exports.setPanelAction = function (panelId) {
    return new SetPanelAction(panelId);
};
