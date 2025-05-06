"use strict";
exports.__esModule = true;
var applicationStore = null;
exports.startSoreService = function (store) {
    applicationStore = store;
};
exports.storeService = {
    get applicationStore() { return applicationStore; }
};
