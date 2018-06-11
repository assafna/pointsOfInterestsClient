let app = angular.module('poiApp', ["ngRoute"]);

app.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('');

    $routeProvider
        // not registered
        .when('/', {
            templateUrl: 'Components/Login/login.html',
            controller : 'loginController as lgnCtrl'
        })
        // registered
        .when('/home', {
            templateUrl: 'Components/Home/home.html',
            controller : 'homeController as homeCtrl'
        })
        .when('/about', {
            templateUrl: 'Components/About/about.html',
            controller : 'aboutController as abtCtrl'
        })
        .when('/register', {
            templateUrl: 'Components/Register/register.html',
            controller : 'registerController as regCtrl'
        })
        .when('/poi', {
            templateUrl: 'Components/POI/poi.html',
            controller : 'poiCtrl as poiCtrl'
        })
        .when('/favPoi', {
            templateUrl: 'Components/FavPOI/favPoi.html',
            controller : 'favPoiCtrl as fpoiCtrl'
        })
        .otherwise({ redirectTo: '/' });
}]);