$(document).ready(function () {
  var main = (function () {
    $boardBody = $('#board-body');
    $boardHead = $('#board-head');
    $playerName = $('#player-name');
    var width = 7;
    var height = 6;
    var board = [];
    var boardArr = [];
    var turn = 0;
    var moves = 0;
    var isAi = false;
    var aiFull = [];
    var lastColumn = 0;

    var _player1 = 1;
    var _player2 = 2;

    var getDiff = function (choices) {
      var newChoices = [];
      for (var key in choices) {
        if (aiFull.indexOf(choices[key]) < 0) {
          newChoices.push(choices[key]);
        }
      }

      return newChoices;
    };

    var aiLogic = function () {
      var choices = [1, 2, 3, 4, 5, 6, 7];

      //minimize to near;
      if (lastColumn > 0) {
        choices = [];
        if (lastColumn - 1 > 0) {
          choices.push(lastColumn - 1);
        }

        choices.push(lastColumn);
        choices.push(lastColumn + 1);
      }

      //remove full from choices
      choices = getDiff(choices);

      var index = Math.floor(Math.random() * choices.length);
      var num = choices[index];
      console.log(choices, index, num);

      if (playerDone(num) === false) {
        aiFull.push(num);
        aiLogic();
      } else {
        aiFull = [];
      }
    };

    var changePlayer = function () {
      turn = (turn === _player1) ? _player2 : _player1;
      $playerName.text(turn);
      if (isAi && turn === _player2) {
        aiLogic();
      }
    };

    var loadBoard = function () {
      var boxes = [];
      var drops = [];

      changePlayer();

      $boardBody.empty();
      $boardHead.empty();
      $('.board-holder').show();

      for (var t = 1; t <= width; t++) {
        var template = '<button data-id="' + t +
              '" class="dropper btn btn-success" type="button">' +
              '<span class="glyphicon glyphicon-arrow-down"></span>' +
            '</button>';
        drops.push(template);
      }

      for (var i = height; i >= 1; i--) {
        for (var j = width; j >= 1; j--) {
          var boxTemplate = '<li class="box-holder">' +
              '<div id="slot_' + i + '_' + j + '" class="slot">' +
              i + ':' + j +
              '</div>' +
              '</li>';
          boxes.push(boxTemplate);
        }
      }

      $boardBody.append(boxes.join(''));
      $boardHead.append(drops.join(''));
    };

    var checkHorizontal = function (row, col) {
      var max = col + 3;

      for (var i = col; i <= max; i++) {
        if (!$('#slot_' + row + '_' + i).hasClass('player-' + turn)) {
          return false;
        }
      }

      return true;
    };

    var checkVertical = function (row, col) {
      var max = row + 3;

      for (var j = row; j <= max; j++) {
        if (!$('#slot_' + j + '_' + col).hasClass('player-' + turn)) {
          return false;
        }
      }

      return true;
    };

    var checkDiagonalUp = function (row, col) {
      var max = row + 3;

      i = col;
      for (var j = row; j <= max; j++) {
        if (!$('#slot_' + j + '_' + i).hasClass('player-' + turn)) {
          return false;
        }

        i++;
      }

      return true;
    };

    var checkDiagonalDown = function (row, col) {
      var max = col + 3;

      j = row;
      for (var i = col; i <= max; i++) {
        if (!$('#slot_' + j + '_' + i).hasClass('player-' + turn)) {
          return false;
        }

        j--;
      }

      return true;
    };

    var checkWinner = function (row, col, turn) {
      //check horizontal
      var precedingCol = col - 3;
      for (var i = precedingCol; i <= col; i++) {
        if (i > 0 && $('#slot_' + row + '_' + i).hasClass('player-' + turn)) {
          if (checkHorizontal(row, i)) {
            return true;
          }
        }
      }

      //check vertical
      var precedingRow = row - 3;
      for (var j = precedingRow; j <= row; j++) {
        if (j > 0 && $('#slot_' + j + '_' + col).hasClass('player-' + turn)) {
          if (checkVertical(j, col)) {
            return true;
          }
        }
      }

      //check diagonal up
      //i=column j=row
      precedingCol = col - 3;
      j = row - 3;
      for (i = precedingCol; i <= col; i++) {
        if (j > 0 && $('#slot_' + j + '_' + i).hasClass('player-' + turn)) {
          if (checkDiagonalUp(j, i)) {
            return true;
          }
        }

        j++;
      }

      //check diagonal down
      //i=column j=row
      precedingCol = col - 3;
      j = row + 3;
      for (i = precedingCol; i <= col; i++) {
        if (j > 0 && $('#slot_' + j + '_' + i).hasClass('player-' + turn)) {
          if (checkDiagonalDown(j, i)) {
            return true;
          }
        }

        j--;
      }

      return false;
    };

    var finishGame = function () {
      $('.board-holder').hide();
      moves = 0;
    };

    var checkMoves = function () {
      moves++;
      if (moves >= 42) {
        return false;
      }

      return true;
    };

    var playerDone = function (colId) {
      lastColumn = colId;
      //check if full column
      if ($('#slot_' + height + '_' + colId).hasClass('player')) {
        if (turn === _player1 || !isAi) {
          alert('The column is full.');
        }

        return false;
      }

      for (var i = 1; i <= height; i++) {
        if (!$('#slot_' + i + '_' + colId).hasClass('player')) {

          $('#slot_' + i + '_' + colId).addClass('player-' + turn).addClass('player');
          break;
        }
      }

      if (checkWinner(i, colId, turn)) {
        alert('Player ' + turn + ' won!');
        finishGame();
      } else {
        if (checkMoves()) {
          changePlayer();
        } else {
          alert('The game is Draw!');
          finishGame();
        }
      }

      return true;
    };

    var events = function () {
      //Events
      $('#start').on('click', function () {
        isAi = false;
        loadBoard();
      });

      $('#start_ai').on('click', function () {
        isAi = true;
        loadBoard();
      });

      $boardHead.on('click', '.dropper', function () {
        playerDone($(this).data('id'));
      });
    };

    var init = function () {
      events();
    };

    return {
      init: init,
    };
  })();

  main.init();
});
