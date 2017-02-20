sportsFest.factory("Role", ["$q", "$http",
  function($q, $http) {

  	return {
  		get : function() {
  			return $http({
            method: 'GET',
            url: 'api/roles'
        });
  		},

  		store : function(data) {
  			return $http({
            method: 'POST',
            url: 'api/roles',
            data: data,
            headers: { 'Content-Type' : 'application/json' }
	        });
  		},

  		show : function(id) {
  			return $http.get('/api/roles/' + id);
  		},

  		update : function(id, newData) {
        return $http({
            method: 'PUT',
            url: 'api/roles/' + id,
            data: newData,
            headers: { 'Content-Type' : 'application/json' }
        })
  		},

  		destroy : function(id) {
  			return $http({
            method: 'DELETE',
            url: 'api/roles/' + id
        });
  		},

      getAdminId : function() {
        return $http({
          method: 'GET',
          url: 'api/roles/admin'
        });
      },

			getPocId : function() {
				return $http.get('api/roles/poc');
			}
  	}
}])
