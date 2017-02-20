sportsFest.controller('HomeController', ["$scope", "$http", "Sport","Team","$auth",
	function($scope, $http, Sport ,Team ,$auth) {

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

			Sport.positions(team.data.id).then(function(positions){
				vm.positions = positions.data
			})
		})

		socket.on('draft.player:App\\Events\\DraftPlayer', function(data){
			if(data.player.team_id == vm.team.id || data.player.team_id == null){
				draftUpdate(data.player)
				$scope.$apply();
			}
		})

		function draftUpdate(player){
			if(player.team_id == null){
				vm.team.players.splice(getIndex(player.id) , 1);
				console.log("null siya");
			}else{
				console.log("ga sulod kay indi null");
				vm.team.players.unshift(player)
			}
		}

		function getIndex(playerId){
			return vm.team.players.map(function(playerData){
				return playerData.id
			}).indexOf(playerId)
		}

	}

}]);
