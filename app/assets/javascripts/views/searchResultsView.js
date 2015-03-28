var app = app || {};

// Like Rails views but with the event handling stored here as well.
// Responsible for showing data on the page, but also allowing interaction.
app.SearchResultsView = Backbone.View.extend({
  el: '#main', // define the selector which this view is associated with
  render: function () {

    var searchResultsViewHTML = $('#searchResultsView-template').html();
    this.$el.html(searchResultsViewHTML);

    self = this;
    this.searchMarvel().then(function (result){
      for (var i = 0; i < result.data.results.length; i++) {
        var image_path = result.data.results[i].thumbnail.path;
        console.log(image_path);
        self.$el.append('<img src="' + image_path + '/portrait_xlarge.jpg">');
      };
    });
  },

  searchMarvel: function () {
    var marvelUrl = 'http://gateway.marvel.com:80/v1/public/comics?';

    return $.getJSON(marvelUrl, {
      format: 'comic',
      formatType: 'comic',
      noVariants: 'true',
      titleStartsWith: 'x-men',
      apikey: 'e05840ef82f3caa5b3e1483b2a7b9d11'
    });
  }
});
