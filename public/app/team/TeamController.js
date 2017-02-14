// angular.module('app.controllers')
sportsFest
  .controller('TeamController', function($http , $mdDialog) {

    var vm = this;
    vm.teams;
    vm.editable = false;

    vm.addTeam = function(data){
      $http({
        method: 'POST',
        url: 'api/teams',
        data: data,
        headers: { 'Content-Type' : 'application/json'}
      }).then(function(response) {
        console.log(data);
        console.log(response);
      }).catch(function(err){
        console.log(data);
        console.log(err);
      })
    }

    vm.getTeams = function() {
      $http({
          method: 'GET',
          url: 'api/teams'
      }).then(function (team) {
        vm.teams = team.data
      }, function(error){
        console.log(error)
      })
    }

    vm.showTeam = function(id) {
      $http({
        mehod: 'GET',
        url: 'api/team/' + id
      }).then(function(team) {
        vm.team = team.data
      }).catch(function(err) {
        console.log(err);
      })
    }

    vm.getNoTeamPlayer = function()
    {
      $http({
        method:'GET',
        url: 'api/players/noteam'
      }).then(function(player) {
        vm.noTeamPlayer = player.data
      })
    }

    vm.getPocs = function()
    {
       $http({
        method:'GET',
        url: 'api/users/poc'
      }).then(function(poc) {
        vm.poc = poc.data
      })

      return vm.poc
    }

  })
