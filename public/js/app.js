var sportsFest = angular.module('Sportsfest', [
	'ui.router', 'satellizer', 'ngMaterial', 'ngMessages', 'ngMdIcons',
	'app.controllers', 'app.services',
	]);

sportsFest.run(["$rootScope", function($rootScope) {
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
     // do something })
     console.log(toState)
     $rootScope.routeName = toState.url.substring(1);
    })
}]);

sportsFest.config(function($stateProvider, $urlRouterProvider, $authProvider, $httpProvider, $provide, $mdIconProvider, $mdThemingProvider) {
	$authProvider.loginUrl = '/api/authenticate';

    // Redirect to the auth state if any other states
    // are requested other than users
    $urlRouterProvider.otherwise('/home');
    
    $stateProvider
    	.state('home', {
	        url: '',
	        templateUrl: '../views/main.html',
	        controller: 'IndexController',
	        controllerAs: 'vm',
	        abstract: true
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
        .state('home.home', {
            url: '/home',
            templateUrl: '../views/home.html',
            controller: 'HomeController as home'
        })
        .state('home.players', {
            url: '/players',
            templateUrl: '../views/players.html',
            controller: 'PlayerController as player'
        })
        .state('home.sports', {
            url: '/sports',
            // templateUrl: '../views/sports.html',
            // controller: 'SportController as sport'
        })
        .state('home.draft', {
            url: '/draft',
            // templateUrl: '../views/sports.html',
            // controller: 'SportController as sport'
        })

        $mdThemingProvider
      .theme('default')
        .primaryPalette('grey', {
          'default': '100'
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

sportsFest.directive('menuToggle', ['$timeout', function ($timeout ) {
      return {
        scope: {
          section: '='
        },
        templateUrl: 'partials/menu-toggle.tmpl.html',
        link: function (scope, element) {
          var controller = element.parent().controller();

          scope.isOpen = function () {
            return controller.isOpen(scope.section);
          };
          scope.toggle = function () {
            controller.toggleOpen(scope.section);
          };
          
          var parentNode = element[0].parentNode.parentNode.parentNode;
          if (parentNode.classList.contains('parent-list-item')) {
            var heading = parentNode.querySelector('h2');
            element[0].firstChild.setAttribute('aria-describedby', heading.id);
          }
        }
      };
    }]);

sportsFest.directive('menuLink', function () {
      return {
        scope: {
          section: '='
        },
        templateUrl: 'partials/menu-link.tmpl.html',
        link: function ($scope, $element) {
          var controller = $element.parent().controller();

          $scope.focusSection = function () {
            // set flag to be used later when
            // $locationChangeSuccess calls openPage()
            controller.autoFocusContent = true;
          };
        }
      };
    });

sportsFest.filter('nospace', function () {
  return function (value) {
    return (!value) ? '' : value.replace(/ /g, '');
  };
});

sportsFest.filter('humanizeDoc', function () {
  return function (doc) {
    if (!doc) return;
    if (doc.type === 'directive') {
      return doc.name.replace(/([A-Z])/g, function ($1) {
        return '-' + $1.toLowerCase();
      });
    }
    
    return doc.label || doc.name;
  };
});