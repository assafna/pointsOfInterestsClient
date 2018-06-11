angular.module('poiApp')
.service('setHeadersToken',[ '$http', function ($http) {

    let self = this;

    this.set = function (t) {
        token = t;
        $http.defaults.headers.common['x-access-token'] = t;
        console.log("set token");
    }

    this.username = self.username;

}])