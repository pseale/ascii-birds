"use strict";

var MoveCommand = function() {
  var my = function() { };

  function createCollisionResult(collision) {
    return {
      collided: true,
      outOfBounds: false,
      gameOver: true,
      playerLocation: collision.point,
      scoreToAdd: 0,
    };
  }

  function createOutOfBoundsResult() {
    return {
      collided: false,
      outOfBounds: true,
      gameOver: true,
      scoreToAdd: 0,
    };
  }

  function createMoveResult(trajectory, scoreToAdd) {
    return {
      collided: false,
      outOfBounds: false,
      gameOver: false,
      playerLocation: trajectory[trajectory.length-1],
      scoreToAdd: scoreToAdd,
    };
  }

  my.execute = function(trajectory, topPillar, bottomPillar) {
    var topCollision = topPillar.findCollision(trajectory);
    if (topCollision.collided) {
      return createCollisionResult(topCollision);
    }

    var bottomCollision = bottomPillar.findCollision(trajectory);
    if (bottomCollision.collided) {
      return createCollisionResult(bottomCollision);
    }

    var areAnyPointsOutOfBounds = _.any(trajectory, function(point) {
      return !point.isLegal();
    });

    if (areAnyPointsOutOfBounds) {
      return createOutOfBoundsResult();
    }

    var scoreToAdd = 0;

    if(topPillar.crossedBy(trajectory)) {
      scoreToAdd++;
    }
    if(bottomPillar.crossedBy(trajectory)) {
      scoreToAdd++;
    }
    
    return createMoveResult(trajectory, scoreToAdd);
  };

  return my;
}();
