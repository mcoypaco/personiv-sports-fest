// angular.module('app.controllers')
sportsFest
.controller('HomeController', ["$scope", function($scope) { 
	 var vm = this;

	 vm.hello = "hello!!";
	 $scope.imagePath = "img/picture.png"
	//

	vm.sports = [
	{
		name: "Basketball",
		description: "Basketball is good.",
		image: "basketball"
	},
	{
		name: "Volleyball",
		description: "Volleyball is good.",
		image: "volleyball"
	},
	{
		name: "Jackstone",
		description: "Jackstone is good.",
		image: "jackstone"
	},
	{
		name: "Bowling",
		description: "Bowling is good.",
		image: "bowling"
	}
	];
}]);