angular.module('poiApp')
.service('setHeadersToken', ['$http', function($http) {
    
    self.userName = "";
    
    this.set = function (token, username) {
        $http.defaults.headers.common['x-access-token'] = token;
        console.log("set token");
        this.userName = "username";        
    }


}])