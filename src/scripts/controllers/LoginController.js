angular.module(APP_NAME).controller("LoginController",
	["$scope", "AuthService", "PubSub",
	function($scope, AuthService, PubSub){
		$scope.model = {
			email: "",
			password: ""
		};
		
		$scope.success = null;
		$scope.error = null;
		
		
		
		$scope.login = function(){
			$scope.$emit("loading", null);
			AuthService.login($scope.model).then(function(authData) {
				console.log("Logged in as:", authData.uid);
				$scope.success = "User ID: " + authData.uid + ", Provider: " + authData.provider;
				$scope.$emit("loaded", null);
			}).catch(function(error) {
				console.error("Authentication failed:", error);
				$scope.error = "Error authenticating user:"+ error;
				$scope.$emit("loaded", null);
			});
		}
		
	}]
);