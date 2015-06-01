(function () {
    var app=angular.module('rainGrid', []);

    var config = {
        baseUrl: 'rainModules/rainGrid/',
        version: '1.0.0'
    };

    app.value("rainGridConfig", config);

})();