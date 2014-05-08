"use strict";

describe("Generating pillars", function() {
  var pillarGenerator = {};

  beforeEach(function() {
    pillarGenerator = new PillarGenerator();
  });

  it("generates the first pillar between position 7 and 10", function() {
    var pillar = pillarGenerator.next();
    expect(pillar >= 7 && pillar <= 10 ).toBeTruthy();
  });

  it("generates subsequent pillars from 7 to 10 columns away", function() {
    var firstPillar = pillarGenerator.next();
    var secondPillar = pillarGenerator.next();
    var offset = secondPillar - firstPillar;
    expect(offset >= 7 && offset <= 10).toBeTruthy();
  });
});