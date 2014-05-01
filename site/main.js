function Game() {

  this.createScreen = function() {
    var screen = [];

    screen.push("..x......x......x...");
    screen.push("..x......x......x...");
    screen.push("..x......x......x...");
    screen.push("..x......x......x...");
    screen.push(".@x......x......x...");
    screen.push("....................");
    screen.push("..x......x......x...");
    screen.push("..x......x......x...");
    screen.push("..x......x......x...");
    screen.push("..x......x......x...");

    return screen;
  }
};