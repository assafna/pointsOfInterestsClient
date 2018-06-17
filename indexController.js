angular.module('poiApp')
    .controller('indexController',['setHeadersToken', 'localStorageService', '$window', 'poiDetails', function (setHeadersToken, localStorageService, $window, poiDetails) {

        self = this;
        self.userName = setHeadersToken.userName
        //self.userName = localStorageService.get('username');
        //if(self.userName)
        self.loggedIn = false;

        self.showPoiDetails = function(id){
            poi = poiDetails.getPoi(id);
            document.getElementById("poiDialog").showModal();

        }

        // self.logout = function(){
        //     self.loggedIn = false;
        //     self.userName = localStorageService.remove('favouritePOIS');
        //     self.userName = localStorageService.remove('token');
        //     $window.location.href = '#/login';

        // }



    }]);
