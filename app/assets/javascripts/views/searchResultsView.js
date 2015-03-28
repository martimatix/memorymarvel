var app = app || {};

// Like Rails views but with the event handling stored here as well.
// Responsible for showing data on the page, but also allowing interaction.
app.SearchResultsView = Backbone.View.extend({
  el: '#main', // define the selector which this view is associated with
  render: function () {

    var deckViewHTML = $('#searchResultsView-template').html();
    this.$el.html(deckViewHTML);

    this.collection.each(function (deck) {
      var deckListView = new app.DeckListView({model: deck});
      deckListView.render();
    });
  }
});
