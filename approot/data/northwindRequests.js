(function () {
    angular.module('northwindDbMock').factory("northWindRequests", [northWindRequests]);

    function northWindRequests() {

        var _pathViews = 'approot/views/';
        var _requests = {
            user: {
                endpoint: "/api/user",
                entities: 'Users',
                idField: 'id',
                roles: [{key: 'role-admin', read: true, modify: true}]
            },
            permission: {
                endpoint: "/api/role",
                entities: 'Roles',
                idField: 'role',
                roles: [{key: 'role-admin', read: true, modify: true}]
            },
            employee: {
                endpoint: "/api/employee",
                entities: 'Employees',
                idField: 'EmployeeID',
                roles: [{key: 'role-admin', read: true, modify: true}
                    , {key: 'role-user', read: true, modify: false}
                    , {key: 'role-orderuser', read: true, modify: false}]
            },
            category: {
                endpoint: "/api/category",
                entities: 'Categories',
                idField: 'CategoryID',
                roles: [{key: 'role-admin', read: true, modify: true}
                    , {key: 'role-user', read: true, modify: false}
                    , {key: 'role-orderuser', read: true, modify: false}]
            },
            customer: {
                endpoint: "/api/customer",
                entities: 'Customers',
                idField: 'CustomerID',
                roles: [{key: 'role-admin', read: true, modify: true}
                    , {key: 'role-user', read: true, modify: false}
                    , {key: 'role-orderuser', read: true, modify: false}]
            },
            shipper: {
                endpoint: "/api/shipper",
                entities: 'Shippers',
                idField: 'ShipperID',
                roles: [{key: 'role-admin', read: true, modify: true}
                    , {key: 'role-user', read: true, modify: false}
                    , {key: 'role-orderuser', read: true, modify: false}]
            },
            supplier: {
                endpoint: "/api/supplier",
                entities: 'Suppliers',
                idField: 'SupplierID',
                roles: [{key: 'role-admin', read: true, modify: true}
                    , {key: 'role-user', read: true, modify: false}
                    , {key: 'role-orderuser', read: true, modify: false}]
            },
            territory: {
                endpoint: "/api/territory",
                entities: 'Territories',
                idField: 'TerritoryID',
                roles: [{key: 'role-admin', read: true, modify: true}
                    , {key: 'role-user', read: true, modify: false}
                    , {key: 'role-orderuser', read: true, modify: false}]
            },
            order: {
                endpoint: "/api/order",
                entities: 'Orders',
                idField: 'OrderID',
                roles: [{key: 'role-admin', read: true, modify: true}
                    , {key: 'role-user', read: true, modify: false}
                    , {key: 'role-orderuser', read: true, modify: true}]
            },
            orderDetails: {
                endpoint: "/api/orderDetails",
                entities: 'OrderDetails',
                idField: 'OrderID',
                roles: [{key: 'role-admin', read: true, modify: true}
                    , {key: 'role-user', read: true, modify: false}
                    , {key: 'role-orderuser', read: true, modify: false}]
            },

            deleteOrderDetail: {
                endpoint: "/api/deleteOrderDetail",
                entities: 'OrderDetails',
                idField: 'DetailID',
                roles: [{key: 'role-admin', read: true, modify: true}
                    , {key: 'role-user', read: true, modify: false}
                    , {key: 'role-orderuser', read: true, modify: false}]
            },
            editOrderDetail: {
                endpoint: "/api/editOrderDetail",
                entities: 'OrderDetails',
                idField: 'DetailID',
                roles: [{key: 'role-admin', read: true, modify: true}
                    , {key: 'role-user', read: true, modify: false}
                    , {key: 'role-orderuser', read: true, modify: false}]
            },
            /*            newOrder: {
             endpoint: "/api/newOrder",
             entities: 'Orders',
             idField: 'OrderID',
             roles: {read: ['role-admin', 'role-user', 'role-orderuser'], modify: ['role-admin', 'role-orderuser']}
             },*/
            product: {
                endpoint: "/api/product",
                entities: 'Products',
                idField: 'ProductID',
                roles: [{key: 'role-admin', read: true, modify: true}
                    , {key: 'role-user', read: true, modify: false}
                    , {key: 'role-orderuser', read: true, modify: false}]
            },
            productByCategoryId: {
                endpoint: '/api/productByCategoryId',
                entities: 'Products',
                idField: 'ProductID',
                filterId: 'CategoryID',
                roles: [{key: 'role-admin', read: true, modify: true}
                    , {key: 'role-user', read: true, modify: false}
                    , {key: 'role-orderuser', read: true, modify: false}]
            },
            country: {
                endpoint: "/api/country",
                entities: 'Countries',
                idField: 'code',
                roles: [{key: 'role-admin', read: true, modify: true}
                    , {key: 'role-user', read: true, modify: false}
                    , {key: 'role-orderuser', read: true, modify: false}]
            }
        };
        var _permissions = [
            {
                resource: 'Account',
                path: [getPath('admin')],
                roles: [{key: 'role-admin', read: true, modify: true}]
            },
            {
                resource: 'Category',
                path: [getPath('category')],
                roles: [{key: 'role-admin', read: true, modify: true}
                    , {key: 'role-user', read: true, modify: false}
                    , {key: 'role-orderuser', read: true, modify: false}]
            },
            {
                resource: 'Customer',
                path: [getPath('customer')],
                roles: [{key: 'role-admin', read: true, modify: true}
                    , {key: 'role-user', read: true, modify: false}
                    , {key: 'role-orderuser', read: true, modify: false}]
            },
            {
                resource: 'Employee',
                path: [getPath('employee')],
                roles: [{key: 'role-admin', read: true, modify: true}
                    , {key: 'role-user', read: true, modify: false}
                    , {key: 'role-orderuser', read: true, modify: false}]
            },
            {
                resource: 'Manage Order',
                path: [getPath('order/orderAdmin'),getPath('order/orderEdit')],
                roles: [{key: 'role-admin', read: true, modify: true}
                    , {key: 'role-orderuser', read: true, modify: true}]
            }
        ];

        return {
            getRequest: getRequest,
            setRequest: setRequest,
            getPermissions: getPermissions,
            setPermissions: setPermissions
        };

        function getPath(path) {
            return _pathViews + path.trim();
        }

        function getRequest() {
            return _requests;
        }

        function setRequest(request) {
            _requests = request;
        }

        function getPermissions() {
            return _permissions;
        }

        function setPermissions(permissions) {
            _permissions = permissions;
        }
    }
})();