angular.module('poiApp')
    .controller('indexController',['setHeadersToken', 'localStorageService', '$window', 'poiDetails','$http', function (setHeadersToken, localStorageService, $window, poiDetails, $http) {

        let serverUrl = 'http://localhost:3000/';

        self = this;
        self.userName = guest;
        //self.userName = localStorageService.get('username');
        //if(self.userName)
        self.loggedIn = false;
        self.poiToShow = {

        }

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
                    self.poiToShow.description = pois[i].poiInfo.POI_description;
                    self.poiToShow.avgRank = pois[i].poiInfo.POI_angRank;
                    self.poiToShow.numOfViewrs = pois[i].poiInfo.NumOfViewers;
                    self.poiToShow.reviews = pois[i].poiReview;
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
