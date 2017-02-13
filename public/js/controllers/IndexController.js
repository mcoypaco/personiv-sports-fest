angular.module('app.controllers', [])

.controller('IndexController', function($scope, $http, $timeout, $mdToast, $mdDialog, $log, $mdSidenav, $mdBottomSheet, $q, MenuItemsService) { 
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

    vm.toggleRightSidebar = toggleRightSidebar;
    vm.toggleItemsList = toggleItemsList;
	vm.selectItem = selectItem;
	vm.showSimpleToast = showSimpleToast;

    function toggleRightSidebar() {
        $mdSidenav('right').toggle();
    }

    function toggleItemsList() {
      var pending = $mdBottomSheet.hide() || $q.when(true);
      console.log(pending)
      pending.then(function(){
        $mdSidenav('left').toggle();
      });
    }

    function selectItem (item) {
      // vm.title = item.name;
      vm.toggleItemsList();
      vm.showSimpleToast(item.name);
    }

    function showSimpleToast(title) {
      $mdToast.show(
        $mdToast.simple()
          .content(title)
          .hideDelay(2000)
          .position('bottom right')
      );
    }

    //data
    vm.menuItems = [];
    MenuItemsService.loadAllItems()
      .then(function(menuItems) {
        vm.menuItems = [].concat(menuItems);
      });

     //functions for menu-link and menu-toggle
        vm.isOpen = isOpen;
        vm.toggleOpen = toggleOpen;
        vm.autoFocusContent = false;
        vm.menu = MenuItemsService;

        vm.status = {
          isFirstOpen: true,
          isFirstDisabled: false
        };
        function isOpen(section) {
          return MenuItemsService.isSectionSelected(section);
        }
        function toggleOpen(section) {
          MenuItemsService.toggleSelectSection(section);
        }
});