(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("app"), require("vendor"));
	else if(typeof define === 'function' && define.amd)
		define(["app", "vendor"], factory);
	else if(typeof exports === 'object')
		exports["maintenanceApp"] = factory(require("app"), require("vendor"));
	else
		root["maintenanceApp"] = factory(root["app"], root["vendor"]);
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

/***/ "../../../framework/src/utilities/yangHelper.ts":
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__("dll-reference app"))("./utilities/yangHelper.ts");

/***/ }),

/***/ "../../../node_modules/@babel/runtime/helpers/interopRequireDefault.js":
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__("dll-reference app"))("../../node_modules/@babel/runtime/helpers/interopRequireDefault.js");

/***/ }),

/***/ "../../../node_modules/@fortawesome/free-solid-svg-icons/index.es.js":
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__("dll-reference app"))("../../node_modules/@fortawesome/free-solid-svg-icons/index.es.js");

/***/ }),

/***/ "../../../node_modules/@fortawesome/react-fontawesome/index.es.js":
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__("dll-reference app"))("../../node_modules/@fortawesome/react-fontawesome/index.es.js");

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

/***/ "../../../node_modules/@mui/icons-material/RemoveCircleOutline.js":
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
  d: "M7 11v2h10v-2H7zm5-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"
}), 'RemoveCircleOutline');
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

/***/ "./actions/maintenenceActions.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BaseAction", function() { return BaseAction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoadAllMainteneceEntriesAction", function() { return LoadAllMainteneceEntriesAction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AllMainteneceEntriesLoadedAction", function() { return AllMainteneceEntriesLoadedAction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UpdateMaintenanceEntry", function() { return UpdateMaintenanceEntry; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addOrUpdateMaintenenceEntryAsyncActionCreator", function() { return addOrUpdateMaintenenceEntryAsyncActionCreator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeFromMaintenenceEntrysAsyncActionCreator", function() { return removeFromMaintenenceEntrysAsyncActionCreator; });
/* harmony import */ var _framework_src_actions_snackbarActions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../../framework/src/actions/snackbarActions.ts");
/* harmony import */ var _framework_src_flux_action__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../../framework/src/flux/action.ts");
/* harmony import */ var _handlers_maintenanceEntriesHandler__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./handlers/maintenanceEntriesHandler.ts");
/* harmony import */ var _models_maintenanceEntryType__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./models/maintenanceEntryType.ts");
/* harmony import */ var _services_maintenenceService__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./services/maintenenceService.ts");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _this3 = undefined;
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
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
/* eslint-disable @typescript-eslint/no-unused-expressions */
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





var BaseAction = /*#__PURE__*/function (_Action) {
  function BaseAction() {
    _classCallCheck(this, BaseAction);
    return _callSuper(this, BaseAction, arguments);
  }
  _inherits(BaseAction, _Action);
  return _createClass(BaseAction);
}(_framework_src_flux_action__WEBPACK_IMPORTED_MODULE_1__["Action"]);
var LoadAllMainteneceEntriesAction = /*#__PURE__*/function (_BaseAction) {
  function LoadAllMainteneceEntriesAction() {
    _classCallCheck(this, LoadAllMainteneceEntriesAction);
    return _callSuper(this, LoadAllMainteneceEntriesAction, arguments);
  }
  _inherits(LoadAllMainteneceEntriesAction, _BaseAction);
  return _createClass(LoadAllMainteneceEntriesAction);
}(BaseAction);
var AllMainteneceEntriesLoadedAction = /*#__PURE__*/function (_BaseAction2) {
  function AllMainteneceEntriesLoadedAction(maintenenceEntries) {
    var _this;
    _classCallCheck(this, AllMainteneceEntriesLoadedAction);
    _this = _callSuper(this, AllMainteneceEntriesLoadedAction);
    _this.maintenenceEntries = maintenenceEntries;
    return _this;
  }
  _inherits(AllMainteneceEntriesLoadedAction, _BaseAction2);
  return _createClass(AllMainteneceEntriesLoadedAction);
}(BaseAction);
var UpdateMaintenanceEntry = /*#__PURE__*/function (_BaseAction3) {
  function UpdateMaintenanceEntry(maintenenceEntry) {
    var _this2;
    _classCallCheck(this, UpdateMaintenanceEntry);
    _this2 = _callSuper(this, UpdateMaintenanceEntry);
    _this2.maintenenceEntry = maintenenceEntry;
    return _this2;
  }
  _inherits(UpdateMaintenanceEntry, _BaseAction3);
  return _createClass(UpdateMaintenanceEntry);
}(BaseAction);
/** Represents an async thunk action creator to add an element to the maintenence entries. */
var addOrUpdateMaintenenceEntryAsyncActionCreator = function addOrUpdateMaintenenceEntryAsyncActionCreator(entry) {
  var _this4 = this;
  _newArrowCheck(this, _this3);
  return function (dispatch) {
    var _this5 = this;
    _newArrowCheck(this, _this4);
    _services_maintenenceService__WEBPACK_IMPORTED_MODULE_4__["maintenenceService"].writeMaintenenceEntry(entry).then(function (result) {
      var _this6 = this;
      _newArrowCheck(this, _this5);
      result && window.setTimeout(function () {
        _newArrowCheck(this, _this6);
        // dispatch(loadAllMountedNetworkElementsAsync);
        dispatch(new UpdateMaintenanceEntry(entry));
        dispatch(new _framework_src_actions_snackbarActions__WEBPACK_IMPORTED_MODULE_0__["AddSnackbarNotification"]({
          message: "Successfully ".concat(result && result.created ? 'created' : 'updated', " maintenance settings for [").concat(entry.nodeId, "]"),
          options: {
            variant: 'success'
          }
        }));
      }.bind(this), 900);
      dispatch(_handlers_maintenanceEntriesHandler__WEBPACK_IMPORTED_MODULE_2__["maintenanceEntriesReloadAction"]);
    }.bind(this));
  }.bind(this);
}.bind(undefined);
/** Represents an async thunk action creator to delete an element from the maintenence entries. */
var removeFromMaintenenceEntrysAsyncActionCreator = function removeFromMaintenenceEntrysAsyncActionCreator(entry) {
  var _this7 = this;
  _newArrowCheck(this, _this3);
  return function (dispatch) {
    var _this8 = this;
    _newArrowCheck(this, _this7);
    _services_maintenenceService__WEBPACK_IMPORTED_MODULE_4__["maintenenceService"].deleteMaintenenceEntry(entry).then(function (result) {
      var _this9 = this;
      _newArrowCheck(this, _this8);
      result && window.setTimeout(function () {
        _newArrowCheck(this, _this9);
        dispatch(new UpdateMaintenanceEntry(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty({}, _models_maintenanceEntryType__WEBPACK_IMPORTED_MODULE_3__["spoofSymbol"], true), "mId", entry.mId), "nodeId", entry.nodeId), "description", ''), "start", ''), "end", ''), "active", false)));
        dispatch(new _framework_src_actions_snackbarActions__WEBPACK_IMPORTED_MODULE_0__["AddSnackbarNotification"]({
          message: "Successfully removed [".concat(entry.nodeId, "]"),
          options: {
            variant: 'success'
          }
        }));
      }.bind(this), 900);
      dispatch(_handlers_maintenanceEntriesHandler__WEBPACK_IMPORTED_MODULE_2__["maintenanceEntriesReloadAction"]);
    }.bind(this));
  }.bind(this);
}.bind(undefined);
// Hint: since there is no notification of changed required network elements, this code is not aware of changes caused outiside of this browser.

