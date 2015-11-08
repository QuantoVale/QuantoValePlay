.module('playerCenter', ['ngResource']);

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
