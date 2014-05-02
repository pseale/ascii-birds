describe("Starting a new game", function() {
  var viewPort = {};

  beforeEach(function() {
    var game = new Game();
    viewPort = game.createViewPort();
  });

  it("starts the player at height 6", function() {
    expect(viewPort.playerHeight).toEqual(6); //6th row, array offset 5
  });

  it("has a row of top-side columns", function() {
    expect(viewPort.topColumns.length).toEqual(3); //improve once we "randomly" generate columns
  });

  it("has a row of bottom-side columns", function() {
    expect(viewPort.bottomColumns.length).toEqual(3); //improve once we "randomly" generate columns
  });
});