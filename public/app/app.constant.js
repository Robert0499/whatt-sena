angular.module('whattsena').constant('state', (stateprovider, name) => {
  stateprovider.state(name, {
    url: '/' + name,
    controller: name + 'Controller',
    templateUrl: 'app/View/' + name + '.html',
    resolve: {
      loadMyCtrl: [
        '$ocLazyLoad',
        $ocLazyLoad => {
          return $ocLazyLoad.load([
            {
              files: [
                'app/Controller/' + name + 'Controller.js',
                'app/css/' + name + 'Style.css',
                'app/Model/' + name + 'Service.js'
              ]
            }
          ]);
        }
      ]
    }
  });
});
angular
  .module('whattsena')
  .constant('host', 'http://192.168.1.60/whatsena-api/public/api/');
angular
  .module('whattsena')
  .constant('img', 'http://192.168.1.60/whatsena-api/files/');

angular.module('whattsena').constant('auth', (result, state) => {
  switch (parseInt(result)) {
    case 1:
      state.go('dashboard');
      break;
    case 2:
      state.go('instructor');
      break;
    case 3:
      state.go('principal');
    default:
      break;
  }
});
