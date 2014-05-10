"use strict";

var Pillar = Class.extend({
  init: function(isTopPillar) {
    this.pillarGenerator = new PillarGenerator();
    this.pillars = [];
    this.isTopPillar = isTopPillar;
  },

  stillInRange: function(loc) {
    return !_.any(this.pillars) || _(this.pillars).map(function(p) { return p.offset; }).max() <= this.furthestLocationStillInRange(loc);
  },

  furthestLocationStillInRange: function(loc) {
    return loc + AsciiBirds.windowWidth - AsciiBirds.playerLocationInWindow;
  },

  generateAPillar: function() {
    this.pillars.push(this.pillarGenerator.next(this.isTopPillar));
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
      return pillar.offset > loc - AsciiBirds.playerLocationInWindow && furthest >= pillar.offset; 
    });
  },

  findCollision: function(trajectory) {
    this.generateNearbyPillars(trajectory[0].col);
    
    var pillarsArray = this.pillars;

    var collisions = _(trajectory).where(function(point) { 
      return _(pillarsArray).any(function (p) {
        return point.col === p.offset && point.row >= p.lowestRow && point.row <= p.highestRow;
      });
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

    return _(this.pillars).map(function(p) { return p.offset; }).any(function(loc) {
      return loc >= startColumn && loc <= endColumn;
    });
  },
});