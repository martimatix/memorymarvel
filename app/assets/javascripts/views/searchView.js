var app = app || {};

app.SearchView = Backbone.View.extend({
  el: '#main', // define the selector which this view is associated with
  pageNumber: 0, // page number for search results
  resultsPerPage: 20,
  events: {
    'click #search': 'processSearchQuery',
    'click .comic-cover': 'addComicToDeck',
    'click .turn-page': 'nextOrPreviousResults'
  },
  render: function () {
    var searchViewTemplate = $('#searchView-template').html();
    var searchViewHTML = _.template(searchViewTemplate);
    // debugger
    this.$el.html(searchViewHTML(this.model.toJSON()));
  },

  processSearchQuery: function (event) {
    event.preventDefault();
    this.pageNumber = 0;
    this.renderImages();
  },

  renderImages: function () {
    self = this;
    $('.search-results').empty();

    this.searchMarvel().done(function (result){
      for (var i = 0; i < result.data.results.length; i++) {
        var image_path = result.data.results[i].thumbnail.path;
        $('.search-results').append('<img src="' + image_path + '/portrait_xlarge.jpg" data-counter="' + i + '" class="comic-cover">');
      };
      self.responseJSON = result.data.results;
      $('.search-results').append('<a href class="turn-page" id="next">Next</a>');
      if (self.pageNumber > 0) {
        $('.search-results').append('<a href class="turn-page" id="previous">Previous</a>');
      }
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
      offset: this.pageNumber * this.resultsPerPage,
      apikey: 'e05840ef82f3caa5b3e1483b2a7b9d11'
    });
  },

  addComicToDeck: function(event) {
    var counter = $(event.target).attr('data-counter'); // counter is the position of this comic in this.responseJSON
    var comicInfoObject = this.responseJSON[counter];
    var newComic = new app.Comic({
      marvel_id: comicInfoObject.id,
      title: comicInfoObject.title,
      image_url: comicInfoObject.thumbnail.path,
      deck_id: this.model.get('id')
    });
    newComic.save();
    this.model.fetch();
    this.flashMessage('comic added. number of comics in deck: ' + this.model.attributes.num_comics);
  },

  nextOrPreviousResults: function(event) {
    event.preventDefault();
    var nextOrPrevious = $(event.target).attr('id');
    if (nextOrPrevious === 'next') {
      this.pageNumber += 1;
      this.renderImages();
    } else {
      this.pageNumber -= 1;
      this.renderImages();
    }
  },

  // Todo: use Bootstrap notify
  flashMessage: function(message) {
    var $myTextMessage = $('<h1/>').css("display", "none");
    this.$el.prepend($myTextMessage);
    $myTextMessage.text(message);
    $myTextMessage.slideDown(function() {
      setTimeout(function() {
          $myTextMessage.slideUp();
      }, 2000);
    });
  }
});
