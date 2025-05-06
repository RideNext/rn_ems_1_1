(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("app"), require("vendor"));
	else if(typeof define === 'function' && define.amd)
		define(["app", "vendor"], factory);
	else if(typeof exports === 'object')
		exports["inventoryApp"] = factory(require("app"), require("vendor"));
	else
		root["inventoryApp"] = factory(root["app"], root["vendor"]);
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

/***/ "../../../framework/src/actions/errorActions.ts":
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__("dll-reference app"))("./actions/errorActions.ts");

/***/ }),

/***/ "../../../framework/src/actions/navigationActions.ts":
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__("dll-reference app"))("./actions/navigationActions.ts");

/***/ }),

/***/ "../../../framework/src/components/material-table/index.tsx":
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__("dll-reference app"))("./components/material-table/index.tsx");

/***/ }),

/***/ "../../../framework/src/components/material-table/utilities.ts":
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__("dll-reference app"))("./components/material-table/utilities.ts");

/***/ }),

/***/ "../../../framework/src/components/material-ui/treeView.tsx":
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__("dll-reference app"))("./components/material-ui/treeView.tsx");

/***/ }),

/***/ "../../../framework/src/components/objectDump/index.tsx":
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__("dll-reference app"))("./components/objectDump/index.tsx");

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

/***/ "../../../node_modules/@mui/material/Breadcrumbs/index.js":
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__("dll-reference vendor"))("../../node_modules/@mui/material/Breadcrumbs/index.js");

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

/***/ "../../../node_modules/@mui/material/Link/index.js":
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__("dll-reference vendor"))("../../node_modules/@mui/material/Link/index.js");

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

/***/ "./actions/inventoryDeviceListActions.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BaseAction", function() { return BaseAction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoadAllInventoryDeviceListAction", function() { return LoadAllInventoryDeviceListAction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AllInventoryDeviceListLoadedAction", function() { return AllInventoryDeviceListLoadedAction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadAllInventoryDeviceListAsync", function() { return loadAllInventoryDeviceListAsync; });
/* harmony import */ var core_js_modules_web_dom_iterable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../../node_modules/core-js/modules/web.dom.iterable.js");
/* harmony import */ var core_js_modules_web_dom_iterable__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_iterable__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../../node_modules/regenerator-runtime/runtime.js");
/* harmony import */ var regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _framework_src_flux_action__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../../../framework/src/flux/action.ts");
/* harmony import */ var _services_inventoryService__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./services/inventoryService.ts");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }


var _this2 = undefined;
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator.return && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, catch: function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
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


/**
 * Represents the base action.
 */
var BaseAction = /*#__PURE__*/function (_Action) {
  function BaseAction() {
    _classCallCheck(this, BaseAction);
    return _callSuper(this, BaseAction, arguments);
  }
  _inherits(BaseAction, _Action);
  return _createClass(BaseAction);
}(_framework_src_flux_action__WEBPACK_IMPORTED_MODULE_2__["Action"]);
/**
 * Represents an action causing the store to load all nodes.
 */
var LoadAllInventoryDeviceListAction = /*#__PURE__*/function (_BaseAction) {
  function LoadAllInventoryDeviceListAction() {
    _classCallCheck(this, LoadAllInventoryDeviceListAction);
    return _callSuper(this, LoadAllInventoryDeviceListAction, arguments);
  }
  _inherits(LoadAllInventoryDeviceListAction, _BaseAction);
  return _createClass(LoadAllInventoryDeviceListAction);
}(BaseAction);
/**
 * Represents an action causing the store to update all nodes.
 */
var AllInventoryDeviceListLoadedAction = /*#__PURE__*/function (_BaseAction2) {
  /**
   * Initialize this instance.
   *
   * @param inventoryDeviceList All the distinct nodes from the Inventory  database.
   */
  function AllInventoryDeviceListLoadedAction(inventoryDeviceList, error) {
    var _this;
    _classCallCheck(this, AllInventoryDeviceListLoadedAction);
    _this = _callSuper(this, AllInventoryDeviceListLoadedAction);
    _this.inventoryDeviceList = inventoryDeviceList;
    _this.error = error;
    return _this;
  }
  _inherits(AllInventoryDeviceListLoadedAction, _BaseAction2);
  return _createClass(AllInventoryDeviceListLoadedAction);
}(BaseAction);
/**
 * Represents an asynchronous thunk  action to load all nodes.
 */
var loadAllInventoryDeviceListAsync = function loadAllInventoryDeviceListAsync(dispatch) {
  _newArrowCheck(this, _this2);
  return __awaiter(void 0, void 0, void 0, /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
    var _this3 = this;
    var inventoryDeviceList;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          dispatch(new LoadAllInventoryDeviceListAction());
          _context.next = 3;
          return _services_inventoryService__WEBPACK_IMPORTED_MODULE_3__["inventoryService"].getInventoryDeviceList().then(function (ne) {
            _newArrowCheck(this, _this3);
            return ne;
          }.bind(this));
        case 3:
          _context.t0 = _context.sent;
          if (_context.t0) {
            _context.next = 6;
            break;
          }
          _context.t0 = [];
        case 6:
          inventoryDeviceList = _context.t0;
          return _context.abrupt("return", inventoryDeviceList && dispatch(new AllInventoryDeviceListLoadedAction(inventoryDeviceList)));
        case 8:
        case "end":
          return _context.stop();
      }
    }, _callee, this);
  }));
}.bind(undefined);

/***/ }),

