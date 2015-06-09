(function () {
    var module = angular.module('app-framework');

    module.directive('appLogin',[login]);

    function login(){
        return {
            restrict: "AE",
            templateUrl: 'approot/views/login/loginTemplate.html',
            replace: false,
            scope: {
                loginEndpoint: '@'
            },
            controller: 'loginController'
        }
    }
})();