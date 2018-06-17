angular.module('poiApp')
.controller('favouritePoiController', ['$http', 'localStorageService', 'favouriteList', '$window','$scope', function($http, localStorageService, favouriteList, $window, $scope) {
    self = this;

    // get favorites from local storage or empty array
    self.savedPOI = localStorageService.get('favouritePOIS');

    self.addToFavourite = function(id){
        if(favouriteList.contains(id)){
            favouriteList.remove(id);
        }
        else{
            favouriteList.add(id);
        }
        $window.location.reload();    
    }

    self.showPoiDetails = function(id){
        $scope.indxCtrl.showPoiDetails(id);
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
