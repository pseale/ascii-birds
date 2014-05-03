var Game = Class.extend({
  init: function() {
    this.topColumn = new Column();
    this.bottomColumn = new Column();

    this.location = 0;
    this.playerHeight = 6;
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
      playerHeight: this.playerHeight,
      topColumns: this.getColumnsInRange(this.topColumn),
      bottomColumns: this.getColumnsInRange(this.bottomColumn),
    };

    return viewPort;
  },

  lift: {
    0: -2,
    1: 1,
    2: 2,
    3: 3,
    4: 4
  },

  move: function(power) {
    if (!(power in this.lift)) {
      throw new Error("Invalid 'power', expected power 0-4, got: " + power);
    }

    this.location += 2;
    this.playerHeight += this.lift[power];
  },
});