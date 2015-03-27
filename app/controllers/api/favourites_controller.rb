class Api::FavouritesController < ApplicationController
  respond_to :json

  def index
    respond_with Favourite.all
  end

  def show
    respond_with favourite
  end

  def create
    respond_with :api, Favourite.create(favourite_params)
  end

  def update
    respond_with favourite.update(favourite_params)
  end

  def destroy
    respond_with favourite.destroy
  end

  private

  def favourite
    Favourite.find(params[:id])
  end

  def favourite_params
    params.require(:favourite).permit(:user_id, :deck_id)
  end

end
