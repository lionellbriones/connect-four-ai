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

    var _player1 = 1;
    var _player2 = 2;

    var changePlayer = function () {
      turn = (turn === _player1) ? _player2 : _player1;
      $playerName.text(turn);
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

        j++;
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

    var checkWinner = function (row, col) {
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

    }

    var checkMoves = function () {
      moves++;
      if (moves >= 42) {
        return false;
      }

      return true;
    };

    var playerDone = function (colId) {
      //check if full column
      if ($('#slot_' + height + '_' + colId).hasClass('player')) {
        alert('The column is full.');
        return false;
      }

      for (var i = 1; i <= height; i++) {
        if (!$('#slot_' + i + '_' + colId).hasClass('player')) {

          $('#slot_' + i + '_' + colId).addClass('player-' + turn).addClass('player');
          break;
        }
      }

      if (checkWinner(i, colId)) {
        alert('Player ' + turn + ' won!');
        $('.board-holder').hide();
      } else {
        if (checkMoves()) {
          changePlayer();
        } else {
          alert('The game is Draw!');
          $('.board-holder').hide();
        }
      }
    };

    var events = function () {
      //Events
      $('#start').on('click', loadBoard);

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

//# sourceMappingURL=all.js.map
