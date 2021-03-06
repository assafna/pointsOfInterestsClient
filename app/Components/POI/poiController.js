angular.module('poiApp')
    .controller('poiController', ['$http', 'localStorageService', 'favouriteList', '$scope', 'checkTokenValidation', '$window',
     function ($http, localStorageService, favouriteList, $scope, checkTokenValidation, $window) {
        self = this;

        let serverUrl = 'http://localhost:3000/';
        self.chosenCategory = 5;
        self.loggedIn = checkTokenValidation.check();

        //self.loggedIn = checkTokenValidation.check();
        if (checkTokenValidation.check())
            self.numOfFavorite = localStorageService.get('favouritePOIS').length;

        self.pois = localStorageService.get('allPOI')

        self.categories = localStorageService.get('categories');
        self.categories.push({ Category_id: '5', Category_name: 'show all' });


        self.categoryFilter = function (category) {
            return category.Category_id != 5 && category.Category_id != 0;
        }

        self.addToFavourite = function (id) {
            if (favouriteList.contains(id)) {
                favouriteList.remove(id);
                self.numOfFavorite = localStorageService.get('favouritePOIS').length;
                ;

            }
            else {
                favouriteList.add(id);
                self.numOfFavorite = localStorageService.get('favouritePOIS').length;

            }
            checkOrUncheck(id);
        }

        function checkOrUncheck(id) {
            for (let i = 0; i < self.pois.length; i++) {
                if (self.pois[i].poiInfo.POI_id == id)
                    self.pois[i].checked = !self.pois[i].checked;
            }

        }

        self.showPoiDetails = function (id) {
            $scope.indxCtrl.setMap(id);
            $scope.indxCtrl.showPoiDetails(id);
            self.numOfFavorite = localStorageService.get('favouritePOIS').length;

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

        self.moveToFavPoi = function(){
            $window.location.href = "#/favPoi"
        }



    }]);