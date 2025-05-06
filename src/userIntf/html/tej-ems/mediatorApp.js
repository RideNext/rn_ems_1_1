(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("app"), require("vendor"));
	else if(typeof define === 'function' && define.amd)
		define(["app", "vendor"], factory);
	else if(typeof exports === 'object')
		exports["mediatorApp"] = factory(require("app"), require("vendor"));
	else
		root["mediatorApp"] = factory(root["app"], root["vendor"]);
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

/***/ "../../../framework/src/components/material-ui/panel.tsx":
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__("dll-reference app"))("./components/material-ui/panel.tsx");

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

/***/ "../../../node_modules/@mui/icons-material/Info.js":
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
  d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"
}), 'Info');
exports.default = _default;

/***/ }),

/***/ "../../../node_modules/@mui/icons-material/PlayArrow.js":
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
  d: "M8 5v14l11-7z"
}), 'PlayArrow');
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

/***/ "../../../node_modules/@mui/icons-material/Stop.js":
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
  d: "M6 6h12v12H6z"
}), 'Stop');
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

/***/ "../../../node_modules/@mui/material/CircularProgress/index.js":
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__("dll-reference vendor"))("../../node_modules/@mui/material/CircularProgress/index.js");

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

/***/ "../../../node_modules/@mui/material/Fab/index.js":
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__("dll-reference vendor"))("../../node_modules/@mui/material/Fab/index.js");

/***/ }),

/***/ "../../../node_modules/@mui/material/FormControl/index.js":
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__("dll-reference app"))("../../node_modules/@mui/material/FormControl/index.js");

/***/ }),

/***/ "../../../node_modules/@mui/material/IconButton/index.js":
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__("dll-reference app"))("../../node_modules/@mui/material/IconButton/index.js");

/***/ }),

/***/ "../../../node_modules/@mui/material/InputLabel/index.js":
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__("dll-reference app"))("../../node_modules/@mui/material/InputLabel/index.js");

/***/ }),

/***/ "../../../node_modules/@mui/material/MenuItem/index.js":
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__("dll-reference app"))("../../node_modules/@mui/material/MenuItem/index.js");

/***/ }),

/***/ "../../../node_modules/@mui/material/Select/index.js":
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__("dll-reference vendor"))("../../node_modules/@mui/material/Select/index.js");

/***/ }),

/***/ "../../../node_modules/@mui/material/Tab/index.js":
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__("dll-reference vendor"))("../../node_modules/@mui/material/Tab/index.js");

/***/ }),

/***/ "../../../node_modules/@mui/material/Tabs/index.js":
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__("dll-reference vendor"))("../../node_modules/@mui/material/Tabs/index.js");

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

/***/ "./actions/avaliableMediatorServersActions.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BaseAction", function() { return BaseAction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addAvaliableMediatorServerAsyncActionCreator", function() { return addAvaliableMediatorServerAsyncActionCreator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateAvaliableMediatorServerAsyncActionCreator", function() { return updateAvaliableMediatorServerAsyncActionCreator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeAvaliableMediatorServerAsyncActionCreator", function() { return removeAvaliableMediatorServerAsyncActionCreator; });
/* harmony import */ var _framework_src_flux_action__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../../framework/src/flux/action.ts");
/* harmony import */ var _framework_src_actions_snackbarActions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../../framework/src/actions/snackbarActions.ts");
/* harmony import */ var _handlers_avaliableMediatorServersHandler__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./handlers/avaliableMediatorServersHandler.ts");
/* harmony import */ var _services_mediatorService__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./services/mediatorService.ts");
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
/** Represents an async thunk action that will add a server to the avaliable mediator servers. */
var addAvaliableMediatorServerAsyncActionCreator = function addAvaliableMediatorServerAsyncActionCreator(server) {
  var _this2 = this;
  _newArrowCheck(this, _this);
  return function (dispatch) {
    var _this3 = this;
    _newArrowCheck(this, _this2);
    _services_mediatorService__WEBPACK_IMPORTED_MODULE_3__["default"].insertMediatorServer(server).then(function (_) {
      var _this4 = this;
      _newArrowCheck(this, _this3);
      window.setTimeout(function () {
        _newArrowCheck(this, _this4);
        dispatch(_handlers_avaliableMediatorServersHandler__WEBPACK_IMPORTED_MODULE_2__["avaliableMediatorServersReloadAction"]);
        dispatch(new _framework_src_actions_snackbarActions__WEBPACK_IMPORTED_MODULE_1__["AddSnackbarNotification"]({
          message: "Successfully added >>> 2 [".concat(server.name, "]"),
          options: {
            variant: 'success'
          }
        }));
      }.bind(this), 900);
    }.bind(this));
  }.bind(this);
}.bind(undefined);
/** Represents an async thunk action that will add a server to the avaliable mediator servers. */
var updateAvaliableMediatorServerAsyncActionCreator = function updateAvaliableMediatorServerAsyncActionCreator(server) {
  var _this5 = this;
  _newArrowCheck(this, _this);
  return function (dispatch) {
    var _this6 = this;
    _newArrowCheck(this, _this5);
    _services_mediatorService__WEBPACK_IMPORTED_MODULE_3__["default"].updateMediatorServer(server).then(function (_) {
      var _this7 = this;
      _newArrowCheck(this, _this6);
      window.setTimeout(function () {
        _newArrowCheck(this, _this7);
        dispatch(_handlers_avaliableMediatorServersHandler__WEBPACK_IMPORTED_MODULE_2__["avaliableMediatorServersReloadAction"]);
        dispatch(new _framework_src_actions_snackbarActions__WEBPACK_IMPORTED_MODULE_1__["AddSnackbarNotification"]({
          message: "Successfully updated [".concat(server.name, "]"),
          options: {
            variant: 'success'
          }
        }));
      }.bind(this), 900);
    }.bind(this));
  }.bind(this);
}.bind(undefined);
/** Represents an async thunk action that will delete a server from the avaliable mediator servers. */
var removeAvaliableMediatorServerAsyncActionCreator = function removeAvaliableMediatorServerAsyncActionCreator(server) {
  var _this8 = this;
  _newArrowCheck(this, _this);
  return function (dispatch) {
    var _this9 = this;
    _newArrowCheck(this, _this8);
    _services_mediatorService__WEBPACK_IMPORTED_MODULE_3__["default"].deleteMediatorServer(server).then(function (_) {
      var _this10 = this;
      _newArrowCheck(this, _this9);
      window.setTimeout(function () {
        _newArrowCheck(this, _this10);
        dispatch(_handlers_avaliableMediatorServersHandler__WEBPACK_IMPORTED_MODULE_2__["avaliableMediatorServersReloadAction"]);
        dispatch(new _framework_src_actions_snackbarActions__WEBPACK_IMPORTED_MODULE_1__["AddSnackbarNotification"]({
          message: "Successfully removed [".concat(server.name, "]"),
          options: {
            variant: 'success'
          }
        }));
      }.bind(this), 900);
    }.bind(this));
  }.bind(this);
}.bind(undefined);

/***/ }),

