(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("app"));
	else if(typeof define === 'function' && define.amd)
		define(["app"], factory);
	else if(typeof exports === 'object')
		exports["eventLogApp"] = factory(require("app"));
	else
		root["eventLogApp"] = factory(root["app"]);
})(window, function(__WEBPACK_EXTERNAL_MODULE_dll_reference_app__) {
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

/***/ "../../../framework/src/components/material-table/index.tsx":
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__("dll-reference app"))("./components/material-table/index.tsx");

/***/ }),

/***/ "../../../framework/src/components/material-table/utilities.ts":
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__("dll-reference app"))("./components/material-table/utilities.ts");

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

/***/ "../../../framework/src/utilities/elasticSearch.ts":
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__("dll-reference app"))("./utilities/elasticSearch.ts");

/***/ }),

/***/ "../../../node_modules/@babel/runtime/helpers/interopRequireDefault.js":
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__("dll-reference app"))("../../node_modules/@babel/runtime/helpers/interopRequireDefault.js");

/***/ }),

/***/ "../../../node_modules/@mui/icons-material/InfoOutlined.js":
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
  d: "M11 7h2v2h-2zm0 4h2v6h-2zm1-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"
}), 'InfoOutlined');
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

/***/ "../../../node_modules/react/index.js":
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__("dll-reference app"))("../../node_modules/react/index.js");

/***/ }),

/***/ "../../../node_modules/react/jsx-runtime.js":
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__("dll-reference app"))("../../node_modules/react/jsx-runtime.js");

/***/ }),

/***/ "./assets/icons/eventLogAppIcon.svg":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "./images/eventLogAppIcon.svg";

/***/ }),

