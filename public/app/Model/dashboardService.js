angular.module('whattsena').service('dashboardService', dashboardService);
dashboardService.$inject = ['$http', 'host', '$httpParamSerializerJQLike'];
function dashboardService($http, host, $httpParamSerializerJQLike) {
  this.download = () => {
    window.location.href = host + 'excel';
  };
  //   this.addFicha = ()=>{
  // 	  return 'groups'
  //   }

  this.getFichas = () => {
    return $http.get(host + 'groups');
  };
}
