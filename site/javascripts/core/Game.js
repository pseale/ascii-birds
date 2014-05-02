var Game = Class.extend({
  init: function() {
    this.topColumnGenerator = new ColumnGenerator();
    this.bottomColumnGenerator = new ColumnGenerator();
    this.topColumns = [
      this.topColumnGenerator.next(), 
      this.topColumnGenerator.next(), 
      this.topColumnGenerator.next()
      ];
    this.bottomColumns = [
      this.bottomColumnGenerator.next(), 
      this.bottomColumnGenerator.next(), 
      this.bottomColumnGenerator.next()
      ];

    this.location = 0;
  },

  createViewPort: function() {
    var currentPlayerLocation = this.location;
    viewPort = {
      playerHeight: 6,
      topColumns: _.map(this.topColumns, function(column) { return column - currentPlayerLocation; }),
      bottomColumns: _.map(this.bottomColumns, function(column) { return column - currentPlayerLocation; }),
    };

    return viewPort;
  },

  move: function(power) {
    this.location += 2;
  },
});