angular.module('poiApp')
.controller('poiController', ['$http', function($http) {
    self = this;

    let serverUrl = 'http://localhost:3000/';


    $http.get(serverUrl + "poi/AllPointsOfInterst")
    .then(function(response){
        self.pois = response.data;
    },function(response){
        self.recomendedPOI = [];
    })
}]);