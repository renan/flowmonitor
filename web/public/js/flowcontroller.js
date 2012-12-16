/**
 * Created with JetBrains WebStorm.
 * User: daniel
 * Date: 15-12-12
 * Time: 1:18
 * To change this template use File | Settings | File Templates.
 */
function AppCtrl($scope, socket) {
    // Socket listeners
    // ================
    $scope.messages = [];
    $scope.servers = {};

    var serverIndex = 1;


    socket.on('init', function (data) {
        $scope.name = data.name;
        $scope.users = data.users;
    });

    socket.on('updatelog', function (serverip, message) {
        var mtx = JSON.parse(message);
        //$scope.messages.push(mtx);
        //console.log(mtx);

        var server = {
            id: serverIndex,
            ip: mtx.server_addr
        };
        if (typeof $scope.servers[server.ip] === 'undefined') {
            $scope.servers[server.ip] = server;
            serverIndex++;

            $scope.$apply();
        } else {

            var point_idl = [
                (new Date()).getTime(),
                parseFloat(mtx['idl'])
            ];
            var point_usr = [
                (new Date()).getTime(),
                parseFloat(mtx['usr'])
            ];
            var point_sys = [
                (new Date()).getTime(),
                parseFloat(mtx['sys'])
            ];
            var point_wai = [
                (new Date()).getTime(),
                parseFloat(mtx['wai'])
            ];
            // do not track more then 20 data points. (if you want highstock to work proper might wanne remove this again)
            shift = window.$['chart-' + $scope.servers[server.ip].id ].series[0].data.length > 20;
            shift = window.$['chart-' + $scope.servers[server.ip].id ].series[1].data.length > 20;
            shift = window.$['chart-' + $scope.servers[server.ip].id ].series[2].data.length > 20;
            shift = window.$['chart-' + $scope.servers[server.ip].id ].series[3].data.length > 20;

            window.$['chart-' + $scope.servers[server.ip].id ].series[0].addPoint(point_idl, true, shift);
            window.$['chart-' + $scope.servers[server.ip].id ].series[1].addPoint(point_usr, true, shift);
            window.$['chart-' + $scope.servers[server.ip].id ].series[2].addPoint(point_sys, true, shift);
            window.$['chart-' + $scope.servers[server.ip].id ].series[3].addPoint(point_wai, true, shift);
        }
    });

    socket.on('graph:create', function (data) {
        $scope.messages.push({
            user: 'chatroom',
            text: 'User ' + data.name + ' has joined.'
        });
        $scope.users.push(data.name);
    });

    socket.on('graph:delete', function (data) {
        $scope.messages.push({
            user: 'chatroom',
            text: 'User ' + data.name + ' has left.'
        });
        var i, user;
        for (i = 0; i < $scope.users.length; i++) {
            user = $scope.users[i];
            if (user === data.name) {
                $scope.users.splice(i, 1);
                break;
            }
        }
    });

    // Private helpers
    // ===============

    var changeName = function (oldName, newName) {
        // rename user in list of users
        var i;
        for (i = 0; i < $scope.users.length; i++) {
            if ($scope.users[i] === oldName) {
                $scope.users[i] = newName;
            }
        }

        $scope.messages.push({
            user: 'chatroom',
            text: 'User ' + oldName + ' is now known as ' + newName + '.'
        });
    }

    // Methods published to the scope
    // ==============================
}