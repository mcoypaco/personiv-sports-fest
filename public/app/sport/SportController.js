sportsFest.controller('SportController', 
    ["$scope", "$mdDialog", "Sport", "Position",
        function($scope, $mdDialog, Sport, Position) {

    var vm = this;
    vm.sports;
    vm.newPosition = {};
    vm.editable = false;
    vm.loaded = false;

    vm.submit = function(data) {
        Sport.store(data)
            .success(function(successData) {
                console.log(successData);
                vm.getSports();
                vm.upload(successData.id);
            })
            .error(function(err) {
                console.log(err);
            })
    }

    vm.upload = function(id) {
        var formData = new FormData();
        formData.append("file", $scope.files[0].lfFile);
        //multiple upload
        // angular.forEach($scope.files, function(obj) {
        //     if(!obj.isRemote) {
        //         formData.append('files[]', obj.lfFile);
        //     }
        // });
        Sport.upload(formData, id)
            .then(function(result) {
                console.log(result)
            }, function(err) {
                console.log(err)
            });
    }

    vm.getSports = function() {
        Sport.get()
            .then(function (success) {
                vm.sports = success.data
                console.log(success.data)
                vm.loaded = true;
            }, function (error) {
                console.log(error)
            })
    }

    vm.delete = function(id) {
        Sport.destroy(id)
            .success(function (success) {
                console.log(success)
            })
            .error(function(error) {
                console.log(error)
            });
    }

    vm.update = function(id, newData) {
        console.log(newData);
        Sport.update(id, newData)
            .success(function (success) {
                console.log(success)
                vm.getSports();
            })
            .error(function(error) {
                console.log(error)
            });   
    }

    vm.addPosition = function(id) {
        console.log(id);
        vm.newPosition.id = id;
        Position.store(vm.newPosition)
            .success(function(success) {
                console.log(success)
                vm.getSports();
            })
            .error(function(error) {
                console.log(error)                
            })
    }

    vm.deletePosition = function(id) {
        Position.destroy(id)
            .success(function(success) {
                console.log(success)
                vm.getSports();
            })
            .error(function(error) {
                console.log(error)
            })
    }

    vm.addModalPosition = function(ev, id) {
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

    $scope.showConfirm = function(ev) {
        // Appending dialog to document.body to cover sidenav in docs app
        var confirm = $mdDialog.confirm()
            .title('Would you like to delete this position?')
            .textContent('"position..."')
            .ariaLabel('Position')
            .targetEvent(ev)
            .ok('DELETE')
            .cancel('Cancel');

        $mdDialog.show(confirm).then(function() {
          console.log("clicked delete")
        }, function() {
            console.log("clicked cancel")
        });
    };
}]);
