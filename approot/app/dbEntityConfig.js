(function () {
    var module = angular.module('app-framework');

    module.factory('dbEntityConfig', [dbEntityConfig]);

    var apiBase = '/api/';

    function dbEntityConfig() {
        return {
            entities: {
                user: {
                    name: 'user',
                    url: getUrl('user')
                },
                role: {
                    name: 'role',
                    url: getUrl('role')
                },
                category: {
                    name: 'category',
                    url: getUrl('category')
                },
                customer: {
                    name: 'customer',
                    url: getUrl('customer')
                },
                shipper: {
                    name: 'shipper',
                    url: getUrl('shipper')
                },
                supplier: {
                    name: 'supplier',
                    url: getUrl('supplier')
                },
                territory: {
                    name: 'territory',
                    url: getUrl('territory')
                },
                product: {
                    name: 'product',
                    url: getUrl('product')
                },
                productByCategoryId: {
                    name: 'productByCategoryId',
                    url: getUrl('productByCategoryId')
                },
                order: {
                    name: 'order',
                    url: getUrl('order')
                },
                orderDetails: {
                    name: 'orderDetails',
                    url: getUrl('orderDetails')
                },
                editOrderDetail: {
                    name: 'orderDetail',
                    url: getUrl('editOrderDetail')
                },
                deleteOrderDetail:{
                    name: 'orderDetails',
                    url: getUrl('deleteOrderDetail')
                },
                employee:{
                    name:'employee',
                    url: getUrl('employee')
                },
                country:{
                    name:'country',
                    url:getUrl('country')
                }
            }
        }
    }

    function getUrl(entityName) {
        return apiBase + entityName;
    }

})();
