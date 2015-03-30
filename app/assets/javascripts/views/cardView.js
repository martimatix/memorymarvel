var app = app || {};

app.CardListView = Backbone.View.extend({
  tagName: 'div',
  events: {
    'click': 'flipCard'
  },
  flipped: false,
  render: function () {
    // Fetch and compile the template.
    var cardTemplate = $('#card-template').html();
    var cardHTML = _.template(cardTemplate);

    // Set the content of this view's element to be the template for this model.
    this.$el.html(cardHTML(this.model.toJSON()));

    // Append this view's element to the #posts ul on the page.
    $('#game').append(this.$el);
  },
  flipCard: function (event) {
    console.log('fired!');
    if (this.flipped) {
      TweenLite.to(this.$('.card'), 1.2, {rotationY:0, ease:Back.easeOut}); 
    } else {
      TweenLite.to(this.$('.card'), 1.2, {rotationY:180, ease:Back.easeOut});
    }
    this.flipped = !this.flipped;
  }
});
