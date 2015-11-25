angular.module('starter.controllers', ['callRails', 'Score','ngResource'])
    .controller('AppCtrl', function($scope, $ionicModal, $timeout) {})

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
        .controller("PlayersController",
            function($scope, Players, $http) {
                var url = "http://localhost:3000/player"

                $http.get(url).success(function(data){
                console.log(data);
                    alert("Logado com Sucesso");
                })
                .error(function(erro){
                    alert("Erro ao logar");
                })

                var newVisitor = {
                name: "Pedro",
                idFb: 451,
                score: 100
                };

                $scope.visitors =  newVisitor;

                Players.save(newVisitor);
            })


    .factory("Players", function($resource) {
        return $resource("http://localhost:3000/player",{id: '@id'},{
            index: {
                method: 'GET',
                isArray: true,
                responseType: 'json'
            },
            update: {
                method: 'PUT',
                responseType: 'json'
            }
        });
    })
    .factory("Interation", function($resource) {
        return $resource("http://localhost:3000/player/:id/score/:score",{id: '@id', score: '@score'},{
            save: {
                method: 'GET',
                isArray: true,
                responseType: 'json'
            },
            save: {
                method: 'get',
                responseType: 'json'
            }
        });
    })
        .controller('Answer', function($scope, ScoreEntry, ValuesService, $ionicPopup, $state, $ionicModal, $ionicSideMenuDelegate, $timeout, Interation) {
            $scope.counter = 15;
            var total = 0;

            $scope.jumpa = function(){
            ValuesService.buttonPress().then(function(response) {
                 console.log(ValuesService.getPreviousId);
                 console.log(response.data);
                 $scope.values = response.data;
                 $score.counter = 15;
             })
           }

            $scope.onTimeout = function(){
              $scope.counter--;
              if ($scope.counter > 0) {
                  mytimeout = $timeout($scope.onTimeout,1000);
              }
              else {
                var confirmPopup = $ionicPopup.confirm({
                  title: 'Seu tempo Acabou!',
                  template: 'Deseja uma proxima questão ?'
                });
                confirmPopup.then(function(res){
                  if(res){
                    $scope.counter = 15;
                    $scope.jumpa();
                    $scope.onTimeout();
                }
                  else
                  console.log('Cancelar encerramento');
                })
              }
            }
            $scope.reset= function(){
              $scope.counter = 15;
              $scope.onTimeout();
            }

            $scope.end = function(){
              if (total == 9){
                $state.go('endgame.endgame');
                console.log("Fim da rodada");
              }else
               console.log("Questões restantes = "+(total));
             }

            $scope.compare = function(x, y, id) {
                var size = document.getElementsByTagName('span').length;
                if (x === y) {
                    document.getElementsByTagName('span')[id].style.backgroundColor = "#33cd5f";
                    document.getElementsByTagName('span')[id].style.boxShadow = "0 8px 0 #28a54c";

                    var answer = ScoreEntry.getTrue();
                    total = ScoreEntry.getAnswer();

                     console.log("Total = " + total);

                     $scope.certa = function(){
                         return true;
                     }
                     var player = {
                         id: 2,
                         score: 10
                     }
                     Interation.save(player);
                } else {
                    document.getElementsByTagName('span')[id].style.boxShadow = "0 8px 0 #e42012";
                    document.getElementsByTagName('span')[id].style.backgroundColor = "#ef473a";

                     total = ScoreEntry.getAnswer();

                    console.log("Total = " + total);

                    $scope.certa = function(){
                      return false;
                    }

                    answer = ScoreEntry.getTrue();

                    if ( answer > 1 ){
                        ScoreEntry.resetTrue();
                        addScore(answer);
                    }

                }
            }

            $scope.clean = function() {
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
            $scope.encerrar = function(){
              var confirmPopup = $ionicPopup.confirm({
                title: 'Fim da partida',
                template: 'Deseja realmente encerrar a partida?'
              });

              confirmPopup.then(function(res){

                if(res){
                  $state.go('endgame.endgame');
                  console.log('Encerrar');
                }
                else
                console.log('Cancelar encerramento');
              })
            }

            $scope.pular = function(){
                document.getElementsByTagName('result')[0].innerHTML = ' ';
            }

            ValuesService.buttonPress().then(function(response) {
                console.log(ValuesService.getPreviousId);
                console.log(response.data);
                $scope.values = response.data;
            })

            $scope.jump = function(){
               ValuesService.buttonPress().then(function(response) {
                    console.log(ValuesService.getPreviousId);
                    console.log(response.data);
                    $scope.values = response.data;
                    $scope.counter = 15;
                    $scope.timeout();
                })
            }
        })

    .controller('HomeCtrl', function($scope, $ionicPopup, $auth, OpenFB, $ionicSideMenuDelegate, Players) {

        $scope.add =function(){
        var newPlayer = {
          name: $scope.user.name,
          idFb: $scope.user.id,
          score: $scope.user.score
        };

        console.log(newPlayer);
        Players.save(newPlayer);
      }


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

        $scope.toggleLeft = function() {
            $ionicSideMenuDelegate.toggleLeft();
        };

        $scope.logout = function() {
            $auth.logout();
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
