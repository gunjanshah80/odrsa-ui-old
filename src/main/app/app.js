(function () {

	'use strict';
   
    var md, mods, routesConfigFn;

    routesConfigFn = function($routeProvider) {
    	debugger;

    	$routeProvider
            .when('/login', {
                templateUrl: 'login/login.view.html'
            })
            .when('/home', {
                templateUrl: 'home/home.view.html'
            })
            .otherwise({ 
            	redirectTo: '/login' 
        	});

        return;
    };
 
    mods = [
    'ngRoute', 
    'ngMessages',
    'login',
    'home'
    ]; 

    md = angular.module('app', mods);

    md.controller('MainCtrl', ['$rootScope', function($rootScope) {
    	$rootScope.isExistingLogin = false;
        $rootScope.isLoginPage = false;
    }]);
    
 	md.config(['$routeProvider', '$locationProvider', '$httpProvider', function($routeProvider, $locationProvider, $httpProvider) {
 		$httpProvider.defaults.headers.common['Accept'] = 'application/json';

 		routesConfigFn($routeProvider);
 	}]); 

    /*
 	md.run(['$rootScope', '$location', function run($rootScope, $location) {

 		$rootScope.$on('$locationChangeStart', function(event, next, current) {
 			if ( $rootScope.loggedUser == null ) {
 				$location.path("/login");
 			}
 		});

 	}]); */

}).call(this); 