/***/ "./actions/mediatorConfigActions.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BaseAction", function() { return BaseAction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SetMediatorBusyByName", function() { return SetMediatorBusyByName; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddMediatorConfig", function() { return AddMediatorConfig; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UpdateMediatorConfig", function() { return UpdateMediatorConfig; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RemoveMediatorConfig", function() { return RemoveMediatorConfig; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "startMediatorByNameAsyncActionCreator", function() { return startMediatorByNameAsyncActionCreator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "stopMediatorByNameAsyncActionCreator", function() { return stopMediatorByNameAsyncActionCreator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addMediatorConfigAsyncActionCreator", function() { return addMediatorConfigAsyncActionCreator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateMediatorConfigAsyncActionCreator", function() { return updateMediatorConfigAsyncActionCreator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeMediatorConfigAsyncActionCreator", function() { return removeMediatorConfigAsyncActionCreator; });
/* harmony import */ var _framework_src_flux_action__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../../framework/src/flux/action.ts");
/* harmony import */ var _framework_src_actions_snackbarActions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../../framework/src/actions/snackbarActions.ts");
/* harmony import */ var _services_mediatorService__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./services/mediatorService.ts");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _this5 = undefined;
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
var SetMediatorBusyByName = /*#__PURE__*/function (_BaseAction) {
  function SetMediatorBusyByName(name, isBusy) {
    var _this;
    _classCallCheck(this, SetMediatorBusyByName);
    _this = _callSuper(this, SetMediatorBusyByName);
    _this.name = name;
    _this.isBusy = isBusy;
    return _this;
  }
  _inherits(SetMediatorBusyByName, _BaseAction);
  return _createClass(SetMediatorBusyByName);
}(BaseAction);
var AddMediatorConfig = /*#__PURE__*/function (_BaseAction2) {
  function AddMediatorConfig(mediatorConfig) {
    var _this2;
    _classCallCheck(this, AddMediatorConfig);
    _this2 = _callSuper(this, AddMediatorConfig);
    _this2.mediatorConfig = mediatorConfig;
    return _this2;
  }
  _inherits(AddMediatorConfig, _BaseAction2);
  return _createClass(AddMediatorConfig);
}(BaseAction);
var UpdateMediatorConfig = /*#__PURE__*/function (_BaseAction3) {
  function UpdateMediatorConfig(name, mediatorConfig) {
    var _this3;
    _classCallCheck(this, UpdateMediatorConfig);
    _this3 = _callSuper(this, UpdateMediatorConfig);
    _this3.name = name;
    _this3.mediatorConfig = mediatorConfig;
    return _this3;
  }
  _inherits(UpdateMediatorConfig, _BaseAction3);
  return _createClass(UpdateMediatorConfig);
}(BaseAction);
var RemoveMediatorConfig = /*#__PURE__*/function (_BaseAction4) {
  function RemoveMediatorConfig(name) {
    var _this4;
    _classCallCheck(this, RemoveMediatorConfig);
    _this4 = _callSuper(this, RemoveMediatorConfig);
    _this4.name = name;
    return _this4;
  }
  _inherits(RemoveMediatorConfig, _BaseAction4);
  return _createClass(RemoveMediatorConfig);
}(BaseAction);
var startMediatorByNameAsyncActionCreator = function startMediatorByNameAsyncActionCreator(name) {
  var _this6 = this;
  _newArrowCheck(this, _this5);
  return function (dispatch, getState) {
    var _this7 = this;
    _newArrowCheck(this, _this6);
    dispatch(new SetMediatorBusyByName(name, true));
    var _getState = getState(),
      id = _getState.mediator.mediatorServerState.id;
    if (id) {
      _services_mediatorService__WEBPACK_IMPORTED_MODULE_2__["default"].startMediatorByName(id, name).then(function (msg) {
        var _this8 = this;
        _newArrowCheck(this, _this7);
        dispatch(new _framework_src_actions_snackbarActions__WEBPACK_IMPORTED_MODULE_1__["AddSnackbarNotification"]({
          message: msg + ' ' + name,
          options: {
            variant: 'info'
          }
        }));
        // since there is no notification, a timeout will be need here
        window.setTimeout(function () {
          var _this9 = this;
          _newArrowCheck(this, _this8);
          _services_mediatorService__WEBPACK_IMPORTED_MODULE_2__["default"].getMediatorServerConfigByName(id, name).then(function (config) {
            _newArrowCheck(this, _this9);
            if (config) {
              dispatch(new UpdateMediatorConfig(name, config));
            } else {
              dispatch(new _framework_src_actions_snackbarActions__WEBPACK_IMPORTED_MODULE_1__["AddSnackbarNotification"]({
                message: "Error: reading mediator config for ".concat(name, "."),
                options: {
                  variant: 'error'
                }
              }));
            }
            dispatch(new SetMediatorBusyByName(name, false));
          }.bind(this));
        }.bind(this), 2100);
      }.bind(this));
    } else {
      dispatch(new _framework_src_actions_snackbarActions__WEBPACK_IMPORTED_MODULE_1__["AddSnackbarNotification"]({
        message: "Error: currently no mediator server selected.",
        options: {
          variant: 'error'
        }
      }));
      dispatch(new SetMediatorBusyByName(name, false));
    }
  }.bind(this);
}.bind(undefined);
var stopMediatorByNameAsyncActionCreator = function stopMediatorByNameAsyncActionCreator(name) {
  var _this10 = this;
  _newArrowCheck(this, _this5);
  return function (dispatch, getState) {
    var _this11 = this;
    _newArrowCheck(this, _this10);
    dispatch(new SetMediatorBusyByName(name, true));
    var _getState2 = getState(),
      id = _getState2.mediator.mediatorServerState.id;
    if (id) {
      _services_mediatorService__WEBPACK_IMPORTED_MODULE_2__["default"].stopMediatorByName(id, name).then(function (msg) {
        var _this12 = this;
        _newArrowCheck(this, _this11);
        dispatch(new _framework_src_actions_snackbarActions__WEBPACK_IMPORTED_MODULE_1__["AddSnackbarNotification"]({
          message: msg + ' ' + name,
          options: {
            variant: 'info'
          }
        }));
        // since there is no notification, a timeout will be need here
        window.setTimeout(function () {
          var _this13 = this;
          _newArrowCheck(this, _this12);
          _services_mediatorService__WEBPACK_IMPORTED_MODULE_2__["default"].getMediatorServerConfigByName(id, name).then(function (config) {
            _newArrowCheck(this, _this13);
            if (config) {
              dispatch(new UpdateMediatorConfig(name, config));
            } else {
              dispatch(new _framework_src_actions_snackbarActions__WEBPACK_IMPORTED_MODULE_1__["AddSnackbarNotification"]({
                message: "Error: reading mediator config for ".concat(name, "."),
                options: {
                  variant: 'error'
                }
              }));
            }
            dispatch(new SetMediatorBusyByName(name, false));
          }.bind(this));
        }.bind(this), 2100);
      }.bind(this));
    } else {
      dispatch(new _framework_src_actions_snackbarActions__WEBPACK_IMPORTED_MODULE_1__["AddSnackbarNotification"]({
        message: "Error: currently no mediator server selected.",
        options: {
          variant: 'error'
        }
      }));
      dispatch(new SetMediatorBusyByName(name, false));
    }
  }.bind(this);
}.bind(undefined);
var addMediatorConfigAsyncActionCreator = function addMediatorConfigAsyncActionCreator(config) {
  var _this14 = this;
  _newArrowCheck(this, _this5);
  return function (dispatch, getState) {
    var _this15 = this;
    _newArrowCheck(this, _this14);
    var name = config.Name;
    var _getState3 = getState(),
      id = _getState3.mediator.mediatorServerState.id;
    if (id) {
      _services_mediatorService__WEBPACK_IMPORTED_MODULE_2__["default"].createMediatorConfig(id, config).then(function (msg) {
        var _this16 = this;
        _newArrowCheck(this, _this15);
        dispatch(new _framework_src_actions_snackbarActions__WEBPACK_IMPORTED_MODULE_1__["AddSnackbarNotification"]({
          message: msg + ' ' + name,
          options: {
            variant: 'info'
          }
        }));
        // since there is no notification, a timeout will be need here
        window.setTimeout(function () {
          var _this17 = this;
          _newArrowCheck(this, _this16);
          _services_mediatorService__WEBPACK_IMPORTED_MODULE_2__["default"].getMediatorServerConfigByName(id, name).then(function (config) {
            _newArrowCheck(this, _this17);
            if (config) {
              dispatch(new AddMediatorConfig(config));
            } else {
              dispatch(new _framework_src_actions_snackbarActions__WEBPACK_IMPORTED_MODULE_1__["AddSnackbarNotification"]({
                message: "Error: reading mediator config for ".concat(name, "."),
                options: {
                  variant: 'error'
                }
              }));
            }
          }.bind(this));
        }.bind(this), 2100);
      }.bind(this));
    } else {
      dispatch(new _framework_src_actions_snackbarActions__WEBPACK_IMPORTED_MODULE_1__["AddSnackbarNotification"]({
        message: "Error: currently no mediator server selected.",
        options: {
          variant: 'error'
        }
      }));
    }
  }.bind(this);
}.bind(undefined);
var updateMediatorConfigAsyncActionCreator = function updateMediatorConfigAsyncActionCreator(config) {
  var _this18 = this;
  _newArrowCheck(this, _this5);
  return function (dispatch) {
    _newArrowCheck(this, _this18);
  } // currently not supported be backend
  .bind(this);
}.bind(undefined);
var removeMediatorConfigAsyncActionCreator = function removeMediatorConfigAsyncActionCreator(config) {
  var _this19 = this;
  _newArrowCheck(this, _this5);
  return function (dispatch, getState) {
    var _this20 = this;
    _newArrowCheck(this, _this19);
    var name = config.Name;
    var _getState4 = getState(),
      id = _getState4.mediator.mediatorServerState.id;
    if (id) {
      _services_mediatorService__WEBPACK_IMPORTED_MODULE_2__["default"].deleteMediatorConfigByName(id, name).then(function (msg) {
        var _this21 = this;
        _newArrowCheck(this, _this20);
        dispatch(new _framework_src_actions_snackbarActions__WEBPACK_IMPORTED_MODULE_1__["AddSnackbarNotification"]({
          message: msg + ' ' + name,
          options: {
            variant: 'info'
          }
        }));
        // since there is no notification, a timeout will be need here
        window.setTimeout(function () {
          var _this22 = this;
          _newArrowCheck(this, _this21);
          _services_mediatorService__WEBPACK_IMPORTED_MODULE_2__["default"].getMediatorServerConfigByName(id, config.Name).then(function (config) {
            _newArrowCheck(this, _this22);
            if (!config) {
              dispatch(new RemoveMediatorConfig(name));
            } else {
              dispatch(new _framework_src_actions_snackbarActions__WEBPACK_IMPORTED_MODULE_1__["AddSnackbarNotification"]({
                message: "Error: deleting mediator config for ".concat(name, "."),
                options: {
                  variant: 'error'
                }
              }));
            }
          }.bind(this));
        }.bind(this), 2100);
      }.bind(this));
    } else {
      dispatch(new _framework_src_actions_snackbarActions__WEBPACK_IMPORTED_MODULE_1__["AddSnackbarNotification"]({
        message: "Error: currently no mediator server selected.",
        options: {
          variant: 'error'
        }
      }));
      dispatch(new SetMediatorBusyByName(name, false));
    }
  }.bind(this);
}.bind(undefined);

/***/ }),

/***/ "./actions/mediatorServerActions.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BaseAction", function() { return BaseAction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SetMediatorServerBusy", function() { return SetMediatorServerBusy; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SetMediatorServerInfo", function() { return SetMediatorServerInfo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SetMediatorServerVersion", function() { return SetMediatorServerVersion; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SetAllMediatorServerConfigurations", function() { return SetAllMediatorServerConfigurations; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SetMediatorServerSupportedDevices", function() { return SetMediatorServerSupportedDevices; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SetMediatorServerReachable", function() { return SetMediatorServerReachable; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initializeMediatorServerAsyncActionCreator", function() { return initializeMediatorServerAsyncActionCreator; });
/* harmony import */ var core_js_modules_web_dom_iterable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../../node_modules/core-js/modules/web.dom.iterable.js");
/* harmony import */ var core_js_modules_web_dom_iterable__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_iterable__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _framework_src_flux_action__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../../framework/src/flux/action.ts");
/* harmony import */ var _services_mediatorService__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./services/mediatorService.ts");
/* harmony import */ var _framework_src_actions_snackbarActions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("../../../framework/src/actions/snackbarActions.ts");
/* harmony import */ var _framework_src_actions_navigationActions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("../../../framework/src/actions/navigationActions.ts");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }

var _this7 = undefined;
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
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
}(_framework_src_flux_action__WEBPACK_IMPORTED_MODULE_1__["Action"]);
var SetMediatorServerBusy = /*#__PURE__*/function (_BaseAction) {
  function SetMediatorServerBusy(isBusy) {
    var _this;
    _classCallCheck(this, SetMediatorServerBusy);
    _this = _callSuper(this, SetMediatorServerBusy);
    _this.isBusy = isBusy;
    return _this;
  }
  _inherits(SetMediatorServerBusy, _BaseAction);
  return _createClass(SetMediatorServerBusy);
}(BaseAction);
var SetMediatorServerInfo = /*#__PURE__*/function (_BaseAction2) {
  /**
   * Initializes a new instance of this class.
   */
  function SetMediatorServerInfo(id, name, url) {
    var _this2;
    _classCallCheck(this, SetMediatorServerInfo);
    _this2 = _callSuper(this, SetMediatorServerInfo);
    _this2.id = id;
    _this2.name = name;
    _this2.url = url;
    return _this2;
  }
  _inherits(SetMediatorServerInfo, _BaseAction2);
  return _createClass(SetMediatorServerInfo);
}(BaseAction);
var SetMediatorServerVersion = /*#__PURE__*/function (_BaseAction3) {
  /**
   * Initializes a new instance of this class.
   */
  function SetMediatorServerVersion(versionInfo) {
    var _this3;
    _classCallCheck(this, SetMediatorServerVersion);
    _this3 = _callSuper(this, SetMediatorServerVersion);
    _this3.versionInfo = versionInfo;
    return _this3;
  }
  _inherits(SetMediatorServerVersion, _BaseAction3);
  return _createClass(SetMediatorServerVersion);
}(BaseAction);
var SetAllMediatorServerConfigurations = /*#__PURE__*/function (_BaseAction4) {
  /**
   * Initializes a new instance of this class.
   */
  function SetAllMediatorServerConfigurations(allConfigurations) {
    var _this4;
    _classCallCheck(this, SetAllMediatorServerConfigurations);
    _this4 = _callSuper(this, SetAllMediatorServerConfigurations);
    _this4.allConfigurations = allConfigurations;
    return _this4;
  }
  _inherits(SetAllMediatorServerConfigurations, _BaseAction4);
  return _createClass(SetAllMediatorServerConfigurations);
}(BaseAction);
var SetMediatorServerSupportedDevices = /*#__PURE__*/function (_BaseAction5) {
  /**
   * Initializes a new instance of this class.
   */
  function SetMediatorServerSupportedDevices(devices) {
    var _this5;
    _classCallCheck(this, SetMediatorServerSupportedDevices);
    _this5 = _callSuper(this, SetMediatorServerSupportedDevices);
    _this5.devices = devices;
    return _this5;
  }
  _inherits(SetMediatorServerSupportedDevices, _BaseAction5);
  return _createClass(SetMediatorServerSupportedDevices);
}(BaseAction);
var SetMediatorServerReachable = /*#__PURE__*/function (_BaseAction6) {
  function SetMediatorServerReachable(isReachable) {
    var _this6;
    _classCallCheck(this, SetMediatorServerReachable);
    _this6 = _callSuper(this, SetMediatorServerReachable);
    _this6.isReachable = isReachable;
    return _this6;
  }
  _inherits(SetMediatorServerReachable, _BaseAction6);
  return _createClass(SetMediatorServerReachable);
}(BaseAction);
var initializeMediatorServerAsyncActionCreator = function initializeMediatorServerAsyncActionCreator(serverId) {
  var _this8 = this;
  _newArrowCheck(this, _this7);
  return function (dispatch) {
    var _this9 = this;
    _newArrowCheck(this, _this8);
    dispatch(new SetMediatorServerBusy(true));
    _services_mediatorService__WEBPACK_IMPORTED_MODULE_2__["default"].getMediatorServerById(serverId).then(function (mediatorServer) {
      var _this10 = this;
      _newArrowCheck(this, _this9);
      if (!mediatorServer) {
        dispatch(new SetMediatorServerBusy(false));
        dispatch(new _framework_src_actions_snackbarActions__WEBPACK_IMPORTED_MODULE_3__["AddSnackbarNotification"]({
          message: "Error loading mediator server [".concat(serverId, "]"),
          options: {
            variant: 'error'
          }
        }));
        dispatch(new _framework_src_actions_navigationActions__WEBPACK_IMPORTED_MODULE_4__["NavigateToApplication"]("mediator"));
        return;
      }
      dispatch(new SetMediatorServerInfo(mediatorServer.id, mediatorServer.name, mediatorServer.url));
      Promise.all([_services_mediatorService__WEBPACK_IMPORTED_MODULE_2__["default"].getMediatorServerAllConfigs(mediatorServer.id), _services_mediatorService__WEBPACK_IMPORTED_MODULE_2__["default"].getMediatorServerSupportedDevices(mediatorServer.id), _services_mediatorService__WEBPACK_IMPORTED_MODULE_2__["default"].getMediatorServerVersion(mediatorServer.id)]).then(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 3),
          configurations = _ref2[0],
          supportedDevices = _ref2[1],
          versionInfo = _ref2[2];
        _newArrowCheck(this, _this10);
        if (configurations === null && supportedDevices === null && versionInfo === null) {
          dispatch(new SetMediatorServerReachable(false));
        } else {
          dispatch(new SetMediatorServerReachable(true));
        }
        dispatch(new SetAllMediatorServerConfigurations(configurations));
        dispatch(new SetMediatorServerSupportedDevices(supportedDevices));
        dispatch(new SetMediatorServerVersion(versionInfo));
        dispatch(new SetMediatorServerBusy(false));
      }.bind(this)).catch(function (error) {
        _newArrowCheck(this, _this10);
        dispatch(new SetMediatorServerReachable(false));
        dispatch(new SetMediatorServerBusy(false));
      }.bind(this));
    }.bind(this));
  }.bind(this);
}.bind(undefined);

/***/ }),

/***/ "./assets/icons/mediatorAppIcon.svg":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "./images/mediatorAppIcon.svg";

/***/ }),

/***/ "./components/editMediatorConfigDialog.tsx":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EditMediatorConfigDialogMode", function() { return EditMediatorConfigDialogMode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EditMediatorConfigDialog", function() { return EditMediatorConfigDialog; });
/* harmony import */ var core_js_modules_web_dom_iterable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../../node_modules/core-js/modules/web.dom.iterable.js");
/* harmony import */ var core_js_modules_web_dom_iterable__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_iterable__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../../../node_modules/@mui/material/index.js");
/* harmony import */ var _mui_styles_createStyles__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("../../../node_modules/@mui/styles/createStyles/index.js");
/* harmony import */ var _mui_styles_withStyles__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("../../../node_modules/@mui/styles/withStyles/index.js");
/* harmony import */ var _mui_material_Button__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("../../../node_modules/@mui/material/Button/index.js");
/* harmony import */ var _mui_material_TextField__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("../../../node_modules/@mui/material/TextField/index.js");
/* harmony import */ var _mui_material_Select__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("../../../node_modules/@mui/material/Select/index.js");
/* harmony import */ var _mui_material_Dialog__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("../../../node_modules/@mui/material/Dialog/index.js");
/* harmony import */ var _mui_material_DialogActions__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("../../../node_modules/@mui/material/DialogActions/index.js");
/* harmony import */ var _mui_material_DialogContent__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("../../../node_modules/@mui/material/DialogContent/index.js");
/* harmony import */ var _mui_material_DialogContentText__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("../../../node_modules/@mui/material/DialogContentText/index.js");
/* harmony import */ var _mui_material_DialogTitle__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("../../../node_modules/@mui/material/DialogTitle/index.js");
/* harmony import */ var _mui_material_Tabs__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__("../../../node_modules/@mui/material/Tabs/index.js");
/* harmony import */ var _mui_material_Tab__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__("../../../node_modules/@mui/material/Tab/index.js");
/* harmony import */ var _mui_material_Fab__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__("../../../node_modules/@mui/material/Fab/index.js");
/* harmony import */ var _mui_icons_material_Add__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__("../../../node_modules/@mui/icons-material/Add.js");
/* harmony import */ var _mui_icons_material_Add__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(_mui_icons_material_Add__WEBPACK_IMPORTED_MODULE_16__);
/* harmony import */ var _mui_icons_material_Delete__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__("../../../node_modules/@mui/icons-material/Delete.js");
/* harmony import */ var _mui_icons_material_Delete__WEBPACK_IMPORTED_MODULE_17___default = /*#__PURE__*/__webpack_require__.n(_mui_icons_material_Delete__WEBPACK_IMPORTED_MODULE_17__);
/* harmony import */ var _mui_material_IconButton__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__("../../../node_modules/@mui/material/IconButton/index.js");
/* harmony import */ var _actions_mediatorConfigActions__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__("./actions/mediatorConfigActions.ts");
/* harmony import */ var _mui_material_FormControl__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__("../../../node_modules/@mui/material/FormControl/index.js");
/* harmony import */ var _mui_material_InputLabel__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__("../../../node_modules/@mui/material/InputLabel/index.js");
/* harmony import */ var _mui_material_MenuItem__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__("../../../node_modules/@mui/material/MenuItem/index.js");
/* harmony import */ var _framework_src_components_material_ui_panel__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__("../../../framework/src/components/material-ui/panel.tsx");
/* harmony import */ var _framework_src_flux_connect__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__("../../../framework/src/flux/connect.tsx");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }

var _this = undefined;
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
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
























