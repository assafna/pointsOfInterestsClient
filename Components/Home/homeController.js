angular.module('poiApp')
.controller('homeController', ['$http', 'localStorageService', '$scope', function($http, localStorageService, $scope) {
    self = this;

    let serverUrl = 'http://localhost:3000/';
    self.user = {
        username: self.username,
        password: self.password,
        isAdmin: self.isAdmin
    }

    $http.get(serverUrl + "poi/validation/RecomendedPointsOfInterest")
    .then(function(response){
        self.recomendedPOI = response.data;
    },function(response){
        self.recomendedPOI = [];
    })

    
    self.getLastSavedPOIs = function(){
        let pois = localStorageService.get('favouritePOIS');
        pois.sort(sortByDate);
        self.savedPOI = [];
        for(let i = 0; i < 2 && pois.length; i++)
            self.savedPOI.push(pois[i]);
    }

    self.getLastSavedPOIs();

  

    function sortByDate(a,b){  
        var dateA = new Date(a.poiInfo.AddDate).getTime();
        var dateB = new Date(b.poiInfo.AddDate).getTime();
        return dateB - dateA;  
    }; 

    self.showPoiDetails = function(id){
        $scope.indxCtrl.showPoiDetails(id);
    }
    
}]);