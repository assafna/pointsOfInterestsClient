angular.module('poiApp')
.controller('loginController', ['$setHeadersToken',  function($setHeadersToken) {
    self = this;

    let serverUrl = 'http://localhost:8080/';
    let user = {
        username: self.username,
        password: self.password,
        isAdmin: self.isAdmin
    }

    self.login = function () {
        // register user
        $http.post(serverUrl + "Users/login", user)
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