// Todo: set urlRoot (see comment.js from backboneblog)

var app = app || {};

app.Comic = Backbone.Model.extend({
  urlRoot: function () {
    return '/decks/' + this.get('deck_id') + '/comics';
  },
  defaults: {
    marvel_id: 0,
    seat_column: 'not selected',
    user_id: 0,
    flight_id: 0
  }
});
