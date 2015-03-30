var app = app || {};

// It's better to put the game logic in another object to separate concerns.
// However, due to time limitations, I don't have time to research this option.
// Therefore, please excuse the poor style ^_^U
app.GameView = Backbone.View.extend({
  el: '#main', // define the selector which this view is associated with
  render: function () {
    var gameViewHTML = $('#gameView-template').html();
    this.$el.html(gameViewHTML);
    this.startGame();
  },
  startGame: function () {
    var self = this;
    this.comics = new app.Comics({deck_id: this.model.get('id')})
    this.comics.fetch().done( function () {
      self.createCardElements();
      self.shuffleAndLayCards();
    });
  },
  createCardElements: function () {
    var comicElements = [];
    this.comics.each(function(comic) {
      var image_path = comic.get('image_url');
      var comicID = comic.get('id');
      var $comicCover = $('<img>').addClass('comic-cover');
      $comicCover.attr('src', image_path + '/portrait_xlarge.jpg');
      comicElements.push($comicCover);
    });
    // We need to duplicate the list since each card needs a match
    this.gameCards = comicElements.concat(comicElements);
  },
  shuffleAndLayCards: function () {
    self = this;
    this.gameCards = _.shuffle(this.gameCards);
    _.each(this.gameCards, function ($card) {
      self.$el.append($card);
    });
  }
});