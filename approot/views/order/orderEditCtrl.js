(function () {

    var module = angular.module('app-framework');

    module.controller('orderEditCtrl', [
        '$scope'
        , 'rainService.repository'
        , 'dbEntityConfig'
        , 'commonService'
        , orderEditCtrl]);

    function orderEditCtrl($scope, repositoryService, dbEntityConfig, commonService) {

        var _message = commonService.showMessage;

        $scope.order = {
            customer: '', shipName: '', shipCountry: '', freight: '', shippedDate: '', requiredDate: '',
            orderDate: '', shipAddress: '', shipCity: ''
        };

        activate();

        // controller functions

        function activate() {

            setEditMode(false);
            setDatePicker();
            getLookupData();

        }

        $scope.saveOrder = saveOrder;

        function setEditMode(isEdit) {
            $scope.isEditMode = isEdit;
            $scope.title = isEdit ? "Edit Order" : "Add Order";
        }

        function getLookupData() {
            repositoryService.getDataList(dbEntityConfig.entities.customer)
                .then(function (data) {
                    $scope.customers = data;
                });
            repositoryService.getDataList(dbEntityConfig.entities.country)
                .then(function (data) {
                    $scope.countries = data;
                });
        }

        function saveOrder(formOrder){
            if (!formOrder || formOrder.$invalid) {
                _message.warning('Please fix the validation error');
                return;
            }
        }

        function setDatePicker() {
            $scope.today = function () {
                $scope.order.orderDate = new Date();
                $scope.order.requiredDate = new Date();
                $scope.order.shippedDate = new Date();
            };
            $scope.today();

            $scope.open = function ($event, dt) {
                $event.preventDefault();
                $event.stopPropagation();

                switch (dt) {
                    case 'orderDate':
                        $scope.orderDate_opened = true;
                        break;
                    case 'requiredDate':
                        $scope.requiredDate_opened = true;
                        break;
                    case 'shippedDate':
                        $scope.shippedDate_opened = true;
                        break;
                }
            };

            $scope.dateOptions = {
                formatYear: 'yy',
                startingDay: 1
            };

            $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
            $scope.format = $scope.formats[0];
            /*
             $scope.clear = function () {
             $scope.dt = null;
             };

             // Disable weekend selection
             $scope.disableWeekend = function (date, mode) {
             return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
             };

             $scope.toggleMin = function () {
             $scope.minDate = $scope.minDate ? null : new Date();
             };
             $scope.toggleMin();
             */
        }
    }

})();
