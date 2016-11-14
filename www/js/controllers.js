'use strict';
angular.module('dashboard').controller('AppCtrl', function($scope, $rootScope, $state, $ionicModal, $ionicPopover, $timeout) {
    $scope.loginData = {};
    $scope.isExpanded = false;
    $scope.hasHeaderFabLeft = false;
    $scope.hasHeaderFabRight = false;
    var navIcons = document.getElementsByClassName('ion-navicon');
    for (var i = 0; i < navIcons.length; i++) {
        navIcons.addEventListener('click', function() {
            this.classList.toggle('active');
        });
    }
    $scope.hideNavBar = function() {
        document.getElementsByTagName('ion-nav-bar')[0].style.display = 'none';
    };
    $scope.showNavBar = function() {
        document.getElementsByTagName('ion-nav-bar')[0].style.display = 'block';
    };
    $scope.noHeader = function() {
        var content = document.getElementsByTagName('ion-content');
        for (var i = 0; i < content.length; i++) {
            if (content[i].classList.contains('has-header')) {
                content[i].classList.toggle('has-header');
            }
        }
    };
    $scope.setExpanded = function(bool) {
        $scope.isExpanded = bool;
    };
    $scope.setHeaderFab = function(location) {
        var hasHeaderFabLeft = false;
        var hasHeaderFabRight = false;
        switch (location) {
            case 'left':
                hasHeaderFabLeft = true;
                break;
            case 'right':
                hasHeaderFabRight = true;
                break;
        }
        $scope.hasHeaderFabLeft = hasHeaderFabLeft;
        $scope.hasHeaderFabRight = hasHeaderFabRight;
    };
    $scope.hasHeader = function() {
        var content = document.getElementsByTagName('ion-content');
        for (var i = 0; i < content.length; i++) {
            if (!content[i].classList.contains('has-header')) {
                content[i].classList.toggle('has-header');
            }
        }
    };
    $scope.hideHeader = function() {
        $scope.hideNavBar();
        $scope.noHeader();
    };
    $scope.showHeader = function() {
        $scope.showNavBar();
        $scope.hasHeader();
    };
    $scope.clearFabs = function() {
        var fabs = document.getElementsByClassName('button-fab');
        if (fabs.length && fabs.length > 1) {
            fabs[0].remove();
        }
    };
    $scope.logout = function() {
    	window.localStorage.removeItem('token');
        $state.go('app.login');
    };
    $rootScope.saveToken = function(token) {
        window.localStorage.setItem('token', token);
    };
    $rootScope.getToken = function(token) {
        var token = window.localStorage.getItem('token');
        return token;
    };
    $rootScope.getcolor = function(brightness) {
        var rgb = [Math.random() * 255, Math.random() * 255, Math.random() * 255];
        var mix = [brightness*51, brightness*51, brightness*51]; //51 => 255/5
        var mixedrgb = [rgb[0] + mix[0], rgb[1] + mix[1], rgb[2] + mix[2]].map(function(x){ return Math.round(x/2.0)})
        return "rgba(" + mixedrgb.join(",") + ",0.8)";
        //return "rgba("+(Math.floor(Math.random() * 255))+", "+(Math.floor(Math.random() * 255))+","+(Math.floor(Math.random() * 255))+",0.8)";
        //return '#' + Math.random().toString(16).substr(-6);
    }
    $rootScope.getBarGraphData = function(inputData, stacked, chartType) {
    	var labels = [];
	    var data = [];
	    var datasets = [];
	    var option;
	    for (var j = 0; j <  inputData[0].buckets.length; j++) {
		    for (var i = 0; i < inputData[0].buckets[j].aggregations.length; i++) {
				data[i] = [];
			}
	    }
	    for (var j = 0; j <  inputData[0].buckets.length; j++) {
	    	if( inputData[0].buckets[j].key_as_string !== undefined){
				labels.push((inputData[0].buckets[j].key_as_string).substring(0, 10));
	    	}else{
				labels.push((inputData[0].buckets[j].key).substring(0, 10));
	    	}
			for (var i = 0; i < inputData[0].buckets[j].aggregations.length; i++) {
				data[i].push(inputData[0].buckets[j].aggregations[i].value);
			}
		}
	    if(chartType === 'bar'){
	    	for (var j = 0; j < inputData[0].buckets[0].aggregations.length; j++) {
				datasets.push({
		    		'label': inputData[0].buckets[0].aggregations[j].name,
		            'backgroundColor': $rootScope.getcolor(4),
		            'borderColor': $rootScope.getcolor(1),
		            'borderWidth': 0.6,
		            'pointBackgroundColor': $rootScope.getcolor(4),
		            'pointBorderColor': $rootScope.getcolor(1),
		            'data': data[j]
		    	});
	    	
	    	}
		    option = {
	            animation: {
	                duration: 5000
	            },
	            barThickness: 1,
	            scales: {
	                xAxes: [{
	                    stacked: stacked,
	                    barPercentage: 0.6,
	                    categoryPercentage: 0.2
	                }],
	                yAxes: [{
	                    stacked: stacked
	                }]
	            }
	        };
	    } else if(chartType === 'line'){
		    for (var j = 0; j < inputData[0].buckets[0].aggregations.length; j++) {
				datasets.push({
		    		'label': inputData[0].buckets[0].aggregations[j].name,
		            'backgroundColor': $rootScope.getcolor(4),
		            'borderColor': $rootScope.getcolor(1),
		            'lineTension': 0.5,
		            'borderWidth': 2,
		            'fill': true,
		            'pointBackgroundColor': $rootScope.getcolor(4),
		            'pointBorderColor': $rootScope.getcolor(1),
		            'data': data[j]
		    	});
	    	
	    	}
	    	 option = {
	                animation: {
	                    duration: 5000,
	                },
	                scales: {
	                    xAxes: [{
	                        display: true
	                    }]
	                }
	            }
	    }
	    var outputData = {
            labels:labels,
            datasets: datasets,
            option: option
        };
    	return outputData;
    };
}).controller('LoginCtrl', function($scope, $ionicModal, $rootScope, $timeout, $state, $stateParams, ionicMaterialMotion, ionicMaterialInk, loginService) {
    $scope.$parent.clearFabs();
    $ionicModal.fromTemplateUrl('templates/signup.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.signupModal = modal;
    });
    $ionicModal.fromTemplateUrl('templates/signup.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.signupModal = modal;
    });
    $scope.$parent.hideHeader();
    $scope.signupShow = function(){
    	$scope.signupModal.show();
    }
    $scope.closeSignupModal = function() {
        $scope.signupModal.hide();
    }
    $scope.login = function(data) {
        $scope.authTokenForLogin = btoa(data.username + ":" + data.password);
        loginService.login($scope.authTokenForLogin, data).then(function(loginResp) {
        	$rootScope.saveToken($scope.authTokenForLogin);
            $scope.errorObj = false;
            $state.go('app.profile');
            $scope.$parent.showHeader();
            $scope.$parent.clearFabs();
            $scope.isExpanded = false;
            $scope.$parent.setExpanded(false);
            $scope.$parent.setHeaderFab(false);
            $timeout(function() {
                ionicMaterialMotion.slideUp({
                    selector: '.slide-up'
                });
            }, 300);
            $timeout(function() {
                ionicMaterialMotion.fadeSlideInRight({
                    startVelocity: 3000
                });
            }, 700);
            ionicMaterialInk.displayEffect();
        }, function(err) {
            $scope.errorObj = err.data.message;
            console.log("Failed!, something went wrong. " + err.data.message);
        });
    }
    var authToken = window.localStorage.getItem('token');
    if(authToken !== "undefined" && authToken !== null){
    	$scope.errorObj = false;
        $state.go('app.profile');
    }
}).controller('FriendsCtrl', function($scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion) {
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.$parent.setHeaderFab('left');
    $timeout(function() {
        $scope.isExpanded = true;
        $scope.$parent.setExpanded(true);
    }, 300);
    ionicMaterialMotion.fadeSlideInRight();
    ionicMaterialInk.displayEffect();
}).controller('ProfileCtrl', function($scope, $rootScope, $state, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk, graphService) {
	$scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = false;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab(false);
    $timeout(function() {
        ionicMaterialMotion.fadeSlideInRight({
            startVelocity: 3000
        });
    }, 700);
    ionicMaterialInk.displayEffect();
    function getcolor() {
        return '#' + Math.random().toString(16).substr(-6);
    }
    graphService.getCircleData($rootScope.getToken()).then(function(circleResp) {
        $scope.circleResp = circleResp
     }, function(err) {
         $scope.errorObj = err.data.message;
         console.log("Failed!, something went wrong. " + err.data.message);
    });
   
    graphService.getSpentEffortHistogram($rootScope.getToken()).then(function(SpentEffortResp) {
        $scope.spentEffortData= $rootScope.getBarGraphData(SpentEffortResp, true,'bar');
        var bar = document.getElementById("spentEffortHistogramCanvas").getContext("2d");
        var myBarChart = new Chart(bar, {
            type: 'bar',
            data: $scope.spentEffortData,
            options: $scope.spentEffortData.option
        });
     }, function(err) {
         $scope.errorObj = err.data.message;
         console.log("Failed!, something went wrong. " + err.data.message);
     });
    graphService.getBurndown($rootScope.getToken()).then(function(burnDownResp) {
        $scope.burndownData = $rootScope.getBarGraphData(burnDownResp,true, 'line');
        var bar = document.getElementById("burndownCanvas").getContext("2d");
        var myBarChart = new Chart(bar, {
            type: 'line',
            data: $scope.burndownData,
            options: $scope.burndownData.option
        });
     }, function(err) {
         $scope.errorObj = err.data.message;
         console.log("Failed!, something went wrong. " + err.data.message);
     });
    graphService.getproductivityHistogramCanvas($rootScope.getToken()).then(function(productivityResp) {
        $scope.productivityResp= $rootScope.getBarGraphData(productivityResp,false,'bar');
        var bar = document.getElementById("productivityHistogramCanvas").getContext("2d");
        var myBarChart = new Chart(bar, {
            type: 'bar',
            data: $scope.productivityResp,
            options: $scope.productivityResp.option
        });
     }, function(err) {
         $scope.errorObj = err.data.message;
         console.log("Failed!, something went wrong. " + err.data.message);
    });
    graphService.getQualityHistogram($rootScope.getToken()).then(function(qualityHistogramResp) {
        $scope.qualityHistogramResp= $rootScope.getBarGraphData(qualityHistogramResp ,true,'bar');
        var bar = document.getElementById("qualityHistogramCanvas").getContext("2d");
        var myBarChart = new Chart(bar, {
            type: 'bar',
            data: $scope.qualityHistogramResp,
            options: $scope.qualityHistogramResp.option
        });
     }, function(err) {
         $scope.errorObj = err.data.message;
         console.log("Failed!, something went wrong. " + err.data.message);
    });
    graphService.getTeamHistogram($rootScope.getToken()).then(function(teamResp) {
        $scope.teamResp= $rootScope.getBarGraphData(teamResp ,true,'bar');
        var bar = document.getElementById("teamCanvas").getContext("2d");
        var myBarChart = new Chart(bar, {
            type: 'bar',
            data: $scope.teamResp,
            options: $scope.teamResp.option
        });
     }, function(err) {
         $scope.errorObj = err.data.message;
         console.log("Failed!, something went wrong. " + err.data.message);
    });
    graphService.getProjectProductivity($rootScope.getToken()).then(function(projectProductivityStatResp) {
        $scope.projectProductivityStatResp= $rootScope.getBarGraphData(projectProductivityStatResp ,false,'bar');
        var bar = document.getElementById("projectProductivityStatCanvas").getContext("2d");
        var myBarChart = new Chart(bar, {
            type: 'bar',
            data: $scope.projectProductivityStatResp,
            options: $scope.projectProductivityStatResp.option
        });
     }, function(err) {
         $scope.errorObj = err.data.message;
         console.log("Failed!, something went wrong. " + err.data.message);
    });
    graphService.getProjectQuality($rootScope.getToken()).then(function(projectQualityStatResp) {
        $scope.projectQualityStatResp= $rootScope.getBarGraphData(projectQualityStatResp ,false,'bar');
        var bar = document.getElementById("projectQualityStatCanvas").getContext("2d");
        var myBarChart = new Chart(bar, {
            type: 'bar',
            data: $scope.projectQualityStatResp,
            options: $scope.projectQualityStatResp.option
        });
     }, function(err) {
         $scope.errorObj = err.data.message;
         console.log("Failed!, something went wrong. " + err.data.message);
    });
    
    graphService.getProjectSpentEfforts($rootScope.getToken()).then(function(projectSpentEffortsStatResp) {
        $scope.projectSpentEffortsStatResp= $rootScope.getBarGraphData(projectSpentEffortsStatResp ,false,'bar');
        var bar = document.getElementById("projectSpentEffortsStatCanvas").getContext("2d");
        var myBarChart = new Chart(bar, {
            type: 'bar',
            data: $scope.projectSpentEffortsStatResp,
            options: $scope.projectSpentEffortsStatResp.option
        });
     }, function(err) {
         $scope.errorObj = err.data.message;
         console.log("Failed!, something went wrong. " + err.data.message);
    });
    
    
    var lineChartData = {
            labels: ["Data 1", "Data 2", "Data 3", "Data 4", "Data 5", "Data 6", "Data 7"],
            datasets: [{
                label: "123",
                backgroundColor: getcolor(),
                borderColor: getcolor(),
                lineTension: 0.5,
                fill: false,
                borderWidth: 1,
                pointBackgroundColor: getcolor(),
                pointBorderColor: getcolor(),
                data: [20, 30, 80, 20, 40, 10, 60]
            }, {
                label: "123",
                fill: false,
                backgroundColor: getcolor(),
                borderColor: getcolor(),
                lineTension:0.5,
                borderWidth: 1,
                pointBackgroundColor: getcolor(),
                pointBorderColor: getcolor(),
                data: [60, 10, 40, 30, 80, 30, 20]
            }]
        }
        var line = document.getElementById("lineCanvas").getContext("2d");
        new Chart(line, {
            type: 'line',
            data: lineChartData,
            options: {
                animation: {
                    duration: 5000
                },
                scales: {
                    xAxes: [{
                        display: false
                    }]
                }
            }
        });
    var piedata = {
        labels: ["Red", "Blue", "Yellow"],
        datasets: [{
            data: [300, 50, 100],
            borderWidth: 0.5,
            backgroundColor: [
                getcolor(),
                getcolor(),
                getcolor()
            ]
        }]
    };
    var pie = document.getElementById("pieCanvas").getContext("2d");
    new Chart(pie, {
        type: 'pie',
        data: piedata,
        options: {
            animation: {
                duration: 5000
            },
            responsive: true,
            legend: {
                position: 'bottom',
            },
            title: {
                display: true,
                text: 'Chart.js Doughnut Chart'
            }
        }
    });
    var bubbleChartData = {
        animation: {
            duration: 5000
        },
        datasets: [{
            label: "My First dataset",
            borderWidth: 1,
            backgroundColor: getcolor(),
            borderColor: getcolor(),
            pointBackgroundColor: getcolor(),
            pointBorderColor: getcolor(),
            borderWidth: 0.5,
            data: [{
                x: 10,
                y: 20,
                r: 10,
            }, {
                x: 70,
                y: 90,
                r: 10,
            }, {
                x: 10,
                y: 90,
                r: 10,
            }, {
                x: 20,
                y: 80,
                r: 10,
            }, {
                x: 55,
                y: 20,
                r: 10,
            }, {
                x: 20,
                y: 70,
                r: 10,
            }, {
                x: 10,
                y: 89,
                r: 10,
            }]
        }, {
            label: "My Second dataset",
            borderWidth: 1,
            backgroundColor: getcolor(),
            borderColor: getcolor(),
            pointBackgroundColor: getcolor(),
            pointBorderColor: getcolor(),
            data: [{
                x: 45,
                y: 55,
                r: 10,
            }, {
                x: 76,
                y: 67,
                r: 10,
            }, {
                x: 10,
                y: 50,
                r: 10,
            }, {
                x: 20,
                y: 30,
                r: 10,
            }, {
                x: 55,
                y: 66,
                r: 10,
            }, {
                x: 100,
                y: 70,
                r: 10,
            }, {
                x: 98,
                y: 89,
                r: 10,
            }]
        }]
    };
    var bubble = document.getElementById('bubbleCanvas').getContext('2d');
    new Chart(bubble, {
        type: 'bubble',
        data: bubbleChartData,
        options: {
            responsive: true,
            animation: {
                duration: 5000
            },
            title: {
                display: true,
                text: 'Chart.js Bubble Chart'
            },
            tooltips: {
                mode: 'point'
            },
            elements: {
                points: {
                    borderWidth: 10,
                    borderColor: getcolor()
                }
            }
        }
    });
    var radarData = {
        labels: ["Eating", "Drinking", "Sleeping", "Designing", "Coding", "Cycling", "Running"],
        datasets: [{
            label: "My First dataset",
            backgroundColor: getcolor(),
            borderColor: getcolor(),
            borderWidth: 0.5,
            pointBackgroundColor: getcolor(),
            pointBorderColor: getcolor(),
            pointHoverBackgroundColor: getcolor(),
            pointHoverBorderColor: getcolor(),
            data: [65, 59, 90, 81, 56, 55, 40]
        }, {
            label: "My Second dataset",
            backgroundColor: getcolor(),
            borderColor: getcolor(),
            borderWidth: 0.5,
            pointBackgroundColor: getcolor(),
            pointBorderColor: getcolor(),
            pointHoverBackgroundColor: getcolor(),
            pointHoverBorderColor: getcolor(),
            data: [28, 48, 40, 19, 96, 27, 100]
        }]
    };
    var radar = document.getElementById('radarCanvas').getContext('2d');
    new Chart(radar, {
        type: 'radar',
        data: radarData,
        options: {
            animation: {
                duration: 5000
            },
            scale: {
                reverse: true,
                ticks: {
                    beginAtZero: true
                }
            }
        }
    });
}).controller('ActivityCtrl', function($scope, $state, $filter, $rootScope, $stateParams, $ionicSlideBoxDelegate, $timeout, ionicMaterialMotion, ionicMaterialInk, programService, ERROR) {
	$scope.goBack = function(){
		$state.go('app.profile');
		$scope.$parent.showHeader();
        $scope.$parent.clearFabs();
        $scope.isExpanded = false;
        $scope.$parent.setExpanded(false);
        $scope.$parent.setHeaderFab(false);
        $timeout(function() {
            ionicMaterialMotion.slideUp({
                selector: '.slide-up'
            });
        }, 300);
         $timeout(function() {
            ionicMaterialMotion.fadeSlideInRight({
                 startVelocity: 3000
            });
        }, 700);
        ionicMaterialInk.displayEffect();
	}
	programService.getAllProgram($rootScope.getToken()).then(function(loginResp) {
        $scope.programOption = loginResp;
    }, function(err) {
        $scope.errorObj = err.data.message;
        console.log("Failed!, something went wrong. " + err.data.message);
    });
    $scope.$parent.showHeader();
    $scope.isExpanded = true;
    $scope.$parent.setExpanded(true);
    $scope.$parent.setHeaderFab('right');
    $timeout(function() {
        ionicMaterialMotion.fadeSlideIn({
            selector: '.animate-fade-slide-in .item'
        });
    }, 200);
    $scope.data = {};
    ionicMaterialInk.displayEffect();
    $scope.currentSlide = 0;
    $scope.disableSwipe = function() {
        $ionicSlideBoxDelegate.enableSlide(false);
    };
    $scope.nextSlide = function(data, $event) {
        $scope.currentSlide = $ionicSlideBoxDelegate.currentIndex();
        if ($scope.currentSlide === 0) {
            if (data.selectProgram === undefined || data.selectProject === undefined) {
                $scope.slideError1 = true;
                $scope.slideError1Message = ERROR.errorMessage;
            } else {
                $scope.slideError1 = false;
                $scope.currentSlide++;
                $ionicSlideBoxDelegate.next();
            }
        } else if ($scope.currentSlide === 1) {
            if (data.sprint === undefined || data.userStoryCount === undefined) {
                $scope.slideError2 = true;
                $scope.slideError2Message = ERROR.errorMessage;
            } else if (data.sprint < 0 || data.userStoryCount < 0) {
                $scope.slideError2 = true;
                $scope.slideError2Message = ERROR.errorMessageValue;
            } else {
                $scope.slideError2 = false;
                $scope.currentSlide++;
                $ionicSlideBoxDelegate.next();
            }
        } else if ($scope.currentSlide === 2) {
            if (data.searchinput === undefined) {
                $scope.slideError3 = true;
                $scope.slideError3Message = ERROR.errorMessage;
            } else {
                $scope.slideError3 = false;
                $scope.currentSlide++;
                $ionicSlideBoxDelegate.next();
            }
        } else if ($scope.currentSlide === 3) {
            if (data.spentHours_requirements === undefined || data.spentHours_design === undefined || data.spentHours_build === undefined || data.spentHours_test === undefined || data.spentHours_support === undefined || data.spentHours_unproductive === undefined) {
                $scope.slideError4 = true;
                $scope.slideError4Message = ERROR.errorMessage;
            } else {
                $scope.slideError4 = false;
                $scope.currentSlide++;
                $ionicSlideBoxDelegate.next();
            }
        } else if ($scope.currentSlide === 4) {
            if (data.remainingHours_requirements === undefined || data.remainingHours_design === undefined || data.remainingHours_build === undefined || data.remainingHours_test === undefined || data.remainingHours_support === undefined || data.remainingHours_unproductive === undefined) {
                $scope.slideError5 = true;
                $scope.slideError5Message = ERROR.errorMessage;
            } else {
                $scope.slideError5 = false;
                $scope.currentSlide++;
                $ionicSlideBoxDelegate.next();
            }
        } else if ($scope.currentSlide === 5) {
            if (data.estimatedHours_requirements === undefined || data.estimatedHours_design === undefined || data.estimatedHours_build === undefined || data.estimatedHours_test === undefined || data.estimatedHours_support === undefined || data.estimatedHours_unproductive === undefined) {
                $scope.slideError6 = true;
                $scope.slideError6Message = ERROR.errorMessage;
            } else {
                $scope.slideError6 = false;
                $scope.currentSlide++;
                $ionicSlideBoxDelegate.next();
            }
        } else if ($scope.currentSlide === 6) {
            if (data.qualityMetrics_stats_junit === undefined || data.qualityMetrics_stats_sonarCritical === undefined || data.qualityMetrics_stats_sonarMajor === undefined || data.qualityMetrics_stats_defectSev1 === undefined || data.qualityMetrics_stats_defectSev2 === undefined || data.qualityMetrics_stats_defectSev3 === undefined || data.qualityMetrics_stats_defectSev4 === undefined ) {
                $scope.slideError7 = true;
                $scope.slideError7Message = ERROR.errorMessage;
            } else {
                $scope.slideError7 = false;
                $scope.currentSlide++;
                $ionicSlideBoxDelegate.next();
            }
        } else {
            if (data.productivityMetrics_stats_storypoints === undefined || data.productivityMetrics_stats_velocity === undefined) {
                $scope.slideError8 = true;
                $scope.slideError8Message = ERROR.errorMessage;
            } else {
                $scope.slideError8 = false;
                $scope.currentSlide++;
                console.log(data);
                $ionicSlideBoxDelegate.next();
                var sprintStatus;
                data = {
                        "logDate":$filter('date')(new Date(),"yyyy-MM-dd"+"T00:00:00.000+0530"),
                        "project":{
                            "id":data.selectProject
                        },
                        "sprint":{
                            "id":"CI0011",
                            "sprintNumber":data.sprint,
                            "status":(data.isSprintActive)?  sprintStatus= "ACTIVE" : sprintStatus="INACTIVE",
                            "startDate":$filter('date')(data.startDate, "yyyy-MM-dd"+"T00:00:00.000+0530"),
                            "endDate":$filter('date')(data.startDate, "yyyy-MM-dd"+"T00:00:00.000+0530"),
                            "userStoryCount":data.userStoryCount,
                            "teamMembers":[
                                {
                                    "user":{
                                        "id":"06520G",
                                        "email":"ranjeet.xb.singh@barclayscorp.com"
                                    },
                                    "role":"ScrumMaster"
                                },
                                {
                                    "user":{
                                        "id":"07821P",
                                        "email":"ayush.x.rastogi@barclays.com"
                                    },
                                    "role":"BuildLead"
                                }
                            ],
                            "effortMetrics":{
                                "spentHours":{
                                    "requirements":data.spentHours_requirements,
                                    "design":data.spentHours_design,
                                    "build":data.spentHours_build,
                                    "test":data.spentHours_test,
                                    "support":data.spentHours_support,
                                    "unproductive":data.spentHours_unproductive
                                },
                                "remainingHours":{
                                	"requirements":data.remainingHours_requirements,
                                    "design":data.remainingHours_design,
                                    "build":data.remainingHours_build,
                                    "test":data.remainingHours_test,
                                    "support":data.remainingHours_support,
                                    "unproductive":data.remainingHours_unproductive
                                },
                                "estimatedHours":{
                                	"requirements":data.estimatedHours_requirements,
                                    "design":data.estimatedHours_design,
                                    "build":data.estimatedHours_build,
                                    "test":data.estimatedHours_test,
                                    "support":data.estimatedHours_support,
                                    "unproductive":data.estimatedHours_unproductive
                                }
                            },
                            "qualityMetrics":{
                                "stats":{
                                    "junit":data.qualityMetrics_stats_junit,
                                    "sonarCritical":data.qualityMetrics_stats_sonarCritical,
                                    "sonarMajor":data.qualityMetrics_stats_sonarMajor,
                                    "DefectsSev1":data.qualityMetrics_stats_defectSev1,
                                    "DefectsSev2":data.qualityMetrics_stats_defectSev2,
                                    "DefectsSev3":data.qualityMetrics_stats_defectSev3,
                                    "DefectsSev4":data.qualityMetrics_stats_defectSev4
                                }
                            },
                            "productivityMetrics":{
                                "stats":{
                                    "storyPoints":data.productivityMetrics_stats_storypoints,
                                    "velocity":data.productivityMetrics_stats_velocity
                                }
                            }
                        }
                    };
                programService.saveProjectSnapshot(data, $rootScope.getToken()).then(function(createProjectSnapshotResp) {
                    $scope.createProjectSnapshotResp = createProjectSnapshotResp;
                    $state.go('app.profile');
                    $scope.$parent.showHeader();
                    $scope.$parent.clearFabs();
                    $scope.isExpanded = false;
                    $scope.$parent.setExpanded(false);
                    $scope.$parent.setHeaderFab(false);
                    $timeout(function() {
                        ionicMaterialMotion.slideUp({
                            selector: '.slide-up'
                        });
                    }, 300);
                    $timeout(function() {
                        ionicMaterialMotion.fadeSlideInRight({
                            startVelocity: 3000
                        });
                    }, 700);
                    ionicMaterialInk.displayEffect();
                }, function(err) {
                    $scope.errorObj = err.data.message;
                    console.log("Failed!, something went wrong. " + err.data.message);
                });
            }
        }
        if (data.length === undefined) {
            $ionicSlideBoxDelegate.stop();
            $event.preventDefault();
        }
    };
    $scope.previousSlide = function() {
        $scope.currentSlide = $ionicSlideBoxDelegate.currentIndex();
        $scope.currentSlide--;
        $ionicSlideBoxDelegate.previous();
    };
    $scope.getAllProjects = function(programId){
    	programService.getAllProjects(programId, $rootScope.getToken()).then(function(projectResp) {
            $scope.projectOptions = projectResp;
        }, function(err) {
            $scope.errorObj = err.data.message;
            console.log("Failed!, something went wrong. " + err.data.message);
        });
    };
}).controller('GalleryCtrl', function($scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion) {
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = true;
    $scope.$parent.setExpanded(true);
    $scope.$parent.setHeaderFab(false);
    ionicMaterialInk.displayEffect();
    ionicMaterialMotion.pushDown({
        selector: '.push-down'
    });
    ionicMaterialMotion.fadeSlideInRight({
        selector: '.animate-fade-slide-in .item'
    });
});