sportsFest.controller('PlayerController',
    ["$scope", "Player", "Sport","Position",
        function($scope, Player, Sport, Position) {

    var vm = this;
    vm.sports;

    vm.filteredPlayers;
    vm.selectedSport;
    vm.i = 0;
    vm.filteredPlayersId = [];
    vm.loaded = false
    vm.players;

    vm.getAllPlayers =function(){
      Player.get().then(function (success) {
        vm.players = success.data;
        vm.loaded = true
      })
    }

    vm.getAllPlayers();

    vm.submit = function(data) {
        Player.store(data)
            .success(function(successData) {
                //if success,
                console.log(successData)
            })
            .error(function(err) {
                console.error(err)
            })
    }

    vm.getSports = function() {
        Sport.get()
            .then(function(success) {
                vm.sports = success.data;
                console.log(success.data);
            }, function(error) {
                console.log(error.data)
            })
    }

    vm.getSport = function(id) {
        return vm.sports.filter(function(item){
            return (item.id.toString() === id);
        });
    }

    vm.sportPlayers = function(id) {
        vm.loaded = false
      if(id == "all"){
        vm.loaded = true
        vm.getAllPlayers();
      }
      else{
        Sport.players(id).then(function(players){
          vm.players = players.data
          vm.sportPlayerList = players.data
          vm.loaded = true
        })
      }
    }

    vm.positionPlayers = function(id){
        vm.loaded = false
      if(id == "all"){
        vm.loaded = true
        vm.players = vm.sportPlayerList;
      }
      else{
        Position.players(id).then(function(players){
          vm.players = players.data
          vm.loaded = true
        })
      }
    }

    vm.sortFilteredPlayers = function(id) {
        var results = [];
         for (i = 0; i < vm.filteredPlayers.length; i++) {
            vm.filteredPlayers[i].positions.filter(function(item) {
                if(item.id.toString() === id) {
                    results.push(vm.filteredPlayers[i]);
                }
            });
        }
        vm.filteredPlayers = results;
    }

    vm.getPosition = function(arr, id) {
        return arr.filter(function(item) {
            return (item.sport_id === id);
        });
    }

    vm.export = function(type) {
        Player.export(type)
            .then(function(success) {
                Player.exportFile(success, type);
            },function(error) {
                console.log(error.data)
            });
    }


    socket.on('add.players:App\\Events\\AddPlayers', function(broadcast){
      $scope.$apply(function(){
        vm.players.unshift(broadcast.data);
      });
    })



}]);
