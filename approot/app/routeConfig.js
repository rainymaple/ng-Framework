(function () {
    var app = angular.module('app');
    app.config(["$stateProvider", "$urlRouterProvider",

        function ($stateProvider, $urlRouterProvider) {

            $urlRouterProvider.otherwise("/login"); // default view

            $stateProvider
                .state("login", {
                    url: "/login",
                    templateUrl: "approot/views/login/login.html"
                })
                .state("error401", {
                    url: "/error401",
                    templateUrl: "approot/views/login/error401.html"
                })
                .state("error403", {
                    url: "/error403",
                    templateUrl: "approot/views/login/error403.html"
                })
                .state("home", {
                    url: "/",
                    templateUrl: "approot/views/Home/home.html"
                })
                .state("employeeList", {
                    url: "/employees",
                    templateUrl: "approot/views/Employee/employeeList.html"
                })
                .state("customerList", {
                    url: "/customers",
                    templateUrl: "approot/views/Customer/customerList.html"
                })
                .state("shipperList", {
                    url: "/shippers",
                    templateUrl: "approot/views/Shipper/shipperList.html"
                })
                .state("supplierList", {
                    url: "/suppliers",
                    templateUrl: "approot/views/Supplier/supplierList.html"
                })
                .state("territoryList", {
                    url: "/territories",
                    templateUrl: "approot/views/Territory/territoryList.html"
                })
                .state("categoryList", {
                    url: "/categories",
                    templateUrl: "approot/views/Category/categoryList.html"
                })
                .state("productList", {
                    url: "/products",
                    templateUrl: "approot/views/Product/productList.html"
                })
                .state("orderList", {
                    url: "/orders",
                    templateUrl: "approot/views/Order/orderList.html"
                })
                .state("order", {
                    url: "/orderAdmin",
                    templateUrl: "approot/views/Order/orderAdmin.html"
                })
                .state("order.orderEdit", {
                    url: "/orderEdit",
                    templateUrl: "approot/views/Order/orderEdit.html"
                })
                .state("order.orderDetailEdit", {
                    url: "/orderDetail",
                    templateUrl: "approot/views/Order/orderDetailEdit.html"
                })
                .state("orderReport", {
                    url: "/OrderReport",
                    templateUrl: "approot/views/Report/orderReport.html"
                })
                .state("admin", {
                    url: "/admin",
                    templateUrl: "approot/views/Admin/admin.html"
                })
                .state("admin.user", {
                    url: "/users",
                    templateUrl: "approot/views/Admin/userAdmin.html"
                })
                .state("admin.permission", {
                    url: "/permissions",
                    templateUrl: "approot/views/Admin/permissionAdmin.html"
                });
        }
    ]);
})();