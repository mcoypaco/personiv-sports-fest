// angular.module('app.controllers')
sportsFest
.controller('HomeController', ["$scope", "$http", "Sport", function($scope, $http, Sport) { 
	 var vm = this;

	 vm.hello = "hello!!";
	//

	Sport.get()
		.then(function(data) {
			vm.sports = data.data;
			console.log(data.data)
		})
	// vm.sports = [
	// {
	// 	name: "Basketball",
	// 	description: "Basketball is good.",
	// 	image: "basketball"
	// },
	// {
	// 	name: "Volleyball",
	// 	description: "Volleyball is good.",
	// 	image: "volleyball"
	// },
	// {
	// 	name: "Jackstone",
	// 	description: "Jackstone is good.",
	// 	image: "jackstone"
	// },
	// {
	// 	name: "Bowling",
	// 	description: "Bowling is good.",
	// 	image: "bowling"
	// }
	// ];

}]);