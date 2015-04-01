var app = app || {};

// Like Rails views but with the event handling stored here as well.
// Responsible for showing data on the page, but also allowing interaction.
app.myDeckView = Backbone.View.extend({
  el: '#main', // define the selector which this view is associated with
  render: function () {

    var myDeckViewHTML = $('#deckView-template').html();
    this.$el.html(myDeckViewHTML);

    $('h2').text('Displaying decks by ' + app.currentUser.get('name'));

    this.collection.each(function (deck) {
      if (deck.get('user_id') == app.currentUser.get('id')) {
        var deckListView = new app.DeckListView({model: deck});
        deckListView.render();
      };
    });
  }
});