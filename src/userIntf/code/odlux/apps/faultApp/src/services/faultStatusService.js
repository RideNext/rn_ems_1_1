"use strict";
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
exports.getFaultStateFromDatabase = function () { return __awaiter(void 0, void 0, void 0, function () {
    var path, result, faultType, faults;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                path = 'rests/operations/data-provider:read-status';
                return [4 /*yield*/, restService_1.requestRest(path, { method: 'POST' })];
            case 1:
                result = _a.sent();
                faultType = {
                    Critical: 0,
                    Major: 0,
                    Minor: 0,
                    Warning: 0,
                    Connected: 0,
                    Connecting: 0,
                    Disconnected: 0,
                    Mounted: 0,
                    UnableToConnect: 0,
                    Undefined: 0,
                    Unmounted: 0,
                    total: 0
                };
                faults = null;
                if (result && result['data-provider:output'] && result['data-provider:output'].data) {
                    faults = result['data-provider:output'].data;
                    faultType = {
                        Critical: faults[0].faults.criticals,
                        Major: faults[0].faults.majors,
                        Minor: faults[0].faults.minors,
                        Warning: faults[0].faults.warnings,
                        Connected: faults[0]['network-element-connections'].Connected,
                        Connecting: faults[0]['network-element-connections'].Connecting,
                        Disconnected: faults[0]['network-element-connections'].Disconnected,
                        Mounted: faults[0]['network-element-connections'].Mounted,
                        UnableToConnect: faults[0]['network-element-connections'].UnableToConnect,
                        Undefined: faults[0]['network-element-connections'].Undefined,
                        Unmounted: faults[0]['network-element-connections'].Unmounted,
                        total: faults[0]['network-element-connections'].total
                    };
                }
                return [2 /*return*/, faultType];
        }
    });
}); };
exports.clearStuckAlarms = function (nodeNames) { return __awaiter(void 0, void 0, void 0, function () {
    var path, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                path = 'rests/operations/devicemanager:clear-current-fault-by-nodename';
                return [4 /*yield*/, restService_1.requestRest(path, { method: 'Post', body: JSON.stringify({ input: { nodenames: nodeNames } }) })];
            case 1:
                result = _a.sent();
                return [2 /*return*/, result];
        }
    });
}); };
