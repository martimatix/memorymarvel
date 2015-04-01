var app = app || {};

app.SearchView = Backbone.View.extend({
  el: '#main', // define the selector which this view is associated with
  pageNumber: 0, // page number for search results
  resultsPerPage: 8,
  cardLimit: 6,
  // okToAdd is like a debounce
  okToAdd: true,
  events: {
    'click #search': 'processSearchQuery',
    'click .comic-cover': 'addComicToDeck',
    'click .turn-page': 'nextOrPreviousResults'
  },
  render: function () {
    // Preload image
    this.$loadingImage = $('#loading-template').html();


    var self = this;
    this.model.fetch().done( function () {
      var searchViewTemplate = $('#searchView-template').html();
      var searchViewHTML = _.template(searchViewTemplate);
      self.$el.html(searchViewHTML(self.model.toJSON())); 
    });
  },

  processSearchQuery: function (event) {
    event.preventDefault();
    this.pageNumber = 0;
    this.renderImages();
  },

  renderImages: function () {
    self = this;

    this.searchMarvel().done(function (result){
      $('.search-results').empty();
      if (result.data.total === 0) {
        $noResults = $('<h1/>').text('No results were found');
        $('.search-results').append($noResults);
      } else {
        for (var i = 0; i < result.data.results.length; i++) {
          var image_path = result.data.results[i].thumbnail.path;
          $('.search-results').append('<img src="' + image_path + '/portrait_xlarge.jpg" data-counter="' + i + '" class="comic-cover">');
        };
        self.responseJSON = result.data.results;
        $('.next').html('<a href class="turn-page" id="next">Next</a>');
        $('.instructions').html('<p>Click on a comic to add it to your deck.</p>');
        if (self.pageNumber > 0) {
          $('.previous').html('<a href class="turn-page" id="previous">Previous</a>');
        } 
      }
    });
  },

  searchMarvel: function () {
    $('.search-results, .previous, .instructions, .next').empty();
    $('.previous').html('&nbsp');
    // Handle empty search field - albeit not gracefully
    var searchQuery = $('#comic_title').val()
    if (searchQuery === '') {
      return
    }
    $loadingMessage = $('<h1/>').text('Searching Marvel Database');
    $('.search-results').append($loadingMessage).append(this.$loadingImage);

    var marvelUrl = 'http://gateway.marvel.com:80/v1/public/comics?';

    return $.getJSON(marvelUrl, {
      format: 'comic',
      formatType: 'comic',
      noVariants: 'true',
      titleStartsWith: searchQuery,
      limit: this.resultsPerPage,
      offset: this.pageNumber * this.resultsPerPage,
      apikey: 'e05840ef82f3caa5b3e1483b2a7b9d11'
    });

  },

  addComicToDeck: function(event) {
    var self = this;
    if (this.model.attributes.num_comics >= this.cardLimit) {
      $.growl.warning({ message: "Cannot add card. You are at the card limit." , location: 'br' });
      return
    }
    if (this.okToAdd) {
      this.okToAdd = false;
      var counter = $(event.target).attr('data-counter'); // counter is the position of this comic in this.responseJSON
      var comicInfoObject = this.responseJSON[counter];
      var newComic = new app.Comic({
        marvel_id: comicInfoObject.id,
        title: comicInfoObject.title,
        image_url: comicInfoObject.thumbnail.path,
        deck_id: this.model.get('id')
      });
      // Store number of comics before the fetch
      var numComicsBeforeFetch = self.model.attributes.num_comics;
      newComic.save().done( function () {
        self.model.fetch().done ( function () {
          var numComics = self.model.attributes.num_comics;
          // If the number is unchanged, it means that the comic was already in the collection
          if (numComicsBeforeFetch === numComics) {
            $.growl.warning({ message: "Cannot add card. It is already in the deck." , location: 'br' });
          } else {
            self.flashMessage("Comic Added! " + numComics + " comics in the deck.");  
          }
          self.okToAdd = true;
        });
      });
    }
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
    $.growl.notice({ message: message , location: 'br', notice: 'Card Added!' });
  }
});
