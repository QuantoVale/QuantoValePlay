class Player < ActiveRecord::Base

  validates :idFb, :uniqueness => true
  
end
