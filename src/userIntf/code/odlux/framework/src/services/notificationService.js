"use strict";
exports.__esModule = true;
var websocketAction_1 = require("../actions/websocketAction");
var socketUrl = [location.protocol === 'https:' ? 'wss://' : 'ws://', location.hostname, ':', location.port, '/websocket'].join('');
var subscriptions = {};
var socketReady;
var wasWebsocketConnectionEstablished;
var applicationStore;
var areWebsocketsStoppedViaSettings = false;
function setCurrentSubscriptions(notificationSocket) {
    var scopesToSubscribe = Object.keys(subscriptions);
    if (notificationSocket.readyState === notificationSocket.OPEN) {
        var data = {
            'data': 'scopes',
            'scopes': [{
                    "schema": {
                        "namespace": "urn:opendaylight:params:xml:ns:yang:devicemanager",
                        "revision": "*",
                        "notification": scopesToSubscribe
                    }
                }]
        };
        notificationSocket.send(JSON.stringify(data));
        return true;
    }
    ;
    return false;
}
function addScope(scope, callback) {
    var scopes = scope instanceof Array ? scope : [scope];
    // send all new scopes to subscribe
    var newScopesToSubscribe = scopes.reduce(function (acc, cur) {
        var currentCallbacks = subscriptions[cur];
        if (currentCallbacks) {
            if (!currentCallbacks.some(function (c) { return c === callback; })) {
                currentCallbacks.push(callback);
            }
        }
        else {
            subscriptions[cur] = [callback];
            acc.push(cur);
        }
        return acc;
    }, []);
    if (newScopesToSubscribe.length === 0) {
        return true;
    }
    return false;
}
function removeScope(scope, callback) {
    var scopes = scope instanceof Array ? scope : [scope];
    scopes.forEach(function (s) {
        var callbacks = subscriptions[s];
        var index = callbacks && callbacks.indexOf(callback);
        if (index > -1) {
            callbacks.splice(index, 1);
        }
        if (callbacks.length === 0) {
            subscriptions[s] === undefined;
        }
    });
}
function subscribe(scope, callback) {
    addScope(scope, callback);
    return socketReady && socketReady.then(function (notificationSocket) {
        // send a subscription to all active scopes
        return setCurrentSubscriptions(notificationSocket);
    }) || true;
}
exports.subscribe = subscribe;
function unsubscribe(scope, callback) {
    removeScope(scope, callback);
    return socketReady && socketReady.then(function (notificationSocket) {
        // send a subscription to all active scopes
        return setCurrentSubscriptions(notificationSocket);
    }) || true;
}
exports.unsubscribe = unsubscribe;
exports.startNotificationService = function (store) {
    applicationStore = store;
};
var connect = function () {
    return new Promise(function (resolve, reject) {
        var notificationSocket = new WebSocket(socketUrl);
        notificationSocket.onmessage = function (event) {
            // process received event
            var _a;
            if (event.data && typeof event.data === "string") {
                var msg_1 = JSON.parse(event.data);
                var callbacks = ((_a = msg_1 === null || msg_1 === void 0 ? void 0 : msg_1.type) === null || _a === void 0 ? void 0 : _a.type) && subscriptions[msg_1.type.type];
                if (callbacks) {
                    callbacks.forEach(function (cb) {
                        // ensure all callbacks will be called
                        try {
                            return cb(msg_1);
                        }
                        catch (reason) {
                            console.error(reason);
                        }
                    });
                }
            }
        };
        notificationSocket.onerror = function (error) {
            console.log("Socket error:");
            console.log(error);
            reject("Socket error: " + error);
            if (applicationStore) {
                applicationStore.dispatch(new websocketAction_1.SetWebsocketAction(false));
            }
        };
        notificationSocket.onopen = function (event) {
            if (applicationStore) {
                applicationStore.dispatch(new websocketAction_1.SetWebsocketAction(true));
            }
            console.log("Socket connection opened.");
            resolve(notificationSocket);
            // send a subscription to all active scopes
            setCurrentSubscriptions(notificationSocket);
        };
        notificationSocket.onclose = function (event) {
            var _a;
            console.log("socket connection closed");
            dispatchSocketClose();
            var isUserLoggedIn = (applicationStore === null || applicationStore === void 0 ? void 0 : applicationStore.state.framework.authenticationState.user) && ((_a = applicationStore === null || applicationStore === void 0 ? void 0 : applicationStore.state.framework.authenticationState.user) === null || _a === void 0 ? void 0 : _a.isValid);
            if (isUserLoggedIn && !areWebsocketsStoppedViaSettings) {
                socketReady = connect();
            }
        };
    });
};
exports.startWebsocketSession = function () {
    socketReady = connect();
    areWebsocketsStoppedViaSettings = false;
};
exports.suspendWebsocketSession = function () {
    areWebsocketsStoppedViaSettings = true;
    closeSocket();
};
exports.endWebsocketSession = function () {
    closeSocket();
};
var closeSocket = function () {
    if (socketReady) {
        socketReady.then(function (websocket) {
            websocket.close();
        });
    }
    else {
        dispatchSocketClose();
    }
};
var dispatchSocketClose = function () {
    var _a;
    var isUserLoggedIn = (applicationStore === null || applicationStore === void 0 ? void 0 : applicationStore.state.framework.authenticationState.user) && ((_a = applicationStore === null || applicationStore === void 0 ? void 0 : applicationStore.state.framework.authenticationState.user) === null || _a === void 0 ? void 0 : _a.isValid);
    if (isUserLoggedIn) {
        applicationStore === null || applicationStore === void 0 ? void 0 : applicationStore.dispatch(new websocketAction_1.SetWebsocketAction(false));
    }
    else {
        applicationStore === null || applicationStore === void 0 ? void 0 : applicationStore.dispatch(new websocketAction_1.SetWebsocketAction(null));
    }
};
