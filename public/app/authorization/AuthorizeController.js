sportsFest.controller('AuthorizeController',["Authorize","$auth", function(Authorize,$auth){

var vm = this;

	if($auth.isAuthenticated())
	{
		Authorize.isAdmin().then(function(admin){
			vm.isAdmin = admin
		})

		Authorize.isPoc().then(function(poc){
			vm.isPoc = poc
		})
	}
}])