/***/ "./actions/inventoryTreeActions.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BaseAction", function() { return BaseAction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SetBusyAction", function() { return SetBusyAction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SetSearchTextAction", function() { return SetSearchTextAction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UpdateInventoryTreeAction", function() { return UpdateInventoryTreeAction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UpdateSelectedNodeAction", function() { return UpdateSelectedNodeAction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UpdateExpandedNodesAction", function() { return UpdateExpandedNodesAction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setSearchTermAction", function() { return setSearchTermAction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateInventoryTreeAsyncAction", function() { return updateInventoryTreeAsyncAction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectInventoryNodeAsyncAction", function() { return selectInventoryNodeAsyncAction; });
/* harmony import */ var core_js_modules_web_dom_iterable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../../node_modules/core-js/modules/web.dom.iterable.js");
/* harmony import */ var core_js_modules_web_dom_iterable__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_iterable__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../../node_modules/regenerator-runtime/runtime.js");
/* harmony import */ var regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _framework_src_actions_errorActions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../../../framework/src/actions/errorActions.ts");
/* harmony import */ var _framework_src_actions_navigationActions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("../../../framework/src/actions/navigationActions.ts");
/* harmony import */ var _framework_src_flux_action__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("../../../framework/src/flux/action.ts");
/* harmony import */ var _services_inventoryService__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./services/inventoryService.ts");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }


var _this6 = undefined;
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator.return && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, catch: function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
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
 * Represents the base action.
 */
var BaseAction = /*#__PURE__*/function (_Action) {
  function BaseAction() {
    _classCallCheck(this, BaseAction);
    return _callSuper(this, BaseAction, arguments);
  }
  _inherits(BaseAction, _Action);
  return _createClass(BaseAction);
}(_framework_src_flux_action__WEBPACK_IMPORTED_MODULE_4__["Action"]);
var SetBusyAction = /*#__PURE__*/function (_BaseAction) {
  function SetBusyAction() {
    var _this;
    var busy = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
    _classCallCheck(this, SetBusyAction);
    _this = _callSuper(this, SetBusyAction);
    _this.busy = busy;
    return _this;
  }
  _inherits(SetBusyAction, _BaseAction);
  return _createClass(SetBusyAction);
}(BaseAction);
var SetSearchTextAction = /*#__PURE__*/function (_BaseAction2) {
  function SetSearchTextAction() {
    var _this2;
    var searchTerm = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    _classCallCheck(this, SetSearchTextAction);
    _this2 = _callSuper(this, SetSearchTextAction);
    _this2.searchTerm = searchTerm;
    return _this2;
  }
  _inherits(SetSearchTextAction, _BaseAction2);
  return _createClass(SetSearchTextAction);
}(BaseAction);
var UpdateInventoryTreeAction = /*#__PURE__*/function (_BaseAction3) {
  function UpdateInventoryTreeAction(rootNode) {
    var _this3;
    _classCallCheck(this, UpdateInventoryTreeAction);
    _this3 = _callSuper(this, UpdateInventoryTreeAction);
    _this3.rootNode = rootNode;
    return _this3;
  }
  _inherits(UpdateInventoryTreeAction, _BaseAction3);
  return _createClass(UpdateInventoryTreeAction);
}(BaseAction);
var UpdateSelectedNodeAction = /*#__PURE__*/function (_BaseAction4) {
  function UpdateSelectedNodeAction(selectedNode) {
    var _this4;
    _classCallCheck(this, UpdateSelectedNodeAction);
    _this4 = _callSuper(this, UpdateSelectedNodeAction);
    _this4.selectedNode = selectedNode;
    return _this4;
  }
  _inherits(UpdateSelectedNodeAction, _BaseAction4);
  return _createClass(UpdateSelectedNodeAction);
}(BaseAction);
var UpdateExpandedNodesAction = /*#__PURE__*/function (_BaseAction5) {
  function UpdateExpandedNodesAction(expandedNodes) {
    var _this5;
    _classCallCheck(this, UpdateExpandedNodesAction);
    _this5 = _callSuper(this, UpdateExpandedNodesAction);
    _this5.expandedNodes = expandedNodes;
    return _this5;
  }
  _inherits(UpdateExpandedNodesAction, _BaseAction5);
  return _createClass(UpdateExpandedNodesAction);
}(BaseAction);
var setSearchTermAction = function setSearchTermAction(searchTerm) {
  var _this7 = this;
  _newArrowCheck(this, _this6);
  return function (dispatch) {
    _newArrowCheck(this, _this7);
    dispatch(new SetSearchTextAction(searchTerm));
  }.bind(this);
}.bind(undefined);
var updateInventoryTreeAsyncAction = function updateInventoryTreeAsyncAction(mountId, searchTerm) {
  var _this8 = this;
  _newArrowCheck(this, _this6);
  return function (dispatch) {
    _newArrowCheck(this, _this8);
    return __awaiter(void 0, void 0, void 0, /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
      var result;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            dispatch(new SetBusyAction(true));
            dispatch(new SetSearchTextAction(searchTerm));
            _context.prev = 2;
            _context.next = 5;
            return _services_inventoryService__WEBPACK_IMPORTED_MODULE_5__["inventoryService"].getInventoryTree(mountId, searchTerm);
          case 5:
            result = _context.sent;
            if (!result) {
              dispatch(new _framework_src_actions_errorActions__WEBPACK_IMPORTED_MODULE_2__["AddErrorInfoAction"]({
                title: 'Error',
                message: "Could not load inventory tree for [".concat(mountId, "]. Please check you connection to the server and try later.")
              }));
              dispatch(new _framework_src_actions_navigationActions__WEBPACK_IMPORTED_MODULE_3__["NavigateToApplication"]('inventory'));
            } else {
              dispatch(new UpdateInventoryTreeAction(result));
            }
            _context.next = 12;
            break;
          case 9:
            _context.prev = 9;
            _context.t0 = _context["catch"](2);
            throw new Error('Could not load inventory tree from server.');
          case 12:
            _context.prev = 12;
            dispatch(new SetBusyAction(false));
            return _context.finish(12);
          case 15:
          case "end":
            return _context.stop();
        }
      }, _callee, null, [[2, 9, 12, 15]]);
    }));
  }.bind(this);
}.bind(undefined);
var selectInventoryNodeAsyncAction = function selectInventoryNodeAsyncAction(nodeId) {
  var _this9 = this;
  _newArrowCheck(this, _this6);
  return function (dispatch) {
    _newArrowCheck(this, _this9);
    return __awaiter(void 0, void 0, void 0, /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
      var result;
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            dispatch(new SetBusyAction(true));
            _context2.prev = 1;
            _context2.next = 4;
            return _services_inventoryService__WEBPACK_IMPORTED_MODULE_5__["inventoryService"].getInventoryEntry(nodeId);
          case 4:
            result = _context2.sent;
            if (result) {
              _context2.next = 7;
              break;
            }
            throw new Error('Could not load inventory tree from server.');
          case 7:
            dispatch(new UpdateSelectedNodeAction(result));
            _context2.next = 13;
            break;
          case 10:
            _context2.prev = 10;
            _context2.t0 = _context2["catch"](1);
            throw new Error('Could not load inventory tree from server.');
          case 13:
            _context2.prev = 13;
            dispatch(new SetBusyAction(false));
            return _context2.finish(13);
          case 16:
          case "end":
            return _context2.stop();
        }
      }, _callee2, null, [[1, 10, 13, 16]]);
    }));
  }.bind(this);
}.bind(undefined);

/***/ }),

/***/ "./actions/panelActions.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SetPanelAction", function() { return SetPanelAction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setPanelAction", function() { return setPanelAction; });
/* harmony import */ var _framework_src_flux_action__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../../framework/src/flux/action.ts");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _this2 = undefined;
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
 * Copyright (C) 2020 highstreet technologies GmbH Intellectual Property. All rights reserved.
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

var SetPanelAction = /*#__PURE__*/function (_Action) {
  function SetPanelAction(panelId) {
    var _this;
    _classCallCheck(this, SetPanelAction);
    _this = _callSuper(this, SetPanelAction);
    _this.panelId = panelId;
    return _this;
  }
  _inherits(SetPanelAction, _Action);
  return _createClass(SetPanelAction);
}(_framework_src_flux_action__WEBPACK_IMPORTED_MODULE_0__["Action"]);
var setPanelAction = function setPanelAction(panelId) {
  _newArrowCheck(this, _this2);
  return new SetPanelAction(panelId);
}.bind(undefined);

/***/ }),

