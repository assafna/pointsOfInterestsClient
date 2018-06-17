angular.module('poiApp')
.service('setHeadersToken', ['$http', function($http) {

    self.userName = "";
    
    this.set = function (token, username) {
        $http.defaults.headers.common['x-access-token'] = token;
        console.log("set token");
        this.userName = "username";        
    }


}])
.service('checkTokenValidation', ['$http', function($http){
    let serverUrl = 'http://localhost:3000/';
    this.check = function(){
        $http.get(serverUrl + "poi/validation")
        .then(function (response) {
            if(response.data.success == false)
                return false;;

        }, function(response){
            console.log(response)
        })
    }
} ])