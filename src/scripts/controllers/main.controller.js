angular.module(APP_NAME).controller("mainController",
    ["$log", "$scope","authService", "pubSub","$timeout", "$uibModal"
    ,function($log, $scope, authService, pubSub, $timeout, $uibModal){
        $log.debug("MainController");
        $scope.title = "WorkManagement";
        $scope.authData = null;
        var modalInstance = null;
        var modalRequest = 0;
        
        $scope.logout = function(){
            authService.logout();
        };
        
        $scope.$on("loading", function(event, data){
            $log.debug("Recibida peticion loading, activas", modalRequest);
            if(modalRequest == 0){
                modalInstance = $uibModal.open({
                    templateUrl : "views/loading.view.html",
                    size:"sm"
                });
            }
            modalRequest++;
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
        pubSub.subscribe("authDataChanged", authDataChanged);
    }]
);