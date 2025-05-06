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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var AddSnackbarNotification = /** @class */ (function (_super) {
    __extends(AddSnackbarNotification, _super);
    function AddSnackbarNotification(notification) {
        var _this = _super.call(this) || this;
        _this.notification = __assign(__assign({}, notification), { key: (new Date().getTime() + Math.random()) });
        return _this;
    }
    return AddSnackbarNotification;
}(action_1.Action));
exports.AddSnackbarNotification = AddSnackbarNotification;
var RemoveSnackbarNotification = /** @class */ (function (_super) {
    __extends(RemoveSnackbarNotification, _super);
    function RemoveSnackbarNotification(key) {
        var _this = _super.call(this) || this;
        _this.key = key;
        return _this;
    }
    return RemoveSnackbarNotification;
}(action_1.Action));
exports.RemoveSnackbarNotification = RemoveSnackbarNotification;
