var app = app || {};

app.FlightListView = Backbone.View.extend({
  tagName: 'tr', // new FlightListView will use this to create a new <tr>
  events: {
    'click': 'showFlight'
  },
  render: function () {
    // Fetch and compile the template.
    var flightListViewTemplate = $('#flightListView-template').html();
    var flightListViewHTML = _.template(flightListViewTemplate);

    // Set the content of this view's element to be the template for this model.
    this.$el.html(flightListViewHTML(this.model.toJSON()));

    // Append this view's element to the #posts ul on the page.
    $('#flights_table_data').append(this.$el);
  },
  showFlight: function () {
    app.appRouter.navigate('flights/' + this.model.get('id'), true);
    var reservationView = new app.ReservationView({model: this.model});
    reservationView.render();
  }
});
