class PagesController < ApplicationController

  def landing
  end


  # Method to get images for the cover page
  def front_page_images
    comics = Comic.order(:id => :desc).limit(80)
    image_paths = comics.map { |comic| "#{comic['image_url']}/portrait_medium.jpg" }
    respond_to do |format|
      format.json { render :json => image_paths }
    end
  end

end
