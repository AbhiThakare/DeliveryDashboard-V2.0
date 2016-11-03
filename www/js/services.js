angular.module('dashboard').service('loginService', function($q, $http, URL) {
    var login = function(authTokenForLogin) {
        return $q(function(resolve, reject) {
            var req = {
                url: URL.url + 'user?id=02689A',
                method: 'GET',
                headers: {
                    'Authorization': 'Basic ' + authTokenForLogin
                }
            }
            $http(req).then(function(data) {
                if (data.status === 200) {
                    resolve(data.data.response);
                } else {
                    reject('Failed!');
                }
            }, function(err) {
                reject(err);
            });
        });
    };
    return {
        login: login,
    };
});