(function () {
    var app = angular.module('app-framework');

    app.config(["$stateProvider", "$urlRouterProvider",

        function ($stateProvider, $urlRouterProvider) {

            $urlRouterProvider.otherwise("/home"); // default view

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
                    templateUrl: "approot/views/home/home.html"
                })
                .
                state("employeeList", {
                    url: "/employees",
                    templateUrl: "approot/views/employee/employeeList.html"
                })
                .state("customerList", {
                    url: "/customers",
                    templateUrl: "approot/views/customer/customerList.html"
                })
                .state("shipperList", {
                    url: "/shippers",
                    templateUrl: "approot/views/shipper/shipperList.html"
                })
                .state("supplierList", {
                    url: "/suppliers",
                    templateUrl: "approot/views/supplier/supplierList.html"
                })
                .state("territoryList", {
                    url: "/territories",
                    templateUrl: "approot/views/territory/territoryList.html"
                })
                .state("categoryList", {
                    url: "/categories",
                    templateUrl: "approot/views/category/categoryList.html"
                })
                .state("productList", {
                    url: "/products",
                    templateUrl: "approot/views/product/productList.html"
                })
                .state("orderList", {
                    url: "/orders",
                    templateUrl: "approot/views/order/orderList.html"
                })
                .state("order", {
                    url: "/orderManage",
                    templateUrl: "approot/views/order/orderAdmin.html"
                })
                .state("order.orderEdit", {
                    url: "/orderEdit/:orderId",
                    templateUrl: "approot/views/order/orderEdit.html"
                })
                .state("order.orderDetailEdit", {
                    url: "/orderDetail",
                    templateUrl: "approot/views/order/orderDetailEdit.html"
                })
                .state("orderReport", {
                    url: "/OrderReport",
                    templateUrl: "approot/views/report/orderReport.html"
                })
                .state("account", {
                    url: "/account",
                    templateUrl: "approot/views/admin/account.html"
                })
                .state("account.user", {
                    url: "/users",
                    templateUrl: "approot/views/admin/userAccount.html"
                })
                .state("account.permission", {
                    url: "/permissions",
                    templateUrl: "approot/views/admin/permission.html"
                });
        }
    ]);
})();