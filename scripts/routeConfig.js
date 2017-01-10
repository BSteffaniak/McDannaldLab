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
        }).state("resources/behavior", {
            url: "/resources/behavior",
            templateUrl: "resources/behavior.html"
        }).state("resources/analysis", {
            url: "/resources/analysis",
            templateUrl: "resources/analysis.html"
        }).state("resources/ardbark", {
            url: "/resources/ardbark",
            templateUrl: "resources/ardbark.html"
        }).state("resources/protocols", {
            url: "/resources/protocols",
            templateUrl: "resources/protocols.html"
        });
}]);