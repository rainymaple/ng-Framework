(function () {
    angular.module('rain.menu').directive('rainMenuGroup', rainMenuGroup);


    function rainMenuGroup() {
        return {
            restrict: 'AE',
            require: '^rainMenu',
            transclude: true,
            scope: {
                label: '@',
                icon: '@'
            },
            templateUrl: 'rainModules/rainMenu/rainMenuGroupTemplate.html',
            link: link
        }
    }

    function link(scope, element, attr, rainMenuCtrl) {

        scope.isOpen = false;

        scope.closeMenu = function () {
            scope.isOpen = false;
        };

        scope.clicked = function () {
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
                rainMenuCtrl.setActiveElement(element);
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
            element.find('.r-menu-sub-section').css({'left': pos.left + 22, top: height + 1});
        }
    }
})();
