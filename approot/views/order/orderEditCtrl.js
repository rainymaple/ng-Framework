(function () {

    var module = angular.module('app-framework');

    module.controller('orderEditCtrl', [
        '$scope'
        , '$q'
        , '$state'
        , '$stateParams'
        , 'rainService.repository'
        , 'dbEntityConfig'
        , 'commonService'
        , orderEditCtrl]);

    function orderEditCtrl($scope, $q, $state, $stateParams, repositoryService, dbEntityConfig, commonService) {

        var _orderId = $stateParams.orderId;
        var _message = commonService.showMessage;
        var _entityOrder = dbEntityConfig.entities.order;
        $scope.order = {
            customer: '', shipName: '', shipCountry: '', freight: '', shippedDate: '', requiredDate: '',
            orderDate: '', shipAddress: '', shipCity: ''
        };
        $scope.saveOrder = saveOrder;
        $scope.newOrder = newOrder;

        $state.$current.parent.data.orderId=_orderId;

        activate();

        // controller functions

        function activate() {

            setDatePicker();
            $q.all(getLookupDataPromises()).then(function () {
                getOrderData();
            });


        }


        function getOrderData() {
            var isEdit = !!_orderId;
            $scope.isEditMode = isEdit;
            $scope.title = isEdit ? "Edit Order" : "Add Order";
            if (isEdit) {
                repositoryService.getDataById(_entityOrder, _orderId).then(function (data) {
                    if (!data || data.length === 0) {
                        return;
                    }
                    var order = data[0];
                    var customer = _.find($scope.customers, function (e) {
                        return e.CustomerID === order.CustomerID;
                    });
                    var country = _.find($scope.countries, function (e) {
                        return e.name == order.ShipCountry;
                    });
                    $scope.order = {
                        orderId: order.OrderID,
                        customer: customer,
                        shipName: order.ShipName,
                        shipCountry: country,
                        freight: order.Freight,
                        shipAddress: order.ShipAddress,
                        shipCity: order.ShipCity,
                        shippedDate: order.ShippedDate,
                        requiredDate: order.RequiredDate,
                        orderDate: order.OrderDate
                    }
                });
            }
        }

        function getLookupDataPromises() {
            var p1 = repositoryService.getDataList(dbEntityConfig.entities.customer)
                .then(function (data) {
                    $scope.customers = data;
                });
            var p2 = repositoryService.getDataList(dbEntityConfig.entities.country)
                .then(function (data) {
                    $scope.countries = data;
                });
            return [p1, p2];
        }

        function saveOrder(formOrder) {
            if (!formOrder || formOrder.$invalid) {
                _message.warning('Please fix the validation error');
                return;
            }

            var order = {
                "OrderID": $scope.order.orderId,
                "CustomerID": $scope.order.customer.CustomerID,
                //"EmployeeID": 5,
                "OrderDate": $scope.order.orderDate,
                "RequiredDate": $scope.order.requiredDate,
                "ShippedDate": $scope.order.shippedDate,
                //"ShipVia": 3,
                "Freight": $scope.order.freight,
                "ShipName": $scope.order.shipName,
                "ShipAddress": $scope.order.shipAddress,
                "ShipCity": $scope.order.shipCity,
                "ShipRegion": "null",
                "ShipPostalCode": "51100",
                "ShipCountry": $scope.order.shipCountry.name
            };
            /**/
            repositoryService.addOrUpdateData(_entityOrder, order)
                .then(function (data) {
                    if (data.error) {
                        _message.warning(data.error.message);
                    } else {
                        _orderId = data.OrderID;
                        $state.go('order.orderEdit', {orderId: _orderId});
                        _message.success("Saved Successfully");
                    }
                },
                function (data, status, headers, config) {
                    //logService.logError(data);
                });

        }

        function newOrder(){
            $state.go('order.orderEdit',{orderId:''});
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

                $scope.shippedDate_opened = false;
                $scope.requiredDate_opened = false;
                $scope.orderDate_opened = false;
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
