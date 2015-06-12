/*
 * event to broadcast:   'rain-menu-item-selected-event','rain-menu-orientation-changed-event'
 * event to watch:       'rain-menu-show'
 * */
(function () {
    angular.module('rainMenu').controller('rainMenu.controller', ['$scope', '$rootScope', rainMenuCtrl]);

    function rainMenuCtrl($scope, $rootScope) {

        var isHorizontalMenu = $scope.horizontalMenu;
        $scope.showMenu = true;
        $scope.isVertical = true;
        $scope.openMenuScope = null;
        $scope.allowHorizontalMenu = true;

        var _self = this;

        activate(_self);

        // --- functions --- //

        function activate(self) {
            setPublicFunctions(self);
            setEventHandlers();
            //if the menu needs to be horizontal initially
            if(isHorizontalMenu) {
                $scope.toggleMenuOrientation();
            }
        }

        function setPublicFunctions(self) {
            self.setActiveElement = function (el) {
                $scope.activeElement = el;
            };
            self.getActiveElement = function () {
                return $scope.activeElement;
            };
            self.setActiveGroupElement = function (el) {
                $scope.activeGroupElement = el;
            };
            self.getActiveGroupElement = function () {
                return $scope.activeGroupElement;
            };
            self.isVertical = function () {
                return $scope.isVertical;
            };
            self.setOpenMenuScope = function (scope) {
                $scope.openMenuScope = scope;
            };
            self.closeCurrentMenu = function () {
                if ($scope.openMenuScope) {
                    $scope.openMenuScope.closeMenu();
                }
            };
            self.setRoute = function (route) {
                if (route) {
                    $rootScope.$broadcast('rain-menu-item-selected-event', {route: route});
                }
            };
        }

        function setEventHandlers() {
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
    }
})();

