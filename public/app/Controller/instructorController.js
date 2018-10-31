angular
  .module('whattsena')
  .controller('instructorController', instructorController);
instructorController.$inject = [
  '$scope',
  '$state',
  'host',
  '$sessionStorage',
  '$localStorage',
  'img',
  'auth'
];
function instructorController(
  $scope,
  $state,
  host,
  $sessionStorage,
  $localStorage,
  img,
  auth
) {
  if (typeof $localStorage.grupo !== 'undefined') {
    auth($localStorage.grupo.token, $state);
    var info = $localStorage.grupo;
    $scope.array = info.grupos;
    $scope.numero_ficha = info.grupos[0].numero_ficha;
    $scope.nombre_ficha = info.grupos[0].nombre_ficha;
    $scope.descripcion_ficha = info.grupos[0].descripcion;
    $scope.foto_ficha = info.grupos[0].foto;
  } else {
    $state.go('inicio');
  }
}