/***/ }),

/***/ "./assets/icons/maintenanceAppIcon.svg":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "./images/maintenanceAppIcon.svg";

/***/ }),

/***/ "./components/editMaintenenceEntryDialog.tsx":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EditMaintenenceEntryDialogMode", function() { return EditMaintenenceEntryDialogMode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EditMaintenenceEntryDIalog", function() { return EditMaintenenceEntryDIalog; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _mui_material_Button__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../../node_modules/@mui/material/Button/index.js");
/* harmony import */ var _mui_material_Dialog__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../../../node_modules/@mui/material/Dialog/index.js");
/* harmony import */ var _mui_material_DialogActions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("../../../node_modules/@mui/material/DialogActions/index.js");
/* harmony import */ var _mui_material_DialogContent__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("../../../node_modules/@mui/material/DialogContent/index.js");
/* harmony import */ var _mui_material_DialogContentText__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("../../../node_modules/@mui/material/DialogContentText/index.js");
/* harmony import */ var _mui_material_DialogTitle__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("../../../node_modules/@mui/material/DialogTitle/index.js");
/* harmony import */ var _mui_material_TextField__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("../../../node_modules/@mui/material/TextField/index.js");
/* harmony import */ var _framework_src_flux_connect__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("../../../framework/src/flux/connect.tsx");
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("../../../node_modules/@mui/material/index.js");
/* harmony import */ var _actions_maintenenceActions__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("./actions/maintenenceActions.ts");
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
/* eslint-disable @typescript-eslint/no-unused-expressions */
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











var EditMaintenenceEntryDialogMode;
(function (EditMaintenenceEntryDialogMode) {
  EditMaintenenceEntryDialogMode["None"] = "none";
  EditMaintenenceEntryDialogMode["AddMaintenenceEntry"] = "addMaintenenceEntry";
  EditMaintenenceEntryDialogMode["EditMaintenenceEntry"] = "editMaintenenceEntry";
  EditMaintenenceEntryDialogMode["RemoveMaintenenceEntry"] = "removeMaintenenceEntry";
})(EditMaintenenceEntryDialogMode || (EditMaintenenceEntryDialogMode = {}));
var mapDispatch = function mapDispatch(dispatcher) {
  var _this2 = this;
  _newArrowCheck(this, _this);
  return {
    addOrUpdateMaintenenceEntry: function addOrUpdateMaintenenceEntry(entry) {
      _newArrowCheck(this, _this2);
      dispatcher.dispatch(Object(_actions_maintenenceActions__WEBPACK_IMPORTED_MODULE_10__["addOrUpdateMaintenenceEntryAsyncActionCreator"])(entry));
    }.bind(this),
    removeMaintenenceEntry: function removeMaintenenceEntry(entry) {
      _newArrowCheck(this, _this2);
      dispatcher.dispatch(Object(_actions_maintenenceActions__WEBPACK_IMPORTED_MODULE_10__["removeFromMaintenenceEntrysAsyncActionCreator"])(entry));
    }.bind(this)
  };
}.bind(undefined);
var settings = _defineProperty(_defineProperty(_defineProperty(_defineProperty({}, EditMaintenenceEntryDialogMode.None, {
  dialogTitle: '',
  dialogDescription: '',
  applyButtonText: '',
  cancelButtonText: '',
  enableMountIdEditor: false,
  enableTimeEditor: false
}), EditMaintenenceEntryDialogMode.AddMaintenenceEntry, {
  dialogTitle: 'Add new maintenence entry',
  dialogDescription: '',
  applyButtonText: 'Add',
  cancelButtonText: 'Cancel',
  enableMountIdEditor: true,
  enableTimeEditor: true
}), EditMaintenenceEntryDialogMode.EditMaintenenceEntry, {
  dialogTitle: 'Edit maintenence entry',
  dialogDescription: '',
  applyButtonText: 'Save',
  cancelButtonText: 'Cancel',
  enableMountIdEditor: false,
  enableTimeEditor: true
}), EditMaintenenceEntryDialogMode.RemoveMaintenenceEntry, {
  dialogTitle: 'Remove maintenence entry',
  dialogDescription: '',
  applyButtonText: 'Remove',
  cancelButtonText: 'Cancel',
  enableMountIdEditor: false,
  enableTimeEditor: false
});
var EditMaintenenceEntryDIalogComponent = /*#__PURE__*/function (_React$Component) {
  function EditMaintenenceEntryDIalogComponent(props) {
    var _this4 = this;
    var _this3;
    _classCallCheck(this, EditMaintenenceEntryDIalogComponent);
    _this3 = _callSuper(this, EditMaintenenceEntryDIalogComponent, [props]);
    _this3.onApply = function (entry) {
      _newArrowCheck(this, _this4);
      _this3.props.onClose && _this3.props.onClose();
      switch (_this3.props.mode) {
        case EditMaintenenceEntryDialogMode.AddMaintenenceEntry:
          entry && _this3.props.addOrUpdateMaintenenceEntry(entry);
          break;
        case EditMaintenenceEntryDialogMode.EditMaintenenceEntry:
          entry && _this3.props.addOrUpdateMaintenenceEntry(entry);
          break;
        case EditMaintenenceEntryDialogMode.RemoveMaintenenceEntry:
          entry && _this3.props.removeMaintenenceEntry(entry);
          break;
      }
    }.bind(this);
    _this3.onCancel = function () {
      _newArrowCheck(this, _this4);
      _this3.props.onClose && _this3.props.onClose();
    }.bind(this);
    _this3.state = Object.assign(Object.assign({}, _this3.props.initialMaintenenceEntry), {
      isErrorVisible: false
    });
    return _this3;
  }
  _inherits(EditMaintenenceEntryDIalogComponent, _React$Component);
  return _createClass(EditMaintenenceEntryDIalogComponent, [{
    key: "render",
    value: function render() {
      var _this5 = this;
      var setting = settings[this.props.mode];
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_mui_material_Dialog__WEBPACK_IMPORTED_MODULE_2__["default"], {
        open: this.props.mode !== EditMaintenenceEntryDialogMode.None
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_mui_material_DialogTitle__WEBPACK_IMPORTED_MODULE_6__["default"], {
        id: "form-dialog-title",
        style: {
          backgroundColor: '#b3b3ff',
          border: '1px solid #ccc',
          borderRadius: '3px',
          padding: 0
        }
      }, setting.dialogTitle), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_mui_material_DialogContent__WEBPACK_IMPORTED_MODULE_4__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_mui_material_DialogContentText__WEBPACK_IMPORTED_MODULE_5__["default"], null, setting.dialogDescription), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_mui_material_TextField__WEBPACK_IMPORTED_MODULE_7__["default"], {
        variant: "standard",
        disabled: !setting.enableMountIdEditor,
        spellCheck: false,
        autoFocus: true,
        margin: "dense",
        id: "name",
        label: "Name",
        type: "text",
        fullWidth: true,
        value: this.state.nodeId,
        onChange: function (event) {
          _newArrowCheck(this, _this5);
          this.setState({
            nodeId: event.target.value
          });
        }.bind(this)
      }), this.state.isErrorVisible && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_mui_material__WEBPACK_IMPORTED_MODULE_9__["Typography"], {
        variant: "body1",
        color: "error"
      }, "Name must not be empty."), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_mui_material_TextField__WEBPACK_IMPORTED_MODULE_7__["default"], {
        variant: "standard",
        disabled: !setting.enableTimeEditor,
        spellCheck: false,
        autoFocus: true,
        margin: "dense",
        id: "start",
        label: "Start (Local DateTime)",
        type: "datetime-local",
        fullWidth: true,
        value: this.state.start,
        onChange: function (event) {
          _newArrowCheck(this, _this5);
          this.setState({
            start: event.target.value
          });
        }.bind(this)
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_mui_material_TextField__WEBPACK_IMPORTED_MODULE_7__["default"], {
        variant: "standard",
        disabled: !setting.enableTimeEditor,
        spellCheck: false,
        autoFocus: true,
        margin: "dense",
        id: "end",
        label: "End (Local DateTime)",
        type: "datetime-local",
        fullWidth: true,
        value: this.state.end,
        onChange: function (event) {
          _newArrowCheck(this, _this5);
          this.setState({
            end: event.target.value
          });
        }.bind(this)
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_mui_material__WEBPACK_IMPORTED_MODULE_9__["FormControl"], {
        variant: "standard",
        fullWidth: true,
        disabled: !setting.enableTimeEditor
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_mui_material__WEBPACK_IMPORTED_MODULE_9__["InputLabel"], {
        htmlFor: "active"
      }, "Active"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_mui_material__WEBPACK_IMPORTED_MODULE_9__["Select"], {
        variant: "standard",
        value: this.state.active || false,
        onChange: function (event) {
          _newArrowCheck(this, _this5);
          this.setState({
            active: event.target.value
          });
        }.bind(this),
        inputProps: {
          name: 'active',
          id: 'active'
        },
        fullWidth: true
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_mui_material__WEBPACK_IMPORTED_MODULE_9__["MenuItem"], {
        value: true
      }, "active"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_mui_material__WEBPACK_IMPORTED_MODULE_9__["MenuItem"], {
        value: false
      }, "not active")))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_mui_material_DialogActions__WEBPACK_IMPORTED_MODULE_3__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_mui_material_Button__WEBPACK_IMPORTED_MODULE_1__["default"], {
        onClick: function (event) {
          _newArrowCheck(this, _this5);
          if (this.props.mode === EditMaintenenceEntryDialogMode.AddMaintenenceEntry && this.state.nodeId.trim().length === 0) {
            this.setState({
              isErrorVisible: true
            });
          } else {
            this.onApply({
              mId: this.state.mId || this.state.nodeId,
              nodeId: this.state.nodeId,
              description: this.state.description,
              start: this.state.start,
              end: this.state.end,
              active: this.state.active
            });
            this.setState({
              isErrorVisible: false
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
          event.preventDefault();
          event.stopPropagation();
          this.setState({
            isErrorVisible: false
          });
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
      if (props.initialMaintenenceEntry !== state.initialMaintenenceEntrie) {
        // eslint-disable-next-line no-param-reassign
        state = Object.assign(Object.assign(Object.assign({}, state), props.initialMaintenenceEntry), {
          initialMaintenenceEntrie: props.initialMaintenenceEntry
        });
      }
      return state;
    }
  }]);
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);
var EditMaintenenceEntryDIalog = Object(_framework_src_flux_connect__WEBPACK_IMPORTED_MODULE_8__["connect"])(undefined, mapDispatch)(EditMaintenenceEntryDIalogComponent);
/* harmony default export */ __webpack_exports__["default"] = (EditMaintenenceEntryDIalog);

/***/ }),

/***/ "./components/refreshMaintenanceEntries.tsx":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RefreshMaintenanceEntriesDialogMode", function() { return RefreshMaintenanceEntriesDialogMode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RefreshMaintenanceEntriesDialog", function() { return RefreshMaintenanceEntriesDialog; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _mui_material_Button__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../../node_modules/@mui/material/Button/index.js");
/* harmony import */ var _mui_material_Dialog__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../../../node_modules/@mui/material/Dialog/index.js");
/* harmony import */ var _mui_material_DialogActions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("../../../node_modules/@mui/material/DialogActions/index.js");
/* harmony import */ var _mui_material_DialogContent__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("../../../node_modules/@mui/material/DialogContent/index.js");
/* harmony import */ var _mui_material_DialogContentText__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("../../../node_modules/@mui/material/DialogContentText/index.js");
/* harmony import */ var _mui_material_DialogTitle__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("../../../node_modules/@mui/material/DialogTitle/index.js");
/* harmony import */ var _framework_src_flux_connect__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("../../../framework/src/flux/connect.tsx");
/* harmony import */ var _handlers_maintenanceEntriesHandler__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./handlers/maintenanceEntriesHandler.ts");
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









var RefreshMaintenanceEntriesDialogMode;
(function (RefreshMaintenanceEntriesDialogMode) {
  RefreshMaintenanceEntriesDialogMode["None"] = "none";
  RefreshMaintenanceEntriesDialogMode["RefreshMaintenanceEntriesTable"] = "RefreshMaintenanceEntriesTable";
})(RefreshMaintenanceEntriesDialogMode || (RefreshMaintenanceEntriesDialogMode = {}));
var mapDispatch = function mapDispatch(dispatcher) {
  var _this2 = this;
  _newArrowCheck(this, _this);
  return {
    refreshMaintenanceEntries: function refreshMaintenanceEntries() {
      _newArrowCheck(this, _this2);
      return dispatcher.dispatch(_handlers_maintenanceEntriesHandler__WEBPACK_IMPORTED_MODULE_8__["maintenanceEntriesReloadAction"]);
    }.bind(this)
  };
}.bind(undefined);
var settings = _defineProperty(_defineProperty({}, RefreshMaintenanceEntriesDialogMode.None, {
  dialogTitle: '',
  dialogDescription: '',
  applyButtonText: '',
  cancelButtonText: '',
  enableMountIdEditor: false,
  enableUsernameEditor: false,
  enableExtendedEditor: false
}), RefreshMaintenanceEntriesDialogMode.RefreshMaintenanceEntriesTable, {
  dialogTitle: 'Do you want to refresh Maintenance Entries?',
  dialogDescription: '',
  applyButtonText: 'Yes',
  cancelButtonText: 'Cancel',
  enableMountIdEditor: true,
  enableUsernameEditor: true,
  enableExtendedEditor: true
});
var RefreshMaintenanceEntriesDialogComponent = /*#__PURE__*/function (_React$Component) {
  function RefreshMaintenanceEntriesDialogComponent() {
    var _this4 = this;
    var _this3;
    _classCallCheck(this, RefreshMaintenanceEntriesDialogComponent);
    _this3 = _callSuper(this, RefreshMaintenanceEntriesDialogComponent, arguments);
    _this3.onRefresh = function () {
      _newArrowCheck(this, _this4);
      _this3.props.refreshMaintenanceEntries();
      _this3.props.onClose();
    }.bind(this);
    _this3.onCancel = function () {
      _newArrowCheck(this, _this4);
      _this3.props.onClose();
    }.bind(this);
    return _this3;
  }
  _inherits(RefreshMaintenanceEntriesDialogComponent, _React$Component);
  return _createClass(RefreshMaintenanceEntriesDialogComponent, [{
    key: "render",
    value: function render() {
      var _this5 = this;
      var setting = settings[this.props.mode];
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_mui_material_Dialog__WEBPACK_IMPORTED_MODULE_2__["default"], {
        open: this.props.mode !== RefreshMaintenanceEntriesDialogMode.None
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_mui_material_DialogTitle__WEBPACK_IMPORTED_MODULE_6__["default"], {
        id: "form-dialog-title",
        "aria-label": "".concat(setting.dialogTitle.replace(/ /g, '-').toLowerCase(), "-dialog")
      }, setting.dialogTitle), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_mui_material_DialogContent__WEBPACK_IMPORTED_MODULE_4__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_mui_material_DialogContentText__WEBPACK_IMPORTED_MODULE_5__["default"], null, setting.dialogDescription)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_mui_material_DialogActions__WEBPACK_IMPORTED_MODULE_3__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_mui_material_Button__WEBPACK_IMPORTED_MODULE_1__["default"], {
        "aria-label": "dialog-confirm-button",
        onClick: function () {
          _newArrowCheck(this, _this5);
          this.onRefresh();
        }.bind(this),
        color: "inherit"
      }, " ", setting.applyButtonText, " "), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_mui_material_Button__WEBPACK_IMPORTED_MODULE_1__["default"], {
        "aria-label": "dialog-cancel-button",
        onClick: function () {
          _newArrowCheck(this, _this5);
          this.onCancel();
        }.bind(this),
        color: "secondary"
      }, " ", setting.cancelButtonText, " ")));
    }
  }]);
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);
var RefreshMaintenanceEntriesDialog = Object(_framework_src_flux_connect__WEBPACK_IMPORTED_MODULE_7__["connect"])(undefined, mapDispatch)(RefreshMaintenanceEntriesDialogComponent);
/* harmony default export */ __webpack_exports__["default"] = (RefreshMaintenanceEntriesDialog);

