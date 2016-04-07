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

      for (var t = 1; t <= width; t++) {
        var template = '<button data-id="' + t +
              '" class="dropper btn btn-success" type="button">' +
              '<span class="glyphicon glyphicon-arrow-down">' + t + '</span>' +
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

    var playerDone = function (id) {
      for (var i = 1; i <= height; i++) {
        if (
          !$('#slot_' + i + '_' + id).hasClass('player-1') &&
          !$('#slot_' + i + '_' + id).hasClass('player-2')) {

          $('#slot_' + i + '_' + id).addClass('player-' + turn);
          break;
        }
      }

      changePlayer();
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
      loadBoard();
    };

    return {
      init: init,
    };
  })();

  main.init();
});

//# sourceMappingURL=all.js.map
