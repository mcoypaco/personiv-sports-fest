var sportsFest = angular.module('Sportsfest', [
	'ui.router', 'satellizer', 'ngMaterial',
	'homeCtrl','sportCtrl','teamCtrl','playerCtrl'
	]);

sportsFest.config(function($stateProvider, $urlRouterProvider, $authProvider, $httpProvider, $provide) {
	$authProvider.loginUrl = '/api/authenticate';

    // Redirect to the auth state if any other states
    // are requested other than users
    $urlRouterProvider.otherwise('/home');

    $stateProvider
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
        .state('sports', {
            url: '/sports',
            templateUrl: '../views/sport.html',
            controller: 'SportController as sport'
        })
				.state('teams', {
					url: '/teams',
					templateUrl: '../views/team/_team.html',
					controller: 'TeamController as team'
				})
				.state('teams.view' , {
					url: '/teams/{id}',
					templateUrl: '../views/team/_view-team.html',
					controller: 'TeamController as team'
				})
        .state('register', {
            url: '/register',
            templateUrl: '../views/registration.html',
            controller: 'PlayerController as player'
        });
});