/***/ }),

/***/ "./handlers/maintenanceAppRootHandler.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "maintenanceAppRootHandler", function() { return maintenanceAppRootHandler; });
/* harmony import */ var _framework_src_flux_middleware__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../../framework/src/flux/middleware.ts");
/* harmony import */ var _maintenanceEntriesHandler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./handlers/maintenanceEntriesHandler.ts");
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
  maintenanceEntries: _maintenanceEntriesHandler__WEBPACK_IMPORTED_MODULE_1__["maintenanceEntriesActionHandler"]
};
var maintenanceAppRootHandler = Object(_framework_src_flux_middleware__WEBPACK_IMPORTED_MODULE_0__["combineActionHandler"])(actionHandlers);
/* harmony default export */ __webpack_exports__["default"] = (maintenanceAppRootHandler);

/***/ }),

/***/ "./handlers/maintenanceEntriesHandler.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "maintenanceEntriesActionHandler", function() { return maintenanceEntriesActionHandler; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createmaintenanceEntriesActions", function() { return createmaintenanceEntriesActions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createmaintenanceEntriesProperties", function() { return createmaintenanceEntriesProperties; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "maintenanceEntriesReloadAction", function() { return maintenanceEntriesReloadAction; });
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


// create elastic search material data fetch handler
var maintenanceEntriesSearchHandler = Object(_framework_src_utilities_elasticSearch__WEBPACK_IMPORTED_MODULE_1__["createSearchDataHandler"])('maintenance');
var _createExternal = Object(_framework_src_components_material_table_utilities__WEBPACK_IMPORTED_MODULE_0__["createExternal"])(maintenanceEntriesSearchHandler, function (appState) {
    _newArrowCheck(this, _this);
    return appState.maintenance.maintenanceEntries;
  }.bind(undefined)),
  maintenanceEntriesActionHandler = _createExternal.actionHandler,
  createmaintenanceEntriesActions = _createExternal.createActions,
  createmaintenanceEntriesProperties = _createExternal.createProperties,
  maintenanceEntriesReloadAction = _createExternal.reloadAction;


/***/ }),