var styles = function styles(theme) {
  _newArrowCheck(this, _this);
  return Object(_mui_styles_createStyles__WEBPACK_IMPORTED_MODULE_3__["default"])({
    root: {
      display: 'flex',
      flexDirection: 'column',
      flex: '1'
    },
    fab: {
      position: 'absolute',
      bottom: theme.spacing(1),
      right: theme.spacing(1)
    },
    title: {
      fontSize: 14
    },
    center: {
      flex: "1",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    },
    alignInOneLine: {
      display: 'flex',
      flexDirection: 'row'
    },
    left: {
      marginRight: theme.spacing(1)
    },
    right: {
      marginLeft: 0
    }
  });
}.bind(undefined);
var TabContainer = function TabContainer(_ref) {
  var children = _ref.children;
  _newArrowCheck(this, _this);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", {
    style: {
      width: "430px",
      height: "530px",
      position: "relative",
      display: 'flex',
      flexDirection: 'column'
    }
  }, children);
}.bind(undefined);
var EditMediatorConfigDialogMode;
(function (EditMediatorConfigDialogMode) {
  EditMediatorConfigDialogMode["None"] = "none";
  EditMediatorConfigDialogMode["AddMediatorConfig"] = "addMediatorConfig";
  EditMediatorConfigDialogMode["EditMediatorConfig"] = "editMediatorConfig";
  EditMediatorConfigDialogMode["RemoveMediatorConfig"] = "removeMediatorConfig";
})(EditMediatorConfigDialogMode || (EditMediatorConfigDialogMode = {}));
var mapProps = function mapProps(state) {
  _newArrowCheck(this, _this);
  return {
    supportedDevices: state.mediator.mediatorServerState.supportedDevices
  };
}.bind(undefined);
var mapDispatch = function mapDispatch(dispatcher) {
  var _this2 = this;
  _newArrowCheck(this, _this);
  return {
    addMediatorConfig: function addMediatorConfig(config) {
      _newArrowCheck(this, _this2);
      dispatcher.dispatch(Object(_actions_mediatorConfigActions__WEBPACK_IMPORTED_MODULE_19__["addMediatorConfigAsyncActionCreator"])(config));
    }.bind(this),
    updateMediatorConfig: function updateMediatorConfig(config) {
      _newArrowCheck(this, _this2);
      dispatcher.dispatch(Object(_actions_mediatorConfigActions__WEBPACK_IMPORTED_MODULE_19__["updateMediatorConfigAsyncActionCreator"])(config));
    }.bind(this),
    removeMediatorConfig: function removeMediatorConfig(config) {
      _newArrowCheck(this, _this2);
      dispatcher.dispatch(Object(_actions_mediatorConfigActions__WEBPACK_IMPORTED_MODULE_19__["removeMediatorConfigAsyncActionCreator"])(config));
    }.bind(this)
  };
}.bind(undefined);
var settings = _defineProperty(_defineProperty(_defineProperty(_defineProperty({}, EditMediatorConfigDialogMode.None, {
  dialogTitle: "",
  dialogDescription: "",
  applyButtonText: "",
  cancelButtonText: "",
  readonly: true,
  readonlyName: true
}), EditMediatorConfigDialogMode.AddMediatorConfig, {
  dialogTitle: "Add Mediator Configuration",
  dialogDescription: "",
  applyButtonText: "Add",
  cancelButtonText: "Cancel",
  readonly: false,
  readonlyName: false
}), EditMediatorConfigDialogMode.EditMediatorConfig, {
  dialogTitle: "Edit Mediator Configuration",
  dialogDescription: "",
  applyButtonText: "Update",
  cancelButtonText: "Cancel",
  readonly: false,
  readonlyName: true
}), EditMediatorConfigDialogMode.RemoveMediatorConfig, {
  dialogTitle: "Remove Mediator Configuration",
  dialogDescription: "",
  applyButtonText: "Remove",
  cancelButtonText: "Cancel",
  readonly: true,
  readonlyName: true
});
var EditMediatorConfigDialogComponent = /*#__PURE__*/function (_React$Component) {
  function EditMediatorConfigDialogComponent(props) {
    var _this4 = this;
    var _this3;
    _classCallCheck(this, EditMediatorConfigDialogComponent);
    _this3 = _callSuper(this, EditMediatorConfigDialogComponent, [props]);
    _this3.odlConfigValueChangeHandlerCreator = function (index, property, mapValue) {
      var _this5 = this;
      _newArrowCheck(this, _this4);
      return function (event) {
        _newArrowCheck(this, _this5);
        event.stopPropagation();
        event.preventDefault();
        _this3.setState({
          ODLConfig: [].concat(_toConsumableArray(_this3.state.ODLConfig.slice(0, index)), [Object.assign(Object.assign({}, _this3.state.ODLConfig[index]), _defineProperty({}, property, mapValue(event)))], _toConsumableArray(_this3.state.ODLConfig.slice(index + 1)))
        });
      }.bind(this);
    }.bind(this);
    _this3.addConfig = function (event) {
      var _this6 = this;
      _newArrowCheck(this, _this4);
      event.preventDefault();
      event.stopPropagation();
      if (_this3.state.ODLConfig.length === 0) {
        _this3.setState({
          activeTab: 1,
          forceAddOdlConfig: true
        });
      } else if (_this3.state.ODLConfig.length > 0) {
        for (var i = 0; i <= _this3.state.ODLConfig.length; i++) {
          if (_this3.isHostnameEmpty(i)) {
            _this3.setState({
              activeOdlConfig: 'panel-' + i
            });
            _this3.setState({
              isOdlConfigHostnameEmpty: true
            });
            return;
          }
        }
        _this3.onApply(Object.keys(_this3.state).reduce(function (acc, key) {
          _newArrowCheck(this, _this6);
          // do not copy additional state properties
          if (key !== "activeTab" && key !== "activeOdlConfig" && key !== "isOdlConfigHostnameEmpty" && key !== "forceAddOdlConfig" && key !== "_initialMediatorConfig") acc[key] = _this3.state[key];
          return acc;
        }.bind(this), {}));
        _this3.resetPanel();
      }
    }.bind(this);
    _this3.resetPanel = function () {
      _newArrowCheck(this, _this4);
      _this3.setState({
        forceAddOdlConfig: false,
        isOdlConfigHostnameEmpty: false,
        activeTab: 0
      });
    }.bind(this);
    _this3.hideHostnameErrormessage = function (panelId) {
      _newArrowCheck(this, _this4);
      if (panelId) {
        var id = Number(panelId.split('-')[1]);
        if (!_this3.isHostnameEmpty(id)) {
          _this3.setState({
            isOdlConfigHostnameEmpty: false
          });
        }
      }
    }.bind(this);
    _this3.isHostnameEmpty = function (id) {
      _newArrowCheck(this, _this4);
      var element = _this3.state.ODLConfig[id];
      if (element) {
        if (!element.Server) {
          return true;
        } else {
          return false;
        }
      } else {
        return null;
      }
    }.bind(this);
    _this3.onApply = function (config) {
      _newArrowCheck(this, _this4);
      _this3.props.onClose && _this3.props.onClose();
      switch (_this3.props.mode) {
        case EditMediatorConfigDialogMode.AddMediatorConfig:
          config && _this3.props.addMediatorConfig(config);
          break;
        case EditMediatorConfigDialogMode.EditMediatorConfig:
          config && _this3.props.updateMediatorConfig(config);
          break;
        case EditMediatorConfigDialogMode.RemoveMediatorConfig:
          config && _this3.props.removeMediatorConfig(config);
          break;
      }
    }.bind(this);
    _this3.onCancel = function () {
      _newArrowCheck(this, _this4);
      _this3.props.onClose && _this3.props.onClose();
    }.bind(this);
    _this3.state = Object.assign(Object.assign({}, _this3.props.mediatorConfig), {
      activeTab: 0,
      activeOdlConfig: "",
      forceAddOdlConfig: false,
      isOdlConfigHostnameEmpty: false
    });
    return _this3;
  }
  _inherits(EditMediatorConfigDialogComponent, _React$Component);
  return _createClass(EditMediatorConfigDialogComponent, [{
    key: "render",
    value: function render() {
      var _this7 = this;
      var setting = settings[this.props.mode];
      var classes = this.props.classes;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_mui_material_Dialog__WEBPACK_IMPORTED_MODULE_8__["default"], {
        open: this.props.mode !== EditMediatorConfigDialogMode.None
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_mui_material_DialogTitle__WEBPACK_IMPORTED_MODULE_12__["default"], {
        id: "form-dialog-title"
      }, setting.dialogTitle), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_mui_material_DialogContent__WEBPACK_IMPORTED_MODULE_10__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_mui_material_DialogContentText__WEBPACK_IMPORTED_MODULE_11__["default"], null, setting.dialogDescription), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_mui_material_Tabs__WEBPACK_IMPORTED_MODULE_13__["default"], {
        value: this.state.activeTab,
        indicatorColor: "secondary",
        textColor: "secondary",
        onChange: function (event, value) {
          _newArrowCheck(this, _this7);
          return this.setState({
            activeTab: value
          });
        }.bind(this)
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_mui_material_Tab__WEBPACK_IMPORTED_MODULE_14__["default"], {
        label: "Config"
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_mui_material_Tab__WEBPACK_IMPORTED_MODULE_14__["default"], {
        label: "ODL AutoConnect"
      })), this.state.activeTab === 0 ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["createElement"](TabContainer, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_mui_material_TextField__WEBPACK_IMPORTED_MODULE_6__["default"], {
        variant: "standard",
        disabled: setting.readonly || setting.readonlyName,
        spellCheck: false,
        autoFocus: true,
        margin: "dense",
        id: "name",
        label: "Name",
        type: "text",
        fullWidth: true,
        value: this.state.Name,
        onChange: function (event) {
          _newArrowCheck(this, _this7);
          this.setState({
            Name: event.target.value
          });
        }.bind(this)
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_mui_material_FormControl__WEBPACK_IMPORTED_MODULE_20__["default"], {
        variant: "standard",
        fullWidth: true,
        disabled: setting.readonly
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_mui_material_InputLabel__WEBPACK_IMPORTED_MODULE_21__["default"], {
        htmlFor: "deviceType"
      }, "Device"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_mui_material_Select__WEBPACK_IMPORTED_MODULE_7__["default"], {
        variant: "standard",
        value: this.state.DeviceType,
        onChange: function (event, value) {
          var _this8 = this;
          _newArrowCheck(this, _this7);
          var device = this.props.supportedDevices.find(function (device) {
            _newArrowCheck(this, _this8);
            return device.id === event.target.value;
          }.bind(this));
          if (device) {
            this.setState({
              DeviceType: device.id,
              NeXMLFile: device.xml
            });
          } else {
            this.setState({
              DeviceType: -1,
              NeXMLFile: ""
            });
          }
        }.bind(this),
        inputProps: {
          name: 'deviceType',
          id: 'deviceType'
        },
        fullWidth: true
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_mui_material_MenuItem__WEBPACK_IMPORTED_MODULE_22__["default"], {
        value: -1
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("em", null, "None")), this.props.supportedDevices.map(function (device) {
        _newArrowCheck(this, _this7);
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_mui_material_MenuItem__WEBPACK_IMPORTED_MODULE_22__["default"], {
          key: device.id,
          value: device.id
        }, "".concat(device.vendor, " - ").concat(device.device, " (").concat(device.version || '0.0.0', ") "));
      }.bind(this)))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_mui_material_TextField__WEBPACK_IMPORTED_MODULE_6__["default"], {
        variant: "standard",
        disabled: setting.readonly,
        spellCheck: false,
        autoFocus: true,
        margin: "dense",
        id: "ipAddress",
        label: "Device IP",
        type: "text",
        fullWidth: true,
        value: this.state.DeviceIp,
        onChange: function (event) {
          _newArrowCheck(this, _this7);
          this.setState({
            DeviceIp: event.target.value
          });
        }.bind(this)
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_mui_material_TextField__WEBPACK_IMPORTED_MODULE_6__["default"], {
        variant: "standard",
        disabled: setting.readonly,
        spellCheck: false,
        autoFocus: true,
        margin: "dense",
        id: "devicePort",
        label: "Device SNMP Port",
        type: "number",
        fullWidth: true,
        value: this.state.DevicePort || "",
        onChange: function (event) {
          _newArrowCheck(this, _this7);
          this.setState({
            DevicePort: +event.target.value
          });
        }.bind(this)
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_mui_material_TextField__WEBPACK_IMPORTED_MODULE_6__["default"], {
        variant: "standard",
        disabled: setting.readonly,
        spellCheck: false,
        autoFocus: true,
        margin: "dense",
        id: "trapsPort",
        label: "TrapsPort",
        type: "number",
        fullWidth: true,
        value: this.state.TrapPort || "",
        onChange: function (event) {
          _newArrowCheck(this, _this7);
          this.setState({
            TrapPort: +event.target.value
          });
        }.bind(this)
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_mui_material_TextField__WEBPACK_IMPORTED_MODULE_6__["default"], {
        variant: "standard",
        disabled: setting.readonly,
        spellCheck: false,
        autoFocus: true,
        margin: "dense",
        id: "ncUser",
        label: "Netconf User",
        type: "text",
        fullWidth: true,
        value: this.state.NcUsername,
        onChange: function (event) {
          _newArrowCheck(this, _this7);
          this.setState({
            NcUsername: event.target.value
          });
        }.bind(this)
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_mui_material_TextField__WEBPACK_IMPORTED_MODULE_6__["default"], {
        variant: "standard",
        disabled: setting.readonly,
        spellCheck: false,
        autoFocus: true,
        margin: "dense",
        id: "ncPassword",
        label: "Netconf Password",
        type: "password",
        fullWidth: true,
        value: this.state.NcPassword,
        onChange: function (event) {
          _newArrowCheck(this, _this7);
          this.setState({
            NcPassword: event.target.value
          });
        }.bind(this)
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_mui_material_TextField__WEBPACK_IMPORTED_MODULE_6__["default"], {
        variant: "standard",
        disabled: setting.readonly,
        spellCheck: false,
        autoFocus: true,
        margin: "dense",
        id: "ncPort",
        label: "Netconf Port",
        type: "number",
        fullWidth: true,
        value: this.state.NcPort || "",
        onChange: function (event) {
          _newArrowCheck(this, _this7);
          this.setState({
            NcPort: +event.target.value
          });
        }.bind(this)
      })) : null, this.state.activeTab === 1 ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["createElement"](TabContainer, null, this.state.ODLConfig && this.state.ODLConfig.length > 0 ? this.state.ODLConfig.map(function (cfg, ind) {
        var _this9 = this;
        _newArrowCheck(this, _this7);
        var panelId = "panel-".concat(ind);
        var deleteButton = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_mui_material_IconButton__WEBPACK_IMPORTED_MODULE_18__["default"], {
          onClick: function () {
            _newArrowCheck(this, _this9);
            this.setState({
              ODLConfig: [].concat(_toConsumableArray(this.state.ODLConfig.slice(0, ind)), _toConsumableArray(this.state.ODLConfig.slice(ind + 1)))
            });
          }.bind(this),
          size: "large"
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_mui_icons_material_Delete__WEBPACK_IMPORTED_MODULE_17___default.a, null));
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_framework_src_components_material_ui_panel__WEBPACK_IMPORTED_MODULE_23__["Panel"], {
          title: cfg.Server && "".concat(cfg.User ? "".concat(cfg.User, "@") : '').concat(cfg.Protocol, "://").concat(cfg.Server, ":").concat(cfg.Port) || "new odl config",
          key: panelId,
          panelId: panelId,
          activePanel: this.state.activeOdlConfig,
          customActionButtons: [deleteButton],
          onToggle: function (id) {
            _newArrowCheck(this, _this9);
            this.setState({
              activeOdlConfig: this.state.activeOdlConfig === id ? "" : id || ""
            });
            console.log("activeOdlConfig " + id);
            this.hideHostnameErrormessage(id);
          }.bind(this)
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", {
          className: classes.alignInOneLine
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_mui_material_FormControl__WEBPACK_IMPORTED_MODULE_20__["default"], {
          variant: "standard",
          className: classes.left,
          margin: "dense"
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_mui_material_InputLabel__WEBPACK_IMPORTED_MODULE_21__["default"], {
          htmlFor: "protocol-".concat(ind)
        }, "Protocoll"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_mui_material_Select__WEBPACK_IMPORTED_MODULE_7__["default"], {
          variant: "standard",
          value: cfg.Protocol,
          onChange: function (e, v) {
            var _this10 = this;
            _newArrowCheck(this, _this9);
            return this.odlConfigValueChangeHandlerCreator(ind, "Protocol", function (e) {
              _newArrowCheck(this, _this10);
              return v;
            }.bind(this));
          }.bind(this),
          inputProps: {
            name: "protocol-".concat(ind),
            id: "protocol-".concat(ind)
          },
          fullWidth: true
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_mui_material_MenuItem__WEBPACK_IMPORTED_MODULE_22__["default"], {
          value: "http"
        }, "http"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_mui_material_MenuItem__WEBPACK_IMPORTED_MODULE_22__["default"], {
          value: "https"
        }, "https"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_mui_material_TextField__WEBPACK_IMPORTED_MODULE_6__["default"], {
          variant: "standard",
          className: classes.left,
          spellCheck: false,
          margin: "dense",
          id: "hostname",
          label: "Hostname",
          type: "text",
          value: cfg.Server,
          onChange: this.odlConfigValueChangeHandlerCreator(ind, "Server", function (e) {
            _newArrowCheck(this, _this9);
            return e.target.value;
          }.bind(this))
        }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_mui_material_TextField__WEBPACK_IMPORTED_MODULE_6__["default"], {
          variant: "standard",
          className: classes.right,
          style: {
            maxWidth: "65px"
          },
          spellCheck: false,
          margin: "dense",
          id: "port",
          label: "Port",
          type: "number",
          value: cfg.Port || "",
          onChange: this.odlConfigValueChangeHandlerCreator(ind, "Port", function (e) {
            _newArrowCheck(this, _this9);
            return +e.target.value;
          }.bind(this))
        })), this.state.isOdlConfigHostnameEmpty && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_mui_material__WEBPACK_IMPORTED_MODULE_2__["Typography"], {
          component: "div",
          className: classes.left,
          color: "error",
          gutterBottom: true
        }, "Please add a hostname."), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", {
          className: classes.alignInOneLine
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_mui_material_TextField__WEBPACK_IMPORTED_MODULE_6__["default"], {
          variant: "standard",
          className: classes.left,
          spellCheck: false,
          margin: "dense",
          id: "username",
          label: "Username",
          type: "text",
          value: cfg.User,
          onChange: this.odlConfigValueChangeHandlerCreator(ind, "User", function (e) {
            _newArrowCheck(this, _this9);
            return e.target.value;
          }.bind(this))
        }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_mui_material_TextField__WEBPACK_IMPORTED_MODULE_6__["default"], {
          variant: "standard",
          className: classes.right,
          spellCheck: false,
          margin: "dense",
          id: "password",
          label: "Password",
          type: "password",
          value: cfg.Password,
          onChange: this.odlConfigValueChangeHandlerCreator(ind, "Password", function (e) {
            _newArrowCheck(this, _this9);
            return e.target.value;
          }.bind(this))
        })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", {
          className: classes.alignInOneLine
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_mui_material__WEBPACK_IMPORTED_MODULE_2__["FormControlLabel"], {
          className: classes.right,
          control: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_mui_material__WEBPACK_IMPORTED_MODULE_2__["Checkbox"], {
            checked: cfg.Trustall,
            onChange: this.odlConfigValueChangeHandlerCreator(ind, "Trustall", function (e) {
              _newArrowCheck(this, _this9);
              return e.target.checked;
            }.bind(this))
          }),
          label: "Trustall"
        })));
      }.bind(this)) : this.state.forceAddOdlConfig ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", {
        className: classes.center
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_mui_material__WEBPACK_IMPORTED_MODULE_2__["Typography"], {
        component: "div",
        className: classes.title,
        color: "error",
        gutterBottom: true
      }, "Please add at least one ODL auto connect configuration.")) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", {
        className: classes.center
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_mui_material__WEBPACK_IMPORTED_MODULE_2__["Typography"], {
        component: "div",
        className: classes.title,
        color: "textSecondary",
        gutterBottom: true
      }, "Please add an ODL auto connect configuration.")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_mui_material_Fab__WEBPACK_IMPORTED_MODULE_15__["default"], {
        className: classes.fab,
        color: "primary",
        "aria-label": "Add",
        onClick: function () {
          _newArrowCheck(this, _this7);
          return this.setState({
            ODLConfig: [].concat(_toConsumableArray(this.state.ODLConfig), [{
              Server: '',
              Port: 8181,
              Protocol: 'https',
              User: 'admin',
              Password: 'admin',
              Trustall: false
            }])
          });
        }.bind(this)
      }, " ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_mui_icons_material_Add__WEBPACK_IMPORTED_MODULE_16___default.a, null), " ")) : null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_mui_material_DialogActions__WEBPACK_IMPORTED_MODULE_9__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_mui_material_Button__WEBPACK_IMPORTED_MODULE_5__["default"], {
        color: "inherit",
        onClick: function (event) {
          _newArrowCheck(this, _this7);
          this.addConfig(event);
        }.bind(this)
      }, " ", setting.applyButtonText, " "), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_mui_material_Button__WEBPACK_IMPORTED_MODULE_5__["default"], {
        onClick: function (event) {
          _newArrowCheck(this, _this7);
          this.onCancel();
          event.preventDefault();
          event.stopPropagation();
          this.resetPanel();
        }.bind(this),
        color: "secondary"
      }, " ", setting.cancelButtonText, " ")));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(props, state) {
      if (props.mediatorConfig !== state._initialMediatorConfig) {
        state = Object.assign(Object.assign(Object.assign({}, state), props.mediatorConfig), {
          _initialMediatorConfig: props.mediatorConfig
        });
      }
      return state;
    }
  }]);
}(react__WEBPACK_IMPORTED_MODULE_1__["Component"]);
var EditMediatorConfigDialog = Object(_mui_styles_withStyles__WEBPACK_IMPORTED_MODULE_4__["default"])(styles)(Object(_framework_src_flux_connect__WEBPACK_IMPORTED_MODULE_24__["connect"])(mapProps, mapDispatch)(EditMediatorConfigDialogComponent));
/* harmony default export */ __webpack_exports__["default"] = (EditMediatorConfigDialog);

