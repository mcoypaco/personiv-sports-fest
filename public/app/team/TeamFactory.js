sportsFest.factory('Team', ['$q','$http', function($q , $http) {

  const url = 'api/teams';

  return {
    get : function() {
      return $http({
            method: 'GET',
            url: url
        })
    },
    show : function(id) {
      return $http({
          mehod: 'GET',
          url: url + '/' + id
        })
    },
    store : function(data) {
      return $http({
          method: 'POST',
          url: url,
          data: data,
          headers: { 'Content-Type' : 'application/json'}
        })
    },
    update : function(id, data) {
      return $http({
          method: 'PUT',
          url: url + '/' + id ,
          data: data,
          headers: { 'Content-Type' : 'application/json'}
        })
      },
    destroy : function(id) {

    }
  }
}])
