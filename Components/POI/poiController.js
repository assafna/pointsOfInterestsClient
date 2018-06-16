angular.module('poiApp')
.controller('poiController', ['$http', 'localStorageService','favouriteList', function($http, localStorageService, favouriteList) {
    self = this;

    let serverUrl = 'http://localhost:3000/';
    self.chosenCategory = 5;

    self.pois = localStorageService.get('allPOI')

    self.review = {
        rank : 0,
        review : ""
    }

    self.rankOptions = [1, 2, 3, 4, 5];

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

    self.addToFavourite = function(id){
        if(favouriteList.contains(id)){
            favouriteList.remove(id);
        }
        else{
            favouriteList.add(id);
        }
    }

    self.openReviewDialog = function(poiId, poiName){
        document.getElementById("reviewDialog").showModal();
        self.review.poiId = poiId;
        self.review.poiName = poiName;
    }

    self.addReview = function(){
        if(parseInt(self.review.rank) > 0){
            $http.post(serverUrl + 'validation/rankPointOfInterest', self.review)
            .then(function(response){
                console.log(response.data);
            },function(response){
                console.log(response.data);
            })
        }
        if(self.review.review.length > 0){
            $http.post(serverUrl + 'validation/reviewPointOfInterest', self.review)
                .then(function(response){
                    console.log(response.data);
                },function(response){
                    console.log(response.data);
                })
        }
        document.getElementById("reviewDialog").close();

    }

    self.closeDialog = function(){
        document.getElementById("reviewDialog").close();
    }
    
    

}]);