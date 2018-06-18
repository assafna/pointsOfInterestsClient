angular.module('poiApp')
.controller('poiController', ['$http', 'localStorageService','favouriteList','$scope','checkTokenValidation', function($http, localStorageService, favouriteList, $scope, checkTokenValidation) {
    self = this;

    let serverUrl = 'http://localhost:3000/';
    self.chosenCategory = 5;
    self.loggedIn = checkTokenValidation.check();

    //self.loggedIn = checkTokenValidation.check();
    if(self.loggedIn)
        self.numOfFavorite =  localStorageService.get('favouritePOIS').length;



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

    self.categories = localStorageService.get('categories');
    self.categories.push({Category_id:'5', Category_name:'show all'});


    self.categoryFilter = function(category){
        return category.Category_id != 5 && category.Category_id != 0;
    }

    self.addToFavourite = function(id){
        if(favouriteList.contains(id)){
            favouriteList.remove(id);
            self.numOfFavorite--;
        }
        else{
            favouriteList.add(id);
            self.numOfFavorite++;
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