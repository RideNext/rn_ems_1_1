(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("app"), require("vendor"));
	else if(typeof define === 'function' && define.amd)
		define(["app", "vendor"], factory);
	else if(typeof exports === 'object')
		exports["users"] = factory(require("app"), require("vendor"));
	else
		root["users"] = factory(root["app"], root["vendor"]);
})(window, function(__WEBPACK_EXTERNAL_MODULE_dll_reference_app__, __WEBPACK_EXTERNAL_MODULE_dll_reference_vendor__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "../../../framework/src/actions/navigationActions.ts":
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__("dll-reference app"))("./actions/navigationActions.ts");

/***/ }),

/***/ "../../../framework/src/actions/snackbarActions.ts":
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__("dll-reference app"))("./actions/snackbarActions.ts");

/***/ }),

/***/ "../../../framework/src/components/material-table/index.tsx":
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__("dll-reference app"))("./components/material-table/index.tsx");

/***/ }),

/***/ "../../../framework/src/components/material-table/utilities.ts":
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__("dll-reference app"))("./components/material-table/utilities.ts");

/***/ }),

/***/ "../../../framework/src/flux/action.ts":
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__("dll-reference app"))("./flux/action.ts");

/***/ }),

/***/ "../../../framework/src/flux/connect.tsx":
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__("dll-reference app"))("./flux/connect.tsx");

/***/ }),

/***/ "../../../framework/src/flux/middleware.ts":
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__("dll-reference app"))("./flux/middleware.ts");

/***/ }),

/***/ "../../../framework/src/services/applicationManager.ts":
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__("dll-reference app"))("./services/applicationManager.ts");

/***/ }),

/***/ "../../../framework/src/services/restService.ts":
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__("dll-reference app"))("./services/restService.ts");

/***/ }),

/***/ "../../../framework/src/utilities/elasticSearch.ts":
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__("dll-reference app"))("./utilities/elasticSearch.ts");

/***/ }),

/***/ "../../../node_modules/@babel/runtime/helpers/interopRequireDefault.js":
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__("dll-reference app"))("../../node_modules/@babel/runtime/helpers/interopRequireDefault.js");

/***/ }),

/***/ "../../../node_modules/@mui/icons-material/Add.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__("../../../node_modules/@babel/runtime/helpers/interopRequireDefault.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _createSvgIcon = _interopRequireDefault(__webpack_require__("../../../node_modules/@mui/icons-material/utils/createSvgIcon.js"));
var _jsxRuntime = __webpack_require__("../../../node_modules/react/jsx-runtime.js");
var _default = (0, _createSvgIcon.default)( /*#__PURE__*/(0, _jsxRuntime.jsx)("path", {
  d: "M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"
}), 'Add');
exports.default = _default;

/***/ }),

/***/ "../../../node_modules/@mui/icons-material/Delete.js":
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__("dll-reference app"))("../../node_modules/@mui/icons-material/Delete.js");

/***/ }),

/***/ "../../../node_modules/@mui/icons-material/Edit.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__("../../../node_modules/@babel/runtime/helpers/interopRequireDefault.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _createSvgIcon = _interopRequireDefault(__webpack_require__("../../../node_modules/@mui/icons-material/utils/createSvgIcon.js"));
var _jsxRuntime = __webpack_require__("../../../node_modules/react/jsx-runtime.js");
var _default = (0, _createSvgIcon.default)( /*#__PURE__*/(0, _jsxRuntime.jsx)("path", {
  d: "M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"
}), 'Edit');
exports.default = _default;

/***/ }),

/***/ "../../../node_modules/@mui/icons-material/LockReset.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__("../../../node_modules/@babel/runtime/helpers/interopRequireDefault.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _createSvgIcon = _interopRequireDefault(__webpack_require__("../../../node_modules/@mui/icons-material/utils/createSvgIcon.js"));
var _jsxRuntime = __webpack_require__("../../../node_modules/react/jsx-runtime.js");
var _default = (0, _createSvgIcon.default)( /*#__PURE__*/(0, _jsxRuntime.jsx)("path", {
  d: "M13 3c-4.97 0-9 4.03-9 9H1l4 4 4-4H6c0-3.86 3.14-7 7-7s7 3.14 7 7-3.14 7-7 7c-1.9 0-3.62-.76-4.88-1.99L6.7 18.42C8.32 20.01 10.55 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm2 8v-1c0-1.1-.9-2-2-2s-2 .9-2 2v1c-.55 0-1 .45-1 1v3c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-3c0-.55-.45-1-1-1zm-1 0h-2v-1c0-.55.45-1 1-1s1 .45 1 1v1z"
}), 'LockReset');
exports.default = _default;

/***/ }),

/***/ "../../../node_modules/@mui/icons-material/Refresh.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__("../../../node_modules/@babel/runtime/helpers/interopRequireDefault.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _createSvgIcon = _interopRequireDefault(__webpack_require__("../../../node_modules/@mui/icons-material/utils/createSvgIcon.js"));
var _jsxRuntime = __webpack_require__("../../../node_modules/react/jsx-runtime.js");
var _default = (0, _createSvgIcon.default)( /*#__PURE__*/(0, _jsxRuntime.jsx)("path", {
  d: "M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"
}), 'Refresh');
exports.default = _default;

/***/ }),

/***/ "../../../node_modules/@mui/icons-material/utils/createSvgIcon.js":
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__("dll-reference app"))("../../node_modules/@mui/icons-material/utils/createSvgIcon.js");

/***/ }),

/***/ "../../../node_modules/@mui/material/Button/index.js":
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__("dll-reference app"))("../../node_modules/@mui/material/Button/index.js");

/***/ }),

/***/ "../../../node_modules/@mui/material/Dialog/index.js":
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__("dll-reference app"))("../../node_modules/@mui/material/Dialog/index.js");

/***/ }),

/***/ "../../../node_modules/@mui/material/DialogActions/index.js":
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__("dll-reference app"))("../../node_modules/@mui/material/DialogActions/index.js");

/***/ }),

/***/ "../../../node_modules/@mui/material/DialogContent/index.js":
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__("dll-reference app"))("../../node_modules/@mui/material/DialogContent/index.js");

/***/ }),

/***/ "../../../node_modules/@mui/material/DialogContentText/index.js":
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__("dll-reference app"))("../../node_modules/@mui/material/DialogContentText/index.js");

/***/ }),

/***/ "../../../node_modules/@mui/material/DialogTitle/index.js":
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__("dll-reference app"))("../../node_modules/@mui/material/DialogTitle/index.js");

/***/ }),

/***/ "../../../node_modules/@mui/material/IconButton/index.js":
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__("dll-reference app"))("../../node_modules/@mui/material/IconButton/index.js");

/***/ }),

/***/ "../../../node_modules/@mui/material/TextField/index.js":
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__("dll-reference vendor"))("../../node_modules/@mui/material/TextField/index.js");

/***/ }),

/***/ "../../../node_modules/@mui/material/index.js":
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__("dll-reference app"))("../../node_modules/@mui/material/index.js");

/***/ }),

/***/ "../../../node_modules/@mui/styles/createStyles/index.js":
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__("dll-reference app"))("../../node_modules/@mui/styles/createStyles/index.js");

/***/ }),

/***/ "../../../node_modules/@mui/styles/withStyles/index.js":
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__("dll-reference app"))("../../node_modules/@mui/styles/withStyles/index.js");

/***/ }),

/***/ "../../../node_modules/axios/index.js":
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__("dll-reference app"))("../../node_modules/axios/index.js");

/***/ }),

/***/ "../../../node_modules/core-js/modules/web.dom.iterable.js":
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__("dll-reference app"))("../../node_modules/core-js/modules/web.dom.iterable.js");

/***/ }),

/***/ "../../../node_modules/react-router-dom/esm/react-router-dom.js":
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__("dll-reference app"))("../../node_modules/react-router-dom/esm/react-router-dom.js");

/***/ }),

/***/ "../../../node_modules/react/index.js":
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__("dll-reference app"))("../../node_modules/react/index.js");

/***/ }),

/***/ "../../../node_modules/react/jsx-runtime.js":
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__("dll-reference app"))("../../node_modules/react/jsx-runtime.js");

/***/ }),

/***/ "../../../node_modules/regenerator-runtime/runtime.js":
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__("dll-reference app"))("../../node_modules/regenerator-runtime/runtime.js");

/***/ }),

