"use strict";

describe("Colliding with a pillar", function() {
  describe("Colliding with a top pillar", function() {
    var game = {};
    var oldViewPort = {};
    beforeEach(function() {
      game = ObjectMother.createGameWithHardcodedTopPillars([2]);

      oldViewPort = game.createViewPort(); //awful, do this to modify the lazy pillar data
      game.move(4);
    });

    it("tells us we collided", function() {
      var viewPort = game.createViewPort();
      expect(viewPort.collided).toBeTruthy();      
    });

    it("moves our player to the collision", function() {
      var viewPort = game.createViewPort();
      expect(viewPort.playerLocation.row).toEqual(oldViewPort.playerLocation.row - 3);    
      expect(viewPort.playerLocation.col).toEqual(oldViewPort.playerLocation.col + 2);    
    });

    it("tells us the game is over", function() {
      var viewPort = game.createViewPort();
      expect(viewPort.gameOver).toBeTruthy(); //fixme this is awful     
    });

    it("disables any further commands", function() {
      expect(function() { game.move(0); }).toThrow(new Error("Game over, cannot perform any action."));
    });

    it("awards no points", function() {
      var viewPort = game.createViewPort();
      expect(viewPort.score).toEqual(0); 
    });
  });
});
