(function (module) {
    angular.module(module).directive('rainFramework', rainFramework);


    function rainFramework() {
        return {
            transclude: true,
            scope: {
                title:'@',
                subTitle:'@',
                iconFile:'@'
            },
            controller: 'rainFrameworkCtrl',
            templateUrl: 'rainModules/rainFramework/rainFrameworkTemplate.html'
        }
    }
})('rainFramework');
