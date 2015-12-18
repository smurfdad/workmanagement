angular.module(APP_NAME).controller("RegisterController",
	["$scope", function($scope){
		var REPOSITORIO = "https://lab-smurfdad.firebaseio.com/workmanagement";
		
		$scope.model = {
			name: "",
			email: "",
			password: ""
		};
		
		$scope.success = null;
		$scope.error = null;
		
		
		$scope.register = function(){
			var ref = new Firebase(REPOSITORIO);
			ref.createUser($scope.model, function(error, userData) {
			  if (error) {
				console.log("Error creating user:", error);
				$scope.error = "Error creating user: "+ error;
			  } else {
				console.log("Successfully created user account with uid:", userData.uid);
				$scope.success = "Successfully created user account with uid: "+ userData.uid;
			  }
			});		
		}
		
	}]
);