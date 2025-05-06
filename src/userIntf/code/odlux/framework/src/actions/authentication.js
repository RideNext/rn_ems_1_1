"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var action_1 = require("../flux/action");
var settingsAction_1 = require("./settingsAction");
var notificationService_1 = require("../services/notificationService");
var userSessionService_1 = require("../services/userSessionService");
var UpdateUser = /** @class */ (function (_super) {
    __extends(UpdateUser, _super);
    function UpdateUser(user) {
        var _this = _super.call(this) || this;
        _this.user = user;
        return _this;
    }
    return UpdateUser;
}(action_1.Action));
exports.UpdateUser = UpdateUser;
var UpdatePolicies = /** @class */ (function (_super) {
    __extends(UpdatePolicies, _super);
    function UpdatePolicies(authPolicies) {
        var _this = _super.call(this) || this;
        _this.authPolicies = authPolicies;
        return _this;
    }
    return UpdatePolicies;
}(action_1.Action));
exports.UpdatePolicies = UpdatePolicies;
exports.logoutUser = function () { return function (dispatcher, getState) {
    var _a = getState().framework, authentication = _a.applicationState.authentication, user = _a.authenticationState.user;
    dispatcher(new UpdateUser(undefined));
    dispatcher(new settingsAction_1.SetGeneralSettingsAction(null));
    notificationService_1.endWebsocketSession();
    userSessionService_1.endUserSession();
    localStorage.removeItem('userToken');
    localStorage.removeItem("configData");
    localStorage.removeItem("yangdataArray");
    localStorage.removeItem('KIPdata');
    //only call if a user is currently logged in
    if (authentication === 'oauth' && user) {
        var url = window.location.origin;
        window.location.href = url + "/oauth/logout";
    }
}; };
/**
 * Loads the user settings for the given user and dispatches a `saveInitialSettings` action with the result.
 * @param user The user for which to load the settings.
 * @param dispatcher The dispatcher function to use for dispatching the `saveInitialSettings` action.
 */
var loadUserSettings = function (user, dispatcher) {
    // fetch used, because state change for user login is not done when frameworks restRequest call is started (and is accordingly undefined -> /userdata call yields 401, unauthorized) and triggering an action from inside the handler / login event is impossible
    // no timeout used, because it's bad practice to add a timeout to hopefully avoid a race condition
    // hence, fetch used to simply use supplied user data for getting settings
    if (user && user.isValid) {
        fetch('/userdata', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': user.tokenType + " " + user.token
            }
        }).then(function (res) {
            if (res.status == 200) {
                return res.json();
            }
            else {
                return null;
            }
        }).then(function (result) {
            dispatcher(settingsAction_1.saveInitialSettings(result));
        });
    }
};
/**
 * Dispatches an `UpdateUser` action with the given user and starts a user session if the user is defined.
 * Also loads the user settings for the given user and dispatches a `saveInitialSettings` action with the result.
 * Finally, saves the user token to local storage.
 * @param user The user to be logged in.
 * @param dispatcher The dispatcher function to use for dispatching the actions.
 */
exports.loginUserAction = function (user) { return function (dispatcher) {
    dispatcher(new UpdateUser(user));
    if (user) {
        userSessionService_1.startUserSession(user);
        loadUserSettings(user, dispatcher);
        localStorage.setItem('userToken', user.toString());
    }
}; };
