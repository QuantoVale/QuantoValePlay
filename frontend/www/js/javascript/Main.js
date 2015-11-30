var app = angular.module('app', []);


app.controller('NavCtrl', function($scope, $location) {
    $scope.isActive = function(route) {
        return route === $location.path();
    };
})
