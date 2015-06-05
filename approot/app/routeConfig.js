(function (app) {

    app.config(["$stateProvider", "$urlRouterProvider",

        function ($stateProvider, $urlRouterProvider) {

            $urlRouterProvider.otherwise("/login"); // default view

            $stateProvider
                .state("login", {
                    url: "/login",
                    templateUrl: "wwwroot/Views/Authentication/login.html"
                })
                .state("error401", {
                    url: "/error401",
                    templateUrl: "wwwroot/Views/Authentication/error401.html"
                })
                .state("error403", {
                    url: "/error403",
                    templateUrl: "wwwroot/Views/Authentication/error403.html"
                })
                .state("home", {
                    url: "/",
                    templateUrl: "wwwroot/Views/Home/home.html"
                })
                .state("employeeList", {
                    url: "/employees",
                    templateUrl: "wwwroot/Views/Employee/employeeList.html"
                })
                .state("customerList", {
                    url: "/customers",
                    templateUrl: "wwwroot/Views/Customer/customerList.html"
                })
                .state("shipperList", {
                    url: "/shippers",
                    templateUrl: "wwwroot/Views/Shipper/shipperList.html"
                })
                .state("supplierList", {
                    url: "/suppliers",
                    templateUrl: "wwwroot/Views/Supplier/supplierList.html"
                })
                .state("territoryList", {
                    url: "/territories",
                    templateUrl: "wwwroot/Views/Territory/territoryList.html"
                })
                .state("categoryList", {
                    url: "/categories",
                    templateUrl: "wwwroot/Views/Category/categoryList.html"
                })
                .state("productList", {
                    url: "/products",
                    templateUrl: "wwwroot/Views/Product/productList.html"
                })
                .state("orderList", {
                    url: "/orders",
                    templateUrl: "wwwroot/Views/Order/orderList.html"
                })
                .state("order", {
                    url: "/orderAdmin",
                    templateUrl: "wwwroot/Views/Order/orderAdmin.html"
                })
                .state("order.orderEdit", {
                    url: "/orderEdit",
                    templateUrl: "wwwroot/Views/Order/orderEdit.html"
                })
                .state("order.orderDetailEdit", {
                    url: "/orderDetail",
                    templateUrl: "wwwroot/Views/Order/orderDetailEdit.html"
                })
                .state("orderReport", {
                    url: "/OrderReport",
                    templateUrl: "wwwroot/Views/Report/orderReport.html"
                })
                .state("admin", {
                    url: "/admin",
                    templateUrl: "wwwroot/Views/Admin/admin.html"
                })
                .state("admin.user", {
                    url: "/users",
                    templateUrl: "wwwroot/Views/Admin/userAdmin.html"
                })
                .state("admin.permission", {
                    url: "/permissions",
                    templateUrl: "wwwroot/Views/Admin/permissionAdmin.html"
                });
        }
    ]);
})(angular.module('appNorthwind'));