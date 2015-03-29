# == Schema Information
#
# Table name: users
#
#  id              :integer          not null, primary key
#  name            :string
#  email           :string
#  password_digest :string
#  created_at      :datetime
#  updated_at      :datetime
#

class User < ActiveRecord::Base
  has_many :decks
  has_many :favourites

  has_secure_password
     
  validates :name, :uniqueness => true, :presence => true
end
