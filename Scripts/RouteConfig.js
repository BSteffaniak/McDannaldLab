angular.module("lab").config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/Home");
    
    $stateProvider.state("/", {
            redirectTo: "/Home"
        }).state("Home", {
            url: "/Home",
            templateUrl: "Home.html"
        }).state("Publications", {
            url: "/Publications",
            templateUrl: "Publications.html",
            controller: "PublicationsController"
        });
}]);