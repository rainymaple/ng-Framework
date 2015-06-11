(function () {
    var module = angular.module('app-framework');

    module.controller('appController', ['$scope', 'appConfig', '$state', appController]);

    function appController($scope, appConfig, $state) {
        $scope.loginState = 'authorized';

        $scope.router = appConfig.router;

        $scope.$on('rain-menu-item-selected-event', function (event, data) {
            if (!data && !data.route) {
                return;
            }
            var routeName = data.route;
            try {
                $state.go(routeName);
            }catch(e){

            }
        })
    }
})();
