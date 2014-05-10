"use strict";

describe("Finding pillars in range", function() {
  var pillarsInRange = {};

  beforeEach(function() {
    var pillar = new Pillar();
    pillar.pillarGenerator = new HardcodedPillarGenerator([10-2, 10-1, 10, 10+18, 10+19 ]);
    pillarsInRange = _.map(pillar.findAllNearby(10), function(p) { return p.offset; }); 
  });

  it("excludes any pillar 2 spaces behind the player", function() {
    expect(pillarsInRange).not.toContain(10-2);
  });

  it("includes any pillar 1 space behind the player", function() {
    expect(pillarsInRange).toContain(10-1);
  });

  it("includes any pillar in the same space as the player", function() {
    expect(pillarsInRange).toContain(10);
  });

  it("includes any pillar in front of the player within range", function() {
    expect(pillarsInRange).toContain(10+18);
  });

  it("excludes any pillar in front of the player beyond visible range", function() {
    expect(pillarsInRange).not.toContain(10+19);
  });
});