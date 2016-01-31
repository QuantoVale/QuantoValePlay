angular.module('callRails', ['ngResource'])

.constant('CALL_RAILS', {
  url: "http://0.0.0.0:3000/contratos/"
})

.factory('ValuesService', ['$http', 'CALL_RAILS', function($http, CALL_RAILS) {
  // the last called id
  var previousId = 0;
  return {
    // calling the function with the new id
    buttonPress: function() {
      previousId += 1;
      return $http.get(CALL_RAILS.url, {
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
