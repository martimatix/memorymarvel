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
    var image_path = this.model.get('image_url');
    this.$el.html(cardHTML({ 'image_url' : image_path }));

    // Append this view's element to the #posts ul on the page.
    (this.$el).addClass('cardWrapper');
    $('#game').append(this.$el);
    initializeGreenSock();
  },
  initializeGreenSock: function () {
    TweenLite.set(".cardWrapper", {perspective:800});
    TweenLite.set(".card", {transformStyle:"preserve-3d"});
    TweenLite.set(".back", {rotationY:-180});
    TweenLite.set([".back", ".front"], {backfaceVisibility:"hidden"});
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
