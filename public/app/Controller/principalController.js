angular
  .module('whattsena')
  .controller('principalController', principalController);
principalController.$inject = [
  '$scope',
  '$state',
  'host',
  '$sessionStorage',
  '$localStorage',
  'principalService',
  'img',
  'auth',
  'Upload'
];
function principalController(
  $scope,
  $state,
  host,
  $sessionStorage,
  $localStorage,
  principalService,
  img,
  auth,
  Upload
) {
  if (typeof $localStorage.grupo !== 'undefined') {
    auth($localStorage.grupo.token, $state);
    $scope.postChat = () => {
      $scope.message.id_usuario = $localStorage.grupo.usuario.id;
      $scope.message.id_grupo = $localStorage.grupo.grupo.id;
      principalService
        .postChat($scope.message)
        .then(result => {
          toastr.info(result.data.message);
          $('#formeje')[0].reset();
        })
        .catch(err => {
          console.log(err);
        });
    };
    $scope.array = [];
    setTimeout(() => {
      document.querySelector('#boxMessage');
    }, 2000);
    interva = setInterval(() => {
      principalService
        .getChat($localStorage.grupo.grupo.id)
        .then(result => {
          $scope.mensajes = result.data;
        })
        .catch(err => {
          console.log(err);
        });
    }, 1000);
    $scope.open = () => {
      $('#show1').modal('show');
    };
    $('#iconF').click(function() {
      $('input[name=file]').trigger('click');
    });

    var info = $localStorage.grupo;
    $scope.array = info.participantes;
    $scope.numero_ficha = info.grupo.numero_ficha;
    $scope.nombre_ficha = info.grupo.nombre_ficha;
    $scope.descripcion_ficha = info.grupo.descripcion;
    $scope.img_grupo = img + info.grupo.foto;
    $scope.foto_user = img + info.usuario.foto;

    // console.log(info);

    $scope.updateAp = () => {
      var pass1 = $('#pass1').val();
      var pass2 = $('#pass2').val();
      if (pass1 == pass2) {
        $scope.aprendis.id = $localStorage.grupo.usuario.id;
        principalService
          .change($scope.aprendis)
          .then(result => {
            toastr.success(result.data.message);
          })
          .catch(err => {
            toastr.error(err.data.message);
          });
      } else {
        toastr.error('Las contraseñas no coiciden, verifica!');
      }

      console.log($scope.aprendis);
    };

    $scope.cambio = () => {
      Upload.upload({
        url: host + 'img',
        data: {
          foto: $scope.file,
          id: $localStorage.grupo.usuario.id
        },
        headers: { 'Content-Type': 'application/json' }
      }).then(
        function(resp) {
          $scope.foto_user = img + resp.data.foto + '?' + Date.now();
          $localStorage.grupo.usuario.foto = resp.data.foto;
        },
        function(resp) {
          toastr.error(resp.data.message);
          console.log(resp.data);
        }
      );
    };
    $scope.cerrar = () => {
      $localStorage.$reset();
      $state.go('inicio');
    };
  } else {
    $state.go('inicio');
  }
}
