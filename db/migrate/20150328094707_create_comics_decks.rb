class CreateComicsDecks < ActiveRecord::Migration
  def change
    create_table :comics_decks, :id => false do |t|
      t.integer :comic_id
      t.integer :deck_id
    end
  end
end
