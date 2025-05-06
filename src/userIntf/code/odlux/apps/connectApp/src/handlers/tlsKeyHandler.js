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
var tlsKeyActions_1 = require("../actions/tlsKeyActions");
var tlsKeysStateInit = {
    tlsKeysList: [],
    busy: false
};
exports.availableTlsKeysActionHandler = function (state, action) {
    if (state === void 0) { state = tlsKeysStateInit; }
    if (action instanceof tlsKeyActions_1.LoadAllTlsKeyListAction) {
        state = __assign(__assign({}, state), { busy: true });
    }
    else if (action instanceof tlsKeyActions_1.AllTlsKeyListLoadedAction) {
        if (!action.error && action.tlsList) {
            state = __assign(__assign({}, state), { tlsKeysList: action.tlsList, busy: false });
        }
        else {
            state = __assign(__assign({}, state), { busy: false });
        }
    }
    return state;
};
