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
    vm.getSports();

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
        .title('New Position')
        .placeholder('Position name')
        .ariaLabel('Position name')
        // .initialValue('name')
        .targetEvent(ev)
        .ok('Save')
        .cancel('Cancel');

        $mdDialog.show(confirm).then(function(result) {
            vm.newPosition.name = result;
            vm.addPosition(id);
        });
    }

    vm.showConfirm = function(ev, item, type) {
        var confirm = $mdDialog.confirm()
            .title('Would you like to delete ?')
            .textContent(item.name)
            .ariaLabel('Item')
            .targetEvent(ev)
            .ok('DELETE')
            .cancel('Cancel');

        $mdDialog.show(confirm).then(function() {
            if(type == "position"){
                vm.deletePosition(item.id);
            }
            else{
                vm.delete(item.id);
            }            
        }, function() {
            console.log("clicked cancel")
        });
    };

    vm.updateModal = function(ev, item) {
        $mdDialog.show({
            locals:{item: item},    
            controller: UpdateModalController,
            templateUrl: 'update.tmpl.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose:false,
        })
        .then(function(data) {
            vm.update(item.id, data);
        });
    }

    function UpdateModalController($scope, item, $mdDialog) {
        $scope.data={name:item.name, description:item.description};
        $scope.cancel = function() {
            $mdDialog.cancel();
        };

        $scope.update = function(data) {
            $mdDialog.hide(data);
        };
    }
}]);
