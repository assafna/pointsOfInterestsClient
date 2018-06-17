angular.module('poiApp')
.controller('poiController', ['$http', 'localStorageService','favouriteList','$scope', function($http, localStorageService, favouriteList, $scope) {
    self = this;

    let serverUrl = 'http://localhost:3000/';
    self.chosenCategory = 5;
    self.loggedIn = $scope.indxCtrl.loggedIn;


    self.pois = localStorageService.get('allPOI')
    for(let i = 0; i < self.pois.length; i++){
        if(favouriteList.contains(self.pois[i].poiInfo.POI_id))
            self.pois[i].checked = true;
        else
            self.pois[i].checked = false;
        
    }

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
        checkOrUncheck(id);
    }

    function checkOrUncheck(id){
        for(let i = 0; i < self.pois.length; i++){
            if(self.pois[i].poiInfo.POI_id == id)
                self.pois[i].checked = !self.pois[i].checked;
        }

    }

    self.openReviewDialog = function(poiId, poiName){
        document.getElementById("reviewDialog").showModal();
        self.review.poiId = poiId;
        self.review.poiName = poiName;
    }

    self.addReview = function(){
        if(parseInt(self.review.rank) > 0){
            $http.post(serverUrl + 'poi/validation/rankPointOfInterest', self.review)
            .then(function(response){
                console.log(response.data);
            },function(response){
                console.log(response.data);
            })
        }
        if(self.review.review.length > 0){
            $http.post(serverUrl + 'poi/validation/reviewPointOfInterest', self.review)
                .then(function(response){
                    console.log(response.data);
                },function(response){
                    console.log(response.data);
                })
        }
        document.getElementById("reviewDialog").close();
        alert("review added seccussfully");

    }

    self.closeDialog = function(){
        document.getElementById("reviewDialog").close();
    }

    self.showPoiDetails = function(id){
        $scope.indxCtrl.showPoiDetails(id);
    }
    
    

}]);