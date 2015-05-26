/*
* event to broadcast:   'rain-menu-show'
* event to watch:       'rain-menu-item-selected-event','rain-menu-orientation-changed-event'
* */

(function (module) {
    angular.module(module).controller('rainFrameworkCtrl', ['$scope', '$window', '$timeout', '$rootScope', rainFrameworkCtrl]);


    function rainFrameworkCtrl($scope, $window, $timeout, $rootScope) {

        $scope.isMenuButtonVisible = true;
        $scope.isMenuVisible = true;
        $scope.isMenuVertical =true;

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
                checkWidth();
            });

            $scope.$on('rain-menu-orientation-changed-event',function(event,data){
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
                $scope.isMenuVisible = !$scope.isMenuVisible;
                broadcastMenuState();
                //$scope.$apply();
            }
        }

        function broadcastMenuState() {
            $rootScope.$broadcast('rain-menu-show', {
                show: $scope.isMenuVisible,
                isVertical: $scope.isMenuVertical,
                allowHorizontalMenu : !$scope.isMenuButtonVisible
            })
        }

        function checkWidth() {
            var width = Math.max($window.innerWidth, $($window).width());
            $scope.isMenuVisible = (width >= 768);
            $scope.isMenuButtonVisible = !$scope.isMenuVisible;
            broadcastMenuState();
        }

    }
})('rainFramework');

