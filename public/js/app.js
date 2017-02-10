var sportsFest = angular.module('Sportsfest', [
	'ui.router', 'satellizer', 'ngMaterial', 'ngMessages', 'ngMdIcons',
	'homeCtrl', 'playerCtrl', 'indexCtrl', 'leftCtrl',
	]);

sportsFest.config(function($stateProvider, $urlRouterProvider, $authProvider, $httpProvider, $provide, $mdIconProvider) {
	$authProvider.loginUrl = '/api/authenticate';

    // Redirect to the auth state if any other states
    // are requested other than users
    $urlRouterProvider.otherwise('/home');
    
    $stateProvider
    	.state('tabs', {
	        abstract: true,
	        url: '/tabs',
	        templateUrl: '../views/tabs.html',
	        onEnter: function() { console.log("enter tabs.html"); }
    	})
        // .state('auth', {
        //     url: '/auth',
        //     templateUrl: '../views/authView.html',
        //     controller: 'AuthController as auth'
        // })
        // .state('users', {
        //     url: '/users',
        //     templateUrl: '../views/userView.html',
        //     controller: 'UserController as user'
        // })
        .state('home', {
            url: '/home',
            templateUrl: '../views/home.html',
            controller: 'HomeController as home'
        })
        .state('players', {
            url: '/players',
            templateUrl: '../views/players.html',
            controller: 'PlayerController as player'
        })
        .state('sports', {
            url: '/sports',
            // templateUrl: '../views/sports.html',
            // controller: 'SportController as sport'
        })
});