/***/ }),

/***/ "./components/editMediatorServerDialog.tsx":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EditMediatorServerDialogMode", function() { return EditMediatorServerDialogMode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EditMediatorServerDialog", function() { return EditMediatorServerDialog; });
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
/* harmony import */ var _actions_avaliableMediatorServersActions__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./actions/avaliableMediatorServersActions.ts");
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











var EditMediatorServerDialogMode;
(function (EditMediatorServerDialogMode) {
  EditMediatorServerDialogMode["None"] = "none";
  EditMediatorServerDialogMode["AddMediatorServer"] = "addMediatorServer";
  EditMediatorServerDialogMode["EditMediatorServer"] = "editMediatorServer";
  EditMediatorServerDialogMode["RemoveMediatorServer"] = "removeMediatorServer";
})(EditMediatorServerDialogMode || (EditMediatorServerDialogMode = {}));
var mapDispatch = function mapDispatch(dispatcher) {
  var _this2 = this;
  _newArrowCheck(this, _this);
  return {
    addMediatorServer: function addMediatorServer(element) {
      _newArrowCheck(this, _this2);
      dispatcher.dispatch(Object(_actions_avaliableMediatorServersActions__WEBPACK_IMPORTED_MODULE_9__["addAvaliableMediatorServerAsyncActionCreator"])(element));
    }.bind(this),
    updateMediatorServer: function updateMediatorServer(element) {
      _newArrowCheck(this, _this2);
      dispatcher.dispatch(Object(_actions_avaliableMediatorServersActions__WEBPACK_IMPORTED_MODULE_9__["updateAvaliableMediatorServerAsyncActionCreator"])(element));
    }.bind(this),
    removeMediatorServer: function removeMediatorServer(element) {
      _newArrowCheck(this, _this2);
      dispatcher.dispatch(Object(_actions_avaliableMediatorServersActions__WEBPACK_IMPORTED_MODULE_9__["removeAvaliableMediatorServerAsyncActionCreator"])(element));
    }.bind(this)
  };
}.bind(undefined);
var settings = _defineProperty(_defineProperty(_defineProperty(_defineProperty({}, EditMediatorServerDialogMode.None, {
  dialogTitle: "",
  dialogDescription: "",
  applyButtonText: "",
  cancelButtonText: "",
  readonly: true
}), EditMediatorServerDialogMode.AddMediatorServer, {
  dialogTitle: "Add Mediator Server",
  dialogDescription: "",
  applyButtonText: "Add",
  cancelButtonText: "Cancel",
  readonly: false
}), EditMediatorServerDialogMode.EditMediatorServer, {
  dialogTitle: "Edit Mediator Server",
  dialogDescription: "",
  applyButtonText: "Update",
  cancelButtonText: "Cancel",
  readonly: false
}), EditMediatorServerDialogMode.RemoveMediatorServer, {
  dialogTitle: "Remove Mediator Server",
  dialogDescription: "",
  applyButtonText: "Remove",
  cancelButtonText: "Cancel",
  readonly: true
});
var urlRegex = RegExp("^https?://");
var EditMediatorServerDialogComponent = /*#__PURE__*/function (_React$Component) {
  function EditMediatorServerDialogComponent(props) {
    var _this4 = this;
    var _this3;
    _classCallCheck(this, EditMediatorServerDialogComponent);
    _this3 = _callSuper(this, EditMediatorServerDialogComponent, [props]);
    _this3.areFieldsValid = function () {
      _newArrowCheck(this, _this4);
      return _this3.state.name.trim().length > 0 && _this3.state.url.trim().length > 0 && urlRegex.test(_this3.state.url);
    }.bind(this);
    _this3.createErrorMessages = function () {
      _newArrowCheck(this, _this4);
      var messages = [];
      if (_this3.state.name.trim().length === 0 && _this3.state.url.trim().length === 0) {
        messages.push("The server name and the url must not be empty.");
      } else if (_this3.state.url.trim().length === 0) {
        messages.push("The server url must not be empty.");
      } else if (_this3.state.name.trim().length === 0) {
        messages.push("The server name must not be empty.");
      }
      if (!urlRegex.test(_this3.state.url)) {
        if (messages.length > 0) {
          return messages.concat(["The server url must start with 'http(s)://'."]);
        } else {
          return ["The server url must start with 'http(s)://'."];
        }
      }
      return messages;
    }.bind(this);
    _this3.onApply = function (element) {
      _newArrowCheck(this, _this4);
      _this3.props.onClose && _this3.props.onClose();
      switch (_this3.props.mode) {
        case EditMediatorServerDialogMode.AddMediatorServer:
          element && _this3.props.addMediatorServer(element);
          break;
        case EditMediatorServerDialogMode.EditMediatorServer:
          element && _this3.props.updateMediatorServer(element);
          break;
        case EditMediatorServerDialogMode.RemoveMediatorServer:
          element && _this3.props.removeMediatorServer(element);
          break;
      }
    }.bind(this);
    _this3.onCancel = function () {
      _newArrowCheck(this, _this4);
      _this3.props.onClose && _this3.props.onClose();
    }.bind(this);
    _this3.state = Object.assign(Object.assign({}, _this3.props.mediatorServer), {
      errorMessage: []
    });
    return _this3;
  }
  _inherits(EditMediatorServerDialogComponent, _React$Component);
  return _createClass(EditMediatorServerDialogComponent, [{
    key: "render",
    value: function render() {
      var _this5 = this;
      var setting = settings[this.props.mode];
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_mui_material_Dialog__WEBPACK_IMPORTED_MODULE_3__["default"], {
        open: this.props.mode !== EditMediatorServerDialogMode.None
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
        disabled: setting.readonly,
        spellCheck: false,
        margin: "dense",
        id: "name",
        label: "Name",
        type: "text",
        fullWidth: true,
        value: this.state.name,
        onChange: function (event) {
          _newArrowCheck(this, _this5);
          this.setState({
            name: event.target.value
          });
        }.bind(this)
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_mui_material_TextField__WEBPACK_IMPORTED_MODULE_2__["default"], {
        variant: "standard",
        disabled: setting.readonly,
        spellCheck: false,
        margin: "dense",
        id: "url",
        label: "Url",
        type: "text",
        fullWidth: true,
        value: this.state.url,
        onChange: function (event) {
          _newArrowCheck(this, _this5);
          this.setState({
            url: event.target.value
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
              name: this.state.name,
              url: this.state.url
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
      }, " ", setting.cancelButtonText, " ")));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(props, state) {
      if (props.mediatorServer !== state._initialMediatorServer) {
        state = Object.assign(Object.assign(Object.assign({}, state), props.mediatorServer), {
          _initialMediatorServer: props.mediatorServer
        });
      }
      return state;
    }
  }]);
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);
var EditMediatorServerDialog = Object(_framework_src_flux_connect__WEBPACK_IMPORTED_MODULE_8__["connect"])(undefined, mapDispatch)(EditMediatorServerDialogComponent);
/* harmony default export */ __webpack_exports__["default"] = (EditMediatorServerDialog);

/***/ }),

