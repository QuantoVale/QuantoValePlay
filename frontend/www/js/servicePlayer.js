angular.module('callPlayer', ['ngResource'])

.constant('CALL_PLAYER', {
  url: "http://0.0.0.0:3000/player/"
})

.factory('PlayerService', ['$http', 'CALL_PLAYER', function($http, CALL_PLAYER) {

  var previousId = 0;

  return {

    buttonPress: function() {
      previousId += 1;
      return $http.get(CALL_PLAYER.url, {
        params: {
          id: previousId
        }
      });
    },
    getPreviousId: function() {
      return previousId;
    },
    resetPreviousId: function() {
      previousId = 0;
    }
  }
}])
