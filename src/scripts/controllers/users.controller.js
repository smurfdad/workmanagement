angular.module(APP_NAME).controller("usersController",
    ["$log","$scope", "usersService", "$firebaseArray"
    , function($log, $scope, usersService, $firebaseArray){

        $scope.$emit("loading", null);
        self = this;

        $scope.users = $firebaseArray(usersService.getRef());
        $scope.users.$loaded().then(function(x) {
            $scope.$emit("loaded", null);
        }).catch(function(error) {
            $scope.$emit("loaded", null);
        });
        $scope.user = {};


        $scope.$watch('users', function () {
            $log.debug("Cambio en el array");
        }, true);


        //Metodo que se invoca para la seleccion de un usuario para ediccion
        $scope.edit = function(user){
            $log.debug("Seleccionado para edicion", user);
            //Clonamos el objeto del array para evitar que se modifique en la lista de resultados segun escribimos
            $scope.user = JSON.parse(JSON.stringify(user));
        }

        //Metodo que se invoca para la eliminacion de un usuario
        $scope.delete = function(user){
            $scope.$emit("loading", null);
            $log.debug("Eliminar", user);
            $scope.users.$remove(user).then(function(ref) {
                $scope.$emit("loaded", null);
            }).catch(function(error) {
                $scope.$emit("loaded", null);
            });
        }

        //Metodo que se invoca para persistir un usuario
        $scope.saveUser = function(){
            $scope.$emit("loading", null);
            if ($scope.user.$id === undefined){
                $log.debug("Añadiendo usuario");
                $scope.users.$add($scope.user).then(function(ref) {
                    var id = ref.key();
                    $log.debug("Añadido usuario ", id);
                    $scope.user = {};    
                    $scope.$emit("loaded", null);
                }).catch(function(error) {
                    $log.error("No se ha podido añadir al usuario", error);
                    $scope.$emit("loaded", null);
                });
            }else{
                $log.debug("Actualizando usuario");
                user = $scope.users.$getRecord($scope.user.$id);
                user.firstname = $scope.user.firstname;
                user.lastname = $scope.user.lastname;
                user.username = $scope.user.username;
                $scope.users.$save(user).then(function(ref) {
                    var id = ref.key();
                    $log.debug("Actualizado usuario ", id);
                    //$scope.$apply(function(){
                        $scope.user = {};    
                    //});
                    $scope.$emit("loaded", null);
                }).catch(function(error) {
                    $log.error("No se ha podido Actualizado al usuario", error);
                    $scope.$emit("loaded", null);
                });
            }
        }
    }]
);