/***/ "./assets/icons/inventoryAppIcon.svg":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "./images/inventoryAppIcon.svg";

/***/ }),

/***/ "./components/refreshInventoryDialog.tsx":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RefreshInventoryDialogMode", function() { return RefreshInventoryDialogMode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RefreshInventoryDialog", function() { return RefreshInventoryDialog; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _mui_material_Button__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../../node_modules/@mui/material/Button/index.js");
/* harmony import */ var _mui_material_Dialog__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../../../node_modules/@mui/material/Dialog/index.js");
/* harmony import */ var _mui_material_DialogActions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("../../../node_modules/@mui/material/DialogActions/index.js");
/* harmony import */ var _mui_material_DialogContent__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("../../../node_modules/@mui/material/DialogContent/index.js");
/* harmony import */ var _mui_material_DialogContentText__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("../../../node_modules/@mui/material/DialogContentText/index.js");
/* harmony import */ var _mui_material_DialogTitle__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("../../../node_modules/@mui/material/DialogTitle/index.js");
/* harmony import */ var _framework_src_flux_connect__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("../../../framework/src/flux/connect.tsx");
/* harmony import */ var _handlers_inventoryElementsHandler__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./handlers/inventoryElementsHandler.ts");
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









var RefreshInventoryDialogMode;
(function (RefreshInventoryDialogMode) {
  RefreshInventoryDialogMode["None"] = "none";
  RefreshInventoryDialogMode["RefreshInventoryTable"] = "RefreshInventoryTable";
})(RefreshInventoryDialogMode || (RefreshInventoryDialogMode = {}));
var mapDispatch = function mapDispatch(dispatcher) {
  var _this2 = this;
  _newArrowCheck(this, _this);
  return {
    refreshInventory: function refreshInventory() {
      _newArrowCheck(this, _this2);
      return dispatcher.dispatch(_handlers_inventoryElementsHandler__WEBPACK_IMPORTED_MODULE_8__["inventoryElementsReloadAction"]);
    }.bind(this)
  };
}.bind(undefined);
var settings = _defineProperty(_defineProperty({}, RefreshInventoryDialogMode.None, {
  dialogTitle: '',
  dialogDescription: '',
  applyButtonText: '',
  cancelButtonText: '',
  enableMountIdEditor: false,
  enableUsernameEditor: false,
  enableExtendedEditor: false
}), RefreshInventoryDialogMode.RefreshInventoryTable, {
  dialogTitle: 'Do you want to refresh the Inventory table?',
  dialogDescription: '',
  applyButtonText: 'Yes',
  cancelButtonText: 'Cancel',
  enableMountIdEditor: true,
  enableUsernameEditor: true,
  enableExtendedEditor: true
});
var RefreshInventoryDialogComponent = /*#__PURE__*/function (_React$Component) {
  function RefreshInventoryDialogComponent() {
    var _this4 = this;
    var _this3;
    _classCallCheck(this, RefreshInventoryDialogComponent);
    _this3 = _callSuper(this, RefreshInventoryDialogComponent, arguments);
    _this3.onRefresh = function () {
      _newArrowCheck(this, _this4);
      _this3.props.refreshInventory();
      _this3.props.onClose();
    }.bind(this);
    _this3.onCancel = function () {
      _newArrowCheck(this, _this4);
      _this3.props.onClose();
    }.bind(this);
    return _this3;
  }
  _inherits(RefreshInventoryDialogComponent, _React$Component);
  return _createClass(RefreshInventoryDialogComponent, [{
    key: "render",
    value: function render() {
      var _this5 = this;
      var setting = settings[this.props.mode];
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_mui_material_Dialog__WEBPACK_IMPORTED_MODULE_2__["default"], {
        open: this.props.mode !== RefreshInventoryDialogMode.None
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
var RefreshInventoryDialog = Object(_framework_src_flux_connect__WEBPACK_IMPORTED_MODULE_7__["connect"])(undefined, mapDispatch)(RefreshInventoryDialogComponent);
/* harmony default export */ __webpack_exports__["default"] = (RefreshInventoryDialog);

/***/ }),

/***/ "./handlers/inventoryAppRootHandler.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "inventoryAppRootHandler", function() { return inventoryAppRootHandler; });
/* harmony import */ var _framework_src_flux_middleware__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../../framework/src/flux/middleware.ts");
/* harmony import */ var _inventoryDeviceListActionHandler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./handlers/inventoryDeviceListActionHandler.ts");
/* harmony import */ var _inventoryElementsHandler__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./handlers/inventoryElementsHandler.ts");
/* harmony import */ var _inventoryTreeHandler__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./handlers/inventoryTreeHandler.ts");
/* harmony import */ var _panelHandler__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./handlers/panelHandler.ts");
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
  inventoryTree: _inventoryTreeHandler__WEBPACK_IMPORTED_MODULE_3__["inventoryTreeHandler"],
  currentOpenPanel: _panelHandler__WEBPACK_IMPORTED_MODULE_4__["currentOpenPanelHandler"],
  inventoryElements: _inventoryElementsHandler__WEBPACK_IMPORTED_MODULE_2__["inventoryElementsActionHandler"],
  inventoryDeviceList: _inventoryDeviceListActionHandler__WEBPACK_IMPORTED_MODULE_1__["inventoryDeviceListActionHandler"]
};
var inventoryAppRootHandler = Object(_framework_src_flux_middleware__WEBPACK_IMPORTED_MODULE_0__["combineActionHandler"])(actionHandlers);
/* harmony default export */ __webpack_exports__["default"] = (inventoryAppRootHandler);

/***/ }),

/***/ "./handlers/inventoryDeviceListActionHandler.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "inventoryDeviceListActionHandler", function() { return inventoryDeviceListActionHandler; });
/* harmony import */ var _actions_inventoryDeviceListActions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./actions/inventoryDeviceListActions.ts");
var _this = undefined;
function _newArrowCheck(n, r) { if (n !== r) throw new TypeError("Cannot instantiate an arrow function"); }

var inventoryDeviceListListStateInit = {
  inventoryDeviceList: [],
  busy: false
};
var inventoryDeviceListActionHandler = function inventoryDeviceListActionHandler() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : inventoryDeviceListListStateInit;
  var action = arguments.length > 1 ? arguments[1] : undefined;
  _newArrowCheck(this, _this);
  if (action instanceof _actions_inventoryDeviceListActions__WEBPACK_IMPORTED_MODULE_0__["LoadAllInventoryDeviceListAction"]) {
    state = Object.assign(Object.assign({}, state), {
      busy: true
    });
  } else if (action instanceof _actions_inventoryDeviceListActions__WEBPACK_IMPORTED_MODULE_0__["AllInventoryDeviceListLoadedAction"]) {
    if (!action.error && action.inventoryDeviceList) {
      state = Object.assign(Object.assign({}, state), {
        inventoryDeviceList: action.inventoryDeviceList,
        busy: false
      });
    } else {
      state = Object.assign(Object.assign({}, state), {
        busy: false
      });
    }
  }
  return state;
}.bind(undefined);

/***/ }),

