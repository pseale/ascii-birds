var Column = Class.extend({
  init: function() {
    this.columnGenerator = new ColumnGenerator();
    this.columns = [];
  },

  generateAColumn: function() {
    this.columns.push(this.columnGenerator.next());
  },

  stillInRange: function(loc) {
    return _.max(this.columns) <= this.furthestLocationStillInRange(loc)
  },

  furthestLocationStillInRange: function(loc) {
    return loc + 18;
  },

  findAllNearby: function(loc) {
    while (this.stillInRange(loc)) {
      this.generateAColumn();
    }

    var furthest = this.furthestLocationStillInRange(loc);
    return _.filter(this.columns, function(column) {
      return column > loc - 2 && furthest >= column; 
    });
  },

  findCollision: function(trajectory, minRow, maxRow) {
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
});