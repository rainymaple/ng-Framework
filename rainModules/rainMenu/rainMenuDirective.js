(function () {
    angular.module('rainMenu').directive('rainMenu',['$timeout',rainMenu] );


    function rainMenu($timeout) {
        return {
            restrict:'AE',
            transclude: true,
            scope: {
                horizontalMenu:'='
            },
            controller: 'rainMenu.controller',
            templateUrl: 'rainModules/rainMenu/rainMenuTemplate.html',
            link: link
        };

        // open the first menu section
        function link(scope,element,attr){

            //openFirstMenu();

            function openFirstMenu() {
                var item = element.find('.r-selectable-item:first');
                if (item) {
                    $timeout(function () {
                        item.trigger('click');
                    })
                }
            }
        }
    }

})();
