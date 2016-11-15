angular.module('dashboard').service('loginService', function($q, $http, URL) {
    var login = function(authTokenForLogin, data) {
        return $q(function(resolve, reject) {
            var req = {
                url: URL.url + 'user/' + data.username + '/',
                method: 'GET',
                headers: {
                    'Authorization': 'Basic ' + authTokenForLogin,
                    'Content-Type': 'application/json'
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
}).service('graphService', function($q, $http, URL, $filter) {
    var getCircleDataEstimatedEffort = function(authTokenForLogin) {
        return $q(function(resolve, reject) {
            var req = {
                url: URL.url + 'BARCA/UKAEDF/estimatedEffort/total?projectId=CI001',
                method: 'GET',
                params: {
                    sprintId: 'CI0011'
                },
                headers: {
                    'Authorization': 'Basic ' + authTokenForLogin,
                    'Content-Type': 'application/json',
                    'fromDate': '2016-01-01T00:00:00.000+0530',
                    'toDate': $filter('date')(new Date(), "yyyy-MM-dd" + "T00:00:00.000+0530"),
                    'interval': '1w'
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
    var getCircleDataRemainingEffort = function(authTokenForLogin) {
        return $q(function(resolve, reject) {
            var req = {
                url: URL.url + 'BARCA/UKAEDF/remainingEffort/total?projectId=CI001',
                method: 'GET',
                params: {
                    sprintId: 'CI0011'
                },
                headers: {
                    'Authorization': 'Basic ' + authTokenForLogin,
                    'Content-Type': 'application/json',
                    'fromDate': '2016-01-01T00:00:00.000+0530',
                    'toDate': $filter('date')(new Date(), "yyyy-MM-dd" + "T00:00:00.000+0530"),
                    'interval': '1w'
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
    var getCircleDataSpentEffort = function(authTokenForLogin) {
        return $q(function(resolve, reject) {
            var req = {
                url: URL.url + 'BARCA/UKAEDF/spentEffort/total?projectId=CI001',
                method: 'GET',
                params: {
                    sprintId: 'CI0011'
                },
                headers: {
                    'Authorization': 'Basic ' + authTokenForLogin,
                    'Content-Type': 'application/json',
                    'fromDate': '2016-01-01T00:00:00.000+0530',
                    'toDate': $filter('date')(new Date(), "yyyy-MM-dd" + "T00:00:00.000+0530"),
                    'interval': '1w'
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
    var getBurndown = function(authTokenForLogin) {
        return $q(function(resolve, reject) {
            var req = {
                url: URL.url + 'BARCA/UKAEDF/effort/burndown?projectId=CI001',
                method: 'GET',
                params: {
                    sprintId: 'CI0011'
                },
                headers: {
                    'Authorization': 'Basic ' + authTokenForLogin,
                    'Content-Type': 'application/json',
                    'fromDate': '2016-01-01T00:00:00.000+0530',
                    'toDate': $filter('date')(new Date(), "yyyy-MM-dd" + "T00:00:00.000+0530"),
                    'interval': '1w'
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
    var getSpentEffortHistogram = function(authTokenForLogin) {
        return $q(function(resolve, reject) {
            var req = {
                url: URL.url + 'BARCA/UKAEDF/spentEffort/dateHistogram?projectId=CI001',
                method: 'GET',
                params: {
                    sprintId: 'CI0011'
                },
                headers: {
                    'Authorization': 'Basic ' + authTokenForLogin,
                    'Content-Type': 'application/json',
                    'fromDate': '2016-01-01T00:00:00.000+0530',
                    'toDate': $filter('date')(new Date(), "yyyy-MM-dd" + "T00:00:00.000+0530"),
                    'interval': '1w'
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
    var getproductivityHistogramCanvas = function(authTokenForLogin) {
        return $q(function(resolve, reject) {
            var req = {
                url: URL.url + 'BARCA/UKAEDF/productivity/dateHistogram?projectId=CI001',
                method: 'GET',
                params: {
                    sprintId: 'CI0011'
                },
                headers: {
                    'Authorization': 'Basic ' + authTokenForLogin,
                    'Content-Type': 'application/json',
                    'fromDate': '2016-01-01T00:00:00.000+0530',
                    'toDate': $filter('date')(new Date(), "yyyy-MM-dd" + "T00:00:00.000+0530"),
                    'interval': '1w'
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
    var getQualityHistogram = function(authTokenForLogin) {
        return $q(function(resolve, reject) {
            var req = {
                url: URL.url + 'BARCA/UKAEDF/quality/dateHistogram?projectId=CI001',
                method: 'GET',
                params: {
                    sprintId: 'CI0011'
                },
                headers: {
                    'Authorization': 'Basic ' + authTokenForLogin,
                    'Content-Type': 'application/json',
                    'fromDate': '2016-01-01T00:00:00.000+0530',
                    'toDate': $filter('date')(new Date(), "yyyy-MM-dd" + "T00:00:00.000+0530"),
                    'interval': '1w'
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
    var getTeamHistogram = function(authTokenForLogin) {
        return $q(function(resolve, reject) {
            var req = {
                url: URL.url + 'BARCA/UKAEDF/team/dateHistogram?projectId=CI001',
                method: 'GET',
                params: {
                    sprintId: 'CI0011'
                },
                headers: {
                    'Authorization': 'Basic ' + authTokenForLogin,
                    'Content-Type': 'application/json',
                    'fromDate': '2016-01-01T00:00:00.000+0530',
                    'toDate': $filter('date')(new Date(), "yyyy-MM-dd" + "T00:00:00.000+0530"),
                    'interval': '1w'
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

    var getProjectProductivity = function(authTokenForLogin) {
        return $q(function(resolve, reject) {
            var req = {
                url: URL.url + 'BARCA/UKAEDF/productivity/stats?projectId=CI001',
                method: 'GET',
                params: {
                    sprintId: 'CI0011'
                },
                headers: {
                    'Authorization': 'Basic ' + authTokenForLogin,
                    'Content-Type': 'application/json',
                    'fromDate': '2016-01-01T00:00:00.000+0530',
                    'toDate': $filter('date')(new Date(), "yyyy-MM-dd" + "T00:00:00.000+0530"),
                    'interval': '1w'
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
    var getProjectQuality = function(authTokenForLogin) {
        return $q(function(resolve, reject) {
            var req = {
                url: URL.url + 'BARCA/UKAEDF/quality/stats?projectId=CI001',
                method: 'GET',
                params: {
                    sprintId: 'CI0011'
                },
                headers: {
                    'Authorization': 'Basic ' + authTokenForLogin,
                    'Content-Type': 'application/json',
                    'fromDate': '2016-01-01T00:00:00.000+0530',
                    'toDate': $filter('date')(new Date(), "yyyy-MM-dd" + "T00:00:00.000+0530"),
                    'interval': '1w'
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
    var getProjectSpentEfforts = function(authTokenForLogin) {
        return $q(function(resolve, reject) {
            var req = {
                url: URL.url + 'BARCA/UKAEDF/spentEffort/stats?projectId=CI001',
                method: 'GET',
                params: {
                    sprintId: 'CI0011'
                },
                headers: {
                    'Authorization': 'Basic ' + authTokenForLogin,
                    'Content-Type': 'application/json',
                    'fromDate': '2016-01-01T00:00:00.000+0530',
                    'toDate': $filter('date')(new Date(), "yyyy-MM-dd" + "T00:00:00.000+0530"),
                    'interval': '1w'
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
    	getCircleDataEstimatedEffort: getCircleDataEstimatedEffort,
    	getCircleDataRemainingEffort: getCircleDataRemainingEffort,
    	getCircleDataSpentEffort: getCircleDataSpentEffort,
        getBurndown: getBurndown,
        getSpentEffortHistogram: getSpentEffortHistogram,
        getproductivityHistogramCanvas: getproductivityHistogramCanvas,
        getQualityHistogram: getQualityHistogram,
        getTeamHistogram: getTeamHistogram,
        getProjectProductivity: getProjectProductivity,
        getProjectQuality: getProjectQuality,
        getProjectSpentEfforts: getProjectSpentEfforts

    };
}).service('programService', function($q, $http, URL) {
    var getAllProgram = function(authTokenForLogin) {
        return $q(function(resolve, reject) {
            var req = {
                url: URL.url + 'BARCA/programs',
                method: 'GET',
                headers: {
                    'Authorization': 'Basic ' + authTokenForLogin,
                    'Content-Type': 'application/json'
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
    var getAllProjects = function(programId, authTokenForLogin) {
        return $q(function(resolve, reject) {
            var req = {
                url: URL.url + 'BARCA/' + programId + '/projects',
                method: 'GET',
                headers: {
                    'Authorization': 'Basic ' + authTokenForLogin,
                    'Content-Type': 'application/json'
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
    var saveProjectSnapshot = function(data, authTokenForLogin) {
        return $q(function(resolve, reject) {
            var req = {
                url: URL.url + 'BARCA/' + data.selectProgram + '/projects',
                method: 'GET',
                headers: {
                    'Authorization': 'Basic ' + authTokenForLogin,
                    'Content-Type': 'application/json'
                },
                data: data
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
        getAllProgram: getAllProgram,
        getAllProjects: getAllProjects,
        saveProjectSnapshot: saveProjectSnapshot
    };
});