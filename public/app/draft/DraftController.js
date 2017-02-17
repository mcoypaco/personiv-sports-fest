sportsFest.controller('DraftController', 
    ["$scope", "Player", "Team", "Sport", "User",
        function($scope, Player, Team, Sport, User) { 

    var vm = this;
    vm.teams;
    vm.players;
    vm.sports;
    vm.basketball;
    vm.users;
    vm.poc;
    vm.query = {
        order: 'last_name',
        limit: 10,
        page: 1
    };
    vm.limitOptions = [10, 25, 50, 100];

    vm.getTeams = function(){
       Team.get().then(function (success) {
            vm.teams = success.data;
        },function (error) {
            console.log(error.data)
        });
    }

    //getting the players without any teams
    vm.getPlayers = function(){
       Player.noTeamGet().then(function (success) {
            vm.players = vm.getBasketballPlayers(success.data);
        },function (error) {
            console.log(error.data)
        });
    }

    vm.getBasketballSport = function() {
        return vm.sports.filter(function(item) {
            return item.name.toString().ignoreCase === "Basketball".ignoreCase;
        })[0];  
    }

    vm.getSports = function(){
        Sport.get().then(function (success) {
           vm.sports = success.data;
           vm.getTeams();
          },function (error) {
            console.log(error.data)
        });
        vm.getUsers();        
    }

    vm.getBasketballPlayers = function(arr){
        var results = [];
        for (i = 0; i < arr.length; i++) {
            arr[i].sports.filter(function(item) {
                if(item.name.toString().ignoreCase === "Basketball".ignoreCase) {
                    results.push(arr[i]);
                }
            });
        }
        return results; 
    }
    vm.getBasketballPosition = function(arr){
        vm.basketball = vm.getBasketballSport();
         return arr.filter(function(item) {
            return item.sport_id === vm.basketball.id;
        })[0].name;
    }

    vm.updatePlayer = function(id, player){
         Player.update(id, player).then(function (success) {
            console.log(success.data);
        },function (error) {
            console.log(error.data)
        });
    }
    vm.removePlayer = function(id, player){
        player.team_id = null;
        vm.updatePlayer(id, player);
    }

    vm.getUsers = function(){
        User.get().then(function (success){
            vm.users = success.data
        }, function (error) {
            console.log(error.data)
        });
    }

    vm.getUser = function(id){
        return vm.users.filter(function(item) {
            return (item.id === id);
        })[0];
    }
}]);
