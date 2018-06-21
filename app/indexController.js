angular.module('poiApp')
    .controller('indexController', ['setHeadersToken', 'localStorageService', '$window', '$http', 'checkTokenValidation', 'initUserInLocalStorage', '$scope', 'favouriteList',
        function (setHeadersToken, localStorageService, $window, $http, checkTokenValidation, initUserInLocalStorage, $scope, favouriteList) {

            let serverUrl = 'http://localhost:3000/';

            self = this;
            $scope.userName = "guest"
            $scope.loggedIn = checkTokenValidation.check();
            $scope.review = {}
            self.numOfFavorite = 0;
            if ($scope.loggedIn)
                self.numOfFavorite = localStorageService.get('favouritePOIS').length;

            var mymap = L.map('mapid').setView([51.505, -0.09], 13);
            L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
                attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
                maxZoom: 18,
                id: 'mapbox.streets',
                accessToken: 'pk.eyJ1IjoiYXNzYWZuYSIsImEiOiJjamluZDB6bXQwY284M2tudzB6NjgyYXJ6In0.JvduB2-EOw4yMWHu6x30EA'
            }).addTo(mymap);

            // get all pois from the server, insert into local storage
            $http.get(serverUrl + "poi/AllPointsOfInterst")
                .then(function (response) {
                    localStorageService.set('allPOI', response.data);
                }, function (response) {
                    self.pois = [];
                    console.log(response);
                })

            $http.get(serverUrl + "Categories")
                .then(function (response) {
                    let categories = response.data;
                    categories.splice(0, 1);
                    localStorageService.set('categories', response.data);
                }, function (response) {
                    self.categories = [];
                })

            $http.get(serverUrl + "Questions")
                .then(function (response) {
                    localStorageService.set('questions', response.data);
                }, function (response) {
                    self.questions = [];
                })

            // retrieve relevant poi from local storage according to id
            // increase the views of the poi by one
            self.showPoiDetails = function (id) {
                //let pois = localStorageService.get('allPOI')
                let pois = [];
                $http.get(serverUrl + "poi/AllPointsOfInterst")
                    .then(function (response) {
                        pois = response.data;
                        for (let i = 0; i < pois.length; i++) {
                            if (pois[i].poiInfo.POI_id == id) {
                                $scope.poiToShow = pois[i];
                                if (favouriteList.contains(id))
                                    $scope.poiToShow.checked = true;

                                break;
                            }
                        }
                        // document.getElementById("poiDialog").showModal();
                        $("#poiModal").modal("show");
                        setTimeout(function () {
                            mymap.invalidateSize();
                        }, 1000);
                    }, function (response) {
                        pois = [];
                    })

                //add 1 to num of viewers
                $http.put(serverUrl + "poi/updateNumberOfViewers", { poiId: id })
                    .then(function (response) {
                        console.log(response)
                    }, function (response) {
                        console.log("error: " + response);
                    })

            }

            // closing the dialog of a poi
            self.closeDialog = function () {
                document.getElementById("poiDialog").close();
                //$window.location.reload();
            }

            // logging out of the system by deleting him from the local storage
            $scope.logout = function () {
                initUserInLocalStorage.deleteUser();
                $scope.loggedIn = false;
                $scope.userName = localStorageService.get('username');
                $window.location.href = '#/login';
            }

            $scope.checkLogin = function () {
                $scope.loggedIn = checkTokenValidation.check();
                $scope.userName = localStorageService.get('username');
                if ($scope.userName == null)
                    $scope.userName = "guest";
                return $scope.loggedIn;
            }

            $scope.checkToken = function () {
                $scope.loggedIn = checkTokenValidation.check();
                $scope.userName = localStorageService.get('username');
                if ($scope.userName == null)
                    $scope.userName = "guest";
                if ($scope.loggedIn)
                    setHeadersToken.set(localStorageService.get('token'));
                return $scope.loggedIn;

            }

            $scope.addToFavourite = function (id) {
                if (favouriteList.contains(id)) {
                    favouriteList.remove(id);
                    $scope.poiToShow.checked = false;
                    self.numOfFavorite--;
                }
                else {
                    favouriteList.add(id);
                    $scope.poiToShow.checked = true;
                    self.numOfFavorite++;

                }
            }



            self.openReviewDialog = function (poiId, poiName) {
                document.getElementById("reviewDialog").showModal();
                $scope.review.poiId = poiId;
                $scope.review.poiName = poiName;
            }

            $scope.closeReviewDialog = function () {
                document.getElementById("reviewDialog").close();
            }

            $scope.addReview = function () {
                if (parseInt($scope.review.rank) > 0) {
                    $http.post(serverUrl + 'poi/validation/rankPointOfInterest', $scope.review)
                        .then(function (response) {
                            console.log(response.data);
                        }, function (response) {
                            console.log(response.data);
                        })
                }
                if ($scope.review.review.length > 0) {
                    $http.post(serverUrl + 'poi/validation/reviewPointOfInterest', $scope.review)
                        .then(function (response) {
                            if (response.data.success == true)
                                alert("review added seccussfully");
                            else
                                alert("You can't review the same place more then once");

                        }, function (response) {
                            console.log(response.data);
                        })
                }
                document.getElementById("reviewDialog").close();

            }

            self.setMap = function (id) {
                self.pois = localStorageService.get('allPOI');
                for (let i = 0; i < self.pois.length; i++) {
                    if (self.pois[i].poiInfo.POI_id == id){
                        mymap.setView({ lat: self.pois[i].poiInfo.Latitude, lng: self.pois[i].poiInfo.Longitude }, 15);
                        var marker = L.marker({ lat: self.pois[i].poiInfo.Latitude, lng: self.pois[i].poiInfo.Longitude }).addTo(mymap);
                    }
                }
            }

        }


    ]
    );