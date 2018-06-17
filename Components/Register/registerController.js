angular.module('poiApp'/*, ["checklist-model"]*/)
.controller('registerController',['$http', '$window','$scope',  function($http, $window, $scope){
    let serverUrl = 'http://localhost:3000/';

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
        Ans2: self.Ans2
    }

    $http.get(serverUrl + "Countries")
    .then(function(response){
        self.countries = response.data;
    },function(response){
        self.countries = [];
    })

    $http.get(serverUrl + "Categories")
    .then(function(response){
        self.categories = response.data;
    },function(response){
        self.categories = [];
    })

    
    $http.get(serverUrl + "Questions")
    .then(function(response){
        self.questions = response.data;
    },function(response){
        self.questions = [];
    })

    //initial categories according to user choise
    self.checkOptions = function(choices){
        var chosen = [];
        for(let i = 0; i < choices.length; i++){
            if (choices[i].checked) {
                chosen.push(choices[i].Category_id);
            }
        }
        if(chosen.length < 2)
            self.lessThen2Categories = true;
        else{
            self.lessThen2Categories = false;
            self.user.Category1 = chosen[0];
            self.user.Category2 = chosen[1];
            if(chosen.length > 2)
                self.user.Category3 = chosen[2];
            if(chosen.length > 3)
                self.user.Category4 = chosen[3];
        }       
    }

    self.closeDialog = function(){
        document.getElementById("registerDialog").close();
        $window.location.href = '#/home';
    }

    self.quesFilter = function(ques){
        return ques.Question_id != self.user.QuestId1;
    }

    self.register = function(){
        self.checkOptions(self.categories);
         // register user
         $http.post(serverUrl + "users/register", self.user)
         .then(function (response) {
             //First function handles success
             self.username = response.data.username;
             self.password = response.data.password;
             document.getElementById("registerDialog").showModal();
         }, function (response) {
             //Second function handles error
             self.register.content = "Something went wrong";
         });
    }

    self.show = function(id){
        $scope.indxCtrl.showPoiDetails(id);
    }





}]);