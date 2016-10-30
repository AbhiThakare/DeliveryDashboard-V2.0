angular.module('dashboard').service('loginService', function($q, $http) {
    var login = function(authTokenForLogin) {
        return $q(function(resolve, reject) {
            var req = {
	    		url: 'http://inmbz2239.in.dst.ibm.com:11090/deliverydashboard/user?id=02689A',
	            method:'GET',
	            headers : {
	              'Authorization' : 'Basic '+authTokenForLogin
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