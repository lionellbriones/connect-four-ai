<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Connect Four</title>
    <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">
    <link rel="stylesheet" href="/css/app.css" media="screen" title="no title" charset="utf-8">
  </head>
  <body>
    <div class="container">
      <h1>Connect Four</h1>
      <div class="select-game">
        <button id="start" type="button" name="button" class="btn btn-default">Start Game</button>
      </div>

      <div class="board-container board-holder">
        <h3>Player <span id="player-name"></span></h3>
        <div id="board-head"></div>
        <ul id="board-body" class="boxes"></ul>
      </div>
    </div>

    <script src="https://code.jquery.com/jquery-2.2.3.min.js" charset="utf-8"></script>
    <script src="/js/all.js" charset="utf-8"></script>
  </body>
</html>
