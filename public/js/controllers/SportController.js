angular.module('sportCtrl', [])

.controller('SportController', function($http, $mdDialog) {

    var vm = this;
    vm.sports;
    vm.newPosition = {};
       
    vm.submit = function(){
        $http({
            method: 'POST',
            url: 'api/sports',
            data: $.param(vm.data),
            headers: { 'Content-Type' : 'application/x-www-form-urlencoded' }
        })
    }        

    vm.getSports = function(){
        $http({
            method: 'GET',
            url: 'api/sports'
        }).then(function (success){
            vm.sports = success.data
            console.log(success.data)
        },function (error){
            console.log(error)
        });
    }

    vm.delete = function(id){
        $http({
            method: 'DELETE',
            url: 'api/sports/' + id
        }).then(function (success){
            console.log(success.data)
        },function (error){
            console.log(error)
        });
    }

    vm.update = function(id, newData){
        console.log(newData);
        $http({
            method: 'PUT',
            url: 'api/sports/' + id,
            data: $.param(newData),
            headers: { 'Content-Type' : 'application/x-www-form-urlencoded' }
        }).then(function (success){
            console.log(success)
        },function (error){
            console.log(error)
        });
    }

    vm.addPosition = function(id){
        console.log(id);
        vm.newPosition.id = id;
        $http({
            method: 'POST',
            url: 'api/positions',
            data: $.param(vm.newPosition),
            headers: { 'Content-Type' : 'application/x-www-form-urlencoded' }
        }).then(function (success){
            console.log(success)
        },function (error){
            console.log(error)
        });
    }

    vm.addModalPosition = function(ev, id){
         var confirm = $mdDialog.prompt()
        .title('Please write the name of the position')
        .placeholder('Position name')
        .ariaLabel('Position name')
        .initialValue('name')
        .targetEvent(ev)
        .ok('Save')
        .cancel('Cancel');

        $mdDialog.show(confirm).then(function(result) {
            vm.newPosition.name = result;
            vm.addPosition(id);
        });
    }

    vm.deletePosition = function(id){
        $http({
            method: 'DELETE',
            url: 'api/positions/' + id
        }).then(function (success){
            console.log(success.data)
        },function (error){
            console.log(error)
        });
    }
});