/***/ "./actions/avaliableuserServersActions.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BaseAction", function() { return BaseAction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addAvaliableuserServerAsyncActionCreator", function() { return addAvaliableuserServerAsyncActionCreator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateAvaliableuserServerAsyncActionCreator", function() { return updateAvaliableuserServerAsyncActionCreator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "resetpasswordAvaliableuserServerAsyncActionCreator", function() { return resetpasswordAvaliableuserServerAsyncActionCreator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeAvaliableuserServerAsyncActionCreator", function() { return removeAvaliableuserServerAsyncActionCreator; });
/* harmony import */ var _framework_src_flux_action__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../../framework/src/flux/action.ts");
/* harmony import */ var _framework_src_actions_snackbarActions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../../framework/src/actions/snackbarActions.ts");
/* harmony import */ var _handlers_avaliableuserServersHandler__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./handlers/avaliableuserServersHandler.ts");
/* harmony import */ var _services_userService__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./services/userService.ts");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _this = undefined;
function _newArrowCheck(n, r) { if (n !== r) throw new TypeError("Cannot instantiate an arrow function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
/**
 * ============LICENSE_START========================================================================
 * ONAP : ccsdk feature sdnr wt odlux
 * =================================================================================================
 * Copyright (C) 2024 RideNext Software Solutions. Pvt Ltd.  All rights reserved
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




/** Represents the base action. */
var BaseAction = /*#__PURE__*/function (_Action) {
  function BaseAction() {
    _classCallCheck(this, BaseAction);
    return _callSuper(this, BaseAction, arguments);
  }
  _inherits(BaseAction, _Action);
  return _createClass(BaseAction);
}(_framework_src_flux_action__WEBPACK_IMPORTED_MODULE_0__["Action"]);
/** Represents an async thunk action that will add a server to the avaliable user servers. */
var addAvaliableuserServerAsyncActionCreator = function addAvaliableuserServerAsyncActionCreator(server) {
  var _this2 = this;
  _newArrowCheck(this, _this);
  return function (dispatch) {
    var _this3 = this;
    _newArrowCheck(this, _this2);
    _services_userService__WEBPACK_IMPORTED_MODULE_3__["default"].insertuserServer(server).then(function (_) {
      var _this4 = this;
      _newArrowCheck(this, _this3);
      window.setTimeout(function () {
        _newArrowCheck(this, _this4);
        dispatch(_handlers_avaliableuserServersHandler__WEBPACK_IMPORTED_MODULE_2__["avaliableuserServersReloadAction"]);
        dispatch(new _framework_src_actions_snackbarActions__WEBPACK_IMPORTED_MODULE_1__["AddSnackbarNotification"]({
          message: "Successfully added >>> 2 [".concat(server.id, "]"),
          options: {
            variant: 'success'
          }
        }));
      }.bind(this), 900);
    }.bind(this));
  }.bind(this);
}.bind(undefined);
/** Represents an async thunk action that will add a server to the avaliable user servers. */
var updateAvaliableuserServerAsyncActionCreator = function updateAvaliableuserServerAsyncActionCreator(server) {
  var _this5 = this;
  _newArrowCheck(this, _this);
  return function (dispatch) {
    var _this6 = this;
    _newArrowCheck(this, _this5);
    _services_userService__WEBPACK_IMPORTED_MODULE_3__["default"].updateuserServer(server).then(function (_) {
      var _this7 = this;
      _newArrowCheck(this, _this6);
      window.setTimeout(function () {
        _newArrowCheck(this, _this7);
        dispatch(_handlers_avaliableuserServersHandler__WEBPACK_IMPORTED_MODULE_2__["avaliableuserServersReloadAction"]);
        dispatch(new _framework_src_actions_snackbarActions__WEBPACK_IMPORTED_MODULE_1__["AddSnackbarNotification"]({
          message: "Successfully updated [".concat(server.id, "]"),
          options: {
            variant: 'success'
          }
        }));
      }.bind(this), 900);
    }.bind(this));
  }.bind(this);
}.bind(undefined);
var resetpasswordAvaliableuserServerAsyncActionCreator = function resetpasswordAvaliableuserServerAsyncActionCreator(server) {
  var _this8 = this;
  _newArrowCheck(this, _this);
  return function (dispatch) {
    var _this9 = this;
    _newArrowCheck(this, _this8);
    _services_userService__WEBPACK_IMPORTED_MODULE_3__["default"].resetPasswordServer(server).then(function (_) {
      var _this10 = this;
      _newArrowCheck(this, _this9);
      window.setTimeout(function () {
        _newArrowCheck(this, _this10);
        dispatch(_handlers_avaliableuserServersHandler__WEBPACK_IMPORTED_MODULE_2__["avaliableuserServersReloadAction"]);
        dispatch(new _framework_src_actions_snackbarActions__WEBPACK_IMPORTED_MODULE_1__["AddSnackbarNotification"]({
          message: "Successfully ResetPassword [".concat(server.id, "]"),
          options: {
            variant: 'success'
          }
        }));
      }.bind(this), 900);
    }.bind(this));
  }.bind(this);
}.bind(undefined);
/** Represents an async thunk action that will delete a server from the avaliable user servers. */
var removeAvaliableuserServerAsyncActionCreator = function removeAvaliableuserServerAsyncActionCreator(server) {
  var _this11 = this;
  _newArrowCheck(this, _this);
  return function (dispatch) {
    var _this12 = this;
    _newArrowCheck(this, _this11);
    _services_userService__WEBPACK_IMPORTED_MODULE_3__["default"].deleteuserServer(server).then(function (_) {
      var _this13 = this;
      _newArrowCheck(this, _this12);
      window.setTimeout(function () {
        _newArrowCheck(this, _this13);
        dispatch(_handlers_avaliableuserServersHandler__WEBPACK_IMPORTED_MODULE_2__["avaliableuserServersReloadAction"]);
        dispatch(new _framework_src_actions_snackbarActions__WEBPACK_IMPORTED_MODULE_1__["AddSnackbarNotification"]({
          message: "Successfully removed [".concat(server.id, "]"),
          options: {
            variant: 'success'
          }
        }));
      }.bind(this), 900);
    }.bind(this));
  }.bind(this);
}.bind(undefined);

/***/ }),

/***/ "./actions/userServerActions.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BaseAction", function() { return BaseAction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SetuserServerBusy", function() { return SetuserServerBusy; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SetuserServerInfo", function() { return SetuserServerInfo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SetuserServerVersion", function() { return SetuserServerVersion; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SetAlluserServerConfigurations", function() { return SetAlluserServerConfigurations; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SetuserServerSupportedDevices", function() { return SetuserServerSupportedDevices; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SetuserServerReachable", function() { return SetuserServerReachable; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initializeuserServerAsyncActionCreator", function() { return initializeuserServerAsyncActionCreator; });
/* harmony import */ var _framework_src_flux_action__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../../framework/src/flux/action.ts");
/* harmony import */ var _services_userService__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./services/userService.ts");
/* harmony import */ var _framework_src_actions_snackbarActions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../../../framework/src/actions/snackbarActions.ts");
/* harmony import */ var _framework_src_actions_navigationActions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("../../../framework/src/actions/navigationActions.ts");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _this7 = undefined;
function _newArrowCheck(n, r) { if (n !== r) throw new TypeError("Cannot instantiate an arrow function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
/**
 * ============LICENSE_START========================================================================
 * ONAP : ccsdk feature sdnr wt odlux
 * =================================================================================================
 * Copyright (C) 2024 RideNext Software Solutions. Pvt Ltd.  All rights reserved
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




/** Represents the base action. */
var BaseAction = /*#__PURE__*/function (_Action) {
  function BaseAction() {
    _classCallCheck(this, BaseAction);
    return _callSuper(this, BaseAction, arguments);
  }
  _inherits(BaseAction, _Action);
  return _createClass(BaseAction);
}(_framework_src_flux_action__WEBPACK_IMPORTED_MODULE_0__["Action"]);
var SetuserServerBusy = /*#__PURE__*/function (_BaseAction) {
  function SetuserServerBusy(isBusy) {
    var _this;
    _classCallCheck(this, SetuserServerBusy);
    _this = _callSuper(this, SetuserServerBusy);
    _this.isBusy = isBusy;
    return _this;
  }
  _inherits(SetuserServerBusy, _BaseAction);
  return _createClass(SetuserServerBusy);
}(BaseAction);
var SetuserServerInfo = /*#__PURE__*/function (_BaseAction2) {
  /**
   * Initializes a new instance of this class.
   */
  function SetuserServerInfo(id, name, url) {
    var _this2;
    _classCallCheck(this, SetuserServerInfo);
    _this2 = _callSuper(this, SetuserServerInfo);
    _this2.id = id;
    _this2.name = name;
    _this2.url = url;
    return _this2;
  }
  _inherits(SetuserServerInfo, _BaseAction2);
  return _createClass(SetuserServerInfo);
}(BaseAction);
var SetuserServerVersion = /*#__PURE__*/function (_BaseAction3) {
  /**
   * Initializes a new instance of this class.
   */
  function SetuserServerVersion(versionInfo) {
    var _this3;
    _classCallCheck(this, SetuserServerVersion);
    _this3 = _callSuper(this, SetuserServerVersion);
    _this3.versionInfo = versionInfo;
    return _this3;
  }
  _inherits(SetuserServerVersion, _BaseAction3);
  return _createClass(SetuserServerVersion);
}(BaseAction);
var SetAlluserServerConfigurations = /*#__PURE__*/function (_BaseAction4) {
  /**
   * Initializes a new instance of this class.
   */
  function SetAlluserServerConfigurations(allConfigurations) {
    var _this4;
    _classCallCheck(this, SetAlluserServerConfigurations);
    _this4 = _callSuper(this, SetAlluserServerConfigurations);
    _this4.allConfigurations = allConfigurations;
    return _this4;
  }
  _inherits(SetAlluserServerConfigurations, _BaseAction4);
  return _createClass(SetAlluserServerConfigurations);
}(BaseAction);
var SetuserServerSupportedDevices = /*#__PURE__*/function (_BaseAction5) {
  /**
   * Initializes a new instance of this class.
   */
  function SetuserServerSupportedDevices(devices) {
    var _this5;
    _classCallCheck(this, SetuserServerSupportedDevices);
    _this5 = _callSuper(this, SetuserServerSupportedDevices);
    _this5.devices = devices;
    return _this5;
  }
  _inherits(SetuserServerSupportedDevices, _BaseAction5);
  return _createClass(SetuserServerSupportedDevices);
}(BaseAction);
var SetuserServerReachable = /*#__PURE__*/function (_BaseAction6) {
  function SetuserServerReachable(isReachable) {
    var _this6;
    _classCallCheck(this, SetuserServerReachable);
    _this6 = _callSuper(this, SetuserServerReachable);
    _this6.isReachable = isReachable;
    return _this6;
  }
  _inherits(SetuserServerReachable, _BaseAction6);
  return _createClass(SetuserServerReachable);
}(BaseAction);
var initializeuserServerAsyncActionCreator = function initializeuserServerAsyncActionCreator(serverId) {
  var _this8 = this;
  _newArrowCheck(this, _this7);
  return function (dispatch) {
    var _this9 = this;
    _newArrowCheck(this, _this8);
    dispatch(new SetuserServerBusy(true));
    _services_userService__WEBPACK_IMPORTED_MODULE_1__["default"].getuserServerById(serverId).then(function (userServer) {
      _newArrowCheck(this, _this9);
      if (!userServer) {
        dispatch(new SetuserServerBusy(false));
        dispatch(new _framework_src_actions_snackbarActions__WEBPACK_IMPORTED_MODULE_2__["AddSnackbarNotification"]({
          message: "Error loading usersApp server [".concat(serverId, "]"),
          options: {
            variant: 'error'
          }
        }));
        dispatch(new _framework_src_actions_navigationActions__WEBPACK_IMPORTED_MODULE_3__["NavigateToApplication"]("users"));
        return;
      }
      dispatch(new SetuserServerInfo(userServer.id, userServer.email, userServer.username));
    }.bind(this));
  }.bind(this);
}.bind(undefined);

/***/ }),

/***/ "./assets/icons/user-management.svg":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "./images/user-management.svg";

/***/ }),

/***/ "./components/edituserServerDialog.tsx":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EdituserServerDialogMode", function() { return EdituserServerDialogMode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EdituserServerDialog", function() { return EdituserServerDialog; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _mui_material_Button__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../../node_modules/@mui/material/Button/index.js");
/* harmony import */ var _mui_material_TextField__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../../../node_modules/@mui/material/TextField/index.js");
/* harmony import */ var _mui_material_Dialog__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("../../../node_modules/@mui/material/Dialog/index.js");
/* harmony import */ var _mui_material_DialogActions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("../../../node_modules/@mui/material/DialogActions/index.js");
/* harmony import */ var _mui_material_DialogContent__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("../../../node_modules/@mui/material/DialogContent/index.js");
/* harmony import */ var _mui_material_DialogContentText__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("../../../node_modules/@mui/material/DialogContentText/index.js");
/* harmony import */ var _mui_material_DialogTitle__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("../../../node_modules/@mui/material/DialogTitle/index.js");
/* harmony import */ var _framework_src_flux_connect__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("../../../framework/src/flux/connect.tsx");
/* harmony import */ var _actions_avaliableuserServersActions__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./actions/avaliableuserServersActions.ts");
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("../../../node_modules/@mui/material/index.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _this = undefined;
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _newArrowCheck(n, r) { if (n !== r) throw new TypeError("Cannot instantiate an arrow function"); }
/**
 * ============LICENSE_START========================================================================
 * ONAP : ccsdk feature sdnr wt odlux
 * =================================================================================================
 * Copyright (C) 2024 RideNext Software Solutions. Pvt Ltd.  All rights reserved
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











var EdituserServerDialogMode;
(function (EdituserServerDialogMode) {
  EdituserServerDialogMode["None"] = "none";
  EdituserServerDialogMode["AdduserServer"] = "adduserServer";
  EdituserServerDialogMode["EdituserServer"] = "edituserServer";
  EdituserServerDialogMode["ResetPasswordServer"] = "resetpasswordServer";
  EdituserServerDialogMode["RemoveuserServer"] = "removeuserServer";
})(EdituserServerDialogMode || (EdituserServerDialogMode = {}));
var mapDispatch = function mapDispatch(dispatcher) {
  var _this2 = this;
  _newArrowCheck(this, _this);
  return {
    adduserServer: function adduserServer(element) {
      _newArrowCheck(this, _this2);
      dispatcher.dispatch(Object(_actions_avaliableuserServersActions__WEBPACK_IMPORTED_MODULE_9__["addAvaliableuserServerAsyncActionCreator"])(element));
    }.bind(this),
    updateuserServer: function updateuserServer(element) {
      _newArrowCheck(this, _this2);
      dispatcher.dispatch(Object(_actions_avaliableuserServersActions__WEBPACK_IMPORTED_MODULE_9__["updateAvaliableuserServerAsyncActionCreator"])(element));
    }.bind(this),
    resetpasswordServer: function resetpasswordServer(element) {
      _newArrowCheck(this, _this2);
      dispatcher.dispatch(Object(_actions_avaliableuserServersActions__WEBPACK_IMPORTED_MODULE_9__["resetpasswordAvaliableuserServerAsyncActionCreator"])(element));
    }.bind(this),
    removeuserServer: function removeuserServer(element) {
      _newArrowCheck(this, _this2);
      dispatcher.dispatch(Object(_actions_avaliableuserServersActions__WEBPACK_IMPORTED_MODULE_9__["removeAvaliableuserServerAsyncActionCreator"])(element));
    }.bind(this)
  };
}.bind(undefined);
var settings = _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty({}, EdituserServerDialogMode.None, {
  dialogTitle: "",
  dialogDescription: "",
  applyButtonText: "",
  cancelButtonText: "",
  readonly: true
}), EdituserServerDialogMode.AdduserServer, {
  dialogTitle: "Add Users",
  dialogDescription: "",
  applyButtonText: "Save >>",
  cancelButtonText: "Cancel",
  readonly: false
}), EdituserServerDialogMode.EdituserServer, {
  dialogTitle: "Edit Users",
  dialogDescription: "",
  applyButtonText: "Update",
  cancelButtonText: "Cancel",
  readonly: false
}), EdituserServerDialogMode.ResetPasswordServer, {
  dialogTitle: "Reset Password",
  dialogDescription: "",
  applyButtonText: "Reset",
  cancelButtonText: "Cancel",
  readonly: false
}), EdituserServerDialogMode.RemoveuserServer, {
  dialogTitle: "Delete Users",
  dialogDescription: "",
  applyButtonText: "Delete",
  cancelButtonText: "Cancel",
  readonly: true
});
var urlRegex = RegExp("^https?://");
var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regex for email validation
var EdituserServerDialogComponent = /*#__PURE__*/function (_React$Component) {
  function EdituserServerDialogComponent(props) {
    var _this4 = this;
    var _this3;
    _classCallCheck(this, EdituserServerDialogComponent);
    _this3 = _callSuper(this, EdituserServerDialogComponent, [props]);
    _this3.areFieldsValid = function () {
      _newArrowCheck(this, _this4);
      // Check if all required fields are valid
      return _this3.state.username.trim().length > 0 && _this3.state.password === _this3.state.confirmPassword && emailRegex.test(_this3.state.email) // Ensure email matches the regex pattern
      ;
    }.bind(this);
    _this3.createErrorMessages = function () {
      _newArrowCheck(this, _this4);
      var messages = [];
      if (_this3.state.username.trim().length === 0) {
        messages.push("The User name and the url must not be empty.");
      }
      if (_this3.state.password !== _this3.state.confirmPassword) {
        messages.push("Password and Confirm Password don't match.");
      }
      if (!emailRegex.test(_this3.state.email)) {
        messages.push("Please enter a valid email address.");
      }
      // if (!urlRegex.test(this.state.url)) {
      //   if (messages.length > 0) {
      //     return messages.concat(["The server url must start with 'http(s)://'."])
      //   } else {
      //     return ["The server url must start with 'http(s)://'."]
      //   }
      // }
      return messages;
    }.bind(this);
    _this3.arePassword = function () {
      _newArrowCheck(this, _this4);
      return _this3.state.username.trim().length > 0;
    }.bind(this);
    _this3.onApply = function (element) {
      _newArrowCheck(this, _this4);
      _this3.props.onClose && _this3.props.onClose();
      switch (_this3.props.mode) {
        case EdituserServerDialogMode.AdduserServer:
          element && _this3.props.adduserServer(element);
          break;
        case EdituserServerDialogMode.EdituserServer:
          element && _this3.props.updateuserServer(element);
          break;
        case EdituserServerDialogMode.ResetPasswordServer:
          element && _this3.props.resetpasswordServer(element);
          break;
        case EdituserServerDialogMode.RemoveuserServer:
          element && _this3.props.removeuserServer(element);
          break;
      }
    }.bind(this);
    _this3.onCancel = function () {
      _newArrowCheck(this, _this4);
      _this3.props.onClose && _this3.props.onClose();
    }.bind(this);
    _this3.state = Object.assign(Object.assign({}, _this3.props.userServer), {
      errorMessage: []
    });
    return _this3;
  }
  _inherits(EdituserServerDialogComponent, _React$Component);
  return _createClass(EdituserServerDialogComponent, [{
    key: "render",
    value: function render() {
      var _this5 = this;
      var setting = settings[this.props.mode];
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_mui_material_Dialog__WEBPACK_IMPORTED_MODULE_3__["default"], {
        open: this.props.mode !== EdituserServerDialogMode.None
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_mui_material_DialogTitle__WEBPACK_IMPORTED_MODULE_7__["default"], {
        id: "form-dialog-title",
        style: {
          backgroundColor: '#6a7baf',
          border: '0px solid #ccc',
          borderRadius: '3px',
          padding: 0,
          paddingLeft: '24px'
        }
      }, setting.dialogTitle), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_mui_material_DialogContent__WEBPACK_IMPORTED_MODULE_5__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_mui_material_DialogContentText__WEBPACK_IMPORTED_MODULE_6__["default"], null, setting.dialogDescription), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_mui_material_TextField__WEBPACK_IMPORTED_MODULE_2__["default"], {
        variant: "standard",
        disabled: this.props.mode === EdituserServerDialogMode.ResetPasswordServer || this.props.mode === EdituserServerDialogMode.EdituserServer || this.props.mode === EdituserServerDialogMode.RemoveuserServer,
        spellCheck: false,
        margin: "dense",
        id: "username",
        label: "User Name",
        type: "text",
        fullWidth: true,
        value: this.state.username,
        onChange: function (event) {
          _newArrowCheck(this, _this5);
          this.setState({
            username: event.target.value
          });
        }.bind(this)
      }), !setting.readonly && this.props.mode !== EdituserServerDialogMode.ResetPasswordServer && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_mui_material_TextField__WEBPACK_IMPORTED_MODULE_2__["default"], {
        variant: "standard",
        spellCheck: false,
        margin: "dense",
        id: "firstName",
        label: "First Name",
        type: "text",
        fullWidth: true,
        value: this.state.firstName,
        onChange: function (event) {
          _newArrowCheck(this, _this5);
          this.setState({
            firstName: event.target.value
          });
        }.bind(this)
      }), !setting.readonly && this.props.mode !== EdituserServerDialogMode.ResetPasswordServer && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_mui_material_TextField__WEBPACK_IMPORTED_MODULE_2__["default"], {
        variant: "standard",
        spellCheck: false,
        margin: "dense",
        id: "lastName",
        label: "Last Name",
        type: "text",
        fullWidth: true,
        value: this.state.lastName,
        onChange: function (event) {
          _newArrowCheck(this, _this5);
          this.setState({
            lastName: event.target.value
          });
        }.bind(this)
      }), !setting.readonly && this.props.mode !== EdituserServerDialogMode.ResetPasswordServer && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_mui_material_TextField__WEBPACK_IMPORTED_MODULE_2__["default"], {
        variant: "standard",
        spellCheck: false,
        margin: "dense",
        id: "email",
        label: "Email",
        type: "Email",
        fullWidth: true,
        value: this.state.email,
        onChange: function (event) {
          _newArrowCheck(this, _this5);
          this.setState({
            email: event.target.value
          });
        }.bind(this)
      }), !setting.readonly && this.props.mode !== EdituserServerDialogMode.RemoveuserServer && this.props.mode !== EdituserServerDialogMode.EdituserServer && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_mui_material_TextField__WEBPACK_IMPORTED_MODULE_2__["default"], {
        variant: "standard",
        disabled: setting.readonly,
        spellCheck: false,
        margin: "dense",
        id: "password",
        label: "password",
        type: "password",
        fullWidth: true,
        value: this.state.password,
        onChange: function (event) {
          _newArrowCheck(this, _this5);
          this.setState({
            password: event.target.value
          });
        }.bind(this)
      }), !setting.readonly && this.props.mode !== EdituserServerDialogMode.RemoveuserServer && this.props.mode !== EdituserServerDialogMode.EdituserServer && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_mui_material_TextField__WEBPACK_IMPORTED_MODULE_2__["default"], {
        variant: "standard",
        disabled: setting.readonly,
        spellCheck: false,
        margin: "dense",
        id: "confirmPassword",
        label: "confirmPassword",
        type: "password",
        fullWidth: true,
        value: this.state.confirmPassword,
        onChange: function (event) {
          _newArrowCheck(this, _this5);
          this.setState({
            confirmPassword: event.target.value
          });
        }.bind(this)
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_mui_material__WEBPACK_IMPORTED_MODULE_10__["Typography"], {
        id: "errorMessage",
        component: "div",
        color: "error"
      }, this.state.errorMessage.map(function (error, index) {
        _newArrowCheck(this, _this5);
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", {
          key: index
        }, error);
      }.bind(this)))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_mui_material_DialogActions__WEBPACK_IMPORTED_MODULE_4__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_mui_material_Button__WEBPACK_IMPORTED_MODULE_1__["default"], {
        onClick: function (event) {
          _newArrowCheck(this, _this5);
          if (this.areFieldsValid()) {
            this.setState({
              errorMessage: []
            });
            this.onApply({
              id: this.state.id,
              firstName: this.state.firstName,
              lastName: this.state.lastName,
              email: this.state.email,
              username: this.state.username,
              password: this.state.password,
              confirmPassword: this.state.confirmPassword
              // newPassword: this.state.newPassword
            });
          } else {
            var errorMessage = this.createErrorMessages();
            this.setState({
              errorMessage: errorMessage
            });
          }
          event.preventDefault();
          event.stopPropagation();
        }.bind(this),
        style: {
          backgroundColor: 'white',
          color: 'blue',
          border: '1px solid blue',
          borderRadius: '1px',
          padding: '3px 6px'
        }
      }, " ", setting.applyButtonText, " "), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_mui_material_Button__WEBPACK_IMPORTED_MODULE_1__["default"], {
        onClick: function (event) {
          _newArrowCheck(this, _this5);
          this.onCancel();
          this.setState({
            errorMessage: []
          });
          event.preventDefault();
          event.stopPropagation();
        }.bind(this),
        style: {
          backgroundColor: 'white',
          color: 'red',
          border: '1px solid red',
          borderRadius: '1px',
          padding: '3px 6px'
        }
      }, " ", setting.cancelButtonText)));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(props, state) {
      if (props.userServer !== state._initialuserServer) {
        state = Object.assign(Object.assign(Object.assign({}, state), props.userServer), {
          _initialuserServer: props.userServer
        });
      }
      return state;
    }
  }]);
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);
var EdituserServerDialog = Object(_framework_src_flux_connect__WEBPACK_IMPORTED_MODULE_8__["connect"])(undefined, mapDispatch)(EdituserServerDialogComponent);
/* harmony default export */ __webpack_exports__["default"] = (EdituserServerDialog);

