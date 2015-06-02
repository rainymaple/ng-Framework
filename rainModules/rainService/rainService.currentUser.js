(function () {
    angular.module('rainService').factory('rainService.currentUser',
        ['rainService.localStorage', currentUser]);
    function currentUser(localStorage) {

        var _userKey = 'tokenKey';
        var profile = getProfile();

        return {
            setProfile: setProfile,
            profile: profile,
            logout: logout
        };

        // Service Functions

        function setProfile(username, token) {
            profile.username = username;
            profile.token = token;
            localStorage.add(_userKey, profile);
        }

        function getProfile() {
            var profile = {
                username: '',
                token: '',
                get loggedIn() {
                    return !!this.token;
                }
            };

            // try to get the profile from local storage
            var localUser = localStorage.get(_userKey);
            if (localUser) {
                profile.username = localUser.username;
                profile.token = localUser.token;
            }
            return profile;
        }

        function logout() {
            profile.username = '';
            profile.token = '';
            localStorage.remove(_userKey);
        }
    }
})();
