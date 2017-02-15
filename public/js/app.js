var sportsFest = angular.module('Sportsfest', [
	'ui.router', 'satellizer', 'ngMaterial', 'ngMessages', 'ngMdIcons', 'ui.router.title', 'lfNgMdFileInput',
	// 'app.controllers', 'app.services',
	]);

sportsFest.run(["$rootScope", "$state", "$stateParams", "$auth", function($rootScope, $state, $stateParams, $auth) {
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
     // do something })
     $rootScope.isAuthenticated = function() {
        return $auth.isAuthenticated();
     }
        $rootScope.user = JSON.parse(localStorage.getItem('user'));
        $rootScope.routeName = toState.url.substring(1);
        var requireLogin = toState.data.requireLogin;
        // alert(requireLogin)
        if (requireLogin && !$auth.isAuthenticated()) {
            // alert("hoy")
            $state.go('login');
            event.preventDefault();
        }
        else if (!requireLogin && $auth.isAuthenticated() && toState.name === "login") {
            event.preventDefault();
            $state.go('home.home');
        }
    })
}]);

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
