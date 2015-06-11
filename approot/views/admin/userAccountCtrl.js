(function () {

    var module = angular.module('app-framework');

    module.controller("userAccountCtrl", ["$scope", "rainService.repository", "dbEntityConfig",
        "rainGridService", "$modal", userAdminCtrl]);

    function userAdminCtrl($scope, repositoryService, dbEntityConfig, rainGridService, $modal) {

        var _entityUser = dbEntityConfig.entities.user;
        var _entityRole = dbEntityConfig.entities.role;
        $scope.dataReady = false;
        $scope.hasUser = false;
        $scope.password2 = '';
        $scope.imageConstruction='approot/Images/construction.png'

        activate();

        // activator

        function activate() {
            getRoles();
            getUsers();
            setEditMode(false);
        }

        // event handlers

        $scope.saveUser = saveUser;
        $scope.deleteUser = deleteUser;
        $scope.newUser = newUser;


        // functions

        function getRoles() {
            repositoryService.getDataList(_entityRole).then(function (data) {
                $scope.roles = data;
                resetUser();
            });
        }

        function setEditMode(isEdit) {
            $scope.isEditMode = isEdit;
            $scope.title = isEdit ? "Edit User" : "Add User";
        }

        function getUsers() {
            $scope.gridOptions = setGridOptions();
            $scope.gridOptions.data = getUserData();
        }

        function resetUser() {
            $scope.user = {username: "", password: "", role: $scope.roles[1].key};
            $scope.password2 = '';
            $scope.formUser.$setPristine();
        }

        function getUserData() {
            return repositoryService.getDataList(_entityUser).then(function (data) {
                if (data) {
                    $scope.dataReady = true;
                    var users = data.map(function (u) {
                        return {
                            id: u.id, username: u.username, password: u.password,
                            role: u.role.name, roleKey: u.role.key
                        };
                    });
                    $scope.users = users;
                    return users;
                }
            });
        }

        function saveUser(formUser) {
            if (!formUser || formUser.$invalid
                || formUser.password2.$modelValue !== formUser.password1.$modelValue) {
                toastr.warning('Please fix the validation error');
                return;
            }

            $scope.user.role = _.find($scope.roles, function (role) {
                return role.key === $scope.user.role;
            });

            repositoryService.addOrUpdateData(_entityUser, $scope.user)
                .then(function (data) {
                    if (data.error) {
                        toastr.warning(data.error.message);
                    } else {
                        getUsers();
                        resetUser();
                        setEditMode(false);
                        toastr.success("Save Successful");
                    }
                },
                function (data, status, headers, config) {
                    //logService.logError(data);
                });
        }


        function newUser() {
            resetUser();
            setEditMode(false);
        }

        function deleteUser(id) {
            if (id === 1 || id === 2) {
                var username = id === 1 ? 'Administrator' : 'Regular User';
                toastr.warning("You cannot delete " + username);
                return;
            }

            var modalInstance = $modal.open({
                templateUrl: 'deleteUserModal.html',
                //size:'sm',
                controller: function ($scope, $modalInstance) {
                    $scope.ok = function () {
                        $modalInstance.close(true)
                    };
                    $scope.cancel = function () {
                        $modalInstance.close(false)
                    };
                }
            });

            modalInstance.result.then(function (isDelete) {
                if (isDelete) {
                    repositoryService.deleteDataById(_entityUser, id).then(function (data) {
                        if (data) {
                            toastr.success("Delete Successful");
                            getUsers();
                            resetUser();
                        }
                    }, function (data, status, headers, config) {
                        //logService.logError(data);
                    });
                }
            });

        }

        function editUser(id) {
            if (id === 1) {
                toastr.warning("You cannot modify Administrator");
                return;
            }
            var user = _.find($scope.users, function (u) {
                return u.id === id;
            });
            $scope.user = {id: id, username: user.username, password: "", role: user.roleKey};
            setEditMode(true);
        }

        $scope.linkFunc = function (params) {
            rainGridService.rainGridLinkFunc(params, {editUser: editUser, deleteUser: deleteUser});
        };
    }

    // rainGrid functions

    function setGridOptions() {
        return {
            columnDefs: getColumnDefs(),
            enablePage: true,
            idField: 'id',
            selectable: false
        };
    }

    function getColumnDefs() {
        return [
            {
                field: 'id',
                displayName: 'Id'
            },
            {
                field: 'username',
                displayName: 'Username',
                isLink: true,
                linkFunc: {funcName: 'editUser', funcIdField: 'id'}
            },
            {
                field: 'role',
                displayName: 'Role'
            },
            {
                field: 'Delete',
                displayName: '',
                isButton: true,
                linkFunc: {funcName: 'deleteUser', funcIdField: 'id'}
            }
        ];
    }
})();