/***/ "./handlers/inventoryElementsHandler.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "inventoryElementsActionHandler", function() { return inventoryElementsActionHandler; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createInventoryElementsActions", function() { return createInventoryElementsActions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createInventoryElementsProperties", function() { return createInventoryElementsProperties; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "inventoryElementsReloadAction", function() { return inventoryElementsReloadAction; });
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
var inventoryElementsSearchHandler = Object(_framework_src_utilities_elasticSearch__WEBPACK_IMPORTED_MODULE_1__["createSearchDataHandler"])('inventory');
var _createExternal = Object(_framework_src_components_material_table_utilities__WEBPACK_IMPORTED_MODULE_0__["createExternal"])(inventoryElementsSearchHandler, function (appState) {
    _newArrowCheck(this, _this);
    return appState.inventory.inventoryElements;
  }.bind(undefined)),
  inventoryElementsActionHandler = _createExternal.actionHandler,
  createInventoryElementsActions = _createExternal.createActions,
  createInventoryElementsProperties = _createExternal.createProperties,
  inventoryElementsReloadAction = _createExternal.reloadAction;


/***/ }),

/***/ "./handlers/inventoryTreeHandler.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "inventoryTreeHandler", function() { return inventoryTreeHandler; });
/* harmony import */ var core_js_modules_web_dom_iterable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../../node_modules/core-js/modules/web.dom.iterable.js");
/* harmony import */ var core_js_modules_web_dom_iterable__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_iterable__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _actions_inventoryTreeActions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./actions/inventoryTreeActions.ts");

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

var initialState = {
  isBusy: false,
  rootNodes: [],
  searchTerm: '',
  selectedNode: undefined,
  expandedItems: []
};
var _getTreeDataFromInvetoryTreeNode = function getTreeDataFromInvetoryTreeNode(node) {
  var _this2 = this;
  _newArrowCheck(this, _this);
  return Object.keys(node).reduce(function (acc, key) {
    _newArrowCheck(this, _this2);
    var cur = node[key];
    acc.push({
      isMatch: cur.isMatch,
      content: cur.label || key,
      value: key,
      children: cur.children && _getTreeDataFromInvetoryTreeNode(cur.children)
    });
    return acc;
  }.bind(this), []);
}.bind(undefined);
var inventoryTreeHandler = function inventoryTreeHandler() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;
  _newArrowCheck(this, _this);
  if (action instanceof _actions_inventoryTreeActions__WEBPACK_IMPORTED_MODULE_1__["SetBusyAction"]) {
    state = Object.assign(Object.assign({}, state), {
      isBusy: action.busy
    });
  } else if (action instanceof _actions_inventoryTreeActions__WEBPACK_IMPORTED_MODULE_1__["SetSearchTextAction"]) {
    state = Object.assign(Object.assign({}, state), {
      searchTerm: action.searchTerm
    });
  } else if (action instanceof _actions_inventoryTreeActions__WEBPACK_IMPORTED_MODULE_1__["UpdateInventoryTreeAction"]) {
    var rootNodes = _getTreeDataFromInvetoryTreeNode(action.rootNode);
    state = Object.assign(Object.assign({}, state), {
      rootNodes: rootNodes,
      expandedItems: [],
      selectedNode: undefined
    });
  } else if (action instanceof _actions_inventoryTreeActions__WEBPACK_IMPORTED_MODULE_1__["UpdateSelectedNodeAction"]) {
    state = Object.assign(Object.assign({}, state), {
      selectedNode: action.selectedNode
    });
  } else if (action instanceof _actions_inventoryTreeActions__WEBPACK_IMPORTED_MODULE_1__["UpdateExpandedNodesAction"]) {
    state = Object.assign(Object.assign({}, state), {
      expandedItems: action.expandedNodes || []
    });
  }
  return state;
}.bind(undefined);

/***/ }),

/***/ "./handlers/panelHandler.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "currentOpenPanelHandler", function() { return currentOpenPanelHandler; });
/* harmony import */ var _actions_panelActions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./actions/panelActions.ts");
var _this = undefined;
function _newArrowCheck(n, r) { if (n !== r) throw new TypeError("Cannot instantiate an arrow function"); }
/***
 * ################################################################################################
 * #                                                                                              #
 * #   Copyright (C)  [2019]  [RideNext Software Solutions Pvt Ltd]. All rights  reserved         #
 * #                                                                                              #
 * ################################################################################################
****/

var currentOpenPanelHandler = function currentOpenPanelHandler() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var action = arguments.length > 1 ? arguments[1] : undefined;
  _newArrowCheck(this, _this);
  if (action instanceof _actions_panelActions__WEBPACK_IMPORTED_MODULE_0__["SetPanelAction"]) {
    state = action.panelId;
  }
  return state;
}.bind(undefined);

/***/ }),