/***/ "./components/refreshMediatorDialog.tsx":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RefreshMediatorDialogMode", function() { return RefreshMediatorDialogMode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RefreshMediatorDialog", function() { return RefreshMediatorDialog; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _mui_material_Button__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../../node_modules/@mui/material/Button/index.js");
/* harmony import */ var _mui_material_Dialog__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../../../node_modules/@mui/material/Dialog/index.js");
/* harmony import */ var _mui_material_DialogActions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("../../../node_modules/@mui/material/DialogActions/index.js");
/* harmony import */ var _mui_material_DialogContent__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("../../../node_modules/@mui/material/DialogContent/index.js");
/* harmony import */ var _mui_material_DialogContentText__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("../../../node_modules/@mui/material/DialogContentText/index.js");
/* harmony import */ var _mui_material_DialogTitle__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("../../../node_modules/@mui/material/DialogTitle/index.js");
/* harmony import */ var _handlers_avaliableMediatorServersHandler__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./handlers/avaliableMediatorServersHandler.ts");
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









var RefreshMediatorDialogMode;
(function (RefreshMediatorDialogMode) {
  RefreshMediatorDialogMode["None"] = "none";
  RefreshMediatorDialogMode["RefreshMediatorTable"] = "RefreshMediatorTable";
})(RefreshMediatorDialogMode || (RefreshMediatorDialogMode = {}));
var mapDispatch = function mapDispatch(dispatcher) {
  var _this2 = this;
  _newArrowCheck(this, _this);
  return {
    refreshMediator: function refreshMediator() {
      _newArrowCheck(this, _this2);
      return dispatcher.dispatch(_handlers_avaliableMediatorServersHandler__WEBPACK_IMPORTED_MODULE_7__["avaliableMediatorServersReloadAction"]);
    }.bind(this)
  };
}.bind(undefined);
var settings = _defineProperty(_defineProperty({}, RefreshMediatorDialogMode.None, {
  dialogTitle: "",
  dialogDescription: "",
  applyButtonText: "",
  cancelButtonText: "",
  enableMountIdEditor: false,
  enableUsernameEditor: false,
  enableExtendedEditor: false
}), RefreshMediatorDialogMode.RefreshMediatorTable, {
  dialogTitle: "Do you want to refresh the Mediator table?",
  dialogDescription: "",
  applyButtonText: "Yes",
  cancelButtonText: "Cancel",
  enableMountIdEditor: true,
  enableUsernameEditor: true,
  enableExtendedEditor: true
});
var RefreshMediatorDialogComponent = /*#__PURE__*/function (_React$Component) {
  function RefreshMediatorDialogComponent(props) {
    var _this4 = this;
    var _this3;
    _classCallCheck(this, RefreshMediatorDialogComponent);
    _this3 = _callSuper(this, RefreshMediatorDialogComponent, [props]);
    _this3.onRefresh = function () {
      _newArrowCheck(this, _this4);
      _this3.props.refreshMediator();
      _this3.props.onClose();
    }.bind(this);
    _this3.onCancel = function () {
      _newArrowCheck(this, _this4);
      _this3.props.onClose();
    }.bind(this);
    return _this3;
  }
  _inherits(RefreshMediatorDialogComponent, _React$Component);
  return _createClass(RefreshMediatorDialogComponent, [{
    key: "render",
    value: function render() {
      var _this5 = this;
      var setting = settings[this.props.mode];
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_mui_material_Dialog__WEBPACK_IMPORTED_MODULE_2__["default"], {
        open: this.props.mode !== RefreshMediatorDialogMode.None
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
var RefreshMediatorDialog = Object(_framework_src_flux_connect__WEBPACK_IMPORTED_MODULE_8__["connect"])(undefined, mapDispatch)(RefreshMediatorDialogComponent);
/* harmony default export */ __webpack_exports__["default"] = (RefreshMediatorDialog);

/***/ }),

/***/ "./components/showMeditaorInfoDialog.tsx":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MediatorInfoDialogMode", function() { return MediatorInfoDialogMode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ShowMediatorInfoDialog", function() { return ShowMediatorInfoDialog; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../../node_modules/@mui/material/index.js");
/* harmony import */ var _framework_src_flux_connect__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../../../framework/src/flux/connect.tsx");
/* harmony import */ var _framework_src_components_material_ui_panel__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("../../../framework/src/components/material-ui/panel.tsx");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _this = undefined;
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




var MediatorInfoDialogMode;
(function (MediatorInfoDialogMode) {
  MediatorInfoDialogMode["None"] = "none";
  MediatorInfoDialogMode["ShowDetails"] = "showDetails";
})(MediatorInfoDialogMode || (MediatorInfoDialogMode = {}));
var mapProps = function mapProps(state) {
  _newArrowCheck(this, _this);
  return {
    supportedDevices: state.mediator.mediatorServerState.supportedDevices
  };
}.bind(undefined);
/*
Displays all values of a mediator server
*/
var ShowMediatorInfoDialogComponent = /*#__PURE__*/function (_React$Component) {
  function ShowMediatorInfoDialogComponent(props) {
    var _this3 = this;
    var _this2;
    _classCallCheck(this, ShowMediatorInfoDialogComponent);
    _this2 = _callSuper(this, ShowMediatorInfoDialogComponent, [props]);
    _this2.onClose = function (event) {
      _newArrowCheck(this, _this3);
      event.preventDefault();
      event.stopPropagation();
      _this2.props.onClose();
    }.bind(this);
    if (_this2.props.config) {
      var deviceType = props.supportedDevices.find(function (element) {
        _newArrowCheck(this, _this3);
        return element.id === _this2.props.config.DeviceType;
      }.bind(this));
      _this2.state = {
        status: props.config.pid > 0 ? "Running" : "Stopped",
        devicetype: deviceType != undefined ? deviceType.device : 'none',
        activeOdlConfig: ''
      };
    }
    return _this2;
  }
  _inherits(ShowMediatorInfoDialogComponent, _React$Component);
  return _createClass(ShowMediatorInfoDialogComponent, [{
    key: "render",
    value: function render() {
      var _this4 = this;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_1__["Dialog"], {
        open: this.props.mode !== MediatorInfoDialogMode.None,
        onBackdropClick: this.props.onClose
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_1__["DialogTitle"], null, this.props.config.Name), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_1__["DialogContent"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_1__["TextField"], {
        variant: "standard",
        disabled: true,
        margin: "dense",
        id: "deviceIp",
        label: "Device IP",
        fullWidth: true,
        defaultValue: this.props.config.DeviceIp
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_1__["TextField"], {
        variant: "standard",
        disabled: true,
        margin: "dense",
        id: "deviceport",
        label: "Device Port",
        fullWidth: true,
        defaultValue: this.props.config.DevicePort
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_1__["TextField"], {
        variant: "standard",
        disabled: true,
        margin: "dense",
        id: "status",
        label: "Status",
        fullWidth: true,
        defaultValue: this.state.status
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_1__["TextField"], {
        variant: "standard",
        disabled: true,
        margin: "dense",
        id: "deviceType",
        label: "Device Type",
        fullWidth: true,
        defaultValue: this.state.devicetype
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_1__["TextField"], {
        variant: "standard",
        disabled: true,
        margin: "dense",
        id: "ncPort",
        label: "Netconf Port",
        fullWidth: true,
        defaultValue: this.props.config.NcPort
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_1__["FormGroup"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_1__["FormControlLabel"], {
        control: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_1__["Checkbox"], {
          disabled: true,
          defaultChecked: this.props.config.IsNCConnected
        }),
        label: "Netconf Connection"
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_1__["FormControlLabel"], {
        control: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_1__["Checkbox"], {
          disabled: true,
          defaultChecked: this.props.config.IsNeConnected
        }),
        label: "Network Element Connection"
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_1__["FormControlLabel"], {
        control: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_1__["Checkbox"], {
          disabled: true,
          defaultChecked: this.props.config.fwactive
        }),
        label: "Firewall active"
      })), this.props.config.ODLConfig.map(function (element, index) {
        var _this5 = this;
        _newArrowCheck(this, _this4);
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_framework_src_components_material_ui_panel__WEBPACK_IMPORTED_MODULE_3__["Panel"], {
          title: "ODL config " + (this.props.config.ODLConfig.length > 1 ? index + 1 : ''),
          key: index,
          panelId: 'panel-' + index,
          activePanel: this.state.activeOdlConfig,
          onToggle: function (id) {
            _newArrowCheck(this, _this5);
            this.setState({
              activeOdlConfig: this.state.activeOdlConfig === id ? "" : id || ""
            });
          }.bind(this)
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_1__["TextField"], {
          variant: "standard",
          disabled: true,
          margin: "dense",
          defaultValue: element.Protocol + '://' + element.Server,
          label: "Server"
        }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_1__["TextField"], {
          variant: "standard",
          disabled: true,
          margin: "dense",
          defaultValue: element.Port,
          label: "Port"
        }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_1__["FormControlLabel"], {
          control: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_1__["Checkbox"], {
            disabled: true,
            checked: element.Trustall
          }),
          label: "Trustall"
        }));
      }.bind(this))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_1__["DialogActions"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_1__["Button"], {
        onClick: this.onClose,
        color: "inherit"
      }, "Close")));
    }
  }]);
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);
var ShowMediatorInfoDialog = Object(_framework_src_flux_connect__WEBPACK_IMPORTED_MODULE_2__["connect"])(mapProps)(ShowMediatorInfoDialogComponent);
/* harmony default export */ __webpack_exports__["default"] = (ShowMediatorInfoDialog);

/***/ }),

/***/ "./handlers/avaliableMediatorServersHandler.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "avaliableMediatorServersActionHandler", function() { return avaliableMediatorServersActionHandler; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createAvaliableMediatorServersActions", function() { return createAvaliableMediatorServersActions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createAvaliableMediatorServersProperties", function() { return createAvaliableMediatorServersProperties; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "avaliableMediatorServersReloadAction", function() { return avaliableMediatorServersReloadAction; });
/* harmony import */ var _framework_src_components_material_table_utilities__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../../framework/src/components/material-table/utilities.ts");
/* harmony import */ var _framework_src_utilities_elasticSearch__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../../framework/src/utilities/elasticSearch.ts");
/* harmony import */ var _services_mediatorService__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./services/mediatorService.ts");
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
var avaliableMediatorServersSearchHandler = Object(_framework_src_utilities_elasticSearch__WEBPACK_IMPORTED_MODULE_1__["createSearchDataHandler"])(_services_mediatorService__WEBPACK_IMPORTED_MODULE_2__["mediatorServerResourcePath"]);
var _createExternal = Object(_framework_src_components_material_table_utilities__WEBPACK_IMPORTED_MODULE_0__["createExternal"])(avaliableMediatorServersSearchHandler, function (appState) {
    _newArrowCheck(this, _this);
    return appState.mediator.avaliableMediatorServers;
  }.bind(undefined)),
  avaliableMediatorServersActionHandler = _createExternal.actionHandler,
  createAvaliableMediatorServersActions = _createExternal.createActions,
  createAvaliableMediatorServersProperties = _createExternal.createProperties,
  avaliableMediatorServersReloadAction = _createExternal.reloadAction;


/***/ }),

/***/ "./handlers/mediatorAppRootHandler.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mediatorAppRootHandler", function() { return mediatorAppRootHandler; });
/* harmony import */ var _framework_src_flux_middleware__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../../framework/src/flux/middleware.ts");
/* harmony import */ var _avaliableMediatorServersHandler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./handlers/avaliableMediatorServersHandler.ts");
/* harmony import */ var _mediatorServerHandler__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./handlers/mediatorServerHandler.ts");
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
  avaliableMediatorServers: _avaliableMediatorServersHandler__WEBPACK_IMPORTED_MODULE_1__["avaliableMediatorServersActionHandler"],
  mediatorServerState: _mediatorServerHandler__WEBPACK_IMPORTED_MODULE_2__["mediatorServerHandler"]
};
var mediatorAppRootHandler = Object(_framework_src_flux_middleware__WEBPACK_IMPORTED_MODULE_0__["combineActionHandler"])(actionHandlers);
/* harmony default export */ __webpack_exports__["default"] = (mediatorAppRootHandler);

/***/ }),

/***/ "./handlers/mediatorServerHandler.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mediatorServerHandler", function() { return mediatorServerHandler; });
/* harmony import */ var _models_mediatorServer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./models/mediatorServer.ts");
/* harmony import */ var _actions_mediatorServerActions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./actions/mediatorServerActions.ts");
/* harmony import */ var _actions_mediatorConfigActions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./actions/mediatorConfigActions.ts");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _this = undefined;
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
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



var mediatorServerInit = {
  busy: false,
  name: null,
  url: null,
  id: null,
  serverVersion: null,
  mediatorVersion: null,
  nexmls: [],
  configurations: [],
  supportedDevices: [],
  isReachable: true
};
var mediatorServerHandler = function mediatorServerHandler() {
  var _this2 = this;
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : mediatorServerInit;
  var action = arguments.length > 1 ? arguments[1] : undefined;
  _newArrowCheck(this, _this);
  if (action instanceof _actions_mediatorServerActions__WEBPACK_IMPORTED_MODULE_1__["SetMediatorServerBusy"]) {
    state = Object.assign(Object.assign({}, state), {
      busy: action.isBusy
    });
  } else if (action instanceof _actions_mediatorServerActions__WEBPACK_IMPORTED_MODULE_1__["SetMediatorServerInfo"]) {
    state = Object.assign(Object.assign({}, state), {
      name: action.name,
      url: action.url,
      id: action.id
    });
  } else if (action instanceof _actions_mediatorServerActions__WEBPACK_IMPORTED_MODULE_1__["SetMediatorServerVersion"]) {
    state = Object.assign(Object.assign({}, state), {
      serverVersion: action.versionInfo && action.versionInfo.server,
      mediatorVersion: action.versionInfo && action.versionInfo.mediator,
      nexmls: action.versionInfo && _toConsumableArray(action.versionInfo.nexmls) || []
    });
  } else if (action instanceof _actions_mediatorServerActions__WEBPACK_IMPORTED_MODULE_1__["SetAllMediatorServerConfigurations"]) {
    state = Object.assign(Object.assign({}, state), {
      configurations: action.allConfigurations && action.allConfigurations.map(function (config) {
        _newArrowCheck(this, _this2);
        return Object.assign(Object.assign({}, config), {
          busy: false
        });
      }.bind(this)) || []
    });
  } else if (action instanceof _actions_mediatorServerActions__WEBPACK_IMPORTED_MODULE_1__["SetMediatorServerSupportedDevices"]) {
    state = Object.assign(Object.assign({}, state), {
      supportedDevices: action.devices || []
    });
  } else if (action instanceof _actions_mediatorConfigActions__WEBPACK_IMPORTED_MODULE_2__["SetMediatorBusyByName"]) {
    var index = state.configurations.findIndex(function (config) {
      _newArrowCheck(this, _this2);
      return config.Name === action.name;
    }.bind(this));
    if (index > -1) state = Object.assign(Object.assign({}, state), {
      configurations: [].concat(_toConsumableArray(state.configurations.slice(0, index)), [Object.assign(Object.assign({}, state.configurations[index]), _defineProperty({}, _models_mediatorServer__WEBPACK_IMPORTED_MODULE_0__["BusySymbol"], action.isBusy))], _toConsumableArray(state.configurations.slice(index + 1)))
    });
  } else if (action instanceof _actions_mediatorConfigActions__WEBPACK_IMPORTED_MODULE_2__["AddMediatorConfig"]) {
    state = Object.assign(Object.assign({}, state), {
      configurations: [].concat(_toConsumableArray(state.configurations), [action.mediatorConfig])
    });
  } else if (action instanceof _actions_mediatorConfigActions__WEBPACK_IMPORTED_MODULE_2__["UpdateMediatorConfig"]) {
    var _index = state.configurations.findIndex(function (config) {
      _newArrowCheck(this, _this2);
      return config.Name === action.name;
    }.bind(this));
    if (_index > -1) state = Object.assign(Object.assign({}, state), {
      configurations: [].concat(_toConsumableArray(state.configurations.slice(0, _index)), [Object.assign(Object.assign({}, action.mediatorConfig), _defineProperty({}, _models_mediatorServer__WEBPACK_IMPORTED_MODULE_0__["BusySymbol"], state.configurations[_index][_models_mediatorServer__WEBPACK_IMPORTED_MODULE_0__["BusySymbol"]]))], _toConsumableArray(state.configurations.slice(_index + 1)))
    });
  } else if (action instanceof _actions_mediatorConfigActions__WEBPACK_IMPORTED_MODULE_2__["RemoveMediatorConfig"]) {
    var _index2 = state.configurations.findIndex(function (config) {
      _newArrowCheck(this, _this2);
      return config.Name === action.name;
    }.bind(this));
    if (_index2 > -1) state = Object.assign(Object.assign({}, state), {
      configurations: [].concat(_toConsumableArray(state.configurations.slice(0, _index2)), _toConsumableArray(state.configurations.slice(_index2 + 1)))
    });
  } else if (action instanceof _actions_mediatorServerActions__WEBPACK_IMPORTED_MODULE_1__["SetMediatorServerReachable"]) {
    state = Object.assign(Object.assign({}, state), {
      isReachable: action.isReachable
    });
  }
  return state;
}.bind(undefined);

/***/ }),

/***/ "./models/mediatorServer.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BusySymbol", function() { return BusySymbol; });
var BusySymbol = Symbol("Busy");

/***/ }),

