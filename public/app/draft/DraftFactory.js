sportsFest.factory("Draft", ["$q", "$http",
  function($q, $http) {
  	return {

  		store : function(data) {
  			return $http({
	            method: 'POST',
	            url: 'api/drafts',
	            data: data,
	            headers: { 'Content-Type' : 'application/json' }
	        });
  		},

  		destroy : function(id) {
  			return $http.delete('/api/drafts/' + id);
  		},

  	}
}])
