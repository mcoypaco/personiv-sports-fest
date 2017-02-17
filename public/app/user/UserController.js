sportsFest.controller('UserController', 
    ["$scope", "User", "Role",
        function($scope, User, Role) { 
	 
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
    //grant access
    //remove, edit users
}]);