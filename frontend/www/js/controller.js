angular.module('starter.controllers', ['callRails', 'Score'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {})

.controller('ScoreCtrl', function($scope, Score) {

    Score.query().$promise.then(function(response) {
        $scope.contratos = response;
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

.controller('valuesController', function($scope, $http, ValuesService, ScoreEntry)

    {
        ValuesService.buttonPress().then(function(response) {
            console.log(ValuesService.getPreviousId);
            console.log(response.data);
            $scope.values = response.data;
        }, function(error) {
            console.error(error.message);
        });
    })

.controller('Answer', function($scope, ScoreEntry, ValuesService,$ionicPopup,$state) {
    $scope.compare = function(x, y) {
        if (x === y) {
            ScoreEntry.buttonPress()
            document.getElementsByTagName('result')[0].innerHTML = 'Certo!';

        } else {
            document.getElementsByTagName('result')[0].innerHTML = 'Errado!';
        }
    }
    $scope.encerrar = function()
  {
      var confirmPopup = $ionicPopup.confirm({
        title: 'Fim da partida',
        template: 'Deseja realmente encerrar a partida?'
      });

      confirmPopup.then(function(res)
      {

        if(res)
        {
          $state.go('start.start');
          console.log('Encerrar');
        }
        else
        console.log('Cancelar encerramento');
      })
    }

    $scope.pular = function() {
        document.getElementsByTagName('result')[0].innerHTML = ' ';
    }

    ValuesService.buttonPress().then(function(response) {
        console.log(ValuesService.getPreviousId);
        console.log(response.data);
        $scope.values = response.data;
    })

    $scope.jump = function()
    {
       ValuesService.buttonPress().then(function(response) {
            console.log(ValuesService.getPreviousId);
            console.log(response.data);
            $scope.values = response.data;
        })

    }
})

.controller('HomeCtrl', function($scope, $ionicPopup, $auth, OpenFB) {
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

    $scope.toggleLeft = function() {
        $ionicSideMenuDelegate.toggleLeft();
    };
    $scope.isAuthenticated = function() {
        return $auth.isAuthenticated();
    };

    OpenFB.get('/me').success(function(user) {
        $scope.user = user;
    });
    $scope.GetID = function(id) {
        console.log(id);
    }
})