/***/ "./plugin.tsx":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "register", function() { return register; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../../node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var _framework_src_services_applicationManager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../../../framework/src/services/applicationManager.ts");
/* harmony import */ var _framework_src_flux_connect__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("../../../framework/src/flux/connect.tsx");
/* harmony import */ var _handlers_mediatorAppRootHandler__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./handlers/mediatorAppRootHandler.ts");
/* harmony import */ var _handlers_avaliableMediatorServersHandler__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./handlers/avaliableMediatorServersHandler.ts");
/* harmony import */ var _views_mediatorApplication__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./views/mediatorApplication.tsx");
/* harmony import */ var _views_mediatorServerSelection__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./views/mediatorServerSelection.tsx");
/* harmony import */ var _actions_mediatorServerActions__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./actions/mediatorServerActions.ts");
var _this = undefined;
function _newArrowCheck(n, r) { if (n !== r) throw new TypeError("Cannot instantiate an arrow function"); }
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
// app configuration and main entry point for the app









var appIcon = __webpack_require__("./assets/icons/mediatorAppIcon.svg"); // select app icon
var currentMediatorServerId = undefined;
var mapDisp = function mapDisp(dispatcher) {
  var _this2 = this;
  _newArrowCheck(this, _this);
  return {
    loadMediatorServer: function loadMediatorServer(mediatorServerId) {
      _newArrowCheck(this, _this2);
      return dispatcher.dispatch(Object(_actions_mediatorServerActions__WEBPACK_IMPORTED_MODULE_8__["initializeMediatorServerAsyncActionCreator"])(mediatorServerId));
    }.bind(this)
  };
}.bind(undefined);
var MediatorServerRouteAdapter = Object(_framework_src_flux_connect__WEBPACK_IMPORTED_MODULE_3__["connect"])(undefined, mapDisp)(function (props) {
  var _this3 = this;
  _newArrowCheck(this, _this);
  if (currentMediatorServerId !== props.match.params.mediatorServerId) {
    // route parameter has changed
    currentMediatorServerId = props.match.params.mediatorServerId || undefined;
    // Hint: This timeout is need, since it is not recommended to change the state while rendering is in progress !
    window.setTimeout(function () {
      _newArrowCheck(this, _this3);
      if (currentMediatorServerId) {
        props.loadMediatorServer(currentMediatorServerId);
      }
    }.bind(this));
  }
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_views_mediatorApplication__WEBPACK_IMPORTED_MODULE_6__["MediatorApplication"], null);
}.bind(undefined));
var App = function App(props) {
  _newArrowCheck(this, _this);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Switch"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Route"], {
    exact: true,
    path: "".concat(props.match.path),
    component: _views_mediatorServerSelection__WEBPACK_IMPORTED_MODULE_7__["MediatorServerSelection"]
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Route"], {
    path: "".concat(props.match.path, "/:mediatorServerId"),
    component: MediatorServerRouteAdapter
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Redirect"], {
    to: "".concat(props.match.path)
  }));
}.bind(undefined);
var FinalApp = Object(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["withRouter"])(Object(_framework_src_flux_connect__WEBPACK_IMPORTED_MODULE_3__["connect"])()(App));
function register() {
  var _this4 = this;
  var applicationApi = _framework_src_services_applicationManager__WEBPACK_IMPORTED_MODULE_2__["default"].registerApplication({
    name: "mediator",
    icon: appIcon,
    rootComponent: FinalApp,
    rootActionHandler: _handlers_mediatorAppRootHandler__WEBPACK_IMPORTED_MODULE_4__["mediatorAppRootHandler"],
    menuEntry: "Mediator"
  });
  // prefetch all available mediator servers
  applicationApi.applicationStoreInitialized.then(function (applicationStore) {
    _newArrowCheck(this, _this4);
    applicationStore.dispatch(_handlers_avaliableMediatorServersHandler__WEBPACK_IMPORTED_MODULE_5__["avaliableMediatorServersReloadAction"]);
  }.bind(this));
}
;

/***/ }),

/***/ "./services/mediatorService.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mediatorServerResourcePath", function() { return mediatorServerResourcePath; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mediatorService", function() { return mediatorService; });
/* harmony import */ var core_js_modules_web_dom_iterable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../../node_modules/core-js/modules/web.dom.iterable.js");
/* harmony import */ var core_js_modules_web_dom_iterable__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_iterable__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../../node_modules/regenerator-runtime/runtime.js");
/* harmony import */ var regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _framework_src_services_restService__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../../../framework/src/services/restService.ts");


function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator.return && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, catch: function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
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

var mediatorServerResourcePath = "mediator-server";
/**
 * Represents a web api accessor service for all mediator server actions.
 */
var MediatorService = /*#__PURE__*/function () {
  function MediatorService() {
    _classCallCheck(this, MediatorService);
  }
  return _createClass(MediatorService, [{
    key: "insertMediatorServer",
    value:
    /**
      * Inserts data into the mediator servers table.
      */
    function insertMediatorServer(server) {
      return __awaiter(this, void 0, void 0, /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        var path, data, result;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              path = "/restconf/operations/data-provider:create-mediator-server";
              data = {
                "url": server.url,
                "name": server.name
              };
              _context.next = 4;
              return Object(_framework_src_services_restService__WEBPACK_IMPORTED_MODULE_2__["requestRest"])(path, {
                method: "POST",
                body: JSON.stringify({
                  input: data
                })
              });
            case 4:
              result = _context.sent;
              return _context.abrupt("return", result || null);
            case 6:
            case "end":
              return _context.stop();
          }
        }, _callee);
      }));
    }
    /**
      * Updates data into the mediator servers table.
      */
  }, {
    key: "updateMediatorServer",
    value: function updateMediatorServer(server) {
      return __awaiter(this, void 0, void 0, /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
        var path, data, result;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              path = "/restconf/operations/data-provider:update-mediator-server";
              data = {
                "id": server.id,
                "url": server.url,
                "name": server.name
              };
              _context2.next = 4;
              return Object(_framework_src_services_restService__WEBPACK_IMPORTED_MODULE_2__["requestRest"])(path, {
                method: "POST",
                body: JSON.stringify({
                  input: data
                })
              });
            case 4:
              result = _context2.sent;
              return _context2.abrupt("return", result || null);
            case 6:
            case "end":
              return _context2.stop();
          }
        }, _callee2);
      }));
    }
    /**
      * Deletes data from the mediator servers table.
      */
  }, {
    key: "deleteMediatorServer",
    value: function deleteMediatorServer(server) {
      return __awaiter(this, void 0, void 0, /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
        var path, data, result;
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              path = "/restconf/operations/data-provider:delete-mediator-server";
              data = {
                "id": server.id
              };
              _context3.next = 4;
              return Object(_framework_src_services_restService__WEBPACK_IMPORTED_MODULE_2__["requestRest"])(path, {
                method: "POST",
                body: JSON.stringify({
                  input: data
                })
              });
            case 4:
              result = _context3.sent;
              return _context3.abrupt("return", result || null);
            case 6:
            case "end":
              return _context3.stop();
          }
        }, _callee3);
      }));
    }
  }, {
    key: "getMediatorServerById",
    value: function getMediatorServerById(serverId) {
      return __awaiter(this, void 0, void 0, /*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
        var path, data, result, firstResult;
        return _regeneratorRuntime().wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              path = "/restconf/operations/data-provider:read-mediator-server-list";
              data = {
                "filter": [{
                  "property": "id",
                  "filtervalue": serverId
                }]
              };
              _context4.next = 4;
              return Object(_framework_src_services_restService__WEBPACK_IMPORTED_MODULE_2__["requestRest"])(path, {
                method: "POST",
                body: JSON.stringify({
                  input: data
                })
              });
            case 4:
              result = _context4.sent;
              if (!(result && result["data-provider:output"].data[0])) {
                _context4.next = 10;
                break;
              }
              firstResult = result["data-provider:output"].data[0];
              return _context4.abrupt("return", {
                id: firstResult.id,
                name: firstResult.name,
                url: firstResult.url
              });
            case 10:
              return _context4.abrupt("return", null);
            case 11:
            case "end":
              return _context4.stop();
          }
        }, _callee4);
      }));
    }
    // https://cloud-highstreet-technologies.com/wiki/doku.php?id=att:ms:api
  }, {
    key: "accassMediatorServer",
    value: function accassMediatorServer(mediatorServerId, task, data) {
      return __awaiter(this, void 0, void 0, /*#__PURE__*/_regeneratorRuntime().mark(function _callee5() {
        var path, result;
        return _regeneratorRuntime().wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              path = "ms/".concat(mediatorServerId, "/api/'?task=").concat(task);
              _context5.next = 3;
              return Object(_framework_src_services_restService__WEBPACK_IMPORTED_MODULE_2__["requestRest"])(path, {
                method: data ? "POST" : "GET",
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: data ? Object(_framework_src_services_restService__WEBPACK_IMPORTED_MODULE_2__["formEncode"])(Object.assign(Object.assign({}, data), {
                  task: task
                })) : null
              }, true);
            case 3:
              _context5.t0 = _context5.sent;
              if (_context5.t0) {
                _context5.next = 6;
                break;
              }
              _context5.t0 = null;
            case 6:
              result = _context5.t0;
              return _context5.abrupt("return", result ? JSON.parse(result) : null);
            case 8:
            case "end":
              return _context5.stop();
          }
        }, _callee5);
      }));
    }
    /*
    private accassMediatorServer<TData = {}>(mediatorServerId: string, task: string, data?: {}): Promise<MediatorServerResponse<TData> | null> {
      const path = `ms/${mediatorServerId}/api/?task=${task}`;
      return new Promise<{ code: number, data: TData }>((resolve, reject) => {
        $.ajax({
          method: data ? 'POST' : 'GET',
          url: path,
          data: { ...{ task: task }, ...data },
          //contentType: 'application/json'
        }).then((result: any) => {
          if (typeof result === "string") {
            resolve(JSON.parse(result));
          } else {
            resolve(result);
          };
        });
      });
    }*/
  }, {
    key: "getMediatorServerVersion",
    value: function getMediatorServerVersion(mediatorServerId) {
      return __awaiter(this, void 0, void 0, /*#__PURE__*/_regeneratorRuntime().mark(function _callee6() {
        var result;
        return _regeneratorRuntime().wrap(function _callee6$(_context6) {
          while (1) switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return this.accassMediatorServer(mediatorServerId, 'version');
            case 2:
              result = _context6.sent;
              if (!(result && result.code === 1)) {
                _context6.next = 5;
                break;
              }
              return _context6.abrupt("return", result.data);
            case 5:
              return _context6.abrupt("return", null);
            case 6:
            case "end":
              return _context6.stop();
          }
        }, _callee6, this);
      }));
    }
  }, {
    key: "getMediatorServerAllConfigs",
    value: function getMediatorServerAllConfigs(mediatorServerId) {
      return __awaiter(this, void 0, void 0, /*#__PURE__*/_regeneratorRuntime().mark(function _callee7() {
        var result;
        return _regeneratorRuntime().wrap(function _callee7$(_context7) {
          while (1) switch (_context7.prev = _context7.next) {
            case 0:
              _context7.next = 2;
              return this.accassMediatorServer(mediatorServerId, 'getconfig');
            case 2:
              result = _context7.sent;
              if (!(result && result.code === 1)) {
                _context7.next = 5;
                break;
              }
              return _context7.abrupt("return", result.data);
            case 5:
              return _context7.abrupt("return", null);
            case 6:
            case "end":
              return _context7.stop();
          }
        }, _callee7, this);
      }));
    }
  }, {
    key: "getMediatorServerConfigByName",
    value: function getMediatorServerConfigByName(mediatorServerId, name) {
      return __awaiter(this, void 0, void 0, /*#__PURE__*/_regeneratorRuntime().mark(function _callee8() {
        var result;
        return _regeneratorRuntime().wrap(function _callee8$(_context8) {
          while (1) switch (_context8.prev = _context8.next) {
            case 0:
              _context8.next = 2;
              return this.accassMediatorServer(mediatorServerId, "getconfig&name=".concat(name));
            case 2:
              result = _context8.sent;
              if (!(result && result.code === 1 && result.data && result.data.length === 1)) {
                _context8.next = 5;
                break;
              }
              return _context8.abrupt("return", result.data[0]);
            case 5:
              return _context8.abrupt("return", null);
            case 6:
            case "end":
              return _context8.stop();
          }
        }, _callee8, this);
      }));
    }
  }, {
    key: "getMediatorServerSupportedDevices",
    value: function getMediatorServerSupportedDevices(mediatorServerId) {
      return __awaiter(this, void 0, void 0, /*#__PURE__*/_regeneratorRuntime().mark(function _callee9() {
        var result;
        return _regeneratorRuntime().wrap(function _callee9$(_context9) {
          while (1) switch (_context9.prev = _context9.next) {
            case 0:
              _context9.next = 2;
              return this.accassMediatorServer(mediatorServerId, 'getdevices');
            case 2:
              result = _context9.sent;
              if (!(result && result.code === 1)) {
                _context9.next = 5;
                break;
              }
              return _context9.abrupt("return", result.data);
            case 5:
              return _context9.abrupt("return", null);
            case 6:
            case "end":
              return _context9.stop();
          }
        }, _callee9, this);
      }));
    }
  }, {
    key: "startMediatorByName",
    value: function startMediatorByName(mediatorServerId, name) {
      return __awaiter(this, void 0, void 0, /*#__PURE__*/_regeneratorRuntime().mark(function _callee10() {
        var result;
        return _regeneratorRuntime().wrap(function _callee10$(_context10) {
          while (1) switch (_context10.prev = _context10.next) {
            case 0:
              _context10.next = 2;
              return this.accassMediatorServer(mediatorServerId, "start&name=".concat(name));
            case 2:
              result = _context10.sent;
              if (!(result && result.code === 1)) {
                _context10.next = 5;
                break;
              }
              return _context10.abrupt("return", result.data);
            case 5:
              return _context10.abrupt("return", null);
            case 6:
            case "end":
              return _context10.stop();
          }
        }, _callee10, this);
      }));
    }
  }, {
    key: "stopMediatorByName",
    value: function stopMediatorByName(mediatorServerId, name) {
      return __awaiter(this, void 0, void 0, /*#__PURE__*/_regeneratorRuntime().mark(function _callee11() {
        var result;
        return _regeneratorRuntime().wrap(function _callee11$(_context11) {
          while (1) switch (_context11.prev = _context11.next) {
            case 0:
              _context11.next = 2;
              return this.accassMediatorServer(mediatorServerId, "stop&name=".concat(name));
            case 2:
              result = _context11.sent;
              if (!(result && result.code === 1)) {
                _context11.next = 5;
                break;
              }
              return _context11.abrupt("return", result.data);
            case 5:
              return _context11.abrupt("return", null);
            case 6:
            case "end":
              return _context11.stop();
          }
        }, _callee11, this);
      }));
    }
  }, {
    key: "createMediatorConfig",
    value: function createMediatorConfig(mediatorServerId, config) {
      return __awaiter(this, void 0, void 0, /*#__PURE__*/_regeneratorRuntime().mark(function _callee12() {
        var result;
        return _regeneratorRuntime().wrap(function _callee12$(_context12) {
          while (1) switch (_context12.prev = _context12.next) {
            case 0:
              _context12.next = 2;
              return this.accassMediatorServer(mediatorServerId, 'create', {
                config: JSON.stringify(config)
              });
            case 2:
              result = _context12.sent;
              if (!(result && result.code === 1)) {
                _context12.next = 5;
                break;
              }
              return _context12.abrupt("return", result.data);
            case 5:
              return _context12.abrupt("return", null);
            case 6:
            case "end":
              return _context12.stop();
          }
        }, _callee12, this);
      }));
    }
  }, {
    key: "updateMediatorConfigByName",
    value: function updateMediatorConfigByName(mediatorServerId, config) {
      return __awaiter(this, void 0, void 0, /*#__PURE__*/_regeneratorRuntime().mark(function _callee13() {
        var result;
        return _regeneratorRuntime().wrap(function _callee13$(_context13) {
          while (1) switch (_context13.prev = _context13.next) {
            case 0:
              _context13.next = 2;
              return this.accassMediatorServer(mediatorServerId, 'update', {
                config: JSON.stringify(config)
              });
            case 2:
              result = _context13.sent;
              if (!(result && result.code === 1)) {
                _context13.next = 5;
                break;
              }
              return _context13.abrupt("return", result.data);
            case 5:
              return _context13.abrupt("return", null);
            case 6:
            case "end":
              return _context13.stop();
          }
        }, _callee13, this);
      }));
    }
  }, {
    key: "deleteMediatorConfigByName",
    value: function deleteMediatorConfigByName(mediatorServerId, name) {
      return __awaiter(this, void 0, void 0, /*#__PURE__*/_regeneratorRuntime().mark(function _callee14() {
        var result;
        return _regeneratorRuntime().wrap(function _callee14$(_context14) {
          while (1) switch (_context14.prev = _context14.next) {
            case 0:
              _context14.next = 2;
              return this.accassMediatorServer(mediatorServerId, "delete&name=".concat(name));
            case 2:
              result = _context14.sent;
              if (!(result && result.code === 1)) {
                _context14.next = 5;
                break;
              }
              return _context14.abrupt("return", result.data);
            case 5:
              return _context14.abrupt("return", null);
            case 6:
            case "end":
              return _context14.stop();
          }
        }, _callee14, this);
      }));
    }
  }, {
    key: "getMediatorServerFreeNcPorts",
    value: function getMediatorServerFreeNcPorts(mediatorServerId, limit) {
      return __awaiter(this, void 0, void 0, /*#__PURE__*/_regeneratorRuntime().mark(function _callee15() {
        var result;
        return _regeneratorRuntime().wrap(function _callee15$(_context15) {
          while (1) switch (_context15.prev = _context15.next) {
            case 0:
              _context15.next = 2;
              return this.accassMediatorServer(mediatorServerId, 'getncports', {
                limit: limit
              });
            case 2:
              result = _context15.sent;
              if (!(result && result.code === 1)) {
                _context15.next = 5;
                break;
              }
              return _context15.abrupt("return", result.data);
            case 5:
              return _context15.abrupt("return", null);
            case 6:
            case "end":
              return _context15.stop();
          }
        }, _callee15, this);
      }));
    }
  }, {
    key: "getMediatorServerFreeSnmpPorts",
    value: function getMediatorServerFreeSnmpPorts(mediatorServerId, limit) {
      return __awaiter(this, void 0, void 0, /*#__PURE__*/_regeneratorRuntime().mark(function _callee16() {
        var result;
        return _regeneratorRuntime().wrap(function _callee16$(_context16) {
          while (1) switch (_context16.prev = _context16.next) {
            case 0:
              _context16.next = 2;
              return this.accassMediatorServer(mediatorServerId, 'getsnmpports', {
                limit: limit
              });
            case 2:
              result = _context16.sent;
              if (!(result && result.code === 1)) {
                _context16.next = 5;
                break;
              }
              return _context16.abrupt("return", result.data);
            case 5:
              return _context16.abrupt("return", null);
            case 6:
            case "end":
              return _context16.stop();
          }
        }, _callee16, this);
      }));
    }
  }]);
}();
var mediatorService = new MediatorService();
/* harmony default export */ __webpack_exports__["default"] = (mediatorService);

