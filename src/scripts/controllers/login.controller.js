angular.module(APP_NAME).controller("loginController",
	["$log","$scope", "authService"
	, function($log, $scope, authService){
		$scope.model = {
			email: "",
			password: ""
		};
		$scope.loginError = false;
		
		$scope.login = function(){
			$scope.$emit("loading", null);
			$log.debug($scope.model);
			authService.login($scope.model).then(function(authData) {
				console.log("Logged in as:", authData.uid);
				$scope.loginError = false;
				$scope.$emit("loaded", null);
			}).catch(function(error) {
				$log.error("Authentication failed:", error);
				$scope.loginError = true;
				$scope.$emit("loaded", null);
			});
		}
		
	}]
);