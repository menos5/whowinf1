angular.module("myapp", [])
.controller("MyController", function($scope, $http) {
  $scope.myData =  $http.get("http://ergast.com/api/f1/current/driverStandings.json").
    success(function(data, status, headers, config) {

      $scope.resultados = data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
      $scope.round = data.MRData.StandingsTable.StandingsLists[0].round;
      $scope.carreras = 19;
      $scope.primero = data.MRData.StandingsTable.StandingsLists[0].DriverStandings[0].points;

      $scope.prob = function(puntos) {
        if ( (($scope.carreras - $scope.round) * 25) < ($scope.primero - puntos) ) {
          return "eliminado";
        }
      };

      $scope.a = function(puntos) {
        var d = (puntos / $scope.c());
        return d;
      };

      $scope.b = function(puntos) {
        var posibles = ($scope.carreras - $scope.round) * 25;
        var d =  (parseInt(puntos) + posibles ) / $scope.c();
        return d;
      };

      $scope.c = function() {
        var d =  ($scope.carreras * 25 / 100);
        return d;
      };

    }).
    error(function(data, status, headers, config) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.
    });

} );
