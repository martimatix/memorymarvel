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
  numMatchedCards: 0,
  render: function () {
    var gameViewHTML = $('#gameView-template').html();
    this.$el.html(gameViewHTML);
    this.$el.append($('<div/>').addClass('background'));
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
      // Clone the card element so that we have pairs of cards
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
    self = this;
    if ($(event.currentTarget).hasClass('clicked')) {
      return
    } else if (this.numClicks === 0) {
      this.numClicks = 1;
      // Store the first card element
      this.$firstCard = $(event.currentTarget);
      this.applyClickedState(this.$firstCard);
      TweenLite.to(this.$firstCard.find(".card"), 1, {rotationY:180, ease:Back.easeOut});
    // if it's the second click out of two (turning the second card)
    } else if ($('.clicked').length < (self.numMatchedCards + 2)) {
      TweenLite.to($(event.currentTarget).find(".card"), 1, {rotationY:180, ease:Back.easeOut});
      this.applyClickedState($(event.currentTarget));
      // Check if we have a match
      if (this.$firstCard.attr('data-comicID') === $(event.currentTarget).attr('data-comicID')) {
        // Stuff to do if there is a match
        self.numMatchedCards += 2;
        self.numClicks = 0;
        self.enlargeCard();
      } else {
        // Stuff to do if there is no match
        setTimeout(function(){
          TweenLite.to(self.$firstCard.find(".card"), 1, {rotationY:0, ease:Back.easeOut}); 
          TweenLite.to($(event.currentTarget).find(".card"), 1, {rotationY:0, ease:Back.easeOut});         
          self.unapplyClickedState(self.$firstCard);
          self.unapplyClickedState($(event.currentTarget));
          self.numClicks = 0;
       }, 1500);
      }
      // Check for game over condition
      if (this.comics.length === this.numMatches) {
        // Do stuff when the game is over
      }
    }
  },
  applyClickedState: function (el) {
    el.addClass('clicked');
    el.css('cursor','default');
  },

  // adds a click to an element
  unapplyClickedState: function (el) {
    el.removeClass('clicked');
    el.css('cursor','pointer');
  },

  enlargeCard: function() {
    // Get absolute position of first card
    var offset = self.$firstCard.offset();
    var posY = offset.top - $(window).scrollTop();
    var posX = offset.left - $(window).scrollLeft(); 

    var $image = (self.$firstCard.find('img')).clone();
    $image.css({
      position: 'absolute',
      top:       posY,
      left:      posX,
      width:     '133px',
      'z-index': 3
    });

    // Dimming element darkens the screen other than the enlarged image
    var $dimmingElement = $('<div/>').addClass('background').css({
      'background-color': 'black',
      'z-index': 2
    });

    this.$el.append($image);
    this.$el.append($dimmingElement);

    // Dim screen
    TweenMax.set($dimmingElement,{opacity:0});
    TweenMax.to($dimmingElement,2, {opacity:0.7});

    // Translate image to centre of screen
    TweenLite.to($image, 0.5, {left: (window.innerWidth - $image.width())/2,
                               top: (window.innerHeight - $image.height())/2,
                               delay: 0.5
                              });

    // Enlarge image
    TweenLite.to($image, 0.25, {scale: 0.95 * window.innerHeight/$image.height(),
                                        ease:Sine.easeIn,
                                        delay: 1});

  } 
});


