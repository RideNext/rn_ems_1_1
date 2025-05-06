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
var AddErrorInfoAction = /** @class */ (function (_super) {
    __extends(AddErrorInfoAction, _super);
    function AddErrorInfoAction(errorInfo) {
        var _this = _super.call(this) || this;
        _this.errorInfo = errorInfo;
        return _this;
    }
    return AddErrorInfoAction;
}(action_1.Action));
exports.AddErrorInfoAction = AddErrorInfoAction;
var RemoveErrorInfoAction = /** @class */ (function (_super) {
    __extends(RemoveErrorInfoAction, _super);
    function RemoveErrorInfoAction(errorInfo) {
        var _this = _super.call(this) || this;
        _this.errorInfo = errorInfo;
        return _this;
    }
    return RemoveErrorInfoAction;
}(action_1.Action));
exports.RemoveErrorInfoAction = RemoveErrorInfoAction;
var ClearErrorInfoAction = /** @class */ (function (_super) {
    __extends(ClearErrorInfoAction, _super);
    function ClearErrorInfoAction() {
        return _super.call(this) || this;
    }
    return ClearErrorInfoAction;
}(action_1.Action));
exports.ClearErrorInfoAction = ClearErrorInfoAction;
