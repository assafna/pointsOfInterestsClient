angular.module('poiApp')
.controller('poiController', ['$http', 'localStorageService', function($http, localStorageService) {
    self = this;

    let serverUrl = 'http://localhost:3000/';
    self.chosenCategory = 5;

    self.pois = localStorageService.get('allPOI')

    $http.get(serverUrl + "Categories")
    .then(function(response){
        self.categories = response.data;
        self.categories.push({Category_id:'5', Category_name:'show all'});
    },function(response){
        self.categories = [];
    })

    self.categoryFilter = function(category){
        return category.Category_id != 5 && category.Category_id != 0;
    }
}]);