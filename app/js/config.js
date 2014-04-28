'use strict';

// Declare app level module which depends on filters, and services
angular.module('hgApp.config', [])
   .constant('version', '0.1')

   // where to redirect users if they need to authenticate
   .constant('loginRedirectPath', '/home')

   // your Firebase URL goes here
   // .constant('FBURL', 'https://housegevity.firebaseio.com')
   .constant('FBURL', 'https://housegeveity.firebaseio.com')

   // Google API Key for Cloud Storage
   .constant('GAPIKEY', 'AIzaSyA2e2UnfJfZz7Cb4pbaU8FMzmwy9te_z60')

   // Google Storage version
   .constant('storage', 'v1beta2')

   // Google scopes
   .constant("scope", 'https://www.googleapis.com/auth/devstorage.read_write');
