"use strict";

describe("Calculating height", function() {
  var game = {};
  var oldHeight = 0;
  beforeEach(function() {
    game = new Game();
    oldHeight = game.createViewPort().playerLocation.row;
  });

  describe("When 0 power is applied", function() {
    it("drops 2 spaces", function() {
      game.move(0);

      expect(game.createViewPort().playerLocation.row).toEqual(oldHeight+2);
    });
  });

  describe("When 1 power is applied", function() {
    it("lifts 1 space", function() {
      game.move(1);

      expect(game.createViewPort().playerLocation.row).toEqual(oldHeight-1);
    });
  });

  describe("When 2 power is applied", function() {
    it("lifts 2 spaces", function() {
      game.move(2);

      expect(game.createViewPort().playerLocation.row).toEqual(oldHeight-2);
    });
  });

  describe("When 3 power is applied", function() {
    it("lifts 3 spaces", function() {
      game.move(3);

      expect(game.createViewPort().playerLocation.row).toEqual(oldHeight-3);
    });
  });

  describe("When 4 power is applied", function() {
    it("lifts 4 spaces", function() {
      game.move(4);

      expect(game.createViewPort().playerLocation.row).toEqual(oldHeight-4);
    });
  });

  describe("When given bad input", function() {
    describe("When given an invalid integer", function() {
      it("throws an error", function() {
        expect(function() { game.move(-1); })
         .toThrow(new Error("Invalid 'power', expected power 0-4, got: " + -1));
      });
    });

    describe("When given a non-integer", function() {
      it("throws an error", function() {
        expect(function() { game.move("a"); })
         .toThrow(new Error("Invalid 'power', expected power 0-4, got: " + "a"));
      });
    });

    describe("When given null", function() {
      it("throws an error", function() {
        expect(function() { game.move(null); })
         .toThrow(new Error("Invalid 'power', expected power 0-4, got: " + null));
      });
    });
  });
});