/***/ "./models/maintenanceEntryType.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spoofSymbol", function() { return spoofSymbol; });
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
/** Represents the elestic search db type for maintenence enrties */
var spoofSymbol = Symbol('Spoof');

/***/ }),

/***/ "./pluginMaintenance.tsx":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "register", function() { return register; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _framework_src_services_applicationManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../../framework/src/services/applicationManager.ts");
/* harmony import */ var _handlers_maintenanceAppRootHandler__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./handlers/maintenanceAppRootHandler.ts");
/* harmony import */ var _views_maintenanceView__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./views/maintenanceView.tsx");
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




var appIcon = __webpack_require__("./assets/icons/maintenanceAppIcon.svg"); // select app icon
var App = function App() {
  _newArrowCheck(this, _this);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_views_maintenanceView__WEBPACK_IMPORTED_MODULE_3__["MaintenanceView"], null);
}.bind(undefined);
function register() {
  _framework_src_services_applicationManager__WEBPACK_IMPORTED_MODULE_1__["default"].registerApplication({
    name: 'maintenance',
    icon: appIcon,
    rootComponent: App,
    rootActionHandler: _handlers_maintenanceAppRootHandler__WEBPACK_IMPORTED_MODULE_2__["maintenanceAppRootHandler"],
    menuEntry: 'Maintenance'
  });
}

