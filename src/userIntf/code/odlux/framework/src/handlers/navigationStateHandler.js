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
var navigationActions_1 = require("../actions/navigationActions");
var navigationStateInit = {
    pathname: '/',
    search: '',
    hash: ''
};
exports.navigationStateHandler = function (state, action) {
    if (state === void 0) { state = navigationStateInit; }
    if (action instanceof navigationActions_1.LocationChanged) {
        state = __assign(__assign({}, state), { pathname: action.pathname, search: action.search, hash: action.hash });
    }
    return state;
};
