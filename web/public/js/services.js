/**
 * Created with JetBrains WebStorm.
 * User: daniel
 * Date: 15-12-12
 * Time: 1:17
 * To change this template use File | Settings | File Templates.
 *
 */
app.factory('socket', function ($rootScope) {
    var socket = io.connect('http://localhost:9999');
    return {
        on: function (eventName, callback) {
            socket.on(eventName, function () {
                var args = arguments;
                //$rootScope.$apply(function () {
                    callback.apply(socket, args);
                //});
            });
        },
        emit: function (eventName, data, callback) {
            socket.emit(eventName, data, function () {
                var args = arguments;
                //$rootScope.$apply(function () {
                    if (callback) {
                        callback.apply(socket, args);
                    }
                //});
            });
        }
    };
});
