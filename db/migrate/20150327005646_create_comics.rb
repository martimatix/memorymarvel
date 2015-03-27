class CreateComics < ActiveRecord::Migration
  def change
    create_table :comics do |t|
      t.integer :marvel_id
      t.string  :title
      t.string  :image_url 
      t.integer :deck_id
      t.timestamps
    end
  end
end
