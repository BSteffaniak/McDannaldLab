angular.module("lab").config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $locationProvider) {
    if(window.history && window.history.pushState) {
        $locationProvider.html5Mode({
            enabled : true,
            requireBase : false
        }).hashPrefix('');
        
        window.originalPathname = window.originalPathname.replace(/\/$/, "");
        window.history.replaceState(null, null, window.originalPathname + window.originalQueryString + window.originalHash);
        
        window.originalPathname = null;
        window.originalQueryString = null;
        window.originalHash = null;
    }
    
    $urlRouterProvider.otherwise("home");
    
    $stateProvider.state("/", {
        redirectTo: "home"
    });
    
    pages.forEach(function (page) {
        $stateProvider.state(page.url, {
            url: '/' + page.url,
            templateUrl: '/' + page.url + '.html',
            controller: page.controller,
            data: {
                css: page.css
            }
        });
    });
}]).run(['$rootScope', function ($rootScope) {
    $rootScope.$on("$stateChangeStart", function (e, state, params, fromState, fromParams) {
        $rootScope.state = {name: state.templateUrl.substring(1, state.templateUrl.length - 5)};//state;
        $rootScope.stateParams = params;
        
        console.log(state);
    });
}]);