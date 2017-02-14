angular.module('teamCtrl' , [])

  .controller('TeamController', function($http , $mdDialog ,$state ,$stateParams) {

    var vm = this;
    vm.editable = false;

    //add team to database
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

    //retrieve teams from api/teams
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

    //get team from api/teams/{id}
    vm.getTeam = function() {
      $http({
        mehod: 'GET',
        url: 'api/teams/' + $stateParams.id
      }).then(function(team) {
        vm.data = team.data[0];
        vm.getTeamPoc(team.data[0].user_id);
        console.log(team.data);
      }).catch(function(err) {
        console.log(err);
      })
    }

    //go to team route
    vm.showTeam = function(id) {
      $state.go("team_view" ,{id:id});
    }

    //retrieve players doesnt have team
    vm.getNoTeamPlayer = function()
    {
      $http({
        method:'GET',
        url: 'api/players/noteam'
      }).then(function(player) {
        vm.noTeamPlayer = player.data
      })
    }

    //get the POCs
    vm.getPocs = function()
    {
       $http({
        method:'GET',
        url: 'api/users/poc'
      }).then(function(poc) {
        vm.poc = poc.data
      })
    }

    //retrieve poc from apo/users/{id}
    vm.getTeamPoc = function(id)
    {
      $http({
       method:'GET',
       url: 'api/users/' + id
     }).then(function(poc) {
       vm.data.poc = poc.data
     }).catch(function(err){
       console.log(err);
     })
    }

  })
