class PagesController < ApplicationController

  def landing
  end


  # Method to get images for the cover page
  def front_page_images
    comics = Comic.order(:id => :desc).limit(80)
    image_paths = comics.map { |comic| "#{comic['image_url']}/portrait_xlarge.jpg" }
    respond_to do |format|
      format.json { render :json => image_paths }
    end
  end

  # Method to get a random deck with six images
  def get_deck
    # get games with at 6 comics
    decks = Deck.where ("num_comics = 6")
    respond_to do |format|
      format.json { render :json => decks.sample.id }
    end
  end

end
