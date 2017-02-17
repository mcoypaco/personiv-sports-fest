sportsFest.factory("Auth", ["$q", "$http", 
    function($q, $http) {
  	    return {
        getAuthenticatedUser : function() {
          return $http({
                method: 'GET',
                url: 'api/authenticate/user'
            });
        }
  		// get : function() {
  		// 	return $http({
    //         method: 'GET',
    //         url: 'api/players'
    //     });
  		// },

  		// store : function(data) {
  		// 	return $http({
	   //          method: 'POST',
	   //          url: 'api/players',
	   //          data: data,
	   //          headers: { 'Content-Type' : 'application/json' }
	   //      });
  		// },

  		// show : function(id) {
  		// 	return $http.get('/api/players/' + id);
  		// },

  		// update : function() {

  		// },

  		// destroy : function(id) {
  		// 	return $http.delete('/api/players/' + id);
  		// }
  	}
}])