describe("Receiving a move command", function() {
  it("moves the player 2 columns over", function() {
    var game = new Game();
    viewPort = game.createViewPort();
    firstTopColumn = viewPort.topColumns[0];

    game.move(0);

    viewPortAfterMove = game.createViewPort();
    firstTopColumnAfterMove = viewPortAfterMove.topColumns[0];

    expect(firstTopColumnAfterMove).toEqual(firstTopColumn-2);
  });
});