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
var User = /** @class */ (function () {
    function User(_bearerToken) {
        this._bearerToken = _bearerToken;
    }
    Object.defineProperty(User.prototype, "user", {
        get: function () {
            return this._bearerToken && this._bearerToken.username;
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(User.prototype, "token", {
        get: function () {
            return this._bearerToken && this._bearerToken.access_token;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(User.prototype, "tokenType", {
        get: function () {
            return this._bearerToken && this._bearerToken.token_type;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(User.prototype, "logoutAt", {
        /***
         * Time the user should be logged out, in unix timestamp in seconds
         */
        get: function () {
            return this._bearerToken && this._bearerToken.expires;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(User.prototype, "loginAt", {
        /***
        * Time the user logged in, in unix timestamp in seconds
        */
        get: function () {
            return this._bearerToken && this._bearerToken.issued;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(User.prototype, "isValid", {
        get: function () {
            return (this._bearerToken && (new Date().valueOf()) < this._bearerToken.expires * 1000) || false;
        },
        enumerable: true,
        configurable: true
    });
    User.prototype.toString = function () {
        return JSON.stringify(this._bearerToken);
    };
    User.fromString = function (data) {
        return new User(JSON.parse(data));
    };
    return User;
}());
exports.User = User;
