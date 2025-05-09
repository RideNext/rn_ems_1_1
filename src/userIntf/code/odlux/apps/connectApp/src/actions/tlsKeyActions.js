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
 * ============LICENSE_START========================================================================
 * ONAP : ccsdk feature sdnr wt odlux
 * =================================================================================================
 * Copyright (C) 2021 highstreet technologies GmbH Intellectual Property. All rights reserved.
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
 * Represents an action causing the store to load all TLS Keys.
 */
var LoadAllTlsKeyListAction = /** @class */ (function (_super) {
    __extends(LoadAllTlsKeyListAction, _super);
    function LoadAllTlsKeyListAction() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return LoadAllTlsKeyListAction;
}(BaseAction));
exports.LoadAllTlsKeyListAction = LoadAllTlsKeyListAction;
/**
 * Represents an action causing the store to get all TLS Keys.
 */
var AllTlsKeyListLoadedAction = /** @class */ (function (_super) {
    __extends(AllTlsKeyListLoadedAction, _super);
    /**
       * Initialize this instance.
       *
       * @param gets all the tlsKey list from the  database.
       */
    function AllTlsKeyListLoadedAction(tlsList, error) {
        var _this = _super.call(this) || this;
        _this.tlsList = tlsList;
        _this.error = error;
        return _this;
    }
    return AllTlsKeyListLoadedAction;
}(BaseAction));
exports.AllTlsKeyListLoadedAction = AllTlsKeyListLoadedAction;
/**
 * Represents an asynchronous thunk action to load all tlsKeys
 */
exports.loadAllTlsKeyListAsync = function () { return function (dispatch) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        dispatch(new LoadAllTlsKeyListAction());
        connectService_1.connectService.getTlsKeys().then(function (TlsKeyList) {
            dispatch(new AllTlsKeyListLoadedAction(TlsKeyList));
        })["catch"](function (error) {
            dispatch(new AllTlsKeyListLoadedAction(null, error));
        });
        return [2 /*return*/];
    });
}); }; };
