(() => {
  angular.module('whattsena').config(config);
  config.$inject = [
    '$httpProvider',
    '$stateProvider',
    '$urlRouterProvider',
    '$locationProvider',
    'state'
  ];
  function config(
    $httpProvider,
    $stateProvider,
    $urlRouterProvider,
    $locationProvider,
    state
  ) {
    $httpProvider.defaults.headers['Content-Type'] =
      'Access-Control-Allow-Origin: *';
    $httpProvider.defaults.headers.post['Content-Type'] =
      'application/x-www-form-urlencoded; charset=UTF-8;';
    $httpProvider.defaults.headers.put['Content-Type'] =
      'application/x-www-form-urlencoded; charset=UTF-8';
    $httpProvider.defaults.headers.delete = {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    };
    $urlRouterProvider.otherwise('/inicio');
    state($stateProvider, 'principal');
    state($stateProvider, 'inicio');
    state($stateProvider, 'instructor');
    state($stateProvider, 'dashboard');
  }
})();
