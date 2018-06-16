angular.module('poiApp')
    .controller('indexController',['setHeadersToken', 'localStorageService', function (setHeadersToken, localStorageService) {

        self = this;
        self.userName = setHeadersToken.userName
        //self.userName = localStorageService.get('username');
        //if(self.userName)
            self.loggedIn = true;
        self.search = false;

    }]);
