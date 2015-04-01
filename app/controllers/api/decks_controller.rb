class Api::DecksController < ApplicationController
  respond_to :json

  def index
    respond_with Deck.all
  end

  def show
    respond_with deck
  end

  def create
    respond_with :api, Deck.create(deck_params)
  end

  def update
    respond_with deck.update(deck_params)
  end

  def destroy
    respond_with deck.destroy
  end

  private

  def deck
    Deck.find(params[:id])
  end

  def deck_params
    params.require(:deck).permit(:title, :num_comics, :user_id)
  end

end
