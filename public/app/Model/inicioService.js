angular.module('whattsena').service('inicioService', inicioService);
inicioService.$inject = ['$http', 'host', '$httpParamSerializerJQLike'];
function inicioService($http, host, $httpParamSerializerJQLike) {
  this.ingreso = data => {
    return $http.post(host + 'auth', $httpParamSerializerJQLike(data));
  };
}