/***/ }),

/***/ "./components/refreshuserDialog.tsx":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RefreshuserDialogMode", function() { return RefreshuserDialogMode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RefreshuserDialog", function() { return RefreshuserDialog; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _mui_material_Button__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../../node_modules/@mui/material/Button/index.js");
/* harmony import */ var _mui_material_Dialog__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../../../node_modules/@mui/material/Dialog/index.js");
/* harmony import */ var _mui_material_DialogActions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("../../../node_modules/@mui/material/DialogActions/index.js");
/* harmony import */ var _mui_material_DialogContent__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("../../../node_modules/@mui/material/DialogContent/index.js");
/* harmony import */ var _mui_material_DialogContentText__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("../../../node_modules/@mui/material/DialogContentText/index.js");
/* harmony import */ var _mui_material_DialogTitle__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("../../../node_modules/@mui/material/DialogTitle/index.js");
/* harmony import */ var _handlers_avaliableuserServersHandler__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./handlers/avaliableuserServersHandler.ts");
/* harmony import */ var _framework_src_flux_connect__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("../../../framework/src/flux/connect.tsx");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _this = undefined;
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _newArrowCheck(n, r) { if (n !== r) throw new TypeError("Cannot instantiate an arrow function"); }
/**
 * ============LICENSE_START========================================================================
 * ONAP : ccsdk feature sdnr wt odlux
 * =================================================================================================
 * Copyright (C) 2024 RideNext Software Solutions. Pvt Ltd.  All rights reserved
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









var RefreshuserDialogMode;
(function (RefreshuserDialogMode) {
  RefreshuserDialogMode["None"] = "none";
  RefreshuserDialogMode["RefreshuserTable"] = "RefreshuserTable";
})(RefreshuserDialogMode || (RefreshuserDialogMode = {}));
var mapDispatch = function mapDispatch(dispatcher) {
  var _this2 = this;
  _newArrowCheck(this, _this);
  return {
    refreshuser: function refreshuser() {
      _newArrowCheck(this, _this2);
      return dispatcher.dispatch(_handlers_avaliableuserServersHandler__WEBPACK_IMPORTED_MODULE_7__["avaliableuserServersReloadAction"]);
    }.bind(this)
  };
}.bind(undefined);
var settings = _defineProperty(_defineProperty({}, RefreshuserDialogMode.None, {
  dialogTitle: "",
  dialogDescription: "",
  applyButtonText: "",
  cancelButtonText: "",
  enableMountIdEditor: false,
  enableUsernameEditor: false,
  enableExtendedEditor: false
}), RefreshuserDialogMode.RefreshuserTable, {
  dialogTitle: "Do you want to refresh the User table?",
  dialogDescription: "",
  applyButtonText: "Yes",
  cancelButtonText: "Cancel",
  enableMountIdEditor: true,
  enableUsernameEditor: true,
  enableExtendedEditor: true
});
var RefreshuserDialogComponent = /*#__PURE__*/function (_React$Component) {
  function RefreshuserDialogComponent(props) {
    var _this4 = this;
    var _this3;
    _classCallCheck(this, RefreshuserDialogComponent);
    _this3 = _callSuper(this, RefreshuserDialogComponent, [props]);
    _this3.onRefresh = function () {
      _newArrowCheck(this, _this4);
      _this3.props.refreshuser();
      _this3.props.onClose();
    }.bind(this);
    _this3.onCancel = function () {
      _newArrowCheck(this, _this4);
      _this3.props.onClose();
    }.bind(this);
    return _this3;
  }
  _inherits(RefreshuserDialogComponent, _React$Component);
  return _createClass(RefreshuserDialogComponent, [{
    key: "render",
    value: function render() {
      var _this5 = this;
      var setting = settings[this.props.mode];
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_mui_material_Dialog__WEBPACK_IMPORTED_MODULE_2__["default"], {
        open: this.props.mode !== RefreshuserDialogMode.None
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_mui_material_DialogTitle__WEBPACK_IMPORTED_MODULE_6__["default"], {
        id: "form-dialog-title",
        "aria-label": "".concat(setting.dialogTitle.replace(/ /g, "-").toLowerCase(), "-dialog")
      }, setting.dialogTitle), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_mui_material_DialogContent__WEBPACK_IMPORTED_MODULE_4__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_mui_material_DialogContentText__WEBPACK_IMPORTED_MODULE_5__["default"], null, setting.dialogDescription)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_mui_material_DialogActions__WEBPACK_IMPORTED_MODULE_3__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_mui_material_Button__WEBPACK_IMPORTED_MODULE_1__["default"], {
        "aria-label": "dialog-confirm-button",
        onClick: function (event) {
          _newArrowCheck(this, _this5);
          this.onRefresh();
        }.bind(this),
        color: "inherit"
      }, " ", setting.applyButtonText, " "), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_mui_material_Button__WEBPACK_IMPORTED_MODULE_1__["default"], {
        "aria-label": "dialog-cancel-button",
        onClick: function (event) {
          _newArrowCheck(this, _this5);
          this.onCancel();
        }.bind(this),
        color: "secondary"
      }, " ", setting.cancelButtonText, " ")));
    }
  }]);
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);
var RefreshuserDialog = Object(_framework_src_flux_connect__WEBPACK_IMPORTED_MODULE_8__["connect"])(undefined, mapDispatch)(RefreshuserDialogComponent);
/* harmony default export */ __webpack_exports__["default"] = (RefreshuserDialog);

