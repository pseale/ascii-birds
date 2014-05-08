"use strict";

describe("Keeping score", function() {
  describe("Moving but not crossing or reaching a pillar", function() {
    var game = {};
    beforeEach(function() {
      game = ObjectMother.createGameWithHardcodedTopPillars([50]);
      game.move(1);
    });

    it("awards no points", function() {
      expect(game.createViewPort().score).toEqual(0);
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
  });
});
