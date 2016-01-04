var APP_NAME = "workmanagement";
angular.module(APP_NAME, ["ngRoute", "firebase", "ui.bootstrap"]).config(
    ["$routeProvider", function($routeProvider){
		$routeProvider.when("/", {
			templateUrl: "views/home.view.html",
			requireLogin: false
		}).when("/register", {
			controller: "RegisterController",
			templateUrl: "views/register.view.html",
			requireLogin: true
		}).otherwise({
			templateUrl: "404.html"
		});
    }]
).run(["$rootScope", function($rootScope){
    $rootScope.$on("$locationChangeStart", function(event, next, current) {
		console.log("run", next, next.requireLogin);
		if(next.requireLogin) {
			alert("You need to be authenticated to see this page!");
			// Auth/session check here
			event.preventDefault();
		}
    });
}]);