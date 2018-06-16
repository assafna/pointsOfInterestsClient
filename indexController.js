angular.module('poiApp')
    .controller('indexController',['setHeadersToken', 'localStorageService', '$window', function (setHeadersToken, localStorageService, $window) {

        self = this;
        self.userName = setHeadersToken.userName
        //self.userName = localStorageService.get('username');
        //if(self.userName)
        self.loggedIn = false;

        // self.logout = function(){
        //     self.loggedIn = false;
        //     self.userName = localStorageService.remove('favouritePOIS');
        //     self.userName = localStorageService.remove('token');
        //     $window.location.href = '#/login';

        // }



    }]);
