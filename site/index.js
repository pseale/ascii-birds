(function () {
  "use strict";

  var game = new GameController();
  var isInGame = false;
  var canMove = false;

  function formatBorder(screenText) {
    var text = "~~~~~~~~~~~~~~~~~~~~~~\n";

    _.each(screenText, function(line) {
      text += "~" + line + "~\n";
    });
     text += "~~~~~~~~~~~~~~~~~~~~~~\n";

     return text;
  }

  function drawScreen(viewPort) {
    var text = formatBorder(ScreenFormatter.draw(viewPort));
    
    $('#screen').html(text);

    if (viewPort.justScored) {
      $('.scoreboard').css({ color: 'cyan', 'background-color': 'magenta' });

      var changeBackFunc = function() { 
        $('.scoreboard').css({ color: 'yellow', 'background-color': 'black' });
      };
      _.delay(changeBackFunc, 400);
    }
  }

  function startGame() {
    if (isInGame) {
      return;
    }
    isInGame = true;
    canMove = true;
    $('#title').hide();
    $('#start-button').hide();
    $('#quit-button').show(); 
    $('#command-bar').show();
    game = new GameController();

    drawScreen(game.createViewPort());
    $('#screen').show();
  }

  function quitGame() {
    if (!isInGame) {
      return;
    }
    $('#title').show();
    $('#start-button').show();
    $('#quit-button').hide(); 
    $('#command-bar').hide();
    $('#screen').hide();
    isInGame = false;
  }

  function move(power) {
    if (!isInGame || !canMove) {
      return;
    }

    game.move(power);
    var viewPort = game.createViewPort();
    drawScreen(viewPort);
    if (viewPort.gameOver) {
      canMove = false;
    }
  }


  //bindings
  window.onerror = function(msg, url, line) {
    $('#error-report').append('-=-=-=-=-=-=-=-=-=-=--=-=-=-=-=-=-=-=-=-=--=-=-=-=-=-=-=-=-=-=-<br />'+  url + ':' + line + '<br />' + msg + "<br />");
  };

  function wireUpButton(power, keys) {
    var buttonSelector = '#power-' + power + '-move';
    $(buttonSelector).click(function() {
      move(power);
      return false;
    });

    $(buttonSelector).hover(function() {
      $('span.trajectory-' + power).addClass('trajectory');
    }, 
    function() {
      $('span.trajectory-' + power).removeClass('trajectory');
    });

    _.each(keys, function(key) {
      Mousetrap.bind(key, function() { move(power); });
    });
  }

  $(document).ready(function() {
    $('#start-button').click(function() {
      startGame();
      return false;
    });  

    $('#quit-button').click(function() {
      quitGame();
      return false;
    });

    Mousetrap.bind('q', quitGame);
    Mousetrap.bind('space', function() {
      if (isInGame && canMove) {
        move(0);
      } else {
        startGame();
      }
    });
    Mousetrap.bind('n', startGame);
    Mousetrap.bind('s', startGame);

    wireUpButton(0, ['`', '~', '0']);
    wireUpButton(1, ['1']);
    wireUpButton(2, ['2']);
    wireUpButton(3, ['3']);
    wireUpButton(4, ['4']);
  });
})();
