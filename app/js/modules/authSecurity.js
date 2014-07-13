(function (angular) {
  angular.module('authSecurity', [])
    .run(['$state', '$rootScope', 'loginRedirectState',
      function ($state, $rootScope, loginRedirectState) {
        new RouteSecurityManager($state, $rootScope, loginRedirectState);
      }
    ]);

  function RouteSecurityManager($state, $rootScope, loginRedirectState) {
    this._state = $state;
    this._rootScope = $rootScope;
    this._redirectTo = null;
    this._loginRedirectState = loginRedirectState;
    this._authenticated = !! ($rootScope.auth && $rootScope.auth.user);
    this._init();
  }

  RouteSecurityManager.prototype = {
    _init: function () {
      var self = this;

      // Set up a handler for all future route changes, so we can check
      // if authentication is required.
      self._rootScope.$on("$stateChangeStart", function (ev, toState, toParams, fromState, fromParams) {
        self._authRequiredRedirect(ev, fromState, toState, self._loginRedirectState);
      });

      self._rootScope.$on('$firebaseSimpleLogin:login', angular.bind(this, this._login));
      self._rootScope.$on('$firebaseSimpleLogin:logout', angular.bind(this, this._logout));
      self._rootScope.$on('$firebaseSimpleLogin:error', angular.bind(this, this._error));
    },

    _login: function () {
      this._authenticated = true;
      if (this._state.current.name === this._loginRedirectState) {
        this._state.transitionTo('dash');
      }
    },

    _logout: function () {
      this._authenticated = false;
    },

    _error: function () {
      if (!this._rootScope.auth || !this._rootScope.auth.user) {
        this._authenticated = false;
      }
    },

    // A function to check whether the current path requires authentication,
    // and if so, whether a redirect to a login page is needed.
    _authRequiredRedirect: function (ev, fromState, toState, loginState) {
      if (toState.authRequired && !this._authenticated) {
        if (!this._authenticated && toState.name !== loginState) {
          this._redirectTo = toState.name;
        }
        this._state.transitionTo(loginState);
        ev.preventDefault();
      }
    }
  };
})(angular);