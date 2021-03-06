"use strict";

var GameController = Class.extend({
  init: function() {
    this.topPillar = new Pillar(true);
    this.bottomPillar = new Pillar(false);

    this.playerLocation = pointRowCol(AsciiBirds.playerStartRow, AsciiBirds.playerStartCol);
    this.collided = false;
    this.outOfBounds = false;
    this.gameOver = false;
    this.score = 0;
    this.justScored = false;
    this.scrollLocation = -1; //game starts displaying player 1 away from left side of screen
  },

  createViewPort: function() {
    return ViewPortCreator.create(
      this.scrollLocation,
      this.playerLocation,
      this.topPillar,
      this.bottomPillar,
      this.collided,
      this.outOfBounds,
      this.gameOver,
      this.score,
      this.justScored
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

    var trajectory = TrajectoryCalculator.getTrajectory(this.playerLocation, power);

    var result = MoveCommand.execute(trajectory, this.topPillar, this.bottomPillar);

    this.playerLocation = result.playerLocation;
    this.collided = result.collided;
    this.outOfBounds = result.outOfBounds;
    this.gameOver = result.gameOver;
    this.score += result.scoreToAdd;
    if (result.scoreToAdd > 0) {
      this.justScored = true;
    } else {
      this.justScored =false;
    }

    if (!this.gameOver) {
      this.scrollLocation += AsciiBirds.moveSpeed;
    }
  },
});