/***/ }),

/***/ "./views/mediatorApplication.tsx":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MediatorApplication", function() { return MediatorApplication; });
/* harmony import */ var core_js_modules_web_dom_iterable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../../node_modules/core-js/modules/web.dom.iterable.js");
/* harmony import */ var core_js_modules_web_dom_iterable__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_iterable__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../../../node_modules/@mui/material/index.js");
/* harmony import */ var _mui_styles_createStyles__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("../../../node_modules/@mui/styles/createStyles/index.js");
/* harmony import */ var _mui_styles_withStyles__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("../../../node_modules/@mui/styles/withStyles/index.js");
/* harmony import */ var _mui_icons_material_Add__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("../../../node_modules/@mui/icons-material/Add.js");
/* harmony import */ var _mui_icons_material_Add__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_mui_icons_material_Add__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _mui_material_IconButton__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("../../../node_modules/@mui/material/IconButton/index.js");
/* harmony import */ var _mui_icons_material_Edit__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("../../../node_modules/@mui/icons-material/Edit.js");
/* harmony import */ var _mui_icons_material_Edit__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_mui_icons_material_Edit__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _mui_icons_material_Delete__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("../../../node_modules/@mui/icons-material/Delete.js");
/* harmony import */ var _mui_icons_material_Delete__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_mui_icons_material_Delete__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _mui_icons_material_Info__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("../../../node_modules/@mui/icons-material/Info.js");
/* harmony import */ var _mui_icons_material_Info__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_mui_icons_material_Info__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _mui_icons_material_PlayArrow__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("../../../node_modules/@mui/icons-material/PlayArrow.js");
/* harmony import */ var _mui_icons_material_PlayArrow__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_mui_icons_material_PlayArrow__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _mui_icons_material_Stop__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("../../../node_modules/@mui/icons-material/Stop.js");
/* harmony import */ var _mui_icons_material_Stop__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_mui_icons_material_Stop__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _mui_material_CircularProgress__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("../../../node_modules/@mui/material/CircularProgress/index.js");
/* harmony import */ var _framework_src_flux_connect__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__("../../../framework/src/flux/connect.tsx");
/* harmony import */ var _framework_src_components_material_table__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__("../../../framework/src/components/material-table/index.tsx");
/* harmony import */ var _models_mediatorServer__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__("./models/mediatorServer.ts");
/* harmony import */ var _components_editMediatorConfigDialog__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__("./components/editMediatorConfigDialog.tsx");
/* harmony import */ var _actions_mediatorConfigActions__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__("./actions/mediatorConfigActions.ts");
/* harmony import */ var _services_mediatorService__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__("./services/mediatorService.ts");
/* harmony import */ var _components_showMeditaorInfoDialog__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__("./components/showMeditaorInfoDialog.tsx");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }

var _this = undefined;
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
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



















var styles = function styles(theme) {
  _newArrowCheck(this, _this);
  return Object(_mui_styles_createStyles__WEBPACK_IMPORTED_MODULE_3__["default"])({
    root: {
      display: 'flex',
      flexDirection: 'column',
      flex: '1'
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 300
    },
    button: {
      margin: 0,
      padding: "6px 6px",
      minWidth: 'unset'
    },
    spacer: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      display: "inline"
    },
    progress: {
      flex: '1 1 100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      pointerEvents: 'none'
    }
  });
}.bind(undefined);
var mapProps = function mapProps(state) {
  _newArrowCheck(this, _this);
  return {
    serverName: state.mediator.mediatorServerState.name,
    serverUrl: state.mediator.mediatorServerState.url,
    serverId: state.mediator.mediatorServerState.id,
    serverVersion: state.mediator.mediatorServerState.serverVersion,
    mediatorVersion: state.mediator.mediatorServerState.mediatorVersion,
    configurations: state.mediator.mediatorServerState.configurations,
    supportedDevices: state.mediator.mediatorServerState.supportedDevices,
    busy: state.mediator.mediatorServerState.busy,
    isReachable: state.mediator.mediatorServerState.isReachable
  };
}.bind(undefined);
var mapDispatch = function mapDispatch(dispatcher) {
  var _this2 = this;
  _newArrowCheck(this, _this);
  return {
    startMediator: function startMediator(name) {
      _newArrowCheck(this, _this2);
      return dispatcher.dispatch(Object(_actions_mediatorConfigActions__WEBPACK_IMPORTED_MODULE_17__["startMediatorByNameAsyncActionCreator"])(name));
    }.bind(this),
    stopMediator: function stopMediator(name) {
      _newArrowCheck(this, _this2);
      return dispatcher.dispatch(Object(_actions_mediatorConfigActions__WEBPACK_IMPORTED_MODULE_17__["stopMediatorByNameAsyncActionCreator"])(name));
    }.bind(this)
  };
}.bind(undefined);
var emptyMediatorConfig = {
  Name: "",
  DeviceIp: "127.0.0.1",
  DevicePort: 161,
  NcUsername: "admin",
  NcPassword: "admin",
  DeviceType: -1,
  NcPort: 4020,
  TrapPort: 10020,
  NeXMLFile: "",
  ODLConfig: []
};
var MediatorServerConfigurationsTable = _framework_src_components_material_table__WEBPACK_IMPORTED_MODULE_14__["default"];
var MediatorServerUnreachableTable = _framework_src_components_material_table__WEBPACK_IMPORTED_MODULE_14__["default"];
var MediatorApplicationComponent = /*#__PURE__*/function (_React$Component) {
  function MediatorApplicationComponent(props) {
    var _this4 = this;
    var _this3;
    _classCallCheck(this, MediatorApplicationComponent);
    _this3 = _callSuper(this, MediatorApplicationComponent, [props]);
    _this3.onOpenInfoDialog = function (event, configEntry) {
      _newArrowCheck(this, _this4);
      event.stopPropagation();
      event.preventDefault();
      _this3.setState({
        mediatorShowInfoMode: _components_showMeditaorInfoDialog__WEBPACK_IMPORTED_MODULE_19__["MediatorInfoDialogMode"].ShowDetails,
        mediatorConfigToDisplay: configEntry
      });
    }.bind(this);
    _this3.onCloseInfoDialog = function () {
      _newArrowCheck(this, _this4);
      _this3.setState({
        mediatorShowInfoMode: _components_showMeditaorInfoDialog__WEBPACK_IMPORTED_MODULE_19__["MediatorInfoDialogMode"].None,
        mediatorConfigToDisplay: null
      });
    }.bind(this);
    _this3.onOpenAddConfigurationDialog = function () {
      var _this5 = this;
      _newArrowCheck(this, _this4);
      // Tries to determine a free port for netconf listener and snpm listener
      // it it could not determine free ports the dialog will open any way
      // those ports should not be configured from the fontend, furthermore
      // the backend should auto configure them and tell the user the result
      // after the creation process.
      _this3.setState({
        busy: true
      });
      _this3.props.serverId && Promise.all([_services_mediatorService__WEBPACK_IMPORTED_MODULE_18__["default"].getMediatorServerFreeNcPorts(_this3.props.serverId, 1), _services_mediatorService__WEBPACK_IMPORTED_MODULE_18__["default"].getMediatorServerFreeSnmpPorts(_this3.props.serverId, 1)]).then(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
          freeNcPorts = _ref2[0],
          freeSnmpPorts = _ref2[1];
        _newArrowCheck(this, _this5);
        if (freeNcPorts && freeSnmpPorts && freeNcPorts.length > 0 && freeSnmpPorts.length > 0) {
          _this3.setState({
            busy: false,
            mediatorConfigEditorMode: _components_editMediatorConfigDialog__WEBPACK_IMPORTED_MODULE_16__["EditMediatorConfigDialogMode"].AddMediatorConfig,
            mediatorConfigToEdit: Object.assign(Object.assign({}, emptyMediatorConfig), {
              NcPort: freeNcPorts[0],
              TrapPort: freeSnmpPorts[0]
            })
          });
        } else {
          _this3.setState({
            busy: false,
            mediatorConfigEditorMode: _components_editMediatorConfigDialog__WEBPACK_IMPORTED_MODULE_16__["EditMediatorConfigDialogMode"].AddMediatorConfig,
            mediatorConfigToEdit: Object.assign({}, emptyMediatorConfig)
          });
        }
      }.bind(this));
    }.bind(this);
    _this3.onOpenEditConfigurationDialog = function (event, configEntry) {
      _newArrowCheck(this, _this4);
      event.preventDefault();
      event.stopPropagation();
      _this3.setState({
        mediatorConfigEditorMode: _components_editMediatorConfigDialog__WEBPACK_IMPORTED_MODULE_16__["EditMediatorConfigDialogMode"].EditMediatorConfig,
        mediatorConfigToEdit: configEntry
      });
    }.bind(this);
    _this3.onOpenRemoveConfigutationDialog = function (event, configEntry) {
      _newArrowCheck(this, _this4);
      event.preventDefault();
      event.stopPropagation();
      _this3.setState({
        mediatorConfigEditorMode: _components_editMediatorConfigDialog__WEBPACK_IMPORTED_MODULE_16__["EditMediatorConfigDialogMode"].RemoveMediatorConfig,
        mediatorConfigToEdit: configEntry
      });
    }.bind(this);
    _this3.onCloseEditMediatorConfigDialog = function () {
      _newArrowCheck(this, _this4);
      _this3.setState({
        mediatorConfigEditorMode: _components_editMediatorConfigDialog__WEBPACK_IMPORTED_MODULE_16__["EditMediatorConfigDialogMode"].None,
        mediatorConfigToEdit: emptyMediatorConfig
      });
    }.bind(this);
    _this3.state = {
      busy: false,
      mediatorConfigToEdit: emptyMediatorConfig,
      mediatorConfigEditorMode: _components_editMediatorConfigDialog__WEBPACK_IMPORTED_MODULE_16__["EditMediatorConfigDialogMode"].None,
      mediatorShowInfoMode: _components_showMeditaorInfoDialog__WEBPACK_IMPORTED_MODULE_19__["MediatorInfoDialogMode"].None,
      mediatorConfigToDisplay: null
    };
    return _this3;
  }
  _inherits(MediatorApplicationComponent, _React$Component);
  return _createClass(MediatorApplicationComponent, [{
    key: "render",
    value: function render() {
      var _this6 = this;
      var classes = this.props.classes;
      var renderActions = function renderActions(rowData) {
        var _this7 = this;
        _newArrowCheck(this, _this6);
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
          className: classes.spacer
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_2__["Tooltip"], {
          disableInteractive: true,
          title: "Start"
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_mui_material_IconButton__WEBPACK_IMPORTED_MODULE_6__["default"], {
          disabled: rowData[_models_mediatorServer__WEBPACK_IMPORTED_MODULE_15__["BusySymbol"]],
          className: classes.button,
          size: "large"
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_mui_icons_material_PlayArrow__WEBPACK_IMPORTED_MODULE_10___default.a, {
          onClick: function (event) {
            _newArrowCheck(this, _this7);
            event.preventDefault();
            event.stopPropagation();
            this.props.startMediator(rowData.Name);
          }.bind(this)
        }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_2__["Tooltip"], {
          disableInteractive: true,
          title: "Stop"
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_mui_material_IconButton__WEBPACK_IMPORTED_MODULE_6__["default"], {
          disabled: rowData[_models_mediatorServer__WEBPACK_IMPORTED_MODULE_15__["BusySymbol"]],
          className: classes.button,
          size: "large"
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_mui_icons_material_Stop__WEBPACK_IMPORTED_MODULE_11___default.a, {
          onClick: function (event) {
            _newArrowCheck(this, _this7);
            event.preventDefault();
            event.stopPropagation();
            this.props.stopMediator(rowData.Name);
          }.bind(this)
        })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
          className: classes.spacer
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_2__["Tooltip"], {
          disableInteractive: true,
          title: "Info"
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_mui_material_IconButton__WEBPACK_IMPORTED_MODULE_6__["default"], {
          className: classes.button,
          onClick: function (event) {
            _newArrowCheck(this, _this7);
            this.onOpenInfoDialog(event, rowData);
          }.bind(this),
          size: "large"
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_mui_icons_material_Info__WEBPACK_IMPORTED_MODULE_9___default.a, null)))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
          className: classes.spacer
        },  true ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_2__["Tooltip"], {
          disableInteractive: true,
          title: "Edit"
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_mui_material_IconButton__WEBPACK_IMPORTED_MODULE_6__["default"], {
          disabled: rowData[_models_mediatorServer__WEBPACK_IMPORTED_MODULE_15__["BusySymbol"]],
          className: classes.button,
          onClick: function (event) {
            _newArrowCheck(this, _this7);
            return this.onOpenEditConfigurationDialog(event, rowData);
          }.bind(this),
          size: "large"
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_mui_icons_material_Edit__WEBPACK_IMPORTED_MODULE_7___default.a, null))) : undefined, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_2__["Tooltip"], {
          disableInteractive: true,
          title: "Remove"
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_mui_material_IconButton__WEBPACK_IMPORTED_MODULE_6__["default"], {
          disabled: rowData[_models_mediatorServer__WEBPACK_IMPORTED_MODULE_15__["BusySymbol"]],
          className: classes.button,
          onClick: function (event) {
            _newArrowCheck(this, _this7);
            return this.onOpenRemoveConfigutationDialog(event, rowData);
          }.bind(this),
          size: "large"
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_mui_icons_material_Delete__WEBPACK_IMPORTED_MODULE_8___default.a, null)))));
      }.bind(this);
      var addMediatorConfigAction = {
        icon: _mui_icons_material_Add__WEBPACK_IMPORTED_MODULE_5___default.a,
        tooltip: 'Add',
        ariaLabel: 'add-element',
        onClick: this.onOpenAddConfigurationDialog
      };
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
        className: classes.root
      }, this.props.busy || this.state.busy ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
        className: classes.progress
      }, " ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_mui_material_CircularProgress__WEBPACK_IMPORTED_MODULE_12__["default"], {
        color: "secondary",
        size: 48
      }), " ") : this.props.isReachable ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(MediatorServerConfigurationsTable, {
        tableId: null,
        stickyHeader: true,
        title: this.props.serverName || '',
        customActionButtons: [addMediatorConfigAction],
        idProperty: "Name",
        rows: this.props.configurations,
        asynchronus: true,
        columns: [{
          property: "Name",
          title: "Mediator",
          type: _framework_src_components_material_table__WEBPACK_IMPORTED_MODULE_14__["ColumnType"].text
        }, {
          property: "Status",
          title: "Status",
          type: _framework_src_components_material_table__WEBPACK_IMPORTED_MODULE_14__["ColumnType"].custom,
          customControl: function customControl(_ref3) {
            var rowData = _ref3.rowData;
            _newArrowCheck(this, _this6);
            return rowData.pid ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", null, "Running") : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", null, "Stopped");
          }.bind(this)
        }, {
          property: "DeviceIp",
          title: "IP Adress",
          type: _framework_src_components_material_table__WEBPACK_IMPORTED_MODULE_14__["ColumnType"].text
        }, {
          property: "Device",
          title: "Device",
          type: _framework_src_components_material_table__WEBPACK_IMPORTED_MODULE_14__["ColumnType"].custom,
          customControl: function customControl(_ref4) {
            var _this8 = this;
            var rowData = _ref4.rowData;
            _newArrowCheck(this, _this6);
            var dev = this.props.supportedDevices && this.props.supportedDevices.find(function (dev) {
              _newArrowCheck(this, _this8);
              return dev.id === rowData.DeviceType;
            }.bind(this));
            return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", null, " ", dev && "".concat(dev.vendor, " - ").concat(dev.device, " (").concat(dev.version || '0.0.0', ")"), " ");
          }.bind(this)
        }, {
          property: "actions",
          title: "Actions",
          type: _framework_src_components_material_table__WEBPACK_IMPORTED_MODULE_14__["ColumnType"].custom,
          customControl: function customControl(_ref5) {
            var rowData = _ref5.rowData;
            _newArrowCheck(this, _this6);
            return renderActions(rowData);
          }.bind(this)
        }]
      }) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(MediatorServerUnreachableTable, {
        title: this.props.serverName || '',
        tableId: null,
        idProperty: "Name",
        disableFilter: true,
        disableSorting: true,
        enableSelection: false,
        rows: [{
          Name: '',
          status: "Mediator server not found.",
          ipAdress: '',
          device: '',
          actions: ''
        }],
        columns: [{
          property: "Name",
          title: "Mediator",
          type: _framework_src_components_material_table__WEBPACK_IMPORTED_MODULE_14__["ColumnType"].text
        }, {
          property: "status",
          title: "Status",
          type: _framework_src_components_material_table__WEBPACK_IMPORTED_MODULE_14__["ColumnType"].text
        }, {
          property: "ipAdress",
          title: "IP Adress",
          type: _framework_src_components_material_table__WEBPACK_IMPORTED_MODULE_14__["ColumnType"].text
        }, {
          property: "device",
          title: "Device",
          type: _framework_src_components_material_table__WEBPACK_IMPORTED_MODULE_14__["ColumnType"].text
        }, {
          property: "actions",
          title: "Actions",
          type: _framework_src_components_material_table__WEBPACK_IMPORTED_MODULE_14__["ColumnType"].text
        }]
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_components_editMediatorConfigDialog__WEBPACK_IMPORTED_MODULE_16__["default"], {
        mediatorConfig: this.state.mediatorConfigToEdit,
        mode: this.state.mediatorConfigEditorMode,
        onClose: this.onCloseEditMediatorConfigDialog
      }), this.state.mediatorShowInfoMode != _components_showMeditaorInfoDialog__WEBPACK_IMPORTED_MODULE_19__["MediatorInfoDialogMode"].None && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_components_showMeditaorInfoDialog__WEBPACK_IMPORTED_MODULE_19__["ShowMediatorInfoDialog"], {
        config: this.state.mediatorConfigToDisplay,
        mode: this.state.mediatorShowInfoMode,
        onClose: this.onCloseInfoDialog
      }));
    }
  }]);
}(react__WEBPACK_IMPORTED_MODULE_1___default.a.Component);
var MediatorApplication = Object(_mui_styles_withStyles__WEBPACK_IMPORTED_MODULE_4__["default"])(styles)(Object(_framework_src_flux_connect__WEBPACK_IMPORTED_MODULE_13__["connect"])(mapProps, mapDispatch)(MediatorApplicationComponent));

