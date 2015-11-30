describe('NavCtrl', function() {
    var scope, $location, createController;

    beforeEach(inject(function ($rootScope, $controller,$location ) {
        $location = $location;
        scope = $rootScope.$new();

        createController = function() {
            return $controller('NavCtrl', {
                '$scope': scope
            });
        };
    }));

    it('should have a method to check if the path is active', function() {
        var controller = createController();
        $location.path('/about');
        expect($location.path()).toBe('/about');
        expect(scope.isActive('/about')).toBe(true);
        expect(scope.isActive('/contact')).toBe(false);
    });
});
