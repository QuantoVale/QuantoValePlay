describe('mainCtrl', function () {
   beforeEach(module('app'));

   it('deve definir myName como Paulo Henrique', inject(function ($controller) {
      var scope = {};
      var ctrl = $controller('mainCtrl', { $scope: scope });

      expect(scope.myName).toBe('Paulo Henrique');
   }));

   it('deve definir greeting como Hola, Paulo Henrique', inject(function ($controller) {
      var greetServiceMock = {
         greeting : function() {
            return 'Hola';
         }
      }

      var scope = {};
      var ctrl = $controller('mainCtrl', { $scope: scope, GreetingService: greetServiceMock });

      expect(scope.greetings).toBe('Hola, Paulo Henrique');
    }));







});