/***/ }),

/***/ "./handlers/avaliableuserServersHandler.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "avaliableuserServersActionHandler", function() { return avaliableuserServersActionHandler; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createAvaliableuserServersActions", function() { return createAvaliableuserServersActions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createAvaliableuserServersProperties", function() { return createAvaliableuserServersProperties; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "avaliableuserServersReloadAction", function() { return avaliableuserServersReloadAction; });
/* harmony import */ var _framework_src_components_material_table_utilities__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../../framework/src/components/material-table/utilities.ts");
/* harmony import */ var _framework_src_utilities_elasticSearch__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../../framework/src/utilities/elasticSearch.ts");
/* harmony import */ var _services_userService__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./services/userService.ts");
var _this = undefined;
function _newArrowCheck(n, r) { if (n !== r) throw new TypeError("Cannot instantiate an arrow function"); }
/**
 * ============LICENSE_START========================================================================
 * ONAP : ccsdk feature sdnr wt odlux
 * =================================================================================================
 * Copyright (C) 2024 RideNext Software Solutions. Pvt Ltd.  All rights reserved
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



// create eleactic search material data fetch handler
var avaliableuserServersSearchHandler = Object(_framework_src_utilities_elasticSearch__WEBPACK_IMPORTED_MODULE_1__["createSearchDataHandler"])(_services_userService__WEBPACK_IMPORTED_MODULE_2__["userServerResourcePath"]);
var _createExternal = Object(_framework_src_components_material_table_utilities__WEBPACK_IMPORTED_MODULE_0__["createExternal"])(avaliableuserServersSearchHandler, function (appState) {
    _newArrowCheck(this, _this);
    return appState.users.avaliableuserServers;
  }.bind(undefined)),
  avaliableuserServersActionHandler = _createExternal.actionHandler,
  createAvaliableuserServersActions = _createExternal.createActions,
  createAvaliableuserServersProperties = _createExternal.createProperties,
  avaliableuserServersReloadAction = _createExternal.reloadAction;


/***/ }),

