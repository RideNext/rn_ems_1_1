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
var action_1 = require("./action");
var InitialisationAction = /** @class */ (function (_super) {
    __extends(InitialisationAction, _super);
    function InitialisationAction() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return InitialisationAction;
}(action_1.Action));
;
var initialisationAction = new InitialisationAction();
exports.combineActionHandler = function (actionHandlers) {
    var finalActionHandlers = {}; // https://github.com/microsoft/TypeScript/issues/31808
    Object.keys(actionHandlers).forEach(function (actionHandlerKey) {
        var handler = actionHandlers[actionHandlerKey];
        if (typeof handler === 'function') {
            finalActionHandlers[actionHandlerKey] = handler;
        }
    });
    // ensure initialisation
    Object.keys(finalActionHandlers).forEach(function (key) {
        var actionHandler = finalActionHandlers[key];
        var initialState = actionHandler(undefined, initialisationAction);
        if (typeof initialState === 'undefined') {
            var errorMessage = "Action handler " + key + " returned undefiend during initialization.";
            throw new Error(errorMessage);
        }
    });
    return function combination(state, action) {
        if (state === void 0) { state = {}; }
        var hasChanged = false;
        var nextState = {}; // https://github.com/microsoft/TypeScript/issues/31808
        Object.keys(finalActionHandlers).forEach(function (key) {
            var actionHandler = finalActionHandlers[key];
            var previousState = state[key];
            var nextStateKey = actionHandler(previousState, action);
            if (typeof nextStateKey === 'undefined') {
                var errorMessage = "Given " + action.constructor + " and action handler " + key + " returned undefiend.";
                throw new Error(errorMessage);
            }
            nextState[key] = nextStateKey;
            hasChanged = hasChanged || nextStateKey !== previousState;
        });
        return (hasChanged ? nextState : state);
    };
};
exports.chainMiddleware = function () {
    var middlewares = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        middlewares[_i] = arguments[_i];
    }
    return function (store) {
        var middlewareAPI = {
            getState: function () { return store.state; },
            dispatch: function (action) { return store.dispatch(action); } // we want to use the combinded dispatch
            // we should NOT use the flux dispatcher here, since the action would affect ALL stores
        };
        var chain = middlewares.map(function (middleware) { return middleware(middlewareAPI); });
        return compose.apply(void 0, chain)(store.dispatch);
    };
};
/**
 * Composes single-argument functions from right to left. The rightmost
 * function can take multiple arguments as it provides the signature for
 * the resulting composite function.
 *
 * @param {...Function} funcs The functions to compose.
 * @returns {Function} A function obtained by composing the argument functions
 * from right to left. For example, compose(f, g, h) is identical to doing
 * (...args) => f(g(h(...args))).
 */
var compose = function () {
    var funcs = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        funcs[_i] = arguments[_i];
    }
    if (funcs.length === 0) {
        return function (arg) { return arg; };
    }
    if (funcs.length === 1) {
        return funcs[0];
    }
    return funcs.reduce(function (a, b) { return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return a(b.apply(void 0, args));
    }; });
};
