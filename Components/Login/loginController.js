angular.module('poiApp')
.controller('loginController', ['setHeadersToken', '$http', '$window', 'localStorageService', '$scope', function(setHeadersToken, $http, $window, localStorageService, $scope) {
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
                    localStorageService.set('token', self.login.content);
                    $scope.indxCtrl.userName = self.user.username;
                    $scope.indxCtrl.loggedIn = true;
                    addFavouritePOItoLocalStorage();
                }
            }, function (response) {
                // second function handles error
                self.login.content = "Something went wrong!";
            });
    }

    function addFavouritePOItoLocalStorage(){
        try{
            $http.get(serverUrl + "poi/validation/FavoritePointsOfInterest")
            .then(function (response) {
                if(response.data.message == "no Favorite Points Of Interest")
                    localStorageService.set('favouritePOIS', []);
                else
                    localStorageService.set('favouritePOIS', response.data);
                $window.location.href = '#/home';
            }, function(response){
                self.login.content = "Something went wrong!"
            })
        }
        catch(err){
            localStorageService.set('favouritePOIS', []);
            $window.location.href = '#/home';
        }

    }

    self.retrivePassword = function(){
        $http.post(serverUrl + "users/retrivePassword", self.data)
        .then(function(response){
            if(response.data.success)
                 self.user.password = response.data.password;
            else
                alert("wrong varification details");
        }, function(response){
            self.login.content = "Something went wrong!"
        });
    }

    self.showForgetPassword = function(){
        self.forgetPassword = true;
    }

    self.showPoiDetails = function(id){
        $scope.indxCtrl.showPoiDetails(id);
    }
    
    
    
}]);