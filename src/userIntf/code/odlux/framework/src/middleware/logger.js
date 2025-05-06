"use strict";
exports.__esModule = true;
var LogLevel = +(localStorage.getItem('log.odlux.framework.middleware.logger') || 0);
function createLoggerMiddleware() {
    return function logger(_a) {
        var getState = _a.getState;
        return function (next) { return function (action) {
            if (LogLevel > 2)
                console.log('will dispatch', action);
            var returnValue = next(action);
            if (LogLevel > 2)
                console.log('state after dispatch', getState());
            return returnValue;
        }; };
    };
}
exports.logger = createLoggerMiddleware();
exports["default"] = exports.logger;
