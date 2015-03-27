var app = app || {};

app.Decks = Backbone.Collection.extend({
  url: '/api/decks',
  model: app.Deck
});
