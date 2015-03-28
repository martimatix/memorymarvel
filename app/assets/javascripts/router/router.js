var app = app || {};

// Kind of like the Rails router with embedded actions.
// Makes the application navigatable, with meaningful URLs.
app.AppRouter = Backbone.Router.extend({
  routes: {
    '' : 'index',
    'deck/:id/search' : 'searchForComics'
  },

  index: function () {
    var deckView = new app.DeckView({collection: app.decks});
    deckView.render();
  },

  searchForComics: function (id) {
    var deck = app.decks.get(id);
    var searchView = new app.SearchView({model: deck});
    searchView.render();
  }

});