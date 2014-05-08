"use strict";

var Pillar = Class.extend({
  init: function() {
    this.pillarGenerator = new PillarGenerator();
    this.pillars = [];
  },

  stillInRange: function(loc) {
    return _.max(this.pillars) <= this.furthestLocationStillInRange(loc)
  },

  furthestLocationStillInRange: function(loc) {
    return loc + AsciiBirds.windowWidth - AsciiBirds.playerLocationInWindow;
  },

  generateAPillar: function() {
    this.pillars.push(this.pillarGenerator.next());
  },

  generateNearbyPillars: function(loc) {
    while (this.stillInRange(loc)) {
      this.generateAPillar();
    }
  },

  findAllNearby: function(loc) {
    this.generateNearbyPillars(loc);

    var furthest = this.furthestLocationStillInRange(loc);
    return _.filter(this.pillars, function(pillar) {
      return pillar > loc - AsciiBirds.playerLocationInWindow && furthest >= pillar; 
    });
  },

  findCollision: function(trajectory, minRow, maxRow) {
    this.generateNearbyPillars(trajectory[0].col);
    
    var pillarsArray = this.pillars;
    var collisions = [];

    _.each(trajectory, function(point) { 
      if (_.contains(pillarsArray, point.col) && minRow <= point.row && point.row <= maxRow) {
        collisions.push({
          collided: true, 
          point: point,
        });
      }
    });

    if (collisions.length > 0) {
      return collisions[0];
    }

    return { collided: false, };
  },

  crossedBy: function(trajectory) {
    var startColumn = trajectory[0].col;
    var endColumn = trajectory[trajectory.length-1].col;

    return _.any(this.pillars, function(loc) {
      return loc >= startColumn && loc <= endColumn;
    });
  },
});