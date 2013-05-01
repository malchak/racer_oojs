function Player(name) {
  this.name = name;
  this.position = 0;
}

Player.prototype = {
  advance: function player_advance(num) {
    this.position += 1;
    $('#player'+num+'_strip .active').removeClass('active').next().addClass('active');
  } 
};

function Game(player1, player2, length) {
  this.player1 = player1;
  this.player2 = player2;
  this.length = length;
}

Game.prototype = {
  createBoard: function game_createBoard() {
    for(var  i = 0; i < this.length - 1; i++) {
      $('#player1_strip, #player2_strip').append('<td></td>');
    };
    countDown();
  }
};


var currentGame;
var game;
var board_length;
var player1;
var player2;

function finishLine(gamewinner) {
  var data = {winner:gamewinner};
  var url = '/games/'+currentGame.game+'/results';
  $.ajax({type:'post',
    url:url,
    data:data
  });
  console.log(data);
}

function countDown(){
  
}

var displayWinner = function(winner) {
  $('.racer_table').append('<h1>'+winner+' WON!</h1>');
  $(document).unbind('keyup');
};

var startGame = function(){
  $(document).on('keyup', function(event){
    if (event.keyCode === 65) {
      player1.advance(1);
      if (player1.position === game.length) {
        var winner = player1.name;
        displayWinner(winner);
        finishLine(winner);
        setTimeout(window.location.replace('/'), 3000);
      }
    }else if (event.keyCode === 76) {
      player2.advance(2);
      if (player2.position === game.length) {
        var winner = player2.name;
        displayWinner(winner);
        finishLine(winner);
        setTimeout(window.location.replace('/'), 3000);
      }
    }
  });
}

$(document).ready(function(){
  if (typeof gameId !== "undefined") {
    $.get('/games/'+gameId).done(function(data) {
      currentGame = data;
      player1 = new Player(currentGame.player1.player.username)
      player2 = new Player(currentGame.player2.player.username)
      game = new Game(player1, player2, currentGame.board_length)
      console.log(currentGame);
      game.createBoard();
      startGame();    
    });
  }
});



