"use strict";
exports.__esModule = true;
var event_1 = require("../common/event");
var applicationApi_1 = require("./applicationApi");
/** Represents registry to manage all applications. */
var ApplicationManager = /** @class */ (function () {
    /** Initializes a new instance of this class. */
    function ApplicationManager() {
        this._applications = {};
        this.changed = new event_1.Event();
    }
    /** Registers a new application. */
    ApplicationManager.prototype.registerApplication = function (applicationInfo) {
        this._applications[applicationInfo.name] = applicationInfo;
        this.changed.invoke();
        return applicationApi_1.applicationApi;
    };
    Object.defineProperty(ApplicationManager.prototype, "applications", {
        /** Gets all registered applications. */
        get: function () {
            return this._applications;
        },
        enumerable: true,
        configurable: true
    });
    return ApplicationManager;
}());
/** A singleton instance of the application manager. */
exports.applicationManager = new ApplicationManager();
exports["default"] = exports.applicationManager;
