// Todo: set urlRoot (see comment.js from backboneblog)

var app = app || {};

app.Deck = Backbone.Model.extend({
  defaults: {
    title: 'New Deck',
    num_comics: 0
  }
});