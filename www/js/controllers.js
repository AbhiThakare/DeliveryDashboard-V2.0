/* global angular, document, window */
'use strict';
angular.module('dashboard').controller('AppCtrl', function($scope, $rootScope, $state, $ionicModal, $ionicPopover, $timeout) {
    // Form data for the login modal
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
        $state.go('app.login');
    };
    $rootScope.saveToken = function(token){
    	 window.localStorage.setItem('token',token);
    };
    $rootScope.getToken = function(token){
    	var token = window.localStorage.getItem('token');
    	return token;
    };
    
}).controller('LoginCtrl', function($scope,$rootScope, $timeout, $state, $stateParams, ionicMaterialMotion, ionicMaterialInk, loginService) {
    $scope.$parent.clearFabs();
    $timeout(function() {
        $scope.$parent.hideHeader();
    }, 0);
    ionicMaterialInk.displayEffect();
    $scope.login = function(data) {
        //$state.go('app.profile');
    	$scope.authTokenForLogin= btoa(data.username+":"+data.password);
    	$rootScope.saveToken($scope.authTokenForLogin);
    	loginService.login($scope.authTokenForLogin).then(function(loginResp) {
    		$scope.errorObj = false;
    		$state.go('app.profile');
    		$scope.$parent.showHeader();
		    $scope.$parent.clearFabs();
		    $scope.isExpanded = false;
		    $scope.$parent.setExpanded(false);
		    $scope.$parent.setHeaderFab(false);

		    // Set Motion
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

		    // Set Ink
		    ionicMaterialInk.displayEffect();
        }, function(err) {
        	$scope.errorObj = err.data.message;
        	console.log("Failed!, something went wrong. " +err.data.message);
        });
    }
}).controller('FriendsCtrl', function($scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion) {
    // Set Header
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.$parent.setHeaderFab('left');
    // Delay expansion
    $timeout(function() {
        $scope.isExpanded = true;
        $scope.$parent.setExpanded(true);
    }, 300);
    // Set Motion
    ionicMaterialMotion.fadeSlideInRight();
    // Set Ink
    ionicMaterialInk.displayEffect();
}).controller('ProfileCtrl', function($scope, $state, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk) {
    function getcolor() {
        return '#' + Math.random().toString(16).substr(-6);
    }
    $scope.refresh = function() {
        location.reload();
    };
    var lineChartData = {
        labels: ["Data 1", "Data 2", "Data 3", "Data 4", "Data 5", "Data 6", "Data 7"],
        datasets: [{
            label: "123",
            backgroundColor: getcolor(),
            borderColor: getcolor(),
            lineTension: 0.1,
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
            lineTension: 0.1,
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
    var barData = {
        labels: ["January", "February", "March", "April", "May", "June"],
        datasets: [{
            label: "123",
            backgroundColor: getcolor(),
            borderColor: getcolor(),
            borderWidth: 0.5,
            hoverBorderColor: getcolor(),
            pointBackgroundColor: getcolor(),
            pointBorderColor: getcolor(),
            hoverBackgroundColor: getcolor(),
            data: [456, 479, 324, 569, 702, 600]
        }, {
            backgroundColor: getcolor(),
            borderColor: getcolor(),
            borderWidth: 0.5,
            hoverBorderColor: getcolor(),
            pointBackgroundColor: getcolor(),
            pointBorderColor: getcolor(),
            hoverBackgroundColor: getcolor(),
            data: [364, 504, 605, 400, 345, 320]
        }]
    }
    var bar = document.getElementById("barCanvas").getContext("2d");
    var myBarChart = new Chart(bar, {
        type: 'bar',
        data: barData,
        options: {
            animation: {
                duration: 5000
            },
            barThickness: 1,
            scales: {
                xAxes: [{
                    stacked: false
                }],
                yAxes: [{
                    stacked: false
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
}).controller('ActivityCtrl', function($scope, $rootScope, $stateParams, $ionicSlideBoxDelegate, $timeout, ionicMaterialMotion, ionicMaterialInk, programService) {
	programService.getAllProgram($rootScope.getToken()).then(function(loginResp) {
		$scope.programOption = loginResp;
    }, function(err) {
    	$scope.errorObj = err.data.message;
    	console.log("Failed!, something went wrong. " +err.data.message);
    });
    $scope.$parent.showHeader();
    //$scope.$parent.clearFabs();
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
    $scope.nextSlide = function(data) {
    	$scope.currentSlide = $ionicSlideBoxDelegate.currentIndex();
    	if($scope.currentSlide === 0){
    		if(data.selectProgram === undefined || data.selectProject == undefined){
    			$scope.slideError1 = true;
    			$scope.slideError1Message = '* Are Mandatory.';
    		}else{
    			$scope.slideError1 = false;
    			$scope.currentSlide++;
    			$ionicSlideBoxDelegate.next();
    		}
    		
    	} else if($scope.currentSlide === 1){
    		if(data.sprint === undefined || data.userStoryCount === undefined){
    			$scope.slideError2 = true;
    			$scope.slideError2Message = "* Are Mandatory.";
    		}else if(data.sprint < 0 || data.userStoryCount < 0){
    			$scope.slideError2 = true;
    			$scope.slideError2Message = "Values Can't be -Ve.";
    		}else{
    			$scope.slideError2 = false;
    			$scope.currentSlide++;
    			$ionicSlideBoxDelegate.next();
    		}
    		
    	}else if($scope.currentSlide === 2){
    		if(data.searchinput === undefined){
    			$scope.slideError3 = true;
    			$scope.slideError3Message = "* Are Mandatory.";
    		}else{
    			$scope.slideError3 = false;
    			$scope.currentSlide++;
    			$ionicSlideBoxDelegate.next();
    		}
    		
    	}else if($scope.currentSlide === 3){
    		if(data.spentHours_requirements === undefined || data.spentHours_design === undefined || 
    				data.spentHours_build === undefined || data.spentHours_test === undefined || 
    				data.spentHours_support === undefined || data.spentHours_unproductive === undefined ){
    			$scope.slideError4 = true;
    			$scope.slideError4Message = "* Are Mandatory.";
    		}else{
    			$scope.slideError4 = false;
    			$scope.currentSlide++;
    			$ionicSlideBoxDelegate.next();
    		}
    		
    	}else if($scope.currentSlide === 4){
    		if(data.remainingHours_requirements === undefined || data.remainingHours_design === undefined || 
    				data.remainingHours_build === undefined || data.remainingHours_test === undefined || 
    				data.remainingHours_support === undefined || data.remainingHours_unproductive === undefined ){
    			$scope.slideError5 = true;
    			$scope.slideError5Message = "* Are Mandatory.";
    		}else{
    			$scope.slideError5 = false;
    			$scope.currentSlide++;
    			$ionicSlideBoxDelegate.next();
    		}
    		
    	}else if($scope.currentSlide === 5){
    		if(data.estimatedHours_requirements === undefined || data.estimatedHours_design === undefined || 
    				data.estimatedHours_build === undefined || data.estimatedHours_test === undefined || 
    				data.estimatedHours_support === undefined || data.estimatedHours_unproductive === undefined ){
    			$scope.slideError6 = true;
    			$scope.slideError6Message = "* Are Mandatory.";
    		}else{
    			$scope.slideError6 = false;
    			$scope.currentSlide++;
    			$ionicSlideBoxDelegate.next();
    		}
    		
    	}else if($scope.currentSlide === 6){
    		if(data.qualityMetrics_stats_junit === undefined || data.qualityMetrics_stats_sonarCritical === undefined || 
    				data.qualityMetrics_stats_sonarMajor === undefined || data.qualityMetrics_stats_defectSev1 === undefined || 
    				data.qualityMetrics_stats_defectSev2 === undefined || data.qualityMetrics_stats_defectSev3 === undefined ||
    				data.qualityMetrics_stats_defectSev4 === undefined || data.qualityMetrics_stats_defectDensity === undefined ){
    			$scope.slideError7 = true;
    			$scope.slideError7Message = "* Are Mandatory.";
    		}else{
    			$scope.slideError7 = false;
    			$scope.currentSlide++;
    			$ionicSlideBoxDelegate.next();
    		}
    		
    	}else {
    		if(data.productivityMetrics_stats_storypoints === undefined || data.productivityMetrics_stats_velocity === undefined){
    			$scope.slideError8 = true;
    			$scope.slideError8Message = "* Are Mandatory.";
    		}else{
    			$scope.slideError8 = false;
    			$scope.currentSlide++;
    			$ionicSlideBoxDelegate.next();
    		}
    	}
    }
    $scope.previousSlide = function() {
    	$scope.currentSlide = $ionicSlideBoxDelegate.currentIndex();
    	$scope.currentSlide--;
    	$ionicSlideBoxDelegate.previous();
    }
}).controller('GalleryCtrl', function($scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion) {
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = true;
    $scope.$parent.setExpanded(true);
    $scope.$parent.setHeaderFab(false);
    // Activate ink for controller
    ionicMaterialInk.displayEffect();
    ionicMaterialMotion.pushDown({
        selector: '.push-down'
    });
    ionicMaterialMotion.fadeSlideInRight({
        selector: '.animate-fade-slide-in .item'
    });
});