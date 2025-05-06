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
exports.__esModule = true;
var authentication_1 = require("../actions/authentication");
var applicationApi_1 = require("../services/applicationApi");
var authenticationStateInit = {
    user: undefined
};
exports.authenticationStateHandler = function (state, action) {
    if (state === void 0) { state = authenticationStateInit; }
    if (action instanceof authentication_1.UpdateUser) {
        var user = action.user;
        if (user) {
            applicationApi_1.onLogin();
        }
        else {
            applicationApi_1.onLogout();
        }
        state = __assign(__assign({}, state), { user: user });
    }
    else if (action instanceof authentication_1.UpdatePolicies) {
        state = __assign(__assign({}, state), { policies: action.authPolicies });
    }
    return state;
};
