angular.module(APP_NAME).service("AuthService",
    ["$log", "DataConstants", "$firebaseAuth","PubSub"
    ,function($log, DataConstants, $firebaseAuth, PubSub){
		//Instaciamos el objeto para controllar firebase
		var ref = new Firebase(DataConstants.repository);
		var authObj = $firebaseAuth(ref);
		var authData = null;
				
		//Escuchamos para ver si estamos autenticados.
		authObj.$onAuth(function(authData){
			this.authData = authData;
			if (authData) {
				console.log("Logged in as:", authData);
			} else {
				console.log("Logged out");
			}
			PubSub.publish("authDataChanged", authData);
		});
		
		this.getAuthData = function(){
			return this.authData;
		}
		
		//Funcion que realiza el login 
		this.login = function(credentials){
			return authObj.$authWithPassword(credentials);
		};
		
		//Funcion que registra un usuario
		
		this.logout = function(){
			authObj.$unauth();
		}
    }]
);