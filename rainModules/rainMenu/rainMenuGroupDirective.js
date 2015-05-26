(function (module) {
    angular.module(module).directive('rainMenuGroup', rainMenuGroup);


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
            if(!scope.isOpen) {
                rainMenuCtrl.closeCurrentMenu();
            }
            scope.isOpen = !scope.isOpen;
            if(scope.isVertical) {
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

        function setSubMenuPosition(){
            var pos =element.offset();
            $(this).find('.r-menu-sub-section').css({'left':pos.left+20,'top':pos.top+20});
        }
    }
})('rainMenu');
