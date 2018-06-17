angular.module('poiApp')
    .controller('indexController',['setHeadersToken', 'localStorageService', '$window', 'poiDetails','$http', function (setHeadersToken, localStorageService, $window, poiDetails, $http) {

        let serverUrl = 'http://localhost:3000/';

        self = this;
        self.userName = setHeadersToken.userName;
        //self.userName = localStorageService.get('username');
        //if(self.userName)
        self.loggedIn = false;

        $http.get(serverUrl + "poi/AllPointsOfInterst")
        .then(function(response){
            localStorageService.set('allPOI', response.data);
        },function(response){
            self.pois = [];
        }) 

        self.showPoiDetails = function(id){
            pois = localStorageService.get('allPOI');
            for(let i = 0; i < pois.length; i++){
                if(pois[i].poiInfo.POI_id == id){
                    self.poiToShow = pois[i];
                    break;
                }
            }          
            document.getElementById("poiDialog").showModal();
           //add 1 to num of viewers
            $http.put(serverUrl + "poi/updateNumberOfViewers", { poiId: self.poiToShow.poiInfo.POI_id})
            .then(function(response){
                console.log(response)
            }, function(response){
                console.log("error");
            })

        }

        self.closeDialog = function(){
            document.getElementById("poiDialog").close();
        }

        // self.logout = function(){
        //     self.loggedIn = false;
        //     self.userName = localStorageService.remove('favouritePOIS');
        //     self.userName = localStorageService.remove('token');
        //     $window.location.href = '#/login';

        // }



    }]);
