(function () {
    angular.module('rainMenu').directive('rainMenuGroup', rainMenuGroup);


    function rainMenuGroup() {
        return {
            restrict: 'AE',
            require: '^rainMenu',
            transclude: true,
            scope: {
                label: '@',
                icon: '@',
                route:'@'
            },
            templateUrl: 'rainModules/rainMenu/rainMenuGroup/rainMenuGroupTemplate.html',
            link: link
        }
    }

    function link(scope, element, attr, rainMenuCtrl) {

        scope.isOpen = false;

        scope.closeMenu = function () {
            scope.isOpen = false;
        };

        scope.isActiveGroup = function () {
            return element === rainMenuCtrl.getActiveGroupElement();
        };

        scope.clicked = function () {
            if(scope.route) {
                rainMenuCtrl.setRoute(scope.route);
            }
            if (!scope.isOpen) {
                rainMenuCtrl.closeCurrentMenu();
            }
            scope.isOpen = !scope.isOpen;

            if (!scope.isVertical()) {
                setSubMenuPosition();
            }
            // pass the current scope to rainMenuCtrl
            rainMenuCtrl.setOpenMenuScope(scope);
        };

        scope.isVertical = function () {
            return rainMenuCtrl.isVertical();
        };

        element.on('click', function (e) {
            e.stopPropagation();
            e.preventDefault();
            scope.$apply(function () {
                rainMenuCtrl.setActiveGroupElement(element);
                rainMenuCtrl.setRoute(scope.route);
            })
        });

        function setSubMenuPosition() {
            var pos = element.offset();
            var menuGroup = element.find('.r-menu-group-horizontal');
            var height = 40;
            if (menuGroup) {
                height = menuGroup.height();
            }
            element.find('.r-menu-sub-section').css({'left': pos.left + 2, top: height + 6});
        }
    }
})();
