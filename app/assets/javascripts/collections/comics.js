var app = app || {};

app.Comics = Backbone.Collection.extend({
  url: function () {
    return '/decks/' + this.deckID + '/comics';
  },
  model: app.Comic,
  initialize: function (options) {
    this.flightID = options.flight_id;
    // this.on('add', function (comment) {
    //   var commentView = new app.CommentView({model: comment});
    //   commentView.render();
    // });
  }
});