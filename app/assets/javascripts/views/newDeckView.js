var app = app || {};

// Like Rails views but with the event handling stored here as well.
// Responsible for showing data on the page, but also allowing interaction.
app.NewDeckView = Backbone.View.extend({
  el: '#main', // define the selector which this view is associated with
  events: {
    'click #create-deck': 'createDeck'
  },
  render: function () {
    // Do not render if there is no current user
    if (app.currentUser.get('id') === undefined) {
      return
    }
    var newDeckViewHTML = $('#newDeckView-template').html();
    this.$el.html(newDeckViewHTML);
  },
  createDeck: function (event) {
    event.preventDefault();

    var newDeck = app.decks.create({ 
      title: $('#deck-title').val(), 
      user_id: app.currentUser.get('id')
    }, {
      success: function () {
        app.appRouter.navigate('decks/' + app.decks.last().get("id") + '/search', true);
      }
    });

  }
});
