(function (module) {
    angular.module(module).controller('rainMenuCtrl', ['$scope', '$rootScope', rainMenuCtrl]);

    function rainMenuCtrl($scope, $rootScope) {
        this.setActiveItem = function (el) {
            $scope.activeElement = el;
        };
        this.setRoute = function (route) {
            $rootScope.$broadcast('rain-menu-item-selected-event', {route: route});
        }
    }
})('rainMenu');

