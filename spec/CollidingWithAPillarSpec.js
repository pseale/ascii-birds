"use strict";

describe("Colliding with a pillar", function() {
  describe("Colliding with a top pillar", function() {
    var game = {};
    var oldViewPort = {};
    var viewPort = {};

    beforeEach(function() {
      game = ObjectMother.createGameWithHardcodedTopPillars([2]);

      oldViewPort = game.createViewPort();
      game.move(4);
      viewPort = game.createViewPort();
    });

    it("tells us we collided", function() {
      expect(viewPort.collided).toBeTruthy();      
    });

    it("moves our player to the collision", function() {
      expect(viewPort.playerLocation.row).toEqual(oldViewPort.playerLocation.row - 3);    
      expect(viewPort.playerLocation.col).toEqual(oldViewPort.playerLocation.col + 2);    
    });

    it("tells us the game is over", function() {
      expect(viewPort.gameOver).toBeTruthy();
    });

    it("disables any further commands", function() {
      expect(function() { game.move(0); }).toThrow(new Error("Game over, cannot perform any action."));
    });

    it("awards no points", function() {
      expect(viewPort.score).toEqual(0); 
    });
  });
});
