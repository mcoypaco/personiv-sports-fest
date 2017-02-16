sportsFest.controller('HomeController', ["$scope", "$http", "Sport", function($scope, $http, Sport) {
	var vm = this;
	vm.access;
	vm.isAdmin;
	Sport.get()
		.then(function(data) {
			vm.sports = data.data;
		})

}]);
