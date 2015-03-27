var app = app || {};

// Like Rails views but with the event handling stored here as well.
// Responsible for showing data on the page, but also allowing interaction.
app.ReservationView = Backbone.View.extend({
  el: '#main', // define the selector which this view is associated with
  
   events: {
    'click #airplane': 'toggleReservation',
  },

  initialize: function () {
    if (app.currentView) {
      app.currentView.remove();
    };
    app.currentView = this;

    this.resetRefreshTimer();
  },

  render: function () {
    var self = this;
    this.airplane = new app.Airplane({flight_id: this.model.get('id')});
    this.reservations = new app.Reservations({flight_id: this.model.get('id')});
    this.airplane.fetch().done(function (airplane) { 
      self.airplane = airplane;
      self.reservations.fetch().done(function (reservations) {

        var rows = self.airplane.row;
        var columns = self.airplane.column;
        var reservationViewHTML = $('#reservationView-template').html();
        self.$el.html(reservationViewHTML);
        $('body').append(self.$el);

        for (var i = 1; i <= rows; i++) {
          for (var j = 1; j <= columns; j++) {
            k = self.numToChar(j);
            self.$el.find("#airplane").append("<div id=" + i + k + " data-row=\"" + i + "\" data-column=\"" + k + "\">" + i + k + "</div>");
          }
          self.$el.find("#airplane").append("<br />");

        }
        for (var i = 0; i < reservations.length; i++) {
          var row = reservations[i].seat_row;
          var column = reservations[i].seat_column;
          var userID = reservations[i].user_id;
          var userName = app.users.get(userID).toJSON().name;
          $('#' + row + column).text(userName);
          $('#' + row + column).addClass('reserved');
        };
      });
    });
  },

  numToChar: function (n) {
    return String.fromCharCode(64 + n);
  },

  toggleReservation: function (event) {
    // Make sure that a user is logged in
    if (app.currentUser.toJSON().id === undefined) {
      return
    }

    var row = $(event.target).attr('data-row');
    var column = $(event.target).attr('data-column');  
    
    if ($(event.target).hasClass('reserved')) {
      var username = $(event.target).text();
      this.deleteReservation(row, column, username);
    } else {
      this.makeReservation(row, column);
    }

    this.resetRefreshTimer();
  },

  makeReservation: function (row, column) {
    var newReservation = new app.Reservation({
      user_id: app.currentUser.toJSON().id,
      flight_id: this.model.get('id'),
      seat_row: row,
      seat_column: column
    });
    newReservation.save();
    this.render();
  },

  deleteReservation: function(row, column, username) {
    // only allow delete if the current user made the booking
    if (username === app.currentUser.toJSON().name) {
      // reservations are stored in this.reservations
      var reservation = this.reservations.findWhere({
        seat_row: parseInt(row),
        seat_column: column
      });
      reservation.destroy({success: this.render()});
    }
  },

  resetRefreshTimer: function() {
    clearInterval(app.refreshIntervalId);
    var self = this
    app.refreshIntervalId = setInterval(function(){
      self.render();
    },5000);
  }
});






 