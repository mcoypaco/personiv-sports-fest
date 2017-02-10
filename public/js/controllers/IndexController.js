angular.module('indexCtrl', [])

.controller('IndexController', function($scope, $http, $timeout, $mdDialog, $log, $mdSidenav) { 
	 var vm = this;
	 var originatorEv;

	 vm.hello = "hello!!";

	//
    $scope.currentNavItem = 'home';

    $scope.setHome = function() {
    	$scope.currentNavItem = 'home';
    }

    $scope.announceClick = function() {
        $mdDialog.show(
        $mdDialog.alert()
            .title('You clicked!')
            .textContent('You clicked')
            .ok('Nice')
            .targetEvent(originatorEv)
        );
        originatorEv = null;
    };

    $scope.openSideNavPanel = function() {
        $mdSidenav('left').open();
    };
    $scope.closeSideNavPanel = function() {
        $mdSidenav('left').close();
    };
});