/***/ "./components/refreshEventLogDialog.tsx":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RefreshEventLogDialogMode", function() { return RefreshEventLogDialogMode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RefreshEventLogDialog", function() { return RefreshEventLogDialog; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _mui_material_Button__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../../node_modules/@mui/material/Button/index.js");
/* harmony import */ var _mui_material_Dialog__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../../../node_modules/@mui/material/Dialog/index.js");
/* harmony import */ var _mui_material_DialogActions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("../../../node_modules/@mui/material/DialogActions/index.js");
/* harmony import */ var _mui_material_DialogContent__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("../../../node_modules/@mui/material/DialogContent/index.js");
/* harmony import */ var _mui_material_DialogContentText__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("../../../node_modules/@mui/material/DialogContentText/index.js");
/* harmony import */ var _mui_material_DialogTitle__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("../../../node_modules/@mui/material/DialogTitle/index.js");
/* harmony import */ var _handlers_eventLogHandler__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./handlers/eventLogHandler.tsx");
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









var RefreshEventLogDialogMode;
(function (RefreshEventLogDialogMode) {
  RefreshEventLogDialogMode["None"] = "none";
  RefreshEventLogDialogMode["RefreshEventLogTable"] = "RefreshEventLogTable";
})(RefreshEventLogDialogMode || (RefreshEventLogDialogMode = {}));
var mapDispatch = function mapDispatch(dispatcher) {
  var _this2 = this;
  _newArrowCheck(this, _this);
  return {
    refreshEventLog: function refreshEventLog() {
      _newArrowCheck(this, _this2);
      return dispatcher.dispatch(_handlers_eventLogHandler__WEBPACK_IMPORTED_MODULE_7__["eventLogReloadAction"]);
    }.bind(this)
  };
}.bind(undefined);
var settings = _defineProperty(_defineProperty({}, RefreshEventLogDialogMode.None, {
  dialogTitle: "",
  dialogDescription: "",
  applyButtonText: "",
  cancelButtonText: "",
  enableMountIdEditor: false,
  enableUsernameEditor: false,
  enableExtendedEditor: false
}), RefreshEventLogDialogMode.RefreshEventLogTable, {
  dialogTitle: "Do you want to refresh the Event Log?",
  dialogDescription: "",
  applyButtonText: "Yes",
  cancelButtonText: "Cancel",
  enableMountIdEditor: true,
  enableUsernameEditor: true,
  enableExtendedEditor: true
});
var RefreshEventLogDialogComponent = /*#__PURE__*/function (_React$Component) {
  function RefreshEventLogDialogComponent(props) {
    var _this4 = this;
    var _this3;
    _classCallCheck(this, RefreshEventLogDialogComponent);
    _this3 = _callSuper(this, RefreshEventLogDialogComponent, [props]);
    _this3.onRefresh = function () {
      _newArrowCheck(this, _this4);
      _this3.props.refreshEventLog();
      _this3.props.onClose();
    }.bind(this);
    _this3.onCancel = function () {
      _newArrowCheck(this, _this4);
      _this3.props.onClose();
    }.bind(this);
    return _this3;
  }
  _inherits(RefreshEventLogDialogComponent, _React$Component);
  return _createClass(RefreshEventLogDialogComponent, [{
    key: "render",
    value: function render() {
      var _this5 = this;
      var setting = settings[this.props.mode];
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_mui_material_Dialog__WEBPACK_IMPORTED_MODULE_2__["default"], {
        open: this.props.mode !== RefreshEventLogDialogMode.None
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
var RefreshEventLogDialog = Object(_framework_src_flux_connect__WEBPACK_IMPORTED_MODULE_8__["connect"])(undefined, mapDispatch)(RefreshEventLogDialogComponent);
/* harmony default export */ __webpack_exports__["default"] = (RefreshEventLogDialog);

/***/ }),

/***/ "./handlers/eventLogAppRootHandler.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EventLogAppRootHandler", function() { return EventLogAppRootHandler; });
/* harmony import */ var _framework_src_flux_middleware__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../../framework/src/flux/middleware.ts");
/* harmony import */ var _eventLogHandler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./handlers/eventLogHandler.tsx");
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
  logEntries: _eventLogHandler__WEBPACK_IMPORTED_MODULE_1__["eventLogActionHandler"]
};
var EventLogAppRootHandler = Object(_framework_src_flux_middleware__WEBPACK_IMPORTED_MODULE_0__["combineActionHandler"])(actionHandlers);
/* harmony default export */ __webpack_exports__["default"] = (EventLogAppRootHandler);

/***/ }),

/***/ "./handlers/eventLogHandler.tsx":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "eventLogActionHandler", function() { return eventLogActionHandler; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createEventLogActions", function() { return createEventLogActions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createEventLogProperties", function() { return createEventLogProperties; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "eventLogReloadAction", function() { return eventLogReloadAction; });
/* harmony import */ var _framework_src_components_material_table_utilities__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../../framework/src/components/material-table/utilities.ts");
/* harmony import */ var _framework_src_utilities_elasticSearch__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../../framework/src/utilities/elasticSearch.ts");
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
var eventLogSearchHandler = Object(_framework_src_utilities_elasticSearch__WEBPACK_IMPORTED_MODULE_1__["createSearchDataHandler"])("eventlog");
var _createExternal = Object(_framework_src_components_material_table_utilities__WEBPACK_IMPORTED_MODULE_0__["createExternal"])(eventLogSearchHandler, function (appState) {
    _newArrowCheck(this, _this);
    return appState.eventLog.logEntries;
  }.bind(undefined)),
  eventLogActionHandler = _createExternal.actionHandler,
  createEventLogActions = _createExternal.createActions,
  createEventLogProperties = _createExternal.createProperties,
  eventLogReloadAction = _createExternal.reloadAction;


/***/ }),

/***/ "./pluginEventLog.tsx":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "register", function() { return register; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _framework_src_services_applicationManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../../framework/src/services/applicationManager.ts");
/* harmony import */ var _views_eventLog__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./views/eventLog.tsx");
/* harmony import */ var _handlers_eventLogAppRootHandler__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./handlers/eventLogAppRootHandler.ts");
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




var appIcon = __webpack_require__("./assets/icons/eventLogAppIcon.svg"); // select app icon
var App = function App() {
  _newArrowCheck(this, _this);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_views_eventLog__WEBPACK_IMPORTED_MODULE_2__["EventLog"], null);
}.bind(undefined);
function register() {
  _framework_src_services_applicationManager__WEBPACK_IMPORTED_MODULE_1__["default"].registerApplication({
    name: 'eventLog',
    icon: appIcon,
    rootActionHandler: _handlers_eventLogAppRootHandler__WEBPACK_IMPORTED_MODULE_3__["default"],
    rootComponent: App,
    menuEntry: 'EventLog'
  });
}

/***/ }),

