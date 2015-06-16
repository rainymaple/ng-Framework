(function () {
    angular.module('northwindDbMock').factory("northWindRequests", [northWindRequests]);

    function northWindRequests() {

        var _pathViews = 'approot/views/';
        var _requests = {
            user: {
                endpoint: "/api/user",
                url: [{reg: /permission/}],
                entities: 'Users',
                idField: 'id',
                roles: [{name: 'role-admin', read: true, modify: true}]
            },
            permission: {
                endpoint: "/api/role",
                entities: 'Roles',
                idField: 'role',
                roles: [{name: 'role-admin', read: true, modify: true}]
            },
            employee: {
                endpoint: "/api/employee",
                entities: 'Employees',
                idField: 'EmployeeID',
                roles: [{name: 'role-admin', read: true, modify: true}
                    , {name: 'role-user', read: true, modify: false}
                    , {name: 'role-orderuser', read: true, modify: false}]
            },
            category: {
                endpoint: "/api/category",
                entities: 'Categories',
                idField: 'CategoryID',
                roles: [{name: 'role-admin', read: true, modify: true}
                    , {name: 'role-user', read: true, modify: false}
                    , {name: 'role-orderuser', read: true, modify: false}]
            },
            customer: {
                endpoint: "/api/customer",
                entities: 'Customers',
                idField: 'CustomerID',
                roles: [{name: 'role-admin', read: true, modify: true}
                    , {name: 'role-user', read: true, modify: false}
                    , {name: 'role-orderuser', read: true, modify: false}]
            },
            shipper: {
                endpoint: "/api/shipper",
                entities: 'Shippers',
                idField: 'ShipperID',
                roles: [{name: 'role-admin', read: true, modify: true}
                    , {name: 'role-user', read: true, modify: false}
                    , {name: 'role-orderuser', read: true, modify: false}]
            },
            supplier: {
                endpoint: "/api/supplier",
                entities: 'Suppliers',
                idField: 'SupplierID',
                roles: [{name: 'role-admin', read: true, modify: true}
                    , {name: 'role-user', read: true, modify: false}
                    , {name: 'role-orderuser', read: true, modify: false}]
            },
            territory: {
                endpoint: "/api/territory",
                entities: 'Territories',
                idField: 'TerritoryID',
                roles: [{name: 'role-admin', read: true, modify: true}
                    , {name: 'role-user', read: true, modify: false}
                    , {name: 'role-orderuser', read: true, modify: false}]
            },
            order: {
                endpoint: "/api/order",
                entities: 'Orders',
                idField: 'OrderID',
                roles: [{name: 'role-admin', read: true, modify: true}
                    , {name: 'role-user', read: true, modify: false}
                    , {name: 'role-orderuser', read: true, modify: true}]
            },
            orderDetails: {
                endpoint: "/api/orderDetails",
                entities: 'OrderDetails',
                idField: 'OrderID',
                roles: [{name: 'role-admin', read: true, modify: true}
                    , {name: 'role-user', read: true, modify: false}
                    , {name: 'role-orderuser', read: true, modify: false}]
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
                roles: [{name: 'role-admin', read: true, modify: true}
                    , {name: 'role-user', read: true, modify: false}
                    , {name: 'role-orderuser', read: true, modify: false}]
            },
            productByCategoryId: {
                endpoint: '/api/productByCategoryId',
                entities: 'Products',
                idField: 'ProductID',
                filterId: 'CategoryID',
                roles: [{name: 'role-admin', read: true, modify: true}
                    , {name: 'role-user', read: true, modify: false}
                    , {name: 'role-orderuser', read: true, modify: false}]
            },
            country: {
                endpoint: "/api/country",
                entities: 'Countries',
                idField: 'code',
                roles: [{name: 'role-admin', read: true, modify: true}
                    , {name: 'role-user', read: true, modify: false}
                    , {name: 'role-orderuser', read: true, modify: false}]
            }
        };
        var _permissions = [
            {
                resource: 'Account',
                path: [getPath('admin')],
                roles: [{name: 'role-admin', read: true, modify: true}]
            },
            {
                resource: 'Category',
                path: [getPath('category')],
                roles: [{name: 'role-admin', read: true, modify: true}
                    , {name: 'role-user', read: true, modify: false}
                    , {name: 'role-orderuser', read: true, modify: false}]
            },
            {
                resource: 'Customer',
                path: [getPath('customer')],
                roles: [{name: 'role-admin', read: true, modify: true}
                    , {name: 'role-user', read: true, modify: false}
                    , {name: 'role-orderuser', read: true, modify: false}]
            },
            {
                resource: 'Employee',
                path: [getPath('employee')],
                roles: [{name: 'role-admin', read: true, modify: true}
                    , {name: 'role-user', read: true, modify: false}
                    , {name: 'role-orderuser', read: true, modify: false}]
            },
            {
                resource: 'Manage Order',
                path: [getPath('order/orderAdmin'),getPath('order/orderEdit')],
                roles: [{name: 'role-admin', read: true, modify: true}
                    , {name: 'role-orderuser', read: true, modify: true}]
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