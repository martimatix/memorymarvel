var app = app || {};

app.Comics = Backbone.Collection.extend({
  url: function () {
    return 'api/decks/' + this.deckID + '/comics';
  },
  model: app.Comic,
  initialize: function (options) {
    this.deckID = options.deck_id;
  }
});