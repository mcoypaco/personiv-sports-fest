sportsFest.controller('HomeController', ["$scope", "$http", "Sport","Team","$auth","Position",
	,function($scope, $http, Sport ,Team ,$auth , Position) {
	var vm = this;

	let user = JSON.parse(localStorage.getItem('user'));

	vm.loaded = false;

	if($auth.isAuthenticated()){
		Sport.get()
			.then(function(data) {
				vm.sports = data.data;
				vm.loaded = true;
			})


		Team.getTeam(user.id).then(function(team){
			Team.show(team.data.id).then(function(pocteam){
				vm.team = pocteam.data[0]
				console.log(vm.team);
			})

			Position.positions(team.data.id).then(function(positions){
				vm.positions = positions
			})
		})
	}

}]);
