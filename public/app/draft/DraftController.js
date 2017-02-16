sportsFest.controller('DraftController', 
    ["$scope", "Player", "Team", "Sport",
        function($scope, Player, Team, Sport) { 

    var vm = this;
    vm.teams;
    vm.players;
    vm.sports;
    vm.basketball;
    vm.loaded = false;

    vm.getTeams = function() {
        Team.get().then(function (success) {
            vm.teams = success.data;
        },function (error) {
            console.log(error.data)
        });
    }

    vm.getSports = function() {
        Sport.get().then(function (success) {
           vm.sports = success.data;
          },function (error) {
            console.log(error.data)
        });
        vm.getTeams();
    }
    vm.getSports();

    // $scope.sport_id = 2;

    vm.getSport = function(id) {
        Sport.show(id)
            .then(function(success) {
                console.log(success.data)
                var name = success.data.name;
                vm.players = success.data.players;
                vm.positions = success.data.positions;
                $scope.getPosition();
            })
    }

    $scope.getPosition = function() {
        Player.getPosition(1, 2).then(function(value) {
            $scope.position = value;
        })
    }

    // vm.getSportPosition = function(arr) {
    //     vm.basketball = vm.getSport();
    //      return arr.filter(function(item) {
    //         return item.sport_id === vm.basketball.id;
    //     })[0].name;
    // }

    
    // //getting the players without any teams
    // vm.getPlayers = function(sport) {
    //    Player.noTeamGet().then(function (success) {
    //         console.error(success.data)
    //         vm.players = vm.getSportPlayers(success.data, sport);
    //     },function (error) {
    //         console.log(error.data)
    //     });
    // }

    // vm.getSport = function() {
    //     return vm.sports.filter(function(item) {
    //         return item.name.toString().ignoreCase === "Basketball".ignoreCase;
    //     })[0];  
    // }

    // vm.getSportPlayers = function(arr, sport) {
    //     var results = [];
    //     for (i = 0; i < arr.length; i++) {
    //         arr[i].sports.filter(function(item) {
    //             if(item.name.toString().ignoreCase === sport.ignoreCase) {
    //                 results.push(arr[i]);
    //             }
    //         });
    //     }
    //     return results; 
    // }

    vm.player;
    
    vm.updatePlayer = function(id, player) {
        console.log(player)
         Player.update(id, player).then(function (success) {
            console.log(success.data);
        },function (error) {
            console.log(error.data)
        });
    }
}]);
