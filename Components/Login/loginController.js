angular.module('poiApp')
.controller('loginController', ['setHeadersToken', '$http', '$window', function(setHeadersToken, $http, $window) {
    self = this;

    let serverUrl = 'http://localhost:3000/';
    self.user = {
        username: self.username,
        password: self.password,
        isAdmin: self.isAdmin
    }
    self.forgetPassword = false;

    self.data = {}

    $http.get(serverUrl + "Questions")
    .then(function(response){
        self.questions = response.data;
    },function(response){
        self.questions = [];
    })

    $http.get(serverUrl + "poi/RandPopularPointsOfInterst")
    .then(function(response){
        self.randPopularPOI = response.data;
    },function(response){
        self.randPopularPOI = [];
    })

    self.login = function () {
        // register user
        $http.post(serverUrl + "users/login", self.user)
            .then(function (response) {
                // first function handles success.
                if(!response.data.success)
                    alert("Wrong username or password!")
                else{
                    self.login.content = response.data.token;
                    setHeadersToken.set(self.login.content);
                    $window.location.href = '#/home';
                }
               // localStorageModel.addToLocalStorage('token', self.login.content);
            }, function (response) {
                // second function handles error
                self.login.content = "Something went wrong!";
            });
    }

    self.retrivePassword = function(){
        $http.post(serverUrl + "users/retrivePassword", self.data)
        .then(function(response){
            self.user.correctPassword = response.data.success;
            self.user.password = response.data.password;
        }, function(response){
            self.login.content = "Something went wrong!"
        });
    }

    self.showForgetPassword = function(){
        self.forgetPassword = true;
    }

 
    
}]);