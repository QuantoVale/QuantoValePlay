var app = angular.module('app', [])
   .factory('GreetingService', function () {
      return {
         greeting: function () {
            switch (navigator.language.substr(0, 2)) {
               case 'pt':
                  return 'Olá';
               case 'es':
                  return 'Hola';
               default:
                  return 'Hi';
            }
         }
     }
 });
