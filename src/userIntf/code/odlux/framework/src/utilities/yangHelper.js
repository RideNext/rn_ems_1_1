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
exports.__esModule = true;
exports.replaceHyphen = function (name) { return name.replace(/-([a-z])/g, function (g) { return (g[1].toUpperCase()); }); };
exports.replaceUpperCase = function (name) { return name.replace(/([a-z][A-Z])/g, function (g) { return g[0] + '-' + g[1].toLowerCase(); }); };
/***
 * Replaces whitespace with '-' and cast everything to lowercase
 */
exports.toAriaLabel = function (value) { return value.replace(/\s/g, "-").toLowerCase(); };
exports.convertPropertyNames = function (obj, conv) {
    return Object.keys(obj).reduce(function (acc, cur) {
        acc[conv(cur)] = typeof obj[cur] === "object" ? exports.convertPropertyNames(obj[cur], conv) : obj[cur];
        return acc;
    }, obj instanceof Array ? [] : {});
};
exports.convertPropertyValues = function (obj, conv) {
    return Object.keys(obj).reduce(function (acc, cur) {
        acc[cur] = typeof obj[cur] === "object"
            ? exports.convertPropertyValues(obj[cur], conv)
            : cur === "property"
                ? conv(obj[cur])
                : obj[cur];
        return acc;
    }, obj instanceof Array ? [] : {});
};
