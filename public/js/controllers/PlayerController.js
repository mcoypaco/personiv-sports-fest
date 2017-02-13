angular.module('playerCtrl', [])

.controller('PlayerController', function($http, $mdDialog) {

    var vm = this;
    vm.sports;
          
    vm.submit = function(){
        $http({
            method: 'POST',
            url: 'api/players',
            data: $.param(vm.data),
            headers: { 'Content-Type' : 'application/x-www-form-urlencoded' }
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
    
});
