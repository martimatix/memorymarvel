var app = app || {};

// Like Rails views but with the event handling stored here as well.
// Responsible for showing data on the page, but also allowing interaction.
app.IndexView = Backbone.View.extend({
  el: '#main', // define the selector which this view is associated with
  render: function () {
    var indexViewHTML = $('#indexView-template').html();
    this.$el.html(indexViewHTML);

    var self = this;

    $.get( "/front_page_images.json", function( data ) {
      _.each(data, function(image_url) {
        $('.background').append($('<img>').addClass('front-page-img').attr('src', image_url))
      });
    });

    $playNowButton = $('.button-big');
    TweenMax.to($playNowButton,1,{rotation:360,ease:Linear.easeNone, delay: 5});
  }
});
