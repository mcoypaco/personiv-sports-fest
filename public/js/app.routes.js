sportsFest.config(function($stateProvider, $urlRouterProvider, $authProvider, $httpProvider, $provide, $mdIconProvider, $mdThemingProvider) {
	$authProvider.loginUrl = '/api/authenticate';

    // Redirect to the auth state if any other states
    // are requested other than users
    $urlRouterProvider.otherwise('/home');

    $stateProvider
    	.state('home', {
	        url: '',
	        templateUrl: '../app/index/_main.html',
	        controller: 'IndexController',
	        controllerAs: 'vm',
	        abstract: true,
          // data: {
          //     requireLogin: true
          // },
	    })
        .state('login', {
            url: '/login',
            templateUrl: '../app/auth/_login.html',
            controller: 'AuthController as auth',
            data: {
                requireLogin: false
            },
            resolve: {
              $title: function() { return 'Login'; }
            }
        })
        .state('home.users', {
            url: '/users',
            templateUrl: '../app/user/_sign-up.html',
            controller: 'UserController as user',
            data: {
                requireLogin: true
            },
            resolve: {
              $title: function() { return 'Users'; }
            }
        })
        .state('home.home', {
            url: '/home',
            templateUrl: '../app/home/_home.html',
            controller: 'HomeController as home',
            data: {
                requireLogin: false
            },
            resolve: {
              $title: function() { return 'Home'; }
            }
        })
        .state('home.players', {
            url: '/players',
            templateUrl: '../app/player/_player.html',
            controller: 'PlayerController as player',
            data: {
                requireLogin: true
            },
            resolve: {
              $title: function() { return 'Players'; }
            },
        })
        .state('home.draft', {
            url: '/draft',
            templateUrl: '../app/draft/_draft.html',
            controller: 'DraftController as draft',
            data: {
                requireLogin: true
            },
            resolve: {
              $title: function() { return 'Draft'; }
            }
        })
        //
        .state('home.sports', {
            url: '/sports',
            templateUrl: '../app/sport/_sport.html',
            controller: 'SportController as sport',
            data: {
                requireLogin: true
            },
            resolve: {
              $title: function() { return 'Sports'; }
            }
        })
        .state('home.teams', {
            url: '/teams',
            templateUrl: '../app/team/_team.html',
            controller: 'TeamController as team',
            data: {
                requireLogin: true
            },
            resolve: {
              $title: function() { return 'Teams'; }
            }
        })
        .state('home.teams.view' , {
            url: '/teams/{id}',
            templateUrl: '../app/team/_view-team.html',
            controller: 'TeamController as team',
            data: {
                requireLogin: true
            },
        })
        .state('home.register', {
            url: '/register',
            templateUrl: '../app/player/_registration.html',
            controller: 'PlayerController as player',
            data: {
                requireLogin: false
            },
            resolve: {
              $title: function() { return 'Register'; }
            }
        });

        $mdThemingProvider
      .theme('default')
        .primaryPalette('grey', {
          'default': '500'
        })
        .accentPalette('teal', {
          'default': '500'
        })
        .warnPalette('defaultPrimary');

        $mdThemingProvider.theme('dark', 'default')
          .primaryPalette('defaultPrimary')
          .dark();

        $mdThemingProvider.theme('grey', 'default')
          .primaryPalette('grey');

        $mdThemingProvider.theme('custom', 'default')
          .primaryPalette('defaultPrimary', {
            'hue-1': '50'
        });

        $mdThemingProvider.definePalette('defaultPrimary', {
          '50':  '#FFFFFF',
          '100': 'rgb(255, 198, 197)',
          '200': '#E75753',
          '300': '#E75753',
          '400': '#E75753',
          '500': '#E75753',
          '600': '#E75753',
          '700': '#E75753',
          '800': '#E75753',
          '900': '#E75753',
          'A100': '#E75753',
          'A200': '#E75753',
          'A400': '#E75753',
          'A700': '#E75753'
        });
});