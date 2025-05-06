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
var navigationActions_1 = require("../actions/navigationActions");
var errorActions_1 = require("../actions/errorActions");
var storeService_1 = require("./storeService");
var baseUri = "" + window.location.origin;
var absUrlPattern = /^https?:\/\//;
exports.formEncode = function (params) { return Object.keys(params).map(function (key) {
    return encodeURIComponent(key) + '=' + encodeURIComponent(params[key].toString());
}).join('&'); };
var wildcardToRegexp = function (pattern) {
    return new RegExp('^' + pattern.split(/\*\*/).map(function (p) { return p.split(/\*+/).map(function (i) { return i.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&'); }).join('^[/]'); }).join('.*') + '$');
};
exports.getAccessPolicyByUrl = function (url) {
    var result = {
        GET: false,
        POST: false,
        PUT: false,
        PATCH: false,
        DELETE: false
    };
    if (!storeService_1.storeService.applicationStore)
        return result;
    var _a = storeService_1.storeService.applicationStore.state.framework, enablePolicy = _a.applicationState.enablePolicy, policies = _a.authenticationState.policies;
    result.GET = true;
    result.POST = true;
    result.PUT = true;
    result.PATCH = true;
    result.DELETE = true;
    if (!enablePolicy || !policies || policies.length === 0)
        return result;
    policies.forEach(function (p) {
        var re = wildcardToRegexp(p.path);
        if (re.test(url)) {
            result.GET = p.methods.get != null ? p.methods.get : result.GET;
            result.POST = p.methods.post != null ? p.methods.post : result.POST;
            result.PUT = p.methods.put != null ? p.methods.put : result.PUT;
            result.PATCH = p.methods.patch != null ? p.methods.patch : result.PATCH;
            result.DELETE = p.methods["delete"] != null ? p.methods["delete"] : result.DELETE;
        }
    });
    return result;
};
/** Sends a rest request to the given path and reports the server state.
 *  @returns An object with the server state, a message and the data or undefined in case of a json parse error.
 */
function requestRestExt(path, initParam, authenticate, isResource) {
    if (path === void 0) { path = ''; }
    if (initParam === void 0) { initParam = {}; }
    if (authenticate === void 0) { authenticate = true; }
    if (isResource === void 0) { isResource = false; }
    return __awaiter(this, void 0, void 0, function () {
        var result, isAbsUrl, uri, init, user, fetchResult, redirectUrl, contentType, isJson, data, _a, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    result = {
                        status: -1,
                        data: null
                    };
                    isAbsUrl = absUrlPattern.test(path);
                    uri = isAbsUrl ? path : isResource ? path.replace(/\/{2,}/i, '/') : (baseUri) + ('/' + path).replace(/\/{2,}/i, '/');
                    init = __assign(__assign({ 'method': 'GET' }, initParam), { headers: __assign({ 'Content-Type': 'application/json', 'Accept': 'application/json' }, initParam.headers) });
                    if (!isAbsUrl && authenticate && storeService_1.storeService.applicationStore) {
                        user = storeService_1.storeService.applicationStore.state.framework.authenticationState.user;
                        // do not request if the user is not valid
                        if (!user || !user.isValid || !user.token || !user.tokenType) {
                            return [2 /*return*/, __assign(__assign({}, result), { message: 'User is not valid or not logged in.' })];
                        }
                        (init.headers = __assign(__assign({}, init.headers), { 'Authorization': user.tokenType + " " + user.token }));
                    }
                    return [4 /*yield*/, fetch(uri, init)];
                case 1:
                    fetchResult = _b.sent();
                    if (fetchResult.status === 309) {
                        redirectUrl = fetchResult.headers.get('Location');
                        if (!redirectUrl) {
                            throw new Error('Status code 309 requires header "Location"');
                        }
                        localStorage.removeItem('userToken');
                        window.location.href = redirectUrl;
                        return [2 /*return*/, __assign(__assign({}, result), { status: fetchResult.status, message: 'Redirecting to new URL.' })];
                    }
                    else if (fetchResult.status === 403) {
                        if (storeService_1.storeService.applicationStore) {
                            storeService_1.storeService.applicationStore.dispatch(new errorActions_1.AddErrorInfoAction({ title: 'Forbidden', message: 'Status: [403], access denied.' }));
                        }
                        return [2 /*return*/, __assign(__assign({}, result), { status: 403, message: 'Forbidden.' })];
                    }
                    else if (fetchResult.status === 401) {
                        if (storeService_1.storeService.applicationStore) {
                            storeService_1.storeService.applicationStore.dispatch(new navigationActions_1.ReplaceAction("/login?returnTo=" + storeService_1.storeService.applicationStore.state.framework.navigationState.pathname));
                        }
                        return [2 /*return*/, __assign(__assign({}, result), { status: 401, message: 'Authentication requested by server.' })];
                    }
                    contentType = fetchResult.headers.get('Content-Type') || fetchResult.headers.get('content-type');
                    isJson = contentType && (contentType.toLowerCase().startsWith('application/json') || contentType.toLowerCase().startsWith('application/yang-data+json'));
                    _b.label = 2;
                case 2:
                    _b.trys.push([2, 7, , 8]);
                    if (!isJson) return [3 /*break*/, 4];
                    return [4 /*yield*/, fetchResult.json()];
                case 3:
                    _a = _b.sent();
                    return [3 /*break*/, 6];
                case 4: return [4 /*yield*/, fetchResult.text()];
                case 5:
                    _a = _b.sent();
                    _b.label = 6;
                case 6:
                    data = (_a);
                    return [2 /*return*/, __assign(__assign({}, result), { status: fetchResult.status, message: fetchResult.statusText, data: data })];
                case 7:
                    error_1 = _b.sent();
                    return [2 /*return*/, __assign(__assign({}, result), { status: fetchResult.status, message: error_1 && error_1.message || String(error_1), data: undefined })];
                case 8: return [2 /*return*/];
            }
        });
    });
}
exports.requestRestExt = requestRestExt;
/** Sends a rest request to the given path.
 * @returns The data, or null it there was any error
 */
function requestRest(path, init, authenticate, isResource) {
    if (path === void 0) { path = ''; }
    if (init === void 0) { init = {}; }
    if (authenticate === void 0) { authenticate = true; }
    if (isResource === void 0) { isResource = false; }
    return __awaiter(this, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, requestRestExt(path, init, authenticate, isResource)];
                case 1:
                    res = _a.sent();
                    if (res && res.status >= 200 && res.status < 300) {
                        return [2 /*return*/, res.data];
                    }
                    return [2 /*return*/, null];
            }
        });
    });
}
exports.requestRest = requestRest;
