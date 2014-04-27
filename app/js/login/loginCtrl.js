'use strict';

/* Controllers */
var FIREBASE_URL = "https://housegevity.firebaseio.com/";
var REF = new Firebase(FIREBASE_URL);

angular.module('hgApp.loginCtrl', ['firebase'])

.controller('loginCtrl', function ($scope, $rootScope, $location, $log, $firebase, $firebaseSimpleLogin) {
    $scope.auth = $firebaseSimpleLogin(REF);
});