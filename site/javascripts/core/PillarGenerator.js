"use strict";

var PillarGenerator = Class.extend({
  init: function() {
    this.offset = 0;
  },

  next: function() {
    this.offset += _.random(AsciiBirds.pillarDistanceMin, AsciiBirds.pillarDistanceMax);

    return this.offset;
  },
});