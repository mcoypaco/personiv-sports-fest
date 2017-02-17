sportsFest.factory("Position", ["$q", "$http",
  function($q, $http) {
  	return {
  		get : function() {
  			return $http({
            method: 'GET',
            url: 'api/positions'
        });
  		},

  		store : function(data) {
  			return $http({
            method: 'POST',
            url: 'api/positions',
            data: data,
            headers: { 'Content-Type' : 'application/json' }
	        });
  		},

  		show : function(id) {
  			return $http.get('/api/positions/' + id);
  		},

  		update : function(id, newData) {
        return $http({
            method: 'PUT',
            url: 'api/positions/' + id,
            data: newData,
            headers: { 'Content-Type' : 'application/json' }
        })
  		},

  		destroy : function(id) {
  			return $http({
            method: 'DELETE',
            url: 'api/positions/' + id
        });
  		},

      players : function(id) {
        return $http.get('api/positions/' + id + '/players');
      }
  	}
}])