/***/ "./pluginInventory.tsx":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "register", function() { return register; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../../node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var _framework_src_flux_connect__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../../../framework/src/flux/connect.tsx");
/* harmony import */ var _framework_src_services_applicationManager__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("../../../framework/src/services/applicationManager.ts");
/* harmony import */ var _actions_panelActions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./actions/panelActions.ts");
/* harmony import */ var _handlers_inventoryAppRootHandler__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./handlers/inventoryAppRootHandler.ts");
/* harmony import */ var _handlers_inventoryElementsHandler__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./handlers/inventoryElementsHandler.ts");
/* harmony import */ var _views_dashboard__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./views/dashboard.tsx");
/* harmony import */ var _views_treeview__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./views/treeview.tsx");
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









var appIcon = __webpack_require__("./assets/icons/inventoryAppIcon.svg"); // select app icon
var currentMountId = undefined;
var mapProps = function mapProps(state) {
  _newArrowCheck(this, _this);
  return {
    inventoryProperties: Object(_handlers_inventoryElementsHandler__WEBPACK_IMPORTED_MODULE_6__["createInventoryElementsProperties"])(state),
    panelId: state.inventory.currentOpenPanel
  };
}.bind(undefined);
var mapDispatch = function mapDispatch(dispatcher) {
  var _this2 = this;
  _newArrowCheck(this, _this);
  return {
    inventoryActions: Object(_handlers_inventoryElementsHandler__WEBPACK_IMPORTED_MODULE_6__["createInventoryElementsActions"])(dispatcher.dispatch, true),
    setCurrentPanel: function setCurrentPanel(panelId) {
      _newArrowCheck(this, _this2);
      return dispatcher.dispatch(new _actions_panelActions__WEBPACK_IMPORTED_MODULE_4__["SetPanelAction"](panelId));
    }.bind(this)
  };
}.bind(undefined);
var InventoryTableApplicationRouteAdapter = Object(_framework_src_flux_connect__WEBPACK_IMPORTED_MODULE_2__["connect"])(mapProps, mapDispatch)(function (props) {
  var _this3 = this;
  _newArrowCheck(this, _this);
  if (currentMountId !== props.match.params.mountId) {
    // route parameter has changed
    currentMountId = props.match.params.mountId || undefined;
    // Hint: This timeout is needed, since it is not recommended to change the state while rendering is in progress !
    window.setTimeout(function () {
      _newArrowCheck(this, _this3);
      if (currentMountId) {
        if (props.panelId) {
          props.setCurrentPanel(props.panelId);
        } else {
          props.setCurrentPanel('Equipment');
        }
        props.inventoryActions.onFilterChanged('nodeId', currentMountId);
        if (!props.inventoryProperties.showFilter) {
          props.inventoryActions.onToggleFilter(false);
        }
        props.inventoryActions.onRefresh();
      }
    }.bind(this));
  }
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_views_dashboard__WEBPACK_IMPORTED_MODULE_7__["default"], null);
}.bind(undefined));
var App = Object(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["withRouter"])(function (props) {
  _newArrowCheck(this, _this);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Switch"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Route"], {
    path: "".concat(props.match.path, "/dashboard/:mountId"),
    component: InventoryTableApplicationRouteAdapter
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Route"], {
    path: "".concat(props.match.path, "/:mountId"),
    component: _views_treeview__WEBPACK_IMPORTED_MODULE_8__["InventoryTreeView"]
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Route"], {
    path: "".concat(props.match.path),
    component: _views_dashboard__WEBPACK_IMPORTED_MODULE_7__["default"]
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Redirect"], {
    to: "".concat(props.match.path)
  }));
}.bind(undefined));
function register() {
  _framework_src_services_applicationManager__WEBPACK_IMPORTED_MODULE_3__["default"].registerApplication({
    name: 'inventory',
    icon: appIcon,
    rootActionHandler: _handlers_inventoryAppRootHandler__WEBPACK_IMPORTED_MODULE_5__["default"],
    rootComponent: App,
    menuEntry: 'Inventory'
  });
}

/***/ }),

/***/ "./services/inventoryService.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "inventoryService", function() { return inventoryService; });
/* harmony import */ var core_js_modules_web_dom_iterable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../../node_modules/core-js/modules/web.dom.iterable.js");
/* harmony import */ var core_js_modules_web_dom_iterable__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_iterable__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../../node_modules/regenerator-runtime/runtime.js");
/* harmony import */ var regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _framework_src_services_restService__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../../../framework/src/services/restService.ts");


function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _newArrowCheck(n, r) { if (n !== r) throw new TypeError("Cannot instantiate an arrow function"); }
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

/**
 * Represents a web api accessor service for all maintenence entries related actions.
 */
var InventoryService = /*#__PURE__*/function () {
  function InventoryService() {
    _classCallCheck(this, InventoryService);
  }
  return _createClass(InventoryService, [{
    key: "getInventoryTree",
    value: function getInventoryTree(mountId) {
      var searchTerm = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
      return __awaiter(this, void 0, void 0, /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        var path, body, inventoryTree;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              //return await getTree(searchTerm);
              path = "/tree/read-inventoryequipment-tree/".concat(mountId);
              body = {
                'query': searchTerm
              };
              _context.next = 4;
              return Object(_framework_src_services_restService__WEBPACK_IMPORTED_MODULE_2__["requestRest"])(path, {
                method: 'POST',
                body: JSON.stringify(body)
              });
            case 4:
              inventoryTree = _context.sent;
              return _context.abrupt("return", inventoryTree && inventoryTree || null);
            case 6:
            case "end":
              return _context.stop();
          }
        }, _callee);
      }));
    }
  }, {
    key: "getInventoryEntry",
    value: function getInventoryEntry(id) {
      return __awaiter(this, void 0, void 0, /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
        var path, body, inventoryTreeElement;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              path = '/rests/operations/data-provider:read-inventory-list';
              body = {
                'data-provider:input': {
                  'filter': [{
                    property: 'id',
                    filtervalue: id
                  }],
                  'sortorder': [],
                  'pagination': {
                    'size': 1,
                    'page': 1
                  }
                }
              };
              _context2.next = 4;
              return Object(_framework_src_services_restService__WEBPACK_IMPORTED_MODULE_2__["requestRest"])(path, {
                method: 'POST',
                body: JSON.stringify(body)
              });
            case 4:
              inventoryTreeElement = _context2.sent;
              return _context2.abrupt("return", inventoryTreeElement && inventoryTreeElement['data-provider:output'] && inventoryTreeElement['data-provider:output'].pagination && inventoryTreeElement['data-provider:output'].pagination.total >= 1 && inventoryTreeElement['data-provider:output'].data && inventoryTreeElement['data-provider:output'].data[0] || undefined);
            case 6:
            case "end":
              return _context2.stop();
          }
        }, _callee2);
      }));
    }
    /**
     * Gets all nodes from the inventory device list.
     */
  }, {
    key: "getInventoryDeviceList",
    value: function getInventoryDeviceList() {
      return __awaiter(this, void 0, void 0, /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
        var _this = this;
        var path, query, result;
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              path = '/rests/operations/data-provider:read-inventory-device-list';
              query = {
                'data-provider:input': {
                  'filter': [],
                  'sortorder': [],
                  'pagination': {
                    'size': 20,
                    'page': 1
                  }
                }
              };
              _context3.next = 4;
              return Object(_framework_src_services_restService__WEBPACK_IMPORTED_MODULE_2__["requestRest"])(path, {
                method: 'POST',
                body: JSON.stringify(query)
              });
            case 4:
              result = _context3.sent;
              return _context3.abrupt("return", result && result['data-provider:output'] && result['data-provider:output'].data && result['data-provider:output'].data.map(function (ne) {
                _newArrowCheck(this, _this);
                return {
                  nodeId: ne
                };
              }.bind(this)) || null);
            case 6:
            case "end":
              return _context3.stop();
          }
        }, _callee3, this);
      }));
    }
  }]);
}();
var inventoryService = new InventoryService();

/***/ }),

