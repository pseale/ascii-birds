"use strict";

describe("Calculating trajectory", function() {
  var viewPort = {};
  beforeEach(function() {
    var game = new Game();
    viewPort = game.createViewPort();
  });

  it("creates a 0 power trajectory as a diagonal downward slope", function() {
    expect(trajectoryExactlyMatches(viewPort, 0, "@..\n"+
                                                 ".x.\n"+
                                                 "..x")).toBeTruthy();
  });

  it("creates a 1 power trajectory as a gentle upward slope", function() {
    expect(trajectoryExactlyMatches(viewPort, 1, "..x\n"+
                                                 "@x.")).toBeTruthy();
  });

  it("creates a 2 power trajectory as a diagonal upward slope", function() {
    expect(trajectoryExactlyMatches(viewPort, 2, "..x\n"+
                                                 ".x.\n"+
                                                 "@..")).toBeTruthy();
  });


  it("creates a 3 power trajectory as a steep, upward slope", function() {
    expect(trajectoryExactlyMatches(viewPort, 3, "..x\n"+
                                                 ".x.\n"+
                                                 ".x.\n"+
                                                 "@..")).toBeTruthy();
  });

  it("creates a 4 power trajectory as a steep, upward slope", function() {
    expect(trajectoryExactlyMatches(viewPort, 4, "..x\n"+
                                                 "..x\n"+
                                                 ".x.\n"+
                                                 ".x.\n"+
                                                 "@..")).toBeTruthy();
  });
});
