/*
 * event to broadcast:   'rain-menu-show','rain-change-route-event'
 * event to watch:       'rain-menu-item-selected-event','rain-menu-orientation-changed-event'
 * router:               'ngRoute','uiRouter','ngNewRouter'
 * */

(function () {
    angular.module('rain.framework').controller('rain.framework.controller',
        ['$scope', '$window', '$timeout', '$rootScope', rainFrameworkCtrl]);

    function rainFrameworkCtrl($scope, $window, $timeout, $rootScope) {

        $scope.isMenuButtonVisible = true;
        $scope.isVerticalMenuVisible = true;
        $scope.isMenuVertical = true;
        $scope.routerName = $scope.router.trim().toUpperCase();
        $scope.isFullWidth = function () {
            return !$scope.isMenuVertical || !$scope.isVerticalMenuVisible;
        };

        activate();

        //---- functions ----//

        function activate() {
            setupEvents();

            // avoid from running within the digest cycle, wrap it in $timeout with delay=0
            $timeout(function () {
                checkWidth();
            }, 0);
        }

        function setupEvents() {
            $scope.$on('rain-menu-item-selected-event', function (event, data) {
                $scope.routeString = data.route;
                if ($scope.routeString) {
                    broadcastRoute($scope.routeString);
                }
                checkWidth();
            });

            $scope.$on('rain-menu-orientation-changed-event', function (event, data) {
                $scope.isMenuVertical = data.isMenuVertical;
            });


            // in jQuery, we can add a namespace to an event (here is 'rainFramework')
            $($window).on('resize.rainFramework', function () {
                $scope.$apply(function () {
                    checkWidth();
                })
            });

            $($window).on('$destroy', function () {
                // remove the handler
                $($window).off('resize.rainFramework');
            });

            $scope.menuButtonClicked = function () {
                $scope.isVerticalMenuVisible = !$scope.isVerticalMenuVisible;
                var width = Math.max($window.innerWidth, $($window).width());
                $scope.isMenuVertical =(width < 768);
                broadcastMenuState();
                //$scope.$apply();
            }
        }

        function broadcastMenuState() {
            $rootScope.$broadcast('rain-menu-show', {
                show: $scope.isVerticalMenuVisible,
                isVertical: $scope.isMenuVertical,
                allowHorizontalMenu: !$scope.isMenuButtonVisible
            })
        }

        // inform the application to switch route
        function broadcastRoute(routeString) {
            $rootScope.$broadcast('rain-change-route-event', {route: routeString});
        }

        function checkWidth() {
            var width = Math.max($window.innerWidth, $($window).width());
            $scope.isVerticalMenuVisible = (width >= 768);
            $scope.isMenuButtonVisible = !$scope.isVerticalMenuVisible;
            broadcastMenuState();
        }

    }
})();

