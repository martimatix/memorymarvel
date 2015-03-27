class Api::ComicsController < ApplicationController
  respond_to :json

  def index
    respond_with Comic.all
  end

  def show
    respond_with comic
  end

  def create
    respond_with :api, Comic.create(comic_params)
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
    params.require(:comic).permit(:marvel_id, :title, :image_url)
  end

end
