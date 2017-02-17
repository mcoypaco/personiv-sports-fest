sportsFest.controller('DraftController',
    ["$scope", "Player", "Team", "Sport", "$mdDialog",
        function($scope, Player, Team, Sport, $mdDialog) {

    var vm = this;
    vm.teams;
    vm.players;
    vm.sports;
    vm.loaded = false;
    vm.limitOptions = [10, 25, 50, 100];
    vm.sportsId;
    vm.query = {
        order: 'last_name',
        limit: 10,
        page: 1
    };

    vm.getTeams = function() {
        Team.get().then(function (success) {
            vm.teams = success.data;
            vm.loaded = true;
        },function (error) {
            console.log(error.data)
        });
    }

    vm.getSports = function() {
        Sport.get().then(function (success) {
           vm.sports = success.data;
           vm.getTeams();
          },function (error) {
            console.log(error.data)
        });
    }
    vm.getSports();

    vm.sportId;
    vm.getSportPlayers = function(sportId) {
        vm.sportsId = sportId;
        vm.loaded = false;
        vm.sportId = sportId;
        Sport.getPlayers(sportId)
            .then(function(success) {
                vm.loaded = true;
                vm.players = success.data;
            }, function(error) {
                console.log(error)
            })
    }

    vm.getPosition = function(positions) {
        return positions.filter(function(item) {
            return (item.sport_id === vm.sportId);
        })[0];
    }

    vm.updatePlayer = function(id, player) {
        console.log(player)
         Player.update(id, player).then(function (success) {
            console.log(success.data);
        },function (error) {
            console.log(error.data)
        });

    }

    vm.removePlayer = function(player){
        player.team_id = null;
        vm.updatePlayer(player.id, player);
    }

    vm.showConfirm = function(ev, player) {
        var confirm = $mdDialog.confirm()
            .title('Would you like to Remove this player?')
            .textContent(player.first_name + ' ' + player.last_name)
            .ariaLabel('Position')
            .targetEvent(ev)
            .ok('REMOVE')
            .cancel('Cancel');

        $mdDialog.show(confirm).then(function() {
          console.log("clicked delete")
          vm.removePlayer(player);
        }, function() {
            console.log("clicked cancel")
        });
    };

    socket.on('draft.player:App\\Events\\DraftPlayer', function(data){
      vm.getTeams();
      draftUpdate(data.player);
      console.log(data.player);
      $scope.$apply();
    })

    function getIndex(playerId){
      return vm.players.map(function(playerData){
        return playerData.id
      }).indexOf(playerId)
    }

    function draftUpdate(player){
      if(player.team_id == null)
      {
        vm.getSportPlayers(vm.sportsId);
      }else{
        vm.players.splice(getIndex(player.id) , 1);
      }
    }

}]);
