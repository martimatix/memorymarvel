var app = app || {};

app.SearchView = Backbone.View.extend({
  el: '#main', // define the selector which this view is associated with
  page_number: 0, // page number for search results
  events: {
    'click #search': 'renderImages',
    'click .comic-cover': 'addComicToDeck',
    'click .turn-page': 'nextOrPreviousResults'
  },
  render: function (page) {
    var searchViewHTML = $('#searchView-template').html();
    this.$el.html(searchViewHTML);
  },

  renderImages: function () {
    self = this;
    this.searchMarvel().then(function (result){
      for (var i = 0; i < result.data.results.length; i++) {
        var image_path = result.data.results[i].thumbnail.path;
        self.$el.append('<img src="' + image_path + '/portrait_xlarge.jpg" data-counter="' + i + '" class="comic-cover">');
      };
      self.responseJSON = result.data.results;
      self.$el.append('<p class="turn-page" id="next">Next</p>')
    });
  },

  searchMarvel: function () {
    console.log('searching marvel');
    var marvelUrl = 'http://gateway.marvel.com:80/v1/public/comics?';

    return $.getJSON(marvelUrl, {
      format: 'comic',
      formatType: 'comic',
      noVariants: 'true',
      titleStartsWith: $('#comic_title').val(),
      offset: this.page_number * 20,
      apikey: 'e05840ef82f3caa5b3e1483b2a7b9d11'
    });
  },

  addComicToDeck: function(event) {
    var counter = $(event.target).attr('data-counter'); // counter is the position in this.responseJSON
    var comicInfoObject = this.responseJSON[counter];
    var newComic = new app.Comic({
      marvel_id: comicInfoObject.id,
      title: comicInfoObject.title,
      image_url: comicInfoObject.thumbnail.path,
      deck_id: this.model.get('id')
    });
    newComic.save();
  },

  nextOrPreviousResults: function(event) {
    event.preventDefault();
    var nextOrPrevious = $(event.target).attr('id');
    if (nextOrPrevious === 'next') {
      this.page_number += 1;
      this.renderImages();
    } else {
      this.page_number -= 1;
      this.renderImages();
    }
  }
});
