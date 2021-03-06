var app = app || {};

app.decks = new app.Decks();
app.currentUser = new app.CurrentUser();

$(document).ready(function() {
  
  if ($('#main').length === 0) {
    return;
  }

  // Replace <%= erb style %> with {{ Handlebars style }}
  // to prevent a conflict with Rails views.
  _.templateSettings = {
    interpolate: /\{\{(.+?)\}\}/g
  };


  app.currentUser.fetch();

  app.decks.fetch().done(function () {
      // This is global so we access it inside certain views.
    app.appRouter = new app.AppRouter();

    // This kicks off the router and makes the Back and Foward buttons work.
    Backbone.history.start();
  });

});