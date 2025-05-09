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
var faultStatusService_1 = require("../services/faultStatusService");
var notificationActions_1 = require("./notificationActions");
var SetFaultStatusAction = /** @class */ (function (_super) {
    __extends(SetFaultStatusAction, _super);
    function SetFaultStatusAction(criticalFaults, majorFaults, minorFaults, warnings, isLoadingAlarmStatusChart, ConnectedCount, ConnectingCount, DisconnectedCount, MountedCount, UnableToConnectCount, UndefinedCount, UnmountedCount, totalCount, isLoadingConnectionStatusChart) {
        var _this = _super.call(this) || this;
        _this.criticalFaults = criticalFaults;
        _this.majorFaults = majorFaults;
        _this.minorFaults = minorFaults;
        _this.warnings = warnings;
        _this.isLoadingAlarmStatusChart = isLoadingAlarmStatusChart;
        _this.ConnectedCount = ConnectedCount;
        _this.ConnectingCount = ConnectingCount;
        _this.DisconnectedCount = DisconnectedCount;
        _this.MountedCount = MountedCount;
        _this.UnableToConnectCount = UnableToConnectCount;
        _this.UndefinedCount = UndefinedCount;
        _this.UnmountedCount = UnmountedCount;
        _this.totalCount = totalCount;
        _this.isLoadingConnectionStatusChart = isLoadingConnectionStatusChart;
        return _this;
    }
    return SetFaultStatusAction;
}(notificationActions_1.FaultApplicationBaseAction));
exports.SetFaultStatusAction = SetFaultStatusAction;
exports.refreshFaultStatusAsyncAction = function (dispatch) { return __awaiter(void 0, void 0, void 0, function () {
    var result, statusAction;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, faultStatusService_1.getFaultStateFromDatabase()["catch"](function (_) { return null; })];
            case 1:
                result = _a.sent();
                if (result) {
                    statusAction = new SetFaultStatusAction(result.Critical || 0, result.Major || 0, result.Minor || 0, result.Warning || 0, false, result.Connected || 0, result.Connecting || 0, result.Disconnected || 0, result.Mounted || 0, result.UnableToConnect || 0, result.Undefined || 0, result.Unmounted || 0, result.total || 0, false);
                    dispatch(statusAction);
                    return [2 /*return*/];
                }
                else {
                    dispatch(new SetFaultStatusAction(0, 0, 0, 0, false, 0, 0, 0, 0, 0, 0, 0, 0, false));
                }
                return [2 /*return*/];
        }
    });
}); };