/***/ "./handlers/userAppRootHandler.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "userAppRootHandler", function() { return userAppRootHandler; });
/* harmony import */ var _framework_src_flux_middleware__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../../framework/src/flux/middleware.ts");
/* harmony import */ var _avaliableuserServersHandler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./handlers/avaliableuserServersHandler.ts");
/* harmony import */ var _userServerHandler__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./handlers/userServerHandler.ts");
/**
 * ============LICENSE_START========================================================================
 * ONAP : ccsdk feature sdnr wt odlux
 * =================================================================================================
 * Copyright (C) 2024 RideNext Software Solutions. Pvt Ltd.  All rights reserved
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
// main state handler



var actionHandlers = {
  avaliableuserServers: _avaliableuserServersHandler__WEBPACK_IMPORTED_MODULE_1__["avaliableuserServersActionHandler"],
  userServerState: _userServerHandler__WEBPACK_IMPORTED_MODULE_2__["userServerHandler"]
};
var userAppRootHandler = Object(_framework_src_flux_middleware__WEBPACK_IMPORTED_MODULE_0__["combineActionHandler"])(actionHandlers);
/* harmony default export */ __webpack_exports__["default"] = (userAppRootHandler);

/***/ }),

/***/ "./handlers/userServerHandler.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "userServerHandler", function() { return userServerHandler; });
/* harmony import */ var _actions_userServerActions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./actions/userServerActions.ts");
var _this = undefined;
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _newArrowCheck(n, r) { if (n !== r) throw new TypeError("Cannot instantiate an arrow function"); }

var userServerInit = {
  busy: false,
  name: null,
  url: null,
  id: null,
  serverVersion: null,
  userVersion: null,
  nexmls: [],
  configurations: [],
  supportedDevices: [],
  isReachable: true
};
var userServerHandler = function userServerHandler() {
  var _this2 = this;
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : userServerInit;
  var action = arguments.length > 1 ? arguments[1] : undefined;
  _newArrowCheck(this, _this);
  if (action instanceof _actions_userServerActions__WEBPACK_IMPORTED_MODULE_0__["SetuserServerBusy"]) {
    state = Object.assign(Object.assign({}, state), {
      busy: action.isBusy
    });
  } else if (action instanceof _actions_userServerActions__WEBPACK_IMPORTED_MODULE_0__["SetuserServerInfo"]) {
    state = Object.assign(Object.assign({}, state), {
      name: action.name,
      url: action.url,
      id: action.id
    });
  } else if (action instanceof _actions_userServerActions__WEBPACK_IMPORTED_MODULE_0__["SetuserServerVersion"]) {
    state = Object.assign(Object.assign({}, state), {
      serverVersion: action.versionInfo && action.versionInfo.server,
      userVersion: action.versionInfo && action.versionInfo.users,
      nexmls: action.versionInfo && _toConsumableArray(action.versionInfo.nexmls) || []
    });
  } else if (action instanceof _actions_userServerActions__WEBPACK_IMPORTED_MODULE_0__["SetAlluserServerConfigurations"]) {
    state = Object.assign(Object.assign({}, state), {
      configurations: action.allConfigurations && action.allConfigurations.map(function (config) {
        _newArrowCheck(this, _this2);
        return Object.assign(Object.assign({}, config), {
          busy: false
        });
      }.bind(this)) || []
    });
  } else if (action instanceof _actions_userServerActions__WEBPACK_IMPORTED_MODULE_0__["SetuserServerSupportedDevices"]) {
    state = Object.assign(Object.assign({}, state), {
      supportedDevices: action.devices || []
    });
  } else if (action instanceof _actions_userServerActions__WEBPACK_IMPORTED_MODULE_0__["SetuserServerReachable"]) {
    state = Object.assign(Object.assign({}, state), {
      isReachable: action.isReachable
    });
  }
  return state;
}.bind(undefined);

/***/ }),

/***/ "./services/userService.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "userServerResourcePath", function() { return userServerResourcePath; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "userService", function() { return userService; });
/* harmony import */ var core_js_modules_web_dom_iterable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../../node_modules/core-js/modules/web.dom.iterable.js");
/* harmony import */ var core_js_modules_web_dom_iterable__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_iterable__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../../node_modules/regenerator-runtime/runtime.js");
/* harmony import */ var regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _framework_src_services_restService__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../../../framework/src/services/restService.ts");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("../../../node_modules/axios/index.js");


