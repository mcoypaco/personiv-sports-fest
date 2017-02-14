angular.module('playerCtrl', [])

.controller('PlayerController', function($http, $mdDialog) {

    var vm = this;
    vm.sports;
    vm.players;
    vm.i = 0;
          
    vm.submit = function(data){
        $http({
            method: 'POST',
            url: 'api/players',
            data: data,
            headers: { 'Content-Type' : 'application/json' }
        }).then(function (success){
           console.log(success.data)
        },function (error){
            console.log(error)
        });
    }
   
    vm.getSports = function(){
        $http({
            method: 'GET',
            url: 'api/sports'
        }).then(function (success){
            vm.sports = success.data
            console.log(success.data)
        },function (error){
            console.log(error.data)
        });
    }

    vm.getSport = function(id){
        return vm.sports.filter(function(item){
            return (item.id.toString() === id);
        });
    }       
    
});
