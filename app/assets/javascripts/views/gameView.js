var app = app || {};

// It's better to put the game logic in another object to separate concerns.
// However, due to time limitations, I don't have time to research this option.
// Therefore, please excuse the poor style ^_^U

// Much of the logic of the game is from:
// https://github.com/frenski/quizy-memorygame/blob/master/js/jquery.quizymemorygame.js

app.GameView = Backbone.View.extend({
  el: '#main', // define the selector which this view is associated with
  events: {
    'click .cardWrapper': 'flipCard'
  },
  flipped: false,
  numClicks: 0,
  numMatches: 0,
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
      self.initializeGreenSock();
    });
  },
  createCardElements: function () {
    var cardElements = [];
    var cardTemplate = $('#card-template').html();
    var cardHTML = _.template(cardTemplate);

    this.comics.each(function(comic) {
      var image_path = comic.get('image_url');
      var comicID = comic.get('id');
      var $comicCover = $('<div/>').addClass('cardWrapper').attr('data-comicID', comicID);;
      $comicCover.html(cardHTML({
        'image_url' : image_path,
      }));
      cardElements.push($comicCover);
      cardElements.push($comicCover.clone(true));
    });
    this.gameCards = cardElements;
  },
  shuffleAndLayCards: function () {
    var self = this;
    this.gameCards = _.shuffle(this.gameCards);
    _.each(this.gameCards, function ($card) {
      $card.appendTo(self.$el);
    });
  },
  initializeGreenSock: function () {
    TweenLite.set(".cardWrapper", {perspective:800});
    TweenLite.set(".card", {transformStyle:"preserve-3d"});
    TweenLite.set(".back", {rotationY:-180});
    TweenLite.set([".back", ".front"], {backfaceVisibility:"hidden"});
  },
  flipCard: function (event) {
    if (this.numClicks === 0) {
      this.numClicks = 1;
      // Store the ID of the first comic
      this.firstComicID = $(event.currentTarget).attr('data-comicID');
      TweenLite.to($(event.currentTarget).find(".card"), 1, {rotationY:180, ease:Back.easeOut});

    // if it's the second click out of two (turning the second card)
    } else if (this.numClicks === 1) {
      this.numClicks = 0;
      TweenLite.to($(event.currentTarget).find(".card"), 1, {rotationY:180, ease:Back.easeOut});
      // Check if we have a match
      if (this.firstComicID === $(event.currentTarget).attr('data-comicID')) {
        console.log("match!");
      } else {
        console.log("no match");
      }
    }
    // if (this.flipped) {
    //   TweenLite.to($(event.currentTarget).find(".card"), 1, {rotationY:0, ease:Back.easeOut}); 
    // } else {
    //   TweenLite.to($(event.currentTarget).find(".card"), 1, {rotationY:180, ease:Back.easeOut});
    // }
    // this.flipped = !this.flipped;
  },
  unbindClick: function (el) {
    el.unbind('click');
    el.css('cursor','default');
  },

  // adds a click to an element
  bindClick: function (el) {
    el.bind('click',handleClick);
    el.css('cursor','pointer');
  }
});


