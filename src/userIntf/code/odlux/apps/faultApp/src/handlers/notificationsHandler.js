"use strict";
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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var notificationActions_1 = require("../actions/notificationActions");
var faultNotoficationsInit = {
    faults: [],
    since: new Date()
};
exports.faultNotificationsHandler = function (state, action) {
    if (state === void 0) { state = faultNotoficationsInit; }
    if (action instanceof notificationActions_1.AddFaultNotificationAction) {
        state = __assign(__assign({}, state), { faults: __spreadArrays(state.faults, [action.fault]) });
    }
    else if (action instanceof notificationActions_1.ResetFaultNotificationsAction) {
        state = __assign(__assign({}, state), { faults: [], since: new Date() });
    }
    return state;
};
