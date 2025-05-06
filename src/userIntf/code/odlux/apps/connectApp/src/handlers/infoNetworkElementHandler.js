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
var infoNetworkElementActions_1 = require("../actions/infoNetworkElementActions");
var infoNetworkElementsStateInit = {
    elementInfo: {
        'node-id': '',
        'netconf-node-topology:available-capabilities': {
            'available-capability': []
        }
    },
    busy: false
};
var infoNetworkElementFeaturesStateInit = {
    elementFeatureInfo: [],
    busy: false
};
exports.infoNetworkElementsActionHandler = function (state, action) {
    if (state === void 0) { state = infoNetworkElementsStateInit; }
    if (action instanceof infoNetworkElementActions_1.LoadAllElementInfoAction) {
        state = __assign(__assign({}, state), { busy: true });
    }
    else if (action instanceof infoNetworkElementActions_1.AllElementInfoLoadedAction) {
        if (!action.error && action.elementInfo) {
            state = __assign(__assign({}, state), { elementInfo: action.elementInfo, busy: false });
        }
        else {
            state = __assign(__assign({}, state), { busy: false });
        }
    }
    return state;
};
exports.infoNetworkElementFeaturesActionHandler = function (state, action) {
    if (state === void 0) { state = infoNetworkElementFeaturesStateInit; }
    if (action instanceof infoNetworkElementActions_1.LoadAllElementInfoAction) {
        state = __assign(__assign({}, state), { busy: true });
    }
    else if (action instanceof infoNetworkElementActions_1.AllElementInfoFeatureLoadedAction) {
        if (!action.error && action.elementFeatureInfo) {
            state = __assign(__assign({}, state), { elementFeatureInfo: action.elementFeatureInfo, busy: false });
        }
        else {
            state = __assign(__assign({}, state), { busy: false });
        }
    }
    return state;
};
