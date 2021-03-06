angular.module('poiApp')
    .controller('favouritePoiController', ['$http', 'localStorageService', 'favouriteList', '$window', '$scope', 'checkTokenValidation', function ($http, localStorageService, favouriteList, $window, $scope, checkTokenValidation) {
        self = this;
        let serverUrl = 'http://localhost:3000/';
        self.loggedIn = checkTokenValidation.check();
        self.chosenCategory = 5;


        self.categories = localStorageService.get('categories');
        self.categories.push({ Category_id: '5', Category_name: 'show all' });


        // get favorites from local storage or empty array
        self.savedPOI = localStorageService.get('favouritePOIS');

        self.addToFavourite = function (id) {
            if (self.isInFavorites(id))
                favouriteList.remove(id);
            else
                favouriteList.add(id);
            // $window.location.reload();
            checkOrUncheck(id);
        }
        function checkOrUncheck(id) {
            for (let i = 0; i < self.savedPOI.length; i++) {
                if (self.savedPOI[i].poiInfo.POI_id == id)
                    self.savedPOI[i].checked = !self.savedPOI[i].checked;
            }
        }

        self.showPoiDetails = function (id) {
            $scope.indxCtrl.setMap(id);
            $scope.indxCtrl.showPoiDetails(id);
        }

        self.moveUp = function (id) {
            for (let i = 0; i < self.savedPOI.length; i++) {
                if (self.savedPOI[i].poiInfo.POI_id == id) {
                    if (i == 0)
                        alert("POI already the first")
                    else {
                        let temp = self.savedPOI[i - 1];
                        self.savedPOI[i - 1] = self.savedPOI[i];
                        let prevOrder = self.savedPOI[i - 1].poiInfo.POI_order
                        self.savedPOI[i - 1].poiInfo.POI_order = temp.poiInfo.POI_order;
                        self.savedPOI[i] = temp;
                        self.savedPOI[i].poiInfo.POI_order = prevOrder;
                        localStorageService.remove('favouritePOIS');
                        localStorageService.add('favouritePOIS', self.savedPOI);
                        // $window.location.reload();    
                    }
                    break;
                }
            }
        }

        self.moveDown = function (id) {
            for (let i = 0; i < self.savedPOI.length; i++) {
                if (self.savedPOI[i].poiInfo.POI_id == id) {
                    if (i == self.savedPOI.length - 1)
                        alert("POI already the last")
                    else {
                        let temp = self.savedPOI[i + 1];
                        self.savedPOI[i + 1] = self.savedPOI[i];
                        let prevOrder = self.savedPOI[i + 1].poiInfo.POI_order
                        self.savedPOI[i + 1].poiInfo.POI_order = temp.poiInfo.POI_order;
                        self.savedPOI[i] = temp;
                        self.savedPOI[i].poiInfo.POI_order = prevOrder;
                        localStorageService.remove('favouritePOIS');
                        localStorageService.add('favouritePOIS', self.savedPOI);
                        // $window.location.reload();    
                    }
                    break;
                }
            }
        }

        self.saveFavListToServer = function () {
            let favListFromLocalStorage = localStorageService.get('favouritePOIS');
            let favPoisIdsByOrder = []
            for (let i = 0; i < favListFromLocalStorage.length; i++) {
                favPoisIdsByOrder.push(parseInt(favListFromLocalStorage[i].poiInfo.POI_id));
            }
            console.log(favPoisIdsByOrder)
            $http.put(serverUrl + "poi/validation/updateFavoritePointsOfInterest", { poisId: favPoisIdsByOrder })
                .then(function (response) {
                    alert("Your list saved seccussfully!")
                }, function (response) {
                    alert("Something went wrong :(")
                    console.log(response);
                })
        }
        self.openReviewDialog = function (poiId, poiName) {
            $scope.indxCtrl.openReviewDialog(poiId, poiName);
        }


        self.closeReviewDialog = function () {
            $scope.indxCtrl.closeReviewDialog();
        }

        self.isInFavorites = function (id) {
            return favouriteList.contains(id);

        }


    }]);