/***/ }),

/***/ "./views/mediatorServerSelection.tsx":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MediatorServerSelection", function() { return MediatorServerSelection; });
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
/* harmony import */ var _mui_icons_material_Delete__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("../../../node_modules/@mui/icons-material/Delete.js");
/* harmony import */ var _mui_icons_material_Delete__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_mui_icons_material_Delete__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _mui_icons_material_Refresh__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("../../../node_modules/@mui/icons-material/Refresh.js");
/* harmony import */ var _mui_icons_material_Refresh__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_mui_icons_material_Refresh__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _framework_src_flux_connect__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("../../../framework/src/flux/connect.tsx");
/* harmony import */ var _framework_src_components_material_table__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("../../../framework/src/components/material-table/index.tsx");
/* harmony import */ var _handlers_avaliableMediatorServersHandler__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("./handlers/avaliableMediatorServersHandler.ts");
/* harmony import */ var _components_editMediatorServerDialog__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("./components/editMediatorServerDialog.tsx");
/* harmony import */ var _components_refreshMediatorDialog__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__("./components/refreshMediatorDialog.tsx");
/* harmony import */ var _framework_src_actions_navigationActions__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__("../../../framework/src/actions/navigationActions.ts");
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















var MediatorServersTable = _framework_src_components_material_table__WEBPACK_IMPORTED_MODULE_10__["default"];
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
    mediatorServersProperties: Object(_handlers_avaliableMediatorServersHandler__WEBPACK_IMPORTED_MODULE_11__["createAvaliableMediatorServersProperties"])(state)
  };
}.bind(undefined);
var mapDispatch = function mapDispatch(dispatcher) {
  var _this2 = this;
  _newArrowCheck(this, _this);
  return {
    mediatorServersActions: Object(_handlers_avaliableMediatorServersHandler__WEBPACK_IMPORTED_MODULE_11__["createAvaliableMediatorServersActions"])(dispatcher.dispatch),
    selectMediatorServer: function selectMediatorServer(mediatorServerId) {
      _newArrowCheck(this, _this2);
      return mediatorServerId && dispatcher.dispatch(new _framework_src_actions_navigationActions__WEBPACK_IMPORTED_MODULE_14__["NavigateToApplication"]("mediator", mediatorServerId));
    }.bind(this)
  };
}.bind(undefined);
var emptyMediatorServer = {
  id: "",
  name: "",
  url: ""
};
var initialSorted = false;
var MediatorServerSelectionComponent = /*#__PURE__*/function (_React$Component) {
  function MediatorServerSelectionComponent(props) {
    var _this4 = this;
    var _this3;
    _classCallCheck(this, MediatorServerSelectionComponent);
    _this3 = _callSuper(this, MediatorServerSelectionComponent, [props]);
    _this3.onSelectMediatorServer = function (event, server) {
      _newArrowCheck(this, _this4);
      event.preventDefault();
      event.stopPropagation();
      _this3.props.selectMediatorServer(server && server.id);
    }.bind(this);
    _this3.onEditMediatorServer = function (event, server) {
      _newArrowCheck(this, _this4);
      event.preventDefault();
      event.stopPropagation();
      _this3.setState({
        mediatorServerEditorMode: _components_editMediatorServerDialog__WEBPACK_IMPORTED_MODULE_12__["EditMediatorServerDialogMode"].EditMediatorServer,
        mediatorServerToEdit: server
      });
    }.bind(this);
    _this3.onRemoveMediatorServer = function (event, server) {
      _newArrowCheck(this, _this4);
      event.preventDefault();
      event.stopPropagation();
      _this3.setState({
        mediatorServerEditorMode: _components_editMediatorServerDialog__WEBPACK_IMPORTED_MODULE_12__["EditMediatorServerDialogMode"].RemoveMediatorServer,
        mediatorServerToEdit: server
      });
    }.bind(this);
    _this3.onCloseEditMediatorServerDialog = function () {
      _newArrowCheck(this, _this4);
      _this3.setState({
        mediatorServerEditorMode: _components_editMediatorServerDialog__WEBPACK_IMPORTED_MODULE_12__["EditMediatorServerDialogMode"].None,
        mediatorServerToEdit: emptyMediatorServer
      });
    }.bind(this);
    _this3.onCloseRefreshMediatorDialog = function () {
      _newArrowCheck(this, _this4);
      _this3.setState({
        refreshMediatorEditorMode: _components_refreshMediatorDialog__WEBPACK_IMPORTED_MODULE_13__["RefreshMediatorDialogMode"].None
      });
    }.bind(this);
    _this3.state = {
      mediatorServerEditorMode: _components_editMediatorServerDialog__WEBPACK_IMPORTED_MODULE_12__["EditMediatorServerDialogMode"].None,
      mediatorServerToEdit: emptyMediatorServer,
      refreshMediatorEditorMode: _components_refreshMediatorDialog__WEBPACK_IMPORTED_MODULE_13__["RefreshMediatorDialogMode"].None
    };
    return _this3;
  }
  _inherits(MediatorServerSelectionComponent, _React$Component);
  return _createClass(MediatorServerSelectionComponent, [{
    key: "render",
    value: function render() {
      var _this5 = this;
      var classes = this.props.classes;
      var refreshMediatorAction = {
        icon: _mui_icons_material_Refresh__WEBPACK_IMPORTED_MODULE_8___default.a,
        tooltip: 'Refresh Mediator Server Table',
        ariaLabel: 'refresh',
        onClick: function onClick() {
          _newArrowCheck(this, _this5);
          this.setState({
            refreshMediatorEditorMode: _components_refreshMediatorDialog__WEBPACK_IMPORTED_MODULE_13__["RefreshMediatorDialogMode"].RefreshMediatorTable
          });
        }.bind(this)
      };
      var addMediatorServerActionButton = {
        icon: _mui_icons_material_Add__WEBPACK_IMPORTED_MODULE_4___default.a,
        tooltip: 'Add',
        ariaLabel: 'add-element',
        onClick: function onClick() {
          _newArrowCheck(this, _this5);
          this.setState({
            mediatorServerEditorMode: _components_editMediatorServerDialog__WEBPACK_IMPORTED_MODULE_12__["EditMediatorServerDialogMode"].AddMediatorServer,
            mediatorServerToEdit: emptyMediatorServer
          });
        }.bind(this)
      };
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(MediatorServersTable, _extends({
        stickyHeader: true,
        title: "Mediator",
        tableId: null,
        customActionButtons: [refreshMediatorAction, addMediatorServerActionButton],
        idProperty: "id"
      }, this.props.mediatorServersActions, this.props.mediatorServersProperties, {
        columns: [{
          property: "name",
          title: "Name",
          type: _framework_src_components_material_table__WEBPACK_IMPORTED_MODULE_10__["ColumnType"].text
        }, {
          property: "url",
          title: "Url",
          type: _framework_src_components_material_table__WEBPACK_IMPORTED_MODULE_10__["ColumnType"].text
        }, {
          property: "actions",
          title: "Actions",
          type: _framework_src_components_material_table__WEBPACK_IMPORTED_MODULE_10__["ColumnType"].custom,
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
                this.onEditMediatorServer(event, rowData);
              }.bind(this),
              size: "large"
            }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_mui_icons_material_Edit__WEBPACK_IMPORTED_MODULE_6___default.a, null))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_1__["Tooltip"], {
              disableInteractive: true,
              title: "Remove"
            }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_mui_material_IconButton__WEBPACK_IMPORTED_MODULE_5__["default"], {
              className: classes.button,
              onClick: function (event) {
                _newArrowCheck(this, _this6);
                this.onRemoveMediatorServer(event, rowData);
              }.bind(this),
              size: "large"
            }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_mui_icons_material_Delete__WEBPACK_IMPORTED_MODULE_7___default.a, null))));
          }.bind(this)
        }],
        onHandleClick: this.onSelectMediatorServer
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_editMediatorServerDialog__WEBPACK_IMPORTED_MODULE_12__["default"], {
        mediatorServer: this.state.mediatorServerToEdit,
        mode: this.state.mediatorServerEditorMode,
        onClose: this.onCloseEditMediatorServerDialog
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_refreshMediatorDialog__WEBPACK_IMPORTED_MODULE_13__["default"], {
        mode: this.state.refreshMediatorEditorMode,
        onClose: this.onCloseRefreshMediatorDialog
      }));
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      if (!initialSorted) {
        initialSorted = true;
        this.props.mediatorServersActions.onHandleRequestSort("name");
      } else {
        this.props.mediatorServersActions.onRefresh();
      }
    }
  }]);
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);
var MediatorServerSelection = Object(_mui_styles_withStyles__WEBPACK_IMPORTED_MODULE_2__["default"])(styles)(Object(_framework_src_flux_connect__WEBPACK_IMPORTED_MODULE_9__["connect"])(mapProps, mapDispatch)(MediatorServerSelectionComponent));
/* harmony default export */ __webpack_exports__["default"] = (MediatorServerSelection);

/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("./plugin.tsx");


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
//# sourceMappingURL=mediatorApp.js.map