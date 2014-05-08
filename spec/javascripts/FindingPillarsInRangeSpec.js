"use strict";

describe("Finding pillars in range", function() {
  var pillar = {};

  beforeEach(function() {
    pillar = new Pillar();
    pillar.pillarGenerator = new HardcodedPillarGenerator([10-2, 10-1, 10, 10+18, 10+19 ]);
  });

  it("excludes any pillar 2 spaces behind the player", function() {
    var pillarsInRange = pillar.findAllNearby(10); 
    expect(pillar.findAllNearby(10)).not.toContain(10-2);
  });

  it("includes any pillar 1 space behind the player", function() {
    var pillarsInRange = pillar.findAllNearby(10); 
    expect(pillar.findAllNearby(10)).toContain(10-1);
  });

  it("includes any pillar in the same space as the player", function() {
    var pillarsInRange = pillar.findAllNearby(10); 
    expect(pillar.findAllNearby(10)).toContain(10);
  });

  it("includes any pillar in front of the player within range", function() {
    var pillarsInRange = pillar.findAllNearby(10+18); 
    expect(pillar.findAllNearby(10)).toContain(10+18);
  });

  it("excludes any pillar
   in front of the player beyond visible range", function() {
    var pillarsInRange = pillar.findAllNearby(10+19); 
    expect(pillar.findAllNearby(10)).not.toContain(10+19);
  });
});