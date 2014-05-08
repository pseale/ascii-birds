"use strict";

var Column = Class.extend({
  init: function() {
    this.columnGenerator = new ColumnGenerator();
    this.columns = [];
  },

  stillInRange: function(loc) {
    return _.max(this.columns) <= this.furthestLocationStillInRange(loc)
  },

  furthestLocationStillInRange: function(loc) {
    return loc + 18;
  },

  generateAColumn: function() {
    this.columns.push(this.columnGenerator.next());
  },

  generateNearbyColumns: function(loc) {
    while (this.stillInRange(loc)) {
      this.generateAColumn();
    }
  },

  findAllNearby: function(loc) {
    this.generateNearbyColumns(loc);

    var furthest = this.furthestLocationStillInRange(loc);
    return _.filter(this.columns, function(column) {
      return column > loc - 2 && furthest >= column; 
    });
  },

  findCollision: function(trajectory, minRow, maxRow) {
    this.generateNearbyColumns(trajectory[0].col);
    
    var cols = this.columns;
    var collisions = [];

    _.each(trajectory, function(point) { 
      if (_.contains(cols, point.col) && minRow <= point.row && point.row <= maxRow) {
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

    return _.any(this.columns, function(loc) {
      return loc >= startColumn && loc <= endColumn;
    });
  },
});