/***/ "./views/eventLog.tsx":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EventLog", function() { return EventLog; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _framework_src_flux_connect__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../../framework/src/flux/connect.tsx");
/* harmony import */ var _framework_src_components_material_table__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../../../framework/src/components/material-table/index.tsx");
/* harmony import */ var _mui_icons_material_Refresh__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("../../../node_modules/@mui/icons-material/Refresh.js");
/* harmony import */ var _mui_icons_material_Refresh__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_mui_icons_material_Refresh__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _handlers_eventLogHandler__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./handlers/eventLogHandler.tsx");
/* harmony import */ var _components_refreshEventLogDialog__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./components/refreshEventLogDialog.tsx");
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("../../../node_modules/@mui/material/index.js");
/* harmony import */ var _mui_icons_material_InfoOutlined__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("../../../node_modules/@mui/icons-material/InfoOutlined.js");
/* harmony import */ var _mui_icons_material_InfoOutlined__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_mui_icons_material_InfoOutlined__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _mui_styles_createStyles__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("../../../node_modules/@mui/styles/createStyles/index.js");
/* harmony import */ var _mui_styles_withStyles__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("../../../node_modules/@mui/styles/withStyles/index.js");
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











var EventLogTable = _framework_src_components_material_table__WEBPACK_IMPORTED_MODULE_2__["MaterialTable"];
var mapProps = function mapProps(state) {
  _newArrowCheck(this, _this);
  return {
    eventLogProperties: Object(_handlers_eventLogHandler__WEBPACK_IMPORTED_MODULE_4__["createEventLogProperties"])(state),
    eventLog: state.eventLog.logEntries
  };
}.bind(undefined);
var mapDispatch = function mapDispatch(dispatcher) {
  _newArrowCheck(this, _this);
  return {
    eventLogActions: Object(_handlers_eventLogHandler__WEBPACK_IMPORTED_MODULE_4__["createEventLogActions"])(dispatcher.dispatch)
  };
}.bind(undefined);
var styles = function styles(theme) {
  _newArrowCheck(this, _this);
  return Object(_mui_styles_createStyles__WEBPACK_IMPORTED_MODULE_8__["default"])({
    button: {
      margin: 0,
      padding: "6px 6px",
      minWidth: "unset"
    },
    spacer: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      display: "inline"
    }
  });
}.bind(undefined);
var initalSorted = false;
var EventLogComponent = /*#__PURE__*/function (_React$Component) {
  function EventLogComponent(props) {
    var _this3 = this;
    var _this2;
    _classCallCheck(this, EventLogComponent);
    _this2 = _callSuper(this, EventLogComponent, [props]);
    _this2.renderIcon = function (rowData, index) {
      var _this4 = this;
      _newArrowCheck(this, _this3);
      //console.log(rowData)
      var classes = _this2.props.classes;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_mui_material__WEBPACK_IMPORTED_MODULE_6__["Tooltip"], {
        disableInteractive: true,
        title: "Info"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_mui_material__WEBPACK_IMPORTED_MODULE_6__["IconButton"], {
        className: classes.button,
        onClick: function () {
          _newArrowCheck(this, _this4);
          console.log(rowData);
          _this2.setState({
            elsdata: rowData,
            isDialogOpen: true
          });
        }.bind(this),
        size: "large"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_mui_icons_material_InfoOutlined__WEBPACK_IMPORTED_MODULE_7___default.a, null)));
    }.bind(this);
    _this2.onCloseRefreshEventLogDialog = function () {
      _newArrowCheck(this, _this3);
      _this2.setState({
        refreshEventLogEditorMode: _components_refreshEventLogDialog__WEBPACK_IMPORTED_MODULE_5__["RefreshEventLogDialogMode"].None
      });
    }.bind(this);
    _this2.state = {
      refreshEventLogEditorMode: _components_refreshEventLogDialog__WEBPACK_IMPORTED_MODULE_5__["RefreshEventLogDialogMode"].None,
      elsdata: null,
      isDialogOpen: false
    };
    return _this2;
  }
  _inherits(EventLogComponent, _React$Component);
  return _createClass(EventLogComponent, [{
    key: "render",
    value: function render() {
      var _this5 = this;
      var refreshEventLogAction = {
        icon: _mui_icons_material_Refresh__WEBPACK_IMPORTED_MODULE_3___default.a,
        tooltip: "Refresh Event log",
        ariaLabel: "refresh",
        onClick: function onClick() {
          _newArrowCheck(this, _this5);
          this.setState({
            refreshEventLogEditorMode: _components_refreshEventLogDialog__WEBPACK_IMPORTED_MODULE_5__["RefreshEventLogDialogMode"].RefreshEventLogTable
          });
        }.bind(this)
      };
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"](react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"](EventLogTable, _extends({
        stickyHeader: true,
        title: "Event Log",
        tableId: "event-log-table",
        idProperty: "_id",
        customActionButtons: [refreshEventLogAction],
        columns: [{
          property: "nodeId",
          title: "Node Name"
        }, {
          property: "counter",
          title: "Counter"
        }, {
          property: "timestamp",
          title: "Timestamp"
        }, {
          property: "attributeName",
          title: "Attribute Name"
        }, {
          property: "newValue",
          title: "Message"
        }, {
          property: "sourceType",
          title: "Source"
        }, {
          property: "Action",
          title: "",
          type: _framework_src_components_material_table__WEBPACK_IMPORTED_MODULE_2__["ColumnType"].custom,
          customControl: this.renderIcon
        }]
      }, this.props.eventLogActions, this.props.eventLogProperties)), this.state.elsdata && this.state.elsdata != null ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_mui_material__WEBPACK_IMPORTED_MODULE_6__["Dialog"], {
        open: this.state.isDialogOpen,
        onClose: function () {
          _newArrowCheck(this, _this5);
          return this.setState({
            isDialogOpen: false
          });
        }.bind(this),
        PaperProps: {
          style: {
            minHeight: "23vh",
            minWidth: "50vw",
            border: "4px solid #38456a",
            borderRadius: "5px",
            backgroundColor: "#e8e8e8"
          }
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_mui_material__WEBPACK_IMPORTED_MODULE_6__["DialogContent"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_mui_material__WEBPACK_IMPORTED_MODULE_6__["Typography"], {
        variant: "h6"
      }, "Event Details:"), this.state.elsdata && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_mui_material__WEBPACK_IMPORTED_MODULE_6__["Card"], {
        style: {
          overflowX: "auto"
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_mui_material__WEBPACK_IMPORTED_MODULE_6__["CardContent"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("strong", null, "Node Name:"), " ", this.state.elsdata.rowData.nodeId), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("strong", null, "Counter:"), " ", this.state.elsdata.rowData.counter), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("strong", null, "Timestamp:"), " ", this.state.elsdata.rowData.timestamp), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("strong", null, "Object ID:"), " ", this.state.elsdata.rowData.objectId), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("strong", null, "Attribute Name:"), " ", this.state.elsdata.rowData.attributeName), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("strong", null, "Message:"), " ", this.state.elsdata.rowData.newValue), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("strong", null, "Source:"), " ", this.state.elsdata.rowData.sourceType))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_mui_material__WEBPACK_IMPORTED_MODULE_6__["DialogActions"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_mui_material__WEBPACK_IMPORTED_MODULE_6__["Button"], {
        onClick: function () {
          _newArrowCheck(this, _this5);
          this.setState({
            elsdata: null,
            isDialogOpen: false
          });
        }.bind(this),
        style: {
          backgroundColor: "white",
          color: "#38761d",
          border: "1px solid #2986cc",
          borderRadius: "4px",
          padding: "3px 6px",
          marginRight: "5%"
        }
      }, "OK"))) : null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_components_refreshEventLogDialog__WEBPACK_IMPORTED_MODULE_5__["default"], {
        mode: this.state.refreshEventLogEditorMode,
        onClose: this.onCloseRefreshEventLogDialog
      }));
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      if (!initalSorted) {
        initalSorted = true;
        this.props.eventLogActions.onHandleExplicitRequestSort("timestamp", "desc");
      } else {
        this.props.eventLogActions.onRefresh();
      }
    }
  }]);
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);
var EventLog = Object(_mui_styles_withStyles__WEBPACK_IMPORTED_MODULE_9__["default"])(styles)(Object(_framework_src_flux_connect__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapProps, mapDispatch)(EventLogComponent));
/* harmony default export */ __webpack_exports__["default"] = (EventLog);

/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("./pluginEventLog.tsx");


/***/ }),

/***/ "dll-reference app":
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_dll_reference_app__;

/***/ })

/******/ });
});
//# sourceMappingURL=eventLogApp.js.map