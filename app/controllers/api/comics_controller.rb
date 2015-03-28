class Api::ComicsController < ApplicationController
  respond_to :json

  def index
    respond_with Comic.all
  end

  def show
    respond_with comic
  end

  def create
    comic = Comic.create comic_params
    # establish associations
    deck = Deck.find_by :id => comic_params[:deck_id]
    deck.comics << comic
    render :json => comic
  end

  def update
    respond_with comic.update(comic_params)
  end

  def destroy
    respond_with comic.destroy
  end

  private

  def comic
    Comic.find(params[:id])
  end

  def comic_params
    params.require(:comic).permit(:deck_id, :marvel_id, :title, :image_url)
  end

end
