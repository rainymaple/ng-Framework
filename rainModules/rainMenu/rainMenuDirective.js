(function (module) {
    angular.module(module).directive('rainMenu', rainMenu);


    function rainMenu() {
        return {
            restrict:'AE',
            transclude: true,
            scope: {
            },
            controller: 'rainMenuCtrl',
            templateUrl: 'rainModules/rainMenu/rainMenuTemplate.html',
            link: link
        }
    }

    function link(scope,element,attr){

    }
})('rainMenu');
