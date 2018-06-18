angular.module('poiApp')
    .controller('indexController',['setHeadersToken', 'localStorageService', '$window', 'poiDetails','$http','checkTokenValidation', 'initUserInLocalStorage','$scope',
     function (setHeadersToken, localStorageService, $window, poiDetails, $http, checkTokenValidation, initUserInLocalStorage, $scope) {

        let serverUrl = 'http://localhost:3000/';

        self = this;
        $scope.userName = localStorageService.get('username');
        $scope.poiToShow = {};
        $scope.loggedIn = checkTokenValidation.check();


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
                    $scope.poiToShow = pois[i];
                    $scope.poiToShow.description = pois[i].poiInfo.POI_description;
                    $scope.poiToShow.avgRank = pois[i].poiInfo.POI_angRank;
                    $scope.poiToShow.numOfViewrs = pois[i].poiInfo.NumOfViewers;
                    $scope.poiToShow.reviews = pois[i].poiInfo.poiReview;
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

        $scope.logout = function(){
            initUserInLocalStorage.deleteUser();
            $scope.loggedIn = false;
            $scope.userName = localStorageService.get('username');
            $window.location.href = '#/login';
            
         }

         $scope.checkLogin = function(){
            $scope.loggedIn = checkTokenValidation.check();
            $scope.userName = localStorageService.get('username');
            if($scope.loggedIn)
                setHeadersToken.set(localStorageService.get('token'));
            return $scope.loggedIn;

         }

    }]);
