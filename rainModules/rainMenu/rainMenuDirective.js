(function (module) {
    angular.module(module).directive('rainMenu',['$timeout',rainMenu] );


    function rainMenu($timeout) {
        return {
            restrict:'AE',
            transclude: true,
            scope: {
            },
            controller: 'rainMenuCtrl',
            templateUrl: 'rainModules/rainMenu/rainMenuTemplate.html',
            link: link
        };

        // open the first menu section
        function link(scope,element,attr){
            var item = element.find('.r-selectable-item:first');
            if(item){
                $timeout(function(){
                    item.trigger('click');
                })
            }
        }
    }

})('rainMenu');
