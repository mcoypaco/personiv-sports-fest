sportsFest.factory('Authorize',["Role",function(Role){

	let user = JSON.parse(localStorage.getItem('user'));

  return {
    isAdmin : function()  {
      return Role.getAdminId().then(function(adminId){
        var id = parseInt(adminId.data)
        return (user.role_id == id)
      })
    },
    isPoc : function() {
      return Role.getPocId().then(function(pocId){
        var id = parseInt(pocId.data)
        return (user.role_id == id)
      })
    }

  }
}]);
