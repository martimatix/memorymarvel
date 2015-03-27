var app = app || {};

app.CurrentUser = Backbone.Model.extend({
  urlRoot: function () {
    return '/current_user';
  },
  defaults: {
    name: "New user",
  }
});
