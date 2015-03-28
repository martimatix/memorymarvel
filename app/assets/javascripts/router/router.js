var app = app || {};

// Kind of like the Rails router with embedded actions.
// Makes the application navigatable, with meaningful URLs.
app.AppRouter = Backbone.Router.extend({
  routes: {
    '' : 'index',
    'deck/:id/search' : 'searchForComics',
    'deck/:id/search/results/:page' : 'searchResults'
  },

  index: function () {
    var deckView = new app.DeckView({collection: app.decks});
    deckView.render();
  },

  searchForComics: function (id) {
    var deck = app.decks.get(id);
    var searchView = new app.SearchView({model: deck});
    searchView.render();
  },

  searchResults: function (id, page) {
    var deck = app.decks.get(id);
    var searchResultsView = new app.SearchResultsView({model: deck});
    searchResultsView.render(page);
  }

});