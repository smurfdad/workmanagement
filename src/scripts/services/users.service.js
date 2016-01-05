angular.module(APP_NAME).service("usersService",
    ["$log", "dataConstants"
    ,function($log, dataConstants){
        //Instaciamos el objeto para controllar firebase
        var self = this;
        var ref = new Firebase(dataConstants.repository+"users/");

        this.getUsers = function(onSuccess, onError){
//            ref.once('value', function(dataSnapshot) {
//                dataSnapshot.forEach(function(userSnap) {
//                    $log.info("Detalle", userSnap.key(), userSnap.val());
//                });
//
//            }, function(dataSnapshot) {
//                $log.error("getUsers", dataSnapshot);
//            });
//            return "Hecho";
            return ref.orderByChild("firstname").once('value', onSuccess, onError);
        }

        this.addUser = function(user){

        }

        this.delUser = function(uid, onComplete){
            ref.child(uid).remove(onComplete);
        }

        this.saveUser = function(user, onComplete){
            if (user.uid === undefined || user.uid == null || user.uid == ""){
                ref.push(user, onComplete);
            }else{
                ref.child(user.uid).set(user, onComplete);
            }
        }

        this.getRef = function(){
            return ref;
        }
        
    }]
);