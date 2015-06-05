var requests = {
    user: {
        endpoint: "/api/user",
        entities: 'Users',
        idField: 'id',
        roles: {read: ['role-admin'], modify: ['role-admin']}
    },
    permission: {
        endpoint: "/api/role",
        entities: 'Roles',
        idField: 'role',
        roles: {read: ['role-admin'], modify: ['role-admin']}
    },
    employee: {
        endpoint: "/api/employee",
        entities: 'Employees',
        idField: 'EmployeeID',
        roles: {read: ['role-admin', 'role-user', 'role-orderuser'], modify: ['role-admin']}
    },
    category: {
        endpoint: "/api/category",
        entities: 'Categories',
        idField: 'CategoryID',
        roles: {read: ['role-admin', 'role-user', 'role-orderuser'], modify: ['role-admin']}
    },
    customer: {
        endpoint: "/api/customer",
        entities: 'Customers',
        idField: 'CustomerID',
        roles: {read: ['role-admin', 'role-user', 'role-orderuser'], modify: ['role-admin']}
    },
    shipper: {
        endpoint: "/api/shipper",
        entities: 'Shippers',
        idField: 'ShipperID',
        roles: {read: ['role-admin', 'role-user', 'role-orderuser'], modify: ['role-admin']}
    },
    supplier: {
        endpoint: "/api/supplier",
        entities: 'Suppliers',
        idField: 'SupplierID',
        roles: {read: ['role-admin', 'role-user', 'role-orderuser'], modify: ['role-admin']}
    },
    territory: {
        endpoint: "/api/territory",
        entities: 'Territories',
        idField: 'TerritoryID',
        roles: {read: ['role-admin', 'role-user', 'role-orderuser'], modify: ['role-admin']}
    },
    order: {
        endpoint: "/api/order",
        entities: 'Orders',
        idField: 'OrderID',
        roles: {read: ['role-admin', 'role-user', 'role-orderuser'], modify: ['role-admin', 'role-orderuser']}
    },
    orderDetails: {
        endpoint: "/api/orderDetails",
        entities: 'OrderDetails',
        idField: 'OrderID',
        roles: {read: ['role-admin', 'role-user', 'role-orderuser'], modify: ['role-admin']}
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
        roles: {read: ['role-admin', 'role-user', 'role-orderuser'], modify: ['role-admin']}
    },
    productByCategoryId: {
        endpoint: '/api/productByCategoryId',
        entities: 'Products',
        idField: 'ProductID',
        filterId: 'CategoryID',
        roles: {read: ['role-admin', 'role-user', 'role-orderuser'], modify: ['role-admin']}
    }
};