"use strict";
exports.__esModule = true;
var applicationManager_1 = require("../services/applicationManager");
var applicationRegistrationInit = applicationManager_1.applicationManager.applications;
exports.applicationRegistryHandler = function (state, action) {
    if (state === void 0) { state = applicationRegistrationInit; }
    return state;
};
