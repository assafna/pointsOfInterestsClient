angular.module('poiApp'/*, ["checklist-model"]*/)
.controller('registerController',['$http',  function($http){
    let serverUrl = 'http://localhost:3000';

    self = this;

    self.chosenCategories = [];

    self.user = {
        Firstname: self.Firstname,
        Lastname: self.Lastname,
        City: self.City,
        Country: self.Country,
        Email: self.Email,
        Category1: null,
        Category2: null,
        Category3: null,
        Category4: null,
        QuestId1: self.QuestId1,
        QuestId2: self.QuestId2,
        Ans1: self.Ans1,
        Ans2: self.Ans1
    }

    $http.get(serverUrl + "/Countries")
    .then(function(response){
        self.countries = response.data;
    },function(response){
        self.countries = [];
    })

    $http.get(serverUrl + "/Categories")
    .then(function(response){
        self.categories = response.data;
    },function(response){
        self.categories = [];
    })

    
    $http.get(serverUrl + "/Questions")
    .then(function(response){
        self.questions = response.data;
    },function(response){
        self.questions = [];
    })

    self.quesFilter = function (item) { 
        return true; 
    };


    self.register = function(){
        self.user.Category1 = self.chosenCategories[0];
        self.user.Category2 = self.chosenCategories[1];
        if(self.chosenCategories.length > 2)
            self.user.Category3 = self.chosenCategories[2];
        if(self.chosenCategories.length > 3)
            self.user.Category4 = self.chosenCategories[3];

         // register user
         $http.post(serverUrl + "/users/register", self.user)
         .then(function (response) {
             //First function handles success
             self.register.content = response.data;
         }, function (response) {
             //Second function handles error
             self.register.content = "Something went wrong";
         });
    }





}]);