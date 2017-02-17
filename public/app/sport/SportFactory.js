sportsFest.factory("Sport", ["$q", "$http",
  function($q, $http) {
    const url = 'api/sports';
  	return {
  		get : function() {
  			return $http({
            method: 'GET',
            url: url
        });
  		},

  		store : function(data) {
  			return $http({
            method: 'POST',
            url: url,
            data: data,
            headers: { 'Content-Type' : 'application/json' }
	        });
  		},

  		show : function(id) {
  			return $http({
            mehod: 'GET',
            url: url + '/' +  id
          })
  		},

  		update : function(id, newData) {
        return $http({
            method: 'PUT',
            url: url + '/' + id,
            data: newData,
            headers: { 'Content-Type' : 'application/json' }
        })
  		},

  		destroy : function(id) {
  			return $http({
            method: 'DELETE',
            url: url + '/' + id
        });
  		},

      upload : function(formData, id) {
        return $http.post(url + '/upload/' + id, formData, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        });
      },
      players : function(id) {
        return $http.get('api/sports/' + id + '/players')
      },
      positions : function(id) {
        return $http.get('api/sports/' + id + '/positions')
      },
      getPlayers : function(id) {
        return $http.get(url + '/players/noteam/' + id);
      }
  	}
}])
