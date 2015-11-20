.module('playerCenter', ['ngResource']);

.service('PlayerService', function() {

    var setPlayer = function(user_data) {
        window.localStorage.starter_facebook_user = JSON.stringify(user_data);
    };

    var getPlayer = function(){
        return JSON.parse(window.localStorage.starter_facebook_user || '{}');
    };

    return {
        getUser: getUser,
        setUser: setUser
    };
});

.factory('PlayerData',
    function($resource){
        return $resource("player/:id",{ id: '@id'}, {
            index: {
                method: 'GET',
                isArray: true,
                rensponseType: 'json'
            },
            update: {
                method: 'POST',
                rensponseType: 'json'
            }
        });
    })

.controller('playerCtrl', function ($scope, PlayerData) {
    $scope.player = PlayerData.index()

    $scope.addPlayer = function() {
        player = PlayerData.save($scope.newPlayer)

        $scope.visitors.push(player)
        $scope.newPlayer() = {}
    }
})
