"use strict";
/**
 * ============LICENSE_START========================================================================
 * ONAP : ccsdk feature sdnr wt odlux
 * =================================================================================================
 * Copyright (C) 2019 highstreet technologies GmbH Intellectual Property. All rights reserved.
 * =================================================================================================
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License
 * is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
 * or implied. See the License for the specific language governing permissions and limitations under
 * the License.
 * ============LICENSE_END==========================================================================
 */
exports.__esModule = true;
var authentication_1 = require("../actions/authentication");
var navigationActions_1 = require("../actions/navigationActions");
var currentUser;
var applicationStore = null;
var timer = null;
exports.startUserSessionService = function (store) {
    applicationStore = store;
};
exports.startUserSession = function (user) {
    console.log("user session started...");
    var currentTime = new Date();
    //get time differnce between login time and now (eg after user refreshes page)
    var timeDiffernce = (currentTime.valueOf() / 1000 - user.loginAt);
    currentUser = user;
    if (process.env.NODE_ENV === "development") {
        //console.warn("logout timer not started in development mode");
        var expiresIn = (user.logoutAt - user.loginAt) - timeDiffernce;
        console.log("user should be logged out in: " + expiresIn / 60 + "minutes");
        createForceLogoutInterval(expiresIn);
    }
    else {
        var expiresIn = (user.logoutAt - user.loginAt) - timeDiffernce;
        console.log("user should be logged out in: " + expiresIn / 60 + "minutes");
        createForceLogoutInterval(expiresIn);
    }
};
var createForceLogoutInterval = function (intervalInSec) {
    console.log("logout timer running...");
    if (timer !== null) {
        console.error("an old session was available");
        clearTimeout(timer);
    }
    timer = setTimeout(function () {
        if (currentUser && applicationStore) {
            applicationStore.dispatch(authentication_1.logoutUser());
            applicationStore.dispatch(new navigationActions_1.ReplaceAction("/login"));
        }
    }, intervalInSec * 1000);
};
exports.endUserSession = function () {
    if (timer !== null) {
        clearTimeout(timer);
        timer = null;
    }
};
