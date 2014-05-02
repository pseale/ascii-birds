var Game = Class.extend({
  init: function() {
    this.topColumn = new Column();
    this.bottomColumn = new Column();

    this.location = 0;
  },

  getColumnsInRange: function(column) {
    var loc = this.location;
    return _.map(column.findAllNearby(this.location), function(col) { 
      return col - loc + 1;
    });
  },

  createViewPort: function() {
    var currentPlayerLocation = this.location;
    viewPort = {
      playerHeight: 6,
      topColumns: this.getColumnsInRange(this.topColumn),
      bottomColumns: this.getColumnsInRange(this.bottomColumn),
    };

    return viewPort;
  },

  move: function(power) {
    this.location += 2;
  },
});