sportsFest.controller('PlayerController',
    ["$scope", "Player", "Sport","players",
        function($scope, Player, Sport, players) {

    var vm = this;
    vm.sports;

    vm.filteredPlayers;
    vm.selectedSport;
    vm.i = 0;
    vm.filteredPlayersId = [];

    vm.players = players

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
      let sportsPlayerId = [];
      Sport.players(id).then(function(players){
        for (var i = 0; i < players.data.length ; i++) {
          sportsPlayerId.push( players.data[i].id)
        }
        vm.filteredPlayersId = sportsPlayerId;
      })
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
                console.log(success);

                var anchor = angular.element('<a/>');
                anchor.css({display: 'none'}); // Make sure it's not visible
                angular.element(document.body).append(anchor); // Attach to document

                anchor.attr({
                    href: 'data:attachment/'+ type +';charset=utf-8,' + encodeURI(success.data),
                    target: '_blank',
                    download: 'document.' + type
                })[0].click();

                anchor.remove(); // Clean it up afterwards
            },function(error) {
                console.log(error.data)
            });
    }

    $scope.$watch(function () {
        return vm.selectedSport;
    }, function(newValue, oldValue) {
        if(typeof vm.selectedSport == "undefined") {
          vm.selectedSport = "all"
        }
        else if((newValue || oldValue) == "all")
        {
          vm.allPlayers();
        }
        else{
          vm.sportPlayers(vm.selectedSport);
        }
    });

    $scope.playersFilter = function(value) {
      return vm.filteredPlayersId.indexOf(value.id) > -1
    }


    $scope.$watch(function () {
        return vm.selectedPosition;
    }, function(newValue, oldValue) {
        if(newValue == "all") {
            vm.sportPlayers(vm.selectedSport);
        }else{
            vm.sortFilteredPlayers(vm.selectedPosition);
        }
    });

    vm.allPlayers = function(){
      let playersId = [];
      for (var i = 0; i < vm.players.length ; i++) {
        playersId.push(vm.players[i].id)
      }
      vm.filteredPlayersId = playersId
    }

    socket.on('add.players:App\\Events\\AddPlayers', function(broadcast){
      vm.players = broadcast.data
      vm.getPlayers();
      $scope.$apply();
      console.log(broadcast.data);
      console.log("firing");
    })


}]);
