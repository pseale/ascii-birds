var Game = Class.extend({
  init: function() {
    this.topColumn = new Column();
    this.bottomColumn = new Column();

    this.playerLocation = pointRowCol(4, 0);
    this.collided = false;
    this.gameOver = false;
    this.points = 0;
    this.scrollLocation = -1;
  },

  getColumnsInRange: function(column) {
    var loc = this.scrollLocation;
    return _.map(column.findAllNearby(this.playerLocation.col), function(col) { 
      return col - loc;
    });
  },

  adjust: function(points) {
    var rowOffset = this.playerLocation.row;
    var columnOffset = this.playerLocation.col;
    var points = _.map(points, function(point) {
      return pointRowCol(point.row+rowOffset, point.col+columnOffset);
    });

    return _.filter(points, function(point) {
      return point.isLegal();
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

  shiftTrajectoriesForViewPort: function(trajectories) {
    var newTrajectories = [];
    for (var i=0; i<trajectories.length; i++) {
      newTrajectories.push(this.shiftArrayForViewPort(trajectories[i]));
    }

    return newTrajectories;
  },

  shiftArrayForViewPort: function(array) {
    var newArray = [];
    for (var i=0; i<array.length; i++) {
      newArray.push(this.shiftForViewPort(array[i]));
    }

    return newArray;
  },

  shiftForViewPort: function(point) {
    return pointRowCol(point.row, point.col - this.scrollLocation);
  },

  createViewPort: function() {
    viewPort = {
      playerLocation: this.shiftForViewPort(this.playerLocation),
      trajectory: this.shiftTrajectoriesForViewPort(this.createTrajectory()),
      topColumns: this.getColumnsInRange(this.topColumn),
      bottomColumns: this.getColumnsInRange(this.bottomColumn),
      collided: this.collided,
      points: this.points,
      gameOver: this.gameOver,
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
    pointRowCol(1, 1),
    pointRowCol(2, 2),
  ],

  power1Trajectory: [
    pointRowCol(0, 1),
    pointRowCol(-1, 2),
  ],

  power2Trajectory: [
    pointRowCol(-1, 1),
    pointRowCol(-2, 2),
  ],

  power3Trajectory: [
    pointRowCol(-1, 1),
    pointRowCol(-2, 1),
    pointRowCol(-3, 2),
  ],

  power4Trajectory: [
    pointRowCol(-1, 1),
    pointRowCol(-2, 1),
    pointRowCol(-3, 2),
    pointRowCol(-4, 2),
  ],

  move: function(power) {
    if (!(power in this.lift)) {
      throw new Error("Invalid 'power', expected power 0-4, got: " + power);
    }

    if (this.gameOver) {
      throw new Error("Game over, cannot perform any action.");
    }

    var trajectory = this.createTrajectory()[power];
    var topCollision = this.topColumn.findCollision(trajectory, 0, 4);
    if (topCollision.collided) {
      this.collided = true;
      this.gameOver = true;
      this.playerLocation = topCollision.point;
      return;
    }

    var bottomCollision = this.bottomColumn.findCollision(trajectory, 6, 9);
    if (bottomCollision.collided) {
      this.collided = true;
      this.gameOver = true;
      this.playerLocation = bottomCollision.point;
      return;
    }

    this.scrollLocation += 2;
    this.playerLocation.col += 2;
    this.playerLocation.row -= this.lift[power];
  },
});