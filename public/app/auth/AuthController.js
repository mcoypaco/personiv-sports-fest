sportsFest.controller('AuthController',
    ["$scope", "$auth", "Auth", "$rootScope", "$state", "$window",
        function($scope, $auth, Auth, $rootScope, $state, $window) {

    var vm = this;
    vm.loginError = false;
    vm.loginErrorText;

    vm.login = function() {
        var credentials = {
            email: vm.email,
            password: vm.password
        }

        $auth.login(credentials)
            .then(function(data) {
                return Auth.getAuthenticatedUser().then(function(response) {
                    localStorage.setItem('user', JSON.stringify(response.data.user));
                    $rootScope.currentUser = response.data.user;
                    console.log($rootScope.currentUser)
										$window.location.reload();
                    $state.go('home.home');
                });
            }, function(error) {
                // console.log(error)
                vm.password = "";
                vm.loginError = true;
                console.log(error.data.error)
                vm.loginErrorText = error.data.error;
            });
    }

}]);
