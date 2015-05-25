(function (module) {
    angular.module(module).directive('rainMenuItem', rainMenuItem);


    function rainMenuItem() {
        return {
            restrict: 'AE',
            require: '^rainMenu',
            transclude: true,
            scope: {
                label: '@',
                icon:'@',
                route:'@'
            },
            templateUrl: 'rainModules/rainMenu/rainMenuItemTemplate.html',
            link: link
        }
    }

    function link(scope, element, attr, ctrl) {
        element.on('click',function(e){
            e.stopPropagation();
            e.preventDefault();
            scope.$apply(function(){
                ctrl.setActiveItem(element);
                ctrl.setRoute(scope.route);
            })
        })
    }
})('rainMenu');
