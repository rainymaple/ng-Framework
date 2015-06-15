(function () {
    var module = angular.module('app-framework');

    module.controller('appController', ['$scope', 'appConfig', '$state', appController]);

    function appController($scope, appConfig, $state) {
        //$scope.loginState = 'authorized';
        $scope.loginState = 'unauthorized';

        // rainFramework attributes
        $scope.router = appConfig.router;
        $scope.headerTitle = "Rain Framework";
        $scope.headerSubTitle = "with Responsive Design";

        $scope.$on('rain-menu-item-selected-event', function (event, data) {
            if (!data && !data.route) {
                return;
            }
            var routeName = data.route;
            try {
                $state.go(routeName);
            } catch (e) {

            }
        });

        // from rainService.loginRedirect
        $scope.$on('AUTHENTICATION_EVENT', function (event, data) {
            if (!data || !data.statusCode) {
                return;
            }
            if (data.statusCode === 200) {
                $scope.loginState = 'authorized';
                $state.go('home');
                return;
            }
            // if authentication failed, redirect to login with the previous requested url
            if (data.requestedPath) {
                $state.go('login', data.requestedPath);
            }
        })
    }
})();
