angular.module('starter.controllers', [])
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
