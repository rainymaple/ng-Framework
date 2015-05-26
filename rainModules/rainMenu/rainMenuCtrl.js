/*
 * event to broadcast:   'rain-menu-item-selected-event','rain-menu-orientation-changed-event'
 * event to watch:       'rain-menu-show'
 * */
(function (module) {
    angular.module(module).controller('rainMenuCtrl', ['$scope', '$rootScope', rainMenuCtrl]);

    function rainMenuCtrl($scope, $rootScope) {

        $scope.showMenu = true;
        $scope.isVertical = true;
        $scope.openMenuScope = null;
        $scope.allowHorizontalMenu = true;

        this.setActiveElement = function (el) {
            $scope.activeElement = el;
        };
        this.setRoute = function (route) {
            if (route) {
                $rootScope.$broadcast('rain-menu-item-selected-event', {route: route});
            }
        };
        this.getActiveElement = function () {
            return $scope.activeElement;
        };
        this.isVertical = function () {
            return $scope.isVertical;
        };
        this.setOpenMenuScope = function (scope) {
            $scope.openMenuScope = scope;
        };
        this.closeCurrentMenu =function(){
            if($scope.openMenuScope){
                $scope.openMenuScope.closeMenu();
            }
        };


        $scope.$on('rain-menu-show', function (event, data) {
            $scope.showMenu = data.show;
            $scope.isVertical = data.isVertical;
            $scope.allowHorizontalMenu = data.allowHorizontalMenu;
        });

        $scope.toggleMenuOrientation = function () {
            $scope.isVertical = !$scope.isVertical;
            $rootScope.$broadcast('rain-menu-orientation-changed-event', {isMenuVertical: $scope.isVertical});
        };

        // if there's a click out of menu when the menu is horizontal, close the current opened menu
        angular.element(document).bind('click', function (e) {
            if ($scope.openMenuScope && !$scope.isVertical) {
                if ($(e.target).parent().hasClass('r-selectable-item')) {
                    return;
                }
                $scope.$apply(function () {
                    $scope.openMenuScope.closeMenu();
                });
                e.preventDefault();
                e.stopPropagation();
            }
        })
    }
})('rainMenu');

