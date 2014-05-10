"use strict";

describe("Starting a new game", function() {
  var viewPort = {};

  beforeEach(function() {
    var game = new GameController();
    viewPort = game.createViewPort();
  });

  it("starts the player at height 6", function() {
    expect(viewPort.playerLocation.row).toEqual(4); //6th row, array offset 5
  });

  it("has a row of top-side pillars", function() {
    expect(_.any(viewPort.topPillars)).toBeTruthy(); //improve once we "randomly" generate columns
  });

  it("has a row of bottom-side pillars", function() {
    expect(_.any(viewPort.bottomPillars)).toBeTruthy(); //improve once we "randomly" generate columns
  });
});