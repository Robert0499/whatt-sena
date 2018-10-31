angular.module('whattsena').service('principalService', principalService);
principalService.inject = ['$http', 'host', '$httpParamSerializerJQLike'];
function principalService($http, host, $httpParamSerializerJQLike) {
  this.postChat = data => {
    return $http.post(host + 'messages', $httpParamSerializerJQLike(data));
  };
  this.getChat = id => {
    return $http.get(host + 'messages?id=' + id);
  };

  this.change = data => {
    return $http({
      method: 'PUT',
      url: host + 'forgout',
      params: data
    });
  };

  // put = img
  // setInterval(getChat,2000);
}
