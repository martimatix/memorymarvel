var app = app || {};

app.AppRouter = Backbone.Router.extend({
  routes: {
    '' : 'index',
    'decks' : 'listDecks',
    'decks/new' : 'newDeck',
    'decks/:id' : 'showDeck',
    'decks/:id/search' : 'searchForComics',
    'decks/:id/game' : 'game'
  },

  index: function () {
    var indexView = new app.IndexView();
    indexView.render();
  },

  listDecks: function () {
    var deckView = new app.DeckView({collection: app.decks});
    deckView.render();
  },

  newDeck: function () {
    var newDeckView = new app.NewDeckView({collection: app.decks});
    newDeckView.render();
  },

  showDeck: function (id) {
    var deck = app.decks.get(id);
    var deckShowView = new app.DeckShowView({model: deck});
    deckShowView.render();
  },

  searchForComics: function (id) {
    var deck = app.decks.get(id);
    var searchView = new app.SearchView({model: deck});
    searchView.render();
  },

  game: function (id) {
    var deck = app.decks.get(id);
    var gameView = new app.GameView({model: deck});
    gameView.render();
  }

});