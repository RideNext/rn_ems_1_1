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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
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
var action_1 = require("../../flux/action");
var errorActions_1 = require("../../actions/errorActions");
exports.RowDisabled = Symbol("RowDisabled");
function createExternal(callback, selectState, disableRow) {
    //#region Actions
    var TableAction = /** @class */ (function (_super) {
        __extends(TableAction, _super);
        function TableAction() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return TableAction;
    }(action_1.Action));
    var RequestSortAction = /** @class */ (function (_super) {
        __extends(RequestSortAction, _super);
        function RequestSortAction(orderBy) {
            var _this = _super.call(this) || this;
            _this.orderBy = orderBy;
            return _this;
        }
        return RequestSortAction;
    }(TableAction));
    var RequestExplicitSortAction = /** @class */ (function (_super) {
        __extends(RequestExplicitSortAction, _super);
        function RequestExplicitSortAction(propertyName, sortOrder) {
            var _this = _super.call(this) || this;
            _this.propertyName = propertyName;
            _this.sortOrder = sortOrder;
            return _this;
        }
        return RequestExplicitSortAction;
    }(TableAction));
    var SetSelectedAction = /** @class */ (function (_super) {
        __extends(SetSelectedAction, _super);
        function SetSelectedAction(selected) {
            var _this = _super.call(this) || this;
            _this.selected = selected;
            return _this;
        }
        return SetSelectedAction;
    }(TableAction));
    var SetPageAction = /** @class */ (function (_super) {
        __extends(SetPageAction, _super);
        function SetPageAction(page) {
            var _this = _super.call(this) || this;
            _this.page = page;
            return _this;
        }
        return SetPageAction;
    }(TableAction));
    var SetRowsPerPageAction = /** @class */ (function (_super) {
        __extends(SetRowsPerPageAction, _super);
        function SetRowsPerPageAction(rowsPerPage) {
            var _this = _super.call(this) || this;
            _this.rowsPerPage = rowsPerPage;
            return _this;
        }
        return SetRowsPerPageAction;
    }(TableAction));
    var SetPreFilterChangedAction = /** @class */ (function (_super) {
        __extends(SetPreFilterChangedAction, _super);
        function SetPreFilterChangedAction(preFilter) {
            var _this = _super.call(this) || this;
            _this.preFilter = preFilter;
            return _this;
        }
        return SetPreFilterChangedAction;
    }(TableAction));
    var SetFilterChangedAction = /** @class */ (function (_super) {
        __extends(SetFilterChangedAction, _super);
        function SetFilterChangedAction(filter) {
            var _this = _super.call(this) || this;
            _this.filter = filter;
            return _this;
        }
        return SetFilterChangedAction;
    }(TableAction));
    var SetShowFilterAction = /** @class */ (function (_super) {
        __extends(SetShowFilterAction, _super);
        function SetShowFilterAction(show) {
            var _this = _super.call(this) || this;
            _this.show = show;
            return _this;
        }
        return SetShowFilterAction;
    }(TableAction));
    var RefreshAction = /** @class */ (function (_super) {
        __extends(RefreshAction, _super);
        function RefreshAction() {
            return _super.call(this) || this;
        }
        return RefreshAction;
    }(TableAction));
    var SetResultAction = /** @class */ (function (_super) {
        __extends(SetResultAction, _super);
        function SetResultAction(result) {
            var _this = _super.call(this) || this;
            _this.result = result;
            return _this;
        }
        return SetResultAction;
    }(TableAction));
    var HideColumnsAction = /** @class */ (function (_super) {
        __extends(HideColumnsAction, _super);
        function HideColumnsAction(property) {
            var _this = _super.call(this) || this;
            _this.property = property;
            return _this;
        }
        return HideColumnsAction;
    }(TableAction));
    var ShowColumnsAction = /** @class */ (function (_super) {
        __extends(ShowColumnsAction, _super);
        function ShowColumnsAction(property) {
            var _this = _super.call(this) || this;
            _this.property = property;
            return _this;
        }
        return ShowColumnsAction;
    }(TableAction));
    // #endregion
    //#region Action Handler
    var externalTableStateInit = {
        order: 'asc',
        orderBy: null,
        selected: null,
        hiddenColumns: [],
        rows: [],
        total: 0,
        page: 0,
        rowsPerPage: 10,
        loading: false,
        showFilter: false,
        filter: {},
        preFilter: {}
    };
    var externalTableStateActionHandler = function (state, action) {
        if (state === void 0) { state = externalTableStateInit; }
        if (!(action instanceof TableAction))
            return state;
        if (action instanceof RefreshAction) {
            state = __assign(__assign({}, state), { loading: true });
        }
        else if (action instanceof SetResultAction) {
            state = __assign(__assign({}, state), { loading: false, rows: disableRow
                    ? action.result.rows.map(function (row) {
                        var _a;
                        return (__assign(__assign({}, row), (_a = {}, _a[exports.RowDisabled] = disableRow(row), _a)));
                    })
                    : action.result.rows, total: action.result.total, page: action.result.page });
        }
        else if (action instanceof RequestSortAction) {
            state = __assign(__assign({}, state), { loading: true, orderBy: state.orderBy === action.orderBy && state.order === 'desc' ? null : action.orderBy, order: state.orderBy === action.orderBy && state.order === 'asc' ? 'desc' : 'asc' });
        }
        else if (action instanceof RequestExplicitSortAction) {
            state = __assign(__assign({}, state), { loading: true, orderBy: action.propertyName, order: action.sortOrder });
        }
        else if (action instanceof SetShowFilterAction) {
            state = __assign(__assign({}, state), { loading: true, showFilter: action.show });
        }
        else if (action instanceof SetPreFilterChangedAction) {
            state = __assign(__assign({}, state), { loading: true, preFilter: action.preFilter });
        }
        else if (action instanceof SetFilterChangedAction) {
            state = __assign(__assign({}, state), { loading: true, filter: action.filter });
        }
        else if (action instanceof SetPageAction) {
            state = __assign(__assign({}, state), { loading: true, page: action.page });
        }
        else if (action instanceof SetRowsPerPageAction) {
            state = __assign(__assign({}, state), { loading: true, rowsPerPage: action.rowsPerPage });
        }
        else if (action instanceof HideColumnsAction) {
            //merge arrays, remove duplicates
            var newArray = __spreadArrays(new Set(__spreadArrays(state.hiddenColumns, action.property)));
            state = __assign(__assign({}, state), { hiddenColumns: newArray });
        }
        else if (action instanceof ShowColumnsAction) {
            var newArray = state.hiddenColumns.filter(function (el) { return !action.property.includes(el); });
            state = __assign(__assign({}, state), { hiddenColumns: newArray });
        }
        return state;
    };
    //const createTableAction(tableAction)
    //#endregion
    var reloadAction = function (dispatch, getAppState) {
        dispatch(new RefreshAction());
        var ownState = selectState(getAppState());
        var filter = __assign(__assign({}, ownState.preFilter), (ownState.showFilter && ownState.filter || {}));
        return Promise.resolve(callback(ownState.page, ownState.rowsPerPage, ownState.orderBy, ownState.order, filter)).then(function (result) {
            if (ownState.page > 0 && ownState.rowsPerPage * ownState.page > result.total) { //if result is smaller than the currently shown page, new search and repaginate
                var newPage = Math.floor(result.total / ownState.rowsPerPage);
                Promise.resolve(callback(newPage, ownState.rowsPerPage, ownState.orderBy, ownState.order, filter)).then(function (result1) {
                    dispatch(new SetResultAction(result1));
                });
            }
            else {
                dispatch(new SetResultAction(result));
            }
        })["catch"](function (error) { return dispatch(new errorActions_1.AddErrorInfoAction(error)); });
    };
    var createPreActions = function (dispatch, skipRefresh) {
        if (skipRefresh === void 0) { skipRefresh = false; }
        return {
            onPreFilterChanged: function (preFilter) {
                dispatch(new SetPreFilterChangedAction(preFilter));
                (!skipRefresh) && dispatch(reloadAction);
            }
        };
    };
    var createActions = function (dispatch, skipRefresh) {
        if (skipRefresh === void 0) { skipRefresh = false; }
        return {
            onRefresh: function () {
                dispatch(reloadAction);
            },
            onHandleRequestSort: function (orderBy) {
                dispatch(function (dispatch) {
                    dispatch(new RequestSortAction(orderBy));
                    (!skipRefresh) && dispatch(reloadAction);
                });
            },
            onHandleExplicitRequestSort: function (property, sortOrder) {
                dispatch(function (dispatch) {
                    dispatch(new RequestExplicitSortAction(property, sortOrder));
                    (!skipRefresh) && dispatch(reloadAction);
                });
            },
            onToggleFilter: function (refresh) {
                dispatch(function (dispatch, getAppState) {
                    var showFilter = selectState(getAppState()).showFilter;
                    dispatch(new SetShowFilterAction(!showFilter));
                    if (!skipRefresh && (refresh === undefined || refresh))
                        dispatch(reloadAction);
                });
            },
            onFilterChanged: function (property, filterTerm) {
                dispatch(function (dispatch, getAppState) {
                    var _a;
                    var filter = selectState(getAppState()).filter;
                    filter = __assign(__assign({}, filter), (_a = {}, _a[property] = filterTerm, _a));
                    dispatch(new SetFilterChangedAction(filter));
                    (!skipRefresh) && dispatch(reloadAction);
                });
            },
            onHandleChangePage: function (page) {
                dispatch(function (dispatch) {
                    dispatch(new SetPageAction(page));
                    (!skipRefresh) && dispatch(reloadAction);
                });
            },
            onHandleChangeRowsPerPage: function (rowsPerPage) {
                dispatch(function (dispatch) {
                    dispatch(new SetRowsPerPageAction(rowsPerPage || 10));
                    (!skipRefresh) && dispatch(reloadAction);
                });
            },
            onHideColumns: function (columnName) {
                dispatch(function (dispatch) {
                    dispatch(new HideColumnsAction(columnName));
                });
            },
            onShowColumns: function (columnName) {
                dispatch(function (dispatch) {
                    dispatch(new ShowColumnsAction(columnName));
                });
            },
            onClearFilters: function () {
                dispatch(function (dispatch) {
                    var filter = {};
                    dispatch(new SetFilterChangedAction(filter));
                });
            }
        };
    };
    var createProperties = function (state) {
        return __assign({}, selectState(state));
    };
    return {
        reloadAction: reloadAction,
        createActions: createActions,
        createProperties: createProperties,
        createPreActions: createPreActions,
        actionHandler: externalTableStateActionHandler
    };
}
exports.createExternal = createExternal;
