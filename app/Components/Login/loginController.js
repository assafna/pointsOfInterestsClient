angular.module('poiApp')
    .controller('loginController', ['setHeadersToken', '$http', '$window', 'localStorageService', '$scope', 'initUserInLocalStorage', 'checkTokenValidation',
        function (setHeadersToken, $http, $window, localStorageService, $scope, initUserInLocalStorage, checkTokenValidation) {

            self = this;

            var mymap = L.map('mapid').setView([51.505, -0.09], 13);
            L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiYXNzYWZuYSIsImEiOiJjamluZDB6bXQwY284M2tudzB6NjgyYXJ6In0.JvduB2-EOw4yMWHu6x30EA', {
                attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
                maxZoom: 18,
                id: 'mapbox.streets',
                accessToken: 'pk.eyJ1IjoiYXNzYWZuYSIsImEiOiJjamluZDB6bXQwY284M2tudzB6NjgyYXJ6In0.JvduB2-EOw4yMWHu6x30EA'
            }).addTo(mymap);

            let serverUrl = 'http://localhost:3000/';
            self.user = {
                username: self.username,
                password: self.password,
                isAdmin: self.isAdmin
            }
            self.forgetPassword = false;
            self.showVerQuestions = false;
            // $scope.indxCtrl.loggedIn = checkTokenValidation.check();
            //$scope.indxCtrl = localStorageService.get('username');

            self.data = {}
            self.questions = localStorageService.get('questions');

            $http.get(serverUrl + "poi/RandPopularPointsOfInterst")
                .then(function (response) {
                    self.randPopularPOI = response.data;
                }, function (response) {
                    self.randPopularPOI = [];
                })

            self.login = function () {
                // register user
                $http.post(serverUrl + "users/login", self.user)
                    .then(function (response) {
                        // first function handles success.
                        if (!response.data.success)
                            alert("Wrong username or password!")
                        else {
                            self.login.content = response.data.token;
                            setHeadersToken.set(self.login.content);
                            initUserInLocalStorage.addUser(self.login.content, self.user.username);
                            $scope.indxCtrl.userName = self.user.username;
                            $scope.indxCtrl.loggedIn = true;
                        }
                    }, function (response) {
                        // second function handles error
                        self.login.content = "Something went wrong!";
                    });
            }

            self.retrivePassword = function () {

                $http.post(serverUrl + "users/retrivePassword", self.data)
                    .then(function (response) {
                        if (response.data.success) {
                            self.user.password = response.data.password;
                            self.user.correctPassword = true;
                            self.user.username = self.data.username;
                        }
                        else
                            alert("Wrong verification details!");
                    }, function (response) {
                        self.login.content = "Something went wrong!"
                    });
            }

            self.showForgetPassword = function () {
                self.forgetPassword = true;
            }

            self.showQuestions = function () {
                $http.get(serverUrl + "users/userQuestions", { params: { username: self.data.username } })
                    .then(function (response) {
                        verQuestionsID = response.data;
                        self.verQuestions = []
                        self.verQuestions.push(self.questions[verQuestionsID[0].QuestId1]);
                        self.verQuestions.push(self.questions[verQuestionsID[0].QuestId2]);
                        self.showVerQuestions = false;
                        self.showVerQuestions = true;

                    }, function (response) {
                        console.log(response);
                    });
            }

            self.showPoiDetails = function (id) {
                $scope.indxCtrl.showPoiDetails(id);
            }



        }]);