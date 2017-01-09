angular.module("lab").config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/home");
    
    $stateProvider.state("/", {
            redirectTo: "/home"
        }).state("home", {
            url: "/home",
            templateUrl: "home.html"
        }).state("publications", {
            url: "/publications",
            templateUrl: "publications.html",
            controller: "PublicationsController"
        }).state("people", {
            url: "/people",
            templateUrl: "people.html"
        }).state("resources", {
            url: "/resources",
            templateUrl: "resources.html"
        }).state("contact", {
            url: "/contact",
            templateUrl: "contact.html"
        });
}]);