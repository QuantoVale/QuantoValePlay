'use strict';

var app = angular.module('Application', ['ngResource']);

app.factory('UserFactory', function($resource){
    return $resource('Users/users.json')
});

app.controller('MainCtrl', function($scope, UserFactory) {
    $scope.text = 'Bosta';
    $scope.users = UserFactory.get();
});
