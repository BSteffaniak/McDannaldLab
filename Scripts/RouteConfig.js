angular.module("lab").config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/Home");
    
    $stateProvider.state("/", {
            redirectTo: "/Home"
        }).state("Home", {
            url: "Home",
            views: {
                '': {
                    templateUrl: "Home.html"
                }
            }
        }).state("Publications", {
            url: "Publications",
            views: {
                '': {
                    templateUrl: "Publications.html",
                    controller: "PublicationsController"
                }
            }
        });
}]);