sportsFest.factory("Sport", ["$q", "$http", 
  function($q, $http) {
  	return {
  		get : function() {
  			return $http({
            method: 'GET',
            url: 'api/sports'
        });
  		},

  		store : function(data) {
  			return $http({
            method: 'POST',
            url: 'api/sports',
            data: data,
            headers: { 'Content-Type' : 'application/json' }
	        });
  		},

  		show : function(id) {
  			return $http.get('/api/sports/' + id);
  		},

  		update : function(id, newData) {
        return $http({
            method: 'PUT',
            url: 'api/sports/' + id,
            data: newData,
            headers: { 'Content-Type' : 'application/json' }
        })
  		},

  		destroy : function(id) {
  			return $http({
            method: 'DELETE',
            url: 'api/sports/' + id
        });
  		},

      upload : function(formData, id) {
        return $http.post('/api/upload/image/' + id, formData, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        });
      }
  	}
}])