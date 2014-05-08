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
    var text = formatBorder(ScreenFormatter.draw(game.createViewPort()));
    $('#screen').html(text);
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
