var app = app || {};

app.Decks = Backbone.Collection.extend({
  url: function () {
    return 'api/decks/';
  },
  model: app.Deck
});
