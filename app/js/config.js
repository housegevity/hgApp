'use strict';

// Declare app level module which depends on filters, and services
angular.module('hgApp.config', [])
   .constant('version', '0.1')

   // where to redirect users if they need to authenticate
   .constant('loginRedirectPath', '/home')

   // your Firebase URL goes here
   .constant('FBURL', 'https://housegevity.firebaseio.com')