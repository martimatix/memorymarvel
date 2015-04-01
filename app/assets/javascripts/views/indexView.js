var app = app || {};

// Like Rails views but with the event handling stored here as well.
// Responsible for showing data on the page, but also allowing interaction.
app.IndexView = Backbone.View.extend({
  el: '#main', // define the selector which this view is associated with
  events: {
    'click .button-big': 'newGame',
  },
  render: function () {
    var indexViewHTML = $('#indexView-template').html();
    this.$el.html(indexViewHTML);

    var self = this;

    $.get( "/front_page_images.json", function( data ) {
      _.each(data, function(image_url) {
        $('.background').append($('<img>').addClass('front-page-img').attr('src', image_url))
      });
    });

    $playNowButton = $('.button-big');
    TweenMax.to($playNowButton,3,{rotation:360, ease:Back.easeInOut, delay: 5});
  },
  newGame: function (event) {
    event.preventDefault();
    $.get( "/get_deck.json", function( deck_id ) {
      app.appRouter.navigate('decks/' + deck_id +'/game', true);
    });
  }
});
