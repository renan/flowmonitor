
var HomeController = function($scope) {
  $scope.servers = {};
  $scope.servers.active = [
    {
      hostname: 'web01.flowmonitor.io'
    },
    {
      hostname: 'web02.flowmonitor.io'
    }
  ];

  $scope.servers.unknown = [];

  window.setTimeout(function() {
    console.log('Adding unknown server');

    $scope.servers.unknown.push({
      hostname: 'col01.flowmonitor.io'
    });


    $scope.$digest();
  }, 3000);

};
