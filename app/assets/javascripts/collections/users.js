var app = app || {};

app.Users = Backbone.Collection.extend({
  url: 'api/users',
  model: app.User
});
