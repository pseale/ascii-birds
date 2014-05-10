"use strict";

describe("Generating pillars", function() {
  var pillarGenerator = {};

  beforeEach(function() {
    pillarGenerator = new PillarGenerator();
  });

  it("generates the first pillar between position 7 and 10", function() {
    var pillar = pillarGenerator.next(true);
    expect(pillar.offset >= 7 && pillar.offset <= 10 ).toBeTruthy();
  });

  it("generates subsequent pillars from 7 to 10 columns away", function() {
    var firstPillar = pillarGenerator.next(true);
    var secondPillar = pillarGenerator.next(true);
    var offset = secondPillar.offset - firstPillar.offset;
    expect(offset >= 7 && offset <= 10).toBeTruthy();
  });

  it("generates pillars from 2 to 4 rows high", function() {
    var pillar = pillarGenerator.next(true);
    var height = pillar.highestRow - pillar.lowestRow + 1;
    expect(height >= 2 && height <= 4).toBeTruthy();
  });
});