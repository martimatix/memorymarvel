// Todo: set urlRoot (see comment.js from backboneblog)

var app = app || {};

app.Deck = Backbone.Model.extend({
  urlRoot: function () {
    return '/api/decks/';
  },
  defaults: {
    title: 'New Deck',
    num_comics: 0,
    user_id: 0
  }
});