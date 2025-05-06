(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("app"), require("vendor"));
	else if(typeof define === 'function' && define.amd)
		define(["app", "vendor"], factory);
	else if(typeof exports === 'object')
		exports["configurationApp"] = factory(require("app"), require("vendor"));
	else
		root["configurationApp"] = factory(root["app"], root["vendor"]);
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

/***/ "../../../framework/src/components/material-ui/loader.tsx":
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__("dll-reference app"))("./components/material-ui/loader.tsx");

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

/***/ "../../../framework/src/services/storeService.ts":
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__("dll-reference app"))("./services/storeService.ts");

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

/***/ "../../../node_modules/@emotion/is-prop-valid/dist/emotion-is-prop-valid.esm.js":
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__("dll-reference vendor"))("../../node_modules/@emotion/is-prop-valid/dist/emotion-is-prop-valid.esm.js");

/***/ }),

/***/ "../../../node_modules/@fortawesome/free-solid-svg-icons/faAdjust.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, '__esModule', { value: true });
var prefix = 'fas';
var iconName = 'adjust';
var width = 512;
var height = 512;
var ligatures = [];
var unicode = 'f042';
var svgPathData = 'M8 256c0 136.966 111.033 248 248 248s248-111.034 248-248S392.966 8 256 8 8 119.033 8 256zm248 184V72c101.705 0 184 82.311 184 184 0 101.705-82.311 184-184 184z';

exports.definition = {
  prefix: prefix,
  iconName: iconName,
  icon: [
    width,
    height,
    ligatures,
    unicode,
    svgPathData
  ]};

exports.faAdjust = exports.definition;
exports.prefix = prefix;
exports.iconName = iconName;
exports.width = width;
exports.height = height;
exports.ligatures = ligatures;
exports.unicode = unicode;
exports.svgPathData = svgPathData;

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

/***/ "../../../node_modules/@mui/icons-material/ArrowBack.js":
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
  d: "M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"
}), 'ArrowBack');
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

/***/ "../../../node_modules/@mui/icons-material/ExpandMore.js":
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__("dll-reference app"))("../../node_modules/@mui/icons-material/ExpandMore.js");

/***/ }),

/***/ "../../../node_modules/@mui/icons-material/PostAdd.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__("../../../node_modules/@babel/runtime/helpers/interopRequireDefault.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _createSvgIcon = _interopRequireDefault(__webpack_require__("../../../node_modules/@mui/icons-material/utils/createSvgIcon.js"));
var _jsxRuntime = __webpack_require__("../../../node_modules/react/jsx-runtime.js");
var _default = (0, _createSvgIcon.default)([/*#__PURE__*/(0, _jsxRuntime.jsx)("path", {
  d: "M17 19.22H5V7h7V5H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-7h-2v7.22z"
}, "0"), /*#__PURE__*/(0, _jsxRuntime.jsx)("path", {
  d: "M19 2h-2v3h-3c.01.01 0 2 0 2h3v2.99c.01.01 2 0 2 0V7h3V5h-3V2zM7 9h8v2H7zm0 3v2h8v-2h-3zm0 3h8v2H7z"
}, "1")], 'PostAdd');
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

/***/ "../../../node_modules/@mui/icons-material/Save.js":
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
  d: "M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z"
}), 'Save');
exports.default = _default;

/***/ }),

/***/ "../../../node_modules/@mui/icons-material/utils/createSvgIcon.js":
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__("dll-reference app"))("../../node_modules/@mui/icons-material/utils/createSvgIcon.js");

/***/ }),

/***/ "../../../node_modules/@mui/material/Accordion/index.js":
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__("dll-reference app"))("../../node_modules/@mui/material/Accordion/index.js");

/***/ }),

/***/ "../../../node_modules/@mui/material/AccordionDetails/index.js":
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__("dll-reference app"))("../../node_modules/@mui/material/AccordionDetails/index.js");

/***/ }),

/***/ "../../../node_modules/@mui/material/AccordionSummary/index.js":
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__("dll-reference app"))("../../node_modules/@mui/material/AccordionSummary/index.js");

/***/ }),

/***/ "../../../node_modules/@mui/material/Breadcrumbs/index.js":
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__("dll-reference vendor"))("../../node_modules/@mui/material/Breadcrumbs/index.js");

/***/ }),

/***/ "../../../node_modules/@mui/material/Button/index.js":
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__("dll-reference app"))("../../node_modules/@mui/material/Button/index.js");

/***/ }),

/***/ "../../../node_modules/@mui/material/Chip/index.js":
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__("dll-reference vendor"))("../../node_modules/@mui/material/Chip/index.js");

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

/***/ "../../../node_modules/@mui/material/FormHelperText/index.js":
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__("dll-reference vendor"))("../../node_modules/@mui/material/FormHelperText/index.js");

/***/ }),

/***/ "../../../node_modules/@mui/material/IconButton/index.js":
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__("dll-reference app"))("../../node_modules/@mui/material/IconButton/index.js");

/***/ }),

/***/ "../../../node_modules/@mui/material/Input/index.js":
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__("dll-reference app"))("../../node_modules/@mui/material/Input/index.js");

/***/ }),

/***/ "../../../node_modules/@mui/material/InputAdornment/index.js":
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__("dll-reference vendor"))("../../node_modules/@mui/material/InputAdornment/index.js");

/***/ }),

/***/ "../../../node_modules/@mui/material/InputLabel/index.js":
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__("dll-reference app"))("../../node_modules/@mui/material/InputLabel/index.js");

/***/ }),

/***/ "../../../node_modules/@mui/material/Link/index.js":
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__("dll-reference vendor"))("../../node_modules/@mui/material/Link/index.js");

/***/ }),

/***/ "../../../node_modules/@mui/material/MenuItem/index.js":
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__("dll-reference app"))("../../node_modules/@mui/material/MenuItem/index.js");

/***/ }),

/***/ "../../../node_modules/@mui/material/Select/index.js":
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__("dll-reference vendor"))("../../node_modules/@mui/material/Select/index.js");

/***/ }),

/***/ "../../../node_modules/@mui/material/Tooltip/index.js":
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__("dll-reference app"))("../../node_modules/@mui/material/Tooltip/index.js");

/***/ }),

/***/ "../../../node_modules/@mui/material/Typography/index.js":
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__("dll-reference app"))("../../node_modules/@mui/material/Typography/index.js");

/***/ }),

/***/ "../../../node_modules/@mui/material/index.js":
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__("dll-reference app"))("../../node_modules/@mui/material/index.js");

/***/ }),

/***/ "../../../node_modules/@mui/styles/createStyles/index.js":
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__("dll-reference app"))("../../node_modules/@mui/styles/createStyles/index.js");

/***/ }),

/***/ "../../../node_modules/@mui/styles/makeStyles/index.js":
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__("dll-reference app"))("../../node_modules/@mui/styles/makeStyles/index.js");

/***/ }),

/***/ "../../../node_modules/@mui/styles/withStyles/index.js":
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__("dll-reference app"))("../../node_modules/@mui/styles/withStyles/index.js");

/***/ }),

/***/ "../../../node_modules/core-js/modules/web.dom.iterable.js":
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__("dll-reference app"))("../../node_modules/core-js/modules/web.dom.iterable.js");

/***/ }),

/***/ "../../../node_modules/material-ui-confirm/dist/material-ui-confirm.esm.js":
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__("dll-reference app"))("../../node_modules/material-ui-confirm/dist/material-ui-confirm.esm.js");

/***/ }),

/***/ "../../../node_modules/process/browser.js":
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__("dll-reference app"))("../../node_modules/process/browser.js");

/***/ }),

/***/ "../../../node_modules/react-loader-spinner/dist/module.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Audio", function() { return $dcdd04c60cd78d69$export$153755f98d9861de; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BallTriangle", function() { return $e035d01ad1d05b44$export$68949ad0373623af; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Bars", function() { return $7dd1b251b360e95a$export$fbc7d6f7dd821b47; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Circles", function() { return $29b6b1f956162f74$export$765808835a2dc0a2; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CirclesWithBar", function() { return $12bd062f0f060b07$export$17c11650828d97e; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Grid", function() { return $b438e21e66fce243$export$ef2184bd89960b14; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Hearts", function() { return $88eb2f870dd9f437$export$2da2f0c7403af3ce; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InfinitySpin", function() { return $ad60b992c945fdb5$export$8009d4483dfda42; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LineWave", function() { return $05da46d92e4baf0c$export$d2101d81f63866ab; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MutatingDots", function() { return $05cab5f4cf092036$export$64ea884904791f4; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Oval", function() { return $a5fa864d4dd36deb$export$67ad50c48ca3ede4; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Puff", function() { return $8a2963a7161a08e2$export$83d2259ec538613b; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RevolvingDot", function() { return $f6f65ef73d86a35a$export$8e22e563e5362f75; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Rings", function() { return $0da8ebf0340870f3$export$fdd9e2f491a77de7; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RotatingSquare", function() { return $30f4fc5ff137b595$export$bb511942ded86554; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RotatingLines", function() { return $5819da83a926266a$export$d20df8773b6b77b5; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TailSpin", function() { return $56d89154a59e79d3$export$f8e5ae7506d65b32; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ThreeCircles", function() { return $5cff71254109409f$export$e21573137ccb7f5d; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ThreeDots", function() { return $f0c3e3bb3e76d210$export$4bf83b24a11cff0b; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Triangle", function() { return $afa12dd3e98f740f$export$5a465592bfe74b48; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Watch", function() { return $e3e50827b57d879a$export$4c68f1a79f88778c; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FallingLines", function() { return $b184d2a88a50e3dc$export$1ed1943372cc63a9; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Vortex", function() { return $5ad4f4dbdb85103b$export$d25f4198d7ad6c78; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RotatingTriangles", function() { return $aa2b177fb9ef5dee$export$f64f16a115ce395d; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Radio", function() { return $daf95de783b7b8b1$export$d7b12c4107be0d61; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProgressBar", function() { return $075a2f0ea0d9df8a$export$c17561cb55d4db30; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MagnifyingGlass", function() { return $db94311ffb982ec6$export$bdf537af43a20db5; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FidgetSpinner", function() { return $1d8c9163e13b7bf7$export$8e3fad5cade57efa; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DNA", function() { return $bb8e4335d7ee0654$export$bee07fdc425df572; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Discuss", function() { return $50138037f422b463$export$f93420b62a5bdffa; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ColorRing", function() { return $7097090906378a5b$export$dc036a5afb9ca26f; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Comment", function() { return $81e36fafa9b58989$export$4d299b491347818a; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Blocks", function() { return $ffa7e3ac27a21a71$export$2ba1b65b747a57aa; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Hourglass", function() { return $1e82ee682f5b64b8$export$f3c41beb83007357; });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../../node_modules/react/jsx-runtime.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../../../node_modules/styled-components/dist/styled-components.browser.esm.js");




// Such export is called Tree Shaking. It allows to import only the components
// that are needed while webpack will remove the rest of the code from the bundle.


const $84fda1e7e33cfd28$export$37394b0fa44b998c = "#4fa94d";
const $84fda1e7e33cfd28$export$6bfda33bcd6c2d18 = {
    "aria-busy": true,
    role: "progressbar"
};



const $4c3f0b77e8caf06d$export$21d9f1931ef75b56 = (0, styled_components__WEBPACK_IMPORTED_MODULE_2__["default"]).div`
  display: ${(props)=>props.$visible ? "flex" : "none"};
`;


const $eb040f10400edc38$export$98a285aab16ab26c = "http://www.w3.org/2000/svg";


const $dcdd04c60cd78d69$export$153755f98d9861de = ({ height: height = "100", width: width = "100", color: color = (0, $84fda1e7e33cfd28$export$37394b0fa44b998c), ariaLabel: ariaLabel = "audio-loading", wrapperStyle: wrapperStyle = {}, wrapperClass: wrapperClass, visible: visible = true })=>/*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])((0, $4c3f0b77e8caf06d$export$21d9f1931ef75b56), {
        $visible: visible,
        style: {
            ...wrapperStyle
        },
        className: wrapperClass,
        "data-testid": "audio-loading",
        "aria-label": ariaLabel,
        ...(0, $84fda1e7e33cfd28$export$6bfda33bcd6c2d18),
        children: /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("svg", {
            height: `${height}`,
            width: `${width}`,
            fill: color,
            viewBox: "0 0 55 80",
            xmlns: (0, $eb040f10400edc38$export$98a285aab16ab26c),
            "data-testid": "audio-svg",
            children: [
                /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("title", {
                    children: "Audio Visualization"
                }),
                /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("desc", {
                    children: "Animated representation of audio data"
                }),
                /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("g", {
                    transform: "matrix(1 0 0 -1 0 80)",
                    children: [
                        /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("rect", {
                            width: "10",
                            height: "20",
                            rx: "3",
                            children: /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("animate", {
                                attributeName: "height",
                                begin: "0s",
                                dur: "4.3s",
                                values: "20;45;57;80;64;32;66;45;64;23;66;13;64;56;34;34;2;23;76;79;20",
                                calcMode: "linear",
                                repeatCount: "indefinite"
                            })
                        }),
                        /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("rect", {
                            x: "15",
                            width: "10",
                            height: "80",
                            rx: "3",
                            children: /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("animate", {
                                attributeName: "height",
                                begin: "0s",
                                dur: "2s",
                                values: "80;55;33;5;75;23;73;33;12;14;60;80",
                                calcMode: "linear",
                                repeatCount: "indefinite"
                            })
                        }),
                        /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("rect", {
                            x: "30",
                            width: "10",
                            height: "50",
                            rx: "3",
                            children: /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("animate", {
                                attributeName: "height",
                                begin: "0s",
                                dur: "1.4s",
                                values: "50;34;78;23;56;23;34;76;80;54;21;50",
                                calcMode: "linear",
                                repeatCount: "indefinite"
                            })
                        }),
                        /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("rect", {
                            x: "45",
                            width: "10",
                            height: "30",
                            rx: "3",
                            children: /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("animate", {
                                attributeName: "height",
                                begin: "0s",
                                dur: "2s",
                                values: "30;45;13;80;56;72;45;76;34;23;67;30",
                                calcMode: "linear",
                                repeatCount: "indefinite"
                            })
                        })
                    ]
                })
            ]
        })
    });







const $e035d01ad1d05b44$export$68949ad0373623af = ({ height: height = 100, width: width = 100, radius: radius = 5, color: color = (0, $84fda1e7e33cfd28$export$37394b0fa44b998c), ariaLabel: ariaLabel = "ball-triangle-loading", wrapperClass: wrapperClass, wrapperStyle: wrapperStyle, visible: visible = true })=>/*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])((0, $4c3f0b77e8caf06d$export$21d9f1931ef75b56), {
        style: {
            ...wrapperStyle
        },
        $visible: visible,
        className: wrapperClass,
        "data-testid": "ball-triangle-loading",
        "aria-label": ariaLabel,
        ...(0, $84fda1e7e33cfd28$export$6bfda33bcd6c2d18),
        children: /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("svg", {
            height: height,
            width: width,
            stroke: color,
            viewBox: "0 0 57 57",
            xmlns: (0, $eb040f10400edc38$export$98a285aab16ab26c),
            "data-testid": "ball-triangle-svg",
            children: [
                /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("title", {
                    children: "Ball Triangle"
                }),
                /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("desc", {
                    children: "Animated representation of three balls"
                }),
                /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("g", {
                    fill: "none",
                    fillRule: "evenodd",
                    children: /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("g", {
                        transform: "translate(1 1)",
                        strokeWidth: "2",
                        children: [
                            /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("circle", {
                                cx: "5",
                                cy: "50",
                                r: radius,
                                children: [
                                    /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("animate", {
                                        attributeName: "cy",
                                        begin: "0s",
                                        dur: "2.2s",
                                        values: "50;5;50;50",
                                        calcMode: "linear",
                                        repeatCount: "indefinite"
                                    }),
                                    /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("animate", {
                                        attributeName: "cx",
                                        begin: "0s",
                                        dur: "2.2s",
                                        values: "5;27;49;5",
                                        calcMode: "linear",
                                        repeatCount: "indefinite"
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("circle", {
                                cx: "27",
                                cy: "5",
                                r: radius,
                                children: [
                                    /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("animate", {
                                        attributeName: "cy",
                                        begin: "0s",
                                        dur: "2.2s",
                                        from: "5",
                                        to: "5",
                                        values: "5;50;50;5",
                                        calcMode: "linear",
                                        repeatCount: "indefinite"
                                    }),
                                    /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("animate", {
                                        attributeName: "cx",
                                        begin: "0s",
                                        dur: "2.2s",
                                        from: "27",
                                        to: "27",
                                        values: "27;49;5;27",
                                        calcMode: "linear",
                                        repeatCount: "indefinite"
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("circle", {
                                cx: "49",
                                cy: "50",
                                r: radius,
                                children: [
                                    /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("animate", {
                                        attributeName: "cy",
                                        begin: "0s",
                                        dur: "2.2s",
                                        values: "50;50;5;50",
                                        calcMode: "linear",
                                        repeatCount: "indefinite"
                                    }),
                                    /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("animate", {
                                        attributeName: "cx",
                                        from: "49",
                                        to: "49",
                                        begin: "0s",
                                        dur: "2.2s",
                                        values: "49;5;27;49",
                                        calcMode: "linear",
                                        repeatCount: "indefinite"
                                    })
                                ]
                            })
                        ]
                    })
                })
            ]
        })
    });







const $7dd1b251b360e95a$export$fbc7d6f7dd821b47 = ({ height: height = 80, width: width = 80, color: color = (0, $84fda1e7e33cfd28$export$37394b0fa44b998c), ariaLabel: ariaLabel = "bars-loading", wrapperStyle: wrapperStyle, wrapperClass: wrapperClass, visible: visible = true })=>/*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])((0, $4c3f0b77e8caf06d$export$21d9f1931ef75b56), {
        $visible: visible,
        style: {
            ...wrapperStyle
        },
        className: wrapperClass,
        "data-testid": "bars-loading",
        "aria-label": ariaLabel,
        ...(0, $84fda1e7e33cfd28$export$6bfda33bcd6c2d18),
        children: /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("svg", {
            width: width,
            height: height,
            fill: color,
            viewBox: "0 0 135 140",
            xmlns: (0, $eb040f10400edc38$export$98a285aab16ab26c),
            "data-testid": "bars-svg",
            children: [
                /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("rect", {
                    y: "10",
                    width: "15",
                    height: "120",
                    rx: "6",
                    children: [
                        /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("animate", {
                            attributeName: "height",
                            begin: "0.5s",
                            dur: "1s",
                            values: "120;110;100;90;80;70;60;50;40;140;120",
                            calcMode: "linear",
                            repeatCount: "indefinite"
                        }),
                        /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("animate", {
                            attributeName: "y",
                            begin: "0.5s",
                            dur: "1s",
                            values: "10;15;20;25;30;35;40;45;50;0;10",
                            calcMode: "linear",
                            repeatCount: "indefinite"
                        })
                    ]
                }),
                /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("rect", {
                    x: "30",
                    y: "10",
                    width: "15",
                    height: "120",
                    rx: "6",
                    children: [
                        /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("animate", {
                            attributeName: "height",
                            begin: "0.25s",
                            dur: "1s",
                            values: "120;110;100;90;80;70;60;50;40;140;120",
                            calcMode: "linear",
                            repeatCount: "indefinite"
                        }),
                        /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("animate", {
                            attributeName: "y",
                            begin: "0.25s",
                            dur: "1s",
                            values: "10;15;20;25;30;35;40;45;50;0;10",
                            calcMode: "linear",
                            repeatCount: "indefinite"
                        })
                    ]
                }),
                /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("rect", {
                    x: "60",
                    width: "15",
                    height: "140",
                    rx: "6",
                    children: [
                        /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("animate", {
                            attributeName: "height",
                            begin: "0s",
                            dur: "1s",
                            values: "120;110;100;90;80;70;60;50;40;140;120",
                            calcMode: "linear",
                            repeatCount: "indefinite"
                        }),
                        /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("animate", {
                            attributeName: "y",
                            begin: "0s",
                            dur: "1s",
                            values: "10;15;20;25;30;35;40;45;50;0;10",
                            calcMode: "linear",
                            repeatCount: "indefinite"
                        })
                    ]
                }),
                /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("rect", {
                    x: "90",
                    y: "10",
                    width: "15",
                    height: "120",
                    rx: "6",
                    children: [
                        /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("animate", {
                            attributeName: "height",
                            begin: "0.25s",
                            dur: "1s",
                            values: "120;110;100;90;80;70;60;50;40;140;120",
                            calcMode: "linear",
                            repeatCount: "indefinite"
                        }),
                        /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("animate", {
                            attributeName: "y",
                            begin: "0.25s",
                            dur: "1s",
                            values: "10;15;20;25;30;35;40;45;50;0;10",
                            calcMode: "linear",
                            repeatCount: "indefinite"
                        })
                    ]
                }),
                /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("rect", {
                    x: "120",
                    y: "10",
                    width: "15",
                    height: "120",
                    rx: "6",
                    children: [
                        /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("animate", {
                            attributeName: "height",
                            begin: "0.5s",
                            dur: "1s",
                            values: "120;110;100;90;80;70;60;50;40;140;120",
                            calcMode: "linear",
                            repeatCount: "indefinite"
                        }),
                        /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("animate", {
                            attributeName: "y",
                            begin: "0.5s",
                            dur: "1s",
                            values: "10;15;20;25;30;35;40;45;50;0;10",
                            calcMode: "linear",
                            repeatCount: "indefinite"
                        })
                    ]
                })
            ]
        })
    });







const $29b6b1f956162f74$export$765808835a2dc0a2 = ({ height: height = 80, width: width = 80, color: color = (0, $84fda1e7e33cfd28$export$37394b0fa44b998c), ariaLabel: ariaLabel = "circles-loading", wrapperStyle: wrapperStyle, wrapperClass: wrapperClass, visible: visible = true })=>/*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])((0, $4c3f0b77e8caf06d$export$21d9f1931ef75b56), {
        style: wrapperStyle,
        $visible: visible,
        className: wrapperClass,
        "aria-label": ariaLabel,
        "data-testid": "circles-loading",
        ...(0, $84fda1e7e33cfd28$export$6bfda33bcd6c2d18),
        children: /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("svg", {
            width: width,
            height: height,
            viewBox: "0 0 135 135",
            xmlns: (0, $eb040f10400edc38$export$98a285aab16ab26c),
            fill: color,
            "data-testid": "circles-svg",
            children: [
                /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("title", {
                    children: "circles-loading"
                }),
                /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("desc", {
                    children: "Animated representation of circles"
                }),
                /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
                    d: "M67.447 58c5.523 0 10-4.477 10-10s-4.477-10-10-10-10 4.477-10 10 4.477 10 10 10zm9.448 9.447c0 5.523 4.477 10 10 10 5.522 0 10-4.477 10-10s-4.478-10-10-10c-5.523 0-10 4.477-10 10zm-9.448 9.448c-5.523 0-10 4.477-10 10 0 5.522 4.477 10 10 10s10-4.478 10-10c0-5.523-4.477-10-10-10zM58 67.447c0-5.523-4.477-10-10-10s-10 4.477-10 10 4.477 10 10 10 10-4.477 10-10z",
                    children: /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("animateTransform", {
                        attributeName: "transform",
                        type: "rotate",
                        from: "0 67 67",
                        to: "-360 67 67",
                        dur: "2.5s",
                        repeatCount: "indefinite"
                    })
                }),
                /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
                    d: "M28.19 40.31c6.627 0 12-5.374 12-12 0-6.628-5.373-12-12-12-6.628 0-12 5.372-12 12 0 6.626 5.372 12 12 12zm30.72-19.825c4.686 4.687 12.284 4.687 16.97 0 4.686-4.686 4.686-12.284 0-16.97-4.686-4.687-12.284-4.687-16.97 0-4.687 4.686-4.687 12.284 0 16.97zm35.74 7.705c0 6.627 5.37 12 12 12 6.626 0 12-5.373 12-12 0-6.628-5.374-12-12-12-6.63 0-12 5.372-12 12zm19.822 30.72c-4.686 4.686-4.686 12.284 0 16.97 4.687 4.686 12.285 4.686 16.97 0 4.687-4.686 4.687-12.284 0-16.97-4.685-4.687-12.283-4.687-16.97 0zm-7.704 35.74c-6.627 0-12 5.37-12 12 0 6.626 5.373 12 12 12s12-5.374 12-12c0-6.63-5.373-12-12-12zm-30.72 19.822c-4.686-4.686-12.284-4.686-16.97 0-4.686 4.687-4.686 12.285 0 16.97 4.686 4.687 12.284 4.687 16.97 0 4.687-4.685 4.687-12.283 0-16.97zm-35.74-7.704c0-6.627-5.372-12-12-12-6.626 0-12 5.373-12 12s5.374 12 12 12c6.628 0 12-5.373 12-12zm-19.823-30.72c4.687-4.686 4.687-12.284 0-16.97-4.686-4.686-12.284-4.686-16.97 0-4.687 4.686-4.687 12.284 0 16.97 4.686 4.687 12.284 4.687 16.97 0z",
                    children: /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("animateTransform", {
                        attributeName: "transform",
                        type: "rotate",
                        from: "0 67 67",
                        to: "360 67 67",
                        dur: "8s",
                        repeatCount: "indefinite"
                    })
                })
            ]
        })
    });







const $12bd062f0f060b07$export$17c11650828d97e = ({ wrapperStyle: wrapperStyle = {}, visible: visible = true, wrapperClass: wrapperClass = "", height: height = 100, width: width = 100, color: color = (0, $84fda1e7e33cfd28$export$37394b0fa44b998c), outerCircleColor: outerCircleColor, innerCircleColor: innerCircleColor, barColor: barColor, ariaLabel: ariaLabel = "circles-with-bar-loading" })=>{
    return /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])((0, $4c3f0b77e8caf06d$export$21d9f1931ef75b56), {
        style: wrapperStyle,
        $visible: visible,
        className: wrapperClass,
        "aria-label": ariaLabel,
        ...(0, $84fda1e7e33cfd28$export$6bfda33bcd6c2d18),
        "data-testid": "circles-with-bar-wrapper",
        children: /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("svg", {
            version: "1.1",
            id: "L1",
            xmlns: (0, $eb040f10400edc38$export$98a285aab16ab26c),
            x: "0px",
            y: "0px",
            height: `${height}`,
            width: `${width}`,
            viewBox: "0 0 100 100",
            enableBackground: "new 0 0 100 100",
            xmlSpace: "preserve",
            "data-testid": "circles-with-bar-svg",
            children: [
                /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("title", {
                    children: "circles-with-bar-loading"
                }),
                /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("desc", {
                    children: "Animated representation of circles with bar"
                }),
                /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("circle", {
                    fill: "none",
                    stroke: `${outerCircleColor || color}`,
                    strokeWidth: "6",
                    strokeMiterlimit: "15",
                    strokeDasharray: "14.2472,14.2472",
                    cx: "50",
                    cy: "50",
                    r: "47",
                    children: /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("animateTransform", {
                        attributeName: "transform",
                        attributeType: "XML",
                        type: "rotate",
                        dur: "5s",
                        from: "0 50 50",
                        to: "360 50 50",
                        repeatCount: "indefinite"
                    })
                }),
                /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("circle", {
                    fill: "none",
                    stroke: `${innerCircleColor || color}`,
                    strokeWidth: "1",
                    strokeMiterlimit: "10",
                    strokeDasharray: "10,10",
                    cx: "50",
                    cy: "50",
                    r: "39",
                    children: /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("animateTransform", {
                        attributeName: "transform",
                        attributeType: "XML",
                        type: "rotate",
                        dur: "5s",
                        from: "0 50 50",
                        to: "-360 50 50",
                        repeatCount: "indefinite"
                    })
                }),
                /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("g", {
                    fill: `${barColor || color}`,
                    "data-testid": "circles-with-bar-svg-bar",
                    children: [
                        /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("rect", {
                            x: "30",
                            y: "35",
                            width: "5",
                            height: "30",
                            children: /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("animateTransform", {
                                attributeName: "transform",
                                dur: "1s",
                                type: "translate",
                                values: "0 5 ; 0 -5; 0 5",
                                repeatCount: "indefinite",
                                begin: "0.1"
                            })
                        }),
                        /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("rect", {
                            x: "40",
                            y: "35",
                            width: "5",
                            height: "30",
                            children: /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("animateTransform", {
                                attributeName: "transform",
                                dur: "1s",
                                type: "translate",
                                values: "0 5 ; 0 -5; 0 5",
                                repeatCount: "indefinite",
                                begin: "0.2"
                            })
                        }),
                        /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("rect", {
                            x: "50",
                            y: "35",
                            width: "5",
                            height: "30",
                            children: /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("animateTransform", {
                                attributeName: "transform",
                                dur: "1s",
                                type: "translate",
                                values: "0 5 ; 0 -5; 0 5",
                                repeatCount: "indefinite",
                                begin: "0.3"
                            })
                        }),
                        /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("rect", {
                            x: "60",
                            y: "35",
                            width: "5",
                            height: "30",
                            children: /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("animateTransform", {
                                attributeName: "transform",
                                dur: "1s",
                                type: "translate",
                                values: "0 5 ; 0 -5; 0 5",
                                repeatCount: "indefinite",
                                begin: "0.4"
                            })
                        }),
                        /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("rect", {
                            x: "70",
                            y: "35",
                            width: "5",
                            height: "30",
                            children: /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("animateTransform", {
                                attributeName: "transform",
                                dur: "1s",
                                type: "translate",
                                values: "0 5 ; 0 -5; 0 5",
                                repeatCount: "indefinite",
                                begin: "0.5"
                            })
                        })
                    ]
                })
            ]
        })
    });
};






const $b438e21e66fce243$export$ef2184bd89960b14 = ({ height: height = 80, width: width = 80, radius: radius = 12.5, color: color = (0, $84fda1e7e33cfd28$export$37394b0fa44b998c), ariaLabel: ariaLabel = "grid-loading", wrapperStyle: wrapperStyle, wrapperClass: wrapperClass, visible: visible = true })=>/*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])((0, $4c3f0b77e8caf06d$export$21d9f1931ef75b56), {
        style: wrapperStyle,
        $visible: visible,
        className: wrapperClass,
        "data-testid": "grid-loading",
        "aria-label": ariaLabel,
        ...(0, $84fda1e7e33cfd28$export$6bfda33bcd6c2d18),
        children: /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("svg", {
            width: width,
            height: height,
            viewBox: "0 0 105 105",
            fill: color,
            "data-testid": "grid-svg",
            children: [
                /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("circle", {
                    cx: "12.5",
                    cy: "12.5",
                    r: `${radius}`,
                    children: /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("animate", {
                        attributeName: "fill-opacity",
                        begin: "0s",
                        dur: "1s",
                        values: "1;.2;1",
                        calcMode: "linear",
                        repeatCount: "indefinite"
                    })
                }),
                /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("circle", {
                    cx: "12.5",
                    cy: "52.5",
                    r: `${radius}`,
                    children: /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("animate", {
                        attributeName: "fill-opacity",
                        begin: "100ms",
                        dur: "1s",
                        values: "1;.2;1",
                        calcMode: "linear",
                        repeatCount: "indefinite"
                    })
                }),
                /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("circle", {
                    cx: "52.5",
                    cy: "12.5",
                    r: `${radius}`,
                    children: /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("animate", {
                        attributeName: "fill-opacity",
                        begin: "300ms",
                        dur: "1s",
                        values: "1;.2;1",
                        calcMode: "linear",
                        repeatCount: "indefinite"
                    })
                }),
                /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("circle", {
                    cx: "52.5",
                    cy: "52.5",
                    r: `${radius}`,
                    children: /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("animate", {
                        attributeName: "fill-opacity",
                        begin: "600ms",
                        dur: "1s",
                        values: "1;.2;1",
                        calcMode: "linear",
                        repeatCount: "indefinite"
                    })
                }),
                /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("circle", {
                    cx: "92.5",
                    cy: "12.5",
                    r: `${radius}`,
                    children: /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("animate", {
                        attributeName: "fill-opacity",
                        begin: "800ms",
                        dur: "1s",
                        values: "1;.2;1",
                        calcMode: "linear",
                        repeatCount: "indefinite"
                    })
                }),
                /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("circle", {
                    cx: "92.5",
                    cy: "52.5",
                    r: `${radius}`,
                    children: /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("animate", {
                        attributeName: "fill-opacity",
                        begin: "400ms",
                        dur: "1s",
                        values: "1;.2;1",
                        calcMode: "linear",
                        repeatCount: "indefinite"
                    })
                }),
                /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("circle", {
                    cx: "12.5",
                    cy: "92.5",
                    r: `${radius}`,
                    children: /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("animate", {
                        attributeName: "fill-opacity",
                        begin: "700ms",
                        dur: "1s",
                        values: "1;.2;1",
                        calcMode: "linear",
                        repeatCount: "indefinite"
                    })
                }),
                /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("circle", {
                    cx: "52.5",
                    cy: "92.5",
                    r: `${radius}`,
                    children: /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("animate", {
                        attributeName: "fill-opacity",
                        begin: "500ms",
                        dur: "1s",
                        values: "1;.2;1",
                        calcMode: "linear",
                        repeatCount: "indefinite"
                    })
                }),
                /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("circle", {
                    cx: "92.5",
                    cy: "92.5",
                    r: `${radius}`,
                    children: /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("animate", {
                        attributeName: "fill-opacity",
                        begin: "200ms",
                        dur: "1s",
                        values: "1;.2;1",
                        calcMode: "linear",
                        repeatCount: "indefinite"
                    })
                })
            ]
        })
    });






const $88eb2f870dd9f437$export$2da2f0c7403af3ce = ({ height: height = 80, width: width = 80, color: color = (0, $84fda1e7e33cfd28$export$37394b0fa44b998c), ariaLabel: ariaLabel = "hearts-loading", wrapperStyle: wrapperStyle, wrapperClass: wrapperClass, visible: visible = true })=>/*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])((0, $4c3f0b77e8caf06d$export$21d9f1931ef75b56), {
        style: wrapperStyle,
        $visible: visible,
        className: wrapperClass,
        "data-testid": "hearts-loading",
        "aria-label": ariaLabel,
        ...(0, $84fda1e7e33cfd28$export$6bfda33bcd6c2d18),
        children: /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("svg", {
            width: width,
            height: height,
            viewBox: "0 0 140 64",
            xmlns: "http://www.w3.org/2000/svg",
            fill: color,
            "data-testid": "hearts-svg",
            children: [
                /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
                    d: "M30.262 57.02L7.195 40.723c-5.84-3.976-7.56-12.06-3.842-18.063 3.715-6 11.467-7.65 17.306-3.68l4.52 3.76 2.6-5.274c3.717-6.002 11.47-7.65 17.305-3.68 5.84 3.97 7.56 12.054 3.842 18.062L34.49 56.118c-.897 1.512-2.793 1.915-4.228.9z",
                    attributeName: "fill-opacity",
                    from: "0",
                    to: ".5",
                    children: /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("animate", {
                        attributeName: "fill-opacity",
                        begin: "0s",
                        dur: "1.4s",
                        values: "0.5;1;0.5",
                        calcMode: "linear",
                        repeatCount: "indefinite"
                    })
                }),
                /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
                    d: "M105.512 56.12l-14.44-24.272c-3.716-6.008-1.996-14.093 3.843-18.062 5.835-3.97 13.588-2.322 17.306 3.68l2.6 5.274 4.52-3.76c5.84-3.97 13.592-2.32 17.307 3.68 3.718 6.003 1.998 14.088-3.842 18.064L109.74 57.02c-1.434 1.014-3.33.61-4.228-.9z",
                    attributeName: "fill-opacity",
                    from: "0",
                    to: ".5",
                    children: /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("animate", {
                        attributeName: "fill-opacity",
                        begin: "0.7s",
                        dur: "1.4s",
                        values: "0.5;1;0.5",
                        calcMode: "linear",
                        repeatCount: "indefinite"
                    })
                }),
                /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
                    d: "M67.408 57.834l-23.01-24.98c-5.864-6.15-5.864-16.108 0-22.248 5.86-6.14 15.37-6.14 21.234 0L70 16.168l4.368-5.562c5.863-6.14 15.375-6.14 21.235 0 5.863 6.14 5.863 16.098 0 22.247l-23.007 24.98c-1.43 1.556-3.757 1.556-5.188 0z"
                })
            ]
        })
    });







const $ad60b992c945fdb5$var$len = 242.776657104492;
const $ad60b992c945fdb5$var$time = 1.6;
const $ad60b992c945fdb5$var$anim = (0, styled_components__WEBPACK_IMPORTED_MODULE_2__["keyframes"])`
12.5% {
  stroke-dasharray: ${$ad60b992c945fdb5$var$len * 0.14}px, ${$ad60b992c945fdb5$var$len}px;
  stroke-dashoffset: -${$ad60b992c945fdb5$var$len * 0.11}px;
}
43.75% {
  stroke-dasharray: ${$ad60b992c945fdb5$var$len * 0.35}px, ${$ad60b992c945fdb5$var$len}px;
  stroke-dashoffset: -${$ad60b992c945fdb5$var$len * 0.35}px;
}
100% {
  stroke-dasharray: ${$ad60b992c945fdb5$var$len * 0.01}px, ${$ad60b992c945fdb5$var$len}px;
  stroke-dashoffset: -${$ad60b992c945fdb5$var$len * 0.99}px;
}
`;
const $ad60b992c945fdb5$var$Path = (0, styled_components__WEBPACK_IMPORTED_MODULE_2__["default"]).path`
  stroke-dasharray: ${$ad60b992c945fdb5$var$len * 0.01}px, ${$ad60b992c945fdb5$var$len};
  stroke-dashoffset: 0;
  animation: ${$ad60b992c945fdb5$var$anim} ${$ad60b992c945fdb5$var$time}s linear infinite;
`;
const $ad60b992c945fdb5$export$8009d4483dfda42 = ({ color: color = (0, $84fda1e7e33cfd28$export$37394b0fa44b998c), width: width = "200" })=>{
    return /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("svg", {
        xmlns: (0, $eb040f10400edc38$export$98a285aab16ab26c),
        width: `${width}`,
        height: `${Number(width) * 0.5}`,
        viewBox: `0 0 ${width} ${Number(100)}`,
        "data-testid": "infinity-spin",
        children: [
            /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])($ad60b992c945fdb5$var$Path, {
                "data-testid": "infinity-spin-path-1",
                stroke: color,
                fill: "none",
                strokeWidth: "4",
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeMiterlimit: "10",
                d: "M93.9,46.4c9.3,9.5,13.8,17.9,23.5,17.9s17.5-7.8,17.5-17.5s-7.8-17.6-17.5-17.5c-9.7,0.1-13.3,7.2-22.1,17.1 c-8.9,8.8-15.7,17.9-25.4,17.9s-17.5-7.8-17.5-17.5s7.8-17.5,17.5-17.5S86.2,38.6,93.9,46.4z"
            }),
            /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
                "data-testid": "infinity-spin-path-2",
                opacity: "0.07",
                fill: "none",
                stroke: color,
                strokeWidth: "4",
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeMiterlimit: "10",
                d: "M93.9,46.4c9.3,9.5,13.8,17.9,23.5,17.9s17.5-7.8,17.5-17.5s-7.8-17.6-17.5-17.5c-9.7,0.1-13.3,7.2-22.1,17.1 c-8.9,8.8-15.7,17.9-25.4,17.9s-17.5-7.8-17.5-17.5s7.8-17.5,17.5-17.5S86.2,38.6,93.9,46.4z"
            })
        ]
    });
};







const $05da46d92e4baf0c$export$d2101d81f63866ab = ({ wrapperStyle: wrapperStyle = {}, visible: visible = true, wrapperClass: wrapperClass = "", height: height = 100, width: width = 100, color: color = (0, $84fda1e7e33cfd28$export$37394b0fa44b998c), ariaLabel: ariaLabel = "line-wave-loading", firstLineColor: firstLineColor, middleLineColor: middleLineColor, lastLineColor: lastLineColor })=>{
    return /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])((0, $4c3f0b77e8caf06d$export$21d9f1931ef75b56), {
        style: wrapperStyle,
        $visible: visible,
        className: wrapperClass,
        "data-testid": "line-wave-wrapper",
        "aria-label": ariaLabel,
        ...(0, $84fda1e7e33cfd28$export$6bfda33bcd6c2d18),
        children: /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("svg", {
            version: "1.1",
            height: `${height}`,
            width: `${width}`,
            xmlns: (0, $eb040f10400edc38$export$98a285aab16ab26c),
            x: "0px",
            y: "0px",
            viewBox: "0 0 100 100",
            enableBackground: "new 0 0 0 0",
            xmlSpace: "preserve",
            "data-testid": "line-wave-svg",
            children: [
                /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("rect", {
                    x: "20",
                    y: "50",
                    width: "4",
                    height: "10",
                    fill: firstLineColor || color,
                    children: /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("animateTransform", {
                        attributeType: "xml",
                        attributeName: "transform",
                        type: "translate",
                        values: "0 0; 0 20; 0 0",
                        begin: "0",
                        dur: "0.6s",
                        repeatCount: "indefinite"
                    })
                }),
                /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("rect", {
                    x: "30",
                    y: "50",
                    width: "4",
                    height: "10",
                    fill: middleLineColor || color,
                    children: /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("animateTransform", {
                        attributeType: "xml",
                        attributeName: "transform",
                        type: "translate",
                        values: "0 0; 0 20; 0 0",
                        begin: "0.2s",
                        dur: "0.6s",
                        repeatCount: "indefinite"
                    })
                }),
                /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("rect", {
                    x: "40",
                    y: "50",
                    width: "4",
                    height: "10",
                    fill: lastLineColor || color,
                    children: /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("animateTransform", {
                        attributeType: "xml",
                        attributeName: "transform",
                        type: "translate",
                        values: "0 0; 0 20; 0 0",
                        begin: "0.4s",
                        dur: "0.6s",
                        repeatCount: "indefinite"
                    })
                })
            ]
        })
    });
};






const $05cab5f4cf092036$export$64ea884904791f4 = ({ height: height = 90, width: width = 80, radius: radius = 12.5, color: color = (0, $84fda1e7e33cfd28$export$37394b0fa44b998c), secondaryColor: secondaryColor = (0, $84fda1e7e33cfd28$export$37394b0fa44b998c), ariaLabel: ariaLabel = "mutating-dots-loading", wrapperStyle: wrapperStyle, wrapperClass: wrapperClass, visible: visible = true })=>/*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])((0, $4c3f0b77e8caf06d$export$21d9f1931ef75b56), {
        style: wrapperStyle,
        $visible: visible,
        className: wrapperClass,
        "data-testid": "mutating-dots-loading",
        "aria-label": ariaLabel,
        ...(0, $84fda1e7e33cfd28$export$6bfda33bcd6c2d18),
        children: /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("svg", {
            id: "goo-loader",
            width: width,
            height: height,
            "data-testid": "mutating-dots-svg",
            children: [
                /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("filter", {
                    id: "fancy-goo",
                    children: [
                        /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("feGaussianBlur", {
                            in: "SourceGraphic",
                            stdDeviation: "6",
                            result: "blur"
                        }),
                        /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("feColorMatrix", {
                            in: "blur",
                            mode: "matrix",
                            values: "1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9",
                            result: "goo"
                        }),
                        /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("feComposite", {
                            in: "SourceGraphic",
                            in2: "goo",
                            operator: "atop"
                        })
                    ]
                }),
                /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("g", {
                    filter: "url(#fancy-goo)",
                    children: [
                        /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("animateTransform", {
                            id: "mainAnim",
                            attributeName: "transform",
                            attributeType: "XML",
                            type: "rotate",
                            from: "0 50 50",
                            to: "359 50 50",
                            dur: "1.2s",
                            repeatCount: "indefinite"
                        }),
                        /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("circle", {
                            cx: "50%",
                            cy: "40",
                            r: radius,
                            fill: color,
                            children: /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("animate", {
                                id: "cAnim1",
                                attributeType: "XML",
                                attributeName: "cy",
                                dur: "0.6s",
                                begin: "0;cAnim1.end+0.2s",
                                calcMode: "spline",
                                values: "40;20;40",
                                keyTimes: "0;0.3;1",
                                keySplines: "0.09, 0.45, 0.16, 1;0.09, 0.45, 0.16, 1"
                            })
                        }),
                        /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("circle", {
                            cx: "50%",
                            cy: "60",
                            r: radius,
                            fill: secondaryColor,
                            children: /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("animate", {
                                id: "cAnim2",
                                attributeType: "XML",
                                attributeName: "cy",
                                dur: "0.6s",
                                begin: "0.4s;cAnim2.end+0.2s",
                                calcMode: "spline",
                                values: "60;80;60",
                                keyTimes: "0;0.3;1",
                                keySplines: "0.09, 0.45, 0.16, 1;0.09, 0.45, 0.16, 1"
                            })
                        })
                    ]
                })
            ]
        })
    });






/**
 * The radius of the circle
 * The Loader size is set with the width and height of the SVG
 * @type {number}
 */ const $a5fa864d4dd36deb$var$RADIUS = 20;
/**
 * Compute Path depending on circle radius
 * The structure with radius 20 is "M20 0c0-9.94-8.06-20-20-20"
 * @param radius of the circle radius default 20
 * @returns {string}
 */ const $a5fa864d4dd36deb$var$getPath = (radius)=>{
    return [
        "M" + radius + " 0c0-9.94-8.06",
        radius,
        radius,
        radius
    ].join("-");
};
/**
 * Compute the size of the view box depending on the radius and Stroke-Width
 * @param strokeWidth Stroke-Width of the full circle
 * @param secondaryStrokeWidth Stroke-Width of the 1/4 circle
 * @param radius radius of the circle
 * @returns {string}
 */ const $a5fa864d4dd36deb$var$getViewBoxSize = (strokeWidth, secondaryStrokeWidth, radius)=>{
    const maxStrokeWidth = Math.max(strokeWidth, secondaryStrokeWidth);
    const startingPoint = -radius - maxStrokeWidth / 2 + 1;
    const endpoint = radius * 2 + maxStrokeWidth;
    return [
        startingPoint,
        startingPoint,
        endpoint,
        endpoint
    ].join(" ");
};
const $a5fa864d4dd36deb$export$67ad50c48ca3ede4 = ({ height: height = 80, width: width = 80, color: color = (0, $84fda1e7e33cfd28$export$37394b0fa44b998c), secondaryColor: secondaryColor = (0, $84fda1e7e33cfd28$export$37394b0fa44b998c), ariaLabel: ariaLabel = "oval-loading", wrapperStyle: wrapperStyle, wrapperClass: wrapperClass, visible: visible = true, strokeWidth: strokeWidth = 2, strokeWidthSecondary: strokeWidthSecondary })=>/*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])((0, $4c3f0b77e8caf06d$export$21d9f1931ef75b56), {
        style: wrapperStyle,
        $visible: visible,
        className: wrapperClass,
        "data-testid": "oval-loading",
        "aria-label": ariaLabel,
        ...(0, $84fda1e7e33cfd28$export$6bfda33bcd6c2d18),
        children: /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("svg", {
            width: width,
            height: height,
            viewBox: $a5fa864d4dd36deb$var$getViewBoxSize(Number(strokeWidth), Number(strokeWidthSecondary || strokeWidth), $a5fa864d4dd36deb$var$RADIUS),
            xmlns: "http://www.w3.org/2000/svg",
            stroke: color,
            "data-testid": "oval-svg",
            children: /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("g", {
                fill: "none",
                fillRule: "evenodd",
                children: /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("g", {
                    transform: "translate(1 1)",
                    strokeWidth: Number(strokeWidthSecondary || strokeWidth),
                    "data-testid": "oval-secondary-group",
                    children: [
                        /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("circle", {
                            strokeOpacity: ".5",
                            cx: "0",
                            cy: "0",
                            r: $a5fa864d4dd36deb$var$RADIUS,
                            stroke: secondaryColor,
                            strokeWidth: strokeWidth
                        }),
                        /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
                            d: $a5fa864d4dd36deb$var$getPath($a5fa864d4dd36deb$var$RADIUS),
                            children: /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("animateTransform", {
                                attributeName: "transform",
                                type: "rotate",
                                from: "0 0 0",
                                to: "360 0 0",
                                dur: "1s",
                                repeatCount: "indefinite"
                            })
                        })
                    ]
                })
            })
        })
    });







const $8a2963a7161a08e2$export$83d2259ec538613b = ({ height: height = 80, width: width = 80, radius: radius = 1, color: color = (0, $84fda1e7e33cfd28$export$37394b0fa44b998c), ariaLabel: ariaLabel = "puff-loading", wrapperStyle: wrapperStyle, wrapperClass: wrapperClass, visible: visible = true })=>/*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])((0, $4c3f0b77e8caf06d$export$21d9f1931ef75b56), {
        style: wrapperStyle,
        $visible: visible,
        className: wrapperClass,
        "data-testid": "puff-loading",
        "aria-label": ariaLabel,
        ...(0, $84fda1e7e33cfd28$export$6bfda33bcd6c2d18),
        children: /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("svg", {
            width: width,
            height: height,
            viewBox: "0 0 44 44",
            xmlns: (0, $eb040f10400edc38$export$98a285aab16ab26c),
            stroke: color,
            "data-testid": "puff-svg",
            children: /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("g", {
                fill: "none",
                fillRule: "evenodd",
                strokeWidth: "2",
                children: [
                    /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("circle", {
                        cx: "22",
                        cy: "22",
                        r: radius,
                        children: [
                            /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("animate", {
                                attributeName: "r",
                                begin: "0s",
                                dur: "1.8s",
                                values: "1; 20",
                                calcMode: "spline",
                                keyTimes: "0; 1",
                                keySplines: "0.165, 0.84, 0.44, 1",
                                repeatCount: "indefinite"
                            }),
                            /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("animate", {
                                attributeName: "strokeOpacity",
                                begin: "0s",
                                dur: "1.8s",
                                values: "1; 0",
                                calcMode: "spline",
                                keyTimes: "0; 1",
                                keySplines: "0.3, 0.61, 0.355, 1",
                                repeatCount: "indefinite"
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("circle", {
                        cx: "22",
                        cy: "22",
                        r: radius,
                        children: [
                            /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("animate", {
                                attributeName: "r",
                                begin: "-0.9s",
                                dur: "1.8s",
                                values: "1; 20",
                                calcMode: "spline",
                                keyTimes: "0; 1",
                                keySplines: "0.165, 0.84, 0.44, 1",
                                repeatCount: "indefinite"
                            }),
                            /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("animate", {
                                attributeName: "strokeOpacity",
                                begin: "-0.9s",
                                dur: "1.8s",
                                values: "1; 0",
                                calcMode: "spline",
                                keyTimes: "0; 1",
                                keySplines: "0.3, 0.61, 0.355, 1",
                                repeatCount: "indefinite"
                            })
                        ]
                    })
                ]
            })
        })
    });







const $f6f65ef73d86a35a$export$8e22e563e5362f75 = ({ radius: radius = 45, strokeWidth: strokeWidth = 5, color: color = (0, $84fda1e7e33cfd28$export$37394b0fa44b998c), secondaryColor: secondaryColor, ariaLabel: ariaLabel = "revolving-dot-loading", wrapperStyle: wrapperStyle, wrapperClass: wrapperClass, visible: visible = true })=>/*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])((0, $4c3f0b77e8caf06d$export$21d9f1931ef75b56), {
        style: wrapperStyle,
        $visible: visible,
        className: wrapperClass,
        "aria-label": ariaLabel,
        "data-testid": "revolving-dot-loading",
        ...(0, $84fda1e7e33cfd28$export$6bfda33bcd6c2d18),
        children: /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("svg", {
            version: "1.1",
            width: `calc(${radius} * 2.5)`,
            height: `calc(${radius} * 2.5)`,
            xmlns: (0, $eb040f10400edc38$export$98a285aab16ab26c),
            x: "0px",
            y: "0px",
            "data-testid": "revolving-dot-svg",
            children: [
                /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("circle", {
                    fill: "none",
                    stroke: secondaryColor || color,
                    strokeWidth: strokeWidth,
                    cx: `calc(${radius} * 1.28)`,
                    cy: `calc(${radius} * 1.28)`,
                    r: radius,
                    style: {
                        opacity: 0.5
                    }
                }),
                /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("circle", {
                    fill: color,
                    stroke: color,
                    strokeWidth: "3",
                    cx: `calc(${radius} * 1.28)`,
                    cy: `calc(${radius} / 3.5)`,
                    r: `calc(${radius} / 5)`,
                    style: {
                        transformOrigin: "50% 50%"
                    },
                    children: /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("animateTransform", {
                        attributeName: "transform",
                        dur: "2s",
                        type: "rotate",
                        from: "0",
                        to: "360",
                        repeatCount: "indefinite"
                    })
                })
            ]
        })
    });







const $0da8ebf0340870f3$export$fdd9e2f491a77de7 = ({ height: height = 80, width: width = 80, radius: radius = 6, color: color = (0, $84fda1e7e33cfd28$export$37394b0fa44b998c), ariaLabel: ariaLabel = "rings-loading", wrapperStyle: wrapperStyle, wrapperClass: wrapperClass, visible: visible = true })=>/*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])((0, $4c3f0b77e8caf06d$export$21d9f1931ef75b56), {
        style: wrapperStyle,
        $visible: visible,
        className: wrapperClass,
        "data-testid": "rings-loading",
        "aria-label": ariaLabel,
        ...(0, $84fda1e7e33cfd28$export$6bfda33bcd6c2d18),
        children: /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("svg", {
            width: width,
            height: height,
            viewBox: "0 0 45 45",
            xmlns: (0, $eb040f10400edc38$export$98a285aab16ab26c),
            stroke: color,
            "data-testid": "rings-svg",
            children: /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("g", {
                fill: "none",
                fillRule: "evenodd",
                transform: "translate(1 1)",
                strokeWidth: "2",
                children: [
                    /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("circle", {
                        cx: "22",
                        cy: "22",
                        r: radius,
                        strokeOpacity: "0",
                        children: [
                            /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("animate", {
                                attributeName: "r",
                                begin: "1.5s",
                                dur: "3s",
                                values: "6;22",
                                calcMode: "linear",
                                repeatCount: "indefinite"
                            }),
                            /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("animate", {
                                attributeName: "stroke-opacity",
                                begin: "1.5s",
                                dur: "3s",
                                values: "1;0",
                                calcMode: "linear",
                                repeatCount: "indefinite"
                            }),
                            /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("animate", {
                                attributeName: "stroke-width",
                                begin: "1.5s",
                                dur: "3s",
                                values: "2;0",
                                calcMode: "linear",
                                repeatCount: "indefinite"
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("circle", {
                        cx: "22",
                        cy: "22",
                        r: radius,
                        strokeOpacity: "0",
                        children: [
                            /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("animate", {
                                attributeName: "r",
                                begin: "3s",
                                dur: "3s",
                                values: "6;22",
                                calcMode: "linear",
                                repeatCount: "indefinite"
                            }),
                            /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("animate", {
                                attributeName: "strokeOpacity",
                                begin: "3s",
                                dur: "3s",
                                values: "1;0",
                                calcMode: "linear",
                                repeatCount: "indefinite"
                            }),
                            /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("animate", {
                                attributeName: "strokeWidth",
                                begin: "3s",
                                dur: "3s",
                                values: "2;0",
                                calcMode: "linear",
                                repeatCount: "indefinite"
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("circle", {
                        cx: "22",
                        cy: "22",
                        r: Number(radius) + 2,
                        children: /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("animate", {
                            attributeName: "r",
                            begin: "0s",
                            dur: "1.5s",
                            values: "6;1;2;3;4;5;6",
                            calcMode: "linear",
                            repeatCount: "indefinite"
                        })
                    })
                ]
            })
        })
    });







const $30f4fc5ff137b595$export$bb511942ded86554 = ({ wrapperClass: wrapperClass = "", color: color = (0, $84fda1e7e33cfd28$export$37394b0fa44b998c), height: height = 100, width: width = 100, strokeWidth: strokeWidth = 4, ariaLabel: ariaLabel = "rotating-square-loading", wrapperStyle: wrapperStyle = {}, visible: visible = true })=>{
    return /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])((0, $4c3f0b77e8caf06d$export$21d9f1931ef75b56), {
        style: wrapperStyle,
        $visible: visible,
        className: wrapperClass,
        "data-testid": "rotating-square-wrapper",
        "aria-label": ariaLabel,
        ...(0, $84fda1e7e33cfd28$export$6bfda33bcd6c2d18),
        children: /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("svg", {
            version: "1.1",
            xmlns: (0, $eb040f10400edc38$export$98a285aab16ab26c),
            x: "0px",
            y: "0px",
            viewBox: "0 0 100 100",
            enableBackground: "new 0 0 100 100",
            height: `${height}`,
            width: `${width}`,
            "data-testid": "rotating-square-svg",
            xmlSpace: "preserve",
            children: [
                /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("rect", {
                    fill: "none",
                    stroke: color,
                    strokeWidth: strokeWidth,
                    x: "25",
                    y: "25",
                    width: "50",
                    height: "50",
                    children: /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("animateTransform", {
                        attributeName: "transform",
                        dur: "0.5s",
                        from: "0 50 50",
                        to: "180 50 50",
                        type: "rotate",
                        id: "strokeBox",
                        attributeType: "XML",
                        begin: "rectBox.end"
                    })
                }),
                /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("rect", {
                    x: "27",
                    y: "27",
                    fill: color,
                    width: "46",
                    height: "50",
                    children: /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("animate", {
                        attributeName: "height",
                        dur: "1.3s",
                        attributeType: "XML",
                        from: "50",
                        to: "0",
                        id: "rectBox",
                        fill: "freeze",
                        begin: "0s;strokeBox.end"
                    })
                })
            ]
        })
    });
};







const $5819da83a926266a$var$POINTS = [
    0,
    30,
    60,
    90,
    120,
    150,
    180,
    210,
    240,
    270,
    300,
    330
];
const $5819da83a926266a$var$spin = (0, styled_components__WEBPACK_IMPORTED_MODULE_2__["keyframes"])`
to {
   transform: rotate(360deg);
 }
`;
const $5819da83a926266a$var$Svg = (0, styled_components__WEBPACK_IMPORTED_MODULE_2__["default"]).svg`
  animation: ${$5819da83a926266a$var$spin} 0.75s steps(12, end) infinite;
  animation-duration: 0.75s;
`;
const $5819da83a926266a$var$Polyline = (0, styled_components__WEBPACK_IMPORTED_MODULE_2__["default"]).polyline`
  stroke-width: ${(props)=>props.width}px;
  stroke-linecap: round;

  &:nth-child(12n + 0) {
    stroke-opacity: 0.08;
  }

  &:nth-child(12n + 1) {
    stroke-opacity: 0.17;
  }

  &:nth-child(12n + 2) {
    stroke-opacity: 0.25;
  }

  &:nth-child(12n + 3) {
    stroke-opacity: 0.33;
  }

  &:nth-child(12n + 4) {
    stroke-opacity: 0.42;
  }

  &:nth-child(12n + 5) {
    stroke-opacity: 0.5;
  }

  &:nth-child(12n + 6) {
    stroke-opacity: 0.58;
  }

  &:nth-child(12n + 7) {
    stroke-opacity: 0.66;
  }

  &:nth-child(12n + 8) {
    stroke-opacity: 0.75;
  }

  &:nth-child(12n + 9) {
    stroke-opacity: 0.83;
  }

  &:nth-child(12n + 11) {
    stroke-opacity: 0.92;
  }
`;
const $5819da83a926266a$export$d20df8773b6b77b5 = ({ strokeColor: strokeColor = (0, $84fda1e7e33cfd28$export$37394b0fa44b998c), strokeWidth: strokeWidth = "5", animationDuration: animationDuration = "0.75", width: width = "96", visible: visible = true, ariaLabel: ariaLabel = "rotating-lines-loading" })=>{
    const lines = (0, react__WEBPACK_IMPORTED_MODULE_1__["useCallback"])(()=>$5819da83a926266a$var$POINTS.map((point)=>// eslint-disable-next-line @typescript-eslint/no-use-before-define
            /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])($5819da83a926266a$var$Polyline, {
                points: "24,12 24,4",
                width: strokeWidth,
                transform: `rotate(${point}, 24, 24)`
            }, point)), [
        strokeWidth
    ]);
    return !visible ? null : /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])($5819da83a926266a$var$Svg, {
        xmlns: (0, $eb040f10400edc38$export$98a285aab16ab26c),
        viewBox: "0 0 48 48",
        width: width,
        stroke: strokeColor,
        speed: animationDuration,
        "data-testid": "rotating-lines-svg",
        "aria-label": ariaLabel,
        ...(0, $84fda1e7e33cfd28$export$6bfda33bcd6c2d18),
        children: lines()
    });
};







const $56d89154a59e79d3$export$f8e5ae7506d65b32 = ({ height: height = 80, width: width = 80, strokeWidth: strokeWidth = 2, radius: radius = 1, color: color = (0, $84fda1e7e33cfd28$export$37394b0fa44b998c), ariaLabel: ariaLabel = "tail-spin-loading", wrapperStyle: wrapperStyle, wrapperClass: wrapperClass, visible: visible = true })=>{
    const strokeWidthNum = parseInt(String(strokeWidth));
    const viewBoxValue = strokeWidthNum + 36;
    const halfStrokeWidth = strokeWidthNum / 2;
    const processedRadius = halfStrokeWidth + parseInt(String(radius)) - 1;
    return /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])((0, $4c3f0b77e8caf06d$export$21d9f1931ef75b56), {
        style: wrapperStyle,
        $visible: visible,
        className: wrapperClass,
        "data-testid": "tail-spin-loading",
        "aria-label": ariaLabel,
        ...(0, $84fda1e7e33cfd28$export$6bfda33bcd6c2d18),
        children: /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("svg", {
            width: width,
            height: height,
            viewBox: `0 0 ${viewBoxValue} ${viewBoxValue}`,
            xmlns: (0, $eb040f10400edc38$export$98a285aab16ab26c),
            "data-testid": "tail-spin-svg",
            children: [
                /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("defs", {
                    children: /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("linearGradient", {
                        x1: "8.042%",
                        y1: "0%",
                        x2: "65.682%",
                        y2: "23.865%",
                        id: "a",
                        children: [
                            /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("stop", {
                                stopColor: color,
                                stopOpacity: "0",
                                offset: "0%"
                            }),
                            /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("stop", {
                                stopColor: color,
                                stopOpacity: ".631",
                                offset: "63.146%"
                            }),
                            /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("stop", {
                                stopColor: color,
                                offset: "100%"
                            })
                        ]
                    })
                }),
                /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("g", {
                    fill: "none",
                    fillRule: "evenodd",
                    children: /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("g", {
                        transform: `translate(${halfStrokeWidth} ${halfStrokeWidth})`,
                        children: [
                            /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
                                d: "M36 18c0-9.94-8.06-18-18-18",
                                id: "Oval-2",
                                stroke: color,
                                strokeWidth: strokeWidth,
                                children: /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("animateTransform", {
                                    attributeName: "transform",
                                    type: "rotate",
                                    from: "0 18 18",
                                    to: "360 18 18",
                                    dur: "0.9s",
                                    repeatCount: "indefinite"
                                })
                            }),
                            /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("circle", {
                                fill: "#fff",
                                cx: "36",
                                cy: "18",
                                r: processedRadius,
                                children: /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("animateTransform", {
                                    attributeName: "transform",
                                    type: "rotate",
                                    from: "0 18 18",
                                    to: "360 18 18",
                                    dur: "0.9s",
                                    repeatCount: "indefinite"
                                })
                            })
                        ]
                    })
                })
            ]
        })
    });
};







const $5cff71254109409f$export$e21573137ccb7f5d = ({ wrapperStyle: wrapperStyle = {}, visible: visible = true, wrapperClass: wrapperClass = "", height: height = 100, width: width = 100, color: color = (0, $84fda1e7e33cfd28$export$37394b0fa44b998c), ariaLabel: ariaLabel = "three-circles-loading", outerCircleColor: outerCircleColor, innerCircleColor: innerCircleColor, middleCircleColor: middleCircleColor })=>{
    return /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])((0, $4c3f0b77e8caf06d$export$21d9f1931ef75b56), {
        style: wrapperStyle,
        $visible: visible,
        className: wrapperClass,
        "data-testid": "three-circles-wrapper",
        "aria-label": ariaLabel,
        ...(0, $84fda1e7e33cfd28$export$6bfda33bcd6c2d18),
        children: /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("svg", {
            version: "1.1",
            height: `${height}`,
            width: `${width}`,
            xmlns: (0, $eb040f10400edc38$export$98a285aab16ab26c),
            viewBox: "0 0 100 100",
            enableBackground: "new 0 0 100 100",
            xmlSpace: "preserve",
            "data-testid": "three-circles-svg",
            children: [
                /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
                    fill: outerCircleColor || color,
                    d: "M31.6,3.5C5.9,13.6-6.6,42.7,3.5,68.4c10.1,25.7,39.2,38.3,64.9,28.1l-3.1-7.9c-21.3,8.4-45.4-2-53.8-23.3 c-8.4-21.3,2-45.4,23.3-53.8L31.6,3.5z",
                    children: /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("animateTransform", {
                        attributeName: "transform",
                        attributeType: "XML",
                        type: "rotate",
                        dur: "2s",
                        from: "0 50 50",
                        to: "360 50 50",
                        repeatCount: "indefinite"
                    })
                }),
                /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
                    fill: middleCircleColor || color,
                    d: "M42.3,39.6c5.7-4.3,13.9-3.1,18.1,2.7c4.3,5.7,3.1,13.9-2.7,18.1l4.1,5.5c8.8-6.5,10.6-19,4.1-27.7 c-6.5-8.8-19-10.6-27.7-4.1L42.3,39.6z",
                    children: /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("animateTransform", {
                        attributeName: "transform",
                        attributeType: "XML",
                        type: "rotate",
                        dur: "1s",
                        from: "0 50 50",
                        to: "-360 50 50",
                        repeatCount: "indefinite"
                    })
                }),
                /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
                    fill: innerCircleColor || color,
                    d: "M82,35.7C74.1,18,53.4,10.1,35.7,18S10.1,46.6,18,64.3l7.6-3.4c-6-13.5,0-29.3,13.5-35.3s29.3,0,35.3,13.5 L82,35.7z",
                    children: /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("animateTransform", {
                        attributeName: "transform",
                        attributeType: "XML",
                        type: "rotate",
                        dur: "2s",
                        from: "0 50 50",
                        to: "360 50 50",
                        repeatCount: "indefinite"
                    })
                })
            ]
        })
    });
};







const $f0c3e3bb3e76d210$export$4bf83b24a11cff0b = ({ height: height = 80, width: width = 80, radius: radius = 9, color: color = (0, $84fda1e7e33cfd28$export$37394b0fa44b998c), ariaLabel: ariaLabel = "three-dots-loading", wrapperStyle: wrapperStyle, wrapperClass: wrapperClass, visible: visible = true })=>/*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])((0, $4c3f0b77e8caf06d$export$21d9f1931ef75b56), {
        style: wrapperStyle,
        $visible: visible,
        className: wrapperClass,
        "data-testid": "three-dots-loading",
        "aria-label": ariaLabel,
        ...(0, $84fda1e7e33cfd28$export$6bfda33bcd6c2d18),
        children: /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("svg", {
            width: width,
            height: height,
            viewBox: "0 0 120 30",
            xmlns: (0, $eb040f10400edc38$export$98a285aab16ab26c),
            fill: color,
            "data-testid": "three-dots-svg",
            children: [
                /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("circle", {
                    cx: "15",
                    cy: "15",
                    r: Number(radius) + 6,
                    children: [
                        /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("animate", {
                            attributeName: "r",
                            from: "15",
                            to: "15",
                            begin: "0s",
                            dur: "0.8s",
                            values: "15;9;15",
                            calcMode: "linear",
                            repeatCount: "indefinite"
                        }),
                        /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("animate", {
                            attributeName: "fill-opacity",
                            from: "1",
                            to: "1",
                            begin: "0s",
                            dur: "0.8s",
                            values: "1;.5;1",
                            calcMode: "linear",
                            repeatCount: "indefinite"
                        })
                    ]
                }),
                /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("circle", {
                    cx: "60",
                    cy: "15",
                    r: radius,
                    attributeName: "fill-opacity",
                    from: "1",
                    to: "0.3",
                    children: [
                        /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("animate", {
                            attributeName: "r",
                            from: "9",
                            to: "9",
                            begin: "0s",
                            dur: "0.8s",
                            values: "9;15;9",
                            calcMode: "linear",
                            repeatCount: "indefinite"
                        }),
                        /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("animate", {
                            attributeName: "fill-opacity",
                            from: "0.5",
                            to: "0.5",
                            begin: "0s",
                            dur: "0.8s",
                            values: ".5;1;.5",
                            calcMode: "linear",
                            repeatCount: "indefinite"
                        })
                    ]
                }),
                /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("circle", {
                    cx: "105",
                    cy: "15",
                    r: Number(radius) + 6,
                    children: [
                        /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("animate", {
                            attributeName: "r",
                            from: "15",
                            to: "15",
                            begin: "0s",
                            dur: "0.8s",
                            values: "15;9;15",
                            calcMode: "linear",
                            repeatCount: "indefinite"
                        }),
                        /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("animate", {
                            attributeName: "fill-opacity",
                            from: "1",
                            to: "1",
                            begin: "0s",
                            dur: "0.8s",
                            values: "1;.5;1",
                            calcMode: "linear",
                            repeatCount: "indefinite"
                        })
                    ]
                })
            ]
        })
    });








const $afa12dd3e98f740f$var$VIEW_BOX_VALUES = "-3 -4 39 39";
const $afa12dd3e98f740f$var$POLYGON_POINTS = "16,0 32,32 0,32";
/** Styles */ const $afa12dd3e98f740f$var$dash = (0, styled_components__WEBPACK_IMPORTED_MODULE_2__["keyframes"])`
to {
   stroke-dashoffset: 136;
 }
`;
const $afa12dd3e98f740f$var$Polygon = (0, styled_components__WEBPACK_IMPORTED_MODULE_2__["default"]).polygon`
  stroke-dasharray: 17;
  animation: ${$afa12dd3e98f740f$var$dash} 2.5s cubic-bezier(0.35, 0.04, 0.63, 0.95) infinite;
`;
const $afa12dd3e98f740f$var$SVG = (0, styled_components__WEBPACK_IMPORTED_MODULE_2__["default"]).svg`
  transform-origin: 50% 65%;
`;
const $afa12dd3e98f740f$export$5a465592bfe74b48 = ({ height: height = 80, width: width = 80, color: color = (0, $84fda1e7e33cfd28$export$37394b0fa44b998c), ariaLabel: ariaLabel = "triangle-loading", wrapperStyle: wrapperStyle, wrapperClass: wrapperClass, visible: visible = true })=>{
    return /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])((0, $4c3f0b77e8caf06d$export$21d9f1931ef75b56), {
        style: wrapperStyle,
        $visible: visible,
        className: `${wrapperClass}`,
        "data-testid": "triangle-loading",
        "aria-label": ariaLabel,
        ...(0, $84fda1e7e33cfd28$export$6bfda33bcd6c2d18),
        children: /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])($afa12dd3e98f740f$var$SVG, {
            id: "triangle",
            width: width,
            height: height,
            xmlns: (0, $eb040f10400edc38$export$98a285aab16ab26c),
            viewBox: $afa12dd3e98f740f$var$VIEW_BOX_VALUES,
            "data-testid": "triangle-svg",
            children: /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])($afa12dd3e98f740f$var$Polygon, {
                fill: "transparent",
                stroke: color,
                strokeWidth: "1",
                points: $afa12dd3e98f740f$var$POLYGON_POINTS
            })
        })
    });
};







const $e3e50827b57d879a$export$4c68f1a79f88778c = ({ height: height = 80, width: width = 80, radius: radius = 48, color: color = (0, $84fda1e7e33cfd28$export$37394b0fa44b998c), ariaLabel: ariaLabel = "watch-loading", wrapperStyle: wrapperStyle, wrapperClass: wrapperClass, visible: visible = true })=>/*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])((0, $4c3f0b77e8caf06d$export$21d9f1931ef75b56), {
        style: wrapperStyle,
        $visible: visible,
        className: wrapperClass,
        "data-testid": "watch-loading",
        "aria-label": ariaLabel,
        ...(0, $84fda1e7e33cfd28$export$6bfda33bcd6c2d18),
        children: /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("svg", {
            width: width,
            height: height,
            version: "1.1",
            id: "L2",
            xmlns: (0, $eb040f10400edc38$export$98a285aab16ab26c),
            x: "0px",
            y: "0px",
            viewBox: "0 0 100 100",
            enableBackground: "new 0 0 100 100",
            xmlSpace: "preserve",
            "data-testid": "watch-svg",
            children: [
                /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("circle", {
                    fill: "none",
                    stroke: color,
                    strokeWidth: "4",
                    strokeMiterlimit: "10",
                    cx: "50",
                    cy: "50",
                    r: radius
                }),
                /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("line", {
                    fill: "none",
                    strokeLinecap: "round",
                    stroke: color,
                    strokeWidth: "4",
                    strokeMiterlimit: "10",
                    x1: "50",
                    y1: "50",
                    x2: "85",
                    y2: "50.5",
                    children: /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("animateTransform", {
                        attributeName: "transform",
                        dur: "2s",
                        type: "rotate",
                        from: "0 50 50",
                        to: "360 50 50",
                        repeatCount: "indefinite"
                    })
                }),
                /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("line", {
                    fill: "none",
                    strokeLinecap: "round",
                    stroke: color,
                    strokeWidth: "4",
                    strokeMiterlimit: "10",
                    x1: "50",
                    y1: "50",
                    x2: "49.5",
                    y2: "74",
                    children: /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("animateTransform", {
                        attributeName: "transform",
                        dur: "15s",
                        type: "rotate",
                        from: "0 50 50",
                        to: "360 50 50",
                        repeatCount: "indefinite"
                    })
                })
            ]
        })
    });






const $b184d2a88a50e3dc$export$1ed1943372cc63a9 = ({ color: color = (0, $84fda1e7e33cfd28$export$37394b0fa44b998c), width: width = "100", visible: visible = true })=>{
    return visible ? /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("svg", {
        xmlns: (0, $eb040f10400edc38$export$98a285aab16ab26c),
        width: width,
        height: width,
        viewBox: "0 0 100 100",
        "data-testid": "falling-lines",
        ...(0, $84fda1e7e33cfd28$export$6bfda33bcd6c2d18),
        children: [
            /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("rect", {
                y: "25",
                width: "10",
                height: "50",
                rx: "4",
                ry: "4",
                fill: color,
                "data-testid": "falling-lines-rect-1",
                children: [
                    /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("animate", {
                        attributeName: "x",
                        values: "10;100",
                        dur: "1.2s",
                        repeatCount: "indefinite"
                    }),
                    /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("animateTransform", {
                        attributeName: "transform",
                        type: "rotate",
                        from: "0 10 70",
                        to: "-60 100 70",
                        dur: "1.2s",
                        repeatCount: "indefinite"
                    }),
                    /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("animate", {
                        attributeName: "opacity",
                        values: "0;1;0",
                        dur: "1.2s",
                        repeatCount: "indefinite"
                    })
                ]
            }),
            /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("rect", {
                y: "25",
                width: "10",
                height: "50",
                rx: "4",
                ry: "4",
                fill: color,
                children: [
                    /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("animate", {
                        attributeName: "x",
                        values: "10;100",
                        dur: "1.2s",
                        begin: "0.4s",
                        repeatCount: "indefinite"
                    }),
                    /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("animateTransform", {
                        attributeName: "transform",
                        type: "rotate",
                        from: "0 10 70",
                        to: "-60 100 70",
                        dur: "1.2s",
                        begin: "0.4s",
                        repeatCount: "indefinite"
                    }),
                    /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("animate", {
                        attributeName: "opacity",
                        values: "0;1;0",
                        dur: "1.2s",
                        begin: "0.4s",
                        repeatCount: "indefinite"
                    })
                ]
            }),
            /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("rect", {
                y: "25",
                width: "10",
                height: "50",
                rx: "4",
                ry: "4",
                fill: color,
                "data-testid": "falling-lines-rect-2",
                children: [
                    /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("animate", {
                        attributeName: "x",
                        values: "10;100",
                        dur: "1.2s",
                        begin: "0.8s",
                        repeatCount: "indefinite"
                    }),
                    /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("animateTransform", {
                        attributeName: "transform",
                        type: "rotate",
                        from: "0 10 70",
                        to: "-60 100 70",
                        dur: "1.2s",
                        begin: "0.8s",
                        repeatCount: "indefinite"
                    }),
                    /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("animate", {
                        attributeName: "opacity",
                        values: "0;1;0",
                        dur: "1.2s",
                        begin: "0.8s",
                        repeatCount: "indefinite"
                    })
                ]
            })
        ]
    }) : null;
};






const $5ad4f4dbdb85103b$export$d25f4198d7ad6c78 = ({ visible: visible = true, height: height = "80", width: width = "80", ariaLabel: ariaLabel = "vortex-loading", wrapperStyle: wrapperStyle, wrapperClass: wrapperClass, colors: colors = [
    "#1B5299",
    "#EF8354",
    "#DB5461",
    "#1B5299",
    "#EF8354",
    "#DB5461"
] })=>{
    return !visible ? null : /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("svg", {
        height: height,
        width: width,
        xmlns: (0, $eb040f10400edc38$export$98a285aab16ab26c),
        viewBox: "0 0 100 100",
        preserveAspectRatio: "xMidYMid",
        "data-testid": "vortex-svg",
        "aria-label": ariaLabel,
        style: wrapperStyle,
        className: wrapperClass,
        ...(0, $84fda1e7e33cfd28$export$6bfda33bcd6c2d18),
        children: /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("g", {
            transform: "translate(50,50)",
            children: /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("g", {
                transform: "scale(0.7)",
                children: /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("g", {
                    transform: "translate(-50,-50)",
                    children: /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("g", {
                        transform: "rotate(137.831 50 50)",
                        children: [
                            /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("animateTransform", {
                                attributeName: "transform",
                                type: "rotate",
                                repeatCount: "indefinite",
                                values: "360 50 50;0 50 50",
                                keyTimes: "0;1",
                                dur: "1",
                                keySplines: "0.5 0.5 0.5 0.5",
                                calcMode: "spline"
                            }),
                            /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
                                fill: colors[0],
                                d: "M30.4,9.7c-7.4,10.9-11.8,23.8-12.3,37.9c0.2,1,0.5,1.9,0.7,2.8c1.4-5.2,3.4-10.3,6.2-15.1 c2.6-4.4,5.6-8.4,9-12c0.7-0.7,1.4-1.4,2.1-2.1c7.4-7,16.4-12,26-14.6C51.5,3.6,40.2,4.9,30.4,9.7z"
                            }),
                            /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
                                fill: colors[1],
                                d: "M24.8,64.2c-2.6-4.4-4.5-9.1-5.9-13.8c-0.3-0.9-0.5-1.9-0.7-2.8c-2.4-9.9-2.2-20.2,0.4-29.8 C10.6,25.5,6,36,5.3,46.8C11,58.6,20,68.9,31.9,76.3c0.9,0.3,1.9,0.5,2.8,0.8C31,73.3,27.6,69,24.8,64.2z"
                            }),
                            /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
                                fill: colors[2],
                                d: "M49.6,78.9c-5.1,0-10.1-0.6-14.9-1.8c-1-0.2-1.9-0.5-2.8-0.8c-9.8-2.9-18.5-8.2-25.6-15.2 c2.8,10.8,9.5,20,18.5,26c13.1,0.9,26.6-1.7,38.9-8.3c0.7-0.7,1.4-1.4,2.1-2.1C60.7,78.2,55.3,78.9,49.6,78.9z"
                            }),
                            /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
                                fill: colors[3],
                                d: "M81.1,49.6c-1.4,5.2-3.4,10.3-6.2,15.1c-2.6,4.4-5.6,8.4-9,12c-0.7,0.7-1.4,1.4-2.1,2.1 c-7.4,7-16.4,12-26,14.6c10.7,3,22.1,1.7,31.8-3.1c7.4-10.9,11.8-23.8,12.3-37.9C81.6,51.5,81.4,50.6,81.1,49.6z"
                            }),
                            /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
                                fill: colors[4],
                                d: "M75.2,12.9c-13.1-0.9-26.6,1.7-38.9,8.3c-0.7,0.7-1.4,1.4-2.1,2.1c5.2-1.4,10.6-2.2,16.2-2.2 c5.1,0,10.1,0.6,14.9,1.8c1,0.2,1.9,0.5,2.8,0.8c9.8,2.9,18.5,8.2,25.6,15.2C90.9,28.1,84.2,18.9,75.2,12.9z"
                            }),
                            /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
                                fill: colors[5],
                                d: "M94.7,53.2C89,41.4,80,31.1,68.1,23.7c-0.9-0.3-1.9-0.5-2.8-0.8c3.8,3.8,7.2,8.1,10,13 c2.6,4.4,4.5,9.1,5.9,13.8c0.3,0.9,0.5,1.9,0.7,2.8c2.4,9.9,2.2,20.2-0.4,29.8C89.4,74.5,94,64,94.7,53.2z"
                            })
                        ]
                    })
                })
            })
        })
    });
};






const $aa2b177fb9ef5dee$export$f64f16a115ce395d = ({ visible: visible = true, height: height = "80", width: width = "80", wrapperClass: wrapperClass = "", wrapperStyle: wrapperStyle = {}, ariaLabel: ariaLabel = "rotating-triangle-loading", colors: colors = [
    "#1B5299",
    "#EF8354",
    "#DB5461"
] })=>{
    return !visible ? null : /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("svg", {
        width: width,
        height: height,
        xmlns: (0, $eb040f10400edc38$export$98a285aab16ab26c),
        viewBox: "0 0 100 100",
        preserveAspectRatio: "xMidYMid",
        className: wrapperClass,
        style: wrapperStyle,
        "aria-label": ariaLabel,
        "data-testid": "rotating-triangle-svg",
        ...(0, $84fda1e7e33cfd28$export$6bfda33bcd6c2d18),
        children: /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("g", {
            transform: "translate(50,42)",
            children: /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("g", {
                transform: "scale(0.8)",
                children: /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("g", {
                    transform: "translate(-50,-50)",
                    children: [
                        /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("polygon", {
                            points: "72.5,50 50,11 27.5,50 50,50",
                            fill: colors[0],
                            transform: "rotate(186 50 38.5)",
                            children: /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("animateTransform", {
                                attributeName: "transform",
                                type: "rotate",
                                calcMode: "linear",
                                values: "0 50 38.5;360 50 38.5",
                                keyTimes: "0;1",
                                dur: "1s",
                                begin: "0s",
                                repeatCount: "indefinite"
                            })
                        }),
                        /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("polygon", {
                            points: "5,89 50,89 27.5,50",
                            fill: colors[1],
                            transform: "rotate(186 27.5 77.5)",
                            children: /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("animateTransform", {
                                attributeName: "transform",
                                type: "rotate",
                                calcMode: "linear",
                                values: "0 27.5 77.5;360 27.5 77.5",
                                keyTimes: "0;1",
                                dur: "1s",
                                begin: "0s",
                                repeatCount: "indefinite"
                            })
                        }),
                        /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("polygon", {
                            points: "72.5,50 50,89 95,89",
                            fill: colors[2],
                            transform: "rotate(186 72.2417 77.5)",
                            children: /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("animateTransform", {
                                attributeName: "transform",
                                type: "rotate",
                                calcMode: "linear",
                                values: "0 72.5 77.5;360 72 77.5",
                                keyTimes: "0;1",
                                dur: "1s",
                                begin: "0s",
                                repeatCount: "indefinite"
                            })
                        })
                    ]
                })
            })
        })
    });
};






const $daf95de783b7b8b1$export$d7b12c4107be0d61 = ({ visible: visible = true, height: height = "80", width: width = "80", wrapperClass: wrapperClass = "", wrapperStyle: wrapperStyle = {}, ariaLabel: ariaLabel = "radio-loading", colors: colors = [
    (0, $84fda1e7e33cfd28$export$37394b0fa44b998c),
    (0, $84fda1e7e33cfd28$export$37394b0fa44b998c),
    (0, $84fda1e7e33cfd28$export$37394b0fa44b998c)
] })=>{
    return !visible ? null : /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("svg", {
        width: width,
        height: height,
        xmlns: (0, $eb040f10400edc38$export$98a285aab16ab26c),
        viewBox: "0 0 100 100",
        preserveAspectRatio: "xMidYMid",
        className: wrapperClass,
        style: wrapperStyle,
        "aria-label": ariaLabel,
        "data-testid": "radio-bar-svg",
        ...(0, $84fda1e7e33cfd28$export$6bfda33bcd6c2d18),
        children: [
            /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("circle", {
                cx: "28",
                cy: "75",
                r: "11",
                fill: colors[0],
                children: /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("animate", {
                    attributeName: "fill-opacity",
                    calcMode: "linear",
                    values: "0;1;1",
                    keyTimes: "0;0.2;1",
                    dur: "1",
                    begin: "0s",
                    repeatCount: "indefinite"
                })
            }),
            /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
                d: "M28 47A28 28 0 0 1 56 75",
                fill: "none",
                strokeWidth: "10",
                stroke: colors[1],
                children: /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("animate", {
                    attributeName: "stroke-opacity",
                    calcMode: "linear",
                    values: "0;1;1",
                    keyTimes: "0;0.2;1",
                    dur: "1",
                    begin: "0.1s",
                    repeatCount: "indefinite"
                })
            }),
            /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
                d: "M28 25A50 50 0 0 1 78 75",
                fill: "none",
                strokeWidth: "10",
                stroke: colors[2],
                children: /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("animate", {
                    attributeName: "stroke-opacity",
                    calcMode: "linear",
                    values: "0;1;1",
                    keyTimes: "0;0.2;1",
                    dur: "1",
                    begin: "0.2s",
                    repeatCount: "indefinite"
                })
            })
        ]
    });
};






const $075a2f0ea0d9df8a$export$c17561cb55d4db30 = ({ visible: visible = true, height: height = "80", width: width = "80", wrapperClass: wrapperClass = "", wrapperStyle: wrapperStyle = {}, ariaLabel: ariaLabel = "progress-bar-loading", borderColor: borderColor = "#F4442E", barColor: barColor = "#51E5FF" })=>{
    return !visible ? null : /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("svg", {
        width: width,
        height: height,
        xmlns: (0, $eb040f10400edc38$export$98a285aab16ab26c),
        viewBox: "0 0 100 100",
        preserveAspectRatio: "xMidYMid",
        className: wrapperClass,
        style: wrapperStyle,
        "aria-label": ariaLabel,
        "data-testid": "progress-bar-svg",
        ...(0, $84fda1e7e33cfd28$export$6bfda33bcd6c2d18),
        children: [
            /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("defs", {
                children: /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("clipPath", {
                    x: "0",
                    y: "0",
                    width: "100",
                    height: "100",
                    id: "lds-progress-cpid-5009611b8a418",
                    children: /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("rect", {
                        x: "0",
                        y: "0",
                        width: "66.6667",
                        height: "100",
                        children: [
                            /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("animate", {
                                attributeName: "width",
                                calcMode: "linear",
                                values: "0;100;100",
                                keyTimes: "0;0.5;1",
                                dur: "1",
                                begin: "0s",
                                repeatCount: "indefinite"
                            }),
                            /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("animate", {
                                attributeName: "x",
                                calcMode: "linear",
                                values: "0;0;100",
                                keyTimes: "0;0.5;1",
                                dur: "1",
                                begin: "0s",
                                repeatCount: "indefinite"
                            })
                        ]
                    })
                })
            }),
            /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
                fill: "none",
                strokeWidth: "2.7928",
                d: "M82,63H18c-7.2,0-13-5.8-13-13v0c0-7.2,5.8-13,13-13h64c7.2,0,13,5.8,13,13v0C95,57.2,89.2,63,82,63z",
                stroke: borderColor
            }),
            /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
                d: "M81.3,58.7H18.7c-4.8,0-8.7-3.9-8.7-8.7v0c0-4.8,3.9-8.7,8.7-8.7h62.7c4.8,0,8.7,3.9,8.7,8.7v0C90,54.8,86.1,58.7,81.3,58.7z",
                fill: barColor,
                clipPath: "url(#lds-progress-cpid-5009611b8a418)"
            })
        ]
    });
};






const $db94311ffb982ec6$export$bdf537af43a20db5 = ({ visible: visible = true, height: height = "80", width: width = "80", wrapperClass: wrapperClass = "", wrapperStyle: wrapperStyle = {}, ariaLabel: ariaLabel = "magnifying-glass-loading", glassColor: glassColor = "#c0efff", color: color = "#e15b64" })=>{
    return !visible ? null : /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("svg", {
        width: width,
        height: height,
        xmlns: (0, $eb040f10400edc38$export$98a285aab16ab26c),
        viewBox: "0 0 100 100",
        preserveAspectRatio: "xMidYMid",
        className: wrapperClass,
        style: wrapperStyle,
        "aria-label": ariaLabel,
        "data-testid": "magnifying-glass-svg",
        ...(0, $84fda1e7e33cfd28$export$6bfda33bcd6c2d18),
        children: /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("g", {
            transform: "translate(50,50)",
            children: /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("g", {
                transform: "scale(0.82)",
                children: /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("g", {
                    transform: "translate(-50,-50)",
                    children: /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("g", {
                        transform: "translate(16.3636 -20)",
                        children: [
                            /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("animateTransform", {
                                attributeName: "transform",
                                type: "translate",
                                calcMode: "linear",
                                values: "-20 -20;20 -20;0 20;-20 -20",
                                keyTimes: "0;0.33;0.66;1",
                                dur: "1s",
                                begin: "0s",
                                repeatCount: "indefinite"
                            }),
                            /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
                                d: "M44.19,26.158c-4.817,0-9.345,1.876-12.751,5.282c-3.406,3.406-5.282,7.934-5.282,12.751 c0,4.817,1.876,9.345,5.282,12.751c3.406,3.406,7.934,5.282,12.751,5.282s9.345-1.876,12.751-5.282 c3.406-3.406,5.282-7.934,5.282-12.751c0-4.817-1.876-9.345-5.282-12.751C53.536,28.033,49.007,26.158,44.19,26.158z",
                                fill: glassColor
                            }),
                            /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
                                d: "M78.712,72.492L67.593,61.373l-3.475-3.475c1.621-2.352,2.779-4.926,3.475-7.596c1.044-4.008,1.044-8.23,0-12.238 c-1.048-4.022-3.146-7.827-6.297-10.979C56.572,22.362,50.381,20,44.19,20C38,20,31.809,22.362,27.085,27.085 c-9.447,9.447-9.447,24.763,0,34.21C31.809,66.019,38,68.381,44.19,68.381c4.798,0,9.593-1.425,13.708-4.262l9.695,9.695 l4.899,4.899C73.351,79.571,74.476,80,75.602,80s2.251-0.429,3.11-1.288C80.429,76.994,80.429,74.209,78.712,72.492z M56.942,56.942 c-3.406,3.406-7.934,5.282-12.751,5.282s-9.345-1.876-12.751-5.282c-3.406-3.406-5.282-7.934-5.282-12.751 c0-4.817,1.876-9.345,5.282-12.751c3.406-3.406,7.934-5.282,12.751-5.282c4.817,0,9.345,1.876,12.751,5.282 c3.406,3.406,5.282,7.934,5.282,12.751C62.223,49.007,60.347,53.536,56.942,56.942z",
                                fill: color
                            })
                        ]
                    })
                })
            })
        })
    });
};






const $1d8c9163e13b7bf7$export$8e3fad5cade57efa = ({ width: width = "80", height: height = "80", backgroundColor: backgroundColor = (0, $84fda1e7e33cfd28$export$37394b0fa44b998c), ballColors: ballColors = [
    "#fc636b",
    "#6a67ce",
    "#ffb900"
], wrapperClass: wrapperClass = "", wrapperStyle: wrapperStyle = {}, ariaLabel: ariaLabel = "fidget-spinner-loader", visible: visible = true })=>{
    return !visible ? null : /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("svg", {
        width: width,
        height: height,
        xmlns: (0, $eb040f10400edc38$export$98a285aab16ab26c),
        viewBox: "0 0 100 100",
        preserveAspectRatio: "xMidYMid",
        className: wrapperClass,
        style: wrapperStyle,
        "aria-label": ariaLabel,
        "data-testid": "fidget-spinner-svg",
        ...(0, $84fda1e7e33cfd28$export$6bfda33bcd6c2d18),
        children: /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("g", {
            transform: "rotate(6 50 50)",
            children: [
                /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("g", {
                    transform: "translate(50 50)",
                    children: /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("g", {
                        transform: "scale(0.9)",
                        children: /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("g", {
                            transform: "translate(-50 -58)",
                            children: [
                                /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
                                    d: "M27.1,79.4c-1.1,0.6-2.4,1-3.7,1c-2.6,0-5.1-1.4-6.4-3.7c-2-3.5-0.8-8,2.7-10.1c1.1-0.6,2.4-1,3.7-1c2.6,0,5.1,1.4,6.4,3.7 C31.8,72.9,30.6,77.4,27.1,79.4z",
                                    fill: ballColors[0]
                                }),
                                /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
                                    d: "M72.9,79.4c1.1,0.6,2.4,1,3.7,1c2.6,0,5.1-1.4,6.4-3.7c2-3.5,0.8-8-2.7-10.1c-1.1-0.6-2.4-1-3.7-1c-2.6,0-5.1,1.4-6.4,3.7 C68.2,72.9,69.4,77.4,72.9,79.4z",
                                    fill: ballColors[1]
                                }),
                                /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("circle", {
                                    cx: "50",
                                    cy: "27",
                                    r: "7.4",
                                    fill: ballColors[2]
                                }),
                                /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
                                    d: "M86.5,57.5c-3.1-1.9-6.4-2.8-9.8-2.8c-0.5,0-0.9,0-1.4,0c-0.4,0-0.8,0-1.1,0c-2.1,0-4.2-0.4-6.2-1.2 c-0.8-3.6-2.8-6.9-5.4-9.3c0.4-2.5,1.3-4.8,2.7-6.9c2-2.9,3.2-6.5,3.2-10.4c0-10.2-8.2-18.4-18.4-18.4c-0.3,0-0.6,0-0.9,0 C39.7,9,32,16.8,31.6,26.2c-0.2,4.1,1,7.9,3.2,11c1.4,2.1,2.3,4.5,2.7,6.9c-2.6,2.5-4.6,5.7-5.4,9.3c-1.9,0.7-4,1.1-6.1,1.1 c-0.4,0-0.8,0-1.2,0c-0.5,0-0.9-0.1-1.4-0.1c-3.1,0-6.3,0.8-9.2,2.5c-9.1,5.2-12,17-6.3,25.9c3.5,5.4,9.5,8.4,15.6,8.4 c2.9,0,5.8-0.7,8.5-2.1c3.6-1.9,6.3-4.9,8-8.3c1.1-2.3,2.7-4.2,4.6-5.8c1.7,0.5,3.5,0.8,5.4,0.8c1.9,0,3.7-0.3,5.4-0.8 c1.9,1.6,3.5,3.5,4.6,5.7c1.5,3.2,4,6,7.4,8c2.9,1.7,6.1,2.5,9.2,2.5c6.6,0,13.1-3.6,16.4-10C97.3,73.1,94.4,62.5,86.5,57.5z M29.6,83.7c-1.9,1.1-4,1.6-6.1,1.6c-4.2,0-8.4-2.2-10.6-6.1c-3.4-5.9-1.4-13.4,4.5-16.8c1.9-1.1,4-1.6,6.1-1.6 c4.2,0,8.4,2.2,10.6,6.1C37.5,72.8,35.4,80.3,29.6,83.7z M50,39.3c-6.8,0-12.3-5.5-12.3-12.3S43.2,14.7,50,14.7 c6.8,0,12.3,5.5,12.3,12.3S56.8,39.3,50,39.3z M87.2,79.2c-2.3,3.9-6.4,6.1-10.6,6.1c-2.1,0-4.2-0.5-6.1-1.6 c-5.9-3.4-7.9-10.9-4.5-16.8c2.3-3.9,6.4-6.1,10.6-6.1c2.1,0,4.2,0.5,6.1,1.6C88.6,65.8,90.6,73.3,87.2,79.2z",
                                    fill: backgroundColor
                                })
                            ]
                        })
                    })
                }),
                /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("animateTransform", {
                    attributeName: "transform",
                    type: "rotate",
                    calcMode: "linear",
                    values: "0 50 50;360 50 50",
                    keyTimes: "0;1",
                    dur: "1s",
                    begin: "0s",
                    repeatCount: "indefinite"
                })
            ]
        })
    });
};






const $bb8e4335d7ee0654$export$bee07fdc425df572 = ({ visible: visible = true, width: width = "80", height: height = "80", wrapperClass: wrapperClass = "", wrapperStyle: wrapperStyle = {}, ariaLabel: ariaLabel = "dna-loading" })=>{
    return !visible ? null : /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("svg", {
        xmlns: (0, $eb040f10400edc38$export$98a285aab16ab26c),
        width: width,
        height: height,
        viewBox: "0 0 100 100",
        preserveAspectRatio: "xMidYMid",
        className: wrapperClass,
        style: wrapperStyle,
        "aria-label": ariaLabel,
        "data-testid": "dna-svg",
        ...(0, $84fda1e7e33cfd28$export$6bfda33bcd6c2d18),
        children: [
            /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("circle", {
                cx: "6.451612903225806",
                cy: "60.6229",
                r: "3.41988",
                fill: "rgba(233, 12, 89, 0.5125806451612902)",
                children: [
                    /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("animate", {
                        attributeName: "r",
                        keyTimes: "0;0.5;1",
                        values: "2.4000000000000004;3.5999999999999996;2.4000000000000004",
                        dur: "2s",
                        repeatCount: "indefinite",
                        begin: "-0.5s"
                    }),
                    /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("animate", {
                        attributeName: "cy",
                        keyTimes: "0;0.5;1",
                        values: "30.5;69.5;30.5",
                        dur: "2s",
                        repeatCount: "indefinite",
                        begin: "0s",
                        keySplines: "0.5 0 0.5 1;0.5 0 0.5 1",
                        calcMode: "spline"
                    }),
                    /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("animate", {
                        attributeName: "fill",
                        keyTimes: "0;0.5;1",
                        values: "rgba(233, 12, 89, 0.5125806451612902);#ff0033;rgba(233, 12, 89, 0.5125806451612902)",
                        dur: "2s",
                        repeatCount: "indefinite",
                        begin: "-0.5s"
                    })
                ]
            }),
            /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("circle", {
                cx: "6.451612903225806",
                cy: "39.3771",
                r: "2.58012",
                fill: "#46dff0",
                children: [
                    /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("animate", {
                        attributeName: "r",
                        keyTimes: "0;0.5;1",
                        values: "2.4000000000000004;3.5999999999999996;2.4000000000000004",
                        dur: "2s",
                        repeatCount: "indefinite",
                        begin: "-1.5s"
                    }),
                    /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("animate", {
                        attributeName: "cy",
                        keyTimes: "0;0.5;1",
                        values: "30.5;69.5;30.5",
                        dur: "2s",
                        repeatCount: "indefinite",
                        begin: "-1s",
                        keySplines: "0.5 0 0.5 1;0.5 0 0.5 1",
                        calcMode: "spline"
                    }),
                    /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("animate", {
                        attributeName: "fill",
                        keyTimes: "0;0.5;1",
                        values: "#46dff0;rgba(53, 58, 57, 0.1435483870967742);#46dff0",
                        dur: "2s",
                        repeatCount: "indefinite",
                        begin: "-0.5s"
                    })
                ]
            }),
            /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("circle", {
                cx: "16.129032258064512",
                cy: "68.1552",
                r: "3.17988",
                fill: "rgba(233, 12, 89, 0.5125806451612902)",
                children: [
                    /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("animate", {
                        attributeName: "r",
                        keyTimes: "0;0.5;1",
                        values: "2.4000000000000004;3.5999999999999996;2.4000000000000004",
                        dur: "2s",
                        repeatCount: "indefinite",
                        begin: "-0.7s"
                    }),
                    /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("animate", {
                        attributeName: "cy",
                        keyTimes: "0;0.5;1",
                        values: "30.5;69.5;30.5",
                        dur: "2s",
                        repeatCount: "indefinite",
                        begin: "-0.2s",
                        keySplines: "0.5 0 0.5 1;0.5 0 0.5 1",
                        calcMode: "spline"
                    }),
                    /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("animate", {
                        attributeName: "fill",
                        keyTimes: "0;0.5;1",
                        values: "rgba(233, 12, 89, 0.5125806451612902);#ff0033;rgba(233, 12, 89, 0.5125806451612902)",
                        dur: "2s",
                        repeatCount: "indefinite",
                        begin: "-0.7s"
                    })
                ]
            }),
            /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("circle", {
                cx: "16.129032258064512",
                cy: "31.8448",
                r: "2.82012",
                fill: "#46dff0",
                children: [
                    /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("animate", {
                        attributeName: "r",
                        keyTimes: "0;0.5;1",
                        values: "2.4000000000000004;3.5999999999999996;2.4000000000000004",
                        dur: "2s",
                        repeatCount: "indefinite",
                        begin: "-1.7s"
                    }),
                    /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("animate", {
                        attributeName: "cy",
                        keyTimes: "0;0.5;1",
                        values: "30.5;69.5;30.5",
                        dur: "2s",
                        repeatCount: "indefinite",
                        begin: "-1.2s",
                        keySplines: "0.5 0 0.5 1;0.5 0 0.5 1",
                        calcMode: "spline"
                    }),
                    /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("animate", {
                        attributeName: "fill",
                        keyTimes: "0;0.5;1",
                        values: "#46dff0;rgba(53, 58, 57, 0.1435483870967742);#46dff0",
                        dur: "2s",
                        repeatCount: "indefinite",
                        begin: "-0.7s"
                    })
                ]
            }),
            /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("circle", {
                cx: "25.806451612903224",
                cy: "69.3634",
                r: "2.93988",
                fill: "rgba(233, 12, 89, 0.5125806451612902)",
                children: [
                    /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("animate", {
                        attributeName: "r",
                        keyTimes: "0;0.5;1",
                        values: "2.4000000000000004;3.5999999999999996;2.4000000000000004",
                        dur: "2s",
                        repeatCount: "indefinite",
                        begin: "-0.9s"
                    }),
                    /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("animate", {
                        attributeName: "cy",
                        keyTimes: "0;0.5;1",
                        values: "30.5;69.5;30.5",
                        dur: "2s",
                        repeatCount: "indefinite",
                        begin: "-0.4s",
                        keySplines: "0.5 0 0.5 1;0.5 0 0.5 1",
                        calcMode: "spline"
                    }),
                    /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("animate", {
                        attributeName: "fill",
                        keyTimes: "0;0.5;1",
                        values: "rgba(233, 12, 89, 0.5125806451612902);#ff0033;rgba(233, 12, 89, 0.5125806451612902)",
                        dur: "2s",
                        repeatCount: "indefinite",
                        begin: "-0.9s"
                    })
                ]
            }),
            /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("circle", {
                cx: "25.806451612903224",
                cy: "30.6366",
                r: "3.06012",
                fill: "#46dff0",
                children: [
                    /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("animate", {
                        attributeName: "r",
                        keyTimes: "0;0.5;1",
                        values: "2.4000000000000004;3.5999999999999996;2.4000000000000004",
                        dur: "2s",
                        repeatCount: "indefinite",
                        begin: "-1.9s"
                    }),
                    /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("animate", {
                        attributeName: "cy",
                        keyTimes: "0;0.5;1",
                        values: "30.5;69.5;30.5",
                        dur: "2s",
                        repeatCount: "indefinite",
                        begin: "-1.4s",
                        keySplines: "0.5 0 0.5 1;0.5 0 0.5 1",
                        calcMode: "spline"
                    }),
                    /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("animate", {
                        attributeName: "fill",
                        keyTimes: "0;0.5;1",
                        values: "#46dff0;rgba(53, 58, 57, 0.1435483870967742);#46dff0",
                        dur: "2s",
                        repeatCount: "indefinite",
                        begin: "-0.9s"
                    })
                ]
            }),
            /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("circle", {
                cx: "35.48387096774193",
                cy: "65.3666",
                r: "2.69988",
                fill: "rgba(233, 12, 89, 0.5125806451612902)",
                children: [
                    /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("animate", {
                        attributeName: "r",
                        keyTimes: "0;0.5;1",
                        values: "2.4000000000000004;3.5999999999999996;2.4000000000000004",
                        dur: "2s",
                        repeatCount: "indefinite",
                        begin: "-1.1s"
                    }),
                    /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("animate", {
                        attributeName: "cy",
                        keyTimes: "0;0.5;1",
                        values: "30.5;69.5;30.5",
                        dur: "2s",
                        repeatCount: "indefinite",
                        begin: "-0.6s",
                        keySplines: "0.5 0 0.5 1;0.5 0 0.5 1",
                        calcMode: "spline"
                    }),
                    /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("animate", {
                        attributeName: "fill",
                        keyTimes: "0;0.5;1",
                        values: "rgba(233, 12, 89, 0.5125806451612902);#ff0033;rgba(233, 12, 89, 0.5125806451612902)",
                        dur: "2s",
                        repeatCount: "indefinite",
                        begin: "-1.1s"
                    })
                ]
            }),
            /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("circle", {
                cx: "35.48387096774193",
                cy: "34.6334",
                r: "3.30012",
                fill: "#46dff0",
                children: [
                    /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("animate", {
                        attributeName: "r",
                        keyTimes: "0;0.5;1",
                        values: "2.4000000000000004;3.5999999999999996;2.4000000000000004",
                        dur: "2s",
                        repeatCount: "indefinite",
                        begin: "-2.1s"
                    }),
                    /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("animate", {
                        attributeName: "cy",
                        keyTimes: "0;0.5;1",
                        values: "30.5;69.5;30.5",
                        dur: "2s",
                        repeatCount: "indefinite",
                        begin: "-1.6s",
                        keySplines: "0.5 0 0.5 1;0.5 0 0.5 1",
                        calcMode: "spline"
                    }),
                    /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("animate", {
                        attributeName: "fill",
                        keyTimes: "0;0.5;1",
                        values: "#46dff0;rgba(53, 58, 57, 0.1435483870967742);#46dff0",
                        dur: "2s",
                        repeatCount: "indefinite",
                        begin: "-1.1s"
                    })
                ]
            }),
            /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("circle", {
                cx: "45.16129032258064",
                cy: "53.8474",
                r: "2.45988",
                fill: "rgba(233, 12, 89, 0.5125806451612902)",
                children: [
                    /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("animate", {
                        attributeName: "r",
                        keyTimes: "0;0.5;1",
                        values: "2.4000000000000004;3.5999999999999996;2.4000000000000004",
                        dur: "2s",
                        repeatCount: "indefinite",
                        begin: "-1.3s"
                    }),
                    /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("animate", {
                        attributeName: "cy",
                        keyTimes: "0;0.5;1",
                        values: "30.5;69.5;30.5",
                        dur: "2s",
                        repeatCount: "indefinite",
                        begin: "-0.8s",
                        keySplines: "0.5 0 0.5 1;0.5 0 0.5 1",
                        calcMode: "spline"
                    }),
                    /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("animate", {
                        attributeName: "fill",
                        keyTimes: "0;0.5;1",
                        values: "rgba(233, 12, 89, 0.5125806451612902);#ff0033;rgba(233, 12, 89, 0.5125806451612902)",
                        dur: "2s",
                        repeatCount: "indefinite",
                        begin: "-1.3s"
                    })
                ]
            }),
            /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("circle", {
                cx: "45.16129032258064",
                cy: "46.1526",
                r: "3.54012",
                fill: "#46dff0",
                children: [
                    /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("animate", {
                        attributeName: "r",
                        keyTimes: "0;0.5;1",
                        values: "2.4000000000000004;3.5999999999999996;2.4000000000000004",
                        dur: "2s",
                        repeatCount: "indefinite",
                        begin: "-2.3s"
                    }),
                    /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("animate", {
                        attributeName: "cy",
                        keyTimes: "0;0.5;1",
                        values: "30.5;69.5;30.5",
                        dur: "2s",
                        repeatCount: "indefinite",
                        begin: "-1.8s",
                        keySplines: "0.5 0 0.5 1;0.5 0 0.5 1",
                        calcMode: "spline"
                    }),
                    /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("animate", {
                        attributeName: "fill",
                        keyTimes: "0;0.5;1",
                        values: "#46dff0;rgba(53, 58, 57, 0.1435483870967742);#46dff0",
                        dur: "2s",
                        repeatCount: "indefinite",
                        begin: "-1.3s"
                    })
                ]
            }),
            /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("circle", {
                cx: "54.838709677419345",
                cy: "39.3771",
                r: "2.58012",
                fill: "rgba(233, 12, 89, 0.5125806451612902)",
                children: [
                    /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("animate", {
                        attributeName: "r",
                        keyTimes: "0;0.5;1",
                        values: "2.4000000000000004;3.5999999999999996;2.4000000000000004",
                        dur: "2s",
                        repeatCount: "indefinite",
                        begin: "-1.5s"
                    }),
                    /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("animate", {
                        attributeName: "cy",
                        keyTimes: "0;0.5;1",
                        values: "30.5;69.5;30.5",
                        dur: "2s",
                        repeatCount: "indefinite",
                        begin: "-1s",
                        keySplines: "0.5 0 0.5 1;0.5 0 0.5 1",
                        calcMode: "spline"
                    }),
                    /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("animate", {
                        attributeName: "fill",
                        keyTimes: "0;0.5;1",
                        values: "rgba(233, 12, 89, 0.5125806451612902);#ff0033;rgba(233, 12, 89, 0.5125806451612902)",
                        dur: "2s",
                        repeatCount: "indefinite",
                        begin: "-1.5s"
                    })
                ]
            }),
            /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("circle", {
                cx: "54.838709677419345",
                cy: "60.6229",
                r: "3.41988",
                fill: "#46dff0",
                children: [
                    /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("animate", {
                        attributeName: "r",
                        keyTimes: "0;0.5;1",
                        values: "2.4000000000000004;3.5999999999999996;2.4000000000000004",
                        dur: "2s",
                        repeatCount: "indefinite",
                        begin: "-2.5s"
                    }),
                    /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("animate", {
                        attributeName: "cy",
                        keyTimes: "0;0.5;1",
                        values: "30.5;69.5;30.5",
                        dur: "2s",
                        repeatCount: "indefinite",
                        begin: "-2s",
                        keySplines: "0.5 0 0.5 1;0.5 0 0.5 1",
                        calcMode: "spline"
                    }),
                    /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("animate", {
                        attributeName: "fill",
                        keyTimes: "0;0.5;1",
                        values: "#46dff0;rgba(53, 58, 57, 0.1435483870967742);#46dff0",
                        dur: "2s",
                        repeatCount: "indefinite",
                        begin: "-1.5s"
                    })
                ]
            }),
            /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("circle", {
                cx: "64.51612903225805",
                cy: "31.8448",
                r: "2.82012",
                fill: "rgba(233, 12, 89, 0.5125806451612902)",
                children: [
                    /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("animate", {
                        attributeName: "r",
                        keyTimes: "0;0.5;1",
                        values: "2.4000000000000004;3.5999999999999996;2.4000000000000004",
                        dur: "2s",
                        repeatCount: "indefinite",
                        begin: "-1.7s"
                    }),
                    /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("animate", {
                        attributeName: "cy",
                        keyTimes: "0;0.5;1",
                        values: "30.5;69.5;30.5",
                        dur: "2s",
                        repeatCount: "indefinite",
                        begin: "-1.2s",
                        keySplines: "0.5 0 0.5 1;0.5 0 0.5 1",
                        calcMode: "spline"
                    }),
                    /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("animate", {
                        attributeName: "fill",
                        keyTimes: "0;0.5;1",
                        values: "rgba(233, 12, 89, 0.5125806451612902);#ff0033;rgba(233, 12, 89, 0.5125806451612902)",
                        dur: "2s",
                        repeatCount: "indefinite",
                        begin: "-1.7s"
                    })
                ]
            }),
            /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("circle", {
                cx: "64.51612903225805",
                cy: "68.1552",
                r: "3.17988",
                fill: "#46dff0",
                children: [
                    /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("animate", {
                        attributeName: "r",
                        keyTimes: "0;0.5;1",
                        values: "2.4000000000000004;3.5999999999999996;2.4000000000000004",
                        dur: "2s",
                        repeatCount: "indefinite",
                        begin: "-2.7s"
                    }),
                    /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("animate", {
                        attributeName: "cy",
                        keyTimes: "0;0.5;1",
                        values: "30.5;69.5;30.5",
                        dur: "2s",
                        repeatCount: "indefinite",
                        begin: "-2.2s",
                        keySplines: "0.5 0 0.5 1;0.5 0 0.5 1",
                        calcMode: "spline"
                    }),
                    /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("animate", {
                        attributeName: "fill",
                        keyTimes: "0;0.5;1",
                        values: "#46dff0;rgba(53, 58, 57, 0.1435483870967742);#46dff0",
                        dur: "2s",
                        repeatCount: "indefinite",
                        begin: "-1.7s"
                    })
                ]
            }),
            /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("circle", {
                cx: "74.19354838709677",
                cy: "30.6366",
                r: "3.06012",
                fill: "rgba(233, 12, 89, 0.5125806451612902)",
                children: [
                    /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("animate", {
                        attributeName: "r",
                        keyTimes: "0;0.5;1",
                        values: "2.4000000000000004;3.5999999999999996;2.4000000000000004",
                        dur: "2s",
                        repeatCount: "indefinite",
                        begin: "-1.9s"
                    }),
                    /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("animate", {
                        attributeName: "cy",
                        keyTimes: "0;0.5;1",
                        values: "30.5;69.5;30.5",
                        dur: "2s",
                        repeatCount: "indefinite",
                        begin: "-1.4s",
                        keySplines: "0.5 0 0.5 1;0.5 0 0.5 1",
                        calcMode: "spline"
                    }),
                    /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("animate", {
                        attributeName: "fill",
                        keyTimes: "0;0.5;1",
                        values: "rgba(233, 12, 89, 0.5125806451612902);#ff0033;rgba(233, 12, 89, 0.5125806451612902)",
                        dur: "2s",
                        repeatCount: "indefinite",
                        begin: "-1.9s"
                    })
                ]
            }),
            /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("circle", {
                cx: "74.19354838709677",
                cy: "69.3634",
                r: "2.93988",
                fill: "#46dff0",
                children: [
                    /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("animate", {
                        attributeName: "r",
                        keyTimes: "0;0.5;1",
                        values: "2.4000000000000004;3.5999999999999996;2.4000000000000004",
                        dur: "2s",
                        repeatCount: "indefinite",
                        begin: "-2.9s"
                    }),
                    /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("animate", {
                        attributeName: "cy",
                        keyTimes: "0;0.5;1",
                        values: "30.5;69.5;30.5",
                        dur: "2s",
                        repeatCount: "indefinite",
                        begin: "-2.4s",
                        keySplines: "0.5 0 0.5 1;0.5 0 0.5 1",
                        calcMode: "spline"
                    }),
                    /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("animate", {
                        attributeName: "fill",
                        keyTimes: "0;0.5;1",
                        values: "#46dff0;rgba(53, 58, 57, 0.1435483870967742);#46dff0",
                        dur: "2s",
                        repeatCount: "indefinite",
                        begin: "-1.9s"
                    })
                ]
            }),
            /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("circle", {
                cx: "83.87096774193547",
                cy: "34.6334",
                r: "3.30012",
                fill: "rgba(233, 12, 89, 0.5125806451612902)",
                children: [
                    /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("animate", {
                        attributeName: "r",
                        keyTimes: "0;0.5;1",
                        values: "2.4000000000000004;3.5999999999999996;2.4000000000000004",
                        dur: "2s",
                        repeatCount: "indefinite",
                        begin: "-2.1s"
                    }),
                    /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("animate", {
                        attributeName: "cy",
                        keyTimes: "0;0.5;1",
                        values: "30.5;69.5;30.5",
                        dur: "2s",
                        repeatCount: "indefinite",
                        begin: "-1.6s",
                        keySplines: "0.5 0 0.5 1;0.5 0 0.5 1",
                        calcMode: "spline"
                    }),
                    /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("animate", {
                        attributeName: "fill",
                        keyTimes: "0;0.5;1",
                        values: "rgba(233, 12, 89, 0.5125806451612902);#ff0033;rgba(233, 12, 89, 0.5125806451612902)",
                        dur: "2s",
                        repeatCount: "indefinite",
                        begin: "-2.1s"
                    })
                ]
            }),
            /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("circle", {
                cx: "83.87096774193547",
                cy: "65.3666",
                r: "2.69988",
                fill: "#46dff0",
                children: [
                    /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("animate", {
                        attributeName: "r",
                        keyTimes: "0;0.5;1",
                        values: "2.4000000000000004;3.5999999999999996;2.4000000000000004",
                        dur: "2s",
                        repeatCount: "indefinite",
                        begin: "-3.1s"
                    }),
                    /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("animate", {
                        attributeName: "cy",
                        keyTimes: "0;0.5;1",
                        values: "30.5;69.5;30.5",
                        dur: "2s",
                        repeatCount: "indefinite",
                        begin: "-2.6s",
                        keySplines: "0.5 0 0.5 1;0.5 0 0.5 1",
                        calcMode: "spline"
                    }),
                    /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("animate", {
                        attributeName: "fill",
                        keyTimes: "0;0.5;1",
                        values: "#46dff0;rgba(53, 58, 57, 0.1435483870967742);#46dff0",
                        dur: "2s",
                        repeatCount: "indefinite",
                        begin: "-2.1s"
                    })
                ]
            }),
            /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("circle", {
                cx: "93.54838709677418",
                cy: "46.1526",
                r: "3.54012",
                fill: "rgba(233, 12, 89, 0.5125806451612902)",
                children: [
                    /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("animate", {
                        attributeName: "r",
                        keyTimes: "0;0.5;1",
                        values: "2.4000000000000004;3.5999999999999996;2.4000000000000004",
                        dur: "2s",
                        repeatCount: "indefinite",
                        begin: "-2.3s"
                    }),
                    /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("animate", {
                        attributeName: "cy",
                        keyTimes: "0;0.5;1",
                        values: "30.5;69.5;30.5",
                        dur: "2s",
                        repeatCount: "indefinite",
                        begin: "-1.8s",
                        keySplines: "0.5 0 0.5 1;0.5 0 0.5 1",
                        calcMode: "spline"
                    }),
                    /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("animate", {
                        attributeName: "fill",
                        keyTimes: "0;0.5;1",
                        values: "rgba(233, 12, 89, 0.5125806451612902);#ff0033;rgba(233, 12, 89, 0.5125806451612902)",
                        dur: "2s",
                        repeatCount: "indefinite",
                        begin: "-2.3s"
                    })
                ]
            }),
            /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("circle", {
                cx: "93.54838709677418",
                cy: "53.8474",
                r: "2.45988",
                fill: "#46dff0",
                children: [
                    /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("animate", {
                        attributeName: "r",
                        keyTimes: "0;0.5;1",
                        values: "2.4000000000000004;3.5999999999999996;2.4000000000000004",
                        dur: "2s",
                        repeatCount: "indefinite",
                        begin: "-3.3s"
                    }),
                    /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("animate", {
                        attributeName: "cy",
                        keyTimes: "0;0.5;1",
                        values: "30.5;69.5;30.5",
                        dur: "2s",
                        repeatCount: "indefinite",
                        begin: "-2.8s",
                        keySplines: "0.5 0 0.5 1;0.5 0 0.5 1",
                        calcMode: "spline"
                    }),
                    /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("animate", {
                        attributeName: "fill",
                        keyTimes: "0;0.5;1",
                        values: "#46dff0;rgba(53, 58, 57, 0.1435483870967742);#46dff0",
                        dur: "2s",
                        repeatCount: "indefinite",
                        begin: "-2.3s"
                    })
                ]
            })
        ]
    });
};






const $50138037f422b463$export$f93420b62a5bdffa = ({ visible: visible = true, width: width = "80", height: height = "80", wrapperClass: wrapperClass = "", wrapperStyle: wrapperStyle = {}, ariaLabel: ariaLabel = "discuss-loading", colors: colors = [
    "#ff727d",
    "#ff727d"
] })=>{
    return !visible ? null : /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("svg", {
        width: width,
        height: height,
        xmlns: (0, $eb040f10400edc38$export$98a285aab16ab26c),
        viewBox: "0 0 100 100",
        preserveAspectRatio: "xMidYMid",
        className: wrapperClass,
        style: wrapperStyle,
        "aria-label": ariaLabel,
        "data-testid": "discuss-svg",
        ...(0, $84fda1e7e33cfd28$export$6bfda33bcd6c2d18),
        children: [
            /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
                fill: "none",
                d: "M82 50A32 32 0 1 1 23.533421623214014 32.01333190873183 L21.71572875253809 21.7157287525381 L32.013331908731814 23.53342162321403 A32 32 0 0 1 82 50",
                strokeWidth: "5",
                stroke: colors[0]
            }),
            /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("circle", {
                cx: "50",
                cy: "50",
                fill: "none",
                strokeLinecap: "round",
                r: "20",
                strokeWidth: "5",
                stroke: colors[1],
                strokeDasharray: "31.41592653589793 31.41592653589793",
                transform: "rotate(96 50 50)",
                children: /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("animateTransform", {
                    attributeName: "transform",
                    type: "rotate",
                    calcMode: "linear",
                    values: "0 50 50;360 50 50",
                    keyTimes: "0;1",
                    dur: "1s",
                    begin: "0s",
                    repeatCount: "indefinite"
                })
            })
        ]
    });
};





const $7097090906378a5b$export$dc036a5afb9ca26f = ({ visible: visible = true, width: width = "80", height: height = "80", colors: colors = [
    "#e15b64",
    "#f47e60",
    "#f8b26a",
    "#abbd81",
    "#849b87"
], wrapperClass: wrapperClass = "", wrapperStyle: wrapperStyle = {}, ariaLabel: ariaLabel = "color-ring-loading" })=>{
    return !visible ? null : /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        xmlnsXlink: "http://www.w3.org/1999/xlink",
        width: width,
        height: height,
        viewBox: "0 0 100 100",
        preserveAspectRatio: "xMidYMid",
        className: wrapperClass,
        style: wrapperStyle,
        "aria-label": ariaLabel,
        "data-testid": "color-ring-svg",
        ...(0, $84fda1e7e33cfd28$export$6bfda33bcd6c2d18),
        children: [
            /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("defs", {
                children: /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("mask", {
                    id: "ldio-4offds5dlws-mask",
                    children: /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("circle", {
                        cx: "50",
                        cy: "50",
                        r: "26",
                        stroke: "#fff",
                        strokeLinecap: "round",
                        strokeDasharray: "122.52211349000194 40.840704496667314",
                        strokeWidth: "9",
                        transform: "rotate(198.018 50 50)",
                        children: /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("animateTransform", {
                            attributeName: "transform",
                            type: "rotate",
                            values: "0 50 50;360 50 50",
                            keyTimes: "0;1",
                            dur: "1s",
                            repeatCount: "indefinite"
                        })
                    })
                })
            }),
            /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("g", {
                mask: "url(#ldio-4offds5dlws-mask)",
                children: [
                    /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("rect", {
                        x: "14.5",
                        y: "0",
                        width: "15",
                        height: "100",
                        fill: colors[0],
                        children: /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("animate", {
                            attributeName: "fill",
                            values: colors.join(";").toString(),
                            keyTimes: "0;0.25;0.5;0.75;1",
                            dur: "1s",
                            repeatCount: "indefinite",
                            begin: "-0.8s"
                        })
                    }),
                    /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("rect", {
                        x: "28.5",
                        y: "0",
                        width: "15",
                        height: "100",
                        fill: colors[1],
                        children: /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("animate", {
                            attributeName: "fill",
                            values: colors.join(";").toString(),
                            keyTimes: "0;0.25;0.5;0.75;1",
                            dur: "1s",
                            repeatCount: "indefinite",
                            begin: "-0.6s"
                        })
                    }),
                    /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("rect", {
                        x: "42.5",
                        y: "0",
                        width: "15",
                        height: "100",
                        fill: colors[2],
                        children: /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("animate", {
                            attributeName: "fill",
                            values: colors.join(";").toString(),
                            keyTimes: "0;0.25;0.5;0.75;1",
                            dur: "1s",
                            repeatCount: "indefinite",
                            begin: "-0.4s"
                        })
                    }),
                    /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("rect", {
                        x: "56.5",
                        y: "0",
                        width: "15",
                        height: "100",
                        fill: colors[3],
                        children: /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("animate", {
                            attributeName: "fill",
                            values: colors.join(";").toString(),
                            keyTimes: "0;0.25;0.5;0.75;1",
                            dur: "1s",
                            repeatCount: "indefinite",
                            begin: "-0.2s"
                        })
                    }),
                    /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("rect", {
                        x: "70.5",
                        y: "0",
                        width: "15",
                        height: "100",
                        fill: colors[4],
                        children: /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("animate", {
                            attributeName: "fill",
                            values: colors.join(";").toString(),
                            keyTimes: "0;0.25;0.5;0.75;1",
                            dur: "1s",
                            repeatCount: "indefinite",
                            begin: "0s"
                        })
                    })
                ]
            })
        ]
    });
};






const $81e36fafa9b58989$export$4d299b491347818a = ({ visible: visible = true, width: width = "80", height: height = "80", backgroundColor: backgroundColor = "#ff6d00", color: color = "#fff", wrapperClass: wrapperClass = "", wrapperStyle: wrapperStyle = {}, ariaLabel: ariaLabel = "comment-loading" })=>{
    return !visible ? null : /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("svg", {
        width: width,
        height: height,
        xmlns: (0, $eb040f10400edc38$export$98a285aab16ab26c),
        viewBox: "0 0 100 100",
        preserveAspectRatio: "xMidYMid",
        className: wrapperClass,
        style: wrapperStyle,
        "aria-label": ariaLabel,
        "data-testid": "comment-svg",
        ...(0, $84fda1e7e33cfd28$export$6bfda33bcd6c2d18),
        children: [
            /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
                d: "M78,19H22c-6.6,0-12,5.4-12,12v31c0,6.6,5.4,12,12,12h37.2c0.4,3,1.8,5.6,3.7,7.6c2.4,2.5,5.1,4.1,9.1,4 c-1.4-2.1-2-7.2-2-10.3c0-0.4,0-0.8,0-1.3h8c6.6,0,12-5.4,12-12V31C90,24.4,84.6,19,78,19z",
                fill: backgroundColor
            }),
            /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("circle", {
                cx: "30",
                cy: "47",
                r: "5",
                fill: color,
                children: /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("animate", {
                    attributeName: "opacity",
                    calcMode: "linear",
                    values: "0;1;1",
                    keyTimes: "0;0.2;1",
                    dur: "1",
                    begin: "0s",
                    repeatCount: "indefinite"
                })
            }),
            /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("circle", {
                cx: "50",
                cy: "47",
                r: "5",
                fill: color,
                children: /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("animate", {
                    attributeName: "opacity",
                    calcMode: "linear",
                    values: "0;0;1;1",
                    keyTimes: "0;0.2;0.4;1",
                    dur: "1",
                    begin: "0s",
                    repeatCount: "indefinite"
                })
            }),
            /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("circle", {
                cx: "70",
                cy: "47",
                r: "5",
                fill: color,
                children: /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("animate", {
                    attributeName: "opacity",
                    calcMode: "linear",
                    values: "0;0;1;1",
                    keyTimes: "0;0.4;0.6;1",
                    dur: "1",
                    begin: "0s",
                    repeatCount: "indefinite"
                })
            })
        ]
    });
};






const $ffa7e3ac27a21a71$export$2ba1b65b747a57aa = ({ visible: visible = true, width: width = "80", height: height = "80", wrapperClass: wrapperClass = "", wrapperStyle: wrapperStyle = {}, ariaLabel: ariaLabel = "blocks-loading" })=>{
    return !visible ? null : /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("svg", {
        width: width,
        height: height,
        className: wrapperClass,
        style: wrapperStyle,
        xmlns: (0, $eb040f10400edc38$export$98a285aab16ab26c),
        viewBox: "0 0 100 100",
        preserveAspectRatio: "xMidYMid",
        "aria-label": ariaLabel,
        "data-testid": "blocks-svg",
        ...(0, $84fda1e7e33cfd28$export$6bfda33bcd6c2d18),
        children: [
            /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("title", {
                children: "Blocks"
            }),
            /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("desc", {
                children: "Animated representation of blocks"
            }),
            /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("rect", {
                x: "17",
                y: "17",
                width: "20",
                height: "20",
                fill: "#577c9b",
                children: /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("animate", {
                    attributeName: "fill",
                    values: "#0dceff;#577c9b;#577c9b",
                    keyTimes: "0;0.125;1",
                    dur: "1s",
                    repeatCount: "indefinite",
                    begin: "0s",
                    calcMode: "discrete"
                })
            }),
            /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("rect", {
                x: "40",
                y: "17",
                width: "20",
                height: "20",
                fill: "#577c9b",
                children: /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("animate", {
                    attributeName: "fill",
                    values: "#0dceff;#577c9b;#577c9b",
                    keyTimes: "0;0.125;1",
                    dur: "1s",
                    repeatCount: "indefinite",
                    begin: "0.125s",
                    calcMode: "discrete"
                })
            }),
            /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("rect", {
                x: "63",
                y: "17",
                width: "20",
                height: "20",
                fill: "#577c9b",
                children: /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("animate", {
                    attributeName: "fill",
                    values: "#0dceff;#577c9b;#577c9b",
                    keyTimes: "0;0.125;1",
                    dur: "1s",
                    repeatCount: "indefinite",
                    begin: "0.25s",
                    calcMode: "discrete"
                })
            }),
            /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("rect", {
                x: "17",
                y: "40",
                width: "20",
                height: "20",
                fill: "#577c9b",
                children: /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("animate", {
                    attributeName: "fill",
                    values: "#0dceff;#577c9b;#577c9b",
                    keyTimes: "0;0.125;1",
                    dur: "1s",
                    repeatCount: "indefinite",
                    begin: "0.875s",
                    calcMode: "discrete"
                })
            }),
            /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("rect", {
                x: "63",
                y: "40",
                width: "20",
                height: "20",
                fill: "#577c9b",
                children: /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("animate", {
                    attributeName: "fill",
                    values: "#0dceff;#577c9b;#577c9b",
                    keyTimes: "0;0.125;1",
                    dur: "1s",
                    repeatCount: "indefinite",
                    begin: "0.375s",
                    calcMode: "discrete"
                })
            }),
            /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("rect", {
                x: "17",
                y: "63",
                width: "20",
                height: "20",
                fill: "#577c9b",
                children: /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("animate", {
                    attributeName: "fill",
                    values: "#0dceff;#577c9b;#577c9b",
                    keyTimes: "0;0.125;1",
                    dur: "1s",
                    repeatCount: "indefinite",
                    begin: "0.75s",
                    calcMode: "discrete"
                })
            }),
            /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("rect", {
                x: "40",
                y: "63",
                width: "20",
                height: "20",
                fill: "#577c9b",
                children: /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("animate", {
                    attributeName: "fill",
                    values: "#0dceff;#577c9b;#577c9b",
                    keyTimes: "0;0.125;1",
                    dur: "1s",
                    repeatCount: "indefinite",
                    begin: "0.625s",
                    calcMode: "discrete"
                })
            }),
            /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("rect", {
                x: "63",
                y: "63",
                width: "20",
                height: "20",
                fill: "#577c9b",
                children: /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("animate", {
                    attributeName: "fill",
                    values: "#0dceff;#577c9b;#577c9b",
                    keyTimes: "0;0.125;1",
                    dur: "1s",
                    repeatCount: "indefinite",
                    begin: "0.5s",
                    calcMode: "discrete"
                })
            })
        ]
    });
};





const $1e82ee682f5b64b8$export$f3c41beb83007357 = ({ visible: visible = true, width: width = "80", height: height = "80", wrapperClass: wrapperClass = "", wrapperStyle: wrapperStyle = {}, ariaLabel: ariaLabel = "hourglass-loading", colors: colors = [
    "#306cce",
    "#72a1ed"
] })=>{
    return !visible ? null : /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("svg", {
        width: width,
        height: height,
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 350 350",
        preserveAspectRatio: "xMidYMid",
        className: wrapperClass,
        style: wrapperStyle,
        "aria-label": ariaLabel,
        "data-testid": "hourglass-svg",
        ...(0, $84fda1e7e33cfd28$export$6bfda33bcd6c2d18),
        children: [
            /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("animateTransform", {
                attributeName: "transform",
                type: "rotate",
                values: "0; 0; -30; 360; 360",
                keyTimes: "0; 0.40; 0.55; 0.65; 1",
                dur: "3s",
                begin: "0s",
                calcMode: "linear",
                repeatCount: "indefinite"
            }),
            /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("g", {
                children: [
                    /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
                        fill: colors[0],
                        stroke: colors[0],
                        d: "M324.658,20.572v-2.938C324.658,7.935,316.724,0,307.025,0H40.313c-9.699,0-17.635,7.935-17.635,17.634v2.938     c0,9.699,7.935,17.634,17.635,17.634h6.814c3.5,0,3.223,3.267,3.223,4.937c0,19.588,8.031,42.231,14.186,56.698     c12.344,29.012,40.447,52.813,63.516,69.619c4.211,3.068,3.201,5.916,0.756,7.875c-22.375,17.924-51.793,40.832-64.271,70.16     c-6.059,14.239-13.934,36.4-14.18,55.772c-0.025,1.987,0.771,5.862-3.979,5.862h-6.064c-9.699,0-17.635,7.936-17.635,17.634v2.94     c0,9.698,7.935,17.634,17.635,17.634h266.713c9.699,0,17.633-7.936,17.633-17.634v-2.94c0-9.698-7.934-17.634-17.633-17.634     h-3.816c-7,0-6.326-5.241-6.254-7.958c0.488-18.094-4.832-38.673-12.617-54.135c-17.318-34.389-44.629-56.261-61.449-68.915     c-3.65-2.745-4.018-6.143,0-8.906c17.342-11.929,44.131-34.526,61.449-68.916c8.289-16.464,13.785-38.732,12.447-57.621     c-0.105-1.514-0.211-4.472,3.758-4.472h6.482C316.725,38.206,324.658,30.272,324.658,20.572z M270.271,93.216     c-16.113,31.998-41.967,54.881-64.455,68.67c-1.354,0.831-3.936,2.881-3.936,8.602v6.838c0,6.066,2.752,7.397,4.199,8.286     c22.486,13.806,48.143,36.636,64.191,68.508c7.414,14.727,11.266,32.532,10.885,46.702c-0.078,2.947,1.053,8.308-6.613,8.308     H72.627c-6.75,0-6.475-3.37-6.459-5.213c0.117-12.895,4.563-30.757,12.859-50.255c14.404-33.854,44.629-54.988,64.75-67.577     c0.896-0.561,2.629-1.567,2.629-6.922v-10.236c0-5.534-2.656-7.688-4.057-8.57c-20.098-12.688-49.256-33.618-63.322-66.681     c-8.383-19.702-12.834-37.732-12.861-50.657c-0.002-1.694,0.211-4.812,3.961-4.812h206.582c4.168,0,4.127,3.15,4.264,4.829     C282.156,57.681,278.307,77.257,270.271,93.216z"
                    }),
                    /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("g", {
                        children: [
                            /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
                                fill: colors[1],
                                stroke: colors[1],
                                d: "M169.541,196.2l-68.748,86.03c-2.27,2.842-1.152,5.166,2.484,5.166h140.781c3.637,0,4.756-2.324,2.484-5.166     l-68.746-86.03C175.525,193.358,171.811,193.358,169.541,196.2z"
                            }),
                            /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("animate", {
                                attributeName: "opacity",
                                values: "0; 0; 1; 1; 0; 0",
                                keyTimes: "0; 0.1; 0.4; 0.6; 0.61; 1",
                                dur: "3s",
                                repeatCount: "indefinite"
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("g", {
                        children: [
                            /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
                                fill: colors[1],
                                stroke: colors[1],
                                d: "M168.986,156.219c2.576,2.568,6.789,2.568,9.363,0l34.576-34.489c2.574-2.568,1.707-4.67-1.932-4.67H136.34     c-3.637,0-4.506,2.102-1.932,4.67L168.986,156.219z"
                            }),
                            /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("animate", {
                                attributeName: "opacity",
                                values: "1; 1; 0; 0; 1; 1",
                                keyTimes: "0; 0.1; 0.4; 0.65; 0.66; 1",
                                dur: "3s",
                                repeatCount: "indefinite"
                            })
                        ]
                    })
                ]
            })
        ]
    });
};





//# sourceMappingURL=module.js.map


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

/***/ "../../../node_modules/shallowequal/index.js":
/***/ (function(module, exports) {

//

module.exports = function shallowEqual(objA, objB, compare, compareContext) {
  var ret = compare ? compare.call(compareContext, objA, objB) : void 0;

  if (ret !== void 0) {
    return !!ret;
  }

  if (objA === objB) {
    return true;
  }

  if (typeof objA !== "object" || !objA || typeof objB !== "object" || !objB) {
    return false;
  }

  var keysA = Object.keys(objA);
  var keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  var bHasOwnProperty = Object.prototype.hasOwnProperty.bind(objB);

  // Test for A's keys different from B.
  for (var idx = 0; idx < keysA.length; idx++) {
    var key = keysA[idx];

    if (!bHasOwnProperty(key)) {
      return false;
    }

    var valueA = objA[key];
    var valueB = objB[key];

    ret = compare ? compare.call(compareContext, valueA, valueB, key) : void 0;

    if (ret === false || (ret === void 0 && valueA !== valueB)) {
      return false;
    }
  }

  return true;
};


/***/ }),

/***/ "../../../node_modules/styled-components/dist/styled-components.browser.esm.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(process) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ServerStyleSheet", function() { return mt; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StyleSheetConsumer", function() { return $e; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StyleSheetContext", function() { return Me; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StyleSheetManager", function() { return Le; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ThemeConsumer", function() { return Qe; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ThemeContext", function() { return Ke; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ThemeProvider", function() { return tt; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__PRIVATE__", function() { return yt; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createGlobalStyle", function() { return dt; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "css", function() { return at; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ut; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isStyledComponent", function() { return se; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "keyframes", function() { return ht; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "styled", function() { return ut; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useTheme", function() { return et; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "version", function() { return v; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "withTheme", function() { return ft; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../../node_modules/styled-components/node_modules/tslib/tslib.es6.js");
/* harmony import */ var _emotion_is_prop_valid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../../node_modules/@emotion/is-prop-valid/dist/emotion-is-prop-valid.esm.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var shallowequal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("../../../node_modules/shallowequal/index.js");
/* harmony import */ var shallowequal__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(shallowequal__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var stylis__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("../../../node_modules/styled-components/node_modules/stylis/dist/stylis.mjs");
/* harmony import */ var _emotion_unitless__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("../../../node_modules/styled-components/node_modules/@emotion/unitless/dist/emotion-unitless.esm.js");
var f="undefined"!=typeof process&&void 0!==Object({"NODE_ENV":'development',"VERSION":"0.1.1"})&&(Object({"NODE_ENV":'development',"VERSION":"0.1.1"}).REACT_APP_SC_ATTR||Object({"NODE_ENV":'development',"VERSION":"0.1.1"}).SC_ATTR)||"data-styled",m="active",y="data-styled-version",v="6.1.8",g="/*!sc*/\n",S="undefined"!=typeof window&&"HTMLElement"in window,w=Boolean("boolean"==typeof SC_DISABLE_SPEEDY?SC_DISABLE_SPEEDY:"undefined"!=typeof process&&void 0!==Object({"NODE_ENV":'development',"VERSION":"0.1.1"})&&void 0!==Object({"NODE_ENV":'development',"VERSION":"0.1.1"}).REACT_APP_SC_DISABLE_SPEEDY&&""!==Object({"NODE_ENV":'development',"VERSION":"0.1.1"}).REACT_APP_SC_DISABLE_SPEEDY?"false"!==Object({"NODE_ENV":'development',"VERSION":"0.1.1"}).REACT_APP_SC_DISABLE_SPEEDY&&Object({"NODE_ENV":'development',"VERSION":"0.1.1"}).REACT_APP_SC_DISABLE_SPEEDY:"undefined"!=typeof process&&void 0!==Object({"NODE_ENV":'development',"VERSION":"0.1.1"})&&void 0!==Object({"NODE_ENV":'development',"VERSION":"0.1.1"}).SC_DISABLE_SPEEDY&&""!==Object({"NODE_ENV":'development',"VERSION":"0.1.1"}).SC_DISABLE_SPEEDY?"false"!==Object({"NODE_ENV":'development',"VERSION":"0.1.1"}).SC_DISABLE_SPEEDY&&Object({"NODE_ENV":'development',"VERSION":"0.1.1"}).SC_DISABLE_SPEEDY:"production"!=='development'),b={},E=/invalid hook call/i,N=new Set,P=function(t,n){if(true){var o=n?' with the id of "'.concat(n,'"'):"",s="The component ".concat(t).concat(o," has been created dynamically.\n")+"You may see this warning because you've called styled inside another component.\nTo resolve this only create new StyledComponents outside of any render method and function component.",i=console.error;try{var a=!0;console.error=function(t){for(var n=[],o=1;o<arguments.length;o++)n[o-1]=arguments[o];E.test(t)?(a=!1,N.delete(s)):i.apply(void 0,Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__spreadArray"])([t],n,!1))},Object(react__WEBPACK_IMPORTED_MODULE_2__["useRef"])(),a&&!N.has(s)&&(console.warn(s),N.add(s))}catch(e){E.test(e.message)&&N.delete(s)}finally{console.error=i}}},_=Object.freeze([]),C=Object.freeze({});function I(e,t,n){return void 0===n&&(n=C),e.theme!==n.theme&&e.theme||t||n.theme}var A=new Set(["a","abbr","address","area","article","aside","audio","b","base","bdi","bdo","big","blockquote","body","br","button","canvas","caption","cite","code","col","colgroup","data","datalist","dd","del","details","dfn","dialog","div","dl","dt","em","embed","fieldset","figcaption","figure","footer","form","h1","h2","h3","h4","h5","h6","header","hgroup","hr","html","i","iframe","img","input","ins","kbd","keygen","label","legend","li","link","main","map","mark","menu","menuitem","meta","meter","nav","noscript","object","ol","optgroup","option","output","p","param","picture","pre","progress","q","rp","rt","ruby","s","samp","script","section","select","small","source","span","strong","style","sub","summary","sup","table","tbody","td","textarea","tfoot","th","thead","time","tr","track","u","ul","use","var","video","wbr","circle","clipPath","defs","ellipse","foreignObject","g","image","line","linearGradient","marker","mask","path","pattern","polygon","polyline","radialGradient","rect","stop","svg","text","tspan"]),O=/[!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~-]+/g,D=/(^-|-$)/g;function R(e){return e.replace(O,"-").replace(D,"")}var T=/(a)(d)/gi,k=52,j=function(e){return String.fromCharCode(e+(e>25?39:97))};function x(e){var t,n="";for(t=Math.abs(e);t>k;t=t/k|0)n=j(t%k)+n;return(j(t%k)+n).replace(T,"$1-$2")}var V,F=5381,M=function(e,t){for(var n=t.length;n;)e=33*e^t.charCodeAt(--n);return e},$=function(e){return M(F,e)};function z(e){return x($(e)>>>0)}function B(e){return true&&"string"==typeof e&&e||e.displayName||e.name||"Component"}function L(e){return"string"==typeof e&&( false||e.charAt(0)===e.charAt(0).toLowerCase())}var G="function"==typeof Symbol&&Symbol.for,Y=G?Symbol.for("react.memo"):60115,W=G?Symbol.for("react.forward_ref"):60112,q={childContextTypes:!0,contextType:!0,contextTypes:!0,defaultProps:!0,displayName:!0,getDefaultProps:!0,getDerivedStateFromError:!0,getDerivedStateFromProps:!0,mixins:!0,propTypes:!0,type:!0},H={name:!0,length:!0,prototype:!0,caller:!0,callee:!0,arguments:!0,arity:!0},U={$$typeof:!0,compare:!0,defaultProps:!0,displayName:!0,propTypes:!0,type:!0},J=((V={})[W]={$$typeof:!0,render:!0,defaultProps:!0,displayName:!0,propTypes:!0},V[Y]=U,V);function X(e){return("type"in(t=e)&&t.type.$$typeof)===Y?U:"$$typeof"in e?J[e.$$typeof]:q;var t}var Z=Object.defineProperty,K=Object.getOwnPropertyNames,Q=Object.getOwnPropertySymbols,ee=Object.getOwnPropertyDescriptor,te=Object.getPrototypeOf,ne=Object.prototype;function oe(e,t,n){if("string"!=typeof t){if(ne){var o=te(t);o&&o!==ne&&oe(e,o,n)}var r=K(t);Q&&(r=r.concat(Q(t)));for(var s=X(e),i=X(t),a=0;a<r.length;++a){var c=r[a];if(!(c in H||n&&n[c]||i&&c in i||s&&c in s)){var l=ee(t,c);try{Z(e,c,l)}catch(e){}}}}return e}function re(e){return"function"==typeof e}function se(e){return"object"==typeof e&&"styledComponentId"in e}function ie(e,t){return e&&t?"".concat(e," ").concat(t):e||t||""}function ae(e,t){if(0===e.length)return"";for(var n=e[0],o=1;o<e.length;o++)n+=t?t+e[o]:e[o];return n}function ce(e){return null!==e&&"object"==typeof e&&e.constructor.name===Object.name&&!("props"in e&&e.$$typeof)}function le(e,t,n){if(void 0===n&&(n=!1),!n&&!ce(e)&&!Array.isArray(e))return t;if(Array.isArray(t))for(var o=0;o<t.length;o++)e[o]=le(e[o],t[o]);else if(ce(t))for(var o in t)e[o]=le(e[o],t[o]);return e}function ue(e,t){Object.defineProperty(e,"toString",{value:t})}var pe= true?{1:"Cannot create styled-component for component: %s.\n\n",2:"Can't collect styles once you've consumed a `ServerStyleSheet`'s styles! `ServerStyleSheet` is a one off instance for each server-side render cycle.\n\n- Are you trying to reuse it across renders?\n- Are you accidentally calling collectStyles twice?\n\n",3:"Streaming SSR is only supported in a Node.js environment; Please do not try to call this method in the browser.\n\n",4:"The `StyleSheetManager` expects a valid target or sheet prop!\n\n- Does this error occur on the client and is your target falsy?\n- Does this error occur on the server and is the sheet falsy?\n\n",5:"The clone method cannot be used on the client!\n\n- Are you running in a client-like environment on the server?\n- Are you trying to run SSR on the client?\n\n",6:"Trying to insert a new style tag, but the given Node is unmounted!\n\n- Are you using a custom target that isn't mounted?\n- Does your document not have a valid head element?\n- Have you accidentally removed a style tag manually?\n\n",7:'ThemeProvider: Please return an object from your "theme" prop function, e.g.\n\n```js\ntheme={() => ({})}\n```\n\n',8:'ThemeProvider: Please make your "theme" prop an object.\n\n',9:"Missing document `<head>`\n\n",10:"Cannot find a StyleSheet instance. Usually this happens if there are multiple copies of styled-components loaded at once. Check out this issue for how to troubleshoot and fix the common cases where this situation can happen: https://github.com/styled-components/styled-components/issues/1941#issuecomment-417862021\n\n",11:"_This error was replaced with a dev-time warning, it will be deleted for v4 final._ [createGlobalStyle] received children which will not be rendered. Please use the component without passing children elements.\n\n",12:"It seems you are interpolating a keyframe declaration (%s) into an untagged string. This was supported in styled-components v3, but is not longer supported in v4 as keyframes are now injected on-demand. Please wrap your string in the css\\`\\` helper which ensures the styles are injected correctly. See https://www.styled-components.com/docs/api#css\n\n",13:"%s is not a styled component and cannot be referred to via component selector. See https://www.styled-components.com/docs/advanced#referring-to-other-components for more details.\n\n",14:'ThemeProvider: "theme" prop is required.\n\n',15:"A stylis plugin has been supplied that is not named. We need a name for each plugin to be able to prevent styling collisions between different stylis configurations within the same app. Before you pass your plugin to `<StyleSheetManager stylisPlugins={[]}>`, please make sure each plugin is uniquely-named, e.g.\n\n```js\nObject.defineProperty(importedPlugin, 'name', { value: 'some-unique-name' });\n```\n\n",16:"Reached the limit of how many styled components may be created at group %s.\nYou may only create up to 1,073,741,824 components. If you're creating components dynamically,\nas for instance in your render method then you may be running into this limitation.\n\n",17:"CSSStyleSheet could not be found on HTMLStyleElement.\nHas styled-components' style tag been unmounted or altered by another script?\n",18:"ThemeProvider: Please make sure your useTheme hook is within a `<ThemeProvider>`"}:undefined;function de(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];for(var n=e[0],o=[],r=1,s=e.length;r<s;r+=1)o.push(e[r]);return o.forEach(function(e){n=n.replace(/%[a-z]/,e)}),n}function he(t){for(var n=[],o=1;o<arguments.length;o++)n[o-1]=arguments[o];return false?undefined:new Error(de.apply(void 0,Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__spreadArray"])([pe[t]],n,!1)).trim())}var fe=function(){function e(e){this.groupSizes=new Uint32Array(512),this.length=512,this.tag=e}return e.prototype.indexOfGroup=function(e){for(var t=0,n=0;n<e;n++)t+=this.groupSizes[n];return t},e.prototype.insertRules=function(e,t){if(e>=this.groupSizes.length){for(var n=this.groupSizes,o=n.length,r=o;e>=r;)if((r<<=1)<0)throw he(16,"".concat(e));this.groupSizes=new Uint32Array(r),this.groupSizes.set(n),this.length=r;for(var s=o;s<r;s++)this.groupSizes[s]=0}for(var i=this.indexOfGroup(e+1),a=(s=0,t.length);s<a;s++)this.tag.insertRule(i,t[s])&&(this.groupSizes[e]++,i++)},e.prototype.clearGroup=function(e){if(e<this.length){var t=this.groupSizes[e],n=this.indexOfGroup(e),o=n+t;this.groupSizes[e]=0;for(var r=n;r<o;r++)this.tag.deleteRule(n)}},e.prototype.getGroup=function(e){var t="";if(e>=this.length||0===this.groupSizes[e])return t;for(var n=this.groupSizes[e],o=this.indexOfGroup(e),r=o+n,s=o;s<r;s++)t+="".concat(this.tag.getRule(s)).concat(g);return t},e}(),me=new Map,ye=new Map,ve=1,ge=function(e){if(me.has(e))return me.get(e);for(;ye.has(ve);)ve++;var t=ve++;if( true&&((0|t)<0||t>1073741824))throw he(16,"".concat(t));return me.set(e,t),ye.set(t,e),t},Se=function(e,t){ve=t+1,me.set(e,t),ye.set(t,e)},we="style[".concat(f,"][").concat(y,'="').concat(v,'"]'),be=new RegExp("^".concat(f,'\\.g(\\d+)\\[id="([\\w\\d-]+)"\\].*?"([^"]*)')),Ee=function(e,t,n){for(var o,r=n.split(","),s=0,i=r.length;s<i;s++)(o=r[s])&&e.registerName(t,o)},Ne=function(e,t){for(var n,o=(null!==(n=t.textContent)&&void 0!==n?n:"").split(g),r=[],s=0,i=o.length;s<i;s++){var a=o[s].trim();if(a){var c=a.match(be);if(c){var l=0|parseInt(c[1],10),u=c[2];0!==l&&(Se(u,l),Ee(e,u,c[3]),e.getTag().insertRules(l,r)),r.length=0}else r.push(a)}}};function Pe(){return true?__webpack_require__.nc:undefined}var _e=function(e){var t=document.head,n=e||t,o=document.createElement("style"),r=function(e){var t=Array.from(e.querySelectorAll("style[".concat(f,"]")));return t[t.length-1]}(n),s=void 0!==r?r.nextSibling:null;o.setAttribute(f,m),o.setAttribute(y,v);var i=Pe();return i&&o.setAttribute("nonce",i),n.insertBefore(o,s),o},Ce=function(){function e(e){this.element=_e(e),this.element.appendChild(document.createTextNode("")),this.sheet=function(e){if(e.sheet)return e.sheet;for(var t=document.styleSheets,n=0,o=t.length;n<o;n++){var r=t[n];if(r.ownerNode===e)return r}throw he(17)}(this.element),this.length=0}return e.prototype.insertRule=function(e,t){try{return this.sheet.insertRule(t,e),this.length++,!0}catch(e){return!1}},e.prototype.deleteRule=function(e){this.sheet.deleteRule(e),this.length--},e.prototype.getRule=function(e){var t=this.sheet.cssRules[e];return t&&t.cssText?t.cssText:""},e}(),Ie=function(){function e(e){this.element=_e(e),this.nodes=this.element.childNodes,this.length=0}return e.prototype.insertRule=function(e,t){if(e<=this.length&&e>=0){var n=document.createTextNode(t);return this.element.insertBefore(n,this.nodes[e]||null),this.length++,!0}return!1},e.prototype.deleteRule=function(e){this.element.removeChild(this.nodes[e]),this.length--},e.prototype.getRule=function(e){return e<this.length?this.nodes[e].textContent:""},e}(),Ae=function(){function e(e){this.rules=[],this.length=0}return e.prototype.insertRule=function(e,t){return e<=this.length&&(this.rules.splice(e,0,t),this.length++,!0)},e.prototype.deleteRule=function(e){this.rules.splice(e,1),this.length--},e.prototype.getRule=function(e){return e<this.length?this.rules[e]:""},e}(),Oe=S,De={isServer:!S,useCSSOMInjection:!w},Re=function(){function e(e,n,o){void 0===e&&(e=C),void 0===n&&(n={});var r=this;this.options=Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({},De),e),this.gs=n,this.names=new Map(o),this.server=!!e.isServer,!this.server&&S&&Oe&&(Oe=!1,function(e){for(var t=document.querySelectorAll(we),n=0,o=t.length;n<o;n++){var r=t[n];r&&r.getAttribute(f)!==m&&(Ne(e,r),r.parentNode&&r.parentNode.removeChild(r))}}(this)),ue(this,function(){return function(e){for(var t=e.getTag(),n=t.length,o="",r=function(n){var r=function(e){return ye.get(e)}(n);if(void 0===r)return"continue";var s=e.names.get(r),i=t.getGroup(n);if(void 0===s||0===i.length)return"continue";var a="".concat(f,".g").concat(n,'[id="').concat(r,'"]'),c="";void 0!==s&&s.forEach(function(e){e.length>0&&(c+="".concat(e,","))}),o+="".concat(i).concat(a,'{content:"').concat(c,'"}').concat(g)},s=0;s<n;s++)r(s);return o}(r)})}return e.registerId=function(e){return ge(e)},e.prototype.reconstructWithOptions=function(n,o){return void 0===o&&(o=!0),new e(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({},this.options),n),this.gs,o&&this.names||void 0)},e.prototype.allocateGSInstance=function(e){return this.gs[e]=(this.gs[e]||0)+1},e.prototype.getTag=function(){return this.tag||(this.tag=(e=function(e){var t=e.useCSSOMInjection,n=e.target;return e.isServer?new Ae(n):t?new Ce(n):new Ie(n)}(this.options),new fe(e)));var e},e.prototype.hasNameForId=function(e,t){return this.names.has(e)&&this.names.get(e).has(t)},e.prototype.registerName=function(e,t){if(ge(e),this.names.has(e))this.names.get(e).add(t);else{var n=new Set;n.add(t),this.names.set(e,n)}},e.prototype.insertRules=function(e,t,n){this.registerName(e,t),this.getTag().insertRules(ge(e),n)},e.prototype.clearNames=function(e){this.names.has(e)&&this.names.get(e).clear()},e.prototype.clearRules=function(e){this.getTag().clearGroup(ge(e)),this.clearNames(e)},e.prototype.clearTag=function(){this.tag=void 0},e}(),Te=/&/g,ke=/^\s*\/\/.*$/gm;function je(e,t){return e.map(function(e){return"rule"===e.type&&(e.value="".concat(t," ").concat(e.value),e.value=e.value.replaceAll(",",",".concat(t," ")),e.props=e.props.map(function(e){return"".concat(t," ").concat(e)})),Array.isArray(e.children)&&"@keyframes"!==e.type&&(e.children=je(e.children,t)),e})}function xe(e){var t,n,o,r=void 0===e?C:e,s=r.options,i=void 0===s?C:s,a=r.plugins,c=void 0===a?_:a,l=function(e,o,r){return r.startsWith(n)&&r.endsWith(n)&&r.replaceAll(n,"").length>0?".".concat(t):e},u=c.slice();u.push(function(e){e.type===stylis__WEBPACK_IMPORTED_MODULE_4__["RULESET"]&&e.value.includes("&")&&(e.props[0]=e.props[0].replace(Te,n).replace(o,l))}),i.prefix&&u.push(stylis__WEBPACK_IMPORTED_MODULE_4__["prefixer"]),u.push(stylis__WEBPACK_IMPORTED_MODULE_4__["stringify"]);var p=function(e,r,s,a){void 0===r&&(r=""),void 0===s&&(s=""),void 0===a&&(a="&"),t=a,n=r,o=new RegExp("\\".concat(n,"\\b"),"g");var c=e.replace(ke,""),l=stylis__WEBPACK_IMPORTED_MODULE_4__["compile"](s||r?"".concat(s," ").concat(r," { ").concat(c," }"):c);i.namespace&&(l=je(l,i.namespace));var p=[];return stylis__WEBPACK_IMPORTED_MODULE_4__["serialize"](l,stylis__WEBPACK_IMPORTED_MODULE_4__["middleware"](u.concat(stylis__WEBPACK_IMPORTED_MODULE_4__["rulesheet"](function(e){return p.push(e)})))),p};return p.hash=c.length?c.reduce(function(e,t){return t.name||he(15),M(e,t.name)},F).toString():"",p}var Ve=new Re,Fe=xe(),Me=react__WEBPACK_IMPORTED_MODULE_2___default.a.createContext({shouldForwardProp:void 0,styleSheet:Ve,stylis:Fe}),$e=Me.Consumer,ze=react__WEBPACK_IMPORTED_MODULE_2___default.a.createContext(void 0);function Be(){return Object(react__WEBPACK_IMPORTED_MODULE_2__["useContext"])(Me)}function Le(e){var t=Object(react__WEBPACK_IMPORTED_MODULE_2__["useState"])(e.stylisPlugins),n=t[0],r=t[1],c=Be().styleSheet,l=Object(react__WEBPACK_IMPORTED_MODULE_2__["useMemo"])(function(){var t=c;return e.sheet?t=e.sheet:e.target&&(t=t.reconstructWithOptions({target:e.target},!1)),e.disableCSSOMInjection&&(t=t.reconstructWithOptions({useCSSOMInjection:!1})),t},[e.disableCSSOMInjection,e.sheet,e.target,c]),u=Object(react__WEBPACK_IMPORTED_MODULE_2__["useMemo"])(function(){return xe({options:{namespace:e.namespace,prefix:e.enableVendorPrefixes},plugins:n})},[e.enableVendorPrefixes,e.namespace,n]);Object(react__WEBPACK_IMPORTED_MODULE_2__["useEffect"])(function(){shallowequal__WEBPACK_IMPORTED_MODULE_3___default()(n,e.stylisPlugins)||r(e.stylisPlugins)},[e.stylisPlugins]);var d=Object(react__WEBPACK_IMPORTED_MODULE_2__["useMemo"])(function(){return{shouldForwardProp:e.shouldForwardProp,styleSheet:l,stylis:u}},[e.shouldForwardProp,l,u]);return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(Me.Provider,{value:d},react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(ze.Provider,{value:u},e.children))}var Ge=function(){function e(e,t){var n=this;this.inject=function(e,t){void 0===t&&(t=Fe);var o=n.name+t.hash;e.hasNameForId(n.id,o)||e.insertRules(n.id,o,t(n.rules,o,"@keyframes"))},this.name=e,this.id="sc-keyframes-".concat(e),this.rules=t,ue(this,function(){throw he(12,String(n.name))})}return e.prototype.getName=function(e){return void 0===e&&(e=Fe),this.name+e.hash},e}(),Ye=function(e){return e>="A"&&e<="Z"};function We(e){for(var t="",n=0;n<e.length;n++){var o=e[n];if(1===n&&"-"===o&&"-"===e[0])return e;Ye(o)?t+="-"+o.toLowerCase():t+=o}return t.startsWith("ms-")?"-"+t:t}var qe=function(e){return null==e||!1===e||""===e},He=function(t){var n,o,r=[];for(var s in t){var i=t[s];t.hasOwnProperty(s)&&!qe(i)&&(Array.isArray(i)&&i.isCss||re(i)?r.push("".concat(We(s),":"),i,";"):ce(i)?r.push.apply(r,Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__spreadArray"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__spreadArray"])(["".concat(s," {")],He(i),!1),["}"],!1)):r.push("".concat(We(s),": ").concat((n=s,null==(o=i)||"boolean"==typeof o||""===o?"":"number"!=typeof o||0===o||n in _emotion_unitless__WEBPACK_IMPORTED_MODULE_5__["default"]||n.startsWith("--")?String(o).trim():"".concat(o,"px")),";")))}return r};function Ue(e,t,n,o){if(qe(e))return[];if(se(e))return[".".concat(e.styledComponentId)];if(re(e)){if(!re(s=e)||s.prototype&&s.prototype.isReactComponent||!t)return[e];var r=e(t);return false||"object"!=typeof r||Array.isArray(r)||r instanceof Ge||ce(r)||null===r||console.error("".concat(B(e)," is not a styled component and cannot be referred to via component selector. See https://www.styled-components.com/docs/advanced#referring-to-other-components for more details.")),Ue(r,t,n,o)}var s;return e instanceof Ge?n?(e.inject(n,o),[e.getName(o)]):[e]:ce(e)?He(e):Array.isArray(e)?Array.prototype.concat.apply(_,e.map(function(e){return Ue(e,t,n,o)})):[e.toString()]}function Je(e){for(var t=0;t<e.length;t+=1){var n=e[t];if(re(n)&&!se(n))return!1}return!0}var Xe=$(v),Ze=function(){function e(e,t,n){this.rules=e,this.staticRulesId="",this.isStatic= false&&false,this.componentId=t,this.baseHash=M(Xe,t),this.baseStyle=n,Re.registerId(t)}return e.prototype.generateAndInjectStyles=function(e,t,n){var o=this.baseStyle?this.baseStyle.generateAndInjectStyles(e,t,n):"";if(this.isStatic&&!n.hash)if(this.staticRulesId&&t.hasNameForId(this.componentId,this.staticRulesId))o=ie(o,this.staticRulesId);else{var r=ae(Ue(this.rules,e,t,n)),s=x(M(this.baseHash,r)>>>0);if(!t.hasNameForId(this.componentId,s)){var i=n(r,".".concat(s),void 0,this.componentId);t.insertRules(this.componentId,s,i)}o=ie(o,s),this.staticRulesId=s}else{for(var a=M(this.baseHash,n.hash),c="",l=0;l<this.rules.length;l++){var u=this.rules[l];if("string"==typeof u)c+=u, true&&(a=M(a,u));else if(u){var p=ae(Ue(u,e,t,n));a=M(a,p+l),c+=p}}if(c){var d=x(a>>>0);t.hasNameForId(this.componentId,d)||t.insertRules(this.componentId,d,n(c,".".concat(d),void 0,this.componentId)),o=ie(o,d)}}return o},e}(),Ke=react__WEBPACK_IMPORTED_MODULE_2___default.a.createContext(void 0),Qe=Ke.Consumer;function et(){var e=Object(react__WEBPACK_IMPORTED_MODULE_2__["useContext"])(Ke);if(!e)throw he(18);return e}function tt(e){var n=react__WEBPACK_IMPORTED_MODULE_2___default.a.useContext(Ke),r=Object(react__WEBPACK_IMPORTED_MODULE_2__["useMemo"])(function(){return function(e,n){if(!e)throw he(14);if(re(e)){var o=e(n);if( true&&(null===o||Array.isArray(o)||"object"!=typeof o))throw he(7);return o}if(Array.isArray(e)||"object"!=typeof e)throw he(8);return n?Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({},n),e):e}(e.theme,n)},[e.theme,n]);return e.children?react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(Ke.Provider,{value:r},e.children):null}var nt={},ot=new Set;function rt(e,r,s){var i=se(e),a=e,c=!L(e),p=r.attrs,d=void 0===p?_:p,h=r.componentId,f=void 0===h?function(e,t){var n="string"!=typeof e?"sc":R(e);nt[n]=(nt[n]||0)+1;var o="".concat(n,"-").concat(z(v+n+nt[n]));return t?"".concat(t,"-").concat(o):o}(r.displayName,r.parentComponentId):h,m=r.displayName,y=void 0===m?function(e){return L(e)?"styled.".concat(e):"Styled(".concat(B(e),")")}(e):m,g=r.displayName&&r.componentId?"".concat(R(r.displayName),"-").concat(r.componentId):r.componentId||f,S=i&&a.attrs?a.attrs.concat(d).filter(Boolean):d,w=r.shouldForwardProp;if(i&&a.shouldForwardProp){var b=a.shouldForwardProp;if(r.shouldForwardProp){var E=r.shouldForwardProp;w=function(e,t){return b(e,t)&&E(e,t)}}else w=b}var N=new Ze(s,g,i?a.componentStyle:void 0);function O(e,r){return function(e,r,s){var i=e.attrs,a=e.componentStyle,c=e.defaultProps,p=e.foldedComponentIds,d=e.styledComponentId,h=e.target,f=react__WEBPACK_IMPORTED_MODULE_2___default.a.useContext(Ke),m=Be(),y=e.shouldForwardProp||m.shouldForwardProp; true&&Object(react__WEBPACK_IMPORTED_MODULE_2__["useDebugValue"])(d);var v=I(r,f,c)||C,g=function(e,n,o){for(var r,s=Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({},n),{className:void 0,theme:o}),i=0;i<e.length;i+=1){var a=re(r=e[i])?r(s):r;for(var c in a)s[c]="className"===c?ie(s[c],a[c]):"style"===c?Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({},s[c]),a[c]):a[c]}return n.className&&(s.className=ie(s.className,n.className)),s}(i,r,v),S=g.as||h,w={};for(var b in g)void 0===g[b]||"$"===b[0]||"as"===b||"theme"===b&&g.theme===v||("forwardedAs"===b?w.as=g.forwardedAs:y&&!y(b,S)||(w[b]=g[b],y||"development"!=='development'||Object(_emotion_is_prop_valid__WEBPACK_IMPORTED_MODULE_1__["default"])(b)||ot.has(b)||!A.has(S)||(ot.add(b),console.warn('styled-components: it looks like an unknown prop "'.concat(b,'" is being sent through to the DOM, which will likely trigger a React console error. If you would like automatic filtering of unknown props, you can opt-into that behavior via `<StyleSheetManager shouldForwardProp={...}>` (connect an API like `@emotion/is-prop-valid`) or consider using transient props (`$` prefix for automatic filtering.)')))));var E=function(e,t){var n=Be(),o=e.generateAndInjectStyles(t,n.styleSheet,n.stylis);return true&&Object(react__WEBPACK_IMPORTED_MODULE_2__["useDebugValue"])(o),o}(a,g); true&&e.warnTooManyClasses&&e.warnTooManyClasses(E);var N=ie(p,d);return E&&(N+=" "+E),g.className&&(N+=" "+g.className),w[L(S)&&!A.has(S)?"class":"className"]=N,w.ref=s,Object(react__WEBPACK_IMPORTED_MODULE_2__["createElement"])(S,w)}(D,e,r)}O.displayName=y;var D=react__WEBPACK_IMPORTED_MODULE_2___default.a.forwardRef(O);return D.attrs=S,D.componentStyle=N,D.displayName=y,D.shouldForwardProp=w,D.foldedComponentIds=i?ie(a.foldedComponentIds,a.styledComponentId):"",D.styledComponentId=g,D.target=i?a.target:e,Object.defineProperty(D,"defaultProps",{get:function(){return this._foldedDefaultProps},set:function(e){this._foldedDefaultProps=i?function(e){for(var t=[],n=1;n<arguments.length;n++)t[n-1]=arguments[n];for(var o=0,r=t;o<r.length;o++)le(e,r[o],!0);return e}({},a.defaultProps,e):e}}), true&&(P(y,g),D.warnTooManyClasses=function(e,t){var n={},o=!1;return function(r){if(!o&&(n[r]=!0,Object.keys(n).length>=200)){var s=t?' with the id of "'.concat(t,'"'):"";console.warn("Over ".concat(200," classes were generated for component ").concat(e).concat(s,".\n")+"Consider using the attrs method, together with a style object for frequently changed styles.\nExample:\n  const Component = styled.div.attrs(props => ({\n    style: {\n      background: props.background,\n    },\n  }))`width: 100%;`\n\n  <Component />"),o=!0,n={}}}}(y,g)),ue(D,function(){return".".concat(D.styledComponentId)}),c&&oe(D,e,{attrs:!0,componentStyle:!0,displayName:!0,foldedComponentIds:!0,shouldForwardProp:!0,styledComponentId:!0,target:!0}),D}function st(e,t){for(var n=[e[0]],o=0,r=t.length;o<r;o+=1)n.push(t[o],e[o+1]);return n}var it=function(e){return Object.assign(e,{isCss:!0})};function at(t){for(var n=[],o=1;o<arguments.length;o++)n[o-1]=arguments[o];if(re(t)||ce(t))return it(Ue(st(_,Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__spreadArray"])([t],n,!0))));var r=t;return 0===n.length&&1===r.length&&"string"==typeof r[0]?Ue(r):it(Ue(st(r,n)))}function ct(n,o,r){if(void 0===r&&(r=C),!o)throw he(1,o);var s=function(t){for(var s=[],i=1;i<arguments.length;i++)s[i-1]=arguments[i];return n(o,r,at.apply(void 0,Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__spreadArray"])([t],s,!1)))};return s.attrs=function(e){return ct(n,o,Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({},r),{attrs:Array.prototype.concat(r.attrs,e).filter(Boolean)}))},s.withConfig=function(e){return ct(n,o,Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({},r),e))},s}var lt=function(e){return ct(rt,e)},ut=lt;A.forEach(function(e){ut[e]=lt(e)});var pt=function(){function e(e,t){this.rules=e,this.componentId=t,this.isStatic=Je(e),Re.registerId(this.componentId+1)}return e.prototype.createStyles=function(e,t,n,o){var r=o(ae(Ue(this.rules,t,n,o)),""),s=this.componentId+e;n.insertRules(s,s,r)},e.prototype.removeStyles=function(e,t){t.clearRules(this.componentId+e)},e.prototype.renderStyles=function(e,t,n,o){e>2&&Re.registerId(this.componentId+e),this.removeStyles(e,n),this.createStyles(e,t,n,o)},e}();function dt(n){for(var r=[],s=1;s<arguments.length;s++)r[s-1]=arguments[s];var i=at.apply(void 0,Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__spreadArray"])([n],r,!1)),a="sc-global-".concat(z(JSON.stringify(i))),c=new pt(i,a); true&&P(a);var l=function(e){var t=Be(),n=react__WEBPACK_IMPORTED_MODULE_2___default.a.useContext(Ke),r=react__WEBPACK_IMPORTED_MODULE_2___default.a.useRef(t.styleSheet.allocateGSInstance(a)).current;return true&&react__WEBPACK_IMPORTED_MODULE_2___default.a.Children.count(e.children)&&console.warn("The global style component ".concat(a," was given child JSX. createGlobalStyle does not render children.")), true&&i.some(function(e){return"string"==typeof e&&-1!==e.indexOf("@import")})&&console.warn("Please do not use @import CSS syntax in createGlobalStyle at this time, as the CSSOM APIs we use in production do not handle it well. Instead, we recommend using a library such as react-helmet to inject a typical <link> meta tag to the stylesheet, or simply embedding it manually in your index.html <head> section for a simpler app."),t.styleSheet.server&&u(r,e,t.styleSheet,n,t.stylis),react__WEBPACK_IMPORTED_MODULE_2___default.a.useLayoutEffect(function(){if(!t.styleSheet.server)return u(r,e,t.styleSheet,n,t.stylis),function(){return c.removeStyles(r,t.styleSheet)}},[r,e,t.styleSheet,n,t.stylis]),null};function u(e,n,o,r,s){if(c.isStatic)c.renderStyles(e,b,o,s);else{var i=Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({},n),{theme:I(n,r,l.defaultProps)});c.renderStyles(e,i,o,s)}}return react__WEBPACK_IMPORTED_MODULE_2___default.a.memo(l)}function ht(t){for(var n=[],o=1;o<arguments.length;o++)n[o-1]=arguments[o]; true&&"undefined"!=typeof navigator&&"ReactNative"===navigator.product&&console.warn("`keyframes` cannot be used on ReactNative, only on the web. To do animation in ReactNative please use Animated.");var r=ae(at.apply(void 0,Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__spreadArray"])([t],n,!1))),s=z(r);return new Ge(s,r)}function ft(e){var n=react__WEBPACK_IMPORTED_MODULE_2___default.a.forwardRef(function(n,r){var s=I(n,react__WEBPACK_IMPORTED_MODULE_2___default.a.useContext(Ke),e.defaultProps);return true&&void 0===s&&console.warn('[withTheme] You are not using a ThemeProvider nor passing a theme prop or a theme in defaultProps in component class "'.concat(B(e),'"')),react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(e,Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({},n,{theme:s,ref:r}))});return n.displayName="WithTheme(".concat(B(e),")"),oe(n,e)}var mt=function(){function e(){var e=this;this._emitSheetCSS=function(){var t=e.instance.toString(),n=Pe(),o=ae([n&&'nonce="'.concat(n,'"'),"".concat(f,'="true"'),"".concat(y,'="').concat(v,'"')].filter(Boolean)," ");return"<style ".concat(o,">").concat(t,"</style>")},this.getStyleTags=function(){if(e.sealed)throw he(2);return e._emitSheetCSS()},this.getStyleElement=function(){var n;if(e.sealed)throw he(2);var r=((n={})[f]="",n[y]=v,n.dangerouslySetInnerHTML={__html:e.instance.toString()},n),s=Pe();return s&&(r.nonce=s),[react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("style",Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({},r,{key:"sc-0-0"}))]},this.seal=function(){e.sealed=!0},this.instance=new Re({isServer:!0}),this.sealed=!1}return e.prototype.collectStyles=function(e){if(this.sealed)throw he(2);return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(Le,{sheet:this.instance},e)},e.prototype.interleaveWithNodeStream=function(e){throw he(3)},e}(),yt={StyleSheet:Re,mainSheet:Ve}; true&&"undefined"!=typeof navigator&&"ReactNative"===navigator.product&&console.warn("It looks like you've imported 'styled-components' on React Native.\nPerhaps you're looking to import 'styled-components/native'?\nRead more about this at https://www.styled-components.com/docs/basics#react-native");var vt="__sc-".concat(f,"__"); true&&"undefined"!=typeof window&&(window[vt]||(window[vt]=0),1===window[vt]&&console.warn("It looks like there are several instances of 'styled-components' initialized in this application. This may cause dynamic styles to not render properly, errors during the rehydration process, a missing theme prop, and makes your application bigger without good reason.\n\nSee https://s-c.sh/2BAXzed for more info."),window[vt]+=1);
//# sourceMappingURL=styled-components.browser.esm.js.map

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("../../../node_modules/process/browser.js")))

/***/ }),

/***/ "../../../node_modules/styled-components/node_modules/@emotion/unitless/dist/emotion-unitless.esm.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var unitlessKeys = {
  animationIterationCount: 1,
  borderImageOutset: 1,
  borderImageSlice: 1,
  borderImageWidth: 1,
  boxFlex: 1,
  boxFlexGroup: 1,
  boxOrdinalGroup: 1,
  columnCount: 1,
  columns: 1,
  flex: 1,
  flexGrow: 1,
  flexPositive: 1,
  flexShrink: 1,
  flexNegative: 1,
  flexOrder: 1,
  gridRow: 1,
  gridRowEnd: 1,
  gridRowSpan: 1,
  gridRowStart: 1,
  gridColumn: 1,
  gridColumnEnd: 1,
  gridColumnSpan: 1,
  gridColumnStart: 1,
  msGridRow: 1,
  msGridRowSpan: 1,
  msGridColumn: 1,
  msGridColumnSpan: 1,
  fontWeight: 1,
  lineHeight: 1,
  opacity: 1,
  order: 1,
  orphans: 1,
  tabSize: 1,
  widows: 1,
  zIndex: 1,
  zoom: 1,
  WebkitLineClamp: 1,
  // SVG-related properties
  fillOpacity: 1,
  floodOpacity: 1,
  stopOpacity: 1,
  strokeDasharray: 1,
  strokeDashoffset: 1,
  strokeMiterlimit: 1,
  strokeOpacity: 1,
  strokeWidth: 1
};

/* harmony default export */ __webpack_exports__["default"] = (unitlessKeys);


/***/ }),

/***/ "../../../node_modules/styled-components/node_modules/stylis/dist/stylis.mjs":
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CHARSET", function() { return f; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "COMMENT", function() { return n; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "COUNTER_STYLE", function() { return w; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DECLARATION", function() { return s; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DOCUMENT", function() { return v; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FONT_FACE", function() { return b; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FONT_FEATURE_VALUES", function() { return d; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IMPORT", function() { return i; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "KEYFRAMES", function() { return h; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LAYER", function() { return g; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MEDIA", function() { return u; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MOZ", function() { return r; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MS", function() { return e; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NAMESPACE", function() { return p; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PAGE", function() { return t; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RULESET", function() { return c; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SUPPORTS", function() { return l; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VIEWPORT", function() { return o; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WEBKIT", function() { return a; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "abs", function() { return k; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "alloc", function() { return X; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "append", function() { return q; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "assign", function() { return m; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "caret", function() { return U; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "char", function() { return P; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "character", function() { return I; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "characters", function() { return J; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "charat", function() { return O; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "column", function() { return F; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "combine", function() { return B; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "comment", function() { return fe; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "commenter", function() { return ce; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "compile", function() { return te; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "copy", function() { return L; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dealloc", function() { return Y; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "declaration", function() { return oe; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "delimit", function() { return Z; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "delimiter", function() { return ne; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "escaping", function() { return ae; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "filter", function() { return D; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "from", function() { return $; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hash", function() { return x; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "identifier", function() { return se; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "indexof", function() { return C; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "length", function() { return G; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "lift", function() { return N; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "line", function() { return E; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "match", function() { return j; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "middleware", function() { return he; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "namespace", function() { return de; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "next", function() { return R; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "node", function() { return K; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parse", function() { return ue; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "peek", function() { return T; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "position", function() { return H; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "prefix", function() { return le; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "prefixer", function() { return we; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "prev", function() { return Q; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "replace", function() { return z; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ruleset", function() { return ie; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rulesheet", function() { return be; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "serialize", function() { return ve; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sizeof", function() { return S; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "slice", function() { return V; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "stringify", function() { return pe; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "strlen", function() { return M; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "substr", function() { return A; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "token", function() { return W; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tokenize", function() { return _; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tokenizer", function() { return re; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "trim", function() { return y; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "whitespace", function() { return ee; });
var e="-ms-";var r="-moz-";var a="-webkit-";var n="comm";var c="rule";var s="decl";var t="@page";var u="@media";var i="@import";var f="@charset";var o="@viewport";var l="@supports";var v="@document";var p="@namespace";var h="@keyframes";var b="@font-face";var w="@counter-style";var d="@font-feature-values";var g="@layer";var k=Math.abs;var $=String.fromCharCode;var m=Object.assign;function x(e,r){return O(e,0)^45?(((r<<2^O(e,0))<<2^O(e,1))<<2^O(e,2))<<2^O(e,3):0}function y(e){return e.trim()}function j(e,r){return(e=r.exec(e))?e[0]:e}function z(e,r,a){return e.replace(r,a)}function C(e,r,a){return e.indexOf(r,a)}function O(e,r){return e.charCodeAt(r)|0}function A(e,r,a){return e.slice(r,a)}function M(e){return e.length}function S(e){return e.length}function q(e,r){return r.push(e),e}function B(e,r){return e.map(r).join("")}function D(e,r){return e.filter((function(e){return!j(e,r)}))}var E=1;var F=1;var G=0;var H=0;var I=0;var J="";function K(e,r,a,n,c,s,t,u){return{value:e,root:r,parent:a,type:n,props:c,children:s,line:E,column:F,length:t,return:"",siblings:u}}function L(e,r){return m(K("",null,null,"",null,null,0,e.siblings),e,{length:-e.length},r)}function N(e){while(e.root)e=L(e.root,{children:[e]});q(e,e.siblings)}function P(){return I}function Q(){I=H>0?O(J,--H):0;if(F--,I===10)F=1,E--;return I}function R(){I=H<G?O(J,H++):0;if(F++,I===10)F=1,E++;return I}function T(){return O(J,H)}function U(){return H}function V(e,r){return A(J,e,r)}function W(e){switch(e){case 0:case 9:case 10:case 13:case 32:return 5;case 33:case 43:case 44:case 47:case 62:case 64:case 126:case 59:case 123:case 125:return 4;case 58:return 3;case 34:case 39:case 40:case 91:return 2;case 41:case 93:return 1}return 0}function X(e){return E=F=1,G=M(J=e),H=0,[]}function Y(e){return J="",e}function Z(e){return y(V(H-1,ne(e===91?e+2:e===40?e+1:e)))}function _(e){return Y(re(X(e)))}function ee(e){while(I=T())if(I<33)R();else break;return W(e)>2||W(I)>3?"":" "}function re(e){while(R())switch(W(I)){case 0:q(se(H-1),e);break;case 2:q(Z(I),e);break;default:q($(I),e)}return e}function ae(e,r){while(--r&&R())if(I<48||I>102||I>57&&I<65||I>70&&I<97)break;return V(e,U()+(r<6&&T()==32&&R()==32))}function ne(e){while(R())switch(I){case e:return H;case 34:case 39:if(e!==34&&e!==39)ne(I);break;case 40:if(e===41)ne(e);break;case 92:R();break}return H}function ce(e,r){while(R())if(e+I===47+10)break;else if(e+I===42+42&&T()===47)break;return"/*"+V(r,H-1)+"*"+$(e===47?e:R())}function se(e){while(!W(T()))R();return V(e,H)}function te(e){return Y(ue("",null,null,null,[""],e=X(e),0,[0],e))}function ue(e,r,a,n,c,s,t,u,i){var f=0;var o=0;var l=t;var v=0;var p=0;var h=0;var b=1;var w=1;var d=1;var g=0;var m="";var x=c;var y=s;var j=n;var A=m;while(w)switch(h=g,g=R()){case 40:if(h!=108&&O(A,l-1)==58){if(C(A+=z(Z(g),"&","&\f"),"&\f",k(f?u[f-1]:0))!=-1)d=-1;break}case 34:case 39:case 91:A+=Z(g);break;case 9:case 10:case 13:case 32:A+=ee(h);break;case 92:A+=ae(U()-1,7);continue;case 47:switch(T()){case 42:case 47:q(fe(ce(R(),U()),r,a,i),i);break;default:A+="/"}break;case 123*b:u[f++]=M(A)*d;case 125*b:case 59:case 0:switch(g){case 0:case 125:w=0;case 59+o:if(d==-1)A=z(A,/\f/g,"");if(p>0&&M(A)-l)q(p>32?oe(A+";",n,a,l-1,i):oe(z(A," ","")+";",n,a,l-2,i),i);break;case 59:A+=";";default:q(j=ie(A,r,a,f,o,c,u,m,x=[],y=[],l,s),s);if(g===123)if(o===0)ue(A,r,j,j,x,s,l,u,y);else switch(v===99&&O(A,3)===110?100:v){case 100:case 108:case 109:case 115:ue(e,j,j,n&&q(ie(e,j,j,0,0,c,u,m,c,x=[],l,y),y),c,y,l,u,n?x:y);break;default:ue(A,j,j,j,[""],y,0,u,y)}}f=o=p=0,b=d=1,m=A="",l=t;break;case 58:l=1+M(A),p=h;default:if(b<1)if(g==123)--b;else if(g==125&&b++==0&&Q()==125)continue;switch(A+=$(g),g*b){case 38:d=o>0?1:(A+="\f",-1);break;case 44:u[f++]=(M(A)-1)*d,d=1;break;case 64:if(T()===45)A+=Z(R());v=T(),o=l=M(m=A+=se(U())),g++;break;case 45:if(h===45&&M(A)==2)b=0}}return s}function ie(e,r,a,n,s,t,u,i,f,o,l,v){var p=s-1;var h=s===0?t:[""];var b=S(h);for(var w=0,d=0,g=0;w<n;++w)for(var $=0,m=A(e,p+1,p=k(d=u[w])),x=e;$<b;++$)if(x=y(d>0?h[$]+" "+m:z(m,/&\f/g,h[$])))f[g++]=x;return K(e,r,a,s===0?c:i,f,o,l,v)}function fe(e,r,a,c){return K(e,r,a,n,$(P()),A(e,2,-2),0,c)}function oe(e,r,a,n,c){return K(e,r,a,s,A(e,0,n),A(e,n+1,-1),n,c)}function le(n,c,s){switch(x(n,c)){case 5103:return a+"print-"+n+n;case 5737:case 4201:case 3177:case 3433:case 1641:case 4457:case 2921:case 5572:case 6356:case 5844:case 3191:case 6645:case 3005:case 6391:case 5879:case 5623:case 6135:case 4599:case 4855:case 4215:case 6389:case 5109:case 5365:case 5621:case 3829:return a+n+n;case 4789:return r+n+n;case 5349:case 4246:case 4810:case 6968:case 2756:return a+n+r+n+e+n+n;case 5936:switch(O(n,c+11)){case 114:return a+n+e+z(n,/[svh]\w+-[tblr]{2}/,"tb")+n;case 108:return a+n+e+z(n,/[svh]\w+-[tblr]{2}/,"tb-rl")+n;case 45:return a+n+e+z(n,/[svh]\w+-[tblr]{2}/,"lr")+n}case 6828:case 4268:case 2903:return a+n+e+n+n;case 6165:return a+n+e+"flex-"+n+n;case 5187:return a+n+z(n,/(\w+).+(:[^]+)/,a+"box-$1$2"+e+"flex-$1$2")+n;case 5443:return a+n+e+"flex-item-"+z(n,/flex-|-self/g,"")+(!j(n,/flex-|baseline/)?e+"grid-row-"+z(n,/flex-|-self/g,""):"")+n;case 4675:return a+n+e+"flex-line-pack"+z(n,/align-content|flex-|-self/g,"")+n;case 5548:return a+n+e+z(n,"shrink","negative")+n;case 5292:return a+n+e+z(n,"basis","preferred-size")+n;case 6060:return a+"box-"+z(n,"-grow","")+a+n+e+z(n,"grow","positive")+n;case 4554:return a+z(n,/([^-])(transform)/g,"$1"+a+"$2")+n;case 6187:return z(z(z(n,/(zoom-|grab)/,a+"$1"),/(image-set)/,a+"$1"),n,"")+n;case 5495:case 3959:return z(n,/(image-set\([^]*)/,a+"$1"+"$`$1");case 4968:return z(z(n,/(.+:)(flex-)?(.*)/,a+"box-pack:$3"+e+"flex-pack:$3"),/s.+-b[^;]+/,"justify")+a+n+n;case 4200:if(!j(n,/flex-|baseline/))return e+"grid-column-align"+A(n,c)+n;break;case 2592:case 3360:return e+z(n,"template-","")+n;case 4384:case 3616:if(s&&s.some((function(e,r){return c=r,j(e.props,/grid-\w+-end/)}))){return~C(n+(s=s[c].value),"span",0)?n:e+z(n,"-start","")+n+e+"grid-row-span:"+(~C(s,"span",0)?j(s,/\d+/):+j(s,/\d+/)-+j(n,/\d+/))+";"}return e+z(n,"-start","")+n;case 4896:case 4128:return s&&s.some((function(e){return j(e.props,/grid-\w+-start/)}))?n:e+z(z(n,"-end","-span"),"span ","")+n;case 4095:case 3583:case 4068:case 2532:return z(n,/(.+)-inline(.+)/,a+"$1$2")+n;case 8116:case 7059:case 5753:case 5535:case 5445:case 5701:case 4933:case 4677:case 5533:case 5789:case 5021:case 4765:if(M(n)-1-c>6)switch(O(n,c+1)){case 109:if(O(n,c+4)!==45)break;case 102:return z(n,/(.+:)(.+)-([^]+)/,"$1"+a+"$2-$3"+"$1"+r+(O(n,c+3)==108?"$3":"$2-$3"))+n;case 115:return~C(n,"stretch",0)?le(z(n,"stretch","fill-available"),c,s)+n:n}break;case 5152:case 5920:return z(n,/(.+?):(\d+)(\s*\/\s*(span)?\s*(\d+))?(.*)/,(function(r,a,c,s,t,u,i){return e+a+":"+c+i+(s?e+a+"-span:"+(t?u:+u-+c)+i:"")+n}));case 4949:if(O(n,c+6)===121)return z(n,":",":"+a)+n;break;case 6444:switch(O(n,O(n,14)===45?18:11)){case 120:return z(n,/(.+:)([^;\s!]+)(;|(\s+)?!.+)?/,"$1"+a+(O(n,14)===45?"inline-":"")+"box$3"+"$1"+a+"$2$3"+"$1"+e+"$2box$3")+n;case 100:return z(n,":",":"+e)+n}break;case 5719:case 2647:case 2135:case 3927:case 2391:return z(n,"scroll-","scroll-snap-")+n}return n}function ve(e,r){var a="";for(var n=0;n<e.length;n++)a+=r(e[n],n,e,r)||"";return a}function pe(e,r,a,t){switch(e.type){case g:if(e.children.length)break;case i:case s:return e.return=e.return||e.value;case n:return"";case h:return e.return=e.value+"{"+ve(e.children,t)+"}";case c:if(!M(e.value=e.props.join(",")))return""}return M(a=ve(e.children,t))?e.return=e.value+"{"+a+"}":""}function he(e){var r=S(e);return function(a,n,c,s){var t="";for(var u=0;u<r;u++)t+=e[u](a,n,c,s)||"";return t}}function be(e){return function(r){if(!r.root)if(r=r.return)e(r)}}function we(n,t,u,i){if(n.length>-1)if(!n.return)switch(n.type){case s:n.return=le(n.value,n.length,u);return;case h:return ve([L(n,{value:z(n.value,"@","@"+a)})],i);case c:if(n.length)return B(u=n.props,(function(c){switch(j(c,i=/(::plac\w+|:read-\w+)/)){case":read-only":case":read-write":N(L(n,{props:[z(c,/:(read-\w+)/,":"+r+"$1")]}));N(L(n,{props:[c]}));m(n,{props:D(u,i)});break;case"::placeholder":N(L(n,{props:[z(c,/:(plac\w+)/,":"+a+"input-$1")]}));N(L(n,{props:[z(c,/:(plac\w+)/,":"+r+"$1")]}));N(L(n,{props:[z(c,/:(plac\w+)/,e+"input-$1")]}));N(L(n,{props:[c]}));m(n,{props:D(u,i)});break}return""}))}}function de(e){switch(e.type){case c:e.props=e.props.map((function(r){return B(_(r),(function(r,a,n){switch(O(r,0)){case 12:return A(r,1,M(r));case 0:case 40:case 43:case 62:case 126:return r;case 58:if(n[++a]==="global")n[a]="",n[++a]="\f"+A(n[a],a=1,-1);case 32:return a===1?"":r;default:switch(a){case 0:e=r;return S(n)>1?"":r;case a=S(n)-1:case 2:return a===2?r+e+e:r+e;default:return r}}}))}))}}
//# sourceMappingURL=stylis.mjs.map


/***/ }),

/***/ "../../../node_modules/styled-components/node_modules/tslib/tslib.es6.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__extends", function() { return __extends; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__assign", function() { return __assign; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__rest", function() { return __rest; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__decorate", function() { return __decorate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__param", function() { return __param; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__esDecorate", function() { return __esDecorate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__runInitializers", function() { return __runInitializers; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__propKey", function() { return __propKey; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__setFunctionName", function() { return __setFunctionName; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__metadata", function() { return __metadata; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__awaiter", function() { return __awaiter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__generator", function() { return __generator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__createBinding", function() { return __createBinding; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__exportStar", function() { return __exportStar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__values", function() { return __values; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__read", function() { return __read; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__spread", function() { return __spread; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__spreadArrays", function() { return __spreadArrays; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__spreadArray", function() { return __spreadArray; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__await", function() { return __await; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncGenerator", function() { return __asyncGenerator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncDelegator", function() { return __asyncDelegator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncValues", function() { return __asyncValues; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__makeTemplateObject", function() { return __makeTemplateObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__importStar", function() { return __importStar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__importDefault", function() { return __importDefault; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__classPrivateFieldGet", function() { return __classPrivateFieldGet; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__classPrivateFieldSet", function() { return __classPrivateFieldSet; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__classPrivateFieldIn", function() { return __classPrivateFieldIn; });
/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    }
    return __assign.apply(this, arguments);
}

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
}

function __esDecorate(ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.push(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.push(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};

function __runInitializers(thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};

function __propKey(x) {
    return typeof x === "symbol" ? x : "".concat(x);
};

function __setFunctionName(f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
}

var __createBinding = Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
});

function __exportStar(m, o) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p)) __createBinding(o, m, p);
}

function __values(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

/** @deprecated */
function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

/** @deprecated */
function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
}

function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
}

function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
}

function __asyncDelegator(o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
    function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: false } : f ? f(v) : v; } : f; }
}

function __asyncValues(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
}

function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};

var __setModuleDefault = Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
};

function __importStar(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
}

function __importDefault(mod) {
    return (mod && mod.__esModule) ? mod : { default: mod };
}

function __classPrivateFieldGet(receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
}

function __classPrivateFieldSet(receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
}

function __classPrivateFieldIn(state, receiver) {
    if (receiver === null || (typeof receiver !== "object" && typeof receiver !== "function")) throw new TypeError("Cannot use 'in' operator on non-object");
    return typeof state === "function" ? receiver === state : state.has(receiver);
}


/***/ }),

/***/ "./actions/deviceActions.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EnableValueSelector", function() { return EnableValueSelector; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SetCollectingSelectionData", function() { return SetCollectingSelectionData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SetSelectedValue", function() { return SetSelectedValue; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UpdateDeviceDescription", function() { return UpdateDeviceDescription; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UpdateViewDescription", function() { return UpdateViewDescription; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UpdateOutputData", function() { return UpdateOutputData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateNodeIdAsyncActionCreator", function() { return updateNodeIdAsyncActionCreator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "postProcessDisplaySpecificationActionCreator", function() { return postProcessDisplaySpecificationActionCreator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateViewActionAsyncCreator", function() { return updateViewActionAsyncCreator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateDataActionAsyncCreator", function() { return updateDataActionAsyncCreator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeElementActionAsyncCreator", function() { return removeElementActionAsyncCreator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "executeRpcActionAsyncCreator", function() { return executeRpcActionAsyncCreator; });
/* harmony import */ var core_js_modules_web_dom_iterable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../../node_modules/core-js/modules/web.dom.iterable.js");
/* harmony import */ var core_js_modules_web_dom_iterable__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_iterable__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../../node_modules/regenerator-runtime/runtime.js");
/* harmony import */ var regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _framework_src_flux_action__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../../../framework/src/flux/action.ts");
/* harmony import */ var _framework_src_actions_navigationActions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("../../../framework/src/actions/navigationActions.ts");
/* harmony import */ var _framework_src_actions_errorActions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("../../../framework/src/actions/errorActions.ts");
/* harmony import */ var _handlers_viewDescriptionHandler__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./handlers/viewDescriptionHandler.ts");
/* harmony import */ var _services_configurationrestServices__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./services/configurationrestServices.ts");
/* harmony import */ var _yang_yangParser__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./yang/yangParser.ts");
/* harmony import */ var _models_uiModels__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./models/uiModels.ts");
/* harmony import */ var _utilities_viewEngineHelper__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./utilities/viewEngineHelper.ts");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }


var _this7 = undefined;
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
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








var EnableValueSelector = /*#__PURE__*/function (_Action) {
  function EnableValueSelector(listSpecification, listData, keyProperty, onValueSelected) {
    var _this;
    _classCallCheck(this, EnableValueSelector);
    _this = _callSuper(this, EnableValueSelector);
    _this.listSpecification = listSpecification;
    _this.listData = listData;
    _this.keyProperty = keyProperty;
    _this.onValueSelected = onValueSelected;
    return _this;
  }
  _inherits(EnableValueSelector, _Action);
  return _createClass(EnableValueSelector);
}(_framework_src_flux_action__WEBPACK_IMPORTED_MODULE_2__["Action"]);
var SetCollectingSelectionData = /*#__PURE__*/function (_Action2) {
  function SetCollectingSelectionData(busy) {
    var _this2;
    _classCallCheck(this, SetCollectingSelectionData);
    _this2 = _callSuper(this, SetCollectingSelectionData);
    _this2.busy = busy;
    return _this2;
  }
  _inherits(SetCollectingSelectionData, _Action2);
  return _createClass(SetCollectingSelectionData);
}(_framework_src_flux_action__WEBPACK_IMPORTED_MODULE_2__["Action"]);
var SetSelectedValue = /*#__PURE__*/function (_Action3) {
  function SetSelectedValue(value) {
    var _this3;
    _classCallCheck(this, SetSelectedValue);
    _this3 = _callSuper(this, SetSelectedValue);
    _this3.value = value;
    return _this3;
  }
  _inherits(SetSelectedValue, _Action3);
  return _createClass(SetSelectedValue);
}(_framework_src_flux_action__WEBPACK_IMPORTED_MODULE_2__["Action"]);
var UpdateDeviceDescription = /*#__PURE__*/function (_Action4) {
  function UpdateDeviceDescription(nodeId, modules, views) {
    var _this4;
    _classCallCheck(this, UpdateDeviceDescription);
    _this4 = _callSuper(this, UpdateDeviceDescription);
    _this4.nodeId = nodeId;
    _this4.modules = modules;
    _this4.views = views;
    return _this4;
  }
  _inherits(UpdateDeviceDescription, _Action4);
  return _createClass(UpdateDeviceDescription);
}(_framework_src_flux_action__WEBPACK_IMPORTED_MODULE_2__["Action"]);
var UpdateViewDescription = /*#__PURE__*/function (_Action5) {
  function UpdateViewDescription(vPath, viewData) {
    var _this5;
    var displaySpecification = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {
      displayMode: _handlers_viewDescriptionHandler__WEBPACK_IMPORTED_MODULE_5__["DisplayModeType"].doNotDisplay
    };
    _classCallCheck(this, UpdateViewDescription);
    _this5 = _callSuper(this, UpdateViewDescription);
    _this5.vPath = vPath;
    _this5.viewData = viewData;
    _this5.displaySpecification = displaySpecification;
    return _this5;
  }
  _inherits(UpdateViewDescription, _Action5);
  return _createClass(UpdateViewDescription);
}(_framework_src_flux_action__WEBPACK_IMPORTED_MODULE_2__["Action"]);
var UpdateOutputData = /*#__PURE__*/function (_Action6) {
  function UpdateOutputData(outputData) {
    var _this6;
    _classCallCheck(this, UpdateOutputData);
    _this6 = _callSuper(this, UpdateOutputData);
    _this6.outputData = outputData;
    return _this6;
  }
  _inherits(UpdateOutputData, _Action6);
  return _createClass(UpdateOutputData);
}(_framework_src_flux_action__WEBPACK_IMPORTED_MODULE_2__["Action"]);
var updateNodeIdAsyncActionCreator = function updateNodeIdAsyncActionCreator(nodeId) {
  var _this8 = this;
  _newArrowCheck(this, _this7);
  return function (dispatch, _getState) {
    _newArrowCheck(this, _this8);
    return __awaiter(void 0, void 0, void 0, /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
      var _this9 = this;
      var availableCapabilitiesTemp, unavailableCapabilitiesTemp, importOnlyModulesTemp, configData, configRow, _yield$configurationR, availableCapabilities, unavailableCapabilities, importOnlyModules, _yield$configurationR2, _availableCapabilities, _unavailableCapabilities, _importOnlyModules, parser, i, capRaw;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            if (!(localStorage.getItem('configData') !== null)) {
              _context.next = 8;
              break;
            }
            configData = JSON.parse(localStorage.getItem('configData') || '{}'); //var YangData=JSON.parse(localStorage.getItem('yangdataArray') || '{}');
            configRow = configData.reduce(function (obj, cn) {
              _newArrowCheck(this, _this9);
              if (cn.id == nodeId) {
                obj = cn.cndata;
              }
              return obj;
            }.bind(this), []);
            availableCapabilitiesTemp = configRow.availableCapabilities;
            unavailableCapabilitiesTemp = configRow.unavailableCapabilities;
            importOnlyModulesTemp = configRow.importOnlyModules;
            _context.next = 18;
            break;
          case 8:
            if (!(availableCapabilitiesTemp == null || availableCapabilitiesTemp == undefined || !availableCapabilitiesTemp || availableCapabilitiesTemp.length <= 0)) {
              _context.next = 18;
              break;
            }
            _context.next = 11;
            return _services_configurationrestServices__WEBPACK_IMPORTED_MODULE_6__["configurationRestService"].getCapabilitiesByMountId(nodeId);
          case 11:
            _yield$configurationR = _context.sent;
            availableCapabilities = _yield$configurationR.availableCapabilities;
            unavailableCapabilities = _yield$configurationR.unavailableCapabilities;
            importOnlyModules = _yield$configurationR.importOnlyModules;
            availableCapabilitiesTemp = availableCapabilities;
            unavailableCapabilitiesTemp = unavailableCapabilities;
            importOnlyModulesTemp = importOnlyModules;
          case 18:
            if (!(!availableCapabilitiesTemp || availableCapabilitiesTemp.length <= 0)) {
              _context.next = 33;
              break;
            }
            _context.next = 21;
            return _services_configurationrestServices__WEBPACK_IMPORTED_MODULE_6__["configurationRestService"].getCapabilitiesByMountId(nodeId);
          case 21:
            _yield$configurationR2 = _context.sent;
            _availableCapabilities = _yield$configurationR2.availableCapabilities;
            _unavailableCapabilities = _yield$configurationR2.unavailableCapabilities;
            _importOnlyModules = _yield$configurationR2.importOnlyModules;
            availableCapabilitiesTemp = _availableCapabilities;
            unavailableCapabilitiesTemp = _unavailableCapabilities;
            importOnlyModulesTemp = _importOnlyModules;
            if (availableCapabilitiesTemp) {
              _context.next = 33;
              break;
            }
            dispatch(new SetCollectingSelectionData(false));
            //await new Promise(f => setTimeout(f, 1000));
            dispatch(new UpdateDeviceDescription(nodeId, {}, []));
            dispatch(new UpdateViewDescription('', [], {
              displayMode: _handlers_viewDescriptionHandler__WEBPACK_IMPORTED_MODULE_5__["DisplayModeType"].displayAsMessage,
              renderMessage: "NetworkElement : \"".concat(nodeId, "\" has no capabilities.")
            }));
            throw new Error("NetworkElement : [".concat(nodeId, "] has no capabilities."));
          case 33:
            parser = new _yang_yangParser__WEBPACK_IMPORTED_MODULE_7__["YangParser"](nodeId, availableCapabilitiesTemp.reduce(function (acc, cur) {
              _newArrowCheck(this, _this9);
              acc[cur.capability] = cur.version;
              return acc;
            }.bind(this), {}), unavailableCapabilitiesTemp || undefined, importOnlyModulesTemp || undefined); //const parser = new YangParser(unavailableCapabilitiesTemp || undefined, importOnlyModulesTemp || undefined);
            //await new Promise(f => setTimeout(f, 500));
            //if(availableCapabilitiesTemp.length>5){
            i = 0;
          case 35:
            if (!(i < availableCapabilitiesTemp.length)) {
              _context.next = 53;
              break;
            }
            capRaw = availableCapabilitiesTemp[i]; //await parser.addCapability(capRaw.capability, capRaw.version);
            if (!(capRaw.capability != "o-ran-beamforming")) {
              _context.next = 50;
              break;
            }
            if (!(capRaw.capability != "o-ran-uplane-conf")) {
              _context.next = 49;
              break;
            }
            _context.prev = 39;
            _context.next = 42;
            return parser.addCapability(capRaw.capability, capRaw.version);
          case 42:
            _context.next = 47;
            break;
          case 44:
            _context.prev = 44;
            _context.t0 = _context["catch"](39);
            console.error("Error in ".concat(capRaw.capability, " ").concat(capRaw.version), _context.t0);
          case 47:
            _context.next = 50;
            break;
          case 49:
            console.log(capRaw.capability);
          case 50:
            ++i;
            _context.next = 35;
            break;
          case 53:
            parser.postProcess();
            dispatch(new SetCollectingSelectionData(false));
            // if (process.env.NODE_ENV === 'development' ) {
            //   console.log(parser, parser.modules, parser.views);
            // }
            return _context.abrupt("return", dispatch(new UpdateDeviceDescription(nodeId, parser.modules, parser.views)));
          case 56:
          case "end":
            return _context.stop();
        }
      }, _callee, this, [[39, 44]]);
    }));
  }.bind(this);
}.bind(undefined);
var postProcessDisplaySpecificationActionCreator = function postProcessDisplaySpecificationActionCreator(vPath, viewData, displaySpecification) {
  var _this10 = this;
  _newArrowCheck(this, _this7);
  return function (dispatch, _getState) {
    _newArrowCheck(this, _this10);
    return __awaiter(void 0, void 0, void 0, /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            if (!(displaySpecification.displayMode === _handlers_viewDescriptionHandler__WEBPACK_IMPORTED_MODULE_5__["DisplayModeType"].displayAsObject)) {
              _context2.next = 8;
              break;
            }
            _context2.t0 = Object;
            _context2.t1 = Object.assign({}, displaySpecification);
            _context2.next = 5;
            return Object(_utilities_viewEngineHelper__WEBPACK_IMPORTED_MODULE_9__["filterViewElements"])(vPath, viewData, displaySpecification.viewSpecification);
          case 5:
            _context2.t2 = _context2.sent;
            _context2.t3 = {
              viewSpecification: _context2.t2
            };
            displaySpecification = _context2.t0.assign.call(_context2.t0, _context2.t1, _context2.t3);
          case 8:
            dispatch(new UpdateViewDescription(vPath, viewData, displaySpecification));
          case 9:
          case "end":
            return _context2.stop();
        }
      }, _callee2);
    }));
  }.bind(this);
}.bind(undefined);
var updateViewActionAsyncCreator = function updateViewActionAsyncCreator(vPath) {
  var _this11 = this;
  _newArrowCheck(this, _this7);
  return function (dispatch, getState) {
    _newArrowCheck(this, _this11);
    return __awaiter(void 0, void 0, void 0, /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
      var _this12 = this;
      var pathParts, _getState2, _getState2$configurat, nodeId, modules, views, dataPath, inputViewSpecification, outputViewSpecification, viewSpecification, viewElement, dataMember, extractList, currentNS, defaultNS, _loop, _ret, ind, data, restResult, _ds, message, ds;
      return _regeneratorRuntime().wrap(function _callee3$(_context4) {
        while (1) switch (_context4.prev = _context4.next) {
          case 0:
            pathParts = Object(_utilities_viewEngineHelper__WEBPACK_IMPORTED_MODULE_9__["splitVPath"])(vPath, /(?:([^\/\["]+)(?:\[([^\]]*)\])?)/g); // 1 = property / 2 = optional key
            _getState2 = getState(), _getState2$configurat = _getState2.configuration.deviceDescription, nodeId = _getState2$configurat.nodeId, modules = _getState2$configurat.modules, views = _getState2$configurat.views;
            dataPath = "/rests/data/network-topology:network-topology/topology=topology-netconf/node=".concat(nodeId, "/yang-ext:mount");
            inputViewSpecification = undefined;
            outputViewSpecification = undefined;
            viewSpecification = views[0];
            extractList = false;
            currentNS = null;
            defaultNS = null;
            dispatch(new SetCollectingSelectionData(true));
            _context4.prev = 10;
            _loop = /*#__PURE__*/_regeneratorRuntime().mark(function _loop() {
              var _this13 = this;
              var _pathParts$ind, property, key, namespaceInd, namespace, _data, _ds2, listSpecification, keyElement, refList, _restResult, refData, refView;
              return _regeneratorRuntime().wrap(function _loop$(_context3) {
                while (1) switch (_context3.prev = _context3.next) {
                  case 0:
                    _pathParts$ind = _slicedToArray(pathParts[ind], 2), property = _pathParts$ind[0], key = _pathParts$ind[1];
                    namespaceInd = property && property.indexOf(':') || -1;
                    namespace = namespaceInd > -1 ? currentNS = property.slice(0, namespaceInd) : currentNS;
                    if (ind === 0) {
                      defaultNS = namespace;
                    }
                    viewElement = viewSpecification.elements[property] || viewSpecification.elements["".concat(namespace, ":").concat(property)];
                    if (viewElement) {
                      _context3.next = 7;
                      break;
                    }
                    throw Error('Property [' + property + '] does not exist.');
                  case 7:
                    if (!(viewElement.isList && !key)) {
                      _context3.next = 49;
                      break;
                    }
                    if (!(pathParts.length - 1 > ind)) {
                      _context3.next = 13;
                      break;
                    }
                    dispatch(new SetCollectingSelectionData(false));
                    throw new Error('No key for list [' + property + ']');
                  case 13:
                    if (!(vPath.endsWith('[]') && pathParts.length - 1 === ind)) {
                      _context3.next = 18;
                      break;
                    }
                    // empty key is used for new element
                    if (viewElement && 'viewId' in viewElement) viewSpecification = views[+viewElement.viewId];
                    _data = Object.keys(viewSpecification.elements).reduce(function (acc, cur) {
                      _newArrowCheck(this, _this13);
                      var elm = viewSpecification.elements[cur];
                      if (elm.default) {
                        acc[elm.id] = elm.default || '';
                      }
                      return acc;
                    }.bind(this), {}); // create display specification
                    _ds2 = {
                      displayMode: _handlers_viewDescriptionHandler__WEBPACK_IMPORTED_MODULE_5__["DisplayModeType"].displayAsObject,
                      viewSpecification: Object(_utilities_viewEngineHelper__WEBPACK_IMPORTED_MODULE_9__["resolveViewDescription"])(defaultNS, vPath, viewSpecification),
                      keyProperty: Object(_models_uiModels__WEBPACK_IMPORTED_MODULE_8__["isViewElementList"])(viewElement) && viewElement.key || undefined
                    }; // update display specification
                    return _context3.abrupt("return", {
                      v: dispatch(postProcessDisplaySpecificationActionCreator(vPath, _data, _ds2))
                    });
                  case 18:
                    if (!(viewElement && Object(_models_uiModels__WEBPACK_IMPORTED_MODULE_8__["isViewElementList"])(viewElement) && viewSpecification.parentView === '0')) {
                      _context3.next = 46;
                      break;
                    }
                    // check if there is a reference as key
                    listSpecification = views[+viewElement.viewId];
                    keyElement = viewElement.key && listSpecification.elements[viewElement.key];
                    if (!(keyElement && Object(_models_uiModels__WEBPACK_IMPORTED_MODULE_8__["isViewElementReference"])(keyElement))) {
                      _context3.next = 32;
                      break;
                    }
                    _context3.next = 24;
                    return Object(_utilities_viewEngineHelper__WEBPACK_IMPORTED_MODULE_9__["getReferencedDataList"])(keyElement.referencePath, dataPath, modules, views);
                  case 24:
                    refList = _context3.sent;
                    if (refList) {
                      _context3.next = 27;
                      break;
                    }
                    throw new Error("Could not find refList for [".concat(keyElement.referencePath, "]."));
                  case 27:
                    if (refList.key) {
                      _context3.next = 29;
                      break;
                    }
                    throw new Error("Key property not found for [".concat(keyElement.referencePath, "]."));
                  case 29:
                    dispatch(new EnableValueSelector(refList.view, refList.data, refList.key, function (refKey) {
                      var _this14 = this;
                      _newArrowCheck(this, _this13);
                      window.setTimeout(function () {
                        _newArrowCheck(this, _this14);
                        return dispatch(new _framework_src_actions_navigationActions__WEBPACK_IMPORTED_MODULE_3__["PushAction"]("".concat(vPath, "[").concat(refKey.replace(/\//ig, '%2F'), "]")));
                      }.bind(this));
                    }.bind(this)));
                    _context3.next = 45;
                    break;
                  case 32:
                    // Found a list at root level of a module w/o a reference key.
                    dataPath += "?&fields=".concat(encodeURIComponent(viewElement.id), "(").concat(encodeURIComponent(viewElement.key || ''), ")");
                    _context3.next = 35;
                    return _services_configurationrestServices__WEBPACK_IMPORTED_MODULE_6__["configurationRestService"].getConfigData(dataPath);
                  case 35:
                    _restResult = _context3.sent;
                    if (!(_restResult && _restResult.status === 200 && _restResult.data && _restResult.data[viewElement.id])) {
                      _context3.next = 43;
                      break;
                    }
                    // spoof the not existing view here
                    refData = _restResult.data[viewElement.id];
                    if (!(!Array.isArray(refData) || !refData.length)) {
                      _context3.next = 40;
                      break;
                    }
                    throw new Error('Found a list at root level of a module containing no keys.');
                  case 40:
                    if (refData.length > 1) {
                      refView = {
                        id: '-1',
                        canEdit: false,
                        config: false,
                        language: 'en-US',
                        elements: _defineProperty({}, viewElement.key, {
                          uiType: 'string',
                          config: false,
                          id: viewElement.key,
                          label: viewElement.key,
                          isList: true
                        })
                      };
                      dispatch(new EnableValueSelector(refView, refData, viewElement.key, function (refKey) {
                        var _this15 = this;
                        _newArrowCheck(this, _this13);
                        window.setTimeout(function () {
                          _newArrowCheck(this, _this15);
                          return dispatch(new _framework_src_actions_navigationActions__WEBPACK_IMPORTED_MODULE_3__["PushAction"]("".concat(vPath, "[").concat(refKey.replace(/\//ig, '%2F'), "]")));
                        }.bind(this));
                      }.bind(this)));
                    } else {
                      window.setTimeout(function () {
                        _newArrowCheck(this, _this13);
                        var _a;
                        return dispatch(new _framework_src_actions_navigationActions__WEBPACK_IMPORTED_MODULE_3__["PushAction"]("".concat(vPath, "[").concat((_a = refData[0]) === null || _a === void 0 ? void 0 : _a.id.replace(/\//ig, '%2F'), "]")));
                      }.bind(this));
                    }
                    _context3.next = 44;
                    break;
                  case 43:
                    throw new Error('Found a list at root level of a module and could not determine the keys.');
                  case 44:
                    dispatch(new SetCollectingSelectionData(false));
                  case 45:
                    return _context3.abrupt("return", {
                      v: void 0
                    });
                  case 46:
                    extractList = true;
                    _context3.next = 52;
                    break;
                  case 49:
                    // normal case & replaces unicode %2C if present
                    dataPath += "/".concat(property).concat(key ? "=".concat(key.replace(/\%2C/g, ',').replace(/\//ig, '%2F')) : '');
                    // in case of the root element the required namespace will be added later,
                    // while extracting the data
                    dataMember = namespace === defaultNS ? viewElement.label : "".concat(namespace, ":").concat(viewElement.label);
                    extractList = false;
                  case 52:
                    if (viewElement && 'viewId' in viewElement) {
                      viewSpecification = views[+viewElement.viewId];
                    } else if (viewElement.uiType === 'rpc') {
                      viewSpecification = views[+(viewElement.inputViewId || 0)];
                      // create new instance & flaten
                      inputViewSpecification = viewElement.inputViewId != null && Object.assign(Object.assign({}, views[+(viewElement.inputViewId || 0)]), {
                        elements: Object(_utilities_viewEngineHelper__WEBPACK_IMPORTED_MODULE_9__["flattenViewElements"])(defaultNS, '', views[+(viewElement.inputViewId || 0)].elements, views, viewElement.label)
                      }) || undefined;
                      outputViewSpecification = viewElement.outputViewId != null && Object.assign(Object.assign({}, views[+(viewElement.outputViewId || 0)]), {
                        elements: Object(_utilities_viewEngineHelper__WEBPACK_IMPORTED_MODULE_9__["flattenViewElements"])(defaultNS, '', views[+(viewElement.outputViewId || 0)].elements, views, viewElement.label)
                      }) || undefined;
                    }
                  case 53:
                  case "end":
                    return _context3.stop();
                }
              }, _loop, this);
            });
            ind = 0;
          case 13:
            if (!(ind < pathParts.length)) {
              _context4.next = 21;
              break;
            }
            return _context4.delegateYield(_loop(), "t0", 15);
          case 15:
            _ret = _context4.t0;
            if (!_ret) {
              _context4.next = 18;
              break;
            }
            return _context4.abrupt("return", _ret.v);
          case 18:
            ++ind;
            _context4.next = 13;
            break;
          case 21:
            data = {}; // do not get any data from netconf if there is no view specified || this is the root element [0] || this is an rpc
            if (!(viewSpecification && !(viewSpecification.id === '0' || viewElement.uiType === 'rpc'))) {
              _context4.next = 46;
              break;
            }
            _context4.next = 25;
            return _services_configurationrestServices__WEBPACK_IMPORTED_MODULE_6__["configurationRestService"].getConfigData(dataPath);
          case 25:
            restResult = _context4.sent;
            if (restResult.data) {
              _context4.next = 35;
              break;
            }
            if (!(extractList && restResult.status === 404)) {
              _context4.next = 32;
              break;
            }
            if (Object(_models_uiModels__WEBPACK_IMPORTED_MODULE_8__["isViewElementList"])(viewElement)) {
              _context4.next = 30;
              break;
            }
            throw new Error("vPath: [".concat(vPath, "]. ViewElement has no key."));
          case 30:
            // create display specification
            _ds = {
              displayMode: extractList ? _handlers_viewDescriptionHandler__WEBPACK_IMPORTED_MODULE_5__["DisplayModeType"].displayAsList : _handlers_viewDescriptionHandler__WEBPACK_IMPORTED_MODULE_5__["DisplayModeType"].displayAsObject,
              viewSpecification: Object(_utilities_viewEngineHelper__WEBPACK_IMPORTED_MODULE_9__["resolveViewDescription"])(defaultNS, vPath, viewSpecification),
              keyProperty: viewElement.key
            }; // update display specification
            return _context4.abrupt("return", dispatch(postProcessDisplaySpecificationActionCreator(vPath, [], _ds)));
          case 32:
            throw new Error("Did not get response from Server. Status: [".concat(restResult.status, "]"));
          case 35:
            if (!Object(_utilities_viewEngineHelper__WEBPACK_IMPORTED_MODULE_9__["checkResponseCode"])(restResult)) {
              _context4.next = 40;
              break;
            }
            message = restResult.data.errors && restResult.data.errors.error && restResult.data.errors.error[0] && restResult.data.errors.error[0]['error-message'] || '';
            throw new Error("Server Error. Status: [".concat(restResult.status, "]\n").concat(message));
          case 40:
            // https://tools.ietf.org/html/rfc7951#section-4 the root element may contain a namespace or not !  
            data = restResult.data["".concat(defaultNS, ":").concat(dataMember)];
            if (data === undefined) {
              data = restResult.data[dataMember]; // extract dataMember w/o namespace
            }
          case 42:
            // extract the first element list[key]
            data = data instanceof Array ? data[0] : data;
            // extract the list -> key: list
            data = extractList ? data[viewElement.id] || data[viewElement.label] || [] // if the list is empty, it does not exist
            : data;
            _context4.next = 47;
            break;
          case 46:
            if (viewElement && viewElement.uiType === 'rpc') {
              // set data to defaults
              data = {};
              if (inputViewSpecification) {
                Object.keys(inputViewSpecification.elements).forEach(function (key) {
                  _newArrowCheck(this, _this12);
                  var elm = inputViewSpecification && inputViewSpecification.elements[key];
                  if (elm && elm.default != undefined) {
                    data[elm.id] = elm.default;
                  }
                }.bind(this));
              }
            }
          case 47:
            // create display specification
            ds = viewElement && viewElement.uiType === 'rpc' ? {
              dataPath: dataPath,
              displayMode: _handlers_viewDescriptionHandler__WEBPACK_IMPORTED_MODULE_5__["DisplayModeType"].displayAsRPC,
              inputViewSpecification: inputViewSpecification && Object(_utilities_viewEngineHelper__WEBPACK_IMPORTED_MODULE_9__["resolveViewDescription"])(defaultNS, vPath, inputViewSpecification),
              outputViewSpecification: outputViewSpecification && Object(_utilities_viewEngineHelper__WEBPACK_IMPORTED_MODULE_9__["resolveViewDescription"])(defaultNS, vPath, outputViewSpecification)
            } : {
              dataPath: dataPath,
              displayMode: extractList ? _handlers_viewDescriptionHandler__WEBPACK_IMPORTED_MODULE_5__["DisplayModeType"].displayAsList : _handlers_viewDescriptionHandler__WEBPACK_IMPORTED_MODULE_5__["DisplayModeType"].displayAsObject,
              viewSpecification: Object(_utilities_viewEngineHelper__WEBPACK_IMPORTED_MODULE_9__["resolveViewDescription"])(defaultNS, vPath, viewSpecification),
              keyProperty: Object(_models_uiModels__WEBPACK_IMPORTED_MODULE_8__["isViewElementList"])(viewElement) && viewElement.key || undefined,
              // eslint-disable-next-line max-len
              apidocPath: Object(_models_uiModels__WEBPACK_IMPORTED_MODULE_8__["isViewElementList"])(viewElement) && "/apidoc/explorer/index.html?urls.primaryName=$$$standard$$$#/mounted%20".concat(nodeId, "%20").concat(viewElement.module || 'MODULE_NOT_DEFINED', "/$$$action$$$_").concat(dataPath.replace(/^\//, '').replace(/[\/=\-\:]/g, '_'), "_").concat(viewElement != null ? "".concat(viewElement.id.replace(/[\/=\-\:]/g, '_'), "_") : '') || undefined
            }; // update display specification
            return _context4.abrupt("return", dispatch(postProcessDisplaySpecificationActionCreator(vPath, data, ds)));
          case 51:
            _context4.prev = 51;
            _context4.t1 = _context4["catch"](10);
            history.back();
            dispatch(new _framework_src_actions_errorActions__WEBPACK_IMPORTED_MODULE_4__["AddErrorInfoAction"]({
              title: 'Problem',
              message: _context4.t1.message || "Could not process ".concat(dataPath)
            }));
            dispatch(new SetCollectingSelectionData(false));
          case 56:
            _context4.prev = 56;
            return _context4.abrupt("return");
          case 59:
          case "end":
            return _context4.stop();
        }
      }, _callee3, this, [[10, 51, 56, 59]]);
    }));
  }.bind(this);
}.bind(undefined);
var updateDataActionAsyncCreator = function updateDataActionAsyncCreator(vPath, data) {
  var _this16 = this;
  _newArrowCheck(this, _this7);
  return function (dispatch, getState) {
    _newArrowCheck(this, _this16);
    return __awaiter(void 0, void 0, void 0, /*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
      var _this17 = this;
      var _a, pathParts, _getState3, _getState3$configurat, nodeId, views, dataPath, viewSpecification, viewElement, dataMember, embedList, isNew, currentNS, defaultNS, ind, _pathParts$ind2, property, key, namespaceInd, namespace, keyList, dataPathParam, _removeReadOnlyElements, updateResult, message, ds;
      return _regeneratorRuntime().wrap(function _callee4$(_context5) {
        while (1) switch (_context5.prev = _context5.next) {
          case 0:
            pathParts = Object(_utilities_viewEngineHelper__WEBPACK_IMPORTED_MODULE_9__["splitVPath"])(vPath, /(?:([^\/\["]+)(?:\[([^\]]*)\])?)/g); // 1 = property / 2 = optional key
            _getState3 = getState(), _getState3$configurat = _getState3.configuration.deviceDescription, nodeId = _getState3$configurat.nodeId, views = _getState3$configurat.views;
            dataPath = "/rests/data/network-topology:network-topology/topology=topology-netconf/node=".concat(nodeId, "/yang-ext:mount");
            viewSpecification = views[0];
            embedList = false;
            isNew = false;
            currentNS = null;
            defaultNS = null;
            dispatch(new SetCollectingSelectionData(true));
            _context5.prev = 9;
            ind = 0;
          case 11:
            if (!(ind < pathParts.length)) {
              _context5.next = 43;
              break;
            }
            _pathParts$ind2 = _slicedToArray(pathParts[ind], 2), property = _pathParts$ind2[0], key = _pathParts$ind2[1];
            namespaceInd = property && property.indexOf(':') || -1;
            namespace = namespaceInd > -1 ? currentNS = property.slice(0, namespaceInd) : currentNS;
            if (ind === 0) {
              defaultNS = namespace;
            }
            viewElement = viewSpecification.elements[property] || viewSpecification.elements["".concat(namespace, ":").concat(property)];
            if (viewElement) {
              _context5.next = 19;
              break;
            }
            throw Error('Property [' + property + '] does not exist.');
          case 19:
            if (!(Object(_models_uiModels__WEBPACK_IMPORTED_MODULE_8__["isViewElementList"])(viewElement) && !key)) {
              _context5.next = 36;
              break;
            }
            embedList = true;
            if (!(viewElement && viewElement.isList && viewSpecification.parentView === '0')) {
              _context5.next = 23;
              break;
            }
            throw new Error('Found a list at root level of a module w/o a refenrece key.');
          case 23:
            if (!(pathParts.length - 1 > ind)) {
              _context5.next = 28;
              break;
            }
            dispatch(new SetCollectingSelectionData(false));
            throw new Error('No key for list [' + property + ']');
          case 28:
            if (!(vPath.endsWith('[]') && pathParts.length - 1 === ind)) {
              _context5.next = 36;
              break;
            }
            // handle new element with any number of arguments
            keyList = (_a = viewElement.key) === null || _a === void 0 ? void 0 : _a.split(' ');
            dataPathParam = keyList === null || keyList === void 0 ? void 0 : keyList.map(function (id) {
              _newArrowCheck(this, _this17);
              return data[id];
            }.bind(this)).join(',');
            key = viewElement.key && String(dataPathParam) || '';
            isNew = key;
            if (key) {
              _context5.next = 36;
              break;
            }
            dispatch(new SetCollectingSelectionData(false));
            throw new Error('No value for key [' + viewElement.key + '] in list [' + property + ']');
          case 36:
            dataPath += "/".concat(property).concat(key ? "=".concat(key.replace(/\//ig, '%2F')) : '');
            dataMember = viewElement.label;
            embedList = false;
            if (viewElement && 'viewId' in viewElement) {
              viewSpecification = views[+viewElement.viewId];
            }
          case 40:
            ++ind;
            _context5.next = 11;
            break;
          case 43:
            // remove read-only elements
            _removeReadOnlyElements = function removeReadOnlyElements(pViewSpecification, isList, pData) {
              var _this18 = this;
              _newArrowCheck(this, _this17);
              if (isList) {
                return pData.map(function (elm) {
                  _newArrowCheck(this, _this18);
                  return _removeReadOnlyElements(pViewSpecification, false, elm);
                }.bind(this));
              } else {
                return Object.keys(pData).reduce(function (acc, cur) {
                  _newArrowCheck(this, _this18);
                  var _cur$split = cur.split(':', 1),
                    _cur$split2 = _slicedToArray(_cur$split, 2),
                    nsOrName = _cur$split2[0],
                    name = _cur$split2[1];
                  var element = pViewSpecification.elements[cur] || pViewSpecification.elements[nsOrName] || pViewSpecification.elements[name];
                  if (!element && 'development' === 'development') {
                    throw new Error('removeReadOnlyElements: Could not determine elment for data.');
                  }
                  if (element && element.config) {
                    if (element.uiType === 'object') {
                      var view = views[+element.viewId];
                      if (!view) {
                        throw new Error('removeReadOnlyElements: Internal Error could not determine viewId: ' + element.viewId);
                      }
                      acc[cur] = _removeReadOnlyElements(view, element.isList != null && element.isList, pData[cur]);
                    } else {
                      acc[cur] = pData[cur];
                    }
                  }
                  return acc;
                }.bind(this), {});
              }
            }.bind(this);
            data = _removeReadOnlyElements(viewSpecification, embedList, data);
            // embed the list -> key: list
            data = embedList ? _defineProperty({}, viewElement.label, data) : data;
            // embed the first element list[key]
            data = isNew ? [data] : data;
            // do not extract root member (0)
            if (!(viewSpecification && viewSpecification.id !== '0')) {
              _context5.next = 54;
              break;
            }
            _context5.next = 50;
            return _services_configurationrestServices__WEBPACK_IMPORTED_MODULE_6__["configurationRestService"].setConfigData(dataPath, _defineProperty({}, "".concat(currentNS, ":").concat(dataMember), data));
          case 50:
            updateResult = _context5.sent;
            if (!Object(_utilities_viewEngineHelper__WEBPACK_IMPORTED_MODULE_9__["checkResponseCode"])(updateResult)) {
              _context5.next = 54;
              break;
            }
            message = updateResult.data && updateResult.data.errors && updateResult.data.errors.error && updateResult.data.errors.error[0] && updateResult.data.errors.error[0]['error-message'] || '';
            throw new Error("Server Error. Status: [".concat(updateResult.status, "]\n").concat(message || updateResult.message || ''));
          case 54:
            if (!isNew) {
              _context5.next = 56;
              break;
            }
            return _context5.abrupt("return", dispatch(new _framework_src_actions_navigationActions__WEBPACK_IMPORTED_MODULE_3__["ReplaceAction"]("/configuration/".concat(nodeId, "/").concat(vPath.replace(/\[\]$/i, "[".concat(isNew, "]"))))));
          case 56:
            // create display specification
            ds = {
              displayMode: embedList ? _handlers_viewDescriptionHandler__WEBPACK_IMPORTED_MODULE_5__["DisplayModeType"].displayAsList : _handlers_viewDescriptionHandler__WEBPACK_IMPORTED_MODULE_5__["DisplayModeType"].displayAsObject,
              viewSpecification: Object(_utilities_viewEngineHelper__WEBPACK_IMPORTED_MODULE_9__["resolveViewDescription"])(defaultNS, vPath, viewSpecification),
              keyProperty: Object(_models_uiModels__WEBPACK_IMPORTED_MODULE_8__["isViewElementList"])(viewElement) && viewElement.key || undefined
            }; // update display specification
            return _context5.abrupt("return", dispatch(new UpdateViewDescription(vPath, data, ds)));
          case 60:
            _context5.prev = 60;
            _context5.t0 = _context5["catch"](9);
            history.back();
            dispatch(new _framework_src_actions_errorActions__WEBPACK_IMPORTED_MODULE_4__["AddErrorInfoAction"]({
              title: 'Problem',
              message: _context5.t0.message || "Could not change ".concat(dataPath)
            }));
          case 64:
            _context5.prev = 64;
            dispatch(new SetCollectingSelectionData(false));
            return _context5.abrupt("return");
          case 68:
          case "end":
            return _context5.stop();
        }
      }, _callee4, this, [[9, 60, 64, 68]]);
    }));
  }.bind(this);
}.bind(undefined);
var removeElementActionAsyncCreator = function removeElementActionAsyncCreator(vPath) {
  var _this19 = this;
  _newArrowCheck(this, _this7);
  return function (dispatch, getState) {
    _newArrowCheck(this, _this19);
    return __awaiter(void 0, void 0, void 0, /*#__PURE__*/_regeneratorRuntime().mark(function _callee5() {
      var pathParts, _getState4, _getState4$configurat, nodeId, views, dataPath, viewSpecification, viewElement, currentNS, ind, _pathParts$ind3, property, key, namespaceInd, namespace, updateResult, message;
      return _regeneratorRuntime().wrap(function _callee5$(_context6) {
        while (1) switch (_context6.prev = _context6.next) {
          case 0:
            pathParts = Object(_utilities_viewEngineHelper__WEBPACK_IMPORTED_MODULE_9__["splitVPath"])(vPath, /(?:([^\/\["]+)(?:\[([^\]]*)\])?)/g); // 1 = property / 2 = optional key
            _getState4 = getState(), _getState4$configurat = _getState4.configuration.deviceDescription, nodeId = _getState4$configurat.nodeId, views = _getState4$configurat.views;
            dataPath = "/rests/data/network-topology:network-topology/topology=topology-netconf/node=".concat(nodeId, "/yang-ext:mount");
            viewSpecification = views[0];
            currentNS = null;
            dispatch(new SetCollectingSelectionData(true));
            _context6.prev = 6;
            ind = 0;
          case 8:
            if (!(ind < pathParts.length)) {
              _context6.next = 29;
              break;
            }
            _pathParts$ind3 = _slicedToArray(pathParts[ind], 2), property = _pathParts$ind3[0], key = _pathParts$ind3[1];
            namespaceInd = property && property.indexOf(':') || -1;
            namespace = namespaceInd > -1 ? currentNS = property.slice(0, namespaceInd) : currentNS;
            viewElement = viewSpecification.elements[property] || viewSpecification.elements["".concat(namespace, ":").concat(property)];
            if (viewElement) {
              _context6.next = 15;
              break;
            }
            throw Error('Property [' + property + '] does not exist.');
          case 15:
            if (!(Object(_models_uiModels__WEBPACK_IMPORTED_MODULE_8__["isViewElementList"])(viewElement) && !key)) {
              _context6.next = 24;
              break;
            }
            if (!(viewElement && viewElement.isList && viewSpecification.parentView === '0')) {
              _context6.next = 18;
              break;
            }
            throw new Error('Found a list at root level of a module w/o a reference key.');
          case 18:
            if (!(pathParts.length - 1 > ind)) {
              _context6.next = 23;
              break;
            }
            dispatch(new SetCollectingSelectionData(false));
            throw new Error('No key for list [' + property + ']');
          case 23:
            if (vPath.endsWith('[]') && pathParts.length - 1 === ind) {
              // remove the whole table
            }
          case 24:
            dataPath += "/".concat(property).concat(key ? "=".concat(key.replace(/\//ig, '%2F')) : '');
            if (viewElement && 'viewId' in viewElement) {
              viewSpecification = views[+viewElement.viewId];
            } else if (viewElement.uiType === 'rpc') {
              viewSpecification = views[+(viewElement.inputViewId || 0)];
            }
          case 26:
            ++ind;
            _context6.next = 8;
            break;
          case 29:
            _context6.next = 31;
            return _services_configurationrestServices__WEBPACK_IMPORTED_MODULE_6__["configurationRestService"].removeConfigElement(dataPath);
          case 31:
            updateResult = _context6.sent;
            if (!Object(_utilities_viewEngineHelper__WEBPACK_IMPORTED_MODULE_9__["checkResponseCode"])(updateResult)) {
              _context6.next = 35;
              break;
            }
            message = updateResult.data && updateResult.data.errors && updateResult.data.errors.error && updateResult.data.errors.error[0] && updateResult.data.errors.error[0]['error-message'] || '';
            throw new Error("Server Error. Status: [".concat(updateResult.status, "]\n").concat(message || updateResult.message || ''));
          case 35:
            _context6.next = 40;
            break;
          case 37:
            _context6.prev = 37;
            _context6.t0 = _context6["catch"](6);
            dispatch(new _framework_src_actions_errorActions__WEBPACK_IMPORTED_MODULE_4__["AddErrorInfoAction"]({
              title: 'Problem',
              message: _context6.t0.message || "Could not remove ".concat(dataPath)
            }));
          case 40:
            _context6.prev = 40;
            dispatch(new SetCollectingSelectionData(false));
            return _context6.finish(40);
          case 43:
          case "end":
            return _context6.stop();
        }
      }, _callee5, null, [[6, 37, 40, 43]]);
    }));
  }.bind(this);
}.bind(undefined);
var executeRpcActionAsyncCreator = function executeRpcActionAsyncCreator(vPath, data) {
  var _this20 = this;
  _newArrowCheck(this, _this7);
  return function (dispatch, getState) {
    _newArrowCheck(this, _this20);
    return __awaiter(void 0, void 0, void 0, /*#__PURE__*/_regeneratorRuntime().mark(function _callee6() {
      var _this21 = this;
      var pathParts, _getState5, _getState5$configurat, nodeId, views, dataPath, viewSpecification, viewElement, dataMember, embedList, isNew, currentNS, defaultNS, ind, _pathParts$ind4, property, key, namespaceInd, namespace, updateResult, message;
      return _regeneratorRuntime().wrap(function _callee6$(_context7) {
        while (1) switch (_context7.prev = _context7.next) {
          case 0:
            pathParts = Object(_utilities_viewEngineHelper__WEBPACK_IMPORTED_MODULE_9__["splitVPath"])(vPath, /(?:([^\/\["]+)(?:\[([^\]]*)\])?)/g); // 1 = property / 2 = optional key
            _getState5 = getState(), _getState5$configurat = _getState5.configuration.deviceDescription, nodeId = _getState5$configurat.nodeId, views = _getState5$configurat.views;
            dataPath = "/rests/operations/network-topology:network-topology/topology=topology-netconf/node=".concat(nodeId, "/yang-ext:mount");
            viewSpecification = views[0];
            embedList = false;
            isNew = false;
            currentNS = null;
            defaultNS = null;
            dispatch(new SetCollectingSelectionData(true));
            _context7.prev = 9;
            ind = 0;
          case 11:
            if (!(ind < pathParts.length)) {
              _context7.next = 27;
              break;
            }
            _pathParts$ind4 = _slicedToArray(pathParts[ind], 2), property = _pathParts$ind4[0], key = _pathParts$ind4[1];
            namespaceInd = property && property.indexOf(':') || -1;
            namespace = namespaceInd > -1 ? currentNS = property.slice(0, namespaceInd) : currentNS;
            if (ind === 0) {
              defaultNS = namespace;
            }
            viewElement = viewSpecification.elements[property] || viewSpecification.elements["".concat(namespace, ":").concat(property)];
            if (viewElement) {
              _context7.next = 19;
              break;
            }
            throw Error('Property [' + property + '] does not exist.');
          case 19:
            if (Object(_models_uiModels__WEBPACK_IMPORTED_MODULE_8__["isViewElementList"])(viewElement) && !key) {
              embedList = true;
              //   if (viewElement && viewElement.isList && viewSpecification.parentView === "0") {
              //     throw new Error("Found a list at root level of a module w/o a reference key.");
              //   }
              //   if (pathParts.length - 1 > ind) {
              //     dispatch(new SetCollectingSelectionData(false));
              //     throw new Error("No key for list [" + property + "]");
              //   } else if (vPath.endsWith("[]") && pathParts.length - 1 === ind) {
              //     // handle new element
              //     key = viewElement.key && String(data[viewElement.key]) || "";
              //     isNew = key;
              //     if (!key) {
              //       dispatch(new SetCollectingSelectionData(false));
              //       throw new Error("No value for key [" + viewElement.key + "] in list [" + property + "]");
              //     }
              //   }
            }
            dataPath += "/".concat(property).concat(key ? "=".concat(key.replace(/\//ig, '%2F')) : '');
            dataMember = viewElement.label;
            embedList = false;
            if (viewElement && 'viewId' in viewElement) {
              viewSpecification = views[+viewElement.viewId];
            } else if (viewElement.uiType === 'rpc') {
              viewSpecification = views[+(viewElement.inputViewId || 0)];
            }
          case 24:
            ++ind;
            _context7.next = 11;
            break;
          case 27:
            // re-inflate formerly flatten rpc data
            data = data && Object.keys(data).reduce(function (acc, cur) {
              var _this22 = this;
              _newArrowCheck(this, _this21);
              var innerPathParts = cur.split('.');
              var pos = 0;
              var _updatePath = function updatePath(obj, key) {
                _newArrowCheck(this, _this22);
                obj[key] = pos >= innerPathParts.length ? data[cur] : _updatePath(obj[key] || {}, innerPathParts[pos++]);
                return obj;
              }.bind(this);
              _updatePath(acc, innerPathParts[pos++]);
              return acc;
            }.bind(this), {}) || null;
            // embed the list -> key: list
            data = embedList ? _defineProperty({}, viewElement.label, data) : data;
            // embed the first element list[key]
            data = isNew ? [data] : data;
            // do not post root member (0)
            if (!(viewSpecification && viewSpecification.id !== '0' || dataMember && !data)) {
              _context7.next = 40;
              break;
            }
            _context7.next = 33;
            return _services_configurationrestServices__WEBPACK_IMPORTED_MODULE_6__["configurationRestService"].executeRpc(dataPath, _defineProperty({}, "".concat(defaultNS, ":input"), data || {}));
          case 33:
            updateResult = _context7.sent;
            if (!Object(_utilities_viewEngineHelper__WEBPACK_IMPORTED_MODULE_9__["checkResponseCode"])(updateResult)) {
              _context7.next = 37;
              break;
            }
            message = updateResult.data && updateResult.data.errors && updateResult.data.errors.error && updateResult.data.errors.error[0] && updateResult.data.errors.error[0]['error-message'] || '';
            throw new Error("Server Error. Status: [".concat(updateResult.status, "]\n").concat(message || updateResult.message || ''));
          case 37:
            dispatch(new UpdateOutputData(updateResult.data));
            _context7.next = 41;
            break;
          case 40:
            throw new Error('There is NO RPC specified.');
          case 41:
            _context7.next = 46;
            break;
          case 43:
            _context7.prev = 43;
            _context7.t0 = _context7["catch"](9);
            dispatch(new _framework_src_actions_errorActions__WEBPACK_IMPORTED_MODULE_4__["AddErrorInfoAction"]({
              title: 'Problem',
              message: _context7.t0.message || "Could not change ".concat(dataPath)
            }));
          case 46:
            _context7.prev = 46;
            dispatch(new SetCollectingSelectionData(false));
            return _context7.finish(46);
          case 49:
          case "end":
            return _context7.stop();
        }
      }, _callee6, this, [[9, 43, 46, 49]]);
    }));
  }.bind(this);
}.bind(undefined);

/***/ }),

/***/ "./assets/icons/configurationAppIcon.svg":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "./images/configurationAppIcon.svg";

/***/ }),

/***/ "./components/ifWhenTextInput.tsx":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IfWhenTextInput", function() { return IfWhenTextInput; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _mui_material_InputAdornment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../../node_modules/@mui/material/InputAdornment/index.js");
/* harmony import */ var _mui_material_Input__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../../../node_modules/@mui/material/Input/index.js");
/* harmony import */ var _mui_material_Tooltip__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("../../../node_modules/@mui/material/Tooltip/index.js");
/* harmony import */ var _mui_material_FormControl__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("../../../node_modules/@mui/material/FormControl/index.js");
/* harmony import */ var _mui_material_InputLabel__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("../../../node_modules/@mui/material/InputLabel/index.js");
/* harmony import */ var _mui_material_FormHelperText__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("../../../node_modules/@mui/material/FormHelperText/index.js");
/* harmony import */ var _mui_styles_makeStyles__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("../../../node_modules/@mui/styles/makeStyles/index.js");
/* harmony import */ var _mui_styles_createStyles__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("../../../node_modules/@mui/styles/createStyles/index.js");
/* harmony import */ var _fortawesome_free_solid_svg_icons_faAdjust__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("../../../node_modules/@fortawesome/free-solid-svg-icons/faAdjust.js");
/* harmony import */ var _fortawesome_free_solid_svg_icons_faAdjust__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_fortawesome_free_solid_svg_icons_faAdjust__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("../../../node_modules/@fortawesome/react-fontawesome/index.es.js");
var _this = undefined;
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
var __rest = undefined && undefined.__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};











var useStyles = Object(_mui_styles_makeStyles__WEBPACK_IMPORTED_MODULE_7__["default"])(function () {
  _newArrowCheck(this, _this);
  return Object(_mui_styles_createStyles__WEBPACK_IMPORTED_MODULE_8__["default"])({
    iconDark: {
      color: '#ff8800'
    },
    iconLight: {
      color: 'orange'
    },
    padding: {
      paddingLeft: 10,
      paddingRight: 10
    }
  });
}.bind(undefined));
var IfWhenTextInput = function IfWhenTextInput(props) {
  var _this2 = this;
  _newArrowCheck(this, _this);
  var element = props.element,
    id = props.id,
    label = props.label,
    errorText = props.helperText,
    error = props.error,
    style = props.style,
    otherProps = __rest(props, ["element", "id", "label", "helperText", "error", "style"]);
  var classes = useStyles();
  var ifFeature = element.ifFeature ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_mui_material_Tooltip__WEBPACK_IMPORTED_MODULE_3__["default"], {
    title: element.ifFeature,
    disableInteractive: true,
    onMouseMove: function () {
      _newArrowCheck(this, _this2);
      return props.onChangeTooltipVisibility(false);
    }.bind(this),
    onMouseOut: function () {
      _newArrowCheck(this, _this2);
      return props.onChangeTooltipVisibility(true);
    }.bind(this)
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_mui_material_InputAdornment__WEBPACK_IMPORTED_MODULE_1__["default"], {
    position: "start"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_10__["FontAwesomeIcon"], {
    icon: _fortawesome_free_solid_svg_icons_faAdjust__WEBPACK_IMPORTED_MODULE_9__["faAdjust"],
    className: classes.iconDark
  }))) : null;
  var whenFeature = element.when ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_mui_material_Tooltip__WEBPACK_IMPORTED_MODULE_3__["default"], {
    title: element.when,
    disableInteractive: true,
    className: classes.padding,
    onMouseMove: function () {
      _newArrowCheck(this, _this2);
      return props.onChangeTooltipVisibility(false);
    }.bind(this),
    onMouseOut: function () {
      _newArrowCheck(this, _this2);
      return props.onChangeTooltipVisibility(true);
    }.bind(this)
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_mui_material_InputAdornment__WEBPACK_IMPORTED_MODULE_1__["default"], {
    className: classes.padding,
    position: "end"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_10__["FontAwesomeIcon"], {
    icon: _fortawesome_free_solid_svg_icons_faAdjust__WEBPACK_IMPORTED_MODULE_9__["faAdjust"],
    className: classes.iconLight
  }))) : null;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_mui_material_FormControl__WEBPACK_IMPORTED_MODULE_4__["default"], {
    variant: "standard",
    error: error,
    style: style
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_mui_material_InputLabel__WEBPACK_IMPORTED_MODULE_5__["default"], {
    htmlFor: id
  }, label), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_mui_material_Input__WEBPACK_IMPORTED_MODULE_2__["default"], _extends({
    id: id,
    inputProps: {
      'aria-label': label + '-input'
    },
    endAdornment: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, ifFeature, whenFeature)
  }, otherProps)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_mui_material_FormHelperText__WEBPACK_IMPORTED_MODULE_6__["default"], null, errorText));
}.bind(undefined);

/***/ }),

/***/ "./components/uiElementBoolean.tsx":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UiElementBoolean", function() { return UiElementBoolean; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _mui_material_MenuItem__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../../node_modules/@mui/material/MenuItem/index.js");
/* harmony import */ var _mui_material_FormHelperText__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../../../node_modules/@mui/material/FormHelperText/index.js");
/* harmony import */ var _mui_material_Select__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("../../../node_modules/@mui/material/Select/index.js");
/* harmony import */ var _mui_material_FormControl__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("../../../node_modules/@mui/material/FormControl/index.js");
/* harmony import */ var _mui_material_InputLabel__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("../../../node_modules/@mui/material/InputLabel/index.js");
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






var UiElementBoolean = function UiElementBoolean(props) {
  var _this2 = this;
  _newArrowCheck(this, _this);
  var element = props.value;
  var value = String(props.inputValue).toLowerCase();
  var mandatoryError = element.mandatory && value !== 'true' && value !== 'false';
  return !props.readOnly || element.id != null ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_mui_material_FormControl__WEBPACK_IMPORTED_MODULE_4__["default"], {
    variant: "standard",
    style: {
      width: 485,
      marginLeft: 20,
      marginRight: 20
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_mui_material_InputLabel__WEBPACK_IMPORTED_MODULE_5__["default"], {
    htmlFor: "select-".concat(element.id)
  }, element.label), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_mui_material_Select__WEBPACK_IMPORTED_MODULE_3__["default"], {
    variant: "standard",
    "aria-label": element.label + '-selection',
    required: !!element.mandatory,
    error: mandatoryError,
    onChange: function (e) {
      _newArrowCheck(this, _this2);
      props.onChange(e.target.value === 'true');
    }.bind(this),
    readOnly: props.readOnly,
    disabled: props.disabled,
    value: value,
    inputProps: {
      name: element.id,
      id: "select-".concat(element.id)
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_mui_material_MenuItem__WEBPACK_IMPORTED_MODULE_1__["default"], {
    value: 'true',
    "aria-label": "true"
  }, element.trueValue || 'True'), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_mui_material_MenuItem__WEBPACK_IMPORTED_MODULE_1__["default"], {
    value: 'false',
    "aria-label": "false"
  }, element.falseValue || 'False')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_mui_material_FormHelperText__WEBPACK_IMPORTED_MODULE_2__["default"], null, mandatoryError ? 'Value is mandatory' : '')) : null;
}.bind(undefined);

/***/ }),

/***/ "./components/uiElementLeafList.tsx":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UiElementLeafList", function() { return UiElementLeafList; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _mui_material_FormControl__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../../node_modules/@mui/material/FormControl/index.js");
/* harmony import */ var _mui_material_InputLabel__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../../../node_modules/@mui/material/InputLabel/index.js");
/* harmony import */ var _mui_material_Chip__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("../../../node_modules/@mui/material/Chip/index.js");
/* harmony import */ var _mui_material_Dialog__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("../../../node_modules/@mui/material/Dialog/index.js");
/* harmony import */ var _mui_material_DialogTitle__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("../../../node_modules/@mui/material/DialogTitle/index.js");
/* harmony import */ var _mui_material_DialogContent__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("../../../node_modules/@mui/material/DialogContent/index.js");
/* harmony import */ var _mui_material_DialogActions__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("../../../node_modules/@mui/material/DialogActions/index.js");
/* harmony import */ var _mui_material_Button__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("../../../node_modules/@mui/material/Button/index.js");
/* harmony import */ var _mui_styles_makeStyles__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("../../../node_modules/@mui/styles/makeStyles/index.js");
/* harmony import */ var _mui_icons_material_Add__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("../../../node_modules/@mui/icons-material/Add.js");
/* harmony import */ var _mui_icons_material_Add__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_mui_icons_material_Add__WEBPACK_IMPORTED_MODULE_10__);
var _this = undefined;
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
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











var useStyles = Object(_mui_styles_makeStyles__WEBPACK_IMPORTED_MODULE_9__["default"])(function (theme) {
  _newArrowCheck(this, _this);
  var light = theme.palette.mode === 'light';
  var bottomLineColor = light ? 'rgba(0, 0, 0, 0.42)' : 'rgba(255, 255, 255, 0.7)';
  return {
    root: {
      display: 'flex',
      justifyContent: 'left',
      verticalAlign: 'bottom',
      flexWrap: 'wrap',
      listStyle: 'none',
      margin: 0,
      padding: 0,
      paddingTop: theme.spacing(0.5),
      marginTop: theme.spacing(1)
    },
    chip: {
      margin: theme.spacing(0.5)
    },
    underline: {
      '&:after': {
        borderBottom: "2px solid ".concat(theme.palette.primary.main),
        left: 0,
        bottom: 0,
        // Doing the other way around crash on IE 11 "''" https://github.com/cssinjs/jss/issues/242
        content: '""',
        position: 'absolute',
        right: 0,
        transform: 'scaleX(0)',
        transition: theme.transitions.create('transform', {
          duration: theme.transitions.duration.shorter,
          easing: theme.transitions.easing.easeOut
        }),
        pointerEvents: 'none' // Transparent to the hover style.
      },
      '&.Mui-focused:after': {
        transform: 'scaleX(1)'
      },
      '&.Mui-error:after': {
        borderBottomColor: theme.palette.error.main,
        transform: 'scaleX(1)' // error is always underlined in red
      },
      '&:before': {
        borderBottom: "1px solid ".concat(bottomLineColor),
        left: 0,
        bottom: 0,
        // Doing the other way around crash on IE 11 "''" https://github.com/cssinjs/jss/issues/242
        content: '"\\00a0"',
        position: 'absolute',
        right: 0,
        transition: theme.transitions.create('border-bottom-color', {
          duration: theme.transitions.duration.shorter
        }),
        pointerEvents: 'none' // Transparent to the hover style.
      },
      '&:hover:not($disabled):before': {
        borderBottom: "2px solid ".concat(theme.palette.text.primary),
        // Reset on touch devices, it doesn't add specificity
        // eslint-disable-next-line @typescript-eslint/naming-convention
        '@media (hover: none)': {
          borderBottom: "1px solid ".concat(bottomLineColor)
        }
      },
      '&.Mui-disabled:before': {
        borderBottomStyle: 'dotted'
      }
    }
  };
}.bind(undefined));
var UiElementLeafList = function UiElementLeafList(props) {
  var _this2 = this;
  _newArrowCheck(this, _this);
  var element = props.value,
    inputValue = props.inputValue,
    onChange = props.onChange;
  var classes = useStyles();
  var _React$useState = react__WEBPACK_IMPORTED_MODULE_0___default.a.useState(false),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    open = _React$useState2[0],
    setOpen = _React$useState2[1];
  var _React$useState3 = react__WEBPACK_IMPORTED_MODULE_0___default.a.useState(''),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    editorValue = _React$useState4[0],
    setEditorValue = _React$useState4[1];
  var _React$useState5 = react__WEBPACK_IMPORTED_MODULE_0___default.a.useState(-1),
    _React$useState6 = _slicedToArray(_React$useState5, 2),
    editorValueIndex = _React$useState6[0],
    setEditorValueIndex = _React$useState6[1];
  var handleClose = function handleClose() {
    _newArrowCheck(this, _this2);
    setOpen(false);
  }.bind(this);
  var onApplyButton = function onApplyButton() {
    _newArrowCheck(this, _this2);
    if (editorValue != null && editorValue != '' && editorValueIndex < 0) {
      props.onChange([].concat(_toConsumableArray(inputValue), [editorValue]));
    } else if (editorValue != null && editorValue != '') {
      props.onChange([].concat(_toConsumableArray(inputValue.slice(0, editorValueIndex)), [editorValue], _toConsumableArray(inputValue.slice(editorValueIndex + 1))));
    }
    setOpen(false);
  }.bind(this);
  var onDelete = function onDelete(index) {
    _newArrowCheck(this, _this2);
    var newValue = [].concat(_toConsumableArray(inputValue.slice(0, index)), _toConsumableArray(inputValue.slice(index + 1)));
    onChange(newValue);
  }.bind(this);
  var ValueEditor = props.getEditorForViewElement(props.value);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_mui_material_FormControl__WEBPACK_IMPORTED_MODULE_1__["default"], {
    variant: "standard",
    style: {
      width: 485,
      marginLeft: 20,
      marginRight: 20
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_mui_material_InputLabel__WEBPACK_IMPORTED_MODULE_2__["default"], {
    htmlFor: "list-".concat(element.id),
    shrink: !props.readOnly || !!(inputValue && inputValue.length)
  }, element.label), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", {
    className: "".concat(classes.root, " ").concat(classes.underline),
    id: "list-".concat(element.id)
  }, !props.readOnly ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_mui_material_Chip__WEBPACK_IMPORTED_MODULE_3__["default"], {
    icon: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_mui_icons_material_Add__WEBPACK_IMPORTED_MODULE_10___default.a, null),
    label: 'Add',
    className: classes.chip,
    size: "small",
    color: "secondary",
    onClick: function () {
      _newArrowCheck(this, _this2);
      setOpen(true);
      setEditorValue('');
      setEditorValueIndex(-1);
    }.bind(this)
  })) : null, inputValue.map(function (val, ind) {
    var _this3 = this;
    _newArrowCheck(this, _this2);
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
      key: ind
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_mui_material_Chip__WEBPACK_IMPORTED_MODULE_3__["default"], {
      className: classes.chip,
      size: "small",
      variant: "outlined",
      label: String(val),
      onDelete: !props.readOnly ? function () {
        _newArrowCheck(this, _this3);
        onDelete(ind);
      }.bind(this) : undefined,
      onClick: !props.readOnly ? function () {
        _newArrowCheck(this, _this3);
        setOpen(true);
        setEditorValue(val);
        setEditorValueIndex(ind);
      }.bind(this) : undefined
    }));
  }.bind(this)))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_mui_material_Dialog__WEBPACK_IMPORTED_MODULE_4__["default"], {
    open: open,
    onClose: handleClose,
    "aria-labelledby": "form-dialog-title"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_mui_material_DialogTitle__WEBPACK_IMPORTED_MODULE_5__["default"], {
    id: "form-dialog-title"
  }, editorValueIndex < 0 ? 'Add new value' : 'Edit value', " "), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_mui_material_DialogContent__WEBPACK_IMPORTED_MODULE_6__["default"], null, ValueEditor && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(ValueEditor, {
    inputValue: editorValue,
    value: Object.assign(Object.assign({}, element), {
      isList: false
    }),
    disabled: false,
    readOnly: props.readOnly,
    onChange: setEditorValue
  }) || null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_mui_material_DialogActions__WEBPACK_IMPORTED_MODULE_7__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_mui_material_Button__WEBPACK_IMPORTED_MODULE_8__["default"], {
    color: "inherit",
    onClick: handleClose
  }, " Cancel "), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_mui_material_Button__WEBPACK_IMPORTED_MODULE_8__["default"], {
    disabled: editorValue == null || editorValue === '',
    onClick: onApplyButton,
    color: "secondary"
  }, " ", editorValueIndex < 0 ? 'Add' : 'Apply', " "))));
}.bind(undefined);

/***/ }),

/***/ "./components/uiElementNumber.tsx":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UiElementNumber", function() { return UiElementNumber; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../../node_modules/@mui/material/index.js");
/* harmony import */ var _ifWhenTextInput__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./components/ifWhenTextInput.tsx");
/* harmony import */ var _utilities_verifyer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./utilities/verifyer.ts");
var _this = undefined;
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
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




var UiElementNumber = function UiElementNumber(props) {
  var _this2 = this;
  _newArrowCheck(this, _this);
  var _React$useState = react__WEBPACK_IMPORTED_MODULE_0___default.a.useState(false),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    error = _React$useState2[0],
    setError = _React$useState2[1];
  var _React$useState3 = react__WEBPACK_IMPORTED_MODULE_0___default.a.useState(""),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    helperText = _React$useState4[0],
    setHelperText = _React$useState4[1];
  var _React$useState5 = react__WEBPACK_IMPORTED_MODULE_0___default.a.useState(true),
    _React$useState6 = _slicedToArray(_React$useState5, 2),
    isTooltipVisible = _React$useState6[0],
    setTooltipVisibility = _React$useState6[1];
  var element = props.value;
  var verifyValue = function verifyValue(data) {
    _newArrowCheck(this, _this2);
    var num = Number(data);
    if (!isNaN(num)) {
      var result = Object(_utilities_verifyer__WEBPACK_IMPORTED_MODULE_3__["checkRange"])(element, num);
      if (result.length > 0) {
        setError(true);
        setHelperText(result);
      } else {
        setError(false);
        setHelperText("");
      }
    } else {
      setError(true);
      setHelperText("Input is not a number.");
    }
    props.onChange(num);
  }.bind(this);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_1__["Tooltip"], {
    disableInteractive: true,
    title: isTooltipVisible ? element.description || '' : ''
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_ifWhenTextInput__WEBPACK_IMPORTED_MODULE_2__["IfWhenTextInput"], {
    element: element,
    onChangeTooltipVisibility: setTooltipVisibility,
    spellCheck: false,
    autoFocus: true,
    margin: "dense",
    id: element.id,
    label: element.label,
    type: "text",
    value: props.inputValue,
    style: {
      width: 485,
      marginLeft: 20,
      marginRight: 20
    },
    onChange: function (e) {
      _newArrowCheck(this, _this2);
      verifyValue(e.target.value);
    }.bind(this),
    error: error,
    readOnly: props.readOnly,
    disabled: props.disabled,
    helperText: helperText,
    startAdornment: element.units != null ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_1__["InputAdornment"], {
      position: "start"
    }, element.units) : undefined
  }));
}.bind(undefined);

/***/ }),

/***/ "./components/uiElementReference.tsx":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UIElementReference", function() { return UIElementReference; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../../node_modules/@mui/material/index.js");
/* harmony import */ var _mui_styles_createStyles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../../../node_modules/@mui/styles/createStyles/index.js");
/* harmony import */ var _mui_styles_makeStyles__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("../../../node_modules/@mui/styles/makeStyles/index.js");
var _this = undefined;
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
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




var useStyles = Object(_mui_styles_makeStyles__WEBPACK_IMPORTED_MODULE_3__["default"])(function () {
  _newArrowCheck(this, _this);
  return Object(_mui_styles_createStyles__WEBPACK_IMPORTED_MODULE_2__["default"])({
    button: {
      'justifyContent': 'left'
    }
  });
}.bind(undefined));
var UIElementReference = function UIElementReference(props) {
  var _this2 = this;
  _newArrowCheck(this, _this);
  var element = props.element;
  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(true),
    _useState2 = _slicedToArray(_useState, 2),
    disabled = _useState2[0],
    setDisabled = _useState2[1];
  var classes = useStyles();
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_1__["FormControl"], {
    variant: "standard",
    key: element.id,
    style: {
      width: 485,
      marginLeft: 20,
      marginRight: 20
    },
    onMouseDown: function (ev) {
      _newArrowCheck(this, _this2);
      ev.preventDefault();
      ev.stopPropagation();
      if (ev.button === 1) {
        setDisabled(!disabled);
      }
    }.bind(this)
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_1__["Tooltip"], {
    disableInteractive: true,
    title: element.description || element.path || ''
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_1__["Button"], {
    className: classes.button,
    "aria-label": element.label + '-button',
    color: "secondary",
    disabled: props.disabled && disabled,
    onClick: function () {
      _newArrowCheck(this, _this2);
      props.onOpenReference(element);
    }.bind(this)
  }, "".concat(element.label))));
}.bind(undefined);

/***/ }),

/***/ "./components/uiElementSelection.tsx":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UiElementSelection", function() { return UiElementSelection; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../../node_modules/@mui/material/index.js");
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


var UiElementSelection = function UiElementSelection(props) {
  var _this2 = this;
  _newArrowCheck(this, _this);
  var element = props.value;
  var error = '';
  var value = String(props.inputValue);
  if (element.mandatory && Boolean(!value)) {
    error = 'Error';
  }
  return props.readOnly || props.inputValue != null ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_1__["FormControl"], {
    variant: "standard",
    style: {
      width: 485,
      marginLeft: 20,
      marginRight: 20
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_1__["InputLabel"], {
    htmlFor: "select-".concat(element.id)
  }, element.label), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_1__["Select"], {
    variant: "standard",
    required: !!element.mandatory,
    error: !!error,
    onChange: function (e) {
      _newArrowCheck(this, _this2);
      props.onChange(e.target.value);
    }.bind(this),
    readOnly: props.readOnly,
    disabled: props.disabled,
    value: value.toString(),
    "aria-label": element.label + '-selection',
    inputProps: {
      name: element.id,
      id: "select-".concat(element.id)
    }
  }, element.options.map(function (option) {
    _newArrowCheck(this, _this2);
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_1__["MenuItem"], {
      key: option.key,
      value: option.key,
      "aria-label": option.key
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_1__["Tooltip"], {
      disableInteractive: true,
      title: option.description || ''
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      style: {
        width: '100%'
      }
    }, option.key)));
  }.bind(this))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_1__["FormHelperText"], null, error)) : null;
}.bind(undefined);

/***/ }),

/***/ "./components/uiElementString.tsx":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UiElementString", function() { return UiElementString; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../../node_modules/@mui/material/index.js");
/* harmony import */ var _ifWhenTextInput__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./components/ifWhenTextInput.tsx");
/* harmony import */ var _utilities_verifyer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./utilities/verifyer.ts");
var _this = undefined;
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
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




var UiElementString = function UiElementString(props) {
  var _this2 = this;
  _newArrowCheck(this, _this);
  var _React$useState = react__WEBPACK_IMPORTED_MODULE_0__["useState"](false),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    isError = _React$useState2[0],
    setError = _React$useState2[1];
  var _React$useState3 = react__WEBPACK_IMPORTED_MODULE_0__["useState"](""),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    helperText = _React$useState4[0],
    setHelperText = _React$useState4[1];
  var _React$useState5 = react__WEBPACK_IMPORTED_MODULE_0__["useState"](true),
    _React$useState6 = _slicedToArray(_React$useState5, 2),
    isTooltipVisible = _React$useState6[0],
    setTooltipVisibility = _React$useState6[1];
  var element = props.value;
  var verifyValues = function verifyValues(data) {
    _newArrowCheck(this, _this2);
    if (data.trim().length > 0) {
      var errorMessage = "";
      var result = Object(_utilities_verifyer__WEBPACK_IMPORTED_MODULE_3__["checkRange"])(element, data.length);
      if (result.length > 0) {
        errorMessage += result;
      }
      var patternResult = Object(_utilities_verifyer__WEBPACK_IMPORTED_MODULE_3__["checkPattern"])(element.pattern, data);
      if (patternResult.error) {
        errorMessage += patternResult.error;
      }
      if (errorMessage.length > 0) {
        setError(true);
        setHelperText(errorMessage);
      } else {
        setError(false);
        setHelperText("");
      }
    } else {
      setError(false);
      setHelperText("");
    }
    props.onChange(data);
  }.bind(this);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_mui_material__WEBPACK_IMPORTED_MODULE_1__["Tooltip"], {
    disableInteractive: true,
    title: isTooltipVisible ? element.description || '' : ''
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_ifWhenTextInput__WEBPACK_IMPORTED_MODULE_2__["IfWhenTextInput"], {
    element: element,
    onChangeTooltipVisibility: setTooltipVisibility,
    spellCheck: false,
    autoFocus: true,
    margin: "dense",
    id: element.id,
    label: (props === null || props === void 0 ? void 0 : props.isKey) ? "🔑 " + element.label : element.label,
    type: "text",
    value: props.inputValue,
    style: {
      width: 485,
      marginLeft: 20,
      marginRight: 20
    },
    onChange: function (e) {
      _newArrowCheck(this, _this2);
      verifyValues(e.target.value);
    }.bind(this),
    error: isError,
    readOnly: props.readOnly,
    disabled: props.disabled,
    helperText: helperText
  }));
}.bind(undefined);

/***/ }),

/***/ "./components/uiElementUnion.tsx":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UIElementUnion", function() { return UIElementUnion; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../../node_modules/@mui/material/index.js");
/* harmony import */ var _ifWhenTextInput__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./components/ifWhenTextInput.tsx");
/* harmony import */ var _models_uiModels__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./models/uiModels.ts");
/* harmony import */ var _utilities_verifyer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./utilities/verifyer.ts");
var _this = undefined;
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
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





var UIElementUnion = function UIElementUnion(props) {
  var _this2 = this;
  _newArrowCheck(this, _this);
  var _React$useState = react__WEBPACK_IMPORTED_MODULE_0__["useState"](false),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    isError = _React$useState2[0],
    setError = _React$useState2[1];
  var _React$useState3 = react__WEBPACK_IMPORTED_MODULE_0__["useState"](""),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    helperText = _React$useState4[0],
    setHelperText = _React$useState4[1];
  var _React$useState5 = react__WEBPACK_IMPORTED_MODULE_0__["useState"](true),
    _React$useState6 = _slicedToArray(_React$useState5, 2),
    isTooltipVisible = _React$useState6[0],
    setTooltipVisibility = _React$useState6[1];
  var element = props.value;
  var verifyValues = function verifyValues(data) {
    _newArrowCheck(this, _this2);
    var foundObjectElements = 0;
    var errorMessage = "";
    var isPatternCorrect = null;
    for (var i = 0; i < element.elements.length; i++) {
      var unionElement = element.elements[i];
      if (Object(_models_uiModels__WEBPACK_IMPORTED_MODULE_3__["isViewElementNumber"])(unionElement)) {
        errorMessage = Object(_utilities_verifyer__WEBPACK_IMPORTED_MODULE_4__["checkRange"])(unionElement, Number(data));
      } else if (Object(_models_uiModels__WEBPACK_IMPORTED_MODULE_3__["isViewElementString"])(unionElement)) {
        errorMessage += Object(_utilities_verifyer__WEBPACK_IMPORTED_MODULE_4__["checkRange"])(unionElement, data.length);
        isPatternCorrect = Object(_utilities_verifyer__WEBPACK_IMPORTED_MODULE_4__["checkPattern"])(unionElement.pattern, data).isValid;
      } else if (Object(_models_uiModels__WEBPACK_IMPORTED_MODULE_3__["isViewElementObject"])(unionElement)) {
        foundObjectElements++;
      }
      if (isPatternCorrect || errorMessage.length === 0) {
        break;
      }
    }
    if (errorMessage.length > 0 || isPatternCorrect !== null && !isPatternCorrect) {
      setError(true);
      setHelperText("Input is wrong.");
    } else {
      setError(false);
      setHelperText("");
    }
    if (foundObjectElements > 0 && foundObjectElements != element.elements.length) {
      throw new Error("The union element ".concat(element.id, " can't be changed."));
    } else {
      props.onChange(data);
    }
  }.bind(this);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_mui_material__WEBPACK_IMPORTED_MODULE_1__["Tooltip"], {
    disableInteractive: true,
    title: isTooltipVisible ? element.description || '' : ''
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_ifWhenTextInput__WEBPACK_IMPORTED_MODULE_2__["IfWhenTextInput"], {
    element: element,
    onChangeTooltipVisibility: setTooltipVisibility,
    spellCheck: false,
    autoFocus: true,
    margin: "dense",
    id: element.id,
    label: props.isKey ? "🔑 " + element.label : element.label,
    type: "text",
    value: props.inputValue,
    onChange: function (e) {
      _newArrowCheck(this, _this2);
      verifyValues(e.target.value);
    }.bind(this),
    error: isError,
    style: {
      width: 485,
      marginLeft: 20,
      marginRight: 20
    },
    readOnly: props.readOnly,
    disabled: props.disabled,
    helperText: helperText
  }));
}.bind(undefined);

/***/ }),

/***/ "./handlers/configurationAppRootHandler.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "configurationAppRootHandler", function() { return configurationAppRootHandler; });
/* harmony import */ var _framework_src_flux_middleware__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../../framework/src/flux/middleware.ts");
/* harmony import */ var _connectedNetworkElementsHandler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./handlers/connectedNetworkElementsHandler.ts");
/* harmony import */ var _deviceDescriptionHandler__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./handlers/deviceDescriptionHandler.ts");
/* harmony import */ var _viewDescriptionHandler__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./handlers/viewDescriptionHandler.ts");
/* harmony import */ var _valueSelectorHandler__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./handlers/valueSelectorHandler.ts");
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





var actionHandlers = {
  connectedNetworkElements: _connectedNetworkElementsHandler__WEBPACK_IMPORTED_MODULE_1__["connectedNetworkElementsActionHandler"],
  deviceDescription: _deviceDescriptionHandler__WEBPACK_IMPORTED_MODULE_2__["deviceDescriptionHandler"],
  viewDescription: _viewDescriptionHandler__WEBPACK_IMPORTED_MODULE_3__["viewDescriptionHandler"],
  valueSelector: _valueSelectorHandler__WEBPACK_IMPORTED_MODULE_4__["valueSelectorHandler"]
};
var configurationAppRootHandler = Object(_framework_src_flux_middleware__WEBPACK_IMPORTED_MODULE_0__["combineActionHandler"])(actionHandlers);
/* harmony default export */ __webpack_exports__["default"] = (configurationAppRootHandler);

/***/ }),

/***/ "./handlers/connectedNetworkElementsHandler.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "connectedNetworkElementsActionHandler", function() { return connectedNetworkElementsActionHandler; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createConnectedNetworkElementsActions", function() { return createConnectedNetworkElementsActions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createConnectedNetworkElementsProperties", function() { return createConnectedNetworkElementsProperties; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "connectedNetworkElementsReloadAction", function() { return connectedNetworkElementsReloadAction; });
/* harmony import */ var _framework_src_components_material_table_utilities__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../../framework/src/components/material-table/utilities.ts");
/* harmony import */ var _framework_src_utilities_elasticSearch__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../../framework/src/utilities/elasticSearch.ts");
/* harmony import */ var _framework_src_services_restService__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../../../framework/src/services/restService.ts");
/* harmony import */ var _services_configurationrestServices__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./services/configurationrestServices.ts");
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
var connectedNetworkElementsSearchHandler = Object(_framework_src_utilities_elasticSearch__WEBPACK_IMPORTED_MODULE_1__["createSearchDataHandler"])('network-element-connection', false, {
  status: 'Connected'
});
var _createExternal = Object(_framework_src_components_material_table_utilities__WEBPACK_IMPORTED_MODULE_0__["createExternal"])(connectedNetworkElementsSearchHandler, function (appState) {
    _newArrowCheck(this, _this);
    return appState.configuration.connectedNetworkElements;
  }.bind(undefined), function (ne) {
    _newArrowCheck(this, _this);
    if (!ne || !ne.id) return true;
    var neUrl = _services_configurationrestServices__WEBPACK_IMPORTED_MODULE_3__["configurationRestService"].getNetworkElementUri(ne.id);
    var policy = Object(_framework_src_services_restService__WEBPACK_IMPORTED_MODULE_2__["getAccessPolicyByUrl"])(neUrl);
    return !(policy.GET && policy.POST);
  }.bind(undefined)),
  connectedNetworkElementsActionHandler = _createExternal.actionHandler,
  createConnectedNetworkElementsActions = _createExternal.createActions,
  createConnectedNetworkElementsProperties = _createExternal.createProperties,
  connectedNetworkElementsReloadAction = _createExternal.reloadAction;


/***/ }),

/***/ "./handlers/deviceDescriptionHandler.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deviceDescriptionHandler", function() { return deviceDescriptionHandler; });
/* harmony import */ var _actions_deviceActions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./actions/deviceActions.ts");
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

var deviceDescriptionStateInit = {
  nodeId: '',
  modules: {},
  views: []
};
var deviceDescriptionHandler = function deviceDescriptionHandler() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : deviceDescriptionStateInit;
  var action = arguments.length > 1 ? arguments[1] : undefined;
  _newArrowCheck(this, _this);
  if (action instanceof _actions_deviceActions__WEBPACK_IMPORTED_MODULE_0__["UpdateDeviceDescription"]) {
    state = Object.assign(Object.assign({}, state), {
      nodeId: action.nodeId,
      modules: action.modules,
      views: action.views
    });
  }
  return state;
}.bind(undefined);

/***/ }),

/***/ "./handlers/valueSelectorHandler.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "valueSelectorHandler", function() { return valueSelectorHandler; });
/* harmony import */ var _actions_deviceActions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./actions/deviceActions.ts");
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

var dummyFunc = function dummyFunc() {
  _newArrowCheck(this, _this);
}.bind(undefined);
var valueSelectorStateInit = {
  collectingData: false,
  keyProperty: undefined,
  listSpecification: null,
  listData: [],
  onValueSelected: dummyFunc
};
var valueSelectorHandler = function valueSelectorHandler() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : valueSelectorStateInit;
  var action = arguments.length > 1 ? arguments[1] : undefined;
  _newArrowCheck(this, _this);
  if (action instanceof _actions_deviceActions__WEBPACK_IMPORTED_MODULE_0__["SetCollectingSelectionData"]) {
    state = Object.assign(Object.assign({}, state), {
      collectingData: action.busy
    });
  } else if (action instanceof _actions_deviceActions__WEBPACK_IMPORTED_MODULE_0__["EnableValueSelector"]) {
    state = Object.assign(Object.assign({}, state), {
      collectingData: false,
      keyProperty: action.keyProperty,
      listSpecification: action.listSpecification,
      onValueSelected: action.onValueSelected,
      listData: action.listData
    });
  } else if (action instanceof _actions_deviceActions__WEBPACK_IMPORTED_MODULE_0__["SetSelectedValue"]) {
    if (state.keyProperty) {
      state.onValueSelected(action.value[state.keyProperty]);
    }
    state = Object.assign(Object.assign({}, state), {
      collectingData: false,
      keyProperty: undefined,
      listSpecification: null,
      onValueSelected: dummyFunc,
      listData: []
    });
  } else if (action instanceof _actions_deviceActions__WEBPACK_IMPORTED_MODULE_0__["UpdateDeviceDescription"] || action instanceof _actions_deviceActions__WEBPACK_IMPORTED_MODULE_0__["UpdateViewDescription"] || action instanceof _actions_deviceActions__WEBPACK_IMPORTED_MODULE_0__["UpdateOutputData"]) {
    state = Object.assign(Object.assign({}, state), {
      collectingData: false,
      keyProperty: undefined,
      listSpecification: null,
      onValueSelected: dummyFunc,
      listData: []
    });
  }
  return state;
}.bind(undefined);

/***/ }),

/***/ "./handlers/viewDescriptionHandler.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DisplayModeType", function() { return DisplayModeType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "viewDescriptionHandler", function() { return viewDescriptionHandler; });
/* harmony import */ var _actions_deviceActions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./actions/deviceActions.ts");
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

var DisplayModeType;
(function (DisplayModeType) {
  DisplayModeType[DisplayModeType["doNotDisplay"] = 0] = "doNotDisplay";
  DisplayModeType[DisplayModeType["displayAsObject"] = 1] = "displayAsObject";
  DisplayModeType[DisplayModeType["displayAsList"] = 2] = "displayAsList";
  DisplayModeType[DisplayModeType["displayAsRPC"] = 3] = "displayAsRPC";
  DisplayModeType[DisplayModeType["displayAsMessage"] = 4] = "displayAsMessage";
})(DisplayModeType || (DisplayModeType = {}));
var viewDescriptionStateInit = {
  vPath: null,
  displaySpecification: {
    displayMode: DisplayModeType.doNotDisplay
  },
  viewData: null,
  outputData: undefined
};
var viewDescriptionHandler = function viewDescriptionHandler() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : viewDescriptionStateInit;
  var action = arguments.length > 1 ? arguments[1] : undefined;
  _newArrowCheck(this, _this);
  if (action instanceof _actions_deviceActions__WEBPACK_IMPORTED_MODULE_0__["UpdateViewDescription"]) {
    state = Object.assign(Object.assign({}, state), {
      vPath: action.vPath,
      viewData: action.viewData,
      outputData: undefined,
      displaySpecification: action.displaySpecification
    });
  } else if (action instanceof _actions_deviceActions__WEBPACK_IMPORTED_MODULE_0__["UpdateOutputData"]) {
    state = Object.assign(Object.assign({}, state), {
      outputData: action.outputData
    });
  }
  return state;
}.bind(undefined);

/***/ }),

/***/ "./models/uiModels.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isViewElementString", function() { return isViewElementString; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isViewElementDate", function() { return isViewElementDate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isViewElementNumber", function() { return isViewElementNumber; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isViewElementBoolean", function() { return isViewElementBoolean; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isViewElementObject", function() { return isViewElementObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isViewElementList", function() { return isViewElementList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isViewElementObjectOrList", function() { return isViewElementObjectOrList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isViewElementSelection", function() { return isViewElementSelection; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isViewElementReference", function() { return isViewElementReference; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isViewElementUnion", function() { return isViewElementUnion; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isViewElementChoice", function() { return isViewElementChoice; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isViewElementRpc", function() { return isViewElementRpc; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isViewElementEmpty", function() { return isViewElementEmpty; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ResolveFunction", function() { return ResolveFunction; });
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
var isViewElementString = function isViewElementString(viewElement) {
  _newArrowCheck(this, _this);
  return viewElement && (viewElement.uiType === 'string' || viewElement.uiType === 'date');
}.bind(undefined);
var isViewElementDate = function isViewElementDate(viewElement) {
  _newArrowCheck(this, _this);
  return viewElement && viewElement.uiType === 'date';
}.bind(undefined);
var isViewElementNumber = function isViewElementNumber(viewElement) {
  _newArrowCheck(this, _this);
  return viewElement && viewElement.uiType === 'number';
}.bind(undefined);
var isViewElementBoolean = function isViewElementBoolean(viewElement) {
  _newArrowCheck(this, _this);
  return viewElement && viewElement.uiType === 'boolean';
}.bind(undefined);
var isViewElementObject = function isViewElementObject(viewElement) {
  _newArrowCheck(this, _this);
  return viewElement && viewElement.uiType === 'object' && viewElement.isList === false;
}.bind(undefined);
var isViewElementList = function isViewElementList(viewElement) {
  _newArrowCheck(this, _this);
  return viewElement && viewElement.uiType === 'object' && viewElement.isList === true;
}.bind(undefined);
var isViewElementObjectOrList = function isViewElementObjectOrList(viewElement) {
  _newArrowCheck(this, _this);
  return viewElement && viewElement.uiType === 'object';
}.bind(undefined);
var isViewElementSelection = function isViewElementSelection(viewElement) {
  _newArrowCheck(this, _this);
  return viewElement && viewElement.uiType === 'selection';
}.bind(undefined);
var isViewElementReference = function isViewElementReference(viewElement) {
  _newArrowCheck(this, _this);
  return viewElement && viewElement.uiType === 'reference';
}.bind(undefined);
var isViewElementUnion = function isViewElementUnion(viewElement) {
  _newArrowCheck(this, _this);
  return viewElement && viewElement.uiType === 'union';
}.bind(undefined);
var isViewElementChoice = function isViewElementChoice(viewElement) {
  _newArrowCheck(this, _this);
  return viewElement && viewElement.uiType === 'choice';
}.bind(undefined);
var isViewElementRpc = function isViewElementRpc(viewElement) {
  _newArrowCheck(this, _this);
  return viewElement && viewElement.uiType === 'rpc';
}.bind(undefined);
var isViewElementEmpty = function isViewElementEmpty(viewElement) {
  _newArrowCheck(this, _this);
  return viewElement && viewElement.uiType === 'empty';
}.bind(undefined);
var ResolveFunction = Symbol('IsResolved');

/***/ }),

/***/ "./models/yang.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ModuleState", function() { return ModuleState; });
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
var ModuleState;
(function (ModuleState) {
  ModuleState[ModuleState["stable"] = 0] = "stable";
  ModuleState[ModuleState["instable"] = 1] = "instable";
  ModuleState[ModuleState["importOnly"] = 2] = "importOnly";
  ModuleState[ModuleState["unavailable"] = 3] = "unavailable";
})(ModuleState || (ModuleState = {}));

/***/ }),

/***/ "./pluginConfiguration.tsx":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "register", function() { return register; });
/* harmony import */ var core_js_modules_web_dom_iterable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../../node_modules/core-js/modules/web.dom.iterable.js");
/* harmony import */ var core_js_modules_web_dom_iterable__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_iterable__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../../node_modules/regenerator-runtime/runtime.js");
/* harmony import */ var regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("../../../node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var _framework_src_flux_connect__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("../../../framework/src/flux/connect.tsx");
/* harmony import */ var _framework_src_services_applicationManager__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("../../../framework/src/services/applicationManager.ts");
/* harmony import */ var _handlers_configurationAppRootHandler__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./handlers/configurationAppRootHandler.ts");
/* harmony import */ var _views_networkElementSelector__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./views/networkElementSelector.tsx");
/* harmony import */ var _views_configurationApplication__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./views/configurationApplication.tsx");
/* harmony import */ var _actions_deviceActions__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./actions/deviceActions.ts");
/* harmony import */ var _handlers_viewDescriptionHandler__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("./handlers/viewDescriptionHandler.ts");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }


var _this = undefined;
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









var appIcon = __webpack_require__("./assets/icons/configurationAppIcon.svg"); // select app icon
var currentNodeId = undefined;
var currentVirtualPath = undefined;
var lastUrl = undefined;
var mapDispatch = function mapDispatch(dispatcher) {
  var _this2 = this;
  _newArrowCheck(this, _this);
  return {
    updateNodeId: function updateNodeId(nodeId) {
      _newArrowCheck(this, _this2);
      return dispatcher.dispatch(Object(_actions_deviceActions__WEBPACK_IMPORTED_MODULE_9__["updateNodeIdAsyncActionCreator"])(nodeId));
    }.bind(this),
    updateView: function updateView(vPath) {
      _newArrowCheck(this, _this2);
      return dispatcher.dispatch(Object(_actions_deviceActions__WEBPACK_IMPORTED_MODULE_9__["updateViewActionAsyncCreator"])(vPath));
    }.bind(this)
  };
}.bind(undefined);
// eslint-disable-next-line @typescript-eslint/naming-convention
var ConfigurationApplicationRouteAdapter = Object(_framework_src_flux_connect__WEBPACK_IMPORTED_MODULE_4__["connect"])(undefined, mapDispatch)(function (props) {
  var _this3 = this;
  _newArrowCheck(this, _this);
  react__WEBPACK_IMPORTED_MODULE_2___default.a.useEffect(function () {
    var _this4 = this;
    _newArrowCheck(this, _this3);
    return function () {
      _newArrowCheck(this, _this4);
      lastUrl = undefined;
      currentNodeId = undefined;
      currentVirtualPath = undefined;
    }.bind(this);
  }.bind(this), []);
  if (props.location.pathname !== lastUrl) {
    // ensure the asynchronous update will only be called once per path
    lastUrl = props.location.pathname;
    window.setTimeout(function () {
      _newArrowCheck(this, _this3);
      return __awaiter(void 0, void 0, void 0, /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        var _this5 = this;
        var enableDump, device, ds, _createDump, dump, element;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              // check if the nodeId has changed
              enableDump = false;
              if (!(currentNodeId !== props.match.params.nodeId)) {
                _context.next = 8;
                break;
              }
              currentNodeId = props.match.params.nodeId || undefined;
              if (currentNodeId && currentNodeId.endsWith('|dump')) {
                enableDump = true;
                currentNodeId = currentNodeId.replace(/\|dump$/i, '');
              }
              currentVirtualPath = null;
              if (!currentNodeId) {
                _context.next = 8;
                break;
              }
              _context.next = 8;
              return props.updateNodeId(currentNodeId);
            case 8:
              if (!(currentVirtualPath !== props.match.params[0])) {
                _context.next = 13;
                break;
              }
              currentVirtualPath = props.match.params[0];
              if (currentVirtualPath && currentVirtualPath.endsWith('|dump')) {
                enableDump = true;
                currentVirtualPath = currentVirtualPath.replace(/\|dump$/i, '');
              }
              _context.next = 13;
              return props.updateView(currentVirtualPath);
            case 13:
              if (enableDump) {
                device = props.state.configuration.deviceDescription;
                ds = props.state.configuration.viewDescription.displaySpecification;
                _createDump = function createDump(view) {
                  var _this6 = this;
                  var level = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
                  _newArrowCheck(this, _this5);
                  if (view === null) return 'Empty';
                  var indention = Array(level * 4).fill(' ').join('');
                  var result = '';
                  if (!view) debugger;
                  // result += `${indention}  [${view.canEdit ? 'rw' : 'ro'}] ${view.ns}:${view.name} ${ds.displayMode === DisplayModeType.displayAsList ? '[LIST]' : ''}\r\n`;
                  result += Object.keys(view.elements).reduce(function (acc, cur) {
                    _newArrowCheck(this, _this6);
                    var elm = view.elements[cur];
                    acc += "".concat(indention, "  [").concat(elm.uiType === 'rpc' ? 'x' : elm.config ? 'rw' : 'ro', ":").concat(elm.id, "] (").concat(elm.module, ":").concat(elm.label, ") {").concat(elm.uiType, "} ").concat(elm.uiType === 'object' && elm.isList ? "as LIST with KEY [".concat(elm.key, "]") : '', "\r\n");
                    // acc += `${indention}    +${elm.mandatory ? "mandatory" : "none"} - ${elm.path} \r\n`;
                    switch (elm.uiType) {
                      case 'object':
                        acc += _createDump(device.views[elm.viewId], level + 1);
                        break;
                      default:
                    }
                    return acc;
                  }.bind(this), '');
                  return "".concat(result);
                }.bind(this);
                dump = _createDump(ds.displayMode === _handlers_viewDescriptionHandler__WEBPACK_IMPORTED_MODULE_10__["DisplayModeType"].displayAsObject || ds.displayMode === _handlers_viewDescriptionHandler__WEBPACK_IMPORTED_MODULE_10__["DisplayModeType"].displayAsList ? ds.viewSpecification : null, 0);
                element = document.createElement('a');
                element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(dump));
                element.setAttribute('download', currentNodeId + '.txt');
                element.style.display = 'none';
                document.body.appendChild(element);
                element.click();
                document.body.removeChild(element);
              }
            case 14:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
    }.bind(this));
  }
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_views_configurationApplication__WEBPACK_IMPORTED_MODULE_8__["default"], null);
}.bind(undefined));
var App = Object(react_router_dom__WEBPACK_IMPORTED_MODULE_3__["withRouter"])(function (props) {
  _newArrowCheck(this, _this);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_3__["Switch"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_3__["Route"], {
    path: "".concat(props.match.url, "/:nodeId/*"),
    component: ConfigurationApplicationRouteAdapter
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_3__["Route"], {
    path: "".concat(props.match.url, "/:nodeId"),
    component: ConfigurationApplicationRouteAdapter
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_3__["Route"], {
    path: "".concat(props.match.url),
    component: _views_networkElementSelector__WEBPACK_IMPORTED_MODULE_7__["NetworkElementSelector"]
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_3__["Redirect"], {
    to: "".concat(props.match.url)
  }));
}.bind(undefined));
function register() {
  _framework_src_services_applicationManager__WEBPACK_IMPORTED_MODULE_5__["default"].registerApplication({
    name: 'configuration',
    icon: appIcon,
    rootComponent: App,
    rootActionHandler: _handlers_configurationAppRootHandler__WEBPACK_IMPORTED_MODULE_6__["configurationAppRootHandler"],
    menuEntry: 'Configuration Old'
  });
}

/***/ }),

/***/ "./services/configurationrestServices.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "configurationRestService", function() { return configurationRestService; });
/* harmony import */ var core_js_modules_web_dom_iterable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../../node_modules/core-js/modules/web.dom.iterable.js");
/* harmony import */ var core_js_modules_web_dom_iterable__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_iterable__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../../node_modules/regenerator-runtime/runtime.js");
/* harmony import */ var regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _framework_src_services_restService__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../../../framework/src/services/restService.ts");
/* harmony import */ var _framework_src_utilities_yangHelper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("../../../framework/src/utilities/yangHelper.ts");


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


var capParser = /^\(.*\?revision=(\d{4}-\d{2}-\d{2})\)(\S+)$/i;
var ConfigurationRestService = /*#__PURE__*/function () {
  function ConfigurationRestService() {
    var _this = this;
    _classCallCheck(this, ConfigurationRestService);
    this.getNetworkElementUri = function (nodeId) {
      _newArrowCheck(this, _this);
      return '/rests/data/network-topology:network-topology/topology=topology-netconf/node=' + nodeId;
    }.bind(this);
  }
  return _createClass(ConfigurationRestService, [{
    key: "getImportOnlyModules",
    value: function getImportOnlyModules(nodeId) {
      return __awaiter(this, void 0, void 0, /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        var path, importOnlyResult, importOnlyModules;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              path = "".concat(this.getNetworkElementUri(nodeId), "/yang-ext:mount/ietf-yang-library:yang-library?content=nonconfig&fields=module-set(import-only-module(name;revision))");
              _context.next = 3;
              return Object(_framework_src_services_restService__WEBPACK_IMPORTED_MODULE_2__["requestRest"])(path, {
                method: 'GET'
              });
            case 3:
              importOnlyResult = _context.sent;
              importOnlyModules = importOnlyResult ? importOnlyResult['ietf-yang-library:yang-library']['module-set'][0]['import-only-module'] : [];
              return _context.abrupt("return", importOnlyModules);
            case 6:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
    }
  }, {
    key: "getCapabilitiesByMountId",
    value: function getCapabilitiesByMountId(nodeId) {
      return __awaiter(this, void 0, void 0, /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
        var _this2 = this;
        var path, capabilitiesResult, availableCapabilities, unavailableCapabilities, importOnlyModules;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              path = this.getNetworkElementUri(nodeId);
              _context2.next = 3;
              return Object(_framework_src_services_restService__WEBPACK_IMPORTED_MODULE_2__["requestRest"])(path, {
                method: 'GET'
              });
            case 3:
              capabilitiesResult = _context2.sent;
              availableCapabilities = capabilitiesResult && capabilitiesResult['network-topology:node'] && capabilitiesResult['network-topology:node'].length > 0 && (capabilitiesResult['network-topology:node'][0]['netconf-node-topology:available-capabilities'] && capabilitiesResult['network-topology:node'][0]['netconf-node-topology:available-capabilities']['available-capability'] && capabilitiesResult['network-topology:node'][0]['netconf-node-topology:available-capabilities']['available-capability'].map(function (obj) {
                _newArrowCheck(this, _this2);
                return Object(_framework_src_utilities_yangHelper__WEBPACK_IMPORTED_MODULE_3__["convertPropertyNames"])(obj, _framework_src_utilities_yangHelper__WEBPACK_IMPORTED_MODULE_3__["replaceHyphen"]);
              }.bind(this)) || []).map(function (cap) {
                _newArrowCheck(this, _this2);
                var capMatch = cap && capParser.exec(cap.capability);
                return capMatch ? {
                  capabilityOrigin: cap.capabilityOrigin,
                  capability: capMatch && capMatch[2] || '',
                  version: capMatch && capMatch[1] || ''
                } : null;
              }.bind(this)).filter(function (cap) {
                _newArrowCheck(this, _this2);
                return cap != null;
              }.bind(this)) || [];
              unavailableCapabilities = capabilitiesResult && capabilitiesResult['network-topology:node'] && capabilitiesResult['network-topology:node'].length > 0 && (capabilitiesResult['network-topology:node'][0]['netconf-node-topology:unavailable-capabilities'] && capabilitiesResult['network-topology:node'][0]['netconf-node-topology:unavailable-capabilities']['unavailable-capability'] && capabilitiesResult['network-topology:node'][0]['netconf-node-topology:unavailable-capabilities']['unavailable-capability'].map(function (obj) {
                _newArrowCheck(this, _this2);
                return Object(_framework_src_utilities_yangHelper__WEBPACK_IMPORTED_MODULE_3__["convertPropertyNames"])(obj, _framework_src_utilities_yangHelper__WEBPACK_IMPORTED_MODULE_3__["replaceHyphen"]);
              }.bind(this)) || []).map(function (cap) {
                _newArrowCheck(this, _this2);
                var capMatch = cap && capParser.exec(cap.capability);
                return capMatch ? {
                  failureReason: cap.failureReason,
                  capability: capMatch && capMatch[2] || '',
                  version: capMatch && capMatch[1] || ''
                } : null;
              }.bind(this)).filter(function (cap) {
                _newArrowCheck(this, _this2);
                return cap != null;
              }.bind(this)) || [];
              if (!(availableCapabilities && availableCapabilities.findIndex(function (ac) {
                _newArrowCheck(this, _this2);
                return ac.capability && ac.capability.toLowerCase() === 'ietf-yang-library';
              }.bind(this)) > -1)) {
                _context2.next = 12;
                break;
              }
              _context2.next = 9;
              return this.getImportOnlyModules(nodeId);
            case 9:
              _context2.t0 = _context2.sent;
              _context2.next = 13;
              break;
            case 12:
              _context2.t0 = null;
            case 13:
              importOnlyModules = _context2.t0;
              return _context2.abrupt("return", {
                availableCapabilities: availableCapabilities,
                unavailableCapabilities: unavailableCapabilities,
                importOnlyModules: importOnlyModules
              });
            case 15:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this);
      }));
    }
  }, {
    key: "getMountedNetworkElementByMountId",
    value: function getMountedNetworkElementByMountId(nodeId) {
      return __awaiter(this, void 0, void 0, /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
        var _this3 = this;
        var path, body, networkElementResult;
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              // const path = 'restconf/operational/network-topology:network-topology/topology/topology-netconf/node/' + nodeId;
              // const connectedNetworkElement = await requestRest<NetworkElementConnection>(path, { method: "GET" });
              // return connectedNetworkElement || null;
              path = '/rests/operations/data-provider:read-network-element-connection-list';
              body = {
                'data-provider:input': {
                  'filter': [{
                    'property': 'node-id',
                    'filtervalue': nodeId
                  }],
                  'sortorder': [],
                  'pagination': {
                    'size': 1,
                    'page': 1
                  }
                }
              };
              _context3.next = 4;
              return Object(_framework_src_services_restService__WEBPACK_IMPORTED_MODULE_2__["requestRest"])(path, {
                method: 'POST',
                body: JSON.stringify(body)
              });
            case 4:
              networkElementResult = _context3.sent;
              return _context3.abrupt("return", networkElementResult && networkElementResult['data-provider:output'] && networkElementResult['data-provider:output'].data && networkElementResult['data-provider:output'].data.map(function (obj) {
                _newArrowCheck(this, _this3);
                return Object(_framework_src_utilities_yangHelper__WEBPACK_IMPORTED_MODULE_3__["convertPropertyNames"])(obj, _framework_src_utilities_yangHelper__WEBPACK_IMPORTED_MODULE_3__["replaceHyphen"]);
              }.bind(this))[0] || null);
            case 6:
            case "end":
              return _context3.stop();
          }
        }, _callee3, this);
      }));
    }
    /** Reads the config data by restconf path.
    * @param path The restconf path to be used for read.
    * @returns The data.
    */
  }, {
    key: "getConfigData",
    value: function getConfigData(path) {
      return Object(_framework_src_services_restService__WEBPACK_IMPORTED_MODULE_2__["requestRestExt"])(path, {
        method: 'GET'
      });
    }
    /** Updates or creates the config data by restconf path using data.
     * @param path The restconf path to identify the note to update.
     * @param data The data to be updated.
     * @returns The written data.
     */
  }, {
    key: "setConfigData",
    value: function setConfigData(path, data) {
      return Object(_framework_src_services_restService__WEBPACK_IMPORTED_MODULE_2__["requestRestExt"])(path, {
        method: 'PUT',
        body: JSON.stringify(data)
      });
    }
  }, {
    key: "executeRpc",
    value: function executeRpc(path, data) {
      return Object(_framework_src_services_restService__WEBPACK_IMPORTED_MODULE_2__["requestRestExt"])(path, {
        method: 'POST',
        body: JSON.stringify(data)
      });
    }
    /** Removes the element by restconf path.
    * @param path The restconf path to identify the note to update.
    * @returns The restconf result.
    */
  }, {
    key: "removeConfigElement",
    value: function removeConfigElement(path) {
      return Object(_framework_src_services_restService__WEBPACK_IMPORTED_MODULE_2__["requestRestExt"])(path, {
        method: 'DELETE'
      });
    }
  }]);
}();
var configurationRestService = new ConfigurationRestService();
/* harmony default export */ __webpack_exports__["default"] = (configurationRestService);

/***/ }),

/***/ "./services/yangService.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "yangService", function() { return yangService; });
/* harmony import */ var core_js_modules_web_dom_iterable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../../node_modules/core-js/modules/web.dom.iterable.js");
/* harmony import */ var core_js_modules_web_dom_iterable__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_iterable__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../../node_modules/regenerator-runtime/runtime.js");
/* harmony import */ var regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_1__);
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }


var _this = undefined;
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
var cache = {};
var getCapability = function getCapability(capability, nodeId, version) {
  _newArrowCheck(this, _this);
  return __awaiter(void 0, void 0, void 0, /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
    var url, cacheHit, res, yangFile;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          url = "/yang-schema/".concat(capability).concat(version ? "/".concat(version) : '', "?node=").concat(nodeId);
          cacheHit = cache[url];
          if (!cacheHit) {
            _context.next = 4;
            break;
          }
          return _context.abrupt("return", cacheHit);
        case 4:
          _context.next = 6;
          return Promise.resolve(fetch(url));
        case 6:
          res = _context.sent;
          _context.t0 = res.ok;
          if (!_context.t0) {
            _context.next = 12;
            break;
          }
          _context.next = 11;
          return res.text();
        case 11:
          _context.t0 = _context.sent;
        case 12:
          yangFile = _context.t0;
          if (yangFile !== false && yangFile !== null) {
            cache[url] = yangFile;
          }
          return _context.abrupt("return", yangFile);
        case 15:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
}.bind(undefined);
var yangService = {
  getCapability: getCapability
};
/* harmony default export */ __webpack_exports__["default"] = (yangService);

/***/ }),

/***/ "./utilities/verifyer.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "checkRange", function() { return checkRange; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "checkPattern", function() { return checkPattern; });
/* harmony import */ var core_js_modules_web_dom_iterable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../../node_modules/core-js/modules/web.dom.iterable.js");
/* harmony import */ var core_js_modules_web_dom_iterable__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_iterable__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _models_uiModels__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./models/uiModels.ts");

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

var rangeErrorStartNumber = 'The entered number must be';
var rangeErrorInnerMinTextNumber = 'greater or equals than';
var rangeErrorInnerMaxTextNumber = 'less or equals than';
var rangeErrorEndTextNumber = '.';
var rangeErrorStartString = 'The entered text must have';
var rangeErrorInnerMinTextString = 'no more than';
var rangeErrorInnerMaxTextString = 'less than';
var rangeErrorEndTextString = ' characters.';
var errorMessageStart = '';
var errorMessageMiddleMinPart = '';
var errorMessageMiddleMaxPart = '';
var errorMessageEnd = '';
var isYangRange = function isYangRange(val) {
  _newArrowCheck(this, _this);
  return val.min !== undefined;
}.bind(undefined);
var isYangOperator = function isYangOperator(val) {
  _newArrowCheck(this, _this);
  return val.operation !== undefined;
}.bind(undefined);
var isRegExp = function isRegExp(val) {
  _newArrowCheck(this, _this);
  return val.source !== undefined;
}.bind(undefined);
var isRegExpOperator = function isRegExpOperator(val) {
  _newArrowCheck(this, _this);
  return val.operation !== undefined;
}.bind(undefined);
var _getRangeErrorMessagesRecursively = function getRangeErrorMessagesRecursively(value, data) {
  _newArrowCheck(this, _this);
  var currentIteration = [];
  // iterate over all elements
  for (var i = 0; i < value.arguments.length; i++) {
    var element = value.arguments[i];
    var min = undefined;
    var max = undefined;
    var isNumberCorrect = false;
    if (isYangRange(element)) {
      //check found min values
      if (!isNaN(element.min)) {
        if (data < element.min) {
          min = element.min;
        } else {
          isNumberCorrect = true;
        }
      }
      // check found max values
      if (!isNaN(element.max)) {
        if (data > element.max) {
          max = element.max;
        } else {
          isNumberCorrect = true;
        }
      }
      // construct error messages
      if (min != undefined) {
        currentIteration.push("".concat(value.operation.toLocaleLowerCase(), " ").concat(errorMessageMiddleMinPart, " ").concat(min));
      } else if (max != undefined) {
        currentIteration.push("".concat(value.operation.toLocaleLowerCase(), " ").concat(errorMessageMiddleMaxPart, " ").concat(max));
      }
    } else if (isYangOperator(element)) {
      //get error_message from expression
      var result = _getRangeErrorMessagesRecursively(element, data);
      if (result.length === 0) {
        isNumberCorrect = true;
      }
      currentIteration = currentIteration.concat(result);
    }
    // if its an OR operation, the number has been checked and min/max are empty (thus not violated)
    // delete everything found (because at least one found is correct, therefore all are correct) and break from loop
    if (min === undefined && max === undefined && isNumberCorrect && value.operation === 'OR') {
      currentIteration.splice(0, currentIteration.length);
      break;
    }
  }
  return currentIteration;
}.bind(undefined);
var createStartMessage = function createStartMessage(element) {
  _newArrowCheck(this, _this);
  //remove leading or or and from text
  if (element.startsWith('and')) {
    element = element.replace('and', '');
  } else if (element.startsWith('or')) {
    element = element.replace('or', '');
  }
  return "".concat(errorMessageStart, " ").concat(element);
}.bind(undefined);
var getRangeErrorMessages = function getRangeErrorMessages(value, data) {
  var _this2 = this;
  _newArrowCheck(this, _this);
  var currentIteration = _getRangeErrorMessagesRecursively(value, data);
  // build complete error message from found parts
  var errorMessage = '';
  if (currentIteration.length > 1) {
    currentIteration.forEach(function (element, index) {
      _newArrowCheck(this, _this2);
      if (index === 0) {
        errorMessage = createStartMessage(element);
      } else if (index === currentIteration.length - 1) {
        errorMessage += " ".concat(element).concat(errorMessageEnd);
      } else {
        errorMessage += ", ".concat(element);
      }
    }.bind(this));
  } else if (currentIteration.length == 1) {
    errorMessage = "".concat(createStartMessage(currentIteration[0])).concat(errorMessageEnd);
  }
  return errorMessage;
}.bind(undefined);
var checkRange = function checkRange(element, data) {
  _newArrowCheck(this, _this);
  var number = data;
  var expression = undefined;
  if (Object(_models_uiModels__WEBPACK_IMPORTED_MODULE_1__["isViewElementString"])(element)) {
    expression = element.length;
    errorMessageStart = rangeErrorStartString;
    errorMessageMiddleMaxPart = rangeErrorInnerMaxTextString;
    errorMessageMiddleMinPart = rangeErrorInnerMinTextString;
    errorMessageEnd = rangeErrorEndTextString;
  } else if (Object(_models_uiModels__WEBPACK_IMPORTED_MODULE_1__["isViewElementNumber"])(element)) {
    expression = element.range;
    errorMessageStart = rangeErrorStartNumber;
    errorMessageMiddleMaxPart = rangeErrorInnerMaxTextNumber;
    errorMessageMiddleMinPart = rangeErrorInnerMinTextNumber;
    errorMessageEnd = rangeErrorEndTextNumber;
  }
  if (expression) {
    if (isYangOperator(expression)) {
      var errorMessage = getRangeErrorMessages(expression, data);
      return errorMessage;
    } else if (isYangRange(expression)) {
      if (!isNaN(expression.min)) {
        if (number < expression.min) {
          return "".concat(errorMessageStart, " ").concat(errorMessageMiddleMinPart, " ").concat(expression.min).concat(errorMessageEnd);
        }
      }
      if (!isNaN(expression.max)) {
        if (number > expression.max) {
          return "".concat(errorMessageStart, " ").concat(errorMessageMiddleMaxPart, " ").concat(expression.max).concat(errorMessageEnd);
        }
      }
    }
  }
  return '';
}.bind(undefined);
var _getRegexRecursively = function getRegexRecursively(value, data) {
  var _this3 = this;
  _newArrowCheck(this, _this);
  var currentItteration = [];
  for (var i = 0; i < value.arguments.length; i++) {
    var element = value.arguments[i];
    if (isRegExp(element)) {
      // if regex is found, add it to list
      currentItteration.push(element.test(data));
    } else if (isRegExpOperator(element)) {
      //if RegexExpression is found, try to get regex from it
      currentItteration = currentItteration.concat(_getRegexRecursively(element, data));
    }
  }
  if (value.operation === 'OR') {
    // if one is true, all are true, all found items can be discarded
    var result = currentItteration.find(function (element) {
      _newArrowCheck(this, _this3);
      return element;
    }.bind(this));
    if (result) {
      return [];
    }
  }
  return currentItteration;
}.bind(undefined);
var isPatternValid = function isPatternValid(value, data) {
  var _this4 = this;
  _newArrowCheck(this, _this);
  // get all regex
  var result = _getRegexRecursively(value, data);
  if (value.operation === 'AND') {
    // if AND operation is executed...
    // no element can be false
    var check = result.find(function (element) {
      _newArrowCheck(this, _this4);
      return element !== true;
    }.bind(this));
    if (check) return false;else return true;
  } else {
    // if OR operation is executed...
    // ... just one element must be true
    var _check = result.find(function (element) {
      _newArrowCheck(this, _this4);
      return element === true;
    }.bind(this));
    if (_check) return true;else return false;
  }
}.bind(undefined);
var checkPattern = function checkPattern(expression, data) {
  _newArrowCheck(this, _this);
  if (expression) {
    if (isRegExp(expression)) {
      var isValid = expression.test(data);
      if (!isValid) return {
        isValid: isValid,
        error: 'The input is in a wrong format.'
      };
    } else if (isRegExpOperator(expression)) {
      var result = isPatternValid(expression, data);
      if (!result) {
        return {
          isValid: false,
          error: 'The input is in a wrong format.'
        };
      }
    }
  }
  return {
    isValid: true
  };
}.bind(undefined);

/***/ }),

/***/ "./utilities/viewEngineHelper.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "checkResponseCode", function() { return checkResponseCode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "resolveVPath", function() { return resolveVPath; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "splitVPath", function() { return splitVPath; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getReferencedDataList", function() { return getReferencedDataList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "resolveViewDescription", function() { return resolveViewDescription; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "flattenViewElements", function() { return _flattenViewElements; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "filterViewElements", function() { return filterViewElements; });
/* harmony import */ var regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../../node_modules/regenerator-runtime/runtime.js");
/* harmony import */ var regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_web_dom_iterable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../../node_modules/core-js/modules/web.dom.iterable.js");
/* harmony import */ var core_js_modules_web_dom_iterable__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_iterable__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _framework_src_services_storeService__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../../../framework/src/services/storeService.ts");
/* harmony import */ var _yang_whenParser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./yang/whenParser.ts");
/* harmony import */ var _models_uiModels__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./models/uiModels.ts");
/* harmony import */ var _services_configurationrestServices__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./services/configurationrestServices.ts");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }


var _this = undefined;
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator.return && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, catch: function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t.return || t.return(); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
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




var checkResponseCode = function checkResponseCode(restResult) {
  _newArrowCheck(this, _this);
  //403 gets handled by the framework from now on
  return restResult.status !== 403 && (restResult.status < 200 || restResult.status > 299);
}.bind(undefined);
var resolveVPath = function resolveVPath(current, vPath) {
  _newArrowCheck(this, _this);
  if (vPath.startsWith('/')) {
    return vPath;
  }
  var parts = current.split('/');
  var vPathParts = vPath.split('/');
  var _iterator = _createForOfIteratorHelper(vPathParts),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var part = _step.value;
      if (part === '.') {
        continue;
      } else if (part === '..') {
        parts.pop();
      } else {
        parts.push(part);
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  return parts.join('/');
}.bind(undefined);
var splitVPath = function splitVPath(vPath, vPathParser) {
  _newArrowCheck(this, _this);
  var pathParts = [];
  var partMatch;
  if (vPath) do {
    partMatch = vPathParser.exec(vPath);
    if (partMatch) {
      pathParts.push([partMatch[1], partMatch[2] || undefined]);
    }
  } while (partMatch);
  return pathParts;
}.bind(undefined);
var derivedFrom = function derivedFrom(vPath, when, viewData) {
  var _this2 = this;
  var includeSelf = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  _newArrowCheck(this, _this);
  var _a, _b, _c;
  if (((_a = when.args) === null || _a === void 0 ? void 0 : _a.length) !== 2) {
    throw new Error('derived-from or derived-from-or-self requires 2 arguments.');
  }
  var _when$args = _slicedToArray(when.args, 2),
    arg1 = _when$args[0],
    arg2 = _when$args[1];
  if (arg1.type !== _yang_whenParser__WEBPACK_IMPORTED_MODULE_3__["WhenTokenType"].IDENTIFIER || arg2.type !== _yang_whenParser__WEBPACK_IMPORTED_MODULE_3__["WhenTokenType"].STRING) {
    throw new Error('derived-from or derived-from-or-self requires first argument IDENTIFIER and second argument STRING.');
  }
  if (!_framework_src_services_storeService__WEBPACK_IMPORTED_MODULE_2__["storeService"].applicationStore) {
    throw new Error('storeService.applicationStore is not defined.');
  }
  var pathParts = splitVPath(arg1.value || '', /(?:(?:([^\/\:]+):)?([^\/]+))/g);
  var referenceValueParts = /(?:(?:([^\/\:]+):)?([^\/]+))/g.exec(arg2.value || '');
  if (!pathParts || !referenceValueParts || pathParts.length === 0 || referenceValueParts.length === 0) {
    throw new Error('derived-from or derived-from-or-self requires first argument PATH and second argument IDENTITY.');
  }
  if (((_b = pathParts[0][1]) === null || _b === void 0 ? void 0 : _b.startsWith('..')) || ((_c = pathParts[0][1]) === null || _c === void 0 ? void 0 : _c.startsWith('/'))) {
    throw new Error('derived-from or derived-from-or-self currently only supports relative paths.');
  }
  var modules = _framework_src_services_storeService__WEBPACK_IMPORTED_MODULE_2__["storeService"].applicationStore.state.configuration.deviceDescription.modules;
  var dataValue = pathParts.reduce(function (acc, _ref) {
    var _this3 = this;
    var _ref2 = _slicedToArray(_ref, 2),
      ns = _ref2[0],
      prop = _ref2[1];
    _newArrowCheck(this, _this2);
    var _a;
    if (prop === '.') {
      return acc;
    }
    if (acc && prop) {
      var moduleName = ns && ((_a = Object.values(modules).find(function (m) {
        _newArrowCheck(this, _this3);
        return m.prefix === ns;
      }.bind(this)) || Object.values(modules).find(function (m) {
        _newArrowCheck(this, _this3);
        return m.name === ns;
      }.bind(this))) === null || _a === void 0 ? void 0 : _a.name);
      return moduleName ? acc["".concat(moduleName, ":").concat(prop)] || acc[prop] : acc[prop];
    }
    return undefined;
  }.bind(this), viewData);
  var dataValueParts = dataValue && /(?:(?:([^\/\:]+):)?([^\/]+))/g.exec(dataValue);
  if (!dataValueParts || dataValueParts.length < 2) {
    throw new Error("derived-from or derived-from-or-self value referenced by first argument [".concat(arg1.value, "] not found."));
  }
  var _dataValueParts = dataValueParts,
    _dataValueParts2 = _slicedToArray(_dataValueParts, 3),
    dataValueNs = _dataValueParts2[1],
    dataValueProp = _dataValueParts2[2];
  var dataValueModule = dataValueNs && Object.values(modules).find(function (m) {
    _newArrowCheck(this, _this2);
    return m.name === dataValueNs;
  }.bind(this));
  var dataValueIdentity = dataValueModule && dataValueModule.identities && Object.values(dataValueModule.identities).find(function (i) {
    _newArrowCheck(this, _this2);
    return i.label === dataValueProp;
  }.bind(this));
  if (!dataValueIdentity) {
    throw new Error("derived-from or derived-from-or-self identity [".concat(dataValue, "] referenced by first argument [").concat(arg1.value, "] not found."));
  }
  var _referenceValueParts = _slicedToArray(referenceValueParts, 3),
    referenceValueNs = _referenceValueParts[1],
    referenceValueProp = _referenceValueParts[2];
  var referenceValueModule = referenceValueNs && Object.values(modules).find(function (m) {
    _newArrowCheck(this, _this2);
    return m.prefix === referenceValueNs;
  }.bind(this));
  var referenceValueIdentity = referenceValueModule && referenceValueModule.identities && Object.values(referenceValueModule.identities).find(function (i) {
    _newArrowCheck(this, _this2);
    return i.label === referenceValueProp;
  }.bind(this));
  if (!referenceValueIdentity) {
    throw new Error("derived-from or derived-from-or-self identity [".concat(arg2.value, "] referenced by second argument not found."));
  }
  var result = includeSelf && referenceValueIdentity === dataValueIdentity;
  var _loop = function _loop() {
    var _this4 = this;
    dataValueParts = dataValue && /(?:(?:([^\/\:]+):)?([^\/]+))/g.exec(dataValueIdentity.base);
    var _dataValueParts3 = dataValueParts,
      _dataValueParts4 = _slicedToArray(_dataValueParts3, 3),
      innerDataValueNs = _dataValueParts4[1],
      innerDataValueProp = _dataValueParts4[2];
    dataValueModule = innerDataValueNs && Object.values(modules).find(function (m) {
      _newArrowCheck(this, _this4);
      return m.prefix === innerDataValueNs;
    }.bind(this)) || dataValueModule;
    dataValueIdentity = dataValueModule && dataValueModule.identities && Object.values(dataValueModule.identities).find(function (i) {
      _newArrowCheck(this, _this4);
      return i.label === innerDataValueProp;
    }.bind(this));
    result = referenceValueIdentity === dataValueIdentity;
  };
  while (dataValueIdentity && dataValueIdentity.base && !result) {
    _loop();
  }
  return result;
}.bind(undefined);
var _evaluateWhen = function evaluateWhen(vPath, when, viewData) {
  _newArrowCheck(this, _this);
  return __awaiter(void 0, void 0, void 0, /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.t0 = when.type;
          _context.next = _context.t0 === _yang_whenParser__WEBPACK_IMPORTED_MODULE_3__["WhenTokenType"].FUNCTION ? 3 : _context.t0 === _yang_whenParser__WEBPACK_IMPORTED_MODULE_3__["WhenTokenType"].AND ? 9 : _context.t0 === _yang_whenParser__WEBPACK_IMPORTED_MODULE_3__["WhenTokenType"].OR ? 20 : _context.t0 === _yang_whenParser__WEBPACK_IMPORTED_MODULE_3__["WhenTokenType"].NOT ? 31 : _context.t0 === _yang_whenParser__WEBPACK_IMPORTED_MODULE_3__["WhenTokenType"].EXPRESSION ? 37 : 43;
          break;
        case 3:
          _context.t1 = when.name;
          _context.next = _context.t1 === 'derived-from-or-self' ? 6 : _context.t1 === 'derived-from' ? 7 : 8;
          break;
        case 6:
          return _context.abrupt("return", derivedFrom(vPath, when, viewData, true));
        case 7:
          return _context.abrupt("return", derivedFrom(vPath, when, viewData, false));
        case 8:
          throw new Error("Unknown function ".concat(when.name));
        case 9:
          _context.t2 = !when.left || !when.right;
          if (_context.t2) {
            _context.next = 19;
            break;
          }
          _context.next = 13;
          return _evaluateWhen(vPath, when.left, viewData);
        case 13:
          _context.t3 = _context.sent;
          if (!_context.t3) {
            _context.next = 18;
            break;
          }
          _context.next = 17;
          return _evaluateWhen(vPath, when.right, viewData);
        case 17:
          _context.t3 = _context.sent;
        case 18:
          _context.t2 = _context.t3;
        case 19:
          return _context.abrupt("return", _context.t2);
        case 20:
          _context.t4 = !when.left || !when.right;
          if (_context.t4) {
            _context.next = 30;
            break;
          }
          _context.next = 24;
          return _evaluateWhen(vPath, when.left, viewData);
        case 24:
          _context.t5 = _context.sent;
          if (_context.t5) {
            _context.next = 29;
            break;
          }
          _context.next = 28;
          return _evaluateWhen(vPath, when.right, viewData);
        case 28:
          _context.t5 = _context.sent;
        case 29:
          _context.t4 = _context.t5;
        case 30:
          return _context.abrupt("return", _context.t4);
        case 31:
          _context.t6 = !when.right;
          if (_context.t6) {
            _context.next = 36;
            break;
          }
          _context.next = 35;
          return _evaluateWhen(vPath, when.right, viewData);
        case 35:
          _context.t6 = !_context.sent;
        case 36:
          return _context.abrupt("return", _context.t6);
        case 37:
          _context.t7 = !(when.value && typeof when.value !== 'string');
          if (_context.t7) {
            _context.next = 42;
            break;
          }
          _context.next = 41;
          return _evaluateWhen(vPath, when.value, viewData);
        case 41:
          _context.t7 = _context.sent;
        case 42:
          return _context.abrupt("return", _context.t7);
        case 43:
          return _context.abrupt("return", true);
        case 44:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
}.bind(undefined);
var getReferencedDataList = function getReferencedDataList(refPath, dataPath, modules, views) {
  _newArrowCheck(this, _this);
  return __awaiter(void 0, void 0, void 0, /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
    var pathParts, defaultNS, referencedModule, dataMember, view, currentNS, dataUrls, data, _loop2, _ret, i;
    return _regeneratorRuntime().wrap(function _callee2$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          pathParts = splitVPath(refPath, /(?:(?:([^\/\:]+):)?([^\/]+))/g); // 1 = opt: namespace / 2 = property
          defaultNS = pathParts[0][0];
          referencedModule = modules[defaultNS];
          currentNS = null;
          dataUrls = [dataPath];
          _loop2 = /*#__PURE__*/_regeneratorRuntime().mark(function _loop2() {
            var _this6 = this;
            var _pathParts$i, pathPartNS, pathPart, namespace, viewElement, resultingDataUrls, _loop3, j, pathSegment, _j, dataUrl, restResult, message, dataRaw, key;
            return _regeneratorRuntime().wrap(function _loop2$(_context3) {
              while (1) switch (_context3.prev = _context3.next) {
                case 0:
                  _pathParts$i = _slicedToArray(pathParts[i], 2), pathPartNS = _pathParts$i[0], pathPart = _pathParts$i[1];
                  namespace = pathPartNS != null ? currentNS = pathPartNS : currentNS;
                  viewElement = i === 0 ? views[0].elements["".concat(referencedModule.name, ":").concat(pathPart)] : view.elements["".concat(pathPart)] || view.elements["".concat(namespace, ":").concat(pathPart)];
                  if (viewElement) {
                    _context3.next = 5;
                    break;
                  }
                  throw new Error("Could not find ".concat(pathPart, " in ").concat(refPath));
                case 5:
                  if (!(i < pathParts.length - 1)) {
                    _context3.next = 27;
                    break;
                  }
                  if (Object(_models_uiModels__WEBPACK_IMPORTED_MODULE_4__["isViewElementObjectOrList"])(viewElement)) {
                    _context3.next = 8;
                    break;
                  }
                  throw Error("Module: [".concat(referencedModule.name, "].[").concat(viewElement.label, "]. View element is not list or object."));
                case 8:
                  view = views[+viewElement.viewId];
                  resultingDataUrls = [];
                  if (!Object(_models_uiModels__WEBPACK_IMPORTED_MODULE_4__["isViewElementList"])(viewElement)) {
                    _context3.next = 21;
                    break;
                  }
                  _loop3 = /*#__PURE__*/_regeneratorRuntime().mark(function _loop3() {
                    var _this5 = this;
                    var dataUrl, restResult, message, dataRaw, keys;
                    return _regeneratorRuntime().wrap(function _loop3$(_context2) {
                      while (1) switch (_context2.prev = _context2.next) {
                        case 0:
                          dataUrl = dataUrls[j];
                          _context2.next = 3;
                          return _services_configurationrestServices__WEBPACK_IMPORTED_MODULE_5__["configurationRestService"].getConfigData(dataUrl);
                        case 3:
                          restResult = _context2.sent;
                          if (!(restResult.data == null || checkResponseCode(restResult))) {
                            _context2.next = 7;
                            break;
                          }
                          message = restResult.data && restResult.data.errors && restResult.data.errors.error && restResult.data.errors.error[0] && restResult.data.errors.error[0]['error-message'] || '';
                          throw new Error("Server Error. Status: [".concat(restResult.status, "]\n").concat(message || restResult.message || ''));
                        case 7:
                          dataRaw = restResult.data["".concat(defaultNS, ":").concat(dataMember)];
                          if (dataRaw === undefined) {
                            dataRaw = restResult.data[dataMember];
                          }
                          dataRaw = dataRaw instanceof Array ? dataRaw[0] : dataRaw;
                          data = dataRaw && dataRaw[viewElement.label] || [];
                          keys = data.map(function (entry) {
                            _newArrowCheck(this, _this5);
                            return entry[viewElement.key];
                          }.bind(this));
                          resultingDataUrls.push.apply(resultingDataUrls, _toConsumableArray(keys.map(function (key) {
                            _newArrowCheck(this, _this5);
                            return "".concat(dataUrl, "/").concat(viewElement.label.replace(/\//ig, '%2F'), "=").concat(key.replace(/\//ig, '%2F'));
                          }.bind(this))));
                        case 13:
                        case "end":
                          return _context2.stop();
                      }
                    }, _loop3, this);
                  });
                  j = 0;
                case 13:
                  if (!(j < dataUrls.length)) {
                    _context3.next = 18;
                    break;
                  }
                  return _context3.delegateYield(_loop3(), "t0", 15);
                case 15:
                  ++j;
                  _context3.next = 13;
                  break;
                case 18:
                  dataMember = viewElement.label;
                  _context3.next = 24;
                  break;
                case 21:
                  // just a member, not a list
                  pathSegment = i === 0 ? "/".concat(referencedModule.name, ":").concat(viewElement.label.replace(/\//ig, '%2F')) : "/".concat(viewElement.label.replace(/\//ig, '%2F'));
                  resultingDataUrls.push.apply(resultingDataUrls, _toConsumableArray(dataUrls.map(function (dataUrl) {
                    _newArrowCheck(this, _this6);
                    return dataUrl + pathSegment;
                  }.bind(this))));
                  dataMember = viewElement.label;
                case 24:
                  dataUrls = resultingDataUrls;
                  _context3.next = 46;
                  break;
                case 27:
                  data = [];
                  _j = 0;
                case 29:
                  if (!(_j < dataUrls.length)) {
                    _context3.next = 44;
                    break;
                  }
                  dataUrl = dataUrls[_j];
                  _context3.next = 33;
                  return _services_configurationrestServices__WEBPACK_IMPORTED_MODULE_5__["configurationRestService"].getConfigData(dataUrl);
                case 33:
                  restResult = _context3.sent;
                  if (!(restResult.data == null || checkResponseCode(restResult))) {
                    _context3.next = 37;
                    break;
                  }
                  message = restResult.data && restResult.data.errors && restResult.data.errors.error && restResult.data.errors.error[0] && restResult.data.errors.error[0]['error-message'] || '';
                  throw new Error("Server Error. Status: [".concat(restResult.status, "]\n").concat(message || restResult.message || ''));
                case 37:
                  dataRaw = restResult.data["".concat(defaultNS, ":").concat(dataMember)];
                  if (dataRaw === undefined) {
                    dataRaw = restResult.data[dataMember];
                  }
                  dataRaw = dataRaw instanceof Array ? dataRaw[0] : dataRaw;
                  data.push(dataRaw);
                case 41:
                  ++_j;
                  _context3.next = 29;
                  break;
                case 44:
                  // BUG UUID ist nicht in den elements enthalten !!!!!!
                  key = viewElement && viewElement.label || pathPart;
                  return _context3.abrupt("return", {
                    v: {
                      view: view,
                      data: data,
                      key: key
                    }
                  });
                case 46:
                case "end":
                  return _context3.stop();
              }
            }, _loop2, this);
          });
          i = 0;
        case 7:
          if (!(i < pathParts.length)) {
            _context4.next = 15;
            break;
          }
          return _context4.delegateYield(_loop2(), "t0", 9);
        case 9:
          _ret = _context4.t0;
          if (!_ret) {
            _context4.next = 12;
            break;
          }
          return _context4.abrupt("return", _ret.v);
        case 12:
          ++i;
          _context4.next = 7;
          break;
        case 15:
          return _context4.abrupt("return", null);
        case 16:
        case "end":
          return _context4.stop();
      }
    }, _callee2);
  }));
}.bind(undefined);
var resolveViewDescription = function resolveViewDescription(defaultNS, vPath, view) {
  var _this7 = this;
  _newArrowCheck(this, _this);
  // resolve all references.
  view = Object.assign({}, view);
  view.elements = Object.keys(view.elements).reduce(function (acc, cur) {
    _newArrowCheck(this, _this7);
    var resolveHistory = [];
    var elm = view.elements[cur];
    var key = defaultNS && cur.replace(new RegExp("^".concat(defaultNS, ":"), 'i'), '') || cur;
    var _loop4 = function _loop4() {
      var _this8 = this;
      var result = elm.ref(vPath);
      if (result) {
        var _result = _slicedToArray(result, 2),
          referencedElement = _result[0],
          referencedPath = _result[1];
        if (resolveHistory.some(function (hist) {
          _newArrowCheck(this, _this8);
          return hist === referencedElement;
        }.bind(this))) {
          console.error("Circle reference found at: ".concat(vPath), resolveHistory);
          return 1; // break
        }
        elm = referencedElement;
        vPath = referencedPath;
        resolveHistory.push(elm);
      }
    };
    while (Object(_models_uiModels__WEBPACK_IMPORTED_MODULE_4__["isViewElementReference"])(elm)) {
      if (_loop4()) break;
    }
    acc[key] = Object.assign(Object.assign({}, elm), {
      id: key
    });
    return acc;
  }.bind(this), {});
  return view;
}.bind(undefined);
var _flattenViewElements = function flattenViewElements(defaultNS, parentPath, elements, views, currentPath) {
  var _this9 = this;
  _newArrowCheck(this, _this);
  if (!elements) return {};
  return Object.keys(elements).reduce(function (acc, cur) {
    var _this10 = this;
    _newArrowCheck(this, _this9);
    var elm = elements[cur];
    // remove the default namespace, and only the default namespace, sine it seems that this is also not in the restconf response
    var elmKey = defaultNS && elm.id.replace(new RegExp("^".concat(defaultNS, ":"), 'i'), '') || elm.id;
    var key = parentPath ? "".concat(parentPath, ".").concat(elmKey) : elmKey;
    if (Object(_models_uiModels__WEBPACK_IMPORTED_MODULE_4__["isViewElementRpc"])(elm)) {
      console.warn("Flatten of RFC not supported ! [".concat(currentPath, "][").concat(elm.label, "]"));
      return acc;
    } else if (Object(_models_uiModels__WEBPACK_IMPORTED_MODULE_4__["isViewElementObjectOrList"])(elm)) {
      var view = views[+elm.viewId];
      var inner = view && _flattenViewElements(defaultNS, key, view.elements, views, "".concat(currentPath, "/").concat(view.name));
      if (inner) {
        Object.keys(inner).forEach(function (k) {
          _newArrowCheck(this, _this10);
          return acc[k] = inner[k];
        }.bind(this));
      }
    } else if (Object(_models_uiModels__WEBPACK_IMPORTED_MODULE_4__["isViewElementChoice"])(elm)) {
      acc[key] = Object.assign(Object.assign({}, elm), {
        id: key,
        cases: Object.keys(elm.cases).reduce(function (accCases, curCases) {
          _newArrowCheck(this, _this10);
          var caseElement = elm.cases[curCases];
          accCases[curCases] = Object.assign(Object.assign({}, caseElement), {
            // Hint: do not use key it contains elmKey, which shell be omitted for cases.
            elements: _flattenViewElements(defaultNS, /*key*/parentPath, caseElement.elements, views, "".concat(currentPath, "/").concat(elm.label))
          });
          return accCases;
        }.bind(this), {})
      });
    } else {
      acc[key] = Object.assign(Object.assign({}, elm), {
        id: key
      });
    }
    return acc;
  }.bind(this), {});
}.bind(undefined);

var filterViewElements = function filterViewElements(vPath, viewData, viewSpecification) {
  _newArrowCheck(this, _this);
  return __awaiter(void 0, void 0, void 0, /*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
    var _this11 = this;
    return _regeneratorRuntime().wrap(function _callee4$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          return _context6.abrupt("return", Object.keys(viewSpecification.elements).reduce(function (accPromise, cur) {
            _newArrowCheck(this, _this11);
            return __awaiter(void 0, void 0, void 0, /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
              var _this12 = this;
              var acc, elm;
              return _regeneratorRuntime().wrap(function _callee3$(_context5) {
                while (1) switch (_context5.prev = _context5.next) {
                  case 0:
                    _context5.next = 2;
                    return accPromise;
                  case 2:
                    acc = _context5.sent;
                    elm = viewSpecification.elements[cur];
                    _context5.t0 = !elm.when;
                    if (_context5.t0) {
                      _context5.next = 9;
                      break;
                    }
                    _context5.next = 8;
                    return _evaluateWhen(vPath || '', elm.when, viewData).catch(function (ex) {
                      _newArrowCheck(this, _this12);
                      console.warn("Error evaluating when clause at: ".concat(viewSpecification.name, " for element: ").concat(cur), ex);
                      return true;
                    }.bind(this));
                  case 8:
                    _context5.t0 = _context5.sent;
                  case 9:
                    if (!_context5.t0) {
                      _context5.next = 11;
                      break;
                    }
                    acc.elements[cur] = elm;
                  case 11:
                    return _context5.abrupt("return", acc);
                  case 12:
                  case "end":
                    return _context5.stop();
                }
              }, _callee3, this);
            }));
          }.bind(this), Promise.resolve(Object.assign(Object.assign({}, viewSpecification), {
            elements: {}
          }))));
        case 1:
        case "end":
          return _context6.stop();
      }
    }, _callee4, this);
  }));
}.bind(undefined);

/***/ }),

/***/ "./views/configurationApplication.tsx":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConfigurationApplication", function() { return ConfigurationApplication; });
/* harmony import */ var regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../../node_modules/regenerator-runtime/runtime.js");
/* harmony import */ var regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_web_dom_iterable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../../node_modules/core-js/modules/web.dom.iterable.js");
/* harmony import */ var core_js_modules_web_dom_iterable__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_iterable__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("../../../node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var _mui_styles_withStyles__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("../../../node_modules/@mui/styles/withStyles/index.js");
/* harmony import */ var _mui_styles_createStyles__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("../../../node_modules/@mui/styles/createStyles/index.js");
/* harmony import */ var material_ui_confirm__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("../../../node_modules/material-ui-confirm/dist/material-ui-confirm.esm.js");
/* harmony import */ var _framework_src_flux_connect__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("../../../framework/src/flux/connect.tsx");
/* harmony import */ var _framework_src_components_material_table__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("../../../framework/src/components/material-table/index.tsx");
/* harmony import */ var _framework_src_components_material_ui_loader__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("../../../framework/src/components/material-ui/loader.tsx");
/* harmony import */ var _framework_src_components_objectDump__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("../../../framework/src/components/objectDump/index.tsx");
/* harmony import */ var _handlers_viewDescriptionHandler__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("./handlers/viewDescriptionHandler.ts");
/* harmony import */ var _actions_deviceActions__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("./actions/deviceActions.ts");
/* harmony import */ var _models_uiModels__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__("./models/uiModels.ts");
/* harmony import */ var _framework_src_services_restService__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__("../../../framework/src/services/restService.ts");
/* harmony import */ var _mui_material_Fab__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__("../../../node_modules/@mui/material/Fab/index.js");
/* harmony import */ var _mui_icons_material_Add__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__("../../../node_modules/@mui/icons-material/Add.js");
/* harmony import */ var _mui_icons_material_Add__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(_mui_icons_material_Add__WEBPACK_IMPORTED_MODULE_16__);
/* harmony import */ var _mui_icons_material_PostAdd__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__("../../../node_modules/@mui/icons-material/PostAdd.js");
/* harmony import */ var _mui_icons_material_PostAdd__WEBPACK_IMPORTED_MODULE_17___default = /*#__PURE__*/__webpack_require__.n(_mui_icons_material_PostAdd__WEBPACK_IMPORTED_MODULE_17__);
/* harmony import */ var _mui_icons_material_ArrowBack__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__("../../../node_modules/@mui/icons-material/ArrowBack.js");
/* harmony import */ var _mui_icons_material_ArrowBack__WEBPACK_IMPORTED_MODULE_18___default = /*#__PURE__*/__webpack_require__.n(_mui_icons_material_ArrowBack__WEBPACK_IMPORTED_MODULE_18__);
/* harmony import */ var _mui_icons_material_RemoveCircleOutline__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__("../../../node_modules/@mui/icons-material/RemoveCircleOutline.js");
/* harmony import */ var _mui_icons_material_RemoveCircleOutline__WEBPACK_IMPORTED_MODULE_19___default = /*#__PURE__*/__webpack_require__.n(_mui_icons_material_RemoveCircleOutline__WEBPACK_IMPORTED_MODULE_19__);
/* harmony import */ var _mui_icons_material_Save__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__("../../../node_modules/@mui/icons-material/Save.js");
/* harmony import */ var _mui_icons_material_Save__WEBPACK_IMPORTED_MODULE_20___default = /*#__PURE__*/__webpack_require__.n(_mui_icons_material_Save__WEBPACK_IMPORTED_MODULE_20__);
/* harmony import */ var _mui_icons_material_Edit__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__("../../../node_modules/@mui/icons-material/Edit.js");
/* harmony import */ var _mui_icons_material_Edit__WEBPACK_IMPORTED_MODULE_21___default = /*#__PURE__*/__webpack_require__.n(_mui_icons_material_Edit__WEBPACK_IMPORTED_MODULE_21__);
/* harmony import */ var _mui_material_Tooltip__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__("../../../node_modules/@mui/material/Tooltip/index.js");
/* harmony import */ var _mui_material_FormControl__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__("../../../node_modules/@mui/material/FormControl/index.js");
/* harmony import */ var _mui_material_IconButton__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__("../../../node_modules/@mui/material/IconButton/index.js");
/* harmony import */ var _mui_material_InputLabel__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__("../../../node_modules/@mui/material/InputLabel/index.js");
/* harmony import */ var _mui_material_Select__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__("../../../node_modules/@mui/material/Select/index.js");
/* harmony import */ var _mui_material_MenuItem__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__("../../../node_modules/@mui/material/MenuItem/index.js");
/* harmony import */ var _mui_material_Breadcrumbs__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__("../../../node_modules/@mui/material/Breadcrumbs/index.js");
/* harmony import */ var _mui_material_Button__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__("../../../node_modules/@mui/material/Button/index.js");
/* harmony import */ var _mui_material_Link__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__("../../../node_modules/@mui/material/Link/index.js");
/* harmony import */ var _mui_material_Accordion__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__("../../../node_modules/@mui/material/Accordion/index.js");
/* harmony import */ var _mui_material_AccordionSummary__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__("../../../node_modules/@mui/material/AccordionSummary/index.js");
/* harmony import */ var _mui_material_AccordionDetails__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__("../../../node_modules/@mui/material/AccordionDetails/index.js");
/* harmony import */ var _mui_material_Typography__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__("../../../node_modules/@mui/material/Typography/index.js");
/* harmony import */ var _mui_icons_material_ExpandMore__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__("../../../node_modules/@mui/icons-material/ExpandMore.js");
/* harmony import */ var _mui_icons_material_ExpandMore__WEBPACK_IMPORTED_MODULE_35___default = /*#__PURE__*/__webpack_require__.n(_mui_icons_material_ExpandMore__WEBPACK_IMPORTED_MODULE_35__);
/* harmony import */ var _components_uiElementReference__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__("./components/uiElementReference.tsx");
/* harmony import */ var _components_uiElementNumber__WEBPACK_IMPORTED_MODULE_37__ = __webpack_require__("./components/uiElementNumber.tsx");
/* harmony import */ var _components_uiElementString__WEBPACK_IMPORTED_MODULE_38__ = __webpack_require__("./components/uiElementString.tsx");
/* harmony import */ var _components_uiElementBoolean__WEBPACK_IMPORTED_MODULE_39__ = __webpack_require__("./components/uiElementBoolean.tsx");
/* harmony import */ var _components_uiElementSelection__WEBPACK_IMPORTED_MODULE_40__ = __webpack_require__("./components/uiElementSelection.tsx");
/* harmony import */ var _components_uiElementUnion__WEBPACK_IMPORTED_MODULE_41__ = __webpack_require__("./components/uiElementUnion.tsx");
/* harmony import */ var _components_uiElementLeafList__WEBPACK_IMPORTED_MODULE_42__ = __webpack_require__("./components/uiElementLeafList.tsx");
/* harmony import */ var _utilities_viewEngineHelper__WEBPACK_IMPORTED_MODULE_43__ = __webpack_require__("./utilities/viewEngineHelper.ts");
/* harmony import */ var react_loader_spinner__WEBPACK_IMPORTED_MODULE_44__ = __webpack_require__("../../../node_modules/react-loader-spinner/dist/module.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }


var _this = undefined;
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator.return && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, catch: function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
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
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
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











































var styles = function styles(theme) {
  _newArrowCheck(this, _this);
  return Object(_mui_styles_createStyles__WEBPACK_IMPORTED_MODULE_5__["default"])({
    header: {
      'display': 'flex',
      'justifyContent': 'space-between'
    },
    leftButton: {
      'justifyContent': 'left'
    },
    outer: {
      'flex': '1',
      'height': '100%',
      'display': 'flex',
      'alignItems': 'center',
      'justifyContent': 'center'
    },
    inner: {},
    container: {
      'height': '100%',
      'display': 'flex',
      'flexDirection': 'column'
    },
    'icon': {
      'marginRight': theme.spacing(0.5),
      'width': 20,
      'height': 20
    },
    'fab': {
      'margin': theme.spacing(1)
    },
    button: {
      margin: 0,
      padding: '6px 6px',
      minWidth: 'unset'
    },
    readOnly: {
      '& label.Mui-focused': {
        color: 'green'
      },
      '& .MuiInput-underline:after': {
        borderBottomColor: 'green'
      },
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: 'red'
        },
        '&:hover fieldset': {
          borderColor: 'yellow'
        },
        '&.Mui-focused fieldset': {
          borderColor: 'green'
        }
      }
    },
    uiView: {
      overflowY: 'auto'
    },
    section: {
      padding: '15px',
      borderBottom: "2px solid ".concat(theme.palette.divider)
    },
    viewElements: {
      width: 485,
      marginLeft: 20,
      marginRight: 20
    },
    verificationElements: {
      width: 485,
      marginLeft: 20,
      marginRight: 20
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular
    },
    moduleCollection: {
      marginTop: '16px',
      overflow: 'auto'
    },
    objectReult: {
      overflow: 'auto'
    }
  });
}.bind(undefined);
var mapProps = function mapProps(state) {
  _newArrowCheck(this, _this);
  return {
    collectingData: state.configuration.valueSelector.collectingData,
    listKeyProperty: state.configuration.valueSelector.keyProperty,
    listSpecification: state.configuration.valueSelector.listSpecification,
    listData: state.configuration.valueSelector.listData,
    vPath: state.configuration.viewDescription.vPath,
    nodeId: state.configuration.deviceDescription.nodeId,
    viewData: state.configuration.viewDescription.viewData,
    outputData: state.configuration.viewDescription.outputData,
    displaySpecification: state.configuration.viewDescription.displaySpecification
  };
}.bind(undefined);
var mapDispatch = function mapDispatch(dispatcher) {
  var _this2 = this;
  _newArrowCheck(this, _this);
  return {
    onValueSelected: function onValueSelected(value) {
      _newArrowCheck(this, _this2);
      return dispatcher.dispatch(new _actions_deviceActions__WEBPACK_IMPORTED_MODULE_12__["SetSelectedValue"](value));
    }.bind(this),
    onUpdateData: function onUpdateData(vPath, data) {
      _newArrowCheck(this, _this2);
      return dispatcher.dispatch(Object(_actions_deviceActions__WEBPACK_IMPORTED_MODULE_12__["updateDataActionAsyncCreator"])(vPath, data));
    }.bind(this),
    reloadView: function reloadView(vPath) {
      _newArrowCheck(this, _this2);
      return dispatcher.dispatch(Object(_actions_deviceActions__WEBPACK_IMPORTED_MODULE_12__["updateViewActionAsyncCreator"])(vPath));
    }.bind(this),
    removeElement: function removeElement(vPath) {
      _newArrowCheck(this, _this2);
      return dispatcher.dispatch(Object(_actions_deviceActions__WEBPACK_IMPORTED_MODULE_12__["removeElementActionAsyncCreator"])(vPath));
    }.bind(this),
    executeRpc: function executeRpc(vPath, data) {
      _newArrowCheck(this, _this2);
      return dispatcher.dispatch(Object(_actions_deviceActions__WEBPACK_IMPORTED_MODULE_12__["executeRpcActionAsyncCreator"])(vPath, data));
    }.bind(this)
  };
}.bind(undefined);
var SelectElementTable = _framework_src_components_material_table__WEBPACK_IMPORTED_MODULE_8__["default"];
var AccordionSummaryExt = function AccordionSummaryExt(props) {
  var _this3 = this;
  _newArrowCheck(this, _this);
  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_2__["useState"])(true),
    _useState2 = _slicedToArray(_useState, 2),
    disabled = _useState2[0],
    setDisabled = _useState2[1];
  var onMouseDown = function onMouseDown(ev) {
    _newArrowCheck(this, _this3);
    if (ev.button === 1) {
      setDisabled(!disabled);
      ev.preventDefault();
    }
  }.bind(this);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
    onMouseDown: onMouseDown
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_mui_material_AccordionSummary__WEBPACK_IMPORTED_MODULE_32__["default"], Object.assign(Object.assign({}, props), {
    disabled: props.disabled && disabled
  })));
}.bind(undefined);
var OldProps = Symbol('OldProps');
var ConfigurationApplicationComponent = /*#__PURE__*/function (_React$Component) {
  /**
   *
   */
  function ConfigurationApplicationComponent(props) {
    var _this5 = this;
    var _this4;
    _classCallCheck(this, ConfigurationApplicationComponent);
    _this4 = _callSuper(this, ConfigurationApplicationComponent, [props]);
    _this4.navigate = function (path) {
      _newArrowCheck(this, _this5);
      _this4.props.history.push("".concat(_this4.props.match.url).concat(path));
    }.bind(this);
    _this4.changeValueFor = function (property, value) {
      _newArrowCheck(this, _this5);
      _this4.setState({
        viewData: Object.assign(Object.assign({}, _this4.state.viewData), _defineProperty({}, property, value))
      });
    }.bind(this);
    _this4.collectData = function (elements) {
      var _this6 = this;
      _newArrowCheck(this, _this5);
      // ensure only active choices will be contained
      var viewData = Object.assign({}, _this4.state.viewData);
      var choiceKeys = Object.keys(elements).filter(function (elmKey) {
        _newArrowCheck(this, _this6);
        return Object(_models_uiModels__WEBPACK_IMPORTED_MODULE_13__["isViewElementChoice"])(elements[elmKey]);
      }.bind(this));
      var elementsToRemove = choiceKeys.reduce(function (acc, curChoiceKey) {
        var _this7 = this;
        _newArrowCheck(this, _this6);
        var currentChoice = elements[curChoiceKey];
        var selectedCase = _this4.state.choices[curChoiceKey].selectedCase;
        Object.keys(currentChoice.cases).forEach(function (caseKey) {
          var _this8 = this;
          _newArrowCheck(this, _this7);
          var caseElements = currentChoice.cases[caseKey].elements;
          if (caseKey === selectedCase) {
            Object.keys(caseElements).forEach(function (caseElementKey) {
              _newArrowCheck(this, _this8);
              var elm = caseElements[caseElementKey];
              if (Object(_models_uiModels__WEBPACK_IMPORTED_MODULE_13__["isViewElementEmpty"])(elm)) {
                // insert null for all empty elements
                viewData[elm.id] = null;
              }
            }.bind(this));
            return;
          }
          Object.keys(caseElements).forEach(function (caseElementKey) {
            _newArrowCheck(this, _this8);
            acc.push(caseElements[caseElementKey]);
          }.bind(this));
        }.bind(this));
        return acc;
      }.bind(this), []);
      return viewData && Object.keys(viewData).reduce(function (acc, cur) {
        var _this9 = this;
        _newArrowCheck(this, _this6);
        if (!elementsToRemove.some(function (elm) {
          _newArrowCheck(this, _this9);
          return elm.label === cur || elm.id === cur;
        }.bind(this))) {
          acc[cur] = viewData[cur];
        }
        return acc;
      }.bind(this), {});
    }.bind(this);
    _this4.isPolicyViewElementForbidden = function (element, dataPath) {
      _newArrowCheck(this, _this5);
      var policy = Object(_framework_src_services_restService__WEBPACK_IMPORTED_MODULE_14__["getAccessPolicyByUrl"])("".concat(dataPath, "/").concat(element.id));
      return !(policy.GET && policy.POST);
    }.bind(this);
    _this4.isPolicyModuleForbidden = function (moduleName, dataPath) {
      _newArrowCheck(this, _this5);
      var policy = Object(_framework_src_services_restService__WEBPACK_IMPORTED_MODULE_14__["getAccessPolicyByUrl"])("".concat(dataPath, "/").concat(moduleName));
      return !(policy.GET && policy.POST);
    }.bind(this);
    _this4.getEditorForViewElement = function (uiElement) {
      _newArrowCheck(this, _this5);
      if (Object(_models_uiModels__WEBPACK_IMPORTED_MODULE_13__["isViewElementEmpty"])(uiElement)) {
        return null;
      } else if (Object(_models_uiModels__WEBPACK_IMPORTED_MODULE_13__["isViewElementSelection"])(uiElement)) {
        return _components_uiElementSelection__WEBPACK_IMPORTED_MODULE_40__["UiElementSelection"];
      } else if (Object(_models_uiModels__WEBPACK_IMPORTED_MODULE_13__["isViewElementBoolean"])(uiElement)) {
        return _components_uiElementBoolean__WEBPACK_IMPORTED_MODULE_39__["UiElementBoolean"];
      } else if (Object(_models_uiModels__WEBPACK_IMPORTED_MODULE_13__["isViewElementString"])(uiElement)) {
        return _components_uiElementString__WEBPACK_IMPORTED_MODULE_38__["UiElementString"];
      } else if (Object(_models_uiModels__WEBPACK_IMPORTED_MODULE_13__["isViewElementDate"])(uiElement)) {
        return _components_uiElementString__WEBPACK_IMPORTED_MODULE_38__["UiElementString"];
      } else if (Object(_models_uiModels__WEBPACK_IMPORTED_MODULE_13__["isViewElementNumber"])(uiElement)) {
        return _components_uiElementNumber__WEBPACK_IMPORTED_MODULE_37__["UiElementNumber"];
      } else if (Object(_models_uiModels__WEBPACK_IMPORTED_MODULE_13__["isViewElementUnion"])(uiElement)) {
        return _components_uiElementUnion__WEBPACK_IMPORTED_MODULE_41__["UIElementUnion"];
      } else {
        if (true) {
          console.error("Unknown element type - ".concat(uiElement.uiType, " in ").concat(uiElement.id, "."));
        }
        return null;
      }
    }.bind(this);
    _this4.renderUIElement = function (uiElement, viewData, keyProperty, editMode, isNew) {
      var _this10 = this;
      _newArrowCheck(this, _this5);
      var isKey = uiElement.label === keyProperty;
      var canEdit = editMode && (isNew || uiElement.config && !isKey);
      // do not show elements w/o any value from the backend
      if (viewData[uiElement.id] == null && !editMode) {
        return null;
      } else if (Object(_models_uiModels__WEBPACK_IMPORTED_MODULE_13__["isViewElementEmpty"])(uiElement)) {
        return null;
      } else if (uiElement.isList) {
        /* element is a leaf-list */
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_components_uiElementLeafList__WEBPACK_IMPORTED_MODULE_42__["UiElementLeafList"], {
          key: uiElement.id,
          inputValue: viewData[uiElement.id] == null ? [] : viewData[uiElement.id],
          value: uiElement,
          readOnly: !canEdit,
          disabled: editMode && !canEdit,
          onChange: function (e) {
            _newArrowCheck(this, _this10);
            _this4.changeValueFor(uiElement.id, e);
          }.bind(this),
          getEditorForViewElement: _this4.getEditorForViewElement
        });
      } else {
        var Element = _this4.getEditorForViewElement(uiElement);
        return Element != null ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(Element, {
          key: uiElement.id,
          isKey: isKey,
          inputValue: viewData[uiElement.id] == null ? '' : viewData[uiElement.id],
          value: uiElement,
          readOnly: !canEdit,
          disabled: editMode && !canEdit,
          onChange: function (e) {
            _newArrowCheck(this, _this10);
            _this4.changeValueFor(uiElement.id, e);
          }.bind(this)
        }) : null;
      }
    }.bind(this);
    // private renderUIReference = (uiElement: ViewElement, viewData: { [key: string]: any }, keyProperty: string | undefined, editMode: boolean, isNew: boolean) => {
    //   const isKey = (uiElement.label === keyProperty);
    //   const canEdit = editMode && (isNew || (uiElement.config && !isKey));
    //   if (isViewElementObjectOrList(uiElement)) {
    //     return (
    //       <FormControl key={uiElement.id} style={{ width: 485, marginLeft: 20, marginRight: 20 }}>
    //         <Tooltip title={uiElement.description || ''}>
    //           <Button className={this.props.classes.leftButton} color="secondary" disabled={this.state.editMode} onClick={() => {
    //             this.navigate(`/${uiElement.id}`);
    //           }}>{uiElement.label}</Button>
    //         </Tooltip>
    //       </FormControl>
    //     );
    //   } else {
    //     if (process.env.NODE_ENV !== "production") {
    //       console.error(`Unknown reference type - ${(uiElement as any).uiType} in ${(uiElement as any).id}.`)
    //     }
    //     return null;
    //   }
    // };
    _this4.renderUIChoice = function (uiElement, viewData, keyProperty, editMode, isNew) {
      var _this11 = this;
      _newArrowCheck(this, _this5);
      var isKey = uiElement.label === keyProperty;
      var currentChoice = _this4.state.choices[uiElement.id];
      var currentCase = currentChoice && uiElement.cases[currentChoice.selectedCase];
      var canEdit = editMode && (isNew || uiElement.config && !isKey);
      if (Object(_models_uiModels__WEBPACK_IMPORTED_MODULE_13__["isViewElementChoice"])(uiElement)) {
        var subElements = currentCase === null || currentCase === void 0 ? void 0 : currentCase.elements;
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_2___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_mui_material_FormControl__WEBPACK_IMPORTED_MODULE_23__["default"], {
          variant: "standard",
          key: uiElement.id,
          style: {
            width: 485,
            marginLeft: 20,
            marginRight: 20
          }
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_mui_material_InputLabel__WEBPACK_IMPORTED_MODULE_25__["default"], {
          htmlFor: "select-".concat(uiElement.id)
        }, uiElement.label), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_mui_material_Select__WEBPACK_IMPORTED_MODULE_26__["default"], {
          variant: "standard",
          "aria-label": uiElement.label + '-selection',
          required: !!uiElement.mandatory,
          onChange: function (e) {
            _newArrowCheck(this, _this11);
            if (currentChoice.selectedCase === e.target.value) {
              return; // nothing changed
            }
            _this4.setState({
              choices: Object.assign(Object.assign({}, _this4.state.choices), _defineProperty({}, uiElement.id, Object.assign(Object.assign({}, _this4.state.choices[uiElement.id]), {
                selectedCase: e.target.value
              })))
            });
          }.bind(this),
          readOnly: !canEdit,
          disabled: editMode && !canEdit,
          value: _this4.state.choices[uiElement.id].selectedCase,
          inputProps: {
            name: uiElement.id,
            id: "select-".concat(uiElement.id)
          }
        }, Object.keys(uiElement.cases).map(function (caseKey) {
          _newArrowCheck(this, _this11);
          var caseElm = uiElement.cases[caseKey];
          return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_mui_material_MenuItem__WEBPACK_IMPORTED_MODULE_27__["default"], {
            key: caseElm.id,
            value: caseKey,
            "aria-label": caseKey
          }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_mui_material_Tooltip__WEBPACK_IMPORTED_MODULE_22__["default"], {
            title: caseElm.description || ''
          }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
            style: {
              width: '100%'
            }
          }, caseElm.label)));
        }.bind(this)))), subElements ? Object.keys(subElements).map(function (elmKey) {
          _newArrowCheck(this, _this11);
          var elm = subElements[elmKey];
          return _this4.renderUIElement(elm, viewData, keyProperty, editMode, isNew);
        }.bind(this)) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("h3", null, "Invalid Choice"));
      } else {
        if (true) {
          console.error("Unknown type - ".concat(uiElement.uiType, " in ").concat(uiElement.id, "."));
        }
        return null;
      }
    }.bind(this);
    _this4.renderUIView = function (viewSpecification, dataPath, viewData, keyProperty, editMode, isNew) {
      var _this12 = this;
      _newArrowCheck(this, _this5);
      var classes = _this4.props.classes;
      var orderFunc = function orderFunc(vsA, vsB) {
        _newArrowCheck(this, _this12);
        if (keyProperty) {
          // if (vsA.label === vsB.label) return 0;
          if (vsA.label === keyProperty) return -1;
          if (vsB.label === keyProperty) return +1;
        }
        // if (vsA.uiType === vsB.uiType) return 0;
        // if (vsA.uiType !== "object" && vsB.uiType !== "object") return 0;
        // if (vsA.uiType === "object") return +1;
        return -1;
      }.bind(this);
      var sections = Object.keys(viewSpecification.elements).reduce(function (acc, cur) {
        _newArrowCheck(this, _this12);
        var elm = viewSpecification.elements[cur];
        if (Object(_models_uiModels__WEBPACK_IMPORTED_MODULE_13__["isViewElementObjectOrList"])(elm)) {
          acc.references.push(elm);
        } else if (Object(_models_uiModels__WEBPACK_IMPORTED_MODULE_13__["isViewElementChoice"])(elm)) {
          acc.choices.push(elm);
        } else if (Object(_models_uiModels__WEBPACK_IMPORTED_MODULE_13__["isViewElementRpc"])(elm)) {
          acc.rpcs.push(elm);
        } else {
          acc.elements.push(elm);
        }
        return acc;
      }.bind(this), {
        elements: [],
        references: [],
        choices: [],
        rpcs: []
      });
      sections.elements = sections.elements.sort(orderFunc);
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
        className: classes.uiView
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
        className: classes.section
      }), sections.elements.length > 0 ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
        className: classes.section
      }, sections.elements.map(function (element) {
        _newArrowCheck(this, _this12);
        return _this4.renderUIElement(element, viewData, keyProperty, editMode, isNew);
      }.bind(this))) : null, sections.references.length > 0 ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
        className: classes.section
      }, sections.references.map(function (element) {
        var _this13 = this;
        _newArrowCheck(this, _this12);
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_components_uiElementReference__WEBPACK_IMPORTED_MODULE_36__["UIElementReference"], {
          key: element.id,
          element: element,
          disabled: editMode || _this4.isPolicyViewElementForbidden(element, dataPath),
          onOpenReference: function (elm) {
            _newArrowCheck(this, _this13);
            _this4.navigate("/".concat(elm.id));
          }.bind(this)
        });
      }.bind(this))) : null, sections.choices.length > 0 ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
        className: classes.section
      }, sections.choices.map(function (element) {
        _newArrowCheck(this, _this12);
        return _this4.renderUIChoice(element, viewData, keyProperty, editMode, isNew);
      }.bind(this))) : null, sections.rpcs.length > 0 ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
        className: classes.section
      }, sections.rpcs.map(function (element) {
        var _this14 = this;
        _newArrowCheck(this, _this12);
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_components_uiElementReference__WEBPACK_IMPORTED_MODULE_36__["UIElementReference"], {
          key: element.id,
          element: element,
          disabled: editMode || _this4.isPolicyViewElementForbidden(element, dataPath),
          onOpenReference: function (elm) {
            _newArrowCheck(this, _this14);
            _this4.navigate("/".concat(elm.id));
          }.bind(this)
        });
      }.bind(this))) : null);
    }.bind(this);
    _this4.renderUIViewSelector = function (viewSpecification, dataPath, viewData, keyProperty, editMode, isNew) {
      var _this15 = this;
      _newArrowCheck(this, _this5);
      var classes = _this4.props.classes;
      {
        _this4.renderCollectingData2();
      }
      // group by module name
      var modules = Object.keys(viewSpecification.elements).reduce(function (acc, cur) {
        _newArrowCheck(this, _this15);
        var elm = viewSpecification.elements[cur];
        var moduleView = acc[elm.module] = acc[elm.module] || Object.assign(Object.assign({}, viewSpecification), {
          elements: {}
        });
        moduleView.elements[cur] = elm;
        return acc;
      }.bind(this), {});
      var moduleKeys = Object.keys(modules).sort();
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
        className: classes.moduleCollection
      }, moduleKeys.map(function (key) {
        _newArrowCheck(this, _this15);
        var moduleView = modules[key];
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_mui_material_Accordion__WEBPACK_IMPORTED_MODULE_31__["default"], {
          key: key,
          defaultExpanded: moduleKeys.length < 4,
          "aria-label": key + '-panel'
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(AccordionSummaryExt, {
          expandIcon: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_mui_icons_material_ExpandMore__WEBPACK_IMPORTED_MODULE_35___default.a, null),
          "aria-controls": "content-".concat(key),
          id: "header-".concat(key),
          disabled: _this4.isPolicyModuleForbidden("".concat(key, ":"), dataPath)
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_mui_material_Typography__WEBPACK_IMPORTED_MODULE_34__["default"], {
          className: classes.heading
        }, key)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_mui_material_AccordionDetails__WEBPACK_IMPORTED_MODULE_33__["default"], null, _this4.renderUIView(moduleView, dataPath, viewData, keyProperty, editMode, isNew)));
      }.bind(this)));
    }.bind(this);
    _this4.state = {
      isNew: false,
      canEdit: false,
      editMode: false,
      viewData: null,
      choices: {}
    };
    return _this4;
  }
  _inherits(ConfigurationApplicationComponent, _React$Component);
  return _createClass(ConfigurationApplicationComponent, [{
    key: "renderUIViewList",
    value: function renderUIViewList(listSpecification, dataPath, listKeyProperty, apiDocPath, listData) {
      var _this16 = this;
      // { this.renderCollectingData2()}
      var listElements = listSpecification.elements;
      var apiDocPathCreate = apiDocPath ? "".concat(location.origin).concat(apiDocPath.replace('$$$standard$$$', 'topology-netconfnode%20resources%20-%20RestConf%20RFC%208040').replace('$$$action$$$', 'put')).concat(listKeyProperty ? "_".concat(listKeyProperty.replace(/[\/=\-\:]/g, '_'), "_") : '') : undefined;
      var config = listSpecification.config && listKeyProperty; // We can not configure a list with no key.
      var navigate = function navigate(path) {
        _newArrowCheck(this, _this16);
        this.props.history.push("".concat(this.props.match.url).concat(path));
      }.bind(this);
      var addNewElementAction = {
        icon: _mui_icons_material_Add__WEBPACK_IMPORTED_MODULE_16___default.a,
        tooltip: 'Add',
        ariaLabel: 'add-element',
        onClick: function onClick() {
          _newArrowCheck(this, _this16);
          navigate('[]'); // empty key means new element
        }.bind(this),
        disabled: !config
      };
      var addWithApiDocElementAction = {
        icon: _mui_icons_material_PostAdd__WEBPACK_IMPORTED_MODULE_17___default.a,
        tooltip: 'Add',
        ariaLabel: 'add-element-via-api-doc',
        onClick: function onClick() {
          _newArrowCheck(this, _this16);
          window.open(apiDocPathCreate, '_blank');
        }.bind(this),
        disabled: !config
      };
      var _this$props = this.props,
        classes = _this$props.classes,
        removeElement = _this$props.removeElement;
      var DeleteIconWithConfirmation = function DeleteIconWithConfirmation(props) {
        var _this17 = this;
        _newArrowCheck(this, _this16);
        var confirm = Object(material_ui_confirm__WEBPACK_IMPORTED_MODULE_6__["useConfirm"])();
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_mui_material_Tooltip__WEBPACK_IMPORTED_MODULE_22__["default"], {
          disableInteractive: true,
          title: 'Remove'
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_mui_material_IconButton__WEBPACK_IMPORTED_MODULE_24__["default"], {
          disabled: props.disabled,
          className: classes.button,
          "aria-label": "remove-element-button",
          onClick: function (e) {
            _newArrowCheck(this, _this17);
            return __awaiter(this, void 0, void 0, /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
              var _this18 = this;
              return _regeneratorRuntime().wrap(function _callee$(_context) {
                while (1) switch (_context.prev = _context.next) {
                  case 0:
                    e.stopPropagation();
                    e.preventDefault();
                    confirm({
                      title: 'Do you really want to delete this element ?',
                      description: 'This action is permanent!',
                      confirmationButtonProps: {
                        color: 'secondary'
                      },
                      cancellationButtonProps: {
                        color: 'inherit'
                      }
                    }).then(function () {
                      var _this19 = this;
                      _newArrowCheck(this, _this18);
                      var keyId = '';
                      if (listKeyProperty && listKeyProperty.split(' ').length > 1) {
                        keyId += listKeyProperty.split(' ').map(function (id) {
                          _newArrowCheck(this, _this19);
                          return props.rowData[id];
                        }.bind(this)).join(',');
                      } else {
                        keyId = props.rowData[listKeyProperty];
                      }
                      return removeElement("".concat(this.props.vPath, "[").concat(keyId, "]"));
                    }.bind(this)).then(props.onReload);
                  case 3:
                  case "end":
                    return _context.stop();
                }
              }, _callee, this);
            }));
          }.bind(this),
          size: "large"
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_mui_icons_material_RemoveCircleOutline__WEBPACK_IMPORTED_MODULE_19___default.a, null)));
      }.bind(this);
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(SelectElementTable, {
        stickyHeader: true,
        idProperty: listKeyProperty,
        tableId: null,
        rows: listData,
        customActionButtons: apiDocPathCreate ? [addNewElementAction, addWithApiDocElementAction] : [addNewElementAction],
        columns: Object.keys(listElements).reduce(function (acc, cur) {
          var _this20 = this;
          _newArrowCheck(this, _this16);
          var elm = listElements[cur];
          if (elm.uiType !== 'object' && listData.every(function (entry) {
            _newArrowCheck(this, _this20);
            return entry[elm.label] != null;
          }.bind(this))) {
            if (elm.label !== listKeyProperty) {
              acc.push(elm.uiType === 'boolean' ? {
                property: elm.label,
                type: _framework_src_components_material_table__WEBPACK_IMPORTED_MODULE_8__["ColumnType"].boolean
              } : elm.uiType === 'date' ? {
                property: elm.label,
                type: _framework_src_components_material_table__WEBPACK_IMPORTED_MODULE_8__["ColumnType"].date
              } : {
                property: elm.label,
                type: elm.uiType === 'number' ? _framework_src_components_material_table__WEBPACK_IMPORTED_MODULE_8__["ColumnType"].numeric : _framework_src_components_material_table__WEBPACK_IMPORTED_MODULE_8__["ColumnType"].text
              });
            } else {
              acc.unshift(elm.uiType === 'boolean' ? {
                property: elm.label,
                type: _framework_src_components_material_table__WEBPACK_IMPORTED_MODULE_8__["ColumnType"].boolean
              } : elm.uiType === 'date' ? {
                property: elm.label,
                type: _framework_src_components_material_table__WEBPACK_IMPORTED_MODULE_8__["ColumnType"].date
              } : {
                property: elm.label,
                type: elm.uiType === 'number' ? _framework_src_components_material_table__WEBPACK_IMPORTED_MODULE_8__["ColumnType"].numeric : _framework_src_components_material_table__WEBPACK_IMPORTED_MODULE_8__["ColumnType"].text
              });
            }
          }
          return acc;
        }.bind(this), []).concat([{
          property: 'Actions',
          disableFilter: true,
          disableSorting: true,
          type: _framework_src_components_material_table__WEBPACK_IMPORTED_MODULE_8__["ColumnType"].custom,
          customControl: function customControl(_ref) {
            var _this21 = this;
            var rowData = _ref.rowData;
            _newArrowCheck(this, _this16);
            return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(DeleteIconWithConfirmation, {
              disabled: !config,
              rowData: rowData,
              onReload: function () {
                _newArrowCheck(this, _this21);
                return this.props.vPath && this.props.reloadView(this.props.vPath);
              }.bind(this)
            });
          }.bind(this)
        }]),
        onHandleClick: function (ev, row) {
          var _this22 = this;
          _newArrowCheck(this, _this16);
          ev.preventDefault();
          var keyId = '';
          if (listKeyProperty && listKeyProperty.split(' ').length > 1) {
            keyId += listKeyProperty.split(' ').map(function (id) {
              _newArrowCheck(this, _this22);
              return row[id];
            }.bind(this)).join(',');
          } else {
            keyId = row[listKeyProperty];
          }
          if (listKeyProperty) {
            navigate("[".concat(encodeURIComponent(keyId), "]")); // Do not navigate without key.
          }
        }.bind(this)
      });
    }
  }, {
    key: "renderUIViewRPC",
    value: function renderUIViewRPC(inputViewSpecification, dataPath, inputViewData, outputViewData, keyProperty, editMode, isNew) {
      var _this23 = this;
      var classes = this.props.classes;
      //{ this.renderCollectingData2()}
      var orderFunc = function orderFunc(vsA, vsB) {
        _newArrowCheck(this, _this23);
        if (keyProperty) {
          // if (vsA.label === vsB.label) return 0;
          if (vsA.label === keyProperty) return -1;
          if (vsB.label === keyProperty) return +1;
        }
        // if (vsA.uiType === vsB.uiType) return 0;
        // if (vsA.uiType !== "object" && vsB.uiType !== "object") return 0;
        // if (vsA.uiType === "object") return +1;
        return -1;
      }.bind(this);
      var sections = inputViewSpecification && Object.keys(inputViewSpecification.elements).reduce(function (acc, cur) {
        _newArrowCheck(this, _this23);
        var elm = inputViewSpecification.elements[cur];
        if (Object(_models_uiModels__WEBPACK_IMPORTED_MODULE_13__["isViewElementObjectOrList"])(elm)) {
          console.error('Object should not appear in RPC view !');
        } else if (Object(_models_uiModels__WEBPACK_IMPORTED_MODULE_13__["isViewElementChoice"])(elm)) {
          acc.choices.push(elm);
        } else if (Object(_models_uiModels__WEBPACK_IMPORTED_MODULE_13__["isViewElementRpc"])(elm)) {
          console.error('RPC should not appear in RPC view !');
        } else {
          acc.elements.push(elm);
        }
        return acc;
      }.bind(this), {
        elements: [],
        references: [],
        choices: [],
        rpcs: []
      }) || {
        elements: [],
        references: [],
        choices: [],
        rpcs: []
      };
      sections.elements = sections.elements.sort(orderFunc);
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_2___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
        className: classes.section
      }), sections.elements.length > 0 ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
        className: classes.section
      }, sections.elements.map(function (element) {
        _newArrowCheck(this, _this23);
        return this.renderUIElement(element, inputViewData, keyProperty, editMode, isNew);
      }.bind(this))) : null, sections.choices.length > 0 ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
        className: classes.section
      }, sections.choices.map(function (element) {
        _newArrowCheck(this, _this23);
        return this.renderUIChoice(element, inputViewData, keyProperty, editMode, isNew);
      }.bind(this))) : null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_mui_material_Button__WEBPACK_IMPORTED_MODULE_29__["default"], {
        color: "inherit",
        onClick: function () {
          _newArrowCheck(this, _this23);
          var resultingViewData = inputViewSpecification && this.collectData(inputViewSpecification.elements);
          this.props.executeRpc(this.props.vPath, resultingViewData);
        }.bind(this)
      }, "Exec"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
        className: classes.objectReult
      }, outputViewData !== undefined ? Object(_framework_src_components_objectDump__WEBPACK_IMPORTED_MODULE_10__["renderObject"])(outputViewData) : null));
    }
  }, {
    key: "renderBreadCrumps",
    value: function renderBreadCrumps() {
      var _this24 = this;
      var editMode = this.state.editMode;
      var _this$props2 = this.props,
        displaySpecification = _this$props2.displaySpecification,
        vPath = _this$props2.vPath,
        nodeId = _this$props2.nodeId;
      var pathParts = Object(_utilities_viewEngineHelper__WEBPACK_IMPORTED_MODULE_43__["splitVPath"])(vPath, /(?:([^\/\["]+)(?:\[([^\]]*)\])?)/g); // 1 = property / 2 = optional key
      var lastPath = '/configuration';
      var basePath = "/configuration/".concat(nodeId);
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
        className: this.props.classes.header
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_mui_material_Breadcrumbs__WEBPACK_IMPORTED_MODULE_28__["default"], {
        "aria-label": "breadcrumbs"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_mui_material_Link__WEBPACK_IMPORTED_MODULE_30__["default"], {
        underline: "hover",
        color: "inherit",
        href: "#",
        "aria-label": "back-breadcrumb",
        onClick: function (ev) {
          _newArrowCheck(this, _this24);
          ev.preventDefault();
          this.props.history.push(lastPath);
        }.bind(this)
      }, "Back"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_mui_material_Link__WEBPACK_IMPORTED_MODULE_30__["default"], {
        underline: "hover",
        color: "inherit",
        href: "#",
        "aria-label": nodeId + '-breadcrumb',
        onClick: function (ev) {
          _newArrowCheck(this, _this24);
          ev.preventDefault();
          this.props.history.push("/configuration/".concat(nodeId));
        }.bind(this)
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("span", null, nodeId)), pathParts.map(function (_ref2, ind) {
        var _this25 = this;
        var _ref3 = _slicedToArray(_ref2, 2),
          prop = _ref3[0],
          key = _ref3[1];
        _newArrowCheck(this, _this24);
        var path = "".concat(basePath, "/").concat(prop);
        var keyPath = key && "".concat(basePath, "/").concat(prop, "[").concat(key, "]");
        var propTitle = prop.replace(/^[^:]+:/, '');
        var ret = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("span", {
          key: ind
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_mui_material_Link__WEBPACK_IMPORTED_MODULE_30__["default"], {
          underline: "hover",
          color: "inherit",
          href: "#",
          "aria-label": propTitle + '-breadcrumb',
          onClick: function (ev) {
            _newArrowCheck(this, _this25);
            ev.preventDefault();
            this.props.history.push(path);
          }.bind(this)
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("span", null, propTitle)), keyPath && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_mui_material_Link__WEBPACK_IMPORTED_MODULE_30__["default"], {
          underline: "hover",
          color: "inherit",
          href: "#",
          "aria-label": key + '-breadcrumb',
          onClick: function (ev) {
            _newArrowCheck(this, _this25);
            ev.preventDefault();
            this.props.history.push(keyPath);
          }.bind(this)
        }, "[".concat(key && key.replace(/\%2C/g, ','), "]")) || null);
        lastPath = basePath;
        basePath = keyPath || path;
        return ret;
      }.bind(this)))), this.state.editMode && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_mui_material_Fab__WEBPACK_IMPORTED_MODULE_15__["default"], {
        color: "secondary",
        "aria-label": "back-button",
        className: this.props.classes.fab,
        onClick: function () {
          _newArrowCheck(this, _this24);
          return __awaiter(this, void 0, void 0, /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
            return _regeneratorRuntime().wrap(function _callee2$(_context2) {
              while (1) switch (_context2.prev = _context2.next) {
                case 0:
                  if (!this.props.vPath) {
                    _context2.next = 3;
                    break;
                  }
                  _context2.next = 3;
                  return this.props.reloadView(this.props.vPath);
                case 3:
                  this.setState({
                    editMode: false
                  });
                case 4:
                case "end":
                  return _context2.stop();
              }
            }, _callee2, this);
          }));
        }.bind(this)
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_mui_icons_material_ArrowBack__WEBPACK_IMPORTED_MODULE_18___default.a, null)) || null, /* do not show edit if this is a list or it can't be edited */displaySpecification.displayMode === _handlers_viewDescriptionHandler__WEBPACK_IMPORTED_MODULE_11__["DisplayModeType"].displayAsObject && displaySpecification.viewSpecification.canEdit && ( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_mui_material_Fab__WEBPACK_IMPORTED_MODULE_15__["default"], {
        color: "secondary",
        "aria-label": editMode ? 'save-button' : 'edit-button',
        className: this.props.classes.fab,
        onClick: function () {
          _newArrowCheck(this, _this24);
          if (this.state.editMode) {
            // ensure only active choices will be contained
            var resultingViewData = this.collectData(displaySpecification.viewSpecification.elements);
            this.props.onUpdateData(this.props.vPath, resultingViewData);
          }
          this.setState({
            editMode: !editMode
          });
        }.bind(this)
      }, editMode ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_mui_icons_material_Save__WEBPACK_IMPORTED_MODULE_20___default.a, null) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_mui_icons_material_Edit__WEBPACK_IMPORTED_MODULE_21___default.a, null))) || null));
    }
  }, {
    key: "renderValueSelector",
    value: function renderValueSelector() {
      var _this26 = this;
      var _this$props3 = this.props,
        listKeyProperty = _this$props3.listKeyProperty,
        listSpecification = _this$props3.listSpecification,
        listData = _this$props3.listData,
        onValueSelected = _this$props3.onValueSelected;
      if (!listKeyProperty || !listSpecification) {
        throw new Error('ListKex ot view not specified.');
      }
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
        className: this.props.classes.container
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(SelectElementTable, {
        stickyHeader: true,
        idProperty: listKeyProperty,
        tableId: null,
        rows: listData,
        columns: Object.keys(listSpecification.elements).reduce(function (acc, cur) {
          var _this27 = this;
          _newArrowCheck(this, _this26);
          var elm = listSpecification.elements[cur];
          if (elm.uiType !== 'object' && listData.every(function (entry) {
            _newArrowCheck(this, _this27);
            return entry[elm.label] != null;
          }.bind(this))) {
            if (elm.label !== listKeyProperty) {
              acc.push({
                property: elm.label,
                type: elm.uiType === 'number' ? _framework_src_components_material_table__WEBPACK_IMPORTED_MODULE_8__["ColumnType"].numeric : _framework_src_components_material_table__WEBPACK_IMPORTED_MODULE_8__["ColumnType"].text
              });
            } else {
              acc.unshift({
                property: elm.label,
                type: elm.uiType === 'number' ? _framework_src_components_material_table__WEBPACK_IMPORTED_MODULE_8__["ColumnType"].numeric : _framework_src_components_material_table__WEBPACK_IMPORTED_MODULE_8__["ColumnType"].text
              });
            }
          }
          return acc;
        }.bind(this), []),
        onHandleClick: function (ev, row) {
          _newArrowCheck(this, _this26);
          ev.preventDefault();
          onValueSelected(row);
        }.bind(this)
      }));
    }
  }, {
    key: "renderValueEditor",
    value: function renderValueEditor() {
      var _this$props4 = this.props,
        ds = _this$props4.displaySpecification,
        outputData = _this$props4.outputData;
      var _this$state = this.state,
        viewData = _this$state.viewData,
        editMode = _this$state.editMode,
        isNew = _this$state.isNew;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
        className: this.props.classes.container
      }, this.renderBreadCrumps(), ds.displayMode === _handlers_viewDescriptionHandler__WEBPACK_IMPORTED_MODULE_11__["DisplayModeType"].doNotDisplay ? null : ds.displayMode === _handlers_viewDescriptionHandler__WEBPACK_IMPORTED_MODULE_11__["DisplayModeType"].displayAsList && viewData instanceof Array ? this.renderUIViewList(ds.viewSpecification, ds.dataPath, ds.keyProperty, ds.apidocPath, viewData) : ds.displayMode === _handlers_viewDescriptionHandler__WEBPACK_IMPORTED_MODULE_11__["DisplayModeType"].displayAsRPC ? this.renderUIViewRPC(ds.inputViewSpecification, ds.dataPath, viewData, outputData, undefined, true, false) : ds.displayMode === _handlers_viewDescriptionHandler__WEBPACK_IMPORTED_MODULE_11__["DisplayModeType"].displayAsMessage ? this.renderMessage(ds.renderMessage) : this.renderUIViewSelector(ds.viewSpecification, ds.dataPath, viewData, ds.keyProperty, editMode, isNew));
    }
  }, {
    key: "renderMessage",
    value: function renderMessage(_renderMessage) {
      //{ this.renderCollectingData2()}
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
        className: this.props.classes.container
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("h4", null, _renderMessage));
    }
  }, {
    key: "renderCollectingData",
    value: function renderCollectingData() {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
        className: this.props.classes.outer
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
        className: this.props.classes.inner
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_framework_src_components_material_ui_loader__WEBPACK_IMPORTED_MODULE_9__["Loader"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react_loader_spinner__WEBPACK_IMPORTED_MODULE_44__["ThreeCircles"], {
        visible: true,
        height: "100",
        width: "100",
        color: "grey",
        ariaLabel: "three-circles-loading",
        wrapperStyle: {},
        wrapperClass: ""
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("h3", null, "Data loading ...")));
    }
  }, {
    key: "renderCollectingData2",
    value: function renderCollectingData2() {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
        className: this.props.classes.outer
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
        className: this.props.classes.inner
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_framework_src_components_material_ui_loader__WEBPACK_IMPORTED_MODULE_9__["Loader"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react_loader_spinner__WEBPACK_IMPORTED_MODULE_44__["ThreeCircles"], {
        visible: true,
        height: "100",
        width: "100",
        color: "grey",
        ariaLabel: "three-circles-loading",
        wrapperStyle: {},
        wrapperClass: ""
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("h3", null, "Data loading .....2")));
    }
  }, {
    key: "render",
    value: function render() {
      return this.props.collectingData || !this.state.viewData ? this.renderCollectingData() : this.props.listSpecification ? this.renderValueSelector() : this.renderValueEditor();
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps, prevState) {
      var _a;
      if (!prevState || !prevState[OldProps] || prevState[OldProps].viewData !== nextProps.viewData) {
        var isNew = ((_a = nextProps.vPath) === null || _a === void 0 ? void 0 : _a.endsWith('[]')) || false;
        var state = Object.assign(Object.assign({}, prevState), _defineProperty(_defineProperty({
          isNew: isNew,
          editMode: isNew,
          viewData: nextProps.viewData || null
        }, OldProps, nextProps), "choices", nextProps.displaySpecification.displayMode === _handlers_viewDescriptionHandler__WEBPACK_IMPORTED_MODULE_11__["DisplayModeType"].doNotDisplay || nextProps.displaySpecification.displayMode === _handlers_viewDescriptionHandler__WEBPACK_IMPORTED_MODULE_11__["DisplayModeType"].displayAsMessage ? null : nextProps.displaySpecification.displayMode === _handlers_viewDescriptionHandler__WEBPACK_IMPORTED_MODULE_11__["DisplayModeType"].displayAsRPC ? nextProps.displaySpecification.inputViewSpecification && ConfigurationApplicationComponent.getChoicesFromElements(nextProps.displaySpecification.inputViewSpecification.elements, nextProps.viewData) || [] : ConfigurationApplicationComponent.getChoicesFromElements(nextProps.displaySpecification.viewSpecification.elements, nextProps.viewData)));
        return state;
      }
      return null;
    }
  }]);
}(react__WEBPACK_IMPORTED_MODULE_2___default.a.Component);
ConfigurationApplicationComponent.getChoicesFromElements = function (elements, viewData) {
  var _this28 = this;
  _newArrowCheck(this, _this);
  return Object.keys(elements).reduce(function (acc, cur) {
    var _this29 = this;
    _newArrowCheck(this, _this28);
    var elm = elements[cur];
    if (Object(_models_uiModels__WEBPACK_IMPORTED_MODULE_13__["isViewElementChoice"])(elm)) {
      var caseKeys = Object.keys(elm.cases);
      // find the right case for this choice, use the first one with data, at least use index 0
      var selectedCase = caseKeys.find(function (key) {
        var _this30 = this;
        _newArrowCheck(this, _this29);
        var caseElm = elm.cases[key];
        return Object.keys(caseElm.elements).some(function (caseElmKey) {
          _newArrowCheck(this, _this30);
          var caseElmElm = caseElm.elements[caseElmKey];
          return viewData[caseElmElm.label] !== undefined || viewData[caseElmElm.id] != undefined;
        }.bind(this));
      }.bind(this)) || caseKeys[0];
      // extract all data of the active case
      var caseElements = elm.cases[selectedCase].elements;
      var data = Object.keys(caseElements).reduce(function (dataAcc, dataCur) {
        _newArrowCheck(this, _this29);
        var dataElm = caseElements[dataCur];
        if (Object(_models_uiModels__WEBPACK_IMPORTED_MODULE_13__["isViewElementEmpty"])(dataElm)) {
          dataAcc[dataElm.label] = null;
        } else if (viewData[dataElm.label] !== undefined) {
          dataAcc[dataElm.label] = viewData[dataElm.label];
        } else if (viewData[dataElm.id] !== undefined) {
          dataAcc[dataElm.id] = viewData[dataElm.id];
        }
        return dataAcc;
      }.bind(this), {});
      acc[elm.id] = {
        selectedCase: selectedCase,
        data: data
      };
    }
    return acc;
  }.bind(this), {}) || {};
}.bind(undefined);
var ConfigurationApplication = Object(_mui_styles_withStyles__WEBPACK_IMPORTED_MODULE_4__["default"])(styles)(Object(react_router_dom__WEBPACK_IMPORTED_MODULE_3__["withRouter"])(Object(_framework_src_flux_connect__WEBPACK_IMPORTED_MODULE_7__["connect"])(mapProps, mapDispatch)(ConfigurationApplicationComponent)));
/* harmony default export */ __webpack_exports__["default"] = (ConfigurationApplication);

/***/ }),

/***/ "./views/networkElementSelector.tsx":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NetworkElementSelector", function() { return NetworkElementSelector; });
/* harmony import */ var core_js_modules_web_dom_iterable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../../node_modules/core-js/modules/web.dom.iterable.js");
/* harmony import */ var core_js_modules_web_dom_iterable__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_iterable__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../../node_modules/regenerator-runtime/runtime.js");
/* harmony import */ var regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("../../../node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var _framework_src_flux_connect__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("../../../framework/src/flux/connect.tsx");
/* harmony import */ var _framework_src_components_material_table__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("../../../framework/src/components/material-table/index.tsx");
/* harmony import */ var _configurationApp_src_handlers_connectedNetworkElementsHandler__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./handlers/connectedNetworkElementsHandler.ts");
/* harmony import */ var _services_configurationrestServices__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./services/configurationrestServices.ts");
/* harmony import */ var _services_yangService__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./services/yangService.ts");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }


var _this = undefined;
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator.return && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, catch: function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
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







var mapProps = function mapProps(state) {
  _newArrowCheck(this, _this);
  return {
    connectedNetworkElementsProperties: Object(_configurationApp_src_handlers_connectedNetworkElementsHandler__WEBPACK_IMPORTED_MODULE_6__["createConnectedNetworkElementsProperties"])(state)
  };
}.bind(undefined);
var mapDispatch = function mapDispatch(dispatcher) {
  _newArrowCheck(this, _this);
  return {
    connectedNetworkElementsActions: Object(_configurationApp_src_handlers_connectedNetworkElementsHandler__WEBPACK_IMPORTED_MODULE_6__["createConnectedNetworkElementsActions"])(dispatcher.dispatch)
  };
}.bind(undefined);
var ConnectedElementTable = _framework_src_components_material_table__WEBPACK_IMPORTED_MODULE_5__["MaterialTable"];
var initialSorted = false;
var NetworkElementSelectorComponent = /*#__PURE__*/function (_React$Component) {
  function NetworkElementSelectorComponent() {
    _classCallCheck(this, NetworkElementSelectorComponent);
    return _callSuper(this, NetworkElementSelectorComponent, arguments);
  }
  _inherits(NetworkElementSelectorComponent, _React$Component);
  return _createClass(NetworkElementSelectorComponent, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (!initialSorted) {
        initialSorted = true;
        this.props.connectedNetworkElementsActions.onHandleRequestSort('node-id');
      } else {
        this.props.connectedNetworkElementsActions.onRefresh();
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;
      var listdata = Object.assign({}, this.props.connectedNetworkElementsProperties);
      if (listdata.rows.length > 0) {
        var confdata = [];
        var nodedata;
        var yangdata;
        var yangdataArray = [];
        var _loop = function _loop() {
          var _this3 = this;
          var nid;
          nid = listdata.rows[i].id ? listdata.rows[i].id : "0";
          _services_configurationrestServices__WEBPACK_IMPORTED_MODULE_7__["configurationRestService"].getCapabilitiesByMountId(nid).then(function (res) {
            _newArrowCheck(this, _this3);
            return __awaiter(_this2, void 0, void 0, /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
              var _i, capRaw, data;
              return _regeneratorRuntime().wrap(function _callee$(_context) {
                while (1) switch (_context.prev = _context.next) {
                  case 0:
                    localStorage.removeItem("configData");
                    localStorage.removeItem("yangdataArray");
                    nodedata = {
                      id: nid.toString(),
                      cndata: res
                    };
                    _i = 0;
                  case 4:
                    if (!(_i < nodedata.cndata.availableCapabilities.length)) {
                      _context.next = 14;
                      break;
                    }
                    capRaw = nodedata.cndata.availableCapabilities[_i];
                    _context.next = 8;
                    return _services_yangService__WEBPACK_IMPORTED_MODULE_8__["yangService"].getCapability(capRaw.capability, nid, capRaw.version);
                  case 8:
                    data = _context.sent;
                    yangdata = {
                      nid: nid,
                      capability: capRaw.capability,
                      ydata: data
                    };
                    yangdataArray.push(yangdata);
                  case 11:
                    ++_i;
                    _context.next = 4;
                    break;
                  case 14:
                    confdata.push(nodedata);
                    localStorage.setItem("yangdataArray", JSON.stringify(yangdataArray));
                    localStorage.setItem("configData", JSON.stringify(confdata));
                  case 17:
                  case "end":
                    return _context.stop();
                }
              }, _callee);
            }));
          }.bind(this)).catch(function (err) {
            _newArrowCheck(this, _this3);
            console.log(err);
          }.bind(this));
        };
        for (var i = 0; i < listdata.rows.length; i++) {
          _loop();
        }
      }
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(ConnectedElementTable, _extends({
        stickyHeader: true,
        title: "Configuration",
        tableId: "configurable-elements-table",
        onHandleClick: function (e, row) {
          _newArrowCheck(this, _this2);
          this.props.history.push("".concat(this.props.match.path, "/").concat(row.nodeId));
        }.bind(this),
        columns: [{
          property: 'nodeId',
          title: 'Node Name',
          type: _framework_src_components_material_table__WEBPACK_IMPORTED_MODULE_5__["ColumnType"].text
        }, {
          property: 'isRequired',
          title: 'Required',
          type: _framework_src_components_material_table__WEBPACK_IMPORTED_MODULE_5__["ColumnType"].boolean
        }, {
          property: 'host',
          title: 'Host',
          type: _framework_src_components_material_table__WEBPACK_IMPORTED_MODULE_5__["ColumnType"].text
        }, {
          property: 'port',
          title: 'Port',
          type: _framework_src_components_material_table__WEBPACK_IMPORTED_MODULE_5__["ColumnType"].numeric
        }, {
          property: 'coreModelCapability',
          title: 'Core Model',
          type: _framework_src_components_material_table__WEBPACK_IMPORTED_MODULE_5__["ColumnType"].text
        }, {
          property: 'deviceType',
          title: 'Type',
          type: _framework_src_components_material_table__WEBPACK_IMPORTED_MODULE_5__["ColumnType"].text
        }],
        idProperty: "id"
      }, this.props.connectedNetworkElementsActions, this.props.connectedNetworkElementsProperties, {
        asynchronus: true
      }));
    }
  }]);
}(react__WEBPACK_IMPORTED_MODULE_2___default.a.Component);
var NetworkElementSelector = Object(react_router_dom__WEBPACK_IMPORTED_MODULE_3__["withRouter"])(Object(_framework_src_flux_connect__WEBPACK_IMPORTED_MODULE_4__["connect"])(mapProps, mapDispatch)(NetworkElementSelectorComponent));
/* harmony default export */ __webpack_exports__["default"] = (NetworkElementSelector);

/***/ }),

/***/ "./yang/whenParser.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parseWhen", function() { return parseWhen; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WhenTokenType", function() { return WhenTokenType; });
var _this = undefined;
function _newArrowCheck(n, r) { if (n !== r) throw new TypeError("Cannot instantiate an arrow function"); }
var WhenTokenType;
(function (WhenTokenType) {
  WhenTokenType["AND"] = "AND";
  WhenTokenType["OR"] = "OR";
  WhenTokenType["NOT"] = "NOT";
  WhenTokenType["EQUALS"] = "EQUALS";
  WhenTokenType["COMMA"] = "COMMA";
  WhenTokenType["STRING"] = "STRING";
  WhenTokenType["FUNCTION"] = "FUNCTION";
  WhenTokenType["IDENTIFIER"] = "IDENTIFIER";
  WhenTokenType["OPEN_PAREN"] = "OPEN_PAREN";
  WhenTokenType["CLOSE_PAREN"] = "CLOSE_PAREN";
  WhenTokenType["EXPRESSION"] = "EXPRESSION";
})(WhenTokenType || (WhenTokenType = {}));
var isAlpha = function isAlpha(char) {
  _newArrowCheck(this, _this);
  return /[a-z]/i.test(char);
}.bind(undefined);
var isAlphaNumeric = function isAlphaNumeric(char) {
  _newArrowCheck(this, _this);
  return /[A-Za-z0-9_\-/:\.]/i.test(char);
}.bind(undefined);
var lex = function lex(input) {
  _newArrowCheck(this, _this);
  var tokens = [];
  var current = 0;
  while (current < input.length) {
    var char = input[current];
    if (char === ' ') {
      current++;
      continue;
    }
    if (char === '(') {
      tokens.push({
        type: WhenTokenType.OPEN_PAREN,
        value: char
      });
      current++;
      continue;
    }
    if (char === ')') {
      tokens.push({
        type: WhenTokenType.CLOSE_PAREN,
        value: char
      });
      current++;
      continue;
    }
    if (char === '=') {
      tokens.push({
        type: WhenTokenType.EQUALS,
        value: char
      });
      current++;
      continue;
    }
    if (char === ',') {
      tokens.push({
        type: WhenTokenType.COMMA,
        value: char
      });
      current++;
      continue;
    }
    if (char === '\"' || char === '\'') {
      var value = '';
      var start = current;
      current++;
      while (current < input.length) {
        var innerChar = input[current];
        if (innerChar === '\\') {
          value += input[current] + input[current + 1];
          current += 2;
        } else if (innerChar === input[start]) {
          current++;
          break;
        } else {
          value += innerChar;
          current++;
        }
      }
      tokens.push({
        type: WhenTokenType.STRING,
        value: value
      });
      continue;
    }
    if (isAlpha(char)) {
      var _value = '';
      while (isAlpha(char)) {
        _value += char;
        char = input[++current];
      }
      switch (_value) {
        case 'and':
          tokens.push({
            type: WhenTokenType.AND
          });
          break;
        case 'or':
          tokens.push({
            type: WhenTokenType.OR
          });
          break;
        case 'not':
          tokens.push({
            type: WhenTokenType.NOT
          });
          break;
        case 'eq':
          tokens.push({
            type: WhenTokenType.EQUALS
          });
          break;
        default:
          while (isAlphaNumeric(char)) {
            _value += char;
            char = input[++current];
          }
          tokens.push({
            type: WhenTokenType.IDENTIFIER,
            value: _value
          });
      }
      continue;
    }
    if (isAlphaNumeric(char)) {
      var _value2 = '';
      while (isAlphaNumeric(char)) {
        _value2 += char;
        char = input[++current];
      }
      tokens.push({
        type: WhenTokenType.IDENTIFIER,
        value: _value2
      });
      continue;
    }
    throw new TypeError("I don't know what this character is: ".concat(char));
  }
  return tokens;
}.bind(undefined);
var precedence = {
  'EQUALS': 4,
  'NOT': 3,
  'AND': 2,
  'OR': 1
};
var parseWhen = function parseWhen(whenExpression) {
  var _this2 = this;
  _newArrowCheck(this, _this);
  var tokens = lex(whenExpression);
  var current = 0;
  var _walk = function walk() {
    var precedenceLevel = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    _newArrowCheck(this, _this2);
    var token = tokens[current];
    var node = null;
    if (token.type === WhenTokenType.OPEN_PAREN) {
      token = tokens[++current];
      var innerNode = {
        type: WhenTokenType.EXPRESSION,
        value: _walk()
      };
      token = tokens[current];
      while (token.type !== WhenTokenType.CLOSE_PAREN) {
        innerNode = {
          type: token.type,
          value: token.value,
          left: innerNode,
          right: _walk()
        };
        token = tokens[current];
      }
      current++;
      return innerNode;
    }
    if (token.type === WhenTokenType.STRING) {
      current++;
      node = {
        type: token.type,
        value: token.value
      };
    }
    if (token.type === WhenTokenType.NOT) {
      token = tokens[++current];
      node = {
        type: WhenTokenType.NOT,
        value: token.value,
        right: _walk()
      };
    }
    if (token.type === WhenTokenType.IDENTIFIER) {
      var nextToken = tokens[current + 1];
      if (nextToken.type === WhenTokenType.OPEN_PAREN) {
        var name = token.value;
        token = tokens[++current];
        var args = [];
        token = tokens[++current];
        while (token.type !== WhenTokenType.CLOSE_PAREN) {
          if (token.type === WhenTokenType.COMMA) {
            current++;
          } else {
            args.push(_walk());
          }
          token = tokens[current];
        }
        current++;
        node = {
          type: WhenTokenType.FUNCTION,
          name: name,
          args: args
        };
      } else {
        current++;
        node = {
          type: WhenTokenType.IDENTIFIER,
          value: token.value
        };
      }
    }
    if (!node) throw new TypeError('Unexpected token: ' + token.type);
    token = tokens[current];
    while (current < tokens.length && precedence[token.type] >= precedenceLevel) {
      console.log(current, tokens[current], tokens[current].type, precedenceLevel, precedence[token.type]);
      token = tokens[current];
      if (token.type === WhenTokenType.EQUALS || token.type === WhenTokenType.AND || token.type === WhenTokenType.OR) {
        current++;
        node = {
          type: token.type,
          left: node,
          right: _walk(precedence[token.type])
        };
      } else {
        break;
      }
    }
    return node;
  }.bind(this);
  return _walk();
}.bind(undefined);


/***/ }),

/***/ "./yang/yangParser.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "splitVPath", function() { return splitVPath; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "YangParser", function() { return YangParser; });
/* harmony import */ var core_js_modules_web_dom_iterable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../../node_modules/core-js/modules/web.dom.iterable.js");
/* harmony import */ var core_js_modules_web_dom_iterable__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_iterable__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../../node_modules/regenerator-runtime/runtime.js");
/* harmony import */ var regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _models_yang__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./models/yang.ts");
/* harmony import */ var _models_uiModels__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./models/uiModels.ts");
/* harmony import */ var _services_yangService__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./services/yangService.ts");
/* harmony import */ var _whenParser__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./yang/whenParser.ts");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }


var _this = undefined;
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t.return || t.return(); } finally { if (u) throw o; } } }; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator.return && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, catch: function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
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
var __rest = undefined && undefined.__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
/* eslint-disable @typescript-eslint/no-loss-of-precision */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/naming-convention */
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



var LOGLEVEL = +(localStorage.getItem('log.odlux.app.configuration.yang.yangParser') || 0);

var splitVPath = function splitVPath(vPath, vPathParser) {
  _newArrowCheck(this, _this);
  var pathParts = [];
  var partMatch;
  if (vPath) do {
    partMatch = vPathParser.exec(vPath);
    if (partMatch) {
      pathParts.push(partMatch);
    }
  } while (partMatch);
  return pathParts;
}.bind(undefined);
var YangLexer = /*#__PURE__*/function () {
  function YangLexer(input) {
    _classCallCheck(this, YangLexer);
    this.pos = 0;
    this.buf = '';
    this._opTable = {
      ';': 'SEMI',
      '{': 'L_BRACE',
      '}': 'R_BRACE'
    };
    this.pos = 0;
    this.buf = input;
  }
  return _createClass(YangLexer, [{
    key: "_isNewline",
    value: function _isNewline(char) {
      return char === '\r' || char === '\n';
    }
  }, {
    key: "_isWhitespace",
    value: function _isWhitespace(char) {
      return char === ' ' || char === '\t' || this._isNewline(char);
    }
  }, {
    key: "_isDigit",
    value: function _isDigit(char) {
      return char >= '0' && char <= '9';
    }
  }, {
    key: "_isAlpha",
    value: function _isAlpha(char) {
      return char >= 'a' && char <= 'z' || char >= 'A' && char <= 'Z';
    }
  }, {
    key: "_isAlphanum",
    value: function _isAlphanum(char) {
      return this._isAlpha(char) || this._isDigit(char) || char === '_' || char === '-' || char === '.';
    }
  }, {
    key: "_skipNonTokens",
    value: function _skipNonTokens() {
      while (this.pos < this.buf.length) {
        var char = this.buf.charAt(this.pos);
        if (this._isWhitespace(char)) {
          this.pos++;
        } else {
          break;
        }
      }
    }
  }, {
    key: "_processString",
    value: function _processString(terminator) {
      // this.pos points at the opening quote. Find the ending quote.
      var end_index = this.pos + 1;
      while (end_index < this.buf.length) {
        var char = this.buf.charAt(end_index);
        if (char === '\\') {
          end_index += 2;
          continue;
        }
        if (terminator === null && (this._isWhitespace(char) || this._opTable[char] !== undefined) || char === terminator) {
          break;
        }
        end_index++;
      }
      if (end_index >= this.buf.length) {
        throw Error('Unterminated quote at ' + this.pos);
      } else {
        var start = this.pos + (terminator ? 1 : 0);
        var end = end_index;
        var tok = {
          name: 'STRING',
          value: this.buf.substring(start, end),
          start: start,
          end: end
        };
        this.pos = terminator ? end + 1 : end;
        return tok;
      }
    }
  }, {
    key: "_processIdentifier",
    value: function _processIdentifier() {
      var endpos = this.pos + 1;
      while (endpos < this.buf.length && this._isAlphanum(this.buf.charAt(endpos))) {
        ++endpos;
      }
      var name = 'IDENTIFIER';
      if (this.buf.charAt(endpos) === ':') {
        name = 'IDENTIFIERREF';
        ++endpos;
        while (endpos < this.buf.length && this._isAlphanum(this.buf.charAt(endpos))) {
          ++endpos;
        }
      }
      var tok = {
        name: name,
        value: this.buf.substring(this.pos, endpos),
        start: this.pos,
        end: endpos
      };
      this.pos = endpos;
      return tok;
    }
  }, {
    key: "_processNumber",
    value: function _processNumber() {
      var endpos = this.pos + 1;
      while (endpos < this.buf.length && this._isDigit(this.buf.charAt(endpos))) {
        endpos++;
      }
      var tok = {
        name: 'NUMBER',
        value: this.buf.substring(this.pos, endpos),
        start: this.pos,
        end: endpos
      };
      this.pos = endpos;
      return tok;
    }
  }, {
    key: "_processLineComment",
    value: function _processLineComment() {
      var endpos = this.pos + 2;
      // Skip until the end of the line
      while (endpos < this.buf.length && !this._isNewline(this.buf.charAt(endpos))) {
        endpos++;
      }
      this.pos = endpos + 1;
    }
  }, {
    key: "_processBlockComment",
    value: function _processBlockComment() {
      var endpos = this.pos + 2;
      // Skip until the end of the line
      while (endpos < this.buf.length && !(this.buf.charAt(endpos) === '/' && this.buf.charAt(endpos - 1) === '*')) {
        endpos++;
      }
      this.pos = endpos + 1;
    }
  }, {
    key: "tokenize",
    value: function tokenize() {
      var result = [];
      this._skipNonTokens();
      while (this.pos < this.buf.length) {
        var char = this.buf.charAt(this.pos);
        var op = this._opTable[char];
        if (op !== undefined) {
          result.push({
            name: op,
            value: char,
            start: this.pos,
            end: ++this.pos
          });
        } else if (this._isAlpha(char)) {
          result.push(this._processIdentifier());
          this._skipNonTokens();
          var peekChar = this.buf.charAt(this.pos);
          if (this._opTable[peekChar] === undefined) {
            result.push(peekChar !== '\'' && peekChar !== '"' ? this._processString(null) : this._processString(peekChar));
          }
        } else if (char === '/' && this.buf.charAt(this.pos + 1) === '/') {
          this._processLineComment();
        } else if (char === '/' && this.buf.charAt(this.pos + 1) === '*') {
          this._processBlockComment();
        } else {
          throw Error('Token error at ' + this.pos + ' ' + this.buf[this.pos]);
        }
        this._skipNonTokens();
      }
      return result;
    }
  }, {
    key: "tokenize2",
    value: function tokenize2() {
      var stack = [{
        key: 'ROOT',
        sub: []
      }];
      var current = null;
      this._skipNonTokens();
      while (this.pos < this.buf.length) {
        var char = this.buf.charAt(this.pos);
        var op = this._opTable[char];
        if (op !== undefined) {
          if (op === 'L_BRACE') {
            current && stack.unshift(current);
            current = null;
          } else if (op === 'R_BRACE') {
            current = stack.shift() || null;
          }
          this.pos++;
        } else if (this._isAlpha(char) || char === '_') {
          var key = this._processIdentifier().value;
          this._skipNonTokens();
          var peekChar = this.buf.charAt(this.pos);
          var arg = undefined;
          if (this._opTable[peekChar] === undefined) {
            arg = peekChar === '"' || peekChar === '\'' ? this._processString(peekChar).value : this._processString(null).value;
          }
          do {
            this._skipNonTokens();
            peekChar = this.buf.charAt(this.pos);
            if (peekChar !== '+') break;
            this.pos++;
            this._skipNonTokens();
            peekChar = this.buf.charAt(this.pos);
            arg += peekChar === '"' || peekChar === '\'' ? this._processString(peekChar).value : this._processString(null).value;
          } while (true);
          current = {
            key: key,
            arg: arg,
            sub: []
          };
          stack[0].sub.push(current);
        } else if (char === '/' && this.buf.charAt(this.pos + 1) === '/') {
          this._processLineComment();
        } else if (char === '/' && this.buf.charAt(this.pos + 1) === '*') {
          this._processBlockComment();
        } else {
          throw Error('Token error at ' + this.pos + ' ' + this.buf.slice(this.pos - 10, this.pos + 10));
        }
        this._skipNonTokens();
      }
      if (stack[0].key !== 'ROOT' || !stack[0].sub[0]) {
        throw new Error('Internal Perser Error');
      }
      return stack[0].sub[0];
    }
  }]);
}();
var YangParser = /*#__PURE__*/function () {
  function YangParser(nodeId) {
    var _capabilityRevisionMap = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var _unavailableCapabilities = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
    var _importOnlyModules = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];
    _classCallCheck(this, YangParser);
    this.nodeId = nodeId;
    this._capabilityRevisionMap = _capabilityRevisionMap;
    this._unavailableCapabilities = _unavailableCapabilities;
    this._importOnlyModules = _importOnlyModules;
    this._groupingsToResolve = [];
    this._typeRefToResolve = [];
    this._identityToResolve = [];
    this._unionsToResolve = [];
    this._modulesToResolve = [];
    this._modules = {};
    this._views = [{
      id: '0',
      name: 'root',
      language: 'en-US',
      canEdit: false,
      config: true,
      parentView: '0',
      title: 'root',
      elements: {}
    }];
    this._nextId = 1;
  }
  return _createClass(YangParser, [{
    key: "modules",
    get: function get() {
      return this._modules;
    }
  }, {
    key: "views",
    get: function get() {
      return this._views;
    }
  }, {
    key: "addCapability",
    value: function addCapability(capability, version, parentImportOnlyModule) {
      return __awaiter(this, void 0, void 0, /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        var _this2 = this;
        var existingCapability, latestVersionExisting, data, YangData, yangNodeData, yd, rootStatement, isUnavailable, isImportOnly, revisions, latestVersionLoaded, module;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              // do not add twice
              existingCapability = this._modules[capability];
              latestVersionExisting = existingCapability && Object.keys(existingCapability.revisions).sort().reverse()[0];
              if (!(latestVersionExisting && version && version <= latestVersionExisting)) {
                _context.next = 4;
                break;
              }
              return _context.abrupt("return");
            case 4:
              if (!(localStorage.getItem('yangdataArray') !== null)) {
                _context.next = 12;
                break;
              }
              YangData = JSON.parse(localStorage.getItem('yangdataArray') || '{}');
              yangNodeData = YangData.filter(function (obj) {
                _newArrowCheck(this, _this2);
                return obj.nid === this.nodeId;
              }.bind(this));
              if (capability == "o-ran-beamforming" || capability == "o-ran-uplane-conf") {
                console.log("capability Test  " + capability);
              }
              yd = yangNodeData.filter(function (obj) {
                _newArrowCheck(this, _this2);
                return obj.capability === capability;
              }.bind(this));
              data = yd[0].ydata;
              _context.next = 15;
              break;
            case 12:
              _context.next = 14;
              return _services_yangService__WEBPACK_IMPORTED_MODULE_4__["yangService"].getCapability(capability, this.nodeId, version);
            case 14:
              data = _context.sent;
            case 15:
              if (data) {
                _context.next = 17;
                break;
              }
              throw new Error("Could not load yang file for ".concat(capability, ":").concat(version || '', "."));
            case 17:
              rootStatement = new YangLexer(data).tokenize2();
              if (!(rootStatement.key !== 'module')) {
                _context.next = 20;
                break;
              }
              throw new Error("Root element of ".concat(capability, " is not a module."));
            case 20:
              if (!(rootStatement.arg !== capability)) {
                _context.next = 22;
                break;
              }
              throw new Error("Root element capability ".concat(rootStatement.arg, " does not requested ").concat(capability, "."));
            case 22:
              isUnavailable = this._unavailableCapabilities.some(function (c) {
                _newArrowCheck(this, _this2);
                return c.capability === capability;
              }.bind(this));
              isImportOnly = parentImportOnlyModule === true || this._importOnlyModules.some(function (c) {
                _newArrowCheck(this, _this2);
                return c.name === capability;
              }.bind(this)); // extract revisions
              revisions = this.extractNodes(rootStatement, 'revision').reduce(function (acc, revision) {
                _newArrowCheck(this, _this2);
                if (!revision.arg) {
                  throw new Error("Module [".concat(rootStatement.arg, "] has a version w/o version number."));
                }
                var description = this.extractValue(revision, 'description');
                var reference = this.extractValue(revision, 'reference');
                acc[revision.arg] = {
                  description: description,
                  reference: reference
                };
                return acc;
              }.bind(this), {});
              latestVersionLoaded = Object.keys(revisions).sort().reverse()[0];
              if (!(existingCapability && latestVersionExisting >= latestVersionLoaded)) {
                _context.next = 28;
                break;
              }
              return _context.abrupt("return");
            case 28:
              module = this._modules[capability] = {
                name: rootStatement.arg,
                revisions: revisions,
                imports: {},
                features: {},
                identities: {},
                augments: {},
                groupings: {},
                typedefs: {},
                views: {},
                elements: {},
                state: isUnavailable ? _models_yang__WEBPACK_IMPORTED_MODULE_2__["ModuleState"].unavailable : isImportOnly ? _models_yang__WEBPACK_IMPORTED_MODULE_2__["ModuleState"].importOnly : _models_yang__WEBPACK_IMPORTED_MODULE_2__["ModuleState"].stable
              };
              if (!(capability == "_3gpp-nr-nrm-nrnetwork" || capability == "_3gpp-common-managed-function" || capability == "_3gpp-common-subnetwork" || capability == "ManagedNFService" || capability == "_3gpp-common-fm" || capability == "_3gpp-common-measurements" || capability == "_3gpp-common-subscription-control" || capability == "_3gpp-common-top" || capability == "_3gpp-nr-nrm-cesmanagementfunction")) {
                _context.next = 33;
                break;
              }
              console.log("capability Test  " + capability);
              _context.next = 35;
              break;
            case 33:
              _context.next = 35;
              return this.handleModule(module, rootStatement, capability);
            case 35:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
    }
  }, {
    key: "handleModule",
    value: function handleModule(module, rootStatement, capability) {
      return __awaiter(this, void 0, void 0, /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
        var _this3 = this,
          _this$_views,
          _this$_views2,
          _this$_views3;
        var features, imports, ind, moduleName, revision, importedModule, groupings, augments, _this$extractSubViews, _this$extractSubViews2, currentView, subViews;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              // extract namespace && prefix
              module.namespace = this.extractValue(rootStatement, 'namespace');
              module.prefix = this.extractValue(rootStatement, 'prefix');
              if (module.prefix) {
                module.imports[module.prefix] = capability;
              }
              // extract features
              features = this.extractNodes(rootStatement, 'feature');
              module.features = Object.assign(Object.assign({}, module.features), features.reduce(function (acc, feature) {
                _newArrowCheck(this, _this3);
                if (!feature.arg) {
                  throw new Error("Module [".concat(module.name, "] has a feature w/o name."));
                }
                var description = this.extractValue(feature, 'description');
                acc[feature.arg] = {
                  description: description
                };
                return acc;
              }.bind(this), {}));
              // extract imports
              imports = this.extractNodes(rootStatement, 'import');
              module.imports = Object.assign(Object.assign({}, module.imports), imports.reduce(function (acc, imp) {
                var _this4 = this;
                _newArrowCheck(this, _this3);
                var prefix = imp.sub && imp.sub.filter(function (s) {
                  _newArrowCheck(this, _this4);
                  return s.key === 'prefix';
                }.bind(this));
                if (!imp.arg) {
                  throw new Error("Module [".concat(module.name, "] has an import with neither name nor prefix."));
                }
                acc[prefix && prefix.length === 1 && prefix[0].arg || imp.arg] = imp.arg;
                return acc;
              }.bind(this), {}));
              // import all required files and set module state 
              if (!imports) {
                _context2.next = 19;
                break;
              }
              ind = 0;
            case 9:
              if (!(ind < imports.length)) {
                _context2.next = 19;
                break;
              }
              moduleName = imports[ind].arg;
              revision = this._capabilityRevisionMap[moduleName] || undefined;
              _context2.next = 14;
              return this.addCapability(moduleName, revision, module.state === _models_yang__WEBPACK_IMPORTED_MODULE_2__["ModuleState"].importOnly);
            case 14:
              importedModule = this._modules[imports[ind].arg];
              if (importedModule && importedModule.state > _models_yang__WEBPACK_IMPORTED_MODULE_2__["ModuleState"].stable) {
                module.state = Math.max(module.state, _models_yang__WEBPACK_IMPORTED_MODULE_2__["ModuleState"].instable);
              }
            case 16:
              ++ind;
              _context2.next = 9;
              break;
            case 19:
              this.extractTypeDefinitions(rootStatement, module, '');
              this.extractIdentities(rootStatement, 0, module, '');
              groupings = this.extractGroupings(rootStatement, 0, module, '');
              (_this$_views = this._views).push.apply(_this$_views, _toConsumableArray(groupings));
              augments = this.extractAugments(rootStatement, 0, module, '');
              (_this$_views2 = this._views).push.apply(_this$_views2, _toConsumableArray(augments));
              // the default for config on module level is config = true;
              _this$extractSubViews = this.extractSubViews(rootStatement, 0, module, ''), _this$extractSubViews2 = _slicedToArray(_this$extractSubViews, 2), currentView = _this$extractSubViews2[0], subViews = _this$extractSubViews2[1];
              (_this$_views3 = this._views).push.apply(_this$_views3, [currentView].concat(_toConsumableArray(subViews)));
              // create the root elements for this module
              module.elements = currentView.elements;
              this._modulesToResolve.push(function () {
                var _this5 = this;
                _newArrowCheck(this, _this3);
                Object.keys(module.elements).forEach(function (key) {
                  _newArrowCheck(this, _this5);
                  var viewElement = module.elements[key];
                  // if (!(isViewElementObjectOrList(viewElement) || isViewElementRpc(viewElement))) {
                  //   console.error(new Error(`Module: [${module}]. Only Object, List or RPC are allowed on root level.`));
                  // }
                  if (Object(_models_uiModels__WEBPACK_IMPORTED_MODULE_3__["isViewElementObjectOrList"])(viewElement)) {
                    var viewIdIndex = Number(viewElement.viewId);
                    module.views[key] = this._views[viewIdIndex];
                  }
                  // add only the UI View if the module is available
                  if (module.state === _models_yang__WEBPACK_IMPORTED_MODULE_2__["ModuleState"].stable || module.state === _models_yang__WEBPACK_IMPORTED_MODULE_2__["ModuleState"].instable) this._views[0].elements[key] = module.elements[key];
                }.bind(this));
              }.bind(this));
              return _context2.abrupt("return", module);
            case 30:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this);
      }));
    }
  }, {
    key: "postProcess",
    value: function postProcess() {
      var _this6 = this;
      // execute all post processes like resolving in proper order
      this._unionsToResolve.forEach(function (cb) {
        _newArrowCheck(this, _this6);
        try {
          cb();
        } catch (error) {
          console.warn(error.message);
        }
      }.bind(this));
      // process all groupings
      this._groupingsToResolve.filter(function (vs) {
        _newArrowCheck(this, _this6);
        return vs.uses && vs.uses[_models_uiModels__WEBPACK_IMPORTED_MODULE_3__["ResolveFunction"]];
      }.bind(this)).forEach(function (vs) {
        _newArrowCheck(this, _this6);
        try {
          vs.uses[_models_uiModels__WEBPACK_IMPORTED_MODULE_3__["ResolveFunction"]] !== undefined && vs.uses[_models_uiModels__WEBPACK_IMPORTED_MODULE_3__["ResolveFunction"]]('|');
        } catch (error) {
          // console.warn(`Error resolving: [${vs.name}] [${error.message}]`);
        }
      }.bind(this));
      /**
       * This is to fix the issue for sequential execution of modules based on their child and parent relationship
       * We are sorting the module object based on their augment status
       */
      Object.keys(this.modules).map(function (elem) {
        var _this7 = this;
        _newArrowCheck(this, _this6);
        if (this.modules[elem].augments && Object.keys(this.modules[elem].augments).length > 0) {
          var _a = this.modules[elem],
            augments = _a.augments,
            _rest = __rest(_a, ["augments"]);
          var partsOfKeys = Object.keys(augments).map(function (key) {
            _newArrowCheck(this, _this7);
            return key.split('/').length - 1;
          }.bind(this));
          this.modules[elem].executionOrder = Math.max.apply(Math, _toConsumableArray(partsOfKeys));
        } else {
          this.modules[elem].executionOrder = 0;
        }
      }.bind(this));
      // process all augmentations / sort by namespace changes to ensure proper order 
      Object.keys(this.modules).sort(function (a, b) {
        _newArrowCheck(this, _this6);
        return this.modules[a].executionOrder - this.modules[b].executionOrder;
      }.bind(this)).forEach(function (modKey) {
        var _this8 = this;
        _newArrowCheck(this, _this6);
        var module = this.modules[modKey];
        var augmentKeysWithCounter = Object.keys(module.augments).map(function (key) {
          var _this9 = this;
          _newArrowCheck(this, _this8);
          var pathParts = splitVPath(key, /(?:(?:([^\/\:]+):)?([^\/]+))/g); // 1 = opt: namespace / 2 = property 
          var nameSpaceChangeCounter = 0;
          var currentNS = module.name; // init namespace
          pathParts.forEach(function (_ref) {
            var _ref2 = _slicedToArray(_ref, 2),
              ns = _ref2[0],
              _ = _ref2[1];
            _newArrowCheck(this, _this9);
            if (ns === currentNS) {
              currentNS = ns;
              nameSpaceChangeCounter++;
            }
          }.bind(this));
          return {
            key: key,
            nameSpaceChangeCounter: nameSpaceChangeCounter
          };
        }.bind(this));
        var augmentKeys = augmentKeysWithCounter.sort(function (a, b) {
          _newArrowCheck(this, _this8);
          return a.nameSpaceChangeCounter > b.nameSpaceChangeCounter ? 1 : a.nameSpaceChangeCounter === b.nameSpaceChangeCounter ? 0 : -1;
        }.bind(this)).map(function (a) {
          _newArrowCheck(this, _this8);
          return a.key;
        }.bind(this));
        augmentKeys.forEach(function (augKey) {
          var _this10 = this;
          _newArrowCheck(this, _this8);
          var augments = module.augments[augKey];
          var viewSpec = this.resolveView(augKey);
          //if (!viewSpec)
          // console.warn(`Could not find view to augment [${augKey}] in [${module.name}].`);
          if (augments && viewSpec) {
            augments.forEach(function (augment) {
              var _this11 = this;
              _newArrowCheck(this, _this10);
              return Object.keys(augment.elements).forEach(function (key) {
                _newArrowCheck(this, _this11);
                var elm = augment.elements[key];
                var when = elm.when && augment.when ? {
                  type: _whenParser__WEBPACK_IMPORTED_MODULE_5__["WhenTokenType"].AND,
                  left: elm.when,
                  right: augment.when
                } : elm.when || augment.when;
                var ifFeature = elm.ifFeature ? "(".concat(augment.ifFeature, ") and (").concat(elm.ifFeature, ")") : augment.ifFeature;
                viewSpec.elements[key] = Object.assign(Object.assign({}, augment.elements[key]), {
                  when: when,
                  ifFeature: ifFeature
                });
              }.bind(this));
            }.bind(this));
          }
        }.bind(this));
      }.bind(this));
      // process Identities
      var _traverseIdentity = function traverseIdentity(identities) {
        _newArrowCheck(this, _this6);
        var result = [];
        var _iterator = _createForOfIteratorHelper(identities),
          _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var identity = _step.value;
            if (identity.children && identity.children.length > 0) {
              result.push.apply(result, _toConsumableArray(_traverseIdentity(identity.children)));
            } else {
              result.push(identity);
            }
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
        return result;
      }.bind(this);
      var baseIdentities = [];
      Object.keys(this.modules).forEach(function (modKey) {
        var _this12 = this;
        _newArrowCheck(this, _this6);
        var module = this.modules[modKey];
        Object.keys(module.identities).forEach(function (idKey) {
          _newArrowCheck(this, _this12);
          var _a;
          var identity = module.identities[idKey];
          if (identity.base != null) {
            var base = this.resolveIdentity(identity.base, module);
            (_a = base.children) === null || _a === void 0 ? void 0 : _a.push(identity);
          } else {
            baseIdentities.push(identity);
          }
        }.bind(this));
      }.bind(this));
      baseIdentities.forEach(function (identity) {
        _newArrowCheck(this, _this6);
        identity.values = identity.children && _traverseIdentity(identity.children) || [];
      }.bind(this));
      this._identityToResolve.forEach(function (cb) {
        _newArrowCheck(this, _this6);
        try {
          cb();
        } catch (error) {
          console.warn(error.message);
        }
      }.bind(this));
      this._typeRefToResolve.forEach(function (cb) {
        _newArrowCheck(this, _this6);
        try {
          cb();
        } catch (error) {
          console.warn(error.message);
        }
      }.bind(this));
      this._modulesToResolve.forEach(function (cb) {
        _newArrowCheck(this, _this6);
        try {
          cb();
        } catch (error) {
          console.warn(error.message);
        }
      }.bind(this));
      // resolve readOnly
      var _resolveReadOnly = function resolveReadOnly(view, parentConfig) {
        var _this13 = this;
        _newArrowCheck(this, _this6);
        // update view config
        view.config = view.config && parentConfig;
        Object.keys(view.elements).forEach(function (key) {
          _newArrowCheck(this, _this13);
          var elm = view.elements[key];
          // update element config
          elm.config = elm.config && view.config;
          // update all sub-elements of objects
          if (elm.uiType === 'object') {
            _resolveReadOnly(this.views[+elm.viewId], elm.config);
          }
        }.bind(this));
      }.bind(this);
      var dump = _resolveReadOnly(this.views[0], true);
      if (LOGLEVEL > 2) {
        console.log('Resolved views:', dump);
      }
    }
  }, {
    key: "nextId",
    get: function get() {
      return this._nextId++;
    }
  }, {
    key: "extractNodes",
    value: function extractNodes(statement, key) {
      var _this14 = this;
      return statement.sub && statement.sub.filter(function (s) {
        _newArrowCheck(this, _this14);
        return s.key === key;
      }.bind(this)) || [];
    }
  }, {
    key: "extractValue",
    value: function extractValue(statement, key, parser) {
      var typeNodes = this.extractNodes(statement, key);
      var rawValue = typeNodes.length > 0 && typeNodes[0].arg || undefined;
      return parser ? rawValue && parser.exec(rawValue) || undefined : rawValue;
    }
  }, {
    key: "extractTypeDefinitions",
    value: function extractTypeDefinitions(statement, module, currentPath) {
      var _this15 = this;
      var typedefs = this.extractNodes(statement, 'typedef');
      typedefs && typedefs.forEach(function (def) {
        _newArrowCheck(this, _this15);
        if (!def.arg) {
          throw new Error("Module: [".concat(module.name, "]. Found typedef without name."));
        }
        module.typedefs[def.arg] = this.getViewElement(def, module, 0, currentPath, false);
      }.bind(this));
    }
    /** Handles groupings like named Container */
  }, {
    key: "extractGroupings",
    value: function extractGroupings(statement, parentId, module, currentPath) {
      var _this16 = this;
      var subViews = [];
      var groupings = this.extractNodes(statement, 'grouping');
      if (groupings && groupings.length > 0) {
        subViews.push.apply(subViews, _toConsumableArray(groupings.reduce(function (acc, cur) {
          _newArrowCheck(this, _this16);
          if (!cur.arg) {
            throw new Error("Module: [".concat(module.name, "][").concat(currentPath, "]. Found grouping without name."));
          }
          var grouping = cur.arg;
          // the default for config on module level is config = true;
          var _this$extractSubViews3 = this.extractSubViews(cur, /* parentId */-1, module, currentPath),
            _this$extractSubViews4 = _slicedToArray(_this$extractSubViews3, 2),
            currentView = _this$extractSubViews4[0],
            currentSubViews = _this$extractSubViews4[1];
          grouping && (module.groupings[grouping] = currentView);
          acc.push.apply(acc, [currentView].concat(_toConsumableArray(currentSubViews)));
          return acc;
        }.bind(this), [])));
      }
      return subViews;
    }
    /** Handles augments also like named container */
  }, {
    key: "extractAugments",
    value: function extractAugments(statement, parentId, module, currentPath) {
      var _this17 = this;
      var subViews = [];
      var augments = this.extractNodes(statement, 'augment');
      if (augments && augments.length > 0) {
        subViews.push.apply(subViews, _toConsumableArray(augments.reduce(function (acc, cur) {
          _newArrowCheck(this, _this17);
          if (!cur.arg) {
            throw new Error("Module: [".concat(module.name, "][").concat(currentPath, "]. Found augment without path."));
          }
          var augment = this.resolveReferencePath(cur.arg, module);
          // the default for config on module level is config = true;
          var _this$extractSubViews5 = this.extractSubViews(cur, parentId, module, currentPath),
            _this$extractSubViews6 = _slicedToArray(_this$extractSubViews5, 2),
            currentView = _this$extractSubViews6[0],
            currentSubViews = _this$extractSubViews6[1];
          if (augment) {
            module.augments[augment] = module.augments[augment] || [];
            module.augments[augment].push(currentView);
          }
          acc.push.apply(acc, [currentView].concat(_toConsumableArray(currentSubViews)));
          return acc;
        }.bind(this), [])));
      }
      return subViews;
    }
    /** Handles identities  */
  }, {
    key: "extractIdentities",
    value: function extractIdentities(statement, parentId, module, currentPath) {
      var _this18 = this;
      var identities = this.extractNodes(statement, 'identity');
      module.identities = identities.reduce(function (acc, cur) {
        _newArrowCheck(this, _this18);
        if (!cur.arg) {
          throw new Error("Module: [".concat(module.name, "][").concat(currentPath, "]. Found identity without name."));
        }
        acc[cur.arg] = {
          id: "".concat(module.name, ":").concat(cur.arg),
          label: cur.arg,
          base: this.extractValue(cur, 'base'),
          description: this.extractValue(cur, 'description'),
          reference: this.extractValue(cur, 'reference'),
          children: []
        };
        return acc;
      }.bind(this), {});
    }
    // Hint: use 0 as parentId for rootElements and -1 for rootGroupings.
  }, {
    key: "extractSubViews",
    value: function extractSubViews(statement, parentId, module, currentPath) {
      var _this19 = this;
      // used for scoped definitions
      var context = Object.assign(Object.assign({}, module), {
        typedefs: Object.assign({}, module.typedefs)
      });
      var currentId = this.nextId;
      var subViews = [];
      var elements = [];
      var configValue = this.extractValue(statement, 'config');
      var config = configValue == null ? true : configValue.toLocaleLowerCase() !== 'false';
      // extract conditions
      var ifFeature = this.extractValue(statement, 'if-feature');
      var whenCondition = this.extractValue(statement, 'when');
      //if (whenCondition) console.warn('Found in [' + context.name + ']' + currentPath + ' when: ' + whenCondition);
      // extract all scoped typedefs
      this.extractTypeDefinitions(statement, context, currentPath);
      // extract all scoped groupings
      subViews.push.apply(subViews, _toConsumableArray(this.extractGroupings(statement, parentId, context, currentPath)));
      // extract all container
      var container = this.extractNodes(statement, 'container');
      if (container && container.length > 0) {
        subViews.push.apply(subViews, _toConsumableArray(container.reduce(function (acc, cur) {
          _newArrowCheck(this, _this19);
          if (!cur.arg) {
            throw new Error("Module: [".concat(context.name, "]").concat(currentPath, ". Found container without name."));
          }
          var _this$extractSubViews7 = this.extractSubViews(cur, currentId, context, "".concat(currentPath, "/").concat(context.name, ":").concat(cur.arg)),
            _this$extractSubViews8 = _slicedToArray(_this$extractSubViews7, 2),
            currentView = _this$extractSubViews8[0],
            currentSubViews = _this$extractSubViews8[1];
          elements.push({
            id: parentId === 0 ? "".concat(context.name, ":").concat(cur.arg) : cur.arg,
            label: cur.arg,
            path: currentPath,
            module: context.name || module.name || '',
            uiType: 'object',
            viewId: currentView.id,
            config: currentView.config
          });
          acc.push.apply(acc, [currentView].concat(_toConsumableArray(currentSubViews)));
          return acc;
        }.bind(this), [])));
      }
      // process all lists
      // a list is a list of containers with the leafs contained in the list
      var lists = this.extractNodes(statement, 'list');
      if (lists && lists.length > 0) {
        subViews.push.apply(subViews, _toConsumableArray(lists.reduce(function (acc, cur) {
          _newArrowCheck(this, _this19);
          var elmConfig = config;
          if (!cur.arg) {
            throw new Error("Module: [".concat(context.name, "]").concat(currentPath, ". Found list without name."));
          }
          var key = this.extractValue(cur, 'key') || undefined;
          if (elmConfig && !key) {
            //console.warn(`Module: [${context.name}]${currentPath}. Found configurable list without key. Assume config shell be false.`);
            elmConfig = false;
          }
          var _this$extractSubViews9 = this.extractSubViews(cur, currentId, context, "".concat(currentPath, "/").concat(context.name, ":").concat(cur.arg)),
            _this$extractSubViews10 = _slicedToArray(_this$extractSubViews9, 2),
            currentView = _this$extractSubViews10[0],
            currentSubViews = _this$extractSubViews10[1];
          elements.push({
            id: parentId === 0 ? "".concat(context.name, ":").concat(cur.arg) : cur.arg,
            label: cur.arg,
            path: currentPath,
            module: context.name || module.name || '',
            isList: true,
            uiType: 'object',
            viewId: currentView.id,
            key: key,
            config: elmConfig && currentView.config
          });
          acc.push.apply(acc, [currentView].concat(_toConsumableArray(currentSubViews)));
          return acc;
        }.bind(this), [])));
      }
      // process all leaf-lists
      // a leaf-list is a list of some type
      var leafLists = this.extractNodes(statement, 'leaf-list');
      if (leafLists && leafLists.length > 0) {
        elements.push.apply(elements, _toConsumableArray(leafLists.reduce(function (acc, cur) {
          _newArrowCheck(this, _this19);
          var element = this.getViewElement(cur, context, parentId, currentPath, true);
          element && acc.push(element);
          return acc;
        }.bind(this), [])));
      }
      // process all leafs
      // a leaf is mainly a property of an object
      var leafs = this.extractNodes(statement, 'leaf');
      if (leafs && leafs.length > 0) {
        elements.push.apply(elements, _toConsumableArray(leafs.reduce(function (acc, cur) {
          _newArrowCheck(this, _this19);
          var element = this.getViewElement(cur, context, parentId, currentPath, false);
          element && acc.push(element);
          return acc;
        }.bind(this), [])));
      }
      var choiceStms = this.extractNodes(statement, 'choice');
      if (choiceStms && choiceStms.length > 0) {
        elements.push.apply(elements, _toConsumableArray(choiceStms.reduce(function (accChoice, curChoice) {
          var _this20 = this;
          _newArrowCheck(this, _this19);
          if (!curChoice.arg) {
            throw new Error("Module: [".concat(context.name, "]").concat(currentPath, ". Found choise without name."));
          }
          // extract all cases like containers
          var cases = [];
          var caseStms = this.extractNodes(curChoice, 'case');
          if (caseStms && caseStms.length > 0) {
            cases.push.apply(cases, _toConsumableArray(caseStms.reduce(function (accCase, curCase) {
              _newArrowCheck(this, _this20);
              if (!curCase.arg) {
                throw new Error("Module: [".concat(context.name, "]").concat(currentPath, "/").concat(curChoice.arg, ". Found case without name."));
              }
              var description = this.extractValue(curCase, 'description') || undefined;
              var _this$extractSubViews11 = this.extractSubViews(curCase, parentId, context, "".concat(currentPath, "/").concat(context.name, ":").concat(curChoice.arg)),
                _this$extractSubViews12 = _slicedToArray(_this$extractSubViews11, 2),
                caseView = _this$extractSubViews12[0],
                caseSubViews = _this$extractSubViews12[1];
              subViews.push.apply(subViews, [caseView].concat(_toConsumableArray(caseSubViews)));
              var caseDef = {
                id: parentId === 0 ? "".concat(context.name, ":").concat(curCase.arg) : curCase.arg,
                label: curCase.arg,
                description: description,
                elements: caseView.elements
              };
              accCase.push(caseDef);
              return accCase;
            }.bind(this), [])));
          }
          // extract all simple cases (one case per leaf, container, etc.)
          var _this$extractSubViews13 = this.extractSubViews(curChoice, parentId, context, "".concat(currentPath, "/").concat(context.name, ":").concat(curChoice.arg)),
            _this$extractSubViews14 = _slicedToArray(_this$extractSubViews13, 2),
            choiceView = _this$extractSubViews14[0],
            choiceSubViews = _this$extractSubViews14[1];
          subViews.push.apply(subViews, [choiceView].concat(_toConsumableArray(choiceSubViews)));
          cases.push.apply(cases, _toConsumableArray(Object.keys(choiceView.elements).reduce(function (accElm, curElm) {
            _newArrowCheck(this, _this20);
            var elm = choiceView.elements[curElm];
            var caseDef = {
              id: elm.id,
              label: elm.label,
              description: elm.description,
              elements: _defineProperty({}, elm.id, elm)
            };
            accElm.push(caseDef);
            return accElm;
          }.bind(this), [])));
          var choiceDescription = this.extractValue(curChoice, 'description') || undefined;
          var choiceConfigValue = this.extractValue(curChoice, 'config');
          var choiceConfig = choiceConfigValue == null ? true : choiceConfigValue.toLocaleLowerCase() !== 'false';
          var mandatory = this.extractValue(curChoice, 'mandatory') === 'true' || false;
          var element = {
            uiType: 'choice',
            id: parentId === 0 ? "".concat(context.name, ":").concat(curChoice.arg) : curChoice.arg,
            label: curChoice.arg,
            path: currentPath,
            module: context.name || module.name || '',
            config: choiceConfig,
            mandatory: mandatory,
            description: choiceDescription,
            cases: cases.reduce(function (acc, cur) {
              _newArrowCheck(this, _this20);
              acc[cur.id] = cur;
              return acc;
            }.bind(this), {})
          };
          accChoice.push(element);
          return accChoice;
        }.bind(this), [])));
      }
      var rpcStms = this.extractNodes(statement, 'rpc');
      if (rpcStms && rpcStms.length > 0) {
        elements.push.apply(elements, _toConsumableArray(rpcStms.reduce(function (accRpc, curRpc) {
          _newArrowCheck(this, _this19);
          if (!curRpc.arg) {
            throw new Error("Module: [".concat(context.name, "]").concat(currentPath, ". Found rpc without name."));
          }
          var rpcDescription = this.extractValue(curRpc, 'description') || undefined;
          var rpcConfigValue = this.extractValue(curRpc, 'config');
          var rpcConfig = rpcConfigValue == null ? true : rpcConfigValue.toLocaleLowerCase() !== 'false';
          var inputViewId = undefined;
          var outputViewId = undefined;
          var input = this.extractNodes(curRpc, 'input') || undefined;
          var output = this.extractNodes(curRpc, 'output') || undefined;
          if (input && input.length > 0) {
            var _this$extractSubViews15 = this.extractSubViews(input[0], parentId, context, "".concat(currentPath, "/").concat(context.name, ":").concat(curRpc.arg)),
              _this$extractSubViews16 = _slicedToArray(_this$extractSubViews15, 2),
              inputView = _this$extractSubViews16[0],
              inputSubViews = _this$extractSubViews16[1];
            subViews.push.apply(subViews, [inputView].concat(_toConsumableArray(inputSubViews)));
            inputViewId = inputView.id;
          }
          if (output && output.length > 0) {
            var _this$extractSubViews17 = this.extractSubViews(output[0], parentId, context, "".concat(currentPath, "/").concat(context.name, ":").concat(curRpc.arg)),
              _this$extractSubViews18 = _slicedToArray(_this$extractSubViews17, 2),
              outputView = _this$extractSubViews18[0],
              outputSubViews = _this$extractSubViews18[1];
            subViews.push.apply(subViews, [outputView].concat(_toConsumableArray(outputSubViews)));
            outputViewId = outputView.id;
          }
          var element = {
            uiType: 'rpc',
            id: parentId === 0 ? "".concat(context.name, ":").concat(curRpc.arg) : curRpc.arg,
            label: curRpc.arg,
            path: currentPath,
            module: context.name || module.name || '',
            config: rpcConfig,
            description: rpcDescription,
            inputViewId: inputViewId,
            outputViewId: outputViewId
          };
          accRpc.push(element);
          return accRpc;
        }.bind(this), [])));
      }
      // if (!statement.arg) {
      //   console.error(new Error(`Module: [${context.name}]. Found statement without name.`));
      // }
      var whenParsed = undefined;
      try {
        whenParsed = whenCondition && Object(_whenParser__WEBPACK_IMPORTED_MODULE_5__["parseWhen"])(whenCondition) || undefined;
      } catch (e) {
        //console.error(new Error(`Module: [${context.name}]. Found invalid when condition: ${whenCondition}`));
      }
      var viewSpec = {
        id: String(currentId),
        parentView: String(parentId),
        ns: context.name,
        name: statement.arg != null ? statement.arg : undefined,
        title: statement.arg != null ? statement.arg : undefined,
        language: 'en-us',
        canEdit: false,
        config: config,
        ifFeature: ifFeature,
        when: whenParsed,
        elements: elements.reduce(function (acc, cur) {
          _newArrowCheck(this, _this19);
          acc[cur.id] = cur;
          return acc;
        }.bind(this), {})
      };
      // evaluate canEdit depending on all conditions
      Object.defineProperty(viewSpec, 'canEdit', {
        get: function get() {
          var _this21 = this;
          _newArrowCheck(this, _this19);
          return Object.keys(viewSpec.elements).some(function (key) {
            _newArrowCheck(this, _this21);
            var elm = viewSpec.elements[key];
            return !Object(_models_uiModels__WEBPACK_IMPORTED_MODULE_3__["isViewElementObjectOrList"])(elm) && elm.config;
          }.bind(this));
        }.bind(this)
      });
      // merge in all uses references and resolve groupings
      var usesRefs = this.extractNodes(statement, 'uses');
      if (usesRefs && usesRefs.length > 0) {
        viewSpec.uses = viewSpec.uses || [];
        var resolveFunctions = [];
        var _loop = function _loop() {
          var _this23 = this;
          var groupingName = usesRefs[i].arg;
          if (!groupingName) {
            throw new Error("Module: [".concat(context.name, "]. Found an uses statement without a grouping name."));
          }
          viewSpec.uses.push(_this19.resolveReferencePath(groupingName, context));
          resolveFunctions.push(function (parentElementPath) {
            var _this24 = this;
            _newArrowCheck(this, _this23);
            var groupingViewSpec = _this19.resolveGrouping(groupingName, context);
            if (groupingViewSpec) {
              // resolve recursive
              var resolveFunc = groupingViewSpec.uses && groupingViewSpec.uses[_models_uiModels__WEBPACK_IMPORTED_MODULE_3__["ResolveFunction"]];
              resolveFunc && resolveFunc(parentElementPath);
              Object.keys(groupingViewSpec.elements).forEach(function (key) {
                _newArrowCheck(this, _this24);
                var elm = groupingViewSpec.elements[key];
                // a useRef on root level need a namespace
                var resolvedWhen = elm.when && groupingViewSpec.when ? {
                  type: _whenParser__WEBPACK_IMPORTED_MODULE_5__["WhenTokenType"].AND,
                  left: elm.when,
                  right: groupingViewSpec.when
                } : elm.when || groupingViewSpec.when;
                var resolvedIfFeature = elm.ifFeature ? "(".concat(groupingViewSpec.ifFeature, ") and (").concat(elm.ifFeature, ")") : groupingViewSpec.ifFeature;
                viewSpec.elements[parentId === 0 ? "".concat(module.name, ":").concat(key) : key] = Object.assign(Object.assign({}, elm), {
                  when: resolvedWhen,
                  ifFeature: resolvedIfFeature
                });
              }.bind(this));
            }
          }.bind(this));
        };
        for (var i = 0; i < usesRefs.length; ++i) {
          _loop();
        }
        viewSpec.uses[_models_uiModels__WEBPACK_IMPORTED_MODULE_3__["ResolveFunction"]] = function (parentElementPath) {
          var _this22 = this;
          _newArrowCheck(this, _this19);
          var currentElementPath = "".concat(parentElementPath, " -> ").concat(viewSpec.ns, ":").concat(viewSpec.name);
          resolveFunctions.forEach(function (resolve) {
            _newArrowCheck(this, _this22);
            try {
              resolve(currentElementPath);
            } catch (error) {
              console.error(error);
            }
          }.bind(this));
          // console.log("Resolved "+currentElementPath, viewSpec);
          if (viewSpec === null || viewSpec === void 0 ? void 0 : viewSpec.uses) {
            viewSpec.uses[_models_uiModels__WEBPACK_IMPORTED_MODULE_3__["ResolveFunction"]] = undefined;
          }
        }.bind(this);
        this._groupingsToResolve.push(viewSpec);
      }
      return [viewSpec, subViews];
    }
    /** Extracts the UI View from the type in the cur statement. */
  }, {
    key: "getViewElement",
    value: function getViewElement(cur, module, parentId, currentPath, isList) {
      var _this25 = this;
      var type = this.extractValue(cur, 'type');
      var defaultVal = this.extractValue(cur, 'default') || undefined;
      var description = this.extractValue(cur, 'description') || undefined;
      var configValue = this.extractValue(cur, 'config');
      var config = configValue == null ? true : configValue.toLocaleLowerCase() !== 'false';
      var extractRange = function extractRange(min, max) {
        var _this26 = this;
        var property = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'range';
        _newArrowCheck(this, _this25);
        var ranges = this.extractValue(this.extractNodes(cur, 'type')[0], property) || undefined;
        var range = ranges === null || ranges === void 0 ? void 0 : ranges.replace(/min/i, String(min)).replace(/max/i, String(max)).split('|').map(function (r) {
          _newArrowCheck(this, _this26);
          var minValue;
          var maxValue;
          if (r.indexOf('..') > -1) {
            var _r$split = r.split('..'),
              _r$split2 = _slicedToArray(_r$split, 2),
              minStr = _r$split2[0],
              maxStr = _r$split2[1];
            minValue = Number(minStr);
            maxValue = Number(maxStr);
          } else if (!isNaN(maxValue = Number(r && r.trim()))) {
            minValue = maxValue;
          } else {
            minValue = min, maxValue = max;
          }
          if (minValue > min) min = minValue;
          if (maxValue < max) max = maxValue;
          return {
            min: minValue,
            max: maxValue
          };
        }.bind(this));
        return {
          min: min,
          max: max,
          expression: range && range.length === 1 ? range[0] : range && range.length > 1 ? {
            operation: 'OR',
            arguments: range
          } : undefined
        };
      }.bind(this);
      var extractPattern = function extractPattern() {
        var _this27 = this;
        _newArrowCheck(this, _this25);
        // 2023.01.26 decision MF & SKO: we will no longer remove the backslashes from the pattern, seems to be a bug in the original code
        var pattern = this.extractNodes(this.extractNodes(cur, 'type')[0], 'pattern').map(function (p) {
          _newArrowCheck(this, _this27);
          return p.arg;
        }.bind(this)).filter(function (p) {
          _newArrowCheck(this, _this27);
          return !!p;
        }.bind(this)).map(function (p) {
          _newArrowCheck(this, _this27);
          return "^".concat(p /*.replace(/(?:\\(.))/g, '$1')*/, "$");
        }.bind(this));
        return pattern && pattern.length == 1 ? new RegExp(pattern[0]) : pattern && pattern.length > 1 ? {
          operation: 'AND',
          arguments: pattern.map(function (p) {
            _newArrowCheck(this, _this27);
            return new RegExp(p);
          }.bind(this))
        } : undefined;
      }.bind(this);
      var mandatory = this.extractValue(cur, 'mandatory') === 'true' || false;
      if (!cur.arg) {
        throw new Error("Module: [".concat(module.name, "]. Found element without name."));
      }
      if (!type) {
        throw new Error("Module: [".concat(module.name, "].[").concat(cur.arg, "]. Found element without type."));
      }
      var element = {
        id: parentId === 0 ? "".concat(module.name, ":").concat(cur.arg) : cur.arg,
        label: cur.arg,
        path: currentPath,
        module: module.name || '',
        config: config,
        mandatory: mandatory,
        isList: isList,
        default: defaultVal,
        description: description
      };
      if (type === 'string') {
        var length = extractRange(0, +18446744073709551615, 'length');
        return Object.assign(Object.assign({}, element), {
          uiType: 'string',
          length: length.expression,
          pattern: extractPattern()
        });
      } else if (type === 'boolean') {
        return Object.assign(Object.assign({}, element), {
          uiType: 'boolean'
        });
      } else if (type === 'uint8') {
        var range = extractRange(0, +255);
        return Object.assign(Object.assign({}, element), {
          uiType: 'number',
          range: range.expression,
          min: range.min,
          max: range.max,
          units: this.extractValue(cur, 'units') || undefined,
          format: this.extractValue(cur, 'format') || undefined
        });
      } else if (type === 'uint16') {
        var _range = extractRange(0, +65535);
        return Object.assign(Object.assign({}, element), {
          uiType: 'number',
          range: _range.expression,
          min: _range.min,
          max: _range.max,
          units: this.extractValue(cur, 'units') || undefined,
          format: this.extractValue(cur, 'format') || undefined
        });
      } else if (type === 'uint32') {
        var _range2 = extractRange(0, +4294967295);
        return Object.assign(Object.assign({}, element), {
          uiType: 'number',
          range: _range2.expression,
          min: _range2.min,
          max: _range2.max,
          units: this.extractValue(cur, 'units') || undefined,
          format: this.extractValue(cur, 'format') || undefined
        });
      } else if (type === 'uint64') {
        var _range3 = extractRange(0, +18446744073709551615);
        return Object.assign(Object.assign({}, element), {
          uiType: 'number',
          range: _range3.expression,
          min: _range3.min,
          max: _range3.max,
          units: this.extractValue(cur, 'units') || undefined,
          format: this.extractValue(cur, 'format') || undefined
        });
      } else if (type === 'int8') {
        var _range4 = extractRange(-128, +127);
        return Object.assign(Object.assign({}, element), {
          uiType: 'number',
          range: _range4.expression,
          min: _range4.min,
          max: _range4.max,
          units: this.extractValue(cur, 'units') || undefined,
          format: this.extractValue(cur, 'format') || undefined
        });
      } else if (type === 'int16') {
        var _range5 = extractRange(-32768, +32767);
        return Object.assign(Object.assign({}, element), {
          uiType: 'number',
          range: _range5.expression,
          min: _range5.min,
          max: _range5.max,
          units: this.extractValue(cur, 'units') || undefined,
          format: this.extractValue(cur, 'format') || undefined
        });
      } else if (type === 'int32') {
        var _range6 = extractRange(-2147483648, +2147483647);
        return Object.assign(Object.assign({}, element), {
          uiType: 'number',
          range: _range6.expression,
          min: _range6.min,
          max: _range6.max,
          units: this.extractValue(cur, 'units') || undefined,
          format: this.extractValue(cur, 'format') || undefined
        });
      } else if (type === 'int64') {
        var _range7 = extractRange(-9223372036854775808, +9223372036854775807);
        return Object.assign(Object.assign({}, element), {
          uiType: 'number',
          range: _range7.expression,
          min: _range7.min,
          max: _range7.max,
          units: this.extractValue(cur, 'units') || undefined,
          format: this.extractValue(cur, 'format') || undefined
        });
      } else if (type === 'decimal64') {
        // decimalRange
        var fDigits = Number(this.extractValue(this.extractNodes(cur, 'type')[0], 'fraction-digits')) || -1;
        if (fDigits === -1) {
          throw new Error("Module: [".concat(module.name, "][").concat(currentPath, "][").concat(cur.arg, "]. Found decimal64 with invalid fraction-digits."));
        }
        var _range8 = extractRange(YangParser.decimalRange[fDigits].min, YangParser.decimalRange[fDigits].max);
        return Object.assign(Object.assign({}, element), {
          uiType: 'number',
          fDigits: fDigits,
          range: _range8.expression,
          min: _range8.min,
          max: _range8.max,
          units: this.extractValue(cur, 'units') || undefined,
          format: this.extractValue(cur, 'format') || undefined
        });
      } else if (type === 'enumeration') {
        var typeNode = this.extractNodes(cur, 'type')[0];
        var enumNodes = this.extractNodes(typeNode, 'enum');
        return Object.assign(Object.assign({}, element), {
          uiType: 'selection',
          options: enumNodes.reduce(function (acc, enumNode) {
            _newArrowCheck(this, _this25);
            if (!enumNode.arg) {
              throw new Error("Module: [".concat(module.name, "][").concat(currentPath, "][").concat(cur.arg, "]. Found option without name."));
            }
            // const ifClause = this.extractValue(enumNode, 'if-feature');
            var value = this.extractValue(enumNode, 'value');
            var enumOption = {
              key: enumNode.arg,
              value: value != null ? value : enumNode.arg,
              description: this.extractValue(enumNode, 'description') || undefined
            };
            // todo: ❗ handle the if clause ⚡
            acc.push(enumOption);
            return acc;
          }.bind(this), [])
        });
      } else if (type === 'leafref') {
        var _typeNode = this.extractNodes(cur, 'type')[0];
        var vPath = this.extractValue(_typeNode, 'path');
        if (!vPath) {
          throw new Error("Module: [".concat(module.name, "][").concat(currentPath, "][").concat(cur.arg, "]. Found leafref without path."));
        }
        var refPath = this.resolveReferencePath(vPath, module);
        var resolve = this.resolveReference.bind(this);
        var res = Object.assign(Object.assign({}, element), {
          uiType: 'reference',
          referencePath: refPath,
          ref: function ref(basePath) {
            var elementPath = "".concat(basePath, "/").concat(cur.arg);
            var result = resolve(refPath, elementPath);
            if (!result) return undefined;
            var _result = _slicedToArray(result, 2),
              resolvedElement = _result[0],
              resolvedPath = _result[1];
            return resolvedElement && [Object.assign(Object.assign({}, resolvedElement), {
              id: this.id,
              label: this.label,
              config: this.config,
              mandatory: this.mandatory,
              isList: this.isList,
              default: this.default,
              description: this.description
            }), resolvedPath] || undefined;
          }
        });
        return res;
      } else if (type === 'identityref') {
        var _typeNode2 = this.extractNodes(cur, 'type')[0];
        var base = this.extractValue(_typeNode2, 'base');
        if (!base) {
          throw new Error("Module: [".concat(module.name, "][").concat(currentPath, "][").concat(cur.arg, "]. Found identityref without base."));
        }
        var _res = Object.assign(Object.assign({}, element), {
          uiType: 'selection',
          options: []
        });
        this._identityToResolve.push(function () {
          var _this28 = this;
          _newArrowCheck(this, _this25);
          var identity = this.resolveIdentity(base, module);
          if (!identity) {
            throw new Error("Module: [".concat(module.name, "][").concat(currentPath, "][").concat(cur.arg, "]. Could not resolve identity [").concat(base, "]."));
          }
          if (!identity.values || identity.values.length === 0) {
            throw new Error("Identity: [".concat(base, "] has no values."));
          }
          _res.options = identity.values.map(function (val) {
            _newArrowCheck(this, _this28);
            return {
              key: val.id,
              value: val.id,
              description: val.description
            };
          }.bind(this));
        }.bind(this));
        return _res;
      } else if (type === 'empty') {
        // todo: ❗ handle empty ⚡
        /*  9.11.  The empty Built-In Type
            The empty built-in type represents a leaf that does not have any
            value, it conveys information by its presence or absence. */
        return Object.assign(Object.assign({}, element), {
          uiType: 'empty'
        });
      } else if (type === 'union') {
        // todo: ❗ handle union ⚡
        /* 9.12.  The union Built-In Type */
        var _typeNode3 = this.extractNodes(cur, 'type')[0];
        var typeNodes = this.extractNodes(_typeNode3, 'type');
        var resultingElement = Object.assign(Object.assign({}, element), {
          uiType: 'union',
          elements: []
        });
        var resolveUnion = function resolveUnion() {
          var _resultingElement$ele,
            _this29 = this;
          _newArrowCheck(this, _this25);
          (_resultingElement$ele = resultingElement.elements).push.apply(_resultingElement$ele, _toConsumableArray(typeNodes.map(function (node) {
            var _this30 = this;
            _newArrowCheck(this, _this29);
            var _a;
            var stm = Object.assign(Object.assign({}, cur), {
              sub: [].concat(_toConsumableArray(((_a = cur.sub) === null || _a === void 0 ? void 0 : _a.filter(function (s) {
                _newArrowCheck(this, _this30);
                return s.key !== 'type';
              }.bind(this))) || []), [node])
            });
            return Object.assign(Object.assign({}, this.getViewElement(stm, module, parentId, currentPath, isList)), {
              id: node.arg
            });
          }.bind(this))));
        }.bind(this);
        this._unionsToResolve.push(resolveUnion);
        return resultingElement;
      } else if (type === 'bits') {
        var _typeNode4 = this.extractNodes(cur, 'type')[0];
        var bitNodes = this.extractNodes(_typeNode4, 'bit');
        return Object.assign(Object.assign({}, element), {
          uiType: 'bits',
          flags: bitNodes.reduce(function (acc, bitNode) {
            _newArrowCheck(this, _this25);
            if (!bitNode.arg) {
              throw new Error("Module: [".concat(module.name, "][").concat(currentPath, "][").concat(cur.arg, "]. Found bit without name."));
            }
            // const ifClause = this.extractValue(bitNode, 'if-feature');
            var pos = Number(this.extractValue(bitNode, 'position'));
            acc[bitNode.arg] = pos === pos ? pos : undefined;
            return acc;
          }.bind(this), {})
        });
      } else if (type === 'binary') {
        return Object.assign(Object.assign({}, element), {
          uiType: 'binary',
          length: extractRange(0, +18446744073709551615, 'length')
        });
      } else if (type === 'instance-identifier') {
        // https://tools.ietf.org/html/rfc7950#page-168
        return Object.assign(Object.assign({}, element), {
          uiType: 'string',
          length: extractRange(0, +18446744073709551615, 'length')
        });
      } else {
        // not a build in type, need to resolve type
        var typeRef = this.resolveType(type, module);
        // if (typeRef == null) 
        // console.error(new Error(`Could not resolve type ${type} in [${module.name}][${currentPath}].`));
        if (Object(_models_uiModels__WEBPACK_IMPORTED_MODULE_3__["isViewElementString"])(typeRef)) {
          typeRef = this.resolveStringType(typeRef, extractPattern(), extractRange(0, +18446744073709551615));
        } else if (Object(_models_uiModels__WEBPACK_IMPORTED_MODULE_3__["isViewElementNumber"])(typeRef)) {
          typeRef = this.resolveNumberType(typeRef, extractRange(typeRef.min, typeRef.max));
        }
        var _res2 = {
          id: element.id
        };
        this._typeRefToResolve.push(function () {
          _newArrowCheck(this, _this25);
          // spoof date type here from special string type
          if ((type === 'date-and-time' || type.endsWith(':date-and-time')) && typeRef.module === 'ietf-yang-types') {
            Object.assign(_res2, Object.assign(Object.assign(Object.assign({}, typeRef), element), {
              description: description,
              uiType: 'date'
            }));
          } else {
            Object.assign(_res2, Object.assign(Object.assign(Object.assign({}, typeRef), element), {
              description: description
            }));
          }
        }.bind(this));
        return _res2;
      }
    }
  }, {
    key: "resolveStringType",
    value: function resolveStringType(parentElement, pattern, length) {
      return Object.assign(Object.assign({}, parentElement), {
        pattern: pattern != null && parentElement.pattern ? {
          operation: 'AND',
          arguments: [pattern, parentElement.pattern]
        } : parentElement.pattern ? parentElement.pattern : pattern,
        length: length.expression != null && parentElement.length ? {
          operation: 'AND',
          arguments: [length.expression, parentElement.length]
        } : parentElement.length ? parentElement.length : length === null || length === void 0 ? void 0 : length.expression
      });
    }
  }, {
    key: "resolveNumberType",
    value: function resolveNumberType(parentElement, range) {
      return Object.assign(Object.assign({}, parentElement), {
        range: range.expression != null && parentElement.range ? {
          operation: 'AND',
          arguments: [range.expression, parentElement.range]
        } : parentElement.range ? parentElement.range : range,
        min: range.min,
        max: range.max
      });
    }
  }, {
    key: "resolveReferencePath",
    value: function resolveReferencePath(vPath, module) {
      var _this31 = this;
      var vPathParser = /(?:(?:([^\/\:]+):)?([^\/]+))/g; // 1 = opt: namespace / 2 = property
      return vPath.replace(vPathParser, function (_, ns, property) {
        _newArrowCheck(this, _this31);
        var nameSpace = ns && module.imports[ns] || module.name;
        return "".concat(nameSpace, ":").concat(property);
      }.bind(this));
    }
  }, {
    key: "resolveReference",
    value: function resolveReference(vPath, currentPath) {
      var _this32 = this;
      var vPathParser = /(?:(?:([^\/\[\]\:]+):)?([^\/\[\]]+)(\[[^\]]+\])?)/g; // 1 = opt: namespace / 2 = property / 3 = opt: indexPath
      var element = null;
      var moduleName = '';
      var vPathParts = splitVPath(vPath, vPathParser).map(function (p) {
        _newArrowCheck(this, _this32);
        return {
          ns: p[1],
          property: p[2],
          ind: p[3]
        };
      }.bind(this));
      var resultPathParts = !vPath.startsWith('/') ? splitVPath(currentPath, vPathParser).map(function (p) {
        _newArrowCheck(this, _this32);
        moduleName = p[1] || moduleName;
        return {
          ns: moduleName,
          property: p[2],
          ind: p[3]
        };
      }.bind(this)) : [];
      for (var i = 0; i < vPathParts.length; ++i) {
        var vPathPart = vPathParts[i];
        if (vPathPart.property === '..') {
          resultPathParts.pop();
        } else if (vPathPart.property !== '.') {
          resultPathParts.push(vPathPart);
        }
      }
      // resolve element by path
      for (var j = 0; j < resultPathParts.length; ++j) {
        var pathPart = resultPathParts[j];
        if (j === 0) {
          moduleName = pathPart.ns;
          var rootModule = this._modules[moduleName];
          if (!rootModule) throw new Error('Could not resolve module [' + moduleName + '].\r\n' + vPath);
          element = rootModule.elements["".concat(pathPart.ns, ":").concat(pathPart.property)];
        } else if (element && Object(_models_uiModels__WEBPACK_IMPORTED_MODULE_3__["isViewElementObjectOrList"])(element)) {
          var view = this._views[+element.viewId];
          if (moduleName !== pathPart.ns) {
            moduleName = pathPart.ns;
          }
          element = view.elements[pathPart.property] || view.elements["".concat(moduleName, ":").concat(pathPart.property)];
        } else {
          throw new Error('Could not resolve reference.\r\n' + vPath);
        }
        if (!element) throw new Error('Could not resolve path [' + pathPart.property + '] in [' + currentPath + '] \r\n' + vPath);
      }
      moduleName = ''; // create the vPath for the resolved element, do not add the element itself this will be done later in the res(...) function
      return [element, resultPathParts.slice(0, -1).map(function (p) {
        _newArrowCheck(this, _this32);
        return "".concat(moduleName !== p.ns ? "".concat(moduleName = p.ns, ":") : '').concat(p.property).concat(p.ind || '');
      }.bind(this)).join('/')];
    }
  }, {
    key: "resolveView",
    value: function resolveView(vPath) {
      var vPathParser = /(?:(?:([^\/\[\]\:]+):)?([^\/\[\]]+)(\[[^\]]+\])?)/g; // 1 = opt: namespace / 2 = property / 3 = opt: indexPath
      var element = null;
      var partMatch;
      var view = null;
      var moduleName = '';
      if (vPath) do {
        partMatch = vPathParser.exec(vPath);
        if (partMatch) {
          if (element === null) {
            moduleName = partMatch[1];
            var rootModule = this._modules[moduleName];
            if (!rootModule) return null;
            element = rootModule.elements["".concat(moduleName, ":").concat(partMatch[2])];
          } else if (Object(_models_uiModels__WEBPACK_IMPORTED_MODULE_3__["isViewElementObjectOrList"])(element)) {
            view = this._views[+element.viewId];
            if (moduleName !== partMatch[1]) {
              moduleName = partMatch[1];
              element = view.elements["".concat(moduleName, ":").concat(partMatch[2])];
            } else {
              element = view.elements[partMatch[2]];
            }
          } else {
            return null;
          }
          if (!element) return null;
        }
      } while (partMatch);
      return element && Object(_models_uiModels__WEBPACK_IMPORTED_MODULE_3__["isViewElementObjectOrList"])(element) && this._views[+element.viewId] || null;
    }
  }, {
    key: "resolveType",
    value: function resolveType(type, module) {
      var colonInd = type.indexOf(':');
      var preFix = colonInd > -1 ? type.slice(0, colonInd) : '';
      var typeName = colonInd > -1 ? type.slice(colonInd + 1) : type;
      var res = preFix ? this._modules[module.imports[preFix]].typedefs[typeName] : module.typedefs[typeName];
      return res;
    }
  }, {
    key: "resolveGrouping",
    value: function resolveGrouping(grouping, module) {
      var collonInd = grouping.indexOf(':');
      var preFix = collonInd > -1 ? grouping.slice(0, collonInd) : '';
      var groupingName = collonInd > -1 ? grouping.slice(collonInd + 1) : grouping;
      return preFix ? this._modules[module.imports[preFix]].groupings[groupingName] : module.groupings[groupingName];
    }
  }, {
    key: "resolveIdentity",
    value: function resolveIdentity(identity, module) {
      var collonInd = identity.indexOf(':');
      var preFix = collonInd > -1 ? identity.slice(0, collonInd) : '';
      var identityName = collonInd > -1 ? identity.slice(collonInd + 1) : identity;
      return preFix ? this._modules[module.imports[preFix]].identities[identityName] : module.identities[identityName];
    }
  }]);
}();
YangParser.ResolveStack = Symbol('ResolveStack');
// https://tools.ietf.org/html/rfc7950#section-9.3.4
YangParser.decimalRange = [{
  min: -9223372036854775808,
  max: 9223372036854775807
}, {
  min: -922337203685477580.8,
  max: 922337203685477580.7
}, {
  min: -92233720368547758.08,
  max: 92233720368547758.07
}, {
  min: -9223372036854775.808,
  max: 9223372036854775.807
}, {
  min: -922337203685477.5808,
  max: 922337203685477.5807
}, {
  min: -92233720368547.75808,
  max: 92233720368547.75807
}, {
  min: -9223372036854.775808,
  max: 9223372036854.775807
}, {
  min: -922337203685.4775808,
  max: 922337203685.4775807
}, {
  min: -92233720368.54775808,
  max: 92233720368.54775807
}, {
  min: -9223372036.854775808,
  max: 9223372036.854775807
}, {
  min: -922337203.6854775808,
  max: 922337203.6854775807
}, {
  min: -92233720.36854775808,
  max: 92233720.36854775807
}, {
  min: -9223372.036854775808,
  max: 9223372.036854775807
}, {
  min: -922337.2036854775808,
  max: 922337.2036854775807
}, {
  min: -92233.72036854775808,
  max: 92233.72036854775807
}, {
  min: -9223.372036854775808,
  max: 9223.372036854775807
}, {
  min: -922.3372036854775808,
  max: 922.3372036854775807
}, {
  min: -92.23372036854775808,
  max: 92.23372036854775807
}, {
  min: -9.223372036854775808,
  max: 9.223372036854775807
}];

/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("./pluginConfiguration.tsx");


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
//# sourceMappingURL=configurationApp.js.map