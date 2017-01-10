angular.module("lab").config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $locationProvider) {
    if(window.history && window.history.pushState) {
        $locationProvider.html5Mode({
            enabled : true,
            requireBase : false
        }).hashPrefix('');
    }
    
    var pages = [{
            url: "home"
        }, {
            url: "publications",
            controller: "PublicationsController"
        }, {
            url: "people",
            controller: "PeopleController"
        }, {
            url: "resources"
        }, {
            url: "contact"
        }, {
            url: "resources/behavior"
        }, {
            url: "resources/analysis"
        }, {
            url: "resources/ardbark"
        }, {
            url: "resources/protocols"
        }];
    
    $urlRouterProvider.otherwise("home");
    
    $stateProvider.state("/", {
        redirectTo: "home"
    });
    
    pages.forEach(function (page) {
        $stateProvider.state(page.url, {
            url: '/' + page.url,
            templateUrl: '/' + page.url + '.html',
            controller: page.controller
        });
    });
}]).run(['$rootScope', function ($rootScope) {
    $rootScope.$on("$stateChangeStart", function (e, state, params, fromState, fromParams) {
        $rootScope.state = {name: state.templateUrl.substring(1, state.templateUrl.length - 5)};//state;
        $rootScope.stateParams = params;
        
        console.log(state);
    });
}]);