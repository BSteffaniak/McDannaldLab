angular.module("lab").config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $locationProvider) {
    if(window.history && window.history.pushState) {
        $locationProvider.html5Mode({
            enabled : true,
            requireBase : false
        }).hashPrefix('');
    }
    
    // $urlRouterProvider.otherwise("home");
    var location = window.location.pathname.substring(1);
    
    if (location.indexOf("template") == 0) {
        var end = location.indexOf('/');
        end = end > 0 ? end : location.length;
        
        location = location.substring(0, end);
        
        var state = "home";
        
        if (window.location.hash) {
            state = window.location.hash.substring(7);
        }
        
        $urlRouterProvider.otherwise(location + "/" + state);
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
    
    // $stateProvider.state("/template2", {
    //     redirectTo: "template2/home"
    // });
    
    // pages.forEach(function (page) {
    //     $stateProvider.state(page.url, {
    //         url: '/' + page.url,
    //         templateUrl: '/' + page.url + '.html',
    //         controller: page.controller
    //     });
    // });
    pages.forEach(function (page) {
        $stateProvider.state('template1/' + page.url, {
            url: '/template1/' + page.url,
            templateUrl: '/' + page.url + '.html',
            controller: page.controller
        });
    });
    pages.forEach(function (page) {
        $stateProvider.state('template2/' + page.url, {
            url: '/template2/' + page.url,
            templateUrl: '/' + page.url + '.html',
            controller: page.controller
        });
    });
}]).run(['$rootScope', function ($rootScope) {
    $rootScope.$on("$stateChangeStart", function (e, state, params, fromState, fromParams) {
        $rootScope.state = {name: state.templateUrl.substring(1, state.templateUrl.length - 5)};//state;
        $rootScope.stateParams = params;
        
        console.log(state);
        
        var location = window.location.pathname.substring(1);
        
        if (location.indexOf("template") == 0) {
            var end = location.indexOf('/');
            end = end > 0 ? end : location.length;
            
            location = location.substring(0, end);
            
            $rootScope.template = location;
        }
    });
}]);