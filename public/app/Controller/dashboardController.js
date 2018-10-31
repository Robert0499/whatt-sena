angular
  .module('whattsena')
  .controller('dashboardController', dashboardController);
dashboardController.$inject = [
  '$scope',
  '$state',
  'host',
  'dashboardService',
  'Upload',
  'img',
  'auth',
  '$localStorage'
];
function dashboardController(
  $scope,
  $state,
  host,
  dashboardService,
  Upload,
  img,
  auth,
  $localStorage
) {
  // if (typeof $localStorage.grupo !== 'undefined') {
  // auth($localStorage.grupo.token, $state);
  dashboardService
    .getFichas()
    .then(result => {
      // console.log(result);
      result.data.forEach(e => {
        e.foto = img + e.foto;
        // $scope.array = e;
      });
      $scope.array = result.data;
    })
    .catch(err => {
      console.log(err);
    });

  $scope.download = () => {
    dashboardService
      .download()
      .then(result => {})
      .catch(err => {
        console.log(err);
      });
  };
  $scope.open = () => {
    $('#show1').modal('show');
  };
  $scope.addFicha = () => {
    Upload.upload({
      url: host + 'groups',
      data: {
        foto: $scope.file,
        numero_ficha: $scope.user.ficha,
        descripcion: $scope.user.descripcion,
        aprendices: $scope.user.aprendices,
        nombre_ficha: $scope.user.nombre_ficha
      },
      headers: { 'Content-Type': 'application/json' }
    }).then(
      function(resp) {
        toastr.success(resp.data.message);
        dashboardService
          .getFichas()
          .then(result => {
            // console.log(result);
            result.data.forEach(e => {
              e.foto = img + e.foto;
              // $scope.array = e;
            });
            $scope.array = result.data;
            $('#show1').modal('hide');
            $('#addF')[0].reset();
          })
          .catch(err => {
            console.log(err);
          });
      },
      function(resp) {
        toastr.error(resp.data.message);
        console.log(resp.data);
      }
    );
  };
}
