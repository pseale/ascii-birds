(function () {

  var game = new Game();

  function drawScreen(screenText) {
    var text = "~~~~~~~~~~~~~~~~~~~~~~\n";

    _.each(screenText, function(line) {
      text += "~" + line + "~\n"
    });
     text += "~~~~~~~~~~~~~~~~~~~~~~\n";

     $('#screen').html(text);
  }

  function startGame() {
    $('#title').hide();
    $('#start-button').hide();
    $('#quit-button').show(); 
    $('#command-bar').show();

    drawScreen(game.createScreen());
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
