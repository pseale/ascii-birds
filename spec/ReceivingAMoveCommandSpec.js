"use strict";

describe("Receiving a move command", function() {
  it("moves the player 2 columns over", function() {
    var game = new GameController();
    var viewPort = game.createViewPort();
    var firstTopPillar = viewPort.topPillars[0];

    game.move(0);

    var viewPortAfterMove = game.createViewPort();
    var firstTopPillarAfterMove = viewPortAfterMove.topPillars[0];

    expect(firstTopPillarAfterMove.offset).toEqual(firstTopPillar.offset-2);
  });
});