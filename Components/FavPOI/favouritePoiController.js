angular.module('poiApp')
.controller('favouritePoiController', ['$http', 'localStorageService', 'favouriteList', '$window','$scope', 'checkTokenValidation', function($http, localStorageService, favouriteList, $window, $scope, checkTokenValidation) {
    self = this;
    let serverUrl = 'http://localhost:3000/';
    self.loggedIn = checkTokenValidation.check();


    // get favorites from local storage or empty array
    self.savedPOI = localStorageService.get('favouritePOIS');
    for(let i = 0; i < self.savedPOI.length; i++)
        self.savedPOI[i].checked = true;
 
    self.addToFavourite = function(id){
        if(favouriteList.contains(id)){
            favouriteList.remove(id);
        }
        else{
            favouriteList.add(id);
        }
        checkOrUncheck(id);    
    }
    function checkOrUncheck(id){
        for(let i = 0; i < self.savedPOI.length; i++){
            if(self.savedPOI[i].poiInfo.POI_id == id)
                self.savedPOI[i].checked = !self.savedPOI[i].checked;
        }

    }

    self.showPoiDetails = function(id){
        $scope.indxCtrl.showPoiDetails(id);
    }

    self.moveUp = function(id){
        for(let i = 0; i < self.savedPOI.length; i++){
            if(self.savedPOI[i].poiInfo.POI_id == id){
                if(i == 0)
                    alert("POI already the first")
                else{
                    let temp = self.savedPOI[i-1];
                    self.savedPOI[i-1] = self.savedPOI[i];
                    let prevOrder = self.savedPOI[i-1].poiInfo.POI_order
                    self.savedPOI[i-1].poiInfo.POI_order = temp.poiInfo.POI_order;
                    self.savedPOI[i] = temp;
                    self.savedPOI[i].poiInfo.POI_order = prevOrder;
                    localStorageService.remove('favouritePOIS');
                    localStorageService.add('favouritePOIS', self.savedPOI);
                    $window.location.reload();    
                }
                break;
            }
        }
    }
    
    self.moveDown = function(id){
        for(let i = 0; i < self.savedPOI.length; i++){
            if(self.savedPOI[i].poiInfo.POI_id == id){
                if(i == self.savedPOI.length - 1)
                    alert("POI already the last")
                else{
                    let temp = self.savedPOI[i+1];
                    self.savedPOI[i+1] = self.savedPOI[i];
                    let prevOrder = self.savedPOI[i+1].poiInfo.POI_order
                    self.savedPOI[i+1].poiInfo.POI_order = temp.poiInfo.POI_order;
                    self.savedPOI[i] = temp;
                    self.savedPOI[i].poiInfo.POI_order = prevOrder;
                    localStorageService.remove('favouritePOIS');
                    localStorageService.add('favouritePOIS', self.savedPOI);
                    $window.location.reload();    
                }
                break;
            }
        }
    }

    self.saveFavListToServer = function(){
        let favListFromLocalStorage = localStorageService.get('favouritePOIS');
        let favPoisIdsByOrder = []
        for(let i = 0; i < favListFromLocalStorage.length; i++){
            favPoisIdsByOrder.push(parseInt(favListFromLocalStorage[i].poiInfo.POI_id));
        }
        console.log(favPoisIdsByOrder)
        $http.put(serverUrl + "poi/validation/updateFavoritePointsOfInterest", {poisId : favPoisIdsByOrder})
        .then(function(response){
            console.log(response);
        },function(response){
            console.log(response);
        })
    }
}]);
// // add class 'fav' to each favorite
// favorites.forEach(function(favorite) {
//   document.getElementById(favorite).className = 'fav';
// });
// // register click event listener
// document.querySelector('.list').addEventListener('click', function(e) {
//   var id = e.target.id,
//       item = e.target,
//       index = favorites.indexOf(id);
//   // return if target doesn't have an id (shouldn't happen)
//   if (!id) return;
//   // item is not favorite
//   if (index == -1) {
//     favorites.push(id);
//     item.className = 'fav';
//   // item is already favorite
//   } else {
//     favorites.splice(index, 1);
//     item.className = '';
//   }
//   // store array in local storage
//   localStorage.setItem('favorites', JSON.stringify(favorites));
// });

// local storage stores strings so we use JSON to stringify for storage and parse to get out of storage
