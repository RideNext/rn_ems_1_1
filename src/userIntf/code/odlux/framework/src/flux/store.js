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
var event_1 = require("../common/event");
var action_1 = require("./action");
var LogLevel = +(localStorage.getItem('log.odlux.framework.flux.store') || 0);
var InitializationAction = /** @class */ (function (_super) {
    __extends(InitializationAction, _super);
    function InitializationAction() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return InitializationAction;
}(action_1.Action));
;
var initializationAction = new InitializationAction();
var Store = /** @class */ (function () {
    function Store(actionHandler, initialState, enhancer) {
        var _this = this;
        this._dispatch = function (payload) {
            if (LogLevel > 2) {
                console.log('Store::Dispatch - ', payload);
            }
            if (payload == null || !(payload instanceof action_1.Action)) {
                throw new Error('Actions must inherit from type Action. ' +
                    'Use a custom middleware for async actions.');
            }
            if (_this._isDispatching) {
                throw new Error('ActionHandler may not dispatch actions.');
            }
            var oldState = _this._state;
            try {
                _this._isDispatching = true;
                _this._state = _this._actionHandler(oldState, payload);
            }
            finally {
                _this._isDispatching = false;
            }
            if (_this._state !== oldState) {
                if (LogLevel > 3) {
                    console.log('Store::Dispatch - state has changed', _this._state);
                }
                _this.changed.invoke();
            }
            return payload;
        };
        if (typeof initialState === 'function') {
            enhancer = initialState;
            initialState = undefined;
        }
        this._isDispatching = false;
        this.changed = new event_1.Event();
        this._actionHandler = actionHandler;
        this._state = initialState;
        if (enhancer)
            this._dispatch = enhancer(this);
        this._dispatch(initializationAction);
    }
    Object.defineProperty(Store.prototype, "dispatch", {
        get: function () {
            return this._dispatch;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Store.prototype, "state", {
        get: function () {
            return this._state;
        },
        enumerable: true,
        configurable: true
    });
    return Store;
}());
exports.Store = Store;
