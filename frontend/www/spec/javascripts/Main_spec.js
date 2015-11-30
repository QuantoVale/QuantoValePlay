//Controller1 dentro do arquivo
describe('NavCtrl', function() {

    beforeEach(inject(function ($rootScope, $controller) {
      }));
    it('TestController2', function() {
    });
});

//Controller2 dentro do arquivo

describe('Nav', function() {
   var example, controller;

    beforeEach(inject(function ($rootScope, $controller) {
      scope = $rootScope.$new();
    //      example = new Nav();

      }));

      it('deve definir myName como Paulo Henrique',
      inject(function ($controller) {

           expect(scope.myName).toEqual('PauloHenrique');
         }));
});
