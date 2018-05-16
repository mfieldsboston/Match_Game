/*
  Sets up a new game after HTML document has loaded.
  Renders a 4x4 board of cards.
*/

$(document).ready(function() {
    var $game = $('#game');
    var values = MatchGame.generateCardValues();
    MatchGame.renderCards(values, $game);
});

/*
  Generates and returns an array of matching card values.
*/

var MatchGame = {};

MatchGame.generateCardValues = function () {
  var sequential_values = [];

  for (var i = 1; i <= 8; i++) {
    sequential_values.push(i, i);
  }

  var cardValues = [];

  while (sequential_values.length > 0) {
    var index = Math.floor(Math.random() * sequential_values.length);
    cardValues.push(sequential_values[index]);
    sequential_values.splice(index, 1);
  }

  return cardValues;
};

/*
  Converts card values to jQuery card objects and adds them to the supplied game
  object.
*/

MatchGame.renderCards = function(cardValues, $game) {

  $game.empty();
  $game.data('flippedCards', []);

  var colors = [
    'hsl(25, 85%, 65%)',
    'hsl(55, 85%, 65%)',
    'hsl(90, 85%, 65%)',
    'hsl(160, 85%, 65%)',
    'hsl(220, 85%, 65%)',
    'hsl(265, 85%, 65%)',
    'hsl(310, 85%, 65%)',
    'hsl(360, 85%, 65%)'];

  for (var i = 0; i < cardValues.length; i++) {

      var $cardElement = $('<div class="col-xs-3 card"></div>');

      var value = cardValues[i];
      var color = colors[value - 1];
      var data = {
        value: value,
        color: color,
        isFlipped: false
      };

      $cardElement.data(data);
      $game.append($cardElement);
  }

  $('.card').click(function() {
    MatchGame.flipCard($(this), $('#game'));
  });

};

/*
  Flips over a given card and checks to see if two cards are flipped over.
  Updates styles on flipped cards depending whether they are a match or not.
 */

MatchGame.flipCard = function($card, $game) {
  if ($card.data('isFlipped')) {
    return;
  }

  $card.css('background-color', $card.data('color'))
      .text($card.data('value'))
      .data('isFlipped', true);

  /*$game.data('flippedCards').push($card);

  if ($game.data('flippedCards').length === 2) {
    console.log('eureka!');
  }*/

  var flippedCards = $game.data('flippedCards');
  flippedCards.push($card);

  if (flippedCards.length === 2) {
    //console.log('eureka!');

    if (flippedCards[0].data('value') === flippedCards[1].data('value')) {
      //console.log('eureka!!!!!!');
      var matchColors = {
        backgroundColor: 'rgb(153, 153, 153)',
        color: 'rgb(204, 204, 204)'
      };
      flippedCards[0].css(matchColors);
      flippedCards[1].css(matchColors);
    }
    else {
      var firstFlipped = flippedCards[0];
      var secondFlipped = flippedCards[1];
      window.setTimeout(function() {
        firstFlipped.css('background-color', 'rgb(32, 64, 86)')
            .text('')
            .data('isFlipped', false);
        secondFlipped.css('background-color', 'rgb(32, 64, 86)')
            .text('')
            .data('isFlipped', false);
      }, 350);
    }
    $game.data('flippedCards', []);

  }

};
