angular.module(APP_NAME).controller("usersController",
    ["$log","$scope", "usersService", "$firebaseArray"
    , function($log, $scope, usersService, $firebaseArray){

        self = this;
        $scope.users = $firebaseArray(fireRef);;
        $scope.user = {
            uid: null,
            firstname: null,
            lastname: null,
            username: null
        }



        this.load = function(){
            //Cargamos la lista de usuarios
            $scope.$emit("loading", null);
            usersService.getUsers(function(snapshot){
                $scope.users = {};
                snapshot.forEach(function(elem) {
                    $log.info("Detalle", elem.key(), elem.val());
                    $scope.$apply(function(){
                        var elemento = elem.val();
                        elemento.uid = elem.key();

                        $scope.users[elemento.uid]=elemento;
                    });
                });
                $scope.$emit("loaded", null);
            }, function(error){
                $log.info("ERROR")
                $scope.$emit("loaded", null);
            });
        }

        self.load();

        //Metodo que se invoca para la seleccion de un usuario para ediccion
        $scope.edit = function(uid){
            $log.debug("Seleccionado para edicion", uid);
            $scope.user = JSON.parse(JSON.stringify($scope.users[uid]));
        }

        //Metodo que se invoca para la eliminacion de un usuario
        $scope.delete = function(uid){
            $log.debug("Eliminar", uid);
            usersService.delUser(uid, function(error){
                if (!error){
                    self.load();
                }
            });
        }

        //Metodo que se invoca para persistir un usuario
        $scope.saveUser = function(){
            $scope.$emit("loading", null);
            $log.debug("Guardando usuario");
            usersService.saveUser($scope.user, function(error){
                self.load();    
                $scope.$emit("loaded", null);
            });
            
        }
    }]
);