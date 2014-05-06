"use strict";

describe("Receiving a move command", function() {
  it("moves the player 2 columns over", function() {
    var game = new GameController();
    var viewPort = game.createViewPort();
    var firstTopColumn = viewPort.topColumns[0];

    game.move(0);

    var viewPortAfterMove = game.createViewPort();
    var firstTopColumnAfterMove = viewPortAfterMove.topColumns[0];

    expect(firstTopColumnAfterMove).toEqual(firstTopColumn-2);
  });
});