describe("Example", function(){
  var example;

  beforeEach(function() {
    example = new Example();
  })

  it("returns 'bar'", function() {
    expect(example.foo()).toEqual("bar");
  })

  // Este teste está propositalmente comentado
  // para que o coverage não acuse 100% de cobertura.
  //
 it("returns 'foo'", function() {
    expect(example.bar()).toEqual("foo");
   })

});
