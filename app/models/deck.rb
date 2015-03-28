# == Schema Information
#
# Table name: decks
#
#  id         :integer          not null, primary key
#  title      :string
#  num_comics :integer          default(0)
#  user_id    :integer
#  created_at :datetime
#  updated_at :datetime
#

class Deck < ActiveRecord::Base
  belongs_to :user
  has_and_belongs_to_many :comics
  belongs_to :favourite
end
