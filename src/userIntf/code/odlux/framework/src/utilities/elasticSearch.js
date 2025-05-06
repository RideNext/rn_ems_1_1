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
var restService_1 = require("../services/restService");
var yangHelper_1 = require("./yangHelper");
/** Represents a fabric for the searchDataHandler used by the internal data api.
 *  @param typeName The name of the entry type to create a searchDataHandler for.
 *  @param additionalFilters Filterproperties and their values to add permanently.
 *  @returns The searchDataHandler callback to be used with the material table.
*/
function createSearchDataHandler(typeName, connectToTopologyServer, additionalFilters) {
    var _this = this;
    var fetchData = function (pageIndex, rowsPerPage, orderBy, order, filter) { return __awaiter(_this, void 0, void 0, function () {
        var topologyUrl, dataProviderUrl, url, filterKeys, input, query, result, rows, data, queryTopology, resultTopology, rows, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    topologyUrl = "/topology/network/read-" + (typeof typeName === "function" ? typeName() : typeName) + "-list";
                    dataProviderUrl = "/rests/operations/data-provider:read-" + (typeof typeName === "function" ? typeName() : typeName) + "-list";
                    url = connectToTopologyServer ? topologyUrl : dataProviderUrl;
                    filter = __assign(__assign({}, filter), additionalFilters);
                    filterKeys = filter && Object.keys(filter) || [];
                    input = {
                        filter: filterKeys.filter(function (f) { return filter[f] != null && filter[f] !== ""; }).map(function (property) { return ({ property: property, filtervalue: filter[property] }); }),
                        sortorder: orderBy ? [{ property: orderBy, sortorder: order === "desc" ? "descending" : "ascending" }] : [],
                        pagination: { size: rowsPerPage, page: (pageIndex != null && pageIndex > 0 && pageIndex || 0) + 1 }
                    };
                    if (!url.includes('data-provider')) return [3 /*break*/, 2];
                    query = {
                        "data-provider:input": input
                    };
                    return [4 /*yield*/, restService_1.requestRest(url, {
                            method: "POST",
                            mode: "same-origin",
                            cache: "no-cache",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify(yangHelper_1.convertPropertyValues(query, yangHelper_1.replaceUpperCase))
                        })];
                case 1:
                    result = _a.sent();
                    if (result) {
                        rows = [];
                        if (result && result["data-provider:output"] && result["data-provider:output"].data) {
                            rows = result["data-provider:output"].data.map(function (obj) { return yangHelper_1.convertPropertyNames(obj, yangHelper_1.replaceHyphen); }) || [];
                        }
                        data = {
                            page: +(result["data-provider:output"].pagination && result["data-provider:output"].pagination.page != null && result["data-provider:output"].pagination.page - 1 || 0), total: +(result["data-provider:output"].pagination && result["data-provider:output"].pagination.total || 0), rows: rows
                        };
                        return [2 /*return*/, data];
                    }
                    return [3 /*break*/, 4];
                case 2:
                    if (!url.includes('topology')) return [3 /*break*/, 4];
                    queryTopology = {
                        "input": input
                    };
                    return [4 /*yield*/, restService_1.requestRest(url, {
                            method: "POST",
                            mode: "same-origin",
                            cache: "no-cache",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify(queryTopology)
                        })];
                case 3:
                    resultTopology = _a.sent();
                    if (resultTopology) {
                        rows = [];
                        if (resultTopology && resultTopology.output && resultTopology.output.data) {
                            rows = resultTopology.output.data.map(function (obj) { return obj; }) || [];
                        }
                        data = {
                            page: +(resultTopology.output.pagination && resultTopology.output.pagination.page != null && resultTopology.output.pagination.page - 1 || 0), total: +(resultTopology.output.pagination && resultTopology.output.pagination.total || 0), rows: rows
                        };
                        return [2 /*return*/, data];
                    }
                    _a.label = 4;
                case 4: return [2 /*return*/, { page: 1, total: 0, rows: [] }];
            }
        });
    }); };
    return fetchData;
}
exports.createSearchDataHandler = createSearchDataHandler;
