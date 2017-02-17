sportsFest.controller('UserController', 
    ["$scope", "User", "Role", "$mdDialog",
        function($scope, User, Role, $mdDialog) { 
	 
    var vm = this;
    vm.users;
    vm.roles;
    vm.loaded = false;

    vm.register = function(data) {
      // console.log(data)
        User.store(data)
            .success(function(successData) {
                //if success, 
                console.log(successData)
            })
            .error(function(err) {
                console.error(err)
            })
    }

    vm.getUsers = function() {
        User.get()
            .then(function(success) {
                vm.users = success.data;
                vm.loaded = true;                
            }, function(error) {
                console.log(error.data)
            })
    }
    vm.getUsers();

    vm.getRoles = function() {
        Role.get()
            .then(function(success) {
                vm.roles = success.data;
                console.log(success.data);
            }, function(error) {
                console.log(error.data)
            })
    }
    vm.getRoles();

    vm.update = function(id, data) {
        User.update(id, data)
            .then(function(success) {
                vm.getUsers();
                console.log(success.data)
            }, function(error) {
                console.log(error)
            })
    }

    //grant access
    //remove, edit users
    vm.editModal = function(ev, user) {
        $mdDialog.show({
            locals:{item: user},    
            controller: UpdateModalController,
            templateUrl: 'edit.tmpl.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose:false,
        })
        .then(function(data) {
            delete data['roles']
            console.log(data)
            vm.update(user.id, data)
        });
    }

    function UpdateModalController($scope, item, $mdDialog) {
        $scope.data = {
            email: item.email,
            first_name: item.first_name, 
            last_name: item.last_name, 
            cellphone_number: item.cellphone_number,
            role_id: item.role_id,
            roles: vm.roles
        };
        $scope.cancel = function() {
            $mdDialog.cancel();
        };

        $scope.update = function(data) {
            $mdDialog.hide(data);
        };
    }
}]);