(function () {
  "use strict";

  var game = new GameController();

  function formatBorder(screenText) {
    var text = "~~~~~~~~~~~~~~~~~~~~~~\n";

    _.each(screenText, function(line) {
      text += "~" + line + "~\n";
    });
     text += "~~~~~~~~~~~~~~~~~~~~~~\n";

     return text;
  }

  function drawScreen(game) {
    var viewPort = game.createViewPort();
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
    $('#title').hide();
    $('#start-button').hide();
    $('#quit-button').show(); 
    $('#command-bar').show();
    game = new GameController();

    drawScreen(game);
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
    drawScreen(game);
  }


  //bindings
  window.onerror = function(msg, url, line) {
    $('#error-report').append('-=-=-=-=-=-=-=-=-=-=--=-=-=-=-=-=-=-=-=-=--=-=-=-=-=-=-=-=-=-=-<br />'+  url + ':' + line + '<br />' + msg + "<br />");
  };

  function wireUpButton(power) {
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

    wireUpButton(0);
    wireUpButton(1);
    wireUpButton(2);
    wireUpButton(3);
    wireUpButton(4);
  });
})();
