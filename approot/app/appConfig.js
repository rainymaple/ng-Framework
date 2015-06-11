(function () {
    var module = angular.module('app-framework');

    var _router={
        newRoute:'NGNEWROUTER',
        uiRouter:'UIROUTER',
        ngRouter:'NGROUTE'
    };

    module.value('appConfig',{
        router: _router.uiRouter
    });

    module.config(["$provide", function ($provide) {

            $provide.decorator("$exceptionHandler", exceptionDecorator);

            function exceptionDecorator($delegate) {
                return function (exception, cause) {
                    $delegate(exception, cause);
                    // toastr.error(exception.message);
                    // console.log(exception.message);
                    // alert(exception.message);
                }
            }
        }]
    )
})();
