var app = app || {};

// Like Rails views but with the event handling stored here as well.
// Responsible for showing data on the page, but also allowing interaction.
app.DeckShowView = Backbone.View.extend({
  el: '#main', // define the selector which this view is associated with
  events: {
    'click .comic-cover': 'removeComicFromDeck'
  },
  okToDelete: true,
  render: function () {
    // Check if current user is the creator of this deck
    this.okToEdit = this.model.get('user_id') === app.currentUser.get('id');

    var deckShowViewTemplate = $('#deckShowView-template').html();
    var deckShowViewHTML = _.template(deckShowViewTemplate);

    this.$el.html(deckShowViewHTML(this.model.toJSON()));
    var pathToAddComics = '#/decks/' + this.model.get('id') + '/search';
    var $linkToAddComics = $('<a/>').attr('href', pathToAddComics);
    $linkToAddComics.text('Add comics to this deck');

    if (this.okToEdit) {
      $('.options').append($linkToAddComics);
    }

    this.comics = new app.Comics({deck_id: this.model.get('id')});
    this.updateInfoMessage();


    var self = this;

    this.comics.fetch().done(function () {
      self.comics.each(function(comic) {
        var image_path = comic.get('image_url');
        var comicID = comic.get('id');
        var $comicCover = $('<img>').addClass('comic-cover');
        $comicCover.attr('data-comicID', comicID);
        $comicCover.attr('src', image_path + '/portrait_xlarge.jpg');
        self.$el.append($comicCover);
        self.updateInfoMessage();
      });
    });
  },

  removeComicFromDeck: function(event) {
    // Exit function if user does not own this deck
    if (!this.okToEdit) {
      return
    }

    self = this;
    // `okToDelete` variable created because otherwise quick deletes could mess up the collection
    // Think of it as a debounce
    if (this.okToDelete) {
      this.okToDelete = false;
      var comicID = $(event.target).attr('data-comicID'); 
      var comic = this.comics.find({
        id: parseInt(comicID)
      });
      comic.attributes.deck_id = this.model.get('id')
      // Not a true destroy - only deletes the association to the deck
      comic.destroy({success: function () {
        $(event.target).remove();
        self.okToDelete = true;
        self.updateInfoMessage();   
      }}); 
    }
  },

  updateInfoMessage: function () {
    var infoMessage;
    if (this.model.get('num_comics') === 0) {
      infoMessage = 'There are no comics in this deck.'
    } else if (this.okToEdit) {
      infoMessage = 'You can discard a comic by clicking on it.'
    }
    $('#info-message').text(infoMessage);
  }
});
