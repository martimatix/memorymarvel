var app = app || {};

// Kind of like the Rails router with embedded actions.
// Makes the application navigatable, with meaningful URLs.
app.AppRouter = Backbone.Router.extend({
  routes: {
    '': 'index',
    'flights/:id': 'makeReservation'
  },
  index: function () {
    var flightView = new app.FlightView({collection: app.flights});
    flightView.render();
  }, 

  makeReservation: function (id) {
    var flight = app.flights.get(id);
    var reservationView = new app.ReservationView({model: flight})
    reservationView.render();
  }
});