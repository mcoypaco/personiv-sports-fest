sportsFest.directive('menuLink', function () {
  return {
    scope: {
      section: '='
    },
    templateUrl: 'partials/menu-link.tmpl.html',
    link: function ($scope, $element) {
      var controller = $element.parent().controller();

      $scope.focusSection = function () {
        controller.autoFocusContent = true;
      };
    }
  };
});