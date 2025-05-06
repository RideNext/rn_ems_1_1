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
var action_1 = require("../flux/action");
var NavigationAction = /** @class */ (function (_super) {
    __extends(NavigationAction, _super);
    function NavigationAction() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return NavigationAction;
}(action_1.Action));
exports.NavigationAction = NavigationAction;
var NavigateToApplication = /** @class */ (function (_super) {
    __extends(NavigateToApplication, _super);
    function NavigateToApplication(applicationName, href, state, replace) {
        if (replace === void 0) { replace = false; }
        var _this = _super.call(this) || this;
        _this.applicationName = applicationName;
        _this.href = href;
        _this.state = state;
        _this.replace = replace;
        return _this;
    }
    return NavigateToApplication;
}(NavigationAction));
exports.NavigateToApplication = NavigateToApplication;
var PushAction = /** @class */ (function (_super) {
    __extends(PushAction, _super);
    function PushAction(href, state) {
        var _this = _super.call(this) || this;
        _this.href = href;
        _this.state = state;
        return _this;
    }
    return PushAction;
}(NavigationAction));
exports.PushAction = PushAction;
var ReplaceAction = /** @class */ (function (_super) {
    __extends(ReplaceAction, _super);
    function ReplaceAction(href, state) {
        var _this = _super.call(this) || this;
        _this.href = href;
        _this.state = state;
        return _this;
    }
    return ReplaceAction;
}(NavigationAction));
exports.ReplaceAction = ReplaceAction;
var GoAction = /** @class */ (function (_super) {
    __extends(GoAction, _super);
    function GoAction(index) {
        var _this = _super.call(this) || this;
        _this.index = index;
        return _this;
    }
    return GoAction;
}(NavigationAction));
exports.GoAction = GoAction;
var GoBackAction = /** @class */ (function (_super) {
    __extends(GoBackAction, _super);
    function GoBackAction() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return GoBackAction;
}(NavigationAction));
exports.GoBackAction = GoBackAction;
var GoForwardeAction = /** @class */ (function (_super) {
    __extends(GoForwardeAction, _super);
    function GoForwardeAction() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return GoForwardeAction;
}(NavigationAction));
exports.GoForwardeAction = GoForwardeAction;
var LocationChanged = /** @class */ (function (_super) {
    __extends(LocationChanged, _super);
    function LocationChanged(pathname, search, hash) {
        var _this = _super.call(this) || this;
        _this.pathname = pathname;
        _this.search = search;
        _this.hash = hash;
        return _this;
    }
    return LocationChanged;
}(NavigationAction));
exports.LocationChanged = LocationChanged;
