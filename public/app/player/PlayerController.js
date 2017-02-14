sportsFest.controller('PlayerController', 
    ["$scope", "Player", "Sport",
        function($scope, Player, Sport) { 

    var vm = this;
    vm.sports;
    vm.players;
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

    vm.getSport = function(id){
        return vm.sports.filter(function(item){
            return (item.id.toString() === id);
        });
    }       
    
}]);
