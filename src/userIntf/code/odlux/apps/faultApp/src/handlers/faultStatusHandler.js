"use strict";
exports.__esModule = true;
var statusActions_1 = require("../actions/statusActions");
var faultStatusInit = {
    critical: 0,
    major: 0,
    minor: 0,
    warning: 0,
    isLoadingAlarmStatusChart: false,
    Connected: 0,
    Connecting: 0,
    Disconnected: 0,
    Mounted: 0,
    UnableToConnect: 0,
    Undefined: 0,
    Unmounted: 0,
    total: 0,
    isLoadingConnectionStatusChart: false
};
exports.faultStatusHandler = function (state, action) {
    if (state === void 0) { state = faultStatusInit; }
    if (action instanceof statusActions_1.SetFaultStatusAction) {
        state = {
            critical: action.criticalFaults,
            major: action.majorFaults,
            minor: action.minorFaults,
            warning: action.warnings,
            isLoadingAlarmStatusChart: action.isLoadingAlarmStatusChart,
            Connected: action.ConnectedCount,
            Connecting: action.ConnectingCount,
            Disconnected: action.DisconnectedCount,
            Mounted: action.MountedCount,
            UnableToConnect: action.UnableToConnectCount,
            Undefined: action.UndefinedCount,
            Unmounted: action.UnmountedCount,
            total: action.totalCount,
            isLoadingConnectionStatusChart: action.isLoadingConnectionStatusChart
        };
    }
    return state;
};
