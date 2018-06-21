angular.module('poiApp')
    .controller('homeController', ['$http', 'localStorageService', '$scope', 'checkTokenValidation', function ($http, localStorageService, $scope, checkTokenValidation) {
        self = this;

        let serverUrl = 'http://localhost:3000/';
        self.user = {
            username: self.username,
            password: self.password,
            isAdmin: self.isAdmin
        }
        self.loggedIn = checkTokenValidation.check();


        self.noFavorites = false;


        $http.get(serverUrl + "poi/validation/RecomendedPointsOfInterest")
            .then(function (response) {
                self.recomendedPOI = response.data;
            }, function (response) {
                self.recomendedPOI = [];
            })


        self.getLastSavedPOIs = function () {
            let pois = localStorageService.get('favouritePOIS');
            self.savedPOI = [];
            if (pois.length == 0 || pois == "undefined")
                self.noFavorites = true;
            else {
                self.savedPOI.push(pois[pois.length - 1]);
                if (pois.length > 1)
                    self.savedPOI.push(pois[pois.length - 2]);

                //pois.sort(sortByDate);
                //for(let i = 0; i < 2 && pois.length; i++)
                //  self.savedPOI.push(pois[i]);
            }
        }

        self.getLastSavedPOIs();



        function sortByDate(a, b) {
            var dateA = new Date(a.poiInfo.AddDate).getTime();
            var dateB = new Date(b.poiInfo.AddDate).getTime();
            return dateB - dateA;
        };

        self.showPoiDetails = function (id) {
            $scope.indxCtrl.setMap(id);
            $scope.indxCtrl.showPoiDetails(id);
        }

    }]);