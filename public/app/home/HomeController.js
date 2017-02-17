sportsFest.controller('HomeController', ["$scope", "$http", "Sport", function($scope, $http, Sport) { 
	var vm = this;
	vm.loaded = false;

	Sport.get()
		.then(function(data) {
			vm.sports = data.data;
			vm.loaded = true;
		})

}]);