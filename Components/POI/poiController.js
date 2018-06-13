angular.module('poiApp')
.controller('homeController', ['$http', function($http) {
    self = this;

    let serverUrl = 'http://localhost:3000/';
    self.user = {
        username: self.username,
        password: self.password,
        isAdmin: self.isAdmin
    }


    $http.get(serverUrl + "poi/AllPointsOfInterst")
    .then(function(response){
        self.recomendedPOI = response.data;
    },function(response){
        self.recomendedPOI = [];
    })
}]);