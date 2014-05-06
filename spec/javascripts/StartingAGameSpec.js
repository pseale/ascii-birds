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

  it("has a row of top-side columns", function() {
    expect(viewPort.topColumns.length > 0).toBeTruthy(); //improve once we "randomly" generate columns
  });

  it("has a row of bottom-side columns", function() {
    expect(viewPort.bottomColumns.length > 0).toBeTruthy(); //improve once we "randomly" generate columns
  });
});