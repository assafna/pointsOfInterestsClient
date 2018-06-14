angular.module('poiApp')
    .controller('indexController',['setHeadersToken', function (setHeadersToken) {

        self = this;
        self.userName = setHeadersToken.userName;
        self.loggedIn = false;

    }]);
