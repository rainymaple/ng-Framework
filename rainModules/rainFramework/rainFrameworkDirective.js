/*
* Accepted attributes: title, sub-title, router, icon-file
* */

(function (module) {
    angular.module(module).directive('rainFramework', rainFramework);


    function rainFramework() {
        return {
            transclude: true,
            scope: {
                title:'@',
                subTitle:'@',
                iconFile:'@',
                router:'@'
            },
            controller: 'rainFrameworkCtrl',
            templateUrl: 'rainModules/rainFramework/rainFrameworkTemplate.html'
        }
    }
})('rainFramework');
