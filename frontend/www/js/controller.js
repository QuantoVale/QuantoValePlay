angular.module('starter.controllers', ['callRails'])
    .controller('AppCtrl', function($scope, $ionicModal, $timeout) {})

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



.controller('JumpQuestion',function($scope, $http, ValuesService){

  ValuesService.buttonPress().then(function(response){
      console.log(ValuesService.getPreviousId);
      console.log(response.data);
      $scope.values = response.data;
  })

<<<<<<< HEAD
  $scope.jump = function(){

      ValuesService.buttonPress().then(function(response){
          console.log(ValuesService.getPreviousId);
          console.log(response.data);
          $scope.values = response.data;
    })
  }
})
=======
.controller('Answer',
    function($scope, $ionicModal) {
        $scope.compare = function(x, y, id) {
            var size = document.getElementsByTagName('span').length;

            if (x === y) {
                document.getElementsByTagName('span')[id].style.backgroundColor = "#33cd5f";
                document.getElementsByTagName('span')[id].style.boxShadow = "0 8px 0 #28a54c";
                document.getElementsByTagName('result')[0].innerHTML = 'Certo!';
            } else {
                document.getElementsByTagName('span')[id].style.boxShadow = "0 8px 0 #e42012";
                document.getElementsByTagName('span')[id].style.backgroundColor = "#ef473a";
                document.getElementsByTagName('result')[0].innerHTML = 'Errado!';
            }
            var size = document.getElementsByTagName('li').length;
            for(var i=0;i<size;i++){
                document.getElementsByTagName('li')[i].style.pointerEvents = "none";
            }
        }

        $scope.pular = function() {
            var size = document.getElementsByTagName('span').length;
            for(var i=0;i<size;i++){
                document.getElementsByTagName('span')[i].style.backgroundColor = "#1E90FF";
                document.getElementsByTagName('span')[i].style.boxShadow = "0 8px 0 #4169E1";
            }
            var size = document.getElementsByTagName('li').length;
            for(var i=0;i<size;i++){
                document.getElementsByTagName('li')[i].style.pointerEvents = "auto";
            }
            document.getElementsByTagName('result')[0].innerHTML = ' ';
        }
        // Load the modal from the given template URL
        $ionicModal.fromTemplateUrl('templates/answered.html', function($ionicModal) {
            $scope.modal = $ionicModal;
            console.log($scope.modal);
        }, {
            scope: $scope,
            animation: 'slide-in-up',
            backdropClickToClose: false,
            hardwareBackButtonClose: false,
            focusFirstInput: true
        });
        $scope.openModal = function() {
            $scope.modal.show();
        };
        $scope.closeModal = function() {
            $scope.modal.hide();
        };
    })
.controller('Exit',
function($scope,$ionicPopup,$state) {
  $scope.encerrar = function()
  {
    var confirmPopup = $ionicPopup.confirm({
      title: 'Fim da partida',
      template: 'Deseja realmente encerrar a partida?'
    });


.controller('valuesController',function($scope, $http, ValuesService)

{
  ValuesService.buttonPress().then(function(response) {
  console.log(ValuesService.getPreviousId);
  console.log(response.data);
  $scope.values = response.data;
}, function(error) {
  console.error(error.message);
});
  })

.controller('Answer',
    function($scope) {
        $scope.compare = function(x, y) {
            if (x === y) {
                document.getElementsByTagName('result')[0].innerHTML = 'Certo!';
            } else {
                document.getElementsByTagName('result')[0].innerHTML = 'Errado!';
            }
        }
        document.getElementsByTagName('result')[0].innerHTML = ' ';

        $scope.pular = function() {
            document.getElementsByTagName('result')[0].innerHTML = ' ';
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
