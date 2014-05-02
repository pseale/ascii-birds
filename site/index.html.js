(function () {

  var game = new Game();

  function formatScreen(screenText) {
    var text = "~~~~~~~~~~~~~~~~~~~~~~\n";

    _.each(screenText, function(line) {
      text += "~" + line + "~\n"
    });
     text += "~~~~~~~~~~~~~~~~~~~~~~\n";

     $('#screen').html(text);
  }

  function drawScreen(viewPort) {
    var screen = [];
    for (var row=0; row<10; row++) {
      var rowArray = [];
      for (var col=0; col<20; col++) {
        rowArray.push(".");
      }
      screen.push(rowArray);
    }

    var playerRowOffset = 10 - viewPort.playerHeight;

    screen[playerRowOffset][1] = "@";

    var topColumnsInView = _.filter(viewPort.topColumns, function(column) { return column < 20 });
    _.each(topColumnsInView, function (column) {
      for(var row=0; row<5; row++) {
        screen[row][column] = "#";
      }
    });

    var bottomColumnsInView = _.filter(viewPort.bottomColumns, function(column) { return column < 20 });
    _.each(bottomColumnsInView, function (column) {
      for(var row=9; row>5; row--) {
        screen[row][column] = "#";
      }
    });

    screenText = [];

    _.each(screen, function(row) {
      rowText = "";
      for (var i=0;i<row.length; i++) {
        rowText += row[i];
      }
      screenText.push(rowText);
    });

    return screenText;
  }

  function startGame() {
    $('#title').hide();
    $('#start-button').hide();
    $('#quit-button').show(); 
    $('#command-bar').show();
    game = new Game();
    formatScreen(drawScreen(game.createViewPort()));
    $('#screen').show();
  }

  function quitGame() {
    $('#title').show();
    $('#start-button').show();
    $('#quit-button').hide(); 
    $('#command-bar').hide();
    $('#screen').hide();
  }

  //jQuery page bindings
  $(document).ready(function() {
    $('a#start-button').click(function() {
      startGame();
      return false;
    });  

    $('a#quit-button').click(function() {
      quitGame();
      return false;
    });  
  });
})();
