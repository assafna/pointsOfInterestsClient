angular.module('poiApp')
.service('setHeadersToken', ['$http', function($http) {
    this.set = function (t) {
        $http.defaults.headers.common['x-access-token'] = t;
        console.log("set token");
    }
}])