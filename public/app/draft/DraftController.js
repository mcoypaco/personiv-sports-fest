sportsFest.controller('DraftController', 
    ["$scope", "Player", "Team", "Sport",
        function($scope, Player, Team, Sport) { 

    var vm = this;
    vm.teams;
    vm.players;
    vm.sports;
    vm.loaded = false;
    vm.limitOptions = [10, 25, 50, 100];

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
}]);
