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

  adjust: function(points) {
    var rowOffset = 10 - this.playerHeight;
    var columnOffset = 1;
    return _.map(points, function(point) {
      return [point[0]+rowOffset, point[1]+columnOffset];
    });
  },

  createTrajectory: function() {
    return [
      this.adjust(this.power0Trajectory),
      this.adjust(this.power1Trajectory),
      this.adjust(this.power2Trajectory),
      this.adjust(this.power3Trajectory),
      this.adjust(this.power4Trajectory),
    ];
  },

  createViewPort: function() {
    viewPort = {
      playerHeight: this.playerHeight,
      trajectory: this.createTrajectory(),
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
    4: 4,
  },

  power0Trajectory: [
    [1, 1],
    [2, 2],
  ],

  power1Trajectory: [
    [0, 1],
    [-1, 2],
  ],

  power2Trajectory: [
    [-1, 1],
    [-2, 2],
  ],

  power3Trajectory: [
    [-1, 1],
    [-2, 1],
    [-3, 2],
  ],

  power4Trajectory: [
    [-1, 1],
    [-2, 1],
    [-3, 2],
    [-4, 2],
  ],

  move: function(power) {
    if (!(power in this.lift)) {
      throw new Error("Invalid 'power', expected power 0-4, got: " + power);
    }

    this.location += 2;
    this.playerHeight += this.lift[power];
  },
});