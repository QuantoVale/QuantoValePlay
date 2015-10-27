angular.module('starter.controllers', [])
.controller('AppCtrl', function($scope,$ionicModal, $timeout) {})

.controller('LeftSideMenu',
function ContentController($scope, $ionicSideMenuDelegate) {
  $scope.toggleLeft = function() {
    $ionicSideMenuDelegate.toggleLeft();
  };
})

.controller('ProfileCtrl',
function($scope, OpenFB) {
  OpenFB.get('/me').success(function(user) {
    $scope.user = user;
  });
})

.controller("ContractsController",
function($scope, $http) {
  var url = "http://localhost:3000/contratos/index";

  $http.get(url).success(function(data) {
    console.log(data);
    $scope.questions = data;
  }).error(function(error) {
    console.log("Server side error");
  });
})

.controller('valuesController',
function($scope, $http) {
  var url = "http://localhost:3000/contratos/?id=4";

  $http.get(url)
  .success(function(data) {
    console.log(data);
    $scope.values = data;
  })
  .error(function(data) {
    console.log('Erro');
  })
})

.controller('Answer',
function($scope,$ionicPopup) {
  $scope.compare = function(x, y)
  {
    if (x === y)
    {
      document.getElementsByTagName('result')[0].innerHTML = 'Certo!';
    } else {
      document.getElementsByTagName('result')[0].innerHTML = 'Errado!';
    }
  }
})
.controller('Exit',
function($scope,$ionicPopup,$state) {
  $scope.encerrar = function()
  {
    var confirmPopup = $ionicPopup.confirm({
      title: 'Fim da partida',
      template: 'Deseja realmente encerrar a partida?'
    });

    confirmPopup.then(function(res,$state)
    {

      if(res)
      {
        $state.go('#/start');
        console.log('Encerrar');
      }
      else
      console.log('Cancelar encerramento');
    })
  }
})

.controller('HomeCtrl',
function($scope, $ionicPopup, $auth) {
  $scope.showAlert = function() {
    var alertPopup = $ionicPopup.alert({
      title: 'Erro!',
      template: 'Você tem que estar logado para jogar.'
    });
  };

  $scope.authenticate = function(provider) {
    $auth.authenticate(provider)
    .then(function() {
      $ionicPopup.alert({
        title: 'Sucesso',
        content: 'Você está Logado!'
      })
    })
    .catch(function(response) {
      $ionicPopup.alert({
        title: 'Erro',
        content: response.data ? response.data || response.data.message : response
      })
    });
  };


  $scope.logout = function() {
    $auth.logout();
  };

  $scope.isAuthenticated = function() {
    return $auth.isAuthenticated();
  };
});
