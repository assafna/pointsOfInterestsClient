angular.module('poiApp')
    .controller('indexController',['setHeadersToken', 'localStorageService', '$window', 'poiDetails','$http','checkTokenValidation', function (setHeadersToken, localStorageService, $window, poiDetails, $http, checkTokenValidation) {

        let serverUrl = 'http://localhost:3000/';

        self = this;
        self.userName = "guest";
        self.loggedIn = checkTokenValidation.check();
        self.poiToShow = {}

        $http.get(serverUrl + "poi/AllPointsOfInterst")
        .then(function(response){
            localStorageService.set('allPOI', response.data);
        },function(response){
            self.pois = [];
        }) 

        self.showPoiDetails = function(id){
            let pois = localStorageService.get('allPOI')
            // $http.get(serverUrl + "poi/AllPointsOfInterst")
            // .then(function(response){
            //     pois = response.data;
            // },function(response){
            //     pois = [];
            // }) 
            for(let i = 0; i < pois.length; i++){
                if(pois[i].poiInfo.POI_id == id){
                    self.poiToShow = pois[i];
                    self.poiToShow.description = pois[i].poiInfo.POI_description;
                    self.poiToShow.avgRank = pois[i].poiInfo.POI_angRank;
                    self.poiToShow.numOfViewrs = pois[i].poiInfo.NumOfViewers;
                    self.poiToShow.reviews = pois[i].poiInfo.poiReview;
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

         self.logout = function(){
             self.loggedIn = false;
             localStorageService.remove('token');
             localStorageService.remove('favouritePOIS');
             $window.location.href = '#/login';

         }



    }]);
