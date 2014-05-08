"use strict";

describe("Keeping score", function() {
  describe("Moving but not crossing or reaching a pillar", function() {
    var viewPort = {};
    beforeEach(function() {
      var game = ObjectMother.createGameWithHardcodedTopPillars([50]);
      game.move(1);
      viewPort = game.createViewPort();
    });

    it("awards no points", function() {
      expect(viewPort.score).toEqual(0);
    });

    it("indicates we have not just scored", function() {
      expect(viewPort.justScored).toBeFalsy();
    });
  });

  describe("Moving immediately under a pillar without colliding", function() {
    var game = {};
    var viewPort = {};
    beforeEach(function() {
      game = ObjectMother.createGameWithHardcodedTopPillars([4]);
      game.move(1);

      game.move(0); //this move should move us to a spot immediately underneath the pillar
      viewPort = game.createViewPort();
    });

    it("awards a point", function() {
      expect(viewPort.score).toEqual(1);
    });

    it("indicates we just scored", function() {
      expect(viewPort.justScored).toBeTruthy();
    });
  });

  describe("Moving past a pillar without colliding", function() {
    var game = {};
    var viewPort = {};
    beforeEach(function() {
      game = ObjectMother.createGameWithHardcodedTopPillars([3]);
      game.move(0);

      game.move(0); //this move should move us to a spot below and to the right of the pillar
      viewPort = game.createViewPort();
    });

    
    it("awards a point", function() {
      expect(viewPort.score).toEqual(1);
    });

    it("indicates we just scored", function() {
      expect(viewPort.justScored).toBeTruthy();
    });
  });

  describe("Moving past both top and bottom pillars in one move", function() {
    var game = {};
    var viewPort = {};
    beforeEach(function() {
      game = ObjectMother.createGameWithHardcodedPillars([4], [4]);
      game.move(1);

      game.move(0); //this move should move us to a spot immediately underneath/above the pillars
      viewPort = game.createViewPort();
    });

    it("awards two points", function() {
      expect(viewPort.score).toEqual(2);
    });

    it("indicates we just scored", function() {
      expect(viewPort.justScored).toBeTruthy();
    });
  });
});
