var sportsFest = angular.module('Sportsfest', [
  'ui.router', 'satellizer', 'ngMaterial', 'ngMessages', 'ngMdIcons', 'ui.router.title', 'lfNgMdFileInput', 'md.data.table'
  ]);

sportsFest.run(["$rootScope", "$state", "$stateParams", "$auth", function($rootScope, $state, $stateParams, $auth) {
  $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
    $rootScope.isAuthenticated = function() {
      return $auth.isAuthenticated();
    }
    $rootScope.user = JSON.parse(localStorage.getItem('user'));
    $rootScope.routeName = toState.url.substring(1);
    var requireLogin = toState.data.requireLogin;
    if (requireLogin && !$auth.isAuthenticated()) {
      $state.go('login');
      event.preventDefault();
    }
    else if (!requireLogin && $auth.isAuthenticated() && toState.name === "login") {
      event.preventDefault();
      $state.go('home.home');
    }
  })
}]);

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
