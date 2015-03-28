# == Schema Information
#
# Table name: comics
#
#  id         :integer          not null, primary key
#  marvel_id  :integer
#  title      :string
#  image_url  :string
#  deck_id    :integer
#  created_at :datetime
#  updated_at :datetime
#

class Comic < ActiveRecord::Base
  has_and_belongs_to_many :decks
end
