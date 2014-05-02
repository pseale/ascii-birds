var Column = Class.extend({
  init: function() {
    this.columnGenerator = new ColumnGenerator();
    this.columns = [];
  },

  generateAColumn: function() {
    this.columns.push(this.columnGenerator.next());
  },

  stillInRange: function(location) {
    return _.max(this.columns) <= this.furthestLocationStillInRange(location)
  },

  furthestLocationStillInRange: function(location) {
    return location + 18;
  },

  findAllNearby: function(location) {
    while (this.stillInRange(location)) {
      this.generateAColumn();
    }

    var furthest = this.furthestLocationStillInRange(location);
    return _.filter(this.columns, function(column) {
      return column > location - 2 && furthest >= column; 
    });
  },
});