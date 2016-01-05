angular.module(APP_NAME).service("authService",
    ["$log", "dataConstants", "$firebaseAuth","pubSub"
    ,function($log, dataConstants, $firebaseAuth, pubSub){
        //Instaciamos el objeto para controllar firebase
        var self = this;
        var ref = new Firebase(dataConstants.repository);
        var authObj = $firebaseAuth(ref);
        var authData = null;
                
        //Escuchamos para ver si estamos autenticados.
        authObj.$onAuth(function(authData){
            self.authData = authData;
            if (authData) {
                console.log("Logged in as:", authData);
            } else {
                console.log("Logged out");
            }
            pubSub.publish("authDataChanged", authData);
        });
        
        this.getAuthData = function(){
            $log.debug(self.authData);
            return self.authData;
        }
        
        //Funcion que realiza el login 
        this.login = function(credentials){
            $log.debug("Credenciales", credentials);
            return authObj.$authWithPassword(credentials);
        };
        
        //Funcion que registra un usuario
        
        this.logout = function(){
            authObj.$unauth();
        }
    }]
);