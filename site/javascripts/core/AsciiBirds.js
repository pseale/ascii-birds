"use strict";

var AsciiBirds = {
  moveSpeed: 2,

  playerStartRow: 4,
  playerStartCol: 0,


  windowWidth: 20,
  windowHeight: 10,
  playerLocationInWindow: 2,

  pillarDistanceMin: 7,
  pillarDistanceMax: 10,

  pillarHeightMin: 2,
  pillarHeightMax: 4,

  TrajectoryVectors: {
    power0: [
      pointRowCol(1, 1),
      pointRowCol(2, 2),
    ],

    power1: [
      pointRowCol(0, 1),
      pointRowCol(-1, 2),
    ],

    power2: [
      pointRowCol(-1, 1),
      pointRowCol(-2, 2),
    ],

    power3: [
      pointRowCol(-1, 1),
      pointRowCol(-2, 1),
      pointRowCol(-3, 2),
    ],

    power4: [
      pointRowCol(-1, 1),
      pointRowCol(-2, 1),
      pointRowCol(-3, 2),
      pointRowCol(-4, 2),
    ],
  },
};