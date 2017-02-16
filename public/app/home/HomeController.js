sportsFest.controller('HomeController', ["$scope", "$http", "Sport", function($scope, $http, Sport) { 
	var vm = this;

	Sport.get()
		.then(function(data) {
			vm.sports = data.data;
		})

}]);