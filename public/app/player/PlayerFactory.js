sportsFest.factory("Player", ["$q", "$http", 
  function($q, $http) {
  	return {
  		get : function() {
  			return $http({
				method: 'GET',
				url: 'api/players'
        	});
  		},

  		noTeamGet : function() {
  			return $http({
  				method: 'GET',
  				url: 'api/players/noteam'
  			});
  		},

      getPosition : function(id, sportId) {
        var deferred = $q.defer();
        this.show(id)
          .then(function(player) {
            for (var item of player.data.positions) {
              if(item.sport_id === sportId) {
                deferred.resolve(item)
                break;
              }
            }
          })
        return deferred.promise;
      },

  		store : function(data) {
  			return $http({
	            method: 'POST',
	            url: 'api/players',
	            data: data,
	            headers: { 'Content-Type' : 'application/json' }
	        });
  		},

  		show : function(id) {
  			return $http.get('/api/players/' + id);
  		},

  		update : function(id, data) {
			   return $http({
	            method: 'POST',
	            url: 'api/players/' + id,
	            data: data,
	            headers: { 'Content-Type' : 'application/json' }
	        });
  		},

  		destroy : function(id) {
  			return $http.delete('/api/players/' + id);
  		},

      export : function(type) {
        return $http({
          method: 'GET',
          url: '/api/players/export/' + type,
          headers: {'Content-Type' : 'application/csv; charset=UTF-8'},
        });
      }
  	}
}])