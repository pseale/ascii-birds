"use strict";

var Pillar = Class.extend({
  init: function() {
    this.pillarGenerator = new PillarGenerator();
    this.pillars = [];
  },

  stillInRange: function(loc) {
    return !_.any(this.pillars) || _.max(this.pillars) <= this.furthestLocationStillInRange(loc);
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

    var collisions = _(trajectory).where(function(point) { 
      return _.contains(pillarsArray, point.col) && minRow <= point.row && point.row <= maxRow; 
    })
      .map(function(point) {
        return {
          collided: true, 
          point: point,
        }; 
      })
      .value();

    if (_.any(collisions)) {
      return _.first(collisions);
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