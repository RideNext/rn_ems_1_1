"use strict";
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
var React = require("react");
var applicationManager_1 = require("../services/applicationManager");
function withComponents(mapping) {
    return function (component) {
        var components = {};
        Object.keys(mapping).forEach(function (name) {
            var _a = mapping[name].split('.'), appKey = _a[0], componentKey = _a[1];
            var reg = applicationManager_1["default"].applications[appKey];
            components[name] = reg && reg.exportedComponents && reg.exportedComponents[componentKey] || (function () { return null; });
        });
        return function (props) { return (React.createElement(component, Object.assign({ components: components }, props))); };
    };
}
exports.withComponents = withComponents;
exports["default"] = withComponents;
