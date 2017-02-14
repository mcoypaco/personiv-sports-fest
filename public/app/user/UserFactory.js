sportsFest.factory("User", ["$q", "$http", 
  function($q, $http) {
  	return {
  		get : function() {
  			return $http({
            method: 'GET',
            url: 'api/users'
        });
  		},

  		store : function(data) {
  			return $http({
            method: 'POST',
            url: 'api/users',
            data: data,
            headers: { 'Content-Type' : 'application/json' }
	        });
  		},

  		show : function(id) {
  			return $http.get('/api/users/' + id);
  		},

  		update : function(id, newData) {
        return $http({
            method: 'PUT',
            url: 'api/users/' + id,
            data: newData,
            headers: { 'Content-Type' : 'application/json' }
        })
  		},

  		destroy : function(id) {
  			return $http({
            method: 'DELETE',
            url: 'api/users/' + id
        });
  		}
  	}
}])