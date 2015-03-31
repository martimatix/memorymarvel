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
    app.currentView && app.currentView.unbind() && app.currentView.remove();
    $('<div id="main"></div>').prependTo('#main-container')
    app.currentView = new app.IndexView();
    app.currentView.render();
  },

  listDecks: function () {
    app.currentView && app.currentView.unbind() && app.currentView.remove();
    $('<div id="main"></div>').prependTo('#main-container')
    app.currentView = new app.DeckView({collection: app.decks});
    app.currentView.render();
  },

  newDeck: function () {
    app.currentView && app.currentView.unbind() && app.currentView.remove();
    $('<div id="main"></div>').prependTo('#main-container')
    app.currentView = new app.NewDeckView({collection: app.decks});
    app.currentView.render(); 
  },

  showDeck: function (id) {
    app.currentView && app.currentView.unbind() && app.currentView.remove();
    $('<div id="main"></div>').prependTo('#main-container')
    var deck = app.decks.get(id);
    app.currentView = new app.DeckShowView({model: deck});
    app.currentView.render();
  },

  searchForComics: function (id) {
    app.currentView && app.currentView.unbind() && app.currentView.remove();
    $('<div id="main"></div>').prependTo('#main-container')
    var deck = app.decks.get(id);
    app.currentView = new app.SearchView({model: deck});
    app.currentView.render(); 
  },

  game: function (id) {
    app.currentView && app.currentView.unbind() && app.currentView.remove();
    $('<div id="main"></div>').prependTo('#main-container')
    var deck = app.decks.get(id);
    app.currentView = new app.GameView({model: deck});
    app.currentView.render();
  }

});