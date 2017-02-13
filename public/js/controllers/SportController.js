angular.module('sportCtrl', [])

.controller('SportController', function($http, $mdDialog) {

    var vm = this;
    vm.sports;
    vm.newPosition = {};
    vm.editable = false;
       
    vm.submit = function(data){
        $http({
            method: 'POST',
            url: 'api/sports',
            data: data,
            headers: { 'Content-Type' : 'application/json' }
        });
        vm.getSports();
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
            data: newData,
            headers: { 'Content-Type' : 'application/json' }
        }).then(function (success){
            console.log(success)
        },function (error){
            console.log(error)
        });
        vm.getSports();
    }

    vm.addPosition = function(id){
        console.log(id);
        vm.newPosition.id = id;
        $http({
            method: 'POST',
            url: 'api/positions',
            data: vm.newPosition,
            headers: { 'Content-Type' : 'application/json' }
        }).then(function (success){
            console.log(success)
        },function (error){
            console.log(error)
        });
        vm.getSports();
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
    vm.getSports();
});
