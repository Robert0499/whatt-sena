angular.module('whattsena').controller('inicioController', inicioController);
inicioController.$inject = [
  '$scope',
  '$state',
  'host',
  '$sessionStorage',
  'inicioService',
  '$localStorage',
  'auth',
  'img'
];
function inicioController(
  $scope,
  $state,
  host,
  $sessionStorage,
  inicioService,
  $localStorage,
  auth,
  img
) {
  if (typeof $localStorage.grupo == 'undefined') {
    $scope.ingreso = () => {
      inicioService
        .ingreso($scope.usuario)
        .then(result => {
          result.data.participantes.forEach(e => {
            e.foto = img + e.foto;
          });
          if (result.data.token == 2) {
            result.data.grupos.forEach(e => {
              e.foto = img + e.foto;
            });
          }
          $localStorage.grupo = result.data;
          auth(result.data.token, $state);
        })
        .catch(err => {
          toastr.error('Datos incorrectos! :v', {
            timeOut: '3000',
            extendedTImeout: '0'
          });
          console.log(err);
        });
    };
  } else {
    auth($localStorage.grupo.token, $state);
  }
}
