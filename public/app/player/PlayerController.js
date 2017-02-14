sportsFest.controller('PlayerController', 
    ["$scope", "Player", "Sport",
        function($scope, Player, Sport) { 

    var vm = this;
    vm.sports;
    vm.players;
    vm.filteredPlayers;
    vm.selectedSport;
    vm.i = 0;
          
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

    vm.sortPlayers = function(id) {
        var results = [];
        for (i = 0; i < vm.players.length; i++) {
            vm.players[i].sports.filter(function(item) {
                if(item.id.toString() === id) {
                    results.push(vm.players[i]);
                }
            });
        } 
        return results;      
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

    vm.getPlayers = function() {
        Player.get()
            .then(function (success) {
                vm.players = success.data;
                vm.filteredPlayers = success.data;
            },function (error) {
                console.log(error.data)
            });
    }

    vm.getPosition = function(arr, id) {
        // console.log(arr);
        // console.log(id);
        return arr.filter(function(item) {
            return (item.sport_id === id);
        });
    }

    $scope.$watch(function () {
        return vm.selectedSport;
    }, function(newValue, oldValue) {
        if(newValue == "all") {
            vm.filteredPlayers = vm.players;
            vm.selectedPosition = 'all';
        }else if(newValue != oldValue) {
            vm.filteredPlayers = vm.sortPlayers(newValue);
        }      
    });

    $scope.$watch(function () {
        return vm.selectedPosition;
    }, function(newValue, oldValue) {
        if(newValue == "all") {
            vm.filteredPlayers = vm.sortPlayers(vm.selectedSport);
        } else if(newValue != oldValue) {
            vm.filteredPlayers = vm.sortPlayers(vm.selectedSport);
            vm.sortFilteredPlayers(newValue);
        }      
    });
    
}]);
