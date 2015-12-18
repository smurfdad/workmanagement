var APP_NAME = "workmanagement";
angular.module(APP_NAME, ["ngRoute", "firebase", "ui.bootstrap"]).config(
    ["$routeProvider", function($routeProvider){
		$routeProvider.when("/", {
			templateUrl: "views/home.view.html"
		}).when("/login", {
			controller: "LoginController",
			templateUrl: "views/login.view.html"
		}).when("/register", {
			controller: "RegisterController",
			templateUrl: "views/register.view.html"			
		}).otherwise({
			templateUrl: "404.html"
		});
    }]
);