angular.module('poiApp')
    .controller('indexController', ['setHeadersToken', 'localStorageService', '$window', 'poiDetails', '$http', 'checkTokenValidation', 'initUserInLocalStorage', '$scope',
        function (setHeadersToken, localStorageService, $window, poiDetails, $http, checkTokenValidation, initUserInLocalStorage, $scope) {

            let serverUrl = 'http://localhost:3000/';

            self = this;
            $scope.userName = "guest"
            $scope.loggedIn = checkTokenValidation.check();

            // get all pois from the server, insert into local storage
            $http.get(serverUrl + "poi/AllPointsOfInterst")
                .then(function (response) {
                    localStorageService.set('allPOI', response.data);
                }, function (response) {
                    self.pois = [];
                    console.log(response);
                })

            // retrieve relevant poi from local storage according to id
            // increase the views of the poi by one
            self.showPoiDetails = function (id) {
                let pois = localStorageService.get('allPOI')
                // let pois = [];
                // $http.get(serverUrl + "poi/AllPointsOfInterst")
                // .then(function(response){
                //     pois = response.data;
                // },function(response){
                //     pois = [];
                // }) 
                for (let i = 0; i < pois.length; i++) {
                    if (pois[i].poiInfo.POI_id == id) {
                        $scope.poiToShow = pois[i];
                        // $scope.poiToShow.description = pois[i].poiInfo.POI_description;
                        // $scope.poiToShow.avgRank = pois[i].poiInfo.POI_angRank;
                        // $scope.poiToShow.numOfViewrs = pois[i].poiInfo.NumOfViewers;
                        // $scope.poiToShow.reviews = pois[i].poiInfo.poiReview;
                        break;
                    }
                }
                document.getElementById("poiDialog").showModal();
                //add 1 to num of viewers
                $http.put(serverUrl + "poi/updateNumberOfViewers", { poiId: $scope.poiToShow.poiInfo.POI_id })
                    .then(function (response) {
                        console.log(response)
                    }, function (response) {
                        console.log("error: " + response);
                    })

            }

            // closing the dialog of a poi
            self.closeDialog = function () {
                document.getElementById("poiDialog").close();
            }

            // logging out of the system by deleting him from the local storage
            $scope.logout = function () {
                initUserInLocalStorage.deleteUser();
                $scope.loggedIn = false;
                $scope.userName = localStorageService.get('username');
                $window.location.href = '#/login';
            }

         $scope.checkLogin = function(){
            $scope.loggedIn = checkTokenValidation.check();
            $scope.userName = localStorageService.get('username');
            if($scope.userName == null)
                $scope.userName = "guest";
            return $scope.loggedIn;
         }
         
         $scope.checkToken = function(){
            $scope.loggedIn = checkTokenValidation.check();
            $scope.userName = localStorageService.get('username');
            if($scope.userName == null)
                $scope.userName = "guest";
            if($scope.loggedIn)
                setHeadersToken.set(localStorageService.get('token'));
            return $scope.loggedIn;

            }

        }
    ]
);