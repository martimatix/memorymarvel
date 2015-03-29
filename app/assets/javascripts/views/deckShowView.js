var app = app || {};

// Like Rails views but with the event handling stored here as well.
// Responsible for showing data on the page, but also allowing interaction.
app.DeckShowView = Backbone.View.extend({
  el: '#main', // define the selector which this view is associated with
  render: function () {
    var deckShowViewHTML = $('#deckShowView-template').html();
    this.$el.html(deckShowViewHTML);

    var comics = this.comics.findWhere({
        seat_row: parseInt(row),
    });

    for (var i = 0; i < result.data.results.length; i++) {
      var image_path = result.data.results[i].thumbnail.path;
      $('.search-results').append('<img src="' + image_path + '/portrait_xlarge.jpg" data-counter="' + i + '" class="comic-cover">');
    };
  }
});
