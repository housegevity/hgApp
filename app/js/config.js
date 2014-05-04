'use strict';

// Declare app level module which depends on filters, and services
angular.module('hgApp.config', [])
   .constant('version', '0.1')

   // where to redirect users if they need to authenticate
   .constant('loginRedirectPath', '/home')

   // your Firebase URL goes here
   .constant('FBURL', 'https://housegevity.firebaseio.com')

   // Google API Key for Cloud Storage
   .constant('GAPIKEY', 'AIzaSyBBGscNQ9LWYaO2tpAbq6Do5rJH58NKBY4')
   .constant('GAPI_CLIENTID', '815222281377-q7ca8cs8t9iht7f3ffahg8dlg55r98iv.apps.googleusercontent.com')

   // Google scopes
   .constant("scope", ['profile', 'email']);