/***/ "./views/dashboard.tsx":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Dashboard", function() { return Dashboard; });
/* harmony import */ var core_js_modules_web_dom_iterable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../../node_modules/core-js/modules/web.dom.iterable.js");
/* harmony import */ var core_js_modules_web_dom_iterable__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_iterable__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../../node_modules/regenerator-runtime/runtime.js");
/* harmony import */ var regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("../../../node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var _mui_icons_material_Refresh__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("../../../node_modules/@mui/icons-material/Refresh.js");
/* harmony import */ var _mui_icons_material_Refresh__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_mui_icons_material_Refresh__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("../../../node_modules/@mui/material/index.js");
/* harmony import */ var _framework_src_actions_navigationActions__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("../../../framework/src/actions/navigationActions.ts");
/* harmony import */ var _framework_src_components_material_table__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("../../../framework/src/components/material-table/index.tsx");
/* harmony import */ var _framework_src_flux_connect__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("../../../framework/src/flux/connect.tsx");
/* harmony import */ var _actions_inventoryDeviceListActions__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./actions/inventoryDeviceListActions.ts");
/* harmony import */ var _actions_inventoryTreeActions__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("./actions/inventoryTreeActions.ts");
/* harmony import */ var _actions_panelActions__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("./actions/panelActions.ts");
/* harmony import */ var _components_refreshInventoryDialog__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("./components/refreshInventoryDialog.tsx");
/* harmony import */ var _handlers_inventoryElementsHandler__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__("./handlers/inventoryElementsHandler.ts");
/* harmony import */ var _mui_icons_material_InfoOutlined__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__("../../../node_modules/@mui/icons-material/InfoOutlined.js");
/* harmony import */ var _mui_icons_material_InfoOutlined__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(_mui_icons_material_InfoOutlined__WEBPACK_IMPORTED_MODULE_14__);
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














var InventoryTable = _framework_src_components_material_table__WEBPACK_IMPORTED_MODULE_7__["MaterialTable"];
var mapProps = function mapProps(state) {
  _newArrowCheck(this, _this);
  return {
    panelId: state.inventory.currentOpenPanel,
    inventoryElementsProperties: Object(_handlers_inventoryElementsHandler__WEBPACK_IMPORTED_MODULE_13__["createInventoryElementsProperties"])(state),
    inventoryElements: state.inventory.inventoryElements,
    inventoryDeviceList: state.inventory.inventoryDeviceList.inventoryDeviceList
  };
}.bind(undefined);
var mapDispatch = function mapDispatch(dispatcher) {
  var _this2 = this;
  _newArrowCheck(this, _this);
  return {
    switchActivePanel: function switchActivePanel(panelId) {
      _newArrowCheck(this, _this2);
      dispatcher.dispatch(Object(_actions_panelActions__WEBPACK_IMPORTED_MODULE_11__["setPanelAction"])(panelId));
    }.bind(this),
    inventoryElementsActions: Object(_handlers_inventoryElementsHandler__WEBPACK_IMPORTED_MODULE_13__["createInventoryElementsActions"])(dispatcher.dispatch),
    navigateToApplication: function navigateToApplication(applicationName, path) {
      _newArrowCheck(this, _this2);
      return dispatcher.dispatch(new _framework_src_actions_navigationActions__WEBPACK_IMPORTED_MODULE_6__["NavigateToApplication"](applicationName, path));
    }.bind(this),
    updateInventoryTree: function updateInventoryTree(mountId, searchTerm) {
      _newArrowCheck(this, _this2);
      return dispatcher.dispatch(Object(_actions_inventoryTreeActions__WEBPACK_IMPORTED_MODULE_10__["updateInventoryTreeAsyncAction"])(mountId, searchTerm));
    }.bind(this),
    getAllInventoryDeviceList: function getAllInventoryDeviceList() {
      _newArrowCheck(this, _this2);
      return __awaiter(void 0, void 0, void 0, /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return dispatcher.dispatch(_actions_inventoryDeviceListActions__WEBPACK_IMPORTED_MODULE_9__["loadAllInventoryDeviceListAsync"]);
            case 2:
            case "end":
              return _context.stop();
          }
        }, _callee);
      }));
    }.bind(this)
  };
}.bind(undefined);
var treeViewInitialSorted = true;
var inventoryInitialSorted = true;
var InventoryDeviceListTable = _framework_src_components_material_table__WEBPACK_IMPORTED_MODULE_7__["MaterialTable"];
var DashboardSelectorComponent = /*#__PURE__*/function (_React$Component) {
  function DashboardSelectorComponent(props) {
    var _this4 = this;
    var _this3;
    _classCallCheck(this, DashboardSelectorComponent);
    _this3 = _callSuper(this, DashboardSelectorComponent, [props]);
    _this3.onHandleTabChange = function (event, newValue) {
      _newArrowCheck(this, _this4);
      _this3.onTogglePanel(newValue);
    }.bind(this);
    _this3.onTogglePanel = function (panelId) {
      _newArrowCheck(this, _this4);
      var nextActivePanel = panelId;
      _this3.props.switchActivePanel(nextActivePanel);
      switch (nextActivePanel) {
        case 'Equipment':
          if (!inventoryInitialSorted) {
            _this3.props.inventoryElementsActions.onHandleExplicitRequestSort('nodeId', 'asc');
            inventoryInitialSorted = true;
          } else {
            _this3.props.inventoryElementsActions.onRefresh();
          }
          break;
        case 'TreeView':
          _this3.props.getAllInventoryDeviceList();
          break;
        case null:
          // do nothing if all panels are closed
          break;
        default:
          console.warn('Unknown nextActivePanel [' + nextActivePanel + '] in connectView');
          break;
      }
    }.bind(this);
    _this3.getContextMenu = function (rowData) {
      var _this5 = this;
      _newArrowCheck(this, _this4);
      return [/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_5__["MenuItem"], {
        "aria-label": 'inventory-button',
        onClick: function () {
          _newArrowCheck(this, _this5);
          _this3.props.updateInventoryTree(rowData.nodeId, rowData.uuid);
          _this3.props.navigateToApplication('inventory', rowData.nodeId);
        }.bind(this)
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_5__["Typography"], null, "View in Treeview"))];
    }.bind(this);
    _this3.renderIcon = function (rowData, index) {
      var _this6 = this;
      _newArrowCheck(this, _this4);
      //console.log(rowData)
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("span", {
        style: {},
        onClick: function () {
          _newArrowCheck(this, _this6);
          console.log(rowData);
          _this3.setState({
            elsdata: rowData,
            isDialogOpen: true
          });
        }.bind(this)
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_mui_icons_material_InfoOutlined__WEBPACK_IMPORTED_MODULE_14___default.a, {
        style: {
          color: '#36A9E1'
        }
      }));
    }.bind(this);
    _this3.onCloseRefreshInventoryDialog = function () {
      _newArrowCheck(this, _this4);
      _this3.setState({
        refreshInventoryEditorMode: _components_refreshInventoryDialog__WEBPACK_IMPORTED_MODULE_12__["RefreshInventoryDialogMode"].None
      });
    }.bind(this);
    _this3.state = {
      refreshInventoryEditorMode: _components_refreshInventoryDialog__WEBPACK_IMPORTED_MODULE_12__["RefreshInventoryDialogMode"].None,
      elsdata: null,
      isDialogOpen: false
    };
    return _this3;
  }
  _inherits(DashboardSelectorComponent, _React$Component);
  return _createClass(DashboardSelectorComponent, [{
    key: "render",
    value: function render() {
      var _this7 = this;
      var refreshInventoryAction = {
        icon: _mui_icons_material_Refresh__WEBPACK_IMPORTED_MODULE_4___default.a,
        tooltip: 'Refresh Inventory',
        ariaLabel: 'refresh',
        onClick: function onClick() {
          _newArrowCheck(this, _this7);
          this.setState({
            refreshInventoryEditorMode: _components_refreshInventoryDialog__WEBPACK_IMPORTED_MODULE_12__["RefreshInventoryDialogMode"].RefreshInventoryTable
          });
        }.bind(this)
      };
      var activePanelId = this.props.panelId;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_2___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_5__["AppBar"], {
        enableColorOnDark: true,
        position: "static"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_5__["Tabs"], {
        indicatorColor: "secondary",
        textColor: "inherit",
        value: activePanelId,
        onChange: this.onHandleTabChange,
        "aria-label": "inventory-app-tabs"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_5__["Tab"], {
        label: "Equipment",
        value: "Equipment",
        "aria-label": "equipment-tab"
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_5__["Tab"], {
        label: "Tree View",
        value: "TreeView",
        "aria-label": "treeview-tab"
      }))), activePanelId === 'Equipment' && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_2___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(InventoryTable, _extends({
        stickyHeader: true,
        idProperty: "_id",
        tableId: "inventory-table",
        customActionButtons: [refreshInventoryAction],
        columns: [{
          property: 'icon',
          title: "",
          type: _framework_src_components_material_table__WEBPACK_IMPORTED_MODULE_7__["ColumnType"].custom,
          customControl: this.renderIcon
        }, {
          property: 'nodeId',
          title: 'Node Name'
        }, {
          property: 'manufacturerIdentifier',
          title: 'Manufacturer'
        }, {
          property: 'parentUuid',
          title: 'Parent'
        }, {
          property: 'uuid',
          title: 'Name'
        }, {
          property: 'serial',
          title: 'Serial'
        }, {
          property: 'version',
          title: 'Version'
        }, {
          property: 'date',
          title: 'Date'
        }, {
          property: 'description',
          title: 'Description'
        }, {
          property: 'partTypeId',
          title: 'Part Type Id'
        }, {
          property: 'modelIdentifier',
          title: 'Model Identifier'
        }, {
          property: 'typeName',
          title: 'Type'
        }, {
          property: 'treeLevel',
          title: 'Containment Level'
        }]
      }, this.props.inventoryElementsActions, this.props.inventoryElementsProperties, {
        createContextMenu: function (rowData) {
          _newArrowCheck(this, _this7);
          return this.getContextMenu(rowData);
        }.bind(this)
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_components_refreshInventoryDialog__WEBPACK_IMPORTED_MODULE_12__["default"], {
        mode: this.state.refreshInventoryEditorMode,
        onClose: this.onCloseRefreshInventoryDialog
      }), this.state.elsdata && this.state.elsdata != null ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_5__["Dialog"], {
        open: this.state.isDialogOpen
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_5__["DialogTitle"], null, "Event Details"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_5__["DialogContent"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_5__["Card"], {
        style: {
          overflowX: 'auto'
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_5__["CardContent"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("strong", null, "Node Id:"), " ", this.state.elsdata.rowData.nodeId), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("strong", null, "Manufacturer Identifier:"), " ", this.state.elsdata.rowData.manufacturerIdentifier), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("strong", null, "Parent Uuid:"), " ", this.state.elsdata.rowData.parentUuid), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("strong", null, "Uuid:"), " ", this.state.elsdata.rowData.uuid), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("strong", null, "Serial:"), " ", this.state.elsdata.rowData.serial), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("strong", null, "Version:"), " ", this.state.elsdata.rowData.version), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("strong", null, "Date:"), " ", this.state.elsdata.rowData.date), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("strong", null, "Description:"), " ", this.state.elsdata.rowData.description), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("strong", null, "Part Type Id:"), " ", this.state.elsdata.rowData.partTypeId), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("strong", null, "Model Identifier:"), " ", this.state.elsdata.rowData.modelIdentifier), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("strong", null, "Type Name:"), " ", this.state.elsdata.rowData.typeName), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("strong", null, "Tree Level:"), " ", this.state.elsdata.rowData.treeLevel))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_5__["Button"], {
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
      }, "Close"))) : null), activePanelId === 'TreeView' && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_2___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(InventoryDeviceListTable, {
        stickyHeader: true,
        tableId: "treeview-networkelement-selection-table"
        // defaultSortColumn={'nodeId'} defaultSortOrder="asc"
        ,
        onHandleClick: function (e, row) {
          _newArrowCheck(this, _this7);
          this.props.navigateToApplication('inventory', row.nodeId);
          this.props.updateInventoryTree(row.nodeId, '*');
        }.bind(this),
        rows: this.props.inventoryDeviceList,
        asynchronus: true,
        columns: [{
          property: 'nodeId',
          title: 'Node Name',
          type: _framework_src_components_material_table__WEBPACK_IMPORTED_MODULE_7__["ColumnType"].text
        }],
        idProperty: "nodeId"
      })));
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      if (this.props.panelId === null) {
        //set default tab if none is set
        this.onTogglePanel('Equipment');
      }
    }
  }]);
}(react__WEBPACK_IMPORTED_MODULE_2___default.a.Component);
var Dashboard = Object(react_router_dom__WEBPACK_IMPORTED_MODULE_3__["withRouter"])(Object(_framework_src_flux_connect__WEBPACK_IMPORTED_MODULE_8__["connect"])(mapProps, mapDispatch)(DashboardSelectorComponent));
/* harmony default export */ __webpack_exports__["default"] = (Dashboard);

