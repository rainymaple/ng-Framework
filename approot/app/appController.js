(function () {
    var module = angular.module('app-framework');

    module.controller('appController', ['$scope', appController]);

    function appController($scope) {
        $scope.loginState ='unauthorized';
    }
})();
