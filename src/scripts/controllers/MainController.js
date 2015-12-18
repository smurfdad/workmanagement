angular.module(APP_NAME).controller("MainController",
	["$log", "$scope","AuthService", "PubSub","$timeout", "$uibModal"
	,function($log, $scope, AuthService, PubSub, $timeout, $uibModal){
		$log.debug("MainController");
		$scope.title = "WorkManagement";
		$scope.authData = null;
		var modalInstance = null;
		var modalRequest = 0;
		
		$scope.logout = function(){
			AuthService.logout();
		};
		
		$scope.$on("loading", function(event, data){
			$log.debug("Recibida peticion loading, activas", modalRequest);
			modalRequest++;
			if(modalRequest > 0){
				modalInstance = $uibModal.open({
					templateUrl : "views/loading.view.html",
					size:"sm"
				});
			}
		});
		
		$scope.$on("loaded", function(event, data){
			$log.debug("Recibida peticion loaded, activas:", modalRequest);
			modalRequest--;
			if(modalRequest == 0){
				modalInstance.close();
			}
		});
		
		var authDataChanged = function(topic, authData){
			$log.debug("authDataChanged", authData);
			$scope.$apply(function(){
				$scope.authData = authData;
			});
		}
		PubSub.subscribe("authDataChanged", authDataChanged);
	}]
);