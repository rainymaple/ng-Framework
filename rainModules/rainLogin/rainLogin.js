(function () {
    var module = angular.module('rain.login',['rain.Service']);

    module.directive('rainLogin',[rainLogin]);

    function rainLogin(){
        return {
            restrict: "AE",
            templateUrl: 'rainModules/rainLogin/rainLoginTemplate.html',
            replace: false,
            scope: {
                loginEndpoint: '@'
            },
            controller: 'rainLoginController'
        }
    }
})();