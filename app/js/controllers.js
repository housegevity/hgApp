'use strict';

/* Controllers */
var FIREBASE_URL = "https://housegevity.firebaseio.com/";
var REF = new Firebase(FIREBASE_URL);

angular.module('myApp.controllers', ['firebase'])

.controller('homeCtrl', function ($scope, $rootScope, $location, $log, $firebase, $firebaseSimpleLogin) {
    $scope.auth = $firebaseSimpleLogin(REF);
})

.controller('dashCtrl', function ($rootScope, $scope, $firebase, $firebaseSimpleLogin, $http, $location, $routeParams, buyReqs, ownReqs) { 
    $scope.auth = $firebaseSimpleLogin(REF);

    //Show Popover 
    $scope.showPopover = function(){
        $('#noticationStatus').popover();
    };

    //GRAB THE DATA DEPENDENCY INJECTIONS
    $scope.ownReqs = ownReqs;

    var propertiesRef = new Firebase("https://housegevity.firebaseio.com/properties");
    $scope.all_properties = $firebase(propertiesRef);
    propertiesRef.once('value', onDataLoad);

    console.log($scope.all_properties);

    //WATCH THE ROUTE, player
    $scope.currentRoute = $location.url();
    $scope.propertyID = $routeParams.propertyID;

    $scope.addbuyProperty = function() {
        $('#buyCheck').modal('show');
    }

    $scope.addmyProperty = function() {
        $('#addProperty').modal('show');
    }

    $scope.buyChecklist = function(property) {
        $scope.switchit = 2;
        console.log('param selected')
    };

    $scope.selected = 1;

    $scope.data = {
        selectedTab: 1
    };

    function onDataLoad(dataSnapshot) {
        $scope.all_properties = dataSnapshot.val();
        $scope.notificationsSum = 0;

        var sum = 0;

        for (var i = 0; i < $scope.all_properties.length; i += 1) {
            $scope.sum = $scope.all_properties[i].notifications.length
            console.log($scope.all_properties[i].notifications.length)
        };
    }
})

.controller('propertyCtrl', function($scope, $location, $routeParams, $http, ownReqs, documents) {

    $scope.selectedTab = 1;
    $scope.ownReqs = ownReqs;

    //GRAB THE NESCESSARY JSON DATA

    $http.get('data/all_properties.json').success(function(data) {
        $scope.all_properties = data;
        $scope.all_propertiesLength = $scope.all_properties.length;
        $scope.selectedProperty = $scope.all_properties[$routeParams.propertyID - 1]
    });

    // $http.get('data/properties/' + $routeParams.propertyID + '.json').success(function(data) {
    //  $scope.properties = data;
    // });

    $http.get('data/all_required_docs.json').success(function(data) {
        $scope.required_docs = data;
    });

    $http.get('data/presummer_notifications.json').success(function(data) {
        $scope.presummer_notifications = data;
        $scope.presummer_notificationsLength = $scope.presummer_notifications.length;
    });

    $http.get('data/prewinter_notifications.json').success(function(data) {
        $scope.prewinter_notifications = data;
        $scope.prewinter_notificationsLength = $scope.prewinter_notifications.length;
    });

    $http.get('data/quarterly_notifications.json').success(function(data) {
        $scope.quarterly_notifications = data;
        $scope.quarterly_notificationsLength = $scope.quarterly_notifications.length;
    });

    $http.get('data/annual_notifications.json').success(function(data) {
        $scope.annual_notifications = data;
        $scope.annual_notificationsLength = $scope.annual_notifications.length;
    });

    //UI CONTROLS

    $scope.selectedTab = 1;
    $scope.selectedDocID = null;    
    
    $scope.setSelected = function (selectedDocID) {
        $scope.selectedDocID = selectedDocID;
        console.log("document category selected")
    };

    $scope.addDocument = function() {
        $('#documentModal').modal('show');
    }

})

.controller('settingCtrl', function($scope, $location) {
    console.log('settings controller seperated')
})