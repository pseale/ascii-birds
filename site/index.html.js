(function () {
  "use strict";

  var game = new GameController();

  function formatScreen(screenText) {
    var text = "~~~~~~~~~~~~~~~~~~~~~~\n";

    _.each(screenText, function(line) {
      text += "~" + line + "~\n";
    });
     text += "~~~~~~~~~~~~~~~~~~~~~~\n";

     $('#screen').html(text);
  }

  function drawScreen() {
    var viewPort = game.createViewPort();
    var screen = [];
    for (var row=0; row<10; row++) {
      var rowArray = [];
      for (var col=0; col<20; col++) {
        rowArray.push("\u00B7"); //Unicode character is an 'Interpunct': http://en.wikipedia.org/wiki/Interpunct
      }
      screen.push(rowArray);
    }

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

    var token = "";
    if (viewPort.collided) {
      token = "<span class='collision'>%</span>";
    } else {
      token = "@";
    }

    screen[viewPort.playerLocation.row][viewPort.playerLocation.col] = token;


    for (var i=0; i<=4; i++) {
      _.each(viewPort.trajectory[i], function(point) {
        screen[point.row][point.col] = "<span class='trajectory-" + i + "'>" + screen[point.row][point.col] + "</span>";
      });
    }

    _.each(viewPort.trajectory, function(points) {
    });
    var screenText = [];

    _.each(screen, function(row) {
      var rowText = "";
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
    game = new GameController();
    formatScreen(drawScreen());
    $('#screen').show();
  }

  function quitGame() {
    $('#title').show();
    $('#start-button').show();
    $('#quit-button').hide(); 
    $('#command-bar').hide();
    $('#screen').hide();
  }

  function move(power) {
    game.move(power);
    formatScreen(drawScreen());
  }


  //jQuery page bindings
  window.onerror = function(msg, url, line) {
    $('#error-report').append('-=-=-=-=-=-=-=-=-=-=--=-=-=-=-=-=-=-=-=-=--=-=-=-=-=-=-=-=-=-=-<br />'+  url + ':' + line + '<br />' + msg + "<br />");
  };

  function wireUpButton(power) {
    $('a#power-' + power + '-move').click(function() {
      move(power);
      return false;
    });

    $('#button-' + power).hover(function() {
      $('span.trajectory-' + power).addClass('trajectory');
    }, 
    function() {
      $('span.trajectory-' + power).removeClass('trajectory');
    });
  }

  $(document).ready(function() {
    $('a#start-button').click(function() {
      startGame();
      return false;
    });  

    $('a#quit-button').click(function() {
      quitGame();
      return false;
    });

    wireUpButton(0);
    wireUpButton(1);
    wireUpButton(2);
    wireUpButton(3);
    wireUpButton(4);
  });
})();
