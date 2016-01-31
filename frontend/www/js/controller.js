angular.module('starter.controllers', ['callRails', 'Score', 'ngResource', 'openfb'])
    .controller('AppCtrl', function($scope, $ionicModal, $timeout) {})

    .controller("RankingController",
        function($scope, $http) {
            var url = "http://localhost:3000/player/ranking";
            $http.get(url).success(function(data) {
                console.log(data);
                $scope.players = data;
            }).error(function(error) {
                console.log("Server side error");
            });
        })

    .controller("PlayersController",
        function($scope, Players, $http) {
            var url = "http://localhost:3000/player"

            $http.get(url).success(function(data) {
                    console.log(data);
                    alert("Logado com Sucesso");
                })
                .error(function(erro) {
                    alert("Erro ao logar");
                })

            var newVisitor = {
                name: "Pedro",
                idFb: 451,
                score: 100
            };

            $scope.visitors = newVisitor;

            Players.save(newVisitor);
        })

    .factory("Players", function($resource) {
            return $resource("http://localhost:3000/player", {
                id: '@id'
            }, {
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
            return $resource("http://localhost:3000/player/:id/score/:score", {
                id: '@id',
                score: '@score'
            }, {
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
            var scoreTotal = 0;
             var mytimeout;

            $scope.start = function() {
                $scope.counter = 15;
                $scope.onTimeout();
                var score = ScoreEntry.resetScore();
                var answerTrue = ScoreEntry.resetTrue();
                var answer = ScoreEntry.resetAnswer();
                var pular = ScoreEntry.jumpReset();
                console.log("Score = ", +score);
                console.log("answerTrue = ", +answerTrue);
                console.log("answer = ", +answer);
                $scope.buttons = {
                    label: score
                };
            }
            $scope.jumpa = function() {
                pular = ScoreEntry.jump();
                if ( pular <= 3 ){
                    ValuesService.buttonPress().then(function(response) {
                        console.log(ValuesService.getPreviousId);
                        console.log(response.data);
                        $scope.values = response.data;
                        $scope.counter = 15;
                    })
                }
                else {
                    var confirmPopup = $ionicPopup.confirm({
                        title: 'Você atingiu o limite máximo!',
                    });
                }
            }

            $scope.onTimeout = function() {
                $scope.counter--;
                if ($scope.counter > 0) {
                    mytimeout = $timeout($scope.onTimeout, 1000);
                } else {
                    var confirmPopup = $ionicPopup.confirm({
                        title: 'Seu tempo Acabou!',
                        template: 'Deseja uma proxima questão ?'
                    });
                    confirmPopup.then(function(res) {
                        if (res) {
                            $scope.counter = 15;
                            $scope.jump();
                            $scope.onTimeout();
                        } else
                            console.log('Cancelar encerramento');
                    })
                }
            }

            $scope.reset = function() {
                $scope.counter = 15;
                $scope.onTimeout();
            }

            $scope.compare = function(x, y, id) {

                var size = document.getElementsByTagName('span').length;
                if (x === y) {
                    document.getElementsByTagName('span')[id].innerHTML = "Certo!";
                    document.getElementsByTagName('span')[id].style.backgroundColor = "#33cd5f";
                    document.getElementsByTagName('span')[id].style.boxShadow = "0 8px 0 #28a54c";
                    var size = document.getElementsByTagName('li').length;
                    for (var i = 0; i < size; i++) {
                        document.getElementsByTagName('li')[i].style.pointerEvents = "none";
                    }

                    $scope.certa = function() {
                        return true;
                    }

                    answer = ScoreEntry.getTrue();
                    var points;

                    if (answer < 3) {
                        score = ScoreEntry.getBonus();
                        points = 50;
                    } else if (answer >= 3 && answer < 6) {
                        score = ScoreEntry.getBonus2();
                        points = 100;
                    } else if (answer >= 6 && answer < 9) {
                        score = ScoreEntry.getBonus4();
                        points = 200;
                    } else {
                        score = ScoreEntry.getBonus8();
                        points = 400;
                    }

                    scoreTotal = ScoreEntry.getScoreTotal();

                    $scope.buttonsT = {
                        teste: points
                    };

                    $scope.buttons = {
                        label: score
                    };

                    console.log("Total = " + total);

                    var player = {
                        id: $scope.user.id,
                        score: 10
                    }

                        Interation.save(player);

                } else {
                    document.getElementsByTagName('span')[id].innerHTML = "Errado!";
                    document.getElementsByTagName('span')[id].style.boxShadow = "0 8px 0 #e42012";
                    document.getElementsByTagName('span')[id].style.backgroundColor = "#ef473a";
                    var size = document.getElementsByTagName('li').length;
                    for (var i = 0; i < size; i++) {
                        document.getElementsByTagName('li')[i].style.pointerEvents = "none";
                    }
                    $scope.certa = function() {
                        return false;
                    }

                    console.log("Total = " + total);

                    answer = ScoreEntry.getAnswerTrue();
                    score = ScoreEntry.getScore();
                    points = 0;
                    scoreTotal = ScoreEntry.getScoreTotal();

                    $scope.buttonsT = {
                        teste: points
                    };


                    $scope.buttons = {
                        label: score
                    };

                    if (answer >= 1) {
                        ScoreEntry.resetTrue();
                        addScore(answer);
                    }

                }
            }

            $scope.clean = function() {
                var size = document.getElementsByTagName('span').length;
                for (var i = 0; i < size; i++) {
                    document.getElementsByTagName('span')[i].style.backgroundColor = "#1E90FF";
                    document.getElementsByTagName('span')[i].style.boxShadow = "0 8px 0 #4169E1";
                }
                var size = document.getElementsByTagName('li').length;
                for (var i = 0; i < size; i++) {
                    document.getElementsByTagName('li')[i].style.pointerEvents = "auto";
                }

            }
            $ionicModal.fromTemplateUrl('templates/answered.html', function($ionicModal) {
                $scope.modal = $ionicModal;
                console.log($scope.modal);
            }, {
                scope: $scope,
                animation: 'jelly',
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
            $scope.encerrar = function() {
                var confirmPopup = $ionicPopup.confirm({
                    title: 'Fim da partida',
                    template: 'Deseja realmente encerrar a partida?'
                });

                confirmPopup.then(function(res) {

                    if (res) {
                        score = ScoreEntry.resetScore();
                        answerTrue = ScoreEntry.resetTrue();
                        answer = ScoreEntry.resetAnswer();

                        $scope.buttons = {
                            label: score
                        };

                        $state.go('app.endgame');
                        console.log('Encerrar');

                    } else
                        console.log('Cancelar encerramento');
                })
            }

            $scope.end = function() {
                scoreTotal = ScoreEntry.getScoreTotal1();
                $scope.buttonsA = {
                    score: scoreTotal
                };
                return true;
            }

            $scope.pular = function() {
                document.getElementsByTagName('result')[0].innerHTML = ' ';
            }

            ValuesService.buttonPress().then(function(response) {
                console.log(ValuesService.getPreviousId);
                console.log(response.data);
                $scope.values = response.data;
            })

            $scope.jump = function() {

                ValuesService.buttonPress().then(function(response) {
                    console.log(ValuesService.getPreviousId);
                    console.log(response.data);
                    $scope.values = response.data;
                    $scope.counter = 15;
                    $scope.timeout();
                })

                  total = ScoreEntry.getAnswer();

                  if (total == 10){
                    $state.go('app.endgame');
                    console.log("Fim da rodada");
                    score = ScoreEntry.resetScore();
                    answerTrue = ScoreEntry.resetTrue();
                    answer = ScoreEntry.resetAnswer();
                    $scope.buttons = {
                        label: score
                    };

                  }else{
                    console.log("Questões restantes = "+(total));
                  }
            }
        })

    .controller('HomeCtrl', function($scope, $state, $ionicPopup, OpenFB, $ionicSideMenuDelegate, Players) {

        $scope.add = function() {
            var newPlayer = {
            name: $scope.user.name,
            idFb: $scope.user.id,
            score: $scope.user.score
        };

            console.log(newPlayer);
            Players.save(newPlayer);
    }


        $scope.hasData = function() {
            return false;
        }

        $scope.facebookLogin = function() {

            OpenFB.login('public_profile', 'email', 'user_friends', 'user_birthday', 'publish_actions').then(
                function() {
                    $state.go('app.start');
                },
                function() {
                    $ionicPopup.alert({
                        title: 'Autenticação falhou',
                        content: response.data ? response.data || response.data.message : response
                    })
                });
        };


        $scope.logout = function() {
            OpenFB.logout();
            $state.go('app.home');
        };

        $scope.add = function() {
            var newPlayer = {
                name: $scope.user.name,
                idFb: $scope.user.id,
                score: $scope.user.score
            };

            console.log(newPlayer);
            Players.save(newPlayer);
        }

        $scope.toggleLeft = function() {
            $ionicSideMenuDelegate.toggleLeft();
        };

        OpenFB.get('/me').success(function(user) {
            $scope.user = user;
            console.log(user);
        });
    })
