"use strict";

var MoveCommand = {
  createCollisionResult: function(collision) {
    return {
      collided: true,
      outOfBounds: false,
      gameOver: true,
      playerLocation: collision.point,
      scoreToAdd: 0,
    };
  },

  outOfBoundsResult: function() {
    return {
      collided: false,
      outOfBounds: true,
      gameOver: true,
      scoreToAdd: 0,
    };
  },

  createMoveResult: function(trajectory, scoreToAdd) {
    return {
      collided: false,
      outOfBounds: false,
      gameOver: false,
      playerLocation: trajectory[trajectory.length-1],
      scoreToAdd: scoreToAdd,
    };
  },

  execute: function(trajectory, topPillar, bottomPillar) {
    var topCollision = topPillar.findCollision(trajectory, AsciiBirds.topPillarMinRow, AsciiBirds.topPillarMaxRow);
    if (topCollision.collided) {
      return this.createCollisionResult(topCollision);
    }

    var bottomCollision = bottomPillar.findCollision(trajectory, AsciiBirds.bottomPillarMinRow, AsciiBirds.bottomPillarMaxRow);
    if (bottomCollision.collided) {
      return this.createCollisionResult(bottomCollision);
    }

    var areAnyPointsOutOfBounds = _.any(trajectory, function(point) {
      return !point.isLegal();
    });

    if (areAnyPointsOutOfBounds) {
      return this.outOfBoundsResult();
    }

    var scoreToAdd = 0;

    if(topPillar.crossedBy(trajectory)) {
      scoreToAdd++;
    }
    if(bottomPillar.crossedBy(trajectory)) {
      scoreToAdd++;
    }
    
    return this.createMoveResult(trajectory, scoreToAdd);
  },  
};
