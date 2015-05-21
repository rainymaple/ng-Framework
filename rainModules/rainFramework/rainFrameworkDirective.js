(function (module) {
    angular.module(module).directive('rainFramework', rainFramework);


    function rainFramework() {
        return {
            transclude: false,
            scope: {},
            controller: 'rainFrameworkCtrl',
            templateUrl: 'rainModules/rainFramework/rainFrameworkTemplate.html'
        }
    }
})('rainFramework');
