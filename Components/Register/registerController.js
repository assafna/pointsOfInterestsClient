angular.module('poiApp')
.controller('registerController',['$http',  function($http){
    self = this;
    let user = {
        Firstname: self.Firstname,
        Lastname: self.Lastname,
        City: self.City,
        Country: self.Country,
        Email: self.Email,
        Categories: self.Categories,
        Category2: self.Category2,
        Category3: self.Category3,
        Category4: self.Category4,
        QuestId1: self.QuestId1,
        QuestId2: self.QuestId2,
        Ans1: self.Ans1,
        Ans2: self.Ans1
    }

    //let countries = self.getCountries();
    let countries = ['a', 'b', 'c'];
    let questions = self.getQuestions();
    let categories = self.getCategories();

    self.register = function(){
         // register user
         $http.post(serverUrl + "Users/register", user)
         .then(function (response) {
             //First function handles success
             self.signUp.content = response.data;
         }, function (response) {
             //Second function handles error
             self.signUp.content = "Something went wrong";
         });
    }

    self.getCountries = function(){
        return $http.get(serverUrl + "/Countries")
    }

    self.getCategories = function(){
        return $http.get(serverUrl + "/Categories")
    }

    self.getQuestions = function(){
        return $http.get(serverUrl + "/Questions")
    }




}]);