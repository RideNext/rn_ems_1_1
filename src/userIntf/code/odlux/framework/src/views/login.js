"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
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
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var Alert_1 = require("@mui/material/Alert");
var Avatar_1 = require("@mui/material/Avatar");
var Button_1 = require("@mui/material/Button");
var CssBaseline_1 = require("@mui/material/CssBaseline");
var FormControl_1 = require("@mui/material/FormControl");
var Input_1 = require("@mui/material/Input");
var InputLabel_1 = require("@mui/material/InputLabel");
var Paper_1 = require("@mui/material/Paper");
var Typography_1 = require("@mui/material/Typography");
var styles_1 = require("@mui/styles");
var connect_1 = require("../flux/connect");
var authenticationService_1 = require("../services/authenticationService");
var authentication_1 = require("../actions/authentication");
var loginProvider_1 = require("../actions/loginProvider");
var authentication_2 = require("../models/authentication");
var loginIcon = require('../assets/icons/User.svg');
var styles = styles_1.makeStyles(function (theme) {
    var _a;
    return {
        layout: (_a = {
                width: 'auto',
                display: 'block',
                marginLeft: theme.spacing(3),
                marginRight: theme.spacing(3)
            },
            _a[theme.breakpoints.up(400 + Number(theme.spacing(3).replace('px', '')) * 2)] = {
                width: 400,
                marginLeft: 'auto',
                marginRight: 'auto'
            },
            _a),
        paper: {
            marginTop: theme.spacing(8),
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: theme.spacing(2) + " " + theme.spacing(3) + " " + theme.spacing(3)
        },
        avatar: {
            margin: theme.spacing(1),
            backgroundColor: theme.palette.secondary.main
        },
        form: {
            width: '100%',
            marginTop: theme.spacing(1)
        },
        submit: {
            marginTop: theme.spacing(3)
        },
        lineContainer: {
            width: '100%',
            height: 10,
            borderBottom: '1px solid grey',
            textAlign: 'center',
            marginTop: 15,
            marginBottom: 5
        },
        thirdPartyDivider: {
            fontSize: 15,
            backgroundColor: 'white',
            padding: '0 10px',
            color: 'grey'
        }
    };
});
// todo: ggf. redirect to einbauen
var LoginComponent = function (props) {
    var search = connect_1.useSelectApplicationState(function (state) { return state.framework.navigationState.search; });
    var authentication = connect_1.useSelectApplicationState(function (state) { return state.framework.applicationState.authentication; });
    var externalLoginProviders = connect_1.useSelectApplicationState(function (state) { return state.framework.applicationState.externalLoginProviders; });
    var dispatch = connect_1.useApplicationDispatch();
    var updateExternalProviders = function () { return dispatch(loginProvider_1.updateExternalLoginProviderAsyncActionCreator()); };
    var updateAuthentication = function (token) {
        var user = token && new authentication_2.User(token) || undefined;
        dispatch(authentication_1.loginUserAction(user));
    };
    var updatePolicies = function (policies) {
        return dispatch(new authentication_1.UpdatePolicies(policies));
    };
    var _a = react_1.useState(false), isBusy = _a[0], setBusy = _a[1];
    var _b = react_1.useState(""), username = _b[0], setUsername = _b[1];
    var _c = react_1.useState(""), password = _c[0], setPassword = _c[1];
    var _d = react_1.useState("sdn"), scope = _d[0], setScope = _d[1];
    var _e = react_1.useState(""), message = _e[0], setMessage = _e[1];
    var _f = react_1.useState(false), isServerReady = _f[0], setIsServerReady = _f[1];
    react_1.useEffect(function () {
        if (authentication === "oauth" && (externalLoginProviders == null || externalLoginProviders.length === 0)) {
            updateExternalProviders();
        }
        authenticationService_1["default"].getServerReadyState().then(function (result) {
            setIsServerReady(result);
        });
    }, []);
    var onSignIn = function (event) { return __awaiter(void 0, void 0, void 0, function () {
        var token, _a, query, returnTo, ready;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    event.preventDefault();
                    setBusy(true);
                    if (!(authentication === "oauth")) return [3 /*break*/, 2];
                    return [4 /*yield*/, authenticationService_1["default"].authenticateUserOAuth(username, password, scope)];
                case 1:
                    _a = _b.sent();
                    return [3 /*break*/, 4];
                case 2: return [4 /*yield*/, authenticationService_1["default"].authenticateUserBasicAuth(username, password, scope)];
                case 3:
                    _a = _b.sent();
                    _b.label = 4;
                case 4:
                    token = _a;
                    updateAuthentication(token);
                    setBusy(false);
                    if (!token) return [3 /*break*/, 5];
                    query = search && search.replace(/^\?/, "").split('&').map(function (e) { return e.split("="); });
                    returnTo = query && query.find(function (e) { return e[0] === "returnTo"; });
                    props.history.replace(returnTo && returnTo[1] || "/");
                    return [3 /*break*/, 8];
                case 5:
                    if (!!isServerReady) return [3 /*break*/, 7];
                    return [4 /*yield*/, authenticationService_1["default"].getServerReadyState()];
                case 6:
                    ready = _b.sent();
                    if (ready) {
                        setIsServerReady(true);
                    }
                    else {
                        setMessage("Login is currently not possible. Please re-try in a few minutes. If the problem persists, ask your administrator for assistance.");
                    }
                    return [3 /*break*/, 8];
                case 7:
                    setMessage("Could not log in. Please check your credentials or ask your administrator for assistance.");
                    setPassword("");
                    _b.label = 8;
                case 8: return [2 /*return*/];
            }
        });
    }); };
    var classes = styles();
    var areProvidersAvailable = externalLoginProviders && externalLoginProviders.length > 0;
    return (<>
      <CssBaseline_1["default"] />
      <main className={classes.layout}>
        <Paper_1["default"] className={classes.paper}>
          <Avatar_1["default"] className={classes.avatar}>
            <img src={loginIcon} alt="loginIcon"/>
          </Avatar_1["default"]>
          <Typography_1["default"] variant="caption">Sign in</Typography_1["default"]>
          <form className={classes.form}>
            {areProvidersAvailable &&
        <>
                {externalLoginProviders.map(function (provider, index) { return (<Button_1["default"] aria-controls="externalLogin" aria-label={"external-login-identity-provider-" + (index + 1)} aria-haspopup="true" fullWidth variant="contained" color="inherit" className={classes.submit} onClick={function () { window.location = provider.loginUrl; }}>
                      {provider.title}
                    </Button_1["default"]>); })}
                <div className={classes.lineContainer}>
                  <span className={classes.thirdPartyDivider}>
                    OR
                  </span>
                </div>
              </>}
            <FormControl_1["default"] variant="standard" margin="normal" required fullWidth>
              <InputLabel_1["default"] htmlFor="username">Username</InputLabel_1["default"]>
              <Input_1["default"] id="username" name="username" autoComplete="username" autoFocus disabled={isBusy} value={username} onChange={function (event) { setUsername(event.target.value); }}/>
            </FormControl_1["default"]>
            <FormControl_1["default"] variant="standard" margin="normal" required fullWidth>
              <InputLabel_1["default"] htmlFor="password">Password</InputLabel_1["default"]>
              <Input_1["default"] name="password" type="password" id="password" autoComplete="current-password" disabled={isBusy} value={password} onChange={function (event) { setPassword(event.target.value); }}/>
            </FormControl_1["default"]>
            <FormControl_1["default"] variant="standard" margin="normal" required fullWidth>
              <InputLabel_1["default"] htmlFor="password">Domain</InputLabel_1["default"]>
              <Input_1["default"] name="scope" type="scope" id="scope" disabled={isBusy} value={scope} onChange={function (event) { setScope(event.target.value); }}/>
            </FormControl_1["default"]>
            <Button_1["default"] aria-label="login-button" type="submit" fullWidth variant="contained" color="inherit" disabled={isBusy} className={classes.submit} onClick={onSignIn}>
              Sign in
            </Button_1["default"]>

          </form>
          {message && <Alert_1["default"] severity="error">{message}</Alert_1["default"]>}
        </Paper_1["default"]>
      </main>
    </>);
};
exports.Login = react_router_dom_1.withRouter(LoginComponent);
exports["default"] = exports.Login;
