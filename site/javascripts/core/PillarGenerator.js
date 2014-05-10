"use strict";

var PillarGenerator = Class.extend({
  init: function() {
    this.offset = 0;
  },

  getLowestRow: function(height, isTopPillar) {
    //top pillars count from 0 upwards
    //bottom pillars count from 9 downwards
    if (isTopPillar) {
      return 0;
    } else {
      return 9 - height + 1;
    }
  },

  getHighestRow: function(height, isTopPillar) {
    //top pillars count from 0 upwards
    //bottom pillars count from 9 downwards
    if (isTopPillar) {
      return 0 + height - 1;
    } else {
      return 9;
    }
  },

  next: function(isTopPillar) {
    this.offset += _.random(AsciiBirds.pillarDistanceMin, AsciiBirds.pillarDistanceMax);
    var height = _.random(AsciiBirds.pillarHeightMin, AsciiBirds.pillarHeightMax);

    return {
      offset: this.offset,
      lowestRow: this.getLowestRow(height, isTopPillar),
      highestRow: this.getHighestRow(height, isTopPillar),
    };
  },
});