/***/ }),

/***/ "./views/treeview.tsx":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InventoryTreeView", function() { return InventoryTreeView; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _mui_material_Breadcrumbs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../../node_modules/@mui/material/Breadcrumbs/index.js");
/* harmony import */ var _mui_material_Link__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../../../node_modules/@mui/material/Link/index.js");
/* harmony import */ var _mui_styles_createStyles__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("../../../node_modules/@mui/styles/createStyles/index.js");
/* harmony import */ var _mui_styles_withStyles__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("../../../node_modules/@mui/styles/withStyles/index.js");
/* harmony import */ var _framework_src_components_material_ui_treeView__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("../../../framework/src/components/material-ui/treeView.tsx");
/* harmony import */ var _framework_src_components_objectDump__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("../../../framework/src/components/objectDump/index.tsx");
/* harmony import */ var _framework_src_flux_connect__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("../../../framework/src/flux/connect.tsx");
/* harmony import */ var _actions_inventoryTreeActions__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./actions/inventoryTreeActions.ts");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _this = undefined;
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
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
      flex: '1 0 0%',
      display: 'flex',
      flexDirection: 'row'
    },
    tree: {
      wordWrap: 'break-word',
      minWidth: '250px',
      padding: "0px ".concat(theme.spacing(1))
    },
    details: {
      flex: '5 0 0%',
      padding: "0px ".concat(theme.spacing(1))
    }
  });
}.bind(undefined);
var mapProps = function mapProps(state) {
  _newArrowCheck(this, _this);
  return {
    isBusy: state.inventory.inventoryTree.isBusy,
    rootNodes: state.inventory.inventoryTree.rootNodes,
    searchTerm: state.inventory.inventoryTree.searchTerm,
    selectedNode: state.inventory.inventoryTree.selectedNode,
    expendedItems: state.inventory.inventoryTree.expandedItems
  };
}.bind(undefined);
var mapDispatch = function mapDispatch(dispatcher) {
  var _this2 = this;
  _newArrowCheck(this, _this);
  return {
    updateExpendedNodes: function updateExpendedNodes(expendedNodes) {
      _newArrowCheck(this, _this2);
      return dispatcher.dispatch(new _actions_inventoryTreeActions__WEBPACK_IMPORTED_MODULE_8__["UpdateExpandedNodesAction"](expendedNodes));
    }.bind(this),
    updateInventoryTree: function updateInventoryTree(mountId, searchTerm) {
      _newArrowCheck(this, _this2);
      return dispatcher.dispatch(Object(_actions_inventoryTreeActions__WEBPACK_IMPORTED_MODULE_8__["updateInventoryTreeAsyncAction"])(mountId, searchTerm));
    }.bind(this),
    selectTreeNode: function selectTreeNode(nodeId) {
      _newArrowCheck(this, _this2);
      return nodeId ? dispatcher.dispatch(Object(_actions_inventoryTreeActions__WEBPACK_IMPORTED_MODULE_8__["selectInventoryNodeAsyncAction"])(nodeId)) : dispatcher.dispatch(new _actions_inventoryTreeActions__WEBPACK_IMPORTED_MODULE_8__["UpdateSelectedNodeAction"](undefined));
    }.bind(this),
    setSearchTerm: function setSearchTerm(searchTerm) {
      _newArrowCheck(this, _this2);
      return dispatcher.dispatch(Object(_actions_inventoryTreeActions__WEBPACK_IMPORTED_MODULE_8__["setSearchTermAction"])(searchTerm));
    }.bind(this)
  };
}.bind(undefined);
var propsChache = Symbol('PropsCache');
var InventoryTree = _framework_src_components_material_ui_treeView__WEBPACK_IMPORTED_MODULE_5__["TreeView"];
var DashboardComponent = /*#__PURE__*/function (_React$Component) {
  function DashboardComponent(props) {
    var _this3;
    _classCallCheck(this, DashboardComponent);
    _this3 = _callSuper(this, DashboardComponent, [props]);
    _this3.state = _defineProperty(_defineProperty({}, propsChache, {}), "rootNodes", []);
    return _this3;
  }
  _inherits(DashboardComponent, _React$Component);
  return _createClass(DashboardComponent, [{
    key: "render",
    value: function render() {
      var _this4 = this;
      var _this$props = this.props,
        classes = _this$props.classes,
        updateInventoryTree = _this$props.updateInventoryTree,
        updateExpendedNodes = _this$props.updateExpendedNodes,
        expendedItems = _this$props.expendedItems,
        selectedNode = _this$props.selectedNode,
        selectTreeNode = _this$props.selectTreeNode,
        searchTerm = _this$props.searchTerm,
        mountId = _this$props.match.params.mountId;
      var scrollbar = {
        overflow: 'auto',
        paddingRight: '20px'
      };
      var filteredDashboardPath = "/inventory/dashboard/".concat(this.props.match.params.mountId);
      var basePath = "/inventory/".concat(this.props.match.params.mountId);
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        style: scrollbar
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_mui_material_Breadcrumbs__WEBPACK_IMPORTED_MODULE_1__["default"], {
        "aria-label": "breadcrumbs"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_mui_material_Link__WEBPACK_IMPORTED_MODULE_2__["default"], {
        underline: "hover",
        color: "inherit",
        href: "#",
        "aria-label": "back-breadcrumb",
        onClick: function (event) {
          _newArrowCheck(this, _this4);
          event.preventDefault();
          this.props.history.push(filteredDashboardPath);
        }.bind(this)
      }, "Back"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_mui_material_Link__WEBPACK_IMPORTED_MODULE_2__["default"], {
        underline: "hover",
        color: "inherit",
        href: "#",
        "aria-label": this.props.match.params.mountId + '-breadcrumb',
        onClick: function (event) {
          _newArrowCheck(this, _this4);
          event.preventDefault();
          this.props.history.push(basePath);
        }.bind(this)
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, this.props.match.params.mountId)))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        style: scrollbar,
        className: classes.root
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(InventoryTree, {
        className: classes.tree,
        items: this.state.rootNodes,
        enableSearchBar: true,
        initialSearchTerm: searchTerm,
        searchMode: _framework_src_components_material_ui_treeView__WEBPACK_IMPORTED_MODULE_5__["SearchMode"].OnEnter,
        searchTerm: searchTerm
        // eslint-disable-next-line @typescript-eslint/no-shadow
        ,
        onSearch: function (searchTerm) {
          _newArrowCheck(this, _this4);
          return updateInventoryTree(mountId, searchTerm);
        }.bind(this),
        expandedItems: expendedItems,
        onFolderClick: function (item) {
          _newArrowCheck(this, _this4);
          var indexOfItemToToggle = expendedItems.indexOf(item);
          if (indexOfItemToToggle === -1) {
            updateExpendedNodes([].concat(_toConsumableArray(expendedItems), [item]));
          } else {
            updateExpendedNodes([].concat(_toConsumableArray(expendedItems.slice(0, indexOfItemToToggle)), _toConsumableArray(expendedItems.slice(indexOfItemToToggle + 1))));
          }
        }.bind(this),
        onItemClick: function (elm) {
          _newArrowCheck(this, _this4);
          return selectTreeNode(elm.value);
        }.bind(this)
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: classes.details
      }, selectedNode && Object(_framework_src_components_objectDump__WEBPACK_IMPORTED_MODULE_6__["renderObject"])(selectedNode, 'tree-view') || null)));
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.props.setSearchTerm('*');
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(props, state) {
      if (state[propsChache].rootNodes != props.rootNodes) {
        // eslint-disable-next-line no-param-reassign
        state = Object.assign(Object.assign({}, state), {
          rootNodes: props.rootNodes
        });
      }
      return state;
    }
  }]);
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);
var InventoryTreeView = Object(_framework_src_flux_connect__WEBPACK_IMPORTED_MODULE_7__["connect"])(mapProps, mapDispatch)(Object(_mui_styles_withStyles__WEBPACK_IMPORTED_MODULE_4__["default"])(styles)(DashboardComponent));
/* harmony default export */ __webpack_exports__["default"] = (InventoryTreeView);

/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("./pluginInventory.tsx");


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
//# sourceMappingURL=inventoryApp.js.map