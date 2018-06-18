angular.module('poiApp')
.service('initUserInLocalStorage', ['$http','localStorageService','$window', 
function($http, localStorageService, $window){
    let serverUrl = 'http://localhost:3000/';

    let self = this;
    self.addUser = function(token, username){
        localStorageService.set('token', token);
        localStorageService.set('username', username);
        //localStorageService.set('timeToExpiered', Date.now() + 86400000);
       localStorageService.set('timeToExpiered', Date.now() + 10000);

       addFavouritePOItoLocalStorage();
    }

    self.deleteUser = function(){
        localStorageService.remove('token');
        localStorageService.remove('username');
        localStorageService.remove('timeToExpiered');
        localStorageService.remove('favouritePOIS');
        localStorageService.set('username', 'geust');
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
}])

.service('setHeadersToken', ['$http', function($http) {
    this.set = function (token, username) {
        $http.defaults.headers.common['x-access-token'] = token;
    }
}])


.service('checkTokenValidation', ['$http','localStorageService','initUserInLocalStorage', '$window', 
function($http, localStorageService, initUserInLocalStorage, $window){
    let serverUrl = 'http://localhost:3000/';
    this.check = function(){

        timeToExpiredToken = localStorageService.get('timeToExpiered');
        if(timeToExpiredToken != null){
            if(Date.now() > timeToExpiredToken){
                alert("Please log in again");
                initUserInLocalStorage.deleteUser();
                $window.location.href = '#/login';
                return false;
            }
            
            else{
                self.username = localStorageService.get('username');
                return true;
            }
        }
        else
            $window.location.href = '#/login';
            return false;

        

            
    }
} ])