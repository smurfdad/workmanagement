var APP_NAME = "workmanagement";
angular.module(APP_NAME, ["ngRoute", "firebase", "ui.bootstrap"]).config(
    ["$routeProvider"
    , function($routeProvider){
        $routeProvider.when("/", {
            templateUrl: "views/home.view.html"
        }).when("/register", {
            controller: "RegisterController",
            templateUrl: "views/register.view.html",
            access:{
                requireLogin: true
            }
        }).when("/admin", {
            //controller: "RegisterController",
            templateUrl: "views/admin.view.html",
            access:{
                requireLogin: true
            }
        }).when("/admin/users", {
            controller: "usersController",
            templateUrl: "views/users.view.html",
            access:{
                requireLogin: false
            }
        }).otherwise({
            templateUrl: "404.html"
        });
    }]
).run(["$rootScope", "$location", "authService", "$log"
    , function($rootScope, $location, authService, $log){
        $rootScope.$on('$routeChangeStart', function (event, next) {
            var authorised;
            if (next.access !== undefined && next.access.requireLogin) {
                $log.debug("Authdata", next, authService.getAuthData());
                if (authService.getAuthData() === undefined || authService.getAuthData() === null){
                    $log.info("Pagina no autorizada");
                    $location.url("/");
                }
            }
        });
    }]
);