function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator.return && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, catch: function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function _newArrowCheck(n, r) { if (n !== r) throw new TypeError("Cannot instantiate an arrow function"); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/**
 * ============LICENSE_START========================================================================
 * ONAP : ccsdk feature sdnr wt odlux
 * =================================================================================================
 * Copyright (C) 2024 RideNext Software Solutions. Pvt Ltd.  All rights reserved
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
var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};


//export const userServerResourcePath = "usersApp-server";
var userServerResourcePath = "usersAppTest-server";
/**/
// Now you can defin
/**
 * Represents a web api accessor service for all user server actions.
 */
var UserService = /*#__PURE__*/function () {
  function UserService() {
    _classCallCheck(this, UserService);
  }
  return _createClass(UserService, [{
    key: "insertuserServer",
    value:
    /**
      * Inserts data into the user servers table.
      */
    function insertuserServer(server) {
      return __awaiter(this, void 0, void 0, /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        var _this = this;
        var baseUri, result, insertdata, data2, tokenHeaders, uri4, uri1, respose;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              //alert('insertuserServer');
              baseUri = "".concat(window.location.origin);
              result = null;
              insertdata = {
                "firstName": server.firstName,
                "lastName": server.lastName,
                "email": server.email,
                "username": server.username,
                //"password" : server.password,
                //"confirmPassword" : server.confirmPassword,
                "enabled": "true",
                "credentials": [{
                  "type": "password",
                  "value": server.password,
                  "temporary": false
                }]
              };
              data2 = {
                client_id: 'admin-cli',
                grant_type: 'password',
                username: "admin",
                password: 'Kp8bJ4SXszM0WXlhak3eHlcse2gAw84vaoGGmJvUy2U'
              };
              tokenHeaders = {
                'Authorization': 'Basic ' + btoa("admin" + ':' + "admin"),
                'content-type': 'application/x-www-form-urlencoded',
                'accept': 'application/json'
              };
              uri4 = baseUri + '/realms/master/protocol/openid-connect/token';
              uri1 = baseUri + '/admin/realms/onap/users';
              _context.next = 9;
              return axios__WEBPACK_IMPORTED_MODULE_3__["default"].post(uri4, data2, {
                headers: tokenHeaders
              }).then(function (res) {
                _newArrowCheck(this, _this);
                //console.log(res);
                respose = res;
              }.bind(this)).catch(function (err) {
                _newArrowCheck(this, _this);
                console.log(err);
              }.bind(this));
            case 9:
              _context.next = 11;
              return fetch(uri1, {
                method: "post",
                headers: {
                  'content-type': 'application/json',
                  'accept': 'application/json',
                  'Authorization': 'bearer ' + respose.data.access_token
                },
                body: JSON.stringify(insertdata)
              }).then(function (res) {
                _newArrowCheck(this, _this);
                //console.log(res);
                result = res;
              }.bind(this)).catch(function (err) {
                _newArrowCheck(this, _this);
                console.log(err);
              }.bind(this));
            case 11:
              return _context.abrupt("return", result || null);
            case 12:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
    }
    /**
      * Updates data into the user servers table.
      */
  }, {
    key: "updateuserServer",
    value: function updateuserServer(server) {
      return __awaiter(this, void 0, void 0, /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
        var _this2 = this;
        var baseUri, result, updatedata, data2, tokenHeaders, uri4, uri1, respose;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              //alert('updateuserServer');
              baseUri = "".concat(window.location.origin);
              result = null;
              updatedata = {
                "firstName": server.firstName,
                "lastName": server.lastName,
                "email": server.email,
                "username": server.username
                //"password": server.password,
                // "confirmPassword": server.confirmPassword
              };
              data2 = {
                client_id: 'admin-cli',
                grant_type: 'password',
                username: "admin",
                password: 'Kp8bJ4SXszM0WXlhak3eHlcse2gAw84vaoGGmJvUy2U'
              };
              tokenHeaders = {
                'Authorization': 'Basic ' + btoa("admin" + ':' + "admin"),
                'content-type': 'application/x-www-form-urlencoded',
                'accept': 'application/json'
              };
              uri4 = baseUri + '/realms/master/protocol/openid-connect/token';
              uri1 = baseUri + '/admin/realms/onap/users/' + server.id;
              _context2.next = 9;
              return axios__WEBPACK_IMPORTED_MODULE_3__["default"].post(uri4, data2, {
                headers: tokenHeaders
              }).then(function (res) {
                _newArrowCheck(this, _this2);
                //console.log(res);
                respose = res;
              }.bind(this)).catch(function (err) {
                _newArrowCheck(this, _this2);
                console.log(err);
              }.bind(this));
            case 9:
              _context2.next = 11;
              return fetch(uri1, {
                method: "put",
                headers: {
                  'content-type': 'application/json',
                  'accept': 'application/json',
                  'Authorization': 'bearer ' + respose.data.access_token
                },
                body: JSON.stringify(updatedata)
              }).then(function (res) {
                _newArrowCheck(this, _this2);
                //console.log(res);
                result = res;
              }.bind(this)).catch(function (err) {
                _newArrowCheck(this, _this2);
                console.log(err);
              }.bind(this));
            case 11:
              return _context2.abrupt("return", result || null);
            case 12:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this);
      }));
    }
    /**
      * Reset  data into the user servers table.
      */
  }, {
    key: "resetPasswordServer",
    value: function resetPasswordServer(server) {
      return __awaiter(this, void 0, void 0, /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
        var baseUri, result, updatedata, authData, tokenHeaders, tokenUri, userUri, tokenResponse, accessToken, userHeaders, passwordResetData, passwordResetUri, updateUserResponse, responseBody;
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              baseUri = "".concat(window.location.origin);
              result = null;
              updatedata = {
                "password": server.password
              };
              authData = {
                client_id: 'admin-cli',
                grant_type: 'password',
                username: 'admin',
                password: 'Kp8bJ4SXszM0WXlhak3eHlcse2gAw84vaoGGmJvUy2U'
              };
              tokenHeaders = {
                'Authorization': 'Basic ' + btoa('admin' + ':' + 'admin'),
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'
              };
              tokenUri = "".concat(baseUri, "/realms/master/protocol/openid-connect/token");
              userUri = "".concat(baseUri, "/admin/realms/onap/users/").concat(server.id);
              _context3.prev = 7;
              _context3.next = 10;
              return axios__WEBPACK_IMPORTED_MODULE_3__["default"].post(tokenUri, authData, {
                headers: tokenHeaders
              });
            case 10:
              tokenResponse = _context3.sent;
              accessToken = tokenResponse.data.access_token;
              userHeaders = {
                'Authorization': 'Bearer ' + accessToken,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
              };
              passwordResetData = {
                type: 'password',
                value: server.password,
                temporary: false
              };
              passwordResetUri = "".concat(baseUri, "/admin/realms/onap/users/").concat(server.id, "/reset-password");
              _context3.next = 17;
              return fetch(passwordResetUri, {
                method: 'PUT',
                headers: userHeaders,
                body: JSON.stringify(passwordResetData)
              });
            case 17:
              updateUserResponse = _context3.sent;
              if (!(updateUserResponse.status === 204)) {
                _context3.next = 23;
                break;
              }
              console.log('Password reset successful');
              return _context3.abrupt("return", null);
            case 23:
              console.error('Error updating user:', updateUserResponse.statusText);
              _context3.next = 26;
              return updateUserResponse.text();
            case 26:
              responseBody = _context3.sent;
              // Retrieve response body as text
              console.log('Response body:', responseBody); // Log response body for debugging
              return _context3.abrupt("return", null);
            case 29:
              _context3.next = 35;
              break;
            case 31:
              _context3.prev = 31;
              _context3.t0 = _context3["catch"](7);
              console.error('Error resetting password and updating user data:', _context3.t0);
              return _context3.abrupt("return", null);
            case 35:
            case "end":
              return _context3.stop();
          }
        }, _callee3, null, [[7, 31]]);
      }));
    }
    /**
      * Deletes data from the user servers table.
      */
  }, {
    key: "deleteuserServer",
    value: function deleteuserServer(server) {
      return __awaiter(this, void 0, void 0, /*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
        var _this3 = this;
        var baseUri, result, data2, tokenHeaders, uri1, uri2, respose;
        return _regeneratorRuntime().wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              // alert('deleteuserServer');
              baseUri = "".concat(window.location.origin);
              result = null;
              data2 = {
                client_id: 'admin-cli',
                grant_type: 'password',
                username: "admin",
                password: 'Kp8bJ4SXszM0WXlhak3eHlcse2gAw84vaoGGmJvUy2U'
              };
              tokenHeaders = {
                'Authorization': 'Basic ' + btoa("admin" + ':' + "admin"),
                'content-type': 'application/x-www-form-urlencoded',
                'accept': 'application/json'
              };
              uri1 = baseUri + '/realms/master/protocol/openid-connect/token';
              uri2 = baseUri + '/admin/realms/onap/users/' + server.id;
              _context4.next = 8;
              return axios__WEBPACK_IMPORTED_MODULE_3__["default"].post(uri1, data2, {
                headers: tokenHeaders
              }).then(function (res) {
                _newArrowCheck(this, _this3);
                //console.log(res);
                respose = res;
              }.bind(this)).catch(function (err) {
                _newArrowCheck(this, _this3);
                console.log(err);
              }.bind(this));
            case 8:
              _context4.next = 10;
              return fetch(uri2, {
                method: "delete",
                headers: {
                  'content-type': 'application/json',
                  'accept': 'application/json',
                  'Authorization': 'bearer ' + respose.data.access_token
                }
              }).then(function (res) {
                _newArrowCheck(this, _this3);
                //console.log(res);
                result = res;
              }.bind(this)).catch(function (err) {
                _newArrowCheck(this, _this3);
                console.log(err);
              }.bind(this));
            case 10:
              return _context4.abrupt("return", result || null);
            case 11:
            case "end":
              return _context4.stop();
          }
        }, _callee4, this);
      }));
    }
  }, {
    key: "getuserServerById",
    value: function getuserServerById(serverId) {
      return __awaiter(this, void 0, void 0, /*#__PURE__*/_regeneratorRuntime().mark(function _callee5() {
        var path, data, result, firstResult;
        return _regeneratorRuntime().wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              alert('getuserServerById');
              path = "/restconf/operations/data-provider:read-user-server-list";
              data = {
                "filter": [{
                  "property": "id",
                  "filtervalue": serverId
                }]
              };
              _context5.next = 5;
              return Object(_framework_src_services_restService__WEBPACK_IMPORTED_MODULE_2__["requestRest"])(path, {
                method: "POST",
                body: JSON.stringify({
                  input: data
                })
              });
            case 5:
              result = _context5.sent;
              if (!(result && result["data-provider:output"].data[0])) {
                _context5.next = 11;
                break;
              }
              firstResult = result["data-provider:output"].data[0];
              return _context5.abrupt("return", {
                id: firstResult.id,
                firstName: firstResult.firstName,
                lastName: firstResult.lastName,
                email: firstResult.email,
                username: firstResult.username,
                password: firstResult.password,
                confirmPassword: firstResult.confirmPassword
                // newPassword: firstResult.newPassword
              });
            case 11:
              return _context5.abrupt("return", null);
            case 12:
            case "end":
              return _context5.stop();
          }
        }, _callee5);
      }));
    }
  }, {
    key: "accassuserServer",
    value: function accassuserServer(userServerId, task, data) {
      return __awaiter(this, void 0, void 0, /*#__PURE__*/_regeneratorRuntime().mark(function _callee6() {
        var path, result;
        return _regeneratorRuntime().wrap(function _callee6$(_context6) {
          while (1) switch (_context6.prev = _context6.next) {
            case 0:
              alert('accassuserServer');
              path = "ms/".concat(userServerId, "/api/'?task=").concat(task);
              _context6.next = 4;
              return Object(_framework_src_services_restService__WEBPACK_IMPORTED_MODULE_2__["requestRest"])(path, {
                method: data ? "POST" : "GET",
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: data ? Object(_framework_src_services_restService__WEBPACK_IMPORTED_MODULE_2__["formEncode"])(Object.assign(Object.assign({}, data), {
                  task: task
                })) : null
              }, true);
            case 4:
              _context6.t0 = _context6.sent;
              if (_context6.t0) {
                _context6.next = 7;
                break;
              }
              _context6.t0 = null;
            case 7:
              result = _context6.t0;
              return _context6.abrupt("return", result ? JSON.parse(result) : null);
            case 9:
            case "end":
              return _context6.stop();
          }
        }, _callee6);
      }));
    }
  }]);
}();
var userService = new UserService();
/* harmony default export */ __webpack_exports__["default"] = (userService);

