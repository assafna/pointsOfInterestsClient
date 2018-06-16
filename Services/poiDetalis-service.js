angular.module('poiApp')
.service('favouriteList', ['$http', 'localStorageService', function($http, localStorageService) {
    self.show = function(){
        $http.get('poi/PointOfInterstInfoById/:id')
    }
}])