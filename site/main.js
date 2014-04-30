function startGame() {
  $('#title').hide();
  $('#start-button').hide();
  $('#screen').show();
  $('#quit-button').show(); 
}

function quitGame() {
  $('#title').show();
  $('#start-button').show();
  $('#screen').hide();
  $('#quit-button').hide(); 
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