/***/ }),

/***/ "./userPlugin.tsx":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "register", function() { return register; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../../node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var _framework_src_services_applicationManager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../../../framework/src/services/applicationManager.ts");
/* harmony import */ var _framework_src_flux_connect__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("../../../framework/src/flux/connect.tsx");
/* harmony import */ var _handlers_userAppRootHandler__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./handlers/userAppRootHandler.ts");
/* harmony import */ var _handlers_avaliableuserServersHandler__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./handlers/avaliableuserServersHandler.ts");
/* harmony import */ var _views_userSelection__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./views/userSelection.tsx");
/* harmony import */ var _actions_userServerActions__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./actions/userServerActions.ts");
var _this = undefined;
function _newArrowCheck(n, r) { if (n !== r) throw new TypeError("Cannot instantiate an arrow function"); }
/**
 * ============LICENSE_START========================================================================
 * ONAP : ccsdk feature sdnr wt odlux
 * =================================================================================================
 * Copyright (C) 2024 RideNext Software Solutions. Pvt Ltd.  All rights reserved
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
// app configuration and main entry point for the app






//import { UserApplication } from "./views/userApplication";


var appIcon = __webpack_require__("./assets/icons/user-management.svg"); // select app icon
var currentuserServerId = undefined;
var mapDisp = function mapDisp(dispatcher) {
  var _this2 = this;
  _newArrowCheck(this, _this);
  return {
    loaduserServer: function loaduserServer(userServerId) {
      _newArrowCheck(this, _this2);
      return dispatcher.dispatch(Object(_actions_userServerActions__WEBPACK_IMPORTED_MODULE_7__["initializeuserServerAsyncActionCreator"])(userServerId));
    }.bind(this)
  };
}.bind(undefined);
var userServerRouteAdapter = Object(_framework_src_flux_connect__WEBPACK_IMPORTED_MODULE_3__["connect"])(undefined, mapDisp)(function (props) {
  var _this3 = this;
  _newArrowCheck(this, _this);
  if (currentuserServerId !== props.match.params.userServerId) {
    // route parameter has changed
    currentuserServerId = props.match.params.userServerId || undefined;
    // Hint: This timeout is need, since it is not recommended to change the state while rendering is in progress !
    window.setTimeout(function () {
      _newArrowCheck(this, _this3);
      if (currentuserServerId) {
        props.loaduserServer(currentuserServerId);
      }
    }.bind(this));
  }
  return null
  // <UserApplication/>
  ;
}.bind(undefined));
var App = function App(props) {
  _newArrowCheck(this, _this);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Switch"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Route"], {
    exact: true,
    path: "".concat(props.match.path),
    component: _views_userSelection__WEBPACK_IMPORTED_MODULE_6__["userServerSelection"]
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Route"], {
    path: "".concat(props.match.path, "/:userServerId"),
    component: userServerRouteAdapter
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Redirect"], {
    to: "".concat(props.match.path)
  }));
}.bind(undefined);
var FinalApp = Object(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["withRouter"])(Object(_framework_src_flux_connect__WEBPACK_IMPORTED_MODULE_3__["connect"])()(App));
function register() {
  var _this4 = this;
  var applicationApi = _framework_src_services_applicationManager__WEBPACK_IMPORTED_MODULE_2__["default"].registerApplication({
    name: "users",
    icon: appIcon,
    rootComponent: FinalApp,
    rootActionHandler: _handlers_userAppRootHandler__WEBPACK_IMPORTED_MODULE_4__["userAppRootHandler"],
    menuEntry: "Users"
  });
  // prefetch all available user servers
  applicationApi.applicationStoreInitialized.then(function (applicationStore) {
    _newArrowCheck(this, _this4);
    applicationStore.dispatch(_handlers_avaliableuserServersHandler__WEBPACK_IMPORTED_MODULE_5__["avaliableuserServersReloadAction"]);
  }.bind(this));
}
;

/***/ }),

