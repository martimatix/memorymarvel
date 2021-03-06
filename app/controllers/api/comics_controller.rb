class Api::ComicsController < ApplicationController
  respond_to :json

  def index
    deck = Deck.find_by :id => params[:deck_id]
    respond_with deck.comics
  end

  def show
    respond_with comic
  end

  def create
    # Very fat controller! (Not a good thing) Todo: move this stuff to model

    # Code to prevent duplication of a comic in the local database
    # Probably overkill since `validates_uniqueness_of :marvel_id` is in the model
    this_comic_id = comic_params[:marvel_id]

    comic = Comic.find_by :marvel_id => this_comic_id
    # If comic does not exist in the database, create a new one
    if !comic
      comic = Comic.create comic_params
    end

    # Establish associations
    deck = Deck.find_by :id => comic_params[:deck_id]

    # Validate that the current user is the owner of the deck
    @current_user = User.find_by :id => session[:user_id]
    if @current_user.id != deck.user_id
      return
    end

    # Check to see if the deck already has this comic
    comic_in_deck = deck.comics.find_by :marvel_id => this_comic_id

    # Also check that the deck has less than 6 comics
    if !comic_in_deck && deck.comics.count < 6
      deck.comics << comic
      deck.num_comics = deck.comics.count
      deck.save
    end

    render :json => comic
  end

  def update
    respond_with comic.update(comic_params)
  end

  # Not a true destroy - only deletes association with the deck
  def destroy
    deck = Deck.find_by :id => params[:deck_id]
    @current_user = User.find_by :id => session[:user_id]
    if @current_user.id != deck.user_id
      return
    end

    deck.comics.delete(comic)
    deck.num_comics = deck.comics.count
    deck.save
    respond_with deck
  end

  private

  def comic
    Comic.find(params[:id])
  end

  def comic_params
    params.require(:comic).permit(:deck_id, :marvel_id, :title, :image_url)
  end

end
