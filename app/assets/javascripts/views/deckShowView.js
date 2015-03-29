var app = app || {};

// Like Rails views but with the event handling stored here as well.
// Responsible for showing data on the page, but also allowing interaction.
app.DeckShowView = Backbone.View.extend({
  el: '#main', // define the selector which this view is associated with
  events: {
    'click .comic-cover': 'removeComicFromDeck'
  },
  render: function () {
    var deckShowViewHTML = $('#deckShowView-template').html();
    this.$el.html(deckShowViewHTML);

    var comics = new app.Comics({deck_id: this.model.get('id')});

    var self = this;

    comics.fetch().done(function () {
      comics.each(function(comic) {
        var image_path = comic.get('image_url');
        var comicID = comic.get('id');
        var $comicCover = $('<img>').addClass('comic-cover');
        $comicCover.attr('data-comicID', comicID);
        $comicCover.attr('src', image_path + '/portrait_xlarge.jpg');
        self.$el.append($comicCover);
      });
    });
  },
  removeComicFromDeck: function(event) {
    var comicID = $(event.target).attr('comicID'); 
    
  }
});
