angular.module('poiApp')
.service('setHeadersToken',[ '$http', function ($http) {

    let token = "";

    this.set = function (t) {
        token = t;
        $http.defaults.headers.common['x-access-token'] = t;
        console.log("set token");
    }

    this.username = '';

}])
.controller('serviceController', ['$location', '$http', 'setHeadersToken','localStorageModel', function ($location, $http, setHeadersToken,localStorageModel) {
    self = this;

    let serverUrl = 'http://localhost:8080/';
    let user = {
        username: "",
        password: "",
        isAdmin: false
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