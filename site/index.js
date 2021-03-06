"use strict";

(function () {

  var game = new GameController();
  var isInGame = false;
  var canMove = false;
  var viewingHelp = false;

  function formatBorder(screenText) {
    var border = "~~~~~~~~~~~~~~~~~~~~~~";

    return [border].concat(
             _(screenText).map(function(line) { return "~" + line + "~" }).value())
             .concat([border])
           .join("\n");
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
    if ((isInGame && canMove) || viewingHelp) {
      return;
    }
    isInGame = true;
    canMove = true;

    highlightSuccessfulAction('#start-button');

    $('#title-screen').hide();
    $('#game-screen').show(); 
    game = new GameController();

    drawScreen(game.createViewPort());
    $('#screen').show();
  }

  function quitGame() {
    if (!isInGame || viewingHelp) {
      return;
    }


    highlightSuccessfulAction('#quit-button');
    $('#title-screen').show();
    $('#game-screen').hide(); 
    isInGame = false;
  }

  function move(power) {
    if (!isInGame || !canMove) {
      return;
    }

    highlightSuccessfulAction('#power-' + power + '-move');
    game.move(power);
    var viewPort = game.createViewPort();
    drawScreen(viewPort);
    if (viewPort.gameOver) {
      canMove = false;
    }
  }

  function viewHelp() {
    if (viewingHelp) {
      return;
    }
    viewingHelp = true;


    highlightSuccessfulAction('#help-link');
    $('#title-screen').hide();
    $('#game-screen').hide();
    $('.help-bar').hide();
    $('#help-content').load("help/");
    $('#help-screen').show();
  }

  function closeHelp() {
    if (!viewingHelp) {
      return;
    }

    highlightSuccessfulAction('#close-button');
    $('#help-screen').hide();
    $('.help-bar').show();

    if (isInGame) {
      $('#game-screen').show();
    } else {
      $('#title-screen').show();
    }

    viewingHelp = false;
  }

  function highlightSuccessfulAction(selector) {
    $(selector).addClass('active-button');
    _.delay(function() {
      $(selector).removeClass('active-button');
    }, 100);
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

    $('#help-link').click(function() {
      viewHelp();
      return false;
    });

    $('#close-button').click(function() {
      closeHelp();
      return false;
    });
    Mousetrap.bind('/', viewHelp);
    Mousetrap.bind('?', viewHelp);
    Mousetrap.bind('esc', closeHelp);
  });
})();