/***/ "./views/userSelection.tsx":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "userServerSelection", function() { return userServerSelection; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../../node_modules/@mui/material/index.js");
/* harmony import */ var _mui_styles_withStyles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../../../node_modules/@mui/styles/withStyles/index.js");
/* harmony import */ var _mui_styles_createStyles__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("../../../node_modules/@mui/styles/createStyles/index.js");
/* harmony import */ var _mui_icons_material_Add__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("../../../node_modules/@mui/icons-material/Add.js");
/* harmony import */ var _mui_icons_material_Add__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_mui_icons_material_Add__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _mui_material_IconButton__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("../../../node_modules/@mui/material/IconButton/index.js");
/* harmony import */ var _mui_icons_material_Edit__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("../../../node_modules/@mui/icons-material/Edit.js");
/* harmony import */ var _mui_icons_material_Edit__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_mui_icons_material_Edit__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _mui_icons_material_LockReset__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("../../../node_modules/@mui/icons-material/LockReset.js");
/* harmony import */ var _mui_icons_material_LockReset__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_mui_icons_material_LockReset__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _mui_icons_material_Delete__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("../../../node_modules/@mui/icons-material/Delete.js");
/* harmony import */ var _mui_icons_material_Delete__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_mui_icons_material_Delete__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _mui_icons_material_Refresh__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("../../../node_modules/@mui/icons-material/Refresh.js");
/* harmony import */ var _mui_icons_material_Refresh__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_mui_icons_material_Refresh__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _framework_src_flux_connect__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("../../../framework/src/flux/connect.tsx");
/* harmony import */ var _framework_src_components_material_table__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("../../../framework/src/components/material-table/index.tsx");
/* harmony import */ var _handlers_avaliableuserServersHandler__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("./handlers/avaliableuserServersHandler.ts");
/* harmony import */ var _components_edituserServerDialog__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__("./components/edituserServerDialog.tsx");
/* harmony import */ var _components_refreshuserDialog__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__("./components/refreshuserDialog.tsx");
/* harmony import */ var _framework_src_actions_navigationActions__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__("../../../framework/src/actions/navigationActions.ts");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _this = undefined;
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _newArrowCheck(n, r) { if (n !== r) throw new TypeError("Cannot instantiate an arrow function"); }
/**
 * ============LICENSE_START========================================================================
 * ONAP : ccsdk feature sdnr wt odlux
 * =================================================================================================
 * Copyright (C) 2024 RideNext Software Solutions. Pvt Ltd.  All rights reserved
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
















var UserServersTable = _framework_src_components_material_table__WEBPACK_IMPORTED_MODULE_11__["default"];
var styles = function styles(theme) {
  _newArrowCheck(this, _this);
  return Object(_mui_styles_createStyles__WEBPACK_IMPORTED_MODULE_3__["default"])({
    button: {
      margin: 0,
      padding: "6px 6px",
      minWidth: 'unset'
    },
    spacer: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      display: "inline"
    }
  });
}.bind(undefined);
var mapProps = function mapProps(state) {
  _newArrowCheck(this, _this);
  return {
    userServersProperties: Object(_handlers_avaliableuserServersHandler__WEBPACK_IMPORTED_MODULE_12__["createAvaliableuserServersProperties"])(state)
  };
}.bind(undefined);
var mapDispatch = function mapDispatch(dispatcher) {
  var _this2 = this;
  _newArrowCheck(this, _this);
  return {
    userServersActions: Object(_handlers_avaliableuserServersHandler__WEBPACK_IMPORTED_MODULE_12__["createAvaliableuserServersActions"])(dispatcher.dispatch),
    selectuserServer: function selectuserServer(userServerId) {
      _newArrowCheck(this, _this2);
      return userServerId && dispatcher.dispatch(new _framework_src_actions_navigationActions__WEBPACK_IMPORTED_MODULE_15__["NavigateToApplication"]("user", userServerId));
    }.bind(this)
  };
}.bind(undefined);
var emptyuserServer = {
  id: "",
  firstName: "",
  lastName: "",
  email: "",
  username: "",
  password: "",
  confirmPassword: ""
  // newPassword: "",
};
var initialSorted = false;
var userServerSelectionComponent = /*#__PURE__*/function (_React$Component) {
  function userServerSelectionComponent(props) {
    var _this4 = this;
    var _this3;
    _classCallCheck(this, userServerSelectionComponent);
    _this3 = _callSuper(this, userServerSelectionComponent, [props]);
    _this3.onSelectuserServer = function (event, server) {
      _newArrowCheck(this, _this4);
      event.preventDefault();
      event.stopPropagation();
      _this3.props.selectuserServer(server && server.id);
    }.bind(this);
    _this3.onEdituserServer = function (event, server) {
      _newArrowCheck(this, _this4);
      event.preventDefault();
      event.stopPropagation();
      _this3.setState({
        userServerEditorMode: _components_edituserServerDialog__WEBPACK_IMPORTED_MODULE_13__["EdituserServerDialogMode"].EdituserServer,
        userServerToEdit: server
      });
    }.bind(this);
    _this3.onResetPassword = function (event, server) {
      _newArrowCheck(this, _this4);
      event.preventDefault();
      event.stopPropagation();
      _this3.setState({
        userServerEditorMode: _components_edituserServerDialog__WEBPACK_IMPORTED_MODULE_13__["EdituserServerDialogMode"].ResetPasswordServer,
        userServerToEdit: server
      });
    }.bind(this);
    _this3.onRemoveuserServer = function (event, server) {
      _newArrowCheck(this, _this4);
      event.preventDefault();
      event.stopPropagation();
      _this3.setState({
        userServerEditorMode: _components_edituserServerDialog__WEBPACK_IMPORTED_MODULE_13__["EdituserServerDialogMode"].RemoveuserServer,
        userServerToEdit: server
      });
    }.bind(this);
    _this3.onCloseEdituserServerDialog = function () {
      _newArrowCheck(this, _this4);
      _this3.setState({
        userServerEditorMode: _components_edituserServerDialog__WEBPACK_IMPORTED_MODULE_13__["EdituserServerDialogMode"].None,
        userServerToEdit: emptyuserServer
      });
    }.bind(this);
    _this3.onCloseRefreshuserDialog = function () {
      _newArrowCheck(this, _this4);
      _this3.setState({
        refreshuserEditorMode: _components_refreshuserDialog__WEBPACK_IMPORTED_MODULE_14__["RefreshuserDialogMode"].None
      });
    }.bind(this);
    _this3.state = {
      userServerEditorMode: _components_edituserServerDialog__WEBPACK_IMPORTED_MODULE_13__["EdituserServerDialogMode"].None,
      userServerToEdit: emptyuserServer,
      refreshuserEditorMode: _components_refreshuserDialog__WEBPACK_IMPORTED_MODULE_14__["RefreshuserDialogMode"].None
    };
    return _this3;
  }
  _inherits(userServerSelectionComponent, _React$Component);
  return _createClass(userServerSelectionComponent, [{
    key: "render",
    value: function render() {
      var _this5 = this;
      var classes = this.props.classes;
      var refreshuserAction = {
        icon: _mui_icons_material_Refresh__WEBPACK_IMPORTED_MODULE_9___default.a,
        tooltip: 'Refresh user Server Table',
        ariaLabel: 'refresh',
        onClick: function onClick() {
          _newArrowCheck(this, _this5);
          this.setState({
            refreshuserEditorMode: _components_refreshuserDialog__WEBPACK_IMPORTED_MODULE_14__["RefreshuserDialogMode"].RefreshuserTable
          });
        }.bind(this)
      };
      var adduserServerActionButton = {
        icon: _mui_icons_material_Add__WEBPACK_IMPORTED_MODULE_4___default.a,
        tooltip: 'Add New Users',
        ariaLabel: 'add-element',
        onClick: function onClick() {
          _newArrowCheck(this, _this5);
          this.setState({
            userServerEditorMode: _components_edituserServerDialog__WEBPACK_IMPORTED_MODULE_13__["EdituserServerDialogMode"].AdduserServer,
            userServerToEdit: emptyuserServer
          });
        }.bind(this)
      };
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(UserServersTable, _extends({
        stickyHeader: true,
        title: "Users",
        tableId: null,
        customActionButtons: [refreshuserAction, adduserServerActionButton],
        idProperty: "id"
      }, this.props.userServersActions, this.props.userServersProperties, {
        columns: [
        // { property: "id", title: "ID", type: ColumnType.text },
        {
          property: "username",
          title: "User Name",
          type: _framework_src_components_material_table__WEBPACK_IMPORTED_MODULE_11__["ColumnType"].text
        }, {
          property: "firstName",
          title: "First Name",
          type: _framework_src_components_material_table__WEBPACK_IMPORTED_MODULE_11__["ColumnType"].text
        }, {
          property: "lastName",
          title: "Last Name",
          type: _framework_src_components_material_table__WEBPACK_IMPORTED_MODULE_11__["ColumnType"].text
        }, {
          property: "email",
          title: "Email",
          type: _framework_src_components_material_table__WEBPACK_IMPORTED_MODULE_11__["ColumnType"].text
        }, {
          property: "actions",
          title: "Actions",
          type: _framework_src_components_material_table__WEBPACK_IMPORTED_MODULE_11__["ColumnType"].custom,
          customControl: function customControl(_ref) {
            var _this6 = this;
            var rowData = _ref.rowData;
            _newArrowCheck(this, _this5);
            return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
              className: classes.spacer
            }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_1__["Tooltip"], {
              disableInteractive: true,
              title: "Edit"
            }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_mui_material_IconButton__WEBPACK_IMPORTED_MODULE_5__["default"], {
              className: classes.button,
              onClick: function (event) {
                _newArrowCheck(this, _this6);
                this.onEdituserServer(event, rowData);
              }.bind(this),
              size: "large"
            }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_mui_icons_material_Edit__WEBPACK_IMPORTED_MODULE_6___default.a, null))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_1__["Tooltip"], {
              disableInteractive: true,
              title: "Reset Password"
            }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_mui_material_IconButton__WEBPACK_IMPORTED_MODULE_5__["default"], {
              className: classes.button,
              onClick: function (event) {
                _newArrowCheck(this, _this6);
                this.onResetPassword(event, rowData);
              }.bind(this),
              size: "large"
            }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_mui_icons_material_LockReset__WEBPACK_IMPORTED_MODULE_7___default.a, null))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_1__["Tooltip"], {
              disableInteractive: true,
              title: "Remove"
            }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_mui_material_IconButton__WEBPACK_IMPORTED_MODULE_5__["default"], {
              className: classes.button,
              onClick: function (event) {
                _newArrowCheck(this, _this6);
                this.onRemoveuserServer(event, rowData);
              }.bind(this),
              size: "large"
            }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_mui_icons_material_Delete__WEBPACK_IMPORTED_MODULE_8___default.a, null))));
          }.bind(this)
        }],
        onHandleClick: this.onSelectuserServer
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_edituserServerDialog__WEBPACK_IMPORTED_MODULE_13__["default"], {
        userServer: this.state.userServerToEdit,
        mode: this.state.userServerEditorMode,
        onClose: this.onCloseEdituserServerDialog
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_refreshuserDialog__WEBPACK_IMPORTED_MODULE_14__["default"], {
        mode: this.state.refreshuserEditorMode,
        onClose: this.onCloseRefreshuserDialog
      }));
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      if (!initialSorted) {
        initialSorted = true;
        this.props.userServersActions.onHandleRequestSort("name");
      } else {
        this.props.userServersActions.onRefresh();
      }
    }
  }]);
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);
var userServerSelection = Object(_mui_styles_withStyles__WEBPACK_IMPORTED_MODULE_2__["default"])(styles)(Object(_framework_src_flux_connect__WEBPACK_IMPORTED_MODULE_10__["connect"])(mapProps, mapDispatch)(userServerSelectionComponent));
/* harmony default export */ __webpack_exports__["default"] = (userServerSelection);

/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("./userPlugin.tsx");


/***/ }),

/***/ "dll-reference app":
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_dll_reference_app__;

/***/ }),

/***/ "dll-reference vendor":
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_dll_reference_vendor__;

/***/ })

/******/ });
});
//# sourceMappingURL=users.js.map