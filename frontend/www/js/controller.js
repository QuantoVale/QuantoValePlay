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
