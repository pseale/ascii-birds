"use strict";

var GameController = Class.extend({
  init: function() {
    this.topPillar = new Pillar();
    this.bottomPillar = new Pillar();
    this.trajectoryCalculator = new TrajectoryCalculator();

    this.playerLocation = pointRowCol(4, 0); //starting point of game
    this.collided = false;
    this.outOfBounds = false;
    this.gameOver = false;
    this.score = 0;
    this.scrollLocation = -1; //game starts displaying player 1 away from left side of screen
  },

  createViewPort: function() {
    return (new ViewPortCreator()).create(
      this.scrollLocation,
      this.playerLocation,
      this.topPillar,
      this.bottomPillar,
      this.collided,
      this.outOfBounds,
      this.gameOver,
      this.score
      );
  },

  isValidPowerLevel: function(power) {
    return power === 0 || power === 1 || power === 2 || power === 3 || power === 4;
  },

  move: function(power) {
    if (!this.isValidPowerLevel(power)) {
      throw new Error("Invalid 'power', expected power 0-4, got: " + power);
    }

    if (this.gameOver) {
      throw new Error("Game over, cannot perform any action.");
    }

    var trajectory = this.trajectoryCalculator.getTrajectory(this.playerLocation, power);

    var result = MoveCommand.execute(trajectory, this.topPillar, this.bottomPillar);

    this.playerLocation = result.playerLocation;
    this.collided = result.collided;
    this.outOfBounds = result.outOfBounds;
    this.gameOver = result.gameOver;
    this.score += result.scoreToAdd;

    if (!this.gameOver) {
      this.scrollLocation += 2;
    }
  },
});