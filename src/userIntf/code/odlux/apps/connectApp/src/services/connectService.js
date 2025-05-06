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
var restService_1 = require("../../../../framework/src/services/restService");
var yangHelper_1 = require("../../../../framework/src/utilities/yangHelper");
/**
* Represents a web api accessor service for all network element/node actions.
*/
var ConnectService = /** @class */ (function () {
    function ConnectService() {
        var _this = this;
        this.getNetworkElementUri = function (nodeId) { return '/rests/data/network-topology:network-topology/topology=topology-netconf/node=' + nodeId; };
        this.getNetworkElementConnectDataProviderUri = function (operation) { return "/rests/operations/data-provider:" + operation + "-network-element-connection"; };
        this.getAllWebUriExtensionsForNetworkElementListUri = function (nodeId) { return _this.getNetworkElementUri(nodeId) + '/yang-ext:mount/core-model:network-element'; };
        this.getNetworkElementYangLibraryFeature = function (nodeId) { return '/rests/data/network-topology:network-topology/topology=topology-netconf/node=' + nodeId + '/yang-ext:mount/ietf-yang-library:yang-library?content=nonconfig'; };
        //  public async getAllWebUriExtensionsForNetworkElementListAsync(ne: string[]): Promise<(guiCutThrough)[] | null> {
        //   let promises: any[] = [];
        //   let webUris: guiCutThrough[] = []
        //   ne.forEach(nodeId => {
        //     const path = this.getAllWebUriExtensionsForNetworkElementListUri(nodeId);
        // // add search request to array
        //     promises.push(requestRest<any>(path, { method: "GET" })
        //       .then(result => {
        //         if (result != null && result['core-model:network-element'] && result['core-model:network-element'].extension) {
        //           const webUri = result['core-model:network-element'].extension.find((item: any) => item['value-name'] === "webUri")
        //           if (webUri) {
        //             webUris.push({ weburi: webUri.value, id: nodeId });
        //           } else {
        //             webUris.push({ weburi: undefined, id: nodeId });
        //           }
        //         } else {
        //           webUris.push({ weburi: undefined, id: nodeId });
        //         }
        //       })
        //       .catch(error => {
        //         webUris.push({ weburi: undefined, id: nodeId });
        //       }))
        //   })
        //   // wait until all promises are done and return weburis
        //   return Promise.all(promises).then(result => { return webUris });
        // }
    }
    /**
     * Inserts a network element/node.
     */
    ConnectService.prototype.createNetworkElement = function (element) {
        return __awaiter(this, void 0, void 0, function () {
            var path, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        path = this.getNetworkElementConnectDataProviderUri('create');
                        return [4 /*yield*/, restService_1.requestRest(path, {
                                method: 'POST', body: JSON.stringify(yangHelper_1.convertPropertyNames({ 'data-provider:input': element }, yangHelper_1.replaceUpperCase))
                            })];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result || null];
                }
            });
        });
    };
    /**
    * Updates a network element/node.
    */
    ConnectService.prototype.updateNetworkElement = function (element) {
        return __awaiter(this, void 0, void 0, function () {
            var path, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        path = this.getNetworkElementConnectDataProviderUri('update');
                        return [4 /*yield*/, restService_1.requestRest(path, {
                                method: 'POST', body: JSON.stringify(yangHelper_1.convertPropertyNames({ 'data-provider:input': element }, yangHelper_1.replaceUpperCase))
                            })];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result || null];
                }
            });
        });
    };
    /**
      * Deletes a network element/node.
      */
    ConnectService.prototype.deleteNetworkElement = function (element) {
        return __awaiter(this, void 0, void 0, function () {
            var query, path, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = {
                            'id': element.id
                        };
                        path = this.getNetworkElementConnectDataProviderUri('delete');
                        return [4 /*yield*/, restService_1.requestRest(path, {
                                method: 'POST', body: JSON.stringify(yangHelper_1.convertPropertyNames({ 'data-provider:input': query }, yangHelper_1.replaceUpperCase))
                            })];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result || null];
                }
            });
        });
    };
    /** Mounts network element/node */
    ConnectService.prototype.mountNetworkElement = function (networkElement) {
        return __awaiter(this, void 0, void 0, function () {
            var path, mountXml, tlsXml, bodyXml, result, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        path = this.getNetworkElementUri(networkElement.nodeId);
                        mountXml = [
                            '<node xmlns="urn:TBD:params:xml:ns:yang:network-topology">',
                            "<node-id>" + networkElement.nodeId + "</node-id>",
                            "<host xmlns=\"urn:opendaylight:netconf-node-topology\">" + networkElement.host + "</host>",
                            "<port xmlns=\"urn:opendaylight:netconf-node-topology\">" + networkElement.port + "</port>",
                            "<username xmlns=\"urn:opendaylight:netconf-node-topology\">" + networkElement.username + "</username>",
                            "<password xmlns=\"urn:opendaylight:netconf-node-topology\">" + networkElement.password + "</password>",
                            '  <tcp-only xmlns="urn:opendaylight:netconf-node-topology">false</tcp-only>',
                            '  <!-- non-mandatory fields with default values, you can safely remove these if you do not wish to override any of these values-->',
                            '  <reconnect-on-changed-schema xmlns="urn:opendaylight:netconf-node-topology">false</reconnect-on-changed-schema>',
                            '  <connection-timeout-millis xmlns="urn:opendaylight:netconf-node-topology">20000</connection-timeout-millis>',
                            '  <max-connection-attempts xmlns="urn:opendaylight:netconf-node-topology">100</max-connection-attempts>',
                            '  <between-attempts-timeout-millis xmlns="urn:opendaylight:netconf-node-topology">2000</between-attempts-timeout-millis>',
                            '  <sleep-factor xmlns="urn:opendaylight:netconf-node-topology">1.5</sleep-factor>',
                            '  <!-- keepalive-delay set to 0 turns off keepalives-->',
                            '  <keepalive-delay xmlns="urn:opendaylight:netconf-node-topology">120</keepalive-delay>',
                            '</node>'
                        ].join('');
                        tlsXml = [
                            '<node xmlns="urn:TBD:params:xml:ns:yang:network-topology">',
                            "<node-id>" + networkElement.nodeId + "</node-id>",
                            '<key-based xmlns="urn:opendaylight:netconf-node-topology">',
                            "<key-id xmlns=\"urn:opendaylight:netconf-node-topology\">" + networkElement.tlsKey + "</key-id>",
                            "<username xmlns=\"urn:opendaylight:netconf-node-topology\">" + networkElement.username + "</username>",
                            '</key-based>',
                            "<host xmlns=\"urn:opendaylight:netconf-node-topology\">" + networkElement.host + "</host>",
                            "<port xmlns=\"urn:opendaylight:netconf-node-topology\">" + networkElement.port + "</port>",
                            '<tcp-only xmlns="urn:opendaylight:netconf-node-topology">false</tcp-only>',
                            '<protocol xmlns="urn:opendaylight:netconf-node-topology">',
                            '<name xmlns="urn:opendaylight:netconf-node-topology">TLS</name>',
                            ' </protocol>',
                            '<max-connection-attempts xmlns="urn:opendaylight:netconf-node-topology">2</max-connection-attempts>',
                            '</node>'
                        ].join('');
                        if (networkElement.password) {
                            bodyXml = mountXml;
                        }
                        else {
                            bodyXml = tlsXml;
                        }
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, restService_1.requestRest(path, {
                                method: 'PUT',
                                headers: {
                                    'Content-Type': 'application/xml',
                                    'Accept': 'application/xml'
                                },
                                body: bodyXml
                            })];
                    case 2:
                        result = _b.sent();
                        // expect an empty answer
                        return [2 /*return*/, result !== null];
                    case 3:
                        _a = _b.sent();
                        return [2 /*return*/, false];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /** Unmounts a network element by its id. */
    ConnectService.prototype.unmountNetworkElement = function (nodeId) {
        return __awaiter(this, void 0, void 0, function () {
            var path, result, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        path = this.getNetworkElementUri(nodeId);
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, restService_1.requestRest(path, {
                                method: 'DELETE',
                                headers: {
                                    'Content-Type': 'application/xml',
                                    'Accept': 'application/xml'
                                }
                            })];
                    case 2:
                        result = _b.sent();
                        // expect an empty answer
                        return [2 /*return*/, result !== null];
                    case 3:
                        _a = _b.sent();
                        return [2 /*return*/, false];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /** Yang capabilities of the selected network element/node */
    ConnectService.prototype.infoNetworkElement = function (nodeId) {
        return __awaiter(this, void 0, void 0, function () {
            var path, topologyRequestPomise;
            return __generator(this, function (_a) {
                path = this.getNetworkElementUri(nodeId);
                topologyRequestPomise = restService_1.requestRest(path, { method: 'GET' });
                return [2 /*return*/, topologyRequestPomise && topologyRequestPomise.then(function (result) {
                        return result && result['network-topology:node'] && result['network-topology:node'][0] || null;
                    })];
            });
        });
    };
    /** Yang features of the selected network element/node module */
    ConnectService.prototype.infoNetworkElementFeatures = function (nodeId) {
        return __awaiter(this, void 0, void 0, function () {
            var path, topologyRequestPomise;
            return __generator(this, function (_a) {
                path = this.getNetworkElementYangLibraryFeature(nodeId);
                topologyRequestPomise = restService_1.requestRest(path, { method: 'GET' });
                return [2 /*return*/, topologyRequestPomise && topologyRequestPomise.then(function (result) {
                        var resultFinal = result && result['ietf-yang-library:yang-library']
                            && result['ietf-yang-library:yang-library']['module-set'] &&
                            result['ietf-yang-library:yang-library']['module-set'][0] &&
                            result['ietf-yang-library:yang-library']['module-set'][0].module || null;
                        return resultFinal;
                    })];
            });
        });
    };
    /**
     * Get the connection state of the network element/ node
     */
    ConnectService.prototype.getNetworkElementConnectionStatus = function (element) {
        return __awaiter(this, void 0, void 0, function () {
            var path, query, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        path = '/rests/operations/data-provider:read-network-element-connection-list';
                        query = {
                            'data-provider:input': {
                                'filter': [{
                                        'property': 'node-id',
                                        'filtervalue': element
                                    }],
                                'pagination': {
                                    'size': 20,
                                    'page': 1
                                }
                            }
                        };
                        return [4 /*yield*/, restService_1.requestRest(path, { method: 'POST', body: JSON.stringify(query) })];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result && result['data-provider:output'] && result['data-provider:output'].data && result['data-provider:output'].data.map(function (ne) { return ({
                                status: ne.status
                            }); }) || null];
                }
            });
        });
    };
    /**
    * Gets all available tlsKeys.
    */
    ConnectService.prototype.getTlsKeys = function () {
        return __awaiter(this, void 0, void 0, function () {
            var path, query, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        path = '/rests/operations/data-provider:read-tls-key-entry';
                        query = {
                            'data-provider:input': {
                                'filter': [],
                                'sortorder': [],
                                'pagination': {
                                    'size': 20,
                                    'page': 1
                                }
                            }
                        };
                        return [4 /*yield*/, restService_1.requestRest(path, { method: 'POST', body: JSON.stringify(query) })];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result && result['data-provider:output'] && result['data-provider:output'].data && result['data-provider:output'].data.map(function (ne) { return ({
                                key: ne
                            }); }) || null];
                }
            });
        });
    };
    ConnectService.prototype.getAllWebUriExtensionsForNetworkElementListAsync = function (neList) {
        return __awaiter(this, void 0, void 0, function () {
            var path, webUriList, query, result, resultData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        path = '/rests/operations/data-provider:read-gui-cut-through-entry';
                        webUriList = [];
                        query = {
                            'data-provider:input': {
                                'filter': [{
                                        'property': 'id',
                                        'filtervalues': neList
                                    }],
                                'pagination': {
                                    'size': 20,
                                    'page': 1
                                }
                            }
                        };
                        return [4 /*yield*/, restService_1.requestRest(path, { method: 'POST', body: JSON.stringify(query) })];
                    case 1:
                        result = _a.sent();
                        resultData = result && result['data-provider:output'] && result['data-provider:output'].data;
                        neList.forEach(function (nodeId) {
                            var entryNotFound = true;
                            if (resultData) {
                                try {
                                    resultData.forEach(function (entry) {
                                        if (entry.id == nodeId) {
                                            entryNotFound = false;
                                            if (entry.weburi) {
                                                webUriList.push({ id: nodeId, weburi: entry.weburi });
                                            }
                                            else {
                                                webUriList.push({ id: nodeId, weburi: undefined });
                                            }
                                            throw new Error();
                                        }
                                    });
                                }
                                catch (e) { }
                            }
                            if (entryNotFound)
                                webUriList.push({ id: nodeId, weburi: undefined });
                        });
                        return [2 /*return*/, webUriList];
                }
            });
        });
    };
    return ConnectService;
}());
exports.connectService = new ConnectService();
