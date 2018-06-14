angular.module('poiApp')
.controller('poiController', ['$http', function($http) {
    self = this;

    let serverUrl = 'http://localhost:3000/';
    self.chosenCategory = 5;


    $http.get(serverUrl + "poi/AllPointsOfInterst")
    .then(function(response){
        self.pois = response.data;
    },function(response){
        self.pois = [];
    })

    $http.get(serverUrl + "Categories")
    .then(function(response){
        self.categories = response.data;
        self.categories.push({Category_id:'5', Category_name:'show all'});
    },function(response){
        self.categories = [];
    })

    self.categoryFilter = function(category){
        return category.Category_id != 5;
    }
}]);