var app = app || {};

// It's better to put the game logic in another object to separate concerns.
// However, due to time limitations, I don't have time to research this option.
// Therefore, please excuse the poor style ^_^U

// Much of the logic of the game is from:
// https://github.com/frenski/quizy-memorygame/blob/master/js/jquery.quizymemorygame.js

app.GameView = Backbone.View.extend({
  el: '#main', // define the selector which this view is associated with
  events: {
    'click .cardWrapper': 'flipCard',
    'click .enlarged' : 'discardCard',
    'click a#replay' : 'refreshPage'
  },
  flipped: false,
  numClicks: 0,
  numMatchedCards: 0,
  render: function () {
    // Preload image
    this.$gameOverBackgroundImg = $('#victory-template').html();

    var gameViewHTML = $('#gameView-template').html();
    this.$el.html(gameViewHTML);
    this.$el.append($('<div/>').addClass('background'));
    TweenLite.set(".background", {opacity:0});
    TweenMax.to($('.background'), 1, {opacity:1});
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
      this.$secondCard = $(event.currentTarget);
      TweenLite.to($(event.currentTarget).find(".card"), 1, {rotationY:180, ease:Back.easeOut});
      this.applyClickedState(this.$secondCard);
      // Check if we have a match
      if (this.$firstCard.attr('data-comicID') === this.$secondCard.attr('data-comicID')) {
        // Stuff to do if there is a match
        self.numMatchedCards += 2;
        self.numClicks = 0;
        self.enlargeCard();
      } else {
        // Stuff to do if there is no match
        setTimeout(function(){
          TweenLite.to(self.$firstCard.find(".card"), 1, {rotationY:0, ease:Back.easeOut}); 
          TweenLite.to(self.$secondCard.find(".card"), 1, {rotationY:0, ease:Back.easeOut});         
          self.unapplyClickedState(self.$firstCard);
          self.unapplyClickedState(self.$secondCard);
          self.numClicks = 0;
       }, 1500);
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

    this.$matchedComic = (self.$firstCard.find('.comicSide')).clone();
    this.$matchedComic.css({
      position: 'absolute',
      top:       posY,
      left:      posX,
      width:     '133px',
      'z-index': 3
    });
    this.$matchedComic.addClass('enlarged');

    // Dimming element darkens the screen other than the enlarged image
    this.$dimmingElement = $('<div/>').addClass('background').css({
      'background-color': 'black',
      'z-index': 2
    });
    this.$dimmingElement.addClass('dimmer');

    this.$el.append(this.$matchedComic);
    this.$el.append(this.$dimmingElement);

    // Dim screen and second card
    TweenMax.set(this.$dimmingElement,{opacity:0});
    TweenMax.set(this.$firstCard,{opacity:0});
    TweenMax.to(this.$dimmingElement, 2, {opacity:0.7});
    TweenMax.to(this.$secondCard, 2, {opacity:0});

    // Translate image to centre of screen
    TweenLite.to(this.$matchedComic, 0.5, {
      left: (window.innerWidth - this.$matchedComic.width())/2,
      top: (window.innerHeight - this.$matchedComic.height())/2,
      delay: 0.5
    });

    // Enlarge image
    TweenLite.to(this.$matchedComic, 0.25, {
      scale: 0.95 * window.innerHeight/this.$matchedComic.height(),
      ease:Sine.easeIn,
      delay: 1
    });
  },

  discardCard: function () {
    var self = this;
    TweenMax.to([this.$dimmingElement,this.$matchedComic], 0.5, {opacity:0});
    TweenLite.to(this.$matchedComic, 0.5, {scale:0, ease:Sine.easeIn});
    setTimeout( function () {
      self.$dimmingElement.remove();
      self.$matchedComic.remove();
      // Check for game over condition
      if (self.comics.length === self.numMatchedCards/2) {
        self.gameOverAnimation();
      }     
    }, 500);
  },

  gameOverAnimation: function () {
    var self = this;
    setTimeout( function () {
      // Remove card wrappers as we will be appending things to the main div
      $('.cardWrapper').remove();

      // Apply the game over background image
      $gameOverBackgroundDiv = $('<div/>').attr('id', 'bg');

      $gameOverBackgroundDiv.append(self.$gameOverBackgroundImg);
      self.$el.prepend($gameOverBackgroundDiv);
      TweenMax.to($('.background'), 3, {opacity:0});

      // Game over message
      $gameOverMessage = $('<p/>').text('Congratulations!').addClass('game-over-message');
      self.$el.prepend($gameOverMessage);
      var tl = new TimelineMax({yoyo:true});    
      tl.from($gameOverMessage, 0.5, {left:'-=60px', ease:Back.easeOut})
      .staggerFrom($gameOverMessage, 0.1, {alpha:0}, 0.02, "textEffect")
      .staggerFrom($gameOverMessage, 0.8, {rotationY:"-270deg", top:"100px", transformOrigin: "50% 50% -80", ease:Back.easeOut}, 0.02, "textEffect")
      .staggerTo($gameOverMessage, 0.6, {rotationX:"+=360deg", transformOrigin:"50% 50% 10", color:"#FFF"}, 0.02);
      self.optionsAfterGameOver(self.model.get('id'));
    }, 1000);
  },

  optionsAfterGameOver: function (thisGameID) {
    setTimeout( function () {
      // TweenMax.to([$('.background'), $('#bg'), $('.game-over-message')], 3, {opacity:0});
      $.get( "/get_deck.json", function( randomID ) {
        var gameOverOptionsTemplate = $('#optionsAfterGameOver-template').html();
        var gameOverOptionsHTML = _.template(gameOverOptionsTemplate);
        $('#main').append(gameOverOptionsHTML({
          "this_game_id": thisGameID,
          "random_id": randomID
        }));
        TweenLite.set(".game-over-options", {opacity:0});
        TweenMax.to($(".game-over-options"), 1, {opacity:1});
      });
    }, 2000);
  },

  refreshPage: function (event) {
    event.preventDefault();
    Backbone.history.loadUrl(Backbone.history.fragment);
    return false;
  } 
});


