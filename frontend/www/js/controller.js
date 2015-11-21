MyApp.controller('HomeCtrl', function($scope, $ionicPopup, $auth, OpenFB, $ionicSideMenuDelegate, Players) {

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

    .controller('LeaderboardCtrl', function($scope, PlayerService) {
        PlayerService.buttonPress().then(function(response) {
             console.log(ValuesService.getPreviousId);
             console.log(response.data);
             $scope.players = response.data;
         })
        $scope.nextPlayer = function(){
           PlayerService.buttonPress().then(function(response) {
                console.log(PlayerService.getPreviousId);
                console.log(response.data);
                $scope.players = response.data;
            })
        }
    })

    .controller('AndroidLoginCtrl',
        function($scope, $state, $q, PlayerService, $ionicLoading) {

            var fbLoginSuccess = function(response) {
                if (!response.authResponse){
                    fbLoginError("Sem resposta");
                    return;
                }

                var authResponse = response.authResponse;

                getFacebookProfileInfo(authResponse)
                .then(function(profileInfo) {

                    PlayerService.setPlayer({
                        authResponse: authResponse,
                        userID: profileInfo.id,
                        name: profileInfo.name,
                        email: profileInfo.email,
                        picture : "http://graph.facebook.com/"
                        + authResponse.userID + "/picture?type=large"
                    });

                    $ionicLoading.hide();
                    $state.go('start.start');

                }, function(fail){
                    console.log('Informação de login falhou', fail);
                });
            };

            var fbLoginError = function(error){
                console.log('fbLoginError', error);
                $ionicLoading.hide();
            };


            var getFacebookProfileInfo = function (authResponse) {
                var info = $q.defer();

                facebookConnectPlugin.api('/me?fields=email,name&access_token='
                + authResponse.accessToken, null,
                function (response) {
            		console.log(response);
                    info.resolve(response);
                },
                function (response) {
            		console.log(response);
                    info.reject(response);
                });

                return info.promise;
            };


            $scope.facebookSignIn = function() {

                facebookConnectPlugin.getLoginStatus(function(success){
                    if(success.status === 'connected'){
                        console.log('getLoginStatus', success.status);

                        var user = PlayerService.getPlayer('facebook');

                        if(!user.userID){
                            getFacebookProfileInfo(success.authResponse)
                            .then(function(profileInfo) {

                                PlayerService.setPlayer({
                                    authResponse: success.authResponse,
                                    userID: profileInfo.id,
                                    name: profileInfo.name,
                                    email: profileInfo.email,
                                    picture : "http://graph.facebook.com/"
                                    + success.authResponse.userID
                                    + "/picture?type=large"
                                });

                                $state.go('start.start');

                            }, function(fail){
                                console.log('Informação de login falhou', fail);
                            });
                        }else{
                            $state.go('start.start');
                        }

                    } else {
                        console.log('Status do login: ', success.status);

                        $ionicLoading.show({
                            template: 'Logando...'
                        });

                        facebookConnectPlugin.login(['email', 'public_profile'],
                        fbLoginSuccess, fbLoginError);
                    }
                });
            };
        })
