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
var titleActions_1 = require("../actions/titleActions");
var loginProvider_1 = require("../actions/loginProvider");
var snackbarActions_1 = require("../actions/snackbarActions");
var errorActions_1 = require("../actions/errorActions");
var menuAction_1 = require("../actions/menuAction");
var websocketAction_1 = require("../actions/websocketAction");
var settingsAction_1 = require("../actions/settingsAction");
var applicationStateInit = {
    title: "Loading ...",
    errors: [],
    snackBars: [],
    isMenuOpen: true,
    isMenuClosedByUser: false,
    isWebsocketAvailable: null,
    externalLoginProviders: null,
    authentication: "basic",
    enablePolicy: false,
    transportpceUrl: "",
    settings: {
        general: { areNotificationsEnabled: null },
        tables: {},
        isInitialLoadDone: false
    }
};
exports.configureApplication = function (config) {
    applicationStateInit.authentication = config.authentication === "oauth" ? "oauth" : "basic";
    applicationStateInit.enablePolicy = config.enablePolicy ? true : false;
    applicationStateInit.transportpceUrl = config.transportpceUrl == undefined ? "" : config.transportpceUrl;
};
exports.applicationStateHandler = function (state, action) {
    if (state === void 0) { state = applicationStateInit; }
    if (action instanceof titleActions_1.SetTitleAction) {
        state = __assign(__assign({}, state), { title: action.title, icon: action.icon, appId: action.appId });
    }
    else if (action instanceof errorActions_1.AddErrorInfoAction) {
        state = __assign(__assign({}, state), { errors: __spreadArrays(state.errors, [
                action.errorInfo,
            ]) });
    }
    else if (action instanceof errorActions_1.RemoveErrorInfoAction) {
        var index = state.errors.indexOf(action.errorInfo);
        if (index > -1) {
            state = __assign(__assign({}, state), { errors: __spreadArrays(state.errors.slice(0, index), state.errors.slice(index + 1)) });
        }
    }
    else if (action instanceof errorActions_1.ClearErrorInfoAction) {
        if (state.errors && state.errors.length) {
            state = __assign(__assign({}, state), { errors: [] });
        }
    }
    else if (action instanceof snackbarActions_1.AddSnackbarNotification) {
        state = __assign(__assign({}, state), { snackBars: __spreadArrays(state.snackBars, [
                action.notification,
            ]) });
    }
    else if (action instanceof snackbarActions_1.RemoveSnackbarNotification) {
        state = __assign(__assign({}, state), { snackBars: state.snackBars.filter(function (s) { return s.key !== action.key; }) });
    }
    else if (action instanceof menuAction_1.MenuAction) {
        state = __assign(__assign({}, state), { isMenuOpen: action.isOpen });
    }
    else if (action instanceof menuAction_1.MenuClosedByUser) {
        state = __assign(__assign({}, state), { isMenuClosedByUser: action.isClosed });
    }
    else if (action instanceof websocketAction_1.SetWebsocketAction) {
        state = __assign(__assign({}, state), { isWebsocketAvailable: action.isConnected });
    }
    else if (action instanceof loginProvider_1.SetExternalLoginProviderAction) {
        state = __assign(__assign({}, state), { externalLoginProviders: action.externalLoginProvders });
    }
    else if (action instanceof settingsAction_1.SetGeneralSettingsAction) {
        state = __assign(__assign({}, state), { settings: { tables: state.settings.tables, isInitialLoadDone: state.settings.isInitialLoadDone, general: { areNotificationsEnabled: action.areNoticationsActive } } });
    }
    else if (action instanceof settingsAction_1.SetTableSettings) {
        var tableUpdate = state.settings.tables;
        tableUpdate[action.tableName] = { columns: action.updatedColumns };
        state = __assign(__assign({}, state), { settings: { general: state.settings.general, isInitialLoadDone: state.settings.isInitialLoadDone, tables: tableUpdate } });
    }
    else if (action instanceof settingsAction_1.LoadSettingsAction) {
        state = __assign(__assign({}, state), { settings: action.settings });
    }
    else if (action instanceof settingsAction_1.SettingsDoneLoadingAction) {
        state = __assign(__assign({}, state), { settings: __assign(__assign({}, state.settings), { isInitialLoadDone: true }) });
    }
    return state;
};
