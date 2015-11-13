angular.module('starter.controllers', [])

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
