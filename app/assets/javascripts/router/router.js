var app = app || {};

app.AppRouter = Backbone.Router.extend({
  routes: {
    '' : 'index',
    'decks' : 'listDecks',
    'decks/:id/search' : 'searchForComics'
  },

  index: function () {
    var indexView = new app.IndexView();
    indexView.render();
  },

  listDecks: function () {
    var deckView = new app.DeckView({collection: app.decks});
    deckView.render();
  },

  searchForComics: function (id) {
    var deck = app.decks.get(id);
    var searchView = new app.SearchView({model: deck});
    searchView.render();
  }

});