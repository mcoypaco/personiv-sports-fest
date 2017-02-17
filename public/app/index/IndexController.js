sportsFest.controller('IndexController',
    ["$scope", "$mdToast", "$mdDialog", "$log", "$mdSidenav", "$mdBottomSheet", "$q", "MenuItemsService", "$mdMenu", "$auth", "$state", "$window","Role",
        function($scope, $mdToast, $mdDialog, $log, $mdSidenav, $mdBottomSheet, $q, MenuItemsService, $mdMenu, $auth, $state, $window , Role) {

    var vm = this;
	  vm.user;


    vm.getRole = function(id) {
       Role.show(id).then(function(role){
         vm.role = role.data
         console.log(role.data);
      })
    }

    vm.logout = function() {
        $mdSidenav('right').toggle();
        localStorage.removeItem('user');
        $auth.logout();
        $state.go("home.home");
        $window.location.reload();
    }

    vm.isAuthenticated = function() {
        return $auth.isAuthenticated();
    };

    $scope.setHome = function() {
    	 $scope.currentNavItem = 'home';
    }

    vm.toggleRightSidebar = toggleRightSidebar;
    vm.toggleItemsList = toggleItemsList;
  	vm.selectItem = selectItem;
  	vm.showSimpleToast = showSimpleToast;

    function toggleRightSidebar() {
        $mdSidenav('right').toggle();
    }

    function toggleItemsList() {
      var pending = $mdBottomSheet.hide() || $q.when(true);
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
          .hideDelay(1500)
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
}]);
