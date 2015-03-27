var app = app || {};

// Like Rails views but with the event handling stored here as well.
// Responsible for showing data on the page, but also allowing interaction.
app.FlightView = Backbone.View.extend({
  el: '#main', // define the selector which this view is associated with
  render: function () {
    // Stop the reservationView from refreshing
    clearInterval(app.refreshIntervalId);

    var flightViewHTML = $('#flightView-template').html();
    this.$el.html(flightViewHTML);

    this.collection.each(function (flight) {
      var flightListView = new app.FlightListView({model: flight});
      flightListView.render();
    });
  }
});
