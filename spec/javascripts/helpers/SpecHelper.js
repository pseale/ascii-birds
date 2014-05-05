//test helper method that translates a billion ugly asserts that are hard to read,
//into a picture that you understand immediately. In the case that an assertion fails,
//it's probably a little harder to tell exactly what failed...probably.
//
//A trajectory string consists of a "@" being the origin, "." to indicate empty space,
// and "x" to indicate a point on the trajectory. Whitespace (spaces) are ignored.
//
//E.g.
//
//@..
//.x.
//..x
function trajectoryExactlyMatches(viewPort, power, expectedTrajectoryString) {
  var map = convertTrajectoryMap(expectedTrajectoryString);
  var expectedTrajectory = adjustRelativeTrajectoriesToViewPortPoints(viewPort, map);

  var actualTrajectory = viewPort.trajectory[power];
  expect(actualTrajectory.length).toEqual(expectedTrajectory.length);
  // if (actualTrajectory.length !== expectedTrajectory.length) {
  //   return false;
  // }

  for (var i=0; i<expectedTrajectory.length; i++) {
    expect(actualTrajectory).toContain(expectedTrajectory[i]);
    // if (!_.contains(actualTrajectory, expectedTrajectory[i])) {
    //   return false;
    // }
  }

  return true;
}

//while a relative trajectory is useful, we can only make useful comparisons
//to the viewPort's position. This function converts relative trajectory points
//to viewPort-relative points.
function adjustRelativeTrajectoriesToViewPortPoints(viewPort, map) {
  var rowOffset = 10 - viewPort.playerHeight;
  var columnOffset = 1;

  return _.map(map.trajectory, function(point) {
    return [point[0]+rowOffset, point[1]+columnOffset];
  });  
}

function convertTrajectoryMap(expectedTrajectoryString) {
  var lines = _.map(expectedTrajectoryString.split("\n"), function(line) {
    return line.trim();
  });

  //get a raw "where in the ascii drawing is this trajectory point"
  var trajectoryPoints = [];
  var startPoint = [];
  for (var line =0; line < lines.length; line++) {
    for (var col=0; col<lines[line].length; col++) {
      if (lines[line][col] === 'x') {
        trajectoryPoints.push([line, col]);
      } else if (lines[line][col] === '@') {
        startPoint = [line, col];
      }
    }
  }

  //adjust the raw trajectory points to a "relative distance" from the start point
  _.each(trajectoryPoints, function(point) {
    point[0] -= startPoint[0];
    point[1] -= startPoint[1];
  });

  return {
    startPoint: startPoint,
    trajectory: trajectoryPoints,
  };
}

function convertTrajectoryString(token) {
  if (token === "@") {
    return 
  }  
}

// beforeEach(function() {
//   });
// });
