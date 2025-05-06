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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var store_1 = require("../flux/store");
var middleware_1 = require("../flux/middleware");
var applicationManager_1 = require("../services/applicationManager");
var applicationRegistryHandler_1 = require("../handlers/applicationRegistryHandler");
var authenticationHandler_1 = require("../handlers/authenticationHandler");
var applicationStateHandler_1 = require("../handlers/applicationStateHandler");
var navigationStateHandler_1 = require("../handlers/navigationStateHandler");
var applicationApi_1 = require("../services/applicationApi");
var api_1 = require("../middleware/api");
var thunk_1 = require("../middleware/thunk");
var logger_1 = require("../middleware/logger");
var navigation_1 = require("../middleware/navigation");
var policies_1 = require("../middleware/policies");
var frameworkHandlers = middleware_1.combineActionHandler({
    applicationRegistration: applicationRegistryHandler_1.applicationRegistryHandler,
    applicationState: applicationStateHandler_1.applicationStateHandler,
    authenticationState: authenticationHandler_1.authenticationStateHandler,
    navigationState: navigationStateHandler_1.navigationStateHandler
});
var ApplicationStore = /** @class */ (function (_super) {
    __extends(ApplicationStore, _super);
    function ApplicationStore() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ApplicationStore;
}(store_1.Store));
exports.ApplicationStore = ApplicationStore;
/** This function will create the application store considering the currently registered application ans their middlewares. */
exports.applicationStoreCreator = function () {
    var middlewares = [];
    var actionHandlers = Object.keys(applicationManager_1["default"].applications).reduce(function (acc, cur) {
        var reg = applicationManager_1["default"].applications[cur];
        reg && typeof reg.rootActionHandler === 'function' && (acc[cur] = reg.rootActionHandler);
        reg && reg.middlewares && Array.isArray(reg.middlewares) && middlewares.push.apply(middlewares, reg.middlewares);
        return acc;
    }, { framework: frameworkHandlers });
    var applicationStore = new ApplicationStore(middleware_1.combineActionHandler(actionHandlers), middleware_1.chainMiddleware.apply(void 0, __spreadArrays([logger_1["default"], thunk_1["default"], navigation_1["default"], api_1["default"], policies_1.updatePolicies], middlewares)));
    applicationApi_1.setApplicationStore(applicationStore);
    return applicationStore;
};
exports["default"] = exports.applicationStoreCreator;
