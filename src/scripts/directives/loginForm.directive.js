angular.module(APP_NAME).directive("loginForm", function(){
    return {
        restrict: "EA", // permite utilizar la directiva como atributo o elemento
        templateUrl: "views/login.view.html"
    };
});