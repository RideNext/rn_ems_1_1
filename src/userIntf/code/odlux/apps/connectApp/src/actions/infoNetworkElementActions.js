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
var connectService_1 = require("../services/connectService");
/**
  * Represents the base action.
  */
var BaseAction = /** @class */ (function (_super) {
    __extends(BaseAction, _super);
    function BaseAction() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return BaseAction;
}(action_1.Action));
exports.BaseAction = BaseAction;
/**
  * Represents an action causing the store to load all element Yang capabilities.
  */
var LoadAllElementInfoAction = /** @class */ (function (_super) {
    __extends(LoadAllElementInfoAction, _super);
    function LoadAllElementInfoAction() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return LoadAllElementInfoAction;
}(BaseAction));
exports.LoadAllElementInfoAction = LoadAllElementInfoAction;
/**
  * Represents an action causing the store to update element Yang capabilities.
  */
var AllElementInfoLoadedAction = /** @class */ (function (_super) {
    __extends(AllElementInfoLoadedAction, _super);
    /**
      * Initialize this instance.
      * @param elementInfo The information of the element which is returned.
      */
    function AllElementInfoLoadedAction(elementInfo, error) {
        var _this = _super.call(this) || this;
        _this.elementInfo = elementInfo;
        _this.error = error;
        return _this;
    }
    return AllElementInfoLoadedAction;
}(BaseAction));
exports.AllElementInfoLoadedAction = AllElementInfoLoadedAction;
/**
  * Represents an action causing the store to update element Yang capabilities Module Features.
  */
var AllElementInfoFeatureLoadedAction = /** @class */ (function (_super) {
    __extends(AllElementInfoFeatureLoadedAction, _super);
    /**
      * Initialize this instance.
      * @param elementFeatureInfo The information of the element which is returned.
      */
    function AllElementInfoFeatureLoadedAction(elementFeatureInfo, error) {
        var _this = _super.call(this) || this;
        _this.elementFeatureInfo = elementFeatureInfo;
        _this.error = error;
        return _this;
    }
    return AllElementInfoFeatureLoadedAction;
}(BaseAction));
exports.AllElementInfoFeatureLoadedAction = AllElementInfoFeatureLoadedAction;
/**
  * Represents an asynchronous thunk  action to load all yang capabilities.
  */
exports.loadAllInfoElementAsync = function (nodeId) { return function (dispatch) {
    dispatch(new LoadAllElementInfoAction());
    connectService_1.connectService.infoNetworkElement(nodeId).then(function (info) {
        dispatch(new AllElementInfoLoadedAction(info));
    }, function (error) {
        dispatch(new AllElementInfoLoadedAction(null, error));
    });
}; };
/**
  * Represents an asynchronous thunk  action to load all yang features.
  */
exports.loadAllInfoElementFeaturesAsync = function (nodeId) { return function (dispatch) {
    dispatch(new LoadAllElementInfoAction());
    connectService_1.connectService.infoNetworkElementFeatures(nodeId).then(function (infoFeatures) {
        dispatch(new AllElementInfoFeatureLoadedAction(infoFeatures));
    }, function (error) {
        dispatch(new AllElementInfoFeatureLoadedAction(null, error));
    });
}; };