/***/ }),

/***/ "./services/maintenenceService.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "maintenenceEntryDatabasePath", function() { return maintenenceEntryDatabasePath; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "maintenenceService", function() { return maintenenceService; });
/* harmony import */ var core_js_modules_web_dom_iterable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../../node_modules/core-js/modules/web.dom.iterable.js");
/* harmony import */ var core_js_modules_web_dom_iterable__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_iterable__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../../node_modules/regenerator-runtime/runtime.js");
/* harmony import */ var regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _framework_src_services_restService__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../../../framework/src/services/restService.ts");
/* harmony import */ var _framework_src_utilities_yangHelper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("../../../framework/src/utilities/yangHelper.ts");
/* harmony import */ var _utils_timeUtils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./utils/timeUtils.ts");


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



var maintenenceEntryDatabasePath = 'mwtn/maintenancemode';
/**
 * Represents a web api accessor service for all maintenence entries related actions.
 */
var MaintenenceService = /*#__PURE__*/function () {
  function MaintenenceService() {
    _classCallCheck(this, MaintenenceService);
  }
  return _createClass(MaintenenceService, [{
    key: "writeMaintenenceEntry",
    value:
    /**
    * Adds or updates one maintenence entry to the backend.
    */
    function writeMaintenenceEntry(maintenenceEntry) {
      return __awaiter(this, void 0, void 0, /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        var path, query, result;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              path = '/rests/operations/data-provider:create-maintenance';
              query = {
                'id': maintenenceEntry.mId,
                'node-id': maintenenceEntry.nodeId,
                'active': maintenenceEntry.active,
                'description': maintenenceEntry.description,
                'end': Object(_utils_timeUtils__WEBPACK_IMPORTED_MODULE_4__["convertToISODateString"])(maintenenceEntry.end),
                'start': Object(_utils_timeUtils__WEBPACK_IMPORTED_MODULE_4__["convertToISODateString"])(maintenenceEntry.start)
              };
              _context.next = 4;
              return Object(_framework_src_services_restService__WEBPACK_IMPORTED_MODULE_2__["requestRest"])(path, {
                method: 'POST',
                body: JSON.stringify(Object(_framework_src_utilities_yangHelper__WEBPACK_IMPORTED_MODULE_3__["convertPropertyNames"])({
                  'data-provider:input': query
                }, _framework_src_utilities_yangHelper__WEBPACK_IMPORTED_MODULE_3__["replaceUpperCase"]))
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
    * Deletes one maintenence entry by its mountId from the backend.
    */
  }, {
    key: "deleteMaintenenceEntry",
    value: function deleteMaintenenceEntry(maintenenceEntry) {
      return __awaiter(this, void 0, void 0, /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
        var path, query, result;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              path = '/rests/operations/data-provider:delete-maintenance';
              query = {
                'id': maintenenceEntry.mId,
                'node-id': maintenenceEntry.nodeId,
                'active': maintenenceEntry.active,
                'description': maintenenceEntry.description,
                'end': Object(_utils_timeUtils__WEBPACK_IMPORTED_MODULE_4__["convertToISODateString"])(maintenenceEntry.end),
                'start': Object(_utils_timeUtils__WEBPACK_IMPORTED_MODULE_4__["convertToISODateString"])(maintenenceEntry.start)
              };
              _context2.next = 4;
              return Object(_framework_src_services_restService__WEBPACK_IMPORTED_MODULE_2__["requestRest"])(path, {
                method: 'POST',
                body: JSON.stringify(Object(_framework_src_utilities_yangHelper__WEBPACK_IMPORTED_MODULE_3__["convertPropertyNames"])({
                  'data-provider:input': query
                }, _framework_src_utilities_yangHelper__WEBPACK_IMPORTED_MODULE_3__["replaceUpperCase"]))
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
  }]);
}();
var maintenenceService = new MaintenenceService();
/* harmony default export */ __webpack_exports__["default"] = (maintenenceService);

/***/ }),

/***/ "./utils/timeUtils.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "convertToGMTString", function() { return convertToGMTString; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "convertToLocaleString", function() { return convertToLocaleString; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "convertToISODateString", function() { return convertToISODateString; });
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
function convertToGMTString(dateString) {
  var _this = this;
  var date = new Date(dateString);
  var pad = function pad(n) {
    _newArrowCheck(this, _this);
    return n < 10 ? '0' + n : n;
  }.bind(this);
  return date.getUTCFullYear() + '-' + pad(date.getUTCMonth() + 1) + '-' + pad(date.getUTCDate()) + 'T' + pad(date.getUTCHours()) + ':' + pad(date.getUTCMinutes()) + '+00:00';
}
function convertToLocaleString(rawDate) {
  var _this2 = this;
  var date = new Date(rawDate);
  var pad = function pad(n) {
    _newArrowCheck(this, _this2);
    return n < 10 ? '0' + n : n;
  }.bind(this);
  return date.getFullYear() + '-' + pad(date.getMonth() + 1) + '-' + pad(date.getDate()) + 'T' + pad(date.getHours()) + ':' + pad(date.getMinutes());
}
function convertToISODateString(rawDate) {
  var date = new Date(rawDate);
  var displayDate = date.toISOString();
  return displayDate.replace(/\.[0-9]{2}/, '.');
}

/***/ }),

/***/ "./views/maintenanceView.tsx":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MaintenanceView", function() { return MaintenanceView; });
/* harmony import */ var core_js_modules_web_dom_iterable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../../node_modules/core-js/modules/web.dom.iterable.js");
/* harmony import */ var core_js_modules_web_dom_iterable__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_iterable__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../../node_modules/regenerator-runtime/runtime.js");
/* harmony import */ var regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("../../../node_modules/@fortawesome/free-solid-svg-icons/index.es.js");
/* harmony import */ var _fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("../../../node_modules/@fortawesome/react-fontawesome/index.es.js");
/* harmony import */ var _mui_icons_material_Add__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("../../../node_modules/@mui/icons-material/Add.js");
/* harmony import */ var _mui_icons_material_Add__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_mui_icons_material_Add__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _mui_icons_material_Edit__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("../../../node_modules/@mui/icons-material/Edit.js");
/* harmony import */ var _mui_icons_material_Edit__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_mui_icons_material_Edit__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _mui_icons_material_Refresh__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("../../../node_modules/@mui/icons-material/Refresh.js");
/* harmony import */ var _mui_icons_material_Refresh__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_mui_icons_material_Refresh__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _mui_icons_material_RemoveCircleOutline__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("../../../node_modules/@mui/icons-material/RemoveCircleOutline.js");
/* harmony import */ var _mui_icons_material_RemoveCircleOutline__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_mui_icons_material_RemoveCircleOutline__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("../../../node_modules/@mui/material/index.js");
/* harmony import */ var _mui_styles_createStyles__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("../../../node_modules/@mui/styles/createStyles/index.js");
/* harmony import */ var _mui_styles_withStyles__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("../../../node_modules/@mui/styles/withStyles/index.js");
/* harmony import */ var _framework_src_components_material_table__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("../../../framework/src/components/material-table/index.tsx");
/* harmony import */ var _framework_src_flux_connect__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__("../../../framework/src/flux/connect.tsx");
/* harmony import */ var _components_editMaintenenceEntryDialog__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__("./components/editMaintenenceEntryDialog.tsx");
/* harmony import */ var _components_refreshMaintenanceEntries__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__("./components/refreshMaintenanceEntries.tsx");
/* harmony import */ var _handlers_maintenanceEntriesHandler__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__("./handlers/maintenanceEntriesHandler.ts");
/* harmony import */ var _utils_timeUtils__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__("./utils/timeUtils.ts");
/* harmony import */ var _mui_icons_material_InfoOutlined__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__("../../../node_modules/@mui/icons-material/InfoOutlined.js");
/* harmony import */ var _mui_icons_material_InfoOutlined__WEBPACK_IMPORTED_MODULE_18___default = /*#__PURE__*/__webpack_require__.n(_mui_icons_material_InfoOutlined__WEBPACK_IMPORTED_MODULE_18__);
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
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator.return && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, catch: function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function _newArrowCheck(n, r) { if (n !== r) throw new TypeError("Cannot instantiate an arrow function"); }
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
  return Object(_mui_styles_createStyles__WEBPACK_IMPORTED_MODULE_10__["default"])({
    button: {
      margin: 0,
      padding: '6px 6px',
      minWidth: 'unset'
    },
    spacer: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      display: 'inline'
    }
  });
}.bind(undefined);
var MaintenanceEntriesTable = _framework_src_components_material_table__WEBPACK_IMPORTED_MODULE_12__["default"];
var mapProps = function mapProps(state) {
  _newArrowCheck(this, _this);
  return {
    maintenanceEntriesProperties: Object(_handlers_maintenanceEntriesHandler__WEBPACK_IMPORTED_MODULE_16__["createmaintenanceEntriesProperties"])(state)
  };
}.bind(undefined);
var mapDispatcher = function mapDispatcher(dispatcher) {
  var _this2 = this;
  _newArrowCheck(this, _this);
  return {
    maintenanceEntriesActions: Object(_handlers_maintenanceEntriesHandler__WEBPACK_IMPORTED_MODULE_16__["createmaintenanceEntriesActions"])(dispatcher.dispatch),
    onLoadMaintenanceEntries: function onLoadMaintenanceEntries() {
      _newArrowCheck(this, _this2);
      return __awaiter(void 0, void 0, void 0, /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return dispatcher.dispatch(_handlers_maintenanceEntriesHandler__WEBPACK_IMPORTED_MODULE_16__["maintenanceEntriesReloadAction"]);
            case 2:
            case "end":
              return _context.stop();
          }
        }, _callee);
      }));
    }.bind(this)
  };
}.bind(undefined);
var emptyMaintenenceEntry = {
  mId: '',
  nodeId: '',
  description: '',
  start: Object(_utils_timeUtils__WEBPACK_IMPORTED_MODULE_17__["convertToLocaleString"])(new Date().valueOf()),
  end: Object(_utils_timeUtils__WEBPACK_IMPORTED_MODULE_17__["convertToLocaleString"])(new Date().valueOf()),
  active: false
};
var initialSorted = false;
var MaintenenceViewComponent = /*#__PURE__*/function (_React$Component) {
  function MaintenenceViewComponent(props) {
    var _this4 = this;
    var _this3;
    _classCallCheck(this, MaintenenceViewComponent);
    _this3 = _callSuper(this, MaintenenceViewComponent, [props]);
    _this3.renderIcon = function (rowData, index) {
      var _this5 = this;
      _newArrowCheck(this, _this4);
      //console.log(rowData)
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("span", {
        style: {},
        onClick: function () {
          _newArrowCheck(this, _this5);
          console.log(rowData);
          _this3.setState({
            elsdata: rowData,
            isDialogOpen: true
          });
        }.bind(this)
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_mui_icons_material_InfoOutlined__WEBPACK_IMPORTED_MODULE_18___default.a, {
        style: {
          color: '#36A9E1'
        }
      }));
    }.bind(this);
    _this3.onOpenPlus1hEditMaintenenceEntryDialog = function (event, entry) {
      _newArrowCheck(this, _this4);
      // event.preventDefault();
      // event.stopPropagation();
      var startTime = new Date().valueOf();
      var endTime = startTime + 1 * 60 * 60 * 1000;
      _this3.setState({
        maintenenceEntryToEdit: Object.assign(Object.assign({}, entry), {
          start: Object(_utils_timeUtils__WEBPACK_IMPORTED_MODULE_17__["convertToLocaleString"])(startTime),
          end: Object(_utils_timeUtils__WEBPACK_IMPORTED_MODULE_17__["convertToLocaleString"])(endTime)
        }),
        maintenanceEntryEditorMode: _components_editMaintenenceEntryDialog__WEBPACK_IMPORTED_MODULE_14__["EditMaintenenceEntryDialogMode"].EditMaintenenceEntry
      });
    }.bind(this);
    _this3.onOpenPlus8hEditMaintenenceEntryDialog = function (event, entry) {
      _newArrowCheck(this, _this4);
      // event.preventDefault();
      // event.stopPropagation();
      var startTime = new Date().valueOf();
      var endTime = startTime + 8 * 60 * 60 * 1000;
      _this3.setState({
        maintenenceEntryToEdit: Object.assign(Object.assign({}, entry), {
          start: Object(_utils_timeUtils__WEBPACK_IMPORTED_MODULE_17__["convertToLocaleString"])(startTime),
          end: Object(_utils_timeUtils__WEBPACK_IMPORTED_MODULE_17__["convertToLocaleString"])(endTime)
        }),
        maintenanceEntryEditorMode: _components_editMaintenenceEntryDialog__WEBPACK_IMPORTED_MODULE_14__["EditMaintenenceEntryDialogMode"].EditMaintenenceEntry
      });
    }.bind(this);
    _this3.onOpenEditMaintenenceEntryDialog = function (event, entry) {
      _newArrowCheck(this, _this4);
      // event.preventDefault();
      // event.stopPropagation();
      var startTime = new Date().valueOf();
      var endTime = startTime;
      _this3.setState({
        maintenenceEntryToEdit: Object.assign(Object.assign({}, entry), entry.start && endTime ? {
          start: Object(_utils_timeUtils__WEBPACK_IMPORTED_MODULE_17__["convertToLocaleString"])(entry.start),
          end: Object(_utils_timeUtils__WEBPACK_IMPORTED_MODULE_17__["convertToLocaleString"])(entry.end)
        } : {
          start: Object(_utils_timeUtils__WEBPACK_IMPORTED_MODULE_17__["convertToLocaleString"])(startTime),
          end: Object(_utils_timeUtils__WEBPACK_IMPORTED_MODULE_17__["convertToLocaleString"])(endTime)
        }),
        maintenanceEntryEditorMode: _components_editMaintenenceEntryDialog__WEBPACK_IMPORTED_MODULE_14__["EditMaintenenceEntryDialogMode"].EditMaintenenceEntry
      });
    }.bind(this);
    _this3.onOpenRemoveMaintenenceEntryDialog = function (event, entry) {
      _newArrowCheck(this, _this4);
      // event.preventDefault();
      // event.stopPropagation();
      var startTime = new Date().valueOf();
      var endTime = startTime;
      _this3.setState({
        maintenenceEntryToEdit: Object.assign(Object.assign({}, entry), entry.start && endTime ? {
          start: Object(_utils_timeUtils__WEBPACK_IMPORTED_MODULE_17__["convertToLocaleString"])(entry.start),
          end: Object(_utils_timeUtils__WEBPACK_IMPORTED_MODULE_17__["convertToLocaleString"])(entry.end)
        } : {
          start: Object(_utils_timeUtils__WEBPACK_IMPORTED_MODULE_17__["convertToLocaleString"])(startTime),
          end: Object(_utils_timeUtils__WEBPACK_IMPORTED_MODULE_17__["convertToLocaleString"])(endTime)
        }),
        maintenanceEntryEditorMode: _components_editMaintenenceEntryDialog__WEBPACK_IMPORTED_MODULE_14__["EditMaintenenceEntryDialogMode"].RemoveMaintenenceEntry
      });
    }.bind(this);
    _this3.onCloseEditMaintenenceEntryDialog = function () {
      _newArrowCheck(this, _this4);
      _this3.setState({
        maintenenceEntryToEdit: emptyMaintenenceEntry,
        maintenanceEntryEditorMode: _components_editMaintenenceEntryDialog__WEBPACK_IMPORTED_MODULE_14__["EditMaintenenceEntryDialogMode"].None
      });
    }.bind(this);
    _this3.onCloseRefreshMaintenenceEntryDialog = function () {
      _newArrowCheck(this, _this4);
      _this3.setState({
        refreshMaintenenceEntriesEditorMode: _components_refreshMaintenanceEntries__WEBPACK_IMPORTED_MODULE_15__["RefreshMaintenanceEntriesDialogMode"].None
      });
    }.bind(this);
    _this3.state = {
      maintenenceEntryToEdit: emptyMaintenenceEntry,
      maintenanceEntryEditorMode: _components_editMaintenenceEntryDialog__WEBPACK_IMPORTED_MODULE_14__["EditMaintenenceEntryDialogMode"].None,
      refreshMaintenenceEntriesEditorMode: _components_refreshMaintenanceEntries__WEBPACK_IMPORTED_MODULE_15__["RefreshMaintenanceEntriesDialogMode"].None,
      elsdata: null,
      isDialogOpen: false
    };
    return _this3;
  }
  _inherits(MaintenenceViewComponent, _React$Component);
  return _createClass(MaintenenceViewComponent, [{
    key: "getContextMenu",
    value: function getContextMenu(rowData) {
      var _this6 = this;
      var buttonArray = [/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_9__["MenuItem"], {
        "aria-label": '1hr-from-now',
        onClick: function (event) {
          _newArrowCheck(this, _this6);
          return this.onOpenPlus1hEditMaintenenceEntryDialog(event, rowData);
        }.bind(this)
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_9__["Typography"], null, "+1h")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_9__["MenuItem"], {
        "aria-label": '8hr-from-now',
        onClick: function (event) {
          _newArrowCheck(this, _this6);
          return this.onOpenPlus8hEditMaintenenceEntryDialog(event, rowData);
        }.bind(this)
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_9__["Typography"], null, "+8h")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_9__["Divider"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_9__["MenuItem"], {
        "aria-label": 'edit',
        onClick: function (event) {
          _newArrowCheck(this, _this6);
          return this.onOpenEditMaintenenceEntryDialog(event, rowData);
        }.bind(this)
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_mui_icons_material_Edit__WEBPACK_IMPORTED_MODULE_6___default.a, null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_9__["Typography"], null, "Edit")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_9__["MenuItem"], {
        "aria-label": 'remove',
        onClick: function (event) {
          _newArrowCheck(this, _this6);
          return this.onOpenRemoveMaintenenceEntryDialog(event, rowData);
        }.bind(this)
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_mui_icons_material_RemoveCircleOutline__WEBPACK_IMPORTED_MODULE_8___default.a, null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_9__["Typography"], null, "Remove"))];
      return buttonArray;
    }
  }, {
    key: "render",
    value: function render() {
      var _this7 = this;
      var addMaintenenceEntryAction = {
        icon: _mui_icons_material_Add__WEBPACK_IMPORTED_MODULE_5___default.a,
        tooltip: 'Add',
        ariaLabel: 'add-element',
        onClick: function onClick() {
          _newArrowCheck(this, _this7);
          var startTime = new Date().valueOf();
          var endTime = startTime;
          this.setState({
            maintenenceEntryToEdit: Object.assign(Object.assign({}, emptyMaintenenceEntry), {
              start: Object(_utils_timeUtils__WEBPACK_IMPORTED_MODULE_17__["convertToLocaleString"])(startTime),
              end: Object(_utils_timeUtils__WEBPACK_IMPORTED_MODULE_17__["convertToLocaleString"])(endTime)
            }),
            maintenanceEntryEditorMode: _components_editMaintenenceEntryDialog__WEBPACK_IMPORTED_MODULE_14__["EditMaintenenceEntryDialogMode"].AddMaintenenceEntry
          });
        }.bind(this)
      };
      var refreshMaintenanceEntriesAction = {
        icon: _mui_icons_material_Refresh__WEBPACK_IMPORTED_MODULE_7___default.a,
        tooltip: 'Refresh Maintenance Entries',
        ariaLabel: 'refresh',
        onClick: function onClick() {
          _newArrowCheck(this, _this7);
          this.setState({
            refreshMaintenenceEntriesEditorMode: _components_refreshMaintenanceEntries__WEBPACK_IMPORTED_MODULE_15__["RefreshMaintenanceEntriesDialogMode"].RefreshMaintenanceEntriesTable
          });
        }.bind(this)
      };
      var now = new Date().valueOf();
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_2___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(MaintenanceEntriesTable, _extends({
        stickyHeader: true,
        tableId: "maintenance-table",
        title: 'Maintenance',
        customActionButtons: [refreshMaintenanceEntriesAction, addMaintenenceEntryAction],
        columns: [{
          property: 'Action',
          title: "",
          type: _framework_src_components_material_table__WEBPACK_IMPORTED_MODULE_12__["ColumnType"].custom,
          customControl: this.renderIcon
        }, {
          property: 'nodeId',
          title: 'Node Name',
          type: _framework_src_components_material_table__WEBPACK_IMPORTED_MODULE_12__["ColumnType"].text
        }, {
          property: 'notifications',
          title: 'Notification',
          width: 50,
          align: 'center',
          type: _framework_src_components_material_table__WEBPACK_IMPORTED_MODULE_12__["ColumnType"].custom,
          customControl: function customControl(_ref) {
            var rowData = _ref.rowData;
            _newArrowCheck(this, _this7);
            return rowData.active && Date.parse(rowData.start).valueOf() <= now && Date.parse(rowData.end).valueOf() >= now && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_4__["FontAwesomeIcon"], {
              icon: _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_3__["faBan"]
            }) || null;
          }.bind(this)
        }, {
          property: 'active',
          title: 'Activation State',
          type: _framework_src_components_material_table__WEBPACK_IMPORTED_MODULE_12__["ColumnType"].boolean,
          labels: {
            'true': 'active',
            'false': 'not active'
          }
        }, {
          property: 'start',
          title: 'Start Date (UTC)',
          type: _framework_src_components_material_table__WEBPACK_IMPORTED_MODULE_12__["ColumnType"].text
        }, {
          property: 'end',
          title: 'End Date (UTC)',
          type: _framework_src_components_material_table__WEBPACK_IMPORTED_MODULE_12__["ColumnType"].text
        }],
        idProperty: 'mId'
      }, this.props.maintenanceEntriesActions, this.props.maintenanceEntriesProperties, {
        asynchronus: true,
        createContextMenu: function (rowData) {
          _newArrowCheck(this, _this7);
          return this.getContextMenu(rowData);
        }.bind(this)
      })), this.state.elsdata && this.state.elsdata != null ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_9__["Dialog"], {
        open: this.state.isDialogOpen
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_9__["DialogTitle"], null, "Event Details"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_9__["DialogContent"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_9__["Card"], {
        style: {
          overflowX: 'auto'
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_9__["CardContent"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("strong", null, "Node Id:"), " ", this.state.elsdata.rowData.nodeId), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("strong", null, "Notifications:"), " ", this.state.elsdata.rowData.notifications), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("strong", null, "Active:"), " ", this.state.elsdata.rowData.active ? 'Active' : 'Not Active'), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("strong", null, "Start:"), " ", this.state.elsdata.rowData.start), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("strong", null, "End:"), " ", this.state.elsdata.rowData.end))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_9__["Button"], {
        style: {
          color: "blue"
        },
        onClick: function () {
          _newArrowCheck(this, _this7);
          this.setState({
            elsdata: null,
            isDialogOpen: false
          });
        }.bind(this)
      }, "Close"))) : null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_components_editMaintenenceEntryDialog__WEBPACK_IMPORTED_MODULE_14__["default"], {
        initialMaintenenceEntry: this.state.maintenenceEntryToEdit,
        mode: this.state.maintenanceEntryEditorMode,
        onClose: this.onCloseEditMaintenenceEntryDialog
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_components_refreshMaintenanceEntries__WEBPACK_IMPORTED_MODULE_15__["default"], {
        mode: this.state.refreshMaintenenceEntriesEditorMode,
        onClose: this.onCloseRefreshMaintenenceEntryDialog
      }));
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      if (!initialSorted) {
        initialSorted = true;
        this.props.maintenanceEntriesActions.onHandleRequestSort('node-id');
      } else {
        this.props.onLoadMaintenanceEntries();
      }
    }
  }]);
}(react__WEBPACK_IMPORTED_MODULE_2___default.a.Component);
var MaintenanceView = Object(_mui_styles_withStyles__WEBPACK_IMPORTED_MODULE_11__["default"])(styles)(Object(_framework_src_flux_connect__WEBPACK_IMPORTED_MODULE_13__["connect"])(mapProps, mapDispatcher)(MaintenenceViewComponent));

/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("./pluginMaintenance.tsx");


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
//# sourceMappingURL=maintenanceApp.js.map