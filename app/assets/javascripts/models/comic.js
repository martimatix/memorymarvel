// Todo: set urlRoot (see comment.js from backboneblog)

var app = app || {};

app.Comic = Backbone.Model.extend({
  urlRoot: function () {
    return '/decks/' + this.get('deck_id') + '/comics';
  },
  defaults: {
    marvel_id: 0,
    title: 'no title',
    image_url: 'no image',
    deck_id: 0
  }
});
