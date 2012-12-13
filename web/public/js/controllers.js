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

  $scope.servers.unknown = [
    {
      hostname: 'col01.flowmonitor.io'
    }
  ];
};
