var dartboard = [];
var userName = $('#user-name');
var userScore = $('#user-score');

// Submit individual score to scoreboard
$('#addScore').click(function (event) {
  event.preventDefault();
  $('#rankings').empty();

  if (empty() === false) {
    return
  }

  var Name  = userName.val();
  var Score = parseInt(userScore.val());

  recordDartScore(Name, Score);

  var records = dartboard.length;
  for(var i = 0, records; i < records; i++) {
    $('#rankings').append(dartboard[i].ranking + '. ' + dartboard[i].name + ', ' + dartboard[i].score + ' pts<br>');
  }

  $('#user-name').val('');
  $('#user-score').val('');
});

// Clear scoreboard of all records
$('#clear').click(function () {
  $('ul#rankings').empty();
  dartboard = [];
});

// HELPER FUNCTIONS

// Alerts user of empty or incorrect input in form field
function empty() {
    var name = userName.val();
    var score = userScore.val();
    if (name === "") {
      sweetAlert("Please enter a player name!", "Check your birth certificate, or if you want to, just enter 'James'. I've always been partial to that name.", "error");
      return false;
    };
    if (score === "") {
      sweetAlert("Please enter a player score!", "Why don't you give yourself a perfect darts score of 180 for this round? Go on, you've probably earned it.", "error");
      return false;
    };
    if (score < 0) {
      sweetAlert("Please enter a positive number for the player score!", "There's no such thing as a negative score in darts! Maybe you're thinking of golf?", "error")
      return false;
    }
    if (isNaN(score)) {
      sweetAlert("Please enter a number for the player score!", "Darts is a game of numbers! A score of 'hamburger', for example, doesn't fly here. Sorry.", "error")
      return false;
    };
}

// Add player to scoreboard and ranks based on their score
function recordDartScore(player, score){
  var records = dartboard.length;

  if(records === 0){
    dartboard.push({name: player, score: score})
    dartboard[0].ranking = 1;
    return
  }

  if(existingPlayer(player)) {
    _.result(_.find(dartboard, function(obj) {
      if(obj.name === player){
        obj.score += score
      }
    }))
  } else {
    dartboard.push({name: player, score: score});
  }

  sortLeaderBoard(dartboard);
  setPlayerPosition(dartboard);

  return dartboard;
}

// check if player already exists
function existingPlayer(player) {
  records = dartboard.length;
  for(var i = 0, records; i < records; i++) {
    if(dartboard[i].name === player){
      return true;
    }
  }
}

// sort dartboard
function sortLeaderBoard(board) {
  dartboard = _.sortBy(board, function(item) {
    return -item.score;
  })
}

// determine player ranking
function setPlayerPosition(board) {
  var i = 0;
  var lastPos = i;
  var score = 0;

  if (board.length > 1) {
    while (i < board.length) {
      if (board[i].score === score) {
        board[i].ranking = lastPos;
      } else {
        board[i].ranking = i + 1;
        lastPos = i + 1;
        score = board[i].score;
      }
      i++;
    }
    return board
  }
}
