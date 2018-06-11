angular.module('poiApp')
.controller('loginController', ['$setHeadersToken', '$scope', '$http', function($setHeadersToken, $scope, $http) {

    let self = this;
    let serverUrl = 'http://localhost:8080/';

    let user = {
        username: self.username,
        password: self.password,
        isAdmin: false
    }

    self.login = function(){
        console.log("posting data");
        $http.post(serverUrl + "Users/login", JSON.stringify(user))
        .then(function (response) {
            // first function handles success
            self.login.content = response.data.token;
            setHeadersToken.set(self.login.content)
        }, function (response) {
            // second function handles error
            self.login.content = "Something went wrong!";
        });
    }
    
}]);